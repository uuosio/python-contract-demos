var eosjs_jssig =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/eosjs-jssig.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/bn.js/lib/bn.js":
/*!**************************************!*\
  !*** ./node_modules/bn.js/lib/bn.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {(function (module, exports) {
  'use strict';

  // Utils
  function assert (val, msg) {
    if (!val) throw new Error(msg || 'Assertion failed');
  }

  // Could use `inherits` module, but don't want to move from single file
  // architecture yet.
  function inherits (ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function () {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  }

  // BN

  function BN (number, base, endian) {
    if (BN.isBN(number)) {
      return number;
    }

    this.negative = 0;
    this.words = null;
    this.length = 0;

    // Reduction context
    this.red = null;

    if (number !== null) {
      if (base === 'le' || base === 'be') {
        endian = base;
        base = 10;
      }

      this._init(number || 0, base || 10, endian || 'be');
    }
  }
  if (typeof module === 'object') {
    module.exports = BN;
  } else {
    exports.BN = BN;
  }

  BN.BN = BN;
  BN.wordSize = 26;

  var Buffer;
  try {
    Buffer = __webpack_require__(/*! buffer */ 0).Buffer;
  } catch (e) {
  }

  BN.isBN = function isBN (num) {
    if (num instanceof BN) {
      return true;
    }

    return num !== null && typeof num === 'object' &&
      num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
  };

  BN.max = function max (left, right) {
    if (left.cmp(right) > 0) return left;
    return right;
  };

  BN.min = function min (left, right) {
    if (left.cmp(right) < 0) return left;
    return right;
  };

  BN.prototype._init = function init (number, base, endian) {
    if (typeof number === 'number') {
      return this._initNumber(number, base, endian);
    }

    if (typeof number === 'object') {
      return this._initArray(number, base, endian);
    }

    if (base === 'hex') {
      base = 16;
    }
    assert(base === (base | 0) && base >= 2 && base <= 36);

    number = number.toString().replace(/\s+/g, '');
    var start = 0;
    if (number[0] === '-') {
      start++;
    }

    if (base === 16) {
      this._parseHex(number, start);
    } else {
      this._parseBase(number, base, start);
    }

    if (number[0] === '-') {
      this.negative = 1;
    }

    this.strip();

    if (endian !== 'le') return;

    this._initArray(this.toArray(), base, endian);
  };

  BN.prototype._initNumber = function _initNumber (number, base, endian) {
    if (number < 0) {
      this.negative = 1;
      number = -number;
    }
    if (number < 0x4000000) {
      this.words = [ number & 0x3ffffff ];
      this.length = 1;
    } else if (number < 0x10000000000000) {
      this.words = [
        number & 0x3ffffff,
        (number / 0x4000000) & 0x3ffffff
      ];
      this.length = 2;
    } else {
      assert(number < 0x20000000000000); // 2 ^ 53 (unsafe)
      this.words = [
        number & 0x3ffffff,
        (number / 0x4000000) & 0x3ffffff,
        1
      ];
      this.length = 3;
    }

    if (endian !== 'le') return;

    // Reverse the bytes
    this._initArray(this.toArray(), base, endian);
  };

  BN.prototype._initArray = function _initArray (number, base, endian) {
    // Perhaps a Uint8Array
    assert(typeof number.length === 'number');
    if (number.length <= 0) {
      this.words = [ 0 ];
      this.length = 1;
      return this;
    }

    this.length = Math.ceil(number.length / 3);
    this.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    }

    var j, w;
    var off = 0;
    if (endian === 'be') {
      for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
        w = number[i] | (number[i - 1] << 8) | (number[i - 2] << 16);
        this.words[j] |= (w << off) & 0x3ffffff;
        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
        off += 24;
        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    } else if (endian === 'le') {
      for (i = 0, j = 0; i < number.length; i += 3) {
        w = number[i] | (number[i + 1] << 8) | (number[i + 2] << 16);
        this.words[j] |= (w << off) & 0x3ffffff;
        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
        off += 24;
        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    }
    return this.strip();
  };

  function parseHex (str, start, end) {
    var r = 0;
    var len = Math.min(str.length, end);
    for (var i = start; i < len; i++) {
      var c = str.charCodeAt(i) - 48;

      r <<= 4;

      // 'a' - 'f'
      if (c >= 49 && c <= 54) {
        r |= c - 49 + 0xa;

      // 'A' - 'F'
      } else if (c >= 17 && c <= 22) {
        r |= c - 17 + 0xa;

      // '0' - '9'
      } else {
        r |= c & 0xf;
      }
    }
    return r;
  }

  BN.prototype._parseHex = function _parseHex (number, start) {
    // Create possibly bigger array to ensure that it fits the number
    this.length = Math.ceil((number.length - start) / 6);
    this.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    }

    var j, w;
    // Scan 24-bit chunks and add them to the number
    var off = 0;
    for (i = number.length - 6, j = 0; i >= start; i -= 6) {
      w = parseHex(number, i, i + 6);
      this.words[j] |= (w << off) & 0x3ffffff;
      // NOTE: `0x3fffff` is intentional here, 26bits max shift + 24bit hex limb
      this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
      off += 24;
      if (off >= 26) {
        off -= 26;
        j++;
      }
    }
    if (i + 6 !== start) {
      w = parseHex(number, start, i + 6);
      this.words[j] |= (w << off) & 0x3ffffff;
      this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
    }
    this.strip();
  };

  function parseBase (str, start, end, mul) {
    var r = 0;
    var len = Math.min(str.length, end);
    for (var i = start; i < len; i++) {
      var c = str.charCodeAt(i) - 48;

      r *= mul;

      // 'a'
      if (c >= 49) {
        r += c - 49 + 0xa;

      // 'A'
      } else if (c >= 17) {
        r += c - 17 + 0xa;

      // '0' - '9'
      } else {
        r += c;
      }
    }
    return r;
  }

  BN.prototype._parseBase = function _parseBase (number, base, start) {
    // Initialize as zero
    this.words = [ 0 ];
    this.length = 1;

    // Find length of limb in base
    for (var limbLen = 0, limbPow = 1; limbPow <= 0x3ffffff; limbPow *= base) {
      limbLen++;
    }
    limbLen--;
    limbPow = (limbPow / base) | 0;

    var total = number.length - start;
    var mod = total % limbLen;
    var end = Math.min(total, total - mod) + start;

    var word = 0;
    for (var i = start; i < end; i += limbLen) {
      word = parseBase(number, i, i + limbLen, base);

      this.imuln(limbPow);
      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }

    if (mod !== 0) {
      var pow = 1;
      word = parseBase(number, i, number.length, base);

      for (i = 0; i < mod; i++) {
        pow *= base;
      }

      this.imuln(pow);
      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }
  };

  BN.prototype.copy = function copy (dest) {
    dest.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      dest.words[i] = this.words[i];
    }
    dest.length = this.length;
    dest.negative = this.negative;
    dest.red = this.red;
  };

  BN.prototype.clone = function clone () {
    var r = new BN(null);
    this.copy(r);
    return r;
  };

  BN.prototype._expand = function _expand (size) {
    while (this.length < size) {
      this.words[this.length++] = 0;
    }
    return this;
  };

  // Remove leading `0` from `this`
  BN.prototype.strip = function strip () {
    while (this.length > 1 && this.words[this.length - 1] === 0) {
      this.length--;
    }
    return this._normSign();
  };

  BN.prototype._normSign = function _normSign () {
    // -0 = 0
    if (this.length === 1 && this.words[0] === 0) {
      this.negative = 0;
    }
    return this;
  };

  BN.prototype.inspect = function inspect () {
    return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
  };

  /*

  var zeros = [];
  var groupSizes = [];
  var groupBases = [];

  var s = '';
  var i = -1;
  while (++i < BN.wordSize) {
    zeros[i] = s;
    s += '0';
  }
  groupSizes[0] = 0;
  groupSizes[1] = 0;
  groupBases[0] = 0;
  groupBases[1] = 0;
  var base = 2 - 1;
  while (++base < 36 + 1) {
    var groupSize = 0;
    var groupBase = 1;
    while (groupBase < (1 << BN.wordSize) / base) {
      groupBase *= base;
      groupSize += 1;
    }
    groupSizes[base] = groupSize;
    groupBases[base] = groupBase;
  }

  */

  var zeros = [
    '',
    '0',
    '00',
    '000',
    '0000',
    '00000',
    '000000',
    '0000000',
    '00000000',
    '000000000',
    '0000000000',
    '00000000000',
    '000000000000',
    '0000000000000',
    '00000000000000',
    '000000000000000',
    '0000000000000000',
    '00000000000000000',
    '000000000000000000',
    '0000000000000000000',
    '00000000000000000000',
    '000000000000000000000',
    '0000000000000000000000',
    '00000000000000000000000',
    '000000000000000000000000',
    '0000000000000000000000000'
  ];

  var groupSizes = [
    0, 0,
    25, 16, 12, 11, 10, 9, 8,
    8, 7, 7, 7, 7, 6, 6,
    6, 6, 6, 6, 6, 5, 5,
    5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 5, 5
  ];

  var groupBases = [
    0, 0,
    33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216,
    43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625,
    16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632,
    6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149,
    24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176
  ];

  BN.prototype.toString = function toString (base, padding) {
    base = base || 10;
    padding = padding | 0 || 1;

    var out;
    if (base === 16 || base === 'hex') {
      out = '';
      var off = 0;
      var carry = 0;
      for (var i = 0; i < this.length; i++) {
        var w = this.words[i];
        var word = (((w << off) | carry) & 0xffffff).toString(16);
        carry = (w >>> (24 - off)) & 0xffffff;
        if (carry !== 0 || i !== this.length - 1) {
          out = zeros[6 - word.length] + word + out;
        } else {
          out = word + out;
        }
        off += 2;
        if (off >= 26) {
          off -= 26;
          i--;
        }
      }
      if (carry !== 0) {
        out = carry.toString(16) + out;
      }
      while (out.length % padding !== 0) {
        out = '0' + out;
      }
      if (this.negative !== 0) {
        out = '-' + out;
      }
      return out;
    }

    if (base === (base | 0) && base >= 2 && base <= 36) {
      // var groupSize = Math.floor(BN.wordSize * Math.LN2 / Math.log(base));
      var groupSize = groupSizes[base];
      // var groupBase = Math.pow(base, groupSize);
      var groupBase = groupBases[base];
      out = '';
      var c = this.clone();
      c.negative = 0;
      while (!c.isZero()) {
        var r = c.modn(groupBase).toString(base);
        c = c.idivn(groupBase);

        if (!c.isZero()) {
          out = zeros[groupSize - r.length] + r + out;
        } else {
          out = r + out;
        }
      }
      if (this.isZero()) {
        out = '0' + out;
      }
      while (out.length % padding !== 0) {
        out = '0' + out;
      }
      if (this.negative !== 0) {
        out = '-' + out;
      }
      return out;
    }

    assert(false, 'Base should be between 2 and 36');
  };

  BN.prototype.toNumber = function toNumber () {
    var ret = this.words[0];
    if (this.length === 2) {
      ret += this.words[1] * 0x4000000;
    } else if (this.length === 3 && this.words[2] === 0x01) {
      // NOTE: at this stage it is known that the top bit is set
      ret += 0x10000000000000 + (this.words[1] * 0x4000000);
    } else if (this.length > 2) {
      assert(false, 'Number can only safely store up to 53 bits');
    }
    return (this.negative !== 0) ? -ret : ret;
  };

  BN.prototype.toJSON = function toJSON () {
    return this.toString(16);
  };

  BN.prototype.toBuffer = function toBuffer (endian, length) {
    assert(typeof Buffer !== 'undefined');
    return this.toArrayLike(Buffer, endian, length);
  };

  BN.prototype.toArray = function toArray (endian, length) {
    return this.toArrayLike(Array, endian, length);
  };

  BN.prototype.toArrayLike = function toArrayLike (ArrayType, endian, length) {
    var byteLength = this.byteLength();
    var reqLength = length || Math.max(1, byteLength);
    assert(byteLength <= reqLength, 'byte array longer than desired length');
    assert(reqLength > 0, 'Requested array length <= 0');

    this.strip();
    var littleEndian = endian === 'le';
    var res = new ArrayType(reqLength);

    var b, i;
    var q = this.clone();
    if (!littleEndian) {
      // Assume big-endian
      for (i = 0; i < reqLength - byteLength; i++) {
        res[i] = 0;
      }

      for (i = 0; !q.isZero(); i++) {
        b = q.andln(0xff);
        q.iushrn(8);

        res[reqLength - i - 1] = b;
      }
    } else {
      for (i = 0; !q.isZero(); i++) {
        b = q.andln(0xff);
        q.iushrn(8);

        res[i] = b;
      }

      for (; i < reqLength; i++) {
        res[i] = 0;
      }
    }

    return res;
  };

  if (Math.clz32) {
    BN.prototype._countBits = function _countBits (w) {
      return 32 - Math.clz32(w);
    };
  } else {
    BN.prototype._countBits = function _countBits (w) {
      var t = w;
      var r = 0;
      if (t >= 0x1000) {
        r += 13;
        t >>>= 13;
      }
      if (t >= 0x40) {
        r += 7;
        t >>>= 7;
      }
      if (t >= 0x8) {
        r += 4;
        t >>>= 4;
      }
      if (t >= 0x02) {
        r += 2;
        t >>>= 2;
      }
      return r + t;
    };
  }

  BN.prototype._zeroBits = function _zeroBits (w) {
    // Short-cut
    if (w === 0) return 26;

    var t = w;
    var r = 0;
    if ((t & 0x1fff) === 0) {
      r += 13;
      t >>>= 13;
    }
    if ((t & 0x7f) === 0) {
      r += 7;
      t >>>= 7;
    }
    if ((t & 0xf) === 0) {
      r += 4;
      t >>>= 4;
    }
    if ((t & 0x3) === 0) {
      r += 2;
      t >>>= 2;
    }
    if ((t & 0x1) === 0) {
      r++;
    }
    return r;
  };

  // Return number of used bits in a BN
  BN.prototype.bitLength = function bitLength () {
    var w = this.words[this.length - 1];
    var hi = this._countBits(w);
    return (this.length - 1) * 26 + hi;
  };

  function toBitArray (num) {
    var w = new Array(num.bitLength());

    for (var bit = 0; bit < w.length; bit++) {
      var off = (bit / 26) | 0;
      var wbit = bit % 26;

      w[bit] = (num.words[off] & (1 << wbit)) >>> wbit;
    }

    return w;
  }

  // Number of trailing zero bits
  BN.prototype.zeroBits = function zeroBits () {
    if (this.isZero()) return 0;

    var r = 0;
    for (var i = 0; i < this.length; i++) {
      var b = this._zeroBits(this.words[i]);
      r += b;
      if (b !== 26) break;
    }
    return r;
  };

  BN.prototype.byteLength = function byteLength () {
    return Math.ceil(this.bitLength() / 8);
  };

  BN.prototype.toTwos = function toTwos (width) {
    if (this.negative !== 0) {
      return this.abs().inotn(width).iaddn(1);
    }
    return this.clone();
  };

  BN.prototype.fromTwos = function fromTwos (width) {
    if (this.testn(width - 1)) {
      return this.notn(width).iaddn(1).ineg();
    }
    return this.clone();
  };

  BN.prototype.isNeg = function isNeg () {
    return this.negative !== 0;
  };

  // Return negative clone of `this`
  BN.prototype.neg = function neg () {
    return this.clone().ineg();
  };

  BN.prototype.ineg = function ineg () {
    if (!this.isZero()) {
      this.negative ^= 1;
    }

    return this;
  };

  // Or `num` with `this` in-place
  BN.prototype.iuor = function iuor (num) {
    while (this.length < num.length) {
      this.words[this.length++] = 0;
    }

    for (var i = 0; i < num.length; i++) {
      this.words[i] = this.words[i] | num.words[i];
    }

    return this.strip();
  };

  BN.prototype.ior = function ior (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuor(num);
  };

  // Or `num` with `this`
  BN.prototype.or = function or (num) {
    if (this.length > num.length) return this.clone().ior(num);
    return num.clone().ior(this);
  };

  BN.prototype.uor = function uor (num) {
    if (this.length > num.length) return this.clone().iuor(num);
    return num.clone().iuor(this);
  };

  // And `num` with `this` in-place
  BN.prototype.iuand = function iuand (num) {
    // b = min-length(num, this)
    var b;
    if (this.length > num.length) {
      b = num;
    } else {
      b = this;
    }

    for (var i = 0; i < b.length; i++) {
      this.words[i] = this.words[i] & num.words[i];
    }

    this.length = b.length;

    return this.strip();
  };

  BN.prototype.iand = function iand (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuand(num);
  };

  // And `num` with `this`
  BN.prototype.and = function and (num) {
    if (this.length > num.length) return this.clone().iand(num);
    return num.clone().iand(this);
  };

  BN.prototype.uand = function uand (num) {
    if (this.length > num.length) return this.clone().iuand(num);
    return num.clone().iuand(this);
  };

  // Xor `num` with `this` in-place
  BN.prototype.iuxor = function iuxor (num) {
    // a.length > b.length
    var a;
    var b;
    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    for (var i = 0; i < b.length; i++) {
      this.words[i] = a.words[i] ^ b.words[i];
    }

    if (this !== a) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    this.length = a.length;

    return this.strip();
  };

  BN.prototype.ixor = function ixor (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuxor(num);
  };

  // Xor `num` with `this`
  BN.prototype.xor = function xor (num) {
    if (this.length > num.length) return this.clone().ixor(num);
    return num.clone().ixor(this);
  };

  BN.prototype.uxor = function uxor (num) {
    if (this.length > num.length) return this.clone().iuxor(num);
    return num.clone().iuxor(this);
  };

  // Not ``this`` with ``width`` bitwidth
  BN.prototype.inotn = function inotn (width) {
    assert(typeof width === 'number' && width >= 0);

    var bytesNeeded = Math.ceil(width / 26) | 0;
    var bitsLeft = width % 26;

    // Extend the buffer with leading zeroes
    this._expand(bytesNeeded);

    if (bitsLeft > 0) {
      bytesNeeded--;
    }

    // Handle complete words
    for (var i = 0; i < bytesNeeded; i++) {
      this.words[i] = ~this.words[i] & 0x3ffffff;
    }

    // Handle the residue
    if (bitsLeft > 0) {
      this.words[i] = ~this.words[i] & (0x3ffffff >> (26 - bitsLeft));
    }

    // And remove leading zeroes
    return this.strip();
  };

  BN.prototype.notn = function notn (width) {
    return this.clone().inotn(width);
  };

  // Set `bit` of `this`
  BN.prototype.setn = function setn (bit, val) {
    assert(typeof bit === 'number' && bit >= 0);

    var off = (bit / 26) | 0;
    var wbit = bit % 26;

    this._expand(off + 1);

    if (val) {
      this.words[off] = this.words[off] | (1 << wbit);
    } else {
      this.words[off] = this.words[off] & ~(1 << wbit);
    }

    return this.strip();
  };

  // Add `num` to `this` in-place
  BN.prototype.iadd = function iadd (num) {
    var r;

    // negative + positive
    if (this.negative !== 0 && num.negative === 0) {
      this.negative = 0;
      r = this.isub(num);
      this.negative ^= 1;
      return this._normSign();

    // positive + negative
    } else if (this.negative === 0 && num.negative !== 0) {
      num.negative = 0;
      r = this.isub(num);
      num.negative = 1;
      return r._normSign();
    }

    // a.length > b.length
    var a, b;
    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    var carry = 0;
    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }
    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }

    this.length = a.length;
    if (carry !== 0) {
      this.words[this.length] = carry;
      this.length++;
    // Copy the rest of the words
    } else if (a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    return this;
  };

  // Add `num` to `this`
  BN.prototype.add = function add (num) {
    var res;
    if (num.negative !== 0 && this.negative === 0) {
      num.negative = 0;
      res = this.sub(num);
      num.negative ^= 1;
      return res;
    } else if (num.negative === 0 && this.negative !== 0) {
      this.negative = 0;
      res = num.sub(this);
      this.negative = 1;
      return res;
    }

    if (this.length > num.length) return this.clone().iadd(num);

    return num.clone().iadd(this);
  };

  // Subtract `num` from `this` in-place
  BN.prototype.isub = function isub (num) {
    // this - (-num) = this + num
    if (num.negative !== 0) {
      num.negative = 0;
      var r = this.iadd(num);
      num.negative = 1;
      return r._normSign();

    // -this - num = -(this + num)
    } else if (this.negative !== 0) {
      this.negative = 0;
      this.iadd(num);
      this.negative = 1;
      return this._normSign();
    }

    // At this point both numbers are positive
    var cmp = this.cmp(num);

    // Optimization - zeroify
    if (cmp === 0) {
      this.negative = 0;
      this.length = 1;
      this.words[0] = 0;
      return this;
    }

    // a > b
    var a, b;
    if (cmp > 0) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    var carry = 0;
    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    }
    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    }

    // Copy rest of the words
    if (carry === 0 && i < a.length && a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    this.length = Math.max(this.length, i);

    if (a !== this) {
      this.negative = 1;
    }

    return this.strip();
  };

  // Subtract `num` from `this`
  BN.prototype.sub = function sub (num) {
    return this.clone().isub(num);
  };

  function smallMulTo (self, num, out) {
    out.negative = num.negative ^ self.negative;
    var len = (self.length + num.length) | 0;
    out.length = len;
    len = (len - 1) | 0;

    // Peel one iteration (compiler can't do it, because of code complexity)
    var a = self.words[0] | 0;
    var b = num.words[0] | 0;
    var r = a * b;

    var lo = r & 0x3ffffff;
    var carry = (r / 0x4000000) | 0;
    out.words[0] = lo;

    for (var k = 1; k < len; k++) {
      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
      // note that ncarry could be >= 0x3ffffff
      var ncarry = carry >>> 26;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);
      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = (k - j) | 0;
        a = self.words[i] | 0;
        b = num.words[j] | 0;
        r = a * b + rword;
        ncarry += (r / 0x4000000) | 0;
        rword = r & 0x3ffffff;
      }
      out.words[k] = rword | 0;
      carry = ncarry | 0;
    }
    if (carry !== 0) {
      out.words[k] = carry | 0;
    } else {
      out.length--;
    }

    return out.strip();
  }

  // TODO(indutny): it may be reasonable to omit it for users who don't need
  // to work with 256-bit numbers, otherwise it gives 20% improvement for 256-bit
  // multiplication (like elliptic secp256k1).
  var comb10MulTo = function comb10MulTo (self, num, out) {
    var a = self.words;
    var b = num.words;
    var o = out.words;
    var c = 0;
    var lo;
    var mid;
    var hi;
    var a0 = a[0] | 0;
    var al0 = a0 & 0x1fff;
    var ah0 = a0 >>> 13;
    var a1 = a[1] | 0;
    var al1 = a1 & 0x1fff;
    var ah1 = a1 >>> 13;
    var a2 = a[2] | 0;
    var al2 = a2 & 0x1fff;
    var ah2 = a2 >>> 13;
    var a3 = a[3] | 0;
    var al3 = a3 & 0x1fff;
    var ah3 = a3 >>> 13;
    var a4 = a[4] | 0;
    var al4 = a4 & 0x1fff;
    var ah4 = a4 >>> 13;
    var a5 = a[5] | 0;
    var al5 = a5 & 0x1fff;
    var ah5 = a5 >>> 13;
    var a6 = a[6] | 0;
    var al6 = a6 & 0x1fff;
    var ah6 = a6 >>> 13;
    var a7 = a[7] | 0;
    var al7 = a7 & 0x1fff;
    var ah7 = a7 >>> 13;
    var a8 = a[8] | 0;
    var al8 = a8 & 0x1fff;
    var ah8 = a8 >>> 13;
    var a9 = a[9] | 0;
    var al9 = a9 & 0x1fff;
    var ah9 = a9 >>> 13;
    var b0 = b[0] | 0;
    var bl0 = b0 & 0x1fff;
    var bh0 = b0 >>> 13;
    var b1 = b[1] | 0;
    var bl1 = b1 & 0x1fff;
    var bh1 = b1 >>> 13;
    var b2 = b[2] | 0;
    var bl2 = b2 & 0x1fff;
    var bh2 = b2 >>> 13;
    var b3 = b[3] | 0;
    var bl3 = b3 & 0x1fff;
    var bh3 = b3 >>> 13;
    var b4 = b[4] | 0;
    var bl4 = b4 & 0x1fff;
    var bh4 = b4 >>> 13;
    var b5 = b[5] | 0;
    var bl5 = b5 & 0x1fff;
    var bh5 = b5 >>> 13;
    var b6 = b[6] | 0;
    var bl6 = b6 & 0x1fff;
    var bh6 = b6 >>> 13;
    var b7 = b[7] | 0;
    var bl7 = b7 & 0x1fff;
    var bh7 = b7 >>> 13;
    var b8 = b[8] | 0;
    var bl8 = b8 & 0x1fff;
    var bh8 = b8 >>> 13;
    var b9 = b[9] | 0;
    var bl9 = b9 & 0x1fff;
    var bh9 = b9 >>> 13;

    out.negative = self.negative ^ num.negative;
    out.length = 19;
    /* k = 0 */
    lo = Math.imul(al0, bl0);
    mid = Math.imul(al0, bh0);
    mid = (mid + Math.imul(ah0, bl0)) | 0;
    hi = Math.imul(ah0, bh0);
    var w0 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w0 >>> 26)) | 0;
    w0 &= 0x3ffffff;
    /* k = 1 */
    lo = Math.imul(al1, bl0);
    mid = Math.imul(al1, bh0);
    mid = (mid + Math.imul(ah1, bl0)) | 0;
    hi = Math.imul(ah1, bh0);
    lo = (lo + Math.imul(al0, bl1)) | 0;
    mid = (mid + Math.imul(al0, bh1)) | 0;
    mid = (mid + Math.imul(ah0, bl1)) | 0;
    hi = (hi + Math.imul(ah0, bh1)) | 0;
    var w1 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w1 >>> 26)) | 0;
    w1 &= 0x3ffffff;
    /* k = 2 */
    lo = Math.imul(al2, bl0);
    mid = Math.imul(al2, bh0);
    mid = (mid + Math.imul(ah2, bl0)) | 0;
    hi = Math.imul(ah2, bh0);
    lo = (lo + Math.imul(al1, bl1)) | 0;
    mid = (mid + Math.imul(al1, bh1)) | 0;
    mid = (mid + Math.imul(ah1, bl1)) | 0;
    hi = (hi + Math.imul(ah1, bh1)) | 0;
    lo = (lo + Math.imul(al0, bl2)) | 0;
    mid = (mid + Math.imul(al0, bh2)) | 0;
    mid = (mid + Math.imul(ah0, bl2)) | 0;
    hi = (hi + Math.imul(ah0, bh2)) | 0;
    var w2 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w2 >>> 26)) | 0;
    w2 &= 0x3ffffff;
    /* k = 3 */
    lo = Math.imul(al3, bl0);
    mid = Math.imul(al3, bh0);
    mid = (mid + Math.imul(ah3, bl0)) | 0;
    hi = Math.imul(ah3, bh0);
    lo = (lo + Math.imul(al2, bl1)) | 0;
    mid = (mid + Math.imul(al2, bh1)) | 0;
    mid = (mid + Math.imul(ah2, bl1)) | 0;
    hi = (hi + Math.imul(ah2, bh1)) | 0;
    lo = (lo + Math.imul(al1, bl2)) | 0;
    mid = (mid + Math.imul(al1, bh2)) | 0;
    mid = (mid + Math.imul(ah1, bl2)) | 0;
    hi = (hi + Math.imul(ah1, bh2)) | 0;
    lo = (lo + Math.imul(al0, bl3)) | 0;
    mid = (mid + Math.imul(al0, bh3)) | 0;
    mid = (mid + Math.imul(ah0, bl3)) | 0;
    hi = (hi + Math.imul(ah0, bh3)) | 0;
    var w3 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w3 >>> 26)) | 0;
    w3 &= 0x3ffffff;
    /* k = 4 */
    lo = Math.imul(al4, bl0);
    mid = Math.imul(al4, bh0);
    mid = (mid + Math.imul(ah4, bl0)) | 0;
    hi = Math.imul(ah4, bh0);
    lo = (lo + Math.imul(al3, bl1)) | 0;
    mid = (mid + Math.imul(al3, bh1)) | 0;
    mid = (mid + Math.imul(ah3, bl1)) | 0;
    hi = (hi + Math.imul(ah3, bh1)) | 0;
    lo = (lo + Math.imul(al2, bl2)) | 0;
    mid = (mid + Math.imul(al2, bh2)) | 0;
    mid = (mid + Math.imul(ah2, bl2)) | 0;
    hi = (hi + Math.imul(ah2, bh2)) | 0;
    lo = (lo + Math.imul(al1, bl3)) | 0;
    mid = (mid + Math.imul(al1, bh3)) | 0;
    mid = (mid + Math.imul(ah1, bl3)) | 0;
    hi = (hi + Math.imul(ah1, bh3)) | 0;
    lo = (lo + Math.imul(al0, bl4)) | 0;
    mid = (mid + Math.imul(al0, bh4)) | 0;
    mid = (mid + Math.imul(ah0, bl4)) | 0;
    hi = (hi + Math.imul(ah0, bh4)) | 0;
    var w4 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w4 >>> 26)) | 0;
    w4 &= 0x3ffffff;
    /* k = 5 */
    lo = Math.imul(al5, bl0);
    mid = Math.imul(al5, bh0);
    mid = (mid + Math.imul(ah5, bl0)) | 0;
    hi = Math.imul(ah5, bh0);
    lo = (lo + Math.imul(al4, bl1)) | 0;
    mid = (mid + Math.imul(al4, bh1)) | 0;
    mid = (mid + Math.imul(ah4, bl1)) | 0;
    hi = (hi + Math.imul(ah4, bh1)) | 0;
    lo = (lo + Math.imul(al3, bl2)) | 0;
    mid = (mid + Math.imul(al3, bh2)) | 0;
    mid = (mid + Math.imul(ah3, bl2)) | 0;
    hi = (hi + Math.imul(ah3, bh2)) | 0;
    lo = (lo + Math.imul(al2, bl3)) | 0;
    mid = (mid + Math.imul(al2, bh3)) | 0;
    mid = (mid + Math.imul(ah2, bl3)) | 0;
    hi = (hi + Math.imul(ah2, bh3)) | 0;
    lo = (lo + Math.imul(al1, bl4)) | 0;
    mid = (mid + Math.imul(al1, bh4)) | 0;
    mid = (mid + Math.imul(ah1, bl4)) | 0;
    hi = (hi + Math.imul(ah1, bh4)) | 0;
    lo = (lo + Math.imul(al0, bl5)) | 0;
    mid = (mid + Math.imul(al0, bh5)) | 0;
    mid = (mid + Math.imul(ah0, bl5)) | 0;
    hi = (hi + Math.imul(ah0, bh5)) | 0;
    var w5 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w5 >>> 26)) | 0;
    w5 &= 0x3ffffff;
    /* k = 6 */
    lo = Math.imul(al6, bl0);
    mid = Math.imul(al6, bh0);
    mid = (mid + Math.imul(ah6, bl0)) | 0;
    hi = Math.imul(ah6, bh0);
    lo = (lo + Math.imul(al5, bl1)) | 0;
    mid = (mid + Math.imul(al5, bh1)) | 0;
    mid = (mid + Math.imul(ah5, bl1)) | 0;
    hi = (hi + Math.imul(ah5, bh1)) | 0;
    lo = (lo + Math.imul(al4, bl2)) | 0;
    mid = (mid + Math.imul(al4, bh2)) | 0;
    mid = (mid + Math.imul(ah4, bl2)) | 0;
    hi = (hi + Math.imul(ah4, bh2)) | 0;
    lo = (lo + Math.imul(al3, bl3)) | 0;
    mid = (mid + Math.imul(al3, bh3)) | 0;
    mid = (mid + Math.imul(ah3, bl3)) | 0;
    hi = (hi + Math.imul(ah3, bh3)) | 0;
    lo = (lo + Math.imul(al2, bl4)) | 0;
    mid = (mid + Math.imul(al2, bh4)) | 0;
    mid = (mid + Math.imul(ah2, bl4)) | 0;
    hi = (hi + Math.imul(ah2, bh4)) | 0;
    lo = (lo + Math.imul(al1, bl5)) | 0;
    mid = (mid + Math.imul(al1, bh5)) | 0;
    mid = (mid + Math.imul(ah1, bl5)) | 0;
    hi = (hi + Math.imul(ah1, bh5)) | 0;
    lo = (lo + Math.imul(al0, bl6)) | 0;
    mid = (mid + Math.imul(al0, bh6)) | 0;
    mid = (mid + Math.imul(ah0, bl6)) | 0;
    hi = (hi + Math.imul(ah0, bh6)) | 0;
    var w6 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w6 >>> 26)) | 0;
    w6 &= 0x3ffffff;
    /* k = 7 */
    lo = Math.imul(al7, bl0);
    mid = Math.imul(al7, bh0);
    mid = (mid + Math.imul(ah7, bl0)) | 0;
    hi = Math.imul(ah7, bh0);
    lo = (lo + Math.imul(al6, bl1)) | 0;
    mid = (mid + Math.imul(al6, bh1)) | 0;
    mid = (mid + Math.imul(ah6, bl1)) | 0;
    hi = (hi + Math.imul(ah6, bh1)) | 0;
    lo = (lo + Math.imul(al5, bl2)) | 0;
    mid = (mid + Math.imul(al5, bh2)) | 0;
    mid = (mid + Math.imul(ah5, bl2)) | 0;
    hi = (hi + Math.imul(ah5, bh2)) | 0;
    lo = (lo + Math.imul(al4, bl3)) | 0;
    mid = (mid + Math.imul(al4, bh3)) | 0;
    mid = (mid + Math.imul(ah4, bl3)) | 0;
    hi = (hi + Math.imul(ah4, bh3)) | 0;
    lo = (lo + Math.imul(al3, bl4)) | 0;
    mid = (mid + Math.imul(al3, bh4)) | 0;
    mid = (mid + Math.imul(ah3, bl4)) | 0;
    hi = (hi + Math.imul(ah3, bh4)) | 0;
    lo = (lo + Math.imul(al2, bl5)) | 0;
    mid = (mid + Math.imul(al2, bh5)) | 0;
    mid = (mid + Math.imul(ah2, bl5)) | 0;
    hi = (hi + Math.imul(ah2, bh5)) | 0;
    lo = (lo + Math.imul(al1, bl6)) | 0;
    mid = (mid + Math.imul(al1, bh6)) | 0;
    mid = (mid + Math.imul(ah1, bl6)) | 0;
    hi = (hi + Math.imul(ah1, bh6)) | 0;
    lo = (lo + Math.imul(al0, bl7)) | 0;
    mid = (mid + Math.imul(al0, bh7)) | 0;
    mid = (mid + Math.imul(ah0, bl7)) | 0;
    hi = (hi + Math.imul(ah0, bh7)) | 0;
    var w7 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w7 >>> 26)) | 0;
    w7 &= 0x3ffffff;
    /* k = 8 */
    lo = Math.imul(al8, bl0);
    mid = Math.imul(al8, bh0);
    mid = (mid + Math.imul(ah8, bl0)) | 0;
    hi = Math.imul(ah8, bh0);
    lo = (lo + Math.imul(al7, bl1)) | 0;
    mid = (mid + Math.imul(al7, bh1)) | 0;
    mid = (mid + Math.imul(ah7, bl1)) | 0;
    hi = (hi + Math.imul(ah7, bh1)) | 0;
    lo = (lo + Math.imul(al6, bl2)) | 0;
    mid = (mid + Math.imul(al6, bh2)) | 0;
    mid = (mid + Math.imul(ah6, bl2)) | 0;
    hi = (hi + Math.imul(ah6, bh2)) | 0;
    lo = (lo + Math.imul(al5, bl3)) | 0;
    mid = (mid + Math.imul(al5, bh3)) | 0;
    mid = (mid + Math.imul(ah5, bl3)) | 0;
    hi = (hi + Math.imul(ah5, bh3)) | 0;
    lo = (lo + Math.imul(al4, bl4)) | 0;
    mid = (mid + Math.imul(al4, bh4)) | 0;
    mid = (mid + Math.imul(ah4, bl4)) | 0;
    hi = (hi + Math.imul(ah4, bh4)) | 0;
    lo = (lo + Math.imul(al3, bl5)) | 0;
    mid = (mid + Math.imul(al3, bh5)) | 0;
    mid = (mid + Math.imul(ah3, bl5)) | 0;
    hi = (hi + Math.imul(ah3, bh5)) | 0;
    lo = (lo + Math.imul(al2, bl6)) | 0;
    mid = (mid + Math.imul(al2, bh6)) | 0;
    mid = (mid + Math.imul(ah2, bl6)) | 0;
    hi = (hi + Math.imul(ah2, bh6)) | 0;
    lo = (lo + Math.imul(al1, bl7)) | 0;
    mid = (mid + Math.imul(al1, bh7)) | 0;
    mid = (mid + Math.imul(ah1, bl7)) | 0;
    hi = (hi + Math.imul(ah1, bh7)) | 0;
    lo = (lo + Math.imul(al0, bl8)) | 0;
    mid = (mid + Math.imul(al0, bh8)) | 0;
    mid = (mid + Math.imul(ah0, bl8)) | 0;
    hi = (hi + Math.imul(ah0, bh8)) | 0;
    var w8 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w8 >>> 26)) | 0;
    w8 &= 0x3ffffff;
    /* k = 9 */
    lo = Math.imul(al9, bl0);
    mid = Math.imul(al9, bh0);
    mid = (mid + Math.imul(ah9, bl0)) | 0;
    hi = Math.imul(ah9, bh0);
    lo = (lo + Math.imul(al8, bl1)) | 0;
    mid = (mid + Math.imul(al8, bh1)) | 0;
    mid = (mid + Math.imul(ah8, bl1)) | 0;
    hi = (hi + Math.imul(ah8, bh1)) | 0;
    lo = (lo + Math.imul(al7, bl2)) | 0;
    mid = (mid + Math.imul(al7, bh2)) | 0;
    mid = (mid + Math.imul(ah7, bl2)) | 0;
    hi = (hi + Math.imul(ah7, bh2)) | 0;
    lo = (lo + Math.imul(al6, bl3)) | 0;
    mid = (mid + Math.imul(al6, bh3)) | 0;
    mid = (mid + Math.imul(ah6, bl3)) | 0;
    hi = (hi + Math.imul(ah6, bh3)) | 0;
    lo = (lo + Math.imul(al5, bl4)) | 0;
    mid = (mid + Math.imul(al5, bh4)) | 0;
    mid = (mid + Math.imul(ah5, bl4)) | 0;
    hi = (hi + Math.imul(ah5, bh4)) | 0;
    lo = (lo + Math.imul(al4, bl5)) | 0;
    mid = (mid + Math.imul(al4, bh5)) | 0;
    mid = (mid + Math.imul(ah4, bl5)) | 0;
    hi = (hi + Math.imul(ah4, bh5)) | 0;
    lo = (lo + Math.imul(al3, bl6)) | 0;
    mid = (mid + Math.imul(al3, bh6)) | 0;
    mid = (mid + Math.imul(ah3, bl6)) | 0;
    hi = (hi + Math.imul(ah3, bh6)) | 0;
    lo = (lo + Math.imul(al2, bl7)) | 0;
    mid = (mid + Math.imul(al2, bh7)) | 0;
    mid = (mid + Math.imul(ah2, bl7)) | 0;
    hi = (hi + Math.imul(ah2, bh7)) | 0;
    lo = (lo + Math.imul(al1, bl8)) | 0;
    mid = (mid + Math.imul(al1, bh8)) | 0;
    mid = (mid + Math.imul(ah1, bl8)) | 0;
    hi = (hi + Math.imul(ah1, bh8)) | 0;
    lo = (lo + Math.imul(al0, bl9)) | 0;
    mid = (mid + Math.imul(al0, bh9)) | 0;
    mid = (mid + Math.imul(ah0, bl9)) | 0;
    hi = (hi + Math.imul(ah0, bh9)) | 0;
    var w9 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w9 >>> 26)) | 0;
    w9 &= 0x3ffffff;
    /* k = 10 */
    lo = Math.imul(al9, bl1);
    mid = Math.imul(al9, bh1);
    mid = (mid + Math.imul(ah9, bl1)) | 0;
    hi = Math.imul(ah9, bh1);
    lo = (lo + Math.imul(al8, bl2)) | 0;
    mid = (mid + Math.imul(al8, bh2)) | 0;
    mid = (mid + Math.imul(ah8, bl2)) | 0;
    hi = (hi + Math.imul(ah8, bh2)) | 0;
    lo = (lo + Math.imul(al7, bl3)) | 0;
    mid = (mid + Math.imul(al7, bh3)) | 0;
    mid = (mid + Math.imul(ah7, bl3)) | 0;
    hi = (hi + Math.imul(ah7, bh3)) | 0;
    lo = (lo + Math.imul(al6, bl4)) | 0;
    mid = (mid + Math.imul(al6, bh4)) | 0;
    mid = (mid + Math.imul(ah6, bl4)) | 0;
    hi = (hi + Math.imul(ah6, bh4)) | 0;
    lo = (lo + Math.imul(al5, bl5)) | 0;
    mid = (mid + Math.imul(al5, bh5)) | 0;
    mid = (mid + Math.imul(ah5, bl5)) | 0;
    hi = (hi + Math.imul(ah5, bh5)) | 0;
    lo = (lo + Math.imul(al4, bl6)) | 0;
    mid = (mid + Math.imul(al4, bh6)) | 0;
    mid = (mid + Math.imul(ah4, bl6)) | 0;
    hi = (hi + Math.imul(ah4, bh6)) | 0;
    lo = (lo + Math.imul(al3, bl7)) | 0;
    mid = (mid + Math.imul(al3, bh7)) | 0;
    mid = (mid + Math.imul(ah3, bl7)) | 0;
    hi = (hi + Math.imul(ah3, bh7)) | 0;
    lo = (lo + Math.imul(al2, bl8)) | 0;
    mid = (mid + Math.imul(al2, bh8)) | 0;
    mid = (mid + Math.imul(ah2, bl8)) | 0;
    hi = (hi + Math.imul(ah2, bh8)) | 0;
    lo = (lo + Math.imul(al1, bl9)) | 0;
    mid = (mid + Math.imul(al1, bh9)) | 0;
    mid = (mid + Math.imul(ah1, bl9)) | 0;
    hi = (hi + Math.imul(ah1, bh9)) | 0;
    var w10 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w10 >>> 26)) | 0;
    w10 &= 0x3ffffff;
    /* k = 11 */
    lo = Math.imul(al9, bl2);
    mid = Math.imul(al9, bh2);
    mid = (mid + Math.imul(ah9, bl2)) | 0;
    hi = Math.imul(ah9, bh2);
    lo = (lo + Math.imul(al8, bl3)) | 0;
    mid = (mid + Math.imul(al8, bh3)) | 0;
    mid = (mid + Math.imul(ah8, bl3)) | 0;
    hi = (hi + Math.imul(ah8, bh3)) | 0;
    lo = (lo + Math.imul(al7, bl4)) | 0;
    mid = (mid + Math.imul(al7, bh4)) | 0;
    mid = (mid + Math.imul(ah7, bl4)) | 0;
    hi = (hi + Math.imul(ah7, bh4)) | 0;
    lo = (lo + Math.imul(al6, bl5)) | 0;
    mid = (mid + Math.imul(al6, bh5)) | 0;
    mid = (mid + Math.imul(ah6, bl5)) | 0;
    hi = (hi + Math.imul(ah6, bh5)) | 0;
    lo = (lo + Math.imul(al5, bl6)) | 0;
    mid = (mid + Math.imul(al5, bh6)) | 0;
    mid = (mid + Math.imul(ah5, bl6)) | 0;
    hi = (hi + Math.imul(ah5, bh6)) | 0;
    lo = (lo + Math.imul(al4, bl7)) | 0;
    mid = (mid + Math.imul(al4, bh7)) | 0;
    mid = (mid + Math.imul(ah4, bl7)) | 0;
    hi = (hi + Math.imul(ah4, bh7)) | 0;
    lo = (lo + Math.imul(al3, bl8)) | 0;
    mid = (mid + Math.imul(al3, bh8)) | 0;
    mid = (mid + Math.imul(ah3, bl8)) | 0;
    hi = (hi + Math.imul(ah3, bh8)) | 0;
    lo = (lo + Math.imul(al2, bl9)) | 0;
    mid = (mid + Math.imul(al2, bh9)) | 0;
    mid = (mid + Math.imul(ah2, bl9)) | 0;
    hi = (hi + Math.imul(ah2, bh9)) | 0;
    var w11 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w11 >>> 26)) | 0;
    w11 &= 0x3ffffff;
    /* k = 12 */
    lo = Math.imul(al9, bl3);
    mid = Math.imul(al9, bh3);
    mid = (mid + Math.imul(ah9, bl3)) | 0;
    hi = Math.imul(ah9, bh3);
    lo = (lo + Math.imul(al8, bl4)) | 0;
    mid = (mid + Math.imul(al8, bh4)) | 0;
    mid = (mid + Math.imul(ah8, bl4)) | 0;
    hi = (hi + Math.imul(ah8, bh4)) | 0;
    lo = (lo + Math.imul(al7, bl5)) | 0;
    mid = (mid + Math.imul(al7, bh5)) | 0;
    mid = (mid + Math.imul(ah7, bl5)) | 0;
    hi = (hi + Math.imul(ah7, bh5)) | 0;
    lo = (lo + Math.imul(al6, bl6)) | 0;
    mid = (mid + Math.imul(al6, bh6)) | 0;
    mid = (mid + Math.imul(ah6, bl6)) | 0;
    hi = (hi + Math.imul(ah6, bh6)) | 0;
    lo = (lo + Math.imul(al5, bl7)) | 0;
    mid = (mid + Math.imul(al5, bh7)) | 0;
    mid = (mid + Math.imul(ah5, bl7)) | 0;
    hi = (hi + Math.imul(ah5, bh7)) | 0;
    lo = (lo + Math.imul(al4, bl8)) | 0;
    mid = (mid + Math.imul(al4, bh8)) | 0;
    mid = (mid + Math.imul(ah4, bl8)) | 0;
    hi = (hi + Math.imul(ah4, bh8)) | 0;
    lo = (lo + Math.imul(al3, bl9)) | 0;
    mid = (mid + Math.imul(al3, bh9)) | 0;
    mid = (mid + Math.imul(ah3, bl9)) | 0;
    hi = (hi + Math.imul(ah3, bh9)) | 0;
    var w12 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w12 >>> 26)) | 0;
    w12 &= 0x3ffffff;
    /* k = 13 */
    lo = Math.imul(al9, bl4);
    mid = Math.imul(al9, bh4);
    mid = (mid + Math.imul(ah9, bl4)) | 0;
    hi = Math.imul(ah9, bh4);
    lo = (lo + Math.imul(al8, bl5)) | 0;
    mid = (mid + Math.imul(al8, bh5)) | 0;
    mid = (mid + Math.imul(ah8, bl5)) | 0;
    hi = (hi + Math.imul(ah8, bh5)) | 0;
    lo = (lo + Math.imul(al7, bl6)) | 0;
    mid = (mid + Math.imul(al7, bh6)) | 0;
    mid = (mid + Math.imul(ah7, bl6)) | 0;
    hi = (hi + Math.imul(ah7, bh6)) | 0;
    lo = (lo + Math.imul(al6, bl7)) | 0;
    mid = (mid + Math.imul(al6, bh7)) | 0;
    mid = (mid + Math.imul(ah6, bl7)) | 0;
    hi = (hi + Math.imul(ah6, bh7)) | 0;
    lo = (lo + Math.imul(al5, bl8)) | 0;
    mid = (mid + Math.imul(al5, bh8)) | 0;
    mid = (mid + Math.imul(ah5, bl8)) | 0;
    hi = (hi + Math.imul(ah5, bh8)) | 0;
    lo = (lo + Math.imul(al4, bl9)) | 0;
    mid = (mid + Math.imul(al4, bh9)) | 0;
    mid = (mid + Math.imul(ah4, bl9)) | 0;
    hi = (hi + Math.imul(ah4, bh9)) | 0;
    var w13 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w13 >>> 26)) | 0;
    w13 &= 0x3ffffff;
    /* k = 14 */
    lo = Math.imul(al9, bl5);
    mid = Math.imul(al9, bh5);
    mid = (mid + Math.imul(ah9, bl5)) | 0;
    hi = Math.imul(ah9, bh5);
    lo = (lo + Math.imul(al8, bl6)) | 0;
    mid = (mid + Math.imul(al8, bh6)) | 0;
    mid = (mid + Math.imul(ah8, bl6)) | 0;
    hi = (hi + Math.imul(ah8, bh6)) | 0;
    lo = (lo + Math.imul(al7, bl7)) | 0;
    mid = (mid + Math.imul(al7, bh7)) | 0;
    mid = (mid + Math.imul(ah7, bl7)) | 0;
    hi = (hi + Math.imul(ah7, bh7)) | 0;
    lo = (lo + Math.imul(al6, bl8)) | 0;
    mid = (mid + Math.imul(al6, bh8)) | 0;
    mid = (mid + Math.imul(ah6, bl8)) | 0;
    hi = (hi + Math.imul(ah6, bh8)) | 0;
    lo = (lo + Math.imul(al5, bl9)) | 0;
    mid = (mid + Math.imul(al5, bh9)) | 0;
    mid = (mid + Math.imul(ah5, bl9)) | 0;
    hi = (hi + Math.imul(ah5, bh9)) | 0;
    var w14 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w14 >>> 26)) | 0;
    w14 &= 0x3ffffff;
    /* k = 15 */
    lo = Math.imul(al9, bl6);
    mid = Math.imul(al9, bh6);
    mid = (mid + Math.imul(ah9, bl6)) | 0;
    hi = Math.imul(ah9, bh6);
    lo = (lo + Math.imul(al8, bl7)) | 0;
    mid = (mid + Math.imul(al8, bh7)) | 0;
    mid = (mid + Math.imul(ah8, bl7)) | 0;
    hi = (hi + Math.imul(ah8, bh7)) | 0;
    lo = (lo + Math.imul(al7, bl8)) | 0;
    mid = (mid + Math.imul(al7, bh8)) | 0;
    mid = (mid + Math.imul(ah7, bl8)) | 0;
    hi = (hi + Math.imul(ah7, bh8)) | 0;
    lo = (lo + Math.imul(al6, bl9)) | 0;
    mid = (mid + Math.imul(al6, bh9)) | 0;
    mid = (mid + Math.imul(ah6, bl9)) | 0;
    hi = (hi + Math.imul(ah6, bh9)) | 0;
    var w15 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w15 >>> 26)) | 0;
    w15 &= 0x3ffffff;
    /* k = 16 */
    lo = Math.imul(al9, bl7);
    mid = Math.imul(al9, bh7);
    mid = (mid + Math.imul(ah9, bl7)) | 0;
    hi = Math.imul(ah9, bh7);
    lo = (lo + Math.imul(al8, bl8)) | 0;
    mid = (mid + Math.imul(al8, bh8)) | 0;
    mid = (mid + Math.imul(ah8, bl8)) | 0;
    hi = (hi + Math.imul(ah8, bh8)) | 0;
    lo = (lo + Math.imul(al7, bl9)) | 0;
    mid = (mid + Math.imul(al7, bh9)) | 0;
    mid = (mid + Math.imul(ah7, bl9)) | 0;
    hi = (hi + Math.imul(ah7, bh9)) | 0;
    var w16 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w16 >>> 26)) | 0;
    w16 &= 0x3ffffff;
    /* k = 17 */
    lo = Math.imul(al9, bl8);
    mid = Math.imul(al9, bh8);
    mid = (mid + Math.imul(ah9, bl8)) | 0;
    hi = Math.imul(ah9, bh8);
    lo = (lo + Math.imul(al8, bl9)) | 0;
    mid = (mid + Math.imul(al8, bh9)) | 0;
    mid = (mid + Math.imul(ah8, bl9)) | 0;
    hi = (hi + Math.imul(ah8, bh9)) | 0;
    var w17 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w17 >>> 26)) | 0;
    w17 &= 0x3ffffff;
    /* k = 18 */
    lo = Math.imul(al9, bl9);
    mid = Math.imul(al9, bh9);
    mid = (mid + Math.imul(ah9, bl9)) | 0;
    hi = Math.imul(ah9, bh9);
    var w18 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w18 >>> 26)) | 0;
    w18 &= 0x3ffffff;
    o[0] = w0;
    o[1] = w1;
    o[2] = w2;
    o[3] = w3;
    o[4] = w4;
    o[5] = w5;
    o[6] = w6;
    o[7] = w7;
    o[8] = w8;
    o[9] = w9;
    o[10] = w10;
    o[11] = w11;
    o[12] = w12;
    o[13] = w13;
    o[14] = w14;
    o[15] = w15;
    o[16] = w16;
    o[17] = w17;
    o[18] = w18;
    if (c !== 0) {
      o[19] = c;
      out.length++;
    }
    return out;
  };

  // Polyfill comb
  if (!Math.imul) {
    comb10MulTo = smallMulTo;
  }

  function bigMulTo (self, num, out) {
    out.negative = num.negative ^ self.negative;
    out.length = self.length + num.length;

    var carry = 0;
    var hncarry = 0;
    for (var k = 0; k < out.length - 1; k++) {
      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
      // note that ncarry could be >= 0x3ffffff
      var ncarry = hncarry;
      hncarry = 0;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);
      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = k - j;
        var a = self.words[i] | 0;
        var b = num.words[j] | 0;
        var r = a * b;

        var lo = r & 0x3ffffff;
        ncarry = (ncarry + ((r / 0x4000000) | 0)) | 0;
        lo = (lo + rword) | 0;
        rword = lo & 0x3ffffff;
        ncarry = (ncarry + (lo >>> 26)) | 0;

        hncarry += ncarry >>> 26;
        ncarry &= 0x3ffffff;
      }
      out.words[k] = rword;
      carry = ncarry;
      ncarry = hncarry;
    }
    if (carry !== 0) {
      out.words[k] = carry;
    } else {
      out.length--;
    }

    return out.strip();
  }

  function jumboMulTo (self, num, out) {
    var fftm = new FFTM();
    return fftm.mulp(self, num, out);
  }

  BN.prototype.mulTo = function mulTo (num, out) {
    var res;
    var len = this.length + num.length;
    if (this.length === 10 && num.length === 10) {
      res = comb10MulTo(this, num, out);
    } else if (len < 63) {
      res = smallMulTo(this, num, out);
    } else if (len < 1024) {
      res = bigMulTo(this, num, out);
    } else {
      res = jumboMulTo(this, num, out);
    }

    return res;
  };

  // Cooley-Tukey algorithm for FFT
  // slightly revisited to rely on looping instead of recursion

  function FFTM (x, y) {
    this.x = x;
    this.y = y;
  }

  FFTM.prototype.makeRBT = function makeRBT (N) {
    var t = new Array(N);
    var l = BN.prototype._countBits(N) - 1;
    for (var i = 0; i < N; i++) {
      t[i] = this.revBin(i, l, N);
    }

    return t;
  };

  // Returns binary-reversed representation of `x`
  FFTM.prototype.revBin = function revBin (x, l, N) {
    if (x === 0 || x === N - 1) return x;

    var rb = 0;
    for (var i = 0; i < l; i++) {
      rb |= (x & 1) << (l - i - 1);
      x >>= 1;
    }

    return rb;
  };

  // Performs "tweedling" phase, therefore 'emulating'
  // behaviour of the recursive algorithm
  FFTM.prototype.permute = function permute (rbt, rws, iws, rtws, itws, N) {
    for (var i = 0; i < N; i++) {
      rtws[i] = rws[rbt[i]];
      itws[i] = iws[rbt[i]];
    }
  };

  FFTM.prototype.transform = function transform (rws, iws, rtws, itws, N, rbt) {
    this.permute(rbt, rws, iws, rtws, itws, N);

    for (var s = 1; s < N; s <<= 1) {
      var l = s << 1;

      var rtwdf = Math.cos(2 * Math.PI / l);
      var itwdf = Math.sin(2 * Math.PI / l);

      for (var p = 0; p < N; p += l) {
        var rtwdf_ = rtwdf;
        var itwdf_ = itwdf;

        for (var j = 0; j < s; j++) {
          var re = rtws[p + j];
          var ie = itws[p + j];

          var ro = rtws[p + j + s];
          var io = itws[p + j + s];

          var rx = rtwdf_ * ro - itwdf_ * io;

          io = rtwdf_ * io + itwdf_ * ro;
          ro = rx;

          rtws[p + j] = re + ro;
          itws[p + j] = ie + io;

          rtws[p + j + s] = re - ro;
          itws[p + j + s] = ie - io;

          /* jshint maxdepth : false */
          if (j !== l) {
            rx = rtwdf * rtwdf_ - itwdf * itwdf_;

            itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
            rtwdf_ = rx;
          }
        }
      }
    }
  };

  FFTM.prototype.guessLen13b = function guessLen13b (n, m) {
    var N = Math.max(m, n) | 1;
    var odd = N & 1;
    var i = 0;
    for (N = N / 2 | 0; N; N = N >>> 1) {
      i++;
    }

    return 1 << i + 1 + odd;
  };

  FFTM.prototype.conjugate = function conjugate (rws, iws, N) {
    if (N <= 1) return;

    for (var i = 0; i < N / 2; i++) {
      var t = rws[i];

      rws[i] = rws[N - i - 1];
      rws[N - i - 1] = t;

      t = iws[i];

      iws[i] = -iws[N - i - 1];
      iws[N - i - 1] = -t;
    }
  };

  FFTM.prototype.normalize13b = function normalize13b (ws, N) {
    var carry = 0;
    for (var i = 0; i < N / 2; i++) {
      var w = Math.round(ws[2 * i + 1] / N) * 0x2000 +
        Math.round(ws[2 * i] / N) +
        carry;

      ws[i] = w & 0x3ffffff;

      if (w < 0x4000000) {
        carry = 0;
      } else {
        carry = w / 0x4000000 | 0;
      }
    }

    return ws;
  };

  FFTM.prototype.convert13b = function convert13b (ws, len, rws, N) {
    var carry = 0;
    for (var i = 0; i < len; i++) {
      carry = carry + (ws[i] | 0);

      rws[2 * i] = carry & 0x1fff; carry = carry >>> 13;
      rws[2 * i + 1] = carry & 0x1fff; carry = carry >>> 13;
    }

    // Pad with zeroes
    for (i = 2 * len; i < N; ++i) {
      rws[i] = 0;
    }

    assert(carry === 0);
    assert((carry & ~0x1fff) === 0);
  };

  FFTM.prototype.stub = function stub (N) {
    var ph = new Array(N);
    for (var i = 0; i < N; i++) {
      ph[i] = 0;
    }

    return ph;
  };

  FFTM.prototype.mulp = function mulp (x, y, out) {
    var N = 2 * this.guessLen13b(x.length, y.length);

    var rbt = this.makeRBT(N);

    var _ = this.stub(N);

    var rws = new Array(N);
    var rwst = new Array(N);
    var iwst = new Array(N);

    var nrws = new Array(N);
    var nrwst = new Array(N);
    var niwst = new Array(N);

    var rmws = out.words;
    rmws.length = N;

    this.convert13b(x.words, x.length, rws, N);
    this.convert13b(y.words, y.length, nrws, N);

    this.transform(rws, _, rwst, iwst, N, rbt);
    this.transform(nrws, _, nrwst, niwst, N, rbt);

    for (var i = 0; i < N; i++) {
      var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
      iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
      rwst[i] = rx;
    }

    this.conjugate(rwst, iwst, N);
    this.transform(rwst, iwst, rmws, _, N, rbt);
    this.conjugate(rmws, _, N);
    this.normalize13b(rmws, N);

    out.negative = x.negative ^ y.negative;
    out.length = x.length + y.length;
    return out.strip();
  };

  // Multiply `this` by `num`
  BN.prototype.mul = function mul (num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return this.mulTo(num, out);
  };

  // Multiply employing FFT
  BN.prototype.mulf = function mulf (num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return jumboMulTo(this, num, out);
  };

  // In-place Multiplication
  BN.prototype.imul = function imul (num) {
    return this.clone().mulTo(num, this);
  };

  BN.prototype.imuln = function imuln (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);

    // Carry
    var carry = 0;
    for (var i = 0; i < this.length; i++) {
      var w = (this.words[i] | 0) * num;
      var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
      carry >>= 26;
      carry += (w / 0x4000000) | 0;
      // NOTE: lo is 27bit maximum
      carry += lo >>> 26;
      this.words[i] = lo & 0x3ffffff;
    }

    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }

    return this;
  };

  BN.prototype.muln = function muln (num) {
    return this.clone().imuln(num);
  };

  // `this` * `this`
  BN.prototype.sqr = function sqr () {
    return this.mul(this);
  };

  // `this` * `this` in-place
  BN.prototype.isqr = function isqr () {
    return this.imul(this.clone());
  };

  // Math.pow(`this`, `num`)
  BN.prototype.pow = function pow (num) {
    var w = toBitArray(num);
    if (w.length === 0) return new BN(1);

    // Skip leading zeroes
    var res = this;
    for (var i = 0; i < w.length; i++, res = res.sqr()) {
      if (w[i] !== 0) break;
    }

    if (++i < w.length) {
      for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
        if (w[i] === 0) continue;

        res = res.mul(q);
      }
    }

    return res;
  };

  // Shift-left in-place
  BN.prototype.iushln = function iushln (bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;
    var carryMask = (0x3ffffff >>> (26 - r)) << (26 - r);
    var i;

    if (r !== 0) {
      var carry = 0;

      for (i = 0; i < this.length; i++) {
        var newCarry = this.words[i] & carryMask;
        var c = ((this.words[i] | 0) - newCarry) << r;
        this.words[i] = c | carry;
        carry = newCarry >>> (26 - r);
      }

      if (carry) {
        this.words[i] = carry;
        this.length++;
      }
    }

    if (s !== 0) {
      for (i = this.length - 1; i >= 0; i--) {
        this.words[i + s] = this.words[i];
      }

      for (i = 0; i < s; i++) {
        this.words[i] = 0;
      }

      this.length += s;
    }

    return this.strip();
  };

  BN.prototype.ishln = function ishln (bits) {
    // TODO(indutny): implement me
    assert(this.negative === 0);
    return this.iushln(bits);
  };

  // Shift-right in-place
  // NOTE: `hint` is a lowest bit before trailing zeroes
  // NOTE: if `extended` is present - it will be filled with destroyed bits
  BN.prototype.iushrn = function iushrn (bits, hint, extended) {
    assert(typeof bits === 'number' && bits >= 0);
    var h;
    if (hint) {
      h = (hint - (hint % 26)) / 26;
    } else {
      h = 0;
    }

    var r = bits % 26;
    var s = Math.min((bits - r) / 26, this.length);
    var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
    var maskedWords = extended;

    h -= s;
    h = Math.max(0, h);

    // Extended mode, copy masked part
    if (maskedWords) {
      for (var i = 0; i < s; i++) {
        maskedWords.words[i] = this.words[i];
      }
      maskedWords.length = s;
    }

    if (s === 0) {
      // No-op, we should not move anything at all
    } else if (this.length > s) {
      this.length -= s;
      for (i = 0; i < this.length; i++) {
        this.words[i] = this.words[i + s];
      }
    } else {
      this.words[0] = 0;
      this.length = 1;
    }

    var carry = 0;
    for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
      var word = this.words[i] | 0;
      this.words[i] = (carry << (26 - r)) | (word >>> r);
      carry = word & mask;
    }

    // Push carried bits as a mask
    if (maskedWords && carry !== 0) {
      maskedWords.words[maskedWords.length++] = carry;
    }

    if (this.length === 0) {
      this.words[0] = 0;
      this.length = 1;
    }

    return this.strip();
  };

  BN.prototype.ishrn = function ishrn (bits, hint, extended) {
    // TODO(indutny): implement me
    assert(this.negative === 0);
    return this.iushrn(bits, hint, extended);
  };

  // Shift-left
  BN.prototype.shln = function shln (bits) {
    return this.clone().ishln(bits);
  };

  BN.prototype.ushln = function ushln (bits) {
    return this.clone().iushln(bits);
  };

  // Shift-right
  BN.prototype.shrn = function shrn (bits) {
    return this.clone().ishrn(bits);
  };

  BN.prototype.ushrn = function ushrn (bits) {
    return this.clone().iushrn(bits);
  };

  // Test if n bit is set
  BN.prototype.testn = function testn (bit) {
    assert(typeof bit === 'number' && bit >= 0);
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r;

    // Fast case: bit is much higher than all existing words
    if (this.length <= s) return false;

    // Check bit and return
    var w = this.words[s];

    return !!(w & q);
  };

  // Return only lowers bits of number (in-place)
  BN.prototype.imaskn = function imaskn (bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;

    assert(this.negative === 0, 'imaskn works only with positive numbers');

    if (this.length <= s) {
      return this;
    }

    if (r !== 0) {
      s++;
    }
    this.length = Math.min(s, this.length);

    if (r !== 0) {
      var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
      this.words[this.length - 1] &= mask;
    }

    return this.strip();
  };

  // Return only lowers bits of number
  BN.prototype.maskn = function maskn (bits) {
    return this.clone().imaskn(bits);
  };

  // Add plain number `num` to `this`
  BN.prototype.iaddn = function iaddn (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.isubn(-num);

    // Possible sign change
    if (this.negative !== 0) {
      if (this.length === 1 && (this.words[0] | 0) < num) {
        this.words[0] = num - (this.words[0] | 0);
        this.negative = 0;
        return this;
      }

      this.negative = 0;
      this.isubn(num);
      this.negative = 1;
      return this;
    }

    // Add without checks
    return this._iaddn(num);
  };

  BN.prototype._iaddn = function _iaddn (num) {
    this.words[0] += num;

    // Carry
    for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {
      this.words[i] -= 0x4000000;
      if (i === this.length - 1) {
        this.words[i + 1] = 1;
      } else {
        this.words[i + 1]++;
      }
    }
    this.length = Math.max(this.length, i + 1);

    return this;
  };

  // Subtract plain number `num` from `this`
  BN.prototype.isubn = function isubn (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.iaddn(-num);

    if (this.negative !== 0) {
      this.negative = 0;
      this.iaddn(num);
      this.negative = 1;
      return this;
    }

    this.words[0] -= num;

    if (this.length === 1 && this.words[0] < 0) {
      this.words[0] = -this.words[0];
      this.negative = 1;
    } else {
      // Carry
      for (var i = 0; i < this.length && this.words[i] < 0; i++) {
        this.words[i] += 0x4000000;
        this.words[i + 1] -= 1;
      }
    }

    return this.strip();
  };

  BN.prototype.addn = function addn (num) {
    return this.clone().iaddn(num);
  };

  BN.prototype.subn = function subn (num) {
    return this.clone().isubn(num);
  };

  BN.prototype.iabs = function iabs () {
    this.negative = 0;

    return this;
  };

  BN.prototype.abs = function abs () {
    return this.clone().iabs();
  };

  BN.prototype._ishlnsubmul = function _ishlnsubmul (num, mul, shift) {
    var len = num.length + shift;
    var i;

    this._expand(len);

    var w;
    var carry = 0;
    for (i = 0; i < num.length; i++) {
      w = (this.words[i + shift] | 0) + carry;
      var right = (num.words[i] | 0) * mul;
      w -= right & 0x3ffffff;
      carry = (w >> 26) - ((right / 0x4000000) | 0);
      this.words[i + shift] = w & 0x3ffffff;
    }
    for (; i < this.length - shift; i++) {
      w = (this.words[i + shift] | 0) + carry;
      carry = w >> 26;
      this.words[i + shift] = w & 0x3ffffff;
    }

    if (carry === 0) return this.strip();

    // Subtraction overflow
    assert(carry === -1);
    carry = 0;
    for (i = 0; i < this.length; i++) {
      w = -(this.words[i] | 0) + carry;
      carry = w >> 26;
      this.words[i] = w & 0x3ffffff;
    }
    this.negative = 1;

    return this.strip();
  };

  BN.prototype._wordDiv = function _wordDiv (num, mode) {
    var shift = this.length - num.length;

    var a = this.clone();
    var b = num;

    // Normalize
    var bhi = b.words[b.length - 1] | 0;
    var bhiBits = this._countBits(bhi);
    shift = 26 - bhiBits;
    if (shift !== 0) {
      b = b.ushln(shift);
      a.iushln(shift);
      bhi = b.words[b.length - 1] | 0;
    }

    // Initialize quotient
    var m = a.length - b.length;
    var q;

    if (mode !== 'mod') {
      q = new BN(null);
      q.length = m + 1;
      q.words = new Array(q.length);
      for (var i = 0; i < q.length; i++) {
        q.words[i] = 0;
      }
    }

    var diff = a.clone()._ishlnsubmul(b, 1, m);
    if (diff.negative === 0) {
      a = diff;
      if (q) {
        q.words[m] = 1;
      }
    }

    for (var j = m - 1; j >= 0; j--) {
      var qj = (a.words[b.length + j] | 0) * 0x4000000 +
        (a.words[b.length + j - 1] | 0);

      // NOTE: (qj / bhi) is (0x3ffffff * 0x4000000 + 0x3ffffff) / 0x2000000 max
      // (0x7ffffff)
      qj = Math.min((qj / bhi) | 0, 0x3ffffff);

      a._ishlnsubmul(b, qj, j);
      while (a.negative !== 0) {
        qj--;
        a.negative = 0;
        a._ishlnsubmul(b, 1, j);
        if (!a.isZero()) {
          a.negative ^= 1;
        }
      }
      if (q) {
        q.words[j] = qj;
      }
    }
    if (q) {
      q.strip();
    }
    a.strip();

    // Denormalize
    if (mode !== 'div' && shift !== 0) {
      a.iushrn(shift);
    }

    return {
      div: q || null,
      mod: a
    };
  };

  // NOTE: 1) `mode` can be set to `mod` to request mod only,
  //       to `div` to request div only, or be absent to
  //       request both div & mod
  //       2) `positive` is true if unsigned mod is requested
  BN.prototype.divmod = function divmod (num, mode, positive) {
    assert(!num.isZero());

    if (this.isZero()) {
      return {
        div: new BN(0),
        mod: new BN(0)
      };
    }

    var div, mod, res;
    if (this.negative !== 0 && num.negative === 0) {
      res = this.neg().divmod(num, mode);

      if (mode !== 'mod') {
        div = res.div.neg();
      }

      if (mode !== 'div') {
        mod = res.mod.neg();
        if (positive && mod.negative !== 0) {
          mod.iadd(num);
        }
      }

      return {
        div: div,
        mod: mod
      };
    }

    if (this.negative === 0 && num.negative !== 0) {
      res = this.divmod(num.neg(), mode);

      if (mode !== 'mod') {
        div = res.div.neg();
      }

      return {
        div: div,
        mod: res.mod
      };
    }

    if ((this.negative & num.negative) !== 0) {
      res = this.neg().divmod(num.neg(), mode);

      if (mode !== 'div') {
        mod = res.mod.neg();
        if (positive && mod.negative !== 0) {
          mod.isub(num);
        }
      }

      return {
        div: res.div,
        mod: mod
      };
    }

    // Both numbers are positive at this point

    // Strip both numbers to approximate shift value
    if (num.length > this.length || this.cmp(num) < 0) {
      return {
        div: new BN(0),
        mod: this
      };
    }

    // Very short reduction
    if (num.length === 1) {
      if (mode === 'div') {
        return {
          div: this.divn(num.words[0]),
          mod: null
        };
      }

      if (mode === 'mod') {
        return {
          div: null,
          mod: new BN(this.modn(num.words[0]))
        };
      }

      return {
        div: this.divn(num.words[0]),
        mod: new BN(this.modn(num.words[0]))
      };
    }

    return this._wordDiv(num, mode);
  };

  // Find `this` / `num`
  BN.prototype.div = function div (num) {
    return this.divmod(num, 'div', false).div;
  };

  // Find `this` % `num`
  BN.prototype.mod = function mod (num) {
    return this.divmod(num, 'mod', false).mod;
  };

  BN.prototype.umod = function umod (num) {
    return this.divmod(num, 'mod', true).mod;
  };

  // Find Round(`this` / `num`)
  BN.prototype.divRound = function divRound (num) {
    var dm = this.divmod(num);

    // Fast case - exact division
    if (dm.mod.isZero()) return dm.div;

    var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;

    var half = num.ushrn(1);
    var r2 = num.andln(1);
    var cmp = mod.cmp(half);

    // Round down
    if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;

    // Round up
    return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
  };

  BN.prototype.modn = function modn (num) {
    assert(num <= 0x3ffffff);
    var p = (1 << 26) % num;

    var acc = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      acc = (p * acc + (this.words[i] | 0)) % num;
    }

    return acc;
  };

  // In-place division by number
  BN.prototype.idivn = function idivn (num) {
    assert(num <= 0x3ffffff);

    var carry = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      var w = (this.words[i] | 0) + carry * 0x4000000;
      this.words[i] = (w / num) | 0;
      carry = w % num;
    }

    return this.strip();
  };

  BN.prototype.divn = function divn (num) {
    return this.clone().idivn(num);
  };

  BN.prototype.egcd = function egcd (p) {
    assert(p.negative === 0);
    assert(!p.isZero());

    var x = this;
    var y = p.clone();

    if (x.negative !== 0) {
      x = x.umod(p);
    } else {
      x = x.clone();
    }

    // A * x + B * y = x
    var A = new BN(1);
    var B = new BN(0);

    // C * x + D * y = y
    var C = new BN(0);
    var D = new BN(1);

    var g = 0;

    while (x.isEven() && y.isEven()) {
      x.iushrn(1);
      y.iushrn(1);
      ++g;
    }

    var yp = y.clone();
    var xp = x.clone();

    while (!x.isZero()) {
      for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
      if (i > 0) {
        x.iushrn(i);
        while (i-- > 0) {
          if (A.isOdd() || B.isOdd()) {
            A.iadd(yp);
            B.isub(xp);
          }

          A.iushrn(1);
          B.iushrn(1);
        }
      }

      for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
      if (j > 0) {
        y.iushrn(j);
        while (j-- > 0) {
          if (C.isOdd() || D.isOdd()) {
            C.iadd(yp);
            D.isub(xp);
          }

          C.iushrn(1);
          D.iushrn(1);
        }
      }

      if (x.cmp(y) >= 0) {
        x.isub(y);
        A.isub(C);
        B.isub(D);
      } else {
        y.isub(x);
        C.isub(A);
        D.isub(B);
      }
    }

    return {
      a: C,
      b: D,
      gcd: y.iushln(g)
    };
  };

  // This is reduced incarnation of the binary EEA
  // above, designated to invert members of the
  // _prime_ fields F(p) at a maximal speed
  BN.prototype._invmp = function _invmp (p) {
    assert(p.negative === 0);
    assert(!p.isZero());

    var a = this;
    var b = p.clone();

    if (a.negative !== 0) {
      a = a.umod(p);
    } else {
      a = a.clone();
    }

    var x1 = new BN(1);
    var x2 = new BN(0);

    var delta = b.clone();

    while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
      for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
      if (i > 0) {
        a.iushrn(i);
        while (i-- > 0) {
          if (x1.isOdd()) {
            x1.iadd(delta);
          }

          x1.iushrn(1);
        }
      }

      for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
      if (j > 0) {
        b.iushrn(j);
        while (j-- > 0) {
          if (x2.isOdd()) {
            x2.iadd(delta);
          }

          x2.iushrn(1);
        }
      }

      if (a.cmp(b) >= 0) {
        a.isub(b);
        x1.isub(x2);
      } else {
        b.isub(a);
        x2.isub(x1);
      }
    }

    var res;
    if (a.cmpn(1) === 0) {
      res = x1;
    } else {
      res = x2;
    }

    if (res.cmpn(0) < 0) {
      res.iadd(p);
    }

    return res;
  };

  BN.prototype.gcd = function gcd (num) {
    if (this.isZero()) return num.abs();
    if (num.isZero()) return this.abs();

    var a = this.clone();
    var b = num.clone();
    a.negative = 0;
    b.negative = 0;

    // Remove common factor of two
    for (var shift = 0; a.isEven() && b.isEven(); shift++) {
      a.iushrn(1);
      b.iushrn(1);
    }

    do {
      while (a.isEven()) {
        a.iushrn(1);
      }
      while (b.isEven()) {
        b.iushrn(1);
      }

      var r = a.cmp(b);
      if (r < 0) {
        // Swap `a` and `b` to make `a` always bigger than `b`
        var t = a;
        a = b;
        b = t;
      } else if (r === 0 || b.cmpn(1) === 0) {
        break;
      }

      a.isub(b);
    } while (true);

    return b.iushln(shift);
  };

  // Invert number in the field F(num)
  BN.prototype.invm = function invm (num) {
    return this.egcd(num).a.umod(num);
  };

  BN.prototype.isEven = function isEven () {
    return (this.words[0] & 1) === 0;
  };

  BN.prototype.isOdd = function isOdd () {
    return (this.words[0] & 1) === 1;
  };

  // And first word and num
  BN.prototype.andln = function andln (num) {
    return this.words[0] & num;
  };

  // Increment at the bit position in-line
  BN.prototype.bincn = function bincn (bit) {
    assert(typeof bit === 'number');
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r;

    // Fast case: bit is much higher than all existing words
    if (this.length <= s) {
      this._expand(s + 1);
      this.words[s] |= q;
      return this;
    }

    // Add bit and propagate, if needed
    var carry = q;
    for (var i = s; carry !== 0 && i < this.length; i++) {
      var w = this.words[i] | 0;
      w += carry;
      carry = w >>> 26;
      w &= 0x3ffffff;
      this.words[i] = w;
    }
    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }
    return this;
  };

  BN.prototype.isZero = function isZero () {
    return this.length === 1 && this.words[0] === 0;
  };

  BN.prototype.cmpn = function cmpn (num) {
    var negative = num < 0;

    if (this.negative !== 0 && !negative) return -1;
    if (this.negative === 0 && negative) return 1;

    this.strip();

    var res;
    if (this.length > 1) {
      res = 1;
    } else {
      if (negative) {
        num = -num;
      }

      assert(num <= 0x3ffffff, 'Number is too big');

      var w = this.words[0] | 0;
      res = w === num ? 0 : w < num ? -1 : 1;
    }
    if (this.negative !== 0) return -res | 0;
    return res;
  };

  // Compare two numbers and return:
  // 1 - if `this` > `num`
  // 0 - if `this` == `num`
  // -1 - if `this` < `num`
  BN.prototype.cmp = function cmp (num) {
    if (this.negative !== 0 && num.negative === 0) return -1;
    if (this.negative === 0 && num.negative !== 0) return 1;

    var res = this.ucmp(num);
    if (this.negative !== 0) return -res | 0;
    return res;
  };

  // Unsigned comparison
  BN.prototype.ucmp = function ucmp (num) {
    // At this point both numbers have the same sign
    if (this.length > num.length) return 1;
    if (this.length < num.length) return -1;

    var res = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      var a = this.words[i] | 0;
      var b = num.words[i] | 0;

      if (a === b) continue;
      if (a < b) {
        res = -1;
      } else if (a > b) {
        res = 1;
      }
      break;
    }
    return res;
  };

  BN.prototype.gtn = function gtn (num) {
    return this.cmpn(num) === 1;
  };

  BN.prototype.gt = function gt (num) {
    return this.cmp(num) === 1;
  };

  BN.prototype.gten = function gten (num) {
    return this.cmpn(num) >= 0;
  };

  BN.prototype.gte = function gte (num) {
    return this.cmp(num) >= 0;
  };

  BN.prototype.ltn = function ltn (num) {
    return this.cmpn(num) === -1;
  };

  BN.prototype.lt = function lt (num) {
    return this.cmp(num) === -1;
  };

  BN.prototype.lten = function lten (num) {
    return this.cmpn(num) <= 0;
  };

  BN.prototype.lte = function lte (num) {
    return this.cmp(num) <= 0;
  };

  BN.prototype.eqn = function eqn (num) {
    return this.cmpn(num) === 0;
  };

  BN.prototype.eq = function eq (num) {
    return this.cmp(num) === 0;
  };

  //
  // A reduce context, could be using montgomery or something better, depending
  // on the `m` itself.
  //
  BN.red = function red (num) {
    return new Red(num);
  };

  BN.prototype.toRed = function toRed (ctx) {
    assert(!this.red, 'Already a number in reduction context');
    assert(this.negative === 0, 'red works only with positives');
    return ctx.convertTo(this)._forceRed(ctx);
  };

  BN.prototype.fromRed = function fromRed () {
    assert(this.red, 'fromRed works only with numbers in reduction context');
    return this.red.convertFrom(this);
  };

  BN.prototype._forceRed = function _forceRed (ctx) {
    this.red = ctx;
    return this;
  };

  BN.prototype.forceRed = function forceRed (ctx) {
    assert(!this.red, 'Already a number in reduction context');
    return this._forceRed(ctx);
  };

  BN.prototype.redAdd = function redAdd (num) {
    assert(this.red, 'redAdd works only with red numbers');
    return this.red.add(this, num);
  };

  BN.prototype.redIAdd = function redIAdd (num) {
    assert(this.red, 'redIAdd works only with red numbers');
    return this.red.iadd(this, num);
  };

  BN.prototype.redSub = function redSub (num) {
    assert(this.red, 'redSub works only with red numbers');
    return this.red.sub(this, num);
  };

  BN.prototype.redISub = function redISub (num) {
    assert(this.red, 'redISub works only with red numbers');
    return this.red.isub(this, num);
  };

  BN.prototype.redShl = function redShl (num) {
    assert(this.red, 'redShl works only with red numbers');
    return this.red.shl(this, num);
  };

  BN.prototype.redMul = function redMul (num) {
    assert(this.red, 'redMul works only with red numbers');
    this.red._verify2(this, num);
    return this.red.mul(this, num);
  };

  BN.prototype.redIMul = function redIMul (num) {
    assert(this.red, 'redMul works only with red numbers');
    this.red._verify2(this, num);
    return this.red.imul(this, num);
  };

  BN.prototype.redSqr = function redSqr () {
    assert(this.red, 'redSqr works only with red numbers');
    this.red._verify1(this);
    return this.red.sqr(this);
  };

  BN.prototype.redISqr = function redISqr () {
    assert(this.red, 'redISqr works only with red numbers');
    this.red._verify1(this);
    return this.red.isqr(this);
  };

  // Square root over p
  BN.prototype.redSqrt = function redSqrt () {
    assert(this.red, 'redSqrt works only with red numbers');
    this.red._verify1(this);
    return this.red.sqrt(this);
  };

  BN.prototype.redInvm = function redInvm () {
    assert(this.red, 'redInvm works only with red numbers');
    this.red._verify1(this);
    return this.red.invm(this);
  };

  // Return negative clone of `this` % `red modulo`
  BN.prototype.redNeg = function redNeg () {
    assert(this.red, 'redNeg works only with red numbers');
    this.red._verify1(this);
    return this.red.neg(this);
  };

  BN.prototype.redPow = function redPow (num) {
    assert(this.red && !num.red, 'redPow(normalNum)');
    this.red._verify1(this);
    return this.red.pow(this, num);
  };

  // Prime numbers with efficient reduction
  var primes = {
    k256: null,
    p224: null,
    p192: null,
    p25519: null
  };

  // Pseudo-Mersenne prime
  function MPrime (name, p) {
    // P = 2 ^ N - K
    this.name = name;
    this.p = new BN(p, 16);
    this.n = this.p.bitLength();
    this.k = new BN(1).iushln(this.n).isub(this.p);

    this.tmp = this._tmp();
  }

  MPrime.prototype._tmp = function _tmp () {
    var tmp = new BN(null);
    tmp.words = new Array(Math.ceil(this.n / 13));
    return tmp;
  };

  MPrime.prototype.ireduce = function ireduce (num) {
    // Assumes that `num` is less than `P^2`
    // num = HI * (2 ^ N - K) + HI * K + LO = HI * K + LO (mod P)
    var r = num;
    var rlen;

    do {
      this.split(r, this.tmp);
      r = this.imulK(r);
      r = r.iadd(this.tmp);
      rlen = r.bitLength();
    } while (rlen > this.n);

    var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
    if (cmp === 0) {
      r.words[0] = 0;
      r.length = 1;
    } else if (cmp > 0) {
      r.isub(this.p);
    } else {
      if (r.strip !== undefined) {
        // r is BN v4 instance
        r.strip();
      } else {
        // r is BN v5 instance
        r._strip();
      }
    }

    return r;
  };

  MPrime.prototype.split = function split (input, out) {
    input.iushrn(this.n, 0, out);
  };

  MPrime.prototype.imulK = function imulK (num) {
    return num.imul(this.k);
  };

  function K256 () {
    MPrime.call(
      this,
      'k256',
      'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
  }
  inherits(K256, MPrime);

  K256.prototype.split = function split (input, output) {
    // 256 = 9 * 26 + 22
    var mask = 0x3fffff;

    var outLen = Math.min(input.length, 9);
    for (var i = 0; i < outLen; i++) {
      output.words[i] = input.words[i];
    }
    output.length = outLen;

    if (input.length <= 9) {
      input.words[0] = 0;
      input.length = 1;
      return;
    }

    // Shift by 9 limbs
    var prev = input.words[9];
    output.words[output.length++] = prev & mask;

    for (i = 10; i < input.length; i++) {
      var next = input.words[i] | 0;
      input.words[i - 10] = ((next & mask) << 4) | (prev >>> 22);
      prev = next;
    }
    prev >>>= 22;
    input.words[i - 10] = prev;
    if (prev === 0 && input.length > 10) {
      input.length -= 10;
    } else {
      input.length -= 9;
    }
  };

  K256.prototype.imulK = function imulK (num) {
    // K = 0x1000003d1 = [ 0x40, 0x3d1 ]
    num.words[num.length] = 0;
    num.words[num.length + 1] = 0;
    num.length += 2;

    // bounded at: 0x40 * 0x3ffffff + 0x3d0 = 0x100000390
    var lo = 0;
    for (var i = 0; i < num.length; i++) {
      var w = num.words[i] | 0;
      lo += w * 0x3d1;
      num.words[i] = lo & 0x3ffffff;
      lo = w * 0x40 + ((lo / 0x4000000) | 0);
    }

    // Fast length reduction
    if (num.words[num.length - 1] === 0) {
      num.length--;
      if (num.words[num.length - 1] === 0) {
        num.length--;
      }
    }
    return num;
  };

  function P224 () {
    MPrime.call(
      this,
      'p224',
      'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
  }
  inherits(P224, MPrime);

  function P192 () {
    MPrime.call(
      this,
      'p192',
      'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
  }
  inherits(P192, MPrime);

  function P25519 () {
    // 2 ^ 255 - 19
    MPrime.call(
      this,
      '25519',
      '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
  }
  inherits(P25519, MPrime);

  P25519.prototype.imulK = function imulK (num) {
    // K = 0x13
    var carry = 0;
    for (var i = 0; i < num.length; i++) {
      var hi = (num.words[i] | 0) * 0x13 + carry;
      var lo = hi & 0x3ffffff;
      hi >>>= 26;

      num.words[i] = lo;
      carry = hi;
    }
    if (carry !== 0) {
      num.words[num.length++] = carry;
    }
    return num;
  };

  // Exported mostly for testing purposes, use plain name instead
  BN._prime = function prime (name) {
    // Cached version of prime
    if (primes[name]) return primes[name];

    var prime;
    if (name === 'k256') {
      prime = new K256();
    } else if (name === 'p224') {
      prime = new P224();
    } else if (name === 'p192') {
      prime = new P192();
    } else if (name === 'p25519') {
      prime = new P25519();
    } else {
      throw new Error('Unknown prime ' + name);
    }
    primes[name] = prime;

    return prime;
  };

  //
  // Base reduction engine
  //
  function Red (m) {
    if (typeof m === 'string') {
      var prime = BN._prime(m);
      this.m = prime.p;
      this.prime = prime;
    } else {
      assert(m.gtn(1), 'modulus must be greater than 1');
      this.m = m;
      this.prime = null;
    }
  }

  Red.prototype._verify1 = function _verify1 (a) {
    assert(a.negative === 0, 'red works only with positives');
    assert(a.red, 'red works only with red numbers');
  };

  Red.prototype._verify2 = function _verify2 (a, b) {
    assert((a.negative | b.negative) === 0, 'red works only with positives');
    assert(a.red && a.red === b.red,
      'red works only with red numbers');
  };

  Red.prototype.imod = function imod (a) {
    if (this.prime) return this.prime.ireduce(a)._forceRed(this);
    return a.umod(this.m)._forceRed(this);
  };

  Red.prototype.neg = function neg (a) {
    if (a.isZero()) {
      return a.clone();
    }

    return this.m.sub(a)._forceRed(this);
  };

  Red.prototype.add = function add (a, b) {
    this._verify2(a, b);

    var res = a.add(b);
    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }
    return res._forceRed(this);
  };

  Red.prototype.iadd = function iadd (a, b) {
    this._verify2(a, b);

    var res = a.iadd(b);
    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }
    return res;
  };

  Red.prototype.sub = function sub (a, b) {
    this._verify2(a, b);

    var res = a.sub(b);
    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }
    return res._forceRed(this);
  };

  Red.prototype.isub = function isub (a, b) {
    this._verify2(a, b);

    var res = a.isub(b);
    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }
    return res;
  };

  Red.prototype.shl = function shl (a, num) {
    this._verify1(a);
    return this.imod(a.ushln(num));
  };

  Red.prototype.imul = function imul (a, b) {
    this._verify2(a, b);
    return this.imod(a.imul(b));
  };

  Red.prototype.mul = function mul (a, b) {
    this._verify2(a, b);
    return this.imod(a.mul(b));
  };

  Red.prototype.isqr = function isqr (a) {
    return this.imul(a, a.clone());
  };

  Red.prototype.sqr = function sqr (a) {
    return this.mul(a, a);
  };

  Red.prototype.sqrt = function sqrt (a) {
    if (a.isZero()) return a.clone();

    var mod3 = this.m.andln(3);
    assert(mod3 % 2 === 1);

    // Fast case
    if (mod3 === 3) {
      var pow = this.m.add(new BN(1)).iushrn(2);
      return this.pow(a, pow);
    }

    // Tonelli-Shanks algorithm (Totally unoptimized and slow)
    //
    // Find Q and S, that Q * 2 ^ S = (P - 1)
    var q = this.m.subn(1);
    var s = 0;
    while (!q.isZero() && q.andln(1) === 0) {
      s++;
      q.iushrn(1);
    }
    assert(!q.isZero());

    var one = new BN(1).toRed(this);
    var nOne = one.redNeg();

    // Find quadratic non-residue
    // NOTE: Max is such because of generalized Riemann hypothesis.
    var lpow = this.m.subn(1).iushrn(1);
    var z = this.m.bitLength();
    z = new BN(2 * z * z).toRed(this);

    while (this.pow(z, lpow).cmp(nOne) !== 0) {
      z.redIAdd(nOne);
    }

    var c = this.pow(z, q);
    var r = this.pow(a, q.addn(1).iushrn(1));
    var t = this.pow(a, q);
    var m = s;
    while (t.cmp(one) !== 0) {
      var tmp = t;
      for (var i = 0; tmp.cmp(one) !== 0; i++) {
        tmp = tmp.redSqr();
      }
      assert(i < m);
      var b = this.pow(c, new BN(1).iushln(m - i - 1));

      r = r.redMul(b);
      c = b.redSqr();
      t = t.redMul(c);
      m = i;
    }

    return r;
  };

  Red.prototype.invm = function invm (a) {
    var inv = a._invmp(this.m);
    if (inv.negative !== 0) {
      inv.negative = 0;
      return this.imod(inv).redNeg();
    } else {
      return this.imod(inv);
    }
  };

  Red.prototype.pow = function pow (a, num) {
    if (num.isZero()) return new BN(1).toRed(this);
    if (num.cmpn(1) === 0) return a.clone();

    var windowSize = 4;
    var wnd = new Array(1 << windowSize);
    wnd[0] = new BN(1).toRed(this);
    wnd[1] = a;
    for (var i = 2; i < wnd.length; i++) {
      wnd[i] = this.mul(wnd[i - 1], a);
    }

    var res = wnd[0];
    var current = 0;
    var currentLen = 0;
    var start = num.bitLength() % 26;
    if (start === 0) {
      start = 26;
    }

    for (i = num.length - 1; i >= 0; i--) {
      var word = num.words[i];
      for (var j = start - 1; j >= 0; j--) {
        var bit = (word >> j) & 1;
        if (res !== wnd[0]) {
          res = this.sqr(res);
        }

        if (bit === 0 && current === 0) {
          currentLen = 0;
          continue;
        }

        current <<= 1;
        current |= bit;
        currentLen++;
        if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;

        res = this.mul(res, wnd[current]);
        currentLen = 0;
        current = 0;
      }
      start = 26;
    }

    return res;
  };

  Red.prototype.convertTo = function convertTo (num) {
    var r = num.umod(this.m);

    return r === num ? r.clone() : r;
  };

  Red.prototype.convertFrom = function convertFrom (num) {
    var res = num.clone();
    res.red = null;
    return res;
  };

  //
  // Montgomery method engine
  //

  BN.mont = function mont (num) {
    return new Mont(num);
  };

  function Mont (m) {
    Red.call(this, m);

    this.shift = this.m.bitLength();
    if (this.shift % 26 !== 0) {
      this.shift += 26 - (this.shift % 26);
    }

    this.r = new BN(1).iushln(this.shift);
    this.r2 = this.imod(this.r.sqr());
    this.rinv = this.r._invmp(this.m);

    this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
    this.minv = this.minv.umod(this.r);
    this.minv = this.r.sub(this.minv);
  }
  inherits(Mont, Red);

  Mont.prototype.convertTo = function convertTo (num) {
    return this.imod(num.ushln(this.shift));
  };

  Mont.prototype.convertFrom = function convertFrom (num) {
    var r = this.imod(num.mul(this.rinv));
    r.red = null;
    return r;
  };

  Mont.prototype.imul = function imul (a, b) {
    if (a.isZero() || b.isZero()) {
      a.words[0] = 0;
      a.length = 1;
      return a;
    }

    var t = a.imul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;

    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Mont.prototype.mul = function mul (a, b) {
    if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this);

    var t = a.mul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;
    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Mont.prototype.invm = function invm (a) {
    // (AR)^-1 * R^2 = (A^-1 * R^-1) * R^2 = A^-1 * R
    var res = this.imod(a._invmp(this.m).mul(this.r2));
    return res._forceRed(this);
  };
})( false || module, this);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/brorand/index.js":
/*!***************************************!*\
  !*** ./node_modules/brorand/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var r;

module.exports = function rand(len) {
  if (!r)
    r = new Rand(null);

  return r.generate(len);
};

function Rand(rand) {
  this.rand = rand;
}
module.exports.Rand = Rand;

Rand.prototype.generate = function generate(len) {
  return this._rand(len);
};

// Emulate crypto API using randy
Rand.prototype._rand = function _rand(n) {
  if (this.rand.getBytes)
    return this.rand.getBytes(n);

  var res = new Uint8Array(n);
  for (var i = 0; i < res.length; i++)
    res[i] = this.rand.getByte();
  return res;
};

if (typeof self === 'object') {
  if (self.crypto && self.crypto.getRandomValues) {
    // Modern browsers
    Rand.prototype._rand = function _rand(n) {
      var arr = new Uint8Array(n);
      self.crypto.getRandomValues(arr);
      return arr;
    };
  } else if (self.msCrypto && self.msCrypto.getRandomValues) {
    // IE
    Rand.prototype._rand = function _rand(n) {
      var arr = new Uint8Array(n);
      self.msCrypto.getRandomValues(arr);
      return arr;
    };

  // Safari's WebWorkers do not have `crypto`
  } else if (typeof window === 'object') {
    // Old junk
    Rand.prototype._rand = function() {
      throw new Error('Not implemented yet');
    };
  }
} else {
  // Node.js or Web worker with no crypto support
  try {
    var crypto = __webpack_require__(/*! crypto */ 1);
    if (typeof crypto.randomBytes !== 'function')
      throw new Error('Not supported');

    Rand.prototype._rand = function _rand(n) {
      return crypto.randomBytes(n);
    };
  } catch (e) {
  }
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/elliptic/lib/elliptic.js":
/*!***********************************************!*\
  !*** ./node_modules/elliptic/lib/elliptic.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var elliptic = exports;

elliptic.version = __webpack_require__(/*! ../package.json */ "./node_modules/elliptic/package.json").version;
elliptic.utils = __webpack_require__(/*! ./elliptic/utils */ "./node_modules/elliptic/lib/elliptic/utils.js");
elliptic.rand = __webpack_require__(/*! brorand */ "./node_modules/brorand/index.js");
elliptic.curve = __webpack_require__(/*! ./elliptic/curve */ "./node_modules/elliptic/lib/elliptic/curve/index.js");
elliptic.curves = __webpack_require__(/*! ./elliptic/curves */ "./node_modules/elliptic/lib/elliptic/curves.js");

// Protocols
elliptic.ec = __webpack_require__(/*! ./elliptic/ec */ "./node_modules/elliptic/lib/elliptic/ec/index.js");
elliptic.eddsa = __webpack_require__(/*! ./elliptic/eddsa */ "./node_modules/elliptic/lib/elliptic/eddsa/index.js");


/***/ }),

/***/ "./node_modules/elliptic/lib/elliptic/curve/base.js":
/*!**********************************************************!*\
  !*** ./node_modules/elliptic/lib/elliptic/curve/base.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__(/*! bn.js */ "./node_modules/bn.js/lib/bn.js");
var utils = __webpack_require__(/*! ../utils */ "./node_modules/elliptic/lib/elliptic/utils.js");
var getNAF = utils.getNAF;
var getJSF = utils.getJSF;
var assert = utils.assert;

function BaseCurve(type, conf) {
  this.type = type;
  this.p = new BN(conf.p, 16);

  // Use Montgomery, when there is no fast reduction for the prime
  this.red = conf.prime ? BN.red(conf.prime) : BN.mont(this.p);

  // Useful for many curves
  this.zero = new BN(0).toRed(this.red);
  this.one = new BN(1).toRed(this.red);
  this.two = new BN(2).toRed(this.red);

  // Curve configuration, optional
  this.n = conf.n && new BN(conf.n, 16);
  this.g = conf.g && this.pointFromJSON(conf.g, conf.gRed);

  // Temporary arrays
  this._wnafT1 = new Array(4);
  this._wnafT2 = new Array(4);
  this._wnafT3 = new Array(4);
  this._wnafT4 = new Array(4);

  this._bitLength = this.n ? this.n.bitLength() : 0;

  // Generalized Greg Maxwell's trick
  var adjustCount = this.n && this.p.div(this.n);
  if (!adjustCount || adjustCount.cmpn(100) > 0) {
    this.redN = null;
  } else {
    this._maxwellTrick = true;
    this.redN = this.n.toRed(this.red);
  }
}
module.exports = BaseCurve;

BaseCurve.prototype.point = function point() {
  throw new Error('Not implemented');
};

BaseCurve.prototype.validate = function validate() {
  throw new Error('Not implemented');
};

BaseCurve.prototype._fixedNafMul = function _fixedNafMul(p, k) {
  assert(p.precomputed);
  var doubles = p._getDoubles();

  var naf = getNAF(k, 1, this._bitLength);
  var I = (1 << (doubles.step + 1)) - (doubles.step % 2 === 0 ? 2 : 1);
  I /= 3;

  // Translate into more windowed form
  var repr = [];
  for (var j = 0; j < naf.length; j += doubles.step) {
    var nafW = 0;
    for (var k = j + doubles.step - 1; k >= j; k--)
      nafW = (nafW << 1) + naf[k];
    repr.push(nafW);
  }

  var a = this.jpoint(null, null, null);
  var b = this.jpoint(null, null, null);
  for (var i = I; i > 0; i--) {
    for (var j = 0; j < repr.length; j++) {
      var nafW = repr[j];
      if (nafW === i)
        b = b.mixedAdd(doubles.points[j]);
      else if (nafW === -i)
        b = b.mixedAdd(doubles.points[j].neg());
    }
    a = a.add(b);
  }
  return a.toP();
};

BaseCurve.prototype._wnafMul = function _wnafMul(p, k) {
  var w = 4;

  // Precompute window
  var nafPoints = p._getNAFPoints(w);
  w = nafPoints.wnd;
  var wnd = nafPoints.points;

  // Get NAF form
  var naf = getNAF(k, w, this._bitLength);

  // Add `this`*(N+1) for every w-NAF index
  var acc = this.jpoint(null, null, null);
  for (var i = naf.length - 1; i >= 0; i--) {
    // Count zeroes
    for (var k = 0; i >= 0 && naf[i] === 0; i--)
      k++;
    if (i >= 0)
      k++;
    acc = acc.dblp(k);

    if (i < 0)
      break;
    var z = naf[i];
    assert(z !== 0);
    if (p.type === 'affine') {
      // J +- P
      if (z > 0)
        acc = acc.mixedAdd(wnd[(z - 1) >> 1]);
      else
        acc = acc.mixedAdd(wnd[(-z - 1) >> 1].neg());
    } else {
      // J +- J
      if (z > 0)
        acc = acc.add(wnd[(z - 1) >> 1]);
      else
        acc = acc.add(wnd[(-z - 1) >> 1].neg());
    }
  }
  return p.type === 'affine' ? acc.toP() : acc;
};

BaseCurve.prototype._wnafMulAdd = function _wnafMulAdd(defW,
                                                       points,
                                                       coeffs,
                                                       len,
                                                       jacobianResult) {
  var wndWidth = this._wnafT1;
  var wnd = this._wnafT2;
  var naf = this._wnafT3;

  // Fill all arrays
  var max = 0;
  for (var i = 0; i < len; i++) {
    var p = points[i];
    var nafPoints = p._getNAFPoints(defW);
    wndWidth[i] = nafPoints.wnd;
    wnd[i] = nafPoints.points;
  }

  // Comb small window NAFs
  for (var i = len - 1; i >= 1; i -= 2) {
    var a = i - 1;
    var b = i;
    if (wndWidth[a] !== 1 || wndWidth[b] !== 1) {
      naf[a] = getNAF(coeffs[a], wndWidth[a], this._bitLength);
      naf[b] = getNAF(coeffs[b], wndWidth[b], this._bitLength);
      max = Math.max(naf[a].length, max);
      max = Math.max(naf[b].length, max);
      continue;
    }

    var comb = [
      points[a], /* 1 */
      null, /* 3 */
      null, /* 5 */
      points[b] /* 7 */
    ];

    // Try to avoid Projective points, if possible
    if (points[a].y.cmp(points[b].y) === 0) {
      comb[1] = points[a].add(points[b]);
      comb[2] = points[a].toJ().mixedAdd(points[b].neg());
    } else if (points[a].y.cmp(points[b].y.redNeg()) === 0) {
      comb[1] = points[a].toJ().mixedAdd(points[b]);
      comb[2] = points[a].add(points[b].neg());
    } else {
      comb[1] = points[a].toJ().mixedAdd(points[b]);
      comb[2] = points[a].toJ().mixedAdd(points[b].neg());
    }

    var index = [
      -3, /* -1 -1 */
      -1, /* -1 0 */
      -5, /* -1 1 */
      -7, /* 0 -1 */
      0, /* 0 0 */
      7, /* 0 1 */
      5, /* 1 -1 */
      1, /* 1 0 */
      3  /* 1 1 */
    ];

    var jsf = getJSF(coeffs[a], coeffs[b]);
    max = Math.max(jsf[0].length, max);
    naf[a] = new Array(max);
    naf[b] = new Array(max);
    for (var j = 0; j < max; j++) {
      var ja = jsf[0][j] | 0;
      var jb = jsf[1][j] | 0;

      naf[a][j] = index[(ja + 1) * 3 + (jb + 1)];
      naf[b][j] = 0;
      wnd[a] = comb;
    }
  }

  var acc = this.jpoint(null, null, null);
  var tmp = this._wnafT4;
  for (var i = max; i >= 0; i--) {
    var k = 0;

    while (i >= 0) {
      var zero = true;
      for (var j = 0; j < len; j++) {
        tmp[j] = naf[j][i] | 0;
        if (tmp[j] !== 0)
          zero = false;
      }
      if (!zero)
        break;
      k++;
      i--;
    }
    if (i >= 0)
      k++;
    acc = acc.dblp(k);
    if (i < 0)
      break;

    for (var j = 0; j < len; j++) {
      var z = tmp[j];
      var p;
      if (z === 0)
        continue;
      else if (z > 0)
        p = wnd[j][(z - 1) >> 1];
      else if (z < 0)
        p = wnd[j][(-z - 1) >> 1].neg();

      if (p.type === 'affine')
        acc = acc.mixedAdd(p);
      else
        acc = acc.add(p);
    }
  }
  // Zeroify references
  for (var i = 0; i < len; i++)
    wnd[i] = null;

  if (jacobianResult)
    return acc;
  else
    return acc.toP();
};

function BasePoint(curve, type) {
  this.curve = curve;
  this.type = type;
  this.precomputed = null;
}
BaseCurve.BasePoint = BasePoint;

BasePoint.prototype.eq = function eq(/*other*/) {
  throw new Error('Not implemented');
};

BasePoint.prototype.validate = function validate() {
  return this.curve.validate(this);
};

BaseCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
  bytes = utils.toArray(bytes, enc);

  var len = this.p.byteLength();

  // uncompressed, hybrid-odd, hybrid-even
  if ((bytes[0] === 0x04 || bytes[0] === 0x06 || bytes[0] === 0x07) &&
      bytes.length - 1 === 2 * len) {
    if (bytes[0] === 0x06)
      assert(bytes[bytes.length - 1] % 2 === 0);
    else if (bytes[0] === 0x07)
      assert(bytes[bytes.length - 1] % 2 === 1);

    var res =  this.point(bytes.slice(1, 1 + len),
                          bytes.slice(1 + len, 1 + 2 * len));

    return res;
  } else if ((bytes[0] === 0x02 || bytes[0] === 0x03) &&
              bytes.length - 1 === len) {
    return this.pointFromX(bytes.slice(1, 1 + len), bytes[0] === 0x03);
  }
  throw new Error('Unknown point format');
};

BasePoint.prototype.encodeCompressed = function encodeCompressed(enc) {
  return this.encode(enc, true);
};

BasePoint.prototype._encode = function _encode(compact) {
  var len = this.curve.p.byteLength();
  var x = this.getX().toArray('be', len);

  if (compact)
    return [ this.getY().isEven() ? 0x02 : 0x03 ].concat(x);

  return [ 0x04 ].concat(x, this.getY().toArray('be', len)) ;
};

BasePoint.prototype.encode = function encode(enc, compact) {
  return utils.encode(this._encode(compact), enc);
};

BasePoint.prototype.precompute = function precompute(power) {
  if (this.precomputed)
    return this;

  var precomputed = {
    doubles: null,
    naf: null,
    beta: null
  };
  precomputed.naf = this._getNAFPoints(8);
  precomputed.doubles = this._getDoubles(4, power);
  precomputed.beta = this._getBeta();
  this.precomputed = precomputed;

  return this;
};

BasePoint.prototype._hasDoubles = function _hasDoubles(k) {
  if (!this.precomputed)
    return false;

  var doubles = this.precomputed.doubles;
  if (!doubles)
    return false;

  return doubles.points.length >= Math.ceil((k.bitLength() + 1) / doubles.step);
};

BasePoint.prototype._getDoubles = function _getDoubles(step, power) {
  if (this.precomputed && this.precomputed.doubles)
    return this.precomputed.doubles;

  var doubles = [ this ];
  var acc = this;
  for (var i = 0; i < power; i += step) {
    for (var j = 0; j < step; j++)
      acc = acc.dbl();
    doubles.push(acc);
  }
  return {
    step: step,
    points: doubles
  };
};

BasePoint.prototype._getNAFPoints = function _getNAFPoints(wnd) {
  if (this.precomputed && this.precomputed.naf)
    return this.precomputed.naf;

  var res = [ this ];
  var max = (1 << wnd) - 1;
  var dbl = max === 1 ? null : this.dbl();
  for (var i = 1; i < max; i++)
    res[i] = res[i - 1].add(dbl);
  return {
    wnd: wnd,
    points: res
  };
};

BasePoint.prototype._getBeta = function _getBeta() {
  return null;
};

BasePoint.prototype.dblp = function dblp(k) {
  var r = this;
  for (var i = 0; i < k; i++)
    r = r.dbl();
  return r;
};


/***/ }),

/***/ "./node_modules/elliptic/lib/elliptic/curve/edwards.js":
/*!*************************************************************!*\
  !*** ./node_modules/elliptic/lib/elliptic/curve/edwards.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/elliptic/lib/elliptic/utils.js");
var BN = __webpack_require__(/*! bn.js */ "./node_modules/bn.js/lib/bn.js");
var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");
var Base = __webpack_require__(/*! ./base */ "./node_modules/elliptic/lib/elliptic/curve/base.js");

var assert = utils.assert;

function EdwardsCurve(conf) {
  // NOTE: Important as we are creating point in Base.call()
  this.twisted = (conf.a | 0) !== 1;
  this.mOneA = this.twisted && (conf.a | 0) === -1;
  this.extended = this.mOneA;

  Base.call(this, 'edwards', conf);

  this.a = new BN(conf.a, 16).umod(this.red.m);
  this.a = this.a.toRed(this.red);
  this.c = new BN(conf.c, 16).toRed(this.red);
  this.c2 = this.c.redSqr();
  this.d = new BN(conf.d, 16).toRed(this.red);
  this.dd = this.d.redAdd(this.d);

  assert(!this.twisted || this.c.fromRed().cmpn(1) === 0);
  this.oneC = (conf.c | 0) === 1;
}
inherits(EdwardsCurve, Base);
module.exports = EdwardsCurve;

EdwardsCurve.prototype._mulA = function _mulA(num) {
  if (this.mOneA)
    return num.redNeg();
  else
    return this.a.redMul(num);
};

EdwardsCurve.prototype._mulC = function _mulC(num) {
  if (this.oneC)
    return num;
  else
    return this.c.redMul(num);
};

// Just for compatibility with Short curve
EdwardsCurve.prototype.jpoint = function jpoint(x, y, z, t) {
  return this.point(x, y, z, t);
};

EdwardsCurve.prototype.pointFromX = function pointFromX(x, odd) {
  x = new BN(x, 16);
  if (!x.red)
    x = x.toRed(this.red);

  var x2 = x.redSqr();
  var rhs = this.c2.redSub(this.a.redMul(x2));
  var lhs = this.one.redSub(this.c2.redMul(this.d).redMul(x2));

  var y2 = rhs.redMul(lhs.redInvm());
  var y = y2.redSqrt();
  if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
    throw new Error('invalid point');

  var isOdd = y.fromRed().isOdd();
  if (odd && !isOdd || !odd && isOdd)
    y = y.redNeg();

  return this.point(x, y);
};

EdwardsCurve.prototype.pointFromY = function pointFromY(y, odd) {
  y = new BN(y, 16);
  if (!y.red)
    y = y.toRed(this.red);

  // x^2 = (y^2 - c^2) / (c^2 d y^2 - a)
  var y2 = y.redSqr();
  var lhs = y2.redSub(this.c2);
  var rhs = y2.redMul(this.d).redMul(this.c2).redSub(this.a);
  var x2 = lhs.redMul(rhs.redInvm());

  if (x2.cmp(this.zero) === 0) {
    if (odd)
      throw new Error('invalid point');
    else
      return this.point(this.zero, y);
  }

  var x = x2.redSqrt();
  if (x.redSqr().redSub(x2).cmp(this.zero) !== 0)
    throw new Error('invalid point');

  if (x.fromRed().isOdd() !== odd)
    x = x.redNeg();

  return this.point(x, y);
};

EdwardsCurve.prototype.validate = function validate(point) {
  if (point.isInfinity())
    return true;

  // Curve: A * X^2 + Y^2 = C^2 * (1 + D * X^2 * Y^2)
  point.normalize();

  var x2 = point.x.redSqr();
  var y2 = point.y.redSqr();
  var lhs = x2.redMul(this.a).redAdd(y2);
  var rhs = this.c2.redMul(this.one.redAdd(this.d.redMul(x2).redMul(y2)));

  return lhs.cmp(rhs) === 0;
};

function Point(curve, x, y, z, t) {
  Base.BasePoint.call(this, curve, 'projective');
  if (x === null && y === null && z === null) {
    this.x = this.curve.zero;
    this.y = this.curve.one;
    this.z = this.curve.one;
    this.t = this.curve.zero;
    this.zOne = true;
  } else {
    this.x = new BN(x, 16);
    this.y = new BN(y, 16);
    this.z = z ? new BN(z, 16) : this.curve.one;
    this.t = t && new BN(t, 16);
    if (!this.x.red)
      this.x = this.x.toRed(this.curve.red);
    if (!this.y.red)
      this.y = this.y.toRed(this.curve.red);
    if (!this.z.red)
      this.z = this.z.toRed(this.curve.red);
    if (this.t && !this.t.red)
      this.t = this.t.toRed(this.curve.red);
    this.zOne = this.z === this.curve.one;

    // Use extended coordinates
    if (this.curve.extended && !this.t) {
      this.t = this.x.redMul(this.y);
      if (!this.zOne)
        this.t = this.t.redMul(this.z.redInvm());
    }
  }
}
inherits(Point, Base.BasePoint);

EdwardsCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
  return Point.fromJSON(this, obj);
};

EdwardsCurve.prototype.point = function point(x, y, z, t) {
  return new Point(this, x, y, z, t);
};

Point.fromJSON = function fromJSON(curve, obj) {
  return new Point(curve, obj[0], obj[1], obj[2]);
};

Point.prototype.inspect = function inspect() {
  if (this.isInfinity())
    return '<EC Point Infinity>';
  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
      ' y: ' + this.y.fromRed().toString(16, 2) +
      ' z: ' + this.z.fromRed().toString(16, 2) + '>';
};

Point.prototype.isInfinity = function isInfinity() {
  // XXX This code assumes that zero is always zero in red
  return this.x.cmpn(0) === 0 &&
    (this.y.cmp(this.z) === 0 ||
    (this.zOne && this.y.cmp(this.curve.c) === 0));
};

Point.prototype._extDbl = function _extDbl() {
  // hyperelliptic.org/EFD/g1p/auto-twisted-extended-1.html
  //     #doubling-dbl-2008-hwcd
  // 4M + 4S

  // A = X1^2
  var a = this.x.redSqr();
  // B = Y1^2
  var b = this.y.redSqr();
  // C = 2 * Z1^2
  var c = this.z.redSqr();
  c = c.redIAdd(c);
  // D = a * A
  var d = this.curve._mulA(a);
  // E = (X1 + Y1)^2 - A - B
  var e = this.x.redAdd(this.y).redSqr().redISub(a).redISub(b);
  // G = D + B
  var g = d.redAdd(b);
  // F = G - C
  var f = g.redSub(c);
  // H = D - B
  var h = d.redSub(b);
  // X3 = E * F
  var nx = e.redMul(f);
  // Y3 = G * H
  var ny = g.redMul(h);
  // T3 = E * H
  var nt = e.redMul(h);
  // Z3 = F * G
  var nz = f.redMul(g);
  return this.curve.point(nx, ny, nz, nt);
};

Point.prototype._projDbl = function _projDbl() {
  // hyperelliptic.org/EFD/g1p/auto-twisted-projective.html
  //     #doubling-dbl-2008-bbjlp
  //     #doubling-dbl-2007-bl
  // and others
  // Generally 3M + 4S or 2M + 4S

  // B = (X1 + Y1)^2
  var b = this.x.redAdd(this.y).redSqr();
  // C = X1^2
  var c = this.x.redSqr();
  // D = Y1^2
  var d = this.y.redSqr();

  var nx;
  var ny;
  var nz;
  if (this.curve.twisted) {
    // E = a * C
    var e = this.curve._mulA(c);
    // F = E + D
    var f = e.redAdd(d);
    if (this.zOne) {
      // X3 = (B - C - D) * (F - 2)
      nx = b.redSub(c).redSub(d).redMul(f.redSub(this.curve.two));
      // Y3 = F * (E - D)
      ny = f.redMul(e.redSub(d));
      // Z3 = F^2 - 2 * F
      nz = f.redSqr().redSub(f).redSub(f);
    } else {
      // H = Z1^2
      var h = this.z.redSqr();
      // J = F - 2 * H
      var j = f.redSub(h).redISub(h);
      // X3 = (B-C-D)*J
      nx = b.redSub(c).redISub(d).redMul(j);
      // Y3 = F * (E - D)
      ny = f.redMul(e.redSub(d));
      // Z3 = F * J
      nz = f.redMul(j);
    }
  } else {
    // E = C + D
    var e = c.redAdd(d);
    // H = (c * Z1)^2
    var h = this.curve._mulC(this.z).redSqr();
    // J = E - 2 * H
    var j = e.redSub(h).redSub(h);
    // X3 = c * (B - E) * J
    nx = this.curve._mulC(b.redISub(e)).redMul(j);
    // Y3 = c * E * (C - D)
    ny = this.curve._mulC(e).redMul(c.redISub(d));
    // Z3 = E * J
    nz = e.redMul(j);
  }
  return this.curve.point(nx, ny, nz);
};

Point.prototype.dbl = function dbl() {
  if (this.isInfinity())
    return this;

  // Double in extended coordinates
  if (this.curve.extended)
    return this._extDbl();
  else
    return this._projDbl();
};

Point.prototype._extAdd = function _extAdd(p) {
  // hyperelliptic.org/EFD/g1p/auto-twisted-extended-1.html
  //     #addition-add-2008-hwcd-3
  // 8M

  // A = (Y1 - X1) * (Y2 - X2)
  var a = this.y.redSub(this.x).redMul(p.y.redSub(p.x));
  // B = (Y1 + X1) * (Y2 + X2)
  var b = this.y.redAdd(this.x).redMul(p.y.redAdd(p.x));
  // C = T1 * k * T2
  var c = this.t.redMul(this.curve.dd).redMul(p.t);
  // D = Z1 * 2 * Z2
  var d = this.z.redMul(p.z.redAdd(p.z));
  // E = B - A
  var e = b.redSub(a);
  // F = D - C
  var f = d.redSub(c);
  // G = D + C
  var g = d.redAdd(c);
  // H = B + A
  var h = b.redAdd(a);
  // X3 = E * F
  var nx = e.redMul(f);
  // Y3 = G * H
  var ny = g.redMul(h);
  // T3 = E * H
  var nt = e.redMul(h);
  // Z3 = F * G
  var nz = f.redMul(g);
  return this.curve.point(nx, ny, nz, nt);
};

Point.prototype._projAdd = function _projAdd(p) {
  // hyperelliptic.org/EFD/g1p/auto-twisted-projective.html
  //     #addition-add-2008-bbjlp
  //     #addition-add-2007-bl
  // 10M + 1S

  // A = Z1 * Z2
  var a = this.z.redMul(p.z);
  // B = A^2
  var b = a.redSqr();
  // C = X1 * X2
  var c = this.x.redMul(p.x);
  // D = Y1 * Y2
  var d = this.y.redMul(p.y);
  // E = d * C * D
  var e = this.curve.d.redMul(c).redMul(d);
  // F = B - E
  var f = b.redSub(e);
  // G = B + E
  var g = b.redAdd(e);
  // X3 = A * F * ((X1 + Y1) * (X2 + Y2) - C - D)
  var tmp = this.x.redAdd(this.y).redMul(p.x.redAdd(p.y)).redISub(c).redISub(d);
  var nx = a.redMul(f).redMul(tmp);
  var ny;
  var nz;
  if (this.curve.twisted) {
    // Y3 = A * G * (D - a * C)
    ny = a.redMul(g).redMul(d.redSub(this.curve._mulA(c)));
    // Z3 = F * G
    nz = f.redMul(g);
  } else {
    // Y3 = A * G * (D - C)
    ny = a.redMul(g).redMul(d.redSub(c));
    // Z3 = c * F * G
    nz = this.curve._mulC(f).redMul(g);
  }
  return this.curve.point(nx, ny, nz);
};

Point.prototype.add = function add(p) {
  if (this.isInfinity())
    return p;
  if (p.isInfinity())
    return this;

  if (this.curve.extended)
    return this._extAdd(p);
  else
    return this._projAdd(p);
};

Point.prototype.mul = function mul(k) {
  if (this._hasDoubles(k))
    return this.curve._fixedNafMul(this, k);
  else
    return this.curve._wnafMul(this, k);
};

Point.prototype.mulAdd = function mulAdd(k1, p, k2) {
  return this.curve._wnafMulAdd(1, [ this, p ], [ k1, k2 ], 2, false);
};

Point.prototype.jmulAdd = function jmulAdd(k1, p, k2) {
  return this.curve._wnafMulAdd(1, [ this, p ], [ k1, k2 ], 2, true);
};

Point.prototype.normalize = function normalize() {
  if (this.zOne)
    return this;

  // Normalize coordinates
  var zi = this.z.redInvm();
  this.x = this.x.redMul(zi);
  this.y = this.y.redMul(zi);
  if (this.t)
    this.t = this.t.redMul(zi);
  this.z = this.curve.one;
  this.zOne = true;
  return this;
};

Point.prototype.neg = function neg() {
  return this.curve.point(this.x.redNeg(),
                          this.y,
                          this.z,
                          this.t && this.t.redNeg());
};

Point.prototype.getX = function getX() {
  this.normalize();
  return this.x.fromRed();
};

Point.prototype.getY = function getY() {
  this.normalize();
  return this.y.fromRed();
};

Point.prototype.eq = function eq(other) {
  return this === other ||
         this.getX().cmp(other.getX()) === 0 &&
         this.getY().cmp(other.getY()) === 0;
};

Point.prototype.eqXToP = function eqXToP(x) {
  var rx = x.toRed(this.curve.red).redMul(this.z);
  if (this.x.cmp(rx) === 0)
    return true;

  var xc = x.clone();
  var t = this.curve.redN.redMul(this.z);
  for (;;) {
    xc.iadd(this.curve.n);
    if (xc.cmp(this.curve.p) >= 0)
      return false;

    rx.redIAdd(t);
    if (this.x.cmp(rx) === 0)
      return true;
  }
};

// Compatibility with BaseCurve
Point.prototype.toP = Point.prototype.normalize;
Point.prototype.mixedAdd = Point.prototype.add;


/***/ }),

/***/ "./node_modules/elliptic/lib/elliptic/curve/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/elliptic/lib/elliptic/curve/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var curve = exports;

curve.base = __webpack_require__(/*! ./base */ "./node_modules/elliptic/lib/elliptic/curve/base.js");
curve.short = __webpack_require__(/*! ./short */ "./node_modules/elliptic/lib/elliptic/curve/short.js");
curve.mont = __webpack_require__(/*! ./mont */ "./node_modules/elliptic/lib/elliptic/curve/mont.js");
curve.edwards = __webpack_require__(/*! ./edwards */ "./node_modules/elliptic/lib/elliptic/curve/edwards.js");


/***/ }),

/***/ "./node_modules/elliptic/lib/elliptic/curve/mont.js":
/*!**********************************************************!*\
  !*** ./node_modules/elliptic/lib/elliptic/curve/mont.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__(/*! bn.js */ "./node_modules/bn.js/lib/bn.js");
var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");
var Base = __webpack_require__(/*! ./base */ "./node_modules/elliptic/lib/elliptic/curve/base.js");

var utils = __webpack_require__(/*! ../utils */ "./node_modules/elliptic/lib/elliptic/utils.js");

function MontCurve(conf) {
  Base.call(this, 'mont', conf);

  this.a = new BN(conf.a, 16).toRed(this.red);
  this.b = new BN(conf.b, 16).toRed(this.red);
  this.i4 = new BN(4).toRed(this.red).redInvm();
  this.two = new BN(2).toRed(this.red);
  this.a24 = this.i4.redMul(this.a.redAdd(this.two));
}
inherits(MontCurve, Base);
module.exports = MontCurve;

MontCurve.prototype.validate = function validate(point) {
  var x = point.normalize().x;
  var x2 = x.redSqr();
  var rhs = x2.redMul(x).redAdd(x2.redMul(this.a)).redAdd(x);
  var y = rhs.redSqrt();

  return y.redSqr().cmp(rhs) === 0;
};

function Point(curve, x, z) {
  Base.BasePoint.call(this, curve, 'projective');
  if (x === null && z === null) {
    this.x = this.curve.one;
    this.z = this.curve.zero;
  } else {
    this.x = new BN(x, 16);
    this.z = new BN(z, 16);
    if (!this.x.red)
      this.x = this.x.toRed(this.curve.red);
    if (!this.z.red)
      this.z = this.z.toRed(this.curve.red);
  }
}
inherits(Point, Base.BasePoint);

MontCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
  return this.point(utils.toArray(bytes, enc), 1);
};

MontCurve.prototype.point = function point(x, z) {
  return new Point(this, x, z);
};

MontCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
  return Point.fromJSON(this, obj);
};

Point.prototype.precompute = function precompute() {
  // No-op
};

Point.prototype._encode = function _encode() {
  return this.getX().toArray('be', this.curve.p.byteLength());
};

Point.fromJSON = function fromJSON(curve, obj) {
  return new Point(curve, obj[0], obj[1] || curve.one);
};

Point.prototype.inspect = function inspect() {
  if (this.isInfinity())
    return '<EC Point Infinity>';
  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
      ' z: ' + this.z.fromRed().toString(16, 2) + '>';
};

Point.prototype.isInfinity = function isInfinity() {
  // XXX This code assumes that zero is always zero in red
  return this.z.cmpn(0) === 0;
};

Point.prototype.dbl = function dbl() {
  // http://hyperelliptic.org/EFD/g1p/auto-montgom-xz.html#doubling-dbl-1987-m-3
  // 2M + 2S + 4A

  // A = X1 + Z1
  var a = this.x.redAdd(this.z);
  // AA = A^2
  var aa = a.redSqr();
  // B = X1 - Z1
  var b = this.x.redSub(this.z);
  // BB = B^2
  var bb = b.redSqr();
  // C = AA - BB
  var c = aa.redSub(bb);
  // X3 = AA * BB
  var nx = aa.redMul(bb);
  // Z3 = C * (BB + A24 * C)
  var nz = c.redMul(bb.redAdd(this.curve.a24.redMul(c)));
  return this.curve.point(nx, nz);
};

Point.prototype.add = function add() {
  throw new Error('Not supported on Montgomery curve');
};

Point.prototype.diffAdd = function diffAdd(p, diff) {
  // http://hyperelliptic.org/EFD/g1p/auto-montgom-xz.html#diffadd-dadd-1987-m-3
  // 4M + 2S + 6A

  // A = X2 + Z2
  var a = this.x.redAdd(this.z);
  // B = X2 - Z2
  var b = this.x.redSub(this.z);
  // C = X3 + Z3
  var c = p.x.redAdd(p.z);
  // D = X3 - Z3
  var d = p.x.redSub(p.z);
  // DA = D * A
  var da = d.redMul(a);
  // CB = C * B
  var cb = c.redMul(b);
  // X5 = Z1 * (DA + CB)^2
  var nx = diff.z.redMul(da.redAdd(cb).redSqr());
  // Z5 = X1 * (DA - CB)^2
  var nz = diff.x.redMul(da.redISub(cb).redSqr());
  return this.curve.point(nx, nz);
};

Point.prototype.mul = function mul(k) {
  var t = k.clone();
  var a = this; // (N / 2) * Q + Q
  var b = this.curve.point(null, null); // (N / 2) * Q
  var c = this; // Q

  for (var bits = []; t.cmpn(0) !== 0; t.iushrn(1))
    bits.push(t.andln(1));

  for (var i = bits.length - 1; i >= 0; i--) {
    if (bits[i] === 0) {
      // N * Q + Q = ((N / 2) * Q + Q)) + (N / 2) * Q
      a = a.diffAdd(b, c);
      // N * Q = 2 * ((N / 2) * Q + Q))
      b = b.dbl();
    } else {
      // N * Q = ((N / 2) * Q + Q) + ((N / 2) * Q)
      b = a.diffAdd(b, c);
      // N * Q + Q = 2 * ((N / 2) * Q + Q)
      a = a.dbl();
    }
  }
  return b;
};

Point.prototype.mulAdd = function mulAdd() {
  throw new Error('Not supported on Montgomery curve');
};

Point.prototype.jumlAdd = function jumlAdd() {
  throw new Error('Not supported on Montgomery curve');
};

Point.prototype.eq = function eq(other) {
  return this.getX().cmp(other.getX()) === 0;
};

Point.prototype.normalize = function normalize() {
  this.x = this.x.redMul(this.z.redInvm());
  this.z = this.curve.one;
  return this;
};

Point.prototype.getX = function getX() {
  // Normalize coordinates
  this.normalize();

  return this.x.fromRed();
};


/***/ }),

/***/ "./node_modules/elliptic/lib/elliptic/curve/short.js":
/*!***********************************************************!*\
  !*** ./node_modules/elliptic/lib/elliptic/curve/short.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/elliptic/lib/elliptic/utils.js");
var BN = __webpack_require__(/*! bn.js */ "./node_modules/bn.js/lib/bn.js");
var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");
var Base = __webpack_require__(/*! ./base */ "./node_modules/elliptic/lib/elliptic/curve/base.js");

var assert = utils.assert;

function ShortCurve(conf) {
  Base.call(this, 'short', conf);

  this.a = new BN(conf.a, 16).toRed(this.red);
  this.b = new BN(conf.b, 16).toRed(this.red);
  this.tinv = this.two.redInvm();

  this.zeroA = this.a.fromRed().cmpn(0) === 0;
  this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0;

  // If the curve is endomorphic, precalculate beta and lambda
  this.endo = this._getEndomorphism(conf);
  this._endoWnafT1 = new Array(4);
  this._endoWnafT2 = new Array(4);
}
inherits(ShortCurve, Base);
module.exports = ShortCurve;

ShortCurve.prototype._getEndomorphism = function _getEndomorphism(conf) {
  // No efficient endomorphism
  if (!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)
    return;

  // Compute beta and lambda, that lambda * P = (beta * Px; Py)
  var beta;
  var lambda;
  if (conf.beta) {
    beta = new BN(conf.beta, 16).toRed(this.red);
  } else {
    var betas = this._getEndoRoots(this.p);
    // Choose the smallest beta
    beta = betas[0].cmp(betas[1]) < 0 ? betas[0] : betas[1];
    beta = beta.toRed(this.red);
  }
  if (conf.lambda) {
    lambda = new BN(conf.lambda, 16);
  } else {
    // Choose the lambda that is matching selected beta
    var lambdas = this._getEndoRoots(this.n);
    if (this.g.mul(lambdas[0]).x.cmp(this.g.x.redMul(beta)) === 0) {
      lambda = lambdas[0];
    } else {
      lambda = lambdas[1];
      assert(this.g.mul(lambda).x.cmp(this.g.x.redMul(beta)) === 0);
    }
  }

  // Get basis vectors, used for balanced length-two representation
  var basis;
  if (conf.basis) {
    basis = conf.basis.map(function(vec) {
      return {
        a: new BN(vec.a, 16),
        b: new BN(vec.b, 16)
      };
    });
  } else {
    basis = this._getEndoBasis(lambda);
  }

  return {
    beta: beta,
    lambda: lambda,
    basis: basis
  };
};

ShortCurve.prototype._getEndoRoots = function _getEndoRoots(num) {
  // Find roots of for x^2 + x + 1 in F
  // Root = (-1 +- Sqrt(-3)) / 2
  //
  var red = num === this.p ? this.red : BN.mont(num);
  var tinv = new BN(2).toRed(red).redInvm();
  var ntinv = tinv.redNeg();

  var s = new BN(3).toRed(red).redNeg().redSqrt().redMul(tinv);

  var l1 = ntinv.redAdd(s).fromRed();
  var l2 = ntinv.redSub(s).fromRed();
  return [ l1, l2 ];
};

ShortCurve.prototype._getEndoBasis = function _getEndoBasis(lambda) {
  // aprxSqrt >= sqrt(this.n)
  var aprxSqrt = this.n.ushrn(Math.floor(this.n.bitLength() / 2));

  // 3.74
  // Run EGCD, until r(L + 1) < aprxSqrt
  var u = lambda;
  var v = this.n.clone();
  var x1 = new BN(1);
  var y1 = new BN(0);
  var x2 = new BN(0);
  var y2 = new BN(1);

  // NOTE: all vectors are roots of: a + b * lambda = 0 (mod n)
  var a0;
  var b0;
  // First vector
  var a1;
  var b1;
  // Second vector
  var a2;
  var b2;

  var prevR;
  var i = 0;
  var r;
  var x;
  while (u.cmpn(0) !== 0) {
    var q = v.div(u);
    r = v.sub(q.mul(u));
    x = x2.sub(q.mul(x1));
    var y = y2.sub(q.mul(y1));

    if (!a1 && r.cmp(aprxSqrt) < 0) {
      a0 = prevR.neg();
      b0 = x1;
      a1 = r.neg();
      b1 = x;
    } else if (a1 && ++i === 2) {
      break;
    }
    prevR = r;

    v = u;
    u = r;
    x2 = x1;
    x1 = x;
    y2 = y1;
    y1 = y;
  }
  a2 = r.neg();
  b2 = x;

  var len1 = a1.sqr().add(b1.sqr());
  var len2 = a2.sqr().add(b2.sqr());
  if (len2.cmp(len1) >= 0) {
    a2 = a0;
    b2 = b0;
  }

  // Normalize signs
  if (a1.negative) {
    a1 = a1.neg();
    b1 = b1.neg();
  }
  if (a2.negative) {
    a2 = a2.neg();
    b2 = b2.neg();
  }

  return [
    { a: a1, b: b1 },
    { a: a2, b: b2 }
  ];
};

ShortCurve.prototype._endoSplit = function _endoSplit(k) {
  var basis = this.endo.basis;
  var v1 = basis[0];
  var v2 = basis[1];

  var c1 = v2.b.mul(k).divRound(this.n);
  var c2 = v1.b.neg().mul(k).divRound(this.n);

  var p1 = c1.mul(v1.a);
  var p2 = c2.mul(v2.a);
  var q1 = c1.mul(v1.b);
  var q2 = c2.mul(v2.b);

  // Calculate answer
  var k1 = k.sub(p1).sub(p2);
  var k2 = q1.add(q2).neg();
  return { k1: k1, k2: k2 };
};

ShortCurve.prototype.pointFromX = function pointFromX(x, odd) {
  x = new BN(x, 16);
  if (!x.red)
    x = x.toRed(this.red);

  var y2 = x.redSqr().redMul(x).redIAdd(x.redMul(this.a)).redIAdd(this.b);
  var y = y2.redSqrt();
  if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
    throw new Error('invalid point');

  // XXX Is there any way to tell if the number is odd without converting it
  // to non-red form?
  var isOdd = y.fromRed().isOdd();
  if (odd && !isOdd || !odd && isOdd)
    y = y.redNeg();

  return this.point(x, y);
};

ShortCurve.prototype.validate = function validate(point) {
  if (point.inf)
    return true;

  var x = point.x;
  var y = point.y;

  var ax = this.a.redMul(x);
  var rhs = x.redSqr().redMul(x).redIAdd(ax).redIAdd(this.b);
  return y.redSqr().redISub(rhs).cmpn(0) === 0;
};

ShortCurve.prototype._endoWnafMulAdd =
    function _endoWnafMulAdd(points, coeffs, jacobianResult) {
  var npoints = this._endoWnafT1;
  var ncoeffs = this._endoWnafT2;
  for (var i = 0; i < points.length; i++) {
    var split = this._endoSplit(coeffs[i]);
    var p = points[i];
    var beta = p._getBeta();

    if (split.k1.negative) {
      split.k1.ineg();
      p = p.neg(true);
    }
    if (split.k2.negative) {
      split.k2.ineg();
      beta = beta.neg(true);
    }

    npoints[i * 2] = p;
    npoints[i * 2 + 1] = beta;
    ncoeffs[i * 2] = split.k1;
    ncoeffs[i * 2 + 1] = split.k2;
  }
  var res = this._wnafMulAdd(1, npoints, ncoeffs, i * 2, jacobianResult);

  // Clean-up references to points and coefficients
  for (var j = 0; j < i * 2; j++) {
    npoints[j] = null;
    ncoeffs[j] = null;
  }
  return res;
};

function Point(curve, x, y, isRed) {
  Base.BasePoint.call(this, curve, 'affine');
  if (x === null && y === null) {
    this.x = null;
    this.y = null;
    this.inf = true;
  } else {
    this.x = new BN(x, 16);
    this.y = new BN(y, 16);
    // Force redgomery representation when loading from JSON
    if (isRed) {
      this.x.forceRed(this.curve.red);
      this.y.forceRed(this.curve.red);
    }
    if (!this.x.red)
      this.x = this.x.toRed(this.curve.red);
    if (!this.y.red)
      this.y = this.y.toRed(this.curve.red);
    this.inf = false;
  }
}
inherits(Point, Base.BasePoint);

ShortCurve.prototype.point = function point(x, y, isRed) {
  return new Point(this, x, y, isRed);
};

ShortCurve.prototype.pointFromJSON = function pointFromJSON(obj, red) {
  return Point.fromJSON(this, obj, red);
};

Point.prototype._getBeta = function _getBeta() {
  if (!this.curve.endo)
    return;

  var pre = this.precomputed;
  if (pre && pre.beta)
    return pre.beta;

  var beta = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
  if (pre) {
    var curve = this.curve;
    var endoMul = function(p) {
      return curve.point(p.x.redMul(curve.endo.beta), p.y);
    };
    pre.beta = beta;
    beta.precomputed = {
      beta: null,
      naf: pre.naf && {
        wnd: pre.naf.wnd,
        points: pre.naf.points.map(endoMul)
      },
      doubles: pre.doubles && {
        step: pre.doubles.step,
        points: pre.doubles.points.map(endoMul)
      }
    };
  }
  return beta;
};

Point.prototype.toJSON = function toJSON() {
  if (!this.precomputed)
    return [ this.x, this.y ];

  return [ this.x, this.y, this.precomputed && {
    doubles: this.precomputed.doubles && {
      step: this.precomputed.doubles.step,
      points: this.precomputed.doubles.points.slice(1)
    },
    naf: this.precomputed.naf && {
      wnd: this.precomputed.naf.wnd,
      points: this.precomputed.naf.points.slice(1)
    }
  } ];
};

Point.fromJSON = function fromJSON(curve, obj, red) {
  if (typeof obj === 'string')
    obj = JSON.parse(obj);
  var res = curve.point(obj[0], obj[1], red);
  if (!obj[2])
    return res;

  function obj2point(obj) {
    return curve.point(obj[0], obj[1], red);
  }

  var pre = obj[2];
  res.precomputed = {
    beta: null,
    doubles: pre.doubles && {
      step: pre.doubles.step,
      points: [ res ].concat(pre.doubles.points.map(obj2point))
    },
    naf: pre.naf && {
      wnd: pre.naf.wnd,
      points: [ res ].concat(pre.naf.points.map(obj2point))
    }
  };
  return res;
};

Point.prototype.inspect = function inspect() {
  if (this.isInfinity())
    return '<EC Point Infinity>';
  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
      ' y: ' + this.y.fromRed().toString(16, 2) + '>';
};

Point.prototype.isInfinity = function isInfinity() {
  return this.inf;
};

Point.prototype.add = function add(p) {
  // O + P = P
  if (this.inf)
    return p;

  // P + O = P
  if (p.inf)
    return this;

  // P + P = 2P
  if (this.eq(p))
    return this.dbl();

  // P + (-P) = O
  if (this.neg().eq(p))
    return this.curve.point(null, null);

  // P + Q = O
  if (this.x.cmp(p.x) === 0)
    return this.curve.point(null, null);

  var c = this.y.redSub(p.y);
  if (c.cmpn(0) !== 0)
    c = c.redMul(this.x.redSub(p.x).redInvm());
  var nx = c.redSqr().redISub(this.x).redISub(p.x);
  var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
  return this.curve.point(nx, ny);
};

Point.prototype.dbl = function dbl() {
  if (this.inf)
    return this;

  // 2P = O
  var ys1 = this.y.redAdd(this.y);
  if (ys1.cmpn(0) === 0)
    return this.curve.point(null, null);

  var a = this.curve.a;

  var x2 = this.x.redSqr();
  var dyinv = ys1.redInvm();
  var c = x2.redAdd(x2).redIAdd(x2).redIAdd(a).redMul(dyinv);

  var nx = c.redSqr().redISub(this.x.redAdd(this.x));
  var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
  return this.curve.point(nx, ny);
};

Point.prototype.getX = function getX() {
  return this.x.fromRed();
};

Point.prototype.getY = function getY() {
  return this.y.fromRed();
};

Point.prototype.mul = function mul(k) {
  k = new BN(k, 16);
  if (this.isInfinity())
    return this;
  else if (this._hasDoubles(k))
    return this.curve._fixedNafMul(this, k);
  else if (this.curve.endo)
    return this.curve._endoWnafMulAdd([ this ], [ k ]);
  else
    return this.curve._wnafMul(this, k);
};

Point.prototype.mulAdd = function mulAdd(k1, p2, k2) {
  var points = [ this, p2 ];
  var coeffs = [ k1, k2 ];
  if (this.curve.endo)
    return this.curve._endoWnafMulAdd(points, coeffs);
  else
    return this.curve._wnafMulAdd(1, points, coeffs, 2);
};

Point.prototype.jmulAdd = function jmulAdd(k1, p2, k2) {
  var points = [ this, p2 ];
  var coeffs = [ k1, k2 ];
  if (this.curve.endo)
    return this.curve._endoWnafMulAdd(points, coeffs, true);
  else
    return this.curve._wnafMulAdd(1, points, coeffs, 2, true);
};

Point.prototype.eq = function eq(p) {
  return this === p ||
         this.inf === p.inf &&
             (this.inf || this.x.cmp(p.x) === 0 && this.y.cmp(p.y) === 0);
};

Point.prototype.neg = function neg(_precompute) {
  if (this.inf)
    return this;

  var res = this.curve.point(this.x, this.y.redNeg());
  if (_precompute && this.precomputed) {
    var pre = this.precomputed;
    var negate = function(p) {
      return p.neg();
    };
    res.precomputed = {
      naf: pre.naf && {
        wnd: pre.naf.wnd,
        points: pre.naf.points.map(negate)
      },
      doubles: pre.doubles && {
        step: pre.doubles.step,
        points: pre.doubles.points.map(negate)
      }
    };
  }
  return res;
};

Point.prototype.toJ = function toJ() {
  if (this.inf)
    return this.curve.jpoint(null, null, null);

  var res = this.curve.jpoint(this.x, this.y, this.curve.one);
  return res;
};

function JPoint(curve, x, y, z) {
  Base.BasePoint.call(this, curve, 'jacobian');
  if (x === null && y === null && z === null) {
    this.x = this.curve.one;
    this.y = this.curve.one;
    this.z = new BN(0);
  } else {
    this.x = new BN(x, 16);
    this.y = new BN(y, 16);
    this.z = new BN(z, 16);
  }
  if (!this.x.red)
    this.x = this.x.toRed(this.curve.red);
  if (!this.y.red)
    this.y = this.y.toRed(this.curve.red);
  if (!this.z.red)
    this.z = this.z.toRed(this.curve.red);

  this.zOne = this.z === this.curve.one;
}
inherits(JPoint, Base.BasePoint);

ShortCurve.prototype.jpoint = function jpoint(x, y, z) {
  return new JPoint(this, x, y, z);
};

JPoint.prototype.toP = function toP() {
  if (this.isInfinity())
    return this.curve.point(null, null);

  var zinv = this.z.redInvm();
  var zinv2 = zinv.redSqr();
  var ax = this.x.redMul(zinv2);
  var ay = this.y.redMul(zinv2).redMul(zinv);

  return this.curve.point(ax, ay);
};

JPoint.prototype.neg = function neg() {
  return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
};

JPoint.prototype.add = function add(p) {
  // O + P = P
  if (this.isInfinity())
    return p;

  // P + O = P
  if (p.isInfinity())
    return this;

  // 12M + 4S + 7A
  var pz2 = p.z.redSqr();
  var z2 = this.z.redSqr();
  var u1 = this.x.redMul(pz2);
  var u2 = p.x.redMul(z2);
  var s1 = this.y.redMul(pz2.redMul(p.z));
  var s2 = p.y.redMul(z2.redMul(this.z));

  var h = u1.redSub(u2);
  var r = s1.redSub(s2);
  if (h.cmpn(0) === 0) {
    if (r.cmpn(0) !== 0)
      return this.curve.jpoint(null, null, null);
    else
      return this.dbl();
  }

  var h2 = h.redSqr();
  var h3 = h2.redMul(h);
  var v = u1.redMul(h2);

  var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
  var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
  var nz = this.z.redMul(p.z).redMul(h);

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.mixedAdd = function mixedAdd(p) {
  // O + P = P
  if (this.isInfinity())
    return p.toJ();

  // P + O = P
  if (p.isInfinity())
    return this;

  // 8M + 3S + 7A
  var z2 = this.z.redSqr();
  var u1 = this.x;
  var u2 = p.x.redMul(z2);
  var s1 = this.y;
  var s2 = p.y.redMul(z2).redMul(this.z);

  var h = u1.redSub(u2);
  var r = s1.redSub(s2);
  if (h.cmpn(0) === 0) {
    if (r.cmpn(0) !== 0)
      return this.curve.jpoint(null, null, null);
    else
      return this.dbl();
  }

  var h2 = h.redSqr();
  var h3 = h2.redMul(h);
  var v = u1.redMul(h2);

  var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
  var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
  var nz = this.z.redMul(h);

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.dblp = function dblp(pow) {
  if (pow === 0)
    return this;
  if (this.isInfinity())
    return this;
  if (!pow)
    return this.dbl();

  if (this.curve.zeroA || this.curve.threeA) {
    var r = this;
    for (var i = 0; i < pow; i++)
      r = r.dbl();
    return r;
  }

  // 1M + 2S + 1A + N * (4S + 5M + 8A)
  // N = 1 => 6M + 6S + 9A
  var a = this.curve.a;
  var tinv = this.curve.tinv;

  var jx = this.x;
  var jy = this.y;
  var jz = this.z;
  var jz4 = jz.redSqr().redSqr();

  // Reuse results
  var jyd = jy.redAdd(jy);
  for (var i = 0; i < pow; i++) {
    var jx2 = jx.redSqr();
    var jyd2 = jyd.redSqr();
    var jyd4 = jyd2.redSqr();
    var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));

    var t1 = jx.redMul(jyd2);
    var nx = c.redSqr().redISub(t1.redAdd(t1));
    var t2 = t1.redISub(nx);
    var dny = c.redMul(t2);
    dny = dny.redIAdd(dny).redISub(jyd4);
    var nz = jyd.redMul(jz);
    if (i + 1 < pow)
      jz4 = jz4.redMul(jyd4);

    jx = nx;
    jz = nz;
    jyd = dny;
  }

  return this.curve.jpoint(jx, jyd.redMul(tinv), jz);
};

JPoint.prototype.dbl = function dbl() {
  if (this.isInfinity())
    return this;

  if (this.curve.zeroA)
    return this._zeroDbl();
  else if (this.curve.threeA)
    return this._threeDbl();
  else
    return this._dbl();
};

JPoint.prototype._zeroDbl = function _zeroDbl() {
  var nx;
  var ny;
  var nz;
  // Z = 1
  if (this.zOne) {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
    //     #doubling-mdbl-2007-bl
    // 1M + 5S + 14A

    // XX = X1^2
    var xx = this.x.redSqr();
    // YY = Y1^2
    var yy = this.y.redSqr();
    // YYYY = YY^2
    var yyyy = yy.redSqr();
    // S = 2 * ((X1 + YY)^2 - XX - YYYY)
    var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
    s = s.redIAdd(s);
    // M = 3 * XX + a; a = 0
    var m = xx.redAdd(xx).redIAdd(xx);
    // T = M ^ 2 - 2*S
    var t = m.redSqr().redISub(s).redISub(s);

    // 8 * YYYY
    var yyyy8 = yyyy.redIAdd(yyyy);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    yyyy8 = yyyy8.redIAdd(yyyy8);

    // X3 = T
    nx = t;
    // Y3 = M * (S - T) - 8 * YYYY
    ny = m.redMul(s.redISub(t)).redISub(yyyy8);
    // Z3 = 2*Y1
    nz = this.y.redAdd(this.y);
  } else {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
    //     #doubling-dbl-2009-l
    // 2M + 5S + 13A

    // A = X1^2
    var a = this.x.redSqr();
    // B = Y1^2
    var b = this.y.redSqr();
    // C = B^2
    var c = b.redSqr();
    // D = 2 * ((X1 + B)^2 - A - C)
    var d = this.x.redAdd(b).redSqr().redISub(a).redISub(c);
    d = d.redIAdd(d);
    // E = 3 * A
    var e = a.redAdd(a).redIAdd(a);
    // F = E^2
    var f = e.redSqr();

    // 8 * C
    var c8 = c.redIAdd(c);
    c8 = c8.redIAdd(c8);
    c8 = c8.redIAdd(c8);

    // X3 = F - 2 * D
    nx = f.redISub(d).redISub(d);
    // Y3 = E * (D - X3) - 8 * C
    ny = e.redMul(d.redISub(nx)).redISub(c8);
    // Z3 = 2 * Y1 * Z1
    nz = this.y.redMul(this.z);
    nz = nz.redIAdd(nz);
  }

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype._threeDbl = function _threeDbl() {
  var nx;
  var ny;
  var nz;
  // Z = 1
  if (this.zOne) {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html
    //     #doubling-mdbl-2007-bl
    // 1M + 5S + 15A

    // XX = X1^2
    var xx = this.x.redSqr();
    // YY = Y1^2
    var yy = this.y.redSqr();
    // YYYY = YY^2
    var yyyy = yy.redSqr();
    // S = 2 * ((X1 + YY)^2 - XX - YYYY)
    var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
    s = s.redIAdd(s);
    // M = 3 * XX + a
    var m = xx.redAdd(xx).redIAdd(xx).redIAdd(this.curve.a);
    // T = M^2 - 2 * S
    var t = m.redSqr().redISub(s).redISub(s);
    // X3 = T
    nx = t;
    // Y3 = M * (S - T) - 8 * YYYY
    var yyyy8 = yyyy.redIAdd(yyyy);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    ny = m.redMul(s.redISub(t)).redISub(yyyy8);
    // Z3 = 2 * Y1
    nz = this.y.redAdd(this.y);
  } else {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html#doubling-dbl-2001-b
    // 3M + 5S

    // delta = Z1^2
    var delta = this.z.redSqr();
    // gamma = Y1^2
    var gamma = this.y.redSqr();
    // beta = X1 * gamma
    var beta = this.x.redMul(gamma);
    // alpha = 3 * (X1 - delta) * (X1 + delta)
    var alpha = this.x.redSub(delta).redMul(this.x.redAdd(delta));
    alpha = alpha.redAdd(alpha).redIAdd(alpha);
    // X3 = alpha^2 - 8 * beta
    var beta4 = beta.redIAdd(beta);
    beta4 = beta4.redIAdd(beta4);
    var beta8 = beta4.redAdd(beta4);
    nx = alpha.redSqr().redISub(beta8);
    // Z3 = (Y1 + Z1)^2 - gamma - delta
    nz = this.y.redAdd(this.z).redSqr().redISub(gamma).redISub(delta);
    // Y3 = alpha * (4 * beta - X3) - 8 * gamma^2
    var ggamma8 = gamma.redSqr();
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ny = alpha.redMul(beta4.redISub(nx)).redISub(ggamma8);
  }

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype._dbl = function _dbl() {
  var a = this.curve.a;

  // 4M + 6S + 10A
  var jx = this.x;
  var jy = this.y;
  var jz = this.z;
  var jz4 = jz.redSqr().redSqr();

  var jx2 = jx.redSqr();
  var jy2 = jy.redSqr();

  var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));

  var jxd4 = jx.redAdd(jx);
  jxd4 = jxd4.redIAdd(jxd4);
  var t1 = jxd4.redMul(jy2);
  var nx = c.redSqr().redISub(t1.redAdd(t1));
  var t2 = t1.redISub(nx);

  var jyd8 = jy2.redSqr();
  jyd8 = jyd8.redIAdd(jyd8);
  jyd8 = jyd8.redIAdd(jyd8);
  jyd8 = jyd8.redIAdd(jyd8);
  var ny = c.redMul(t2).redISub(jyd8);
  var nz = jy.redAdd(jy).redMul(jz);

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.trpl = function trpl() {
  if (!this.curve.zeroA)
    return this.dbl().add(this);

  // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html#tripling-tpl-2007-bl
  // 5M + 10S + ...

  // XX = X1^2
  var xx = this.x.redSqr();
  // YY = Y1^2
  var yy = this.y.redSqr();
  // ZZ = Z1^2
  var zz = this.z.redSqr();
  // YYYY = YY^2
  var yyyy = yy.redSqr();
  // M = 3 * XX + a * ZZ2; a = 0
  var m = xx.redAdd(xx).redIAdd(xx);
  // MM = M^2
  var mm = m.redSqr();
  // E = 6 * ((X1 + YY)^2 - XX - YYYY) - MM
  var e = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
  e = e.redIAdd(e);
  e = e.redAdd(e).redIAdd(e);
  e = e.redISub(mm);
  // EE = E^2
  var ee = e.redSqr();
  // T = 16*YYYY
  var t = yyyy.redIAdd(yyyy);
  t = t.redIAdd(t);
  t = t.redIAdd(t);
  t = t.redIAdd(t);
  // U = (M + E)^2 - MM - EE - T
  var u = m.redIAdd(e).redSqr().redISub(mm).redISub(ee).redISub(t);
  // X3 = 4 * (X1 * EE - 4 * YY * U)
  var yyu4 = yy.redMul(u);
  yyu4 = yyu4.redIAdd(yyu4);
  yyu4 = yyu4.redIAdd(yyu4);
  var nx = this.x.redMul(ee).redISub(yyu4);
  nx = nx.redIAdd(nx);
  nx = nx.redIAdd(nx);
  // Y3 = 8 * Y1 * (U * (T - U) - E * EE)
  var ny = this.y.redMul(u.redMul(t.redISub(u)).redISub(e.redMul(ee)));
  ny = ny.redIAdd(ny);
  ny = ny.redIAdd(ny);
  ny = ny.redIAdd(ny);
  // Z3 = (Z1 + E)^2 - ZZ - EE
  var nz = this.z.redAdd(e).redSqr().redISub(zz).redISub(ee);

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.mul = function mul(k, kbase) {
  k = new BN(k, kbase);

  return this.curve._wnafMul(this, k);
};

JPoint.prototype.eq = function eq(p) {
  if (p.type === 'affine')
    return this.eq(p.toJ());

  if (this === p)
    return true;

  // x1 * z2^2 == x2 * z1^2
  var z2 = this.z.redSqr();
  var pz2 = p.z.redSqr();
  if (this.x.redMul(pz2).redISub(p.x.redMul(z2)).cmpn(0) !== 0)
    return false;

  // y1 * z2^3 == y2 * z1^3
  var z3 = z2.redMul(this.z);
  var pz3 = pz2.redMul(p.z);
  return this.y.redMul(pz3).redISub(p.y.redMul(z3)).cmpn(0) === 0;
};

JPoint.prototype.eqXToP = function eqXToP(x) {
  var zs = this.z.redSqr();
  var rx = x.toRed(this.curve.red).redMul(zs);
  if (this.x.cmp(rx) === 0)
    return true;

  var xc = x.clone();
  var t = this.curve.redN.redMul(zs);
  for (;;) {
    xc.iadd(this.curve.n);
    if (xc.cmp(this.curve.p) >= 0)
      return false;

    rx.redIAdd(t);
    if (this.x.cmp(rx) === 0)
      return true;
  }
};

JPoint.prototype.inspect = function inspect() {
  if (this.isInfinity())
    return '<EC JPoint Infinity>';
  return '<EC JPoint x: ' + this.x.toString(16, 2) +
      ' y: ' + this.y.toString(16, 2) +
      ' z: ' + this.z.toString(16, 2) + '>';
};

JPoint.prototype.isInfinity = function isInfinity() {
  // XXX This code assumes that zero is always zero in red
  return this.z.cmpn(0) === 0;
};


/***/ }),

/***/ "./node_modules/elliptic/lib/elliptic/curves.js":
/*!******************************************************!*\
  !*** ./node_modules/elliptic/lib/elliptic/curves.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var curves = exports;

var hash = __webpack_require__(/*! hash.js */ "./node_modules/hash.js/lib/hash.js");
var curve = __webpack_require__(/*! ./curve */ "./node_modules/elliptic/lib/elliptic/curve/index.js");
var utils = __webpack_require__(/*! ./utils */ "./node_modules/elliptic/lib/elliptic/utils.js");

var assert = utils.assert;

function PresetCurve(options) {
  if (options.type === 'short')
    this.curve = new curve.short(options);
  else if (options.type === 'edwards')
    this.curve = new curve.edwards(options);
  else
    this.curve = new curve.mont(options);
  this.g = this.curve.g;
  this.n = this.curve.n;
  this.hash = options.hash;

  assert(this.g.validate(), 'Invalid curve');
  assert(this.g.mul(this.n).isInfinity(), 'Invalid curve, G*N != O');
}
curves.PresetCurve = PresetCurve;

function defineCurve(name, options) {
  Object.defineProperty(curves, name, {
    configurable: true,
    enumerable: true,
    get: function() {
      var curve = new PresetCurve(options);
      Object.defineProperty(curves, name, {
        configurable: true,
        enumerable: true,
        value: curve
      });
      return curve;
    }
  });
}

defineCurve('p192', {
  type: 'short',
  prime: 'p192',
  p: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff',
  a: 'ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc',
  b: '64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1',
  n: 'ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831',
  hash: hash.sha256,
  gRed: false,
  g: [
    '188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012',
    '07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811'
  ]
});

defineCurve('p224', {
  type: 'short',
  prime: 'p224',
  p: 'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001',
  a: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe',
  b: 'b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4',
  n: 'ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d',
  hash: hash.sha256,
  gRed: false,
  g: [
    'b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21',
    'bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34'
  ]
});

defineCurve('p256', {
  type: 'short',
  prime: null,
  p: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff',
  a: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc',
  b: '5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b',
  n: 'ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551',
  hash: hash.sha256,
  gRed: false,
  g: [
    '6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296',
    '4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5'
  ]
});

defineCurve('p384', {
  type: 'short',
  prime: null,
  p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'fffffffe ffffffff 00000000 00000000 ffffffff',
  a: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'fffffffe ffffffff 00000000 00000000 fffffffc',
  b: 'b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f ' +
     '5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef',
  n: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 ' +
     'f4372ddf 581a0db2 48b0a77a ecec196a ccc52973',
  hash: hash.sha384,
  gRed: false,
  g: [
    'aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 ' +
    '5502f25d bf55296c 3a545e38 72760ab7',
    '3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 ' +
    '0a60b1ce 1d7e819d 7a431d7c 90ea0e5f'
  ]
});

defineCurve('p521', {
  type: 'short',
  prime: null,
  p: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff ffffffff ffffffff ffffffff',
  a: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff ffffffff ffffffff fffffffc',
  b: '00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b ' +
     '99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd ' +
     '3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00',
  n: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 ' +
     'f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409',
  hash: hash.sha512,
  gRed: false,
  g: [
    '000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 ' +
    '053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 ' +
    'a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66',
    '00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 ' +
    '579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 ' +
    '3fad0761 353c7086 a272c240 88be9476 9fd16650'
  ]
});

defineCurve('curve25519', {
  type: 'mont',
  prime: 'p25519',
  p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
  a: '76d06',
  b: '1',
  n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
  hash: hash.sha256,
  gRed: false,
  g: [
    '9'
  ]
});

defineCurve('ed25519', {
  type: 'edwards',
  prime: 'p25519',
  p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
  a: '-1',
  c: '1',
  // -121665 * (121666^(-1)) (mod P)
  d: '52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3',
  n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
  hash: hash.sha256,
  gRed: false,
  g: [
    '216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a',

    // 4/5
    '6666666666666666666666666666666666666666666666666666666666666658'
  ]
});

var pre;
try {
  pre = __webpack_require__(/*! ./precomputed/secp256k1 */ "./node_modules/elliptic/lib/elliptic/precomputed/secp256k1.js");
} catch (e) {
  pre = undefined;
}

defineCurve('secp256k1', {
  type: 'short',
  prime: 'k256',
  p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f',
  a: '0',
  b: '7',
  n: 'ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141',
  h: '1',
  hash: hash.sha256,

  // Precomputed endomorphism
  beta: '7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee',
  lambda: '5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72',
  basis: [
    {
      a: '3086d221a7d46bcde86c90e49284eb15',
      b: '-e4437ed6010e88286f547fa90abfe4c3'
    },
    {
      a: '114ca50f7a8e2f3f657c1108d9d44cfd8',
      b: '3086d221a7d46bcde86c90e49284eb15'
    }
  ],

  gRed: false,
  g: [
    '79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798',
    '483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8',
    pre
  ]
});


/***/ }),

/***/ "./node_modules/elliptic/lib/elliptic/ec/index.js":
/*!********************************************************!*\
  !*** ./node_modules/elliptic/lib/elliptic/ec/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__(/*! bn.js */ "./node_modules/bn.js/lib/bn.js");
var HmacDRBG = __webpack_require__(/*! hmac-drbg */ "./node_modules/hmac-drbg/lib/hmac-drbg.js");
var utils = __webpack_require__(/*! ../utils */ "./node_modules/elliptic/lib/elliptic/utils.js");
var curves = __webpack_require__(/*! ../curves */ "./node_modules/elliptic/lib/elliptic/curves.js");
var rand = __webpack_require__(/*! brorand */ "./node_modules/brorand/index.js");
var assert = utils.assert;

var KeyPair = __webpack_require__(/*! ./key */ "./node_modules/elliptic/lib/elliptic/ec/key.js");
var Signature = __webpack_require__(/*! ./signature */ "./node_modules/elliptic/lib/elliptic/ec/signature.js");

function EC(options) {
  if (!(this instanceof EC))
    return new EC(options);

  // Shortcut `elliptic.ec(curve-name)`
  if (typeof options === 'string') {
    assert(curves.hasOwnProperty(options), 'Unknown curve ' + options);

    options = curves[options];
  }

  // Shortcut for `elliptic.ec(elliptic.curves.curveName)`
  if (options instanceof curves.PresetCurve)
    options = { curve: options };

  this.curve = options.curve.curve;
  this.n = this.curve.n;
  this.nh = this.n.ushrn(1);
  this.g = this.curve.g;

  // Point on curve
  this.g = options.curve.g;
  this.g.precompute(options.curve.n.bitLength() + 1);

  // Hash for function for DRBG
  this.hash = options.hash || options.curve.hash;
}
module.exports = EC;

EC.prototype.keyPair = function keyPair(options) {
  return new KeyPair(this, options);
};

EC.prototype.keyFromPrivate = function keyFromPrivate(priv, enc) {
  return KeyPair.fromPrivate(this, priv, enc);
};

EC.prototype.keyFromPublic = function keyFromPublic(pub, enc) {
  return KeyPair.fromPublic(this, pub, enc);
};

EC.prototype.genKeyPair = function genKeyPair(options) {
  if (!options)
    options = {};

  // Instantiate Hmac_DRBG
  var drbg = new HmacDRBG({
    hash: this.hash,
    pers: options.pers,
    persEnc: options.persEnc || 'utf8',
    entropy: options.entropy || rand(this.hash.hmacStrength),
    entropyEnc: options.entropy && options.entropyEnc || 'utf8',
    nonce: this.n.toArray()
  });

  var bytes = this.n.byteLength();
  var ns2 = this.n.sub(new BN(2));
  do {
    var priv = new BN(drbg.generate(bytes));
    if (priv.cmp(ns2) > 0)
      continue;

    priv.iaddn(1);
    return this.keyFromPrivate(priv);
  } while (true);
};

EC.prototype._truncateToN = function truncateToN(msg, truncOnly) {
  var delta = msg.byteLength() * 8 - this.n.bitLength();
  if (delta > 0)
    msg = msg.ushrn(delta);
  if (!truncOnly && msg.cmp(this.n) >= 0)
    return msg.sub(this.n);
  else
    return msg;
};

EC.prototype.sign = function sign(msg, key, enc, options) {
  if (typeof enc === 'object') {
    options = enc;
    enc = null;
  }
  if (!options)
    options = {};

  key = this.keyFromPrivate(key, enc);
  msg = this._truncateToN(new BN(msg, 16));

  // Zero-extend key to provide enough entropy
  var bytes = this.n.byteLength();
  var bkey = key.getPrivate().toArray('be', bytes);

  // Zero-extend nonce to have the same byte size as N
  var nonce = msg.toArray('be', bytes);

  // Instantiate Hmac_DRBG
  var drbg = new HmacDRBG({
    hash: this.hash,
    entropy: bkey,
    nonce: nonce,
    pers: options.pers,
    persEnc: options.persEnc || 'utf8'
  });

  // Number of bytes to generate
  var ns1 = this.n.sub(new BN(1));

  for (var iter = 0; true; iter++) {
    var k = options.k ?
        options.k(iter) :
        new BN(drbg.generate(this.n.byteLength()));
    k = this._truncateToN(k, true);
    if (k.cmpn(1) <= 0 || k.cmp(ns1) >= 0)
      continue;

    var kp = this.g.mul(k);
    if (kp.isInfinity())
      continue;

    var kpX = kp.getX();
    var r = kpX.umod(this.n);
    if (r.cmpn(0) === 0)
      continue;

    var s = k.invm(this.n).mul(r.mul(key.getPrivate()).iadd(msg));
    s = s.umod(this.n);
    if (s.cmpn(0) === 0)
      continue;

    var recoveryParam = (kp.getY().isOdd() ? 1 : 0) |
                        (kpX.cmp(r) !== 0 ? 2 : 0);

    // Use complement of `s`, if it is > `n / 2`
    if (options.canonical && s.cmp(this.nh) > 0) {
      s = this.n.sub(s);
      recoveryParam ^= 1;
    }

    return new Signature({ r: r, s: s, recoveryParam: recoveryParam });
  }
};

EC.prototype.verify = function verify(msg, signature, key, enc) {
  msg = this._truncateToN(new BN(msg, 16));
  key = this.keyFromPublic(key, enc);
  signature = new Signature(signature, 'hex');

  // Perform primitive values validation
  var r = signature.r;
  var s = signature.s;
  if (r.cmpn(1) < 0 || r.cmp(this.n) >= 0)
    return false;
  if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0)
    return false;

  // Validate signature
  var sinv = s.invm(this.n);
  var u1 = sinv.mul(msg).umod(this.n);
  var u2 = sinv.mul(r).umod(this.n);

  if (!this.curve._maxwellTrick) {
    var p = this.g.mulAdd(u1, key.getPublic(), u2);
    if (p.isInfinity())
      return false;

    return p.getX().umod(this.n).cmp(r) === 0;
  }

  // NOTE: Greg Maxwell's trick, inspired by:
  // https://git.io/vad3K

  var p = this.g.jmulAdd(u1, key.getPublic(), u2);
  if (p.isInfinity())
    return false;

  // Compare `p.x` of Jacobian point with `r`,
  // this will do `p.x == r * p.z^2` instead of multiplying `p.x` by the
  // inverse of `p.z^2`
  return p.eqXToP(r);
};

EC.prototype.recoverPubKey = function(msg, signature, j, enc) {
  assert((3 & j) === j, 'The recovery param is more than two bits');
  signature = new Signature(signature, enc);

  var n = this.n;
  var e = new BN(msg);
  var r = signature.r;
  var s = signature.s;

  // A set LSB signifies that the y-coordinate is odd
  var isYOdd = j & 1;
  var isSecondKey = j >> 1;
  if (r.cmp(this.curve.p.umod(this.curve.n)) >= 0 && isSecondKey)
    throw new Error('Unable to find sencond key candinate');

  // 1.1. Let x = r + jn.
  if (isSecondKey)
    r = this.curve.pointFromX(r.add(this.curve.n), isYOdd);
  else
    r = this.curve.pointFromX(r, isYOdd);

  var rInv = signature.r.invm(n);
  var s1 = n.sub(e).mul(rInv).umod(n);
  var s2 = s.mul(rInv).umod(n);

  // 1.6.1 Compute Q = r^-1 (sR -  eG)
  //               Q = r^-1 (sR + -eG)
  return this.g.mulAdd(s1, r, s2);
};

EC.prototype.getKeyRecoveryParam = function(e, signature, Q, enc) {
  signature = new Signature(signature, enc);
  if (signature.recoveryParam !== null)
    return signature.recoveryParam;

  for (var i = 0; i < 4; i++) {
    var Qprime;
    try {
      Qprime = this.recoverPubKey(e, signature, i);
    } catch (e) {
      continue;
    }

    if (Qprime.eq(Q))
      return i;
  }
  throw new Error('Unable to find valid recovery factor');
};


/***/ }),

/***/ "./node_modules/elliptic/lib/elliptic/ec/key.js":
/*!******************************************************!*\
  !*** ./node_modules/elliptic/lib/elliptic/ec/key.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__(/*! bn.js */ "./node_modules/bn.js/lib/bn.js");
var utils = __webpack_require__(/*! ../utils */ "./node_modules/elliptic/lib/elliptic/utils.js");
var assert = utils.assert;

function KeyPair(ec, options) {
  this.ec = ec;
  this.priv = null;
  this.pub = null;

  // KeyPair(ec, { priv: ..., pub: ... })
  if (options.priv)
    this._importPrivate(options.priv, options.privEnc);
  if (options.pub)
    this._importPublic(options.pub, options.pubEnc);
}
module.exports = KeyPair;

KeyPair.fromPublic = function fromPublic(ec, pub, enc) {
  if (pub instanceof KeyPair)
    return pub;

  return new KeyPair(ec, {
    pub: pub,
    pubEnc: enc
  });
};

KeyPair.fromPrivate = function fromPrivate(ec, priv, enc) {
  if (priv instanceof KeyPair)
    return priv;

  return new KeyPair(ec, {
    priv: priv,
    privEnc: enc
  });
};

KeyPair.prototype.validate = function validate() {
  var pub = this.getPublic();

  if (pub.isInfinity())
    return { result: false, reason: 'Invalid public key' };
  if (!pub.validate())
    return { result: false, reason: 'Public key is not a point' };
  if (!pub.mul(this.ec.curve.n).isInfinity())
    return { result: false, reason: 'Public key * N != O' };

  return { result: true, reason: null };
};

KeyPair.prototype.getPublic = function getPublic(compact, enc) {
  // compact is optional argument
  if (typeof compact === 'string') {
    enc = compact;
    compact = null;
  }

  if (!this.pub)
    this.pub = this.ec.g.mul(this.priv);

  if (!enc)
    return this.pub;

  return this.pub.encode(enc, compact);
};

KeyPair.prototype.getPrivate = function getPrivate(enc) {
  if (enc === 'hex')
    return this.priv.toString(16, 2);
  else
    return this.priv;
};

KeyPair.prototype._importPrivate = function _importPrivate(key, enc) {
  this.priv = new BN(key, enc || 16);

  // Ensure that the priv won't be bigger than n, otherwise we may fail
  // in fixed multiplication method
  this.priv = this.priv.umod(this.ec.curve.n);
};

KeyPair.prototype._importPublic = function _importPublic(key, enc) {
  if (key.x || key.y) {
    // Montgomery points only have an `x` coordinate.
    // Weierstrass/Edwards points on the other hand have both `x` and
    // `y` coordinates.
    if (this.ec.curve.type === 'mont') {
      assert(key.x, 'Need x coordinate');
    } else if (this.ec.curve.type === 'short' ||
               this.ec.curve.type === 'edwards') {
      assert(key.x && key.y, 'Need both x and y coordinate');
    }
    this.pub = this.ec.curve.point(key.x, key.y);
    return;
  }
  this.pub = this.ec.curve.decodePoint(key, enc);
};

// ECDH
KeyPair.prototype.derive = function derive(pub) {
  return pub.mul(this.priv).getX();
};

// ECDSA
KeyPair.prototype.sign = function sign(msg, enc, options) {
  return this.ec.sign(msg, this, enc, options);
};

KeyPair.prototype.verify = function verify(msg, signature) {
  return this.ec.verify(msg, signature, this);
};

KeyPair.prototype.inspect = function inspect() {
  return '<Key priv: ' + (this.priv && this.priv.toString(16, 2)) +
         ' pub: ' + (this.pub && this.pub.inspect()) + ' >';
};


/***/ }),

/***/ "./node_modules/elliptic/lib/elliptic/ec/signature.js":
/*!************************************************************!*\
  !*** ./node_modules/elliptic/lib/elliptic/ec/signature.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__(/*! bn.js */ "./node_modules/bn.js/lib/bn.js");

var utils = __webpack_require__(/*! ../utils */ "./node_modules/elliptic/lib/elliptic/utils.js");
var assert = utils.assert;

function Signature(options, enc) {
  if (options instanceof Signature)
    return options;

  if (this._importDER(options, enc))
    return;

  assert(options.r && options.s, 'Signature without r or s');
  this.r = new BN(options.r, 16);
  this.s = new BN(options.s, 16);
  if (options.recoveryParam === undefined)
    this.recoveryParam = null;
  else
    this.recoveryParam = options.recoveryParam;
}
module.exports = Signature;

function Position() {
  this.place = 0;
}

function getLength(buf, p) {
  var initial = buf[p.place++];
  if (!(initial & 0x80)) {
    return initial;
  }
  var octetLen = initial & 0xf;

  // Indefinite length or overflow
  if (octetLen === 0 || octetLen > 4) {
    return false;
  }

  var val = 0;
  for (var i = 0, off = p.place; i < octetLen; i++, off++) {
    val <<= 8;
    val |= buf[off];
    val >>>= 0;
  }

  // Leading zeroes
  if (val <= 0x7f) {
    return false;
  }

  p.place = off;
  return val;
}

function rmPadding(buf) {
  var i = 0;
  var len = buf.length - 1;
  while (!buf[i] && !(buf[i + 1] & 0x80) && i < len) {
    i++;
  }
  if (i === 0) {
    return buf;
  }
  return buf.slice(i);
}

Signature.prototype._importDER = function _importDER(data, enc) {
  data = utils.toArray(data, enc);
  var p = new Position();
  if (data[p.place++] !== 0x30) {
    return false;
  }
  var len = getLength(data, p);
  if (len === false) {
    return false;
  }
  if ((len + p.place) !== data.length) {
    return false;
  }
  if (data[p.place++] !== 0x02) {
    return false;
  }
  var rlen = getLength(data, p);
  if (rlen === false) {
    return false;
  }
  var r = data.slice(p.place, rlen + p.place);
  p.place += rlen;
  if (data[p.place++] !== 0x02) {
    return false;
  }
  var slen = getLength(data, p);
  if (slen === false) {
    return false;
  }
  if (data.length !== slen + p.place) {
    return false;
  }
  var s = data.slice(p.place, slen + p.place);
  if (r[0] === 0) {
    if (r[1] & 0x80) {
      r = r.slice(1);
    } else {
      // Leading zeroes
      return false;
    }
  }
  if (s[0] === 0) {
    if (s[1] & 0x80) {
      s = s.slice(1);
    } else {
      // Leading zeroes
      return false;
    }
  }

  this.r = new BN(r);
  this.s = new BN(s);
  this.recoveryParam = null;

  return true;
};

function constructLength(arr, len) {
  if (len < 0x80) {
    arr.push(len);
    return;
  }
  var octets = 1 + (Math.log(len) / Math.LN2 >>> 3);
  arr.push(octets | 0x80);
  while (--octets) {
    arr.push((len >>> (octets << 3)) & 0xff);
  }
  arr.push(len);
}

Signature.prototype.toDER = function toDER(enc) {
  var r = this.r.toArray();
  var s = this.s.toArray();

  // Pad values
  if (r[0] & 0x80)
    r = [ 0 ].concat(r);
  // Pad values
  if (s[0] & 0x80)
    s = [ 0 ].concat(s);

  r = rmPadding(r);
  s = rmPadding(s);

  while (!s[0] && !(s[1] & 0x80)) {
    s = s.slice(1);
  }
  var arr = [ 0x02 ];
  constructLength(arr, r.length);
  arr = arr.concat(r);
  arr.push(0x02);
  constructLength(arr, s.length);
  var backHalf = arr.concat(s);
  var res = [ 0x30 ];
  constructLength(res, backHalf.length);
  res = res.concat(backHalf);
  return utils.encode(res, enc);
};


/***/ }),

/***/ "./node_modules/elliptic/lib/elliptic/eddsa/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/elliptic/lib/elliptic/eddsa/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hash = __webpack_require__(/*! hash.js */ "./node_modules/hash.js/lib/hash.js");
var curves = __webpack_require__(/*! ../curves */ "./node_modules/elliptic/lib/elliptic/curves.js");
var utils = __webpack_require__(/*! ../utils */ "./node_modules/elliptic/lib/elliptic/utils.js");
var assert = utils.assert;
var parseBytes = utils.parseBytes;
var KeyPair = __webpack_require__(/*! ./key */ "./node_modules/elliptic/lib/elliptic/eddsa/key.js");
var Signature = __webpack_require__(/*! ./signature */ "./node_modules/elliptic/lib/elliptic/eddsa/signature.js");

function EDDSA(curve) {
  assert(curve === 'ed25519', 'only tested with ed25519 so far');

  if (!(this instanceof EDDSA))
    return new EDDSA(curve);

  var curve = curves[curve].curve;
  this.curve = curve;
  this.g = curve.g;
  this.g.precompute(curve.n.bitLength() + 1);

  this.pointClass = curve.point().constructor;
  this.encodingLength = Math.ceil(curve.n.bitLength() / 8);
  this.hash = hash.sha512;
}

module.exports = EDDSA;

/**
* @param {Array|String} message - message bytes
* @param {Array|String|KeyPair} secret - secret bytes or a keypair
* @returns {Signature} - signature
*/
EDDSA.prototype.sign = function sign(message, secret) {
  message = parseBytes(message);
  var key = this.keyFromSecret(secret);
  var r = this.hashInt(key.messagePrefix(), message);
  var R = this.g.mul(r);
  var Rencoded = this.encodePoint(R);
  var s_ = this.hashInt(Rencoded, key.pubBytes(), message)
               .mul(key.priv());
  var S = r.add(s_).umod(this.curve.n);
  return this.makeSignature({ R: R, S: S, Rencoded: Rencoded });
};

/**
* @param {Array} message - message bytes
* @param {Array|String|Signature} sig - sig bytes
* @param {Array|String|Point|KeyPair} pub - public key
* @returns {Boolean} - true if public key matches sig of message
*/
EDDSA.prototype.verify = function verify(message, sig, pub) {
  message = parseBytes(message);
  sig = this.makeSignature(sig);
  var key = this.keyFromPublic(pub);
  var h = this.hashInt(sig.Rencoded(), key.pubBytes(), message);
  var SG = this.g.mul(sig.S());
  var RplusAh = sig.R().add(key.pub().mul(h));
  return RplusAh.eq(SG);
};

EDDSA.prototype.hashInt = function hashInt() {
  var hash = this.hash();
  for (var i = 0; i < arguments.length; i++)
    hash.update(arguments[i]);
  return utils.intFromLE(hash.digest()).umod(this.curve.n);
};

EDDSA.prototype.keyFromPublic = function keyFromPublic(pub) {
  return KeyPair.fromPublic(this, pub);
};

EDDSA.prototype.keyFromSecret = function keyFromSecret(secret) {
  return KeyPair.fromSecret(this, secret);
};

EDDSA.prototype.makeSignature = function makeSignature(sig) {
  if (sig instanceof Signature)
    return sig;
  return new Signature(this, sig);
};

/**
* * https://tools.ietf.org/html/draft-josefsson-eddsa-ed25519-03#section-5.2
*
* EDDSA defines methods for encoding and decoding points and integers. These are
* helper convenience methods, that pass along to utility functions implied
* parameters.
*
*/
EDDSA.prototype.encodePoint = function encodePoint(point) {
  var enc = point.getY().toArray('le', this.encodingLength);
  enc[this.encodingLength - 1] |= point.getX().isOdd() ? 0x80 : 0;
  return enc;
};

EDDSA.prototype.decodePoint = function decodePoint(bytes) {
  bytes = utils.parseBytes(bytes);

  var lastIx = bytes.length - 1;
  var normed = bytes.slice(0, lastIx).concat(bytes[lastIx] & ~0x80);
  var xIsOdd = (bytes[lastIx] & 0x80) !== 0;

  var y = utils.intFromLE(normed);
  return this.curve.pointFromY(y, xIsOdd);
};

EDDSA.prototype.encodeInt = function encodeInt(num) {
  return num.toArray('le', this.encodingLength);
};

EDDSA.prototype.decodeInt = function decodeInt(bytes) {
  return utils.intFromLE(bytes);
};

EDDSA.prototype.isPoint = function isPoint(val) {
  return val instanceof this.pointClass;
};


/***/ }),

/***/ "./node_modules/elliptic/lib/elliptic/eddsa/key.js":
/*!*********************************************************!*\
  !*** ./node_modules/elliptic/lib/elliptic/eddsa/key.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/elliptic/lib/elliptic/utils.js");
var assert = utils.assert;
var parseBytes = utils.parseBytes;
var cachedProperty = utils.cachedProperty;

/**
* @param {EDDSA} eddsa - instance
* @param {Object} params - public/private key parameters
*
* @param {Array<Byte>} [params.secret] - secret seed bytes
* @param {Point} [params.pub] - public key point (aka `A` in eddsa terms)
* @param {Array<Byte>} [params.pub] - public key point encoded as bytes
*
*/
function KeyPair(eddsa, params) {
  this.eddsa = eddsa;
  this._secret = parseBytes(params.secret);
  if (eddsa.isPoint(params.pub))
    this._pub = params.pub;
  else
    this._pubBytes = parseBytes(params.pub);
}

KeyPair.fromPublic = function fromPublic(eddsa, pub) {
  if (pub instanceof KeyPair)
    return pub;
  return new KeyPair(eddsa, { pub: pub });
};

KeyPair.fromSecret = function fromSecret(eddsa, secret) {
  if (secret instanceof KeyPair)
    return secret;
  return new KeyPair(eddsa, { secret: secret });
};

KeyPair.prototype.secret = function secret() {
  return this._secret;
};

cachedProperty(KeyPair, 'pubBytes', function pubBytes() {
  return this.eddsa.encodePoint(this.pub());
});

cachedProperty(KeyPair, 'pub', function pub() {
  if (this._pubBytes)
    return this.eddsa.decodePoint(this._pubBytes);
  return this.eddsa.g.mul(this.priv());
});

cachedProperty(KeyPair, 'privBytes', function privBytes() {
  var eddsa = this.eddsa;
  var hash = this.hash();
  var lastIx = eddsa.encodingLength - 1;

  var a = hash.slice(0, eddsa.encodingLength);
  a[0] &= 248;
  a[lastIx] &= 127;
  a[lastIx] |= 64;

  return a;
});

cachedProperty(KeyPair, 'priv', function priv() {
  return this.eddsa.decodeInt(this.privBytes());
});

cachedProperty(KeyPair, 'hash', function hash() {
  return this.eddsa.hash().update(this.secret()).digest();
});

cachedProperty(KeyPair, 'messagePrefix', function messagePrefix() {
  return this.hash().slice(this.eddsa.encodingLength);
});

KeyPair.prototype.sign = function sign(message) {
  assert(this._secret, 'KeyPair can only verify');
  return this.eddsa.sign(message, this);
};

KeyPair.prototype.verify = function verify(message, sig) {
  return this.eddsa.verify(message, sig, this);
};

KeyPair.prototype.getSecret = function getSecret(enc) {
  assert(this._secret, 'KeyPair is public only');
  return utils.encode(this.secret(), enc);
};

KeyPair.prototype.getPublic = function getPublic(enc) {
  return utils.encode(this.pubBytes(), enc);
};

module.exports = KeyPair;


/***/ }),

/***/ "./node_modules/elliptic/lib/elliptic/eddsa/signature.js":
/*!***************************************************************!*\
  !*** ./node_modules/elliptic/lib/elliptic/eddsa/signature.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__(/*! bn.js */ "./node_modules/bn.js/lib/bn.js");
var utils = __webpack_require__(/*! ../utils */ "./node_modules/elliptic/lib/elliptic/utils.js");
var assert = utils.assert;
var cachedProperty = utils.cachedProperty;
var parseBytes = utils.parseBytes;

/**
* @param {EDDSA} eddsa - eddsa instance
* @param {Array<Bytes>|Object} sig -
* @param {Array<Bytes>|Point} [sig.R] - R point as Point or bytes
* @param {Array<Bytes>|bn} [sig.S] - S scalar as bn or bytes
* @param {Array<Bytes>} [sig.Rencoded] - R point encoded
* @param {Array<Bytes>} [sig.Sencoded] - S scalar encoded
*/
function Signature(eddsa, sig) {
  this.eddsa = eddsa;

  if (typeof sig !== 'object')
    sig = parseBytes(sig);

  if (Array.isArray(sig)) {
    sig = {
      R: sig.slice(0, eddsa.encodingLength),
      S: sig.slice(eddsa.encodingLength)
    };
  }

  assert(sig.R && sig.S, 'Signature without R or S');

  if (eddsa.isPoint(sig.R))
    this._R = sig.R;
  if (sig.S instanceof BN)
    this._S = sig.S;

  this._Rencoded = Array.isArray(sig.R) ? sig.R : sig.Rencoded;
  this._Sencoded = Array.isArray(sig.S) ? sig.S : sig.Sencoded;
}

cachedProperty(Signature, 'S', function S() {
  return this.eddsa.decodeInt(this.Sencoded());
});

cachedProperty(Signature, 'R', function R() {
  return this.eddsa.decodePoint(this.Rencoded());
});

cachedProperty(Signature, 'Rencoded', function Rencoded() {
  return this.eddsa.encodePoint(this.R());
});

cachedProperty(Signature, 'Sencoded', function Sencoded() {
  return this.eddsa.encodeInt(this.S());
});

Signature.prototype.toBytes = function toBytes() {
  return this.Rencoded().concat(this.Sencoded());
};

Signature.prototype.toHex = function toHex() {
  return utils.encode(this.toBytes(), 'hex').toUpperCase();
};

module.exports = Signature;


/***/ }),

/***/ "./node_modules/elliptic/lib/elliptic/precomputed/secp256k1.js":
/*!*********************************************************************!*\
  !*** ./node_modules/elliptic/lib/elliptic/precomputed/secp256k1.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  doubles: {
    step: 4,
    points: [
      [
        'e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a',
        'f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821'
      ],
      [
        '8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508',
        '11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf'
      ],
      [
        '175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739',
        'd3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695'
      ],
      [
        '363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640',
        '4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9'
      ],
      [
        '8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c',
        '4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36'
      ],
      [
        '723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda',
        '96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f'
      ],
      [
        'eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa',
        '5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999'
      ],
      [
        '100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0',
        'cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09'
      ],
      [
        'e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d',
        '9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d'
      ],
      [
        'feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d',
        'e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088'
      ],
      [
        'da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1',
        '9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d'
      ],
      [
        '53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0',
        '5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8'
      ],
      [
        '8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047',
        '10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a'
      ],
      [
        '385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862',
        '283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453'
      ],
      [
        '6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7',
        '7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160'
      ],
      [
        '3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd',
        '56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0'
      ],
      [
        '85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83',
        '7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6'
      ],
      [
        '948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a',
        '53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589'
      ],
      [
        '6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8',
        'bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17'
      ],
      [
        'e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d',
        '4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda'
      ],
      [
        'e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725',
        '7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd'
      ],
      [
        '213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754',
        '4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2'
      ],
      [
        '4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c',
        '17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6'
      ],
      [
        'fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6',
        '6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f'
      ],
      [
        '76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39',
        'c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01'
      ],
      [
        'c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891',
        '893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3'
      ],
      [
        'd895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b',
        'febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f'
      ],
      [
        'b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03',
        '2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7'
      ],
      [
        'e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d',
        'eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78'
      ],
      [
        'a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070',
        '7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1'
      ],
      [
        '90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4',
        'e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150'
      ],
      [
        '8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da',
        '662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82'
      ],
      [
        'e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11',
        '1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc'
      ],
      [
        '8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e',
        'efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b'
      ],
      [
        'e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41',
        '2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51'
      ],
      [
        'b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef',
        '67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45'
      ],
      [
        'd68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8',
        'db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120'
      ],
      [
        '324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d',
        '648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84'
      ],
      [
        '4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96',
        '35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d'
      ],
      [
        '9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd',
        'ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d'
      ],
      [
        '6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5',
        '9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8'
      ],
      [
        'a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266',
        '40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8'
      ],
      [
        '7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71',
        '34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac'
      ],
      [
        '928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac',
        'c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f'
      ],
      [
        '85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751',
        '1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962'
      ],
      [
        'ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e',
        '493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907'
      ],
      [
        '827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241',
        'c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec'
      ],
      [
        'eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3',
        'be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d'
      ],
      [
        'e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f',
        '4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414'
      ],
      [
        '1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19',
        'aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd'
      ],
      [
        '146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be',
        'b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0'
      ],
      [
        'fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9',
        '6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811'
      ],
      [
        'da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2',
        '8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1'
      ],
      [
        'a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13',
        '7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c'
      ],
      [
        '174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c',
        'ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73'
      ],
      [
        '959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba',
        '2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd'
      ],
      [
        'd2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151',
        'e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405'
      ],
      [
        '64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073',
        'd99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589'
      ],
      [
        '8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458',
        '38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e'
      ],
      [
        '13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b',
        '69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27'
      ],
      [
        'bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366',
        'd3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1'
      ],
      [
        '8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa',
        '40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482'
      ],
      [
        '8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0',
        '620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945'
      ],
      [
        'dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787',
        '7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573'
      ],
      [
        'f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e',
        'ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82'
      ]
    ]
  },
  naf: {
    wnd: 7,
    points: [
      [
        'f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9',
        '388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672'
      ],
      [
        '2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4',
        'd8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6'
      ],
      [
        '5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc',
        '6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da'
      ],
      [
        'acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe',
        'cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37'
      ],
      [
        '774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb',
        'd984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b'
      ],
      [
        'f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8',
        'ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81'
      ],
      [
        'd7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e',
        '581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58'
      ],
      [
        'defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34',
        '4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77'
      ],
      [
        '2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c',
        '85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a'
      ],
      [
        '352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5',
        '321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c'
      ],
      [
        '2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f',
        '2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67'
      ],
      [
        '9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714',
        '73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402'
      ],
      [
        'daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729',
        'a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55'
      ],
      [
        'c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db',
        '2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482'
      ],
      [
        '6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4',
        'e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82'
      ],
      [
        '1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5',
        'b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396'
      ],
      [
        '605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479',
        '2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49'
      ],
      [
        '62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d',
        '80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf'
      ],
      [
        '80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f',
        '1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a'
      ],
      [
        '7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb',
        'd0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7'
      ],
      [
        'd528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9',
        'eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933'
      ],
      [
        '49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963',
        '758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a'
      ],
      [
        '77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74',
        '958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6'
      ],
      [
        'f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530',
        'e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37'
      ],
      [
        '463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b',
        '5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e'
      ],
      [
        'f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247',
        'cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6'
      ],
      [
        'caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1',
        'cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476'
      ],
      [
        '2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120',
        '4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40'
      ],
      [
        '7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435',
        '91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61'
      ],
      [
        '754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18',
        '673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683'
      ],
      [
        'e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8',
        '59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5'
      ],
      [
        '186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb',
        '3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b'
      ],
      [
        'df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f',
        '55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417'
      ],
      [
        '5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143',
        'efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868'
      ],
      [
        '290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba',
        'e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a'
      ],
      [
        'af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45',
        'f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6'
      ],
      [
        '766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a',
        '744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996'
      ],
      [
        '59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e',
        'c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e'
      ],
      [
        'f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8',
        'e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d'
      ],
      [
        '7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c',
        '30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2'
      ],
      [
        '948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519',
        'e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e'
      ],
      [
        '7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab',
        '100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437'
      ],
      [
        '3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca',
        'ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311'
      ],
      [
        'd3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf',
        '8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4'
      ],
      [
        '1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610',
        '68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575'
      ],
      [
        '733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4',
        'f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d'
      ],
      [
        '15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c',
        'd56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d'
      ],
      [
        'a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940',
        'edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629'
      ],
      [
        'e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980',
        'a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06'
      ],
      [
        '311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3',
        '66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374'
      ],
      [
        '34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf',
        '9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee'
      ],
      [
        'f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63',
        '4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1'
      ],
      [
        'd7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448',
        'fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b'
      ],
      [
        '32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf',
        '5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661'
      ],
      [
        '7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5',
        '8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6'
      ],
      [
        'ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6',
        '8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e'
      ],
      [
        '16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5',
        '5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d'
      ],
      [
        'eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99',
        'f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc'
      ],
      [
        '78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51',
        'f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4'
      ],
      [
        '494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5',
        '42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c'
      ],
      [
        'a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5',
        '204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b'
      ],
      [
        'c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997',
        '4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913'
      ],
      [
        '841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881',
        '73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154'
      ],
      [
        '5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5',
        '39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865'
      ],
      [
        '36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66',
        'd2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc'
      ],
      [
        '336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726',
        'ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224'
      ],
      [
        '8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede',
        '6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e'
      ],
      [
        '1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94',
        '60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6'
      ],
      [
        '85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31',
        '3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511'
      ],
      [
        '29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51',
        'b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b'
      ],
      [
        'a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252',
        'ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2'
      ],
      [
        '4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5',
        'cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c'
      ],
      [
        'd24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b',
        '6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3'
      ],
      [
        'ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4',
        '322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d'
      ],
      [
        'af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f',
        '6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700'
      ],
      [
        'e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889',
        '2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4'
      ],
      [
        '591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246',
        'b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196'
      ],
      [
        '11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984',
        '998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4'
      ],
      [
        '3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a',
        'b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257'
      ],
      [
        'cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030',
        'bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13'
      ],
      [
        'c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197',
        '6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096'
      ],
      [
        'c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593',
        'c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38'
      ],
      [
        'a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef',
        '21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f'
      ],
      [
        '347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38',
        '60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448'
      ],
      [
        'da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a',
        '49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a'
      ],
      [
        'c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111',
        '5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4'
      ],
      [
        '4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502',
        '7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437'
      ],
      [
        '3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea',
        'be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7'
      ],
      [
        'cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26',
        '8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d'
      ],
      [
        'b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986',
        '39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a'
      ],
      [
        'd4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e',
        '62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54'
      ],
      [
        '48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4',
        '25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77'
      ],
      [
        'dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda',
        'ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517'
      ],
      [
        '6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859',
        'cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10'
      ],
      [
        'e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f',
        'f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125'
      ],
      [
        'eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c',
        '6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e'
      ],
      [
        '13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942',
        'fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1'
      ],
      [
        'ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a',
        '1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2'
      ],
      [
        'b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80',
        '5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423'
      ],
      [
        'ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d',
        '438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8'
      ],
      [
        '8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1',
        'cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758'
      ],
      [
        '52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63',
        'c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375'
      ],
      [
        'e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352',
        '6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d'
      ],
      [
        '7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193',
        'ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec'
      ],
      [
        '5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00',
        '9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0'
      ],
      [
        '32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58',
        'ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c'
      ],
      [
        'e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7',
        'd3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4'
      ],
      [
        '8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8',
        'c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f'
      ],
      [
        '4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e',
        '67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649'
      ],
      [
        '3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d',
        'cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826'
      ],
      [
        '674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b',
        '299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5'
      ],
      [
        'd32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f',
        'f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87'
      ],
      [
        '30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6',
        '462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b'
      ],
      [
        'be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297',
        '62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc'
      ],
      [
        '93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a',
        '7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c'
      ],
      [
        'b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c',
        'ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f'
      ],
      [
        'd5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52',
        '4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a'
      ],
      [
        'd3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb',
        'bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46'
      ],
      [
        '463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065',
        'bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f'
      ],
      [
        '7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917',
        '603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03'
      ],
      [
        '74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9',
        'cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08'
      ],
      [
        '30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3',
        '553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8'
      ],
      [
        '9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57',
        '712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373'
      ],
      [
        '176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66',
        'ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3'
      ],
      [
        '75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8',
        '9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8'
      ],
      [
        '809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721',
        '9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1'
      ],
      [
        '1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180',
        '4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9'
      ]
    ]
  }
};


/***/ }),

/***/ "./node_modules/elliptic/lib/elliptic/utils.js":
/*!*****************************************************!*\
  !*** ./node_modules/elliptic/lib/elliptic/utils.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = exports;
var BN = __webpack_require__(/*! bn.js */ "./node_modules/bn.js/lib/bn.js");
var minAssert = __webpack_require__(/*! minimalistic-assert */ "./node_modules/minimalistic-assert/index.js");
var minUtils = __webpack_require__(/*! minimalistic-crypto-utils */ "./node_modules/minimalistic-crypto-utils/lib/utils.js");

utils.assert = minAssert;
utils.toArray = minUtils.toArray;
utils.zero2 = minUtils.zero2;
utils.toHex = minUtils.toHex;
utils.encode = minUtils.encode;

// Represent num in a w-NAF form
function getNAF(num, w, bits) {
  var naf = new Array(Math.max(num.bitLength(), bits) + 1);
  naf.fill(0);

  var ws = 1 << (w + 1);
  var k = num.clone();

  for (var i = 0; i < naf.length; i++) {
    var z;
    var mod = k.andln(ws - 1);
    if (k.isOdd()) {
      if (mod > (ws >> 1) - 1)
        z = (ws >> 1) - mod;
      else
        z = mod;
      k.isubn(z);
    } else {
      z = 0;
    }

    naf[i] = z;
    k.iushrn(1);
  }

  return naf;
}
utils.getNAF = getNAF;

// Represent k1, k2 in a Joint Sparse Form
function getJSF(k1, k2) {
  var jsf = [
    [],
    []
  ];

  k1 = k1.clone();
  k2 = k2.clone();
  var d1 = 0;
  var d2 = 0;
  while (k1.cmpn(-d1) > 0 || k2.cmpn(-d2) > 0) {

    // First phase
    var m14 = (k1.andln(3) + d1) & 3;
    var m24 = (k2.andln(3) + d2) & 3;
    if (m14 === 3)
      m14 = -1;
    if (m24 === 3)
      m24 = -1;
    var u1;
    if ((m14 & 1) === 0) {
      u1 = 0;
    } else {
      var m8 = (k1.andln(7) + d1) & 7;
      if ((m8 === 3 || m8 === 5) && m24 === 2)
        u1 = -m14;
      else
        u1 = m14;
    }
    jsf[0].push(u1);

    var u2;
    if ((m24 & 1) === 0) {
      u2 = 0;
    } else {
      var m8 = (k2.andln(7) + d2) & 7;
      if ((m8 === 3 || m8 === 5) && m14 === 2)
        u2 = -m24;
      else
        u2 = m24;
    }
    jsf[1].push(u2);

    // Second phase
    if (2 * d1 === u1 + 1)
      d1 = 1 - d1;
    if (2 * d2 === u2 + 1)
      d2 = 1 - d2;
    k1.iushrn(1);
    k2.iushrn(1);
  }

  return jsf;
}
utils.getJSF = getJSF;

function cachedProperty(obj, name, computer) {
  var key = '_' + name;
  obj.prototype[name] = function cachedProperty() {
    return this[key] !== undefined ? this[key] :
           this[key] = computer.call(this);
  };
}
utils.cachedProperty = cachedProperty;

function parseBytes(bytes) {
  return typeof bytes === 'string' ? utils.toArray(bytes, 'hex') :
                                     bytes;
}
utils.parseBytes = parseBytes;

function intFromLE(bytes) {
  return new BN(bytes, 'hex', 'le');
}
utils.intFromLE = intFromLE;



/***/ }),

/***/ "./node_modules/elliptic/package.json":
/*!********************************************!*\
  !*** ./node_modules/elliptic/package.json ***!
  \********************************************/
/*! exports provided: name, version, description, main, files, scripts, repository, keywords, author, license, bugs, homepage, devDependencies, dependencies, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"elliptic\",\"version\":\"6.5.3\",\"description\":\"EC cryptography\",\"main\":\"lib/elliptic.js\",\"files\":[\"lib\"],\"scripts\":{\"jscs\":\"jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js\",\"jshint\":\"jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js\",\"lint\":\"npm run jscs && npm run jshint\",\"unit\":\"istanbul test _mocha --reporter=spec test/index.js\",\"test\":\"npm run lint && npm run unit\",\"version\":\"grunt dist && git add dist/\"},\"repository\":{\"type\":\"git\",\"url\":\"git@github.com:indutny/elliptic\"},\"keywords\":[\"EC\",\"Elliptic\",\"curve\",\"Cryptography\"],\"author\":\"Fedor Indutny <fedor@indutny.com>\",\"license\":\"MIT\",\"bugs\":{\"url\":\"https://github.com/indutny/elliptic/issues\"},\"homepage\":\"https://github.com/indutny/elliptic\",\"devDependencies\":{\"brfs\":\"^1.4.3\",\"coveralls\":\"^3.0.8\",\"grunt\":\"^1.0.4\",\"grunt-browserify\":\"^5.0.0\",\"grunt-cli\":\"^1.2.0\",\"grunt-contrib-connect\":\"^1.0.0\",\"grunt-contrib-copy\":\"^1.0.0\",\"grunt-contrib-uglify\":\"^1.0.1\",\"grunt-mocha-istanbul\":\"^3.0.1\",\"grunt-saucelabs\":\"^9.0.1\",\"istanbul\":\"^0.4.2\",\"jscs\":\"^3.0.7\",\"jshint\":\"^2.10.3\",\"mocha\":\"^6.2.2\"},\"dependencies\":{\"bn.js\":\"^4.4.0\",\"brorand\":\"^1.0.1\",\"hash.js\":\"^1.0.0\",\"hmac-drbg\":\"^1.0.0\",\"inherits\":\"^2.0.1\",\"minimalistic-assert\":\"^1.0.0\",\"minimalistic-crypto-utils\":\"^1.0.0\"}}");

/***/ }),

/***/ "./node_modules/hash.js/lib/hash.js":
/*!******************************************!*\
  !*** ./node_modules/hash.js/lib/hash.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var hash = exports;

hash.utils = __webpack_require__(/*! ./hash/utils */ "./node_modules/hash.js/lib/hash/utils.js");
hash.common = __webpack_require__(/*! ./hash/common */ "./node_modules/hash.js/lib/hash/common.js");
hash.sha = __webpack_require__(/*! ./hash/sha */ "./node_modules/hash.js/lib/hash/sha.js");
hash.ripemd = __webpack_require__(/*! ./hash/ripemd */ "./node_modules/hash.js/lib/hash/ripemd.js");
hash.hmac = __webpack_require__(/*! ./hash/hmac */ "./node_modules/hash.js/lib/hash/hmac.js");

// Proxy hash functions to the main object
hash.sha1 = hash.sha.sha1;
hash.sha256 = hash.sha.sha256;
hash.sha224 = hash.sha.sha224;
hash.sha384 = hash.sha.sha384;
hash.sha512 = hash.sha.sha512;
hash.ripemd160 = hash.ripemd.ripemd160;


/***/ }),

/***/ "./node_modules/hash.js/lib/hash/common.js":
/*!*************************************************!*\
  !*** ./node_modules/hash.js/lib/hash/common.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/hash.js/lib/hash/utils.js");
var assert = __webpack_require__(/*! minimalistic-assert */ "./node_modules/minimalistic-assert/index.js");

function BlockHash() {
  this.pending = null;
  this.pendingTotal = 0;
  this.blockSize = this.constructor.blockSize;
  this.outSize = this.constructor.outSize;
  this.hmacStrength = this.constructor.hmacStrength;
  this.padLength = this.constructor.padLength / 8;
  this.endian = 'big';

  this._delta8 = this.blockSize / 8;
  this._delta32 = this.blockSize / 32;
}
exports.BlockHash = BlockHash;

BlockHash.prototype.update = function update(msg, enc) {
  // Convert message to array, pad it, and join into 32bit blocks
  msg = utils.toArray(msg, enc);
  if (!this.pending)
    this.pending = msg;
  else
    this.pending = this.pending.concat(msg);
  this.pendingTotal += msg.length;

  // Enough data, try updating
  if (this.pending.length >= this._delta8) {
    msg = this.pending;

    // Process pending data in blocks
    var r = msg.length % this._delta8;
    this.pending = msg.slice(msg.length - r, msg.length);
    if (this.pending.length === 0)
      this.pending = null;

    msg = utils.join32(msg, 0, msg.length - r, this.endian);
    for (var i = 0; i < msg.length; i += this._delta32)
      this._update(msg, i, i + this._delta32);
  }

  return this;
};

BlockHash.prototype.digest = function digest(enc) {
  this.update(this._pad());
  assert(this.pending === null);

  return this._digest(enc);
};

BlockHash.prototype._pad = function pad() {
  var len = this.pendingTotal;
  var bytes = this._delta8;
  var k = bytes - ((len + this.padLength) % bytes);
  var res = new Array(k + this.padLength);
  res[0] = 0x80;
  for (var i = 1; i < k; i++)
    res[i] = 0;

  // Append length
  len <<= 3;
  if (this.endian === 'big') {
    for (var t = 8; t < this.padLength; t++)
      res[i++] = 0;

    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = (len >>> 24) & 0xff;
    res[i++] = (len >>> 16) & 0xff;
    res[i++] = (len >>> 8) & 0xff;
    res[i++] = len & 0xff;
  } else {
    res[i++] = len & 0xff;
    res[i++] = (len >>> 8) & 0xff;
    res[i++] = (len >>> 16) & 0xff;
    res[i++] = (len >>> 24) & 0xff;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;

    for (t = 8; t < this.padLength; t++)
      res[i++] = 0;
  }

  return res;
};


/***/ }),

/***/ "./node_modules/hash.js/lib/hash/hmac.js":
/*!***********************************************!*\
  !*** ./node_modules/hash.js/lib/hash/hmac.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/hash.js/lib/hash/utils.js");
var assert = __webpack_require__(/*! minimalistic-assert */ "./node_modules/minimalistic-assert/index.js");

function Hmac(hash, key, enc) {
  if (!(this instanceof Hmac))
    return new Hmac(hash, key, enc);
  this.Hash = hash;
  this.blockSize = hash.blockSize / 8;
  this.outSize = hash.outSize / 8;
  this.inner = null;
  this.outer = null;

  this._init(utils.toArray(key, enc));
}
module.exports = Hmac;

Hmac.prototype._init = function init(key) {
  // Shorten key, if needed
  if (key.length > this.blockSize)
    key = new this.Hash().update(key).digest();
  assert(key.length <= this.blockSize);

  // Add padding to key
  for (var i = key.length; i < this.blockSize; i++)
    key.push(0);

  for (i = 0; i < key.length; i++)
    key[i] ^= 0x36;
  this.inner = new this.Hash().update(key);

  // 0x36 ^ 0x5c = 0x6a
  for (i = 0; i < key.length; i++)
    key[i] ^= 0x6a;
  this.outer = new this.Hash().update(key);
};

Hmac.prototype.update = function update(msg, enc) {
  this.inner.update(msg, enc);
  return this;
};

Hmac.prototype.digest = function digest(enc) {
  this.outer.update(this.inner.digest());
  return this.outer.digest(enc);
};


/***/ }),

/***/ "./node_modules/hash.js/lib/hash/ripemd.js":
/*!*************************************************!*\
  !*** ./node_modules/hash.js/lib/hash/ripemd.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/hash.js/lib/hash/utils.js");
var common = __webpack_require__(/*! ./common */ "./node_modules/hash.js/lib/hash/common.js");

var rotl32 = utils.rotl32;
var sum32 = utils.sum32;
var sum32_3 = utils.sum32_3;
var sum32_4 = utils.sum32_4;
var BlockHash = common.BlockHash;

function RIPEMD160() {
  if (!(this instanceof RIPEMD160))
    return new RIPEMD160();

  BlockHash.call(this);

  this.h = [ 0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0 ];
  this.endian = 'little';
}
utils.inherits(RIPEMD160, BlockHash);
exports.ripemd160 = RIPEMD160;

RIPEMD160.blockSize = 512;
RIPEMD160.outSize = 160;
RIPEMD160.hmacStrength = 192;
RIPEMD160.padLength = 64;

RIPEMD160.prototype._update = function update(msg, start) {
  var A = this.h[0];
  var B = this.h[1];
  var C = this.h[2];
  var D = this.h[3];
  var E = this.h[4];
  var Ah = A;
  var Bh = B;
  var Ch = C;
  var Dh = D;
  var Eh = E;
  for (var j = 0; j < 80; j++) {
    var T = sum32(
      rotl32(
        sum32_4(A, f(j, B, C, D), msg[r[j] + start], K(j)),
        s[j]),
      E);
    A = E;
    E = D;
    D = rotl32(C, 10);
    C = B;
    B = T;
    T = sum32(
      rotl32(
        sum32_4(Ah, f(79 - j, Bh, Ch, Dh), msg[rh[j] + start], Kh(j)),
        sh[j]),
      Eh);
    Ah = Eh;
    Eh = Dh;
    Dh = rotl32(Ch, 10);
    Ch = Bh;
    Bh = T;
  }
  T = sum32_3(this.h[1], C, Dh);
  this.h[1] = sum32_3(this.h[2], D, Eh);
  this.h[2] = sum32_3(this.h[3], E, Ah);
  this.h[3] = sum32_3(this.h[4], A, Bh);
  this.h[4] = sum32_3(this.h[0], B, Ch);
  this.h[0] = T;
};

RIPEMD160.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h, 'little');
  else
    return utils.split32(this.h, 'little');
};

function f(j, x, y, z) {
  if (j <= 15)
    return x ^ y ^ z;
  else if (j <= 31)
    return (x & y) | ((~x) & z);
  else if (j <= 47)
    return (x | (~y)) ^ z;
  else if (j <= 63)
    return (x & z) | (y & (~z));
  else
    return x ^ (y | (~z));
}

function K(j) {
  if (j <= 15)
    return 0x00000000;
  else if (j <= 31)
    return 0x5a827999;
  else if (j <= 47)
    return 0x6ed9eba1;
  else if (j <= 63)
    return 0x8f1bbcdc;
  else
    return 0xa953fd4e;
}

function Kh(j) {
  if (j <= 15)
    return 0x50a28be6;
  else if (j <= 31)
    return 0x5c4dd124;
  else if (j <= 47)
    return 0x6d703ef3;
  else if (j <= 63)
    return 0x7a6d76e9;
  else
    return 0x00000000;
}

var r = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
  3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
  1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
  4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
];

var rh = [
  5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
  6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
  15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
  8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
  12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
];

var s = [
  11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
  7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
  11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
  11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
  9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
];

var sh = [
  8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
  9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
  9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
  15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
  8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
];


/***/ }),

/***/ "./node_modules/hash.js/lib/hash/sha.js":
/*!**********************************************!*\
  !*** ./node_modules/hash.js/lib/hash/sha.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.sha1 = __webpack_require__(/*! ./sha/1 */ "./node_modules/hash.js/lib/hash/sha/1.js");
exports.sha224 = __webpack_require__(/*! ./sha/224 */ "./node_modules/hash.js/lib/hash/sha/224.js");
exports.sha256 = __webpack_require__(/*! ./sha/256 */ "./node_modules/hash.js/lib/hash/sha/256.js");
exports.sha384 = __webpack_require__(/*! ./sha/384 */ "./node_modules/hash.js/lib/hash/sha/384.js");
exports.sha512 = __webpack_require__(/*! ./sha/512 */ "./node_modules/hash.js/lib/hash/sha/512.js");


/***/ }),

/***/ "./node_modules/hash.js/lib/hash/sha/1.js":
/*!************************************************!*\
  !*** ./node_modules/hash.js/lib/hash/sha/1.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/hash.js/lib/hash/utils.js");
var common = __webpack_require__(/*! ../common */ "./node_modules/hash.js/lib/hash/common.js");
var shaCommon = __webpack_require__(/*! ./common */ "./node_modules/hash.js/lib/hash/sha/common.js");

var rotl32 = utils.rotl32;
var sum32 = utils.sum32;
var sum32_5 = utils.sum32_5;
var ft_1 = shaCommon.ft_1;
var BlockHash = common.BlockHash;

var sha1_K = [
  0x5A827999, 0x6ED9EBA1,
  0x8F1BBCDC, 0xCA62C1D6
];

function SHA1() {
  if (!(this instanceof SHA1))
    return new SHA1();

  BlockHash.call(this);
  this.h = [
    0x67452301, 0xefcdab89, 0x98badcfe,
    0x10325476, 0xc3d2e1f0 ];
  this.W = new Array(80);
}

utils.inherits(SHA1, BlockHash);
module.exports = SHA1;

SHA1.blockSize = 512;
SHA1.outSize = 160;
SHA1.hmacStrength = 80;
SHA1.padLength = 64;

SHA1.prototype._update = function _update(msg, start) {
  var W = this.W;

  for (var i = 0; i < 16; i++)
    W[i] = msg[start + i];

  for(; i < W.length; i++)
    W[i] = rotl32(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

  var a = this.h[0];
  var b = this.h[1];
  var c = this.h[2];
  var d = this.h[3];
  var e = this.h[4];

  for (i = 0; i < W.length; i++) {
    var s = ~~(i / 20);
    var t = sum32_5(rotl32(a, 5), ft_1(s, b, c, d), e, W[i], sha1_K[s]);
    e = d;
    d = c;
    c = rotl32(b, 30);
    b = a;
    a = t;
  }

  this.h[0] = sum32(this.h[0], a);
  this.h[1] = sum32(this.h[1], b);
  this.h[2] = sum32(this.h[2], c);
  this.h[3] = sum32(this.h[3], d);
  this.h[4] = sum32(this.h[4], e);
};

SHA1.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h, 'big');
  else
    return utils.split32(this.h, 'big');
};


/***/ }),

/***/ "./node_modules/hash.js/lib/hash/sha/224.js":
/*!**************************************************!*\
  !*** ./node_modules/hash.js/lib/hash/sha/224.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/hash.js/lib/hash/utils.js");
var SHA256 = __webpack_require__(/*! ./256 */ "./node_modules/hash.js/lib/hash/sha/256.js");

function SHA224() {
  if (!(this instanceof SHA224))
    return new SHA224();

  SHA256.call(this);
  this.h = [
    0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
    0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4 ];
}
utils.inherits(SHA224, SHA256);
module.exports = SHA224;

SHA224.blockSize = 512;
SHA224.outSize = 224;
SHA224.hmacStrength = 192;
SHA224.padLength = 64;

SHA224.prototype._digest = function digest(enc) {
  // Just truncate output
  if (enc === 'hex')
    return utils.toHex32(this.h.slice(0, 7), 'big');
  else
    return utils.split32(this.h.slice(0, 7), 'big');
};



/***/ }),

/***/ "./node_modules/hash.js/lib/hash/sha/256.js":
/*!**************************************************!*\
  !*** ./node_modules/hash.js/lib/hash/sha/256.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/hash.js/lib/hash/utils.js");
var common = __webpack_require__(/*! ../common */ "./node_modules/hash.js/lib/hash/common.js");
var shaCommon = __webpack_require__(/*! ./common */ "./node_modules/hash.js/lib/hash/sha/common.js");
var assert = __webpack_require__(/*! minimalistic-assert */ "./node_modules/minimalistic-assert/index.js");

var sum32 = utils.sum32;
var sum32_4 = utils.sum32_4;
var sum32_5 = utils.sum32_5;
var ch32 = shaCommon.ch32;
var maj32 = shaCommon.maj32;
var s0_256 = shaCommon.s0_256;
var s1_256 = shaCommon.s1_256;
var g0_256 = shaCommon.g0_256;
var g1_256 = shaCommon.g1_256;

var BlockHash = common.BlockHash;

var sha256_K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
  0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
  0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
  0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
  0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
  0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
  0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
];

function SHA256() {
  if (!(this instanceof SHA256))
    return new SHA256();

  BlockHash.call(this);
  this.h = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
  ];
  this.k = sha256_K;
  this.W = new Array(64);
}
utils.inherits(SHA256, BlockHash);
module.exports = SHA256;

SHA256.blockSize = 512;
SHA256.outSize = 256;
SHA256.hmacStrength = 192;
SHA256.padLength = 64;

SHA256.prototype._update = function _update(msg, start) {
  var W = this.W;

  for (var i = 0; i < 16; i++)
    W[i] = msg[start + i];
  for (; i < W.length; i++)
    W[i] = sum32_4(g1_256(W[i - 2]), W[i - 7], g0_256(W[i - 15]), W[i - 16]);

  var a = this.h[0];
  var b = this.h[1];
  var c = this.h[2];
  var d = this.h[3];
  var e = this.h[4];
  var f = this.h[5];
  var g = this.h[6];
  var h = this.h[7];

  assert(this.k.length === W.length);
  for (i = 0; i < W.length; i++) {
    var T1 = sum32_5(h, s1_256(e), ch32(e, f, g), this.k[i], W[i]);
    var T2 = sum32(s0_256(a), maj32(a, b, c));
    h = g;
    g = f;
    f = e;
    e = sum32(d, T1);
    d = c;
    c = b;
    b = a;
    a = sum32(T1, T2);
  }

  this.h[0] = sum32(this.h[0], a);
  this.h[1] = sum32(this.h[1], b);
  this.h[2] = sum32(this.h[2], c);
  this.h[3] = sum32(this.h[3], d);
  this.h[4] = sum32(this.h[4], e);
  this.h[5] = sum32(this.h[5], f);
  this.h[6] = sum32(this.h[6], g);
  this.h[7] = sum32(this.h[7], h);
};

SHA256.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h, 'big');
  else
    return utils.split32(this.h, 'big');
};


/***/ }),

/***/ "./node_modules/hash.js/lib/hash/sha/384.js":
/*!**************************************************!*\
  !*** ./node_modules/hash.js/lib/hash/sha/384.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/hash.js/lib/hash/utils.js");

var SHA512 = __webpack_require__(/*! ./512 */ "./node_modules/hash.js/lib/hash/sha/512.js");

function SHA384() {
  if (!(this instanceof SHA384))
    return new SHA384();

  SHA512.call(this);
  this.h = [
    0xcbbb9d5d, 0xc1059ed8,
    0x629a292a, 0x367cd507,
    0x9159015a, 0x3070dd17,
    0x152fecd8, 0xf70e5939,
    0x67332667, 0xffc00b31,
    0x8eb44a87, 0x68581511,
    0xdb0c2e0d, 0x64f98fa7,
    0x47b5481d, 0xbefa4fa4 ];
}
utils.inherits(SHA384, SHA512);
module.exports = SHA384;

SHA384.blockSize = 1024;
SHA384.outSize = 384;
SHA384.hmacStrength = 192;
SHA384.padLength = 128;

SHA384.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h.slice(0, 12), 'big');
  else
    return utils.split32(this.h.slice(0, 12), 'big');
};


/***/ }),

/***/ "./node_modules/hash.js/lib/hash/sha/512.js":
/*!**************************************************!*\
  !*** ./node_modules/hash.js/lib/hash/sha/512.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/hash.js/lib/hash/utils.js");
var common = __webpack_require__(/*! ../common */ "./node_modules/hash.js/lib/hash/common.js");
var assert = __webpack_require__(/*! minimalistic-assert */ "./node_modules/minimalistic-assert/index.js");

var rotr64_hi = utils.rotr64_hi;
var rotr64_lo = utils.rotr64_lo;
var shr64_hi = utils.shr64_hi;
var shr64_lo = utils.shr64_lo;
var sum64 = utils.sum64;
var sum64_hi = utils.sum64_hi;
var sum64_lo = utils.sum64_lo;
var sum64_4_hi = utils.sum64_4_hi;
var sum64_4_lo = utils.sum64_4_lo;
var sum64_5_hi = utils.sum64_5_hi;
var sum64_5_lo = utils.sum64_5_lo;

var BlockHash = common.BlockHash;

var sha512_K = [
  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
];

function SHA512() {
  if (!(this instanceof SHA512))
    return new SHA512();

  BlockHash.call(this);
  this.h = [
    0x6a09e667, 0xf3bcc908,
    0xbb67ae85, 0x84caa73b,
    0x3c6ef372, 0xfe94f82b,
    0xa54ff53a, 0x5f1d36f1,
    0x510e527f, 0xade682d1,
    0x9b05688c, 0x2b3e6c1f,
    0x1f83d9ab, 0xfb41bd6b,
    0x5be0cd19, 0x137e2179 ];
  this.k = sha512_K;
  this.W = new Array(160);
}
utils.inherits(SHA512, BlockHash);
module.exports = SHA512;

SHA512.blockSize = 1024;
SHA512.outSize = 512;
SHA512.hmacStrength = 192;
SHA512.padLength = 128;

SHA512.prototype._prepareBlock = function _prepareBlock(msg, start) {
  var W = this.W;

  // 32 x 32bit words
  for (var i = 0; i < 32; i++)
    W[i] = msg[start + i];
  for (; i < W.length; i += 2) {
    var c0_hi = g1_512_hi(W[i - 4], W[i - 3]);  // i - 2
    var c0_lo = g1_512_lo(W[i - 4], W[i - 3]);
    var c1_hi = W[i - 14];  // i - 7
    var c1_lo = W[i - 13];
    var c2_hi = g0_512_hi(W[i - 30], W[i - 29]);  // i - 15
    var c2_lo = g0_512_lo(W[i - 30], W[i - 29]);
    var c3_hi = W[i - 32];  // i - 16
    var c3_lo = W[i - 31];

    W[i] = sum64_4_hi(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo);
    W[i + 1] = sum64_4_lo(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo);
  }
};

SHA512.prototype._update = function _update(msg, start) {
  this._prepareBlock(msg, start);

  var W = this.W;

  var ah = this.h[0];
  var al = this.h[1];
  var bh = this.h[2];
  var bl = this.h[3];
  var ch = this.h[4];
  var cl = this.h[5];
  var dh = this.h[6];
  var dl = this.h[7];
  var eh = this.h[8];
  var el = this.h[9];
  var fh = this.h[10];
  var fl = this.h[11];
  var gh = this.h[12];
  var gl = this.h[13];
  var hh = this.h[14];
  var hl = this.h[15];

  assert(this.k.length === W.length);
  for (var i = 0; i < W.length; i += 2) {
    var c0_hi = hh;
    var c0_lo = hl;
    var c1_hi = s1_512_hi(eh, el);
    var c1_lo = s1_512_lo(eh, el);
    var c2_hi = ch64_hi(eh, el, fh, fl, gh, gl);
    var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
    var c3_hi = this.k[i];
    var c3_lo = this.k[i + 1];
    var c4_hi = W[i];
    var c4_lo = W[i + 1];

    var T1_hi = sum64_5_hi(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo,
      c4_hi, c4_lo);
    var T1_lo = sum64_5_lo(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo,
      c4_hi, c4_lo);

    c0_hi = s0_512_hi(ah, al);
    c0_lo = s0_512_lo(ah, al);
    c1_hi = maj64_hi(ah, al, bh, bl, ch, cl);
    c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);

    var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
    var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);

    hh = gh;
    hl = gl;

    gh = fh;
    gl = fl;

    fh = eh;
    fl = el;

    eh = sum64_hi(dh, dl, T1_hi, T1_lo);
    el = sum64_lo(dl, dl, T1_hi, T1_lo);

    dh = ch;
    dl = cl;

    ch = bh;
    cl = bl;

    bh = ah;
    bl = al;

    ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
    al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
  }

  sum64(this.h, 0, ah, al);
  sum64(this.h, 2, bh, bl);
  sum64(this.h, 4, ch, cl);
  sum64(this.h, 6, dh, dl);
  sum64(this.h, 8, eh, el);
  sum64(this.h, 10, fh, fl);
  sum64(this.h, 12, gh, gl);
  sum64(this.h, 14, hh, hl);
};

SHA512.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h, 'big');
  else
    return utils.split32(this.h, 'big');
};

function ch64_hi(xh, xl, yh, yl, zh) {
  var r = (xh & yh) ^ ((~xh) & zh);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function ch64_lo(xh, xl, yh, yl, zh, zl) {
  var r = (xl & yl) ^ ((~xl) & zl);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function maj64_hi(xh, xl, yh, yl, zh) {
  var r = (xh & yh) ^ (xh & zh) ^ (yh & zh);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function maj64_lo(xh, xl, yh, yl, zh, zl) {
  var r = (xl & yl) ^ (xl & zl) ^ (yl & zl);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s0_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 28);
  var c1_hi = rotr64_hi(xl, xh, 2);  // 34
  var c2_hi = rotr64_hi(xl, xh, 7);  // 39

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s0_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 28);
  var c1_lo = rotr64_lo(xl, xh, 2);  // 34
  var c2_lo = rotr64_lo(xl, xh, 7);  // 39

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s1_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 14);
  var c1_hi = rotr64_hi(xh, xl, 18);
  var c2_hi = rotr64_hi(xl, xh, 9);  // 41

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s1_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 14);
  var c1_lo = rotr64_lo(xh, xl, 18);
  var c2_lo = rotr64_lo(xl, xh, 9);  // 41

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g0_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 1);
  var c1_hi = rotr64_hi(xh, xl, 8);
  var c2_hi = shr64_hi(xh, xl, 7);

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g0_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 1);
  var c1_lo = rotr64_lo(xh, xl, 8);
  var c2_lo = shr64_lo(xh, xl, 7);

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g1_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 19);
  var c1_hi = rotr64_hi(xl, xh, 29);  // 61
  var c2_hi = shr64_hi(xh, xl, 6);

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g1_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 19);
  var c1_lo = rotr64_lo(xl, xh, 29);  // 61
  var c2_lo = shr64_lo(xh, xl, 6);

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}


/***/ }),

/***/ "./node_modules/hash.js/lib/hash/sha/common.js":
/*!*****************************************************!*\
  !*** ./node_modules/hash.js/lib/hash/sha/common.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/hash.js/lib/hash/utils.js");
var rotr32 = utils.rotr32;

function ft_1(s, x, y, z) {
  if (s === 0)
    return ch32(x, y, z);
  if (s === 1 || s === 3)
    return p32(x, y, z);
  if (s === 2)
    return maj32(x, y, z);
}
exports.ft_1 = ft_1;

function ch32(x, y, z) {
  return (x & y) ^ ((~x) & z);
}
exports.ch32 = ch32;

function maj32(x, y, z) {
  return (x & y) ^ (x & z) ^ (y & z);
}
exports.maj32 = maj32;

function p32(x, y, z) {
  return x ^ y ^ z;
}
exports.p32 = p32;

function s0_256(x) {
  return rotr32(x, 2) ^ rotr32(x, 13) ^ rotr32(x, 22);
}
exports.s0_256 = s0_256;

function s1_256(x) {
  return rotr32(x, 6) ^ rotr32(x, 11) ^ rotr32(x, 25);
}
exports.s1_256 = s1_256;

function g0_256(x) {
  return rotr32(x, 7) ^ rotr32(x, 18) ^ (x >>> 3);
}
exports.g0_256 = g0_256;

function g1_256(x) {
  return rotr32(x, 17) ^ rotr32(x, 19) ^ (x >>> 10);
}
exports.g1_256 = g1_256;


/***/ }),

/***/ "./node_modules/hash.js/lib/hash/utils.js":
/*!************************************************!*\
  !*** ./node_modules/hash.js/lib/hash/utils.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assert = __webpack_require__(/*! minimalistic-assert */ "./node_modules/minimalistic-assert/index.js");
var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");

exports.inherits = inherits;

function isSurrogatePair(msg, i) {
  if ((msg.charCodeAt(i) & 0xFC00) !== 0xD800) {
    return false;
  }
  if (i < 0 || i + 1 >= msg.length) {
    return false;
  }
  return (msg.charCodeAt(i + 1) & 0xFC00) === 0xDC00;
}

function toArray(msg, enc) {
  if (Array.isArray(msg))
    return msg.slice();
  if (!msg)
    return [];
  var res = [];
  if (typeof msg === 'string') {
    if (!enc) {
      // Inspired by stringToUtf8ByteArray() in closure-library by Google
      // https://github.com/google/closure-library/blob/8598d87242af59aac233270742c8984e2b2bdbe0/closure/goog/crypt/crypt.js#L117-L143
      // Apache License 2.0
      // https://github.com/google/closure-library/blob/master/LICENSE
      var p = 0;
      for (var i = 0; i < msg.length; i++) {
        var c = msg.charCodeAt(i);
        if (c < 128) {
          res[p++] = c;
        } else if (c < 2048) {
          res[p++] = (c >> 6) | 192;
          res[p++] = (c & 63) | 128;
        } else if (isSurrogatePair(msg, i)) {
          c = 0x10000 + ((c & 0x03FF) << 10) + (msg.charCodeAt(++i) & 0x03FF);
          res[p++] = (c >> 18) | 240;
          res[p++] = ((c >> 12) & 63) | 128;
          res[p++] = ((c >> 6) & 63) | 128;
          res[p++] = (c & 63) | 128;
        } else {
          res[p++] = (c >> 12) | 224;
          res[p++] = ((c >> 6) & 63) | 128;
          res[p++] = (c & 63) | 128;
        }
      }
    } else if (enc === 'hex') {
      msg = msg.replace(/[^a-z0-9]+/ig, '');
      if (msg.length % 2 !== 0)
        msg = '0' + msg;
      for (i = 0; i < msg.length; i += 2)
        res.push(parseInt(msg[i] + msg[i + 1], 16));
    }
  } else {
    for (i = 0; i < msg.length; i++)
      res[i] = msg[i] | 0;
  }
  return res;
}
exports.toArray = toArray;

function toHex(msg) {
  var res = '';
  for (var i = 0; i < msg.length; i++)
    res += zero2(msg[i].toString(16));
  return res;
}
exports.toHex = toHex;

function htonl(w) {
  var res = (w >>> 24) |
            ((w >>> 8) & 0xff00) |
            ((w << 8) & 0xff0000) |
            ((w & 0xff) << 24);
  return res >>> 0;
}
exports.htonl = htonl;

function toHex32(msg, endian) {
  var res = '';
  for (var i = 0; i < msg.length; i++) {
    var w = msg[i];
    if (endian === 'little')
      w = htonl(w);
    res += zero8(w.toString(16));
  }
  return res;
}
exports.toHex32 = toHex32;

function zero2(word) {
  if (word.length === 1)
    return '0' + word;
  else
    return word;
}
exports.zero2 = zero2;

function zero8(word) {
  if (word.length === 7)
    return '0' + word;
  else if (word.length === 6)
    return '00' + word;
  else if (word.length === 5)
    return '000' + word;
  else if (word.length === 4)
    return '0000' + word;
  else if (word.length === 3)
    return '00000' + word;
  else if (word.length === 2)
    return '000000' + word;
  else if (word.length === 1)
    return '0000000' + word;
  else
    return word;
}
exports.zero8 = zero8;

function join32(msg, start, end, endian) {
  var len = end - start;
  assert(len % 4 === 0);
  var res = new Array(len / 4);
  for (var i = 0, k = start; i < res.length; i++, k += 4) {
    var w;
    if (endian === 'big')
      w = (msg[k] << 24) | (msg[k + 1] << 16) | (msg[k + 2] << 8) | msg[k + 3];
    else
      w = (msg[k + 3] << 24) | (msg[k + 2] << 16) | (msg[k + 1] << 8) | msg[k];
    res[i] = w >>> 0;
  }
  return res;
}
exports.join32 = join32;

function split32(msg, endian) {
  var res = new Array(msg.length * 4);
  for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
    var m = msg[i];
    if (endian === 'big') {
      res[k] = m >>> 24;
      res[k + 1] = (m >>> 16) & 0xff;
      res[k + 2] = (m >>> 8) & 0xff;
      res[k + 3] = m & 0xff;
    } else {
      res[k + 3] = m >>> 24;
      res[k + 2] = (m >>> 16) & 0xff;
      res[k + 1] = (m >>> 8) & 0xff;
      res[k] = m & 0xff;
    }
  }
  return res;
}
exports.split32 = split32;

function rotr32(w, b) {
  return (w >>> b) | (w << (32 - b));
}
exports.rotr32 = rotr32;

function rotl32(w, b) {
  return (w << b) | (w >>> (32 - b));
}
exports.rotl32 = rotl32;

function sum32(a, b) {
  return (a + b) >>> 0;
}
exports.sum32 = sum32;

function sum32_3(a, b, c) {
  return (a + b + c) >>> 0;
}
exports.sum32_3 = sum32_3;

function sum32_4(a, b, c, d) {
  return (a + b + c + d) >>> 0;
}
exports.sum32_4 = sum32_4;

function sum32_5(a, b, c, d, e) {
  return (a + b + c + d + e) >>> 0;
}
exports.sum32_5 = sum32_5;

function sum64(buf, pos, ah, al) {
  var bh = buf[pos];
  var bl = buf[pos + 1];

  var lo = (al + bl) >>> 0;
  var hi = (lo < al ? 1 : 0) + ah + bh;
  buf[pos] = hi >>> 0;
  buf[pos + 1] = lo;
}
exports.sum64 = sum64;

function sum64_hi(ah, al, bh, bl) {
  var lo = (al + bl) >>> 0;
  var hi = (lo < al ? 1 : 0) + ah + bh;
  return hi >>> 0;
}
exports.sum64_hi = sum64_hi;

function sum64_lo(ah, al, bh, bl) {
  var lo = al + bl;
  return lo >>> 0;
}
exports.sum64_lo = sum64_lo;

function sum64_4_hi(ah, al, bh, bl, ch, cl, dh, dl) {
  var carry = 0;
  var lo = al;
  lo = (lo + bl) >>> 0;
  carry += lo < al ? 1 : 0;
  lo = (lo + cl) >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = (lo + dl) >>> 0;
  carry += lo < dl ? 1 : 0;

  var hi = ah + bh + ch + dh + carry;
  return hi >>> 0;
}
exports.sum64_4_hi = sum64_4_hi;

function sum64_4_lo(ah, al, bh, bl, ch, cl, dh, dl) {
  var lo = al + bl + cl + dl;
  return lo >>> 0;
}
exports.sum64_4_lo = sum64_4_lo;

function sum64_5_hi(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
  var carry = 0;
  var lo = al;
  lo = (lo + bl) >>> 0;
  carry += lo < al ? 1 : 0;
  lo = (lo + cl) >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = (lo + dl) >>> 0;
  carry += lo < dl ? 1 : 0;
  lo = (lo + el) >>> 0;
  carry += lo < el ? 1 : 0;

  var hi = ah + bh + ch + dh + eh + carry;
  return hi >>> 0;
}
exports.sum64_5_hi = sum64_5_hi;

function sum64_5_lo(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
  var lo = al + bl + cl + dl + el;

  return lo >>> 0;
}
exports.sum64_5_lo = sum64_5_lo;

function rotr64_hi(ah, al, num) {
  var r = (al << (32 - num)) | (ah >>> num);
  return r >>> 0;
}
exports.rotr64_hi = rotr64_hi;

function rotr64_lo(ah, al, num) {
  var r = (ah << (32 - num)) | (al >>> num);
  return r >>> 0;
}
exports.rotr64_lo = rotr64_lo;

function shr64_hi(ah, al, num) {
  return ah >>> num;
}
exports.shr64_hi = shr64_hi;

function shr64_lo(ah, al, num) {
  var r = (ah << (32 - num)) | (al >>> num);
  return r >>> 0;
}
exports.shr64_lo = shr64_lo;


/***/ }),

/***/ "./node_modules/hmac-drbg/lib/hmac-drbg.js":
/*!*************************************************!*\
  !*** ./node_modules/hmac-drbg/lib/hmac-drbg.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hash = __webpack_require__(/*! hash.js */ "./node_modules/hash.js/lib/hash.js");
var utils = __webpack_require__(/*! minimalistic-crypto-utils */ "./node_modules/minimalistic-crypto-utils/lib/utils.js");
var assert = __webpack_require__(/*! minimalistic-assert */ "./node_modules/minimalistic-assert/index.js");

function HmacDRBG(options) {
  if (!(this instanceof HmacDRBG))
    return new HmacDRBG(options);
  this.hash = options.hash;
  this.predResist = !!options.predResist;

  this.outLen = this.hash.outSize;
  this.minEntropy = options.minEntropy || this.hash.hmacStrength;

  this._reseed = null;
  this.reseedInterval = null;
  this.K = null;
  this.V = null;

  var entropy = utils.toArray(options.entropy, options.entropyEnc || 'hex');
  var nonce = utils.toArray(options.nonce, options.nonceEnc || 'hex');
  var pers = utils.toArray(options.pers, options.persEnc || 'hex');
  assert(entropy.length >= (this.minEntropy / 8),
         'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');
  this._init(entropy, nonce, pers);
}
module.exports = HmacDRBG;

HmacDRBG.prototype._init = function init(entropy, nonce, pers) {
  var seed = entropy.concat(nonce).concat(pers);

  this.K = new Array(this.outLen / 8);
  this.V = new Array(this.outLen / 8);
  for (var i = 0; i < this.V.length; i++) {
    this.K[i] = 0x00;
    this.V[i] = 0x01;
  }

  this._update(seed);
  this._reseed = 1;
  this.reseedInterval = 0x1000000000000;  // 2^48
};

HmacDRBG.prototype._hmac = function hmac() {
  return new hash.hmac(this.hash, this.K);
};

HmacDRBG.prototype._update = function update(seed) {
  var kmac = this._hmac()
                 .update(this.V)
                 .update([ 0x00 ]);
  if (seed)
    kmac = kmac.update(seed);
  this.K = kmac.digest();
  this.V = this._hmac().update(this.V).digest();
  if (!seed)
    return;

  this.K = this._hmac()
               .update(this.V)
               .update([ 0x01 ])
               .update(seed)
               .digest();
  this.V = this._hmac().update(this.V).digest();
};

HmacDRBG.prototype.reseed = function reseed(entropy, entropyEnc, add, addEnc) {
  // Optional entropy enc
  if (typeof entropyEnc !== 'string') {
    addEnc = add;
    add = entropyEnc;
    entropyEnc = null;
  }

  entropy = utils.toArray(entropy, entropyEnc);
  add = utils.toArray(add, addEnc);

  assert(entropy.length >= (this.minEntropy / 8),
         'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');

  this._update(entropy.concat(add || []));
  this._reseed = 1;
};

HmacDRBG.prototype.generate = function generate(len, enc, add, addEnc) {
  if (this._reseed > this.reseedInterval)
    throw new Error('Reseed is required');

  // Optional encoding
  if (typeof enc !== 'string') {
    addEnc = add;
    add = enc;
    enc = null;
  }

  // Optional additional data
  if (add) {
    add = utils.toArray(add, addEnc || 'hex');
    this._update(add);
  }

  var temp = [];
  while (temp.length < len) {
    this.V = this._hmac().update(this.V).digest();
    temp = temp.concat(this.V);
  }

  var res = temp.slice(0, len);
  this._update(add);
  this._reseed++;
  return utils.encode(res, enc);
};


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/inherits/inherits_browser.js":
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/minimalistic-assert/index.js":
/*!***************************************************!*\
  !*** ./node_modules/minimalistic-assert/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = assert;

function assert(val, msg) {
  if (!val)
    throw new Error(msg || 'Assertion failed');
}

assert.equal = function assertEqual(l, r, msg) {
  if (l != r)
    throw new Error(msg || ('Assertion failed: ' + l + ' != ' + r));
};


/***/ }),

/***/ "./node_modules/minimalistic-crypto-utils/lib/utils.js":
/*!*************************************************************!*\
  !*** ./node_modules/minimalistic-crypto-utils/lib/utils.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = exports;

function toArray(msg, enc) {
  if (Array.isArray(msg))
    return msg.slice();
  if (!msg)
    return [];
  var res = [];
  if (typeof msg !== 'string') {
    for (var i = 0; i < msg.length; i++)
      res[i] = msg[i] | 0;
    return res;
  }
  if (enc === 'hex') {
    msg = msg.replace(/[^a-z0-9]+/ig, '');
    if (msg.length % 2 !== 0)
      msg = '0' + msg;
    for (var i = 0; i < msg.length; i += 2)
      res.push(parseInt(msg[i] + msg[i + 1], 16));
  } else {
    for (var i = 0; i < msg.length; i++) {
      var c = msg.charCodeAt(i);
      var hi = c >> 8;
      var lo = c & 0xff;
      if (hi)
        res.push(hi, lo);
      else
        res.push(lo);
    }
  }
  return res;
}
utils.toArray = toArray;

function zero2(word) {
  if (word.length === 1)
    return '0' + word;
  else
    return word;
}
utils.zero2 = zero2;

function toHex(msg) {
  var res = '';
  for (var i = 0; i < msg.length; i++)
    res += zero2(msg[i].toString(16));
  return res;
}
utils.toHex = toHex;

utils.encode = function encode(arr, enc) {
  if (enc === 'hex')
    return toHex(arr);
  else
    return arr;
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/PrivateKey.ts":
/*!***************************!*\
  !*** ./src/PrivateKey.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateKey = void 0;
var eosjs_numeric_1 = __webpack_require__(/*! ./eosjs-numeric */ "./src/eosjs-numeric.ts");
var eosjs_key_conversions_1 = __webpack_require__(/*! ./eosjs-key-conversions */ "./src/eosjs-key-conversions.ts");
/** Represents/stores a private key and provides easy conversion for use with `elliptic` lib */
var PrivateKey = /** @class */ (function () {
    function PrivateKey(key, ec) {
        this.key = key;
        this.ec = ec;
    }
    /** Instantiate private key from an `elliptic`-format private key */
    PrivateKey.fromElliptic = function (privKey, keyType, ec) {
        if (!ec) {
            ec = eosjs_key_conversions_1.constructElliptic(keyType);
        }
        return new PrivateKey({
            type: keyType,
            data: privKey.getPrivate().toArrayLike(Buffer, 'be', 32),
        }, ec);
    };
    /** Instantiate private key from an EOSIO-format private key */
    PrivateKey.fromString = function (keyString, ec) {
        var privateKey = eosjs_numeric_1.stringToPrivateKey(keyString);
        if (!ec) {
            ec = eosjs_key_conversions_1.constructElliptic(privateKey.type);
        }
        return new PrivateKey(privateKey, ec);
    };
    /** Export private key as `elliptic`-format private key */
    PrivateKey.prototype.toElliptic = function () {
        return this.ec.keyFromPrivate(this.key.data);
    };
    PrivateKey.prototype.toLegacyString = function () {
        return eosjs_numeric_1.privateKeyToLegacyString(this.key);
    };
    /** Export private key as EOSIO-format private key */
    PrivateKey.prototype.toString = function () {
        return eosjs_numeric_1.privateKeyToString(this.key);
    };
    /** Get key type from key */
    PrivateKey.prototype.getType = function () {
        return this.key.type;
    };
    /** Retrieve the public key from a private key */
    PrivateKey.prototype.getPublicKey = function () {
        var ellipticPrivateKey = this.toElliptic();
        return eosjs_key_conversions_1.PublicKey.fromElliptic(ellipticPrivateKey, this.getType(), this.ec);
    };
    /** Sign a message or hashed message digest with private key */
    PrivateKey.prototype.sign = function (data, shouldHash, encoding) {
        var _this = this;
        if (shouldHash === void 0) { shouldHash = true; }
        if (encoding === void 0) { encoding = 'utf8'; }
        if (shouldHash) {
            if (typeof data === 'string') {
                data = Buffer.from(data, encoding);
            }
            data = this.ec.hash().update(data).digest();
        }
        var tries = 0;
        var signature;
        var isCanonical = function (sigData) {
            return !(sigData[1] & 0x80) && !(sigData[1] === 0 && !(sigData[2] & 0x80))
                && !(sigData[33] & 0x80) && !(sigData[33] === 0 && !(sigData[34] & 0x80));
        };
        var constructSignature = function (options) {
            var ellipticPrivateKey = _this.toElliptic();
            var ellipticSignature = ellipticPrivateKey.sign(data, options);
            return eosjs_key_conversions_1.Signature.fromElliptic(ellipticSignature, _this.getType(), _this.ec);
        };
        if (this.key.type === eosjs_numeric_1.KeyType.k1) {
            do {
                signature = constructSignature({ canonical: true, pers: [++tries] });
            } while (!isCanonical(signature.toBinary()));
        }
        else {
            signature = constructSignature({ canonical: true });
        }
        return signature;
    };
    /** Validate a private key */
    PrivateKey.prototype.isValid = function () {
        try {
            var ellipticPrivateKey = this.toElliptic();
            var validationObj = ellipticPrivateKey.validate();
            return validationObj.result;
        }
        catch (_a) {
            return false;
        }
    };
    return PrivateKey;
}());
exports.PrivateKey = PrivateKey;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./src/PublicKey.ts":
/*!**************************!*\
  !*** ./src/PublicKey.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicKey = void 0;
var eosjs_numeric_1 = __webpack_require__(/*! ./eosjs-numeric */ "./src/eosjs-numeric.ts");
var eosjs_key_conversions_1 = __webpack_require__(/*! ./eosjs-key-conversions */ "./src/eosjs-key-conversions.ts");
/** Represents/stores a public key and provides easy conversion for use with `elliptic` lib */
var PublicKey = /** @class */ (function () {
    function PublicKey(key, ec) {
        this.key = key;
        this.ec = ec;
    }
    /** Instantiate public key from an EOSIO-format public key */
    PublicKey.fromString = function (publicKeyStr, ec) {
        var key = eosjs_numeric_1.stringToPublicKey(publicKeyStr);
        if (!ec) {
            ec = eosjs_key_conversions_1.constructElliptic(key.type);
        }
        return new PublicKey(key, ec);
    };
    /** Instantiate public key from an `elliptic`-format public key */
    PublicKey.fromElliptic = function (publicKey, keyType, ec) {
        var x = publicKey.getPublic().getX().toArray('be', 32);
        var y = publicKey.getPublic().getY().toArray('be', 32);
        if (!ec) {
            ec = eosjs_key_conversions_1.constructElliptic(keyType);
        }
        return new PublicKey({
            type: keyType,
            data: new Uint8Array([(y[31] & 1) ? 3 : 2].concat(x)),
        }, ec);
    };
    /** Export public key as EOSIO-format public key */
    PublicKey.prototype.toString = function () {
        return eosjs_numeric_1.publicKeyToString(this.key);
    };
    /** Export public key as Legacy EOSIO-format public key */
    PublicKey.prototype.toLegacyString = function () {
        return eosjs_numeric_1.publicKeyToLegacyString(this.key);
    };
    /** Export public key as `elliptic`-format public key */
    PublicKey.prototype.toElliptic = function () {
        return this.ec.keyPair({
            pub: Buffer.from(this.key.data),
        });
    };
    /** Get key type from key */
    PublicKey.prototype.getType = function () {
        return this.key.type;
    };
    /** Validate a public key */
    PublicKey.prototype.isValid = function () {
        try {
            var ellipticPublicKey = this.toElliptic();
            var validationObj = ellipticPublicKey.validate();
            return validationObj.result;
        }
        catch (_a) {
            return false;
        }
    };
    return PublicKey;
}());
exports.PublicKey = PublicKey;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./src/Signature.ts":
/*!**************************!*\
  !*** ./src/Signature.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signature = void 0;
var BN = __webpack_require__(/*! bn.js */ "./node_modules/bn.js/lib/bn.js");
var eosjs_numeric_1 = __webpack_require__(/*! ./eosjs-numeric */ "./src/eosjs-numeric.ts");
var eosjs_key_conversions_1 = __webpack_require__(/*! ./eosjs-key-conversions */ "./src/eosjs-key-conversions.ts");
/** Represents/stores a Signature and provides easy conversion for use with `elliptic` lib */
var Signature = /** @class */ (function () {
    function Signature(signature, ec) {
        this.signature = signature;
        this.ec = ec;
    }
    /** Instantiate Signature from an EOSIO-format Signature */
    Signature.fromString = function (sig, ec) {
        var signature = eosjs_numeric_1.stringToSignature(sig);
        if (!ec) {
            ec = eosjs_key_conversions_1.constructElliptic(signature.type);
        }
        return new Signature(signature, ec);
    };
    /** Instantiate Signature from an `elliptic`-format Signature */
    Signature.fromElliptic = function (ellipticSig, keyType, ec) {
        var r = ellipticSig.r.toArray('be', 32);
        var s = ellipticSig.s.toArray('be', 32);
        var eosioRecoveryParam;
        if (keyType === eosjs_numeric_1.KeyType.k1 || keyType === eosjs_numeric_1.KeyType.r1) {
            eosioRecoveryParam = ellipticSig.recoveryParam + 27;
            if (ellipticSig.recoveryParam <= 3) {
                eosioRecoveryParam += 4;
            }
        }
        else if (keyType === eosjs_numeric_1.KeyType.wa) {
            eosioRecoveryParam = ellipticSig.recoveryParam;
        }
        var sigData = new Uint8Array([eosioRecoveryParam].concat(r, s));
        if (!ec) {
            ec = eosjs_key_conversions_1.constructElliptic(keyType);
        }
        return new Signature({
            type: keyType,
            data: sigData,
        }, ec);
    };
    /** Export Signature as `elliptic`-format Signature
     * NOTE: This isn't an actual elliptic-format Signature, as ec.Signature is not exported by the library.
     * That's also why the return type is `any`.  We're *actually* returning an object with the 3 params
     * not an ec.Signature.
     * Further NOTE: @types/elliptic shows ec.Signature as exported; it is *not*.  Hence the `any`.
     */
    Signature.prototype.toElliptic = function () {
        var lengthOfR = 32;
        var lengthOfS = 32;
        var r = new BN(this.signature.data.slice(1, lengthOfR + 1));
        var s = new BN(this.signature.data.slice(lengthOfR + 1, lengthOfR + lengthOfS + 1));
        var ellipticRecoveryBitField;
        if (this.signature.type === eosjs_numeric_1.KeyType.k1 || this.signature.type === eosjs_numeric_1.KeyType.r1) {
            ellipticRecoveryBitField = this.signature.data[0] - 27;
            if (ellipticRecoveryBitField > 3) {
                ellipticRecoveryBitField -= 4;
            }
        }
        else if (this.signature.type === eosjs_numeric_1.KeyType.wa) {
            ellipticRecoveryBitField = this.signature.data[0];
        }
        var recoveryParam = ellipticRecoveryBitField & 3;
        return { r: r, s: s, recoveryParam: recoveryParam };
    };
    /** Export Signature as EOSIO-format Signature */
    Signature.prototype.toString = function () {
        return eosjs_numeric_1.signatureToString(this.signature);
    };
    /** Export Signature in binary format */
    Signature.prototype.toBinary = function () {
        return this.signature.data;
    };
    /** Get key type from signature */
    Signature.prototype.getType = function () {
        return this.signature.type;
    };
    /** Verify a signature with a message or hashed message digest and public key */
    Signature.prototype.verify = function (data, publicKey, shouldHash, encoding) {
        if (shouldHash === void 0) { shouldHash = true; }
        if (encoding === void 0) { encoding = 'utf8'; }
        if (shouldHash) {
            if (typeof data === 'string') {
                data = Buffer.from(data, encoding);
            }
            data = this.ec.hash().update(data).digest();
        }
        var ellipticSignature = this.toElliptic();
        var ellipticPublicKey = publicKey.toElliptic();
        return this.ec.verify(data, ellipticSignature, ellipticPublicKey, encoding);
    };
    /** Recover a public key from a message or hashed message digest and signature */
    Signature.prototype.recover = function (data, shouldHash, encoding) {
        if (shouldHash === void 0) { shouldHash = true; }
        if (encoding === void 0) { encoding = 'utf8'; }
        if (shouldHash) {
            if (typeof data === 'string') {
                data = Buffer.from(data, encoding);
            }
            data = this.ec.hash().update(data).digest();
        }
        var ellipticSignature = this.toElliptic();
        var recoveredPublicKey = this.ec.recoverPubKey(data, ellipticSignature, ellipticSignature.recoveryParam, encoding);
        var ellipticKPub = this.ec.keyFromPublic(recoveredPublicKey);
        return eosjs_key_conversions_1.PublicKey.fromElliptic(ellipticKPub, this.getType(), this.ec);
    };
    return Signature;
}());
exports.Signature = Signature;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./src/eosjs-jssig.ts":
/*!****************************!*\
  !*** ./src/eosjs-jssig.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
/**
 * @module JS-Sig
 */
// copyright defined in eosjs/LICENSE.txt
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sha256 = exports.generateKeyPair = exports.constructElliptic = exports.JsSignatureProvider = exports.digestFromSerializedData = exports.Signature = exports.PublicKey = exports.PrivateKey = void 0;
var elliptic_1 = __webpack_require__(/*! elliptic */ "./node_modules/elliptic/lib/elliptic.js");
var eosjs_key_conversions_1 = __webpack_require__(/*! ./eosjs-key-conversions */ "./src/eosjs-key-conversions.ts");
Object.defineProperty(exports, "PrivateKey", { enumerable: true, get: function () { return eosjs_key_conversions_1.PrivateKey; } });
Object.defineProperty(exports, "PublicKey", { enumerable: true, get: function () { return eosjs_key_conversions_1.PublicKey; } });
Object.defineProperty(exports, "Signature", { enumerable: true, get: function () { return eosjs_key_conversions_1.Signature; } });
Object.defineProperty(exports, "constructElliptic", { enumerable: true, get: function () { return eosjs_key_conversions_1.constructElliptic; } });
Object.defineProperty(exports, "generateKeyPair", { enumerable: true, get: function () { return eosjs_key_conversions_1.generateKeyPair; } });
Object.defineProperty(exports, "sha256", { enumerable: true, get: function () { return eosjs_key_conversions_1.sha256; } });
var eosjs_numeric_1 = __webpack_require__(/*! ./eosjs-numeric */ "./src/eosjs-numeric.ts");
/** expensive to construct; so we do it once and reuse it */
var defaultEc = new elliptic_1.ec('secp256k1');
/** Construct the digest from transaction details */
var digestFromSerializedData = function (chainId, serializedTransaction, serializedContextFreeData, e) {
    if (e === void 0) { e = defaultEc; }
    var signBuf = Buffer.concat([
        Buffer.from(chainId, 'hex'),
        Buffer.from(serializedTransaction),
        Buffer.from(serializedContextFreeData ?
            new Uint8Array(e.hash().update(serializedContextFreeData).digest()) :
            new Uint8Array(32)),
    ]);
    return e.hash().update(signBuf).digest();
};
exports.digestFromSerializedData = digestFromSerializedData;
/** Signs transactions using in-process private keys */
var JsSignatureProvider = /** @class */ (function () {
    /** @param privateKeys private keys to sign with */
    function JsSignatureProvider(privateKeys) {
        var e_1, _a;
        /** map public to private keys */
        this.keys = new Map();
        /** public keys */
        this.availableKeys = [];
        try {
            for (var privateKeys_1 = __values(privateKeys), privateKeys_1_1 = privateKeys_1.next(); !privateKeys_1_1.done; privateKeys_1_1 = privateKeys_1.next()) {
                var k = privateKeys_1_1.value;
                var priv = eosjs_key_conversions_1.PrivateKey.fromString(k);
                var privElliptic = priv.toElliptic();
                var pubStr = priv.getPublicKey().toString();
                this.keys.set(pubStr, privElliptic);
                this.availableKeys.push(pubStr);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (privateKeys_1_1 && !privateKeys_1_1.done && (_a = privateKeys_1.return)) _a.call(privateKeys_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    JsSignatureProvider.prototype.addPrivateKey = function (privateKey) {
        var priv = eosjs_key_conversions_1.PrivateKey.fromString(privateKey);
        var privElliptic = priv.toElliptic();
        var pubStr = priv.getPublicKey().toString();
        this.keys.set(pubStr, privElliptic);
        if (!this.availableKeys.includes(pubStr)) {
            this.availableKeys.push(pubStr);
            return true;
        }
        return false;
    };
    /** Public keys associated with the private keys that the `SignatureProvider` holds */
    JsSignatureProvider.prototype.getAvailableKeys = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.availableKeys];
            });
        });
    };
    /** Sign a transaction */
    JsSignatureProvider.prototype.sign = function (_a) {
        var chainId = _a.chainId, requiredKeys = _a.requiredKeys, serializedTransaction = _a.serializedTransaction, serializedContextFreeData = _a.serializedContextFreeData;
        return __awaiter(this, void 0, void 0, function () {
            var digest, signatures, requiredKeys_1, requiredKeys_1_1, key, publicKey, ellipticPrivateKey, privateKey, signature;
            var e_2, _b;
            return __generator(this, function (_c) {
                digest = digestFromSerializedData(chainId, serializedTransaction, serializedContextFreeData, defaultEc);
                signatures = [];
                try {
                    for (requiredKeys_1 = __values(requiredKeys), requiredKeys_1_1 = requiredKeys_1.next(); !requiredKeys_1_1.done; requiredKeys_1_1 = requiredKeys_1.next()) {
                        key = requiredKeys_1_1.value;
                        publicKey = eosjs_key_conversions_1.PublicKey.fromString(key);
                        ellipticPrivateKey = this.keys.get(eosjs_numeric_1.convertLegacyPublicKey(key));
                        privateKey = eosjs_key_conversions_1.PrivateKey.fromElliptic(ellipticPrivateKey, publicKey.getType());
                        signature = privateKey.sign(digest, false);
                        signatures.push(signature.toString());
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (requiredKeys_1_1 && !requiredKeys_1_1.done && (_b = requiredKeys_1.return)) _b.call(requiredKeys_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                return [2 /*return*/, { signatures: signatures, serializedTransaction: serializedTransaction, serializedContextFreeData: serializedContextFreeData }];
            });
        });
    };
    return JsSignatureProvider;
}());
exports.JsSignatureProvider = JsSignatureProvider;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./src/eosjs-key-conversions.ts":
/*!**************************************!*\
  !*** ./src/eosjs-key-conversions.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.sha256 = exports.generateKeyPair = exports.constructElliptic = void 0;
var elliptic_1 = __webpack_require__(/*! elliptic */ "./node_modules/elliptic/lib/elliptic.js");
var hash = __webpack_require__(/*! hash.js */ "./node_modules/hash.js/lib/hash.js");
var eosjs_numeric_1 = __webpack_require__(/*! ./eosjs-numeric */ "./src/eosjs-numeric.ts");
var PublicKey_1 = __webpack_require__(/*! ./PublicKey */ "./src/PublicKey.ts");
var PrivateKey_1 = __webpack_require__(/*! ./PrivateKey */ "./src/PrivateKey.ts");
var PrivateKey_2 = __webpack_require__(/*! ./PrivateKey */ "./src/PrivateKey.ts");
Object.defineProperty(exports, "PrivateKey", { enumerable: true, get: function () { return PrivateKey_2.PrivateKey; } });
var PublicKey_2 = __webpack_require__(/*! ./PublicKey */ "./src/PublicKey.ts");
Object.defineProperty(exports, "PublicKey", { enumerable: true, get: function () { return PublicKey_2.PublicKey; } });
var Signature_1 = __webpack_require__(/*! ./Signature */ "./src/Signature.ts");
Object.defineProperty(exports, "Signature", { enumerable: true, get: function () { return Signature_1.Signature; } });
/** Construct the elliptic curve object based on key type */
exports.constructElliptic = function (type) {
    if (type === eosjs_numeric_1.KeyType.k1) {
        return new elliptic_1.ec('secp256k1');
    }
    return new elliptic_1.ec('p256');
};
exports.generateKeyPair = function (type, options) {
    if (options === void 0) { options = {}; }
    if (!options.secureEnv) {
        throw new Error('Key generation is completely INSECURE in production environments in the browser. ' +
            'If you are absolutely certain this does NOT describe your environment, set `secureEnv` in your ' +
            'options to `true`.  If this does describe your environment and you set `secureEnv` to `true`, ' +
            'YOU DO SO AT YOUR OWN RISK AND THE RISK OF YOUR USERS.');
    }
    var ec;
    if (type === eosjs_numeric_1.KeyType.k1) {
        ec = new elliptic_1.ec('secp256k1');
    }
    else {
        ec = new elliptic_1.ec('p256');
    }
    var ellipticKeyPair = ec.genKeyPair(options.ecOptions);
    var publicKey = PublicKey_1.PublicKey.fromElliptic(ellipticKeyPair, type, ec);
    var privateKey = PrivateKey_1.PrivateKey.fromElliptic(ellipticKeyPair, type, ec);
    return { publicKey: publicKey, privateKey: privateKey };
};
exports.sha256 = function (data) {
    return hash.sha256().update(data).digest();
};


/***/ }),

/***/ "./src/eosjs-numeric.ts":
/*!******************************!*\
  !*** ./src/eosjs-numeric.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signatureToString = exports.stringToSignature = exports.privateKeyToString = exports.privateKeyToLegacyString = exports.stringToPrivateKey = exports.convertLegacyPublicKeys = exports.convertLegacyPublicKey = exports.publicKeyToString = exports.publicKeyToLegacyString = exports.stringToPublicKey = exports.signatureDataSize = exports.privateKeyDataSize = exports.publicKeyDataSize = exports.KeyType = exports.base64ToBinary = exports.binaryToBase58 = exports.base58ToBinary = exports.signedBinaryToDecimal = exports.binaryToDecimal = exports.signedDecimalToBinary = exports.decimalToBinary = exports.negate = exports.isNegative = void 0;
/**
 * @module Numeric
 */
var hash_js_1 = __webpack_require__(/*! hash.js */ "./node_modules/hash.js/lib/hash.js");
// copyright defined in eosjs/LICENSE.txt
var ripemd160 = __webpack_require__(/*! ./ripemd */ "./src/ripemd.js").RIPEMD160.hash;
var base58Chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
var base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
var create_base58_map = function () {
    var base58M = Array(256).fill(-1);
    for (var i = 0; i < base58Chars.length; ++i) {
        base58M[base58Chars.charCodeAt(i)] = i;
    }
    return base58M;
};
var base58Map = create_base58_map();
var create_base64_map = function () {
    var base64M = Array(256).fill(-1);
    for (var i = 0; i < base64Chars.length; ++i) {
        base64M[base64Chars.charCodeAt(i)] = i;
    }
    base64M['='.charCodeAt(0)] = 0;
    return base64M;
};
var base64Map = create_base64_map();
/** Is `bignum` a negative number? */
exports.isNegative = function (bignum) {
    return (bignum[bignum.length - 1] & 0x80) !== 0;
};
/** Negate `bignum` */
exports.negate = function (bignum) {
    var carry = 1;
    for (var i = 0; i < bignum.length; ++i) {
        var x = (~bignum[i] & 0xff) + carry;
        bignum[i] = x;
        carry = x >> 8;
    }
};
/**
 * Convert an unsigned decimal number in `s` to a bignum
 *
 * @param size bignum size (bytes)
 */
exports.decimalToBinary = function (size, s) {
    var result = new Uint8Array(size);
    for (var i = 0; i < s.length; ++i) {
        var srcDigit = s.charCodeAt(i);
        if (srcDigit < '0'.charCodeAt(0) || srcDigit > '9'.charCodeAt(0)) {
            throw new Error('invalid number');
        }
        var carry = srcDigit - '0'.charCodeAt(0);
        for (var j = 0; j < size; ++j) {
            var x = result[j] * 10 + carry;
            result[j] = x;
            carry = x >> 8;
        }
        if (carry) {
            throw new Error('number is out of range');
        }
    }
    return result;
};
/**
 * Convert a signed decimal number in `s` to a bignum
 *
 * @param size bignum size (bytes)
 */
exports.signedDecimalToBinary = function (size, s) {
    var negative = s[0] === '-';
    if (negative) {
        s = s.substr(1);
    }
    var result = exports.decimalToBinary(size, s);
    if (negative) {
        exports.negate(result);
        if (!exports.isNegative(result)) {
            throw new Error('number is out of range');
        }
    }
    else if (exports.isNegative(result)) {
        throw new Error('number is out of range');
    }
    return result;
};
/**
 * Convert `bignum` to an unsigned decimal number
 *
 * @param minDigits 0-pad result to this many digits
 */
exports.binaryToDecimal = function (bignum, minDigits) {
    if (minDigits === void 0) { minDigits = 1; }
    var result = Array(minDigits).fill('0'.charCodeAt(0));
    for (var i = bignum.length - 1; i >= 0; --i) {
        var carry = bignum[i];
        for (var j = 0; j < result.length; ++j) {
            var x = ((result[j] - '0'.charCodeAt(0)) << 8) + carry;
            result[j] = '0'.charCodeAt(0) + x % 10;
            carry = (x / 10) | 0;
        }
        while (carry) {
            result.push('0'.charCodeAt(0) + carry % 10);
            carry = (carry / 10) | 0;
        }
    }
    result.reverse();
    return String.fromCharCode.apply(String, __spread(result));
};
/**
 * Convert `bignum` to a signed decimal number
 *
 * @param minDigits 0-pad result to this many digits
 */
exports.signedBinaryToDecimal = function (bignum, minDigits) {
    if (minDigits === void 0) { minDigits = 1; }
    if (exports.isNegative(bignum)) {
        var x = bignum.slice();
        exports.negate(x);
        return '-' + exports.binaryToDecimal(x, minDigits);
    }
    return exports.binaryToDecimal(bignum, minDigits);
};
var base58ToBinaryVarSize = function (s) {
    var e_1, _a;
    var result = [];
    for (var i = 0; i < s.length; ++i) {
        var carry = base58Map[s.charCodeAt(i)];
        if (carry < 0) {
            throw new Error('invalid base-58 value');
        }
        for (var j = 0; j < result.length; ++j) {
            var x = result[j] * 58 + carry;
            result[j] = x & 0xff;
            carry = x >> 8;
        }
        if (carry) {
            result.push(carry);
        }
    }
    try {
        for (var s_1 = __values(s), s_1_1 = s_1.next(); !s_1_1.done; s_1_1 = s_1.next()) {
            var ch = s_1_1.value;
            if (ch === '1') {
                result.push(0);
            }
            else {
                break;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (s_1_1 && !s_1_1.done && (_a = s_1.return)) _a.call(s_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    result.reverse();
    return new Uint8Array(result);
};
/**
 * Convert an unsigned base-58 number in `s` to a bignum
 *
 * @param size bignum size (bytes)
 */
exports.base58ToBinary = function (size, s) {
    if (!size) {
        return base58ToBinaryVarSize(s);
    }
    var result = new Uint8Array(size);
    for (var i = 0; i < s.length; ++i) {
        var carry = base58Map[s.charCodeAt(i)];
        if (carry < 0) {
            throw new Error('invalid base-58 value');
        }
        for (var j = 0; j < size; ++j) {
            var x = result[j] * 58 + carry;
            result[j] = x;
            carry = x >> 8;
        }
        if (carry) {
            throw new Error('base-58 value is out of range');
        }
    }
    result.reverse();
    return result;
};
/**
 * Convert `bignum` to a base-58 number
 *
 * @param minDigits 0-pad result to this many digits
 */
exports.binaryToBase58 = function (bignum, minDigits) {
    var e_2, _a, e_3, _b;
    if (minDigits === void 0) { minDigits = 1; }
    var result = [];
    try {
        for (var bignum_1 = __values(bignum), bignum_1_1 = bignum_1.next(); !bignum_1_1.done; bignum_1_1 = bignum_1.next()) {
            var byte = bignum_1_1.value;
            var carry = byte;
            for (var j = 0; j < result.length; ++j) {
                var x = (base58Map[result[j]] << 8) + carry;
                result[j] = base58Chars.charCodeAt(x % 58);
                carry = (x / 58) | 0;
            }
            while (carry) {
                result.push(base58Chars.charCodeAt(carry % 58));
                carry = (carry / 58) | 0;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (bignum_1_1 && !bignum_1_1.done && (_a = bignum_1.return)) _a.call(bignum_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    try {
        for (var bignum_2 = __values(bignum), bignum_2_1 = bignum_2.next(); !bignum_2_1.done; bignum_2_1 = bignum_2.next()) {
            var byte = bignum_2_1.value;
            if (byte) {
                break;
            }
            else {
                result.push('1'.charCodeAt(0));
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (bignum_2_1 && !bignum_2_1.done && (_b = bignum_2.return)) _b.call(bignum_2);
        }
        finally { if (e_3) throw e_3.error; }
    }
    result.reverse();
    return String.fromCharCode.apply(String, __spread(result));
};
/** Convert an unsigned base-64 number in `s` to a bignum */
exports.base64ToBinary = function (s) {
    var len = s.length;
    if ((len & 3) === 1 && s[len - 1] === '=') {
        len -= 1;
    } // fc appends an extra '='
    if ((len & 3) !== 0) {
        throw new Error('base-64 value is not padded correctly');
    }
    var groups = len >> 2;
    var bytes = groups * 3;
    if (len > 0 && s[len - 1] === '=') {
        if (s[len - 2] === '=') {
            bytes -= 2;
        }
        else {
            bytes -= 1;
        }
    }
    var result = new Uint8Array(bytes);
    for (var group = 0; group < groups; ++group) {
        var digit0 = base64Map[s.charCodeAt(group * 4 + 0)];
        var digit1 = base64Map[s.charCodeAt(group * 4 + 1)];
        var digit2 = base64Map[s.charCodeAt(group * 4 + 2)];
        var digit3 = base64Map[s.charCodeAt(group * 4 + 3)];
        result[group * 3 + 0] = (digit0 << 2) | (digit1 >> 4);
        if (group * 3 + 1 < bytes) {
            result[group * 3 + 1] = ((digit1 & 15) << 4) | (digit2 >> 2);
        }
        if (group * 3 + 2 < bytes) {
            result[group * 3 + 2] = ((digit2 & 3) << 6) | digit3;
        }
    }
    return result;
};
/** Key types this library supports */
var KeyType;
(function (KeyType) {
    KeyType[KeyType["k1"] = 0] = "k1";
    KeyType[KeyType["r1"] = 1] = "r1";
    KeyType[KeyType["wa"] = 2] = "wa";
})(KeyType = exports.KeyType || (exports.KeyType = {}));
/** Public key data size, excluding type field */
exports.publicKeyDataSize = 33;
/** Private key data size, excluding type field */
exports.privateKeyDataSize = 32;
/** Signature data size, excluding type field */
exports.signatureDataSize = 65;
var digestSuffixRipemd160 = function (data, suffix) {
    var d = new Uint8Array(data.length + suffix.length);
    for (var i = 0; i < data.length; ++i) {
        d[i] = data[i];
    }
    for (var i = 0; i < suffix.length; ++i) {
        d[data.length + i] = suffix.charCodeAt(i);
    }
    return ripemd160(d);
};
var stringToKey = function (s, type, size, suffix) {
    var whole = exports.base58ToBinary(size ? size + 4 : 0, s);
    var result = { type: type, data: new Uint8Array(whole.buffer, 0, whole.length - 4) };
    var digest = new Uint8Array(digestSuffixRipemd160(result.data, suffix));
    if (digest[0] !== whole[whole.length - 4] || digest[1] !== whole[whole.length - 3]
        || digest[2] !== whole[whole.length - 2] || digest[3] !== whole[whole.length - 1]) {
        throw new Error('checksum doesn\'t match');
    }
    return result;
};
var keyToString = function (key, suffix, prefix) {
    var digest = new Uint8Array(digestSuffixRipemd160(key.data, suffix));
    var whole = new Uint8Array(key.data.length + 4);
    for (var i = 0; i < key.data.length; ++i) {
        whole[i] = key.data[i];
    }
    for (var i = 0; i < 4; ++i) {
        whole[i + key.data.length] = digest[i];
    }
    return prefix + exports.binaryToBase58(whole);
};
/** Convert key in `s` to binary form */
exports.stringToPublicKey = function (s) {
    if (typeof s !== 'string') {
        throw new Error('expected string containing public key');
    }
    if (s.substr(0, 3) === 'EOS') {
        var whole = exports.base58ToBinary(exports.publicKeyDataSize + 4, s.substr(3));
        var key = { type: KeyType.k1, data: new Uint8Array(exports.publicKeyDataSize) };
        for (var i = 0; i < exports.publicKeyDataSize; ++i) {
            key.data[i] = whole[i];
        }
        var digest = new Uint8Array(ripemd160(key.data));
        if (digest[0] !== whole[exports.publicKeyDataSize] || digest[1] !== whole[34]
            || digest[2] !== whole[35] || digest[3] !== whole[36]) {
            throw new Error('checksum doesn\'t match');
        }
        return key;
    }
    else if (s.substr(0, 7) === 'PUB_K1_') {
        return stringToKey(s.substr(7), KeyType.k1, exports.publicKeyDataSize, 'K1');
    }
    else if (s.substr(0, 7) === 'PUB_R1_') {
        return stringToKey(s.substr(7), KeyType.r1, exports.publicKeyDataSize, 'R1');
    }
    else if (s.substr(0, 7) === 'PUB_WA_') {
        return stringToKey(s.substr(7), KeyType.wa, 0, 'WA');
    }
    else {
        throw new Error('unrecognized public key format');
    }
};
/** Convert public `key` to legacy string (base-58) form */
exports.publicKeyToLegacyString = function (key) {
    if (key.type === KeyType.k1 && key.data.length === exports.publicKeyDataSize) {
        return keyToString(key, '', 'EOS');
    }
    else if (key.type === KeyType.r1 || key.type === KeyType.wa) {
        throw new Error('Key format not supported in legacy conversion');
    }
    else {
        throw new Error('unrecognized public key format');
    }
};
/** Convert `key` to string (base-58) form */
exports.publicKeyToString = function (key) {
    if (key.type === KeyType.k1 && key.data.length === exports.publicKeyDataSize) {
        return keyToString(key, 'K1', 'PUB_K1_');
    }
    else if (key.type === KeyType.r1 && key.data.length === exports.publicKeyDataSize) {
        return keyToString(key, 'R1', 'PUB_R1_');
    }
    else if (key.type === KeyType.wa) {
        return keyToString(key, 'WA', 'PUB_WA_');
    }
    else {
        throw new Error('unrecognized public key format');
    }
};
/** If a key is in the legacy format (`EOS` prefix), then convert it to the new format (`PUB_K1_`).
 * Leaves other formats untouched
 */
exports.convertLegacyPublicKey = function (s) {
    if (s.substr(0, 3) === 'EOS') {
        return exports.publicKeyToString(exports.stringToPublicKey(s));
    }
    return s;
};
/** If a key is in the legacy format (`EOS` prefix), then convert it to the new format (`PUB_K1_`).
 * Leaves other formats untouched
 */
exports.convertLegacyPublicKeys = function (keys) {
    return keys.map(exports.convertLegacyPublicKey);
};
/** Convert key in `s` to binary form */
exports.stringToPrivateKey = function (s) {
    if (typeof s !== 'string') {
        throw new Error('expected string containing private key');
    }
    if (s.substr(0, 7) === 'PVT_R1_') {
        return stringToKey(s.substr(7), KeyType.r1, exports.privateKeyDataSize, 'R1');
    }
    else if (s.substr(0, 7) === 'PVT_K1_') {
        return stringToKey(s.substr(7), KeyType.k1, exports.privateKeyDataSize, 'K1');
    }
    else {
        // todo: Verify checksum: sha256(sha256(key.data)).
        //       Not critical since a bad key will fail to produce a
        //       valid signature anyway.
        var whole = exports.base58ToBinary(exports.privateKeyDataSize + 5, s);
        var key = { type: KeyType.k1, data: new Uint8Array(exports.privateKeyDataSize) };
        if (whole[0] !== 0x80) {
            throw new Error('unrecognized private key type');
        }
        for (var i = 0; i < exports.privateKeyDataSize; ++i) {
            key.data[i] = whole[i + 1];
        }
        return key;
    }
};
/** Convert private `key` to legacy string (base-58) form */
exports.privateKeyToLegacyString = function (key) {
    if (key.type === KeyType.k1 && key.data.length === exports.privateKeyDataSize) {
        var whole_1 = [];
        whole_1.push(128);
        key.data.forEach(function (byte) { return whole_1.push(byte); });
        var digest = new Uint8Array(hash_js_1.sha256().update(hash_js_1.sha256().update(whole_1).digest()).digest());
        var result = new Uint8Array(exports.privateKeyDataSize + 5);
        for (var i = 0; i < whole_1.length; i++) {
            result[i] = whole_1[i];
        }
        for (var i = 0; i < 4; i++) {
            result[i + whole_1.length] = digest[i];
        }
        return exports.binaryToBase58(result);
    }
    else if (key.type === KeyType.r1 || key.type === KeyType.wa) {
        throw new Error('Key format not supported in legacy conversion');
    }
    else {
        throw new Error('unrecognized public key format');
    }
};
/** Convert `key` to string (base-58) form */
exports.privateKeyToString = function (key) {
    if (key.type === KeyType.r1) {
        return keyToString(key, 'R1', 'PVT_R1_');
    }
    else if (key.type === KeyType.k1) {
        return keyToString(key, 'K1', 'PVT_K1_');
    }
    else {
        throw new Error('unrecognized private key format');
    }
};
/** Convert key in `s` to binary form */
exports.stringToSignature = function (s) {
    if (typeof s !== 'string') {
        throw new Error('expected string containing signature');
    }
    if (s.substr(0, 7) === 'SIG_K1_') {
        return stringToKey(s.substr(7), KeyType.k1, exports.signatureDataSize, 'K1');
    }
    else if (s.substr(0, 7) === 'SIG_R1_') {
        return stringToKey(s.substr(7), KeyType.r1, exports.signatureDataSize, 'R1');
    }
    else if (s.substr(0, 7) === 'SIG_WA_') {
        return stringToKey(s.substr(7), KeyType.wa, 0, 'WA');
    }
    else {
        throw new Error('unrecognized signature format');
    }
};
/** Convert `signature` to string (base-58) form */
exports.signatureToString = function (signature) {
    if (signature.type === KeyType.k1) {
        return keyToString(signature, 'K1', 'SIG_K1_');
    }
    else if (signature.type === KeyType.r1) {
        return keyToString(signature, 'R1', 'SIG_R1_');
    }
    else if (signature.type === KeyType.wa) {
        return keyToString(signature, 'WA', 'SIG_WA_');
    }
    else {
        throw new Error('unrecognized signature format');
    }
};


/***/ }),

/***/ "./src/ripemd.js":
/*!***********************!*\
  !*** ./src/ripemd.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://gist.githubusercontent.com/wlzla000/bac83df6d3c51916c4dd0bc947e46947/raw/7ee3462b095ab22580ddaf191f44a590da6fe33b/RIPEMD-160.js

/*
	RIPEMD-160.js

		developed
			by K. (https://github.com/wlzla000)
			on December 27-29, 2017,

		licensed under


		the MIT license

		Copyright (c) 2017 K.

		 Permission is hereby granted, free of charge, to any person
		obtaining a copy of this software and associated documentation
		files (the "Software"), to deal in the Software without
		restriction, including without limitation the rights to use,
		copy, modify, merge, publish, distribute, sublicense, and/or
		sell copies of the Software, and to permit persons to whom the
		Software is furnished to do so, subject to the following
		conditions:

		 The above copyright notice and this permission notice shall be
		included in all copies or substantial portions of the Software.

		 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
		EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
		OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
		NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
		HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
		WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
		FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
		OTHER DEALINGS IN THE SOFTWARE.
*/



class RIPEMD160
{
    constructor()
    {
        // https://webcache.googleusercontent.com/search?q=cache:CnLOgolTHYEJ:https://www.cosic.esat.kuleuven.be/publications/article-317.pdf
        // http://shodhganga.inflibnet.ac.in/bitstream/10603/22978/13/13_appendix.pdf
    }

    static get_n_pad_bytes(message_size /* in bytes, 1 byte is 8 bits. */)
    {
        //  Obtain the number of bytes needed to pad the message.
        // It does not contain the size of the message size information.
        /*
			https://webcache.googleusercontent.com/search?q=cache:CnLOgolTHYEJ:https://www.cosic.esat.kuleuven.be/publications/article-317.pdf

			The Cryptographic Hash Function RIPEMD-160

			written by
				Bart Preneel,
				Hans Dobbertin,
				Antoon Bosselaers
			in
				1997.

			--------------------------------------------------

			§5     Description of RIPEMD-160

			......

			 In order to guarantee that the total input size is a
			multiple of 512 bits, the input is padded in the same
			way as for all the members of the MD4-family: one
			appends a single 1 followed by a string of 0s (the
			number of 0s lies between 0 and 511); the last 64 bits
			of the extended input contain the binary representation
			of the input size in bits, least significant byte first.
		*/
        /*
			https://tools.ietf.org/rfc/rfc1186.txt

			RFC 1186: MD4 Message Digest Algorithm.

			written by
				Ronald Linn Rivest
			in
				October 1990.

			--------------------------------------------------

			§3     MD4 Algorithm Description

			......

			Step 1. Append padding bits

			 The message is "padded" (extended) so that its length
			(in bits) is congruent to 448, modulo 512. That is, the
			message is extended so that it is just 64 bits shy of
			being a multiple of 512 bits long. Padding is always
			performed, even if the length of the message is already
			congruent to 448, modulo 512 (in which case 512 bits of
			padding are added).

			 Padding is performed as follows: a single "1" bit is
			appended to the message, and then enough zero bits are
			appended so that the length in bits of the padded
			message becomes congruent to 448, modulo 512.

			Step 2. Append length

			 A 64-bit representation of b (the length of the message
			before the padding bits were added) is appended to the
			result of the previous step. In the unlikely event that
			b is greater than 2^64, then only the low-order 64 bits
			of b are used. (These bits are appended as two 32-bit
			words and appended low-order word first in accordance
			with the previous conventions.)

			 At this point the resulting message (after padding with
			bits and with b) has a length that is an exact multiple
			of 512 bits. Equivalently, this message has a length
			that is an exact multiple of 16 (32-bit) words. Let
			M[0 ... N-1] denote the words of the resulting message,
			where N is a multiple of 16.
		*/
        // https://crypto.stackexchange.com/a/32407/54568
        /*
			Example case  # 1
				[0 bit: message.]
				[1 bit: 1.]
				[447 bits: 0.]
				[64 bits: message size information.]

			Example case  # 2
				[512-bits: message]
				[1 bit: 1.]
				[447 bits: 0.]
				[64 bits: message size information.]

			Example case  # 3
				[(512 - 64 = 448) bits: message.]
				[1 bit: 1.]
				[511 bits: 0.]
				[64 bits: message size information.]

			Example case  # 4
				[(512 - 65 = 447) bits: message.]
				[1 bit: 1.]
				[0 bit: 0.]
				[64 bits: message size information.]
		*/
        // The number of padding zero bits:
        //      511 - [{(message size in bits) + 64} (mod 512)]
        return 64 - ((message_size + 8) & 0b00111111 /* 63 */);
    }
    static pad(message /* An ArrayBuffer. */)
    {
        const message_size = message.byteLength;
        const n_pad = RIPEMD160.get_n_pad_bytes(message_size);

        //  `Number.MAX_SAFE_INTEGER` is ((2 ** 53) - 1) and
        // bitwise operation in Javascript is done on 32-bits operands.
        const divmod = (dividend, divisor) => [
            Math.floor(dividend / divisor),
            dividend % divisor
        ];
        /*
To shift

   00000000 000????? ???????? ???????? ???????? ???????? ???????? ????????
                                     t o
   00000000 ???????? ???????? ???????? ???????? ???????? ???????? ?????000

--------------------------------------------------------------------------------

Method #1

    00000000 000????? ???????? ????????  ???????? ???????? ???????? ????????
   [00000000 000AAAAA AAAAAAAA AAAAAAAA] (<A> captured)
   [00000000 AAAAAAAA AAAAAAAA AAAAA000] (<A> shifted)
                         (<B> captured) [BBBBBBBB BBBBBBBB BBBBBBBB BBBBBBBB]
                     (<B> shifted) [BBB][BBBBBBBB BBBBBBBB BBBBBBBB BBBBB000]
   [00000000 AAAAAAAA AAAAAAAA AAAAABBB] (<A> & <B_2> merged)
   [00000000 AAAAAAAA AAAAAAAA AAAAABBB][BBBBBBBB BBBBBBBB BBBBBBBB BBBBB000]
    00000000 ???????? ???????? ????????  ???????? ???????? ???????? ?????000

		const uint32_max_plus_1 = 0x100000000; // (2 ** 32)
		const [
			msg_byte_size_most, // Value range [0, (2 ** 21) - 1].
			msg_byte_size_least // Value range [0, (2 ** 32) - 1].
		] = divmod(message_size, uint32_max_plus_1);
		const [
			carry, // Value range [0, 7].
			msg_bit_size_least // Value range [0, (2 ** 32) - 8].
		] = divmod(message_byte_size_least * 8, uint32_max_plus_1);
		const message_bit_size_most = message_byte_size_most * 8
			+ carry; // Value range [0, (2 ** 24) - 1].

--------------------------------------------------------------------------------

Method #2
    00000000 000????? ???????? ????????  ???????? ???????? ???????? ????????
      [00000 000AAAAA AAAAAAAA AAAAAAAA  AAA] (<A> captured)
                         (<B> captured) [000BBBBB BBBBBBBB BBBBBBBB BBBBBBBB]
                          (<B> shifted) [BBBBBBBB BBBBBBBB BBBBBBBB BBBBB000]
   [00000000 AAAAAAAA AAAAAAAA AAAAAAAA][BBBBBBBB BBBBBBBB BBBBBBBB BBBBB000]
    00000000 ???????? ???????? ????????  ???????? ???????? ???????? ?????000

		*/
        const [
            msg_bit_size_most,
            msg_bit_size_least
        ] = divmod(message_size, 536870912 /* (2 ** 29) */)
            .map((x, index) => (index ? (x * 8) : x));

        // `ArrayBuffer.transfer()` is not supported.
        const padded = new Uint8Array(message_size + n_pad + 8);
        padded.set(new Uint8Array(message), 0);
        const data_view = new DataView(padded.buffer);
        data_view.setUint8(message_size, 0b10000000);
        data_view.setUint32(
            message_size + n_pad,
            msg_bit_size_least,
            true // Little-endian
        );
        data_view.setUint32(
            message_size + n_pad + 4,
            msg_bit_size_most,
            true // Little-endian
        );

        return padded.buffer;
    }

    static f(j, x, y, z)
    {
        if(0 <= j && j <= 15)
        { // Exclusive-OR
            return x ^ y ^ z;
        }
        if(16 <= j && j <= 31)
        { // Multiplexing (muxing)
            return (x & y) | (~x & z);
        }
        if(32 <= j && j <= 47)
        {
            return (x | ~y) ^ z;
        }
        if(48 <= j && j <= 63)
        { // Multiplexing (muxing)
            return (x & z) | (y & ~z);
        }
        if(64 <= j && j <= 79)
        {
            return x ^ (y | ~z);
        }
    }
    static K(j)
    {
        if(0 <= j && j <= 15)
        {
            return 0x00000000;
        }
        if(16 <= j && j <= 31)
        {
            // Math.floor((2 ** 30) * Math.SQRT2)
            return 0x5A827999;
        }
        if(32 <= j && j <= 47)
        {
            // Math.floor((2 ** 30) * Math.sqrt(3))
            return 0x6ED9EBA1;
        }
        if(48 <= j && j <= 63)
        {
            // Math.floor((2 ** 30) * Math.sqrt(5))
            return 0x8F1BBCDC;
        }
        if(64 <= j && j <= 79)
        {
            // Math.floor((2 ** 30) * Math.sqrt(7))
            return 0xA953FD4E;
        }
    }
    static KP(j) // K'
    {
        if(0 <= j && j <= 15)
        {
            // Math.floor((2 ** 30) * Math.cbrt(2))
            return 0x50A28BE6;
        }
        if(16 <= j && j <= 31)
        {
            // Math.floor((2 ** 30) * Math.cbrt(3))
            return 0x5C4DD124;
        }
        if(32 <= j && j <= 47)
        {
            // Math.floor((2 ** 30) * Math.cbrt(5))
            return 0x6D703EF3;
        }
        if(48 <= j && j <= 63)
        {
            // Math.floor((2 ** 30) * Math.cbrt(7))
            return 0x7A6D76E9;
        }
        if(64 <= j && j <= 79)
        {
            return 0x00000000;
        }
    }
    static add_modulo32(/* ...... */)
    {
        // 1.  Modulo addition (addition modulo) is associative.
        //    https://proofwiki.org/wiki/Modulo_Addition_is_Associative
 		// 2.  Bitwise operation in Javascript
        //    is done on 32-bits operands
        //    and results in a 32-bits value.
        return Array
            .from(arguments)
            .reduce((a, b) => (a + b), 0) | 0;
    }
    static rol32(value, count)
    { // Cyclic left shift (rotate) on 32-bits value.
        return (value << count) | (value >>> (32 - count));
    }
    static hash(message /* An ArrayBuffer. */)
    {
        // ////////       Padding       //////////

        // The padded message.
        const padded = RIPEMD160.pad(message);

        // ////////     Compression     //////////

        // Message word selectors.
        const r = [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
            7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
            3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
            1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
            4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
        ];
        const rP = [ // r'
            5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
            6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
            15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
            8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
            12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
        ];

        // Amounts for 'rotate left' operation.
        const s = [
            11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
            7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
            11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
            11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
            9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
        ];
        const sP = [ // s'
            8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
            9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
            9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
            15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
            8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
        ];

        // The size, in bytes, of a word.
        const word_size = 4;

        // The size, in bytes, of a 16-words block.
        const block_size = 64;

        // The number of the 16-words blocks.
        const t = padded.byteLength / block_size;

        //  The message after padding consists of t 16-word blocks that
        // are denoted with X_i[j], with 0≤i≤(t − 1) and 0≤j≤15.
        const X = (new Array(t))
            .fill(undefined)
            .map((_, i) => j => (
                new DataView(
                    padded, i * block_size, block_size
                ).getUint32(
                    j * word_size,
                    true // Little-endian
                )
            ));

        //  The result of RIPEMD-160 is contained in five 32-bit words,
        // which form the internal state of the algorithm. The final
        // content of these five 32-bit words is converted to a 160-bit
        // string, again using the little-endian convention.
        const h = [
            0x67452301, // h_0
            0xEFCDAB89, // h_1
            0x98BADCFE, // h_2
            0x10325476, // h_3
            0xC3D2E1F0  // h_4
        ];

        for(let i = 0; i < t; ++i)
        {
            let A = h[0]; let B = h[1]; let C = h[2]; let D = h[3]; let E = h[4];
            let AP = A; let BP = B; let CP = C; let DP = D; let EP = E;
            for(let j = 0; j < 80; ++j)
            {
                // Left rounds
                let T = RIPEMD160.add_modulo32( // eslint-disable-line no-shadow
                    RIPEMD160.rol32(
                        RIPEMD160.add_modulo32(
                            A,
                            RIPEMD160.f(j, B, C, D),
                            X[i](r[j]),
                            RIPEMD160.K(j)
                        ),
                        s[j]
                    ),
                    E
                );
                A = E;
                E = D;
                D = RIPEMD160.rol32(C, 10);
                C = B;
                B = T;

                // Right rounds
                T = RIPEMD160.add_modulo32(
                    RIPEMD160.rol32(
                        RIPEMD160.add_modulo32(
                            AP,
                            RIPEMD160.f(
                                79 - j,
                                BP,
                                CP,
                                DP
                            ),
                            X[i](rP[j]),
                            RIPEMD160.KP(j)
                        ),
                        sP[j]
                    ),
                    EP
                );
                AP = EP;
                EP = DP;
                DP = RIPEMD160.rol32(CP, 10);
                CP = BP;
                BP = T;
            }
            const T = RIPEMD160.add_modulo32(h[1], C, DP);
            h[1] = RIPEMD160.add_modulo32(h[2], D, EP);
            h[2] = RIPEMD160.add_modulo32(h[3], E, AP);
            h[3] = RIPEMD160.add_modulo32(h[4], A, BP);
            h[4] = RIPEMD160.add_modulo32(h[0], B, CP);
            h[0] = T;
        }

        //  The final output string then consists of the concatenatation
        // of h_0, h_1, h_2, h_3, and h_4 after converting each h_i to a
        // 4-byte string using the little-endian convention.
        const result = new ArrayBuffer(20);
        const data_view = new DataView(result);
        h.forEach((h_i, i) => data_view.setUint32(i * 4, h_i, true));
        return result;
    }
}

module.exports = {
    RIPEMD160
};


/***/ }),

/***/ 0:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9ub2RlX21vZHVsZXMvYm4uanMvbGliL2JuLmpzIiwid2VicGFjazovL1tuYW1lXS8uL25vZGVfbW9kdWxlcy9icm9yYW5kL2luZGV4LmpzIiwid2VicGFjazovL1tuYW1lXS8uL25vZGVfbW9kdWxlcy9idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL2VsbGlwdGljL2xpYi9lbGxpcHRpYy5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9ub2RlX21vZHVsZXMvZWxsaXB0aWMvbGliL2VsbGlwdGljL2N1cnZlL2Jhc2UuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL2VsbGlwdGljL2xpYi9lbGxpcHRpYy9jdXJ2ZS9lZHdhcmRzLmpzIiwid2VicGFjazovL1tuYW1lXS8uL25vZGVfbW9kdWxlcy9lbGxpcHRpYy9saWIvZWxsaXB0aWMvY3VydmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL2VsbGlwdGljL2xpYi9lbGxpcHRpYy9jdXJ2ZS9tb250LmpzIiwid2VicGFjazovL1tuYW1lXS8uL25vZGVfbW9kdWxlcy9lbGxpcHRpYy9saWIvZWxsaXB0aWMvY3VydmUvc2hvcnQuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL2VsbGlwdGljL2xpYi9lbGxpcHRpYy9jdXJ2ZXMuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL2VsbGlwdGljL2xpYi9lbGxpcHRpYy9lYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9ub2RlX21vZHVsZXMvZWxsaXB0aWMvbGliL2VsbGlwdGljL2VjL2tleS5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9ub2RlX21vZHVsZXMvZWxsaXB0aWMvbGliL2VsbGlwdGljL2VjL3NpZ25hdHVyZS5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9ub2RlX21vZHVsZXMvZWxsaXB0aWMvbGliL2VsbGlwdGljL2VkZHNhL2luZGV4LmpzIiwid2VicGFjazovL1tuYW1lXS8uL25vZGVfbW9kdWxlcy9lbGxpcHRpYy9saWIvZWxsaXB0aWMvZWRkc2Eva2V5LmpzIiwid2VicGFjazovL1tuYW1lXS8uL25vZGVfbW9kdWxlcy9lbGxpcHRpYy9saWIvZWxsaXB0aWMvZWRkc2Evc2lnbmF0dXJlLmpzIiwid2VicGFjazovL1tuYW1lXS8uL25vZGVfbW9kdWxlcy9lbGxpcHRpYy9saWIvZWxsaXB0aWMvcHJlY29tcHV0ZWQvc2VjcDI1NmsxLmpzIiwid2VicGFjazovL1tuYW1lXS8uL25vZGVfbW9kdWxlcy9lbGxpcHRpYy9saWIvZWxsaXB0aWMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL2hhc2guanMvbGliL2hhc2guanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL2hhc2guanMvbGliL2hhc2gvY29tbW9uLmpzIiwid2VicGFjazovL1tuYW1lXS8uL25vZGVfbW9kdWxlcy9oYXNoLmpzL2xpYi9oYXNoL2htYWMuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL2hhc2guanMvbGliL2hhc2gvcmlwZW1kLmpzIiwid2VicGFjazovL1tuYW1lXS8uL25vZGVfbW9kdWxlcy9oYXNoLmpzL2xpYi9oYXNoL3NoYS5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9ub2RlX21vZHVsZXMvaGFzaC5qcy9saWIvaGFzaC9zaGEvMS5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9ub2RlX21vZHVsZXMvaGFzaC5qcy9saWIvaGFzaC9zaGEvMjI0LmpzIiwid2VicGFjazovL1tuYW1lXS8uL25vZGVfbW9kdWxlcy9oYXNoLmpzL2xpYi9oYXNoL3NoYS8yNTYuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL2hhc2guanMvbGliL2hhc2gvc2hhLzM4NC5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9ub2RlX21vZHVsZXMvaGFzaC5qcy9saWIvaGFzaC9zaGEvNTEyLmpzIiwid2VicGFjazovL1tuYW1lXS8uL25vZGVfbW9kdWxlcy9oYXNoLmpzL2xpYi9oYXNoL3NoYS9jb21tb24uanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL2hhc2guanMvbGliL2hhc2gvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL2htYWMtZHJiZy9saWIvaG1hYy1kcmJnLmpzIiwid2VicGFjazovL1tuYW1lXS8uL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwid2VicGFjazovL1tuYW1lXS8uL25vZGVfbW9kdWxlcy9pbmhlcml0cy9pbmhlcml0c19icm93c2VyLmpzIiwid2VicGFjazovL1tuYW1lXS8uL25vZGVfbW9kdWxlcy9pc2FycmF5L2luZGV4LmpzIiwid2VicGFjazovL1tuYW1lXS8uL25vZGVfbW9kdWxlcy9taW5pbWFsaXN0aWMtYXNzZXJ0L2luZGV4LmpzIiwid2VicGFjazovL1tuYW1lXS8uL25vZGVfbW9kdWxlcy9taW5pbWFsaXN0aWMtY3J5cHRvLXV0aWxzL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovL1tuYW1lXS8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vc3JjL1ByaXZhdGVLZXkudHMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vc3JjL1B1YmxpY0tleS50cyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9zcmMvU2lnbmF0dXJlLnRzIiwid2VicGFjazovL1tuYW1lXS8uL3NyYy9lb3Nqcy1qc3NpZy50cyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9zcmMvZW9zanMta2V5LWNvbnZlcnNpb25zLnRzIiwid2VicGFjazovL1tuYW1lXS8uL3NyYy9lb3Nqcy1udW1lcmljLnRzIiwid2VicGFjazovL1tuYW1lXS8uL3NyYy9yaXBlbWQuanMiLCJ3ZWJwYWNrOi8vW25hbWVdL2J1ZmZlciAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vW25hbWVdL2NyeXB0byAoaWdub3JlZCkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRlk7O0FBRVo7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtDQUFrQyxTQUFTO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQ0FBMEMsVUFBVTtBQUNwRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDdkpBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsbUJBQU8sQ0FBQyxlQUFRO0FBQzdCLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsUUFBUTtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsd0JBQXdCLG1CQUFtQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVM7QUFDaEM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFlBQVk7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUztBQUNoQzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNDQUFzQyxzQkFBc0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLFNBQVM7QUFDaEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixpQkFBaUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiw0QkFBNEI7QUFDN0M7QUFDQTs7QUFFQSxpQkFBaUIsYUFBYTtBQUM5QjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsaUJBQWlCLGFBQWE7QUFDOUI7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFlBQVksZUFBZTtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxxQkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLGdCQUFnQjtBQUNuQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBOztBQUVBO0FBQ0EsWUFBWSxjQUFjO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsNkJBQTZCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsWUFBWSxjQUFjO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGNBQWM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLDZCQUE2QjtBQUN2QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWSxjQUFjO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELFdBQVc7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsb0JBQW9CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxXQUFXO0FBQy9EO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsT0FBTztBQUMxQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsT0FBTztBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG1CQUFtQixPQUFPO0FBQzFCOztBQUVBO0FBQ0E7O0FBRUEscUJBQXFCLE9BQU87QUFDNUI7QUFDQTs7QUFFQSx1QkFBdUIsT0FBTztBQUM5QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLEdBQUc7QUFDMUI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsbUJBQW1CLFdBQVc7QUFDOUI7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLFdBQVc7QUFDOUI7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCOztBQUVBLGtDQUFrQztBQUNsQyxzQ0FBc0M7QUFDdEM7O0FBRUE7QUFDQSxxQkFBcUIsT0FBTztBQUM1QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLE9BQU87QUFDMUI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxtQkFBbUIsT0FBTztBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBOztBQUVBO0FBQ0EsNkJBQTZCLGNBQWM7QUFDM0M7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsaUJBQWlCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtCQUErQixRQUFRO0FBQ3ZDO0FBQ0E7O0FBRUEsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLE9BQU87QUFDNUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLGlCQUFpQixpQkFBaUI7QUFDbEM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkIsbUNBQW1DO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQiwrQ0FBK0M7QUFDbEU7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EscUJBQXFCLHNDQUFzQztBQUMzRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGVBQWUsZ0JBQWdCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUseUJBQXlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixjQUFjO0FBQ25DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsUUFBUTtBQUMvQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQ0FBaUMsUUFBUTtBQUN6QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUNBQWlDLFFBQVE7QUFDekM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsNkJBQTZCLG1DQUFtQztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw2QkFBNkIsbUNBQW1DO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsNkJBQTZCLG1DQUFtQztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDZCQUE2QixtQ0FBbUM7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLDBCQUEwQjtBQUNqRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsZ0NBQWdDO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQ0FBaUMsUUFBUTtBQUN6QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixZQUFZO0FBQy9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0Isa0JBQWtCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixnQkFBZ0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZ0JBQWdCO0FBQ25DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsb0JBQW9CO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZ0JBQWdCO0FBQ25DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCLFFBQVE7QUFDcEM7QUFDQSw2QkFBNkIsUUFBUTtBQUNyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFQUFFLE1BQTZCOzs7Ozs7Ozs7Ozs7O0FDeDJHaEM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLGdCQUFnQjtBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsaUJBQWlCLG1CQUFPLENBQUMsZUFBUTtBQUNqQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVZOztBQUVaLGFBQWEsbUJBQU8sQ0FBQyxvREFBVztBQUNoQyxjQUFjLG1CQUFPLENBQUMsZ0RBQVM7QUFDL0IsY0FBYyxtQkFBTyxDQUFDLGdEQUFTOztBQUUvQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG1EQUFtRDtBQUN4RTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFVBQVU7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSx1Q0FBdUMsU0FBUztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsaUJBQWlCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxFQUFFO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixlQUFlO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0EscUJBQXFCLGVBQWU7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsa0JBQWtCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELE9BQU87QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RCxPQUFPO0FBQzlEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQjtBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQixRQUFRO0FBQzdCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsWUFBWTtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLGdCQUFnQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixnQkFBZ0I7QUFDakM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDNXZEYTs7QUFFYjs7QUFFQSxtQkFBbUIsbUJBQU8sQ0FBQyw2REFBaUI7QUFDNUMsaUJBQWlCLG1CQUFPLENBQUMsdUVBQWtCO0FBQzNDLGdCQUFnQixtQkFBTyxDQUFDLGdEQUFTO0FBQ2pDLGlCQUFpQixtQkFBTyxDQUFDLDZFQUFrQjtBQUMzQyxrQkFBa0IsbUJBQU8sQ0FBQyx5RUFBbUI7O0FBRTdDO0FBQ0EsY0FBYyxtQkFBTyxDQUFDLHVFQUFlO0FBQ3JDLGlCQUFpQixtQkFBTyxDQUFDLDZFQUFrQjs7Ozs7Ozs7Ozs7OztBQ1o5Qjs7QUFFYixTQUFTLG1CQUFPLENBQUMsNkNBQU87QUFDeEIsWUFBWSxtQkFBTyxDQUFDLCtEQUFVO0FBQzlCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLGdCQUFnQjtBQUNqQztBQUNBLHNDQUFzQyxRQUFRO0FBQzlDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEIsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhCQUE4QixRQUFRO0FBQ3RDO0FBQ0EsbUJBQW1CLHdCQUF3QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QixRQUFRO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLFFBQVE7QUFDM0I7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsV0FBVztBQUM1QixtQkFBbUIsVUFBVTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN2WGE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLCtEQUFVO0FBQzlCLFNBQVMsbUJBQU8sQ0FBQyw2Q0FBTztBQUN4QixlQUFlLG1CQUFPLENBQUMsNkRBQVU7QUFDakMsV0FBVyxtQkFBTyxDQUFDLGtFQUFROztBQUUzQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDL2FhOztBQUViOztBQUVBLGFBQWEsbUJBQU8sQ0FBQyxrRUFBUTtBQUM3QixjQUFjLG1CQUFPLENBQUMsb0VBQVM7QUFDL0IsYUFBYSxtQkFBTyxDQUFDLGtFQUFRO0FBQzdCLGdCQUFnQixtQkFBTyxDQUFDLHdFQUFXOzs7Ozs7Ozs7Ozs7O0FDUHRCOztBQUViLFNBQVMsbUJBQU8sQ0FBQyw2Q0FBTztBQUN4QixlQUFlLG1CQUFPLENBQUMsNkRBQVU7QUFDakMsV0FBVyxtQkFBTyxDQUFDLGtFQUFROztBQUUzQixZQUFZLG1CQUFPLENBQUMsK0RBQVU7O0FBRTlCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLHVDQUF1QztBQUN2QyxlQUFlOztBQUVmLHFCQUFxQixpQkFBaUI7QUFDdEM7O0FBRUEsK0JBQStCLFFBQVE7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNqTGE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLCtEQUFVO0FBQzlCLFNBQVMsbUJBQU8sQ0FBQyw2Q0FBTztBQUN4QixlQUFlLG1CQUFPLENBQUMsNkRBQVU7QUFDakMsV0FBVyxtQkFBTyxDQUFDLGtFQUFROztBQUUzQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJEQUEyRDtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSyxlQUFlO0FBQ3BCLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixtQkFBbUI7QUFDcEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLFdBQVc7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN4NkJhOztBQUViOztBQUVBLFdBQVcsbUJBQU8sQ0FBQyxtREFBUztBQUM1QixZQUFZLG1CQUFPLENBQUMsb0VBQVM7QUFDN0IsWUFBWSxtQkFBTyxDQUFDLDhEQUFTOztBQUU3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxRQUFRLG1CQUFPLENBQUMsOEZBQXlCO0FBQ3pDLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUM3TVk7O0FBRWIsU0FBUyxtQkFBTyxDQUFDLDZDQUFPO0FBQ3hCLGVBQWUsbUJBQU8sQ0FBQyw0REFBVztBQUNsQyxZQUFZLG1CQUFPLENBQUMsK0RBQVU7QUFDOUIsYUFBYSxtQkFBTyxDQUFDLGlFQUFXO0FBQ2hDLFdBQVcsbUJBQU8sQ0FBQyxnREFBUztBQUM1Qjs7QUFFQSxjQUFjLG1CQUFPLENBQUMsNkRBQU87QUFDN0IsZ0JBQWdCLG1CQUFPLENBQUMseUVBQWE7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZTs7QUFFZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBLG9CQUFvQixNQUFNO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBCQUEwQiwyQ0FBMkM7QUFDckU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hQYTs7QUFFYixTQUFTLG1CQUFPLENBQUMsNkNBQU87QUFDeEIsWUFBWSxtQkFBTyxDQUFDLCtEQUFVO0FBQzlCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixzQkFBc0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsWUFBWTs7QUFFWixVQUFVO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDckhhOztBQUViLFNBQVMsbUJBQU8sQ0FBQyw2Q0FBTzs7QUFFeEIsWUFBWSxtQkFBTyxDQUFDLCtEQUFVO0FBQzlCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0NBQWdDLGNBQWM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3JLYTs7QUFFYixXQUFXLG1CQUFPLENBQUMsbURBQVM7QUFDNUIsYUFBYSxtQkFBTyxDQUFDLGlFQUFXO0FBQ2hDLFlBQVksbUJBQU8sQ0FBQywrREFBVTtBQUM5QjtBQUNBO0FBQ0EsY0FBYyxtQkFBTyxDQUFDLGdFQUFPO0FBQzdCLGdCQUFnQixtQkFBTyxDQUFDLDRFQUFhOztBQUVyQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxVQUFVLGFBQWE7QUFDdkIsVUFBVSxxQkFBcUI7QUFDL0IsWUFBWSxVQUFVO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLGlDQUFpQztBQUM5RDs7QUFFQTtBQUNBLFVBQVUsTUFBTTtBQUNoQixVQUFVLHVCQUF1QjtBQUNqQyxVQUFVLDJCQUEyQjtBQUNyQyxZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixzQkFBc0I7QUFDdkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNySGE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLCtEQUFVO0FBQzlCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVUsTUFBTTtBQUNoQixVQUFVLE9BQU87QUFDakI7QUFDQSxVQUFVLFlBQVk7QUFDdEIsVUFBVSxNQUFNO0FBQ2hCLFVBQVUsWUFBWTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsV0FBVztBQUN4Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsaUJBQWlCO0FBQzlDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUM5RmE7O0FBRWIsU0FBUyxtQkFBTyxDQUFDLDZDQUFPO0FBQ3hCLFlBQVksbUJBQU8sQ0FBQywrREFBVTtBQUM5QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVLE1BQU07QUFDaEIsVUFBVSxvQkFBb0I7QUFDOUIsVUFBVSxtQkFBbUI7QUFDN0IsVUFBVSxnQkFBZ0I7QUFDMUIsVUFBVSxhQUFhO0FBQ3ZCLFVBQVUsYUFBYTtBQUN2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzN3QmE7O0FBRWI7QUFDQSxTQUFTLG1CQUFPLENBQUMsNkNBQU87QUFDeEIsZ0JBQWdCLG1CQUFPLENBQUMsd0VBQXFCO0FBQzdDLGVBQWUsbUJBQU8sQ0FBQyx3RkFBMkI7O0FBRWxEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JIQTs7QUFFQSxhQUFhLG1CQUFPLENBQUMsOERBQWM7QUFDbkMsY0FBYyxtQkFBTyxDQUFDLGdFQUFlO0FBQ3JDLFdBQVcsbUJBQU8sQ0FBQywwREFBWTtBQUMvQixjQUFjLG1CQUFPLENBQUMsZ0VBQWU7QUFDckMsWUFBWSxtQkFBTyxDQUFDLDREQUFhOztBQUVqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2RhOztBQUViLFlBQVksbUJBQU8sQ0FBQyx5REFBUztBQUM3QixhQUFhLG1CQUFPLENBQUMsd0VBQXFCOztBQUUxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsZ0JBQWdCO0FBQ25DO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsT0FBTztBQUN4Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsb0JBQW9CO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxlQUFlLG9CQUFvQjtBQUNuQztBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMzRmE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHlEQUFTO0FBQzdCLGFBQWEsbUJBQU8sQ0FBQyx3RUFBcUI7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEIsb0JBQW9CO0FBQzlDOztBQUVBLGFBQWEsZ0JBQWdCO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQSxhQUFhLGdCQUFnQjtBQUM3QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM5Q2E7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHlEQUFTO0FBQzdCLGFBQWEsbUJBQU8sQ0FBQywyREFBVTs7QUFFL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDakphOztBQUViLGVBQWUsbUJBQU8sQ0FBQyx5REFBUztBQUNoQyxpQkFBaUIsbUJBQU8sQ0FBQyw2REFBVztBQUNwQyxpQkFBaUIsbUJBQU8sQ0FBQyw2REFBVztBQUNwQyxpQkFBaUIsbUJBQU8sQ0FBQyw2REFBVztBQUNwQyxpQkFBaUIsbUJBQU8sQ0FBQyw2REFBVzs7Ozs7Ozs7Ozs7OztBQ052Qjs7QUFFYixZQUFZLG1CQUFPLENBQUMsMERBQVU7QUFDOUIsYUFBYSxtQkFBTyxDQUFDLDREQUFXO0FBQ2hDLGdCQUFnQixtQkFBTyxDQUFDLCtEQUFVOztBQUVsQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQixRQUFRO0FBQ3pCOztBQUVBLE9BQU8sY0FBYztBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWEsY0FBYztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN6RWE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLDBEQUFVO0FBQzlCLGFBQWEsbUJBQU8sQ0FBQyx5REFBTzs7QUFFNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzVCYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsMERBQVU7QUFDOUIsYUFBYSxtQkFBTyxDQUFDLDREQUFXO0FBQ2hDLGdCQUFnQixtQkFBTyxDQUFDLCtEQUFVO0FBQ2xDLGFBQWEsbUJBQU8sQ0FBQyx3RUFBcUI7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLFFBQVE7QUFDekI7QUFDQSxRQUFRLGNBQWM7QUFDdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWEsY0FBYztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN4R2E7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLDBEQUFVOztBQUU5QixhQUFhLG1CQUFPLENBQUMseURBQU87O0FBRTVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsQ2E7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLDBEQUFVO0FBQzlCLGFBQWEsbUJBQU8sQ0FBQyw0REFBVztBQUNoQyxhQUFhLG1CQUFPLENBQUMsd0VBQXFCOztBQUUxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsUUFBUTtBQUN6QjtBQUNBLFFBQVEsY0FBYztBQUN0Qiw4Q0FBOEM7QUFDOUM7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQSwwQkFBMEI7QUFDMUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsY0FBYztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLG1DQUFtQzs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLG1DQUFtQzs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7O0FBRW5DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DOztBQUVuQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9DQUFvQztBQUNwQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDelVhOztBQUViLFlBQVksbUJBQU8sQ0FBQywwREFBVTtBQUM5Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoRGE7O0FBRWIsYUFBYSxtQkFBTyxDQUFDLHdFQUFxQjtBQUMxQyxlQUFlLG1CQUFPLENBQUMsNkRBQVU7O0FBRWpDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixnQkFBZ0I7QUFDakM7QUFDQTtBQUNBLEdBQUc7QUFDSCxlQUFlLGdCQUFnQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixnQkFBZ0I7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixnQkFBZ0I7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QixnQkFBZ0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNyUmE7O0FBRWIsV0FBVyxtQkFBTyxDQUFDLG1EQUFTO0FBQzVCLFlBQVksbUJBQU8sQ0FBQyx3RkFBMkI7QUFDL0MsYUFBYSxtQkFBTyxDQUFDLHdFQUFxQjs7QUFFMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLG1CQUFtQjtBQUNwQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QztBQUN4Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNoSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsV0FBVzs7QUFFbkI7QUFDQTtBQUNBO0FBQ0EsUUFBUSxXQUFXOztBQUVuQjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSxXQUFXOztBQUVuQjtBQUNBO0FBQ0EsUUFBUSxVQUFVOztBQUVsQjtBQUNBOzs7Ozs7Ozs7Ozs7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDMUJBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNKQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1ZhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGdCQUFnQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixnQkFBZ0I7QUFDbkM7QUFDQSxHQUFHO0FBQ0gsbUJBQW1CLGdCQUFnQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixnQkFBZ0I7QUFDakM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6REE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDOzs7Ozs7Ozs7Ozs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDckJBLDhDQUFhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrQ0FBaUI7QUFDL0MsOEJBQThCLG1CQUFPLENBQUMsK0RBQXlCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxtQkFBbUI7QUFDdkQsa0NBQWtDLG1CQUFtQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxtQ0FBbUM7QUFDbkYsYUFBYTtBQUNiO0FBQ0E7QUFDQSw0Q0FBNEMsa0JBQWtCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7Ozs7Ozs7QUM5RkEsOENBQWE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBLHNCQUFzQixtQkFBTyxDQUFDLCtDQUFpQjtBQUMvQyw4QkFBOEIsbUJBQU8sQ0FBQywrREFBeUI7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7O0FDOURBLDhDQUFhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQSxTQUFTLG1CQUFPLENBQUMsNkNBQU87QUFDeEIsc0JBQXNCLG1CQUFPLENBQUMsK0NBQWlCO0FBQy9DLDhCQUE4QixtQkFBTyxDQUFDLCtEQUF5QjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRUFBb0U7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsbUJBQW1CO0FBQ3ZELGtDQUFrQyxtQkFBbUI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLG1CQUFtQjtBQUN2RCxrQ0FBa0MsbUJBQW1CO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7Ozs7Ozs7QUM5R0EsOENBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLCtEQUErRCxnQkFBZ0IsRUFBRSxFQUFFO0FBQzlHO0FBQ0EsbUNBQW1DLE1BQU0sNkJBQTZCLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDakcsa0NBQWtDLE1BQU0saUNBQWlDLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDcEcsK0JBQStCLHFGQUFxRjtBQUNwSDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBYSw2QkFBNkIsMEJBQTBCLGFBQWEsRUFBRSxxQkFBcUI7QUFDeEcsZ0JBQWdCLHFEQUFxRCxvRUFBb0UsYUFBYSxFQUFFO0FBQ3hKLHNCQUFzQixzQkFBc0IscUJBQXFCLEdBQUc7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDLGtDQUFrQyxTQUFTO0FBQzNDLGtDQUFrQyxXQUFXLFVBQVU7QUFDdkQseUNBQXlDLGNBQWM7QUFDdkQ7QUFDQSw2R0FBNkcsT0FBTyxVQUFVO0FBQzlILGdGQUFnRixpQkFBaUIsT0FBTztBQUN4Ryx3REFBd0QsZ0JBQWdCLFFBQVEsT0FBTztBQUN2Riw4Q0FBOEMsZ0JBQWdCLGdCQUFnQixPQUFPO0FBQ3JGO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQSxTQUFTLFlBQVksYUFBYSxPQUFPLEVBQUUsVUFBVSxXQUFXO0FBQ2hFLG1DQUFtQyxTQUFTO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBLGlCQUFpQixtQkFBTyxDQUFDLHlEQUFVO0FBQ25DLDhCQUE4QixtQkFBTyxDQUFDLCtEQUF5QjtBQUMvRCw4Q0FBOEMscUNBQXFDLDJDQUEyQyxFQUFFLEVBQUU7QUFDbEksNkNBQTZDLHFDQUFxQywwQ0FBMEMsRUFBRSxFQUFFO0FBQ2hJLDZDQUE2QyxxQ0FBcUMsMENBQTBDLEVBQUUsRUFBRTtBQUNoSSxxREFBcUQscUNBQXFDLGtEQUFrRCxFQUFFLEVBQUU7QUFDaEosbURBQW1ELHFDQUFxQyxnREFBZ0QsRUFBRSxFQUFFO0FBQzVJLDBDQUEwQyxxQ0FBcUMsdUNBQXVDLEVBQUUsRUFBRTtBQUMxSCxzQkFBc0IsbUJBQU8sQ0FBQywrQ0FBaUI7QUFDL0MsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixlQUFlO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtR0FBbUcsdUJBQXVCO0FBQzFIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsUUFBUSxnQkFBZ0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMEJBQTBCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJHQUEyRyx3QkFBd0I7QUFDbkk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixRQUFRLGdCQUFnQjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QiwwQkFBMEI7QUFDdkQ7QUFDQSx1Q0FBdUMsNkhBQTZIO0FBQ3BLLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7Ozs7Ozs7QUM1SmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBLGlCQUFpQixtQkFBTyxDQUFDLHlEQUFVO0FBQ25DLFdBQVcsbUJBQU8sQ0FBQyxtREFBUztBQUM1QixzQkFBc0IsbUJBQU8sQ0FBQywrQ0FBaUI7QUFDL0Msa0JBQWtCLG1CQUFPLENBQUMsdUNBQWE7QUFDdkMsbUJBQW1CLG1CQUFPLENBQUMseUNBQWM7QUFDekMsbUJBQW1CLG1CQUFPLENBQUMseUNBQWM7QUFDekMsOENBQThDLHFDQUFxQyxnQ0FBZ0MsRUFBRSxFQUFFO0FBQ3ZILGtCQUFrQixtQkFBTyxDQUFDLHVDQUFhO0FBQ3ZDLDZDQUE2QyxxQ0FBcUMsOEJBQThCLEVBQUUsRUFBRTtBQUNwSCxrQkFBa0IsbUJBQU8sQ0FBQyx1Q0FBYTtBQUN2Qyw2Q0FBNkMscUNBQXFDLDhCQUE4QixFQUFFLEVBQUU7QUFDcEg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixjQUFjO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDM0NhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsTUFBTSxnQkFBZ0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsc0JBQXNCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHNCQUFzQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsbUJBQU8sQ0FBQyxtREFBUztBQUNqQztBQUNBLGdCQUFnQixtQkFBTyxDQUFDLGlDQUFVO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHdCQUF3QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix3QkFBd0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbUJBQW1CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsVUFBVTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGVBQWU7QUFDOUM7QUFDQSxtQ0FBbUMsUUFBUTtBQUMzQztBQUNBLHVCQUF1QixtQkFBbUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGVBQWU7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixtQkFBbUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELGFBQWE7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFFBQVEsZ0JBQWdCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDBCQUEwQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGNBQWM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsVUFBVTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsZUFBZTtBQUM5QztBQUNBO0FBQ0EsMkVBQTJFLGtCQUFrQjtBQUM3RjtBQUNBO0FBQ0EsMkJBQTJCLG1CQUFtQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixRQUFRLGdCQUFnQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiwwQkFBMEI7QUFDM0M7QUFDQTtBQUNBLDJFQUEyRSxrQkFBa0I7QUFDN0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFFBQVEsZ0JBQWdCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDBCQUEwQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixnQkFBZ0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsb0RBQW9EO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQSxtQkFBbUIsbUJBQW1CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixxQkFBcUI7QUFDeEM7QUFDQTtBQUNBLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkIsdUJBQXVCLCtCQUErQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixnQ0FBZ0M7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsMkJBQTJCLEVBQUU7QUFDdkU7QUFDQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBLHVCQUF1QixPQUFPO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNyZ0JBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qiw0QkFBNEI7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7O0FBRVg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCLE9BQU87QUFDN0I7QUFDQSx5QkFBeUIsY0FBYyxjQUFjLGNBQWM7QUFDbkUsdUJBQXVCLFlBQVksWUFBWSxZQUFZO0FBQzNELDBCQUEwQixRQUFRO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3ZkQSxlOzs7Ozs7Ozs7OztBQ0FBLGUiLCJmaWxlIjoiZW9zanMtanNzaWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9lb3Nqcy1qc3NpZy50c1wiKTtcbiIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnRzLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5leHBvcnRzLnRvQnl0ZUFycmF5ID0gdG9CeXRlQXJyYXlcbmV4cG9ydHMuZnJvbUJ5dGVBcnJheSA9IGZyb21CeXRlQXJyYXlcblxudmFyIGxvb2t1cCA9IFtdXG52YXIgcmV2TG9va3VwID0gW11cbnZhciBBcnIgPSB0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgPyBVaW50OEFycmF5IDogQXJyYXlcblxudmFyIGNvZGUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLydcbmZvciAodmFyIGkgPSAwLCBsZW4gPSBjb2RlLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gIGxvb2t1cFtpXSA9IGNvZGVbaV1cbiAgcmV2TG9va3VwW2NvZGUuY2hhckNvZGVBdChpKV0gPSBpXG59XG5cbi8vIFN1cHBvcnQgZGVjb2RpbmcgVVJMLXNhZmUgYmFzZTY0IHN0cmluZ3MsIGFzIE5vZGUuanMgZG9lcy5cbi8vIFNlZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQmFzZTY0I1VSTF9hcHBsaWNhdGlvbnNcbnJldkxvb2t1cFsnLScuY2hhckNvZGVBdCgwKV0gPSA2MlxucmV2TG9va3VwWydfJy5jaGFyQ29kZUF0KDApXSA9IDYzXG5cbmZ1bmN0aW9uIGdldExlbnMgKGI2NCkge1xuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuXG4gIGlmIChsZW4gJSA0ID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpXG4gIH1cblxuICAvLyBUcmltIG9mZiBleHRyYSBieXRlcyBhZnRlciBwbGFjZWhvbGRlciBieXRlcyBhcmUgZm91bmRcbiAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vYmVhdGdhbW1pdC9iYXNlNjQtanMvaXNzdWVzLzQyXG4gIHZhciB2YWxpZExlbiA9IGI2NC5pbmRleE9mKCc9JylcbiAgaWYgKHZhbGlkTGVuID09PSAtMSkgdmFsaWRMZW4gPSBsZW5cblxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gdmFsaWRMZW4gPT09IGxlblxuICAgID8gMFxuICAgIDogNCAtICh2YWxpZExlbiAlIDQpXG5cbiAgcmV0dXJuIFt2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuXVxufVxuXG4vLyBiYXNlNjQgaXMgNC8zICsgdXAgdG8gdHdvIGNoYXJhY3RlcnMgb2YgdGhlIG9yaWdpbmFsIGRhdGFcbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKGI2NCkge1xuICB2YXIgbGVucyA9IGdldExlbnMoYjY0KVxuICB2YXIgdmFsaWRMZW4gPSBsZW5zWzBdXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSBsZW5zWzFdXG4gIHJldHVybiAoKHZhbGlkTGVuICsgcGxhY2VIb2xkZXJzTGVuKSAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0xlblxufVxuXG5mdW5jdGlvbiBfYnl0ZUxlbmd0aCAoYjY0LCB2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuKSB7XG4gIHJldHVybiAoKHZhbGlkTGVuICsgcGxhY2VIb2xkZXJzTGVuKSAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0xlblxufVxuXG5mdW5jdGlvbiB0b0J5dGVBcnJheSAoYjY0KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuXG4gIHZhciBhcnIgPSBuZXcgQXJyKF9ieXRlTGVuZ3RoKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikpXG5cbiAgdmFyIGN1ckJ5dGUgPSAwXG5cbiAgLy8gaWYgdGhlcmUgYXJlIHBsYWNlaG9sZGVycywgb25seSBnZXQgdXAgdG8gdGhlIGxhc3QgY29tcGxldGUgNCBjaGFyc1xuICB2YXIgbGVuID0gcGxhY2VIb2xkZXJzTGVuID4gMFxuICAgID8gdmFsaWRMZW4gLSA0XG4gICAgOiB2YWxpZExlblxuXG4gIHZhciBpXG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxOCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDEyKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPDwgNikgfFxuICAgICAgcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAzKV1cbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gMTYpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnNMZW4gPT09IDIpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMikgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldID4+IDQpXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAxKSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDEwKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgNCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildID4+IDIpXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtID4+IDEyICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gPj4gNiAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtICYgMHgzRl1cbn1cblxuZnVuY3Rpb24gZW5jb2RlQ2h1bmsgKHVpbnQ4LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0bXBcbiAgdmFyIG91dHB1dCA9IFtdXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAzKSB7XG4gICAgdG1wID1cbiAgICAgICgodWludDhbaV0gPDwgMTYpICYgMHhGRjAwMDApICtcbiAgICAgICgodWludDhbaSArIDFdIDw8IDgpICYgMHhGRjAwKSArXG4gICAgICAodWludDhbaSArIDJdICYgMHhGRilcbiAgICBvdXRwdXQucHVzaCh0cmlwbGV0VG9CYXNlNjQodG1wKSlcbiAgfVxuICByZXR1cm4gb3V0cHV0LmpvaW4oJycpXG59XG5cbmZ1bmN0aW9uIGZyb21CeXRlQXJyYXkgKHVpbnQ4KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbiA9IHVpbnQ4Lmxlbmd0aFxuICB2YXIgZXh0cmFCeXRlcyA9IGxlbiAlIDMgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcbiAgdmFyIHBhcnRzID0gW11cbiAgdmFyIG1heENodW5rTGVuZ3RoID0gMTYzODMgLy8gbXVzdCBiZSBtdWx0aXBsZSBvZiAzXG5cbiAgLy8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuICBmb3IgKHZhciBpID0gMCwgbGVuMiA9IGxlbiAtIGV4dHJhQnl0ZXM7IGkgPCBsZW4yOyBpICs9IG1heENodW5rTGVuZ3RoKSB7XG4gICAgcGFydHMucHVzaChlbmNvZGVDaHVuayhcbiAgICAgIHVpbnQ4LCBpLCAoaSArIG1heENodW5rTGVuZ3RoKSA+IGxlbjIgPyBsZW4yIDogKGkgKyBtYXhDaHVua0xlbmd0aClcbiAgICApKVxuICB9XG5cbiAgLy8gcGFkIHRoZSBlbmQgd2l0aCB6ZXJvcywgYnV0IG1ha2Ugc3VyZSB0byBub3QgZm9yZ2V0IHRoZSBleHRyYSBieXRlc1xuICBpZiAoZXh0cmFCeXRlcyA9PT0gMSkge1xuICAgIHRtcCA9IHVpbnQ4W2xlbiAtIDFdXG4gICAgcGFydHMucHVzaChcbiAgICAgIGxvb2t1cFt0bXAgPj4gMl0gK1xuICAgICAgbG9va3VwWyh0bXAgPDwgNCkgJiAweDNGXSArXG4gICAgICAnPT0nXG4gICAgKVxuICB9IGVsc2UgaWYgKGV4dHJhQnl0ZXMgPT09IDIpIHtcbiAgICB0bXAgPSAodWludDhbbGVuIC0gMl0gPDwgOCkgKyB1aW50OFtsZW4gLSAxXVxuICAgIHBhcnRzLnB1c2goXG4gICAgICBsb29rdXBbdG1wID4+IDEwXSArXG4gICAgICBsb29rdXBbKHRtcCA+PiA0KSAmIDB4M0ZdICtcbiAgICAgIGxvb2t1cFsodG1wIDw8IDIpICYgMHgzRl0gK1xuICAgICAgJz0nXG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIHBhcnRzLmpvaW4oJycpXG59XG4iLCIoZnVuY3Rpb24gKG1vZHVsZSwgZXhwb3J0cykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gVXRpbHNcbiAgZnVuY3Rpb24gYXNzZXJ0ICh2YWwsIG1zZykge1xuICAgIGlmICghdmFsKSB0aHJvdyBuZXcgRXJyb3IobXNnIHx8ICdBc3NlcnRpb24gZmFpbGVkJyk7XG4gIH1cblxuICAvLyBDb3VsZCB1c2UgYGluaGVyaXRzYCBtb2R1bGUsIGJ1dCBkb24ndCB3YW50IHRvIG1vdmUgZnJvbSBzaW5nbGUgZmlsZVxuICAvLyBhcmNoaXRlY3R1cmUgeWV0LlxuICBmdW5jdGlvbiBpbmhlcml0cyAoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3I7XG4gICAgdmFyIFRlbXBDdG9yID0gZnVuY3Rpb24gKCkge307XG4gICAgVGVtcEN0b3IucHJvdG90eXBlID0gc3VwZXJDdG9yLnByb3RvdHlwZTtcbiAgICBjdG9yLnByb3RvdHlwZSA9IG5ldyBUZW1wQ3RvcigpO1xuICAgIGN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY3RvcjtcbiAgfVxuXG4gIC8vIEJOXG5cbiAgZnVuY3Rpb24gQk4gKG51bWJlciwgYmFzZSwgZW5kaWFuKSB7XG4gICAgaWYgKEJOLmlzQk4obnVtYmVyKSkge1xuICAgICAgcmV0dXJuIG51bWJlcjtcbiAgICB9XG5cbiAgICB0aGlzLm5lZ2F0aXZlID0gMDtcbiAgICB0aGlzLndvcmRzID0gbnVsbDtcbiAgICB0aGlzLmxlbmd0aCA9IDA7XG5cbiAgICAvLyBSZWR1Y3Rpb24gY29udGV4dFxuICAgIHRoaXMucmVkID0gbnVsbDtcblxuICAgIGlmIChudW1iZXIgIT09IG51bGwpIHtcbiAgICAgIGlmIChiYXNlID09PSAnbGUnIHx8IGJhc2UgPT09ICdiZScpIHtcbiAgICAgICAgZW5kaWFuID0gYmFzZTtcbiAgICAgICAgYmFzZSA9IDEwO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9pbml0KG51bWJlciB8fCAwLCBiYXNlIHx8IDEwLCBlbmRpYW4gfHwgJ2JlJyk7XG4gICAgfVxuICB9XG4gIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gQk47XG4gIH0gZWxzZSB7XG4gICAgZXhwb3J0cy5CTiA9IEJOO1xuICB9XG5cbiAgQk4uQk4gPSBCTjtcbiAgQk4ud29yZFNpemUgPSAyNjtcblxuICB2YXIgQnVmZmVyO1xuICB0cnkge1xuICAgIEJ1ZmZlciA9IHJlcXVpcmUoJ2J1ZmZlcicpLkJ1ZmZlcjtcbiAgfSBjYXRjaCAoZSkge1xuICB9XG5cbiAgQk4uaXNCTiA9IGZ1bmN0aW9uIGlzQk4gKG51bSkge1xuICAgIGlmIChudW0gaW5zdGFuY2VvZiBCTikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bSAhPT0gbnVsbCAmJiB0eXBlb2YgbnVtID09PSAnb2JqZWN0JyAmJlxuICAgICAgbnVtLmNvbnN0cnVjdG9yLndvcmRTaXplID09PSBCTi53b3JkU2l6ZSAmJiBBcnJheS5pc0FycmF5KG51bS53b3Jkcyk7XG4gIH07XG5cbiAgQk4ubWF4ID0gZnVuY3Rpb24gbWF4IChsZWZ0LCByaWdodCkge1xuICAgIGlmIChsZWZ0LmNtcChyaWdodCkgPiAwKSByZXR1cm4gbGVmdDtcbiAgICByZXR1cm4gcmlnaHQ7XG4gIH07XG5cbiAgQk4ubWluID0gZnVuY3Rpb24gbWluIChsZWZ0LCByaWdodCkge1xuICAgIGlmIChsZWZ0LmNtcChyaWdodCkgPCAwKSByZXR1cm4gbGVmdDtcbiAgICByZXR1cm4gcmlnaHQ7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gaW5pdCAobnVtYmVyLCBiYXNlLCBlbmRpYW4pIHtcbiAgICBpZiAodHlwZW9mIG51bWJlciA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiB0aGlzLl9pbml0TnVtYmVyKG51bWJlciwgYmFzZSwgZW5kaWFuKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG51bWJlciA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiB0aGlzLl9pbml0QXJyYXkobnVtYmVyLCBiYXNlLCBlbmRpYW4pO1xuICAgIH1cblxuICAgIGlmIChiYXNlID09PSAnaGV4Jykge1xuICAgICAgYmFzZSA9IDE2O1xuICAgIH1cbiAgICBhc3NlcnQoYmFzZSA9PT0gKGJhc2UgfCAwKSAmJiBiYXNlID49IDIgJiYgYmFzZSA8PSAzNik7XG5cbiAgICBudW1iZXIgPSBudW1iZXIudG9TdHJpbmcoKS5yZXBsYWNlKC9cXHMrL2csICcnKTtcbiAgICB2YXIgc3RhcnQgPSAwO1xuICAgIGlmIChudW1iZXJbMF0gPT09ICctJykge1xuICAgICAgc3RhcnQrKztcbiAgICB9XG5cbiAgICBpZiAoYmFzZSA9PT0gMTYpIHtcbiAgICAgIHRoaXMuX3BhcnNlSGV4KG51bWJlciwgc3RhcnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9wYXJzZUJhc2UobnVtYmVyLCBiYXNlLCBzdGFydCk7XG4gICAgfVxuXG4gICAgaWYgKG51bWJlclswXSA9PT0gJy0nKSB7XG4gICAgICB0aGlzLm5lZ2F0aXZlID0gMTtcbiAgICB9XG5cbiAgICB0aGlzLnN0cmlwKCk7XG5cbiAgICBpZiAoZW5kaWFuICE9PSAnbGUnKSByZXR1cm47XG5cbiAgICB0aGlzLl9pbml0QXJyYXkodGhpcy50b0FycmF5KCksIGJhc2UsIGVuZGlhbik7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLl9pbml0TnVtYmVyID0gZnVuY3Rpb24gX2luaXROdW1iZXIgKG51bWJlciwgYmFzZSwgZW5kaWFuKSB7XG4gICAgaWYgKG51bWJlciA8IDApIHtcbiAgICAgIHRoaXMubmVnYXRpdmUgPSAxO1xuICAgICAgbnVtYmVyID0gLW51bWJlcjtcbiAgICB9XG4gICAgaWYgKG51bWJlciA8IDB4NDAwMDAwMCkge1xuICAgICAgdGhpcy53b3JkcyA9IFsgbnVtYmVyICYgMHgzZmZmZmZmIF07XG4gICAgICB0aGlzLmxlbmd0aCA9IDE7XG4gICAgfSBlbHNlIGlmIChudW1iZXIgPCAweDEwMDAwMDAwMDAwMDAwKSB7XG4gICAgICB0aGlzLndvcmRzID0gW1xuICAgICAgICBudW1iZXIgJiAweDNmZmZmZmYsXG4gICAgICAgIChudW1iZXIgLyAweDQwMDAwMDApICYgMHgzZmZmZmZmXG4gICAgICBdO1xuICAgICAgdGhpcy5sZW5ndGggPSAyO1xuICAgIH0gZWxzZSB7XG4gICAgICBhc3NlcnQobnVtYmVyIDwgMHgyMDAwMDAwMDAwMDAwMCk7IC8vIDIgXiA1MyAodW5zYWZlKVxuICAgICAgdGhpcy53b3JkcyA9IFtcbiAgICAgICAgbnVtYmVyICYgMHgzZmZmZmZmLFxuICAgICAgICAobnVtYmVyIC8gMHg0MDAwMDAwKSAmIDB4M2ZmZmZmZixcbiAgICAgICAgMVxuICAgICAgXTtcbiAgICAgIHRoaXMubGVuZ3RoID0gMztcbiAgICB9XG5cbiAgICBpZiAoZW5kaWFuICE9PSAnbGUnKSByZXR1cm47XG5cbiAgICAvLyBSZXZlcnNlIHRoZSBieXRlc1xuICAgIHRoaXMuX2luaXRBcnJheSh0aGlzLnRvQXJyYXkoKSwgYmFzZSwgZW5kaWFuKTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUuX2luaXRBcnJheSA9IGZ1bmN0aW9uIF9pbml0QXJyYXkgKG51bWJlciwgYmFzZSwgZW5kaWFuKSB7XG4gICAgLy8gUGVyaGFwcyBhIFVpbnQ4QXJyYXlcbiAgICBhc3NlcnQodHlwZW9mIG51bWJlci5sZW5ndGggPT09ICdudW1iZXInKTtcbiAgICBpZiAobnVtYmVyLmxlbmd0aCA8PSAwKSB7XG4gICAgICB0aGlzLndvcmRzID0gWyAwIF07XG4gICAgICB0aGlzLmxlbmd0aCA9IDE7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0aGlzLmxlbmd0aCA9IE1hdGguY2VpbChudW1iZXIubGVuZ3RoIC8gMyk7XG4gICAgdGhpcy53b3JkcyA9IG5ldyBBcnJheSh0aGlzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLndvcmRzW2ldID0gMDtcbiAgICB9XG5cbiAgICB2YXIgaiwgdztcbiAgICB2YXIgb2ZmID0gMDtcbiAgICBpZiAoZW5kaWFuID09PSAnYmUnKSB7XG4gICAgICBmb3IgKGkgPSBudW1iZXIubGVuZ3RoIC0gMSwgaiA9IDA7IGkgPj0gMDsgaSAtPSAzKSB7XG4gICAgICAgIHcgPSBudW1iZXJbaV0gfCAobnVtYmVyW2kgLSAxXSA8PCA4KSB8IChudW1iZXJbaSAtIDJdIDw8IDE2KTtcbiAgICAgICAgdGhpcy53b3Jkc1tqXSB8PSAodyA8PCBvZmYpICYgMHgzZmZmZmZmO1xuICAgICAgICB0aGlzLndvcmRzW2ogKyAxXSA9ICh3ID4+PiAoMjYgLSBvZmYpKSAmIDB4M2ZmZmZmZjtcbiAgICAgICAgb2ZmICs9IDI0O1xuICAgICAgICBpZiAob2ZmID49IDI2KSB7XG4gICAgICAgICAgb2ZmIC09IDI2O1xuICAgICAgICAgIGorKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZW5kaWFuID09PSAnbGUnKSB7XG4gICAgICBmb3IgKGkgPSAwLCBqID0gMDsgaSA8IG51bWJlci5sZW5ndGg7IGkgKz0gMykge1xuICAgICAgICB3ID0gbnVtYmVyW2ldIHwgKG51bWJlcltpICsgMV0gPDwgOCkgfCAobnVtYmVyW2kgKyAyXSA8PCAxNik7XG4gICAgICAgIHRoaXMud29yZHNbal0gfD0gKHcgPDwgb2ZmKSAmIDB4M2ZmZmZmZjtcbiAgICAgICAgdGhpcy53b3Jkc1tqICsgMV0gPSAodyA+Pj4gKDI2IC0gb2ZmKSkgJiAweDNmZmZmZmY7XG4gICAgICAgIG9mZiArPSAyNDtcbiAgICAgICAgaWYgKG9mZiA+PSAyNikge1xuICAgICAgICAgIG9mZiAtPSAyNjtcbiAgICAgICAgICBqKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc3RyaXAoKTtcbiAgfTtcblxuICBmdW5jdGlvbiBwYXJzZUhleCAoc3RyLCBzdGFydCwgZW5kKSB7XG4gICAgdmFyIHIgPSAwO1xuICAgIHZhciBsZW4gPSBNYXRoLm1pbihzdHIubGVuZ3RoLCBlbmQpO1xuICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB2YXIgYyA9IHN0ci5jaGFyQ29kZUF0KGkpIC0gNDg7XG5cbiAgICAgIHIgPDw9IDQ7XG5cbiAgICAgIC8vICdhJyAtICdmJ1xuICAgICAgaWYgKGMgPj0gNDkgJiYgYyA8PSA1NCkge1xuICAgICAgICByIHw9IGMgLSA0OSArIDB4YTtcblxuICAgICAgLy8gJ0EnIC0gJ0YnXG4gICAgICB9IGVsc2UgaWYgKGMgPj0gMTcgJiYgYyA8PSAyMikge1xuICAgICAgICByIHw9IGMgLSAxNyArIDB4YTtcblxuICAgICAgLy8gJzAnIC0gJzknXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByIHw9IGMgJiAweGY7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByO1xuICB9XG5cbiAgQk4ucHJvdG90eXBlLl9wYXJzZUhleCA9IGZ1bmN0aW9uIF9wYXJzZUhleCAobnVtYmVyLCBzdGFydCkge1xuICAgIC8vIENyZWF0ZSBwb3NzaWJseSBiaWdnZXIgYXJyYXkgdG8gZW5zdXJlIHRoYXQgaXQgZml0cyB0aGUgbnVtYmVyXG4gICAgdGhpcy5sZW5ndGggPSBNYXRoLmNlaWwoKG51bWJlci5sZW5ndGggLSBzdGFydCkgLyA2KTtcbiAgICB0aGlzLndvcmRzID0gbmV3IEFycmF5KHRoaXMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMud29yZHNbaV0gPSAwO1xuICAgIH1cblxuICAgIHZhciBqLCB3O1xuICAgIC8vIFNjYW4gMjQtYml0IGNodW5rcyBhbmQgYWRkIHRoZW0gdG8gdGhlIG51bWJlclxuICAgIHZhciBvZmYgPSAwO1xuICAgIGZvciAoaSA9IG51bWJlci5sZW5ndGggLSA2LCBqID0gMDsgaSA+PSBzdGFydDsgaSAtPSA2KSB7XG4gICAgICB3ID0gcGFyc2VIZXgobnVtYmVyLCBpLCBpICsgNik7XG4gICAgICB0aGlzLndvcmRzW2pdIHw9ICh3IDw8IG9mZikgJiAweDNmZmZmZmY7XG4gICAgICAvLyBOT1RFOiBgMHgzZmZmZmZgIGlzIGludGVudGlvbmFsIGhlcmUsIDI2Yml0cyBtYXggc2hpZnQgKyAyNGJpdCBoZXggbGltYlxuICAgICAgdGhpcy53b3Jkc1tqICsgMV0gfD0gdyA+Pj4gKDI2IC0gb2ZmKSAmIDB4M2ZmZmZmO1xuICAgICAgb2ZmICs9IDI0O1xuICAgICAgaWYgKG9mZiA+PSAyNikge1xuICAgICAgICBvZmYgLT0gMjY7XG4gICAgICAgIGorKztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGkgKyA2ICE9PSBzdGFydCkge1xuICAgICAgdyA9IHBhcnNlSGV4KG51bWJlciwgc3RhcnQsIGkgKyA2KTtcbiAgICAgIHRoaXMud29yZHNbal0gfD0gKHcgPDwgb2ZmKSAmIDB4M2ZmZmZmZjtcbiAgICAgIHRoaXMud29yZHNbaiArIDFdIHw9IHcgPj4+ICgyNiAtIG9mZikgJiAweDNmZmZmZjtcbiAgICB9XG4gICAgdGhpcy5zdHJpcCgpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHBhcnNlQmFzZSAoc3RyLCBzdGFydCwgZW5kLCBtdWwpIHtcbiAgICB2YXIgciA9IDA7XG4gICAgdmFyIGxlbiA9IE1hdGgubWluKHN0ci5sZW5ndGgsIGVuZCk7XG4gICAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHZhciBjID0gc3RyLmNoYXJDb2RlQXQoaSkgLSA0ODtcblxuICAgICAgciAqPSBtdWw7XG5cbiAgICAgIC8vICdhJ1xuICAgICAgaWYgKGMgPj0gNDkpIHtcbiAgICAgICAgciArPSBjIC0gNDkgKyAweGE7XG5cbiAgICAgIC8vICdBJ1xuICAgICAgfSBlbHNlIGlmIChjID49IDE3KSB7XG4gICAgICAgIHIgKz0gYyAtIDE3ICsgMHhhO1xuXG4gICAgICAvLyAnMCcgLSAnOSdcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHIgKz0gYztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHI7XG4gIH1cblxuICBCTi5wcm90b3R5cGUuX3BhcnNlQmFzZSA9IGZ1bmN0aW9uIF9wYXJzZUJhc2UgKG51bWJlciwgYmFzZSwgc3RhcnQpIHtcbiAgICAvLyBJbml0aWFsaXplIGFzIHplcm9cbiAgICB0aGlzLndvcmRzID0gWyAwIF07XG4gICAgdGhpcy5sZW5ndGggPSAxO1xuXG4gICAgLy8gRmluZCBsZW5ndGggb2YgbGltYiBpbiBiYXNlXG4gICAgZm9yICh2YXIgbGltYkxlbiA9IDAsIGxpbWJQb3cgPSAxOyBsaW1iUG93IDw9IDB4M2ZmZmZmZjsgbGltYlBvdyAqPSBiYXNlKSB7XG4gICAgICBsaW1iTGVuKys7XG4gICAgfVxuICAgIGxpbWJMZW4tLTtcbiAgICBsaW1iUG93ID0gKGxpbWJQb3cgLyBiYXNlKSB8IDA7XG5cbiAgICB2YXIgdG90YWwgPSBudW1iZXIubGVuZ3RoIC0gc3RhcnQ7XG4gICAgdmFyIG1vZCA9IHRvdGFsICUgbGltYkxlbjtcbiAgICB2YXIgZW5kID0gTWF0aC5taW4odG90YWwsIHRvdGFsIC0gbW9kKSArIHN0YXJ0O1xuXG4gICAgdmFyIHdvcmQgPSAwO1xuICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSBsaW1iTGVuKSB7XG4gICAgICB3b3JkID0gcGFyc2VCYXNlKG51bWJlciwgaSwgaSArIGxpbWJMZW4sIGJhc2UpO1xuXG4gICAgICB0aGlzLmltdWxuKGxpbWJQb3cpO1xuICAgICAgaWYgKHRoaXMud29yZHNbMF0gKyB3b3JkIDwgMHg0MDAwMDAwKSB7XG4gICAgICAgIHRoaXMud29yZHNbMF0gKz0gd29yZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2lhZGRuKHdvcmQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtb2QgIT09IDApIHtcbiAgICAgIHZhciBwb3cgPSAxO1xuICAgICAgd29yZCA9IHBhcnNlQmFzZShudW1iZXIsIGksIG51bWJlci5sZW5ndGgsIGJhc2UpO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbW9kOyBpKyspIHtcbiAgICAgICAgcG93ICo9IGJhc2U7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaW11bG4ocG93KTtcbiAgICAgIGlmICh0aGlzLndvcmRzWzBdICsgd29yZCA8IDB4NDAwMDAwMCkge1xuICAgICAgICB0aGlzLndvcmRzWzBdICs9IHdvcmQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9pYWRkbih3b3JkKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbiBjb3B5IChkZXN0KSB7XG4gICAgZGVzdC53b3JkcyA9IG5ldyBBcnJheSh0aGlzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBkZXN0LndvcmRzW2ldID0gdGhpcy53b3Jkc1tpXTtcbiAgICB9XG4gICAgZGVzdC5sZW5ndGggPSB0aGlzLmxlbmd0aDtcbiAgICBkZXN0Lm5lZ2F0aXZlID0gdGhpcy5uZWdhdGl2ZTtcbiAgICBkZXN0LnJlZCA9IHRoaXMucmVkO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uIGNsb25lICgpIHtcbiAgICB2YXIgciA9IG5ldyBCTihudWxsKTtcbiAgICB0aGlzLmNvcHkocik7XG4gICAgcmV0dXJuIHI7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLl9leHBhbmQgPSBmdW5jdGlvbiBfZXhwYW5kIChzaXplKSB7XG4gICAgd2hpbGUgKHRoaXMubGVuZ3RoIDwgc2l6ZSkge1xuICAgICAgdGhpcy53b3Jkc1t0aGlzLmxlbmd0aCsrXSA9IDA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIFJlbW92ZSBsZWFkaW5nIGAwYCBmcm9tIGB0aGlzYFxuICBCTi5wcm90b3R5cGUuc3RyaXAgPSBmdW5jdGlvbiBzdHJpcCAoKSB7XG4gICAgd2hpbGUgKHRoaXMubGVuZ3RoID4gMSAmJiB0aGlzLndvcmRzW3RoaXMubGVuZ3RoIC0gMV0gPT09IDApIHtcbiAgICAgIHRoaXMubGVuZ3RoLS07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9ub3JtU2lnbigpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5fbm9ybVNpZ24gPSBmdW5jdGlvbiBfbm9ybVNpZ24gKCkge1xuICAgIC8vIC0wID0gMFxuICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMSAmJiB0aGlzLndvcmRzWzBdID09PSAwKSB7XG4gICAgICB0aGlzLm5lZ2F0aXZlID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiBpbnNwZWN0ICgpIHtcbiAgICByZXR1cm4gKHRoaXMucmVkID8gJzxCTi1SOiAnIDogJzxCTjogJykgKyB0aGlzLnRvU3RyaW5nKDE2KSArICc+JztcbiAgfTtcblxuICAvKlxuXG4gIHZhciB6ZXJvcyA9IFtdO1xuICB2YXIgZ3JvdXBTaXplcyA9IFtdO1xuICB2YXIgZ3JvdXBCYXNlcyA9IFtdO1xuXG4gIHZhciBzID0gJyc7XG4gIHZhciBpID0gLTE7XG4gIHdoaWxlICgrK2kgPCBCTi53b3JkU2l6ZSkge1xuICAgIHplcm9zW2ldID0gcztcbiAgICBzICs9ICcwJztcbiAgfVxuICBncm91cFNpemVzWzBdID0gMDtcbiAgZ3JvdXBTaXplc1sxXSA9IDA7XG4gIGdyb3VwQmFzZXNbMF0gPSAwO1xuICBncm91cEJhc2VzWzFdID0gMDtcbiAgdmFyIGJhc2UgPSAyIC0gMTtcbiAgd2hpbGUgKCsrYmFzZSA8IDM2ICsgMSkge1xuICAgIHZhciBncm91cFNpemUgPSAwO1xuICAgIHZhciBncm91cEJhc2UgPSAxO1xuICAgIHdoaWxlIChncm91cEJhc2UgPCAoMSA8PCBCTi53b3JkU2l6ZSkgLyBiYXNlKSB7XG4gICAgICBncm91cEJhc2UgKj0gYmFzZTtcbiAgICAgIGdyb3VwU2l6ZSArPSAxO1xuICAgIH1cbiAgICBncm91cFNpemVzW2Jhc2VdID0gZ3JvdXBTaXplO1xuICAgIGdyb3VwQmFzZXNbYmFzZV0gPSBncm91cEJhc2U7XG4gIH1cblxuICAqL1xuXG4gIHZhciB6ZXJvcyA9IFtcbiAgICAnJyxcbiAgICAnMCcsXG4gICAgJzAwJyxcbiAgICAnMDAwJyxcbiAgICAnMDAwMCcsXG4gICAgJzAwMDAwJyxcbiAgICAnMDAwMDAwJyxcbiAgICAnMDAwMDAwMCcsXG4gICAgJzAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMCcsXG4gICAgJzAwMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMDAwMCcsXG4gICAgJzAwMDAwMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMDAwMDAwMCcsXG4gICAgJzAwMDAwMDAwMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMDAwMDAwMDAwMCcsXG4gICAgJzAwMDAwMDAwMDAwMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMDAwMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCcsXG4gICAgJzAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwJyxcbiAgICAnMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCdcbiAgXTtcblxuICB2YXIgZ3JvdXBTaXplcyA9IFtcbiAgICAwLCAwLFxuICAgIDI1LCAxNiwgMTIsIDExLCAxMCwgOSwgOCxcbiAgICA4LCA3LCA3LCA3LCA3LCA2LCA2LFxuICAgIDYsIDYsIDYsIDYsIDYsIDUsIDUsXG4gICAgNSwgNSwgNSwgNSwgNSwgNSwgNSxcbiAgICA1LCA1LCA1LCA1LCA1LCA1LCA1XG4gIF07XG5cbiAgdmFyIGdyb3VwQmFzZXMgPSBbXG4gICAgMCwgMCxcbiAgICAzMzU1NDQzMiwgNDMwNDY3MjEsIDE2Nzc3MjE2LCA0ODgyODEyNSwgNjA0NjYxNzYsIDQwMzUzNjA3LCAxNjc3NzIxNixcbiAgICA0MzA0NjcyMSwgMTAwMDAwMDAsIDE5NDg3MTcxLCAzNTgzMTgwOCwgNjI3NDg1MTcsIDc1Mjk1MzYsIDExMzkwNjI1LFxuICAgIDE2Nzc3MjE2LCAyNDEzNzU2OSwgMzQwMTIyMjQsIDQ3MDQ1ODgxLCA2NDAwMDAwMCwgNDA4NDEwMSwgNTE1MzYzMixcbiAgICA2NDM2MzQzLCA3OTYyNjI0LCA5NzY1NjI1LCAxMTg4MTM3NiwgMTQzNDg5MDcsIDE3MjEwMzY4LCAyMDUxMTE0OSxcbiAgICAyNDMwMDAwMCwgMjg2MjkxNTEsIDMzNTU0NDMyLCAzOTEzNTM5MywgNDU0MzU0MjQsIDUyNTIxODc1LCA2MDQ2NjE3NlxuICBdO1xuXG4gIEJOLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nIChiYXNlLCBwYWRkaW5nKSB7XG4gICAgYmFzZSA9IGJhc2UgfHwgMTA7XG4gICAgcGFkZGluZyA9IHBhZGRpbmcgfCAwIHx8IDE7XG5cbiAgICB2YXIgb3V0O1xuICAgIGlmIChiYXNlID09PSAxNiB8fCBiYXNlID09PSAnaGV4Jykge1xuICAgICAgb3V0ID0gJyc7XG4gICAgICB2YXIgb2ZmID0gMDtcbiAgICAgIHZhciBjYXJyeSA9IDA7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHcgPSB0aGlzLndvcmRzW2ldO1xuICAgICAgICB2YXIgd29yZCA9ICgoKHcgPDwgb2ZmKSB8IGNhcnJ5KSAmIDB4ZmZmZmZmKS50b1N0cmluZygxNik7XG4gICAgICAgIGNhcnJ5ID0gKHcgPj4+ICgyNCAtIG9mZikpICYgMHhmZmZmZmY7XG4gICAgICAgIGlmIChjYXJyeSAhPT0gMCB8fCBpICE9PSB0aGlzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBvdXQgPSB6ZXJvc1s2IC0gd29yZC5sZW5ndGhdICsgd29yZCArIG91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvdXQgPSB3b3JkICsgb3V0O1xuICAgICAgICB9XG4gICAgICAgIG9mZiArPSAyO1xuICAgICAgICBpZiAob2ZmID49IDI2KSB7XG4gICAgICAgICAgb2ZmIC09IDI2O1xuICAgICAgICAgIGktLTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGNhcnJ5ICE9PSAwKSB7XG4gICAgICAgIG91dCA9IGNhcnJ5LnRvU3RyaW5nKDE2KSArIG91dDtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChvdXQubGVuZ3RoICUgcGFkZGluZyAhPT0gMCkge1xuICAgICAgICBvdXQgPSAnMCcgKyBvdXQ7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5uZWdhdGl2ZSAhPT0gMCkge1xuICAgICAgICBvdXQgPSAnLScgKyBvdXQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIGlmIChiYXNlID09PSAoYmFzZSB8IDApICYmIGJhc2UgPj0gMiAmJiBiYXNlIDw9IDM2KSB7XG4gICAgICAvLyB2YXIgZ3JvdXBTaXplID0gTWF0aC5mbG9vcihCTi53b3JkU2l6ZSAqIE1hdGguTE4yIC8gTWF0aC5sb2coYmFzZSkpO1xuICAgICAgdmFyIGdyb3VwU2l6ZSA9IGdyb3VwU2l6ZXNbYmFzZV07XG4gICAgICAvLyB2YXIgZ3JvdXBCYXNlID0gTWF0aC5wb3coYmFzZSwgZ3JvdXBTaXplKTtcbiAgICAgIHZhciBncm91cEJhc2UgPSBncm91cEJhc2VzW2Jhc2VdO1xuICAgICAgb3V0ID0gJyc7XG4gICAgICB2YXIgYyA9IHRoaXMuY2xvbmUoKTtcbiAgICAgIGMubmVnYXRpdmUgPSAwO1xuICAgICAgd2hpbGUgKCFjLmlzWmVybygpKSB7XG4gICAgICAgIHZhciByID0gYy5tb2RuKGdyb3VwQmFzZSkudG9TdHJpbmcoYmFzZSk7XG4gICAgICAgIGMgPSBjLmlkaXZuKGdyb3VwQmFzZSk7XG5cbiAgICAgICAgaWYgKCFjLmlzWmVybygpKSB7XG4gICAgICAgICAgb3V0ID0gemVyb3NbZ3JvdXBTaXplIC0gci5sZW5ndGhdICsgciArIG91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvdXQgPSByICsgb3V0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5pc1plcm8oKSkge1xuICAgICAgICBvdXQgPSAnMCcgKyBvdXQ7XG4gICAgICB9XG4gICAgICB3aGlsZSAob3V0Lmxlbmd0aCAlIHBhZGRpbmcgIT09IDApIHtcbiAgICAgICAgb3V0ID0gJzAnICsgb3V0O1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMubmVnYXRpdmUgIT09IDApIHtcbiAgICAgICAgb3V0ID0gJy0nICsgb3V0O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICBhc3NlcnQoZmFsc2UsICdCYXNlIHNob3VsZCBiZSBiZXR3ZWVuIDIgYW5kIDM2Jyk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLnRvTnVtYmVyID0gZnVuY3Rpb24gdG9OdW1iZXIgKCkge1xuICAgIHZhciByZXQgPSB0aGlzLndvcmRzWzBdO1xuICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMikge1xuICAgICAgcmV0ICs9IHRoaXMud29yZHNbMV0gKiAweDQwMDAwMDA7XG4gICAgfSBlbHNlIGlmICh0aGlzLmxlbmd0aCA9PT0gMyAmJiB0aGlzLndvcmRzWzJdID09PSAweDAxKSB7XG4gICAgICAvLyBOT1RFOiBhdCB0aGlzIHN0YWdlIGl0IGlzIGtub3duIHRoYXQgdGhlIHRvcCBiaXQgaXMgc2V0XG4gICAgICByZXQgKz0gMHgxMDAwMDAwMDAwMDAwMCArICh0aGlzLndvcmRzWzFdICogMHg0MDAwMDAwKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubGVuZ3RoID4gMikge1xuICAgICAgYXNzZXJ0KGZhbHNlLCAnTnVtYmVyIGNhbiBvbmx5IHNhZmVseSBzdG9yZSB1cCB0byA1MyBiaXRzJyk7XG4gICAgfVxuICAgIHJldHVybiAodGhpcy5uZWdhdGl2ZSAhPT0gMCkgPyAtcmV0IDogcmV0O1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04gKCkge1xuICAgIHJldHVybiB0aGlzLnRvU3RyaW5nKDE2KTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUudG9CdWZmZXIgPSBmdW5jdGlvbiB0b0J1ZmZlciAoZW5kaWFuLCBsZW5ndGgpIHtcbiAgICBhc3NlcnQodHlwZW9mIEJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpO1xuICAgIHJldHVybiB0aGlzLnRvQXJyYXlMaWtlKEJ1ZmZlciwgZW5kaWFuLCBsZW5ndGgpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS50b0FycmF5ID0gZnVuY3Rpb24gdG9BcnJheSAoZW5kaWFuLCBsZW5ndGgpIHtcbiAgICByZXR1cm4gdGhpcy50b0FycmF5TGlrZShBcnJheSwgZW5kaWFuLCBsZW5ndGgpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS50b0FycmF5TGlrZSA9IGZ1bmN0aW9uIHRvQXJyYXlMaWtlIChBcnJheVR5cGUsIGVuZGlhbiwgbGVuZ3RoKSB7XG4gICAgdmFyIGJ5dGVMZW5ndGggPSB0aGlzLmJ5dGVMZW5ndGgoKTtcbiAgICB2YXIgcmVxTGVuZ3RoID0gbGVuZ3RoIHx8IE1hdGgubWF4KDEsIGJ5dGVMZW5ndGgpO1xuICAgIGFzc2VydChieXRlTGVuZ3RoIDw9IHJlcUxlbmd0aCwgJ2J5dGUgYXJyYXkgbG9uZ2VyIHRoYW4gZGVzaXJlZCBsZW5ndGgnKTtcbiAgICBhc3NlcnQocmVxTGVuZ3RoID4gMCwgJ1JlcXVlc3RlZCBhcnJheSBsZW5ndGggPD0gMCcpO1xuXG4gICAgdGhpcy5zdHJpcCgpO1xuICAgIHZhciBsaXR0bGVFbmRpYW4gPSBlbmRpYW4gPT09ICdsZSc7XG4gICAgdmFyIHJlcyA9IG5ldyBBcnJheVR5cGUocmVxTGVuZ3RoKTtcblxuICAgIHZhciBiLCBpO1xuICAgIHZhciBxID0gdGhpcy5jbG9uZSgpO1xuICAgIGlmICghbGl0dGxlRW5kaWFuKSB7XG4gICAgICAvLyBBc3N1bWUgYmlnLWVuZGlhblxuICAgICAgZm9yIChpID0gMDsgaSA8IHJlcUxlbmd0aCAtIGJ5dGVMZW5ndGg7IGkrKykge1xuICAgICAgICByZXNbaV0gPSAwO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGkgPSAwOyAhcS5pc1plcm8oKTsgaSsrKSB7XG4gICAgICAgIGIgPSBxLmFuZGxuKDB4ZmYpO1xuICAgICAgICBxLml1c2hybig4KTtcblxuICAgICAgICByZXNbcmVxTGVuZ3RoIC0gaSAtIDFdID0gYjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChpID0gMDsgIXEuaXNaZXJvKCk7IGkrKykge1xuICAgICAgICBiID0gcS5hbmRsbigweGZmKTtcbiAgICAgICAgcS5pdXNocm4oOCk7XG5cbiAgICAgICAgcmVzW2ldID0gYjtcbiAgICAgIH1cblxuICAgICAgZm9yICg7IGkgPCByZXFMZW5ndGg7IGkrKykge1xuICAgICAgICByZXNbaV0gPSAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH07XG5cbiAgaWYgKE1hdGguY2x6MzIpIHtcbiAgICBCTi5wcm90b3R5cGUuX2NvdW50Qml0cyA9IGZ1bmN0aW9uIF9jb3VudEJpdHMgKHcpIHtcbiAgICAgIHJldHVybiAzMiAtIE1hdGguY2x6MzIodyk7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBCTi5wcm90b3R5cGUuX2NvdW50Qml0cyA9IGZ1bmN0aW9uIF9jb3VudEJpdHMgKHcpIHtcbiAgICAgIHZhciB0ID0gdztcbiAgICAgIHZhciByID0gMDtcbiAgICAgIGlmICh0ID49IDB4MTAwMCkge1xuICAgICAgICByICs9IDEzO1xuICAgICAgICB0ID4+Pj0gMTM7XG4gICAgICB9XG4gICAgICBpZiAodCA+PSAweDQwKSB7XG4gICAgICAgIHIgKz0gNztcbiAgICAgICAgdCA+Pj49IDc7XG4gICAgICB9XG4gICAgICBpZiAodCA+PSAweDgpIHtcbiAgICAgICAgciArPSA0O1xuICAgICAgICB0ID4+Pj0gNDtcbiAgICAgIH1cbiAgICAgIGlmICh0ID49IDB4MDIpIHtcbiAgICAgICAgciArPSAyO1xuICAgICAgICB0ID4+Pj0gMjtcbiAgICAgIH1cbiAgICAgIHJldHVybiByICsgdDtcbiAgICB9O1xuICB9XG5cbiAgQk4ucHJvdG90eXBlLl96ZXJvQml0cyA9IGZ1bmN0aW9uIF96ZXJvQml0cyAodykge1xuICAgIC8vIFNob3J0LWN1dFxuICAgIGlmICh3ID09PSAwKSByZXR1cm4gMjY7XG5cbiAgICB2YXIgdCA9IHc7XG4gICAgdmFyIHIgPSAwO1xuICAgIGlmICgodCAmIDB4MWZmZikgPT09IDApIHtcbiAgICAgIHIgKz0gMTM7XG4gICAgICB0ID4+Pj0gMTM7XG4gICAgfVxuICAgIGlmICgodCAmIDB4N2YpID09PSAwKSB7XG4gICAgICByICs9IDc7XG4gICAgICB0ID4+Pj0gNztcbiAgICB9XG4gICAgaWYgKCh0ICYgMHhmKSA9PT0gMCkge1xuICAgICAgciArPSA0O1xuICAgICAgdCA+Pj49IDQ7XG4gICAgfVxuICAgIGlmICgodCAmIDB4MykgPT09IDApIHtcbiAgICAgIHIgKz0gMjtcbiAgICAgIHQgPj4+PSAyO1xuICAgIH1cbiAgICBpZiAoKHQgJiAweDEpID09PSAwKSB7XG4gICAgICByKys7XG4gICAgfVxuICAgIHJldHVybiByO1xuICB9O1xuXG4gIC8vIFJldHVybiBudW1iZXIgb2YgdXNlZCBiaXRzIGluIGEgQk5cbiAgQk4ucHJvdG90eXBlLmJpdExlbmd0aCA9IGZ1bmN0aW9uIGJpdExlbmd0aCAoKSB7XG4gICAgdmFyIHcgPSB0aGlzLndvcmRzW3RoaXMubGVuZ3RoIC0gMV07XG4gICAgdmFyIGhpID0gdGhpcy5fY291bnRCaXRzKHcpO1xuICAgIHJldHVybiAodGhpcy5sZW5ndGggLSAxKSAqIDI2ICsgaGk7XG4gIH07XG5cbiAgZnVuY3Rpb24gdG9CaXRBcnJheSAobnVtKSB7XG4gICAgdmFyIHcgPSBuZXcgQXJyYXkobnVtLmJpdExlbmd0aCgpKTtcblxuICAgIGZvciAodmFyIGJpdCA9IDA7IGJpdCA8IHcubGVuZ3RoOyBiaXQrKykge1xuICAgICAgdmFyIG9mZiA9IChiaXQgLyAyNikgfCAwO1xuICAgICAgdmFyIHdiaXQgPSBiaXQgJSAyNjtcblxuICAgICAgd1tiaXRdID0gKG51bS53b3Jkc1tvZmZdICYgKDEgPDwgd2JpdCkpID4+PiB3Yml0O1xuICAgIH1cblxuICAgIHJldHVybiB3O1xuICB9XG5cbiAgLy8gTnVtYmVyIG9mIHRyYWlsaW5nIHplcm8gYml0c1xuICBCTi5wcm90b3R5cGUuemVyb0JpdHMgPSBmdW5jdGlvbiB6ZXJvQml0cyAoKSB7XG4gICAgaWYgKHRoaXMuaXNaZXJvKCkpIHJldHVybiAwO1xuXG4gICAgdmFyIHIgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGIgPSB0aGlzLl96ZXJvQml0cyh0aGlzLndvcmRzW2ldKTtcbiAgICAgIHIgKz0gYjtcbiAgICAgIGlmIChiICE9PSAyNikgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiByO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5ieXRlTGVuZ3RoID0gZnVuY3Rpb24gYnl0ZUxlbmd0aCAoKSB7XG4gICAgcmV0dXJuIE1hdGguY2VpbCh0aGlzLmJpdExlbmd0aCgpIC8gOCk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLnRvVHdvcyA9IGZ1bmN0aW9uIHRvVHdvcyAod2lkdGgpIHtcbiAgICBpZiAodGhpcy5uZWdhdGl2ZSAhPT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuYWJzKCkuaW5vdG4od2lkdGgpLmlhZGRuKDEpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5mcm9tVHdvcyA9IGZ1bmN0aW9uIGZyb21Ud29zICh3aWR0aCkge1xuICAgIGlmICh0aGlzLnRlc3RuKHdpZHRoIC0gMSkpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vdG4od2lkdGgpLmlhZGRuKDEpLmluZWcoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoKTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUuaXNOZWcgPSBmdW5jdGlvbiBpc05lZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMubmVnYXRpdmUgIT09IDA7XG4gIH07XG5cbiAgLy8gUmV0dXJuIG5lZ2F0aXZlIGNsb25lIG9mIGB0aGlzYFxuICBCTi5wcm90b3R5cGUubmVnID0gZnVuY3Rpb24gbmVnICgpIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLmluZWcoKTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUuaW5lZyA9IGZ1bmN0aW9uIGluZWcgKCkge1xuICAgIGlmICghdGhpcy5pc1plcm8oKSkge1xuICAgICAgdGhpcy5uZWdhdGl2ZSBePSAxO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIE9yIGBudW1gIHdpdGggYHRoaXNgIGluLXBsYWNlXG4gIEJOLnByb3RvdHlwZS5pdW9yID0gZnVuY3Rpb24gaXVvciAobnVtKSB7XG4gICAgd2hpbGUgKHRoaXMubGVuZ3RoIDwgbnVtLmxlbmd0aCkge1xuICAgICAgdGhpcy53b3Jkc1t0aGlzLmxlbmd0aCsrXSA9IDA7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW0ubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMud29yZHNbaV0gPSB0aGlzLndvcmRzW2ldIHwgbnVtLndvcmRzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnN0cmlwKCk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLmlvciA9IGZ1bmN0aW9uIGlvciAobnVtKSB7XG4gICAgYXNzZXJ0KCh0aGlzLm5lZ2F0aXZlIHwgbnVtLm5lZ2F0aXZlKSA9PT0gMCk7XG4gICAgcmV0dXJuIHRoaXMuaXVvcihudW0pO1xuICB9O1xuXG4gIC8vIE9yIGBudW1gIHdpdGggYHRoaXNgXG4gIEJOLnByb3RvdHlwZS5vciA9IGZ1bmN0aW9uIG9yIChudW0pIHtcbiAgICBpZiAodGhpcy5sZW5ndGggPiBudW0ubGVuZ3RoKSByZXR1cm4gdGhpcy5jbG9uZSgpLmlvcihudW0pO1xuICAgIHJldHVybiBudW0uY2xvbmUoKS5pb3IodGhpcyk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLnVvciA9IGZ1bmN0aW9uIHVvciAobnVtKSB7XG4gICAgaWYgKHRoaXMubGVuZ3RoID4gbnVtLmxlbmd0aCkgcmV0dXJuIHRoaXMuY2xvbmUoKS5pdW9yKG51bSk7XG4gICAgcmV0dXJuIG51bS5jbG9uZSgpLml1b3IodGhpcyk7XG4gIH07XG5cbiAgLy8gQW5kIGBudW1gIHdpdGggYHRoaXNgIGluLXBsYWNlXG4gIEJOLnByb3RvdHlwZS5pdWFuZCA9IGZ1bmN0aW9uIGl1YW5kIChudW0pIHtcbiAgICAvLyBiID0gbWluLWxlbmd0aChudW0sIHRoaXMpXG4gICAgdmFyIGI7XG4gICAgaWYgKHRoaXMubGVuZ3RoID4gbnVtLmxlbmd0aCkge1xuICAgICAgYiA9IG51bTtcbiAgICB9IGVsc2Uge1xuICAgICAgYiA9IHRoaXM7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLndvcmRzW2ldID0gdGhpcy53b3Jkc1tpXSAmIG51bS53b3Jkc1tpXTtcbiAgICB9XG5cbiAgICB0aGlzLmxlbmd0aCA9IGIubGVuZ3RoO1xuXG4gICAgcmV0dXJuIHRoaXMuc3RyaXAoKTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUuaWFuZCA9IGZ1bmN0aW9uIGlhbmQgKG51bSkge1xuICAgIGFzc2VydCgodGhpcy5uZWdhdGl2ZSB8IG51bS5uZWdhdGl2ZSkgPT09IDApO1xuICAgIHJldHVybiB0aGlzLml1YW5kKG51bSk7XG4gIH07XG5cbiAgLy8gQW5kIGBudW1gIHdpdGggYHRoaXNgXG4gIEJOLnByb3RvdHlwZS5hbmQgPSBmdW5jdGlvbiBhbmQgKG51bSkge1xuICAgIGlmICh0aGlzLmxlbmd0aCA+IG51bS5sZW5ndGgpIHJldHVybiB0aGlzLmNsb25lKCkuaWFuZChudW0pO1xuICAgIHJldHVybiBudW0uY2xvbmUoKS5pYW5kKHRoaXMpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS51YW5kID0gZnVuY3Rpb24gdWFuZCAobnVtKSB7XG4gICAgaWYgKHRoaXMubGVuZ3RoID4gbnVtLmxlbmd0aCkgcmV0dXJuIHRoaXMuY2xvbmUoKS5pdWFuZChudW0pO1xuICAgIHJldHVybiBudW0uY2xvbmUoKS5pdWFuZCh0aGlzKTtcbiAgfTtcblxuICAvLyBYb3IgYG51bWAgd2l0aCBgdGhpc2AgaW4tcGxhY2VcbiAgQk4ucHJvdG90eXBlLml1eG9yID0gZnVuY3Rpb24gaXV4b3IgKG51bSkge1xuICAgIC8vIGEubGVuZ3RoID4gYi5sZW5ndGhcbiAgICB2YXIgYTtcbiAgICB2YXIgYjtcbiAgICBpZiAodGhpcy5sZW5ndGggPiBudW0ubGVuZ3RoKSB7XG4gICAgICBhID0gdGhpcztcbiAgICAgIGIgPSBudW07XG4gICAgfSBlbHNlIHtcbiAgICAgIGEgPSBudW07XG4gICAgICBiID0gdGhpcztcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMud29yZHNbaV0gPSBhLndvcmRzW2ldIF4gYi53b3Jkc1tpXTtcbiAgICB9XG5cbiAgICBpZiAodGhpcyAhPT0gYSkge1xuICAgICAgZm9yICg7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMud29yZHNbaV0gPSBhLndvcmRzW2ldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubGVuZ3RoID0gYS5sZW5ndGg7XG5cbiAgICByZXR1cm4gdGhpcy5zdHJpcCgpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5peG9yID0gZnVuY3Rpb24gaXhvciAobnVtKSB7XG4gICAgYXNzZXJ0KCh0aGlzLm5lZ2F0aXZlIHwgbnVtLm5lZ2F0aXZlKSA9PT0gMCk7XG4gICAgcmV0dXJuIHRoaXMuaXV4b3IobnVtKTtcbiAgfTtcblxuICAvLyBYb3IgYG51bWAgd2l0aCBgdGhpc2BcbiAgQk4ucHJvdG90eXBlLnhvciA9IGZ1bmN0aW9uIHhvciAobnVtKSB7XG4gICAgaWYgKHRoaXMubGVuZ3RoID4gbnVtLmxlbmd0aCkgcmV0dXJuIHRoaXMuY2xvbmUoKS5peG9yKG51bSk7XG4gICAgcmV0dXJuIG51bS5jbG9uZSgpLml4b3IodGhpcyk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLnV4b3IgPSBmdW5jdGlvbiB1eG9yIChudW0pIHtcbiAgICBpZiAodGhpcy5sZW5ndGggPiBudW0ubGVuZ3RoKSByZXR1cm4gdGhpcy5jbG9uZSgpLml1eG9yKG51bSk7XG4gICAgcmV0dXJuIG51bS5jbG9uZSgpLml1eG9yKHRoaXMpO1xuICB9O1xuXG4gIC8vIE5vdCBgYHRoaXNgYCB3aXRoIGBgd2lkdGhgYCBiaXR3aWR0aFxuICBCTi5wcm90b3R5cGUuaW5vdG4gPSBmdW5jdGlvbiBpbm90biAod2lkdGgpIHtcbiAgICBhc3NlcnQodHlwZW9mIHdpZHRoID09PSAnbnVtYmVyJyAmJiB3aWR0aCA+PSAwKTtcblxuICAgIHZhciBieXRlc05lZWRlZCA9IE1hdGguY2VpbCh3aWR0aCAvIDI2KSB8IDA7XG4gICAgdmFyIGJpdHNMZWZ0ID0gd2lkdGggJSAyNjtcblxuICAgIC8vIEV4dGVuZCB0aGUgYnVmZmVyIHdpdGggbGVhZGluZyB6ZXJvZXNcbiAgICB0aGlzLl9leHBhbmQoYnl0ZXNOZWVkZWQpO1xuXG4gICAgaWYgKGJpdHNMZWZ0ID4gMCkge1xuICAgICAgYnl0ZXNOZWVkZWQtLTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgY29tcGxldGUgd29yZHNcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzTmVlZGVkOyBpKyspIHtcbiAgICAgIHRoaXMud29yZHNbaV0gPSB+dGhpcy53b3Jkc1tpXSAmIDB4M2ZmZmZmZjtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgdGhlIHJlc2lkdWVcbiAgICBpZiAoYml0c0xlZnQgPiAwKSB7XG4gICAgICB0aGlzLndvcmRzW2ldID0gfnRoaXMud29yZHNbaV0gJiAoMHgzZmZmZmZmID4+ICgyNiAtIGJpdHNMZWZ0KSk7XG4gICAgfVxuXG4gICAgLy8gQW5kIHJlbW92ZSBsZWFkaW5nIHplcm9lc1xuICAgIHJldHVybiB0aGlzLnN0cmlwKCk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLm5vdG4gPSBmdW5jdGlvbiBub3RuICh3aWR0aCkge1xuICAgIHJldHVybiB0aGlzLmNsb25lKCkuaW5vdG4od2lkdGgpO1xuICB9O1xuXG4gIC8vIFNldCBgYml0YCBvZiBgdGhpc2BcbiAgQk4ucHJvdG90eXBlLnNldG4gPSBmdW5jdGlvbiBzZXRuIChiaXQsIHZhbCkge1xuICAgIGFzc2VydCh0eXBlb2YgYml0ID09PSAnbnVtYmVyJyAmJiBiaXQgPj0gMCk7XG5cbiAgICB2YXIgb2ZmID0gKGJpdCAvIDI2KSB8IDA7XG4gICAgdmFyIHdiaXQgPSBiaXQgJSAyNjtcblxuICAgIHRoaXMuX2V4cGFuZChvZmYgKyAxKTtcblxuICAgIGlmICh2YWwpIHtcbiAgICAgIHRoaXMud29yZHNbb2ZmXSA9IHRoaXMud29yZHNbb2ZmXSB8ICgxIDw8IHdiaXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLndvcmRzW29mZl0gPSB0aGlzLndvcmRzW29mZl0gJiB+KDEgPDwgd2JpdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuc3RyaXAoKTtcbiAgfTtcblxuICAvLyBBZGQgYG51bWAgdG8gYHRoaXNgIGluLXBsYWNlXG4gIEJOLnByb3RvdHlwZS5pYWRkID0gZnVuY3Rpb24gaWFkZCAobnVtKSB7XG4gICAgdmFyIHI7XG5cbiAgICAvLyBuZWdhdGl2ZSArIHBvc2l0aXZlXG4gICAgaWYgKHRoaXMubmVnYXRpdmUgIT09IDAgJiYgbnVtLm5lZ2F0aXZlID09PSAwKSB7XG4gICAgICB0aGlzLm5lZ2F0aXZlID0gMDtcbiAgICAgIHIgPSB0aGlzLmlzdWIobnVtKTtcbiAgICAgIHRoaXMubmVnYXRpdmUgXj0gMTtcbiAgICAgIHJldHVybiB0aGlzLl9ub3JtU2lnbigpO1xuXG4gICAgLy8gcG9zaXRpdmUgKyBuZWdhdGl2ZVxuICAgIH0gZWxzZSBpZiAodGhpcy5uZWdhdGl2ZSA9PT0gMCAmJiBudW0ubmVnYXRpdmUgIT09IDApIHtcbiAgICAgIG51bS5uZWdhdGl2ZSA9IDA7XG4gICAgICByID0gdGhpcy5pc3ViKG51bSk7XG4gICAgICBudW0ubmVnYXRpdmUgPSAxO1xuICAgICAgcmV0dXJuIHIuX25vcm1TaWduKCk7XG4gICAgfVxuXG4gICAgLy8gYS5sZW5ndGggPiBiLmxlbmd0aFxuICAgIHZhciBhLCBiO1xuICAgIGlmICh0aGlzLmxlbmd0aCA+IG51bS5sZW5ndGgpIHtcbiAgICAgIGEgPSB0aGlzO1xuICAgICAgYiA9IG51bTtcbiAgICB9IGVsc2Uge1xuICAgICAgYSA9IG51bTtcbiAgICAgIGIgPSB0aGlzO1xuICAgIH1cblxuICAgIHZhciBjYXJyeSA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gICAgICByID0gKGEud29yZHNbaV0gfCAwKSArIChiLndvcmRzW2ldIHwgMCkgKyBjYXJyeTtcbiAgICAgIHRoaXMud29yZHNbaV0gPSByICYgMHgzZmZmZmZmO1xuICAgICAgY2FycnkgPSByID4+PiAyNjtcbiAgICB9XG4gICAgZm9yICg7IGNhcnJ5ICE9PSAwICYmIGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICByID0gKGEud29yZHNbaV0gfCAwKSArIGNhcnJ5O1xuICAgICAgdGhpcy53b3Jkc1tpXSA9IHIgJiAweDNmZmZmZmY7XG4gICAgICBjYXJyeSA9IHIgPj4+IDI2O1xuICAgIH1cblxuICAgIHRoaXMubGVuZ3RoID0gYS5sZW5ndGg7XG4gICAgaWYgKGNhcnJ5ICE9PSAwKSB7XG4gICAgICB0aGlzLndvcmRzW3RoaXMubGVuZ3RoXSA9IGNhcnJ5O1xuICAgICAgdGhpcy5sZW5ndGgrKztcbiAgICAvLyBDb3B5IHRoZSByZXN0IG9mIHRoZSB3b3Jkc1xuICAgIH0gZWxzZSBpZiAoYSAhPT0gdGhpcykge1xuICAgICAgZm9yICg7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMud29yZHNbaV0gPSBhLndvcmRzW2ldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIEFkZCBgbnVtYCB0byBgdGhpc2BcbiAgQk4ucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZCAobnVtKSB7XG4gICAgdmFyIHJlcztcbiAgICBpZiAobnVtLm5lZ2F0aXZlICE9PSAwICYmIHRoaXMubmVnYXRpdmUgPT09IDApIHtcbiAgICAgIG51bS5uZWdhdGl2ZSA9IDA7XG4gICAgICByZXMgPSB0aGlzLnN1YihudW0pO1xuICAgICAgbnVtLm5lZ2F0aXZlIF49IDE7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0gZWxzZSBpZiAobnVtLm5lZ2F0aXZlID09PSAwICYmIHRoaXMubmVnYXRpdmUgIT09IDApIHtcbiAgICAgIHRoaXMubmVnYXRpdmUgPSAwO1xuICAgICAgcmVzID0gbnVtLnN1Yih0aGlzKTtcbiAgICAgIHRoaXMubmVnYXRpdmUgPSAxO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5sZW5ndGggPiBudW0ubGVuZ3RoKSByZXR1cm4gdGhpcy5jbG9uZSgpLmlhZGQobnVtKTtcblxuICAgIHJldHVybiBudW0uY2xvbmUoKS5pYWRkKHRoaXMpO1xuICB9O1xuXG4gIC8vIFN1YnRyYWN0IGBudW1gIGZyb20gYHRoaXNgIGluLXBsYWNlXG4gIEJOLnByb3RvdHlwZS5pc3ViID0gZnVuY3Rpb24gaXN1YiAobnVtKSB7XG4gICAgLy8gdGhpcyAtICgtbnVtKSA9IHRoaXMgKyBudW1cbiAgICBpZiAobnVtLm5lZ2F0aXZlICE9PSAwKSB7XG4gICAgICBudW0ubmVnYXRpdmUgPSAwO1xuICAgICAgdmFyIHIgPSB0aGlzLmlhZGQobnVtKTtcbiAgICAgIG51bS5uZWdhdGl2ZSA9IDE7XG4gICAgICByZXR1cm4gci5fbm9ybVNpZ24oKTtcblxuICAgIC8vIC10aGlzIC0gbnVtID0gLSh0aGlzICsgbnVtKVxuICAgIH0gZWxzZSBpZiAodGhpcy5uZWdhdGl2ZSAhPT0gMCkge1xuICAgICAgdGhpcy5uZWdhdGl2ZSA9IDA7XG4gICAgICB0aGlzLmlhZGQobnVtKTtcbiAgICAgIHRoaXMubmVnYXRpdmUgPSAxO1xuICAgICAgcmV0dXJuIHRoaXMuX25vcm1TaWduKCk7XG4gICAgfVxuXG4gICAgLy8gQXQgdGhpcyBwb2ludCBib3RoIG51bWJlcnMgYXJlIHBvc2l0aXZlXG4gICAgdmFyIGNtcCA9IHRoaXMuY21wKG51bSk7XG5cbiAgICAvLyBPcHRpbWl6YXRpb24gLSB6ZXJvaWZ5XG4gICAgaWYgKGNtcCA9PT0gMCkge1xuICAgICAgdGhpcy5uZWdhdGl2ZSA9IDA7XG4gICAgICB0aGlzLmxlbmd0aCA9IDE7XG4gICAgICB0aGlzLndvcmRzWzBdID0gMDtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIGEgPiBiXG4gICAgdmFyIGEsIGI7XG4gICAgaWYgKGNtcCA+IDApIHtcbiAgICAgIGEgPSB0aGlzO1xuICAgICAgYiA9IG51bTtcbiAgICB9IGVsc2Uge1xuICAgICAgYSA9IG51bTtcbiAgICAgIGIgPSB0aGlzO1xuICAgIH1cblxuICAgIHZhciBjYXJyeSA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gICAgICByID0gKGEud29yZHNbaV0gfCAwKSAtIChiLndvcmRzW2ldIHwgMCkgKyBjYXJyeTtcbiAgICAgIGNhcnJ5ID0gciA+PiAyNjtcbiAgICAgIHRoaXMud29yZHNbaV0gPSByICYgMHgzZmZmZmZmO1xuICAgIH1cbiAgICBmb3IgKDsgY2FycnkgIT09IDAgJiYgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIHIgPSAoYS53b3Jkc1tpXSB8IDApICsgY2Fycnk7XG4gICAgICBjYXJyeSA9IHIgPj4gMjY7XG4gICAgICB0aGlzLndvcmRzW2ldID0gciAmIDB4M2ZmZmZmZjtcbiAgICB9XG5cbiAgICAvLyBDb3B5IHJlc3Qgb2YgdGhlIHdvcmRzXG4gICAgaWYgKGNhcnJ5ID09PSAwICYmIGkgPCBhLmxlbmd0aCAmJiBhICE9PSB0aGlzKSB7XG4gICAgICBmb3IgKDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy53b3Jkc1tpXSA9IGEud29yZHNbaV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5sZW5ndGggPSBNYXRoLm1heCh0aGlzLmxlbmd0aCwgaSk7XG5cbiAgICBpZiAoYSAhPT0gdGhpcykge1xuICAgICAgdGhpcy5uZWdhdGl2ZSA9IDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuc3RyaXAoKTtcbiAgfTtcblxuICAvLyBTdWJ0cmFjdCBgbnVtYCBmcm9tIGB0aGlzYFxuICBCTi5wcm90b3R5cGUuc3ViID0gZnVuY3Rpb24gc3ViIChudW0pIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLmlzdWIobnVtKTtcbiAgfTtcblxuICBmdW5jdGlvbiBzbWFsbE11bFRvIChzZWxmLCBudW0sIG91dCkge1xuICAgIG91dC5uZWdhdGl2ZSA9IG51bS5uZWdhdGl2ZSBeIHNlbGYubmVnYXRpdmU7XG4gICAgdmFyIGxlbiA9IChzZWxmLmxlbmd0aCArIG51bS5sZW5ndGgpIHwgMDtcbiAgICBvdXQubGVuZ3RoID0gbGVuO1xuICAgIGxlbiA9IChsZW4gLSAxKSB8IDA7XG5cbiAgICAvLyBQZWVsIG9uZSBpdGVyYXRpb24gKGNvbXBpbGVyIGNhbid0IGRvIGl0LCBiZWNhdXNlIG9mIGNvZGUgY29tcGxleGl0eSlcbiAgICB2YXIgYSA9IHNlbGYud29yZHNbMF0gfCAwO1xuICAgIHZhciBiID0gbnVtLndvcmRzWzBdIHwgMDtcbiAgICB2YXIgciA9IGEgKiBiO1xuXG4gICAgdmFyIGxvID0gciAmIDB4M2ZmZmZmZjtcbiAgICB2YXIgY2FycnkgPSAociAvIDB4NDAwMDAwMCkgfCAwO1xuICAgIG91dC53b3Jkc1swXSA9IGxvO1xuXG4gICAgZm9yICh2YXIgayA9IDE7IGsgPCBsZW47IGsrKykge1xuICAgICAgLy8gU3VtIGFsbCB3b3JkcyB3aXRoIHRoZSBzYW1lIGBpICsgaiA9IGtgIGFuZCBhY2N1bXVsYXRlIGBuY2FycnlgLFxuICAgICAgLy8gbm90ZSB0aGF0IG5jYXJyeSBjb3VsZCBiZSA+PSAweDNmZmZmZmZcbiAgICAgIHZhciBuY2FycnkgPSBjYXJyeSA+Pj4gMjY7XG4gICAgICB2YXIgcndvcmQgPSBjYXJyeSAmIDB4M2ZmZmZmZjtcbiAgICAgIHZhciBtYXhKID0gTWF0aC5taW4oaywgbnVtLmxlbmd0aCAtIDEpO1xuICAgICAgZm9yICh2YXIgaiA9IE1hdGgubWF4KDAsIGsgLSBzZWxmLmxlbmd0aCArIDEpOyBqIDw9IG1heEo7IGorKykge1xuICAgICAgICB2YXIgaSA9IChrIC0gaikgfCAwO1xuICAgICAgICBhID0gc2VsZi53b3Jkc1tpXSB8IDA7XG4gICAgICAgIGIgPSBudW0ud29yZHNbal0gfCAwO1xuICAgICAgICByID0gYSAqIGIgKyByd29yZDtcbiAgICAgICAgbmNhcnJ5ICs9IChyIC8gMHg0MDAwMDAwKSB8IDA7XG4gICAgICAgIHJ3b3JkID0gciAmIDB4M2ZmZmZmZjtcbiAgICAgIH1cbiAgICAgIG91dC53b3Jkc1trXSA9IHJ3b3JkIHwgMDtcbiAgICAgIGNhcnJ5ID0gbmNhcnJ5IHwgMDtcbiAgICB9XG4gICAgaWYgKGNhcnJ5ICE9PSAwKSB7XG4gICAgICBvdXQud29yZHNba10gPSBjYXJyeSB8IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dC5sZW5ndGgtLTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0LnN0cmlwKCk7XG4gIH1cblxuICAvLyBUT0RPKGluZHV0bnkpOiBpdCBtYXkgYmUgcmVhc29uYWJsZSB0byBvbWl0IGl0IGZvciB1c2VycyB3aG8gZG9uJ3QgbmVlZFxuICAvLyB0byB3b3JrIHdpdGggMjU2LWJpdCBudW1iZXJzLCBvdGhlcndpc2UgaXQgZ2l2ZXMgMjAlIGltcHJvdmVtZW50IGZvciAyNTYtYml0XG4gIC8vIG11bHRpcGxpY2F0aW9uIChsaWtlIGVsbGlwdGljIHNlY3AyNTZrMSkuXG4gIHZhciBjb21iMTBNdWxUbyA9IGZ1bmN0aW9uIGNvbWIxME11bFRvIChzZWxmLCBudW0sIG91dCkge1xuICAgIHZhciBhID0gc2VsZi53b3JkcztcbiAgICB2YXIgYiA9IG51bS53b3JkcztcbiAgICB2YXIgbyA9IG91dC53b3JkcztcbiAgICB2YXIgYyA9IDA7XG4gICAgdmFyIGxvO1xuICAgIHZhciBtaWQ7XG4gICAgdmFyIGhpO1xuICAgIHZhciBhMCA9IGFbMF0gfCAwO1xuICAgIHZhciBhbDAgPSBhMCAmIDB4MWZmZjtcbiAgICB2YXIgYWgwID0gYTAgPj4+IDEzO1xuICAgIHZhciBhMSA9IGFbMV0gfCAwO1xuICAgIHZhciBhbDEgPSBhMSAmIDB4MWZmZjtcbiAgICB2YXIgYWgxID0gYTEgPj4+IDEzO1xuICAgIHZhciBhMiA9IGFbMl0gfCAwO1xuICAgIHZhciBhbDIgPSBhMiAmIDB4MWZmZjtcbiAgICB2YXIgYWgyID0gYTIgPj4+IDEzO1xuICAgIHZhciBhMyA9IGFbM10gfCAwO1xuICAgIHZhciBhbDMgPSBhMyAmIDB4MWZmZjtcbiAgICB2YXIgYWgzID0gYTMgPj4+IDEzO1xuICAgIHZhciBhNCA9IGFbNF0gfCAwO1xuICAgIHZhciBhbDQgPSBhNCAmIDB4MWZmZjtcbiAgICB2YXIgYWg0ID0gYTQgPj4+IDEzO1xuICAgIHZhciBhNSA9IGFbNV0gfCAwO1xuICAgIHZhciBhbDUgPSBhNSAmIDB4MWZmZjtcbiAgICB2YXIgYWg1ID0gYTUgPj4+IDEzO1xuICAgIHZhciBhNiA9IGFbNl0gfCAwO1xuICAgIHZhciBhbDYgPSBhNiAmIDB4MWZmZjtcbiAgICB2YXIgYWg2ID0gYTYgPj4+IDEzO1xuICAgIHZhciBhNyA9IGFbN10gfCAwO1xuICAgIHZhciBhbDcgPSBhNyAmIDB4MWZmZjtcbiAgICB2YXIgYWg3ID0gYTcgPj4+IDEzO1xuICAgIHZhciBhOCA9IGFbOF0gfCAwO1xuICAgIHZhciBhbDggPSBhOCAmIDB4MWZmZjtcbiAgICB2YXIgYWg4ID0gYTggPj4+IDEzO1xuICAgIHZhciBhOSA9IGFbOV0gfCAwO1xuICAgIHZhciBhbDkgPSBhOSAmIDB4MWZmZjtcbiAgICB2YXIgYWg5ID0gYTkgPj4+IDEzO1xuICAgIHZhciBiMCA9IGJbMF0gfCAwO1xuICAgIHZhciBibDAgPSBiMCAmIDB4MWZmZjtcbiAgICB2YXIgYmgwID0gYjAgPj4+IDEzO1xuICAgIHZhciBiMSA9IGJbMV0gfCAwO1xuICAgIHZhciBibDEgPSBiMSAmIDB4MWZmZjtcbiAgICB2YXIgYmgxID0gYjEgPj4+IDEzO1xuICAgIHZhciBiMiA9IGJbMl0gfCAwO1xuICAgIHZhciBibDIgPSBiMiAmIDB4MWZmZjtcbiAgICB2YXIgYmgyID0gYjIgPj4+IDEzO1xuICAgIHZhciBiMyA9IGJbM10gfCAwO1xuICAgIHZhciBibDMgPSBiMyAmIDB4MWZmZjtcbiAgICB2YXIgYmgzID0gYjMgPj4+IDEzO1xuICAgIHZhciBiNCA9IGJbNF0gfCAwO1xuICAgIHZhciBibDQgPSBiNCAmIDB4MWZmZjtcbiAgICB2YXIgYmg0ID0gYjQgPj4+IDEzO1xuICAgIHZhciBiNSA9IGJbNV0gfCAwO1xuICAgIHZhciBibDUgPSBiNSAmIDB4MWZmZjtcbiAgICB2YXIgYmg1ID0gYjUgPj4+IDEzO1xuICAgIHZhciBiNiA9IGJbNl0gfCAwO1xuICAgIHZhciBibDYgPSBiNiAmIDB4MWZmZjtcbiAgICB2YXIgYmg2ID0gYjYgPj4+IDEzO1xuICAgIHZhciBiNyA9IGJbN10gfCAwO1xuICAgIHZhciBibDcgPSBiNyAmIDB4MWZmZjtcbiAgICB2YXIgYmg3ID0gYjcgPj4+IDEzO1xuICAgIHZhciBiOCA9IGJbOF0gfCAwO1xuICAgIHZhciBibDggPSBiOCAmIDB4MWZmZjtcbiAgICB2YXIgYmg4ID0gYjggPj4+IDEzO1xuICAgIHZhciBiOSA9IGJbOV0gfCAwO1xuICAgIHZhciBibDkgPSBiOSAmIDB4MWZmZjtcbiAgICB2YXIgYmg5ID0gYjkgPj4+IDEzO1xuXG4gICAgb3V0Lm5lZ2F0aXZlID0gc2VsZi5uZWdhdGl2ZSBeIG51bS5uZWdhdGl2ZTtcbiAgICBvdXQubGVuZ3RoID0gMTk7XG4gICAgLyogayA9IDAgKi9cbiAgICBsbyA9IE1hdGguaW11bChhbDAsIGJsMCk7XG4gICAgbWlkID0gTWF0aC5pbXVsKGFsMCwgYmgwKTtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMCwgYmwwKSkgfCAwO1xuICAgIGhpID0gTWF0aC5pbXVsKGFoMCwgYmgwKTtcbiAgICB2YXIgdzAgPSAoKChjICsgbG8pIHwgMCkgKyAoKG1pZCAmIDB4MWZmZikgPDwgMTMpKSB8IDA7XG4gICAgYyA9ICgoKGhpICsgKG1pZCA+Pj4gMTMpKSB8IDApICsgKHcwID4+PiAyNikpIHwgMDtcbiAgICB3MCAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDEgKi9cbiAgICBsbyA9IE1hdGguaW11bChhbDEsIGJsMCk7XG4gICAgbWlkID0gTWF0aC5pbXVsKGFsMSwgYmgwKTtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMSwgYmwwKSkgfCAwO1xuICAgIGhpID0gTWF0aC5pbXVsKGFoMSwgYmgwKTtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDAsIGJsMSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMCwgYmgxKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgwLCBibDEpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgwLCBiaDEpKSB8IDA7XG4gICAgdmFyIHcxID0gKCgoYyArIGxvKSB8IDApICsgKChtaWQgJiAweDFmZmYpIDw8IDEzKSkgfCAwO1xuICAgIGMgPSAoKChoaSArIChtaWQgPj4+IDEzKSkgfCAwKSArICh3MSA+Pj4gMjYpKSB8IDA7XG4gICAgdzEgJj0gMHgzZmZmZmZmO1xuICAgIC8qIGsgPSAyICovXG4gICAgbG8gPSBNYXRoLmltdWwoYWwyLCBibDApO1xuICAgIG1pZCA9IE1hdGguaW11bChhbDIsIGJoMCk7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDIsIGJsMCkpIHwgMDtcbiAgICBoaSA9IE1hdGguaW11bChhaDIsIGJoMCk7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWwxLCBibDEpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDEsIGJoMSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMSwgYmwxKSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoMSwgYmgxKSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMCwgYmwyKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwwLCBiaDIpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDAsIGJsMikpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDAsIGJoMikpIHwgMDtcbiAgICB2YXIgdzIgPSAoKChjICsgbG8pIHwgMCkgKyAoKG1pZCAmIDB4MWZmZikgPDwgMTMpKSB8IDA7XG4gICAgYyA9ICgoKGhpICsgKG1pZCA+Pj4gMTMpKSB8IDApICsgKHcyID4+PiAyNikpIHwgMDtcbiAgICB3MiAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDMgKi9cbiAgICBsbyA9IE1hdGguaW11bChhbDMsIGJsMCk7XG4gICAgbWlkID0gTWF0aC5pbXVsKGFsMywgYmgwKTtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMywgYmwwKSkgfCAwO1xuICAgIGhpID0gTWF0aC5pbXVsKGFoMywgYmgwKTtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDIsIGJsMSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMiwgYmgxKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgyLCBibDEpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgyLCBiaDEpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWwxLCBibDIpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDEsIGJoMikpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMSwgYmwyKSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoMSwgYmgyKSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMCwgYmwzKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwwLCBiaDMpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDAsIGJsMykpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDAsIGJoMykpIHwgMDtcbiAgICB2YXIgdzMgPSAoKChjICsgbG8pIHwgMCkgKyAoKG1pZCAmIDB4MWZmZikgPDwgMTMpKSB8IDA7XG4gICAgYyA9ICgoKGhpICsgKG1pZCA+Pj4gMTMpKSB8IDApICsgKHczID4+PiAyNikpIHwgMDtcbiAgICB3MyAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDQgKi9cbiAgICBsbyA9IE1hdGguaW11bChhbDQsIGJsMCk7XG4gICAgbWlkID0gTWF0aC5pbXVsKGFsNCwgYmgwKTtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNCwgYmwwKSkgfCAwO1xuICAgIGhpID0gTWF0aC5pbXVsKGFoNCwgYmgwKTtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDMsIGJsMSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMywgYmgxKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgzLCBibDEpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgzLCBiaDEpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWwyLCBibDIpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDIsIGJoMikpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMiwgYmwyKSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoMiwgYmgyKSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMSwgYmwzKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwxLCBiaDMpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDEsIGJsMykpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDEsIGJoMykpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDAsIGJsNCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMCwgYmg0KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgwLCBibDQpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgwLCBiaDQpKSB8IDA7XG4gICAgdmFyIHc0ID0gKCgoYyArIGxvKSB8IDApICsgKChtaWQgJiAweDFmZmYpIDw8IDEzKSkgfCAwO1xuICAgIGMgPSAoKChoaSArIChtaWQgPj4+IDEzKSkgfCAwKSArICh3NCA+Pj4gMjYpKSB8IDA7XG4gICAgdzQgJj0gMHgzZmZmZmZmO1xuICAgIC8qIGsgPSA1ICovXG4gICAgbG8gPSBNYXRoLmltdWwoYWw1LCBibDApO1xuICAgIG1pZCA9IE1hdGguaW11bChhbDUsIGJoMCk7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDUsIGJsMCkpIHwgMDtcbiAgICBoaSA9IE1hdGguaW11bChhaDUsIGJoMCk7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw0LCBibDEpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDQsIGJoMSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNCwgYmwxKSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNCwgYmgxKSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMywgYmwyKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwzLCBiaDIpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDMsIGJsMikpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDMsIGJoMikpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDIsIGJsMykpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMiwgYmgzKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgyLCBibDMpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgyLCBiaDMpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWwxLCBibDQpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDEsIGJoNCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMSwgYmw0KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoMSwgYmg0KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMCwgYmw1KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwwLCBiaDUpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDAsIGJsNSkpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDAsIGJoNSkpIHwgMDtcbiAgICB2YXIgdzUgPSAoKChjICsgbG8pIHwgMCkgKyAoKG1pZCAmIDB4MWZmZikgPDwgMTMpKSB8IDA7XG4gICAgYyA9ICgoKGhpICsgKG1pZCA+Pj4gMTMpKSB8IDApICsgKHc1ID4+PiAyNikpIHwgMDtcbiAgICB3NSAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDYgKi9cbiAgICBsbyA9IE1hdGguaW11bChhbDYsIGJsMCk7XG4gICAgbWlkID0gTWF0aC5pbXVsKGFsNiwgYmgwKTtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNiwgYmwwKSkgfCAwO1xuICAgIGhpID0gTWF0aC5pbXVsKGFoNiwgYmgwKTtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDUsIGJsMSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsNSwgYmgxKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg1LCBibDEpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg1LCBiaDEpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw0LCBibDIpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDQsIGJoMikpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNCwgYmwyKSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNCwgYmgyKSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMywgYmwzKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwzLCBiaDMpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDMsIGJsMykpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDMsIGJoMykpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDIsIGJsNCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMiwgYmg0KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgyLCBibDQpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgyLCBiaDQpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWwxLCBibDUpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDEsIGJoNSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMSwgYmw1KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoMSwgYmg1KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMCwgYmw2KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwwLCBiaDYpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDAsIGJsNikpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDAsIGJoNikpIHwgMDtcbiAgICB2YXIgdzYgPSAoKChjICsgbG8pIHwgMCkgKyAoKG1pZCAmIDB4MWZmZikgPDwgMTMpKSB8IDA7XG4gICAgYyA9ICgoKGhpICsgKG1pZCA+Pj4gMTMpKSB8IDApICsgKHc2ID4+PiAyNikpIHwgMDtcbiAgICB3NiAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDcgKi9cbiAgICBsbyA9IE1hdGguaW11bChhbDcsIGJsMCk7XG4gICAgbWlkID0gTWF0aC5pbXVsKGFsNywgYmgwKTtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNywgYmwwKSkgfCAwO1xuICAgIGhpID0gTWF0aC5pbXVsKGFoNywgYmgwKTtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDYsIGJsMSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsNiwgYmgxKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg2LCBibDEpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg2LCBiaDEpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw1LCBibDIpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDUsIGJoMikpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNSwgYmwyKSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNSwgYmgyKSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNCwgYmwzKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw0LCBiaDMpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDQsIGJsMykpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDQsIGJoMykpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDMsIGJsNCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMywgYmg0KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgzLCBibDQpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgzLCBiaDQpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWwyLCBibDUpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDIsIGJoNSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMiwgYmw1KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoMiwgYmg1KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMSwgYmw2KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwxLCBiaDYpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDEsIGJsNikpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDEsIGJoNikpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDAsIGJsNykpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMCwgYmg3KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgwLCBibDcpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgwLCBiaDcpKSB8IDA7XG4gICAgdmFyIHc3ID0gKCgoYyArIGxvKSB8IDApICsgKChtaWQgJiAweDFmZmYpIDw8IDEzKSkgfCAwO1xuICAgIGMgPSAoKChoaSArIChtaWQgPj4+IDEzKSkgfCAwKSArICh3NyA+Pj4gMjYpKSB8IDA7XG4gICAgdzcgJj0gMHgzZmZmZmZmO1xuICAgIC8qIGsgPSA4ICovXG4gICAgbG8gPSBNYXRoLmltdWwoYWw4LCBibDApO1xuICAgIG1pZCA9IE1hdGguaW11bChhbDgsIGJoMCk7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDgsIGJsMCkpIHwgMDtcbiAgICBoaSA9IE1hdGguaW11bChhaDgsIGJoMCk7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw3LCBibDEpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDcsIGJoMSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNywgYmwxKSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNywgYmgxKSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNiwgYmwyKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw2LCBiaDIpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDYsIGJsMikpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDYsIGJoMikpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDUsIGJsMykpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsNSwgYmgzKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg1LCBibDMpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg1LCBiaDMpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw0LCBibDQpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDQsIGJoNCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNCwgYmw0KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNCwgYmg0KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMywgYmw1KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwzLCBiaDUpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDMsIGJsNSkpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDMsIGJoNSkpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDIsIGJsNikpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMiwgYmg2KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgyLCBibDYpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgyLCBiaDYpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWwxLCBibDcpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDEsIGJoNykpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMSwgYmw3KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoMSwgYmg3KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMCwgYmw4KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwwLCBiaDgpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDAsIGJsOCkpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDAsIGJoOCkpIHwgMDtcbiAgICB2YXIgdzggPSAoKChjICsgbG8pIHwgMCkgKyAoKG1pZCAmIDB4MWZmZikgPDwgMTMpKSB8IDA7XG4gICAgYyA9ICgoKGhpICsgKG1pZCA+Pj4gMTMpKSB8IDApICsgKHc4ID4+PiAyNikpIHwgMDtcbiAgICB3OCAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDkgKi9cbiAgICBsbyA9IE1hdGguaW11bChhbDksIGJsMCk7XG4gICAgbWlkID0gTWF0aC5pbXVsKGFsOSwgYmgwKTtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoOSwgYmwwKSkgfCAwO1xuICAgIGhpID0gTWF0aC5pbXVsKGFoOSwgYmgwKTtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDgsIGJsMSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsOCwgYmgxKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg4LCBibDEpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg4LCBiaDEpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw3LCBibDIpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDcsIGJoMikpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNywgYmwyKSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNywgYmgyKSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNiwgYmwzKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw2LCBiaDMpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDYsIGJsMykpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDYsIGJoMykpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDUsIGJsNCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsNSwgYmg0KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg1LCBibDQpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg1LCBiaDQpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw0LCBibDUpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDQsIGJoNSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNCwgYmw1KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNCwgYmg1KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMywgYmw2KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwzLCBiaDYpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDMsIGJsNikpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDMsIGJoNikpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDIsIGJsNykpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMiwgYmg3KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgyLCBibDcpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgyLCBiaDcpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWwxLCBibDgpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDEsIGJoOCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMSwgYmw4KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoMSwgYmg4KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMCwgYmw5KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwwLCBiaDkpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDAsIGJsOSkpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDAsIGJoOSkpIHwgMDtcbiAgICB2YXIgdzkgPSAoKChjICsgbG8pIHwgMCkgKyAoKG1pZCAmIDB4MWZmZikgPDwgMTMpKSB8IDA7XG4gICAgYyA9ICgoKGhpICsgKG1pZCA+Pj4gMTMpKSB8IDApICsgKHc5ID4+PiAyNikpIHwgMDtcbiAgICB3OSAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDEwICovXG4gICAgbG8gPSBNYXRoLmltdWwoYWw5LCBibDEpO1xuICAgIG1pZCA9IE1hdGguaW11bChhbDksIGJoMSk7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDksIGJsMSkpIHwgMDtcbiAgICBoaSA9IE1hdGguaW11bChhaDksIGJoMSk7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw4LCBibDIpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDgsIGJoMikpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoOCwgYmwyKSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoOCwgYmgyKSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNywgYmwzKSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw3LCBiaDMpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDcsIGJsMykpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDcsIGJoMykpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDYsIGJsNCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsNiwgYmg0KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg2LCBibDQpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg2LCBiaDQpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw1LCBibDUpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDUsIGJoNSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNSwgYmw1KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNSwgYmg1KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNCwgYmw2KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw0LCBiaDYpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDQsIGJsNikpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDQsIGJoNikpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDMsIGJsNykpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMywgYmg3KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgzLCBibDcpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgzLCBiaDcpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWwyLCBibDgpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDIsIGJoOCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMiwgYmw4KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoMiwgYmg4KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMSwgYmw5KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwxLCBiaDkpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDEsIGJsOSkpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDEsIGJoOSkpIHwgMDtcbiAgICB2YXIgdzEwID0gKCgoYyArIGxvKSB8IDApICsgKChtaWQgJiAweDFmZmYpIDw8IDEzKSkgfCAwO1xuICAgIGMgPSAoKChoaSArIChtaWQgPj4+IDEzKSkgfCAwKSArICh3MTAgPj4+IDI2KSkgfCAwO1xuICAgIHcxMCAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDExICovXG4gICAgbG8gPSBNYXRoLmltdWwoYWw5LCBibDIpO1xuICAgIG1pZCA9IE1hdGguaW11bChhbDksIGJoMik7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDksIGJsMikpIHwgMDtcbiAgICBoaSA9IE1hdGguaW11bChhaDksIGJoMik7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw4LCBibDMpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDgsIGJoMykpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoOCwgYmwzKSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoOCwgYmgzKSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNywgYmw0KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw3LCBiaDQpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDcsIGJsNCkpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDcsIGJoNCkpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDYsIGJsNSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsNiwgYmg1KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg2LCBibDUpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg2LCBiaDUpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw1LCBibDYpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDUsIGJoNikpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNSwgYmw2KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNSwgYmg2KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNCwgYmw3KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw0LCBiaDcpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDQsIGJsNykpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDQsIGJoNykpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDMsIGJsOCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsMywgYmg4KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWgzLCBibDgpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWgzLCBiaDgpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWwyLCBibDkpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDIsIGJoOSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoMiwgYmw5KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoMiwgYmg5KSkgfCAwO1xuICAgIHZhciB3MTEgPSAoKChjICsgbG8pIHwgMCkgKyAoKG1pZCAmIDB4MWZmZikgPDwgMTMpKSB8IDA7XG4gICAgYyA9ICgoKGhpICsgKG1pZCA+Pj4gMTMpKSB8IDApICsgKHcxMSA+Pj4gMjYpKSB8IDA7XG4gICAgdzExICY9IDB4M2ZmZmZmZjtcbiAgICAvKiBrID0gMTIgKi9cbiAgICBsbyA9IE1hdGguaW11bChhbDksIGJsMyk7XG4gICAgbWlkID0gTWF0aC5pbXVsKGFsOSwgYmgzKTtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoOSwgYmwzKSkgfCAwO1xuICAgIGhpID0gTWF0aC5pbXVsKGFoOSwgYmgzKTtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDgsIGJsNCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsOCwgYmg0KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg4LCBibDQpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg4LCBiaDQpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw3LCBibDUpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDcsIGJoNSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNywgYmw1KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNywgYmg1KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNiwgYmw2KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw2LCBiaDYpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDYsIGJsNikpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDYsIGJoNikpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDUsIGJsNykpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsNSwgYmg3KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg1LCBibDcpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg1LCBiaDcpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw0LCBibDgpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDQsIGJoOCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNCwgYmw4KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNCwgYmg4KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsMywgYmw5KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWwzLCBiaDkpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDMsIGJsOSkpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDMsIGJoOSkpIHwgMDtcbiAgICB2YXIgdzEyID0gKCgoYyArIGxvKSB8IDApICsgKChtaWQgJiAweDFmZmYpIDw8IDEzKSkgfCAwO1xuICAgIGMgPSAoKChoaSArIChtaWQgPj4+IDEzKSkgfCAwKSArICh3MTIgPj4+IDI2KSkgfCAwO1xuICAgIHcxMiAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDEzICovXG4gICAgbG8gPSBNYXRoLmltdWwoYWw5LCBibDQpO1xuICAgIG1pZCA9IE1hdGguaW11bChhbDksIGJoNCk7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDksIGJsNCkpIHwgMDtcbiAgICBoaSA9IE1hdGguaW11bChhaDksIGJoNCk7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw4LCBibDUpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDgsIGJoNSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoOCwgYmw1KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoOCwgYmg1KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNywgYmw2KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw3LCBiaDYpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDcsIGJsNikpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDcsIGJoNikpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDYsIGJsNykpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsNiwgYmg3KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg2LCBibDcpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg2LCBiaDcpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw1LCBibDgpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDUsIGJoOCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNSwgYmw4KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNSwgYmg4KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNCwgYmw5KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw0LCBiaDkpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDQsIGJsOSkpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDQsIGJoOSkpIHwgMDtcbiAgICB2YXIgdzEzID0gKCgoYyArIGxvKSB8IDApICsgKChtaWQgJiAweDFmZmYpIDw8IDEzKSkgfCAwO1xuICAgIGMgPSAoKChoaSArIChtaWQgPj4+IDEzKSkgfCAwKSArICh3MTMgPj4+IDI2KSkgfCAwO1xuICAgIHcxMyAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDE0ICovXG4gICAgbG8gPSBNYXRoLmltdWwoYWw5LCBibDUpO1xuICAgIG1pZCA9IE1hdGguaW11bChhbDksIGJoNSk7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDksIGJsNSkpIHwgMDtcbiAgICBoaSA9IE1hdGguaW11bChhaDksIGJoNSk7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw4LCBibDYpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDgsIGJoNikpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoOCwgYmw2KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoOCwgYmg2KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNywgYmw3KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw3LCBiaDcpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDcsIGJsNykpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDcsIGJoNykpIHwgMDtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDYsIGJsOCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsNiwgYmg4KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg2LCBibDgpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg2LCBiaDgpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw1LCBibDkpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDUsIGJoOSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNSwgYmw5KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNSwgYmg5KSkgfCAwO1xuICAgIHZhciB3MTQgPSAoKChjICsgbG8pIHwgMCkgKyAoKG1pZCAmIDB4MWZmZikgPDwgMTMpKSB8IDA7XG4gICAgYyA9ICgoKGhpICsgKG1pZCA+Pj4gMTMpKSB8IDApICsgKHcxNCA+Pj4gMjYpKSB8IDA7XG4gICAgdzE0ICY9IDB4M2ZmZmZmZjtcbiAgICAvKiBrID0gMTUgKi9cbiAgICBsbyA9IE1hdGguaW11bChhbDksIGJsNik7XG4gICAgbWlkID0gTWF0aC5pbXVsKGFsOSwgYmg2KTtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoOSwgYmw2KSkgfCAwO1xuICAgIGhpID0gTWF0aC5pbXVsKGFoOSwgYmg2KTtcbiAgICBsbyA9IChsbyArIE1hdGguaW11bChhbDgsIGJsNykpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFsOCwgYmg3KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWg4LCBibDcpKSB8IDA7XG4gICAgaGkgPSAoaGkgKyBNYXRoLmltdWwoYWg4LCBiaDcpKSB8IDA7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw3LCBibDgpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDcsIGJoOCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoNywgYmw4KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoNywgYmg4KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNiwgYmw5KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw2LCBiaDkpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDYsIGJsOSkpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDYsIGJoOSkpIHwgMDtcbiAgICB2YXIgdzE1ID0gKCgoYyArIGxvKSB8IDApICsgKChtaWQgJiAweDFmZmYpIDw8IDEzKSkgfCAwO1xuICAgIGMgPSAoKChoaSArIChtaWQgPj4+IDEzKSkgfCAwKSArICh3MTUgPj4+IDI2KSkgfCAwO1xuICAgIHcxNSAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDE2ICovXG4gICAgbG8gPSBNYXRoLmltdWwoYWw5LCBibDcpO1xuICAgIG1pZCA9IE1hdGguaW11bChhbDksIGJoNyk7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDksIGJsNykpIHwgMDtcbiAgICBoaSA9IE1hdGguaW11bChhaDksIGJoNyk7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw4LCBibDgpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDgsIGJoOCkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoOCwgYmw4KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoOCwgYmg4KSkgfCAwO1xuICAgIGxvID0gKGxvICsgTWF0aC5pbXVsKGFsNywgYmw5KSkgfCAwO1xuICAgIG1pZCA9IChtaWQgKyBNYXRoLmltdWwoYWw3LCBiaDkpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDcsIGJsOSkpIHwgMDtcbiAgICBoaSA9IChoaSArIE1hdGguaW11bChhaDcsIGJoOSkpIHwgMDtcbiAgICB2YXIgdzE2ID0gKCgoYyArIGxvKSB8IDApICsgKChtaWQgJiAweDFmZmYpIDw8IDEzKSkgfCAwO1xuICAgIGMgPSAoKChoaSArIChtaWQgPj4+IDEzKSkgfCAwKSArICh3MTYgPj4+IDI2KSkgfCAwO1xuICAgIHcxNiAmPSAweDNmZmZmZmY7XG4gICAgLyogayA9IDE3ICovXG4gICAgbG8gPSBNYXRoLmltdWwoYWw5LCBibDgpO1xuICAgIG1pZCA9IE1hdGguaW11bChhbDksIGJoOCk7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhaDksIGJsOCkpIHwgMDtcbiAgICBoaSA9IE1hdGguaW11bChhaDksIGJoOCk7XG4gICAgbG8gPSAobG8gKyBNYXRoLmltdWwoYWw4LCBibDkpKSB8IDA7XG4gICAgbWlkID0gKG1pZCArIE1hdGguaW11bChhbDgsIGJoOSkpIHwgMDtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoOCwgYmw5KSkgfCAwO1xuICAgIGhpID0gKGhpICsgTWF0aC5pbXVsKGFoOCwgYmg5KSkgfCAwO1xuICAgIHZhciB3MTcgPSAoKChjICsgbG8pIHwgMCkgKyAoKG1pZCAmIDB4MWZmZikgPDwgMTMpKSB8IDA7XG4gICAgYyA9ICgoKGhpICsgKG1pZCA+Pj4gMTMpKSB8IDApICsgKHcxNyA+Pj4gMjYpKSB8IDA7XG4gICAgdzE3ICY9IDB4M2ZmZmZmZjtcbiAgICAvKiBrID0gMTggKi9cbiAgICBsbyA9IE1hdGguaW11bChhbDksIGJsOSk7XG4gICAgbWlkID0gTWF0aC5pbXVsKGFsOSwgYmg5KTtcbiAgICBtaWQgPSAobWlkICsgTWF0aC5pbXVsKGFoOSwgYmw5KSkgfCAwO1xuICAgIGhpID0gTWF0aC5pbXVsKGFoOSwgYmg5KTtcbiAgICB2YXIgdzE4ID0gKCgoYyArIGxvKSB8IDApICsgKChtaWQgJiAweDFmZmYpIDw8IDEzKSkgfCAwO1xuICAgIGMgPSAoKChoaSArIChtaWQgPj4+IDEzKSkgfCAwKSArICh3MTggPj4+IDI2KSkgfCAwO1xuICAgIHcxOCAmPSAweDNmZmZmZmY7XG4gICAgb1swXSA9IHcwO1xuICAgIG9bMV0gPSB3MTtcbiAgICBvWzJdID0gdzI7XG4gICAgb1szXSA9IHczO1xuICAgIG9bNF0gPSB3NDtcbiAgICBvWzVdID0gdzU7XG4gICAgb1s2XSA9IHc2O1xuICAgIG9bN10gPSB3NztcbiAgICBvWzhdID0gdzg7XG4gICAgb1s5XSA9IHc5O1xuICAgIG9bMTBdID0gdzEwO1xuICAgIG9bMTFdID0gdzExO1xuICAgIG9bMTJdID0gdzEyO1xuICAgIG9bMTNdID0gdzEzO1xuICAgIG9bMTRdID0gdzE0O1xuICAgIG9bMTVdID0gdzE1O1xuICAgIG9bMTZdID0gdzE2O1xuICAgIG9bMTddID0gdzE3O1xuICAgIG9bMThdID0gdzE4O1xuICAgIGlmIChjICE9PSAwKSB7XG4gICAgICBvWzE5XSA9IGM7XG4gICAgICBvdXQubGVuZ3RoKys7XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG4gIH07XG5cbiAgLy8gUG9seWZpbGwgY29tYlxuICBpZiAoIU1hdGguaW11bCkge1xuICAgIGNvbWIxME11bFRvID0gc21hbGxNdWxUbztcbiAgfVxuXG4gIGZ1bmN0aW9uIGJpZ011bFRvIChzZWxmLCBudW0sIG91dCkge1xuICAgIG91dC5uZWdhdGl2ZSA9IG51bS5uZWdhdGl2ZSBeIHNlbGYubmVnYXRpdmU7XG4gICAgb3V0Lmxlbmd0aCA9IHNlbGYubGVuZ3RoICsgbnVtLmxlbmd0aDtcblxuICAgIHZhciBjYXJyeSA9IDA7XG4gICAgdmFyIGhuY2FycnkgPSAwO1xuICAgIGZvciAodmFyIGsgPSAwOyBrIDwgb3V0Lmxlbmd0aCAtIDE7IGsrKykge1xuICAgICAgLy8gU3VtIGFsbCB3b3JkcyB3aXRoIHRoZSBzYW1lIGBpICsgaiA9IGtgIGFuZCBhY2N1bXVsYXRlIGBuY2FycnlgLFxuICAgICAgLy8gbm90ZSB0aGF0IG5jYXJyeSBjb3VsZCBiZSA+PSAweDNmZmZmZmZcbiAgICAgIHZhciBuY2FycnkgPSBobmNhcnJ5O1xuICAgICAgaG5jYXJyeSA9IDA7XG4gICAgICB2YXIgcndvcmQgPSBjYXJyeSAmIDB4M2ZmZmZmZjtcbiAgICAgIHZhciBtYXhKID0gTWF0aC5taW4oaywgbnVtLmxlbmd0aCAtIDEpO1xuICAgICAgZm9yICh2YXIgaiA9IE1hdGgubWF4KDAsIGsgLSBzZWxmLmxlbmd0aCArIDEpOyBqIDw9IG1heEo7IGorKykge1xuICAgICAgICB2YXIgaSA9IGsgLSBqO1xuICAgICAgICB2YXIgYSA9IHNlbGYud29yZHNbaV0gfCAwO1xuICAgICAgICB2YXIgYiA9IG51bS53b3Jkc1tqXSB8IDA7XG4gICAgICAgIHZhciByID0gYSAqIGI7XG5cbiAgICAgICAgdmFyIGxvID0gciAmIDB4M2ZmZmZmZjtcbiAgICAgICAgbmNhcnJ5ID0gKG5jYXJyeSArICgociAvIDB4NDAwMDAwMCkgfCAwKSkgfCAwO1xuICAgICAgICBsbyA9IChsbyArIHJ3b3JkKSB8IDA7XG4gICAgICAgIHJ3b3JkID0gbG8gJiAweDNmZmZmZmY7XG4gICAgICAgIG5jYXJyeSA9IChuY2FycnkgKyAobG8gPj4+IDI2KSkgfCAwO1xuXG4gICAgICAgIGhuY2FycnkgKz0gbmNhcnJ5ID4+PiAyNjtcbiAgICAgICAgbmNhcnJ5ICY9IDB4M2ZmZmZmZjtcbiAgICAgIH1cbiAgICAgIG91dC53b3Jkc1trXSA9IHJ3b3JkO1xuICAgICAgY2FycnkgPSBuY2Fycnk7XG4gICAgICBuY2FycnkgPSBobmNhcnJ5O1xuICAgIH1cbiAgICBpZiAoY2FycnkgIT09IDApIHtcbiAgICAgIG91dC53b3Jkc1trXSA9IGNhcnJ5O1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXQubGVuZ3RoLS07XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dC5zdHJpcCgpO1xuICB9XG5cbiAgZnVuY3Rpb24ganVtYm9NdWxUbyAoc2VsZiwgbnVtLCBvdXQpIHtcbiAgICB2YXIgZmZ0bSA9IG5ldyBGRlRNKCk7XG4gICAgcmV0dXJuIGZmdG0ubXVscChzZWxmLCBudW0sIG91dCk7XG4gIH1cblxuICBCTi5wcm90b3R5cGUubXVsVG8gPSBmdW5jdGlvbiBtdWxUbyAobnVtLCBvdXQpIHtcbiAgICB2YXIgcmVzO1xuICAgIHZhciBsZW4gPSB0aGlzLmxlbmd0aCArIG51bS5sZW5ndGg7XG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSAxMCAmJiBudW0ubGVuZ3RoID09PSAxMCkge1xuICAgICAgcmVzID0gY29tYjEwTXVsVG8odGhpcywgbnVtLCBvdXQpO1xuICAgIH0gZWxzZSBpZiAobGVuIDwgNjMpIHtcbiAgICAgIHJlcyA9IHNtYWxsTXVsVG8odGhpcywgbnVtLCBvdXQpO1xuICAgIH0gZWxzZSBpZiAobGVuIDwgMTAyNCkge1xuICAgICAgcmVzID0gYmlnTXVsVG8odGhpcywgbnVtLCBvdXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXMgPSBqdW1ib011bFRvKHRoaXMsIG51bSwgb3V0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9O1xuXG4gIC8vIENvb2xleS1UdWtleSBhbGdvcml0aG0gZm9yIEZGVFxuICAvLyBzbGlnaHRseSByZXZpc2l0ZWQgdG8gcmVseSBvbiBsb29waW5nIGluc3RlYWQgb2YgcmVjdXJzaW9uXG5cbiAgZnVuY3Rpb24gRkZUTSAoeCwgeSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgfVxuXG4gIEZGVE0ucHJvdG90eXBlLm1ha2VSQlQgPSBmdW5jdGlvbiBtYWtlUkJUIChOKSB7XG4gICAgdmFyIHQgPSBuZXcgQXJyYXkoTik7XG4gICAgdmFyIGwgPSBCTi5wcm90b3R5cGUuX2NvdW50Qml0cyhOKSAtIDE7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBOOyBpKyspIHtcbiAgICAgIHRbaV0gPSB0aGlzLnJldkJpbihpLCBsLCBOKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdDtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGJpbmFyeS1yZXZlcnNlZCByZXByZXNlbnRhdGlvbiBvZiBgeGBcbiAgRkZUTS5wcm90b3R5cGUucmV2QmluID0gZnVuY3Rpb24gcmV2QmluICh4LCBsLCBOKSB7XG4gICAgaWYgKHggPT09IDAgfHwgeCA9PT0gTiAtIDEpIHJldHVybiB4O1xuXG4gICAgdmFyIHJiID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgcmIgfD0gKHggJiAxKSA8PCAobCAtIGkgLSAxKTtcbiAgICAgIHggPj49IDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJiO1xuICB9O1xuXG4gIC8vIFBlcmZvcm1zIFwidHdlZWRsaW5nXCIgcGhhc2UsIHRoZXJlZm9yZSAnZW11bGF0aW5nJ1xuICAvLyBiZWhhdmlvdXIgb2YgdGhlIHJlY3Vyc2l2ZSBhbGdvcml0aG1cbiAgRkZUTS5wcm90b3R5cGUucGVybXV0ZSA9IGZ1bmN0aW9uIHBlcm11dGUgKHJidCwgcndzLCBpd3MsIHJ0d3MsIGl0d3MsIE4pIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IE47IGkrKykge1xuICAgICAgcnR3c1tpXSA9IHJ3c1tyYnRbaV1dO1xuICAgICAgaXR3c1tpXSA9IGl3c1tyYnRbaV1dO1xuICAgIH1cbiAgfTtcblxuICBGRlRNLnByb3RvdHlwZS50cmFuc2Zvcm0gPSBmdW5jdGlvbiB0cmFuc2Zvcm0gKHJ3cywgaXdzLCBydHdzLCBpdHdzLCBOLCByYnQpIHtcbiAgICB0aGlzLnBlcm11dGUocmJ0LCByd3MsIGl3cywgcnR3cywgaXR3cywgTik7XG5cbiAgICBmb3IgKHZhciBzID0gMTsgcyA8IE47IHMgPDw9IDEpIHtcbiAgICAgIHZhciBsID0gcyA8PCAxO1xuXG4gICAgICB2YXIgcnR3ZGYgPSBNYXRoLmNvcygyICogTWF0aC5QSSAvIGwpO1xuICAgICAgdmFyIGl0d2RmID0gTWF0aC5zaW4oMiAqIE1hdGguUEkgLyBsKTtcblxuICAgICAgZm9yICh2YXIgcCA9IDA7IHAgPCBOOyBwICs9IGwpIHtcbiAgICAgICAgdmFyIHJ0d2RmXyA9IHJ0d2RmO1xuICAgICAgICB2YXIgaXR3ZGZfID0gaXR3ZGY7XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzOyBqKyspIHtcbiAgICAgICAgICB2YXIgcmUgPSBydHdzW3AgKyBqXTtcbiAgICAgICAgICB2YXIgaWUgPSBpdHdzW3AgKyBqXTtcblxuICAgICAgICAgIHZhciBybyA9IHJ0d3NbcCArIGogKyBzXTtcbiAgICAgICAgICB2YXIgaW8gPSBpdHdzW3AgKyBqICsgc107XG5cbiAgICAgICAgICB2YXIgcnggPSBydHdkZl8gKiBybyAtIGl0d2RmXyAqIGlvO1xuXG4gICAgICAgICAgaW8gPSBydHdkZl8gKiBpbyArIGl0d2RmXyAqIHJvO1xuICAgICAgICAgIHJvID0gcng7XG5cbiAgICAgICAgICBydHdzW3AgKyBqXSA9IHJlICsgcm87XG4gICAgICAgICAgaXR3c1twICsgal0gPSBpZSArIGlvO1xuXG4gICAgICAgICAgcnR3c1twICsgaiArIHNdID0gcmUgLSBybztcbiAgICAgICAgICBpdHdzW3AgKyBqICsgc10gPSBpZSAtIGlvO1xuXG4gICAgICAgICAgLyoganNoaW50IG1heGRlcHRoIDogZmFsc2UgKi9cbiAgICAgICAgICBpZiAoaiAhPT0gbCkge1xuICAgICAgICAgICAgcnggPSBydHdkZiAqIHJ0d2RmXyAtIGl0d2RmICogaXR3ZGZfO1xuXG4gICAgICAgICAgICBpdHdkZl8gPSBydHdkZiAqIGl0d2RmXyArIGl0d2RmICogcnR3ZGZfO1xuICAgICAgICAgICAgcnR3ZGZfID0gcng7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIEZGVE0ucHJvdG90eXBlLmd1ZXNzTGVuMTNiID0gZnVuY3Rpb24gZ3Vlc3NMZW4xM2IgKG4sIG0pIHtcbiAgICB2YXIgTiA9IE1hdGgubWF4KG0sIG4pIHwgMTtcbiAgICB2YXIgb2RkID0gTiAmIDE7XG4gICAgdmFyIGkgPSAwO1xuICAgIGZvciAoTiA9IE4gLyAyIHwgMDsgTjsgTiA9IE4gPj4+IDEpIHtcbiAgICAgIGkrKztcbiAgICB9XG5cbiAgICByZXR1cm4gMSA8PCBpICsgMSArIG9kZDtcbiAgfTtcblxuICBGRlRNLnByb3RvdHlwZS5jb25qdWdhdGUgPSBmdW5jdGlvbiBjb25qdWdhdGUgKHJ3cywgaXdzLCBOKSB7XG4gICAgaWYgKE4gPD0gMSkgcmV0dXJuO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBOIC8gMjsgaSsrKSB7XG4gICAgICB2YXIgdCA9IHJ3c1tpXTtcblxuICAgICAgcndzW2ldID0gcndzW04gLSBpIC0gMV07XG4gICAgICByd3NbTiAtIGkgLSAxXSA9IHQ7XG5cbiAgICAgIHQgPSBpd3NbaV07XG5cbiAgICAgIGl3c1tpXSA9IC1pd3NbTiAtIGkgLSAxXTtcbiAgICAgIGl3c1tOIC0gaSAtIDFdID0gLXQ7XG4gICAgfVxuICB9O1xuXG4gIEZGVE0ucHJvdG90eXBlLm5vcm1hbGl6ZTEzYiA9IGZ1bmN0aW9uIG5vcm1hbGl6ZTEzYiAod3MsIE4pIHtcbiAgICB2YXIgY2FycnkgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgTiAvIDI7IGkrKykge1xuICAgICAgdmFyIHcgPSBNYXRoLnJvdW5kKHdzWzIgKiBpICsgMV0gLyBOKSAqIDB4MjAwMCArXG4gICAgICAgIE1hdGgucm91bmQod3NbMiAqIGldIC8gTikgK1xuICAgICAgICBjYXJyeTtcblxuICAgICAgd3NbaV0gPSB3ICYgMHgzZmZmZmZmO1xuXG4gICAgICBpZiAodyA8IDB4NDAwMDAwMCkge1xuICAgICAgICBjYXJyeSA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYXJyeSA9IHcgLyAweDQwMDAwMDAgfCAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB3cztcbiAgfTtcblxuICBGRlRNLnByb3RvdHlwZS5jb252ZXJ0MTNiID0gZnVuY3Rpb24gY29udmVydDEzYiAod3MsIGxlbiwgcndzLCBOKSB7XG4gICAgdmFyIGNhcnJ5ID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjYXJyeSA9IGNhcnJ5ICsgKHdzW2ldIHwgMCk7XG5cbiAgICAgIHJ3c1syICogaV0gPSBjYXJyeSAmIDB4MWZmZjsgY2FycnkgPSBjYXJyeSA+Pj4gMTM7XG4gICAgICByd3NbMiAqIGkgKyAxXSA9IGNhcnJ5ICYgMHgxZmZmOyBjYXJyeSA9IGNhcnJ5ID4+PiAxMztcbiAgICB9XG5cbiAgICAvLyBQYWQgd2l0aCB6ZXJvZXNcbiAgICBmb3IgKGkgPSAyICogbGVuOyBpIDwgTjsgKytpKSB7XG4gICAgICByd3NbaV0gPSAwO1xuICAgIH1cblxuICAgIGFzc2VydChjYXJyeSA9PT0gMCk7XG4gICAgYXNzZXJ0KChjYXJyeSAmIH4weDFmZmYpID09PSAwKTtcbiAgfTtcblxuICBGRlRNLnByb3RvdHlwZS5zdHViID0gZnVuY3Rpb24gc3R1YiAoTikge1xuICAgIHZhciBwaCA9IG5ldyBBcnJheShOKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IE47IGkrKykge1xuICAgICAgcGhbaV0gPSAwO1xuICAgIH1cblxuICAgIHJldHVybiBwaDtcbiAgfTtcblxuICBGRlRNLnByb3RvdHlwZS5tdWxwID0gZnVuY3Rpb24gbXVscCAoeCwgeSwgb3V0KSB7XG4gICAgdmFyIE4gPSAyICogdGhpcy5ndWVzc0xlbjEzYih4Lmxlbmd0aCwgeS5sZW5ndGgpO1xuXG4gICAgdmFyIHJidCA9IHRoaXMubWFrZVJCVChOKTtcblxuICAgIHZhciBfID0gdGhpcy5zdHViKE4pO1xuXG4gICAgdmFyIHJ3cyA9IG5ldyBBcnJheShOKTtcbiAgICB2YXIgcndzdCA9IG5ldyBBcnJheShOKTtcbiAgICB2YXIgaXdzdCA9IG5ldyBBcnJheShOKTtcblxuICAgIHZhciBucndzID0gbmV3IEFycmF5KE4pO1xuICAgIHZhciBucndzdCA9IG5ldyBBcnJheShOKTtcbiAgICB2YXIgbml3c3QgPSBuZXcgQXJyYXkoTik7XG5cbiAgICB2YXIgcm13cyA9IG91dC53b3JkcztcbiAgICBybXdzLmxlbmd0aCA9IE47XG5cbiAgICB0aGlzLmNvbnZlcnQxM2IoeC53b3JkcywgeC5sZW5ndGgsIHJ3cywgTik7XG4gICAgdGhpcy5jb252ZXJ0MTNiKHkud29yZHMsIHkubGVuZ3RoLCBucndzLCBOKTtcblxuICAgIHRoaXMudHJhbnNmb3JtKHJ3cywgXywgcndzdCwgaXdzdCwgTiwgcmJ0KTtcbiAgICB0aGlzLnRyYW5zZm9ybShucndzLCBfLCBucndzdCwgbml3c3QsIE4sIHJidCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IE47IGkrKykge1xuICAgICAgdmFyIHJ4ID0gcndzdFtpXSAqIG5yd3N0W2ldIC0gaXdzdFtpXSAqIG5pd3N0W2ldO1xuICAgICAgaXdzdFtpXSA9IHJ3c3RbaV0gKiBuaXdzdFtpXSArIGl3c3RbaV0gKiBucndzdFtpXTtcbiAgICAgIHJ3c3RbaV0gPSByeDtcbiAgICB9XG5cbiAgICB0aGlzLmNvbmp1Z2F0ZShyd3N0LCBpd3N0LCBOKTtcbiAgICB0aGlzLnRyYW5zZm9ybShyd3N0LCBpd3N0LCBybXdzLCBfLCBOLCByYnQpO1xuICAgIHRoaXMuY29uanVnYXRlKHJtd3MsIF8sIE4pO1xuICAgIHRoaXMubm9ybWFsaXplMTNiKHJtd3MsIE4pO1xuXG4gICAgb3V0Lm5lZ2F0aXZlID0geC5uZWdhdGl2ZSBeIHkubmVnYXRpdmU7XG4gICAgb3V0Lmxlbmd0aCA9IHgubGVuZ3RoICsgeS5sZW5ndGg7XG4gICAgcmV0dXJuIG91dC5zdHJpcCgpO1xuICB9O1xuXG4gIC8vIE11bHRpcGx5IGB0aGlzYCBieSBgbnVtYFxuICBCTi5wcm90b3R5cGUubXVsID0gZnVuY3Rpb24gbXVsIChudW0pIHtcbiAgICB2YXIgb3V0ID0gbmV3IEJOKG51bGwpO1xuICAgIG91dC53b3JkcyA9IG5ldyBBcnJheSh0aGlzLmxlbmd0aCArIG51bS5sZW5ndGgpO1xuICAgIHJldHVybiB0aGlzLm11bFRvKG51bSwgb3V0KTtcbiAgfTtcblxuICAvLyBNdWx0aXBseSBlbXBsb3lpbmcgRkZUXG4gIEJOLnByb3RvdHlwZS5tdWxmID0gZnVuY3Rpb24gbXVsZiAobnVtKSB7XG4gICAgdmFyIG91dCA9IG5ldyBCTihudWxsKTtcbiAgICBvdXQud29yZHMgPSBuZXcgQXJyYXkodGhpcy5sZW5ndGggKyBudW0ubGVuZ3RoKTtcbiAgICByZXR1cm4ganVtYm9NdWxUbyh0aGlzLCBudW0sIG91dCk7XG4gIH07XG5cbiAgLy8gSW4tcGxhY2UgTXVsdGlwbGljYXRpb25cbiAgQk4ucHJvdG90eXBlLmltdWwgPSBmdW5jdGlvbiBpbXVsIChudW0pIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLm11bFRvKG51bSwgdGhpcyk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLmltdWxuID0gZnVuY3Rpb24gaW11bG4gKG51bSkge1xuICAgIGFzc2VydCh0eXBlb2YgbnVtID09PSAnbnVtYmVyJyk7XG4gICAgYXNzZXJ0KG51bSA8IDB4NDAwMDAwMCk7XG5cbiAgICAvLyBDYXJyeVxuICAgIHZhciBjYXJyeSA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdyA9ICh0aGlzLndvcmRzW2ldIHwgMCkgKiBudW07XG4gICAgICB2YXIgbG8gPSAodyAmIDB4M2ZmZmZmZikgKyAoY2FycnkgJiAweDNmZmZmZmYpO1xuICAgICAgY2FycnkgPj49IDI2O1xuICAgICAgY2FycnkgKz0gKHcgLyAweDQwMDAwMDApIHwgMDtcbiAgICAgIC8vIE5PVEU6IGxvIGlzIDI3Yml0IG1heGltdW1cbiAgICAgIGNhcnJ5ICs9IGxvID4+PiAyNjtcbiAgICAgIHRoaXMud29yZHNbaV0gPSBsbyAmIDB4M2ZmZmZmZjtcbiAgICB9XG5cbiAgICBpZiAoY2FycnkgIT09IDApIHtcbiAgICAgIHRoaXMud29yZHNbaV0gPSBjYXJyeTtcbiAgICAgIHRoaXMubGVuZ3RoKys7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLm11bG4gPSBmdW5jdGlvbiBtdWxuIChudW0pIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLmltdWxuKG51bSk7XG4gIH07XG5cbiAgLy8gYHRoaXNgICogYHRoaXNgXG4gIEJOLnByb3RvdHlwZS5zcXIgPSBmdW5jdGlvbiBzcXIgKCkge1xuICAgIHJldHVybiB0aGlzLm11bCh0aGlzKTtcbiAgfTtcblxuICAvLyBgdGhpc2AgKiBgdGhpc2AgaW4tcGxhY2VcbiAgQk4ucHJvdG90eXBlLmlzcXIgPSBmdW5jdGlvbiBpc3FyICgpIHtcbiAgICByZXR1cm4gdGhpcy5pbXVsKHRoaXMuY2xvbmUoKSk7XG4gIH07XG5cbiAgLy8gTWF0aC5wb3coYHRoaXNgLCBgbnVtYClcbiAgQk4ucHJvdG90eXBlLnBvdyA9IGZ1bmN0aW9uIHBvdyAobnVtKSB7XG4gICAgdmFyIHcgPSB0b0JpdEFycmF5KG51bSk7XG4gICAgaWYgKHcubGVuZ3RoID09PSAwKSByZXR1cm4gbmV3IEJOKDEpO1xuXG4gICAgLy8gU2tpcCBsZWFkaW5nIHplcm9lc1xuICAgIHZhciByZXMgPSB0aGlzO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdy5sZW5ndGg7IGkrKywgcmVzID0gcmVzLnNxcigpKSB7XG4gICAgICBpZiAod1tpXSAhPT0gMCkgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKCsraSA8IHcubGVuZ3RoKSB7XG4gICAgICBmb3IgKHZhciBxID0gcmVzLnNxcigpOyBpIDwgdy5sZW5ndGg7IGkrKywgcSA9IHEuc3FyKCkpIHtcbiAgICAgICAgaWYgKHdbaV0gPT09IDApIGNvbnRpbnVlO1xuXG4gICAgICAgIHJlcyA9IHJlcy5tdWwocSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbiAgfTtcblxuICAvLyBTaGlmdC1sZWZ0IGluLXBsYWNlXG4gIEJOLnByb3RvdHlwZS5pdXNobG4gPSBmdW5jdGlvbiBpdXNobG4gKGJpdHMpIHtcbiAgICBhc3NlcnQodHlwZW9mIGJpdHMgPT09ICdudW1iZXInICYmIGJpdHMgPj0gMCk7XG4gICAgdmFyIHIgPSBiaXRzICUgMjY7XG4gICAgdmFyIHMgPSAoYml0cyAtIHIpIC8gMjY7XG4gICAgdmFyIGNhcnJ5TWFzayA9ICgweDNmZmZmZmYgPj4+ICgyNiAtIHIpKSA8PCAoMjYgLSByKTtcbiAgICB2YXIgaTtcblxuICAgIGlmIChyICE9PSAwKSB7XG4gICAgICB2YXIgY2FycnkgPSAwO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgbmV3Q2FycnkgPSB0aGlzLndvcmRzW2ldICYgY2FycnlNYXNrO1xuICAgICAgICB2YXIgYyA9ICgodGhpcy53b3Jkc1tpXSB8IDApIC0gbmV3Q2FycnkpIDw8IHI7XG4gICAgICAgIHRoaXMud29yZHNbaV0gPSBjIHwgY2Fycnk7XG4gICAgICAgIGNhcnJ5ID0gbmV3Q2FycnkgPj4+ICgyNiAtIHIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2FycnkpIHtcbiAgICAgICAgdGhpcy53b3Jkc1tpXSA9IGNhcnJ5O1xuICAgICAgICB0aGlzLmxlbmd0aCsrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzICE9PSAwKSB7XG4gICAgICBmb3IgKGkgPSB0aGlzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIHRoaXMud29yZHNbaSArIHNdID0gdGhpcy53b3Jkc1tpXTtcbiAgICAgIH1cblxuICAgICAgZm9yIChpID0gMDsgaSA8IHM7IGkrKykge1xuICAgICAgICB0aGlzLndvcmRzW2ldID0gMDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sZW5ndGggKz0gcztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zdHJpcCgpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5pc2hsbiA9IGZ1bmN0aW9uIGlzaGxuIChiaXRzKSB7XG4gICAgLy8gVE9ETyhpbmR1dG55KTogaW1wbGVtZW50IG1lXG4gICAgYXNzZXJ0KHRoaXMubmVnYXRpdmUgPT09IDApO1xuICAgIHJldHVybiB0aGlzLml1c2hsbihiaXRzKTtcbiAgfTtcblxuICAvLyBTaGlmdC1yaWdodCBpbi1wbGFjZVxuICAvLyBOT1RFOiBgaGludGAgaXMgYSBsb3dlc3QgYml0IGJlZm9yZSB0cmFpbGluZyB6ZXJvZXNcbiAgLy8gTk9URTogaWYgYGV4dGVuZGVkYCBpcyBwcmVzZW50IC0gaXQgd2lsbCBiZSBmaWxsZWQgd2l0aCBkZXN0cm95ZWQgYml0c1xuICBCTi5wcm90b3R5cGUuaXVzaHJuID0gZnVuY3Rpb24gaXVzaHJuIChiaXRzLCBoaW50LCBleHRlbmRlZCkge1xuICAgIGFzc2VydCh0eXBlb2YgYml0cyA9PT0gJ251bWJlcicgJiYgYml0cyA+PSAwKTtcbiAgICB2YXIgaDtcbiAgICBpZiAoaGludCkge1xuICAgICAgaCA9IChoaW50IC0gKGhpbnQgJSAyNikpIC8gMjY7XG4gICAgfSBlbHNlIHtcbiAgICAgIGggPSAwO1xuICAgIH1cblxuICAgIHZhciByID0gYml0cyAlIDI2O1xuICAgIHZhciBzID0gTWF0aC5taW4oKGJpdHMgLSByKSAvIDI2LCB0aGlzLmxlbmd0aCk7XG4gICAgdmFyIG1hc2sgPSAweDNmZmZmZmYgXiAoKDB4M2ZmZmZmZiA+Pj4gcikgPDwgcik7XG4gICAgdmFyIG1hc2tlZFdvcmRzID0gZXh0ZW5kZWQ7XG5cbiAgICBoIC09IHM7XG4gICAgaCA9IE1hdGgubWF4KDAsIGgpO1xuXG4gICAgLy8gRXh0ZW5kZWQgbW9kZSwgY29weSBtYXNrZWQgcGFydFxuICAgIGlmIChtYXNrZWRXb3Jkcykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzOyBpKyspIHtcbiAgICAgICAgbWFza2VkV29yZHMud29yZHNbaV0gPSB0aGlzLndvcmRzW2ldO1xuICAgICAgfVxuICAgICAgbWFza2VkV29yZHMubGVuZ3RoID0gcztcbiAgICB9XG5cbiAgICBpZiAocyA9PT0gMCkge1xuICAgICAgLy8gTm8tb3AsIHdlIHNob3VsZCBub3QgbW92ZSBhbnl0aGluZyBhdCBhbGxcbiAgICB9IGVsc2UgaWYgKHRoaXMubGVuZ3RoID4gcykge1xuICAgICAgdGhpcy5sZW5ndGggLT0gcztcbiAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMud29yZHNbaV0gPSB0aGlzLndvcmRzW2kgKyBzXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy53b3Jkc1swXSA9IDA7XG4gICAgICB0aGlzLmxlbmd0aCA9IDE7XG4gICAgfVxuXG4gICAgdmFyIGNhcnJ5ID0gMDtcbiAgICBmb3IgKGkgPSB0aGlzLmxlbmd0aCAtIDE7IGkgPj0gMCAmJiAoY2FycnkgIT09IDAgfHwgaSA+PSBoKTsgaS0tKSB7XG4gICAgICB2YXIgd29yZCA9IHRoaXMud29yZHNbaV0gfCAwO1xuICAgICAgdGhpcy53b3Jkc1tpXSA9IChjYXJyeSA8PCAoMjYgLSByKSkgfCAod29yZCA+Pj4gcik7XG4gICAgICBjYXJyeSA9IHdvcmQgJiBtYXNrO1xuICAgIH1cblxuICAgIC8vIFB1c2ggY2FycmllZCBiaXRzIGFzIGEgbWFza1xuICAgIGlmIChtYXNrZWRXb3JkcyAmJiBjYXJyeSAhPT0gMCkge1xuICAgICAgbWFza2VkV29yZHMud29yZHNbbWFza2VkV29yZHMubGVuZ3RoKytdID0gY2Fycnk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLndvcmRzWzBdID0gMDtcbiAgICAgIHRoaXMubGVuZ3RoID0gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zdHJpcCgpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5pc2hybiA9IGZ1bmN0aW9uIGlzaHJuIChiaXRzLCBoaW50LCBleHRlbmRlZCkge1xuICAgIC8vIFRPRE8oaW5kdXRueSk6IGltcGxlbWVudCBtZVxuICAgIGFzc2VydCh0aGlzLm5lZ2F0aXZlID09PSAwKTtcbiAgICByZXR1cm4gdGhpcy5pdXNocm4oYml0cywgaGludCwgZXh0ZW5kZWQpO1xuICB9O1xuXG4gIC8vIFNoaWZ0LWxlZnRcbiAgQk4ucHJvdG90eXBlLnNobG4gPSBmdW5jdGlvbiBzaGxuIChiaXRzKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5pc2hsbihiaXRzKTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUudXNobG4gPSBmdW5jdGlvbiB1c2hsbiAoYml0cykge1xuICAgIHJldHVybiB0aGlzLmNsb25lKCkuaXVzaGxuKGJpdHMpO1xuICB9O1xuXG4gIC8vIFNoaWZ0LXJpZ2h0XG4gIEJOLnByb3RvdHlwZS5zaHJuID0gZnVuY3Rpb24gc2hybiAoYml0cykge1xuICAgIHJldHVybiB0aGlzLmNsb25lKCkuaXNocm4oYml0cyk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLnVzaHJuID0gZnVuY3Rpb24gdXNocm4gKGJpdHMpIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLml1c2hybihiaXRzKTtcbiAgfTtcblxuICAvLyBUZXN0IGlmIG4gYml0IGlzIHNldFxuICBCTi5wcm90b3R5cGUudGVzdG4gPSBmdW5jdGlvbiB0ZXN0biAoYml0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBiaXQgPT09ICdudW1iZXInICYmIGJpdCA+PSAwKTtcbiAgICB2YXIgciA9IGJpdCAlIDI2O1xuICAgIHZhciBzID0gKGJpdCAtIHIpIC8gMjY7XG4gICAgdmFyIHEgPSAxIDw8IHI7XG5cbiAgICAvLyBGYXN0IGNhc2U6IGJpdCBpcyBtdWNoIGhpZ2hlciB0aGFuIGFsbCBleGlzdGluZyB3b3Jkc1xuICAgIGlmICh0aGlzLmxlbmd0aCA8PSBzKSByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBDaGVjayBiaXQgYW5kIHJldHVyblxuICAgIHZhciB3ID0gdGhpcy53b3Jkc1tzXTtcblxuICAgIHJldHVybiAhISh3ICYgcSk7XG4gIH07XG5cbiAgLy8gUmV0dXJuIG9ubHkgbG93ZXJzIGJpdHMgb2YgbnVtYmVyIChpbi1wbGFjZSlcbiAgQk4ucHJvdG90eXBlLmltYXNrbiA9IGZ1bmN0aW9uIGltYXNrbiAoYml0cykge1xuICAgIGFzc2VydCh0eXBlb2YgYml0cyA9PT0gJ251bWJlcicgJiYgYml0cyA+PSAwKTtcbiAgICB2YXIgciA9IGJpdHMgJSAyNjtcbiAgICB2YXIgcyA9IChiaXRzIC0gcikgLyAyNjtcblxuICAgIGFzc2VydCh0aGlzLm5lZ2F0aXZlID09PSAwLCAnaW1hc2tuIHdvcmtzIG9ubHkgd2l0aCBwb3NpdGl2ZSBudW1iZXJzJyk7XG5cbiAgICBpZiAodGhpcy5sZW5ndGggPD0gcykge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKHIgIT09IDApIHtcbiAgICAgIHMrKztcbiAgICB9XG4gICAgdGhpcy5sZW5ndGggPSBNYXRoLm1pbihzLCB0aGlzLmxlbmd0aCk7XG5cbiAgICBpZiAociAhPT0gMCkge1xuICAgICAgdmFyIG1hc2sgPSAweDNmZmZmZmYgXiAoKDB4M2ZmZmZmZiA+Pj4gcikgPDwgcik7XG4gICAgICB0aGlzLndvcmRzW3RoaXMubGVuZ3RoIC0gMV0gJj0gbWFzaztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zdHJpcCgpO1xuICB9O1xuXG4gIC8vIFJldHVybiBvbmx5IGxvd2VycyBiaXRzIG9mIG51bWJlclxuICBCTi5wcm90b3R5cGUubWFza24gPSBmdW5jdGlvbiBtYXNrbiAoYml0cykge1xuICAgIHJldHVybiB0aGlzLmNsb25lKCkuaW1hc2tuKGJpdHMpO1xuICB9O1xuXG4gIC8vIEFkZCBwbGFpbiBudW1iZXIgYG51bWAgdG8gYHRoaXNgXG4gIEJOLnByb3RvdHlwZS5pYWRkbiA9IGZ1bmN0aW9uIGlhZGRuIChudW0pIHtcbiAgICBhc3NlcnQodHlwZW9mIG51bSA9PT0gJ251bWJlcicpO1xuICAgIGFzc2VydChudW0gPCAweDQwMDAwMDApO1xuICAgIGlmIChudW0gPCAwKSByZXR1cm4gdGhpcy5pc3VibigtbnVtKTtcblxuICAgIC8vIFBvc3NpYmxlIHNpZ24gY2hhbmdlXG4gICAgaWYgKHRoaXMubmVnYXRpdmUgIT09IDApIHtcbiAgICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMSAmJiAodGhpcy53b3Jkc1swXSB8IDApIDwgbnVtKSB7XG4gICAgICAgIHRoaXMud29yZHNbMF0gPSBudW0gLSAodGhpcy53b3Jkc1swXSB8IDApO1xuICAgICAgICB0aGlzLm5lZ2F0aXZlID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubmVnYXRpdmUgPSAwO1xuICAgICAgdGhpcy5pc3VibihudW0pO1xuICAgICAgdGhpcy5uZWdhdGl2ZSA9IDE7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aG91dCBjaGVja3NcbiAgICByZXR1cm4gdGhpcy5faWFkZG4obnVtKTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUuX2lhZGRuID0gZnVuY3Rpb24gX2lhZGRuIChudW0pIHtcbiAgICB0aGlzLndvcmRzWzBdICs9IG51bTtcblxuICAgIC8vIENhcnJ5XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aCAmJiB0aGlzLndvcmRzW2ldID49IDB4NDAwMDAwMDsgaSsrKSB7XG4gICAgICB0aGlzLndvcmRzW2ldIC09IDB4NDAwMDAwMDtcbiAgICAgIGlmIChpID09PSB0aGlzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgdGhpcy53b3Jkc1tpICsgMV0gPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy53b3Jkc1tpICsgMV0rKztcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5sZW5ndGggPSBNYXRoLm1heCh0aGlzLmxlbmd0aCwgaSArIDEpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLy8gU3VidHJhY3QgcGxhaW4gbnVtYmVyIGBudW1gIGZyb20gYHRoaXNgXG4gIEJOLnByb3RvdHlwZS5pc3VibiA9IGZ1bmN0aW9uIGlzdWJuIChudW0pIHtcbiAgICBhc3NlcnQodHlwZW9mIG51bSA9PT0gJ251bWJlcicpO1xuICAgIGFzc2VydChudW0gPCAweDQwMDAwMDApO1xuICAgIGlmIChudW0gPCAwKSByZXR1cm4gdGhpcy5pYWRkbigtbnVtKTtcblxuICAgIGlmICh0aGlzLm5lZ2F0aXZlICE9PSAwKSB7XG4gICAgICB0aGlzLm5lZ2F0aXZlID0gMDtcbiAgICAgIHRoaXMuaWFkZG4obnVtKTtcbiAgICAgIHRoaXMubmVnYXRpdmUgPSAxO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdGhpcy53b3Jkc1swXSAtPSBudW07XG5cbiAgICBpZiAodGhpcy5sZW5ndGggPT09IDEgJiYgdGhpcy53b3Jkc1swXSA8IDApIHtcbiAgICAgIHRoaXMud29yZHNbMF0gPSAtdGhpcy53b3Jkc1swXTtcbiAgICAgIHRoaXMubmVnYXRpdmUgPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBDYXJyeVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aCAmJiB0aGlzLndvcmRzW2ldIDwgMDsgaSsrKSB7XG4gICAgICAgIHRoaXMud29yZHNbaV0gKz0gMHg0MDAwMDAwO1xuICAgICAgICB0aGlzLndvcmRzW2kgKyAxXSAtPSAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnN0cmlwKCk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLmFkZG4gPSBmdW5jdGlvbiBhZGRuIChudW0pIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLmlhZGRuKG51bSk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLnN1Ym4gPSBmdW5jdGlvbiBzdWJuIChudW0pIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLmlzdWJuKG51bSk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLmlhYnMgPSBmdW5jdGlvbiBpYWJzICgpIHtcbiAgICB0aGlzLm5lZ2F0aXZlID0gMDtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5hYnMgPSBmdW5jdGlvbiBhYnMgKCkge1xuICAgIHJldHVybiB0aGlzLmNsb25lKCkuaWFicygpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5faXNobG5zdWJtdWwgPSBmdW5jdGlvbiBfaXNobG5zdWJtdWwgKG51bSwgbXVsLCBzaGlmdCkge1xuICAgIHZhciBsZW4gPSBudW0ubGVuZ3RoICsgc2hpZnQ7XG4gICAgdmFyIGk7XG5cbiAgICB0aGlzLl9leHBhbmQobGVuKTtcblxuICAgIHZhciB3O1xuICAgIHZhciBjYXJyeSA9IDA7XG4gICAgZm9yIChpID0gMDsgaSA8IG51bS5sZW5ndGg7IGkrKykge1xuICAgICAgdyA9ICh0aGlzLndvcmRzW2kgKyBzaGlmdF0gfCAwKSArIGNhcnJ5O1xuICAgICAgdmFyIHJpZ2h0ID0gKG51bS53b3Jkc1tpXSB8IDApICogbXVsO1xuICAgICAgdyAtPSByaWdodCAmIDB4M2ZmZmZmZjtcbiAgICAgIGNhcnJ5ID0gKHcgPj4gMjYpIC0gKChyaWdodCAvIDB4NDAwMDAwMCkgfCAwKTtcbiAgICAgIHRoaXMud29yZHNbaSArIHNoaWZ0XSA9IHcgJiAweDNmZmZmZmY7XG4gICAgfVxuICAgIGZvciAoOyBpIDwgdGhpcy5sZW5ndGggLSBzaGlmdDsgaSsrKSB7XG4gICAgICB3ID0gKHRoaXMud29yZHNbaSArIHNoaWZ0XSB8IDApICsgY2Fycnk7XG4gICAgICBjYXJyeSA9IHcgPj4gMjY7XG4gICAgICB0aGlzLndvcmRzW2kgKyBzaGlmdF0gPSB3ICYgMHgzZmZmZmZmO1xuICAgIH1cblxuICAgIGlmIChjYXJyeSA9PT0gMCkgcmV0dXJuIHRoaXMuc3RyaXAoKTtcblxuICAgIC8vIFN1YnRyYWN0aW9uIG92ZXJmbG93XG4gICAgYXNzZXJ0KGNhcnJ5ID09PSAtMSk7XG4gICAgY2FycnkgPSAwO1xuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB3ID0gLSh0aGlzLndvcmRzW2ldIHwgMCkgKyBjYXJyeTtcbiAgICAgIGNhcnJ5ID0gdyA+PiAyNjtcbiAgICAgIHRoaXMud29yZHNbaV0gPSB3ICYgMHgzZmZmZmZmO1xuICAgIH1cbiAgICB0aGlzLm5lZ2F0aXZlID0gMTtcblxuICAgIHJldHVybiB0aGlzLnN0cmlwKCk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLl93b3JkRGl2ID0gZnVuY3Rpb24gX3dvcmREaXYgKG51bSwgbW9kZSkge1xuICAgIHZhciBzaGlmdCA9IHRoaXMubGVuZ3RoIC0gbnVtLmxlbmd0aDtcblxuICAgIHZhciBhID0gdGhpcy5jbG9uZSgpO1xuICAgIHZhciBiID0gbnVtO1xuXG4gICAgLy8gTm9ybWFsaXplXG4gICAgdmFyIGJoaSA9IGIud29yZHNbYi5sZW5ndGggLSAxXSB8IDA7XG4gICAgdmFyIGJoaUJpdHMgPSB0aGlzLl9jb3VudEJpdHMoYmhpKTtcbiAgICBzaGlmdCA9IDI2IC0gYmhpQml0cztcbiAgICBpZiAoc2hpZnQgIT09IDApIHtcbiAgICAgIGIgPSBiLnVzaGxuKHNoaWZ0KTtcbiAgICAgIGEuaXVzaGxuKHNoaWZ0KTtcbiAgICAgIGJoaSA9IGIud29yZHNbYi5sZW5ndGggLSAxXSB8IDA7XG4gICAgfVxuXG4gICAgLy8gSW5pdGlhbGl6ZSBxdW90aWVudFxuICAgIHZhciBtID0gYS5sZW5ndGggLSBiLmxlbmd0aDtcbiAgICB2YXIgcTtcblxuICAgIGlmIChtb2RlICE9PSAnbW9kJykge1xuICAgICAgcSA9IG5ldyBCTihudWxsKTtcbiAgICAgIHEubGVuZ3RoID0gbSArIDE7XG4gICAgICBxLndvcmRzID0gbmV3IEFycmF5KHEubGVuZ3RoKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcS5sZW5ndGg7IGkrKykge1xuICAgICAgICBxLndvcmRzW2ldID0gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgZGlmZiA9IGEuY2xvbmUoKS5faXNobG5zdWJtdWwoYiwgMSwgbSk7XG4gICAgaWYgKGRpZmYubmVnYXRpdmUgPT09IDApIHtcbiAgICAgIGEgPSBkaWZmO1xuICAgICAgaWYgKHEpIHtcbiAgICAgICAgcS53b3Jkc1ttXSA9IDE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaiA9IG0gLSAxOyBqID49IDA7IGotLSkge1xuICAgICAgdmFyIHFqID0gKGEud29yZHNbYi5sZW5ndGggKyBqXSB8IDApICogMHg0MDAwMDAwICtcbiAgICAgICAgKGEud29yZHNbYi5sZW5ndGggKyBqIC0gMV0gfCAwKTtcblxuICAgICAgLy8gTk9URTogKHFqIC8gYmhpKSBpcyAoMHgzZmZmZmZmICogMHg0MDAwMDAwICsgMHgzZmZmZmZmKSAvIDB4MjAwMDAwMCBtYXhcbiAgICAgIC8vICgweDdmZmZmZmYpXG4gICAgICBxaiA9IE1hdGgubWluKChxaiAvIGJoaSkgfCAwLCAweDNmZmZmZmYpO1xuXG4gICAgICBhLl9pc2hsbnN1Ym11bChiLCBxaiwgaik7XG4gICAgICB3aGlsZSAoYS5uZWdhdGl2ZSAhPT0gMCkge1xuICAgICAgICBxai0tO1xuICAgICAgICBhLm5lZ2F0aXZlID0gMDtcbiAgICAgICAgYS5faXNobG5zdWJtdWwoYiwgMSwgaik7XG4gICAgICAgIGlmICghYS5pc1plcm8oKSkge1xuICAgICAgICAgIGEubmVnYXRpdmUgXj0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHEpIHtcbiAgICAgICAgcS53b3Jkc1tqXSA9IHFqO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocSkge1xuICAgICAgcS5zdHJpcCgpO1xuICAgIH1cbiAgICBhLnN0cmlwKCk7XG5cbiAgICAvLyBEZW5vcm1hbGl6ZVxuICAgIGlmIChtb2RlICE9PSAnZGl2JyAmJiBzaGlmdCAhPT0gMCkge1xuICAgICAgYS5pdXNocm4oc2hpZnQpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBkaXY6IHEgfHwgbnVsbCxcbiAgICAgIG1vZDogYVxuICAgIH07XG4gIH07XG5cbiAgLy8gTk9URTogMSkgYG1vZGVgIGNhbiBiZSBzZXQgdG8gYG1vZGAgdG8gcmVxdWVzdCBtb2Qgb25seSxcbiAgLy8gICAgICAgdG8gYGRpdmAgdG8gcmVxdWVzdCBkaXYgb25seSwgb3IgYmUgYWJzZW50IHRvXG4gIC8vICAgICAgIHJlcXVlc3QgYm90aCBkaXYgJiBtb2RcbiAgLy8gICAgICAgMikgYHBvc2l0aXZlYCBpcyB0cnVlIGlmIHVuc2lnbmVkIG1vZCBpcyByZXF1ZXN0ZWRcbiAgQk4ucHJvdG90eXBlLmRpdm1vZCA9IGZ1bmN0aW9uIGRpdm1vZCAobnVtLCBtb2RlLCBwb3NpdGl2ZSkge1xuICAgIGFzc2VydCghbnVtLmlzWmVybygpKTtcblxuICAgIGlmICh0aGlzLmlzWmVybygpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBkaXY6IG5ldyBCTigwKSxcbiAgICAgICAgbW9kOiBuZXcgQk4oMClcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIGRpdiwgbW9kLCByZXM7XG4gICAgaWYgKHRoaXMubmVnYXRpdmUgIT09IDAgJiYgbnVtLm5lZ2F0aXZlID09PSAwKSB7XG4gICAgICByZXMgPSB0aGlzLm5lZygpLmRpdm1vZChudW0sIG1vZGUpO1xuXG4gICAgICBpZiAobW9kZSAhPT0gJ21vZCcpIHtcbiAgICAgICAgZGl2ID0gcmVzLmRpdi5uZWcoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1vZGUgIT09ICdkaXYnKSB7XG4gICAgICAgIG1vZCA9IHJlcy5tb2QubmVnKCk7XG4gICAgICAgIGlmIChwb3NpdGl2ZSAmJiBtb2QubmVnYXRpdmUgIT09IDApIHtcbiAgICAgICAgICBtb2QuaWFkZChudW0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRpdjogZGl2LFxuICAgICAgICBtb2Q6IG1vZFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5uZWdhdGl2ZSA9PT0gMCAmJiBudW0ubmVnYXRpdmUgIT09IDApIHtcbiAgICAgIHJlcyA9IHRoaXMuZGl2bW9kKG51bS5uZWcoKSwgbW9kZSk7XG5cbiAgICAgIGlmIChtb2RlICE9PSAnbW9kJykge1xuICAgICAgICBkaXYgPSByZXMuZGl2Lm5lZygpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBkaXY6IGRpdixcbiAgICAgICAgbW9kOiByZXMubW9kXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICgodGhpcy5uZWdhdGl2ZSAmIG51bS5uZWdhdGl2ZSkgIT09IDApIHtcbiAgICAgIHJlcyA9IHRoaXMubmVnKCkuZGl2bW9kKG51bS5uZWcoKSwgbW9kZSk7XG5cbiAgICAgIGlmIChtb2RlICE9PSAnZGl2Jykge1xuICAgICAgICBtb2QgPSByZXMubW9kLm5lZygpO1xuICAgICAgICBpZiAocG9zaXRpdmUgJiYgbW9kLm5lZ2F0aXZlICE9PSAwKSB7XG4gICAgICAgICAgbW9kLmlzdWIobnVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBkaXY6IHJlcy5kaXYsXG4gICAgICAgIG1vZDogbW9kXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIEJvdGggbnVtYmVycyBhcmUgcG9zaXRpdmUgYXQgdGhpcyBwb2ludFxuXG4gICAgLy8gU3RyaXAgYm90aCBudW1iZXJzIHRvIGFwcHJveGltYXRlIHNoaWZ0IHZhbHVlXG4gICAgaWYgKG51bS5sZW5ndGggPiB0aGlzLmxlbmd0aCB8fCB0aGlzLmNtcChudW0pIDwgMCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGl2OiBuZXcgQk4oMCksXG4gICAgICAgIG1vZDogdGhpc1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBWZXJ5IHNob3J0IHJlZHVjdGlvblxuICAgIGlmIChudW0ubGVuZ3RoID09PSAxKSB7XG4gICAgICBpZiAobW9kZSA9PT0gJ2RpdicpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBkaXY6IHRoaXMuZGl2bihudW0ud29yZHNbMF0pLFxuICAgICAgICAgIG1vZDogbnVsbFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBpZiAobW9kZSA9PT0gJ21vZCcpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBkaXY6IG51bGwsXG4gICAgICAgICAgbW9kOiBuZXcgQk4odGhpcy5tb2RuKG51bS53b3Jkc1swXSkpXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRpdjogdGhpcy5kaXZuKG51bS53b3Jkc1swXSksXG4gICAgICAgIG1vZDogbmV3IEJOKHRoaXMubW9kbihudW0ud29yZHNbMF0pKVxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fd29yZERpdihudW0sIG1vZGUpO1xuICB9O1xuXG4gIC8vIEZpbmQgYHRoaXNgIC8gYG51bWBcbiAgQk4ucHJvdG90eXBlLmRpdiA9IGZ1bmN0aW9uIGRpdiAobnVtKSB7XG4gICAgcmV0dXJuIHRoaXMuZGl2bW9kKG51bSwgJ2RpdicsIGZhbHNlKS5kaXY7XG4gIH07XG5cbiAgLy8gRmluZCBgdGhpc2AgJSBgbnVtYFxuICBCTi5wcm90b3R5cGUubW9kID0gZnVuY3Rpb24gbW9kIChudW0pIHtcbiAgICByZXR1cm4gdGhpcy5kaXZtb2QobnVtLCAnbW9kJywgZmFsc2UpLm1vZDtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUudW1vZCA9IGZ1bmN0aW9uIHVtb2QgKG51bSkge1xuICAgIHJldHVybiB0aGlzLmRpdm1vZChudW0sICdtb2QnLCB0cnVlKS5tb2Q7XG4gIH07XG5cbiAgLy8gRmluZCBSb3VuZChgdGhpc2AgLyBgbnVtYClcbiAgQk4ucHJvdG90eXBlLmRpdlJvdW5kID0gZnVuY3Rpb24gZGl2Um91bmQgKG51bSkge1xuICAgIHZhciBkbSA9IHRoaXMuZGl2bW9kKG51bSk7XG5cbiAgICAvLyBGYXN0IGNhc2UgLSBleGFjdCBkaXZpc2lvblxuICAgIGlmIChkbS5tb2QuaXNaZXJvKCkpIHJldHVybiBkbS5kaXY7XG5cbiAgICB2YXIgbW9kID0gZG0uZGl2Lm5lZ2F0aXZlICE9PSAwID8gZG0ubW9kLmlzdWIobnVtKSA6IGRtLm1vZDtcblxuICAgIHZhciBoYWxmID0gbnVtLnVzaHJuKDEpO1xuICAgIHZhciByMiA9IG51bS5hbmRsbigxKTtcbiAgICB2YXIgY21wID0gbW9kLmNtcChoYWxmKTtcblxuICAgIC8vIFJvdW5kIGRvd25cbiAgICBpZiAoY21wIDwgMCB8fCByMiA9PT0gMSAmJiBjbXAgPT09IDApIHJldHVybiBkbS5kaXY7XG5cbiAgICAvLyBSb3VuZCB1cFxuICAgIHJldHVybiBkbS5kaXYubmVnYXRpdmUgIT09IDAgPyBkbS5kaXYuaXN1Ym4oMSkgOiBkbS5kaXYuaWFkZG4oMSk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLm1vZG4gPSBmdW5jdGlvbiBtb2RuIChudW0pIHtcbiAgICBhc3NlcnQobnVtIDw9IDB4M2ZmZmZmZik7XG4gICAgdmFyIHAgPSAoMSA8PCAyNikgJSBudW07XG5cbiAgICB2YXIgYWNjID0gMDtcbiAgICBmb3IgKHZhciBpID0gdGhpcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgYWNjID0gKHAgKiBhY2MgKyAodGhpcy53b3Jkc1tpXSB8IDApKSAlIG51bTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWNjO1xuICB9O1xuXG4gIC8vIEluLXBsYWNlIGRpdmlzaW9uIGJ5IG51bWJlclxuICBCTi5wcm90b3R5cGUuaWRpdm4gPSBmdW5jdGlvbiBpZGl2biAobnVtKSB7XG4gICAgYXNzZXJ0KG51bSA8PSAweDNmZmZmZmYpO1xuXG4gICAgdmFyIGNhcnJ5ID0gMDtcbiAgICBmb3IgKHZhciBpID0gdGhpcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIHcgPSAodGhpcy53b3Jkc1tpXSB8IDApICsgY2FycnkgKiAweDQwMDAwMDA7XG4gICAgICB0aGlzLndvcmRzW2ldID0gKHcgLyBudW0pIHwgMDtcbiAgICAgIGNhcnJ5ID0gdyAlIG51bTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zdHJpcCgpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5kaXZuID0gZnVuY3Rpb24gZGl2biAobnVtKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5pZGl2bihudW0pO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5lZ2NkID0gZnVuY3Rpb24gZWdjZCAocCkge1xuICAgIGFzc2VydChwLm5lZ2F0aXZlID09PSAwKTtcbiAgICBhc3NlcnQoIXAuaXNaZXJvKCkpO1xuXG4gICAgdmFyIHggPSB0aGlzO1xuICAgIHZhciB5ID0gcC5jbG9uZSgpO1xuXG4gICAgaWYgKHgubmVnYXRpdmUgIT09IDApIHtcbiAgICAgIHggPSB4LnVtb2QocCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHggPSB4LmNsb25lKCk7XG4gICAgfVxuXG4gICAgLy8gQSAqIHggKyBCICogeSA9IHhcbiAgICB2YXIgQSA9IG5ldyBCTigxKTtcbiAgICB2YXIgQiA9IG5ldyBCTigwKTtcblxuICAgIC8vIEMgKiB4ICsgRCAqIHkgPSB5XG4gICAgdmFyIEMgPSBuZXcgQk4oMCk7XG4gICAgdmFyIEQgPSBuZXcgQk4oMSk7XG5cbiAgICB2YXIgZyA9IDA7XG5cbiAgICB3aGlsZSAoeC5pc0V2ZW4oKSAmJiB5LmlzRXZlbigpKSB7XG4gICAgICB4Lml1c2hybigxKTtcbiAgICAgIHkuaXVzaHJuKDEpO1xuICAgICAgKytnO1xuICAgIH1cblxuICAgIHZhciB5cCA9IHkuY2xvbmUoKTtcbiAgICB2YXIgeHAgPSB4LmNsb25lKCk7XG5cbiAgICB3aGlsZSAoIXguaXNaZXJvKCkpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBpbSA9IDE7ICh4LndvcmRzWzBdICYgaW0pID09PSAwICYmIGkgPCAyNjsgKytpLCBpbSA8PD0gMSk7XG4gICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgeC5pdXNocm4oaSk7XG4gICAgICAgIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgICAgICAgaWYgKEEuaXNPZGQoKSB8fCBCLmlzT2RkKCkpIHtcbiAgICAgICAgICAgIEEuaWFkZCh5cCk7XG4gICAgICAgICAgICBCLmlzdWIoeHApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIEEuaXVzaHJuKDEpO1xuICAgICAgICAgIEIuaXVzaHJuKDEpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGogPSAwLCBqbSA9IDE7ICh5LndvcmRzWzBdICYgam0pID09PSAwICYmIGogPCAyNjsgKytqLCBqbSA8PD0gMSk7XG4gICAgICBpZiAoaiA+IDApIHtcbiAgICAgICAgeS5pdXNocm4oaik7XG4gICAgICAgIHdoaWxlIChqLS0gPiAwKSB7XG4gICAgICAgICAgaWYgKEMuaXNPZGQoKSB8fCBELmlzT2RkKCkpIHtcbiAgICAgICAgICAgIEMuaWFkZCh5cCk7XG4gICAgICAgICAgICBELmlzdWIoeHApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIEMuaXVzaHJuKDEpO1xuICAgICAgICAgIEQuaXVzaHJuKDEpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh4LmNtcCh5KSA+PSAwKSB7XG4gICAgICAgIHguaXN1Yih5KTtcbiAgICAgICAgQS5pc3ViKEMpO1xuICAgICAgICBCLmlzdWIoRCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB5LmlzdWIoeCk7XG4gICAgICAgIEMuaXN1YihBKTtcbiAgICAgICAgRC5pc3ViKEIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBhOiBDLFxuICAgICAgYjogRCxcbiAgICAgIGdjZDogeS5pdXNobG4oZylcbiAgICB9O1xuICB9O1xuXG4gIC8vIFRoaXMgaXMgcmVkdWNlZCBpbmNhcm5hdGlvbiBvZiB0aGUgYmluYXJ5IEVFQVxuICAvLyBhYm92ZSwgZGVzaWduYXRlZCB0byBpbnZlcnQgbWVtYmVycyBvZiB0aGVcbiAgLy8gX3ByaW1lXyBmaWVsZHMgRihwKSBhdCBhIG1heGltYWwgc3BlZWRcbiAgQk4ucHJvdG90eXBlLl9pbnZtcCA9IGZ1bmN0aW9uIF9pbnZtcCAocCkge1xuICAgIGFzc2VydChwLm5lZ2F0aXZlID09PSAwKTtcbiAgICBhc3NlcnQoIXAuaXNaZXJvKCkpO1xuXG4gICAgdmFyIGEgPSB0aGlzO1xuICAgIHZhciBiID0gcC5jbG9uZSgpO1xuXG4gICAgaWYgKGEubmVnYXRpdmUgIT09IDApIHtcbiAgICAgIGEgPSBhLnVtb2QocCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGEgPSBhLmNsb25lKCk7XG4gICAgfVxuXG4gICAgdmFyIHgxID0gbmV3IEJOKDEpO1xuICAgIHZhciB4MiA9IG5ldyBCTigwKTtcblxuICAgIHZhciBkZWx0YSA9IGIuY2xvbmUoKTtcblxuICAgIHdoaWxlIChhLmNtcG4oMSkgPiAwICYmIGIuY21wbigxKSA+IDApIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBpbSA9IDE7IChhLndvcmRzWzBdICYgaW0pID09PSAwICYmIGkgPCAyNjsgKytpLCBpbSA8PD0gMSk7XG4gICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgYS5pdXNocm4oaSk7XG4gICAgICAgIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgICAgICAgaWYgKHgxLmlzT2RkKCkpIHtcbiAgICAgICAgICAgIHgxLmlhZGQoZGVsdGEpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHgxLml1c2hybigxKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBqID0gMCwgam0gPSAxOyAoYi53b3Jkc1swXSAmIGptKSA9PT0gMCAmJiBqIDwgMjY7ICsraiwgam0gPDw9IDEpO1xuICAgICAgaWYgKGogPiAwKSB7XG4gICAgICAgIGIuaXVzaHJuKGopO1xuICAgICAgICB3aGlsZSAoai0tID4gMCkge1xuICAgICAgICAgIGlmICh4Mi5pc09kZCgpKSB7XG4gICAgICAgICAgICB4Mi5pYWRkKGRlbHRhKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB4Mi5pdXNocm4oMSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGEuY21wKGIpID49IDApIHtcbiAgICAgICAgYS5pc3ViKGIpO1xuICAgICAgICB4MS5pc3ViKHgyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGIuaXN1YihhKTtcbiAgICAgICAgeDIuaXN1Yih4MSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHJlcztcbiAgICBpZiAoYS5jbXBuKDEpID09PSAwKSB7XG4gICAgICByZXMgPSB4MTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzID0geDI7XG4gICAgfVxuXG4gICAgaWYgKHJlcy5jbXBuKDApIDwgMCkge1xuICAgICAgcmVzLmlhZGQocCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbiAgfTtcblxuICBCTi5wcm90b3R5cGUuZ2NkID0gZnVuY3Rpb24gZ2NkIChudW0pIHtcbiAgICBpZiAodGhpcy5pc1plcm8oKSkgcmV0dXJuIG51bS5hYnMoKTtcbiAgICBpZiAobnVtLmlzWmVybygpKSByZXR1cm4gdGhpcy5hYnMoKTtcblxuICAgIHZhciBhID0gdGhpcy5jbG9uZSgpO1xuICAgIHZhciBiID0gbnVtLmNsb25lKCk7XG4gICAgYS5uZWdhdGl2ZSA9IDA7XG4gICAgYi5uZWdhdGl2ZSA9IDA7XG5cbiAgICAvLyBSZW1vdmUgY29tbW9uIGZhY3RvciBvZiB0d29cbiAgICBmb3IgKHZhciBzaGlmdCA9IDA7IGEuaXNFdmVuKCkgJiYgYi5pc0V2ZW4oKTsgc2hpZnQrKykge1xuICAgICAgYS5pdXNocm4oMSk7XG4gICAgICBiLml1c2hybigxKTtcbiAgICB9XG5cbiAgICBkbyB7XG4gICAgICB3aGlsZSAoYS5pc0V2ZW4oKSkge1xuICAgICAgICBhLml1c2hybigxKTtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChiLmlzRXZlbigpKSB7XG4gICAgICAgIGIuaXVzaHJuKDEpO1xuICAgICAgfVxuXG4gICAgICB2YXIgciA9IGEuY21wKGIpO1xuICAgICAgaWYgKHIgPCAwKSB7XG4gICAgICAgIC8vIFN3YXAgYGFgIGFuZCBgYmAgdG8gbWFrZSBgYWAgYWx3YXlzIGJpZ2dlciB0aGFuIGBiYFxuICAgICAgICB2YXIgdCA9IGE7XG4gICAgICAgIGEgPSBiO1xuICAgICAgICBiID0gdDtcbiAgICAgIH0gZWxzZSBpZiAociA9PT0gMCB8fCBiLmNtcG4oMSkgPT09IDApIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGEuaXN1YihiKTtcbiAgICB9IHdoaWxlICh0cnVlKTtcblxuICAgIHJldHVybiBiLml1c2hsbihzaGlmdCk7XG4gIH07XG5cbiAgLy8gSW52ZXJ0IG51bWJlciBpbiB0aGUgZmllbGQgRihudW0pXG4gIEJOLnByb3RvdHlwZS5pbnZtID0gZnVuY3Rpb24gaW52bSAobnVtKSB7XG4gICAgcmV0dXJuIHRoaXMuZWdjZChudW0pLmEudW1vZChudW0pO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5pc0V2ZW4gPSBmdW5jdGlvbiBpc0V2ZW4gKCkge1xuICAgIHJldHVybiAodGhpcy53b3Jkc1swXSAmIDEpID09PSAwO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5pc09kZCA9IGZ1bmN0aW9uIGlzT2RkICgpIHtcbiAgICByZXR1cm4gKHRoaXMud29yZHNbMF0gJiAxKSA9PT0gMTtcbiAgfTtcblxuICAvLyBBbmQgZmlyc3Qgd29yZCBhbmQgbnVtXG4gIEJOLnByb3RvdHlwZS5hbmRsbiA9IGZ1bmN0aW9uIGFuZGxuIChudW0pIHtcbiAgICByZXR1cm4gdGhpcy53b3Jkc1swXSAmIG51bTtcbiAgfTtcblxuICAvLyBJbmNyZW1lbnQgYXQgdGhlIGJpdCBwb3NpdGlvbiBpbi1saW5lXG4gIEJOLnByb3RvdHlwZS5iaW5jbiA9IGZ1bmN0aW9uIGJpbmNuIChiaXQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGJpdCA9PT0gJ251bWJlcicpO1xuICAgIHZhciByID0gYml0ICUgMjY7XG4gICAgdmFyIHMgPSAoYml0IC0gcikgLyAyNjtcbiAgICB2YXIgcSA9IDEgPDwgcjtcblxuICAgIC8vIEZhc3QgY2FzZTogYml0IGlzIG11Y2ggaGlnaGVyIHRoYW4gYWxsIGV4aXN0aW5nIHdvcmRzXG4gICAgaWYgKHRoaXMubGVuZ3RoIDw9IHMpIHtcbiAgICAgIHRoaXMuX2V4cGFuZChzICsgMSk7XG4gICAgICB0aGlzLndvcmRzW3NdIHw9IHE7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBBZGQgYml0IGFuZCBwcm9wYWdhdGUsIGlmIG5lZWRlZFxuICAgIHZhciBjYXJyeSA9IHE7XG4gICAgZm9yICh2YXIgaSA9IHM7IGNhcnJ5ICE9PSAwICYmIGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdyA9IHRoaXMud29yZHNbaV0gfCAwO1xuICAgICAgdyArPSBjYXJyeTtcbiAgICAgIGNhcnJ5ID0gdyA+Pj4gMjY7XG4gICAgICB3ICY9IDB4M2ZmZmZmZjtcbiAgICAgIHRoaXMud29yZHNbaV0gPSB3O1xuICAgIH1cbiAgICBpZiAoY2FycnkgIT09IDApIHtcbiAgICAgIHRoaXMud29yZHNbaV0gPSBjYXJyeTtcbiAgICAgIHRoaXMubGVuZ3RoKys7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5pc1plcm8gPSBmdW5jdGlvbiBpc1plcm8gKCkge1xuICAgIHJldHVybiB0aGlzLmxlbmd0aCA9PT0gMSAmJiB0aGlzLndvcmRzWzBdID09PSAwO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5jbXBuID0gZnVuY3Rpb24gY21wbiAobnVtKSB7XG4gICAgdmFyIG5lZ2F0aXZlID0gbnVtIDwgMDtcblxuICAgIGlmICh0aGlzLm5lZ2F0aXZlICE9PSAwICYmICFuZWdhdGl2ZSkgcmV0dXJuIC0xO1xuICAgIGlmICh0aGlzLm5lZ2F0aXZlID09PSAwICYmIG5lZ2F0aXZlKSByZXR1cm4gMTtcblxuICAgIHRoaXMuc3RyaXAoKTtcblxuICAgIHZhciByZXM7XG4gICAgaWYgKHRoaXMubGVuZ3RoID4gMSkge1xuICAgICAgcmVzID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG5lZ2F0aXZlKSB7XG4gICAgICAgIG51bSA9IC1udW07XG4gICAgICB9XG5cbiAgICAgIGFzc2VydChudW0gPD0gMHgzZmZmZmZmLCAnTnVtYmVyIGlzIHRvbyBiaWcnKTtcblxuICAgICAgdmFyIHcgPSB0aGlzLndvcmRzWzBdIHwgMDtcbiAgICAgIHJlcyA9IHcgPT09IG51bSA/IDAgOiB3IDwgbnVtID8gLTEgOiAxO1xuICAgIH1cbiAgICBpZiAodGhpcy5uZWdhdGl2ZSAhPT0gMCkgcmV0dXJuIC1yZXMgfCAwO1xuICAgIHJldHVybiByZXM7XG4gIH07XG5cbiAgLy8gQ29tcGFyZSB0d28gbnVtYmVycyBhbmQgcmV0dXJuOlxuICAvLyAxIC0gaWYgYHRoaXNgID4gYG51bWBcbiAgLy8gMCAtIGlmIGB0aGlzYCA9PSBgbnVtYFxuICAvLyAtMSAtIGlmIGB0aGlzYCA8IGBudW1gXG4gIEJOLnByb3RvdHlwZS5jbXAgPSBmdW5jdGlvbiBjbXAgKG51bSkge1xuICAgIGlmICh0aGlzLm5lZ2F0aXZlICE9PSAwICYmIG51bS5uZWdhdGl2ZSA9PT0gMCkgcmV0dXJuIC0xO1xuICAgIGlmICh0aGlzLm5lZ2F0aXZlID09PSAwICYmIG51bS5uZWdhdGl2ZSAhPT0gMCkgcmV0dXJuIDE7XG5cbiAgICB2YXIgcmVzID0gdGhpcy51Y21wKG51bSk7XG4gICAgaWYgKHRoaXMubmVnYXRpdmUgIT09IDApIHJldHVybiAtcmVzIHwgMDtcbiAgICByZXR1cm4gcmVzO1xuICB9O1xuXG4gIC8vIFVuc2lnbmVkIGNvbXBhcmlzb25cbiAgQk4ucHJvdG90eXBlLnVjbXAgPSBmdW5jdGlvbiB1Y21wIChudW0pIHtcbiAgICAvLyBBdCB0aGlzIHBvaW50IGJvdGggbnVtYmVycyBoYXZlIHRoZSBzYW1lIHNpZ25cbiAgICBpZiAodGhpcy5sZW5ndGggPiBudW0ubGVuZ3RoKSByZXR1cm4gMTtcbiAgICBpZiAodGhpcy5sZW5ndGggPCBudW0ubGVuZ3RoKSByZXR1cm4gLTE7XG5cbiAgICB2YXIgcmVzID0gMDtcbiAgICBmb3IgKHZhciBpID0gdGhpcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGEgPSB0aGlzLndvcmRzW2ldIHwgMDtcbiAgICAgIHZhciBiID0gbnVtLndvcmRzW2ldIHwgMDtcblxuICAgICAgaWYgKGEgPT09IGIpIGNvbnRpbnVlO1xuICAgICAgaWYgKGEgPCBiKSB7XG4gICAgICAgIHJlcyA9IC0xO1xuICAgICAgfSBlbHNlIGlmIChhID4gYikge1xuICAgICAgICByZXMgPSAxO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLmd0biA9IGZ1bmN0aW9uIGd0biAobnVtKSB7XG4gICAgcmV0dXJuIHRoaXMuY21wbihudW0pID09PSAxO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5ndCA9IGZ1bmN0aW9uIGd0IChudW0pIHtcbiAgICByZXR1cm4gdGhpcy5jbXAobnVtKSA9PT0gMTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUuZ3RlbiA9IGZ1bmN0aW9uIGd0ZW4gKG51bSkge1xuICAgIHJldHVybiB0aGlzLmNtcG4obnVtKSA+PSAwO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5ndGUgPSBmdW5jdGlvbiBndGUgKG51bSkge1xuICAgIHJldHVybiB0aGlzLmNtcChudW0pID49IDA7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLmx0biA9IGZ1bmN0aW9uIGx0biAobnVtKSB7XG4gICAgcmV0dXJuIHRoaXMuY21wbihudW0pID09PSAtMTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUubHQgPSBmdW5jdGlvbiBsdCAobnVtKSB7XG4gICAgcmV0dXJuIHRoaXMuY21wKG51bSkgPT09IC0xO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5sdGVuID0gZnVuY3Rpb24gbHRlbiAobnVtKSB7XG4gICAgcmV0dXJuIHRoaXMuY21wbihudW0pIDw9IDA7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLmx0ZSA9IGZ1bmN0aW9uIGx0ZSAobnVtKSB7XG4gICAgcmV0dXJuIHRoaXMuY21wKG51bSkgPD0gMDtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUuZXFuID0gZnVuY3Rpb24gZXFuIChudW0pIHtcbiAgICByZXR1cm4gdGhpcy5jbXBuKG51bSkgPT09IDA7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLmVxID0gZnVuY3Rpb24gZXEgKG51bSkge1xuICAgIHJldHVybiB0aGlzLmNtcChudW0pID09PSAwO1xuICB9O1xuXG4gIC8vXG4gIC8vIEEgcmVkdWNlIGNvbnRleHQsIGNvdWxkIGJlIHVzaW5nIG1vbnRnb21lcnkgb3Igc29tZXRoaW5nIGJldHRlciwgZGVwZW5kaW5nXG4gIC8vIG9uIHRoZSBgbWAgaXRzZWxmLlxuICAvL1xuICBCTi5yZWQgPSBmdW5jdGlvbiByZWQgKG51bSkge1xuICAgIHJldHVybiBuZXcgUmVkKG51bSk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLnRvUmVkID0gZnVuY3Rpb24gdG9SZWQgKGN0eCkge1xuICAgIGFzc2VydCghdGhpcy5yZWQsICdBbHJlYWR5IGEgbnVtYmVyIGluIHJlZHVjdGlvbiBjb250ZXh0Jyk7XG4gICAgYXNzZXJ0KHRoaXMubmVnYXRpdmUgPT09IDAsICdyZWQgd29ya3Mgb25seSB3aXRoIHBvc2l0aXZlcycpO1xuICAgIHJldHVybiBjdHguY29udmVydFRvKHRoaXMpLl9mb3JjZVJlZChjdHgpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5mcm9tUmVkID0gZnVuY3Rpb24gZnJvbVJlZCAoKSB7XG4gICAgYXNzZXJ0KHRoaXMucmVkLCAnZnJvbVJlZCB3b3JrcyBvbmx5IHdpdGggbnVtYmVycyBpbiByZWR1Y3Rpb24gY29udGV4dCcpO1xuICAgIHJldHVybiB0aGlzLnJlZC5jb252ZXJ0RnJvbSh0aGlzKTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUuX2ZvcmNlUmVkID0gZnVuY3Rpb24gX2ZvcmNlUmVkIChjdHgpIHtcbiAgICB0aGlzLnJlZCA9IGN0eDtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBCTi5wcm90b3R5cGUuZm9yY2VSZWQgPSBmdW5jdGlvbiBmb3JjZVJlZCAoY3R4KSB7XG4gICAgYXNzZXJ0KCF0aGlzLnJlZCwgJ0FscmVhZHkgYSBudW1iZXIgaW4gcmVkdWN0aW9uIGNvbnRleHQnKTtcbiAgICByZXR1cm4gdGhpcy5fZm9yY2VSZWQoY3R4KTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUucmVkQWRkID0gZnVuY3Rpb24gcmVkQWRkIChudW0pIHtcbiAgICBhc3NlcnQodGhpcy5yZWQsICdyZWRBZGQgd29ya3Mgb25seSB3aXRoIHJlZCBudW1iZXJzJyk7XG4gICAgcmV0dXJuIHRoaXMucmVkLmFkZCh0aGlzLCBudW0pO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5yZWRJQWRkID0gZnVuY3Rpb24gcmVkSUFkZCAobnVtKSB7XG4gICAgYXNzZXJ0KHRoaXMucmVkLCAncmVkSUFkZCB3b3JrcyBvbmx5IHdpdGggcmVkIG51bWJlcnMnKTtcbiAgICByZXR1cm4gdGhpcy5yZWQuaWFkZCh0aGlzLCBudW0pO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5yZWRTdWIgPSBmdW5jdGlvbiByZWRTdWIgKG51bSkge1xuICAgIGFzc2VydCh0aGlzLnJlZCwgJ3JlZFN1YiB3b3JrcyBvbmx5IHdpdGggcmVkIG51bWJlcnMnKTtcbiAgICByZXR1cm4gdGhpcy5yZWQuc3ViKHRoaXMsIG51bSk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLnJlZElTdWIgPSBmdW5jdGlvbiByZWRJU3ViIChudW0pIHtcbiAgICBhc3NlcnQodGhpcy5yZWQsICdyZWRJU3ViIHdvcmtzIG9ubHkgd2l0aCByZWQgbnVtYmVycycpO1xuICAgIHJldHVybiB0aGlzLnJlZC5pc3ViKHRoaXMsIG51bSk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLnJlZFNobCA9IGZ1bmN0aW9uIHJlZFNobCAobnVtKSB7XG4gICAgYXNzZXJ0KHRoaXMucmVkLCAncmVkU2hsIHdvcmtzIG9ubHkgd2l0aCByZWQgbnVtYmVycycpO1xuICAgIHJldHVybiB0aGlzLnJlZC5zaGwodGhpcywgbnVtKTtcbiAgfTtcblxuICBCTi5wcm90b3R5cGUucmVkTXVsID0gZnVuY3Rpb24gcmVkTXVsIChudW0pIHtcbiAgICBhc3NlcnQodGhpcy5yZWQsICdyZWRNdWwgd29ya3Mgb25seSB3aXRoIHJlZCBudW1iZXJzJyk7XG4gICAgdGhpcy5yZWQuX3ZlcmlmeTIodGhpcywgbnVtKTtcbiAgICByZXR1cm4gdGhpcy5yZWQubXVsKHRoaXMsIG51bSk7XG4gIH07XG5cbiAgQk4ucHJvdG90eXBlLnJlZElNdWwgPSBmdW5jdGlvbiByZWRJTXVsIChudW0pIHtcbiAgICBhc3NlcnQodGhpcy5yZWQsICdyZWRNdWwgd29ya3Mgb25seSB3aXRoIHJlZCBudW1iZXJzJyk7XG4gICAgdGhpcy5yZWQuX3ZlcmlmeTIodGhpcywgbnVtKTtcbiAgICByZXR1cm4gdGhpcy5yZWQuaW11bCh0aGlzLCBudW0pO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5yZWRTcXIgPSBmdW5jdGlvbiByZWRTcXIgKCkge1xuICAgIGFzc2VydCh0aGlzLnJlZCwgJ3JlZFNxciB3b3JrcyBvbmx5IHdpdGggcmVkIG51bWJlcnMnKTtcbiAgICB0aGlzLnJlZC5fdmVyaWZ5MSh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5yZWQuc3FyKHRoaXMpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5yZWRJU3FyID0gZnVuY3Rpb24gcmVkSVNxciAoKSB7XG4gICAgYXNzZXJ0KHRoaXMucmVkLCAncmVkSVNxciB3b3JrcyBvbmx5IHdpdGggcmVkIG51bWJlcnMnKTtcbiAgICB0aGlzLnJlZC5fdmVyaWZ5MSh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5yZWQuaXNxcih0aGlzKTtcbiAgfTtcblxuICAvLyBTcXVhcmUgcm9vdCBvdmVyIHBcbiAgQk4ucHJvdG90eXBlLnJlZFNxcnQgPSBmdW5jdGlvbiByZWRTcXJ0ICgpIHtcbiAgICBhc3NlcnQodGhpcy5yZWQsICdyZWRTcXJ0IHdvcmtzIG9ubHkgd2l0aCByZWQgbnVtYmVycycpO1xuICAgIHRoaXMucmVkLl92ZXJpZnkxKHRoaXMpO1xuICAgIHJldHVybiB0aGlzLnJlZC5zcXJ0KHRoaXMpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5yZWRJbnZtID0gZnVuY3Rpb24gcmVkSW52bSAoKSB7XG4gICAgYXNzZXJ0KHRoaXMucmVkLCAncmVkSW52bSB3b3JrcyBvbmx5IHdpdGggcmVkIG51bWJlcnMnKTtcbiAgICB0aGlzLnJlZC5fdmVyaWZ5MSh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5yZWQuaW52bSh0aGlzKTtcbiAgfTtcblxuICAvLyBSZXR1cm4gbmVnYXRpdmUgY2xvbmUgb2YgYHRoaXNgICUgYHJlZCBtb2R1bG9gXG4gIEJOLnByb3RvdHlwZS5yZWROZWcgPSBmdW5jdGlvbiByZWROZWcgKCkge1xuICAgIGFzc2VydCh0aGlzLnJlZCwgJ3JlZE5lZyB3b3JrcyBvbmx5IHdpdGggcmVkIG51bWJlcnMnKTtcbiAgICB0aGlzLnJlZC5fdmVyaWZ5MSh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5yZWQubmVnKHRoaXMpO1xuICB9O1xuXG4gIEJOLnByb3RvdHlwZS5yZWRQb3cgPSBmdW5jdGlvbiByZWRQb3cgKG51bSkge1xuICAgIGFzc2VydCh0aGlzLnJlZCAmJiAhbnVtLnJlZCwgJ3JlZFBvdyhub3JtYWxOdW0pJyk7XG4gICAgdGhpcy5yZWQuX3ZlcmlmeTEodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMucmVkLnBvdyh0aGlzLCBudW0pO1xuICB9O1xuXG4gIC8vIFByaW1lIG51bWJlcnMgd2l0aCBlZmZpY2llbnQgcmVkdWN0aW9uXG4gIHZhciBwcmltZXMgPSB7XG4gICAgazI1NjogbnVsbCxcbiAgICBwMjI0OiBudWxsLFxuICAgIHAxOTI6IG51bGwsXG4gICAgcDI1NTE5OiBudWxsXG4gIH07XG5cbiAgLy8gUHNldWRvLU1lcnNlbm5lIHByaW1lXG4gIGZ1bmN0aW9uIE1QcmltZSAobmFtZSwgcCkge1xuICAgIC8vIFAgPSAyIF4gTiAtIEtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMucCA9IG5ldyBCTihwLCAxNik7XG4gICAgdGhpcy5uID0gdGhpcy5wLmJpdExlbmd0aCgpO1xuICAgIHRoaXMuayA9IG5ldyBCTigxKS5pdXNobG4odGhpcy5uKS5pc3ViKHRoaXMucCk7XG5cbiAgICB0aGlzLnRtcCA9IHRoaXMuX3RtcCgpO1xuICB9XG5cbiAgTVByaW1lLnByb3RvdHlwZS5fdG1wID0gZnVuY3Rpb24gX3RtcCAoKSB7XG4gICAgdmFyIHRtcCA9IG5ldyBCTihudWxsKTtcbiAgICB0bXAud29yZHMgPSBuZXcgQXJyYXkoTWF0aC5jZWlsKHRoaXMubiAvIDEzKSk7XG4gICAgcmV0dXJuIHRtcDtcbiAgfTtcblxuICBNUHJpbWUucHJvdG90eXBlLmlyZWR1Y2UgPSBmdW5jdGlvbiBpcmVkdWNlIChudW0pIHtcbiAgICAvLyBBc3N1bWVzIHRoYXQgYG51bWAgaXMgbGVzcyB0aGFuIGBQXjJgXG4gICAgLy8gbnVtID0gSEkgKiAoMiBeIE4gLSBLKSArIEhJICogSyArIExPID0gSEkgKiBLICsgTE8gKG1vZCBQKVxuICAgIHZhciByID0gbnVtO1xuICAgIHZhciBybGVuO1xuXG4gICAgZG8ge1xuICAgICAgdGhpcy5zcGxpdChyLCB0aGlzLnRtcCk7XG4gICAgICByID0gdGhpcy5pbXVsSyhyKTtcbiAgICAgIHIgPSByLmlhZGQodGhpcy50bXApO1xuICAgICAgcmxlbiA9IHIuYml0TGVuZ3RoKCk7XG4gICAgfSB3aGlsZSAocmxlbiA+IHRoaXMubik7XG5cbiAgICB2YXIgY21wID0gcmxlbiA8IHRoaXMubiA/IC0xIDogci51Y21wKHRoaXMucCk7XG4gICAgaWYgKGNtcCA9PT0gMCkge1xuICAgICAgci53b3Jkc1swXSA9IDA7XG4gICAgICByLmxlbmd0aCA9IDE7XG4gICAgfSBlbHNlIGlmIChjbXAgPiAwKSB7XG4gICAgICByLmlzdWIodGhpcy5wKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHIuc3RyaXAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyByIGlzIEJOIHY0IGluc3RhbmNlXG4gICAgICAgIHIuc3RyaXAoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHIgaXMgQk4gdjUgaW5zdGFuY2VcbiAgICAgICAgci5fc3RyaXAoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcjtcbiAgfTtcblxuICBNUHJpbWUucHJvdG90eXBlLnNwbGl0ID0gZnVuY3Rpb24gc3BsaXQgKGlucHV0LCBvdXQpIHtcbiAgICBpbnB1dC5pdXNocm4odGhpcy5uLCAwLCBvdXQpO1xuICB9O1xuXG4gIE1QcmltZS5wcm90b3R5cGUuaW11bEsgPSBmdW5jdGlvbiBpbXVsSyAobnVtKSB7XG4gICAgcmV0dXJuIG51bS5pbXVsKHRoaXMuayk7XG4gIH07XG5cbiAgZnVuY3Rpb24gSzI1NiAoKSB7XG4gICAgTVByaW1lLmNhbGwoXG4gICAgICB0aGlzLFxuICAgICAgJ2syNTYnLFxuICAgICAgJ2ZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZlIGZmZmZmYzJmJyk7XG4gIH1cbiAgaW5oZXJpdHMoSzI1NiwgTVByaW1lKTtcblxuICBLMjU2LnByb3RvdHlwZS5zcGxpdCA9IGZ1bmN0aW9uIHNwbGl0IChpbnB1dCwgb3V0cHV0KSB7XG4gICAgLy8gMjU2ID0gOSAqIDI2ICsgMjJcbiAgICB2YXIgbWFzayA9IDB4M2ZmZmZmO1xuXG4gICAgdmFyIG91dExlbiA9IE1hdGgubWluKGlucHV0Lmxlbmd0aCwgOSk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvdXRMZW47IGkrKykge1xuICAgICAgb3V0cHV0LndvcmRzW2ldID0gaW5wdXQud29yZHNbaV07XG4gICAgfVxuICAgIG91dHB1dC5sZW5ndGggPSBvdXRMZW47XG5cbiAgICBpZiAoaW5wdXQubGVuZ3RoIDw9IDkpIHtcbiAgICAgIGlucHV0LndvcmRzWzBdID0gMDtcbiAgICAgIGlucHV0Lmxlbmd0aCA9IDE7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gU2hpZnQgYnkgOSBsaW1ic1xuICAgIHZhciBwcmV2ID0gaW5wdXQud29yZHNbOV07XG4gICAgb3V0cHV0LndvcmRzW291dHB1dC5sZW5ndGgrK10gPSBwcmV2ICYgbWFzaztcblxuICAgIGZvciAoaSA9IDEwOyBpIDwgaW5wdXQubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBuZXh0ID0gaW5wdXQud29yZHNbaV0gfCAwO1xuICAgICAgaW5wdXQud29yZHNbaSAtIDEwXSA9ICgobmV4dCAmIG1hc2spIDw8IDQpIHwgKHByZXYgPj4+IDIyKTtcbiAgICAgIHByZXYgPSBuZXh0O1xuICAgIH1cbiAgICBwcmV2ID4+Pj0gMjI7XG4gICAgaW5wdXQud29yZHNbaSAtIDEwXSA9IHByZXY7XG4gICAgaWYgKHByZXYgPT09IDAgJiYgaW5wdXQubGVuZ3RoID4gMTApIHtcbiAgICAgIGlucHV0Lmxlbmd0aCAtPSAxMDtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5wdXQubGVuZ3RoIC09IDk7XG4gICAgfVxuICB9O1xuXG4gIEsyNTYucHJvdG90eXBlLmltdWxLID0gZnVuY3Rpb24gaW11bEsgKG51bSkge1xuICAgIC8vIEsgPSAweDEwMDAwMDNkMSA9IFsgMHg0MCwgMHgzZDEgXVxuICAgIG51bS53b3Jkc1tudW0ubGVuZ3RoXSA9IDA7XG4gICAgbnVtLndvcmRzW251bS5sZW5ndGggKyAxXSA9IDA7XG4gICAgbnVtLmxlbmd0aCArPSAyO1xuXG4gICAgLy8gYm91bmRlZCBhdDogMHg0MCAqIDB4M2ZmZmZmZiArIDB4M2QwID0gMHgxMDAwMDAzOTBcbiAgICB2YXIgbG8gPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdyA9IG51bS53b3Jkc1tpXSB8IDA7XG4gICAgICBsbyArPSB3ICogMHgzZDE7XG4gICAgICBudW0ud29yZHNbaV0gPSBsbyAmIDB4M2ZmZmZmZjtcbiAgICAgIGxvID0gdyAqIDB4NDAgKyAoKGxvIC8gMHg0MDAwMDAwKSB8IDApO1xuICAgIH1cblxuICAgIC8vIEZhc3QgbGVuZ3RoIHJlZHVjdGlvblxuICAgIGlmIChudW0ud29yZHNbbnVtLmxlbmd0aCAtIDFdID09PSAwKSB7XG4gICAgICBudW0ubGVuZ3RoLS07XG4gICAgICBpZiAobnVtLndvcmRzW251bS5sZW5ndGggLSAxXSA9PT0gMCkge1xuICAgICAgICBudW0ubGVuZ3RoLS07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudW07XG4gIH07XG5cbiAgZnVuY3Rpb24gUDIyNCAoKSB7XG4gICAgTVByaW1lLmNhbGwoXG4gICAgICB0aGlzLFxuICAgICAgJ3AyMjQnLFxuICAgICAgJ2ZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIDAwMDAwMDAwIDAwMDAwMDAwIDAwMDAwMDAxJyk7XG4gIH1cbiAgaW5oZXJpdHMoUDIyNCwgTVByaW1lKTtcblxuICBmdW5jdGlvbiBQMTkyICgpIHtcbiAgICBNUHJpbWUuY2FsbChcbiAgICAgIHRoaXMsXG4gICAgICAncDE5MicsXG4gICAgICAnZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmUgZmZmZmZmZmYgZmZmZmZmZmYnKTtcbiAgfVxuICBpbmhlcml0cyhQMTkyLCBNUHJpbWUpO1xuXG4gIGZ1bmN0aW9uIFAyNTUxOSAoKSB7XG4gICAgLy8gMiBeIDI1NSAtIDE5XG4gICAgTVByaW1lLmNhbGwoXG4gICAgICB0aGlzLFxuICAgICAgJzI1NTE5JyxcbiAgICAgICc3ZmZmZmZmZmZmZmZmZmZmIGZmZmZmZmZmZmZmZmZmZmYgZmZmZmZmZmZmZmZmZmZmZiBmZmZmZmZmZmZmZmZmZmVkJyk7XG4gIH1cbiAgaW5oZXJpdHMoUDI1NTE5LCBNUHJpbWUpO1xuXG4gIFAyNTUxOS5wcm90b3R5cGUuaW11bEsgPSBmdW5jdGlvbiBpbXVsSyAobnVtKSB7XG4gICAgLy8gSyA9IDB4MTNcbiAgICB2YXIgY2FycnkgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaGkgPSAobnVtLndvcmRzW2ldIHwgMCkgKiAweDEzICsgY2Fycnk7XG4gICAgICB2YXIgbG8gPSBoaSAmIDB4M2ZmZmZmZjtcbiAgICAgIGhpID4+Pj0gMjY7XG5cbiAgICAgIG51bS53b3Jkc1tpXSA9IGxvO1xuICAgICAgY2FycnkgPSBoaTtcbiAgICB9XG4gICAgaWYgKGNhcnJ5ICE9PSAwKSB7XG4gICAgICBudW0ud29yZHNbbnVtLmxlbmd0aCsrXSA9IGNhcnJ5O1xuICAgIH1cbiAgICByZXR1cm4gbnVtO1xuICB9O1xuXG4gIC8vIEV4cG9ydGVkIG1vc3RseSBmb3IgdGVzdGluZyBwdXJwb3NlcywgdXNlIHBsYWluIG5hbWUgaW5zdGVhZFxuICBCTi5fcHJpbWUgPSBmdW5jdGlvbiBwcmltZSAobmFtZSkge1xuICAgIC8vIENhY2hlZCB2ZXJzaW9uIG9mIHByaW1lXG4gICAgaWYgKHByaW1lc1tuYW1lXSkgcmV0dXJuIHByaW1lc1tuYW1lXTtcblxuICAgIHZhciBwcmltZTtcbiAgICBpZiAobmFtZSA9PT0gJ2syNTYnKSB7XG4gICAgICBwcmltZSA9IG5ldyBLMjU2KCk7XG4gICAgfSBlbHNlIGlmIChuYW1lID09PSAncDIyNCcpIHtcbiAgICAgIHByaW1lID0gbmV3IFAyMjQoKTtcbiAgICB9IGVsc2UgaWYgKG5hbWUgPT09ICdwMTkyJykge1xuICAgICAgcHJpbWUgPSBuZXcgUDE5MigpO1xuICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gJ3AyNTUxOScpIHtcbiAgICAgIHByaW1lID0gbmV3IFAyNTUxOSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gcHJpbWUgJyArIG5hbWUpO1xuICAgIH1cbiAgICBwcmltZXNbbmFtZV0gPSBwcmltZTtcblxuICAgIHJldHVybiBwcmltZTtcbiAgfTtcblxuICAvL1xuICAvLyBCYXNlIHJlZHVjdGlvbiBlbmdpbmVcbiAgLy9cbiAgZnVuY3Rpb24gUmVkIChtKSB7XG4gICAgaWYgKHR5cGVvZiBtID09PSAnc3RyaW5nJykge1xuICAgICAgdmFyIHByaW1lID0gQk4uX3ByaW1lKG0pO1xuICAgICAgdGhpcy5tID0gcHJpbWUucDtcbiAgICAgIHRoaXMucHJpbWUgPSBwcmltZTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXNzZXJ0KG0uZ3RuKDEpLCAnbW9kdWx1cyBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAxJyk7XG4gICAgICB0aGlzLm0gPSBtO1xuICAgICAgdGhpcy5wcmltZSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgUmVkLnByb3RvdHlwZS5fdmVyaWZ5MSA9IGZ1bmN0aW9uIF92ZXJpZnkxIChhKSB7XG4gICAgYXNzZXJ0KGEubmVnYXRpdmUgPT09IDAsICdyZWQgd29ya3Mgb25seSB3aXRoIHBvc2l0aXZlcycpO1xuICAgIGFzc2VydChhLnJlZCwgJ3JlZCB3b3JrcyBvbmx5IHdpdGggcmVkIG51bWJlcnMnKTtcbiAgfTtcblxuICBSZWQucHJvdG90eXBlLl92ZXJpZnkyID0gZnVuY3Rpb24gX3ZlcmlmeTIgKGEsIGIpIHtcbiAgICBhc3NlcnQoKGEubmVnYXRpdmUgfCBiLm5lZ2F0aXZlKSA9PT0gMCwgJ3JlZCB3b3JrcyBvbmx5IHdpdGggcG9zaXRpdmVzJyk7XG4gICAgYXNzZXJ0KGEucmVkICYmIGEucmVkID09PSBiLnJlZCxcbiAgICAgICdyZWQgd29ya3Mgb25seSB3aXRoIHJlZCBudW1iZXJzJyk7XG4gIH07XG5cbiAgUmVkLnByb3RvdHlwZS5pbW9kID0gZnVuY3Rpb24gaW1vZCAoYSkge1xuICAgIGlmICh0aGlzLnByaW1lKSByZXR1cm4gdGhpcy5wcmltZS5pcmVkdWNlKGEpLl9mb3JjZVJlZCh0aGlzKTtcbiAgICByZXR1cm4gYS51bW9kKHRoaXMubSkuX2ZvcmNlUmVkKHRoaXMpO1xuICB9O1xuXG4gIFJlZC5wcm90b3R5cGUubmVnID0gZnVuY3Rpb24gbmVnIChhKSB7XG4gICAgaWYgKGEuaXNaZXJvKCkpIHtcbiAgICAgIHJldHVybiBhLmNsb25lKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMubS5zdWIoYSkuX2ZvcmNlUmVkKHRoaXMpO1xuICB9O1xuXG4gIFJlZC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gYWRkIChhLCBiKSB7XG4gICAgdGhpcy5fdmVyaWZ5MihhLCBiKTtcblxuICAgIHZhciByZXMgPSBhLmFkZChiKTtcbiAgICBpZiAocmVzLmNtcCh0aGlzLm0pID49IDApIHtcbiAgICAgIHJlcy5pc3ViKHRoaXMubSk7XG4gICAgfVxuICAgIHJldHVybiByZXMuX2ZvcmNlUmVkKHRoaXMpO1xuICB9O1xuXG4gIFJlZC5wcm90b3R5cGUuaWFkZCA9IGZ1bmN0aW9uIGlhZGQgKGEsIGIpIHtcbiAgICB0aGlzLl92ZXJpZnkyKGEsIGIpO1xuXG4gICAgdmFyIHJlcyA9IGEuaWFkZChiKTtcbiAgICBpZiAocmVzLmNtcCh0aGlzLm0pID49IDApIHtcbiAgICAgIHJlcy5pc3ViKHRoaXMubSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH07XG5cbiAgUmVkLnByb3RvdHlwZS5zdWIgPSBmdW5jdGlvbiBzdWIgKGEsIGIpIHtcbiAgICB0aGlzLl92ZXJpZnkyKGEsIGIpO1xuXG4gICAgdmFyIHJlcyA9IGEuc3ViKGIpO1xuICAgIGlmIChyZXMuY21wbigwKSA8IDApIHtcbiAgICAgIHJlcy5pYWRkKHRoaXMubSk7XG4gICAgfVxuICAgIHJldHVybiByZXMuX2ZvcmNlUmVkKHRoaXMpO1xuICB9O1xuXG4gIFJlZC5wcm90b3R5cGUuaXN1YiA9IGZ1bmN0aW9uIGlzdWIgKGEsIGIpIHtcbiAgICB0aGlzLl92ZXJpZnkyKGEsIGIpO1xuXG4gICAgdmFyIHJlcyA9IGEuaXN1YihiKTtcbiAgICBpZiAocmVzLmNtcG4oMCkgPCAwKSB7XG4gICAgICByZXMuaWFkZCh0aGlzLm0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9O1xuXG4gIFJlZC5wcm90b3R5cGUuc2hsID0gZnVuY3Rpb24gc2hsIChhLCBudW0pIHtcbiAgICB0aGlzLl92ZXJpZnkxKGEpO1xuICAgIHJldHVybiB0aGlzLmltb2QoYS51c2hsbihudW0pKTtcbiAgfTtcblxuICBSZWQucHJvdG90eXBlLmltdWwgPSBmdW5jdGlvbiBpbXVsIChhLCBiKSB7XG4gICAgdGhpcy5fdmVyaWZ5MihhLCBiKTtcbiAgICByZXR1cm4gdGhpcy5pbW9kKGEuaW11bChiKSk7XG4gIH07XG5cbiAgUmVkLnByb3RvdHlwZS5tdWwgPSBmdW5jdGlvbiBtdWwgKGEsIGIpIHtcbiAgICB0aGlzLl92ZXJpZnkyKGEsIGIpO1xuICAgIHJldHVybiB0aGlzLmltb2QoYS5tdWwoYikpO1xuICB9O1xuXG4gIFJlZC5wcm90b3R5cGUuaXNxciA9IGZ1bmN0aW9uIGlzcXIgKGEpIHtcbiAgICByZXR1cm4gdGhpcy5pbXVsKGEsIGEuY2xvbmUoKSk7XG4gIH07XG5cbiAgUmVkLnByb3RvdHlwZS5zcXIgPSBmdW5jdGlvbiBzcXIgKGEpIHtcbiAgICByZXR1cm4gdGhpcy5tdWwoYSwgYSk7XG4gIH07XG5cbiAgUmVkLnByb3RvdHlwZS5zcXJ0ID0gZnVuY3Rpb24gc3FydCAoYSkge1xuICAgIGlmIChhLmlzWmVybygpKSByZXR1cm4gYS5jbG9uZSgpO1xuXG4gICAgdmFyIG1vZDMgPSB0aGlzLm0uYW5kbG4oMyk7XG4gICAgYXNzZXJ0KG1vZDMgJSAyID09PSAxKTtcblxuICAgIC8vIEZhc3QgY2FzZVxuICAgIGlmIChtb2QzID09PSAzKSB7XG4gICAgICB2YXIgcG93ID0gdGhpcy5tLmFkZChuZXcgQk4oMSkpLml1c2hybigyKTtcbiAgICAgIHJldHVybiB0aGlzLnBvdyhhLCBwb3cpO1xuICAgIH1cblxuICAgIC8vIFRvbmVsbGktU2hhbmtzIGFsZ29yaXRobSAoVG90YWxseSB1bm9wdGltaXplZCBhbmQgc2xvdylcbiAgICAvL1xuICAgIC8vIEZpbmQgUSBhbmQgUywgdGhhdCBRICogMiBeIFMgPSAoUCAtIDEpXG4gICAgdmFyIHEgPSB0aGlzLm0uc3VibigxKTtcbiAgICB2YXIgcyA9IDA7XG4gICAgd2hpbGUgKCFxLmlzWmVybygpICYmIHEuYW5kbG4oMSkgPT09IDApIHtcbiAgICAgIHMrKztcbiAgICAgIHEuaXVzaHJuKDEpO1xuICAgIH1cbiAgICBhc3NlcnQoIXEuaXNaZXJvKCkpO1xuXG4gICAgdmFyIG9uZSA9IG5ldyBCTigxKS50b1JlZCh0aGlzKTtcbiAgICB2YXIgbk9uZSA9IG9uZS5yZWROZWcoKTtcblxuICAgIC8vIEZpbmQgcXVhZHJhdGljIG5vbi1yZXNpZHVlXG4gICAgLy8gTk9URTogTWF4IGlzIHN1Y2ggYmVjYXVzZSBvZiBnZW5lcmFsaXplZCBSaWVtYW5uIGh5cG90aGVzaXMuXG4gICAgdmFyIGxwb3cgPSB0aGlzLm0uc3VibigxKS5pdXNocm4oMSk7XG4gICAgdmFyIHogPSB0aGlzLm0uYml0TGVuZ3RoKCk7XG4gICAgeiA9IG5ldyBCTigyICogeiAqIHopLnRvUmVkKHRoaXMpO1xuXG4gICAgd2hpbGUgKHRoaXMucG93KHosIGxwb3cpLmNtcChuT25lKSAhPT0gMCkge1xuICAgICAgei5yZWRJQWRkKG5PbmUpO1xuICAgIH1cblxuICAgIHZhciBjID0gdGhpcy5wb3coeiwgcSk7XG4gICAgdmFyIHIgPSB0aGlzLnBvdyhhLCBxLmFkZG4oMSkuaXVzaHJuKDEpKTtcbiAgICB2YXIgdCA9IHRoaXMucG93KGEsIHEpO1xuICAgIHZhciBtID0gcztcbiAgICB3aGlsZSAodC5jbXAob25lKSAhPT0gMCkge1xuICAgICAgdmFyIHRtcCA9IHQ7XG4gICAgICBmb3IgKHZhciBpID0gMDsgdG1wLmNtcChvbmUpICE9PSAwOyBpKyspIHtcbiAgICAgICAgdG1wID0gdG1wLnJlZFNxcigpO1xuICAgICAgfVxuICAgICAgYXNzZXJ0KGkgPCBtKTtcbiAgICAgIHZhciBiID0gdGhpcy5wb3coYywgbmV3IEJOKDEpLml1c2hsbihtIC0gaSAtIDEpKTtcblxuICAgICAgciA9IHIucmVkTXVsKGIpO1xuICAgICAgYyA9IGIucmVkU3FyKCk7XG4gICAgICB0ID0gdC5yZWRNdWwoYyk7XG4gICAgICBtID0gaTtcbiAgICB9XG5cbiAgICByZXR1cm4gcjtcbiAgfTtcblxuICBSZWQucHJvdG90eXBlLmludm0gPSBmdW5jdGlvbiBpbnZtIChhKSB7XG4gICAgdmFyIGludiA9IGEuX2ludm1wKHRoaXMubSk7XG4gICAgaWYgKGludi5uZWdhdGl2ZSAhPT0gMCkge1xuICAgICAgaW52Lm5lZ2F0aXZlID0gMDtcbiAgICAgIHJldHVybiB0aGlzLmltb2QoaW52KS5yZWROZWcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaW1vZChpbnYpO1xuICAgIH1cbiAgfTtcblxuICBSZWQucHJvdG90eXBlLnBvdyA9IGZ1bmN0aW9uIHBvdyAoYSwgbnVtKSB7XG4gICAgaWYgKG51bS5pc1plcm8oKSkgcmV0dXJuIG5ldyBCTigxKS50b1JlZCh0aGlzKTtcbiAgICBpZiAobnVtLmNtcG4oMSkgPT09IDApIHJldHVybiBhLmNsb25lKCk7XG5cbiAgICB2YXIgd2luZG93U2l6ZSA9IDQ7XG4gICAgdmFyIHduZCA9IG5ldyBBcnJheSgxIDw8IHdpbmRvd1NpemUpO1xuICAgIHduZFswXSA9IG5ldyBCTigxKS50b1JlZCh0aGlzKTtcbiAgICB3bmRbMV0gPSBhO1xuICAgIGZvciAodmFyIGkgPSAyOyBpIDwgd25kLmxlbmd0aDsgaSsrKSB7XG4gICAgICB3bmRbaV0gPSB0aGlzLm11bCh3bmRbaSAtIDFdLCBhKTtcbiAgICB9XG5cbiAgICB2YXIgcmVzID0gd25kWzBdO1xuICAgIHZhciBjdXJyZW50ID0gMDtcbiAgICB2YXIgY3VycmVudExlbiA9IDA7XG4gICAgdmFyIHN0YXJ0ID0gbnVtLmJpdExlbmd0aCgpICUgMjY7XG4gICAgaWYgKHN0YXJ0ID09PSAwKSB7XG4gICAgICBzdGFydCA9IDI2O1xuICAgIH1cblxuICAgIGZvciAoaSA9IG51bS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIHdvcmQgPSBudW0ud29yZHNbaV07XG4gICAgICBmb3IgKHZhciBqID0gc3RhcnQgLSAxOyBqID49IDA7IGotLSkge1xuICAgICAgICB2YXIgYml0ID0gKHdvcmQgPj4gaikgJiAxO1xuICAgICAgICBpZiAocmVzICE9PSB3bmRbMF0pIHtcbiAgICAgICAgICByZXMgPSB0aGlzLnNxcihyZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJpdCA9PT0gMCAmJiBjdXJyZW50ID09PSAwKSB7XG4gICAgICAgICAgY3VycmVudExlbiA9IDA7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50IDw8PSAxO1xuICAgICAgICBjdXJyZW50IHw9IGJpdDtcbiAgICAgICAgY3VycmVudExlbisrO1xuICAgICAgICBpZiAoY3VycmVudExlbiAhPT0gd2luZG93U2l6ZSAmJiAoaSAhPT0gMCB8fCBqICE9PSAwKSkgY29udGludWU7XG5cbiAgICAgICAgcmVzID0gdGhpcy5tdWwocmVzLCB3bmRbY3VycmVudF0pO1xuICAgICAgICBjdXJyZW50TGVuID0gMDtcbiAgICAgICAgY3VycmVudCA9IDA7XG4gICAgICB9XG4gICAgICBzdGFydCA9IDI2O1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH07XG5cbiAgUmVkLnByb3RvdHlwZS5jb252ZXJ0VG8gPSBmdW5jdGlvbiBjb252ZXJ0VG8gKG51bSkge1xuICAgIHZhciByID0gbnVtLnVtb2QodGhpcy5tKTtcblxuICAgIHJldHVybiByID09PSBudW0gPyByLmNsb25lKCkgOiByO1xuICB9O1xuXG4gIFJlZC5wcm90b3R5cGUuY29udmVydEZyb20gPSBmdW5jdGlvbiBjb252ZXJ0RnJvbSAobnVtKSB7XG4gICAgdmFyIHJlcyA9IG51bS5jbG9uZSgpO1xuICAgIHJlcy5yZWQgPSBudWxsO1xuICAgIHJldHVybiByZXM7XG4gIH07XG5cbiAgLy9cbiAgLy8gTW9udGdvbWVyeSBtZXRob2QgZW5naW5lXG4gIC8vXG5cbiAgQk4ubW9udCA9IGZ1bmN0aW9uIG1vbnQgKG51bSkge1xuICAgIHJldHVybiBuZXcgTW9udChudW0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIE1vbnQgKG0pIHtcbiAgICBSZWQuY2FsbCh0aGlzLCBtKTtcblxuICAgIHRoaXMuc2hpZnQgPSB0aGlzLm0uYml0TGVuZ3RoKCk7XG4gICAgaWYgKHRoaXMuc2hpZnQgJSAyNiAhPT0gMCkge1xuICAgICAgdGhpcy5zaGlmdCArPSAyNiAtICh0aGlzLnNoaWZ0ICUgMjYpO1xuICAgIH1cblxuICAgIHRoaXMuciA9IG5ldyBCTigxKS5pdXNobG4odGhpcy5zaGlmdCk7XG4gICAgdGhpcy5yMiA9IHRoaXMuaW1vZCh0aGlzLnIuc3FyKCkpO1xuICAgIHRoaXMucmludiA9IHRoaXMuci5faW52bXAodGhpcy5tKTtcblxuICAgIHRoaXMubWludiA9IHRoaXMucmludi5tdWwodGhpcy5yKS5pc3VibigxKS5kaXYodGhpcy5tKTtcbiAgICB0aGlzLm1pbnYgPSB0aGlzLm1pbnYudW1vZCh0aGlzLnIpO1xuICAgIHRoaXMubWludiA9IHRoaXMuci5zdWIodGhpcy5taW52KTtcbiAgfVxuICBpbmhlcml0cyhNb250LCBSZWQpO1xuXG4gIE1vbnQucHJvdG90eXBlLmNvbnZlcnRUbyA9IGZ1bmN0aW9uIGNvbnZlcnRUbyAobnVtKSB7XG4gICAgcmV0dXJuIHRoaXMuaW1vZChudW0udXNobG4odGhpcy5zaGlmdCkpO1xuICB9O1xuXG4gIE1vbnQucHJvdG90eXBlLmNvbnZlcnRGcm9tID0gZnVuY3Rpb24gY29udmVydEZyb20gKG51bSkge1xuICAgIHZhciByID0gdGhpcy5pbW9kKG51bS5tdWwodGhpcy5yaW52KSk7XG4gICAgci5yZWQgPSBudWxsO1xuICAgIHJldHVybiByO1xuICB9O1xuXG4gIE1vbnQucHJvdG90eXBlLmltdWwgPSBmdW5jdGlvbiBpbXVsIChhLCBiKSB7XG4gICAgaWYgKGEuaXNaZXJvKCkgfHwgYi5pc1plcm8oKSkge1xuICAgICAgYS53b3Jkc1swXSA9IDA7XG4gICAgICBhLmxlbmd0aCA9IDE7XG4gICAgICByZXR1cm4gYTtcbiAgICB9XG5cbiAgICB2YXIgdCA9IGEuaW11bChiKTtcbiAgICB2YXIgYyA9IHQubWFza24odGhpcy5zaGlmdCkubXVsKHRoaXMubWludikuaW1hc2tuKHRoaXMuc2hpZnQpLm11bCh0aGlzLm0pO1xuICAgIHZhciB1ID0gdC5pc3ViKGMpLml1c2hybih0aGlzLnNoaWZ0KTtcbiAgICB2YXIgcmVzID0gdTtcblxuICAgIGlmICh1LmNtcCh0aGlzLm0pID49IDApIHtcbiAgICAgIHJlcyA9IHUuaXN1Yih0aGlzLm0pO1xuICAgIH0gZWxzZSBpZiAodS5jbXBuKDApIDwgMCkge1xuICAgICAgcmVzID0gdS5pYWRkKHRoaXMubSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcy5fZm9yY2VSZWQodGhpcyk7XG4gIH07XG5cbiAgTW9udC5wcm90b3R5cGUubXVsID0gZnVuY3Rpb24gbXVsIChhLCBiKSB7XG4gICAgaWYgKGEuaXNaZXJvKCkgfHwgYi5pc1plcm8oKSkgcmV0dXJuIG5ldyBCTigwKS5fZm9yY2VSZWQodGhpcyk7XG5cbiAgICB2YXIgdCA9IGEubXVsKGIpO1xuICAgIHZhciBjID0gdC5tYXNrbih0aGlzLnNoaWZ0KS5tdWwodGhpcy5taW52KS5pbWFza24odGhpcy5zaGlmdCkubXVsKHRoaXMubSk7XG4gICAgdmFyIHUgPSB0LmlzdWIoYykuaXVzaHJuKHRoaXMuc2hpZnQpO1xuICAgIHZhciByZXMgPSB1O1xuICAgIGlmICh1LmNtcCh0aGlzLm0pID49IDApIHtcbiAgICAgIHJlcyA9IHUuaXN1Yih0aGlzLm0pO1xuICAgIH0gZWxzZSBpZiAodS5jbXBuKDApIDwgMCkge1xuICAgICAgcmVzID0gdS5pYWRkKHRoaXMubSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcy5fZm9yY2VSZWQodGhpcyk7XG4gIH07XG5cbiAgTW9udC5wcm90b3R5cGUuaW52bSA9IGZ1bmN0aW9uIGludm0gKGEpIHtcbiAgICAvLyAoQVIpXi0xICogUl4yID0gKEFeLTEgKiBSXi0xKSAqIFJeMiA9IEFeLTEgKiBSXG4gICAgdmFyIHJlcyA9IHRoaXMuaW1vZChhLl9pbnZtcCh0aGlzLm0pLm11bCh0aGlzLnIyKSk7XG4gICAgcmV0dXJuIHJlcy5fZm9yY2VSZWQodGhpcyk7XG4gIH07XG59KSh0eXBlb2YgbW9kdWxlID09PSAndW5kZWZpbmVkJyB8fCBtb2R1bGUsIHRoaXMpO1xuIiwidmFyIHI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcmFuZChsZW4pIHtcbiAgaWYgKCFyKVxuICAgIHIgPSBuZXcgUmFuZChudWxsKTtcblxuICByZXR1cm4gci5nZW5lcmF0ZShsZW4pO1xufTtcblxuZnVuY3Rpb24gUmFuZChyYW5kKSB7XG4gIHRoaXMucmFuZCA9IHJhbmQ7XG59XG5tb2R1bGUuZXhwb3J0cy5SYW5kID0gUmFuZDtcblxuUmFuZC5wcm90b3R5cGUuZ2VuZXJhdGUgPSBmdW5jdGlvbiBnZW5lcmF0ZShsZW4pIHtcbiAgcmV0dXJuIHRoaXMuX3JhbmQobGVuKTtcbn07XG5cbi8vIEVtdWxhdGUgY3J5cHRvIEFQSSB1c2luZyByYW5keVxuUmFuZC5wcm90b3R5cGUuX3JhbmQgPSBmdW5jdGlvbiBfcmFuZChuKSB7XG4gIGlmICh0aGlzLnJhbmQuZ2V0Qnl0ZXMpXG4gICAgcmV0dXJuIHRoaXMucmFuZC5nZXRCeXRlcyhuKTtcblxuICB2YXIgcmVzID0gbmV3IFVpbnQ4QXJyYXkobik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzLmxlbmd0aDsgaSsrKVxuICAgIHJlc1tpXSA9IHRoaXMucmFuZC5nZXRCeXRlKCk7XG4gIHJldHVybiByZXM7XG59O1xuXG5pZiAodHlwZW9mIHNlbGYgPT09ICdvYmplY3QnKSB7XG4gIGlmIChzZWxmLmNyeXB0byAmJiBzZWxmLmNyeXB0by5nZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBNb2Rlcm4gYnJvd3NlcnNcbiAgICBSYW5kLnByb3RvdHlwZS5fcmFuZCA9IGZ1bmN0aW9uIF9yYW5kKG4pIHtcbiAgICAgIHZhciBhcnIgPSBuZXcgVWludDhBcnJheShuKTtcbiAgICAgIHNlbGYuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhhcnIpO1xuICAgICAgcmV0dXJuIGFycjtcbiAgICB9O1xuICB9IGVsc2UgaWYgKHNlbGYubXNDcnlwdG8gJiYgc2VsZi5tc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBJRVxuICAgIFJhbmQucHJvdG90eXBlLl9yYW5kID0gZnVuY3Rpb24gX3JhbmQobikge1xuICAgICAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KG4pO1xuICAgICAgc2VsZi5tc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMoYXJyKTtcbiAgICAgIHJldHVybiBhcnI7XG4gICAgfTtcblxuICAvLyBTYWZhcmkncyBXZWJXb3JrZXJzIGRvIG5vdCBoYXZlIGBjcnlwdG9gXG4gIH0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHtcbiAgICAvLyBPbGQganVua1xuICAgIFJhbmQucHJvdG90eXBlLl9yYW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCB5ZXQnKTtcbiAgICB9O1xuICB9XG59IGVsc2Uge1xuICAvLyBOb2RlLmpzIG9yIFdlYiB3b3JrZXIgd2l0aCBubyBjcnlwdG8gc3VwcG9ydFxuICB0cnkge1xuICAgIHZhciBjcnlwdG8gPSByZXF1aXJlKCdjcnlwdG8nKTtcbiAgICBpZiAodHlwZW9mIGNyeXB0by5yYW5kb21CeXRlcyAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm90IHN1cHBvcnRlZCcpO1xuXG4gICAgUmFuZC5wcm90b3R5cGUuX3JhbmQgPSBmdW5jdGlvbiBfcmFuZChuKSB7XG4gICAgICByZXR1cm4gY3J5cHRvLnJhbmRvbUJ5dGVzKG4pO1xuICAgIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgfVxufVxuIiwiLyohXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG5cbid1c2Ugc3RyaWN0J1xuXG52YXIgYmFzZTY0ID0gcmVxdWlyZSgnYmFzZTY0LWpzJylcbnZhciBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpXG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKVxuXG5leHBvcnRzLkJ1ZmZlciA9IEJ1ZmZlclxuZXhwb3J0cy5TbG93QnVmZmVyID0gU2xvd0J1ZmZlclxuZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUyA9IDUwXG5cbi8qKlxuICogSWYgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFVzZSBPYmplY3QgaW1wbGVtZW50YXRpb24gKG1vc3QgY29tcGF0aWJsZSwgZXZlbiBJRTYpXG4gKlxuICogQnJvd3NlcnMgdGhhdCBzdXBwb3J0IHR5cGVkIGFycmF5cyBhcmUgSUUgMTArLCBGaXJlZm94IDQrLCBDaHJvbWUgNyssIFNhZmFyaSA1LjErLFxuICogT3BlcmEgMTEuNissIGlPUyA0LjIrLlxuICpcbiAqIER1ZSB0byB2YXJpb3VzIGJyb3dzZXIgYnVncywgc29tZXRpbWVzIHRoZSBPYmplY3QgaW1wbGVtZW50YXRpb24gd2lsbCBiZSB1c2VkIGV2ZW5cbiAqIHdoZW4gdGhlIGJyb3dzZXIgc3VwcG9ydHMgdHlwZWQgYXJyYXlzLlxuICpcbiAqIE5vdGU6XG4gKlxuICogICAtIEZpcmVmb3ggNC0yOSBsYWNrcyBzdXBwb3J0IGZvciBhZGRpbmcgbmV3IHByb3BlcnRpZXMgdG8gYFVpbnQ4QXJyYXlgIGluc3RhbmNlcyxcbiAqICAgICBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY5NTQzOC5cbiAqXG4gKiAgIC0gQ2hyb21lIDktMTAgaXMgbWlzc2luZyB0aGUgYFR5cGVkQXJyYXkucHJvdG90eXBlLnN1YmFycmF5YCBmdW5jdGlvbi5cbiAqXG4gKiAgIC0gSUUxMCBoYXMgYSBicm9rZW4gYFR5cGVkQXJyYXkucHJvdG90eXBlLnN1YmFycmF5YCBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGFycmF5cyBvZlxuICogICAgIGluY29ycmVjdCBsZW5ndGggaW4gc29tZSBzaXR1YXRpb25zLlxuXG4gKiBXZSBkZXRlY3QgdGhlc2UgYnVnZ3kgYnJvd3NlcnMgYW5kIHNldCBgQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRgIHRvIGBmYWxzZWAgc28gdGhleVxuICogZ2V0IHRoZSBPYmplY3QgaW1wbGVtZW50YXRpb24sIHdoaWNoIGlzIHNsb3dlciBidXQgYmVoYXZlcyBjb3JyZWN0bHkuXG4gKi9cbkJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUID0gZ2xvYmFsLlRZUEVEX0FSUkFZX1NVUFBPUlQgIT09IHVuZGVmaW5lZFxuICA/IGdsb2JhbC5UWVBFRF9BUlJBWV9TVVBQT1JUXG4gIDogdHlwZWRBcnJheVN1cHBvcnQoKVxuXG4vKlxuICogRXhwb3J0IGtNYXhMZW5ndGggYWZ0ZXIgdHlwZWQgYXJyYXkgc3VwcG9ydCBpcyBkZXRlcm1pbmVkLlxuICovXG5leHBvcnRzLmtNYXhMZW5ndGggPSBrTWF4TGVuZ3RoKClcblxuZnVuY3Rpb24gdHlwZWRBcnJheVN1cHBvcnQgKCkge1xuICB0cnkge1xuICAgIHZhciBhcnIgPSBuZXcgVWludDhBcnJheSgxKVxuICAgIGFyci5fX3Byb3RvX18gPSB7X19wcm90b19fOiBVaW50OEFycmF5LnByb3RvdHlwZSwgZm9vOiBmdW5jdGlvbiAoKSB7IHJldHVybiA0MiB9fVxuICAgIHJldHVybiBhcnIuZm9vKCkgPT09IDQyICYmIC8vIHR5cGVkIGFycmF5IGluc3RhbmNlcyBjYW4gYmUgYXVnbWVudGVkXG4gICAgICAgIHR5cGVvZiBhcnIuc3ViYXJyYXkgPT09ICdmdW5jdGlvbicgJiYgLy8gY2hyb21lIDktMTAgbGFjayBgc3ViYXJyYXlgXG4gICAgICAgIGFyci5zdWJhcnJheSgxLCAxKS5ieXRlTGVuZ3RoID09PSAwIC8vIGllMTAgaGFzIGJyb2tlbiBgc3ViYXJyYXlgXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiBrTWF4TGVuZ3RoICgpIHtcbiAgcmV0dXJuIEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUXG4gICAgPyAweDdmZmZmZmZmXG4gICAgOiAweDNmZmZmZmZmXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJ1ZmZlciAodGhhdCwgbGVuZ3RoKSB7XG4gIGlmIChrTWF4TGVuZ3RoKCkgPCBsZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCB0eXBlZCBhcnJheSBsZW5ndGgnKVxuICB9XG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlLCBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIHRoYXQgPSBuZXcgVWludDhBcnJheShsZW5ndGgpXG4gICAgdGhhdC5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBhbiBvYmplY3QgaW5zdGFuY2Ugb2YgdGhlIEJ1ZmZlciBjbGFzc1xuICAgIGlmICh0aGF0ID09PSBudWxsKSB7XG4gICAgICB0aGF0ID0gbmV3IEJ1ZmZlcihsZW5ndGgpXG4gICAgfVxuICAgIHRoYXQubGVuZ3RoID0gbGVuZ3RoXG4gIH1cblxuICByZXR1cm4gdGhhdFxufVxuXG4vKipcbiAqIFRoZSBCdWZmZXIgY29uc3RydWN0b3IgcmV0dXJucyBpbnN0YW5jZXMgb2YgYFVpbnQ4QXJyYXlgIHRoYXQgaGF2ZSB0aGVpclxuICogcHJvdG90eXBlIGNoYW5nZWQgdG8gYEJ1ZmZlci5wcm90b3R5cGVgLiBGdXJ0aGVybW9yZSwgYEJ1ZmZlcmAgaXMgYSBzdWJjbGFzcyBvZlxuICogYFVpbnQ4QXJyYXlgLCBzbyB0aGUgcmV0dXJuZWQgaW5zdGFuY2VzIHdpbGwgaGF2ZSBhbGwgdGhlIG5vZGUgYEJ1ZmZlcmAgbWV0aG9kc1xuICogYW5kIHRoZSBgVWludDhBcnJheWAgbWV0aG9kcy4gU3F1YXJlIGJyYWNrZXQgbm90YXRpb24gd29ya3MgYXMgZXhwZWN0ZWQgLS0gaXRcbiAqIHJldHVybnMgYSBzaW5nbGUgb2N0ZXQuXG4gKlxuICogVGhlIGBVaW50OEFycmF5YCBwcm90b3R5cGUgcmVtYWlucyB1bm1vZGlmaWVkLlxuICovXG5cbmZ1bmN0aW9uIEJ1ZmZlciAoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJiAhKHRoaXMgaW5zdGFuY2VvZiBCdWZmZXIpKSB7XG4gICAgcmV0dXJuIG5ldyBCdWZmZXIoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICAvLyBDb21tb24gY2FzZS5cbiAgaWYgKHR5cGVvZiBhcmcgPT09ICdudW1iZXInKSB7XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZ09yT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnSWYgZW5jb2RpbmcgaXMgc3BlY2lmaWVkIHRoZW4gdGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcnXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBhbGxvY1Vuc2FmZSh0aGlzLCBhcmcpXG4gIH1cbiAgcmV0dXJuIGZyb20odGhpcywgYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTIgLy8gbm90IHVzZWQgYnkgdGhpcyBpbXBsZW1lbnRhdGlvblxuXG4vLyBUT0RPOiBMZWdhY3ksIG5vdCBuZWVkZWQgYW55bW9yZS4gUmVtb3ZlIGluIG5leHQgbWFqb3IgdmVyc2lvbi5cbkJ1ZmZlci5fYXVnbWVudCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgYXJyLl9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiBmcm9tICh0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIGEgbnVtYmVyJylcbiAgfVxuXG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5QnVmZmVyKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmcm9tU3RyaW5nKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0KVxuICB9XG5cbiAgcmV0dXJuIGZyb21PYmplY3QodGhhdCwgdmFsdWUpXG59XG5cbi8qKlxuICogRnVuY3Rpb25hbGx5IGVxdWl2YWxlbnQgdG8gQnVmZmVyKGFyZywgZW5jb2RpbmcpIGJ1dCB0aHJvd3MgYSBUeXBlRXJyb3JcbiAqIGlmIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQnVmZmVyLmZyb20oc3RyWywgZW5jb2RpbmddKVxuICogQnVmZmVyLmZyb20oYXJyYXkpXG4gKiBCdWZmZXIuZnJvbShidWZmZXIpXG4gKiBCdWZmZXIuZnJvbShhcnJheUJ1ZmZlclssIGJ5dGVPZmZzZXRbLCBsZW5ndGhdXSlcbiAqKi9cbkJ1ZmZlci5mcm9tID0gZnVuY3Rpb24gKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGZyb20obnVsbCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gIEJ1ZmZlci5wcm90b3R5cGUuX19wcm90b19fID0gVWludDhBcnJheS5wcm90b3R5cGVcbiAgQnVmZmVyLl9fcHJvdG9fXyA9IFVpbnQ4QXJyYXlcbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC5zcGVjaWVzICYmXG4gICAgICBCdWZmZXJbU3ltYm9sLnNwZWNpZXNdID09PSBCdWZmZXIpIHtcbiAgICAvLyBGaXggc3ViYXJyYXkoKSBpbiBFUzIwMTYuIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvcHVsbC85N1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdWZmZXIsIFN5bWJvbC5zcGVjaWVzLCB7XG4gICAgICB2YWx1ZTogbnVsbCxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pXG4gIH1cbn1cblxuZnVuY3Rpb24gYXNzZXJ0U2l6ZSAoc2l6ZSkge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBiZSBhIG51bWJlcicpXG4gIH0gZWxzZSBpZiAoc2l6ZSA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgbmVnYXRpdmUnKVxuICB9XG59XG5cbmZ1bmN0aW9uIGFsbG9jICh0aGF0LCBzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIGlmIChzaXplIDw9IDApIHtcbiAgICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpXG4gIH1cbiAgaWYgKGZpbGwgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9ubHkgcGF5IGF0dGVudGlvbiB0byBlbmNvZGluZyBpZiBpdCdzIGEgc3RyaW5nLiBUaGlzXG4gICAgLy8gcHJldmVudHMgYWNjaWRlbnRhbGx5IHNlbmRpbmcgaW4gYSBudW1iZXIgdGhhdCB3b3VsZFxuICAgIC8vIGJlIGludGVycHJldHRlZCBhcyBhIHN0YXJ0IG9mZnNldC5cbiAgICByZXR1cm4gdHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJ1xuICAgICAgPyBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSkuZmlsbChmaWxsLCBlbmNvZGluZylcbiAgICAgIDogY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpLmZpbGwoZmlsbClcbiAgfVxuICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBmaWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogYWxsb2Moc2l6ZVssIGZpbGxbLCBlbmNvZGluZ11dKVxuICoqL1xuQnVmZmVyLmFsbG9jID0gZnVuY3Rpb24gKHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIHJldHVybiBhbGxvYyhudWxsLCBzaXplLCBmaWxsLCBlbmNvZGluZylcbn1cblxuZnVuY3Rpb24gYWxsb2NVbnNhZmUgKHRoYXQsIHNpemUpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUgPCAwID8gMCA6IGNoZWNrZWQoc2l6ZSkgfCAwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyArK2kpIHtcbiAgICAgIHRoYXRbaV0gPSAwXG4gICAgfVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbi8qKlxuICogRXF1aXZhbGVudCB0byBCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqICovXG5CdWZmZXIuYWxsb2NVbnNhZmUgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICByZXR1cm4gYWxsb2NVbnNhZmUobnVsbCwgc2l6ZSlcbn1cbi8qKlxuICogRXF1aXZhbGVudCB0byBTbG93QnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZVNsb3cgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICByZXR1cm4gYWxsb2NVbnNhZmUobnVsbCwgc2l6ZSlcbn1cblxuZnVuY3Rpb24gZnJvbVN0cmluZyAodGhhdCwgc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAodHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJyB8fCBlbmNvZGluZyA9PT0gJycpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICB9XG5cbiAgaWYgKCFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImVuY29kaW5nXCIgbXVzdCBiZSBhIHZhbGlkIHN0cmluZyBlbmNvZGluZycpXG4gIH1cblxuICB2YXIgbGVuZ3RoID0gYnl0ZUxlbmd0aChzdHJpbmcsIGVuY29kaW5nKSB8IDBcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW5ndGgpXG5cbiAgdmFyIGFjdHVhbCA9IHRoYXQud3JpdGUoc3RyaW5nLCBlbmNvZGluZylcblxuICBpZiAoYWN0dWFsICE9PSBsZW5ndGgpIHtcbiAgICAvLyBXcml0aW5nIGEgaGV4IHN0cmluZywgZm9yIGV4YW1wbGUsIHRoYXQgY29udGFpbnMgaW52YWxpZCBjaGFyYWN0ZXJzIHdpbGxcbiAgICAvLyBjYXVzZSBldmVyeXRoaW5nIGFmdGVyIHRoZSBmaXJzdCBpbnZhbGlkIGNoYXJhY3RlciB0byBiZSBpZ25vcmVkLiAoZS5nLlxuICAgIC8vICdhYnh4Y2QnIHdpbGwgYmUgdHJlYXRlZCBhcyAnYWInKVxuICAgIHRoYXQgPSB0aGF0LnNsaWNlKDAsIGFjdHVhbClcbiAgfVxuXG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUxpa2UgKHRoYXQsIGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGggPCAwID8gMCA6IGNoZWNrZWQoYXJyYXkubGVuZ3RoKSB8IDBcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW5ndGgpXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICB0aGF0W2ldID0gYXJyYXlbaV0gJiAyNTVcbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlCdWZmZXIgKHRoYXQsIGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpIHtcbiAgYXJyYXkuYnl0ZUxlbmd0aCAvLyB0aGlzIHRocm93cyBpZiBgYXJyYXlgIGlzIG5vdCBhIHZhbGlkIEFycmF5QnVmZmVyXG5cbiAgaWYgKGJ5dGVPZmZzZXQgPCAwIHx8IGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0KSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ29mZnNldFxcJyBpcyBvdXQgb2YgYm91bmRzJylcbiAgfVxuXG4gIGlmIChhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCArIChsZW5ndGggfHwgMCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnbGVuZ3RoXFwnIGlzIG91dCBvZiBib3VuZHMnKVxuICB9XG5cbiAgaWYgKGJ5dGVPZmZzZXQgPT09IHVuZGVmaW5lZCAmJiBsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXkpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0KVxuICB9IGVsc2Uge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlLCBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIHRoYXQgPSBhcnJheVxuICAgIHRoYXQuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gYW4gb2JqZWN0IGluc3RhbmNlIG9mIHRoZSBCdWZmZXIgY2xhc3NcbiAgICB0aGF0ID0gZnJvbUFycmF5TGlrZSh0aGF0LCBhcnJheSlcbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tT2JqZWN0ICh0aGF0LCBvYmopIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihvYmopKSB7XG4gICAgdmFyIGxlbiA9IGNoZWNrZWQob2JqLmxlbmd0aCkgfCAwXG4gICAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW4pXG5cbiAgICBpZiAodGhhdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGF0XG4gICAgfVxuXG4gICAgb2JqLmNvcHkodGhhdCwgMCwgMCwgbGVuKVxuICAgIHJldHVybiB0aGF0XG4gIH1cblxuICBpZiAob2JqKSB7XG4gICAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIG9iai5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikgfHwgJ2xlbmd0aCcgaW4gb2JqKSB7XG4gICAgICBpZiAodHlwZW9mIG9iai5sZW5ndGggIT09ICdudW1iZXInIHx8IGlzbmFuKG9iai5sZW5ndGgpKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgMClcbiAgICAgIH1cbiAgICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKHRoYXQsIG9iailcbiAgICB9XG5cbiAgICBpZiAob2JqLnR5cGUgPT09ICdCdWZmZXInICYmIGlzQXJyYXkob2JqLmRhdGEpKSB7XG4gICAgICByZXR1cm4gZnJvbUFycmF5TGlrZSh0aGF0LCBvYmouZGF0YSlcbiAgICB9XG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nLCBCdWZmZXIsIEFycmF5QnVmZmVyLCBBcnJheSwgb3IgYXJyYXktbGlrZSBvYmplY3QuJylcbn1cblxuZnVuY3Rpb24gY2hlY2tlZCAobGVuZ3RoKSB7XG4gIC8vIE5vdGU6IGNhbm5vdCB1c2UgYGxlbmd0aCA8IGtNYXhMZW5ndGgoKWAgaGVyZSBiZWNhdXNlIHRoYXQgZmFpbHMgd2hlblxuICAvLyBsZW5ndGggaXMgTmFOICh3aGljaCBpcyBvdGhlcndpc2UgY29lcmNlZCB0byB6ZXJvLilcbiAgaWYgKGxlbmd0aCA+PSBrTWF4TGVuZ3RoKCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byBhbGxvY2F0ZSBCdWZmZXIgbGFyZ2VyIHRoYW4gbWF4aW11bSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAnc2l6ZTogMHgnICsga01heExlbmd0aCgpLnRvU3RyaW5nKDE2KSArICcgYnl0ZXMnKVxuICB9XG4gIHJldHVybiBsZW5ndGggfCAwXG59XG5cbmZ1bmN0aW9uIFNsb3dCdWZmZXIgKGxlbmd0aCkge1xuICBpZiAoK2xlbmd0aCAhPSBsZW5ndGgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBlcWVxZXFcbiAgICBsZW5ndGggPSAwXG4gIH1cbiAgcmV0dXJuIEJ1ZmZlci5hbGxvYygrbGVuZ3RoKVxufVxuXG5CdWZmZXIuaXNCdWZmZXIgPSBmdW5jdGlvbiBpc0J1ZmZlciAoYikge1xuICByZXR1cm4gISEoYiAhPSBudWxsICYmIGIuX2lzQnVmZmVyKVxufVxuXG5CdWZmZXIuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKGEsIGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYSkgfHwgIUJ1ZmZlci5pc0J1ZmZlcihiKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyBtdXN0IGJlIEJ1ZmZlcnMnKVxuICB9XG5cbiAgaWYgKGEgPT09IGIpIHJldHVybiAwXG5cbiAgdmFyIHggPSBhLmxlbmd0aFxuICB2YXIgeSA9IGIubGVuZ3RoXG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IE1hdGgubWluKHgsIHkpOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgeCA9IGFbaV1cbiAgICAgIHkgPSBiW2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuQnVmZmVyLmlzRW5jb2RpbmcgPSBmdW5jdGlvbiBpc0VuY29kaW5nIChlbmNvZGluZykge1xuICBzd2l0Y2ggKFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdsYXRpbjEnOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0dXJuIHRydWVcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuQnVmZmVyLmNvbmNhdCA9IGZ1bmN0aW9uIGNvbmNhdCAobGlzdCwgbGVuZ3RoKSB7XG4gIGlmICghaXNBcnJheShsaXN0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gIH1cblxuICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gQnVmZmVyLmFsbG9jKDApXG4gIH1cblxuICB2YXIgaVxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBsZW5ndGggPSAwXG4gICAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgIGxlbmd0aCArPSBsaXN0W2ldLmxlbmd0aFxuICAgIH1cbiAgfVxuXG4gIHZhciBidWZmZXIgPSBCdWZmZXIuYWxsb2NVbnNhZmUobGVuZ3RoKVxuICB2YXIgcG9zID0gMFxuICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgIHZhciBidWYgPSBsaXN0W2ldXG4gICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgICB9XG4gICAgYnVmLmNvcHkoYnVmZmVyLCBwb3MpXG4gICAgcG9zICs9IGJ1Zi5sZW5ndGhcbiAgfVxuICByZXR1cm4gYnVmZmVyXG59XG5cbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzdHJpbmcpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5sZW5ndGhcbiAgfVxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICAoQXJyYXlCdWZmZXIuaXNWaWV3KHN0cmluZykgfHwgc3RyaW5nIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5ieXRlTGVuZ3RoXG4gIH1cbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgc3RyaW5nID0gJycgKyBzdHJpbmdcbiAgfVxuXG4gIHZhciBsZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGlmIChsZW4gPT09IDApIHJldHVybiAwXG5cbiAgLy8gVXNlIGEgZm9yIGxvb3AgdG8gYXZvaWQgcmVjdXJzaW9uXG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG4gIGZvciAoOzspIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxlblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICAgICAgcmV0dXJuIHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gbGVuICogMlxuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGxlbiA+Pj4gMVxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgcmV0dXJuIHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoIC8vIGFzc3VtZSB1dGY4XG4gICAgICAgIGVuY29kaW5nID0gKCcnICsgZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5CdWZmZXIuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcblxuZnVuY3Rpb24gc2xvd1RvU3RyaW5nIChlbmNvZGluZywgc3RhcnQsIGVuZCkge1xuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuXG4gIC8vIE5vIG5lZWQgdG8gdmVyaWZ5IHRoYXQgXCJ0aGlzLmxlbmd0aCA8PSBNQVhfVUlOVDMyXCIgc2luY2UgaXQncyBhIHJlYWQtb25seVxuICAvLyBwcm9wZXJ0eSBvZiBhIHR5cGVkIGFycmF5LlxuXG4gIC8vIFRoaXMgYmVoYXZlcyBuZWl0aGVyIGxpa2UgU3RyaW5nIG5vciBVaW50OEFycmF5IGluIHRoYXQgd2Ugc2V0IHN0YXJ0L2VuZFxuICAvLyB0byB0aGVpciB1cHBlci9sb3dlciBib3VuZHMgaWYgdGhlIHZhbHVlIHBhc3NlZCBpcyBvdXQgb2YgcmFuZ2UuXG4gIC8vIHVuZGVmaW5lZCBpcyBoYW5kbGVkIHNwZWNpYWxseSBhcyBwZXIgRUNNQS0yNjIgNnRoIEVkaXRpb24sXG4gIC8vIFNlY3Rpb24gMTMuMy4zLjcgUnVudGltZSBTZW1hbnRpY3M6IEtleWVkQmluZGluZ0luaXRpYWxpemF0aW9uLlxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCB8fCBzdGFydCA8IDApIHtcbiAgICBzdGFydCA9IDBcbiAgfVxuICAvLyBSZXR1cm4gZWFybHkgaWYgc3RhcnQgPiB0aGlzLmxlbmd0aC4gRG9uZSBoZXJlIHRvIHByZXZlbnQgcG90ZW50aWFsIHVpbnQzMlxuICAvLyBjb2VyY2lvbiBmYWlsIGJlbG93LlxuICBpZiAoc3RhcnQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkIHx8IGVuZCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChlbmQgPD0gMCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgLy8gRm9yY2UgY29lcnNpb24gdG8gdWludDMyLiBUaGlzIHdpbGwgYWxzbyBjb2VyY2UgZmFsc2V5L05hTiB2YWx1ZXMgdG8gMC5cbiAgZW5kID4+Pj0gMFxuICBzdGFydCA+Pj49IDBcblxuICBpZiAoZW5kIDw9IHN0YXJ0KSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9ICd1dGY4J1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsYXRpbjFTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHV0ZjE2bGVTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoZW5jb2RpbmcgKyAnJykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuLy8gVGhlIHByb3BlcnR5IGlzIHVzZWQgYnkgYEJ1ZmZlci5pc0J1ZmZlcmAgYW5kIGBpcy1idWZmZXJgIChpbiBTYWZhcmkgNS03KSB0byBkZXRlY3Rcbi8vIEJ1ZmZlciBpbnN0YW5jZXMuXG5CdWZmZXIucHJvdG90eXBlLl9pc0J1ZmZlciA9IHRydWVcblxuZnVuY3Rpb24gc3dhcCAoYiwgbiwgbSkge1xuICB2YXIgaSA9IGJbbl1cbiAgYltuXSA9IGJbbV1cbiAgYlttXSA9IGlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwMTYgPSBmdW5jdGlvbiBzd2FwMTYgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDIgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDE2LWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDIpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAxKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDMyID0gZnVuY3Rpb24gc3dhcDMyICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSA0ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAzMi1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMylcbiAgICBzd2FwKHRoaXMsIGkgKyAxLCBpICsgMilcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXA2NCA9IGZ1bmN0aW9uIHN3YXA2NCAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgOCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNjQtYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gOCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDcpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDYpXG4gICAgc3dhcCh0aGlzLCBpICsgMiwgaSArIDUpXG4gICAgc3dhcCh0aGlzLCBpICsgMywgaSArIDQpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoIHwgMFxuICBpZiAobGVuZ3RoID09PSAwKSByZXR1cm4gJydcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiB1dGY4U2xpY2UodGhpcywgMCwgbGVuZ3RoKVxuICByZXR1cm4gc2xvd1RvU3RyaW5nLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHMgKGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICBpZiAodGhpcyA9PT0gYikgcmV0dXJuIHRydWVcbiAgcmV0dXJuIEJ1ZmZlci5jb21wYXJlKHRoaXMsIGIpID09PSAwXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uIGluc3BlY3QgKCkge1xuICB2YXIgc3RyID0gJydcbiAgdmFyIG1heCA9IGV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVNcbiAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgIHN0ciA9IHRoaXMudG9TdHJpbmcoJ2hleCcsIDAsIG1heCkubWF0Y2goLy57Mn0vZykuam9pbignICcpXG4gICAgaWYgKHRoaXMubGVuZ3RoID4gbWF4KSBzdHIgKz0gJyAuLi4gJ1xuICB9XG4gIHJldHVybiAnPEJ1ZmZlciAnICsgc3RyICsgJz4nXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKHRhcmdldCwgc3RhcnQsIGVuZCwgdGhpc1N0YXJ0LCB0aGlzRW5kKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKHRhcmdldCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgfVxuXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5kID0gdGFyZ2V0ID8gdGFyZ2V0Lmxlbmd0aCA6IDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzU3RhcnQgPSAwXG4gIH1cbiAgaWYgKHRoaXNFbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNFbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKHN0YXJ0IDwgMCB8fCBlbmQgPiB0YXJnZXQubGVuZ3RoIHx8IHRoaXNTdGFydCA8IDAgfHwgdGhpc0VuZCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ291dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQgJiYgc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQpIHtcbiAgICByZXR1cm4gLTFcbiAgfVxuICBpZiAoc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDFcbiAgfVxuXG4gIHN0YXJ0ID4+Pj0gMFxuICBlbmQgPj4+PSAwXG4gIHRoaXNTdGFydCA+Pj49IDBcbiAgdGhpc0VuZCA+Pj49IDBcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0KSByZXR1cm4gMFxuXG4gIHZhciB4ID0gdGhpc0VuZCAtIHRoaXNTdGFydFxuICB2YXIgeSA9IGVuZCAtIHN0YXJ0XG4gIHZhciBsZW4gPSBNYXRoLm1pbih4LCB5KVxuXG4gIHZhciB0aGlzQ29weSA9IHRoaXMuc2xpY2UodGhpc1N0YXJ0LCB0aGlzRW5kKVxuICB2YXIgdGFyZ2V0Q29weSA9IHRhcmdldC5zbGljZShzdGFydCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAodGhpc0NvcHlbaV0gIT09IHRhcmdldENvcHlbaV0pIHtcbiAgICAgIHggPSB0aGlzQ29weVtpXVxuICAgICAgeSA9IHRhcmdldENvcHlbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG4vLyBGaW5kcyBlaXRoZXIgdGhlIGZpcnN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA+PSBgYnl0ZU9mZnNldGAsXG4vLyBPUiB0aGUgbGFzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPD0gYGJ5dGVPZmZzZXRgLlxuLy9cbi8vIEFyZ3VtZW50czpcbi8vIC0gYnVmZmVyIC0gYSBCdWZmZXIgdG8gc2VhcmNoXG4vLyAtIHZhbCAtIGEgc3RyaW5nLCBCdWZmZXIsIG9yIG51bWJlclxuLy8gLSBieXRlT2Zmc2V0IC0gYW4gaW5kZXggaW50byBgYnVmZmVyYDsgd2lsbCBiZSBjbGFtcGVkIHRvIGFuIGludDMyXG4vLyAtIGVuY29kaW5nIC0gYW4gb3B0aW9uYWwgZW5jb2RpbmcsIHJlbGV2YW50IGlzIHZhbCBpcyBhIHN0cmluZ1xuLy8gLSBkaXIgLSB0cnVlIGZvciBpbmRleE9mLCBmYWxzZSBmb3IgbGFzdEluZGV4T2ZcbmZ1bmN0aW9uIGJpZGlyZWN0aW9uYWxJbmRleE9mIChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICAvLyBFbXB0eSBidWZmZXIgbWVhbnMgbm8gbWF0Y2hcbiAgaWYgKGJ1ZmZlci5sZW5ndGggPT09IDApIHJldHVybiAtMVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0XG4gIGlmICh0eXBlb2YgYnl0ZU9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IGJ5dGVPZmZzZXRcbiAgICBieXRlT2Zmc2V0ID0gMFxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPiAweDdmZmZmZmZmKSB7XG4gICAgYnl0ZU9mZnNldCA9IDB4N2ZmZmZmZmZcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgLTB4ODAwMDAwMDApIHtcbiAgICBieXRlT2Zmc2V0ID0gLTB4ODAwMDAwMDBcbiAgfVxuICBieXRlT2Zmc2V0ID0gK2J5dGVPZmZzZXQgIC8vIENvZXJjZSB0byBOdW1iZXIuXG4gIGlmIChpc05hTihieXRlT2Zmc2V0KSkge1xuICAgIC8vIGJ5dGVPZmZzZXQ6IGl0IGl0J3MgdW5kZWZpbmVkLCBudWxsLCBOYU4sIFwiZm9vXCIsIGV0Yywgc2VhcmNoIHdob2xlIGJ1ZmZlclxuICAgIGJ5dGVPZmZzZXQgPSBkaXIgPyAwIDogKGJ1ZmZlci5sZW5ndGggLSAxKVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXQ6IG5lZ2F0aXZlIG9mZnNldHMgc3RhcnQgZnJvbSB0aGUgZW5kIG9mIHRoZSBidWZmZXJcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwKSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCArIGJ5dGVPZmZzZXRcbiAgaWYgKGJ5dGVPZmZzZXQgPj0gYnVmZmVyLmxlbmd0aCkge1xuICAgIGlmIChkaXIpIHJldHVybiAtMVxuICAgIGVsc2UgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggLSAxXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IDApIHtcbiAgICBpZiAoZGlyKSBieXRlT2Zmc2V0ID0gMFxuICAgIGVsc2UgcmV0dXJuIC0xXG4gIH1cblxuICAvLyBOb3JtYWxpemUgdmFsXG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIHZhbCA9IEJ1ZmZlci5mcm9tKHZhbCwgZW5jb2RpbmcpXG4gIH1cblxuICAvLyBGaW5hbGx5LCBzZWFyY2ggZWl0aGVyIGluZGV4T2YgKGlmIGRpciBpcyB0cnVlKSBvciBsYXN0SW5kZXhPZlxuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbCkpIHtcbiAgICAvLyBTcGVjaWFsIGNhc2U6IGxvb2tpbmcgZm9yIGVtcHR5IHN0cmluZy9idWZmZXIgYWx3YXlzIGZhaWxzXG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMHhGRiAvLyBTZWFyY2ggZm9yIGEgYnl0ZSB2YWx1ZSBbMC0yNTVdXG4gICAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmXG4gICAgICAgIHR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAoZGlyKSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIFsgdmFsIF0sIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2YWwgbXVzdCBiZSBzdHJpbmcsIG51bWJlciBvciBCdWZmZXInKVxufVxuXG5mdW5jdGlvbiBhcnJheUluZGV4T2YgKGFyciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKSB7XG4gIHZhciBpbmRleFNpemUgPSAxXG4gIHZhciBhcnJMZW5ndGggPSBhcnIubGVuZ3RoXG4gIHZhciB2YWxMZW5ndGggPSB2YWwubGVuZ3RoXG5cbiAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgIGlmIChlbmNvZGluZyA9PT0gJ3VjczInIHx8IGVuY29kaW5nID09PSAndWNzLTInIHx8XG4gICAgICAgIGVuY29kaW5nID09PSAndXRmMTZsZScgfHwgZW5jb2RpbmcgPT09ICd1dGYtMTZsZScpIHtcbiAgICAgIGlmIChhcnIubGVuZ3RoIDwgMiB8fCB2YWwubGVuZ3RoIDwgMikge1xuICAgICAgICByZXR1cm4gLTFcbiAgICAgIH1cbiAgICAgIGluZGV4U2l6ZSA9IDJcbiAgICAgIGFyckxlbmd0aCAvPSAyXG4gICAgICB2YWxMZW5ndGggLz0gMlxuICAgICAgYnl0ZU9mZnNldCAvPSAyXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZCAoYnVmLCBpKSB7XG4gICAgaWYgKGluZGV4U2l6ZSA9PT0gMSkge1xuICAgICAgcmV0dXJuIGJ1ZltpXVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYnVmLnJlYWRVSW50MTZCRShpICogaW5kZXhTaXplKVxuICAgIH1cbiAgfVxuXG4gIHZhciBpXG4gIGlmIChkaXIpIHtcbiAgICB2YXIgZm91bmRJbmRleCA9IC0xXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA8IGFyckxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocmVhZChhcnIsIGkpID09PSByZWFkKHZhbCwgZm91bmRJbmRleCA9PT0gLTEgPyAwIDogaSAtIGZvdW5kSW5kZXgpKSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ID09PSAtMSkgZm91bmRJbmRleCA9IGlcbiAgICAgICAgaWYgKGkgLSBmb3VuZEluZGV4ICsgMSA9PT0gdmFsTGVuZ3RoKSByZXR1cm4gZm91bmRJbmRleCAqIGluZGV4U2l6ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggIT09IC0xKSBpIC09IGkgLSBmb3VuZEluZGV4XG4gICAgICAgIGZvdW5kSW5kZXggPSAtMVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoYnl0ZU9mZnNldCArIHZhbExlbmd0aCA+IGFyckxlbmd0aCkgYnl0ZU9mZnNldCA9IGFyckxlbmd0aCAtIHZhbExlbmd0aFxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgZm91bmQgPSB0cnVlXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHZhbExlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChyZWFkKGFyciwgaSArIGopICE9PSByZWFkKHZhbCwgaikpIHtcbiAgICAgICAgICBmb3VuZCA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gaVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluY2x1ZGVzID0gZnVuY3Rpb24gaW5jbHVkZXMgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIHRoaXMuaW5kZXhPZih2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSAhPT0gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gaW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgdHJ1ZSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5sYXN0SW5kZXhPZiA9IGZ1bmN0aW9uIGxhc3RJbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBmYWxzZSlcbn1cblxuZnVuY3Rpb24gaGV4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwXG4gIHZhciByZW1haW5pbmcgPSBidWYubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cblxuICAvLyBtdXN0IGJlIGFuIGV2ZW4gbnVtYmVyIG9mIGRpZ2l0c1xuICB2YXIgc3RyTGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAoc3RyTGVuICUgMiAhPT0gMCkgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBoZXggc3RyaW5nJylcblxuICBpZiAobGVuZ3RoID4gc3RyTGVuIC8gMikge1xuICAgIGxlbmd0aCA9IHN0ckxlbiAvIDJcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgdmFyIHBhcnNlZCA9IHBhcnNlSW50KHN0cmluZy5zdWJzdHIoaSAqIDIsIDIpLCAxNilcbiAgICBpZiAoaXNOYU4ocGFyc2VkKSkgcmV0dXJuIGlcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSBwYXJzZWRcbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiB1dGY4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGY4VG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBhc2NpaVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYXNjaWlUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGxhdGluMVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGFzY2lpV3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBiYXNlNjRXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGJhc2U2NFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gdWNzMldyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmMTZsZVRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIHdyaXRlIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZykge1xuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nKVxuICBpZiAob2Zmc2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBlbmNvZGluZylcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gb2Zmc2V0XG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIG9mZnNldFssIGxlbmd0aF1bLCBlbmNvZGluZ10pXG4gIH0gZWxzZSBpZiAoaXNGaW5pdGUob2Zmc2V0KSkge1xuICAgIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgICBpZiAoaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoIHwgMFxuICAgICAgaWYgKGVuY29kaW5nID09PSB1bmRlZmluZWQpIGVuY29kaW5nID0gJ3V0ZjgnXG4gICAgfSBlbHNlIHtcbiAgICAgIGVuY29kaW5nID0gbGVuZ3RoXG4gICAgICBsZW5ndGggPSB1bmRlZmluZWRcbiAgICB9XG4gIC8vIGxlZ2FjeSB3cml0ZShzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXQsIGxlbmd0aCkgLSByZW1vdmUgaW4gdjAuMTNcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnQnVmZmVyLndyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldFssIGxlbmd0aF0pIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQnXG4gICAgKVxuICB9XG5cbiAgdmFyIHJlbWFpbmluZyA9IHRoaXMubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCB8fCBsZW5ndGggPiByZW1haW5pbmcpIGxlbmd0aCA9IHJlbWFpbmluZ1xuXG4gIGlmICgoc3RyaW5nLmxlbmd0aCA+IDAgJiYgKGxlbmd0aCA8IDAgfHwgb2Zmc2V0IDwgMCkpIHx8IG9mZnNldCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gd3JpdGUgb3V0c2lkZSBidWZmZXIgYm91bmRzJylcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgLy8gV2FybmluZzogbWF4TGVuZ3RoIG5vdCB0YWtlbiBpbnRvIGFjY291bnQgaW4gYmFzZTY0V3JpdGVcbiAgICAgICAgcmV0dXJuIGJhc2U2NFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1Y3MyV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKCcnICsgZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OICgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnQnVmZmVyJyxcbiAgICBkYXRhOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9hcnIgfHwgdGhpcywgMClcbiAgfVxufVxuXG5mdW5jdGlvbiBiYXNlNjRTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGlmIChzdGFydCA9PT0gMCAmJiBlbmQgPT09IGJ1Zi5sZW5ndGgpIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYuc2xpY2Uoc3RhcnQsIGVuZCkpXG4gIH1cbn1cblxuZnVuY3Rpb24gdXRmOFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuICB2YXIgcmVzID0gW11cblxuICB2YXIgaSA9IHN0YXJ0XG4gIHdoaWxlIChpIDwgZW5kKSB7XG4gICAgdmFyIGZpcnN0Qnl0ZSA9IGJ1ZltpXVxuICAgIHZhciBjb2RlUG9pbnQgPSBudWxsXG4gICAgdmFyIGJ5dGVzUGVyU2VxdWVuY2UgPSAoZmlyc3RCeXRlID4gMHhFRikgPyA0XG4gICAgICA6IChmaXJzdEJ5dGUgPiAweERGKSA/IDNcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4QkYpID8gMlxuICAgICAgOiAxXG5cbiAgICBpZiAoaSArIGJ5dGVzUGVyU2VxdWVuY2UgPD0gZW5kKSB7XG4gICAgICB2YXIgc2Vjb25kQnl0ZSwgdGhpcmRCeXRlLCBmb3VydGhCeXRlLCB0ZW1wQ29kZVBvaW50XG5cbiAgICAgIHN3aXRjaCAoYnl0ZXNQZXJTZXF1ZW5jZSkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgaWYgKGZpcnN0Qnl0ZSA8IDB4ODApIHtcbiAgICAgICAgICAgIGNvZGVQb2ludCA9IGZpcnN0Qnl0ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweDFGKSA8PCAweDYgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0YpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHhDIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAodGhpcmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3RkYgJiYgKHRlbXBDb2RlUG9pbnQgPCAweEQ4MDAgfHwgdGVtcENvZGVQb2ludCA+IDB4REZGRikpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgZm91cnRoQnl0ZSA9IGJ1ZltpICsgM11cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKGZvdXJ0aEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4MTIgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4QyB8ICh0aGlyZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAoZm91cnRoQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4RkZGRiAmJiB0ZW1wQ29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZVBvaW50ID09PSBudWxsKSB7XG4gICAgICAvLyB3ZSBkaWQgbm90IGdlbmVyYXRlIGEgdmFsaWQgY29kZVBvaW50IHNvIGluc2VydCBhXG4gICAgICAvLyByZXBsYWNlbWVudCBjaGFyIChVK0ZGRkQpIGFuZCBhZHZhbmNlIG9ubHkgMSBieXRlXG4gICAgICBjb2RlUG9pbnQgPSAweEZGRkRcbiAgICAgIGJ5dGVzUGVyU2VxdWVuY2UgPSAxXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPiAweEZGRkYpIHtcbiAgICAgIC8vIGVuY29kZSB0byB1dGYxNiAoc3Vycm9nYXRlIHBhaXIgZGFuY2UpXG4gICAgICBjb2RlUG9pbnQgLT0gMHgxMDAwMFxuICAgICAgcmVzLnB1c2goY29kZVBvaW50ID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKVxuICAgICAgY29kZVBvaW50ID0gMHhEQzAwIHwgY29kZVBvaW50ICYgMHgzRkZcbiAgICB9XG5cbiAgICByZXMucHVzaChjb2RlUG9pbnQpXG4gICAgaSArPSBieXRlc1BlclNlcXVlbmNlXG4gIH1cblxuICByZXR1cm4gZGVjb2RlQ29kZVBvaW50c0FycmF5KHJlcylcbn1cblxuLy8gQmFzZWQgb24gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjI3NDcyNzIvNjgwNzQyLCB0aGUgYnJvd3NlciB3aXRoXG4vLyB0aGUgbG93ZXN0IGxpbWl0IGlzIENocm9tZSwgd2l0aCAweDEwMDAwIGFyZ3MuXG4vLyBXZSBnbyAxIG1hZ25pdHVkZSBsZXNzLCBmb3Igc2FmZXR5XG52YXIgTUFYX0FSR1VNRU5UU19MRU5HVEggPSAweDEwMDBcblxuZnVuY3Rpb24gZGVjb2RlQ29kZVBvaW50c0FycmF5IChjb2RlUG9pbnRzKSB7XG4gIHZhciBsZW4gPSBjb2RlUG9pbnRzLmxlbmd0aFxuICBpZiAobGVuIDw9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjb2RlUG9pbnRzKSAvLyBhdm9pZCBleHRyYSBzbGljZSgpXG4gIH1cblxuICAvLyBEZWNvZGUgaW4gY2h1bmtzIHRvIGF2b2lkIFwiY2FsbCBzdGFjayBzaXplIGV4Y2VlZGVkXCIuXG4gIHZhciByZXMgPSAnJ1xuICB2YXIgaSA9IDBcbiAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShcbiAgICAgIFN0cmluZyxcbiAgICAgIGNvZGVQb2ludHMuc2xpY2UoaSwgaSArPSBNQVhfQVJHVU1FTlRTX0xFTkdUSClcbiAgICApXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSAmIDB4N0YpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBsYXRpbjFTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBoZXhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA8IDApIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuXG5cbiAgdmFyIG91dCA9ICcnXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgb3V0ICs9IHRvSGV4KGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gb3V0XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBieXRlcyA9IGJ1Zi5zbGljZShzdGFydCwgZW5kKVxuICB2YXIgcmVzID0gJydcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldICsgYnl0ZXNbaSArIDFdICogMjU2KVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIHNsaWNlIChzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBzdGFydCA9IH5+c3RhcnRcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyBsZW4gOiB+fmVuZFxuXG4gIGlmIChzdGFydCA8IDApIHtcbiAgICBzdGFydCArPSBsZW5cbiAgICBpZiAoc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgfSBlbHNlIGlmIChzdGFydCA+IGxlbikge1xuICAgIHN0YXJ0ID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgMCkge1xuICAgIGVuZCArPSBsZW5cbiAgICBpZiAoZW5kIDwgMCkgZW5kID0gMFxuICB9IGVsc2UgaWYgKGVuZCA+IGxlbikge1xuICAgIGVuZCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IHN0YXJ0KSBlbmQgPSBzdGFydFxuXG4gIHZhciBuZXdCdWZcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgbmV3QnVmID0gdGhpcy5zdWJhcnJheShzdGFydCwgZW5kKVxuICAgIG5ld0J1Zi5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgdmFyIHNsaWNlTGVuID0gZW5kIC0gc3RhcnRcbiAgICBuZXdCdWYgPSBuZXcgQnVmZmVyKHNsaWNlTGVuLCB1bmRlZmluZWQpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGljZUxlbjsgKytpKSB7XG4gICAgICBuZXdCdWZbaV0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3QnVmXG59XG5cbi8qXG4gKiBOZWVkIHRvIG1ha2Ugc3VyZSB0aGF0IGJ1ZmZlciBpc24ndCB0cnlpbmcgdG8gd3JpdGUgb3V0IG9mIGJvdW5kcy5cbiAqL1xuZnVuY3Rpb24gY2hlY2tPZmZzZXQgKG9mZnNldCwgZXh0LCBsZW5ndGgpIHtcbiAgaWYgKChvZmZzZXQgJSAxKSAhPT0gMCB8fCBvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb2Zmc2V0IGlzIG5vdCB1aW50JylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RyeWluZyB0byBhY2Nlc3MgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50TEUgPSBmdW5jdGlvbiByZWFkVUludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XVxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50QkUgPSBmdW5jdGlvbiByZWFkVUludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuICB9XG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXVxuICB2YXIgbXVsID0gMVxuICB3aGlsZSAoYnl0ZUxlbmd0aCA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQ4ID0gZnVuY3Rpb24gcmVhZFVJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2TEUgPSBmdW5jdGlvbiByZWFkVUludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkJFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDgpIHwgdGhpc1tvZmZzZXQgKyAxXVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAoKHRoaXNbb2Zmc2V0XSkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpKSArXG4gICAgICAodGhpc1tvZmZzZXQgKyAzXSAqIDB4MTAwMDAwMClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyQkUgPSBmdW5jdGlvbiByZWFkVUludDMyQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSAqIDB4MTAwMDAwMCkgK1xuICAgICgodGhpc1tvZmZzZXQgKyAxXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDgpIHxcbiAgICB0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRMRSA9IGZ1bmN0aW9uIHJlYWRJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF1cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRCRSA9IGZ1bmN0aW9uIHJlYWRJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aFxuICB2YXIgbXVsID0gMVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWldXG4gIHdoaWxlIChpID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0taV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQ4ID0gZnVuY3Rpb24gcmVhZEludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgaWYgKCEodGhpc1tvZmZzZXRdICYgMHg4MCkpIHJldHVybiAodGhpc1tvZmZzZXRdKVxuICByZXR1cm4gKCgweGZmIC0gdGhpc1tvZmZzZXRdICsgMSkgKiAtMSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2QkUgPSBmdW5jdGlvbiByZWFkSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAxXSB8ICh0aGlzW29mZnNldF0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkxFID0gZnVuY3Rpb24gcmVhZEludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSkgfFxuICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDNdIDw8IDI0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkJFID0gZnVuY3Rpb24gcmVhZEludDMyQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCAyNCkgfFxuICAgICh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdExFID0gZnVuY3Rpb24gcmVhZEZsb2F0TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdEJFID0gZnVuY3Rpb24gcmVhZEZsb2F0QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlTEUgPSBmdW5jdGlvbiByZWFkRG91YmxlTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDUyLCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVCRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDUyLCA4KVxufVxuXG5mdW5jdGlvbiBjaGVja0ludCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiYnVmZmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlciBpbnN0YW5jZScpXG4gIGlmICh2YWx1ZSA+IG1heCB8fCB2YWx1ZSA8IG1pbikgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBpcyBvdXQgb2YgYm91bmRzJylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludExFID0gZnVuY3Rpb24gd3JpdGVVSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludEJFID0gZnVuY3Rpb24gd3JpdGVVSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICB2YXIgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIHZhciBtdWwgPSAxXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDggPSBmdW5jdGlvbiB3cml0ZVVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4ZmYsIDApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSlcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuZnVuY3Rpb24gb2JqZWN0V3JpdGVVSW50MTYgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmICsgdmFsdWUgKyAxXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4oYnVmLmxlbmd0aCAtIG9mZnNldCwgMik7IGkgPCBqOyArK2kpIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSAodmFsdWUgJiAoMHhmZiA8PCAoOCAqIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpKSkpID4+PlxuICAgICAgKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkgKiA4XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlVUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuZnVuY3Rpb24gb2JqZWN0V3JpdGVVSW50MzIgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGJ1Zi5sZW5ndGggLSBvZmZzZXQsIDQpOyBpIDwgajsgKytpKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gKHZhbHVlID4+PiAobGl0dGxlRW5kaWFuID8gaSA6IDMgLSBpKSAqIDgpICYgMHhmZlxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludExFID0gZnVuY3Rpb24gd3JpdGVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIGxpbWl0ID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGggLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICB2YXIgaSA9IDBcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHN1YiA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpIC0gMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludEJFID0gZnVuY3Rpb24gd3JpdGVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIGxpbWl0ID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGggLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICB2YXIgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIHZhciBtdWwgPSAxXG4gIHZhciBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpICsgMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDggPSBmdW5jdGlvbiB3cml0ZUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHg3ZiwgLTB4ODApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSlcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmICsgdmFsdWUgKyAxXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDFcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbmZ1bmN0aW9uIGNoZWNrSUVFRTc1NCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbiAgaWYgKG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5mdW5jdGlvbiB3cml0ZUZsb2F0IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDQsIDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgsIC0zLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRMRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdEJFID0gZnVuY3Rpb24gd3JpdGVGbG9hdEJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRG91YmxlIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDgsIDEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4LCAtMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG4gIHJldHVybiBvZmZzZXQgKyA4XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVMRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUJFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuLy8gY29weSh0YXJnZXRCdWZmZXIsIHRhcmdldFN0YXJ0PTAsIHNvdXJjZVN0YXJ0PTAsIHNvdXJjZUVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gY29weSAodGFyZ2V0LCB0YXJnZXRTdGFydCwgc3RhcnQsIGVuZCkge1xuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0U3RhcnQgPj0gdGFyZ2V0Lmxlbmd0aCkgdGFyZ2V0U3RhcnQgPSB0YXJnZXQubGVuZ3RoXG4gIGlmICghdGFyZ2V0U3RhcnQpIHRhcmdldFN0YXJ0ID0gMFxuICBpZiAoZW5kID4gMCAmJiBlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICAvLyBDb3B5IDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVybiAwXG4gIGlmICh0YXJnZXQubGVuZ3RoID09PSAwIHx8IHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIEZhdGFsIGVycm9yIGNvbmRpdGlvbnNcbiAgaWYgKHRhcmdldFN0YXJ0IDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCd0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgfVxuICBpZiAoc3RhcnQgPCAwIHx8IHN0YXJ0ID49IHRoaXMubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc291cmNlU3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChlbmQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc291cmNlRW5kIG91dCBvZiBib3VuZHMnKVxuXG4gIC8vIEFyZSB3ZSBvb2I/XG4gIGlmIChlbmQgPiB0aGlzLmxlbmd0aCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCA8IGVuZCAtIHN0YXJ0KSB7XG4gICAgZW5kID0gdGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0ICsgc3RhcnRcbiAgfVxuXG4gIHZhciBsZW4gPSBlbmQgLSBzdGFydFxuICB2YXIgaVxuXG4gIGlmICh0aGlzID09PSB0YXJnZXQgJiYgc3RhcnQgPCB0YXJnZXRTdGFydCAmJiB0YXJnZXRTdGFydCA8IGVuZCkge1xuICAgIC8vIGRlc2NlbmRpbmcgY29weSBmcm9tIGVuZFxuICAgIGZvciAoaSA9IGxlbiAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfSBlbHNlIGlmIChsZW4gPCAxMDAwIHx8ICFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIGFzY2VuZGluZyBjb3B5IGZyb20gc3RhcnRcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIFVpbnQ4QXJyYXkucHJvdG90eXBlLnNldC5jYWxsKFxuICAgICAgdGFyZ2V0LFxuICAgICAgdGhpcy5zdWJhcnJheShzdGFydCwgc3RhcnQgKyBsZW4pLFxuICAgICAgdGFyZ2V0U3RhcnRcbiAgICApXG4gIH1cblxuICByZXR1cm4gbGVuXG59XG5cbi8vIFVzYWdlOlxuLy8gICAgYnVmZmVyLmZpbGwobnVtYmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChidWZmZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKHN0cmluZ1ssIG9mZnNldFssIGVuZF1dWywgZW5jb2RpbmddKVxuQnVmZmVyLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gZmlsbCAodmFsLCBzdGFydCwgZW5kLCBlbmNvZGluZykge1xuICAvLyBIYW5kbGUgc3RyaW5nIGNhc2VzOlxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBzdGFydFxuICAgICAgc3RhcnQgPSAwXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVuZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gZW5kXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH1cbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdmFyIGNvZGUgPSB2YWwuY2hhckNvZGVBdCgwKVxuICAgICAgaWYgKGNvZGUgPCAyNTYpIHtcbiAgICAgICAgdmFsID0gY29kZVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdlbmNvZGluZyBtdXN0IGJlIGEgc3RyaW5nJylcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZycgJiYgIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDI1NVxuICB9XG5cbiAgLy8gSW52YWxpZCByYW5nZXMgYXJlIG5vdCBzZXQgdG8gYSBkZWZhdWx0LCBzbyBjYW4gcmFuZ2UgY2hlY2sgZWFybHkuXG4gIGlmIChzdGFydCA8IDAgfHwgdGhpcy5sZW5ndGggPCBzdGFydCB8fCB0aGlzLmxlbmd0aCA8IGVuZCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdPdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzdGFydCA9IHN0YXJ0ID4+PiAwXG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gdGhpcy5sZW5ndGggOiBlbmQgPj4+IDBcblxuICBpZiAoIXZhbCkgdmFsID0gMFxuXG4gIHZhciBpXG4gIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICAgIHRoaXNbaV0gPSB2YWxcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGJ5dGVzID0gQnVmZmVyLmlzQnVmZmVyKHZhbClcbiAgICAgID8gdmFsXG4gICAgICA6IHV0ZjhUb0J5dGVzKG5ldyBCdWZmZXIodmFsLCBlbmNvZGluZykudG9TdHJpbmcoKSlcbiAgICB2YXIgbGVuID0gYnl0ZXMubGVuZ3RoXG4gICAgZm9yIChpID0gMDsgaSA8IGVuZCAtIHN0YXJ0OyArK2kpIHtcbiAgICAgIHRoaXNbaSArIHN0YXJ0XSA9IGJ5dGVzW2kgJSBsZW5dXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gSEVMUEVSIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09PVxuXG52YXIgSU5WQUxJRF9CQVNFNjRfUkUgPSAvW14rXFwvMC05QS1aYS16LV9dL2dcblxuZnVuY3Rpb24gYmFzZTY0Y2xlYW4gKHN0cikge1xuICAvLyBOb2RlIHN0cmlwcyBvdXQgaW52YWxpZCBjaGFyYWN0ZXJzIGxpa2UgXFxuIGFuZCBcXHQgZnJvbSB0aGUgc3RyaW5nLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgc3RyID0gc3RyaW5ndHJpbShzdHIpLnJlcGxhY2UoSU5WQUxJRF9CQVNFNjRfUkUsICcnKVxuICAvLyBOb2RlIGNvbnZlcnRzIHN0cmluZ3Mgd2l0aCBsZW5ndGggPCAyIHRvICcnXG4gIGlmIChzdHIubGVuZ3RoIDwgMikgcmV0dXJuICcnXG4gIC8vIE5vZGUgYWxsb3dzIGZvciBub24tcGFkZGVkIGJhc2U2NCBzdHJpbmdzIChtaXNzaW5nIHRyYWlsaW5nID09PSksIGJhc2U2NC1qcyBkb2VzIG5vdFxuICB3aGlsZSAoc3RyLmxlbmd0aCAlIDQgIT09IDApIHtcbiAgICBzdHIgPSBzdHIgKyAnPSdcbiAgfVxuICByZXR1cm4gc3RyXG59XG5cbmZ1bmN0aW9uIHN0cmluZ3RyaW0gKHN0cikge1xuICBpZiAoc3RyLnRyaW0pIHJldHVybiBzdHIudHJpbSgpXG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpXG59XG5cbmZ1bmN0aW9uIHRvSGV4IChuKSB7XG4gIGlmIChuIDwgMTYpIHJldHVybiAnMCcgKyBuLnRvU3RyaW5nKDE2KVxuICByZXR1cm4gbi50b1N0cmluZygxNilcbn1cblxuZnVuY3Rpb24gdXRmOFRvQnl0ZXMgKHN0cmluZywgdW5pdHMpIHtcbiAgdW5pdHMgPSB1bml0cyB8fCBJbmZpbml0eVxuICB2YXIgY29kZVBvaW50XG4gIHZhciBsZW5ndGggPSBzdHJpbmcubGVuZ3RoXG4gIHZhciBsZWFkU3Vycm9nYXRlID0gbnVsbFxuICB2YXIgYnl0ZXMgPSBbXVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBjb2RlUG9pbnQgPSBzdHJpbmcuY2hhckNvZGVBdChpKVxuXG4gICAgLy8gaXMgc3Vycm9nYXRlIGNvbXBvbmVudFxuICAgIGlmIChjb2RlUG9pbnQgPiAweEQ3RkYgJiYgY29kZVBvaW50IDwgMHhFMDAwKSB7XG4gICAgICAvLyBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCFsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAgIC8vIG5vIGxlYWQgeWV0XG4gICAgICAgIGlmIChjb2RlUG9pbnQgPiAweERCRkYpIHtcbiAgICAgICAgICAvLyB1bmV4cGVjdGVkIHRyYWlsXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfSBlbHNlIGlmIChpICsgMSA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgLy8gdW5wYWlyZWQgbGVhZFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICAvLyB2YWxpZCBsZWFkXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyAyIGxlYWRzIGluIGEgcm93XG4gICAgICBpZiAoY29kZVBvaW50IDwgMHhEQzAwKSB7XG4gICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIHZhbGlkIHN1cnJvZ2F0ZSBwYWlyXG4gICAgICBjb2RlUG9pbnQgPSAobGVhZFN1cnJvZ2F0ZSAtIDB4RDgwMCA8PCAxMCB8IGNvZGVQb2ludCAtIDB4REMwMCkgKyAweDEwMDAwXG4gICAgfSBlbHNlIGlmIChsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAvLyB2YWxpZCBibXAgY2hhciwgYnV0IGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICB9XG5cbiAgICBsZWFkU3Vycm9nYXRlID0gbnVsbFxuXG4gICAgLy8gZW5jb2RlIHV0ZjhcbiAgICBpZiAoY29kZVBvaW50IDwgMHg4MCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAxKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKGNvZGVQb2ludClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4ODAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgfCAweEMwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAzKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDIHwgMHhFMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gNCkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4MTIgfCAweEYwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvZGUgcG9pbnQnKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBieXRlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVRvQnl0ZXMgKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICAvLyBOb2RlJ3MgY29kZSBzZWVtcyB0byBiZSBkb2luZyB0aGlzIGFuZCBub3QgJiAweDdGLi5cbiAgICBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpXG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiB1dGYxNmxlVG9CeXRlcyAoc3RyLCB1bml0cykge1xuICB2YXIgYywgaGksIGxvXG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuXG4gICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgaGkgPSBjID4+IDhcbiAgICBsbyA9IGMgJSAyNTZcbiAgICBieXRlQXJyYXkucHVzaChsbylcbiAgICBieXRlQXJyYXkucHVzaChoaSlcbiAgfVxuXG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gYmFzZTY0VG9CeXRlcyAoc3RyKSB7XG4gIHJldHVybiBiYXNlNjQudG9CeXRlQXJyYXkoYmFzZTY0Y2xlYW4oc3RyKSlcbn1cblxuZnVuY3Rpb24gYmxpdEJ1ZmZlciAoc3JjLCBkc3QsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKGkgKyBvZmZzZXQgPj0gZHN0Lmxlbmd0aCkgfHwgKGkgPj0gc3JjLmxlbmd0aCkpIGJyZWFrXG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gaXNuYW4gKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSB2YWwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zZWxmLWNvbXBhcmVcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVsbGlwdGljID0gZXhwb3J0cztcblxuZWxsaXB0aWMudmVyc2lvbiA9IHJlcXVpcmUoJy4uL3BhY2thZ2UuanNvbicpLnZlcnNpb247XG5lbGxpcHRpYy51dGlscyA9IHJlcXVpcmUoJy4vZWxsaXB0aWMvdXRpbHMnKTtcbmVsbGlwdGljLnJhbmQgPSByZXF1aXJlKCdicm9yYW5kJyk7XG5lbGxpcHRpYy5jdXJ2ZSA9IHJlcXVpcmUoJy4vZWxsaXB0aWMvY3VydmUnKTtcbmVsbGlwdGljLmN1cnZlcyA9IHJlcXVpcmUoJy4vZWxsaXB0aWMvY3VydmVzJyk7XG5cbi8vIFByb3RvY29sc1xuZWxsaXB0aWMuZWMgPSByZXF1aXJlKCcuL2VsbGlwdGljL2VjJyk7XG5lbGxpcHRpYy5lZGRzYSA9IHJlcXVpcmUoJy4vZWxsaXB0aWMvZWRkc2EnKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEJOID0gcmVxdWlyZSgnYm4uanMnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG52YXIgZ2V0TkFGID0gdXRpbHMuZ2V0TkFGO1xudmFyIGdldEpTRiA9IHV0aWxzLmdldEpTRjtcbnZhciBhc3NlcnQgPSB1dGlscy5hc3NlcnQ7XG5cbmZ1bmN0aW9uIEJhc2VDdXJ2ZSh0eXBlLCBjb25mKSB7XG4gIHRoaXMudHlwZSA9IHR5cGU7XG4gIHRoaXMucCA9IG5ldyBCTihjb25mLnAsIDE2KTtcblxuICAvLyBVc2UgTW9udGdvbWVyeSwgd2hlbiB0aGVyZSBpcyBubyBmYXN0IHJlZHVjdGlvbiBmb3IgdGhlIHByaW1lXG4gIHRoaXMucmVkID0gY29uZi5wcmltZSA/IEJOLnJlZChjb25mLnByaW1lKSA6IEJOLm1vbnQodGhpcy5wKTtcblxuICAvLyBVc2VmdWwgZm9yIG1hbnkgY3VydmVzXG4gIHRoaXMuemVybyA9IG5ldyBCTigwKS50b1JlZCh0aGlzLnJlZCk7XG4gIHRoaXMub25lID0gbmV3IEJOKDEpLnRvUmVkKHRoaXMucmVkKTtcbiAgdGhpcy50d28gPSBuZXcgQk4oMikudG9SZWQodGhpcy5yZWQpO1xuXG4gIC8vIEN1cnZlIGNvbmZpZ3VyYXRpb24sIG9wdGlvbmFsXG4gIHRoaXMubiA9IGNvbmYubiAmJiBuZXcgQk4oY29uZi5uLCAxNik7XG4gIHRoaXMuZyA9IGNvbmYuZyAmJiB0aGlzLnBvaW50RnJvbUpTT04oY29uZi5nLCBjb25mLmdSZWQpO1xuXG4gIC8vIFRlbXBvcmFyeSBhcnJheXNcbiAgdGhpcy5fd25hZlQxID0gbmV3IEFycmF5KDQpO1xuICB0aGlzLl93bmFmVDIgPSBuZXcgQXJyYXkoNCk7XG4gIHRoaXMuX3duYWZUMyA9IG5ldyBBcnJheSg0KTtcbiAgdGhpcy5fd25hZlQ0ID0gbmV3IEFycmF5KDQpO1xuXG4gIHRoaXMuX2JpdExlbmd0aCA9IHRoaXMubiA/IHRoaXMubi5iaXRMZW5ndGgoKSA6IDA7XG5cbiAgLy8gR2VuZXJhbGl6ZWQgR3JlZyBNYXh3ZWxsJ3MgdHJpY2tcbiAgdmFyIGFkanVzdENvdW50ID0gdGhpcy5uICYmIHRoaXMucC5kaXYodGhpcy5uKTtcbiAgaWYgKCFhZGp1c3RDb3VudCB8fCBhZGp1c3RDb3VudC5jbXBuKDEwMCkgPiAwKSB7XG4gICAgdGhpcy5yZWROID0gbnVsbDtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9tYXh3ZWxsVHJpY2sgPSB0cnVlO1xuICAgIHRoaXMucmVkTiA9IHRoaXMubi50b1JlZCh0aGlzLnJlZCk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gQmFzZUN1cnZlO1xuXG5CYXNlQ3VydmUucHJvdG90eXBlLnBvaW50ID0gZnVuY3Rpb24gcG9pbnQoKSB7XG4gIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XG59O1xuXG5CYXNlQ3VydmUucHJvdG90eXBlLnZhbGlkYXRlID0gZnVuY3Rpb24gdmFsaWRhdGUoKSB7XG4gIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XG59O1xuXG5CYXNlQ3VydmUucHJvdG90eXBlLl9maXhlZE5hZk11bCA9IGZ1bmN0aW9uIF9maXhlZE5hZk11bChwLCBrKSB7XG4gIGFzc2VydChwLnByZWNvbXB1dGVkKTtcbiAgdmFyIGRvdWJsZXMgPSBwLl9nZXREb3VibGVzKCk7XG5cbiAgdmFyIG5hZiA9IGdldE5BRihrLCAxLCB0aGlzLl9iaXRMZW5ndGgpO1xuICB2YXIgSSA9ICgxIDw8IChkb3VibGVzLnN0ZXAgKyAxKSkgLSAoZG91Ymxlcy5zdGVwICUgMiA9PT0gMCA/IDIgOiAxKTtcbiAgSSAvPSAzO1xuXG4gIC8vIFRyYW5zbGF0ZSBpbnRvIG1vcmUgd2luZG93ZWQgZm9ybVxuICB2YXIgcmVwciA9IFtdO1xuICBmb3IgKHZhciBqID0gMDsgaiA8IG5hZi5sZW5ndGg7IGogKz0gZG91Ymxlcy5zdGVwKSB7XG4gICAgdmFyIG5hZlcgPSAwO1xuICAgIGZvciAodmFyIGsgPSBqICsgZG91Ymxlcy5zdGVwIC0gMTsgayA+PSBqOyBrLS0pXG4gICAgICBuYWZXID0gKG5hZlcgPDwgMSkgKyBuYWZba107XG4gICAgcmVwci5wdXNoKG5hZlcpO1xuICB9XG5cbiAgdmFyIGEgPSB0aGlzLmpwb2ludChudWxsLCBudWxsLCBudWxsKTtcbiAgdmFyIGIgPSB0aGlzLmpwb2ludChudWxsLCBudWxsLCBudWxsKTtcbiAgZm9yICh2YXIgaSA9IEk7IGkgPiAwOyBpLS0pIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJlcHIubGVuZ3RoOyBqKyspIHtcbiAgICAgIHZhciBuYWZXID0gcmVwcltqXTtcbiAgICAgIGlmIChuYWZXID09PSBpKVxuICAgICAgICBiID0gYi5taXhlZEFkZChkb3VibGVzLnBvaW50c1tqXSk7XG4gICAgICBlbHNlIGlmIChuYWZXID09PSAtaSlcbiAgICAgICAgYiA9IGIubWl4ZWRBZGQoZG91Ymxlcy5wb2ludHNbal0ubmVnKCkpO1xuICAgIH1cbiAgICBhID0gYS5hZGQoYik7XG4gIH1cbiAgcmV0dXJuIGEudG9QKCk7XG59O1xuXG5CYXNlQ3VydmUucHJvdG90eXBlLl93bmFmTXVsID0gZnVuY3Rpb24gX3duYWZNdWwocCwgaykge1xuICB2YXIgdyA9IDQ7XG5cbiAgLy8gUHJlY29tcHV0ZSB3aW5kb3dcbiAgdmFyIG5hZlBvaW50cyA9IHAuX2dldE5BRlBvaW50cyh3KTtcbiAgdyA9IG5hZlBvaW50cy53bmQ7XG4gIHZhciB3bmQgPSBuYWZQb2ludHMucG9pbnRzO1xuXG4gIC8vIEdldCBOQUYgZm9ybVxuICB2YXIgbmFmID0gZ2V0TkFGKGssIHcsIHRoaXMuX2JpdExlbmd0aCk7XG5cbiAgLy8gQWRkIGB0aGlzYCooTisxKSBmb3IgZXZlcnkgdy1OQUYgaW5kZXhcbiAgdmFyIGFjYyA9IHRoaXMuanBvaW50KG51bGwsIG51bGwsIG51bGwpO1xuICBmb3IgKHZhciBpID0gbmFmLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgLy8gQ291bnQgemVyb2VzXG4gICAgZm9yICh2YXIgayA9IDA7IGkgPj0gMCAmJiBuYWZbaV0gPT09IDA7IGktLSlcbiAgICAgIGsrKztcbiAgICBpZiAoaSA+PSAwKVxuICAgICAgaysrO1xuICAgIGFjYyA9IGFjYy5kYmxwKGspO1xuXG4gICAgaWYgKGkgPCAwKVxuICAgICAgYnJlYWs7XG4gICAgdmFyIHogPSBuYWZbaV07XG4gICAgYXNzZXJ0KHogIT09IDApO1xuICAgIGlmIChwLnR5cGUgPT09ICdhZmZpbmUnKSB7XG4gICAgICAvLyBKICstIFBcbiAgICAgIGlmICh6ID4gMClcbiAgICAgICAgYWNjID0gYWNjLm1peGVkQWRkKHduZFsoeiAtIDEpID4+IDFdKTtcbiAgICAgIGVsc2VcbiAgICAgICAgYWNjID0gYWNjLm1peGVkQWRkKHduZFsoLXogLSAxKSA+PiAxXS5uZWcoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEogKy0gSlxuICAgICAgaWYgKHogPiAwKVxuICAgICAgICBhY2MgPSBhY2MuYWRkKHduZFsoeiAtIDEpID4+IDFdKTtcbiAgICAgIGVsc2VcbiAgICAgICAgYWNjID0gYWNjLmFkZCh3bmRbKC16IC0gMSkgPj4gMV0ubmVnKCkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcC50eXBlID09PSAnYWZmaW5lJyA/IGFjYy50b1AoKSA6IGFjYztcbn07XG5cbkJhc2VDdXJ2ZS5wcm90b3R5cGUuX3duYWZNdWxBZGQgPSBmdW5jdGlvbiBfd25hZk11bEFkZChkZWZXLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2VmZnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGphY29iaWFuUmVzdWx0KSB7XG4gIHZhciB3bmRXaWR0aCA9IHRoaXMuX3duYWZUMTtcbiAgdmFyIHduZCA9IHRoaXMuX3duYWZUMjtcbiAgdmFyIG5hZiA9IHRoaXMuX3duYWZUMztcblxuICAvLyBGaWxsIGFsbCBhcnJheXNcbiAgdmFyIG1heCA9IDA7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICB2YXIgcCA9IHBvaW50c1tpXTtcbiAgICB2YXIgbmFmUG9pbnRzID0gcC5fZ2V0TkFGUG9pbnRzKGRlZlcpO1xuICAgIHduZFdpZHRoW2ldID0gbmFmUG9pbnRzLnduZDtcbiAgICB3bmRbaV0gPSBuYWZQb2ludHMucG9pbnRzO1xuICB9XG5cbiAgLy8gQ29tYiBzbWFsbCB3aW5kb3cgTkFGc1xuICBmb3IgKHZhciBpID0gbGVuIC0gMTsgaSA+PSAxOyBpIC09IDIpIHtcbiAgICB2YXIgYSA9IGkgLSAxO1xuICAgIHZhciBiID0gaTtcbiAgICBpZiAod25kV2lkdGhbYV0gIT09IDEgfHwgd25kV2lkdGhbYl0gIT09IDEpIHtcbiAgICAgIG5hZlthXSA9IGdldE5BRihjb2VmZnNbYV0sIHduZFdpZHRoW2FdLCB0aGlzLl9iaXRMZW5ndGgpO1xuICAgICAgbmFmW2JdID0gZ2V0TkFGKGNvZWZmc1tiXSwgd25kV2lkdGhbYl0sIHRoaXMuX2JpdExlbmd0aCk7XG4gICAgICBtYXggPSBNYXRoLm1heChuYWZbYV0ubGVuZ3RoLCBtYXgpO1xuICAgICAgbWF4ID0gTWF0aC5tYXgobmFmW2JdLmxlbmd0aCwgbWF4KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBjb21iID0gW1xuICAgICAgcG9pbnRzW2FdLCAvKiAxICovXG4gICAgICBudWxsLCAvKiAzICovXG4gICAgICBudWxsLCAvKiA1ICovXG4gICAgICBwb2ludHNbYl0gLyogNyAqL1xuICAgIF07XG5cbiAgICAvLyBUcnkgdG8gYXZvaWQgUHJvamVjdGl2ZSBwb2ludHMsIGlmIHBvc3NpYmxlXG4gICAgaWYgKHBvaW50c1thXS55LmNtcChwb2ludHNbYl0ueSkgPT09IDApIHtcbiAgICAgIGNvbWJbMV0gPSBwb2ludHNbYV0uYWRkKHBvaW50c1tiXSk7XG4gICAgICBjb21iWzJdID0gcG9pbnRzW2FdLnRvSigpLm1peGVkQWRkKHBvaW50c1tiXS5uZWcoKSk7XG4gICAgfSBlbHNlIGlmIChwb2ludHNbYV0ueS5jbXAocG9pbnRzW2JdLnkucmVkTmVnKCkpID09PSAwKSB7XG4gICAgICBjb21iWzFdID0gcG9pbnRzW2FdLnRvSigpLm1peGVkQWRkKHBvaW50c1tiXSk7XG4gICAgICBjb21iWzJdID0gcG9pbnRzW2FdLmFkZChwb2ludHNbYl0ubmVnKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb21iWzFdID0gcG9pbnRzW2FdLnRvSigpLm1peGVkQWRkKHBvaW50c1tiXSk7XG4gICAgICBjb21iWzJdID0gcG9pbnRzW2FdLnRvSigpLm1peGVkQWRkKHBvaW50c1tiXS5uZWcoKSk7XG4gICAgfVxuXG4gICAgdmFyIGluZGV4ID0gW1xuICAgICAgLTMsIC8qIC0xIC0xICovXG4gICAgICAtMSwgLyogLTEgMCAqL1xuICAgICAgLTUsIC8qIC0xIDEgKi9cbiAgICAgIC03LCAvKiAwIC0xICovXG4gICAgICAwLCAvKiAwIDAgKi9cbiAgICAgIDcsIC8qIDAgMSAqL1xuICAgICAgNSwgLyogMSAtMSAqL1xuICAgICAgMSwgLyogMSAwICovXG4gICAgICAzICAvKiAxIDEgKi9cbiAgICBdO1xuXG4gICAgdmFyIGpzZiA9IGdldEpTRihjb2VmZnNbYV0sIGNvZWZmc1tiXSk7XG4gICAgbWF4ID0gTWF0aC5tYXgoanNmWzBdLmxlbmd0aCwgbWF4KTtcbiAgICBuYWZbYV0gPSBuZXcgQXJyYXkobWF4KTtcbiAgICBuYWZbYl0gPSBuZXcgQXJyYXkobWF4KTtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IG1heDsgaisrKSB7XG4gICAgICB2YXIgamEgPSBqc2ZbMF1bal0gfCAwO1xuICAgICAgdmFyIGpiID0ganNmWzFdW2pdIHwgMDtcblxuICAgICAgbmFmW2FdW2pdID0gaW5kZXhbKGphICsgMSkgKiAzICsgKGpiICsgMSldO1xuICAgICAgbmFmW2JdW2pdID0gMDtcbiAgICAgIHduZFthXSA9IGNvbWI7XG4gICAgfVxuICB9XG5cbiAgdmFyIGFjYyA9IHRoaXMuanBvaW50KG51bGwsIG51bGwsIG51bGwpO1xuICB2YXIgdG1wID0gdGhpcy5fd25hZlQ0O1xuICBmb3IgKHZhciBpID0gbWF4OyBpID49IDA7IGktLSkge1xuICAgIHZhciBrID0gMDtcblxuICAgIHdoaWxlIChpID49IDApIHtcbiAgICAgIHZhciB6ZXJvID0gdHJ1ZTtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgdG1wW2pdID0gbmFmW2pdW2ldIHwgMDtcbiAgICAgICAgaWYgKHRtcFtqXSAhPT0gMClcbiAgICAgICAgICB6ZXJvID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoIXplcm8pXG4gICAgICAgIGJyZWFrO1xuICAgICAgaysrO1xuICAgICAgaS0tO1xuICAgIH1cbiAgICBpZiAoaSA+PSAwKVxuICAgICAgaysrO1xuICAgIGFjYyA9IGFjYy5kYmxwKGspO1xuICAgIGlmIChpIDwgMClcbiAgICAgIGJyZWFrO1xuXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBsZW47IGorKykge1xuICAgICAgdmFyIHogPSB0bXBbal07XG4gICAgICB2YXIgcDtcbiAgICAgIGlmICh6ID09PSAwKVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIGVsc2UgaWYgKHogPiAwKVxuICAgICAgICBwID0gd25kW2pdWyh6IC0gMSkgPj4gMV07XG4gICAgICBlbHNlIGlmICh6IDwgMClcbiAgICAgICAgcCA9IHduZFtqXVsoLXogLSAxKSA+PiAxXS5uZWcoKTtcblxuICAgICAgaWYgKHAudHlwZSA9PT0gJ2FmZmluZScpXG4gICAgICAgIGFjYyA9IGFjYy5taXhlZEFkZChwKTtcbiAgICAgIGVsc2VcbiAgICAgICAgYWNjID0gYWNjLmFkZChwKTtcbiAgICB9XG4gIH1cbiAgLy8gWmVyb2lmeSByZWZlcmVuY2VzXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgd25kW2ldID0gbnVsbDtcblxuICBpZiAoamFjb2JpYW5SZXN1bHQpXG4gICAgcmV0dXJuIGFjYztcbiAgZWxzZVxuICAgIHJldHVybiBhY2MudG9QKCk7XG59O1xuXG5mdW5jdGlvbiBCYXNlUG9pbnQoY3VydmUsIHR5cGUpIHtcbiAgdGhpcy5jdXJ2ZSA9IGN1cnZlO1xuICB0aGlzLnR5cGUgPSB0eXBlO1xuICB0aGlzLnByZWNvbXB1dGVkID0gbnVsbDtcbn1cbkJhc2VDdXJ2ZS5CYXNlUG9pbnQgPSBCYXNlUG9pbnQ7XG5cbkJhc2VQb2ludC5wcm90b3R5cGUuZXEgPSBmdW5jdGlvbiBlcSgvKm90aGVyKi8pIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcbn07XG5cbkJhc2VQb2ludC5wcm90b3R5cGUudmFsaWRhdGUgPSBmdW5jdGlvbiB2YWxpZGF0ZSgpIHtcbiAgcmV0dXJuIHRoaXMuY3VydmUudmFsaWRhdGUodGhpcyk7XG59O1xuXG5CYXNlQ3VydmUucHJvdG90eXBlLmRlY29kZVBvaW50ID0gZnVuY3Rpb24gZGVjb2RlUG9pbnQoYnl0ZXMsIGVuYykge1xuICBieXRlcyA9IHV0aWxzLnRvQXJyYXkoYnl0ZXMsIGVuYyk7XG5cbiAgdmFyIGxlbiA9IHRoaXMucC5ieXRlTGVuZ3RoKCk7XG5cbiAgLy8gdW5jb21wcmVzc2VkLCBoeWJyaWQtb2RkLCBoeWJyaWQtZXZlblxuICBpZiAoKGJ5dGVzWzBdID09PSAweDA0IHx8IGJ5dGVzWzBdID09PSAweDA2IHx8IGJ5dGVzWzBdID09PSAweDA3KSAmJlxuICAgICAgYnl0ZXMubGVuZ3RoIC0gMSA9PT0gMiAqIGxlbikge1xuICAgIGlmIChieXRlc1swXSA9PT0gMHgwNilcbiAgICAgIGFzc2VydChieXRlc1tieXRlcy5sZW5ndGggLSAxXSAlIDIgPT09IDApO1xuICAgIGVsc2UgaWYgKGJ5dGVzWzBdID09PSAweDA3KVxuICAgICAgYXNzZXJ0KGJ5dGVzW2J5dGVzLmxlbmd0aCAtIDFdICUgMiA9PT0gMSk7XG5cbiAgICB2YXIgcmVzID0gIHRoaXMucG9pbnQoYnl0ZXMuc2xpY2UoMSwgMSArIGxlbiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJ5dGVzLnNsaWNlKDEgKyBsZW4sIDEgKyAyICogbGVuKSk7XG5cbiAgICByZXR1cm4gcmVzO1xuICB9IGVsc2UgaWYgKChieXRlc1swXSA9PT0gMHgwMiB8fCBieXRlc1swXSA9PT0gMHgwMykgJiZcbiAgICAgICAgICAgICAgYnl0ZXMubGVuZ3RoIC0gMSA9PT0gbGVuKSB7XG4gICAgcmV0dXJuIHRoaXMucG9pbnRGcm9tWChieXRlcy5zbGljZSgxLCAxICsgbGVuKSwgYnl0ZXNbMF0gPT09IDB4MDMpO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcignVW5rbm93biBwb2ludCBmb3JtYXQnKTtcbn07XG5cbkJhc2VQb2ludC5wcm90b3R5cGUuZW5jb2RlQ29tcHJlc3NlZCA9IGZ1bmN0aW9uIGVuY29kZUNvbXByZXNzZWQoZW5jKSB7XG4gIHJldHVybiB0aGlzLmVuY29kZShlbmMsIHRydWUpO1xufTtcblxuQmFzZVBvaW50LnByb3RvdHlwZS5fZW5jb2RlID0gZnVuY3Rpb24gX2VuY29kZShjb21wYWN0KSB7XG4gIHZhciBsZW4gPSB0aGlzLmN1cnZlLnAuYnl0ZUxlbmd0aCgpO1xuICB2YXIgeCA9IHRoaXMuZ2V0WCgpLnRvQXJyYXkoJ2JlJywgbGVuKTtcblxuICBpZiAoY29tcGFjdClcbiAgICByZXR1cm4gWyB0aGlzLmdldFkoKS5pc0V2ZW4oKSA/IDB4MDIgOiAweDAzIF0uY29uY2F0KHgpO1xuXG4gIHJldHVybiBbIDB4MDQgXS5jb25jYXQoeCwgdGhpcy5nZXRZKCkudG9BcnJheSgnYmUnLCBsZW4pKSA7XG59O1xuXG5CYXNlUG9pbnQucHJvdG90eXBlLmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShlbmMsIGNvbXBhY3QpIHtcbiAgcmV0dXJuIHV0aWxzLmVuY29kZSh0aGlzLl9lbmNvZGUoY29tcGFjdCksIGVuYyk7XG59O1xuXG5CYXNlUG9pbnQucHJvdG90eXBlLnByZWNvbXB1dGUgPSBmdW5jdGlvbiBwcmVjb21wdXRlKHBvd2VyKSB7XG4gIGlmICh0aGlzLnByZWNvbXB1dGVkKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIHZhciBwcmVjb21wdXRlZCA9IHtcbiAgICBkb3VibGVzOiBudWxsLFxuICAgIG5hZjogbnVsbCxcbiAgICBiZXRhOiBudWxsXG4gIH07XG4gIHByZWNvbXB1dGVkLm5hZiA9IHRoaXMuX2dldE5BRlBvaW50cyg4KTtcbiAgcHJlY29tcHV0ZWQuZG91YmxlcyA9IHRoaXMuX2dldERvdWJsZXMoNCwgcG93ZXIpO1xuICBwcmVjb21wdXRlZC5iZXRhID0gdGhpcy5fZ2V0QmV0YSgpO1xuICB0aGlzLnByZWNvbXB1dGVkID0gcHJlY29tcHV0ZWQ7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5CYXNlUG9pbnQucHJvdG90eXBlLl9oYXNEb3VibGVzID0gZnVuY3Rpb24gX2hhc0RvdWJsZXMoaykge1xuICBpZiAoIXRoaXMucHJlY29tcHV0ZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciBkb3VibGVzID0gdGhpcy5wcmVjb21wdXRlZC5kb3VibGVzO1xuICBpZiAoIWRvdWJsZXMpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIHJldHVybiBkb3VibGVzLnBvaW50cy5sZW5ndGggPj0gTWF0aC5jZWlsKChrLmJpdExlbmd0aCgpICsgMSkgLyBkb3VibGVzLnN0ZXApO1xufTtcblxuQmFzZVBvaW50LnByb3RvdHlwZS5fZ2V0RG91YmxlcyA9IGZ1bmN0aW9uIF9nZXREb3VibGVzKHN0ZXAsIHBvd2VyKSB7XG4gIGlmICh0aGlzLnByZWNvbXB1dGVkICYmIHRoaXMucHJlY29tcHV0ZWQuZG91YmxlcylcbiAgICByZXR1cm4gdGhpcy5wcmVjb21wdXRlZC5kb3VibGVzO1xuXG4gIHZhciBkb3VibGVzID0gWyB0aGlzIF07XG4gIHZhciBhY2MgPSB0aGlzO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHBvd2VyOyBpICs9IHN0ZXApIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHN0ZXA7IGorKylcbiAgICAgIGFjYyA9IGFjYy5kYmwoKTtcbiAgICBkb3VibGVzLnB1c2goYWNjKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIHN0ZXA6IHN0ZXAsXG4gICAgcG9pbnRzOiBkb3VibGVzXG4gIH07XG59O1xuXG5CYXNlUG9pbnQucHJvdG90eXBlLl9nZXROQUZQb2ludHMgPSBmdW5jdGlvbiBfZ2V0TkFGUG9pbnRzKHduZCkge1xuICBpZiAodGhpcy5wcmVjb21wdXRlZCAmJiB0aGlzLnByZWNvbXB1dGVkLm5hZilcbiAgICByZXR1cm4gdGhpcy5wcmVjb21wdXRlZC5uYWY7XG5cbiAgdmFyIHJlcyA9IFsgdGhpcyBdO1xuICB2YXIgbWF4ID0gKDEgPDwgd25kKSAtIDE7XG4gIHZhciBkYmwgPSBtYXggPT09IDEgPyBudWxsIDogdGhpcy5kYmwoKTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBtYXg7IGkrKylcbiAgICByZXNbaV0gPSByZXNbaSAtIDFdLmFkZChkYmwpO1xuICByZXR1cm4ge1xuICAgIHduZDogd25kLFxuICAgIHBvaW50czogcmVzXG4gIH07XG59O1xuXG5CYXNlUG9pbnQucHJvdG90eXBlLl9nZXRCZXRhID0gZnVuY3Rpb24gX2dldEJldGEoKSB7XG4gIHJldHVybiBudWxsO1xufTtcblxuQmFzZVBvaW50LnByb3RvdHlwZS5kYmxwID0gZnVuY3Rpb24gZGJscChrKSB7XG4gIHZhciByID0gdGhpcztcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrOyBpKyspXG4gICAgciA9IHIuZGJsKCk7XG4gIHJldHVybiByO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbnZhciBCTiA9IHJlcXVpcmUoJ2JuLmpzJyk7XG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xudmFyIEJhc2UgPSByZXF1aXJlKCcuL2Jhc2UnKTtcblxudmFyIGFzc2VydCA9IHV0aWxzLmFzc2VydDtcblxuZnVuY3Rpb24gRWR3YXJkc0N1cnZlKGNvbmYpIHtcbiAgLy8gTk9URTogSW1wb3J0YW50IGFzIHdlIGFyZSBjcmVhdGluZyBwb2ludCBpbiBCYXNlLmNhbGwoKVxuICB0aGlzLnR3aXN0ZWQgPSAoY29uZi5hIHwgMCkgIT09IDE7XG4gIHRoaXMubU9uZUEgPSB0aGlzLnR3aXN0ZWQgJiYgKGNvbmYuYSB8IDApID09PSAtMTtcbiAgdGhpcy5leHRlbmRlZCA9IHRoaXMubU9uZUE7XG5cbiAgQmFzZS5jYWxsKHRoaXMsICdlZHdhcmRzJywgY29uZik7XG5cbiAgdGhpcy5hID0gbmV3IEJOKGNvbmYuYSwgMTYpLnVtb2QodGhpcy5yZWQubSk7XG4gIHRoaXMuYSA9IHRoaXMuYS50b1JlZCh0aGlzLnJlZCk7XG4gIHRoaXMuYyA9IG5ldyBCTihjb25mLmMsIDE2KS50b1JlZCh0aGlzLnJlZCk7XG4gIHRoaXMuYzIgPSB0aGlzLmMucmVkU3FyKCk7XG4gIHRoaXMuZCA9IG5ldyBCTihjb25mLmQsIDE2KS50b1JlZCh0aGlzLnJlZCk7XG4gIHRoaXMuZGQgPSB0aGlzLmQucmVkQWRkKHRoaXMuZCk7XG5cbiAgYXNzZXJ0KCF0aGlzLnR3aXN0ZWQgfHwgdGhpcy5jLmZyb21SZWQoKS5jbXBuKDEpID09PSAwKTtcbiAgdGhpcy5vbmVDID0gKGNvbmYuYyB8IDApID09PSAxO1xufVxuaW5oZXJpdHMoRWR3YXJkc0N1cnZlLCBCYXNlKTtcbm1vZHVsZS5leHBvcnRzID0gRWR3YXJkc0N1cnZlO1xuXG5FZHdhcmRzQ3VydmUucHJvdG90eXBlLl9tdWxBID0gZnVuY3Rpb24gX211bEEobnVtKSB7XG4gIGlmICh0aGlzLm1PbmVBKVxuICAgIHJldHVybiBudW0ucmVkTmVnKCk7XG4gIGVsc2VcbiAgICByZXR1cm4gdGhpcy5hLnJlZE11bChudW0pO1xufTtcblxuRWR3YXJkc0N1cnZlLnByb3RvdHlwZS5fbXVsQyA9IGZ1bmN0aW9uIF9tdWxDKG51bSkge1xuICBpZiAodGhpcy5vbmVDKVxuICAgIHJldHVybiBudW07XG4gIGVsc2VcbiAgICByZXR1cm4gdGhpcy5jLnJlZE11bChudW0pO1xufTtcblxuLy8gSnVzdCBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIFNob3J0IGN1cnZlXG5FZHdhcmRzQ3VydmUucHJvdG90eXBlLmpwb2ludCA9IGZ1bmN0aW9uIGpwb2ludCh4LCB5LCB6LCB0KSB7XG4gIHJldHVybiB0aGlzLnBvaW50KHgsIHksIHosIHQpO1xufTtcblxuRWR3YXJkc0N1cnZlLnByb3RvdHlwZS5wb2ludEZyb21YID0gZnVuY3Rpb24gcG9pbnRGcm9tWCh4LCBvZGQpIHtcbiAgeCA9IG5ldyBCTih4LCAxNik7XG4gIGlmICgheC5yZWQpXG4gICAgeCA9IHgudG9SZWQodGhpcy5yZWQpO1xuXG4gIHZhciB4MiA9IHgucmVkU3FyKCk7XG4gIHZhciByaHMgPSB0aGlzLmMyLnJlZFN1Yih0aGlzLmEucmVkTXVsKHgyKSk7XG4gIHZhciBsaHMgPSB0aGlzLm9uZS5yZWRTdWIodGhpcy5jMi5yZWRNdWwodGhpcy5kKS5yZWRNdWwoeDIpKTtcblxuICB2YXIgeTIgPSByaHMucmVkTXVsKGxocy5yZWRJbnZtKCkpO1xuICB2YXIgeSA9IHkyLnJlZFNxcnQoKTtcbiAgaWYgKHkucmVkU3FyKCkucmVkU3ViKHkyKS5jbXAodGhpcy56ZXJvKSAhPT0gMClcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgcG9pbnQnKTtcblxuICB2YXIgaXNPZGQgPSB5LmZyb21SZWQoKS5pc09kZCgpO1xuICBpZiAob2RkICYmICFpc09kZCB8fCAhb2RkICYmIGlzT2RkKVxuICAgIHkgPSB5LnJlZE5lZygpO1xuXG4gIHJldHVybiB0aGlzLnBvaW50KHgsIHkpO1xufTtcblxuRWR3YXJkc0N1cnZlLnByb3RvdHlwZS5wb2ludEZyb21ZID0gZnVuY3Rpb24gcG9pbnRGcm9tWSh5LCBvZGQpIHtcbiAgeSA9IG5ldyBCTih5LCAxNik7XG4gIGlmICgheS5yZWQpXG4gICAgeSA9IHkudG9SZWQodGhpcy5yZWQpO1xuXG4gIC8vIHheMiA9ICh5XjIgLSBjXjIpIC8gKGNeMiBkIHleMiAtIGEpXG4gIHZhciB5MiA9IHkucmVkU3FyKCk7XG4gIHZhciBsaHMgPSB5Mi5yZWRTdWIodGhpcy5jMik7XG4gIHZhciByaHMgPSB5Mi5yZWRNdWwodGhpcy5kKS5yZWRNdWwodGhpcy5jMikucmVkU3ViKHRoaXMuYSk7XG4gIHZhciB4MiA9IGxocy5yZWRNdWwocmhzLnJlZEludm0oKSk7XG5cbiAgaWYgKHgyLmNtcCh0aGlzLnplcm8pID09PSAwKSB7XG4gICAgaWYgKG9kZClcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBwb2ludCcpO1xuICAgIGVsc2VcbiAgICAgIHJldHVybiB0aGlzLnBvaW50KHRoaXMuemVybywgeSk7XG4gIH1cblxuICB2YXIgeCA9IHgyLnJlZFNxcnQoKTtcbiAgaWYgKHgucmVkU3FyKCkucmVkU3ViKHgyKS5jbXAodGhpcy56ZXJvKSAhPT0gMClcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgcG9pbnQnKTtcblxuICBpZiAoeC5mcm9tUmVkKCkuaXNPZGQoKSAhPT0gb2RkKVxuICAgIHggPSB4LnJlZE5lZygpO1xuXG4gIHJldHVybiB0aGlzLnBvaW50KHgsIHkpO1xufTtcblxuRWR3YXJkc0N1cnZlLnByb3RvdHlwZS52YWxpZGF0ZSA9IGZ1bmN0aW9uIHZhbGlkYXRlKHBvaW50KSB7XG4gIGlmIChwb2ludC5pc0luZmluaXR5KCkpXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgLy8gQ3VydmU6IEEgKiBYXjIgKyBZXjIgPSBDXjIgKiAoMSArIEQgKiBYXjIgKiBZXjIpXG4gIHBvaW50Lm5vcm1hbGl6ZSgpO1xuXG4gIHZhciB4MiA9IHBvaW50LngucmVkU3FyKCk7XG4gIHZhciB5MiA9IHBvaW50LnkucmVkU3FyKCk7XG4gIHZhciBsaHMgPSB4Mi5yZWRNdWwodGhpcy5hKS5yZWRBZGQoeTIpO1xuICB2YXIgcmhzID0gdGhpcy5jMi5yZWRNdWwodGhpcy5vbmUucmVkQWRkKHRoaXMuZC5yZWRNdWwoeDIpLnJlZE11bCh5MikpKTtcblxuICByZXR1cm4gbGhzLmNtcChyaHMpID09PSAwO1xufTtcblxuZnVuY3Rpb24gUG9pbnQoY3VydmUsIHgsIHksIHosIHQpIHtcbiAgQmFzZS5CYXNlUG9pbnQuY2FsbCh0aGlzLCBjdXJ2ZSwgJ3Byb2plY3RpdmUnKTtcbiAgaWYgKHggPT09IG51bGwgJiYgeSA9PT0gbnVsbCAmJiB6ID09PSBudWxsKSB7XG4gICAgdGhpcy54ID0gdGhpcy5jdXJ2ZS56ZXJvO1xuICAgIHRoaXMueSA9IHRoaXMuY3VydmUub25lO1xuICAgIHRoaXMueiA9IHRoaXMuY3VydmUub25lO1xuICAgIHRoaXMudCA9IHRoaXMuY3VydmUuemVybztcbiAgICB0aGlzLnpPbmUgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHRoaXMueCA9IG5ldyBCTih4LCAxNik7XG4gICAgdGhpcy55ID0gbmV3IEJOKHksIDE2KTtcbiAgICB0aGlzLnogPSB6ID8gbmV3IEJOKHosIDE2KSA6IHRoaXMuY3VydmUub25lO1xuICAgIHRoaXMudCA9IHQgJiYgbmV3IEJOKHQsIDE2KTtcbiAgICBpZiAoIXRoaXMueC5yZWQpXG4gICAgICB0aGlzLnggPSB0aGlzLngudG9SZWQodGhpcy5jdXJ2ZS5yZWQpO1xuICAgIGlmICghdGhpcy55LnJlZClcbiAgICAgIHRoaXMueSA9IHRoaXMueS50b1JlZCh0aGlzLmN1cnZlLnJlZCk7XG4gICAgaWYgKCF0aGlzLnoucmVkKVxuICAgICAgdGhpcy56ID0gdGhpcy56LnRvUmVkKHRoaXMuY3VydmUucmVkKTtcbiAgICBpZiAodGhpcy50ICYmICF0aGlzLnQucmVkKVxuICAgICAgdGhpcy50ID0gdGhpcy50LnRvUmVkKHRoaXMuY3VydmUucmVkKTtcbiAgICB0aGlzLnpPbmUgPSB0aGlzLnogPT09IHRoaXMuY3VydmUub25lO1xuXG4gICAgLy8gVXNlIGV4dGVuZGVkIGNvb3JkaW5hdGVzXG4gICAgaWYgKHRoaXMuY3VydmUuZXh0ZW5kZWQgJiYgIXRoaXMudCkge1xuICAgICAgdGhpcy50ID0gdGhpcy54LnJlZE11bCh0aGlzLnkpO1xuICAgICAgaWYgKCF0aGlzLnpPbmUpXG4gICAgICAgIHRoaXMudCA9IHRoaXMudC5yZWRNdWwodGhpcy56LnJlZEludm0oKSk7XG4gICAgfVxuICB9XG59XG5pbmhlcml0cyhQb2ludCwgQmFzZS5CYXNlUG9pbnQpO1xuXG5FZHdhcmRzQ3VydmUucHJvdG90eXBlLnBvaW50RnJvbUpTT04gPSBmdW5jdGlvbiBwb2ludEZyb21KU09OKG9iaikge1xuICByZXR1cm4gUG9pbnQuZnJvbUpTT04odGhpcywgb2JqKTtcbn07XG5cbkVkd2FyZHNDdXJ2ZS5wcm90b3R5cGUucG9pbnQgPSBmdW5jdGlvbiBwb2ludCh4LCB5LCB6LCB0KSB7XG4gIHJldHVybiBuZXcgUG9pbnQodGhpcywgeCwgeSwgeiwgdCk7XG59O1xuXG5Qb2ludC5mcm9tSlNPTiA9IGZ1bmN0aW9uIGZyb21KU09OKGN1cnZlLCBvYmopIHtcbiAgcmV0dXJuIG5ldyBQb2ludChjdXJ2ZSwgb2JqWzBdLCBvYmpbMV0sIG9ialsyXSk7XG59O1xuXG5Qb2ludC5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uIGluc3BlY3QoKSB7XG4gIGlmICh0aGlzLmlzSW5maW5pdHkoKSlcbiAgICByZXR1cm4gJzxFQyBQb2ludCBJbmZpbml0eT4nO1xuICByZXR1cm4gJzxFQyBQb2ludCB4OiAnICsgdGhpcy54LmZyb21SZWQoKS50b1N0cmluZygxNiwgMikgK1xuICAgICAgJyB5OiAnICsgdGhpcy55LmZyb21SZWQoKS50b1N0cmluZygxNiwgMikgK1xuICAgICAgJyB6OiAnICsgdGhpcy56LmZyb21SZWQoKS50b1N0cmluZygxNiwgMikgKyAnPic7XG59O1xuXG5Qb2ludC5wcm90b3R5cGUuaXNJbmZpbml0eSA9IGZ1bmN0aW9uIGlzSW5maW5pdHkoKSB7XG4gIC8vIFhYWCBUaGlzIGNvZGUgYXNzdW1lcyB0aGF0IHplcm8gaXMgYWx3YXlzIHplcm8gaW4gcmVkXG4gIHJldHVybiB0aGlzLnguY21wbigwKSA9PT0gMCAmJlxuICAgICh0aGlzLnkuY21wKHRoaXMueikgPT09IDAgfHxcbiAgICAodGhpcy56T25lICYmIHRoaXMueS5jbXAodGhpcy5jdXJ2ZS5jKSA9PT0gMCkpO1xufTtcblxuUG9pbnQucHJvdG90eXBlLl9leHREYmwgPSBmdW5jdGlvbiBfZXh0RGJsKCkge1xuICAvLyBoeXBlcmVsbGlwdGljLm9yZy9FRkQvZzFwL2F1dG8tdHdpc3RlZC1leHRlbmRlZC0xLmh0bWxcbiAgLy8gICAgICNkb3VibGluZy1kYmwtMjAwOC1od2NkXG4gIC8vIDRNICsgNFNcblxuICAvLyBBID0gWDFeMlxuICB2YXIgYSA9IHRoaXMueC5yZWRTcXIoKTtcbiAgLy8gQiA9IFkxXjJcbiAgdmFyIGIgPSB0aGlzLnkucmVkU3FyKCk7XG4gIC8vIEMgPSAyICogWjFeMlxuICB2YXIgYyA9IHRoaXMuei5yZWRTcXIoKTtcbiAgYyA9IGMucmVkSUFkZChjKTtcbiAgLy8gRCA9IGEgKiBBXG4gIHZhciBkID0gdGhpcy5jdXJ2ZS5fbXVsQShhKTtcbiAgLy8gRSA9IChYMSArIFkxKV4yIC0gQSAtIEJcbiAgdmFyIGUgPSB0aGlzLngucmVkQWRkKHRoaXMueSkucmVkU3FyKCkucmVkSVN1YihhKS5yZWRJU3ViKGIpO1xuICAvLyBHID0gRCArIEJcbiAgdmFyIGcgPSBkLnJlZEFkZChiKTtcbiAgLy8gRiA9IEcgLSBDXG4gIHZhciBmID0gZy5yZWRTdWIoYyk7XG4gIC8vIEggPSBEIC0gQlxuICB2YXIgaCA9IGQucmVkU3ViKGIpO1xuICAvLyBYMyA9IEUgKiBGXG4gIHZhciBueCA9IGUucmVkTXVsKGYpO1xuICAvLyBZMyA9IEcgKiBIXG4gIHZhciBueSA9IGcucmVkTXVsKGgpO1xuICAvLyBUMyA9IEUgKiBIXG4gIHZhciBudCA9IGUucmVkTXVsKGgpO1xuICAvLyBaMyA9IEYgKiBHXG4gIHZhciBueiA9IGYucmVkTXVsKGcpO1xuICByZXR1cm4gdGhpcy5jdXJ2ZS5wb2ludChueCwgbnksIG56LCBudCk7XG59O1xuXG5Qb2ludC5wcm90b3R5cGUuX3Byb2pEYmwgPSBmdW5jdGlvbiBfcHJvakRibCgpIHtcbiAgLy8gaHlwZXJlbGxpcHRpYy5vcmcvRUZEL2cxcC9hdXRvLXR3aXN0ZWQtcHJvamVjdGl2ZS5odG1sXG4gIC8vICAgICAjZG91YmxpbmctZGJsLTIwMDgtYmJqbHBcbiAgLy8gICAgICNkb3VibGluZy1kYmwtMjAwNy1ibFxuICAvLyBhbmQgb3RoZXJzXG4gIC8vIEdlbmVyYWxseSAzTSArIDRTIG9yIDJNICsgNFNcblxuICAvLyBCID0gKFgxICsgWTEpXjJcbiAgdmFyIGIgPSB0aGlzLngucmVkQWRkKHRoaXMueSkucmVkU3FyKCk7XG4gIC8vIEMgPSBYMV4yXG4gIHZhciBjID0gdGhpcy54LnJlZFNxcigpO1xuICAvLyBEID0gWTFeMlxuICB2YXIgZCA9IHRoaXMueS5yZWRTcXIoKTtcblxuICB2YXIgbng7XG4gIHZhciBueTtcbiAgdmFyIG56O1xuICBpZiAodGhpcy5jdXJ2ZS50d2lzdGVkKSB7XG4gICAgLy8gRSA9IGEgKiBDXG4gICAgdmFyIGUgPSB0aGlzLmN1cnZlLl9tdWxBKGMpO1xuICAgIC8vIEYgPSBFICsgRFxuICAgIHZhciBmID0gZS5yZWRBZGQoZCk7XG4gICAgaWYgKHRoaXMuek9uZSkge1xuICAgICAgLy8gWDMgPSAoQiAtIEMgLSBEKSAqIChGIC0gMilcbiAgICAgIG54ID0gYi5yZWRTdWIoYykucmVkU3ViKGQpLnJlZE11bChmLnJlZFN1Yih0aGlzLmN1cnZlLnR3bykpO1xuICAgICAgLy8gWTMgPSBGICogKEUgLSBEKVxuICAgICAgbnkgPSBmLnJlZE11bChlLnJlZFN1YihkKSk7XG4gICAgICAvLyBaMyA9IEZeMiAtIDIgKiBGXG4gICAgICBueiA9IGYucmVkU3FyKCkucmVkU3ViKGYpLnJlZFN1YihmKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSCA9IFoxXjJcbiAgICAgIHZhciBoID0gdGhpcy56LnJlZFNxcigpO1xuICAgICAgLy8gSiA9IEYgLSAyICogSFxuICAgICAgdmFyIGogPSBmLnJlZFN1YihoKS5yZWRJU3ViKGgpO1xuICAgICAgLy8gWDMgPSAoQi1DLUQpKkpcbiAgICAgIG54ID0gYi5yZWRTdWIoYykucmVkSVN1YihkKS5yZWRNdWwoaik7XG4gICAgICAvLyBZMyA9IEYgKiAoRSAtIEQpXG4gICAgICBueSA9IGYucmVkTXVsKGUucmVkU3ViKGQpKTtcbiAgICAgIC8vIFozID0gRiAqIEpcbiAgICAgIG56ID0gZi5yZWRNdWwoaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEUgPSBDICsgRFxuICAgIHZhciBlID0gYy5yZWRBZGQoZCk7XG4gICAgLy8gSCA9IChjICogWjEpXjJcbiAgICB2YXIgaCA9IHRoaXMuY3VydmUuX211bEModGhpcy56KS5yZWRTcXIoKTtcbiAgICAvLyBKID0gRSAtIDIgKiBIXG4gICAgdmFyIGogPSBlLnJlZFN1YihoKS5yZWRTdWIoaCk7XG4gICAgLy8gWDMgPSBjICogKEIgLSBFKSAqIEpcbiAgICBueCA9IHRoaXMuY3VydmUuX211bEMoYi5yZWRJU3ViKGUpKS5yZWRNdWwoaik7XG4gICAgLy8gWTMgPSBjICogRSAqIChDIC0gRClcbiAgICBueSA9IHRoaXMuY3VydmUuX211bEMoZSkucmVkTXVsKGMucmVkSVN1YihkKSk7XG4gICAgLy8gWjMgPSBFICogSlxuICAgIG56ID0gZS5yZWRNdWwoaik7XG4gIH1cbiAgcmV0dXJuIHRoaXMuY3VydmUucG9pbnQobngsIG55LCBueik7XG59O1xuXG5Qb2ludC5wcm90b3R5cGUuZGJsID0gZnVuY3Rpb24gZGJsKCkge1xuICBpZiAodGhpcy5pc0luZmluaXR5KCkpXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgLy8gRG91YmxlIGluIGV4dGVuZGVkIGNvb3JkaW5hdGVzXG4gIGlmICh0aGlzLmN1cnZlLmV4dGVuZGVkKVxuICAgIHJldHVybiB0aGlzLl9leHREYmwoKTtcbiAgZWxzZVxuICAgIHJldHVybiB0aGlzLl9wcm9qRGJsKCk7XG59O1xuXG5Qb2ludC5wcm90b3R5cGUuX2V4dEFkZCA9IGZ1bmN0aW9uIF9leHRBZGQocCkge1xuICAvLyBoeXBlcmVsbGlwdGljLm9yZy9FRkQvZzFwL2F1dG8tdHdpc3RlZC1leHRlbmRlZC0xLmh0bWxcbiAgLy8gICAgICNhZGRpdGlvbi1hZGQtMjAwOC1od2NkLTNcbiAgLy8gOE1cblxuICAvLyBBID0gKFkxIC0gWDEpICogKFkyIC0gWDIpXG4gIHZhciBhID0gdGhpcy55LnJlZFN1Yih0aGlzLngpLnJlZE11bChwLnkucmVkU3ViKHAueCkpO1xuICAvLyBCID0gKFkxICsgWDEpICogKFkyICsgWDIpXG4gIHZhciBiID0gdGhpcy55LnJlZEFkZCh0aGlzLngpLnJlZE11bChwLnkucmVkQWRkKHAueCkpO1xuICAvLyBDID0gVDEgKiBrICogVDJcbiAgdmFyIGMgPSB0aGlzLnQucmVkTXVsKHRoaXMuY3VydmUuZGQpLnJlZE11bChwLnQpO1xuICAvLyBEID0gWjEgKiAyICogWjJcbiAgdmFyIGQgPSB0aGlzLnoucmVkTXVsKHAuei5yZWRBZGQocC56KSk7XG4gIC8vIEUgPSBCIC0gQVxuICB2YXIgZSA9IGIucmVkU3ViKGEpO1xuICAvLyBGID0gRCAtIENcbiAgdmFyIGYgPSBkLnJlZFN1YihjKTtcbiAgLy8gRyA9IEQgKyBDXG4gIHZhciBnID0gZC5yZWRBZGQoYyk7XG4gIC8vIEggPSBCICsgQVxuICB2YXIgaCA9IGIucmVkQWRkKGEpO1xuICAvLyBYMyA9IEUgKiBGXG4gIHZhciBueCA9IGUucmVkTXVsKGYpO1xuICAvLyBZMyA9IEcgKiBIXG4gIHZhciBueSA9IGcucmVkTXVsKGgpO1xuICAvLyBUMyA9IEUgKiBIXG4gIHZhciBudCA9IGUucmVkTXVsKGgpO1xuICAvLyBaMyA9IEYgKiBHXG4gIHZhciBueiA9IGYucmVkTXVsKGcpO1xuICByZXR1cm4gdGhpcy5jdXJ2ZS5wb2ludChueCwgbnksIG56LCBudCk7XG59O1xuXG5Qb2ludC5wcm90b3R5cGUuX3Byb2pBZGQgPSBmdW5jdGlvbiBfcHJvakFkZChwKSB7XG4gIC8vIGh5cGVyZWxsaXB0aWMub3JnL0VGRC9nMXAvYXV0by10d2lzdGVkLXByb2plY3RpdmUuaHRtbFxuICAvLyAgICAgI2FkZGl0aW9uLWFkZC0yMDA4LWJiamxwXG4gIC8vICAgICAjYWRkaXRpb24tYWRkLTIwMDctYmxcbiAgLy8gMTBNICsgMVNcblxuICAvLyBBID0gWjEgKiBaMlxuICB2YXIgYSA9IHRoaXMuei5yZWRNdWwocC56KTtcbiAgLy8gQiA9IEFeMlxuICB2YXIgYiA9IGEucmVkU3FyKCk7XG4gIC8vIEMgPSBYMSAqIFgyXG4gIHZhciBjID0gdGhpcy54LnJlZE11bChwLngpO1xuICAvLyBEID0gWTEgKiBZMlxuICB2YXIgZCA9IHRoaXMueS5yZWRNdWwocC55KTtcbiAgLy8gRSA9IGQgKiBDICogRFxuICB2YXIgZSA9IHRoaXMuY3VydmUuZC5yZWRNdWwoYykucmVkTXVsKGQpO1xuICAvLyBGID0gQiAtIEVcbiAgdmFyIGYgPSBiLnJlZFN1YihlKTtcbiAgLy8gRyA9IEIgKyBFXG4gIHZhciBnID0gYi5yZWRBZGQoZSk7XG4gIC8vIFgzID0gQSAqIEYgKiAoKFgxICsgWTEpICogKFgyICsgWTIpIC0gQyAtIEQpXG4gIHZhciB0bXAgPSB0aGlzLngucmVkQWRkKHRoaXMueSkucmVkTXVsKHAueC5yZWRBZGQocC55KSkucmVkSVN1YihjKS5yZWRJU3ViKGQpO1xuICB2YXIgbnggPSBhLnJlZE11bChmKS5yZWRNdWwodG1wKTtcbiAgdmFyIG55O1xuICB2YXIgbno7XG4gIGlmICh0aGlzLmN1cnZlLnR3aXN0ZWQpIHtcbiAgICAvLyBZMyA9IEEgKiBHICogKEQgLSBhICogQylcbiAgICBueSA9IGEucmVkTXVsKGcpLnJlZE11bChkLnJlZFN1Yih0aGlzLmN1cnZlLl9tdWxBKGMpKSk7XG4gICAgLy8gWjMgPSBGICogR1xuICAgIG56ID0gZi5yZWRNdWwoZyk7XG4gIH0gZWxzZSB7XG4gICAgLy8gWTMgPSBBICogRyAqIChEIC0gQylcbiAgICBueSA9IGEucmVkTXVsKGcpLnJlZE11bChkLnJlZFN1YihjKSk7XG4gICAgLy8gWjMgPSBjICogRiAqIEdcbiAgICBueiA9IHRoaXMuY3VydmUuX211bEMoZikucmVkTXVsKGcpO1xuICB9XG4gIHJldHVybiB0aGlzLmN1cnZlLnBvaW50KG54LCBueSwgbnopO1xufTtcblxuUG9pbnQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZChwKSB7XG4gIGlmICh0aGlzLmlzSW5maW5pdHkoKSlcbiAgICByZXR1cm4gcDtcbiAgaWYgKHAuaXNJbmZpbml0eSgpKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIGlmICh0aGlzLmN1cnZlLmV4dGVuZGVkKVxuICAgIHJldHVybiB0aGlzLl9leHRBZGQocCk7XG4gIGVsc2VcbiAgICByZXR1cm4gdGhpcy5fcHJvakFkZChwKTtcbn07XG5cblBvaW50LnByb3RvdHlwZS5tdWwgPSBmdW5jdGlvbiBtdWwoaykge1xuICBpZiAodGhpcy5faGFzRG91YmxlcyhrKSlcbiAgICByZXR1cm4gdGhpcy5jdXJ2ZS5fZml4ZWROYWZNdWwodGhpcywgayk7XG4gIGVsc2VcbiAgICByZXR1cm4gdGhpcy5jdXJ2ZS5fd25hZk11bCh0aGlzLCBrKTtcbn07XG5cblBvaW50LnByb3RvdHlwZS5tdWxBZGQgPSBmdW5jdGlvbiBtdWxBZGQoazEsIHAsIGsyKSB7XG4gIHJldHVybiB0aGlzLmN1cnZlLl93bmFmTXVsQWRkKDEsIFsgdGhpcywgcCBdLCBbIGsxLCBrMiBdLCAyLCBmYWxzZSk7XG59O1xuXG5Qb2ludC5wcm90b3R5cGUuam11bEFkZCA9IGZ1bmN0aW9uIGptdWxBZGQoazEsIHAsIGsyKSB7XG4gIHJldHVybiB0aGlzLmN1cnZlLl93bmFmTXVsQWRkKDEsIFsgdGhpcywgcCBdLCBbIGsxLCBrMiBdLCAyLCB0cnVlKTtcbn07XG5cblBvaW50LnByb3RvdHlwZS5ub3JtYWxpemUgPSBmdW5jdGlvbiBub3JtYWxpemUoKSB7XG4gIGlmICh0aGlzLnpPbmUpXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgLy8gTm9ybWFsaXplIGNvb3JkaW5hdGVzXG4gIHZhciB6aSA9IHRoaXMuei5yZWRJbnZtKCk7XG4gIHRoaXMueCA9IHRoaXMueC5yZWRNdWwoemkpO1xuICB0aGlzLnkgPSB0aGlzLnkucmVkTXVsKHppKTtcbiAgaWYgKHRoaXMudClcbiAgICB0aGlzLnQgPSB0aGlzLnQucmVkTXVsKHppKTtcbiAgdGhpcy56ID0gdGhpcy5jdXJ2ZS5vbmU7XG4gIHRoaXMuek9uZSA9IHRydWU7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUG9pbnQucHJvdG90eXBlLm5lZyA9IGZ1bmN0aW9uIG5lZygpIHtcbiAgcmV0dXJuIHRoaXMuY3VydmUucG9pbnQodGhpcy54LnJlZE5lZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ICYmIHRoaXMudC5yZWROZWcoKSk7XG59O1xuXG5Qb2ludC5wcm90b3R5cGUuZ2V0WCA9IGZ1bmN0aW9uIGdldFgoKSB7XG4gIHRoaXMubm9ybWFsaXplKCk7XG4gIHJldHVybiB0aGlzLnguZnJvbVJlZCgpO1xufTtcblxuUG9pbnQucHJvdG90eXBlLmdldFkgPSBmdW5jdGlvbiBnZXRZKCkge1xuICB0aGlzLm5vcm1hbGl6ZSgpO1xuICByZXR1cm4gdGhpcy55LmZyb21SZWQoKTtcbn07XG5cblBvaW50LnByb3RvdHlwZS5lcSA9IGZ1bmN0aW9uIGVxKG90aGVyKSB7XG4gIHJldHVybiB0aGlzID09PSBvdGhlciB8fFxuICAgICAgICAgdGhpcy5nZXRYKCkuY21wKG90aGVyLmdldFgoKSkgPT09IDAgJiZcbiAgICAgICAgIHRoaXMuZ2V0WSgpLmNtcChvdGhlci5nZXRZKCkpID09PSAwO1xufTtcblxuUG9pbnQucHJvdG90eXBlLmVxWFRvUCA9IGZ1bmN0aW9uIGVxWFRvUCh4KSB7XG4gIHZhciByeCA9IHgudG9SZWQodGhpcy5jdXJ2ZS5yZWQpLnJlZE11bCh0aGlzLnopO1xuICBpZiAodGhpcy54LmNtcChyeCkgPT09IDApXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgdmFyIHhjID0geC5jbG9uZSgpO1xuICB2YXIgdCA9IHRoaXMuY3VydmUucmVkTi5yZWRNdWwodGhpcy56KTtcbiAgZm9yICg7Oykge1xuICAgIHhjLmlhZGQodGhpcy5jdXJ2ZS5uKTtcbiAgICBpZiAoeGMuY21wKHRoaXMuY3VydmUucCkgPj0gMClcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIHJ4LnJlZElBZGQodCk7XG4gICAgaWYgKHRoaXMueC5jbXAocngpID09PSAwKVxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cbi8vIENvbXBhdGliaWxpdHkgd2l0aCBCYXNlQ3VydmVcblBvaW50LnByb3RvdHlwZS50b1AgPSBQb2ludC5wcm90b3R5cGUubm9ybWFsaXplO1xuUG9pbnQucHJvdG90eXBlLm1peGVkQWRkID0gUG9pbnQucHJvdG90eXBlLmFkZDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGN1cnZlID0gZXhwb3J0cztcblxuY3VydmUuYmFzZSA9IHJlcXVpcmUoJy4vYmFzZScpO1xuY3VydmUuc2hvcnQgPSByZXF1aXJlKCcuL3Nob3J0Jyk7XG5jdXJ2ZS5tb250ID0gcmVxdWlyZSgnLi9tb250Jyk7XG5jdXJ2ZS5lZHdhcmRzID0gcmVxdWlyZSgnLi9lZHdhcmRzJyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBCTiA9IHJlcXVpcmUoJ2JuLmpzJyk7XG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xudmFyIEJhc2UgPSByZXF1aXJlKCcuL2Jhc2UnKTtcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gTW9udEN1cnZlKGNvbmYpIHtcbiAgQmFzZS5jYWxsKHRoaXMsICdtb250JywgY29uZik7XG5cbiAgdGhpcy5hID0gbmV3IEJOKGNvbmYuYSwgMTYpLnRvUmVkKHRoaXMucmVkKTtcbiAgdGhpcy5iID0gbmV3IEJOKGNvbmYuYiwgMTYpLnRvUmVkKHRoaXMucmVkKTtcbiAgdGhpcy5pNCA9IG5ldyBCTig0KS50b1JlZCh0aGlzLnJlZCkucmVkSW52bSgpO1xuICB0aGlzLnR3byA9IG5ldyBCTigyKS50b1JlZCh0aGlzLnJlZCk7XG4gIHRoaXMuYTI0ID0gdGhpcy5pNC5yZWRNdWwodGhpcy5hLnJlZEFkZCh0aGlzLnR3bykpO1xufVxuaW5oZXJpdHMoTW9udEN1cnZlLCBCYXNlKTtcbm1vZHVsZS5leHBvcnRzID0gTW9udEN1cnZlO1xuXG5Nb250Q3VydmUucHJvdG90eXBlLnZhbGlkYXRlID0gZnVuY3Rpb24gdmFsaWRhdGUocG9pbnQpIHtcbiAgdmFyIHggPSBwb2ludC5ub3JtYWxpemUoKS54O1xuICB2YXIgeDIgPSB4LnJlZFNxcigpO1xuICB2YXIgcmhzID0geDIucmVkTXVsKHgpLnJlZEFkZCh4Mi5yZWRNdWwodGhpcy5hKSkucmVkQWRkKHgpO1xuICB2YXIgeSA9IHJocy5yZWRTcXJ0KCk7XG5cbiAgcmV0dXJuIHkucmVkU3FyKCkuY21wKHJocykgPT09IDA7XG59O1xuXG5mdW5jdGlvbiBQb2ludChjdXJ2ZSwgeCwgeikge1xuICBCYXNlLkJhc2VQb2ludC5jYWxsKHRoaXMsIGN1cnZlLCAncHJvamVjdGl2ZScpO1xuICBpZiAoeCA9PT0gbnVsbCAmJiB6ID09PSBudWxsKSB7XG4gICAgdGhpcy54ID0gdGhpcy5jdXJ2ZS5vbmU7XG4gICAgdGhpcy56ID0gdGhpcy5jdXJ2ZS56ZXJvO1xuICB9IGVsc2Uge1xuICAgIHRoaXMueCA9IG5ldyBCTih4LCAxNik7XG4gICAgdGhpcy56ID0gbmV3IEJOKHosIDE2KTtcbiAgICBpZiAoIXRoaXMueC5yZWQpXG4gICAgICB0aGlzLnggPSB0aGlzLngudG9SZWQodGhpcy5jdXJ2ZS5yZWQpO1xuICAgIGlmICghdGhpcy56LnJlZClcbiAgICAgIHRoaXMueiA9IHRoaXMuei50b1JlZCh0aGlzLmN1cnZlLnJlZCk7XG4gIH1cbn1cbmluaGVyaXRzKFBvaW50LCBCYXNlLkJhc2VQb2ludCk7XG5cbk1vbnRDdXJ2ZS5wcm90b3R5cGUuZGVjb2RlUG9pbnQgPSBmdW5jdGlvbiBkZWNvZGVQb2ludChieXRlcywgZW5jKSB7XG4gIHJldHVybiB0aGlzLnBvaW50KHV0aWxzLnRvQXJyYXkoYnl0ZXMsIGVuYyksIDEpO1xufTtcblxuTW9udEN1cnZlLnByb3RvdHlwZS5wb2ludCA9IGZ1bmN0aW9uIHBvaW50KHgsIHopIHtcbiAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLCB4LCB6KTtcbn07XG5cbk1vbnRDdXJ2ZS5wcm90b3R5cGUucG9pbnRGcm9tSlNPTiA9IGZ1bmN0aW9uIHBvaW50RnJvbUpTT04ob2JqKSB7XG4gIHJldHVybiBQb2ludC5mcm9tSlNPTih0aGlzLCBvYmopO1xufTtcblxuUG9pbnQucHJvdG90eXBlLnByZWNvbXB1dGUgPSBmdW5jdGlvbiBwcmVjb21wdXRlKCkge1xuICAvLyBOby1vcFxufTtcblxuUG9pbnQucHJvdG90eXBlLl9lbmNvZGUgPSBmdW5jdGlvbiBfZW5jb2RlKCkge1xuICByZXR1cm4gdGhpcy5nZXRYKCkudG9BcnJheSgnYmUnLCB0aGlzLmN1cnZlLnAuYnl0ZUxlbmd0aCgpKTtcbn07XG5cblBvaW50LmZyb21KU09OID0gZnVuY3Rpb24gZnJvbUpTT04oY3VydmUsIG9iaikge1xuICByZXR1cm4gbmV3IFBvaW50KGN1cnZlLCBvYmpbMF0sIG9ialsxXSB8fCBjdXJ2ZS5vbmUpO1xufTtcblxuUG9pbnQucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiBpbnNwZWN0KCkge1xuICBpZiAodGhpcy5pc0luZmluaXR5KCkpXG4gICAgcmV0dXJuICc8RUMgUG9pbnQgSW5maW5pdHk+JztcbiAgcmV0dXJuICc8RUMgUG9pbnQgeDogJyArIHRoaXMueC5mcm9tUmVkKCkudG9TdHJpbmcoMTYsIDIpICtcbiAgICAgICcgejogJyArIHRoaXMuei5mcm9tUmVkKCkudG9TdHJpbmcoMTYsIDIpICsgJz4nO1xufTtcblxuUG9pbnQucHJvdG90eXBlLmlzSW5maW5pdHkgPSBmdW5jdGlvbiBpc0luZmluaXR5KCkge1xuICAvLyBYWFggVGhpcyBjb2RlIGFzc3VtZXMgdGhhdCB6ZXJvIGlzIGFsd2F5cyB6ZXJvIGluIHJlZFxuICByZXR1cm4gdGhpcy56LmNtcG4oMCkgPT09IDA7XG59O1xuXG5Qb2ludC5wcm90b3R5cGUuZGJsID0gZnVuY3Rpb24gZGJsKCkge1xuICAvLyBodHRwOi8vaHlwZXJlbGxpcHRpYy5vcmcvRUZEL2cxcC9hdXRvLW1vbnRnb20teHouaHRtbCNkb3VibGluZy1kYmwtMTk4Ny1tLTNcbiAgLy8gMk0gKyAyUyArIDRBXG5cbiAgLy8gQSA9IFgxICsgWjFcbiAgdmFyIGEgPSB0aGlzLngucmVkQWRkKHRoaXMueik7XG4gIC8vIEFBID0gQV4yXG4gIHZhciBhYSA9IGEucmVkU3FyKCk7XG4gIC8vIEIgPSBYMSAtIFoxXG4gIHZhciBiID0gdGhpcy54LnJlZFN1Yih0aGlzLnopO1xuICAvLyBCQiA9IEJeMlxuICB2YXIgYmIgPSBiLnJlZFNxcigpO1xuICAvLyBDID0gQUEgLSBCQlxuICB2YXIgYyA9IGFhLnJlZFN1YihiYik7XG4gIC8vIFgzID0gQUEgKiBCQlxuICB2YXIgbnggPSBhYS5yZWRNdWwoYmIpO1xuICAvLyBaMyA9IEMgKiAoQkIgKyBBMjQgKiBDKVxuICB2YXIgbnogPSBjLnJlZE11bChiYi5yZWRBZGQodGhpcy5jdXJ2ZS5hMjQucmVkTXVsKGMpKSk7XG4gIHJldHVybiB0aGlzLmN1cnZlLnBvaW50KG54LCBueik7XG59O1xuXG5Qb2ludC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gYWRkKCkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBzdXBwb3J0ZWQgb24gTW9udGdvbWVyeSBjdXJ2ZScpO1xufTtcblxuUG9pbnQucHJvdG90eXBlLmRpZmZBZGQgPSBmdW5jdGlvbiBkaWZmQWRkKHAsIGRpZmYpIHtcbiAgLy8gaHR0cDovL2h5cGVyZWxsaXB0aWMub3JnL0VGRC9nMXAvYXV0by1tb250Z29tLXh6Lmh0bWwjZGlmZmFkZC1kYWRkLTE5ODctbS0zXG4gIC8vIDRNICsgMlMgKyA2QVxuXG4gIC8vIEEgPSBYMiArIFoyXG4gIHZhciBhID0gdGhpcy54LnJlZEFkZCh0aGlzLnopO1xuICAvLyBCID0gWDIgLSBaMlxuICB2YXIgYiA9IHRoaXMueC5yZWRTdWIodGhpcy56KTtcbiAgLy8gQyA9IFgzICsgWjNcbiAgdmFyIGMgPSBwLngucmVkQWRkKHAueik7XG4gIC8vIEQgPSBYMyAtIFozXG4gIHZhciBkID0gcC54LnJlZFN1YihwLnopO1xuICAvLyBEQSA9IEQgKiBBXG4gIHZhciBkYSA9IGQucmVkTXVsKGEpO1xuICAvLyBDQiA9IEMgKiBCXG4gIHZhciBjYiA9IGMucmVkTXVsKGIpO1xuICAvLyBYNSA9IFoxICogKERBICsgQ0IpXjJcbiAgdmFyIG54ID0gZGlmZi56LnJlZE11bChkYS5yZWRBZGQoY2IpLnJlZFNxcigpKTtcbiAgLy8gWjUgPSBYMSAqIChEQSAtIENCKV4yXG4gIHZhciBueiA9IGRpZmYueC5yZWRNdWwoZGEucmVkSVN1YihjYikucmVkU3FyKCkpO1xuICByZXR1cm4gdGhpcy5jdXJ2ZS5wb2ludChueCwgbnopO1xufTtcblxuUG9pbnQucHJvdG90eXBlLm11bCA9IGZ1bmN0aW9uIG11bChrKSB7XG4gIHZhciB0ID0gay5jbG9uZSgpO1xuICB2YXIgYSA9IHRoaXM7IC8vIChOIC8gMikgKiBRICsgUVxuICB2YXIgYiA9IHRoaXMuY3VydmUucG9pbnQobnVsbCwgbnVsbCk7IC8vIChOIC8gMikgKiBRXG4gIHZhciBjID0gdGhpczsgLy8gUVxuXG4gIGZvciAodmFyIGJpdHMgPSBbXTsgdC5jbXBuKDApICE9PSAwOyB0Lml1c2hybigxKSlcbiAgICBiaXRzLnB1c2godC5hbmRsbigxKSk7XG5cbiAgZm9yICh2YXIgaSA9IGJpdHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBpZiAoYml0c1tpXSA9PT0gMCkge1xuICAgICAgLy8gTiAqIFEgKyBRID0gKChOIC8gMikgKiBRICsgUSkpICsgKE4gLyAyKSAqIFFcbiAgICAgIGEgPSBhLmRpZmZBZGQoYiwgYyk7XG4gICAgICAvLyBOICogUSA9IDIgKiAoKE4gLyAyKSAqIFEgKyBRKSlcbiAgICAgIGIgPSBiLmRibCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBOICogUSA9ICgoTiAvIDIpICogUSArIFEpICsgKChOIC8gMikgKiBRKVxuICAgICAgYiA9IGEuZGlmZkFkZChiLCBjKTtcbiAgICAgIC8vIE4gKiBRICsgUSA9IDIgKiAoKE4gLyAyKSAqIFEgKyBRKVxuICAgICAgYSA9IGEuZGJsKCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBiO1xufTtcblxuUG9pbnQucHJvdG90eXBlLm11bEFkZCA9IGZ1bmN0aW9uIG11bEFkZCgpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdOb3Qgc3VwcG9ydGVkIG9uIE1vbnRnb21lcnkgY3VydmUnKTtcbn07XG5cblBvaW50LnByb3RvdHlwZS5qdW1sQWRkID0gZnVuY3Rpb24ganVtbEFkZCgpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdOb3Qgc3VwcG9ydGVkIG9uIE1vbnRnb21lcnkgY3VydmUnKTtcbn07XG5cblBvaW50LnByb3RvdHlwZS5lcSA9IGZ1bmN0aW9uIGVxKG90aGVyKSB7XG4gIHJldHVybiB0aGlzLmdldFgoKS5jbXAob3RoZXIuZ2V0WCgpKSA9PT0gMDtcbn07XG5cblBvaW50LnByb3RvdHlwZS5ub3JtYWxpemUgPSBmdW5jdGlvbiBub3JtYWxpemUoKSB7XG4gIHRoaXMueCA9IHRoaXMueC5yZWRNdWwodGhpcy56LnJlZEludm0oKSk7XG4gIHRoaXMueiA9IHRoaXMuY3VydmUub25lO1xuICByZXR1cm4gdGhpcztcbn07XG5cblBvaW50LnByb3RvdHlwZS5nZXRYID0gZnVuY3Rpb24gZ2V0WCgpIHtcbiAgLy8gTm9ybWFsaXplIGNvb3JkaW5hdGVzXG4gIHRoaXMubm9ybWFsaXplKCk7XG5cbiAgcmV0dXJuIHRoaXMueC5mcm9tUmVkKCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIEJOID0gcmVxdWlyZSgnYm4uanMnKTtcbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG52YXIgQmFzZSA9IHJlcXVpcmUoJy4vYmFzZScpO1xuXG52YXIgYXNzZXJ0ID0gdXRpbHMuYXNzZXJ0O1xuXG5mdW5jdGlvbiBTaG9ydEN1cnZlKGNvbmYpIHtcbiAgQmFzZS5jYWxsKHRoaXMsICdzaG9ydCcsIGNvbmYpO1xuXG4gIHRoaXMuYSA9IG5ldyBCTihjb25mLmEsIDE2KS50b1JlZCh0aGlzLnJlZCk7XG4gIHRoaXMuYiA9IG5ldyBCTihjb25mLmIsIDE2KS50b1JlZCh0aGlzLnJlZCk7XG4gIHRoaXMudGludiA9IHRoaXMudHdvLnJlZEludm0oKTtcblxuICB0aGlzLnplcm9BID0gdGhpcy5hLmZyb21SZWQoKS5jbXBuKDApID09PSAwO1xuICB0aGlzLnRocmVlQSA9IHRoaXMuYS5mcm9tUmVkKCkuc3ViKHRoaXMucCkuY21wbigtMykgPT09IDA7XG5cbiAgLy8gSWYgdGhlIGN1cnZlIGlzIGVuZG9tb3JwaGljLCBwcmVjYWxjdWxhdGUgYmV0YSBhbmQgbGFtYmRhXG4gIHRoaXMuZW5kbyA9IHRoaXMuX2dldEVuZG9tb3JwaGlzbShjb25mKTtcbiAgdGhpcy5fZW5kb1duYWZUMSA9IG5ldyBBcnJheSg0KTtcbiAgdGhpcy5fZW5kb1duYWZUMiA9IG5ldyBBcnJheSg0KTtcbn1cbmluaGVyaXRzKFNob3J0Q3VydmUsIEJhc2UpO1xubW9kdWxlLmV4cG9ydHMgPSBTaG9ydEN1cnZlO1xuXG5TaG9ydEN1cnZlLnByb3RvdHlwZS5fZ2V0RW5kb21vcnBoaXNtID0gZnVuY3Rpb24gX2dldEVuZG9tb3JwaGlzbShjb25mKSB7XG4gIC8vIE5vIGVmZmljaWVudCBlbmRvbW9ycGhpc21cbiAgaWYgKCF0aGlzLnplcm9BIHx8ICF0aGlzLmcgfHwgIXRoaXMubiB8fCB0aGlzLnAubW9kbigzKSAhPT0gMSlcbiAgICByZXR1cm47XG5cbiAgLy8gQ29tcHV0ZSBiZXRhIGFuZCBsYW1iZGEsIHRoYXQgbGFtYmRhICogUCA9IChiZXRhICogUHg7IFB5KVxuICB2YXIgYmV0YTtcbiAgdmFyIGxhbWJkYTtcbiAgaWYgKGNvbmYuYmV0YSkge1xuICAgIGJldGEgPSBuZXcgQk4oY29uZi5iZXRhLCAxNikudG9SZWQodGhpcy5yZWQpO1xuICB9IGVsc2Uge1xuICAgIHZhciBiZXRhcyA9IHRoaXMuX2dldEVuZG9Sb290cyh0aGlzLnApO1xuICAgIC8vIENob29zZSB0aGUgc21hbGxlc3QgYmV0YVxuICAgIGJldGEgPSBiZXRhc1swXS5jbXAoYmV0YXNbMV0pIDwgMCA/IGJldGFzWzBdIDogYmV0YXNbMV07XG4gICAgYmV0YSA9IGJldGEudG9SZWQodGhpcy5yZWQpO1xuICB9XG4gIGlmIChjb25mLmxhbWJkYSkge1xuICAgIGxhbWJkYSA9IG5ldyBCTihjb25mLmxhbWJkYSwgMTYpO1xuICB9IGVsc2Uge1xuICAgIC8vIENob29zZSB0aGUgbGFtYmRhIHRoYXQgaXMgbWF0Y2hpbmcgc2VsZWN0ZWQgYmV0YVxuICAgIHZhciBsYW1iZGFzID0gdGhpcy5fZ2V0RW5kb1Jvb3RzKHRoaXMubik7XG4gICAgaWYgKHRoaXMuZy5tdWwobGFtYmRhc1swXSkueC5jbXAodGhpcy5nLngucmVkTXVsKGJldGEpKSA9PT0gMCkge1xuICAgICAgbGFtYmRhID0gbGFtYmRhc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGFtYmRhID0gbGFtYmRhc1sxXTtcbiAgICAgIGFzc2VydCh0aGlzLmcubXVsKGxhbWJkYSkueC5jbXAodGhpcy5nLngucmVkTXVsKGJldGEpKSA9PT0gMCk7XG4gICAgfVxuICB9XG5cbiAgLy8gR2V0IGJhc2lzIHZlY3RvcnMsIHVzZWQgZm9yIGJhbGFuY2VkIGxlbmd0aC10d28gcmVwcmVzZW50YXRpb25cbiAgdmFyIGJhc2lzO1xuICBpZiAoY29uZi5iYXNpcykge1xuICAgIGJhc2lzID0gY29uZi5iYXNpcy5tYXAoZnVuY3Rpb24odmVjKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBhOiBuZXcgQk4odmVjLmEsIDE2KSxcbiAgICAgICAgYjogbmV3IEJOKHZlYy5iLCAxNilcbiAgICAgIH07XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgYmFzaXMgPSB0aGlzLl9nZXRFbmRvQmFzaXMobGFtYmRhKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYmV0YTogYmV0YSxcbiAgICBsYW1iZGE6IGxhbWJkYSxcbiAgICBiYXNpczogYmFzaXNcbiAgfTtcbn07XG5cblNob3J0Q3VydmUucHJvdG90eXBlLl9nZXRFbmRvUm9vdHMgPSBmdW5jdGlvbiBfZ2V0RW5kb1Jvb3RzKG51bSkge1xuICAvLyBGaW5kIHJvb3RzIG9mIGZvciB4XjIgKyB4ICsgMSBpbiBGXG4gIC8vIFJvb3QgPSAoLTEgKy0gU3FydCgtMykpIC8gMlxuICAvL1xuICB2YXIgcmVkID0gbnVtID09PSB0aGlzLnAgPyB0aGlzLnJlZCA6IEJOLm1vbnQobnVtKTtcbiAgdmFyIHRpbnYgPSBuZXcgQk4oMikudG9SZWQocmVkKS5yZWRJbnZtKCk7XG4gIHZhciBudGludiA9IHRpbnYucmVkTmVnKCk7XG5cbiAgdmFyIHMgPSBuZXcgQk4oMykudG9SZWQocmVkKS5yZWROZWcoKS5yZWRTcXJ0KCkucmVkTXVsKHRpbnYpO1xuXG4gIHZhciBsMSA9IG50aW52LnJlZEFkZChzKS5mcm9tUmVkKCk7XG4gIHZhciBsMiA9IG50aW52LnJlZFN1YihzKS5mcm9tUmVkKCk7XG4gIHJldHVybiBbIGwxLCBsMiBdO1xufTtcblxuU2hvcnRDdXJ2ZS5wcm90b3R5cGUuX2dldEVuZG9CYXNpcyA9IGZ1bmN0aW9uIF9nZXRFbmRvQmFzaXMobGFtYmRhKSB7XG4gIC8vIGFwcnhTcXJ0ID49IHNxcnQodGhpcy5uKVxuICB2YXIgYXByeFNxcnQgPSB0aGlzLm4udXNocm4oTWF0aC5mbG9vcih0aGlzLm4uYml0TGVuZ3RoKCkgLyAyKSk7XG5cbiAgLy8gMy43NFxuICAvLyBSdW4gRUdDRCwgdW50aWwgcihMICsgMSkgPCBhcHJ4U3FydFxuICB2YXIgdSA9IGxhbWJkYTtcbiAgdmFyIHYgPSB0aGlzLm4uY2xvbmUoKTtcbiAgdmFyIHgxID0gbmV3IEJOKDEpO1xuICB2YXIgeTEgPSBuZXcgQk4oMCk7XG4gIHZhciB4MiA9IG5ldyBCTigwKTtcbiAgdmFyIHkyID0gbmV3IEJOKDEpO1xuXG4gIC8vIE5PVEU6IGFsbCB2ZWN0b3JzIGFyZSByb290cyBvZjogYSArIGIgKiBsYW1iZGEgPSAwIChtb2QgbilcbiAgdmFyIGEwO1xuICB2YXIgYjA7XG4gIC8vIEZpcnN0IHZlY3RvclxuICB2YXIgYTE7XG4gIHZhciBiMTtcbiAgLy8gU2Vjb25kIHZlY3RvclxuICB2YXIgYTI7XG4gIHZhciBiMjtcblxuICB2YXIgcHJldlI7XG4gIHZhciBpID0gMDtcbiAgdmFyIHI7XG4gIHZhciB4O1xuICB3aGlsZSAodS5jbXBuKDApICE9PSAwKSB7XG4gICAgdmFyIHEgPSB2LmRpdih1KTtcbiAgICByID0gdi5zdWIocS5tdWwodSkpO1xuICAgIHggPSB4Mi5zdWIocS5tdWwoeDEpKTtcbiAgICB2YXIgeSA9IHkyLnN1YihxLm11bCh5MSkpO1xuXG4gICAgaWYgKCFhMSAmJiByLmNtcChhcHJ4U3FydCkgPCAwKSB7XG4gICAgICBhMCA9IHByZXZSLm5lZygpO1xuICAgICAgYjAgPSB4MTtcbiAgICAgIGExID0gci5uZWcoKTtcbiAgICAgIGIxID0geDtcbiAgICB9IGVsc2UgaWYgKGExICYmICsraSA9PT0gMikge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHByZXZSID0gcjtcblxuICAgIHYgPSB1O1xuICAgIHUgPSByO1xuICAgIHgyID0geDE7XG4gICAgeDEgPSB4O1xuICAgIHkyID0geTE7XG4gICAgeTEgPSB5O1xuICB9XG4gIGEyID0gci5uZWcoKTtcbiAgYjIgPSB4O1xuXG4gIHZhciBsZW4xID0gYTEuc3FyKCkuYWRkKGIxLnNxcigpKTtcbiAgdmFyIGxlbjIgPSBhMi5zcXIoKS5hZGQoYjIuc3FyKCkpO1xuICBpZiAobGVuMi5jbXAobGVuMSkgPj0gMCkge1xuICAgIGEyID0gYTA7XG4gICAgYjIgPSBiMDtcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSBzaWduc1xuICBpZiAoYTEubmVnYXRpdmUpIHtcbiAgICBhMSA9IGExLm5lZygpO1xuICAgIGIxID0gYjEubmVnKCk7XG4gIH1cbiAgaWYgKGEyLm5lZ2F0aXZlKSB7XG4gICAgYTIgPSBhMi5uZWcoKTtcbiAgICBiMiA9IGIyLm5lZygpO1xuICB9XG5cbiAgcmV0dXJuIFtcbiAgICB7IGE6IGExLCBiOiBiMSB9LFxuICAgIHsgYTogYTIsIGI6IGIyIH1cbiAgXTtcbn07XG5cblNob3J0Q3VydmUucHJvdG90eXBlLl9lbmRvU3BsaXQgPSBmdW5jdGlvbiBfZW5kb1NwbGl0KGspIHtcbiAgdmFyIGJhc2lzID0gdGhpcy5lbmRvLmJhc2lzO1xuICB2YXIgdjEgPSBiYXNpc1swXTtcbiAgdmFyIHYyID0gYmFzaXNbMV07XG5cbiAgdmFyIGMxID0gdjIuYi5tdWwoaykuZGl2Um91bmQodGhpcy5uKTtcbiAgdmFyIGMyID0gdjEuYi5uZWcoKS5tdWwoaykuZGl2Um91bmQodGhpcy5uKTtcblxuICB2YXIgcDEgPSBjMS5tdWwodjEuYSk7XG4gIHZhciBwMiA9IGMyLm11bCh2Mi5hKTtcbiAgdmFyIHExID0gYzEubXVsKHYxLmIpO1xuICB2YXIgcTIgPSBjMi5tdWwodjIuYik7XG5cbiAgLy8gQ2FsY3VsYXRlIGFuc3dlclxuICB2YXIgazEgPSBrLnN1YihwMSkuc3ViKHAyKTtcbiAgdmFyIGsyID0gcTEuYWRkKHEyKS5uZWcoKTtcbiAgcmV0dXJuIHsgazE6IGsxLCBrMjogazIgfTtcbn07XG5cblNob3J0Q3VydmUucHJvdG90eXBlLnBvaW50RnJvbVggPSBmdW5jdGlvbiBwb2ludEZyb21YKHgsIG9kZCkge1xuICB4ID0gbmV3IEJOKHgsIDE2KTtcbiAgaWYgKCF4LnJlZClcbiAgICB4ID0geC50b1JlZCh0aGlzLnJlZCk7XG5cbiAgdmFyIHkyID0geC5yZWRTcXIoKS5yZWRNdWwoeCkucmVkSUFkZCh4LnJlZE11bCh0aGlzLmEpKS5yZWRJQWRkKHRoaXMuYik7XG4gIHZhciB5ID0geTIucmVkU3FydCgpO1xuICBpZiAoeS5yZWRTcXIoKS5yZWRTdWIoeTIpLmNtcCh0aGlzLnplcm8pICE9PSAwKVxuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBwb2ludCcpO1xuXG4gIC8vIFhYWCBJcyB0aGVyZSBhbnkgd2F5IHRvIHRlbGwgaWYgdGhlIG51bWJlciBpcyBvZGQgd2l0aG91dCBjb252ZXJ0aW5nIGl0XG4gIC8vIHRvIG5vbi1yZWQgZm9ybT9cbiAgdmFyIGlzT2RkID0geS5mcm9tUmVkKCkuaXNPZGQoKTtcbiAgaWYgKG9kZCAmJiAhaXNPZGQgfHwgIW9kZCAmJiBpc09kZClcbiAgICB5ID0geS5yZWROZWcoKTtcblxuICByZXR1cm4gdGhpcy5wb2ludCh4LCB5KTtcbn07XG5cblNob3J0Q3VydmUucHJvdG90eXBlLnZhbGlkYXRlID0gZnVuY3Rpb24gdmFsaWRhdGUocG9pbnQpIHtcbiAgaWYgKHBvaW50LmluZilcbiAgICByZXR1cm4gdHJ1ZTtcblxuICB2YXIgeCA9IHBvaW50Lng7XG4gIHZhciB5ID0gcG9pbnQueTtcblxuICB2YXIgYXggPSB0aGlzLmEucmVkTXVsKHgpO1xuICB2YXIgcmhzID0geC5yZWRTcXIoKS5yZWRNdWwoeCkucmVkSUFkZChheCkucmVkSUFkZCh0aGlzLmIpO1xuICByZXR1cm4geS5yZWRTcXIoKS5yZWRJU3ViKHJocykuY21wbigwKSA9PT0gMDtcbn07XG5cblNob3J0Q3VydmUucHJvdG90eXBlLl9lbmRvV25hZk11bEFkZCA9XG4gICAgZnVuY3Rpb24gX2VuZG9XbmFmTXVsQWRkKHBvaW50cywgY29lZmZzLCBqYWNvYmlhblJlc3VsdCkge1xuICB2YXIgbnBvaW50cyA9IHRoaXMuX2VuZG9XbmFmVDE7XG4gIHZhciBuY29lZmZzID0gdGhpcy5fZW5kb1duYWZUMjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc3BsaXQgPSB0aGlzLl9lbmRvU3BsaXQoY29lZmZzW2ldKTtcbiAgICB2YXIgcCA9IHBvaW50c1tpXTtcbiAgICB2YXIgYmV0YSA9IHAuX2dldEJldGEoKTtcblxuICAgIGlmIChzcGxpdC5rMS5uZWdhdGl2ZSkge1xuICAgICAgc3BsaXQuazEuaW5lZygpO1xuICAgICAgcCA9IHAubmVnKHRydWUpO1xuICAgIH1cbiAgICBpZiAoc3BsaXQuazIubmVnYXRpdmUpIHtcbiAgICAgIHNwbGl0LmsyLmluZWcoKTtcbiAgICAgIGJldGEgPSBiZXRhLm5lZyh0cnVlKTtcbiAgICB9XG5cbiAgICBucG9pbnRzW2kgKiAyXSA9IHA7XG4gICAgbnBvaW50c1tpICogMiArIDFdID0gYmV0YTtcbiAgICBuY29lZmZzW2kgKiAyXSA9IHNwbGl0LmsxO1xuICAgIG5jb2VmZnNbaSAqIDIgKyAxXSA9IHNwbGl0LmsyO1xuICB9XG4gIHZhciByZXMgPSB0aGlzLl93bmFmTXVsQWRkKDEsIG5wb2ludHMsIG5jb2VmZnMsIGkgKiAyLCBqYWNvYmlhblJlc3VsdCk7XG5cbiAgLy8gQ2xlYW4tdXAgcmVmZXJlbmNlcyB0byBwb2ludHMgYW5kIGNvZWZmaWNpZW50c1xuICBmb3IgKHZhciBqID0gMDsgaiA8IGkgKiAyOyBqKyspIHtcbiAgICBucG9pbnRzW2pdID0gbnVsbDtcbiAgICBuY29lZmZzW2pdID0gbnVsbDtcbiAgfVxuICByZXR1cm4gcmVzO1xufTtcblxuZnVuY3Rpb24gUG9pbnQoY3VydmUsIHgsIHksIGlzUmVkKSB7XG4gIEJhc2UuQmFzZVBvaW50LmNhbGwodGhpcywgY3VydmUsICdhZmZpbmUnKTtcbiAgaWYgKHggPT09IG51bGwgJiYgeSA9PT0gbnVsbCkge1xuICAgIHRoaXMueCA9IG51bGw7XG4gICAgdGhpcy55ID0gbnVsbDtcbiAgICB0aGlzLmluZiA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy54ID0gbmV3IEJOKHgsIDE2KTtcbiAgICB0aGlzLnkgPSBuZXcgQk4oeSwgMTYpO1xuICAgIC8vIEZvcmNlIHJlZGdvbWVyeSByZXByZXNlbnRhdGlvbiB3aGVuIGxvYWRpbmcgZnJvbSBKU09OXG4gICAgaWYgKGlzUmVkKSB7XG4gICAgICB0aGlzLnguZm9yY2VSZWQodGhpcy5jdXJ2ZS5yZWQpO1xuICAgICAgdGhpcy55LmZvcmNlUmVkKHRoaXMuY3VydmUucmVkKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLngucmVkKVxuICAgICAgdGhpcy54ID0gdGhpcy54LnRvUmVkKHRoaXMuY3VydmUucmVkKTtcbiAgICBpZiAoIXRoaXMueS5yZWQpXG4gICAgICB0aGlzLnkgPSB0aGlzLnkudG9SZWQodGhpcy5jdXJ2ZS5yZWQpO1xuICAgIHRoaXMuaW5mID0gZmFsc2U7XG4gIH1cbn1cbmluaGVyaXRzKFBvaW50LCBCYXNlLkJhc2VQb2ludCk7XG5cblNob3J0Q3VydmUucHJvdG90eXBlLnBvaW50ID0gZnVuY3Rpb24gcG9pbnQoeCwgeSwgaXNSZWQpIHtcbiAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLCB4LCB5LCBpc1JlZCk7XG59O1xuXG5TaG9ydEN1cnZlLnByb3RvdHlwZS5wb2ludEZyb21KU09OID0gZnVuY3Rpb24gcG9pbnRGcm9tSlNPTihvYmosIHJlZCkge1xuICByZXR1cm4gUG9pbnQuZnJvbUpTT04odGhpcywgb2JqLCByZWQpO1xufTtcblxuUG9pbnQucHJvdG90eXBlLl9nZXRCZXRhID0gZnVuY3Rpb24gX2dldEJldGEoKSB7XG4gIGlmICghdGhpcy5jdXJ2ZS5lbmRvKVxuICAgIHJldHVybjtcblxuICB2YXIgcHJlID0gdGhpcy5wcmVjb21wdXRlZDtcbiAgaWYgKHByZSAmJiBwcmUuYmV0YSlcbiAgICByZXR1cm4gcHJlLmJldGE7XG5cbiAgdmFyIGJldGEgPSB0aGlzLmN1cnZlLnBvaW50KHRoaXMueC5yZWRNdWwodGhpcy5jdXJ2ZS5lbmRvLmJldGEpLCB0aGlzLnkpO1xuICBpZiAocHJlKSB7XG4gICAgdmFyIGN1cnZlID0gdGhpcy5jdXJ2ZTtcbiAgICB2YXIgZW5kb011bCA9IGZ1bmN0aW9uKHApIHtcbiAgICAgIHJldHVybiBjdXJ2ZS5wb2ludChwLngucmVkTXVsKGN1cnZlLmVuZG8uYmV0YSksIHAueSk7XG4gICAgfTtcbiAgICBwcmUuYmV0YSA9IGJldGE7XG4gICAgYmV0YS5wcmVjb21wdXRlZCA9IHtcbiAgICAgIGJldGE6IG51bGwsXG4gICAgICBuYWY6IHByZS5uYWYgJiYge1xuICAgICAgICB3bmQ6IHByZS5uYWYud25kLFxuICAgICAgICBwb2ludHM6IHByZS5uYWYucG9pbnRzLm1hcChlbmRvTXVsKVxuICAgICAgfSxcbiAgICAgIGRvdWJsZXM6IHByZS5kb3VibGVzICYmIHtcbiAgICAgICAgc3RlcDogcHJlLmRvdWJsZXMuc3RlcCxcbiAgICAgICAgcG9pbnRzOiBwcmUuZG91Ymxlcy5wb2ludHMubWFwKGVuZG9NdWwpXG4gICAgICB9XG4gICAgfTtcbiAgfVxuICByZXR1cm4gYmV0YTtcbn07XG5cblBvaW50LnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gIGlmICghdGhpcy5wcmVjb21wdXRlZClcbiAgICByZXR1cm4gWyB0aGlzLngsIHRoaXMueSBdO1xuXG4gIHJldHVybiBbIHRoaXMueCwgdGhpcy55LCB0aGlzLnByZWNvbXB1dGVkICYmIHtcbiAgICBkb3VibGVzOiB0aGlzLnByZWNvbXB1dGVkLmRvdWJsZXMgJiYge1xuICAgICAgc3RlcDogdGhpcy5wcmVjb21wdXRlZC5kb3VibGVzLnN0ZXAsXG4gICAgICBwb2ludHM6IHRoaXMucHJlY29tcHV0ZWQuZG91Ymxlcy5wb2ludHMuc2xpY2UoMSlcbiAgICB9LFxuICAgIG5hZjogdGhpcy5wcmVjb21wdXRlZC5uYWYgJiYge1xuICAgICAgd25kOiB0aGlzLnByZWNvbXB1dGVkLm5hZi53bmQsXG4gICAgICBwb2ludHM6IHRoaXMucHJlY29tcHV0ZWQubmFmLnBvaW50cy5zbGljZSgxKVxuICAgIH1cbiAgfSBdO1xufTtcblxuUG9pbnQuZnJvbUpTT04gPSBmdW5jdGlvbiBmcm9tSlNPTihjdXJ2ZSwgb2JqLCByZWQpIHtcbiAgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnKVxuICAgIG9iaiA9IEpTT04ucGFyc2Uob2JqKTtcbiAgdmFyIHJlcyA9IGN1cnZlLnBvaW50KG9ialswXSwgb2JqWzFdLCByZWQpO1xuICBpZiAoIW9ialsyXSlcbiAgICByZXR1cm4gcmVzO1xuXG4gIGZ1bmN0aW9uIG9iajJwb2ludChvYmopIHtcbiAgICByZXR1cm4gY3VydmUucG9pbnQob2JqWzBdLCBvYmpbMV0sIHJlZCk7XG4gIH1cblxuICB2YXIgcHJlID0gb2JqWzJdO1xuICByZXMucHJlY29tcHV0ZWQgPSB7XG4gICAgYmV0YTogbnVsbCxcbiAgICBkb3VibGVzOiBwcmUuZG91YmxlcyAmJiB7XG4gICAgICBzdGVwOiBwcmUuZG91Ymxlcy5zdGVwLFxuICAgICAgcG9pbnRzOiBbIHJlcyBdLmNvbmNhdChwcmUuZG91Ymxlcy5wb2ludHMubWFwKG9iajJwb2ludCkpXG4gICAgfSxcbiAgICBuYWY6IHByZS5uYWYgJiYge1xuICAgICAgd25kOiBwcmUubmFmLnduZCxcbiAgICAgIHBvaW50czogWyByZXMgXS5jb25jYXQocHJlLm5hZi5wb2ludHMubWFwKG9iajJwb2ludCkpXG4gICAgfVxuICB9O1xuICByZXR1cm4gcmVzO1xufTtcblxuUG9pbnQucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiBpbnNwZWN0KCkge1xuICBpZiAodGhpcy5pc0luZmluaXR5KCkpXG4gICAgcmV0dXJuICc8RUMgUG9pbnQgSW5maW5pdHk+JztcbiAgcmV0dXJuICc8RUMgUG9pbnQgeDogJyArIHRoaXMueC5mcm9tUmVkKCkudG9TdHJpbmcoMTYsIDIpICtcbiAgICAgICcgeTogJyArIHRoaXMueS5mcm9tUmVkKCkudG9TdHJpbmcoMTYsIDIpICsgJz4nO1xufTtcblxuUG9pbnQucHJvdG90eXBlLmlzSW5maW5pdHkgPSBmdW5jdGlvbiBpc0luZmluaXR5KCkge1xuICByZXR1cm4gdGhpcy5pbmY7XG59O1xuXG5Qb2ludC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gYWRkKHApIHtcbiAgLy8gTyArIFAgPSBQXG4gIGlmICh0aGlzLmluZilcbiAgICByZXR1cm4gcDtcblxuICAvLyBQICsgTyA9IFBcbiAgaWYgKHAuaW5mKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIFAgKyBQID0gMlBcbiAgaWYgKHRoaXMuZXEocCkpXG4gICAgcmV0dXJuIHRoaXMuZGJsKCk7XG5cbiAgLy8gUCArICgtUCkgPSBPXG4gIGlmICh0aGlzLm5lZygpLmVxKHApKVxuICAgIHJldHVybiB0aGlzLmN1cnZlLnBvaW50KG51bGwsIG51bGwpO1xuXG4gIC8vIFAgKyBRID0gT1xuICBpZiAodGhpcy54LmNtcChwLngpID09PSAwKVxuICAgIHJldHVybiB0aGlzLmN1cnZlLnBvaW50KG51bGwsIG51bGwpO1xuXG4gIHZhciBjID0gdGhpcy55LnJlZFN1YihwLnkpO1xuICBpZiAoYy5jbXBuKDApICE9PSAwKVxuICAgIGMgPSBjLnJlZE11bCh0aGlzLngucmVkU3ViKHAueCkucmVkSW52bSgpKTtcbiAgdmFyIG54ID0gYy5yZWRTcXIoKS5yZWRJU3ViKHRoaXMueCkucmVkSVN1YihwLngpO1xuICB2YXIgbnkgPSBjLnJlZE11bCh0aGlzLngucmVkU3ViKG54KSkucmVkSVN1Yih0aGlzLnkpO1xuICByZXR1cm4gdGhpcy5jdXJ2ZS5wb2ludChueCwgbnkpO1xufTtcblxuUG9pbnQucHJvdG90eXBlLmRibCA9IGZ1bmN0aW9uIGRibCgpIHtcbiAgaWYgKHRoaXMuaW5mKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIDJQID0gT1xuICB2YXIgeXMxID0gdGhpcy55LnJlZEFkZCh0aGlzLnkpO1xuICBpZiAoeXMxLmNtcG4oMCkgPT09IDApXG4gICAgcmV0dXJuIHRoaXMuY3VydmUucG9pbnQobnVsbCwgbnVsbCk7XG5cbiAgdmFyIGEgPSB0aGlzLmN1cnZlLmE7XG5cbiAgdmFyIHgyID0gdGhpcy54LnJlZFNxcigpO1xuICB2YXIgZHlpbnYgPSB5czEucmVkSW52bSgpO1xuICB2YXIgYyA9IHgyLnJlZEFkZCh4MikucmVkSUFkZCh4MikucmVkSUFkZChhKS5yZWRNdWwoZHlpbnYpO1xuXG4gIHZhciBueCA9IGMucmVkU3FyKCkucmVkSVN1Yih0aGlzLngucmVkQWRkKHRoaXMueCkpO1xuICB2YXIgbnkgPSBjLnJlZE11bCh0aGlzLngucmVkU3ViKG54KSkucmVkSVN1Yih0aGlzLnkpO1xuICByZXR1cm4gdGhpcy5jdXJ2ZS5wb2ludChueCwgbnkpO1xufTtcblxuUG9pbnQucHJvdG90eXBlLmdldFggPSBmdW5jdGlvbiBnZXRYKCkge1xuICByZXR1cm4gdGhpcy54LmZyb21SZWQoKTtcbn07XG5cblBvaW50LnByb3RvdHlwZS5nZXRZID0gZnVuY3Rpb24gZ2V0WSgpIHtcbiAgcmV0dXJuIHRoaXMueS5mcm9tUmVkKCk7XG59O1xuXG5Qb2ludC5wcm90b3R5cGUubXVsID0gZnVuY3Rpb24gbXVsKGspIHtcbiAgayA9IG5ldyBCTihrLCAxNik7XG4gIGlmICh0aGlzLmlzSW5maW5pdHkoKSlcbiAgICByZXR1cm4gdGhpcztcbiAgZWxzZSBpZiAodGhpcy5faGFzRG91YmxlcyhrKSlcbiAgICByZXR1cm4gdGhpcy5jdXJ2ZS5fZml4ZWROYWZNdWwodGhpcywgayk7XG4gIGVsc2UgaWYgKHRoaXMuY3VydmUuZW5kbylcbiAgICByZXR1cm4gdGhpcy5jdXJ2ZS5fZW5kb1duYWZNdWxBZGQoWyB0aGlzIF0sIFsgayBdKTtcbiAgZWxzZVxuICAgIHJldHVybiB0aGlzLmN1cnZlLl93bmFmTXVsKHRoaXMsIGspO1xufTtcblxuUG9pbnQucHJvdG90eXBlLm11bEFkZCA9IGZ1bmN0aW9uIG11bEFkZChrMSwgcDIsIGsyKSB7XG4gIHZhciBwb2ludHMgPSBbIHRoaXMsIHAyIF07XG4gIHZhciBjb2VmZnMgPSBbIGsxLCBrMiBdO1xuICBpZiAodGhpcy5jdXJ2ZS5lbmRvKVxuICAgIHJldHVybiB0aGlzLmN1cnZlLl9lbmRvV25hZk11bEFkZChwb2ludHMsIGNvZWZmcyk7XG4gIGVsc2VcbiAgICByZXR1cm4gdGhpcy5jdXJ2ZS5fd25hZk11bEFkZCgxLCBwb2ludHMsIGNvZWZmcywgMik7XG59O1xuXG5Qb2ludC5wcm90b3R5cGUuam11bEFkZCA9IGZ1bmN0aW9uIGptdWxBZGQoazEsIHAyLCBrMikge1xuICB2YXIgcG9pbnRzID0gWyB0aGlzLCBwMiBdO1xuICB2YXIgY29lZmZzID0gWyBrMSwgazIgXTtcbiAgaWYgKHRoaXMuY3VydmUuZW5kbylcbiAgICByZXR1cm4gdGhpcy5jdXJ2ZS5fZW5kb1duYWZNdWxBZGQocG9pbnRzLCBjb2VmZnMsIHRydWUpO1xuICBlbHNlXG4gICAgcmV0dXJuIHRoaXMuY3VydmUuX3duYWZNdWxBZGQoMSwgcG9pbnRzLCBjb2VmZnMsIDIsIHRydWUpO1xufTtcblxuUG9pbnQucHJvdG90eXBlLmVxID0gZnVuY3Rpb24gZXEocCkge1xuICByZXR1cm4gdGhpcyA9PT0gcCB8fFxuICAgICAgICAgdGhpcy5pbmYgPT09IHAuaW5mICYmXG4gICAgICAgICAgICAgKHRoaXMuaW5mIHx8IHRoaXMueC5jbXAocC54KSA9PT0gMCAmJiB0aGlzLnkuY21wKHAueSkgPT09IDApO1xufTtcblxuUG9pbnQucHJvdG90eXBlLm5lZyA9IGZ1bmN0aW9uIG5lZyhfcHJlY29tcHV0ZSkge1xuICBpZiAodGhpcy5pbmYpXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgdmFyIHJlcyA9IHRoaXMuY3VydmUucG9pbnQodGhpcy54LCB0aGlzLnkucmVkTmVnKCkpO1xuICBpZiAoX3ByZWNvbXB1dGUgJiYgdGhpcy5wcmVjb21wdXRlZCkge1xuICAgIHZhciBwcmUgPSB0aGlzLnByZWNvbXB1dGVkO1xuICAgIHZhciBuZWdhdGUgPSBmdW5jdGlvbihwKSB7XG4gICAgICByZXR1cm4gcC5uZWcoKTtcbiAgICB9O1xuICAgIHJlcy5wcmVjb21wdXRlZCA9IHtcbiAgICAgIG5hZjogcHJlLm5hZiAmJiB7XG4gICAgICAgIHduZDogcHJlLm5hZi53bmQsXG4gICAgICAgIHBvaW50czogcHJlLm5hZi5wb2ludHMubWFwKG5lZ2F0ZSlcbiAgICAgIH0sXG4gICAgICBkb3VibGVzOiBwcmUuZG91YmxlcyAmJiB7XG4gICAgICAgIHN0ZXA6IHByZS5kb3VibGVzLnN0ZXAsXG4gICAgICAgIHBvaW50czogcHJlLmRvdWJsZXMucG9pbnRzLm1hcChuZWdhdGUpXG4gICAgICB9XG4gICAgfTtcbiAgfVxuICByZXR1cm4gcmVzO1xufTtcblxuUG9pbnQucHJvdG90eXBlLnRvSiA9IGZ1bmN0aW9uIHRvSigpIHtcbiAgaWYgKHRoaXMuaW5mKVxuICAgIHJldHVybiB0aGlzLmN1cnZlLmpwb2ludChudWxsLCBudWxsLCBudWxsKTtcblxuICB2YXIgcmVzID0gdGhpcy5jdXJ2ZS5qcG9pbnQodGhpcy54LCB0aGlzLnksIHRoaXMuY3VydmUub25lKTtcbiAgcmV0dXJuIHJlcztcbn07XG5cbmZ1bmN0aW9uIEpQb2ludChjdXJ2ZSwgeCwgeSwgeikge1xuICBCYXNlLkJhc2VQb2ludC5jYWxsKHRoaXMsIGN1cnZlLCAnamFjb2JpYW4nKTtcbiAgaWYgKHggPT09IG51bGwgJiYgeSA9PT0gbnVsbCAmJiB6ID09PSBudWxsKSB7XG4gICAgdGhpcy54ID0gdGhpcy5jdXJ2ZS5vbmU7XG4gICAgdGhpcy55ID0gdGhpcy5jdXJ2ZS5vbmU7XG4gICAgdGhpcy56ID0gbmV3IEJOKDApO1xuICB9IGVsc2Uge1xuICAgIHRoaXMueCA9IG5ldyBCTih4LCAxNik7XG4gICAgdGhpcy55ID0gbmV3IEJOKHksIDE2KTtcbiAgICB0aGlzLnogPSBuZXcgQk4oeiwgMTYpO1xuICB9XG4gIGlmICghdGhpcy54LnJlZClcbiAgICB0aGlzLnggPSB0aGlzLngudG9SZWQodGhpcy5jdXJ2ZS5yZWQpO1xuICBpZiAoIXRoaXMueS5yZWQpXG4gICAgdGhpcy55ID0gdGhpcy55LnRvUmVkKHRoaXMuY3VydmUucmVkKTtcbiAgaWYgKCF0aGlzLnoucmVkKVxuICAgIHRoaXMueiA9IHRoaXMuei50b1JlZCh0aGlzLmN1cnZlLnJlZCk7XG5cbiAgdGhpcy56T25lID0gdGhpcy56ID09PSB0aGlzLmN1cnZlLm9uZTtcbn1cbmluaGVyaXRzKEpQb2ludCwgQmFzZS5CYXNlUG9pbnQpO1xuXG5TaG9ydEN1cnZlLnByb3RvdHlwZS5qcG9pbnQgPSBmdW5jdGlvbiBqcG9pbnQoeCwgeSwgeikge1xuICByZXR1cm4gbmV3IEpQb2ludCh0aGlzLCB4LCB5LCB6KTtcbn07XG5cbkpQb2ludC5wcm90b3R5cGUudG9QID0gZnVuY3Rpb24gdG9QKCkge1xuICBpZiAodGhpcy5pc0luZmluaXR5KCkpXG4gICAgcmV0dXJuIHRoaXMuY3VydmUucG9pbnQobnVsbCwgbnVsbCk7XG5cbiAgdmFyIHppbnYgPSB0aGlzLnoucmVkSW52bSgpO1xuICB2YXIgemludjIgPSB6aW52LnJlZFNxcigpO1xuICB2YXIgYXggPSB0aGlzLngucmVkTXVsKHppbnYyKTtcbiAgdmFyIGF5ID0gdGhpcy55LnJlZE11bCh6aW52MikucmVkTXVsKHppbnYpO1xuXG4gIHJldHVybiB0aGlzLmN1cnZlLnBvaW50KGF4LCBheSk7XG59O1xuXG5KUG9pbnQucHJvdG90eXBlLm5lZyA9IGZ1bmN0aW9uIG5lZygpIHtcbiAgcmV0dXJuIHRoaXMuY3VydmUuanBvaW50KHRoaXMueCwgdGhpcy55LnJlZE5lZygpLCB0aGlzLnopO1xufTtcblxuSlBvaW50LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiBhZGQocCkge1xuICAvLyBPICsgUCA9IFBcbiAgaWYgKHRoaXMuaXNJbmZpbml0eSgpKVxuICAgIHJldHVybiBwO1xuXG4gIC8vIFAgKyBPID0gUFxuICBpZiAocC5pc0luZmluaXR5KCkpXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgLy8gMTJNICsgNFMgKyA3QVxuICB2YXIgcHoyID0gcC56LnJlZFNxcigpO1xuICB2YXIgejIgPSB0aGlzLnoucmVkU3FyKCk7XG4gIHZhciB1MSA9IHRoaXMueC5yZWRNdWwocHoyKTtcbiAgdmFyIHUyID0gcC54LnJlZE11bCh6Mik7XG4gIHZhciBzMSA9IHRoaXMueS5yZWRNdWwocHoyLnJlZE11bChwLnopKTtcbiAgdmFyIHMyID0gcC55LnJlZE11bCh6Mi5yZWRNdWwodGhpcy56KSk7XG5cbiAgdmFyIGggPSB1MS5yZWRTdWIodTIpO1xuICB2YXIgciA9IHMxLnJlZFN1YihzMik7XG4gIGlmIChoLmNtcG4oMCkgPT09IDApIHtcbiAgICBpZiAoci5jbXBuKDApICE9PSAwKVxuICAgICAgcmV0dXJuIHRoaXMuY3VydmUuanBvaW50KG51bGwsIG51bGwsIG51bGwpO1xuICAgIGVsc2VcbiAgICAgIHJldHVybiB0aGlzLmRibCgpO1xuICB9XG5cbiAgdmFyIGgyID0gaC5yZWRTcXIoKTtcbiAgdmFyIGgzID0gaDIucmVkTXVsKGgpO1xuICB2YXIgdiA9IHUxLnJlZE11bChoMik7XG5cbiAgdmFyIG54ID0gci5yZWRTcXIoKS5yZWRJQWRkKGgzKS5yZWRJU3ViKHYpLnJlZElTdWIodik7XG4gIHZhciBueSA9IHIucmVkTXVsKHYucmVkSVN1YihueCkpLnJlZElTdWIoczEucmVkTXVsKGgzKSk7XG4gIHZhciBueiA9IHRoaXMuei5yZWRNdWwocC56KS5yZWRNdWwoaCk7XG5cbiAgcmV0dXJuIHRoaXMuY3VydmUuanBvaW50KG54LCBueSwgbnopO1xufTtcblxuSlBvaW50LnByb3RvdHlwZS5taXhlZEFkZCA9IGZ1bmN0aW9uIG1peGVkQWRkKHApIHtcbiAgLy8gTyArIFAgPSBQXG4gIGlmICh0aGlzLmlzSW5maW5pdHkoKSlcbiAgICByZXR1cm4gcC50b0ooKTtcblxuICAvLyBQICsgTyA9IFBcbiAgaWYgKHAuaXNJbmZpbml0eSgpKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIDhNICsgM1MgKyA3QVxuICB2YXIgejIgPSB0aGlzLnoucmVkU3FyKCk7XG4gIHZhciB1MSA9IHRoaXMueDtcbiAgdmFyIHUyID0gcC54LnJlZE11bCh6Mik7XG4gIHZhciBzMSA9IHRoaXMueTtcbiAgdmFyIHMyID0gcC55LnJlZE11bCh6MikucmVkTXVsKHRoaXMueik7XG5cbiAgdmFyIGggPSB1MS5yZWRTdWIodTIpO1xuICB2YXIgciA9IHMxLnJlZFN1YihzMik7XG4gIGlmIChoLmNtcG4oMCkgPT09IDApIHtcbiAgICBpZiAoci5jbXBuKDApICE9PSAwKVxuICAgICAgcmV0dXJuIHRoaXMuY3VydmUuanBvaW50KG51bGwsIG51bGwsIG51bGwpO1xuICAgIGVsc2VcbiAgICAgIHJldHVybiB0aGlzLmRibCgpO1xuICB9XG5cbiAgdmFyIGgyID0gaC5yZWRTcXIoKTtcbiAgdmFyIGgzID0gaDIucmVkTXVsKGgpO1xuICB2YXIgdiA9IHUxLnJlZE11bChoMik7XG5cbiAgdmFyIG54ID0gci5yZWRTcXIoKS5yZWRJQWRkKGgzKS5yZWRJU3ViKHYpLnJlZElTdWIodik7XG4gIHZhciBueSA9IHIucmVkTXVsKHYucmVkSVN1YihueCkpLnJlZElTdWIoczEucmVkTXVsKGgzKSk7XG4gIHZhciBueiA9IHRoaXMuei5yZWRNdWwoaCk7XG5cbiAgcmV0dXJuIHRoaXMuY3VydmUuanBvaW50KG54LCBueSwgbnopO1xufTtcblxuSlBvaW50LnByb3RvdHlwZS5kYmxwID0gZnVuY3Rpb24gZGJscChwb3cpIHtcbiAgaWYgKHBvdyA9PT0gMClcbiAgICByZXR1cm4gdGhpcztcbiAgaWYgKHRoaXMuaXNJbmZpbml0eSgpKVxuICAgIHJldHVybiB0aGlzO1xuICBpZiAoIXBvdylcbiAgICByZXR1cm4gdGhpcy5kYmwoKTtcblxuICBpZiAodGhpcy5jdXJ2ZS56ZXJvQSB8fCB0aGlzLmN1cnZlLnRocmVlQSkge1xuICAgIHZhciByID0gdGhpcztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvdzsgaSsrKVxuICAgICAgciA9IHIuZGJsKCk7XG4gICAgcmV0dXJuIHI7XG4gIH1cblxuICAvLyAxTSArIDJTICsgMUEgKyBOICogKDRTICsgNU0gKyA4QSlcbiAgLy8gTiA9IDEgPT4gNk0gKyA2UyArIDlBXG4gIHZhciBhID0gdGhpcy5jdXJ2ZS5hO1xuICB2YXIgdGludiA9IHRoaXMuY3VydmUudGludjtcblxuICB2YXIganggPSB0aGlzLng7XG4gIHZhciBqeSA9IHRoaXMueTtcbiAgdmFyIGp6ID0gdGhpcy56O1xuICB2YXIgano0ID0ganoucmVkU3FyKCkucmVkU3FyKCk7XG5cbiAgLy8gUmV1c2UgcmVzdWx0c1xuICB2YXIganlkID0gankucmVkQWRkKGp5KTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb3c7IGkrKykge1xuICAgIHZhciBqeDIgPSBqeC5yZWRTcXIoKTtcbiAgICB2YXIganlkMiA9IGp5ZC5yZWRTcXIoKTtcbiAgICB2YXIganlkNCA9IGp5ZDIucmVkU3FyKCk7XG4gICAgdmFyIGMgPSBqeDIucmVkQWRkKGp4MikucmVkSUFkZChqeDIpLnJlZElBZGQoYS5yZWRNdWwoano0KSk7XG5cbiAgICB2YXIgdDEgPSBqeC5yZWRNdWwoanlkMik7XG4gICAgdmFyIG54ID0gYy5yZWRTcXIoKS5yZWRJU3ViKHQxLnJlZEFkZCh0MSkpO1xuICAgIHZhciB0MiA9IHQxLnJlZElTdWIobngpO1xuICAgIHZhciBkbnkgPSBjLnJlZE11bCh0Mik7XG4gICAgZG55ID0gZG55LnJlZElBZGQoZG55KS5yZWRJU3ViKGp5ZDQpO1xuICAgIHZhciBueiA9IGp5ZC5yZWRNdWwoanopO1xuICAgIGlmIChpICsgMSA8IHBvdylcbiAgICAgIGp6NCA9IGp6NC5yZWRNdWwoanlkNCk7XG5cbiAgICBqeCA9IG54O1xuICAgIGp6ID0gbno7XG4gICAganlkID0gZG55O1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuY3VydmUuanBvaW50KGp4LCBqeWQucmVkTXVsKHRpbnYpLCBqeik7XG59O1xuXG5KUG9pbnQucHJvdG90eXBlLmRibCA9IGZ1bmN0aW9uIGRibCgpIHtcbiAgaWYgKHRoaXMuaXNJbmZpbml0eSgpKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIGlmICh0aGlzLmN1cnZlLnplcm9BKVxuICAgIHJldHVybiB0aGlzLl96ZXJvRGJsKCk7XG4gIGVsc2UgaWYgKHRoaXMuY3VydmUudGhyZWVBKVxuICAgIHJldHVybiB0aGlzLl90aHJlZURibCgpO1xuICBlbHNlXG4gICAgcmV0dXJuIHRoaXMuX2RibCgpO1xufTtcblxuSlBvaW50LnByb3RvdHlwZS5femVyb0RibCA9IGZ1bmN0aW9uIF96ZXJvRGJsKCkge1xuICB2YXIgbng7XG4gIHZhciBueTtcbiAgdmFyIG56O1xuICAvLyBaID0gMVxuICBpZiAodGhpcy56T25lKSB7XG4gICAgLy8gaHlwZXJlbGxpcHRpYy5vcmcvRUZEL2cxcC9hdXRvLXNob3J0dy1qYWNvYmlhbi0wLmh0bWxcbiAgICAvLyAgICAgI2RvdWJsaW5nLW1kYmwtMjAwNy1ibFxuICAgIC8vIDFNICsgNVMgKyAxNEFcblxuICAgIC8vIFhYID0gWDFeMlxuICAgIHZhciB4eCA9IHRoaXMueC5yZWRTcXIoKTtcbiAgICAvLyBZWSA9IFkxXjJcbiAgICB2YXIgeXkgPSB0aGlzLnkucmVkU3FyKCk7XG4gICAgLy8gWVlZWSA9IFlZXjJcbiAgICB2YXIgeXl5eSA9IHl5LnJlZFNxcigpO1xuICAgIC8vIFMgPSAyICogKChYMSArIFlZKV4yIC0gWFggLSBZWVlZKVxuICAgIHZhciBzID0gdGhpcy54LnJlZEFkZCh5eSkucmVkU3FyKCkucmVkSVN1Yih4eCkucmVkSVN1Yih5eXl5KTtcbiAgICBzID0gcy5yZWRJQWRkKHMpO1xuICAgIC8vIE0gPSAzICogWFggKyBhOyBhID0gMFxuICAgIHZhciBtID0geHgucmVkQWRkKHh4KS5yZWRJQWRkKHh4KTtcbiAgICAvLyBUID0gTSBeIDIgLSAyKlNcbiAgICB2YXIgdCA9IG0ucmVkU3FyKCkucmVkSVN1YihzKS5yZWRJU3ViKHMpO1xuXG4gICAgLy8gOCAqIFlZWVlcbiAgICB2YXIgeXl5eTggPSB5eXl5LnJlZElBZGQoeXl5eSk7XG4gICAgeXl5eTggPSB5eXl5OC5yZWRJQWRkKHl5eXk4KTtcbiAgICB5eXl5OCA9IHl5eXk4LnJlZElBZGQoeXl5eTgpO1xuXG4gICAgLy8gWDMgPSBUXG4gICAgbnggPSB0O1xuICAgIC8vIFkzID0gTSAqIChTIC0gVCkgLSA4ICogWVlZWVxuICAgIG55ID0gbS5yZWRNdWwocy5yZWRJU3ViKHQpKS5yZWRJU3ViKHl5eXk4KTtcbiAgICAvLyBaMyA9IDIqWTFcbiAgICBueiA9IHRoaXMueS5yZWRBZGQodGhpcy55KTtcbiAgfSBlbHNlIHtcbiAgICAvLyBoeXBlcmVsbGlwdGljLm9yZy9FRkQvZzFwL2F1dG8tc2hvcnR3LWphY29iaWFuLTAuaHRtbFxuICAgIC8vICAgICAjZG91YmxpbmctZGJsLTIwMDktbFxuICAgIC8vIDJNICsgNVMgKyAxM0FcblxuICAgIC8vIEEgPSBYMV4yXG4gICAgdmFyIGEgPSB0aGlzLngucmVkU3FyKCk7XG4gICAgLy8gQiA9IFkxXjJcbiAgICB2YXIgYiA9IHRoaXMueS5yZWRTcXIoKTtcbiAgICAvLyBDID0gQl4yXG4gICAgdmFyIGMgPSBiLnJlZFNxcigpO1xuICAgIC8vIEQgPSAyICogKChYMSArIEIpXjIgLSBBIC0gQylcbiAgICB2YXIgZCA9IHRoaXMueC5yZWRBZGQoYikucmVkU3FyKCkucmVkSVN1YihhKS5yZWRJU3ViKGMpO1xuICAgIGQgPSBkLnJlZElBZGQoZCk7XG4gICAgLy8gRSA9IDMgKiBBXG4gICAgdmFyIGUgPSBhLnJlZEFkZChhKS5yZWRJQWRkKGEpO1xuICAgIC8vIEYgPSBFXjJcbiAgICB2YXIgZiA9IGUucmVkU3FyKCk7XG5cbiAgICAvLyA4ICogQ1xuICAgIHZhciBjOCA9IGMucmVkSUFkZChjKTtcbiAgICBjOCA9IGM4LnJlZElBZGQoYzgpO1xuICAgIGM4ID0gYzgucmVkSUFkZChjOCk7XG5cbiAgICAvLyBYMyA9IEYgLSAyICogRFxuICAgIG54ID0gZi5yZWRJU3ViKGQpLnJlZElTdWIoZCk7XG4gICAgLy8gWTMgPSBFICogKEQgLSBYMykgLSA4ICogQ1xuICAgIG55ID0gZS5yZWRNdWwoZC5yZWRJU3ViKG54KSkucmVkSVN1YihjOCk7XG4gICAgLy8gWjMgPSAyICogWTEgKiBaMVxuICAgIG56ID0gdGhpcy55LnJlZE11bCh0aGlzLnopO1xuICAgIG56ID0gbnoucmVkSUFkZChueik7XG4gIH1cblxuICByZXR1cm4gdGhpcy5jdXJ2ZS5qcG9pbnQobngsIG55LCBueik7XG59O1xuXG5KUG9pbnQucHJvdG90eXBlLl90aHJlZURibCA9IGZ1bmN0aW9uIF90aHJlZURibCgpIHtcbiAgdmFyIG54O1xuICB2YXIgbnk7XG4gIHZhciBuejtcbiAgLy8gWiA9IDFcbiAgaWYgKHRoaXMuek9uZSkge1xuICAgIC8vIGh5cGVyZWxsaXB0aWMub3JnL0VGRC9nMXAvYXV0by1zaG9ydHctamFjb2JpYW4tMy5odG1sXG4gICAgLy8gICAgICNkb3VibGluZy1tZGJsLTIwMDctYmxcbiAgICAvLyAxTSArIDVTICsgMTVBXG5cbiAgICAvLyBYWCA9IFgxXjJcbiAgICB2YXIgeHggPSB0aGlzLngucmVkU3FyKCk7XG4gICAgLy8gWVkgPSBZMV4yXG4gICAgdmFyIHl5ID0gdGhpcy55LnJlZFNxcigpO1xuICAgIC8vIFlZWVkgPSBZWV4yXG4gICAgdmFyIHl5eXkgPSB5eS5yZWRTcXIoKTtcbiAgICAvLyBTID0gMiAqICgoWDEgKyBZWSleMiAtIFhYIC0gWVlZWSlcbiAgICB2YXIgcyA9IHRoaXMueC5yZWRBZGQoeXkpLnJlZFNxcigpLnJlZElTdWIoeHgpLnJlZElTdWIoeXl5eSk7XG4gICAgcyA9IHMucmVkSUFkZChzKTtcbiAgICAvLyBNID0gMyAqIFhYICsgYVxuICAgIHZhciBtID0geHgucmVkQWRkKHh4KS5yZWRJQWRkKHh4KS5yZWRJQWRkKHRoaXMuY3VydmUuYSk7XG4gICAgLy8gVCA9IE1eMiAtIDIgKiBTXG4gICAgdmFyIHQgPSBtLnJlZFNxcigpLnJlZElTdWIocykucmVkSVN1YihzKTtcbiAgICAvLyBYMyA9IFRcbiAgICBueCA9IHQ7XG4gICAgLy8gWTMgPSBNICogKFMgLSBUKSAtIDggKiBZWVlZXG4gICAgdmFyIHl5eXk4ID0geXl5eS5yZWRJQWRkKHl5eXkpO1xuICAgIHl5eXk4ID0geXl5eTgucmVkSUFkZCh5eXl5OCk7XG4gICAgeXl5eTggPSB5eXl5OC5yZWRJQWRkKHl5eXk4KTtcbiAgICBueSA9IG0ucmVkTXVsKHMucmVkSVN1Yih0KSkucmVkSVN1Yih5eXl5OCk7XG4gICAgLy8gWjMgPSAyICogWTFcbiAgICBueiA9IHRoaXMueS5yZWRBZGQodGhpcy55KTtcbiAgfSBlbHNlIHtcbiAgICAvLyBoeXBlcmVsbGlwdGljLm9yZy9FRkQvZzFwL2F1dG8tc2hvcnR3LWphY29iaWFuLTMuaHRtbCNkb3VibGluZy1kYmwtMjAwMS1iXG4gICAgLy8gM00gKyA1U1xuXG4gICAgLy8gZGVsdGEgPSBaMV4yXG4gICAgdmFyIGRlbHRhID0gdGhpcy56LnJlZFNxcigpO1xuICAgIC8vIGdhbW1hID0gWTFeMlxuICAgIHZhciBnYW1tYSA9IHRoaXMueS5yZWRTcXIoKTtcbiAgICAvLyBiZXRhID0gWDEgKiBnYW1tYVxuICAgIHZhciBiZXRhID0gdGhpcy54LnJlZE11bChnYW1tYSk7XG4gICAgLy8gYWxwaGEgPSAzICogKFgxIC0gZGVsdGEpICogKFgxICsgZGVsdGEpXG4gICAgdmFyIGFscGhhID0gdGhpcy54LnJlZFN1YihkZWx0YSkucmVkTXVsKHRoaXMueC5yZWRBZGQoZGVsdGEpKTtcbiAgICBhbHBoYSA9IGFscGhhLnJlZEFkZChhbHBoYSkucmVkSUFkZChhbHBoYSk7XG4gICAgLy8gWDMgPSBhbHBoYV4yIC0gOCAqIGJldGFcbiAgICB2YXIgYmV0YTQgPSBiZXRhLnJlZElBZGQoYmV0YSk7XG4gICAgYmV0YTQgPSBiZXRhNC5yZWRJQWRkKGJldGE0KTtcbiAgICB2YXIgYmV0YTggPSBiZXRhNC5yZWRBZGQoYmV0YTQpO1xuICAgIG54ID0gYWxwaGEucmVkU3FyKCkucmVkSVN1YihiZXRhOCk7XG4gICAgLy8gWjMgPSAoWTEgKyBaMSleMiAtIGdhbW1hIC0gZGVsdGFcbiAgICBueiA9IHRoaXMueS5yZWRBZGQodGhpcy56KS5yZWRTcXIoKS5yZWRJU3ViKGdhbW1hKS5yZWRJU3ViKGRlbHRhKTtcbiAgICAvLyBZMyA9IGFscGhhICogKDQgKiBiZXRhIC0gWDMpIC0gOCAqIGdhbW1hXjJcbiAgICB2YXIgZ2dhbW1hOCA9IGdhbW1hLnJlZFNxcigpO1xuICAgIGdnYW1tYTggPSBnZ2FtbWE4LnJlZElBZGQoZ2dhbW1hOCk7XG4gICAgZ2dhbW1hOCA9IGdnYW1tYTgucmVkSUFkZChnZ2FtbWE4KTtcbiAgICBnZ2FtbWE4ID0gZ2dhbW1hOC5yZWRJQWRkKGdnYW1tYTgpO1xuICAgIG55ID0gYWxwaGEucmVkTXVsKGJldGE0LnJlZElTdWIobngpKS5yZWRJU3ViKGdnYW1tYTgpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuY3VydmUuanBvaW50KG54LCBueSwgbnopO1xufTtcblxuSlBvaW50LnByb3RvdHlwZS5fZGJsID0gZnVuY3Rpb24gX2RibCgpIHtcbiAgdmFyIGEgPSB0aGlzLmN1cnZlLmE7XG5cbiAgLy8gNE0gKyA2UyArIDEwQVxuICB2YXIganggPSB0aGlzLng7XG4gIHZhciBqeSA9IHRoaXMueTtcbiAgdmFyIGp6ID0gdGhpcy56O1xuICB2YXIgano0ID0ganoucmVkU3FyKCkucmVkU3FyKCk7XG5cbiAgdmFyIGp4MiA9IGp4LnJlZFNxcigpO1xuICB2YXIgankyID0gankucmVkU3FyKCk7XG5cbiAgdmFyIGMgPSBqeDIucmVkQWRkKGp4MikucmVkSUFkZChqeDIpLnJlZElBZGQoYS5yZWRNdWwoano0KSk7XG5cbiAgdmFyIGp4ZDQgPSBqeC5yZWRBZGQoangpO1xuICBqeGQ0ID0ganhkNC5yZWRJQWRkKGp4ZDQpO1xuICB2YXIgdDEgPSBqeGQ0LnJlZE11bChqeTIpO1xuICB2YXIgbnggPSBjLnJlZFNxcigpLnJlZElTdWIodDEucmVkQWRkKHQxKSk7XG4gIHZhciB0MiA9IHQxLnJlZElTdWIobngpO1xuXG4gIHZhciBqeWQ4ID0gankyLnJlZFNxcigpO1xuICBqeWQ4ID0ganlkOC5yZWRJQWRkKGp5ZDgpO1xuICBqeWQ4ID0ganlkOC5yZWRJQWRkKGp5ZDgpO1xuICBqeWQ4ID0ganlkOC5yZWRJQWRkKGp5ZDgpO1xuICB2YXIgbnkgPSBjLnJlZE11bCh0MikucmVkSVN1YihqeWQ4KTtcbiAgdmFyIG56ID0gankucmVkQWRkKGp5KS5yZWRNdWwoanopO1xuXG4gIHJldHVybiB0aGlzLmN1cnZlLmpwb2ludChueCwgbnksIG56KTtcbn07XG5cbkpQb2ludC5wcm90b3R5cGUudHJwbCA9IGZ1bmN0aW9uIHRycGwoKSB7XG4gIGlmICghdGhpcy5jdXJ2ZS56ZXJvQSlcbiAgICByZXR1cm4gdGhpcy5kYmwoKS5hZGQodGhpcyk7XG5cbiAgLy8gaHlwZXJlbGxpcHRpYy5vcmcvRUZEL2cxcC9hdXRvLXNob3J0dy1qYWNvYmlhbi0wLmh0bWwjdHJpcGxpbmctdHBsLTIwMDctYmxcbiAgLy8gNU0gKyAxMFMgKyAuLi5cblxuICAvLyBYWCA9IFgxXjJcbiAgdmFyIHh4ID0gdGhpcy54LnJlZFNxcigpO1xuICAvLyBZWSA9IFkxXjJcbiAgdmFyIHl5ID0gdGhpcy55LnJlZFNxcigpO1xuICAvLyBaWiA9IFoxXjJcbiAgdmFyIHp6ID0gdGhpcy56LnJlZFNxcigpO1xuICAvLyBZWVlZID0gWVleMlxuICB2YXIgeXl5eSA9IHl5LnJlZFNxcigpO1xuICAvLyBNID0gMyAqIFhYICsgYSAqIFpaMjsgYSA9IDBcbiAgdmFyIG0gPSB4eC5yZWRBZGQoeHgpLnJlZElBZGQoeHgpO1xuICAvLyBNTSA9IE1eMlxuICB2YXIgbW0gPSBtLnJlZFNxcigpO1xuICAvLyBFID0gNiAqICgoWDEgKyBZWSleMiAtIFhYIC0gWVlZWSkgLSBNTVxuICB2YXIgZSA9IHRoaXMueC5yZWRBZGQoeXkpLnJlZFNxcigpLnJlZElTdWIoeHgpLnJlZElTdWIoeXl5eSk7XG4gIGUgPSBlLnJlZElBZGQoZSk7XG4gIGUgPSBlLnJlZEFkZChlKS5yZWRJQWRkKGUpO1xuICBlID0gZS5yZWRJU3ViKG1tKTtcbiAgLy8gRUUgPSBFXjJcbiAgdmFyIGVlID0gZS5yZWRTcXIoKTtcbiAgLy8gVCA9IDE2KllZWVlcbiAgdmFyIHQgPSB5eXl5LnJlZElBZGQoeXl5eSk7XG4gIHQgPSB0LnJlZElBZGQodCk7XG4gIHQgPSB0LnJlZElBZGQodCk7XG4gIHQgPSB0LnJlZElBZGQodCk7XG4gIC8vIFUgPSAoTSArIEUpXjIgLSBNTSAtIEVFIC0gVFxuICB2YXIgdSA9IG0ucmVkSUFkZChlKS5yZWRTcXIoKS5yZWRJU3ViKG1tKS5yZWRJU3ViKGVlKS5yZWRJU3ViKHQpO1xuICAvLyBYMyA9IDQgKiAoWDEgKiBFRSAtIDQgKiBZWSAqIFUpXG4gIHZhciB5eXU0ID0geXkucmVkTXVsKHUpO1xuICB5eXU0ID0geXl1NC5yZWRJQWRkKHl5dTQpO1xuICB5eXU0ID0geXl1NC5yZWRJQWRkKHl5dTQpO1xuICB2YXIgbnggPSB0aGlzLngucmVkTXVsKGVlKS5yZWRJU3ViKHl5dTQpO1xuICBueCA9IG54LnJlZElBZGQobngpO1xuICBueCA9IG54LnJlZElBZGQobngpO1xuICAvLyBZMyA9IDggKiBZMSAqIChVICogKFQgLSBVKSAtIEUgKiBFRSlcbiAgdmFyIG55ID0gdGhpcy55LnJlZE11bCh1LnJlZE11bCh0LnJlZElTdWIodSkpLnJlZElTdWIoZS5yZWRNdWwoZWUpKSk7XG4gIG55ID0gbnkucmVkSUFkZChueSk7XG4gIG55ID0gbnkucmVkSUFkZChueSk7XG4gIG55ID0gbnkucmVkSUFkZChueSk7XG4gIC8vIFozID0gKFoxICsgRSleMiAtIFpaIC0gRUVcbiAgdmFyIG56ID0gdGhpcy56LnJlZEFkZChlKS5yZWRTcXIoKS5yZWRJU3ViKHp6KS5yZWRJU3ViKGVlKTtcblxuICByZXR1cm4gdGhpcy5jdXJ2ZS5qcG9pbnQobngsIG55LCBueik7XG59O1xuXG5KUG9pbnQucHJvdG90eXBlLm11bCA9IGZ1bmN0aW9uIG11bChrLCBrYmFzZSkge1xuICBrID0gbmV3IEJOKGssIGtiYXNlKTtcblxuICByZXR1cm4gdGhpcy5jdXJ2ZS5fd25hZk11bCh0aGlzLCBrKTtcbn07XG5cbkpQb2ludC5wcm90b3R5cGUuZXEgPSBmdW5jdGlvbiBlcShwKSB7XG4gIGlmIChwLnR5cGUgPT09ICdhZmZpbmUnKVxuICAgIHJldHVybiB0aGlzLmVxKHAudG9KKCkpO1xuXG4gIGlmICh0aGlzID09PSBwKVxuICAgIHJldHVybiB0cnVlO1xuXG4gIC8vIHgxICogejJeMiA9PSB4MiAqIHoxXjJcbiAgdmFyIHoyID0gdGhpcy56LnJlZFNxcigpO1xuICB2YXIgcHoyID0gcC56LnJlZFNxcigpO1xuICBpZiAodGhpcy54LnJlZE11bChwejIpLnJlZElTdWIocC54LnJlZE11bCh6MikpLmNtcG4oMCkgIT09IDApXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIHkxICogejJeMyA9PSB5MiAqIHoxXjNcbiAgdmFyIHozID0gejIucmVkTXVsKHRoaXMueik7XG4gIHZhciBwejMgPSBwejIucmVkTXVsKHAueik7XG4gIHJldHVybiB0aGlzLnkucmVkTXVsKHB6MykucmVkSVN1YihwLnkucmVkTXVsKHozKSkuY21wbigwKSA9PT0gMDtcbn07XG5cbkpQb2ludC5wcm90b3R5cGUuZXFYVG9QID0gZnVuY3Rpb24gZXFYVG9QKHgpIHtcbiAgdmFyIHpzID0gdGhpcy56LnJlZFNxcigpO1xuICB2YXIgcnggPSB4LnRvUmVkKHRoaXMuY3VydmUucmVkKS5yZWRNdWwoenMpO1xuICBpZiAodGhpcy54LmNtcChyeCkgPT09IDApXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgdmFyIHhjID0geC5jbG9uZSgpO1xuICB2YXIgdCA9IHRoaXMuY3VydmUucmVkTi5yZWRNdWwoenMpO1xuICBmb3IgKDs7KSB7XG4gICAgeGMuaWFkZCh0aGlzLmN1cnZlLm4pO1xuICAgIGlmICh4Yy5jbXAodGhpcy5jdXJ2ZS5wKSA+PSAwKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgcngucmVkSUFkZCh0KTtcbiAgICBpZiAodGhpcy54LmNtcChyeCkgPT09IDApXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuSlBvaW50LnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gaW5zcGVjdCgpIHtcbiAgaWYgKHRoaXMuaXNJbmZpbml0eSgpKVxuICAgIHJldHVybiAnPEVDIEpQb2ludCBJbmZpbml0eT4nO1xuICByZXR1cm4gJzxFQyBKUG9pbnQgeDogJyArIHRoaXMueC50b1N0cmluZygxNiwgMikgK1xuICAgICAgJyB5OiAnICsgdGhpcy55LnRvU3RyaW5nKDE2LCAyKSArXG4gICAgICAnIHo6ICcgKyB0aGlzLnoudG9TdHJpbmcoMTYsIDIpICsgJz4nO1xufTtcblxuSlBvaW50LnByb3RvdHlwZS5pc0luZmluaXR5ID0gZnVuY3Rpb24gaXNJbmZpbml0eSgpIHtcbiAgLy8gWFhYIFRoaXMgY29kZSBhc3N1bWVzIHRoYXQgemVybyBpcyBhbHdheXMgemVybyBpbiByZWRcbiAgcmV0dXJuIHRoaXMuei5jbXBuKDApID09PSAwO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGN1cnZlcyA9IGV4cG9ydHM7XG5cbnZhciBoYXNoID0gcmVxdWlyZSgnaGFzaC5qcycpO1xudmFyIGN1cnZlID0gcmVxdWlyZSgnLi9jdXJ2ZScpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgYXNzZXJ0ID0gdXRpbHMuYXNzZXJ0O1xuXG5mdW5jdGlvbiBQcmVzZXRDdXJ2ZShvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zLnR5cGUgPT09ICdzaG9ydCcpXG4gICAgdGhpcy5jdXJ2ZSA9IG5ldyBjdXJ2ZS5zaG9ydChvcHRpb25zKTtcbiAgZWxzZSBpZiAob3B0aW9ucy50eXBlID09PSAnZWR3YXJkcycpXG4gICAgdGhpcy5jdXJ2ZSA9IG5ldyBjdXJ2ZS5lZHdhcmRzKG9wdGlvbnMpO1xuICBlbHNlXG4gICAgdGhpcy5jdXJ2ZSA9IG5ldyBjdXJ2ZS5tb250KG9wdGlvbnMpO1xuICB0aGlzLmcgPSB0aGlzLmN1cnZlLmc7XG4gIHRoaXMubiA9IHRoaXMuY3VydmUubjtcbiAgdGhpcy5oYXNoID0gb3B0aW9ucy5oYXNoO1xuXG4gIGFzc2VydCh0aGlzLmcudmFsaWRhdGUoKSwgJ0ludmFsaWQgY3VydmUnKTtcbiAgYXNzZXJ0KHRoaXMuZy5tdWwodGhpcy5uKS5pc0luZmluaXR5KCksICdJbnZhbGlkIGN1cnZlLCBHKk4gIT0gTycpO1xufVxuY3VydmVzLlByZXNldEN1cnZlID0gUHJlc2V0Q3VydmU7XG5cbmZ1bmN0aW9uIGRlZmluZUN1cnZlKG5hbWUsIG9wdGlvbnMpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1cnZlcywgbmFtZSwge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgY3VydmUgPSBuZXcgUHJlc2V0Q3VydmUob3B0aW9ucyk7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VydmVzLCBuYW1lLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IGN1cnZlXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBjdXJ2ZTtcbiAgICB9XG4gIH0pO1xufVxuXG5kZWZpbmVDdXJ2ZSgncDE5MicsIHtcbiAgdHlwZTogJ3Nob3J0JyxcbiAgcHJpbWU6ICdwMTkyJyxcbiAgcDogJ2ZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZlIGZmZmZmZmZmIGZmZmZmZmZmJyxcbiAgYTogJ2ZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZlIGZmZmZmZmZmIGZmZmZmZmZjJyxcbiAgYjogJzY0MjEwNTE5IGU1OWM4MGU3IDBmYTdlOWFiIDcyMjQzMDQ5IGZlYjhkZWVjIGMxNDZiOWIxJyxcbiAgbjogJ2ZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIDk5ZGVmODM2IDE0NmJjOWIxIGI0ZDIyODMxJyxcbiAgaGFzaDogaGFzaC5zaGEyNTYsXG4gIGdSZWQ6IGZhbHNlLFxuICBnOiBbXG4gICAgJzE4OGRhODBlIGIwMzA5MGY2IDdjYmYyMGViIDQzYTE4ODAwIGY0ZmYwYWZkIDgyZmYxMDEyJyxcbiAgICAnMDcxOTJiOTUgZmZjOGRhNzggNjMxMDExZWQgNmIyNGNkZDUgNzNmOTc3YTEgMWU3OTQ4MTEnXG4gIF1cbn0pO1xuXG5kZWZpbmVDdXJ2ZSgncDIyNCcsIHtcbiAgdHlwZTogJ3Nob3J0JyxcbiAgcHJpbWU6ICdwMjI0JyxcbiAgcDogJ2ZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIDAwMDAwMDAwIDAwMDAwMDAwIDAwMDAwMDAxJyxcbiAgYTogJ2ZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZlIGZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZlJyxcbiAgYjogJ2I0MDUwYTg1IDBjMDRiM2FiIGY1NDEzMjU2IDUwNDRiMGI3IGQ3YmZkOGJhIDI3MGIzOTQzIDIzNTVmZmI0JyxcbiAgbjogJ2ZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIGZmZmYxNmEyIGUwYjhmMDNlIDEzZGQyOTQ1IDVjNWMyYTNkJyxcbiAgaGFzaDogaGFzaC5zaGEyNTYsXG4gIGdSZWQ6IGZhbHNlLFxuICBnOiBbXG4gICAgJ2I3MGUwY2JkIDZiYjRiZjdmIDMyMTM5MGI5IDRhMDNjMWQzIDU2YzIxMTIyIDM0MzI4MGQ2IDExNWMxZDIxJyxcbiAgICAnYmQzNzYzODggYjVmNzIzZmIgNGMyMmRmZTYgY2Q0Mzc1YTAgNWEwNzQ3NjQgNDRkNTgxOTkgODUwMDdlMzQnXG4gIF1cbn0pO1xuXG5kZWZpbmVDdXJ2ZSgncDI1NicsIHtcbiAgdHlwZTogJ3Nob3J0JyxcbiAgcHJpbWU6IG51bGwsXG4gIHA6ICdmZmZmZmZmZiAwMDAwMDAwMSAwMDAwMDAwMCAwMDAwMDAwMCAwMDAwMDAwMCBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZicsXG4gIGE6ICdmZmZmZmZmZiAwMDAwMDAwMSAwMDAwMDAwMCAwMDAwMDAwMCAwMDAwMDAwMCBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmYycsXG4gIGI6ICc1YWM2MzVkOCBhYTNhOTNlNyBiM2ViYmQ1NSA3Njk4ODZiYyA2NTFkMDZiMCBjYzUzYjBmNiAzYmNlM2MzZSAyN2QyNjA0YicsXG4gIG46ICdmZmZmZmZmZiAwMDAwMDAwMCBmZmZmZmZmZiBmZmZmZmZmZiBiY2U2ZmFhZCBhNzE3OWU4NCBmM2I5Y2FjMiBmYzYzMjU1MScsXG4gIGhhc2g6IGhhc2guc2hhMjU2LFxuICBnUmVkOiBmYWxzZSxcbiAgZzogW1xuICAgICc2YjE3ZDFmMiBlMTJjNDI0NyBmOGJjZTZlNSA2M2E0NDBmMiA3NzAzN2Q4MSAyZGViMzNhMCBmNGExMzk0NSBkODk4YzI5NicsXG4gICAgJzRmZTM0MmUyIGZlMWE3ZjliIDhlZTdlYjRhIDdjMGY5ZTE2IDJiY2UzMzU3IDZiMzE1ZWNlIGNiYjY0MDY4IDM3YmY1MWY1J1xuICBdXG59KTtcblxuZGVmaW5lQ3VydmUoJ3AzODQnLCB7XG4gIHR5cGU6ICdzaG9ydCcsXG4gIHByaW1lOiBudWxsLFxuICBwOiAnZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgJyArXG4gICAgICdmZmZmZmZmZSBmZmZmZmZmZiAwMDAwMDAwMCAwMDAwMDAwMCBmZmZmZmZmZicsXG4gIGE6ICdmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiAnICtcbiAgICAgJ2ZmZmZmZmZlIGZmZmZmZmZmIDAwMDAwMDAwIDAwMDAwMDAwIGZmZmZmZmZjJyxcbiAgYjogJ2IzMzEyZmE3IGUyM2VlN2U0IDk4OGUwNTZiIGUzZjgyZDE5IDE4MWQ5YzZlIGZlODE0MTEyIDAzMTQwODhmICcgK1xuICAgICAnNTAxMzg3NWEgYzY1NjM5OGQgOGEyZWQxOWQgMmE4NWM4ZWQgZDNlYzJhZWYnLFxuICBuOiAnZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgYzc2MzRkODEgJyArXG4gICAgICdmNDM3MmRkZiA1ODFhMGRiMiA0OGIwYTc3YSBlY2VjMTk2YSBjY2M1Mjk3MycsXG4gIGhhc2g6IGhhc2guc2hhMzg0LFxuICBnUmVkOiBmYWxzZSxcbiAgZzogW1xuICAgICdhYTg3Y2EyMiBiZThiMDUzNyA4ZWIxYzcxZSBmMzIwYWQ3NCA2ZTFkM2I2MiA4YmE3OWI5OCA1OWY3NDFlMCA4MjU0MmEzOCAnICtcbiAgICAnNTUwMmYyNWQgYmY1NTI5NmMgM2E1NDVlMzggNzI3NjBhYjcnLFxuICAgICczNjE3ZGU0YSA5NjI2MmM2ZiA1ZDllOThiZiA5MjkyZGMyOSBmOGY0MWRiZCAyODlhMTQ3YyBlOWRhMzExMyBiNWYwYjhjMCAnICtcbiAgICAnMGE2MGIxY2UgMWQ3ZTgxOWQgN2E0MzFkN2MgOTBlYTBlNWYnXG4gIF1cbn0pO1xuXG5kZWZpbmVDdXJ2ZSgncDUyMScsIHtcbiAgdHlwZTogJ3Nob3J0JyxcbiAgcHJpbWU6IG51bGwsXG4gIHA6ICcwMDAwMDFmZiBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiAnICtcbiAgICAgJ2ZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmICcgK1xuICAgICAnZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYnLFxuICBhOiAnMDAwMDAxZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgJyArXG4gICAgICdmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiAnICtcbiAgICAgJ2ZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZjJyxcbiAgYjogJzAwMDAwMDUxIDk1M2ViOTYxIDhlMWM5YTFmIDkyOWEyMWEwIGI2ODU0MGVlIGEyZGE3MjViICcgK1xuICAgICAnOTliMzE1ZjMgYjhiNDg5OTEgOGVmMTA5ZTEgNTYxOTM5NTEgZWM3ZTkzN2IgMTY1MmMwYmQgJyArXG4gICAgICczYmIxYmYwNyAzNTczZGY4OCAzZDJjMzRmMSBlZjQ1MWZkNCA2YjUwM2YwMCcsXG4gIG46ICcwMDAwMDFmZiBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiBmZmZmZmZmZiAnICtcbiAgICAgJ2ZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZhIDUxODY4NzgzIGJmMmY5NjZiIDdmY2MwMTQ4ICcgK1xuICAgICAnZjcwOWE1ZDAgM2JiNWM5YjggODk5YzQ3YWUgYmI2ZmI3MWUgOTEzODY0MDknLFxuICBoYXNoOiBoYXNoLnNoYTUxMixcbiAgZ1JlZDogZmFsc2UsXG4gIGc6IFtcbiAgICAnMDAwMDAwYzYgODU4ZTA2YjcgMDQwNGU5Y2QgOWUzZWNiNjYgMjM5NWI0NDIgOWM2NDgxMzkgJyArXG4gICAgJzA1M2ZiNTIxIGY4MjhhZjYwIDZiNGQzZGJhIGExNGI1ZTc3IGVmZTc1OTI4IGZlMWRjMTI3ICcgK1xuICAgICdhMmZmYThkZSAzMzQ4YjNjMSA4NTZhNDI5YiBmOTdlN2UzMSBjMmU1YmQ2NicsXG4gICAgJzAwMDAwMTE4IDM5Mjk2YTc4IDlhM2JjMDA0IDVjOGE1ZmI0IDJjN2QxYmQ5IDk4ZjU0NDQ5ICcgK1xuICAgICc1NzliNDQ2OCAxN2FmYmQxNyAyNzNlNjYyYyA5N2VlNzI5OSA1ZWY0MjY0MCBjNTUwYjkwMSAnICtcbiAgICAnM2ZhZDA3NjEgMzUzYzcwODYgYTI3MmMyNDAgODhiZTk0NzYgOWZkMTY2NTAnXG4gIF1cbn0pO1xuXG5kZWZpbmVDdXJ2ZSgnY3VydmUyNTUxOScsIHtcbiAgdHlwZTogJ21vbnQnLFxuICBwcmltZTogJ3AyNTUxOScsXG4gIHA6ICc3ZmZmZmZmZmZmZmZmZmZmIGZmZmZmZmZmZmZmZmZmZmYgZmZmZmZmZmZmZmZmZmZmZiBmZmZmZmZmZmZmZmZmZmVkJyxcbiAgYTogJzc2ZDA2JyxcbiAgYjogJzEnLFxuICBuOiAnMTAwMDAwMDAwMDAwMDAwMCAwMDAwMDAwMDAwMDAwMDAwIDE0ZGVmOWRlYTJmNzljZDYgNTgxMjYzMWE1Y2Y1ZDNlZCcsXG4gIGhhc2g6IGhhc2guc2hhMjU2LFxuICBnUmVkOiBmYWxzZSxcbiAgZzogW1xuICAgICc5J1xuICBdXG59KTtcblxuZGVmaW5lQ3VydmUoJ2VkMjU1MTknLCB7XG4gIHR5cGU6ICdlZHdhcmRzJyxcbiAgcHJpbWU6ICdwMjU1MTknLFxuICBwOiAnN2ZmZmZmZmZmZmZmZmZmZiBmZmZmZmZmZmZmZmZmZmZmIGZmZmZmZmZmZmZmZmZmZmYgZmZmZmZmZmZmZmZmZmZlZCcsXG4gIGE6ICctMScsXG4gIGM6ICcxJyxcbiAgLy8gLTEyMTY2NSAqICgxMjE2NjZeKC0xKSkgKG1vZCBQKVxuICBkOiAnNTIwMzZjZWUyYjZmZmU3MyA4Y2M3NDA3OTc3NzllODk4IDAwNzAwYTRkNDE0MWQ4YWIgNzVlYjRkY2ExMzU5NzhhMycsXG4gIG46ICcxMDAwMDAwMDAwMDAwMDAwIDAwMDAwMDAwMDAwMDAwMDAgMTRkZWY5ZGVhMmY3OWNkNiA1ODEyNjMxYTVjZjVkM2VkJyxcbiAgaGFzaDogaGFzaC5zaGEyNTYsXG4gIGdSZWQ6IGZhbHNlLFxuICBnOiBbXG4gICAgJzIxNjkzNmQzY2Q2ZTUzZmVjMGE0ZTIzMWZkZDZkYzVjNjkyY2M3NjA5NTI1YTdiMmM5NTYyZDYwOGYyNWQ1MWEnLFxuXG4gICAgLy8gNC81XG4gICAgJzY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NTgnXG4gIF1cbn0pO1xuXG52YXIgcHJlO1xudHJ5IHtcbiAgcHJlID0gcmVxdWlyZSgnLi9wcmVjb21wdXRlZC9zZWNwMjU2azEnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgcHJlID0gdW5kZWZpbmVkO1xufVxuXG5kZWZpbmVDdXJ2ZSgnc2VjcDI1NmsxJywge1xuICB0eXBlOiAnc2hvcnQnLFxuICBwcmltZTogJ2syNTYnLFxuICBwOiAnZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmYgZmZmZmZmZmUgZmZmZmZjMmYnLFxuICBhOiAnMCcsXG4gIGI6ICc3JyxcbiAgbjogJ2ZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZmIGZmZmZmZmZlIGJhYWVkY2U2IGFmNDhhMDNiIGJmZDI1ZThjIGQwMzY0MTQxJyxcbiAgaDogJzEnLFxuICBoYXNoOiBoYXNoLnNoYTI1NixcblxuICAvLyBQcmVjb21wdXRlZCBlbmRvbW9ycGhpc21cbiAgYmV0YTogJzdhZTk2YTJiNjU3YzA3MTA2ZTY0NDc5ZWFjMzQzNGU5OWNmMDQ5NzUxMmY1ODk5NWMxMzk2YzI4NzE5NTAxZWUnLFxuICBsYW1iZGE6ICc1MzYzYWQ0Y2MwNWMzMGUwYTUyNjFjMDI4ODEyNjQ1YTEyMmUyMmVhMjA4MTY2NzhkZjAyOTY3YzFiMjNiZDcyJyxcbiAgYmFzaXM6IFtcbiAgICB7XG4gICAgICBhOiAnMzA4NmQyMjFhN2Q0NmJjZGU4NmM5MGU0OTI4NGViMTUnLFxuICAgICAgYjogJy1lNDQzN2VkNjAxMGU4ODI4NmY1NDdmYTkwYWJmZTRjMydcbiAgICB9LFxuICAgIHtcbiAgICAgIGE6ICcxMTRjYTUwZjdhOGUyZjNmNjU3YzExMDhkOWQ0NGNmZDgnLFxuICAgICAgYjogJzMwODZkMjIxYTdkNDZiY2RlODZjOTBlNDkyODRlYjE1J1xuICAgIH1cbiAgXSxcblxuICBnUmVkOiBmYWxzZSxcbiAgZzogW1xuICAgICc3OWJlNjY3ZWY5ZGNiYmFjNTVhMDYyOTVjZTg3MGIwNzAyOWJmY2RiMmRjZTI4ZDk1OWYyODE1YjE2ZjgxNzk4JyxcbiAgICAnNDgzYWRhNzcyNmEzYzQ2NTVkYTRmYmZjMGUxMTA4YThmZDE3YjQ0OGE2ODU1NDE5OWM0N2QwOGZmYjEwZDRiOCcsXG4gICAgcHJlXG4gIF1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQk4gPSByZXF1aXJlKCdibi5qcycpO1xudmFyIEhtYWNEUkJHID0gcmVxdWlyZSgnaG1hYy1kcmJnJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIGN1cnZlcyA9IHJlcXVpcmUoJy4uL2N1cnZlcycpO1xudmFyIHJhbmQgPSByZXF1aXJlKCdicm9yYW5kJyk7XG52YXIgYXNzZXJ0ID0gdXRpbHMuYXNzZXJ0O1xuXG52YXIgS2V5UGFpciA9IHJlcXVpcmUoJy4va2V5Jyk7XG52YXIgU2lnbmF0dXJlID0gcmVxdWlyZSgnLi9zaWduYXR1cmUnKTtcblxuZnVuY3Rpb24gRUMob3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRUMpKVxuICAgIHJldHVybiBuZXcgRUMob3B0aW9ucyk7XG5cbiAgLy8gU2hvcnRjdXQgYGVsbGlwdGljLmVjKGN1cnZlLW5hbWUpYFxuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgYXNzZXJ0KGN1cnZlcy5oYXNPd25Qcm9wZXJ0eShvcHRpb25zKSwgJ1Vua25vd24gY3VydmUgJyArIG9wdGlvbnMpO1xuXG4gICAgb3B0aW9ucyA9IGN1cnZlc1tvcHRpb25zXTtcbiAgfVxuXG4gIC8vIFNob3J0Y3V0IGZvciBgZWxsaXB0aWMuZWMoZWxsaXB0aWMuY3VydmVzLmN1cnZlTmFtZSlgXG4gIGlmIChvcHRpb25zIGluc3RhbmNlb2YgY3VydmVzLlByZXNldEN1cnZlKVxuICAgIG9wdGlvbnMgPSB7IGN1cnZlOiBvcHRpb25zIH07XG5cbiAgdGhpcy5jdXJ2ZSA9IG9wdGlvbnMuY3VydmUuY3VydmU7XG4gIHRoaXMubiA9IHRoaXMuY3VydmUubjtcbiAgdGhpcy5uaCA9IHRoaXMubi51c2hybigxKTtcbiAgdGhpcy5nID0gdGhpcy5jdXJ2ZS5nO1xuXG4gIC8vIFBvaW50IG9uIGN1cnZlXG4gIHRoaXMuZyA9IG9wdGlvbnMuY3VydmUuZztcbiAgdGhpcy5nLnByZWNvbXB1dGUob3B0aW9ucy5jdXJ2ZS5uLmJpdExlbmd0aCgpICsgMSk7XG5cbiAgLy8gSGFzaCBmb3IgZnVuY3Rpb24gZm9yIERSQkdcbiAgdGhpcy5oYXNoID0gb3B0aW9ucy5oYXNoIHx8IG9wdGlvbnMuY3VydmUuaGFzaDtcbn1cbm1vZHVsZS5leHBvcnRzID0gRUM7XG5cbkVDLnByb3RvdHlwZS5rZXlQYWlyID0gZnVuY3Rpb24ga2V5UGFpcihvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgS2V5UGFpcih0aGlzLCBvcHRpb25zKTtcbn07XG5cbkVDLnByb3RvdHlwZS5rZXlGcm9tUHJpdmF0ZSA9IGZ1bmN0aW9uIGtleUZyb21Qcml2YXRlKHByaXYsIGVuYykge1xuICByZXR1cm4gS2V5UGFpci5mcm9tUHJpdmF0ZSh0aGlzLCBwcml2LCBlbmMpO1xufTtcblxuRUMucHJvdG90eXBlLmtleUZyb21QdWJsaWMgPSBmdW5jdGlvbiBrZXlGcm9tUHVibGljKHB1YiwgZW5jKSB7XG4gIHJldHVybiBLZXlQYWlyLmZyb21QdWJsaWModGhpcywgcHViLCBlbmMpO1xufTtcblxuRUMucHJvdG90eXBlLmdlbktleVBhaXIgPSBmdW5jdGlvbiBnZW5LZXlQYWlyKG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKVxuICAgIG9wdGlvbnMgPSB7fTtcblxuICAvLyBJbnN0YW50aWF0ZSBIbWFjX0RSQkdcbiAgdmFyIGRyYmcgPSBuZXcgSG1hY0RSQkcoe1xuICAgIGhhc2g6IHRoaXMuaGFzaCxcbiAgICBwZXJzOiBvcHRpb25zLnBlcnMsXG4gICAgcGVyc0VuYzogb3B0aW9ucy5wZXJzRW5jIHx8ICd1dGY4JyxcbiAgICBlbnRyb3B5OiBvcHRpb25zLmVudHJvcHkgfHwgcmFuZCh0aGlzLmhhc2guaG1hY1N0cmVuZ3RoKSxcbiAgICBlbnRyb3B5RW5jOiBvcHRpb25zLmVudHJvcHkgJiYgb3B0aW9ucy5lbnRyb3B5RW5jIHx8ICd1dGY4JyxcbiAgICBub25jZTogdGhpcy5uLnRvQXJyYXkoKVxuICB9KTtcblxuICB2YXIgYnl0ZXMgPSB0aGlzLm4uYnl0ZUxlbmd0aCgpO1xuICB2YXIgbnMyID0gdGhpcy5uLnN1YihuZXcgQk4oMikpO1xuICBkbyB7XG4gICAgdmFyIHByaXYgPSBuZXcgQk4oZHJiZy5nZW5lcmF0ZShieXRlcykpO1xuICAgIGlmIChwcml2LmNtcChuczIpID4gMClcbiAgICAgIGNvbnRpbnVlO1xuXG4gICAgcHJpdi5pYWRkbigxKTtcbiAgICByZXR1cm4gdGhpcy5rZXlGcm9tUHJpdmF0ZShwcml2KTtcbiAgfSB3aGlsZSAodHJ1ZSk7XG59O1xuXG5FQy5wcm90b3R5cGUuX3RydW5jYXRlVG9OID0gZnVuY3Rpb24gdHJ1bmNhdGVUb04obXNnLCB0cnVuY09ubHkpIHtcbiAgdmFyIGRlbHRhID0gbXNnLmJ5dGVMZW5ndGgoKSAqIDggLSB0aGlzLm4uYml0TGVuZ3RoKCk7XG4gIGlmIChkZWx0YSA+IDApXG4gICAgbXNnID0gbXNnLnVzaHJuKGRlbHRhKTtcbiAgaWYgKCF0cnVuY09ubHkgJiYgbXNnLmNtcCh0aGlzLm4pID49IDApXG4gICAgcmV0dXJuIG1zZy5zdWIodGhpcy5uKTtcbiAgZWxzZVxuICAgIHJldHVybiBtc2c7XG59O1xuXG5FQy5wcm90b3R5cGUuc2lnbiA9IGZ1bmN0aW9uIHNpZ24obXNnLCBrZXksIGVuYywgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIGVuYyA9PT0gJ29iamVjdCcpIHtcbiAgICBvcHRpb25zID0gZW5jO1xuICAgIGVuYyA9IG51bGw7XG4gIH1cbiAgaWYgKCFvcHRpb25zKVxuICAgIG9wdGlvbnMgPSB7fTtcblxuICBrZXkgPSB0aGlzLmtleUZyb21Qcml2YXRlKGtleSwgZW5jKTtcbiAgbXNnID0gdGhpcy5fdHJ1bmNhdGVUb04obmV3IEJOKG1zZywgMTYpKTtcblxuICAvLyBaZXJvLWV4dGVuZCBrZXkgdG8gcHJvdmlkZSBlbm91Z2ggZW50cm9weVxuICB2YXIgYnl0ZXMgPSB0aGlzLm4uYnl0ZUxlbmd0aCgpO1xuICB2YXIgYmtleSA9IGtleS5nZXRQcml2YXRlKCkudG9BcnJheSgnYmUnLCBieXRlcyk7XG5cbiAgLy8gWmVyby1leHRlbmQgbm9uY2UgdG8gaGF2ZSB0aGUgc2FtZSBieXRlIHNpemUgYXMgTlxuICB2YXIgbm9uY2UgPSBtc2cudG9BcnJheSgnYmUnLCBieXRlcyk7XG5cbiAgLy8gSW5zdGFudGlhdGUgSG1hY19EUkJHXG4gIHZhciBkcmJnID0gbmV3IEhtYWNEUkJHKHtcbiAgICBoYXNoOiB0aGlzLmhhc2gsXG4gICAgZW50cm9weTogYmtleSxcbiAgICBub25jZTogbm9uY2UsXG4gICAgcGVyczogb3B0aW9ucy5wZXJzLFxuICAgIHBlcnNFbmM6IG9wdGlvbnMucGVyc0VuYyB8fCAndXRmOCdcbiAgfSk7XG5cbiAgLy8gTnVtYmVyIG9mIGJ5dGVzIHRvIGdlbmVyYXRlXG4gIHZhciBuczEgPSB0aGlzLm4uc3ViKG5ldyBCTigxKSk7XG5cbiAgZm9yICh2YXIgaXRlciA9IDA7IHRydWU7IGl0ZXIrKykge1xuICAgIHZhciBrID0gb3B0aW9ucy5rID9cbiAgICAgICAgb3B0aW9ucy5rKGl0ZXIpIDpcbiAgICAgICAgbmV3IEJOKGRyYmcuZ2VuZXJhdGUodGhpcy5uLmJ5dGVMZW5ndGgoKSkpO1xuICAgIGsgPSB0aGlzLl90cnVuY2F0ZVRvTihrLCB0cnVlKTtcbiAgICBpZiAoay5jbXBuKDEpIDw9IDAgfHwgay5jbXAobnMxKSA+PSAwKVxuICAgICAgY29udGludWU7XG5cbiAgICB2YXIga3AgPSB0aGlzLmcubXVsKGspO1xuICAgIGlmIChrcC5pc0luZmluaXR5KCkpXG4gICAgICBjb250aW51ZTtcblxuICAgIHZhciBrcFggPSBrcC5nZXRYKCk7XG4gICAgdmFyIHIgPSBrcFgudW1vZCh0aGlzLm4pO1xuICAgIGlmIChyLmNtcG4oMCkgPT09IDApXG4gICAgICBjb250aW51ZTtcblxuICAgIHZhciBzID0gay5pbnZtKHRoaXMubikubXVsKHIubXVsKGtleS5nZXRQcml2YXRlKCkpLmlhZGQobXNnKSk7XG4gICAgcyA9IHMudW1vZCh0aGlzLm4pO1xuICAgIGlmIChzLmNtcG4oMCkgPT09IDApXG4gICAgICBjb250aW51ZTtcblxuICAgIHZhciByZWNvdmVyeVBhcmFtID0gKGtwLmdldFkoKS5pc09kZCgpID8gMSA6IDApIHxcbiAgICAgICAgICAgICAgICAgICAgICAgIChrcFguY21wKHIpICE9PSAwID8gMiA6IDApO1xuXG4gICAgLy8gVXNlIGNvbXBsZW1lbnQgb2YgYHNgLCBpZiBpdCBpcyA+IGBuIC8gMmBcbiAgICBpZiAob3B0aW9ucy5jYW5vbmljYWwgJiYgcy5jbXAodGhpcy5uaCkgPiAwKSB7XG4gICAgICBzID0gdGhpcy5uLnN1YihzKTtcbiAgICAgIHJlY292ZXJ5UGFyYW0gXj0gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFNpZ25hdHVyZSh7IHI6IHIsIHM6IHMsIHJlY292ZXJ5UGFyYW06IHJlY292ZXJ5UGFyYW0gfSk7XG4gIH1cbn07XG5cbkVDLnByb3RvdHlwZS52ZXJpZnkgPSBmdW5jdGlvbiB2ZXJpZnkobXNnLCBzaWduYXR1cmUsIGtleSwgZW5jKSB7XG4gIG1zZyA9IHRoaXMuX3RydW5jYXRlVG9OKG5ldyBCTihtc2csIDE2KSk7XG4gIGtleSA9IHRoaXMua2V5RnJvbVB1YmxpYyhrZXksIGVuYyk7XG4gIHNpZ25hdHVyZSA9IG5ldyBTaWduYXR1cmUoc2lnbmF0dXJlLCAnaGV4Jyk7XG5cbiAgLy8gUGVyZm9ybSBwcmltaXRpdmUgdmFsdWVzIHZhbGlkYXRpb25cbiAgdmFyIHIgPSBzaWduYXR1cmUucjtcbiAgdmFyIHMgPSBzaWduYXR1cmUucztcbiAgaWYgKHIuY21wbigxKSA8IDAgfHwgci5jbXAodGhpcy5uKSA+PSAwKVxuICAgIHJldHVybiBmYWxzZTtcbiAgaWYgKHMuY21wbigxKSA8IDAgfHwgcy5jbXAodGhpcy5uKSA+PSAwKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyBWYWxpZGF0ZSBzaWduYXR1cmVcbiAgdmFyIHNpbnYgPSBzLmludm0odGhpcy5uKTtcbiAgdmFyIHUxID0gc2ludi5tdWwobXNnKS51bW9kKHRoaXMubik7XG4gIHZhciB1MiA9IHNpbnYubXVsKHIpLnVtb2QodGhpcy5uKTtcblxuICBpZiAoIXRoaXMuY3VydmUuX21heHdlbGxUcmljaykge1xuICAgIHZhciBwID0gdGhpcy5nLm11bEFkZCh1MSwga2V5LmdldFB1YmxpYygpLCB1Mik7XG4gICAgaWYgKHAuaXNJbmZpbml0eSgpKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgcmV0dXJuIHAuZ2V0WCgpLnVtb2QodGhpcy5uKS5jbXAocikgPT09IDA7XG4gIH1cblxuICAvLyBOT1RFOiBHcmVnIE1heHdlbGwncyB0cmljaywgaW5zcGlyZWQgYnk6XG4gIC8vIGh0dHBzOi8vZ2l0LmlvL3ZhZDNLXG5cbiAgdmFyIHAgPSB0aGlzLmcuam11bEFkZCh1MSwga2V5LmdldFB1YmxpYygpLCB1Mik7XG4gIGlmIChwLmlzSW5maW5pdHkoKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgLy8gQ29tcGFyZSBgcC54YCBvZiBKYWNvYmlhbiBwb2ludCB3aXRoIGByYCxcbiAgLy8gdGhpcyB3aWxsIGRvIGBwLnggPT0gciAqIHAuel4yYCBpbnN0ZWFkIG9mIG11bHRpcGx5aW5nIGBwLnhgIGJ5IHRoZVxuICAvLyBpbnZlcnNlIG9mIGBwLnpeMmBcbiAgcmV0dXJuIHAuZXFYVG9QKHIpO1xufTtcblxuRUMucHJvdG90eXBlLnJlY292ZXJQdWJLZXkgPSBmdW5jdGlvbihtc2csIHNpZ25hdHVyZSwgaiwgZW5jKSB7XG4gIGFzc2VydCgoMyAmIGopID09PSBqLCAnVGhlIHJlY292ZXJ5IHBhcmFtIGlzIG1vcmUgdGhhbiB0d28gYml0cycpO1xuICBzaWduYXR1cmUgPSBuZXcgU2lnbmF0dXJlKHNpZ25hdHVyZSwgZW5jKTtcblxuICB2YXIgbiA9IHRoaXMubjtcbiAgdmFyIGUgPSBuZXcgQk4obXNnKTtcbiAgdmFyIHIgPSBzaWduYXR1cmUucjtcbiAgdmFyIHMgPSBzaWduYXR1cmUucztcblxuICAvLyBBIHNldCBMU0Igc2lnbmlmaWVzIHRoYXQgdGhlIHktY29vcmRpbmF0ZSBpcyBvZGRcbiAgdmFyIGlzWU9kZCA9IGogJiAxO1xuICB2YXIgaXNTZWNvbmRLZXkgPSBqID4+IDE7XG4gIGlmIChyLmNtcCh0aGlzLmN1cnZlLnAudW1vZCh0aGlzLmN1cnZlLm4pKSA+PSAwICYmIGlzU2Vjb25kS2V5KVxuICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGZpbmQgc2VuY29uZCBrZXkgY2FuZGluYXRlJyk7XG5cbiAgLy8gMS4xLiBMZXQgeCA9IHIgKyBqbi5cbiAgaWYgKGlzU2Vjb25kS2V5KVxuICAgIHIgPSB0aGlzLmN1cnZlLnBvaW50RnJvbVgoci5hZGQodGhpcy5jdXJ2ZS5uKSwgaXNZT2RkKTtcbiAgZWxzZVxuICAgIHIgPSB0aGlzLmN1cnZlLnBvaW50RnJvbVgociwgaXNZT2RkKTtcblxuICB2YXIgckludiA9IHNpZ25hdHVyZS5yLmludm0obik7XG4gIHZhciBzMSA9IG4uc3ViKGUpLm11bChySW52KS51bW9kKG4pO1xuICB2YXIgczIgPSBzLm11bChySW52KS51bW9kKG4pO1xuXG4gIC8vIDEuNi4xIENvbXB1dGUgUSA9IHJeLTEgKHNSIC0gIGVHKVxuICAvLyAgICAgICAgICAgICAgIFEgPSByXi0xIChzUiArIC1lRylcbiAgcmV0dXJuIHRoaXMuZy5tdWxBZGQoczEsIHIsIHMyKTtcbn07XG5cbkVDLnByb3RvdHlwZS5nZXRLZXlSZWNvdmVyeVBhcmFtID0gZnVuY3Rpb24oZSwgc2lnbmF0dXJlLCBRLCBlbmMpIHtcbiAgc2lnbmF0dXJlID0gbmV3IFNpZ25hdHVyZShzaWduYXR1cmUsIGVuYyk7XG4gIGlmIChzaWduYXR1cmUucmVjb3ZlcnlQYXJhbSAhPT0gbnVsbClcbiAgICByZXR1cm4gc2lnbmF0dXJlLnJlY292ZXJ5UGFyYW07XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICB2YXIgUXByaW1lO1xuICAgIHRyeSB7XG4gICAgICBRcHJpbWUgPSB0aGlzLnJlY292ZXJQdWJLZXkoZSwgc2lnbmF0dXJlLCBpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoUXByaW1lLmVxKFEpKVxuICAgICAgcmV0dXJuIGk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gZmluZCB2YWxpZCByZWNvdmVyeSBmYWN0b3InKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBCTiA9IHJlcXVpcmUoJ2JuLmpzJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIGFzc2VydCA9IHV0aWxzLmFzc2VydDtcblxuZnVuY3Rpb24gS2V5UGFpcihlYywgb3B0aW9ucykge1xuICB0aGlzLmVjID0gZWM7XG4gIHRoaXMucHJpdiA9IG51bGw7XG4gIHRoaXMucHViID0gbnVsbDtcblxuICAvLyBLZXlQYWlyKGVjLCB7IHByaXY6IC4uLiwgcHViOiAuLi4gfSlcbiAgaWYgKG9wdGlvbnMucHJpdilcbiAgICB0aGlzLl9pbXBvcnRQcml2YXRlKG9wdGlvbnMucHJpdiwgb3B0aW9ucy5wcml2RW5jKTtcbiAgaWYgKG9wdGlvbnMucHViKVxuICAgIHRoaXMuX2ltcG9ydFB1YmxpYyhvcHRpb25zLnB1Yiwgb3B0aW9ucy5wdWJFbmMpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBLZXlQYWlyO1xuXG5LZXlQYWlyLmZyb21QdWJsaWMgPSBmdW5jdGlvbiBmcm9tUHVibGljKGVjLCBwdWIsIGVuYykge1xuICBpZiAocHViIGluc3RhbmNlb2YgS2V5UGFpcilcbiAgICByZXR1cm4gcHViO1xuXG4gIHJldHVybiBuZXcgS2V5UGFpcihlYywge1xuICAgIHB1YjogcHViLFxuICAgIHB1YkVuYzogZW5jXG4gIH0pO1xufTtcblxuS2V5UGFpci5mcm9tUHJpdmF0ZSA9IGZ1bmN0aW9uIGZyb21Qcml2YXRlKGVjLCBwcml2LCBlbmMpIHtcbiAgaWYgKHByaXYgaW5zdGFuY2VvZiBLZXlQYWlyKVxuICAgIHJldHVybiBwcml2O1xuXG4gIHJldHVybiBuZXcgS2V5UGFpcihlYywge1xuICAgIHByaXY6IHByaXYsXG4gICAgcHJpdkVuYzogZW5jXG4gIH0pO1xufTtcblxuS2V5UGFpci5wcm90b3R5cGUudmFsaWRhdGUgPSBmdW5jdGlvbiB2YWxpZGF0ZSgpIHtcbiAgdmFyIHB1YiA9IHRoaXMuZ2V0UHVibGljKCk7XG5cbiAgaWYgKHB1Yi5pc0luZmluaXR5KCkpXG4gICAgcmV0dXJuIHsgcmVzdWx0OiBmYWxzZSwgcmVhc29uOiAnSW52YWxpZCBwdWJsaWMga2V5JyB9O1xuICBpZiAoIXB1Yi52YWxpZGF0ZSgpKVxuICAgIHJldHVybiB7IHJlc3VsdDogZmFsc2UsIHJlYXNvbjogJ1B1YmxpYyBrZXkgaXMgbm90IGEgcG9pbnQnIH07XG4gIGlmICghcHViLm11bCh0aGlzLmVjLmN1cnZlLm4pLmlzSW5maW5pdHkoKSlcbiAgICByZXR1cm4geyByZXN1bHQ6IGZhbHNlLCByZWFzb246ICdQdWJsaWMga2V5ICogTiAhPSBPJyB9O1xuXG4gIHJldHVybiB7IHJlc3VsdDogdHJ1ZSwgcmVhc29uOiBudWxsIH07XG59O1xuXG5LZXlQYWlyLnByb3RvdHlwZS5nZXRQdWJsaWMgPSBmdW5jdGlvbiBnZXRQdWJsaWMoY29tcGFjdCwgZW5jKSB7XG4gIC8vIGNvbXBhY3QgaXMgb3B0aW9uYWwgYXJndW1lbnRcbiAgaWYgKHR5cGVvZiBjb21wYWN0ID09PSAnc3RyaW5nJykge1xuICAgIGVuYyA9IGNvbXBhY3Q7XG4gICAgY29tcGFjdCA9IG51bGw7XG4gIH1cblxuICBpZiAoIXRoaXMucHViKVxuICAgIHRoaXMucHViID0gdGhpcy5lYy5nLm11bCh0aGlzLnByaXYpO1xuXG4gIGlmICghZW5jKVxuICAgIHJldHVybiB0aGlzLnB1YjtcblxuICByZXR1cm4gdGhpcy5wdWIuZW5jb2RlKGVuYywgY29tcGFjdCk7XG59O1xuXG5LZXlQYWlyLnByb3RvdHlwZS5nZXRQcml2YXRlID0gZnVuY3Rpb24gZ2V0UHJpdmF0ZShlbmMpIHtcbiAgaWYgKGVuYyA9PT0gJ2hleCcpXG4gICAgcmV0dXJuIHRoaXMucHJpdi50b1N0cmluZygxNiwgMik7XG4gIGVsc2VcbiAgICByZXR1cm4gdGhpcy5wcml2O1xufTtcblxuS2V5UGFpci5wcm90b3R5cGUuX2ltcG9ydFByaXZhdGUgPSBmdW5jdGlvbiBfaW1wb3J0UHJpdmF0ZShrZXksIGVuYykge1xuICB0aGlzLnByaXYgPSBuZXcgQk4oa2V5LCBlbmMgfHwgMTYpO1xuXG4gIC8vIEVuc3VyZSB0aGF0IHRoZSBwcml2IHdvbid0IGJlIGJpZ2dlciB0aGFuIG4sIG90aGVyd2lzZSB3ZSBtYXkgZmFpbFxuICAvLyBpbiBmaXhlZCBtdWx0aXBsaWNhdGlvbiBtZXRob2RcbiAgdGhpcy5wcml2ID0gdGhpcy5wcml2LnVtb2QodGhpcy5lYy5jdXJ2ZS5uKTtcbn07XG5cbktleVBhaXIucHJvdG90eXBlLl9pbXBvcnRQdWJsaWMgPSBmdW5jdGlvbiBfaW1wb3J0UHVibGljKGtleSwgZW5jKSB7XG4gIGlmIChrZXkueCB8fCBrZXkueSkge1xuICAgIC8vIE1vbnRnb21lcnkgcG9pbnRzIG9ubHkgaGF2ZSBhbiBgeGAgY29vcmRpbmF0ZS5cbiAgICAvLyBXZWllcnN0cmFzcy9FZHdhcmRzIHBvaW50cyBvbiB0aGUgb3RoZXIgaGFuZCBoYXZlIGJvdGggYHhgIGFuZFxuICAgIC8vIGB5YCBjb29yZGluYXRlcy5cbiAgICBpZiAodGhpcy5lYy5jdXJ2ZS50eXBlID09PSAnbW9udCcpIHtcbiAgICAgIGFzc2VydChrZXkueCwgJ05lZWQgeCBjb29yZGluYXRlJyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmVjLmN1cnZlLnR5cGUgPT09ICdzaG9ydCcgfHxcbiAgICAgICAgICAgICAgIHRoaXMuZWMuY3VydmUudHlwZSA9PT0gJ2Vkd2FyZHMnKSB7XG4gICAgICBhc3NlcnQoa2V5LnggJiYga2V5LnksICdOZWVkIGJvdGggeCBhbmQgeSBjb29yZGluYXRlJyk7XG4gICAgfVxuICAgIHRoaXMucHViID0gdGhpcy5lYy5jdXJ2ZS5wb2ludChrZXkueCwga2V5LnkpO1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLnB1YiA9IHRoaXMuZWMuY3VydmUuZGVjb2RlUG9pbnQoa2V5LCBlbmMpO1xufTtcblxuLy8gRUNESFxuS2V5UGFpci5wcm90b3R5cGUuZGVyaXZlID0gZnVuY3Rpb24gZGVyaXZlKHB1Yikge1xuICByZXR1cm4gcHViLm11bCh0aGlzLnByaXYpLmdldFgoKTtcbn07XG5cbi8vIEVDRFNBXG5LZXlQYWlyLnByb3RvdHlwZS5zaWduID0gZnVuY3Rpb24gc2lnbihtc2csIGVuYywgb3B0aW9ucykge1xuICByZXR1cm4gdGhpcy5lYy5zaWduKG1zZywgdGhpcywgZW5jLCBvcHRpb25zKTtcbn07XG5cbktleVBhaXIucHJvdG90eXBlLnZlcmlmeSA9IGZ1bmN0aW9uIHZlcmlmeShtc2csIHNpZ25hdHVyZSkge1xuICByZXR1cm4gdGhpcy5lYy52ZXJpZnkobXNnLCBzaWduYXR1cmUsIHRoaXMpO1xufTtcblxuS2V5UGFpci5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uIGluc3BlY3QoKSB7XG4gIHJldHVybiAnPEtleSBwcml2OiAnICsgKHRoaXMucHJpdiAmJiB0aGlzLnByaXYudG9TdHJpbmcoMTYsIDIpKSArXG4gICAgICAgICAnIHB1YjogJyArICh0aGlzLnB1YiAmJiB0aGlzLnB1Yi5pbnNwZWN0KCkpICsgJyA+Jztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBCTiA9IHJlcXVpcmUoJ2JuLmpzJyk7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG52YXIgYXNzZXJ0ID0gdXRpbHMuYXNzZXJ0O1xuXG5mdW5jdGlvbiBTaWduYXR1cmUob3B0aW9ucywgZW5jKSB7XG4gIGlmIChvcHRpb25zIGluc3RhbmNlb2YgU2lnbmF0dXJlKVxuICAgIHJldHVybiBvcHRpb25zO1xuXG4gIGlmICh0aGlzLl9pbXBvcnRERVIob3B0aW9ucywgZW5jKSlcbiAgICByZXR1cm47XG5cbiAgYXNzZXJ0KG9wdGlvbnMuciAmJiBvcHRpb25zLnMsICdTaWduYXR1cmUgd2l0aG91dCByIG9yIHMnKTtcbiAgdGhpcy5yID0gbmV3IEJOKG9wdGlvbnMuciwgMTYpO1xuICB0aGlzLnMgPSBuZXcgQk4ob3B0aW9ucy5zLCAxNik7XG4gIGlmIChvcHRpb25zLnJlY292ZXJ5UGFyYW0gPT09IHVuZGVmaW5lZClcbiAgICB0aGlzLnJlY292ZXJ5UGFyYW0gPSBudWxsO1xuICBlbHNlXG4gICAgdGhpcy5yZWNvdmVyeVBhcmFtID0gb3B0aW9ucy5yZWNvdmVyeVBhcmFtO1xufVxubW9kdWxlLmV4cG9ydHMgPSBTaWduYXR1cmU7XG5cbmZ1bmN0aW9uIFBvc2l0aW9uKCkge1xuICB0aGlzLnBsYWNlID0gMDtcbn1cblxuZnVuY3Rpb24gZ2V0TGVuZ3RoKGJ1ZiwgcCkge1xuICB2YXIgaW5pdGlhbCA9IGJ1ZltwLnBsYWNlKytdO1xuICBpZiAoIShpbml0aWFsICYgMHg4MCkpIHtcbiAgICByZXR1cm4gaW5pdGlhbDtcbiAgfVxuICB2YXIgb2N0ZXRMZW4gPSBpbml0aWFsICYgMHhmO1xuXG4gIC8vIEluZGVmaW5pdGUgbGVuZ3RoIG9yIG92ZXJmbG93XG4gIGlmIChvY3RldExlbiA9PT0gMCB8fCBvY3RldExlbiA+IDQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgdmFsID0gMDtcbiAgZm9yICh2YXIgaSA9IDAsIG9mZiA9IHAucGxhY2U7IGkgPCBvY3RldExlbjsgaSsrLCBvZmYrKykge1xuICAgIHZhbCA8PD0gODtcbiAgICB2YWwgfD0gYnVmW29mZl07XG4gICAgdmFsID4+Pj0gMDtcbiAgfVxuXG4gIC8vIExlYWRpbmcgemVyb2VzXG4gIGlmICh2YWwgPD0gMHg3Zikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHAucGxhY2UgPSBvZmY7XG4gIHJldHVybiB2YWw7XG59XG5cbmZ1bmN0aW9uIHJtUGFkZGluZyhidWYpIHtcbiAgdmFyIGkgPSAwO1xuICB2YXIgbGVuID0gYnVmLmxlbmd0aCAtIDE7XG4gIHdoaWxlICghYnVmW2ldICYmICEoYnVmW2kgKyAxXSAmIDB4ODApICYmIGkgPCBsZW4pIHtcbiAgICBpKys7XG4gIH1cbiAgaWYgKGkgPT09IDApIHtcbiAgICByZXR1cm4gYnVmO1xuICB9XG4gIHJldHVybiBidWYuc2xpY2UoaSk7XG59XG5cblNpZ25hdHVyZS5wcm90b3R5cGUuX2ltcG9ydERFUiA9IGZ1bmN0aW9uIF9pbXBvcnRERVIoZGF0YSwgZW5jKSB7XG4gIGRhdGEgPSB1dGlscy50b0FycmF5KGRhdGEsIGVuYyk7XG4gIHZhciBwID0gbmV3IFBvc2l0aW9uKCk7XG4gIGlmIChkYXRhW3AucGxhY2UrK10gIT09IDB4MzApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGxlbiA9IGdldExlbmd0aChkYXRhLCBwKTtcbiAgaWYgKGxlbiA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKChsZW4gKyBwLnBsYWNlKSAhPT0gZGF0YS5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKGRhdGFbcC5wbGFjZSsrXSAhPT0gMHgwMikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcmxlbiA9IGdldExlbmd0aChkYXRhLCBwKTtcbiAgaWYgKHJsZW4gPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciByID0gZGF0YS5zbGljZShwLnBsYWNlLCBybGVuICsgcC5wbGFjZSk7XG4gIHAucGxhY2UgKz0gcmxlbjtcbiAgaWYgKGRhdGFbcC5wbGFjZSsrXSAhPT0gMHgwMikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgc2xlbiA9IGdldExlbmd0aChkYXRhLCBwKTtcbiAgaWYgKHNsZW4gPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChkYXRhLmxlbmd0aCAhPT0gc2xlbiArIHAucGxhY2UpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHMgPSBkYXRhLnNsaWNlKHAucGxhY2UsIHNsZW4gKyBwLnBsYWNlKTtcbiAgaWYgKHJbMF0gPT09IDApIHtcbiAgICBpZiAoclsxXSAmIDB4ODApIHtcbiAgICAgIHIgPSByLnNsaWNlKDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBMZWFkaW5nIHplcm9lc1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBpZiAoc1swXSA9PT0gMCkge1xuICAgIGlmIChzWzFdICYgMHg4MCkge1xuICAgICAgcyA9IHMuc2xpY2UoMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIExlYWRpbmcgemVyb2VzXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgdGhpcy5yID0gbmV3IEJOKHIpO1xuICB0aGlzLnMgPSBuZXcgQk4ocyk7XG4gIHRoaXMucmVjb3ZlcnlQYXJhbSA9IG51bGw7XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBjb25zdHJ1Y3RMZW5ndGgoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA8IDB4ODApIHtcbiAgICBhcnIucHVzaChsZW4pO1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgb2N0ZXRzID0gMSArIChNYXRoLmxvZyhsZW4pIC8gTWF0aC5MTjIgPj4+IDMpO1xuICBhcnIucHVzaChvY3RldHMgfCAweDgwKTtcbiAgd2hpbGUgKC0tb2N0ZXRzKSB7XG4gICAgYXJyLnB1c2goKGxlbiA+Pj4gKG9jdGV0cyA8PCAzKSkgJiAweGZmKTtcbiAgfVxuICBhcnIucHVzaChsZW4pO1xufVxuXG5TaWduYXR1cmUucHJvdG90eXBlLnRvREVSID0gZnVuY3Rpb24gdG9ERVIoZW5jKSB7XG4gIHZhciByID0gdGhpcy5yLnRvQXJyYXkoKTtcbiAgdmFyIHMgPSB0aGlzLnMudG9BcnJheSgpO1xuXG4gIC8vIFBhZCB2YWx1ZXNcbiAgaWYgKHJbMF0gJiAweDgwKVxuICAgIHIgPSBbIDAgXS5jb25jYXQocik7XG4gIC8vIFBhZCB2YWx1ZXNcbiAgaWYgKHNbMF0gJiAweDgwKVxuICAgIHMgPSBbIDAgXS5jb25jYXQocyk7XG5cbiAgciA9IHJtUGFkZGluZyhyKTtcbiAgcyA9IHJtUGFkZGluZyhzKTtcblxuICB3aGlsZSAoIXNbMF0gJiYgIShzWzFdICYgMHg4MCkpIHtcbiAgICBzID0gcy5zbGljZSgxKTtcbiAgfVxuICB2YXIgYXJyID0gWyAweDAyIF07XG4gIGNvbnN0cnVjdExlbmd0aChhcnIsIHIubGVuZ3RoKTtcbiAgYXJyID0gYXJyLmNvbmNhdChyKTtcbiAgYXJyLnB1c2goMHgwMik7XG4gIGNvbnN0cnVjdExlbmd0aChhcnIsIHMubGVuZ3RoKTtcbiAgdmFyIGJhY2tIYWxmID0gYXJyLmNvbmNhdChzKTtcbiAgdmFyIHJlcyA9IFsgMHgzMCBdO1xuICBjb25zdHJ1Y3RMZW5ndGgocmVzLCBiYWNrSGFsZi5sZW5ndGgpO1xuICByZXMgPSByZXMuY29uY2F0KGJhY2tIYWxmKTtcbiAgcmV0dXJuIHV0aWxzLmVuY29kZShyZXMsIGVuYyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzaCA9IHJlcXVpcmUoJ2hhc2guanMnKTtcbnZhciBjdXJ2ZXMgPSByZXF1aXJlKCcuLi9jdXJ2ZXMnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG52YXIgYXNzZXJ0ID0gdXRpbHMuYXNzZXJ0O1xudmFyIHBhcnNlQnl0ZXMgPSB1dGlscy5wYXJzZUJ5dGVzO1xudmFyIEtleVBhaXIgPSByZXF1aXJlKCcuL2tleScpO1xudmFyIFNpZ25hdHVyZSA9IHJlcXVpcmUoJy4vc2lnbmF0dXJlJyk7XG5cbmZ1bmN0aW9uIEVERFNBKGN1cnZlKSB7XG4gIGFzc2VydChjdXJ2ZSA9PT0gJ2VkMjU1MTknLCAnb25seSB0ZXN0ZWQgd2l0aCBlZDI1NTE5IHNvIGZhcicpO1xuXG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBFRERTQSkpXG4gICAgcmV0dXJuIG5ldyBFRERTQShjdXJ2ZSk7XG5cbiAgdmFyIGN1cnZlID0gY3VydmVzW2N1cnZlXS5jdXJ2ZTtcbiAgdGhpcy5jdXJ2ZSA9IGN1cnZlO1xuICB0aGlzLmcgPSBjdXJ2ZS5nO1xuICB0aGlzLmcucHJlY29tcHV0ZShjdXJ2ZS5uLmJpdExlbmd0aCgpICsgMSk7XG5cbiAgdGhpcy5wb2ludENsYXNzID0gY3VydmUucG9pbnQoKS5jb25zdHJ1Y3RvcjtcbiAgdGhpcy5lbmNvZGluZ0xlbmd0aCA9IE1hdGguY2VpbChjdXJ2ZS5uLmJpdExlbmd0aCgpIC8gOCk7XG4gIHRoaXMuaGFzaCA9IGhhc2guc2hhNTEyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVERFNBO1xuXG4vKipcbiogQHBhcmFtIHtBcnJheXxTdHJpbmd9IG1lc3NhZ2UgLSBtZXNzYWdlIGJ5dGVzXG4qIEBwYXJhbSB7QXJyYXl8U3RyaW5nfEtleVBhaXJ9IHNlY3JldCAtIHNlY3JldCBieXRlcyBvciBhIGtleXBhaXJcbiogQHJldHVybnMge1NpZ25hdHVyZX0gLSBzaWduYXR1cmVcbiovXG5FRERTQS5wcm90b3R5cGUuc2lnbiA9IGZ1bmN0aW9uIHNpZ24obWVzc2FnZSwgc2VjcmV0KSB7XG4gIG1lc3NhZ2UgPSBwYXJzZUJ5dGVzKG1lc3NhZ2UpO1xuICB2YXIga2V5ID0gdGhpcy5rZXlGcm9tU2VjcmV0KHNlY3JldCk7XG4gIHZhciByID0gdGhpcy5oYXNoSW50KGtleS5tZXNzYWdlUHJlZml4KCksIG1lc3NhZ2UpO1xuICB2YXIgUiA9IHRoaXMuZy5tdWwocik7XG4gIHZhciBSZW5jb2RlZCA9IHRoaXMuZW5jb2RlUG9pbnQoUik7XG4gIHZhciBzXyA9IHRoaXMuaGFzaEludChSZW5jb2RlZCwga2V5LnB1YkJ5dGVzKCksIG1lc3NhZ2UpXG4gICAgICAgICAgICAgICAubXVsKGtleS5wcml2KCkpO1xuICB2YXIgUyA9IHIuYWRkKHNfKS51bW9kKHRoaXMuY3VydmUubik7XG4gIHJldHVybiB0aGlzLm1ha2VTaWduYXR1cmUoeyBSOiBSLCBTOiBTLCBSZW5jb2RlZDogUmVuY29kZWQgfSk7XG59O1xuXG4vKipcbiogQHBhcmFtIHtBcnJheX0gbWVzc2FnZSAtIG1lc3NhZ2UgYnl0ZXNcbiogQHBhcmFtIHtBcnJheXxTdHJpbmd8U2lnbmF0dXJlfSBzaWcgLSBzaWcgYnl0ZXNcbiogQHBhcmFtIHtBcnJheXxTdHJpbmd8UG9pbnR8S2V5UGFpcn0gcHViIC0gcHVibGljIGtleVxuKiBAcmV0dXJucyB7Qm9vbGVhbn0gLSB0cnVlIGlmIHB1YmxpYyBrZXkgbWF0Y2hlcyBzaWcgb2YgbWVzc2FnZVxuKi9cbkVERFNBLnByb3RvdHlwZS52ZXJpZnkgPSBmdW5jdGlvbiB2ZXJpZnkobWVzc2FnZSwgc2lnLCBwdWIpIHtcbiAgbWVzc2FnZSA9IHBhcnNlQnl0ZXMobWVzc2FnZSk7XG4gIHNpZyA9IHRoaXMubWFrZVNpZ25hdHVyZShzaWcpO1xuICB2YXIga2V5ID0gdGhpcy5rZXlGcm9tUHVibGljKHB1Yik7XG4gIHZhciBoID0gdGhpcy5oYXNoSW50KHNpZy5SZW5jb2RlZCgpLCBrZXkucHViQnl0ZXMoKSwgbWVzc2FnZSk7XG4gIHZhciBTRyA9IHRoaXMuZy5tdWwoc2lnLlMoKSk7XG4gIHZhciBScGx1c0FoID0gc2lnLlIoKS5hZGQoa2V5LnB1YigpLm11bChoKSk7XG4gIHJldHVybiBScGx1c0FoLmVxKFNHKTtcbn07XG5cbkVERFNBLnByb3RvdHlwZS5oYXNoSW50ID0gZnVuY3Rpb24gaGFzaEludCgpIHtcbiAgdmFyIGhhc2ggPSB0aGlzLmhhc2goKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXG4gICAgaGFzaC51cGRhdGUoYXJndW1lbnRzW2ldKTtcbiAgcmV0dXJuIHV0aWxzLmludEZyb21MRShoYXNoLmRpZ2VzdCgpKS51bW9kKHRoaXMuY3VydmUubik7XG59O1xuXG5FRERTQS5wcm90b3R5cGUua2V5RnJvbVB1YmxpYyA9IGZ1bmN0aW9uIGtleUZyb21QdWJsaWMocHViKSB7XG4gIHJldHVybiBLZXlQYWlyLmZyb21QdWJsaWModGhpcywgcHViKTtcbn07XG5cbkVERFNBLnByb3RvdHlwZS5rZXlGcm9tU2VjcmV0ID0gZnVuY3Rpb24ga2V5RnJvbVNlY3JldChzZWNyZXQpIHtcbiAgcmV0dXJuIEtleVBhaXIuZnJvbVNlY3JldCh0aGlzLCBzZWNyZXQpO1xufTtcblxuRUREU0EucHJvdG90eXBlLm1ha2VTaWduYXR1cmUgPSBmdW5jdGlvbiBtYWtlU2lnbmF0dXJlKHNpZykge1xuICBpZiAoc2lnIGluc3RhbmNlb2YgU2lnbmF0dXJlKVxuICAgIHJldHVybiBzaWc7XG4gIHJldHVybiBuZXcgU2lnbmF0dXJlKHRoaXMsIHNpZyk7XG59O1xuXG4vKipcbiogKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvZHJhZnQtam9zZWZzc29uLWVkZHNhLWVkMjU1MTktMDMjc2VjdGlvbi01LjJcbipcbiogRUREU0EgZGVmaW5lcyBtZXRob2RzIGZvciBlbmNvZGluZyBhbmQgZGVjb2RpbmcgcG9pbnRzIGFuZCBpbnRlZ2Vycy4gVGhlc2UgYXJlXG4qIGhlbHBlciBjb252ZW5pZW5jZSBtZXRob2RzLCB0aGF0IHBhc3MgYWxvbmcgdG8gdXRpbGl0eSBmdW5jdGlvbnMgaW1wbGllZFxuKiBwYXJhbWV0ZXJzLlxuKlxuKi9cbkVERFNBLnByb3RvdHlwZS5lbmNvZGVQb2ludCA9IGZ1bmN0aW9uIGVuY29kZVBvaW50KHBvaW50KSB7XG4gIHZhciBlbmMgPSBwb2ludC5nZXRZKCkudG9BcnJheSgnbGUnLCB0aGlzLmVuY29kaW5nTGVuZ3RoKTtcbiAgZW5jW3RoaXMuZW5jb2RpbmdMZW5ndGggLSAxXSB8PSBwb2ludC5nZXRYKCkuaXNPZGQoKSA/IDB4ODAgOiAwO1xuICByZXR1cm4gZW5jO1xufTtcblxuRUREU0EucHJvdG90eXBlLmRlY29kZVBvaW50ID0gZnVuY3Rpb24gZGVjb2RlUG9pbnQoYnl0ZXMpIHtcbiAgYnl0ZXMgPSB1dGlscy5wYXJzZUJ5dGVzKGJ5dGVzKTtcblxuICB2YXIgbGFzdEl4ID0gYnl0ZXMubGVuZ3RoIC0gMTtcbiAgdmFyIG5vcm1lZCA9IGJ5dGVzLnNsaWNlKDAsIGxhc3RJeCkuY29uY2F0KGJ5dGVzW2xhc3RJeF0gJiB+MHg4MCk7XG4gIHZhciB4SXNPZGQgPSAoYnl0ZXNbbGFzdEl4XSAmIDB4ODApICE9PSAwO1xuXG4gIHZhciB5ID0gdXRpbHMuaW50RnJvbUxFKG5vcm1lZCk7XG4gIHJldHVybiB0aGlzLmN1cnZlLnBvaW50RnJvbVkoeSwgeElzT2RkKTtcbn07XG5cbkVERFNBLnByb3RvdHlwZS5lbmNvZGVJbnQgPSBmdW5jdGlvbiBlbmNvZGVJbnQobnVtKSB7XG4gIHJldHVybiBudW0udG9BcnJheSgnbGUnLCB0aGlzLmVuY29kaW5nTGVuZ3RoKTtcbn07XG5cbkVERFNBLnByb3RvdHlwZS5kZWNvZGVJbnQgPSBmdW5jdGlvbiBkZWNvZGVJbnQoYnl0ZXMpIHtcbiAgcmV0dXJuIHV0aWxzLmludEZyb21MRShieXRlcyk7XG59O1xuXG5FRERTQS5wcm90b3R5cGUuaXNQb2ludCA9IGZ1bmN0aW9uIGlzUG9pbnQodmFsKSB7XG4gIHJldHVybiB2YWwgaW5zdGFuY2VvZiB0aGlzLnBvaW50Q2xhc3M7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIGFzc2VydCA9IHV0aWxzLmFzc2VydDtcbnZhciBwYXJzZUJ5dGVzID0gdXRpbHMucGFyc2VCeXRlcztcbnZhciBjYWNoZWRQcm9wZXJ0eSA9IHV0aWxzLmNhY2hlZFByb3BlcnR5O1xuXG4vKipcbiogQHBhcmFtIHtFRERTQX0gZWRkc2EgLSBpbnN0YW5jZVxuKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIC0gcHVibGljL3ByaXZhdGUga2V5IHBhcmFtZXRlcnNcbipcbiogQHBhcmFtIHtBcnJheTxCeXRlPn0gW3BhcmFtcy5zZWNyZXRdIC0gc2VjcmV0IHNlZWQgYnl0ZXNcbiogQHBhcmFtIHtQb2ludH0gW3BhcmFtcy5wdWJdIC0gcHVibGljIGtleSBwb2ludCAoYWthIGBBYCBpbiBlZGRzYSB0ZXJtcylcbiogQHBhcmFtIHtBcnJheTxCeXRlPn0gW3BhcmFtcy5wdWJdIC0gcHVibGljIGtleSBwb2ludCBlbmNvZGVkIGFzIGJ5dGVzXG4qXG4qL1xuZnVuY3Rpb24gS2V5UGFpcihlZGRzYSwgcGFyYW1zKSB7XG4gIHRoaXMuZWRkc2EgPSBlZGRzYTtcbiAgdGhpcy5fc2VjcmV0ID0gcGFyc2VCeXRlcyhwYXJhbXMuc2VjcmV0KTtcbiAgaWYgKGVkZHNhLmlzUG9pbnQocGFyYW1zLnB1YikpXG4gICAgdGhpcy5fcHViID0gcGFyYW1zLnB1YjtcbiAgZWxzZVxuICAgIHRoaXMuX3B1YkJ5dGVzID0gcGFyc2VCeXRlcyhwYXJhbXMucHViKTtcbn1cblxuS2V5UGFpci5mcm9tUHVibGljID0gZnVuY3Rpb24gZnJvbVB1YmxpYyhlZGRzYSwgcHViKSB7XG4gIGlmIChwdWIgaW5zdGFuY2VvZiBLZXlQYWlyKVxuICAgIHJldHVybiBwdWI7XG4gIHJldHVybiBuZXcgS2V5UGFpcihlZGRzYSwgeyBwdWI6IHB1YiB9KTtcbn07XG5cbktleVBhaXIuZnJvbVNlY3JldCA9IGZ1bmN0aW9uIGZyb21TZWNyZXQoZWRkc2EsIHNlY3JldCkge1xuICBpZiAoc2VjcmV0IGluc3RhbmNlb2YgS2V5UGFpcilcbiAgICByZXR1cm4gc2VjcmV0O1xuICByZXR1cm4gbmV3IEtleVBhaXIoZWRkc2EsIHsgc2VjcmV0OiBzZWNyZXQgfSk7XG59O1xuXG5LZXlQYWlyLnByb3RvdHlwZS5zZWNyZXQgPSBmdW5jdGlvbiBzZWNyZXQoKSB7XG4gIHJldHVybiB0aGlzLl9zZWNyZXQ7XG59O1xuXG5jYWNoZWRQcm9wZXJ0eShLZXlQYWlyLCAncHViQnl0ZXMnLCBmdW5jdGlvbiBwdWJCeXRlcygpIHtcbiAgcmV0dXJuIHRoaXMuZWRkc2EuZW5jb2RlUG9pbnQodGhpcy5wdWIoKSk7XG59KTtcblxuY2FjaGVkUHJvcGVydHkoS2V5UGFpciwgJ3B1YicsIGZ1bmN0aW9uIHB1YigpIHtcbiAgaWYgKHRoaXMuX3B1YkJ5dGVzKVxuICAgIHJldHVybiB0aGlzLmVkZHNhLmRlY29kZVBvaW50KHRoaXMuX3B1YkJ5dGVzKTtcbiAgcmV0dXJuIHRoaXMuZWRkc2EuZy5tdWwodGhpcy5wcml2KCkpO1xufSk7XG5cbmNhY2hlZFByb3BlcnR5KEtleVBhaXIsICdwcml2Qnl0ZXMnLCBmdW5jdGlvbiBwcml2Qnl0ZXMoKSB7XG4gIHZhciBlZGRzYSA9IHRoaXMuZWRkc2E7XG4gIHZhciBoYXNoID0gdGhpcy5oYXNoKCk7XG4gIHZhciBsYXN0SXggPSBlZGRzYS5lbmNvZGluZ0xlbmd0aCAtIDE7XG5cbiAgdmFyIGEgPSBoYXNoLnNsaWNlKDAsIGVkZHNhLmVuY29kaW5nTGVuZ3RoKTtcbiAgYVswXSAmPSAyNDg7XG4gIGFbbGFzdEl4XSAmPSAxMjc7XG4gIGFbbGFzdEl4XSB8PSA2NDtcblxuICByZXR1cm4gYTtcbn0pO1xuXG5jYWNoZWRQcm9wZXJ0eShLZXlQYWlyLCAncHJpdicsIGZ1bmN0aW9uIHByaXYoKSB7XG4gIHJldHVybiB0aGlzLmVkZHNhLmRlY29kZUludCh0aGlzLnByaXZCeXRlcygpKTtcbn0pO1xuXG5jYWNoZWRQcm9wZXJ0eShLZXlQYWlyLCAnaGFzaCcsIGZ1bmN0aW9uIGhhc2goKSB7XG4gIHJldHVybiB0aGlzLmVkZHNhLmhhc2goKS51cGRhdGUodGhpcy5zZWNyZXQoKSkuZGlnZXN0KCk7XG59KTtcblxuY2FjaGVkUHJvcGVydHkoS2V5UGFpciwgJ21lc3NhZ2VQcmVmaXgnLCBmdW5jdGlvbiBtZXNzYWdlUHJlZml4KCkge1xuICByZXR1cm4gdGhpcy5oYXNoKCkuc2xpY2UodGhpcy5lZGRzYS5lbmNvZGluZ0xlbmd0aCk7XG59KTtcblxuS2V5UGFpci5wcm90b3R5cGUuc2lnbiA9IGZ1bmN0aW9uIHNpZ24obWVzc2FnZSkge1xuICBhc3NlcnQodGhpcy5fc2VjcmV0LCAnS2V5UGFpciBjYW4gb25seSB2ZXJpZnknKTtcbiAgcmV0dXJuIHRoaXMuZWRkc2Euc2lnbihtZXNzYWdlLCB0aGlzKTtcbn07XG5cbktleVBhaXIucHJvdG90eXBlLnZlcmlmeSA9IGZ1bmN0aW9uIHZlcmlmeShtZXNzYWdlLCBzaWcpIHtcbiAgcmV0dXJuIHRoaXMuZWRkc2EudmVyaWZ5KG1lc3NhZ2UsIHNpZywgdGhpcyk7XG59O1xuXG5LZXlQYWlyLnByb3RvdHlwZS5nZXRTZWNyZXQgPSBmdW5jdGlvbiBnZXRTZWNyZXQoZW5jKSB7XG4gIGFzc2VydCh0aGlzLl9zZWNyZXQsICdLZXlQYWlyIGlzIHB1YmxpYyBvbmx5Jyk7XG4gIHJldHVybiB1dGlscy5lbmNvZGUodGhpcy5zZWNyZXQoKSwgZW5jKTtcbn07XG5cbktleVBhaXIucHJvdG90eXBlLmdldFB1YmxpYyA9IGZ1bmN0aW9uIGdldFB1YmxpYyhlbmMpIHtcbiAgcmV0dXJuIHV0aWxzLmVuY29kZSh0aGlzLnB1YkJ5dGVzKCksIGVuYyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEtleVBhaXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBCTiA9IHJlcXVpcmUoJ2JuLmpzJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIGFzc2VydCA9IHV0aWxzLmFzc2VydDtcbnZhciBjYWNoZWRQcm9wZXJ0eSA9IHV0aWxzLmNhY2hlZFByb3BlcnR5O1xudmFyIHBhcnNlQnl0ZXMgPSB1dGlscy5wYXJzZUJ5dGVzO1xuXG4vKipcbiogQHBhcmFtIHtFRERTQX0gZWRkc2EgLSBlZGRzYSBpbnN0YW5jZVxuKiBAcGFyYW0ge0FycmF5PEJ5dGVzPnxPYmplY3R9IHNpZyAtXG4qIEBwYXJhbSB7QXJyYXk8Qnl0ZXM+fFBvaW50fSBbc2lnLlJdIC0gUiBwb2ludCBhcyBQb2ludCBvciBieXRlc1xuKiBAcGFyYW0ge0FycmF5PEJ5dGVzPnxibn0gW3NpZy5TXSAtIFMgc2NhbGFyIGFzIGJuIG9yIGJ5dGVzXG4qIEBwYXJhbSB7QXJyYXk8Qnl0ZXM+fSBbc2lnLlJlbmNvZGVkXSAtIFIgcG9pbnQgZW5jb2RlZFxuKiBAcGFyYW0ge0FycmF5PEJ5dGVzPn0gW3NpZy5TZW5jb2RlZF0gLSBTIHNjYWxhciBlbmNvZGVkXG4qL1xuZnVuY3Rpb24gU2lnbmF0dXJlKGVkZHNhLCBzaWcpIHtcbiAgdGhpcy5lZGRzYSA9IGVkZHNhO1xuXG4gIGlmICh0eXBlb2Ygc2lnICE9PSAnb2JqZWN0JylcbiAgICBzaWcgPSBwYXJzZUJ5dGVzKHNpZyk7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoc2lnKSkge1xuICAgIHNpZyA9IHtcbiAgICAgIFI6IHNpZy5zbGljZSgwLCBlZGRzYS5lbmNvZGluZ0xlbmd0aCksXG4gICAgICBTOiBzaWcuc2xpY2UoZWRkc2EuZW5jb2RpbmdMZW5ndGgpXG4gICAgfTtcbiAgfVxuXG4gIGFzc2VydChzaWcuUiAmJiBzaWcuUywgJ1NpZ25hdHVyZSB3aXRob3V0IFIgb3IgUycpO1xuXG4gIGlmIChlZGRzYS5pc1BvaW50KHNpZy5SKSlcbiAgICB0aGlzLl9SID0gc2lnLlI7XG4gIGlmIChzaWcuUyBpbnN0YW5jZW9mIEJOKVxuICAgIHRoaXMuX1MgPSBzaWcuUztcblxuICB0aGlzLl9SZW5jb2RlZCA9IEFycmF5LmlzQXJyYXkoc2lnLlIpID8gc2lnLlIgOiBzaWcuUmVuY29kZWQ7XG4gIHRoaXMuX1NlbmNvZGVkID0gQXJyYXkuaXNBcnJheShzaWcuUykgPyBzaWcuUyA6IHNpZy5TZW5jb2RlZDtcbn1cblxuY2FjaGVkUHJvcGVydHkoU2lnbmF0dXJlLCAnUycsIGZ1bmN0aW9uIFMoKSB7XG4gIHJldHVybiB0aGlzLmVkZHNhLmRlY29kZUludCh0aGlzLlNlbmNvZGVkKCkpO1xufSk7XG5cbmNhY2hlZFByb3BlcnR5KFNpZ25hdHVyZSwgJ1InLCBmdW5jdGlvbiBSKCkge1xuICByZXR1cm4gdGhpcy5lZGRzYS5kZWNvZGVQb2ludCh0aGlzLlJlbmNvZGVkKCkpO1xufSk7XG5cbmNhY2hlZFByb3BlcnR5KFNpZ25hdHVyZSwgJ1JlbmNvZGVkJywgZnVuY3Rpb24gUmVuY29kZWQoKSB7XG4gIHJldHVybiB0aGlzLmVkZHNhLmVuY29kZVBvaW50KHRoaXMuUigpKTtcbn0pO1xuXG5jYWNoZWRQcm9wZXJ0eShTaWduYXR1cmUsICdTZW5jb2RlZCcsIGZ1bmN0aW9uIFNlbmNvZGVkKCkge1xuICByZXR1cm4gdGhpcy5lZGRzYS5lbmNvZGVJbnQodGhpcy5TKCkpO1xufSk7XG5cblNpZ25hdHVyZS5wcm90b3R5cGUudG9CeXRlcyA9IGZ1bmN0aW9uIHRvQnl0ZXMoKSB7XG4gIHJldHVybiB0aGlzLlJlbmNvZGVkKCkuY29uY2F0KHRoaXMuU2VuY29kZWQoKSk7XG59O1xuXG5TaWduYXR1cmUucHJvdG90eXBlLnRvSGV4ID0gZnVuY3Rpb24gdG9IZXgoKSB7XG4gIHJldHVybiB1dGlscy5lbmNvZGUodGhpcy50b0J5dGVzKCksICdoZXgnKS50b1VwcGVyQ2FzZSgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTaWduYXR1cmU7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgZG91Ymxlczoge1xuICAgIHN0ZXA6IDQsXG4gICAgcG9pbnRzOiBbXG4gICAgICBbXG4gICAgICAgICdlNjBmY2U5M2I1OWU5ZWM1MzAxMWFhYmMyMWMyM2U5N2IyYTMxMzY5Yjg3YTVhZTljNDRlZTg5ZTJhNmRlYzBhJyxcbiAgICAgICAgJ2Y3ZTM1MDczOTllNTk1OTI5ZGI5OWYzNGY1NzkzNzEwMTI5Njg5MWU0NGQyM2YwYmUxZjMyY2NlNjk2MTY4MjEnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnODI4MjI2MzIxMmM2MDlkOWVhMmE2ZTNlMTcyZGUyMzhkOGMzOWNhYmQ1YWMxY2ExMDY0NmUyM2ZkNWY1MTUwOCcsXG4gICAgICAgICcxMWY4YTgwOTg1NTdkZmU0NWU4MjU2ZTgzMGI2MGFjZTYyZDYxM2FjMmY3YjE3YmVkMzFiNmVhZmY2ZTI2Y2FmJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzE3NWUxNTlmNzI4Yjg2NWE3MmY5OWNjNmM2ZmM4NDZkZTBiOTM4MzNmZDIyMjJlZDczZmNlNWI1NTFlNWI3MzknLFxuICAgICAgICAnZDM1MDZlMGQ5ZTNjNzllYmE0ZWY5N2E1MWZmNzFmNWVhY2I1OTU1YWRkMjQzNDVjNmVmYTZmZmVlOWZlZDY5NSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICczNjNkOTBkNDQ3YjAwYzljOTljZWFjMDViNjI2MmVlMDUzNDQxYzdlNTU1NTJmZmU1MjZiYWQ4ZjgzZmY0NjQwJyxcbiAgICAgICAgJzRlMjczYWRmYzczMjIyMTk1M2I0NDUzOTdmMzM2MzE0NWI5YTg5MDA4MTk5ZWNiNjIwMDNjN2YzYmVlOWRlOSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc4YjRiNWYxNjVkZjNjMmJlOGM2MjQ0YjViNzQ1NjM4ODQzZTRhNzgxYTE1YmNkMWI2OWY3OWE1NWRmZmRmODBjJyxcbiAgICAgICAgJzRhYWQwYTZmNjhkMzA4YjRiM2ZiZDc4MTNhYjBkYTA0ZjllMzM2NTQ2MTYyZWU1NmIzZWZmMGM2NWZkNGZkMzYnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnNzIzY2JhYTZlNWRiOTk2ZDZiZjc3MWMwMGJkNTQ4YzdiNzAwZGJmZmE2YzBlNzdiY2I2MTE1OTI1MjMyZmNkYScsXG4gICAgICAgICc5NmU4NjdiNTU5NWNjNDk4YTkyMTEzNzQ4ODgyNGQ2ZTI2NjBhMDY1Mzc3OTQ5NDgwMWRjMDY5ZDllYjM5ZjVmJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2VlYmZhNGQ0OTNiZWJmOThiYTVmZWVjODEyYzJkM2I1MDk0Nzk2MTIzN2E5MTk4MzlhNTMzZWNhMGU3ZGQ3ZmEnLFxuICAgICAgICAnNWQ5YThjYTM5NzBlZjBmMjY5ZWU3ZWRhZjE3ODA4OWQ5YWU0Y2RjM2E3MTFmNzEyZGRmZDRmZGFlMWRlODk5OSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICcxMDBmNDRkYTY5NmU3MTY3Mjc5MWQwYTA5YjdiZGU0NTlmMTIxNWEyOWIzYzAzYmZlZmQ3ODM1YjM5YTQ4ZGIwJyxcbiAgICAgICAgJ2NkZDllMTMxOTJhMDBiNzcyZWM4ZjMzMDBjMDkwNjY2YjdmZjRhMThmZjUxOTVhYzBmYmQ1Y2Q2MmJjNjVhMDknXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZTEwMzFiZTI2MmM3ZWQxYjFkYzkyMjdhNGEwNGMwMTdhNzdmOGQ0NDY0ZjNiMzg1MmM4YWNkZTZlNTM0ZmQyZCcsXG4gICAgICAgICc5ZDcwNjE5Mjg5NDA0MDVlNmJiNmE0MTc2NTk3NTM1YWYyOTJkZDQxOWUxY2VkNzlhNDRmMThmMjk0NTZhMDBkJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2ZlZWE2Y2FlNDZkNTViNTMwYWMyODM5ZjE0M2JkN2VjNWNmOGIyNjZhNDFkNmFmNTJkNWU2ODhkOTA5NDY5NmQnLFxuICAgICAgICAnZTU3YzZiNmM5N2RjZTFiYWIwNmU0ZTEyYmYzZWNkNWM5ODFjODk1N2NjNDE0NDJkMzE1NWRlYmYxODA5MDA4OCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdkYTY3YTkxZDkxMDQ5Y2RjYjM2N2JlNGJlNmZmY2EzY2ZlZWQ2NTdkODA4NTgzZGUzM2ZhOTc4YmMxZWM2Y2IxJyxcbiAgICAgICAgJzliYWNhYTM1NDgxNjQyYmM0MWY0NjNmN2VjOTc4MGU1ZGVjN2FkYzUwOGY3NDBhMTdlOWVhOGUyN2E2OGJlMWQnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnNTM5MDRmYWEwYjMzNGNkZGE2ZTAwMDkzNWVmMjIxNTFlYzA4ZDBmN2JiMTEwNjlmNTc1NDVjY2MxYTM3YjdjMCcsXG4gICAgICAgICc1YmMwODdkMGJjODAxMDZkODhjOWVjY2FjMjBkM2MxYzEzOTk5OTgxZTE0NDM0Njk5ZGNiMDk2YjAyMjc3MWM4J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzhlN2JjZDBiZDM1OTgzYTc3MTljY2E3NzY0Y2E5MDY3NzliNTNhMDQzYTliOGJjYWVmZjk1OWY0M2FkODYwNDcnLFxuICAgICAgICAnMTBiNzc3MGIyYTNkYTRiMzk0MDMxMDQyMGNhOTUxNDU3OWU4OGUyZTQ3ZmQ2OGIzZWExMDA0N2U4NDYwMzcyYSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICczODVlZWQzNGMxY2RmZjIxZTZkMDgxODY4OWI4MWJkZTcxYTdmNGYxODM5N2U2NjkwYTg0MWUxNTk5YzQzODYyJyxcbiAgICAgICAgJzI4M2JlYmMzZThlYTIzZjU2NzAxZGUxOWU5ZWJmNDU3NmIzMDRlZWMyMDg2ZGM4Y2MwNDU4ZmU1NTQyZTU0NTMnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnNmY5ZDliODAzZWNmMTkxNjM3YzczYTQ0MTNkZmExODBmZGRmODRhNTk0N2ZiYzljNjA2ZWQ4NmMzZmFjM2E3JyxcbiAgICAgICAgJzdjODBjNjhlNjAzMDU5YmE2OWI4ZTJhMzBlNDVjNGQ0N2VhNGRkMmY1YzI4MTAwMmQ4Njg5MDYwM2E4NDIxNjAnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnMzMyMmQ0MDEyNDNjNGUyNTgyYTIxNDdjMTA0ZDZlY2JmNzc0ZDE2M2RiMGY1ZTUzMTNiN2UwZTc0MmQwZTZiZCcsXG4gICAgICAgICc1NmU3MDc5N2U5NjY0ZWY1YmZiMDE5YmM0ZGRhZjliNzI4MDVmNjNlYTI4NzNhZjYyNGYzYTJlOTZjMjhiMmEwJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzg1NjcyYzdkMmRlMGI3ZGEyYmQxNzcwZDg5NjY1ODY4NzQxYjNmOWFmNzY0MzM5NzcyMWQ3NGQyODEzNGFiODMnLFxuICAgICAgICAnN2M0ODFiOWI1YjQzYjJlYjYzNzQwNDliZmE2MmMyZTVlNzdmMTdmY2M1Mjk4ZjQ0YzhlMzA5NGY3OTAzMTNhNidcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc5NDhiZjgwOWIxOTg4YTQ2YjA2YzlmMTkxOTQxM2IxMGY5MjI2YzYwZjY2ODgzMmZmZDk1OWFmNjBjODJhMGEnLFxuICAgICAgICAnNTNhNTYyODU2ZGNiNjY0NmRjNmI3NGM1ZDFjMzQxOGM2ZDRkZmYwOGM5N2NkMmJlZDRjYjdmODhkOGM4ZTU4OSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc2MjYwY2U3ZjQ2MTgwMWMzNGYwNjdjZTBmMDI4NzNhOGYxYjBlNDRkZmM2OTc1MmFjY2VjZDgxOWYzOGZkOGU4JyxcbiAgICAgICAgJ2JjMmRhODJiNmZhNWI1NzFhN2YwOTA0OTc3NmExZWY3ZWNkMjkyMjM4MDUxYzE5OGMxYTg0ZTk1YjJiNGFlMTcnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZTUwMzdkZTBhZmMxZDhkNDNkODM0ODQxNGJiZjQxMDMwNDNlYzhmNTc1YmZkYzQzMjk1M2NjOGQyMDM3ZmEyZCcsXG4gICAgICAgICc0NTcxNTM0YmFhOTRkM2I1ZjlmOThkMDlmYjk5MGJkZGJkNWY1YjAzZWM0ODFmMTBlMGU1ZGM4NDFkNzU1YmRhJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2UwNjM3MmIwZjRhMjA3YWRmNWVhOTA1ZThmMTc3MWI0ZTdlOGRiZDFjNmE2YzViNzI1ODY2YTBhZTRmY2U3MjUnLFxuICAgICAgICAnN2E5MDg5NzRiY2UxOGNmZTEyYTI3YmIyYWQ1YTQ4OGNkNzQ4NGE3Nzg3MTA0ODcwYjI3MDM0Zjk0ZWVlMzFkZCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICcyMTNjN2E3MTVjZDVkNDUzNThkMGJiZjlkYzBjZTAyMjA0YjEwYmRkZTJhM2Y1ODU0MGFkNjkwOGQwNTU5NzU0JyxcbiAgICAgICAgJzRiNmRhZDBiNWFlNDYyNTA3MDEzYWQwNjI0NWJhMTkwYmI0ODUwZjVmMzZhN2VlZGRmZjJjMjc1MzRiNDU4ZjInXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnNGU3YzI3MmE3YWY0YjM0ZThkYmI5MzUyYTU0MTlhODdlMjgzOGM3MGFkYzYyY2RkZjBjYzNhM2IwOGZiZDUzYycsXG4gICAgICAgICcxNzc0OWM3NjZjOWQwYjE4ZTE2ZmQwOWY2ZGVmNjgxYjUzMGI5NjE0YmZmN2RkMzNlMGIzOTQxODE3ZGNhYWU2J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2ZlYTc0ZTNkYmU3NzhiMWIxMGYyMzhhZDYxNjg2YWE1Yzc2ZTNkYjJiZTQzMDU3NjMyNDI3ZTI4NDBmYjI3YjYnLFxuICAgICAgICAnNmUwNTY4ZGI5YjBiMTMyOTdjZjY3NGRlY2NiNmFmOTMxMjZiNTk2Yjk3M2Y3Yjc3NzAxZDNkYjdmMjNjYjk2ZidcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc3NmU2NDExM2Y2NzdjZjBlMTBhMjU3MGQ1OTk5NjhkMzE1NDRlMTc5Yjc2MDQzMjk1MmMwMmE0NDE3YmRkZTM5JyxcbiAgICAgICAgJ2M5MGRkZjhkZWU0ZTk1Y2Y1NzcwNjZkNzA2ODFmMGQzNWUyYTMzZDJiNTZkMjAzMmI0YjE3NTJkMTkwMWFjMDEnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnYzczOGM1NmIwM2IyYWJlMWU4MjgxYmFhNzQzZjhmOWE4ZjdjYzY0M2RmMjZjYmVlM2FiMTUwMjQyYmNiYjg5MScsXG4gICAgICAgICc4OTNmYjU3ODk1MWFkMjUzN2Y3MThmMmVhY2JmYmJiYjgyMzE0ZWVmNzg4MGNmZTkxN2U3MzVkOTY5OWE4NGMzJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2Q4OTU2MjY1NDhiNjViODFlMjY0Yzc2MzdjOTcyODc3ZDFkNzJlNWYzYTkyNTAxNDM3MmU5ZjY1ODhmNmMxNGInLFxuICAgICAgICAnZmViZmFhMzhmMmJjN2VhZTcyOGVjNjA4MThjMzQwZWIwMzQyOGQ2MzJiYjA2N2UxNzkzNjNlZDc1ZDdkOTkxZidcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdiOGRhOTQwMzJhOTU3NTE4ZWIwZjY0MzM1NzFlODc2MWNlZmZjNzM2OTNlODRlZGQ0OTE1MGE1NjRmNjc2ZTAzJyxcbiAgICAgICAgJzI4MDRkZmE0NDgwNWExZTRkN2M5OWNjOTc2MjgwOGIwOTJjYzU4NGQ5NWZmM2I1MTE0ODhlNGU3NGVmZGY2ZTcnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZTgwZmVhMTQ0NDFmYjMzYTdkOGFkYWI5NDc1ZDdmYWIyMDE5ZWZmYjUxNTZhNzkyZjFhMTE3NzhlM2MwZGY1ZCcsXG4gICAgICAgICdlZWQxZGU3ZjYzOGUwMDc3MWU4OTc2OGNhM2NhOTQ0NzJkMTU1ZTgwYWYzMjJlYTlmY2I0MjkxYjZhYzllYzc4J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2EzMDE2OTdiZGZjZDcwNDMxM2JhNDhlNTFkNTY3NTQzZjJhMTgyMDMxZWZkNjkxNWRkYzA3YmJjYzRlMTYwNzAnLFxuICAgICAgICAnNzM3MGY5MWNmYjY3ZTRmNTA4MTgwOWZhMjVkNDBmOWIxNzM1ZGJmN2MwYTExYTEzMGMwZDFhMDQxZTE3N2VhMSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc5MGFkODViMzg5ZDZiOTM2NDYzZjlkMDUxMjY3OGRlMjA4Y2MzMzBiMTEzMDdmZmZhYjdhYzYzZTNmYjA0ZWQ0JyxcbiAgICAgICAgJ2U1MDdhMzYyMGEzODI2MWFmZmRjYmQ5NDI3MjIyYjgzOWFlZmFiZTE1ODI4OTRkOTkxZDRkNDhjYjZlZjE1MCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc4ZjY4YjlkMmY2M2I1ZjMzOTIzOWMxYWQ5ODFmMTYyZWU4OGM1Njc4NzIzZWEzMzUxYjdiNDQ0YzllYzRjMGRhJyxcbiAgICAgICAgJzY2MmE5ZjJkYmEwNjM5ODZkZTFkOTBjMmI2YmUyMTVkYmJlYTJjZmU5NTUxMGJmZGYyM2NiZjc5NTAxZmZmODInXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZTRmM2ZiMDE3NmFmODVkNjVmZjk5ZmY5MTk4YzM2MDkxZjQ4ZTg2NTAzNjgxZTNlNjY4NmZkNTA1MzIzMWUxMScsXG4gICAgICAgICcxZTYzNjMzYWQwZWY0ZjFjMTY2MWE2ZDBlYTAyYjcyODZjYzdlNzRlYzk1MWQxYzk4MjJjMzg1NzZmZWI3M2JjJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzhjMDBmYTliMThlYmYzMzFlYjk2MTUzN2E0NWE0MjY2YzcwMzRmMmYwZDRlMWQwNzE2ZmI2ZWFlMjBlYWUyOWUnLFxuICAgICAgICAnZWZhNDcyNjdmZWE1MjFhMWE5ZGMzNDNhMzczNmM5NzRjMmZhZGFmYTgxZTM2YzU0ZTdkMmE0YzY2NzAyNDE0YidcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdlN2EyNmNlNjlkZDQ4MjlmM2UxMGNlYzBhOWU5OGVkMzE0M2QwODRmMzA4YjkyYzA5OTdmZGRmYzYwY2IzZTQxJyxcbiAgICAgICAgJzJhNzU4ZTMwMGZhNzk4NGI0NzFiMDA2YTFhYWZiYjE4ZDBhNmIyYzA0MjBlODNlMjBlOGE5NDIxY2YyY2ZkNTEnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnYjY0NTllMGVlMzY2MmVjOGQyMzU0MGMyMjNiY2JkYzU3MWNiY2I5NjdkNzk0MjRmM2NmMjllYjNkZTZiODBlZicsXG4gICAgICAgICc2N2M4NzZkMDZmM2UwNmRlMWRhZGYxNmU1NjYxZGIzYzRiM2FlNmQ0OGUzNWIyZmYzMGJmMGI2MWE3MWJhNDUnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZDY4YTgwYzgyODBiYjg0MDc5MzIzNGFhMTE4ZjA2MjMxZDZmMWZjNjdlNzNjNWE1ZGVkYTBmNWI0OTY5NDNlOCcsXG4gICAgICAgICdkYjhiYTlmZmY0YjU4NmQwMGM0YjFmOTE3N2IwZTI4YjViMGU3YjhmNzg0NTI5NWEyOTRjODQyNjZiMTMzMTIwJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzMyNGFlZDdkZjY1YzgwNDI1MmRjMDI3MDkwN2EzMGIwOTYxMmFlYjk3MzQ0OWNlYTQwOTU5ODBmYzI4ZDNkNWQnLFxuICAgICAgICAnNjQ4YTM2NTc3NGI2MWYyZmYxMzBjMGMzNWFlYzFmNGYxOTIxM2IwYzdlMzMyODQzOTY3MjI0YWY5NmFiN2M4NCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc0ZGY5YzE0OTE5Y2RlNjFmNmQ1MWRmZGJlNWZlZTVkY2VlYzQxNDNiYThkMWNhODg4ZThiZDM3M2ZkMDU0Yzk2JyxcbiAgICAgICAgJzM1ZWM1MTA5MmQ4NzI4MDUwOTc0YzIzYTFkODVkNGI1ZDUwNmNkYzI4ODQ5MDE5MmViYWMwNmNhZDEwZDVkJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzljMzkxOWE4NGE0NzQ4NzBmYWVkOGE5YzFjYzY2MDIxNTIzNDg5MDU0ZDdmMDMwOGNiZmM5OWM4YWMxZjk4Y2QnLFxuICAgICAgICAnZGRiODRmMGY0YTRkZGQ1NzU4NGYwNDRiZjI2MGU2NDE5MDUzMjZmNzZjNjRjOGU2YmU3ZTVlMDNkNGZjNTk5ZCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc2MDU3MTcwYjFkZDEyZmRmOGRlMDVmMjgxZDhlMDZiYjkxZTE0OTNhOGI5MWQ0Y2M1YTIxMzgyMTIwYTk1OWU1JyxcbiAgICAgICAgJzlhMWFmMGIyNmE2YTQ4MDdhZGQ5YTJkYWY3MWRmMjYyNDY1MTUyYmMzZWUyNGM2NWU4OTliZTkzMjM4NWEyYTgnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnYTU3NmRmOGUyM2EwODQxMTQyMTQzOWE0NTE4ZGEzMTg4MGNlZjBmYmE3ZDRkZjEyYjFhNjk3M2VlY2I5NDI2NicsXG4gICAgICAgICc0MGE2YmYyMGU3NjY0MGIyYzkyYjk3YWZlNThjZDgyYzQzMmUxMGE3ZjUxNGQ5ZjNlZThiZTExYWUxYjI4ZWM4J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzc3NzhhNzhjMjhkZWMzZTMwYTA1ZmU5NjI5ZGU4YzM4YmIzMGQxZjVjZjlhM2EyMDhmNzYzODg5YmU1OGFkNzEnLFxuICAgICAgICAnMzQ2MjZkOWFiNWE1YjIyZmY3MDk4ZTEyZjJmZjU4MDA4N2IzODQxMWZmMjRhYzU2M2I1MTNmYzFmZDlmNDNhYydcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc5Mjg5NTVlZTYzN2E4NDQ2MzcyOWZkMzBlN2FmZDJlZDVmOTYyNzRlNWFkN2U1Y2IwOWVkYTljMDZkOTAzYWMnLFxuICAgICAgICAnYzI1NjIxMDAzZDNmNDJhODI3Yjc4YTEzMDkzYTk1ZWVhYzNkMjZlZmE4YThkODNmYzUxODBlOTM1YmNkMDkxZidcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc4NWQwZmVmM2VjNmRiMTA5Mzk5MDY0ZjNhMGUzYjI4NTU2NDViNGE5MDdhZDM1NDUyN2FhZTc1MTYzZDgyNzUxJyxcbiAgICAgICAgJzFmMDM2NDg0MTNhMzhjMGJlMjlkNDk2ZTU4MmNmNTY2M2U4NzUxZTk2ODc3MzMxNTgyYzIzN2EyNGViMWY5NjInXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZmYyYjBkY2U5N2VlY2U5N2MxYzliNjA0MTc5OGI4NWRmZGZiNmQ4ODgyZGEyMDMwOGY1NDA0ODI0NTI2MDg3ZScsXG4gICAgICAgICc0OTNkMTNmZWY1MjRiYTE4OGFmNGM0ZGM1NGQwNzkzNmM3YjdlZDZmYjkwZTJjZWIyYzk1MWUwMWYwYzI5OTA3J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzgyN2ZiYmU0YjFlODgwZWE5ZWQyYjJlNjMwMWIyMTJiNTdmMWVlMTQ4Y2Q2ZGQyODc4MGU1ZTJjZjg1NmUyNDEnLFxuICAgICAgICAnYzYwZjljOTIzYzcyN2IwYjcxYmVmMmM2N2QxZDEyNjg3ZmY3YTYzMTg2OTAzMTY2ZDYwNWI2OGJhZWMyOTNlYydcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdlYWE2NDlmMjFmNTFiZGJhZTdiZTRhZTM0Y2U2ZTUyMTdhNThmZGNlN2Y0N2Y5YWE3ZjNiNThmYTIxMjBlMmIzJyxcbiAgICAgICAgJ2JlMzI3OWVkNWJiYmIwM2FjNjlhODBmODk4NzlhYTVhMDFhNmI5NjVmMTNmN2U1OWQ0N2E1MzA1YmE1YWQ5M2QnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZTRhNDJkNDNjNWNmMTY5ZDkzOTFkZjZkZWNmNDJlZTU0MWI2ZDhmMGM5YTEzNzQwMWUyMzYzMmRkYTM0ZDI0ZicsXG4gICAgICAgICc0ZDlmOTJlNzE2ZDFjNzM1MjZmYzk5Y2NmYjhhZDM0Y2U4ODZlZWRmYThkOGU0ZjEzYTdmNzEzMWRlYmE5NDE0J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzFlYzgwZmVmMzYwY2JkZDk1NDE2MGZhZGFiMzUyYjZiOTJiNTM1NzZhODhmZWE0OTQ3MTczYjlkNDMwMGJmMTknLFxuICAgICAgICAnYWVlZmU5Mzc1NmI1MzQwZDJmM2E0OTU4YTdhYmJmNWUwMTQ2ZTc3ZjYyOTVhMDdiNjcxY2RjMWNjMTA3Y2VmZCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICcxNDZhNzc4YzA0NjcwYzJmOTFiMDBhZjQ2ODBkZmE4YmNlMzQ5MDcxN2Q1OGJhODg5ZGRiNTkyODM2NjY0MmJlJyxcbiAgICAgICAgJ2IzMThlMGVjMzM1NDAyOGFkZDY2OTgyN2Y5ZDRiMjg3MGFhYTk3MWQyZjdlNWVkMWQwYjI5NzQ4M2Q4M2VmZDAnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZmE1MGMwZjYxZDIyZTVmMDdlM2FjZWJiMWFhMDdiMTI4ZDAwMTIyMDlhMjhiOTc3NmQ3NmE4NzkzMTgwZWVmOScsXG4gICAgICAgICc2Yjg0YzY5MjIzOTdlYmE5YjcyY2QyODcyMjgxYTY4YTVlNjgzMjkzYTU3YTIxM2IzOGNkOGQ3ZDNmNGYyODExJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2RhMWQ2MWQwY2E3MjFhMTFiMWE1YmY2YjdkODhlODQyMWEyODhhYjVkNWJiYTUyMjBlNTNkMzJiNWYwNjdlYzInLFxuICAgICAgICAnODE1N2Y1NWE3Yzk5MzA2Yzc5YzA3NjYxNjFjOTFlMjk2NmE3Mzg5OWQyNzliNDhhNjU1ZmJhMGYxYWQ4MzZmMSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdhOGUyODJmZjBjOTcwNjkwNzIxNWZmOThlOGZkNDE2NjE1MzExZGUwNDQ2ZjFlMDYyYTczYjA2MTBkMDY0ZTEzJyxcbiAgICAgICAgJzdmOTczNTViOGRiODFjMDlhYmZiN2YzYzViMjUxNTg4OGI2NzlhM2U1MGRkNmJkNmNlZjdjNzMxMTFmNGNjMGMnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnMTc0YTUzYjljOWEyODU4NzJkMzllNTZlNjkxM2NhYjE1ZDU5YjFmYTUxMjUwOGMwMjJmMzgyZGU4MzE5NDk3YycsXG4gICAgICAgICdjY2M5ZGMzN2FiZmM5YzE2NTdiNDE1NWYyYzQ3ZjllNjY0NmIzYTFkOGNiOTg1NDM4M2RhMTNhYzA3OWFmYTczJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzk1OTM5Njk4MTk0Mzc4NWMzZDNlNTdlZGY1MDE4Y2RiZTAzOWU3MzBlNDkxOGIzZDg4NGZkZmYwOTQ3NWI3YmEnLFxuICAgICAgICAnMmU3ZTU1Mjg4OGMzMzFkZDhiYTAzODZhNGI5Y2Q2ODQ5YzY1M2Y2NGM4NzA5Mzg1ZTliOGFiZjg3NTI0ZjJmZCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdkMmE2M2E1MGFlNDAxZTU2ZDY0NWExMTUzYjEwOWE4ZmNjYTBhNDNkNTYxZmJhMmRiYjUxMzQwYzlkODJiMTUxJyxcbiAgICAgICAgJ2U4MmQ4NmZiNjQ0M2ZjYjc1NjVhZWU1OGIyOTQ4MjIwYTcwZjc1MGFmNDg0Y2E1MmQ0MTQyMTc0ZGNmODk0MDUnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnNjQ1ODdlMjMzNTQ3MWViODkwZWU3ODk2ZDdjZmRjODY2YmFjYmRiZDM4MzkzMTdiMzQzNmY5YjQ1NjE3ZTA3MycsXG4gICAgICAgICdkOTlmY2RkNWJmNjkwMmUyYWU5NmRkNjQ0N2MyOTlhMTg1YjkwYTM5MTMzYWVhYjM1ODI5OWU1ZTlmYWY2NTg5J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzg0ODFiZGUwZTRlNGQ4ODViM2E1NDZkM2U1NDlkZTA0MmYwYWE2Y2VhMjUwZTdmZDM1OGQ2Yzg2ZGQ0NWU0NTgnLFxuICAgICAgICAnMzhlZTdiOGNiYTU0MDRkZDg0YTI1YmYzOWNlY2IyY2E5MDBhNzljNDJiMjYyZTU1NmQ2NGIxYjU5Nzc5MDU3ZSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICcxMzQ2NGE1N2E3ODEwMmFhNjJiNjk3OWFlODE3ZjQ2MzdmZmNmZWQzYzRiMWNlMzBiY2Q2MzAzZjZjYWY2NjZiJyxcbiAgICAgICAgJzY5YmUxNTkwMDQ2MTQ1ODBlZjdlNDMzNDUzY2NiMGNhNDhmMzAwYTgxZDA5NDJlMTNmNDk1YTkwN2Y2ZWNjMjcnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnYmM0YTlkZjViNzEzZmUyZTlhZWY0MzBiY2MxZGM5N2EwY2Q5Y2NlZGUyZjI4NTg4Y2FkYTNhMGQyZDgzZjM2NicsXG4gICAgICAgICdkM2E4MWNhNmU3ODVjMDYzODM5MzdhZGY0Yjc5OGNhYTZlOGE5ZmJmYTU0N2IxNmQ3NThkNjY2NTgxZjMzYzEnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnOGMyOGE5N2JmODI5OGJjMGQyM2Q4Yzc0OTQ1MmEzMmU2OTRiNjVlMzBhOTQ3MmEzOTU0YWIzMGZlNTMyNGNhYScsXG4gICAgICAgICc0MGEzMDQ2M2EzMzA1MTkzMzc4ZmVkZjMxZjdjYzBlYjdhZTc4NGYwNDUxY2I5NDU5ZTcxZGM3M2NiZWY5NDgyJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzhlYTk2NjYxMzk1MjdhOGMxZGQ5NGNlNGYwNzFmZDIzYzhiMzUwYzVhNGJiMzM3NDhjNGJhMTExZmFjY2FlMCcsXG4gICAgICAgICc2MjBlZmFiYmM4ZWUyNzgyZTI0ZTdjMGNmYjk1YzVkNzM1Yjc4M2JlOWNmMGY4ZTk1NWFmMzRhMzBlNjJiOTQ1J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2RkMzYyNWZhZWY1YmEwNjA3NDY2OTcxNmJiZDM3ODhkODliZGRlODE1OTU5OTY4MDkyZjc2Y2M0ZWI5YTk3ODcnLFxuICAgICAgICAnN2ExODhmYTM1MjBlMzBkNDYxZGEyNTAxMDQ1NzMxY2E5NDE0NjE5ODI4ODMzOTU5MzdmNjhkMDBjNjQ0YTU3MydcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdmNzEwZDc5ZDllYjk2MjI5N2U0ZjYyMzJiNDBlOGY3ZmViMmJjNjM4MTQ2MTRkNjkyYzEyZGU3NTI0MDgyMjFlJyxcbiAgICAgICAgJ2VhOThlNjcyMzJkM2IzMjk1ZDNiNTM1NTMyMTE1Y2NhYzg2MTJjNzIxODUxNjE3NTI2YWU0N2E5Yzc3YmZjODInXG4gICAgICBdXG4gICAgXVxuICB9LFxuICBuYWY6IHtcbiAgICB3bmQ6IDcsXG4gICAgcG9pbnRzOiBbXG4gICAgICBbXG4gICAgICAgICdmOTMwOGEwMTkyNThjMzEwNDkzNDRmODVmODlkNTIyOWI1MzFjODQ1ODM2Zjk5YjA4NjAxZjExM2JjZTAzNmY5JyxcbiAgICAgICAgJzM4OGY3YjBmNjMyZGU4MTQwZmUzMzdlNjJhMzdmMzU2NjUwMGE5OTkzNGMyMjMxYjZjYjlmZDc1ODRiOGU2NzInXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnMmY4YmRlNGQxYTA3MjA5MzU1YjRhNzI1MGE1YzUxMjhlODhiODRiZGRjNjE5YWI3Y2JhOGQ1NjliMjQwZWZlNCcsXG4gICAgICAgICdkOGFjMjIyNjM2ZTVlM2Q2ZDRkYmE5ZGRhNmM5YzQyNmY3ODgyNzFiYWIwZDY4NDBkY2E4N2QzYWE2YWM2MmQ2J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzVjYmRmMDY0NmU1ZGI0ZWFhMzk4ZjM2NWYyZWE3YTBlM2Q0MTliN2UwMzMwZTM5Y2U5MmJkZGVkY2FjNGY5YmMnLFxuICAgICAgICAnNmFlYmNhNDBiYTI1NTk2MGEzMTc4ZDZkODYxYTU0ZGJhODEzZDBiODEzZmRlN2I1YTUwODI2MjgwODcyNjRkYSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdhY2Q0ODRlMmYwYzdmNjUzMDlhZDE3OGE5ZjU1OWFiZGUwOTc5Njk3NGM1N2U3MTRjMzVmMTEwZGZjMjdjY2JlJyxcbiAgICAgICAgJ2NjMzM4OTIxYjBhN2Q5ZmQ2NDM4MDk3MTc2M2I2MWU5YWRkODg4YTQzNzVmOGUwZjA1Y2MyNjJhYzY0ZjljMzcnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnNzc0YWU3Zjg1OGE5NDExZTVlZjQyNDZiNzBjNjVhYWM1NjQ5OTgwYmU1YzE3ODkxYmJlYzE3ODk1ZGEwMDhjYicsXG4gICAgICAgICdkOTg0YTAzMmViNmI1ZTE5MDI0M2RkNTZkN2I3YjM2NTM3MmRiMWUyZGZmOWQ2YTgzMDFkNzRjOWM5NTNjNjFiJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2YyODc3M2MyZDk3NTI4OGJjN2QxZDIwNWMzNzQ4NjUxYjA3NWZiYzY2MTBlNThjZGRlZWRkZjhmMTk0MDVhYTgnLFxuICAgICAgICAnYWIwOTAyZThkODgwYTg5NzU4MjEyZWI2NWNkYWY0NzNhMWEwNmRhNTIxZmE5MWYyOWI1Y2I1MmRiMDNlZDgxJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2Q3OTI0ZDRmN2Q0M2VhOTY1YTQ2NWFlMzA5NWZmNDExMzFlNTk0NmYzYzg1Zjc5ZTQ0YWRiY2Y4ZTI3ZTA4MGUnLFxuICAgICAgICAnNTgxZTI4NzJhODZjNzJhNjgzODQyZWMyMjhjYzZkZWZlYTQwYWYyYmQ4OTZkM2E1YzUwNGRjOWZmNmEyNmI1OCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdkZWZkZWE0Y2RiNjc3NzUwYTQyMGZlZTgwN2VhY2YyMWViOTg5OGFlNzliOTc2ODc2NmU0ZmFhMDRhMmQ0YTM0JyxcbiAgICAgICAgJzQyMTFhYjA2OTQ2MzUxNjhlOTk3YjBlYWQyYTkzZGFlY2VkMWY0YTA0YTk1YzBmNmNmYjE5OWY2OWU1NmViNzcnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnMmI0ZWEwYTc5N2E0NDNkMjkzZWY1Y2ZmNDQ0ZjQ5NzlmMDZhY2ZlYmQ3ZTg2ZDI3NzQ3NTY1NjEzODM4NWI2YycsXG4gICAgICAgICc4NWU4OWJjMDM3OTQ1ZDkzYjM0MzA4M2I1YTFjODYxMzFhMDFmNjBjNTAyNjk3NjNiNTcwYzg1NGU1YzA5YjdhJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzM1MmJiZjRhNGNkZDEyNTY0ZjkzZmEzMzJjZTMzMzMwMWQ5YWQ0MDI3MWY4MTA3MTgxMzQwYWVmMjViZTU5ZDUnLFxuICAgICAgICAnMzIxZWI0MDc1MzQ4ZjUzNGQ1OWMxODI1OWRkYTNlMWY0YTFiM2IyZTcxYjEwMzljNjdiZDNkOGJjZjgxOTk4YydcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICcyZmEyMTA0ZDZiMzhkMTFiMDIzMDAxMDU1OTg3OTEyNGU0MmFiOGRmZWZmNWZmMjlkYzljZGFkZDRlY2FjYzNmJyxcbiAgICAgICAgJzJkZTEwNjgyOTVkZDg2NWI2NDU2OTMzNWJkNWRkODAxODFkNzBlY2ZjODgyNjQ4NDIzYmE3NmI1MzJiN2Q2NydcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc5MjQ4Mjc5YjA5YjRkNjhkYWIyMWE5YjA2NmVkZGE4MzI2M2MzZDg0ZTA5NTcyZTI2OWNhMGNkN2Y1NDUzNzE0JyxcbiAgICAgICAgJzczMDE2ZjdiZjIzNGFhZGU1ZDFhYTcxYmRlYTJiMWZmM2ZjMGRlMmE4ODc5MTJmZmU1NGEzMmNlOTdjYjM0MDInXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZGFlZDRmMmJlM2E4YmYyNzhlNzAxMzJmYjBiZWI3NTIyZjU3MGUxNDRiZjYxNWMwN2U5OTZkNDQzZGVlODcyOScsXG4gICAgICAgICdhNjlkY2U0YTdkNmM5OGU4ZDRhMWFjYTg3ZWY4ZDcwMDNmODNjMjMwZjNhZmE3MjZhYjQwZTUyMjkwYmUxYzU1J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2M0NGQxMmM3MDY1ZDgxMmU4YWNmMjhkN2NiYjE5ZjkwMTFlY2Q5ZTlmZGYyODFiMGU2YTNiNWU4N2QyMmU3ZGInLFxuICAgICAgICAnMjExOWE0NjBjZTMyNmNkYzc2YzQ1OTI2Yzk4MmZkYWMwZTEwNmU4NjFlZGY2MWM1YTAzOTA2M2YwZTBlNjQ4MidcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc2YTI0NWJmNmRjNjk4NTA0Yzg5YTIwY2ZkZWQ2MDg1MzE1MmI2OTUzMzZjMjgwNjNiNjFjNjVjYmQyNjllNmI0JyxcbiAgICAgICAgJ2UwMjJjZjQyYzJiZDRhNzA4YjNmNTEyNmYxNmEyNGFkOGIzM2JhNDhkMDQyM2I2ZWZkNWU2MzQ4MTAwZDhhODInXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnMTY5N2ZmYTZmZDlkZTYyN2MwNzdlM2QyZmU1NDEwODRjZTEzMzAwYjBiZWMxMTQ2Zjk1YWU1N2YwZDBiZDZhNScsXG4gICAgICAgICdiOWMzOThmMTg2ODA2ZjVkMjc1NjE1MDZlNDU1NzQzM2EyY2YxNTAwOWU0OThhZTdhZGVlOWQ2M2QwMWIyMzk2J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzYwNWJkYjAxOTk4MTcxOGI5ODZkMGYwN2U4MzRjYjBkOWRlYjgzNjBmZmI3ZjYxZGY5ODIzNDVlZjI3YTc0NzknLFxuICAgICAgICAnMjk3MmQyZGU0ZjhkMjA2ODFhNzhkOTNlYzk2ZmUyM2MyNmJmYWU4NGZiMTRkYjQzYjAxZTFlOTA1NmI4YzQ5J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzYyZDE0ZGFiNDE1MGJmNDk3NDAyZmRjNDVhMjE1ZTEwZGNiMDFjMzU0OTU5YjEwY2ZlMzFjN2U5ZDg3ZmYzM2QnLFxuICAgICAgICAnODBmYzA2YmQ4Y2M1YjAxMDk4MDg4YTE5NTBlZWQwZGIwMWFhMTMyOTY3YWI0NzIyMzVmNTY0MjQ4M2IyNWVhZidcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc4MGM2MGFkMDA0MGYyN2RhZGU1YjRiMDZjNDA4ZTU2YjJjNTBlOWY1NmI5YjhiNDI1ZTU1NWMyZjg2MzA4YjZmJyxcbiAgICAgICAgJzFjMzgzMDNmMWNjNWMzMGYyNmU2NmJhZDdmZTcyZjcwYTY1ZWVkNGNiZTcwMjRlYjFhYTAxZjU2NDMwYmQ1N2EnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnN2E5Mzc1YWQ2MTY3YWQ1NGFhNzRjNjM0OGNjNTRkMzQ0Y2M1ZGM5NDg3ZDg0NzA0OWQ1ZWFiYjBmYTAzYzhmYicsXG4gICAgICAgICdkMGUzZmE5ZWNhODcyNjkwOTU1OWUwZDc5MjY5MDQ2YmRjNTllYTEwYzcwY2UyYjAyZDQ5OWVjMjI0ZGM3ZjcnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZDUyOGVjZDliNjk2YjU0YzkwN2E5ZWQwNDU0NDdhNzliYjQwOGVjMzliNjhkZjUwNGJiNTFmNDU5YmMzZmZjOScsXG4gICAgICAgICdlZWNmNDEyNTMxMzZlNWY5OTk2NmYyMTg4MWZkNjU2ZWJjNDM0NTQwNWM1MjBkYmMwNjM0NjViNTIxNDA5OTMzJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzQ5MzcwYTRiNWY0MzQxMmVhMjVmNTE0ZThlY2RhZDA1MjY2MTE1ZTRhN2VjYjEzODcyMzE4MDhmOGI0NTk2MycsXG4gICAgICAgICc3NThmM2Y0MWFmZDZlZDQyOGIzMDgxYjA1MTJmZDYyYTU0YzNmM2FmYmI1YjY3NjRiNjUzMDUyYTEyOTQ5YzlhJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzc3ZjIzMDkzNmVlODhjYmJkNzNkZjkzMGQ2NDcwMmVmODgxZDgxMWUwZTE0OThlMmYxYzEzZWIxZmMzNDVkNzQnLFxuICAgICAgICAnOTU4ZWY0MmE3ODg2YjY0MDBhMDgyNjZlOWJhMWIzNzg5NmM5NTMzMGQ5NzA3N2NiYmU4ZWIzYzc2NzFjNjBkNidcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdmMmRhYzk5MWNjNGNlNGI5ZWE0NDg4N2U1YzdjMGJjZTU4YzgwMDc0YWI5ZDRkYmFlYjI4NTMxYjc3MzlmNTMwJyxcbiAgICAgICAgJ2UwZGVkYzliM2IyZjhkYWQ0ZGExZjMyZGVjMjUzMWRmOWViNWZiZWIwNTk4ZTRmZDFhMTE3ZGJhNzAzYTNjMzcnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnNDYzYjNkOWY2NjI2MjFmYjFiNGJlOGZiYmUyNTIwMTI1YTIxNmNkZmM5ZGFlM2RlYmNiYTQ4NTBjNjkwZDQ1YicsXG4gICAgICAgICc1ZWQ0MzBkNzhjMjk2YzM1NDMxMTQzMDZkZDg2MjJkN2M2MjJlMjdjOTcwYTFkZTMxY2IzNzdiMDFhZjczMDdlJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2YxNmY4MDQyNDRlNDZlMmEwOTIzMmQ0YWZmM2I1OTk3NmI5OGZhYzE0MzI4YTJkMWEzMjQ5NmI0OTk5OGYyNDcnLFxuICAgICAgICAnY2VkYWJkOWI4MjIwM2Y3ZTEzZDIwNmZjZGY0ZTMzZDkyYTZjNTNjMjZlNWNjZTI2ZDY1Nzk5NjJjNGUzMWRmNidcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdjYWY3NTQyNzJkYzg0NTYzYjAzNTJiN2ExNDMxMWFmNTVkMjQ1MzE1YWNlMjdjNjUzNjllMTVmNzE1MWQ0MWQxJyxcbiAgICAgICAgJ2NiNDc0NjYwZWYzNWY1ZjJhNDFiNjQzZmE1ZTQ2MDU3NWY0ZmE5Yjc5NjIyMzJhNWMzMmY5MDgzMThhMDQ0NzYnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnMjYwMGNhNGIyODJjYjk4NmY4NWQwZjE3MDk5NzlkOGI0NGEwOWMwN2NiODZkN2MxMjQ0OTdiYzg2ZjA4MjEyMCcsXG4gICAgICAgICc0MTE5Yjg4NzUzYzE1YmQ2YTY5M2IwM2ZjZGRiYjQ1ZDVhYzZiZTc0YWI1ZjBlZjQ0YjBiZTk0NzVhN2U0YjQwJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzc2MzVjYTcyZDdlODQzMmMzMzhlYzUzY2QxMjIyMGJjMDFjNDg2ODVlMjRmN2RjOGM2MDJhNzc0Njk5OGU0MzUnLFxuICAgICAgICAnOTFiNjQ5NjA5NDg5ZDYxM2QxZDVlNTkwZjc4ZTZkNzRlY2ZjMDYxZDU3MDQ4YmFkOWU3NmYzMDJjNWI5YzYxJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzc1NGUzMjM5ZjMyNTU3MGNkYmJmNGE4N2RlZWU4YTY2YjdmMmIzMzQ3OWQ0NjhmYmMxYTUwNzQzYmY1NmNjMTgnLFxuICAgICAgICAnNjczZmI4NmU1YmRhMzBmYjNjZDBlZDMwNGVhNDlhMDIzZWUzM2QwMTk3YTY5NWQwYzVkOTgwOTNjNTM2NjgzJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2UzZTZiZDEwNzFhMWU5NmFmZjU3ODU5YzgyZDU3MGYwMzMwODAwNjYxZDFjOTUyZjlmZTI2OTQ2OTFkOWI5ZTgnLFxuICAgICAgICAnNTljOWUwYmJhMzk0ZTc2ZjQwYzBhYTU4Mzc5YTNjYjZhNWEyMjgzOTkzZTkwYzQxNjcwMDJhZjQ5MjBlMzdmNSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICcxODZiNDgzZDA1NmEwMzM4MjZhZTczZDg4ZjczMjk4NWM0Y2NiMWYzMmJhMzVmNGI0Y2M0N2ZkY2YwNGFhNmViJyxcbiAgICAgICAgJzNiOTUyZDMyYzY3Y2Y3N2UyZTE3NDQ2ZTIwNDE4MGFiMjFmYjgwOTA4OTUxMzhiNGE0YTc5N2Y4NmU4MDg4OGInXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZGY5ZDcwYTZiOTg3NmNlNTQ0Yzk4NTYxZjRiZTRmNzI1NDQyZTZkMmI3MzdkOWM5MWE4MzIxNzI0Y2UwOTYzZicsXG4gICAgICAgICc1NWViMmRhZmQ4NGQ2Y2NkNWY4NjJiNzg1ZGMzOWQ0YWIxNTcyMjI3MjBlZjlkYTIxN2I4YzQ1Y2YyYmEyNDE3J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzVlZGQ1Y2MyM2M1MWU4N2E0OTdjYTgxNWQ1ZGNlMGY4YWI1MjU1NGY4NDllZDg5OTVkZTY0YzVmMzRjZTcxNDMnLFxuICAgICAgICAnZWZhZTljOGRiYzE0MTMwNjYxZThjZWMwMzBjODlhZDBjMTNjNjZjMGQxN2EyOTA1Y2RjNzA2YWI3Mzk5YTg2OCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICcyOTA3OThjMmI2NDc2ODMwZGExMmZlMDIyODdlOWU3NzdhYTNmYmExYzM1NWIxN2E3MjJkMzYyZjg0NjE0ZmJhJyxcbiAgICAgICAgJ2UzOGRhNzZkY2Q0NDA2MjE5ODhkMDBiY2Y3OWFmMjVkNWIyOWMwOTRkYjJhMjMxNDZkMDAzYWZkNDE5NDNlN2EnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnYWYzYzQyM2E5NWQ5ZjViMzA1NDc1NGVmYTE1MGFjMzljZDI5NTUyZmUzNjAyNTczNjJkZmRlY2VmNDA1M2I0NScsXG4gICAgICAgICdmOThhM2ZkODMxZWIyYjc0OWE5M2IwZTZmMzVjZmI0MGM4Y2Q1YWE2NjdhMTU1ODFiYzJmZWRlZDQ5OGZkOWM2J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzc2NmRiYjI0ZDEzNGU3NDVjY2NhYTI4Yzk5YmYyNzQ5MDZiYjY2YjI2ZGNmOThkZjhkMmZlZDUwZDg4NDI0OWEnLFxuICAgICAgICAnNzQ0YjExNTJlYWNiZTVlMzhkY2M4ODc5ODBkYTM4Yjg5NzU4NGE2NWZhMDZjZWRkMmM5MjRmOTdjYmFjNTk5NidcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc1OWRiZjQ2ZjhjOTQ3NTliYTIxMjc3YzMzNzg0ZjQxNjQ1ZjdiNDRmNmM1OTZhNThjZTkyZTY2NjE5MWFiZTNlJyxcbiAgICAgICAgJ2M1MzRhZDQ0MTc1ZmJjMzAwZjRlYTZjZTY0ODMwOWEwNDJjZTczOWE3OTE5Nzk4Y2Q4NWUyMTZjNGEzMDdmNmUnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZjEzYWRhOTUxMDNjNDUzNzMwNWU2OTFlNzRlOWE0YThkZDY0N2U3MTFhOTVlNzNjYjYyZGM2MDE4Y2ZkODdiOCcsXG4gICAgICAgICdlMTM4MTdiNDRlZTE0ZGU2NjNiZjRiYzgwODM0MWYzMjY5NDllMjFhNmE3NWMyNTcwNzc4NDE5YmRhZjU3MzNkJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzc3NTRiNGZhMGU4YWNlZDA2ZDQxNjdhMmM1OWNjYTRjZGExODY5YzA2ZWJhZGZiNjQ4ODU1MDAxNWE4ODUyMmMnLFxuICAgICAgICAnMzBlOTNlODY0ZTY2OWQ4MjIyNGI5NjdjMzAyMGI4ZmE4ZDFlNGUzNTBiNmNiY2M1MzdhNDhiNTc4NDExNjNhMidcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc5NDhkY2FkZjU5OTBlMDQ4YWEzODc0ZDQ2YWJlZjlkNzAxODU4Zjk1ZGU4MDQxZDJhNjgyOGM5OWUyMjYyNTE5JyxcbiAgICAgICAgJ2U0OTFhNDI1MzdmNmU1OTdkNWQyOGEzMjI0YjFiYzI1ZGY5MTU0ZWZiZDJlZjFkMmNiYmEyY2FlNTM0N2Q1N2UnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnNzk2MjQxNDQ1MGM3NmMxNjg5YzdiNDhmODIwMmVjMzdmYjIyNGNmNWFjMGJmYTE1NzAzMjhhOGEzZDdjNzdhYicsXG4gICAgICAgICcxMDBiNjEwZWM0ZmZiNDc2MGQ1YzFmYzEzM2VmNmY2YjEyNTA3YTA1MWYwNGFjNTc2MGFmYTViMjlkYjgzNDM3J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzM1MTQwODc4MzQ5NjRiNTRiMTViMTYwNjQ0ZDkxNTQ4NWExNjk3NzIyNWI4ODQ3YmIwZGQwODUxMzdlYzQ3Y2EnLFxuICAgICAgICAnZWYwYWZiYjIwNTYyMDU0NDhlMTY1MmM0OGU4MTI3ZmM2MDM5ZTc3YzE1YzIzNzhiN2U3ZDE1YTBkZTI5MzMxMSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdkM2NjMzBhZDZiNDgzZTRiYzc5Y2UyYzlkZDhiYzU0OTkzZTk0N2ViOGRmNzg3YjQ0Mjk0M2QzZjdiNTI3ZWFmJyxcbiAgICAgICAgJzhiMzc4YTIyZDgyNzI3OGQ4OWM1ZTliZThmOTUwOGFlM2MyYWQ0NjI5MDM1ODYzMGFmYjM0ZGIwNGVlZGUwYTQnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnMTYyNGQ4NDc4MDczMjg2MGNlMWM3OGZjYmZlZmUwOGIyYjI5ODIzZGI5MTNmNjQ5Mzk3NWJhMGZmNDg0NzYxMCcsXG4gICAgICAgICc2ODY1MWNmOWI2ZGE5MDNlMDkxNDQ0OGM2Y2Q5ZDRjYTg5Njg3OGY1MjgyYmU0YzhjYzA2ZTJhNDA0MDc4NTc1J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzczM2NlODBkYTk1NWE4YTI2OTAyYzk1NjMzZTYyYTk4NTE5MjQ3NGI1YWYyMDdkYTZkZjdiNGZkNWZjNjFjZDQnLFxuICAgICAgICAnZjU0MzVhMmJkMmJhZGY3ZDQ4NWE0ZDhiOGRiOWZjY2UzZTFlZjhlMDIwMWU0NTc4YzU0NjczYmMxZGM1ZWExZCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICcxNWQ5NDQxMjU0OTQ1MDY0Y2YxYTFjMzNiYmQzYjQ5Zjg5NjZjNTA5MjE3MWU2OTllZjI1OGRmYWI4MWMwNDVjJyxcbiAgICAgICAgJ2Q1NmViMzBiNjk0NjNlNzIzNGY1MTM3YjczYjg0MTc3NDM0ODAwYmFjZWJmYzY4NWZjMzdiYmU5ZWZlNDA3MGQnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnYTFkMGZjZjJlYzlkZTY3NWI2MTIxMzZlNWNlNzBkMjcxYzIxNDE3YzlkMmI4YWFhYWMxMzg1OTlkMDcxNzk0MCcsXG4gICAgICAgICdlZGQ3N2Y1MGJjYjVhM2NhYjJlOTA3MzczMDk2NjdmMjY0MTQ2MmE1NDA3MGYzZDUxOTIxMmQzOWMxOTdhNjI5J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2UyMmZiZTE1YzBhZjhjY2M1NzgwYzA3MzVmODRkYmU5YTc5MGJhZGVlODI0NWMwNmM3Y2EzNzMzMWNiMzY5ODAnLFxuICAgICAgICAnYTg1NWJhYmFkNWNkNjBjODhiNDMwYTY5ZjUzYTFhN2EzODI4OTE1NDk2NDc5OWJlNDNkMDZkNzdkMzFkYTA2J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzMxMTA5MWRkOTg2MGU4ZTIwZWUxMzQ3M2MxMTU1ZjVmNjk2MzVlMzk0NzA0ZWFhNzQwMDk0NTIyNDZjZmE5YjMnLFxuICAgICAgICAnNjZkYjY1NmY4N2QxZjA0ZmZmZDFmMDQ3ODhjMDY4MzA4NzFlYzVhNjRmZWVlNjg1YmQ4MGYwYjEyODZkODM3NCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICczNGMxZmQwNGQzMDFiZTg5YjMxYzA0NDJkM2U2YWMyNDg4MzkyOGI0NWE5MzQwNzgxODY3ZDQyMzJlYzJkYmRmJyxcbiAgICAgICAgJzk0MTQ2ODVlOTdiMWI1OTU0YmQ0NmY3MzAxNzQxMzZkNTdmMWNlZWI0ODc0NDNkYzUzMjE4NTdiYTczYWJlZSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdmMjE5ZWE1ZDZiNTQ3MDFjMWMxNGRlNWI1NTdlYjQyYThkMTNmM2FiYmNkMDhhZmZjYzJhNWU2YjA0OWI4ZDYzJyxcbiAgICAgICAgJzRjYjk1OTU3ZTgzZDQwYjBmNzNhZjQ1NDRjY2NmNmIxZjRiMDhkM2MwN2IyN2ZiOGQ4YzI5NjJhNDAwNzY2ZDEnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZDdiODc0MGY3NGE4ZmJhYWIxZjY4M2RiOGY0NWRlMjY1NDNhNTQ5MGJjYTYyNzA4NzIzNjkxMjQ2OWEwYjQ0OCcsXG4gICAgICAgICdmYTc3OTY4MTI4ZDljOTJlZTEwMTBmMzM3YWQ0NzE3ZWZmMTVkYjVlZDNjMDQ5YjM0MTFlMDMxNWVhYTQ1OTNiJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzMyZDMxYzIyMmY4ZjZmMGVmODZmN2M5OGQzYTMzMzVlYWQ1YmNkMzJhYmRkOTQyODlmZTRkMzA5MWFhODI0YmYnLFxuICAgICAgICAnNWYzMDMyZjU4OTIxNTZlMzljY2QzZDc5MTViOWUxZGEyZTZkYWM5ZTZmMjZlOTYxMTE4ZDE0Yjg0NjJlMTY2MSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc3NDYxZjM3MTkxNGFiMzI2NzEwNDVhMTU1ZDk4MzFlYTg3OTNkNzdjZDU5NTkyYzQzNDBmODZjYmMxODM0N2I1JyxcbiAgICAgICAgJzhlYzBiYTIzOGI5NmJlYzBjYmRkZGNhZTBhYTQ0MjU0MmVlZTFmZjUwYzk4NmVhNmIzOTg0N2IzY2MwOTJmZjYnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZWUwNzlhZGIxZGYxODYwMDc0MzU2YTI1YWEzODIwNmE2ZDcxNmIyYzNlNjc0NTNkMjg3Njk4YmFkN2IyYjJkNicsXG4gICAgICAgICc4ZGMyNDEyYWFmZTNiZTVjNGM1ZjM3ZTBlY2M1ZjlmNmE0NDY5ODlhZjA0YzRlMjVlYmFhYzQ3OWVjMWM4YzFlJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzE2ZWM5M2U0NDdlYzgzZjA0NjdiMTgzMDJlZTYyMGY3ZTY1ZGUzMzE4NzRjOWRjNzJiZmQ4NjE2YmE5ZGE2YjUnLFxuICAgICAgICAnNWU0NjMxMTUwZTYyZmI0MGQwZThjMmE3Y2E1ODA0YTM5ZDU4MTg2YTUwZTQ5NzEzOTYyNjc3OGUyNWIwNjc0ZCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdlYWE1Zjk4MGMyNDVmNmYwMzg5NzgyOTBhZmE3MGI2YmQ4ODU1ODk3Zjk4YjZhYTQ4NWI5NjA2NWQ1MzdiZDk5JyxcbiAgICAgICAgJ2Y2NWY1ZDNlMjkyYzJlMDgxOWE1MjgzOTFjOTk0NjI0ZDc4NDg2OWQ3ZTZlYTY3ZmIxODA0MTAyNGVkYzA3ZGMnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnNzhjOTQwNzU0NGFjMTMyNjkyZWUxOTEwYTAyNDM5OTU4YWUwNDg3NzE1MTM0MmVhOTZjNGI2YjM1YTQ5ZjUxJyxcbiAgICAgICAgJ2YzZTAzMTkxNjllYjliODVkNTQwNDc5NTUzOWE1ZTY4ZmExZmJkNTgzYzA2NGQyNDYyYjY3NWYxOTRhM2RkYjQnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnNDk0ZjRiZTIxOWExYTc3MDE2ZGNkODM4NDMxYWVhMDAwMWNkYzhhZTdhNmZjNjg4NzI2NTc4ZDk3MDI4NTdhNScsXG4gICAgICAgICc0MjI0MmE5NjkyODNhNWYzMzliYTdmMDc1ZTM2YmEyYWY5MjVjZTMwZDc2N2VkNmU1NWY0YjAzMTg4MGQ1NjJjJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2E1OThhODAzMGRhNmQ4NmM2YmM3ZjJmNTE0NGVhNTQ5ZDI4MjExZWE1OGZhYTcwZWJmNGMxZTY2NWMxZmU5YjUnLFxuICAgICAgICAnMjA0YjVkNmY4NDgyMmMzMDdlNGI0YTcxNDA3MzdhZWMyM2ZjNjNiNjViMzVmODZhMTAwMjZkYmQyZDg2NGU2YidcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdjNDE5MTYzNjVhYmIyYjVkMDkxOTJmNWYyZGJlYWZlYzIwOGYwMjBmMTI1NzBhMTg0ZGJhZGMzZTU4NTk1OTk3JyxcbiAgICAgICAgJzRmMTQzNTFkMDA4N2VmYTQ5ZDI0NWIzMjg5ODQ5ODlkNWNhZjk0NTBmMzRiZmMwZWQxNmU5NmI1OGZhOTkxMydcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc4NDFkNjA2M2E1ODZmYTQ3NWE3MjQ2MDRkYTAzYmM1YjkyYTJlMGQyZTBhMzZhY2ZlNGM3M2E1NTE0NzQyODgxJyxcbiAgICAgICAgJzczODY3ZjU5YzA2NTllODE5MDRmOWExYzc1NDM2OThlNjI1NjJkNjc0NGMxNjljZTdhMzZkZTAxYThkNjE1NCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc1ZTk1YmIzOTlhNjk3MWQzNzYwMjY5NDdmODliZGUyZjI4MmIzMzgxMDkyOGJlNGRlZDExMmFjNGQ3MGUyMGQ1JyxcbiAgICAgICAgJzM5ZjIzZjM2NjgwOTA4NWJlZWJmYzcxMTgxMzEzNzc1YTk5YzlhZWQ3ZDhiYTM4YjE2MTM4NGM3NDYwMTI4NjUnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnMzZlNDY0MWE1Mzk0OGZkNDc2YzM5ZjhhOTlmZDk3NGU1ZWMwNzU2NGI1MzE1ZDhiZjk5NDcxYmNhMGVmMmY2NicsXG4gICAgICAgICdkMjQyNGIxYjFhYmU0ZWI4MTY0MjI3YjA4NWM5YWE5NDU2ZWExMzQ5M2ZkNTYzZTA2ZmQ1MWNmNTY5NGM3OGZjJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzMzNjU4MWVhN2JmYmJiMjkwYzE5MWEyZjUwN2E0MWNmNTY0Mzg0MjE3MGU5MTRmYWVhYjI3YzJjNTc5ZjcyNicsXG4gICAgICAgICdlYWQxMjE2ODU5NWZlMWJlOTkyNTIxMjliNmU1NmIzMzkxZjdhYjE0MTBjZDFlMGVmM2RjZGNhYmQyZmRhMjI0J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzhhYjg5ODE2ZGFkZmQ2YjZhMWYyNjM0ZmNmMDBlYzg0MDM3ODEwMjVlZDY4OTBjNDg0OTc0MjcwNmJkNDNlZGUnLFxuICAgICAgICAnNmZkY2VmMDlmMmY2ZDBhMDQ0ZTY1NGFlZjYyNDEzNmY1MDNkNDU5YzNlODk4NDU4NThhNDdhOTEyOWNkZDI0ZSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICcxZTMzZjFhNzQ2YzljNTc3ODEzMzM0NGQ5Mjk5ZmNhYTIwYjA5MzhlOGFjZmYyNTQ0YmI0MDI4NGI4YzVmYjk0JyxcbiAgICAgICAgJzYwNjYwMjU3ZGQxMWIzYWE5YzhlZDYxOGQyNGVkZmYyMzA2ZDMyMGYxZDAzMDEwZTMzYTdkMjA1N2YzYjNiNidcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc4NWI3YzFkY2IzY2VjMWI3ZWU3ZjMwZGVkNzlkZDIwYTBlZDFmNGNjMThjYmNmY2ZhNDEwMzYxZmQ4ZjA4ZjMxJyxcbiAgICAgICAgJzNkOThhOWNkZDAyNmRkNDNmMzkwNDhmMjVhODg0N2Y0ZmNhZmFkMTg5NWQ3YTYzM2M2ZmVkM2MzNWU5OTk1MTEnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnMjlkZjlmYmQ4ZDllNDY1MDkyNzVmNGIxMjVkNmQ0NWQ3ZmJlOWEzYjg3OGE3YWY4NzJhMjgwMDY2MWFjNWY1MScsXG4gICAgICAgICdiNGM0ZmU5OWM3NzVhNjA2ZTJkODg2MjE3OTEzOWZmZGE2MWRjODYxYzAxOWU1NWNkMjg3NmViMmEyN2Q4NGInXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnYTBiMWNhZTA2YjBhODQ3YTNmZWE2ZTY3MWFhZjhhZGZkZmU1OGNhMmY3NjgxMDVjODA4MmIyZTQ0OWZjZTI1MicsXG4gICAgICAgICdhZTQzNDEwMmVkZGUwOTU4ZWM0YjE5ZDkxN2E2YTI4ZTZiNzJkYTE4MzRhZmYwZTY1MGYwNDk1MDNhMjk2Y2YyJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzRlOGNlYWZiOWIzZTlhMTM2ZGM3ZmY2N2U4NDAyOTViNDk5ZGZiM2IyMTMzZTRiYTExM2YyZTRjMGUxMjFlNScsXG4gICAgICAgICdjZjIxNzQxMThjOGI2ZDdhNGI0OGY2ZDUzNGNlNWM3OTQyMmMwODZhNjM0NjA1MDJiODI3Y2U2MmEzMjY2ODNjJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2QyNGE0NGUwNDdlMTliNmY1YWZiODFjN2NhMmY2OTA4MGE1MDc2Njg5YTAxMDkxOWY0MjcyNWMyYjc4OWEzM2InLFxuICAgICAgICAnNmZiOGQ1NTkxYjQ2NmY4ZmM2M2RiNTBmMWMwZjFjNjkwMTNmOTk2ODg3YjgyNDRkMmNkZWM0MTdhZmVhOGZhMydcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdlYTAxNjA2YTdhNmM5Y2RkMjQ5ZmRmY2ZhY2I5OTU4NDAwMWVkZDI4YWJiYWI3N2I1MTA0ZTk4ZThlM2IzNWQ0JyxcbiAgICAgICAgJzMyMmFmNDkwOGM3MzEyYjBjZmJmZTM2OWY3YTdiM2NkYjdkNDQ5NGJjMjgyMzcwMGNmZDY1MjE4OGEzZWE5OGQnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnYWY4YWRkYmYyYjY2MWM4YTZjNjMyODY1NWViOTY2NTEyNTIwMDdkOGM1ZWEzMWJlNGFkMTk2ZGU4Y2UyMTMxZicsXG4gICAgICAgICc2NzQ5ZTY3YzAyOWI4NWY1MmEwMzRlYWZkMDk2ODM2YjI1MjA4MTg2ODBlMjZhYzhmM2RmYmNkYjcxNzQ5NzAwJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2UzYWUxOTc0NTY2Y2EwNmNjNTE2ZDQ3ZTBmYjE2NWE2NzRhM2RhYmNmY2ExNWU3MjJmMGUzNDUwZjQ1ODg5JyxcbiAgICAgICAgJzJhZWFiZTdlNDUzMTUxMDExNjIxN2YwN2JmNGQwNzMwMGRlOTdlNDg3NGY4MWY1MzM0MjBhNzJlZWIwYmQ2YTQnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnNTkxZWUzNTUzMTNkOTk3MjFjZjY5OTNmZmVkMWUzZTMwMTk5M2ZmM2VkMjU4ODAyMDc1ZWE4Y2VkMzk3ZTI0NicsXG4gICAgICAgICdiMGVhNTU4YTExM2MzMGJlYTYwZmM0Nzc1NDYwYzc5MDFmZjBiMDUzZDI1Y2EyYmRlZWU5OGYxYTRiZTVkMTk2J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzExMzk2ZDU1ZmRhNTRjNDlmMTlhYTk3MzE4ZDhkYTYxZmE4NTg0ZTQ3YjA4NDk0NTA3N2NmMDMyNTViNTI5ODQnLFxuICAgICAgICAnOTk4Yzc0YThjZDQ1YWMwMTI4OWQ1ODMzYTdiZWI0NzQ0ZmY1MzZiMDFiMjU3YmU0YzU3NjdiZWE5M2VhNTdhNCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICczYzVkMmExYmEzOWM1YTE3OTAwMDA3MzhjOWUwYzQwYjhkY2RmZDU0Njg3NTRiNjQwNTU0MDE1N2UwMTdhYTdhJyxcbiAgICAgICAgJ2IyMjg0Mjc5OTk1YTM0ZTJmOWQ0ZGU3Mzk2ZmMxOGI4MGY5YjhiOWZkZDI3MGY2NjYxZjc5Y2E0YzgxYmQyNTcnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnY2M4NzA0YjhhNjBhMGRlZmEzYTk5YTcyOTlmMmU5YzNmYmMzOTVhZmIwNGFjMDc4NDI1ZWY4YTE3OTNjYzAzMCcsXG4gICAgICAgICdiZGQ0NjAzOWZlZWQxNzg4MWQxZTA4NjJkYjM0N2Y4Y2YzOTViNzRmYzRiY2RjNGU5NDBiNzRlM2FjMWYxYjEzJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2M1MzNlNGY3ZWE4NTU1YWFjZDk3NzdhYzVjYWQyOWI5N2RkNGRlZmNjYzUzZWU3ZWEyMDQxMTliMjg4OWIxOTcnLFxuICAgICAgICAnNmYwYTI1NmJjNWVmZGY0MjlhMmZiNjI0MmYxYTQzYTJkOWI5MjViYjRhNGIzYTI2YmI4ZTBmNDVlYjU5NjA5NidcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdjMTRmOGYyY2NiMjdkNmYxMDlmNmQwOGQwM2NjOTZhNjliYThjMzRlZWMwN2JiY2Y1NjZkNDhlMzNkYTY1OTMnLFxuICAgICAgICAnYzM1OWQ2OTIzYmIzOThmN2ZkNDQ3M2UxNmZlMWMyODQ3NWI3NDBkZDA5ODA3NWU2YzBlODY0OTExM2RjM2EzOCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdhNmNiYzMwNDZiYzZhNDUwYmFjMjQ3ODlmYTE3MTE1YTRjOTczOWVkNzVmOGYyMWNlNDQxZjcyZTBiOTBlNmVmJyxcbiAgICAgICAgJzIxYWU3ZjQ2ODBlODg5YmIxMzA2MTllMmMwZjk1YTM2MGNlYjU3M2M3MDYwMzEzOTg2MmFmZDYxN2ZhOWI5ZidcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICczNDdkNmQ5YTAyYzQ4OTI3ZWJmYjg2YzEzNTliMWNhZjEzMGEzYzAyNjdkMTFjZTYzNDRiMzlmOTlkNDNjYzM4JyxcbiAgICAgICAgJzYwZWE3ZjYxYTM1MzUyNGQxYzk4N2Y2ZWNlYzkyZjA4NmQ1NjVhYjY4Nzg3MGNiMTI2ODlmZjFlMzFjNzQ0NDgnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZGE2NTQ1ZDIxODFkYjhkOTgzZjdkY2IzNzVlZjU4NjZkNDdjNjdiMWJmMzFjOGNmODU1ZWY3NDM3YjcyNjU2YScsXG4gICAgICAgICc0OWI5NjcxNWFiNjg3OGE3OWU3OGYwN2NlNTY4MGM1ZDY2NzMwNTFiNDkzNWJkODk3ZmVhODI0Yjc3ZGMyMDhhJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2M0MDc0N2NjOWQwMTJjYjFhMTNiODE0ODMwOWM2ZGU3ZWMyNWQ2OTQ1ZDY1NzE0NmI5ZDU5OTRiOGZlYjExMTEnLFxuICAgICAgICAnNWNhNTYwNzUzYmUyYTEyZmM2ZGU2Y2FmMmNiNDg5NTY1ZGI5MzYxNTZiOTUxNGUxYmI1ZTgzMDM3ZTBmYTJkNCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc0ZTQyYzhlYzgyYzk5Nzk4Y2NmM2E2MTBiZTg3MGU3ODMzOGM3ZjcxMzM0OGJkMzRjODIwM2VmNDAzN2YzNTAyJyxcbiAgICAgICAgJzc1NzFkNzRlZTVlMGZiOTJhN2E4YjMzYTA3NzgzMzQxYTU0OTIxNDRjYzU0YmNjNDBhOTQ0NzM2OTM2MDY0MzcnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnMzc3NWFiNzA4OWJjNmFmODIzYWJhMmUxYWY3MGIyMzZkMjUxY2FkYjBjODY3NDMyODc1MjJhMWIzYjBkZWRlYScsXG4gICAgICAgICdiZTUyZDEwN2JjZmEwOWQ4YmNiOTczNmE4MjhjZmE3ZmFjOGRiMTdiZjdhNzZhMmM0MmFkOTYxNDA5MDE4Y2Y3J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2NlZTMxY2JmN2UzNGVjMzc5ZDk0ZmI4MTRkM2Q3NzVhZDk1NDU5NWQxMzE0YmE4ODQ2OTU5ZTNlODJmNzRlMjYnLFxuICAgICAgICAnOGZkNjRhMTRjMDZiNTg5YzI2Yjk0N2FlMmJjZjZiZmEwMTQ5ZWYwYmUxNGVkNGQ4MGY0NDhhMDFjNDNiMWM2ZCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdiNGY5ZWFlYTA5YjY5MTc2MTlmNmVhNmE0ZWI1NDY0ZWZkZGI1OGZkNDViMWViZWZjZGMxYTAxZDA4YjQ3OTg2JyxcbiAgICAgICAgJzM5ZTVjOTkyNWI1YTU0YjA3NDMzYTRmMThjNjE3MjZmOGJiMTMxYzAxMmNhNTQyZWIyNGE4YWMwNzIwMDY4MmEnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZDQyNjNkZmMzZDJkZjkyM2EwMTc5YTQ4OTY2ZDMwY2U4NGUyNTE1YWZjM2RjY2MxYjc3OTA3NzkyZWJjYzYwZScsXG4gICAgICAgICc2MmRmYWYwN2EwZjc4ZmViMzBlMzBkNjI5NTg1M2NlMTg5ZTEyNzc2MGFkNmNmN2ZhZTE2NGUxMjJhMjA4ZDU0J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzQ4NDU3NTI0ODIwZmE2NWE0ZjhkMzVlYjY5MzA4NTdjMDAzMmFjYzBhNGEyZGU0MjIyMzNlZWRhODk3NjEyYzQnLFxuICAgICAgICAnMjVhNzQ4YWIzNjc5NzlkOTg3MzNjMzhhMWZhMWMyZTdkYzZjYzA3ZGIyZDYwYTlhZTdhNzZhYWE0OWJkMGY3NydcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdkZmVlZWYxODgxMTAxZjJjYjExNjQ0ZjNhMmFmZGZjMjA0NWUxOTkxOTE1MjkyM2YzNjdhMTc2N2MxMWNjZWRhJyxcbiAgICAgICAgJ2VjZmI3MDU2Y2YxZGUwNDJmOTQyMGJhYjM5Njc5M2MwYzM5MGJkZTc0YjRiYmRmZjE2YTgzYWUwOWE5YTc1MTcnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnNmQ3ZWY2YjE3NTQzZjgzNzNjNTczZjQ0ZTFmMzg5ODM1ZDg5YmNiYzYwNjJjZWQzNmM4MmRmODNiOGZhZTg1OScsXG4gICAgICAgICdjZDQ1MGVjMzM1NDM4OTg2ZGZlZmExMGM1N2ZlYTliY2M1MjFhMDk1OWIyZDgwYmJmNzRiMTkwZGNhNzEyZDEwJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2U3NTYwNWQ1OTEwMmE1YTI2ODQ1MDBkM2I5OTFmMmUzZjNjODhiOTMyMjU1NDcwMzVhZjI1YWY2NmUwNDU0MWYnLFxuICAgICAgICAnZjVjNTQ3NTRhOGY3MWVlNTQwYjliNDg3Mjg0NzNlMzE0ZjcyOWFjNTMwOGIwNjkzODM2MDk5MGUyYmZhZDEyNSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdlYjk4NjYwZjRjNGRmYWEwNmEyYmU0NTNkNTAyMGJjOTlhMGMyZTYwYWJlMzg4NDU3ZGQ0M2ZlZmIxZWQ2MjBjJyxcbiAgICAgICAgJzZjYjlhODg3NmQ5Y2I4NTIwNjA5YWYzYWRkMjZjZDIwYTBhN2NkOGE5NDExMTMxY2U4NWY0NDEwMDA5OTIyM2UnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnMTNlODdiMDI3ZDg1MTRkMzU5MzlmMmU2ODkyYjE5OTIyMTU0NTk2OTQxODg4MzM2ZGMzNTYzZTNiOGRiYTk0MicsXG4gICAgICAgICdmZWY1YTNjNjgwNTlhNmRlYzVkNjI0MTE0YmYxZTkxYWFjMmI5ZGE1NjhkNmFiZWIyNTcwZDU1NjQ2YjhhZGYxJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2VlMTYzMDI2ZTlmZDZmZTAxN2MzOGYwNmE1YmU2ZmMxMjU0MjRiMzcxY2UyNzA4ZTdiZjQ0OTE2OTFlNTc2NGEnLFxuICAgICAgICAnMWFjYjI1MGYyNTVkZDYxYzQzZDk0Y2NjNjcwZDBmNThmNDlhZTNmYTE1Yjk2NjIzZTU0MzBkYTBhZDZjNjJiMidcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdiMjY4ZjVlZjlhZDUxZTRkNzhkZTNhNzUwYzJkYzg5YjFlNjI2ZDQzNTA1ODY3OTk5OTMyZTVkYjMzYWYzZDgwJyxcbiAgICAgICAgJzVmMzEwZDRiM2M5OWI5ZWJiMTlmNzdkNDFjMWRlZTAxOGNmMGQzNGZkNDE5MTYxNDAwM2U5NDVhMTIxNmU0MjMnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZmYwN2YzMTE4YTlkZjAzNWU5ZmFkODVlYjZjN2JmZTQyYjAyZjAxY2E5OWNlZWEzYmY3ZmZkYmE5M2M0NzUwZCcsXG4gICAgICAgICc0MzgxMzZkNjAzZTg1OGEzYTVjNDQwYzM4ZWNjYmFkZGMxZDI5NDIxMTRlMmVkZGQ0NzQwZDA5OGNlZDFmMGQ4J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzhkOGI5ODU1YzdjMDUyYTM0MTQ2ZmQyMGZmYjY1OGJlYTRiOWY2OWUwZDgyNWViZWMxNmU4YzNjZTJiNTI2YTEnLFxuICAgICAgICAnY2RiNTU5ZWVkYzJkNzlmOTI2YmFmNDRmYjg0ZWE0ZDQ0YmNmNTBmZWU1MWQ3Y2ViMzBlMmU3ZjQ2MzAzNjc1OCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc1MmRiMGI1Mzg0ZGZiZjA1YmZhOWQ0NzJkN2FlMjZkZmU0Yjg1MWNlY2E5MWIxZWJhNTQyNjMxODBkYTMyYjYzJyxcbiAgICAgICAgJ2MzYjk5N2QwNTBlZTVkNDIzZWJhZjY2YTZkYjlmNTdiMzE4MGM5MDI4NzU2NzlkZTkyNGI2OWQ4NGE3YjM3NSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdlNjJmOTQ5MGQzZDUxZGE2Mzk1ZWZkMjRlODA5MTljYzdkMGYyOWMzZjNmYTQ4YzZmZmY1NDNiZWNiZDQzMzUyJyxcbiAgICAgICAgJzZkODlhZDdiYTQ4NzZiMGIyMmMyY2EyODBjNjgyODYyZjM0MmM4NTkxZjFkYWY1MTcwZTA3YmZkOWNjYWZhN2QnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnN2YzMGVhMjQ3NmIzOTliNDk1NzUwOWM4OGY3N2QwMTkxYWZhMmZmNWNiN2IxNGZkNmQ4ZTdkNjVhYWFiMTE5MycsXG4gICAgICAgICdjYTVlZjdkNGIyMzFjOTRjM2IxNTM4OWE1ZjYzMTFlOWRhZmY3YmI2N2IxMDNlOTg4MGVmNGJmZjYzN2FjYWVjJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzUwOThmZjFlMWQ5ZjE0ZmI0NmEyMTBmYWRhNmM5MDNmZWYwZmI3YjRhMWRkMWQ5YWM2MGEwMzYxODAwYjdhMDAnLFxuICAgICAgICAnOTczMTE0MWQ4MWZjOGY4MDg0ZDM3YzZlNzU0MjAwNmIzZWUxYjQwZDYwZGZlNTM2MmE1YjEzMmZkMTdkZGMwJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzMyYjc4YzdkZTllZTUxMmE3Mjg5NWJlNmI5Y2JlZmE2ZTJmM2M0Y2NjZTQ0NWM5NmI5ZjJjODFlMjc3OGFkNTgnLFxuICAgICAgICAnZWUxODQ5ZjUxM2RmNzFlMzJlZmMzODk2ZWUyODI2MGM3M2JiODA1NDdhZTIyNzViYTQ5NzIzNzc5NGM4NzUzYydcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdlMmNiNzRmZGRjOGU5ZmJjZDA3NmVlZjJhN2M3MmIwY2UzN2Q1MGYwODI2OWRmYzA3NGI1ODE1NTA1NDdhNGY3JyxcbiAgICAgICAgJ2QzYWEyZWQ3MWM5ZGQyMjQ3YTYyZGYwNjI3MzZlYjBiYWRkZWE5ZTM2MTIyZDJiZTg2NDFhYmNiMDA1Y2M0YTQnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnODQzODQ0NzU2NmQ0ZDdiZWRhZGMyOTk0OTZhYjM1NzQyNjAwOWEzNWYyMzVjYjE0MWJlMGQ5OWNkMTBhZTNhOCcsXG4gICAgICAgICdjNGUxMDIwOTE2OTgwYTRkYTVkMDFhYzVlNmFkMzMwNzM0ZWYwZDc5MDY2MzFjNGYyMzkwNDI2YjJlZGQ3OTFmJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzQxNjJkNDg4Yjg5NDAyMDM5YjU4NGM2ZmM2YzMwODg3MDU4N2Q5YzQ2ZjY2MGI4NzhhYjY1YzgyYzcxMWQ2N2UnLFxuICAgICAgICAnNjcxNjNlOTAzMjM2Mjg5Zjc3NmYyMmMyNWZiOGEzYWZjMTczMmYyYjg0YjRlOTVkYmRhNDdhZTVhMDg1MjY0OSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICczZmFkM2ZhODRjYWYwZjM0ZjBmODliZmQyZGNmNTRmYzE3NWQ3NjdhZWMzZTUwNjg0ZjNiYTRhNGJmNWY2ODNkJyxcbiAgICAgICAgJ2NkMWJjN2NiNmNjNDA3YmIyZjBjYTY0N2M3MThhNzMwY2Y3MTg3MmU3ZDBkMmE1M2ZhMjBlZmNkZmU2MTgyNidcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc2NzRmMjYwMGEzMDA3YTAwNTY4YzFhN2NlMDVkMDgxNmMxZmI4NGJmMTM3MDc5OGYxYzY5NTMyZmFlYjFhODZiJyxcbiAgICAgICAgJzI5OWQyMWY5NDEzZjMzYjNlZGY0M2IyNTcwMDQ1ODBiNzBkYjU3ZGEwYjE4MjI1OWUwOWVlY2M2OWUwZDM4YTUnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZDMyZjRkYTU0YWRlNzRhYmI4MWI4MTVhZDFmYjNiMjYzZDgyZDZjNjkyNzE0YmNmZjg3ZDI5YmQ1ZWU5ZjA4ZicsXG4gICAgICAgICdmOTQyOWU3MzhiOGU1M2I5NjhlOTkwMTZjMDU5NzA3NzgyZTE0ZjQ1MzUzNTlkNTgyZmM0MTY5MTBiM2VlYTg3J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzMwZTRlNjcwNDM1Mzg1NTU2ZTU5MzY1NzEzNTg0NWQzNmZiYjY5MzFmNzJiMDhjYjFlZDk1NGYxZTNjZTNmZjYnLFxuICAgICAgICAnNDYyZjliY2U2MTk4OTg2Mzg0OTkzNTAxMTNiYmM5YjEwYTg3OGQzNWRhNzA3NDBkYzY5NWE1NTllYjg4ZGI3YidcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdiZTIwNjIwMDNjNTFjYzMwMDQ2ODI5MDQzMzBlNGRlZTdmM2RjZDEwYjAxZTU4MGJmMTk3MWIwNGQ0Y2FkMjk3JyxcbiAgICAgICAgJzYyMTg4YmM0OWQ2MWU1NDI4NTczZDQ4YTc0ZTFjNjU1YjFjNjEwOTA5MDU2ODJhMGQ1NTU4ZWQ3MmRjY2I5YmMnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnOTMxNDQ0MjNhY2UzNDUxZWQyOWUwZmI5YWMyYWYyMTFjYjZlODRhNjAxZGY1OTkzYzQxOTg1OWZmZjVkZjA0YScsXG4gICAgICAgICc3YzEwZGZiMTY0YzM0MjVmNWM3MWEzZjlkNzk5MjAzOGYxMDY1MjI0ZjcyYmI5ZDFkOTAyYTZkMTMwMzdiNDdjJ1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJ2IwMTVmODA0NGY1ZmNiZGNmMjFjYTI2ZDZjMzRmYjgxOTc4MjkyMDVjN2I3ZDJhN2NiNjY0MThjMTU3YjExMmMnLFxuICAgICAgICAnYWI4YzFlMDg2ZDA0ZTgxMzc0NGE2NTViMmRmOGQ1ZjgzYjNjZGM2ZmFhMzA4OGMxZDNhZWExNDU0ZTNhMWQ1ZidcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICdkNWU5ZTFkYTY0OWQ5N2Q4OWU0ODY4MTE3YTQ2NWEzYTRmOGExOGRlNTdhMTQwZDM2YjNmMmFmMzQxYTIxYjUyJyxcbiAgICAgICAgJzRjYjA0NDM3ZjM5MWVkNzMxMTFhMTNjYzFkNGRkMGRiMTY5MzQ2NWMyMjQwNDgwZDg5NTVlODU5MmYyNzQ0N2EnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnZDNhZTQxMDQ3ZGQ3Y2EwNjVkYmY4ZWQ3N2I5OTI0Mzk5ODMwMDVjZDcyZTE2ZDZmOTk2YTUzMTZkMzY5NjZiYicsXG4gICAgICAgICdiZDFhZWIyMWFkMjJlYmIyMmExMGYwMzAzNDE3YzZkOTY0ZjhjZGQ3ZGYwYWNhNjE0YjEwZGMxNGQxMjVhYzQ2J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzQ2M2UyNzYzZDg4NWY5NThmYzY2Y2RkMjI4MDBmMGE0ODcxOTdkMGE4MmUzNzdiNDlmODBhZjg3Yzg5N2IwNjUnLFxuICAgICAgICAnYmZlZmFjZGIwZTVkMGZkN2RmM2EzMTFhOTRkZTA2MmIyNmI4MGM2MWZiYzk3NTA4Yjc5OTkyNjcxZWY3Y2E3ZidcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc3OTg1ZmRmZDEyN2MwNTY3YzZmNTNlYzFiYjYzZWMzMTU4ZTU5N2M0MGJmZTc0N2M4M2NkZGZjOTEwNjQxOTE3JyxcbiAgICAgICAgJzYwM2MxMmRhZjNkOTg2MmVmMmIyNWZlMWRlMjg5YWVkMjRlZDI5MWUwZWM2NzA4NzAzYTViZDU2N2YzMmVkMDMnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnNzRhMWFkNmI1Zjc2ZTM5ZGIyZGQyNDk0MTBlYWM3Zjk5ZTc0YzU5Y2I4M2QyZDBlZDVmZjE1NDNkYTc3MDNlOScsXG4gICAgICAgICdjYzYxNTdlZjE4YzljNjNjZDYxOTNkODM2MzFiYmVhMDA5M2UwOTY4OTQyZThjMzNkNTczN2ZkNzkwZTBkYjA4J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzMwNjgyYTUwNzAzMzc1ZjYwMmQ0MTY2NjRiYTE5YjdmYzliYWI0MmM3Mjc0NzQ2M2E3MWQwODk2YjIyZjZkYTMnLFxuICAgICAgICAnNTUzZTA0ZjZiMDE4YjRmYTZjOGYzOWU3ZjMxMWQzMTc2MjkwZDBlMGYxOWNhNzNmMTc3MTRkOTk3N2EyMmZmOCdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICc5ZTIxNThmMGQ3YzBkNWYyNmMzNzkxZWZlZmE3OTU5NzY1NGU3YTJiMjQ2NGY1MmIxZWU2YzEzNDc3NjllZjU3JyxcbiAgICAgICAgJzcxMmZjZGQxYjkwNTNmMDkwMDNhMzQ4MWZhNzc2MmU5ZmZkN2M4ZWYzNWEzODUwOWUyZmJmMjYyOTAwODM3MydcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICcxNzZlMjY5ODlhNDNjOWNmZWJhNDAyOWMyMDI1MzhjMjgxNzJlNTY2ZTNjNGZjZTczMjI4NTdmM2JlMzI3ZDY2JyxcbiAgICAgICAgJ2VkOGNjOWQwNGIyOWViODc3ZDI3MGI0ODc4ZGM0M2MxOWFlZmQzMWY0ZWVlMDllZTdiNDc4MzRjMWZhNGIxYzMnXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnNzVkNDZlZmVhMzc3MWU2ZTY4YWJiODlhMTNhZDc0N2VjZjE4OTIzOTNkZmM0ZjFiNzAwNDc4OGM1MDM3NGRhOCcsXG4gICAgICAgICc5ODUyMzkwYTk5NTA3Njc5ZmQwYjg2ZmQyYjM5YTg2OGQ3ZWZjMjIxNTEzNDZlMWEzY2E0NzI2NTg2YTZiZWQ4J1xuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJzgwOWEyMGM2N2Q2NDkwMGZmYjY5OGM0YzgyNWY2ZDVmMjMxMGZiMDQ1MWM4NjkzNDViNzMxOWY2NDU2MDU3MjEnLFxuICAgICAgICAnOWU5OTQ5ODBkOTkxN2UyMmI3NmIwNjE5MjdmYTA0MTQzZDA5NmNjYzU0OTYzZTZhNWViZmE1ZjNmOGUyODZjMSdcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICcxYjM4OTAzYTQzZjdmMTE0ZWQ0NTAwYjRlYWM3MDgzZmRlZmVjZTFjZjI5YzYzNTI4ZDU2MzQ0NmY5NzJjMTgwJyxcbiAgICAgICAgJzQwMzZlZGM5MzFhNjBhZTg4OTM1M2Y3N2ZkNTNkZTRhMjcwOGIyNmI2ZjVkYTcyYWQzMzk0MTE5ZGFmNDA4ZjknXG4gICAgICBdXG4gICAgXVxuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSBleHBvcnRzO1xudmFyIEJOID0gcmVxdWlyZSgnYm4uanMnKTtcbnZhciBtaW5Bc3NlcnQgPSByZXF1aXJlKCdtaW5pbWFsaXN0aWMtYXNzZXJ0Jyk7XG52YXIgbWluVXRpbHMgPSByZXF1aXJlKCdtaW5pbWFsaXN0aWMtY3J5cHRvLXV0aWxzJyk7XG5cbnV0aWxzLmFzc2VydCA9IG1pbkFzc2VydDtcbnV0aWxzLnRvQXJyYXkgPSBtaW5VdGlscy50b0FycmF5O1xudXRpbHMuemVybzIgPSBtaW5VdGlscy56ZXJvMjtcbnV0aWxzLnRvSGV4ID0gbWluVXRpbHMudG9IZXg7XG51dGlscy5lbmNvZGUgPSBtaW5VdGlscy5lbmNvZGU7XG5cbi8vIFJlcHJlc2VudCBudW0gaW4gYSB3LU5BRiBmb3JtXG5mdW5jdGlvbiBnZXROQUYobnVtLCB3LCBiaXRzKSB7XG4gIHZhciBuYWYgPSBuZXcgQXJyYXkoTWF0aC5tYXgobnVtLmJpdExlbmd0aCgpLCBiaXRzKSArIDEpO1xuICBuYWYuZmlsbCgwKTtcblxuICB2YXIgd3MgPSAxIDw8ICh3ICsgMSk7XG4gIHZhciBrID0gbnVtLmNsb25lKCk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYWYubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgejtcbiAgICB2YXIgbW9kID0gay5hbmRsbih3cyAtIDEpO1xuICAgIGlmIChrLmlzT2RkKCkpIHtcbiAgICAgIGlmIChtb2QgPiAod3MgPj4gMSkgLSAxKVxuICAgICAgICB6ID0gKHdzID4+IDEpIC0gbW9kO1xuICAgICAgZWxzZVxuICAgICAgICB6ID0gbW9kO1xuICAgICAgay5pc3Vibih6KTtcbiAgICB9IGVsc2Uge1xuICAgICAgeiA9IDA7XG4gICAgfVxuXG4gICAgbmFmW2ldID0gejtcbiAgICBrLml1c2hybigxKTtcbiAgfVxuXG4gIHJldHVybiBuYWY7XG59XG51dGlscy5nZXROQUYgPSBnZXROQUY7XG5cbi8vIFJlcHJlc2VudCBrMSwgazIgaW4gYSBKb2ludCBTcGFyc2UgRm9ybVxuZnVuY3Rpb24gZ2V0SlNGKGsxLCBrMikge1xuICB2YXIganNmID0gW1xuICAgIFtdLFxuICAgIFtdXG4gIF07XG5cbiAgazEgPSBrMS5jbG9uZSgpO1xuICBrMiA9IGsyLmNsb25lKCk7XG4gIHZhciBkMSA9IDA7XG4gIHZhciBkMiA9IDA7XG4gIHdoaWxlIChrMS5jbXBuKC1kMSkgPiAwIHx8IGsyLmNtcG4oLWQyKSA+IDApIHtcblxuICAgIC8vIEZpcnN0IHBoYXNlXG4gICAgdmFyIG0xNCA9IChrMS5hbmRsbigzKSArIGQxKSAmIDM7XG4gICAgdmFyIG0yNCA9IChrMi5hbmRsbigzKSArIGQyKSAmIDM7XG4gICAgaWYgKG0xNCA9PT0gMylcbiAgICAgIG0xNCA9IC0xO1xuICAgIGlmIChtMjQgPT09IDMpXG4gICAgICBtMjQgPSAtMTtcbiAgICB2YXIgdTE7XG4gICAgaWYgKChtMTQgJiAxKSA9PT0gMCkge1xuICAgICAgdTEgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbTggPSAoazEuYW5kbG4oNykgKyBkMSkgJiA3O1xuICAgICAgaWYgKChtOCA9PT0gMyB8fCBtOCA9PT0gNSkgJiYgbTI0ID09PSAyKVxuICAgICAgICB1MSA9IC1tMTQ7XG4gICAgICBlbHNlXG4gICAgICAgIHUxID0gbTE0O1xuICAgIH1cbiAgICBqc2ZbMF0ucHVzaCh1MSk7XG5cbiAgICB2YXIgdTI7XG4gICAgaWYgKChtMjQgJiAxKSA9PT0gMCkge1xuICAgICAgdTIgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbTggPSAoazIuYW5kbG4oNykgKyBkMikgJiA3O1xuICAgICAgaWYgKChtOCA9PT0gMyB8fCBtOCA9PT0gNSkgJiYgbTE0ID09PSAyKVxuICAgICAgICB1MiA9IC1tMjQ7XG4gICAgICBlbHNlXG4gICAgICAgIHUyID0gbTI0O1xuICAgIH1cbiAgICBqc2ZbMV0ucHVzaCh1Mik7XG5cbiAgICAvLyBTZWNvbmQgcGhhc2VcbiAgICBpZiAoMiAqIGQxID09PSB1MSArIDEpXG4gICAgICBkMSA9IDEgLSBkMTtcbiAgICBpZiAoMiAqIGQyID09PSB1MiArIDEpXG4gICAgICBkMiA9IDEgLSBkMjtcbiAgICBrMS5pdXNocm4oMSk7XG4gICAgazIuaXVzaHJuKDEpO1xuICB9XG5cbiAgcmV0dXJuIGpzZjtcbn1cbnV0aWxzLmdldEpTRiA9IGdldEpTRjtcblxuZnVuY3Rpb24gY2FjaGVkUHJvcGVydHkob2JqLCBuYW1lLCBjb21wdXRlcikge1xuICB2YXIga2V5ID0gJ18nICsgbmFtZTtcbiAgb2JqLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uIGNhY2hlZFByb3BlcnR5KCkge1xuICAgIHJldHVybiB0aGlzW2tleV0gIT09IHVuZGVmaW5lZCA/IHRoaXNba2V5XSA6XG4gICAgICAgICAgIHRoaXNba2V5XSA9IGNvbXB1dGVyLmNhbGwodGhpcyk7XG4gIH07XG59XG51dGlscy5jYWNoZWRQcm9wZXJ0eSA9IGNhY2hlZFByb3BlcnR5O1xuXG5mdW5jdGlvbiBwYXJzZUJ5dGVzKGJ5dGVzKSB7XG4gIHJldHVybiB0eXBlb2YgYnl0ZXMgPT09ICdzdHJpbmcnID8gdXRpbHMudG9BcnJheShieXRlcywgJ2hleCcpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBieXRlcztcbn1cbnV0aWxzLnBhcnNlQnl0ZXMgPSBwYXJzZUJ5dGVzO1xuXG5mdW5jdGlvbiBpbnRGcm9tTEUoYnl0ZXMpIHtcbiAgcmV0dXJuIG5ldyBCTihieXRlcywgJ2hleCcsICdsZScpO1xufVxudXRpbHMuaW50RnJvbUxFID0gaW50RnJvbUxFO1xuXG4iLCJ2YXIgaGFzaCA9IGV4cG9ydHM7XG5cbmhhc2gudXRpbHMgPSByZXF1aXJlKCcuL2hhc2gvdXRpbHMnKTtcbmhhc2guY29tbW9uID0gcmVxdWlyZSgnLi9oYXNoL2NvbW1vbicpO1xuaGFzaC5zaGEgPSByZXF1aXJlKCcuL2hhc2gvc2hhJyk7XG5oYXNoLnJpcGVtZCA9IHJlcXVpcmUoJy4vaGFzaC9yaXBlbWQnKTtcbmhhc2guaG1hYyA9IHJlcXVpcmUoJy4vaGFzaC9obWFjJyk7XG5cbi8vIFByb3h5IGhhc2ggZnVuY3Rpb25zIHRvIHRoZSBtYWluIG9iamVjdFxuaGFzaC5zaGExID0gaGFzaC5zaGEuc2hhMTtcbmhhc2guc2hhMjU2ID0gaGFzaC5zaGEuc2hhMjU2O1xuaGFzaC5zaGEyMjQgPSBoYXNoLnNoYS5zaGEyMjQ7XG5oYXNoLnNoYTM4NCA9IGhhc2guc2hhLnNoYTM4NDtcbmhhc2guc2hhNTEyID0gaGFzaC5zaGEuc2hhNTEyO1xuaGFzaC5yaXBlbWQxNjAgPSBoYXNoLnJpcGVtZC5yaXBlbWQxNjA7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBhc3NlcnQgPSByZXF1aXJlKCdtaW5pbWFsaXN0aWMtYXNzZXJ0Jyk7XG5cbmZ1bmN0aW9uIEJsb2NrSGFzaCgpIHtcbiAgdGhpcy5wZW5kaW5nID0gbnVsbDtcbiAgdGhpcy5wZW5kaW5nVG90YWwgPSAwO1xuICB0aGlzLmJsb2NrU2l6ZSA9IHRoaXMuY29uc3RydWN0b3IuYmxvY2tTaXplO1xuICB0aGlzLm91dFNpemUgPSB0aGlzLmNvbnN0cnVjdG9yLm91dFNpemU7XG4gIHRoaXMuaG1hY1N0cmVuZ3RoID0gdGhpcy5jb25zdHJ1Y3Rvci5obWFjU3RyZW5ndGg7XG4gIHRoaXMucGFkTGVuZ3RoID0gdGhpcy5jb25zdHJ1Y3Rvci5wYWRMZW5ndGggLyA4O1xuICB0aGlzLmVuZGlhbiA9ICdiaWcnO1xuXG4gIHRoaXMuX2RlbHRhOCA9IHRoaXMuYmxvY2tTaXplIC8gODtcbiAgdGhpcy5fZGVsdGEzMiA9IHRoaXMuYmxvY2tTaXplIC8gMzI7XG59XG5leHBvcnRzLkJsb2NrSGFzaCA9IEJsb2NrSGFzaDtcblxuQmxvY2tIYXNoLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUobXNnLCBlbmMpIHtcbiAgLy8gQ29udmVydCBtZXNzYWdlIHRvIGFycmF5LCBwYWQgaXQsIGFuZCBqb2luIGludG8gMzJiaXQgYmxvY2tzXG4gIG1zZyA9IHV0aWxzLnRvQXJyYXkobXNnLCBlbmMpO1xuICBpZiAoIXRoaXMucGVuZGluZylcbiAgICB0aGlzLnBlbmRpbmcgPSBtc2c7XG4gIGVsc2VcbiAgICB0aGlzLnBlbmRpbmcgPSB0aGlzLnBlbmRpbmcuY29uY2F0KG1zZyk7XG4gIHRoaXMucGVuZGluZ1RvdGFsICs9IG1zZy5sZW5ndGg7XG5cbiAgLy8gRW5vdWdoIGRhdGEsIHRyeSB1cGRhdGluZ1xuICBpZiAodGhpcy5wZW5kaW5nLmxlbmd0aCA+PSB0aGlzLl9kZWx0YTgpIHtcbiAgICBtc2cgPSB0aGlzLnBlbmRpbmc7XG5cbiAgICAvLyBQcm9jZXNzIHBlbmRpbmcgZGF0YSBpbiBibG9ja3NcbiAgICB2YXIgciA9IG1zZy5sZW5ndGggJSB0aGlzLl9kZWx0YTg7XG4gICAgdGhpcy5wZW5kaW5nID0gbXNnLnNsaWNlKG1zZy5sZW5ndGggLSByLCBtc2cubGVuZ3RoKTtcbiAgICBpZiAodGhpcy5wZW5kaW5nLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMucGVuZGluZyA9IG51bGw7XG5cbiAgICBtc2cgPSB1dGlscy5qb2luMzIobXNnLCAwLCBtc2cubGVuZ3RoIC0gciwgdGhpcy5lbmRpYW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbXNnLmxlbmd0aDsgaSArPSB0aGlzLl9kZWx0YTMyKVxuICAgICAgdGhpcy5fdXBkYXRlKG1zZywgaSwgaSArIHRoaXMuX2RlbHRhMzIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5CbG9ja0hhc2gucHJvdG90eXBlLmRpZ2VzdCA9IGZ1bmN0aW9uIGRpZ2VzdChlbmMpIHtcbiAgdGhpcy51cGRhdGUodGhpcy5fcGFkKCkpO1xuICBhc3NlcnQodGhpcy5wZW5kaW5nID09PSBudWxsKTtcblxuICByZXR1cm4gdGhpcy5fZGlnZXN0KGVuYyk7XG59O1xuXG5CbG9ja0hhc2gucHJvdG90eXBlLl9wYWQgPSBmdW5jdGlvbiBwYWQoKSB7XG4gIHZhciBsZW4gPSB0aGlzLnBlbmRpbmdUb3RhbDtcbiAgdmFyIGJ5dGVzID0gdGhpcy5fZGVsdGE4O1xuICB2YXIgayA9IGJ5dGVzIC0gKChsZW4gKyB0aGlzLnBhZExlbmd0aCkgJSBieXRlcyk7XG4gIHZhciByZXMgPSBuZXcgQXJyYXkoayArIHRoaXMucGFkTGVuZ3RoKTtcbiAgcmVzWzBdID0gMHg4MDtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBrOyBpKyspXG4gICAgcmVzW2ldID0gMDtcblxuICAvLyBBcHBlbmQgbGVuZ3RoXG4gIGxlbiA8PD0gMztcbiAgaWYgKHRoaXMuZW5kaWFuID09PSAnYmlnJykge1xuICAgIGZvciAodmFyIHQgPSA4OyB0IDwgdGhpcy5wYWRMZW5ndGg7IHQrKylcbiAgICAgIHJlc1tpKytdID0gMDtcblxuICAgIHJlc1tpKytdID0gMDtcbiAgICByZXNbaSsrXSA9IDA7XG4gICAgcmVzW2krK10gPSAwO1xuICAgIHJlc1tpKytdID0gMDtcbiAgICByZXNbaSsrXSA9IChsZW4gPj4+IDI0KSAmIDB4ZmY7XG4gICAgcmVzW2krK10gPSAobGVuID4+PiAxNikgJiAweGZmO1xuICAgIHJlc1tpKytdID0gKGxlbiA+Pj4gOCkgJiAweGZmO1xuICAgIHJlc1tpKytdID0gbGVuICYgMHhmZjtcbiAgfSBlbHNlIHtcbiAgICByZXNbaSsrXSA9IGxlbiAmIDB4ZmY7XG4gICAgcmVzW2krK10gPSAobGVuID4+PiA4KSAmIDB4ZmY7XG4gICAgcmVzW2krK10gPSAobGVuID4+PiAxNikgJiAweGZmO1xuICAgIHJlc1tpKytdID0gKGxlbiA+Pj4gMjQpICYgMHhmZjtcbiAgICByZXNbaSsrXSA9IDA7XG4gICAgcmVzW2krK10gPSAwO1xuICAgIHJlc1tpKytdID0gMDtcbiAgICByZXNbaSsrXSA9IDA7XG5cbiAgICBmb3IgKHQgPSA4OyB0IDwgdGhpcy5wYWRMZW5ndGg7IHQrKylcbiAgICAgIHJlc1tpKytdID0gMDtcbiAgfVxuXG4gIHJldHVybiByZXM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYXNzZXJ0ID0gcmVxdWlyZSgnbWluaW1hbGlzdGljLWFzc2VydCcpO1xuXG5mdW5jdGlvbiBIbWFjKGhhc2gsIGtleSwgZW5jKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBIbWFjKSlcbiAgICByZXR1cm4gbmV3IEhtYWMoaGFzaCwga2V5LCBlbmMpO1xuICB0aGlzLkhhc2ggPSBoYXNoO1xuICB0aGlzLmJsb2NrU2l6ZSA9IGhhc2guYmxvY2tTaXplIC8gODtcbiAgdGhpcy5vdXRTaXplID0gaGFzaC5vdXRTaXplIC8gODtcbiAgdGhpcy5pbm5lciA9IG51bGw7XG4gIHRoaXMub3V0ZXIgPSBudWxsO1xuXG4gIHRoaXMuX2luaXQodXRpbHMudG9BcnJheShrZXksIGVuYykpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBIbWFjO1xuXG5IbWFjLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uIGluaXQoa2V5KSB7XG4gIC8vIFNob3J0ZW4ga2V5LCBpZiBuZWVkZWRcbiAgaWYgKGtleS5sZW5ndGggPiB0aGlzLmJsb2NrU2l6ZSlcbiAgICBrZXkgPSBuZXcgdGhpcy5IYXNoKCkudXBkYXRlKGtleSkuZGlnZXN0KCk7XG4gIGFzc2VydChrZXkubGVuZ3RoIDw9IHRoaXMuYmxvY2tTaXplKTtcblxuICAvLyBBZGQgcGFkZGluZyB0byBrZXlcbiAgZm9yICh2YXIgaSA9IGtleS5sZW5ndGg7IGkgPCB0aGlzLmJsb2NrU2l6ZTsgaSsrKVxuICAgIGtleS5wdXNoKDApO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBrZXkubGVuZ3RoOyBpKyspXG4gICAga2V5W2ldIF49IDB4MzY7XG4gIHRoaXMuaW5uZXIgPSBuZXcgdGhpcy5IYXNoKCkudXBkYXRlKGtleSk7XG5cbiAgLy8gMHgzNiBeIDB4NWMgPSAweDZhXG4gIGZvciAoaSA9IDA7IGkgPCBrZXkubGVuZ3RoOyBpKyspXG4gICAga2V5W2ldIF49IDB4NmE7XG4gIHRoaXMub3V0ZXIgPSBuZXcgdGhpcy5IYXNoKCkudXBkYXRlKGtleSk7XG59O1xuXG5IbWFjLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUobXNnLCBlbmMpIHtcbiAgdGhpcy5pbm5lci51cGRhdGUobXNnLCBlbmMpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkhtYWMucHJvdG90eXBlLmRpZ2VzdCA9IGZ1bmN0aW9uIGRpZ2VzdChlbmMpIHtcbiAgdGhpcy5vdXRlci51cGRhdGUodGhpcy5pbm5lci5kaWdlc3QoKSk7XG4gIHJldHVybiB0aGlzLm91dGVyLmRpZ2VzdChlbmMpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG5cbnZhciByb3RsMzIgPSB1dGlscy5yb3RsMzI7XG52YXIgc3VtMzIgPSB1dGlscy5zdW0zMjtcbnZhciBzdW0zMl8zID0gdXRpbHMuc3VtMzJfMztcbnZhciBzdW0zMl80ID0gdXRpbHMuc3VtMzJfNDtcbnZhciBCbG9ja0hhc2ggPSBjb21tb24uQmxvY2tIYXNoO1xuXG5mdW5jdGlvbiBSSVBFTUQxNjAoKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSSVBFTUQxNjApKVxuICAgIHJldHVybiBuZXcgUklQRU1EMTYwKCk7XG5cbiAgQmxvY2tIYXNoLmNhbGwodGhpcyk7XG5cbiAgdGhpcy5oID0gWyAweDY3NDUyMzAxLCAweGVmY2RhYjg5LCAweDk4YmFkY2ZlLCAweDEwMzI1NDc2LCAweGMzZDJlMWYwIF07XG4gIHRoaXMuZW5kaWFuID0gJ2xpdHRsZSc7XG59XG51dGlscy5pbmhlcml0cyhSSVBFTUQxNjAsIEJsb2NrSGFzaCk7XG5leHBvcnRzLnJpcGVtZDE2MCA9IFJJUEVNRDE2MDtcblxuUklQRU1EMTYwLmJsb2NrU2l6ZSA9IDUxMjtcblJJUEVNRDE2MC5vdXRTaXplID0gMTYwO1xuUklQRU1EMTYwLmhtYWNTdHJlbmd0aCA9IDE5MjtcblJJUEVNRDE2MC5wYWRMZW5ndGggPSA2NDtcblxuUklQRU1EMTYwLnByb3RvdHlwZS5fdXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlKG1zZywgc3RhcnQpIHtcbiAgdmFyIEEgPSB0aGlzLmhbMF07XG4gIHZhciBCID0gdGhpcy5oWzFdO1xuICB2YXIgQyA9IHRoaXMuaFsyXTtcbiAgdmFyIEQgPSB0aGlzLmhbM107XG4gIHZhciBFID0gdGhpcy5oWzRdO1xuICB2YXIgQWggPSBBO1xuICB2YXIgQmggPSBCO1xuICB2YXIgQ2ggPSBDO1xuICB2YXIgRGggPSBEO1xuICB2YXIgRWggPSBFO1xuICBmb3IgKHZhciBqID0gMDsgaiA8IDgwOyBqKyspIHtcbiAgICB2YXIgVCA9IHN1bTMyKFxuICAgICAgcm90bDMyKFxuICAgICAgICBzdW0zMl80KEEsIGYoaiwgQiwgQywgRCksIG1zZ1tyW2pdICsgc3RhcnRdLCBLKGopKSxcbiAgICAgICAgc1tqXSksXG4gICAgICBFKTtcbiAgICBBID0gRTtcbiAgICBFID0gRDtcbiAgICBEID0gcm90bDMyKEMsIDEwKTtcbiAgICBDID0gQjtcbiAgICBCID0gVDtcbiAgICBUID0gc3VtMzIoXG4gICAgICByb3RsMzIoXG4gICAgICAgIHN1bTMyXzQoQWgsIGYoNzkgLSBqLCBCaCwgQ2gsIERoKSwgbXNnW3JoW2pdICsgc3RhcnRdLCBLaChqKSksXG4gICAgICAgIHNoW2pdKSxcbiAgICAgIEVoKTtcbiAgICBBaCA9IEVoO1xuICAgIEVoID0gRGg7XG4gICAgRGggPSByb3RsMzIoQ2gsIDEwKTtcbiAgICBDaCA9IEJoO1xuICAgIEJoID0gVDtcbiAgfVxuICBUID0gc3VtMzJfMyh0aGlzLmhbMV0sIEMsIERoKTtcbiAgdGhpcy5oWzFdID0gc3VtMzJfMyh0aGlzLmhbMl0sIEQsIEVoKTtcbiAgdGhpcy5oWzJdID0gc3VtMzJfMyh0aGlzLmhbM10sIEUsIEFoKTtcbiAgdGhpcy5oWzNdID0gc3VtMzJfMyh0aGlzLmhbNF0sIEEsIEJoKTtcbiAgdGhpcy5oWzRdID0gc3VtMzJfMyh0aGlzLmhbMF0sIEIsIENoKTtcbiAgdGhpcy5oWzBdID0gVDtcbn07XG5cblJJUEVNRDE2MC5wcm90b3R5cGUuX2RpZ2VzdCA9IGZ1bmN0aW9uIGRpZ2VzdChlbmMpIHtcbiAgaWYgKGVuYyA9PT0gJ2hleCcpXG4gICAgcmV0dXJuIHV0aWxzLnRvSGV4MzIodGhpcy5oLCAnbGl0dGxlJyk7XG4gIGVsc2VcbiAgICByZXR1cm4gdXRpbHMuc3BsaXQzMih0aGlzLmgsICdsaXR0bGUnKTtcbn07XG5cbmZ1bmN0aW9uIGYoaiwgeCwgeSwgeikge1xuICBpZiAoaiA8PSAxNSlcbiAgICByZXR1cm4geCBeIHkgXiB6O1xuICBlbHNlIGlmIChqIDw9IDMxKVxuICAgIHJldHVybiAoeCAmIHkpIHwgKCh+eCkgJiB6KTtcbiAgZWxzZSBpZiAoaiA8PSA0NylcbiAgICByZXR1cm4gKHggfCAofnkpKSBeIHo7XG4gIGVsc2UgaWYgKGogPD0gNjMpXG4gICAgcmV0dXJuICh4ICYgeikgfCAoeSAmICh+eikpO1xuICBlbHNlXG4gICAgcmV0dXJuIHggXiAoeSB8ICh+eikpO1xufVxuXG5mdW5jdGlvbiBLKGopIHtcbiAgaWYgKGogPD0gMTUpXG4gICAgcmV0dXJuIDB4MDAwMDAwMDA7XG4gIGVsc2UgaWYgKGogPD0gMzEpXG4gICAgcmV0dXJuIDB4NWE4Mjc5OTk7XG4gIGVsc2UgaWYgKGogPD0gNDcpXG4gICAgcmV0dXJuIDB4NmVkOWViYTE7XG4gIGVsc2UgaWYgKGogPD0gNjMpXG4gICAgcmV0dXJuIDB4OGYxYmJjZGM7XG4gIGVsc2VcbiAgICByZXR1cm4gMHhhOTUzZmQ0ZTtcbn1cblxuZnVuY3Rpb24gS2goaikge1xuICBpZiAoaiA8PSAxNSlcbiAgICByZXR1cm4gMHg1MGEyOGJlNjtcbiAgZWxzZSBpZiAoaiA8PSAzMSlcbiAgICByZXR1cm4gMHg1YzRkZDEyNDtcbiAgZWxzZSBpZiAoaiA8PSA0NylcbiAgICByZXR1cm4gMHg2ZDcwM2VmMztcbiAgZWxzZSBpZiAoaiA8PSA2MylcbiAgICByZXR1cm4gMHg3YTZkNzZlOTtcbiAgZWxzZVxuICAgIHJldHVybiAweDAwMDAwMDAwO1xufVxuXG52YXIgciA9IFtcbiAgMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNSxcbiAgNywgNCwgMTMsIDEsIDEwLCA2LCAxNSwgMywgMTIsIDAsIDksIDUsIDIsIDE0LCAxMSwgOCxcbiAgMywgMTAsIDE0LCA0LCA5LCAxNSwgOCwgMSwgMiwgNywgMCwgNiwgMTMsIDExLCA1LCAxMixcbiAgMSwgOSwgMTEsIDEwLCAwLCA4LCAxMiwgNCwgMTMsIDMsIDcsIDE1LCAxNCwgNSwgNiwgMixcbiAgNCwgMCwgNSwgOSwgNywgMTIsIDIsIDEwLCAxNCwgMSwgMywgOCwgMTEsIDYsIDE1LCAxM1xuXTtcblxudmFyIHJoID0gW1xuICA1LCAxNCwgNywgMCwgOSwgMiwgMTEsIDQsIDEzLCA2LCAxNSwgOCwgMSwgMTAsIDMsIDEyLFxuICA2LCAxMSwgMywgNywgMCwgMTMsIDUsIDEwLCAxNCwgMTUsIDgsIDEyLCA0LCA5LCAxLCAyLFxuICAxNSwgNSwgMSwgMywgNywgMTQsIDYsIDksIDExLCA4LCAxMiwgMiwgMTAsIDAsIDQsIDEzLFxuICA4LCA2LCA0LCAxLCAzLCAxMSwgMTUsIDAsIDUsIDEyLCAyLCAxMywgOSwgNywgMTAsIDE0LFxuICAxMiwgMTUsIDEwLCA0LCAxLCA1LCA4LCA3LCA2LCAyLCAxMywgMTQsIDAsIDMsIDksIDExXG5dO1xuXG52YXIgcyA9IFtcbiAgMTEsIDE0LCAxNSwgMTIsIDUsIDgsIDcsIDksIDExLCAxMywgMTQsIDE1LCA2LCA3LCA5LCA4LFxuICA3LCA2LCA4LCAxMywgMTEsIDksIDcsIDE1LCA3LCAxMiwgMTUsIDksIDExLCA3LCAxMywgMTIsXG4gIDExLCAxMywgNiwgNywgMTQsIDksIDEzLCAxNSwgMTQsIDgsIDEzLCA2LCA1LCAxMiwgNywgNSxcbiAgMTEsIDEyLCAxNCwgMTUsIDE0LCAxNSwgOSwgOCwgOSwgMTQsIDUsIDYsIDgsIDYsIDUsIDEyLFxuICA5LCAxNSwgNSwgMTEsIDYsIDgsIDEzLCAxMiwgNSwgMTIsIDEzLCAxNCwgMTEsIDgsIDUsIDZcbl07XG5cbnZhciBzaCA9IFtcbiAgOCwgOSwgOSwgMTEsIDEzLCAxNSwgMTUsIDUsIDcsIDcsIDgsIDExLCAxNCwgMTQsIDEyLCA2LFxuICA5LCAxMywgMTUsIDcsIDEyLCA4LCA5LCAxMSwgNywgNywgMTIsIDcsIDYsIDE1LCAxMywgMTEsXG4gIDksIDcsIDE1LCAxMSwgOCwgNiwgNiwgMTQsIDEyLCAxMywgNSwgMTQsIDEzLCAxMywgNywgNSxcbiAgMTUsIDUsIDgsIDExLCAxNCwgMTQsIDYsIDE0LCA2LCA5LCAxMiwgOSwgMTIsIDUsIDE1LCA4LFxuICA4LCA1LCAxMiwgOSwgMTIsIDUsIDE0LCA2LCA4LCAxMywgNiwgNSwgMTUsIDEzLCAxMSwgMTFcbl07XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuc2hhMSA9IHJlcXVpcmUoJy4vc2hhLzEnKTtcbmV4cG9ydHMuc2hhMjI0ID0gcmVxdWlyZSgnLi9zaGEvMjI0Jyk7XG5leHBvcnRzLnNoYTI1NiA9IHJlcXVpcmUoJy4vc2hhLzI1NicpO1xuZXhwb3J0cy5zaGEzODQgPSByZXF1aXJlKCcuL3NoYS8zODQnKTtcbmV4cG9ydHMuc2hhNTEyID0gcmVxdWlyZSgnLi9zaGEvNTEyJyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi4vY29tbW9uJyk7XG52YXIgc2hhQ29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcblxudmFyIHJvdGwzMiA9IHV0aWxzLnJvdGwzMjtcbnZhciBzdW0zMiA9IHV0aWxzLnN1bTMyO1xudmFyIHN1bTMyXzUgPSB1dGlscy5zdW0zMl81O1xudmFyIGZ0XzEgPSBzaGFDb21tb24uZnRfMTtcbnZhciBCbG9ja0hhc2ggPSBjb21tb24uQmxvY2tIYXNoO1xuXG52YXIgc2hhMV9LID0gW1xuICAweDVBODI3OTk5LCAweDZFRDlFQkExLFxuICAweDhGMUJCQ0RDLCAweENBNjJDMUQ2XG5dO1xuXG5mdW5jdGlvbiBTSEExKCkge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgU0hBMSkpXG4gICAgcmV0dXJuIG5ldyBTSEExKCk7XG5cbiAgQmxvY2tIYXNoLmNhbGwodGhpcyk7XG4gIHRoaXMuaCA9IFtcbiAgICAweDY3NDUyMzAxLCAweGVmY2RhYjg5LCAweDk4YmFkY2ZlLFxuICAgIDB4MTAzMjU0NzYsIDB4YzNkMmUxZjAgXTtcbiAgdGhpcy5XID0gbmV3IEFycmF5KDgwKTtcbn1cblxudXRpbHMuaW5oZXJpdHMoU0hBMSwgQmxvY2tIYXNoKTtcbm1vZHVsZS5leHBvcnRzID0gU0hBMTtcblxuU0hBMS5ibG9ja1NpemUgPSA1MTI7XG5TSEExLm91dFNpemUgPSAxNjA7XG5TSEExLmhtYWNTdHJlbmd0aCA9IDgwO1xuU0hBMS5wYWRMZW5ndGggPSA2NDtcblxuU0hBMS5wcm90b3R5cGUuX3VwZGF0ZSA9IGZ1bmN0aW9uIF91cGRhdGUobXNnLCBzdGFydCkge1xuICB2YXIgVyA9IHRoaXMuVztcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IDE2OyBpKyspXG4gICAgV1tpXSA9IG1zZ1tzdGFydCArIGldO1xuXG4gIGZvcig7IGkgPCBXLmxlbmd0aDsgaSsrKVxuICAgIFdbaV0gPSByb3RsMzIoV1tpIC0gM10gXiBXW2kgLSA4XSBeIFdbaSAtIDE0XSBeIFdbaSAtIDE2XSwgMSk7XG5cbiAgdmFyIGEgPSB0aGlzLmhbMF07XG4gIHZhciBiID0gdGhpcy5oWzFdO1xuICB2YXIgYyA9IHRoaXMuaFsyXTtcbiAgdmFyIGQgPSB0aGlzLmhbM107XG4gIHZhciBlID0gdGhpcy5oWzRdO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBXLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHMgPSB+fihpIC8gMjApO1xuICAgIHZhciB0ID0gc3VtMzJfNShyb3RsMzIoYSwgNSksIGZ0XzEocywgYiwgYywgZCksIGUsIFdbaV0sIHNoYTFfS1tzXSk7XG4gICAgZSA9IGQ7XG4gICAgZCA9IGM7XG4gICAgYyA9IHJvdGwzMihiLCAzMCk7XG4gICAgYiA9IGE7XG4gICAgYSA9IHQ7XG4gIH1cblxuICB0aGlzLmhbMF0gPSBzdW0zMih0aGlzLmhbMF0sIGEpO1xuICB0aGlzLmhbMV0gPSBzdW0zMih0aGlzLmhbMV0sIGIpO1xuICB0aGlzLmhbMl0gPSBzdW0zMih0aGlzLmhbMl0sIGMpO1xuICB0aGlzLmhbM10gPSBzdW0zMih0aGlzLmhbM10sIGQpO1xuICB0aGlzLmhbNF0gPSBzdW0zMih0aGlzLmhbNF0sIGUpO1xufTtcblxuU0hBMS5wcm90b3R5cGUuX2RpZ2VzdCA9IGZ1bmN0aW9uIGRpZ2VzdChlbmMpIHtcbiAgaWYgKGVuYyA9PT0gJ2hleCcpXG4gICAgcmV0dXJuIHV0aWxzLnRvSGV4MzIodGhpcy5oLCAnYmlnJyk7XG4gIGVsc2VcbiAgICByZXR1cm4gdXRpbHMuc3BsaXQzMih0aGlzLmgsICdiaWcnKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG52YXIgU0hBMjU2ID0gcmVxdWlyZSgnLi8yNTYnKTtcblxuZnVuY3Rpb24gU0hBMjI0KCkge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgU0hBMjI0KSlcbiAgICByZXR1cm4gbmV3IFNIQTIyNCgpO1xuXG4gIFNIQTI1Ni5jYWxsKHRoaXMpO1xuICB0aGlzLmggPSBbXG4gICAgMHhjMTA1OWVkOCwgMHgzNjdjZDUwNywgMHgzMDcwZGQxNywgMHhmNzBlNTkzOSxcbiAgICAweGZmYzAwYjMxLCAweDY4NTgxNTExLCAweDY0Zjk4ZmE3LCAweGJlZmE0ZmE0IF07XG59XG51dGlscy5pbmhlcml0cyhTSEEyMjQsIFNIQTI1Nik7XG5tb2R1bGUuZXhwb3J0cyA9IFNIQTIyNDtcblxuU0hBMjI0LmJsb2NrU2l6ZSA9IDUxMjtcblNIQTIyNC5vdXRTaXplID0gMjI0O1xuU0hBMjI0LmhtYWNTdHJlbmd0aCA9IDE5MjtcblNIQTIyNC5wYWRMZW5ndGggPSA2NDtcblxuU0hBMjI0LnByb3RvdHlwZS5fZGlnZXN0ID0gZnVuY3Rpb24gZGlnZXN0KGVuYykge1xuICAvLyBKdXN0IHRydW5jYXRlIG91dHB1dFxuICBpZiAoZW5jID09PSAnaGV4JylcbiAgICByZXR1cm4gdXRpbHMudG9IZXgzMih0aGlzLmguc2xpY2UoMCwgNyksICdiaWcnKTtcbiAgZWxzZVxuICAgIHJldHVybiB1dGlscy5zcGxpdDMyKHRoaXMuaC5zbGljZSgwLCA3KSwgJ2JpZycpO1xufTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4uL2NvbW1vbicpO1xudmFyIHNoYUNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgYXNzZXJ0ID0gcmVxdWlyZSgnbWluaW1hbGlzdGljLWFzc2VydCcpO1xuXG52YXIgc3VtMzIgPSB1dGlscy5zdW0zMjtcbnZhciBzdW0zMl80ID0gdXRpbHMuc3VtMzJfNDtcbnZhciBzdW0zMl81ID0gdXRpbHMuc3VtMzJfNTtcbnZhciBjaDMyID0gc2hhQ29tbW9uLmNoMzI7XG52YXIgbWFqMzIgPSBzaGFDb21tb24ubWFqMzI7XG52YXIgczBfMjU2ID0gc2hhQ29tbW9uLnMwXzI1NjtcbnZhciBzMV8yNTYgPSBzaGFDb21tb24uczFfMjU2O1xudmFyIGcwXzI1NiA9IHNoYUNvbW1vbi5nMF8yNTY7XG52YXIgZzFfMjU2ID0gc2hhQ29tbW9uLmcxXzI1NjtcblxudmFyIEJsb2NrSGFzaCA9IGNvbW1vbi5CbG9ja0hhc2g7XG5cbnZhciBzaGEyNTZfSyA9IFtcbiAgMHg0MjhhMmY5OCwgMHg3MTM3NDQ5MSwgMHhiNWMwZmJjZiwgMHhlOWI1ZGJhNSxcbiAgMHgzOTU2YzI1YiwgMHg1OWYxMTFmMSwgMHg5MjNmODJhNCwgMHhhYjFjNWVkNSxcbiAgMHhkODA3YWE5OCwgMHgxMjgzNWIwMSwgMHgyNDMxODViZSwgMHg1NTBjN2RjMyxcbiAgMHg3MmJlNWQ3NCwgMHg4MGRlYjFmZSwgMHg5YmRjMDZhNywgMHhjMTliZjE3NCxcbiAgMHhlNDliNjljMSwgMHhlZmJlNDc4NiwgMHgwZmMxOWRjNiwgMHgyNDBjYTFjYyxcbiAgMHgyZGU5MmM2ZiwgMHg0YTc0ODRhYSwgMHg1Y2IwYTlkYywgMHg3NmY5ODhkYSxcbiAgMHg5ODNlNTE1MiwgMHhhODMxYzY2ZCwgMHhiMDAzMjdjOCwgMHhiZjU5N2ZjNyxcbiAgMHhjNmUwMGJmMywgMHhkNWE3OTE0NywgMHgwNmNhNjM1MSwgMHgxNDI5Mjk2NyxcbiAgMHgyN2I3MGE4NSwgMHgyZTFiMjEzOCwgMHg0ZDJjNmRmYywgMHg1MzM4MGQxMyxcbiAgMHg2NTBhNzM1NCwgMHg3NjZhMGFiYiwgMHg4MWMyYzkyZSwgMHg5MjcyMmM4NSxcbiAgMHhhMmJmZThhMSwgMHhhODFhNjY0YiwgMHhjMjRiOGI3MCwgMHhjNzZjNTFhMyxcbiAgMHhkMTkyZTgxOSwgMHhkNjk5MDYyNCwgMHhmNDBlMzU4NSwgMHgxMDZhYTA3MCxcbiAgMHgxOWE0YzExNiwgMHgxZTM3NmMwOCwgMHgyNzQ4Nzc0YywgMHgzNGIwYmNiNSxcbiAgMHgzOTFjMGNiMywgMHg0ZWQ4YWE0YSwgMHg1YjljY2E0ZiwgMHg2ODJlNmZmMyxcbiAgMHg3NDhmODJlZSwgMHg3OGE1NjM2ZiwgMHg4NGM4NzgxNCwgMHg4Y2M3MDIwOCxcbiAgMHg5MGJlZmZmYSwgMHhhNDUwNmNlYiwgMHhiZWY5YTNmNywgMHhjNjcxNzhmMlxuXTtcblxuZnVuY3Rpb24gU0hBMjU2KCkge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgU0hBMjU2KSlcbiAgICByZXR1cm4gbmV3IFNIQTI1NigpO1xuXG4gIEJsb2NrSGFzaC5jYWxsKHRoaXMpO1xuICB0aGlzLmggPSBbXG4gICAgMHg2YTA5ZTY2NywgMHhiYjY3YWU4NSwgMHgzYzZlZjM3MiwgMHhhNTRmZjUzYSxcbiAgICAweDUxMGU1MjdmLCAweDliMDU2ODhjLCAweDFmODNkOWFiLCAweDViZTBjZDE5XG4gIF07XG4gIHRoaXMuayA9IHNoYTI1Nl9LO1xuICB0aGlzLlcgPSBuZXcgQXJyYXkoNjQpO1xufVxudXRpbHMuaW5oZXJpdHMoU0hBMjU2LCBCbG9ja0hhc2gpO1xubW9kdWxlLmV4cG9ydHMgPSBTSEEyNTY7XG5cblNIQTI1Ni5ibG9ja1NpemUgPSA1MTI7XG5TSEEyNTYub3V0U2l6ZSA9IDI1NjtcblNIQTI1Ni5obWFjU3RyZW5ndGggPSAxOTI7XG5TSEEyNTYucGFkTGVuZ3RoID0gNjQ7XG5cblNIQTI1Ni5wcm90b3R5cGUuX3VwZGF0ZSA9IGZ1bmN0aW9uIF91cGRhdGUobXNnLCBzdGFydCkge1xuICB2YXIgVyA9IHRoaXMuVztcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IDE2OyBpKyspXG4gICAgV1tpXSA9IG1zZ1tzdGFydCArIGldO1xuICBmb3IgKDsgaSA8IFcubGVuZ3RoOyBpKyspXG4gICAgV1tpXSA9IHN1bTMyXzQoZzFfMjU2KFdbaSAtIDJdKSwgV1tpIC0gN10sIGcwXzI1NihXW2kgLSAxNV0pLCBXW2kgLSAxNl0pO1xuXG4gIHZhciBhID0gdGhpcy5oWzBdO1xuICB2YXIgYiA9IHRoaXMuaFsxXTtcbiAgdmFyIGMgPSB0aGlzLmhbMl07XG4gIHZhciBkID0gdGhpcy5oWzNdO1xuICB2YXIgZSA9IHRoaXMuaFs0XTtcbiAgdmFyIGYgPSB0aGlzLmhbNV07XG4gIHZhciBnID0gdGhpcy5oWzZdO1xuICB2YXIgaCA9IHRoaXMuaFs3XTtcblxuICBhc3NlcnQodGhpcy5rLmxlbmd0aCA9PT0gVy5sZW5ndGgpO1xuICBmb3IgKGkgPSAwOyBpIDwgVy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBUMSA9IHN1bTMyXzUoaCwgczFfMjU2KGUpLCBjaDMyKGUsIGYsIGcpLCB0aGlzLmtbaV0sIFdbaV0pO1xuICAgIHZhciBUMiA9IHN1bTMyKHMwXzI1NihhKSwgbWFqMzIoYSwgYiwgYykpO1xuICAgIGggPSBnO1xuICAgIGcgPSBmO1xuICAgIGYgPSBlO1xuICAgIGUgPSBzdW0zMihkLCBUMSk7XG4gICAgZCA9IGM7XG4gICAgYyA9IGI7XG4gICAgYiA9IGE7XG4gICAgYSA9IHN1bTMyKFQxLCBUMik7XG4gIH1cblxuICB0aGlzLmhbMF0gPSBzdW0zMih0aGlzLmhbMF0sIGEpO1xuICB0aGlzLmhbMV0gPSBzdW0zMih0aGlzLmhbMV0sIGIpO1xuICB0aGlzLmhbMl0gPSBzdW0zMih0aGlzLmhbMl0sIGMpO1xuICB0aGlzLmhbM10gPSBzdW0zMih0aGlzLmhbM10sIGQpO1xuICB0aGlzLmhbNF0gPSBzdW0zMih0aGlzLmhbNF0sIGUpO1xuICB0aGlzLmhbNV0gPSBzdW0zMih0aGlzLmhbNV0sIGYpO1xuICB0aGlzLmhbNl0gPSBzdW0zMih0aGlzLmhbNl0sIGcpO1xuICB0aGlzLmhbN10gPSBzdW0zMih0aGlzLmhbN10sIGgpO1xufTtcblxuU0hBMjU2LnByb3RvdHlwZS5fZGlnZXN0ID0gZnVuY3Rpb24gZGlnZXN0KGVuYykge1xuICBpZiAoZW5jID09PSAnaGV4JylcbiAgICByZXR1cm4gdXRpbHMudG9IZXgzMih0aGlzLmgsICdiaWcnKTtcbiAgZWxzZVxuICAgIHJldHVybiB1dGlscy5zcGxpdDMyKHRoaXMuaCwgJ2JpZycpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxudmFyIFNIQTUxMiA9IHJlcXVpcmUoJy4vNTEyJyk7XG5cbmZ1bmN0aW9uIFNIQTM4NCgpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFNIQTM4NCkpXG4gICAgcmV0dXJuIG5ldyBTSEEzODQoKTtcblxuICBTSEE1MTIuY2FsbCh0aGlzKTtcbiAgdGhpcy5oID0gW1xuICAgIDB4Y2JiYjlkNWQsIDB4YzEwNTllZDgsXG4gICAgMHg2MjlhMjkyYSwgMHgzNjdjZDUwNyxcbiAgICAweDkxNTkwMTVhLCAweDMwNzBkZDE3LFxuICAgIDB4MTUyZmVjZDgsIDB4ZjcwZTU5MzksXG4gICAgMHg2NzMzMjY2NywgMHhmZmMwMGIzMSxcbiAgICAweDhlYjQ0YTg3LCAweDY4NTgxNTExLFxuICAgIDB4ZGIwYzJlMGQsIDB4NjRmOThmYTcsXG4gICAgMHg0N2I1NDgxZCwgMHhiZWZhNGZhNCBdO1xufVxudXRpbHMuaW5oZXJpdHMoU0hBMzg0LCBTSEE1MTIpO1xubW9kdWxlLmV4cG9ydHMgPSBTSEEzODQ7XG5cblNIQTM4NC5ibG9ja1NpemUgPSAxMDI0O1xuU0hBMzg0Lm91dFNpemUgPSAzODQ7XG5TSEEzODQuaG1hY1N0cmVuZ3RoID0gMTkyO1xuU0hBMzg0LnBhZExlbmd0aCA9IDEyODtcblxuU0hBMzg0LnByb3RvdHlwZS5fZGlnZXN0ID0gZnVuY3Rpb24gZGlnZXN0KGVuYykge1xuICBpZiAoZW5jID09PSAnaGV4JylcbiAgICByZXR1cm4gdXRpbHMudG9IZXgzMih0aGlzLmguc2xpY2UoMCwgMTIpLCAnYmlnJyk7XG4gIGVsc2VcbiAgICByZXR1cm4gdXRpbHMuc3BsaXQzMih0aGlzLmguc2xpY2UoMCwgMTIpLCAnYmlnJyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4uL2NvbW1vbicpO1xudmFyIGFzc2VydCA9IHJlcXVpcmUoJ21pbmltYWxpc3RpYy1hc3NlcnQnKTtcblxudmFyIHJvdHI2NF9oaSA9IHV0aWxzLnJvdHI2NF9oaTtcbnZhciByb3RyNjRfbG8gPSB1dGlscy5yb3RyNjRfbG87XG52YXIgc2hyNjRfaGkgPSB1dGlscy5zaHI2NF9oaTtcbnZhciBzaHI2NF9sbyA9IHV0aWxzLnNocjY0X2xvO1xudmFyIHN1bTY0ID0gdXRpbHMuc3VtNjQ7XG52YXIgc3VtNjRfaGkgPSB1dGlscy5zdW02NF9oaTtcbnZhciBzdW02NF9sbyA9IHV0aWxzLnN1bTY0X2xvO1xudmFyIHN1bTY0XzRfaGkgPSB1dGlscy5zdW02NF80X2hpO1xudmFyIHN1bTY0XzRfbG8gPSB1dGlscy5zdW02NF80X2xvO1xudmFyIHN1bTY0XzVfaGkgPSB1dGlscy5zdW02NF81X2hpO1xudmFyIHN1bTY0XzVfbG8gPSB1dGlscy5zdW02NF81X2xvO1xuXG52YXIgQmxvY2tIYXNoID0gY29tbW9uLkJsb2NrSGFzaDtcblxudmFyIHNoYTUxMl9LID0gW1xuICAweDQyOGEyZjk4LCAweGQ3MjhhZTIyLCAweDcxMzc0NDkxLCAweDIzZWY2NWNkLFxuICAweGI1YzBmYmNmLCAweGVjNGQzYjJmLCAweGU5YjVkYmE1LCAweDgxODlkYmJjLFxuICAweDM5NTZjMjViLCAweGYzNDhiNTM4LCAweDU5ZjExMWYxLCAweGI2MDVkMDE5LFxuICAweDkyM2Y4MmE0LCAweGFmMTk0ZjliLCAweGFiMWM1ZWQ1LCAweGRhNmQ4MTE4LFxuICAweGQ4MDdhYTk4LCAweGEzMDMwMjQyLCAweDEyODM1YjAxLCAweDQ1NzA2ZmJlLFxuICAweDI0MzE4NWJlLCAweDRlZTRiMjhjLCAweDU1MGM3ZGMzLCAweGQ1ZmZiNGUyLFxuICAweDcyYmU1ZDc0LCAweGYyN2I4OTZmLCAweDgwZGViMWZlLCAweDNiMTY5NmIxLFxuICAweDliZGMwNmE3LCAweDI1YzcxMjM1LCAweGMxOWJmMTc0LCAweGNmNjkyNjk0LFxuICAweGU0OWI2OWMxLCAweDllZjE0YWQyLCAweGVmYmU0Nzg2LCAweDM4NGYyNWUzLFxuICAweDBmYzE5ZGM2LCAweDhiOGNkNWI1LCAweDI0MGNhMWNjLCAweDc3YWM5YzY1LFxuICAweDJkZTkyYzZmLCAweDU5MmIwMjc1LCAweDRhNzQ4NGFhLCAweDZlYTZlNDgzLFxuICAweDVjYjBhOWRjLCAweGJkNDFmYmQ0LCAweDc2Zjk4OGRhLCAweDgzMTE1M2I1LFxuICAweDk4M2U1MTUyLCAweGVlNjZkZmFiLCAweGE4MzFjNjZkLCAweDJkYjQzMjEwLFxuICAweGIwMDMyN2M4LCAweDk4ZmIyMTNmLCAweGJmNTk3ZmM3LCAweGJlZWYwZWU0LFxuICAweGM2ZTAwYmYzLCAweDNkYTg4ZmMyLCAweGQ1YTc5MTQ3LCAweDkzMGFhNzI1LFxuICAweDA2Y2E2MzUxLCAweGUwMDM4MjZmLCAweDE0MjkyOTY3LCAweDBhMGU2ZTcwLFxuICAweDI3YjcwYTg1LCAweDQ2ZDIyZmZjLCAweDJlMWIyMTM4LCAweDVjMjZjOTI2LFxuICAweDRkMmM2ZGZjLCAweDVhYzQyYWVkLCAweDUzMzgwZDEzLCAweDlkOTViM2RmLFxuICAweDY1MGE3MzU0LCAweDhiYWY2M2RlLCAweDc2NmEwYWJiLCAweDNjNzdiMmE4LFxuICAweDgxYzJjOTJlLCAweDQ3ZWRhZWU2LCAweDkyNzIyYzg1LCAweDE0ODIzNTNiLFxuICAweGEyYmZlOGExLCAweDRjZjEwMzY0LCAweGE4MWE2NjRiLCAweGJjNDIzMDAxLFxuICAweGMyNGI4YjcwLCAweGQwZjg5NzkxLCAweGM3NmM1MWEzLCAweDA2NTRiZTMwLFxuICAweGQxOTJlODE5LCAweGQ2ZWY1MjE4LCAweGQ2OTkwNjI0LCAweDU1NjVhOTEwLFxuICAweGY0MGUzNTg1LCAweDU3NzEyMDJhLCAweDEwNmFhMDcwLCAweDMyYmJkMWI4LFxuICAweDE5YTRjMTE2LCAweGI4ZDJkMGM4LCAweDFlMzc2YzA4LCAweDUxNDFhYjUzLFxuICAweDI3NDg3NzRjLCAweGRmOGVlYjk5LCAweDM0YjBiY2I1LCAweGUxOWI0OGE4LFxuICAweDM5MWMwY2IzLCAweGM1Yzk1YTYzLCAweDRlZDhhYTRhLCAweGUzNDE4YWNiLFxuICAweDViOWNjYTRmLCAweDc3NjNlMzczLCAweDY4MmU2ZmYzLCAweGQ2YjJiOGEzLFxuICAweDc0OGY4MmVlLCAweDVkZWZiMmZjLCAweDc4YTU2MzZmLCAweDQzMTcyZjYwLFxuICAweDg0Yzg3ODE0LCAweGExZjBhYjcyLCAweDhjYzcwMjA4LCAweDFhNjQzOWVjLFxuICAweDkwYmVmZmZhLCAweDIzNjMxZTI4LCAweGE0NTA2Y2ViLCAweGRlODJiZGU5LFxuICAweGJlZjlhM2Y3LCAweGIyYzY3OTE1LCAweGM2NzE3OGYyLCAweGUzNzI1MzJiLFxuICAweGNhMjczZWNlLCAweGVhMjY2MTljLCAweGQxODZiOGM3LCAweDIxYzBjMjA3LFxuICAweGVhZGE3ZGQ2LCAweGNkZTBlYjFlLCAweGY1N2Q0ZjdmLCAweGVlNmVkMTc4LFxuICAweDA2ZjA2N2FhLCAweDcyMTc2ZmJhLCAweDBhNjM3ZGM1LCAweGEyYzg5OGE2LFxuICAweDExM2Y5ODA0LCAweGJlZjkwZGFlLCAweDFiNzEwYjM1LCAweDEzMWM0NzFiLFxuICAweDI4ZGI3N2Y1LCAweDIzMDQ3ZDg0LCAweDMyY2FhYjdiLCAweDQwYzcyNDkzLFxuICAweDNjOWViZTBhLCAweDE1YzliZWJjLCAweDQzMWQ2N2M0LCAweDljMTAwZDRjLFxuICAweDRjYzVkNGJlLCAweGNiM2U0MmI2LCAweDU5N2YyOTljLCAweGZjNjU3ZTJhLFxuICAweDVmY2I2ZmFiLCAweDNhZDZmYWVjLCAweDZjNDQxOThjLCAweDRhNDc1ODE3XG5dO1xuXG5mdW5jdGlvbiBTSEE1MTIoKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBTSEE1MTIpKVxuICAgIHJldHVybiBuZXcgU0hBNTEyKCk7XG5cbiAgQmxvY2tIYXNoLmNhbGwodGhpcyk7XG4gIHRoaXMuaCA9IFtcbiAgICAweDZhMDllNjY3LCAweGYzYmNjOTA4LFxuICAgIDB4YmI2N2FlODUsIDB4ODRjYWE3M2IsXG4gICAgMHgzYzZlZjM3MiwgMHhmZTk0ZjgyYixcbiAgICAweGE1NGZmNTNhLCAweDVmMWQzNmYxLFxuICAgIDB4NTEwZTUyN2YsIDB4YWRlNjgyZDEsXG4gICAgMHg5YjA1Njg4YywgMHgyYjNlNmMxZixcbiAgICAweDFmODNkOWFiLCAweGZiNDFiZDZiLFxuICAgIDB4NWJlMGNkMTksIDB4MTM3ZTIxNzkgXTtcbiAgdGhpcy5rID0gc2hhNTEyX0s7XG4gIHRoaXMuVyA9IG5ldyBBcnJheSgxNjApO1xufVxudXRpbHMuaW5oZXJpdHMoU0hBNTEyLCBCbG9ja0hhc2gpO1xubW9kdWxlLmV4cG9ydHMgPSBTSEE1MTI7XG5cblNIQTUxMi5ibG9ja1NpemUgPSAxMDI0O1xuU0hBNTEyLm91dFNpemUgPSA1MTI7XG5TSEE1MTIuaG1hY1N0cmVuZ3RoID0gMTkyO1xuU0hBNTEyLnBhZExlbmd0aCA9IDEyODtcblxuU0hBNTEyLnByb3RvdHlwZS5fcHJlcGFyZUJsb2NrID0gZnVuY3Rpb24gX3ByZXBhcmVCbG9jayhtc2csIHN0YXJ0KSB7XG4gIHZhciBXID0gdGhpcy5XO1xuXG4gIC8vIDMyIHggMzJiaXQgd29yZHNcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCAzMjsgaSsrKVxuICAgIFdbaV0gPSBtc2dbc3RhcnQgKyBpXTtcbiAgZm9yICg7IGkgPCBXLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgdmFyIGMwX2hpID0gZzFfNTEyX2hpKFdbaSAtIDRdLCBXW2kgLSAzXSk7ICAvLyBpIC0gMlxuICAgIHZhciBjMF9sbyA9IGcxXzUxMl9sbyhXW2kgLSA0XSwgV1tpIC0gM10pO1xuICAgIHZhciBjMV9oaSA9IFdbaSAtIDE0XTsgIC8vIGkgLSA3XG4gICAgdmFyIGMxX2xvID0gV1tpIC0gMTNdO1xuICAgIHZhciBjMl9oaSA9IGcwXzUxMl9oaShXW2kgLSAzMF0sIFdbaSAtIDI5XSk7ICAvLyBpIC0gMTVcbiAgICB2YXIgYzJfbG8gPSBnMF81MTJfbG8oV1tpIC0gMzBdLCBXW2kgLSAyOV0pO1xuICAgIHZhciBjM19oaSA9IFdbaSAtIDMyXTsgIC8vIGkgLSAxNlxuICAgIHZhciBjM19sbyA9IFdbaSAtIDMxXTtcblxuICAgIFdbaV0gPSBzdW02NF80X2hpKFxuICAgICAgYzBfaGksIGMwX2xvLFxuICAgICAgYzFfaGksIGMxX2xvLFxuICAgICAgYzJfaGksIGMyX2xvLFxuICAgICAgYzNfaGksIGMzX2xvKTtcbiAgICBXW2kgKyAxXSA9IHN1bTY0XzRfbG8oXG4gICAgICBjMF9oaSwgYzBfbG8sXG4gICAgICBjMV9oaSwgYzFfbG8sXG4gICAgICBjMl9oaSwgYzJfbG8sXG4gICAgICBjM19oaSwgYzNfbG8pO1xuICB9XG59O1xuXG5TSEE1MTIucHJvdG90eXBlLl91cGRhdGUgPSBmdW5jdGlvbiBfdXBkYXRlKG1zZywgc3RhcnQpIHtcbiAgdGhpcy5fcHJlcGFyZUJsb2NrKG1zZywgc3RhcnQpO1xuXG4gIHZhciBXID0gdGhpcy5XO1xuXG4gIHZhciBhaCA9IHRoaXMuaFswXTtcbiAgdmFyIGFsID0gdGhpcy5oWzFdO1xuICB2YXIgYmggPSB0aGlzLmhbMl07XG4gIHZhciBibCA9IHRoaXMuaFszXTtcbiAgdmFyIGNoID0gdGhpcy5oWzRdO1xuICB2YXIgY2wgPSB0aGlzLmhbNV07XG4gIHZhciBkaCA9IHRoaXMuaFs2XTtcbiAgdmFyIGRsID0gdGhpcy5oWzddO1xuICB2YXIgZWggPSB0aGlzLmhbOF07XG4gIHZhciBlbCA9IHRoaXMuaFs5XTtcbiAgdmFyIGZoID0gdGhpcy5oWzEwXTtcbiAgdmFyIGZsID0gdGhpcy5oWzExXTtcbiAgdmFyIGdoID0gdGhpcy5oWzEyXTtcbiAgdmFyIGdsID0gdGhpcy5oWzEzXTtcbiAgdmFyIGhoID0gdGhpcy5oWzE0XTtcbiAgdmFyIGhsID0gdGhpcy5oWzE1XTtcblxuICBhc3NlcnQodGhpcy5rLmxlbmd0aCA9PT0gVy5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IFcubGVuZ3RoOyBpICs9IDIpIHtcbiAgICB2YXIgYzBfaGkgPSBoaDtcbiAgICB2YXIgYzBfbG8gPSBobDtcbiAgICB2YXIgYzFfaGkgPSBzMV81MTJfaGkoZWgsIGVsKTtcbiAgICB2YXIgYzFfbG8gPSBzMV81MTJfbG8oZWgsIGVsKTtcbiAgICB2YXIgYzJfaGkgPSBjaDY0X2hpKGVoLCBlbCwgZmgsIGZsLCBnaCwgZ2wpO1xuICAgIHZhciBjMl9sbyA9IGNoNjRfbG8oZWgsIGVsLCBmaCwgZmwsIGdoLCBnbCk7XG4gICAgdmFyIGMzX2hpID0gdGhpcy5rW2ldO1xuICAgIHZhciBjM19sbyA9IHRoaXMua1tpICsgMV07XG4gICAgdmFyIGM0X2hpID0gV1tpXTtcbiAgICB2YXIgYzRfbG8gPSBXW2kgKyAxXTtcblxuICAgIHZhciBUMV9oaSA9IHN1bTY0XzVfaGkoXG4gICAgICBjMF9oaSwgYzBfbG8sXG4gICAgICBjMV9oaSwgYzFfbG8sXG4gICAgICBjMl9oaSwgYzJfbG8sXG4gICAgICBjM19oaSwgYzNfbG8sXG4gICAgICBjNF9oaSwgYzRfbG8pO1xuICAgIHZhciBUMV9sbyA9IHN1bTY0XzVfbG8oXG4gICAgICBjMF9oaSwgYzBfbG8sXG4gICAgICBjMV9oaSwgYzFfbG8sXG4gICAgICBjMl9oaSwgYzJfbG8sXG4gICAgICBjM19oaSwgYzNfbG8sXG4gICAgICBjNF9oaSwgYzRfbG8pO1xuXG4gICAgYzBfaGkgPSBzMF81MTJfaGkoYWgsIGFsKTtcbiAgICBjMF9sbyA9IHMwXzUxMl9sbyhhaCwgYWwpO1xuICAgIGMxX2hpID0gbWFqNjRfaGkoYWgsIGFsLCBiaCwgYmwsIGNoLCBjbCk7XG4gICAgYzFfbG8gPSBtYWo2NF9sbyhhaCwgYWwsIGJoLCBibCwgY2gsIGNsKTtcblxuICAgIHZhciBUMl9oaSA9IHN1bTY0X2hpKGMwX2hpLCBjMF9sbywgYzFfaGksIGMxX2xvKTtcbiAgICB2YXIgVDJfbG8gPSBzdW02NF9sbyhjMF9oaSwgYzBfbG8sIGMxX2hpLCBjMV9sbyk7XG5cbiAgICBoaCA9IGdoO1xuICAgIGhsID0gZ2w7XG5cbiAgICBnaCA9IGZoO1xuICAgIGdsID0gZmw7XG5cbiAgICBmaCA9IGVoO1xuICAgIGZsID0gZWw7XG5cbiAgICBlaCA9IHN1bTY0X2hpKGRoLCBkbCwgVDFfaGksIFQxX2xvKTtcbiAgICBlbCA9IHN1bTY0X2xvKGRsLCBkbCwgVDFfaGksIFQxX2xvKTtcblxuICAgIGRoID0gY2g7XG4gICAgZGwgPSBjbDtcblxuICAgIGNoID0gYmg7XG4gICAgY2wgPSBibDtcblxuICAgIGJoID0gYWg7XG4gICAgYmwgPSBhbDtcblxuICAgIGFoID0gc3VtNjRfaGkoVDFfaGksIFQxX2xvLCBUMl9oaSwgVDJfbG8pO1xuICAgIGFsID0gc3VtNjRfbG8oVDFfaGksIFQxX2xvLCBUMl9oaSwgVDJfbG8pO1xuICB9XG5cbiAgc3VtNjQodGhpcy5oLCAwLCBhaCwgYWwpO1xuICBzdW02NCh0aGlzLmgsIDIsIGJoLCBibCk7XG4gIHN1bTY0KHRoaXMuaCwgNCwgY2gsIGNsKTtcbiAgc3VtNjQodGhpcy5oLCA2LCBkaCwgZGwpO1xuICBzdW02NCh0aGlzLmgsIDgsIGVoLCBlbCk7XG4gIHN1bTY0KHRoaXMuaCwgMTAsIGZoLCBmbCk7XG4gIHN1bTY0KHRoaXMuaCwgMTIsIGdoLCBnbCk7XG4gIHN1bTY0KHRoaXMuaCwgMTQsIGhoLCBobCk7XG59O1xuXG5TSEE1MTIucHJvdG90eXBlLl9kaWdlc3QgPSBmdW5jdGlvbiBkaWdlc3QoZW5jKSB7XG4gIGlmIChlbmMgPT09ICdoZXgnKVxuICAgIHJldHVybiB1dGlscy50b0hleDMyKHRoaXMuaCwgJ2JpZycpO1xuICBlbHNlXG4gICAgcmV0dXJuIHV0aWxzLnNwbGl0MzIodGhpcy5oLCAnYmlnJyk7XG59O1xuXG5mdW5jdGlvbiBjaDY0X2hpKHhoLCB4bCwgeWgsIHlsLCB6aCkge1xuICB2YXIgciA9ICh4aCAmIHloKSBeICgofnhoKSAmIHpoKTtcbiAgaWYgKHIgPCAwKVxuICAgIHIgKz0gMHgxMDAwMDAwMDA7XG4gIHJldHVybiByO1xufVxuXG5mdW5jdGlvbiBjaDY0X2xvKHhoLCB4bCwgeWgsIHlsLCB6aCwgemwpIHtcbiAgdmFyIHIgPSAoeGwgJiB5bCkgXiAoKH54bCkgJiB6bCk7XG4gIGlmIChyIDwgMClcbiAgICByICs9IDB4MTAwMDAwMDAwO1xuICByZXR1cm4gcjtcbn1cblxuZnVuY3Rpb24gbWFqNjRfaGkoeGgsIHhsLCB5aCwgeWwsIHpoKSB7XG4gIHZhciByID0gKHhoICYgeWgpIF4gKHhoICYgemgpIF4gKHloICYgemgpO1xuICBpZiAociA8IDApXG4gICAgciArPSAweDEwMDAwMDAwMDtcbiAgcmV0dXJuIHI7XG59XG5cbmZ1bmN0aW9uIG1hajY0X2xvKHhoLCB4bCwgeWgsIHlsLCB6aCwgemwpIHtcbiAgdmFyIHIgPSAoeGwgJiB5bCkgXiAoeGwgJiB6bCkgXiAoeWwgJiB6bCk7XG4gIGlmIChyIDwgMClcbiAgICByICs9IDB4MTAwMDAwMDAwO1xuICByZXR1cm4gcjtcbn1cblxuZnVuY3Rpb24gczBfNTEyX2hpKHhoLCB4bCkge1xuICB2YXIgYzBfaGkgPSByb3RyNjRfaGkoeGgsIHhsLCAyOCk7XG4gIHZhciBjMV9oaSA9IHJvdHI2NF9oaSh4bCwgeGgsIDIpOyAgLy8gMzRcbiAgdmFyIGMyX2hpID0gcm90cjY0X2hpKHhsLCB4aCwgNyk7ICAvLyAzOVxuXG4gIHZhciByID0gYzBfaGkgXiBjMV9oaSBeIGMyX2hpO1xuICBpZiAociA8IDApXG4gICAgciArPSAweDEwMDAwMDAwMDtcbiAgcmV0dXJuIHI7XG59XG5cbmZ1bmN0aW9uIHMwXzUxMl9sbyh4aCwgeGwpIHtcbiAgdmFyIGMwX2xvID0gcm90cjY0X2xvKHhoLCB4bCwgMjgpO1xuICB2YXIgYzFfbG8gPSByb3RyNjRfbG8oeGwsIHhoLCAyKTsgIC8vIDM0XG4gIHZhciBjMl9sbyA9IHJvdHI2NF9sbyh4bCwgeGgsIDcpOyAgLy8gMzlcblxuICB2YXIgciA9IGMwX2xvIF4gYzFfbG8gXiBjMl9sbztcbiAgaWYgKHIgPCAwKVxuICAgIHIgKz0gMHgxMDAwMDAwMDA7XG4gIHJldHVybiByO1xufVxuXG5mdW5jdGlvbiBzMV81MTJfaGkoeGgsIHhsKSB7XG4gIHZhciBjMF9oaSA9IHJvdHI2NF9oaSh4aCwgeGwsIDE0KTtcbiAgdmFyIGMxX2hpID0gcm90cjY0X2hpKHhoLCB4bCwgMTgpO1xuICB2YXIgYzJfaGkgPSByb3RyNjRfaGkoeGwsIHhoLCA5KTsgIC8vIDQxXG5cbiAgdmFyIHIgPSBjMF9oaSBeIGMxX2hpIF4gYzJfaGk7XG4gIGlmIChyIDwgMClcbiAgICByICs9IDB4MTAwMDAwMDAwO1xuICByZXR1cm4gcjtcbn1cblxuZnVuY3Rpb24gczFfNTEyX2xvKHhoLCB4bCkge1xuICB2YXIgYzBfbG8gPSByb3RyNjRfbG8oeGgsIHhsLCAxNCk7XG4gIHZhciBjMV9sbyA9IHJvdHI2NF9sbyh4aCwgeGwsIDE4KTtcbiAgdmFyIGMyX2xvID0gcm90cjY0X2xvKHhsLCB4aCwgOSk7ICAvLyA0MVxuXG4gIHZhciByID0gYzBfbG8gXiBjMV9sbyBeIGMyX2xvO1xuICBpZiAociA8IDApXG4gICAgciArPSAweDEwMDAwMDAwMDtcbiAgcmV0dXJuIHI7XG59XG5cbmZ1bmN0aW9uIGcwXzUxMl9oaSh4aCwgeGwpIHtcbiAgdmFyIGMwX2hpID0gcm90cjY0X2hpKHhoLCB4bCwgMSk7XG4gIHZhciBjMV9oaSA9IHJvdHI2NF9oaSh4aCwgeGwsIDgpO1xuICB2YXIgYzJfaGkgPSBzaHI2NF9oaSh4aCwgeGwsIDcpO1xuXG4gIHZhciByID0gYzBfaGkgXiBjMV9oaSBeIGMyX2hpO1xuICBpZiAociA8IDApXG4gICAgciArPSAweDEwMDAwMDAwMDtcbiAgcmV0dXJuIHI7XG59XG5cbmZ1bmN0aW9uIGcwXzUxMl9sbyh4aCwgeGwpIHtcbiAgdmFyIGMwX2xvID0gcm90cjY0X2xvKHhoLCB4bCwgMSk7XG4gIHZhciBjMV9sbyA9IHJvdHI2NF9sbyh4aCwgeGwsIDgpO1xuICB2YXIgYzJfbG8gPSBzaHI2NF9sbyh4aCwgeGwsIDcpO1xuXG4gIHZhciByID0gYzBfbG8gXiBjMV9sbyBeIGMyX2xvO1xuICBpZiAociA8IDApXG4gICAgciArPSAweDEwMDAwMDAwMDtcbiAgcmV0dXJuIHI7XG59XG5cbmZ1bmN0aW9uIGcxXzUxMl9oaSh4aCwgeGwpIHtcbiAgdmFyIGMwX2hpID0gcm90cjY0X2hpKHhoLCB4bCwgMTkpO1xuICB2YXIgYzFfaGkgPSByb3RyNjRfaGkoeGwsIHhoLCAyOSk7ICAvLyA2MVxuICB2YXIgYzJfaGkgPSBzaHI2NF9oaSh4aCwgeGwsIDYpO1xuXG4gIHZhciByID0gYzBfaGkgXiBjMV9oaSBeIGMyX2hpO1xuICBpZiAociA8IDApXG4gICAgciArPSAweDEwMDAwMDAwMDtcbiAgcmV0dXJuIHI7XG59XG5cbmZ1bmN0aW9uIGcxXzUxMl9sbyh4aCwgeGwpIHtcbiAgdmFyIGMwX2xvID0gcm90cjY0X2xvKHhoLCB4bCwgMTkpO1xuICB2YXIgYzFfbG8gPSByb3RyNjRfbG8oeGwsIHhoLCAyOSk7ICAvLyA2MVxuICB2YXIgYzJfbG8gPSBzaHI2NF9sbyh4aCwgeGwsIDYpO1xuXG4gIHZhciByID0gYzBfbG8gXiBjMV9sbyBeIGMyX2xvO1xuICBpZiAociA8IDApXG4gICAgciArPSAweDEwMDAwMDAwMDtcbiAgcmV0dXJuIHI7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG52YXIgcm90cjMyID0gdXRpbHMucm90cjMyO1xuXG5mdW5jdGlvbiBmdF8xKHMsIHgsIHksIHopIHtcbiAgaWYgKHMgPT09IDApXG4gICAgcmV0dXJuIGNoMzIoeCwgeSwgeik7XG4gIGlmIChzID09PSAxIHx8IHMgPT09IDMpXG4gICAgcmV0dXJuIHAzMih4LCB5LCB6KTtcbiAgaWYgKHMgPT09IDIpXG4gICAgcmV0dXJuIG1hajMyKHgsIHksIHopO1xufVxuZXhwb3J0cy5mdF8xID0gZnRfMTtcblxuZnVuY3Rpb24gY2gzMih4LCB5LCB6KSB7XG4gIHJldHVybiAoeCAmIHkpIF4gKCh+eCkgJiB6KTtcbn1cbmV4cG9ydHMuY2gzMiA9IGNoMzI7XG5cbmZ1bmN0aW9uIG1hajMyKHgsIHksIHopIHtcbiAgcmV0dXJuICh4ICYgeSkgXiAoeCAmIHopIF4gKHkgJiB6KTtcbn1cbmV4cG9ydHMubWFqMzIgPSBtYWozMjtcblxuZnVuY3Rpb24gcDMyKHgsIHksIHopIHtcbiAgcmV0dXJuIHggXiB5IF4gejtcbn1cbmV4cG9ydHMucDMyID0gcDMyO1xuXG5mdW5jdGlvbiBzMF8yNTYoeCkge1xuICByZXR1cm4gcm90cjMyKHgsIDIpIF4gcm90cjMyKHgsIDEzKSBeIHJvdHIzMih4LCAyMik7XG59XG5leHBvcnRzLnMwXzI1NiA9IHMwXzI1NjtcblxuZnVuY3Rpb24gczFfMjU2KHgpIHtcbiAgcmV0dXJuIHJvdHIzMih4LCA2KSBeIHJvdHIzMih4LCAxMSkgXiByb3RyMzIoeCwgMjUpO1xufVxuZXhwb3J0cy5zMV8yNTYgPSBzMV8yNTY7XG5cbmZ1bmN0aW9uIGcwXzI1Nih4KSB7XG4gIHJldHVybiByb3RyMzIoeCwgNykgXiByb3RyMzIoeCwgMTgpIF4gKHggPj4+IDMpO1xufVxuZXhwb3J0cy5nMF8yNTYgPSBnMF8yNTY7XG5cbmZ1bmN0aW9uIGcxXzI1Nih4KSB7XG4gIHJldHVybiByb3RyMzIoeCwgMTcpIF4gcm90cjMyKHgsIDE5KSBeICh4ID4+PiAxMCk7XG59XG5leHBvcnRzLmcxXzI1NiA9IGcxXzI1NjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFzc2VydCA9IHJlcXVpcmUoJ21pbmltYWxpc3RpYy1hc3NlcnQnKTtcbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG5cbmV4cG9ydHMuaW5oZXJpdHMgPSBpbmhlcml0cztcblxuZnVuY3Rpb24gaXNTdXJyb2dhdGVQYWlyKG1zZywgaSkge1xuICBpZiAoKG1zZy5jaGFyQ29kZUF0KGkpICYgMHhGQzAwKSAhPT0gMHhEODAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChpIDwgMCB8fCBpICsgMSA+PSBtc2cubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAobXNnLmNoYXJDb2RlQXQoaSArIDEpICYgMHhGQzAwKSA9PT0gMHhEQzAwO1xufVxuXG5mdW5jdGlvbiB0b0FycmF5KG1zZywgZW5jKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KG1zZykpXG4gICAgcmV0dXJuIG1zZy5zbGljZSgpO1xuICBpZiAoIW1zZylcbiAgICByZXR1cm4gW107XG4gIHZhciByZXMgPSBbXTtcbiAgaWYgKHR5cGVvZiBtc2cgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKCFlbmMpIHtcbiAgICAgIC8vIEluc3BpcmVkIGJ5IHN0cmluZ1RvVXRmOEJ5dGVBcnJheSgpIGluIGNsb3N1cmUtbGlicmFyeSBieSBHb29nbGVcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGUvY2xvc3VyZS1saWJyYXJ5L2Jsb2IvODU5OGQ4NzI0MmFmNTlhYWMyMzMyNzA3NDJjODk4NGUyYjJiZGJlMC9jbG9zdXJlL2dvb2cvY3J5cHQvY3J5cHQuanMjTDExNy1MMTQzXG4gICAgICAvLyBBcGFjaGUgTGljZW5zZSAyLjBcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGUvY2xvc3VyZS1saWJyYXJ5L2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAgICAgIHZhciBwID0gMDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbXNnLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjID0gbXNnLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIGlmIChjIDwgMTI4KSB7XG4gICAgICAgICAgcmVzW3ArK10gPSBjO1xuICAgICAgICB9IGVsc2UgaWYgKGMgPCAyMDQ4KSB7XG4gICAgICAgICAgcmVzW3ArK10gPSAoYyA+PiA2KSB8IDE5MjtcbiAgICAgICAgICByZXNbcCsrXSA9IChjICYgNjMpIHwgMTI4O1xuICAgICAgICB9IGVsc2UgaWYgKGlzU3Vycm9nYXRlUGFpcihtc2csIGkpKSB7XG4gICAgICAgICAgYyA9IDB4MTAwMDAgKyAoKGMgJiAweDAzRkYpIDw8IDEwKSArIChtc2cuY2hhckNvZGVBdCgrK2kpICYgMHgwM0ZGKTtcbiAgICAgICAgICByZXNbcCsrXSA9IChjID4+IDE4KSB8IDI0MDtcbiAgICAgICAgICByZXNbcCsrXSA9ICgoYyA+PiAxMikgJiA2MykgfCAxMjg7XG4gICAgICAgICAgcmVzW3ArK10gPSAoKGMgPj4gNikgJiA2MykgfCAxMjg7XG4gICAgICAgICAgcmVzW3ArK10gPSAoYyAmIDYzKSB8IDEyODtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNbcCsrXSA9IChjID4+IDEyKSB8IDIyNDtcbiAgICAgICAgICByZXNbcCsrXSA9ICgoYyA+PiA2KSAmIDYzKSB8IDEyODtcbiAgICAgICAgICByZXNbcCsrXSA9IChjICYgNjMpIHwgMTI4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChlbmMgPT09ICdoZXgnKSB7XG4gICAgICBtc2cgPSBtc2cucmVwbGFjZSgvW15hLXowLTldKy9pZywgJycpO1xuICAgICAgaWYgKG1zZy5sZW5ndGggJSAyICE9PSAwKVxuICAgICAgICBtc2cgPSAnMCcgKyBtc2c7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbXNnLmxlbmd0aDsgaSArPSAyKVxuICAgICAgICByZXMucHVzaChwYXJzZUludChtc2dbaV0gKyBtc2dbaSArIDFdLCAxNikpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbXNnLmxlbmd0aDsgaSsrKVxuICAgICAgcmVzW2ldID0gbXNnW2ldIHwgMDtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuZXhwb3J0cy50b0FycmF5ID0gdG9BcnJheTtcblxuZnVuY3Rpb24gdG9IZXgobXNnKSB7XG4gIHZhciByZXMgPSAnJztcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBtc2cubGVuZ3RoOyBpKyspXG4gICAgcmVzICs9IHplcm8yKG1zZ1tpXS50b1N0cmluZygxNikpO1xuICByZXR1cm4gcmVzO1xufVxuZXhwb3J0cy50b0hleCA9IHRvSGV4O1xuXG5mdW5jdGlvbiBodG9ubCh3KSB7XG4gIHZhciByZXMgPSAodyA+Pj4gMjQpIHxcbiAgICAgICAgICAgICgodyA+Pj4gOCkgJiAweGZmMDApIHxcbiAgICAgICAgICAgICgodyA8PCA4KSAmIDB4ZmYwMDAwKSB8XG4gICAgICAgICAgICAoKHcgJiAweGZmKSA8PCAyNCk7XG4gIHJldHVybiByZXMgPj4+IDA7XG59XG5leHBvcnRzLmh0b25sID0gaHRvbmw7XG5cbmZ1bmN0aW9uIHRvSGV4MzIobXNnLCBlbmRpYW4pIHtcbiAgdmFyIHJlcyA9ICcnO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG1zZy5sZW5ndGg7IGkrKykge1xuICAgIHZhciB3ID0gbXNnW2ldO1xuICAgIGlmIChlbmRpYW4gPT09ICdsaXR0bGUnKVxuICAgICAgdyA9IGh0b25sKHcpO1xuICAgIHJlcyArPSB6ZXJvOCh3LnRvU3RyaW5nKDE2KSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbmV4cG9ydHMudG9IZXgzMiA9IHRvSGV4MzI7XG5cbmZ1bmN0aW9uIHplcm8yKHdvcmQpIHtcbiAgaWYgKHdvcmQubGVuZ3RoID09PSAxKVxuICAgIHJldHVybiAnMCcgKyB3b3JkO1xuICBlbHNlXG4gICAgcmV0dXJuIHdvcmQ7XG59XG5leHBvcnRzLnplcm8yID0gemVybzI7XG5cbmZ1bmN0aW9uIHplcm84KHdvcmQpIHtcbiAgaWYgKHdvcmQubGVuZ3RoID09PSA3KVxuICAgIHJldHVybiAnMCcgKyB3b3JkO1xuICBlbHNlIGlmICh3b3JkLmxlbmd0aCA9PT0gNilcbiAgICByZXR1cm4gJzAwJyArIHdvcmQ7XG4gIGVsc2UgaWYgKHdvcmQubGVuZ3RoID09PSA1KVxuICAgIHJldHVybiAnMDAwJyArIHdvcmQ7XG4gIGVsc2UgaWYgKHdvcmQubGVuZ3RoID09PSA0KVxuICAgIHJldHVybiAnMDAwMCcgKyB3b3JkO1xuICBlbHNlIGlmICh3b3JkLmxlbmd0aCA9PT0gMylcbiAgICByZXR1cm4gJzAwMDAwJyArIHdvcmQ7XG4gIGVsc2UgaWYgKHdvcmQubGVuZ3RoID09PSAyKVxuICAgIHJldHVybiAnMDAwMDAwJyArIHdvcmQ7XG4gIGVsc2UgaWYgKHdvcmQubGVuZ3RoID09PSAxKVxuICAgIHJldHVybiAnMDAwMDAwMCcgKyB3b3JkO1xuICBlbHNlXG4gICAgcmV0dXJuIHdvcmQ7XG59XG5leHBvcnRzLnplcm84ID0gemVybzg7XG5cbmZ1bmN0aW9uIGpvaW4zMihtc2csIHN0YXJ0LCBlbmQsIGVuZGlhbikge1xuICB2YXIgbGVuID0gZW5kIC0gc3RhcnQ7XG4gIGFzc2VydChsZW4gJSA0ID09PSAwKTtcbiAgdmFyIHJlcyA9IG5ldyBBcnJheShsZW4gLyA0KTtcbiAgZm9yICh2YXIgaSA9IDAsIGsgPSBzdGFydDsgaSA8IHJlcy5sZW5ndGg7IGkrKywgayArPSA0KSB7XG4gICAgdmFyIHc7XG4gICAgaWYgKGVuZGlhbiA9PT0gJ2JpZycpXG4gICAgICB3ID0gKG1zZ1trXSA8PCAyNCkgfCAobXNnW2sgKyAxXSA8PCAxNikgfCAobXNnW2sgKyAyXSA8PCA4KSB8IG1zZ1trICsgM107XG4gICAgZWxzZVxuICAgICAgdyA9IChtc2dbayArIDNdIDw8IDI0KSB8IChtc2dbayArIDJdIDw8IDE2KSB8IChtc2dbayArIDFdIDw8IDgpIHwgbXNnW2tdO1xuICAgIHJlc1tpXSA9IHcgPj4+IDA7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbmV4cG9ydHMuam9pbjMyID0gam9pbjMyO1xuXG5mdW5jdGlvbiBzcGxpdDMyKG1zZywgZW5kaWFuKSB7XG4gIHZhciByZXMgPSBuZXcgQXJyYXkobXNnLmxlbmd0aCAqIDQpO1xuICBmb3IgKHZhciBpID0gMCwgayA9IDA7IGkgPCBtc2cubGVuZ3RoOyBpKyssIGsgKz0gNCkge1xuICAgIHZhciBtID0gbXNnW2ldO1xuICAgIGlmIChlbmRpYW4gPT09ICdiaWcnKSB7XG4gICAgICByZXNba10gPSBtID4+PiAyNDtcbiAgICAgIHJlc1trICsgMV0gPSAobSA+Pj4gMTYpICYgMHhmZjtcbiAgICAgIHJlc1trICsgMl0gPSAobSA+Pj4gOCkgJiAweGZmO1xuICAgICAgcmVzW2sgKyAzXSA9IG0gJiAweGZmO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXNbayArIDNdID0gbSA+Pj4gMjQ7XG4gICAgICByZXNbayArIDJdID0gKG0gPj4+IDE2KSAmIDB4ZmY7XG4gICAgICByZXNbayArIDFdID0gKG0gPj4+IDgpICYgMHhmZjtcbiAgICAgIHJlc1trXSA9IG0gJiAweGZmO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuZXhwb3J0cy5zcGxpdDMyID0gc3BsaXQzMjtcblxuZnVuY3Rpb24gcm90cjMyKHcsIGIpIHtcbiAgcmV0dXJuICh3ID4+PiBiKSB8ICh3IDw8ICgzMiAtIGIpKTtcbn1cbmV4cG9ydHMucm90cjMyID0gcm90cjMyO1xuXG5mdW5jdGlvbiByb3RsMzIodywgYikge1xuICByZXR1cm4gKHcgPDwgYikgfCAodyA+Pj4gKDMyIC0gYikpO1xufVxuZXhwb3J0cy5yb3RsMzIgPSByb3RsMzI7XG5cbmZ1bmN0aW9uIHN1bTMyKGEsIGIpIHtcbiAgcmV0dXJuIChhICsgYikgPj4+IDA7XG59XG5leHBvcnRzLnN1bTMyID0gc3VtMzI7XG5cbmZ1bmN0aW9uIHN1bTMyXzMoYSwgYiwgYykge1xuICByZXR1cm4gKGEgKyBiICsgYykgPj4+IDA7XG59XG5leHBvcnRzLnN1bTMyXzMgPSBzdW0zMl8zO1xuXG5mdW5jdGlvbiBzdW0zMl80KGEsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIChhICsgYiArIGMgKyBkKSA+Pj4gMDtcbn1cbmV4cG9ydHMuc3VtMzJfNCA9IHN1bTMyXzQ7XG5cbmZ1bmN0aW9uIHN1bTMyXzUoYSwgYiwgYywgZCwgZSkge1xuICByZXR1cm4gKGEgKyBiICsgYyArIGQgKyBlKSA+Pj4gMDtcbn1cbmV4cG9ydHMuc3VtMzJfNSA9IHN1bTMyXzU7XG5cbmZ1bmN0aW9uIHN1bTY0KGJ1ZiwgcG9zLCBhaCwgYWwpIHtcbiAgdmFyIGJoID0gYnVmW3Bvc107XG4gIHZhciBibCA9IGJ1Zltwb3MgKyAxXTtcblxuICB2YXIgbG8gPSAoYWwgKyBibCkgPj4+IDA7XG4gIHZhciBoaSA9IChsbyA8IGFsID8gMSA6IDApICsgYWggKyBiaDtcbiAgYnVmW3Bvc10gPSBoaSA+Pj4gMDtcbiAgYnVmW3BvcyArIDFdID0gbG87XG59XG5leHBvcnRzLnN1bTY0ID0gc3VtNjQ7XG5cbmZ1bmN0aW9uIHN1bTY0X2hpKGFoLCBhbCwgYmgsIGJsKSB7XG4gIHZhciBsbyA9IChhbCArIGJsKSA+Pj4gMDtcbiAgdmFyIGhpID0gKGxvIDwgYWwgPyAxIDogMCkgKyBhaCArIGJoO1xuICByZXR1cm4gaGkgPj4+IDA7XG59XG5leHBvcnRzLnN1bTY0X2hpID0gc3VtNjRfaGk7XG5cbmZ1bmN0aW9uIHN1bTY0X2xvKGFoLCBhbCwgYmgsIGJsKSB7XG4gIHZhciBsbyA9IGFsICsgYmw7XG4gIHJldHVybiBsbyA+Pj4gMDtcbn1cbmV4cG9ydHMuc3VtNjRfbG8gPSBzdW02NF9sbztcblxuZnVuY3Rpb24gc3VtNjRfNF9oaShhaCwgYWwsIGJoLCBibCwgY2gsIGNsLCBkaCwgZGwpIHtcbiAgdmFyIGNhcnJ5ID0gMDtcbiAgdmFyIGxvID0gYWw7XG4gIGxvID0gKGxvICsgYmwpID4+PiAwO1xuICBjYXJyeSArPSBsbyA8IGFsID8gMSA6IDA7XG4gIGxvID0gKGxvICsgY2wpID4+PiAwO1xuICBjYXJyeSArPSBsbyA8IGNsID8gMSA6IDA7XG4gIGxvID0gKGxvICsgZGwpID4+PiAwO1xuICBjYXJyeSArPSBsbyA8IGRsID8gMSA6IDA7XG5cbiAgdmFyIGhpID0gYWggKyBiaCArIGNoICsgZGggKyBjYXJyeTtcbiAgcmV0dXJuIGhpID4+PiAwO1xufVxuZXhwb3J0cy5zdW02NF80X2hpID0gc3VtNjRfNF9oaTtcblxuZnVuY3Rpb24gc3VtNjRfNF9sbyhhaCwgYWwsIGJoLCBibCwgY2gsIGNsLCBkaCwgZGwpIHtcbiAgdmFyIGxvID0gYWwgKyBibCArIGNsICsgZGw7XG4gIHJldHVybiBsbyA+Pj4gMDtcbn1cbmV4cG9ydHMuc3VtNjRfNF9sbyA9IHN1bTY0XzRfbG87XG5cbmZ1bmN0aW9uIHN1bTY0XzVfaGkoYWgsIGFsLCBiaCwgYmwsIGNoLCBjbCwgZGgsIGRsLCBlaCwgZWwpIHtcbiAgdmFyIGNhcnJ5ID0gMDtcbiAgdmFyIGxvID0gYWw7XG4gIGxvID0gKGxvICsgYmwpID4+PiAwO1xuICBjYXJyeSArPSBsbyA8IGFsID8gMSA6IDA7XG4gIGxvID0gKGxvICsgY2wpID4+PiAwO1xuICBjYXJyeSArPSBsbyA8IGNsID8gMSA6IDA7XG4gIGxvID0gKGxvICsgZGwpID4+PiAwO1xuICBjYXJyeSArPSBsbyA8IGRsID8gMSA6IDA7XG4gIGxvID0gKGxvICsgZWwpID4+PiAwO1xuICBjYXJyeSArPSBsbyA8IGVsID8gMSA6IDA7XG5cbiAgdmFyIGhpID0gYWggKyBiaCArIGNoICsgZGggKyBlaCArIGNhcnJ5O1xuICByZXR1cm4gaGkgPj4+IDA7XG59XG5leHBvcnRzLnN1bTY0XzVfaGkgPSBzdW02NF81X2hpO1xuXG5mdW5jdGlvbiBzdW02NF81X2xvKGFoLCBhbCwgYmgsIGJsLCBjaCwgY2wsIGRoLCBkbCwgZWgsIGVsKSB7XG4gIHZhciBsbyA9IGFsICsgYmwgKyBjbCArIGRsICsgZWw7XG5cbiAgcmV0dXJuIGxvID4+PiAwO1xufVxuZXhwb3J0cy5zdW02NF81X2xvID0gc3VtNjRfNV9sbztcblxuZnVuY3Rpb24gcm90cjY0X2hpKGFoLCBhbCwgbnVtKSB7XG4gIHZhciByID0gKGFsIDw8ICgzMiAtIG51bSkpIHwgKGFoID4+PiBudW0pO1xuICByZXR1cm4gciA+Pj4gMDtcbn1cbmV4cG9ydHMucm90cjY0X2hpID0gcm90cjY0X2hpO1xuXG5mdW5jdGlvbiByb3RyNjRfbG8oYWgsIGFsLCBudW0pIHtcbiAgdmFyIHIgPSAoYWggPDwgKDMyIC0gbnVtKSkgfCAoYWwgPj4+IG51bSk7XG4gIHJldHVybiByID4+PiAwO1xufVxuZXhwb3J0cy5yb3RyNjRfbG8gPSByb3RyNjRfbG87XG5cbmZ1bmN0aW9uIHNocjY0X2hpKGFoLCBhbCwgbnVtKSB7XG4gIHJldHVybiBhaCA+Pj4gbnVtO1xufVxuZXhwb3J0cy5zaHI2NF9oaSA9IHNocjY0X2hpO1xuXG5mdW5jdGlvbiBzaHI2NF9sbyhhaCwgYWwsIG51bSkge1xuICB2YXIgciA9IChhaCA8PCAoMzIgLSBudW0pKSB8IChhbCA+Pj4gbnVtKTtcbiAgcmV0dXJuIHIgPj4+IDA7XG59XG5leHBvcnRzLnNocjY0X2xvID0gc2hyNjRfbG87XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXNoID0gcmVxdWlyZSgnaGFzaC5qcycpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnbWluaW1hbGlzdGljLWNyeXB0by11dGlscycpO1xudmFyIGFzc2VydCA9IHJlcXVpcmUoJ21pbmltYWxpc3RpYy1hc3NlcnQnKTtcblxuZnVuY3Rpb24gSG1hY0RSQkcob3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgSG1hY0RSQkcpKVxuICAgIHJldHVybiBuZXcgSG1hY0RSQkcob3B0aW9ucyk7XG4gIHRoaXMuaGFzaCA9IG9wdGlvbnMuaGFzaDtcbiAgdGhpcy5wcmVkUmVzaXN0ID0gISFvcHRpb25zLnByZWRSZXNpc3Q7XG5cbiAgdGhpcy5vdXRMZW4gPSB0aGlzLmhhc2gub3V0U2l6ZTtcbiAgdGhpcy5taW5FbnRyb3B5ID0gb3B0aW9ucy5taW5FbnRyb3B5IHx8IHRoaXMuaGFzaC5obWFjU3RyZW5ndGg7XG5cbiAgdGhpcy5fcmVzZWVkID0gbnVsbDtcbiAgdGhpcy5yZXNlZWRJbnRlcnZhbCA9IG51bGw7XG4gIHRoaXMuSyA9IG51bGw7XG4gIHRoaXMuViA9IG51bGw7XG5cbiAgdmFyIGVudHJvcHkgPSB1dGlscy50b0FycmF5KG9wdGlvbnMuZW50cm9weSwgb3B0aW9ucy5lbnRyb3B5RW5jIHx8ICdoZXgnKTtcbiAgdmFyIG5vbmNlID0gdXRpbHMudG9BcnJheShvcHRpb25zLm5vbmNlLCBvcHRpb25zLm5vbmNlRW5jIHx8ICdoZXgnKTtcbiAgdmFyIHBlcnMgPSB1dGlscy50b0FycmF5KG9wdGlvbnMucGVycywgb3B0aW9ucy5wZXJzRW5jIHx8ICdoZXgnKTtcbiAgYXNzZXJ0KGVudHJvcHkubGVuZ3RoID49ICh0aGlzLm1pbkVudHJvcHkgLyA4KSxcbiAgICAgICAgICdOb3QgZW5vdWdoIGVudHJvcHkuIE1pbmltdW0gaXM6ICcgKyB0aGlzLm1pbkVudHJvcHkgKyAnIGJpdHMnKTtcbiAgdGhpcy5faW5pdChlbnRyb3B5LCBub25jZSwgcGVycyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEhtYWNEUkJHO1xuXG5IbWFjRFJCRy5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiBpbml0KGVudHJvcHksIG5vbmNlLCBwZXJzKSB7XG4gIHZhciBzZWVkID0gZW50cm9weS5jb25jYXQobm9uY2UpLmNvbmNhdChwZXJzKTtcblxuICB0aGlzLksgPSBuZXcgQXJyYXkodGhpcy5vdXRMZW4gLyA4KTtcbiAgdGhpcy5WID0gbmV3IEFycmF5KHRoaXMub3V0TGVuIC8gOCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5WLmxlbmd0aDsgaSsrKSB7XG4gICAgdGhpcy5LW2ldID0gMHgwMDtcbiAgICB0aGlzLlZbaV0gPSAweDAxO1xuICB9XG5cbiAgdGhpcy5fdXBkYXRlKHNlZWQpO1xuICB0aGlzLl9yZXNlZWQgPSAxO1xuICB0aGlzLnJlc2VlZEludGVydmFsID0gMHgxMDAwMDAwMDAwMDAwOyAgLy8gMl40OFxufTtcblxuSG1hY0RSQkcucHJvdG90eXBlLl9obWFjID0gZnVuY3Rpb24gaG1hYygpIHtcbiAgcmV0dXJuIG5ldyBoYXNoLmhtYWModGhpcy5oYXNoLCB0aGlzLkspO1xufTtcblxuSG1hY0RSQkcucHJvdG90eXBlLl91cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUoc2VlZCkge1xuICB2YXIga21hYyA9IHRoaXMuX2htYWMoKVxuICAgICAgICAgICAgICAgICAudXBkYXRlKHRoaXMuVilcbiAgICAgICAgICAgICAgICAgLnVwZGF0ZShbIDB4MDAgXSk7XG4gIGlmIChzZWVkKVxuICAgIGttYWMgPSBrbWFjLnVwZGF0ZShzZWVkKTtcbiAgdGhpcy5LID0ga21hYy5kaWdlc3QoKTtcbiAgdGhpcy5WID0gdGhpcy5faG1hYygpLnVwZGF0ZSh0aGlzLlYpLmRpZ2VzdCgpO1xuICBpZiAoIXNlZWQpXG4gICAgcmV0dXJuO1xuXG4gIHRoaXMuSyA9IHRoaXMuX2htYWMoKVxuICAgICAgICAgICAgICAgLnVwZGF0ZSh0aGlzLlYpXG4gICAgICAgICAgICAgICAudXBkYXRlKFsgMHgwMSBdKVxuICAgICAgICAgICAgICAgLnVwZGF0ZShzZWVkKVxuICAgICAgICAgICAgICAgLmRpZ2VzdCgpO1xuICB0aGlzLlYgPSB0aGlzLl9obWFjKCkudXBkYXRlKHRoaXMuVikuZGlnZXN0KCk7XG59O1xuXG5IbWFjRFJCRy5wcm90b3R5cGUucmVzZWVkID0gZnVuY3Rpb24gcmVzZWVkKGVudHJvcHksIGVudHJvcHlFbmMsIGFkZCwgYWRkRW5jKSB7XG4gIC8vIE9wdGlvbmFsIGVudHJvcHkgZW5jXG4gIGlmICh0eXBlb2YgZW50cm9weUVuYyAhPT0gJ3N0cmluZycpIHtcbiAgICBhZGRFbmMgPSBhZGQ7XG4gICAgYWRkID0gZW50cm9weUVuYztcbiAgICBlbnRyb3B5RW5jID0gbnVsbDtcbiAgfVxuXG4gIGVudHJvcHkgPSB1dGlscy50b0FycmF5KGVudHJvcHksIGVudHJvcHlFbmMpO1xuICBhZGQgPSB1dGlscy50b0FycmF5KGFkZCwgYWRkRW5jKTtcblxuICBhc3NlcnQoZW50cm9weS5sZW5ndGggPj0gKHRoaXMubWluRW50cm9weSAvIDgpLFxuICAgICAgICAgJ05vdCBlbm91Z2ggZW50cm9weS4gTWluaW11bSBpczogJyArIHRoaXMubWluRW50cm9weSArICcgYml0cycpO1xuXG4gIHRoaXMuX3VwZGF0ZShlbnRyb3B5LmNvbmNhdChhZGQgfHwgW10pKTtcbiAgdGhpcy5fcmVzZWVkID0gMTtcbn07XG5cbkhtYWNEUkJHLnByb3RvdHlwZS5nZW5lcmF0ZSA9IGZ1bmN0aW9uIGdlbmVyYXRlKGxlbiwgZW5jLCBhZGQsIGFkZEVuYykge1xuICBpZiAodGhpcy5fcmVzZWVkID4gdGhpcy5yZXNlZWRJbnRlcnZhbClcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Jlc2VlZCBpcyByZXF1aXJlZCcpO1xuXG4gIC8vIE9wdGlvbmFsIGVuY29kaW5nXG4gIGlmICh0eXBlb2YgZW5jICE9PSAnc3RyaW5nJykge1xuICAgIGFkZEVuYyA9IGFkZDtcbiAgICBhZGQgPSBlbmM7XG4gICAgZW5jID0gbnVsbDtcbiAgfVxuXG4gIC8vIE9wdGlvbmFsIGFkZGl0aW9uYWwgZGF0YVxuICBpZiAoYWRkKSB7XG4gICAgYWRkID0gdXRpbHMudG9BcnJheShhZGQsIGFkZEVuYyB8fCAnaGV4Jyk7XG4gICAgdGhpcy5fdXBkYXRlKGFkZCk7XG4gIH1cblxuICB2YXIgdGVtcCA9IFtdO1xuICB3aGlsZSAodGVtcC5sZW5ndGggPCBsZW4pIHtcbiAgICB0aGlzLlYgPSB0aGlzLl9obWFjKCkudXBkYXRlKHRoaXMuVikuZGlnZXN0KCk7XG4gICAgdGVtcCA9IHRlbXAuY29uY2F0KHRoaXMuVik7XG4gIH1cblxuICB2YXIgcmVzID0gdGVtcC5zbGljZSgwLCBsZW4pO1xuICB0aGlzLl91cGRhdGUoYWRkKTtcbiAgdGhpcy5fcmVzZWVkKys7XG4gIHJldHVybiB1dGlscy5lbmNvZGUocmVzLCBlbmMpO1xufTtcbiIsImV4cG9ydHMucmVhZCA9IGZ1bmN0aW9uIChidWZmZXIsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtXG4gIHZhciBlTGVuID0gKG5CeXRlcyAqIDgpIC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBuQml0cyA9IC03XG4gIHZhciBpID0gaXNMRSA/IChuQnl0ZXMgLSAxKSA6IDBcbiAgdmFyIGQgPSBpc0xFID8gLTEgOiAxXG4gIHZhciBzID0gYnVmZmVyW29mZnNldCArIGldXG5cbiAgaSArPSBkXG5cbiAgZSA9IHMgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgcyA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gZUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBlID0gKGUgKiAyNTYpICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgbSA9IGUgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgZSA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gbUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBtID0gKG0gKiAyNTYpICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgaWYgKGUgPT09IDApIHtcbiAgICBlID0gMSAtIGVCaWFzXG4gIH0gZWxzZSBpZiAoZSA9PT0gZU1heCkge1xuICAgIHJldHVybiBtID8gTmFOIDogKChzID8gLTEgOiAxKSAqIEluZmluaXR5KVxuICB9IGVsc2Uge1xuICAgIG0gPSBtICsgTWF0aC5wb3coMiwgbUxlbilcbiAgICBlID0gZSAtIGVCaWFzXG4gIH1cbiAgcmV0dXJuIChzID8gLTEgOiAxKSAqIG0gKiBNYXRoLnBvdygyLCBlIC0gbUxlbilcbn1cblxuZXhwb3J0cy53cml0ZSA9IGZ1bmN0aW9uIChidWZmZXIsIHZhbHVlLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSwgY1xuICB2YXIgZUxlbiA9IChuQnl0ZXMgKiA4KSAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgcnQgPSAobUxlbiA9PT0gMjMgPyBNYXRoLnBvdygyLCAtMjQpIC0gTWF0aC5wb3coMiwgLTc3KSA6IDApXG4gIHZhciBpID0gaXNMRSA/IDAgOiAobkJ5dGVzIC0gMSlcbiAgdmFyIGQgPSBpc0xFID8gMSA6IC0xXG4gIHZhciBzID0gdmFsdWUgPCAwIHx8ICh2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwKSA/IDEgOiAwXG5cbiAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSlcblxuICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBJbmZpbml0eSkge1xuICAgIG0gPSBpc05hTih2YWx1ZSkgPyAxIDogMFxuICAgIGUgPSBlTWF4XG4gIH0gZWxzZSB7XG4gICAgZSA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjIpXG4gICAgaWYgKHZhbHVlICogKGMgPSBNYXRoLnBvdygyLCAtZSkpIDwgMSkge1xuICAgICAgZS0tXG4gICAgICBjICo9IDJcbiAgICB9XG4gICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICB2YWx1ZSArPSBydCAvIGNcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgKz0gcnQgKiBNYXRoLnBvdygyLCAxIC0gZUJpYXMpXG4gICAgfVxuICAgIGlmICh2YWx1ZSAqIGMgPj0gMikge1xuICAgICAgZSsrXG4gICAgICBjIC89IDJcbiAgICB9XG5cbiAgICBpZiAoZSArIGVCaWFzID49IGVNYXgpIHtcbiAgICAgIG0gPSAwXG4gICAgICBlID0gZU1heFxuICAgIH0gZWxzZSBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIG0gPSAoKHZhbHVlICogYykgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gZSArIGVCaWFzXG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSB2YWx1ZSAqIE1hdGgucG93KDIsIGVCaWFzIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IDBcbiAgICB9XG4gIH1cblxuICBmb3IgKDsgbUxlbiA+PSA4OyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBtICYgMHhmZiwgaSArPSBkLCBtIC89IDI1NiwgbUxlbiAtPSA4KSB7fVxuXG4gIGUgPSAoZSA8PCBtTGVuKSB8IG1cbiAgZUxlbiArPSBtTGVuXG4gIGZvciAoOyBlTGVuID4gMDsgYnVmZmVyW29mZnNldCArIGldID0gZSAmIDB4ZmYsIGkgKz0gZCwgZSAvPSAyNTYsIGVMZW4gLT0gOCkge31cblxuICBidWZmZXJbb2Zmc2V0ICsgaSAtIGRdIHw9IHMgKiAxMjhcbn1cbiIsImlmICh0eXBlb2YgT2JqZWN0LmNyZWF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAvLyBpbXBsZW1lbnRhdGlvbiBmcm9tIHN0YW5kYXJkIG5vZGUuanMgJ3V0aWwnIG1vZHVsZVxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGlmIChzdXBlckN0b3IpIHtcbiAgICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgICBjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDdG9yLnByb3RvdHlwZSwge1xuICAgICAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgICAgIHZhbHVlOiBjdG9yLFxuICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfTtcbn0gZWxzZSB7XG4gIC8vIG9sZCBzY2hvb2wgc2hpbSBmb3Igb2xkIGJyb3dzZXJzXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgaWYgKHN1cGVyQ3Rvcikge1xuICAgICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICAgIHZhciBUZW1wQ3RvciA9IGZ1bmN0aW9uICgpIHt9XG4gICAgICBUZW1wQ3Rvci5wcm90b3R5cGUgPSBzdXBlckN0b3IucHJvdG90eXBlXG4gICAgICBjdG9yLnByb3RvdHlwZSA9IG5ldyBUZW1wQ3RvcigpXG4gICAgICBjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGN0b3JcbiAgICB9XG4gIH1cbn1cbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChhcnIpID09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBhc3NlcnQ7XG5cbmZ1bmN0aW9uIGFzc2VydCh2YWwsIG1zZykge1xuICBpZiAoIXZhbClcbiAgICB0aHJvdyBuZXcgRXJyb3IobXNnIHx8ICdBc3NlcnRpb24gZmFpbGVkJyk7XG59XG5cbmFzc2VydC5lcXVhbCA9IGZ1bmN0aW9uIGFzc2VydEVxdWFsKGwsIHIsIG1zZykge1xuICBpZiAobCAhPSByKVxuICAgIHRocm93IG5ldyBFcnJvcihtc2cgfHwgKCdBc3NlcnRpb24gZmFpbGVkOiAnICsgbCArICcgIT0gJyArIHIpKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IGV4cG9ydHM7XG5cbmZ1bmN0aW9uIHRvQXJyYXkobXNnLCBlbmMpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkobXNnKSlcbiAgICByZXR1cm4gbXNnLnNsaWNlKCk7XG4gIGlmICghbXNnKVxuICAgIHJldHVybiBbXTtcbiAgdmFyIHJlcyA9IFtdO1xuICBpZiAodHlwZW9mIG1zZyAhPT0gJ3N0cmluZycpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1zZy5sZW5ndGg7IGkrKylcbiAgICAgIHJlc1tpXSA9IG1zZ1tpXSB8IDA7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuICBpZiAoZW5jID09PSAnaGV4Jykge1xuICAgIG1zZyA9IG1zZy5yZXBsYWNlKC9bXmEtejAtOV0rL2lnLCAnJyk7XG4gICAgaWYgKG1zZy5sZW5ndGggJSAyICE9PSAwKVxuICAgICAgbXNnID0gJzAnICsgbXNnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbXNnLmxlbmd0aDsgaSArPSAyKVxuICAgICAgcmVzLnB1c2gocGFyc2VJbnQobXNnW2ldICsgbXNnW2kgKyAxXSwgMTYpKTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1zZy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGMgPSBtc2cuY2hhckNvZGVBdChpKTtcbiAgICAgIHZhciBoaSA9IGMgPj4gODtcbiAgICAgIHZhciBsbyA9IGMgJiAweGZmO1xuICAgICAgaWYgKGhpKVxuICAgICAgICByZXMucHVzaChoaSwgbG8pO1xuICAgICAgZWxzZVxuICAgICAgICByZXMucHVzaChsbyk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59XG51dGlscy50b0FycmF5ID0gdG9BcnJheTtcblxuZnVuY3Rpb24gemVybzIod29yZCkge1xuICBpZiAod29yZC5sZW5ndGggPT09IDEpXG4gICAgcmV0dXJuICcwJyArIHdvcmQ7XG4gIGVsc2VcbiAgICByZXR1cm4gd29yZDtcbn1cbnV0aWxzLnplcm8yID0gemVybzI7XG5cbmZ1bmN0aW9uIHRvSGV4KG1zZykge1xuICB2YXIgcmVzID0gJyc7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbXNnLmxlbmd0aDsgaSsrKVxuICAgIHJlcyArPSB6ZXJvMihtc2dbaV0udG9TdHJpbmcoMTYpKTtcbiAgcmV0dXJuIHJlcztcbn1cbnV0aWxzLnRvSGV4ID0gdG9IZXg7XG5cbnV0aWxzLmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShhcnIsIGVuYykge1xuICBpZiAoZW5jID09PSAnaGV4JylcbiAgICByZXR1cm4gdG9IZXgoYXJyKTtcbiAgZWxzZVxuICAgIHJldHVybiBhcnI7XG59O1xuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XG5cdFx0bW9kdWxlLnBhdGhzID0gW107XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xuXHR9XG5cdHJldHVybiBtb2R1bGU7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlByaXZhdGVLZXkgPSB2b2lkIDA7XG52YXIgZW9zanNfbnVtZXJpY18xID0gcmVxdWlyZShcIi4vZW9zanMtbnVtZXJpY1wiKTtcbnZhciBlb3Nqc19rZXlfY29udmVyc2lvbnNfMSA9IHJlcXVpcmUoXCIuL2Vvc2pzLWtleS1jb252ZXJzaW9uc1wiKTtcbi8qKiBSZXByZXNlbnRzL3N0b3JlcyBhIHByaXZhdGUga2V5IGFuZCBwcm92aWRlcyBlYXN5IGNvbnZlcnNpb24gZm9yIHVzZSB3aXRoIGBlbGxpcHRpY2AgbGliICovXG52YXIgUHJpdmF0ZUtleSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQcml2YXRlS2V5KGtleSwgZWMpIHtcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgIHRoaXMuZWMgPSBlYztcbiAgICB9XG4gICAgLyoqIEluc3RhbnRpYXRlIHByaXZhdGUga2V5IGZyb20gYW4gYGVsbGlwdGljYC1mb3JtYXQgcHJpdmF0ZSBrZXkgKi9cbiAgICBQcml2YXRlS2V5LmZyb21FbGxpcHRpYyA9IGZ1bmN0aW9uIChwcml2S2V5LCBrZXlUeXBlLCBlYykge1xuICAgICAgICBpZiAoIWVjKSB7XG4gICAgICAgICAgICBlYyA9IGVvc2pzX2tleV9jb252ZXJzaW9uc18xLmNvbnN0cnVjdEVsbGlwdGljKGtleVR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJpdmF0ZUtleSh7XG4gICAgICAgICAgICB0eXBlOiBrZXlUeXBlLFxuICAgICAgICAgICAgZGF0YTogcHJpdktleS5nZXRQcml2YXRlKCkudG9BcnJheUxpa2UoQnVmZmVyLCAnYmUnLCAzMiksXG4gICAgICAgIH0sIGVjKTtcbiAgICB9O1xuICAgIC8qKiBJbnN0YW50aWF0ZSBwcml2YXRlIGtleSBmcm9tIGFuIEVPU0lPLWZvcm1hdCBwcml2YXRlIGtleSAqL1xuICAgIFByaXZhdGVLZXkuZnJvbVN0cmluZyA9IGZ1bmN0aW9uIChrZXlTdHJpbmcsIGVjKSB7XG4gICAgICAgIHZhciBwcml2YXRlS2V5ID0gZW9zanNfbnVtZXJpY18xLnN0cmluZ1RvUHJpdmF0ZUtleShrZXlTdHJpbmcpO1xuICAgICAgICBpZiAoIWVjKSB7XG4gICAgICAgICAgICBlYyA9IGVvc2pzX2tleV9jb252ZXJzaW9uc18xLmNvbnN0cnVjdEVsbGlwdGljKHByaXZhdGVLZXkudHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcml2YXRlS2V5KHByaXZhdGVLZXksIGVjKTtcbiAgICB9O1xuICAgIC8qKiBFeHBvcnQgcHJpdmF0ZSBrZXkgYXMgYGVsbGlwdGljYC1mb3JtYXQgcHJpdmF0ZSBrZXkgKi9cbiAgICBQcml2YXRlS2V5LnByb3RvdHlwZS50b0VsbGlwdGljID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lYy5rZXlGcm9tUHJpdmF0ZSh0aGlzLmtleS5kYXRhKTtcbiAgICB9O1xuICAgIFByaXZhdGVLZXkucHJvdG90eXBlLnRvTGVnYWN5U3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZW9zanNfbnVtZXJpY18xLnByaXZhdGVLZXlUb0xlZ2FjeVN0cmluZyh0aGlzLmtleSk7XG4gICAgfTtcbiAgICAvKiogRXhwb3J0IHByaXZhdGUga2V5IGFzIEVPU0lPLWZvcm1hdCBwcml2YXRlIGtleSAqL1xuICAgIFByaXZhdGVLZXkucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZW9zanNfbnVtZXJpY18xLnByaXZhdGVLZXlUb1N0cmluZyh0aGlzLmtleSk7XG4gICAgfTtcbiAgICAvKiogR2V0IGtleSB0eXBlIGZyb20ga2V5ICovXG4gICAgUHJpdmF0ZUtleS5wcm90b3R5cGUuZ2V0VHlwZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5LnR5cGU7XG4gICAgfTtcbiAgICAvKiogUmV0cmlldmUgdGhlIHB1YmxpYyBrZXkgZnJvbSBhIHByaXZhdGUga2V5ICovXG4gICAgUHJpdmF0ZUtleS5wcm90b3R5cGUuZ2V0UHVibGljS2V5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZWxsaXB0aWNQcml2YXRlS2V5ID0gdGhpcy50b0VsbGlwdGljKCk7XG4gICAgICAgIHJldHVybiBlb3Nqc19rZXlfY29udmVyc2lvbnNfMS5QdWJsaWNLZXkuZnJvbUVsbGlwdGljKGVsbGlwdGljUHJpdmF0ZUtleSwgdGhpcy5nZXRUeXBlKCksIHRoaXMuZWMpO1xuICAgIH07XG4gICAgLyoqIFNpZ24gYSBtZXNzYWdlIG9yIGhhc2hlZCBtZXNzYWdlIGRpZ2VzdCB3aXRoIHByaXZhdGUga2V5ICovXG4gICAgUHJpdmF0ZUtleS5wcm90b3R5cGUuc2lnbiA9IGZ1bmN0aW9uIChkYXRhLCBzaG91bGRIYXNoLCBlbmNvZGluZykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoc2hvdWxkSGFzaCA9PT0gdm9pZCAwKSB7IHNob3VsZEhhc2ggPSB0cnVlOyB9XG4gICAgICAgIGlmIChlbmNvZGluZyA9PT0gdm9pZCAwKSB7IGVuY29kaW5nID0gJ3V0ZjgnOyB9XG4gICAgICAgIGlmIChzaG91bGRIYXNoKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IEJ1ZmZlci5mcm9tKGRhdGEsIGVuY29kaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmVjLmhhc2goKS51cGRhdGUoZGF0YSkuZGlnZXN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRyaWVzID0gMDtcbiAgICAgICAgdmFyIHNpZ25hdHVyZTtcbiAgICAgICAgdmFyIGlzQ2Fub25pY2FsID0gZnVuY3Rpb24gKHNpZ0RhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiAhKHNpZ0RhdGFbMV0gJiAweDgwKSAmJiAhKHNpZ0RhdGFbMV0gPT09IDAgJiYgIShzaWdEYXRhWzJdICYgMHg4MCkpXG4gICAgICAgICAgICAgICAgJiYgIShzaWdEYXRhWzMzXSAmIDB4ODApICYmICEoc2lnRGF0YVszM10gPT09IDAgJiYgIShzaWdEYXRhWzM0XSAmIDB4ODApKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGNvbnN0cnVjdFNpZ25hdHVyZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgZWxsaXB0aWNQcml2YXRlS2V5ID0gX3RoaXMudG9FbGxpcHRpYygpO1xuICAgICAgICAgICAgdmFyIGVsbGlwdGljU2lnbmF0dXJlID0gZWxsaXB0aWNQcml2YXRlS2V5LnNpZ24oZGF0YSwgb3B0aW9ucyk7XG4gICAgICAgICAgICByZXR1cm4gZW9zanNfa2V5X2NvbnZlcnNpb25zXzEuU2lnbmF0dXJlLmZyb21FbGxpcHRpYyhlbGxpcHRpY1NpZ25hdHVyZSwgX3RoaXMuZ2V0VHlwZSgpLCBfdGhpcy5lYyk7XG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLmtleS50eXBlID09PSBlb3Nqc19udW1lcmljXzEuS2V5VHlwZS5rMSkge1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIHNpZ25hdHVyZSA9IGNvbnN0cnVjdFNpZ25hdHVyZSh7IGNhbm9uaWNhbDogdHJ1ZSwgcGVyczogWysrdHJpZXNdIH0pO1xuICAgICAgICAgICAgfSB3aGlsZSAoIWlzQ2Fub25pY2FsKHNpZ25hdHVyZS50b0JpbmFyeSgpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzaWduYXR1cmUgPSBjb25zdHJ1Y3RTaWduYXR1cmUoeyBjYW5vbmljYWw6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNpZ25hdHVyZTtcbiAgICB9O1xuICAgIC8qKiBWYWxpZGF0ZSBhIHByaXZhdGUga2V5ICovXG4gICAgUHJpdmF0ZUtleS5wcm90b3R5cGUuaXNWYWxpZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBlbGxpcHRpY1ByaXZhdGVLZXkgPSB0aGlzLnRvRWxsaXB0aWMoKTtcbiAgICAgICAgICAgIHZhciB2YWxpZGF0aW9uT2JqID0gZWxsaXB0aWNQcml2YXRlS2V5LnZhbGlkYXRlKCk7XG4gICAgICAgICAgICByZXR1cm4gdmFsaWRhdGlvbk9iai5yZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKF9hKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBQcml2YXRlS2V5O1xufSgpKTtcbmV4cG9ydHMuUHJpdmF0ZUtleSA9IFByaXZhdGVLZXk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUHVibGljS2V5ID0gdm9pZCAwO1xudmFyIGVvc2pzX251bWVyaWNfMSA9IHJlcXVpcmUoXCIuL2Vvc2pzLW51bWVyaWNcIik7XG52YXIgZW9zanNfa2V5X2NvbnZlcnNpb25zXzEgPSByZXF1aXJlKFwiLi9lb3Nqcy1rZXktY29udmVyc2lvbnNcIik7XG4vKiogUmVwcmVzZW50cy9zdG9yZXMgYSBwdWJsaWMga2V5IGFuZCBwcm92aWRlcyBlYXN5IGNvbnZlcnNpb24gZm9yIHVzZSB3aXRoIGBlbGxpcHRpY2AgbGliICovXG52YXIgUHVibGljS2V5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFB1YmxpY0tleShrZXksIGVjKSB7XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgICB0aGlzLmVjID0gZWM7XG4gICAgfVxuICAgIC8qKiBJbnN0YW50aWF0ZSBwdWJsaWMga2V5IGZyb20gYW4gRU9TSU8tZm9ybWF0IHB1YmxpYyBrZXkgKi9cbiAgICBQdWJsaWNLZXkuZnJvbVN0cmluZyA9IGZ1bmN0aW9uIChwdWJsaWNLZXlTdHIsIGVjKSB7XG4gICAgICAgIHZhciBrZXkgPSBlb3Nqc19udW1lcmljXzEuc3RyaW5nVG9QdWJsaWNLZXkocHVibGljS2V5U3RyKTtcbiAgICAgICAgaWYgKCFlYykge1xuICAgICAgICAgICAgZWMgPSBlb3Nqc19rZXlfY29udmVyc2lvbnNfMS5jb25zdHJ1Y3RFbGxpcHRpYyhrZXkudHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQdWJsaWNLZXkoa2V5LCBlYyk7XG4gICAgfTtcbiAgICAvKiogSW5zdGFudGlhdGUgcHVibGljIGtleSBmcm9tIGFuIGBlbGxpcHRpY2AtZm9ybWF0IHB1YmxpYyBrZXkgKi9cbiAgICBQdWJsaWNLZXkuZnJvbUVsbGlwdGljID0gZnVuY3Rpb24gKHB1YmxpY0tleSwga2V5VHlwZSwgZWMpIHtcbiAgICAgICAgdmFyIHggPSBwdWJsaWNLZXkuZ2V0UHVibGljKCkuZ2V0WCgpLnRvQXJyYXkoJ2JlJywgMzIpO1xuICAgICAgICB2YXIgeSA9IHB1YmxpY0tleS5nZXRQdWJsaWMoKS5nZXRZKCkudG9BcnJheSgnYmUnLCAzMik7XG4gICAgICAgIGlmICghZWMpIHtcbiAgICAgICAgICAgIGVjID0gZW9zanNfa2V5X2NvbnZlcnNpb25zXzEuY29uc3RydWN0RWxsaXB0aWMoa2V5VHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQdWJsaWNLZXkoe1xuICAgICAgICAgICAgdHlwZToga2V5VHlwZSxcbiAgICAgICAgICAgIGRhdGE6IG5ldyBVaW50OEFycmF5KFsoeVszMV0gJiAxKSA/IDMgOiAyXS5jb25jYXQoeCkpLFxuICAgICAgICB9LCBlYyk7XG4gICAgfTtcbiAgICAvKiogRXhwb3J0IHB1YmxpYyBrZXkgYXMgRU9TSU8tZm9ybWF0IHB1YmxpYyBrZXkgKi9cbiAgICBQdWJsaWNLZXkucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZW9zanNfbnVtZXJpY18xLnB1YmxpY0tleVRvU3RyaW5nKHRoaXMua2V5KTtcbiAgICB9O1xuICAgIC8qKiBFeHBvcnQgcHVibGljIGtleSBhcyBMZWdhY3kgRU9TSU8tZm9ybWF0IHB1YmxpYyBrZXkgKi9cbiAgICBQdWJsaWNLZXkucHJvdG90eXBlLnRvTGVnYWN5U3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZW9zanNfbnVtZXJpY18xLnB1YmxpY0tleVRvTGVnYWN5U3RyaW5nKHRoaXMua2V5KTtcbiAgICB9O1xuICAgIC8qKiBFeHBvcnQgcHVibGljIGtleSBhcyBgZWxsaXB0aWNgLWZvcm1hdCBwdWJsaWMga2V5ICovXG4gICAgUHVibGljS2V5LnByb3RvdHlwZS50b0VsbGlwdGljID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lYy5rZXlQYWlyKHtcbiAgICAgICAgICAgIHB1YjogQnVmZmVyLmZyb20odGhpcy5rZXkuZGF0YSksXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqIEdldCBrZXkgdHlwZSBmcm9tIGtleSAqL1xuICAgIFB1YmxpY0tleS5wcm90b3R5cGUuZ2V0VHlwZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5LnR5cGU7XG4gICAgfTtcbiAgICAvKiogVmFsaWRhdGUgYSBwdWJsaWMga2V5ICovXG4gICAgUHVibGljS2V5LnByb3RvdHlwZS5pc1ZhbGlkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGVsbGlwdGljUHVibGljS2V5ID0gdGhpcy50b0VsbGlwdGljKCk7XG4gICAgICAgICAgICB2YXIgdmFsaWRhdGlvbk9iaiA9IGVsbGlwdGljUHVibGljS2V5LnZhbGlkYXRlKCk7XG4gICAgICAgICAgICByZXR1cm4gdmFsaWRhdGlvbk9iai5yZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKF9hKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBQdWJsaWNLZXk7XG59KCkpO1xuZXhwb3J0cy5QdWJsaWNLZXkgPSBQdWJsaWNLZXk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU2lnbmF0dXJlID0gdm9pZCAwO1xudmFyIEJOID0gcmVxdWlyZShcImJuLmpzXCIpO1xudmFyIGVvc2pzX251bWVyaWNfMSA9IHJlcXVpcmUoXCIuL2Vvc2pzLW51bWVyaWNcIik7XG52YXIgZW9zanNfa2V5X2NvbnZlcnNpb25zXzEgPSByZXF1aXJlKFwiLi9lb3Nqcy1rZXktY29udmVyc2lvbnNcIik7XG4vKiogUmVwcmVzZW50cy9zdG9yZXMgYSBTaWduYXR1cmUgYW5kIHByb3ZpZGVzIGVhc3kgY29udmVyc2lvbiBmb3IgdXNlIHdpdGggYGVsbGlwdGljYCBsaWIgKi9cbnZhciBTaWduYXR1cmUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2lnbmF0dXJlKHNpZ25hdHVyZSwgZWMpIHtcbiAgICAgICAgdGhpcy5zaWduYXR1cmUgPSBzaWduYXR1cmU7XG4gICAgICAgIHRoaXMuZWMgPSBlYztcbiAgICB9XG4gICAgLyoqIEluc3RhbnRpYXRlIFNpZ25hdHVyZSBmcm9tIGFuIEVPU0lPLWZvcm1hdCBTaWduYXR1cmUgKi9cbiAgICBTaWduYXR1cmUuZnJvbVN0cmluZyA9IGZ1bmN0aW9uIChzaWcsIGVjKSB7XG4gICAgICAgIHZhciBzaWduYXR1cmUgPSBlb3Nqc19udW1lcmljXzEuc3RyaW5nVG9TaWduYXR1cmUoc2lnKTtcbiAgICAgICAgaWYgKCFlYykge1xuICAgICAgICAgICAgZWMgPSBlb3Nqc19rZXlfY29udmVyc2lvbnNfMS5jb25zdHJ1Y3RFbGxpcHRpYyhzaWduYXR1cmUudHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBTaWduYXR1cmUoc2lnbmF0dXJlLCBlYyk7XG4gICAgfTtcbiAgICAvKiogSW5zdGFudGlhdGUgU2lnbmF0dXJlIGZyb20gYW4gYGVsbGlwdGljYC1mb3JtYXQgU2lnbmF0dXJlICovXG4gICAgU2lnbmF0dXJlLmZyb21FbGxpcHRpYyA9IGZ1bmN0aW9uIChlbGxpcHRpY1NpZywga2V5VHlwZSwgZWMpIHtcbiAgICAgICAgdmFyIHIgPSBlbGxpcHRpY1NpZy5yLnRvQXJyYXkoJ2JlJywgMzIpO1xuICAgICAgICB2YXIgcyA9IGVsbGlwdGljU2lnLnMudG9BcnJheSgnYmUnLCAzMik7XG4gICAgICAgIHZhciBlb3Npb1JlY292ZXJ5UGFyYW07XG4gICAgICAgIGlmIChrZXlUeXBlID09PSBlb3Nqc19udW1lcmljXzEuS2V5VHlwZS5rMSB8fCBrZXlUeXBlID09PSBlb3Nqc19udW1lcmljXzEuS2V5VHlwZS5yMSkge1xuICAgICAgICAgICAgZW9zaW9SZWNvdmVyeVBhcmFtID0gZWxsaXB0aWNTaWcucmVjb3ZlcnlQYXJhbSArIDI3O1xuICAgICAgICAgICAgaWYgKGVsbGlwdGljU2lnLnJlY292ZXJ5UGFyYW0gPD0gMykge1xuICAgICAgICAgICAgICAgIGVvc2lvUmVjb3ZlcnlQYXJhbSArPSA0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtleVR5cGUgPT09IGVvc2pzX251bWVyaWNfMS5LZXlUeXBlLndhKSB7XG4gICAgICAgICAgICBlb3Npb1JlY292ZXJ5UGFyYW0gPSBlbGxpcHRpY1NpZy5yZWNvdmVyeVBhcmFtO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzaWdEYXRhID0gbmV3IFVpbnQ4QXJyYXkoW2Vvc2lvUmVjb3ZlcnlQYXJhbV0uY29uY2F0KHIsIHMpKTtcbiAgICAgICAgaWYgKCFlYykge1xuICAgICAgICAgICAgZWMgPSBlb3Nqc19rZXlfY29udmVyc2lvbnNfMS5jb25zdHJ1Y3RFbGxpcHRpYyhrZXlUeXBlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFNpZ25hdHVyZSh7XG4gICAgICAgICAgICB0eXBlOiBrZXlUeXBlLFxuICAgICAgICAgICAgZGF0YTogc2lnRGF0YSxcbiAgICAgICAgfSwgZWMpO1xuICAgIH07XG4gICAgLyoqIEV4cG9ydCBTaWduYXR1cmUgYXMgYGVsbGlwdGljYC1mb3JtYXQgU2lnbmF0dXJlXG4gICAgICogTk9URTogVGhpcyBpc24ndCBhbiBhY3R1YWwgZWxsaXB0aWMtZm9ybWF0IFNpZ25hdHVyZSwgYXMgZWMuU2lnbmF0dXJlIGlzIG5vdCBleHBvcnRlZCBieSB0aGUgbGlicmFyeS5cbiAgICAgKiBUaGF0J3MgYWxzbyB3aHkgdGhlIHJldHVybiB0eXBlIGlzIGBhbnlgLiAgV2UncmUgKmFjdHVhbGx5KiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggdGhlIDMgcGFyYW1zXG4gICAgICogbm90IGFuIGVjLlNpZ25hdHVyZS5cbiAgICAgKiBGdXJ0aGVyIE5PVEU6IEB0eXBlcy9lbGxpcHRpYyBzaG93cyBlYy5TaWduYXR1cmUgYXMgZXhwb3J0ZWQ7IGl0IGlzICpub3QqLiAgSGVuY2UgdGhlIGBhbnlgLlxuICAgICAqL1xuICAgIFNpZ25hdHVyZS5wcm90b3R5cGUudG9FbGxpcHRpYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGxlbmd0aE9mUiA9IDMyO1xuICAgICAgICB2YXIgbGVuZ3RoT2ZTID0gMzI7XG4gICAgICAgIHZhciByID0gbmV3IEJOKHRoaXMuc2lnbmF0dXJlLmRhdGEuc2xpY2UoMSwgbGVuZ3RoT2ZSICsgMSkpO1xuICAgICAgICB2YXIgcyA9IG5ldyBCTih0aGlzLnNpZ25hdHVyZS5kYXRhLnNsaWNlKGxlbmd0aE9mUiArIDEsIGxlbmd0aE9mUiArIGxlbmd0aE9mUyArIDEpKTtcbiAgICAgICAgdmFyIGVsbGlwdGljUmVjb3ZlcnlCaXRGaWVsZDtcbiAgICAgICAgaWYgKHRoaXMuc2lnbmF0dXJlLnR5cGUgPT09IGVvc2pzX251bWVyaWNfMS5LZXlUeXBlLmsxIHx8IHRoaXMuc2lnbmF0dXJlLnR5cGUgPT09IGVvc2pzX251bWVyaWNfMS5LZXlUeXBlLnIxKSB7XG4gICAgICAgICAgICBlbGxpcHRpY1JlY292ZXJ5Qml0RmllbGQgPSB0aGlzLnNpZ25hdHVyZS5kYXRhWzBdIC0gMjc7XG4gICAgICAgICAgICBpZiAoZWxsaXB0aWNSZWNvdmVyeUJpdEZpZWxkID4gMykge1xuICAgICAgICAgICAgICAgIGVsbGlwdGljUmVjb3ZlcnlCaXRGaWVsZCAtPSA0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc2lnbmF0dXJlLnR5cGUgPT09IGVvc2pzX251bWVyaWNfMS5LZXlUeXBlLndhKSB7XG4gICAgICAgICAgICBlbGxpcHRpY1JlY292ZXJ5Qml0RmllbGQgPSB0aGlzLnNpZ25hdHVyZS5kYXRhWzBdO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZWNvdmVyeVBhcmFtID0gZWxsaXB0aWNSZWNvdmVyeUJpdEZpZWxkICYgMztcbiAgICAgICAgcmV0dXJuIHsgcjogciwgczogcywgcmVjb3ZlcnlQYXJhbTogcmVjb3ZlcnlQYXJhbSB9O1xuICAgIH07XG4gICAgLyoqIEV4cG9ydCBTaWduYXR1cmUgYXMgRU9TSU8tZm9ybWF0IFNpZ25hdHVyZSAqL1xuICAgIFNpZ25hdHVyZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBlb3Nqc19udW1lcmljXzEuc2lnbmF0dXJlVG9TdHJpbmcodGhpcy5zaWduYXR1cmUpO1xuICAgIH07XG4gICAgLyoqIEV4cG9ydCBTaWduYXR1cmUgaW4gYmluYXJ5IGZvcm1hdCAqL1xuICAgIFNpZ25hdHVyZS5wcm90b3R5cGUudG9CaW5hcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNpZ25hdHVyZS5kYXRhO1xuICAgIH07XG4gICAgLyoqIEdldCBrZXkgdHlwZSBmcm9tIHNpZ25hdHVyZSAqL1xuICAgIFNpZ25hdHVyZS5wcm90b3R5cGUuZ2V0VHlwZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2lnbmF0dXJlLnR5cGU7XG4gICAgfTtcbiAgICAvKiogVmVyaWZ5IGEgc2lnbmF0dXJlIHdpdGggYSBtZXNzYWdlIG9yIGhhc2hlZCBtZXNzYWdlIGRpZ2VzdCBhbmQgcHVibGljIGtleSAqL1xuICAgIFNpZ25hdHVyZS5wcm90b3R5cGUudmVyaWZ5ID0gZnVuY3Rpb24gKGRhdGEsIHB1YmxpY0tleSwgc2hvdWxkSGFzaCwgZW5jb2RpbmcpIHtcbiAgICAgICAgaWYgKHNob3VsZEhhc2ggPT09IHZvaWQgMCkgeyBzaG91bGRIYXNoID0gdHJ1ZTsgfVxuICAgICAgICBpZiAoZW5jb2RpbmcgPT09IHZvaWQgMCkgeyBlbmNvZGluZyA9ICd1dGY4JzsgfVxuICAgICAgICBpZiAoc2hvdWxkSGFzaCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBCdWZmZXIuZnJvbShkYXRhLCBlbmNvZGluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYXRhID0gdGhpcy5lYy5oYXNoKCkudXBkYXRlKGRhdGEpLmRpZ2VzdCgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbGxpcHRpY1NpZ25hdHVyZSA9IHRoaXMudG9FbGxpcHRpYygpO1xuICAgICAgICB2YXIgZWxsaXB0aWNQdWJsaWNLZXkgPSBwdWJsaWNLZXkudG9FbGxpcHRpYygpO1xuICAgICAgICByZXR1cm4gdGhpcy5lYy52ZXJpZnkoZGF0YSwgZWxsaXB0aWNTaWduYXR1cmUsIGVsbGlwdGljUHVibGljS2V5LCBlbmNvZGluZyk7XG4gICAgfTtcbiAgICAvKiogUmVjb3ZlciBhIHB1YmxpYyBrZXkgZnJvbSBhIG1lc3NhZ2Ugb3IgaGFzaGVkIG1lc3NhZ2UgZGlnZXN0IGFuZCBzaWduYXR1cmUgKi9cbiAgICBTaWduYXR1cmUucHJvdG90eXBlLnJlY292ZXIgPSBmdW5jdGlvbiAoZGF0YSwgc2hvdWxkSGFzaCwgZW5jb2RpbmcpIHtcbiAgICAgICAgaWYgKHNob3VsZEhhc2ggPT09IHZvaWQgMCkgeyBzaG91bGRIYXNoID0gdHJ1ZTsgfVxuICAgICAgICBpZiAoZW5jb2RpbmcgPT09IHZvaWQgMCkgeyBlbmNvZGluZyA9ICd1dGY4JzsgfVxuICAgICAgICBpZiAoc2hvdWxkSGFzaCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBCdWZmZXIuZnJvbShkYXRhLCBlbmNvZGluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYXRhID0gdGhpcy5lYy5oYXNoKCkudXBkYXRlKGRhdGEpLmRpZ2VzdCgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbGxpcHRpY1NpZ25hdHVyZSA9IHRoaXMudG9FbGxpcHRpYygpO1xuICAgICAgICB2YXIgcmVjb3ZlcmVkUHVibGljS2V5ID0gdGhpcy5lYy5yZWNvdmVyUHViS2V5KGRhdGEsIGVsbGlwdGljU2lnbmF0dXJlLCBlbGxpcHRpY1NpZ25hdHVyZS5yZWNvdmVyeVBhcmFtLCBlbmNvZGluZyk7XG4gICAgICAgIHZhciBlbGxpcHRpY0tQdWIgPSB0aGlzLmVjLmtleUZyb21QdWJsaWMocmVjb3ZlcmVkUHVibGljS2V5KTtcbiAgICAgICAgcmV0dXJuIGVvc2pzX2tleV9jb252ZXJzaW9uc18xLlB1YmxpY0tleS5mcm9tRWxsaXB0aWMoZWxsaXB0aWNLUHViLCB0aGlzLmdldFR5cGUoKSwgdGhpcy5lYyk7XG4gICAgfTtcbiAgICByZXR1cm4gU2lnbmF0dXJlO1xufSgpKTtcbmV4cG9ydHMuU2lnbmF0dXJlID0gU2lnbmF0dXJlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIEBtb2R1bGUgSlMtU2lnXG4gKi9cbi8vIGNvcHlyaWdodCBkZWZpbmVkIGluIGVvc2pzL0xJQ0VOU0UudHh0XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xudmFyIF9fdmFsdWVzID0gKHRoaXMgJiYgdGhpcy5fX3ZhbHVlcykgfHwgZnVuY3Rpb24obykge1xuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zaGEyNTYgPSBleHBvcnRzLmdlbmVyYXRlS2V5UGFpciA9IGV4cG9ydHMuY29uc3RydWN0RWxsaXB0aWMgPSBleHBvcnRzLkpzU2lnbmF0dXJlUHJvdmlkZXIgPSBleHBvcnRzLmRpZ2VzdEZyb21TZXJpYWxpemVkRGF0YSA9IGV4cG9ydHMuU2lnbmF0dXJlID0gZXhwb3J0cy5QdWJsaWNLZXkgPSBleHBvcnRzLlByaXZhdGVLZXkgPSB2b2lkIDA7XG52YXIgZWxsaXB0aWNfMSA9IHJlcXVpcmUoXCJlbGxpcHRpY1wiKTtcbnZhciBlb3Nqc19rZXlfY29udmVyc2lvbnNfMSA9IHJlcXVpcmUoXCIuL2Vvc2pzLWtleS1jb252ZXJzaW9uc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlByaXZhdGVLZXlcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVvc2pzX2tleV9jb252ZXJzaW9uc18xLlByaXZhdGVLZXk7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJQdWJsaWNLZXlcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVvc2pzX2tleV9jb252ZXJzaW9uc18xLlB1YmxpY0tleTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlNpZ25hdHVyZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZW9zanNfa2V5X2NvbnZlcnNpb25zXzEuU2lnbmF0dXJlOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiY29uc3RydWN0RWxsaXB0aWNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVvc2pzX2tleV9jb252ZXJzaW9uc18xLmNvbnN0cnVjdEVsbGlwdGljOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZ2VuZXJhdGVLZXlQYWlyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBlb3Nqc19rZXlfY29udmVyc2lvbnNfMS5nZW5lcmF0ZUtleVBhaXI7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzaGEyNTZcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVvc2pzX2tleV9jb252ZXJzaW9uc18xLnNoYTI1NjsgfSB9KTtcbnZhciBlb3Nqc19udW1lcmljXzEgPSByZXF1aXJlKFwiLi9lb3Nqcy1udW1lcmljXCIpO1xuLyoqIGV4cGVuc2l2ZSB0byBjb25zdHJ1Y3Q7IHNvIHdlIGRvIGl0IG9uY2UgYW5kIHJldXNlIGl0ICovXG52YXIgZGVmYXVsdEVjID0gbmV3IGVsbGlwdGljXzEuZWMoJ3NlY3AyNTZrMScpO1xuLyoqIENvbnN0cnVjdCB0aGUgZGlnZXN0IGZyb20gdHJhbnNhY3Rpb24gZGV0YWlscyAqL1xudmFyIGRpZ2VzdEZyb21TZXJpYWxpemVkRGF0YSA9IGZ1bmN0aW9uIChjaGFpbklkLCBzZXJpYWxpemVkVHJhbnNhY3Rpb24sIHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGEsIGUpIHtcbiAgICBpZiAoZSA9PT0gdm9pZCAwKSB7IGUgPSBkZWZhdWx0RWM7IH1cbiAgICB2YXIgc2lnbkJ1ZiA9IEJ1ZmZlci5jb25jYXQoW1xuICAgICAgICBCdWZmZXIuZnJvbShjaGFpbklkLCAnaGV4JyksXG4gICAgICAgIEJ1ZmZlci5mcm9tKHNlcmlhbGl6ZWRUcmFuc2FjdGlvbiksXG4gICAgICAgIEJ1ZmZlci5mcm9tKHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGEgP1xuICAgICAgICAgICAgbmV3IFVpbnQ4QXJyYXkoZS5oYXNoKCkudXBkYXRlKHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGEpLmRpZ2VzdCgpKSA6XG4gICAgICAgICAgICBuZXcgVWludDhBcnJheSgzMikpLFxuICAgIF0pO1xuICAgIHJldHVybiBlLmhhc2goKS51cGRhdGUoc2lnbkJ1ZikuZGlnZXN0KCk7XG59O1xuZXhwb3J0cy5kaWdlc3RGcm9tU2VyaWFsaXplZERhdGEgPSBkaWdlc3RGcm9tU2VyaWFsaXplZERhdGE7XG4vKiogU2lnbnMgdHJhbnNhY3Rpb25zIHVzaW5nIGluLXByb2Nlc3MgcHJpdmF0ZSBrZXlzICovXG52YXIgSnNTaWduYXR1cmVQcm92aWRlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKiogQHBhcmFtIHByaXZhdGVLZXlzIHByaXZhdGUga2V5cyB0byBzaWduIHdpdGggKi9cbiAgICBmdW5jdGlvbiBKc1NpZ25hdHVyZVByb3ZpZGVyKHByaXZhdGVLZXlzKSB7XG4gICAgICAgIHZhciBlXzEsIF9hO1xuICAgICAgICAvKiogbWFwIHB1YmxpYyB0byBwcml2YXRlIGtleXMgKi9cbiAgICAgICAgdGhpcy5rZXlzID0gbmV3IE1hcCgpO1xuICAgICAgICAvKiogcHVibGljIGtleXMgKi9cbiAgICAgICAgdGhpcy5hdmFpbGFibGVLZXlzID0gW107XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBwcml2YXRlS2V5c18xID0gX192YWx1ZXMocHJpdmF0ZUtleXMpLCBwcml2YXRlS2V5c18xXzEgPSBwcml2YXRlS2V5c18xLm5leHQoKTsgIXByaXZhdGVLZXlzXzFfMS5kb25lOyBwcml2YXRlS2V5c18xXzEgPSBwcml2YXRlS2V5c18xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBrID0gcHJpdmF0ZUtleXNfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgIHZhciBwcml2ID0gZW9zanNfa2V5X2NvbnZlcnNpb25zXzEuUHJpdmF0ZUtleS5mcm9tU3RyaW5nKGspO1xuICAgICAgICAgICAgICAgIHZhciBwcml2RWxsaXB0aWMgPSBwcml2LnRvRWxsaXB0aWMoKTtcbiAgICAgICAgICAgICAgICB2YXIgcHViU3RyID0gcHJpdi5nZXRQdWJsaWNLZXkoKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIHRoaXMua2V5cy5zZXQocHViU3RyLCBwcml2RWxsaXB0aWMpO1xuICAgICAgICAgICAgICAgIHRoaXMuYXZhaWxhYmxlS2V5cy5wdXNoKHB1YlN0cik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChwcml2YXRlS2V5c18xXzEgJiYgIXByaXZhdGVLZXlzXzFfMS5kb25lICYmIChfYSA9IHByaXZhdGVLZXlzXzEucmV0dXJuKSkgX2EuY2FsbChwcml2YXRlS2V5c18xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBKc1NpZ25hdHVyZVByb3ZpZGVyLnByb3RvdHlwZS5hZGRQcml2YXRlS2V5ID0gZnVuY3Rpb24gKHByaXZhdGVLZXkpIHtcbiAgICAgICAgdmFyIHByaXYgPSBlb3Nqc19rZXlfY29udmVyc2lvbnNfMS5Qcml2YXRlS2V5LmZyb21TdHJpbmcocHJpdmF0ZUtleSk7XG4gICAgICAgIHZhciBwcml2RWxsaXB0aWMgPSBwcml2LnRvRWxsaXB0aWMoKTtcbiAgICAgICAgdmFyIHB1YlN0ciA9IHByaXYuZ2V0UHVibGljS2V5KCkudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5rZXlzLnNldChwdWJTdHIsIHByaXZFbGxpcHRpYyk7XG4gICAgICAgIGlmICghdGhpcy5hdmFpbGFibGVLZXlzLmluY2x1ZGVzKHB1YlN0cikpIHtcbiAgICAgICAgICAgIHRoaXMuYXZhaWxhYmxlS2V5cy5wdXNoKHB1YlN0cik7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICAvKiogUHVibGljIGtleXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBwcml2YXRlIGtleXMgdGhhdCB0aGUgYFNpZ25hdHVyZVByb3ZpZGVyYCBob2xkcyAqL1xuICAgIEpzU2lnbmF0dXJlUHJvdmlkZXIucHJvdG90eXBlLmdldEF2YWlsYWJsZUtleXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5hdmFpbGFibGVLZXlzXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKiBTaWduIGEgdHJhbnNhY3Rpb24gKi9cbiAgICBKc1NpZ25hdHVyZVByb3ZpZGVyLnByb3RvdHlwZS5zaWduID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBjaGFpbklkID0gX2EuY2hhaW5JZCwgcmVxdWlyZWRLZXlzID0gX2EucmVxdWlyZWRLZXlzLCBzZXJpYWxpemVkVHJhbnNhY3Rpb24gPSBfYS5zZXJpYWxpemVkVHJhbnNhY3Rpb24sIHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGEgPSBfYS5zZXJpYWxpemVkQ29udGV4dEZyZWVEYXRhO1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZGlnZXN0LCBzaWduYXR1cmVzLCByZXF1aXJlZEtleXNfMSwgcmVxdWlyZWRLZXlzXzFfMSwga2V5LCBwdWJsaWNLZXksIGVsbGlwdGljUHJpdmF0ZUtleSwgcHJpdmF0ZUtleSwgc2lnbmF0dXJlO1xuICAgICAgICAgICAgdmFyIGVfMiwgX2I7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9jKSB7XG4gICAgICAgICAgICAgICAgZGlnZXN0ID0gZGlnZXN0RnJvbVNlcmlhbGl6ZWREYXRhKGNoYWluSWQsIHNlcmlhbGl6ZWRUcmFuc2FjdGlvbiwgc2VyaWFsaXplZENvbnRleHRGcmVlRGF0YSwgZGVmYXVsdEVjKTtcbiAgICAgICAgICAgICAgICBzaWduYXR1cmVzID0gW107XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChyZXF1aXJlZEtleXNfMSA9IF9fdmFsdWVzKHJlcXVpcmVkS2V5cyksIHJlcXVpcmVkS2V5c18xXzEgPSByZXF1aXJlZEtleXNfMS5uZXh0KCk7ICFyZXF1aXJlZEtleXNfMV8xLmRvbmU7IHJlcXVpcmVkS2V5c18xXzEgPSByZXF1aXJlZEtleXNfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleSA9IHJlcXVpcmVkS2V5c18xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBwdWJsaWNLZXkgPSBlb3Nqc19rZXlfY29udmVyc2lvbnNfMS5QdWJsaWNLZXkuZnJvbVN0cmluZyhrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxsaXB0aWNQcml2YXRlS2V5ID0gdGhpcy5rZXlzLmdldChlb3Nqc19udW1lcmljXzEuY29udmVydExlZ2FjeVB1YmxpY0tleShrZXkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaXZhdGVLZXkgPSBlb3Nqc19rZXlfY29udmVyc2lvbnNfMS5Qcml2YXRlS2V5LmZyb21FbGxpcHRpYyhlbGxpcHRpY1ByaXZhdGVLZXksIHB1YmxpY0tleS5nZXRUeXBlKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmF0dXJlID0gcHJpdmF0ZUtleS5zaWduKGRpZ2VzdCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmF0dXJlcy5wdXNoKHNpZ25hdHVyZS50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZV8yXzEpIHsgZV8yID0geyBlcnJvcjogZV8yXzEgfTsgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVpcmVkS2V5c18xXzEgJiYgIXJlcXVpcmVkS2V5c18xXzEuZG9uZSAmJiAoX2IgPSByZXF1aXJlZEtleXNfMS5yZXR1cm4pKSBfYi5jYWxsKHJlcXVpcmVkS2V5c18xKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMikgdGhyb3cgZV8yLmVycm9yOyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB7IHNpZ25hdHVyZXM6IHNpZ25hdHVyZXMsIHNlcmlhbGl6ZWRUcmFuc2FjdGlvbjogc2VyaWFsaXplZFRyYW5zYWN0aW9uLCBzZXJpYWxpemVkQ29udGV4dEZyZWVEYXRhOiBzZXJpYWxpemVkQ29udGV4dEZyZWVEYXRhIH1dO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEpzU2lnbmF0dXJlUHJvdmlkZXI7XG59KCkpO1xuZXhwb3J0cy5Kc1NpZ25hdHVyZVByb3ZpZGVyID0gSnNTaWduYXR1cmVQcm92aWRlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zaGEyNTYgPSBleHBvcnRzLmdlbmVyYXRlS2V5UGFpciA9IGV4cG9ydHMuY29uc3RydWN0RWxsaXB0aWMgPSB2b2lkIDA7XG52YXIgZWxsaXB0aWNfMSA9IHJlcXVpcmUoXCJlbGxpcHRpY1wiKTtcbnZhciBoYXNoID0gcmVxdWlyZShcImhhc2guanNcIik7XG52YXIgZW9zanNfbnVtZXJpY18xID0gcmVxdWlyZShcIi4vZW9zanMtbnVtZXJpY1wiKTtcbnZhciBQdWJsaWNLZXlfMSA9IHJlcXVpcmUoXCIuL1B1YmxpY0tleVwiKTtcbnZhciBQcml2YXRlS2V5XzEgPSByZXF1aXJlKFwiLi9Qcml2YXRlS2V5XCIpO1xudmFyIFByaXZhdGVLZXlfMiA9IHJlcXVpcmUoXCIuL1ByaXZhdGVLZXlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJQcml2YXRlS2V5XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBQcml2YXRlS2V5XzIuUHJpdmF0ZUtleTsgfSB9KTtcbnZhciBQdWJsaWNLZXlfMiA9IHJlcXVpcmUoXCIuL1B1YmxpY0tleVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlB1YmxpY0tleVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gUHVibGljS2V5XzIuUHVibGljS2V5OyB9IH0pO1xudmFyIFNpZ25hdHVyZV8xID0gcmVxdWlyZShcIi4vU2lnbmF0dXJlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiU2lnbmF0dXJlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBTaWduYXR1cmVfMS5TaWduYXR1cmU7IH0gfSk7XG4vKiogQ29uc3RydWN0IHRoZSBlbGxpcHRpYyBjdXJ2ZSBvYmplY3QgYmFzZWQgb24ga2V5IHR5cGUgKi9cbmV4cG9ydHMuY29uc3RydWN0RWxsaXB0aWMgPSBmdW5jdGlvbiAodHlwZSkge1xuICAgIGlmICh0eXBlID09PSBlb3Nqc19udW1lcmljXzEuS2V5VHlwZS5rMSkge1xuICAgICAgICByZXR1cm4gbmV3IGVsbGlwdGljXzEuZWMoJ3NlY3AyNTZrMScpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IGVsbGlwdGljXzEuZWMoJ3AyNTYnKTtcbn07XG5leHBvcnRzLmdlbmVyYXRlS2V5UGFpciA9IGZ1bmN0aW9uICh0eXBlLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICBpZiAoIW9wdGlvbnMuc2VjdXJlRW52KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignS2V5IGdlbmVyYXRpb24gaXMgY29tcGxldGVseSBJTlNFQ1VSRSBpbiBwcm9kdWN0aW9uIGVudmlyb25tZW50cyBpbiB0aGUgYnJvd3Nlci4gJyArXG4gICAgICAgICAgICAnSWYgeW91IGFyZSBhYnNvbHV0ZWx5IGNlcnRhaW4gdGhpcyBkb2VzIE5PVCBkZXNjcmliZSB5b3VyIGVudmlyb25tZW50LCBzZXQgYHNlY3VyZUVudmAgaW4geW91ciAnICtcbiAgICAgICAgICAgICdvcHRpb25zIHRvIGB0cnVlYC4gIElmIHRoaXMgZG9lcyBkZXNjcmliZSB5b3VyIGVudmlyb25tZW50IGFuZCB5b3Ugc2V0IGBzZWN1cmVFbnZgIHRvIGB0cnVlYCwgJyArXG4gICAgICAgICAgICAnWU9VIERPIFNPIEFUIFlPVVIgT1dOIFJJU0sgQU5EIFRIRSBSSVNLIE9GIFlPVVIgVVNFUlMuJyk7XG4gICAgfVxuICAgIHZhciBlYztcbiAgICBpZiAodHlwZSA9PT0gZW9zanNfbnVtZXJpY18xLktleVR5cGUuazEpIHtcbiAgICAgICAgZWMgPSBuZXcgZWxsaXB0aWNfMS5lYygnc2VjcDI1NmsxJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBlYyA9IG5ldyBlbGxpcHRpY18xLmVjKCdwMjU2Jyk7XG4gICAgfVxuICAgIHZhciBlbGxpcHRpY0tleVBhaXIgPSBlYy5nZW5LZXlQYWlyKG9wdGlvbnMuZWNPcHRpb25zKTtcbiAgICB2YXIgcHVibGljS2V5ID0gUHVibGljS2V5XzEuUHVibGljS2V5LmZyb21FbGxpcHRpYyhlbGxpcHRpY0tleVBhaXIsIHR5cGUsIGVjKTtcbiAgICB2YXIgcHJpdmF0ZUtleSA9IFByaXZhdGVLZXlfMS5Qcml2YXRlS2V5LmZyb21FbGxpcHRpYyhlbGxpcHRpY0tleVBhaXIsIHR5cGUsIGVjKTtcbiAgICByZXR1cm4geyBwdWJsaWNLZXk6IHB1YmxpY0tleSwgcHJpdmF0ZUtleTogcHJpdmF0ZUtleSB9O1xufTtcbmV4cG9ydHMuc2hhMjU2ID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICByZXR1cm4gaGFzaC5zaGEyNTYoKS51cGRhdGUoZGF0YSkuZGlnZXN0KCk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICAgIGlmICghbSkgcmV0dXJuIG87XG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gICAgdHJ5IHtcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiBhcjtcbn07XG52YXIgX19zcHJlYWQgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fdmFsdWVzID0gKHRoaXMgJiYgdGhpcy5fX3ZhbHVlcykgfHwgZnVuY3Rpb24obykge1xuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zaWduYXR1cmVUb1N0cmluZyA9IGV4cG9ydHMuc3RyaW5nVG9TaWduYXR1cmUgPSBleHBvcnRzLnByaXZhdGVLZXlUb1N0cmluZyA9IGV4cG9ydHMucHJpdmF0ZUtleVRvTGVnYWN5U3RyaW5nID0gZXhwb3J0cy5zdHJpbmdUb1ByaXZhdGVLZXkgPSBleHBvcnRzLmNvbnZlcnRMZWdhY3lQdWJsaWNLZXlzID0gZXhwb3J0cy5jb252ZXJ0TGVnYWN5UHVibGljS2V5ID0gZXhwb3J0cy5wdWJsaWNLZXlUb1N0cmluZyA9IGV4cG9ydHMucHVibGljS2V5VG9MZWdhY3lTdHJpbmcgPSBleHBvcnRzLnN0cmluZ1RvUHVibGljS2V5ID0gZXhwb3J0cy5zaWduYXR1cmVEYXRhU2l6ZSA9IGV4cG9ydHMucHJpdmF0ZUtleURhdGFTaXplID0gZXhwb3J0cy5wdWJsaWNLZXlEYXRhU2l6ZSA9IGV4cG9ydHMuS2V5VHlwZSA9IGV4cG9ydHMuYmFzZTY0VG9CaW5hcnkgPSBleHBvcnRzLmJpbmFyeVRvQmFzZTU4ID0gZXhwb3J0cy5iYXNlNThUb0JpbmFyeSA9IGV4cG9ydHMuc2lnbmVkQmluYXJ5VG9EZWNpbWFsID0gZXhwb3J0cy5iaW5hcnlUb0RlY2ltYWwgPSBleHBvcnRzLnNpZ25lZERlY2ltYWxUb0JpbmFyeSA9IGV4cG9ydHMuZGVjaW1hbFRvQmluYXJ5ID0gZXhwb3J0cy5uZWdhdGUgPSBleHBvcnRzLmlzTmVnYXRpdmUgPSB2b2lkIDA7XG4vKipcbiAqIEBtb2R1bGUgTnVtZXJpY1xuICovXG52YXIgaGFzaF9qc18xID0gcmVxdWlyZShcImhhc2guanNcIik7XG4vLyBjb3B5cmlnaHQgZGVmaW5lZCBpbiBlb3Nqcy9MSUNFTlNFLnR4dFxudmFyIHJpcGVtZDE2MCA9IHJlcXVpcmUoJy4vcmlwZW1kJykuUklQRU1EMTYwLmhhc2g7XG52YXIgYmFzZTU4Q2hhcnMgPSAnMTIzNDU2Nzg5QUJDREVGR0hKS0xNTlBRUlNUVVZXWFlaYWJjZGVmZ2hpamttbm9wcXJzdHV2d3h5eic7XG52YXIgYmFzZTY0Q2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7XG52YXIgY3JlYXRlX2Jhc2U1OF9tYXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGJhc2U1OE0gPSBBcnJheSgyNTYpLmZpbGwoLTEpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmFzZTU4Q2hhcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgYmFzZTU4TVtiYXNlNThDaGFycy5jaGFyQ29kZUF0KGkpXSA9IGk7XG4gICAgfVxuICAgIHJldHVybiBiYXNlNThNO1xufTtcbnZhciBiYXNlNThNYXAgPSBjcmVhdGVfYmFzZTU4X21hcCgpO1xudmFyIGNyZWF0ZV9iYXNlNjRfbWFwID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBiYXNlNjRNID0gQXJyYXkoMjU2KS5maWxsKC0xKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJhc2U2NENoYXJzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGJhc2U2NE1bYmFzZTY0Q2hhcnMuY2hhckNvZGVBdChpKV0gPSBpO1xuICAgIH1cbiAgICBiYXNlNjRNWyc9Jy5jaGFyQ29kZUF0KDApXSA9IDA7XG4gICAgcmV0dXJuIGJhc2U2NE07XG59O1xudmFyIGJhc2U2NE1hcCA9IGNyZWF0ZV9iYXNlNjRfbWFwKCk7XG4vKiogSXMgYGJpZ251bWAgYSBuZWdhdGl2ZSBudW1iZXI/ICovXG5leHBvcnRzLmlzTmVnYXRpdmUgPSBmdW5jdGlvbiAoYmlnbnVtKSB7XG4gICAgcmV0dXJuIChiaWdudW1bYmlnbnVtLmxlbmd0aCAtIDFdICYgMHg4MCkgIT09IDA7XG59O1xuLyoqIE5lZ2F0ZSBgYmlnbnVtYCAqL1xuZXhwb3J0cy5uZWdhdGUgPSBmdW5jdGlvbiAoYmlnbnVtKSB7XG4gICAgdmFyIGNhcnJ5ID0gMTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJpZ251bS5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgeCA9ICh+YmlnbnVtW2ldICYgMHhmZikgKyBjYXJyeTtcbiAgICAgICAgYmlnbnVtW2ldID0geDtcbiAgICAgICAgY2FycnkgPSB4ID4+IDg7XG4gICAgfVxufTtcbi8qKlxuICogQ29udmVydCBhbiB1bnNpZ25lZCBkZWNpbWFsIG51bWJlciBpbiBgc2AgdG8gYSBiaWdudW1cbiAqXG4gKiBAcGFyYW0gc2l6ZSBiaWdudW0gc2l6ZSAoYnl0ZXMpXG4gKi9cbmV4cG9ydHMuZGVjaW1hbFRvQmluYXJ5ID0gZnVuY3Rpb24gKHNpemUsIHMpIHtcbiAgICB2YXIgcmVzdWx0ID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBzcmNEaWdpdCA9IHMuY2hhckNvZGVBdChpKTtcbiAgICAgICAgaWYgKHNyY0RpZ2l0IDwgJzAnLmNoYXJDb2RlQXQoMCkgfHwgc3JjRGlnaXQgPiAnOScuY2hhckNvZGVBdCgwKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIG51bWJlcicpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjYXJyeSA9IHNyY0RpZ2l0IC0gJzAnLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2l6ZTsgKytqKSB7XG4gICAgICAgICAgICB2YXIgeCA9IHJlc3VsdFtqXSAqIDEwICsgY2Fycnk7XG4gICAgICAgICAgICByZXN1bHRbal0gPSB4O1xuICAgICAgICAgICAgY2FycnkgPSB4ID4+IDg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhcnJ5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ251bWJlciBpcyBvdXQgb2YgcmFuZ2UnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbi8qKlxuICogQ29udmVydCBhIHNpZ25lZCBkZWNpbWFsIG51bWJlciBpbiBgc2AgdG8gYSBiaWdudW1cbiAqXG4gKiBAcGFyYW0gc2l6ZSBiaWdudW0gc2l6ZSAoYnl0ZXMpXG4gKi9cbmV4cG9ydHMuc2lnbmVkRGVjaW1hbFRvQmluYXJ5ID0gZnVuY3Rpb24gKHNpemUsIHMpIHtcbiAgICB2YXIgbmVnYXRpdmUgPSBzWzBdID09PSAnLSc7XG4gICAgaWYgKG5lZ2F0aXZlKSB7XG4gICAgICAgIHMgPSBzLnN1YnN0cigxKTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IGV4cG9ydHMuZGVjaW1hbFRvQmluYXJ5KHNpemUsIHMpO1xuICAgIGlmIChuZWdhdGl2ZSkge1xuICAgICAgICBleHBvcnRzLm5lZ2F0ZShyZXN1bHQpO1xuICAgICAgICBpZiAoIWV4cG9ydHMuaXNOZWdhdGl2ZShyZXN1bHQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ251bWJlciBpcyBvdXQgb2YgcmFuZ2UnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChleHBvcnRzLmlzTmVnYXRpdmUocmVzdWx0KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ251bWJlciBpcyBvdXQgb2YgcmFuZ2UnKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG4vKipcbiAqIENvbnZlcnQgYGJpZ251bWAgdG8gYW4gdW5zaWduZWQgZGVjaW1hbCBudW1iZXJcbiAqXG4gKiBAcGFyYW0gbWluRGlnaXRzIDAtcGFkIHJlc3VsdCB0byB0aGlzIG1hbnkgZGlnaXRzXG4gKi9cbmV4cG9ydHMuYmluYXJ5VG9EZWNpbWFsID0gZnVuY3Rpb24gKGJpZ251bSwgbWluRGlnaXRzKSB7XG4gICAgaWYgKG1pbkRpZ2l0cyA9PT0gdm9pZCAwKSB7IG1pbkRpZ2l0cyA9IDE7IH1cbiAgICB2YXIgcmVzdWx0ID0gQXJyYXkobWluRGlnaXRzKS5maWxsKCcwJy5jaGFyQ29kZUF0KDApKTtcbiAgICBmb3IgKHZhciBpID0gYmlnbnVtLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBjYXJyeSA9IGJpZ251bVtpXTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCByZXN1bHQubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgIHZhciB4ID0gKChyZXN1bHRbal0gLSAnMCcuY2hhckNvZGVBdCgwKSkgPDwgOCkgKyBjYXJyeTtcbiAgICAgICAgICAgIHJlc3VsdFtqXSA9ICcwJy5jaGFyQ29kZUF0KDApICsgeCAlIDEwO1xuICAgICAgICAgICAgY2FycnkgPSAoeCAvIDEwKSB8IDA7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKGNhcnJ5KSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCgnMCcuY2hhckNvZGVBdCgwKSArIGNhcnJ5ICUgMTApO1xuICAgICAgICAgICAgY2FycnkgPSAoY2FycnkgLyAxMCkgfCAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5yZXZlcnNlKCk7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBfX3NwcmVhZChyZXN1bHQpKTtcbn07XG4vKipcbiAqIENvbnZlcnQgYGJpZ251bWAgdG8gYSBzaWduZWQgZGVjaW1hbCBudW1iZXJcbiAqXG4gKiBAcGFyYW0gbWluRGlnaXRzIDAtcGFkIHJlc3VsdCB0byB0aGlzIG1hbnkgZGlnaXRzXG4gKi9cbmV4cG9ydHMuc2lnbmVkQmluYXJ5VG9EZWNpbWFsID0gZnVuY3Rpb24gKGJpZ251bSwgbWluRGlnaXRzKSB7XG4gICAgaWYgKG1pbkRpZ2l0cyA9PT0gdm9pZCAwKSB7IG1pbkRpZ2l0cyA9IDE7IH1cbiAgICBpZiAoZXhwb3J0cy5pc05lZ2F0aXZlKGJpZ251bSkpIHtcbiAgICAgICAgdmFyIHggPSBiaWdudW0uc2xpY2UoKTtcbiAgICAgICAgZXhwb3J0cy5uZWdhdGUoeCk7XG4gICAgICAgIHJldHVybiAnLScgKyBleHBvcnRzLmJpbmFyeVRvRGVjaW1hbCh4LCBtaW5EaWdpdHMpO1xuICAgIH1cbiAgICByZXR1cm4gZXhwb3J0cy5iaW5hcnlUb0RlY2ltYWwoYmlnbnVtLCBtaW5EaWdpdHMpO1xufTtcbnZhciBiYXNlNThUb0JpbmFyeVZhclNpemUgPSBmdW5jdGlvbiAocykge1xuICAgIHZhciBlXzEsIF9hO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGNhcnJ5ID0gYmFzZTU4TWFwW3MuY2hhckNvZGVBdChpKV07XG4gICAgICAgIGlmIChjYXJyeSA8IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBiYXNlLTU4IHZhbHVlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCByZXN1bHQubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgIHZhciB4ID0gcmVzdWx0W2pdICogNTggKyBjYXJyeTtcbiAgICAgICAgICAgIHJlc3VsdFtqXSA9IHggJiAweGZmO1xuICAgICAgICAgICAgY2FycnkgPSB4ID4+IDg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhcnJ5KSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChjYXJyeSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgc18xID0gX192YWx1ZXMocyksIHNfMV8xID0gc18xLm5leHQoKTsgIXNfMV8xLmRvbmU7IHNfMV8xID0gc18xLm5leHQoKSkge1xuICAgICAgICAgICAgdmFyIGNoID0gc18xXzEudmFsdWU7XG4gICAgICAgICAgICBpZiAoY2ggPT09ICcxJykge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChzXzFfMSAmJiAhc18xXzEuZG9uZSAmJiAoX2EgPSBzXzEucmV0dXJuKSkgX2EuY2FsbChzXzEpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cbiAgICB9XG4gICAgcmVzdWx0LnJldmVyc2UoKTtcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkocmVzdWx0KTtcbn07XG4vKipcbiAqIENvbnZlcnQgYW4gdW5zaWduZWQgYmFzZS01OCBudW1iZXIgaW4gYHNgIHRvIGEgYmlnbnVtXG4gKlxuICogQHBhcmFtIHNpemUgYmlnbnVtIHNpemUgKGJ5dGVzKVxuICovXG5leHBvcnRzLmJhc2U1OFRvQmluYXJ5ID0gZnVuY3Rpb24gKHNpemUsIHMpIHtcbiAgICBpZiAoIXNpemUpIHtcbiAgICAgICAgcmV0dXJuIGJhc2U1OFRvQmluYXJ5VmFyU2l6ZShzKTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KHNpemUpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgY2FycnkgPSBiYXNlNThNYXBbcy5jaGFyQ29kZUF0KGkpXTtcbiAgICAgICAgaWYgKGNhcnJ5IDwgMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGJhc2UtNTggdmFsdWUnKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNpemU7ICsraikge1xuICAgICAgICAgICAgdmFyIHggPSByZXN1bHRbal0gKiA1OCArIGNhcnJ5O1xuICAgICAgICAgICAgcmVzdWx0W2pdID0geDtcbiAgICAgICAgICAgIGNhcnJ5ID0geCA+PiA4O1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYXJyeSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdiYXNlLTU4IHZhbHVlIGlzIG91dCBvZiByYW5nZScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5yZXZlcnNlKCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG4vKipcbiAqIENvbnZlcnQgYGJpZ251bWAgdG8gYSBiYXNlLTU4IG51bWJlclxuICpcbiAqIEBwYXJhbSBtaW5EaWdpdHMgMC1wYWQgcmVzdWx0IHRvIHRoaXMgbWFueSBkaWdpdHNcbiAqL1xuZXhwb3J0cy5iaW5hcnlUb0Jhc2U1OCA9IGZ1bmN0aW9uIChiaWdudW0sIG1pbkRpZ2l0cykge1xuICAgIHZhciBlXzIsIF9hLCBlXzMsIF9iO1xuICAgIGlmIChtaW5EaWdpdHMgPT09IHZvaWQgMCkgeyBtaW5EaWdpdHMgPSAxOyB9XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIGJpZ251bV8xID0gX192YWx1ZXMoYmlnbnVtKSwgYmlnbnVtXzFfMSA9IGJpZ251bV8xLm5leHQoKTsgIWJpZ251bV8xXzEuZG9uZTsgYmlnbnVtXzFfMSA9IGJpZ251bV8xLm5leHQoKSkge1xuICAgICAgICAgICAgdmFyIGJ5dGUgPSBiaWdudW1fMV8xLnZhbHVlO1xuICAgICAgICAgICAgdmFyIGNhcnJ5ID0gYnl0ZTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcmVzdWx0Lmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICAgICAgdmFyIHggPSAoYmFzZTU4TWFwW3Jlc3VsdFtqXV0gPDwgOCkgKyBjYXJyeTtcbiAgICAgICAgICAgICAgICByZXN1bHRbal0gPSBiYXNlNThDaGFycy5jaGFyQ29kZUF0KHggJSA1OCk7XG4gICAgICAgICAgICAgICAgY2FycnkgPSAoeCAvIDU4KSB8IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoY2FycnkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChiYXNlNThDaGFycy5jaGFyQ29kZUF0KGNhcnJ5ICUgNTgpKTtcbiAgICAgICAgICAgICAgICBjYXJyeSA9IChjYXJyeSAvIDU4KSB8IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVfMl8xKSB7IGVfMiA9IHsgZXJyb3I6IGVfMl8xIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChiaWdudW1fMV8xICYmICFiaWdudW1fMV8xLmRvbmUgJiYgKF9hID0gYmlnbnVtXzEucmV0dXJuKSkgX2EuY2FsbChiaWdudW1fMSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlXzIpIHRocm93IGVfMi5lcnJvcjsgfVxuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBiaWdudW1fMiA9IF9fdmFsdWVzKGJpZ251bSksIGJpZ251bV8yXzEgPSBiaWdudW1fMi5uZXh0KCk7ICFiaWdudW1fMl8xLmRvbmU7IGJpZ251bV8yXzEgPSBiaWdudW1fMi5uZXh0KCkpIHtcbiAgICAgICAgICAgIHZhciBieXRlID0gYmlnbnVtXzJfMS52YWx1ZTtcbiAgICAgICAgICAgIGlmIChieXRlKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCgnMScuY2hhckNvZGVBdCgwKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVfM18xKSB7IGVfMyA9IHsgZXJyb3I6IGVfM18xIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChiaWdudW1fMl8xICYmICFiaWdudW1fMl8xLmRvbmUgJiYgKF9iID0gYmlnbnVtXzIucmV0dXJuKSkgX2IuY2FsbChiaWdudW1fMik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlXzMpIHRocm93IGVfMy5lcnJvcjsgfVxuICAgIH1cbiAgICByZXN1bHQucmV2ZXJzZSgpO1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgX19zcHJlYWQocmVzdWx0KSk7XG59O1xuLyoqIENvbnZlcnQgYW4gdW5zaWduZWQgYmFzZS02NCBudW1iZXIgaW4gYHNgIHRvIGEgYmlnbnVtICovXG5leHBvcnRzLmJhc2U2NFRvQmluYXJ5ID0gZnVuY3Rpb24gKHMpIHtcbiAgICB2YXIgbGVuID0gcy5sZW5ndGg7XG4gICAgaWYgKChsZW4gJiAzKSA9PT0gMSAmJiBzW2xlbiAtIDFdID09PSAnPScpIHtcbiAgICAgICAgbGVuIC09IDE7XG4gICAgfSAvLyBmYyBhcHBlbmRzIGFuIGV4dHJhICc9J1xuICAgIGlmICgobGVuICYgMykgIT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdiYXNlLTY0IHZhbHVlIGlzIG5vdCBwYWRkZWQgY29ycmVjdGx5Jyk7XG4gICAgfVxuICAgIHZhciBncm91cHMgPSBsZW4gPj4gMjtcbiAgICB2YXIgYnl0ZXMgPSBncm91cHMgKiAzO1xuICAgIGlmIChsZW4gPiAwICYmIHNbbGVuIC0gMV0gPT09ICc9Jykge1xuICAgICAgICBpZiAoc1tsZW4gLSAyXSA9PT0gJz0nKSB7XG4gICAgICAgICAgICBieXRlcyAtPSAyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYnl0ZXMgLT0gMTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgcmVzdWx0ID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZXMpO1xuICAgIGZvciAodmFyIGdyb3VwID0gMDsgZ3JvdXAgPCBncm91cHM7ICsrZ3JvdXApIHtcbiAgICAgICAgdmFyIGRpZ2l0MCA9IGJhc2U2NE1hcFtzLmNoYXJDb2RlQXQoZ3JvdXAgKiA0ICsgMCldO1xuICAgICAgICB2YXIgZGlnaXQxID0gYmFzZTY0TWFwW3MuY2hhckNvZGVBdChncm91cCAqIDQgKyAxKV07XG4gICAgICAgIHZhciBkaWdpdDIgPSBiYXNlNjRNYXBbcy5jaGFyQ29kZUF0KGdyb3VwICogNCArIDIpXTtcbiAgICAgICAgdmFyIGRpZ2l0MyA9IGJhc2U2NE1hcFtzLmNoYXJDb2RlQXQoZ3JvdXAgKiA0ICsgMyldO1xuICAgICAgICByZXN1bHRbZ3JvdXAgKiAzICsgMF0gPSAoZGlnaXQwIDw8IDIpIHwgKGRpZ2l0MSA+PiA0KTtcbiAgICAgICAgaWYgKGdyb3VwICogMyArIDEgPCBieXRlcykge1xuICAgICAgICAgICAgcmVzdWx0W2dyb3VwICogMyArIDFdID0gKChkaWdpdDEgJiAxNSkgPDwgNCkgfCAoZGlnaXQyID4+IDIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChncm91cCAqIDMgKyAyIDwgYnl0ZXMpIHtcbiAgICAgICAgICAgIHJlc3VsdFtncm91cCAqIDMgKyAyXSA9ICgoZGlnaXQyICYgMykgPDwgNikgfCBkaWdpdDM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG4vKiogS2V5IHR5cGVzIHRoaXMgbGlicmFyeSBzdXBwb3J0cyAqL1xudmFyIEtleVR5cGU7XG4oZnVuY3Rpb24gKEtleVR5cGUpIHtcbiAgICBLZXlUeXBlW0tleVR5cGVbXCJrMVwiXSA9IDBdID0gXCJrMVwiO1xuICAgIEtleVR5cGVbS2V5VHlwZVtcInIxXCJdID0gMV0gPSBcInIxXCI7XG4gICAgS2V5VHlwZVtLZXlUeXBlW1wid2FcIl0gPSAyXSA9IFwid2FcIjtcbn0pKEtleVR5cGUgPSBleHBvcnRzLktleVR5cGUgfHwgKGV4cG9ydHMuS2V5VHlwZSA9IHt9KSk7XG4vKiogUHVibGljIGtleSBkYXRhIHNpemUsIGV4Y2x1ZGluZyB0eXBlIGZpZWxkICovXG5leHBvcnRzLnB1YmxpY0tleURhdGFTaXplID0gMzM7XG4vKiogUHJpdmF0ZSBrZXkgZGF0YSBzaXplLCBleGNsdWRpbmcgdHlwZSBmaWVsZCAqL1xuZXhwb3J0cy5wcml2YXRlS2V5RGF0YVNpemUgPSAzMjtcbi8qKiBTaWduYXR1cmUgZGF0YSBzaXplLCBleGNsdWRpbmcgdHlwZSBmaWVsZCAqL1xuZXhwb3J0cy5zaWduYXR1cmVEYXRhU2l6ZSA9IDY1O1xudmFyIGRpZ2VzdFN1ZmZpeFJpcGVtZDE2MCA9IGZ1bmN0aW9uIChkYXRhLCBzdWZmaXgpIHtcbiAgICB2YXIgZCA9IG5ldyBVaW50OEFycmF5KGRhdGEubGVuZ3RoICsgc3VmZml4Lmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGRbaV0gPSBkYXRhW2ldO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN1ZmZpeC5sZW5ndGg7ICsraSkge1xuICAgICAgICBkW2RhdGEubGVuZ3RoICsgaV0gPSBzdWZmaXguY2hhckNvZGVBdChpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJpcGVtZDE2MChkKTtcbn07XG52YXIgc3RyaW5nVG9LZXkgPSBmdW5jdGlvbiAocywgdHlwZSwgc2l6ZSwgc3VmZml4KSB7XG4gICAgdmFyIHdob2xlID0gZXhwb3J0cy5iYXNlNThUb0JpbmFyeShzaXplID8gc2l6ZSArIDQgOiAwLCBzKTtcbiAgICB2YXIgcmVzdWx0ID0geyB0eXBlOiB0eXBlLCBkYXRhOiBuZXcgVWludDhBcnJheSh3aG9sZS5idWZmZXIsIDAsIHdob2xlLmxlbmd0aCAtIDQpIH07XG4gICAgdmFyIGRpZ2VzdCA9IG5ldyBVaW50OEFycmF5KGRpZ2VzdFN1ZmZpeFJpcGVtZDE2MChyZXN1bHQuZGF0YSwgc3VmZml4KSk7XG4gICAgaWYgKGRpZ2VzdFswXSAhPT0gd2hvbGVbd2hvbGUubGVuZ3RoIC0gNF0gfHwgZGlnZXN0WzFdICE9PSB3aG9sZVt3aG9sZS5sZW5ndGggLSAzXVxuICAgICAgICB8fCBkaWdlc3RbMl0gIT09IHdob2xlW3dob2xlLmxlbmd0aCAtIDJdIHx8IGRpZ2VzdFszXSAhPT0gd2hvbGVbd2hvbGUubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjaGVja3N1bSBkb2VzblxcJ3QgbWF0Y2gnKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIga2V5VG9TdHJpbmcgPSBmdW5jdGlvbiAoa2V5LCBzdWZmaXgsIHByZWZpeCkge1xuICAgIHZhciBkaWdlc3QgPSBuZXcgVWludDhBcnJheShkaWdlc3RTdWZmaXhSaXBlbWQxNjAoa2V5LmRhdGEsIHN1ZmZpeCkpO1xuICAgIHZhciB3aG9sZSA9IG5ldyBVaW50OEFycmF5KGtleS5kYXRhLmxlbmd0aCArIDQpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5LmRhdGEubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgd2hvbGVbaV0gPSBrZXkuZGF0YVtpXTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyArK2kpIHtcbiAgICAgICAgd2hvbGVbaSArIGtleS5kYXRhLmxlbmd0aF0gPSBkaWdlc3RbaV07XG4gICAgfVxuICAgIHJldHVybiBwcmVmaXggKyBleHBvcnRzLmJpbmFyeVRvQmFzZTU4KHdob2xlKTtcbn07XG4vKiogQ29udmVydCBrZXkgaW4gYHNgIHRvIGJpbmFyeSBmb3JtICovXG5leHBvcnRzLnN0cmluZ1RvUHVibGljS2V5ID0gZnVuY3Rpb24gKHMpIHtcbiAgICBpZiAodHlwZW9mIHMgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZXhwZWN0ZWQgc3RyaW5nIGNvbnRhaW5pbmcgcHVibGljIGtleScpO1xuICAgIH1cbiAgICBpZiAocy5zdWJzdHIoMCwgMykgPT09ICdFT1MnKSB7XG4gICAgICAgIHZhciB3aG9sZSA9IGV4cG9ydHMuYmFzZTU4VG9CaW5hcnkoZXhwb3J0cy5wdWJsaWNLZXlEYXRhU2l6ZSArIDQsIHMuc3Vic3RyKDMpKTtcbiAgICAgICAgdmFyIGtleSA9IHsgdHlwZTogS2V5VHlwZS5rMSwgZGF0YTogbmV3IFVpbnQ4QXJyYXkoZXhwb3J0cy5wdWJsaWNLZXlEYXRhU2l6ZSkgfTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBvcnRzLnB1YmxpY0tleURhdGFTaXplOyArK2kpIHtcbiAgICAgICAgICAgIGtleS5kYXRhW2ldID0gd2hvbGVbaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRpZ2VzdCA9IG5ldyBVaW50OEFycmF5KHJpcGVtZDE2MChrZXkuZGF0YSkpO1xuICAgICAgICBpZiAoZGlnZXN0WzBdICE9PSB3aG9sZVtleHBvcnRzLnB1YmxpY0tleURhdGFTaXplXSB8fCBkaWdlc3RbMV0gIT09IHdob2xlWzM0XVxuICAgICAgICAgICAgfHwgZGlnZXN0WzJdICE9PSB3aG9sZVszNV0gfHwgZGlnZXN0WzNdICE9PSB3aG9sZVszNl0pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY2hlY2tzdW0gZG9lc25cXCd0IG1hdGNoJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG4gICAgZWxzZSBpZiAocy5zdWJzdHIoMCwgNykgPT09ICdQVUJfSzFfJykge1xuICAgICAgICByZXR1cm4gc3RyaW5nVG9LZXkocy5zdWJzdHIoNyksIEtleVR5cGUuazEsIGV4cG9ydHMucHVibGljS2V5RGF0YVNpemUsICdLMScpO1xuICAgIH1cbiAgICBlbHNlIGlmIChzLnN1YnN0cigwLCA3KSA9PT0gJ1BVQl9SMV8nKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmdUb0tleShzLnN1YnN0cig3KSwgS2V5VHlwZS5yMSwgZXhwb3J0cy5wdWJsaWNLZXlEYXRhU2l6ZSwgJ1IxJyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHMuc3Vic3RyKDAsIDcpID09PSAnUFVCX1dBXycpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZ1RvS2V5KHMuc3Vic3RyKDcpLCBLZXlUeXBlLndhLCAwLCAnV0EnKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHB1YmxpYyBrZXkgZm9ybWF0Jyk7XG4gICAgfVxufTtcbi8qKiBDb252ZXJ0IHB1YmxpYyBga2V5YCB0byBsZWdhY3kgc3RyaW5nIChiYXNlLTU4KSBmb3JtICovXG5leHBvcnRzLnB1YmxpY0tleVRvTGVnYWN5U3RyaW5nID0gZnVuY3Rpb24gKGtleSkge1xuICAgIGlmIChrZXkudHlwZSA9PT0gS2V5VHlwZS5rMSAmJiBrZXkuZGF0YS5sZW5ndGggPT09IGV4cG9ydHMucHVibGljS2V5RGF0YVNpemUpIHtcbiAgICAgICAgcmV0dXJuIGtleVRvU3RyaW5nKGtleSwgJycsICdFT1MnKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoa2V5LnR5cGUgPT09IEtleVR5cGUucjEgfHwga2V5LnR5cGUgPT09IEtleVR5cGUud2EpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdLZXkgZm9ybWF0IG5vdCBzdXBwb3J0ZWQgaW4gbGVnYWN5IGNvbnZlcnNpb24nKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHB1YmxpYyBrZXkgZm9ybWF0Jyk7XG4gICAgfVxufTtcbi8qKiBDb252ZXJ0IGBrZXlgIHRvIHN0cmluZyAoYmFzZS01OCkgZm9ybSAqL1xuZXhwb3J0cy5wdWJsaWNLZXlUb1N0cmluZyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoa2V5LnR5cGUgPT09IEtleVR5cGUuazEgJiYga2V5LmRhdGEubGVuZ3RoID09PSBleHBvcnRzLnB1YmxpY0tleURhdGFTaXplKSB7XG4gICAgICAgIHJldHVybiBrZXlUb1N0cmluZyhrZXksICdLMScsICdQVUJfSzFfJyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGtleS50eXBlID09PSBLZXlUeXBlLnIxICYmIGtleS5kYXRhLmxlbmd0aCA9PT0gZXhwb3J0cy5wdWJsaWNLZXlEYXRhU2l6ZSkge1xuICAgICAgICByZXR1cm4ga2V5VG9TdHJpbmcoa2V5LCAnUjEnLCAnUFVCX1IxXycpO1xuICAgIH1cbiAgICBlbHNlIGlmIChrZXkudHlwZSA9PT0gS2V5VHlwZS53YSkge1xuICAgICAgICByZXR1cm4ga2V5VG9TdHJpbmcoa2V5LCAnV0EnLCAnUFVCX1dBXycpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnJlY29nbml6ZWQgcHVibGljIGtleSBmb3JtYXQnKTtcbiAgICB9XG59O1xuLyoqIElmIGEga2V5IGlzIGluIHRoZSBsZWdhY3kgZm9ybWF0IChgRU9TYCBwcmVmaXgpLCB0aGVuIGNvbnZlcnQgaXQgdG8gdGhlIG5ldyBmb3JtYXQgKGBQVUJfSzFfYCkuXG4gKiBMZWF2ZXMgb3RoZXIgZm9ybWF0cyB1bnRvdWNoZWRcbiAqL1xuZXhwb3J0cy5jb252ZXJ0TGVnYWN5UHVibGljS2V5ID0gZnVuY3Rpb24gKHMpIHtcbiAgICBpZiAocy5zdWJzdHIoMCwgMykgPT09ICdFT1MnKSB7XG4gICAgICAgIHJldHVybiBleHBvcnRzLnB1YmxpY0tleVRvU3RyaW5nKGV4cG9ydHMuc3RyaW5nVG9QdWJsaWNLZXkocykpO1xuICAgIH1cbiAgICByZXR1cm4gcztcbn07XG4vKiogSWYgYSBrZXkgaXMgaW4gdGhlIGxlZ2FjeSBmb3JtYXQgKGBFT1NgIHByZWZpeCksIHRoZW4gY29udmVydCBpdCB0byB0aGUgbmV3IGZvcm1hdCAoYFBVQl9LMV9gKS5cbiAqIExlYXZlcyBvdGhlciBmb3JtYXRzIHVudG91Y2hlZFxuICovXG5leHBvcnRzLmNvbnZlcnRMZWdhY3lQdWJsaWNLZXlzID0gZnVuY3Rpb24gKGtleXMpIHtcbiAgICByZXR1cm4ga2V5cy5tYXAoZXhwb3J0cy5jb252ZXJ0TGVnYWN5UHVibGljS2V5KTtcbn07XG4vKiogQ29udmVydCBrZXkgaW4gYHNgIHRvIGJpbmFyeSBmb3JtICovXG5leHBvcnRzLnN0cmluZ1RvUHJpdmF0ZUtleSA9IGZ1bmN0aW9uIChzKSB7XG4gICAgaWYgKHR5cGVvZiBzICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2V4cGVjdGVkIHN0cmluZyBjb250YWluaW5nIHByaXZhdGUga2V5Jyk7XG4gICAgfVxuICAgIGlmIChzLnN1YnN0cigwLCA3KSA9PT0gJ1BWVF9SMV8nKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmdUb0tleShzLnN1YnN0cig3KSwgS2V5VHlwZS5yMSwgZXhwb3J0cy5wcml2YXRlS2V5RGF0YVNpemUsICdSMScpO1xuICAgIH1cbiAgICBlbHNlIGlmIChzLnN1YnN0cigwLCA3KSA9PT0gJ1BWVF9LMV8nKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmdUb0tleShzLnN1YnN0cig3KSwgS2V5VHlwZS5rMSwgZXhwb3J0cy5wcml2YXRlS2V5RGF0YVNpemUsICdLMScpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gdG9kbzogVmVyaWZ5IGNoZWNrc3VtOiBzaGEyNTYoc2hhMjU2KGtleS5kYXRhKSkuXG4gICAgICAgIC8vICAgICAgIE5vdCBjcml0aWNhbCBzaW5jZSBhIGJhZCBrZXkgd2lsbCBmYWlsIHRvIHByb2R1Y2UgYVxuICAgICAgICAvLyAgICAgICB2YWxpZCBzaWduYXR1cmUgYW55d2F5LlxuICAgICAgICB2YXIgd2hvbGUgPSBleHBvcnRzLmJhc2U1OFRvQmluYXJ5KGV4cG9ydHMucHJpdmF0ZUtleURhdGFTaXplICsgNSwgcyk7XG4gICAgICAgIHZhciBrZXkgPSB7IHR5cGU6IEtleVR5cGUuazEsIGRhdGE6IG5ldyBVaW50OEFycmF5KGV4cG9ydHMucHJpdmF0ZUtleURhdGFTaXplKSB9O1xuICAgICAgICBpZiAod2hvbGVbMF0gIT09IDB4ODApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHByaXZhdGUga2V5IHR5cGUnKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4cG9ydHMucHJpdmF0ZUtleURhdGFTaXplOyArK2kpIHtcbiAgICAgICAgICAgIGtleS5kYXRhW2ldID0gd2hvbGVbaSArIDFdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBrZXk7XG4gICAgfVxufTtcbi8qKiBDb252ZXJ0IHByaXZhdGUgYGtleWAgdG8gbGVnYWN5IHN0cmluZyAoYmFzZS01OCkgZm9ybSAqL1xuZXhwb3J0cy5wcml2YXRlS2V5VG9MZWdhY3lTdHJpbmcgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKGtleS50eXBlID09PSBLZXlUeXBlLmsxICYmIGtleS5kYXRhLmxlbmd0aCA9PT0gZXhwb3J0cy5wcml2YXRlS2V5RGF0YVNpemUpIHtcbiAgICAgICAgdmFyIHdob2xlXzEgPSBbXTtcbiAgICAgICAgd2hvbGVfMS5wdXNoKDEyOCk7XG4gICAgICAgIGtleS5kYXRhLmZvckVhY2goZnVuY3Rpb24gKGJ5dGUpIHsgcmV0dXJuIHdob2xlXzEucHVzaChieXRlKTsgfSk7XG4gICAgICAgIHZhciBkaWdlc3QgPSBuZXcgVWludDhBcnJheShoYXNoX2pzXzEuc2hhMjU2KCkudXBkYXRlKGhhc2hfanNfMS5zaGEyNTYoKS51cGRhdGUod2hvbGVfMSkuZGlnZXN0KCkpLmRpZ2VzdCgpKTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KGV4cG9ydHMucHJpdmF0ZUtleURhdGFTaXplICsgNSk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd2hvbGVfMS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0W2ldID0gd2hvbGVfMVtpXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0W2kgKyB3aG9sZV8xLmxlbmd0aF0gPSBkaWdlc3RbaV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV4cG9ydHMuYmluYXJ5VG9CYXNlNTgocmVzdWx0KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoa2V5LnR5cGUgPT09IEtleVR5cGUucjEgfHwga2V5LnR5cGUgPT09IEtleVR5cGUud2EpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdLZXkgZm9ybWF0IG5vdCBzdXBwb3J0ZWQgaW4gbGVnYWN5IGNvbnZlcnNpb24nKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHB1YmxpYyBrZXkgZm9ybWF0Jyk7XG4gICAgfVxufTtcbi8qKiBDb252ZXJ0IGBrZXlgIHRvIHN0cmluZyAoYmFzZS01OCkgZm9ybSAqL1xuZXhwb3J0cy5wcml2YXRlS2V5VG9TdHJpbmcgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKGtleS50eXBlID09PSBLZXlUeXBlLnIxKSB7XG4gICAgICAgIHJldHVybiBrZXlUb1N0cmluZyhrZXksICdSMScsICdQVlRfUjFfJyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGtleS50eXBlID09PSBLZXlUeXBlLmsxKSB7XG4gICAgICAgIHJldHVybiBrZXlUb1N0cmluZyhrZXksICdLMScsICdQVlRfSzFfJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VucmVjb2duaXplZCBwcml2YXRlIGtleSBmb3JtYXQnKTtcbiAgICB9XG59O1xuLyoqIENvbnZlcnQga2V5IGluIGBzYCB0byBiaW5hcnkgZm9ybSAqL1xuZXhwb3J0cy5zdHJpbmdUb1NpZ25hdHVyZSA9IGZ1bmN0aW9uIChzKSB7XG4gICAgaWYgKHR5cGVvZiBzICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2V4cGVjdGVkIHN0cmluZyBjb250YWluaW5nIHNpZ25hdHVyZScpO1xuICAgIH1cbiAgICBpZiAocy5zdWJzdHIoMCwgNykgPT09ICdTSUdfSzFfJykge1xuICAgICAgICByZXR1cm4gc3RyaW5nVG9LZXkocy5zdWJzdHIoNyksIEtleVR5cGUuazEsIGV4cG9ydHMuc2lnbmF0dXJlRGF0YVNpemUsICdLMScpO1xuICAgIH1cbiAgICBlbHNlIGlmIChzLnN1YnN0cigwLCA3KSA9PT0gJ1NJR19SMV8nKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmdUb0tleShzLnN1YnN0cig3KSwgS2V5VHlwZS5yMSwgZXhwb3J0cy5zaWduYXR1cmVEYXRhU2l6ZSwgJ1IxJyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHMuc3Vic3RyKDAsIDcpID09PSAnU0lHX1dBXycpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZ1RvS2V5KHMuc3Vic3RyKDcpLCBLZXlUeXBlLndhLCAwLCAnV0EnKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHNpZ25hdHVyZSBmb3JtYXQnKTtcbiAgICB9XG59O1xuLyoqIENvbnZlcnQgYHNpZ25hdHVyZWAgdG8gc3RyaW5nIChiYXNlLTU4KSBmb3JtICovXG5leHBvcnRzLnNpZ25hdHVyZVRvU3RyaW5nID0gZnVuY3Rpb24gKHNpZ25hdHVyZSkge1xuICAgIGlmIChzaWduYXR1cmUudHlwZSA9PT0gS2V5VHlwZS5rMSkge1xuICAgICAgICByZXR1cm4ga2V5VG9TdHJpbmcoc2lnbmF0dXJlLCAnSzEnLCAnU0lHX0sxXycpO1xuICAgIH1cbiAgICBlbHNlIGlmIChzaWduYXR1cmUudHlwZSA9PT0gS2V5VHlwZS5yMSkge1xuICAgICAgICByZXR1cm4ga2V5VG9TdHJpbmcoc2lnbmF0dXJlLCAnUjEnLCAnU0lHX1IxXycpO1xuICAgIH1cbiAgICBlbHNlIGlmIChzaWduYXR1cmUudHlwZSA9PT0gS2V5VHlwZS53YSkge1xuICAgICAgICByZXR1cm4ga2V5VG9TdHJpbmcoc2lnbmF0dXJlLCAnV0EnLCAnU0lHX1dBXycpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnJlY29nbml6ZWQgc2lnbmF0dXJlIGZvcm1hdCcpO1xuICAgIH1cbn07XG4iLCIvLyBodHRwczovL2dpc3QuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3dsemxhMDAwL2JhYzgzZGY2ZDNjNTE5MTZjNGRkMGJjOTQ3ZTQ2OTQ3L3Jhdy83ZWUzNDYyYjA5NWFiMjI1ODBkZGFmMTkxZjQ0YTU5MGRhNmZlMzNiL1JJUEVNRC0xNjAuanNcblxuLypcblx0UklQRU1ELTE2MC5qc1xuXG5cdFx0ZGV2ZWxvcGVkXG5cdFx0XHRieSBLLiAoaHR0cHM6Ly9naXRodWIuY29tL3dsemxhMDAwKVxuXHRcdFx0b24gRGVjZW1iZXIgMjctMjksIDIwMTcsXG5cblx0XHRsaWNlbnNlZCB1bmRlclxuXG5cblx0XHR0aGUgTUlUIGxpY2Vuc2VcblxuXHRcdENvcHlyaWdodCAoYykgMjAxNyBLLlxuXG5cdFx0IFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG5cdFx0b2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cblx0XHRmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXRcblx0XHRyZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSxcblx0XHRjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Jcblx0XHRzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZVxuXHRcdFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nXG5cdFx0Y29uZGl0aW9uczpcblxuXHRcdCBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuXHRcdGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5cdFx0IFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsXG5cdFx0RVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTXG5cdFx0T0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkRcblx0XHROT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVFxuXHRcdEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLFxuXHRcdFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuXHRcdEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1Jcblx0XHRPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbmNsYXNzIFJJUEVNRDE2MFxue1xuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIC8vIGh0dHBzOi8vd2ViY2FjaGUuZ29vZ2xldXNlcmNvbnRlbnQuY29tL3NlYXJjaD9xPWNhY2hlOkNuTE9nb2xUSFlFSjpodHRwczovL3d3dy5jb3NpYy5lc2F0Lmt1bGV1dmVuLmJlL3B1YmxpY2F0aW9ucy9hcnRpY2xlLTMxNy5wZGZcbiAgICAgICAgLy8gaHR0cDovL3Nob2RoZ2FuZ2EuaW5mbGlibmV0LmFjLmluL2JpdHN0cmVhbS8xMDYwMy8yMjk3OC8xMy8xM19hcHBlbmRpeC5wZGZcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0X25fcGFkX2J5dGVzKG1lc3NhZ2Vfc2l6ZSAvKiBpbiBieXRlcywgMSBieXRlIGlzIDggYml0cy4gKi8pXG4gICAge1xuICAgICAgICAvLyAgT2J0YWluIHRoZSBudW1iZXIgb2YgYnl0ZXMgbmVlZGVkIHRvIHBhZCB0aGUgbWVzc2FnZS5cbiAgICAgICAgLy8gSXQgZG9lcyBub3QgY29udGFpbiB0aGUgc2l6ZSBvZiB0aGUgbWVzc2FnZSBzaXplIGluZm9ybWF0aW9uLlxuICAgICAgICAvKlxuXHRcdFx0aHR0cHM6Ly93ZWJjYWNoZS5nb29nbGV1c2VyY29udGVudC5jb20vc2VhcmNoP3E9Y2FjaGU6Q25MT2dvbFRIWUVKOmh0dHBzOi8vd3d3LmNvc2ljLmVzYXQua3VsZXV2ZW4uYmUvcHVibGljYXRpb25zL2FydGljbGUtMzE3LnBkZlxuXG5cdFx0XHRUaGUgQ3J5cHRvZ3JhcGhpYyBIYXNoIEZ1bmN0aW9uIFJJUEVNRC0xNjBcblxuXHRcdFx0d3JpdHRlbiBieVxuXHRcdFx0XHRCYXJ0IFByZW5lZWwsXG5cdFx0XHRcdEhhbnMgRG9iYmVydGluLFxuXHRcdFx0XHRBbnRvb24gQm9zc2VsYWVyc1xuXHRcdFx0aW5cblx0XHRcdFx0MTk5Ny5cblxuXHRcdFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdFx0wqc1ICAgICBEZXNjcmlwdGlvbiBvZiBSSVBFTUQtMTYwXG5cblx0XHRcdC4uLi4uLlxuXG5cdFx0XHQgSW4gb3JkZXIgdG8gZ3VhcmFudGVlIHRoYXQgdGhlIHRvdGFsIGlucHV0IHNpemUgaXMgYVxuXHRcdFx0bXVsdGlwbGUgb2YgNTEyIGJpdHMsIHRoZSBpbnB1dCBpcyBwYWRkZWQgaW4gdGhlIHNhbWVcblx0XHRcdHdheSBhcyBmb3IgYWxsIHRoZSBtZW1iZXJzIG9mIHRoZSBNRDQtZmFtaWx5OiBvbmVcblx0XHRcdGFwcGVuZHMgYSBzaW5nbGUgMSBmb2xsb3dlZCBieSBhIHN0cmluZyBvZiAwcyAodGhlXG5cdFx0XHRudW1iZXIgb2YgMHMgbGllcyBiZXR3ZWVuIDAgYW5kIDUxMSk7IHRoZSBsYXN0IDY0IGJpdHNcblx0XHRcdG9mIHRoZSBleHRlbmRlZCBpbnB1dCBjb250YWluIHRoZSBiaW5hcnkgcmVwcmVzZW50YXRpb25cblx0XHRcdG9mIHRoZSBpbnB1dCBzaXplIGluIGJpdHMsIGxlYXN0IHNpZ25pZmljYW50IGJ5dGUgZmlyc3QuXG5cdFx0Ki9cbiAgICAgICAgLypcblx0XHRcdGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvcmZjL3JmYzExODYudHh0XG5cblx0XHRcdFJGQyAxMTg2OiBNRDQgTWVzc2FnZSBEaWdlc3QgQWxnb3JpdGhtLlxuXG5cdFx0XHR3cml0dGVuIGJ5XG5cdFx0XHRcdFJvbmFsZCBMaW5uIFJpdmVzdFxuXHRcdFx0aW5cblx0XHRcdFx0T2N0b2JlciAxOTkwLlxuXG5cdFx0XHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0XHTCpzMgICAgIE1ENCBBbGdvcml0aG0gRGVzY3JpcHRpb25cblxuXHRcdFx0Li4uLi4uXG5cblx0XHRcdFN0ZXAgMS4gQXBwZW5kIHBhZGRpbmcgYml0c1xuXG5cdFx0XHQgVGhlIG1lc3NhZ2UgaXMgXCJwYWRkZWRcIiAoZXh0ZW5kZWQpIHNvIHRoYXQgaXRzIGxlbmd0aFxuXHRcdFx0KGluIGJpdHMpIGlzIGNvbmdydWVudCB0byA0NDgsIG1vZHVsbyA1MTIuIFRoYXQgaXMsIHRoZVxuXHRcdFx0bWVzc2FnZSBpcyBleHRlbmRlZCBzbyB0aGF0IGl0IGlzIGp1c3QgNjQgYml0cyBzaHkgb2Zcblx0XHRcdGJlaW5nIGEgbXVsdGlwbGUgb2YgNTEyIGJpdHMgbG9uZy4gUGFkZGluZyBpcyBhbHdheXNcblx0XHRcdHBlcmZvcm1lZCwgZXZlbiBpZiB0aGUgbGVuZ3RoIG9mIHRoZSBtZXNzYWdlIGlzIGFscmVhZHlcblx0XHRcdGNvbmdydWVudCB0byA0NDgsIG1vZHVsbyA1MTIgKGluIHdoaWNoIGNhc2UgNTEyIGJpdHMgb2Zcblx0XHRcdHBhZGRpbmcgYXJlIGFkZGVkKS5cblxuXHRcdFx0IFBhZGRpbmcgaXMgcGVyZm9ybWVkIGFzIGZvbGxvd3M6IGEgc2luZ2xlIFwiMVwiIGJpdCBpc1xuXHRcdFx0YXBwZW5kZWQgdG8gdGhlIG1lc3NhZ2UsIGFuZCB0aGVuIGVub3VnaCB6ZXJvIGJpdHMgYXJlXG5cdFx0XHRhcHBlbmRlZCBzbyB0aGF0IHRoZSBsZW5ndGggaW4gYml0cyBvZiB0aGUgcGFkZGVkXG5cdFx0XHRtZXNzYWdlIGJlY29tZXMgY29uZ3J1ZW50IHRvIDQ0OCwgbW9kdWxvIDUxMi5cblxuXHRcdFx0U3RlcCAyLiBBcHBlbmQgbGVuZ3RoXG5cblx0XHRcdCBBIDY0LWJpdCByZXByZXNlbnRhdGlvbiBvZiBiICh0aGUgbGVuZ3RoIG9mIHRoZSBtZXNzYWdlXG5cdFx0XHRiZWZvcmUgdGhlIHBhZGRpbmcgYml0cyB3ZXJlIGFkZGVkKSBpcyBhcHBlbmRlZCB0byB0aGVcblx0XHRcdHJlc3VsdCBvZiB0aGUgcHJldmlvdXMgc3RlcC4gSW4gdGhlIHVubGlrZWx5IGV2ZW50IHRoYXRcblx0XHRcdGIgaXMgZ3JlYXRlciB0aGFuIDJeNjQsIHRoZW4gb25seSB0aGUgbG93LW9yZGVyIDY0IGJpdHNcblx0XHRcdG9mIGIgYXJlIHVzZWQuIChUaGVzZSBiaXRzIGFyZSBhcHBlbmRlZCBhcyB0d28gMzItYml0XG5cdFx0XHR3b3JkcyBhbmQgYXBwZW5kZWQgbG93LW9yZGVyIHdvcmQgZmlyc3QgaW4gYWNjb3JkYW5jZVxuXHRcdFx0d2l0aCB0aGUgcHJldmlvdXMgY29udmVudGlvbnMuKVxuXG5cdFx0XHQgQXQgdGhpcyBwb2ludCB0aGUgcmVzdWx0aW5nIG1lc3NhZ2UgKGFmdGVyIHBhZGRpbmcgd2l0aFxuXHRcdFx0Yml0cyBhbmQgd2l0aCBiKSBoYXMgYSBsZW5ndGggdGhhdCBpcyBhbiBleGFjdCBtdWx0aXBsZVxuXHRcdFx0b2YgNTEyIGJpdHMuIEVxdWl2YWxlbnRseSwgdGhpcyBtZXNzYWdlIGhhcyBhIGxlbmd0aFxuXHRcdFx0dGhhdCBpcyBhbiBleGFjdCBtdWx0aXBsZSBvZiAxNiAoMzItYml0KSB3b3Jkcy4gTGV0XG5cdFx0XHRNWzAgLi4uIE4tMV0gZGVub3RlIHRoZSB3b3JkcyBvZiB0aGUgcmVzdWx0aW5nIG1lc3NhZ2UsXG5cdFx0XHR3aGVyZSBOIGlzIGEgbXVsdGlwbGUgb2YgMTYuXG5cdFx0Ki9cbiAgICAgICAgLy8gaHR0cHM6Ly9jcnlwdG8uc3RhY2tleGNoYW5nZS5jb20vYS8zMjQwNy81NDU2OFxuICAgICAgICAvKlxuXHRcdFx0RXhhbXBsZSBjYXNlICAjIDFcblx0XHRcdFx0WzAgYml0OiBtZXNzYWdlLl1cblx0XHRcdFx0WzEgYml0OiAxLl1cblx0XHRcdFx0WzQ0NyBiaXRzOiAwLl1cblx0XHRcdFx0WzY0IGJpdHM6IG1lc3NhZ2Ugc2l6ZSBpbmZvcm1hdGlvbi5dXG5cblx0XHRcdEV4YW1wbGUgY2FzZSAgIyAyXG5cdFx0XHRcdFs1MTItYml0czogbWVzc2FnZV1cblx0XHRcdFx0WzEgYml0OiAxLl1cblx0XHRcdFx0WzQ0NyBiaXRzOiAwLl1cblx0XHRcdFx0WzY0IGJpdHM6IG1lc3NhZ2Ugc2l6ZSBpbmZvcm1hdGlvbi5dXG5cblx0XHRcdEV4YW1wbGUgY2FzZSAgIyAzXG5cdFx0XHRcdFsoNTEyIC0gNjQgPSA0NDgpIGJpdHM6IG1lc3NhZ2UuXVxuXHRcdFx0XHRbMSBiaXQ6IDEuXVxuXHRcdFx0XHRbNTExIGJpdHM6IDAuXVxuXHRcdFx0XHRbNjQgYml0czogbWVzc2FnZSBzaXplIGluZm9ybWF0aW9uLl1cblxuXHRcdFx0RXhhbXBsZSBjYXNlICAjIDRcblx0XHRcdFx0Wyg1MTIgLSA2NSA9IDQ0NykgYml0czogbWVzc2FnZS5dXG5cdFx0XHRcdFsxIGJpdDogMS5dXG5cdFx0XHRcdFswIGJpdDogMC5dXG5cdFx0XHRcdFs2NCBiaXRzOiBtZXNzYWdlIHNpemUgaW5mb3JtYXRpb24uXVxuXHRcdCovXG4gICAgICAgIC8vIFRoZSBudW1iZXIgb2YgcGFkZGluZyB6ZXJvIGJpdHM6XG4gICAgICAgIC8vICAgICAgNTExIC0gW3sobWVzc2FnZSBzaXplIGluIGJpdHMpICsgNjR9IChtb2QgNTEyKV1cbiAgICAgICAgcmV0dXJuIDY0IC0gKChtZXNzYWdlX3NpemUgKyA4KSAmIDBiMDAxMTExMTEgLyogNjMgKi8pO1xuICAgIH1cbiAgICBzdGF0aWMgcGFkKG1lc3NhZ2UgLyogQW4gQXJyYXlCdWZmZXIuICovKVxuICAgIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZV9zaXplID0gbWVzc2FnZS5ieXRlTGVuZ3RoO1xuICAgICAgICBjb25zdCBuX3BhZCA9IFJJUEVNRDE2MC5nZXRfbl9wYWRfYnl0ZXMobWVzc2FnZV9zaXplKTtcblxuICAgICAgICAvLyAgYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYCBpcyAoKDIgKiogNTMpIC0gMSkgYW5kXG4gICAgICAgIC8vIGJpdHdpc2Ugb3BlcmF0aW9uIGluIEphdmFzY3JpcHQgaXMgZG9uZSBvbiAzMi1iaXRzIG9wZXJhbmRzLlxuICAgICAgICBjb25zdCBkaXZtb2QgPSAoZGl2aWRlbmQsIGRpdmlzb3IpID0+IFtcbiAgICAgICAgICAgIE1hdGguZmxvb3IoZGl2aWRlbmQgLyBkaXZpc29yKSxcbiAgICAgICAgICAgIGRpdmlkZW5kICUgZGl2aXNvclxuICAgICAgICBdO1xuICAgICAgICAvKlxuVG8gc2hpZnRcblxuICAgMDAwMDAwMDAgMDAwPz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0IG9cbiAgIDAwMDAwMDAwID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/MDAwXG5cbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbk1ldGhvZCAjMVxuXG4gICAgMDAwMDAwMDAgMDAwPz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/XG4gICBbMDAwMDAwMDAgMDAwQUFBQUEgQUFBQUFBQUEgQUFBQUFBQUFdICg8QT4gY2FwdHVyZWQpXG4gICBbMDAwMDAwMDAgQUFBQUFBQUEgQUFBQUFBQUEgQUFBQUEwMDBdICg8QT4gc2hpZnRlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAoPEI+IGNhcHR1cmVkKSBbQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkJCQkJdXG4gICAgICAgICAgICAgICAgICAgICAoPEI+IHNoaWZ0ZWQpIFtCQkJdW0JCQkJCQkJCIEJCQkJCQkJCIEJCQkJCQkJCIEJCQkJCMDAwXVxuICAgWzAwMDAwMDAwIEFBQUFBQUFBIEFBQUFBQUFBIEFBQUFBQkJCXSAoPEE+ICYgPEJfMj4gbWVyZ2VkKVxuICAgWzAwMDAwMDAwIEFBQUFBQUFBIEFBQUFBQUFBIEFBQUFBQkJCXVtCQkJCQkJCQiBCQkJCQkJCQiBCQkJCQkJCQiBCQkJCQjAwMF1cbiAgICAwMDAwMDAwMCA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyAgPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8wMDBcblxuXHRcdGNvbnN0IHVpbnQzMl9tYXhfcGx1c18xID0gMHgxMDAwMDAwMDA7IC8vICgyICoqIDMyKVxuXHRcdGNvbnN0IFtcblx0XHRcdG1zZ19ieXRlX3NpemVfbW9zdCwgLy8gVmFsdWUgcmFuZ2UgWzAsICgyICoqIDIxKSAtIDFdLlxuXHRcdFx0bXNnX2J5dGVfc2l6ZV9sZWFzdCAvLyBWYWx1ZSByYW5nZSBbMCwgKDIgKiogMzIpIC0gMV0uXG5cdFx0XSA9IGRpdm1vZChtZXNzYWdlX3NpemUsIHVpbnQzMl9tYXhfcGx1c18xKTtcblx0XHRjb25zdCBbXG5cdFx0XHRjYXJyeSwgLy8gVmFsdWUgcmFuZ2UgWzAsIDddLlxuXHRcdFx0bXNnX2JpdF9zaXplX2xlYXN0IC8vIFZhbHVlIHJhbmdlIFswLCAoMiAqKiAzMikgLSA4XS5cblx0XHRdID0gZGl2bW9kKG1lc3NhZ2VfYnl0ZV9zaXplX2xlYXN0ICogOCwgdWludDMyX21heF9wbHVzXzEpO1xuXHRcdGNvbnN0IG1lc3NhZ2VfYml0X3NpemVfbW9zdCA9IG1lc3NhZ2VfYnl0ZV9zaXplX21vc3QgKiA4XG5cdFx0XHQrIGNhcnJ5OyAvLyBWYWx1ZSByYW5nZSBbMCwgKDIgKiogMjQpIC0gMV0uXG5cbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbk1ldGhvZCAjMlxuICAgIDAwMDAwMDAwIDAwMD8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ICA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/P1xuICAgICAgWzAwMDAwIDAwMEFBQUFBIEFBQUFBQUFBIEFBQUFBQUFBICBBQUFdICg8QT4gY2FwdHVyZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgKDxCPiBjYXB0dXJlZCkgWzAwMEJCQkJCIEJCQkJCQkJCIEJCQkJCQkJCIEJCQkJCQkJCXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAoPEI+IHNoaWZ0ZWQpIFtCQkJCQkJCQiBCQkJCQkJCQiBCQkJCQkJCQiBCQkJCQjAwMF1cbiAgIFswMDAwMDAwMCBBQUFBQUFBQSBBQUFBQUFBQSBBQUFBQUFBQV1bQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkIwMDBdXG4gICAgMDAwMDAwMDAgPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/MDAwXG5cblx0XHQqL1xuICAgICAgICBjb25zdCBbXG4gICAgICAgICAgICBtc2dfYml0X3NpemVfbW9zdCxcbiAgICAgICAgICAgIG1zZ19iaXRfc2l6ZV9sZWFzdFxuICAgICAgICBdID0gZGl2bW9kKG1lc3NhZ2Vfc2l6ZSwgNTM2ODcwOTEyIC8qICgyICoqIDI5KSAqLylcbiAgICAgICAgICAgIC5tYXAoKHgsIGluZGV4KSA9PiAoaW5kZXggPyAoeCAqIDgpIDogeCkpO1xuXG4gICAgICAgIC8vIGBBcnJheUJ1ZmZlci50cmFuc2ZlcigpYCBpcyBub3Qgc3VwcG9ydGVkLlxuICAgICAgICBjb25zdCBwYWRkZWQgPSBuZXcgVWludDhBcnJheShtZXNzYWdlX3NpemUgKyBuX3BhZCArIDgpO1xuICAgICAgICBwYWRkZWQuc2V0KG5ldyBVaW50OEFycmF5KG1lc3NhZ2UpLCAwKTtcbiAgICAgICAgY29uc3QgZGF0YV92aWV3ID0gbmV3IERhdGFWaWV3KHBhZGRlZC5idWZmZXIpO1xuICAgICAgICBkYXRhX3ZpZXcuc2V0VWludDgobWVzc2FnZV9zaXplLCAwYjEwMDAwMDAwKTtcbiAgICAgICAgZGF0YV92aWV3LnNldFVpbnQzMihcbiAgICAgICAgICAgIG1lc3NhZ2Vfc2l6ZSArIG5fcGFkLFxuICAgICAgICAgICAgbXNnX2JpdF9zaXplX2xlYXN0LFxuICAgICAgICAgICAgdHJ1ZSAvLyBMaXR0bGUtZW5kaWFuXG4gICAgICAgICk7XG4gICAgICAgIGRhdGFfdmlldy5zZXRVaW50MzIoXG4gICAgICAgICAgICBtZXNzYWdlX3NpemUgKyBuX3BhZCArIDQsXG4gICAgICAgICAgICBtc2dfYml0X3NpemVfbW9zdCxcbiAgICAgICAgICAgIHRydWUgLy8gTGl0dGxlLWVuZGlhblxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBwYWRkZWQuYnVmZmVyO1xuICAgIH1cblxuICAgIHN0YXRpYyBmKGosIHgsIHksIHopXG4gICAge1xuICAgICAgICBpZigwIDw9IGogJiYgaiA8PSAxNSlcbiAgICAgICAgeyAvLyBFeGNsdXNpdmUtT1JcbiAgICAgICAgICAgIHJldHVybiB4IF4geSBeIHo7XG4gICAgICAgIH1cbiAgICAgICAgaWYoMTYgPD0gaiAmJiBqIDw9IDMxKVxuICAgICAgICB7IC8vIE11bHRpcGxleGluZyAobXV4aW5nKVxuICAgICAgICAgICAgcmV0dXJuICh4ICYgeSkgfCAofnggJiB6KTtcbiAgICAgICAgfVxuICAgICAgICBpZigzMiA8PSBqICYmIGogPD0gNDcpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiAoeCB8IH55KSBeIHo7XG4gICAgICAgIH1cbiAgICAgICAgaWYoNDggPD0gaiAmJiBqIDw9IDYzKVxuICAgICAgICB7IC8vIE11bHRpcGxleGluZyAobXV4aW5nKVxuICAgICAgICAgICAgcmV0dXJuICh4ICYgeikgfCAoeSAmIH56KTtcbiAgICAgICAgfVxuICAgICAgICBpZig2NCA8PSBqICYmIGogPD0gNzkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB4IF4gKHkgfCB+eik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIEsoailcbiAgICB7XG4gICAgICAgIGlmKDAgPD0gaiAmJiBqIDw9IDE1KVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gMHgwMDAwMDAwMDtcbiAgICAgICAgfVxuICAgICAgICBpZigxNiA8PSBqICYmIGogPD0gMzEpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIE1hdGguZmxvb3IoKDIgKiogMzApICogTWF0aC5TUVJUMilcbiAgICAgICAgICAgIHJldHVybiAweDVBODI3OTk5O1xuICAgICAgICB9XG4gICAgICAgIGlmKDMyIDw9IGogJiYgaiA8PSA0NylcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gTWF0aC5mbG9vcigoMiAqKiAzMCkgKiBNYXRoLnNxcnQoMykpXG4gICAgICAgICAgICByZXR1cm4gMHg2RUQ5RUJBMTtcbiAgICAgICAgfVxuICAgICAgICBpZig0OCA8PSBqICYmIGogPD0gNjMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIE1hdGguZmxvb3IoKDIgKiogMzApICogTWF0aC5zcXJ0KDUpKVxuICAgICAgICAgICAgcmV0dXJuIDB4OEYxQkJDREM7XG4gICAgICAgIH1cbiAgICAgICAgaWYoNjQgPD0gaiAmJiBqIDw9IDc5KVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBNYXRoLmZsb29yKCgyICoqIDMwKSAqIE1hdGguc3FydCg3KSlcbiAgICAgICAgICAgIHJldHVybiAweEE5NTNGRDRFO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBLUChqKSAvLyBLJ1xuICAgIHtcbiAgICAgICAgaWYoMCA8PSBqICYmIGogPD0gMTUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIE1hdGguZmxvb3IoKDIgKiogMzApICogTWF0aC5jYnJ0KDIpKVxuICAgICAgICAgICAgcmV0dXJuIDB4NTBBMjhCRTY7XG4gICAgICAgIH1cbiAgICAgICAgaWYoMTYgPD0gaiAmJiBqIDw9IDMxKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBNYXRoLmZsb29yKCgyICoqIDMwKSAqIE1hdGguY2JydCgzKSlcbiAgICAgICAgICAgIHJldHVybiAweDVDNEREMTI0O1xuICAgICAgICB9XG4gICAgICAgIGlmKDMyIDw9IGogJiYgaiA8PSA0NylcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gTWF0aC5mbG9vcigoMiAqKiAzMCkgKiBNYXRoLmNicnQoNSkpXG4gICAgICAgICAgICByZXR1cm4gMHg2RDcwM0VGMztcbiAgICAgICAgfVxuICAgICAgICBpZig0OCA8PSBqICYmIGogPD0gNjMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIE1hdGguZmxvb3IoKDIgKiogMzApICogTWF0aC5jYnJ0KDcpKVxuICAgICAgICAgICAgcmV0dXJuIDB4N0E2RDc2RTk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoNjQgPD0gaiAmJiBqIDw9IDc5KVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gMHgwMDAwMDAwMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgYWRkX21vZHVsbzMyKC8qIC4uLi4uLiAqLylcbiAgICB7XG4gICAgICAgIC8vIDEuICBNb2R1bG8gYWRkaXRpb24gKGFkZGl0aW9uIG1vZHVsbykgaXMgYXNzb2NpYXRpdmUuXG4gICAgICAgIC8vICAgIGh0dHBzOi8vcHJvb2Z3aWtpLm9yZy93aWtpL01vZHVsb19BZGRpdGlvbl9pc19Bc3NvY2lhdGl2ZVxuIFx0XHQvLyAyLiAgQml0d2lzZSBvcGVyYXRpb24gaW4gSmF2YXNjcmlwdFxuICAgICAgICAvLyAgICBpcyBkb25lIG9uIDMyLWJpdHMgb3BlcmFuZHNcbiAgICAgICAgLy8gICAgYW5kIHJlc3VsdHMgaW4gYSAzMi1iaXRzIHZhbHVlLlxuICAgICAgICByZXR1cm4gQXJyYXlcbiAgICAgICAgICAgIC5mcm9tKGFyZ3VtZW50cylcbiAgICAgICAgICAgIC5yZWR1Y2UoKGEsIGIpID0+IChhICsgYiksIDApIHwgMDtcbiAgICB9XG4gICAgc3RhdGljIHJvbDMyKHZhbHVlLCBjb3VudClcbiAgICB7IC8vIEN5Y2xpYyBsZWZ0IHNoaWZ0IChyb3RhdGUpIG9uIDMyLWJpdHMgdmFsdWUuXG4gICAgICAgIHJldHVybiAodmFsdWUgPDwgY291bnQpIHwgKHZhbHVlID4+PiAoMzIgLSBjb3VudCkpO1xuICAgIH1cbiAgICBzdGF0aWMgaGFzaChtZXNzYWdlIC8qIEFuIEFycmF5QnVmZmVyLiAqLylcbiAgICB7XG4gICAgICAgIC8vIC8vLy8vLy8vICAgICAgIFBhZGRpbmcgICAgICAgLy8vLy8vLy8vL1xuXG4gICAgICAgIC8vIFRoZSBwYWRkZWQgbWVzc2FnZS5cbiAgICAgICAgY29uc3QgcGFkZGVkID0gUklQRU1EMTYwLnBhZChtZXNzYWdlKTtcblxuICAgICAgICAvLyAvLy8vLy8vLyAgICAgQ29tcHJlc3Npb24gICAgIC8vLy8vLy8vLy9cblxuICAgICAgICAvLyBNZXNzYWdlIHdvcmQgc2VsZWN0b3JzLlxuICAgICAgICBjb25zdCByID0gW1xuICAgICAgICAgICAgMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNSxcbiAgICAgICAgICAgIDcsIDQsIDEzLCAxLCAxMCwgNiwgMTUsIDMsIDEyLCAwLCA5LCA1LCAyLCAxNCwgMTEsIDgsXG4gICAgICAgICAgICAzLCAxMCwgMTQsIDQsIDksIDE1LCA4LCAxLCAyLCA3LCAwLCA2LCAxMywgMTEsIDUsIDEyLFxuICAgICAgICAgICAgMSwgOSwgMTEsIDEwLCAwLCA4LCAxMiwgNCwgMTMsIDMsIDcsIDE1LCAxNCwgNSwgNiwgMixcbiAgICAgICAgICAgIDQsIDAsIDUsIDksIDcsIDEyLCAyLCAxMCwgMTQsIDEsIDMsIDgsIDExLCA2LCAxNSwgMTNcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3QgclAgPSBbIC8vIHInXG4gICAgICAgICAgICA1LCAxNCwgNywgMCwgOSwgMiwgMTEsIDQsIDEzLCA2LCAxNSwgOCwgMSwgMTAsIDMsIDEyLFxuICAgICAgICAgICAgNiwgMTEsIDMsIDcsIDAsIDEzLCA1LCAxMCwgMTQsIDE1LCA4LCAxMiwgNCwgOSwgMSwgMixcbiAgICAgICAgICAgIDE1LCA1LCAxLCAzLCA3LCAxNCwgNiwgOSwgMTEsIDgsIDEyLCAyLCAxMCwgMCwgNCwgMTMsXG4gICAgICAgICAgICA4LCA2LCA0LCAxLCAzLCAxMSwgMTUsIDAsIDUsIDEyLCAyLCAxMywgOSwgNywgMTAsIDE0LFxuICAgICAgICAgICAgMTIsIDE1LCAxMCwgNCwgMSwgNSwgOCwgNywgNiwgMiwgMTMsIDE0LCAwLCAzLCA5LCAxMVxuICAgICAgICBdO1xuXG4gICAgICAgIC8vIEFtb3VudHMgZm9yICdyb3RhdGUgbGVmdCcgb3BlcmF0aW9uLlxuICAgICAgICBjb25zdCBzID0gW1xuICAgICAgICAgICAgMTEsIDE0LCAxNSwgMTIsIDUsIDgsIDcsIDksIDExLCAxMywgMTQsIDE1LCA2LCA3LCA5LCA4LFxuICAgICAgICAgICAgNywgNiwgOCwgMTMsIDExLCA5LCA3LCAxNSwgNywgMTIsIDE1LCA5LCAxMSwgNywgMTMsIDEyLFxuICAgICAgICAgICAgMTEsIDEzLCA2LCA3LCAxNCwgOSwgMTMsIDE1LCAxNCwgOCwgMTMsIDYsIDUsIDEyLCA3LCA1LFxuICAgICAgICAgICAgMTEsIDEyLCAxNCwgMTUsIDE0LCAxNSwgOSwgOCwgOSwgMTQsIDUsIDYsIDgsIDYsIDUsIDEyLFxuICAgICAgICAgICAgOSwgMTUsIDUsIDExLCA2LCA4LCAxMywgMTIsIDUsIDEyLCAxMywgMTQsIDExLCA4LCA1LCA2XG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IHNQID0gWyAvLyBzJ1xuICAgICAgICAgICAgOCwgOSwgOSwgMTEsIDEzLCAxNSwgMTUsIDUsIDcsIDcsIDgsIDExLCAxNCwgMTQsIDEyLCA2LFxuICAgICAgICAgICAgOSwgMTMsIDE1LCA3LCAxMiwgOCwgOSwgMTEsIDcsIDcsIDEyLCA3LCA2LCAxNSwgMTMsIDExLFxuICAgICAgICAgICAgOSwgNywgMTUsIDExLCA4LCA2LCA2LCAxNCwgMTIsIDEzLCA1LCAxNCwgMTMsIDEzLCA3LCA1LFxuICAgICAgICAgICAgMTUsIDUsIDgsIDExLCAxNCwgMTQsIDYsIDE0LCA2LCA5LCAxMiwgOSwgMTIsIDUsIDE1LCA4LFxuICAgICAgICAgICAgOCwgNSwgMTIsIDksIDEyLCA1LCAxNCwgNiwgOCwgMTMsIDYsIDUsIDE1LCAxMywgMTEsIDExXG4gICAgICAgIF07XG5cbiAgICAgICAgLy8gVGhlIHNpemUsIGluIGJ5dGVzLCBvZiBhIHdvcmQuXG4gICAgICAgIGNvbnN0IHdvcmRfc2l6ZSA9IDQ7XG5cbiAgICAgICAgLy8gVGhlIHNpemUsIGluIGJ5dGVzLCBvZiBhIDE2LXdvcmRzIGJsb2NrLlxuICAgICAgICBjb25zdCBibG9ja19zaXplID0gNjQ7XG5cbiAgICAgICAgLy8gVGhlIG51bWJlciBvZiB0aGUgMTYtd29yZHMgYmxvY2tzLlxuICAgICAgICBjb25zdCB0ID0gcGFkZGVkLmJ5dGVMZW5ndGggLyBibG9ja19zaXplO1xuXG4gICAgICAgIC8vICBUaGUgbWVzc2FnZSBhZnRlciBwYWRkaW5nIGNvbnNpc3RzIG9mIHQgMTYtd29yZCBibG9ja3MgdGhhdFxuICAgICAgICAvLyBhcmUgZGVub3RlZCB3aXRoIFhfaVtqXSwgd2l0aCAw4omkaeKJpCh0IOKIkiAxKSBhbmQgMOKJpGriiaQxNS5cbiAgICAgICAgY29uc3QgWCA9IChuZXcgQXJyYXkodCkpXG4gICAgICAgICAgICAuZmlsbCh1bmRlZmluZWQpXG4gICAgICAgICAgICAubWFwKChfLCBpKSA9PiBqID0+IChcbiAgICAgICAgICAgICAgICBuZXcgRGF0YVZpZXcoXG4gICAgICAgICAgICAgICAgICAgIHBhZGRlZCwgaSAqIGJsb2NrX3NpemUsIGJsb2NrX3NpemVcbiAgICAgICAgICAgICAgICApLmdldFVpbnQzMihcbiAgICAgICAgICAgICAgICAgICAgaiAqIHdvcmRfc2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgdHJ1ZSAvLyBMaXR0bGUtZW5kaWFuXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSk7XG5cbiAgICAgICAgLy8gIFRoZSByZXN1bHQgb2YgUklQRU1ELTE2MCBpcyBjb250YWluZWQgaW4gZml2ZSAzMi1iaXQgd29yZHMsXG4gICAgICAgIC8vIHdoaWNoIGZvcm0gdGhlIGludGVybmFsIHN0YXRlIG9mIHRoZSBhbGdvcml0aG0uIFRoZSBmaW5hbFxuICAgICAgICAvLyBjb250ZW50IG9mIHRoZXNlIGZpdmUgMzItYml0IHdvcmRzIGlzIGNvbnZlcnRlZCB0byBhIDE2MC1iaXRcbiAgICAgICAgLy8gc3RyaW5nLCBhZ2FpbiB1c2luZyB0aGUgbGl0dGxlLWVuZGlhbiBjb252ZW50aW9uLlxuICAgICAgICBjb25zdCBoID0gW1xuICAgICAgICAgICAgMHg2NzQ1MjMwMSwgLy8gaF8wXG4gICAgICAgICAgICAweEVGQ0RBQjg5LCAvLyBoXzFcbiAgICAgICAgICAgIDB4OThCQURDRkUsIC8vIGhfMlxuICAgICAgICAgICAgMHgxMDMyNTQ3NiwgLy8gaF8zXG4gICAgICAgICAgICAweEMzRDJFMUYwICAvLyBoXzRcbiAgICAgICAgXTtcblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdDsgKytpKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgQSA9IGhbMF07IGxldCBCID0gaFsxXTsgbGV0IEMgPSBoWzJdOyBsZXQgRCA9IGhbM107IGxldCBFID0gaFs0XTtcbiAgICAgICAgICAgIGxldCBBUCA9IEE7IGxldCBCUCA9IEI7IGxldCBDUCA9IEM7IGxldCBEUCA9IEQ7IGxldCBFUCA9IEU7XG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgODA7ICsrailcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBMZWZ0IHJvdW5kc1xuICAgICAgICAgICAgICAgIGxldCBUID0gUklQRU1EMTYwLmFkZF9tb2R1bG8zMiggLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zaGFkb3dcbiAgICAgICAgICAgICAgICAgICAgUklQRU1EMTYwLnJvbDMyKFxuICAgICAgICAgICAgICAgICAgICAgICAgUklQRU1EMTYwLmFkZF9tb2R1bG8zMihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJJUEVNRDE2MC5mKGosIEIsIEMsIEQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFhbaV0ocltqXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUklQRU1EMTYwLksoailcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBzW2pdXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIEVcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIEEgPSBFO1xuICAgICAgICAgICAgICAgIEUgPSBEO1xuICAgICAgICAgICAgICAgIEQgPSBSSVBFTUQxNjAucm9sMzIoQywgMTApO1xuICAgICAgICAgICAgICAgIEMgPSBCO1xuICAgICAgICAgICAgICAgIEIgPSBUO1xuXG4gICAgICAgICAgICAgICAgLy8gUmlnaHQgcm91bmRzXG4gICAgICAgICAgICAgICAgVCA9IFJJUEVNRDE2MC5hZGRfbW9kdWxvMzIoXG4gICAgICAgICAgICAgICAgICAgIFJJUEVNRDE2MC5yb2wzMihcbiAgICAgICAgICAgICAgICAgICAgICAgIFJJUEVNRDE2MC5hZGRfbW9kdWxvMzIoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQVAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUklQRU1EMTYwLmYoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDc5IC0gaixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQlAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENQLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEUFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgWFtpXShyUFtqXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUklQRU1EMTYwLktQKGopXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgc1Bbal1cbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgRVBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIEFQID0gRVA7XG4gICAgICAgICAgICAgICAgRVAgPSBEUDtcbiAgICAgICAgICAgICAgICBEUCA9IFJJUEVNRDE2MC5yb2wzMihDUCwgMTApO1xuICAgICAgICAgICAgICAgIENQID0gQlA7XG4gICAgICAgICAgICAgICAgQlAgPSBUO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgVCA9IFJJUEVNRDE2MC5hZGRfbW9kdWxvMzIoaFsxXSwgQywgRFApO1xuICAgICAgICAgICAgaFsxXSA9IFJJUEVNRDE2MC5hZGRfbW9kdWxvMzIoaFsyXSwgRCwgRVApO1xuICAgICAgICAgICAgaFsyXSA9IFJJUEVNRDE2MC5hZGRfbW9kdWxvMzIoaFszXSwgRSwgQVApO1xuICAgICAgICAgICAgaFszXSA9IFJJUEVNRDE2MC5hZGRfbW9kdWxvMzIoaFs0XSwgQSwgQlApO1xuICAgICAgICAgICAgaFs0XSA9IFJJUEVNRDE2MC5hZGRfbW9kdWxvMzIoaFswXSwgQiwgQ1ApO1xuICAgICAgICAgICAgaFswXSA9IFQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAgVGhlIGZpbmFsIG91dHB1dCBzdHJpbmcgdGhlbiBjb25zaXN0cyBvZiB0aGUgY29uY2F0ZW5hdGF0aW9uXG4gICAgICAgIC8vIG9mIGhfMCwgaF8xLCBoXzIsIGhfMywgYW5kIGhfNCBhZnRlciBjb252ZXJ0aW5nIGVhY2ggaF9pIHRvIGFcbiAgICAgICAgLy8gNC1ieXRlIHN0cmluZyB1c2luZyB0aGUgbGl0dGxlLWVuZGlhbiBjb252ZW50aW9uLlxuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgQXJyYXlCdWZmZXIoMjApO1xuICAgICAgICBjb25zdCBkYXRhX3ZpZXcgPSBuZXcgRGF0YVZpZXcocmVzdWx0KTtcbiAgICAgICAgaC5mb3JFYWNoKChoX2ksIGkpID0+IGRhdGFfdmlldy5zZXRVaW50MzIoaSAqIDQsIGhfaSwgdHJ1ZSkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgUklQRU1EMTYwXG59O1xuIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIl0sInNvdXJjZVJvb3QiOiIifQ==