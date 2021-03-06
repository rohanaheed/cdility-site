"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeConfig = normalizeConfig;
exports.applyDefaults = applyDefaults;
exports.parseConfig = parseConfig;
exports.configLoaded = configLoaded;
exports.configLoading = configLoading;
exports.configFailed = configFailed;
exports.configDidLoad = configDidLoad;
exports.mergeConfig = mergeConfig;
exports.detectProxyServer = detectProxyServer;
exports.handleLocalBackend = handleLocalBackend;
exports.loadConfig = loadConfig;
exports.CONFIG_MERGE = exports.CONFIG_FAILURE = exports.CONFIG_SUCCESS = exports.CONFIG_REQUEST = void 0;

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _trim2 = _interopRequireDefault(require("lodash/trim"));

var _trimStart2 = _interopRequireDefault(require("lodash/trimStart"));

var _yaml = _interopRequireDefault(require("yaml"));

var _immutable = require("immutable");

var _auth = require("./auth");

var publishModes = _interopRequireWildcard(require("../constants/publishModes"));

var _configSchema = require("../constants/configSchema");

var _collections = require("../reducers/collections");

var _backend = require("../backend");

var _i18n2 = require("../lib/i18n");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CONFIG_REQUEST = 'CONFIG_REQUEST';
exports.CONFIG_REQUEST = CONFIG_REQUEST;
const CONFIG_SUCCESS = 'CONFIG_SUCCESS';
exports.CONFIG_SUCCESS = CONFIG_SUCCESS;
const CONFIG_FAILURE = 'CONFIG_FAILURE';
exports.CONFIG_FAILURE = CONFIG_FAILURE;
const CONFIG_MERGE = 'CONFIG_MERGE';
exports.CONFIG_MERGE = CONFIG_MERGE;

const getConfigUrl = () => {
  const validTypes = {
    'text/yaml': 'yaml',
    'application/x-yaml': 'yaml'
  };
  const configLinkEl = document.querySelector('link[rel="cms-config-url"]');
  const isValidLink = configLinkEl && validTypes[configLinkEl.type] && (0, _get2.default)(configLinkEl, 'href');

  if (isValidLink) {
    const link = (0, _get2.default)(configLinkEl, 'href');
    console.log(`Using config file path: "${link}"`);
    return link;
  }

  return 'config.yml';
};

const setDefaultPublicFolder = map => {
  if (map.has('media_folder') && !map.has('public_folder')) {
    map = map.set('public_folder', map.get('media_folder'));
  }

  return map;
};

const setSnakeCaseConfig = field => {
  // Mapping between existing camelCase and its snake_case counterpart
  const widgetKeyMap = {
    dateFormat: 'date_format',
    timeFormat: 'time_format',
    pickerUtc: 'picker_utc',
    editorComponents: 'editor_components',
    valueType: 'value_type',
    valueField: 'value_field',
    searchFields: 'search_fields',
    displayFields: 'display_fields',
    optionsLength: 'options_length'
  };
  Object.entries(widgetKeyMap).forEach(([camel, snake]) => {
    if (field.has(camel)) {
      field = field.set(snake, field.get(camel));
      console.warn(`Field ${field.get('name')} is using a deprecated configuration '${camel}'. Please use '${snake}'`);
    }
  });
  return field;
};

const setI18nField = field => {
  if (field.get(_i18n2.I18N) === true) {
    field = field.set(_i18n2.I18N, _i18n2.I18N_FIELD.TRANSLATE);
  } else if (field.get(_i18n2.I18N) === false || !field.has(_i18n2.I18N)) {
    field = field.set(_i18n2.I18N, _i18n2.I18N_FIELD.NONE);
  }

  return field;
};

const setI18nDefaults = (i18n, collection) => {
  if (i18n && collection.has(_i18n2.I18N)) {
    const collectionI18n = collection.get(_i18n2.I18N);

    if (collectionI18n === true) {
      collection = collection.set(_i18n2.I18N, i18n);
    } else if (collectionI18n === false) {
      collection = collection.delete(_i18n2.I18N);
    } else {
      const locales = collectionI18n.get('locales', i18n.get('locales'));
      const defaultLocale = collectionI18n.get('default_locale', collectionI18n.has('locales') ? locales.first() : i18n.get('default_locale'));
      collection = collection.set(_i18n2.I18N, i18n.merge(collectionI18n));
      collection = collection.setIn([_i18n2.I18N, 'locales'], locales);
      collection = collection.setIn([_i18n2.I18N, 'default_locale'], defaultLocale);
      throwOnMissingDefaultLocale(collection.get(_i18n2.I18N));
    }

    if (collectionI18n !== false) {
      // set default values for i18n fields
      collection = collection.set('fields', (0, _collections.traverseFields)(collection.get('fields'), setI18nField));
    }
  } else {
    collection = collection.delete(_i18n2.I18N);
    collection = collection.set('fields', (0, _collections.traverseFields)(collection.get('fields'), field => field.delete(_i18n2.I18N)));
  }

  return collection;
};

const throwOnMissingDefaultLocale = i18n => {
  if (i18n && !i18n.get('locales').includes(i18n.get('default_locale'))) {
    throw new Error(`i18n locales '${i18n.get('locales').join(', ')}' are missing the default locale ${i18n.get('default_locale')}`);
  }
};

const setViewPatternsDefaults = (key, collection) => {
  if (!collection.has(key)) {
    collection = collection.set(key, (0, _immutable.fromJS)([]));
  } else {
    collection = collection.set(key, collection.get(key).map(v => v.set('id', `${v.get('field')}__${v.get('pattern')}`)));
  }

  return collection;
};

const defaults = {
  publish_mode: publishModes.SIMPLE
};

function normalizeConfig(config) {
  return (0, _immutable.Map)(config).withMutations(map => {
    map.set('collections', map.get('collections').map(collection => {
      const folder = collection.get('folder');

      if (folder) {
        collection = collection.set('fields', (0, _collections.traverseFields)(collection.get('fields'), setSnakeCaseConfig));
      }

      const files = collection.get('files');

      if (files) {
        collection = collection.set('files', files.map(file => {
          file = file.set('fields', (0, _collections.traverseFields)(file.get('fields'), setSnakeCaseConfig));
          return file;
        }));
      }

      if (collection.has('sortableFields')) {
        collection = collection.set('sortable_fields', collection.get('sortableFields')).delete('sortableFields');
        console.warn(`Collection ${collection.get('name')} is using a deprecated configuration 'sortableFields'. Please use 'sortable_fields'`);
      }

      return collection;
    }));
  });
}

function applyDefaults(config) {
  return (0, _immutable.Map)(defaults).mergeDeep(config).withMutations(map => {
    var _i18n;

    // Use `site_url` as default `display_url`.
    if (!map.get('display_url') && map.get('site_url')) {
      map.set('display_url', map.get('site_url'));
    } // Use media_folder as default public_folder.


    const defaultPublicFolder = `/${(0, _trimStart2.default)(map.get('media_folder'), '/')}`;

    if (!map.has('public_folder')) {
      map.set('public_folder', defaultPublicFolder);
    } // default values for the slug config


    if (!map.getIn(['slug', 'encoding'])) {
      map.setIn(['slug', 'encoding'], 'unicode');
    }

    if (!map.getIn(['slug', 'clean_accents'])) {
      map.setIn(['slug', 'clean_accents'], false);
    }

    if (!map.getIn(['slug', 'sanitize_replacement'])) {
      map.setIn(['slug', 'sanitize_replacement'], '-');
    }

    let i18n = config.get(_i18n2.I18N);
    i18n = (_i18n = i18n) === null || _i18n === void 0 ? void 0 : _i18n.set('default_locale', i18n.get('default_locale', i18n.get('locales').first()));
    throwOnMissingDefaultLocale(i18n); // Strip leading slash from collection folders and files

    map.set('collections', map.get('collections').map(collection => {
      if (!collection.has('publish')) {
        collection = collection.set('publish', true);
      }

      const folder = collection.get('folder');

      if (folder) {
        if (collection.has('path') && !collection.has('media_folder')) {
          // default value for media folder when using the path config
          collection = collection.set('media_folder', '');
        }

        collection = setDefaultPublicFolder(collection);
        collection = collection.set('fields', (0, _collections.traverseFields)(collection.get('fields'), setDefaultPublicFolder));
        collection = collection.set('folder', (0, _trim2.default)(folder, '/'));

        if (collection.has('meta')) {
          const fields = collection.get('fields');
          const metaFields = [];
          collection.get('meta').forEach((value, key) => {
            const field = value.withMutations(map => {
              map.set('name', key);
              map.set('meta', true);
              map.set('required', true);
            });
            metaFields.push(field);
          });
          collection = collection.set('fields', (0, _immutable.fromJS)([]).concat(metaFields, fields));
        } else {
          collection = collection.set('meta', (0, _immutable.Map)());
        }

        collection = setI18nDefaults(i18n, collection);
      }

      const files = collection.get('files');

      if (files) {
        if (i18n && collection.has(_i18n2.I18N)) {
          throw new Error('i18n configuration is not supported for files collection');
        }

        collection = collection.delete('nested');
        collection = collection.delete('meta');
        collection = collection.set('files', files.map(file => {
          file = file.set('file', (0, _trimStart2.default)(file.get('file'), '/'));
          file = setDefaultPublicFolder(file);
          file = file.set('fields', (0, _collections.traverseFields)(file.get('fields'), setDefaultPublicFolder));
          return file;
        }));
      }

      if (!collection.has('sortable_fields')) {
        const backend = (0, _backend.resolveBackend)(config);
        const defaultSortable = (0, _collections.selectDefaultSortableFields)(collection, backend);
        collection = collection.set('sortable_fields', (0, _immutable.fromJS)(defaultSortable));
      }

      collection = setViewPatternsDefaults('view_filters', collection);
      collection = setViewPatternsDefaults('view_groups', collection);

      if (map.hasIn(['editor', 'preview']) && !collection.has('editor')) {
        collection = collection.setIn(['editor', 'preview'], map.getIn(['editor', 'preview']));
      }

      return collection;
    }));
  });
}

function mergePreloadedConfig(preloadedConfig, loadedConfig) {
  const map = (0, _immutable.fromJS)(loadedConfig) || (0, _immutable.Map)();
  return preloadedConfig ? preloadedConfig.mergeDeep(map) : map;
}

function parseConfig(data) {
  const config = _yaml.default.parse(data, {
    maxAliasCount: -1,
    prettyErrors: true,
    merge: true
  });

  if (typeof CMS_ENV === 'string' && config[CMS_ENV]) {
    Object.keys(config[CMS_ENV]).forEach(key => {
      config[key] = config[CMS_ENV][key];
    });
  }

  return config;
}

async function getConfig(file, isPreloaded) {
  const response = await fetch(file, {
    credentials: 'same-origin'
  }).catch(err => err);

  if (response instanceof Error || response.status !== 200) {
    if (isPreloaded) return parseConfig('');
    throw new Error(`Failed to load config.yml (${response.status || response})`);
  }

  const contentType = response.headers.get('Content-Type') || 'Not-Found';
  const isYaml = contentType.indexOf('yaml') !== -1;

  if (!isYaml) {
    console.log(`Response for ${file} was not yaml. (Content-Type: ${contentType})`);
    if (isPreloaded) return parseConfig('');
  }

  return parseConfig(await response.text());
}

function configLoaded(config) {
  return {
    type: CONFIG_SUCCESS,
    payload: config
  };
}

function configLoading() {
  return {
    type: CONFIG_REQUEST
  };
}

function configFailed(err) {
  return {
    type: CONFIG_FAILURE,
    error: 'Error loading config',
    payload: err
  };
}

function configDidLoad(config) {
  return dispatch => {
    dispatch(configLoaded(config));
  };
}

function mergeConfig(config) {
  return {
    type: CONFIG_MERGE,
    payload: config
  };
}

async function detectProxyServer(localBackend) {
  const allowedHosts = ['localhost', '127.0.0.1', ...((localBackend === null || localBackend === void 0 ? void 0 : localBackend.allowed_hosts) || [])];

  if (allowedHosts.includes(location.hostname)) {
    let proxyUrl;
    const defaultUrl = 'http://localhost:8081/api/v1';

    if (localBackend === true) {
      proxyUrl = defaultUrl;
    } else if ((0, _isPlainObject2.default)(localBackend)) {
      proxyUrl = localBackend.url || defaultUrl.replace('localhost', location.hostname);
    }

    try {
      console.log(`Looking for Netlify CMS Proxy Server at '${proxyUrl}'`);
      const {
        repo,
        publish_modes,
        type
      } = await fetch(`${proxyUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'info'
        })
      }).then(res => res.json());

      if (typeof repo === 'string' && Array.isArray(publish_modes) && typeof type === 'string') {
        console.log(`Detected Netlify CMS Proxy Server at '${proxyUrl}' with repo: '${repo}'`);
        return {
          proxyUrl,
          publish_modes,
          type
        };
      }
    } catch {
      console.log(`Netlify CMS Proxy Server not detected at '${proxyUrl}'`);
    }
  }

  return {};
}

async function handleLocalBackend(mergedConfig) {
  if (mergedConfig.has('local_backend')) {
    const {
      proxyUrl,
      publish_modes,
      type
    } = await detectProxyServer(mergedConfig.toJS().local_backend);

    if (proxyUrl) {
      mergedConfig = mergePreloadedConfig(mergedConfig, {
        backend: {
          name: 'proxy',
          proxy_url: proxyUrl
        }
      });

      if (mergedConfig.has('publish_mode') && !publish_modes.includes(mergedConfig.get('publish_mode'))) {
        const newPublishMode = publish_modes[0];
        console.log(`'${mergedConfig.get('publish_mode')}' is not supported by '${type}' backend, switching to '${newPublishMode}'`);
        mergedConfig = mergePreloadedConfig(mergedConfig, {
          publish_mode: newPublishMode
        });
      }
    }
  }

  return mergedConfig;
}

function loadConfig() {
  if (window.CMS_CONFIG) {
    return configDidLoad((0, _immutable.fromJS)(window.CMS_CONFIG));
  }

  return async (dispatch, getState) => {
    dispatch(configLoading());

    try {
      const preloadedConfig = getState().config;
      const configUrl = getConfigUrl();
      const isPreloaded = preloadedConfig && preloadedConfig.size > 1;
      const loadedConfig = preloadedConfig && preloadedConfig.get('load_config_file') === false ? {} : await getConfig(configUrl, isPreloaded);
      /**
       * Merge any existing configuration so the result can be validated.
       */

      let mergedConfig = mergePreloadedConfig(preloadedConfig, loadedConfig);
      (0, _configSchema.validateConfig)(mergedConfig.toJS());
      mergedConfig = await handleLocalBackend(mergedConfig);
      const config = applyDefaults(normalizeConfig(mergedConfig));
      dispatch(configDidLoad(config));
      dispatch((0, _auth.authenticateUser)());
    } catch (err) {
      dispatch(configFailed(err));
      throw err;
    }
  };
}