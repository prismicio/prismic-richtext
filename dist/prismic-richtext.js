(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("PrismicRichtext", [], factory);
	else if(typeof exports === 'object')
		exports["PrismicRichtext"] = factory();
	else
		root["PrismicRichtext"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/ramda/src/flatten.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/flatten.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/src/internal/_curry1.js\");\n\nvar _makeFlat = /*#__PURE__*/__webpack_require__(/*! ./internal/_makeFlat */ \"./node_modules/ramda/src/internal/_makeFlat.js\");\n\n/**\n * Returns a new list by pulling every item out of it (and all its sub-arrays)\n * and putting them in a new array, depth-first.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig [a] -> [b]\n * @param {Array} list The array to consider.\n * @return {Array} The flattened list.\n * @see R.unnest\n * @example\n *\n *      R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);\n *      //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]\n */\n\n\nvar flatten = /*#__PURE__*/_curry1( /*#__PURE__*/_makeFlat(true));\nmodule.exports = flatten;\n\n//# sourceURL=webpack://PrismicRichtext/./node_modules/ramda/src/flatten.js?");

/***/ }),

/***/ "./node_modules/ramda/src/init.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/init.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var slice = /*#__PURE__*/__webpack_require__(/*! ./slice */ \"./node_modules/ramda/src/slice.js\");\n\n/**\n * Returns all but the last element of the given list or string.\n *\n * @func\n * @memberOf R\n * @since v0.9.0\n * @category List\n * @sig [a] -> [a]\n * @sig String -> String\n * @param {*} list\n * @return {*}\n * @see R.last, R.head, R.tail\n * @example\n *\n *      R.init([1, 2, 3]);  //=> [1, 2]\n *      R.init([1, 2]);     //=> [1]\n *      R.init([1]);        //=> []\n *      R.init([]);         //=> []\n *\n *      R.init('abc');  //=> 'ab'\n *      R.init('ab');   //=> 'a'\n *      R.init('a');    //=> ''\n *      R.init('');     //=> ''\n */\n\n\nvar init = /*#__PURE__*/slice(0, -1);\nmodule.exports = init;\n\n//# sourceURL=webpack://PrismicRichtext/./node_modules/ramda/src/init.js?");

/***/ }),

/***/ "./node_modules/ramda/src/internal/_checkForMethod.js":
/*!************************************************************!*\
  !*** ./node_modules/ramda/src/internal/_checkForMethod.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _isArray = /*#__PURE__*/__webpack_require__(/*! ./_isArray */ \"./node_modules/ramda/src/internal/_isArray.js\");\n\n/**\n * This checks whether a function has a [methodname] function. If it isn't an\n * array it will execute that function otherwise it will default to the ramda\n * implementation.\n *\n * @private\n * @param {Function} fn ramda implemtation\n * @param {String} methodname property to check for a custom implementation\n * @return {Object} Whatever the return value of the method is.\n */\n\n\nfunction _checkForMethod(methodname, fn) {\n  return function () {\n    var length = arguments.length;\n    if (length === 0) {\n      return fn();\n    }\n    var obj = arguments[length - 1];\n    return _isArray(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));\n  };\n}\nmodule.exports = _checkForMethod;\n\n//# sourceURL=webpack://PrismicRichtext/./node_modules/ramda/src/internal/_checkForMethod.js?");

/***/ }),

/***/ "./node_modules/ramda/src/internal/_curry1.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/src/internal/_curry1.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _isPlaceholder = /*#__PURE__*/__webpack_require__(/*! ./_isPlaceholder */ \"./node_modules/ramda/src/internal/_isPlaceholder.js\");\n\n/**\n * Optimized internal one-arity curry function.\n *\n * @private\n * @category Function\n * @param {Function} fn The function to curry.\n * @return {Function} The curried function.\n */\n\n\nfunction _curry1(fn) {\n  return function f1(a) {\n    if (arguments.length === 0 || _isPlaceholder(a)) {\n      return f1;\n    } else {\n      return fn.apply(this, arguments);\n    }\n  };\n}\nmodule.exports = _curry1;\n\n//# sourceURL=webpack://PrismicRichtext/./node_modules/ramda/src/internal/_curry1.js?");

/***/ }),

/***/ "./node_modules/ramda/src/internal/_curry2.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/src/internal/_curry2.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./_curry1 */ \"./node_modules/ramda/src/internal/_curry1.js\");\n\nvar _isPlaceholder = /*#__PURE__*/__webpack_require__(/*! ./_isPlaceholder */ \"./node_modules/ramda/src/internal/_isPlaceholder.js\");\n\n/**\n * Optimized internal two-arity curry function.\n *\n * @private\n * @category Function\n * @param {Function} fn The function to curry.\n * @return {Function} The curried function.\n */\n\n\nfunction _curry2(fn) {\n  return function f2(a, b) {\n    switch (arguments.length) {\n      case 0:\n        return f2;\n      case 1:\n        return _isPlaceholder(a) ? f2 : _curry1(function (_b) {\n          return fn(a, _b);\n        });\n      default:\n        return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function (_a) {\n          return fn(_a, b);\n        }) : _isPlaceholder(b) ? _curry1(function (_b) {\n          return fn(a, _b);\n        }) : fn(a, b);\n    }\n  };\n}\nmodule.exports = _curry2;\n\n//# sourceURL=webpack://PrismicRichtext/./node_modules/ramda/src/internal/_curry2.js?");

/***/ }),

/***/ "./node_modules/ramda/src/internal/_curry3.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/src/internal/_curry3.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./_curry1 */ \"./node_modules/ramda/src/internal/_curry1.js\");\n\nvar _curry2 = /*#__PURE__*/__webpack_require__(/*! ./_curry2 */ \"./node_modules/ramda/src/internal/_curry2.js\");\n\nvar _isPlaceholder = /*#__PURE__*/__webpack_require__(/*! ./_isPlaceholder */ \"./node_modules/ramda/src/internal/_isPlaceholder.js\");\n\n/**\n * Optimized internal three-arity curry function.\n *\n * @private\n * @category Function\n * @param {Function} fn The function to curry.\n * @return {Function} The curried function.\n */\n\n\nfunction _curry3(fn) {\n  return function f3(a, b, c) {\n    switch (arguments.length) {\n      case 0:\n        return f3;\n      case 1:\n        return _isPlaceholder(a) ? f3 : _curry2(function (_b, _c) {\n          return fn(a, _b, _c);\n        });\n      case 2:\n        return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function (_a, _c) {\n          return fn(_a, b, _c);\n        }) : _isPlaceholder(b) ? _curry2(function (_b, _c) {\n          return fn(a, _b, _c);\n        }) : _curry1(function (_c) {\n          return fn(a, b, _c);\n        });\n      default:\n        return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function (_a, _b) {\n          return fn(_a, _b, c);\n        }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function (_a, _c) {\n          return fn(_a, b, _c);\n        }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function (_b, _c) {\n          return fn(a, _b, _c);\n        }) : _isPlaceholder(a) ? _curry1(function (_a) {\n          return fn(_a, b, c);\n        }) : _isPlaceholder(b) ? _curry1(function (_b) {\n          return fn(a, _b, c);\n        }) : _isPlaceholder(c) ? _curry1(function (_c) {\n          return fn(a, b, _c);\n        }) : fn(a, b, c);\n    }\n  };\n}\nmodule.exports = _curry3;\n\n//# sourceURL=webpack://PrismicRichtext/./node_modules/ramda/src/internal/_curry3.js?");

/***/ }),

/***/ "./node_modules/ramda/src/internal/_isArray.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/src/internal/_isArray.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Tests whether or not an object is an array.\n *\n * @private\n * @param {*} val The object to test.\n * @return {Boolean} `true` if `val` is an array, `false` otherwise.\n * @example\n *\n *      _isArray([]); //=> true\n *      _isArray(null); //=> false\n *      _isArray({}); //=> false\n */\nmodule.exports = Array.isArray || function _isArray(val) {\n  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';\n};\n\n//# sourceURL=webpack://PrismicRichtext/./node_modules/ramda/src/internal/_isArray.js?");

/***/ }),

/***/ "./node_modules/ramda/src/internal/_isArrayLike.js":
/*!*********************************************************!*\
  !*** ./node_modules/ramda/src/internal/_isArrayLike.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./_curry1 */ \"./node_modules/ramda/src/internal/_curry1.js\");\n\nvar _isArray = /*#__PURE__*/__webpack_require__(/*! ./_isArray */ \"./node_modules/ramda/src/internal/_isArray.js\");\n\nvar _isString = /*#__PURE__*/__webpack_require__(/*! ./_isString */ \"./node_modules/ramda/src/internal/_isString.js\");\n\n/**\n * Tests whether or not an object is similar to an array.\n *\n * @private\n * @category Type\n * @category List\n * @sig * -> Boolean\n * @param {*} x The object to test.\n * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.\n * @example\n *\n *      _isArrayLike([]); //=> true\n *      _isArrayLike(true); //=> false\n *      _isArrayLike({}); //=> false\n *      _isArrayLike({length: 10}); //=> false\n *      _isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true\n */\n\n\nvar _isArrayLike = /*#__PURE__*/_curry1(function isArrayLike(x) {\n  if (_isArray(x)) {\n    return true;\n  }\n  if (!x) {\n    return false;\n  }\n  if (typeof x !== 'object') {\n    return false;\n  }\n  if (_isString(x)) {\n    return false;\n  }\n  if (x.nodeType === 1) {\n    return !!x.length;\n  }\n  if (x.length === 0) {\n    return true;\n  }\n  if (x.length > 0) {\n    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);\n  }\n  return false;\n});\nmodule.exports = _isArrayLike;\n\n//# sourceURL=webpack://PrismicRichtext/./node_modules/ramda/src/internal/_isArrayLike.js?");

/***/ }),

/***/ "./node_modules/ramda/src/internal/_isPlaceholder.js":
/*!***********************************************************!*\
  !*** ./node_modules/ramda/src/internal/_isPlaceholder.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _isPlaceholder(a) {\n       return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;\n}\nmodule.exports = _isPlaceholder;\n\n//# sourceURL=webpack://PrismicRichtext/./node_modules/ramda/src/internal/_isPlaceholder.js?");

/***/ }),

/***/ "./node_modules/ramda/src/internal/_isString.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/src/internal/_isString.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _isString(x) {\n  return Object.prototype.toString.call(x) === '[object String]';\n}\nmodule.exports = _isString;\n\n//# sourceURL=webpack://PrismicRichtext/./node_modules/ramda/src/internal/_isString.js?");

/***/ }),

/***/ "./node_modules/ramda/src/internal/_makeFlat.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/src/internal/_makeFlat.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _isArrayLike = /*#__PURE__*/__webpack_require__(/*! ./_isArrayLike */ \"./node_modules/ramda/src/internal/_isArrayLike.js\");\n\n/**\n * `_makeFlat` is a helper function that returns a one-level or fully recursive\n * function based on the flag passed in.\n *\n * @private\n */\n\n\nfunction _makeFlat(recursive) {\n  return function flatt(list) {\n    var value, jlen, j;\n    var result = [];\n    var idx = 0;\n    var ilen = list.length;\n\n    while (idx < ilen) {\n      if (_isArrayLike(list[idx])) {\n        value = recursive ? flatt(list[idx]) : list[idx];\n        j = 0;\n        jlen = value.length;\n        while (j < jlen) {\n          result[result.length] = value[j];\n          j += 1;\n        }\n      } else {\n        result[result.length] = list[idx];\n      }\n      idx += 1;\n    }\n    return result;\n  };\n}\nmodule.exports = _makeFlat;\n\n//# sourceURL=webpack://PrismicRichtext/./node_modules/ramda/src/internal/_makeFlat.js?");

/***/ }),

/***/ "./node_modules/ramda/src/last.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/last.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nth = /*#__PURE__*/__webpack_require__(/*! ./nth */ \"./node_modules/ramda/src/nth.js\");\n\n/**\n * Returns the last element of the given list or string.\n *\n * @func\n * @memberOf R\n * @since v0.1.4\n * @category List\n * @sig [a] -> a | Undefined\n * @sig String -> String\n * @param {*} list\n * @return {*}\n * @see R.init, R.head, R.tail\n * @example\n *\n *      R.last(['fi', 'fo', 'fum']); //=> 'fum'\n *      R.last([]); //=> undefined\n *\n *      R.last('abc'); //=> 'c'\n *      R.last(''); //=> ''\n */\n\n\nvar last = /*#__PURE__*/nth(-1);\nmodule.exports = last;\n\n//# sourceURL=webpack://PrismicRichtext/./node_modules/ramda/src/last.js?");

/***/ }),

/***/ "./node_modules/ramda/src/nth.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/src/nth.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/src/internal/_curry2.js\");\n\nvar _isString = /*#__PURE__*/__webpack_require__(/*! ./internal/_isString */ \"./node_modules/ramda/src/internal/_isString.js\");\n\n/**\n * Returns the nth element of the given list or string. If n is negative the\n * element at index length + n is returned.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig Number -> [a] -> a | Undefined\n * @sig Number -> String -> String\n * @param {Number} offset\n * @param {*} list\n * @return {*}\n * @example\n *\n *      var list = ['foo', 'bar', 'baz', 'quux'];\n *      R.nth(1, list); //=> 'bar'\n *      R.nth(-1, list); //=> 'quux'\n *      R.nth(-99, list); //=> undefined\n *\n *      R.nth(2, 'abc'); //=> 'c'\n *      R.nth(3, 'abc'); //=> ''\n * @symb R.nth(-1, [a, b, c]) = c\n * @symb R.nth(0, [a, b, c]) = a\n * @symb R.nth(1, [a, b, c]) = b\n */\n\n\nvar nth = /*#__PURE__*/_curry2(function nth(offset, list) {\n  var idx = offset < 0 ? list.length + offset : offset;\n  return _isString(list) ? list.charAt(idx) : list[idx];\n});\nmodule.exports = nth;\n\n//# sourceURL=webpack://PrismicRichtext/./node_modules/ramda/src/nth.js?");

/***/ }),

/***/ "./node_modules/ramda/src/slice.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/src/slice.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _checkForMethod = /*#__PURE__*/__webpack_require__(/*! ./internal/_checkForMethod */ \"./node_modules/ramda/src/internal/_checkForMethod.js\");\n\nvar _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/src/internal/_curry3.js\");\n\n/**\n * Returns the elements of the given list or string (or object with a `slice`\n * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).\n *\n * Dispatches to the `slice` method of the third argument, if present.\n *\n * @func\n * @memberOf R\n * @since v0.1.4\n * @category List\n * @sig Number -> Number -> [a] -> [a]\n * @sig Number -> Number -> String -> String\n * @param {Number} fromIndex The start index (inclusive).\n * @param {Number} toIndex The end index (exclusive).\n * @param {*} list\n * @return {*}\n * @example\n *\n *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']\n *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']\n *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']\n *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']\n *      R.slice(0, 3, 'ramda');                     //=> 'ram'\n */\n\n\nvar slice = /*#__PURE__*/_curry3( /*#__PURE__*/_checkForMethod('slice', function slice(fromIndex, toIndex, list) {\n  return Array.prototype.slice.call(list, fromIndex, toIndex);\n}));\nmodule.exports = slice;\n\n//# sourceURL=webpack://PrismicRichtext/./node_modules/ramda/src/slice.js?");

/***/ }),

/***/ "./node_modules/ramda/src/sortBy.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/sortBy.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/src/internal/_curry2.js\");\n\n/**\n * Sorts the list according to the supplied function.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Relation\n * @sig Ord b => (a -> b) -> [a] -> [a]\n * @param {Function} fn\n * @param {Array} list The list to sort.\n * @return {Array} A new list sorted by the keys generated by `fn`.\n * @example\n *\n *      var sortByFirstItem = R.sortBy(R.prop(0));\n *      var sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));\n *      var pairs = [[-1, 1], [-2, 2], [-3, 3]];\n *      sortByFirstItem(pairs); //=> [[-3, 3], [-2, 2], [-1, 1]]\n *      var alice = {\n *        name: 'ALICE',\n *        age: 101\n *      };\n *      var bob = {\n *        name: 'Bob',\n *        age: -10\n *      };\n *      var clara = {\n *        name: 'clara',\n *        age: 314.159\n *      };\n *      var people = [clara, bob, alice];\n *      sortByNameCaseInsensitive(people); //=> [alice, bob, clara]\n */\n\n\nvar sortBy = /*#__PURE__*/_curry2(function sortBy(fn, list) {\n  return Array.prototype.slice.call(list, 0).sort(function (a, b) {\n    var aa = fn(a);\n    var bb = fn(b);\n    return aa < bb ? -1 : aa > bb ? 1 : 0;\n  });\n});\nmodule.exports = sortBy;\n\n//# sourceURL=webpack://PrismicRichtext/./node_modules/ramda/src/sortBy.js?");

/***/ }),

/***/ "./node_modules/ramda/src/sortWith.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/src/sortWith.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/src/internal/_curry2.js\");\n\n/**\n * Sorts a list according to a list of comparators.\n *\n * @func\n * @memberOf R\n * @since v0.23.0\n * @category Relation\n * @sig [(a, a) -> Number] -> [a] -> [a]\n * @param {Array} functions A list of comparator functions.\n * @param {Array} list The list to sort.\n * @return {Array} A new list sorted according to the comarator functions.\n * @example\n *\n *      var alice = {\n *        name: 'alice',\n *        age: 40\n *      };\n *      var bob = {\n *        name: 'bob',\n *        age: 30\n *      };\n *      var clara = {\n *        name: 'clara',\n *        age: 40\n *      };\n *      var people = [clara, bob, alice];\n *      var ageNameSort = R.sortWith([\n *        R.descend(R.prop('age')),\n *        R.ascend(R.prop('name'))\n *      ]);\n *      ageNameSort(people); //=> [alice, clara, bob]\n */\n\n\nvar sortWith = /*#__PURE__*/_curry2(function sortWith(fns, list) {\n  return Array.prototype.slice.call(list, 0).sort(function (a, b) {\n    var result = 0;\n    var i = 0;\n    while (result === 0 && i < fns.length) {\n      result = fns[i](a, b);\n      i += 1;\n    }\n    return result;\n  });\n});\nmodule.exports = sortWith;\n\n//# sourceURL=webpack://PrismicRichtext/./node_modules/ramda/src/sortWith.js?");

/***/ }),

/***/ "./src/astext.ts":
/*!***********************!*\
  !*** ./src/astext.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nfunction asText(richtext, joinString) {\n    var join = typeof joinString === 'string' ? joinString : ' ';\n    return richtext.map(function (block) { return block.text; }).join(join);\n}\nexports[\"default\"] = asText;\n\n\n//# sourceURL=webpack://PrismicRichtext/./src/astext.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nvar astext_1 = __webpack_require__(/*! ./astext */ \"./src/astext.ts\");\nvar tree_1 = __webpack_require__(/*! ./tree */ \"./src/tree.ts\");\nvar serialize_1 = __webpack_require__(/*! ./serialize */ \"./src/serialize.ts\");\nmodule.exports = {\n    asText: astext_1[\"default\"],\n    asTree: tree_1[\"default\"].fromRichText,\n    serialize: serialize_1[\"default\"],\n    Elements: tree_1[\"default\"].NODE_TYPES\n};\n\n\n//# sourceURL=webpack://PrismicRichtext/./src/index.ts?");

/***/ }),

/***/ "./src/nodes.ts":
/*!**********************!*\
  !*** ./src/nodes.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = Object.setPrototypeOf ||\n        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nexports.__esModule = true;\nvar uuid_1 = __webpack_require__(/*! ./uuid */ \"./src/uuid.ts\");\nvar types_1 = __webpack_require__(/*! ./types */ \"./src/types.ts\");\nvar Node = /** @class */ (function () {\n    function Node(type, element, children) {\n        this.key = uuid_1[\"default\"]();\n        this.type = type;\n        this.element = element;\n        this.children = children;\n    }\n    return Node;\n}());\nexports.Node = Node;\nvar SpanNode = /** @class */ (function (_super) {\n    __extends(SpanNode, _super);\n    function SpanNode(start, end, type, text, children, element) {\n        var _this = _super.call(this, type, element, children) || this;\n        _this.start = start;\n        _this.end = end;\n        _this.text = text;\n        _this.children = children;\n        return _this;\n    }\n    SpanNode.prototype.boundaries = function () {\n        return {\n            lower: this.start,\n            upper: this.end\n        };\n    };\n    SpanNode.prototype.isParentOf = function (node) {\n        return this.start <= node.start && this.end >= node.end;\n    };\n    SpanNode.prototype.setChildren = function (children) {\n        return new SpanNode(this.start, this.end, this.type, this.text, children, this.element);\n    };\n    SpanNode.slice = function (node, start, end, text) {\n        return new SpanNode(start, end, node.type, text.slice(start, end), node.children, node.element);\n    };\n    return SpanNode;\n}(Node));\nexports.SpanNode = SpanNode;\nvar TextNode = /** @class */ (function (_super) {\n    __extends(TextNode, _super);\n    function TextNode(start, end, text) {\n        var _this = this;\n        var element = {\n            type: types_1.NODE_TYPES.span,\n            start: start,\n            end: end,\n            text: text\n        };\n        _this = _super.call(this, start, end, types_1.NODE_TYPES.span, text, [], element) || this;\n        return _this;\n    }\n    return TextNode;\n}(SpanNode));\nexports.TextNode = TextNode;\nvar BlockNode = /** @class */ (function (_super) {\n    __extends(BlockNode, _super);\n    function BlockNode(type, block, children) {\n        if (children === void 0) { children = []; }\n        return _super.call(this, type, block, children) || this;\n    }\n    return BlockNode;\n}(Node));\nexports.BlockNode = BlockNode;\nvar ListItemBlockNode = /** @class */ (function (_super) {\n    __extends(ListItemBlockNode, _super);\n    function ListItemBlockNode(block, children) {\n        return _super.call(this, types_1.NODE_TYPES.listItem, block, children) || this;\n    }\n    return ListItemBlockNode;\n}(BlockNode));\nexports.ListItemBlockNode = ListItemBlockNode;\nvar OrderedListItemBlockNode = /** @class */ (function (_super) {\n    __extends(OrderedListItemBlockNode, _super);\n    function OrderedListItemBlockNode(block, children) {\n        return _super.call(this, types_1.NODE_TYPES.oListItem, block, children) || this;\n    }\n    return OrderedListItemBlockNode;\n}(BlockNode));\nexports.OrderedListItemBlockNode = OrderedListItemBlockNode;\nvar OrderedListBlockNode = /** @class */ (function (_super) {\n    __extends(OrderedListBlockNode, _super);\n    function OrderedListBlockNode(block, children) {\n        return _super.call(this, types_1.NODE_TYPES.oList, block, children) || this;\n    }\n    OrderedListBlockNode.prototype.addChild = function (node) {\n        var children = this.children.concat(node);\n        return new OrderedListBlockNode(this.element, children);\n    };\n    return OrderedListBlockNode;\n}(BlockNode));\nexports.OrderedListBlockNode = OrderedListBlockNode;\nvar ListBlockNode = /** @class */ (function (_super) {\n    __extends(ListBlockNode, _super);\n    function ListBlockNode(block, children) {\n        return _super.call(this, types_1.NODE_TYPES.list, block, children) || this;\n    }\n    ListBlockNode.prototype.addChild = function (node) {\n        var children = this.children.concat(node);\n        return new ListBlockNode(this.element, children);\n    };\n    return ListBlockNode;\n}(BlockNode));\nexports.ListBlockNode = ListBlockNode;\n\n\n//# sourceURL=webpack://PrismicRichtext/./src/nodes.ts?");

/***/ }),

/***/ "./src/richtext.ts":
/*!*************************!*\
  !*** ./src/richtext.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nvar types_1 = __webpack_require__(/*! ./types */ \"./src/types.ts\");\nvar RichTextBlock = /** @class */ (function () {\n    function RichTextBlock(type, text, spans) {\n        this.type = type;\n        this.text = text;\n        this.spans = spans;\n    }\n    RichTextBlock.isEmbedBlock = function (type) {\n        return type === types_1.NODE_TYPES.embed;\n    };\n    RichTextBlock.isImageBlock = function (type) {\n        return type === types_1.NODE_TYPES.image;\n    };\n    RichTextBlock.isList = function (type) {\n        return type === types_1.NODE_TYPES.list;\n    };\n    RichTextBlock.isOrderedList = function (type) {\n        return type === types_1.NODE_TYPES.oList;\n    };\n    RichTextBlock.isListItem = function (type) {\n        return type === types_1.NODE_TYPES.listItem;\n    };\n    RichTextBlock.isOrderedListItem = function (type) {\n        return type === types_1.NODE_TYPES.oListItem;\n    };\n    RichTextBlock.emptyList = function () {\n        return {\n            type: types_1.NODE_TYPES.list,\n            spans: [],\n            text: ''\n        };\n    };\n    RichTextBlock.emptyOrderedList = function () {\n        return {\n            type: types_1.NODE_TYPES.oList,\n            spans: [],\n            text: ''\n        };\n    };\n    return RichTextBlock;\n}());\nexports.RichTextBlock = RichTextBlock;\n\n\n//# sourceURL=webpack://PrismicRichtext/./src/richtext.ts?");

/***/ }),

/***/ "./src/serialize.ts":
/*!**************************!*\
  !*** ./src/serialize.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nvar tree_1 = __webpack_require__(/*! ./tree */ \"./src/tree.ts\");\nvar nodes_1 = __webpack_require__(/*! ./nodes */ \"./src/nodes.ts\");\nfunction fromRichText(richText, serialize, htmlSerializer) {\n    var tree = tree_1[\"default\"].fromRichText(richText);\n    return tree.children.map(function (node, index) {\n        return serializeNode(node, serialize, index, htmlSerializer);\n    });\n}\nfunction serializeNode(parentNode, serializer, index, htmlSerializer) {\n    function step(node, idx) {\n        var text = node instanceof nodes_1.SpanNode ? node.text : null;\n        var serializedChildren = node.children.reduce(function (acc, node, i) {\n            return acc.concat([step(node, i)]);\n        }, []);\n        var maybeSerialized = htmlSerializer && htmlSerializer(node.type, node.element, text, serializedChildren, idx);\n        return maybeSerialized || serializer(node.type, node.element, text, serializedChildren, idx);\n    }\n    return step(parentNode, index);\n}\nexports[\"default\"] = fromRichText;\n\n\n//# sourceURL=webpack://PrismicRichtext/./src/serialize.ts?");

/***/ }),

/***/ "./src/tree.ts":
/*!*********************!*\
  !*** ./src/tree.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nvar flatten = __webpack_require__(/*! ramda/src/flatten */ \"./node_modules/ramda/src/flatten.js\");\nvar init = __webpack_require__(/*! ramda/src/init */ \"./node_modules/ramda/src/init.js\");\nvar last = __webpack_require__(/*! ramda/src/last */ \"./node_modules/ramda/src/last.js\");\nvar sortWith = __webpack_require__(/*! ramda/src/sortWith */ \"./node_modules/ramda/src/sortWith.js\");\nvar sortBy = __webpack_require__(/*! ramda/src/sortBy */ \"./node_modules/ramda/src/sortBy.js\");\nvar uuid_1 = __webpack_require__(/*! ./uuid */ \"./src/uuid.ts\");\nvar richtext_1 = __webpack_require__(/*! ./richtext */ \"./src/richtext.ts\");\nvar types_1 = __webpack_require__(/*! ./types */ \"./src/types.ts\");\nvar nodes_1 = __webpack_require__(/*! ./nodes */ \"./src/nodes.ts\");\nfunction sortByPriorities(nodes) {\n    return nodes.sort(function (nodeA, nodeB) {\n        if (nodeA.isParentOf(nodeB)) {\n            return -1;\n        }\n        else if (nodeB.isParentOf(nodeA)) {\n            return 1;\n        }\n        else {\n            var result = types_1.PRIORITIES[nodeA.type] - types_1.PRIORITIES[nodeB.type];\n            return (result === 0) ? (nodeA.text.length - nodeB.text.length) : result;\n        }\n    });\n}\nfunction sliceNode(text, elected, node) {\n    if (node.start < elected.start) {\n        return {\n            inner: nodes_1.SpanNode.slice(node, elected.start, node.end, text),\n            outer: nodes_1.SpanNode.slice(node, node.start, elected.start, text)\n        };\n    }\n    else if (node.end > elected.end) {\n        return {\n            inner: nodes_1.SpanNode.slice(node, node.start, elected.end, text),\n            outer: nodes_1.SpanNode.slice(node, elected.end, node.end, text)\n        };\n    }\n    else {\n        return {\n            inner: node\n        };\n    }\n}\nfunction partitionGroup(text, group) {\n    var partitioned = group.others.reduce(function (_a, node) {\n        var innerAcc = _a.inner, outerAcc = _a.outer;\n        var slicedNode = sliceNode(text, group.elected, node);\n        return {\n            inner: innerAcc.concat(slicedNode.inner),\n            outer: slicedNode.outer ? outerAcc.concat(slicedNode.outer) : outerAcc\n        };\n    }, { inner: [], outer: [] });\n    var inner = partitioned.inner, outer = partitioned.outer;\n    var head = group.elected.setChildren(buildTreeAndFill(text, inner, group.elected.boundaries()));\n    return [head].concat(buildTree(text, outer));\n}\nfunction groupWith(p, nodes) {\n    return nodes.reduce(function (groups, node) {\n        var previousGroup = last(groups);\n        if (previousGroup) {\n            var included = previousGroup.some(function (nodeGroup) { return nodeGroup.isParentOf(node); });\n            if (included) {\n                return init(groups).concat([previousGroup.concat(node)]);\n            }\n            else {\n                var previousNode = last(previousGroup);\n                if (previousNode && p(previousNode, node)) {\n                    return init(groups).concat([previousGroup.concat(node)]);\n                }\n                else {\n                    return groups.concat([[node]]);\n                }\n            }\n        }\n        else {\n            return [[node]];\n        }\n    }, []);\n}\nfunction groupNodes(nodes) {\n    var sortByStart = function (nodeA, nodeB) { return nodeA.start - nodeB.start; };\n    var sortByEnd = function (nodeA, nodeB) { return nodeA.end - nodeB.end; };\n    var sortedNodes = sortWith([sortByStart, sortByEnd], nodes);\n    return groupWith(function (nodeA, nodeB) { return nodeA.end >= nodeB.start; }, sortedNodes);\n}\nfunction electNode(candidates) {\n    if (candidates.length === 0) {\n        throw new Error('Unable to elect node on empty list');\n    }\n    else {\n        var _a = sortByPriorities(candidates), elected = _a[0], others = _a.slice(1);\n        return { elected: elected, others: others };\n    }\n}\nfunction fill(text, nodes, boundaries) {\n    return nodes.reduce(function (acc, node, index) {\n        var result = [];\n        var fillStart = index === 0 && node.start > boundaries.lower;\n        var fillEnd = index === nodes.length - 1 && boundaries.upper > node.end;\n        if (fillStart) {\n            var textNode = new nodes_1.TextNode(boundaries.lower, node.start, text.slice(boundaries.lower, node.start));\n            result = result.concat(textNode);\n        }\n        else {\n            var previousNode = nodes[index - 1];\n            if (previousNode) {\n                if (node.start > previousNode.end) {\n                    var subtext = text.slice(previousNode.end, node.start);\n                    var textNode = new nodes_1.TextNode(previousNode.end, node.start, subtext);\n                    result = result.concat(textNode);\n                }\n            }\n        }\n        result = result.concat(node);\n        if (fillEnd) {\n            var textNode = new nodes_1.TextNode(node.end, boundaries.upper, text.slice(node.end, boundaries.upper));\n            result = result.concat(textNode);\n        }\n        return acc.concat(result);\n    }, []);\n}\nfunction buildTreeAndFill(text, nodes, boundaries) {\n    if (nodes.length > 0) {\n        var tree = buildTree(text, nodes);\n        return fill(text, tree, boundaries);\n    }\n    else {\n        var subtext = text.slice(boundaries.lower, boundaries.upper);\n        return [new nodes_1.TextNode(boundaries.lower, boundaries.upper, subtext)];\n    }\n}\nfunction buildTree(text, nodes) {\n    var sortedNodes = sortBy(function (node) { return node.start; }, nodes);\n    var groups = groupNodes(sortedNodes);\n    var postElection = groups.map(electNode);\n    var tree = flatten(postElection.map(function (group) { return partitionGroup(text, group); }));\n    return sortBy(function (node) { return node.start; }, tree);\n}\nfunction processTextBlock(block) {\n    var nodes = block.spans.map(function (span) {\n        var text = block.text.slice(span.start, span.end);\n        return new nodes_1.SpanNode(span.start, span.end, span.type, text, [], span);\n    });\n    var boundaries = { lower: 0, upper: block.text.length };\n    return buildTreeAndFill(block.text, nodes, boundaries);\n}\nvar Tree = /** @class */ (function () {\n    function Tree() {\n    }\n    Tree.fromRichText = function (richText) {\n        return {\n            key: uuid_1[\"default\"](),\n            children: richText.reduce(function (acc, block, index) {\n                if (richtext_1.RichTextBlock.isEmbedBlock(block.type) || richtext_1.RichTextBlock.isImageBlock(block.type)) {\n                    return acc.concat(new nodes_1.BlockNode(block.type, block));\n                }\n                else {\n                    var textNodes = processTextBlock(block);\n                    var previousBlock = acc[acc.length - 1];\n                    if (richtext_1.RichTextBlock.isListItem(block.type) && previousBlock && previousBlock instanceof nodes_1.ListBlockNode) {\n                        var listItem = new nodes_1.ListItemBlockNode(block, textNodes);\n                        var updatedPreviousBlock = previousBlock.addChild(listItem);\n                        return init(acc).concat(updatedPreviousBlock);\n                    }\n                    else if (richtext_1.RichTextBlock.isOrderedListItem(block.type) && previousBlock && previousBlock instanceof nodes_1.OrderedListBlockNode) {\n                        var orderedListItem = new nodes_1.OrderedListItemBlockNode(block, textNodes);\n                        var updatedPreviousBlock = previousBlock.addChild(orderedListItem);\n                        return init(acc).concat(updatedPreviousBlock);\n                    }\n                    else if (richtext_1.RichTextBlock.isListItem(block.type)) {\n                        var listItem = new nodes_1.ListItemBlockNode(block, textNodes);\n                        var list = new nodes_1.ListBlockNode(richtext_1.RichTextBlock.emptyList(), [listItem]);\n                        return acc.concat(list);\n                    }\n                    else if (richtext_1.RichTextBlock.isOrderedListItem(block.type)) {\n                        var orderedListItem = new nodes_1.OrderedListItemBlockNode(block, textNodes);\n                        var orderedList = new nodes_1.OrderedListBlockNode(richtext_1.RichTextBlock.emptyOrderedList(), [orderedListItem]);\n                        return acc.concat(orderedList);\n                    }\n                    else {\n                        return acc.concat(new nodes_1.BlockNode(block.type, block, textNodes));\n                    }\n                }\n            }, [])\n        };\n    };\n    Tree.NODE_TYPES = types_1.NODE_TYPES;\n    return Tree;\n}());\nexports[\"default\"] = Tree;\n\n\n//# sourceURL=webpack://PrismicRichtext/./src/tree.ts?");

/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nexports.NODE_TYPES = {\n    heading1: \"heading1\",\n    heading2: \"heading2\",\n    heading3: \"heading3\",\n    heading4: \"heading4\",\n    heading5: \"heading5\",\n    heading6: \"heading6\",\n    paragraph: \"paragraph\",\n    preformatted: \"preformatted\",\n    strong: \"strong\",\n    em: \"em\",\n    listItem: \"list-item\",\n    oListItem: \"o-list-item\",\n    list: \"group-list-item\",\n    oList: \"group-o-list-item\",\n    image: \"image\",\n    embed: \"embed\",\n    hyperlink: \"hyperlink\",\n    label: \"label\",\n    span: \"span\"\n};\nexports.PRIORITIES = (_a = {},\n    _a[exports.NODE_TYPES.heading1] = 4,\n    _a[exports.NODE_TYPES.heading2] = 4,\n    _a[exports.NODE_TYPES.heading3] = 4,\n    _a[exports.NODE_TYPES.heading4] = 4,\n    _a[exports.NODE_TYPES.heading5] = 4,\n    _a[exports.NODE_TYPES.heading6] = 4,\n    _a[exports.NODE_TYPES.paragraph] = 3,\n    _a[exports.NODE_TYPES.preformatted] = 5,\n    _a[exports.NODE_TYPES.strong] = 6,\n    _a[exports.NODE_TYPES.em] = 6,\n    _a[exports.NODE_TYPES.oList] = 1,\n    _a[exports.NODE_TYPES.list] = 1,\n    _a[exports.NODE_TYPES.listItem] = 1,\n    _a[exports.NODE_TYPES.oListItem] = 1,\n    _a[exports.NODE_TYPES.image] = 1,\n    _a[exports.NODE_TYPES.embed] = 1,\n    _a[exports.NODE_TYPES.hyperlink] = 3,\n    _a[exports.NODE_TYPES.label] = 4,\n    _a[exports.NODE_TYPES.span] = 7,\n    _a);\nvar _a;\n\n\n//# sourceURL=webpack://PrismicRichtext/./src/types.ts?");

/***/ }),

/***/ "./src/uuid.ts":
/*!*********************!*\
  !*** ./src/uuid.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nfunction uuid() {\n    var d = new Date().getTime();\n    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {\n        var r = (d + Math.random() * 16) % 16 | 0;\n        d = Math.floor(d / 16);\n        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);\n    });\n    return uuid;\n}\nexports[\"default\"] = uuid;\n;\n\n\n//# sourceURL=webpack://PrismicRichtext/./src/uuid.ts?");

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! /apps/prismic-richtext/src/index.ts */\"./src/index.ts\");\n\n\n//# sourceURL=webpack://PrismicRichtext/multi_./src/index.ts?");

/***/ })

/******/ });
});