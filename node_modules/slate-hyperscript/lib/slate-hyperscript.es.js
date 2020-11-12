import { Annotation, Document, Mark, Node, Point, Selection, Text, Value } from 'slate';
import isPlainObject from 'is-plain-object';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};









var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};













var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};







var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/**
 * Auto-incrementing ID to keep track of paired annotations.
 *
 * @type {Number}
 */

var uid = 0;

/**
 * Create an anchor point.
 *
 * @param {String} tagName
 * @param {Object} attributes
 * @param {Array} children
 * @return {AnchorPoint}
 */

function createAnchor(tagName, attributes, children) {
  return new AnchorPoint(attributes);
}

/**
 * Create a block.
 *
 * @param {String} tagName
 * @param {Object} attributes
 * @param {Array} children
 * @return {Block}
 */

function createBlock(tagName, attributes, children) {
  var attrs = _extends({}, attributes, { object: 'block' });
  var block = createNode(null, attrs, children);
  return block;
}

/**
 * Create a cursor point.
 *
 * @param {String} tagName
 * @param {Object} attributes
 * @param {Array} children
 * @return {CursorPoint}
 */

function createCursor(tagName, attributes, children) {
  return new CursorPoint(attributes);
}

/**
 * Create a annotation point, or wrap a list of leaves and set the annotation
 * point tracker on them.
 *
 * @param {String} tagName
 * @param {Object} attributes
 * @param {Array} children
 * @return {AnnotationPoint|List<Leaf>}
 */

function createAnnotation(tagName, attributes, children) {
  var key = attributes.key,
      data = attributes.data;

  var type = tagName;

  if (key) {
    return new AnnotationPoint({ id: key, type: type, data: data });
  }

  var texts = createChildren(children);
  var first = texts.first();
  var last = texts.last();
  var id = '' + uid++;
  var start = new AnnotationPoint({ id: id, type: type, data: data });
  var end = new AnnotationPoint({ id: id, type: type, data: data });
  setPoint(first, start, 0);
  setPoint(last, end, last.text.length);
  return texts;
}

/**
 * Create a document.
 *
 * @param {String} tagName
 * @param {Object} attributes
 * @param {Array} children
 * @return {Document}
 */

function createDocument(tagName, attributes, children) {
  var attrs = _extends({}, attributes, { object: 'document' });
  var document = createNode(null, attrs, children);
  return document;
}

/**
 * Create a focus point.
 *
 * @param {String} tagName
 * @param {Object} attributes
 * @param {Array} children
 * @return {FocusPoint}
 */

function createFocus(tagName, attributes, children) {
  return new FocusPoint(attributes);
}

/**
 * Create an inline.
 *
 * @param {String} tagName
 * @param {Object} attributes
 * @param {Array} children
 * @return {Inline}
 */

function createInline(tagName, attributes, children) {
  var attrs = _extends({}, attributes, { object: 'inline' });
  var inline = createNode(null, attrs, children);
  return inline;
}

/**
 * Create a list of leaves from a mark.
 *
 * @param {String} tagName
 * @param {Object} attributes
 * @param {Array} children
 * @return {List<Leaf>}
 */

function createMark(tagName, attributes, children) {
  var key = attributes.key,
      mark = objectWithoutProperties(attributes, ['key']);

  var marks = Mark.createSet([mark]);
  var list = createChildren(children);
  var node = void 0;

  if (list.size > 1) {
    throw new Error('The <mark> hyperscript tag must only contain a single node\'s worth of children.');
  } else if (list.size === 0) {
    node = Text.create({ key: key, marks: marks });
  } else {
    node = list.first();

    node = preservePoints(node, function (n) {
      if (key) n = n.set('key', key);
      if (marks) n = n.set('marks', n.marks.union(marks));
      return n;
    });
  }

  return node;
}

/**
 * Create a node.
 *
 * @param {String} tagName
 * @param {Object} attributes
 * @param {Array} children
 * @return {Node}
 */

function createNode(tagName, attributes, children) {
  var object = attributes.object;


  if (object === 'text') {
    var text = createText(null, attributes, children);
    return text;
  }

  var nodes = createChildren(children);
  var node = Node.create(_extends({}, attributes, { nodes: nodes }));
  return node;
}

/**
 * Create a selection.
 *
 * @param {String} tagName
 * @param {Object} attributes
 * @param {Array} children
 * @return {Selection}
 */

function createSelection(tagName, attributes, children) {
  var anchor = children.find(function (c) {
    return c instanceof AnchorPoint;
  });
  var focus = children.find(function (c) {
    return c instanceof FocusPoint;
  });
  var marks = attributes.marks,
      focused = attributes.focused;

  var selection = Selection.create({
    marks: marks,
    isFocused: focused,
    anchor: anchor && {
      key: anchor.key,
      offset: anchor.offset,
      path: anchor.path
    },
    focus: focus && {
      key: focus.key,
      offset: focus.offset,
      path: focus.path
    }
  });

  return selection;
}

/**
 * Create a text node.
 *
 * @param {String} tagName
 * @param {Object} attributes
 * @param {Array} children
 * @return {Text}
 */

function createText(tagName, attributes, children) {
  var key = attributes.key,
      marks = attributes.marks;

  var list = createChildren(children);
  var node = void 0;

  if (list.size > 1) {
    throw new Error('The <text> hyperscript tag must only contain a single node\'s worth of children.');
  } else if (list.size === 0) {
    node = Text.create({ key: key });
  } else {
    node = list.first();

    node = preservePoints(node, function (n) {
      if (key) n = n.set('key', key);
      if (marks) n = n.set('marks', Mark.createSet(marks));
      return n;
    });
  }

  return node;
}

/**
 * Create a value.
 *
 * @param {String} tagName
 * @param {Object} attributes
 * @param {Array} children
 * @return {Value}
 */

function createValue(tagName, attributes, children) {
  var data = attributes.data;

  var document = children.find(Document.isDocument);
  var selection = children.find(Selection.isSelection);
  var anchor = void 0;
  var focus = void 0;
  var marks = void 0;
  var isFocused = void 0;
  var annotations = {};
  var partials = {};

  // Search the document's texts to see if any of them have the anchor or
  // focus information saved, or annotations applied.
  if (document) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = document.texts()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _ref = _step.value;

        var _ref2 = slicedToArray(_ref, 2);

        var node = _ref2[0];
        var path = _ref2[1];
        var __anchor = node.__anchor,
            __annotations = node.__annotations,
            __focus = node.__focus;


        if (__anchor != null) {
          anchor = Point.create({ path: path, key: node.key, offset: __anchor.offset });
          marks = __anchor.marks;
          isFocused = __anchor.isFocused;
        }

        if (__focus != null) {
          focus = Point.create({ path: path, key: node.key, offset: __focus.offset });
          marks = __focus.marks;
          isFocused = __focus.isFocused;
        }

        if (__annotations != null) {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = __annotations[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var ann = _step2.value;
              var id = ann.id;

              var partial = partials[id];
              delete partials[id];

              if (!partial) {
                ann.key = node.key;
                partials[id] = ann;
                continue;
              }

              var annotation = Annotation.create({
                key: id,
                type: ann.type,
                data: ann.data,
                anchor: {
                  key: partial.key,
                  path: document.getPath(partial.key),
                  offset: partial.offset
                },
                focus: {
                  path: path,
                  key: node.key,
                  offset: ann.offset
                }
              });

              annotations[id] = annotation;
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  if (Object.keys(partials).length > 0) {
    throw new Error('Slate hyperscript must have both a start and an end defined for each annotation using the `key=` prop.');
  }

  if (anchor && !focus) {
    throw new Error('Slate hyperscript ranges must have both `<anchor />` and `<focus />` defined if one is defined, but you only defined `<anchor />`. For collapsed selections, use `<cursor />` instead.');
  }

  if (!anchor && focus) {
    throw new Error('Slate hyperscript ranges must have both `<anchor />` and `<focus />` defined if one is defined, but you only defined `<focus />`. For collapsed selections, use `<cursor />` instead.');
  }

  if (anchor || focus) {
    if (!selection) {
      selection = Selection.create({ anchor: anchor, focus: focus, isFocused: isFocused, marks: marks });
    } else {
      selection = selection.setPoints([anchor, focus]);
    }
  } else if (!selection) {
    selection = Selection.create();
  }

  selection = selection.normalize(document);

  if (annotations.length > 0) {
    annotations = annotations.map(function (a) {
      return a.normalize(document);
    });
  }

  var value = Value.fromJSON(_extends({
    data: data,
    annotations: annotations,
    document: document,
    selection: selection
  }, attributes));

  return value;
}

/**
 * Create a list of text nodes.
 *
 * @param {Array} children
 * @return {List<Leaf>}
 */

function createChildren(children) {
  var nodes = Node.createList();

  var push = function push(node) {
    var last = nodes.last();
    var isString = typeof node === 'string';

    if (last && last.__string && (isString || node.__string)) {
      var text = isString ? node : node.text;
      var length = last.text.length;

      var next = preservePoints(last, function (l) {
        return l.insertText(length, text);
      });
      incrementPoints(node, length);
      copyPoints(node, next);
      next.__string = true;
      nodes = nodes.pop().push(next);
    } else if (isString) {
      node = Text.create({ text: node });
      node.__string = true;
      nodes = nodes.push(node);
    } else {
      nodes = nodes.push(node);
    }
  };

  children.forEach(function (child) {
    if (Node.isNodeList(child)) {
      child.forEach(function (c) {
        return push(c);
      });
    }

    if (Node.isNode(child)) {
      push(child);
    }

    if (typeof child === 'string') {
      push(child);
    }

    if (isPoint(child)) {
      if (!nodes.size) {
        push('');
      }

      var last = nodes.last();

      if (last.object !== 'text') {
        push('');
        last = nodes.last();
      }

      if (!last || !last.__string) {
        push('');
        last = nodes.last();
      }

      setPoint(last, child, last.text.length);
    }
  });

  return nodes;
}

/**
 * Point classes that can be created at different points in the document and
 * then searched for afterwards, for creating ranges.
 *
 * @type {Class}
 */

var CursorPoint = function CursorPoint() {
  var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  classCallCheck(this, CursorPoint);
  var _attrs$isFocused = attrs.isFocused,
      isFocused = _attrs$isFocused === undefined ? true : _attrs$isFocused,
      _attrs$marks = attrs.marks,
      marks = _attrs$marks === undefined ? null : _attrs$marks;

  this.isFocused = isFocused;
  this.marks = marks;
  this.offset = null;
};

var AnchorPoint = function AnchorPoint() {
  var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  classCallCheck(this, AnchorPoint);
  var _attrs$isFocused2 = attrs.isFocused,
      isFocused = _attrs$isFocused2 === undefined ? true : _attrs$isFocused2,
      _attrs$key = attrs.key,
      key = _attrs$key === undefined ? null : _attrs$key,
      _attrs$marks2 = attrs.marks,
      marks = _attrs$marks2 === undefined ? null : _attrs$marks2,
      _attrs$offset = attrs.offset,
      offset = _attrs$offset === undefined ? null : _attrs$offset,
      _attrs$path = attrs.path,
      path = _attrs$path === undefined ? null : _attrs$path;

  this.isFocused = isFocused;
  this.key = key;
  this.marks = marks;
  this.offset = offset;
  this.path = path;
};

var FocusPoint = function FocusPoint() {
  var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  classCallCheck(this, FocusPoint);
  var _attrs$isFocused3 = attrs.isFocused,
      isFocused = _attrs$isFocused3 === undefined ? true : _attrs$isFocused3,
      _attrs$key2 = attrs.key,
      key = _attrs$key2 === undefined ? null : _attrs$key2,
      _attrs$marks3 = attrs.marks,
      marks = _attrs$marks3 === undefined ? null : _attrs$marks3,
      _attrs$offset2 = attrs.offset,
      offset = _attrs$offset2 === undefined ? null : _attrs$offset2,
      _attrs$path2 = attrs.path,
      path = _attrs$path2 === undefined ? null : _attrs$path2;

  this.isFocused = isFocused;
  this.key = key;
  this.marks = marks;
  this.offset = offset;
  this.path = path;
};

var AnnotationPoint = function AnnotationPoint(attrs) {
  classCallCheck(this, AnnotationPoint);
  var _attrs$id = attrs.id,
      id = _attrs$id === undefined ? null : _attrs$id,
      _attrs$data = attrs.data,
      data = _attrs$data === undefined ? {} : _attrs$data,
      type = attrs.type;

  this.id = id;
  this.offset = null;
  this.type = type;
  this.data = data;
};

/**
 * Increment any existing `point` on object by `n`.
 *
 * @param {Any} object
 * @param {Number} n
 */

function incrementPoints(object, n) {
  var __anchor = object.__anchor,
      __focus = object.__focus,
      __annotations = object.__annotations;


  if (__anchor != null) {
    __anchor.offset += n;
  }

  if (__focus != null && __focus !== __anchor) {
    __focus.offset += n;
  }

  if (__annotations != null) {
    __annotations.forEach(function (a) {
      return a.offset += n;
    });
  }
}

/**
 * Check whether an `object` is a point.
 *
 * @param {Any} object
 * @return {Boolean}
 */

function isPoint(object) {
  return object instanceof AnchorPoint || object instanceof CursorPoint || object instanceof AnnotationPoint || object instanceof FocusPoint;
}

/**
 * Preserve any point information on an object.
 *
 * @param {Any} object
 * @param {Function} updator
 * @return {Any}
 */

function preservePoints(object, updator) {
  var next = updator(object);
  copyPoints(object, next);
  return next;
}

function copyPoints(object, other) {
  var __anchor = object.__anchor,
      __focus = object.__focus,
      __annotations = object.__annotations;

  if (__anchor != null) other.__anchor = __anchor;
  if (__focus != null) other.__focus = __focus;
  if (__annotations != null) other.__annotations = __annotations;
}

/**
 * Set a `point` on an `object`.
 *
 * @param {Any} object
 * @param {*Point} point
 * @param {Number} offset
 */

function setPoint(object, point, offset) {
  if (point instanceof AnchorPoint || point instanceof CursorPoint) {
    point.offset = offset;
    object.__anchor = point;
  }

  if (point instanceof FocusPoint || point instanceof CursorPoint) {
    point.offset = offset;
    object.__focus = point;
  }

  if (point instanceof AnnotationPoint) {
    point.offset = offset;
    object.__annotations = object.__annotations || [];
    object.__annotations = object.__annotations.concat(point);
  }
}

/**
 * Create a Slate hyperscript function with `options`.
 *
 * @param {Object} options
 * @return {Function}
 */

function createHyperscript() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$blocks = options.blocks,
      blocks = _options$blocks === undefined ? {} : _options$blocks,
      _options$inlines = options.inlines,
      inlines = _options$inlines === undefined ? {} : _options$inlines,
      _options$marks = options.marks,
      marks = _options$marks === undefined ? {} : _options$marks,
      _options$annotations = options.annotations,
      annotations = _options$annotations === undefined ? {} : _options$annotations;


  var creators = _extends({
    anchor: createAnchor,
    annotation: createAnnotation,
    block: createBlock,
    cursor: createCursor,
    document: createDocument,
    focus: createFocus,
    inline: createInline,
    mark: createMark,
    node: createNode,
    selection: createSelection,
    text: createText,
    value: createValue
  }, options.creators || {});

  for (var key in blocks) {
    creators[key] = normalizeCreator(blocks[key], createBlock);
  }

  for (var _key in inlines) {
    creators[_key] = normalizeCreator(inlines[_key], createInline);
  }

  for (var _key2 in marks) {
    creators[_key2] = normalizeCreator(marks[_key2], createMark);
  }

  for (var _key3 in annotations) {
    creators[_key3] = normalizeCreator(annotations[_key3], createAnnotation);
  }

  function create(tagName, attributes) {
    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key4 = 2; _key4 < _len; _key4++) {
      children[_key4 - 2] = arguments[_key4];
    }

    var creator = creators[tagName];

    if (!creator) {
      throw new Error('No hyperscript creator found for tag: "' + tagName + '"');
    }

    if (attributes == null) {
      attributes = {};
    }

    if (!isPlainObject(attributes)) {
      children = [attributes].concat(children);
      attributes = {};
    }

    children = children.filter(function (child) {
      return Boolean(child);
    }).reduce(function (memo, child) {
      return memo.concat(child);
    }, []);

    var ret = creator(tagName, attributes, children);
    return ret;
  }

  return create;
}

/**
 * Normalize a `creator` of `value`.
 *
 * @param {Function|Object|String} value
 * @param {Function} creator
 * @return {Function}
 */

function normalizeCreator(value, creator) {
  if (typeof value === 'function') {
    return value;
  }

  if (typeof value === 'string') {
    value = { type: value };
  }

  if (isPlainObject(value)) {
    return function (tagName, attributes, children) {
      var key = attributes.key,
          rest = objectWithoutProperties(attributes, ['key']);

      var attrs = _extends({}, value, {
        key: key,
        data: _extends({}, value.data || {}, rest)
      });

      return creator(tagName, attrs, children);
    };
  }

  throw new Error('Slate hyperscript creators can be either functions, objects or strings, but you passed: ' + value);
}

/**
 * Export.
 *
 * @type {Function}
 */

var index = createHyperscript();

export default index;
export { createHyperscript };
//# sourceMappingURL=slate-hyperscript.es.js.map
