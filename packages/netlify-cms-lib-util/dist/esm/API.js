"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throwOnConflictingBranches = exports.getPreviewStatus = exports.PreviewState = exports.isPreviewContext = exports.readFileMetadata = exports.readFile = exports.requestWithBackoff = void 0;

var _asyncLock = require("./asyncLock");

var _unsentRequest = _interopRequireDefault(require("./unsentRequest"));

var _APIError = _interopRequireDefault(require("./APIError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    var instance = Reflect.construct(cls, Array.from(arguments));
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

class RateLimitError extends _extendableBuiltin(Error) {
  constructor(message, resetSeconds) {
    super(message);

    _defineProperty(this, "resetSeconds", void 0);

    if (resetSeconds < 0) {
      this.resetSeconds = 1;
    } else if (resetSeconds > 60 * 60) {
      this.resetSeconds = 60 * 60;
    } else {
      this.resetSeconds = resetSeconds;
    }
  }

}

const requestWithBackoff = async (api, req, attempt = 1) => {
  if (api.rateLimiter) {
    await api.rateLimiter.acquire();
  }

  try {
    const builtRequest = await api.buildRequest(req);
    const requestFunction = api.requestFunction || _unsentRequest.default.performRequest;
    const response = await requestFunction(builtRequest);

    if (response.status === 429) {
      // GitLab/Bitbucket too many requests
      const text = await response.text().catch(() => 'Too many requests');
      throw new Error(text);
    } else if (response.status === 403) {
      // GitHub too many requests
      const {
        message
      } = await response.json().catch(() => ({
        message: ''
      }));

      if (message.match('API rate limit exceeded')) {
        const now = new Date();
        const nextWindowInSeconds = response.headers.has('X-RateLimit-Reset') ? parseInt(response.headers.get('X-RateLimit-Reset')) : now.getTime() / 1000 + 60;
        throw new RateLimitError(message, nextWindowInSeconds);
      }
    }

    return response;
  } catch (err) {
    if (attempt > 5 || err.message === "Can't refresh access token when using implicit auth") {
      throw err;
    } else {
      if (!api.rateLimiter) {
        const timeout = err.resetSeconds || attempt * attempt;
        console.log(`Pausing requests for ${timeout} ${attempt === 1 ? 'second' : 'seconds'} due to fetch failures:`, err.message);
        api.rateLimiter = (0, _asyncLock.asyncLock)();
        api.rateLimiter.acquire();
        setTimeout(() => {
          var _api$rateLimiter;

          (_api$rateLimiter = api.rateLimiter) === null || _api$rateLimiter === void 0 ? void 0 : _api$rateLimiter.release();
          api.rateLimiter = undefined;
          console.log(`Done pausing requests`);
        }, 1000 * timeout);
      }

      return requestWithBackoff(api, req, attempt + 1);
    }
  }
};

exports.requestWithBackoff = requestWithBackoff;

const readFile = async (id, fetchContent, localForage, isText) => {
  const key = id ? isText ? `gh.${id}` : `gh.${id}.blob` : null;
  const cached = key ? await localForage.getItem(key) : null;

  if (cached) {
    return cached;
  }

  const content = await fetchContent();

  if (key) {
    await localForage.setItem(key, content);
  }

  return content;
};

exports.readFile = readFile;

const getFileMetadataKey = id => `gh.${id}.meta`;

const readFileMetadata = async (id, fetchMetadata, localForage) => {
  const key = id ? getFileMetadataKey(id) : null;
  const cached = key && (await localForage.getItem(key));

  if (cached) {
    return cached;
  }

  const metadata = await fetchMetadata();

  if (key) {
    await localForage.setItem(key, metadata);
  }

  return metadata;
};
/**
 * Keywords for inferring a status that will provide a deploy preview URL.
 */


exports.readFileMetadata = readFileMetadata;
const PREVIEW_CONTEXT_KEYWORDS = ['deploy'];
/**
 * Check a given status context string to determine if it provides a link to a
 * deploy preview. Checks for an exact match against `previewContext` if given,
 * otherwise checks for inclusion of a value from `PREVIEW_CONTEXT_KEYWORDS`.
 */

const isPreviewContext = (context, previewContext) => {
  if (previewContext) {
    return context === previewContext;
  }

  return PREVIEW_CONTEXT_KEYWORDS.some(keyword => context.includes(keyword));
};

exports.isPreviewContext = isPreviewContext;
let PreviewState;
/**
 * Retrieve a deploy preview URL from an array of statuses. By default, a
 * matching status is inferred via `isPreviewContext`.
 */

exports.PreviewState = PreviewState;

(function (PreviewState) {
  PreviewState["Other"] = "other";
  PreviewState["Success"] = "success";
})(PreviewState || (exports.PreviewState = PreviewState = {}));

const getPreviewStatus = (statuses, previewContext) => {
  return statuses.find(({
    context
  }) => {
    return isPreviewContext(context, previewContext);
  });
};

exports.getPreviewStatus = getPreviewStatus;

const getConflictingBranches = branchName => {
  // for cms/posts/post-1, conflicting branches are cms/posts, cms
  const parts = branchName.split('/');
  parts.pop();
  const conflictingBranches = parts.reduce((acc, _, index) => {
    acc = [...acc, parts.slice(0, index + 1).join('/')];
    return acc;
  }, []);
  return conflictingBranches;
};

const throwOnConflictingBranches = async (branchName, getBranch, apiName) => {
  const possibleConflictingBranches = getConflictingBranches(branchName);
  const conflictingBranches = await Promise.all(possibleConflictingBranches.map(b => getBranch(b).then(b => b.name).catch(() => '')));
  const conflictingBranch = conflictingBranches.filter(Boolean)[0];

  if (conflictingBranch) {
    throw new _APIError.default(`Failed creating branch '${branchName}' since there is already a branch named '${conflictingBranch}'. Please delete the '${conflictingBranch}' branch and try again`, 500, apiName);
  }
};

exports.throwOnConflictingBranches = throwOnConflictingBranches;