"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serializeI18n = exports.getPreviewEntry = exports.duplicateI18nFields = exports.duplicateDefaultI18nFields = exports.getI18nDataFiles = exports.groupEntries = exports.getI18nEntry = exports.formatI18nBackup = exports.getI18nBackup = exports.getI18nFiles = exports.normalizeFilePath = exports.getFilePaths = exports.getLocaleFromPath = exports.getFilePath = exports.getDataPath = exports.getLocaleDataPath = exports.isFieldHidden = exports.isFieldDuplicate = exports.isFieldTranslatable = exports.getI18nFilesDepth = exports.getI18nInfo = exports.hasI18n = exports.I18N_FIELD = exports.I18N_STRUCTURE = exports.I18N = void 0;

var _groupBy2 = _interopRequireDefault(require("lodash/groupBy"));

var _trimEnd2 = _interopRequireDefault(require("lodash/trimEnd"));

var _set2 = _interopRequireDefault(require("lodash/set"));

var _immutable = require("immutable");

var _collections = require("../reducers/collections");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const I18N = 'i18n';
exports.I18N = I18N;
let I18N_STRUCTURE;
exports.I18N_STRUCTURE = I18N_STRUCTURE;

(function (I18N_STRUCTURE) {
  I18N_STRUCTURE["MULTIPLE_FOLDERS"] = "multiple_folders";
  I18N_STRUCTURE["MULTIPLE_FILES"] = "multiple_files";
  I18N_STRUCTURE["SINGLE_FILE"] = "single_file";
})(I18N_STRUCTURE || (exports.I18N_STRUCTURE = I18N_STRUCTURE = {}));

let I18N_FIELD;
exports.I18N_FIELD = I18N_FIELD;

(function (I18N_FIELD) {
  I18N_FIELD["TRANSLATE"] = "translate";
  I18N_FIELD["DUPLICATE"] = "duplicate";
  I18N_FIELD["NONE"] = "none";
})(I18N_FIELD || (exports.I18N_FIELD = I18N_FIELD = {}));

const hasI18n = collection => {
  return collection.has(I18N);
};

exports.hasI18n = hasI18n;

const getI18nInfo = collection => {
  if (!hasI18n(collection)) {
    return {};
  }

  const {
    structure,
    locales,
    default_locale: defaultLocale
  } = collection.get(I18N).toJS();
  return {
    structure,
    locales,
    defaultLocale
  };
};

exports.getI18nInfo = getI18nInfo;

const getI18nFilesDepth = (collection, depth) => {
  const {
    structure
  } = getI18nInfo(collection);

  if (structure === I18N_STRUCTURE.MULTIPLE_FOLDERS) {
    return depth + 1;
  }

  return depth;
};

exports.getI18nFilesDepth = getI18nFilesDepth;

const isFieldTranslatable = (field, locale, defaultLocale) => {
  const isTranslatable = locale !== defaultLocale && field.get(I18N) === I18N_FIELD.TRANSLATE;
  return isTranslatable;
};

exports.isFieldTranslatable = isFieldTranslatable;

const isFieldDuplicate = (field, locale, defaultLocale) => {
  const isDuplicate = locale !== defaultLocale && field.get(I18N) === I18N_FIELD.DUPLICATE;
  return isDuplicate;
};

exports.isFieldDuplicate = isFieldDuplicate;

const isFieldHidden = (field, locale, defaultLocale) => {
  const isHidden = locale !== defaultLocale && field.get(I18N) === I18N_FIELD.NONE;
  return isHidden;
};

exports.isFieldHidden = isFieldHidden;

const getLocaleDataPath = locale => {
  return [I18N, locale, 'data'];
};

exports.getLocaleDataPath = getLocaleDataPath;

const getDataPath = (locale, defaultLocale) => {
  const dataPath = locale !== defaultLocale ? getLocaleDataPath(locale) : ['data'];
  return dataPath;
};

exports.getDataPath = getDataPath;

const getFilePath = (structure, extension, path, slug, locale) => {
  switch (structure) {
    case I18N_STRUCTURE.MULTIPLE_FOLDERS:
      return path.replace(`/${slug}`, `/${locale}/${slug}`);

    case I18N_STRUCTURE.MULTIPLE_FILES:
      return path.replace(extension, `${locale}.${extension}`);

    case I18N_STRUCTURE.SINGLE_FILE:
    default:
      return path;
  }
};

exports.getFilePath = getFilePath;

const getLocaleFromPath = (structure, extension, path) => {
  switch (structure) {
    case I18N_STRUCTURE.MULTIPLE_FOLDERS:
      {
        const parts = path.split('/'); // filename

        parts.pop(); // locale

        return parts.pop();
      }

    case I18N_STRUCTURE.MULTIPLE_FILES:
      {
        const parts = (0, _trimEnd2.default)(path, `.${extension}`);
        return parts.split('.').pop();
      }

    case I18N_STRUCTURE.SINGLE_FILE:
    default:
      return '';
  }
};

exports.getLocaleFromPath = getLocaleFromPath;

const getFilePaths = (collection, extension, path, slug) => {
  const {
    structure,
    locales
  } = getI18nInfo(collection);
  const paths = locales.map(locale => getFilePath(structure, extension, path, slug, locale));
  return paths;
};

exports.getFilePaths = getFilePaths;

const normalizeFilePath = (structure, path, locale) => {
  switch (structure) {
    case I18N_STRUCTURE.MULTIPLE_FOLDERS:
      return path.replace(`${locale}/`, '');

    case I18N_STRUCTURE.MULTIPLE_FILES:
      return path.replace(`.${locale}`, '');

    case I18N_STRUCTURE.SINGLE_FILE:
    default:
      return path;
  }
};

exports.normalizeFilePath = normalizeFilePath;

const getI18nFiles = (collection, extension, entryDraft, entryToRaw, path, slug, newPath) => {
  const {
    structure,
    defaultLocale,
    locales
  } = getI18nInfo(collection);

  if (structure === I18N_STRUCTURE.SINGLE_FILE) {
    const data = locales.reduce((map, locale) => {
      const dataPath = getDataPath(locale, defaultLocale);
      return map.set(locale, entryDraft.getIn(dataPath));
    }, (0, _immutable.Map)({}));
    const draft = entryDraft.set('data', data);
    return [_objectSpread({
      path: getFilePath(structure, extension, path, slug, locales[0]),
      slug,
      raw: entryToRaw(draft)
    }, newPath && {
      newPath: getFilePath(structure, extension, newPath, slug, locales[0])
    })];
  }

  const dataFiles = locales.map(locale => {
    const dataPath = getDataPath(locale, defaultLocale);
    const draft = entryDraft.set('data', entryDraft.getIn(dataPath));
    return _objectSpread({
      path: getFilePath(structure, extension, path, slug, locale),
      slug,
      raw: draft.get('data') ? entryToRaw(draft) : ''
    }, newPath && {
      newPath: getFilePath(structure, extension, newPath, slug, locale)
    });
  }).filter(dataFile => dataFile.raw);
  return dataFiles;
};

exports.getI18nFiles = getI18nFiles;

const getI18nBackup = (collection, entry, entryToRaw) => {
  const {
    locales,
    defaultLocale
  } = getI18nInfo(collection);
  const i18nBackup = locales.filter(l => l !== defaultLocale).reduce((acc, locale) => {
    const dataPath = getDataPath(locale, defaultLocale);
    const data = entry.getIn(dataPath);

    if (!data) {
      return acc;
    }

    const draft = entry.set('data', data);
    return _objectSpread(_objectSpread({}, acc), {}, {
      [locale]: {
        raw: entryToRaw(draft)
      }
    });
  }, {});
  return i18nBackup;
};

exports.getI18nBackup = getI18nBackup;

const formatI18nBackup = (i18nBackup, formatRawData) => {
  const i18n = Object.entries(i18nBackup).reduce((acc, [locale, {
    raw
  }]) => {
    const entry = formatRawData(raw);
    return _objectSpread(_objectSpread({}, acc), {}, {
      [locale]: {
        data: entry.data
      }
    });
  }, {});
  return i18n;
};

exports.formatI18nBackup = formatI18nBackup;

const mergeValues = (collection, structure, defaultLocale, values) => {
  let defaultEntry = values.find(e => e.locale === defaultLocale);

  if (!defaultEntry) {
    defaultEntry = values[0];
    console.warn(`Could not locale entry for default locale '${defaultLocale}'`);
  }

  const i18n = values.filter(e => e.locale !== defaultEntry.locale).reduce((acc, {
    locale,
    value
  }) => {
    const dataPath = getLocaleDataPath(locale);
    return (0, _set2.default)(acc, dataPath, value.data);
  }, {});
  const path = normalizeFilePath(structure, defaultEntry.value.path, defaultLocale);
  const slug = (0, _collections.selectEntrySlug)(collection, path);

  const entryValue = _objectSpread(_objectSpread(_objectSpread({}, defaultEntry.value), {}, {
    raw: ''
  }, i18n), {}, {
    path,
    slug
  });

  return entryValue;
};

const mergeSingleFileValue = (entryValue, defaultLocale, locales) => {
  const data = entryValue.data[defaultLocale];
  const i18n = locales.filter(l => l !== defaultLocale).map(l => ({
    locale: l,
    value: entryValue.data[l]
  })).filter(e => e.value).reduce((acc, e) => {
    return _objectSpread(_objectSpread({}, acc), {}, {
      [e.locale]: {
        data: e.value
      }
    });
  }, {});
  return _objectSpread(_objectSpread({}, entryValue), {}, {
    data,
    i18n,
    raw: ''
  });
};

const getI18nEntry = async (collection, extension, path, slug, getEntryValue) => {
  const {
    structure,
    locales,
    defaultLocale
  } = getI18nInfo(collection);
  let entryValue;

  if (structure === I18N_STRUCTURE.SINGLE_FILE) {
    entryValue = mergeSingleFileValue(await getEntryValue(path), defaultLocale, locales);
  } else {
    const entryValues = await Promise.all(locales.map(async locale => {
      const entryPath = getFilePath(structure, extension, path, slug, locale);
      const value = await getEntryValue(entryPath).catch(() => null);
      return {
        value,
        locale
      };
    }));
    const nonNullValues = entryValues.filter(e => e.value !== null);
    entryValue = mergeValues(collection, structure, defaultLocale, nonNullValues);
  }

  return entryValue;
};

exports.getI18nEntry = getI18nEntry;

const groupEntries = (collection, extension, entries) => {
  const {
    structure,
    defaultLocale,
    locales
  } = getI18nInfo(collection);

  if (structure === I18N_STRUCTURE.SINGLE_FILE) {
    return entries.map(e => mergeSingleFileValue(e, defaultLocale, locales));
  }

  const grouped = (0, _groupBy2.default)(entries.map(e => ({
    locale: getLocaleFromPath(structure, extension, e.path),
    value: e
  })), ({
    locale,
    value: e
  }) => {
    return normalizeFilePath(structure, e.path, locale);
  });
  const groupedEntries = Object.values(grouped).reduce((acc, values) => {
    const entryValue = mergeValues(collection, structure, defaultLocale, values);
    return [...acc, entryValue];
  }, []);
  return groupedEntries;
};

exports.groupEntries = groupEntries;

const getI18nDataFiles = (collection, extension, path, slug, diffFiles) => {
  const {
    structure
  } = getI18nInfo(collection);

  if (structure === I18N_STRUCTURE.SINGLE_FILE) {
    return diffFiles;
  }

  const paths = getFilePaths(collection, extension, path, slug);
  const dataFiles = paths.reduce((acc, path) => {
    const dataFile = diffFiles.find(file => file.path === path);

    if (dataFile) {
      return [...acc, dataFile];
    } else {
      return [...acc, {
        path,
        id: '',
        newFile: false
      }];
    }
  }, []);
  return dataFiles;
}; // eslint-disable-next-line @typescript-eslint/no-explicit-any


exports.getI18nDataFiles = getI18nDataFiles;

const duplicateDefaultI18nFields = (collection, dataFields) => {
  const {
    locales,
    defaultLocale
  } = getI18nInfo(collection);
  const i18nFields = Object.fromEntries(locales.filter(locale => locale !== defaultLocale).map(locale => [locale, {
    data: dataFields
  }]));
  return i18nFields;
};

exports.duplicateDefaultI18nFields = duplicateDefaultI18nFields;

const duplicateI18nFields = (entryDraft, field, locales, defaultLocale, fieldPath = [field.get('name')]) => {
  const value = entryDraft.getIn(['entry', 'data', ...fieldPath]);

  if (field.get(I18N) === I18N_FIELD.DUPLICATE) {
    locales.filter(l => l !== defaultLocale).forEach(l => {
      entryDraft = entryDraft.setIn(['entry', ...getDataPath(l, defaultLocale), ...fieldPath], value);
    });
  }

  if (field.has('field') && !_immutable.List.isList(value)) {
    const fields = [field.get('field')];
    fields.forEach(field => {
      entryDraft = duplicateI18nFields(entryDraft, field, locales, defaultLocale, [...fieldPath, field.get('name')]);
    });
  } else if (field.has('fields') && !_immutable.List.isList(value)) {
    const fields = field.get('fields').toArray();
    fields.forEach(field => {
      entryDraft = duplicateI18nFields(entryDraft, field, locales, defaultLocale, [...fieldPath, field.get('name')]);
    });
  }

  return entryDraft;
};

exports.duplicateI18nFields = duplicateI18nFields;

const getPreviewEntry = (entry, locale, defaultLocale) => {
  if (locale === defaultLocale) {
    return entry;
  }

  return entry.set('data', entry.getIn([I18N, locale, 'data']));
};

exports.getPreviewEntry = getPreviewEntry;

const serializeI18n = (collection, entry, serializeValues) => {
  const {
    locales,
    defaultLocale
  } = getI18nInfo(collection);
  locales.filter(locale => locale !== defaultLocale).forEach(locale => {
    const dataPath = getLocaleDataPath(locale);
    entry = entry.setIn(dataPath, serializeValues(entry.getIn(dataPath)));
  });
  return entry;
};

exports.serializeI18n = serializeI18n;