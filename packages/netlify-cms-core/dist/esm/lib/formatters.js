"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.folderFormatter = exports.summaryFormatter = exports.previewUrlFormatter = exports.slugFormatter = exports.getProcessSegment = exports.prepareSlug = exports.commitMessageFormatter = void 0;

var _trimStart2 = _interopRequireDefault(require("lodash/trimStart"));

var _trimEnd2 = _interopRequireDefault(require("lodash/trimEnd"));

var _partialRight2 = _interopRequireDefault(require("lodash/partialRight"));

var _flow2 = _interopRequireDefault(require("lodash/flow"));

var _immutable = require("immutable");

var _urlHelper = require("./urlHelper");

var _netlifyCmsLibWidgets = require("netlify-cms-lib-widgets");

var _collections = require("../reducers/collections");

var _commonTags = require("common-tags");

var _collectionTypes = require("../constants/collectionTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  compileStringTemplate,
  parseDateFromEntry,
  SLUG_MISSING_REQUIRED_DATE,
  keyToPathArray,
  addFileTemplateFields
} = _netlifyCmsLibWidgets.stringTemplate;
const commitMessageTemplates = (0, _immutable.Map)({
  create: 'Create {{collection}} “{{slug}}”',
  update: 'Update {{collection}} “{{slug}}”',
  delete: 'Delete {{collection}} “{{slug}}”',
  uploadMedia: 'Upload “{{path}}”',
  deleteMedia: 'Delete “{{path}}”',
  openAuthoring: '{{message}}'
});
const variableRegex = /\{\{([^}]+)\}\}/g;

const commitMessageFormatter = (type, config, {
  slug,
  path,
  collection,
  authorLogin,
  authorName
}, isOpenAuthoring) => {
  const templates = commitMessageTemplates.merge(config.getIn(['backend', 'commit_messages'], (0, _immutable.Map)()));
  const commitMessage = templates.get(type).replace(variableRegex, (_, variable) => {
    switch (variable) {
      case 'slug':
        return slug || '';

      case 'path':
        return path || '';

      case 'collection':
        return collection ? collection.get('label_singular') || collection.get('label') : '';

      case 'author-login':
        return authorLogin || '';

      case 'author-name':
        return authorName || '';

      default:
        console.warn(`Ignoring unknown variable “${variable}” in commit message template.`);
        return '';
    }
  });

  if (!isOpenAuthoring) {
    return commitMessage;
  }

  const message = templates.get('openAuthoring').replace(variableRegex, (_, variable) => {
    switch (variable) {
      case 'message':
        return commitMessage;

      case 'author-login':
        return authorLogin || '';

      case 'author-name':
        return authorName || '';

      default:
        console.warn(`Ignoring unknown variable “${variable}” in open authoring message template.`);
        return '';
    }
  });
  return message;
};

exports.commitMessageFormatter = commitMessageFormatter;

const prepareSlug = slug => {
  return slug.trim() // Convert slug to lower-case
  .toLocaleLowerCase() // Remove single quotes.
  .replace(/[']/g, '') // Replace periods with dashes.
  .replace(/[.]/g, '-');
};

exports.prepareSlug = prepareSlug;

const getProcessSegment = (slugConfig, ignoreValues = []) => {
  return value => ignoreValues.includes(value) ? value : (0, _flow2.default)([value => String(value), prepareSlug, (0, _partialRight2.default)(_urlHelper.sanitizeSlug, slugConfig)])(value);
};

exports.getProcessSegment = getProcessSegment;

const slugFormatter = (collection, entryData, slugConfig) => {
  const slugTemplate = collection.get('slug') || '{{slug}}';
  const identifier = entryData.getIn(keyToPathArray((0, _collections.selectIdentifier)(collection)));

  if (!identifier) {
    throw new Error('Collection must have a field name that is a valid entry identifier, or must have `identifier_field` set');
  }

  const processSegment = getProcessSegment(slugConfig);
  const date = new Date();
  const slug = compileStringTemplate(slugTemplate, date, identifier, entryData, processSegment);

  if (!collection.has('path')) {
    return slug;
  } else {
    const pathTemplate = prepareSlug(collection.get('path'));
    return compileStringTemplate(pathTemplate, date, slug, entryData, value => value === slug ? value : processSegment(value));
  }
};

exports.slugFormatter = slugFormatter;

const previewUrlFormatter = (baseUrl, collection, slug, slugConfig, entry) => {
  /**
   * Preview URL can't be created without `baseUrl`. This makes preview URLs
   * optional for backends that don't support them.
   */
  if (!baseUrl) {
    return;
  }

  const basePath = (0, _trimEnd2.default)(baseUrl, '/');

  const isFileCollection = collection.get('type') === _collectionTypes.FILES;

  const file = isFileCollection ? (0, _collections.getFileFromSlug)(collection, entry.get('slug')) : undefined;

  const getPathTemplate = () => {
    var _file$get;

    return (_file$get = file === null || file === void 0 ? void 0 : file.get('preview_path')) !== null && _file$get !== void 0 ? _file$get : collection.get('preview_path');
  };

  const getDateField = () => {
    var _file$get2;

    return (_file$get2 = file === null || file === void 0 ? void 0 : file.get('preview_path_date_field')) !== null && _file$get2 !== void 0 ? _file$get2 : collection.get('preview_path_date_field');
  };
  /**
   * If a `previewPath` is provided for the collection/file, use it to construct the
   * URL path.
   */


  const pathTemplate = getPathTemplate();
  /**
   * Without a `previewPath` for the collection/file (via config), the preview URL
   * will be the URL provided by the backend.
   */

  if (!pathTemplate) {
    return baseUrl;
  }

  let fields = entry.get('data');
  fields = addFileTemplateFields(entry.get('path'), fields, collection.get('folder'));
  const dateFieldName = getDateField() || (0, _collections.selectInferedField)(collection, 'date');
  const date = parseDateFromEntry(entry, dateFieldName); // Prepare and sanitize slug variables only, leave the rest of the
  // `preview_path` template as is.

  const processSegment = getProcessSegment(slugConfig, [fields.get('dirname')]);
  let compiledPath;

  try {
    compiledPath = compileStringTemplate(pathTemplate, date, slug, fields, processSegment);
  } catch (err) {
    // Print an error and ignore `preview_path` if both:
    //   1. Date is invalid (according to Moment), and
    //   2. A date expression (eg. `{{year}}`) is used in `preview_path`
    if (err.name === SLUG_MISSING_REQUIRED_DATE) {
      console.error((0, _commonTags.stripIndent)`
        Collection "${collection.get('name')}" configuration error:
          \`preview_path_date_field\` must be a field with a valid date. Ignoring \`preview_path\`.
      `);
      return basePath;
    }

    throw err;
  }

  const previewPath = (0, _trimStart2.default)(compiledPath, ' /');
  return `${basePath}/${previewPath}`;
};

exports.previewUrlFormatter = previewUrlFormatter;

const summaryFormatter = (summaryTemplate, entry, collection) => {
  let entryData = entry.get('data');
  const date = parseDateFromEntry(entry, (0, _collections.selectInferedField)(collection, 'date')) || null;
  const identifier = entryData.getIn(keyToPathArray((0, _collections.selectIdentifier)(collection)));
  entryData = addFileTemplateFields(entry.get('path'), entryData, collection.get('folder')); // allow commit information in summary template

  if (entry.get('author') && !(0, _collections.selectField)(collection, _collections.COMMIT_AUTHOR)) {
    entryData = entryData.set(_collections.COMMIT_AUTHOR, entry.get('author'));
  }

  if (entry.get('updatedOn') && !(0, _collections.selectField)(collection, _collections.COMMIT_DATE)) {
    entryData = entryData.set(_collections.COMMIT_DATE, entry.get('updatedOn'));
  }

  const summary = compileStringTemplate(summaryTemplate, date, identifier, entryData);
  return summary;
};

exports.summaryFormatter = summaryFormatter;

const folderFormatter = (folderTemplate, entry, collection, defaultFolder, folderKey, slugConfig) => {
  if (!entry || !entry.get('data')) {
    return folderTemplate;
  }

  let fields = entry.get('data').set(folderKey, defaultFolder);
  fields = addFileTemplateFields(entry.get('path'), fields, collection.get('folder'));
  const date = parseDateFromEntry(entry, (0, _collections.selectInferedField)(collection, 'date')) || null;
  const identifier = fields.getIn(keyToPathArray((0, _collections.selectIdentifier)(collection)));
  const processSegment = getProcessSegment(slugConfig, [defaultFolder, fields.get('dirname')]);
  const mediaFolder = compileStringTemplate(folderTemplate, date, identifier, fields, processSegment);
  return mediaFolder;
};

exports.folderFormatter = folderFormatter;