"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uniqBy2 = _interopRequireDefault(require("lodash/uniqBy"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _debounce2 = _interopRequireDefault(require("lodash/debounce"));

var _last2 = _interopRequireDefault(require("lodash/last"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _reactSelect = require("react-select");

var _immutable = require("immutable");

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

var _netlifyCmsLibWidgets = require("netlify-cms-lib-widgets");

var _reactWindow = require("react-window");

var _core = require("@emotion/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Option = ({
  index,
  style,
  data
}) => (0, _core.jsx)("div", {
  style: style
}, data.options[index]);

const MenuList = props => {
  if (props.isLoading || props.options.length <= 0 || !Array.isArray(props.children)) {
    return props.children;
  }

  const rows = props.children;
  const itemSize = 30;
  return (0, _core.jsx)(_reactWindow.FixedSizeList, {
    style: {
      width: '100%'
    },
    width: 300,
    height: Math.min(300, rows.length * itemSize + itemSize / 3),
    itemCount: rows.length,
    itemSize: itemSize,
    itemData: {
      options: rows
    }
  }, Option);
};

function optionToString(option) {
  return option && option.value ? option.value : '';
}

function convertToOption(raw) {
  if (typeof raw === 'string') {
    return {
      label: raw,
      value: raw
    };
  }

  return _immutable.Map.isMap(raw) ? raw.toJS() : raw;
}

function getSelectedOptions(value) {
  const selectedOptions = _immutable.List.isList(value) ? value.toJS() : value;

  if (!selectedOptions || !Array.isArray(selectedOptions)) {
    return null;
  }

  return selectedOptions;
}

function uniqOptions(initial, current) {
  return (0, _uniqBy2.default)(initial.concat(current), o => o.value);
}

function getSearchFieldArray(searchFields) {
  return _immutable.List.isList(searchFields) ? searchFields.toJS() : [searchFields];
}

function getSelectedValue({
  value,
  options,
  isMultiple
}) {
  if (isMultiple) {
    const selectedOptions = getSelectedOptions(value);

    if (selectedOptions === null) {
      return null;
    }

    const selected = selectedOptions.map(i => options.find(o => o.value === (i.value || i))).filter(Boolean).map(convertToOption);
    return selected;
  } else {
    return (0, _find2.default)(options, ['value', value]) || null;
  }
}

class RelationControl extends _react.default.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "mounted", false);

    _defineProperty(this, "state", {
      initialOptions: []
    });

    _defineProperty(this, "handleChange", selectedOption => {
      const {
        onChange,
        field
      } = this.props;
      let value;
      let metadata;

      if (Array.isArray(selectedOption)) {
        this.setState({
          initialOptions: selectedOption.filter(Boolean)
        });
        value = selectedOption.map(optionToString);
        metadata = !(0, _isEmpty2.default)(selectedOption) && {
          [field.get('name')]: {
            [field.get('collection')]: {
              [(0, _last2.default)(value)]: (0, _last2.default)(selectedOption).data
            }
          }
        } || {};
        onChange((0, _immutable.fromJS)(value), metadata);
      } else {
        this.setState({
          initialOptions: [selectedOption].filter(Boolean)
        });
        value = optionToString(selectedOption);
        metadata = selectedOption && {
          [field.get('name')]: {
            [field.get('collection')]: {
              [value]: selectedOption.data
            }
          }
        };
        onChange(value, metadata);
      }
    });

    _defineProperty(this, "parseNestedFields", (hit, field) => {
      const templateVars = _netlifyCmsLibWidgets.stringTemplate.extractTemplateVars(field); // return non template fields as is


      if (templateVars.length <= 0) {
        return (0, _get2.default)(hit.data, field);
      }

      const data = _netlifyCmsLibWidgets.stringTemplate.addFileTemplateFields(hit.path, (0, _immutable.fromJS)(hit.data));

      const value = _netlifyCmsLibWidgets.stringTemplate.compileStringTemplate(field, null, hit.slug, data);

      return value;
    });

    _defineProperty(this, "parseHitOptions", hits => {
      const {
        field
      } = this.props;
      const valueField = field.get('value_field');
      const displayField = field.get('display_fields') || (0, _immutable.List)([field.get('value_field')]);
      const options = hits.reduce((acc, hit) => {
        const valuesPaths = _netlifyCmsLibWidgets.stringTemplate.expandPath({
          data: hit.data,
          path: valueField
        });

        for (let i = 0; i < valuesPaths.length; i++) {
          const label = displayField.toJS().map(key => {
            const displayPaths = _netlifyCmsLibWidgets.stringTemplate.expandPath({
              data: hit.data,
              path: key
            });

            return this.parseNestedFields(hit, displayPaths[i] || displayPaths[0]);
          }).join(' ');
          const value = this.parseNestedFields(hit, valuesPaths[i]);
          acc.push({
            data: hit.data,
            value,
            label
          });
        }

        return acc;
      }, []);
      return options;
    });

    _defineProperty(this, "loadOptions", (0, _debounce2.default)((term, callback) => {
      const {
        field,
        query,
        forID
      } = this.props;
      const collection = field.get('collection');
      const optionsLength = field.get('options_length') || 20;
      const searchFieldsArray = getSearchFieldArray(field.get('search_fields'));
      const file = field.get('file');
      query(forID, collection, searchFieldsArray, term, file, optionsLength).then(({
        payload
      }) => {
        var _payload$response;

        const hits = ((_payload$response = payload.response) === null || _payload$response === void 0 ? void 0 : _payload$response.hits) || [];
        const options = this.parseHitOptions(hits);
        const uniq = uniqOptions(this.state.initialOptions, options);
        callback(uniq);
      });
    }, 500));
  }

  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value || this.props.hasActiveStyle !== nextProps.hasActiveStyle || this.props.queryHits !== nextProps.queryHits;
  }

  async componentDidMount() {
    this.mounted = true; // if the field has a previous value perform an initial search based on the value field
    // this is required since each search is limited by optionsLength so the selected value
    // might not show up on the search

    const {
      forID,
      field,
      value,
      query,
      onChange
    } = this.props;
    const collection = field.get('collection');
    const file = field.get('file');
    const initialSearchValues = value && (this.isMultiple() ? getSelectedOptions(value) : [value]);

    if (initialSearchValues && initialSearchValues.length > 0) {
      var _payload$response2;

      const metadata = {};
      const searchFieldsArray = getSearchFieldArray(field.get('search_fields'));
      const {
        payload
      } = await query(forID, collection, searchFieldsArray, '', file);
      const hits = ((_payload$response2 = payload.response) === null || _payload$response2 === void 0 ? void 0 : _payload$response2.hits) || [];
      const options = this.parseHitOptions(hits);
      const initialOptions = initialSearchValues.map(v => {
        const selectedOption = options.find(o => o.value === v);
        metadata[v] = selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.data;
        return selectedOption;
      }).filter(Boolean);
      this.mounted && this.setState({
        initialOptions
      }); //set metadata

      onChange(value, {
        [field.get('name')]: {
          [field.get('collection')]: metadata
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  isMultiple() {
    return this.props.field.get('multiple', false);
  }

  render() {
    const {
      value,
      field,
      forID,
      classNameWrapper,
      setActiveStyle,
      setInactiveStyle,
      queryHits
    } = this.props;
    const isMultiple = this.isMultiple();
    const isClearable = !field.get('required', true) || isMultiple;
    const hits = queryHits.get(forID, []);
    const queryOptions = this.parseHitOptions(hits);
    const options = uniqOptions(this.state.initialOptions, queryOptions);
    const selectedValue = getSelectedValue({
      options,
      value,
      isMultiple
    });
    return (0, _core.jsx)(_reactSelect.Async, {
      components: {
        MenuList
      },
      value: selectedValue,
      inputId: forID,
      cacheOptions: true,
      defaultOptions: true,
      loadOptions: this.loadOptions,
      onChange: this.handleChange,
      className: classNameWrapper,
      onFocus: setActiveStyle,
      onBlur: setInactiveStyle,
      styles: _netlifyCmsUiDefault.reactSelectStyles,
      isMulti: isMultiple,
      isClearable: isClearable,
      placeholder: ""
    });
  }

}

exports.default = RelationControl;

_defineProperty(RelationControl, "propTypes", {
  onChange: _propTypes.default.func.isRequired,
  forID: _propTypes.default.string.isRequired,
  value: _propTypes.default.node,
  field: _reactImmutableProptypes.default.map,
  fetchID: _propTypes.default.string,
  query: _propTypes.default.func.isRequired,
  queryHits: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object]),
  classNameWrapper: _propTypes.default.string.isRequired,
  setActiveStyle: _propTypes.default.func.isRequired,
  setInactiveStyle: _propTypes.default.func.isRequired
});