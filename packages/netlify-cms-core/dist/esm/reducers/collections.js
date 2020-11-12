"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.selectHasMetaPath = exports.selectFieldsComments = exports.selectViewGroups = exports.selectViewFilters = exports.selectSortDataPath = exports.selectSortableFields = exports.selectDefaultSortableFields = exports.COMMIT_DATE = exports.COMMIT_AUTHOR = exports.selectEntryCollectionTitle = exports.selectInferedField = exports.selectIdentifier = exports.updateFieldByKey = exports.traverseFields = exports.selectField = exports.getFieldsNames = exports.selectTemplateName = exports.selectAllowDeletion = exports.selectAllowNewEntries = exports.selectEntrySlug = exports.selectEntryPath = exports.selectFileEntryLabel = exports.selectFolderEntryExtension = exports.selectFields = exports.selectMediaFolders = exports.selectFieldsWithMediaFolders = exports.getFileFromSlug = void 0;

var _escapeRegExp2 = _interopRequireDefault(require("lodash/escapeRegExp"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _immutable = require("immutable");

var _consoleError = _interopRequireDefault(require("../lib/consoleError"));

var _config = require("../actions/config");

var _collectionTypes = require("../constants/collectionTypes");

var _fieldInference = require("../constants/fieldInference");

var _formats = require("../formats/formats");

var _entries = require("./entries");

var _netlifyCmsLibWidgets = require("netlify-cms-lib-widgets");

var _formatters = require("../lib/formatters");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  keyToPathArray
} = _netlifyCmsLibWidgets.stringTemplate;

const collections = (state = null, action) => {
  switch (action.type) {
    case _config.CONFIG_SUCCESS:
      {
        const configCollections = action.payload ? action.payload.get('collections') : (0, _immutable.List)();
        return configCollections.toOrderedMap().map(item => {
          const collection = item;

          if (collection.has('folder')) {
            return collection.set('type', _collectionTypes.FOLDER);
          }

          if (collection.has('files')) {
            return collection.set('type', _collectionTypes.FILES);
          }
        }) // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        .mapKeys((key, collection) => collection.get('name'));
      }

    default:
      return state;
  }
};

const selectors = {
  [_collectionTypes.FOLDER]: {
    entryExtension(collection) {
      return (collection.get('extension') || (0, _get2.default)(_formats.formatExtensions, collection.get('format') || 'frontmatter')).replace(/^\./, '');
    },

    fields(collection) {
      return collection.get('fields');
    },

    entryPath(collection, slug) {
      const folder = collection.get('folder').replace(/\/$/, '');
      return `${folder}/${slug}.${this.entryExtension(collection)}`;
    },

    entrySlug(collection, path) {
      var _path$split$pop;

      const folder = collection.get('folder').replace(/\/$/, '');
      const slug = (_path$split$pop = path.split(folder + '/').pop()) === null || _path$split$pop === void 0 ? void 0 : _path$split$pop.replace(new RegExp(`\\.${(0, _escapeRegExp2.default)(this.entryExtension(collection))}$`), '');
      return slug;
    },

    allowNewEntries(collection) {
      return collection.get('create');
    },

    allowDeletion(collection) {
      return collection.get('delete', true);
    },

    templateName(collection) {
      return collection.get('name');
    }

  },
  [_collectionTypes.FILES]: {
    fileForEntry(collection, slug) {
      const files = collection.get('files');
      return files && files.filter(f => (f === null || f === void 0 ? void 0 : f.get('name')) === slug).get(0);
    },

    fields(collection, slug) {
      const file = this.fileForEntry(collection, slug);
      return file && file.get('fields');
    },

    entryPath(collection, slug) {
      const file = this.fileForEntry(collection, slug);
      return file && file.get('file');
    },

    entrySlug(collection, path) {
      const file = collection.get('files').filter(f => (f === null || f === void 0 ? void 0 : f.get('file')) === path).get(0);
      return file && file.get('name');
    },

    entryLabel(collection, slug) {
      const file = this.fileForEntry(collection, slug);
      return file && file.get('label');
    },

    allowNewEntries() {
      return false;
    },

    allowDeletion(collection) {
      return collection.get('delete', false);
    },

    templateName(_collection, slug) {
      return slug;
    }

  }
};

const getFieldsWithMediaFolders = fields => {
  const fieldsWithMediaFolders = fields.reduce((acc, f) => {
    if (f.has('media_folder')) {
      acc = [...acc, f];
    }

    if (f.has('fields')) {
      var _f$get;

      const fields = (_f$get = f.get('fields')) === null || _f$get === void 0 ? void 0 : _f$get.toArray();
      acc = [...acc, ...getFieldsWithMediaFolders(fields)];
    } else if (f.has('field')) {
      const field = f.get('field');
      acc = [...acc, ...getFieldsWithMediaFolders([field])];
    } else if (f.has('types')) {
      var _f$get2;

      const types = (_f$get2 = f.get('types')) === null || _f$get2 === void 0 ? void 0 : _f$get2.toArray();
      acc = [...acc, ...getFieldsWithMediaFolders(types)];
    }

    return acc;
  }, []);
  return fieldsWithMediaFolders;
};

const getFileFromSlug = (collection, slug) => {
  var _collection$get;

  return (_collection$get = collection.get('files')) === null || _collection$get === void 0 ? void 0 : _collection$get.toArray().find(f => f.get('name') === slug);
};

exports.getFileFromSlug = getFileFromSlug;

const selectFieldsWithMediaFolders = (collection, slug) => {
  if (collection.has('folder')) {
    const fields = collection.get('fields').toArray();
    return getFieldsWithMediaFolders(fields);
  } else if (collection.has('files')) {
    var _getFileFromSlug;

    const fields = ((_getFileFromSlug = getFileFromSlug(collection, slug)) === null || _getFileFromSlug === void 0 ? void 0 : _getFileFromSlug.get('fields').toArray()) || [];
    return getFieldsWithMediaFolders(fields);
  }

  return [];
};

exports.selectFieldsWithMediaFolders = selectFieldsWithMediaFolders;

const selectMediaFolders = (state, collection, entry) => {
  const fields = selectFieldsWithMediaFolders(collection, entry.get('slug'));
  const folders = fields.map(f => (0, _entries.selectMediaFolder)(state.config, collection, entry, f));

  if (collection.has('files')) {
    const file = getFileFromSlug(collection, entry.get('slug'));

    if (file) {
      folders.unshift((0, _entries.selectMediaFolder)(state.config, collection, entry, undefined));
    }
  }

  if (collection.has('media_folder')) {
    // stop evaluating media folders at collection level
    collection = collection.delete('files');
    folders.unshift((0, _entries.selectMediaFolder)(state.config, collection, entry, undefined));
  }

  return (0, _immutable.Set)(folders).toArray();
};

exports.selectMediaFolders = selectMediaFolders;

const selectFields = (collection, slug) => selectors[collection.get('type')].fields(collection, slug);

exports.selectFields = selectFields;

const selectFolderEntryExtension = collection => selectors[_collectionTypes.FOLDER].entryExtension(collection);

exports.selectFolderEntryExtension = selectFolderEntryExtension;

const selectFileEntryLabel = (collection, slug) => selectors[_collectionTypes.FILES].entryLabel(collection, slug);

exports.selectFileEntryLabel = selectFileEntryLabel;

const selectEntryPath = (collection, slug) => selectors[collection.get('type')].entryPath(collection, slug);

exports.selectEntryPath = selectEntryPath;

const selectEntrySlug = (collection, path) => selectors[collection.get('type')].entrySlug(collection, path);

exports.selectEntrySlug = selectEntrySlug;

const selectAllowNewEntries = collection => selectors[collection.get('type')].allowNewEntries(collection);

exports.selectAllowNewEntries = selectAllowNewEntries;

const selectAllowDeletion = collection => selectors[collection.get('type')].allowDeletion(collection);

exports.selectAllowDeletion = selectAllowDeletion;

const selectTemplateName = (collection, slug) => selectors[collection.get('type')].templateName(collection, slug);

exports.selectTemplateName = selectTemplateName;

const getFieldsNames = (fields, prefix = '') => {
  let names = fields.map(f => `${prefix}${f.get('name')}`);
  fields.forEach((f, index) => {
    if (f.has('fields')) {
      var _f$get3;

      const fields = (_f$get3 = f.get('fields')) === null || _f$get3 === void 0 ? void 0 : _f$get3.toArray();
      names = [...names, ...getFieldsNames(fields, `${names[index]}.`)];
    } else if (f.has('field')) {
      const field = f.get('field');
      names = [...names, ...getFieldsNames([field], `${names[index]}.`)];
    } else if (f.has('types')) {
      var _f$get4;

      const types = (_f$get4 = f.get('types')) === null || _f$get4 === void 0 ? void 0 : _f$get4.toArray();
      names = [...names, ...getFieldsNames(types, `${names[index]}.`)];
    }
  });
  return names;
};

exports.getFieldsNames = getFieldsNames;

const selectField = (collection, key) => {
  const array = keyToPathArray(key);
  let name;
  let field;
  let fields = collection.get('fields', (0, _immutable.List)()).toArray();

  while ((name = array.shift()) && fields) {
    var _field, _field3, _field5;

    field = fields.find(f => f.get('name') === name);

    if ((_field = field) === null || _field === void 0 ? void 0 : _field.has('fields')) {
      var _field2, _field2$get;

      fields = (_field2 = field) === null || _field2 === void 0 ? void 0 : (_field2$get = _field2.get('fields')) === null || _field2$get === void 0 ? void 0 : _field2$get.toArray();
    } else if ((_field3 = field) === null || _field3 === void 0 ? void 0 : _field3.has('field')) {
      var _field4;

      fields = [(_field4 = field) === null || _field4 === void 0 ? void 0 : _field4.get('field')];
    } else if ((_field5 = field) === null || _field5 === void 0 ? void 0 : _field5.has('types')) {
      var _field6, _field6$get;

      fields = (_field6 = field) === null || _field6 === void 0 ? void 0 : (_field6$get = _field6.get('types')) === null || _field6$get === void 0 ? void 0 : _field6$get.toArray();
    }
  }

  return field;
};

exports.selectField = selectField;

const traverseFields = (fields, updater, done = () => false) => {
  if (done()) {
    return fields;
  }

  fields = fields.map(f => {
    const field = updater(f);

    if (done()) {
      return field;
    } else if (field.has('fields')) {
      return field.set('fields', traverseFields(field.get('fields'), updater, done));
    } else if (field.has('field')) {
      return field.set('field', traverseFields((0, _immutable.List)([field.get('field')]), updater, done).get(0));
    } else if (field.has('types')) {
      return field.set('types', traverseFields(field.get('types'), updater, done));
    } else {
      return field;
    }
  }).toList();
  return fields;
};

exports.traverseFields = traverseFields;

const updateFieldByKey = (collection, key, updater) => {
  const selected = selectField(collection, key);

  if (!selected) {
    return collection;
  }

  let updated = false;

  const updateAndBreak = f => {
    const field = f;

    if (field === selected) {
      updated = true;
      return updater(field);
    } else {
      return field;
    }
  };

  collection = collection.set('fields', traverseFields(collection.get('fields', (0, _immutable.List)()), updateAndBreak, () => updated));
  return collection;
};

exports.updateFieldByKey = updateFieldByKey;

const selectIdentifier = collection => {
  const identifier = collection.get('identifier_field');
  const identifierFields = identifier ? [identifier, ..._fieldInference.IDENTIFIER_FIELDS] : _fieldInference.IDENTIFIER_FIELDS;
  const fieldNames = getFieldsNames(collection.get('fields', (0, _immutable.List)()).toArray());
  return identifierFields.find(id => fieldNames.find(name => (name === null || name === void 0 ? void 0 : name.toLowerCase().trim()) === id.toLowerCase().trim()));
};

exports.selectIdentifier = selectIdentifier;

const selectInferedField = (collection, fieldName) => {
  if (fieldName === 'title' && collection.get('identifier_field')) {
    return selectIdentifier(collection);
  }

  const inferableField = _fieldInference.INFERABLE_FIELDS[fieldName];
  const fields = collection.get('fields');
  let field; // If collection has no fields or fieldName is not defined within inferables list, return null

  if (!fields || !inferableField) return null; // Try to return a field of the specified type with one of the synonyms

  const mainTypeFields = fields.filter(f => (f === null || f === void 0 ? void 0 : f.get('widget', 'string')) === inferableField.type).map(f => f === null || f === void 0 ? void 0 : f.get('name'));
  field = mainTypeFields.filter(f => inferableField.synonyms.indexOf(f) !== -1);
  if (field && field.size > 0) return field.first(); // Try to return a field for each of the specified secondary types

  const secondaryTypeFields = fields.filter(f => inferableField.secondaryTypes.indexOf(f === null || f === void 0 ? void 0 : f.get('widget', 'string')) !== -1).map(f => f === null || f === void 0 ? void 0 : f.get('name'));
  field = secondaryTypeFields.filter(f => inferableField.synonyms.indexOf(f) !== -1);
  if (field && field.size > 0) return field.first(); // Try to return the first field of the specified type

  if (inferableField.fallbackToFirstField && mainTypeFields.size > 0) return mainTypeFields.first(); // Coundn't infer the field. Show error and return null.

  if (inferableField.showError) {
    (0, _consoleError.default)(`The Field ${fieldName} is missing for the collection “${collection.get('name')}”`, `Netlify CMS tries to infer the entry ${fieldName} automatically, but one couldn't be found for entries of the collection “${collection.get('name')}”. Please check your site configuration.`);
  }

  return null;
};

exports.selectInferedField = selectInferedField;

const selectEntryCollectionTitle = (collection, entry) => {
  // prefer formatted summary over everything else
  const summaryTemplate = collection.get('summary');
  if (summaryTemplate) return (0, _formatters.summaryFormatter)(summaryTemplate, entry, collection); // if the collection is a file collection return the label of the entry

  if (collection.get('type') == _collectionTypes.FILES) {
    const label = selectFileEntryLabel(collection, entry.get('slug'));
    if (label) return label;
  } // try to infer a title field from the entry data


  const entryData = entry.get('data');
  const titleField = selectInferedField(collection, 'title');
  return titleField && entryData.getIn(keyToPathArray(titleField));
};

exports.selectEntryCollectionTitle = selectEntryCollectionTitle;
const COMMIT_AUTHOR = 'commit_author';
exports.COMMIT_AUTHOR = COMMIT_AUTHOR;
const COMMIT_DATE = 'commit_date';
exports.COMMIT_DATE = COMMIT_DATE;

const selectDefaultSortableFields = (collection, backend) => {
  let defaultSortable = _fieldInference.SORTABLE_FIELDS.map(type => {
    const field = selectInferedField(collection, type);

    if (backend.isGitBackend() && type === 'author' && !field) {
      // default to commit author if not author field is found
      return COMMIT_AUTHOR;
    }

    return field;
  }).filter(Boolean);

  if (backend.isGitBackend()) {
    // always have commit date by default
    defaultSortable = [COMMIT_DATE, ...defaultSortable];
  }

  return defaultSortable;
};

exports.selectDefaultSortableFields = selectDefaultSortableFields;

const selectSortableFields = (collection, t) => {
  const fields = collection.get('sortable_fields').toArray().map(key => {
    if (key === COMMIT_DATE) {
      return {
        key,
        field: {
          name: key,
          label: t('collection.defaultFields.updatedOn.label')
        }
      };
    }

    const field = selectField(collection, key);

    if (key === COMMIT_AUTHOR && !field) {
      return {
        key,
        field: {
          name: key,
          label: t('collection.defaultFields.author.label')
        }
      };
    }

    return {
      key,
      field: field === null || field === void 0 ? void 0 : field.toJS()
    };
  }).filter(item => !!item.field).map(item => _objectSpread(_objectSpread({}, item.field), {}, {
    key: item.key
  }));
  return fields;
};

exports.selectSortableFields = selectSortableFields;

const selectSortDataPath = (collection, key) => {
  if (key === COMMIT_DATE) {
    return 'updatedOn';
  } else if (key === COMMIT_AUTHOR && !selectField(collection, key)) {
    return 'author';
  } else {
    return `data.${key}`;
  }
};

exports.selectSortDataPath = selectSortDataPath;

const selectViewFilters = collection => {
  const viewFilters = collection.get('view_filters').toJS();
  return viewFilters;
};

exports.selectViewFilters = selectViewFilters;

const selectViewGroups = collection => {
  const viewGroups = collection.get('view_groups').toJS();
  return viewGroups;
};

exports.selectViewGroups = selectViewGroups;

const selectFieldsComments = (collection, entryMap) => {
  let fields = [];

  if (collection.has('folder')) {
    fields = collection.get('fields').toArray();
  } else if (collection.has('files')) {
    const file = collection.get('files').find(f => (f === null || f === void 0 ? void 0 : f.get('name')) === entryMap.get('slug'));
    fields = file.get('fields').toArray();
  }

  const comments = {};
  const names = getFieldsNames(fields);
  names.forEach(name => {
    const field = selectField(collection, name);

    if (field === null || field === void 0 ? void 0 : field.has('comment')) {
      comments[name] = field.get('comment');
    }
  });
  return comments;
};

exports.selectFieldsComments = selectFieldsComments;

const selectHasMetaPath = collection => {
  var _collection$get2;

  return collection.has('folder') && collection.get('type') === _collectionTypes.FOLDER && collection.has('meta') && ((_collection$get2 = collection.get('meta')) === null || _collection$get2 === void 0 ? void 0 : _collection$get2.has('path'));
};

exports.selectHasMetaPath = selectHasMetaPath;
var _default = collections;
exports.default = _default;