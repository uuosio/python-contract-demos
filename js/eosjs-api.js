var eosjs_api =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/eosjs-api.ts");
/******/ })
/************************************************************************/
/******/ ({

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

/***/ "./node_modules/pako/index.js":
/*!************************************!*\
  !*** ./node_modules/pako/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Top level file is just a mixin of submodules & constants


var assign    = __webpack_require__(/*! ./lib/utils/common */ "./node_modules/pako/lib/utils/common.js").assign;

var deflate   = __webpack_require__(/*! ./lib/deflate */ "./node_modules/pako/lib/deflate.js");
var inflate   = __webpack_require__(/*! ./lib/inflate */ "./node_modules/pako/lib/inflate.js");
var constants = __webpack_require__(/*! ./lib/zlib/constants */ "./node_modules/pako/lib/zlib/constants.js");

var pako = {};

assign(pako, deflate, inflate, constants);

module.exports = pako;


/***/ }),

/***/ "./node_modules/pako/lib/deflate.js":
/*!******************************************!*\
  !*** ./node_modules/pako/lib/deflate.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var zlib_deflate = __webpack_require__(/*! ./zlib/deflate */ "./node_modules/pako/lib/zlib/deflate.js");
var utils        = __webpack_require__(/*! ./utils/common */ "./node_modules/pako/lib/utils/common.js");
var strings      = __webpack_require__(/*! ./utils/strings */ "./node_modules/pako/lib/utils/strings.js");
var msg          = __webpack_require__(/*! ./zlib/messages */ "./node_modules/pako/lib/zlib/messages.js");
var ZStream      = __webpack_require__(/*! ./zlib/zstream */ "./node_modules/pako/lib/zlib/zstream.js");

var toString = Object.prototype.toString;

/* Public constants ==========================================================*/
/* ===========================================================================*/

var Z_NO_FLUSH      = 0;
var Z_FINISH        = 4;

var Z_OK            = 0;
var Z_STREAM_END    = 1;
var Z_SYNC_FLUSH    = 2;

var Z_DEFAULT_COMPRESSION = -1;

var Z_DEFAULT_STRATEGY    = 0;

var Z_DEFLATED  = 8;

/* ===========================================================================*/


/**
 * class Deflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[deflate]],
 * [[deflateRaw]] and [[gzip]].
 **/

/* internal
 * Deflate.chunks -> Array
 *
 * Chunks of output data, if [[Deflate#onData]] not overridden.
 **/

/**
 * Deflate.result -> Uint8Array|Array
 *
 * Compressed result, generated by default [[Deflate#onData]]
 * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Deflate#push]] with `Z_FINISH` / `true` param)  or if you
 * push a chunk with explicit flush (call [[Deflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Deflate.err -> Number
 *
 * Error code after deflate finished. 0 (Z_OK) on success.
 * You will not need it in real life, because deflate errors
 * are possible only on wrong options or bad `onData` / `onEnd`
 * custom handlers.
 **/

/**
 * Deflate.msg -> String
 *
 * Error message, if [[Deflate.err]] != 0
 **/


/**
 * new Deflate(options)
 * - options (Object): zlib deflate options.
 *
 * Creates new deflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `level`
 * - `windowBits`
 * - `memLevel`
 * - `strategy`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw deflate
 * - `gzip` (Boolean) - create gzip wrapper
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 * - `header` (Object) - custom header for gzip
 *   - `text` (Boolean) - true if compressed data believed to be text
 *   - `time` (Number) - modification time, unix timestamp
 *   - `os` (Number) - operation system code
 *   - `extra` (Array) - array of bytes with extra data (max 65536)
 *   - `name` (String) - file name (binary string)
 *   - `comment` (String) - comment (binary string)
 *   - `hcrc` (Boolean) - true if header crc should be added
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var deflate = new pako.Deflate({ level: 3});
 *
 * deflate.push(chunk1, false);
 * deflate.push(chunk2, true);  // true -> last chunk
 *
 * if (deflate.err) { throw new Error(deflate.err); }
 *
 * console.log(deflate.result);
 * ```
 **/
function Deflate(options) {
  if (!(this instanceof Deflate)) return new Deflate(options);

  this.options = utils.assign({
    level: Z_DEFAULT_COMPRESSION,
    method: Z_DEFLATED,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: Z_DEFAULT_STRATEGY,
    to: ''
  }, options || {});

  var opt = this.options;

  if (opt.raw && (opt.windowBits > 0)) {
    opt.windowBits = -opt.windowBits;
  }

  else if (opt.gzip && (opt.windowBits > 0) && (opt.windowBits < 16)) {
    opt.windowBits += 16;
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm = new ZStream();
  this.strm.avail_out = 0;

  var status = zlib_deflate.deflateInit2(
    this.strm,
    opt.level,
    opt.method,
    opt.windowBits,
    opt.memLevel,
    opt.strategy
  );

  if (status !== Z_OK) {
    throw new Error(msg[status]);
  }

  if (opt.header) {
    zlib_deflate.deflateSetHeader(this.strm, opt.header);
  }

  if (opt.dictionary) {
    var dict;
    // Convert data if needed
    if (typeof opt.dictionary === 'string') {
      // If we need to compress text, change encoding to utf8.
      dict = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
      dict = new Uint8Array(opt.dictionary);
    } else {
      dict = opt.dictionary;
    }

    status = zlib_deflate.deflateSetDictionary(this.strm, dict);

    if (status !== Z_OK) {
      throw new Error(msg[status]);
    }

    this._dict_set = true;
  }
}

/**
 * Deflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data. Strings will be
 *   converted to utf8 byte sequence.
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
 *
 * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
 * new compressed chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Deflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the compression context.
 *
 * On fail call [[Deflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * array format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Deflate.prototype.push = function (data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var status, _mode;

  if (this.ended) { return false; }

  _mode = (mode === ~~mode) ? mode : ((mode === true) ? Z_FINISH : Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // If we need to compress text, change encoding to utf8.
    strm.input = strings.string2buf(data);
  } else if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    status = zlib_deflate.deflate(strm, _mode);    /* no bad return value */

    if (status !== Z_STREAM_END && status !== Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }
    if (strm.avail_out === 0 || (strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH))) {
      if (this.options.to === 'string') {
        this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)));
      } else {
        this.onData(utils.shrinkBuf(strm.output, strm.next_out));
      }
    }
  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END);

  // Finalize on the last chunk.
  if (_mode === Z_FINISH) {
    status = zlib_deflate.deflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === Z_OK;
  }

  // callback interim results if Z_SYNC_FLUSH.
  if (_mode === Z_SYNC_FLUSH) {
    this.onEnd(Z_OK);
    strm.avail_out = 0;
    return true;
  }

  return true;
};


/**
 * Deflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): output data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Deflate.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};


/**
 * Deflate#onEnd(status) -> Void
 * - status (Number): deflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called once after you tell deflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Deflate.prototype.onEnd = function (status) {
  // On success - join
  if (status === Z_OK) {
    if (this.options.to === 'string') {
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * deflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * Compress `data` with deflate algorithm and `options`.
 *
 * Supported options are:
 *
 * - level
 * - windowBits
 * - memLevel
 * - strategy
 * - dictionary
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , data = Uint8Array([1,2,3,4,5,6,7,8,9]);
 *
 * console.log(pako.deflate(data));
 * ```
 **/
function deflate(input, options) {
  var deflator = new Deflate(options);

  deflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (deflator.err) { throw deflator.msg || msg[deflator.err]; }

  return deflator.result;
}


/**
 * deflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function deflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return deflate(input, options);
}


/**
 * gzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but create gzip wrapper instead of
 * deflate one.
 **/
function gzip(input, options) {
  options = options || {};
  options.gzip = true;
  return deflate(input, options);
}


exports.Deflate = Deflate;
exports.deflate = deflate;
exports.deflateRaw = deflateRaw;
exports.gzip = gzip;


/***/ }),

/***/ "./node_modules/pako/lib/inflate.js":
/*!******************************************!*\
  !*** ./node_modules/pako/lib/inflate.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var zlib_inflate = __webpack_require__(/*! ./zlib/inflate */ "./node_modules/pako/lib/zlib/inflate.js");
var utils        = __webpack_require__(/*! ./utils/common */ "./node_modules/pako/lib/utils/common.js");
var strings      = __webpack_require__(/*! ./utils/strings */ "./node_modules/pako/lib/utils/strings.js");
var c            = __webpack_require__(/*! ./zlib/constants */ "./node_modules/pako/lib/zlib/constants.js");
var msg          = __webpack_require__(/*! ./zlib/messages */ "./node_modules/pako/lib/zlib/messages.js");
var ZStream      = __webpack_require__(/*! ./zlib/zstream */ "./node_modules/pako/lib/zlib/zstream.js");
var GZheader     = __webpack_require__(/*! ./zlib/gzheader */ "./node_modules/pako/lib/zlib/gzheader.js");

var toString = Object.prototype.toString;

/**
 * class Inflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[inflate]]
 * and [[inflateRaw]].
 **/

/* internal
 * inflate.chunks -> Array
 *
 * Chunks of output data, if [[Inflate#onData]] not overridden.
 **/

/**
 * Inflate.result -> Uint8Array|Array|String
 *
 * Uncompressed result, generated by default [[Inflate#onData]]
 * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Inflate#push]] with `Z_FINISH` / `true` param) or if you
 * push a chunk with explicit flush (call [[Inflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Inflate.err -> Number
 *
 * Error code after inflate finished. 0 (Z_OK) on success.
 * Should be checked if broken data possible.
 **/

/**
 * Inflate.msg -> String
 *
 * Error message, if [[Inflate.err]] != 0
 **/


/**
 * new Inflate(options)
 * - options (Object): zlib inflate options.
 *
 * Creates new inflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `windowBits`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw inflate
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 * By default, when no options set, autodetect deflate/gzip data format via
 * wrapper header.
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var inflate = new pako.Inflate({ level: 3});
 *
 * inflate.push(chunk1, false);
 * inflate.push(chunk2, true);  // true -> last chunk
 *
 * if (inflate.err) { throw new Error(inflate.err); }
 *
 * console.log(inflate.result);
 * ```
 **/
function Inflate(options) {
  if (!(this instanceof Inflate)) return new Inflate(options);

  this.options = utils.assign({
    chunkSize: 16384,
    windowBits: 0,
    to: ''
  }, options || {});

  var opt = this.options;

  // Force window size for `raw` data, if not set directly,
  // because we have no header for autodetect.
  if (opt.raw && (opt.windowBits >= 0) && (opt.windowBits < 16)) {
    opt.windowBits = -opt.windowBits;
    if (opt.windowBits === 0) { opt.windowBits = -15; }
  }

  // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
  if ((opt.windowBits >= 0) && (opt.windowBits < 16) &&
      !(options && options.windowBits)) {
    opt.windowBits += 32;
  }

  // Gzip header has no info about windows size, we can do autodetect only
  // for deflate. So, if window size not set, force it to max when gzip possible
  if ((opt.windowBits > 15) && (opt.windowBits < 48)) {
    // bit 3 (16) -> gzipped data
    // bit 4 (32) -> autodetect gzip/deflate
    if ((opt.windowBits & 15) === 0) {
      opt.windowBits |= 15;
    }
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm   = new ZStream();
  this.strm.avail_out = 0;

  var status  = zlib_inflate.inflateInit2(
    this.strm,
    opt.windowBits
  );

  if (status !== c.Z_OK) {
    throw new Error(msg[status]);
  }

  this.header = new GZheader();

  zlib_inflate.inflateGetHeader(this.strm, this.header);

  // Setup dictionary
  if (opt.dictionary) {
    // Convert data if needed
    if (typeof opt.dictionary === 'string') {
      opt.dictionary = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
      opt.dictionary = new Uint8Array(opt.dictionary);
    }
    if (opt.raw) { //In raw mode we need to set the dictionary early
      status = zlib_inflate.inflateSetDictionary(this.strm, opt.dictionary);
      if (status !== c.Z_OK) {
        throw new Error(msg[status]);
      }
    }
  }
}

/**
 * Inflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
 *
 * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
 * new output chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Inflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the decompression context.
 *
 * On fail call [[Inflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Inflate.prototype.push = function (data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var dictionary = this.options.dictionary;
  var status, _mode;
  var next_out_utf8, tail, utf8str;

  // Flag to properly process Z_BUF_ERROR on testing inflate call
  // when we check that all output data was flushed.
  var allowBufError = false;

  if (this.ended) { return false; }
  _mode = (mode === ~~mode) ? mode : ((mode === true) ? c.Z_FINISH : c.Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // Only binary strings can be decompressed on practice
    strm.input = strings.binstring2buf(data);
  } else if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }

    status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);    /* no bad return value */

    if (status === c.Z_NEED_DICT && dictionary) {
      status = zlib_inflate.inflateSetDictionary(this.strm, dictionary);
    }

    if (status === c.Z_BUF_ERROR && allowBufError === true) {
      status = c.Z_OK;
      allowBufError = false;
    }

    if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }

    if (strm.next_out) {
      if (strm.avail_out === 0 || status === c.Z_STREAM_END || (strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH))) {

        if (this.options.to === 'string') {

          next_out_utf8 = strings.utf8border(strm.output, strm.next_out);

          tail = strm.next_out - next_out_utf8;
          utf8str = strings.buf2string(strm.output, next_out_utf8);

          // move tail
          strm.next_out = tail;
          strm.avail_out = chunkSize - tail;
          if (tail) { utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0); }

          this.onData(utf8str);

        } else {
          this.onData(utils.shrinkBuf(strm.output, strm.next_out));
        }
      }
    }

    // When no more input data, we should check that internal inflate buffers
    // are flushed. The only way to do it when avail_out = 0 - run one more
    // inflate pass. But if output data not exists, inflate return Z_BUF_ERROR.
    // Here we set flag to process this error properly.
    //
    // NOTE. Deflate does not return error in this case and does not needs such
    // logic.
    if (strm.avail_in === 0 && strm.avail_out === 0) {
      allowBufError = true;
    }

  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);

  if (status === c.Z_STREAM_END) {
    _mode = c.Z_FINISH;
  }

  // Finalize on the last chunk.
  if (_mode === c.Z_FINISH) {
    status = zlib_inflate.inflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === c.Z_OK;
  }

  // callback interim results if Z_SYNC_FLUSH.
  if (_mode === c.Z_SYNC_FLUSH) {
    this.onEnd(c.Z_OK);
    strm.avail_out = 0;
    return true;
  }

  return true;
};


/**
 * Inflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): output data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Inflate.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};


/**
 * Inflate#onEnd(status) -> Void
 * - status (Number): inflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called either after you tell inflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Inflate.prototype.onEnd = function (status) {
  // On success - join
  if (status === c.Z_OK) {
    if (this.options.to === 'string') {
      // Glue & convert here, until we teach pako to send
      // utf8 aligned strings to onData
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * inflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Decompress `data` with inflate/ungzip and `options`. Autodetect
 * format via wrapper header by default. That's why we don't provide
 * separate `ungzip` method.
 *
 * Supported options are:
 *
 * - windowBits
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , input = pako.deflate([1,2,3,4,5,6,7,8,9])
 *   , output;
 *
 * try {
 *   output = pako.inflate(input);
 * } catch (err)
 *   console.log(err);
 * }
 * ```
 **/
function inflate(input, options) {
  var inflator = new Inflate(options);

  inflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (inflator.err) { throw inflator.msg || msg[inflator.err]; }

  return inflator.result;
}


/**
 * inflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * The same as [[inflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function inflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return inflate(input, options);
}


/**
 * ungzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Just shortcut to [[inflate]], because it autodetects format
 * by header.content. Done for convenience.
 **/


exports.Inflate = Inflate;
exports.inflate = inflate;
exports.inflateRaw = inflateRaw;
exports.ungzip  = inflate;


/***/ }),

/***/ "./node_modules/pako/lib/utils/common.js":
/*!***********************************************!*\
  !*** ./node_modules/pako/lib/utils/common.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var TYPED_OK =  (typeof Uint8Array !== 'undefined') &&
                (typeof Uint16Array !== 'undefined') &&
                (typeof Int32Array !== 'undefined');

function _has(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

exports.assign = function (obj /*from1, from2, from3, ...*/) {
  var sources = Array.prototype.slice.call(arguments, 1);
  while (sources.length) {
    var source = sources.shift();
    if (!source) { continue; }

    if (typeof source !== 'object') {
      throw new TypeError(source + 'must be non-object');
    }

    for (var p in source) {
      if (_has(source, p)) {
        obj[p] = source[p];
      }
    }
  }

  return obj;
};


// reduce buffer size, avoiding mem copy
exports.shrinkBuf = function (buf, size) {
  if (buf.length === size) { return buf; }
  if (buf.subarray) { return buf.subarray(0, size); }
  buf.length = size;
  return buf;
};


var fnTyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    if (src.subarray && dest.subarray) {
      dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
      return;
    }
    // Fallback to ordinary array
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function (chunks) {
    var i, l, len, pos, chunk, result;

    // calculate data length
    len = 0;
    for (i = 0, l = chunks.length; i < l; i++) {
      len += chunks[i].length;
    }

    // join chunks
    result = new Uint8Array(len);
    pos = 0;
    for (i = 0, l = chunks.length; i < l; i++) {
      chunk = chunks[i];
      result.set(chunk, pos);
      pos += chunk.length;
    }

    return result;
  }
};

var fnUntyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function (chunks) {
    return [].concat.apply([], chunks);
  }
};


// Enable/Disable typed arrays use, for testing
//
exports.setTyped = function (on) {
  if (on) {
    exports.Buf8  = Uint8Array;
    exports.Buf16 = Uint16Array;
    exports.Buf32 = Int32Array;
    exports.assign(exports, fnTyped);
  } else {
    exports.Buf8  = Array;
    exports.Buf16 = Array;
    exports.Buf32 = Array;
    exports.assign(exports, fnUntyped);
  }
};

exports.setTyped(TYPED_OK);


/***/ }),

/***/ "./node_modules/pako/lib/utils/strings.js":
/*!************************************************!*\
  !*** ./node_modules/pako/lib/utils/strings.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// String encode/decode helpers



var utils = __webpack_require__(/*! ./common */ "./node_modules/pako/lib/utils/common.js");


// Quick check if we can use fast array to bin string conversion
//
// - apply(Array) can fail on Android 2.2
// - apply(Uint8Array) can fail on iOS 5.1 Safari
//
var STR_APPLY_OK = true;
var STR_APPLY_UIA_OK = true;

try { String.fromCharCode.apply(null, [ 0 ]); } catch (__) { STR_APPLY_OK = false; }
try { String.fromCharCode.apply(null, new Uint8Array(1)); } catch (__) { STR_APPLY_UIA_OK = false; }


// Table with utf8 lengths (calculated by first byte of sequence)
// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
// because max possible codepoint is 0x10ffff
var _utf8len = new utils.Buf8(256);
for (var q = 0; q < 256; q++) {
  _utf8len[q] = (q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1);
}
_utf8len[254] = _utf8len[254] = 1; // Invalid sequence start


// convert string to array (typed, when possible)
exports.string2buf = function (str) {
  var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

  // count binary size
  for (m_pos = 0; m_pos < str_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }

  // allocate buffer
  buf = new utils.Buf8(buf_len);

  // convert
  for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    if (c < 0x80) {
      /* one byte */
      buf[i++] = c;
    } else if (c < 0x800) {
      /* two bytes */
      buf[i++] = 0xC0 | (c >>> 6);
      buf[i++] = 0x80 | (c & 0x3f);
    } else if (c < 0x10000) {
      /* three bytes */
      buf[i++] = 0xE0 | (c >>> 12);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    } else {
      /* four bytes */
      buf[i++] = 0xf0 | (c >>> 18);
      buf[i++] = 0x80 | (c >>> 12 & 0x3f);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    }
  }

  return buf;
};

// Helper (used in 2 places)
function buf2binstring(buf, len) {
  // On Chrome, the arguments in a function call that are allowed is `65534`.
  // If the length of the buffer is smaller than that, we can use this optimization,
  // otherwise we will take a slower path.
  if (len < 65534) {
    if ((buf.subarray && STR_APPLY_UIA_OK) || (!buf.subarray && STR_APPLY_OK)) {
      return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
    }
  }

  var result = '';
  for (var i = 0; i < len; i++) {
    result += String.fromCharCode(buf[i]);
  }
  return result;
}


// Convert byte array to binary string
exports.buf2binstring = function (buf) {
  return buf2binstring(buf, buf.length);
};


// Convert binary string (typed, when possible)
exports.binstring2buf = function (str) {
  var buf = new utils.Buf8(str.length);
  for (var i = 0, len = buf.length; i < len; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
};


// convert array to string
exports.buf2string = function (buf, max) {
  var i, out, c, c_len;
  var len = max || buf.length;

  // Reserve max possible length (2 words per char)
  // NB: by unknown reasons, Array is significantly faster for
  //     String.fromCharCode.apply than Uint16Array.
  var utf16buf = new Array(len * 2);

  for (out = 0, i = 0; i < len;) {
    c = buf[i++];
    // quick process ascii
    if (c < 0x80) { utf16buf[out++] = c; continue; }

    c_len = _utf8len[c];
    // skip 5 & 6 byte codes
    if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len - 1; continue; }

    // apply mask on first byte
    c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
    // join the rest
    while (c_len > 1 && i < len) {
      c = (c << 6) | (buf[i++] & 0x3f);
      c_len--;
    }

    // terminated by end of string?
    if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

    if (c < 0x10000) {
      utf16buf[out++] = c;
    } else {
      c -= 0x10000;
      utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
      utf16buf[out++] = 0xdc00 | (c & 0x3ff);
    }
  }

  return buf2binstring(utf16buf, out);
};


// Calculate max possible position in utf8 buffer,
// that will not break sequence. If that's not possible
// - (very small limits) return max size as is.
//
// buf[] - utf8 bytes array
// max   - length limit (mandatory);
exports.utf8border = function (buf, max) {
  var pos;

  max = max || buf.length;
  if (max > buf.length) { max = buf.length; }

  // go back from last position, until start of sequence found
  pos = max - 1;
  while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

  // Very small and broken sequence,
  // return max, because we should return something anyway.
  if (pos < 0) { return max; }

  // If we came to start of buffer - that means buffer is too small,
  // return max too.
  if (pos === 0) { return max; }

  return (pos + _utf8len[buf[pos]] > max) ? pos : max;
};


/***/ }),

/***/ "./node_modules/pako/lib/zlib/adler32.js":
/*!***********************************************!*\
  !*** ./node_modules/pako/lib/zlib/adler32.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Note: adler32 takes 12% for level 0 and 2% for level 6.
// It isn't worth it to make additional optimizations as in original.
// Small size is preferable.

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function adler32(adler, buf, len, pos) {
  var s1 = (adler & 0xffff) |0,
      s2 = ((adler >>> 16) & 0xffff) |0,
      n = 0;

  while (len !== 0) {
    // Set limit ~ twice less than 5552, to keep
    // s2 in 31-bits, because we force signed ints.
    // in other case %= will fail.
    n = len > 2000 ? 2000 : len;
    len -= n;

    do {
      s1 = (s1 + buf[pos++]) |0;
      s2 = (s2 + s1) |0;
    } while (--n);

    s1 %= 65521;
    s2 %= 65521;
  }

  return (s1 | (s2 << 16)) |0;
}


module.exports = adler32;


/***/ }),

/***/ "./node_modules/pako/lib/zlib/constants.js":
/*!*************************************************!*\
  !*** ./node_modules/pako/lib/zlib/constants.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

module.exports = {

  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH:         0,
  Z_PARTIAL_FLUSH:    1,
  Z_SYNC_FLUSH:       2,
  Z_FULL_FLUSH:       3,
  Z_FINISH:           4,
  Z_BLOCK:            5,
  Z_TREES:            6,

  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK:               0,
  Z_STREAM_END:       1,
  Z_NEED_DICT:        2,
  Z_ERRNO:           -1,
  Z_STREAM_ERROR:    -2,
  Z_DATA_ERROR:      -3,
  //Z_MEM_ERROR:     -4,
  Z_BUF_ERROR:       -5,
  //Z_VERSION_ERROR: -6,

  /* compression levels */
  Z_NO_COMPRESSION:         0,
  Z_BEST_SPEED:             1,
  Z_BEST_COMPRESSION:       9,
  Z_DEFAULT_COMPRESSION:   -1,


  Z_FILTERED:               1,
  Z_HUFFMAN_ONLY:           2,
  Z_RLE:                    3,
  Z_FIXED:                  4,
  Z_DEFAULT_STRATEGY:       0,

  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY:                 0,
  Z_TEXT:                   1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN:                2,

  /* The deflate compression method */
  Z_DEFLATED:               8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};


/***/ }),

/***/ "./node_modules/pako/lib/zlib/crc32.js":
/*!*********************************************!*\
  !*** ./node_modules/pako/lib/zlib/crc32.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Note: we can't get significant speed boost here.
// So write code to minimize size - no pregenerated tables
// and array tools dependencies.

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

// Use ordinary array, since untyped makes no boost here
function makeTable() {
  var c, table = [];

  for (var n = 0; n < 256; n++) {
    c = n;
    for (var k = 0; k < 8; k++) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    table[n] = c;
  }

  return table;
}

// Create table on load. Just 255 signed longs. Not a problem.
var crcTable = makeTable();


function crc32(crc, buf, len, pos) {
  var t = crcTable,
      end = pos + len;

  crc ^= -1;

  for (var i = pos; i < end; i++) {
    crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
  }

  return (crc ^ (-1)); // >>> 0;
}


module.exports = crc32;


/***/ }),

/***/ "./node_modules/pako/lib/zlib/deflate.js":
/*!***********************************************!*\
  !*** ./node_modules/pako/lib/zlib/deflate.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils   = __webpack_require__(/*! ../utils/common */ "./node_modules/pako/lib/utils/common.js");
var trees   = __webpack_require__(/*! ./trees */ "./node_modules/pako/lib/zlib/trees.js");
var adler32 = __webpack_require__(/*! ./adler32 */ "./node_modules/pako/lib/zlib/adler32.js");
var crc32   = __webpack_require__(/*! ./crc32 */ "./node_modules/pako/lib/zlib/crc32.js");
var msg     = __webpack_require__(/*! ./messages */ "./node_modules/pako/lib/zlib/messages.js");

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
var Z_NO_FLUSH      = 0;
var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
//var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
//var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
//var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;


/* compression levels */
//var Z_NO_COMPRESSION      = 0;
//var Z_BEST_SPEED          = 1;
//var Z_BEST_COMPRESSION    = 9;
var Z_DEFAULT_COMPRESSION = -1;


var Z_FILTERED            = 1;
var Z_HUFFMAN_ONLY        = 2;
var Z_RLE                 = 3;
var Z_FIXED               = 4;
var Z_DEFAULT_STRATEGY    = 0;

/* Possible values of the data_type field (though see inflate()) */
//var Z_BINARY              = 0;
//var Z_TEXT                = 1;
//var Z_ASCII               = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;


/* The deflate compression method */
var Z_DEFLATED  = 8;

/*============================================================================*/


var MAX_MEM_LEVEL = 9;
/* Maximum value for memLevel in deflateInit2 */
var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_MEM_LEVEL = 8;


var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */
var LITERALS      = 256;
/* number of literal bytes 0..255 */
var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */
var D_CODES       = 30;
/* number of distance codes */
var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */
var HEAP_SIZE     = 2 * L_CODES + 1;
/* maximum heap size */
var MAX_BITS  = 15;
/* All codes must not exceed MAX_BITS bits */

var MIN_MATCH = 3;
var MAX_MATCH = 258;
var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);

var PRESET_DICT = 0x20;

var INIT_STATE = 42;
var EXTRA_STATE = 69;
var NAME_STATE = 73;
var COMMENT_STATE = 91;
var HCRC_STATE = 103;
var BUSY_STATE = 113;
var FINISH_STATE = 666;

var BS_NEED_MORE      = 1; /* block not completed, need more input or more output */
var BS_BLOCK_DONE     = 2; /* block flush performed */
var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
var BS_FINISH_DONE    = 4; /* finish done, accept no more input or output */

var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

function err(strm, errorCode) {
  strm.msg = msg[errorCode];
  return errorCode;
}

function rank(f) {
  return ((f) << 1) - ((f) > 4 ? 9 : 0);
}

function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }


/* =========================================================================
 * Flush as much pending output as possible. All deflate() output goes
 * through this function so some applications may wish to modify it
 * to avoid allocating a large strm->output buffer and copying into it.
 * (See also read_buf()).
 */
function flush_pending(strm) {
  var s = strm.state;

  //_tr_flush_bits(s);
  var len = s.pending;
  if (len > strm.avail_out) {
    len = strm.avail_out;
  }
  if (len === 0) { return; }

  utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
  strm.next_out += len;
  s.pending_out += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s.pending -= len;
  if (s.pending === 0) {
    s.pending_out = 0;
  }
}


function flush_block_only(s, last) {
  trees._tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
  s.block_start = s.strstart;
  flush_pending(s.strm);
}


function put_byte(s, b) {
  s.pending_buf[s.pending++] = b;
}


/* =========================================================================
 * Put a short in the pending buffer. The 16-bit value is put in MSB order.
 * IN assertion: the stream state is correct and there is enough room in
 * pending_buf.
 */
function putShortMSB(s, b) {
//  put_byte(s, (Byte)(b >> 8));
//  put_byte(s, (Byte)(b & 0xff));
  s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
  s.pending_buf[s.pending++] = b & 0xff;
}


/* ===========================================================================
 * Read a new buffer from the current input stream, update the adler32
 * and total number of bytes read.  All deflate() input goes through
 * this function so some applications may wish to modify it to avoid
 * allocating a large strm->input buffer and copying from it.
 * (See also flush_pending()).
 */
function read_buf(strm, buf, start, size) {
  var len = strm.avail_in;

  if (len > size) { len = size; }
  if (len === 0) { return 0; }

  strm.avail_in -= len;

  // zmemcpy(buf, strm->next_in, len);
  utils.arraySet(buf, strm.input, strm.next_in, len, start);
  if (strm.state.wrap === 1) {
    strm.adler = adler32(strm.adler, buf, len, start);
  }

  else if (strm.state.wrap === 2) {
    strm.adler = crc32(strm.adler, buf, len, start);
  }

  strm.next_in += len;
  strm.total_in += len;

  return len;
}


/* ===========================================================================
 * Set match_start to the longest match starting at the given string and
 * return its length. Matches shorter or equal to prev_length are discarded,
 * in which case the result is equal to prev_length and match_start is
 * garbage.
 * IN assertions: cur_match is the head of the hash chain for the current
 *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
 * OUT assertion: the match length is not greater than s->lookahead.
 */
function longest_match(s, cur_match) {
  var chain_length = s.max_chain_length;      /* max hash chain length */
  var scan = s.strstart; /* current string */
  var match;                       /* matched string */
  var len;                           /* length of current match */
  var best_len = s.prev_length;              /* best match length so far */
  var nice_match = s.nice_match;             /* stop if match long enough */
  var limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
      s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0/*NIL*/;

  var _win = s.window; // shortcut

  var wmask = s.w_mask;
  var prev  = s.prev;

  /* Stop when cur_match becomes <= limit. To simplify the code,
   * we prevent matches with the string of window index 0.
   */

  var strend = s.strstart + MAX_MATCH;
  var scan_end1  = _win[scan + best_len - 1];
  var scan_end   = _win[scan + best_len];

  /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
   * It is easy to get rid of this optimization if necessary.
   */
  // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

  /* Do not waste too much time if we already have a good match: */
  if (s.prev_length >= s.good_match) {
    chain_length >>= 2;
  }
  /* Do not look for matches beyond the end of the input. This is necessary
   * to make deflate deterministic.
   */
  if (nice_match > s.lookahead) { nice_match = s.lookahead; }

  // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

  do {
    // Assert(cur_match < s->strstart, "no future");
    match = cur_match;

    /* Skip to next match if the match length cannot increase
     * or if the match length is less than 2.  Note that the checks below
     * for insufficient lookahead only occur occasionally for performance
     * reasons.  Therefore uninitialized memory will be accessed, and
     * conditional jumps will be made that depend on those values.
     * However the length of the match is limited to the lookahead, so
     * the output of deflate is not affected by the uninitialized values.
     */

    if (_win[match + best_len]     !== scan_end  ||
        _win[match + best_len - 1] !== scan_end1 ||
        _win[match]                !== _win[scan] ||
        _win[++match]              !== _win[scan + 1]) {
      continue;
    }

    /* The check at best_len-1 can be removed because it will be made
     * again later. (This heuristic is not always a win.)
     * It is not necessary to compare scan[2] and match[2] since they
     * are always equal when the other bytes match, given that
     * the hash keys are equal and that HASH_BITS >= 8.
     */
    scan += 2;
    match++;
    // Assert(*scan == *match, "match[2]?");

    /* We check for insufficient lookahead only every 8th comparison;
     * the 256th check will be made at strstart+258.
     */
    do {
      /*jshint noempty:false*/
    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             scan < strend);

    // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

    len = MAX_MATCH - (strend - scan);
    scan = strend - MAX_MATCH;

    if (len > best_len) {
      s.match_start = cur_match;
      best_len = len;
      if (len >= nice_match) {
        break;
      }
      scan_end1  = _win[scan + best_len - 1];
      scan_end   = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

  if (best_len <= s.lookahead) {
    return best_len;
  }
  return s.lookahead;
}


/* ===========================================================================
 * Fill the window when the lookahead becomes insufficient.
 * Updates strstart and lookahead.
 *
 * IN assertion: lookahead < MIN_LOOKAHEAD
 * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
 *    At least one byte has been read, or avail_in == 0; reads are
 *    performed for at least two bytes (required for the zip translate_eol
 *    option -- not supported here).
 */
function fill_window(s) {
  var _w_size = s.w_size;
  var p, n, m, more, str;

  //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

  do {
    more = s.window_size - s.lookahead - s.strstart;

    // JS ints have 32 bit, block below not needed
    /* Deal with !@#$% 64K limit: */
    //if (sizeof(int) <= 2) {
    //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
    //        more = wsize;
    //
    //  } else if (more == (unsigned)(-1)) {
    //        /* Very unlikely, but possible on 16 bit machine if
    //         * strstart == 0 && lookahead == 1 (input done a byte at time)
    //         */
    //        more--;
    //    }
    //}


    /* If the window is almost full and there is insufficient lookahead,
     * move the upper half to the lower one to make room in the upper half.
     */
    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {

      utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
      s.match_start -= _w_size;
      s.strstart -= _w_size;
      /* we now have strstart >= MAX_DIST */
      s.block_start -= _w_size;

      /* Slide the hash table (could be avoided with 32 bit values
       at the expense of memory usage). We slide even when level == 0
       to keep the hash table consistent if we switch back to level > 0
       later. (Using level 0 permanently is not an optimal usage of
       zlib, so we don't care about this pathological case.)
       */

      n = s.hash_size;
      p = n;
      do {
        m = s.head[--p];
        s.head[p] = (m >= _w_size ? m - _w_size : 0);
      } while (--n);

      n = _w_size;
      p = n;
      do {
        m = s.prev[--p];
        s.prev[p] = (m >= _w_size ? m - _w_size : 0);
        /* If n is not on any hash chain, prev[n] is garbage but
         * its value will never be used.
         */
      } while (--n);

      more += _w_size;
    }
    if (s.strm.avail_in === 0) {
      break;
    }

    /* If there was no sliding:
     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
     *    more == window_size - lookahead - strstart
     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
     * => more >= window_size - 2*WSIZE + 2
     * In the BIG_MEM or MMAP case (not yet supported),
     *   window_size == input_size + MIN_LOOKAHEAD  &&
     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
     * Otherwise, window_size == 2*WSIZE so more >= 2.
     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
     */
    //Assert(more >= 2, "more < 2");
    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
    s.lookahead += n;

    /* Initialize the hash value now that we have some input: */
    if (s.lookahead + s.insert >= MIN_MATCH) {
      str = s.strstart - s.insert;
      s.ins_h = s.window[str];

      /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;
//#if MIN_MATCH != 3
//        Call update_hash() MIN_MATCH-3 more times
//#endif
      while (s.insert) {
        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
        s.insert--;
        if (s.lookahead + s.insert < MIN_MATCH) {
          break;
        }
      }
    }
    /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
     * but this is not important since only literal bytes will be emitted.
     */

  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

  /* If the WIN_INIT bytes after the end of the current data have never been
   * written, then zero those bytes in order to avoid memory check reports of
   * the use of uninitialized (or uninitialised as Julian writes) bytes by
   * the longest match routines.  Update the high water mark for the next
   * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
   * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
   */
//  if (s.high_water < s.window_size) {
//    var curr = s.strstart + s.lookahead;
//    var init = 0;
//
//    if (s.high_water < curr) {
//      /* Previous high water mark below current data -- zero WIN_INIT
//       * bytes or up to end of window, whichever is less.
//       */
//      init = s.window_size - curr;
//      if (init > WIN_INIT)
//        init = WIN_INIT;
//      zmemzero(s->window + curr, (unsigned)init);
//      s->high_water = curr + init;
//    }
//    else if (s->high_water < (ulg)curr + WIN_INIT) {
//      /* High water mark at or above current data, but below current data
//       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
//       * to end of window, whichever is less.
//       */
//      init = (ulg)curr + WIN_INIT - s->high_water;
//      if (init > s->window_size - s->high_water)
//        init = s->window_size - s->high_water;
//      zmemzero(s->window + s->high_water, (unsigned)init);
//      s->high_water += init;
//    }
//  }
//
//  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
//    "not enough room for search");
}

/* ===========================================================================
 * Copy without compression as much as possible from the input stream, return
 * the current block state.
 * This function does not insert new strings in the dictionary since
 * uncompressible data is probably not useful. This function is used
 * only for the level=0 compression option.
 * NOTE: this function should be optimized to avoid extra copying from
 * window to pending_buf.
 */
function deflate_stored(s, flush) {
  /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
   * to pending_buf_size, and each stored block has a 5 byte header:
   */
  var max_block_size = 0xffff;

  if (max_block_size > s.pending_buf_size - 5) {
    max_block_size = s.pending_buf_size - 5;
  }

  /* Copy as much as possible from input to output: */
  for (;;) {
    /* Fill the window as much as possible: */
    if (s.lookahead <= 1) {

      //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
      //  s->block_start >= (long)s->w_size, "slide too late");
//      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
//        s.block_start >= s.w_size)) {
//        throw  new Error("slide too late");
//      }

      fill_window(s);
      if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }

      if (s.lookahead === 0) {
        break;
      }
      /* flush the current block */
    }
    //Assert(s->block_start >= 0L, "block gone");
//    if (s.block_start < 0) throw new Error("block gone");

    s.strstart += s.lookahead;
    s.lookahead = 0;

    /* Emit a stored block if pending_buf will be full: */
    var max_start = s.block_start + max_block_size;

    if (s.strstart === 0 || s.strstart >= max_start) {
      /* strstart == 0 is possible when wraparound on 16-bit machine */
      s.lookahead = s.strstart - max_start;
      s.strstart = max_start;
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/


    }
    /* Flush if we may have to slide, otherwise block_start may become
     * negative and the data will be gone:
     */
    if (s.strstart - s.block_start >= (s.w_size - MIN_LOOKAHEAD)) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }

  s.insert = 0;

  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }

  if (s.strstart > s.block_start) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_NEED_MORE;
}

/* ===========================================================================
 * Compress as much as possible from the input stream, return the current
 * block state.
 * This function does not perform lazy evaluation of matches and inserts
 * new strings in the dictionary only for unmatched strings or for short
 * matches. It is used only for the fast compression options.
 */
function deflate_fast(s, flush) {
  var hash_head;        /* head of the hash chain */
  var bflush;           /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break; /* flush the current block */
      }
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     * At this point we have always match_length < MIN_MATCH
     */
    if (hash_head !== 0/*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */
    }
    if (s.match_length >= MIN_MATCH) {
      // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

      /*** _tr_tally_dist(s, s.strstart - s.match_start,
                     s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;

      /* Insert new strings in the hash table only if the match length
       * is not too large. This saves time but degrades compression.
       */
      if (s.match_length <= s.max_lazy_match/*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
        s.match_length--; /* string at strstart already in table */
        do {
          s.strstart++;
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
          /* strstart never exceeds WSIZE-MAX_MATCH, so there are
           * always MIN_MATCH bytes ahead.
           */
        } while (--s.match_length !== 0);
        s.strstart++;
      } else
      {
        s.strstart += s.match_length;
        s.match_length = 0;
        s.ins_h = s.window[s.strstart];
        /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) & s.hash_mask;

//#if MIN_MATCH != 3
//                Call UPDATE_HASH() MIN_MATCH-3 more times
//#endif
        /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
         * matter since it will be recomputed at next deflate call.
         */
      }
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s.window[s.strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = ((s.strstart < (MIN_MATCH - 1)) ? s.strstart : MIN_MATCH - 1);
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * Same as above, but achieves better compression. We use a lazy
 * evaluation for matches: a match is finally adopted only if there is
 * no better match at the next window position.
 */
function deflate_slow(s, flush) {
  var hash_head;          /* head of hash chain */
  var bflush;              /* set if current block must be flushed */

  var max_insert;

  /* Process the input block. */
  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     */
    s.prev_length = s.match_length;
    s.prev_match = s.match_start;
    s.match_length = MIN_MATCH - 1;

    if (hash_head !== 0/*NIL*/ && s.prev_length < s.max_lazy_match &&
        s.strstart - hash_head <= (s.w_size - MIN_LOOKAHEAD)/*MAX_DIST(s)*/) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */

      if (s.match_length <= 5 &&
         (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096/*TOO_FAR*/))) {

        /* If prev_match is also MIN_MATCH, match_start is garbage
         * but we will ignore the current match anyway.
         */
        s.match_length = MIN_MATCH - 1;
      }
    }
    /* If there was a match at the previous step and the current
     * match is not better, output the previous match:
     */
    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
      max_insert = s.strstart + s.lookahead - MIN_MATCH;
      /* Do not insert strings in hash table beyond this. */

      //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

      /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
                     s.prev_length - MIN_MATCH, bflush);***/
      bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
      /* Insert in hash table all strings up to the end of the match.
       * strstart-1 and strstart are already inserted. If there is not
       * enough lookahead, the last two strings are not inserted in
       * the hash table.
       */
      s.lookahead -= s.prev_length - 1;
      s.prev_length -= 2;
      do {
        if (++s.strstart <= max_insert) {
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
        }
      } while (--s.prev_length !== 0);
      s.match_available = 0;
      s.match_length = MIN_MATCH - 1;
      s.strstart++;

      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }

    } else if (s.match_available) {
      /* If there was no match at the previous position, output a
       * single literal. If there was a match but the current match
       * is longer, truncate the previous match to a single literal.
       */
      //Tracevv((stderr,"%c", s->window[s->strstart-1]));
      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

      if (bflush) {
        /*** FLUSH_BLOCK_ONLY(s, 0) ***/
        flush_block_only(s, false);
        /***/
      }
      s.strstart++;
      s.lookahead--;
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      /* There is no previous match to compare with, wait for
       * the next step to decide.
       */
      s.match_available = 1;
      s.strstart++;
      s.lookahead--;
    }
  }
  //Assert (flush != Z_NO_FLUSH, "no flush?");
  if (s.match_available) {
    //Tracevv((stderr,"%c", s->window[s->strstart-1]));
    /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

    s.match_available = 0;
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_BLOCK_DONE;
}


/* ===========================================================================
 * For Z_RLE, simply look for runs of bytes, generate matches only of distance
 * one.  Do not maintain a hash table.  (It will be regenerated if this run of
 * deflate switches away from Z_RLE.)
 */
function deflate_rle(s, flush) {
  var bflush;            /* set if current block must be flushed */
  var prev;              /* byte at distance one to match */
  var scan, strend;      /* scan goes up to strend for length of run */

  var _win = s.window;

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the longest run, plus one for the unrolled loop.
     */
    if (s.lookahead <= MAX_MATCH) {
      fill_window(s);
      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* See how many times the previous byte repeats */
    s.match_length = 0;
    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
      scan = s.strstart - 1;
      prev = _win[scan];
      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s.strstart + MAX_MATCH;
        do {
          /*jshint noempty:false*/
        } while (prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 scan < strend);
        s.match_length = MAX_MATCH - (strend - scan);
        if (s.match_length > s.lookahead) {
          s.match_length = s.lookahead;
        }
      }
      //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
    }

    /* Emit match if have run of MIN_MATCH or longer, else emit literal */
    if (s.match_length >= MIN_MATCH) {
      //check_match(s, s.strstart, s.strstart - 1, s.match_length);

      /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;
      s.strstart += s.match_length;
      s.match_length = 0;
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s->window[s->strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
 * (It will be regenerated if this run of deflate switches away from Huffman.)
 */
function deflate_huff(s, flush) {
  var bflush;             /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we have a literal to write. */
    if (s.lookahead === 0) {
      fill_window(s);
      if (s.lookahead === 0) {
        if (flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        break;      /* flush the current block */
      }
    }

    /* Output a literal byte */
    s.match_length = 0;
    //Tracevv((stderr,"%c", s->window[s->strstart]));
    /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
    s.lookahead--;
    s.strstart++;
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* Values for max_lazy_match, good_match and max_chain_length, depending on
 * the desired pack level (0..9). The values given below have been tuned to
 * exclude worst case performance for pathological files. Better values may be
 * found for specific files.
 */
function Config(good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
}

var configuration_table;

configuration_table = [
  /*      good lazy nice chain */
  new Config(0, 0, 0, 0, deflate_stored),          /* 0 store only */
  new Config(4, 4, 8, 4, deflate_fast),            /* 1 max speed, no lazy matches */
  new Config(4, 5, 16, 8, deflate_fast),           /* 2 */
  new Config(4, 6, 32, 32, deflate_fast),          /* 3 */

  new Config(4, 4, 16, 16, deflate_slow),          /* 4 lazy matches */
  new Config(8, 16, 32, 32, deflate_slow),         /* 5 */
  new Config(8, 16, 128, 128, deflate_slow),       /* 6 */
  new Config(8, 32, 128, 256, deflate_slow),       /* 7 */
  new Config(32, 128, 258, 1024, deflate_slow),    /* 8 */
  new Config(32, 258, 258, 4096, deflate_slow)     /* 9 max compression */
];


/* ===========================================================================
 * Initialize the "longest match" routines for a new zlib stream
 */
function lm_init(s) {
  s.window_size = 2 * s.w_size;

  /*** CLEAR_HASH(s); ***/
  zero(s.head); // Fill with NIL (= 0);

  /* Set the default configuration parameters:
   */
  s.max_lazy_match = configuration_table[s.level].max_lazy;
  s.good_match = configuration_table[s.level].good_length;
  s.nice_match = configuration_table[s.level].nice_length;
  s.max_chain_length = configuration_table[s.level].max_chain;

  s.strstart = 0;
  s.block_start = 0;
  s.lookahead = 0;
  s.insert = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  s.ins_h = 0;
}


function DeflateState() {
  this.strm = null;            /* pointer back to this zlib stream */
  this.status = 0;            /* as the name implies */
  this.pending_buf = null;      /* output still pending */
  this.pending_buf_size = 0;  /* size of pending_buf */
  this.pending_out = 0;       /* next pending byte to output to the stream */
  this.pending = 0;           /* nb of bytes in the pending buffer */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.gzhead = null;         /* gzip header information to write */
  this.gzindex = 0;           /* where in extra, name, or comment */
  this.method = Z_DEFLATED; /* can only be DEFLATED */
  this.last_flush = -1;   /* value of flush param for previous deflate call */

  this.w_size = 0;  /* LZ77 window size (32K by default) */
  this.w_bits = 0;  /* log2(w_size)  (8..16) */
  this.w_mask = 0;  /* w_size - 1 */

  this.window = null;
  /* Sliding window. Input bytes are read into the second half of the window,
   * and move to the first half later to keep a dictionary of at least wSize
   * bytes. With this organization, matches are limited to a distance of
   * wSize-MAX_MATCH bytes, but this ensures that IO is always
   * performed with a length multiple of the block size.
   */

  this.window_size = 0;
  /* Actual size of window: 2*wSize, except when the user input buffer
   * is directly used as sliding window.
   */

  this.prev = null;
  /* Link to older string with same hash index. To limit the size of this
   * array to 64K, this link is maintained only for the last 32K strings.
   * An index in this array is thus a window index modulo 32K.
   */

  this.head = null;   /* Heads of the hash chains or NIL. */

  this.ins_h = 0;       /* hash index of string to be inserted */
  this.hash_size = 0;   /* number of elements in hash table */
  this.hash_bits = 0;   /* log2(hash_size) */
  this.hash_mask = 0;   /* hash_size-1 */

  this.hash_shift = 0;
  /* Number of bits by which ins_h must be shifted at each input
   * step. It must be such that after MIN_MATCH steps, the oldest
   * byte no longer takes part in the hash key, that is:
   *   hash_shift * MIN_MATCH >= hash_bits
   */

  this.block_start = 0;
  /* Window position at the beginning of the current output block. Gets
   * negative when the window is moved backwards.
   */

  this.match_length = 0;      /* length of best match */
  this.prev_match = 0;        /* previous match */
  this.match_available = 0;   /* set if previous match exists */
  this.strstart = 0;          /* start of string to insert */
  this.match_start = 0;       /* start of matching string */
  this.lookahead = 0;         /* number of valid bytes ahead in window */

  this.prev_length = 0;
  /* Length of the best match at previous step. Matches not greater than this
   * are discarded. This is used in the lazy match evaluation.
   */

  this.max_chain_length = 0;
  /* To speed up deflation, hash chains are never searched beyond this
   * length.  A higher limit improves compression ratio but degrades the
   * speed.
   */

  this.max_lazy_match = 0;
  /* Attempt to find a better match only when the current match is strictly
   * smaller than this value. This mechanism is used only for compression
   * levels >= 4.
   */
  // That's alias to max_lazy_match, don't use directly
  //this.max_insert_length = 0;
  /* Insert new strings in the hash table only if the match length is not
   * greater than this length. This saves time but degrades compression.
   * max_insert_length is used only for compression levels <= 3.
   */

  this.level = 0;     /* compression level (1..9) */
  this.strategy = 0;  /* favor or force Huffman coding*/

  this.good_match = 0;
  /* Use a faster search when the previous match is longer than this */

  this.nice_match = 0; /* Stop searching when current match exceeds this */

              /* used by trees.c: */

  /* Didn't use ct_data typedef below to suppress compiler warning */

  // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
  // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
  // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

  // Use flat array of DOUBLE size, with interleaved fata,
  // because JS does not support effective
  this.dyn_ltree  = new utils.Buf16(HEAP_SIZE * 2);
  this.dyn_dtree  = new utils.Buf16((2 * D_CODES + 1) * 2);
  this.bl_tree    = new utils.Buf16((2 * BL_CODES + 1) * 2);
  zero(this.dyn_ltree);
  zero(this.dyn_dtree);
  zero(this.bl_tree);

  this.l_desc   = null;         /* desc. for literal tree */
  this.d_desc   = null;         /* desc. for distance tree */
  this.bl_desc  = null;         /* desc. for bit length tree */

  //ush bl_count[MAX_BITS+1];
  this.bl_count = new utils.Buf16(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */

  //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
  this.heap = new utils.Buf16(2 * L_CODES + 1);  /* heap used to build the Huffman trees */
  zero(this.heap);

  this.heap_len = 0;               /* number of elements in the heap */
  this.heap_max = 0;               /* element of largest frequency */
  /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
   * The same heap array is used to build all trees.
   */

  this.depth = new utils.Buf16(2 * L_CODES + 1); //uch depth[2*L_CODES+1];
  zero(this.depth);
  /* Depth of each subtree used as tie breaker for trees of equal frequency
   */

  this.l_buf = 0;          /* buffer index for literals or lengths */

  this.lit_bufsize = 0;
  /* Size of match buffer for literals/lengths.  There are 4 reasons for
   * limiting lit_bufsize to 64K:
   *   - frequencies can be kept in 16 bit counters
   *   - if compression is not successful for the first block, all input
   *     data is still in the window so we can still emit a stored block even
   *     when input comes from standard input.  (This can also be done for
   *     all blocks if lit_bufsize is not greater than 32K.)
   *   - if compression is not successful for a file smaller than 64K, we can
   *     even emit a stored file instead of a stored block (saving 5 bytes).
   *     This is applicable only for zip (not gzip or zlib).
   *   - creating new Huffman trees less frequently may not provide fast
   *     adaptation to changes in the input data statistics. (Take for
   *     example a binary file with poorly compressible code followed by
   *     a highly compressible string table.) Smaller buffer sizes give
   *     fast adaptation but have of course the overhead of transmitting
   *     trees more frequently.
   *   - I can't count above 4
   */

  this.last_lit = 0;      /* running index in l_buf */

  this.d_buf = 0;
  /* Buffer index for distances. To simplify the code, d_buf and l_buf have
   * the same number of elements. To use different lengths, an extra flag
   * array would be necessary.
   */

  this.opt_len = 0;       /* bit length of current block with optimal trees */
  this.static_len = 0;    /* bit length of current block with static trees */
  this.matches = 0;       /* number of string matches in current block */
  this.insert = 0;        /* bytes at end of window left to insert */


  this.bi_buf = 0;
  /* Output buffer. bits are inserted starting at the bottom (least
   * significant bits).
   */
  this.bi_valid = 0;
  /* Number of valid bits in bi_buf.  All bits above the last valid bit
   * are always zero.
   */

  // Used for window memory init. We safely ignore it for JS. That makes
  // sense only for pointers and memory check tools.
  //this.high_water = 0;
  /* High water mark offset in window for initialized bytes -- bytes above
   * this are set to zero in order to avoid memory check warnings when
   * longest match routines access bytes past the input.  This is then
   * updated to the new high water mark.
   */
}


function deflateResetKeep(strm) {
  var s;

  if (!strm || !strm.state) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN;

  s = strm.state;
  s.pending = 0;
  s.pending_out = 0;

  if (s.wrap < 0) {
    s.wrap = -s.wrap;
    /* was made negative by deflate(..., Z_FINISH); */
  }
  s.status = (s.wrap ? INIT_STATE : BUSY_STATE);
  strm.adler = (s.wrap === 2) ?
    0  // crc32(0, Z_NULL, 0)
  :
    1; // adler32(0, Z_NULL, 0)
  s.last_flush = Z_NO_FLUSH;
  trees._tr_init(s);
  return Z_OK;
}


function deflateReset(strm) {
  var ret = deflateResetKeep(strm);
  if (ret === Z_OK) {
    lm_init(strm.state);
  }
  return ret;
}


function deflateSetHeader(strm, head) {
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  if (strm.state.wrap !== 2) { return Z_STREAM_ERROR; }
  strm.state.gzhead = head;
  return Z_OK;
}


function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
  if (!strm) { // === Z_NULL
    return Z_STREAM_ERROR;
  }
  var wrap = 1;

  if (level === Z_DEFAULT_COMPRESSION) {
    level = 6;
  }

  if (windowBits < 0) { /* suppress zlib wrapper */
    wrap = 0;
    windowBits = -windowBits;
  }

  else if (windowBits > 15) {
    wrap = 2;           /* write gzip wrapper instead */
    windowBits -= 16;
  }


  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED ||
    windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
    strategy < 0 || strategy > Z_FIXED) {
    return err(strm, Z_STREAM_ERROR);
  }


  if (windowBits === 8) {
    windowBits = 9;
  }
  /* until 256-byte window bug fixed */

  var s = new DeflateState();

  strm.state = s;
  s.strm = strm;

  s.wrap = wrap;
  s.gzhead = null;
  s.w_bits = windowBits;
  s.w_size = 1 << s.w_bits;
  s.w_mask = s.w_size - 1;

  s.hash_bits = memLevel + 7;
  s.hash_size = 1 << s.hash_bits;
  s.hash_mask = s.hash_size - 1;
  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);

  s.window = new utils.Buf8(s.w_size * 2);
  s.head = new utils.Buf16(s.hash_size);
  s.prev = new utils.Buf16(s.w_size);

  // Don't need mem init magic for JS.
  //s.high_water = 0;  /* nothing written to s->window yet */

  s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */

  s.pending_buf_size = s.lit_bufsize * 4;

  //overlay = (ushf *) ZALLOC(strm, s->lit_bufsize, sizeof(ush)+2);
  //s->pending_buf = (uchf *) overlay;
  s.pending_buf = new utils.Buf8(s.pending_buf_size);

  // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)
  //s->d_buf = overlay + s->lit_bufsize/sizeof(ush);
  s.d_buf = 1 * s.lit_bufsize;

  //s->l_buf = s->pending_buf + (1+sizeof(ush))*s->lit_bufsize;
  s.l_buf = (1 + 2) * s.lit_bufsize;

  s.level = level;
  s.strategy = strategy;
  s.method = method;

  return deflateReset(strm);
}

function deflateInit(strm, level) {
  return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
}


function deflate(strm, flush) {
  var old_flush, s;
  var beg, val; // for gzip header write only

  if (!strm || !strm.state ||
    flush > Z_BLOCK || flush < 0) {
    return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
  }

  s = strm.state;

  if (!strm.output ||
      (!strm.input && strm.avail_in !== 0) ||
      (s.status === FINISH_STATE && flush !== Z_FINISH)) {
    return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR : Z_STREAM_ERROR);
  }

  s.strm = strm; /* just in case */
  old_flush = s.last_flush;
  s.last_flush = flush;

  /* Write the header */
  if (s.status === INIT_STATE) {

    if (s.wrap === 2) { // GZIP header
      strm.adler = 0;  //crc32(0L, Z_NULL, 0);
      put_byte(s, 31);
      put_byte(s, 139);
      put_byte(s, 8);
      if (!s.gzhead) { // s->gzhead == Z_NULL
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, OS_CODE);
        s.status = BUSY_STATE;
      }
      else {
        put_byte(s, (s.gzhead.text ? 1 : 0) +
                    (s.gzhead.hcrc ? 2 : 0) +
                    (!s.gzhead.extra ? 0 : 4) +
                    (!s.gzhead.name ? 0 : 8) +
                    (!s.gzhead.comment ? 0 : 16)
        );
        put_byte(s, s.gzhead.time & 0xff);
        put_byte(s, (s.gzhead.time >> 8) & 0xff);
        put_byte(s, (s.gzhead.time >> 16) & 0xff);
        put_byte(s, (s.gzhead.time >> 24) & 0xff);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, s.gzhead.os & 0xff);
        if (s.gzhead.extra && s.gzhead.extra.length) {
          put_byte(s, s.gzhead.extra.length & 0xff);
          put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
        }
        if (s.gzhead.hcrc) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
        }
        s.gzindex = 0;
        s.status = EXTRA_STATE;
      }
    }
    else // DEFLATE header
    {
      var header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8;
      var level_flags = -1;

      if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
        level_flags = 0;
      } else if (s.level < 6) {
        level_flags = 1;
      } else if (s.level === 6) {
        level_flags = 2;
      } else {
        level_flags = 3;
      }
      header |= (level_flags << 6);
      if (s.strstart !== 0) { header |= PRESET_DICT; }
      header += 31 - (header % 31);

      s.status = BUSY_STATE;
      putShortMSB(s, header);

      /* Save the adler32 of the preset dictionary: */
      if (s.strstart !== 0) {
        putShortMSB(s, strm.adler >>> 16);
        putShortMSB(s, strm.adler & 0xffff);
      }
      strm.adler = 1; // adler32(0L, Z_NULL, 0);
    }
  }

//#ifdef GZIP
  if (s.status === EXTRA_STATE) {
    if (s.gzhead.extra/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */

      while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            break;
          }
        }
        put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
        s.gzindex++;
      }
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (s.gzindex === s.gzhead.extra.length) {
        s.gzindex = 0;
        s.status = NAME_STATE;
      }
    }
    else {
      s.status = NAME_STATE;
    }
  }
  if (s.status === NAME_STATE) {
    if (s.gzhead.name/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.name.length) {
          val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.gzindex = 0;
        s.status = COMMENT_STATE;
      }
    }
    else {
      s.status = COMMENT_STATE;
    }
  }
  if (s.status === COMMENT_STATE) {
    if (s.gzhead.comment/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.comment.length) {
          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.status = HCRC_STATE;
      }
    }
    else {
      s.status = HCRC_STATE;
    }
  }
  if (s.status === HCRC_STATE) {
    if (s.gzhead.hcrc) {
      if (s.pending + 2 > s.pending_buf_size) {
        flush_pending(strm);
      }
      if (s.pending + 2 <= s.pending_buf_size) {
        put_byte(s, strm.adler & 0xff);
        put_byte(s, (strm.adler >> 8) & 0xff);
        strm.adler = 0; //crc32(0L, Z_NULL, 0);
        s.status = BUSY_STATE;
      }
    }
    else {
      s.status = BUSY_STATE;
    }
  }
//#endif

  /* Flush as much pending output as possible */
  if (s.pending !== 0) {
    flush_pending(strm);
    if (strm.avail_out === 0) {
      /* Since avail_out is 0, deflate will be called again with
       * more output space, but possibly with both pending and
       * avail_in equal to zero. There won't be anything to do,
       * but this is not an error situation so make sure we
       * return OK instead of BUF_ERROR at next call of deflate:
       */
      s.last_flush = -1;
      return Z_OK;
    }

    /* Make sure there is something to do and avoid duplicate consecutive
     * flushes. For repeated and useless calls with Z_FINISH, we keep
     * returning Z_STREAM_END instead of Z_BUF_ERROR.
     */
  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
    flush !== Z_FINISH) {
    return err(strm, Z_BUF_ERROR);
  }

  /* User must not provide more input after the first FINISH: */
  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
    return err(strm, Z_BUF_ERROR);
  }

  /* Start a new block or continue the current one.
   */
  if (strm.avail_in !== 0 || s.lookahead !== 0 ||
    (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)) {
    var bstate = (s.strategy === Z_HUFFMAN_ONLY) ? deflate_huff(s, flush) :
      (s.strategy === Z_RLE ? deflate_rle(s, flush) :
        configuration_table[s.level].func(s, flush));

    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s.status = FINISH_STATE;
    }
    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        /* avoid BUF_ERROR next call, see above */
      }
      return Z_OK;
      /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
       * of deflate should use the same flush parameter to make sure
       * that the flush is complete. So we don't have to output an
       * empty block here, this will be done at next call. This also
       * ensures that for a very small output buffer, we emit at most
       * one empty block.
       */
    }
    if (bstate === BS_BLOCK_DONE) {
      if (flush === Z_PARTIAL_FLUSH) {
        trees._tr_align(s);
      }
      else if (flush !== Z_BLOCK) { /* FULL_FLUSH or SYNC_FLUSH */

        trees._tr_stored_block(s, 0, 0, false);
        /* For a full flush, this empty block will be recognized
         * as a special marker by inflate_sync().
         */
        if (flush === Z_FULL_FLUSH) {
          /*** CLEAR_HASH(s); ***/             /* forget history */
          zero(s.head); // Fill with NIL (= 0);

          if (s.lookahead === 0) {
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
        }
      }
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
        return Z_OK;
      }
    }
  }
  //Assert(strm->avail_out > 0, "bug2");
  //if (strm.avail_out <= 0) { throw new Error("bug2");}

  if (flush !== Z_FINISH) { return Z_OK; }
  if (s.wrap <= 0) { return Z_STREAM_END; }

  /* Write the trailer */
  if (s.wrap === 2) {
    put_byte(s, strm.adler & 0xff);
    put_byte(s, (strm.adler >> 8) & 0xff);
    put_byte(s, (strm.adler >> 16) & 0xff);
    put_byte(s, (strm.adler >> 24) & 0xff);
    put_byte(s, strm.total_in & 0xff);
    put_byte(s, (strm.total_in >> 8) & 0xff);
    put_byte(s, (strm.total_in >> 16) & 0xff);
    put_byte(s, (strm.total_in >> 24) & 0xff);
  }
  else
  {
    putShortMSB(s, strm.adler >>> 16);
    putShortMSB(s, strm.adler & 0xffff);
  }

  flush_pending(strm);
  /* If avail_out is zero, the application will call deflate again
   * to flush the rest.
   */
  if (s.wrap > 0) { s.wrap = -s.wrap; }
  /* write the trailer only once! */
  return s.pending !== 0 ? Z_OK : Z_STREAM_END;
}

function deflateEnd(strm) {
  var status;

  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
    return Z_STREAM_ERROR;
  }

  status = strm.state.status;
  if (status !== INIT_STATE &&
    status !== EXTRA_STATE &&
    status !== NAME_STATE &&
    status !== COMMENT_STATE &&
    status !== HCRC_STATE &&
    status !== BUSY_STATE &&
    status !== FINISH_STATE
  ) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.state = null;

  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
}


/* =========================================================================
 * Initializes the compression dictionary from the given byte
 * sequence without producing any compressed output.
 */
function deflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;

  var s;
  var str, n;
  var wrap;
  var avail;
  var next;
  var input;
  var tmpDict;

  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
    return Z_STREAM_ERROR;
  }

  s = strm.state;
  wrap = s.wrap;

  if (wrap === 2 || (wrap === 1 && s.status !== INIT_STATE) || s.lookahead) {
    return Z_STREAM_ERROR;
  }

  /* when using zlib wrappers, compute Adler-32 for provided dictionary */
  if (wrap === 1) {
    /* adler32(strm->adler, dictionary, dictLength); */
    strm.adler = adler32(strm.adler, dictionary, dictLength, 0);
  }

  s.wrap = 0;   /* avoid computing Adler-32 in read_buf */

  /* if dictionary would fill window, just replace the history */
  if (dictLength >= s.w_size) {
    if (wrap === 0) {            /* already empty otherwise */
      /*** CLEAR_HASH(s); ***/
      zero(s.head); // Fill with NIL (= 0);
      s.strstart = 0;
      s.block_start = 0;
      s.insert = 0;
    }
    /* use the tail */
    // dictionary = dictionary.slice(dictLength - s.w_size);
    tmpDict = new utils.Buf8(s.w_size);
    utils.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
    dictionary = tmpDict;
    dictLength = s.w_size;
  }
  /* insert dictionary into window and hash */
  avail = strm.avail_in;
  next = strm.next_in;
  input = strm.input;
  strm.avail_in = dictLength;
  strm.next_in = 0;
  strm.input = dictionary;
  fill_window(s);
  while (s.lookahead >= MIN_MATCH) {
    str = s.strstart;
    n = s.lookahead - (MIN_MATCH - 1);
    do {
      /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

      s.prev[str & s.w_mask] = s.head[s.ins_h];

      s.head[s.ins_h] = str;
      str++;
    } while (--n);
    s.strstart = str;
    s.lookahead = MIN_MATCH - 1;
    fill_window(s);
  }
  s.strstart += s.lookahead;
  s.block_start = s.strstart;
  s.insert = s.lookahead;
  s.lookahead = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  strm.next_in = next;
  strm.input = input;
  strm.avail_in = avail;
  s.wrap = wrap;
  return Z_OK;
}


exports.deflateInit = deflateInit;
exports.deflateInit2 = deflateInit2;
exports.deflateReset = deflateReset;
exports.deflateResetKeep = deflateResetKeep;
exports.deflateSetHeader = deflateSetHeader;
exports.deflate = deflate;
exports.deflateEnd = deflateEnd;
exports.deflateSetDictionary = deflateSetDictionary;
exports.deflateInfo = 'pako deflate (from Nodeca project)';

/* Not implemented
exports.deflateBound = deflateBound;
exports.deflateCopy = deflateCopy;
exports.deflateParams = deflateParams;
exports.deflatePending = deflatePending;
exports.deflatePrime = deflatePrime;
exports.deflateTune = deflateTune;
*/


/***/ }),

/***/ "./node_modules/pako/lib/zlib/gzheader.js":
/*!************************************************!*\
  !*** ./node_modules/pako/lib/zlib/gzheader.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function GZheader() {
  /* true if compressed data believed to be text */
  this.text       = 0;
  /* modification time */
  this.time       = 0;
  /* extra flags (not used when writing a gzip file) */
  this.xflags     = 0;
  /* operating system */
  this.os         = 0;
  /* pointer to extra field or Z_NULL if none */
  this.extra      = null;
  /* extra field length (valid if extra != Z_NULL) */
  this.extra_len  = 0; // Actually, we don't need it in JS,
                       // but leave for few code modifications

  //
  // Setup limits is not necessary because in js we should not preallocate memory
  // for inflate use constant limit in 65536 bytes
  //

  /* space at extra (only when reading header) */
  // this.extra_max  = 0;
  /* pointer to zero-terminated file name or Z_NULL */
  this.name       = '';
  /* space at name (only when reading header) */
  // this.name_max   = 0;
  /* pointer to zero-terminated comment or Z_NULL */
  this.comment    = '';
  /* space at comment (only when reading header) */
  // this.comm_max   = 0;
  /* true if there was or will be a header crc */
  this.hcrc       = 0;
  /* true when done reading gzip header (not used when writing a gzip file) */
  this.done       = false;
}

module.exports = GZheader;


/***/ }),

/***/ "./node_modules/pako/lib/zlib/inffast.js":
/*!***********************************************!*\
  !*** ./node_modules/pako/lib/zlib/inffast.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

// See state defs from inflate.js
var BAD = 30;       /* got a data error -- remain here until reset */
var TYPE = 12;      /* i: waiting for type bits, including last-flag bit */

/*
   Decode literal, length, and distance codes and write out the resulting
   literal and match bytes until either not enough input or output is
   available, an end-of-block is encountered, or a data error is encountered.
   When large enough input and output buffers are supplied to inflate(), for
   example, a 16K input buffer and a 64K output buffer, more than 95% of the
   inflate execution time is spent in this routine.

   Entry assumptions:

        state.mode === LEN
        strm.avail_in >= 6
        strm.avail_out >= 258
        start >= strm.avail_out
        state.bits < 8

   On return, state.mode is one of:

        LEN -- ran out of enough output space or enough available input
        TYPE -- reached end of block code, inflate() to interpret next block
        BAD -- error in block data

   Notes:

    - The maximum input bits used by a length/distance pair is 15 bits for the
      length code, 5 bits for the length extra, 15 bits for the distance code,
      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
      Therefore if strm.avail_in >= 6, then there is enough input to avoid
      checking for available input while decoding.

    - The maximum bytes that a single length/distance pair can output is 258
      bytes, which is the maximum length that can be coded.  inflate_fast()
      requires strm.avail_out >= 258 for each loop to avoid checking for
      output space.
 */
module.exports = function inflate_fast(strm, start) {
  var state;
  var _in;                    /* local strm.input */
  var last;                   /* have enough input while in < last */
  var _out;                   /* local strm.output */
  var beg;                    /* inflate()'s initial strm.output */
  var end;                    /* while out < end, enough space available */
//#ifdef INFLATE_STRICT
  var dmax;                   /* maximum distance from zlib header */
//#endif
  var wsize;                  /* window size or zero if not using window */
  var whave;                  /* valid bytes in the window */
  var wnext;                  /* window write index */
  // Use `s_window` instead `window`, avoid conflict with instrumentation tools
  var s_window;               /* allocated sliding window, if wsize != 0 */
  var hold;                   /* local strm.hold */
  var bits;                   /* local strm.bits */
  var lcode;                  /* local strm.lencode */
  var dcode;                  /* local strm.distcode */
  var lmask;                  /* mask for first level of length codes */
  var dmask;                  /* mask for first level of distance codes */
  var here;                   /* retrieved table entry */
  var op;                     /* code bits, operation, extra bits, or */
                              /*  window position, window bytes to copy */
  var len;                    /* match length, unused bytes */
  var dist;                   /* match distance */
  var from;                   /* where to copy match from */
  var from_source;


  var input, output; // JS specific, because we have no pointers

  /* copy state to local variables */
  state = strm.state;
  //here = state.here;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257);
//#ifdef INFLATE_STRICT
  dmax = state.dmax;
//#endif
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  s_window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;


  /* decode literals and length/distances until end-of-block or not enough
     input data or output space */

  top:
  do {
    if (bits < 15) {
      hold += input[_in++] << bits;
      bits += 8;
      hold += input[_in++] << bits;
      bits += 8;
    }

    here = lcode[hold & lmask];

    dolen:
    for (;;) { // Goto emulation
      op = here >>> 24/*here.bits*/;
      hold >>>= op;
      bits -= op;
      op = (here >>> 16) & 0xff/*here.op*/;
      if (op === 0) {                          /* literal */
        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
        //        "inflate:         literal '%c'\n" :
        //        "inflate:         literal 0x%02x\n", here.val));
        output[_out++] = here & 0xffff/*here.val*/;
      }
      else if (op & 16) {                     /* length base */
        len = here & 0xffff/*here.val*/;
        op &= 15;                           /* number of extra bits */
        if (op) {
          if (bits < op) {
            hold += input[_in++] << bits;
            bits += 8;
          }
          len += hold & ((1 << op) - 1);
          hold >>>= op;
          bits -= op;
        }
        //Tracevv((stderr, "inflate:         length %u\n", len));
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }
        here = dcode[hold & dmask];

        dodist:
        for (;;) { // goto emulation
          op = here >>> 24/*here.bits*/;
          hold >>>= op;
          bits -= op;
          op = (here >>> 16) & 0xff/*here.op*/;

          if (op & 16) {                      /* distance base */
            dist = here & 0xffff/*here.val*/;
            op &= 15;                       /* number of extra bits */
            if (bits < op) {
              hold += input[_in++] << bits;
              bits += 8;
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
            }
            dist += hold & ((1 << op) - 1);
//#ifdef INFLATE_STRICT
            if (dist > dmax) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break top;
            }
//#endif
            hold >>>= op;
            bits -= op;
            //Tracevv((stderr, "inflate:         distance %u\n", dist));
            op = _out - beg;                /* max distance in output */
            if (dist > op) {                /* see if copy from window */
              op = dist - op;               /* distance back in window */
              if (op > whave) {
                if (state.sane) {
                  strm.msg = 'invalid distance too far back';
                  state.mode = BAD;
                  break top;
                }

// (!) This block is disabled in zlib defaults,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//                if (len <= op - whave) {
//                  do {
//                    output[_out++] = 0;
//                  } while (--len);
//                  continue top;
//                }
//                len -= op - whave;
//                do {
//                  output[_out++] = 0;
//                } while (--op > whave);
//                if (op === 0) {
//                  from = _out - dist;
//                  do {
//                    output[_out++] = output[from++];
//                  } while (--len);
//                  continue top;
//                }
//#endif
              }
              from = 0; // window index
              from_source = s_window;
              if (wnext === 0) {           /* very common case */
                from += wsize - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              else if (wnext < op) {      /* wrap around window */
                from += wsize + wnext - op;
                op -= wnext;
                if (op < len) {         /* some from end of window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = 0;
                  if (wnext < len) {  /* some from start of window */
                    op = wnext;
                    len -= op;
                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);
                    from = _out - dist;      /* rest from output */
                    from_source = output;
                  }
                }
              }
              else {                      /* contiguous in window */
                from += wnext - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              while (len > 2) {
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                len -= 3;
              }
              if (len) {
                output[_out++] = from_source[from++];
                if (len > 1) {
                  output[_out++] = from_source[from++];
                }
              }
            }
            else {
              from = _out - dist;          /* copy direct from output */
              do {                        /* minimum length is three */
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                len -= 3;
              } while (len > 2);
              if (len) {
                output[_out++] = output[from++];
                if (len > 1) {
                  output[_out++] = output[from++];
                }
              }
            }
          }
          else if ((op & 64) === 0) {          /* 2nd level distance code */
            here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
            continue dodist;
          }
          else {
            strm.msg = 'invalid distance code';
            state.mode = BAD;
            break top;
          }

          break; // need to emulate goto via "continue"
        }
      }
      else if ((op & 64) === 0) {              /* 2nd level length code */
        here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
        continue dolen;
      }
      else if (op & 32) {                     /* end-of-block */
        //Tracevv((stderr, "inflate:         end of block\n"));
        state.mode = TYPE;
        break top;
      }
      else {
        strm.msg = 'invalid literal/length code';
        state.mode = BAD;
        break top;
      }

      break; // need to emulate goto via "continue"
    }
  } while (_in < last && _out < end);

  /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;

  /* update state and return */
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
  strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
  state.hold = hold;
  state.bits = bits;
  return;
};


/***/ }),

/***/ "./node_modules/pako/lib/zlib/inflate.js":
/*!***********************************************!*\
  !*** ./node_modules/pako/lib/zlib/inflate.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils         = __webpack_require__(/*! ../utils/common */ "./node_modules/pako/lib/utils/common.js");
var adler32       = __webpack_require__(/*! ./adler32 */ "./node_modules/pako/lib/zlib/adler32.js");
var crc32         = __webpack_require__(/*! ./crc32 */ "./node_modules/pako/lib/zlib/crc32.js");
var inflate_fast  = __webpack_require__(/*! ./inffast */ "./node_modules/pako/lib/zlib/inffast.js");
var inflate_table = __webpack_require__(/*! ./inftrees */ "./node_modules/pako/lib/zlib/inftrees.js");

var CODES = 0;
var LENS = 1;
var DISTS = 2;

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
//var Z_NO_FLUSH      = 0;
//var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
//var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;

/* The deflate compression method */
var Z_DEFLATED  = 8;


/* STATES ====================================================================*/
/* ===========================================================================*/


var    HEAD = 1;       /* i: waiting for magic header */
var    FLAGS = 2;      /* i: waiting for method and flags (gzip) */
var    TIME = 3;       /* i: waiting for modification time (gzip) */
var    OS = 4;         /* i: waiting for extra flags and operating system (gzip) */
var    EXLEN = 5;      /* i: waiting for extra length (gzip) */
var    EXTRA = 6;      /* i: waiting for extra bytes (gzip) */
var    NAME = 7;       /* i: waiting for end of file name (gzip) */
var    COMMENT = 8;    /* i: waiting for end of comment (gzip) */
var    HCRC = 9;       /* i: waiting for header crc (gzip) */
var    DICTID = 10;    /* i: waiting for dictionary check value */
var    DICT = 11;      /* waiting for inflateSetDictionary() call */
var        TYPE = 12;      /* i: waiting for type bits, including last-flag bit */
var        TYPEDO = 13;    /* i: same, but skip check to exit inflate on new block */
var        STORED = 14;    /* i: waiting for stored size (length and complement) */
var        COPY_ = 15;     /* i/o: same as COPY below, but only first time in */
var        COPY = 16;      /* i/o: waiting for input or output to copy stored block */
var        TABLE = 17;     /* i: waiting for dynamic block table lengths */
var        LENLENS = 18;   /* i: waiting for code length code lengths */
var        CODELENS = 19;  /* i: waiting for length/lit and distance code lengths */
var            LEN_ = 20;      /* i: same as LEN below, but only first time in */
var            LEN = 21;       /* i: waiting for length/lit/eob code */
var            LENEXT = 22;    /* i: waiting for length extra bits */
var            DIST = 23;      /* i: waiting for distance code */
var            DISTEXT = 24;   /* i: waiting for distance extra bits */
var            MATCH = 25;     /* o: waiting for output space to copy string */
var            LIT = 26;       /* o: waiting for output space to write literal */
var    CHECK = 27;     /* i: waiting for 32-bit check value */
var    LENGTH = 28;    /* i: waiting for 32-bit length (gzip) */
var    DONE = 29;      /* finished check, done -- remain here until reset */
var    BAD = 30;       /* got a data error -- remain here until reset */
var    MEM = 31;       /* got an inflate() memory error -- remain here until reset */
var    SYNC = 32;      /* looking for synchronization bytes to restart inflate() */

/* ===========================================================================*/



var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_WBITS = MAX_WBITS;


function zswap32(q) {
  return  (((q >>> 24) & 0xff) +
          ((q >>> 8) & 0xff00) +
          ((q & 0xff00) << 8) +
          ((q & 0xff) << 24));
}


function InflateState() {
  this.mode = 0;             /* current inflate mode */
  this.last = false;          /* true if processing last block */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.havedict = false;      /* true if dictionary provided */
  this.flags = 0;             /* gzip header method and flags (0 if zlib) */
  this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */
  this.check = 0;             /* protected copy of check value */
  this.total = 0;             /* protected copy of output count */
  // TODO: may be {}
  this.head = null;           /* where to save gzip header information */

  /* sliding window */
  this.wbits = 0;             /* log base 2 of requested window size */
  this.wsize = 0;             /* window size or zero if not using window */
  this.whave = 0;             /* valid bytes in the window */
  this.wnext = 0;             /* window write index */
  this.window = null;         /* allocated sliding window, if needed */

  /* bit accumulator */
  this.hold = 0;              /* input bit accumulator */
  this.bits = 0;              /* number of bits in "in" */

  /* for string and stored block copying */
  this.length = 0;            /* literal or length of data to copy */
  this.offset = 0;            /* distance back to copy string from */

  /* for table and code decoding */
  this.extra = 0;             /* extra bits needed */

  /* fixed and dynamic code tables */
  this.lencode = null;          /* starting table for length/literal codes */
  this.distcode = null;         /* starting table for distance codes */
  this.lenbits = 0;           /* index bits for lencode */
  this.distbits = 0;          /* index bits for distcode */

  /* dynamic table building */
  this.ncode = 0;             /* number of code length code lengths */
  this.nlen = 0;              /* number of length code lengths */
  this.ndist = 0;             /* number of distance code lengths */
  this.have = 0;              /* number of code lengths in lens[] */
  this.next = null;              /* next available space in codes[] */

  this.lens = new utils.Buf16(320); /* temporary storage for code lengths */
  this.work = new utils.Buf16(288); /* work area for code table building */

  /*
   because we don't have pointers in js, we use lencode and distcode directly
   as buffers so we don't need codes
  */
  //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */
  this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */
  this.distdyn = null;             /* dynamic table for distance codes (JS specific) */
  this.sane = 0;                   /* if false, allow invalid distance too far */
  this.back = 0;                   /* bits back of last unprocessed length/lit */
  this.was = 0;                    /* initial length of match */
}

function inflateResetKeep(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = ''; /*Z_NULL*/
  if (state.wrap) {       /* to support ill-conceived Java test suite */
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.dmax = 32768;
  state.head = null/*Z_NULL*/;
  state.hold = 0;
  state.bits = 0;
  //state.lencode = state.distcode = state.next = state.codes;
  state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
  state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);

  state.sane = 1;
  state.back = -1;
  //Tracev((stderr, "inflate: reset\n"));
  return Z_OK;
}

function inflateReset(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);

}

function inflateReset2(strm, windowBits) {
  var wrap;
  var state;

  /* get the state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;

  /* extract wrap request from windowBits parameter */
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  }
  else {
    wrap = (windowBits >> 4) + 1;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }

  /* set number of window bits, free window if different */
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }

  /* update state and reset the rest of it */
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
}

function inflateInit2(strm, windowBits) {
  var ret;
  var state;

  if (!strm) { return Z_STREAM_ERROR; }
  //strm.msg = Z_NULL;                 /* in case we return an error */

  state = new InflateState();

  //if (state === Z_NULL) return Z_MEM_ERROR;
  //Tracev((stderr, "inflate: allocated\n"));
  strm.state = state;
  state.window = null/*Z_NULL*/;
  ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK) {
    strm.state = null/*Z_NULL*/;
  }
  return ret;
}

function inflateInit(strm) {
  return inflateInit2(strm, DEF_WBITS);
}


/*
 Return state with length and distance decoding tables and index sizes set to
 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
 If BUILDFIXED is defined, then instead this routine builds the tables the
 first time it's called, and returns those tables the first time and
 thereafter.  This reduces the size of the code by about 2K bytes, in
 exchange for a little execution time.  However, BUILDFIXED should not be
 used for threaded applications, since the rewriting of the tables and virgin
 may not be thread-safe.
 */
var virgin = true;

var lenfix, distfix; // We have no pointers in JS, so keep tables separate

function fixedtables(state) {
  /* build fixed huffman tables if first call (may not be thread safe) */
  if (virgin) {
    var sym;

    lenfix = new utils.Buf32(512);
    distfix = new utils.Buf32(32);

    /* literal/length table */
    sym = 0;
    while (sym < 144) { state.lens[sym++] = 8; }
    while (sym < 256) { state.lens[sym++] = 9; }
    while (sym < 280) { state.lens[sym++] = 7; }
    while (sym < 288) { state.lens[sym++] = 8; }

    inflate_table(LENS,  state.lens, 0, 288, lenfix,   0, state.work, { bits: 9 });

    /* distance table */
    sym = 0;
    while (sym < 32) { state.lens[sym++] = 5; }

    inflate_table(DISTS, state.lens, 0, 32,   distfix, 0, state.work, { bits: 5 });

    /* do this just once */
    virgin = false;
  }

  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
}


/*
 Update the window with the last wsize (normally 32K) bytes written before
 returning.  If window does not exist yet, create it.  This is only called
 when a window is already in use, or when output has been written during this
 inflate call, but the end of the deflate stream has not been reached yet.
 It is also called to create a window for dictionary data when a dictionary
 is loaded.

 Providing output buffers larger than 32K to inflate() should provide a speed
 advantage, since only the last 32K of output is copied to the sliding window
 upon return from inflate(), and since all distances after the first 32K of
 output will fall in the output data, making match copies simpler and faster.
 The advantage may be dependent on the size of the processor's data caches.
 */
function updatewindow(strm, src, end, copy) {
  var dist;
  var state = strm.state;

  /* if it hasn't been done already, allocate space for the window */
  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;

    state.window = new utils.Buf8(state.wsize);
  }

  /* copy state->wsize or less output bytes into the circular window */
  if (copy >= state.wsize) {
    utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
    state.wnext = 0;
    state.whave = state.wsize;
  }
  else {
    dist = state.wsize - state.wnext;
    if (dist > copy) {
      dist = copy;
    }
    //zmemcpy(state->window + state->wnext, end - copy, dist);
    utils.arraySet(state.window, src, end - copy, dist, state.wnext);
    copy -= dist;
    if (copy) {
      //zmemcpy(state->window, end - copy, copy);
      utils.arraySet(state.window, src, end - copy, copy, 0);
      state.wnext = copy;
      state.whave = state.wsize;
    }
    else {
      state.wnext += dist;
      if (state.wnext === state.wsize) { state.wnext = 0; }
      if (state.whave < state.wsize) { state.whave += dist; }
    }
  }
  return 0;
}

function inflate(strm, flush) {
  var state;
  var input, output;          // input/output buffers
  var next;                   /* next input INDEX */
  var put;                    /* next output INDEX */
  var have, left;             /* available input and output */
  var hold;                   /* bit buffer */
  var bits;                   /* bits in bit buffer */
  var _in, _out;              /* save starting available input and output */
  var copy;                   /* number of stored or match bytes to copy */
  var from;                   /* where to copy match bytes from */
  var from_source;
  var here = 0;               /* current decoding table entry */
  var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
  //var last;                   /* parent table entry */
  var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
  var len;                    /* length to copy for repeats, bits to drop */
  var ret;                    /* return code */
  var hbuf = new utils.Buf8(4);    /* buffer for gzip header crc calculation */
  var opts;

  var n; // temporary var for NEED_BITS

  var order = /* permutation of code lengths */
    [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ];


  if (!strm || !strm.state || !strm.output ||
      (!strm.input && strm.avail_in !== 0)) {
    return Z_STREAM_ERROR;
  }

  state = strm.state;
  if (state.mode === TYPE) { state.mode = TYPEDO; }    /* skip check */


  //--- LOAD() ---
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  //---

  _in = have;
  _out = left;
  ret = Z_OK;

  inf_leave: // goto emulation
  for (;;) {
    switch (state.mode) {
      case HEAD:
        if (state.wrap === 0) {
          state.mode = TYPEDO;
          break;
        }
        //=== NEEDBITS(16);
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */
          state.check = 0/*crc32(0L, Z_NULL, 0)*/;
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//

          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          state.mode = FLAGS;
          break;
        }
        state.flags = 0;           /* expect zlib header */
        if (state.head) {
          state.head.done = false;
        }
        if (!(state.wrap & 1) ||   /* check if zlib header allowed */
          (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
          strm.msg = 'incorrect header check';
          state.mode = BAD;
          break;
        }
        if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED) {
          strm.msg = 'unknown compression method';
          state.mode = BAD;
          break;
        }
        //--- DROPBITS(4) ---//
        hold >>>= 4;
        bits -= 4;
        //---//
        len = (hold & 0x0f)/*BITS(4)*/ + 8;
        if (state.wbits === 0) {
          state.wbits = len;
        }
        else if (len > state.wbits) {
          strm.msg = 'invalid window size';
          state.mode = BAD;
          break;
        }
        state.dmax = 1 << len;
        //Tracev((stderr, "inflate:   zlib header ok\n"));
        strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
        state.mode = hold & 0x200 ? DICTID : TYPE;
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        break;
      case FLAGS:
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.flags = hold;
        if ((state.flags & 0xff) !== Z_DEFLATED) {
          strm.msg = 'unknown compression method';
          state.mode = BAD;
          break;
        }
        if (state.flags & 0xe000) {
          strm.msg = 'unknown header flags set';
          state.mode = BAD;
          break;
        }
        if (state.head) {
          state.head.text = ((hold >> 8) & 1);
        }
        if (state.flags & 0x0200) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = TIME;
        /* falls through */
      case TIME:
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (state.head) {
          state.head.time = hold;
        }
        if (state.flags & 0x0200) {
          //=== CRC4(state.check, hold)
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          hbuf[2] = (hold >>> 16) & 0xff;
          hbuf[3] = (hold >>> 24) & 0xff;
          state.check = crc32(state.check, hbuf, 4, 0);
          //===
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = OS;
        /* falls through */
      case OS:
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (state.head) {
          state.head.xflags = (hold & 0xff);
          state.head.os = (hold >> 8);
        }
        if (state.flags & 0x0200) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = EXLEN;
        /* falls through */
      case EXLEN:
        if (state.flags & 0x0400) {
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.length = hold;
          if (state.head) {
            state.head.extra_len = hold;
          }
          if (state.flags & 0x0200) {
            //=== CRC2(state.check, hold);
            hbuf[0] = hold & 0xff;
            hbuf[1] = (hold >>> 8) & 0xff;
            state.check = crc32(state.check, hbuf, 2, 0);
            //===//
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
        }
        else if (state.head) {
          state.head.extra = null/*Z_NULL*/;
        }
        state.mode = EXTRA;
        /* falls through */
      case EXTRA:
        if (state.flags & 0x0400) {
          copy = state.length;
          if (copy > have) { copy = have; }
          if (copy) {
            if (state.head) {
              len = state.head.extra_len - state.length;
              if (!state.head.extra) {
                // Use untyped array for more convenient processing later
                state.head.extra = new Array(state.head.extra_len);
              }
              utils.arraySet(
                state.head.extra,
                input,
                next,
                // extra field is limited to 65536 bytes
                // - no need for additional size check
                copy,
                /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                len
              );
              //zmemcpy(state.head.extra + len, next,
              //        len + copy > state.head.extra_max ?
              //        state.head.extra_max - len : copy);
            }
            if (state.flags & 0x0200) {
              state.check = crc32(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            state.length -= copy;
          }
          if (state.length) { break inf_leave; }
        }
        state.length = 0;
        state.mode = NAME;
        /* falls through */
      case NAME:
        if (state.flags & 0x0800) {
          if (have === 0) { break inf_leave; }
          copy = 0;
          do {
            // TODO: 2 or 1 bytes?
            len = input[next + copy++];
            /* use constant limit because in js we should not preallocate memory */
            if (state.head && len &&
                (state.length < 65536 /*state.head.name_max*/)) {
              state.head.name += String.fromCharCode(len);
            }
          } while (len && copy < have);

          if (state.flags & 0x0200) {
            state.check = crc32(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          if (len) { break inf_leave; }
        }
        else if (state.head) {
          state.head.name = null;
        }
        state.length = 0;
        state.mode = COMMENT;
        /* falls through */
      case COMMENT:
        if (state.flags & 0x1000) {
          if (have === 0) { break inf_leave; }
          copy = 0;
          do {
            len = input[next + copy++];
            /* use constant limit because in js we should not preallocate memory */
            if (state.head && len &&
                (state.length < 65536 /*state.head.comm_max*/)) {
              state.head.comment += String.fromCharCode(len);
            }
          } while (len && copy < have);
          if (state.flags & 0x0200) {
            state.check = crc32(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          if (len) { break inf_leave; }
        }
        else if (state.head) {
          state.head.comment = null;
        }
        state.mode = HCRC;
        /* falls through */
      case HCRC:
        if (state.flags & 0x0200) {
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if (hold !== (state.check & 0xffff)) {
            strm.msg = 'header crc mismatch';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
        }
        if (state.head) {
          state.head.hcrc = ((state.flags >> 9) & 1);
          state.head.done = true;
        }
        strm.adler = state.check = 0;
        state.mode = TYPE;
        break;
      case DICTID:
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        strm.adler = state.check = zswap32(hold);
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = DICT;
        /* falls through */
      case DICT:
        if (state.havedict === 0) {
          //--- RESTORE() ---
          strm.next_out = put;
          strm.avail_out = left;
          strm.next_in = next;
          strm.avail_in = have;
          state.hold = hold;
          state.bits = bits;
          //---
          return Z_NEED_DICT;
        }
        strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
        state.mode = TYPE;
        /* falls through */
      case TYPE:
        if (flush === Z_BLOCK || flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case TYPEDO:
        if (state.last) {
          //--- BYTEBITS() ---//
          hold >>>= bits & 7;
          bits -= bits & 7;
          //---//
          state.mode = CHECK;
          break;
        }
        //=== NEEDBITS(3); */
        while (bits < 3) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.last = (hold & 0x01)/*BITS(1)*/;
        //--- DROPBITS(1) ---//
        hold >>>= 1;
        bits -= 1;
        //---//

        switch ((hold & 0x03)/*BITS(2)*/) {
          case 0:                             /* stored block */
            //Tracev((stderr, "inflate:     stored block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = STORED;
            break;
          case 1:                             /* fixed block */
            fixedtables(state);
            //Tracev((stderr, "inflate:     fixed codes block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = LEN_;             /* decode codes */
            if (flush === Z_TREES) {
              //--- DROPBITS(2) ---//
              hold >>>= 2;
              bits -= 2;
              //---//
              break inf_leave;
            }
            break;
          case 2:                             /* dynamic block */
            //Tracev((stderr, "inflate:     dynamic codes block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = TABLE;
            break;
          case 3:
            strm.msg = 'invalid block type';
            state.mode = BAD;
        }
        //--- DROPBITS(2) ---//
        hold >>>= 2;
        bits -= 2;
        //---//
        break;
      case STORED:
        //--- BYTEBITS() ---// /* go to byte boundary */
        hold >>>= bits & 7;
        bits -= bits & 7;
        //---//
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
          strm.msg = 'invalid stored block lengths';
          state.mode = BAD;
          break;
        }
        state.length = hold & 0xffff;
        //Tracev((stderr, "inflate:       stored length %u\n",
        //        state.length));
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = COPY_;
        if (flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case COPY_:
        state.mode = COPY;
        /* falls through */
      case COPY:
        copy = state.length;
        if (copy) {
          if (copy > have) { copy = have; }
          if (copy > left) { copy = left; }
          if (copy === 0) { break inf_leave; }
          //--- zmemcpy(put, next, copy); ---
          utils.arraySet(output, input, next, copy, put);
          //---//
          have -= copy;
          next += copy;
          left -= copy;
          put += copy;
          state.length -= copy;
          break;
        }
        //Tracev((stderr, "inflate:       stored end\n"));
        state.mode = TYPE;
        break;
      case TABLE:
        //=== NEEDBITS(14); */
        while (bits < 14) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;
        //--- DROPBITS(5) ---//
        hold >>>= 5;
        bits -= 5;
        //---//
        state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;
        //--- DROPBITS(5) ---//
        hold >>>= 5;
        bits -= 5;
        //---//
        state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;
        //--- DROPBITS(4) ---//
        hold >>>= 4;
        bits -= 4;
        //---//
//#ifndef PKZIP_BUG_WORKAROUND
        if (state.nlen > 286 || state.ndist > 30) {
          strm.msg = 'too many length or distance symbols';
          state.mode = BAD;
          break;
        }
//#endif
        //Tracev((stderr, "inflate:       table sizes ok\n"));
        state.have = 0;
        state.mode = LENLENS;
        /* falls through */
      case LENLENS:
        while (state.have < state.ncode) {
          //=== NEEDBITS(3);
          while (bits < 3) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);
          //--- DROPBITS(3) ---//
          hold >>>= 3;
          bits -= 3;
          //---//
        }
        while (state.have < 19) {
          state.lens[order[state.have++]] = 0;
        }
        // We have separate tables & no pointers. 2 commented lines below not needed.
        //state.next = state.codes;
        //state.lencode = state.next;
        // Switch to use dynamic table
        state.lencode = state.lendyn;
        state.lenbits = 7;

        opts = { bits: state.lenbits };
        ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
        state.lenbits = opts.bits;

        if (ret) {
          strm.msg = 'invalid code lengths set';
          state.mode = BAD;
          break;
        }
        //Tracev((stderr, "inflate:       code lengths ok\n"));
        state.have = 0;
        state.mode = CODELENS;
        /* falls through */
      case CODELENS:
        while (state.have < state.nlen + state.ndist) {
          for (;;) {
            here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          if (here_val < 16) {
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            state.lens[state.have++] = here_val;
          }
          else {
            if (here_val === 16) {
              //=== NEEDBITS(here.bits + 2);
              n = here_bits + 2;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              if (state.have === 0) {
                strm.msg = 'invalid bit length repeat';
                state.mode = BAD;
                break;
              }
              len = state.lens[state.have - 1];
              copy = 3 + (hold & 0x03);//BITS(2);
              //--- DROPBITS(2) ---//
              hold >>>= 2;
              bits -= 2;
              //---//
            }
            else if (here_val === 17) {
              //=== NEEDBITS(here.bits + 3);
              n = here_bits + 3;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              len = 0;
              copy = 3 + (hold & 0x07);//BITS(3);
              //--- DROPBITS(3) ---//
              hold >>>= 3;
              bits -= 3;
              //---//
            }
            else {
              //=== NEEDBITS(here.bits + 7);
              n = here_bits + 7;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              len = 0;
              copy = 11 + (hold & 0x7f);//BITS(7);
              //--- DROPBITS(7) ---//
              hold >>>= 7;
              bits -= 7;
              //---//
            }
            if (state.have + copy > state.nlen + state.ndist) {
              strm.msg = 'invalid bit length repeat';
              state.mode = BAD;
              break;
            }
            while (copy--) {
              state.lens[state.have++] = len;
            }
          }
        }

        /* handle error breaks in while */
        if (state.mode === BAD) { break; }

        /* check for end-of-block code (better have one) */
        if (state.lens[256] === 0) {
          strm.msg = 'invalid code -- missing end-of-block';
          state.mode = BAD;
          break;
        }

        /* build code tables -- note: do not change the lenbits or distbits
           values here (9 and 6) without reading the comments in inftrees.h
           concerning the ENOUGH constants, which depend on those values */
        state.lenbits = 9;

        opts = { bits: state.lenbits };
        ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
        // We have separate tables & no pointers. 2 commented lines below not needed.
        // state.next_index = opts.table_index;
        state.lenbits = opts.bits;
        // state.lencode = state.next;

        if (ret) {
          strm.msg = 'invalid literal/lengths set';
          state.mode = BAD;
          break;
        }

        state.distbits = 6;
        //state.distcode.copy(state.codes);
        // Switch to use dynamic table
        state.distcode = state.distdyn;
        opts = { bits: state.distbits };
        ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
        // We have separate tables & no pointers. 2 commented lines below not needed.
        // state.next_index = opts.table_index;
        state.distbits = opts.bits;
        // state.distcode = state.next;

        if (ret) {
          strm.msg = 'invalid distances set';
          state.mode = BAD;
          break;
        }
        //Tracev((stderr, 'inflate:       codes ok\n'));
        state.mode = LEN_;
        if (flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case LEN_:
        state.mode = LEN;
        /* falls through */
      case LEN:
        if (have >= 6 && left >= 258) {
          //--- RESTORE() ---
          strm.next_out = put;
          strm.avail_out = left;
          strm.next_in = next;
          strm.avail_in = have;
          state.hold = hold;
          state.bits = bits;
          //---
          inflate_fast(strm, _out);
          //--- LOAD() ---
          put = strm.next_out;
          output = strm.output;
          left = strm.avail_out;
          next = strm.next_in;
          input = strm.input;
          have = strm.avail_in;
          hold = state.hold;
          bits = state.bits;
          //---

          if (state.mode === TYPE) {
            state.back = -1;
          }
          break;
        }
        state.back = 0;
        for (;;) {
          here = state.lencode[hold & ((1 << state.lenbits) - 1)];  /*BITS(state.lenbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if (here_bits <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if (here_op && (here_op & 0xf0) === 0) {
          last_bits = here_bits;
          last_op = here_op;
          last_val = here_val;
          for (;;) {
            here = state.lencode[last_val +
                    ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((last_bits + here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          //--- DROPBITS(last.bits) ---//
          hold >>>= last_bits;
          bits -= last_bits;
          //---//
          state.back += last_bits;
        }
        //--- DROPBITS(here.bits) ---//
        hold >>>= here_bits;
        bits -= here_bits;
        //---//
        state.back += here_bits;
        state.length = here_val;
        if (here_op === 0) {
          //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
          //        "inflate:         literal '%c'\n" :
          //        "inflate:         literal 0x%02x\n", here.val));
          state.mode = LIT;
          break;
        }
        if (here_op & 32) {
          //Tracevv((stderr, "inflate:         end of block\n"));
          state.back = -1;
          state.mode = TYPE;
          break;
        }
        if (here_op & 64) {
          strm.msg = 'invalid literal/length code';
          state.mode = BAD;
          break;
        }
        state.extra = here_op & 15;
        state.mode = LENEXT;
        /* falls through */
      case LENEXT:
        if (state.extra) {
          //=== NEEDBITS(state.extra);
          n = state.extra;
          while (bits < n) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.length += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
          //--- DROPBITS(state.extra) ---//
          hold >>>= state.extra;
          bits -= state.extra;
          //---//
          state.back += state.extra;
        }
        //Tracevv((stderr, "inflate:         length %u\n", state.length));
        state.was = state.length;
        state.mode = DIST;
        /* falls through */
      case DIST:
        for (;;) {
          here = state.distcode[hold & ((1 << state.distbits) - 1)];/*BITS(state.distbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if ((here_op & 0xf0) === 0) {
          last_bits = here_bits;
          last_op = here_op;
          last_val = here_val;
          for (;;) {
            here = state.distcode[last_val +
                    ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((last_bits + here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          //--- DROPBITS(last.bits) ---//
          hold >>>= last_bits;
          bits -= last_bits;
          //---//
          state.back += last_bits;
        }
        //--- DROPBITS(here.bits) ---//
        hold >>>= here_bits;
        bits -= here_bits;
        //---//
        state.back += here_bits;
        if (here_op & 64) {
          strm.msg = 'invalid distance code';
          state.mode = BAD;
          break;
        }
        state.offset = here_val;
        state.extra = (here_op) & 15;
        state.mode = DISTEXT;
        /* falls through */
      case DISTEXT:
        if (state.extra) {
          //=== NEEDBITS(state.extra);
          n = state.extra;
          while (bits < n) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.offset += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
          //--- DROPBITS(state.extra) ---//
          hold >>>= state.extra;
          bits -= state.extra;
          //---//
          state.back += state.extra;
        }
//#ifdef INFLATE_STRICT
        if (state.offset > state.dmax) {
          strm.msg = 'invalid distance too far back';
          state.mode = BAD;
          break;
        }
//#endif
        //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
        state.mode = MATCH;
        /* falls through */
      case MATCH:
        if (left === 0) { break inf_leave; }
        copy = _out - left;
        if (state.offset > copy) {         /* copy from window */
          copy = state.offset - copy;
          if (copy > state.whave) {
            if (state.sane) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break;
            }
// (!) This block is disabled in zlib defaults,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//          Trace((stderr, "inflate.c too far\n"));
//          copy -= state.whave;
//          if (copy > state.length) { copy = state.length; }
//          if (copy > left) { copy = left; }
//          left -= copy;
//          state.length -= copy;
//          do {
//            output[put++] = 0;
//          } while (--copy);
//          if (state.length === 0) { state.mode = LEN; }
//          break;
//#endif
          }
          if (copy > state.wnext) {
            copy -= state.wnext;
            from = state.wsize - copy;
          }
          else {
            from = state.wnext - copy;
          }
          if (copy > state.length) { copy = state.length; }
          from_source = state.window;
        }
        else {                              /* copy from output */
          from_source = output;
          from = put - state.offset;
          copy = state.length;
        }
        if (copy > left) { copy = left; }
        left -= copy;
        state.length -= copy;
        do {
          output[put++] = from_source[from++];
        } while (--copy);
        if (state.length === 0) { state.mode = LEN; }
        break;
      case LIT:
        if (left === 0) { break inf_leave; }
        output[put++] = state.length;
        left--;
        state.mode = LEN;
        break;
      case CHECK:
        if (state.wrap) {
          //=== NEEDBITS(32);
          while (bits < 32) {
            if (have === 0) { break inf_leave; }
            have--;
            // Use '|' instead of '+' to make sure that result is signed
            hold |= input[next++] << bits;
            bits += 8;
          }
          //===//
          _out -= left;
          strm.total_out += _out;
          state.total += _out;
          if (_out) {
            strm.adler = state.check =
                /*UPDATE(state.check, put - _out, _out);*/
                (state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));

          }
          _out = left;
          // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too
          if ((state.flags ? hold : zswap32(hold)) !== state.check) {
            strm.msg = 'incorrect data check';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          //Tracev((stderr, "inflate:   check matches trailer\n"));
        }
        state.mode = LENGTH;
        /* falls through */
      case LENGTH:
        if (state.wrap && state.flags) {
          //=== NEEDBITS(32);
          while (bits < 32) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if (hold !== (state.total & 0xffffffff)) {
            strm.msg = 'incorrect length check';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          //Tracev((stderr, "inflate:   length matches trailer\n"));
        }
        state.mode = DONE;
        /* falls through */
      case DONE:
        ret = Z_STREAM_END;
        break inf_leave;
      case BAD:
        ret = Z_DATA_ERROR;
        break inf_leave;
      case MEM:
        return Z_MEM_ERROR;
      case SYNC:
        /* falls through */
      default:
        return Z_STREAM_ERROR;
    }
  }

  // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

  /*
     Return from inflate(), updating the total counts and the check value.
     If there was no progress during the inflate() call, return a buffer
     error.  Call updatewindow() to create and/or update the window state.
     Note: a memory error from inflate() is non-recoverable.
   */

  //--- RESTORE() ---
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  //---

  if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&
                      (state.mode < CHECK || flush !== Z_FINISH))) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
      state.mode = MEM;
      return Z_MEM_ERROR;
    }
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if (state.wrap && _out) {
    strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
      (state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) +
                    (state.mode === TYPE ? 128 : 0) +
                    (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if (((_in === 0 && _out === 0) || flush === Z_FINISH) && ret === Z_OK) {
    ret = Z_BUF_ERROR;
  }
  return ret;
}

function inflateEnd(strm) {

  if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
    return Z_STREAM_ERROR;
  }

  var state = strm.state;
  if (state.window) {
    state.window = null;
  }
  strm.state = null;
  return Z_OK;
}

function inflateGetHeader(strm, head) {
  var state;

  /* check state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR; }

  /* save header structure */
  state.head = head;
  head.done = false;
  return Z_OK;
}

function inflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;

  var state;
  var dictid;
  var ret;

  /* check state */
  if (!strm /* == Z_NULL */ || !strm.state /* == Z_NULL */) { return Z_STREAM_ERROR; }
  state = strm.state;

  if (state.wrap !== 0 && state.mode !== DICT) {
    return Z_STREAM_ERROR;
  }

  /* check for correct dictionary identifier */
  if (state.mode === DICT) {
    dictid = 1; /* adler32(0, null, 0)*/
    /* dictid = adler32(dictid, dictionary, dictLength); */
    dictid = adler32(dictid, dictionary, dictLength, 0);
    if (dictid !== state.check) {
      return Z_DATA_ERROR;
    }
  }
  /* copy dictionary to window using updatewindow(), which will amend the
   existing dictionary if appropriate */
  ret = updatewindow(strm, dictionary, dictLength, dictLength);
  if (ret) {
    state.mode = MEM;
    return Z_MEM_ERROR;
  }
  state.havedict = 1;
  // Tracev((stderr, "inflate:   dictionary set\n"));
  return Z_OK;
}

exports.inflateReset = inflateReset;
exports.inflateReset2 = inflateReset2;
exports.inflateResetKeep = inflateResetKeep;
exports.inflateInit = inflateInit;
exports.inflateInit2 = inflateInit2;
exports.inflate = inflate;
exports.inflateEnd = inflateEnd;
exports.inflateGetHeader = inflateGetHeader;
exports.inflateSetDictionary = inflateSetDictionary;
exports.inflateInfo = 'pako inflate (from Nodeca project)';

/* Not implemented
exports.inflateCopy = inflateCopy;
exports.inflateGetDictionary = inflateGetDictionary;
exports.inflateMark = inflateMark;
exports.inflatePrime = inflatePrime;
exports.inflateSync = inflateSync;
exports.inflateSyncPoint = inflateSyncPoint;
exports.inflateUndermine = inflateUndermine;
*/


/***/ }),

/***/ "./node_modules/pako/lib/zlib/inftrees.js":
/*!************************************************!*\
  !*** ./node_modules/pako/lib/zlib/inftrees.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils = __webpack_require__(/*! ../utils/common */ "./node_modules/pako/lib/utils/common.js");

var MAXBITS = 15;
var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

var CODES = 0;
var LENS = 1;
var DISTS = 2;

var lbase = [ /* Length codes 257..285 base */
  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
  35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
];

var lext = [ /* Length codes 257..285 extra */
  16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
  19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
];

var dbase = [ /* Distance codes 0..29 base */
  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
  257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
  8193, 12289, 16385, 24577, 0, 0
];

var dext = [ /* Distance codes 0..29 extra */
  16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
  23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
  28, 28, 29, 29, 64, 64
];

module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts)
{
  var bits = opts.bits;
      //here = opts.here; /* table entry for duplication */

  var len = 0;               /* a code's length in bits */
  var sym = 0;               /* index of code symbols */
  var min = 0, max = 0;          /* minimum and maximum code lengths */
  var root = 0;              /* number of index bits for root table */
  var curr = 0;              /* number of index bits for current table */
  var drop = 0;              /* code bits to drop for sub-table */
  var left = 0;                   /* number of prefix codes available */
  var used = 0;              /* code entries in table used */
  var huff = 0;              /* Huffman code */
  var incr;              /* for incrementing code, index */
  var fill;              /* index for replicating entries */
  var low;               /* low bits for current root entry */
  var mask;              /* mask for low root bits */
  var next;             /* next available space in table */
  var base = null;     /* base value table to use */
  var base_index = 0;
//  var shoextra;    /* extra bits table to use */
  var end;                    /* use base and extra for symbol > end */
  var count = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
  var offs = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
  var extra = null;
  var extra_index = 0;

  var here_bits, here_op, here_val;

  /*
   Process a set of code lengths to create a canonical Huffman code.  The
   code lengths are lens[0..codes-1].  Each length corresponds to the
   symbols 0..codes-1.  The Huffman code is generated by first sorting the
   symbols by length from short to long, and retaining the symbol order
   for codes with equal lengths.  Then the code starts with all zero bits
   for the first code of the shortest length, and the codes are integer
   increments for the same length, and zeros are appended as the length
   increases.  For the deflate format, these bits are stored backwards
   from their more natural integer increment ordering, and so when the
   decoding tables are built in the large loop below, the integer codes
   are incremented backwards.

   This routine assumes, but does not check, that all of the entries in
   lens[] are in the range 0..MAXBITS.  The caller must assure this.
   1..MAXBITS is interpreted as that code length.  zero means that that
   symbol does not occur in this code.

   The codes are sorted by computing a count of codes for each length,
   creating from that a table of starting indices for each length in the
   sorted table, and then entering the symbols in order in the sorted
   table.  The sorted table is work[], with that space being provided by
   the caller.

   The length counts are used for other purposes as well, i.e. finding
   the minimum and maximum length codes, determining if there are any
   codes at all, checking for a valid set of lengths, and looking ahead
   at length counts to determine sub-table sizes when building the
   decoding tables.
   */

  /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
  for (len = 0; len <= MAXBITS; len++) {
    count[len] = 0;
  }
  for (sym = 0; sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }

  /* bound code lengths, force root to be within code lengths */
  root = bits;
  for (max = MAXBITS; max >= 1; max--) {
    if (count[max] !== 0) { break; }
  }
  if (root > max) {
    root = max;
  }
  if (max === 0) {                     /* no symbols to code at all */
    //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
    //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
    //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;


    //table.op[opts.table_index] = 64;
    //table.bits[opts.table_index] = 1;
    //table.val[opts.table_index++] = 0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;

    opts.bits = 1;
    return 0;     /* no symbols, but wait for decoding to report error */
  }
  for (min = 1; min < max; min++) {
    if (count[min] !== 0) { break; }
  }
  if (root < min) {
    root = min;
  }

  /* check for an over-subscribed or incomplete set of lengths */
  left = 1;
  for (len = 1; len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];
    if (left < 0) {
      return -1;
    }        /* over-subscribed */
  }
  if (left > 0 && (type === CODES || max !== 1)) {
    return -1;                      /* incomplete set */
  }

  /* generate offsets into symbol table for each length for sorting */
  offs[1] = 0;
  for (len = 1; len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }

  /* sort symbols by length, by symbol order within each length */
  for (sym = 0; sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }

  /*
   Create and fill in decoding tables.  In this loop, the table being
   filled is at next and has curr index bits.  The code being used is huff
   with length len.  That code is converted to an index by dropping drop
   bits off of the bottom.  For codes where len is less than drop + curr,
   those top drop + curr - len bits are incremented through all values to
   fill the table with replicated entries.

   root is the number of index bits for the root table.  When len exceeds
   root, sub-tables are created pointed to by the root entry with an index
   of the low root bits of huff.  This is saved in low to check for when a
   new sub-table should be started.  drop is zero when the root table is
   being filled, and drop is root when sub-tables are being filled.

   When a new sub-table is needed, it is necessary to look ahead in the
   code lengths to determine what size sub-table is needed.  The length
   counts are used for this, and so count[] is decremented as codes are
   entered in the tables.

   used keeps track of how many table entries have been allocated from the
   provided *table space.  It is checked for LENS and DIST tables against
   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
   the initial root table size constants.  See the comments in inftrees.h
   for more information.

   sym increments through all symbols, and the loop terminates when
   all codes of length max, i.e. all codes, have been processed.  This
   routine permits incomplete codes, so another loop after this one fills
   in the rest of the decoding tables with invalid code markers.
   */

  /* set up for code type */
  // poor man optimization - use if-else instead of switch,
  // to avoid deopts in old v8
  if (type === CODES) {
    base = extra = work;    /* dummy value--not used */
    end = 19;

  } else if (type === LENS) {
    base = lbase;
    base_index -= 257;
    extra = lext;
    extra_index -= 257;
    end = 256;

  } else {                    /* DISTS */
    base = dbase;
    extra = dext;
    end = -1;
  }

  /* initialize opts for loop */
  huff = 0;                   /* starting code */
  sym = 0;                    /* starting code symbol */
  len = min;                  /* starting code length */
  next = table_index;              /* current table to fill in */
  curr = root;                /* current table index bits */
  drop = 0;                   /* current bits to drop from code for index */
  low = -1;                   /* trigger new sub-table when len > root */
  used = 1 << root;          /* use root table entries */
  mask = used - 1;            /* mask for comparing low */

  /* check available table space */
  if ((type === LENS && used > ENOUGH_LENS) ||
    (type === DISTS && used > ENOUGH_DISTS)) {
    return 1;
  }

  /* process all codes and make table entries */
  for (;;) {
    /* create table entry */
    here_bits = len - drop;
    if (work[sym] < end) {
      here_op = 0;
      here_val = work[sym];
    }
    else if (work[sym] > end) {
      here_op = extra[extra_index + work[sym]];
      here_val = base[base_index + work[sym]];
    }
    else {
      here_op = 32 + 64;         /* end of block */
      here_val = 0;
    }

    /* replicate for those indices with low len bits equal to huff */
    incr = 1 << (len - drop);
    fill = 1 << curr;
    min = fill;                 /* save offset to next table */
    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val |0;
    } while (fill !== 0);

    /* backwards increment the len-bit code huff */
    incr = 1 << (len - 1);
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }

    /* go to next symbol, update count, len */
    sym++;
    if (--count[len] === 0) {
      if (len === max) { break; }
      len = lens[lens_index + work[sym]];
    }

    /* create new sub-table if needed */
    if (len > root && (huff & mask) !== low) {
      /* if first time, transition to sub-tables */
      if (drop === 0) {
        drop = root;
      }

      /* increment past last table */
      next += min;            /* here min is 1 << curr */

      /* determine length of next table */
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count[curr + drop];
        if (left <= 0) { break; }
        curr++;
        left <<= 1;
      }

      /* check for enough space */
      used += 1 << curr;
      if ((type === LENS && used > ENOUGH_LENS) ||
        (type === DISTS && used > ENOUGH_DISTS)) {
        return 1;
      }

      /* point entry in root table to sub-table */
      low = huff & mask;
      /*table.op[low] = curr;
      table.bits[low] = root;
      table.val[low] = next - opts.table_index;*/
      table[low] = (root << 24) | (curr << 16) | (next - table_index) |0;
    }
  }

  /* fill in remaining table entry if code is incomplete (guaranteed to have
   at most one remaining entry, since if the code is incomplete, the
   maximum code length that was allowed to get this far is one bit) */
  if (huff !== 0) {
    //table.op[next + huff] = 64;            /* invalid code marker */
    //table.bits[next + huff] = len - drop;
    //table.val[next + huff] = 0;
    table[next + huff] = ((len - drop) << 24) | (64 << 16) |0;
  }

  /* set return parameters */
  //opts.table_index += used;
  opts.bits = root;
  return 0;
};


/***/ }),

/***/ "./node_modules/pako/lib/zlib/messages.js":
/*!************************************************!*\
  !*** ./node_modules/pako/lib/zlib/messages.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

module.exports = {
  2:      'need dictionary',     /* Z_NEED_DICT       2  */
  1:      'stream end',          /* Z_STREAM_END      1  */
  0:      '',                    /* Z_OK              0  */
  '-1':   'file error',          /* Z_ERRNO         (-1) */
  '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
  '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
  '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
  '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
  '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
};


/***/ }),

/***/ "./node_modules/pako/lib/zlib/trees.js":
/*!*********************************************!*\
  !*** ./node_modules/pako/lib/zlib/trees.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

/* eslint-disable space-unary-ops */

var utils = __webpack_require__(/*! ../utils/common */ "./node_modules/pako/lib/utils/common.js");

/* Public constants ==========================================================*/
/* ===========================================================================*/


//var Z_FILTERED          = 1;
//var Z_HUFFMAN_ONLY      = 2;
//var Z_RLE               = 3;
var Z_FIXED               = 4;
//var Z_DEFAULT_STRATEGY  = 0;

/* Possible values of the data_type field (though see inflate()) */
var Z_BINARY              = 0;
var Z_TEXT                = 1;
//var Z_ASCII             = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;

/*============================================================================*/


function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }

// From zutil.h

var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES    = 2;
/* The three kinds of block type */

var MIN_MATCH    = 3;
var MAX_MATCH    = 258;
/* The minimum and maximum match lengths */

// From deflate.h
/* ===========================================================================
 * Internal compression state.
 */

var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */

var LITERALS      = 256;
/* number of literal bytes 0..255 */

var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */

var D_CODES       = 30;
/* number of distance codes */

var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */

var HEAP_SIZE     = 2 * L_CODES + 1;
/* maximum heap size */

var MAX_BITS      = 15;
/* All codes must not exceed MAX_BITS bits */

var Buf_size      = 16;
/* size of bit buffer in bi_buf */


/* ===========================================================================
 * Constants
 */

var MAX_BL_BITS = 7;
/* Bit length codes must not exceed MAX_BL_BITS bits */

var END_BLOCK   = 256;
/* end of block literal code */

var REP_3_6     = 16;
/* repeat previous bit length 3-6 times (2 bits of repeat count) */

var REPZ_3_10   = 17;
/* repeat a zero length 3-10 times  (3 bits of repeat count) */

var REPZ_11_138 = 18;
/* repeat a zero length 11-138 times  (7 bits of repeat count) */

/* eslint-disable comma-spacing,array-bracket-spacing */
var extra_lbits =   /* extra bits for each length code */
  [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];

var extra_dbits =   /* extra bits for each distance code */
  [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];

var extra_blbits =  /* extra bits for each bit length code */
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];

var bl_order =
  [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
/* eslint-enable comma-spacing,array-bracket-spacing */

/* The lengths of the bit length codes are sent in order of decreasing
 * probability, to avoid transmitting the lengths for unused bit length codes.
 */

/* ===========================================================================
 * Local data. These are initialized only once.
 */

// We pre-fill arrays with 0 to avoid uninitialized gaps

var DIST_CODE_LEN = 512; /* see definition of array dist_code below */

// !!!! Use flat array instead of structure, Freq = i*2, Len = i*2+1
var static_ltree  = new Array((L_CODES + 2) * 2);
zero(static_ltree);
/* The static literal tree. Since the bit lengths are imposed, there is no
 * need for the L_CODES extra codes used during heap construction. However
 * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
 * below).
 */

var static_dtree  = new Array(D_CODES * 2);
zero(static_dtree);
/* The static distance tree. (Actually a trivial tree since all codes use
 * 5 bits.)
 */

var _dist_code    = new Array(DIST_CODE_LEN);
zero(_dist_code);
/* Distance codes. The first 256 values correspond to the distances
 * 3 .. 258, the last 256 values correspond to the top 8 bits of
 * the 15 bit distances.
 */

var _length_code  = new Array(MAX_MATCH - MIN_MATCH + 1);
zero(_length_code);
/* length code for each normalized match length (0 == MIN_MATCH) */

var base_length   = new Array(LENGTH_CODES);
zero(base_length);
/* First normalized length for each code (0 = MIN_MATCH) */

var base_dist     = new Array(D_CODES);
zero(base_dist);
/* First normalized distance for each code (0 = distance of 1) */


function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {

  this.static_tree  = static_tree;  /* static tree or NULL */
  this.extra_bits   = extra_bits;   /* extra bits for each code or NULL */
  this.extra_base   = extra_base;   /* base index for extra_bits */
  this.elems        = elems;        /* max number of elements in the tree */
  this.max_length   = max_length;   /* max bit length for the codes */

  // show if `static_tree` has data or dummy - needed for monomorphic objects
  this.has_stree    = static_tree && static_tree.length;
}


var static_l_desc;
var static_d_desc;
var static_bl_desc;


function TreeDesc(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;     /* the dynamic tree */
  this.max_code = 0;            /* largest code with non zero frequency */
  this.stat_desc = stat_desc;   /* the corresponding static tree */
}



function d_code(dist) {
  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
}


/* ===========================================================================
 * Output a short LSB first on the stream.
 * IN assertion: there is enough room in pendingBuf.
 */
function put_short(s, w) {
//    put_byte(s, (uch)((w) & 0xff));
//    put_byte(s, (uch)((ush)(w) >> 8));
  s.pending_buf[s.pending++] = (w) & 0xff;
  s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
}


/* ===========================================================================
 * Send a value on a given number of bits.
 * IN assertion: length <= 16 and value fits in length bits.
 */
function send_bits(s, value, length) {
  if (s.bi_valid > (Buf_size - length)) {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    put_short(s, s.bi_buf);
    s.bi_buf = value >> (Buf_size - s.bi_valid);
    s.bi_valid += length - Buf_size;
  } else {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    s.bi_valid += length;
  }
}


function send_code(s, c, tree) {
  send_bits(s, tree[c * 2]/*.Code*/, tree[c * 2 + 1]/*.Len*/);
}


/* ===========================================================================
 * Reverse the first len bits of a code, using straightforward code (a faster
 * method would use a table)
 * IN assertion: 1 <= len <= 15
 */
function bi_reverse(code, len) {
  var res = 0;
  do {
    res |= code & 1;
    code >>>= 1;
    res <<= 1;
  } while (--len > 0);
  return res >>> 1;
}


/* ===========================================================================
 * Flush the bit buffer, keeping at most 7 bits in it.
 */
function bi_flush(s) {
  if (s.bi_valid === 16) {
    put_short(s, s.bi_buf);
    s.bi_buf = 0;
    s.bi_valid = 0;

  } else if (s.bi_valid >= 8) {
    s.pending_buf[s.pending++] = s.bi_buf & 0xff;
    s.bi_buf >>= 8;
    s.bi_valid -= 8;
  }
}


/* ===========================================================================
 * Compute the optimal bit lengths for a tree and update the total bit length
 * for the current block.
 * IN assertion: the fields freq and dad are set, heap[heap_max] and
 *    above are the tree nodes sorted by increasing frequency.
 * OUT assertions: the field len is set to the optimal bit length, the
 *     array bl_count contains the frequencies for each bit length.
 *     The length opt_len is updated; static_len is also updated if stree is
 *     not null.
 */
function gen_bitlen(s, desc)
//    deflate_state *s;
//    tree_desc *desc;    /* the tree descriptor */
{
  var tree            = desc.dyn_tree;
  var max_code        = desc.max_code;
  var stree           = desc.stat_desc.static_tree;
  var has_stree       = desc.stat_desc.has_stree;
  var extra           = desc.stat_desc.extra_bits;
  var base            = desc.stat_desc.extra_base;
  var max_length      = desc.stat_desc.max_length;
  var h;              /* heap index */
  var n, m;           /* iterate over the tree elements */
  var bits;           /* bit length */
  var xbits;          /* extra bits */
  var f;              /* frequency */
  var overflow = 0;   /* number of elements with bit length too large */

  for (bits = 0; bits <= MAX_BITS; bits++) {
    s.bl_count[bits] = 0;
  }

  /* In a first pass, compute the optimal bit lengths (which may
   * overflow in the case of the bit length tree).
   */
  tree[s.heap[s.heap_max] * 2 + 1]/*.Len*/ = 0; /* root of the heap */

  for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
    n = s.heap[h];
    bits = tree[tree[n * 2 + 1]/*.Dad*/ * 2 + 1]/*.Len*/ + 1;
    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }
    tree[n * 2 + 1]/*.Len*/ = bits;
    /* We overwrite tree[n].Dad which is no longer needed */

    if (n > max_code) { continue; } /* not a leaf node */

    s.bl_count[bits]++;
    xbits = 0;
    if (n >= base) {
      xbits = extra[n - base];
    }
    f = tree[n * 2]/*.Freq*/;
    s.opt_len += f * (bits + xbits);
    if (has_stree) {
      s.static_len += f * (stree[n * 2 + 1]/*.Len*/ + xbits);
    }
  }
  if (overflow === 0) { return; }

  // Trace((stderr,"\nbit length overflow\n"));
  /* This happens for example on obj2 and pic of the Calgary corpus */

  /* Find the first bit length which could increase: */
  do {
    bits = max_length - 1;
    while (s.bl_count[bits] === 0) { bits--; }
    s.bl_count[bits]--;      /* move one leaf down the tree */
    s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */
    s.bl_count[max_length]--;
    /* The brother of the overflow item also moves one step up,
     * but this does not affect bl_count[max_length]
     */
    overflow -= 2;
  } while (overflow > 0);

  /* Now recompute all bit lengths, scanning in increasing frequency.
   * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
   * lengths instead of fixing only the wrong ones. This idea is taken
   * from 'ar' written by Haruhiko Okumura.)
   */
  for (bits = max_length; bits !== 0; bits--) {
    n = s.bl_count[bits];
    while (n !== 0) {
      m = s.heap[--h];
      if (m > max_code) { continue; }
      if (tree[m * 2 + 1]/*.Len*/ !== bits) {
        // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
        s.opt_len += (bits - tree[m * 2 + 1]/*.Len*/) * tree[m * 2]/*.Freq*/;
        tree[m * 2 + 1]/*.Len*/ = bits;
      }
      n--;
    }
  }
}


/* ===========================================================================
 * Generate the codes for a given tree and bit counts (which need not be
 * optimal).
 * IN assertion: the array bl_count contains the bit length statistics for
 * the given tree and the field len is set for all tree elements.
 * OUT assertion: the field code is set for all tree elements of non
 *     zero code length.
 */
function gen_codes(tree, max_code, bl_count)
//    ct_data *tree;             /* the tree to decorate */
//    int max_code;              /* largest code with non zero frequency */
//    ushf *bl_count;            /* number of codes at each bit length */
{
  var next_code = new Array(MAX_BITS + 1); /* next code value for each bit length */
  var code = 0;              /* running code value */
  var bits;                  /* bit index */
  var n;                     /* code index */

  /* The distribution counts are first used to generate the code values
   * without bit reversal.
   */
  for (bits = 1; bits <= MAX_BITS; bits++) {
    next_code[bits] = code = (code + bl_count[bits - 1]) << 1;
  }
  /* Check that the bit counts in bl_count are consistent. The last code
   * must be all ones.
   */
  //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
  //        "inconsistent bit counts");
  //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

  for (n = 0;  n <= max_code; n++) {
    var len = tree[n * 2 + 1]/*.Len*/;
    if (len === 0) { continue; }
    /* Now reverse the bits */
    tree[n * 2]/*.Code*/ = bi_reverse(next_code[len]++, len);

    //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
    //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
  }
}


/* ===========================================================================
 * Initialize the various 'constant' tables.
 */
function tr_static_init() {
  var n;        /* iterates over tree elements */
  var bits;     /* bit counter */
  var length;   /* length value */
  var code;     /* code value */
  var dist;     /* distance index */
  var bl_count = new Array(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */

  // do check in _tr_init()
  //if (static_init_done) return;

  /* For some embedded targets, global variables are not initialized: */
/*#ifdef NO_INIT_GLOBAL_POINTERS
  static_l_desc.static_tree = static_ltree;
  static_l_desc.extra_bits = extra_lbits;
  static_d_desc.static_tree = static_dtree;
  static_d_desc.extra_bits = extra_dbits;
  static_bl_desc.extra_bits = extra_blbits;
#endif*/

  /* Initialize the mapping length (0..255) -> length code (0..28) */
  length = 0;
  for (code = 0; code < LENGTH_CODES - 1; code++) {
    base_length[code] = length;
    for (n = 0; n < (1 << extra_lbits[code]); n++) {
      _length_code[length++] = code;
    }
  }
  //Assert (length == 256, "tr_static_init: length != 256");
  /* Note that the length 255 (match length 258) can be represented
   * in two different ways: code 284 + 5 bits or code 285, so we
   * overwrite length_code[255] to use the best encoding:
   */
  _length_code[length - 1] = code;

  /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
  dist = 0;
  for (code = 0; code < 16; code++) {
    base_dist[code] = dist;
    for (n = 0; n < (1 << extra_dbits[code]); n++) {
      _dist_code[dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: dist != 256");
  dist >>= 7; /* from now on, all distances are divided by 128 */
  for (; code < D_CODES; code++) {
    base_dist[code] = dist << 7;
    for (n = 0; n < (1 << (extra_dbits[code] - 7)); n++) {
      _dist_code[256 + dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: 256+dist != 512");

  /* Construct the codes of the static literal tree */
  for (bits = 0; bits <= MAX_BITS; bits++) {
    bl_count[bits] = 0;
  }

  n = 0;
  while (n <= 143) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  while (n <= 255) {
    static_ltree[n * 2 + 1]/*.Len*/ = 9;
    n++;
    bl_count[9]++;
  }
  while (n <= 279) {
    static_ltree[n * 2 + 1]/*.Len*/ = 7;
    n++;
    bl_count[7]++;
  }
  while (n <= 287) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  /* Codes 286 and 287 do not exist, but we must include them in the
   * tree construction to get a canonical Huffman tree (longest code
   * all ones)
   */
  gen_codes(static_ltree, L_CODES + 1, bl_count);

  /* The static distance tree is trivial: */
  for (n = 0; n < D_CODES; n++) {
    static_dtree[n * 2 + 1]/*.Len*/ = 5;
    static_dtree[n * 2]/*.Code*/ = bi_reverse(n, 5);
  }

  // Now data ready and we can init static trees
  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0,          D_CODES, MAX_BITS);
  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0,         BL_CODES, MAX_BL_BITS);

  //static_init_done = true;
}


/* ===========================================================================
 * Initialize a new block.
 */
function init_block(s) {
  var n; /* iterates over tree elements */

  /* Initialize the trees. */
  for (n = 0; n < L_CODES;  n++) { s.dyn_ltree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < D_CODES;  n++) { s.dyn_dtree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < BL_CODES; n++) { s.bl_tree[n * 2]/*.Freq*/ = 0; }

  s.dyn_ltree[END_BLOCK * 2]/*.Freq*/ = 1;
  s.opt_len = s.static_len = 0;
  s.last_lit = s.matches = 0;
}


/* ===========================================================================
 * Flush the bit buffer and align the output on a byte boundary
 */
function bi_windup(s)
{
  if (s.bi_valid > 8) {
    put_short(s, s.bi_buf);
  } else if (s.bi_valid > 0) {
    //put_byte(s, (Byte)s->bi_buf);
    s.pending_buf[s.pending++] = s.bi_buf;
  }
  s.bi_buf = 0;
  s.bi_valid = 0;
}

/* ===========================================================================
 * Copy a stored block, storing first the length and its
 * one's complement if requested.
 */
function copy_block(s, buf, len, header)
//DeflateState *s;
//charf    *buf;    /* the input data */
//unsigned len;     /* its length */
//int      header;  /* true if block header must be written */
{
  bi_windup(s);        /* align on byte boundary */

  if (header) {
    put_short(s, len);
    put_short(s, ~len);
  }
//  while (len--) {
//    put_byte(s, *buf++);
//  }
  utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
  s.pending += len;
}

/* ===========================================================================
 * Compares to subtrees, using the tree depth as tie breaker when
 * the subtrees have equal frequency. This minimizes the worst case length.
 */
function smaller(tree, n, m, depth) {
  var _n2 = n * 2;
  var _m2 = m * 2;
  return (tree[_n2]/*.Freq*/ < tree[_m2]/*.Freq*/ ||
         (tree[_n2]/*.Freq*/ === tree[_m2]/*.Freq*/ && depth[n] <= depth[m]));
}

/* ===========================================================================
 * Restore the heap property by moving down the tree starting at node k,
 * exchanging a node with the smallest of its two sons if necessary, stopping
 * when the heap property is re-established (each father smaller than its
 * two sons).
 */
function pqdownheap(s, tree, k)
//    deflate_state *s;
//    ct_data *tree;  /* the tree to restore */
//    int k;               /* node to move down */
{
  var v = s.heap[k];
  var j = k << 1;  /* left son of k */
  while (j <= s.heap_len) {
    /* Set j to the smallest of the two sons: */
    if (j < s.heap_len &&
      smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
      j++;
    }
    /* Exit if v is smaller than both sons */
    if (smaller(tree, v, s.heap[j], s.depth)) { break; }

    /* Exchange v with the smallest son */
    s.heap[k] = s.heap[j];
    k = j;

    /* And continue down the tree, setting j to the left son of k */
    j <<= 1;
  }
  s.heap[k] = v;
}


// inlined manually
// var SMALLEST = 1;

/* ===========================================================================
 * Send the block data compressed using the given Huffman trees
 */
function compress_block(s, ltree, dtree)
//    deflate_state *s;
//    const ct_data *ltree; /* literal tree */
//    const ct_data *dtree; /* distance tree */
{
  var dist;           /* distance of matched string */
  var lc;             /* match length or unmatched char (if dist == 0) */
  var lx = 0;         /* running index in l_buf */
  var code;           /* the code to send */
  var extra;          /* number of extra bits to send */

  if (s.last_lit !== 0) {
    do {
      dist = (s.pending_buf[s.d_buf + lx * 2] << 8) | (s.pending_buf[s.d_buf + lx * 2 + 1]);
      lc = s.pending_buf[s.l_buf + lx];
      lx++;

      if (dist === 0) {
        send_code(s, lc, ltree); /* send a literal byte */
        //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
      } else {
        /* Here, lc is the match length - MIN_MATCH */
        code = _length_code[lc];
        send_code(s, code + LITERALS + 1, ltree); /* send the length code */
        extra = extra_lbits[code];
        if (extra !== 0) {
          lc -= base_length[code];
          send_bits(s, lc, extra);       /* send the extra length bits */
        }
        dist--; /* dist is now the match distance - 1 */
        code = d_code(dist);
        //Assert (code < D_CODES, "bad d_code");

        send_code(s, code, dtree);       /* send the distance code */
        extra = extra_dbits[code];
        if (extra !== 0) {
          dist -= base_dist[code];
          send_bits(s, dist, extra);   /* send the extra distance bits */
        }
      } /* literal or match pair ? */

      /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
      //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
      //       "pendingBuf overflow");

    } while (lx < s.last_lit);
  }

  send_code(s, END_BLOCK, ltree);
}


/* ===========================================================================
 * Construct one Huffman tree and assigns the code bit strings and lengths.
 * Update the total bit length for the current block.
 * IN assertion: the field freq is set for all tree elements.
 * OUT assertions: the fields len and code are set to the optimal bit length
 *     and corresponding code. The length opt_len is updated; static_len is
 *     also updated if stree is not null. The field max_code is set.
 */
function build_tree(s, desc)
//    deflate_state *s;
//    tree_desc *desc; /* the tree descriptor */
{
  var tree     = desc.dyn_tree;
  var stree    = desc.stat_desc.static_tree;
  var has_stree = desc.stat_desc.has_stree;
  var elems    = desc.stat_desc.elems;
  var n, m;          /* iterate over heap elements */
  var max_code = -1; /* largest code with non zero frequency */
  var node;          /* new node being created */

  /* Construct the initial heap, with least frequent element in
   * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
   * heap[0] is not used.
   */
  s.heap_len = 0;
  s.heap_max = HEAP_SIZE;

  for (n = 0; n < elems; n++) {
    if (tree[n * 2]/*.Freq*/ !== 0) {
      s.heap[++s.heap_len] = max_code = n;
      s.depth[n] = 0;

    } else {
      tree[n * 2 + 1]/*.Len*/ = 0;
    }
  }

  /* The pkzip format requires that at least one distance code exists,
   * and that at least one bit should be sent even if there is only one
   * possible code. So to avoid special checks later on we force at least
   * two codes of non zero frequency.
   */
  while (s.heap_len < 2) {
    node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
    tree[node * 2]/*.Freq*/ = 1;
    s.depth[node] = 0;
    s.opt_len--;

    if (has_stree) {
      s.static_len -= stree[node * 2 + 1]/*.Len*/;
    }
    /* node is 0 or 1 so it does not have extra bits */
  }
  desc.max_code = max_code;

  /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
   * establish sub-heaps of increasing lengths:
   */
  for (n = (s.heap_len >> 1/*int /2*/); n >= 1; n--) { pqdownheap(s, tree, n); }

  /* Construct the Huffman tree by repeatedly combining the least two
   * frequent nodes.
   */
  node = elems;              /* next internal node of the tree */
  do {
    //pqremove(s, tree, n);  /* n = node of least frequency */
    /*** pqremove ***/
    n = s.heap[1/*SMALLEST*/];
    s.heap[1/*SMALLEST*/] = s.heap[s.heap_len--];
    pqdownheap(s, tree, 1/*SMALLEST*/);
    /***/

    m = s.heap[1/*SMALLEST*/]; /* m = node of next least frequency */

    s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
    s.heap[--s.heap_max] = m;

    /* Create a new node father of n and m */
    tree[node * 2]/*.Freq*/ = tree[n * 2]/*.Freq*/ + tree[m * 2]/*.Freq*/;
    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
    tree[n * 2 + 1]/*.Dad*/ = tree[m * 2 + 1]/*.Dad*/ = node;

    /* and insert the new node in the heap */
    s.heap[1/*SMALLEST*/] = node++;
    pqdownheap(s, tree, 1/*SMALLEST*/);

  } while (s.heap_len >= 2);

  s.heap[--s.heap_max] = s.heap[1/*SMALLEST*/];

  /* At this point, the fields freq and dad are set. We can now
   * generate the bit lengths.
   */
  gen_bitlen(s, desc);

  /* The field len is now set, we can generate the bit codes */
  gen_codes(tree, max_code, s.bl_count);
}


/* ===========================================================================
 * Scan a literal or distance tree to determine the frequencies of the codes
 * in the bit length tree.
 */
function scan_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree;   /* the tree to be scanned */
//    int max_code;    /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  tree[(max_code + 1) * 2 + 1]/*.Len*/ = 0xffff; /* guard */

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      s.bl_tree[curlen * 2]/*.Freq*/ += count;

    } else if (curlen !== 0) {

      if (curlen !== prevlen) { s.bl_tree[curlen * 2]/*.Freq*/++; }
      s.bl_tree[REP_3_6 * 2]/*.Freq*/++;

    } else if (count <= 10) {
      s.bl_tree[REPZ_3_10 * 2]/*.Freq*/++;

    } else {
      s.bl_tree[REPZ_11_138 * 2]/*.Freq*/++;
    }

    count = 0;
    prevlen = curlen;

    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Send a literal or distance tree in compressed form, using the codes in
 * bl_tree.
 */
function send_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree; /* the tree to be scanned */
//    int max_code;       /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  /* tree[max_code+1].Len = -1; */  /* guard already set */
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      do { send_code(s, curlen, s.bl_tree); } while (--count !== 0);

    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s, curlen, s.bl_tree);
        count--;
      }
      //Assert(count >= 3 && count <= 6, " 3_6?");
      send_code(s, REP_3_6, s.bl_tree);
      send_bits(s, count - 3, 2);

    } else if (count <= 10) {
      send_code(s, REPZ_3_10, s.bl_tree);
      send_bits(s, count - 3, 3);

    } else {
      send_code(s, REPZ_11_138, s.bl_tree);
      send_bits(s, count - 11, 7);
    }

    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Construct the Huffman tree for the bit lengths and return the index in
 * bl_order of the last bit length code to send.
 */
function build_bl_tree(s) {
  var max_blindex;  /* index of last bit length code of non zero freq */

  /* Determine the bit length frequencies for literal and distance trees */
  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

  /* Build the bit length tree: */
  build_tree(s, s.bl_desc);
  /* opt_len now includes the length of the tree representations, except
   * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
   */

  /* Determine the number of bit length codes to send. The pkzip format
   * requires that at least 4 bit length codes be sent. (appnote.txt says
   * 3 but the actual value used is 4.)
   */
  for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
    if (s.bl_tree[bl_order[max_blindex] * 2 + 1]/*.Len*/ !== 0) {
      break;
    }
  }
  /* Update opt_len to include the bit length tree and counts */
  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
  //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
  //        s->opt_len, s->static_len));

  return max_blindex;
}


/* ===========================================================================
 * Send the header for a block using dynamic Huffman trees: the counts, the
 * lengths of the bit length codes, the literal tree and the distance tree.
 * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
 */
function send_all_trees(s, lcodes, dcodes, blcodes)
//    deflate_state *s;
//    int lcodes, dcodes, blcodes; /* number of codes for each tree */
{
  var rank;                    /* index in bl_order */

  //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
  //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
  //        "too many codes");
  //Tracev((stderr, "\nbl counts: "));
  send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */
  send_bits(s, dcodes - 1,   5);
  send_bits(s, blcodes - 4,  4); /* not -3 as stated in appnote.txt */
  for (rank = 0; rank < blcodes; rank++) {
    //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
    send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1]/*.Len*/, 3);
  }
  //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */
  //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */
  //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
}


/* ===========================================================================
 * Check if the data type is TEXT or BINARY, using the following algorithm:
 * - TEXT if the two conditions below are satisfied:
 *    a) There are no non-portable control characters belonging to the
 *       "black list" (0..6, 14..25, 28..31).
 *    b) There is at least one printable character belonging to the
 *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
 * - BINARY otherwise.
 * - The following partially-portable control characters form a
 *   "gray list" that is ignored in this detection algorithm:
 *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
 * IN assertion: the fields Freq of dyn_ltree are set.
 */
function detect_data_type(s) {
  /* black_mask is the bit mask of black-listed bytes
   * set bits 0..6, 14..25, and 28..31
   * 0xf3ffc07f = binary 11110011111111111100000001111111
   */
  var black_mask = 0xf3ffc07f;
  var n;

  /* Check for non-textual ("black-listed") bytes. */
  for (n = 0; n <= 31; n++, black_mask >>>= 1) {
    if ((black_mask & 1) && (s.dyn_ltree[n * 2]/*.Freq*/ !== 0)) {
      return Z_BINARY;
    }
  }

  /* Check for textual ("white-listed") bytes. */
  if (s.dyn_ltree[9 * 2]/*.Freq*/ !== 0 || s.dyn_ltree[10 * 2]/*.Freq*/ !== 0 ||
      s.dyn_ltree[13 * 2]/*.Freq*/ !== 0) {
    return Z_TEXT;
  }
  for (n = 32; n < LITERALS; n++) {
    if (s.dyn_ltree[n * 2]/*.Freq*/ !== 0) {
      return Z_TEXT;
    }
  }

  /* There are no "black-listed" or "white-listed" bytes:
   * this stream either is empty or has tolerated ("gray-listed") bytes only.
   */
  return Z_BINARY;
}


var static_init_done = false;

/* ===========================================================================
 * Initialize the tree data structures for a new zlib stream.
 */
function _tr_init(s)
{

  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }

  s.l_desc  = new TreeDesc(s.dyn_ltree, static_l_desc);
  s.d_desc  = new TreeDesc(s.dyn_dtree, static_d_desc);
  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

  s.bi_buf = 0;
  s.bi_valid = 0;

  /* Initialize the first block of the first file: */
  init_block(s);
}


/* ===========================================================================
 * Send a stored block
 */
function _tr_stored_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);    /* send block type */
  copy_block(s, buf, stored_len, true); /* with header */
}


/* ===========================================================================
 * Send one empty static block to give enough lookahead for inflate.
 * This takes 10 bits, of which 7 may remain in the bit buffer.
 */
function _tr_align(s) {
  send_bits(s, STATIC_TREES << 1, 3);
  send_code(s, END_BLOCK, static_ltree);
  bi_flush(s);
}


/* ===========================================================================
 * Determine the best encoding for the current block: dynamic trees, static
 * trees or store, and output the encoded block to the zip file.
 */
function _tr_flush_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block, or NULL if too old */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  var opt_lenb, static_lenb;  /* opt_len and static_len in bytes */
  var max_blindex = 0;        /* index of last bit length code of non zero freq */

  /* Build the Huffman trees unless a stored block is forced */
  if (s.level > 0) {

    /* Check if the file is binary or text */
    if (s.strm.data_type === Z_UNKNOWN) {
      s.strm.data_type = detect_data_type(s);
    }

    /* Construct the literal and distance trees */
    build_tree(s, s.l_desc);
    // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));

    build_tree(s, s.d_desc);
    // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));
    /* At this point, opt_len and static_len are the total bit lengths of
     * the compressed block data, excluding the tree representations.
     */

    /* Build the bit length tree for the above two trees, and get the index
     * in bl_order of the last bit length code to send.
     */
    max_blindex = build_bl_tree(s);

    /* Determine the best encoding. Compute the block lengths in bytes. */
    opt_lenb = (s.opt_len + 3 + 7) >>> 3;
    static_lenb = (s.static_len + 3 + 7) >>> 3;

    // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
    //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
    //        s->last_lit));

    if (static_lenb <= opt_lenb) { opt_lenb = static_lenb; }

  } else {
    // Assert(buf != (char*)0, "lost buf");
    opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
  }

  if ((stored_len + 4 <= opt_lenb) && (buf !== -1)) {
    /* 4: two words for the lengths */

    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
     * Otherwise we can't have processed more than WSIZE input bytes since
     * the last block flush, because compression would have been
     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
     * transform a block into a stored block.
     */
    _tr_stored_block(s, buf, stored_len, last);

  } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {

    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
    compress_block(s, static_ltree, static_dtree);

  } else {
    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
    compress_block(s, s.dyn_ltree, s.dyn_dtree);
  }
  // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
  /* The above check is made mod 2^32, for files larger than 512 MB
   * and uLong implemented on 32 bits.
   */
  init_block(s);

  if (last) {
    bi_windup(s);
  }
  // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
  //       s->compressed_len-7*last));
}

/* ===========================================================================
 * Save the match info and tally the frequency counts. Return true if
 * the current block must be flushed.
 */
function _tr_tally(s, dist, lc)
//    deflate_state *s;
//    unsigned dist;  /* distance of matched string */
//    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
{
  //var out_length, in_length, dcode;

  s.pending_buf[s.d_buf + s.last_lit * 2]     = (dist >>> 8) & 0xff;
  s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;

  s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
  s.last_lit++;

  if (dist === 0) {
    /* lc is the unmatched char */
    s.dyn_ltree[lc * 2]/*.Freq*/++;
  } else {
    s.matches++;
    /* Here, lc is the match length - MIN_MATCH */
    dist--;             /* dist = match distance - 1 */
    //Assert((ush)dist < (ush)MAX_DIST(s) &&
    //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
    //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

    s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]/*.Freq*/++;
    s.dyn_dtree[d_code(dist) * 2]/*.Freq*/++;
  }

// (!) This block is disabled in zlib defaults,
// don't enable it for binary compatibility

//#ifdef TRUNCATE_BLOCK
//  /* Try to guess if it is profitable to stop the current block here */
//  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
//    /* Compute an upper bound for the compressed length */
//    out_length = s.last_lit*8;
//    in_length = s.strstart - s.block_start;
//
//    for (dcode = 0; dcode < D_CODES; dcode++) {
//      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
//    }
//    out_length >>>= 3;
//    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
//    //       s->last_lit, in_length, out_length,
//    //       100L - out_length*100L/in_length));
//    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
//      return true;
//    }
//  }
//#endif

  return (s.last_lit === s.lit_bufsize - 1);
  /* We avoid equality with lit_bufsize because of wraparound at 64K
   * on 16 bit machines and because stored blocks are restricted to
   * 64K-1 bytes.
   */
}

exports._tr_init  = _tr_init;
exports._tr_stored_block = _tr_stored_block;
exports._tr_flush_block  = _tr_flush_block;
exports._tr_tally = _tr_tally;
exports._tr_align = _tr_align;


/***/ }),

/***/ "./node_modules/pako/lib/zlib/zstream.js":
/*!***********************************************!*\
  !*** ./node_modules/pako/lib/zlib/zstream.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function ZStream() {
  /* next input byte */
  this.input = null; // JS specific, because we have no pointers
  this.next_in = 0;
  /* number of bytes available at input */
  this.avail_in = 0;
  /* total number of input bytes read so far */
  this.total_in = 0;
  /* next output byte should be put there */
  this.output = null; // JS specific, because we have no pointers
  this.next_out = 0;
  /* remaining free space at output */
  this.avail_out = 0;
  /* total number of bytes output so far */
  this.total_out = 0;
  /* last error message, NULL if no error */
  this.msg = ''/*Z_NULL*/;
  /* not visible by applications */
  this.state = null;
  /* best guess about the data type: binary or text */
  this.data_type = 2/*Z_UNKNOWN*/;
  /* adler32 value of the uncompressed data */
  this.adler = 0;
}

module.exports = ZStream;


/***/ }),

/***/ "./src/abi.abi.json":
/*!**************************!*\
  !*** ./src/abi.abi.json ***!
  \**************************/
/*! exports provided: version, structs, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"version\":\"eosio::abi/1.1\",\"structs\":[{\"name\":\"extensions_entry\",\"base\":\"\",\"fields\":[{\"name\":\"tag\",\"type\":\"uint16\"},{\"name\":\"value\",\"type\":\"bytes\"}]},{\"name\":\"type_def\",\"base\":\"\",\"fields\":[{\"name\":\"new_type_name\",\"type\":\"string\"},{\"name\":\"type\",\"type\":\"string\"}]},{\"name\":\"field_def\",\"base\":\"\",\"fields\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"type\",\"type\":\"string\"}]},{\"name\":\"struct_def\",\"base\":\"\",\"fields\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"base\",\"type\":\"string\"},{\"name\":\"fields\",\"type\":\"field_def[]\"}]},{\"name\":\"action_def\",\"base\":\"\",\"fields\":[{\"name\":\"name\",\"type\":\"name\"},{\"name\":\"type\",\"type\":\"string\"},{\"name\":\"ricardian_contract\",\"type\":\"string\"}]},{\"name\":\"table_def\",\"base\":\"\",\"fields\":[{\"name\":\"name\",\"type\":\"name\"},{\"name\":\"index_type\",\"type\":\"string\"},{\"name\":\"key_names\",\"type\":\"string[]\"},{\"name\":\"key_types\",\"type\":\"string[]\"},{\"name\":\"type\",\"type\":\"string\"}]},{\"name\":\"clause_pair\",\"base\":\"\",\"fields\":[{\"name\":\"id\",\"type\":\"string\"},{\"name\":\"body\",\"type\":\"string\"}]},{\"name\":\"error_message\",\"base\":\"\",\"fields\":[{\"name\":\"error_code\",\"type\":\"uint64\"},{\"name\":\"error_msg\",\"type\":\"string\"}]},{\"name\":\"variant_def\",\"base\":\"\",\"fields\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"types\",\"type\":\"string[]\"}]},{\"name\":\"abi_def\",\"base\":\"\",\"fields\":[{\"name\":\"version\",\"type\":\"string\"},{\"name\":\"types\",\"type\":\"type_def[]\"},{\"name\":\"structs\",\"type\":\"struct_def[]\"},{\"name\":\"actions\",\"type\":\"action_def[]\"},{\"name\":\"tables\",\"type\":\"table_def[]\"},{\"name\":\"ricardian_clauses\",\"type\":\"clause_pair[]\"},{\"name\":\"error_messages\",\"type\":\"error_message[]\"},{\"name\":\"abi_extensions\",\"type\":\"extensions_entry[]\"},{\"name\":\"variants\",\"type\":\"variant_def[]$\"}]}]}");

/***/ }),

/***/ "./src/eosjs-api.ts":
/*!**************************!*\
  !*** ./src/eosjs-api.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module API
 */
// copyright defined in eosjs/LICENSE.txt
/* eslint-disable max-classes-per-file */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.Api = void 0;
var pako_1 = __webpack_require__(/*! pako */ "./node_modules/pako/index.js");
var ser = __webpack_require__(/*! ./eosjs-serialize */ "./src/eosjs-serialize.ts");
var abiAbi = __webpack_require__(/*! ../src/abi.abi.json */ "./src/abi.abi.json");
var transactionAbi = __webpack_require__(/*! ../src/transaction.abi.json */ "./src/transaction.abi.json");
var Api = /** @class */ (function () {
    /**
     * @param args
     * * `rpc`: Issues RPC calls
     * * `authorityProvider`: Get public keys needed to meet authorities in a transaction
     * * `abiProvider`: Supplies ABIs in raw form (binary)
     * * `signatureProvider`: Signs transactions
     * * `chainId`: Identifies chain
     * * `textEncoder`: `TextEncoder` instance to use. Pass in `null` if running in a browser
     * * `textDecoder`: `TextDecoder` instance to use. Pass in `null` if running in a browser
     */
    function Api(args) {
        /** Holds information needed to serialize contract actions */
        this.contracts = new Map();
        /** Fetched abis */
        this.cachedAbis = new Map();
        this.rpc = args.rpc;
        this.authorityProvider = args.authorityProvider || args.rpc;
        this.abiProvider = args.abiProvider || args.rpc;
        this.signatureProvider = args.signatureProvider;
        this.chainId = args.chainId;
        this.textEncoder = args.textEncoder;
        this.textDecoder = args.textDecoder;
        this.abiTypes = ser.getTypesFromAbi(ser.createInitialTypes(), abiAbi);
        this.transactionTypes = ser.getTypesFromAbi(ser.createInitialTypes(), transactionAbi);
    }
    /** Decodes an abi as Uint8Array into json. */
    Api.prototype.rawAbiToJson = function (rawAbi) {
        var buffer = new ser.SerialBuffer({
            textEncoder: this.textEncoder,
            textDecoder: this.textDecoder,
            array: rawAbi,
        });
        if (!ser.supportedAbiVersion(buffer.getString())) {
            throw new Error('Unsupported abi version');
        }
        buffer.restartRead();
        return this.abiTypes.get('abi_def').deserialize(buffer);
    };
    /** Encodes a json abi as Uint8Array. */
    Api.prototype.jsonToRawAbi = function (jsonAbi) {
        var buffer = new ser.SerialBuffer({
            textEncoder: this.textEncoder,
            textDecoder: this.textDecoder,
        });
        this.abiTypes.get('abi_def').serialize(buffer, jsonAbi);
        if (!ser.supportedAbiVersion(buffer.getString())) {
            throw new Error('Unsupported abi version');
        }
        return buffer.asUint8Array();
    };
    /** Get abi in both binary and structured forms. Fetch when needed. */
    Api.prototype.getCachedAbi = function (accountName, reload) {
        if (reload === void 0) { reload = false; }
        return __awaiter(this, void 0, void 0, function () {
            var cachedAbi, rawAbi, abi, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!reload && this.cachedAbis.get(accountName)) {
                            return [2 /*return*/, this.cachedAbis.get(accountName)];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.abiProvider.getRawAbi(accountName)];
                    case 2:
                        rawAbi = (_a.sent()).abi;
                        abi = this.rawAbiToJson(rawAbi);
                        cachedAbi = { rawAbi: rawAbi, abi: abi };
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        e_1.message = "fetching abi for " + accountName + ": " + e_1.message;
                        throw e_1;
                    case 4:
                        if (!cachedAbi) {
                            throw new Error("Missing abi for " + accountName);
                        }
                        this.cachedAbis.set(accountName, cachedAbi);
                        return [2 /*return*/, cachedAbi];
                }
            });
        });
    };
    Api.prototype.setCachedAbi = function (accountName, _abi) {
        var cachedAbi;
        try {
            var rawAbi = this.jsonToRawAbi(_abi);
            var abi = this.rawAbiToJson(rawAbi);
            cachedAbi = { rawAbi: rawAbi, abi: abi };
        }
        catch (e) {
            e.message = "fetching abi for " + accountName + ": " + e.message;
            throw e;
        }
        if (!cachedAbi) {
            throw new Error("Missing abi for " + accountName);
        }
        this.cachedAbis.set(accountName, cachedAbi);
    };
    /** Get abi in structured form. Fetch when needed. */
    Api.prototype.getAbi = function (accountName, reload) {
        if (reload === void 0) { reload = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCachedAbi(accountName, reload)];
                    case 1: return [2 /*return*/, (_a.sent()).abi];
                }
            });
        });
    };
    /** Get abis needed by a transaction */
    Api.prototype.getTransactionAbis = function (transaction, reload) {
        if (reload === void 0) { reload = false; }
        return __awaiter(this, void 0, void 0, function () {
            var actions, accounts, uniqueAccounts, actionPromises;
            var _this = this;
            return __generator(this, function (_a) {
                actions = (transaction.context_free_actions || []).concat(transaction.actions);
                accounts = actions.map(function (action) { return action.account; });
                uniqueAccounts = new Set(accounts);
                actionPromises = __spread(uniqueAccounts).map(function (account) { return __awaiter(_this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = {
                                    accountName: account
                                };
                                return [4 /*yield*/, this.getCachedAbi(account, reload)];
                            case 1: return [2 /*return*/, (_a.abi = (_b.sent()).rawAbi,
                                    _a)];
                        }
                    });
                }); });
                return [2 /*return*/, Promise.all(actionPromises)];
            });
        });
    };
    /** Get data needed to serialize actions in a contract */
    Api.prototype.getContract = function (accountName, reload) {
        if (reload === void 0) { reload = false; }
        return __awaiter(this, void 0, void 0, function () {
            var abi, types, actions, _a, _b, _c, name_1, type, result;
            var e_2, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!reload && this.contracts.get(accountName)) {
                            return [2 /*return*/, this.contracts.get(accountName)];
                        }
                        return [4 /*yield*/, this.getAbi(accountName, reload)];
                    case 1:
                        abi = _e.sent();
                        types = ser.getTypesFromAbi(ser.createInitialTypes(), abi);
                        actions = new Map();
                        try {
                            for (_a = __values(abi.actions), _b = _a.next(); !_b.done; _b = _a.next()) {
                                _c = _b.value, name_1 = _c.name, type = _c.type;
                                actions.set(name_1, ser.getType(types, type));
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        result = { types: types, actions: actions };
                        this.contracts.set(accountName, result);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /** Convert `value` to binary form. `type` must be a built-in abi type or in `transaction.abi.json`. */
    Api.prototype.serialize = function (buffer, type, value) {
        this.transactionTypes.get(type).serialize(buffer, value);
    };
    /** Convert data in `buffer` to structured form. `type` must be a built-in abi type or in `transaction.abi.json`. */
    Api.prototype.deserialize = function (buffer, type) {
        return this.transactionTypes.get(type).deserialize(buffer);
    };
    /** Convert a transaction to binary */
    Api.prototype.serializeTransaction = function (transaction) {
        var buffer = new ser.SerialBuffer({ textEncoder: this.textEncoder, textDecoder: this.textDecoder });
        this.serialize(buffer, 'transaction', __assign({ max_net_usage_words: 0, max_cpu_usage_ms: 0, delay_sec: 0, context_free_actions: [], actions: [], transaction_extensions: [] }, transaction));
        return buffer.asUint8Array();
    };
    /** Serialize context-free data */
    Api.prototype.serializeContextFreeData = function (contextFreeData) {
        var e_3, _a;
        if (!contextFreeData || !contextFreeData.length) {
            return null;
        }
        var buffer = new ser.SerialBuffer({ textEncoder: this.textEncoder, textDecoder: this.textDecoder });
        buffer.pushVaruint32(contextFreeData.length);
        try {
            for (var contextFreeData_1 = __values(contextFreeData), contextFreeData_1_1 = contextFreeData_1.next(); !contextFreeData_1_1.done; contextFreeData_1_1 = contextFreeData_1.next()) {
                var data = contextFreeData_1_1.value;
                buffer.pushBytes(data);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (contextFreeData_1_1 && !contextFreeData_1_1.done && (_a = contextFreeData_1.return)) _a.call(contextFreeData_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return buffer.asUint8Array();
    };
    /** Convert a transaction from binary. Leaves actions in hex. */
    Api.prototype.deserializeTransaction = function (transaction) {
        var buffer = new ser.SerialBuffer({ textEncoder: this.textEncoder, textDecoder: this.textDecoder });
        buffer.pushArray(transaction);
        return this.deserialize(buffer, 'transaction');
    };
    /** Convert actions to hex */
    Api.prototype.serializeActions = function (actions) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(actions.map(function (_a) {
                            var account = _a.account, name = _a.name, authorization = _a.authorization, data = _a.data;
                            return __awaiter(_this, void 0, void 0, function () {
                                var contract;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, this.getContract(account)];
                                        case 1:
                                            contract = _b.sent();
                                            return [2 /*return*/, ser.serializeAction(contract, account, name, authorization, data, this.textEncoder, this.textDecoder)];
                                    }
                                });
                            });
                        }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Convert actions from hex */
    Api.prototype.deserializeActions = function (actions) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(actions.map(function (_a) {
                            var account = _a.account, name = _a.name, authorization = _a.authorization, data = _a.data;
                            return __awaiter(_this, void 0, void 0, function () {
                                var contract;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, this.getContract(account)];
                                        case 1:
                                            contract = _b.sent();
                                            return [2 /*return*/, ser.deserializeAction(contract, account, name, authorization, data, this.textEncoder, this.textDecoder)];
                                    }
                                });
                            });
                        }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Api.prototype.serializeAbiType = function (account, typeName, data) {
        return __awaiter(this, void 0, void 0, function () {
            var contract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getContract(account)];
                    case 1:
                        contract = _a.sent();
                        return [2 /*return*/, ser.serializeAbiType(contract, account, typeName, data, this.textEncoder, this.textDecoder)];
                }
            });
        });
    };
    Api.prototype.deserializeAbiType = function (account, typeName, data) {
        return __awaiter(this, void 0, void 0, function () {
            var contract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getContract(account)];
                    case 1:
                        contract = _a.sent();
                        return [2 /*return*/, ser.deserializeAbiType(contract, account, typeName, data, this.textEncoder, this.textDecoder)];
                }
            });
        });
    };
    /** Convert a transaction from binary. Also deserializes actions. */
    Api.prototype.deserializeTransactionWithActions = function (transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var deserializedTransaction, deserializedCFActions, deserializedActions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof transaction === 'string') {
                            transaction = ser.hexToUint8Array(transaction);
                        }
                        deserializedTransaction = this.deserializeTransaction(transaction);
                        return [4 /*yield*/, this.deserializeActions(deserializedTransaction.context_free_actions)];
                    case 1:
                        deserializedCFActions = _a.sent();
                        return [4 /*yield*/, this.deserializeActions(deserializedTransaction.actions)];
                    case 2:
                        deserializedActions = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, deserializedTransaction), { context_free_actions: deserializedCFActions, actions: deserializedActions })];
                }
            });
        });
    };
    /** Deflate a serialized object */
    Api.prototype.deflateSerializedArray = function (serializedArray) {
        return pako_1.deflate(serializedArray, { level: 9 });
    };
    /** Inflate a compressed serialized object */
    Api.prototype.inflateSerializedArray = function (compressedSerializedArray) {
        return pako_1.inflate(compressedSerializedArray);
    };
    /**
     * Create and optionally broadcast a transaction.
     *
     * Named Parameters:
     * `broadcast`: broadcast this transaction?
     * `sign`: sign this transaction?
     * `compression`: compress this transaction?
     *
     * If both `blocksBehind` and `expireSeconds` are present,
     * then fetch the block which is `blocksBehind` behind head block,
     * use it as a reference for TAPoS, and expire the transaction `expireSeconds` after that block's time.
     *
     * If both `useLastIrreversible` and `expireSeconds` are present,
     * then fetch the last irreversible block, use it as a reference for TAPoS,
     * and expire the transaction `expireSeconds` after that block's time.
     *
     * @returns node response if `broadcast`, `{signatures, serializedTransaction}` if `!broadcast`
     */
    Api.prototype.transact = function (transaction, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.broadcast, broadcast = _c === void 0 ? true : _c, _d = _b.sign, sign = _d === void 0 ? true : _d, compression = _b.compression, blocksBehind = _b.blocksBehind, useLastIrreversible = _b.useLastIrreversible, expireSeconds = _b.expireSeconds;
        return __awaiter(this, void 0, void 0, function () {
            var info, abis, _e, _f, serializedTransaction, serializedContextFreeData, pushTransactionArgs, availableKeys, requiredKeys;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (typeof blocksBehind === 'number' && useLastIrreversible) {
                            throw new Error('Use either blocksBehind or useLastIrreversible');
                        }
                        if (!!this.chainId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.rpc.get_info()];
                    case 1:
                        info = _g.sent();
                        this.chainId = info.chain_id;
                        _g.label = 2;
                    case 2:
                        if (!((typeof blocksBehind === 'number' || useLastIrreversible) && expireSeconds)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.generateTapos(info, transaction, blocksBehind, useLastIrreversible, expireSeconds)];
                    case 3:
                        transaction = _g.sent();
                        _g.label = 4;
                    case 4:
                        if (!this.hasRequiredTaposFields(transaction)) {
                            throw new Error('Required configuration or TAPOS fields are not present');
                        }
                        return [4 /*yield*/, this.getTransactionAbis(transaction)];
                    case 5:
                        abis = _g.sent();
                        _e = [__assign({}, transaction)];
                        _f = {};
                        return [4 /*yield*/, this.serializeActions(transaction.context_free_actions || [])];
                    case 6:
                        _f.context_free_actions = _g.sent();
                        return [4 /*yield*/, this.serializeActions(transaction.actions)];
                    case 7:
                        transaction = __assign.apply(void 0, _e.concat([(_f.actions = _g.sent(), _f)]));
                        serializedTransaction = this.serializeTransaction(transaction);
                        serializedContextFreeData = this.serializeContextFreeData(transaction.context_free_data);
                        pushTransactionArgs = {
                            serializedTransaction: serializedTransaction, serializedContextFreeData: serializedContextFreeData,
                            signatures: []
                        };
                        if (!sign) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.signatureProvider.getAvailableKeys()];
                    case 8:
                        availableKeys = _g.sent();
                        return [4 /*yield*/, this.authorityProvider.getRequiredKeys({ transaction: transaction, availableKeys: availableKeys })];
                    case 9:
                        requiredKeys = _g.sent();
                        return [4 /*yield*/, this.signatureProvider.sign({
                                chainId: this.chainId,
                                requiredKeys: requiredKeys,
                                serializedTransaction: serializedTransaction,
                                serializedContextFreeData: serializedContextFreeData,
                                abis: abis,
                            })];
                    case 10:
                        pushTransactionArgs = _g.sent();
                        _g.label = 11;
                    case 11:
                        if (broadcast) {
                            if (compression) {
                                return [2 /*return*/, this.pushCompressedSignedTransaction(pushTransactionArgs)];
                            }
                            return [2 /*return*/, this.pushSignedTransaction(pushTransactionArgs)];
                        }
                        return [2 /*return*/, pushTransactionArgs];
                }
            });
        });
    };
    /** Broadcast a signed transaction */
    Api.prototype.pushSignedTransaction = function (_a) {
        var signatures = _a.signatures, serializedTransaction = _a.serializedTransaction, serializedContextFreeData = _a.serializedContextFreeData;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.rpc.push_transaction({
                        signatures: signatures,
                        serializedTransaction: serializedTransaction,
                        serializedContextFreeData: serializedContextFreeData
                    })];
            });
        });
    };
    Api.prototype.pushCompressedSignedTransaction = function (_a) {
        var signatures = _a.signatures, serializedTransaction = _a.serializedTransaction, serializedContextFreeData = _a.serializedContextFreeData;
        return __awaiter(this, void 0, void 0, function () {
            var compressedSerializedTransaction, compressedSerializedContextFreeData;
            return __generator(this, function (_b) {
                compressedSerializedTransaction = this.deflateSerializedArray(serializedTransaction);
                compressedSerializedContextFreeData = this.deflateSerializedArray(serializedContextFreeData || new Uint8Array(0));
                return [2 /*return*/, this.rpc.push_transaction({
                        signatures: signatures,
                        compression: 1,
                        serializedTransaction: compressedSerializedTransaction,
                        serializedContextFreeData: compressedSerializedContextFreeData
                    })];
            });
        });
    };
    Api.prototype.generateTapos = function (info, transaction, blocksBehind, useLastIrreversible, expireSeconds) {
        return __awaiter(this, void 0, void 0, function () {
            var taposBlockNumber, refBlock, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!info) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.rpc.get_info()];
                    case 1:
                        info = _b.sent();
                        _b.label = 2;
                    case 2:
                        taposBlockNumber = useLastIrreversible
                            ? info.last_irreversible_block_num : info.head_block_num - blocksBehind;
                        if (!(taposBlockNumber <= info.last_irreversible_block_num)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.rpc.get_block(taposBlockNumber)];
                    case 3:
                        _a = _b.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.tryGetBlockHeaderState(taposBlockNumber)];
                    case 5:
                        _a = _b.sent();
                        _b.label = 6;
                    case 6:
                        refBlock = _a;
                        return [2 /*return*/, __assign(__assign({}, ser.transactionHeader(refBlock, expireSeconds)), transaction)];
                }
            });
        });
    };
    // eventually break out into TransactionValidator class
    Api.prototype.hasRequiredTaposFields = function (_a) {
        var expiration = _a.expiration, ref_block_num = _a.ref_block_num, ref_block_prefix = _a.ref_block_prefix;
        return !!(expiration && typeof (ref_block_num) === 'number' && typeof (ref_block_prefix) === 'number');
    };
    Api.prototype.tryGetBlockHeaderState = function (taposBlockNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        return [4 /*yield*/, this.rpc.get_block_header_state(taposBlockNumber)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        return [4 /*yield*/, this.rpc.get_block(taposBlockNumber)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Api;
}()); // Api
exports.Api = Api;


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

/***/ "./src/eosjs-serialize.ts":
/*!********************************!*\
  !*** ./src/eosjs-serialize.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module Serialize
 */
// copyright defined in eosjs/LICENSE.txt
/* eslint-disable max-classes-per-file */
/* eslint-disable jsdoc/check-indentation */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.deserializeAction = exports.deserializeAbiType = exports.serializeAbiType = exports.deserializeActionData = exports.serializeAction = exports.serializeActionData = exports.transactionHeader = exports.getTypesFromAbi = exports.getType = exports.createInitialTypes = exports.hexToUint8Array = exports.arrayToHex = exports.symbolToString = exports.stringToSymbol = exports.blockTimestampToDate = exports.dateToBlockTimestamp = exports.timePointSecToDate = exports.dateToTimePointSec = exports.timePointToDate = exports.dateToTimePoint = exports.supportedAbiVersion = exports.SerialBuffer = exports.SerializerState = void 0;
var numeric = __webpack_require__(/*! ./eosjs-numeric */ "./src/eosjs-numeric.ts");
/** State for serialize() and deserialize() */
var SerializerState = /** @class */ (function () {
    function SerializerState(options) {
        if (options === void 0) { options = {}; }
        /** Have any binary extensions been skipped? */
        this.skippedBinaryExtension = false;
        this.options = options;
    }
    return SerializerState;
}());
exports.SerializerState = SerializerState;
/** Serialize and deserialize data */
var SerialBuffer = /** @class */ (function () {
    /**
     * @param __namedParameters
     * `array`: `null` if serializing, or binary data to deserialize
     * `textEncoder`: `TextEncoder` instance to use. Pass in `null` if running in a browser
     * `textDecoder`: `TextDecider` instance to use. Pass in `null` if running in a browser
     */
    function SerialBuffer(_a) {
        var _b = _a === void 0 ? {} : _a, textEncoder = _b.textEncoder, textDecoder = _b.textDecoder, array = _b.array;
        /** Current position while reading (deserializing) */
        this.readPos = 0;
        this.array = array || new Uint8Array(1024);
        this.length = array ? array.length : 0;
        this.textEncoder = textEncoder || new TextEncoder();
        this.textDecoder = textDecoder || new TextDecoder('utf-8', { fatal: true });
    }
    /** Resize `array` if needed to have at least `size` bytes free */
    SerialBuffer.prototype.reserve = function (size) {
        if (this.length + size <= this.array.length) {
            return;
        }
        var l = this.array.length;
        while (this.length + size > l) {
            l = Math.ceil(l * 1.5);
        }
        var newArray = new Uint8Array(l);
        newArray.set(this.array);
        this.array = newArray;
    };
    /** Is there data available to read? */
    SerialBuffer.prototype.haveReadData = function () {
        return this.readPos < this.length;
    };
    /** Restart reading from the beginning */
    SerialBuffer.prototype.restartRead = function () {
        this.readPos = 0;
    };
    /** Return data with excess storage trimmed away */
    SerialBuffer.prototype.asUint8Array = function () {
        return new Uint8Array(this.array.buffer, this.array.byteOffset, this.length);
    };
    /** Append bytes */
    SerialBuffer.prototype.pushArray = function (v) {
        this.reserve(v.length);
        this.array.set(v, this.length);
        this.length += v.length;
    };
    /** Append bytes */
    SerialBuffer.prototype.push = function () {
        var v = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            v[_i] = arguments[_i];
        }
        this.pushArray(v);
    };
    /** Get a single byte */
    SerialBuffer.prototype.get = function () {
        if (this.readPos < this.length) {
            return this.array[this.readPos++];
        }
        throw new Error('Read past end of buffer');
    };
    /** Append bytes in `v`. Throws if `len` doesn't match `v.length` */
    SerialBuffer.prototype.pushUint8ArrayChecked = function (v, len) {
        if (v.length !== len) {
            throw new Error('Binary data has incorrect size');
        }
        this.pushArray(v);
    };
    /** Get `len` bytes */
    SerialBuffer.prototype.getUint8Array = function (len) {
        if (this.readPos + len > this.length) {
            throw new Error('Read past end of buffer');
        }
        var result = new Uint8Array(this.array.buffer, this.array.byteOffset + this.readPos, len);
        this.readPos += len;
        return result;
    };
    /** Skip `len` bytes */
    SerialBuffer.prototype.skip = function (len) {
        if (this.readPos + len > this.length) {
            throw new Error('Read past end of buffer');
        }
        this.readPos += len;
    };
    /** Append a `uint16` */
    SerialBuffer.prototype.pushUint16 = function (v) {
        this.push((v >> 0) & 0xff, (v >> 8) & 0xff);
    };
    /** Get a `uint16` */
    SerialBuffer.prototype.getUint16 = function () {
        var v = 0;
        v |= this.get() << 0;
        v |= this.get() << 8;
        return v;
    };
    /** Append a `uint32` */
    SerialBuffer.prototype.pushUint32 = function (v) {
        this.push((v >> 0) & 0xff, (v >> 8) & 0xff, (v >> 16) & 0xff, (v >> 24) & 0xff);
    };
    /** Get a `uint32` */
    SerialBuffer.prototype.getUint32 = function () {
        var v = 0;
        v |= this.get() << 0;
        v |= this.get() << 8;
        v |= this.get() << 16;
        v |= this.get() << 24;
        return v >>> 0;
    };
    /** Append a `uint64`. *Caution*: `number` only has 53 bits of precision */
    SerialBuffer.prototype.pushNumberAsUint64 = function (v) {
        this.pushUint32(v >>> 0);
        this.pushUint32(Math.floor(v / 4294967296) >>> 0);
    };
    /**
     * Get a `uint64` as a `number`. *Caution*: `number` only has 53 bits of precision; some values will change.
     * `numeric.binaryToDecimal(serialBuffer.getUint8Array(8))` recommended instead
     */
    SerialBuffer.prototype.getUint64AsNumber = function () {
        var low = this.getUint32();
        var high = this.getUint32();
        return (high >>> 0) * 4294967296 + (low >>> 0);
    };
    /** Append a `varuint32` */
    SerialBuffer.prototype.pushVaruint32 = function (v) {
        while (true) {
            if (v >>> 7) {
                this.push(0x80 | (v & 0x7f));
                v = v >>> 7;
            }
            else {
                this.push(v);
                break;
            }
        }
    };
    /** Get a `varuint32` */
    SerialBuffer.prototype.getVaruint32 = function () {
        var v = 0;
        var bit = 0;
        while (true) {
            var b = this.get();
            v |= (b & 0x7f) << bit;
            bit += 7;
            if (!(b & 0x80)) {
                break;
            }
        }
        return v >>> 0;
    };
    /** Append a `varint32` */
    SerialBuffer.prototype.pushVarint32 = function (v) {
        this.pushVaruint32((v << 1) ^ (v >> 31));
    };
    /** Get a `varint32` */
    SerialBuffer.prototype.getVarint32 = function () {
        var v = this.getVaruint32();
        if (v & 1) {
            return ((~v) >> 1) | 2147483648;
        }
        else {
            return v >>> 1;
        }
    };
    /** Append a `float32` */
    SerialBuffer.prototype.pushFloat32 = function (v) {
        this.pushArray(new Uint8Array((new Float32Array([v])).buffer));
    };
    /** Get a `float32` */
    SerialBuffer.prototype.getFloat32 = function () {
        return new Float32Array(this.getUint8Array(4).slice().buffer)[0];
    };
    /** Append a `float64` */
    SerialBuffer.prototype.pushFloat64 = function (v) {
        this.pushArray(new Uint8Array((new Float64Array([v])).buffer));
    };
    /** Get a `float64` */
    SerialBuffer.prototype.getFloat64 = function () {
        return new Float64Array(this.getUint8Array(8).slice().buffer)[0];
    };
    /** Append a `name` */
    SerialBuffer.prototype.pushName = function (s) {
        if (typeof s !== 'string') {
            throw new Error('Expected string containing name');
        }
        var regex = new RegExp(/^[.1-5a-z]{0,12}[.1-5a-j]?$/);
        if (!regex.test(s)) {
            throw new Error('Name should be less than 13 characters, or less than 14 if last character is between 1-5 or a-j, and only contain the following symbols .12345abcdefghijklmnopqrstuvwxyz'); // eslint-disable-line
        }
        var charToSymbol = function (c) {
            if (c >= 'a'.charCodeAt(0) && c <= 'z'.charCodeAt(0)) {
                return (c - 'a'.charCodeAt(0)) + 6;
            }
            if (c >= '1'.charCodeAt(0) && c <= '5'.charCodeAt(0)) {
                return (c - '1'.charCodeAt(0)) + 1;
            }
            return 0;
        };
        var a = new Uint8Array(8);
        var bit = 63;
        for (var i = 0; i < s.length; ++i) {
            var c = charToSymbol(s.charCodeAt(i));
            if (bit < 5) {
                c = c << 1;
            }
            for (var j = 4; j >= 0; --j) {
                if (bit >= 0) {
                    a[Math.floor(bit / 8)] |= ((c >> j) & 1) << (bit % 8);
                    --bit;
                }
            }
        }
        this.pushArray(a);
    };
    /** Get a `name` */
    SerialBuffer.prototype.getName = function () {
        var a = this.getUint8Array(8);
        var result = '';
        for (var bit = 63; bit >= 0;) {
            var c = 0;
            for (var i = 0; i < 5; ++i) {
                if (bit >= 0) {
                    c = (c << 1) | ((a[Math.floor(bit / 8)] >> (bit % 8)) & 1);
                    --bit;
                }
            }
            if (c >= 6) {
                result += String.fromCharCode(c + 'a'.charCodeAt(0) - 6);
            }
            else if (c >= 1) {
                result += String.fromCharCode(c + '1'.charCodeAt(0) - 1);
            }
            else {
                result += '.';
            }
        }
        while (result.endsWith('.')) {
            result = result.substr(0, result.length - 1);
        }
        return result;
    };
    /** Append length-prefixed binary data */
    SerialBuffer.prototype.pushBytes = function (v) {
        this.pushVaruint32(v.length);
        this.pushArray(v);
    };
    /** Get length-prefixed binary data */
    SerialBuffer.prototype.getBytes = function () {
        return this.getUint8Array(this.getVaruint32());
    };
    /** Append a string */
    SerialBuffer.prototype.pushString = function (v) {
        this.pushBytes(this.textEncoder.encode(v));
    };
    /** Get a string */
    SerialBuffer.prototype.getString = function () {
        return this.textDecoder.decode(this.getBytes());
    };
    /** Append a `symbol_code`. Unlike `symbol`, `symbol_code` doesn't include a precision. */
    SerialBuffer.prototype.pushSymbolCode = function (name) {
        if (typeof name !== 'string') {
            throw new Error('Expected string containing symbol_code');
        }
        var a = [];
        a.push.apply(a, __spread(this.textEncoder.encode(name)));
        while (a.length < 8) {
            a.push(0);
        }
        this.pushArray(a.slice(0, 8));
    };
    /** Get a `symbol_code`. Unlike `symbol`, `symbol_code` doesn't include a precision. */
    SerialBuffer.prototype.getSymbolCode = function () {
        var a = this.getUint8Array(8);
        var len;
        for (len = 0; len < a.length; ++len) {
            if (!a[len]) {
                break;
            }
        }
        var name = this.textDecoder.decode(new Uint8Array(a.buffer, a.byteOffset, len));
        return name;
    };
    /** Append a `symbol` */
    SerialBuffer.prototype.pushSymbol = function (_a) {
        var name = _a.name, precision = _a.precision;
        if (!/^[A-Z]{1,7}$/.test(name)) {
            throw new Error('Expected symbol to be A-Z and between one and seven characters');
        }
        var a = [precision & 0xff];
        a.push.apply(a, __spread(this.textEncoder.encode(name)));
        while (a.length < 8) {
            a.push(0);
        }
        this.pushArray(a.slice(0, 8));
    };
    /** Get a `symbol` */
    SerialBuffer.prototype.getSymbol = function () {
        var precision = this.get();
        var a = this.getUint8Array(7);
        var len;
        for (len = 0; len < a.length; ++len) {
            if (!a[len]) {
                break;
            }
        }
        var name = this.textDecoder.decode(new Uint8Array(a.buffer, a.byteOffset, len));
        return { name: name, precision: precision };
    };
    /** Append an asset */
    SerialBuffer.prototype.pushAsset = function (s) {
        if (typeof s !== 'string') {
            throw new Error('Expected string containing asset');
        }
        s = s.trim();
        var pos = 0;
        var amount = '';
        var precision = 0;
        if (s[pos] === '-') {
            amount += '-';
            ++pos;
        }
        var foundDigit = false;
        while (pos < s.length && s.charCodeAt(pos) >= '0'.charCodeAt(0) && s.charCodeAt(pos) <= '9'.charCodeAt(0)) {
            foundDigit = true;
            amount += s[pos];
            ++pos;
        }
        if (!foundDigit) {
            throw new Error('Asset must begin with a number');
        }
        if (s[pos] === '.') {
            ++pos;
            while (pos < s.length && s.charCodeAt(pos) >= '0'.charCodeAt(0) && s.charCodeAt(pos) <= '9'.charCodeAt(0)) {
                amount += s[pos];
                ++precision;
                ++pos;
            }
        }
        var name = s.substr(pos).trim();
        this.pushArray(numeric.signedDecimalToBinary(8, amount));
        this.pushSymbol({ name: name, precision: precision });
    };
    /** Get an asset */
    SerialBuffer.prototype.getAsset = function () {
        var amount = this.getUint8Array(8);
        var _a = this.getSymbol(), name = _a.name, precision = _a.precision;
        var s = numeric.signedBinaryToDecimal(amount, precision + 1);
        if (precision) {
            s = s.substr(0, s.length - precision) + '.' + s.substr(s.length - precision);
        }
        return s + ' ' + name;
    };
    /** Append a public key */
    SerialBuffer.prototype.pushPublicKey = function (s) {
        var key = numeric.stringToPublicKey(s);
        this.push(key.type);
        this.pushArray(key.data);
    };
    /** Get a public key */
    SerialBuffer.prototype.getPublicKey = function () {
        var type = this.get();
        var data;
        if (type === numeric.KeyType.wa) {
            var begin = this.readPos;
            this.skip(34);
            this.skip(this.getVaruint32());
            data = new Uint8Array(this.array.buffer, this.array.byteOffset + begin, this.readPos - begin);
        }
        else {
            data = this.getUint8Array(numeric.publicKeyDataSize);
        }
        return numeric.publicKeyToString({ type: type, data: data });
    };
    /** Append a private key */
    SerialBuffer.prototype.pushPrivateKey = function (s) {
        var key = numeric.stringToPrivateKey(s);
        this.push(key.type);
        this.pushArray(key.data);
    };
    /** Get a private key */
    SerialBuffer.prototype.getPrivateKey = function () {
        var type = this.get();
        var data = this.getUint8Array(numeric.privateKeyDataSize);
        return numeric.privateKeyToString({ type: type, data: data });
    };
    /** Append a signature */
    SerialBuffer.prototype.pushSignature = function (s) {
        var key = numeric.stringToSignature(s);
        this.push(key.type);
        this.pushArray(key.data);
    };
    /** Get a signature */
    SerialBuffer.prototype.getSignature = function () {
        var type = this.get();
        var data;
        if (type === numeric.KeyType.wa) {
            var begin = this.readPos;
            this.skip(65);
            this.skip(this.getVaruint32());
            this.skip(this.getVaruint32());
            data = new Uint8Array(this.array.buffer, this.array.byteOffset + begin, this.readPos - begin);
        }
        else {
            data = this.getUint8Array(numeric.signatureDataSize);
        }
        return numeric.signatureToString({ type: type, data: data });
    };
    return SerialBuffer;
}()); // SerialBuffer
exports.SerialBuffer = SerialBuffer;
/** Is this a supported ABI version? */
exports.supportedAbiVersion = function (version) {
    return version.startsWith('eosio::abi/1.');
};
var checkDateParse = function (date) {
    var result = Date.parse(date);
    if (Number.isNaN(result)) {
        throw new Error('Invalid time format');
    }
    return result;
};
/** Convert date in ISO format to `time_point` (miliseconds since epoch) */
exports.dateToTimePoint = function (date) {
    return Math.round(checkDateParse(date + 'Z') * 1000);
};
/** Convert `time_point` (miliseconds since epoch) to date in ISO format */
exports.timePointToDate = function (us) {
    var s = (new Date(us / 1000)).toISOString();
    return s.substr(0, s.length - 1);
};
/** Convert date in ISO format to `time_point_sec` (seconds since epoch) */
exports.dateToTimePointSec = function (date) {
  if (date.slot) {
    return Math.round((date.slot * 500 * 6 + 946684800000) / 1000);
  } else {
    return Math.round(checkDateParse(date + 'Z') / 1000);
  }
};
/** Convert `time_point_sec` (seconds since epoch) to to date in ISO format */
exports.timePointSecToDate = function (sec) {

    var s = (new Date(sec * 1000)).toISOString();
    return s.substr(0, s.length - 1);
};
/** Convert date in ISO format to `block_timestamp_type` (half-seconds since a different epoch) */
exports.dateToBlockTimestamp = function (date) {
    return Math.round((checkDateParse(date + 'Z') - 946684800000) / 500);
};
/** Convert `block_timestamp_type` (half-seconds since a different epoch) to to date in ISO format */
exports.blockTimestampToDate = function (slot) {
    var s = (new Date(slot * 500 + 946684800000)).toISOString();
    return s.substr(0, s.length - 1);
};
/** Convert `string` to `Symbol`. format: `precision,NAME`. */
exports.stringToSymbol = function (s) {
    if (typeof s !== 'string') {
        throw new Error('Expected string containing symbol');
    }
    var m = s.match(/^([0-9]+),([A-Z]+)$/);
    if (!m) {
        throw new Error('Invalid symbol');
    }
    return { name: m[2], precision: +m[1] };
};
/** Convert `Symbol` to `string`. format: `precision,NAME`. */
exports.symbolToString = function (_a) {
    var name = _a.name, precision = _a.precision;
    return precision + ',' + name;
};
/** Convert binary data to hex */
exports.arrayToHex = function (data) {
    var e_1, _a;
    var result = '';
    try {
        for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
            var x = data_1_1.value;
            result += ('00' + x.toString(16)).slice(-2);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result.toUpperCase();
};
/** Convert hex to binary data */
exports.hexToUint8Array = function (hex) {
    if (typeof hex !== 'string') {
        throw new Error('Expected string containing hex digits');
    }
    if (hex.length % 2) {
        throw new Error('Odd number of hex digits');
    }
    var l = hex.length / 2;
    var result = new Uint8Array(l);
    for (var i = 0; i < l; ++i) {
        var x = parseInt(hex.substr(i * 2, 2), 16);
        if (Number.isNaN(x)) {
            throw new Error('Expected hex string');
        }
        result[i] = x;
    }
    return result;
};
function serializeUnknown(buffer, data) {
    throw new Error('Don\'t know how to serialize ' + this.name);
}
function deserializeUnknown(buffer) {
    throw new Error('Don\'t know how to deserialize ' + this.name);
}
function serializeStruct(buffer, data, state, allowExtensions) {
    var e_2, _a;
    if (state === void 0) { state = new SerializerState(); }
    if (allowExtensions === void 0) { allowExtensions = true; }
    if (typeof data !== 'object') {
        throw new Error('expected object containing data: ' + JSON.stringify(data));
    }
    if (this.base) {
        this.base.serialize(buffer, data, state, allowExtensions);
    }
    try {
        for (var _b = __values(this.fields), _c = _b.next(); !_c.done; _c = _b.next()) {
            var field = _c.value;
            if (field.name in data) {
                if (state.skippedBinaryExtension) {
                    throw new Error('unexpected ' + this.name + '.' + field.name);
                }
                field.type.serialize(buffer, data[field.name], state, allowExtensions && field === this.fields[this.fields.length - 1]);
            }
            else {
                if (allowExtensions && field.type.extensionOf) {
                    state.skippedBinaryExtension = true;
                }
                else {
                    throw new Error('missing ' + this.name + '.' + field.name + ' (type=' + field.type.name + ')');
                }
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
}
function deserializeStruct(buffer, state, allowExtensions) {
    var e_3, _a;
    if (state === void 0) { state = new SerializerState(); }
    if (allowExtensions === void 0) { allowExtensions = true; }
    var result;
    if (this.base) {
        result = this.base.deserialize(buffer, state, allowExtensions);
    }
    else {
        result = {};
    }
    try {
        for (var _b = __values(this.fields), _c = _b.next(); !_c.done; _c = _b.next()) {
            var field = _c.value;
            if (allowExtensions && field.type.extensionOf && !buffer.haveReadData()) {
                state.skippedBinaryExtension = true;
            }
            else {
                result[field.name] = field.type.deserialize(buffer, state, allowExtensions);
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return result;
}
function serializeVariant(buffer, data, state, allowExtensions) {
    if (!Array.isArray(data) || data.length !== 2 || typeof data[0] !== 'string') {
        throw new Error('expected variant: ["type", value]');
    }
    var i = this.fields.findIndex(function (field) { return field.name === data[0]; });
    if (i < 0) {
        throw new Error("type \"" + data[0] + "\" is not valid for variant");
    }
    buffer.pushVaruint32(i);
    this.fields[i].type.serialize(buffer, data[1], state, allowExtensions);
}
function deserializeVariant(buffer, state, allowExtensions) {
    var i = buffer.getVaruint32();
    if (i >= this.fields.length) {
        throw new Error("type index " + i + " is not valid for variant");
    }
    var field = this.fields[i];
    return [field.name, field.type.deserialize(buffer, state, allowExtensions)];
}
function serializeArray(buffer, data, state, allowExtensions) {
    var e_4, _a;
    buffer.pushVaruint32(data.length);
    try {
        for (var data_2 = __values(data), data_2_1 = data_2.next(); !data_2_1.done; data_2_1 = data_2.next()) {
            var item = data_2_1.value;
            this.arrayOf.serialize(buffer, item, state, false);
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (data_2_1 && !data_2_1.done && (_a = data_2.return)) _a.call(data_2);
        }
        finally { if (e_4) throw e_4.error; }
    }
}
function deserializeArray(buffer, state, allowExtensions) {
    var len = buffer.getVaruint32();
    var result = [];
    for (var i = 0; i < len; ++i) {
        result.push(this.arrayOf.deserialize(buffer, state, false));
    }
    return result;
}
function serializeOptional(buffer, data, state, allowExtensions) {
    if (data === null || data === undefined) {
        buffer.push(0);
    }
    else {
        buffer.push(1);
        this.optionalOf.serialize(buffer, data, state, allowExtensions);
    }
}
function deserializeOptional(buffer, state, allowExtensions) {
    if (buffer.get()) {
        return this.optionalOf.deserialize(buffer, state, allowExtensions);
    }
    else {
        return null;
    }
}
function serializeExtension(buffer, data, state, allowExtensions) {
    this.extensionOf.serialize(buffer, data, state, allowExtensions);
}
function deserializeExtension(buffer, state, allowExtensions) {
    return this.extensionOf.deserialize(buffer, state, allowExtensions);
}
var createType = function (attrs) {
    return __assign({ name: '<missing name>', aliasOfName: '', arrayOf: null, optionalOf: null, extensionOf: null, baseName: '', base: null, fields: [], serialize: serializeUnknown, deserialize: deserializeUnknown }, attrs);
};
var checkRange = function (orig, converted) {
    if (Number.isNaN(+orig) || Number.isNaN(+converted) || (typeof orig !== 'number' && typeof orig !== 'string')) {
        throw new Error('Expected number');
    }
    if (+orig !== +converted) {
        throw new Error('Number is out of range');
    }
    return +orig;
};
/** Create the set of types built-in to the abi format */
exports.createInitialTypes = function () {
    var result = new Map(Object.entries({
        bool: createType({
            name: 'bool',
            serialize: function (buffer, data) {
                if (!(typeof data === 'boolean' || typeof data === 'number' && (data === 1 || data === 0))) {
                    throw new Error('Expected boolean or number equal to 1 or 0');
                }
                buffer.push(data ? 1 : 0);
            },
            deserialize: function (buffer) { return !!buffer.get(); },
        }),
        uint8: createType({
            name: 'uint8',
            serialize: function (buffer, data) { buffer.push(checkRange(data, data & 0xff)); },
            deserialize: function (buffer) { return buffer.get(); },
        }),
        int8: createType({
            name: 'int8',
            serialize: function (buffer, data) { buffer.push(checkRange(data, data << 24 >> 24)); },
            deserialize: function (buffer) { return buffer.get() << 24 >> 24; },
        }),
        uint16: createType({
            name: 'uint16',
            serialize: function (buffer, data) { buffer.pushUint16(checkRange(data, data & 0xffff)); },
            deserialize: function (buffer) { return buffer.getUint16(); },
        }),
        int16: createType({
            name: 'int16',
            serialize: function (buffer, data) { buffer.pushUint16(checkRange(data, data << 16 >> 16)); },
            deserialize: function (buffer) { return buffer.getUint16() << 16 >> 16; },
        }),
        uint32: createType({
            name: 'uint32',
            serialize: function (buffer, data) { buffer.pushUint32(checkRange(data, data >>> 0)); },
            deserialize: function (buffer) { return buffer.getUint32(); },
        }),
        uint64: createType({
            name: 'uint64',
            serialize: function (buffer, data) {
                buffer.pushArray(numeric.decimalToBinary(8, '' + data));
            },
            deserialize: function (buffer) { return numeric.binaryToDecimal(buffer.getUint8Array(8)); },
        }),
        int64: createType({
            name: 'int64',
            serialize: function (buffer, data) {
                buffer.pushArray(numeric.signedDecimalToBinary(8, '' + data));
            },
            deserialize: function (buffer) { return numeric.signedBinaryToDecimal(buffer.getUint8Array(8)); },
        }),
        int32: createType({
            name: 'int32',
            serialize: function (buffer, data) { buffer.pushUint32(checkRange(data, data | 0)); },
            deserialize: function (buffer) { return buffer.getUint32() | 0; },
        }),
        varuint32: createType({
            name: 'varuint32',
            serialize: function (buffer, data) { buffer.pushVaruint32(checkRange(data, data >>> 0)); },
            deserialize: function (buffer) { return buffer.getVaruint32(); },
        }),
        varint32: createType({
            name: 'varint32',
            serialize: function (buffer, data) { buffer.pushVarint32(checkRange(data, data | 0)); },
            deserialize: function (buffer) { return buffer.getVarint32(); },
        }),
        uint128: createType({
            name: 'uint128',
            serialize: function (buffer, data) { buffer.pushArray(numeric.decimalToBinary(16, '' + data)); },
            deserialize: function (buffer) { return numeric.binaryToDecimal(buffer.getUint8Array(16)); },
        }),
        int128: createType({
            name: 'int128',
            serialize: function (buffer, data) {
                buffer.pushArray(numeric.signedDecimalToBinary(16, '' + data));
            },
            deserialize: function (buffer) { return numeric.signedBinaryToDecimal(buffer.getUint8Array(16)); },
        }),
        float32: createType({
            name: 'float32',
            serialize: function (buffer, data) { buffer.pushFloat32(data); },
            deserialize: function (buffer) { return buffer.getFloat32(); },
        }),
        float64: createType({
            name: 'float64',
            serialize: function (buffer, data) { buffer.pushFloat64(data); },
            deserialize: function (buffer) { return buffer.getFloat64(); },
        }),
        float128: createType({
            name: 'float128',
            serialize: function (buffer, data) { buffer.pushUint8ArrayChecked(exports.hexToUint8Array(data), 16); },
            deserialize: function (buffer) { return exports.arrayToHex(buffer.getUint8Array(16)); },
        }),
        bytes: createType({
            name: 'bytes',
            serialize: function (buffer, data) {
                if (data instanceof Uint8Array || Array.isArray(data)) {
                    buffer.pushBytes(data);
                }
                else {
                    buffer.pushBytes(exports.hexToUint8Array(data));
                }
            },
            deserialize: function (buffer, state) {
                if (state && state.options.bytesAsUint8Array) {
                    return buffer.getBytes();
                }
                else {
                    return exports.arrayToHex(buffer.getBytes());
                }
            },
        }),
        string: createType({
            name: 'string',
            serialize: function (buffer, data) { buffer.pushString(data); },
            deserialize: function (buffer) { return buffer.getString(); },
        }),
        name: createType({
            name: 'name',
            serialize: function (buffer, data) { buffer.pushName(data); },
            deserialize: function (buffer) { return buffer.getName(); },
        }),
        time_point: createType({
            name: 'time_point',
            serialize: function (buffer, data) { buffer.pushNumberAsUint64(exports.dateToTimePoint(data)); },
            deserialize: function (buffer) { return exports.timePointToDate(buffer.getUint64AsNumber()); },
        }),
        time_point_sec: createType({
            name: 'time_point_sec',
            serialize: function (buffer, data) { buffer.pushUint32(exports.dateToTimePointSec(data)); },
            deserialize: function (buffer) { return exports.timePointSecToDate(buffer.getUint32()); },
        }),
        block_timestamp_type: createType({
            name: 'block_timestamp_type',
            serialize: function (buffer, data) { buffer.pushUint32(exports.dateToBlockTimestamp(data)); },
            deserialize: function (buffer) { return exports.blockTimestampToDate(buffer.getUint32()); },
        }),
        symbol_code: createType({
            name: 'symbol_code',
            serialize: function (buffer, data) { buffer.pushSymbolCode(data); },
            deserialize: function (buffer) { return buffer.getSymbolCode(); },
        }),
        symbol: createType({
            name: 'symbol',
            serialize: function (buffer, data) { buffer.pushSymbol(exports.stringToSymbol(data)); },
            deserialize: function (buffer) { return exports.symbolToString(buffer.getSymbol()); },
        }),
        asset: createType({
            name: 'asset',
            serialize: function (buffer, data) { buffer.pushAsset(data); },
            deserialize: function (buffer) { return buffer.getAsset(); },
        }),
        checksum160: createType({
            name: 'checksum160',
            serialize: function (buffer, data) { buffer.pushUint8ArrayChecked(exports.hexToUint8Array(data), 20); },
            deserialize: function (buffer) { return exports.arrayToHex(buffer.getUint8Array(20)); },
        }),
        checksum256: createType({
            name: 'checksum256',
            serialize: function (buffer, data) { buffer.pushUint8ArrayChecked(exports.hexToUint8Array(data), 32); },
            deserialize: function (buffer) { return exports.arrayToHex(buffer.getUint8Array(32)); },
        }),
        checksum512: createType({
            name: 'checksum512',
            serialize: function (buffer, data) { buffer.pushUint8ArrayChecked(exports.hexToUint8Array(data), 64); },
            deserialize: function (buffer) { return exports.arrayToHex(buffer.getUint8Array(64)); },
        }),
        public_key: createType({
            name: 'public_key',
            serialize: function (buffer, data) { buffer.pushPublicKey(data); },
            deserialize: function (buffer) { return buffer.getPublicKey(); },
        }),
        private_key: createType({
            name: 'private_key',
            serialize: function (buffer, data) { buffer.pushPrivateKey(data); },
            deserialize: function (buffer) { return buffer.getPrivateKey(); },
        }),
        signature: createType({
            name: 'signature',
            serialize: function (buffer, data) { buffer.pushSignature(data); },
            deserialize: function (buffer) { return buffer.getSignature(); },
        }),
    }));
    result.set('extended_asset', createType({
        name: 'extended_asset',
        baseName: '',
        fields: [
            { name: 'quantity', typeName: 'asset', type: result.get('asset') },
            { name: 'contract', typeName: 'name', type: result.get('name') },
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    return result;
}; // createInitialTypes()
/** Get type from `types` */
exports.getType = function (types, name) {
    var type = types.get(name);
    if (type && type.aliasOfName) {
        return exports.getType(types, type.aliasOfName);
    }
    if (type) {
        return type;
    }
    if (name.endsWith('[]')) {
        return createType({
            name: name,
            arrayOf: exports.getType(types, name.substr(0, name.length - 2)),
            serialize: serializeArray,
            deserialize: deserializeArray,
        });
    }
    if (name.endsWith('?')) {
        return createType({
            name: name,
            optionalOf: exports.getType(types, name.substr(0, name.length - 1)),
            serialize: serializeOptional,
            deserialize: deserializeOptional,
        });
    }
    if (name.endsWith('$')) {
        return createType({
            name: name,
            extensionOf: exports.getType(types, name.substr(0, name.length - 1)),
            serialize: serializeExtension,
            deserialize: deserializeExtension,
        });
    }
    throw new Error('Unknown type: ' + name);
};
/**
 * Get types from abi
 *
 * @param initialTypes Set of types to build on.
 * In most cases, it's best to fill this from a fresh call to `getTypesFromAbi()`.
 */
exports.getTypesFromAbi = function (initialTypes, abi) {
    var e_5, _a, e_6, _b, e_7, _c, e_8, _d, e_9, _e;
    var types = new Map(initialTypes);
    if (abi.types) {
        try {
            for (var _f = __values(abi.types), _g = _f.next(); !_g.done; _g = _f.next()) {
                var _h = _g.value, new_type_name = _h.new_type_name, type = _h.type;
                types.set(new_type_name, createType({ name: new_type_name, aliasOfName: type }));
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_a = _f.return)) _a.call(_f);
            }
            finally { if (e_5) throw e_5.error; }
        }
    }
    if (abi.structs) {
        try {
            for (var _j = __values(abi.structs), _k = _j.next(); !_k.done; _k = _j.next()) {
                var _l = _k.value, name_1 = _l.name, base = _l.base, fields = _l.fields;
                types.set(name_1, createType({
                    name: name_1,
                    baseName: base,
                    fields: fields.map(function (_a) {
                        var n = _a.name, type = _a.type;
                        return ({ name: n, typeName: type, type: null });
                    }),
                    serialize: serializeStruct,
                    deserialize: deserializeStruct,
                }));
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_k && !_k.done && (_b = _j.return)) _b.call(_j);
            }
            finally { if (e_6) throw e_6.error; }
        }
    }
    if (abi.variants) {
        try {
            for (var _m = __values(abi.variants), _o = _m.next(); !_o.done; _o = _m.next()) {
                var _p = _o.value, name_2 = _p.name, t = _p.types;
                types.set(name_2, createType({
                    name: name_2,
                    fields: t.map(function (s) { return ({ name: s, typeName: s, type: null }); }),
                    serialize: serializeVariant,
                    deserialize: deserializeVariant,
                }));
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_o && !_o.done && (_c = _m.return)) _c.call(_m);
            }
            finally { if (e_7) throw e_7.error; }
        }
    }
    try {
        for (var types_1 = __values(types), types_1_1 = types_1.next(); !types_1_1.done; types_1_1 = types_1.next()) {
            var _q = __read(types_1_1.value, 2), name_3 = _q[0], type = _q[1];
            if (type.baseName) {
                type.base = exports.getType(types, type.baseName);
            }
            try {
                for (var _r = (e_9 = void 0, __values(type.fields)), _s = _r.next(); !_s.done; _s = _r.next()) {
                    var field = _s.value;
                    field.type = exports.getType(types, field.typeName);
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (_s && !_s.done && (_e = _r.return)) _e.call(_r);
                }
                finally { if (e_9) throw e_9.error; }
            }
        }
    }
    catch (e_8_1) { e_8 = { error: e_8_1 }; }
    finally {
        try {
            if (types_1_1 && !types_1_1.done && (_d = types_1.return)) _d.call(types_1);
        }
        finally { if (e_8) throw e_8.error; }
    }
    return types;
}; // getTypesFromAbi
var reverseHex = function (h) {
    return h.substr(6, 2) + h.substr(4, 2) + h.substr(2, 2) + h.substr(0, 2);
};
/** TAPoS: Return transaction fields which reference `refBlock` and expire `expireSeconds` after `timestamp` */
exports.transactionHeader = function (refBlock, expireSeconds) {
    var timestamp = refBlock.header ? refBlock.header.timestamp : refBlock.timestamp;
    var prefix = parseInt(reverseHex(refBlock.id.substr(16, 8)), 16);
    return {
        expiration: exports.timePointSecToDate(exports.dateToTimePointSec(timestamp) + expireSeconds),
        ref_block_num: refBlock.block_num & 0xffff,
        ref_block_prefix: prefix,
    };
};
/** Convert action data to serialized form (hex) */
exports.serializeActionData = function (contract, account, name, data, textEncoder, textDecoder) {
    if (typeof data == 'string' && data.substr(0, 2) == '0x') {
        var ret = data.substr(2).toUpperCase();
        return ret;
    }
    else {
        var action = contract.actions.get(name);
        if (!action) {
            throw new Error("Unknown action " + name + " in contract " + account);
        }
        var buffer = new SerialBuffer({ textEncoder: textEncoder, textDecoder: textDecoder });
        action.serialize(buffer, data);
        return exports.arrayToHex(buffer.asUint8Array());
    }
};
/** Return action in serialized form */
exports.serializeAction = function (contract, account, name, authorization, data, textEncoder, textDecoder) {
    return {
        account: account,
        name: name,
        authorization: authorization,
        data: exports.serializeActionData(contract, account, name, data, textEncoder, textDecoder),
    };
};
/** Deserialize action data. If `data` is a `string`, then it's assumed to be in hex. */
exports.deserializeActionData = function (contract, account, name, data, textEncoder, textDecoder) {
    var action = contract.actions.get(name);
    if (typeof data === 'string') {
        data = exports.hexToUint8Array(data);
    }
    if (!action) {
        throw new Error("Unknown action " + name + " in contract " + account);
    }
    var buffer = new SerialBuffer({ textDecoder: textDecoder, textEncoder: textEncoder });
    buffer.pushArray(data);
    return action.deserialize(buffer);
};
exports.serializeAbiType = function (contract, account, name, data, textEncoder, textDecoder) {
    var typeName = contract.types.get(name);
    if (!typeName) {
        throw new Error("Unknown action " + name + " in contract " + account);
    }
    var buffer = new SerialBuffer({ textEncoder: textEncoder, textDecoder: textDecoder });
    typeName.serialize(buffer, data);
    return exports.arrayToHex(buffer.asUint8Array());
};
exports.deserializeAbiType = function (contract, account, name, data, textEncoder, textDecoder) {
    var abiType = contract.types.get(name);
    if (typeof data === 'string') {
        data = exports.hexToUint8Array(data);
    }
    if (!abiType) {
        throw new Error("Unknown abi type " + name + " in contract " + account);
    }
    var buffer = new SerialBuffer({ textDecoder: textDecoder, textEncoder: textEncoder });
    buffer.pushArray(data);
    return abiType.deserialize(buffer);
};
/** Deserialize action. If `data` is a `string`, then it's assumed to be in hex. */
exports.deserializeAction = function (contract, account, name, authorization, data, textEncoder, textDecoder) {
    return {
        account: account,
        name: name,
        authorization: authorization,
        data: exports.deserializeActionData(contract, account, name, data, textEncoder, textDecoder),
    };
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

/***/ "./src/transaction.abi.json":
/*!**********************************!*\
  !*** ./src/transaction.abi.json ***!
  \**********************************/
/*! exports provided: version, types, structs, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"version\":\"eosio::abi/1.0\",\"types\":[{\"new_type_name\":\"account_name\",\"type\":\"name\"},{\"new_type_name\":\"action_name\",\"type\":\"name\"},{\"new_type_name\":\"permission_name\",\"type\":\"name\"}],\"structs\":[{\"name\":\"permission_level\",\"base\":\"\",\"fields\":[{\"name\":\"actor\",\"type\":\"account_name\"},{\"name\":\"permission\",\"type\":\"permission_name\"}]},{\"name\":\"action\",\"base\":\"\",\"fields\":[{\"name\":\"account\",\"type\":\"account_name\"},{\"name\":\"name\",\"type\":\"action_name\"},{\"name\":\"authorization\",\"type\":\"permission_level[]\"},{\"name\":\"data\",\"type\":\"bytes\"}]},{\"name\":\"extension\",\"base\":\"\",\"fields\":[{\"name\":\"type\",\"type\":\"uint16\"},{\"name\":\"data\",\"type\":\"bytes\"}]},{\"name\":\"transaction_header\",\"base\":\"\",\"fields\":[{\"name\":\"expiration\",\"type\":\"time_point_sec\"},{\"name\":\"ref_block_num\",\"type\":\"uint16\"},{\"name\":\"ref_block_prefix\",\"type\":\"uint32\"},{\"name\":\"max_net_usage_words\",\"type\":\"varuint32\"},{\"name\":\"max_cpu_usage_ms\",\"type\":\"uint8\"},{\"name\":\"delay_sec\",\"type\":\"varuint32\"}]},{\"name\":\"transaction\",\"base\":\"transaction_header\",\"fields\":[{\"name\":\"context_free_actions\",\"type\":\"action[]\"},{\"name\":\"actions\",\"type\":\"action[]\"},{\"name\":\"transaction_extensions\",\"type\":\"extension[]\"}]}]}");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL2hhc2guanMvbGliL2hhc2guanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL2hhc2guanMvbGliL2hhc2gvY29tbW9uLmpzIiwid2VicGFjazovL1tuYW1lXS8uL25vZGVfbW9kdWxlcy9oYXNoLmpzL2xpYi9oYXNoL2htYWMuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL2hhc2guanMvbGliL2hhc2gvcmlwZW1kLmpzIiwid2VicGFjazovL1tuYW1lXS8uL25vZGVfbW9kdWxlcy9oYXNoLmpzL2xpYi9oYXNoL3NoYS5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9ub2RlX21vZHVsZXMvaGFzaC5qcy9saWIvaGFzaC9zaGEvMS5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9ub2RlX21vZHVsZXMvaGFzaC5qcy9saWIvaGFzaC9zaGEvMjI0LmpzIiwid2VicGFjazovL1tuYW1lXS8uL25vZGVfbW9kdWxlcy9oYXNoLmpzL2xpYi9oYXNoL3NoYS8yNTYuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL2hhc2guanMvbGliL2hhc2gvc2hhLzM4NC5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9ub2RlX21vZHVsZXMvaGFzaC5qcy9saWIvaGFzaC9zaGEvNTEyLmpzIiwid2VicGFjazovL1tuYW1lXS8uL25vZGVfbW9kdWxlcy9oYXNoLmpzL2xpYi9oYXNoL3NoYS9jb21tb24uanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL2hhc2guanMvbGliL2hhc2gvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL2luaGVyaXRzL2luaGVyaXRzX2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL21pbmltYWxpc3RpYy1hc3NlcnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL3Bha28vaW5kZXguanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL3Bha28vbGliL2RlZmxhdGUuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL3Bha28vbGliL2luZmxhdGUuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL3Bha28vbGliL3V0aWxzL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9ub2RlX21vZHVsZXMvcGFrby9saWIvdXRpbHMvc3RyaW5ncy5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9ub2RlX21vZHVsZXMvcGFrby9saWIvemxpYi9hZGxlcjMyLmpzIiwid2VicGFjazovL1tuYW1lXS8uL25vZGVfbW9kdWxlcy9wYWtvL2xpYi96bGliL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9ub2RlX21vZHVsZXMvcGFrby9saWIvemxpYi9jcmMzMi5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9ub2RlX21vZHVsZXMvcGFrby9saWIvemxpYi9kZWZsYXRlLmpzIiwid2VicGFjazovL1tuYW1lXS8uL25vZGVfbW9kdWxlcy9wYWtvL2xpYi96bGliL2d6aGVhZGVyLmpzIiwid2VicGFjazovL1tuYW1lXS8uL25vZGVfbW9kdWxlcy9wYWtvL2xpYi96bGliL2luZmZhc3QuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL3Bha28vbGliL3psaWIvaW5mbGF0ZS5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9ub2RlX21vZHVsZXMvcGFrby9saWIvemxpYi9pbmZ0cmVlcy5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9ub2RlX21vZHVsZXMvcGFrby9saWIvemxpYi9tZXNzYWdlcy5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9ub2RlX21vZHVsZXMvcGFrby9saWIvemxpYi90cmVlcy5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9ub2RlX21vZHVsZXMvcGFrby9saWIvemxpYi96c3RyZWFtLmpzIiwid2VicGFjazovL1tuYW1lXS8uL3NyYy9lb3Nqcy1hcGkudHMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vc3JjL2Vvc2pzLW51bWVyaWMudHMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vc3JjL2Vvc2pzLXNlcmlhbGl6ZS50cyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9zcmMvcmlwZW1kLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLDhEQUFjO0FBQ25DLGNBQWMsbUJBQU8sQ0FBQyxnRUFBZTtBQUNyQyxXQUFXLG1CQUFPLENBQUMsMERBQVk7QUFDL0IsY0FBYyxtQkFBTyxDQUFDLGdFQUFlO0FBQ3JDLFlBQVksbUJBQU8sQ0FBQyw0REFBYTs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLFFBQVE7QUFDekI7QUFDQSxRQUFRLGNBQWM7QUFDdEIsOENBQThDO0FBQzlDO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0EsMEJBQTBCO0FBQzFCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLGNBQWM7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1DQUFtQztBQUNuQyxtQ0FBbUM7O0FBRW5DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1DQUFtQztBQUNuQyxtQ0FBbUM7O0FBRW5DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DOztBQUVuQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQzs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9DQUFvQztBQUNwQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3pVYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsMERBQVU7QUFDOUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaERhOztBQUViLGFBQWEsbUJBQU8sQ0FBQyx3RUFBcUI7QUFDMUMsZUFBZSxtQkFBTyxDQUFDLDZEQUFVOztBQUVqQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsZUFBZSxnQkFBZ0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLGdCQUFnQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsZ0JBQWdCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsZ0JBQWdCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7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QXNCO0FBQ3RCO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsY0FBYzs7QUFFakM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQzs7QUFFL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EscUJBQXFCLHlDQUF5Qzs7QUFFOUQ7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQy9ZYTs7O0FBR2IsbUJBQW1CLG1CQUFPLENBQUMsK0RBQWdCO0FBQzNDLG1CQUFtQixtQkFBTyxDQUFDLCtEQUFnQjtBQUMzQyxtQkFBbUIsbUJBQU8sQ0FBQyxpRUFBaUI7QUFDNUMsbUJBQW1CLG1CQUFPLENBQUMsbUVBQWtCO0FBQzdDLG1CQUFtQixtQkFBTyxDQUFDLGlFQUFpQjtBQUM1QyxtQkFBbUIsbUJBQU8sQ0FBQywrREFBZ0I7QUFDM0MsbUJBQW1CLG1CQUFPLENBQUMsaUVBQWlCOztBQUU1Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsVUFBVTtBQUM3QztBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0EscUJBQXFCLDhCQUE4QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLGVBQWU7O0FBRWxCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLHNCQUFzQjtBQUNyRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0I7QUFDbEIsbUJBQW1CO0FBQ25CLHNCQUFzQjtBQUN0QixtQkFBbUI7O0FBRW5CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixjQUFjO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0RBQXNEOztBQUV0RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGtFQUFrRTs7QUFFdkY7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QywwQkFBMEI7O0FBRTNEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdEO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzREFBc0Q7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtFQUFrRTtBQUNsRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLGFBQWE7O0FBRWIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qix1QkFBdUI7QUFDcEQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCOztBQUV0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQzs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3Qix1QkFBdUI7O0FBRXZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCOztBQUU5QiwyQkFBMkIsYUFBYTtBQUN4QyxvQkFBb0IscUJBQXFCOztBQUV6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixrQkFBa0I7QUFDckM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0RBQW9EO0FBQ3BEO0FBQ0E7O0FBRUEsYUFBYTs7QUFFYjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLHlCQUF5QjtBQUN6QixtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdFQUFnRTtBQUNoRTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2oxRGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RDtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQ3pEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZEO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYixjQUFjOztBQUVkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3htQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDRCQUE0QjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVzs7QUFFWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0IsT0FBTztBQUM3QjtBQUNBLHlCQUF5QixjQUFjLGNBQWMsY0FBYztBQUNuRSx1QkFBdUIsWUFBWSxZQUFZLFlBQVk7QUFDM0QsMEJBQTBCLFFBQVE7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSIsImZpbGUiOiJlb3Nqcy1hcGkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9lb3Nqcy1hcGkudHNcIik7XG4iLCJ2YXIgaGFzaCA9IGV4cG9ydHM7XG5cbmhhc2gudXRpbHMgPSByZXF1aXJlKCcuL2hhc2gvdXRpbHMnKTtcbmhhc2guY29tbW9uID0gcmVxdWlyZSgnLi9oYXNoL2NvbW1vbicpO1xuaGFzaC5zaGEgPSByZXF1aXJlKCcuL2hhc2gvc2hhJyk7XG5oYXNoLnJpcGVtZCA9IHJlcXVpcmUoJy4vaGFzaC9yaXBlbWQnKTtcbmhhc2guaG1hYyA9IHJlcXVpcmUoJy4vaGFzaC9obWFjJyk7XG5cbi8vIFByb3h5IGhhc2ggZnVuY3Rpb25zIHRvIHRoZSBtYWluIG9iamVjdFxuaGFzaC5zaGExID0gaGFzaC5zaGEuc2hhMTtcbmhhc2guc2hhMjU2ID0gaGFzaC5zaGEuc2hhMjU2O1xuaGFzaC5zaGEyMjQgPSBoYXNoLnNoYS5zaGEyMjQ7XG5oYXNoLnNoYTM4NCA9IGhhc2guc2hhLnNoYTM4NDtcbmhhc2guc2hhNTEyID0gaGFzaC5zaGEuc2hhNTEyO1xuaGFzaC5yaXBlbWQxNjAgPSBoYXNoLnJpcGVtZC5yaXBlbWQxNjA7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBhc3NlcnQgPSByZXF1aXJlKCdtaW5pbWFsaXN0aWMtYXNzZXJ0Jyk7XG5cbmZ1bmN0aW9uIEJsb2NrSGFzaCgpIHtcbiAgdGhpcy5wZW5kaW5nID0gbnVsbDtcbiAgdGhpcy5wZW5kaW5nVG90YWwgPSAwO1xuICB0aGlzLmJsb2NrU2l6ZSA9IHRoaXMuY29uc3RydWN0b3IuYmxvY2tTaXplO1xuICB0aGlzLm91dFNpemUgPSB0aGlzLmNvbnN0cnVjdG9yLm91dFNpemU7XG4gIHRoaXMuaG1hY1N0cmVuZ3RoID0gdGhpcy5jb25zdHJ1Y3Rvci5obWFjU3RyZW5ndGg7XG4gIHRoaXMucGFkTGVuZ3RoID0gdGhpcy5jb25zdHJ1Y3Rvci5wYWRMZW5ndGggLyA4O1xuICB0aGlzLmVuZGlhbiA9ICdiaWcnO1xuXG4gIHRoaXMuX2RlbHRhOCA9IHRoaXMuYmxvY2tTaXplIC8gODtcbiAgdGhpcy5fZGVsdGEzMiA9IHRoaXMuYmxvY2tTaXplIC8gMzI7XG59XG5leHBvcnRzLkJsb2NrSGFzaCA9IEJsb2NrSGFzaDtcblxuQmxvY2tIYXNoLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUobXNnLCBlbmMpIHtcbiAgLy8gQ29udmVydCBtZXNzYWdlIHRvIGFycmF5LCBwYWQgaXQsIGFuZCBqb2luIGludG8gMzJiaXQgYmxvY2tzXG4gIG1zZyA9IHV0aWxzLnRvQXJyYXkobXNnLCBlbmMpO1xuICBpZiAoIXRoaXMucGVuZGluZylcbiAgICB0aGlzLnBlbmRpbmcgPSBtc2c7XG4gIGVsc2VcbiAgICB0aGlzLnBlbmRpbmcgPSB0aGlzLnBlbmRpbmcuY29uY2F0KG1zZyk7XG4gIHRoaXMucGVuZGluZ1RvdGFsICs9IG1zZy5sZW5ndGg7XG5cbiAgLy8gRW5vdWdoIGRhdGEsIHRyeSB1cGRhdGluZ1xuICBpZiAodGhpcy5wZW5kaW5nLmxlbmd0aCA+PSB0aGlzLl9kZWx0YTgpIHtcbiAgICBtc2cgPSB0aGlzLnBlbmRpbmc7XG5cbiAgICAvLyBQcm9jZXNzIHBlbmRpbmcgZGF0YSBpbiBibG9ja3NcbiAgICB2YXIgciA9IG1zZy5sZW5ndGggJSB0aGlzLl9kZWx0YTg7XG4gICAgdGhpcy5wZW5kaW5nID0gbXNnLnNsaWNlKG1zZy5sZW5ndGggLSByLCBtc2cubGVuZ3RoKTtcbiAgICBpZiAodGhpcy5wZW5kaW5nLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMucGVuZGluZyA9IG51bGw7XG5cbiAgICBtc2cgPSB1dGlscy5qb2luMzIobXNnLCAwLCBtc2cubGVuZ3RoIC0gciwgdGhpcy5lbmRpYW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbXNnLmxlbmd0aDsgaSArPSB0aGlzLl9kZWx0YTMyKVxuICAgICAgdGhpcy5fdXBkYXRlKG1zZywgaSwgaSArIHRoaXMuX2RlbHRhMzIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5CbG9ja0hhc2gucHJvdG90eXBlLmRpZ2VzdCA9IGZ1bmN0aW9uIGRpZ2VzdChlbmMpIHtcbiAgdGhpcy51cGRhdGUodGhpcy5fcGFkKCkpO1xuICBhc3NlcnQodGhpcy5wZW5kaW5nID09PSBudWxsKTtcblxuICByZXR1cm4gdGhpcy5fZGlnZXN0KGVuYyk7XG59O1xuXG5CbG9ja0hhc2gucHJvdG90eXBlLl9wYWQgPSBmdW5jdGlvbiBwYWQoKSB7XG4gIHZhciBsZW4gPSB0aGlzLnBlbmRpbmdUb3RhbDtcbiAgdmFyIGJ5dGVzID0gdGhpcy5fZGVsdGE4O1xuICB2YXIgayA9IGJ5dGVzIC0gKChsZW4gKyB0aGlzLnBhZExlbmd0aCkgJSBieXRlcyk7XG4gIHZhciByZXMgPSBuZXcgQXJyYXkoayArIHRoaXMucGFkTGVuZ3RoKTtcbiAgcmVzWzBdID0gMHg4MDtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBrOyBpKyspXG4gICAgcmVzW2ldID0gMDtcblxuICAvLyBBcHBlbmQgbGVuZ3RoXG4gIGxlbiA8PD0gMztcbiAgaWYgKHRoaXMuZW5kaWFuID09PSAnYmlnJykge1xuICAgIGZvciAodmFyIHQgPSA4OyB0IDwgdGhpcy5wYWRMZW5ndGg7IHQrKylcbiAgICAgIHJlc1tpKytdID0gMDtcblxuICAgIHJlc1tpKytdID0gMDtcbiAgICByZXNbaSsrXSA9IDA7XG4gICAgcmVzW2krK10gPSAwO1xuICAgIHJlc1tpKytdID0gMDtcbiAgICByZXNbaSsrXSA9IChsZW4gPj4+IDI0KSAmIDB4ZmY7XG4gICAgcmVzW2krK10gPSAobGVuID4+PiAxNikgJiAweGZmO1xuICAgIHJlc1tpKytdID0gKGxlbiA+Pj4gOCkgJiAweGZmO1xuICAgIHJlc1tpKytdID0gbGVuICYgMHhmZjtcbiAgfSBlbHNlIHtcbiAgICByZXNbaSsrXSA9IGxlbiAmIDB4ZmY7XG4gICAgcmVzW2krK10gPSAobGVuID4+PiA4KSAmIDB4ZmY7XG4gICAgcmVzW2krK10gPSAobGVuID4+PiAxNikgJiAweGZmO1xuICAgIHJlc1tpKytdID0gKGxlbiA+Pj4gMjQpICYgMHhmZjtcbiAgICByZXNbaSsrXSA9IDA7XG4gICAgcmVzW2krK10gPSAwO1xuICAgIHJlc1tpKytdID0gMDtcbiAgICByZXNbaSsrXSA9IDA7XG5cbiAgICBmb3IgKHQgPSA4OyB0IDwgdGhpcy5wYWRMZW5ndGg7IHQrKylcbiAgICAgIHJlc1tpKytdID0gMDtcbiAgfVxuXG4gIHJldHVybiByZXM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYXNzZXJ0ID0gcmVxdWlyZSgnbWluaW1hbGlzdGljLWFzc2VydCcpO1xuXG5mdW5jdGlvbiBIbWFjKGhhc2gsIGtleSwgZW5jKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBIbWFjKSlcbiAgICByZXR1cm4gbmV3IEhtYWMoaGFzaCwga2V5LCBlbmMpO1xuICB0aGlzLkhhc2ggPSBoYXNoO1xuICB0aGlzLmJsb2NrU2l6ZSA9IGhhc2guYmxvY2tTaXplIC8gODtcbiAgdGhpcy5vdXRTaXplID0gaGFzaC5vdXRTaXplIC8gODtcbiAgdGhpcy5pbm5lciA9IG51bGw7XG4gIHRoaXMub3V0ZXIgPSBudWxsO1xuXG4gIHRoaXMuX2luaXQodXRpbHMudG9BcnJheShrZXksIGVuYykpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBIbWFjO1xuXG5IbWFjLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uIGluaXQoa2V5KSB7XG4gIC8vIFNob3J0ZW4ga2V5LCBpZiBuZWVkZWRcbiAgaWYgKGtleS5sZW5ndGggPiB0aGlzLmJsb2NrU2l6ZSlcbiAgICBrZXkgPSBuZXcgdGhpcy5IYXNoKCkudXBkYXRlKGtleSkuZGlnZXN0KCk7XG4gIGFzc2VydChrZXkubGVuZ3RoIDw9IHRoaXMuYmxvY2tTaXplKTtcblxuICAvLyBBZGQgcGFkZGluZyB0byBrZXlcbiAgZm9yICh2YXIgaSA9IGtleS5sZW5ndGg7IGkgPCB0aGlzLmJsb2NrU2l6ZTsgaSsrKVxuICAgIGtleS5wdXNoKDApO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBrZXkubGVuZ3RoOyBpKyspXG4gICAga2V5W2ldIF49IDB4MzY7XG4gIHRoaXMuaW5uZXIgPSBuZXcgdGhpcy5IYXNoKCkudXBkYXRlKGtleSk7XG5cbiAgLy8gMHgzNiBeIDB4NWMgPSAweDZhXG4gIGZvciAoaSA9IDA7IGkgPCBrZXkubGVuZ3RoOyBpKyspXG4gICAga2V5W2ldIF49IDB4NmE7XG4gIHRoaXMub3V0ZXIgPSBuZXcgdGhpcy5IYXNoKCkudXBkYXRlKGtleSk7XG59O1xuXG5IbWFjLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUobXNnLCBlbmMpIHtcbiAgdGhpcy5pbm5lci51cGRhdGUobXNnLCBlbmMpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkhtYWMucHJvdG90eXBlLmRpZ2VzdCA9IGZ1bmN0aW9uIGRpZ2VzdChlbmMpIHtcbiAgdGhpcy5vdXRlci51cGRhdGUodGhpcy5pbm5lci5kaWdlc3QoKSk7XG4gIHJldHVybiB0aGlzLm91dGVyLmRpZ2VzdChlbmMpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG5cbnZhciByb3RsMzIgPSB1dGlscy5yb3RsMzI7XG52YXIgc3VtMzIgPSB1dGlscy5zdW0zMjtcbnZhciBzdW0zMl8zID0gdXRpbHMuc3VtMzJfMztcbnZhciBzdW0zMl80ID0gdXRpbHMuc3VtMzJfNDtcbnZhciBCbG9ja0hhc2ggPSBjb21tb24uQmxvY2tIYXNoO1xuXG5mdW5jdGlvbiBSSVBFTUQxNjAoKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSSVBFTUQxNjApKVxuICAgIHJldHVybiBuZXcgUklQRU1EMTYwKCk7XG5cbiAgQmxvY2tIYXNoLmNhbGwodGhpcyk7XG5cbiAgdGhpcy5oID0gWyAweDY3NDUyMzAxLCAweGVmY2RhYjg5LCAweDk4YmFkY2ZlLCAweDEwMzI1NDc2LCAweGMzZDJlMWYwIF07XG4gIHRoaXMuZW5kaWFuID0gJ2xpdHRsZSc7XG59XG51dGlscy5pbmhlcml0cyhSSVBFTUQxNjAsIEJsb2NrSGFzaCk7XG5leHBvcnRzLnJpcGVtZDE2MCA9IFJJUEVNRDE2MDtcblxuUklQRU1EMTYwLmJsb2NrU2l6ZSA9IDUxMjtcblJJUEVNRDE2MC5vdXRTaXplID0gMTYwO1xuUklQRU1EMTYwLmhtYWNTdHJlbmd0aCA9IDE5MjtcblJJUEVNRDE2MC5wYWRMZW5ndGggPSA2NDtcblxuUklQRU1EMTYwLnByb3RvdHlwZS5fdXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlKG1zZywgc3RhcnQpIHtcbiAgdmFyIEEgPSB0aGlzLmhbMF07XG4gIHZhciBCID0gdGhpcy5oWzFdO1xuICB2YXIgQyA9IHRoaXMuaFsyXTtcbiAgdmFyIEQgPSB0aGlzLmhbM107XG4gIHZhciBFID0gdGhpcy5oWzRdO1xuICB2YXIgQWggPSBBO1xuICB2YXIgQmggPSBCO1xuICB2YXIgQ2ggPSBDO1xuICB2YXIgRGggPSBEO1xuICB2YXIgRWggPSBFO1xuICBmb3IgKHZhciBqID0gMDsgaiA8IDgwOyBqKyspIHtcbiAgICB2YXIgVCA9IHN1bTMyKFxuICAgICAgcm90bDMyKFxuICAgICAgICBzdW0zMl80KEEsIGYoaiwgQiwgQywgRCksIG1zZ1tyW2pdICsgc3RhcnRdLCBLKGopKSxcbiAgICAgICAgc1tqXSksXG4gICAgICBFKTtcbiAgICBBID0gRTtcbiAgICBFID0gRDtcbiAgICBEID0gcm90bDMyKEMsIDEwKTtcbiAgICBDID0gQjtcbiAgICBCID0gVDtcbiAgICBUID0gc3VtMzIoXG4gICAgICByb3RsMzIoXG4gICAgICAgIHN1bTMyXzQoQWgsIGYoNzkgLSBqLCBCaCwgQ2gsIERoKSwgbXNnW3JoW2pdICsgc3RhcnRdLCBLaChqKSksXG4gICAgICAgIHNoW2pdKSxcbiAgICAgIEVoKTtcbiAgICBBaCA9IEVoO1xuICAgIEVoID0gRGg7XG4gICAgRGggPSByb3RsMzIoQ2gsIDEwKTtcbiAgICBDaCA9IEJoO1xuICAgIEJoID0gVDtcbiAgfVxuICBUID0gc3VtMzJfMyh0aGlzLmhbMV0sIEMsIERoKTtcbiAgdGhpcy5oWzFdID0gc3VtMzJfMyh0aGlzLmhbMl0sIEQsIEVoKTtcbiAgdGhpcy5oWzJdID0gc3VtMzJfMyh0aGlzLmhbM10sIEUsIEFoKTtcbiAgdGhpcy5oWzNdID0gc3VtMzJfMyh0aGlzLmhbNF0sIEEsIEJoKTtcbiAgdGhpcy5oWzRdID0gc3VtMzJfMyh0aGlzLmhbMF0sIEIsIENoKTtcbiAgdGhpcy5oWzBdID0gVDtcbn07XG5cblJJUEVNRDE2MC5wcm90b3R5cGUuX2RpZ2VzdCA9IGZ1bmN0aW9uIGRpZ2VzdChlbmMpIHtcbiAgaWYgKGVuYyA9PT0gJ2hleCcpXG4gICAgcmV0dXJuIHV0aWxzLnRvSGV4MzIodGhpcy5oLCAnbGl0dGxlJyk7XG4gIGVsc2VcbiAgICByZXR1cm4gdXRpbHMuc3BsaXQzMih0aGlzLmgsICdsaXR0bGUnKTtcbn07XG5cbmZ1bmN0aW9uIGYoaiwgeCwgeSwgeikge1xuICBpZiAoaiA8PSAxNSlcbiAgICByZXR1cm4geCBeIHkgXiB6O1xuICBlbHNlIGlmIChqIDw9IDMxKVxuICAgIHJldHVybiAoeCAmIHkpIHwgKCh+eCkgJiB6KTtcbiAgZWxzZSBpZiAoaiA8PSA0NylcbiAgICByZXR1cm4gKHggfCAofnkpKSBeIHo7XG4gIGVsc2UgaWYgKGogPD0gNjMpXG4gICAgcmV0dXJuICh4ICYgeikgfCAoeSAmICh+eikpO1xuICBlbHNlXG4gICAgcmV0dXJuIHggXiAoeSB8ICh+eikpO1xufVxuXG5mdW5jdGlvbiBLKGopIHtcbiAgaWYgKGogPD0gMTUpXG4gICAgcmV0dXJuIDB4MDAwMDAwMDA7XG4gIGVsc2UgaWYgKGogPD0gMzEpXG4gICAgcmV0dXJuIDB4NWE4Mjc5OTk7XG4gIGVsc2UgaWYgKGogPD0gNDcpXG4gICAgcmV0dXJuIDB4NmVkOWViYTE7XG4gIGVsc2UgaWYgKGogPD0gNjMpXG4gICAgcmV0dXJuIDB4OGYxYmJjZGM7XG4gIGVsc2VcbiAgICByZXR1cm4gMHhhOTUzZmQ0ZTtcbn1cblxuZnVuY3Rpb24gS2goaikge1xuICBpZiAoaiA8PSAxNSlcbiAgICByZXR1cm4gMHg1MGEyOGJlNjtcbiAgZWxzZSBpZiAoaiA8PSAzMSlcbiAgICByZXR1cm4gMHg1YzRkZDEyNDtcbiAgZWxzZSBpZiAoaiA8PSA0NylcbiAgICByZXR1cm4gMHg2ZDcwM2VmMztcbiAgZWxzZSBpZiAoaiA8PSA2MylcbiAgICByZXR1cm4gMHg3YTZkNzZlOTtcbiAgZWxzZVxuICAgIHJldHVybiAweDAwMDAwMDAwO1xufVxuXG52YXIgciA9IFtcbiAgMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNSxcbiAgNywgNCwgMTMsIDEsIDEwLCA2LCAxNSwgMywgMTIsIDAsIDksIDUsIDIsIDE0LCAxMSwgOCxcbiAgMywgMTAsIDE0LCA0LCA5LCAxNSwgOCwgMSwgMiwgNywgMCwgNiwgMTMsIDExLCA1LCAxMixcbiAgMSwgOSwgMTEsIDEwLCAwLCA4LCAxMiwgNCwgMTMsIDMsIDcsIDE1LCAxNCwgNSwgNiwgMixcbiAgNCwgMCwgNSwgOSwgNywgMTIsIDIsIDEwLCAxNCwgMSwgMywgOCwgMTEsIDYsIDE1LCAxM1xuXTtcblxudmFyIHJoID0gW1xuICA1LCAxNCwgNywgMCwgOSwgMiwgMTEsIDQsIDEzLCA2LCAxNSwgOCwgMSwgMTAsIDMsIDEyLFxuICA2LCAxMSwgMywgNywgMCwgMTMsIDUsIDEwLCAxNCwgMTUsIDgsIDEyLCA0LCA5LCAxLCAyLFxuICAxNSwgNSwgMSwgMywgNywgMTQsIDYsIDksIDExLCA4LCAxMiwgMiwgMTAsIDAsIDQsIDEzLFxuICA4LCA2LCA0LCAxLCAzLCAxMSwgMTUsIDAsIDUsIDEyLCAyLCAxMywgOSwgNywgMTAsIDE0LFxuICAxMiwgMTUsIDEwLCA0LCAxLCA1LCA4LCA3LCA2LCAyLCAxMywgMTQsIDAsIDMsIDksIDExXG5dO1xuXG52YXIgcyA9IFtcbiAgMTEsIDE0LCAxNSwgMTIsIDUsIDgsIDcsIDksIDExLCAxMywgMTQsIDE1LCA2LCA3LCA5LCA4LFxuICA3LCA2LCA4LCAxMywgMTEsIDksIDcsIDE1LCA3LCAxMiwgMTUsIDksIDExLCA3LCAxMywgMTIsXG4gIDExLCAxMywgNiwgNywgMTQsIDksIDEzLCAxNSwgMTQsIDgsIDEzLCA2LCA1LCAxMiwgNywgNSxcbiAgMTEsIDEyLCAxNCwgMTUsIDE0LCAxNSwgOSwgOCwgOSwgMTQsIDUsIDYsIDgsIDYsIDUsIDEyLFxuICA5LCAxNSwgNSwgMTEsIDYsIDgsIDEzLCAxMiwgNSwgMTIsIDEzLCAxNCwgMTEsIDgsIDUsIDZcbl07XG5cbnZhciBzaCA9IFtcbiAgOCwgOSwgOSwgMTEsIDEzLCAxNSwgMTUsIDUsIDcsIDcsIDgsIDExLCAxNCwgMTQsIDEyLCA2LFxuICA5LCAxMywgMTUsIDcsIDEyLCA4LCA5LCAxMSwgNywgNywgMTIsIDcsIDYsIDE1LCAxMywgMTEsXG4gIDksIDcsIDE1LCAxMSwgOCwgNiwgNiwgMTQsIDEyLCAxMywgNSwgMTQsIDEzLCAxMywgNywgNSxcbiAgMTUsIDUsIDgsIDExLCAxNCwgMTQsIDYsIDE0LCA2LCA5LCAxMiwgOSwgMTIsIDUsIDE1LCA4LFxuICA4LCA1LCAxMiwgOSwgMTIsIDUsIDE0LCA2LCA4LCAxMywgNiwgNSwgMTUsIDEzLCAxMSwgMTFcbl07XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuc2hhMSA9IHJlcXVpcmUoJy4vc2hhLzEnKTtcbmV4cG9ydHMuc2hhMjI0ID0gcmVxdWlyZSgnLi9zaGEvMjI0Jyk7XG5leHBvcnRzLnNoYTI1NiA9IHJlcXVpcmUoJy4vc2hhLzI1NicpO1xuZXhwb3J0cy5zaGEzODQgPSByZXF1aXJlKCcuL3NoYS8zODQnKTtcbmV4cG9ydHMuc2hhNTEyID0gcmVxdWlyZSgnLi9zaGEvNTEyJyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi4vY29tbW9uJyk7XG52YXIgc2hhQ29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcblxudmFyIHJvdGwzMiA9IHV0aWxzLnJvdGwzMjtcbnZhciBzdW0zMiA9IHV0aWxzLnN1bTMyO1xudmFyIHN1bTMyXzUgPSB1dGlscy5zdW0zMl81O1xudmFyIGZ0XzEgPSBzaGFDb21tb24uZnRfMTtcbnZhciBCbG9ja0hhc2ggPSBjb21tb24uQmxvY2tIYXNoO1xuXG52YXIgc2hhMV9LID0gW1xuICAweDVBODI3OTk5LCAweDZFRDlFQkExLFxuICAweDhGMUJCQ0RDLCAweENBNjJDMUQ2XG5dO1xuXG5mdW5jdGlvbiBTSEExKCkge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgU0hBMSkpXG4gICAgcmV0dXJuIG5ldyBTSEExKCk7XG5cbiAgQmxvY2tIYXNoLmNhbGwodGhpcyk7XG4gIHRoaXMuaCA9IFtcbiAgICAweDY3NDUyMzAxLCAweGVmY2RhYjg5LCAweDk4YmFkY2ZlLFxuICAgIDB4MTAzMjU0NzYsIDB4YzNkMmUxZjAgXTtcbiAgdGhpcy5XID0gbmV3IEFycmF5KDgwKTtcbn1cblxudXRpbHMuaW5oZXJpdHMoU0hBMSwgQmxvY2tIYXNoKTtcbm1vZHVsZS5leHBvcnRzID0gU0hBMTtcblxuU0hBMS5ibG9ja1NpemUgPSA1MTI7XG5TSEExLm91dFNpemUgPSAxNjA7XG5TSEExLmhtYWNTdHJlbmd0aCA9IDgwO1xuU0hBMS5wYWRMZW5ndGggPSA2NDtcblxuU0hBMS5wcm90b3R5cGUuX3VwZGF0ZSA9IGZ1bmN0aW9uIF91cGRhdGUobXNnLCBzdGFydCkge1xuICB2YXIgVyA9IHRoaXMuVztcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IDE2OyBpKyspXG4gICAgV1tpXSA9IG1zZ1tzdGFydCArIGldO1xuXG4gIGZvcig7IGkgPCBXLmxlbmd0aDsgaSsrKVxuICAgIFdbaV0gPSByb3RsMzIoV1tpIC0gM10gXiBXW2kgLSA4XSBeIFdbaSAtIDE0XSBeIFdbaSAtIDE2XSwgMSk7XG5cbiAgdmFyIGEgPSB0aGlzLmhbMF07XG4gIHZhciBiID0gdGhpcy5oWzFdO1xuICB2YXIgYyA9IHRoaXMuaFsyXTtcbiAgdmFyIGQgPSB0aGlzLmhbM107XG4gIHZhciBlID0gdGhpcy5oWzRdO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBXLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHMgPSB+fihpIC8gMjApO1xuICAgIHZhciB0ID0gc3VtMzJfNShyb3RsMzIoYSwgNSksIGZ0XzEocywgYiwgYywgZCksIGUsIFdbaV0sIHNoYTFfS1tzXSk7XG4gICAgZSA9IGQ7XG4gICAgZCA9IGM7XG4gICAgYyA9IHJvdGwzMihiLCAzMCk7XG4gICAgYiA9IGE7XG4gICAgYSA9IHQ7XG4gIH1cblxuICB0aGlzLmhbMF0gPSBzdW0zMih0aGlzLmhbMF0sIGEpO1xuICB0aGlzLmhbMV0gPSBzdW0zMih0aGlzLmhbMV0sIGIpO1xuICB0aGlzLmhbMl0gPSBzdW0zMih0aGlzLmhbMl0sIGMpO1xuICB0aGlzLmhbM10gPSBzdW0zMih0aGlzLmhbM10sIGQpO1xuICB0aGlzLmhbNF0gPSBzdW0zMih0aGlzLmhbNF0sIGUpO1xufTtcblxuU0hBMS5wcm90b3R5cGUuX2RpZ2VzdCA9IGZ1bmN0aW9uIGRpZ2VzdChlbmMpIHtcbiAgaWYgKGVuYyA9PT0gJ2hleCcpXG4gICAgcmV0dXJuIHV0aWxzLnRvSGV4MzIodGhpcy5oLCAnYmlnJyk7XG4gIGVsc2VcbiAgICByZXR1cm4gdXRpbHMuc3BsaXQzMih0aGlzLmgsICdiaWcnKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG52YXIgU0hBMjU2ID0gcmVxdWlyZSgnLi8yNTYnKTtcblxuZnVuY3Rpb24gU0hBMjI0KCkge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgU0hBMjI0KSlcbiAgICByZXR1cm4gbmV3IFNIQTIyNCgpO1xuXG4gIFNIQTI1Ni5jYWxsKHRoaXMpO1xuICB0aGlzLmggPSBbXG4gICAgMHhjMTA1OWVkOCwgMHgzNjdjZDUwNywgMHgzMDcwZGQxNywgMHhmNzBlNTkzOSxcbiAgICAweGZmYzAwYjMxLCAweDY4NTgxNTExLCAweDY0Zjk4ZmE3LCAweGJlZmE0ZmE0IF07XG59XG51dGlscy5pbmhlcml0cyhTSEEyMjQsIFNIQTI1Nik7XG5tb2R1bGUuZXhwb3J0cyA9IFNIQTIyNDtcblxuU0hBMjI0LmJsb2NrU2l6ZSA9IDUxMjtcblNIQTIyNC5vdXRTaXplID0gMjI0O1xuU0hBMjI0LmhtYWNTdHJlbmd0aCA9IDE5MjtcblNIQTIyNC5wYWRMZW5ndGggPSA2NDtcblxuU0hBMjI0LnByb3RvdHlwZS5fZGlnZXN0ID0gZnVuY3Rpb24gZGlnZXN0KGVuYykge1xuICAvLyBKdXN0IHRydW5jYXRlIG91dHB1dFxuICBpZiAoZW5jID09PSAnaGV4JylcbiAgICByZXR1cm4gdXRpbHMudG9IZXgzMih0aGlzLmguc2xpY2UoMCwgNyksICdiaWcnKTtcbiAgZWxzZVxuICAgIHJldHVybiB1dGlscy5zcGxpdDMyKHRoaXMuaC5zbGljZSgwLCA3KSwgJ2JpZycpO1xufTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4uL2NvbW1vbicpO1xudmFyIHNoYUNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgYXNzZXJ0ID0gcmVxdWlyZSgnbWluaW1hbGlzdGljLWFzc2VydCcpO1xuXG52YXIgc3VtMzIgPSB1dGlscy5zdW0zMjtcbnZhciBzdW0zMl80ID0gdXRpbHMuc3VtMzJfNDtcbnZhciBzdW0zMl81ID0gdXRpbHMuc3VtMzJfNTtcbnZhciBjaDMyID0gc2hhQ29tbW9uLmNoMzI7XG52YXIgbWFqMzIgPSBzaGFDb21tb24ubWFqMzI7XG52YXIgczBfMjU2ID0gc2hhQ29tbW9uLnMwXzI1NjtcbnZhciBzMV8yNTYgPSBzaGFDb21tb24uczFfMjU2O1xudmFyIGcwXzI1NiA9IHNoYUNvbW1vbi5nMF8yNTY7XG52YXIgZzFfMjU2ID0gc2hhQ29tbW9uLmcxXzI1NjtcblxudmFyIEJsb2NrSGFzaCA9IGNvbW1vbi5CbG9ja0hhc2g7XG5cbnZhciBzaGEyNTZfSyA9IFtcbiAgMHg0MjhhMmY5OCwgMHg3MTM3NDQ5MSwgMHhiNWMwZmJjZiwgMHhlOWI1ZGJhNSxcbiAgMHgzOTU2YzI1YiwgMHg1OWYxMTFmMSwgMHg5MjNmODJhNCwgMHhhYjFjNWVkNSxcbiAgMHhkODA3YWE5OCwgMHgxMjgzNWIwMSwgMHgyNDMxODViZSwgMHg1NTBjN2RjMyxcbiAgMHg3MmJlNWQ3NCwgMHg4MGRlYjFmZSwgMHg5YmRjMDZhNywgMHhjMTliZjE3NCxcbiAgMHhlNDliNjljMSwgMHhlZmJlNDc4NiwgMHgwZmMxOWRjNiwgMHgyNDBjYTFjYyxcbiAgMHgyZGU5MmM2ZiwgMHg0YTc0ODRhYSwgMHg1Y2IwYTlkYywgMHg3NmY5ODhkYSxcbiAgMHg5ODNlNTE1MiwgMHhhODMxYzY2ZCwgMHhiMDAzMjdjOCwgMHhiZjU5N2ZjNyxcbiAgMHhjNmUwMGJmMywgMHhkNWE3OTE0NywgMHgwNmNhNjM1MSwgMHgxNDI5Mjk2NyxcbiAgMHgyN2I3MGE4NSwgMHgyZTFiMjEzOCwgMHg0ZDJjNmRmYywgMHg1MzM4MGQxMyxcbiAgMHg2NTBhNzM1NCwgMHg3NjZhMGFiYiwgMHg4MWMyYzkyZSwgMHg5MjcyMmM4NSxcbiAgMHhhMmJmZThhMSwgMHhhODFhNjY0YiwgMHhjMjRiOGI3MCwgMHhjNzZjNTFhMyxcbiAgMHhkMTkyZTgxOSwgMHhkNjk5MDYyNCwgMHhmNDBlMzU4NSwgMHgxMDZhYTA3MCxcbiAgMHgxOWE0YzExNiwgMHgxZTM3NmMwOCwgMHgyNzQ4Nzc0YywgMHgzNGIwYmNiNSxcbiAgMHgzOTFjMGNiMywgMHg0ZWQ4YWE0YSwgMHg1YjljY2E0ZiwgMHg2ODJlNmZmMyxcbiAgMHg3NDhmODJlZSwgMHg3OGE1NjM2ZiwgMHg4NGM4NzgxNCwgMHg4Y2M3MDIwOCxcbiAgMHg5MGJlZmZmYSwgMHhhNDUwNmNlYiwgMHhiZWY5YTNmNywgMHhjNjcxNzhmMlxuXTtcblxuZnVuY3Rpb24gU0hBMjU2KCkge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgU0hBMjU2KSlcbiAgICByZXR1cm4gbmV3IFNIQTI1NigpO1xuXG4gIEJsb2NrSGFzaC5jYWxsKHRoaXMpO1xuICB0aGlzLmggPSBbXG4gICAgMHg2YTA5ZTY2NywgMHhiYjY3YWU4NSwgMHgzYzZlZjM3MiwgMHhhNTRmZjUzYSxcbiAgICAweDUxMGU1MjdmLCAweDliMDU2ODhjLCAweDFmODNkOWFiLCAweDViZTBjZDE5XG4gIF07XG4gIHRoaXMuayA9IHNoYTI1Nl9LO1xuICB0aGlzLlcgPSBuZXcgQXJyYXkoNjQpO1xufVxudXRpbHMuaW5oZXJpdHMoU0hBMjU2LCBCbG9ja0hhc2gpO1xubW9kdWxlLmV4cG9ydHMgPSBTSEEyNTY7XG5cblNIQTI1Ni5ibG9ja1NpemUgPSA1MTI7XG5TSEEyNTYub3V0U2l6ZSA9IDI1NjtcblNIQTI1Ni5obWFjU3RyZW5ndGggPSAxOTI7XG5TSEEyNTYucGFkTGVuZ3RoID0gNjQ7XG5cblNIQTI1Ni5wcm90b3R5cGUuX3VwZGF0ZSA9IGZ1bmN0aW9uIF91cGRhdGUobXNnLCBzdGFydCkge1xuICB2YXIgVyA9IHRoaXMuVztcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IDE2OyBpKyspXG4gICAgV1tpXSA9IG1zZ1tzdGFydCArIGldO1xuICBmb3IgKDsgaSA8IFcubGVuZ3RoOyBpKyspXG4gICAgV1tpXSA9IHN1bTMyXzQoZzFfMjU2KFdbaSAtIDJdKSwgV1tpIC0gN10sIGcwXzI1NihXW2kgLSAxNV0pLCBXW2kgLSAxNl0pO1xuXG4gIHZhciBhID0gdGhpcy5oWzBdO1xuICB2YXIgYiA9IHRoaXMuaFsxXTtcbiAgdmFyIGMgPSB0aGlzLmhbMl07XG4gIHZhciBkID0gdGhpcy5oWzNdO1xuICB2YXIgZSA9IHRoaXMuaFs0XTtcbiAgdmFyIGYgPSB0aGlzLmhbNV07XG4gIHZhciBnID0gdGhpcy5oWzZdO1xuICB2YXIgaCA9IHRoaXMuaFs3XTtcblxuICBhc3NlcnQodGhpcy5rLmxlbmd0aCA9PT0gVy5sZW5ndGgpO1xuICBmb3IgKGkgPSAwOyBpIDwgVy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBUMSA9IHN1bTMyXzUoaCwgczFfMjU2KGUpLCBjaDMyKGUsIGYsIGcpLCB0aGlzLmtbaV0sIFdbaV0pO1xuICAgIHZhciBUMiA9IHN1bTMyKHMwXzI1NihhKSwgbWFqMzIoYSwgYiwgYykpO1xuICAgIGggPSBnO1xuICAgIGcgPSBmO1xuICAgIGYgPSBlO1xuICAgIGUgPSBzdW0zMihkLCBUMSk7XG4gICAgZCA9IGM7XG4gICAgYyA9IGI7XG4gICAgYiA9IGE7XG4gICAgYSA9IHN1bTMyKFQxLCBUMik7XG4gIH1cblxuICB0aGlzLmhbMF0gPSBzdW0zMih0aGlzLmhbMF0sIGEpO1xuICB0aGlzLmhbMV0gPSBzdW0zMih0aGlzLmhbMV0sIGIpO1xuICB0aGlzLmhbMl0gPSBzdW0zMih0aGlzLmhbMl0sIGMpO1xuICB0aGlzLmhbM10gPSBzdW0zMih0aGlzLmhbM10sIGQpO1xuICB0aGlzLmhbNF0gPSBzdW0zMih0aGlzLmhbNF0sIGUpO1xuICB0aGlzLmhbNV0gPSBzdW0zMih0aGlzLmhbNV0sIGYpO1xuICB0aGlzLmhbNl0gPSBzdW0zMih0aGlzLmhbNl0sIGcpO1xuICB0aGlzLmhbN10gPSBzdW0zMih0aGlzLmhbN10sIGgpO1xufTtcblxuU0hBMjU2LnByb3RvdHlwZS5fZGlnZXN0ID0gZnVuY3Rpb24gZGlnZXN0KGVuYykge1xuICBpZiAoZW5jID09PSAnaGV4JylcbiAgICByZXR1cm4gdXRpbHMudG9IZXgzMih0aGlzLmgsICdiaWcnKTtcbiAgZWxzZVxuICAgIHJldHVybiB1dGlscy5zcGxpdDMyKHRoaXMuaCwgJ2JpZycpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxudmFyIFNIQTUxMiA9IHJlcXVpcmUoJy4vNTEyJyk7XG5cbmZ1bmN0aW9uIFNIQTM4NCgpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFNIQTM4NCkpXG4gICAgcmV0dXJuIG5ldyBTSEEzODQoKTtcblxuICBTSEE1MTIuY2FsbCh0aGlzKTtcbiAgdGhpcy5oID0gW1xuICAgIDB4Y2JiYjlkNWQsIDB4YzEwNTllZDgsXG4gICAgMHg2MjlhMjkyYSwgMHgzNjdjZDUwNyxcbiAgICAweDkxNTkwMTVhLCAweDMwNzBkZDE3LFxuICAgIDB4MTUyZmVjZDgsIDB4ZjcwZTU5MzksXG4gICAgMHg2NzMzMjY2NywgMHhmZmMwMGIzMSxcbiAgICAweDhlYjQ0YTg3LCAweDY4NTgxNTExLFxuICAgIDB4ZGIwYzJlMGQsIDB4NjRmOThmYTcsXG4gICAgMHg0N2I1NDgxZCwgMHhiZWZhNGZhNCBdO1xufVxudXRpbHMuaW5oZXJpdHMoU0hBMzg0LCBTSEE1MTIpO1xubW9kdWxlLmV4cG9ydHMgPSBTSEEzODQ7XG5cblNIQTM4NC5ibG9ja1NpemUgPSAxMDI0O1xuU0hBMzg0Lm91dFNpemUgPSAzODQ7XG5TSEEzODQuaG1hY1N0cmVuZ3RoID0gMTkyO1xuU0hBMzg0LnBhZExlbmd0aCA9IDEyODtcblxuU0hBMzg0LnByb3RvdHlwZS5fZGlnZXN0ID0gZnVuY3Rpb24gZGlnZXN0KGVuYykge1xuICBpZiAoZW5jID09PSAnaGV4JylcbiAgICByZXR1cm4gdXRpbHMudG9IZXgzMih0aGlzLmguc2xpY2UoMCwgMTIpLCAnYmlnJyk7XG4gIGVsc2VcbiAgICByZXR1cm4gdXRpbHMuc3BsaXQzMih0aGlzLmguc2xpY2UoMCwgMTIpLCAnYmlnJyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4uL2NvbW1vbicpO1xudmFyIGFzc2VydCA9IHJlcXVpcmUoJ21pbmltYWxpc3RpYy1hc3NlcnQnKTtcblxudmFyIHJvdHI2NF9oaSA9IHV0aWxzLnJvdHI2NF9oaTtcbnZhciByb3RyNjRfbG8gPSB1dGlscy5yb3RyNjRfbG87XG52YXIgc2hyNjRfaGkgPSB1dGlscy5zaHI2NF9oaTtcbnZhciBzaHI2NF9sbyA9IHV0aWxzLnNocjY0X2xvO1xudmFyIHN1bTY0ID0gdXRpbHMuc3VtNjQ7XG52YXIgc3VtNjRfaGkgPSB1dGlscy5zdW02NF9oaTtcbnZhciBzdW02NF9sbyA9IHV0aWxzLnN1bTY0X2xvO1xudmFyIHN1bTY0XzRfaGkgPSB1dGlscy5zdW02NF80X2hpO1xudmFyIHN1bTY0XzRfbG8gPSB1dGlscy5zdW02NF80X2xvO1xudmFyIHN1bTY0XzVfaGkgPSB1dGlscy5zdW02NF81X2hpO1xudmFyIHN1bTY0XzVfbG8gPSB1dGlscy5zdW02NF81X2xvO1xuXG52YXIgQmxvY2tIYXNoID0gY29tbW9uLkJsb2NrSGFzaDtcblxudmFyIHNoYTUxMl9LID0gW1xuICAweDQyOGEyZjk4LCAweGQ3MjhhZTIyLCAweDcxMzc0NDkxLCAweDIzZWY2NWNkLFxuICAweGI1YzBmYmNmLCAweGVjNGQzYjJmLCAweGU5YjVkYmE1LCAweDgxODlkYmJjLFxuICAweDM5NTZjMjViLCAweGYzNDhiNTM4LCAweDU5ZjExMWYxLCAweGI2MDVkMDE5LFxuICAweDkyM2Y4MmE0LCAweGFmMTk0ZjliLCAweGFiMWM1ZWQ1LCAweGRhNmQ4MTE4LFxuICAweGQ4MDdhYTk4LCAweGEzMDMwMjQyLCAweDEyODM1YjAxLCAweDQ1NzA2ZmJlLFxuICAweDI0MzE4NWJlLCAweDRlZTRiMjhjLCAweDU1MGM3ZGMzLCAweGQ1ZmZiNGUyLFxuICAweDcyYmU1ZDc0LCAweGYyN2I4OTZmLCAweDgwZGViMWZlLCAweDNiMTY5NmIxLFxuICAweDliZGMwNmE3LCAweDI1YzcxMjM1LCAweGMxOWJmMTc0LCAweGNmNjkyNjk0LFxuICAweGU0OWI2OWMxLCAweDllZjE0YWQyLCAweGVmYmU0Nzg2LCAweDM4NGYyNWUzLFxuICAweDBmYzE5ZGM2LCAweDhiOGNkNWI1LCAweDI0MGNhMWNjLCAweDc3YWM5YzY1LFxuICAweDJkZTkyYzZmLCAweDU5MmIwMjc1LCAweDRhNzQ4NGFhLCAweDZlYTZlNDgzLFxuICAweDVjYjBhOWRjLCAweGJkNDFmYmQ0LCAweDc2Zjk4OGRhLCAweDgzMTE1M2I1LFxuICAweDk4M2U1MTUyLCAweGVlNjZkZmFiLCAweGE4MzFjNjZkLCAweDJkYjQzMjEwLFxuICAweGIwMDMyN2M4LCAweDk4ZmIyMTNmLCAweGJmNTk3ZmM3LCAweGJlZWYwZWU0LFxuICAweGM2ZTAwYmYzLCAweDNkYTg4ZmMyLCAweGQ1YTc5MTQ3LCAweDkzMGFhNzI1LFxuICAweDA2Y2E2MzUxLCAweGUwMDM4MjZmLCAweDE0MjkyOTY3LCAweDBhMGU2ZTcwLFxuICAweDI3YjcwYTg1LCAweDQ2ZDIyZmZjLCAweDJlMWIyMTM4LCAweDVjMjZjOTI2LFxuICAweDRkMmM2ZGZjLCAweDVhYzQyYWVkLCAweDUzMzgwZDEzLCAweDlkOTViM2RmLFxuICAweDY1MGE3MzU0LCAweDhiYWY2M2RlLCAweDc2NmEwYWJiLCAweDNjNzdiMmE4LFxuICAweDgxYzJjOTJlLCAweDQ3ZWRhZWU2LCAweDkyNzIyYzg1LCAweDE0ODIzNTNiLFxuICAweGEyYmZlOGExLCAweDRjZjEwMzY0LCAweGE4MWE2NjRiLCAweGJjNDIzMDAxLFxuICAweGMyNGI4YjcwLCAweGQwZjg5NzkxLCAweGM3NmM1MWEzLCAweDA2NTRiZTMwLFxuICAweGQxOTJlODE5LCAweGQ2ZWY1MjE4LCAweGQ2OTkwNjI0LCAweDU1NjVhOTEwLFxuICAweGY0MGUzNTg1LCAweDU3NzEyMDJhLCAweDEwNmFhMDcwLCAweDMyYmJkMWI4LFxuICAweDE5YTRjMTE2LCAweGI4ZDJkMGM4LCAweDFlMzc2YzA4LCAweDUxNDFhYjUzLFxuICAweDI3NDg3NzRjLCAweGRmOGVlYjk5LCAweDM0YjBiY2I1LCAweGUxOWI0OGE4LFxuICAweDM5MWMwY2IzLCAweGM1Yzk1YTYzLCAweDRlZDhhYTRhLCAweGUzNDE4YWNiLFxuICAweDViOWNjYTRmLCAweDc3NjNlMzczLCAweDY4MmU2ZmYzLCAweGQ2YjJiOGEzLFxuICAweDc0OGY4MmVlLCAweDVkZWZiMmZjLCAweDc4YTU2MzZmLCAweDQzMTcyZjYwLFxuICAweDg0Yzg3ODE0LCAweGExZjBhYjcyLCAweDhjYzcwMjA4LCAweDFhNjQzOWVjLFxuICAweDkwYmVmZmZhLCAweDIzNjMxZTI4LCAweGE0NTA2Y2ViLCAweGRlODJiZGU5LFxuICAweGJlZjlhM2Y3LCAweGIyYzY3OTE1LCAweGM2NzE3OGYyLCAweGUzNzI1MzJiLFxuICAweGNhMjczZWNlLCAweGVhMjY2MTljLCAweGQxODZiOGM3LCAweDIxYzBjMjA3LFxuICAweGVhZGE3ZGQ2LCAweGNkZTBlYjFlLCAweGY1N2Q0ZjdmLCAweGVlNmVkMTc4LFxuICAweDA2ZjA2N2FhLCAweDcyMTc2ZmJhLCAweDBhNjM3ZGM1LCAweGEyYzg5OGE2LFxuICAweDExM2Y5ODA0LCAweGJlZjkwZGFlLCAweDFiNzEwYjM1LCAweDEzMWM0NzFiLFxuICAweDI4ZGI3N2Y1LCAweDIzMDQ3ZDg0LCAweDMyY2FhYjdiLCAweDQwYzcyNDkzLFxuICAweDNjOWViZTBhLCAweDE1YzliZWJjLCAweDQzMWQ2N2M0LCAweDljMTAwZDRjLFxuICAweDRjYzVkNGJlLCAweGNiM2U0MmI2LCAweDU5N2YyOTljLCAweGZjNjU3ZTJhLFxuICAweDVmY2I2ZmFiLCAweDNhZDZmYWVjLCAweDZjNDQxOThjLCAweDRhNDc1ODE3XG5dO1xuXG5mdW5jdGlvbiBTSEE1MTIoKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBTSEE1MTIpKVxuICAgIHJldHVybiBuZXcgU0hBNTEyKCk7XG5cbiAgQmxvY2tIYXNoLmNhbGwodGhpcyk7XG4gIHRoaXMuaCA9IFtcbiAgICAweDZhMDllNjY3LCAweGYzYmNjOTA4LFxuICAgIDB4YmI2N2FlODUsIDB4ODRjYWE3M2IsXG4gICAgMHgzYzZlZjM3MiwgMHhmZTk0ZjgyYixcbiAgICAweGE1NGZmNTNhLCAweDVmMWQzNmYxLFxuICAgIDB4NTEwZTUyN2YsIDB4YWRlNjgyZDEsXG4gICAgMHg5YjA1Njg4YywgMHgyYjNlNmMxZixcbiAgICAweDFmODNkOWFiLCAweGZiNDFiZDZiLFxuICAgIDB4NWJlMGNkMTksIDB4MTM3ZTIxNzkgXTtcbiAgdGhpcy5rID0gc2hhNTEyX0s7XG4gIHRoaXMuVyA9IG5ldyBBcnJheSgxNjApO1xufVxudXRpbHMuaW5oZXJpdHMoU0hBNTEyLCBCbG9ja0hhc2gpO1xubW9kdWxlLmV4cG9ydHMgPSBTSEE1MTI7XG5cblNIQTUxMi5ibG9ja1NpemUgPSAxMDI0O1xuU0hBNTEyLm91dFNpemUgPSA1MTI7XG5TSEE1MTIuaG1hY1N0cmVuZ3RoID0gMTkyO1xuU0hBNTEyLnBhZExlbmd0aCA9IDEyODtcblxuU0hBNTEyLnByb3RvdHlwZS5fcHJlcGFyZUJsb2NrID0gZnVuY3Rpb24gX3ByZXBhcmVCbG9jayhtc2csIHN0YXJ0KSB7XG4gIHZhciBXID0gdGhpcy5XO1xuXG4gIC8vIDMyIHggMzJiaXQgd29yZHNcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCAzMjsgaSsrKVxuICAgIFdbaV0gPSBtc2dbc3RhcnQgKyBpXTtcbiAgZm9yICg7IGkgPCBXLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgdmFyIGMwX2hpID0gZzFfNTEyX2hpKFdbaSAtIDRdLCBXW2kgLSAzXSk7ICAvLyBpIC0gMlxuICAgIHZhciBjMF9sbyA9IGcxXzUxMl9sbyhXW2kgLSA0XSwgV1tpIC0gM10pO1xuICAgIHZhciBjMV9oaSA9IFdbaSAtIDE0XTsgIC8vIGkgLSA3XG4gICAgdmFyIGMxX2xvID0gV1tpIC0gMTNdO1xuICAgIHZhciBjMl9oaSA9IGcwXzUxMl9oaShXW2kgLSAzMF0sIFdbaSAtIDI5XSk7ICAvLyBpIC0gMTVcbiAgICB2YXIgYzJfbG8gPSBnMF81MTJfbG8oV1tpIC0gMzBdLCBXW2kgLSAyOV0pO1xuICAgIHZhciBjM19oaSA9IFdbaSAtIDMyXTsgIC8vIGkgLSAxNlxuICAgIHZhciBjM19sbyA9IFdbaSAtIDMxXTtcblxuICAgIFdbaV0gPSBzdW02NF80X2hpKFxuICAgICAgYzBfaGksIGMwX2xvLFxuICAgICAgYzFfaGksIGMxX2xvLFxuICAgICAgYzJfaGksIGMyX2xvLFxuICAgICAgYzNfaGksIGMzX2xvKTtcbiAgICBXW2kgKyAxXSA9IHN1bTY0XzRfbG8oXG4gICAgICBjMF9oaSwgYzBfbG8sXG4gICAgICBjMV9oaSwgYzFfbG8sXG4gICAgICBjMl9oaSwgYzJfbG8sXG4gICAgICBjM19oaSwgYzNfbG8pO1xuICB9XG59O1xuXG5TSEE1MTIucHJvdG90eXBlLl91cGRhdGUgPSBmdW5jdGlvbiBfdXBkYXRlKG1zZywgc3RhcnQpIHtcbiAgdGhpcy5fcHJlcGFyZUJsb2NrKG1zZywgc3RhcnQpO1xuXG4gIHZhciBXID0gdGhpcy5XO1xuXG4gIHZhciBhaCA9IHRoaXMuaFswXTtcbiAgdmFyIGFsID0gdGhpcy5oWzFdO1xuICB2YXIgYmggPSB0aGlzLmhbMl07XG4gIHZhciBibCA9IHRoaXMuaFszXTtcbiAgdmFyIGNoID0gdGhpcy5oWzRdO1xuICB2YXIgY2wgPSB0aGlzLmhbNV07XG4gIHZhciBkaCA9IHRoaXMuaFs2XTtcbiAgdmFyIGRsID0gdGhpcy5oWzddO1xuICB2YXIgZWggPSB0aGlzLmhbOF07XG4gIHZhciBlbCA9IHRoaXMuaFs5XTtcbiAgdmFyIGZoID0gdGhpcy5oWzEwXTtcbiAgdmFyIGZsID0gdGhpcy5oWzExXTtcbiAgdmFyIGdoID0gdGhpcy5oWzEyXTtcbiAgdmFyIGdsID0gdGhpcy5oWzEzXTtcbiAgdmFyIGhoID0gdGhpcy5oWzE0XTtcbiAgdmFyIGhsID0gdGhpcy5oWzE1XTtcblxuICBhc3NlcnQodGhpcy5rLmxlbmd0aCA9PT0gVy5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IFcubGVuZ3RoOyBpICs9IDIpIHtcbiAgICB2YXIgYzBfaGkgPSBoaDtcbiAgICB2YXIgYzBfbG8gPSBobDtcbiAgICB2YXIgYzFfaGkgPSBzMV81MTJfaGkoZWgsIGVsKTtcbiAgICB2YXIgYzFfbG8gPSBzMV81MTJfbG8oZWgsIGVsKTtcbiAgICB2YXIgYzJfaGkgPSBjaDY0X2hpKGVoLCBlbCwgZmgsIGZsLCBnaCwgZ2wpO1xuICAgIHZhciBjMl9sbyA9IGNoNjRfbG8oZWgsIGVsLCBmaCwgZmwsIGdoLCBnbCk7XG4gICAgdmFyIGMzX2hpID0gdGhpcy5rW2ldO1xuICAgIHZhciBjM19sbyA9IHRoaXMua1tpICsgMV07XG4gICAgdmFyIGM0X2hpID0gV1tpXTtcbiAgICB2YXIgYzRfbG8gPSBXW2kgKyAxXTtcblxuICAgIHZhciBUMV9oaSA9IHN1bTY0XzVfaGkoXG4gICAgICBjMF9oaSwgYzBfbG8sXG4gICAgICBjMV9oaSwgYzFfbG8sXG4gICAgICBjMl9oaSwgYzJfbG8sXG4gICAgICBjM19oaSwgYzNfbG8sXG4gICAgICBjNF9oaSwgYzRfbG8pO1xuICAgIHZhciBUMV9sbyA9IHN1bTY0XzVfbG8oXG4gICAgICBjMF9oaSwgYzBfbG8sXG4gICAgICBjMV9oaSwgYzFfbG8sXG4gICAgICBjMl9oaSwgYzJfbG8sXG4gICAgICBjM19oaSwgYzNfbG8sXG4gICAgICBjNF9oaSwgYzRfbG8pO1xuXG4gICAgYzBfaGkgPSBzMF81MTJfaGkoYWgsIGFsKTtcbiAgICBjMF9sbyA9IHMwXzUxMl9sbyhhaCwgYWwpO1xuICAgIGMxX2hpID0gbWFqNjRfaGkoYWgsIGFsLCBiaCwgYmwsIGNoLCBjbCk7XG4gICAgYzFfbG8gPSBtYWo2NF9sbyhhaCwgYWwsIGJoLCBibCwgY2gsIGNsKTtcblxuICAgIHZhciBUMl9oaSA9IHN1bTY0X2hpKGMwX2hpLCBjMF9sbywgYzFfaGksIGMxX2xvKTtcbiAgICB2YXIgVDJfbG8gPSBzdW02NF9sbyhjMF9oaSwgYzBfbG8sIGMxX2hpLCBjMV9sbyk7XG5cbiAgICBoaCA9IGdoO1xuICAgIGhsID0gZ2w7XG5cbiAgICBnaCA9IGZoO1xuICAgIGdsID0gZmw7XG5cbiAgICBmaCA9IGVoO1xuICAgIGZsID0gZWw7XG5cbiAgICBlaCA9IHN1bTY0X2hpKGRoLCBkbCwgVDFfaGksIFQxX2xvKTtcbiAgICBlbCA9IHN1bTY0X2xvKGRsLCBkbCwgVDFfaGksIFQxX2xvKTtcblxuICAgIGRoID0gY2g7XG4gICAgZGwgPSBjbDtcblxuICAgIGNoID0gYmg7XG4gICAgY2wgPSBibDtcblxuICAgIGJoID0gYWg7XG4gICAgYmwgPSBhbDtcblxuICAgIGFoID0gc3VtNjRfaGkoVDFfaGksIFQxX2xvLCBUMl9oaSwgVDJfbG8pO1xuICAgIGFsID0gc3VtNjRfbG8oVDFfaGksIFQxX2xvLCBUMl9oaSwgVDJfbG8pO1xuICB9XG5cbiAgc3VtNjQodGhpcy5oLCAwLCBhaCwgYWwpO1xuICBzdW02NCh0aGlzLmgsIDIsIGJoLCBibCk7XG4gIHN1bTY0KHRoaXMuaCwgNCwgY2gsIGNsKTtcbiAgc3VtNjQodGhpcy5oLCA2LCBkaCwgZGwpO1xuICBzdW02NCh0aGlzLmgsIDgsIGVoLCBlbCk7XG4gIHN1bTY0KHRoaXMuaCwgMTAsIGZoLCBmbCk7XG4gIHN1bTY0KHRoaXMuaCwgMTIsIGdoLCBnbCk7XG4gIHN1bTY0KHRoaXMuaCwgMTQsIGhoLCBobCk7XG59O1xuXG5TSEE1MTIucHJvdG90eXBlLl9kaWdlc3QgPSBmdW5jdGlvbiBkaWdlc3QoZW5jKSB7XG4gIGlmIChlbmMgPT09ICdoZXgnKVxuICAgIHJldHVybiB1dGlscy50b0hleDMyKHRoaXMuaCwgJ2JpZycpO1xuICBlbHNlXG4gICAgcmV0dXJuIHV0aWxzLnNwbGl0MzIodGhpcy5oLCAnYmlnJyk7XG59O1xuXG5mdW5jdGlvbiBjaDY0X2hpKHhoLCB4bCwgeWgsIHlsLCB6aCkge1xuICB2YXIgciA9ICh4aCAmIHloKSBeICgofnhoKSAmIHpoKTtcbiAgaWYgKHIgPCAwKVxuICAgIHIgKz0gMHgxMDAwMDAwMDA7XG4gIHJldHVybiByO1xufVxuXG5mdW5jdGlvbiBjaDY0X2xvKHhoLCB4bCwgeWgsIHlsLCB6aCwgemwpIHtcbiAgdmFyIHIgPSAoeGwgJiB5bCkgXiAoKH54bCkgJiB6bCk7XG4gIGlmIChyIDwgMClcbiAgICByICs9IDB4MTAwMDAwMDAwO1xuICByZXR1cm4gcjtcbn1cblxuZnVuY3Rpb24gbWFqNjRfaGkoeGgsIHhsLCB5aCwgeWwsIHpoKSB7XG4gIHZhciByID0gKHhoICYgeWgpIF4gKHhoICYgemgpIF4gKHloICYgemgpO1xuICBpZiAociA8IDApXG4gICAgciArPSAweDEwMDAwMDAwMDtcbiAgcmV0dXJuIHI7XG59XG5cbmZ1bmN0aW9uIG1hajY0X2xvKHhoLCB4bCwgeWgsIHlsLCB6aCwgemwpIHtcbiAgdmFyIHIgPSAoeGwgJiB5bCkgXiAoeGwgJiB6bCkgXiAoeWwgJiB6bCk7XG4gIGlmIChyIDwgMClcbiAgICByICs9IDB4MTAwMDAwMDAwO1xuICByZXR1cm4gcjtcbn1cblxuZnVuY3Rpb24gczBfNTEyX2hpKHhoLCB4bCkge1xuICB2YXIgYzBfaGkgPSByb3RyNjRfaGkoeGgsIHhsLCAyOCk7XG4gIHZhciBjMV9oaSA9IHJvdHI2NF9oaSh4bCwgeGgsIDIpOyAgLy8gMzRcbiAgdmFyIGMyX2hpID0gcm90cjY0X2hpKHhsLCB4aCwgNyk7ICAvLyAzOVxuXG4gIHZhciByID0gYzBfaGkgXiBjMV9oaSBeIGMyX2hpO1xuICBpZiAociA8IDApXG4gICAgciArPSAweDEwMDAwMDAwMDtcbiAgcmV0dXJuIHI7XG59XG5cbmZ1bmN0aW9uIHMwXzUxMl9sbyh4aCwgeGwpIHtcbiAgdmFyIGMwX2xvID0gcm90cjY0X2xvKHhoLCB4bCwgMjgpO1xuICB2YXIgYzFfbG8gPSByb3RyNjRfbG8oeGwsIHhoLCAyKTsgIC8vIDM0XG4gIHZhciBjMl9sbyA9IHJvdHI2NF9sbyh4bCwgeGgsIDcpOyAgLy8gMzlcblxuICB2YXIgciA9IGMwX2xvIF4gYzFfbG8gXiBjMl9sbztcbiAgaWYgKHIgPCAwKVxuICAgIHIgKz0gMHgxMDAwMDAwMDA7XG4gIHJldHVybiByO1xufVxuXG5mdW5jdGlvbiBzMV81MTJfaGkoeGgsIHhsKSB7XG4gIHZhciBjMF9oaSA9IHJvdHI2NF9oaSh4aCwgeGwsIDE0KTtcbiAgdmFyIGMxX2hpID0gcm90cjY0X2hpKHhoLCB4bCwgMTgpO1xuICB2YXIgYzJfaGkgPSByb3RyNjRfaGkoeGwsIHhoLCA5KTsgIC8vIDQxXG5cbiAgdmFyIHIgPSBjMF9oaSBeIGMxX2hpIF4gYzJfaGk7XG4gIGlmIChyIDwgMClcbiAgICByICs9IDB4MTAwMDAwMDAwO1xuICByZXR1cm4gcjtcbn1cblxuZnVuY3Rpb24gczFfNTEyX2xvKHhoLCB4bCkge1xuICB2YXIgYzBfbG8gPSByb3RyNjRfbG8oeGgsIHhsLCAxNCk7XG4gIHZhciBjMV9sbyA9IHJvdHI2NF9sbyh4aCwgeGwsIDE4KTtcbiAgdmFyIGMyX2xvID0gcm90cjY0X2xvKHhsLCB4aCwgOSk7ICAvLyA0MVxuXG4gIHZhciByID0gYzBfbG8gXiBjMV9sbyBeIGMyX2xvO1xuICBpZiAociA8IDApXG4gICAgciArPSAweDEwMDAwMDAwMDtcbiAgcmV0dXJuIHI7XG59XG5cbmZ1bmN0aW9uIGcwXzUxMl9oaSh4aCwgeGwpIHtcbiAgdmFyIGMwX2hpID0gcm90cjY0X2hpKHhoLCB4bCwgMSk7XG4gIHZhciBjMV9oaSA9IHJvdHI2NF9oaSh4aCwgeGwsIDgpO1xuICB2YXIgYzJfaGkgPSBzaHI2NF9oaSh4aCwgeGwsIDcpO1xuXG4gIHZhciByID0gYzBfaGkgXiBjMV9oaSBeIGMyX2hpO1xuICBpZiAociA8IDApXG4gICAgciArPSAweDEwMDAwMDAwMDtcbiAgcmV0dXJuIHI7XG59XG5cbmZ1bmN0aW9uIGcwXzUxMl9sbyh4aCwgeGwpIHtcbiAgdmFyIGMwX2xvID0gcm90cjY0X2xvKHhoLCB4bCwgMSk7XG4gIHZhciBjMV9sbyA9IHJvdHI2NF9sbyh4aCwgeGwsIDgpO1xuICB2YXIgYzJfbG8gPSBzaHI2NF9sbyh4aCwgeGwsIDcpO1xuXG4gIHZhciByID0gYzBfbG8gXiBjMV9sbyBeIGMyX2xvO1xuICBpZiAociA8IDApXG4gICAgciArPSAweDEwMDAwMDAwMDtcbiAgcmV0dXJuIHI7XG59XG5cbmZ1bmN0aW9uIGcxXzUxMl9oaSh4aCwgeGwpIHtcbiAgdmFyIGMwX2hpID0gcm90cjY0X2hpKHhoLCB4bCwgMTkpO1xuICB2YXIgYzFfaGkgPSByb3RyNjRfaGkoeGwsIHhoLCAyOSk7ICAvLyA2MVxuICB2YXIgYzJfaGkgPSBzaHI2NF9oaSh4aCwgeGwsIDYpO1xuXG4gIHZhciByID0gYzBfaGkgXiBjMV9oaSBeIGMyX2hpO1xuICBpZiAociA8IDApXG4gICAgciArPSAweDEwMDAwMDAwMDtcbiAgcmV0dXJuIHI7XG59XG5cbmZ1bmN0aW9uIGcxXzUxMl9sbyh4aCwgeGwpIHtcbiAgdmFyIGMwX2xvID0gcm90cjY0X2xvKHhoLCB4bCwgMTkpO1xuICB2YXIgYzFfbG8gPSByb3RyNjRfbG8oeGwsIHhoLCAyOSk7ICAvLyA2MVxuICB2YXIgYzJfbG8gPSBzaHI2NF9sbyh4aCwgeGwsIDYpO1xuXG4gIHZhciByID0gYzBfbG8gXiBjMV9sbyBeIGMyX2xvO1xuICBpZiAociA8IDApXG4gICAgciArPSAweDEwMDAwMDAwMDtcbiAgcmV0dXJuIHI7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG52YXIgcm90cjMyID0gdXRpbHMucm90cjMyO1xuXG5mdW5jdGlvbiBmdF8xKHMsIHgsIHksIHopIHtcbiAgaWYgKHMgPT09IDApXG4gICAgcmV0dXJuIGNoMzIoeCwgeSwgeik7XG4gIGlmIChzID09PSAxIHx8IHMgPT09IDMpXG4gICAgcmV0dXJuIHAzMih4LCB5LCB6KTtcbiAgaWYgKHMgPT09IDIpXG4gICAgcmV0dXJuIG1hajMyKHgsIHksIHopO1xufVxuZXhwb3J0cy5mdF8xID0gZnRfMTtcblxuZnVuY3Rpb24gY2gzMih4LCB5LCB6KSB7XG4gIHJldHVybiAoeCAmIHkpIF4gKCh+eCkgJiB6KTtcbn1cbmV4cG9ydHMuY2gzMiA9IGNoMzI7XG5cbmZ1bmN0aW9uIG1hajMyKHgsIHksIHopIHtcbiAgcmV0dXJuICh4ICYgeSkgXiAoeCAmIHopIF4gKHkgJiB6KTtcbn1cbmV4cG9ydHMubWFqMzIgPSBtYWozMjtcblxuZnVuY3Rpb24gcDMyKHgsIHksIHopIHtcbiAgcmV0dXJuIHggXiB5IF4gejtcbn1cbmV4cG9ydHMucDMyID0gcDMyO1xuXG5mdW5jdGlvbiBzMF8yNTYoeCkge1xuICByZXR1cm4gcm90cjMyKHgsIDIpIF4gcm90cjMyKHgsIDEzKSBeIHJvdHIzMih4LCAyMik7XG59XG5leHBvcnRzLnMwXzI1NiA9IHMwXzI1NjtcblxuZnVuY3Rpb24gczFfMjU2KHgpIHtcbiAgcmV0dXJuIHJvdHIzMih4LCA2KSBeIHJvdHIzMih4LCAxMSkgXiByb3RyMzIoeCwgMjUpO1xufVxuZXhwb3J0cy5zMV8yNTYgPSBzMV8yNTY7XG5cbmZ1bmN0aW9uIGcwXzI1Nih4KSB7XG4gIHJldHVybiByb3RyMzIoeCwgNykgXiByb3RyMzIoeCwgMTgpIF4gKHggPj4+IDMpO1xufVxuZXhwb3J0cy5nMF8yNTYgPSBnMF8yNTY7XG5cbmZ1bmN0aW9uIGcxXzI1Nih4KSB7XG4gIHJldHVybiByb3RyMzIoeCwgMTcpIF4gcm90cjMyKHgsIDE5KSBeICh4ID4+PiAxMCk7XG59XG5leHBvcnRzLmcxXzI1NiA9IGcxXzI1NjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFzc2VydCA9IHJlcXVpcmUoJ21pbmltYWxpc3RpYy1hc3NlcnQnKTtcbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG5cbmV4cG9ydHMuaW5oZXJpdHMgPSBpbmhlcml0cztcblxuZnVuY3Rpb24gaXNTdXJyb2dhdGVQYWlyKG1zZywgaSkge1xuICBpZiAoKG1zZy5jaGFyQ29kZUF0KGkpICYgMHhGQzAwKSAhPT0gMHhEODAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChpIDwgMCB8fCBpICsgMSA+PSBtc2cubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAobXNnLmNoYXJDb2RlQXQoaSArIDEpICYgMHhGQzAwKSA9PT0gMHhEQzAwO1xufVxuXG5mdW5jdGlvbiB0b0FycmF5KG1zZywgZW5jKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KG1zZykpXG4gICAgcmV0dXJuIG1zZy5zbGljZSgpO1xuICBpZiAoIW1zZylcbiAgICByZXR1cm4gW107XG4gIHZhciByZXMgPSBbXTtcbiAgaWYgKHR5cGVvZiBtc2cgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKCFlbmMpIHtcbiAgICAgIC8vIEluc3BpcmVkIGJ5IHN0cmluZ1RvVXRmOEJ5dGVBcnJheSgpIGluIGNsb3N1cmUtbGlicmFyeSBieSBHb29nbGVcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGUvY2xvc3VyZS1saWJyYXJ5L2Jsb2IvODU5OGQ4NzI0MmFmNTlhYWMyMzMyNzA3NDJjODk4NGUyYjJiZGJlMC9jbG9zdXJlL2dvb2cvY3J5cHQvY3J5cHQuanMjTDExNy1MMTQzXG4gICAgICAvLyBBcGFjaGUgTGljZW5zZSAyLjBcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGUvY2xvc3VyZS1saWJyYXJ5L2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAgICAgIHZhciBwID0gMDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbXNnLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjID0gbXNnLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIGlmIChjIDwgMTI4KSB7XG4gICAgICAgICAgcmVzW3ArK10gPSBjO1xuICAgICAgICB9IGVsc2UgaWYgKGMgPCAyMDQ4KSB7XG4gICAgICAgICAgcmVzW3ArK10gPSAoYyA+PiA2KSB8IDE5MjtcbiAgICAgICAgICByZXNbcCsrXSA9IChjICYgNjMpIHwgMTI4O1xuICAgICAgICB9IGVsc2UgaWYgKGlzU3Vycm9nYXRlUGFpcihtc2csIGkpKSB7XG4gICAgICAgICAgYyA9IDB4MTAwMDAgKyAoKGMgJiAweDAzRkYpIDw8IDEwKSArIChtc2cuY2hhckNvZGVBdCgrK2kpICYgMHgwM0ZGKTtcbiAgICAgICAgICByZXNbcCsrXSA9IChjID4+IDE4KSB8IDI0MDtcbiAgICAgICAgICByZXNbcCsrXSA9ICgoYyA+PiAxMikgJiA2MykgfCAxMjg7XG4gICAgICAgICAgcmVzW3ArK10gPSAoKGMgPj4gNikgJiA2MykgfCAxMjg7XG4gICAgICAgICAgcmVzW3ArK10gPSAoYyAmIDYzKSB8IDEyODtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNbcCsrXSA9IChjID4+IDEyKSB8IDIyNDtcbiAgICAgICAgICByZXNbcCsrXSA9ICgoYyA+PiA2KSAmIDYzKSB8IDEyODtcbiAgICAgICAgICByZXNbcCsrXSA9IChjICYgNjMpIHwgMTI4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChlbmMgPT09ICdoZXgnKSB7XG4gICAgICBtc2cgPSBtc2cucmVwbGFjZSgvW15hLXowLTldKy9pZywgJycpO1xuICAgICAgaWYgKG1zZy5sZW5ndGggJSAyICE9PSAwKVxuICAgICAgICBtc2cgPSAnMCcgKyBtc2c7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbXNnLmxlbmd0aDsgaSArPSAyKVxuICAgICAgICByZXMucHVzaChwYXJzZUludChtc2dbaV0gKyBtc2dbaSArIDFdLCAxNikpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbXNnLmxlbmd0aDsgaSsrKVxuICAgICAgcmVzW2ldID0gbXNnW2ldIHwgMDtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuZXhwb3J0cy50b0FycmF5ID0gdG9BcnJheTtcblxuZnVuY3Rpb24gdG9IZXgobXNnKSB7XG4gIHZhciByZXMgPSAnJztcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBtc2cubGVuZ3RoOyBpKyspXG4gICAgcmVzICs9IHplcm8yKG1zZ1tpXS50b1N0cmluZygxNikpO1xuICByZXR1cm4gcmVzO1xufVxuZXhwb3J0cy50b0hleCA9IHRvSGV4O1xuXG5mdW5jdGlvbiBodG9ubCh3KSB7XG4gIHZhciByZXMgPSAodyA+Pj4gMjQpIHxcbiAgICAgICAgICAgICgodyA+Pj4gOCkgJiAweGZmMDApIHxcbiAgICAgICAgICAgICgodyA8PCA4KSAmIDB4ZmYwMDAwKSB8XG4gICAgICAgICAgICAoKHcgJiAweGZmKSA8PCAyNCk7XG4gIHJldHVybiByZXMgPj4+IDA7XG59XG5leHBvcnRzLmh0b25sID0gaHRvbmw7XG5cbmZ1bmN0aW9uIHRvSGV4MzIobXNnLCBlbmRpYW4pIHtcbiAgdmFyIHJlcyA9ICcnO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG1zZy5sZW5ndGg7IGkrKykge1xuICAgIHZhciB3ID0gbXNnW2ldO1xuICAgIGlmIChlbmRpYW4gPT09ICdsaXR0bGUnKVxuICAgICAgdyA9IGh0b25sKHcpO1xuICAgIHJlcyArPSB6ZXJvOCh3LnRvU3RyaW5nKDE2KSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbmV4cG9ydHMudG9IZXgzMiA9IHRvSGV4MzI7XG5cbmZ1bmN0aW9uIHplcm8yKHdvcmQpIHtcbiAgaWYgKHdvcmQubGVuZ3RoID09PSAxKVxuICAgIHJldHVybiAnMCcgKyB3b3JkO1xuICBlbHNlXG4gICAgcmV0dXJuIHdvcmQ7XG59XG5leHBvcnRzLnplcm8yID0gemVybzI7XG5cbmZ1bmN0aW9uIHplcm84KHdvcmQpIHtcbiAgaWYgKHdvcmQubGVuZ3RoID09PSA3KVxuICAgIHJldHVybiAnMCcgKyB3b3JkO1xuICBlbHNlIGlmICh3b3JkLmxlbmd0aCA9PT0gNilcbiAgICByZXR1cm4gJzAwJyArIHdvcmQ7XG4gIGVsc2UgaWYgKHdvcmQubGVuZ3RoID09PSA1KVxuICAgIHJldHVybiAnMDAwJyArIHdvcmQ7XG4gIGVsc2UgaWYgKHdvcmQubGVuZ3RoID09PSA0KVxuICAgIHJldHVybiAnMDAwMCcgKyB3b3JkO1xuICBlbHNlIGlmICh3b3JkLmxlbmd0aCA9PT0gMylcbiAgICByZXR1cm4gJzAwMDAwJyArIHdvcmQ7XG4gIGVsc2UgaWYgKHdvcmQubGVuZ3RoID09PSAyKVxuICAgIHJldHVybiAnMDAwMDAwJyArIHdvcmQ7XG4gIGVsc2UgaWYgKHdvcmQubGVuZ3RoID09PSAxKVxuICAgIHJldHVybiAnMDAwMDAwMCcgKyB3b3JkO1xuICBlbHNlXG4gICAgcmV0dXJuIHdvcmQ7XG59XG5leHBvcnRzLnplcm84ID0gemVybzg7XG5cbmZ1bmN0aW9uIGpvaW4zMihtc2csIHN0YXJ0LCBlbmQsIGVuZGlhbikge1xuICB2YXIgbGVuID0gZW5kIC0gc3RhcnQ7XG4gIGFzc2VydChsZW4gJSA0ID09PSAwKTtcbiAgdmFyIHJlcyA9IG5ldyBBcnJheShsZW4gLyA0KTtcbiAgZm9yICh2YXIgaSA9IDAsIGsgPSBzdGFydDsgaSA8IHJlcy5sZW5ndGg7IGkrKywgayArPSA0KSB7XG4gICAgdmFyIHc7XG4gICAgaWYgKGVuZGlhbiA9PT0gJ2JpZycpXG4gICAgICB3ID0gKG1zZ1trXSA8PCAyNCkgfCAobXNnW2sgKyAxXSA8PCAxNikgfCAobXNnW2sgKyAyXSA8PCA4KSB8IG1zZ1trICsgM107XG4gICAgZWxzZVxuICAgICAgdyA9IChtc2dbayArIDNdIDw8IDI0KSB8IChtc2dbayArIDJdIDw8IDE2KSB8IChtc2dbayArIDFdIDw8IDgpIHwgbXNnW2tdO1xuICAgIHJlc1tpXSA9IHcgPj4+IDA7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbmV4cG9ydHMuam9pbjMyID0gam9pbjMyO1xuXG5mdW5jdGlvbiBzcGxpdDMyKG1zZywgZW5kaWFuKSB7XG4gIHZhciByZXMgPSBuZXcgQXJyYXkobXNnLmxlbmd0aCAqIDQpO1xuICBmb3IgKHZhciBpID0gMCwgayA9IDA7IGkgPCBtc2cubGVuZ3RoOyBpKyssIGsgKz0gNCkge1xuICAgIHZhciBtID0gbXNnW2ldO1xuICAgIGlmIChlbmRpYW4gPT09ICdiaWcnKSB7XG4gICAgICByZXNba10gPSBtID4+PiAyNDtcbiAgICAgIHJlc1trICsgMV0gPSAobSA+Pj4gMTYpICYgMHhmZjtcbiAgICAgIHJlc1trICsgMl0gPSAobSA+Pj4gOCkgJiAweGZmO1xuICAgICAgcmVzW2sgKyAzXSA9IG0gJiAweGZmO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXNbayArIDNdID0gbSA+Pj4gMjQ7XG4gICAgICByZXNbayArIDJdID0gKG0gPj4+IDE2KSAmIDB4ZmY7XG4gICAgICByZXNbayArIDFdID0gKG0gPj4+IDgpICYgMHhmZjtcbiAgICAgIHJlc1trXSA9IG0gJiAweGZmO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuZXhwb3J0cy5zcGxpdDMyID0gc3BsaXQzMjtcblxuZnVuY3Rpb24gcm90cjMyKHcsIGIpIHtcbiAgcmV0dXJuICh3ID4+PiBiKSB8ICh3IDw8ICgzMiAtIGIpKTtcbn1cbmV4cG9ydHMucm90cjMyID0gcm90cjMyO1xuXG5mdW5jdGlvbiByb3RsMzIodywgYikge1xuICByZXR1cm4gKHcgPDwgYikgfCAodyA+Pj4gKDMyIC0gYikpO1xufVxuZXhwb3J0cy5yb3RsMzIgPSByb3RsMzI7XG5cbmZ1bmN0aW9uIHN1bTMyKGEsIGIpIHtcbiAgcmV0dXJuIChhICsgYikgPj4+IDA7XG59XG5leHBvcnRzLnN1bTMyID0gc3VtMzI7XG5cbmZ1bmN0aW9uIHN1bTMyXzMoYSwgYiwgYykge1xuICByZXR1cm4gKGEgKyBiICsgYykgPj4+IDA7XG59XG5leHBvcnRzLnN1bTMyXzMgPSBzdW0zMl8zO1xuXG5mdW5jdGlvbiBzdW0zMl80KGEsIGIsIGMsIGQpIHtcbiAgcmV0dXJuIChhICsgYiArIGMgKyBkKSA+Pj4gMDtcbn1cbmV4cG9ydHMuc3VtMzJfNCA9IHN1bTMyXzQ7XG5cbmZ1bmN0aW9uIHN1bTMyXzUoYSwgYiwgYywgZCwgZSkge1xuICByZXR1cm4gKGEgKyBiICsgYyArIGQgKyBlKSA+Pj4gMDtcbn1cbmV4cG9ydHMuc3VtMzJfNSA9IHN1bTMyXzU7XG5cbmZ1bmN0aW9uIHN1bTY0KGJ1ZiwgcG9zLCBhaCwgYWwpIHtcbiAgdmFyIGJoID0gYnVmW3Bvc107XG4gIHZhciBibCA9IGJ1Zltwb3MgKyAxXTtcblxuICB2YXIgbG8gPSAoYWwgKyBibCkgPj4+IDA7XG4gIHZhciBoaSA9IChsbyA8IGFsID8gMSA6IDApICsgYWggKyBiaDtcbiAgYnVmW3Bvc10gPSBoaSA+Pj4gMDtcbiAgYnVmW3BvcyArIDFdID0gbG87XG59XG5leHBvcnRzLnN1bTY0ID0gc3VtNjQ7XG5cbmZ1bmN0aW9uIHN1bTY0X2hpKGFoLCBhbCwgYmgsIGJsKSB7XG4gIHZhciBsbyA9IChhbCArIGJsKSA+Pj4gMDtcbiAgdmFyIGhpID0gKGxvIDwgYWwgPyAxIDogMCkgKyBhaCArIGJoO1xuICByZXR1cm4gaGkgPj4+IDA7XG59XG5leHBvcnRzLnN1bTY0X2hpID0gc3VtNjRfaGk7XG5cbmZ1bmN0aW9uIHN1bTY0X2xvKGFoLCBhbCwgYmgsIGJsKSB7XG4gIHZhciBsbyA9IGFsICsgYmw7XG4gIHJldHVybiBsbyA+Pj4gMDtcbn1cbmV4cG9ydHMuc3VtNjRfbG8gPSBzdW02NF9sbztcblxuZnVuY3Rpb24gc3VtNjRfNF9oaShhaCwgYWwsIGJoLCBibCwgY2gsIGNsLCBkaCwgZGwpIHtcbiAgdmFyIGNhcnJ5ID0gMDtcbiAgdmFyIGxvID0gYWw7XG4gIGxvID0gKGxvICsgYmwpID4+PiAwO1xuICBjYXJyeSArPSBsbyA8IGFsID8gMSA6IDA7XG4gIGxvID0gKGxvICsgY2wpID4+PiAwO1xuICBjYXJyeSArPSBsbyA8IGNsID8gMSA6IDA7XG4gIGxvID0gKGxvICsgZGwpID4+PiAwO1xuICBjYXJyeSArPSBsbyA8IGRsID8gMSA6IDA7XG5cbiAgdmFyIGhpID0gYWggKyBiaCArIGNoICsgZGggKyBjYXJyeTtcbiAgcmV0dXJuIGhpID4+PiAwO1xufVxuZXhwb3J0cy5zdW02NF80X2hpID0gc3VtNjRfNF9oaTtcblxuZnVuY3Rpb24gc3VtNjRfNF9sbyhhaCwgYWwsIGJoLCBibCwgY2gsIGNsLCBkaCwgZGwpIHtcbiAgdmFyIGxvID0gYWwgKyBibCArIGNsICsgZGw7XG4gIHJldHVybiBsbyA+Pj4gMDtcbn1cbmV4cG9ydHMuc3VtNjRfNF9sbyA9IHN1bTY0XzRfbG87XG5cbmZ1bmN0aW9uIHN1bTY0XzVfaGkoYWgsIGFsLCBiaCwgYmwsIGNoLCBjbCwgZGgsIGRsLCBlaCwgZWwpIHtcbiAgdmFyIGNhcnJ5ID0gMDtcbiAgdmFyIGxvID0gYWw7XG4gIGxvID0gKGxvICsgYmwpID4+PiAwO1xuICBjYXJyeSArPSBsbyA8IGFsID8gMSA6IDA7XG4gIGxvID0gKGxvICsgY2wpID4+PiAwO1xuICBjYXJyeSArPSBsbyA8IGNsID8gMSA6IDA7XG4gIGxvID0gKGxvICsgZGwpID4+PiAwO1xuICBjYXJyeSArPSBsbyA8IGRsID8gMSA6IDA7XG4gIGxvID0gKGxvICsgZWwpID4+PiAwO1xuICBjYXJyeSArPSBsbyA8IGVsID8gMSA6IDA7XG5cbiAgdmFyIGhpID0gYWggKyBiaCArIGNoICsgZGggKyBlaCArIGNhcnJ5O1xuICByZXR1cm4gaGkgPj4+IDA7XG59XG5leHBvcnRzLnN1bTY0XzVfaGkgPSBzdW02NF81X2hpO1xuXG5mdW5jdGlvbiBzdW02NF81X2xvKGFoLCBhbCwgYmgsIGJsLCBjaCwgY2wsIGRoLCBkbCwgZWgsIGVsKSB7XG4gIHZhciBsbyA9IGFsICsgYmwgKyBjbCArIGRsICsgZWw7XG5cbiAgcmV0dXJuIGxvID4+PiAwO1xufVxuZXhwb3J0cy5zdW02NF81X2xvID0gc3VtNjRfNV9sbztcblxuZnVuY3Rpb24gcm90cjY0X2hpKGFoLCBhbCwgbnVtKSB7XG4gIHZhciByID0gKGFsIDw8ICgzMiAtIG51bSkpIHwgKGFoID4+PiBudW0pO1xuICByZXR1cm4gciA+Pj4gMDtcbn1cbmV4cG9ydHMucm90cjY0X2hpID0gcm90cjY0X2hpO1xuXG5mdW5jdGlvbiByb3RyNjRfbG8oYWgsIGFsLCBudW0pIHtcbiAgdmFyIHIgPSAoYWggPDwgKDMyIC0gbnVtKSkgfCAoYWwgPj4+IG51bSk7XG4gIHJldHVybiByID4+PiAwO1xufVxuZXhwb3J0cy5yb3RyNjRfbG8gPSByb3RyNjRfbG87XG5cbmZ1bmN0aW9uIHNocjY0X2hpKGFoLCBhbCwgbnVtKSB7XG4gIHJldHVybiBhaCA+Pj4gbnVtO1xufVxuZXhwb3J0cy5zaHI2NF9oaSA9IHNocjY0X2hpO1xuXG5mdW5jdGlvbiBzaHI2NF9sbyhhaCwgYWwsIG51bSkge1xuICB2YXIgciA9IChhaCA8PCAoMzIgLSBudW0pKSB8IChhbCA+Pj4gbnVtKTtcbiAgcmV0dXJuIHIgPj4+IDA7XG59XG5leHBvcnRzLnNocjY0X2xvID0gc2hyNjRfbG87XG4iLCJpZiAodHlwZW9mIE9iamVjdC5jcmVhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gaW1wbGVtZW50YXRpb24gZnJvbSBzdGFuZGFyZCBub2RlLmpzICd1dGlsJyBtb2R1bGVcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBpZiAoc3VwZXJDdG9yKSB7XG4gICAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgICAgY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ3Rvci5wcm90b3R5cGUsIHtcbiAgICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgICB2YWx1ZTogY3RvcixcbiAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH07XG59IGVsc2Uge1xuICAvLyBvbGQgc2Nob29sIHNoaW0gZm9yIG9sZCBicm93c2Vyc1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGlmIChzdXBlckN0b3IpIHtcbiAgICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgICB2YXIgVGVtcEN0b3IgPSBmdW5jdGlvbiAoKSB7fVxuICAgICAgVGVtcEN0b3IucHJvdG90eXBlID0gc3VwZXJDdG9yLnByb3RvdHlwZVxuICAgICAgY3Rvci5wcm90b3R5cGUgPSBuZXcgVGVtcEN0b3IoKVxuICAgICAgY3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjdG9yXG4gICAgfVxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGFzc2VydDtcblxuZnVuY3Rpb24gYXNzZXJ0KHZhbCwgbXNnKSB7XG4gIGlmICghdmFsKVxuICAgIHRocm93IG5ldyBFcnJvcihtc2cgfHwgJ0Fzc2VydGlvbiBmYWlsZWQnKTtcbn1cblxuYXNzZXJ0LmVxdWFsID0gZnVuY3Rpb24gYXNzZXJ0RXF1YWwobCwgciwgbXNnKSB7XG4gIGlmIChsICE9IHIpXG4gICAgdGhyb3cgbmV3IEVycm9yKG1zZyB8fCAoJ0Fzc2VydGlvbiBmYWlsZWQ6ICcgKyBsICsgJyAhPSAnICsgcikpO1xufTtcbiIsIi8vIFRvcCBsZXZlbCBmaWxlIGlzIGp1c3QgYSBtaXhpbiBvZiBzdWJtb2R1bGVzICYgY29uc3RhbnRzXG4ndXNlIHN0cmljdCc7XG5cbnZhciBhc3NpZ24gICAgPSByZXF1aXJlKCcuL2xpYi91dGlscy9jb21tb24nKS5hc3NpZ247XG5cbnZhciBkZWZsYXRlICAgPSByZXF1aXJlKCcuL2xpYi9kZWZsYXRlJyk7XG52YXIgaW5mbGF0ZSAgID0gcmVxdWlyZSgnLi9saWIvaW5mbGF0ZScpO1xudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4vbGliL3psaWIvY29uc3RhbnRzJyk7XG5cbnZhciBwYWtvID0ge307XG5cbmFzc2lnbihwYWtvLCBkZWZsYXRlLCBpbmZsYXRlLCBjb25zdGFudHMpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBha287XG4iLCIndXNlIHN0cmljdCc7XG5cblxudmFyIHpsaWJfZGVmbGF0ZSA9IHJlcXVpcmUoJy4vemxpYi9kZWZsYXRlJyk7XG52YXIgdXRpbHMgICAgICAgID0gcmVxdWlyZSgnLi91dGlscy9jb21tb24nKTtcbnZhciBzdHJpbmdzICAgICAgPSByZXF1aXJlKCcuL3V0aWxzL3N0cmluZ3MnKTtcbnZhciBtc2cgICAgICAgICAgPSByZXF1aXJlKCcuL3psaWIvbWVzc2FnZXMnKTtcbnZhciBaU3RyZWFtICAgICAgPSByZXF1aXJlKCcuL3psaWIvenN0cmVhbScpO1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKiBQdWJsaWMgY29uc3RhbnRzID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cblxudmFyIFpfTk9fRkxVU0ggICAgICA9IDA7XG52YXIgWl9GSU5JU0ggICAgICAgID0gNDtcblxudmFyIFpfT0sgICAgICAgICAgICA9IDA7XG52YXIgWl9TVFJFQU1fRU5EICAgID0gMTtcbnZhciBaX1NZTkNfRkxVU0ggICAgPSAyO1xuXG52YXIgWl9ERUZBVUxUX0NPTVBSRVNTSU9OID0gLTE7XG5cbnZhciBaX0RFRkFVTFRfU1RSQVRFR1kgICAgPSAwO1xuXG52YXIgWl9ERUZMQVRFRCAgPSA4O1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuXG5cbi8qKlxuICogY2xhc3MgRGVmbGF0ZVxuICpcbiAqIEdlbmVyaWMgSlMtc3R5bGUgd3JhcHBlciBmb3IgemxpYiBjYWxscy4gSWYgeW91IGRvbid0IG5lZWRcbiAqIHN0cmVhbWluZyBiZWhhdmlvdXIgLSB1c2UgbW9yZSBzaW1wbGUgZnVuY3Rpb25zOiBbW2RlZmxhdGVdXSxcbiAqIFtbZGVmbGF0ZVJhd11dIGFuZCBbW2d6aXBdXS5cbiAqKi9cblxuLyogaW50ZXJuYWxcbiAqIERlZmxhdGUuY2h1bmtzIC0+IEFycmF5XG4gKlxuICogQ2h1bmtzIG9mIG91dHB1dCBkYXRhLCBpZiBbW0RlZmxhdGUjb25EYXRhXV0gbm90IG92ZXJyaWRkZW4uXG4gKiovXG5cbi8qKlxuICogRGVmbGF0ZS5yZXN1bHQgLT4gVWludDhBcnJheXxBcnJheVxuICpcbiAqIENvbXByZXNzZWQgcmVzdWx0LCBnZW5lcmF0ZWQgYnkgZGVmYXVsdCBbW0RlZmxhdGUjb25EYXRhXV1cbiAqIGFuZCBbW0RlZmxhdGUjb25FbmRdXSBoYW5kbGVycy4gRmlsbGVkIGFmdGVyIHlvdSBwdXNoIGxhc3QgY2h1bmtcbiAqIChjYWxsIFtbRGVmbGF0ZSNwdXNoXV0gd2l0aCBgWl9GSU5JU0hgIC8gYHRydWVgIHBhcmFtKSAgb3IgaWYgeW91XG4gKiBwdXNoIGEgY2h1bmsgd2l0aCBleHBsaWNpdCBmbHVzaCAoY2FsbCBbW0RlZmxhdGUjcHVzaF1dIHdpdGhcbiAqIGBaX1NZTkNfRkxVU0hgIHBhcmFtKS5cbiAqKi9cblxuLyoqXG4gKiBEZWZsYXRlLmVyciAtPiBOdW1iZXJcbiAqXG4gKiBFcnJvciBjb2RlIGFmdGVyIGRlZmxhdGUgZmluaXNoZWQuIDAgKFpfT0spIG9uIHN1Y2Nlc3MuXG4gKiBZb3Ugd2lsbCBub3QgbmVlZCBpdCBpbiByZWFsIGxpZmUsIGJlY2F1c2UgZGVmbGF0ZSBlcnJvcnNcbiAqIGFyZSBwb3NzaWJsZSBvbmx5IG9uIHdyb25nIG9wdGlvbnMgb3IgYmFkIGBvbkRhdGFgIC8gYG9uRW5kYFxuICogY3VzdG9tIGhhbmRsZXJzLlxuICoqL1xuXG4vKipcbiAqIERlZmxhdGUubXNnIC0+IFN0cmluZ1xuICpcbiAqIEVycm9yIG1lc3NhZ2UsIGlmIFtbRGVmbGF0ZS5lcnJdXSAhPSAwXG4gKiovXG5cblxuLyoqXG4gKiBuZXcgRGVmbGF0ZShvcHRpb25zKVxuICogLSBvcHRpb25zIChPYmplY3QpOiB6bGliIGRlZmxhdGUgb3B0aW9ucy5cbiAqXG4gKiBDcmVhdGVzIG5ldyBkZWZsYXRvciBpbnN0YW5jZSB3aXRoIHNwZWNpZmllZCBwYXJhbXMuIFRocm93cyBleGNlcHRpb25cbiAqIG9uIGJhZCBwYXJhbXMuIFN1cHBvcnRlZCBvcHRpb25zOlxuICpcbiAqIC0gYGxldmVsYFxuICogLSBgd2luZG93Qml0c2BcbiAqIC0gYG1lbUxldmVsYFxuICogLSBgc3RyYXRlZ3lgXG4gKiAtIGBkaWN0aW9uYXJ5YFxuICpcbiAqIFtodHRwOi8vemxpYi5uZXQvbWFudWFsLmh0bWwjQWR2YW5jZWRdKGh0dHA6Ly96bGliLm5ldC9tYW51YWwuaHRtbCNBZHZhbmNlZClcbiAqIGZvciBtb3JlIGluZm9ybWF0aW9uIG9uIHRoZXNlLlxuICpcbiAqIEFkZGl0aW9uYWwgb3B0aW9ucywgZm9yIGludGVybmFsIG5lZWRzOlxuICpcbiAqIC0gYGNodW5rU2l6ZWAgLSBzaXplIG9mIGdlbmVyYXRlZCBkYXRhIGNodW5rcyAoMTZLIGJ5IGRlZmF1bHQpXG4gKiAtIGByYXdgIChCb29sZWFuKSAtIGRvIHJhdyBkZWZsYXRlXG4gKiAtIGBnemlwYCAoQm9vbGVhbikgLSBjcmVhdGUgZ3ppcCB3cmFwcGVyXG4gKiAtIGB0b2AgKFN0cmluZykgLSBpZiBlcXVhbCB0byAnc3RyaW5nJywgdGhlbiByZXN1bHQgd2lsbCBiZSBcImJpbmFyeSBzdHJpbmdcIlxuICogICAgKGVhY2ggY2hhciBjb2RlIFswLi4yNTVdKVxuICogLSBgaGVhZGVyYCAoT2JqZWN0KSAtIGN1c3RvbSBoZWFkZXIgZm9yIGd6aXBcbiAqICAgLSBgdGV4dGAgKEJvb2xlYW4pIC0gdHJ1ZSBpZiBjb21wcmVzc2VkIGRhdGEgYmVsaWV2ZWQgdG8gYmUgdGV4dFxuICogICAtIGB0aW1lYCAoTnVtYmVyKSAtIG1vZGlmaWNhdGlvbiB0aW1lLCB1bml4IHRpbWVzdGFtcFxuICogICAtIGBvc2AgKE51bWJlcikgLSBvcGVyYXRpb24gc3lzdGVtIGNvZGVcbiAqICAgLSBgZXh0cmFgIChBcnJheSkgLSBhcnJheSBvZiBieXRlcyB3aXRoIGV4dHJhIGRhdGEgKG1heCA2NTUzNilcbiAqICAgLSBgbmFtZWAgKFN0cmluZykgLSBmaWxlIG5hbWUgKGJpbmFyeSBzdHJpbmcpXG4gKiAgIC0gYGNvbW1lbnRgIChTdHJpbmcpIC0gY29tbWVudCAoYmluYXJ5IHN0cmluZylcbiAqICAgLSBgaGNyY2AgKEJvb2xlYW4pIC0gdHJ1ZSBpZiBoZWFkZXIgY3JjIHNob3VsZCBiZSBhZGRlZFxuICpcbiAqICMjIyMjIEV4YW1wbGU6XG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogdmFyIHBha28gPSByZXF1aXJlKCdwYWtvJylcbiAqICAgLCBjaHVuazEgPSBVaW50OEFycmF5KFsxLDIsMyw0LDUsNiw3LDgsOV0pXG4gKiAgICwgY2h1bmsyID0gVWludDhBcnJheShbMTAsMTEsMTIsMTMsMTQsMTUsMTYsMTcsMTgsMTldKTtcbiAqXG4gKiB2YXIgZGVmbGF0ZSA9IG5ldyBwYWtvLkRlZmxhdGUoeyBsZXZlbDogM30pO1xuICpcbiAqIGRlZmxhdGUucHVzaChjaHVuazEsIGZhbHNlKTtcbiAqIGRlZmxhdGUucHVzaChjaHVuazIsIHRydWUpOyAgLy8gdHJ1ZSAtPiBsYXN0IGNodW5rXG4gKlxuICogaWYgKGRlZmxhdGUuZXJyKSB7IHRocm93IG5ldyBFcnJvcihkZWZsYXRlLmVycik7IH1cbiAqXG4gKiBjb25zb2xlLmxvZyhkZWZsYXRlLnJlc3VsdCk7XG4gKiBgYGBcbiAqKi9cbmZ1bmN0aW9uIERlZmxhdGUob3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRGVmbGF0ZSkpIHJldHVybiBuZXcgRGVmbGF0ZShvcHRpb25zKTtcblxuICB0aGlzLm9wdGlvbnMgPSB1dGlscy5hc3NpZ24oe1xuICAgIGxldmVsOiBaX0RFRkFVTFRfQ09NUFJFU1NJT04sXG4gICAgbWV0aG9kOiBaX0RFRkxBVEVELFxuICAgIGNodW5rU2l6ZTogMTYzODQsXG4gICAgd2luZG93Qml0czogMTUsXG4gICAgbWVtTGV2ZWw6IDgsXG4gICAgc3RyYXRlZ3k6IFpfREVGQVVMVF9TVFJBVEVHWSxcbiAgICB0bzogJydcbiAgfSwgb3B0aW9ucyB8fCB7fSk7XG5cbiAgdmFyIG9wdCA9IHRoaXMub3B0aW9ucztcblxuICBpZiAob3B0LnJhdyAmJiAob3B0LndpbmRvd0JpdHMgPiAwKSkge1xuICAgIG9wdC53aW5kb3dCaXRzID0gLW9wdC53aW5kb3dCaXRzO1xuICB9XG5cbiAgZWxzZSBpZiAob3B0Lmd6aXAgJiYgKG9wdC53aW5kb3dCaXRzID4gMCkgJiYgKG9wdC53aW5kb3dCaXRzIDwgMTYpKSB7XG4gICAgb3B0LndpbmRvd0JpdHMgKz0gMTY7XG4gIH1cblxuICB0aGlzLmVyciAgICA9IDA7ICAgICAgLy8gZXJyb3IgY29kZSwgaWYgaGFwcGVucyAoMCA9IFpfT0spXG4gIHRoaXMubXNnICAgID0gJyc7ICAgICAvLyBlcnJvciBtZXNzYWdlXG4gIHRoaXMuZW5kZWQgID0gZmFsc2U7ICAvLyB1c2VkIHRvIGF2b2lkIG11bHRpcGxlIG9uRW5kKCkgY2FsbHNcbiAgdGhpcy5jaHVua3MgPSBbXTsgICAgIC8vIGNodW5rcyBvZiBjb21wcmVzc2VkIGRhdGFcblxuICB0aGlzLnN0cm0gPSBuZXcgWlN0cmVhbSgpO1xuICB0aGlzLnN0cm0uYXZhaWxfb3V0ID0gMDtcblxuICB2YXIgc3RhdHVzID0gemxpYl9kZWZsYXRlLmRlZmxhdGVJbml0MihcbiAgICB0aGlzLnN0cm0sXG4gICAgb3B0LmxldmVsLFxuICAgIG9wdC5tZXRob2QsXG4gICAgb3B0LndpbmRvd0JpdHMsXG4gICAgb3B0Lm1lbUxldmVsLFxuICAgIG9wdC5zdHJhdGVneVxuICApO1xuXG4gIGlmIChzdGF0dXMgIT09IFpfT0spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobXNnW3N0YXR1c10pO1xuICB9XG5cbiAgaWYgKG9wdC5oZWFkZXIpIHtcbiAgICB6bGliX2RlZmxhdGUuZGVmbGF0ZVNldEhlYWRlcih0aGlzLnN0cm0sIG9wdC5oZWFkZXIpO1xuICB9XG5cbiAgaWYgKG9wdC5kaWN0aW9uYXJ5KSB7XG4gICAgdmFyIGRpY3Q7XG4gICAgLy8gQ29udmVydCBkYXRhIGlmIG5lZWRlZFxuICAgIGlmICh0eXBlb2Ygb3B0LmRpY3Rpb25hcnkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBJZiB3ZSBuZWVkIHRvIGNvbXByZXNzIHRleHQsIGNoYW5nZSBlbmNvZGluZyB0byB1dGY4LlxuICAgICAgZGljdCA9IHN0cmluZ3Muc3RyaW5nMmJ1ZihvcHQuZGljdGlvbmFyeSk7XG4gICAgfSBlbHNlIGlmICh0b1N0cmluZy5jYWxsKG9wdC5kaWN0aW9uYXJ5KSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJykge1xuICAgICAgZGljdCA9IG5ldyBVaW50OEFycmF5KG9wdC5kaWN0aW9uYXJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGljdCA9IG9wdC5kaWN0aW9uYXJ5O1xuICAgIH1cblxuICAgIHN0YXR1cyA9IHpsaWJfZGVmbGF0ZS5kZWZsYXRlU2V0RGljdGlvbmFyeSh0aGlzLnN0cm0sIGRpY3QpO1xuXG4gICAgaWYgKHN0YXR1cyAhPT0gWl9PSykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZ1tzdGF0dXNdKTtcbiAgICB9XG5cbiAgICB0aGlzLl9kaWN0X3NldCA9IHRydWU7XG4gIH1cbn1cblxuLyoqXG4gKiBEZWZsYXRlI3B1c2goZGF0YVssIG1vZGVdKSAtPiBCb29sZWFuXG4gKiAtIGRhdGEgKFVpbnQ4QXJyYXl8QXJyYXl8QXJyYXlCdWZmZXJ8U3RyaW5nKTogaW5wdXQgZGF0YS4gU3RyaW5ncyB3aWxsIGJlXG4gKiAgIGNvbnZlcnRlZCB0byB1dGY4IGJ5dGUgc2VxdWVuY2UuXG4gKiAtIG1vZGUgKE51bWJlcnxCb29sZWFuKTogMC4uNiBmb3IgY29ycmVzcG9uZGluZyBaX05PX0ZMVVNILi5aX1RSRUUgbW9kZXMuXG4gKiAgIFNlZSBjb25zdGFudHMuIFNraXBwZWQgb3IgYGZhbHNlYCBtZWFucyBaX05PX0ZMVVNILCBgdHJ1ZWAgbWVhbnMgWl9GSU5JU0guXG4gKlxuICogU2VuZHMgaW5wdXQgZGF0YSB0byBkZWZsYXRlIHBpcGUsIGdlbmVyYXRpbmcgW1tEZWZsYXRlI29uRGF0YV1dIGNhbGxzIHdpdGhcbiAqIG5ldyBjb21wcmVzc2VkIGNodW5rcy4gUmV0dXJucyBgdHJ1ZWAgb24gc3VjY2Vzcy4gVGhlIGxhc3QgZGF0YSBibG9jayBtdXN0IGhhdmVcbiAqIG1vZGUgWl9GSU5JU0ggKG9yIGB0cnVlYCkuIFRoYXQgd2lsbCBmbHVzaCBpbnRlcm5hbCBwZW5kaW5nIGJ1ZmZlcnMgYW5kIGNhbGxcbiAqIFtbRGVmbGF0ZSNvbkVuZF1dLiBGb3IgaW50ZXJpbSBleHBsaWNpdCBmbHVzaGVzICh3aXRob3V0IGVuZGluZyB0aGUgc3RyZWFtKSB5b3VcbiAqIGNhbiB1c2UgbW9kZSBaX1NZTkNfRkxVU0gsIGtlZXBpbmcgdGhlIGNvbXByZXNzaW9uIGNvbnRleHQuXG4gKlxuICogT24gZmFpbCBjYWxsIFtbRGVmbGF0ZSNvbkVuZF1dIHdpdGggZXJyb3IgY29kZSBhbmQgcmV0dXJuIGZhbHNlLlxuICpcbiAqIFdlIHN0cm9uZ2x5IHJlY29tbWVuZCB0byB1c2UgYFVpbnQ4QXJyYXlgIG9uIGlucHV0IGZvciBiZXN0IHNwZWVkIChvdXRwdXRcbiAqIGFycmF5IGZvcm1hdCBpcyBkZXRlY3RlZCBhdXRvbWF0aWNhbGx5KS4gQWxzbywgZG9uJ3Qgc2tpcCBsYXN0IHBhcmFtIGFuZCBhbHdheXNcbiAqIHVzZSB0aGUgc2FtZSB0eXBlIGluIHlvdXIgY29kZSAoYm9vbGVhbiBvciBudW1iZXIpLiBUaGF0IHdpbGwgaW1wcm92ZSBKUyBzcGVlZC5cbiAqXG4gKiBGb3IgcmVndWxhciBgQXJyYXlgLXMgbWFrZSBzdXJlIGFsbCBlbGVtZW50cyBhcmUgWzAuLjI1NV0uXG4gKlxuICogIyMjIyMgRXhhbXBsZVxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIHB1c2goY2h1bmssIGZhbHNlKTsgLy8gcHVzaCBvbmUgb2YgZGF0YSBjaHVua3NcbiAqIC4uLlxuICogcHVzaChjaHVuaywgdHJ1ZSk7ICAvLyBwdXNoIGxhc3QgY2h1bmtcbiAqIGBgYFxuICoqL1xuRGVmbGF0ZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChkYXRhLCBtb2RlKSB7XG4gIHZhciBzdHJtID0gdGhpcy5zdHJtO1xuICB2YXIgY2h1bmtTaXplID0gdGhpcy5vcHRpb25zLmNodW5rU2l6ZTtcbiAgdmFyIHN0YXR1cywgX21vZGU7XG5cbiAgaWYgKHRoaXMuZW5kZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgX21vZGUgPSAobW9kZSA9PT0gfn5tb2RlKSA/IG1vZGUgOiAoKG1vZGUgPT09IHRydWUpID8gWl9GSU5JU0ggOiBaX05PX0ZMVVNIKTtcblxuICAvLyBDb252ZXJ0IGRhdGEgaWYgbmVlZGVkXG4gIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAvLyBJZiB3ZSBuZWVkIHRvIGNvbXByZXNzIHRleHQsIGNoYW5nZSBlbmNvZGluZyB0byB1dGY4LlxuICAgIHN0cm0uaW5wdXQgPSBzdHJpbmdzLnN0cmluZzJidWYoZGF0YSk7XG4gIH0gZWxzZSBpZiAodG9TdHJpbmcuY2FsbChkYXRhKSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJykge1xuICAgIHN0cm0uaW5wdXQgPSBuZXcgVWludDhBcnJheShkYXRhKTtcbiAgfSBlbHNlIHtcbiAgICBzdHJtLmlucHV0ID0gZGF0YTtcbiAgfVxuXG4gIHN0cm0ubmV4dF9pbiA9IDA7XG4gIHN0cm0uYXZhaWxfaW4gPSBzdHJtLmlucHV0Lmxlbmd0aDtcblxuICBkbyB7XG4gICAgaWYgKHN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICBzdHJtLm91dHB1dCA9IG5ldyB1dGlscy5CdWY4KGNodW5rU2l6ZSk7XG4gICAgICBzdHJtLm5leHRfb3V0ID0gMDtcbiAgICAgIHN0cm0uYXZhaWxfb3V0ID0gY2h1bmtTaXplO1xuICAgIH1cbiAgICBzdGF0dXMgPSB6bGliX2RlZmxhdGUuZGVmbGF0ZShzdHJtLCBfbW9kZSk7ICAgIC8qIG5vIGJhZCByZXR1cm4gdmFsdWUgKi9cblxuICAgIGlmIChzdGF0dXMgIT09IFpfU1RSRUFNX0VORCAmJiBzdGF0dXMgIT09IFpfT0spIHtcbiAgICAgIHRoaXMub25FbmQoc3RhdHVzKTtcbiAgICAgIHRoaXMuZW5kZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoc3RybS5hdmFpbF9vdXQgPT09IDAgfHwgKHN0cm0uYXZhaWxfaW4gPT09IDAgJiYgKF9tb2RlID09PSBaX0ZJTklTSCB8fCBfbW9kZSA9PT0gWl9TWU5DX0ZMVVNIKSkpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMudG8gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRoaXMub25EYXRhKHN0cmluZ3MuYnVmMmJpbnN0cmluZyh1dGlscy5zaHJpbmtCdWYoc3RybS5vdXRwdXQsIHN0cm0ubmV4dF9vdXQpKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9uRGF0YSh1dGlscy5zaHJpbmtCdWYoc3RybS5vdXRwdXQsIHN0cm0ubmV4dF9vdXQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gd2hpbGUgKChzdHJtLmF2YWlsX2luID4gMCB8fCBzdHJtLmF2YWlsX291dCA9PT0gMCkgJiYgc3RhdHVzICE9PSBaX1NUUkVBTV9FTkQpO1xuXG4gIC8vIEZpbmFsaXplIG9uIHRoZSBsYXN0IGNodW5rLlxuICBpZiAoX21vZGUgPT09IFpfRklOSVNIKSB7XG4gICAgc3RhdHVzID0gemxpYl9kZWZsYXRlLmRlZmxhdGVFbmQodGhpcy5zdHJtKTtcbiAgICB0aGlzLm9uRW5kKHN0YXR1cyk7XG4gICAgdGhpcy5lbmRlZCA9IHRydWU7XG4gICAgcmV0dXJuIHN0YXR1cyA9PT0gWl9PSztcbiAgfVxuXG4gIC8vIGNhbGxiYWNrIGludGVyaW0gcmVzdWx0cyBpZiBaX1NZTkNfRkxVU0guXG4gIGlmIChfbW9kZSA9PT0gWl9TWU5DX0ZMVVNIKSB7XG4gICAgdGhpcy5vbkVuZChaX09LKTtcbiAgICBzdHJtLmF2YWlsX291dCA9IDA7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cblxuLyoqXG4gKiBEZWZsYXRlI29uRGF0YShjaHVuaykgLT4gVm9pZFxuICogLSBjaHVuayAoVWludDhBcnJheXxBcnJheXxTdHJpbmcpOiBvdXRwdXQgZGF0YS4gVHlwZSBvZiBhcnJheSBkZXBlbmRzXG4gKiAgIG9uIGpzIGVuZ2luZSBzdXBwb3J0LiBXaGVuIHN0cmluZyBvdXRwdXQgcmVxdWVzdGVkLCBlYWNoIGNodW5rXG4gKiAgIHdpbGwgYmUgc3RyaW5nLlxuICpcbiAqIEJ5IGRlZmF1bHQsIHN0b3JlcyBkYXRhIGJsb2NrcyBpbiBgY2h1bmtzW11gIHByb3BlcnR5IGFuZCBnbHVlXG4gKiB0aG9zZSBpbiBgb25FbmRgLiBPdmVycmlkZSB0aGlzIGhhbmRsZXIsIGlmIHlvdSBuZWVkIGFub3RoZXIgYmVoYXZpb3VyLlxuICoqL1xuRGVmbGF0ZS5wcm90b3R5cGUub25EYXRhID0gZnVuY3Rpb24gKGNodW5rKSB7XG4gIHRoaXMuY2h1bmtzLnB1c2goY2h1bmspO1xufTtcblxuXG4vKipcbiAqIERlZmxhdGUjb25FbmQoc3RhdHVzKSAtPiBWb2lkXG4gKiAtIHN0YXR1cyAoTnVtYmVyKTogZGVmbGF0ZSBzdGF0dXMuIDAgKFpfT0spIG9uIHN1Y2Nlc3MsXG4gKiAgIG90aGVyIGlmIG5vdC5cbiAqXG4gKiBDYWxsZWQgb25jZSBhZnRlciB5b3UgdGVsbCBkZWZsYXRlIHRoYXQgdGhlIGlucHV0IHN0cmVhbSBpc1xuICogY29tcGxldGUgKFpfRklOSVNIKSBvciBzaG91bGQgYmUgZmx1c2hlZCAoWl9TWU5DX0ZMVVNIKVxuICogb3IgaWYgYW4gZXJyb3IgaGFwcGVuZWQuIEJ5IGRlZmF1bHQgLSBqb2luIGNvbGxlY3RlZCBjaHVua3MsXG4gKiBmcmVlIG1lbW9yeSBhbmQgZmlsbCBgcmVzdWx0c2AgLyBgZXJyYCBwcm9wZXJ0aWVzLlxuICoqL1xuRGVmbGF0ZS5wcm90b3R5cGUub25FbmQgPSBmdW5jdGlvbiAoc3RhdHVzKSB7XG4gIC8vIE9uIHN1Y2Nlc3MgLSBqb2luXG4gIGlmIChzdGF0dXMgPT09IFpfT0spIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLnRvID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5yZXN1bHQgPSB0aGlzLmNodW5rcy5qb2luKCcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZXN1bHQgPSB1dGlscy5mbGF0dGVuQ2h1bmtzKHRoaXMuY2h1bmtzKTtcbiAgICB9XG4gIH1cbiAgdGhpcy5jaHVua3MgPSBbXTtcbiAgdGhpcy5lcnIgPSBzdGF0dXM7XG4gIHRoaXMubXNnID0gdGhpcy5zdHJtLm1zZztcbn07XG5cblxuLyoqXG4gKiBkZWZsYXRlKGRhdGFbLCBvcHRpb25zXSkgLT4gVWludDhBcnJheXxBcnJheXxTdHJpbmdcbiAqIC0gZGF0YSAoVWludDhBcnJheXxBcnJheXxTdHJpbmcpOiBpbnB1dCBkYXRhIHRvIGNvbXByZXNzLlxuICogLSBvcHRpb25zIChPYmplY3QpOiB6bGliIGRlZmxhdGUgb3B0aW9ucy5cbiAqXG4gKiBDb21wcmVzcyBgZGF0YWAgd2l0aCBkZWZsYXRlIGFsZ29yaXRobSBhbmQgYG9wdGlvbnNgLlxuICpcbiAqIFN1cHBvcnRlZCBvcHRpb25zIGFyZTpcbiAqXG4gKiAtIGxldmVsXG4gKiAtIHdpbmRvd0JpdHNcbiAqIC0gbWVtTGV2ZWxcbiAqIC0gc3RyYXRlZ3lcbiAqIC0gZGljdGlvbmFyeVxuICpcbiAqIFtodHRwOi8vemxpYi5uZXQvbWFudWFsLmh0bWwjQWR2YW5jZWRdKGh0dHA6Ly96bGliLm5ldC9tYW51YWwuaHRtbCNBZHZhbmNlZClcbiAqIGZvciBtb3JlIGluZm9ybWF0aW9uIG9uIHRoZXNlLlxuICpcbiAqIFN1Z2FyIChvcHRpb25zKTpcbiAqXG4gKiAtIGByYXdgIChCb29sZWFuKSAtIHNheSB0aGF0IHdlIHdvcmsgd2l0aCByYXcgc3RyZWFtLCBpZiB5b3UgZG9uJ3Qgd2lzaCB0byBzcGVjaWZ5XG4gKiAgIG5lZ2F0aXZlIHdpbmRvd0JpdHMgaW1wbGljaXRseS5cbiAqIC0gYHRvYCAoU3RyaW5nKSAtIGlmIGVxdWFsIHRvICdzdHJpbmcnLCB0aGVuIHJlc3VsdCB3aWxsIGJlIFwiYmluYXJ5IHN0cmluZ1wiXG4gKiAgICAoZWFjaCBjaGFyIGNvZGUgWzAuLjI1NV0pXG4gKlxuICogIyMjIyMgRXhhbXBsZTpcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiB2YXIgcGFrbyA9IHJlcXVpcmUoJ3Bha28nKVxuICogICAsIGRhdGEgPSBVaW50OEFycmF5KFsxLDIsMyw0LDUsNiw3LDgsOV0pO1xuICpcbiAqIGNvbnNvbGUubG9nKHBha28uZGVmbGF0ZShkYXRhKSk7XG4gKiBgYGBcbiAqKi9cbmZ1bmN0aW9uIGRlZmxhdGUoaW5wdXQsIG9wdGlvbnMpIHtcbiAgdmFyIGRlZmxhdG9yID0gbmV3IERlZmxhdGUob3B0aW9ucyk7XG5cbiAgZGVmbGF0b3IucHVzaChpbnB1dCwgdHJ1ZSk7XG5cbiAgLy8gVGhhdCB3aWxsIG5ldmVyIGhhcHBlbnMsIGlmIHlvdSBkb24ndCBjaGVhdCB3aXRoIG9wdGlvbnMgOilcbiAgaWYgKGRlZmxhdG9yLmVycikgeyB0aHJvdyBkZWZsYXRvci5tc2cgfHwgbXNnW2RlZmxhdG9yLmVycl07IH1cblxuICByZXR1cm4gZGVmbGF0b3IucmVzdWx0O1xufVxuXG5cbi8qKlxuICogZGVmbGF0ZVJhdyhkYXRhWywgb3B0aW9uc10pIC0+IFVpbnQ4QXJyYXl8QXJyYXl8U3RyaW5nXG4gKiAtIGRhdGEgKFVpbnQ4QXJyYXl8QXJyYXl8U3RyaW5nKTogaW5wdXQgZGF0YSB0byBjb21wcmVzcy5cbiAqIC0gb3B0aW9ucyAoT2JqZWN0KTogemxpYiBkZWZsYXRlIG9wdGlvbnMuXG4gKlxuICogVGhlIHNhbWUgYXMgW1tkZWZsYXRlXV0sIGJ1dCBjcmVhdGVzIHJhdyBkYXRhLCB3aXRob3V0IHdyYXBwZXJcbiAqIChoZWFkZXIgYW5kIGFkbGVyMzIgY3JjKS5cbiAqKi9cbmZ1bmN0aW9uIGRlZmxhdGVSYXcoaW5wdXQsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIG9wdGlvbnMucmF3ID0gdHJ1ZTtcbiAgcmV0dXJuIGRlZmxhdGUoaW5wdXQsIG9wdGlvbnMpO1xufVxuXG5cbi8qKlxuICogZ3ppcChkYXRhWywgb3B0aW9uc10pIC0+IFVpbnQ4QXJyYXl8QXJyYXl8U3RyaW5nXG4gKiAtIGRhdGEgKFVpbnQ4QXJyYXl8QXJyYXl8U3RyaW5nKTogaW5wdXQgZGF0YSB0byBjb21wcmVzcy5cbiAqIC0gb3B0aW9ucyAoT2JqZWN0KTogemxpYiBkZWZsYXRlIG9wdGlvbnMuXG4gKlxuICogVGhlIHNhbWUgYXMgW1tkZWZsYXRlXV0sIGJ1dCBjcmVhdGUgZ3ppcCB3cmFwcGVyIGluc3RlYWQgb2ZcbiAqIGRlZmxhdGUgb25lLlxuICoqL1xuZnVuY3Rpb24gZ3ppcChpbnB1dCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgb3B0aW9ucy5nemlwID0gdHJ1ZTtcbiAgcmV0dXJuIGRlZmxhdGUoaW5wdXQsIG9wdGlvbnMpO1xufVxuXG5cbmV4cG9ydHMuRGVmbGF0ZSA9IERlZmxhdGU7XG5leHBvcnRzLmRlZmxhdGUgPSBkZWZsYXRlO1xuZXhwb3J0cy5kZWZsYXRlUmF3ID0gZGVmbGF0ZVJhdztcbmV4cG9ydHMuZ3ppcCA9IGd6aXA7XG4iLCIndXNlIHN0cmljdCc7XG5cblxudmFyIHpsaWJfaW5mbGF0ZSA9IHJlcXVpcmUoJy4vemxpYi9pbmZsYXRlJyk7XG52YXIgdXRpbHMgICAgICAgID0gcmVxdWlyZSgnLi91dGlscy9jb21tb24nKTtcbnZhciBzdHJpbmdzICAgICAgPSByZXF1aXJlKCcuL3V0aWxzL3N0cmluZ3MnKTtcbnZhciBjICAgICAgICAgICAgPSByZXF1aXJlKCcuL3psaWIvY29uc3RhbnRzJyk7XG52YXIgbXNnICAgICAgICAgID0gcmVxdWlyZSgnLi96bGliL21lc3NhZ2VzJyk7XG52YXIgWlN0cmVhbSAgICAgID0gcmVxdWlyZSgnLi96bGliL3pzdHJlYW0nKTtcbnZhciBHWmhlYWRlciAgICAgPSByZXF1aXJlKCcuL3psaWIvZ3poZWFkZXInKTtcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBjbGFzcyBJbmZsYXRlXG4gKlxuICogR2VuZXJpYyBKUy1zdHlsZSB3cmFwcGVyIGZvciB6bGliIGNhbGxzLiBJZiB5b3UgZG9uJ3QgbmVlZFxuICogc3RyZWFtaW5nIGJlaGF2aW91ciAtIHVzZSBtb3JlIHNpbXBsZSBmdW5jdGlvbnM6IFtbaW5mbGF0ZV1dXG4gKiBhbmQgW1tpbmZsYXRlUmF3XV0uXG4gKiovXG5cbi8qIGludGVybmFsXG4gKiBpbmZsYXRlLmNodW5rcyAtPiBBcnJheVxuICpcbiAqIENodW5rcyBvZiBvdXRwdXQgZGF0YSwgaWYgW1tJbmZsYXRlI29uRGF0YV1dIG5vdCBvdmVycmlkZGVuLlxuICoqL1xuXG4vKipcbiAqIEluZmxhdGUucmVzdWx0IC0+IFVpbnQ4QXJyYXl8QXJyYXl8U3RyaW5nXG4gKlxuICogVW5jb21wcmVzc2VkIHJlc3VsdCwgZ2VuZXJhdGVkIGJ5IGRlZmF1bHQgW1tJbmZsYXRlI29uRGF0YV1dXG4gKiBhbmQgW1tJbmZsYXRlI29uRW5kXV0gaGFuZGxlcnMuIEZpbGxlZCBhZnRlciB5b3UgcHVzaCBsYXN0IGNodW5rXG4gKiAoY2FsbCBbW0luZmxhdGUjcHVzaF1dIHdpdGggYFpfRklOSVNIYCAvIGB0cnVlYCBwYXJhbSkgb3IgaWYgeW91XG4gKiBwdXNoIGEgY2h1bmsgd2l0aCBleHBsaWNpdCBmbHVzaCAoY2FsbCBbW0luZmxhdGUjcHVzaF1dIHdpdGhcbiAqIGBaX1NZTkNfRkxVU0hgIHBhcmFtKS5cbiAqKi9cblxuLyoqXG4gKiBJbmZsYXRlLmVyciAtPiBOdW1iZXJcbiAqXG4gKiBFcnJvciBjb2RlIGFmdGVyIGluZmxhdGUgZmluaXNoZWQuIDAgKFpfT0spIG9uIHN1Y2Nlc3MuXG4gKiBTaG91bGQgYmUgY2hlY2tlZCBpZiBicm9rZW4gZGF0YSBwb3NzaWJsZS5cbiAqKi9cblxuLyoqXG4gKiBJbmZsYXRlLm1zZyAtPiBTdHJpbmdcbiAqXG4gKiBFcnJvciBtZXNzYWdlLCBpZiBbW0luZmxhdGUuZXJyXV0gIT0gMFxuICoqL1xuXG5cbi8qKlxuICogbmV3IEluZmxhdGUob3B0aW9ucylcbiAqIC0gb3B0aW9ucyAoT2JqZWN0KTogemxpYiBpbmZsYXRlIG9wdGlvbnMuXG4gKlxuICogQ3JlYXRlcyBuZXcgaW5mbGF0b3IgaW5zdGFuY2Ugd2l0aCBzcGVjaWZpZWQgcGFyYW1zLiBUaHJvd3MgZXhjZXB0aW9uXG4gKiBvbiBiYWQgcGFyYW1zLiBTdXBwb3J0ZWQgb3B0aW9uczpcbiAqXG4gKiAtIGB3aW5kb3dCaXRzYFxuICogLSBgZGljdGlvbmFyeWBcbiAqXG4gKiBbaHR0cDovL3psaWIubmV0L21hbnVhbC5odG1sI0FkdmFuY2VkXShodHRwOi8vemxpYi5uZXQvbWFudWFsLmh0bWwjQWR2YW5jZWQpXG4gKiBmb3IgbW9yZSBpbmZvcm1hdGlvbiBvbiB0aGVzZS5cbiAqXG4gKiBBZGRpdGlvbmFsIG9wdGlvbnMsIGZvciBpbnRlcm5hbCBuZWVkczpcbiAqXG4gKiAtIGBjaHVua1NpemVgIC0gc2l6ZSBvZiBnZW5lcmF0ZWQgZGF0YSBjaHVua3MgKDE2SyBieSBkZWZhdWx0KVxuICogLSBgcmF3YCAoQm9vbGVhbikgLSBkbyByYXcgaW5mbGF0ZVxuICogLSBgdG9gIChTdHJpbmcpIC0gaWYgZXF1YWwgdG8gJ3N0cmluZycsIHRoZW4gcmVzdWx0IHdpbGwgYmUgY29udmVydGVkXG4gKiAgIGZyb20gdXRmOCB0byB1dGYxNiAoamF2YXNjcmlwdCkgc3RyaW5nLiBXaGVuIHN0cmluZyBvdXRwdXQgcmVxdWVzdGVkLFxuICogICBjaHVuayBsZW5ndGggY2FuIGRpZmZlciBmcm9tIGBjaHVua1NpemVgLCBkZXBlbmRpbmcgb24gY29udGVudC5cbiAqXG4gKiBCeSBkZWZhdWx0LCB3aGVuIG5vIG9wdGlvbnMgc2V0LCBhdXRvZGV0ZWN0IGRlZmxhdGUvZ3ppcCBkYXRhIGZvcm1hdCB2aWFcbiAqIHdyYXBwZXIgaGVhZGVyLlxuICpcbiAqICMjIyMjIEV4YW1wbGU6XG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogdmFyIHBha28gPSByZXF1aXJlKCdwYWtvJylcbiAqICAgLCBjaHVuazEgPSBVaW50OEFycmF5KFsxLDIsMyw0LDUsNiw3LDgsOV0pXG4gKiAgICwgY2h1bmsyID0gVWludDhBcnJheShbMTAsMTEsMTIsMTMsMTQsMTUsMTYsMTcsMTgsMTldKTtcbiAqXG4gKiB2YXIgaW5mbGF0ZSA9IG5ldyBwYWtvLkluZmxhdGUoeyBsZXZlbDogM30pO1xuICpcbiAqIGluZmxhdGUucHVzaChjaHVuazEsIGZhbHNlKTtcbiAqIGluZmxhdGUucHVzaChjaHVuazIsIHRydWUpOyAgLy8gdHJ1ZSAtPiBsYXN0IGNodW5rXG4gKlxuICogaWYgKGluZmxhdGUuZXJyKSB7IHRocm93IG5ldyBFcnJvcihpbmZsYXRlLmVycik7IH1cbiAqXG4gKiBjb25zb2xlLmxvZyhpbmZsYXRlLnJlc3VsdCk7XG4gKiBgYGBcbiAqKi9cbmZ1bmN0aW9uIEluZmxhdGUob3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgSW5mbGF0ZSkpIHJldHVybiBuZXcgSW5mbGF0ZShvcHRpb25zKTtcblxuICB0aGlzLm9wdGlvbnMgPSB1dGlscy5hc3NpZ24oe1xuICAgIGNodW5rU2l6ZTogMTYzODQsXG4gICAgd2luZG93Qml0czogMCxcbiAgICB0bzogJydcbiAgfSwgb3B0aW9ucyB8fCB7fSk7XG5cbiAgdmFyIG9wdCA9IHRoaXMub3B0aW9ucztcblxuICAvLyBGb3JjZSB3aW5kb3cgc2l6ZSBmb3IgYHJhd2AgZGF0YSwgaWYgbm90IHNldCBkaXJlY3RseSxcbiAgLy8gYmVjYXVzZSB3ZSBoYXZlIG5vIGhlYWRlciBmb3IgYXV0b2RldGVjdC5cbiAgaWYgKG9wdC5yYXcgJiYgKG9wdC53aW5kb3dCaXRzID49IDApICYmIChvcHQud2luZG93Qml0cyA8IDE2KSkge1xuICAgIG9wdC53aW5kb3dCaXRzID0gLW9wdC53aW5kb3dCaXRzO1xuICAgIGlmIChvcHQud2luZG93Qml0cyA9PT0gMCkgeyBvcHQud2luZG93Qml0cyA9IC0xNTsgfVxuICB9XG5cbiAgLy8gSWYgYHdpbmRvd0JpdHNgIG5vdCBkZWZpbmVkIChhbmQgbW9kZSBub3QgcmF3KSAtIHNldCBhdXRvZGV0ZWN0IGZsYWcgZm9yIGd6aXAvZGVmbGF0ZVxuICBpZiAoKG9wdC53aW5kb3dCaXRzID49IDApICYmIChvcHQud2luZG93Qml0cyA8IDE2KSAmJlxuICAgICAgIShvcHRpb25zICYmIG9wdGlvbnMud2luZG93Qml0cykpIHtcbiAgICBvcHQud2luZG93Qml0cyArPSAzMjtcbiAgfVxuXG4gIC8vIEd6aXAgaGVhZGVyIGhhcyBubyBpbmZvIGFib3V0IHdpbmRvd3Mgc2l6ZSwgd2UgY2FuIGRvIGF1dG9kZXRlY3Qgb25seVxuICAvLyBmb3IgZGVmbGF0ZS4gU28sIGlmIHdpbmRvdyBzaXplIG5vdCBzZXQsIGZvcmNlIGl0IHRvIG1heCB3aGVuIGd6aXAgcG9zc2libGVcbiAgaWYgKChvcHQud2luZG93Qml0cyA+IDE1KSAmJiAob3B0LndpbmRvd0JpdHMgPCA0OCkpIHtcbiAgICAvLyBiaXQgMyAoMTYpIC0+IGd6aXBwZWQgZGF0YVxuICAgIC8vIGJpdCA0ICgzMikgLT4gYXV0b2RldGVjdCBnemlwL2RlZmxhdGVcbiAgICBpZiAoKG9wdC53aW5kb3dCaXRzICYgMTUpID09PSAwKSB7XG4gICAgICBvcHQud2luZG93Qml0cyB8PSAxNTtcbiAgICB9XG4gIH1cblxuICB0aGlzLmVyciAgICA9IDA7ICAgICAgLy8gZXJyb3IgY29kZSwgaWYgaGFwcGVucyAoMCA9IFpfT0spXG4gIHRoaXMubXNnICAgID0gJyc7ICAgICAvLyBlcnJvciBtZXNzYWdlXG4gIHRoaXMuZW5kZWQgID0gZmFsc2U7ICAvLyB1c2VkIHRvIGF2b2lkIG11bHRpcGxlIG9uRW5kKCkgY2FsbHNcbiAgdGhpcy5jaHVua3MgPSBbXTsgICAgIC8vIGNodW5rcyBvZiBjb21wcmVzc2VkIGRhdGFcblxuICB0aGlzLnN0cm0gICA9IG5ldyBaU3RyZWFtKCk7XG4gIHRoaXMuc3RybS5hdmFpbF9vdXQgPSAwO1xuXG4gIHZhciBzdGF0dXMgID0gemxpYl9pbmZsYXRlLmluZmxhdGVJbml0MihcbiAgICB0aGlzLnN0cm0sXG4gICAgb3B0LndpbmRvd0JpdHNcbiAgKTtcblxuICBpZiAoc3RhdHVzICE9PSBjLlpfT0spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobXNnW3N0YXR1c10pO1xuICB9XG5cbiAgdGhpcy5oZWFkZXIgPSBuZXcgR1poZWFkZXIoKTtcblxuICB6bGliX2luZmxhdGUuaW5mbGF0ZUdldEhlYWRlcih0aGlzLnN0cm0sIHRoaXMuaGVhZGVyKTtcblxuICAvLyBTZXR1cCBkaWN0aW9uYXJ5XG4gIGlmIChvcHQuZGljdGlvbmFyeSkge1xuICAgIC8vIENvbnZlcnQgZGF0YSBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIG9wdC5kaWN0aW9uYXJ5ID09PSAnc3RyaW5nJykge1xuICAgICAgb3B0LmRpY3Rpb25hcnkgPSBzdHJpbmdzLnN0cmluZzJidWYob3B0LmRpY3Rpb25hcnkpO1xuICAgIH0gZWxzZSBpZiAodG9TdHJpbmcuY2FsbChvcHQuZGljdGlvbmFyeSkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXScpIHtcbiAgICAgIG9wdC5kaWN0aW9uYXJ5ID0gbmV3IFVpbnQ4QXJyYXkob3B0LmRpY3Rpb25hcnkpO1xuICAgIH1cbiAgICBpZiAob3B0LnJhdykgeyAvL0luIHJhdyBtb2RlIHdlIG5lZWQgdG8gc2V0IHRoZSBkaWN0aW9uYXJ5IGVhcmx5XG4gICAgICBzdGF0dXMgPSB6bGliX2luZmxhdGUuaW5mbGF0ZVNldERpY3Rpb25hcnkodGhpcy5zdHJtLCBvcHQuZGljdGlvbmFyeSk7XG4gICAgICBpZiAoc3RhdHVzICE9PSBjLlpfT0spIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZ1tzdGF0dXNdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBJbmZsYXRlI3B1c2goZGF0YVssIG1vZGVdKSAtPiBCb29sZWFuXG4gKiAtIGRhdGEgKFVpbnQ4QXJyYXl8QXJyYXl8QXJyYXlCdWZmZXJ8U3RyaW5nKTogaW5wdXQgZGF0YVxuICogLSBtb2RlIChOdW1iZXJ8Qm9vbGVhbik6IDAuLjYgZm9yIGNvcnJlc3BvbmRpbmcgWl9OT19GTFVTSC4uWl9UUkVFIG1vZGVzLlxuICogICBTZWUgY29uc3RhbnRzLiBTa2lwcGVkIG9yIGBmYWxzZWAgbWVhbnMgWl9OT19GTFVTSCwgYHRydWVgIG1lYW5zIFpfRklOSVNILlxuICpcbiAqIFNlbmRzIGlucHV0IGRhdGEgdG8gaW5mbGF0ZSBwaXBlLCBnZW5lcmF0aW5nIFtbSW5mbGF0ZSNvbkRhdGFdXSBjYWxscyB3aXRoXG4gKiBuZXcgb3V0cHV0IGNodW5rcy4gUmV0dXJucyBgdHJ1ZWAgb24gc3VjY2Vzcy4gVGhlIGxhc3QgZGF0YSBibG9jayBtdXN0IGhhdmVcbiAqIG1vZGUgWl9GSU5JU0ggKG9yIGB0cnVlYCkuIFRoYXQgd2lsbCBmbHVzaCBpbnRlcm5hbCBwZW5kaW5nIGJ1ZmZlcnMgYW5kIGNhbGxcbiAqIFtbSW5mbGF0ZSNvbkVuZF1dLiBGb3IgaW50ZXJpbSBleHBsaWNpdCBmbHVzaGVzICh3aXRob3V0IGVuZGluZyB0aGUgc3RyZWFtKSB5b3VcbiAqIGNhbiB1c2UgbW9kZSBaX1NZTkNfRkxVU0gsIGtlZXBpbmcgdGhlIGRlY29tcHJlc3Npb24gY29udGV4dC5cbiAqXG4gKiBPbiBmYWlsIGNhbGwgW1tJbmZsYXRlI29uRW5kXV0gd2l0aCBlcnJvciBjb2RlIGFuZCByZXR1cm4gZmFsc2UuXG4gKlxuICogV2Ugc3Ryb25nbHkgcmVjb21tZW5kIHRvIHVzZSBgVWludDhBcnJheWAgb24gaW5wdXQgZm9yIGJlc3Qgc3BlZWQgKG91dHB1dFxuICogZm9ybWF0IGlzIGRldGVjdGVkIGF1dG9tYXRpY2FsbHkpLiBBbHNvLCBkb24ndCBza2lwIGxhc3QgcGFyYW0gYW5kIGFsd2F5c1xuICogdXNlIHRoZSBzYW1lIHR5cGUgaW4geW91ciBjb2RlIChib29sZWFuIG9yIG51bWJlcikuIFRoYXQgd2lsbCBpbXByb3ZlIEpTIHNwZWVkLlxuICpcbiAqIEZvciByZWd1bGFyIGBBcnJheWAtcyBtYWtlIHN1cmUgYWxsIGVsZW1lbnRzIGFyZSBbMC4uMjU1XS5cbiAqXG4gKiAjIyMjIyBFeGFtcGxlXG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogcHVzaChjaHVuaywgZmFsc2UpOyAvLyBwdXNoIG9uZSBvZiBkYXRhIGNodW5rc1xuICogLi4uXG4gKiBwdXNoKGNodW5rLCB0cnVlKTsgIC8vIHB1c2ggbGFzdCBjaHVua1xuICogYGBgXG4gKiovXG5JbmZsYXRlLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGRhdGEsIG1vZGUpIHtcbiAgdmFyIHN0cm0gPSB0aGlzLnN0cm07XG4gIHZhciBjaHVua1NpemUgPSB0aGlzLm9wdGlvbnMuY2h1bmtTaXplO1xuICB2YXIgZGljdGlvbmFyeSA9IHRoaXMub3B0aW9ucy5kaWN0aW9uYXJ5O1xuICB2YXIgc3RhdHVzLCBfbW9kZTtcbiAgdmFyIG5leHRfb3V0X3V0ZjgsIHRhaWwsIHV0ZjhzdHI7XG5cbiAgLy8gRmxhZyB0byBwcm9wZXJseSBwcm9jZXNzIFpfQlVGX0VSUk9SIG9uIHRlc3RpbmcgaW5mbGF0ZSBjYWxsXG4gIC8vIHdoZW4gd2UgY2hlY2sgdGhhdCBhbGwgb3V0cHV0IGRhdGEgd2FzIGZsdXNoZWQuXG4gIHZhciBhbGxvd0J1ZkVycm9yID0gZmFsc2U7XG5cbiAgaWYgKHRoaXMuZW5kZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIF9tb2RlID0gKG1vZGUgPT09IH5+bW9kZSkgPyBtb2RlIDogKChtb2RlID09PSB0cnVlKSA/IGMuWl9GSU5JU0ggOiBjLlpfTk9fRkxVU0gpO1xuXG4gIC8vIENvbnZlcnQgZGF0YSBpZiBuZWVkZWRcbiAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgIC8vIE9ubHkgYmluYXJ5IHN0cmluZ3MgY2FuIGJlIGRlY29tcHJlc3NlZCBvbiBwcmFjdGljZVxuICAgIHN0cm0uaW5wdXQgPSBzdHJpbmdzLmJpbnN0cmluZzJidWYoZGF0YSk7XG4gIH0gZWxzZSBpZiAodG9TdHJpbmcuY2FsbChkYXRhKSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJykge1xuICAgIHN0cm0uaW5wdXQgPSBuZXcgVWludDhBcnJheShkYXRhKTtcbiAgfSBlbHNlIHtcbiAgICBzdHJtLmlucHV0ID0gZGF0YTtcbiAgfVxuXG4gIHN0cm0ubmV4dF9pbiA9IDA7XG4gIHN0cm0uYXZhaWxfaW4gPSBzdHJtLmlucHV0Lmxlbmd0aDtcblxuICBkbyB7XG4gICAgaWYgKHN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICBzdHJtLm91dHB1dCA9IG5ldyB1dGlscy5CdWY4KGNodW5rU2l6ZSk7XG4gICAgICBzdHJtLm5leHRfb3V0ID0gMDtcbiAgICAgIHN0cm0uYXZhaWxfb3V0ID0gY2h1bmtTaXplO1xuICAgIH1cblxuICAgIHN0YXR1cyA9IHpsaWJfaW5mbGF0ZS5pbmZsYXRlKHN0cm0sIGMuWl9OT19GTFVTSCk7ICAgIC8qIG5vIGJhZCByZXR1cm4gdmFsdWUgKi9cblxuICAgIGlmIChzdGF0dXMgPT09IGMuWl9ORUVEX0RJQ1QgJiYgZGljdGlvbmFyeSkge1xuICAgICAgc3RhdHVzID0gemxpYl9pbmZsYXRlLmluZmxhdGVTZXREaWN0aW9uYXJ5KHRoaXMuc3RybSwgZGljdGlvbmFyeSk7XG4gICAgfVxuXG4gICAgaWYgKHN0YXR1cyA9PT0gYy5aX0JVRl9FUlJPUiAmJiBhbGxvd0J1ZkVycm9yID09PSB0cnVlKSB7XG4gICAgICBzdGF0dXMgPSBjLlpfT0s7XG4gICAgICBhbGxvd0J1ZkVycm9yID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHN0YXR1cyAhPT0gYy5aX1NUUkVBTV9FTkQgJiYgc3RhdHVzICE9PSBjLlpfT0spIHtcbiAgICAgIHRoaXMub25FbmQoc3RhdHVzKTtcbiAgICAgIHRoaXMuZW5kZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChzdHJtLm5leHRfb3V0KSB7XG4gICAgICBpZiAoc3RybS5hdmFpbF9vdXQgPT09IDAgfHwgc3RhdHVzID09PSBjLlpfU1RSRUFNX0VORCB8fCAoc3RybS5hdmFpbF9pbiA9PT0gMCAmJiAoX21vZGUgPT09IGMuWl9GSU5JU0ggfHwgX21vZGUgPT09IGMuWl9TWU5DX0ZMVVNIKSkpIHtcblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnRvID09PSAnc3RyaW5nJykge1xuXG4gICAgICAgICAgbmV4dF9vdXRfdXRmOCA9IHN0cmluZ3MudXRmOGJvcmRlcihzdHJtLm91dHB1dCwgc3RybS5uZXh0X291dCk7XG5cbiAgICAgICAgICB0YWlsID0gc3RybS5uZXh0X291dCAtIG5leHRfb3V0X3V0Zjg7XG4gICAgICAgICAgdXRmOHN0ciA9IHN0cmluZ3MuYnVmMnN0cmluZyhzdHJtLm91dHB1dCwgbmV4dF9vdXRfdXRmOCk7XG5cbiAgICAgICAgICAvLyBtb3ZlIHRhaWxcbiAgICAgICAgICBzdHJtLm5leHRfb3V0ID0gdGFpbDtcbiAgICAgICAgICBzdHJtLmF2YWlsX291dCA9IGNodW5rU2l6ZSAtIHRhaWw7XG4gICAgICAgICAgaWYgKHRhaWwpIHsgdXRpbHMuYXJyYXlTZXQoc3RybS5vdXRwdXQsIHN0cm0ub3V0cHV0LCBuZXh0X291dF91dGY4LCB0YWlsLCAwKTsgfVxuXG4gICAgICAgICAgdGhpcy5vbkRhdGEodXRmOHN0cik7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm9uRGF0YSh1dGlscy5zaHJpbmtCdWYoc3RybS5vdXRwdXQsIHN0cm0ubmV4dF9vdXQpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFdoZW4gbm8gbW9yZSBpbnB1dCBkYXRhLCB3ZSBzaG91bGQgY2hlY2sgdGhhdCBpbnRlcm5hbCBpbmZsYXRlIGJ1ZmZlcnNcbiAgICAvLyBhcmUgZmx1c2hlZC4gVGhlIG9ubHkgd2F5IHRvIGRvIGl0IHdoZW4gYXZhaWxfb3V0ID0gMCAtIHJ1biBvbmUgbW9yZVxuICAgIC8vIGluZmxhdGUgcGFzcy4gQnV0IGlmIG91dHB1dCBkYXRhIG5vdCBleGlzdHMsIGluZmxhdGUgcmV0dXJuIFpfQlVGX0VSUk9SLlxuICAgIC8vIEhlcmUgd2Ugc2V0IGZsYWcgdG8gcHJvY2VzcyB0aGlzIGVycm9yIHByb3Blcmx5LlxuICAgIC8vXG4gICAgLy8gTk9URS4gRGVmbGF0ZSBkb2VzIG5vdCByZXR1cm4gZXJyb3IgaW4gdGhpcyBjYXNlIGFuZCBkb2VzIG5vdCBuZWVkcyBzdWNoXG4gICAgLy8gbG9naWMuXG4gICAgaWYgKHN0cm0uYXZhaWxfaW4gPT09IDAgJiYgc3RybS5hdmFpbF9vdXQgPT09IDApIHtcbiAgICAgIGFsbG93QnVmRXJyb3IgPSB0cnVlO1xuICAgIH1cblxuICB9IHdoaWxlICgoc3RybS5hdmFpbF9pbiA+IDAgfHwgc3RybS5hdmFpbF9vdXQgPT09IDApICYmIHN0YXR1cyAhPT0gYy5aX1NUUkVBTV9FTkQpO1xuXG4gIGlmIChzdGF0dXMgPT09IGMuWl9TVFJFQU1fRU5EKSB7XG4gICAgX21vZGUgPSBjLlpfRklOSVNIO1xuICB9XG5cbiAgLy8gRmluYWxpemUgb24gdGhlIGxhc3QgY2h1bmsuXG4gIGlmIChfbW9kZSA9PT0gYy5aX0ZJTklTSCkge1xuICAgIHN0YXR1cyA9IHpsaWJfaW5mbGF0ZS5pbmZsYXRlRW5kKHRoaXMuc3RybSk7XG4gICAgdGhpcy5vbkVuZChzdGF0dXMpO1xuICAgIHRoaXMuZW5kZWQgPSB0cnVlO1xuICAgIHJldHVybiBzdGF0dXMgPT09IGMuWl9PSztcbiAgfVxuXG4gIC8vIGNhbGxiYWNrIGludGVyaW0gcmVzdWx0cyBpZiBaX1NZTkNfRkxVU0guXG4gIGlmIChfbW9kZSA9PT0gYy5aX1NZTkNfRkxVU0gpIHtcbiAgICB0aGlzLm9uRW5kKGMuWl9PSyk7XG4gICAgc3RybS5hdmFpbF9vdXQgPSAwO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5cbi8qKlxuICogSW5mbGF0ZSNvbkRhdGEoY2h1bmspIC0+IFZvaWRcbiAqIC0gY2h1bmsgKFVpbnQ4QXJyYXl8QXJyYXl8U3RyaW5nKTogb3V0cHV0IGRhdGEuIFR5cGUgb2YgYXJyYXkgZGVwZW5kc1xuICogICBvbiBqcyBlbmdpbmUgc3VwcG9ydC4gV2hlbiBzdHJpbmcgb3V0cHV0IHJlcXVlc3RlZCwgZWFjaCBjaHVua1xuICogICB3aWxsIGJlIHN0cmluZy5cbiAqXG4gKiBCeSBkZWZhdWx0LCBzdG9yZXMgZGF0YSBibG9ja3MgaW4gYGNodW5rc1tdYCBwcm9wZXJ0eSBhbmQgZ2x1ZVxuICogdGhvc2UgaW4gYG9uRW5kYC4gT3ZlcnJpZGUgdGhpcyBoYW5kbGVyLCBpZiB5b3UgbmVlZCBhbm90aGVyIGJlaGF2aW91ci5cbiAqKi9cbkluZmxhdGUucHJvdG90eXBlLm9uRGF0YSA9IGZ1bmN0aW9uIChjaHVuaykge1xuICB0aGlzLmNodW5rcy5wdXNoKGNodW5rKTtcbn07XG5cblxuLyoqXG4gKiBJbmZsYXRlI29uRW5kKHN0YXR1cykgLT4gVm9pZFxuICogLSBzdGF0dXMgKE51bWJlcik6IGluZmxhdGUgc3RhdHVzLiAwIChaX09LKSBvbiBzdWNjZXNzLFxuICogICBvdGhlciBpZiBub3QuXG4gKlxuICogQ2FsbGVkIGVpdGhlciBhZnRlciB5b3UgdGVsbCBpbmZsYXRlIHRoYXQgdGhlIGlucHV0IHN0cmVhbSBpc1xuICogY29tcGxldGUgKFpfRklOSVNIKSBvciBzaG91bGQgYmUgZmx1c2hlZCAoWl9TWU5DX0ZMVVNIKVxuICogb3IgaWYgYW4gZXJyb3IgaGFwcGVuZWQuIEJ5IGRlZmF1bHQgLSBqb2luIGNvbGxlY3RlZCBjaHVua3MsXG4gKiBmcmVlIG1lbW9yeSBhbmQgZmlsbCBgcmVzdWx0c2AgLyBgZXJyYCBwcm9wZXJ0aWVzLlxuICoqL1xuSW5mbGF0ZS5wcm90b3R5cGUub25FbmQgPSBmdW5jdGlvbiAoc3RhdHVzKSB7XG4gIC8vIE9uIHN1Y2Nlc3MgLSBqb2luXG4gIGlmIChzdGF0dXMgPT09IGMuWl9PSykge1xuICAgIGlmICh0aGlzLm9wdGlvbnMudG8gPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBHbHVlICYgY29udmVydCBoZXJlLCB1bnRpbCB3ZSB0ZWFjaCBwYWtvIHRvIHNlbmRcbiAgICAgIC8vIHV0ZjggYWxpZ25lZCBzdHJpbmdzIHRvIG9uRGF0YVxuICAgICAgdGhpcy5yZXN1bHQgPSB0aGlzLmNodW5rcy5qb2luKCcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZXN1bHQgPSB1dGlscy5mbGF0dGVuQ2h1bmtzKHRoaXMuY2h1bmtzKTtcbiAgICB9XG4gIH1cbiAgdGhpcy5jaHVua3MgPSBbXTtcbiAgdGhpcy5lcnIgPSBzdGF0dXM7XG4gIHRoaXMubXNnID0gdGhpcy5zdHJtLm1zZztcbn07XG5cblxuLyoqXG4gKiBpbmZsYXRlKGRhdGFbLCBvcHRpb25zXSkgLT4gVWludDhBcnJheXxBcnJheXxTdHJpbmdcbiAqIC0gZGF0YSAoVWludDhBcnJheXxBcnJheXxTdHJpbmcpOiBpbnB1dCBkYXRhIHRvIGRlY29tcHJlc3MuXG4gKiAtIG9wdGlvbnMgKE9iamVjdCk6IHpsaWIgaW5mbGF0ZSBvcHRpb25zLlxuICpcbiAqIERlY29tcHJlc3MgYGRhdGFgIHdpdGggaW5mbGF0ZS91bmd6aXAgYW5kIGBvcHRpb25zYC4gQXV0b2RldGVjdFxuICogZm9ybWF0IHZpYSB3cmFwcGVyIGhlYWRlciBieSBkZWZhdWx0LiBUaGF0J3Mgd2h5IHdlIGRvbid0IHByb3ZpZGVcbiAqIHNlcGFyYXRlIGB1bmd6aXBgIG1ldGhvZC5cbiAqXG4gKiBTdXBwb3J0ZWQgb3B0aW9ucyBhcmU6XG4gKlxuICogLSB3aW5kb3dCaXRzXG4gKlxuICogW2h0dHA6Ly96bGliLm5ldC9tYW51YWwuaHRtbCNBZHZhbmNlZF0oaHR0cDovL3psaWIubmV0L21hbnVhbC5odG1sI0FkdmFuY2VkKVxuICogZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogU3VnYXIgKG9wdGlvbnMpOlxuICpcbiAqIC0gYHJhd2AgKEJvb2xlYW4pIC0gc2F5IHRoYXQgd2Ugd29yayB3aXRoIHJhdyBzdHJlYW0sIGlmIHlvdSBkb24ndCB3aXNoIHRvIHNwZWNpZnlcbiAqICAgbmVnYXRpdmUgd2luZG93Qml0cyBpbXBsaWNpdGx5LlxuICogLSBgdG9gIChTdHJpbmcpIC0gaWYgZXF1YWwgdG8gJ3N0cmluZycsIHRoZW4gcmVzdWx0IHdpbGwgYmUgY29udmVydGVkXG4gKiAgIGZyb20gdXRmOCB0byB1dGYxNiAoamF2YXNjcmlwdCkgc3RyaW5nLiBXaGVuIHN0cmluZyBvdXRwdXQgcmVxdWVzdGVkLFxuICogICBjaHVuayBsZW5ndGggY2FuIGRpZmZlciBmcm9tIGBjaHVua1NpemVgLCBkZXBlbmRpbmcgb24gY29udGVudC5cbiAqXG4gKlxuICogIyMjIyMgRXhhbXBsZTpcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiB2YXIgcGFrbyA9IHJlcXVpcmUoJ3Bha28nKVxuICogICAsIGlucHV0ID0gcGFrby5kZWZsYXRlKFsxLDIsMyw0LDUsNiw3LDgsOV0pXG4gKiAgICwgb3V0cHV0O1xuICpcbiAqIHRyeSB7XG4gKiAgIG91dHB1dCA9IHBha28uaW5mbGF0ZShpbnB1dCk7XG4gKiB9IGNhdGNoIChlcnIpXG4gKiAgIGNvbnNvbGUubG9nKGVycik7XG4gKiB9XG4gKiBgYGBcbiAqKi9cbmZ1bmN0aW9uIGluZmxhdGUoaW5wdXQsIG9wdGlvbnMpIHtcbiAgdmFyIGluZmxhdG9yID0gbmV3IEluZmxhdGUob3B0aW9ucyk7XG5cbiAgaW5mbGF0b3IucHVzaChpbnB1dCwgdHJ1ZSk7XG5cbiAgLy8gVGhhdCB3aWxsIG5ldmVyIGhhcHBlbnMsIGlmIHlvdSBkb24ndCBjaGVhdCB3aXRoIG9wdGlvbnMgOilcbiAgaWYgKGluZmxhdG9yLmVycikgeyB0aHJvdyBpbmZsYXRvci5tc2cgfHwgbXNnW2luZmxhdG9yLmVycl07IH1cblxuICByZXR1cm4gaW5mbGF0b3IucmVzdWx0O1xufVxuXG5cbi8qKlxuICogaW5mbGF0ZVJhdyhkYXRhWywgb3B0aW9uc10pIC0+IFVpbnQ4QXJyYXl8QXJyYXl8U3RyaW5nXG4gKiAtIGRhdGEgKFVpbnQ4QXJyYXl8QXJyYXl8U3RyaW5nKTogaW5wdXQgZGF0YSB0byBkZWNvbXByZXNzLlxuICogLSBvcHRpb25zIChPYmplY3QpOiB6bGliIGluZmxhdGUgb3B0aW9ucy5cbiAqXG4gKiBUaGUgc2FtZSBhcyBbW2luZmxhdGVdXSwgYnV0IGNyZWF0ZXMgcmF3IGRhdGEsIHdpdGhvdXQgd3JhcHBlclxuICogKGhlYWRlciBhbmQgYWRsZXIzMiBjcmMpLlxuICoqL1xuZnVuY3Rpb24gaW5mbGF0ZVJhdyhpbnB1dCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgb3B0aW9ucy5yYXcgPSB0cnVlO1xuICByZXR1cm4gaW5mbGF0ZShpbnB1dCwgb3B0aW9ucyk7XG59XG5cblxuLyoqXG4gKiB1bmd6aXAoZGF0YVssIG9wdGlvbnNdKSAtPiBVaW50OEFycmF5fEFycmF5fFN0cmluZ1xuICogLSBkYXRhIChVaW50OEFycmF5fEFycmF5fFN0cmluZyk6IGlucHV0IGRhdGEgdG8gZGVjb21wcmVzcy5cbiAqIC0gb3B0aW9ucyAoT2JqZWN0KTogemxpYiBpbmZsYXRlIG9wdGlvbnMuXG4gKlxuICogSnVzdCBzaG9ydGN1dCB0byBbW2luZmxhdGVdXSwgYmVjYXVzZSBpdCBhdXRvZGV0ZWN0cyBmb3JtYXRcbiAqIGJ5IGhlYWRlci5jb250ZW50LiBEb25lIGZvciBjb252ZW5pZW5jZS5cbiAqKi9cblxuXG5leHBvcnRzLkluZmxhdGUgPSBJbmZsYXRlO1xuZXhwb3J0cy5pbmZsYXRlID0gaW5mbGF0ZTtcbmV4cG9ydHMuaW5mbGF0ZVJhdyA9IGluZmxhdGVSYXc7XG5leHBvcnRzLnVuZ3ppcCAgPSBpbmZsYXRlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciBUWVBFRF9PSyA9ICAodHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnKSAmJlxuICAgICAgICAgICAgICAgICh0eXBlb2YgVWludDE2QXJyYXkgIT09ICd1bmRlZmluZWQnKSAmJlxuICAgICAgICAgICAgICAgICh0eXBlb2YgSW50MzJBcnJheSAhPT0gJ3VuZGVmaW5lZCcpO1xuXG5mdW5jdGlvbiBfaGFzKG9iaiwga2V5KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpO1xufVxuXG5leHBvcnRzLmFzc2lnbiA9IGZ1bmN0aW9uIChvYmogLypmcm9tMSwgZnJvbTIsIGZyb20zLCAuLi4qLykge1xuICB2YXIgc291cmNlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gIHdoaWxlIChzb3VyY2VzLmxlbmd0aCkge1xuICAgIHZhciBzb3VyY2UgPSBzb3VyY2VzLnNoaWZ0KCk7XG4gICAgaWYgKCFzb3VyY2UpIHsgY29udGludWU7IH1cblxuICAgIGlmICh0eXBlb2Ygc291cmNlICE9PSAnb2JqZWN0Jykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzb3VyY2UgKyAnbXVzdCBiZSBub24tb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgcCBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChfaGFzKHNvdXJjZSwgcCkpIHtcbiAgICAgICAgb2JqW3BdID0gc291cmNlW3BdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG5cbi8vIHJlZHVjZSBidWZmZXIgc2l6ZSwgYXZvaWRpbmcgbWVtIGNvcHlcbmV4cG9ydHMuc2hyaW5rQnVmID0gZnVuY3Rpb24gKGJ1Ziwgc2l6ZSkge1xuICBpZiAoYnVmLmxlbmd0aCA9PT0gc2l6ZSkgeyByZXR1cm4gYnVmOyB9XG4gIGlmIChidWYuc3ViYXJyYXkpIHsgcmV0dXJuIGJ1Zi5zdWJhcnJheSgwLCBzaXplKTsgfVxuICBidWYubGVuZ3RoID0gc2l6ZTtcbiAgcmV0dXJuIGJ1Zjtcbn07XG5cblxudmFyIGZuVHlwZWQgPSB7XG4gIGFycmF5U2V0OiBmdW5jdGlvbiAoZGVzdCwgc3JjLCBzcmNfb2ZmcywgbGVuLCBkZXN0X29mZnMpIHtcbiAgICBpZiAoc3JjLnN1YmFycmF5ICYmIGRlc3Quc3ViYXJyYXkpIHtcbiAgICAgIGRlc3Quc2V0KHNyYy5zdWJhcnJheShzcmNfb2Zmcywgc3JjX29mZnMgKyBsZW4pLCBkZXN0X29mZnMpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBGYWxsYmFjayB0byBvcmRpbmFyeSBhcnJheVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGRlc3RbZGVzdF9vZmZzICsgaV0gPSBzcmNbc3JjX29mZnMgKyBpXTtcbiAgICB9XG4gIH0sXG4gIC8vIEpvaW4gYXJyYXkgb2YgY2h1bmtzIHRvIHNpbmdsZSBhcnJheS5cbiAgZmxhdHRlbkNodW5rczogZnVuY3Rpb24gKGNodW5rcykge1xuICAgIHZhciBpLCBsLCBsZW4sIHBvcywgY2h1bmssIHJlc3VsdDtcblxuICAgIC8vIGNhbGN1bGF0ZSBkYXRhIGxlbmd0aFxuICAgIGxlbiA9IDA7XG4gICAgZm9yIChpID0gMCwgbCA9IGNodW5rcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGxlbiArPSBjaHVua3NbaV0ubGVuZ3RoO1xuICAgIH1cblxuICAgIC8vIGpvaW4gY2h1bmtzXG4gICAgcmVzdWx0ID0gbmV3IFVpbnQ4QXJyYXkobGVuKTtcbiAgICBwb3MgPSAwO1xuICAgIGZvciAoaSA9IDAsIGwgPSBjaHVua3MubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBjaHVuayA9IGNodW5rc1tpXTtcbiAgICAgIHJlc3VsdC5zZXQoY2h1bmssIHBvcyk7XG4gICAgICBwb3MgKz0gY2h1bmsubGVuZ3RoO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5cbnZhciBmblVudHlwZWQgPSB7XG4gIGFycmF5U2V0OiBmdW5jdGlvbiAoZGVzdCwgc3JjLCBzcmNfb2ZmcywgbGVuLCBkZXN0X29mZnMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBkZXN0W2Rlc3Rfb2ZmcyArIGldID0gc3JjW3NyY19vZmZzICsgaV07XG4gICAgfVxuICB9LFxuICAvLyBKb2luIGFycmF5IG9mIGNodW5rcyB0byBzaW5nbGUgYXJyYXkuXG4gIGZsYXR0ZW5DaHVua3M6IGZ1bmN0aW9uIChjaHVua3MpIHtcbiAgICByZXR1cm4gW10uY29uY2F0LmFwcGx5KFtdLCBjaHVua3MpO1xuICB9XG59O1xuXG5cbi8vIEVuYWJsZS9EaXNhYmxlIHR5cGVkIGFycmF5cyB1c2UsIGZvciB0ZXN0aW5nXG4vL1xuZXhwb3J0cy5zZXRUeXBlZCA9IGZ1bmN0aW9uIChvbikge1xuICBpZiAob24pIHtcbiAgICBleHBvcnRzLkJ1ZjggID0gVWludDhBcnJheTtcbiAgICBleHBvcnRzLkJ1ZjE2ID0gVWludDE2QXJyYXk7XG4gICAgZXhwb3J0cy5CdWYzMiA9IEludDMyQXJyYXk7XG4gICAgZXhwb3J0cy5hc3NpZ24oZXhwb3J0cywgZm5UeXBlZCk7XG4gIH0gZWxzZSB7XG4gICAgZXhwb3J0cy5CdWY4ICA9IEFycmF5O1xuICAgIGV4cG9ydHMuQnVmMTYgPSBBcnJheTtcbiAgICBleHBvcnRzLkJ1ZjMyID0gQXJyYXk7XG4gICAgZXhwb3J0cy5hc3NpZ24oZXhwb3J0cywgZm5VbnR5cGVkKTtcbiAgfVxufTtcblxuZXhwb3J0cy5zZXRUeXBlZChUWVBFRF9PSyk7XG4iLCIvLyBTdHJpbmcgZW5jb2RlL2RlY29kZSBoZWxwZXJzXG4ndXNlIHN0cmljdCc7XG5cblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi9jb21tb24nKTtcblxuXG4vLyBRdWljayBjaGVjayBpZiB3ZSBjYW4gdXNlIGZhc3QgYXJyYXkgdG8gYmluIHN0cmluZyBjb252ZXJzaW9uXG4vL1xuLy8gLSBhcHBseShBcnJheSkgY2FuIGZhaWwgb24gQW5kcm9pZCAyLjJcbi8vIC0gYXBwbHkoVWludDhBcnJheSkgY2FuIGZhaWwgb24gaU9TIDUuMSBTYWZhcmlcbi8vXG52YXIgU1RSX0FQUExZX09LID0gdHJ1ZTtcbnZhciBTVFJfQVBQTFlfVUlBX09LID0gdHJ1ZTtcblxudHJ5IHsgU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBbIDAgXSk7IH0gY2F0Y2ggKF9fKSB7IFNUUl9BUFBMWV9PSyA9IGZhbHNlOyB9XG50cnkgeyBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIG5ldyBVaW50OEFycmF5KDEpKTsgfSBjYXRjaCAoX18pIHsgU1RSX0FQUExZX1VJQV9PSyA9IGZhbHNlOyB9XG5cblxuLy8gVGFibGUgd2l0aCB1dGY4IGxlbmd0aHMgKGNhbGN1bGF0ZWQgYnkgZmlyc3QgYnl0ZSBvZiBzZXF1ZW5jZSlcbi8vIE5vdGUsIHRoYXQgNSAmIDYtYnl0ZSB2YWx1ZXMgYW5kIHNvbWUgNC1ieXRlIHZhbHVlcyBjYW4gbm90IGJlIHJlcHJlc2VudGVkIGluIEpTLFxuLy8gYmVjYXVzZSBtYXggcG9zc2libGUgY29kZXBvaW50IGlzIDB4MTBmZmZmXG52YXIgX3V0ZjhsZW4gPSBuZXcgdXRpbHMuQnVmOCgyNTYpO1xuZm9yICh2YXIgcSA9IDA7IHEgPCAyNTY7IHErKykge1xuICBfdXRmOGxlbltxXSA9IChxID49IDI1MiA/IDYgOiBxID49IDI0OCA/IDUgOiBxID49IDI0MCA/IDQgOiBxID49IDIyNCA/IDMgOiBxID49IDE5MiA/IDIgOiAxKTtcbn1cbl91dGY4bGVuWzI1NF0gPSBfdXRmOGxlblsyNTRdID0gMTsgLy8gSW52YWxpZCBzZXF1ZW5jZSBzdGFydFxuXG5cbi8vIGNvbnZlcnQgc3RyaW5nIHRvIGFycmF5ICh0eXBlZCwgd2hlbiBwb3NzaWJsZSlcbmV4cG9ydHMuc3RyaW5nMmJ1ZiA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgdmFyIGJ1ZiwgYywgYzIsIG1fcG9zLCBpLCBzdHJfbGVuID0gc3RyLmxlbmd0aCwgYnVmX2xlbiA9IDA7XG5cbiAgLy8gY291bnQgYmluYXJ5IHNpemVcbiAgZm9yIChtX3BvcyA9IDA7IG1fcG9zIDwgc3RyX2xlbjsgbV9wb3MrKykge1xuICAgIGMgPSBzdHIuY2hhckNvZGVBdChtX3Bvcyk7XG4gICAgaWYgKChjICYgMHhmYzAwKSA9PT0gMHhkODAwICYmIChtX3BvcyArIDEgPCBzdHJfbGVuKSkge1xuICAgICAgYzIgPSBzdHIuY2hhckNvZGVBdChtX3BvcyArIDEpO1xuICAgICAgaWYgKChjMiAmIDB4ZmMwMCkgPT09IDB4ZGMwMCkge1xuICAgICAgICBjID0gMHgxMDAwMCArICgoYyAtIDB4ZDgwMCkgPDwgMTApICsgKGMyIC0gMHhkYzAwKTtcbiAgICAgICAgbV9wb3MrKztcbiAgICAgIH1cbiAgICB9XG4gICAgYnVmX2xlbiArPSBjIDwgMHg4MCA/IDEgOiBjIDwgMHg4MDAgPyAyIDogYyA8IDB4MTAwMDAgPyAzIDogNDtcbiAgfVxuXG4gIC8vIGFsbG9jYXRlIGJ1ZmZlclxuICBidWYgPSBuZXcgdXRpbHMuQnVmOChidWZfbGVuKTtcblxuICAvLyBjb252ZXJ0XG4gIGZvciAoaSA9IDAsIG1fcG9zID0gMDsgaSA8IGJ1Zl9sZW47IG1fcG9zKyspIHtcbiAgICBjID0gc3RyLmNoYXJDb2RlQXQobV9wb3MpO1xuICAgIGlmICgoYyAmIDB4ZmMwMCkgPT09IDB4ZDgwMCAmJiAobV9wb3MgKyAxIDwgc3RyX2xlbikpIHtcbiAgICAgIGMyID0gc3RyLmNoYXJDb2RlQXQobV9wb3MgKyAxKTtcbiAgICAgIGlmICgoYzIgJiAweGZjMDApID09PSAweGRjMDApIHtcbiAgICAgICAgYyA9IDB4MTAwMDAgKyAoKGMgLSAweGQ4MDApIDw8IDEwKSArIChjMiAtIDB4ZGMwMCk7XG4gICAgICAgIG1fcG9zKys7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjIDwgMHg4MCkge1xuICAgICAgLyogb25lIGJ5dGUgKi9cbiAgICAgIGJ1ZltpKytdID0gYztcbiAgICB9IGVsc2UgaWYgKGMgPCAweDgwMCkge1xuICAgICAgLyogdHdvIGJ5dGVzICovXG4gICAgICBidWZbaSsrXSA9IDB4QzAgfCAoYyA+Pj4gNik7XG4gICAgICBidWZbaSsrXSA9IDB4ODAgfCAoYyAmIDB4M2YpO1xuICAgIH0gZWxzZSBpZiAoYyA8IDB4MTAwMDApIHtcbiAgICAgIC8qIHRocmVlIGJ5dGVzICovXG4gICAgICBidWZbaSsrXSA9IDB4RTAgfCAoYyA+Pj4gMTIpO1xuICAgICAgYnVmW2krK10gPSAweDgwIHwgKGMgPj4+IDYgJiAweDNmKTtcbiAgICAgIGJ1ZltpKytdID0gMHg4MCB8IChjICYgMHgzZik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8qIGZvdXIgYnl0ZXMgKi9cbiAgICAgIGJ1ZltpKytdID0gMHhmMCB8IChjID4+PiAxOCk7XG4gICAgICBidWZbaSsrXSA9IDB4ODAgfCAoYyA+Pj4gMTIgJiAweDNmKTtcbiAgICAgIGJ1ZltpKytdID0gMHg4MCB8IChjID4+PiA2ICYgMHgzZik7XG4gICAgICBidWZbaSsrXSA9IDB4ODAgfCAoYyAmIDB4M2YpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWY7XG59O1xuXG4vLyBIZWxwZXIgKHVzZWQgaW4gMiBwbGFjZXMpXG5mdW5jdGlvbiBidWYyYmluc3RyaW5nKGJ1ZiwgbGVuKSB7XG4gIC8vIE9uIENocm9tZSwgdGhlIGFyZ3VtZW50cyBpbiBhIGZ1bmN0aW9uIGNhbGwgdGhhdCBhcmUgYWxsb3dlZCBpcyBgNjU1MzRgLlxuICAvLyBJZiB0aGUgbGVuZ3RoIG9mIHRoZSBidWZmZXIgaXMgc21hbGxlciB0aGFuIHRoYXQsIHdlIGNhbiB1c2UgdGhpcyBvcHRpbWl6YXRpb24sXG4gIC8vIG90aGVyd2lzZSB3ZSB3aWxsIHRha2UgYSBzbG93ZXIgcGF0aC5cbiAgaWYgKGxlbiA8IDY1NTM0KSB7XG4gICAgaWYgKChidWYuc3ViYXJyYXkgJiYgU1RSX0FQUExZX1VJQV9PSykgfHwgKCFidWYuc3ViYXJyYXkgJiYgU1RSX0FQUExZX09LKSkge1xuICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgdXRpbHMuc2hyaW5rQnVmKGJ1ZiwgbGVuKSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIHJlc3VsdCA9ICcnO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgcmVzdWx0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbi8vIENvbnZlcnQgYnl0ZSBhcnJheSB0byBiaW5hcnkgc3RyaW5nXG5leHBvcnRzLmJ1ZjJiaW5zdHJpbmcgPSBmdW5jdGlvbiAoYnVmKSB7XG4gIHJldHVybiBidWYyYmluc3RyaW5nKGJ1ZiwgYnVmLmxlbmd0aCk7XG59O1xuXG5cbi8vIENvbnZlcnQgYmluYXJ5IHN0cmluZyAodHlwZWQsIHdoZW4gcG9zc2libGUpXG5leHBvcnRzLmJpbnN0cmluZzJidWYgPSBmdW5jdGlvbiAoc3RyKSB7XG4gIHZhciBidWYgPSBuZXcgdXRpbHMuQnVmOChzdHIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGJ1Zi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGJ1ZltpXSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICB9XG4gIHJldHVybiBidWY7XG59O1xuXG5cbi8vIGNvbnZlcnQgYXJyYXkgdG8gc3RyaW5nXG5leHBvcnRzLmJ1ZjJzdHJpbmcgPSBmdW5jdGlvbiAoYnVmLCBtYXgpIHtcbiAgdmFyIGksIG91dCwgYywgY19sZW47XG4gIHZhciBsZW4gPSBtYXggfHwgYnVmLmxlbmd0aDtcblxuICAvLyBSZXNlcnZlIG1heCBwb3NzaWJsZSBsZW5ndGggKDIgd29yZHMgcGVyIGNoYXIpXG4gIC8vIE5COiBieSB1bmtub3duIHJlYXNvbnMsIEFycmF5IGlzIHNpZ25pZmljYW50bHkgZmFzdGVyIGZvclxuICAvLyAgICAgU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseSB0aGFuIFVpbnQxNkFycmF5LlxuICB2YXIgdXRmMTZidWYgPSBuZXcgQXJyYXkobGVuICogMik7XG5cbiAgZm9yIChvdXQgPSAwLCBpID0gMDsgaSA8IGxlbjspIHtcbiAgICBjID0gYnVmW2krK107XG4gICAgLy8gcXVpY2sgcHJvY2VzcyBhc2NpaVxuICAgIGlmIChjIDwgMHg4MCkgeyB1dGYxNmJ1ZltvdXQrK10gPSBjOyBjb250aW51ZTsgfVxuXG4gICAgY19sZW4gPSBfdXRmOGxlbltjXTtcbiAgICAvLyBza2lwIDUgJiA2IGJ5dGUgY29kZXNcbiAgICBpZiAoY19sZW4gPiA0KSB7IHV0ZjE2YnVmW291dCsrXSA9IDB4ZmZmZDsgaSArPSBjX2xlbiAtIDE7IGNvbnRpbnVlOyB9XG5cbiAgICAvLyBhcHBseSBtYXNrIG9uIGZpcnN0IGJ5dGVcbiAgICBjICY9IGNfbGVuID09PSAyID8gMHgxZiA6IGNfbGVuID09PSAzID8gMHgwZiA6IDB4MDc7XG4gICAgLy8gam9pbiB0aGUgcmVzdFxuICAgIHdoaWxlIChjX2xlbiA+IDEgJiYgaSA8IGxlbikge1xuICAgICAgYyA9IChjIDw8IDYpIHwgKGJ1ZltpKytdICYgMHgzZik7XG4gICAgICBjX2xlbi0tO1xuICAgIH1cblxuICAgIC8vIHRlcm1pbmF0ZWQgYnkgZW5kIG9mIHN0cmluZz9cbiAgICBpZiAoY19sZW4gPiAxKSB7IHV0ZjE2YnVmW291dCsrXSA9IDB4ZmZmZDsgY29udGludWU7IH1cblxuICAgIGlmIChjIDwgMHgxMDAwMCkge1xuICAgICAgdXRmMTZidWZbb3V0KytdID0gYztcbiAgICB9IGVsc2Uge1xuICAgICAgYyAtPSAweDEwMDAwO1xuICAgICAgdXRmMTZidWZbb3V0KytdID0gMHhkODAwIHwgKChjID4+IDEwKSAmIDB4M2ZmKTtcbiAgICAgIHV0ZjE2YnVmW291dCsrXSA9IDB4ZGMwMCB8IChjICYgMHgzZmYpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYyYmluc3RyaW5nKHV0ZjE2YnVmLCBvdXQpO1xufTtcblxuXG4vLyBDYWxjdWxhdGUgbWF4IHBvc3NpYmxlIHBvc2l0aW9uIGluIHV0ZjggYnVmZmVyLFxuLy8gdGhhdCB3aWxsIG5vdCBicmVhayBzZXF1ZW5jZS4gSWYgdGhhdCdzIG5vdCBwb3NzaWJsZVxuLy8gLSAodmVyeSBzbWFsbCBsaW1pdHMpIHJldHVybiBtYXggc2l6ZSBhcyBpcy5cbi8vXG4vLyBidWZbXSAtIHV0ZjggYnl0ZXMgYXJyYXlcbi8vIG1heCAgIC0gbGVuZ3RoIGxpbWl0IChtYW5kYXRvcnkpO1xuZXhwb3J0cy51dGY4Ym9yZGVyID0gZnVuY3Rpb24gKGJ1ZiwgbWF4KSB7XG4gIHZhciBwb3M7XG5cbiAgbWF4ID0gbWF4IHx8IGJ1Zi5sZW5ndGg7XG4gIGlmIChtYXggPiBidWYubGVuZ3RoKSB7IG1heCA9IGJ1Zi5sZW5ndGg7IH1cblxuICAvLyBnbyBiYWNrIGZyb20gbGFzdCBwb3NpdGlvbiwgdW50aWwgc3RhcnQgb2Ygc2VxdWVuY2UgZm91bmRcbiAgcG9zID0gbWF4IC0gMTtcbiAgd2hpbGUgKHBvcyA+PSAwICYmIChidWZbcG9zXSAmIDB4QzApID09PSAweDgwKSB7IHBvcy0tOyB9XG5cbiAgLy8gVmVyeSBzbWFsbCBhbmQgYnJva2VuIHNlcXVlbmNlLFxuICAvLyByZXR1cm4gbWF4LCBiZWNhdXNlIHdlIHNob3VsZCByZXR1cm4gc29tZXRoaW5nIGFueXdheS5cbiAgaWYgKHBvcyA8IDApIHsgcmV0dXJuIG1heDsgfVxuXG4gIC8vIElmIHdlIGNhbWUgdG8gc3RhcnQgb2YgYnVmZmVyIC0gdGhhdCBtZWFucyBidWZmZXIgaXMgdG9vIHNtYWxsLFxuICAvLyByZXR1cm4gbWF4IHRvby5cbiAgaWYgKHBvcyA9PT0gMCkgeyByZXR1cm4gbWF4OyB9XG5cbiAgcmV0dXJuIChwb3MgKyBfdXRmOGxlbltidWZbcG9zXV0gPiBtYXgpID8gcG9zIDogbWF4O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gTm90ZTogYWRsZXIzMiB0YWtlcyAxMiUgZm9yIGxldmVsIDAgYW5kIDIlIGZvciBsZXZlbCA2LlxuLy8gSXQgaXNuJ3Qgd29ydGggaXQgdG8gbWFrZSBhZGRpdGlvbmFsIG9wdGltaXphdGlvbnMgYXMgaW4gb3JpZ2luYWwuXG4vLyBTbWFsbCBzaXplIGlzIHByZWZlcmFibGUuXG5cbi8vIChDKSAxOTk1LTIwMTMgSmVhbi1sb3VwIEdhaWxseSBhbmQgTWFyayBBZGxlclxuLy8gKEMpIDIwMTQtMjAxNyBWaXRhbHkgUHV6cmluIGFuZCBBbmRyZXkgVHVwaXRzaW5cbi8vXG4vLyBUaGlzIHNvZnR3YXJlIGlzIHByb3ZpZGVkICdhcy1pcycsIHdpdGhvdXQgYW55IGV4cHJlc3Mgb3IgaW1wbGllZFxuLy8gd2FycmFudHkuIEluIG5vIGV2ZW50IHdpbGwgdGhlIGF1dGhvcnMgYmUgaGVsZCBsaWFibGUgZm9yIGFueSBkYW1hZ2VzXG4vLyBhcmlzaW5nIGZyb20gdGhlIHVzZSBvZiB0aGlzIHNvZnR3YXJlLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byBhbnlvbmUgdG8gdXNlIHRoaXMgc29mdHdhcmUgZm9yIGFueSBwdXJwb3NlLFxuLy8gaW5jbHVkaW5nIGNvbW1lcmNpYWwgYXBwbGljYXRpb25zLCBhbmQgdG8gYWx0ZXIgaXQgYW5kIHJlZGlzdHJpYnV0ZSBpdFxuLy8gZnJlZWx5LCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgcmVzdHJpY3Rpb25zOlxuLy9cbi8vIDEuIFRoZSBvcmlnaW4gb2YgdGhpcyBzb2Z0d2FyZSBtdXN0IG5vdCBiZSBtaXNyZXByZXNlbnRlZDsgeW91IG11c3Qgbm90XG4vLyAgIGNsYWltIHRoYXQgeW91IHdyb3RlIHRoZSBvcmlnaW5hbCBzb2Z0d2FyZS4gSWYgeW91IHVzZSB0aGlzIHNvZnR3YXJlXG4vLyAgIGluIGEgcHJvZHVjdCwgYW4gYWNrbm93bGVkZ21lbnQgaW4gdGhlIHByb2R1Y3QgZG9jdW1lbnRhdGlvbiB3b3VsZCBiZVxuLy8gICBhcHByZWNpYXRlZCBidXQgaXMgbm90IHJlcXVpcmVkLlxuLy8gMi4gQWx0ZXJlZCBzb3VyY2UgdmVyc2lvbnMgbXVzdCBiZSBwbGFpbmx5IG1hcmtlZCBhcyBzdWNoLCBhbmQgbXVzdCBub3QgYmVcbi8vICAgbWlzcmVwcmVzZW50ZWQgYXMgYmVpbmcgdGhlIG9yaWdpbmFsIHNvZnR3YXJlLlxuLy8gMy4gVGhpcyBub3RpY2UgbWF5IG5vdCBiZSByZW1vdmVkIG9yIGFsdGVyZWQgZnJvbSBhbnkgc291cmNlIGRpc3RyaWJ1dGlvbi5cblxuZnVuY3Rpb24gYWRsZXIzMihhZGxlciwgYnVmLCBsZW4sIHBvcykge1xuICB2YXIgczEgPSAoYWRsZXIgJiAweGZmZmYpIHwwLFxuICAgICAgczIgPSAoKGFkbGVyID4+PiAxNikgJiAweGZmZmYpIHwwLFxuICAgICAgbiA9IDA7XG5cbiAgd2hpbGUgKGxlbiAhPT0gMCkge1xuICAgIC8vIFNldCBsaW1pdCB+IHR3aWNlIGxlc3MgdGhhbiA1NTUyLCB0byBrZWVwXG4gICAgLy8gczIgaW4gMzEtYml0cywgYmVjYXVzZSB3ZSBmb3JjZSBzaWduZWQgaW50cy5cbiAgICAvLyBpbiBvdGhlciBjYXNlICU9IHdpbGwgZmFpbC5cbiAgICBuID0gbGVuID4gMjAwMCA/IDIwMDAgOiBsZW47XG4gICAgbGVuIC09IG47XG5cbiAgICBkbyB7XG4gICAgICBzMSA9IChzMSArIGJ1Zltwb3MrK10pIHwwO1xuICAgICAgczIgPSAoczIgKyBzMSkgfDA7XG4gICAgfSB3aGlsZSAoLS1uKTtcblxuICAgIHMxICU9IDY1NTIxO1xuICAgIHMyICU9IDY1NTIxO1xuICB9XG5cbiAgcmV0dXJuIChzMSB8IChzMiA8PCAxNikpIHwwO1xufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gYWRsZXIzMjtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gKEMpIDE5OTUtMjAxMyBKZWFuLWxvdXAgR2FpbGx5IGFuZCBNYXJrIEFkbGVyXG4vLyAoQykgMjAxNC0yMDE3IFZpdGFseSBQdXpyaW4gYW5kIEFuZHJleSBUdXBpdHNpblxuLy9cbi8vIFRoaXMgc29mdHdhcmUgaXMgcHJvdmlkZWQgJ2FzLWlzJywgd2l0aG91dCBhbnkgZXhwcmVzcyBvciBpbXBsaWVkXG4vLyB3YXJyYW50eS4gSW4gbm8gZXZlbnQgd2lsbCB0aGUgYXV0aG9ycyBiZSBoZWxkIGxpYWJsZSBmb3IgYW55IGRhbWFnZXNcbi8vIGFyaXNpbmcgZnJvbSB0aGUgdXNlIG9mIHRoaXMgc29mdHdhcmUuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIGFueW9uZSB0byB1c2UgdGhpcyBzb2Z0d2FyZSBmb3IgYW55IHB1cnBvc2UsXG4vLyBpbmNsdWRpbmcgY29tbWVyY2lhbCBhcHBsaWNhdGlvbnMsIGFuZCB0byBhbHRlciBpdCBhbmQgcmVkaXN0cmlidXRlIGl0XG4vLyBmcmVlbHksIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyByZXN0cmljdGlvbnM6XG4vL1xuLy8gMS4gVGhlIG9yaWdpbiBvZiB0aGlzIHNvZnR3YXJlIG11c3Qgbm90IGJlIG1pc3JlcHJlc2VudGVkOyB5b3UgbXVzdCBub3Rcbi8vICAgY2xhaW0gdGhhdCB5b3Ugd3JvdGUgdGhlIG9yaWdpbmFsIHNvZnR3YXJlLiBJZiB5b3UgdXNlIHRoaXMgc29mdHdhcmVcbi8vICAgaW4gYSBwcm9kdWN0LCBhbiBhY2tub3dsZWRnbWVudCBpbiB0aGUgcHJvZHVjdCBkb2N1bWVudGF0aW9uIHdvdWxkIGJlXG4vLyAgIGFwcHJlY2lhdGVkIGJ1dCBpcyBub3QgcmVxdWlyZWQuXG4vLyAyLiBBbHRlcmVkIHNvdXJjZSB2ZXJzaW9ucyBtdXN0IGJlIHBsYWlubHkgbWFya2VkIGFzIHN1Y2gsIGFuZCBtdXN0IG5vdCBiZVxuLy8gICBtaXNyZXByZXNlbnRlZCBhcyBiZWluZyB0aGUgb3JpZ2luYWwgc29mdHdhcmUuXG4vLyAzLiBUaGlzIG5vdGljZSBtYXkgbm90IGJlIHJlbW92ZWQgb3IgYWx0ZXJlZCBmcm9tIGFueSBzb3VyY2UgZGlzdHJpYnV0aW9uLlxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAvKiBBbGxvd2VkIGZsdXNoIHZhbHVlczsgc2VlIGRlZmxhdGUoKSBhbmQgaW5mbGF0ZSgpIGJlbG93IGZvciBkZXRhaWxzICovXG4gIFpfTk9fRkxVU0g6ICAgICAgICAgMCxcbiAgWl9QQVJUSUFMX0ZMVVNIOiAgICAxLFxuICBaX1NZTkNfRkxVU0g6ICAgICAgIDIsXG4gIFpfRlVMTF9GTFVTSDogICAgICAgMyxcbiAgWl9GSU5JU0g6ICAgICAgICAgICA0LFxuICBaX0JMT0NLOiAgICAgICAgICAgIDUsXG4gIFpfVFJFRVM6ICAgICAgICAgICAgNixcblxuICAvKiBSZXR1cm4gY29kZXMgZm9yIHRoZSBjb21wcmVzc2lvbi9kZWNvbXByZXNzaW9uIGZ1bmN0aW9ucy4gTmVnYXRpdmUgdmFsdWVzXG4gICogYXJlIGVycm9ycywgcG9zaXRpdmUgdmFsdWVzIGFyZSB1c2VkIGZvciBzcGVjaWFsIGJ1dCBub3JtYWwgZXZlbnRzLlxuICAqL1xuICBaX09LOiAgICAgICAgICAgICAgIDAsXG4gIFpfU1RSRUFNX0VORDogICAgICAgMSxcbiAgWl9ORUVEX0RJQ1Q6ICAgICAgICAyLFxuICBaX0VSUk5POiAgICAgICAgICAgLTEsXG4gIFpfU1RSRUFNX0VSUk9SOiAgICAtMixcbiAgWl9EQVRBX0VSUk9SOiAgICAgIC0zLFxuICAvL1pfTUVNX0VSUk9SOiAgICAgLTQsXG4gIFpfQlVGX0VSUk9SOiAgICAgICAtNSxcbiAgLy9aX1ZFUlNJT05fRVJST1I6IC02LFxuXG4gIC8qIGNvbXByZXNzaW9uIGxldmVscyAqL1xuICBaX05PX0NPTVBSRVNTSU9OOiAgICAgICAgIDAsXG4gIFpfQkVTVF9TUEVFRDogICAgICAgICAgICAgMSxcbiAgWl9CRVNUX0NPTVBSRVNTSU9OOiAgICAgICA5LFxuICBaX0RFRkFVTFRfQ09NUFJFU1NJT046ICAgLTEsXG5cblxuICBaX0ZJTFRFUkVEOiAgICAgICAgICAgICAgIDEsXG4gIFpfSFVGRk1BTl9PTkxZOiAgICAgICAgICAgMixcbiAgWl9STEU6ICAgICAgICAgICAgICAgICAgICAzLFxuICBaX0ZJWEVEOiAgICAgICAgICAgICAgICAgIDQsXG4gIFpfREVGQVVMVF9TVFJBVEVHWTogICAgICAgMCxcblxuICAvKiBQb3NzaWJsZSB2YWx1ZXMgb2YgdGhlIGRhdGFfdHlwZSBmaWVsZCAodGhvdWdoIHNlZSBpbmZsYXRlKCkpICovXG4gIFpfQklOQVJZOiAgICAgICAgICAgICAgICAgMCxcbiAgWl9URVhUOiAgICAgICAgICAgICAgICAgICAxLFxuICAvL1pfQVNDSUk6ICAgICAgICAgICAgICAgIDEsIC8vID0gWl9URVhUIChkZXByZWNhdGVkKVxuICBaX1VOS05PV046ICAgICAgICAgICAgICAgIDIsXG5cbiAgLyogVGhlIGRlZmxhdGUgY29tcHJlc3Npb24gbWV0aG9kICovXG4gIFpfREVGTEFURUQ6ICAgICAgICAgICAgICAgOFxuICAvL1pfTlVMTDogICAgICAgICAgICAgICAgIG51bGwgLy8gVXNlIC0xIG9yIG51bGwgaW5saW5lLCBkZXBlbmRpbmcgb24gdmFyIHR5cGVcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIE5vdGU6IHdlIGNhbid0IGdldCBzaWduaWZpY2FudCBzcGVlZCBib29zdCBoZXJlLlxuLy8gU28gd3JpdGUgY29kZSB0byBtaW5pbWl6ZSBzaXplIC0gbm8gcHJlZ2VuZXJhdGVkIHRhYmxlc1xuLy8gYW5kIGFycmF5IHRvb2xzIGRlcGVuZGVuY2llcy5cblxuLy8gKEMpIDE5OTUtMjAxMyBKZWFuLWxvdXAgR2FpbGx5IGFuZCBNYXJrIEFkbGVyXG4vLyAoQykgMjAxNC0yMDE3IFZpdGFseSBQdXpyaW4gYW5kIEFuZHJleSBUdXBpdHNpblxuLy9cbi8vIFRoaXMgc29mdHdhcmUgaXMgcHJvdmlkZWQgJ2FzLWlzJywgd2l0aG91dCBhbnkgZXhwcmVzcyBvciBpbXBsaWVkXG4vLyB3YXJyYW50eS4gSW4gbm8gZXZlbnQgd2lsbCB0aGUgYXV0aG9ycyBiZSBoZWxkIGxpYWJsZSBmb3IgYW55IGRhbWFnZXNcbi8vIGFyaXNpbmcgZnJvbSB0aGUgdXNlIG9mIHRoaXMgc29mdHdhcmUuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIGFueW9uZSB0byB1c2UgdGhpcyBzb2Z0d2FyZSBmb3IgYW55IHB1cnBvc2UsXG4vLyBpbmNsdWRpbmcgY29tbWVyY2lhbCBhcHBsaWNhdGlvbnMsIGFuZCB0byBhbHRlciBpdCBhbmQgcmVkaXN0cmlidXRlIGl0XG4vLyBmcmVlbHksIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyByZXN0cmljdGlvbnM6XG4vL1xuLy8gMS4gVGhlIG9yaWdpbiBvZiB0aGlzIHNvZnR3YXJlIG11c3Qgbm90IGJlIG1pc3JlcHJlc2VudGVkOyB5b3UgbXVzdCBub3Rcbi8vICAgY2xhaW0gdGhhdCB5b3Ugd3JvdGUgdGhlIG9yaWdpbmFsIHNvZnR3YXJlLiBJZiB5b3UgdXNlIHRoaXMgc29mdHdhcmVcbi8vICAgaW4gYSBwcm9kdWN0LCBhbiBhY2tub3dsZWRnbWVudCBpbiB0aGUgcHJvZHVjdCBkb2N1bWVudGF0aW9uIHdvdWxkIGJlXG4vLyAgIGFwcHJlY2lhdGVkIGJ1dCBpcyBub3QgcmVxdWlyZWQuXG4vLyAyLiBBbHRlcmVkIHNvdXJjZSB2ZXJzaW9ucyBtdXN0IGJlIHBsYWlubHkgbWFya2VkIGFzIHN1Y2gsIGFuZCBtdXN0IG5vdCBiZVxuLy8gICBtaXNyZXByZXNlbnRlZCBhcyBiZWluZyB0aGUgb3JpZ2luYWwgc29mdHdhcmUuXG4vLyAzLiBUaGlzIG5vdGljZSBtYXkgbm90IGJlIHJlbW92ZWQgb3IgYWx0ZXJlZCBmcm9tIGFueSBzb3VyY2UgZGlzdHJpYnV0aW9uLlxuXG4vLyBVc2Ugb3JkaW5hcnkgYXJyYXksIHNpbmNlIHVudHlwZWQgbWFrZXMgbm8gYm9vc3QgaGVyZVxuZnVuY3Rpb24gbWFrZVRhYmxlKCkge1xuICB2YXIgYywgdGFibGUgPSBbXTtcblxuICBmb3IgKHZhciBuID0gMDsgbiA8IDI1NjsgbisrKSB7XG4gICAgYyA9IG47XG4gICAgZm9yICh2YXIgayA9IDA7IGsgPCA4OyBrKyspIHtcbiAgICAgIGMgPSAoKGMgJiAxKSA/ICgweEVEQjg4MzIwIF4gKGMgPj4+IDEpKSA6IChjID4+PiAxKSk7XG4gICAgfVxuICAgIHRhYmxlW25dID0gYztcbiAgfVxuXG4gIHJldHVybiB0YWJsZTtcbn1cblxuLy8gQ3JlYXRlIHRhYmxlIG9uIGxvYWQuIEp1c3QgMjU1IHNpZ25lZCBsb25ncy4gTm90IGEgcHJvYmxlbS5cbnZhciBjcmNUYWJsZSA9IG1ha2VUYWJsZSgpO1xuXG5cbmZ1bmN0aW9uIGNyYzMyKGNyYywgYnVmLCBsZW4sIHBvcykge1xuICB2YXIgdCA9IGNyY1RhYmxlLFxuICAgICAgZW5kID0gcG9zICsgbGVuO1xuXG4gIGNyYyBePSAtMTtcblxuICBmb3IgKHZhciBpID0gcG9zOyBpIDwgZW5kOyBpKyspIHtcbiAgICBjcmMgPSAoY3JjID4+PiA4KSBeIHRbKGNyYyBeIGJ1ZltpXSkgJiAweEZGXTtcbiAgfVxuXG4gIHJldHVybiAoY3JjIF4gKC0xKSk7IC8vID4+PiAwO1xufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gY3JjMzI7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIChDKSAxOTk1LTIwMTMgSmVhbi1sb3VwIEdhaWxseSBhbmQgTWFyayBBZGxlclxuLy8gKEMpIDIwMTQtMjAxNyBWaXRhbHkgUHV6cmluIGFuZCBBbmRyZXkgVHVwaXRzaW5cbi8vXG4vLyBUaGlzIHNvZnR3YXJlIGlzIHByb3ZpZGVkICdhcy1pcycsIHdpdGhvdXQgYW55IGV4cHJlc3Mgb3IgaW1wbGllZFxuLy8gd2FycmFudHkuIEluIG5vIGV2ZW50IHdpbGwgdGhlIGF1dGhvcnMgYmUgaGVsZCBsaWFibGUgZm9yIGFueSBkYW1hZ2VzXG4vLyBhcmlzaW5nIGZyb20gdGhlIHVzZSBvZiB0aGlzIHNvZnR3YXJlLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byBhbnlvbmUgdG8gdXNlIHRoaXMgc29mdHdhcmUgZm9yIGFueSBwdXJwb3NlLFxuLy8gaW5jbHVkaW5nIGNvbW1lcmNpYWwgYXBwbGljYXRpb25zLCBhbmQgdG8gYWx0ZXIgaXQgYW5kIHJlZGlzdHJpYnV0ZSBpdFxuLy8gZnJlZWx5LCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgcmVzdHJpY3Rpb25zOlxuLy9cbi8vIDEuIFRoZSBvcmlnaW4gb2YgdGhpcyBzb2Z0d2FyZSBtdXN0IG5vdCBiZSBtaXNyZXByZXNlbnRlZDsgeW91IG11c3Qgbm90XG4vLyAgIGNsYWltIHRoYXQgeW91IHdyb3RlIHRoZSBvcmlnaW5hbCBzb2Z0d2FyZS4gSWYgeW91IHVzZSB0aGlzIHNvZnR3YXJlXG4vLyAgIGluIGEgcHJvZHVjdCwgYW4gYWNrbm93bGVkZ21lbnQgaW4gdGhlIHByb2R1Y3QgZG9jdW1lbnRhdGlvbiB3b3VsZCBiZVxuLy8gICBhcHByZWNpYXRlZCBidXQgaXMgbm90IHJlcXVpcmVkLlxuLy8gMi4gQWx0ZXJlZCBzb3VyY2UgdmVyc2lvbnMgbXVzdCBiZSBwbGFpbmx5IG1hcmtlZCBhcyBzdWNoLCBhbmQgbXVzdCBub3QgYmVcbi8vICAgbWlzcmVwcmVzZW50ZWQgYXMgYmVpbmcgdGhlIG9yaWdpbmFsIHNvZnR3YXJlLlxuLy8gMy4gVGhpcyBub3RpY2UgbWF5IG5vdCBiZSByZW1vdmVkIG9yIGFsdGVyZWQgZnJvbSBhbnkgc291cmNlIGRpc3RyaWJ1dGlvbi5cblxudmFyIHV0aWxzICAgPSByZXF1aXJlKCcuLi91dGlscy9jb21tb24nKTtcbnZhciB0cmVlcyAgID0gcmVxdWlyZSgnLi90cmVlcycpO1xudmFyIGFkbGVyMzIgPSByZXF1aXJlKCcuL2FkbGVyMzInKTtcbnZhciBjcmMzMiAgID0gcmVxdWlyZSgnLi9jcmMzMicpO1xudmFyIG1zZyAgICAgPSByZXF1aXJlKCcuL21lc3NhZ2VzJyk7XG5cbi8qIFB1YmxpYyBjb25zdGFudHMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuXG5cbi8qIEFsbG93ZWQgZmx1c2ggdmFsdWVzOyBzZWUgZGVmbGF0ZSgpIGFuZCBpbmZsYXRlKCkgYmVsb3cgZm9yIGRldGFpbHMgKi9cbnZhciBaX05PX0ZMVVNIICAgICAgPSAwO1xudmFyIFpfUEFSVElBTF9GTFVTSCA9IDE7XG4vL3ZhciBaX1NZTkNfRkxVU0ggICAgPSAyO1xudmFyIFpfRlVMTF9GTFVTSCAgICA9IDM7XG52YXIgWl9GSU5JU0ggICAgICAgID0gNDtcbnZhciBaX0JMT0NLICAgICAgICAgPSA1O1xuLy92YXIgWl9UUkVFUyAgICAgICAgID0gNjtcblxuXG4vKiBSZXR1cm4gY29kZXMgZm9yIHRoZSBjb21wcmVzc2lvbi9kZWNvbXByZXNzaW9uIGZ1bmN0aW9ucy4gTmVnYXRpdmUgdmFsdWVzXG4gKiBhcmUgZXJyb3JzLCBwb3NpdGl2ZSB2YWx1ZXMgYXJlIHVzZWQgZm9yIHNwZWNpYWwgYnV0IG5vcm1hbCBldmVudHMuXG4gKi9cbnZhciBaX09LICAgICAgICAgICAgPSAwO1xudmFyIFpfU1RSRUFNX0VORCAgICA9IDE7XG4vL3ZhciBaX05FRURfRElDVCAgICAgPSAyO1xuLy92YXIgWl9FUlJOTyAgICAgICAgID0gLTE7XG52YXIgWl9TVFJFQU1fRVJST1IgID0gLTI7XG52YXIgWl9EQVRBX0VSUk9SICAgID0gLTM7XG4vL3ZhciBaX01FTV9FUlJPUiAgICAgPSAtNDtcbnZhciBaX0JVRl9FUlJPUiAgICAgPSAtNTtcbi8vdmFyIFpfVkVSU0lPTl9FUlJPUiA9IC02O1xuXG5cbi8qIGNvbXByZXNzaW9uIGxldmVscyAqL1xuLy92YXIgWl9OT19DT01QUkVTU0lPTiAgICAgID0gMDtcbi8vdmFyIFpfQkVTVF9TUEVFRCAgICAgICAgICA9IDE7XG4vL3ZhciBaX0JFU1RfQ09NUFJFU1NJT04gICAgPSA5O1xudmFyIFpfREVGQVVMVF9DT01QUkVTU0lPTiA9IC0xO1xuXG5cbnZhciBaX0ZJTFRFUkVEICAgICAgICAgICAgPSAxO1xudmFyIFpfSFVGRk1BTl9PTkxZICAgICAgICA9IDI7XG52YXIgWl9STEUgICAgICAgICAgICAgICAgID0gMztcbnZhciBaX0ZJWEVEICAgICAgICAgICAgICAgPSA0O1xudmFyIFpfREVGQVVMVF9TVFJBVEVHWSAgICA9IDA7XG5cbi8qIFBvc3NpYmxlIHZhbHVlcyBvZiB0aGUgZGF0YV90eXBlIGZpZWxkICh0aG91Z2ggc2VlIGluZmxhdGUoKSkgKi9cbi8vdmFyIFpfQklOQVJZICAgICAgICAgICAgICA9IDA7XG4vL3ZhciBaX1RFWFQgICAgICAgICAgICAgICAgPSAxO1xuLy92YXIgWl9BU0NJSSAgICAgICAgICAgICAgID0gMTsgLy8gPSBaX1RFWFRcbnZhciBaX1VOS05PV04gICAgICAgICAgICAgPSAyO1xuXG5cbi8qIFRoZSBkZWZsYXRlIGNvbXByZXNzaW9uIG1ldGhvZCAqL1xudmFyIFpfREVGTEFURUQgID0gODtcblxuLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cblxuXG52YXIgTUFYX01FTV9MRVZFTCA9IDk7XG4vKiBNYXhpbXVtIHZhbHVlIGZvciBtZW1MZXZlbCBpbiBkZWZsYXRlSW5pdDIgKi9cbnZhciBNQVhfV0JJVFMgPSAxNTtcbi8qIDMySyBMWjc3IHdpbmRvdyAqL1xudmFyIERFRl9NRU1fTEVWRUwgPSA4O1xuXG5cbnZhciBMRU5HVEhfQ09ERVMgID0gMjk7XG4vKiBudW1iZXIgb2YgbGVuZ3RoIGNvZGVzLCBub3QgY291bnRpbmcgdGhlIHNwZWNpYWwgRU5EX0JMT0NLIGNvZGUgKi9cbnZhciBMSVRFUkFMUyAgICAgID0gMjU2O1xuLyogbnVtYmVyIG9mIGxpdGVyYWwgYnl0ZXMgMC4uMjU1ICovXG52YXIgTF9DT0RFUyAgICAgICA9IExJVEVSQUxTICsgMSArIExFTkdUSF9DT0RFUztcbi8qIG51bWJlciBvZiBMaXRlcmFsIG9yIExlbmd0aCBjb2RlcywgaW5jbHVkaW5nIHRoZSBFTkRfQkxPQ0sgY29kZSAqL1xudmFyIERfQ09ERVMgICAgICAgPSAzMDtcbi8qIG51bWJlciBvZiBkaXN0YW5jZSBjb2RlcyAqL1xudmFyIEJMX0NPREVTICAgICAgPSAxOTtcbi8qIG51bWJlciBvZiBjb2RlcyB1c2VkIHRvIHRyYW5zZmVyIHRoZSBiaXQgbGVuZ3RocyAqL1xudmFyIEhFQVBfU0laRSAgICAgPSAyICogTF9DT0RFUyArIDE7XG4vKiBtYXhpbXVtIGhlYXAgc2l6ZSAqL1xudmFyIE1BWF9CSVRTICA9IDE1O1xuLyogQWxsIGNvZGVzIG11c3Qgbm90IGV4Y2VlZCBNQVhfQklUUyBiaXRzICovXG5cbnZhciBNSU5fTUFUQ0ggPSAzO1xudmFyIE1BWF9NQVRDSCA9IDI1ODtcbnZhciBNSU5fTE9PS0FIRUFEID0gKE1BWF9NQVRDSCArIE1JTl9NQVRDSCArIDEpO1xuXG52YXIgUFJFU0VUX0RJQ1QgPSAweDIwO1xuXG52YXIgSU5JVF9TVEFURSA9IDQyO1xudmFyIEVYVFJBX1NUQVRFID0gNjk7XG52YXIgTkFNRV9TVEFURSA9IDczO1xudmFyIENPTU1FTlRfU1RBVEUgPSA5MTtcbnZhciBIQ1JDX1NUQVRFID0gMTAzO1xudmFyIEJVU1lfU1RBVEUgPSAxMTM7XG52YXIgRklOSVNIX1NUQVRFID0gNjY2O1xuXG52YXIgQlNfTkVFRF9NT1JFICAgICAgPSAxOyAvKiBibG9jayBub3QgY29tcGxldGVkLCBuZWVkIG1vcmUgaW5wdXQgb3IgbW9yZSBvdXRwdXQgKi9cbnZhciBCU19CTE9DS19ET05FICAgICA9IDI7IC8qIGJsb2NrIGZsdXNoIHBlcmZvcm1lZCAqL1xudmFyIEJTX0ZJTklTSF9TVEFSVEVEID0gMzsgLyogZmluaXNoIHN0YXJ0ZWQsIG5lZWQgb25seSBtb3JlIG91dHB1dCBhdCBuZXh0IGRlZmxhdGUgKi9cbnZhciBCU19GSU5JU0hfRE9ORSAgICA9IDQ7IC8qIGZpbmlzaCBkb25lLCBhY2NlcHQgbm8gbW9yZSBpbnB1dCBvciBvdXRwdXQgKi9cblxudmFyIE9TX0NPREUgPSAweDAzOyAvLyBVbml4IDopIC4gRG9uJ3QgZGV0ZWN0LCB1c2UgdGhpcyBkZWZhdWx0LlxuXG5mdW5jdGlvbiBlcnIoc3RybSwgZXJyb3JDb2RlKSB7XG4gIHN0cm0ubXNnID0gbXNnW2Vycm9yQ29kZV07XG4gIHJldHVybiBlcnJvckNvZGU7XG59XG5cbmZ1bmN0aW9uIHJhbmsoZikge1xuICByZXR1cm4gKChmKSA8PCAxKSAtICgoZikgPiA0ID8gOSA6IDApO1xufVxuXG5mdW5jdGlvbiB6ZXJvKGJ1ZikgeyB2YXIgbGVuID0gYnVmLmxlbmd0aDsgd2hpbGUgKC0tbGVuID49IDApIHsgYnVmW2xlbl0gPSAwOyB9IH1cblxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBGbHVzaCBhcyBtdWNoIHBlbmRpbmcgb3V0cHV0IGFzIHBvc3NpYmxlLiBBbGwgZGVmbGF0ZSgpIG91dHB1dCBnb2VzXG4gKiB0aHJvdWdoIHRoaXMgZnVuY3Rpb24gc28gc29tZSBhcHBsaWNhdGlvbnMgbWF5IHdpc2ggdG8gbW9kaWZ5IGl0XG4gKiB0byBhdm9pZCBhbGxvY2F0aW5nIGEgbGFyZ2Ugc3RybS0+b3V0cHV0IGJ1ZmZlciBhbmQgY29weWluZyBpbnRvIGl0LlxuICogKFNlZSBhbHNvIHJlYWRfYnVmKCkpLlxuICovXG5mdW5jdGlvbiBmbHVzaF9wZW5kaW5nKHN0cm0pIHtcbiAgdmFyIHMgPSBzdHJtLnN0YXRlO1xuXG4gIC8vX3RyX2ZsdXNoX2JpdHMocyk7XG4gIHZhciBsZW4gPSBzLnBlbmRpbmc7XG4gIGlmIChsZW4gPiBzdHJtLmF2YWlsX291dCkge1xuICAgIGxlbiA9IHN0cm0uYXZhaWxfb3V0O1xuICB9XG4gIGlmIChsZW4gPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgdXRpbHMuYXJyYXlTZXQoc3RybS5vdXRwdXQsIHMucGVuZGluZ19idWYsIHMucGVuZGluZ19vdXQsIGxlbiwgc3RybS5uZXh0X291dCk7XG4gIHN0cm0ubmV4dF9vdXQgKz0gbGVuO1xuICBzLnBlbmRpbmdfb3V0ICs9IGxlbjtcbiAgc3RybS50b3RhbF9vdXQgKz0gbGVuO1xuICBzdHJtLmF2YWlsX291dCAtPSBsZW47XG4gIHMucGVuZGluZyAtPSBsZW47XG4gIGlmIChzLnBlbmRpbmcgPT09IDApIHtcbiAgICBzLnBlbmRpbmdfb3V0ID0gMDtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGZsdXNoX2Jsb2NrX29ubHkocywgbGFzdCkge1xuICB0cmVlcy5fdHJfZmx1c2hfYmxvY2socywgKHMuYmxvY2tfc3RhcnQgPj0gMCA/IHMuYmxvY2tfc3RhcnQgOiAtMSksIHMuc3Ryc3RhcnQgLSBzLmJsb2NrX3N0YXJ0LCBsYXN0KTtcbiAgcy5ibG9ja19zdGFydCA9IHMuc3Ryc3RhcnQ7XG4gIGZsdXNoX3BlbmRpbmcocy5zdHJtKTtcbn1cblxuXG5mdW5jdGlvbiBwdXRfYnl0ZShzLCBiKSB7XG4gIHMucGVuZGluZ19idWZbcy5wZW5kaW5nKytdID0gYjtcbn1cblxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBQdXQgYSBzaG9ydCBpbiB0aGUgcGVuZGluZyBidWZmZXIuIFRoZSAxNi1iaXQgdmFsdWUgaXMgcHV0IGluIE1TQiBvcmRlci5cbiAqIElOIGFzc2VydGlvbjogdGhlIHN0cmVhbSBzdGF0ZSBpcyBjb3JyZWN0IGFuZCB0aGVyZSBpcyBlbm91Z2ggcm9vbSBpblxuICogcGVuZGluZ19idWYuXG4gKi9cbmZ1bmN0aW9uIHB1dFNob3J0TVNCKHMsIGIpIHtcbi8vICBwdXRfYnl0ZShzLCAoQnl0ZSkoYiA+PiA4KSk7XG4vLyAgcHV0X2J5dGUocywgKEJ5dGUpKGIgJiAweGZmKSk7XG4gIHMucGVuZGluZ19idWZbcy5wZW5kaW5nKytdID0gKGIgPj4+IDgpICYgMHhmZjtcbiAgcy5wZW5kaW5nX2J1ZltzLnBlbmRpbmcrK10gPSBiICYgMHhmZjtcbn1cblxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIFJlYWQgYSBuZXcgYnVmZmVyIGZyb20gdGhlIGN1cnJlbnQgaW5wdXQgc3RyZWFtLCB1cGRhdGUgdGhlIGFkbGVyMzJcbiAqIGFuZCB0b3RhbCBudW1iZXIgb2YgYnl0ZXMgcmVhZC4gIEFsbCBkZWZsYXRlKCkgaW5wdXQgZ29lcyB0aHJvdWdoXG4gKiB0aGlzIGZ1bmN0aW9uIHNvIHNvbWUgYXBwbGljYXRpb25zIG1heSB3aXNoIHRvIG1vZGlmeSBpdCB0byBhdm9pZFxuICogYWxsb2NhdGluZyBhIGxhcmdlIHN0cm0tPmlucHV0IGJ1ZmZlciBhbmQgY29weWluZyBmcm9tIGl0LlxuICogKFNlZSBhbHNvIGZsdXNoX3BlbmRpbmcoKSkuXG4gKi9cbmZ1bmN0aW9uIHJlYWRfYnVmKHN0cm0sIGJ1Ziwgc3RhcnQsIHNpemUpIHtcbiAgdmFyIGxlbiA9IHN0cm0uYXZhaWxfaW47XG5cbiAgaWYgKGxlbiA+IHNpemUpIHsgbGVuID0gc2l6ZTsgfVxuICBpZiAobGVuID09PSAwKSB7IHJldHVybiAwOyB9XG5cbiAgc3RybS5hdmFpbF9pbiAtPSBsZW47XG5cbiAgLy8gem1lbWNweShidWYsIHN0cm0tPm5leHRfaW4sIGxlbik7XG4gIHV0aWxzLmFycmF5U2V0KGJ1Ziwgc3RybS5pbnB1dCwgc3RybS5uZXh0X2luLCBsZW4sIHN0YXJ0KTtcbiAgaWYgKHN0cm0uc3RhdGUud3JhcCA9PT0gMSkge1xuICAgIHN0cm0uYWRsZXIgPSBhZGxlcjMyKHN0cm0uYWRsZXIsIGJ1ZiwgbGVuLCBzdGFydCk7XG4gIH1cblxuICBlbHNlIGlmIChzdHJtLnN0YXRlLndyYXAgPT09IDIpIHtcbiAgICBzdHJtLmFkbGVyID0gY3JjMzIoc3RybS5hZGxlciwgYnVmLCBsZW4sIHN0YXJ0KTtcbiAgfVxuXG4gIHN0cm0ubmV4dF9pbiArPSBsZW47XG4gIHN0cm0udG90YWxfaW4gKz0gbGVuO1xuXG4gIHJldHVybiBsZW47XG59XG5cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBTZXQgbWF0Y2hfc3RhcnQgdG8gdGhlIGxvbmdlc3QgbWF0Y2ggc3RhcnRpbmcgYXQgdGhlIGdpdmVuIHN0cmluZyBhbmRcbiAqIHJldHVybiBpdHMgbGVuZ3RoLiBNYXRjaGVzIHNob3J0ZXIgb3IgZXF1YWwgdG8gcHJldl9sZW5ndGggYXJlIGRpc2NhcmRlZCxcbiAqIGluIHdoaWNoIGNhc2UgdGhlIHJlc3VsdCBpcyBlcXVhbCB0byBwcmV2X2xlbmd0aCBhbmQgbWF0Y2hfc3RhcnQgaXNcbiAqIGdhcmJhZ2UuXG4gKiBJTiBhc3NlcnRpb25zOiBjdXJfbWF0Y2ggaXMgdGhlIGhlYWQgb2YgdGhlIGhhc2ggY2hhaW4gZm9yIHRoZSBjdXJyZW50XG4gKiAgIHN0cmluZyAoc3Ryc3RhcnQpIGFuZCBpdHMgZGlzdGFuY2UgaXMgPD0gTUFYX0RJU1QsIGFuZCBwcmV2X2xlbmd0aCA+PSAxXG4gKiBPVVQgYXNzZXJ0aW9uOiB0aGUgbWF0Y2ggbGVuZ3RoIGlzIG5vdCBncmVhdGVyIHRoYW4gcy0+bG9va2FoZWFkLlxuICovXG5mdW5jdGlvbiBsb25nZXN0X21hdGNoKHMsIGN1cl9tYXRjaCkge1xuICB2YXIgY2hhaW5fbGVuZ3RoID0gcy5tYXhfY2hhaW5fbGVuZ3RoOyAgICAgIC8qIG1heCBoYXNoIGNoYWluIGxlbmd0aCAqL1xuICB2YXIgc2NhbiA9IHMuc3Ryc3RhcnQ7IC8qIGN1cnJlbnQgc3RyaW5nICovXG4gIHZhciBtYXRjaDsgICAgICAgICAgICAgICAgICAgICAgIC8qIG1hdGNoZWQgc3RyaW5nICovXG4gIHZhciBsZW47ICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogbGVuZ3RoIG9mIGN1cnJlbnQgbWF0Y2ggKi9cbiAgdmFyIGJlc3RfbGVuID0gcy5wcmV2X2xlbmd0aDsgICAgICAgICAgICAgIC8qIGJlc3QgbWF0Y2ggbGVuZ3RoIHNvIGZhciAqL1xuICB2YXIgbmljZV9tYXRjaCA9IHMubmljZV9tYXRjaDsgICAgICAgICAgICAgLyogc3RvcCBpZiBtYXRjaCBsb25nIGVub3VnaCAqL1xuICB2YXIgbGltaXQgPSAocy5zdHJzdGFydCA+IChzLndfc2l6ZSAtIE1JTl9MT09LQUhFQUQpKSA/XG4gICAgICBzLnN0cnN0YXJ0IC0gKHMud19zaXplIC0gTUlOX0xPT0tBSEVBRCkgOiAwLypOSUwqLztcblxuICB2YXIgX3dpbiA9IHMud2luZG93OyAvLyBzaG9ydGN1dFxuXG4gIHZhciB3bWFzayA9IHMud19tYXNrO1xuICB2YXIgcHJldiAgPSBzLnByZXY7XG5cbiAgLyogU3RvcCB3aGVuIGN1cl9tYXRjaCBiZWNvbWVzIDw9IGxpbWl0LiBUbyBzaW1wbGlmeSB0aGUgY29kZSxcbiAgICogd2UgcHJldmVudCBtYXRjaGVzIHdpdGggdGhlIHN0cmluZyBvZiB3aW5kb3cgaW5kZXggMC5cbiAgICovXG5cbiAgdmFyIHN0cmVuZCA9IHMuc3Ryc3RhcnQgKyBNQVhfTUFUQ0g7XG4gIHZhciBzY2FuX2VuZDEgID0gX3dpbltzY2FuICsgYmVzdF9sZW4gLSAxXTtcbiAgdmFyIHNjYW5fZW5kICAgPSBfd2luW3NjYW4gKyBiZXN0X2xlbl07XG5cbiAgLyogVGhlIGNvZGUgaXMgb3B0aW1pemVkIGZvciBIQVNIX0JJVFMgPj0gOCBhbmQgTUFYX01BVENILTIgbXVsdGlwbGUgb2YgMTYuXG4gICAqIEl0IGlzIGVhc3kgdG8gZ2V0IHJpZCBvZiB0aGlzIG9wdGltaXphdGlvbiBpZiBuZWNlc3NhcnkuXG4gICAqL1xuICAvLyBBc3NlcnQocy0+aGFzaF9iaXRzID49IDggJiYgTUFYX01BVENIID09IDI1OCwgXCJDb2RlIHRvbyBjbGV2ZXJcIik7XG5cbiAgLyogRG8gbm90IHdhc3RlIHRvbyBtdWNoIHRpbWUgaWYgd2UgYWxyZWFkeSBoYXZlIGEgZ29vZCBtYXRjaDogKi9cbiAgaWYgKHMucHJldl9sZW5ndGggPj0gcy5nb29kX21hdGNoKSB7XG4gICAgY2hhaW5fbGVuZ3RoID4+PSAyO1xuICB9XG4gIC8qIERvIG5vdCBsb29rIGZvciBtYXRjaGVzIGJleW9uZCB0aGUgZW5kIG9mIHRoZSBpbnB1dC4gVGhpcyBpcyBuZWNlc3NhcnlcbiAgICogdG8gbWFrZSBkZWZsYXRlIGRldGVybWluaXN0aWMuXG4gICAqL1xuICBpZiAobmljZV9tYXRjaCA+IHMubG9va2FoZWFkKSB7IG5pY2VfbWF0Y2ggPSBzLmxvb2thaGVhZDsgfVxuXG4gIC8vIEFzc2VydCgodWxnKXMtPnN0cnN0YXJ0IDw9IHMtPndpbmRvd19zaXplLU1JTl9MT09LQUhFQUQsIFwibmVlZCBsb29rYWhlYWRcIik7XG5cbiAgZG8ge1xuICAgIC8vIEFzc2VydChjdXJfbWF0Y2ggPCBzLT5zdHJzdGFydCwgXCJubyBmdXR1cmVcIik7XG4gICAgbWF0Y2ggPSBjdXJfbWF0Y2g7XG5cbiAgICAvKiBTa2lwIHRvIG5leHQgbWF0Y2ggaWYgdGhlIG1hdGNoIGxlbmd0aCBjYW5ub3QgaW5jcmVhc2VcbiAgICAgKiBvciBpZiB0aGUgbWF0Y2ggbGVuZ3RoIGlzIGxlc3MgdGhhbiAyLiAgTm90ZSB0aGF0IHRoZSBjaGVja3MgYmVsb3dcbiAgICAgKiBmb3IgaW5zdWZmaWNpZW50IGxvb2thaGVhZCBvbmx5IG9jY3VyIG9jY2FzaW9uYWxseSBmb3IgcGVyZm9ybWFuY2VcbiAgICAgKiByZWFzb25zLiAgVGhlcmVmb3JlIHVuaW5pdGlhbGl6ZWQgbWVtb3J5IHdpbGwgYmUgYWNjZXNzZWQsIGFuZFxuICAgICAqIGNvbmRpdGlvbmFsIGp1bXBzIHdpbGwgYmUgbWFkZSB0aGF0IGRlcGVuZCBvbiB0aG9zZSB2YWx1ZXMuXG4gICAgICogSG93ZXZlciB0aGUgbGVuZ3RoIG9mIHRoZSBtYXRjaCBpcyBsaW1pdGVkIHRvIHRoZSBsb29rYWhlYWQsIHNvXG4gICAgICogdGhlIG91dHB1dCBvZiBkZWZsYXRlIGlzIG5vdCBhZmZlY3RlZCBieSB0aGUgdW5pbml0aWFsaXplZCB2YWx1ZXMuXG4gICAgICovXG5cbiAgICBpZiAoX3dpblttYXRjaCArIGJlc3RfbGVuXSAgICAgIT09IHNjYW5fZW5kICB8fFxuICAgICAgICBfd2luW21hdGNoICsgYmVzdF9sZW4gLSAxXSAhPT0gc2Nhbl9lbmQxIHx8XG4gICAgICAgIF93aW5bbWF0Y2hdICAgICAgICAgICAgICAgICE9PSBfd2luW3NjYW5dIHx8XG4gICAgICAgIF93aW5bKyttYXRjaF0gICAgICAgICAgICAgICE9PSBfd2luW3NjYW4gKyAxXSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyogVGhlIGNoZWNrIGF0IGJlc3RfbGVuLTEgY2FuIGJlIHJlbW92ZWQgYmVjYXVzZSBpdCB3aWxsIGJlIG1hZGVcbiAgICAgKiBhZ2FpbiBsYXRlci4gKFRoaXMgaGV1cmlzdGljIGlzIG5vdCBhbHdheXMgYSB3aW4uKVxuICAgICAqIEl0IGlzIG5vdCBuZWNlc3NhcnkgdG8gY29tcGFyZSBzY2FuWzJdIGFuZCBtYXRjaFsyXSBzaW5jZSB0aGV5XG4gICAgICogYXJlIGFsd2F5cyBlcXVhbCB3aGVuIHRoZSBvdGhlciBieXRlcyBtYXRjaCwgZ2l2ZW4gdGhhdFxuICAgICAqIHRoZSBoYXNoIGtleXMgYXJlIGVxdWFsIGFuZCB0aGF0IEhBU0hfQklUUyA+PSA4LlxuICAgICAqL1xuICAgIHNjYW4gKz0gMjtcbiAgICBtYXRjaCsrO1xuICAgIC8vIEFzc2VydCgqc2NhbiA9PSAqbWF0Y2gsIFwibWF0Y2hbMl0/XCIpO1xuXG4gICAgLyogV2UgY2hlY2sgZm9yIGluc3VmZmljaWVudCBsb29rYWhlYWQgb25seSBldmVyeSA4dGggY29tcGFyaXNvbjtcbiAgICAgKiB0aGUgMjU2dGggY2hlY2sgd2lsbCBiZSBtYWRlIGF0IHN0cnN0YXJ0KzI1OC5cbiAgICAgKi9cbiAgICBkbyB7XG4gICAgICAvKmpzaGludCBub2VtcHR5OmZhbHNlKi9cbiAgICB9IHdoaWxlIChfd2luWysrc2Nhbl0gPT09IF93aW5bKyttYXRjaF0gJiYgX3dpblsrK3NjYW5dID09PSBfd2luWysrbWF0Y2hdICYmXG4gICAgICAgICAgICAgX3dpblsrK3NjYW5dID09PSBfd2luWysrbWF0Y2hdICYmIF93aW5bKytzY2FuXSA9PT0gX3dpblsrK21hdGNoXSAmJlxuICAgICAgICAgICAgIF93aW5bKytzY2FuXSA9PT0gX3dpblsrK21hdGNoXSAmJiBfd2luWysrc2Nhbl0gPT09IF93aW5bKyttYXRjaF0gJiZcbiAgICAgICAgICAgICBfd2luWysrc2Nhbl0gPT09IF93aW5bKyttYXRjaF0gJiYgX3dpblsrK3NjYW5dID09PSBfd2luWysrbWF0Y2hdICYmXG4gICAgICAgICAgICAgc2NhbiA8IHN0cmVuZCk7XG5cbiAgICAvLyBBc3NlcnQoc2NhbiA8PSBzLT53aW5kb3crKHVuc2lnbmVkKShzLT53aW5kb3dfc2l6ZS0xKSwgXCJ3aWxkIHNjYW5cIik7XG5cbiAgICBsZW4gPSBNQVhfTUFUQ0ggLSAoc3RyZW5kIC0gc2Nhbik7XG4gICAgc2NhbiA9IHN0cmVuZCAtIE1BWF9NQVRDSDtcblxuICAgIGlmIChsZW4gPiBiZXN0X2xlbikge1xuICAgICAgcy5tYXRjaF9zdGFydCA9IGN1cl9tYXRjaDtcbiAgICAgIGJlc3RfbGVuID0gbGVuO1xuICAgICAgaWYgKGxlbiA+PSBuaWNlX21hdGNoKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgc2Nhbl9lbmQxICA9IF93aW5bc2NhbiArIGJlc3RfbGVuIC0gMV07XG4gICAgICBzY2FuX2VuZCAgID0gX3dpbltzY2FuICsgYmVzdF9sZW5dO1xuICAgIH1cbiAgfSB3aGlsZSAoKGN1cl9tYXRjaCA9IHByZXZbY3VyX21hdGNoICYgd21hc2tdKSA+IGxpbWl0ICYmIC0tY2hhaW5fbGVuZ3RoICE9PSAwKTtcblxuICBpZiAoYmVzdF9sZW4gPD0gcy5sb29rYWhlYWQpIHtcbiAgICByZXR1cm4gYmVzdF9sZW47XG4gIH1cbiAgcmV0dXJuIHMubG9va2FoZWFkO1xufVxuXG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogRmlsbCB0aGUgd2luZG93IHdoZW4gdGhlIGxvb2thaGVhZCBiZWNvbWVzIGluc3VmZmljaWVudC5cbiAqIFVwZGF0ZXMgc3Ryc3RhcnQgYW5kIGxvb2thaGVhZC5cbiAqXG4gKiBJTiBhc3NlcnRpb246IGxvb2thaGVhZCA8IE1JTl9MT09LQUhFQURcbiAqIE9VVCBhc3NlcnRpb25zOiBzdHJzdGFydCA8PSB3aW5kb3dfc2l6ZS1NSU5fTE9PS0FIRUFEXG4gKiAgICBBdCBsZWFzdCBvbmUgYnl0ZSBoYXMgYmVlbiByZWFkLCBvciBhdmFpbF9pbiA9PSAwOyByZWFkcyBhcmVcbiAqICAgIHBlcmZvcm1lZCBmb3IgYXQgbGVhc3QgdHdvIGJ5dGVzIChyZXF1aXJlZCBmb3IgdGhlIHppcCB0cmFuc2xhdGVfZW9sXG4gKiAgICBvcHRpb24gLS0gbm90IHN1cHBvcnRlZCBoZXJlKS5cbiAqL1xuZnVuY3Rpb24gZmlsbF93aW5kb3cocykge1xuICB2YXIgX3dfc2l6ZSA9IHMud19zaXplO1xuICB2YXIgcCwgbiwgbSwgbW9yZSwgc3RyO1xuXG4gIC8vQXNzZXJ0KHMtPmxvb2thaGVhZCA8IE1JTl9MT09LQUhFQUQsIFwiYWxyZWFkeSBlbm91Z2ggbG9va2FoZWFkXCIpO1xuXG4gIGRvIHtcbiAgICBtb3JlID0gcy53aW5kb3dfc2l6ZSAtIHMubG9va2FoZWFkIC0gcy5zdHJzdGFydDtcblxuICAgIC8vIEpTIGludHMgaGF2ZSAzMiBiaXQsIGJsb2NrIGJlbG93IG5vdCBuZWVkZWRcbiAgICAvKiBEZWFsIHdpdGggIUAjJCUgNjRLIGxpbWl0OiAqL1xuICAgIC8vaWYgKHNpemVvZihpbnQpIDw9IDIpIHtcbiAgICAvLyAgICBpZiAobW9yZSA9PSAwICYmIHMtPnN0cnN0YXJ0ID09IDAgJiYgcy0+bG9va2FoZWFkID09IDApIHtcbiAgICAvLyAgICAgICAgbW9yZSA9IHdzaXplO1xuICAgIC8vXG4gICAgLy8gIH0gZWxzZSBpZiAobW9yZSA9PSAodW5zaWduZWQpKC0xKSkge1xuICAgIC8vICAgICAgICAvKiBWZXJ5IHVubGlrZWx5LCBidXQgcG9zc2libGUgb24gMTYgYml0IG1hY2hpbmUgaWZcbiAgICAvLyAgICAgICAgICogc3Ryc3RhcnQgPT0gMCAmJiBsb29rYWhlYWQgPT0gMSAoaW5wdXQgZG9uZSBhIGJ5dGUgYXQgdGltZSlcbiAgICAvLyAgICAgICAgICovXG4gICAgLy8gICAgICAgIG1vcmUtLTtcbiAgICAvLyAgICB9XG4gICAgLy99XG5cblxuICAgIC8qIElmIHRoZSB3aW5kb3cgaXMgYWxtb3N0IGZ1bGwgYW5kIHRoZXJlIGlzIGluc3VmZmljaWVudCBsb29rYWhlYWQsXG4gICAgICogbW92ZSB0aGUgdXBwZXIgaGFsZiB0byB0aGUgbG93ZXIgb25lIHRvIG1ha2Ugcm9vbSBpbiB0aGUgdXBwZXIgaGFsZi5cbiAgICAgKi9cbiAgICBpZiAocy5zdHJzdGFydCA+PSBfd19zaXplICsgKF93X3NpemUgLSBNSU5fTE9PS0FIRUFEKSkge1xuXG4gICAgICB1dGlscy5hcnJheVNldChzLndpbmRvdywgcy53aW5kb3csIF93X3NpemUsIF93X3NpemUsIDApO1xuICAgICAgcy5tYXRjaF9zdGFydCAtPSBfd19zaXplO1xuICAgICAgcy5zdHJzdGFydCAtPSBfd19zaXplO1xuICAgICAgLyogd2Ugbm93IGhhdmUgc3Ryc3RhcnQgPj0gTUFYX0RJU1QgKi9cbiAgICAgIHMuYmxvY2tfc3RhcnQgLT0gX3dfc2l6ZTtcblxuICAgICAgLyogU2xpZGUgdGhlIGhhc2ggdGFibGUgKGNvdWxkIGJlIGF2b2lkZWQgd2l0aCAzMiBiaXQgdmFsdWVzXG4gICAgICAgYXQgdGhlIGV4cGVuc2Ugb2YgbWVtb3J5IHVzYWdlKS4gV2Ugc2xpZGUgZXZlbiB3aGVuIGxldmVsID09IDBcbiAgICAgICB0byBrZWVwIHRoZSBoYXNoIHRhYmxlIGNvbnNpc3RlbnQgaWYgd2Ugc3dpdGNoIGJhY2sgdG8gbGV2ZWwgPiAwXG4gICAgICAgbGF0ZXIuIChVc2luZyBsZXZlbCAwIHBlcm1hbmVudGx5IGlzIG5vdCBhbiBvcHRpbWFsIHVzYWdlIG9mXG4gICAgICAgemxpYiwgc28gd2UgZG9uJ3QgY2FyZSBhYm91dCB0aGlzIHBhdGhvbG9naWNhbCBjYXNlLilcbiAgICAgICAqL1xuXG4gICAgICBuID0gcy5oYXNoX3NpemU7XG4gICAgICBwID0gbjtcbiAgICAgIGRvIHtcbiAgICAgICAgbSA9IHMuaGVhZFstLXBdO1xuICAgICAgICBzLmhlYWRbcF0gPSAobSA+PSBfd19zaXplID8gbSAtIF93X3NpemUgOiAwKTtcbiAgICAgIH0gd2hpbGUgKC0tbik7XG5cbiAgICAgIG4gPSBfd19zaXplO1xuICAgICAgcCA9IG47XG4gICAgICBkbyB7XG4gICAgICAgIG0gPSBzLnByZXZbLS1wXTtcbiAgICAgICAgcy5wcmV2W3BdID0gKG0gPj0gX3dfc2l6ZSA/IG0gLSBfd19zaXplIDogMCk7XG4gICAgICAgIC8qIElmIG4gaXMgbm90IG9uIGFueSBoYXNoIGNoYWluLCBwcmV2W25dIGlzIGdhcmJhZ2UgYnV0XG4gICAgICAgICAqIGl0cyB2YWx1ZSB3aWxsIG5ldmVyIGJlIHVzZWQuXG4gICAgICAgICAqL1xuICAgICAgfSB3aGlsZSAoLS1uKTtcblxuICAgICAgbW9yZSArPSBfd19zaXplO1xuICAgIH1cbiAgICBpZiAocy5zdHJtLmF2YWlsX2luID09PSAwKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvKiBJZiB0aGVyZSB3YXMgbm8gc2xpZGluZzpcbiAgICAgKiAgICBzdHJzdGFydCA8PSBXU0laRStNQVhfRElTVC0xICYmIGxvb2thaGVhZCA8PSBNSU5fTE9PS0FIRUFEIC0gMSAmJlxuICAgICAqICAgIG1vcmUgPT0gd2luZG93X3NpemUgLSBsb29rYWhlYWQgLSBzdHJzdGFydFxuICAgICAqID0+IG1vcmUgPj0gd2luZG93X3NpemUgLSAoTUlOX0xPT0tBSEVBRC0xICsgV1NJWkUgKyBNQVhfRElTVC0xKVxuICAgICAqID0+IG1vcmUgPj0gd2luZG93X3NpemUgLSAyKldTSVpFICsgMlxuICAgICAqIEluIHRoZSBCSUdfTUVNIG9yIE1NQVAgY2FzZSAobm90IHlldCBzdXBwb3J0ZWQpLFxuICAgICAqICAgd2luZG93X3NpemUgPT0gaW5wdXRfc2l6ZSArIE1JTl9MT09LQUhFQUQgICYmXG4gICAgICogICBzdHJzdGFydCArIHMtPmxvb2thaGVhZCA8PSBpbnB1dF9zaXplID0+IG1vcmUgPj0gTUlOX0xPT0tBSEVBRC5cbiAgICAgKiBPdGhlcndpc2UsIHdpbmRvd19zaXplID09IDIqV1NJWkUgc28gbW9yZSA+PSAyLlxuICAgICAqIElmIHRoZXJlIHdhcyBzbGlkaW5nLCBtb3JlID49IFdTSVpFLiBTbyBpbiBhbGwgY2FzZXMsIG1vcmUgPj0gMi5cbiAgICAgKi9cbiAgICAvL0Fzc2VydChtb3JlID49IDIsIFwibW9yZSA8IDJcIik7XG4gICAgbiA9IHJlYWRfYnVmKHMuc3RybSwgcy53aW5kb3csIHMuc3Ryc3RhcnQgKyBzLmxvb2thaGVhZCwgbW9yZSk7XG4gICAgcy5sb29rYWhlYWQgKz0gbjtcblxuICAgIC8qIEluaXRpYWxpemUgdGhlIGhhc2ggdmFsdWUgbm93IHRoYXQgd2UgaGF2ZSBzb21lIGlucHV0OiAqL1xuICAgIGlmIChzLmxvb2thaGVhZCArIHMuaW5zZXJ0ID49IE1JTl9NQVRDSCkge1xuICAgICAgc3RyID0gcy5zdHJzdGFydCAtIHMuaW5zZXJ0O1xuICAgICAgcy5pbnNfaCA9IHMud2luZG93W3N0cl07XG5cbiAgICAgIC8qIFVQREFURV9IQVNIKHMsIHMtPmluc19oLCBzLT53aW5kb3dbc3RyICsgMV0pOyAqL1xuICAgICAgcy5pbnNfaCA9ICgocy5pbnNfaCA8PCBzLmhhc2hfc2hpZnQpIF4gcy53aW5kb3dbc3RyICsgMV0pICYgcy5oYXNoX21hc2s7XG4vLyNpZiBNSU5fTUFUQ0ggIT0gM1xuLy8gICAgICAgIENhbGwgdXBkYXRlX2hhc2goKSBNSU5fTUFUQ0gtMyBtb3JlIHRpbWVzXG4vLyNlbmRpZlxuICAgICAgd2hpbGUgKHMuaW5zZXJ0KSB7XG4gICAgICAgIC8qIFVQREFURV9IQVNIKHMsIHMtPmluc19oLCBzLT53aW5kb3dbc3RyICsgTUlOX01BVENILTFdKTsgKi9cbiAgICAgICAgcy5pbnNfaCA9ICgocy5pbnNfaCA8PCBzLmhhc2hfc2hpZnQpIF4gcy53aW5kb3dbc3RyICsgTUlOX01BVENIIC0gMV0pICYgcy5oYXNoX21hc2s7XG5cbiAgICAgICAgcy5wcmV2W3N0ciAmIHMud19tYXNrXSA9IHMuaGVhZFtzLmluc19oXTtcbiAgICAgICAgcy5oZWFkW3MuaW5zX2hdID0gc3RyO1xuICAgICAgICBzdHIrKztcbiAgICAgICAgcy5pbnNlcnQtLTtcbiAgICAgICAgaWYgKHMubG9va2FoZWFkICsgcy5pbnNlcnQgPCBNSU5fTUFUQ0gpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvKiBJZiB0aGUgd2hvbGUgaW5wdXQgaGFzIGxlc3MgdGhhbiBNSU5fTUFUQ0ggYnl0ZXMsIGluc19oIGlzIGdhcmJhZ2UsXG4gICAgICogYnV0IHRoaXMgaXMgbm90IGltcG9ydGFudCBzaW5jZSBvbmx5IGxpdGVyYWwgYnl0ZXMgd2lsbCBiZSBlbWl0dGVkLlxuICAgICAqL1xuXG4gIH0gd2hpbGUgKHMubG9va2FoZWFkIDwgTUlOX0xPT0tBSEVBRCAmJiBzLnN0cm0uYXZhaWxfaW4gIT09IDApO1xuXG4gIC8qIElmIHRoZSBXSU5fSU5JVCBieXRlcyBhZnRlciB0aGUgZW5kIG9mIHRoZSBjdXJyZW50IGRhdGEgaGF2ZSBuZXZlciBiZWVuXG4gICAqIHdyaXR0ZW4sIHRoZW4gemVybyB0aG9zZSBieXRlcyBpbiBvcmRlciB0byBhdm9pZCBtZW1vcnkgY2hlY2sgcmVwb3J0cyBvZlxuICAgKiB0aGUgdXNlIG9mIHVuaW5pdGlhbGl6ZWQgKG9yIHVuaW5pdGlhbGlzZWQgYXMgSnVsaWFuIHdyaXRlcykgYnl0ZXMgYnlcbiAgICogdGhlIGxvbmdlc3QgbWF0Y2ggcm91dGluZXMuICBVcGRhdGUgdGhlIGhpZ2ggd2F0ZXIgbWFyayBmb3IgdGhlIG5leHRcbiAgICogdGltZSB0aHJvdWdoIGhlcmUuICBXSU5fSU5JVCBpcyBzZXQgdG8gTUFYX01BVENIIHNpbmNlIHRoZSBsb25nZXN0IG1hdGNoXG4gICAqIHJvdXRpbmVzIGFsbG93IHNjYW5uaW5nIHRvIHN0cnN0YXJ0ICsgTUFYX01BVENILCBpZ25vcmluZyBsb29rYWhlYWQuXG4gICAqL1xuLy8gIGlmIChzLmhpZ2hfd2F0ZXIgPCBzLndpbmRvd19zaXplKSB7XG4vLyAgICB2YXIgY3VyciA9IHMuc3Ryc3RhcnQgKyBzLmxvb2thaGVhZDtcbi8vICAgIHZhciBpbml0ID0gMDtcbi8vXG4vLyAgICBpZiAocy5oaWdoX3dhdGVyIDwgY3Vycikge1xuLy8gICAgICAvKiBQcmV2aW91cyBoaWdoIHdhdGVyIG1hcmsgYmVsb3cgY3VycmVudCBkYXRhIC0tIHplcm8gV0lOX0lOSVRcbi8vICAgICAgICogYnl0ZXMgb3IgdXAgdG8gZW5kIG9mIHdpbmRvdywgd2hpY2hldmVyIGlzIGxlc3MuXG4vLyAgICAgICAqL1xuLy8gICAgICBpbml0ID0gcy53aW5kb3dfc2l6ZSAtIGN1cnI7XG4vLyAgICAgIGlmIChpbml0ID4gV0lOX0lOSVQpXG4vLyAgICAgICAgaW5pdCA9IFdJTl9JTklUO1xuLy8gICAgICB6bWVtemVybyhzLT53aW5kb3cgKyBjdXJyLCAodW5zaWduZWQpaW5pdCk7XG4vLyAgICAgIHMtPmhpZ2hfd2F0ZXIgPSBjdXJyICsgaW5pdDtcbi8vICAgIH1cbi8vICAgIGVsc2UgaWYgKHMtPmhpZ2hfd2F0ZXIgPCAodWxnKWN1cnIgKyBXSU5fSU5JVCkge1xuLy8gICAgICAvKiBIaWdoIHdhdGVyIG1hcmsgYXQgb3IgYWJvdmUgY3VycmVudCBkYXRhLCBidXQgYmVsb3cgY3VycmVudCBkYXRhXG4vLyAgICAgICAqIHBsdXMgV0lOX0lOSVQgLS0gemVybyBvdXQgdG8gY3VycmVudCBkYXRhIHBsdXMgV0lOX0lOSVQsIG9yIHVwXG4vLyAgICAgICAqIHRvIGVuZCBvZiB3aW5kb3csIHdoaWNoZXZlciBpcyBsZXNzLlxuLy8gICAgICAgKi9cbi8vICAgICAgaW5pdCA9ICh1bGcpY3VyciArIFdJTl9JTklUIC0gcy0+aGlnaF93YXRlcjtcbi8vICAgICAgaWYgKGluaXQgPiBzLT53aW5kb3dfc2l6ZSAtIHMtPmhpZ2hfd2F0ZXIpXG4vLyAgICAgICAgaW5pdCA9IHMtPndpbmRvd19zaXplIC0gcy0+aGlnaF93YXRlcjtcbi8vICAgICAgem1lbXplcm8ocy0+d2luZG93ICsgcy0+aGlnaF93YXRlciwgKHVuc2lnbmVkKWluaXQpO1xuLy8gICAgICBzLT5oaWdoX3dhdGVyICs9IGluaXQ7XG4vLyAgICB9XG4vLyAgfVxuLy9cbi8vICBBc3NlcnQoKHVsZylzLT5zdHJzdGFydCA8PSBzLT53aW5kb3dfc2l6ZSAtIE1JTl9MT09LQUhFQUQsXG4vLyAgICBcIm5vdCBlbm91Z2ggcm9vbSBmb3Igc2VhcmNoXCIpO1xufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHkgd2l0aG91dCBjb21wcmVzc2lvbiBhcyBtdWNoIGFzIHBvc3NpYmxlIGZyb20gdGhlIGlucHV0IHN0cmVhbSwgcmV0dXJuXG4gKiB0aGUgY3VycmVudCBibG9jayBzdGF0ZS5cbiAqIFRoaXMgZnVuY3Rpb24gZG9lcyBub3QgaW5zZXJ0IG5ldyBzdHJpbmdzIGluIHRoZSBkaWN0aW9uYXJ5IHNpbmNlXG4gKiB1bmNvbXByZXNzaWJsZSBkYXRhIGlzIHByb2JhYmx5IG5vdCB1c2VmdWwuIFRoaXMgZnVuY3Rpb24gaXMgdXNlZFxuICogb25seSBmb3IgdGhlIGxldmVsPTAgY29tcHJlc3Npb24gb3B0aW9uLlxuICogTk9URTogdGhpcyBmdW5jdGlvbiBzaG91bGQgYmUgb3B0aW1pemVkIHRvIGF2b2lkIGV4dHJhIGNvcHlpbmcgZnJvbVxuICogd2luZG93IHRvIHBlbmRpbmdfYnVmLlxuICovXG5mdW5jdGlvbiBkZWZsYXRlX3N0b3JlZChzLCBmbHVzaCkge1xuICAvKiBTdG9yZWQgYmxvY2tzIGFyZSBsaW1pdGVkIHRvIDB4ZmZmZiBieXRlcywgcGVuZGluZ19idWYgaXMgbGltaXRlZFxuICAgKiB0byBwZW5kaW5nX2J1Zl9zaXplLCBhbmQgZWFjaCBzdG9yZWQgYmxvY2sgaGFzIGEgNSBieXRlIGhlYWRlcjpcbiAgICovXG4gIHZhciBtYXhfYmxvY2tfc2l6ZSA9IDB4ZmZmZjtcblxuICBpZiAobWF4X2Jsb2NrX3NpemUgPiBzLnBlbmRpbmdfYnVmX3NpemUgLSA1KSB7XG4gICAgbWF4X2Jsb2NrX3NpemUgPSBzLnBlbmRpbmdfYnVmX3NpemUgLSA1O1xuICB9XG5cbiAgLyogQ29weSBhcyBtdWNoIGFzIHBvc3NpYmxlIGZyb20gaW5wdXQgdG8gb3V0cHV0OiAqL1xuICBmb3IgKDs7KSB7XG4gICAgLyogRmlsbCB0aGUgd2luZG93IGFzIG11Y2ggYXMgcG9zc2libGU6ICovXG4gICAgaWYgKHMubG9va2FoZWFkIDw9IDEpIHtcblxuICAgICAgLy9Bc3NlcnQocy0+c3Ryc3RhcnQgPCBzLT53X3NpemUrTUFYX0RJU1QocykgfHxcbiAgICAgIC8vICBzLT5ibG9ja19zdGFydCA+PSAobG9uZylzLT53X3NpemUsIFwic2xpZGUgdG9vIGxhdGVcIik7XG4vLyAgICAgIGlmICghKHMuc3Ryc3RhcnQgPCBzLndfc2l6ZSArIChzLndfc2l6ZSAtIE1JTl9MT09LQUhFQUQpIHx8XG4vLyAgICAgICAgcy5ibG9ja19zdGFydCA+PSBzLndfc2l6ZSkpIHtcbi8vICAgICAgICB0aHJvdyAgbmV3IEVycm9yKFwic2xpZGUgdG9vIGxhdGVcIik7XG4vLyAgICAgIH1cblxuICAgICAgZmlsbF93aW5kb3cocyk7XG4gICAgICBpZiAocy5sb29rYWhlYWQgPT09IDAgJiYgZmx1c2ggPT09IFpfTk9fRkxVU0gpIHtcbiAgICAgICAgcmV0dXJuIEJTX05FRURfTU9SRTtcbiAgICAgIH1cblxuICAgICAgaWYgKHMubG9va2FoZWFkID09PSAwKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgLyogZmx1c2ggdGhlIGN1cnJlbnQgYmxvY2sgKi9cbiAgICB9XG4gICAgLy9Bc3NlcnQocy0+YmxvY2tfc3RhcnQgPj0gMEwsIFwiYmxvY2sgZ29uZVwiKTtcbi8vICAgIGlmIChzLmJsb2NrX3N0YXJ0IDwgMCkgdGhyb3cgbmV3IEVycm9yKFwiYmxvY2sgZ29uZVwiKTtcblxuICAgIHMuc3Ryc3RhcnQgKz0gcy5sb29rYWhlYWQ7XG4gICAgcy5sb29rYWhlYWQgPSAwO1xuXG4gICAgLyogRW1pdCBhIHN0b3JlZCBibG9jayBpZiBwZW5kaW5nX2J1ZiB3aWxsIGJlIGZ1bGw6ICovXG4gICAgdmFyIG1heF9zdGFydCA9IHMuYmxvY2tfc3RhcnQgKyBtYXhfYmxvY2tfc2l6ZTtcblxuICAgIGlmIChzLnN0cnN0YXJ0ID09PSAwIHx8IHMuc3Ryc3RhcnQgPj0gbWF4X3N0YXJ0KSB7XG4gICAgICAvKiBzdHJzdGFydCA9PSAwIGlzIHBvc3NpYmxlIHdoZW4gd3JhcGFyb3VuZCBvbiAxNi1iaXQgbWFjaGluZSAqL1xuICAgICAgcy5sb29rYWhlYWQgPSBzLnN0cnN0YXJ0IC0gbWF4X3N0YXJ0O1xuICAgICAgcy5zdHJzdGFydCA9IG1heF9zdGFydDtcbiAgICAgIC8qKiogRkxVU0hfQkxPQ0socywgMCk7ICoqKi9cbiAgICAgIGZsdXNoX2Jsb2NrX29ubHkocywgZmFsc2UpO1xuICAgICAgaWYgKHMuc3RybS5hdmFpbF9vdXQgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIEJTX05FRURfTU9SRTtcbiAgICAgIH1cbiAgICAgIC8qKiovXG5cblxuICAgIH1cbiAgICAvKiBGbHVzaCBpZiB3ZSBtYXkgaGF2ZSB0byBzbGlkZSwgb3RoZXJ3aXNlIGJsb2NrX3N0YXJ0IG1heSBiZWNvbWVcbiAgICAgKiBuZWdhdGl2ZSBhbmQgdGhlIGRhdGEgd2lsbCBiZSBnb25lOlxuICAgICAqL1xuICAgIGlmIChzLnN0cnN0YXJ0IC0gcy5ibG9ja19zdGFydCA+PSAocy53X3NpemUgLSBNSU5fTE9PS0FIRUFEKSkge1xuICAgICAgLyoqKiBGTFVTSF9CTE9DSyhzLCAwKTsgKioqL1xuICAgICAgZmx1c2hfYmxvY2tfb25seShzLCBmYWxzZSk7XG4gICAgICBpZiAocy5zdHJtLmF2YWlsX291dCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gQlNfTkVFRF9NT1JFO1xuICAgICAgfVxuICAgICAgLyoqKi9cbiAgICB9XG4gIH1cblxuICBzLmluc2VydCA9IDA7XG5cbiAgaWYgKGZsdXNoID09PSBaX0ZJTklTSCkge1xuICAgIC8qKiogRkxVU0hfQkxPQ0socywgMSk7ICoqKi9cbiAgICBmbHVzaF9ibG9ja19vbmx5KHMsIHRydWUpO1xuICAgIGlmIChzLnN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICByZXR1cm4gQlNfRklOSVNIX1NUQVJURUQ7XG4gICAgfVxuICAgIC8qKiovXG4gICAgcmV0dXJuIEJTX0ZJTklTSF9ET05FO1xuICB9XG5cbiAgaWYgKHMuc3Ryc3RhcnQgPiBzLmJsb2NrX3N0YXJ0KSB7XG4gICAgLyoqKiBGTFVTSF9CTE9DSyhzLCAwKTsgKioqL1xuICAgIGZsdXNoX2Jsb2NrX29ubHkocywgZmFsc2UpO1xuICAgIGlmIChzLnN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICByZXR1cm4gQlNfTkVFRF9NT1JFO1xuICAgIH1cbiAgICAvKioqL1xuICB9XG5cbiAgcmV0dXJuIEJTX05FRURfTU9SRTtcbn1cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb21wcmVzcyBhcyBtdWNoIGFzIHBvc3NpYmxlIGZyb20gdGhlIGlucHV0IHN0cmVhbSwgcmV0dXJuIHRoZSBjdXJyZW50XG4gKiBibG9jayBzdGF0ZS5cbiAqIFRoaXMgZnVuY3Rpb24gZG9lcyBub3QgcGVyZm9ybSBsYXp5IGV2YWx1YXRpb24gb2YgbWF0Y2hlcyBhbmQgaW5zZXJ0c1xuICogbmV3IHN0cmluZ3MgaW4gdGhlIGRpY3Rpb25hcnkgb25seSBmb3IgdW5tYXRjaGVkIHN0cmluZ3Mgb3IgZm9yIHNob3J0XG4gKiBtYXRjaGVzLiBJdCBpcyB1c2VkIG9ubHkgZm9yIHRoZSBmYXN0IGNvbXByZXNzaW9uIG9wdGlvbnMuXG4gKi9cbmZ1bmN0aW9uIGRlZmxhdGVfZmFzdChzLCBmbHVzaCkge1xuICB2YXIgaGFzaF9oZWFkOyAgICAgICAgLyogaGVhZCBvZiB0aGUgaGFzaCBjaGFpbiAqL1xuICB2YXIgYmZsdXNoOyAgICAgICAgICAgLyogc2V0IGlmIGN1cnJlbnQgYmxvY2sgbXVzdCBiZSBmbHVzaGVkICovXG5cbiAgZm9yICg7Oykge1xuICAgIC8qIE1ha2Ugc3VyZSB0aGF0IHdlIGFsd2F5cyBoYXZlIGVub3VnaCBsb29rYWhlYWQsIGV4Y2VwdFxuICAgICAqIGF0IHRoZSBlbmQgb2YgdGhlIGlucHV0IGZpbGUuIFdlIG5lZWQgTUFYX01BVENIIGJ5dGVzXG4gICAgICogZm9yIHRoZSBuZXh0IG1hdGNoLCBwbHVzIE1JTl9NQVRDSCBieXRlcyB0byBpbnNlcnQgdGhlXG4gICAgICogc3RyaW5nIGZvbGxvd2luZyB0aGUgbmV4dCBtYXRjaC5cbiAgICAgKi9cbiAgICBpZiAocy5sb29rYWhlYWQgPCBNSU5fTE9PS0FIRUFEKSB7XG4gICAgICBmaWxsX3dpbmRvdyhzKTtcbiAgICAgIGlmIChzLmxvb2thaGVhZCA8IE1JTl9MT09LQUhFQUQgJiYgZmx1c2ggPT09IFpfTk9fRkxVU0gpIHtcbiAgICAgICAgcmV0dXJuIEJTX05FRURfTU9SRTtcbiAgICAgIH1cbiAgICAgIGlmIChzLmxvb2thaGVhZCA9PT0gMCkge1xuICAgICAgICBicmVhazsgLyogZmx1c2ggdGhlIGN1cnJlbnQgYmxvY2sgKi9cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBJbnNlcnQgdGhlIHN0cmluZyB3aW5kb3dbc3Ryc3RhcnQgLi4gc3Ryc3RhcnQrMl0gaW4gdGhlXG4gICAgICogZGljdGlvbmFyeSwgYW5kIHNldCBoYXNoX2hlYWQgdG8gdGhlIGhlYWQgb2YgdGhlIGhhc2ggY2hhaW46XG4gICAgICovXG4gICAgaGFzaF9oZWFkID0gMC8qTklMKi87XG4gICAgaWYgKHMubG9va2FoZWFkID49IE1JTl9NQVRDSCkge1xuICAgICAgLyoqKiBJTlNFUlRfU1RSSU5HKHMsIHMuc3Ryc3RhcnQsIGhhc2hfaGVhZCk7ICoqKi9cbiAgICAgIHMuaW5zX2ggPSAoKHMuaW5zX2ggPDwgcy5oYXNoX3NoaWZ0KSBeIHMud2luZG93W3Muc3Ryc3RhcnQgKyBNSU5fTUFUQ0ggLSAxXSkgJiBzLmhhc2hfbWFzaztcbiAgICAgIGhhc2hfaGVhZCA9IHMucHJldltzLnN0cnN0YXJ0ICYgcy53X21hc2tdID0gcy5oZWFkW3MuaW5zX2hdO1xuICAgICAgcy5oZWFkW3MuaW5zX2hdID0gcy5zdHJzdGFydDtcbiAgICAgIC8qKiovXG4gICAgfVxuXG4gICAgLyogRmluZCB0aGUgbG9uZ2VzdCBtYXRjaCwgZGlzY2FyZGluZyB0aG9zZSA8PSBwcmV2X2xlbmd0aC5cbiAgICAgKiBBdCB0aGlzIHBvaW50IHdlIGhhdmUgYWx3YXlzIG1hdGNoX2xlbmd0aCA8IE1JTl9NQVRDSFxuICAgICAqL1xuICAgIGlmIChoYXNoX2hlYWQgIT09IDAvKk5JTCovICYmICgocy5zdHJzdGFydCAtIGhhc2hfaGVhZCkgPD0gKHMud19zaXplIC0gTUlOX0xPT0tBSEVBRCkpKSB7XG4gICAgICAvKiBUbyBzaW1wbGlmeSB0aGUgY29kZSwgd2UgcHJldmVudCBtYXRjaGVzIHdpdGggdGhlIHN0cmluZ1xuICAgICAgICogb2Ygd2luZG93IGluZGV4IDAgKGluIHBhcnRpY3VsYXIgd2UgaGF2ZSB0byBhdm9pZCBhIG1hdGNoXG4gICAgICAgKiBvZiB0aGUgc3RyaW5nIHdpdGggaXRzZWxmIGF0IHRoZSBzdGFydCBvZiB0aGUgaW5wdXQgZmlsZSkuXG4gICAgICAgKi9cbiAgICAgIHMubWF0Y2hfbGVuZ3RoID0gbG9uZ2VzdF9tYXRjaChzLCBoYXNoX2hlYWQpO1xuICAgICAgLyogbG9uZ2VzdF9tYXRjaCgpIHNldHMgbWF0Y2hfc3RhcnQgKi9cbiAgICB9XG4gICAgaWYgKHMubWF0Y2hfbGVuZ3RoID49IE1JTl9NQVRDSCkge1xuICAgICAgLy8gY2hlY2tfbWF0Y2gocywgcy5zdHJzdGFydCwgcy5tYXRjaF9zdGFydCwgcy5tYXRjaF9sZW5ndGgpOyAvLyBmb3IgZGVidWcgb25seVxuXG4gICAgICAvKioqIF90cl90YWxseV9kaXN0KHMsIHMuc3Ryc3RhcnQgLSBzLm1hdGNoX3N0YXJ0LFxuICAgICAgICAgICAgICAgICAgICAgcy5tYXRjaF9sZW5ndGggLSBNSU5fTUFUQ0gsIGJmbHVzaCk7ICoqKi9cbiAgICAgIGJmbHVzaCA9IHRyZWVzLl90cl90YWxseShzLCBzLnN0cnN0YXJ0IC0gcy5tYXRjaF9zdGFydCwgcy5tYXRjaF9sZW5ndGggLSBNSU5fTUFUQ0gpO1xuXG4gICAgICBzLmxvb2thaGVhZCAtPSBzLm1hdGNoX2xlbmd0aDtcblxuICAgICAgLyogSW5zZXJ0IG5ldyBzdHJpbmdzIGluIHRoZSBoYXNoIHRhYmxlIG9ubHkgaWYgdGhlIG1hdGNoIGxlbmd0aFxuICAgICAgICogaXMgbm90IHRvbyBsYXJnZS4gVGhpcyBzYXZlcyB0aW1lIGJ1dCBkZWdyYWRlcyBjb21wcmVzc2lvbi5cbiAgICAgICAqL1xuICAgICAgaWYgKHMubWF0Y2hfbGVuZ3RoIDw9IHMubWF4X2xhenlfbWF0Y2gvKm1heF9pbnNlcnRfbGVuZ3RoKi8gJiYgcy5sb29rYWhlYWQgPj0gTUlOX01BVENIKSB7XG4gICAgICAgIHMubWF0Y2hfbGVuZ3RoLS07IC8qIHN0cmluZyBhdCBzdHJzdGFydCBhbHJlYWR5IGluIHRhYmxlICovXG4gICAgICAgIGRvIHtcbiAgICAgICAgICBzLnN0cnN0YXJ0Kys7XG4gICAgICAgICAgLyoqKiBJTlNFUlRfU1RSSU5HKHMsIHMuc3Ryc3RhcnQsIGhhc2hfaGVhZCk7ICoqKi9cbiAgICAgICAgICBzLmluc19oID0gKChzLmluc19oIDw8IHMuaGFzaF9zaGlmdCkgXiBzLndpbmRvd1tzLnN0cnN0YXJ0ICsgTUlOX01BVENIIC0gMV0pICYgcy5oYXNoX21hc2s7XG4gICAgICAgICAgaGFzaF9oZWFkID0gcy5wcmV2W3Muc3Ryc3RhcnQgJiBzLndfbWFza10gPSBzLmhlYWRbcy5pbnNfaF07XG4gICAgICAgICAgcy5oZWFkW3MuaW5zX2hdID0gcy5zdHJzdGFydDtcbiAgICAgICAgICAvKioqL1xuICAgICAgICAgIC8qIHN0cnN0YXJ0IG5ldmVyIGV4Y2VlZHMgV1NJWkUtTUFYX01BVENILCBzbyB0aGVyZSBhcmVcbiAgICAgICAgICAgKiBhbHdheXMgTUlOX01BVENIIGJ5dGVzIGFoZWFkLlxuICAgICAgICAgICAqL1xuICAgICAgICB9IHdoaWxlICgtLXMubWF0Y2hfbGVuZ3RoICE9PSAwKTtcbiAgICAgICAgcy5zdHJzdGFydCsrO1xuICAgICAgfSBlbHNlXG4gICAgICB7XG4gICAgICAgIHMuc3Ryc3RhcnQgKz0gcy5tYXRjaF9sZW5ndGg7XG4gICAgICAgIHMubWF0Y2hfbGVuZ3RoID0gMDtcbiAgICAgICAgcy5pbnNfaCA9IHMud2luZG93W3Muc3Ryc3RhcnRdO1xuICAgICAgICAvKiBVUERBVEVfSEFTSChzLCBzLmluc19oLCBzLndpbmRvd1tzLnN0cnN0YXJ0KzFdKTsgKi9cbiAgICAgICAgcy5pbnNfaCA9ICgocy5pbnNfaCA8PCBzLmhhc2hfc2hpZnQpIF4gcy53aW5kb3dbcy5zdHJzdGFydCArIDFdKSAmIHMuaGFzaF9tYXNrO1xuXG4vLyNpZiBNSU5fTUFUQ0ggIT0gM1xuLy8gICAgICAgICAgICAgICAgQ2FsbCBVUERBVEVfSEFTSCgpIE1JTl9NQVRDSC0zIG1vcmUgdGltZXNcbi8vI2VuZGlmXG4gICAgICAgIC8qIElmIGxvb2thaGVhZCA8IE1JTl9NQVRDSCwgaW5zX2ggaXMgZ2FyYmFnZSwgYnV0IGl0IGRvZXMgbm90XG4gICAgICAgICAqIG1hdHRlciBzaW5jZSBpdCB3aWxsIGJlIHJlY29tcHV0ZWQgYXQgbmV4dCBkZWZsYXRlIGNhbGwuXG4gICAgICAgICAqL1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvKiBObyBtYXRjaCwgb3V0cHV0IGEgbGl0ZXJhbCBieXRlICovXG4gICAgICAvL1RyYWNldnYoKHN0ZGVycixcIiVjXCIsIHMud2luZG93W3Muc3Ryc3RhcnRdKSk7XG4gICAgICAvKioqIF90cl90YWxseV9saXQocywgcy53aW5kb3dbcy5zdHJzdGFydF0sIGJmbHVzaCk7ICoqKi9cbiAgICAgIGJmbHVzaCA9IHRyZWVzLl90cl90YWxseShzLCAwLCBzLndpbmRvd1tzLnN0cnN0YXJ0XSk7XG5cbiAgICAgIHMubG9va2FoZWFkLS07XG4gICAgICBzLnN0cnN0YXJ0Kys7XG4gICAgfVxuICAgIGlmIChiZmx1c2gpIHtcbiAgICAgIC8qKiogRkxVU0hfQkxPQ0socywgMCk7ICoqKi9cbiAgICAgIGZsdXNoX2Jsb2NrX29ubHkocywgZmFsc2UpO1xuICAgICAgaWYgKHMuc3RybS5hdmFpbF9vdXQgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIEJTX05FRURfTU9SRTtcbiAgICAgIH1cbiAgICAgIC8qKiovXG4gICAgfVxuICB9XG4gIHMuaW5zZXJ0ID0gKChzLnN0cnN0YXJ0IDwgKE1JTl9NQVRDSCAtIDEpKSA/IHMuc3Ryc3RhcnQgOiBNSU5fTUFUQ0ggLSAxKTtcbiAgaWYgKGZsdXNoID09PSBaX0ZJTklTSCkge1xuICAgIC8qKiogRkxVU0hfQkxPQ0socywgMSk7ICoqKi9cbiAgICBmbHVzaF9ibG9ja19vbmx5KHMsIHRydWUpO1xuICAgIGlmIChzLnN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICByZXR1cm4gQlNfRklOSVNIX1NUQVJURUQ7XG4gICAgfVxuICAgIC8qKiovXG4gICAgcmV0dXJuIEJTX0ZJTklTSF9ET05FO1xuICB9XG4gIGlmIChzLmxhc3RfbGl0KSB7XG4gICAgLyoqKiBGTFVTSF9CTE9DSyhzLCAwKTsgKioqL1xuICAgIGZsdXNoX2Jsb2NrX29ubHkocywgZmFsc2UpO1xuICAgIGlmIChzLnN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICByZXR1cm4gQlNfTkVFRF9NT1JFO1xuICAgIH1cbiAgICAvKioqL1xuICB9XG4gIHJldHVybiBCU19CTE9DS19ET05FO1xufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIFNhbWUgYXMgYWJvdmUsIGJ1dCBhY2hpZXZlcyBiZXR0ZXIgY29tcHJlc3Npb24uIFdlIHVzZSBhIGxhenlcbiAqIGV2YWx1YXRpb24gZm9yIG1hdGNoZXM6IGEgbWF0Y2ggaXMgZmluYWxseSBhZG9wdGVkIG9ubHkgaWYgdGhlcmUgaXNcbiAqIG5vIGJldHRlciBtYXRjaCBhdCB0aGUgbmV4dCB3aW5kb3cgcG9zaXRpb24uXG4gKi9cbmZ1bmN0aW9uIGRlZmxhdGVfc2xvdyhzLCBmbHVzaCkge1xuICB2YXIgaGFzaF9oZWFkOyAgICAgICAgICAvKiBoZWFkIG9mIGhhc2ggY2hhaW4gKi9cbiAgdmFyIGJmbHVzaDsgICAgICAgICAgICAgIC8qIHNldCBpZiBjdXJyZW50IGJsb2NrIG11c3QgYmUgZmx1c2hlZCAqL1xuXG4gIHZhciBtYXhfaW5zZXJ0O1xuXG4gIC8qIFByb2Nlc3MgdGhlIGlucHV0IGJsb2NrLiAqL1xuICBmb3IgKDs7KSB7XG4gICAgLyogTWFrZSBzdXJlIHRoYXQgd2UgYWx3YXlzIGhhdmUgZW5vdWdoIGxvb2thaGVhZCwgZXhjZXB0XG4gICAgICogYXQgdGhlIGVuZCBvZiB0aGUgaW5wdXQgZmlsZS4gV2UgbmVlZCBNQVhfTUFUQ0ggYnl0ZXNcbiAgICAgKiBmb3IgdGhlIG5leHQgbWF0Y2gsIHBsdXMgTUlOX01BVENIIGJ5dGVzIHRvIGluc2VydCB0aGVcbiAgICAgKiBzdHJpbmcgZm9sbG93aW5nIHRoZSBuZXh0IG1hdGNoLlxuICAgICAqL1xuICAgIGlmIChzLmxvb2thaGVhZCA8IE1JTl9MT09LQUhFQUQpIHtcbiAgICAgIGZpbGxfd2luZG93KHMpO1xuICAgICAgaWYgKHMubG9va2FoZWFkIDwgTUlOX0xPT0tBSEVBRCAmJiBmbHVzaCA9PT0gWl9OT19GTFVTSCkge1xuICAgICAgICByZXR1cm4gQlNfTkVFRF9NT1JFO1xuICAgICAgfVxuICAgICAgaWYgKHMubG9va2FoZWFkID09PSAwKSB7IGJyZWFrOyB9IC8qIGZsdXNoIHRoZSBjdXJyZW50IGJsb2NrICovXG4gICAgfVxuXG4gICAgLyogSW5zZXJ0IHRoZSBzdHJpbmcgd2luZG93W3N0cnN0YXJ0IC4uIHN0cnN0YXJ0KzJdIGluIHRoZVxuICAgICAqIGRpY3Rpb25hcnksIGFuZCBzZXQgaGFzaF9oZWFkIHRvIHRoZSBoZWFkIG9mIHRoZSBoYXNoIGNoYWluOlxuICAgICAqL1xuICAgIGhhc2hfaGVhZCA9IDAvKk5JTCovO1xuICAgIGlmIChzLmxvb2thaGVhZCA+PSBNSU5fTUFUQ0gpIHtcbiAgICAgIC8qKiogSU5TRVJUX1NUUklORyhzLCBzLnN0cnN0YXJ0LCBoYXNoX2hlYWQpOyAqKiovXG4gICAgICBzLmluc19oID0gKChzLmluc19oIDw8IHMuaGFzaF9zaGlmdCkgXiBzLndpbmRvd1tzLnN0cnN0YXJ0ICsgTUlOX01BVENIIC0gMV0pICYgcy5oYXNoX21hc2s7XG4gICAgICBoYXNoX2hlYWQgPSBzLnByZXZbcy5zdHJzdGFydCAmIHMud19tYXNrXSA9IHMuaGVhZFtzLmluc19oXTtcbiAgICAgIHMuaGVhZFtzLmluc19oXSA9IHMuc3Ryc3RhcnQ7XG4gICAgICAvKioqL1xuICAgIH1cblxuICAgIC8qIEZpbmQgdGhlIGxvbmdlc3QgbWF0Y2gsIGRpc2NhcmRpbmcgdGhvc2UgPD0gcHJldl9sZW5ndGguXG4gICAgICovXG4gICAgcy5wcmV2X2xlbmd0aCA9IHMubWF0Y2hfbGVuZ3RoO1xuICAgIHMucHJldl9tYXRjaCA9IHMubWF0Y2hfc3RhcnQ7XG4gICAgcy5tYXRjaF9sZW5ndGggPSBNSU5fTUFUQ0ggLSAxO1xuXG4gICAgaWYgKGhhc2hfaGVhZCAhPT0gMC8qTklMKi8gJiYgcy5wcmV2X2xlbmd0aCA8IHMubWF4X2xhenlfbWF0Y2ggJiZcbiAgICAgICAgcy5zdHJzdGFydCAtIGhhc2hfaGVhZCA8PSAocy53X3NpemUgLSBNSU5fTE9PS0FIRUFEKS8qTUFYX0RJU1QocykqLykge1xuICAgICAgLyogVG8gc2ltcGxpZnkgdGhlIGNvZGUsIHdlIHByZXZlbnQgbWF0Y2hlcyB3aXRoIHRoZSBzdHJpbmdcbiAgICAgICAqIG9mIHdpbmRvdyBpbmRleCAwIChpbiBwYXJ0aWN1bGFyIHdlIGhhdmUgdG8gYXZvaWQgYSBtYXRjaFxuICAgICAgICogb2YgdGhlIHN0cmluZyB3aXRoIGl0c2VsZiBhdCB0aGUgc3RhcnQgb2YgdGhlIGlucHV0IGZpbGUpLlxuICAgICAgICovXG4gICAgICBzLm1hdGNoX2xlbmd0aCA9IGxvbmdlc3RfbWF0Y2gocywgaGFzaF9oZWFkKTtcbiAgICAgIC8qIGxvbmdlc3RfbWF0Y2goKSBzZXRzIG1hdGNoX3N0YXJ0ICovXG5cbiAgICAgIGlmIChzLm1hdGNoX2xlbmd0aCA8PSA1ICYmXG4gICAgICAgICAocy5zdHJhdGVneSA9PT0gWl9GSUxURVJFRCB8fCAocy5tYXRjaF9sZW5ndGggPT09IE1JTl9NQVRDSCAmJiBzLnN0cnN0YXJ0IC0gcy5tYXRjaF9zdGFydCA+IDQwOTYvKlRPT19GQVIqLykpKSB7XG5cbiAgICAgICAgLyogSWYgcHJldl9tYXRjaCBpcyBhbHNvIE1JTl9NQVRDSCwgbWF0Y2hfc3RhcnQgaXMgZ2FyYmFnZVxuICAgICAgICAgKiBidXQgd2Ugd2lsbCBpZ25vcmUgdGhlIGN1cnJlbnQgbWF0Y2ggYW55d2F5LlxuICAgICAgICAgKi9cbiAgICAgICAgcy5tYXRjaF9sZW5ndGggPSBNSU5fTUFUQ0ggLSAxO1xuICAgICAgfVxuICAgIH1cbiAgICAvKiBJZiB0aGVyZSB3YXMgYSBtYXRjaCBhdCB0aGUgcHJldmlvdXMgc3RlcCBhbmQgdGhlIGN1cnJlbnRcbiAgICAgKiBtYXRjaCBpcyBub3QgYmV0dGVyLCBvdXRwdXQgdGhlIHByZXZpb3VzIG1hdGNoOlxuICAgICAqL1xuICAgIGlmIChzLnByZXZfbGVuZ3RoID49IE1JTl9NQVRDSCAmJiBzLm1hdGNoX2xlbmd0aCA8PSBzLnByZXZfbGVuZ3RoKSB7XG4gICAgICBtYXhfaW5zZXJ0ID0gcy5zdHJzdGFydCArIHMubG9va2FoZWFkIC0gTUlOX01BVENIO1xuICAgICAgLyogRG8gbm90IGluc2VydCBzdHJpbmdzIGluIGhhc2ggdGFibGUgYmV5b25kIHRoaXMuICovXG5cbiAgICAgIC8vY2hlY2tfbWF0Y2gocywgcy5zdHJzdGFydC0xLCBzLnByZXZfbWF0Y2gsIHMucHJldl9sZW5ndGgpO1xuXG4gICAgICAvKioqX3RyX3RhbGx5X2Rpc3Qocywgcy5zdHJzdGFydCAtIDEgLSBzLnByZXZfbWF0Y2gsXG4gICAgICAgICAgICAgICAgICAgICBzLnByZXZfbGVuZ3RoIC0gTUlOX01BVENILCBiZmx1c2gpOyoqKi9cbiAgICAgIGJmbHVzaCA9IHRyZWVzLl90cl90YWxseShzLCBzLnN0cnN0YXJ0IC0gMSAtIHMucHJldl9tYXRjaCwgcy5wcmV2X2xlbmd0aCAtIE1JTl9NQVRDSCk7XG4gICAgICAvKiBJbnNlcnQgaW4gaGFzaCB0YWJsZSBhbGwgc3RyaW5ncyB1cCB0byB0aGUgZW5kIG9mIHRoZSBtYXRjaC5cbiAgICAgICAqIHN0cnN0YXJ0LTEgYW5kIHN0cnN0YXJ0IGFyZSBhbHJlYWR5IGluc2VydGVkLiBJZiB0aGVyZSBpcyBub3RcbiAgICAgICAqIGVub3VnaCBsb29rYWhlYWQsIHRoZSBsYXN0IHR3byBzdHJpbmdzIGFyZSBub3QgaW5zZXJ0ZWQgaW5cbiAgICAgICAqIHRoZSBoYXNoIHRhYmxlLlxuICAgICAgICovXG4gICAgICBzLmxvb2thaGVhZCAtPSBzLnByZXZfbGVuZ3RoIC0gMTtcbiAgICAgIHMucHJldl9sZW5ndGggLT0gMjtcbiAgICAgIGRvIHtcbiAgICAgICAgaWYgKCsrcy5zdHJzdGFydCA8PSBtYXhfaW5zZXJ0KSB7XG4gICAgICAgICAgLyoqKiBJTlNFUlRfU1RSSU5HKHMsIHMuc3Ryc3RhcnQsIGhhc2hfaGVhZCk7ICoqKi9cbiAgICAgICAgICBzLmluc19oID0gKChzLmluc19oIDw8IHMuaGFzaF9zaGlmdCkgXiBzLndpbmRvd1tzLnN0cnN0YXJ0ICsgTUlOX01BVENIIC0gMV0pICYgcy5oYXNoX21hc2s7XG4gICAgICAgICAgaGFzaF9oZWFkID0gcy5wcmV2W3Muc3Ryc3RhcnQgJiBzLndfbWFza10gPSBzLmhlYWRbcy5pbnNfaF07XG4gICAgICAgICAgcy5oZWFkW3MuaW5zX2hdID0gcy5zdHJzdGFydDtcbiAgICAgICAgICAvKioqL1xuICAgICAgICB9XG4gICAgICB9IHdoaWxlICgtLXMucHJldl9sZW5ndGggIT09IDApO1xuICAgICAgcy5tYXRjaF9hdmFpbGFibGUgPSAwO1xuICAgICAgcy5tYXRjaF9sZW5ndGggPSBNSU5fTUFUQ0ggLSAxO1xuICAgICAgcy5zdHJzdGFydCsrO1xuXG4gICAgICBpZiAoYmZsdXNoKSB7XG4gICAgICAgIC8qKiogRkxVU0hfQkxPQ0socywgMCk7ICoqKi9cbiAgICAgICAgZmx1c2hfYmxvY2tfb25seShzLCBmYWxzZSk7XG4gICAgICAgIGlmIChzLnN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIEJTX05FRURfTU9SRTtcbiAgICAgICAgfVxuICAgICAgICAvKioqL1xuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmIChzLm1hdGNoX2F2YWlsYWJsZSkge1xuICAgICAgLyogSWYgdGhlcmUgd2FzIG5vIG1hdGNoIGF0IHRoZSBwcmV2aW91cyBwb3NpdGlvbiwgb3V0cHV0IGFcbiAgICAgICAqIHNpbmdsZSBsaXRlcmFsLiBJZiB0aGVyZSB3YXMgYSBtYXRjaCBidXQgdGhlIGN1cnJlbnQgbWF0Y2hcbiAgICAgICAqIGlzIGxvbmdlciwgdHJ1bmNhdGUgdGhlIHByZXZpb3VzIG1hdGNoIHRvIGEgc2luZ2xlIGxpdGVyYWwuXG4gICAgICAgKi9cbiAgICAgIC8vVHJhY2V2digoc3RkZXJyLFwiJWNcIiwgcy0+d2luZG93W3MtPnN0cnN0YXJ0LTFdKSk7XG4gICAgICAvKioqIF90cl90YWxseV9saXQocywgcy53aW5kb3dbcy5zdHJzdGFydC0xXSwgYmZsdXNoKTsgKioqL1xuICAgICAgYmZsdXNoID0gdHJlZXMuX3RyX3RhbGx5KHMsIDAsIHMud2luZG93W3Muc3Ryc3RhcnQgLSAxXSk7XG5cbiAgICAgIGlmIChiZmx1c2gpIHtcbiAgICAgICAgLyoqKiBGTFVTSF9CTE9DS19PTkxZKHMsIDApICoqKi9cbiAgICAgICAgZmx1c2hfYmxvY2tfb25seShzLCBmYWxzZSk7XG4gICAgICAgIC8qKiovXG4gICAgICB9XG4gICAgICBzLnN0cnN0YXJ0Kys7XG4gICAgICBzLmxvb2thaGVhZC0tO1xuICAgICAgaWYgKHMuc3RybS5hdmFpbF9vdXQgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIEJTX05FRURfTU9SRTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLyogVGhlcmUgaXMgbm8gcHJldmlvdXMgbWF0Y2ggdG8gY29tcGFyZSB3aXRoLCB3YWl0IGZvclxuICAgICAgICogdGhlIG5leHQgc3RlcCB0byBkZWNpZGUuXG4gICAgICAgKi9cbiAgICAgIHMubWF0Y2hfYXZhaWxhYmxlID0gMTtcbiAgICAgIHMuc3Ryc3RhcnQrKztcbiAgICAgIHMubG9va2FoZWFkLS07XG4gICAgfVxuICB9XG4gIC8vQXNzZXJ0IChmbHVzaCAhPSBaX05PX0ZMVVNILCBcIm5vIGZsdXNoP1wiKTtcbiAgaWYgKHMubWF0Y2hfYXZhaWxhYmxlKSB7XG4gICAgLy9UcmFjZXZ2KChzdGRlcnIsXCIlY1wiLCBzLT53aW5kb3dbcy0+c3Ryc3RhcnQtMV0pKTtcbiAgICAvKioqIF90cl90YWxseV9saXQocywgcy53aW5kb3dbcy5zdHJzdGFydC0xXSwgYmZsdXNoKTsgKioqL1xuICAgIGJmbHVzaCA9IHRyZWVzLl90cl90YWxseShzLCAwLCBzLndpbmRvd1tzLnN0cnN0YXJ0IC0gMV0pO1xuXG4gICAgcy5tYXRjaF9hdmFpbGFibGUgPSAwO1xuICB9XG4gIHMuaW5zZXJ0ID0gcy5zdHJzdGFydCA8IE1JTl9NQVRDSCAtIDEgPyBzLnN0cnN0YXJ0IDogTUlOX01BVENIIC0gMTtcbiAgaWYgKGZsdXNoID09PSBaX0ZJTklTSCkge1xuICAgIC8qKiogRkxVU0hfQkxPQ0socywgMSk7ICoqKi9cbiAgICBmbHVzaF9ibG9ja19vbmx5KHMsIHRydWUpO1xuICAgIGlmIChzLnN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICByZXR1cm4gQlNfRklOSVNIX1NUQVJURUQ7XG4gICAgfVxuICAgIC8qKiovXG4gICAgcmV0dXJuIEJTX0ZJTklTSF9ET05FO1xuICB9XG4gIGlmIChzLmxhc3RfbGl0KSB7XG4gICAgLyoqKiBGTFVTSF9CTE9DSyhzLCAwKTsgKioqL1xuICAgIGZsdXNoX2Jsb2NrX29ubHkocywgZmFsc2UpO1xuICAgIGlmIChzLnN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICByZXR1cm4gQlNfTkVFRF9NT1JFO1xuICAgIH1cbiAgICAvKioqL1xuICB9XG5cbiAgcmV0dXJuIEJTX0JMT0NLX0RPTkU7XG59XG5cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBGb3IgWl9STEUsIHNpbXBseSBsb29rIGZvciBydW5zIG9mIGJ5dGVzLCBnZW5lcmF0ZSBtYXRjaGVzIG9ubHkgb2YgZGlzdGFuY2VcbiAqIG9uZS4gIERvIG5vdCBtYWludGFpbiBhIGhhc2ggdGFibGUuICAoSXQgd2lsbCBiZSByZWdlbmVyYXRlZCBpZiB0aGlzIHJ1biBvZlxuICogZGVmbGF0ZSBzd2l0Y2hlcyBhd2F5IGZyb20gWl9STEUuKVxuICovXG5mdW5jdGlvbiBkZWZsYXRlX3JsZShzLCBmbHVzaCkge1xuICB2YXIgYmZsdXNoOyAgICAgICAgICAgIC8qIHNldCBpZiBjdXJyZW50IGJsb2NrIG11c3QgYmUgZmx1c2hlZCAqL1xuICB2YXIgcHJldjsgICAgICAgICAgICAgIC8qIGJ5dGUgYXQgZGlzdGFuY2Ugb25lIHRvIG1hdGNoICovXG4gIHZhciBzY2FuLCBzdHJlbmQ7ICAgICAgLyogc2NhbiBnb2VzIHVwIHRvIHN0cmVuZCBmb3IgbGVuZ3RoIG9mIHJ1biAqL1xuXG4gIHZhciBfd2luID0gcy53aW5kb3c7XG5cbiAgZm9yICg7Oykge1xuICAgIC8qIE1ha2Ugc3VyZSB0aGF0IHdlIGFsd2F5cyBoYXZlIGVub3VnaCBsb29rYWhlYWQsIGV4Y2VwdFxuICAgICAqIGF0IHRoZSBlbmQgb2YgdGhlIGlucHV0IGZpbGUuIFdlIG5lZWQgTUFYX01BVENIIGJ5dGVzXG4gICAgICogZm9yIHRoZSBsb25nZXN0IHJ1biwgcGx1cyBvbmUgZm9yIHRoZSB1bnJvbGxlZCBsb29wLlxuICAgICAqL1xuICAgIGlmIChzLmxvb2thaGVhZCA8PSBNQVhfTUFUQ0gpIHtcbiAgICAgIGZpbGxfd2luZG93KHMpO1xuICAgICAgaWYgKHMubG9va2FoZWFkIDw9IE1BWF9NQVRDSCAmJiBmbHVzaCA9PT0gWl9OT19GTFVTSCkge1xuICAgICAgICByZXR1cm4gQlNfTkVFRF9NT1JFO1xuICAgICAgfVxuICAgICAgaWYgKHMubG9va2FoZWFkID09PSAwKSB7IGJyZWFrOyB9IC8qIGZsdXNoIHRoZSBjdXJyZW50IGJsb2NrICovXG4gICAgfVxuXG4gICAgLyogU2VlIGhvdyBtYW55IHRpbWVzIHRoZSBwcmV2aW91cyBieXRlIHJlcGVhdHMgKi9cbiAgICBzLm1hdGNoX2xlbmd0aCA9IDA7XG4gICAgaWYgKHMubG9va2FoZWFkID49IE1JTl9NQVRDSCAmJiBzLnN0cnN0YXJ0ID4gMCkge1xuICAgICAgc2NhbiA9IHMuc3Ryc3RhcnQgLSAxO1xuICAgICAgcHJldiA9IF93aW5bc2Nhbl07XG4gICAgICBpZiAocHJldiA9PT0gX3dpblsrK3NjYW5dICYmIHByZXYgPT09IF93aW5bKytzY2FuXSAmJiBwcmV2ID09PSBfd2luWysrc2Nhbl0pIHtcbiAgICAgICAgc3RyZW5kID0gcy5zdHJzdGFydCArIE1BWF9NQVRDSDtcbiAgICAgICAgZG8ge1xuICAgICAgICAgIC8qanNoaW50IG5vZW1wdHk6ZmFsc2UqL1xuICAgICAgICB9IHdoaWxlIChwcmV2ID09PSBfd2luWysrc2Nhbl0gJiYgcHJldiA9PT0gX3dpblsrK3NjYW5dICYmXG4gICAgICAgICAgICAgICAgIHByZXYgPT09IF93aW5bKytzY2FuXSAmJiBwcmV2ID09PSBfd2luWysrc2Nhbl0gJiZcbiAgICAgICAgICAgICAgICAgcHJldiA9PT0gX3dpblsrK3NjYW5dICYmIHByZXYgPT09IF93aW5bKytzY2FuXSAmJlxuICAgICAgICAgICAgICAgICBwcmV2ID09PSBfd2luWysrc2Nhbl0gJiYgcHJldiA9PT0gX3dpblsrK3NjYW5dICYmXG4gICAgICAgICAgICAgICAgIHNjYW4gPCBzdHJlbmQpO1xuICAgICAgICBzLm1hdGNoX2xlbmd0aCA9IE1BWF9NQVRDSCAtIChzdHJlbmQgLSBzY2FuKTtcbiAgICAgICAgaWYgKHMubWF0Y2hfbGVuZ3RoID4gcy5sb29rYWhlYWQpIHtcbiAgICAgICAgICBzLm1hdGNoX2xlbmd0aCA9IHMubG9va2FoZWFkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvL0Fzc2VydChzY2FuIDw9IHMtPndpbmRvdysodUludCkocy0+d2luZG93X3NpemUtMSksIFwid2lsZCBzY2FuXCIpO1xuICAgIH1cblxuICAgIC8qIEVtaXQgbWF0Y2ggaWYgaGF2ZSBydW4gb2YgTUlOX01BVENIIG9yIGxvbmdlciwgZWxzZSBlbWl0IGxpdGVyYWwgKi9cbiAgICBpZiAocy5tYXRjaF9sZW5ndGggPj0gTUlOX01BVENIKSB7XG4gICAgICAvL2NoZWNrX21hdGNoKHMsIHMuc3Ryc3RhcnQsIHMuc3Ryc3RhcnQgLSAxLCBzLm1hdGNoX2xlbmd0aCk7XG5cbiAgICAgIC8qKiogX3RyX3RhbGx5X2Rpc3QocywgMSwgcy5tYXRjaF9sZW5ndGggLSBNSU5fTUFUQ0gsIGJmbHVzaCk7ICoqKi9cbiAgICAgIGJmbHVzaCA9IHRyZWVzLl90cl90YWxseShzLCAxLCBzLm1hdGNoX2xlbmd0aCAtIE1JTl9NQVRDSCk7XG5cbiAgICAgIHMubG9va2FoZWFkIC09IHMubWF0Y2hfbGVuZ3RoO1xuICAgICAgcy5zdHJzdGFydCArPSBzLm1hdGNoX2xlbmd0aDtcbiAgICAgIHMubWF0Y2hfbGVuZ3RoID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgLyogTm8gbWF0Y2gsIG91dHB1dCBhIGxpdGVyYWwgYnl0ZSAqL1xuICAgICAgLy9UcmFjZXZ2KChzdGRlcnIsXCIlY1wiLCBzLT53aW5kb3dbcy0+c3Ryc3RhcnRdKSk7XG4gICAgICAvKioqIF90cl90YWxseV9saXQocywgcy53aW5kb3dbcy5zdHJzdGFydF0sIGJmbHVzaCk7ICoqKi9cbiAgICAgIGJmbHVzaCA9IHRyZWVzLl90cl90YWxseShzLCAwLCBzLndpbmRvd1tzLnN0cnN0YXJ0XSk7XG5cbiAgICAgIHMubG9va2FoZWFkLS07XG4gICAgICBzLnN0cnN0YXJ0Kys7XG4gICAgfVxuICAgIGlmIChiZmx1c2gpIHtcbiAgICAgIC8qKiogRkxVU0hfQkxPQ0socywgMCk7ICoqKi9cbiAgICAgIGZsdXNoX2Jsb2NrX29ubHkocywgZmFsc2UpO1xuICAgICAgaWYgKHMuc3RybS5hdmFpbF9vdXQgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIEJTX05FRURfTU9SRTtcbiAgICAgIH1cbiAgICAgIC8qKiovXG4gICAgfVxuICB9XG4gIHMuaW5zZXJ0ID0gMDtcbiAgaWYgKGZsdXNoID09PSBaX0ZJTklTSCkge1xuICAgIC8qKiogRkxVU0hfQkxPQ0socywgMSk7ICoqKi9cbiAgICBmbHVzaF9ibG9ja19vbmx5KHMsIHRydWUpO1xuICAgIGlmIChzLnN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICByZXR1cm4gQlNfRklOSVNIX1NUQVJURUQ7XG4gICAgfVxuICAgIC8qKiovXG4gICAgcmV0dXJuIEJTX0ZJTklTSF9ET05FO1xuICB9XG4gIGlmIChzLmxhc3RfbGl0KSB7XG4gICAgLyoqKiBGTFVTSF9CTE9DSyhzLCAwKTsgKioqL1xuICAgIGZsdXNoX2Jsb2NrX29ubHkocywgZmFsc2UpO1xuICAgIGlmIChzLnN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICByZXR1cm4gQlNfTkVFRF9NT1JFO1xuICAgIH1cbiAgICAvKioqL1xuICB9XG4gIHJldHVybiBCU19CTE9DS19ET05FO1xufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEZvciBaX0hVRkZNQU5fT05MWSwgZG8gbm90IGxvb2sgZm9yIG1hdGNoZXMuICBEbyBub3QgbWFpbnRhaW4gYSBoYXNoIHRhYmxlLlxuICogKEl0IHdpbGwgYmUgcmVnZW5lcmF0ZWQgaWYgdGhpcyBydW4gb2YgZGVmbGF0ZSBzd2l0Y2hlcyBhd2F5IGZyb20gSHVmZm1hbi4pXG4gKi9cbmZ1bmN0aW9uIGRlZmxhdGVfaHVmZihzLCBmbHVzaCkge1xuICB2YXIgYmZsdXNoOyAgICAgICAgICAgICAvKiBzZXQgaWYgY3VycmVudCBibG9jayBtdXN0IGJlIGZsdXNoZWQgKi9cblxuICBmb3IgKDs7KSB7XG4gICAgLyogTWFrZSBzdXJlIHRoYXQgd2UgaGF2ZSBhIGxpdGVyYWwgdG8gd3JpdGUuICovXG4gICAgaWYgKHMubG9va2FoZWFkID09PSAwKSB7XG4gICAgICBmaWxsX3dpbmRvdyhzKTtcbiAgICAgIGlmIChzLmxvb2thaGVhZCA9PT0gMCkge1xuICAgICAgICBpZiAoZmx1c2ggPT09IFpfTk9fRkxVU0gpIHtcbiAgICAgICAgICByZXR1cm4gQlNfTkVFRF9NT1JFO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrOyAgICAgIC8qIGZsdXNoIHRoZSBjdXJyZW50IGJsb2NrICovXG4gICAgICB9XG4gICAgfVxuXG4gICAgLyogT3V0cHV0IGEgbGl0ZXJhbCBieXRlICovXG4gICAgcy5tYXRjaF9sZW5ndGggPSAwO1xuICAgIC8vVHJhY2V2digoc3RkZXJyLFwiJWNcIiwgcy0+d2luZG93W3MtPnN0cnN0YXJ0XSkpO1xuICAgIC8qKiogX3RyX3RhbGx5X2xpdChzLCBzLndpbmRvd1tzLnN0cnN0YXJ0XSwgYmZsdXNoKTsgKioqL1xuICAgIGJmbHVzaCA9IHRyZWVzLl90cl90YWxseShzLCAwLCBzLndpbmRvd1tzLnN0cnN0YXJ0XSk7XG4gICAgcy5sb29rYWhlYWQtLTtcbiAgICBzLnN0cnN0YXJ0Kys7XG4gICAgaWYgKGJmbHVzaCkge1xuICAgICAgLyoqKiBGTFVTSF9CTE9DSyhzLCAwKTsgKioqL1xuICAgICAgZmx1c2hfYmxvY2tfb25seShzLCBmYWxzZSk7XG4gICAgICBpZiAocy5zdHJtLmF2YWlsX291dCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gQlNfTkVFRF9NT1JFO1xuICAgICAgfVxuICAgICAgLyoqKi9cbiAgICB9XG4gIH1cbiAgcy5pbnNlcnQgPSAwO1xuICBpZiAoZmx1c2ggPT09IFpfRklOSVNIKSB7XG4gICAgLyoqKiBGTFVTSF9CTE9DSyhzLCAxKTsgKioqL1xuICAgIGZsdXNoX2Jsb2NrX29ubHkocywgdHJ1ZSk7XG4gICAgaWYgKHMuc3RybS5hdmFpbF9vdXQgPT09IDApIHtcbiAgICAgIHJldHVybiBCU19GSU5JU0hfU1RBUlRFRDtcbiAgICB9XG4gICAgLyoqKi9cbiAgICByZXR1cm4gQlNfRklOSVNIX0RPTkU7XG4gIH1cbiAgaWYgKHMubGFzdF9saXQpIHtcbiAgICAvKioqIEZMVVNIX0JMT0NLKHMsIDApOyAqKiovXG4gICAgZmx1c2hfYmxvY2tfb25seShzLCBmYWxzZSk7XG4gICAgaWYgKHMuc3RybS5hdmFpbF9vdXQgPT09IDApIHtcbiAgICAgIHJldHVybiBCU19ORUVEX01PUkU7XG4gICAgfVxuICAgIC8qKiovXG4gIH1cbiAgcmV0dXJuIEJTX0JMT0NLX0RPTkU7XG59XG5cbi8qIFZhbHVlcyBmb3IgbWF4X2xhenlfbWF0Y2gsIGdvb2RfbWF0Y2ggYW5kIG1heF9jaGFpbl9sZW5ndGgsIGRlcGVuZGluZyBvblxuICogdGhlIGRlc2lyZWQgcGFjayBsZXZlbCAoMC4uOSkuIFRoZSB2YWx1ZXMgZ2l2ZW4gYmVsb3cgaGF2ZSBiZWVuIHR1bmVkIHRvXG4gKiBleGNsdWRlIHdvcnN0IGNhc2UgcGVyZm9ybWFuY2UgZm9yIHBhdGhvbG9naWNhbCBmaWxlcy4gQmV0dGVyIHZhbHVlcyBtYXkgYmVcbiAqIGZvdW5kIGZvciBzcGVjaWZpYyBmaWxlcy5cbiAqL1xuZnVuY3Rpb24gQ29uZmlnKGdvb2RfbGVuZ3RoLCBtYXhfbGF6eSwgbmljZV9sZW5ndGgsIG1heF9jaGFpbiwgZnVuYykge1xuICB0aGlzLmdvb2RfbGVuZ3RoID0gZ29vZF9sZW5ndGg7XG4gIHRoaXMubWF4X2xhenkgPSBtYXhfbGF6eTtcbiAgdGhpcy5uaWNlX2xlbmd0aCA9IG5pY2VfbGVuZ3RoO1xuICB0aGlzLm1heF9jaGFpbiA9IG1heF9jaGFpbjtcbiAgdGhpcy5mdW5jID0gZnVuYztcbn1cblxudmFyIGNvbmZpZ3VyYXRpb25fdGFibGU7XG5cbmNvbmZpZ3VyYXRpb25fdGFibGUgPSBbXG4gIC8qICAgICAgZ29vZCBsYXp5IG5pY2UgY2hhaW4gKi9cbiAgbmV3IENvbmZpZygwLCAwLCAwLCAwLCBkZWZsYXRlX3N0b3JlZCksICAgICAgICAgIC8qIDAgc3RvcmUgb25seSAqL1xuICBuZXcgQ29uZmlnKDQsIDQsIDgsIDQsIGRlZmxhdGVfZmFzdCksICAgICAgICAgICAgLyogMSBtYXggc3BlZWQsIG5vIGxhenkgbWF0Y2hlcyAqL1xuICBuZXcgQ29uZmlnKDQsIDUsIDE2LCA4LCBkZWZsYXRlX2Zhc3QpLCAgICAgICAgICAgLyogMiAqL1xuICBuZXcgQ29uZmlnKDQsIDYsIDMyLCAzMiwgZGVmbGF0ZV9mYXN0KSwgICAgICAgICAgLyogMyAqL1xuXG4gIG5ldyBDb25maWcoNCwgNCwgMTYsIDE2LCBkZWZsYXRlX3Nsb3cpLCAgICAgICAgICAvKiA0IGxhenkgbWF0Y2hlcyAqL1xuICBuZXcgQ29uZmlnKDgsIDE2LCAzMiwgMzIsIGRlZmxhdGVfc2xvdyksICAgICAgICAgLyogNSAqL1xuICBuZXcgQ29uZmlnKDgsIDE2LCAxMjgsIDEyOCwgZGVmbGF0ZV9zbG93KSwgICAgICAgLyogNiAqL1xuICBuZXcgQ29uZmlnKDgsIDMyLCAxMjgsIDI1NiwgZGVmbGF0ZV9zbG93KSwgICAgICAgLyogNyAqL1xuICBuZXcgQ29uZmlnKDMyLCAxMjgsIDI1OCwgMTAyNCwgZGVmbGF0ZV9zbG93KSwgICAgLyogOCAqL1xuICBuZXcgQ29uZmlnKDMyLCAyNTgsIDI1OCwgNDA5NiwgZGVmbGF0ZV9zbG93KSAgICAgLyogOSBtYXggY29tcHJlc3Npb24gKi9cbl07XG5cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBJbml0aWFsaXplIHRoZSBcImxvbmdlc3QgbWF0Y2hcIiByb3V0aW5lcyBmb3IgYSBuZXcgemxpYiBzdHJlYW1cbiAqL1xuZnVuY3Rpb24gbG1faW5pdChzKSB7XG4gIHMud2luZG93X3NpemUgPSAyICogcy53X3NpemU7XG5cbiAgLyoqKiBDTEVBUl9IQVNIKHMpOyAqKiovXG4gIHplcm8ocy5oZWFkKTsgLy8gRmlsbCB3aXRoIE5JTCAoPSAwKTtcblxuICAvKiBTZXQgdGhlIGRlZmF1bHQgY29uZmlndXJhdGlvbiBwYXJhbWV0ZXJzOlxuICAgKi9cbiAgcy5tYXhfbGF6eV9tYXRjaCA9IGNvbmZpZ3VyYXRpb25fdGFibGVbcy5sZXZlbF0ubWF4X2xhenk7XG4gIHMuZ29vZF9tYXRjaCA9IGNvbmZpZ3VyYXRpb25fdGFibGVbcy5sZXZlbF0uZ29vZF9sZW5ndGg7XG4gIHMubmljZV9tYXRjaCA9IGNvbmZpZ3VyYXRpb25fdGFibGVbcy5sZXZlbF0ubmljZV9sZW5ndGg7XG4gIHMubWF4X2NoYWluX2xlbmd0aCA9IGNvbmZpZ3VyYXRpb25fdGFibGVbcy5sZXZlbF0ubWF4X2NoYWluO1xuXG4gIHMuc3Ryc3RhcnQgPSAwO1xuICBzLmJsb2NrX3N0YXJ0ID0gMDtcbiAgcy5sb29rYWhlYWQgPSAwO1xuICBzLmluc2VydCA9IDA7XG4gIHMubWF0Y2hfbGVuZ3RoID0gcy5wcmV2X2xlbmd0aCA9IE1JTl9NQVRDSCAtIDE7XG4gIHMubWF0Y2hfYXZhaWxhYmxlID0gMDtcbiAgcy5pbnNfaCA9IDA7XG59XG5cblxuZnVuY3Rpb24gRGVmbGF0ZVN0YXRlKCkge1xuICB0aGlzLnN0cm0gPSBudWxsOyAgICAgICAgICAgIC8qIHBvaW50ZXIgYmFjayB0byB0aGlzIHpsaWIgc3RyZWFtICovXG4gIHRoaXMuc3RhdHVzID0gMDsgICAgICAgICAgICAvKiBhcyB0aGUgbmFtZSBpbXBsaWVzICovXG4gIHRoaXMucGVuZGluZ19idWYgPSBudWxsOyAgICAgIC8qIG91dHB1dCBzdGlsbCBwZW5kaW5nICovXG4gIHRoaXMucGVuZGluZ19idWZfc2l6ZSA9IDA7ICAvKiBzaXplIG9mIHBlbmRpbmdfYnVmICovXG4gIHRoaXMucGVuZGluZ19vdXQgPSAwOyAgICAgICAvKiBuZXh0IHBlbmRpbmcgYnl0ZSB0byBvdXRwdXQgdG8gdGhlIHN0cmVhbSAqL1xuICB0aGlzLnBlbmRpbmcgPSAwOyAgICAgICAgICAgLyogbmIgb2YgYnl0ZXMgaW4gdGhlIHBlbmRpbmcgYnVmZmVyICovXG4gIHRoaXMud3JhcCA9IDA7ICAgICAgICAgICAgICAvKiBiaXQgMCB0cnVlIGZvciB6bGliLCBiaXQgMSB0cnVlIGZvciBnemlwICovXG4gIHRoaXMuZ3poZWFkID0gbnVsbDsgICAgICAgICAvKiBnemlwIGhlYWRlciBpbmZvcm1hdGlvbiB0byB3cml0ZSAqL1xuICB0aGlzLmd6aW5kZXggPSAwOyAgICAgICAgICAgLyogd2hlcmUgaW4gZXh0cmEsIG5hbWUsIG9yIGNvbW1lbnQgKi9cbiAgdGhpcy5tZXRob2QgPSBaX0RFRkxBVEVEOyAvKiBjYW4gb25seSBiZSBERUZMQVRFRCAqL1xuICB0aGlzLmxhc3RfZmx1c2ggPSAtMTsgICAvKiB2YWx1ZSBvZiBmbHVzaCBwYXJhbSBmb3IgcHJldmlvdXMgZGVmbGF0ZSBjYWxsICovXG5cbiAgdGhpcy53X3NpemUgPSAwOyAgLyogTFo3NyB3aW5kb3cgc2l6ZSAoMzJLIGJ5IGRlZmF1bHQpICovXG4gIHRoaXMud19iaXRzID0gMDsgIC8qIGxvZzIod19zaXplKSAgKDguLjE2KSAqL1xuICB0aGlzLndfbWFzayA9IDA7ICAvKiB3X3NpemUgLSAxICovXG5cbiAgdGhpcy53aW5kb3cgPSBudWxsO1xuICAvKiBTbGlkaW5nIHdpbmRvdy4gSW5wdXQgYnl0ZXMgYXJlIHJlYWQgaW50byB0aGUgc2Vjb25kIGhhbGYgb2YgdGhlIHdpbmRvdyxcbiAgICogYW5kIG1vdmUgdG8gdGhlIGZpcnN0IGhhbGYgbGF0ZXIgdG8ga2VlcCBhIGRpY3Rpb25hcnkgb2YgYXQgbGVhc3Qgd1NpemVcbiAgICogYnl0ZXMuIFdpdGggdGhpcyBvcmdhbml6YXRpb24sIG1hdGNoZXMgYXJlIGxpbWl0ZWQgdG8gYSBkaXN0YW5jZSBvZlxuICAgKiB3U2l6ZS1NQVhfTUFUQ0ggYnl0ZXMsIGJ1dCB0aGlzIGVuc3VyZXMgdGhhdCBJTyBpcyBhbHdheXNcbiAgICogcGVyZm9ybWVkIHdpdGggYSBsZW5ndGggbXVsdGlwbGUgb2YgdGhlIGJsb2NrIHNpemUuXG4gICAqL1xuXG4gIHRoaXMud2luZG93X3NpemUgPSAwO1xuICAvKiBBY3R1YWwgc2l6ZSBvZiB3aW5kb3c6IDIqd1NpemUsIGV4Y2VwdCB3aGVuIHRoZSB1c2VyIGlucHV0IGJ1ZmZlclxuICAgKiBpcyBkaXJlY3RseSB1c2VkIGFzIHNsaWRpbmcgd2luZG93LlxuICAgKi9cblxuICB0aGlzLnByZXYgPSBudWxsO1xuICAvKiBMaW5rIHRvIG9sZGVyIHN0cmluZyB3aXRoIHNhbWUgaGFzaCBpbmRleC4gVG8gbGltaXQgdGhlIHNpemUgb2YgdGhpc1xuICAgKiBhcnJheSB0byA2NEssIHRoaXMgbGluayBpcyBtYWludGFpbmVkIG9ubHkgZm9yIHRoZSBsYXN0IDMySyBzdHJpbmdzLlxuICAgKiBBbiBpbmRleCBpbiB0aGlzIGFycmF5IGlzIHRodXMgYSB3aW5kb3cgaW5kZXggbW9kdWxvIDMySy5cbiAgICovXG5cbiAgdGhpcy5oZWFkID0gbnVsbDsgICAvKiBIZWFkcyBvZiB0aGUgaGFzaCBjaGFpbnMgb3IgTklMLiAqL1xuXG4gIHRoaXMuaW5zX2ggPSAwOyAgICAgICAvKiBoYXNoIGluZGV4IG9mIHN0cmluZyB0byBiZSBpbnNlcnRlZCAqL1xuICB0aGlzLmhhc2hfc2l6ZSA9IDA7ICAgLyogbnVtYmVyIG9mIGVsZW1lbnRzIGluIGhhc2ggdGFibGUgKi9cbiAgdGhpcy5oYXNoX2JpdHMgPSAwOyAgIC8qIGxvZzIoaGFzaF9zaXplKSAqL1xuICB0aGlzLmhhc2hfbWFzayA9IDA7ICAgLyogaGFzaF9zaXplLTEgKi9cblxuICB0aGlzLmhhc2hfc2hpZnQgPSAwO1xuICAvKiBOdW1iZXIgb2YgYml0cyBieSB3aGljaCBpbnNfaCBtdXN0IGJlIHNoaWZ0ZWQgYXQgZWFjaCBpbnB1dFxuICAgKiBzdGVwLiBJdCBtdXN0IGJlIHN1Y2ggdGhhdCBhZnRlciBNSU5fTUFUQ0ggc3RlcHMsIHRoZSBvbGRlc3RcbiAgICogYnl0ZSBubyBsb25nZXIgdGFrZXMgcGFydCBpbiB0aGUgaGFzaCBrZXksIHRoYXQgaXM6XG4gICAqICAgaGFzaF9zaGlmdCAqIE1JTl9NQVRDSCA+PSBoYXNoX2JpdHNcbiAgICovXG5cbiAgdGhpcy5ibG9ja19zdGFydCA9IDA7XG4gIC8qIFdpbmRvdyBwb3NpdGlvbiBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBjdXJyZW50IG91dHB1dCBibG9jay4gR2V0c1xuICAgKiBuZWdhdGl2ZSB3aGVuIHRoZSB3aW5kb3cgaXMgbW92ZWQgYmFja3dhcmRzLlxuICAgKi9cblxuICB0aGlzLm1hdGNoX2xlbmd0aCA9IDA7ICAgICAgLyogbGVuZ3RoIG9mIGJlc3QgbWF0Y2ggKi9cbiAgdGhpcy5wcmV2X21hdGNoID0gMDsgICAgICAgIC8qIHByZXZpb3VzIG1hdGNoICovXG4gIHRoaXMubWF0Y2hfYXZhaWxhYmxlID0gMDsgICAvKiBzZXQgaWYgcHJldmlvdXMgbWF0Y2ggZXhpc3RzICovXG4gIHRoaXMuc3Ryc3RhcnQgPSAwOyAgICAgICAgICAvKiBzdGFydCBvZiBzdHJpbmcgdG8gaW5zZXJ0ICovXG4gIHRoaXMubWF0Y2hfc3RhcnQgPSAwOyAgICAgICAvKiBzdGFydCBvZiBtYXRjaGluZyBzdHJpbmcgKi9cbiAgdGhpcy5sb29rYWhlYWQgPSAwOyAgICAgICAgIC8qIG51bWJlciBvZiB2YWxpZCBieXRlcyBhaGVhZCBpbiB3aW5kb3cgKi9cblxuICB0aGlzLnByZXZfbGVuZ3RoID0gMDtcbiAgLyogTGVuZ3RoIG9mIHRoZSBiZXN0IG1hdGNoIGF0IHByZXZpb3VzIHN0ZXAuIE1hdGNoZXMgbm90IGdyZWF0ZXIgdGhhbiB0aGlzXG4gICAqIGFyZSBkaXNjYXJkZWQuIFRoaXMgaXMgdXNlZCBpbiB0aGUgbGF6eSBtYXRjaCBldmFsdWF0aW9uLlxuICAgKi9cblxuICB0aGlzLm1heF9jaGFpbl9sZW5ndGggPSAwO1xuICAvKiBUbyBzcGVlZCB1cCBkZWZsYXRpb24sIGhhc2ggY2hhaW5zIGFyZSBuZXZlciBzZWFyY2hlZCBiZXlvbmQgdGhpc1xuICAgKiBsZW5ndGguICBBIGhpZ2hlciBsaW1pdCBpbXByb3ZlcyBjb21wcmVzc2lvbiByYXRpbyBidXQgZGVncmFkZXMgdGhlXG4gICAqIHNwZWVkLlxuICAgKi9cblxuICB0aGlzLm1heF9sYXp5X21hdGNoID0gMDtcbiAgLyogQXR0ZW1wdCB0byBmaW5kIGEgYmV0dGVyIG1hdGNoIG9ubHkgd2hlbiB0aGUgY3VycmVudCBtYXRjaCBpcyBzdHJpY3RseVxuICAgKiBzbWFsbGVyIHRoYW4gdGhpcyB2YWx1ZS4gVGhpcyBtZWNoYW5pc20gaXMgdXNlZCBvbmx5IGZvciBjb21wcmVzc2lvblxuICAgKiBsZXZlbHMgPj0gNC5cbiAgICovXG4gIC8vIFRoYXQncyBhbGlhcyB0byBtYXhfbGF6eV9tYXRjaCwgZG9uJ3QgdXNlIGRpcmVjdGx5XG4gIC8vdGhpcy5tYXhfaW5zZXJ0X2xlbmd0aCA9IDA7XG4gIC8qIEluc2VydCBuZXcgc3RyaW5ncyBpbiB0aGUgaGFzaCB0YWJsZSBvbmx5IGlmIHRoZSBtYXRjaCBsZW5ndGggaXMgbm90XG4gICAqIGdyZWF0ZXIgdGhhbiB0aGlzIGxlbmd0aC4gVGhpcyBzYXZlcyB0aW1lIGJ1dCBkZWdyYWRlcyBjb21wcmVzc2lvbi5cbiAgICogbWF4X2luc2VydF9sZW5ndGggaXMgdXNlZCBvbmx5IGZvciBjb21wcmVzc2lvbiBsZXZlbHMgPD0gMy5cbiAgICovXG5cbiAgdGhpcy5sZXZlbCA9IDA7ICAgICAvKiBjb21wcmVzc2lvbiBsZXZlbCAoMS4uOSkgKi9cbiAgdGhpcy5zdHJhdGVneSA9IDA7ICAvKiBmYXZvciBvciBmb3JjZSBIdWZmbWFuIGNvZGluZyovXG5cbiAgdGhpcy5nb29kX21hdGNoID0gMDtcbiAgLyogVXNlIGEgZmFzdGVyIHNlYXJjaCB3aGVuIHRoZSBwcmV2aW91cyBtYXRjaCBpcyBsb25nZXIgdGhhbiB0aGlzICovXG5cbiAgdGhpcy5uaWNlX21hdGNoID0gMDsgLyogU3RvcCBzZWFyY2hpbmcgd2hlbiBjdXJyZW50IG1hdGNoIGV4Y2VlZHMgdGhpcyAqL1xuXG4gICAgICAgICAgICAgIC8qIHVzZWQgYnkgdHJlZXMuYzogKi9cblxuICAvKiBEaWRuJ3QgdXNlIGN0X2RhdGEgdHlwZWRlZiBiZWxvdyB0byBzdXBwcmVzcyBjb21waWxlciB3YXJuaW5nICovXG5cbiAgLy8gc3RydWN0IGN0X2RhdGFfcyBkeW5fbHRyZWVbSEVBUF9TSVpFXTsgICAvKiBsaXRlcmFsIGFuZCBsZW5ndGggdHJlZSAqL1xuICAvLyBzdHJ1Y3QgY3RfZGF0YV9zIGR5bl9kdHJlZVsyKkRfQ09ERVMrMV07IC8qIGRpc3RhbmNlIHRyZWUgKi9cbiAgLy8gc3RydWN0IGN0X2RhdGFfcyBibF90cmVlWzIqQkxfQ09ERVMrMV07ICAvKiBIdWZmbWFuIHRyZWUgZm9yIGJpdCBsZW5ndGhzICovXG5cbiAgLy8gVXNlIGZsYXQgYXJyYXkgb2YgRE9VQkxFIHNpemUsIHdpdGggaW50ZXJsZWF2ZWQgZmF0YSxcbiAgLy8gYmVjYXVzZSBKUyBkb2VzIG5vdCBzdXBwb3J0IGVmZmVjdGl2ZVxuICB0aGlzLmR5bl9sdHJlZSAgPSBuZXcgdXRpbHMuQnVmMTYoSEVBUF9TSVpFICogMik7XG4gIHRoaXMuZHluX2R0cmVlICA9IG5ldyB1dGlscy5CdWYxNigoMiAqIERfQ09ERVMgKyAxKSAqIDIpO1xuICB0aGlzLmJsX3RyZWUgICAgPSBuZXcgdXRpbHMuQnVmMTYoKDIgKiBCTF9DT0RFUyArIDEpICogMik7XG4gIHplcm8odGhpcy5keW5fbHRyZWUpO1xuICB6ZXJvKHRoaXMuZHluX2R0cmVlKTtcbiAgemVybyh0aGlzLmJsX3RyZWUpO1xuXG4gIHRoaXMubF9kZXNjICAgPSBudWxsOyAgICAgICAgIC8qIGRlc2MuIGZvciBsaXRlcmFsIHRyZWUgKi9cbiAgdGhpcy5kX2Rlc2MgICA9IG51bGw7ICAgICAgICAgLyogZGVzYy4gZm9yIGRpc3RhbmNlIHRyZWUgKi9cbiAgdGhpcy5ibF9kZXNjICA9IG51bGw7ICAgICAgICAgLyogZGVzYy4gZm9yIGJpdCBsZW5ndGggdHJlZSAqL1xuXG4gIC8vdXNoIGJsX2NvdW50W01BWF9CSVRTKzFdO1xuICB0aGlzLmJsX2NvdW50ID0gbmV3IHV0aWxzLkJ1ZjE2KE1BWF9CSVRTICsgMSk7XG4gIC8qIG51bWJlciBvZiBjb2RlcyBhdCBlYWNoIGJpdCBsZW5ndGggZm9yIGFuIG9wdGltYWwgdHJlZSAqL1xuXG4gIC8vaW50IGhlYXBbMipMX0NPREVTKzFdOyAgICAgIC8qIGhlYXAgdXNlZCB0byBidWlsZCB0aGUgSHVmZm1hbiB0cmVlcyAqL1xuICB0aGlzLmhlYXAgPSBuZXcgdXRpbHMuQnVmMTYoMiAqIExfQ09ERVMgKyAxKTsgIC8qIGhlYXAgdXNlZCB0byBidWlsZCB0aGUgSHVmZm1hbiB0cmVlcyAqL1xuICB6ZXJvKHRoaXMuaGVhcCk7XG5cbiAgdGhpcy5oZWFwX2xlbiA9IDA7ICAgICAgICAgICAgICAgLyogbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBoZWFwICovXG4gIHRoaXMuaGVhcF9tYXggPSAwOyAgICAgICAgICAgICAgIC8qIGVsZW1lbnQgb2YgbGFyZ2VzdCBmcmVxdWVuY3kgKi9cbiAgLyogVGhlIHNvbnMgb2YgaGVhcFtuXSBhcmUgaGVhcFsyKm5dIGFuZCBoZWFwWzIqbisxXS4gaGVhcFswXSBpcyBub3QgdXNlZC5cbiAgICogVGhlIHNhbWUgaGVhcCBhcnJheSBpcyB1c2VkIHRvIGJ1aWxkIGFsbCB0cmVlcy5cbiAgICovXG5cbiAgdGhpcy5kZXB0aCA9IG5ldyB1dGlscy5CdWYxNigyICogTF9DT0RFUyArIDEpOyAvL3VjaCBkZXB0aFsyKkxfQ09ERVMrMV07XG4gIHplcm8odGhpcy5kZXB0aCk7XG4gIC8qIERlcHRoIG9mIGVhY2ggc3VidHJlZSB1c2VkIGFzIHRpZSBicmVha2VyIGZvciB0cmVlcyBvZiBlcXVhbCBmcmVxdWVuY3lcbiAgICovXG5cbiAgdGhpcy5sX2J1ZiA9IDA7ICAgICAgICAgIC8qIGJ1ZmZlciBpbmRleCBmb3IgbGl0ZXJhbHMgb3IgbGVuZ3RocyAqL1xuXG4gIHRoaXMubGl0X2J1ZnNpemUgPSAwO1xuICAvKiBTaXplIG9mIG1hdGNoIGJ1ZmZlciBmb3IgbGl0ZXJhbHMvbGVuZ3Rocy4gIFRoZXJlIGFyZSA0IHJlYXNvbnMgZm9yXG4gICAqIGxpbWl0aW5nIGxpdF9idWZzaXplIHRvIDY0SzpcbiAgICogICAtIGZyZXF1ZW5jaWVzIGNhbiBiZSBrZXB0IGluIDE2IGJpdCBjb3VudGVyc1xuICAgKiAgIC0gaWYgY29tcHJlc3Npb24gaXMgbm90IHN1Y2Nlc3NmdWwgZm9yIHRoZSBmaXJzdCBibG9jaywgYWxsIGlucHV0XG4gICAqICAgICBkYXRhIGlzIHN0aWxsIGluIHRoZSB3aW5kb3cgc28gd2UgY2FuIHN0aWxsIGVtaXQgYSBzdG9yZWQgYmxvY2sgZXZlblxuICAgKiAgICAgd2hlbiBpbnB1dCBjb21lcyBmcm9tIHN0YW5kYXJkIGlucHV0LiAgKFRoaXMgY2FuIGFsc28gYmUgZG9uZSBmb3JcbiAgICogICAgIGFsbCBibG9ja3MgaWYgbGl0X2J1ZnNpemUgaXMgbm90IGdyZWF0ZXIgdGhhbiAzMksuKVxuICAgKiAgIC0gaWYgY29tcHJlc3Npb24gaXMgbm90IHN1Y2Nlc3NmdWwgZm9yIGEgZmlsZSBzbWFsbGVyIHRoYW4gNjRLLCB3ZSBjYW5cbiAgICogICAgIGV2ZW4gZW1pdCBhIHN0b3JlZCBmaWxlIGluc3RlYWQgb2YgYSBzdG9yZWQgYmxvY2sgKHNhdmluZyA1IGJ5dGVzKS5cbiAgICogICAgIFRoaXMgaXMgYXBwbGljYWJsZSBvbmx5IGZvciB6aXAgKG5vdCBnemlwIG9yIHpsaWIpLlxuICAgKiAgIC0gY3JlYXRpbmcgbmV3IEh1ZmZtYW4gdHJlZXMgbGVzcyBmcmVxdWVudGx5IG1heSBub3QgcHJvdmlkZSBmYXN0XG4gICAqICAgICBhZGFwdGF0aW9uIHRvIGNoYW5nZXMgaW4gdGhlIGlucHV0IGRhdGEgc3RhdGlzdGljcy4gKFRha2UgZm9yXG4gICAqICAgICBleGFtcGxlIGEgYmluYXJ5IGZpbGUgd2l0aCBwb29ybHkgY29tcHJlc3NpYmxlIGNvZGUgZm9sbG93ZWQgYnlcbiAgICogICAgIGEgaGlnaGx5IGNvbXByZXNzaWJsZSBzdHJpbmcgdGFibGUuKSBTbWFsbGVyIGJ1ZmZlciBzaXplcyBnaXZlXG4gICAqICAgICBmYXN0IGFkYXB0YXRpb24gYnV0IGhhdmUgb2YgY291cnNlIHRoZSBvdmVyaGVhZCBvZiB0cmFuc21pdHRpbmdcbiAgICogICAgIHRyZWVzIG1vcmUgZnJlcXVlbnRseS5cbiAgICogICAtIEkgY2FuJ3QgY291bnQgYWJvdmUgNFxuICAgKi9cblxuICB0aGlzLmxhc3RfbGl0ID0gMDsgICAgICAvKiBydW5uaW5nIGluZGV4IGluIGxfYnVmICovXG5cbiAgdGhpcy5kX2J1ZiA9IDA7XG4gIC8qIEJ1ZmZlciBpbmRleCBmb3IgZGlzdGFuY2VzLiBUbyBzaW1wbGlmeSB0aGUgY29kZSwgZF9idWYgYW5kIGxfYnVmIGhhdmVcbiAgICogdGhlIHNhbWUgbnVtYmVyIG9mIGVsZW1lbnRzLiBUbyB1c2UgZGlmZmVyZW50IGxlbmd0aHMsIGFuIGV4dHJhIGZsYWdcbiAgICogYXJyYXkgd291bGQgYmUgbmVjZXNzYXJ5LlxuICAgKi9cblxuICB0aGlzLm9wdF9sZW4gPSAwOyAgICAgICAvKiBiaXQgbGVuZ3RoIG9mIGN1cnJlbnQgYmxvY2sgd2l0aCBvcHRpbWFsIHRyZWVzICovXG4gIHRoaXMuc3RhdGljX2xlbiA9IDA7ICAgIC8qIGJpdCBsZW5ndGggb2YgY3VycmVudCBibG9jayB3aXRoIHN0YXRpYyB0cmVlcyAqL1xuICB0aGlzLm1hdGNoZXMgPSAwOyAgICAgICAvKiBudW1iZXIgb2Ygc3RyaW5nIG1hdGNoZXMgaW4gY3VycmVudCBibG9jayAqL1xuICB0aGlzLmluc2VydCA9IDA7ICAgICAgICAvKiBieXRlcyBhdCBlbmQgb2Ygd2luZG93IGxlZnQgdG8gaW5zZXJ0ICovXG5cblxuICB0aGlzLmJpX2J1ZiA9IDA7XG4gIC8qIE91dHB1dCBidWZmZXIuIGJpdHMgYXJlIGluc2VydGVkIHN0YXJ0aW5nIGF0IHRoZSBib3R0b20gKGxlYXN0XG4gICAqIHNpZ25pZmljYW50IGJpdHMpLlxuICAgKi9cbiAgdGhpcy5iaV92YWxpZCA9IDA7XG4gIC8qIE51bWJlciBvZiB2YWxpZCBiaXRzIGluIGJpX2J1Zi4gIEFsbCBiaXRzIGFib3ZlIHRoZSBsYXN0IHZhbGlkIGJpdFxuICAgKiBhcmUgYWx3YXlzIHplcm8uXG4gICAqL1xuXG4gIC8vIFVzZWQgZm9yIHdpbmRvdyBtZW1vcnkgaW5pdC4gV2Ugc2FmZWx5IGlnbm9yZSBpdCBmb3IgSlMuIFRoYXQgbWFrZXNcbiAgLy8gc2Vuc2Ugb25seSBmb3IgcG9pbnRlcnMgYW5kIG1lbW9yeSBjaGVjayB0b29scy5cbiAgLy90aGlzLmhpZ2hfd2F0ZXIgPSAwO1xuICAvKiBIaWdoIHdhdGVyIG1hcmsgb2Zmc2V0IGluIHdpbmRvdyBmb3IgaW5pdGlhbGl6ZWQgYnl0ZXMgLS0gYnl0ZXMgYWJvdmVcbiAgICogdGhpcyBhcmUgc2V0IHRvIHplcm8gaW4gb3JkZXIgdG8gYXZvaWQgbWVtb3J5IGNoZWNrIHdhcm5pbmdzIHdoZW5cbiAgICogbG9uZ2VzdCBtYXRjaCByb3V0aW5lcyBhY2Nlc3MgYnl0ZXMgcGFzdCB0aGUgaW5wdXQuICBUaGlzIGlzIHRoZW5cbiAgICogdXBkYXRlZCB0byB0aGUgbmV3IGhpZ2ggd2F0ZXIgbWFyay5cbiAgICovXG59XG5cblxuZnVuY3Rpb24gZGVmbGF0ZVJlc2V0S2VlcChzdHJtKSB7XG4gIHZhciBzO1xuXG4gIGlmICghc3RybSB8fCAhc3RybS5zdGF0ZSkge1xuICAgIHJldHVybiBlcnIoc3RybSwgWl9TVFJFQU1fRVJST1IpO1xuICB9XG5cbiAgc3RybS50b3RhbF9pbiA9IHN0cm0udG90YWxfb3V0ID0gMDtcbiAgc3RybS5kYXRhX3R5cGUgPSBaX1VOS05PV047XG5cbiAgcyA9IHN0cm0uc3RhdGU7XG4gIHMucGVuZGluZyA9IDA7XG4gIHMucGVuZGluZ19vdXQgPSAwO1xuXG4gIGlmIChzLndyYXAgPCAwKSB7XG4gICAgcy53cmFwID0gLXMud3JhcDtcbiAgICAvKiB3YXMgbWFkZSBuZWdhdGl2ZSBieSBkZWZsYXRlKC4uLiwgWl9GSU5JU0gpOyAqL1xuICB9XG4gIHMuc3RhdHVzID0gKHMud3JhcCA/IElOSVRfU1RBVEUgOiBCVVNZX1NUQVRFKTtcbiAgc3RybS5hZGxlciA9IChzLndyYXAgPT09IDIpID9cbiAgICAwICAvLyBjcmMzMigwLCBaX05VTEwsIDApXG4gIDpcbiAgICAxOyAvLyBhZGxlcjMyKDAsIFpfTlVMTCwgMClcbiAgcy5sYXN0X2ZsdXNoID0gWl9OT19GTFVTSDtcbiAgdHJlZXMuX3RyX2luaXQocyk7XG4gIHJldHVybiBaX09LO1xufVxuXG5cbmZ1bmN0aW9uIGRlZmxhdGVSZXNldChzdHJtKSB7XG4gIHZhciByZXQgPSBkZWZsYXRlUmVzZXRLZWVwKHN0cm0pO1xuICBpZiAocmV0ID09PSBaX09LKSB7XG4gICAgbG1faW5pdChzdHJtLnN0YXRlKTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5cbmZ1bmN0aW9uIGRlZmxhdGVTZXRIZWFkZXIoc3RybSwgaGVhZCkge1xuICBpZiAoIXN0cm0gfHwgIXN0cm0uc3RhdGUpIHsgcmV0dXJuIFpfU1RSRUFNX0VSUk9SOyB9XG4gIGlmIChzdHJtLnN0YXRlLndyYXAgIT09IDIpIHsgcmV0dXJuIFpfU1RSRUFNX0VSUk9SOyB9XG4gIHN0cm0uc3RhdGUuZ3poZWFkID0gaGVhZDtcbiAgcmV0dXJuIFpfT0s7XG59XG5cblxuZnVuY3Rpb24gZGVmbGF0ZUluaXQyKHN0cm0sIGxldmVsLCBtZXRob2QsIHdpbmRvd0JpdHMsIG1lbUxldmVsLCBzdHJhdGVneSkge1xuICBpZiAoIXN0cm0pIHsgLy8gPT09IFpfTlVMTFxuICAgIHJldHVybiBaX1NUUkVBTV9FUlJPUjtcbiAgfVxuICB2YXIgd3JhcCA9IDE7XG5cbiAgaWYgKGxldmVsID09PSBaX0RFRkFVTFRfQ09NUFJFU1NJT04pIHtcbiAgICBsZXZlbCA9IDY7XG4gIH1cblxuICBpZiAod2luZG93Qml0cyA8IDApIHsgLyogc3VwcHJlc3MgemxpYiB3cmFwcGVyICovXG4gICAgd3JhcCA9IDA7XG4gICAgd2luZG93Qml0cyA9IC13aW5kb3dCaXRzO1xuICB9XG5cbiAgZWxzZSBpZiAod2luZG93Qml0cyA+IDE1KSB7XG4gICAgd3JhcCA9IDI7ICAgICAgICAgICAvKiB3cml0ZSBnemlwIHdyYXBwZXIgaW5zdGVhZCAqL1xuICAgIHdpbmRvd0JpdHMgLT0gMTY7XG4gIH1cblxuXG4gIGlmIChtZW1MZXZlbCA8IDEgfHwgbWVtTGV2ZWwgPiBNQVhfTUVNX0xFVkVMIHx8IG1ldGhvZCAhPT0gWl9ERUZMQVRFRCB8fFxuICAgIHdpbmRvd0JpdHMgPCA4IHx8IHdpbmRvd0JpdHMgPiAxNSB8fCBsZXZlbCA8IDAgfHwgbGV2ZWwgPiA5IHx8XG4gICAgc3RyYXRlZ3kgPCAwIHx8IHN0cmF0ZWd5ID4gWl9GSVhFRCkge1xuICAgIHJldHVybiBlcnIoc3RybSwgWl9TVFJFQU1fRVJST1IpO1xuICB9XG5cblxuICBpZiAod2luZG93Qml0cyA9PT0gOCkge1xuICAgIHdpbmRvd0JpdHMgPSA5O1xuICB9XG4gIC8qIHVudGlsIDI1Ni1ieXRlIHdpbmRvdyBidWcgZml4ZWQgKi9cblxuICB2YXIgcyA9IG5ldyBEZWZsYXRlU3RhdGUoKTtcblxuICBzdHJtLnN0YXRlID0gcztcbiAgcy5zdHJtID0gc3RybTtcblxuICBzLndyYXAgPSB3cmFwO1xuICBzLmd6aGVhZCA9IG51bGw7XG4gIHMud19iaXRzID0gd2luZG93Qml0cztcbiAgcy53X3NpemUgPSAxIDw8IHMud19iaXRzO1xuICBzLndfbWFzayA9IHMud19zaXplIC0gMTtcblxuICBzLmhhc2hfYml0cyA9IG1lbUxldmVsICsgNztcbiAgcy5oYXNoX3NpemUgPSAxIDw8IHMuaGFzaF9iaXRzO1xuICBzLmhhc2hfbWFzayA9IHMuaGFzaF9zaXplIC0gMTtcbiAgcy5oYXNoX3NoaWZ0ID0gfn4oKHMuaGFzaF9iaXRzICsgTUlOX01BVENIIC0gMSkgLyBNSU5fTUFUQ0gpO1xuXG4gIHMud2luZG93ID0gbmV3IHV0aWxzLkJ1Zjgocy53X3NpemUgKiAyKTtcbiAgcy5oZWFkID0gbmV3IHV0aWxzLkJ1ZjE2KHMuaGFzaF9zaXplKTtcbiAgcy5wcmV2ID0gbmV3IHV0aWxzLkJ1ZjE2KHMud19zaXplKTtcblxuICAvLyBEb24ndCBuZWVkIG1lbSBpbml0IG1hZ2ljIGZvciBKUy5cbiAgLy9zLmhpZ2hfd2F0ZXIgPSAwOyAgLyogbm90aGluZyB3cml0dGVuIHRvIHMtPndpbmRvdyB5ZXQgKi9cblxuICBzLmxpdF9idWZzaXplID0gMSA8PCAobWVtTGV2ZWwgKyA2KTsgLyogMTZLIGVsZW1lbnRzIGJ5IGRlZmF1bHQgKi9cblxuICBzLnBlbmRpbmdfYnVmX3NpemUgPSBzLmxpdF9idWZzaXplICogNDtcblxuICAvL292ZXJsYXkgPSAodXNoZiAqKSBaQUxMT0Moc3RybSwgcy0+bGl0X2J1ZnNpemUsIHNpemVvZih1c2gpKzIpO1xuICAvL3MtPnBlbmRpbmdfYnVmID0gKHVjaGYgKikgb3ZlcmxheTtcbiAgcy5wZW5kaW5nX2J1ZiA9IG5ldyB1dGlscy5CdWY4KHMucGVuZGluZ19idWZfc2l6ZSk7XG5cbiAgLy8gSXQgaXMgb2Zmc2V0IGZyb20gYHMucGVuZGluZ19idWZgIChzaXplIGlzIGBzLmxpdF9idWZzaXplICogMmApXG4gIC8vcy0+ZF9idWYgPSBvdmVybGF5ICsgcy0+bGl0X2J1ZnNpemUvc2l6ZW9mKHVzaCk7XG4gIHMuZF9idWYgPSAxICogcy5saXRfYnVmc2l6ZTtcblxuICAvL3MtPmxfYnVmID0gcy0+cGVuZGluZ19idWYgKyAoMStzaXplb2YodXNoKSkqcy0+bGl0X2J1ZnNpemU7XG4gIHMubF9idWYgPSAoMSArIDIpICogcy5saXRfYnVmc2l6ZTtcblxuICBzLmxldmVsID0gbGV2ZWw7XG4gIHMuc3RyYXRlZ3kgPSBzdHJhdGVneTtcbiAgcy5tZXRob2QgPSBtZXRob2Q7XG5cbiAgcmV0dXJuIGRlZmxhdGVSZXNldChzdHJtKTtcbn1cblxuZnVuY3Rpb24gZGVmbGF0ZUluaXQoc3RybSwgbGV2ZWwpIHtcbiAgcmV0dXJuIGRlZmxhdGVJbml0MihzdHJtLCBsZXZlbCwgWl9ERUZMQVRFRCwgTUFYX1dCSVRTLCBERUZfTUVNX0xFVkVMLCBaX0RFRkFVTFRfU1RSQVRFR1kpO1xufVxuXG5cbmZ1bmN0aW9uIGRlZmxhdGUoc3RybSwgZmx1c2gpIHtcbiAgdmFyIG9sZF9mbHVzaCwgcztcbiAgdmFyIGJlZywgdmFsOyAvLyBmb3IgZ3ppcCBoZWFkZXIgd3JpdGUgb25seVxuXG4gIGlmICghc3RybSB8fCAhc3RybS5zdGF0ZSB8fFxuICAgIGZsdXNoID4gWl9CTE9DSyB8fCBmbHVzaCA8IDApIHtcbiAgICByZXR1cm4gc3RybSA/IGVycihzdHJtLCBaX1NUUkVBTV9FUlJPUikgOiBaX1NUUkVBTV9FUlJPUjtcbiAgfVxuXG4gIHMgPSBzdHJtLnN0YXRlO1xuXG4gIGlmICghc3RybS5vdXRwdXQgfHxcbiAgICAgICghc3RybS5pbnB1dCAmJiBzdHJtLmF2YWlsX2luICE9PSAwKSB8fFxuICAgICAgKHMuc3RhdHVzID09PSBGSU5JU0hfU1RBVEUgJiYgZmx1c2ggIT09IFpfRklOSVNIKSkge1xuICAgIHJldHVybiBlcnIoc3RybSwgKHN0cm0uYXZhaWxfb3V0ID09PSAwKSA/IFpfQlVGX0VSUk9SIDogWl9TVFJFQU1fRVJST1IpO1xuICB9XG5cbiAgcy5zdHJtID0gc3RybTsgLyoganVzdCBpbiBjYXNlICovXG4gIG9sZF9mbHVzaCA9IHMubGFzdF9mbHVzaDtcbiAgcy5sYXN0X2ZsdXNoID0gZmx1c2g7XG5cbiAgLyogV3JpdGUgdGhlIGhlYWRlciAqL1xuICBpZiAocy5zdGF0dXMgPT09IElOSVRfU1RBVEUpIHtcblxuICAgIGlmIChzLndyYXAgPT09IDIpIHsgLy8gR1pJUCBoZWFkZXJcbiAgICAgIHN0cm0uYWRsZXIgPSAwOyAgLy9jcmMzMigwTCwgWl9OVUxMLCAwKTtcbiAgICAgIHB1dF9ieXRlKHMsIDMxKTtcbiAgICAgIHB1dF9ieXRlKHMsIDEzOSk7XG4gICAgICBwdXRfYnl0ZShzLCA4KTtcbiAgICAgIGlmICghcy5nemhlYWQpIHsgLy8gcy0+Z3poZWFkID09IFpfTlVMTFxuICAgICAgICBwdXRfYnl0ZShzLCAwKTtcbiAgICAgICAgcHV0X2J5dGUocywgMCk7XG4gICAgICAgIHB1dF9ieXRlKHMsIDApO1xuICAgICAgICBwdXRfYnl0ZShzLCAwKTtcbiAgICAgICAgcHV0X2J5dGUocywgMCk7XG4gICAgICAgIHB1dF9ieXRlKHMsIHMubGV2ZWwgPT09IDkgPyAyIDpcbiAgICAgICAgICAgICAgICAgICAgKHMuc3RyYXRlZ3kgPj0gWl9IVUZGTUFOX09OTFkgfHwgcy5sZXZlbCA8IDIgP1xuICAgICAgICAgICAgICAgICAgICAgNCA6IDApKTtcbiAgICAgICAgcHV0X2J5dGUocywgT1NfQ09ERSk7XG4gICAgICAgIHMuc3RhdHVzID0gQlVTWV9TVEFURTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBwdXRfYnl0ZShzLCAocy5nemhlYWQudGV4dCA/IDEgOiAwKSArXG4gICAgICAgICAgICAgICAgICAgIChzLmd6aGVhZC5oY3JjID8gMiA6IDApICtcbiAgICAgICAgICAgICAgICAgICAgKCFzLmd6aGVhZC5leHRyYSA/IDAgOiA0KSArXG4gICAgICAgICAgICAgICAgICAgICghcy5nemhlYWQubmFtZSA/IDAgOiA4KSArXG4gICAgICAgICAgICAgICAgICAgICghcy5nemhlYWQuY29tbWVudCA/IDAgOiAxNilcbiAgICAgICAgKTtcbiAgICAgICAgcHV0X2J5dGUocywgcy5nemhlYWQudGltZSAmIDB4ZmYpO1xuICAgICAgICBwdXRfYnl0ZShzLCAocy5nemhlYWQudGltZSA+PiA4KSAmIDB4ZmYpO1xuICAgICAgICBwdXRfYnl0ZShzLCAocy5nemhlYWQudGltZSA+PiAxNikgJiAweGZmKTtcbiAgICAgICAgcHV0X2J5dGUocywgKHMuZ3poZWFkLnRpbWUgPj4gMjQpICYgMHhmZik7XG4gICAgICAgIHB1dF9ieXRlKHMsIHMubGV2ZWwgPT09IDkgPyAyIDpcbiAgICAgICAgICAgICAgICAgICAgKHMuc3RyYXRlZ3kgPj0gWl9IVUZGTUFOX09OTFkgfHwgcy5sZXZlbCA8IDIgP1xuICAgICAgICAgICAgICAgICAgICAgNCA6IDApKTtcbiAgICAgICAgcHV0X2J5dGUocywgcy5nemhlYWQub3MgJiAweGZmKTtcbiAgICAgICAgaWYgKHMuZ3poZWFkLmV4dHJhICYmIHMuZ3poZWFkLmV4dHJhLmxlbmd0aCkge1xuICAgICAgICAgIHB1dF9ieXRlKHMsIHMuZ3poZWFkLmV4dHJhLmxlbmd0aCAmIDB4ZmYpO1xuICAgICAgICAgIHB1dF9ieXRlKHMsIChzLmd6aGVhZC5leHRyYS5sZW5ndGggPj4gOCkgJiAweGZmKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocy5nemhlYWQuaGNyYykge1xuICAgICAgICAgIHN0cm0uYWRsZXIgPSBjcmMzMihzdHJtLmFkbGVyLCBzLnBlbmRpbmdfYnVmLCBzLnBlbmRpbmcsIDApO1xuICAgICAgICB9XG4gICAgICAgIHMuZ3ppbmRleCA9IDA7XG4gICAgICAgIHMuc3RhdHVzID0gRVhUUkFfU1RBVEU7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgLy8gREVGTEFURSBoZWFkZXJcbiAgICB7XG4gICAgICB2YXIgaGVhZGVyID0gKFpfREVGTEFURUQgKyAoKHMud19iaXRzIC0gOCkgPDwgNCkpIDw8IDg7XG4gICAgICB2YXIgbGV2ZWxfZmxhZ3MgPSAtMTtcblxuICAgICAgaWYgKHMuc3RyYXRlZ3kgPj0gWl9IVUZGTUFOX09OTFkgfHwgcy5sZXZlbCA8IDIpIHtcbiAgICAgICAgbGV2ZWxfZmxhZ3MgPSAwO1xuICAgICAgfSBlbHNlIGlmIChzLmxldmVsIDwgNikge1xuICAgICAgICBsZXZlbF9mbGFncyA9IDE7XG4gICAgICB9IGVsc2UgaWYgKHMubGV2ZWwgPT09IDYpIHtcbiAgICAgICAgbGV2ZWxfZmxhZ3MgPSAyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV2ZWxfZmxhZ3MgPSAzO1xuICAgICAgfVxuICAgICAgaGVhZGVyIHw9IChsZXZlbF9mbGFncyA8PCA2KTtcbiAgICAgIGlmIChzLnN0cnN0YXJ0ICE9PSAwKSB7IGhlYWRlciB8PSBQUkVTRVRfRElDVDsgfVxuICAgICAgaGVhZGVyICs9IDMxIC0gKGhlYWRlciAlIDMxKTtcblxuICAgICAgcy5zdGF0dXMgPSBCVVNZX1NUQVRFO1xuICAgICAgcHV0U2hvcnRNU0IocywgaGVhZGVyKTtcblxuICAgICAgLyogU2F2ZSB0aGUgYWRsZXIzMiBvZiB0aGUgcHJlc2V0IGRpY3Rpb25hcnk6ICovXG4gICAgICBpZiAocy5zdHJzdGFydCAhPT0gMCkge1xuICAgICAgICBwdXRTaG9ydE1TQihzLCBzdHJtLmFkbGVyID4+PiAxNik7XG4gICAgICAgIHB1dFNob3J0TVNCKHMsIHN0cm0uYWRsZXIgJiAweGZmZmYpO1xuICAgICAgfVxuICAgICAgc3RybS5hZGxlciA9IDE7IC8vIGFkbGVyMzIoMEwsIFpfTlVMTCwgMCk7XG4gICAgfVxuICB9XG5cbi8vI2lmZGVmIEdaSVBcbiAgaWYgKHMuc3RhdHVzID09PSBFWFRSQV9TVEFURSkge1xuICAgIGlmIChzLmd6aGVhZC5leHRyYS8qICE9IFpfTlVMTCovKSB7XG4gICAgICBiZWcgPSBzLnBlbmRpbmc7ICAvKiBzdGFydCBvZiBieXRlcyB0byB1cGRhdGUgY3JjICovXG5cbiAgICAgIHdoaWxlIChzLmd6aW5kZXggPCAocy5nemhlYWQuZXh0cmEubGVuZ3RoICYgMHhmZmZmKSkge1xuICAgICAgICBpZiAocy5wZW5kaW5nID09PSBzLnBlbmRpbmdfYnVmX3NpemUpIHtcbiAgICAgICAgICBpZiAocy5nemhlYWQuaGNyYyAmJiBzLnBlbmRpbmcgPiBiZWcpIHtcbiAgICAgICAgICAgIHN0cm0uYWRsZXIgPSBjcmMzMihzdHJtLmFkbGVyLCBzLnBlbmRpbmdfYnVmLCBzLnBlbmRpbmcgLSBiZWcsIGJlZyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZsdXNoX3BlbmRpbmcoc3RybSk7XG4gICAgICAgICAgYmVnID0gcy5wZW5kaW5nO1xuICAgICAgICAgIGlmIChzLnBlbmRpbmcgPT09IHMucGVuZGluZ19idWZfc2l6ZSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHB1dF9ieXRlKHMsIHMuZ3poZWFkLmV4dHJhW3MuZ3ppbmRleF0gJiAweGZmKTtcbiAgICAgICAgcy5nemluZGV4Kys7XG4gICAgICB9XG4gICAgICBpZiAocy5nemhlYWQuaGNyYyAmJiBzLnBlbmRpbmcgPiBiZWcpIHtcbiAgICAgICAgc3RybS5hZGxlciA9IGNyYzMyKHN0cm0uYWRsZXIsIHMucGVuZGluZ19idWYsIHMucGVuZGluZyAtIGJlZywgYmVnKTtcbiAgICAgIH1cbiAgICAgIGlmIChzLmd6aW5kZXggPT09IHMuZ3poZWFkLmV4dHJhLmxlbmd0aCkge1xuICAgICAgICBzLmd6aW5kZXggPSAwO1xuICAgICAgICBzLnN0YXR1cyA9IE5BTUVfU1RBVEU7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcy5zdGF0dXMgPSBOQU1FX1NUQVRFO1xuICAgIH1cbiAgfVxuICBpZiAocy5zdGF0dXMgPT09IE5BTUVfU1RBVEUpIHtcbiAgICBpZiAocy5nemhlYWQubmFtZS8qICE9IFpfTlVMTCovKSB7XG4gICAgICBiZWcgPSBzLnBlbmRpbmc7ICAvKiBzdGFydCBvZiBieXRlcyB0byB1cGRhdGUgY3JjICovXG4gICAgICAvL2ludCB2YWw7XG5cbiAgICAgIGRvIHtcbiAgICAgICAgaWYgKHMucGVuZGluZyA9PT0gcy5wZW5kaW5nX2J1Zl9zaXplKSB7XG4gICAgICAgICAgaWYgKHMuZ3poZWFkLmhjcmMgJiYgcy5wZW5kaW5nID4gYmVnKSB7XG4gICAgICAgICAgICBzdHJtLmFkbGVyID0gY3JjMzIoc3RybS5hZGxlciwgcy5wZW5kaW5nX2J1Ziwgcy5wZW5kaW5nIC0gYmVnLCBiZWcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmbHVzaF9wZW5kaW5nKHN0cm0pO1xuICAgICAgICAgIGJlZyA9IHMucGVuZGluZztcbiAgICAgICAgICBpZiAocy5wZW5kaW5nID09PSBzLnBlbmRpbmdfYnVmX3NpemUpIHtcbiAgICAgICAgICAgIHZhbCA9IDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSlMgc3BlY2lmaWM6IGxpdHRsZSBtYWdpYyB0byBhZGQgemVybyB0ZXJtaW5hdG9yIHRvIGVuZCBvZiBzdHJpbmdcbiAgICAgICAgaWYgKHMuZ3ppbmRleCA8IHMuZ3poZWFkLm5hbWUubGVuZ3RoKSB7XG4gICAgICAgICAgdmFsID0gcy5nemhlYWQubmFtZS5jaGFyQ29kZUF0KHMuZ3ppbmRleCsrKSAmIDB4ZmY7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFsID0gMDtcbiAgICAgICAgfVxuICAgICAgICBwdXRfYnl0ZShzLCB2YWwpO1xuICAgICAgfSB3aGlsZSAodmFsICE9PSAwKTtcblxuICAgICAgaWYgKHMuZ3poZWFkLmhjcmMgJiYgcy5wZW5kaW5nID4gYmVnKSB7XG4gICAgICAgIHN0cm0uYWRsZXIgPSBjcmMzMihzdHJtLmFkbGVyLCBzLnBlbmRpbmdfYnVmLCBzLnBlbmRpbmcgLSBiZWcsIGJlZyk7XG4gICAgICB9XG4gICAgICBpZiAodmFsID09PSAwKSB7XG4gICAgICAgIHMuZ3ppbmRleCA9IDA7XG4gICAgICAgIHMuc3RhdHVzID0gQ09NTUVOVF9TVEFURTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBzLnN0YXR1cyA9IENPTU1FTlRfU1RBVEU7XG4gICAgfVxuICB9XG4gIGlmIChzLnN0YXR1cyA9PT0gQ09NTUVOVF9TVEFURSkge1xuICAgIGlmIChzLmd6aGVhZC5jb21tZW50LyogIT0gWl9OVUxMKi8pIHtcbiAgICAgIGJlZyA9IHMucGVuZGluZzsgIC8qIHN0YXJ0IG9mIGJ5dGVzIHRvIHVwZGF0ZSBjcmMgKi9cbiAgICAgIC8vaW50IHZhbDtcblxuICAgICAgZG8ge1xuICAgICAgICBpZiAocy5wZW5kaW5nID09PSBzLnBlbmRpbmdfYnVmX3NpemUpIHtcbiAgICAgICAgICBpZiAocy5nemhlYWQuaGNyYyAmJiBzLnBlbmRpbmcgPiBiZWcpIHtcbiAgICAgICAgICAgIHN0cm0uYWRsZXIgPSBjcmMzMihzdHJtLmFkbGVyLCBzLnBlbmRpbmdfYnVmLCBzLnBlbmRpbmcgLSBiZWcsIGJlZyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZsdXNoX3BlbmRpbmcoc3RybSk7XG4gICAgICAgICAgYmVnID0gcy5wZW5kaW5nO1xuICAgICAgICAgIGlmIChzLnBlbmRpbmcgPT09IHMucGVuZGluZ19idWZfc2l6ZSkge1xuICAgICAgICAgICAgdmFsID0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBKUyBzcGVjaWZpYzogbGl0dGxlIG1hZ2ljIHRvIGFkZCB6ZXJvIHRlcm1pbmF0b3IgdG8gZW5kIG9mIHN0cmluZ1xuICAgICAgICBpZiAocy5nemluZGV4IDwgcy5nemhlYWQuY29tbWVudC5sZW5ndGgpIHtcbiAgICAgICAgICB2YWwgPSBzLmd6aGVhZC5jb21tZW50LmNoYXJDb2RlQXQocy5nemluZGV4KyspICYgMHhmZjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWwgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHB1dF9ieXRlKHMsIHZhbCk7XG4gICAgICB9IHdoaWxlICh2YWwgIT09IDApO1xuXG4gICAgICBpZiAocy5nemhlYWQuaGNyYyAmJiBzLnBlbmRpbmcgPiBiZWcpIHtcbiAgICAgICAgc3RybS5hZGxlciA9IGNyYzMyKHN0cm0uYWRsZXIsIHMucGVuZGluZ19idWYsIHMucGVuZGluZyAtIGJlZywgYmVnKTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWwgPT09IDApIHtcbiAgICAgICAgcy5zdGF0dXMgPSBIQ1JDX1NUQVRFO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHMuc3RhdHVzID0gSENSQ19TVEFURTtcbiAgICB9XG4gIH1cbiAgaWYgKHMuc3RhdHVzID09PSBIQ1JDX1NUQVRFKSB7XG4gICAgaWYgKHMuZ3poZWFkLmhjcmMpIHtcbiAgICAgIGlmIChzLnBlbmRpbmcgKyAyID4gcy5wZW5kaW5nX2J1Zl9zaXplKSB7XG4gICAgICAgIGZsdXNoX3BlbmRpbmcoc3RybSk7XG4gICAgICB9XG4gICAgICBpZiAocy5wZW5kaW5nICsgMiA8PSBzLnBlbmRpbmdfYnVmX3NpemUpIHtcbiAgICAgICAgcHV0X2J5dGUocywgc3RybS5hZGxlciAmIDB4ZmYpO1xuICAgICAgICBwdXRfYnl0ZShzLCAoc3RybS5hZGxlciA+PiA4KSAmIDB4ZmYpO1xuICAgICAgICBzdHJtLmFkbGVyID0gMDsgLy9jcmMzMigwTCwgWl9OVUxMLCAwKTtcbiAgICAgICAgcy5zdGF0dXMgPSBCVVNZX1NUQVRFO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHMuc3RhdHVzID0gQlVTWV9TVEFURTtcbiAgICB9XG4gIH1cbi8vI2VuZGlmXG5cbiAgLyogRmx1c2ggYXMgbXVjaCBwZW5kaW5nIG91dHB1dCBhcyBwb3NzaWJsZSAqL1xuICBpZiAocy5wZW5kaW5nICE9PSAwKSB7XG4gICAgZmx1c2hfcGVuZGluZyhzdHJtKTtcbiAgICBpZiAoc3RybS5hdmFpbF9vdXQgPT09IDApIHtcbiAgICAgIC8qIFNpbmNlIGF2YWlsX291dCBpcyAwLCBkZWZsYXRlIHdpbGwgYmUgY2FsbGVkIGFnYWluIHdpdGhcbiAgICAgICAqIG1vcmUgb3V0cHV0IHNwYWNlLCBidXQgcG9zc2libHkgd2l0aCBib3RoIHBlbmRpbmcgYW5kXG4gICAgICAgKiBhdmFpbF9pbiBlcXVhbCB0byB6ZXJvLiBUaGVyZSB3b24ndCBiZSBhbnl0aGluZyB0byBkbyxcbiAgICAgICAqIGJ1dCB0aGlzIGlzIG5vdCBhbiBlcnJvciBzaXR1YXRpb24gc28gbWFrZSBzdXJlIHdlXG4gICAgICAgKiByZXR1cm4gT0sgaW5zdGVhZCBvZiBCVUZfRVJST1IgYXQgbmV4dCBjYWxsIG9mIGRlZmxhdGU6XG4gICAgICAgKi9cbiAgICAgIHMubGFzdF9mbHVzaCA9IC0xO1xuICAgICAgcmV0dXJuIFpfT0s7XG4gICAgfVxuXG4gICAgLyogTWFrZSBzdXJlIHRoZXJlIGlzIHNvbWV0aGluZyB0byBkbyBhbmQgYXZvaWQgZHVwbGljYXRlIGNvbnNlY3V0aXZlXG4gICAgICogZmx1c2hlcy4gRm9yIHJlcGVhdGVkIGFuZCB1c2VsZXNzIGNhbGxzIHdpdGggWl9GSU5JU0gsIHdlIGtlZXBcbiAgICAgKiByZXR1cm5pbmcgWl9TVFJFQU1fRU5EIGluc3RlYWQgb2YgWl9CVUZfRVJST1IuXG4gICAgICovXG4gIH0gZWxzZSBpZiAoc3RybS5hdmFpbF9pbiA9PT0gMCAmJiByYW5rKGZsdXNoKSA8PSByYW5rKG9sZF9mbHVzaCkgJiZcbiAgICBmbHVzaCAhPT0gWl9GSU5JU0gpIHtcbiAgICByZXR1cm4gZXJyKHN0cm0sIFpfQlVGX0VSUk9SKTtcbiAgfVxuXG4gIC8qIFVzZXIgbXVzdCBub3QgcHJvdmlkZSBtb3JlIGlucHV0IGFmdGVyIHRoZSBmaXJzdCBGSU5JU0g6ICovXG4gIGlmIChzLnN0YXR1cyA9PT0gRklOSVNIX1NUQVRFICYmIHN0cm0uYXZhaWxfaW4gIT09IDApIHtcbiAgICByZXR1cm4gZXJyKHN0cm0sIFpfQlVGX0VSUk9SKTtcbiAgfVxuXG4gIC8qIFN0YXJ0IGEgbmV3IGJsb2NrIG9yIGNvbnRpbnVlIHRoZSBjdXJyZW50IG9uZS5cbiAgICovXG4gIGlmIChzdHJtLmF2YWlsX2luICE9PSAwIHx8IHMubG9va2FoZWFkICE9PSAwIHx8XG4gICAgKGZsdXNoICE9PSBaX05PX0ZMVVNIICYmIHMuc3RhdHVzICE9PSBGSU5JU0hfU1RBVEUpKSB7XG4gICAgdmFyIGJzdGF0ZSA9IChzLnN0cmF0ZWd5ID09PSBaX0hVRkZNQU5fT05MWSkgPyBkZWZsYXRlX2h1ZmYocywgZmx1c2gpIDpcbiAgICAgIChzLnN0cmF0ZWd5ID09PSBaX1JMRSA/IGRlZmxhdGVfcmxlKHMsIGZsdXNoKSA6XG4gICAgICAgIGNvbmZpZ3VyYXRpb25fdGFibGVbcy5sZXZlbF0uZnVuYyhzLCBmbHVzaCkpO1xuXG4gICAgaWYgKGJzdGF0ZSA9PT0gQlNfRklOSVNIX1NUQVJURUQgfHwgYnN0YXRlID09PSBCU19GSU5JU0hfRE9ORSkge1xuICAgICAgcy5zdGF0dXMgPSBGSU5JU0hfU1RBVEU7XG4gICAgfVxuICAgIGlmIChic3RhdGUgPT09IEJTX05FRURfTU9SRSB8fCBic3RhdGUgPT09IEJTX0ZJTklTSF9TVEFSVEVEKSB7XG4gICAgICBpZiAoc3RybS5hdmFpbF9vdXQgPT09IDApIHtcbiAgICAgICAgcy5sYXN0X2ZsdXNoID0gLTE7XG4gICAgICAgIC8qIGF2b2lkIEJVRl9FUlJPUiBuZXh0IGNhbGwsIHNlZSBhYm92ZSAqL1xuICAgICAgfVxuICAgICAgcmV0dXJuIFpfT0s7XG4gICAgICAvKiBJZiBmbHVzaCAhPSBaX05PX0ZMVVNIICYmIGF2YWlsX291dCA9PSAwLCB0aGUgbmV4dCBjYWxsXG4gICAgICAgKiBvZiBkZWZsYXRlIHNob3VsZCB1c2UgdGhlIHNhbWUgZmx1c2ggcGFyYW1ldGVyIHRvIG1ha2Ugc3VyZVxuICAgICAgICogdGhhdCB0aGUgZmx1c2ggaXMgY29tcGxldGUuIFNvIHdlIGRvbid0IGhhdmUgdG8gb3V0cHV0IGFuXG4gICAgICAgKiBlbXB0eSBibG9jayBoZXJlLCB0aGlzIHdpbGwgYmUgZG9uZSBhdCBuZXh0IGNhbGwuIFRoaXMgYWxzb1xuICAgICAgICogZW5zdXJlcyB0aGF0IGZvciBhIHZlcnkgc21hbGwgb3V0cHV0IGJ1ZmZlciwgd2UgZW1pdCBhdCBtb3N0XG4gICAgICAgKiBvbmUgZW1wdHkgYmxvY2suXG4gICAgICAgKi9cbiAgICB9XG4gICAgaWYgKGJzdGF0ZSA9PT0gQlNfQkxPQ0tfRE9ORSkge1xuICAgICAgaWYgKGZsdXNoID09PSBaX1BBUlRJQUxfRkxVU0gpIHtcbiAgICAgICAgdHJlZXMuX3RyX2FsaWduKHMpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoZmx1c2ggIT09IFpfQkxPQ0spIHsgLyogRlVMTF9GTFVTSCBvciBTWU5DX0ZMVVNIICovXG5cbiAgICAgICAgdHJlZXMuX3RyX3N0b3JlZF9ibG9jayhzLCAwLCAwLCBmYWxzZSk7XG4gICAgICAgIC8qIEZvciBhIGZ1bGwgZmx1c2gsIHRoaXMgZW1wdHkgYmxvY2sgd2lsbCBiZSByZWNvZ25pemVkXG4gICAgICAgICAqIGFzIGEgc3BlY2lhbCBtYXJrZXIgYnkgaW5mbGF0ZV9zeW5jKCkuXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoZmx1c2ggPT09IFpfRlVMTF9GTFVTSCkge1xuICAgICAgICAgIC8qKiogQ0xFQVJfSEFTSChzKTsgKioqLyAgICAgICAgICAgICAvKiBmb3JnZXQgaGlzdG9yeSAqL1xuICAgICAgICAgIHplcm8ocy5oZWFkKTsgLy8gRmlsbCB3aXRoIE5JTCAoPSAwKTtcblxuICAgICAgICAgIGlmIChzLmxvb2thaGVhZCA9PT0gMCkge1xuICAgICAgICAgICAgcy5zdHJzdGFydCA9IDA7XG4gICAgICAgICAgICBzLmJsb2NrX3N0YXJ0ID0gMDtcbiAgICAgICAgICAgIHMuaW5zZXJ0ID0gMDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZsdXNoX3BlbmRpbmcoc3RybSk7XG4gICAgICBpZiAoc3RybS5hdmFpbF9vdXQgPT09IDApIHtcbiAgICAgICAgcy5sYXN0X2ZsdXNoID0gLTE7IC8qIGF2b2lkIEJVRl9FUlJPUiBhdCBuZXh0IGNhbGwsIHNlZSBhYm92ZSAqL1xuICAgICAgICByZXR1cm4gWl9PSztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy9Bc3NlcnQoc3RybS0+YXZhaWxfb3V0ID4gMCwgXCJidWcyXCIpO1xuICAvL2lmIChzdHJtLmF2YWlsX291dCA8PSAwKSB7IHRocm93IG5ldyBFcnJvcihcImJ1ZzJcIik7fVxuXG4gIGlmIChmbHVzaCAhPT0gWl9GSU5JU0gpIHsgcmV0dXJuIFpfT0s7IH1cbiAgaWYgKHMud3JhcCA8PSAwKSB7IHJldHVybiBaX1NUUkVBTV9FTkQ7IH1cblxuICAvKiBXcml0ZSB0aGUgdHJhaWxlciAqL1xuICBpZiAocy53cmFwID09PSAyKSB7XG4gICAgcHV0X2J5dGUocywgc3RybS5hZGxlciAmIDB4ZmYpO1xuICAgIHB1dF9ieXRlKHMsIChzdHJtLmFkbGVyID4+IDgpICYgMHhmZik7XG4gICAgcHV0X2J5dGUocywgKHN0cm0uYWRsZXIgPj4gMTYpICYgMHhmZik7XG4gICAgcHV0X2J5dGUocywgKHN0cm0uYWRsZXIgPj4gMjQpICYgMHhmZik7XG4gICAgcHV0X2J5dGUocywgc3RybS50b3RhbF9pbiAmIDB4ZmYpO1xuICAgIHB1dF9ieXRlKHMsIChzdHJtLnRvdGFsX2luID4+IDgpICYgMHhmZik7XG4gICAgcHV0X2J5dGUocywgKHN0cm0udG90YWxfaW4gPj4gMTYpICYgMHhmZik7XG4gICAgcHV0X2J5dGUocywgKHN0cm0udG90YWxfaW4gPj4gMjQpICYgMHhmZik7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcHV0U2hvcnRNU0Iocywgc3RybS5hZGxlciA+Pj4gMTYpO1xuICAgIHB1dFNob3J0TVNCKHMsIHN0cm0uYWRsZXIgJiAweGZmZmYpO1xuICB9XG5cbiAgZmx1c2hfcGVuZGluZyhzdHJtKTtcbiAgLyogSWYgYXZhaWxfb3V0IGlzIHplcm8sIHRoZSBhcHBsaWNhdGlvbiB3aWxsIGNhbGwgZGVmbGF0ZSBhZ2FpblxuICAgKiB0byBmbHVzaCB0aGUgcmVzdC5cbiAgICovXG4gIGlmIChzLndyYXAgPiAwKSB7IHMud3JhcCA9IC1zLndyYXA7IH1cbiAgLyogd3JpdGUgdGhlIHRyYWlsZXIgb25seSBvbmNlISAqL1xuICByZXR1cm4gcy5wZW5kaW5nICE9PSAwID8gWl9PSyA6IFpfU1RSRUFNX0VORDtcbn1cblxuZnVuY3Rpb24gZGVmbGF0ZUVuZChzdHJtKSB7XG4gIHZhciBzdGF0dXM7XG5cbiAgaWYgKCFzdHJtLyo9PSBaX05VTEwqLyB8fCAhc3RybS5zdGF0ZS8qPT0gWl9OVUxMKi8pIHtcbiAgICByZXR1cm4gWl9TVFJFQU1fRVJST1I7XG4gIH1cblxuICBzdGF0dXMgPSBzdHJtLnN0YXRlLnN0YXR1cztcbiAgaWYgKHN0YXR1cyAhPT0gSU5JVF9TVEFURSAmJlxuICAgIHN0YXR1cyAhPT0gRVhUUkFfU1RBVEUgJiZcbiAgICBzdGF0dXMgIT09IE5BTUVfU1RBVEUgJiZcbiAgICBzdGF0dXMgIT09IENPTU1FTlRfU1RBVEUgJiZcbiAgICBzdGF0dXMgIT09IEhDUkNfU1RBVEUgJiZcbiAgICBzdGF0dXMgIT09IEJVU1lfU1RBVEUgJiZcbiAgICBzdGF0dXMgIT09IEZJTklTSF9TVEFURVxuICApIHtcbiAgICByZXR1cm4gZXJyKHN0cm0sIFpfU1RSRUFNX0VSUk9SKTtcbiAgfVxuXG4gIHN0cm0uc3RhdGUgPSBudWxsO1xuXG4gIHJldHVybiBzdGF0dXMgPT09IEJVU1lfU1RBVEUgPyBlcnIoc3RybSwgWl9EQVRBX0VSUk9SKSA6IFpfT0s7XG59XG5cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogSW5pdGlhbGl6ZXMgdGhlIGNvbXByZXNzaW9uIGRpY3Rpb25hcnkgZnJvbSB0aGUgZ2l2ZW4gYnl0ZVxuICogc2VxdWVuY2Ugd2l0aG91dCBwcm9kdWNpbmcgYW55IGNvbXByZXNzZWQgb3V0cHV0LlxuICovXG5mdW5jdGlvbiBkZWZsYXRlU2V0RGljdGlvbmFyeShzdHJtLCBkaWN0aW9uYXJ5KSB7XG4gIHZhciBkaWN0TGVuZ3RoID0gZGljdGlvbmFyeS5sZW5ndGg7XG5cbiAgdmFyIHM7XG4gIHZhciBzdHIsIG47XG4gIHZhciB3cmFwO1xuICB2YXIgYXZhaWw7XG4gIHZhciBuZXh0O1xuICB2YXIgaW5wdXQ7XG4gIHZhciB0bXBEaWN0O1xuXG4gIGlmICghc3RybS8qPT0gWl9OVUxMKi8gfHwgIXN0cm0uc3RhdGUvKj09IFpfTlVMTCovKSB7XG4gICAgcmV0dXJuIFpfU1RSRUFNX0VSUk9SO1xuICB9XG5cbiAgcyA9IHN0cm0uc3RhdGU7XG4gIHdyYXAgPSBzLndyYXA7XG5cbiAgaWYgKHdyYXAgPT09IDIgfHwgKHdyYXAgPT09IDEgJiYgcy5zdGF0dXMgIT09IElOSVRfU1RBVEUpIHx8IHMubG9va2FoZWFkKSB7XG4gICAgcmV0dXJuIFpfU1RSRUFNX0VSUk9SO1xuICB9XG5cbiAgLyogd2hlbiB1c2luZyB6bGliIHdyYXBwZXJzLCBjb21wdXRlIEFkbGVyLTMyIGZvciBwcm92aWRlZCBkaWN0aW9uYXJ5ICovXG4gIGlmICh3cmFwID09PSAxKSB7XG4gICAgLyogYWRsZXIzMihzdHJtLT5hZGxlciwgZGljdGlvbmFyeSwgZGljdExlbmd0aCk7ICovXG4gICAgc3RybS5hZGxlciA9IGFkbGVyMzIoc3RybS5hZGxlciwgZGljdGlvbmFyeSwgZGljdExlbmd0aCwgMCk7XG4gIH1cblxuICBzLndyYXAgPSAwOyAgIC8qIGF2b2lkIGNvbXB1dGluZyBBZGxlci0zMiBpbiByZWFkX2J1ZiAqL1xuXG4gIC8qIGlmIGRpY3Rpb25hcnkgd291bGQgZmlsbCB3aW5kb3csIGp1c3QgcmVwbGFjZSB0aGUgaGlzdG9yeSAqL1xuICBpZiAoZGljdExlbmd0aCA+PSBzLndfc2l6ZSkge1xuICAgIGlmICh3cmFwID09PSAwKSB7ICAgICAgICAgICAgLyogYWxyZWFkeSBlbXB0eSBvdGhlcndpc2UgKi9cbiAgICAgIC8qKiogQ0xFQVJfSEFTSChzKTsgKioqL1xuICAgICAgemVybyhzLmhlYWQpOyAvLyBGaWxsIHdpdGggTklMICg9IDApO1xuICAgICAgcy5zdHJzdGFydCA9IDA7XG4gICAgICBzLmJsb2NrX3N0YXJ0ID0gMDtcbiAgICAgIHMuaW5zZXJ0ID0gMDtcbiAgICB9XG4gICAgLyogdXNlIHRoZSB0YWlsICovXG4gICAgLy8gZGljdGlvbmFyeSA9IGRpY3Rpb25hcnkuc2xpY2UoZGljdExlbmd0aCAtIHMud19zaXplKTtcbiAgICB0bXBEaWN0ID0gbmV3IHV0aWxzLkJ1Zjgocy53X3NpemUpO1xuICAgIHV0aWxzLmFycmF5U2V0KHRtcERpY3QsIGRpY3Rpb25hcnksIGRpY3RMZW5ndGggLSBzLndfc2l6ZSwgcy53X3NpemUsIDApO1xuICAgIGRpY3Rpb25hcnkgPSB0bXBEaWN0O1xuICAgIGRpY3RMZW5ndGggPSBzLndfc2l6ZTtcbiAgfVxuICAvKiBpbnNlcnQgZGljdGlvbmFyeSBpbnRvIHdpbmRvdyBhbmQgaGFzaCAqL1xuICBhdmFpbCA9IHN0cm0uYXZhaWxfaW47XG4gIG5leHQgPSBzdHJtLm5leHRfaW47XG4gIGlucHV0ID0gc3RybS5pbnB1dDtcbiAgc3RybS5hdmFpbF9pbiA9IGRpY3RMZW5ndGg7XG4gIHN0cm0ubmV4dF9pbiA9IDA7XG4gIHN0cm0uaW5wdXQgPSBkaWN0aW9uYXJ5O1xuICBmaWxsX3dpbmRvdyhzKTtcbiAgd2hpbGUgKHMubG9va2FoZWFkID49IE1JTl9NQVRDSCkge1xuICAgIHN0ciA9IHMuc3Ryc3RhcnQ7XG4gICAgbiA9IHMubG9va2FoZWFkIC0gKE1JTl9NQVRDSCAtIDEpO1xuICAgIGRvIHtcbiAgICAgIC8qIFVQREFURV9IQVNIKHMsIHMtPmluc19oLCBzLT53aW5kb3dbc3RyICsgTUlOX01BVENILTFdKTsgKi9cbiAgICAgIHMuaW5zX2ggPSAoKHMuaW5zX2ggPDwgcy5oYXNoX3NoaWZ0KSBeIHMud2luZG93W3N0ciArIE1JTl9NQVRDSCAtIDFdKSAmIHMuaGFzaF9tYXNrO1xuXG4gICAgICBzLnByZXZbc3RyICYgcy53X21hc2tdID0gcy5oZWFkW3MuaW5zX2hdO1xuXG4gICAgICBzLmhlYWRbcy5pbnNfaF0gPSBzdHI7XG4gICAgICBzdHIrKztcbiAgICB9IHdoaWxlICgtLW4pO1xuICAgIHMuc3Ryc3RhcnQgPSBzdHI7XG4gICAgcy5sb29rYWhlYWQgPSBNSU5fTUFUQ0ggLSAxO1xuICAgIGZpbGxfd2luZG93KHMpO1xuICB9XG4gIHMuc3Ryc3RhcnQgKz0gcy5sb29rYWhlYWQ7XG4gIHMuYmxvY2tfc3RhcnQgPSBzLnN0cnN0YXJ0O1xuICBzLmluc2VydCA9IHMubG9va2FoZWFkO1xuICBzLmxvb2thaGVhZCA9IDA7XG4gIHMubWF0Y2hfbGVuZ3RoID0gcy5wcmV2X2xlbmd0aCA9IE1JTl9NQVRDSCAtIDE7XG4gIHMubWF0Y2hfYXZhaWxhYmxlID0gMDtcbiAgc3RybS5uZXh0X2luID0gbmV4dDtcbiAgc3RybS5pbnB1dCA9IGlucHV0O1xuICBzdHJtLmF2YWlsX2luID0gYXZhaWw7XG4gIHMud3JhcCA9IHdyYXA7XG4gIHJldHVybiBaX09LO1xufVxuXG5cbmV4cG9ydHMuZGVmbGF0ZUluaXQgPSBkZWZsYXRlSW5pdDtcbmV4cG9ydHMuZGVmbGF0ZUluaXQyID0gZGVmbGF0ZUluaXQyO1xuZXhwb3J0cy5kZWZsYXRlUmVzZXQgPSBkZWZsYXRlUmVzZXQ7XG5leHBvcnRzLmRlZmxhdGVSZXNldEtlZXAgPSBkZWZsYXRlUmVzZXRLZWVwO1xuZXhwb3J0cy5kZWZsYXRlU2V0SGVhZGVyID0gZGVmbGF0ZVNldEhlYWRlcjtcbmV4cG9ydHMuZGVmbGF0ZSA9IGRlZmxhdGU7XG5leHBvcnRzLmRlZmxhdGVFbmQgPSBkZWZsYXRlRW5kO1xuZXhwb3J0cy5kZWZsYXRlU2V0RGljdGlvbmFyeSA9IGRlZmxhdGVTZXREaWN0aW9uYXJ5O1xuZXhwb3J0cy5kZWZsYXRlSW5mbyA9ICdwYWtvIGRlZmxhdGUgKGZyb20gTm9kZWNhIHByb2plY3QpJztcblxuLyogTm90IGltcGxlbWVudGVkXG5leHBvcnRzLmRlZmxhdGVCb3VuZCA9IGRlZmxhdGVCb3VuZDtcbmV4cG9ydHMuZGVmbGF0ZUNvcHkgPSBkZWZsYXRlQ29weTtcbmV4cG9ydHMuZGVmbGF0ZVBhcmFtcyA9IGRlZmxhdGVQYXJhbXM7XG5leHBvcnRzLmRlZmxhdGVQZW5kaW5nID0gZGVmbGF0ZVBlbmRpbmc7XG5leHBvcnRzLmRlZmxhdGVQcmltZSA9IGRlZmxhdGVQcmltZTtcbmV4cG9ydHMuZGVmbGF0ZVR1bmUgPSBkZWZsYXRlVHVuZTtcbiovXG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIChDKSAxOTk1LTIwMTMgSmVhbi1sb3VwIEdhaWxseSBhbmQgTWFyayBBZGxlclxuLy8gKEMpIDIwMTQtMjAxNyBWaXRhbHkgUHV6cmluIGFuZCBBbmRyZXkgVHVwaXRzaW5cbi8vXG4vLyBUaGlzIHNvZnR3YXJlIGlzIHByb3ZpZGVkICdhcy1pcycsIHdpdGhvdXQgYW55IGV4cHJlc3Mgb3IgaW1wbGllZFxuLy8gd2FycmFudHkuIEluIG5vIGV2ZW50IHdpbGwgdGhlIGF1dGhvcnMgYmUgaGVsZCBsaWFibGUgZm9yIGFueSBkYW1hZ2VzXG4vLyBhcmlzaW5nIGZyb20gdGhlIHVzZSBvZiB0aGlzIHNvZnR3YXJlLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byBhbnlvbmUgdG8gdXNlIHRoaXMgc29mdHdhcmUgZm9yIGFueSBwdXJwb3NlLFxuLy8gaW5jbHVkaW5nIGNvbW1lcmNpYWwgYXBwbGljYXRpb25zLCBhbmQgdG8gYWx0ZXIgaXQgYW5kIHJlZGlzdHJpYnV0ZSBpdFxuLy8gZnJlZWx5LCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgcmVzdHJpY3Rpb25zOlxuLy9cbi8vIDEuIFRoZSBvcmlnaW4gb2YgdGhpcyBzb2Z0d2FyZSBtdXN0IG5vdCBiZSBtaXNyZXByZXNlbnRlZDsgeW91IG11c3Qgbm90XG4vLyAgIGNsYWltIHRoYXQgeW91IHdyb3RlIHRoZSBvcmlnaW5hbCBzb2Z0d2FyZS4gSWYgeW91IHVzZSB0aGlzIHNvZnR3YXJlXG4vLyAgIGluIGEgcHJvZHVjdCwgYW4gYWNrbm93bGVkZ21lbnQgaW4gdGhlIHByb2R1Y3QgZG9jdW1lbnRhdGlvbiB3b3VsZCBiZVxuLy8gICBhcHByZWNpYXRlZCBidXQgaXMgbm90IHJlcXVpcmVkLlxuLy8gMi4gQWx0ZXJlZCBzb3VyY2UgdmVyc2lvbnMgbXVzdCBiZSBwbGFpbmx5IG1hcmtlZCBhcyBzdWNoLCBhbmQgbXVzdCBub3QgYmVcbi8vICAgbWlzcmVwcmVzZW50ZWQgYXMgYmVpbmcgdGhlIG9yaWdpbmFsIHNvZnR3YXJlLlxuLy8gMy4gVGhpcyBub3RpY2UgbWF5IG5vdCBiZSByZW1vdmVkIG9yIGFsdGVyZWQgZnJvbSBhbnkgc291cmNlIGRpc3RyaWJ1dGlvbi5cblxuZnVuY3Rpb24gR1poZWFkZXIoKSB7XG4gIC8qIHRydWUgaWYgY29tcHJlc3NlZCBkYXRhIGJlbGlldmVkIHRvIGJlIHRleHQgKi9cbiAgdGhpcy50ZXh0ICAgICAgID0gMDtcbiAgLyogbW9kaWZpY2F0aW9uIHRpbWUgKi9cbiAgdGhpcy50aW1lICAgICAgID0gMDtcbiAgLyogZXh0cmEgZmxhZ3MgKG5vdCB1c2VkIHdoZW4gd3JpdGluZyBhIGd6aXAgZmlsZSkgKi9cbiAgdGhpcy54ZmxhZ3MgICAgID0gMDtcbiAgLyogb3BlcmF0aW5nIHN5c3RlbSAqL1xuICB0aGlzLm9zICAgICAgICAgPSAwO1xuICAvKiBwb2ludGVyIHRvIGV4dHJhIGZpZWxkIG9yIFpfTlVMTCBpZiBub25lICovXG4gIHRoaXMuZXh0cmEgICAgICA9IG51bGw7XG4gIC8qIGV4dHJhIGZpZWxkIGxlbmd0aCAodmFsaWQgaWYgZXh0cmEgIT0gWl9OVUxMKSAqL1xuICB0aGlzLmV4dHJhX2xlbiAgPSAwOyAvLyBBY3R1YWxseSwgd2UgZG9uJ3QgbmVlZCBpdCBpbiBKUyxcbiAgICAgICAgICAgICAgICAgICAgICAgLy8gYnV0IGxlYXZlIGZvciBmZXcgY29kZSBtb2RpZmljYXRpb25zXG5cbiAgLy9cbiAgLy8gU2V0dXAgbGltaXRzIGlzIG5vdCBuZWNlc3NhcnkgYmVjYXVzZSBpbiBqcyB3ZSBzaG91bGQgbm90IHByZWFsbG9jYXRlIG1lbW9yeVxuICAvLyBmb3IgaW5mbGF0ZSB1c2UgY29uc3RhbnQgbGltaXQgaW4gNjU1MzYgYnl0ZXNcbiAgLy9cblxuICAvKiBzcGFjZSBhdCBleHRyYSAob25seSB3aGVuIHJlYWRpbmcgaGVhZGVyKSAqL1xuICAvLyB0aGlzLmV4dHJhX21heCAgPSAwO1xuICAvKiBwb2ludGVyIHRvIHplcm8tdGVybWluYXRlZCBmaWxlIG5hbWUgb3IgWl9OVUxMICovXG4gIHRoaXMubmFtZSAgICAgICA9ICcnO1xuICAvKiBzcGFjZSBhdCBuYW1lIChvbmx5IHdoZW4gcmVhZGluZyBoZWFkZXIpICovXG4gIC8vIHRoaXMubmFtZV9tYXggICA9IDA7XG4gIC8qIHBvaW50ZXIgdG8gemVyby10ZXJtaW5hdGVkIGNvbW1lbnQgb3IgWl9OVUxMICovXG4gIHRoaXMuY29tbWVudCAgICA9ICcnO1xuICAvKiBzcGFjZSBhdCBjb21tZW50IChvbmx5IHdoZW4gcmVhZGluZyBoZWFkZXIpICovXG4gIC8vIHRoaXMuY29tbV9tYXggICA9IDA7XG4gIC8qIHRydWUgaWYgdGhlcmUgd2FzIG9yIHdpbGwgYmUgYSBoZWFkZXIgY3JjICovXG4gIHRoaXMuaGNyYyAgICAgICA9IDA7XG4gIC8qIHRydWUgd2hlbiBkb25lIHJlYWRpbmcgZ3ppcCBoZWFkZXIgKG5vdCB1c2VkIHdoZW4gd3JpdGluZyBhIGd6aXAgZmlsZSkgKi9cbiAgdGhpcy5kb25lICAgICAgID0gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gR1poZWFkZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIChDKSAxOTk1LTIwMTMgSmVhbi1sb3VwIEdhaWxseSBhbmQgTWFyayBBZGxlclxuLy8gKEMpIDIwMTQtMjAxNyBWaXRhbHkgUHV6cmluIGFuZCBBbmRyZXkgVHVwaXRzaW5cbi8vXG4vLyBUaGlzIHNvZnR3YXJlIGlzIHByb3ZpZGVkICdhcy1pcycsIHdpdGhvdXQgYW55IGV4cHJlc3Mgb3IgaW1wbGllZFxuLy8gd2FycmFudHkuIEluIG5vIGV2ZW50IHdpbGwgdGhlIGF1dGhvcnMgYmUgaGVsZCBsaWFibGUgZm9yIGFueSBkYW1hZ2VzXG4vLyBhcmlzaW5nIGZyb20gdGhlIHVzZSBvZiB0aGlzIHNvZnR3YXJlLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byBhbnlvbmUgdG8gdXNlIHRoaXMgc29mdHdhcmUgZm9yIGFueSBwdXJwb3NlLFxuLy8gaW5jbHVkaW5nIGNvbW1lcmNpYWwgYXBwbGljYXRpb25zLCBhbmQgdG8gYWx0ZXIgaXQgYW5kIHJlZGlzdHJpYnV0ZSBpdFxuLy8gZnJlZWx5LCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgcmVzdHJpY3Rpb25zOlxuLy9cbi8vIDEuIFRoZSBvcmlnaW4gb2YgdGhpcyBzb2Z0d2FyZSBtdXN0IG5vdCBiZSBtaXNyZXByZXNlbnRlZDsgeW91IG11c3Qgbm90XG4vLyAgIGNsYWltIHRoYXQgeW91IHdyb3RlIHRoZSBvcmlnaW5hbCBzb2Z0d2FyZS4gSWYgeW91IHVzZSB0aGlzIHNvZnR3YXJlXG4vLyAgIGluIGEgcHJvZHVjdCwgYW4gYWNrbm93bGVkZ21lbnQgaW4gdGhlIHByb2R1Y3QgZG9jdW1lbnRhdGlvbiB3b3VsZCBiZVxuLy8gICBhcHByZWNpYXRlZCBidXQgaXMgbm90IHJlcXVpcmVkLlxuLy8gMi4gQWx0ZXJlZCBzb3VyY2UgdmVyc2lvbnMgbXVzdCBiZSBwbGFpbmx5IG1hcmtlZCBhcyBzdWNoLCBhbmQgbXVzdCBub3QgYmVcbi8vICAgbWlzcmVwcmVzZW50ZWQgYXMgYmVpbmcgdGhlIG9yaWdpbmFsIHNvZnR3YXJlLlxuLy8gMy4gVGhpcyBub3RpY2UgbWF5IG5vdCBiZSByZW1vdmVkIG9yIGFsdGVyZWQgZnJvbSBhbnkgc291cmNlIGRpc3RyaWJ1dGlvbi5cblxuLy8gU2VlIHN0YXRlIGRlZnMgZnJvbSBpbmZsYXRlLmpzXG52YXIgQkFEID0gMzA7ICAgICAgIC8qIGdvdCBhIGRhdGEgZXJyb3IgLS0gcmVtYWluIGhlcmUgdW50aWwgcmVzZXQgKi9cbnZhciBUWVBFID0gMTI7ICAgICAgLyogaTogd2FpdGluZyBmb3IgdHlwZSBiaXRzLCBpbmNsdWRpbmcgbGFzdC1mbGFnIGJpdCAqL1xuXG4vKlxuICAgRGVjb2RlIGxpdGVyYWwsIGxlbmd0aCwgYW5kIGRpc3RhbmNlIGNvZGVzIGFuZCB3cml0ZSBvdXQgdGhlIHJlc3VsdGluZ1xuICAgbGl0ZXJhbCBhbmQgbWF0Y2ggYnl0ZXMgdW50aWwgZWl0aGVyIG5vdCBlbm91Z2ggaW5wdXQgb3Igb3V0cHV0IGlzXG4gICBhdmFpbGFibGUsIGFuIGVuZC1vZi1ibG9jayBpcyBlbmNvdW50ZXJlZCwgb3IgYSBkYXRhIGVycm9yIGlzIGVuY291bnRlcmVkLlxuICAgV2hlbiBsYXJnZSBlbm91Z2ggaW5wdXQgYW5kIG91dHB1dCBidWZmZXJzIGFyZSBzdXBwbGllZCB0byBpbmZsYXRlKCksIGZvclxuICAgZXhhbXBsZSwgYSAxNksgaW5wdXQgYnVmZmVyIGFuZCBhIDY0SyBvdXRwdXQgYnVmZmVyLCBtb3JlIHRoYW4gOTUlIG9mIHRoZVxuICAgaW5mbGF0ZSBleGVjdXRpb24gdGltZSBpcyBzcGVudCBpbiB0aGlzIHJvdXRpbmUuXG5cbiAgIEVudHJ5IGFzc3VtcHRpb25zOlxuXG4gICAgICAgIHN0YXRlLm1vZGUgPT09IExFTlxuICAgICAgICBzdHJtLmF2YWlsX2luID49IDZcbiAgICAgICAgc3RybS5hdmFpbF9vdXQgPj0gMjU4XG4gICAgICAgIHN0YXJ0ID49IHN0cm0uYXZhaWxfb3V0XG4gICAgICAgIHN0YXRlLmJpdHMgPCA4XG5cbiAgIE9uIHJldHVybiwgc3RhdGUubW9kZSBpcyBvbmUgb2Y6XG5cbiAgICAgICAgTEVOIC0tIHJhbiBvdXQgb2YgZW5vdWdoIG91dHB1dCBzcGFjZSBvciBlbm91Z2ggYXZhaWxhYmxlIGlucHV0XG4gICAgICAgIFRZUEUgLS0gcmVhY2hlZCBlbmQgb2YgYmxvY2sgY29kZSwgaW5mbGF0ZSgpIHRvIGludGVycHJldCBuZXh0IGJsb2NrXG4gICAgICAgIEJBRCAtLSBlcnJvciBpbiBibG9jayBkYXRhXG5cbiAgIE5vdGVzOlxuXG4gICAgLSBUaGUgbWF4aW11bSBpbnB1dCBiaXRzIHVzZWQgYnkgYSBsZW5ndGgvZGlzdGFuY2UgcGFpciBpcyAxNSBiaXRzIGZvciB0aGVcbiAgICAgIGxlbmd0aCBjb2RlLCA1IGJpdHMgZm9yIHRoZSBsZW5ndGggZXh0cmEsIDE1IGJpdHMgZm9yIHRoZSBkaXN0YW5jZSBjb2RlLFxuICAgICAgYW5kIDEzIGJpdHMgZm9yIHRoZSBkaXN0YW5jZSBleHRyYS4gIFRoaXMgdG90YWxzIDQ4IGJpdHMsIG9yIHNpeCBieXRlcy5cbiAgICAgIFRoZXJlZm9yZSBpZiBzdHJtLmF2YWlsX2luID49IDYsIHRoZW4gdGhlcmUgaXMgZW5vdWdoIGlucHV0IHRvIGF2b2lkXG4gICAgICBjaGVja2luZyBmb3IgYXZhaWxhYmxlIGlucHV0IHdoaWxlIGRlY29kaW5nLlxuXG4gICAgLSBUaGUgbWF4aW11bSBieXRlcyB0aGF0IGEgc2luZ2xlIGxlbmd0aC9kaXN0YW5jZSBwYWlyIGNhbiBvdXRwdXQgaXMgMjU4XG4gICAgICBieXRlcywgd2hpY2ggaXMgdGhlIG1heGltdW0gbGVuZ3RoIHRoYXQgY2FuIGJlIGNvZGVkLiAgaW5mbGF0ZV9mYXN0KClcbiAgICAgIHJlcXVpcmVzIHN0cm0uYXZhaWxfb3V0ID49IDI1OCBmb3IgZWFjaCBsb29wIHRvIGF2b2lkIGNoZWNraW5nIGZvclxuICAgICAgb3V0cHV0IHNwYWNlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluZmxhdGVfZmFzdChzdHJtLCBzdGFydCkge1xuICB2YXIgc3RhdGU7XG4gIHZhciBfaW47ICAgICAgICAgICAgICAgICAgICAvKiBsb2NhbCBzdHJtLmlucHV0ICovXG4gIHZhciBsYXN0OyAgICAgICAgICAgICAgICAgICAvKiBoYXZlIGVub3VnaCBpbnB1dCB3aGlsZSBpbiA8IGxhc3QgKi9cbiAgdmFyIF9vdXQ7ICAgICAgICAgICAgICAgICAgIC8qIGxvY2FsIHN0cm0ub3V0cHV0ICovXG4gIHZhciBiZWc7ICAgICAgICAgICAgICAgICAgICAvKiBpbmZsYXRlKCkncyBpbml0aWFsIHN0cm0ub3V0cHV0ICovXG4gIHZhciBlbmQ7ICAgICAgICAgICAgICAgICAgICAvKiB3aGlsZSBvdXQgPCBlbmQsIGVub3VnaCBzcGFjZSBhdmFpbGFibGUgKi9cbi8vI2lmZGVmIElORkxBVEVfU1RSSUNUXG4gIHZhciBkbWF4OyAgICAgICAgICAgICAgICAgICAvKiBtYXhpbXVtIGRpc3RhbmNlIGZyb20gemxpYiBoZWFkZXIgKi9cbi8vI2VuZGlmXG4gIHZhciB3c2l6ZTsgICAgICAgICAgICAgICAgICAvKiB3aW5kb3cgc2l6ZSBvciB6ZXJvIGlmIG5vdCB1c2luZyB3aW5kb3cgKi9cbiAgdmFyIHdoYXZlOyAgICAgICAgICAgICAgICAgIC8qIHZhbGlkIGJ5dGVzIGluIHRoZSB3aW5kb3cgKi9cbiAgdmFyIHduZXh0OyAgICAgICAgICAgICAgICAgIC8qIHdpbmRvdyB3cml0ZSBpbmRleCAqL1xuICAvLyBVc2UgYHNfd2luZG93YCBpbnN0ZWFkIGB3aW5kb3dgLCBhdm9pZCBjb25mbGljdCB3aXRoIGluc3RydW1lbnRhdGlvbiB0b29sc1xuICB2YXIgc193aW5kb3c7ICAgICAgICAgICAgICAgLyogYWxsb2NhdGVkIHNsaWRpbmcgd2luZG93LCBpZiB3c2l6ZSAhPSAwICovXG4gIHZhciBob2xkOyAgICAgICAgICAgICAgICAgICAvKiBsb2NhbCBzdHJtLmhvbGQgKi9cbiAgdmFyIGJpdHM7ICAgICAgICAgICAgICAgICAgIC8qIGxvY2FsIHN0cm0uYml0cyAqL1xuICB2YXIgbGNvZGU7ICAgICAgICAgICAgICAgICAgLyogbG9jYWwgc3RybS5sZW5jb2RlICovXG4gIHZhciBkY29kZTsgICAgICAgICAgICAgICAgICAvKiBsb2NhbCBzdHJtLmRpc3Rjb2RlICovXG4gIHZhciBsbWFzazsgICAgICAgICAgICAgICAgICAvKiBtYXNrIGZvciBmaXJzdCBsZXZlbCBvZiBsZW5ndGggY29kZXMgKi9cbiAgdmFyIGRtYXNrOyAgICAgICAgICAgICAgICAgIC8qIG1hc2sgZm9yIGZpcnN0IGxldmVsIG9mIGRpc3RhbmNlIGNvZGVzICovXG4gIHZhciBoZXJlOyAgICAgICAgICAgICAgICAgICAvKiByZXRyaWV2ZWQgdGFibGUgZW50cnkgKi9cbiAgdmFyIG9wOyAgICAgICAgICAgICAgICAgICAgIC8qIGNvZGUgYml0cywgb3BlcmF0aW9uLCBleHRyYSBiaXRzLCBvciAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIHdpbmRvdyBwb3NpdGlvbiwgd2luZG93IGJ5dGVzIHRvIGNvcHkgKi9cbiAgdmFyIGxlbjsgICAgICAgICAgICAgICAgICAgIC8qIG1hdGNoIGxlbmd0aCwgdW51c2VkIGJ5dGVzICovXG4gIHZhciBkaXN0OyAgICAgICAgICAgICAgICAgICAvKiBtYXRjaCBkaXN0YW5jZSAqL1xuICB2YXIgZnJvbTsgICAgICAgICAgICAgICAgICAgLyogd2hlcmUgdG8gY29weSBtYXRjaCBmcm9tICovXG4gIHZhciBmcm9tX3NvdXJjZTtcblxuXG4gIHZhciBpbnB1dCwgb3V0cHV0OyAvLyBKUyBzcGVjaWZpYywgYmVjYXVzZSB3ZSBoYXZlIG5vIHBvaW50ZXJzXG5cbiAgLyogY29weSBzdGF0ZSB0byBsb2NhbCB2YXJpYWJsZXMgKi9cbiAgc3RhdGUgPSBzdHJtLnN0YXRlO1xuICAvL2hlcmUgPSBzdGF0ZS5oZXJlO1xuICBfaW4gPSBzdHJtLm5leHRfaW47XG4gIGlucHV0ID0gc3RybS5pbnB1dDtcbiAgbGFzdCA9IF9pbiArIChzdHJtLmF2YWlsX2luIC0gNSk7XG4gIF9vdXQgPSBzdHJtLm5leHRfb3V0O1xuICBvdXRwdXQgPSBzdHJtLm91dHB1dDtcbiAgYmVnID0gX291dCAtIChzdGFydCAtIHN0cm0uYXZhaWxfb3V0KTtcbiAgZW5kID0gX291dCArIChzdHJtLmF2YWlsX291dCAtIDI1Nyk7XG4vLyNpZmRlZiBJTkZMQVRFX1NUUklDVFxuICBkbWF4ID0gc3RhdGUuZG1heDtcbi8vI2VuZGlmXG4gIHdzaXplID0gc3RhdGUud3NpemU7XG4gIHdoYXZlID0gc3RhdGUud2hhdmU7XG4gIHduZXh0ID0gc3RhdGUud25leHQ7XG4gIHNfd2luZG93ID0gc3RhdGUud2luZG93O1xuICBob2xkID0gc3RhdGUuaG9sZDtcbiAgYml0cyA9IHN0YXRlLmJpdHM7XG4gIGxjb2RlID0gc3RhdGUubGVuY29kZTtcbiAgZGNvZGUgPSBzdGF0ZS5kaXN0Y29kZTtcbiAgbG1hc2sgPSAoMSA8PCBzdGF0ZS5sZW5iaXRzKSAtIDE7XG4gIGRtYXNrID0gKDEgPDwgc3RhdGUuZGlzdGJpdHMpIC0gMTtcblxuXG4gIC8qIGRlY29kZSBsaXRlcmFscyBhbmQgbGVuZ3RoL2Rpc3RhbmNlcyB1bnRpbCBlbmQtb2YtYmxvY2sgb3Igbm90IGVub3VnaFxuICAgICBpbnB1dCBkYXRhIG9yIG91dHB1dCBzcGFjZSAqL1xuXG4gIHRvcDpcbiAgZG8ge1xuICAgIGlmIChiaXRzIDwgMTUpIHtcbiAgICAgIGhvbGQgKz0gaW5wdXRbX2luKytdIDw8IGJpdHM7XG4gICAgICBiaXRzICs9IDg7XG4gICAgICBob2xkICs9IGlucHV0W19pbisrXSA8PCBiaXRzO1xuICAgICAgYml0cyArPSA4O1xuICAgIH1cblxuICAgIGhlcmUgPSBsY29kZVtob2xkICYgbG1hc2tdO1xuXG4gICAgZG9sZW46XG4gICAgZm9yICg7OykgeyAvLyBHb3RvIGVtdWxhdGlvblxuICAgICAgb3AgPSBoZXJlID4+PiAyNC8qaGVyZS5iaXRzKi87XG4gICAgICBob2xkID4+Pj0gb3A7XG4gICAgICBiaXRzIC09IG9wO1xuICAgICAgb3AgPSAoaGVyZSA+Pj4gMTYpICYgMHhmZi8qaGVyZS5vcCovO1xuICAgICAgaWYgKG9wID09PSAwKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBsaXRlcmFsICovXG4gICAgICAgIC8vVHJhY2V2digoc3RkZXJyLCBoZXJlLnZhbCA+PSAweDIwICYmIGhlcmUudmFsIDwgMHg3ZiA/XG4gICAgICAgIC8vICAgICAgICBcImluZmxhdGU6ICAgICAgICAgbGl0ZXJhbCAnJWMnXFxuXCIgOlxuICAgICAgICAvLyAgICAgICAgXCJpbmZsYXRlOiAgICAgICAgIGxpdGVyYWwgMHglMDJ4XFxuXCIsIGhlcmUudmFsKSk7XG4gICAgICAgIG91dHB1dFtfb3V0KytdID0gaGVyZSAmIDB4ZmZmZi8qaGVyZS52YWwqLztcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKG9wICYgMTYpIHsgICAgICAgICAgICAgICAgICAgICAvKiBsZW5ndGggYmFzZSAqL1xuICAgICAgICBsZW4gPSBoZXJlICYgMHhmZmZmLypoZXJlLnZhbCovO1xuICAgICAgICBvcCAmPSAxNTsgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBudW1iZXIgb2YgZXh0cmEgYml0cyAqL1xuICAgICAgICBpZiAob3ApIHtcbiAgICAgICAgICBpZiAoYml0cyA8IG9wKSB7XG4gICAgICAgICAgICBob2xkICs9IGlucHV0W19pbisrXSA8PCBiaXRzO1xuICAgICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICAgIH1cbiAgICAgICAgICBsZW4gKz0gaG9sZCAmICgoMSA8PCBvcCkgLSAxKTtcbiAgICAgICAgICBob2xkID4+Pj0gb3A7XG4gICAgICAgICAgYml0cyAtPSBvcDtcbiAgICAgICAgfVxuICAgICAgICAvL1RyYWNldnYoKHN0ZGVyciwgXCJpbmZsYXRlOiAgICAgICAgIGxlbmd0aCAldVxcblwiLCBsZW4pKTtcbiAgICAgICAgaWYgKGJpdHMgPCAxNSkge1xuICAgICAgICAgIGhvbGQgKz0gaW5wdXRbX2luKytdIDw8IGJpdHM7XG4gICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICAgIGhvbGQgKz0gaW5wdXRbX2luKytdIDw8IGJpdHM7XG4gICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICB9XG4gICAgICAgIGhlcmUgPSBkY29kZVtob2xkICYgZG1hc2tdO1xuXG4gICAgICAgIGRvZGlzdDpcbiAgICAgICAgZm9yICg7OykgeyAvLyBnb3RvIGVtdWxhdGlvblxuICAgICAgICAgIG9wID0gaGVyZSA+Pj4gMjQvKmhlcmUuYml0cyovO1xuICAgICAgICAgIGhvbGQgPj4+PSBvcDtcbiAgICAgICAgICBiaXRzIC09IG9wO1xuICAgICAgICAgIG9wID0gKGhlcmUgPj4+IDE2KSAmIDB4ZmYvKmhlcmUub3AqLztcblxuICAgICAgICAgIGlmIChvcCAmIDE2KSB7ICAgICAgICAgICAgICAgICAgICAgIC8qIGRpc3RhbmNlIGJhc2UgKi9cbiAgICAgICAgICAgIGRpc3QgPSBoZXJlICYgMHhmZmZmLypoZXJlLnZhbCovO1xuICAgICAgICAgICAgb3AgJj0gMTU7ICAgICAgICAgICAgICAgICAgICAgICAvKiBudW1iZXIgb2YgZXh0cmEgYml0cyAqL1xuICAgICAgICAgICAgaWYgKGJpdHMgPCBvcCkge1xuICAgICAgICAgICAgICBob2xkICs9IGlucHV0W19pbisrXSA8PCBiaXRzO1xuICAgICAgICAgICAgICBiaXRzICs9IDg7XG4gICAgICAgICAgICAgIGlmIChiaXRzIDwgb3ApIHtcbiAgICAgICAgICAgICAgICBob2xkICs9IGlucHV0W19pbisrXSA8PCBiaXRzO1xuICAgICAgICAgICAgICAgIGJpdHMgKz0gODtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGlzdCArPSBob2xkICYgKCgxIDw8IG9wKSAtIDEpO1xuLy8jaWZkZWYgSU5GTEFURV9TVFJJQ1RcbiAgICAgICAgICAgIGlmIChkaXN0ID4gZG1heCkge1xuICAgICAgICAgICAgICBzdHJtLm1zZyA9ICdpbnZhbGlkIGRpc3RhbmNlIHRvbyBmYXIgYmFjayc7XG4gICAgICAgICAgICAgIHN0YXRlLm1vZGUgPSBCQUQ7XG4gICAgICAgICAgICAgIGJyZWFrIHRvcDtcbiAgICAgICAgICAgIH1cbi8vI2VuZGlmXG4gICAgICAgICAgICBob2xkID4+Pj0gb3A7XG4gICAgICAgICAgICBiaXRzIC09IG9wO1xuICAgICAgICAgICAgLy9UcmFjZXZ2KChzdGRlcnIsIFwiaW5mbGF0ZTogICAgICAgICBkaXN0YW5jZSAldVxcblwiLCBkaXN0KSk7XG4gICAgICAgICAgICBvcCA9IF9vdXQgLSBiZWc7ICAgICAgICAgICAgICAgIC8qIG1heCBkaXN0YW5jZSBpbiBvdXRwdXQgKi9cbiAgICAgICAgICAgIGlmIChkaXN0ID4gb3ApIHsgICAgICAgICAgICAgICAgLyogc2VlIGlmIGNvcHkgZnJvbSB3aW5kb3cgKi9cbiAgICAgICAgICAgICAgb3AgPSBkaXN0IC0gb3A7ICAgICAgICAgICAgICAgLyogZGlzdGFuY2UgYmFjayBpbiB3aW5kb3cgKi9cbiAgICAgICAgICAgICAgaWYgKG9wID4gd2hhdmUpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUuc2FuZSkge1xuICAgICAgICAgICAgICAgICAgc3RybS5tc2cgPSAnaW52YWxpZCBkaXN0YW5jZSB0b28gZmFyIGJhY2snO1xuICAgICAgICAgICAgICAgICAgc3RhdGUubW9kZSA9IEJBRDtcbiAgICAgICAgICAgICAgICAgIGJyZWFrIHRvcDtcbiAgICAgICAgICAgICAgICB9XG5cbi8vICghKSBUaGlzIGJsb2NrIGlzIGRpc2FibGVkIGluIHpsaWIgZGVmYXVsdHMsXG4vLyBkb24ndCBlbmFibGUgaXQgZm9yIGJpbmFyeSBjb21wYXRpYmlsaXR5XG4vLyNpZmRlZiBJTkZMQVRFX0FMTE9XX0lOVkFMSURfRElTVEFOQ0VfVE9PRkFSX0FSUlJcbi8vICAgICAgICAgICAgICAgIGlmIChsZW4gPD0gb3AgLSB3aGF2ZSkge1xuLy8gICAgICAgICAgICAgICAgICBkbyB7XG4vLyAgICAgICAgICAgICAgICAgICAgb3V0cHV0W19vdXQrK10gPSAwO1xuLy8gICAgICAgICAgICAgICAgICB9IHdoaWxlICgtLWxlbik7XG4vLyAgICAgICAgICAgICAgICAgIGNvbnRpbnVlIHRvcDtcbi8vICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgIGxlbiAtPSBvcCAtIHdoYXZlO1xuLy8gICAgICAgICAgICAgICAgZG8ge1xuLy8gICAgICAgICAgICAgICAgICBvdXRwdXRbX291dCsrXSA9IDA7XG4vLyAgICAgICAgICAgICAgICB9IHdoaWxlICgtLW9wID4gd2hhdmUpO1xuLy8gICAgICAgICAgICAgICAgaWYgKG9wID09PSAwKSB7XG4vLyAgICAgICAgICAgICAgICAgIGZyb20gPSBfb3V0IC0gZGlzdDtcbi8vICAgICAgICAgICAgICAgICAgZG8ge1xuLy8gICAgICAgICAgICAgICAgICAgIG91dHB1dFtfb3V0KytdID0gb3V0cHV0W2Zyb20rK107XG4vLyAgICAgICAgICAgICAgICAgIH0gd2hpbGUgKC0tbGVuKTtcbi8vICAgICAgICAgICAgICAgICAgY29udGludWUgdG9wO1xuLy8gICAgICAgICAgICAgICAgfVxuLy8jZW5kaWZcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBmcm9tID0gMDsgLy8gd2luZG93IGluZGV4XG4gICAgICAgICAgICAgIGZyb21fc291cmNlID0gc193aW5kb3c7XG4gICAgICAgICAgICAgIGlmICh3bmV4dCA9PT0gMCkgeyAgICAgICAgICAgLyogdmVyeSBjb21tb24gY2FzZSAqL1xuICAgICAgICAgICAgICAgIGZyb20gKz0gd3NpemUgLSBvcDtcbiAgICAgICAgICAgICAgICBpZiAob3AgPCBsZW4pIHsgICAgICAgICAvKiBzb21lIGZyb20gd2luZG93ICovXG4gICAgICAgICAgICAgICAgICBsZW4gLT0gb3A7XG4gICAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dFtfb3V0KytdID0gc193aW5kb3dbZnJvbSsrXTtcbiAgICAgICAgICAgICAgICAgIH0gd2hpbGUgKC0tb3ApO1xuICAgICAgICAgICAgICAgICAgZnJvbSA9IF9vdXQgLSBkaXN0OyAgLyogcmVzdCBmcm9tIG91dHB1dCAqL1xuICAgICAgICAgICAgICAgICAgZnJvbV9zb3VyY2UgPSBvdXRwdXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2UgaWYgKHduZXh0IDwgb3ApIHsgICAgICAvKiB3cmFwIGFyb3VuZCB3aW5kb3cgKi9cbiAgICAgICAgICAgICAgICBmcm9tICs9IHdzaXplICsgd25leHQgLSBvcDtcbiAgICAgICAgICAgICAgICBvcCAtPSB3bmV4dDtcbiAgICAgICAgICAgICAgICBpZiAob3AgPCBsZW4pIHsgICAgICAgICAvKiBzb21lIGZyb20gZW5kIG9mIHdpbmRvdyAqL1xuICAgICAgICAgICAgICAgICAgbGVuIC09IG9wO1xuICAgICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXRbX291dCsrXSA9IHNfd2luZG93W2Zyb20rK107XG4gICAgICAgICAgICAgICAgICB9IHdoaWxlICgtLW9wKTtcbiAgICAgICAgICAgICAgICAgIGZyb20gPSAwO1xuICAgICAgICAgICAgICAgICAgaWYgKHduZXh0IDwgbGVuKSB7ICAvKiBzb21lIGZyb20gc3RhcnQgb2Ygd2luZG93ICovXG4gICAgICAgICAgICAgICAgICAgIG9wID0gd25leHQ7XG4gICAgICAgICAgICAgICAgICAgIGxlbiAtPSBvcDtcbiAgICAgICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICAgIG91dHB1dFtfb3V0KytdID0gc193aW5kb3dbZnJvbSsrXTtcbiAgICAgICAgICAgICAgICAgICAgfSB3aGlsZSAoLS1vcCk7XG4gICAgICAgICAgICAgICAgICAgIGZyb20gPSBfb3V0IC0gZGlzdDsgICAgICAvKiByZXN0IGZyb20gb3V0cHV0ICovXG4gICAgICAgICAgICAgICAgICAgIGZyb21fc291cmNlID0gb3V0cHV0O1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNlIHsgICAgICAgICAgICAgICAgICAgICAgLyogY29udGlndW91cyBpbiB3aW5kb3cgKi9cbiAgICAgICAgICAgICAgICBmcm9tICs9IHduZXh0IC0gb3A7XG4gICAgICAgICAgICAgICAgaWYgKG9wIDwgbGVuKSB7ICAgICAgICAgLyogc29tZSBmcm9tIHdpbmRvdyAqL1xuICAgICAgICAgICAgICAgICAgbGVuIC09IG9wO1xuICAgICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXRbX291dCsrXSA9IHNfd2luZG93W2Zyb20rK107XG4gICAgICAgICAgICAgICAgICB9IHdoaWxlICgtLW9wKTtcbiAgICAgICAgICAgICAgICAgIGZyb20gPSBfb3V0IC0gZGlzdDsgIC8qIHJlc3QgZnJvbSBvdXRwdXQgKi9cbiAgICAgICAgICAgICAgICAgIGZyb21fc291cmNlID0gb3V0cHV0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB3aGlsZSAobGVuID4gMikge1xuICAgICAgICAgICAgICAgIG91dHB1dFtfb3V0KytdID0gZnJvbV9zb3VyY2VbZnJvbSsrXTtcbiAgICAgICAgICAgICAgICBvdXRwdXRbX291dCsrXSA9IGZyb21fc291cmNlW2Zyb20rK107XG4gICAgICAgICAgICAgICAgb3V0cHV0W19vdXQrK10gPSBmcm9tX3NvdXJjZVtmcm9tKytdO1xuICAgICAgICAgICAgICAgIGxlbiAtPSAzO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChsZW4pIHtcbiAgICAgICAgICAgICAgICBvdXRwdXRbX291dCsrXSA9IGZyb21fc291cmNlW2Zyb20rK107XG4gICAgICAgICAgICAgICAgaWYgKGxlbiA+IDEpIHtcbiAgICAgICAgICAgICAgICAgIG91dHB1dFtfb3V0KytdID0gZnJvbV9zb3VyY2VbZnJvbSsrXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBmcm9tID0gX291dCAtIGRpc3Q7ICAgICAgICAgIC8qIGNvcHkgZGlyZWN0IGZyb20gb3V0cHV0ICovXG4gICAgICAgICAgICAgIGRvIHsgICAgICAgICAgICAgICAgICAgICAgICAvKiBtaW5pbXVtIGxlbmd0aCBpcyB0aHJlZSAqL1xuICAgICAgICAgICAgICAgIG91dHB1dFtfb3V0KytdID0gb3V0cHV0W2Zyb20rK107XG4gICAgICAgICAgICAgICAgb3V0cHV0W19vdXQrK10gPSBvdXRwdXRbZnJvbSsrXTtcbiAgICAgICAgICAgICAgICBvdXRwdXRbX291dCsrXSA9IG91dHB1dFtmcm9tKytdO1xuICAgICAgICAgICAgICAgIGxlbiAtPSAzO1xuICAgICAgICAgICAgICB9IHdoaWxlIChsZW4gPiAyKTtcbiAgICAgICAgICAgICAgaWYgKGxlbikge1xuICAgICAgICAgICAgICAgIG91dHB1dFtfb3V0KytdID0gb3V0cHV0W2Zyb20rK107XG4gICAgICAgICAgICAgICAgaWYgKGxlbiA+IDEpIHtcbiAgICAgICAgICAgICAgICAgIG91dHB1dFtfb3V0KytdID0gb3V0cHV0W2Zyb20rK107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKChvcCAmIDY0KSA9PT0gMCkgeyAgICAgICAgICAvKiAybmQgbGV2ZWwgZGlzdGFuY2UgY29kZSAqL1xuICAgICAgICAgICAgaGVyZSA9IGRjb2RlWyhoZXJlICYgMHhmZmZmKS8qaGVyZS52YWwqLyArIChob2xkICYgKCgxIDw8IG9wKSAtIDEpKV07XG4gICAgICAgICAgICBjb250aW51ZSBkb2Rpc3Q7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3RybS5tc2cgPSAnaW52YWxpZCBkaXN0YW5jZSBjb2RlJztcbiAgICAgICAgICAgIHN0YXRlLm1vZGUgPSBCQUQ7XG4gICAgICAgICAgICBicmVhayB0b3A7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7IC8vIG5lZWQgdG8gZW11bGF0ZSBnb3RvIHZpYSBcImNvbnRpbnVlXCJcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoKG9wICYgNjQpID09PSAwKSB7ICAgICAgICAgICAgICAvKiAybmQgbGV2ZWwgbGVuZ3RoIGNvZGUgKi9cbiAgICAgICAgaGVyZSA9IGxjb2RlWyhoZXJlICYgMHhmZmZmKS8qaGVyZS52YWwqLyArIChob2xkICYgKCgxIDw8IG9wKSAtIDEpKV07XG4gICAgICAgIGNvbnRpbnVlIGRvbGVuO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAob3AgJiAzMikgeyAgICAgICAgICAgICAgICAgICAgIC8qIGVuZC1vZi1ibG9jayAqL1xuICAgICAgICAvL1RyYWNldnYoKHN0ZGVyciwgXCJpbmZsYXRlOiAgICAgICAgIGVuZCBvZiBibG9ja1xcblwiKSk7XG4gICAgICAgIHN0YXRlLm1vZGUgPSBUWVBFO1xuICAgICAgICBicmVhayB0b3A7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc3RybS5tc2cgPSAnaW52YWxpZCBsaXRlcmFsL2xlbmd0aCBjb2RlJztcbiAgICAgICAgc3RhdGUubW9kZSA9IEJBRDtcbiAgICAgICAgYnJlYWsgdG9wO1xuICAgICAgfVxuXG4gICAgICBicmVhazsgLy8gbmVlZCB0byBlbXVsYXRlIGdvdG8gdmlhIFwiY29udGludWVcIlxuICAgIH1cbiAgfSB3aGlsZSAoX2luIDwgbGFzdCAmJiBfb3V0IDwgZW5kKTtcblxuICAvKiByZXR1cm4gdW51c2VkIGJ5dGVzIChvbiBlbnRyeSwgYml0cyA8IDgsIHNvIGluIHdvbid0IGdvIHRvbyBmYXIgYmFjaykgKi9cbiAgbGVuID0gYml0cyA+PiAzO1xuICBfaW4gLT0gbGVuO1xuICBiaXRzIC09IGxlbiA8PCAzO1xuICBob2xkICY9ICgxIDw8IGJpdHMpIC0gMTtcblxuICAvKiB1cGRhdGUgc3RhdGUgYW5kIHJldHVybiAqL1xuICBzdHJtLm5leHRfaW4gPSBfaW47XG4gIHN0cm0ubmV4dF9vdXQgPSBfb3V0O1xuICBzdHJtLmF2YWlsX2luID0gKF9pbiA8IGxhc3QgPyA1ICsgKGxhc3QgLSBfaW4pIDogNSAtIChfaW4gLSBsYXN0KSk7XG4gIHN0cm0uYXZhaWxfb3V0ID0gKF9vdXQgPCBlbmQgPyAyNTcgKyAoZW5kIC0gX291dCkgOiAyNTcgLSAoX291dCAtIGVuZCkpO1xuICBzdGF0ZS5ob2xkID0gaG9sZDtcbiAgc3RhdGUuYml0cyA9IGJpdHM7XG4gIHJldHVybjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIChDKSAxOTk1LTIwMTMgSmVhbi1sb3VwIEdhaWxseSBhbmQgTWFyayBBZGxlclxuLy8gKEMpIDIwMTQtMjAxNyBWaXRhbHkgUHV6cmluIGFuZCBBbmRyZXkgVHVwaXRzaW5cbi8vXG4vLyBUaGlzIHNvZnR3YXJlIGlzIHByb3ZpZGVkICdhcy1pcycsIHdpdGhvdXQgYW55IGV4cHJlc3Mgb3IgaW1wbGllZFxuLy8gd2FycmFudHkuIEluIG5vIGV2ZW50IHdpbGwgdGhlIGF1dGhvcnMgYmUgaGVsZCBsaWFibGUgZm9yIGFueSBkYW1hZ2VzXG4vLyBhcmlzaW5nIGZyb20gdGhlIHVzZSBvZiB0aGlzIHNvZnR3YXJlLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byBhbnlvbmUgdG8gdXNlIHRoaXMgc29mdHdhcmUgZm9yIGFueSBwdXJwb3NlLFxuLy8gaW5jbHVkaW5nIGNvbW1lcmNpYWwgYXBwbGljYXRpb25zLCBhbmQgdG8gYWx0ZXIgaXQgYW5kIHJlZGlzdHJpYnV0ZSBpdFxuLy8gZnJlZWx5LCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgcmVzdHJpY3Rpb25zOlxuLy9cbi8vIDEuIFRoZSBvcmlnaW4gb2YgdGhpcyBzb2Z0d2FyZSBtdXN0IG5vdCBiZSBtaXNyZXByZXNlbnRlZDsgeW91IG11c3Qgbm90XG4vLyAgIGNsYWltIHRoYXQgeW91IHdyb3RlIHRoZSBvcmlnaW5hbCBzb2Z0d2FyZS4gSWYgeW91IHVzZSB0aGlzIHNvZnR3YXJlXG4vLyAgIGluIGEgcHJvZHVjdCwgYW4gYWNrbm93bGVkZ21lbnQgaW4gdGhlIHByb2R1Y3QgZG9jdW1lbnRhdGlvbiB3b3VsZCBiZVxuLy8gICBhcHByZWNpYXRlZCBidXQgaXMgbm90IHJlcXVpcmVkLlxuLy8gMi4gQWx0ZXJlZCBzb3VyY2UgdmVyc2lvbnMgbXVzdCBiZSBwbGFpbmx5IG1hcmtlZCBhcyBzdWNoLCBhbmQgbXVzdCBub3QgYmVcbi8vICAgbWlzcmVwcmVzZW50ZWQgYXMgYmVpbmcgdGhlIG9yaWdpbmFsIHNvZnR3YXJlLlxuLy8gMy4gVGhpcyBub3RpY2UgbWF5IG5vdCBiZSByZW1vdmVkIG9yIGFsdGVyZWQgZnJvbSBhbnkgc291cmNlIGRpc3RyaWJ1dGlvbi5cblxudmFyIHV0aWxzICAgICAgICAgPSByZXF1aXJlKCcuLi91dGlscy9jb21tb24nKTtcbnZhciBhZGxlcjMyICAgICAgID0gcmVxdWlyZSgnLi9hZGxlcjMyJyk7XG52YXIgY3JjMzIgICAgICAgICA9IHJlcXVpcmUoJy4vY3JjMzInKTtcbnZhciBpbmZsYXRlX2Zhc3QgID0gcmVxdWlyZSgnLi9pbmZmYXN0Jyk7XG52YXIgaW5mbGF0ZV90YWJsZSA9IHJlcXVpcmUoJy4vaW5mdHJlZXMnKTtcblxudmFyIENPREVTID0gMDtcbnZhciBMRU5TID0gMTtcbnZhciBESVNUUyA9IDI7XG5cbi8qIFB1YmxpYyBjb25zdGFudHMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuXG5cbi8qIEFsbG93ZWQgZmx1c2ggdmFsdWVzOyBzZWUgZGVmbGF0ZSgpIGFuZCBpbmZsYXRlKCkgYmVsb3cgZm9yIGRldGFpbHMgKi9cbi8vdmFyIFpfTk9fRkxVU0ggICAgICA9IDA7XG4vL3ZhciBaX1BBUlRJQUxfRkxVU0ggPSAxO1xuLy92YXIgWl9TWU5DX0ZMVVNIICAgID0gMjtcbi8vdmFyIFpfRlVMTF9GTFVTSCAgICA9IDM7XG52YXIgWl9GSU5JU0ggICAgICAgID0gNDtcbnZhciBaX0JMT0NLICAgICAgICAgPSA1O1xudmFyIFpfVFJFRVMgICAgICAgICA9IDY7XG5cblxuLyogUmV0dXJuIGNvZGVzIGZvciB0aGUgY29tcHJlc3Npb24vZGVjb21wcmVzc2lvbiBmdW5jdGlvbnMuIE5lZ2F0aXZlIHZhbHVlc1xuICogYXJlIGVycm9ycywgcG9zaXRpdmUgdmFsdWVzIGFyZSB1c2VkIGZvciBzcGVjaWFsIGJ1dCBub3JtYWwgZXZlbnRzLlxuICovXG52YXIgWl9PSyAgICAgICAgICAgID0gMDtcbnZhciBaX1NUUkVBTV9FTkQgICAgPSAxO1xudmFyIFpfTkVFRF9ESUNUICAgICA9IDI7XG4vL3ZhciBaX0VSUk5PICAgICAgICAgPSAtMTtcbnZhciBaX1NUUkVBTV9FUlJPUiAgPSAtMjtcbnZhciBaX0RBVEFfRVJST1IgICAgPSAtMztcbnZhciBaX01FTV9FUlJPUiAgICAgPSAtNDtcbnZhciBaX0JVRl9FUlJPUiAgICAgPSAtNTtcbi8vdmFyIFpfVkVSU0lPTl9FUlJPUiA9IC02O1xuXG4vKiBUaGUgZGVmbGF0ZSBjb21wcmVzc2lvbiBtZXRob2QgKi9cbnZhciBaX0RFRkxBVEVEICA9IDg7XG5cblxuLyogU1RBVEVTID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG5cblxudmFyICAgIEhFQUQgPSAxOyAgICAgICAvKiBpOiB3YWl0aW5nIGZvciBtYWdpYyBoZWFkZXIgKi9cbnZhciAgICBGTEFHUyA9IDI7ICAgICAgLyogaTogd2FpdGluZyBmb3IgbWV0aG9kIGFuZCBmbGFncyAoZ3ppcCkgKi9cbnZhciAgICBUSU1FID0gMzsgICAgICAgLyogaTogd2FpdGluZyBmb3IgbW9kaWZpY2F0aW9uIHRpbWUgKGd6aXApICovXG52YXIgICAgT1MgPSA0OyAgICAgICAgIC8qIGk6IHdhaXRpbmcgZm9yIGV4dHJhIGZsYWdzIGFuZCBvcGVyYXRpbmcgc3lzdGVtIChnemlwKSAqL1xudmFyICAgIEVYTEVOID0gNTsgICAgICAvKiBpOiB3YWl0aW5nIGZvciBleHRyYSBsZW5ndGggKGd6aXApICovXG52YXIgICAgRVhUUkEgPSA2OyAgICAgIC8qIGk6IHdhaXRpbmcgZm9yIGV4dHJhIGJ5dGVzIChnemlwKSAqL1xudmFyICAgIE5BTUUgPSA3OyAgICAgICAvKiBpOiB3YWl0aW5nIGZvciBlbmQgb2YgZmlsZSBuYW1lIChnemlwKSAqL1xudmFyICAgIENPTU1FTlQgPSA4OyAgICAvKiBpOiB3YWl0aW5nIGZvciBlbmQgb2YgY29tbWVudCAoZ3ppcCkgKi9cbnZhciAgICBIQ1JDID0gOTsgICAgICAgLyogaTogd2FpdGluZyBmb3IgaGVhZGVyIGNyYyAoZ3ppcCkgKi9cbnZhciAgICBESUNUSUQgPSAxMDsgICAgLyogaTogd2FpdGluZyBmb3IgZGljdGlvbmFyeSBjaGVjayB2YWx1ZSAqL1xudmFyICAgIERJQ1QgPSAxMTsgICAgICAvKiB3YWl0aW5nIGZvciBpbmZsYXRlU2V0RGljdGlvbmFyeSgpIGNhbGwgKi9cbnZhciAgICAgICAgVFlQRSA9IDEyOyAgICAgIC8qIGk6IHdhaXRpbmcgZm9yIHR5cGUgYml0cywgaW5jbHVkaW5nIGxhc3QtZmxhZyBiaXQgKi9cbnZhciAgICAgICAgVFlQRURPID0gMTM7ICAgIC8qIGk6IHNhbWUsIGJ1dCBza2lwIGNoZWNrIHRvIGV4aXQgaW5mbGF0ZSBvbiBuZXcgYmxvY2sgKi9cbnZhciAgICAgICAgU1RPUkVEID0gMTQ7ICAgIC8qIGk6IHdhaXRpbmcgZm9yIHN0b3JlZCBzaXplIChsZW5ndGggYW5kIGNvbXBsZW1lbnQpICovXG52YXIgICAgICAgIENPUFlfID0gMTU7ICAgICAvKiBpL286IHNhbWUgYXMgQ09QWSBiZWxvdywgYnV0IG9ubHkgZmlyc3QgdGltZSBpbiAqL1xudmFyICAgICAgICBDT1BZID0gMTY7ICAgICAgLyogaS9vOiB3YWl0aW5nIGZvciBpbnB1dCBvciBvdXRwdXQgdG8gY29weSBzdG9yZWQgYmxvY2sgKi9cbnZhciAgICAgICAgVEFCTEUgPSAxNzsgICAgIC8qIGk6IHdhaXRpbmcgZm9yIGR5bmFtaWMgYmxvY2sgdGFibGUgbGVuZ3RocyAqL1xudmFyICAgICAgICBMRU5MRU5TID0gMTg7ICAgLyogaTogd2FpdGluZyBmb3IgY29kZSBsZW5ndGggY29kZSBsZW5ndGhzICovXG52YXIgICAgICAgIENPREVMRU5TID0gMTk7ICAvKiBpOiB3YWl0aW5nIGZvciBsZW5ndGgvbGl0IGFuZCBkaXN0YW5jZSBjb2RlIGxlbmd0aHMgKi9cbnZhciAgICAgICAgICAgIExFTl8gPSAyMDsgICAgICAvKiBpOiBzYW1lIGFzIExFTiBiZWxvdywgYnV0IG9ubHkgZmlyc3QgdGltZSBpbiAqL1xudmFyICAgICAgICAgICAgTEVOID0gMjE7ICAgICAgIC8qIGk6IHdhaXRpbmcgZm9yIGxlbmd0aC9saXQvZW9iIGNvZGUgKi9cbnZhciAgICAgICAgICAgIExFTkVYVCA9IDIyOyAgICAvKiBpOiB3YWl0aW5nIGZvciBsZW5ndGggZXh0cmEgYml0cyAqL1xudmFyICAgICAgICAgICAgRElTVCA9IDIzOyAgICAgIC8qIGk6IHdhaXRpbmcgZm9yIGRpc3RhbmNlIGNvZGUgKi9cbnZhciAgICAgICAgICAgIERJU1RFWFQgPSAyNDsgICAvKiBpOiB3YWl0aW5nIGZvciBkaXN0YW5jZSBleHRyYSBiaXRzICovXG52YXIgICAgICAgICAgICBNQVRDSCA9IDI1OyAgICAgLyogbzogd2FpdGluZyBmb3Igb3V0cHV0IHNwYWNlIHRvIGNvcHkgc3RyaW5nICovXG52YXIgICAgICAgICAgICBMSVQgPSAyNjsgICAgICAgLyogbzogd2FpdGluZyBmb3Igb3V0cHV0IHNwYWNlIHRvIHdyaXRlIGxpdGVyYWwgKi9cbnZhciAgICBDSEVDSyA9IDI3OyAgICAgLyogaTogd2FpdGluZyBmb3IgMzItYml0IGNoZWNrIHZhbHVlICovXG52YXIgICAgTEVOR1RIID0gMjg7ICAgIC8qIGk6IHdhaXRpbmcgZm9yIDMyLWJpdCBsZW5ndGggKGd6aXApICovXG52YXIgICAgRE9ORSA9IDI5OyAgICAgIC8qIGZpbmlzaGVkIGNoZWNrLCBkb25lIC0tIHJlbWFpbiBoZXJlIHVudGlsIHJlc2V0ICovXG52YXIgICAgQkFEID0gMzA7ICAgICAgIC8qIGdvdCBhIGRhdGEgZXJyb3IgLS0gcmVtYWluIGhlcmUgdW50aWwgcmVzZXQgKi9cbnZhciAgICBNRU0gPSAzMTsgICAgICAgLyogZ290IGFuIGluZmxhdGUoKSBtZW1vcnkgZXJyb3IgLS0gcmVtYWluIGhlcmUgdW50aWwgcmVzZXQgKi9cbnZhciAgICBTWU5DID0gMzI7ICAgICAgLyogbG9va2luZyBmb3Igc3luY2hyb25pemF0aW9uIGJ5dGVzIHRvIHJlc3RhcnQgaW5mbGF0ZSgpICovXG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG5cblxuXG52YXIgRU5PVUdIX0xFTlMgPSA4NTI7XG52YXIgRU5PVUdIX0RJU1RTID0gNTkyO1xuLy92YXIgRU5PVUdIID0gIChFTk9VR0hfTEVOUytFTk9VR0hfRElTVFMpO1xuXG52YXIgTUFYX1dCSVRTID0gMTU7XG4vKiAzMksgTFo3NyB3aW5kb3cgKi9cbnZhciBERUZfV0JJVFMgPSBNQVhfV0JJVFM7XG5cblxuZnVuY3Rpb24genN3YXAzMihxKSB7XG4gIHJldHVybiAgKCgocSA+Pj4gMjQpICYgMHhmZikgK1xuICAgICAgICAgICgocSA+Pj4gOCkgJiAweGZmMDApICtcbiAgICAgICAgICAoKHEgJiAweGZmMDApIDw8IDgpICtcbiAgICAgICAgICAoKHEgJiAweGZmKSA8PCAyNCkpO1xufVxuXG5cbmZ1bmN0aW9uIEluZmxhdGVTdGF0ZSgpIHtcbiAgdGhpcy5tb2RlID0gMDsgICAgICAgICAgICAgLyogY3VycmVudCBpbmZsYXRlIG1vZGUgKi9cbiAgdGhpcy5sYXN0ID0gZmFsc2U7ICAgICAgICAgIC8qIHRydWUgaWYgcHJvY2Vzc2luZyBsYXN0IGJsb2NrICovXG4gIHRoaXMud3JhcCA9IDA7ICAgICAgICAgICAgICAvKiBiaXQgMCB0cnVlIGZvciB6bGliLCBiaXQgMSB0cnVlIGZvciBnemlwICovXG4gIHRoaXMuaGF2ZWRpY3QgPSBmYWxzZTsgICAgICAvKiB0cnVlIGlmIGRpY3Rpb25hcnkgcHJvdmlkZWQgKi9cbiAgdGhpcy5mbGFncyA9IDA7ICAgICAgICAgICAgIC8qIGd6aXAgaGVhZGVyIG1ldGhvZCBhbmQgZmxhZ3MgKDAgaWYgemxpYikgKi9cbiAgdGhpcy5kbWF4ID0gMDsgICAgICAgICAgICAgIC8qIHpsaWIgaGVhZGVyIG1heCBkaXN0YW5jZSAoSU5GTEFURV9TVFJJQ1QpICovXG4gIHRoaXMuY2hlY2sgPSAwOyAgICAgICAgICAgICAvKiBwcm90ZWN0ZWQgY29weSBvZiBjaGVjayB2YWx1ZSAqL1xuICB0aGlzLnRvdGFsID0gMDsgICAgICAgICAgICAgLyogcHJvdGVjdGVkIGNvcHkgb2Ygb3V0cHV0IGNvdW50ICovXG4gIC8vIFRPRE86IG1heSBiZSB7fVxuICB0aGlzLmhlYWQgPSBudWxsOyAgICAgICAgICAgLyogd2hlcmUgdG8gc2F2ZSBnemlwIGhlYWRlciBpbmZvcm1hdGlvbiAqL1xuXG4gIC8qIHNsaWRpbmcgd2luZG93ICovXG4gIHRoaXMud2JpdHMgPSAwOyAgICAgICAgICAgICAvKiBsb2cgYmFzZSAyIG9mIHJlcXVlc3RlZCB3aW5kb3cgc2l6ZSAqL1xuICB0aGlzLndzaXplID0gMDsgICAgICAgICAgICAgLyogd2luZG93IHNpemUgb3IgemVybyBpZiBub3QgdXNpbmcgd2luZG93ICovXG4gIHRoaXMud2hhdmUgPSAwOyAgICAgICAgICAgICAvKiB2YWxpZCBieXRlcyBpbiB0aGUgd2luZG93ICovXG4gIHRoaXMud25leHQgPSAwOyAgICAgICAgICAgICAvKiB3aW5kb3cgd3JpdGUgaW5kZXggKi9cbiAgdGhpcy53aW5kb3cgPSBudWxsOyAgICAgICAgIC8qIGFsbG9jYXRlZCBzbGlkaW5nIHdpbmRvdywgaWYgbmVlZGVkICovXG5cbiAgLyogYml0IGFjY3VtdWxhdG9yICovXG4gIHRoaXMuaG9sZCA9IDA7ICAgICAgICAgICAgICAvKiBpbnB1dCBiaXQgYWNjdW11bGF0b3IgKi9cbiAgdGhpcy5iaXRzID0gMDsgICAgICAgICAgICAgIC8qIG51bWJlciBvZiBiaXRzIGluIFwiaW5cIiAqL1xuXG4gIC8qIGZvciBzdHJpbmcgYW5kIHN0b3JlZCBibG9jayBjb3B5aW5nICovXG4gIHRoaXMubGVuZ3RoID0gMDsgICAgICAgICAgICAvKiBsaXRlcmFsIG9yIGxlbmd0aCBvZiBkYXRhIHRvIGNvcHkgKi9cbiAgdGhpcy5vZmZzZXQgPSAwOyAgICAgICAgICAgIC8qIGRpc3RhbmNlIGJhY2sgdG8gY29weSBzdHJpbmcgZnJvbSAqL1xuXG4gIC8qIGZvciB0YWJsZSBhbmQgY29kZSBkZWNvZGluZyAqL1xuICB0aGlzLmV4dHJhID0gMDsgICAgICAgICAgICAgLyogZXh0cmEgYml0cyBuZWVkZWQgKi9cblxuICAvKiBmaXhlZCBhbmQgZHluYW1pYyBjb2RlIHRhYmxlcyAqL1xuICB0aGlzLmxlbmNvZGUgPSBudWxsOyAgICAgICAgICAvKiBzdGFydGluZyB0YWJsZSBmb3IgbGVuZ3RoL2xpdGVyYWwgY29kZXMgKi9cbiAgdGhpcy5kaXN0Y29kZSA9IG51bGw7ICAgICAgICAgLyogc3RhcnRpbmcgdGFibGUgZm9yIGRpc3RhbmNlIGNvZGVzICovXG4gIHRoaXMubGVuYml0cyA9IDA7ICAgICAgICAgICAvKiBpbmRleCBiaXRzIGZvciBsZW5jb2RlICovXG4gIHRoaXMuZGlzdGJpdHMgPSAwOyAgICAgICAgICAvKiBpbmRleCBiaXRzIGZvciBkaXN0Y29kZSAqL1xuXG4gIC8qIGR5bmFtaWMgdGFibGUgYnVpbGRpbmcgKi9cbiAgdGhpcy5uY29kZSA9IDA7ICAgICAgICAgICAgIC8qIG51bWJlciBvZiBjb2RlIGxlbmd0aCBjb2RlIGxlbmd0aHMgKi9cbiAgdGhpcy5ubGVuID0gMDsgICAgICAgICAgICAgIC8qIG51bWJlciBvZiBsZW5ndGggY29kZSBsZW5ndGhzICovXG4gIHRoaXMubmRpc3QgPSAwOyAgICAgICAgICAgICAvKiBudW1iZXIgb2YgZGlzdGFuY2UgY29kZSBsZW5ndGhzICovXG4gIHRoaXMuaGF2ZSA9IDA7ICAgICAgICAgICAgICAvKiBudW1iZXIgb2YgY29kZSBsZW5ndGhzIGluIGxlbnNbXSAqL1xuICB0aGlzLm5leHQgPSBudWxsOyAgICAgICAgICAgICAgLyogbmV4dCBhdmFpbGFibGUgc3BhY2UgaW4gY29kZXNbXSAqL1xuXG4gIHRoaXMubGVucyA9IG5ldyB1dGlscy5CdWYxNigzMjApOyAvKiB0ZW1wb3Jhcnkgc3RvcmFnZSBmb3IgY29kZSBsZW5ndGhzICovXG4gIHRoaXMud29yayA9IG5ldyB1dGlscy5CdWYxNigyODgpOyAvKiB3b3JrIGFyZWEgZm9yIGNvZGUgdGFibGUgYnVpbGRpbmcgKi9cblxuICAvKlxuICAgYmVjYXVzZSB3ZSBkb24ndCBoYXZlIHBvaW50ZXJzIGluIGpzLCB3ZSB1c2UgbGVuY29kZSBhbmQgZGlzdGNvZGUgZGlyZWN0bHlcbiAgIGFzIGJ1ZmZlcnMgc28gd2UgZG9uJ3QgbmVlZCBjb2Rlc1xuICAqL1xuICAvL3RoaXMuY29kZXMgPSBuZXcgdXRpbHMuQnVmMzIoRU5PVUdIKTsgICAgICAgLyogc3BhY2UgZm9yIGNvZGUgdGFibGVzICovXG4gIHRoaXMubGVuZHluID0gbnVsbDsgICAgICAgICAgICAgIC8qIGR5bmFtaWMgdGFibGUgZm9yIGxlbmd0aC9saXRlcmFsIGNvZGVzIChKUyBzcGVjaWZpYykgKi9cbiAgdGhpcy5kaXN0ZHluID0gbnVsbDsgICAgICAgICAgICAgLyogZHluYW1pYyB0YWJsZSBmb3IgZGlzdGFuY2UgY29kZXMgKEpTIHNwZWNpZmljKSAqL1xuICB0aGlzLnNhbmUgPSAwOyAgICAgICAgICAgICAgICAgICAvKiBpZiBmYWxzZSwgYWxsb3cgaW52YWxpZCBkaXN0YW5jZSB0b28gZmFyICovXG4gIHRoaXMuYmFjayA9IDA7ICAgICAgICAgICAgICAgICAgIC8qIGJpdHMgYmFjayBvZiBsYXN0IHVucHJvY2Vzc2VkIGxlbmd0aC9saXQgKi9cbiAgdGhpcy53YXMgPSAwOyAgICAgICAgICAgICAgICAgICAgLyogaW5pdGlhbCBsZW5ndGggb2YgbWF0Y2ggKi9cbn1cblxuZnVuY3Rpb24gaW5mbGF0ZVJlc2V0S2VlcChzdHJtKSB7XG4gIHZhciBzdGF0ZTtcblxuICBpZiAoIXN0cm0gfHwgIXN0cm0uc3RhdGUpIHsgcmV0dXJuIFpfU1RSRUFNX0VSUk9SOyB9XG4gIHN0YXRlID0gc3RybS5zdGF0ZTtcbiAgc3RybS50b3RhbF9pbiA9IHN0cm0udG90YWxfb3V0ID0gc3RhdGUudG90YWwgPSAwO1xuICBzdHJtLm1zZyA9ICcnOyAvKlpfTlVMTCovXG4gIGlmIChzdGF0ZS53cmFwKSB7ICAgICAgIC8qIHRvIHN1cHBvcnQgaWxsLWNvbmNlaXZlZCBKYXZhIHRlc3Qgc3VpdGUgKi9cbiAgICBzdHJtLmFkbGVyID0gc3RhdGUud3JhcCAmIDE7XG4gIH1cbiAgc3RhdGUubW9kZSA9IEhFQUQ7XG4gIHN0YXRlLmxhc3QgPSAwO1xuICBzdGF0ZS5oYXZlZGljdCA9IDA7XG4gIHN0YXRlLmRtYXggPSAzMjc2ODtcbiAgc3RhdGUuaGVhZCA9IG51bGwvKlpfTlVMTCovO1xuICBzdGF0ZS5ob2xkID0gMDtcbiAgc3RhdGUuYml0cyA9IDA7XG4gIC8vc3RhdGUubGVuY29kZSA9IHN0YXRlLmRpc3Rjb2RlID0gc3RhdGUubmV4dCA9IHN0YXRlLmNvZGVzO1xuICBzdGF0ZS5sZW5jb2RlID0gc3RhdGUubGVuZHluID0gbmV3IHV0aWxzLkJ1ZjMyKEVOT1VHSF9MRU5TKTtcbiAgc3RhdGUuZGlzdGNvZGUgPSBzdGF0ZS5kaXN0ZHluID0gbmV3IHV0aWxzLkJ1ZjMyKEVOT1VHSF9ESVNUUyk7XG5cbiAgc3RhdGUuc2FuZSA9IDE7XG4gIHN0YXRlLmJhY2sgPSAtMTtcbiAgLy9UcmFjZXYoKHN0ZGVyciwgXCJpbmZsYXRlOiByZXNldFxcblwiKSk7XG4gIHJldHVybiBaX09LO1xufVxuXG5mdW5jdGlvbiBpbmZsYXRlUmVzZXQoc3RybSkge1xuICB2YXIgc3RhdGU7XG5cbiAgaWYgKCFzdHJtIHx8ICFzdHJtLnN0YXRlKSB7IHJldHVybiBaX1NUUkVBTV9FUlJPUjsgfVxuICBzdGF0ZSA9IHN0cm0uc3RhdGU7XG4gIHN0YXRlLndzaXplID0gMDtcbiAgc3RhdGUud2hhdmUgPSAwO1xuICBzdGF0ZS53bmV4dCA9IDA7XG4gIHJldHVybiBpbmZsYXRlUmVzZXRLZWVwKHN0cm0pO1xuXG59XG5cbmZ1bmN0aW9uIGluZmxhdGVSZXNldDIoc3RybSwgd2luZG93Qml0cykge1xuICB2YXIgd3JhcDtcbiAgdmFyIHN0YXRlO1xuXG4gIC8qIGdldCB0aGUgc3RhdGUgKi9cbiAgaWYgKCFzdHJtIHx8ICFzdHJtLnN0YXRlKSB7IHJldHVybiBaX1NUUkVBTV9FUlJPUjsgfVxuICBzdGF0ZSA9IHN0cm0uc3RhdGU7XG5cbiAgLyogZXh0cmFjdCB3cmFwIHJlcXVlc3QgZnJvbSB3aW5kb3dCaXRzIHBhcmFtZXRlciAqL1xuICBpZiAod2luZG93Qml0cyA8IDApIHtcbiAgICB3cmFwID0gMDtcbiAgICB3aW5kb3dCaXRzID0gLXdpbmRvd0JpdHM7XG4gIH1cbiAgZWxzZSB7XG4gICAgd3JhcCA9ICh3aW5kb3dCaXRzID4+IDQpICsgMTtcbiAgICBpZiAod2luZG93Qml0cyA8IDQ4KSB7XG4gICAgICB3aW5kb3dCaXRzICY9IDE1O1xuICAgIH1cbiAgfVxuXG4gIC8qIHNldCBudW1iZXIgb2Ygd2luZG93IGJpdHMsIGZyZWUgd2luZG93IGlmIGRpZmZlcmVudCAqL1xuICBpZiAod2luZG93Qml0cyAmJiAod2luZG93Qml0cyA8IDggfHwgd2luZG93Qml0cyA+IDE1KSkge1xuICAgIHJldHVybiBaX1NUUkVBTV9FUlJPUjtcbiAgfVxuICBpZiAoc3RhdGUud2luZG93ICE9PSBudWxsICYmIHN0YXRlLndiaXRzICE9PSB3aW5kb3dCaXRzKSB7XG4gICAgc3RhdGUud2luZG93ID0gbnVsbDtcbiAgfVxuXG4gIC8qIHVwZGF0ZSBzdGF0ZSBhbmQgcmVzZXQgdGhlIHJlc3Qgb2YgaXQgKi9cbiAgc3RhdGUud3JhcCA9IHdyYXA7XG4gIHN0YXRlLndiaXRzID0gd2luZG93Qml0cztcbiAgcmV0dXJuIGluZmxhdGVSZXNldChzdHJtKTtcbn1cblxuZnVuY3Rpb24gaW5mbGF0ZUluaXQyKHN0cm0sIHdpbmRvd0JpdHMpIHtcbiAgdmFyIHJldDtcbiAgdmFyIHN0YXRlO1xuXG4gIGlmICghc3RybSkgeyByZXR1cm4gWl9TVFJFQU1fRVJST1I7IH1cbiAgLy9zdHJtLm1zZyA9IFpfTlVMTDsgICAgICAgICAgICAgICAgIC8qIGluIGNhc2Ugd2UgcmV0dXJuIGFuIGVycm9yICovXG5cbiAgc3RhdGUgPSBuZXcgSW5mbGF0ZVN0YXRlKCk7XG5cbiAgLy9pZiAoc3RhdGUgPT09IFpfTlVMTCkgcmV0dXJuIFpfTUVNX0VSUk9SO1xuICAvL1RyYWNldigoc3RkZXJyLCBcImluZmxhdGU6IGFsbG9jYXRlZFxcblwiKSk7XG4gIHN0cm0uc3RhdGUgPSBzdGF0ZTtcbiAgc3RhdGUud2luZG93ID0gbnVsbC8qWl9OVUxMKi87XG4gIHJldCA9IGluZmxhdGVSZXNldDIoc3RybSwgd2luZG93Qml0cyk7XG4gIGlmIChyZXQgIT09IFpfT0spIHtcbiAgICBzdHJtLnN0YXRlID0gbnVsbC8qWl9OVUxMKi87XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gaW5mbGF0ZUluaXQoc3RybSkge1xuICByZXR1cm4gaW5mbGF0ZUluaXQyKHN0cm0sIERFRl9XQklUUyk7XG59XG5cblxuLypcbiBSZXR1cm4gc3RhdGUgd2l0aCBsZW5ndGggYW5kIGRpc3RhbmNlIGRlY29kaW5nIHRhYmxlcyBhbmQgaW5kZXggc2l6ZXMgc2V0IHRvXG4gZml4ZWQgY29kZSBkZWNvZGluZy4gIE5vcm1hbGx5IHRoaXMgcmV0dXJucyBmaXhlZCB0YWJsZXMgZnJvbSBpbmZmaXhlZC5oLlxuIElmIEJVSUxERklYRUQgaXMgZGVmaW5lZCwgdGhlbiBpbnN0ZWFkIHRoaXMgcm91dGluZSBidWlsZHMgdGhlIHRhYmxlcyB0aGVcbiBmaXJzdCB0aW1lIGl0J3MgY2FsbGVkLCBhbmQgcmV0dXJucyB0aG9zZSB0YWJsZXMgdGhlIGZpcnN0IHRpbWUgYW5kXG4gdGhlcmVhZnRlci4gIFRoaXMgcmVkdWNlcyB0aGUgc2l6ZSBvZiB0aGUgY29kZSBieSBhYm91dCAySyBieXRlcywgaW5cbiBleGNoYW5nZSBmb3IgYSBsaXR0bGUgZXhlY3V0aW9uIHRpbWUuICBIb3dldmVyLCBCVUlMREZJWEVEIHNob3VsZCBub3QgYmVcbiB1c2VkIGZvciB0aHJlYWRlZCBhcHBsaWNhdGlvbnMsIHNpbmNlIHRoZSByZXdyaXRpbmcgb2YgdGhlIHRhYmxlcyBhbmQgdmlyZ2luXG4gbWF5IG5vdCBiZSB0aHJlYWQtc2FmZS5cbiAqL1xudmFyIHZpcmdpbiA9IHRydWU7XG5cbnZhciBsZW5maXgsIGRpc3RmaXg7IC8vIFdlIGhhdmUgbm8gcG9pbnRlcnMgaW4gSlMsIHNvIGtlZXAgdGFibGVzIHNlcGFyYXRlXG5cbmZ1bmN0aW9uIGZpeGVkdGFibGVzKHN0YXRlKSB7XG4gIC8qIGJ1aWxkIGZpeGVkIGh1ZmZtYW4gdGFibGVzIGlmIGZpcnN0IGNhbGwgKG1heSBub3QgYmUgdGhyZWFkIHNhZmUpICovXG4gIGlmICh2aXJnaW4pIHtcbiAgICB2YXIgc3ltO1xuXG4gICAgbGVuZml4ID0gbmV3IHV0aWxzLkJ1ZjMyKDUxMik7XG4gICAgZGlzdGZpeCA9IG5ldyB1dGlscy5CdWYzMigzMik7XG5cbiAgICAvKiBsaXRlcmFsL2xlbmd0aCB0YWJsZSAqL1xuICAgIHN5bSA9IDA7XG4gICAgd2hpbGUgKHN5bSA8IDE0NCkgeyBzdGF0ZS5sZW5zW3N5bSsrXSA9IDg7IH1cbiAgICB3aGlsZSAoc3ltIDwgMjU2KSB7IHN0YXRlLmxlbnNbc3ltKytdID0gOTsgfVxuICAgIHdoaWxlIChzeW0gPCAyODApIHsgc3RhdGUubGVuc1tzeW0rK10gPSA3OyB9XG4gICAgd2hpbGUgKHN5bSA8IDI4OCkgeyBzdGF0ZS5sZW5zW3N5bSsrXSA9IDg7IH1cblxuICAgIGluZmxhdGVfdGFibGUoTEVOUywgIHN0YXRlLmxlbnMsIDAsIDI4OCwgbGVuZml4LCAgIDAsIHN0YXRlLndvcmssIHsgYml0czogOSB9KTtcblxuICAgIC8qIGRpc3RhbmNlIHRhYmxlICovXG4gICAgc3ltID0gMDtcbiAgICB3aGlsZSAoc3ltIDwgMzIpIHsgc3RhdGUubGVuc1tzeW0rK10gPSA1OyB9XG5cbiAgICBpbmZsYXRlX3RhYmxlKERJU1RTLCBzdGF0ZS5sZW5zLCAwLCAzMiwgICBkaXN0Zml4LCAwLCBzdGF0ZS53b3JrLCB7IGJpdHM6IDUgfSk7XG5cbiAgICAvKiBkbyB0aGlzIGp1c3Qgb25jZSAqL1xuICAgIHZpcmdpbiA9IGZhbHNlO1xuICB9XG5cbiAgc3RhdGUubGVuY29kZSA9IGxlbmZpeDtcbiAgc3RhdGUubGVuYml0cyA9IDk7XG4gIHN0YXRlLmRpc3Rjb2RlID0gZGlzdGZpeDtcbiAgc3RhdGUuZGlzdGJpdHMgPSA1O1xufVxuXG5cbi8qXG4gVXBkYXRlIHRoZSB3aW5kb3cgd2l0aCB0aGUgbGFzdCB3c2l6ZSAobm9ybWFsbHkgMzJLKSBieXRlcyB3cml0dGVuIGJlZm9yZVxuIHJldHVybmluZy4gIElmIHdpbmRvdyBkb2VzIG5vdCBleGlzdCB5ZXQsIGNyZWF0ZSBpdC4gIFRoaXMgaXMgb25seSBjYWxsZWRcbiB3aGVuIGEgd2luZG93IGlzIGFscmVhZHkgaW4gdXNlLCBvciB3aGVuIG91dHB1dCBoYXMgYmVlbiB3cml0dGVuIGR1cmluZyB0aGlzXG4gaW5mbGF0ZSBjYWxsLCBidXQgdGhlIGVuZCBvZiB0aGUgZGVmbGF0ZSBzdHJlYW0gaGFzIG5vdCBiZWVuIHJlYWNoZWQgeWV0LlxuIEl0IGlzIGFsc28gY2FsbGVkIHRvIGNyZWF0ZSBhIHdpbmRvdyBmb3IgZGljdGlvbmFyeSBkYXRhIHdoZW4gYSBkaWN0aW9uYXJ5XG4gaXMgbG9hZGVkLlxuXG4gUHJvdmlkaW5nIG91dHB1dCBidWZmZXJzIGxhcmdlciB0aGFuIDMySyB0byBpbmZsYXRlKCkgc2hvdWxkIHByb3ZpZGUgYSBzcGVlZFxuIGFkdmFudGFnZSwgc2luY2Ugb25seSB0aGUgbGFzdCAzMksgb2Ygb3V0cHV0IGlzIGNvcGllZCB0byB0aGUgc2xpZGluZyB3aW5kb3dcbiB1cG9uIHJldHVybiBmcm9tIGluZmxhdGUoKSwgYW5kIHNpbmNlIGFsbCBkaXN0YW5jZXMgYWZ0ZXIgdGhlIGZpcnN0IDMySyBvZlxuIG91dHB1dCB3aWxsIGZhbGwgaW4gdGhlIG91dHB1dCBkYXRhLCBtYWtpbmcgbWF0Y2ggY29waWVzIHNpbXBsZXIgYW5kIGZhc3Rlci5cbiBUaGUgYWR2YW50YWdlIG1heSBiZSBkZXBlbmRlbnQgb24gdGhlIHNpemUgb2YgdGhlIHByb2Nlc3NvcidzIGRhdGEgY2FjaGVzLlxuICovXG5mdW5jdGlvbiB1cGRhdGV3aW5kb3coc3RybSwgc3JjLCBlbmQsIGNvcHkpIHtcbiAgdmFyIGRpc3Q7XG4gIHZhciBzdGF0ZSA9IHN0cm0uc3RhdGU7XG5cbiAgLyogaWYgaXQgaGFzbid0IGJlZW4gZG9uZSBhbHJlYWR5LCBhbGxvY2F0ZSBzcGFjZSBmb3IgdGhlIHdpbmRvdyAqL1xuICBpZiAoc3RhdGUud2luZG93ID09PSBudWxsKSB7XG4gICAgc3RhdGUud3NpemUgPSAxIDw8IHN0YXRlLndiaXRzO1xuICAgIHN0YXRlLnduZXh0ID0gMDtcbiAgICBzdGF0ZS53aGF2ZSA9IDA7XG5cbiAgICBzdGF0ZS53aW5kb3cgPSBuZXcgdXRpbHMuQnVmOChzdGF0ZS53c2l6ZSk7XG4gIH1cblxuICAvKiBjb3B5IHN0YXRlLT53c2l6ZSBvciBsZXNzIG91dHB1dCBieXRlcyBpbnRvIHRoZSBjaXJjdWxhciB3aW5kb3cgKi9cbiAgaWYgKGNvcHkgPj0gc3RhdGUud3NpemUpIHtcbiAgICB1dGlscy5hcnJheVNldChzdGF0ZS53aW5kb3csIHNyYywgZW5kIC0gc3RhdGUud3NpemUsIHN0YXRlLndzaXplLCAwKTtcbiAgICBzdGF0ZS53bmV4dCA9IDA7XG4gICAgc3RhdGUud2hhdmUgPSBzdGF0ZS53c2l6ZTtcbiAgfVxuICBlbHNlIHtcbiAgICBkaXN0ID0gc3RhdGUud3NpemUgLSBzdGF0ZS53bmV4dDtcbiAgICBpZiAoZGlzdCA+IGNvcHkpIHtcbiAgICAgIGRpc3QgPSBjb3B5O1xuICAgIH1cbiAgICAvL3ptZW1jcHkoc3RhdGUtPndpbmRvdyArIHN0YXRlLT53bmV4dCwgZW5kIC0gY29weSwgZGlzdCk7XG4gICAgdXRpbHMuYXJyYXlTZXQoc3RhdGUud2luZG93LCBzcmMsIGVuZCAtIGNvcHksIGRpc3QsIHN0YXRlLnduZXh0KTtcbiAgICBjb3B5IC09IGRpc3Q7XG4gICAgaWYgKGNvcHkpIHtcbiAgICAgIC8vem1lbWNweShzdGF0ZS0+d2luZG93LCBlbmQgLSBjb3B5LCBjb3B5KTtcbiAgICAgIHV0aWxzLmFycmF5U2V0KHN0YXRlLndpbmRvdywgc3JjLCBlbmQgLSBjb3B5LCBjb3B5LCAwKTtcbiAgICAgIHN0YXRlLnduZXh0ID0gY29weTtcbiAgICAgIHN0YXRlLndoYXZlID0gc3RhdGUud3NpemU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgc3RhdGUud25leHQgKz0gZGlzdDtcbiAgICAgIGlmIChzdGF0ZS53bmV4dCA9PT0gc3RhdGUud3NpemUpIHsgc3RhdGUud25leHQgPSAwOyB9XG4gICAgICBpZiAoc3RhdGUud2hhdmUgPCBzdGF0ZS53c2l6ZSkgeyBzdGF0ZS53aGF2ZSArPSBkaXN0OyB9XG4gICAgfVxuICB9XG4gIHJldHVybiAwO1xufVxuXG5mdW5jdGlvbiBpbmZsYXRlKHN0cm0sIGZsdXNoKSB7XG4gIHZhciBzdGF0ZTtcbiAgdmFyIGlucHV0LCBvdXRwdXQ7ICAgICAgICAgIC8vIGlucHV0L291dHB1dCBidWZmZXJzXG4gIHZhciBuZXh0OyAgICAgICAgICAgICAgICAgICAvKiBuZXh0IGlucHV0IElOREVYICovXG4gIHZhciBwdXQ7ICAgICAgICAgICAgICAgICAgICAvKiBuZXh0IG91dHB1dCBJTkRFWCAqL1xuICB2YXIgaGF2ZSwgbGVmdDsgICAgICAgICAgICAgLyogYXZhaWxhYmxlIGlucHV0IGFuZCBvdXRwdXQgKi9cbiAgdmFyIGhvbGQ7ICAgICAgICAgICAgICAgICAgIC8qIGJpdCBidWZmZXIgKi9cbiAgdmFyIGJpdHM7ICAgICAgICAgICAgICAgICAgIC8qIGJpdHMgaW4gYml0IGJ1ZmZlciAqL1xuICB2YXIgX2luLCBfb3V0OyAgICAgICAgICAgICAgLyogc2F2ZSBzdGFydGluZyBhdmFpbGFibGUgaW5wdXQgYW5kIG91dHB1dCAqL1xuICB2YXIgY29weTsgICAgICAgICAgICAgICAgICAgLyogbnVtYmVyIG9mIHN0b3JlZCBvciBtYXRjaCBieXRlcyB0byBjb3B5ICovXG4gIHZhciBmcm9tOyAgICAgICAgICAgICAgICAgICAvKiB3aGVyZSB0byBjb3B5IG1hdGNoIGJ5dGVzIGZyb20gKi9cbiAgdmFyIGZyb21fc291cmNlO1xuICB2YXIgaGVyZSA9IDA7ICAgICAgICAgICAgICAgLyogY3VycmVudCBkZWNvZGluZyB0YWJsZSBlbnRyeSAqL1xuICB2YXIgaGVyZV9iaXRzLCBoZXJlX29wLCBoZXJlX3ZhbDsgLy8gcGFrZWQgXCJoZXJlXCIgZGVub3JtYWxpemVkIChKUyBzcGVjaWZpYylcbiAgLy92YXIgbGFzdDsgICAgICAgICAgICAgICAgICAgLyogcGFyZW50IHRhYmxlIGVudHJ5ICovXG4gIHZhciBsYXN0X2JpdHMsIGxhc3Rfb3AsIGxhc3RfdmFsOyAvLyBwYWtlZCBcImxhc3RcIiBkZW5vcm1hbGl6ZWQgKEpTIHNwZWNpZmljKVxuICB2YXIgbGVuOyAgICAgICAgICAgICAgICAgICAgLyogbGVuZ3RoIHRvIGNvcHkgZm9yIHJlcGVhdHMsIGJpdHMgdG8gZHJvcCAqL1xuICB2YXIgcmV0OyAgICAgICAgICAgICAgICAgICAgLyogcmV0dXJuIGNvZGUgKi9cbiAgdmFyIGhidWYgPSBuZXcgdXRpbHMuQnVmOCg0KTsgICAgLyogYnVmZmVyIGZvciBnemlwIGhlYWRlciBjcmMgY2FsY3VsYXRpb24gKi9cbiAgdmFyIG9wdHM7XG5cbiAgdmFyIG47IC8vIHRlbXBvcmFyeSB2YXIgZm9yIE5FRURfQklUU1xuXG4gIHZhciBvcmRlciA9IC8qIHBlcm11dGF0aW9uIG9mIGNvZGUgbGVuZ3RocyAqL1xuICAgIFsgMTYsIDE3LCAxOCwgMCwgOCwgNywgOSwgNiwgMTAsIDUsIDExLCA0LCAxMiwgMywgMTMsIDIsIDE0LCAxLCAxNSBdO1xuXG5cbiAgaWYgKCFzdHJtIHx8ICFzdHJtLnN0YXRlIHx8ICFzdHJtLm91dHB1dCB8fFxuICAgICAgKCFzdHJtLmlucHV0ICYmIHN0cm0uYXZhaWxfaW4gIT09IDApKSB7XG4gICAgcmV0dXJuIFpfU1RSRUFNX0VSUk9SO1xuICB9XG5cbiAgc3RhdGUgPSBzdHJtLnN0YXRlO1xuICBpZiAoc3RhdGUubW9kZSA9PT0gVFlQRSkgeyBzdGF0ZS5tb2RlID0gVFlQRURPOyB9ICAgIC8qIHNraXAgY2hlY2sgKi9cblxuXG4gIC8vLS0tIExPQUQoKSAtLS1cbiAgcHV0ID0gc3RybS5uZXh0X291dDtcbiAgb3V0cHV0ID0gc3RybS5vdXRwdXQ7XG4gIGxlZnQgPSBzdHJtLmF2YWlsX291dDtcbiAgbmV4dCA9IHN0cm0ubmV4dF9pbjtcbiAgaW5wdXQgPSBzdHJtLmlucHV0O1xuICBoYXZlID0gc3RybS5hdmFpbF9pbjtcbiAgaG9sZCA9IHN0YXRlLmhvbGQ7XG4gIGJpdHMgPSBzdGF0ZS5iaXRzO1xuICAvLy0tLVxuXG4gIF9pbiA9IGhhdmU7XG4gIF9vdXQgPSBsZWZ0O1xuICByZXQgPSBaX09LO1xuXG4gIGluZl9sZWF2ZTogLy8gZ290byBlbXVsYXRpb25cbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoc3RhdGUubW9kZSkge1xuICAgICAgY2FzZSBIRUFEOlxuICAgICAgICBpZiAoc3RhdGUud3JhcCA9PT0gMCkge1xuICAgICAgICAgIHN0YXRlLm1vZGUgPSBUWVBFRE87XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy89PT0gTkVFREJJVFMoMTYpO1xuICAgICAgICB3aGlsZSAoYml0cyA8IDE2KSB7XG4gICAgICAgICAgaWYgKGhhdmUgPT09IDApIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgICAgaGF2ZS0tO1xuICAgICAgICAgIGhvbGQgKz0gaW5wdXRbbmV4dCsrXSA8PCBiaXRzO1xuICAgICAgICAgIGJpdHMgKz0gODtcbiAgICAgICAgfVxuICAgICAgICAvLz09PS8vXG4gICAgICAgIGlmICgoc3RhdGUud3JhcCAmIDIpICYmIGhvbGQgPT09IDB4OGIxZikgeyAgLyogZ3ppcCBoZWFkZXIgKi9cbiAgICAgICAgICBzdGF0ZS5jaGVjayA9IDAvKmNyYzMyKDBMLCBaX05VTEwsIDApKi87XG4gICAgICAgICAgLy89PT0gQ1JDMihzdGF0ZS5jaGVjaywgaG9sZCk7XG4gICAgICAgICAgaGJ1ZlswXSA9IGhvbGQgJiAweGZmO1xuICAgICAgICAgIGhidWZbMV0gPSAoaG9sZCA+Pj4gOCkgJiAweGZmO1xuICAgICAgICAgIHN0YXRlLmNoZWNrID0gY3JjMzIoc3RhdGUuY2hlY2ssIGhidWYsIDIsIDApO1xuICAgICAgICAgIC8vPT09Ly9cblxuICAgICAgICAgIC8vPT09IElOSVRCSVRTKCk7XG4gICAgICAgICAgaG9sZCA9IDA7XG4gICAgICAgICAgYml0cyA9IDA7XG4gICAgICAgICAgLy89PT0vL1xuICAgICAgICAgIHN0YXRlLm1vZGUgPSBGTEFHUztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZS5mbGFncyA9IDA7ICAgICAgICAgICAvKiBleHBlY3QgemxpYiBoZWFkZXIgKi9cbiAgICAgICAgaWYgKHN0YXRlLmhlYWQpIHtcbiAgICAgICAgICBzdGF0ZS5oZWFkLmRvbmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIShzdGF0ZS53cmFwICYgMSkgfHwgICAvKiBjaGVjayBpZiB6bGliIGhlYWRlciBhbGxvd2VkICovXG4gICAgICAgICAgKCgoaG9sZCAmIDB4ZmYpLypCSVRTKDgpKi8gPDwgOCkgKyAoaG9sZCA+PiA4KSkgJSAzMSkge1xuICAgICAgICAgIHN0cm0ubXNnID0gJ2luY29ycmVjdCBoZWFkZXIgY2hlY2snO1xuICAgICAgICAgIHN0YXRlLm1vZGUgPSBCQUQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChob2xkICYgMHgwZikvKkJJVFMoNCkqLyAhPT0gWl9ERUZMQVRFRCkge1xuICAgICAgICAgIHN0cm0ubXNnID0gJ3Vua25vd24gY29tcHJlc3Npb24gbWV0aG9kJztcbiAgICAgICAgICBzdGF0ZS5tb2RlID0gQkFEO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8vLS0tIERST1BCSVRTKDQpIC0tLS8vXG4gICAgICAgIGhvbGQgPj4+PSA0O1xuICAgICAgICBiaXRzIC09IDQ7XG4gICAgICAgIC8vLS0tLy9cbiAgICAgICAgbGVuID0gKGhvbGQgJiAweDBmKS8qQklUUyg0KSovICsgODtcbiAgICAgICAgaWYgKHN0YXRlLndiaXRzID09PSAwKSB7XG4gICAgICAgICAgc3RhdGUud2JpdHMgPSBsZW47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobGVuID4gc3RhdGUud2JpdHMpIHtcbiAgICAgICAgICBzdHJtLm1zZyA9ICdpbnZhbGlkIHdpbmRvdyBzaXplJztcbiAgICAgICAgICBzdGF0ZS5tb2RlID0gQkFEO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlLmRtYXggPSAxIDw8IGxlbjtcbiAgICAgICAgLy9UcmFjZXYoKHN0ZGVyciwgXCJpbmZsYXRlOiAgIHpsaWIgaGVhZGVyIG9rXFxuXCIpKTtcbiAgICAgICAgc3RybS5hZGxlciA9IHN0YXRlLmNoZWNrID0gMS8qYWRsZXIzMigwTCwgWl9OVUxMLCAwKSovO1xuICAgICAgICBzdGF0ZS5tb2RlID0gaG9sZCAmIDB4MjAwID8gRElDVElEIDogVFlQRTtcbiAgICAgICAgLy89PT0gSU5JVEJJVFMoKTtcbiAgICAgICAgaG9sZCA9IDA7XG4gICAgICAgIGJpdHMgPSAwO1xuICAgICAgICAvLz09PS8vXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBGTEFHUzpcbiAgICAgICAgLy89PT0gTkVFREJJVFMoMTYpOyAqL1xuICAgICAgICB3aGlsZSAoYml0cyA8IDE2KSB7XG4gICAgICAgICAgaWYgKGhhdmUgPT09IDApIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgICAgaGF2ZS0tO1xuICAgICAgICAgIGhvbGQgKz0gaW5wdXRbbmV4dCsrXSA8PCBiaXRzO1xuICAgICAgICAgIGJpdHMgKz0gODtcbiAgICAgICAgfVxuICAgICAgICAvLz09PS8vXG4gICAgICAgIHN0YXRlLmZsYWdzID0gaG9sZDtcbiAgICAgICAgaWYgKChzdGF0ZS5mbGFncyAmIDB4ZmYpICE9PSBaX0RFRkxBVEVEKSB7XG4gICAgICAgICAgc3RybS5tc2cgPSAndW5rbm93biBjb21wcmVzc2lvbiBtZXRob2QnO1xuICAgICAgICAgIHN0YXRlLm1vZGUgPSBCQUQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXRlLmZsYWdzICYgMHhlMDAwKSB7XG4gICAgICAgICAgc3RybS5tc2cgPSAndW5rbm93biBoZWFkZXIgZmxhZ3Mgc2V0JztcbiAgICAgICAgICBzdGF0ZS5tb2RlID0gQkFEO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGF0ZS5oZWFkKSB7XG4gICAgICAgICAgc3RhdGUuaGVhZC50ZXh0ID0gKChob2xkID4+IDgpICYgMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXRlLmZsYWdzICYgMHgwMjAwKSB7XG4gICAgICAgICAgLy89PT0gQ1JDMihzdGF0ZS5jaGVjaywgaG9sZCk7XG4gICAgICAgICAgaGJ1ZlswXSA9IGhvbGQgJiAweGZmO1xuICAgICAgICAgIGhidWZbMV0gPSAoaG9sZCA+Pj4gOCkgJiAweGZmO1xuICAgICAgICAgIHN0YXRlLmNoZWNrID0gY3JjMzIoc3RhdGUuY2hlY2ssIGhidWYsIDIsIDApO1xuICAgICAgICAgIC8vPT09Ly9cbiAgICAgICAgfVxuICAgICAgICAvLz09PSBJTklUQklUUygpO1xuICAgICAgICBob2xkID0gMDtcbiAgICAgICAgYml0cyA9IDA7XG4gICAgICAgIC8vPT09Ly9cbiAgICAgICAgc3RhdGUubW9kZSA9IFRJTUU7XG4gICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgIGNhc2UgVElNRTpcbiAgICAgICAgLy89PT0gTkVFREJJVFMoMzIpOyAqL1xuICAgICAgICB3aGlsZSAoYml0cyA8IDMyKSB7XG4gICAgICAgICAgaWYgKGhhdmUgPT09IDApIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgICAgaGF2ZS0tO1xuICAgICAgICAgIGhvbGQgKz0gaW5wdXRbbmV4dCsrXSA8PCBiaXRzO1xuICAgICAgICAgIGJpdHMgKz0gODtcbiAgICAgICAgfVxuICAgICAgICAvLz09PS8vXG4gICAgICAgIGlmIChzdGF0ZS5oZWFkKSB7XG4gICAgICAgICAgc3RhdGUuaGVhZC50aW1lID0gaG9sZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhdGUuZmxhZ3MgJiAweDAyMDApIHtcbiAgICAgICAgICAvLz09PSBDUkM0KHN0YXRlLmNoZWNrLCBob2xkKVxuICAgICAgICAgIGhidWZbMF0gPSBob2xkICYgMHhmZjtcbiAgICAgICAgICBoYnVmWzFdID0gKGhvbGQgPj4+IDgpICYgMHhmZjtcbiAgICAgICAgICBoYnVmWzJdID0gKGhvbGQgPj4+IDE2KSAmIDB4ZmY7XG4gICAgICAgICAgaGJ1ZlszXSA9IChob2xkID4+PiAyNCkgJiAweGZmO1xuICAgICAgICAgIHN0YXRlLmNoZWNrID0gY3JjMzIoc3RhdGUuY2hlY2ssIGhidWYsIDQsIDApO1xuICAgICAgICAgIC8vPT09XG4gICAgICAgIH1cbiAgICAgICAgLy89PT0gSU5JVEJJVFMoKTtcbiAgICAgICAgaG9sZCA9IDA7XG4gICAgICAgIGJpdHMgPSAwO1xuICAgICAgICAvLz09PS8vXG4gICAgICAgIHN0YXRlLm1vZGUgPSBPUztcbiAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgY2FzZSBPUzpcbiAgICAgICAgLy89PT0gTkVFREJJVFMoMTYpOyAqL1xuICAgICAgICB3aGlsZSAoYml0cyA8IDE2KSB7XG4gICAgICAgICAgaWYgKGhhdmUgPT09IDApIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgICAgaGF2ZS0tO1xuICAgICAgICAgIGhvbGQgKz0gaW5wdXRbbmV4dCsrXSA8PCBiaXRzO1xuICAgICAgICAgIGJpdHMgKz0gODtcbiAgICAgICAgfVxuICAgICAgICAvLz09PS8vXG4gICAgICAgIGlmIChzdGF0ZS5oZWFkKSB7XG4gICAgICAgICAgc3RhdGUuaGVhZC54ZmxhZ3MgPSAoaG9sZCAmIDB4ZmYpO1xuICAgICAgICAgIHN0YXRlLmhlYWQub3MgPSAoaG9sZCA+PiA4KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhdGUuZmxhZ3MgJiAweDAyMDApIHtcbiAgICAgICAgICAvLz09PSBDUkMyKHN0YXRlLmNoZWNrLCBob2xkKTtcbiAgICAgICAgICBoYnVmWzBdID0gaG9sZCAmIDB4ZmY7XG4gICAgICAgICAgaGJ1ZlsxXSA9IChob2xkID4+PiA4KSAmIDB4ZmY7XG4gICAgICAgICAgc3RhdGUuY2hlY2sgPSBjcmMzMihzdGF0ZS5jaGVjaywgaGJ1ZiwgMiwgMCk7XG4gICAgICAgICAgLy89PT0vL1xuICAgICAgICB9XG4gICAgICAgIC8vPT09IElOSVRCSVRTKCk7XG4gICAgICAgIGhvbGQgPSAwO1xuICAgICAgICBiaXRzID0gMDtcbiAgICAgICAgLy89PT0vL1xuICAgICAgICBzdGF0ZS5tb2RlID0gRVhMRU47XG4gICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgIGNhc2UgRVhMRU46XG4gICAgICAgIGlmIChzdGF0ZS5mbGFncyAmIDB4MDQwMCkge1xuICAgICAgICAgIC8vPT09IE5FRURCSVRTKDE2KTsgKi9cbiAgICAgICAgICB3aGlsZSAoYml0cyA8IDE2KSB7XG4gICAgICAgICAgICBpZiAoaGF2ZSA9PT0gMCkgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgICAgIGhhdmUtLTtcbiAgICAgICAgICAgIGhvbGQgKz0gaW5wdXRbbmV4dCsrXSA8PCBiaXRzO1xuICAgICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLz09PS8vXG4gICAgICAgICAgc3RhdGUubGVuZ3RoID0gaG9sZDtcbiAgICAgICAgICBpZiAoc3RhdGUuaGVhZCkge1xuICAgICAgICAgICAgc3RhdGUuaGVhZC5leHRyYV9sZW4gPSBob2xkO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc3RhdGUuZmxhZ3MgJiAweDAyMDApIHtcbiAgICAgICAgICAgIC8vPT09IENSQzIoc3RhdGUuY2hlY2ssIGhvbGQpO1xuICAgICAgICAgICAgaGJ1ZlswXSA9IGhvbGQgJiAweGZmO1xuICAgICAgICAgICAgaGJ1ZlsxXSA9IChob2xkID4+PiA4KSAmIDB4ZmY7XG4gICAgICAgICAgICBzdGF0ZS5jaGVjayA9IGNyYzMyKHN0YXRlLmNoZWNrLCBoYnVmLCAyLCAwKTtcbiAgICAgICAgICAgIC8vPT09Ly9cbiAgICAgICAgICB9XG4gICAgICAgICAgLy89PT0gSU5JVEJJVFMoKTtcbiAgICAgICAgICBob2xkID0gMDtcbiAgICAgICAgICBiaXRzID0gMDtcbiAgICAgICAgICAvLz09PS8vXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc3RhdGUuaGVhZCkge1xuICAgICAgICAgIHN0YXRlLmhlYWQuZXh0cmEgPSBudWxsLypaX05VTEwqLztcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZS5tb2RlID0gRVhUUkE7XG4gICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgIGNhc2UgRVhUUkE6XG4gICAgICAgIGlmIChzdGF0ZS5mbGFncyAmIDB4MDQwMCkge1xuICAgICAgICAgIGNvcHkgPSBzdGF0ZS5sZW5ndGg7XG4gICAgICAgICAgaWYgKGNvcHkgPiBoYXZlKSB7IGNvcHkgPSBoYXZlOyB9XG4gICAgICAgICAgaWYgKGNvcHkpIHtcbiAgICAgICAgICAgIGlmIChzdGF0ZS5oZWFkKSB7XG4gICAgICAgICAgICAgIGxlbiA9IHN0YXRlLmhlYWQuZXh0cmFfbGVuIC0gc3RhdGUubGVuZ3RoO1xuICAgICAgICAgICAgICBpZiAoIXN0YXRlLmhlYWQuZXh0cmEpIHtcbiAgICAgICAgICAgICAgICAvLyBVc2UgdW50eXBlZCBhcnJheSBmb3IgbW9yZSBjb252ZW5pZW50IHByb2Nlc3NpbmcgbGF0ZXJcbiAgICAgICAgICAgICAgICBzdGF0ZS5oZWFkLmV4dHJhID0gbmV3IEFycmF5KHN0YXRlLmhlYWQuZXh0cmFfbGVuKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB1dGlscy5hcnJheVNldChcbiAgICAgICAgICAgICAgICBzdGF0ZS5oZWFkLmV4dHJhLFxuICAgICAgICAgICAgICAgIGlucHV0LFxuICAgICAgICAgICAgICAgIG5leHQsXG4gICAgICAgICAgICAgICAgLy8gZXh0cmEgZmllbGQgaXMgbGltaXRlZCB0byA2NTUzNiBieXRlc1xuICAgICAgICAgICAgICAgIC8vIC0gbm8gbmVlZCBmb3IgYWRkaXRpb25hbCBzaXplIGNoZWNrXG4gICAgICAgICAgICAgICAgY29weSxcbiAgICAgICAgICAgICAgICAvKmxlbiArIGNvcHkgPiBzdGF0ZS5oZWFkLmV4dHJhX21heCAtIGxlbiA/IHN0YXRlLmhlYWQuZXh0cmFfbWF4IDogY29weSwqL1xuICAgICAgICAgICAgICAgIGxlblxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAvL3ptZW1jcHkoc3RhdGUuaGVhZC5leHRyYSArIGxlbiwgbmV4dCxcbiAgICAgICAgICAgICAgLy8gICAgICAgIGxlbiArIGNvcHkgPiBzdGF0ZS5oZWFkLmV4dHJhX21heCA/XG4gICAgICAgICAgICAgIC8vICAgICAgICBzdGF0ZS5oZWFkLmV4dHJhX21heCAtIGxlbiA6IGNvcHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0YXRlLmZsYWdzICYgMHgwMjAwKSB7XG4gICAgICAgICAgICAgIHN0YXRlLmNoZWNrID0gY3JjMzIoc3RhdGUuY2hlY2ssIGlucHV0LCBjb3B5LCBuZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhhdmUgLT0gY29weTtcbiAgICAgICAgICAgIG5leHQgKz0gY29weTtcbiAgICAgICAgICAgIHN0YXRlLmxlbmd0aCAtPSBjb3B5O1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc3RhdGUubGVuZ3RoKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICB9XG4gICAgICAgIHN0YXRlLmxlbmd0aCA9IDA7XG4gICAgICAgIHN0YXRlLm1vZGUgPSBOQU1FO1xuICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICBjYXNlIE5BTUU6XG4gICAgICAgIGlmIChzdGF0ZS5mbGFncyAmIDB4MDgwMCkge1xuICAgICAgICAgIGlmIChoYXZlID09PSAwKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICAgIGNvcHkgPSAwO1xuICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgIC8vIFRPRE86IDIgb3IgMSBieXRlcz9cbiAgICAgICAgICAgIGxlbiA9IGlucHV0W25leHQgKyBjb3B5KytdO1xuICAgICAgICAgICAgLyogdXNlIGNvbnN0YW50IGxpbWl0IGJlY2F1c2UgaW4ganMgd2Ugc2hvdWxkIG5vdCBwcmVhbGxvY2F0ZSBtZW1vcnkgKi9cbiAgICAgICAgICAgIGlmIChzdGF0ZS5oZWFkICYmIGxlbiAmJlxuICAgICAgICAgICAgICAgIChzdGF0ZS5sZW5ndGggPCA2NTUzNiAvKnN0YXRlLmhlYWQubmFtZV9tYXgqLykpIHtcbiAgICAgICAgICAgICAgc3RhdGUuaGVhZC5uYW1lICs9IFN0cmluZy5mcm9tQ2hhckNvZGUobGVuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IHdoaWxlIChsZW4gJiYgY29weSA8IGhhdmUpO1xuXG4gICAgICAgICAgaWYgKHN0YXRlLmZsYWdzICYgMHgwMjAwKSB7XG4gICAgICAgICAgICBzdGF0ZS5jaGVjayA9IGNyYzMyKHN0YXRlLmNoZWNrLCBpbnB1dCwgY29weSwgbmV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGhhdmUgLT0gY29weTtcbiAgICAgICAgICBuZXh0ICs9IGNvcHk7XG4gICAgICAgICAgaWYgKGxlbikgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzdGF0ZS5oZWFkKSB7XG4gICAgICAgICAgc3RhdGUuaGVhZC5uYW1lID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZS5sZW5ndGggPSAwO1xuICAgICAgICBzdGF0ZS5tb2RlID0gQ09NTUVOVDtcbiAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgY2FzZSBDT01NRU5UOlxuICAgICAgICBpZiAoc3RhdGUuZmxhZ3MgJiAweDEwMDApIHtcbiAgICAgICAgICBpZiAoaGF2ZSA9PT0gMCkgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgICBjb3B5ID0gMDtcbiAgICAgICAgICBkbyB7XG4gICAgICAgICAgICBsZW4gPSBpbnB1dFtuZXh0ICsgY29weSsrXTtcbiAgICAgICAgICAgIC8qIHVzZSBjb25zdGFudCBsaW1pdCBiZWNhdXNlIGluIGpzIHdlIHNob3VsZCBub3QgcHJlYWxsb2NhdGUgbWVtb3J5ICovXG4gICAgICAgICAgICBpZiAoc3RhdGUuaGVhZCAmJiBsZW4gJiZcbiAgICAgICAgICAgICAgICAoc3RhdGUubGVuZ3RoIDwgNjU1MzYgLypzdGF0ZS5oZWFkLmNvbW1fbWF4Ki8pKSB7XG4gICAgICAgICAgICAgIHN0YXRlLmhlYWQuY29tbWVudCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGxlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSB3aGlsZSAobGVuICYmIGNvcHkgPCBoYXZlKTtcbiAgICAgICAgICBpZiAoc3RhdGUuZmxhZ3MgJiAweDAyMDApIHtcbiAgICAgICAgICAgIHN0YXRlLmNoZWNrID0gY3JjMzIoc3RhdGUuY2hlY2ssIGlucHV0LCBjb3B5LCBuZXh0KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaGF2ZSAtPSBjb3B5O1xuICAgICAgICAgIG5leHQgKz0gY29weTtcbiAgICAgICAgICBpZiAobGVuKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN0YXRlLmhlYWQpIHtcbiAgICAgICAgICBzdGF0ZS5oZWFkLmNvbW1lbnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlLm1vZGUgPSBIQ1JDO1xuICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICBjYXNlIEhDUkM6XG4gICAgICAgIGlmIChzdGF0ZS5mbGFncyAmIDB4MDIwMCkge1xuICAgICAgICAgIC8vPT09IE5FRURCSVRTKDE2KTsgKi9cbiAgICAgICAgICB3aGlsZSAoYml0cyA8IDE2KSB7XG4gICAgICAgICAgICBpZiAoaGF2ZSA9PT0gMCkgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgICAgIGhhdmUtLTtcbiAgICAgICAgICAgIGhvbGQgKz0gaW5wdXRbbmV4dCsrXSA8PCBiaXRzO1xuICAgICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLz09PS8vXG4gICAgICAgICAgaWYgKGhvbGQgIT09IChzdGF0ZS5jaGVjayAmIDB4ZmZmZikpIHtcbiAgICAgICAgICAgIHN0cm0ubXNnID0gJ2hlYWRlciBjcmMgbWlzbWF0Y2gnO1xuICAgICAgICAgICAgc3RhdGUubW9kZSA9IEJBRDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLz09PSBJTklUQklUUygpO1xuICAgICAgICAgIGhvbGQgPSAwO1xuICAgICAgICAgIGJpdHMgPSAwO1xuICAgICAgICAgIC8vPT09Ly9cbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhdGUuaGVhZCkge1xuICAgICAgICAgIHN0YXRlLmhlYWQuaGNyYyA9ICgoc3RhdGUuZmxhZ3MgPj4gOSkgJiAxKTtcbiAgICAgICAgICBzdGF0ZS5oZWFkLmRvbmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHN0cm0uYWRsZXIgPSBzdGF0ZS5jaGVjayA9IDA7XG4gICAgICAgIHN0YXRlLm1vZGUgPSBUWVBFO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRElDVElEOlxuICAgICAgICAvLz09PSBORUVEQklUUygzMik7ICovXG4gICAgICAgIHdoaWxlIChiaXRzIDwgMzIpIHtcbiAgICAgICAgICBpZiAoaGF2ZSA9PT0gMCkgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgICBoYXZlLS07XG4gICAgICAgICAgaG9sZCArPSBpbnB1dFtuZXh0KytdIDw8IGJpdHM7XG4gICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICB9XG4gICAgICAgIC8vPT09Ly9cbiAgICAgICAgc3RybS5hZGxlciA9IHN0YXRlLmNoZWNrID0genN3YXAzMihob2xkKTtcbiAgICAgICAgLy89PT0gSU5JVEJJVFMoKTtcbiAgICAgICAgaG9sZCA9IDA7XG4gICAgICAgIGJpdHMgPSAwO1xuICAgICAgICAvLz09PS8vXG4gICAgICAgIHN0YXRlLm1vZGUgPSBESUNUO1xuICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICBjYXNlIERJQ1Q6XG4gICAgICAgIGlmIChzdGF0ZS5oYXZlZGljdCA9PT0gMCkge1xuICAgICAgICAgIC8vLS0tIFJFU1RPUkUoKSAtLS1cbiAgICAgICAgICBzdHJtLm5leHRfb3V0ID0gcHV0O1xuICAgICAgICAgIHN0cm0uYXZhaWxfb3V0ID0gbGVmdDtcbiAgICAgICAgICBzdHJtLm5leHRfaW4gPSBuZXh0O1xuICAgICAgICAgIHN0cm0uYXZhaWxfaW4gPSBoYXZlO1xuICAgICAgICAgIHN0YXRlLmhvbGQgPSBob2xkO1xuICAgICAgICAgIHN0YXRlLmJpdHMgPSBiaXRzO1xuICAgICAgICAgIC8vLS0tXG4gICAgICAgICAgcmV0dXJuIFpfTkVFRF9ESUNUO1xuICAgICAgICB9XG4gICAgICAgIHN0cm0uYWRsZXIgPSBzdGF0ZS5jaGVjayA9IDEvKmFkbGVyMzIoMEwsIFpfTlVMTCwgMCkqLztcbiAgICAgICAgc3RhdGUubW9kZSA9IFRZUEU7XG4gICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgIGNhc2UgVFlQRTpcbiAgICAgICAgaWYgKGZsdXNoID09PSBaX0JMT0NLIHx8IGZsdXNoID09PSBaX1RSRUVTKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICBjYXNlIFRZUEVETzpcbiAgICAgICAgaWYgKHN0YXRlLmxhc3QpIHtcbiAgICAgICAgICAvLy0tLSBCWVRFQklUUygpIC0tLS8vXG4gICAgICAgICAgaG9sZCA+Pj49IGJpdHMgJiA3O1xuICAgICAgICAgIGJpdHMgLT0gYml0cyAmIDc7XG4gICAgICAgICAgLy8tLS0vL1xuICAgICAgICAgIHN0YXRlLm1vZGUgPSBDSEVDSztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvLz09PSBORUVEQklUUygzKTsgKi9cbiAgICAgICAgd2hpbGUgKGJpdHMgPCAzKSB7XG4gICAgICAgICAgaWYgKGhhdmUgPT09IDApIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgICAgaGF2ZS0tO1xuICAgICAgICAgIGhvbGQgKz0gaW5wdXRbbmV4dCsrXSA8PCBiaXRzO1xuICAgICAgICAgIGJpdHMgKz0gODtcbiAgICAgICAgfVxuICAgICAgICAvLz09PS8vXG4gICAgICAgIHN0YXRlLmxhc3QgPSAoaG9sZCAmIDB4MDEpLypCSVRTKDEpKi87XG4gICAgICAgIC8vLS0tIERST1BCSVRTKDEpIC0tLS8vXG4gICAgICAgIGhvbGQgPj4+PSAxO1xuICAgICAgICBiaXRzIC09IDE7XG4gICAgICAgIC8vLS0tLy9cblxuICAgICAgICBzd2l0Y2ggKChob2xkICYgMHgwMykvKkJJVFMoMikqLykge1xuICAgICAgICAgIGNhc2UgMDogICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIHN0b3JlZCBibG9jayAqL1xuICAgICAgICAgICAgLy9UcmFjZXYoKHN0ZGVyciwgXCJpbmZsYXRlOiAgICAgc3RvcmVkIGJsb2NrJXNcXG5cIixcbiAgICAgICAgICAgIC8vICAgICAgICBzdGF0ZS5sYXN0ID8gXCIgKGxhc3QpXCIgOiBcIlwiKSk7XG4gICAgICAgICAgICBzdGF0ZS5tb2RlID0gU1RPUkVEO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAxOiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogZml4ZWQgYmxvY2sgKi9cbiAgICAgICAgICAgIGZpeGVkdGFibGVzKHN0YXRlKTtcbiAgICAgICAgICAgIC8vVHJhY2V2KChzdGRlcnIsIFwiaW5mbGF0ZTogICAgIGZpeGVkIGNvZGVzIGJsb2NrJXNcXG5cIixcbiAgICAgICAgICAgIC8vICAgICAgICBzdGF0ZS5sYXN0ID8gXCIgKGxhc3QpXCIgOiBcIlwiKSk7XG4gICAgICAgICAgICBzdGF0ZS5tb2RlID0gTEVOXzsgICAgICAgICAgICAgLyogZGVjb2RlIGNvZGVzICovXG4gICAgICAgICAgICBpZiAoZmx1c2ggPT09IFpfVFJFRVMpIHtcbiAgICAgICAgICAgICAgLy8tLS0gRFJPUEJJVFMoMikgLS0tLy9cbiAgICAgICAgICAgICAgaG9sZCA+Pj49IDI7XG4gICAgICAgICAgICAgIGJpdHMgLT0gMjtcbiAgICAgICAgICAgICAgLy8tLS0vL1xuICAgICAgICAgICAgICBicmVhayBpbmZfbGVhdmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDI6ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBkeW5hbWljIGJsb2NrICovXG4gICAgICAgICAgICAvL1RyYWNldigoc3RkZXJyLCBcImluZmxhdGU6ICAgICBkeW5hbWljIGNvZGVzIGJsb2NrJXNcXG5cIixcbiAgICAgICAgICAgIC8vICAgICAgICBzdGF0ZS5sYXN0ID8gXCIgKGxhc3QpXCIgOiBcIlwiKSk7XG4gICAgICAgICAgICBzdGF0ZS5tb2RlID0gVEFCTEU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBzdHJtLm1zZyA9ICdpbnZhbGlkIGJsb2NrIHR5cGUnO1xuICAgICAgICAgICAgc3RhdGUubW9kZSA9IEJBRDtcbiAgICAgICAgfVxuICAgICAgICAvLy0tLSBEUk9QQklUUygyKSAtLS0vL1xuICAgICAgICBob2xkID4+Pj0gMjtcbiAgICAgICAgYml0cyAtPSAyO1xuICAgICAgICAvLy0tLS8vXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBTVE9SRUQ6XG4gICAgICAgIC8vLS0tIEJZVEVCSVRTKCkgLS0tLy8gLyogZ28gdG8gYnl0ZSBib3VuZGFyeSAqL1xuICAgICAgICBob2xkID4+Pj0gYml0cyAmIDc7XG4gICAgICAgIGJpdHMgLT0gYml0cyAmIDc7XG4gICAgICAgIC8vLS0tLy9cbiAgICAgICAgLy89PT0gTkVFREJJVFMoMzIpOyAqL1xuICAgICAgICB3aGlsZSAoYml0cyA8IDMyKSB7XG4gICAgICAgICAgaWYgKGhhdmUgPT09IDApIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgICAgaGF2ZS0tO1xuICAgICAgICAgIGhvbGQgKz0gaW5wdXRbbmV4dCsrXSA8PCBiaXRzO1xuICAgICAgICAgIGJpdHMgKz0gODtcbiAgICAgICAgfVxuICAgICAgICAvLz09PS8vXG4gICAgICAgIGlmICgoaG9sZCAmIDB4ZmZmZikgIT09ICgoaG9sZCA+Pj4gMTYpIF4gMHhmZmZmKSkge1xuICAgICAgICAgIHN0cm0ubXNnID0gJ2ludmFsaWQgc3RvcmVkIGJsb2NrIGxlbmd0aHMnO1xuICAgICAgICAgIHN0YXRlLm1vZGUgPSBCQUQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUubGVuZ3RoID0gaG9sZCAmIDB4ZmZmZjtcbiAgICAgICAgLy9UcmFjZXYoKHN0ZGVyciwgXCJpbmZsYXRlOiAgICAgICBzdG9yZWQgbGVuZ3RoICV1XFxuXCIsXG4gICAgICAgIC8vICAgICAgICBzdGF0ZS5sZW5ndGgpKTtcbiAgICAgICAgLy89PT0gSU5JVEJJVFMoKTtcbiAgICAgICAgaG9sZCA9IDA7XG4gICAgICAgIGJpdHMgPSAwO1xuICAgICAgICAvLz09PS8vXG4gICAgICAgIHN0YXRlLm1vZGUgPSBDT1BZXztcbiAgICAgICAgaWYgKGZsdXNoID09PSBaX1RSRUVTKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICBjYXNlIENPUFlfOlxuICAgICAgICBzdGF0ZS5tb2RlID0gQ09QWTtcbiAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgY2FzZSBDT1BZOlxuICAgICAgICBjb3B5ID0gc3RhdGUubGVuZ3RoO1xuICAgICAgICBpZiAoY29weSkge1xuICAgICAgICAgIGlmIChjb3B5ID4gaGF2ZSkgeyBjb3B5ID0gaGF2ZTsgfVxuICAgICAgICAgIGlmIChjb3B5ID4gbGVmdCkgeyBjb3B5ID0gbGVmdDsgfVxuICAgICAgICAgIGlmIChjb3B5ID09PSAwKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICAgIC8vLS0tIHptZW1jcHkocHV0LCBuZXh0LCBjb3B5KTsgLS0tXG4gICAgICAgICAgdXRpbHMuYXJyYXlTZXQob3V0cHV0LCBpbnB1dCwgbmV4dCwgY29weSwgcHV0KTtcbiAgICAgICAgICAvLy0tLS8vXG4gICAgICAgICAgaGF2ZSAtPSBjb3B5O1xuICAgICAgICAgIG5leHQgKz0gY29weTtcbiAgICAgICAgICBsZWZ0IC09IGNvcHk7XG4gICAgICAgICAgcHV0ICs9IGNvcHk7XG4gICAgICAgICAgc3RhdGUubGVuZ3RoIC09IGNvcHk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy9UcmFjZXYoKHN0ZGVyciwgXCJpbmZsYXRlOiAgICAgICBzdG9yZWQgZW5kXFxuXCIpKTtcbiAgICAgICAgc3RhdGUubW9kZSA9IFRZUEU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBUQUJMRTpcbiAgICAgICAgLy89PT0gTkVFREJJVFMoMTQpOyAqL1xuICAgICAgICB3aGlsZSAoYml0cyA8IDE0KSB7XG4gICAgICAgICAgaWYgKGhhdmUgPT09IDApIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgICAgaGF2ZS0tO1xuICAgICAgICAgIGhvbGQgKz0gaW5wdXRbbmV4dCsrXSA8PCBiaXRzO1xuICAgICAgICAgIGJpdHMgKz0gODtcbiAgICAgICAgfVxuICAgICAgICAvLz09PS8vXG4gICAgICAgIHN0YXRlLm5sZW4gPSAoaG9sZCAmIDB4MWYpLypCSVRTKDUpKi8gKyAyNTc7XG4gICAgICAgIC8vLS0tIERST1BCSVRTKDUpIC0tLS8vXG4gICAgICAgIGhvbGQgPj4+PSA1O1xuICAgICAgICBiaXRzIC09IDU7XG4gICAgICAgIC8vLS0tLy9cbiAgICAgICAgc3RhdGUubmRpc3QgPSAoaG9sZCAmIDB4MWYpLypCSVRTKDUpKi8gKyAxO1xuICAgICAgICAvLy0tLSBEUk9QQklUUyg1KSAtLS0vL1xuICAgICAgICBob2xkID4+Pj0gNTtcbiAgICAgICAgYml0cyAtPSA1O1xuICAgICAgICAvLy0tLS8vXG4gICAgICAgIHN0YXRlLm5jb2RlID0gKGhvbGQgJiAweDBmKS8qQklUUyg0KSovICsgNDtcbiAgICAgICAgLy8tLS0gRFJPUEJJVFMoNCkgLS0tLy9cbiAgICAgICAgaG9sZCA+Pj49IDQ7XG4gICAgICAgIGJpdHMgLT0gNDtcbiAgICAgICAgLy8tLS0vL1xuLy8jaWZuZGVmIFBLWklQX0JVR19XT1JLQVJPVU5EXG4gICAgICAgIGlmIChzdGF0ZS5ubGVuID4gMjg2IHx8IHN0YXRlLm5kaXN0ID4gMzApIHtcbiAgICAgICAgICBzdHJtLm1zZyA9ICd0b28gbWFueSBsZW5ndGggb3IgZGlzdGFuY2Ugc3ltYm9scyc7XG4gICAgICAgICAgc3RhdGUubW9kZSA9IEJBRDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuLy8jZW5kaWZcbiAgICAgICAgLy9UcmFjZXYoKHN0ZGVyciwgXCJpbmZsYXRlOiAgICAgICB0YWJsZSBzaXplcyBva1xcblwiKSk7XG4gICAgICAgIHN0YXRlLmhhdmUgPSAwO1xuICAgICAgICBzdGF0ZS5tb2RlID0gTEVOTEVOUztcbiAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgY2FzZSBMRU5MRU5TOlxuICAgICAgICB3aGlsZSAoc3RhdGUuaGF2ZSA8IHN0YXRlLm5jb2RlKSB7XG4gICAgICAgICAgLy89PT0gTkVFREJJVFMoMyk7XG4gICAgICAgICAgd2hpbGUgKGJpdHMgPCAzKSB7XG4gICAgICAgICAgICBpZiAoaGF2ZSA9PT0gMCkgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgICAgIGhhdmUtLTtcbiAgICAgICAgICAgIGhvbGQgKz0gaW5wdXRbbmV4dCsrXSA8PCBiaXRzO1xuICAgICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLz09PS8vXG4gICAgICAgICAgc3RhdGUubGVuc1tvcmRlcltzdGF0ZS5oYXZlKytdXSA9IChob2xkICYgMHgwNyk7Ly9CSVRTKDMpO1xuICAgICAgICAgIC8vLS0tIERST1BCSVRTKDMpIC0tLS8vXG4gICAgICAgICAgaG9sZCA+Pj49IDM7XG4gICAgICAgICAgYml0cyAtPSAzO1xuICAgICAgICAgIC8vLS0tLy9cbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAoc3RhdGUuaGF2ZSA8IDE5KSB7XG4gICAgICAgICAgc3RhdGUubGVuc1tvcmRlcltzdGF0ZS5oYXZlKytdXSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gV2UgaGF2ZSBzZXBhcmF0ZSB0YWJsZXMgJiBubyBwb2ludGVycy4gMiBjb21tZW50ZWQgbGluZXMgYmVsb3cgbm90IG5lZWRlZC5cbiAgICAgICAgLy9zdGF0ZS5uZXh0ID0gc3RhdGUuY29kZXM7XG4gICAgICAgIC8vc3RhdGUubGVuY29kZSA9IHN0YXRlLm5leHQ7XG4gICAgICAgIC8vIFN3aXRjaCB0byB1c2UgZHluYW1pYyB0YWJsZVxuICAgICAgICBzdGF0ZS5sZW5jb2RlID0gc3RhdGUubGVuZHluO1xuICAgICAgICBzdGF0ZS5sZW5iaXRzID0gNztcblxuICAgICAgICBvcHRzID0geyBiaXRzOiBzdGF0ZS5sZW5iaXRzIH07XG4gICAgICAgIHJldCA9IGluZmxhdGVfdGFibGUoQ09ERVMsIHN0YXRlLmxlbnMsIDAsIDE5LCBzdGF0ZS5sZW5jb2RlLCAwLCBzdGF0ZS53b3JrLCBvcHRzKTtcbiAgICAgICAgc3RhdGUubGVuYml0cyA9IG9wdHMuYml0cztcblxuICAgICAgICBpZiAocmV0KSB7XG4gICAgICAgICAgc3RybS5tc2cgPSAnaW52YWxpZCBjb2RlIGxlbmd0aHMgc2V0JztcbiAgICAgICAgICBzdGF0ZS5tb2RlID0gQkFEO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8vVHJhY2V2KChzdGRlcnIsIFwiaW5mbGF0ZTogICAgICAgY29kZSBsZW5ndGhzIG9rXFxuXCIpKTtcbiAgICAgICAgc3RhdGUuaGF2ZSA9IDA7XG4gICAgICAgIHN0YXRlLm1vZGUgPSBDT0RFTEVOUztcbiAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgY2FzZSBDT0RFTEVOUzpcbiAgICAgICAgd2hpbGUgKHN0YXRlLmhhdmUgPCBzdGF0ZS5ubGVuICsgc3RhdGUubmRpc3QpIHtcbiAgICAgICAgICBmb3IgKDs7KSB7XG4gICAgICAgICAgICBoZXJlID0gc3RhdGUubGVuY29kZVtob2xkICYgKCgxIDw8IHN0YXRlLmxlbmJpdHMpIC0gMSldOy8qQklUUyhzdGF0ZS5sZW5iaXRzKSovXG4gICAgICAgICAgICBoZXJlX2JpdHMgPSBoZXJlID4+PiAyNDtcbiAgICAgICAgICAgIGhlcmVfb3AgPSAoaGVyZSA+Pj4gMTYpICYgMHhmZjtcbiAgICAgICAgICAgIGhlcmVfdmFsID0gaGVyZSAmIDB4ZmZmZjtcblxuICAgICAgICAgICAgaWYgKChoZXJlX2JpdHMpIDw9IGJpdHMpIHsgYnJlYWs7IH1cbiAgICAgICAgICAgIC8vLS0tIFBVTExCWVRFKCkgLS0tLy9cbiAgICAgICAgICAgIGlmIChoYXZlID09PSAwKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICAgICAgaGF2ZS0tO1xuICAgICAgICAgICAgaG9sZCArPSBpbnB1dFtuZXh0KytdIDw8IGJpdHM7XG4gICAgICAgICAgICBiaXRzICs9IDg7XG4gICAgICAgICAgICAvLy0tLS8vXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChoZXJlX3ZhbCA8IDE2KSB7XG4gICAgICAgICAgICAvLy0tLSBEUk9QQklUUyhoZXJlLmJpdHMpIC0tLS8vXG4gICAgICAgICAgICBob2xkID4+Pj0gaGVyZV9iaXRzO1xuICAgICAgICAgICAgYml0cyAtPSBoZXJlX2JpdHM7XG4gICAgICAgICAgICAvLy0tLS8vXG4gICAgICAgICAgICBzdGF0ZS5sZW5zW3N0YXRlLmhhdmUrK10gPSBoZXJlX3ZhbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoaGVyZV92YWwgPT09IDE2KSB7XG4gICAgICAgICAgICAgIC8vPT09IE5FRURCSVRTKGhlcmUuYml0cyArIDIpO1xuICAgICAgICAgICAgICBuID0gaGVyZV9iaXRzICsgMjtcbiAgICAgICAgICAgICAgd2hpbGUgKGJpdHMgPCBuKSB7XG4gICAgICAgICAgICAgICAgaWYgKGhhdmUgPT09IDApIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgICAgICAgICAgaGF2ZS0tO1xuICAgICAgICAgICAgICAgIGhvbGQgKz0gaW5wdXRbbmV4dCsrXSA8PCBiaXRzO1xuICAgICAgICAgICAgICAgIGJpdHMgKz0gODtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLz09PS8vXG4gICAgICAgICAgICAgIC8vLS0tIERST1BCSVRTKGhlcmUuYml0cykgLS0tLy9cbiAgICAgICAgICAgICAgaG9sZCA+Pj49IGhlcmVfYml0cztcbiAgICAgICAgICAgICAgYml0cyAtPSBoZXJlX2JpdHM7XG4gICAgICAgICAgICAgIC8vLS0tLy9cbiAgICAgICAgICAgICAgaWYgKHN0YXRlLmhhdmUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBzdHJtLm1zZyA9ICdpbnZhbGlkIGJpdCBsZW5ndGggcmVwZWF0JztcbiAgICAgICAgICAgICAgICBzdGF0ZS5tb2RlID0gQkFEO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGxlbiA9IHN0YXRlLmxlbnNbc3RhdGUuaGF2ZSAtIDFdO1xuICAgICAgICAgICAgICBjb3B5ID0gMyArIChob2xkICYgMHgwMyk7Ly9CSVRTKDIpO1xuICAgICAgICAgICAgICAvLy0tLSBEUk9QQklUUygyKSAtLS0vL1xuICAgICAgICAgICAgICBob2xkID4+Pj0gMjtcbiAgICAgICAgICAgICAgYml0cyAtPSAyO1xuICAgICAgICAgICAgICAvLy0tLS8vXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChoZXJlX3ZhbCA9PT0gMTcpIHtcbiAgICAgICAgICAgICAgLy89PT0gTkVFREJJVFMoaGVyZS5iaXRzICsgMyk7XG4gICAgICAgICAgICAgIG4gPSBoZXJlX2JpdHMgKyAzO1xuICAgICAgICAgICAgICB3aGlsZSAoYml0cyA8IG4pIHtcbiAgICAgICAgICAgICAgICBpZiAoaGF2ZSA9PT0gMCkgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgICAgICAgICBoYXZlLS07XG4gICAgICAgICAgICAgICAgaG9sZCArPSBpbnB1dFtuZXh0KytdIDw8IGJpdHM7XG4gICAgICAgICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vPT09Ly9cbiAgICAgICAgICAgICAgLy8tLS0gRFJPUEJJVFMoaGVyZS5iaXRzKSAtLS0vL1xuICAgICAgICAgICAgICBob2xkID4+Pj0gaGVyZV9iaXRzO1xuICAgICAgICAgICAgICBiaXRzIC09IGhlcmVfYml0cztcbiAgICAgICAgICAgICAgLy8tLS0vL1xuICAgICAgICAgICAgICBsZW4gPSAwO1xuICAgICAgICAgICAgICBjb3B5ID0gMyArIChob2xkICYgMHgwNyk7Ly9CSVRTKDMpO1xuICAgICAgICAgICAgICAvLy0tLSBEUk9QQklUUygzKSAtLS0vL1xuICAgICAgICAgICAgICBob2xkID4+Pj0gMztcbiAgICAgICAgICAgICAgYml0cyAtPSAzO1xuICAgICAgICAgICAgICAvLy0tLS8vXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgLy89PT0gTkVFREJJVFMoaGVyZS5iaXRzICsgNyk7XG4gICAgICAgICAgICAgIG4gPSBoZXJlX2JpdHMgKyA3O1xuICAgICAgICAgICAgICB3aGlsZSAoYml0cyA8IG4pIHtcbiAgICAgICAgICAgICAgICBpZiAoaGF2ZSA9PT0gMCkgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgICAgICAgICBoYXZlLS07XG4gICAgICAgICAgICAgICAgaG9sZCArPSBpbnB1dFtuZXh0KytdIDw8IGJpdHM7XG4gICAgICAgICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vPT09Ly9cbiAgICAgICAgICAgICAgLy8tLS0gRFJPUEJJVFMoaGVyZS5iaXRzKSAtLS0vL1xuICAgICAgICAgICAgICBob2xkID4+Pj0gaGVyZV9iaXRzO1xuICAgICAgICAgICAgICBiaXRzIC09IGhlcmVfYml0cztcbiAgICAgICAgICAgICAgLy8tLS0vL1xuICAgICAgICAgICAgICBsZW4gPSAwO1xuICAgICAgICAgICAgICBjb3B5ID0gMTEgKyAoaG9sZCAmIDB4N2YpOy8vQklUUyg3KTtcbiAgICAgICAgICAgICAgLy8tLS0gRFJPUEJJVFMoNykgLS0tLy9cbiAgICAgICAgICAgICAgaG9sZCA+Pj49IDc7XG4gICAgICAgICAgICAgIGJpdHMgLT0gNztcbiAgICAgICAgICAgICAgLy8tLS0vL1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0YXRlLmhhdmUgKyBjb3B5ID4gc3RhdGUubmxlbiArIHN0YXRlLm5kaXN0KSB7XG4gICAgICAgICAgICAgIHN0cm0ubXNnID0gJ2ludmFsaWQgYml0IGxlbmd0aCByZXBlYXQnO1xuICAgICAgICAgICAgICBzdGF0ZS5tb2RlID0gQkFEO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlIChjb3B5LS0pIHtcbiAgICAgICAgICAgICAgc3RhdGUubGVuc1tzdGF0ZS5oYXZlKytdID0gbGVuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGhhbmRsZSBlcnJvciBicmVha3MgaW4gd2hpbGUgKi9cbiAgICAgICAgaWYgKHN0YXRlLm1vZGUgPT09IEJBRCkgeyBicmVhazsgfVxuXG4gICAgICAgIC8qIGNoZWNrIGZvciBlbmQtb2YtYmxvY2sgY29kZSAoYmV0dGVyIGhhdmUgb25lKSAqL1xuICAgICAgICBpZiAoc3RhdGUubGVuc1syNTZdID09PSAwKSB7XG4gICAgICAgICAgc3RybS5tc2cgPSAnaW52YWxpZCBjb2RlIC0tIG1pc3NpbmcgZW5kLW9mLWJsb2NrJztcbiAgICAgICAgICBzdGF0ZS5tb2RlID0gQkFEO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogYnVpbGQgY29kZSB0YWJsZXMgLS0gbm90ZTogZG8gbm90IGNoYW5nZSB0aGUgbGVuYml0cyBvciBkaXN0Yml0c1xuICAgICAgICAgICB2YWx1ZXMgaGVyZSAoOSBhbmQgNikgd2l0aG91dCByZWFkaW5nIHRoZSBjb21tZW50cyBpbiBpbmZ0cmVlcy5oXG4gICAgICAgICAgIGNvbmNlcm5pbmcgdGhlIEVOT1VHSCBjb25zdGFudHMsIHdoaWNoIGRlcGVuZCBvbiB0aG9zZSB2YWx1ZXMgKi9cbiAgICAgICAgc3RhdGUubGVuYml0cyA9IDk7XG5cbiAgICAgICAgb3B0cyA9IHsgYml0czogc3RhdGUubGVuYml0cyB9O1xuICAgICAgICByZXQgPSBpbmZsYXRlX3RhYmxlKExFTlMsIHN0YXRlLmxlbnMsIDAsIHN0YXRlLm5sZW4sIHN0YXRlLmxlbmNvZGUsIDAsIHN0YXRlLndvcmssIG9wdHMpO1xuICAgICAgICAvLyBXZSBoYXZlIHNlcGFyYXRlIHRhYmxlcyAmIG5vIHBvaW50ZXJzLiAyIGNvbW1lbnRlZCBsaW5lcyBiZWxvdyBub3QgbmVlZGVkLlxuICAgICAgICAvLyBzdGF0ZS5uZXh0X2luZGV4ID0gb3B0cy50YWJsZV9pbmRleDtcbiAgICAgICAgc3RhdGUubGVuYml0cyA9IG9wdHMuYml0cztcbiAgICAgICAgLy8gc3RhdGUubGVuY29kZSA9IHN0YXRlLm5leHQ7XG5cbiAgICAgICAgaWYgKHJldCkge1xuICAgICAgICAgIHN0cm0ubXNnID0gJ2ludmFsaWQgbGl0ZXJhbC9sZW5ndGhzIHNldCc7XG4gICAgICAgICAgc3RhdGUubW9kZSA9IEJBRDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlLmRpc3RiaXRzID0gNjtcbiAgICAgICAgLy9zdGF0ZS5kaXN0Y29kZS5jb3B5KHN0YXRlLmNvZGVzKTtcbiAgICAgICAgLy8gU3dpdGNoIHRvIHVzZSBkeW5hbWljIHRhYmxlXG4gICAgICAgIHN0YXRlLmRpc3Rjb2RlID0gc3RhdGUuZGlzdGR5bjtcbiAgICAgICAgb3B0cyA9IHsgYml0czogc3RhdGUuZGlzdGJpdHMgfTtcbiAgICAgICAgcmV0ID0gaW5mbGF0ZV90YWJsZShESVNUUywgc3RhdGUubGVucywgc3RhdGUubmxlbiwgc3RhdGUubmRpc3QsIHN0YXRlLmRpc3Rjb2RlLCAwLCBzdGF0ZS53b3JrLCBvcHRzKTtcbiAgICAgICAgLy8gV2UgaGF2ZSBzZXBhcmF0ZSB0YWJsZXMgJiBubyBwb2ludGVycy4gMiBjb21tZW50ZWQgbGluZXMgYmVsb3cgbm90IG5lZWRlZC5cbiAgICAgICAgLy8gc3RhdGUubmV4dF9pbmRleCA9IG9wdHMudGFibGVfaW5kZXg7XG4gICAgICAgIHN0YXRlLmRpc3RiaXRzID0gb3B0cy5iaXRzO1xuICAgICAgICAvLyBzdGF0ZS5kaXN0Y29kZSA9IHN0YXRlLm5leHQ7XG5cbiAgICAgICAgaWYgKHJldCkge1xuICAgICAgICAgIHN0cm0ubXNnID0gJ2ludmFsaWQgZGlzdGFuY2VzIHNldCc7XG4gICAgICAgICAgc3RhdGUubW9kZSA9IEJBRDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvL1RyYWNldigoc3RkZXJyLCAnaW5mbGF0ZTogICAgICAgY29kZXMgb2tcXG4nKSk7XG4gICAgICAgIHN0YXRlLm1vZGUgPSBMRU5fO1xuICAgICAgICBpZiAoZmx1c2ggPT09IFpfVFJFRVMpIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgIGNhc2UgTEVOXzpcbiAgICAgICAgc3RhdGUubW9kZSA9IExFTjtcbiAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgY2FzZSBMRU46XG4gICAgICAgIGlmIChoYXZlID49IDYgJiYgbGVmdCA+PSAyNTgpIHtcbiAgICAgICAgICAvLy0tLSBSRVNUT1JFKCkgLS0tXG4gICAgICAgICAgc3RybS5uZXh0X291dCA9IHB1dDtcbiAgICAgICAgICBzdHJtLmF2YWlsX291dCA9IGxlZnQ7XG4gICAgICAgICAgc3RybS5uZXh0X2luID0gbmV4dDtcbiAgICAgICAgICBzdHJtLmF2YWlsX2luID0gaGF2ZTtcbiAgICAgICAgICBzdGF0ZS5ob2xkID0gaG9sZDtcbiAgICAgICAgICBzdGF0ZS5iaXRzID0gYml0cztcbiAgICAgICAgICAvLy0tLVxuICAgICAgICAgIGluZmxhdGVfZmFzdChzdHJtLCBfb3V0KTtcbiAgICAgICAgICAvLy0tLSBMT0FEKCkgLS0tXG4gICAgICAgICAgcHV0ID0gc3RybS5uZXh0X291dDtcbiAgICAgICAgICBvdXRwdXQgPSBzdHJtLm91dHB1dDtcbiAgICAgICAgICBsZWZ0ID0gc3RybS5hdmFpbF9vdXQ7XG4gICAgICAgICAgbmV4dCA9IHN0cm0ubmV4dF9pbjtcbiAgICAgICAgICBpbnB1dCA9IHN0cm0uaW5wdXQ7XG4gICAgICAgICAgaGF2ZSA9IHN0cm0uYXZhaWxfaW47XG4gICAgICAgICAgaG9sZCA9IHN0YXRlLmhvbGQ7XG4gICAgICAgICAgYml0cyA9IHN0YXRlLmJpdHM7XG4gICAgICAgICAgLy8tLS1cblxuICAgICAgICAgIGlmIChzdGF0ZS5tb2RlID09PSBUWVBFKSB7XG4gICAgICAgICAgICBzdGF0ZS5iYWNrID0gLTE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlLmJhY2sgPSAwO1xuICAgICAgICBmb3IgKDs7KSB7XG4gICAgICAgICAgaGVyZSA9IHN0YXRlLmxlbmNvZGVbaG9sZCAmICgoMSA8PCBzdGF0ZS5sZW5iaXRzKSAtIDEpXTsgIC8qQklUUyhzdGF0ZS5sZW5iaXRzKSovXG4gICAgICAgICAgaGVyZV9iaXRzID0gaGVyZSA+Pj4gMjQ7XG4gICAgICAgICAgaGVyZV9vcCA9IChoZXJlID4+PiAxNikgJiAweGZmO1xuICAgICAgICAgIGhlcmVfdmFsID0gaGVyZSAmIDB4ZmZmZjtcblxuICAgICAgICAgIGlmIChoZXJlX2JpdHMgPD0gYml0cykgeyBicmVhazsgfVxuICAgICAgICAgIC8vLS0tIFBVTExCWVRFKCkgLS0tLy9cbiAgICAgICAgICBpZiAoaGF2ZSA9PT0gMCkgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgICBoYXZlLS07XG4gICAgICAgICAgaG9sZCArPSBpbnB1dFtuZXh0KytdIDw8IGJpdHM7XG4gICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICAgIC8vLS0tLy9cbiAgICAgICAgfVxuICAgICAgICBpZiAoaGVyZV9vcCAmJiAoaGVyZV9vcCAmIDB4ZjApID09PSAwKSB7XG4gICAgICAgICAgbGFzdF9iaXRzID0gaGVyZV9iaXRzO1xuICAgICAgICAgIGxhc3Rfb3AgPSBoZXJlX29wO1xuICAgICAgICAgIGxhc3RfdmFsID0gaGVyZV92YWw7XG4gICAgICAgICAgZm9yICg7Oykge1xuICAgICAgICAgICAgaGVyZSA9IHN0YXRlLmxlbmNvZGVbbGFzdF92YWwgK1xuICAgICAgICAgICAgICAgICAgICAoKGhvbGQgJiAoKDEgPDwgKGxhc3RfYml0cyArIGxhc3Rfb3ApKSAtIDEpKS8qQklUUyhsYXN0LmJpdHMgKyBsYXN0Lm9wKSovID4+IGxhc3RfYml0cyldO1xuICAgICAgICAgICAgaGVyZV9iaXRzID0gaGVyZSA+Pj4gMjQ7XG4gICAgICAgICAgICBoZXJlX29wID0gKGhlcmUgPj4+IDE2KSAmIDB4ZmY7XG4gICAgICAgICAgICBoZXJlX3ZhbCA9IGhlcmUgJiAweGZmZmY7XG5cbiAgICAgICAgICAgIGlmICgobGFzdF9iaXRzICsgaGVyZV9iaXRzKSA8PSBiaXRzKSB7IGJyZWFrOyB9XG4gICAgICAgICAgICAvLy0tLSBQVUxMQllURSgpIC0tLS8vXG4gICAgICAgICAgICBpZiAoaGF2ZSA9PT0gMCkgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgICAgIGhhdmUtLTtcbiAgICAgICAgICAgIGhvbGQgKz0gaW5wdXRbbmV4dCsrXSA8PCBiaXRzO1xuICAgICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICAgICAgLy8tLS0vL1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLy0tLSBEUk9QQklUUyhsYXN0LmJpdHMpIC0tLS8vXG4gICAgICAgICAgaG9sZCA+Pj49IGxhc3RfYml0cztcbiAgICAgICAgICBiaXRzIC09IGxhc3RfYml0cztcbiAgICAgICAgICAvLy0tLS8vXG4gICAgICAgICAgc3RhdGUuYmFjayArPSBsYXN0X2JpdHM7XG4gICAgICAgIH1cbiAgICAgICAgLy8tLS0gRFJPUEJJVFMoaGVyZS5iaXRzKSAtLS0vL1xuICAgICAgICBob2xkID4+Pj0gaGVyZV9iaXRzO1xuICAgICAgICBiaXRzIC09IGhlcmVfYml0cztcbiAgICAgICAgLy8tLS0vL1xuICAgICAgICBzdGF0ZS5iYWNrICs9IGhlcmVfYml0cztcbiAgICAgICAgc3RhdGUubGVuZ3RoID0gaGVyZV92YWw7XG4gICAgICAgIGlmIChoZXJlX29wID09PSAwKSB7XG4gICAgICAgICAgLy9UcmFjZXZ2KChzdGRlcnIsIGhlcmUudmFsID49IDB4MjAgJiYgaGVyZS52YWwgPCAweDdmID9cbiAgICAgICAgICAvLyAgICAgICAgXCJpbmZsYXRlOiAgICAgICAgIGxpdGVyYWwgJyVjJ1xcblwiIDpcbiAgICAgICAgICAvLyAgICAgICAgXCJpbmZsYXRlOiAgICAgICAgIGxpdGVyYWwgMHglMDJ4XFxuXCIsIGhlcmUudmFsKSk7XG4gICAgICAgICAgc3RhdGUubW9kZSA9IExJVDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGVyZV9vcCAmIDMyKSB7XG4gICAgICAgICAgLy9UcmFjZXZ2KChzdGRlcnIsIFwiaW5mbGF0ZTogICAgICAgICBlbmQgb2YgYmxvY2tcXG5cIikpO1xuICAgICAgICAgIHN0YXRlLmJhY2sgPSAtMTtcbiAgICAgICAgICBzdGF0ZS5tb2RlID0gVFlQRTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGVyZV9vcCAmIDY0KSB7XG4gICAgICAgICAgc3RybS5tc2cgPSAnaW52YWxpZCBsaXRlcmFsL2xlbmd0aCBjb2RlJztcbiAgICAgICAgICBzdGF0ZS5tb2RlID0gQkFEO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlLmV4dHJhID0gaGVyZV9vcCAmIDE1O1xuICAgICAgICBzdGF0ZS5tb2RlID0gTEVORVhUO1xuICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICBjYXNlIExFTkVYVDpcbiAgICAgICAgaWYgKHN0YXRlLmV4dHJhKSB7XG4gICAgICAgICAgLy89PT0gTkVFREJJVFMoc3RhdGUuZXh0cmEpO1xuICAgICAgICAgIG4gPSBzdGF0ZS5leHRyYTtcbiAgICAgICAgICB3aGlsZSAoYml0cyA8IG4pIHtcbiAgICAgICAgICAgIGlmIChoYXZlID09PSAwKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICAgICAgaGF2ZS0tO1xuICAgICAgICAgICAgaG9sZCArPSBpbnB1dFtuZXh0KytdIDw8IGJpdHM7XG4gICAgICAgICAgICBiaXRzICs9IDg7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vPT09Ly9cbiAgICAgICAgICBzdGF0ZS5sZW5ndGggKz0gaG9sZCAmICgoMSA8PCBzdGF0ZS5leHRyYSkgLSAxKS8qQklUUyhzdGF0ZS5leHRyYSkqLztcbiAgICAgICAgICAvLy0tLSBEUk9QQklUUyhzdGF0ZS5leHRyYSkgLS0tLy9cbiAgICAgICAgICBob2xkID4+Pj0gc3RhdGUuZXh0cmE7XG4gICAgICAgICAgYml0cyAtPSBzdGF0ZS5leHRyYTtcbiAgICAgICAgICAvLy0tLS8vXG4gICAgICAgICAgc3RhdGUuYmFjayArPSBzdGF0ZS5leHRyYTtcbiAgICAgICAgfVxuICAgICAgICAvL1RyYWNldnYoKHN0ZGVyciwgXCJpbmZsYXRlOiAgICAgICAgIGxlbmd0aCAldVxcblwiLCBzdGF0ZS5sZW5ndGgpKTtcbiAgICAgICAgc3RhdGUud2FzID0gc3RhdGUubGVuZ3RoO1xuICAgICAgICBzdGF0ZS5tb2RlID0gRElTVDtcbiAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgY2FzZSBESVNUOlxuICAgICAgICBmb3IgKDs7KSB7XG4gICAgICAgICAgaGVyZSA9IHN0YXRlLmRpc3Rjb2RlW2hvbGQgJiAoKDEgPDwgc3RhdGUuZGlzdGJpdHMpIC0gMSldOy8qQklUUyhzdGF0ZS5kaXN0Yml0cykqL1xuICAgICAgICAgIGhlcmVfYml0cyA9IGhlcmUgPj4+IDI0O1xuICAgICAgICAgIGhlcmVfb3AgPSAoaGVyZSA+Pj4gMTYpICYgMHhmZjtcbiAgICAgICAgICBoZXJlX3ZhbCA9IGhlcmUgJiAweGZmZmY7XG5cbiAgICAgICAgICBpZiAoKGhlcmVfYml0cykgPD0gYml0cykgeyBicmVhazsgfVxuICAgICAgICAgIC8vLS0tIFBVTExCWVRFKCkgLS0tLy9cbiAgICAgICAgICBpZiAoaGF2ZSA9PT0gMCkgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgICBoYXZlLS07XG4gICAgICAgICAgaG9sZCArPSBpbnB1dFtuZXh0KytdIDw8IGJpdHM7XG4gICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICAgIC8vLS0tLy9cbiAgICAgICAgfVxuICAgICAgICBpZiAoKGhlcmVfb3AgJiAweGYwKSA9PT0gMCkge1xuICAgICAgICAgIGxhc3RfYml0cyA9IGhlcmVfYml0cztcbiAgICAgICAgICBsYXN0X29wID0gaGVyZV9vcDtcbiAgICAgICAgICBsYXN0X3ZhbCA9IGhlcmVfdmFsO1xuICAgICAgICAgIGZvciAoOzspIHtcbiAgICAgICAgICAgIGhlcmUgPSBzdGF0ZS5kaXN0Y29kZVtsYXN0X3ZhbCArXG4gICAgICAgICAgICAgICAgICAgICgoaG9sZCAmICgoMSA8PCAobGFzdF9iaXRzICsgbGFzdF9vcCkpIC0gMSkpLypCSVRTKGxhc3QuYml0cyArIGxhc3Qub3ApKi8gPj4gbGFzdF9iaXRzKV07XG4gICAgICAgICAgICBoZXJlX2JpdHMgPSBoZXJlID4+PiAyNDtcbiAgICAgICAgICAgIGhlcmVfb3AgPSAoaGVyZSA+Pj4gMTYpICYgMHhmZjtcbiAgICAgICAgICAgIGhlcmVfdmFsID0gaGVyZSAmIDB4ZmZmZjtcblxuICAgICAgICAgICAgaWYgKChsYXN0X2JpdHMgKyBoZXJlX2JpdHMpIDw9IGJpdHMpIHsgYnJlYWs7IH1cbiAgICAgICAgICAgIC8vLS0tIFBVTExCWVRFKCkgLS0tLy9cbiAgICAgICAgICAgIGlmIChoYXZlID09PSAwKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICAgICAgaGF2ZS0tO1xuICAgICAgICAgICAgaG9sZCArPSBpbnB1dFtuZXh0KytdIDw8IGJpdHM7XG4gICAgICAgICAgICBiaXRzICs9IDg7XG4gICAgICAgICAgICAvLy0tLS8vXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vLS0tIERST1BCSVRTKGxhc3QuYml0cykgLS0tLy9cbiAgICAgICAgICBob2xkID4+Pj0gbGFzdF9iaXRzO1xuICAgICAgICAgIGJpdHMgLT0gbGFzdF9iaXRzO1xuICAgICAgICAgIC8vLS0tLy9cbiAgICAgICAgICBzdGF0ZS5iYWNrICs9IGxhc3RfYml0cztcbiAgICAgICAgfVxuICAgICAgICAvLy0tLSBEUk9QQklUUyhoZXJlLmJpdHMpIC0tLS8vXG4gICAgICAgIGhvbGQgPj4+PSBoZXJlX2JpdHM7XG4gICAgICAgIGJpdHMgLT0gaGVyZV9iaXRzO1xuICAgICAgICAvLy0tLS8vXG4gICAgICAgIHN0YXRlLmJhY2sgKz0gaGVyZV9iaXRzO1xuICAgICAgICBpZiAoaGVyZV9vcCAmIDY0KSB7XG4gICAgICAgICAgc3RybS5tc2cgPSAnaW52YWxpZCBkaXN0YW5jZSBjb2RlJztcbiAgICAgICAgICBzdGF0ZS5tb2RlID0gQkFEO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlLm9mZnNldCA9IGhlcmVfdmFsO1xuICAgICAgICBzdGF0ZS5leHRyYSA9IChoZXJlX29wKSAmIDE1O1xuICAgICAgICBzdGF0ZS5tb2RlID0gRElTVEVYVDtcbiAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgY2FzZSBESVNURVhUOlxuICAgICAgICBpZiAoc3RhdGUuZXh0cmEpIHtcbiAgICAgICAgICAvLz09PSBORUVEQklUUyhzdGF0ZS5leHRyYSk7XG4gICAgICAgICAgbiA9IHN0YXRlLmV4dHJhO1xuICAgICAgICAgIHdoaWxlIChiaXRzIDwgbikge1xuICAgICAgICAgICAgaWYgKGhhdmUgPT09IDApIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgICAgICBoYXZlLS07XG4gICAgICAgICAgICBob2xkICs9IGlucHV0W25leHQrK10gPDwgYml0cztcbiAgICAgICAgICAgIGJpdHMgKz0gODtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy89PT0vL1xuICAgICAgICAgIHN0YXRlLm9mZnNldCArPSBob2xkICYgKCgxIDw8IHN0YXRlLmV4dHJhKSAtIDEpLypCSVRTKHN0YXRlLmV4dHJhKSovO1xuICAgICAgICAgIC8vLS0tIERST1BCSVRTKHN0YXRlLmV4dHJhKSAtLS0vL1xuICAgICAgICAgIGhvbGQgPj4+PSBzdGF0ZS5leHRyYTtcbiAgICAgICAgICBiaXRzIC09IHN0YXRlLmV4dHJhO1xuICAgICAgICAgIC8vLS0tLy9cbiAgICAgICAgICBzdGF0ZS5iYWNrICs9IHN0YXRlLmV4dHJhO1xuICAgICAgICB9XG4vLyNpZmRlZiBJTkZMQVRFX1NUUklDVFxuICAgICAgICBpZiAoc3RhdGUub2Zmc2V0ID4gc3RhdGUuZG1heCkge1xuICAgICAgICAgIHN0cm0ubXNnID0gJ2ludmFsaWQgZGlzdGFuY2UgdG9vIGZhciBiYWNrJztcbiAgICAgICAgICBzdGF0ZS5tb2RlID0gQkFEO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4vLyNlbmRpZlxuICAgICAgICAvL1RyYWNldnYoKHN0ZGVyciwgXCJpbmZsYXRlOiAgICAgICAgIGRpc3RhbmNlICV1XFxuXCIsIHN0YXRlLm9mZnNldCkpO1xuICAgICAgICBzdGF0ZS5tb2RlID0gTUFUQ0g7XG4gICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgIGNhc2UgTUFUQ0g6XG4gICAgICAgIGlmIChsZWZ0ID09PSAwKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICBjb3B5ID0gX291dCAtIGxlZnQ7XG4gICAgICAgIGlmIChzdGF0ZS5vZmZzZXQgPiBjb3B5KSB7ICAgICAgICAgLyogY29weSBmcm9tIHdpbmRvdyAqL1xuICAgICAgICAgIGNvcHkgPSBzdGF0ZS5vZmZzZXQgLSBjb3B5O1xuICAgICAgICAgIGlmIChjb3B5ID4gc3RhdGUud2hhdmUpIHtcbiAgICAgICAgICAgIGlmIChzdGF0ZS5zYW5lKSB7XG4gICAgICAgICAgICAgIHN0cm0ubXNnID0gJ2ludmFsaWQgZGlzdGFuY2UgdG9vIGZhciBiYWNrJztcbiAgICAgICAgICAgICAgc3RhdGUubW9kZSA9IEJBRDtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4vLyAoISkgVGhpcyBibG9jayBpcyBkaXNhYmxlZCBpbiB6bGliIGRlZmF1bHRzLFxuLy8gZG9uJ3QgZW5hYmxlIGl0IGZvciBiaW5hcnkgY29tcGF0aWJpbGl0eVxuLy8jaWZkZWYgSU5GTEFURV9BTExPV19JTlZBTElEX0RJU1RBTkNFX1RPT0ZBUl9BUlJSXG4vLyAgICAgICAgICBUcmFjZSgoc3RkZXJyLCBcImluZmxhdGUuYyB0b28gZmFyXFxuXCIpKTtcbi8vICAgICAgICAgIGNvcHkgLT0gc3RhdGUud2hhdmU7XG4vLyAgICAgICAgICBpZiAoY29weSA+IHN0YXRlLmxlbmd0aCkgeyBjb3B5ID0gc3RhdGUubGVuZ3RoOyB9XG4vLyAgICAgICAgICBpZiAoY29weSA+IGxlZnQpIHsgY29weSA9IGxlZnQ7IH1cbi8vICAgICAgICAgIGxlZnQgLT0gY29weTtcbi8vICAgICAgICAgIHN0YXRlLmxlbmd0aCAtPSBjb3B5O1xuLy8gICAgICAgICAgZG8ge1xuLy8gICAgICAgICAgICBvdXRwdXRbcHV0KytdID0gMDtcbi8vICAgICAgICAgIH0gd2hpbGUgKC0tY29weSk7XG4vLyAgICAgICAgICBpZiAoc3RhdGUubGVuZ3RoID09PSAwKSB7IHN0YXRlLm1vZGUgPSBMRU47IH1cbi8vICAgICAgICAgIGJyZWFrO1xuLy8jZW5kaWZcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNvcHkgPiBzdGF0ZS53bmV4dCkge1xuICAgICAgICAgICAgY29weSAtPSBzdGF0ZS53bmV4dDtcbiAgICAgICAgICAgIGZyb20gPSBzdGF0ZS53c2l6ZSAtIGNvcHk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZnJvbSA9IHN0YXRlLnduZXh0IC0gY29weTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNvcHkgPiBzdGF0ZS5sZW5ndGgpIHsgY29weSA9IHN0YXRlLmxlbmd0aDsgfVxuICAgICAgICAgIGZyb21fc291cmNlID0gc3RhdGUud2luZG93O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIGNvcHkgZnJvbSBvdXRwdXQgKi9cbiAgICAgICAgICBmcm9tX3NvdXJjZSA9IG91dHB1dDtcbiAgICAgICAgICBmcm9tID0gcHV0IC0gc3RhdGUub2Zmc2V0O1xuICAgICAgICAgIGNvcHkgPSBzdGF0ZS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvcHkgPiBsZWZ0KSB7IGNvcHkgPSBsZWZ0OyB9XG4gICAgICAgIGxlZnQgLT0gY29weTtcbiAgICAgICAgc3RhdGUubGVuZ3RoIC09IGNvcHk7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICBvdXRwdXRbcHV0KytdID0gZnJvbV9zb3VyY2VbZnJvbSsrXTtcbiAgICAgICAgfSB3aGlsZSAoLS1jb3B5KTtcbiAgICAgICAgaWYgKHN0YXRlLmxlbmd0aCA9PT0gMCkgeyBzdGF0ZS5tb2RlID0gTEVOOyB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBMSVQ6XG4gICAgICAgIGlmIChsZWZ0ID09PSAwKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICBvdXRwdXRbcHV0KytdID0gc3RhdGUubGVuZ3RoO1xuICAgICAgICBsZWZ0LS07XG4gICAgICAgIHN0YXRlLm1vZGUgPSBMRU47XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDSEVDSzpcbiAgICAgICAgaWYgKHN0YXRlLndyYXApIHtcbiAgICAgICAgICAvLz09PSBORUVEQklUUygzMik7XG4gICAgICAgICAgd2hpbGUgKGJpdHMgPCAzMikge1xuICAgICAgICAgICAgaWYgKGhhdmUgPT09IDApIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgICAgICBoYXZlLS07XG4gICAgICAgICAgICAvLyBVc2UgJ3wnIGluc3RlYWQgb2YgJysnIHRvIG1ha2Ugc3VyZSB0aGF0IHJlc3VsdCBpcyBzaWduZWRcbiAgICAgICAgICAgIGhvbGQgfD0gaW5wdXRbbmV4dCsrXSA8PCBiaXRzO1xuICAgICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLz09PS8vXG4gICAgICAgICAgX291dCAtPSBsZWZ0O1xuICAgICAgICAgIHN0cm0udG90YWxfb3V0ICs9IF9vdXQ7XG4gICAgICAgICAgc3RhdGUudG90YWwgKz0gX291dDtcbiAgICAgICAgICBpZiAoX291dCkge1xuICAgICAgICAgICAgc3RybS5hZGxlciA9IHN0YXRlLmNoZWNrID1cbiAgICAgICAgICAgICAgICAvKlVQREFURShzdGF0ZS5jaGVjaywgcHV0IC0gX291dCwgX291dCk7Ki9cbiAgICAgICAgICAgICAgICAoc3RhdGUuZmxhZ3MgPyBjcmMzMihzdGF0ZS5jaGVjaywgb3V0cHV0LCBfb3V0LCBwdXQgLSBfb3V0KSA6IGFkbGVyMzIoc3RhdGUuY2hlY2ssIG91dHB1dCwgX291dCwgcHV0IC0gX291dCkpO1xuXG4gICAgICAgICAgfVxuICAgICAgICAgIF9vdXQgPSBsZWZ0O1xuICAgICAgICAgIC8vIE5COiBjcmMzMiBzdG9yZWQgYXMgc2lnbmVkIDMyLWJpdCBpbnQsIHpzd2FwMzIgcmV0dXJucyBzaWduZWQgdG9vXG4gICAgICAgICAgaWYgKChzdGF0ZS5mbGFncyA/IGhvbGQgOiB6c3dhcDMyKGhvbGQpKSAhPT0gc3RhdGUuY2hlY2spIHtcbiAgICAgICAgICAgIHN0cm0ubXNnID0gJ2luY29ycmVjdCBkYXRhIGNoZWNrJztcbiAgICAgICAgICAgIHN0YXRlLm1vZGUgPSBCQUQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgLy89PT0gSU5JVEJJVFMoKTtcbiAgICAgICAgICBob2xkID0gMDtcbiAgICAgICAgICBiaXRzID0gMDtcbiAgICAgICAgICAvLz09PS8vXG4gICAgICAgICAgLy9UcmFjZXYoKHN0ZGVyciwgXCJpbmZsYXRlOiAgIGNoZWNrIG1hdGNoZXMgdHJhaWxlclxcblwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUubW9kZSA9IExFTkdUSDtcbiAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgY2FzZSBMRU5HVEg6XG4gICAgICAgIGlmIChzdGF0ZS53cmFwICYmIHN0YXRlLmZsYWdzKSB7XG4gICAgICAgICAgLy89PT0gTkVFREJJVFMoMzIpO1xuICAgICAgICAgIHdoaWxlIChiaXRzIDwgMzIpIHtcbiAgICAgICAgICAgIGlmIChoYXZlID09PSAwKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICAgICAgaGF2ZS0tO1xuICAgICAgICAgICAgaG9sZCArPSBpbnB1dFtuZXh0KytdIDw8IGJpdHM7XG4gICAgICAgICAgICBiaXRzICs9IDg7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vPT09Ly9cbiAgICAgICAgICBpZiAoaG9sZCAhPT0gKHN0YXRlLnRvdGFsICYgMHhmZmZmZmZmZikpIHtcbiAgICAgICAgICAgIHN0cm0ubXNnID0gJ2luY29ycmVjdCBsZW5ndGggY2hlY2snO1xuICAgICAgICAgICAgc3RhdGUubW9kZSA9IEJBRDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLz09PSBJTklUQklUUygpO1xuICAgICAgICAgIGhvbGQgPSAwO1xuICAgICAgICAgIGJpdHMgPSAwO1xuICAgICAgICAgIC8vPT09Ly9cbiAgICAgICAgICAvL1RyYWNldigoc3RkZXJyLCBcImluZmxhdGU6ICAgbGVuZ3RoIG1hdGNoZXMgdHJhaWxlclxcblwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUubW9kZSA9IERPTkU7XG4gICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgIGNhc2UgRE9ORTpcbiAgICAgICAgcmV0ID0gWl9TVFJFQU1fRU5EO1xuICAgICAgICBicmVhayBpbmZfbGVhdmU7XG4gICAgICBjYXNlIEJBRDpcbiAgICAgICAgcmV0ID0gWl9EQVRBX0VSUk9SO1xuICAgICAgICBicmVhayBpbmZfbGVhdmU7XG4gICAgICBjYXNlIE1FTTpcbiAgICAgICAgcmV0dXJuIFpfTUVNX0VSUk9SO1xuICAgICAgY2FzZSBTWU5DOlxuICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gWl9TVFJFQU1fRVJST1I7XG4gICAgfVxuICB9XG5cbiAgLy8gaW5mX2xlYXZlIDwtIGhlcmUgaXMgcmVhbCBwbGFjZSBmb3IgXCJnb3RvIGluZl9sZWF2ZVwiLCBlbXVsYXRlZCB2aWEgXCJicmVhayBpbmZfbGVhdmVcIlxuXG4gIC8qXG4gICAgIFJldHVybiBmcm9tIGluZmxhdGUoKSwgdXBkYXRpbmcgdGhlIHRvdGFsIGNvdW50cyBhbmQgdGhlIGNoZWNrIHZhbHVlLlxuICAgICBJZiB0aGVyZSB3YXMgbm8gcHJvZ3Jlc3MgZHVyaW5nIHRoZSBpbmZsYXRlKCkgY2FsbCwgcmV0dXJuIGEgYnVmZmVyXG4gICAgIGVycm9yLiAgQ2FsbCB1cGRhdGV3aW5kb3coKSB0byBjcmVhdGUgYW5kL29yIHVwZGF0ZSB0aGUgd2luZG93IHN0YXRlLlxuICAgICBOb3RlOiBhIG1lbW9yeSBlcnJvciBmcm9tIGluZmxhdGUoKSBpcyBub24tcmVjb3ZlcmFibGUuXG4gICAqL1xuXG4gIC8vLS0tIFJFU1RPUkUoKSAtLS1cbiAgc3RybS5uZXh0X291dCA9IHB1dDtcbiAgc3RybS5hdmFpbF9vdXQgPSBsZWZ0O1xuICBzdHJtLm5leHRfaW4gPSBuZXh0O1xuICBzdHJtLmF2YWlsX2luID0gaGF2ZTtcbiAgc3RhdGUuaG9sZCA9IGhvbGQ7XG4gIHN0YXRlLmJpdHMgPSBiaXRzO1xuICAvLy0tLVxuXG4gIGlmIChzdGF0ZS53c2l6ZSB8fCAoX291dCAhPT0gc3RybS5hdmFpbF9vdXQgJiYgc3RhdGUubW9kZSA8IEJBRCAmJlxuICAgICAgICAgICAgICAgICAgICAgIChzdGF0ZS5tb2RlIDwgQ0hFQ0sgfHwgZmx1c2ggIT09IFpfRklOSVNIKSkpIHtcbiAgICBpZiAodXBkYXRld2luZG93KHN0cm0sIHN0cm0ub3V0cHV0LCBzdHJtLm5leHRfb3V0LCBfb3V0IC0gc3RybS5hdmFpbF9vdXQpKSB7XG4gICAgICBzdGF0ZS5tb2RlID0gTUVNO1xuICAgICAgcmV0dXJuIFpfTUVNX0VSUk9SO1xuICAgIH1cbiAgfVxuICBfaW4gLT0gc3RybS5hdmFpbF9pbjtcbiAgX291dCAtPSBzdHJtLmF2YWlsX291dDtcbiAgc3RybS50b3RhbF9pbiArPSBfaW47XG4gIHN0cm0udG90YWxfb3V0ICs9IF9vdXQ7XG4gIHN0YXRlLnRvdGFsICs9IF9vdXQ7XG4gIGlmIChzdGF0ZS53cmFwICYmIF9vdXQpIHtcbiAgICBzdHJtLmFkbGVyID0gc3RhdGUuY2hlY2sgPSAvKlVQREFURShzdGF0ZS5jaGVjaywgc3RybS5uZXh0X291dCAtIF9vdXQsIF9vdXQpOyovXG4gICAgICAoc3RhdGUuZmxhZ3MgPyBjcmMzMihzdGF0ZS5jaGVjaywgb3V0cHV0LCBfb3V0LCBzdHJtLm5leHRfb3V0IC0gX291dCkgOiBhZGxlcjMyKHN0YXRlLmNoZWNrLCBvdXRwdXQsIF9vdXQsIHN0cm0ubmV4dF9vdXQgLSBfb3V0KSk7XG4gIH1cbiAgc3RybS5kYXRhX3R5cGUgPSBzdGF0ZS5iaXRzICsgKHN0YXRlLmxhc3QgPyA2NCA6IDApICtcbiAgICAgICAgICAgICAgICAgICAgKHN0YXRlLm1vZGUgPT09IFRZUEUgPyAxMjggOiAwKSArXG4gICAgICAgICAgICAgICAgICAgIChzdGF0ZS5tb2RlID09PSBMRU5fIHx8IHN0YXRlLm1vZGUgPT09IENPUFlfID8gMjU2IDogMCk7XG4gIGlmICgoKF9pbiA9PT0gMCAmJiBfb3V0ID09PSAwKSB8fCBmbHVzaCA9PT0gWl9GSU5JU0gpICYmIHJldCA9PT0gWl9PSykge1xuICAgIHJldCA9IFpfQlVGX0VSUk9SO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIGluZmxhdGVFbmQoc3RybSkge1xuXG4gIGlmICghc3RybSB8fCAhc3RybS5zdGF0ZSAvKnx8IHN0cm0tPnpmcmVlID09IChmcmVlX2Z1bmMpMCovKSB7XG4gICAgcmV0dXJuIFpfU1RSRUFNX0VSUk9SO1xuICB9XG5cbiAgdmFyIHN0YXRlID0gc3RybS5zdGF0ZTtcbiAgaWYgKHN0YXRlLndpbmRvdykge1xuICAgIHN0YXRlLndpbmRvdyA9IG51bGw7XG4gIH1cbiAgc3RybS5zdGF0ZSA9IG51bGw7XG4gIHJldHVybiBaX09LO1xufVxuXG5mdW5jdGlvbiBpbmZsYXRlR2V0SGVhZGVyKHN0cm0sIGhlYWQpIHtcbiAgdmFyIHN0YXRlO1xuXG4gIC8qIGNoZWNrIHN0YXRlICovXG4gIGlmICghc3RybSB8fCAhc3RybS5zdGF0ZSkgeyByZXR1cm4gWl9TVFJFQU1fRVJST1I7IH1cbiAgc3RhdGUgPSBzdHJtLnN0YXRlO1xuICBpZiAoKHN0YXRlLndyYXAgJiAyKSA9PT0gMCkgeyByZXR1cm4gWl9TVFJFQU1fRVJST1I7IH1cblxuICAvKiBzYXZlIGhlYWRlciBzdHJ1Y3R1cmUgKi9cbiAgc3RhdGUuaGVhZCA9IGhlYWQ7XG4gIGhlYWQuZG9uZSA9IGZhbHNlO1xuICByZXR1cm4gWl9PSztcbn1cblxuZnVuY3Rpb24gaW5mbGF0ZVNldERpY3Rpb25hcnkoc3RybSwgZGljdGlvbmFyeSkge1xuICB2YXIgZGljdExlbmd0aCA9IGRpY3Rpb25hcnkubGVuZ3RoO1xuXG4gIHZhciBzdGF0ZTtcbiAgdmFyIGRpY3RpZDtcbiAgdmFyIHJldDtcblxuICAvKiBjaGVjayBzdGF0ZSAqL1xuICBpZiAoIXN0cm0gLyogPT0gWl9OVUxMICovIHx8ICFzdHJtLnN0YXRlIC8qID09IFpfTlVMTCAqLykgeyByZXR1cm4gWl9TVFJFQU1fRVJST1I7IH1cbiAgc3RhdGUgPSBzdHJtLnN0YXRlO1xuXG4gIGlmIChzdGF0ZS53cmFwICE9PSAwICYmIHN0YXRlLm1vZGUgIT09IERJQ1QpIHtcbiAgICByZXR1cm4gWl9TVFJFQU1fRVJST1I7XG4gIH1cblxuICAvKiBjaGVjayBmb3IgY29ycmVjdCBkaWN0aW9uYXJ5IGlkZW50aWZpZXIgKi9cbiAgaWYgKHN0YXRlLm1vZGUgPT09IERJQ1QpIHtcbiAgICBkaWN0aWQgPSAxOyAvKiBhZGxlcjMyKDAsIG51bGwsIDApKi9cbiAgICAvKiBkaWN0aWQgPSBhZGxlcjMyKGRpY3RpZCwgZGljdGlvbmFyeSwgZGljdExlbmd0aCk7ICovXG4gICAgZGljdGlkID0gYWRsZXIzMihkaWN0aWQsIGRpY3Rpb25hcnksIGRpY3RMZW5ndGgsIDApO1xuICAgIGlmIChkaWN0aWQgIT09IHN0YXRlLmNoZWNrKSB7XG4gICAgICByZXR1cm4gWl9EQVRBX0VSUk9SO1xuICAgIH1cbiAgfVxuICAvKiBjb3B5IGRpY3Rpb25hcnkgdG8gd2luZG93IHVzaW5nIHVwZGF0ZXdpbmRvdygpLCB3aGljaCB3aWxsIGFtZW5kIHRoZVxuICAgZXhpc3RpbmcgZGljdGlvbmFyeSBpZiBhcHByb3ByaWF0ZSAqL1xuICByZXQgPSB1cGRhdGV3aW5kb3coc3RybSwgZGljdGlvbmFyeSwgZGljdExlbmd0aCwgZGljdExlbmd0aCk7XG4gIGlmIChyZXQpIHtcbiAgICBzdGF0ZS5tb2RlID0gTUVNO1xuICAgIHJldHVybiBaX01FTV9FUlJPUjtcbiAgfVxuICBzdGF0ZS5oYXZlZGljdCA9IDE7XG4gIC8vIFRyYWNldigoc3RkZXJyLCBcImluZmxhdGU6ICAgZGljdGlvbmFyeSBzZXRcXG5cIikpO1xuICByZXR1cm4gWl9PSztcbn1cblxuZXhwb3J0cy5pbmZsYXRlUmVzZXQgPSBpbmZsYXRlUmVzZXQ7XG5leHBvcnRzLmluZmxhdGVSZXNldDIgPSBpbmZsYXRlUmVzZXQyO1xuZXhwb3J0cy5pbmZsYXRlUmVzZXRLZWVwID0gaW5mbGF0ZVJlc2V0S2VlcDtcbmV4cG9ydHMuaW5mbGF0ZUluaXQgPSBpbmZsYXRlSW5pdDtcbmV4cG9ydHMuaW5mbGF0ZUluaXQyID0gaW5mbGF0ZUluaXQyO1xuZXhwb3J0cy5pbmZsYXRlID0gaW5mbGF0ZTtcbmV4cG9ydHMuaW5mbGF0ZUVuZCA9IGluZmxhdGVFbmQ7XG5leHBvcnRzLmluZmxhdGVHZXRIZWFkZXIgPSBpbmZsYXRlR2V0SGVhZGVyO1xuZXhwb3J0cy5pbmZsYXRlU2V0RGljdGlvbmFyeSA9IGluZmxhdGVTZXREaWN0aW9uYXJ5O1xuZXhwb3J0cy5pbmZsYXRlSW5mbyA9ICdwYWtvIGluZmxhdGUgKGZyb20gTm9kZWNhIHByb2plY3QpJztcblxuLyogTm90IGltcGxlbWVudGVkXG5leHBvcnRzLmluZmxhdGVDb3B5ID0gaW5mbGF0ZUNvcHk7XG5leHBvcnRzLmluZmxhdGVHZXREaWN0aW9uYXJ5ID0gaW5mbGF0ZUdldERpY3Rpb25hcnk7XG5leHBvcnRzLmluZmxhdGVNYXJrID0gaW5mbGF0ZU1hcms7XG5leHBvcnRzLmluZmxhdGVQcmltZSA9IGluZmxhdGVQcmltZTtcbmV4cG9ydHMuaW5mbGF0ZVN5bmMgPSBpbmZsYXRlU3luYztcbmV4cG9ydHMuaW5mbGF0ZVN5bmNQb2ludCA9IGluZmxhdGVTeW5jUG9pbnQ7XG5leHBvcnRzLmluZmxhdGVVbmRlcm1pbmUgPSBpbmZsYXRlVW5kZXJtaW5lO1xuKi9cbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gKEMpIDE5OTUtMjAxMyBKZWFuLWxvdXAgR2FpbGx5IGFuZCBNYXJrIEFkbGVyXG4vLyAoQykgMjAxNC0yMDE3IFZpdGFseSBQdXpyaW4gYW5kIEFuZHJleSBUdXBpdHNpblxuLy9cbi8vIFRoaXMgc29mdHdhcmUgaXMgcHJvdmlkZWQgJ2FzLWlzJywgd2l0aG91dCBhbnkgZXhwcmVzcyBvciBpbXBsaWVkXG4vLyB3YXJyYW50eS4gSW4gbm8gZXZlbnQgd2lsbCB0aGUgYXV0aG9ycyBiZSBoZWxkIGxpYWJsZSBmb3IgYW55IGRhbWFnZXNcbi8vIGFyaXNpbmcgZnJvbSB0aGUgdXNlIG9mIHRoaXMgc29mdHdhcmUuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIGFueW9uZSB0byB1c2UgdGhpcyBzb2Z0d2FyZSBmb3IgYW55IHB1cnBvc2UsXG4vLyBpbmNsdWRpbmcgY29tbWVyY2lhbCBhcHBsaWNhdGlvbnMsIGFuZCB0byBhbHRlciBpdCBhbmQgcmVkaXN0cmlidXRlIGl0XG4vLyBmcmVlbHksIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyByZXN0cmljdGlvbnM6XG4vL1xuLy8gMS4gVGhlIG9yaWdpbiBvZiB0aGlzIHNvZnR3YXJlIG11c3Qgbm90IGJlIG1pc3JlcHJlc2VudGVkOyB5b3UgbXVzdCBub3Rcbi8vICAgY2xhaW0gdGhhdCB5b3Ugd3JvdGUgdGhlIG9yaWdpbmFsIHNvZnR3YXJlLiBJZiB5b3UgdXNlIHRoaXMgc29mdHdhcmVcbi8vICAgaW4gYSBwcm9kdWN0LCBhbiBhY2tub3dsZWRnbWVudCBpbiB0aGUgcHJvZHVjdCBkb2N1bWVudGF0aW9uIHdvdWxkIGJlXG4vLyAgIGFwcHJlY2lhdGVkIGJ1dCBpcyBub3QgcmVxdWlyZWQuXG4vLyAyLiBBbHRlcmVkIHNvdXJjZSB2ZXJzaW9ucyBtdXN0IGJlIHBsYWlubHkgbWFya2VkIGFzIHN1Y2gsIGFuZCBtdXN0IG5vdCBiZVxuLy8gICBtaXNyZXByZXNlbnRlZCBhcyBiZWluZyB0aGUgb3JpZ2luYWwgc29mdHdhcmUuXG4vLyAzLiBUaGlzIG5vdGljZSBtYXkgbm90IGJlIHJlbW92ZWQgb3IgYWx0ZXJlZCBmcm9tIGFueSBzb3VyY2UgZGlzdHJpYnV0aW9uLlxuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy9jb21tb24nKTtcblxudmFyIE1BWEJJVFMgPSAxNTtcbnZhciBFTk9VR0hfTEVOUyA9IDg1MjtcbnZhciBFTk9VR0hfRElTVFMgPSA1OTI7XG4vL3ZhciBFTk9VR0ggPSAoRU5PVUdIX0xFTlMrRU5PVUdIX0RJU1RTKTtcblxudmFyIENPREVTID0gMDtcbnZhciBMRU5TID0gMTtcbnZhciBESVNUUyA9IDI7XG5cbnZhciBsYmFzZSA9IFsgLyogTGVuZ3RoIGNvZGVzIDI1Ny4uMjg1IGJhc2UgKi9cbiAgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMywgMTUsIDE3LCAxOSwgMjMsIDI3LCAzMSxcbiAgMzUsIDQzLCA1MSwgNTksIDY3LCA4MywgOTksIDExNSwgMTMxLCAxNjMsIDE5NSwgMjI3LCAyNTgsIDAsIDBcbl07XG5cbnZhciBsZXh0ID0gWyAvKiBMZW5ndGggY29kZXMgMjU3Li4yODUgZXh0cmEgKi9cbiAgMTYsIDE2LCAxNiwgMTYsIDE2LCAxNiwgMTYsIDE2LCAxNywgMTcsIDE3LCAxNywgMTgsIDE4LCAxOCwgMTgsXG4gIDE5LCAxOSwgMTksIDE5LCAyMCwgMjAsIDIwLCAyMCwgMjEsIDIxLCAyMSwgMjEsIDE2LCA3MiwgNzhcbl07XG5cbnZhciBkYmFzZSA9IFsgLyogRGlzdGFuY2UgY29kZXMgMC4uMjkgYmFzZSAqL1xuICAxLCAyLCAzLCA0LCA1LCA3LCA5LCAxMywgMTcsIDI1LCAzMywgNDksIDY1LCA5NywgMTI5LCAxOTMsXG4gIDI1NywgMzg1LCA1MTMsIDc2OSwgMTAyNSwgMTUzNywgMjA0OSwgMzA3MywgNDA5NywgNjE0NSxcbiAgODE5MywgMTIyODksIDE2Mzg1LCAyNDU3NywgMCwgMFxuXTtcblxudmFyIGRleHQgPSBbIC8qIERpc3RhbmNlIGNvZGVzIDAuLjI5IGV4dHJhICovXG4gIDE2LCAxNiwgMTYsIDE2LCAxNywgMTcsIDE4LCAxOCwgMTksIDE5LCAyMCwgMjAsIDIxLCAyMSwgMjIsIDIyLFxuICAyMywgMjMsIDI0LCAyNCwgMjUsIDI1LCAyNiwgMjYsIDI3LCAyNyxcbiAgMjgsIDI4LCAyOSwgMjksIDY0LCA2NFxuXTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmZsYXRlX3RhYmxlKHR5cGUsIGxlbnMsIGxlbnNfaW5kZXgsIGNvZGVzLCB0YWJsZSwgdGFibGVfaW5kZXgsIHdvcmssIG9wdHMpXG57XG4gIHZhciBiaXRzID0gb3B0cy5iaXRzO1xuICAgICAgLy9oZXJlID0gb3B0cy5oZXJlOyAvKiB0YWJsZSBlbnRyeSBmb3IgZHVwbGljYXRpb24gKi9cblxuICB2YXIgbGVuID0gMDsgICAgICAgICAgICAgICAvKiBhIGNvZGUncyBsZW5ndGggaW4gYml0cyAqL1xuICB2YXIgc3ltID0gMDsgICAgICAgICAgICAgICAvKiBpbmRleCBvZiBjb2RlIHN5bWJvbHMgKi9cbiAgdmFyIG1pbiA9IDAsIG1heCA9IDA7ICAgICAgICAgIC8qIG1pbmltdW0gYW5kIG1heGltdW0gY29kZSBsZW5ndGhzICovXG4gIHZhciByb290ID0gMDsgICAgICAgICAgICAgIC8qIG51bWJlciBvZiBpbmRleCBiaXRzIGZvciByb290IHRhYmxlICovXG4gIHZhciBjdXJyID0gMDsgICAgICAgICAgICAgIC8qIG51bWJlciBvZiBpbmRleCBiaXRzIGZvciBjdXJyZW50IHRhYmxlICovXG4gIHZhciBkcm9wID0gMDsgICAgICAgICAgICAgIC8qIGNvZGUgYml0cyB0byBkcm9wIGZvciBzdWItdGFibGUgKi9cbiAgdmFyIGxlZnQgPSAwOyAgICAgICAgICAgICAgICAgICAvKiBudW1iZXIgb2YgcHJlZml4IGNvZGVzIGF2YWlsYWJsZSAqL1xuICB2YXIgdXNlZCA9IDA7ICAgICAgICAgICAgICAvKiBjb2RlIGVudHJpZXMgaW4gdGFibGUgdXNlZCAqL1xuICB2YXIgaHVmZiA9IDA7ICAgICAgICAgICAgICAvKiBIdWZmbWFuIGNvZGUgKi9cbiAgdmFyIGluY3I7ICAgICAgICAgICAgICAvKiBmb3IgaW5jcmVtZW50aW5nIGNvZGUsIGluZGV4ICovXG4gIHZhciBmaWxsOyAgICAgICAgICAgICAgLyogaW5kZXggZm9yIHJlcGxpY2F0aW5nIGVudHJpZXMgKi9cbiAgdmFyIGxvdzsgICAgICAgICAgICAgICAvKiBsb3cgYml0cyBmb3IgY3VycmVudCByb290IGVudHJ5ICovXG4gIHZhciBtYXNrOyAgICAgICAgICAgICAgLyogbWFzayBmb3IgbG93IHJvb3QgYml0cyAqL1xuICB2YXIgbmV4dDsgICAgICAgICAgICAgLyogbmV4dCBhdmFpbGFibGUgc3BhY2UgaW4gdGFibGUgKi9cbiAgdmFyIGJhc2UgPSBudWxsOyAgICAgLyogYmFzZSB2YWx1ZSB0YWJsZSB0byB1c2UgKi9cbiAgdmFyIGJhc2VfaW5kZXggPSAwO1xuLy8gIHZhciBzaG9leHRyYTsgICAgLyogZXh0cmEgYml0cyB0YWJsZSB0byB1c2UgKi9cbiAgdmFyIGVuZDsgICAgICAgICAgICAgICAgICAgIC8qIHVzZSBiYXNlIGFuZCBleHRyYSBmb3Igc3ltYm9sID4gZW5kICovXG4gIHZhciBjb3VudCA9IG5ldyB1dGlscy5CdWYxNihNQVhCSVRTICsgMSk7IC8vW01BWEJJVFMrMV07ICAgIC8qIG51bWJlciBvZiBjb2RlcyBvZiBlYWNoIGxlbmd0aCAqL1xuICB2YXIgb2ZmcyA9IG5ldyB1dGlscy5CdWYxNihNQVhCSVRTICsgMSk7IC8vW01BWEJJVFMrMV07ICAgICAvKiBvZmZzZXRzIGluIHRhYmxlIGZvciBlYWNoIGxlbmd0aCAqL1xuICB2YXIgZXh0cmEgPSBudWxsO1xuICB2YXIgZXh0cmFfaW5kZXggPSAwO1xuXG4gIHZhciBoZXJlX2JpdHMsIGhlcmVfb3AsIGhlcmVfdmFsO1xuXG4gIC8qXG4gICBQcm9jZXNzIGEgc2V0IG9mIGNvZGUgbGVuZ3RocyB0byBjcmVhdGUgYSBjYW5vbmljYWwgSHVmZm1hbiBjb2RlLiAgVGhlXG4gICBjb2RlIGxlbmd0aHMgYXJlIGxlbnNbMC4uY29kZXMtMV0uICBFYWNoIGxlbmd0aCBjb3JyZXNwb25kcyB0byB0aGVcbiAgIHN5bWJvbHMgMC4uY29kZXMtMS4gIFRoZSBIdWZmbWFuIGNvZGUgaXMgZ2VuZXJhdGVkIGJ5IGZpcnN0IHNvcnRpbmcgdGhlXG4gICBzeW1ib2xzIGJ5IGxlbmd0aCBmcm9tIHNob3J0IHRvIGxvbmcsIGFuZCByZXRhaW5pbmcgdGhlIHN5bWJvbCBvcmRlclxuICAgZm9yIGNvZGVzIHdpdGggZXF1YWwgbGVuZ3Rocy4gIFRoZW4gdGhlIGNvZGUgc3RhcnRzIHdpdGggYWxsIHplcm8gYml0c1xuICAgZm9yIHRoZSBmaXJzdCBjb2RlIG9mIHRoZSBzaG9ydGVzdCBsZW5ndGgsIGFuZCB0aGUgY29kZXMgYXJlIGludGVnZXJcbiAgIGluY3JlbWVudHMgZm9yIHRoZSBzYW1lIGxlbmd0aCwgYW5kIHplcm9zIGFyZSBhcHBlbmRlZCBhcyB0aGUgbGVuZ3RoXG4gICBpbmNyZWFzZXMuICBGb3IgdGhlIGRlZmxhdGUgZm9ybWF0LCB0aGVzZSBiaXRzIGFyZSBzdG9yZWQgYmFja3dhcmRzXG4gICBmcm9tIHRoZWlyIG1vcmUgbmF0dXJhbCBpbnRlZ2VyIGluY3JlbWVudCBvcmRlcmluZywgYW5kIHNvIHdoZW4gdGhlXG4gICBkZWNvZGluZyB0YWJsZXMgYXJlIGJ1aWx0IGluIHRoZSBsYXJnZSBsb29wIGJlbG93LCB0aGUgaW50ZWdlciBjb2Rlc1xuICAgYXJlIGluY3JlbWVudGVkIGJhY2t3YXJkcy5cblxuICAgVGhpcyByb3V0aW5lIGFzc3VtZXMsIGJ1dCBkb2VzIG5vdCBjaGVjaywgdGhhdCBhbGwgb2YgdGhlIGVudHJpZXMgaW5cbiAgIGxlbnNbXSBhcmUgaW4gdGhlIHJhbmdlIDAuLk1BWEJJVFMuICBUaGUgY2FsbGVyIG11c3QgYXNzdXJlIHRoaXMuXG4gICAxLi5NQVhCSVRTIGlzIGludGVycHJldGVkIGFzIHRoYXQgY29kZSBsZW5ndGguICB6ZXJvIG1lYW5zIHRoYXQgdGhhdFxuICAgc3ltYm9sIGRvZXMgbm90IG9jY3VyIGluIHRoaXMgY29kZS5cblxuICAgVGhlIGNvZGVzIGFyZSBzb3J0ZWQgYnkgY29tcHV0aW5nIGEgY291bnQgb2YgY29kZXMgZm9yIGVhY2ggbGVuZ3RoLFxuICAgY3JlYXRpbmcgZnJvbSB0aGF0IGEgdGFibGUgb2Ygc3RhcnRpbmcgaW5kaWNlcyBmb3IgZWFjaCBsZW5ndGggaW4gdGhlXG4gICBzb3J0ZWQgdGFibGUsIGFuZCB0aGVuIGVudGVyaW5nIHRoZSBzeW1ib2xzIGluIG9yZGVyIGluIHRoZSBzb3J0ZWRcbiAgIHRhYmxlLiAgVGhlIHNvcnRlZCB0YWJsZSBpcyB3b3JrW10sIHdpdGggdGhhdCBzcGFjZSBiZWluZyBwcm92aWRlZCBieVxuICAgdGhlIGNhbGxlci5cblxuICAgVGhlIGxlbmd0aCBjb3VudHMgYXJlIHVzZWQgZm9yIG90aGVyIHB1cnBvc2VzIGFzIHdlbGwsIGkuZS4gZmluZGluZ1xuICAgdGhlIG1pbmltdW0gYW5kIG1heGltdW0gbGVuZ3RoIGNvZGVzLCBkZXRlcm1pbmluZyBpZiB0aGVyZSBhcmUgYW55XG4gICBjb2RlcyBhdCBhbGwsIGNoZWNraW5nIGZvciBhIHZhbGlkIHNldCBvZiBsZW5ndGhzLCBhbmQgbG9va2luZyBhaGVhZFxuICAgYXQgbGVuZ3RoIGNvdW50cyB0byBkZXRlcm1pbmUgc3ViLXRhYmxlIHNpemVzIHdoZW4gYnVpbGRpbmcgdGhlXG4gICBkZWNvZGluZyB0YWJsZXMuXG4gICAqL1xuXG4gIC8qIGFjY3VtdWxhdGUgbGVuZ3RocyBmb3IgY29kZXMgKGFzc3VtZXMgbGVuc1tdIGFsbCBpbiAwLi5NQVhCSVRTKSAqL1xuICBmb3IgKGxlbiA9IDA7IGxlbiA8PSBNQVhCSVRTOyBsZW4rKykge1xuICAgIGNvdW50W2xlbl0gPSAwO1xuICB9XG4gIGZvciAoc3ltID0gMDsgc3ltIDwgY29kZXM7IHN5bSsrKSB7XG4gICAgY291bnRbbGVuc1tsZW5zX2luZGV4ICsgc3ltXV0rKztcbiAgfVxuXG4gIC8qIGJvdW5kIGNvZGUgbGVuZ3RocywgZm9yY2Ugcm9vdCB0byBiZSB3aXRoaW4gY29kZSBsZW5ndGhzICovXG4gIHJvb3QgPSBiaXRzO1xuICBmb3IgKG1heCA9IE1BWEJJVFM7IG1heCA+PSAxOyBtYXgtLSkge1xuICAgIGlmIChjb3VudFttYXhdICE9PSAwKSB7IGJyZWFrOyB9XG4gIH1cbiAgaWYgKHJvb3QgPiBtYXgpIHtcbiAgICByb290ID0gbWF4O1xuICB9XG4gIGlmIChtYXggPT09IDApIHsgICAgICAgICAgICAgICAgICAgICAvKiBubyBzeW1ib2xzIHRvIGNvZGUgYXQgYWxsICovXG4gICAgLy90YWJsZS5vcFtvcHRzLnRhYmxlX2luZGV4XSA9IDY0OyAgLy9oZXJlLm9wID0gKHZhciBjaGFyKTY0OyAgICAvKiBpbnZhbGlkIGNvZGUgbWFya2VyICovXG4gICAgLy90YWJsZS5iaXRzW29wdHMudGFibGVfaW5kZXhdID0gMTsgICAvL2hlcmUuYml0cyA9ICh2YXIgY2hhcikxO1xuICAgIC8vdGFibGUudmFsW29wdHMudGFibGVfaW5kZXgrK10gPSAwOyAgIC8vaGVyZS52YWwgPSAodmFyIHNob3J0KTA7XG4gICAgdGFibGVbdGFibGVfaW5kZXgrK10gPSAoMSA8PCAyNCkgfCAoNjQgPDwgMTYpIHwgMDtcblxuXG4gICAgLy90YWJsZS5vcFtvcHRzLnRhYmxlX2luZGV4XSA9IDY0O1xuICAgIC8vdGFibGUuYml0c1tvcHRzLnRhYmxlX2luZGV4XSA9IDE7XG4gICAgLy90YWJsZS52YWxbb3B0cy50YWJsZV9pbmRleCsrXSA9IDA7XG4gICAgdGFibGVbdGFibGVfaW5kZXgrK10gPSAoMSA8PCAyNCkgfCAoNjQgPDwgMTYpIHwgMDtcblxuICAgIG9wdHMuYml0cyA9IDE7XG4gICAgcmV0dXJuIDA7ICAgICAvKiBubyBzeW1ib2xzLCBidXQgd2FpdCBmb3IgZGVjb2RpbmcgdG8gcmVwb3J0IGVycm9yICovXG4gIH1cbiAgZm9yIChtaW4gPSAxOyBtaW4gPCBtYXg7IG1pbisrKSB7XG4gICAgaWYgKGNvdW50W21pbl0gIT09IDApIHsgYnJlYWs7IH1cbiAgfVxuICBpZiAocm9vdCA8IG1pbikge1xuICAgIHJvb3QgPSBtaW47XG4gIH1cblxuICAvKiBjaGVjayBmb3IgYW4gb3Zlci1zdWJzY3JpYmVkIG9yIGluY29tcGxldGUgc2V0IG9mIGxlbmd0aHMgKi9cbiAgbGVmdCA9IDE7XG4gIGZvciAobGVuID0gMTsgbGVuIDw9IE1BWEJJVFM7IGxlbisrKSB7XG4gICAgbGVmdCA8PD0gMTtcbiAgICBsZWZ0IC09IGNvdW50W2xlbl07XG4gICAgaWYgKGxlZnQgPCAwKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfSAgICAgICAgLyogb3Zlci1zdWJzY3JpYmVkICovXG4gIH1cbiAgaWYgKGxlZnQgPiAwICYmICh0eXBlID09PSBDT0RFUyB8fCBtYXggIT09IDEpKSB7XG4gICAgcmV0dXJuIC0xOyAgICAgICAgICAgICAgICAgICAgICAvKiBpbmNvbXBsZXRlIHNldCAqL1xuICB9XG5cbiAgLyogZ2VuZXJhdGUgb2Zmc2V0cyBpbnRvIHN5bWJvbCB0YWJsZSBmb3IgZWFjaCBsZW5ndGggZm9yIHNvcnRpbmcgKi9cbiAgb2Zmc1sxXSA9IDA7XG4gIGZvciAobGVuID0gMTsgbGVuIDwgTUFYQklUUzsgbGVuKyspIHtcbiAgICBvZmZzW2xlbiArIDFdID0gb2Zmc1tsZW5dICsgY291bnRbbGVuXTtcbiAgfVxuXG4gIC8qIHNvcnQgc3ltYm9scyBieSBsZW5ndGgsIGJ5IHN5bWJvbCBvcmRlciB3aXRoaW4gZWFjaCBsZW5ndGggKi9cbiAgZm9yIChzeW0gPSAwOyBzeW0gPCBjb2Rlczsgc3ltKyspIHtcbiAgICBpZiAobGVuc1tsZW5zX2luZGV4ICsgc3ltXSAhPT0gMCkge1xuICAgICAgd29ya1tvZmZzW2xlbnNbbGVuc19pbmRleCArIHN5bV1dKytdID0gc3ltO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICBDcmVhdGUgYW5kIGZpbGwgaW4gZGVjb2RpbmcgdGFibGVzLiAgSW4gdGhpcyBsb29wLCB0aGUgdGFibGUgYmVpbmdcbiAgIGZpbGxlZCBpcyBhdCBuZXh0IGFuZCBoYXMgY3VyciBpbmRleCBiaXRzLiAgVGhlIGNvZGUgYmVpbmcgdXNlZCBpcyBodWZmXG4gICB3aXRoIGxlbmd0aCBsZW4uICBUaGF0IGNvZGUgaXMgY29udmVydGVkIHRvIGFuIGluZGV4IGJ5IGRyb3BwaW5nIGRyb3BcbiAgIGJpdHMgb2ZmIG9mIHRoZSBib3R0b20uICBGb3IgY29kZXMgd2hlcmUgbGVuIGlzIGxlc3MgdGhhbiBkcm9wICsgY3VycixcbiAgIHRob3NlIHRvcCBkcm9wICsgY3VyciAtIGxlbiBiaXRzIGFyZSBpbmNyZW1lbnRlZCB0aHJvdWdoIGFsbCB2YWx1ZXMgdG9cbiAgIGZpbGwgdGhlIHRhYmxlIHdpdGggcmVwbGljYXRlZCBlbnRyaWVzLlxuXG4gICByb290IGlzIHRoZSBudW1iZXIgb2YgaW5kZXggYml0cyBmb3IgdGhlIHJvb3QgdGFibGUuICBXaGVuIGxlbiBleGNlZWRzXG4gICByb290LCBzdWItdGFibGVzIGFyZSBjcmVhdGVkIHBvaW50ZWQgdG8gYnkgdGhlIHJvb3QgZW50cnkgd2l0aCBhbiBpbmRleFxuICAgb2YgdGhlIGxvdyByb290IGJpdHMgb2YgaHVmZi4gIFRoaXMgaXMgc2F2ZWQgaW4gbG93IHRvIGNoZWNrIGZvciB3aGVuIGFcbiAgIG5ldyBzdWItdGFibGUgc2hvdWxkIGJlIHN0YXJ0ZWQuICBkcm9wIGlzIHplcm8gd2hlbiB0aGUgcm9vdCB0YWJsZSBpc1xuICAgYmVpbmcgZmlsbGVkLCBhbmQgZHJvcCBpcyByb290IHdoZW4gc3ViLXRhYmxlcyBhcmUgYmVpbmcgZmlsbGVkLlxuXG4gICBXaGVuIGEgbmV3IHN1Yi10YWJsZSBpcyBuZWVkZWQsIGl0IGlzIG5lY2Vzc2FyeSB0byBsb29rIGFoZWFkIGluIHRoZVxuICAgY29kZSBsZW5ndGhzIHRvIGRldGVybWluZSB3aGF0IHNpemUgc3ViLXRhYmxlIGlzIG5lZWRlZC4gIFRoZSBsZW5ndGhcbiAgIGNvdW50cyBhcmUgdXNlZCBmb3IgdGhpcywgYW5kIHNvIGNvdW50W10gaXMgZGVjcmVtZW50ZWQgYXMgY29kZXMgYXJlXG4gICBlbnRlcmVkIGluIHRoZSB0YWJsZXMuXG5cbiAgIHVzZWQga2VlcHMgdHJhY2sgb2YgaG93IG1hbnkgdGFibGUgZW50cmllcyBoYXZlIGJlZW4gYWxsb2NhdGVkIGZyb20gdGhlXG4gICBwcm92aWRlZCAqdGFibGUgc3BhY2UuICBJdCBpcyBjaGVja2VkIGZvciBMRU5TIGFuZCBESVNUIHRhYmxlcyBhZ2FpbnN0XG4gICB0aGUgY29uc3RhbnRzIEVOT1VHSF9MRU5TIGFuZCBFTk9VR0hfRElTVFMgdG8gZ3VhcmQgYWdhaW5zdCBjaGFuZ2VzIGluXG4gICB0aGUgaW5pdGlhbCByb290IHRhYmxlIHNpemUgY29uc3RhbnRzLiAgU2VlIHRoZSBjb21tZW50cyBpbiBpbmZ0cmVlcy5oXG4gICBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cblxuICAgc3ltIGluY3JlbWVudHMgdGhyb3VnaCBhbGwgc3ltYm9scywgYW5kIHRoZSBsb29wIHRlcm1pbmF0ZXMgd2hlblxuICAgYWxsIGNvZGVzIG9mIGxlbmd0aCBtYXgsIGkuZS4gYWxsIGNvZGVzLCBoYXZlIGJlZW4gcHJvY2Vzc2VkLiAgVGhpc1xuICAgcm91dGluZSBwZXJtaXRzIGluY29tcGxldGUgY29kZXMsIHNvIGFub3RoZXIgbG9vcCBhZnRlciB0aGlzIG9uZSBmaWxsc1xuICAgaW4gdGhlIHJlc3Qgb2YgdGhlIGRlY29kaW5nIHRhYmxlcyB3aXRoIGludmFsaWQgY29kZSBtYXJrZXJzLlxuICAgKi9cblxuICAvKiBzZXQgdXAgZm9yIGNvZGUgdHlwZSAqL1xuICAvLyBwb29yIG1hbiBvcHRpbWl6YXRpb24gLSB1c2UgaWYtZWxzZSBpbnN0ZWFkIG9mIHN3aXRjaCxcbiAgLy8gdG8gYXZvaWQgZGVvcHRzIGluIG9sZCB2OFxuICBpZiAodHlwZSA9PT0gQ09ERVMpIHtcbiAgICBiYXNlID0gZXh0cmEgPSB3b3JrOyAgICAvKiBkdW1teSB2YWx1ZS0tbm90IHVzZWQgKi9cbiAgICBlbmQgPSAxOTtcblxuICB9IGVsc2UgaWYgKHR5cGUgPT09IExFTlMpIHtcbiAgICBiYXNlID0gbGJhc2U7XG4gICAgYmFzZV9pbmRleCAtPSAyNTc7XG4gICAgZXh0cmEgPSBsZXh0O1xuICAgIGV4dHJhX2luZGV4IC09IDI1NztcbiAgICBlbmQgPSAyNTY7XG5cbiAgfSBlbHNlIHsgICAgICAgICAgICAgICAgICAgIC8qIERJU1RTICovXG4gICAgYmFzZSA9IGRiYXNlO1xuICAgIGV4dHJhID0gZGV4dDtcbiAgICBlbmQgPSAtMTtcbiAgfVxuXG4gIC8qIGluaXRpYWxpemUgb3B0cyBmb3IgbG9vcCAqL1xuICBodWZmID0gMDsgICAgICAgICAgICAgICAgICAgLyogc3RhcnRpbmcgY29kZSAqL1xuICBzeW0gPSAwOyAgICAgICAgICAgICAgICAgICAgLyogc3RhcnRpbmcgY29kZSBzeW1ib2wgKi9cbiAgbGVuID0gbWluOyAgICAgICAgICAgICAgICAgIC8qIHN0YXJ0aW5nIGNvZGUgbGVuZ3RoICovXG4gIG5leHQgPSB0YWJsZV9pbmRleDsgICAgICAgICAgICAgIC8qIGN1cnJlbnQgdGFibGUgdG8gZmlsbCBpbiAqL1xuICBjdXJyID0gcm9vdDsgICAgICAgICAgICAgICAgLyogY3VycmVudCB0YWJsZSBpbmRleCBiaXRzICovXG4gIGRyb3AgPSAwOyAgICAgICAgICAgICAgICAgICAvKiBjdXJyZW50IGJpdHMgdG8gZHJvcCBmcm9tIGNvZGUgZm9yIGluZGV4ICovXG4gIGxvdyA9IC0xOyAgICAgICAgICAgICAgICAgICAvKiB0cmlnZ2VyIG5ldyBzdWItdGFibGUgd2hlbiBsZW4gPiByb290ICovXG4gIHVzZWQgPSAxIDw8IHJvb3Q7ICAgICAgICAgIC8qIHVzZSByb290IHRhYmxlIGVudHJpZXMgKi9cbiAgbWFzayA9IHVzZWQgLSAxOyAgICAgICAgICAgIC8qIG1hc2sgZm9yIGNvbXBhcmluZyBsb3cgKi9cblxuICAvKiBjaGVjayBhdmFpbGFibGUgdGFibGUgc3BhY2UgKi9cbiAgaWYgKCh0eXBlID09PSBMRU5TICYmIHVzZWQgPiBFTk9VR0hfTEVOUykgfHxcbiAgICAodHlwZSA9PT0gRElTVFMgJiYgdXNlZCA+IEVOT1VHSF9ESVNUUykpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIC8qIHByb2Nlc3MgYWxsIGNvZGVzIGFuZCBtYWtlIHRhYmxlIGVudHJpZXMgKi9cbiAgZm9yICg7Oykge1xuICAgIC8qIGNyZWF0ZSB0YWJsZSBlbnRyeSAqL1xuICAgIGhlcmVfYml0cyA9IGxlbiAtIGRyb3A7XG4gICAgaWYgKHdvcmtbc3ltXSA8IGVuZCkge1xuICAgICAgaGVyZV9vcCA9IDA7XG4gICAgICBoZXJlX3ZhbCA9IHdvcmtbc3ltXTtcbiAgICB9XG4gICAgZWxzZSBpZiAod29ya1tzeW1dID4gZW5kKSB7XG4gICAgICBoZXJlX29wID0gZXh0cmFbZXh0cmFfaW5kZXggKyB3b3JrW3N5bV1dO1xuICAgICAgaGVyZV92YWwgPSBiYXNlW2Jhc2VfaW5kZXggKyB3b3JrW3N5bV1dO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGhlcmVfb3AgPSAzMiArIDY0OyAgICAgICAgIC8qIGVuZCBvZiBibG9jayAqL1xuICAgICAgaGVyZV92YWwgPSAwO1xuICAgIH1cblxuICAgIC8qIHJlcGxpY2F0ZSBmb3IgdGhvc2UgaW5kaWNlcyB3aXRoIGxvdyBsZW4gYml0cyBlcXVhbCB0byBodWZmICovXG4gICAgaW5jciA9IDEgPDwgKGxlbiAtIGRyb3ApO1xuICAgIGZpbGwgPSAxIDw8IGN1cnI7XG4gICAgbWluID0gZmlsbDsgICAgICAgICAgICAgICAgIC8qIHNhdmUgb2Zmc2V0IHRvIG5leHQgdGFibGUgKi9cbiAgICBkbyB7XG4gICAgICBmaWxsIC09IGluY3I7XG4gICAgICB0YWJsZVtuZXh0ICsgKGh1ZmYgPj4gZHJvcCkgKyBmaWxsXSA9IChoZXJlX2JpdHMgPDwgMjQpIHwgKGhlcmVfb3AgPDwgMTYpIHwgaGVyZV92YWwgfDA7XG4gICAgfSB3aGlsZSAoZmlsbCAhPT0gMCk7XG5cbiAgICAvKiBiYWNrd2FyZHMgaW5jcmVtZW50IHRoZSBsZW4tYml0IGNvZGUgaHVmZiAqL1xuICAgIGluY3IgPSAxIDw8IChsZW4gLSAxKTtcbiAgICB3aGlsZSAoaHVmZiAmIGluY3IpIHtcbiAgICAgIGluY3IgPj49IDE7XG4gICAgfVxuICAgIGlmIChpbmNyICE9PSAwKSB7XG4gICAgICBodWZmICY9IGluY3IgLSAxO1xuICAgICAgaHVmZiArPSBpbmNyO1xuICAgIH0gZWxzZSB7XG4gICAgICBodWZmID0gMDtcbiAgICB9XG5cbiAgICAvKiBnbyB0byBuZXh0IHN5bWJvbCwgdXBkYXRlIGNvdW50LCBsZW4gKi9cbiAgICBzeW0rKztcbiAgICBpZiAoLS1jb3VudFtsZW5dID09PSAwKSB7XG4gICAgICBpZiAobGVuID09PSBtYXgpIHsgYnJlYWs7IH1cbiAgICAgIGxlbiA9IGxlbnNbbGVuc19pbmRleCArIHdvcmtbc3ltXV07XG4gICAgfVxuXG4gICAgLyogY3JlYXRlIG5ldyBzdWItdGFibGUgaWYgbmVlZGVkICovXG4gICAgaWYgKGxlbiA+IHJvb3QgJiYgKGh1ZmYgJiBtYXNrKSAhPT0gbG93KSB7XG4gICAgICAvKiBpZiBmaXJzdCB0aW1lLCB0cmFuc2l0aW9uIHRvIHN1Yi10YWJsZXMgKi9cbiAgICAgIGlmIChkcm9wID09PSAwKSB7XG4gICAgICAgIGRyb3AgPSByb290O1xuICAgICAgfVxuXG4gICAgICAvKiBpbmNyZW1lbnQgcGFzdCBsYXN0IHRhYmxlICovXG4gICAgICBuZXh0ICs9IG1pbjsgICAgICAgICAgICAvKiBoZXJlIG1pbiBpcyAxIDw8IGN1cnIgKi9cblxuICAgICAgLyogZGV0ZXJtaW5lIGxlbmd0aCBvZiBuZXh0IHRhYmxlICovXG4gICAgICBjdXJyID0gbGVuIC0gZHJvcDtcbiAgICAgIGxlZnQgPSAxIDw8IGN1cnI7XG4gICAgICB3aGlsZSAoY3VyciArIGRyb3AgPCBtYXgpIHtcbiAgICAgICAgbGVmdCAtPSBjb3VudFtjdXJyICsgZHJvcF07XG4gICAgICAgIGlmIChsZWZ0IDw9IDApIHsgYnJlYWs7IH1cbiAgICAgICAgY3VycisrO1xuICAgICAgICBsZWZ0IDw8PSAxO1xuICAgICAgfVxuXG4gICAgICAvKiBjaGVjayBmb3IgZW5vdWdoIHNwYWNlICovXG4gICAgICB1c2VkICs9IDEgPDwgY3VycjtcbiAgICAgIGlmICgodHlwZSA9PT0gTEVOUyAmJiB1c2VkID4gRU5PVUdIX0xFTlMpIHx8XG4gICAgICAgICh0eXBlID09PSBESVNUUyAmJiB1c2VkID4gRU5PVUdIX0RJU1RTKSkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cblxuICAgICAgLyogcG9pbnQgZW50cnkgaW4gcm9vdCB0YWJsZSB0byBzdWItdGFibGUgKi9cbiAgICAgIGxvdyA9IGh1ZmYgJiBtYXNrO1xuICAgICAgLyp0YWJsZS5vcFtsb3ddID0gY3VycjtcbiAgICAgIHRhYmxlLmJpdHNbbG93XSA9IHJvb3Q7XG4gICAgICB0YWJsZS52YWxbbG93XSA9IG5leHQgLSBvcHRzLnRhYmxlX2luZGV4OyovXG4gICAgICB0YWJsZVtsb3ddID0gKHJvb3QgPDwgMjQpIHwgKGN1cnIgPDwgMTYpIHwgKG5leHQgLSB0YWJsZV9pbmRleCkgfDA7XG4gICAgfVxuICB9XG5cbiAgLyogZmlsbCBpbiByZW1haW5pbmcgdGFibGUgZW50cnkgaWYgY29kZSBpcyBpbmNvbXBsZXRlIChndWFyYW50ZWVkIHRvIGhhdmVcbiAgIGF0IG1vc3Qgb25lIHJlbWFpbmluZyBlbnRyeSwgc2luY2UgaWYgdGhlIGNvZGUgaXMgaW5jb21wbGV0ZSwgdGhlXG4gICBtYXhpbXVtIGNvZGUgbGVuZ3RoIHRoYXQgd2FzIGFsbG93ZWQgdG8gZ2V0IHRoaXMgZmFyIGlzIG9uZSBiaXQpICovXG4gIGlmIChodWZmICE9PSAwKSB7XG4gICAgLy90YWJsZS5vcFtuZXh0ICsgaHVmZl0gPSA2NDsgICAgICAgICAgICAvKiBpbnZhbGlkIGNvZGUgbWFya2VyICovXG4gICAgLy90YWJsZS5iaXRzW25leHQgKyBodWZmXSA9IGxlbiAtIGRyb3A7XG4gICAgLy90YWJsZS52YWxbbmV4dCArIGh1ZmZdID0gMDtcbiAgICB0YWJsZVtuZXh0ICsgaHVmZl0gPSAoKGxlbiAtIGRyb3ApIDw8IDI0KSB8ICg2NCA8PCAxNikgfDA7XG4gIH1cblxuICAvKiBzZXQgcmV0dXJuIHBhcmFtZXRlcnMgKi9cbiAgLy9vcHRzLnRhYmxlX2luZGV4ICs9IHVzZWQ7XG4gIG9wdHMuYml0cyA9IHJvb3Q7XG4gIHJldHVybiAwO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gKEMpIDE5OTUtMjAxMyBKZWFuLWxvdXAgR2FpbGx5IGFuZCBNYXJrIEFkbGVyXG4vLyAoQykgMjAxNC0yMDE3IFZpdGFseSBQdXpyaW4gYW5kIEFuZHJleSBUdXBpdHNpblxuLy9cbi8vIFRoaXMgc29mdHdhcmUgaXMgcHJvdmlkZWQgJ2FzLWlzJywgd2l0aG91dCBhbnkgZXhwcmVzcyBvciBpbXBsaWVkXG4vLyB3YXJyYW50eS4gSW4gbm8gZXZlbnQgd2lsbCB0aGUgYXV0aG9ycyBiZSBoZWxkIGxpYWJsZSBmb3IgYW55IGRhbWFnZXNcbi8vIGFyaXNpbmcgZnJvbSB0aGUgdXNlIG9mIHRoaXMgc29mdHdhcmUuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIGFueW9uZSB0byB1c2UgdGhpcyBzb2Z0d2FyZSBmb3IgYW55IHB1cnBvc2UsXG4vLyBpbmNsdWRpbmcgY29tbWVyY2lhbCBhcHBsaWNhdGlvbnMsIGFuZCB0byBhbHRlciBpdCBhbmQgcmVkaXN0cmlidXRlIGl0XG4vLyBmcmVlbHksIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyByZXN0cmljdGlvbnM6XG4vL1xuLy8gMS4gVGhlIG9yaWdpbiBvZiB0aGlzIHNvZnR3YXJlIG11c3Qgbm90IGJlIG1pc3JlcHJlc2VudGVkOyB5b3UgbXVzdCBub3Rcbi8vICAgY2xhaW0gdGhhdCB5b3Ugd3JvdGUgdGhlIG9yaWdpbmFsIHNvZnR3YXJlLiBJZiB5b3UgdXNlIHRoaXMgc29mdHdhcmVcbi8vICAgaW4gYSBwcm9kdWN0LCBhbiBhY2tub3dsZWRnbWVudCBpbiB0aGUgcHJvZHVjdCBkb2N1bWVudGF0aW9uIHdvdWxkIGJlXG4vLyAgIGFwcHJlY2lhdGVkIGJ1dCBpcyBub3QgcmVxdWlyZWQuXG4vLyAyLiBBbHRlcmVkIHNvdXJjZSB2ZXJzaW9ucyBtdXN0IGJlIHBsYWlubHkgbWFya2VkIGFzIHN1Y2gsIGFuZCBtdXN0IG5vdCBiZVxuLy8gICBtaXNyZXByZXNlbnRlZCBhcyBiZWluZyB0aGUgb3JpZ2luYWwgc29mdHdhcmUuXG4vLyAzLiBUaGlzIG5vdGljZSBtYXkgbm90IGJlIHJlbW92ZWQgb3IgYWx0ZXJlZCBmcm9tIGFueSBzb3VyY2UgZGlzdHJpYnV0aW9uLlxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgMjogICAgICAnbmVlZCBkaWN0aW9uYXJ5JywgICAgIC8qIFpfTkVFRF9ESUNUICAgICAgIDIgICovXG4gIDE6ICAgICAgJ3N0cmVhbSBlbmQnLCAgICAgICAgICAvKiBaX1NUUkVBTV9FTkQgICAgICAxICAqL1xuICAwOiAgICAgICcnLCAgICAgICAgICAgICAgICAgICAgLyogWl9PSyAgICAgICAgICAgICAgMCAgKi9cbiAgJy0xJzogICAnZmlsZSBlcnJvcicsICAgICAgICAgIC8qIFpfRVJSTk8gICAgICAgICAoLTEpICovXG4gICctMic6ICAgJ3N0cmVhbSBlcnJvcicsICAgICAgICAvKiBaX1NUUkVBTV9FUlJPUiAgKC0yKSAqL1xuICAnLTMnOiAgICdkYXRhIGVycm9yJywgICAgICAgICAgLyogWl9EQVRBX0VSUk9SICAgICgtMykgKi9cbiAgJy00JzogICAnaW5zdWZmaWNpZW50IG1lbW9yeScsIC8qIFpfTUVNX0VSUk9SICAgICAoLTQpICovXG4gICctNSc6ICAgJ2J1ZmZlciBlcnJvcicsICAgICAgICAvKiBaX0JVRl9FUlJPUiAgICAgKC01KSAqL1xuICAnLTYnOiAgICdpbmNvbXBhdGlibGUgdmVyc2lvbicgLyogWl9WRVJTSU9OX0VSUk9SICgtNikgKi9cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIChDKSAxOTk1LTIwMTMgSmVhbi1sb3VwIEdhaWxseSBhbmQgTWFyayBBZGxlclxuLy8gKEMpIDIwMTQtMjAxNyBWaXRhbHkgUHV6cmluIGFuZCBBbmRyZXkgVHVwaXRzaW5cbi8vXG4vLyBUaGlzIHNvZnR3YXJlIGlzIHByb3ZpZGVkICdhcy1pcycsIHdpdGhvdXQgYW55IGV4cHJlc3Mgb3IgaW1wbGllZFxuLy8gd2FycmFudHkuIEluIG5vIGV2ZW50IHdpbGwgdGhlIGF1dGhvcnMgYmUgaGVsZCBsaWFibGUgZm9yIGFueSBkYW1hZ2VzXG4vLyBhcmlzaW5nIGZyb20gdGhlIHVzZSBvZiB0aGlzIHNvZnR3YXJlLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byBhbnlvbmUgdG8gdXNlIHRoaXMgc29mdHdhcmUgZm9yIGFueSBwdXJwb3NlLFxuLy8gaW5jbHVkaW5nIGNvbW1lcmNpYWwgYXBwbGljYXRpb25zLCBhbmQgdG8gYWx0ZXIgaXQgYW5kIHJlZGlzdHJpYnV0ZSBpdFxuLy8gZnJlZWx5LCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgcmVzdHJpY3Rpb25zOlxuLy9cbi8vIDEuIFRoZSBvcmlnaW4gb2YgdGhpcyBzb2Z0d2FyZSBtdXN0IG5vdCBiZSBtaXNyZXByZXNlbnRlZDsgeW91IG11c3Qgbm90XG4vLyAgIGNsYWltIHRoYXQgeW91IHdyb3RlIHRoZSBvcmlnaW5hbCBzb2Z0d2FyZS4gSWYgeW91IHVzZSB0aGlzIHNvZnR3YXJlXG4vLyAgIGluIGEgcHJvZHVjdCwgYW4gYWNrbm93bGVkZ21lbnQgaW4gdGhlIHByb2R1Y3QgZG9jdW1lbnRhdGlvbiB3b3VsZCBiZVxuLy8gICBhcHByZWNpYXRlZCBidXQgaXMgbm90IHJlcXVpcmVkLlxuLy8gMi4gQWx0ZXJlZCBzb3VyY2UgdmVyc2lvbnMgbXVzdCBiZSBwbGFpbmx5IG1hcmtlZCBhcyBzdWNoLCBhbmQgbXVzdCBub3QgYmVcbi8vICAgbWlzcmVwcmVzZW50ZWQgYXMgYmVpbmcgdGhlIG9yaWdpbmFsIHNvZnR3YXJlLlxuLy8gMy4gVGhpcyBub3RpY2UgbWF5IG5vdCBiZSByZW1vdmVkIG9yIGFsdGVyZWQgZnJvbSBhbnkgc291cmNlIGRpc3RyaWJ1dGlvbi5cblxuLyogZXNsaW50LWRpc2FibGUgc3BhY2UtdW5hcnktb3BzICovXG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzL2NvbW1vbicpO1xuXG4vKiBQdWJsaWMgY29uc3RhbnRzID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cblxuXG4vL3ZhciBaX0ZJTFRFUkVEICAgICAgICAgID0gMTtcbi8vdmFyIFpfSFVGRk1BTl9PTkxZICAgICAgPSAyO1xuLy92YXIgWl9STEUgICAgICAgICAgICAgICA9IDM7XG52YXIgWl9GSVhFRCAgICAgICAgICAgICAgID0gNDtcbi8vdmFyIFpfREVGQVVMVF9TVFJBVEVHWSAgPSAwO1xuXG4vKiBQb3NzaWJsZSB2YWx1ZXMgb2YgdGhlIGRhdGFfdHlwZSBmaWVsZCAodGhvdWdoIHNlZSBpbmZsYXRlKCkpICovXG52YXIgWl9CSU5BUlkgICAgICAgICAgICAgID0gMDtcbnZhciBaX1RFWFQgICAgICAgICAgICAgICAgPSAxO1xuLy92YXIgWl9BU0NJSSAgICAgICAgICAgICA9IDE7IC8vID0gWl9URVhUXG52YXIgWl9VTktOT1dOICAgICAgICAgICAgID0gMjtcblxuLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cblxuXG5mdW5jdGlvbiB6ZXJvKGJ1ZikgeyB2YXIgbGVuID0gYnVmLmxlbmd0aDsgd2hpbGUgKC0tbGVuID49IDApIHsgYnVmW2xlbl0gPSAwOyB9IH1cblxuLy8gRnJvbSB6dXRpbC5oXG5cbnZhciBTVE9SRURfQkxPQ0sgPSAwO1xudmFyIFNUQVRJQ19UUkVFUyA9IDE7XG52YXIgRFlOX1RSRUVTICAgID0gMjtcbi8qIFRoZSB0aHJlZSBraW5kcyBvZiBibG9jayB0eXBlICovXG5cbnZhciBNSU5fTUFUQ0ggICAgPSAzO1xudmFyIE1BWF9NQVRDSCAgICA9IDI1ODtcbi8qIFRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtIG1hdGNoIGxlbmd0aHMgKi9cblxuLy8gRnJvbSBkZWZsYXRlLmhcbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogSW50ZXJuYWwgY29tcHJlc3Npb24gc3RhdGUuXG4gKi9cblxudmFyIExFTkdUSF9DT0RFUyAgPSAyOTtcbi8qIG51bWJlciBvZiBsZW5ndGggY29kZXMsIG5vdCBjb3VudGluZyB0aGUgc3BlY2lhbCBFTkRfQkxPQ0sgY29kZSAqL1xuXG52YXIgTElURVJBTFMgICAgICA9IDI1Njtcbi8qIG51bWJlciBvZiBsaXRlcmFsIGJ5dGVzIDAuLjI1NSAqL1xuXG52YXIgTF9DT0RFUyAgICAgICA9IExJVEVSQUxTICsgMSArIExFTkdUSF9DT0RFUztcbi8qIG51bWJlciBvZiBMaXRlcmFsIG9yIExlbmd0aCBjb2RlcywgaW5jbHVkaW5nIHRoZSBFTkRfQkxPQ0sgY29kZSAqL1xuXG52YXIgRF9DT0RFUyAgICAgICA9IDMwO1xuLyogbnVtYmVyIG9mIGRpc3RhbmNlIGNvZGVzICovXG5cbnZhciBCTF9DT0RFUyAgICAgID0gMTk7XG4vKiBudW1iZXIgb2YgY29kZXMgdXNlZCB0byB0cmFuc2ZlciB0aGUgYml0IGxlbmd0aHMgKi9cblxudmFyIEhFQVBfU0laRSAgICAgPSAyICogTF9DT0RFUyArIDE7XG4vKiBtYXhpbXVtIGhlYXAgc2l6ZSAqL1xuXG52YXIgTUFYX0JJVFMgICAgICA9IDE1O1xuLyogQWxsIGNvZGVzIG11c3Qgbm90IGV4Y2VlZCBNQVhfQklUUyBiaXRzICovXG5cbnZhciBCdWZfc2l6ZSAgICAgID0gMTY7XG4vKiBzaXplIG9mIGJpdCBidWZmZXIgaW4gYmlfYnVmICovXG5cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb25zdGFudHNcbiAqL1xuXG52YXIgTUFYX0JMX0JJVFMgPSA3O1xuLyogQml0IGxlbmd0aCBjb2RlcyBtdXN0IG5vdCBleGNlZWQgTUFYX0JMX0JJVFMgYml0cyAqL1xuXG52YXIgRU5EX0JMT0NLICAgPSAyNTY7XG4vKiBlbmQgb2YgYmxvY2sgbGl0ZXJhbCBjb2RlICovXG5cbnZhciBSRVBfM182ICAgICA9IDE2O1xuLyogcmVwZWF0IHByZXZpb3VzIGJpdCBsZW5ndGggMy02IHRpbWVzICgyIGJpdHMgb2YgcmVwZWF0IGNvdW50KSAqL1xuXG52YXIgUkVQWl8zXzEwICAgPSAxNztcbi8qIHJlcGVhdCBhIHplcm8gbGVuZ3RoIDMtMTAgdGltZXMgICgzIGJpdHMgb2YgcmVwZWF0IGNvdW50KSAqL1xuXG52YXIgUkVQWl8xMV8xMzggPSAxODtcbi8qIHJlcGVhdCBhIHplcm8gbGVuZ3RoIDExLTEzOCB0aW1lcyAgKDcgYml0cyBvZiByZXBlYXQgY291bnQpICovXG5cbi8qIGVzbGludC1kaXNhYmxlIGNvbW1hLXNwYWNpbmcsYXJyYXktYnJhY2tldC1zcGFjaW5nICovXG52YXIgZXh0cmFfbGJpdHMgPSAgIC8qIGV4dHJhIGJpdHMgZm9yIGVhY2ggbGVuZ3RoIGNvZGUgKi9cbiAgWzAsMCwwLDAsMCwwLDAsMCwxLDEsMSwxLDIsMiwyLDIsMywzLDMsMyw0LDQsNCw0LDUsNSw1LDUsMF07XG5cbnZhciBleHRyYV9kYml0cyA9ICAgLyogZXh0cmEgYml0cyBmb3IgZWFjaCBkaXN0YW5jZSBjb2RlICovXG4gIFswLDAsMCwwLDEsMSwyLDIsMywzLDQsNCw1LDUsNiw2LDcsNyw4LDgsOSw5LDEwLDEwLDExLDExLDEyLDEyLDEzLDEzXTtcblxudmFyIGV4dHJhX2JsYml0cyA9ICAvKiBleHRyYSBiaXRzIGZvciBlYWNoIGJpdCBsZW5ndGggY29kZSAqL1xuICBbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwyLDMsN107XG5cbnZhciBibF9vcmRlciA9XG4gIFsxNiwxNywxOCwwLDgsNyw5LDYsMTAsNSwxMSw0LDEyLDMsMTMsMiwxNCwxLDE1XTtcbi8qIGVzbGludC1lbmFibGUgY29tbWEtc3BhY2luZyxhcnJheS1icmFja2V0LXNwYWNpbmcgKi9cblxuLyogVGhlIGxlbmd0aHMgb2YgdGhlIGJpdCBsZW5ndGggY29kZXMgYXJlIHNlbnQgaW4gb3JkZXIgb2YgZGVjcmVhc2luZ1xuICogcHJvYmFiaWxpdHksIHRvIGF2b2lkIHRyYW5zbWl0dGluZyB0aGUgbGVuZ3RocyBmb3IgdW51c2VkIGJpdCBsZW5ndGggY29kZXMuXG4gKi9cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBMb2NhbCBkYXRhLiBUaGVzZSBhcmUgaW5pdGlhbGl6ZWQgb25seSBvbmNlLlxuICovXG5cbi8vIFdlIHByZS1maWxsIGFycmF5cyB3aXRoIDAgdG8gYXZvaWQgdW5pbml0aWFsaXplZCBnYXBzXG5cbnZhciBESVNUX0NPREVfTEVOID0gNTEyOyAvKiBzZWUgZGVmaW5pdGlvbiBvZiBhcnJheSBkaXN0X2NvZGUgYmVsb3cgKi9cblxuLy8gISEhISBVc2UgZmxhdCBhcnJheSBpbnN0ZWFkIG9mIHN0cnVjdHVyZSwgRnJlcSA9IGkqMiwgTGVuID0gaSoyKzFcbnZhciBzdGF0aWNfbHRyZWUgID0gbmV3IEFycmF5KChMX0NPREVTICsgMikgKiAyKTtcbnplcm8oc3RhdGljX2x0cmVlKTtcbi8qIFRoZSBzdGF0aWMgbGl0ZXJhbCB0cmVlLiBTaW5jZSB0aGUgYml0IGxlbmd0aHMgYXJlIGltcG9zZWQsIHRoZXJlIGlzIG5vXG4gKiBuZWVkIGZvciB0aGUgTF9DT0RFUyBleHRyYSBjb2RlcyB1c2VkIGR1cmluZyBoZWFwIGNvbnN0cnVjdGlvbi4gSG93ZXZlclxuICogVGhlIGNvZGVzIDI4NiBhbmQgMjg3IGFyZSBuZWVkZWQgdG8gYnVpbGQgYSBjYW5vbmljYWwgdHJlZSAoc2VlIF90cl9pbml0XG4gKiBiZWxvdykuXG4gKi9cblxudmFyIHN0YXRpY19kdHJlZSAgPSBuZXcgQXJyYXkoRF9DT0RFUyAqIDIpO1xuemVybyhzdGF0aWNfZHRyZWUpO1xuLyogVGhlIHN0YXRpYyBkaXN0YW5jZSB0cmVlLiAoQWN0dWFsbHkgYSB0cml2aWFsIHRyZWUgc2luY2UgYWxsIGNvZGVzIHVzZVxuICogNSBiaXRzLilcbiAqL1xuXG52YXIgX2Rpc3RfY29kZSAgICA9IG5ldyBBcnJheShESVNUX0NPREVfTEVOKTtcbnplcm8oX2Rpc3RfY29kZSk7XG4vKiBEaXN0YW5jZSBjb2Rlcy4gVGhlIGZpcnN0IDI1NiB2YWx1ZXMgY29ycmVzcG9uZCB0byB0aGUgZGlzdGFuY2VzXG4gKiAzIC4uIDI1OCwgdGhlIGxhc3QgMjU2IHZhbHVlcyBjb3JyZXNwb25kIHRvIHRoZSB0b3AgOCBiaXRzIG9mXG4gKiB0aGUgMTUgYml0IGRpc3RhbmNlcy5cbiAqL1xuXG52YXIgX2xlbmd0aF9jb2RlICA9IG5ldyBBcnJheShNQVhfTUFUQ0ggLSBNSU5fTUFUQ0ggKyAxKTtcbnplcm8oX2xlbmd0aF9jb2RlKTtcbi8qIGxlbmd0aCBjb2RlIGZvciBlYWNoIG5vcm1hbGl6ZWQgbWF0Y2ggbGVuZ3RoICgwID09IE1JTl9NQVRDSCkgKi9cblxudmFyIGJhc2VfbGVuZ3RoICAgPSBuZXcgQXJyYXkoTEVOR1RIX0NPREVTKTtcbnplcm8oYmFzZV9sZW5ndGgpO1xuLyogRmlyc3Qgbm9ybWFsaXplZCBsZW5ndGggZm9yIGVhY2ggY29kZSAoMCA9IE1JTl9NQVRDSCkgKi9cblxudmFyIGJhc2VfZGlzdCAgICAgPSBuZXcgQXJyYXkoRF9DT0RFUyk7XG56ZXJvKGJhc2VfZGlzdCk7XG4vKiBGaXJzdCBub3JtYWxpemVkIGRpc3RhbmNlIGZvciBlYWNoIGNvZGUgKDAgPSBkaXN0YW5jZSBvZiAxKSAqL1xuXG5cbmZ1bmN0aW9uIFN0YXRpY1RyZWVEZXNjKHN0YXRpY190cmVlLCBleHRyYV9iaXRzLCBleHRyYV9iYXNlLCBlbGVtcywgbWF4X2xlbmd0aCkge1xuXG4gIHRoaXMuc3RhdGljX3RyZWUgID0gc3RhdGljX3RyZWU7ICAvKiBzdGF0aWMgdHJlZSBvciBOVUxMICovXG4gIHRoaXMuZXh0cmFfYml0cyAgID0gZXh0cmFfYml0czsgICAvKiBleHRyYSBiaXRzIGZvciBlYWNoIGNvZGUgb3IgTlVMTCAqL1xuICB0aGlzLmV4dHJhX2Jhc2UgICA9IGV4dHJhX2Jhc2U7ICAgLyogYmFzZSBpbmRleCBmb3IgZXh0cmFfYml0cyAqL1xuICB0aGlzLmVsZW1zICAgICAgICA9IGVsZW1zOyAgICAgICAgLyogbWF4IG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgdHJlZSAqL1xuICB0aGlzLm1heF9sZW5ndGggICA9IG1heF9sZW5ndGg7ICAgLyogbWF4IGJpdCBsZW5ndGggZm9yIHRoZSBjb2RlcyAqL1xuXG4gIC8vIHNob3cgaWYgYHN0YXRpY190cmVlYCBoYXMgZGF0YSBvciBkdW1teSAtIG5lZWRlZCBmb3IgbW9ub21vcnBoaWMgb2JqZWN0c1xuICB0aGlzLmhhc19zdHJlZSAgICA9IHN0YXRpY190cmVlICYmIHN0YXRpY190cmVlLmxlbmd0aDtcbn1cblxuXG52YXIgc3RhdGljX2xfZGVzYztcbnZhciBzdGF0aWNfZF9kZXNjO1xudmFyIHN0YXRpY19ibF9kZXNjO1xuXG5cbmZ1bmN0aW9uIFRyZWVEZXNjKGR5bl90cmVlLCBzdGF0X2Rlc2MpIHtcbiAgdGhpcy5keW5fdHJlZSA9IGR5bl90cmVlOyAgICAgLyogdGhlIGR5bmFtaWMgdHJlZSAqL1xuICB0aGlzLm1heF9jb2RlID0gMDsgICAgICAgICAgICAvKiBsYXJnZXN0IGNvZGUgd2l0aCBub24gemVybyBmcmVxdWVuY3kgKi9cbiAgdGhpcy5zdGF0X2Rlc2MgPSBzdGF0X2Rlc2M7ICAgLyogdGhlIGNvcnJlc3BvbmRpbmcgc3RhdGljIHRyZWUgKi9cbn1cblxuXG5cbmZ1bmN0aW9uIGRfY29kZShkaXN0KSB7XG4gIHJldHVybiBkaXN0IDwgMjU2ID8gX2Rpc3RfY29kZVtkaXN0XSA6IF9kaXN0X2NvZGVbMjU2ICsgKGRpc3QgPj4+IDcpXTtcbn1cblxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIE91dHB1dCBhIHNob3J0IExTQiBmaXJzdCBvbiB0aGUgc3RyZWFtLlxuICogSU4gYXNzZXJ0aW9uOiB0aGVyZSBpcyBlbm91Z2ggcm9vbSBpbiBwZW5kaW5nQnVmLlxuICovXG5mdW5jdGlvbiBwdXRfc2hvcnQocywgdykge1xuLy8gICAgcHV0X2J5dGUocywgKHVjaCkoKHcpICYgMHhmZikpO1xuLy8gICAgcHV0X2J5dGUocywgKHVjaCkoKHVzaCkodykgPj4gOCkpO1xuICBzLnBlbmRpbmdfYnVmW3MucGVuZGluZysrXSA9ICh3KSAmIDB4ZmY7XG4gIHMucGVuZGluZ19idWZbcy5wZW5kaW5nKytdID0gKHcgPj4+IDgpICYgMHhmZjtcbn1cblxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIFNlbmQgYSB2YWx1ZSBvbiBhIGdpdmVuIG51bWJlciBvZiBiaXRzLlxuICogSU4gYXNzZXJ0aW9uOiBsZW5ndGggPD0gMTYgYW5kIHZhbHVlIGZpdHMgaW4gbGVuZ3RoIGJpdHMuXG4gKi9cbmZ1bmN0aW9uIHNlbmRfYml0cyhzLCB2YWx1ZSwgbGVuZ3RoKSB7XG4gIGlmIChzLmJpX3ZhbGlkID4gKEJ1Zl9zaXplIC0gbGVuZ3RoKSkge1xuICAgIHMuYmlfYnVmIHw9ICh2YWx1ZSA8PCBzLmJpX3ZhbGlkKSAmIDB4ZmZmZjtcbiAgICBwdXRfc2hvcnQocywgcy5iaV9idWYpO1xuICAgIHMuYmlfYnVmID0gdmFsdWUgPj4gKEJ1Zl9zaXplIC0gcy5iaV92YWxpZCk7XG4gICAgcy5iaV92YWxpZCArPSBsZW5ndGggLSBCdWZfc2l6ZTtcbiAgfSBlbHNlIHtcbiAgICBzLmJpX2J1ZiB8PSAodmFsdWUgPDwgcy5iaV92YWxpZCkgJiAweGZmZmY7XG4gICAgcy5iaV92YWxpZCArPSBsZW5ndGg7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBzZW5kX2NvZGUocywgYywgdHJlZSkge1xuICBzZW5kX2JpdHMocywgdHJlZVtjICogMl0vKi5Db2RlKi8sIHRyZWVbYyAqIDIgKyAxXS8qLkxlbiovKTtcbn1cblxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIFJldmVyc2UgdGhlIGZpcnN0IGxlbiBiaXRzIG9mIGEgY29kZSwgdXNpbmcgc3RyYWlnaHRmb3J3YXJkIGNvZGUgKGEgZmFzdGVyXG4gKiBtZXRob2Qgd291bGQgdXNlIGEgdGFibGUpXG4gKiBJTiBhc3NlcnRpb246IDEgPD0gbGVuIDw9IDE1XG4gKi9cbmZ1bmN0aW9uIGJpX3JldmVyc2UoY29kZSwgbGVuKSB7XG4gIHZhciByZXMgPSAwO1xuICBkbyB7XG4gICAgcmVzIHw9IGNvZGUgJiAxO1xuICAgIGNvZGUgPj4+PSAxO1xuICAgIHJlcyA8PD0gMTtcbiAgfSB3aGlsZSAoLS1sZW4gPiAwKTtcbiAgcmV0dXJuIHJlcyA+Pj4gMTtcbn1cblxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEZsdXNoIHRoZSBiaXQgYnVmZmVyLCBrZWVwaW5nIGF0IG1vc3QgNyBiaXRzIGluIGl0LlxuICovXG5mdW5jdGlvbiBiaV9mbHVzaChzKSB7XG4gIGlmIChzLmJpX3ZhbGlkID09PSAxNikge1xuICAgIHB1dF9zaG9ydChzLCBzLmJpX2J1Zik7XG4gICAgcy5iaV9idWYgPSAwO1xuICAgIHMuYmlfdmFsaWQgPSAwO1xuXG4gIH0gZWxzZSBpZiAocy5iaV92YWxpZCA+PSA4KSB7XG4gICAgcy5wZW5kaW5nX2J1ZltzLnBlbmRpbmcrK10gPSBzLmJpX2J1ZiAmIDB4ZmY7XG4gICAgcy5iaV9idWYgPj49IDg7XG4gICAgcy5iaV92YWxpZCAtPSA4O1xuICB9XG59XG5cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb21wdXRlIHRoZSBvcHRpbWFsIGJpdCBsZW5ndGhzIGZvciBhIHRyZWUgYW5kIHVwZGF0ZSB0aGUgdG90YWwgYml0IGxlbmd0aFxuICogZm9yIHRoZSBjdXJyZW50IGJsb2NrLlxuICogSU4gYXNzZXJ0aW9uOiB0aGUgZmllbGRzIGZyZXEgYW5kIGRhZCBhcmUgc2V0LCBoZWFwW2hlYXBfbWF4XSBhbmRcbiAqICAgIGFib3ZlIGFyZSB0aGUgdHJlZSBub2RlcyBzb3J0ZWQgYnkgaW5jcmVhc2luZyBmcmVxdWVuY3kuXG4gKiBPVVQgYXNzZXJ0aW9uczogdGhlIGZpZWxkIGxlbiBpcyBzZXQgdG8gdGhlIG9wdGltYWwgYml0IGxlbmd0aCwgdGhlXG4gKiAgICAgYXJyYXkgYmxfY291bnQgY29udGFpbnMgdGhlIGZyZXF1ZW5jaWVzIGZvciBlYWNoIGJpdCBsZW5ndGguXG4gKiAgICAgVGhlIGxlbmd0aCBvcHRfbGVuIGlzIHVwZGF0ZWQ7IHN0YXRpY19sZW4gaXMgYWxzbyB1cGRhdGVkIGlmIHN0cmVlIGlzXG4gKiAgICAgbm90IG51bGwuXG4gKi9cbmZ1bmN0aW9uIGdlbl9iaXRsZW4ocywgZGVzYylcbi8vICAgIGRlZmxhdGVfc3RhdGUgKnM7XG4vLyAgICB0cmVlX2Rlc2MgKmRlc2M7ICAgIC8qIHRoZSB0cmVlIGRlc2NyaXB0b3IgKi9cbntcbiAgdmFyIHRyZWUgICAgICAgICAgICA9IGRlc2MuZHluX3RyZWU7XG4gIHZhciBtYXhfY29kZSAgICAgICAgPSBkZXNjLm1heF9jb2RlO1xuICB2YXIgc3RyZWUgICAgICAgICAgID0gZGVzYy5zdGF0X2Rlc2Muc3RhdGljX3RyZWU7XG4gIHZhciBoYXNfc3RyZWUgICAgICAgPSBkZXNjLnN0YXRfZGVzYy5oYXNfc3RyZWU7XG4gIHZhciBleHRyYSAgICAgICAgICAgPSBkZXNjLnN0YXRfZGVzYy5leHRyYV9iaXRzO1xuICB2YXIgYmFzZSAgICAgICAgICAgID0gZGVzYy5zdGF0X2Rlc2MuZXh0cmFfYmFzZTtcbiAgdmFyIG1heF9sZW5ndGggICAgICA9IGRlc2Muc3RhdF9kZXNjLm1heF9sZW5ndGg7XG4gIHZhciBoOyAgICAgICAgICAgICAgLyogaGVhcCBpbmRleCAqL1xuICB2YXIgbiwgbTsgICAgICAgICAgIC8qIGl0ZXJhdGUgb3ZlciB0aGUgdHJlZSBlbGVtZW50cyAqL1xuICB2YXIgYml0czsgICAgICAgICAgIC8qIGJpdCBsZW5ndGggKi9cbiAgdmFyIHhiaXRzOyAgICAgICAgICAvKiBleHRyYSBiaXRzICovXG4gIHZhciBmOyAgICAgICAgICAgICAgLyogZnJlcXVlbmN5ICovXG4gIHZhciBvdmVyZmxvdyA9IDA7ICAgLyogbnVtYmVyIG9mIGVsZW1lbnRzIHdpdGggYml0IGxlbmd0aCB0b28gbGFyZ2UgKi9cblxuICBmb3IgKGJpdHMgPSAwOyBiaXRzIDw9IE1BWF9CSVRTOyBiaXRzKyspIHtcbiAgICBzLmJsX2NvdW50W2JpdHNdID0gMDtcbiAgfVxuXG4gIC8qIEluIGEgZmlyc3QgcGFzcywgY29tcHV0ZSB0aGUgb3B0aW1hbCBiaXQgbGVuZ3RocyAod2hpY2ggbWF5XG4gICAqIG92ZXJmbG93IGluIHRoZSBjYXNlIG9mIHRoZSBiaXQgbGVuZ3RoIHRyZWUpLlxuICAgKi9cbiAgdHJlZVtzLmhlYXBbcy5oZWFwX21heF0gKiAyICsgMV0vKi5MZW4qLyA9IDA7IC8qIHJvb3Qgb2YgdGhlIGhlYXAgKi9cblxuICBmb3IgKGggPSBzLmhlYXBfbWF4ICsgMTsgaCA8IEhFQVBfU0laRTsgaCsrKSB7XG4gICAgbiA9IHMuaGVhcFtoXTtcbiAgICBiaXRzID0gdHJlZVt0cmVlW24gKiAyICsgMV0vKi5EYWQqLyAqIDIgKyAxXS8qLkxlbiovICsgMTtcbiAgICBpZiAoYml0cyA+IG1heF9sZW5ndGgpIHtcbiAgICAgIGJpdHMgPSBtYXhfbGVuZ3RoO1xuICAgICAgb3ZlcmZsb3crKztcbiAgICB9XG4gICAgdHJlZVtuICogMiArIDFdLyouTGVuKi8gPSBiaXRzO1xuICAgIC8qIFdlIG92ZXJ3cml0ZSB0cmVlW25dLkRhZCB3aGljaCBpcyBubyBsb25nZXIgbmVlZGVkICovXG5cbiAgICBpZiAobiA+IG1heF9jb2RlKSB7IGNvbnRpbnVlOyB9IC8qIG5vdCBhIGxlYWYgbm9kZSAqL1xuXG4gICAgcy5ibF9jb3VudFtiaXRzXSsrO1xuICAgIHhiaXRzID0gMDtcbiAgICBpZiAobiA+PSBiYXNlKSB7XG4gICAgICB4Yml0cyA9IGV4dHJhW24gLSBiYXNlXTtcbiAgICB9XG4gICAgZiA9IHRyZWVbbiAqIDJdLyouRnJlcSovO1xuICAgIHMub3B0X2xlbiArPSBmICogKGJpdHMgKyB4Yml0cyk7XG4gICAgaWYgKGhhc19zdHJlZSkge1xuICAgICAgcy5zdGF0aWNfbGVuICs9IGYgKiAoc3RyZWVbbiAqIDIgKyAxXS8qLkxlbiovICsgeGJpdHMpO1xuICAgIH1cbiAgfVxuICBpZiAob3ZlcmZsb3cgPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgLy8gVHJhY2UoKHN0ZGVycixcIlxcbmJpdCBsZW5ndGggb3ZlcmZsb3dcXG5cIikpO1xuICAvKiBUaGlzIGhhcHBlbnMgZm9yIGV4YW1wbGUgb24gb2JqMiBhbmQgcGljIG9mIHRoZSBDYWxnYXJ5IGNvcnB1cyAqL1xuXG4gIC8qIEZpbmQgdGhlIGZpcnN0IGJpdCBsZW5ndGggd2hpY2ggY291bGQgaW5jcmVhc2U6ICovXG4gIGRvIHtcbiAgICBiaXRzID0gbWF4X2xlbmd0aCAtIDE7XG4gICAgd2hpbGUgKHMuYmxfY291bnRbYml0c10gPT09IDApIHsgYml0cy0tOyB9XG4gICAgcy5ibF9jb3VudFtiaXRzXS0tOyAgICAgIC8qIG1vdmUgb25lIGxlYWYgZG93biB0aGUgdHJlZSAqL1xuICAgIHMuYmxfY291bnRbYml0cyArIDFdICs9IDI7IC8qIG1vdmUgb25lIG92ZXJmbG93IGl0ZW0gYXMgaXRzIGJyb3RoZXIgKi9cbiAgICBzLmJsX2NvdW50W21heF9sZW5ndGhdLS07XG4gICAgLyogVGhlIGJyb3RoZXIgb2YgdGhlIG92ZXJmbG93IGl0ZW0gYWxzbyBtb3ZlcyBvbmUgc3RlcCB1cCxcbiAgICAgKiBidXQgdGhpcyBkb2VzIG5vdCBhZmZlY3QgYmxfY291bnRbbWF4X2xlbmd0aF1cbiAgICAgKi9cbiAgICBvdmVyZmxvdyAtPSAyO1xuICB9IHdoaWxlIChvdmVyZmxvdyA+IDApO1xuXG4gIC8qIE5vdyByZWNvbXB1dGUgYWxsIGJpdCBsZW5ndGhzLCBzY2FubmluZyBpbiBpbmNyZWFzaW5nIGZyZXF1ZW5jeS5cbiAgICogaCBpcyBzdGlsbCBlcXVhbCB0byBIRUFQX1NJWkUuIChJdCBpcyBzaW1wbGVyIHRvIHJlY29uc3RydWN0IGFsbFxuICAgKiBsZW5ndGhzIGluc3RlYWQgb2YgZml4aW5nIG9ubHkgdGhlIHdyb25nIG9uZXMuIFRoaXMgaWRlYSBpcyB0YWtlblxuICAgKiBmcm9tICdhcicgd3JpdHRlbiBieSBIYXJ1aGlrbyBPa3VtdXJhLilcbiAgICovXG4gIGZvciAoYml0cyA9IG1heF9sZW5ndGg7IGJpdHMgIT09IDA7IGJpdHMtLSkge1xuICAgIG4gPSBzLmJsX2NvdW50W2JpdHNdO1xuICAgIHdoaWxlIChuICE9PSAwKSB7XG4gICAgICBtID0gcy5oZWFwWy0taF07XG4gICAgICBpZiAobSA+IG1heF9jb2RlKSB7IGNvbnRpbnVlOyB9XG4gICAgICBpZiAodHJlZVttICogMiArIDFdLyouTGVuKi8gIT09IGJpdHMpIHtcbiAgICAgICAgLy8gVHJhY2UoKHN0ZGVycixcImNvZGUgJWQgYml0cyAlZC0+JWRcXG5cIiwgbSwgdHJlZVttXS5MZW4sIGJpdHMpKTtcbiAgICAgICAgcy5vcHRfbGVuICs9IChiaXRzIC0gdHJlZVttICogMiArIDFdLyouTGVuKi8pICogdHJlZVttICogMl0vKi5GcmVxKi87XG4gICAgICAgIHRyZWVbbSAqIDIgKyAxXS8qLkxlbiovID0gYml0cztcbiAgICAgIH1cbiAgICAgIG4tLTtcbiAgICB9XG4gIH1cbn1cblxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEdlbmVyYXRlIHRoZSBjb2RlcyBmb3IgYSBnaXZlbiB0cmVlIGFuZCBiaXQgY291bnRzICh3aGljaCBuZWVkIG5vdCBiZVxuICogb3B0aW1hbCkuXG4gKiBJTiBhc3NlcnRpb246IHRoZSBhcnJheSBibF9jb3VudCBjb250YWlucyB0aGUgYml0IGxlbmd0aCBzdGF0aXN0aWNzIGZvclxuICogdGhlIGdpdmVuIHRyZWUgYW5kIHRoZSBmaWVsZCBsZW4gaXMgc2V0IGZvciBhbGwgdHJlZSBlbGVtZW50cy5cbiAqIE9VVCBhc3NlcnRpb246IHRoZSBmaWVsZCBjb2RlIGlzIHNldCBmb3IgYWxsIHRyZWUgZWxlbWVudHMgb2Ygbm9uXG4gKiAgICAgemVybyBjb2RlIGxlbmd0aC5cbiAqL1xuZnVuY3Rpb24gZ2VuX2NvZGVzKHRyZWUsIG1heF9jb2RlLCBibF9jb3VudClcbi8vICAgIGN0X2RhdGEgKnRyZWU7ICAgICAgICAgICAgIC8qIHRoZSB0cmVlIHRvIGRlY29yYXRlICovXG4vLyAgICBpbnQgbWF4X2NvZGU7ICAgICAgICAgICAgICAvKiBsYXJnZXN0IGNvZGUgd2l0aCBub24gemVybyBmcmVxdWVuY3kgKi9cbi8vICAgIHVzaGYgKmJsX2NvdW50OyAgICAgICAgICAgIC8qIG51bWJlciBvZiBjb2RlcyBhdCBlYWNoIGJpdCBsZW5ndGggKi9cbntcbiAgdmFyIG5leHRfY29kZSA9IG5ldyBBcnJheShNQVhfQklUUyArIDEpOyAvKiBuZXh0IGNvZGUgdmFsdWUgZm9yIGVhY2ggYml0IGxlbmd0aCAqL1xuICB2YXIgY29kZSA9IDA7ICAgICAgICAgICAgICAvKiBydW5uaW5nIGNvZGUgdmFsdWUgKi9cbiAgdmFyIGJpdHM7ICAgICAgICAgICAgICAgICAgLyogYml0IGluZGV4ICovXG4gIHZhciBuOyAgICAgICAgICAgICAgICAgICAgIC8qIGNvZGUgaW5kZXggKi9cblxuICAvKiBUaGUgZGlzdHJpYnV0aW9uIGNvdW50cyBhcmUgZmlyc3QgdXNlZCB0byBnZW5lcmF0ZSB0aGUgY29kZSB2YWx1ZXNcbiAgICogd2l0aG91dCBiaXQgcmV2ZXJzYWwuXG4gICAqL1xuICBmb3IgKGJpdHMgPSAxOyBiaXRzIDw9IE1BWF9CSVRTOyBiaXRzKyspIHtcbiAgICBuZXh0X2NvZGVbYml0c10gPSBjb2RlID0gKGNvZGUgKyBibF9jb3VudFtiaXRzIC0gMV0pIDw8IDE7XG4gIH1cbiAgLyogQ2hlY2sgdGhhdCB0aGUgYml0IGNvdW50cyBpbiBibF9jb3VudCBhcmUgY29uc2lzdGVudC4gVGhlIGxhc3QgY29kZVxuICAgKiBtdXN0IGJlIGFsbCBvbmVzLlxuICAgKi9cbiAgLy9Bc3NlcnQgKGNvZGUgKyBibF9jb3VudFtNQVhfQklUU10tMSA9PSAoMTw8TUFYX0JJVFMpLTEsXG4gIC8vICAgICAgICBcImluY29uc2lzdGVudCBiaXQgY291bnRzXCIpO1xuICAvL1RyYWNldigoc3RkZXJyLFwiXFxuZ2VuX2NvZGVzOiBtYXhfY29kZSAlZCBcIiwgbWF4X2NvZGUpKTtcblxuICBmb3IgKG4gPSAwOyAgbiA8PSBtYXhfY29kZTsgbisrKSB7XG4gICAgdmFyIGxlbiA9IHRyZWVbbiAqIDIgKyAxXS8qLkxlbiovO1xuICAgIGlmIChsZW4gPT09IDApIHsgY29udGludWU7IH1cbiAgICAvKiBOb3cgcmV2ZXJzZSB0aGUgYml0cyAqL1xuICAgIHRyZWVbbiAqIDJdLyouQ29kZSovID0gYmlfcmV2ZXJzZShuZXh0X2NvZGVbbGVuXSsrLCBsZW4pO1xuXG4gICAgLy9UcmFjZWN2KHRyZWUgIT0gc3RhdGljX2x0cmVlLCAoc3RkZXJyLFwiXFxubiAlM2QgJWMgbCAlMmQgYyAlNHggKCV4KSBcIixcbiAgICAvLyAgICAgbiwgKGlzZ3JhcGgobikgPyBuIDogJyAnKSwgbGVuLCB0cmVlW25dLkNvZGUsIG5leHRfY29kZVtsZW5dLTEpKTtcbiAgfVxufVxuXG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogSW5pdGlhbGl6ZSB0aGUgdmFyaW91cyAnY29uc3RhbnQnIHRhYmxlcy5cbiAqL1xuZnVuY3Rpb24gdHJfc3RhdGljX2luaXQoKSB7XG4gIHZhciBuOyAgICAgICAgLyogaXRlcmF0ZXMgb3ZlciB0cmVlIGVsZW1lbnRzICovXG4gIHZhciBiaXRzOyAgICAgLyogYml0IGNvdW50ZXIgKi9cbiAgdmFyIGxlbmd0aDsgICAvKiBsZW5ndGggdmFsdWUgKi9cbiAgdmFyIGNvZGU7ICAgICAvKiBjb2RlIHZhbHVlICovXG4gIHZhciBkaXN0OyAgICAgLyogZGlzdGFuY2UgaW5kZXggKi9cbiAgdmFyIGJsX2NvdW50ID0gbmV3IEFycmF5KE1BWF9CSVRTICsgMSk7XG4gIC8qIG51bWJlciBvZiBjb2RlcyBhdCBlYWNoIGJpdCBsZW5ndGggZm9yIGFuIG9wdGltYWwgdHJlZSAqL1xuXG4gIC8vIGRvIGNoZWNrIGluIF90cl9pbml0KClcbiAgLy9pZiAoc3RhdGljX2luaXRfZG9uZSkgcmV0dXJuO1xuXG4gIC8qIEZvciBzb21lIGVtYmVkZGVkIHRhcmdldHMsIGdsb2JhbCB2YXJpYWJsZXMgYXJlIG5vdCBpbml0aWFsaXplZDogKi9cbi8qI2lmZGVmIE5PX0lOSVRfR0xPQkFMX1BPSU5URVJTXG4gIHN0YXRpY19sX2Rlc2Muc3RhdGljX3RyZWUgPSBzdGF0aWNfbHRyZWU7XG4gIHN0YXRpY19sX2Rlc2MuZXh0cmFfYml0cyA9IGV4dHJhX2xiaXRzO1xuICBzdGF0aWNfZF9kZXNjLnN0YXRpY190cmVlID0gc3RhdGljX2R0cmVlO1xuICBzdGF0aWNfZF9kZXNjLmV4dHJhX2JpdHMgPSBleHRyYV9kYml0cztcbiAgc3RhdGljX2JsX2Rlc2MuZXh0cmFfYml0cyA9IGV4dHJhX2JsYml0cztcbiNlbmRpZiovXG5cbiAgLyogSW5pdGlhbGl6ZSB0aGUgbWFwcGluZyBsZW5ndGggKDAuLjI1NSkgLT4gbGVuZ3RoIGNvZGUgKDAuLjI4KSAqL1xuICBsZW5ndGggPSAwO1xuICBmb3IgKGNvZGUgPSAwOyBjb2RlIDwgTEVOR1RIX0NPREVTIC0gMTsgY29kZSsrKSB7XG4gICAgYmFzZV9sZW5ndGhbY29kZV0gPSBsZW5ndGg7XG4gICAgZm9yIChuID0gMDsgbiA8ICgxIDw8IGV4dHJhX2xiaXRzW2NvZGVdKTsgbisrKSB7XG4gICAgICBfbGVuZ3RoX2NvZGVbbGVuZ3RoKytdID0gY29kZTtcbiAgICB9XG4gIH1cbiAgLy9Bc3NlcnQgKGxlbmd0aCA9PSAyNTYsIFwidHJfc3RhdGljX2luaXQ6IGxlbmd0aCAhPSAyNTZcIik7XG4gIC8qIE5vdGUgdGhhdCB0aGUgbGVuZ3RoIDI1NSAobWF0Y2ggbGVuZ3RoIDI1OCkgY2FuIGJlIHJlcHJlc2VudGVkXG4gICAqIGluIHR3byBkaWZmZXJlbnQgd2F5czogY29kZSAyODQgKyA1IGJpdHMgb3IgY29kZSAyODUsIHNvIHdlXG4gICAqIG92ZXJ3cml0ZSBsZW5ndGhfY29kZVsyNTVdIHRvIHVzZSB0aGUgYmVzdCBlbmNvZGluZzpcbiAgICovXG4gIF9sZW5ndGhfY29kZVtsZW5ndGggLSAxXSA9IGNvZGU7XG5cbiAgLyogSW5pdGlhbGl6ZSB0aGUgbWFwcGluZyBkaXN0ICgwLi4zMkspIC0+IGRpc3QgY29kZSAoMC4uMjkpICovXG4gIGRpc3QgPSAwO1xuICBmb3IgKGNvZGUgPSAwOyBjb2RlIDwgMTY7IGNvZGUrKykge1xuICAgIGJhc2VfZGlzdFtjb2RlXSA9IGRpc3Q7XG4gICAgZm9yIChuID0gMDsgbiA8ICgxIDw8IGV4dHJhX2RiaXRzW2NvZGVdKTsgbisrKSB7XG4gICAgICBfZGlzdF9jb2RlW2Rpc3QrK10gPSBjb2RlO1xuICAgIH1cbiAgfVxuICAvL0Fzc2VydCAoZGlzdCA9PSAyNTYsIFwidHJfc3RhdGljX2luaXQ6IGRpc3QgIT0gMjU2XCIpO1xuICBkaXN0ID4+PSA3OyAvKiBmcm9tIG5vdyBvbiwgYWxsIGRpc3RhbmNlcyBhcmUgZGl2aWRlZCBieSAxMjggKi9cbiAgZm9yICg7IGNvZGUgPCBEX0NPREVTOyBjb2RlKyspIHtcbiAgICBiYXNlX2Rpc3RbY29kZV0gPSBkaXN0IDw8IDc7XG4gICAgZm9yIChuID0gMDsgbiA8ICgxIDw8IChleHRyYV9kYml0c1tjb2RlXSAtIDcpKTsgbisrKSB7XG4gICAgICBfZGlzdF9jb2RlWzI1NiArIGRpc3QrK10gPSBjb2RlO1xuICAgIH1cbiAgfVxuICAvL0Fzc2VydCAoZGlzdCA9PSAyNTYsIFwidHJfc3RhdGljX2luaXQ6IDI1NitkaXN0ICE9IDUxMlwiKTtcblxuICAvKiBDb25zdHJ1Y3QgdGhlIGNvZGVzIG9mIHRoZSBzdGF0aWMgbGl0ZXJhbCB0cmVlICovXG4gIGZvciAoYml0cyA9IDA7IGJpdHMgPD0gTUFYX0JJVFM7IGJpdHMrKykge1xuICAgIGJsX2NvdW50W2JpdHNdID0gMDtcbiAgfVxuXG4gIG4gPSAwO1xuICB3aGlsZSAobiA8PSAxNDMpIHtcbiAgICBzdGF0aWNfbHRyZWVbbiAqIDIgKyAxXS8qLkxlbiovID0gODtcbiAgICBuKys7XG4gICAgYmxfY291bnRbOF0rKztcbiAgfVxuICB3aGlsZSAobiA8PSAyNTUpIHtcbiAgICBzdGF0aWNfbHRyZWVbbiAqIDIgKyAxXS8qLkxlbiovID0gOTtcbiAgICBuKys7XG4gICAgYmxfY291bnRbOV0rKztcbiAgfVxuICB3aGlsZSAobiA8PSAyNzkpIHtcbiAgICBzdGF0aWNfbHRyZWVbbiAqIDIgKyAxXS8qLkxlbiovID0gNztcbiAgICBuKys7XG4gICAgYmxfY291bnRbN10rKztcbiAgfVxuICB3aGlsZSAobiA8PSAyODcpIHtcbiAgICBzdGF0aWNfbHRyZWVbbiAqIDIgKyAxXS8qLkxlbiovID0gODtcbiAgICBuKys7XG4gICAgYmxfY291bnRbOF0rKztcbiAgfVxuICAvKiBDb2RlcyAyODYgYW5kIDI4NyBkbyBub3QgZXhpc3QsIGJ1dCB3ZSBtdXN0IGluY2x1ZGUgdGhlbSBpbiB0aGVcbiAgICogdHJlZSBjb25zdHJ1Y3Rpb24gdG8gZ2V0IGEgY2Fub25pY2FsIEh1ZmZtYW4gdHJlZSAobG9uZ2VzdCBjb2RlXG4gICAqIGFsbCBvbmVzKVxuICAgKi9cbiAgZ2VuX2NvZGVzKHN0YXRpY19sdHJlZSwgTF9DT0RFUyArIDEsIGJsX2NvdW50KTtcblxuICAvKiBUaGUgc3RhdGljIGRpc3RhbmNlIHRyZWUgaXMgdHJpdmlhbDogKi9cbiAgZm9yIChuID0gMDsgbiA8IERfQ09ERVM7IG4rKykge1xuICAgIHN0YXRpY19kdHJlZVtuICogMiArIDFdLyouTGVuKi8gPSA1O1xuICAgIHN0YXRpY19kdHJlZVtuICogMl0vKi5Db2RlKi8gPSBiaV9yZXZlcnNlKG4sIDUpO1xuICB9XG5cbiAgLy8gTm93IGRhdGEgcmVhZHkgYW5kIHdlIGNhbiBpbml0IHN0YXRpYyB0cmVlc1xuICBzdGF0aWNfbF9kZXNjID0gbmV3IFN0YXRpY1RyZWVEZXNjKHN0YXRpY19sdHJlZSwgZXh0cmFfbGJpdHMsIExJVEVSQUxTICsgMSwgTF9DT0RFUywgTUFYX0JJVFMpO1xuICBzdGF0aWNfZF9kZXNjID0gbmV3IFN0YXRpY1RyZWVEZXNjKHN0YXRpY19kdHJlZSwgZXh0cmFfZGJpdHMsIDAsICAgICAgICAgIERfQ09ERVMsIE1BWF9CSVRTKTtcbiAgc3RhdGljX2JsX2Rlc2MgPSBuZXcgU3RhdGljVHJlZURlc2MobmV3IEFycmF5KDApLCBleHRyYV9ibGJpdHMsIDAsICAgICAgICAgQkxfQ09ERVMsIE1BWF9CTF9CSVRTKTtcblxuICAvL3N0YXRpY19pbml0X2RvbmUgPSB0cnVlO1xufVxuXG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogSW5pdGlhbGl6ZSBhIG5ldyBibG9jay5cbiAqL1xuZnVuY3Rpb24gaW5pdF9ibG9jayhzKSB7XG4gIHZhciBuOyAvKiBpdGVyYXRlcyBvdmVyIHRyZWUgZWxlbWVudHMgKi9cblxuICAvKiBJbml0aWFsaXplIHRoZSB0cmVlcy4gKi9cbiAgZm9yIChuID0gMDsgbiA8IExfQ09ERVM7ICBuKyspIHsgcy5keW5fbHRyZWVbbiAqIDJdLyouRnJlcSovID0gMDsgfVxuICBmb3IgKG4gPSAwOyBuIDwgRF9DT0RFUzsgIG4rKykgeyBzLmR5bl9kdHJlZVtuICogMl0vKi5GcmVxKi8gPSAwOyB9XG4gIGZvciAobiA9IDA7IG4gPCBCTF9DT0RFUzsgbisrKSB7IHMuYmxfdHJlZVtuICogMl0vKi5GcmVxKi8gPSAwOyB9XG5cbiAgcy5keW5fbHRyZWVbRU5EX0JMT0NLICogMl0vKi5GcmVxKi8gPSAxO1xuICBzLm9wdF9sZW4gPSBzLnN0YXRpY19sZW4gPSAwO1xuICBzLmxhc3RfbGl0ID0gcy5tYXRjaGVzID0gMDtcbn1cblxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEZsdXNoIHRoZSBiaXQgYnVmZmVyIGFuZCBhbGlnbiB0aGUgb3V0cHV0IG9uIGEgYnl0ZSBib3VuZGFyeVxuICovXG5mdW5jdGlvbiBiaV93aW5kdXAocylcbntcbiAgaWYgKHMuYmlfdmFsaWQgPiA4KSB7XG4gICAgcHV0X3Nob3J0KHMsIHMuYmlfYnVmKTtcbiAgfSBlbHNlIGlmIChzLmJpX3ZhbGlkID4gMCkge1xuICAgIC8vcHV0X2J5dGUocywgKEJ5dGUpcy0+YmlfYnVmKTtcbiAgICBzLnBlbmRpbmdfYnVmW3MucGVuZGluZysrXSA9IHMuYmlfYnVmO1xuICB9XG4gIHMuYmlfYnVmID0gMDtcbiAgcy5iaV92YWxpZCA9IDA7XG59XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weSBhIHN0b3JlZCBibG9jaywgc3RvcmluZyBmaXJzdCB0aGUgbGVuZ3RoIGFuZCBpdHNcbiAqIG9uZSdzIGNvbXBsZW1lbnQgaWYgcmVxdWVzdGVkLlxuICovXG5mdW5jdGlvbiBjb3B5X2Jsb2NrKHMsIGJ1ZiwgbGVuLCBoZWFkZXIpXG4vL0RlZmxhdGVTdGF0ZSAqcztcbi8vY2hhcmYgICAgKmJ1ZjsgICAgLyogdGhlIGlucHV0IGRhdGEgKi9cbi8vdW5zaWduZWQgbGVuOyAgICAgLyogaXRzIGxlbmd0aCAqL1xuLy9pbnQgICAgICBoZWFkZXI7ICAvKiB0cnVlIGlmIGJsb2NrIGhlYWRlciBtdXN0IGJlIHdyaXR0ZW4gKi9cbntcbiAgYmlfd2luZHVwKHMpOyAgICAgICAgLyogYWxpZ24gb24gYnl0ZSBib3VuZGFyeSAqL1xuXG4gIGlmIChoZWFkZXIpIHtcbiAgICBwdXRfc2hvcnQocywgbGVuKTtcbiAgICBwdXRfc2hvcnQocywgfmxlbik7XG4gIH1cbi8vICB3aGlsZSAobGVuLS0pIHtcbi8vICAgIHB1dF9ieXRlKHMsICpidWYrKyk7XG4vLyAgfVxuICB1dGlscy5hcnJheVNldChzLnBlbmRpbmdfYnVmLCBzLndpbmRvdywgYnVmLCBsZW4sIHMucGVuZGluZyk7XG4gIHMucGVuZGluZyArPSBsZW47XG59XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29tcGFyZXMgdG8gc3VidHJlZXMsIHVzaW5nIHRoZSB0cmVlIGRlcHRoIGFzIHRpZSBicmVha2VyIHdoZW5cbiAqIHRoZSBzdWJ0cmVlcyBoYXZlIGVxdWFsIGZyZXF1ZW5jeS4gVGhpcyBtaW5pbWl6ZXMgdGhlIHdvcnN0IGNhc2UgbGVuZ3RoLlxuICovXG5mdW5jdGlvbiBzbWFsbGVyKHRyZWUsIG4sIG0sIGRlcHRoKSB7XG4gIHZhciBfbjIgPSBuICogMjtcbiAgdmFyIF9tMiA9IG0gKiAyO1xuICByZXR1cm4gKHRyZWVbX24yXS8qLkZyZXEqLyA8IHRyZWVbX20yXS8qLkZyZXEqLyB8fFxuICAgICAgICAgKHRyZWVbX24yXS8qLkZyZXEqLyA9PT0gdHJlZVtfbTJdLyouRnJlcSovICYmIGRlcHRoW25dIDw9IGRlcHRoW21dKSk7XG59XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogUmVzdG9yZSB0aGUgaGVhcCBwcm9wZXJ0eSBieSBtb3ZpbmcgZG93biB0aGUgdHJlZSBzdGFydGluZyBhdCBub2RlIGssXG4gKiBleGNoYW5naW5nIGEgbm9kZSB3aXRoIHRoZSBzbWFsbGVzdCBvZiBpdHMgdHdvIHNvbnMgaWYgbmVjZXNzYXJ5LCBzdG9wcGluZ1xuICogd2hlbiB0aGUgaGVhcCBwcm9wZXJ0eSBpcyByZS1lc3RhYmxpc2hlZCAoZWFjaCBmYXRoZXIgc21hbGxlciB0aGFuIGl0c1xuICogdHdvIHNvbnMpLlxuICovXG5mdW5jdGlvbiBwcWRvd25oZWFwKHMsIHRyZWUsIGspXG4vLyAgICBkZWZsYXRlX3N0YXRlICpzO1xuLy8gICAgY3RfZGF0YSAqdHJlZTsgIC8qIHRoZSB0cmVlIHRvIHJlc3RvcmUgKi9cbi8vICAgIGludCBrOyAgICAgICAgICAgICAgIC8qIG5vZGUgdG8gbW92ZSBkb3duICovXG57XG4gIHZhciB2ID0gcy5oZWFwW2tdO1xuICB2YXIgaiA9IGsgPDwgMTsgIC8qIGxlZnQgc29uIG9mIGsgKi9cbiAgd2hpbGUgKGogPD0gcy5oZWFwX2xlbikge1xuICAgIC8qIFNldCBqIHRvIHRoZSBzbWFsbGVzdCBvZiB0aGUgdHdvIHNvbnM6ICovXG4gICAgaWYgKGogPCBzLmhlYXBfbGVuICYmXG4gICAgICBzbWFsbGVyKHRyZWUsIHMuaGVhcFtqICsgMV0sIHMuaGVhcFtqXSwgcy5kZXB0aCkpIHtcbiAgICAgIGorKztcbiAgICB9XG4gICAgLyogRXhpdCBpZiB2IGlzIHNtYWxsZXIgdGhhbiBib3RoIHNvbnMgKi9cbiAgICBpZiAoc21hbGxlcih0cmVlLCB2LCBzLmhlYXBbal0sIHMuZGVwdGgpKSB7IGJyZWFrOyB9XG5cbiAgICAvKiBFeGNoYW5nZSB2IHdpdGggdGhlIHNtYWxsZXN0IHNvbiAqL1xuICAgIHMuaGVhcFtrXSA9IHMuaGVhcFtqXTtcbiAgICBrID0gajtcblxuICAgIC8qIEFuZCBjb250aW51ZSBkb3duIHRoZSB0cmVlLCBzZXR0aW5nIGogdG8gdGhlIGxlZnQgc29uIG9mIGsgKi9cbiAgICBqIDw8PSAxO1xuICB9XG4gIHMuaGVhcFtrXSA9IHY7XG59XG5cblxuLy8gaW5saW5lZCBtYW51YWxseVxuLy8gdmFyIFNNQUxMRVNUID0gMTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBTZW5kIHRoZSBibG9jayBkYXRhIGNvbXByZXNzZWQgdXNpbmcgdGhlIGdpdmVuIEh1ZmZtYW4gdHJlZXNcbiAqL1xuZnVuY3Rpb24gY29tcHJlc3NfYmxvY2socywgbHRyZWUsIGR0cmVlKVxuLy8gICAgZGVmbGF0ZV9zdGF0ZSAqcztcbi8vICAgIGNvbnN0IGN0X2RhdGEgKmx0cmVlOyAvKiBsaXRlcmFsIHRyZWUgKi9cbi8vICAgIGNvbnN0IGN0X2RhdGEgKmR0cmVlOyAvKiBkaXN0YW5jZSB0cmVlICovXG57XG4gIHZhciBkaXN0OyAgICAgICAgICAgLyogZGlzdGFuY2Ugb2YgbWF0Y2hlZCBzdHJpbmcgKi9cbiAgdmFyIGxjOyAgICAgICAgICAgICAvKiBtYXRjaCBsZW5ndGggb3IgdW5tYXRjaGVkIGNoYXIgKGlmIGRpc3QgPT0gMCkgKi9cbiAgdmFyIGx4ID0gMDsgICAgICAgICAvKiBydW5uaW5nIGluZGV4IGluIGxfYnVmICovXG4gIHZhciBjb2RlOyAgICAgICAgICAgLyogdGhlIGNvZGUgdG8gc2VuZCAqL1xuICB2YXIgZXh0cmE7ICAgICAgICAgIC8qIG51bWJlciBvZiBleHRyYSBiaXRzIHRvIHNlbmQgKi9cblxuICBpZiAocy5sYXN0X2xpdCAhPT0gMCkge1xuICAgIGRvIHtcbiAgICAgIGRpc3QgPSAocy5wZW5kaW5nX2J1ZltzLmRfYnVmICsgbHggKiAyXSA8PCA4KSB8IChzLnBlbmRpbmdfYnVmW3MuZF9idWYgKyBseCAqIDIgKyAxXSk7XG4gICAgICBsYyA9IHMucGVuZGluZ19idWZbcy5sX2J1ZiArIGx4XTtcbiAgICAgIGx4Kys7XG5cbiAgICAgIGlmIChkaXN0ID09PSAwKSB7XG4gICAgICAgIHNlbmRfY29kZShzLCBsYywgbHRyZWUpOyAvKiBzZW5kIGEgbGl0ZXJhbCBieXRlICovXG4gICAgICAgIC8vVHJhY2Vjdihpc2dyYXBoKGxjKSwgKHN0ZGVycixcIiAnJWMnIFwiLCBsYykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyogSGVyZSwgbGMgaXMgdGhlIG1hdGNoIGxlbmd0aCAtIE1JTl9NQVRDSCAqL1xuICAgICAgICBjb2RlID0gX2xlbmd0aF9jb2RlW2xjXTtcbiAgICAgICAgc2VuZF9jb2RlKHMsIGNvZGUgKyBMSVRFUkFMUyArIDEsIGx0cmVlKTsgLyogc2VuZCB0aGUgbGVuZ3RoIGNvZGUgKi9cbiAgICAgICAgZXh0cmEgPSBleHRyYV9sYml0c1tjb2RlXTtcbiAgICAgICAgaWYgKGV4dHJhICE9PSAwKSB7XG4gICAgICAgICAgbGMgLT0gYmFzZV9sZW5ndGhbY29kZV07XG4gICAgICAgICAgc2VuZF9iaXRzKHMsIGxjLCBleHRyYSk7ICAgICAgIC8qIHNlbmQgdGhlIGV4dHJhIGxlbmd0aCBiaXRzICovXG4gICAgICAgIH1cbiAgICAgICAgZGlzdC0tOyAvKiBkaXN0IGlzIG5vdyB0aGUgbWF0Y2ggZGlzdGFuY2UgLSAxICovXG4gICAgICAgIGNvZGUgPSBkX2NvZGUoZGlzdCk7XG4gICAgICAgIC8vQXNzZXJ0IChjb2RlIDwgRF9DT0RFUywgXCJiYWQgZF9jb2RlXCIpO1xuXG4gICAgICAgIHNlbmRfY29kZShzLCBjb2RlLCBkdHJlZSk7ICAgICAgIC8qIHNlbmQgdGhlIGRpc3RhbmNlIGNvZGUgKi9cbiAgICAgICAgZXh0cmEgPSBleHRyYV9kYml0c1tjb2RlXTtcbiAgICAgICAgaWYgKGV4dHJhICE9PSAwKSB7XG4gICAgICAgICAgZGlzdCAtPSBiYXNlX2Rpc3RbY29kZV07XG4gICAgICAgICAgc2VuZF9iaXRzKHMsIGRpc3QsIGV4dHJhKTsgICAvKiBzZW5kIHRoZSBleHRyYSBkaXN0YW5jZSBiaXRzICovXG4gICAgICAgIH1cbiAgICAgIH0gLyogbGl0ZXJhbCBvciBtYXRjaCBwYWlyID8gKi9cblxuICAgICAgLyogQ2hlY2sgdGhhdCB0aGUgb3ZlcmxheSBiZXR3ZWVuIHBlbmRpbmdfYnVmIGFuZCBkX2J1ZitsX2J1ZiBpcyBvazogKi9cbiAgICAgIC8vQXNzZXJ0KCh1SW50KShzLT5wZW5kaW5nKSA8IHMtPmxpdF9idWZzaXplICsgMipseCxcbiAgICAgIC8vICAgICAgIFwicGVuZGluZ0J1ZiBvdmVyZmxvd1wiKTtcblxuICAgIH0gd2hpbGUgKGx4IDwgcy5sYXN0X2xpdCk7XG4gIH1cblxuICBzZW5kX2NvZGUocywgRU5EX0JMT0NLLCBsdHJlZSk7XG59XG5cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb25zdHJ1Y3Qgb25lIEh1ZmZtYW4gdHJlZSBhbmQgYXNzaWducyB0aGUgY29kZSBiaXQgc3RyaW5ncyBhbmQgbGVuZ3Rocy5cbiAqIFVwZGF0ZSB0aGUgdG90YWwgYml0IGxlbmd0aCBmb3IgdGhlIGN1cnJlbnQgYmxvY2suXG4gKiBJTiBhc3NlcnRpb246IHRoZSBmaWVsZCBmcmVxIGlzIHNldCBmb3IgYWxsIHRyZWUgZWxlbWVudHMuXG4gKiBPVVQgYXNzZXJ0aW9uczogdGhlIGZpZWxkcyBsZW4gYW5kIGNvZGUgYXJlIHNldCB0byB0aGUgb3B0aW1hbCBiaXQgbGVuZ3RoXG4gKiAgICAgYW5kIGNvcnJlc3BvbmRpbmcgY29kZS4gVGhlIGxlbmd0aCBvcHRfbGVuIGlzIHVwZGF0ZWQ7IHN0YXRpY19sZW4gaXNcbiAqICAgICBhbHNvIHVwZGF0ZWQgaWYgc3RyZWUgaXMgbm90IG51bGwuIFRoZSBmaWVsZCBtYXhfY29kZSBpcyBzZXQuXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkX3RyZWUocywgZGVzYylcbi8vICAgIGRlZmxhdGVfc3RhdGUgKnM7XG4vLyAgICB0cmVlX2Rlc2MgKmRlc2M7IC8qIHRoZSB0cmVlIGRlc2NyaXB0b3IgKi9cbntcbiAgdmFyIHRyZWUgICAgID0gZGVzYy5keW5fdHJlZTtcbiAgdmFyIHN0cmVlICAgID0gZGVzYy5zdGF0X2Rlc2Muc3RhdGljX3RyZWU7XG4gIHZhciBoYXNfc3RyZWUgPSBkZXNjLnN0YXRfZGVzYy5oYXNfc3RyZWU7XG4gIHZhciBlbGVtcyAgICA9IGRlc2Muc3RhdF9kZXNjLmVsZW1zO1xuICB2YXIgbiwgbTsgICAgICAgICAgLyogaXRlcmF0ZSBvdmVyIGhlYXAgZWxlbWVudHMgKi9cbiAgdmFyIG1heF9jb2RlID0gLTE7IC8qIGxhcmdlc3QgY29kZSB3aXRoIG5vbiB6ZXJvIGZyZXF1ZW5jeSAqL1xuICB2YXIgbm9kZTsgICAgICAgICAgLyogbmV3IG5vZGUgYmVpbmcgY3JlYXRlZCAqL1xuXG4gIC8qIENvbnN0cnVjdCB0aGUgaW5pdGlhbCBoZWFwLCB3aXRoIGxlYXN0IGZyZXF1ZW50IGVsZW1lbnQgaW5cbiAgICogaGVhcFtTTUFMTEVTVF0uIFRoZSBzb25zIG9mIGhlYXBbbl0gYXJlIGhlYXBbMipuXSBhbmQgaGVhcFsyKm4rMV0uXG4gICAqIGhlYXBbMF0gaXMgbm90IHVzZWQuXG4gICAqL1xuICBzLmhlYXBfbGVuID0gMDtcbiAgcy5oZWFwX21heCA9IEhFQVBfU0laRTtcblxuICBmb3IgKG4gPSAwOyBuIDwgZWxlbXM7IG4rKykge1xuICAgIGlmICh0cmVlW24gKiAyXS8qLkZyZXEqLyAhPT0gMCkge1xuICAgICAgcy5oZWFwWysrcy5oZWFwX2xlbl0gPSBtYXhfY29kZSA9IG47XG4gICAgICBzLmRlcHRoW25dID0gMDtcblxuICAgIH0gZWxzZSB7XG4gICAgICB0cmVlW24gKiAyICsgMV0vKi5MZW4qLyA9IDA7XG4gICAgfVxuICB9XG5cbiAgLyogVGhlIHBremlwIGZvcm1hdCByZXF1aXJlcyB0aGF0IGF0IGxlYXN0IG9uZSBkaXN0YW5jZSBjb2RlIGV4aXN0cyxcbiAgICogYW5kIHRoYXQgYXQgbGVhc3Qgb25lIGJpdCBzaG91bGQgYmUgc2VudCBldmVuIGlmIHRoZXJlIGlzIG9ubHkgb25lXG4gICAqIHBvc3NpYmxlIGNvZGUuIFNvIHRvIGF2b2lkIHNwZWNpYWwgY2hlY2tzIGxhdGVyIG9uIHdlIGZvcmNlIGF0IGxlYXN0XG4gICAqIHR3byBjb2RlcyBvZiBub24gemVybyBmcmVxdWVuY3kuXG4gICAqL1xuICB3aGlsZSAocy5oZWFwX2xlbiA8IDIpIHtcbiAgICBub2RlID0gcy5oZWFwWysrcy5oZWFwX2xlbl0gPSAobWF4X2NvZGUgPCAyID8gKyttYXhfY29kZSA6IDApO1xuICAgIHRyZWVbbm9kZSAqIDJdLyouRnJlcSovID0gMTtcbiAgICBzLmRlcHRoW25vZGVdID0gMDtcbiAgICBzLm9wdF9sZW4tLTtcblxuICAgIGlmIChoYXNfc3RyZWUpIHtcbiAgICAgIHMuc3RhdGljX2xlbiAtPSBzdHJlZVtub2RlICogMiArIDFdLyouTGVuKi87XG4gICAgfVxuICAgIC8qIG5vZGUgaXMgMCBvciAxIHNvIGl0IGRvZXMgbm90IGhhdmUgZXh0cmEgYml0cyAqL1xuICB9XG4gIGRlc2MubWF4X2NvZGUgPSBtYXhfY29kZTtcblxuICAvKiBUaGUgZWxlbWVudHMgaGVhcFtoZWFwX2xlbi8yKzEgLi4gaGVhcF9sZW5dIGFyZSBsZWF2ZXMgb2YgdGhlIHRyZWUsXG4gICAqIGVzdGFibGlzaCBzdWItaGVhcHMgb2YgaW5jcmVhc2luZyBsZW5ndGhzOlxuICAgKi9cbiAgZm9yIChuID0gKHMuaGVhcF9sZW4gPj4gMS8qaW50IC8yKi8pOyBuID49IDE7IG4tLSkgeyBwcWRvd25oZWFwKHMsIHRyZWUsIG4pOyB9XG5cbiAgLyogQ29uc3RydWN0IHRoZSBIdWZmbWFuIHRyZWUgYnkgcmVwZWF0ZWRseSBjb21iaW5pbmcgdGhlIGxlYXN0IHR3b1xuICAgKiBmcmVxdWVudCBub2Rlcy5cbiAgICovXG4gIG5vZGUgPSBlbGVtczsgICAgICAgICAgICAgIC8qIG5leHQgaW50ZXJuYWwgbm9kZSBvZiB0aGUgdHJlZSAqL1xuICBkbyB7XG4gICAgLy9wcXJlbW92ZShzLCB0cmVlLCBuKTsgIC8qIG4gPSBub2RlIG9mIGxlYXN0IGZyZXF1ZW5jeSAqL1xuICAgIC8qKiogcHFyZW1vdmUgKioqL1xuICAgIG4gPSBzLmhlYXBbMS8qU01BTExFU1QqL107XG4gICAgcy5oZWFwWzEvKlNNQUxMRVNUKi9dID0gcy5oZWFwW3MuaGVhcF9sZW4tLV07XG4gICAgcHFkb3duaGVhcChzLCB0cmVlLCAxLypTTUFMTEVTVCovKTtcbiAgICAvKioqL1xuXG4gICAgbSA9IHMuaGVhcFsxLypTTUFMTEVTVCovXTsgLyogbSA9IG5vZGUgb2YgbmV4dCBsZWFzdCBmcmVxdWVuY3kgKi9cblxuICAgIHMuaGVhcFstLXMuaGVhcF9tYXhdID0gbjsgLyoga2VlcCB0aGUgbm9kZXMgc29ydGVkIGJ5IGZyZXF1ZW5jeSAqL1xuICAgIHMuaGVhcFstLXMuaGVhcF9tYXhdID0gbTtcblxuICAgIC8qIENyZWF0ZSBhIG5ldyBub2RlIGZhdGhlciBvZiBuIGFuZCBtICovXG4gICAgdHJlZVtub2RlICogMl0vKi5GcmVxKi8gPSB0cmVlW24gKiAyXS8qLkZyZXEqLyArIHRyZWVbbSAqIDJdLyouRnJlcSovO1xuICAgIHMuZGVwdGhbbm9kZV0gPSAocy5kZXB0aFtuXSA+PSBzLmRlcHRoW21dID8gcy5kZXB0aFtuXSA6IHMuZGVwdGhbbV0pICsgMTtcbiAgICB0cmVlW24gKiAyICsgMV0vKi5EYWQqLyA9IHRyZWVbbSAqIDIgKyAxXS8qLkRhZCovID0gbm9kZTtcblxuICAgIC8qIGFuZCBpbnNlcnQgdGhlIG5ldyBub2RlIGluIHRoZSBoZWFwICovXG4gICAgcy5oZWFwWzEvKlNNQUxMRVNUKi9dID0gbm9kZSsrO1xuICAgIHBxZG93bmhlYXAocywgdHJlZSwgMS8qU01BTExFU1QqLyk7XG5cbiAgfSB3aGlsZSAocy5oZWFwX2xlbiA+PSAyKTtcblxuICBzLmhlYXBbLS1zLmhlYXBfbWF4XSA9IHMuaGVhcFsxLypTTUFMTEVTVCovXTtcblxuICAvKiBBdCB0aGlzIHBvaW50LCB0aGUgZmllbGRzIGZyZXEgYW5kIGRhZCBhcmUgc2V0LiBXZSBjYW4gbm93XG4gICAqIGdlbmVyYXRlIHRoZSBiaXQgbGVuZ3Rocy5cbiAgICovXG4gIGdlbl9iaXRsZW4ocywgZGVzYyk7XG5cbiAgLyogVGhlIGZpZWxkIGxlbiBpcyBub3cgc2V0LCB3ZSBjYW4gZ2VuZXJhdGUgdGhlIGJpdCBjb2RlcyAqL1xuICBnZW5fY29kZXModHJlZSwgbWF4X2NvZGUsIHMuYmxfY291bnQpO1xufVxuXG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogU2NhbiBhIGxpdGVyYWwgb3IgZGlzdGFuY2UgdHJlZSB0byBkZXRlcm1pbmUgdGhlIGZyZXF1ZW5jaWVzIG9mIHRoZSBjb2Rlc1xuICogaW4gdGhlIGJpdCBsZW5ndGggdHJlZS5cbiAqL1xuZnVuY3Rpb24gc2Nhbl90cmVlKHMsIHRyZWUsIG1heF9jb2RlKVxuLy8gICAgZGVmbGF0ZV9zdGF0ZSAqcztcbi8vICAgIGN0X2RhdGEgKnRyZWU7ICAgLyogdGhlIHRyZWUgdG8gYmUgc2Nhbm5lZCAqL1xuLy8gICAgaW50IG1heF9jb2RlOyAgICAvKiBhbmQgaXRzIGxhcmdlc3QgY29kZSBvZiBub24gemVybyBmcmVxdWVuY3kgKi9cbntcbiAgdmFyIG47ICAgICAgICAgICAgICAgICAgICAgLyogaXRlcmF0ZXMgb3ZlciBhbGwgdHJlZSBlbGVtZW50cyAqL1xuICB2YXIgcHJldmxlbiA9IC0xOyAgICAgICAgICAvKiBsYXN0IGVtaXR0ZWQgbGVuZ3RoICovXG4gIHZhciBjdXJsZW47ICAgICAgICAgICAgICAgIC8qIGxlbmd0aCBvZiBjdXJyZW50IGNvZGUgKi9cblxuICB2YXIgbmV4dGxlbiA9IHRyZWVbMCAqIDIgKyAxXS8qLkxlbiovOyAvKiBsZW5ndGggb2YgbmV4dCBjb2RlICovXG5cbiAgdmFyIGNvdW50ID0gMDsgICAgICAgICAgICAgLyogcmVwZWF0IGNvdW50IG9mIHRoZSBjdXJyZW50IGNvZGUgKi9cbiAgdmFyIG1heF9jb3VudCA9IDc7ICAgICAgICAgLyogbWF4IHJlcGVhdCBjb3VudCAqL1xuICB2YXIgbWluX2NvdW50ID0gNDsgICAgICAgICAvKiBtaW4gcmVwZWF0IGNvdW50ICovXG5cbiAgaWYgKG5leHRsZW4gPT09IDApIHtcbiAgICBtYXhfY291bnQgPSAxMzg7XG4gICAgbWluX2NvdW50ID0gMztcbiAgfVxuICB0cmVlWyhtYXhfY29kZSArIDEpICogMiArIDFdLyouTGVuKi8gPSAweGZmZmY7IC8qIGd1YXJkICovXG5cbiAgZm9yIChuID0gMDsgbiA8PSBtYXhfY29kZTsgbisrKSB7XG4gICAgY3VybGVuID0gbmV4dGxlbjtcbiAgICBuZXh0bGVuID0gdHJlZVsobiArIDEpICogMiArIDFdLyouTGVuKi87XG5cbiAgICBpZiAoKytjb3VudCA8IG1heF9jb3VudCAmJiBjdXJsZW4gPT09IG5leHRsZW4pIHtcbiAgICAgIGNvbnRpbnVlO1xuXG4gICAgfSBlbHNlIGlmIChjb3VudCA8IG1pbl9jb3VudCkge1xuICAgICAgcy5ibF90cmVlW2N1cmxlbiAqIDJdLyouRnJlcSovICs9IGNvdW50O1xuXG4gICAgfSBlbHNlIGlmIChjdXJsZW4gIT09IDApIHtcblxuICAgICAgaWYgKGN1cmxlbiAhPT0gcHJldmxlbikgeyBzLmJsX3RyZWVbY3VybGVuICogMl0vKi5GcmVxKi8rKzsgfVxuICAgICAgcy5ibF90cmVlW1JFUF8zXzYgKiAyXS8qLkZyZXEqLysrO1xuXG4gICAgfSBlbHNlIGlmIChjb3VudCA8PSAxMCkge1xuICAgICAgcy5ibF90cmVlW1JFUFpfM18xMCAqIDJdLyouRnJlcSovKys7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgcy5ibF90cmVlW1JFUFpfMTFfMTM4ICogMl0vKi5GcmVxKi8rKztcbiAgICB9XG5cbiAgICBjb3VudCA9IDA7XG4gICAgcHJldmxlbiA9IGN1cmxlbjtcblxuICAgIGlmIChuZXh0bGVuID09PSAwKSB7XG4gICAgICBtYXhfY291bnQgPSAxMzg7XG4gICAgICBtaW5fY291bnQgPSAzO1xuXG4gICAgfSBlbHNlIGlmIChjdXJsZW4gPT09IG5leHRsZW4pIHtcbiAgICAgIG1heF9jb3VudCA9IDY7XG4gICAgICBtaW5fY291bnQgPSAzO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIG1heF9jb3VudCA9IDc7XG4gICAgICBtaW5fY291bnQgPSA0O1xuICAgIH1cbiAgfVxufVxuXG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogU2VuZCBhIGxpdGVyYWwgb3IgZGlzdGFuY2UgdHJlZSBpbiBjb21wcmVzc2VkIGZvcm0sIHVzaW5nIHRoZSBjb2RlcyBpblxuICogYmxfdHJlZS5cbiAqL1xuZnVuY3Rpb24gc2VuZF90cmVlKHMsIHRyZWUsIG1heF9jb2RlKVxuLy8gICAgZGVmbGF0ZV9zdGF0ZSAqcztcbi8vICAgIGN0X2RhdGEgKnRyZWU7IC8qIHRoZSB0cmVlIHRvIGJlIHNjYW5uZWQgKi9cbi8vICAgIGludCBtYXhfY29kZTsgICAgICAgLyogYW5kIGl0cyBsYXJnZXN0IGNvZGUgb2Ygbm9uIHplcm8gZnJlcXVlbmN5ICovXG57XG4gIHZhciBuOyAgICAgICAgICAgICAgICAgICAgIC8qIGl0ZXJhdGVzIG92ZXIgYWxsIHRyZWUgZWxlbWVudHMgKi9cbiAgdmFyIHByZXZsZW4gPSAtMTsgICAgICAgICAgLyogbGFzdCBlbWl0dGVkIGxlbmd0aCAqL1xuICB2YXIgY3VybGVuOyAgICAgICAgICAgICAgICAvKiBsZW5ndGggb2YgY3VycmVudCBjb2RlICovXG5cbiAgdmFyIG5leHRsZW4gPSB0cmVlWzAgKiAyICsgMV0vKi5MZW4qLzsgLyogbGVuZ3RoIG9mIG5leHQgY29kZSAqL1xuXG4gIHZhciBjb3VudCA9IDA7ICAgICAgICAgICAgIC8qIHJlcGVhdCBjb3VudCBvZiB0aGUgY3VycmVudCBjb2RlICovXG4gIHZhciBtYXhfY291bnQgPSA3OyAgICAgICAgIC8qIG1heCByZXBlYXQgY291bnQgKi9cbiAgdmFyIG1pbl9jb3VudCA9IDQ7ICAgICAgICAgLyogbWluIHJlcGVhdCBjb3VudCAqL1xuXG4gIC8qIHRyZWVbbWF4X2NvZGUrMV0uTGVuID0gLTE7ICovICAvKiBndWFyZCBhbHJlYWR5IHNldCAqL1xuICBpZiAobmV4dGxlbiA9PT0gMCkge1xuICAgIG1heF9jb3VudCA9IDEzODtcbiAgICBtaW5fY291bnQgPSAzO1xuICB9XG5cbiAgZm9yIChuID0gMDsgbiA8PSBtYXhfY29kZTsgbisrKSB7XG4gICAgY3VybGVuID0gbmV4dGxlbjtcbiAgICBuZXh0bGVuID0gdHJlZVsobiArIDEpICogMiArIDFdLyouTGVuKi87XG5cbiAgICBpZiAoKytjb3VudCA8IG1heF9jb3VudCAmJiBjdXJsZW4gPT09IG5leHRsZW4pIHtcbiAgICAgIGNvbnRpbnVlO1xuXG4gICAgfSBlbHNlIGlmIChjb3VudCA8IG1pbl9jb3VudCkge1xuICAgICAgZG8geyBzZW5kX2NvZGUocywgY3VybGVuLCBzLmJsX3RyZWUpOyB9IHdoaWxlICgtLWNvdW50ICE9PSAwKTtcblxuICAgIH0gZWxzZSBpZiAoY3VybGVuICE9PSAwKSB7XG4gICAgICBpZiAoY3VybGVuICE9PSBwcmV2bGVuKSB7XG4gICAgICAgIHNlbmRfY29kZShzLCBjdXJsZW4sIHMuYmxfdHJlZSk7XG4gICAgICAgIGNvdW50LS07XG4gICAgICB9XG4gICAgICAvL0Fzc2VydChjb3VudCA+PSAzICYmIGNvdW50IDw9IDYsIFwiIDNfNj9cIik7XG4gICAgICBzZW5kX2NvZGUocywgUkVQXzNfNiwgcy5ibF90cmVlKTtcbiAgICAgIHNlbmRfYml0cyhzLCBjb3VudCAtIDMsIDIpO1xuXG4gICAgfSBlbHNlIGlmIChjb3VudCA8PSAxMCkge1xuICAgICAgc2VuZF9jb2RlKHMsIFJFUFpfM18xMCwgcy5ibF90cmVlKTtcbiAgICAgIHNlbmRfYml0cyhzLCBjb3VudCAtIDMsIDMpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbmRfY29kZShzLCBSRVBaXzExXzEzOCwgcy5ibF90cmVlKTtcbiAgICAgIHNlbmRfYml0cyhzLCBjb3VudCAtIDExLCA3KTtcbiAgICB9XG5cbiAgICBjb3VudCA9IDA7XG4gICAgcHJldmxlbiA9IGN1cmxlbjtcbiAgICBpZiAobmV4dGxlbiA9PT0gMCkge1xuICAgICAgbWF4X2NvdW50ID0gMTM4O1xuICAgICAgbWluX2NvdW50ID0gMztcblxuICAgIH0gZWxzZSBpZiAoY3VybGVuID09PSBuZXh0bGVuKSB7XG4gICAgICBtYXhfY291bnQgPSA2O1xuICAgICAgbWluX2NvdW50ID0gMztcblxuICAgIH0gZWxzZSB7XG4gICAgICBtYXhfY291bnQgPSA3O1xuICAgICAgbWluX2NvdW50ID0gNDtcbiAgICB9XG4gIH1cbn1cblxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvbnN0cnVjdCB0aGUgSHVmZm1hbiB0cmVlIGZvciB0aGUgYml0IGxlbmd0aHMgYW5kIHJldHVybiB0aGUgaW5kZXggaW5cbiAqIGJsX29yZGVyIG9mIHRoZSBsYXN0IGJpdCBsZW5ndGggY29kZSB0byBzZW5kLlxuICovXG5mdW5jdGlvbiBidWlsZF9ibF90cmVlKHMpIHtcbiAgdmFyIG1heF9ibGluZGV4OyAgLyogaW5kZXggb2YgbGFzdCBiaXQgbGVuZ3RoIGNvZGUgb2Ygbm9uIHplcm8gZnJlcSAqL1xuXG4gIC8qIERldGVybWluZSB0aGUgYml0IGxlbmd0aCBmcmVxdWVuY2llcyBmb3IgbGl0ZXJhbCBhbmQgZGlzdGFuY2UgdHJlZXMgKi9cbiAgc2Nhbl90cmVlKHMsIHMuZHluX2x0cmVlLCBzLmxfZGVzYy5tYXhfY29kZSk7XG4gIHNjYW5fdHJlZShzLCBzLmR5bl9kdHJlZSwgcy5kX2Rlc2MubWF4X2NvZGUpO1xuXG4gIC8qIEJ1aWxkIHRoZSBiaXQgbGVuZ3RoIHRyZWU6ICovXG4gIGJ1aWxkX3RyZWUocywgcy5ibF9kZXNjKTtcbiAgLyogb3B0X2xlbiBub3cgaW5jbHVkZXMgdGhlIGxlbmd0aCBvZiB0aGUgdHJlZSByZXByZXNlbnRhdGlvbnMsIGV4Y2VwdFxuICAgKiB0aGUgbGVuZ3RocyBvZiB0aGUgYml0IGxlbmd0aHMgY29kZXMgYW5kIHRoZSA1KzUrNCBiaXRzIGZvciB0aGUgY291bnRzLlxuICAgKi9cblxuICAvKiBEZXRlcm1pbmUgdGhlIG51bWJlciBvZiBiaXQgbGVuZ3RoIGNvZGVzIHRvIHNlbmQuIFRoZSBwa3ppcCBmb3JtYXRcbiAgICogcmVxdWlyZXMgdGhhdCBhdCBsZWFzdCA0IGJpdCBsZW5ndGggY29kZXMgYmUgc2VudC4gKGFwcG5vdGUudHh0IHNheXNcbiAgICogMyBidXQgdGhlIGFjdHVhbCB2YWx1ZSB1c2VkIGlzIDQuKVxuICAgKi9cbiAgZm9yIChtYXhfYmxpbmRleCA9IEJMX0NPREVTIC0gMTsgbWF4X2JsaW5kZXggPj0gMzsgbWF4X2JsaW5kZXgtLSkge1xuICAgIGlmIChzLmJsX3RyZWVbYmxfb3JkZXJbbWF4X2JsaW5kZXhdICogMiArIDFdLyouTGVuKi8gIT09IDApIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICAvKiBVcGRhdGUgb3B0X2xlbiB0byBpbmNsdWRlIHRoZSBiaXQgbGVuZ3RoIHRyZWUgYW5kIGNvdW50cyAqL1xuICBzLm9wdF9sZW4gKz0gMyAqIChtYXhfYmxpbmRleCArIDEpICsgNSArIDUgKyA0O1xuICAvL1RyYWNldigoc3RkZXJyLCBcIlxcbmR5biB0cmVlczogZHluICVsZCwgc3RhdCAlbGRcIixcbiAgLy8gICAgICAgIHMtPm9wdF9sZW4sIHMtPnN0YXRpY19sZW4pKTtcblxuICByZXR1cm4gbWF4X2JsaW5kZXg7XG59XG5cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBTZW5kIHRoZSBoZWFkZXIgZm9yIGEgYmxvY2sgdXNpbmcgZHluYW1pYyBIdWZmbWFuIHRyZWVzOiB0aGUgY291bnRzLCB0aGVcbiAqIGxlbmd0aHMgb2YgdGhlIGJpdCBsZW5ndGggY29kZXMsIHRoZSBsaXRlcmFsIHRyZWUgYW5kIHRoZSBkaXN0YW5jZSB0cmVlLlxuICogSU4gYXNzZXJ0aW9uOiBsY29kZXMgPj0gMjU3LCBkY29kZXMgPj0gMSwgYmxjb2RlcyA+PSA0LlxuICovXG5mdW5jdGlvbiBzZW5kX2FsbF90cmVlcyhzLCBsY29kZXMsIGRjb2RlcywgYmxjb2Rlcylcbi8vICAgIGRlZmxhdGVfc3RhdGUgKnM7XG4vLyAgICBpbnQgbGNvZGVzLCBkY29kZXMsIGJsY29kZXM7IC8qIG51bWJlciBvZiBjb2RlcyBmb3IgZWFjaCB0cmVlICovXG57XG4gIHZhciByYW5rOyAgICAgICAgICAgICAgICAgICAgLyogaW5kZXggaW4gYmxfb3JkZXIgKi9cblxuICAvL0Fzc2VydCAobGNvZGVzID49IDI1NyAmJiBkY29kZXMgPj0gMSAmJiBibGNvZGVzID49IDQsIFwibm90IGVub3VnaCBjb2Rlc1wiKTtcbiAgLy9Bc3NlcnQgKGxjb2RlcyA8PSBMX0NPREVTICYmIGRjb2RlcyA8PSBEX0NPREVTICYmIGJsY29kZXMgPD0gQkxfQ09ERVMsXG4gIC8vICAgICAgICBcInRvbyBtYW55IGNvZGVzXCIpO1xuICAvL1RyYWNldigoc3RkZXJyLCBcIlxcbmJsIGNvdW50czogXCIpKTtcbiAgc2VuZF9iaXRzKHMsIGxjb2RlcyAtIDI1NywgNSk7IC8qIG5vdCArMjU1IGFzIHN0YXRlZCBpbiBhcHBub3RlLnR4dCAqL1xuICBzZW5kX2JpdHMocywgZGNvZGVzIC0gMSwgICA1KTtcbiAgc2VuZF9iaXRzKHMsIGJsY29kZXMgLSA0LCAgNCk7IC8qIG5vdCAtMyBhcyBzdGF0ZWQgaW4gYXBwbm90ZS50eHQgKi9cbiAgZm9yIChyYW5rID0gMDsgcmFuayA8IGJsY29kZXM7IHJhbmsrKykge1xuICAgIC8vVHJhY2V2KChzdGRlcnIsIFwiXFxuYmwgY29kZSAlMmQgXCIsIGJsX29yZGVyW3JhbmtdKSk7XG4gICAgc2VuZF9iaXRzKHMsIHMuYmxfdHJlZVtibF9vcmRlcltyYW5rXSAqIDIgKyAxXS8qLkxlbiovLCAzKTtcbiAgfVxuICAvL1RyYWNldigoc3RkZXJyLCBcIlxcbmJsIHRyZWU6IHNlbnQgJWxkXCIsIHMtPmJpdHNfc2VudCkpO1xuXG4gIHNlbmRfdHJlZShzLCBzLmR5bl9sdHJlZSwgbGNvZGVzIC0gMSk7IC8qIGxpdGVyYWwgdHJlZSAqL1xuICAvL1RyYWNldigoc3RkZXJyLCBcIlxcbmxpdCB0cmVlOiBzZW50ICVsZFwiLCBzLT5iaXRzX3NlbnQpKTtcblxuICBzZW5kX3RyZWUocywgcy5keW5fZHRyZWUsIGRjb2RlcyAtIDEpOyAvKiBkaXN0YW5jZSB0cmVlICovXG4gIC8vVHJhY2V2KChzdGRlcnIsIFwiXFxuZGlzdCB0cmVlOiBzZW50ICVsZFwiLCBzLT5iaXRzX3NlbnQpKTtcbn1cblxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENoZWNrIGlmIHRoZSBkYXRhIHR5cGUgaXMgVEVYVCBvciBCSU5BUlksIHVzaW5nIHRoZSBmb2xsb3dpbmcgYWxnb3JpdGhtOlxuICogLSBURVhUIGlmIHRoZSB0d28gY29uZGl0aW9ucyBiZWxvdyBhcmUgc2F0aXNmaWVkOlxuICogICAgYSkgVGhlcmUgYXJlIG5vIG5vbi1wb3J0YWJsZSBjb250cm9sIGNoYXJhY3RlcnMgYmVsb25naW5nIHRvIHRoZVxuICogICAgICAgXCJibGFjayBsaXN0XCIgKDAuLjYsIDE0Li4yNSwgMjguLjMxKS5cbiAqICAgIGIpIFRoZXJlIGlzIGF0IGxlYXN0IG9uZSBwcmludGFibGUgY2hhcmFjdGVyIGJlbG9uZ2luZyB0byB0aGVcbiAqICAgICAgIFwid2hpdGUgbGlzdFwiICg5IHtUQUJ9LCAxMCB7TEZ9LCAxMyB7Q1J9LCAzMi4uMjU1KS5cbiAqIC0gQklOQVJZIG90aGVyd2lzZS5cbiAqIC0gVGhlIGZvbGxvd2luZyBwYXJ0aWFsbHktcG9ydGFibGUgY29udHJvbCBjaGFyYWN0ZXJzIGZvcm0gYVxuICogICBcImdyYXkgbGlzdFwiIHRoYXQgaXMgaWdub3JlZCBpbiB0aGlzIGRldGVjdGlvbiBhbGdvcml0aG06XG4gKiAgICg3IHtCRUx9LCA4IHtCU30sIDExIHtWVH0sIDEyIHtGRn0sIDI2IHtTVUJ9LCAyNyB7RVNDfSkuXG4gKiBJTiBhc3NlcnRpb246IHRoZSBmaWVsZHMgRnJlcSBvZiBkeW5fbHRyZWUgYXJlIHNldC5cbiAqL1xuZnVuY3Rpb24gZGV0ZWN0X2RhdGFfdHlwZShzKSB7XG4gIC8qIGJsYWNrX21hc2sgaXMgdGhlIGJpdCBtYXNrIG9mIGJsYWNrLWxpc3RlZCBieXRlc1xuICAgKiBzZXQgYml0cyAwLi42LCAxNC4uMjUsIGFuZCAyOC4uMzFcbiAgICogMHhmM2ZmYzA3ZiA9IGJpbmFyeSAxMTExMDAxMTExMTExMTExMTEwMDAwMDAwMTExMTExMVxuICAgKi9cbiAgdmFyIGJsYWNrX21hc2sgPSAweGYzZmZjMDdmO1xuICB2YXIgbjtcblxuICAvKiBDaGVjayBmb3Igbm9uLXRleHR1YWwgKFwiYmxhY2stbGlzdGVkXCIpIGJ5dGVzLiAqL1xuICBmb3IgKG4gPSAwOyBuIDw9IDMxOyBuKyssIGJsYWNrX21hc2sgPj4+PSAxKSB7XG4gICAgaWYgKChibGFja19tYXNrICYgMSkgJiYgKHMuZHluX2x0cmVlW24gKiAyXS8qLkZyZXEqLyAhPT0gMCkpIHtcbiAgICAgIHJldHVybiBaX0JJTkFSWTtcbiAgICB9XG4gIH1cblxuICAvKiBDaGVjayBmb3IgdGV4dHVhbCAoXCJ3aGl0ZS1saXN0ZWRcIikgYnl0ZXMuICovXG4gIGlmIChzLmR5bl9sdHJlZVs5ICogMl0vKi5GcmVxKi8gIT09IDAgfHwgcy5keW5fbHRyZWVbMTAgKiAyXS8qLkZyZXEqLyAhPT0gMCB8fFxuICAgICAgcy5keW5fbHRyZWVbMTMgKiAyXS8qLkZyZXEqLyAhPT0gMCkge1xuICAgIHJldHVybiBaX1RFWFQ7XG4gIH1cbiAgZm9yIChuID0gMzI7IG4gPCBMSVRFUkFMUzsgbisrKSB7XG4gICAgaWYgKHMuZHluX2x0cmVlW24gKiAyXS8qLkZyZXEqLyAhPT0gMCkge1xuICAgICAgcmV0dXJuIFpfVEVYVDtcbiAgICB9XG4gIH1cblxuICAvKiBUaGVyZSBhcmUgbm8gXCJibGFjay1saXN0ZWRcIiBvciBcIndoaXRlLWxpc3RlZFwiIGJ5dGVzOlxuICAgKiB0aGlzIHN0cmVhbSBlaXRoZXIgaXMgZW1wdHkgb3IgaGFzIHRvbGVyYXRlZCAoXCJncmF5LWxpc3RlZFwiKSBieXRlcyBvbmx5LlxuICAgKi9cbiAgcmV0dXJuIFpfQklOQVJZO1xufVxuXG5cbnZhciBzdGF0aWNfaW5pdF9kb25lID0gZmFsc2U7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogSW5pdGlhbGl6ZSB0aGUgdHJlZSBkYXRhIHN0cnVjdHVyZXMgZm9yIGEgbmV3IHpsaWIgc3RyZWFtLlxuICovXG5mdW5jdGlvbiBfdHJfaW5pdChzKVxue1xuXG4gIGlmICghc3RhdGljX2luaXRfZG9uZSkge1xuICAgIHRyX3N0YXRpY19pbml0KCk7XG4gICAgc3RhdGljX2luaXRfZG9uZSA9IHRydWU7XG4gIH1cblxuICBzLmxfZGVzYyAgPSBuZXcgVHJlZURlc2Mocy5keW5fbHRyZWUsIHN0YXRpY19sX2Rlc2MpO1xuICBzLmRfZGVzYyAgPSBuZXcgVHJlZURlc2Mocy5keW5fZHRyZWUsIHN0YXRpY19kX2Rlc2MpO1xuICBzLmJsX2Rlc2MgPSBuZXcgVHJlZURlc2Mocy5ibF90cmVlLCBzdGF0aWNfYmxfZGVzYyk7XG5cbiAgcy5iaV9idWYgPSAwO1xuICBzLmJpX3ZhbGlkID0gMDtcblxuICAvKiBJbml0aWFsaXplIHRoZSBmaXJzdCBibG9jayBvZiB0aGUgZmlyc3QgZmlsZTogKi9cbiAgaW5pdF9ibG9jayhzKTtcbn1cblxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIFNlbmQgYSBzdG9yZWQgYmxvY2tcbiAqL1xuZnVuY3Rpb24gX3RyX3N0b3JlZF9ibG9jayhzLCBidWYsIHN0b3JlZF9sZW4sIGxhc3QpXG4vL0RlZmxhdGVTdGF0ZSAqcztcbi8vY2hhcmYgKmJ1ZjsgICAgICAgLyogaW5wdXQgYmxvY2sgKi9cbi8vdWxnIHN0b3JlZF9sZW47ICAgLyogbGVuZ3RoIG9mIGlucHV0IGJsb2NrICovXG4vL2ludCBsYXN0OyAgICAgICAgIC8qIG9uZSBpZiB0aGlzIGlzIHRoZSBsYXN0IGJsb2NrIGZvciBhIGZpbGUgKi9cbntcbiAgc2VuZF9iaXRzKHMsIChTVE9SRURfQkxPQ0sgPDwgMSkgKyAobGFzdCA/IDEgOiAwKSwgMyk7ICAgIC8qIHNlbmQgYmxvY2sgdHlwZSAqL1xuICBjb3B5X2Jsb2NrKHMsIGJ1Ziwgc3RvcmVkX2xlbiwgdHJ1ZSk7IC8qIHdpdGggaGVhZGVyICovXG59XG5cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBTZW5kIG9uZSBlbXB0eSBzdGF0aWMgYmxvY2sgdG8gZ2l2ZSBlbm91Z2ggbG9va2FoZWFkIGZvciBpbmZsYXRlLlxuICogVGhpcyB0YWtlcyAxMCBiaXRzLCBvZiB3aGljaCA3IG1heSByZW1haW4gaW4gdGhlIGJpdCBidWZmZXIuXG4gKi9cbmZ1bmN0aW9uIF90cl9hbGlnbihzKSB7XG4gIHNlbmRfYml0cyhzLCBTVEFUSUNfVFJFRVMgPDwgMSwgMyk7XG4gIHNlbmRfY29kZShzLCBFTkRfQkxPQ0ssIHN0YXRpY19sdHJlZSk7XG4gIGJpX2ZsdXNoKHMpO1xufVxuXG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogRGV0ZXJtaW5lIHRoZSBiZXN0IGVuY29kaW5nIGZvciB0aGUgY3VycmVudCBibG9jazogZHluYW1pYyB0cmVlcywgc3RhdGljXG4gKiB0cmVlcyBvciBzdG9yZSwgYW5kIG91dHB1dCB0aGUgZW5jb2RlZCBibG9jayB0byB0aGUgemlwIGZpbGUuXG4gKi9cbmZ1bmN0aW9uIF90cl9mbHVzaF9ibG9jayhzLCBidWYsIHN0b3JlZF9sZW4sIGxhc3QpXG4vL0RlZmxhdGVTdGF0ZSAqcztcbi8vY2hhcmYgKmJ1ZjsgICAgICAgLyogaW5wdXQgYmxvY2ssIG9yIE5VTEwgaWYgdG9vIG9sZCAqL1xuLy91bGcgc3RvcmVkX2xlbjsgICAvKiBsZW5ndGggb2YgaW5wdXQgYmxvY2sgKi9cbi8vaW50IGxhc3Q7ICAgICAgICAgLyogb25lIGlmIHRoaXMgaXMgdGhlIGxhc3QgYmxvY2sgZm9yIGEgZmlsZSAqL1xue1xuICB2YXIgb3B0X2xlbmIsIHN0YXRpY19sZW5iOyAgLyogb3B0X2xlbiBhbmQgc3RhdGljX2xlbiBpbiBieXRlcyAqL1xuICB2YXIgbWF4X2JsaW5kZXggPSAwOyAgICAgICAgLyogaW5kZXggb2YgbGFzdCBiaXQgbGVuZ3RoIGNvZGUgb2Ygbm9uIHplcm8gZnJlcSAqL1xuXG4gIC8qIEJ1aWxkIHRoZSBIdWZmbWFuIHRyZWVzIHVubGVzcyBhIHN0b3JlZCBibG9jayBpcyBmb3JjZWQgKi9cbiAgaWYgKHMubGV2ZWwgPiAwKSB7XG5cbiAgICAvKiBDaGVjayBpZiB0aGUgZmlsZSBpcyBiaW5hcnkgb3IgdGV4dCAqL1xuICAgIGlmIChzLnN0cm0uZGF0YV90eXBlID09PSBaX1VOS05PV04pIHtcbiAgICAgIHMuc3RybS5kYXRhX3R5cGUgPSBkZXRlY3RfZGF0YV90eXBlKHMpO1xuICAgIH1cblxuICAgIC8qIENvbnN0cnVjdCB0aGUgbGl0ZXJhbCBhbmQgZGlzdGFuY2UgdHJlZXMgKi9cbiAgICBidWlsZF90cmVlKHMsIHMubF9kZXNjKTtcbiAgICAvLyBUcmFjZXYoKHN0ZGVyciwgXCJcXG5saXQgZGF0YTogZHluICVsZCwgc3RhdCAlbGRcIiwgcy0+b3B0X2xlbixcbiAgICAvLyAgICAgICAgcy0+c3RhdGljX2xlbikpO1xuXG4gICAgYnVpbGRfdHJlZShzLCBzLmRfZGVzYyk7XG4gICAgLy8gVHJhY2V2KChzdGRlcnIsIFwiXFxuZGlzdCBkYXRhOiBkeW4gJWxkLCBzdGF0ICVsZFwiLCBzLT5vcHRfbGVuLFxuICAgIC8vICAgICAgICBzLT5zdGF0aWNfbGVuKSk7XG4gICAgLyogQXQgdGhpcyBwb2ludCwgb3B0X2xlbiBhbmQgc3RhdGljX2xlbiBhcmUgdGhlIHRvdGFsIGJpdCBsZW5ndGhzIG9mXG4gICAgICogdGhlIGNvbXByZXNzZWQgYmxvY2sgZGF0YSwgZXhjbHVkaW5nIHRoZSB0cmVlIHJlcHJlc2VudGF0aW9ucy5cbiAgICAgKi9cblxuICAgIC8qIEJ1aWxkIHRoZSBiaXQgbGVuZ3RoIHRyZWUgZm9yIHRoZSBhYm92ZSB0d28gdHJlZXMsIGFuZCBnZXQgdGhlIGluZGV4XG4gICAgICogaW4gYmxfb3JkZXIgb2YgdGhlIGxhc3QgYml0IGxlbmd0aCBjb2RlIHRvIHNlbmQuXG4gICAgICovXG4gICAgbWF4X2JsaW5kZXggPSBidWlsZF9ibF90cmVlKHMpO1xuXG4gICAgLyogRGV0ZXJtaW5lIHRoZSBiZXN0IGVuY29kaW5nLiBDb21wdXRlIHRoZSBibG9jayBsZW5ndGhzIGluIGJ5dGVzLiAqL1xuICAgIG9wdF9sZW5iID0gKHMub3B0X2xlbiArIDMgKyA3KSA+Pj4gMztcbiAgICBzdGF0aWNfbGVuYiA9IChzLnN0YXRpY19sZW4gKyAzICsgNykgPj4+IDM7XG5cbiAgICAvLyBUcmFjZXYoKHN0ZGVyciwgXCJcXG5vcHQgJWx1KCVsdSkgc3RhdCAlbHUoJWx1KSBzdG9yZWQgJWx1IGxpdCAldSBcIixcbiAgICAvLyAgICAgICAgb3B0X2xlbmIsIHMtPm9wdF9sZW4sIHN0YXRpY19sZW5iLCBzLT5zdGF0aWNfbGVuLCBzdG9yZWRfbGVuLFxuICAgIC8vICAgICAgICBzLT5sYXN0X2xpdCkpO1xuXG4gICAgaWYgKHN0YXRpY19sZW5iIDw9IG9wdF9sZW5iKSB7IG9wdF9sZW5iID0gc3RhdGljX2xlbmI7IH1cblxuICB9IGVsc2Uge1xuICAgIC8vIEFzc2VydChidWYgIT0gKGNoYXIqKTAsIFwibG9zdCBidWZcIik7XG4gICAgb3B0X2xlbmIgPSBzdGF0aWNfbGVuYiA9IHN0b3JlZF9sZW4gKyA1OyAvKiBmb3JjZSBhIHN0b3JlZCBibG9jayAqL1xuICB9XG5cbiAgaWYgKChzdG9yZWRfbGVuICsgNCA8PSBvcHRfbGVuYikgJiYgKGJ1ZiAhPT0gLTEpKSB7XG4gICAgLyogNDogdHdvIHdvcmRzIGZvciB0aGUgbGVuZ3RocyAqL1xuXG4gICAgLyogVGhlIHRlc3QgYnVmICE9IE5VTEwgaXMgb25seSBuZWNlc3NhcnkgaWYgTElUX0JVRlNJWkUgPiBXU0laRS5cbiAgICAgKiBPdGhlcndpc2Ugd2UgY2FuJ3QgaGF2ZSBwcm9jZXNzZWQgbW9yZSB0aGFuIFdTSVpFIGlucHV0IGJ5dGVzIHNpbmNlXG4gICAgICogdGhlIGxhc3QgYmxvY2sgZmx1c2gsIGJlY2F1c2UgY29tcHJlc3Npb24gd291bGQgaGF2ZSBiZWVuXG4gICAgICogc3VjY2Vzc2Z1bC4gSWYgTElUX0JVRlNJWkUgPD0gV1NJWkUsIGl0IGlzIG5ldmVyIHRvbyBsYXRlIHRvXG4gICAgICogdHJhbnNmb3JtIGEgYmxvY2sgaW50byBhIHN0b3JlZCBibG9jay5cbiAgICAgKi9cbiAgICBfdHJfc3RvcmVkX2Jsb2NrKHMsIGJ1Ziwgc3RvcmVkX2xlbiwgbGFzdCk7XG5cbiAgfSBlbHNlIGlmIChzLnN0cmF0ZWd5ID09PSBaX0ZJWEVEIHx8IHN0YXRpY19sZW5iID09PSBvcHRfbGVuYikge1xuXG4gICAgc2VuZF9iaXRzKHMsIChTVEFUSUNfVFJFRVMgPDwgMSkgKyAobGFzdCA/IDEgOiAwKSwgMyk7XG4gICAgY29tcHJlc3NfYmxvY2socywgc3RhdGljX2x0cmVlLCBzdGF0aWNfZHRyZWUpO1xuXG4gIH0gZWxzZSB7XG4gICAgc2VuZF9iaXRzKHMsIChEWU5fVFJFRVMgPDwgMSkgKyAobGFzdCA/IDEgOiAwKSwgMyk7XG4gICAgc2VuZF9hbGxfdHJlZXMocywgcy5sX2Rlc2MubWF4X2NvZGUgKyAxLCBzLmRfZGVzYy5tYXhfY29kZSArIDEsIG1heF9ibGluZGV4ICsgMSk7XG4gICAgY29tcHJlc3NfYmxvY2socywgcy5keW5fbHRyZWUsIHMuZHluX2R0cmVlKTtcbiAgfVxuICAvLyBBc3NlcnQgKHMtPmNvbXByZXNzZWRfbGVuID09IHMtPmJpdHNfc2VudCwgXCJiYWQgY29tcHJlc3NlZCBzaXplXCIpO1xuICAvKiBUaGUgYWJvdmUgY2hlY2sgaXMgbWFkZSBtb2QgMl4zMiwgZm9yIGZpbGVzIGxhcmdlciB0aGFuIDUxMiBNQlxuICAgKiBhbmQgdUxvbmcgaW1wbGVtZW50ZWQgb24gMzIgYml0cy5cbiAgICovXG4gIGluaXRfYmxvY2socyk7XG5cbiAgaWYgKGxhc3QpIHtcbiAgICBiaV93aW5kdXAocyk7XG4gIH1cbiAgLy8gVHJhY2V2KChzdGRlcnIsXCJcXG5jb21wcmxlbiAlbHUoJWx1KSBcIiwgcy0+Y29tcHJlc3NlZF9sZW4+PjMsXG4gIC8vICAgICAgIHMtPmNvbXByZXNzZWRfbGVuLTcqbGFzdCkpO1xufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIFNhdmUgdGhlIG1hdGNoIGluZm8gYW5kIHRhbGx5IHRoZSBmcmVxdWVuY3kgY291bnRzLiBSZXR1cm4gdHJ1ZSBpZlxuICogdGhlIGN1cnJlbnQgYmxvY2sgbXVzdCBiZSBmbHVzaGVkLlxuICovXG5mdW5jdGlvbiBfdHJfdGFsbHkocywgZGlzdCwgbGMpXG4vLyAgICBkZWZsYXRlX3N0YXRlICpzO1xuLy8gICAgdW5zaWduZWQgZGlzdDsgIC8qIGRpc3RhbmNlIG9mIG1hdGNoZWQgc3RyaW5nICovXG4vLyAgICB1bnNpZ25lZCBsYzsgICAgLyogbWF0Y2ggbGVuZ3RoLU1JTl9NQVRDSCBvciB1bm1hdGNoZWQgY2hhciAoaWYgZGlzdD09MCkgKi9cbntcbiAgLy92YXIgb3V0X2xlbmd0aCwgaW5fbGVuZ3RoLCBkY29kZTtcblxuICBzLnBlbmRpbmdfYnVmW3MuZF9idWYgKyBzLmxhc3RfbGl0ICogMl0gICAgID0gKGRpc3QgPj4+IDgpICYgMHhmZjtcbiAgcy5wZW5kaW5nX2J1ZltzLmRfYnVmICsgcy5sYXN0X2xpdCAqIDIgKyAxXSA9IGRpc3QgJiAweGZmO1xuXG4gIHMucGVuZGluZ19idWZbcy5sX2J1ZiArIHMubGFzdF9saXRdID0gbGMgJiAweGZmO1xuICBzLmxhc3RfbGl0Kys7XG5cbiAgaWYgKGRpc3QgPT09IDApIHtcbiAgICAvKiBsYyBpcyB0aGUgdW5tYXRjaGVkIGNoYXIgKi9cbiAgICBzLmR5bl9sdHJlZVtsYyAqIDJdLyouRnJlcSovKys7XG4gIH0gZWxzZSB7XG4gICAgcy5tYXRjaGVzKys7XG4gICAgLyogSGVyZSwgbGMgaXMgdGhlIG1hdGNoIGxlbmd0aCAtIE1JTl9NQVRDSCAqL1xuICAgIGRpc3QtLTsgICAgICAgICAgICAgLyogZGlzdCA9IG1hdGNoIGRpc3RhbmNlIC0gMSAqL1xuICAgIC8vQXNzZXJ0KCh1c2gpZGlzdCA8ICh1c2gpTUFYX0RJU1QocykgJiZcbiAgICAvLyAgICAgICAodXNoKWxjIDw9ICh1c2gpKE1BWF9NQVRDSC1NSU5fTUFUQ0gpICYmXG4gICAgLy8gICAgICAgKHVzaClkX2NvZGUoZGlzdCkgPCAodXNoKURfQ09ERVMsICBcIl90cl90YWxseTogYmFkIG1hdGNoXCIpO1xuXG4gICAgcy5keW5fbHRyZWVbKF9sZW5ndGhfY29kZVtsY10gKyBMSVRFUkFMUyArIDEpICogMl0vKi5GcmVxKi8rKztcbiAgICBzLmR5bl9kdHJlZVtkX2NvZGUoZGlzdCkgKiAyXS8qLkZyZXEqLysrO1xuICB9XG5cbi8vICghKSBUaGlzIGJsb2NrIGlzIGRpc2FibGVkIGluIHpsaWIgZGVmYXVsdHMsXG4vLyBkb24ndCBlbmFibGUgaXQgZm9yIGJpbmFyeSBjb21wYXRpYmlsaXR5XG5cbi8vI2lmZGVmIFRSVU5DQVRFX0JMT0NLXG4vLyAgLyogVHJ5IHRvIGd1ZXNzIGlmIGl0IGlzIHByb2ZpdGFibGUgdG8gc3RvcCB0aGUgY3VycmVudCBibG9jayBoZXJlICovXG4vLyAgaWYgKChzLmxhc3RfbGl0ICYgMHgxZmZmKSA9PT0gMCAmJiBzLmxldmVsID4gMikge1xuLy8gICAgLyogQ29tcHV0ZSBhbiB1cHBlciBib3VuZCBmb3IgdGhlIGNvbXByZXNzZWQgbGVuZ3RoICovXG4vLyAgICBvdXRfbGVuZ3RoID0gcy5sYXN0X2xpdCo4O1xuLy8gICAgaW5fbGVuZ3RoID0gcy5zdHJzdGFydCAtIHMuYmxvY2tfc3RhcnQ7XG4vL1xuLy8gICAgZm9yIChkY29kZSA9IDA7IGRjb2RlIDwgRF9DT0RFUzsgZGNvZGUrKykge1xuLy8gICAgICBvdXRfbGVuZ3RoICs9IHMuZHluX2R0cmVlW2Rjb2RlKjJdLyouRnJlcSovICogKDUgKyBleHRyYV9kYml0c1tkY29kZV0pO1xuLy8gICAgfVxuLy8gICAgb3V0X2xlbmd0aCA+Pj49IDM7XG4vLyAgICAvL1RyYWNldigoc3RkZXJyLFwiXFxubGFzdF9saXQgJXUsIGluICVsZCwgb3V0IH4lbGQoJWxkJSUpIFwiLFxuLy8gICAgLy8gICAgICAgcy0+bGFzdF9saXQsIGluX2xlbmd0aCwgb3V0X2xlbmd0aCxcbi8vICAgIC8vICAgICAgIDEwMEwgLSBvdXRfbGVuZ3RoKjEwMEwvaW5fbGVuZ3RoKSk7XG4vLyAgICBpZiAocy5tYXRjaGVzIDwgKHMubGFzdF9saXQ+PjEpLyppbnQgLzIqLyAmJiBvdXRfbGVuZ3RoIDwgKGluX2xlbmd0aD4+MSkvKmludCAvMiovKSB7XG4vLyAgICAgIHJldHVybiB0cnVlO1xuLy8gICAgfVxuLy8gIH1cbi8vI2VuZGlmXG5cbiAgcmV0dXJuIChzLmxhc3RfbGl0ID09PSBzLmxpdF9idWZzaXplIC0gMSk7XG4gIC8qIFdlIGF2b2lkIGVxdWFsaXR5IHdpdGggbGl0X2J1ZnNpemUgYmVjYXVzZSBvZiB3cmFwYXJvdW5kIGF0IDY0S1xuICAgKiBvbiAxNiBiaXQgbWFjaGluZXMgYW5kIGJlY2F1c2Ugc3RvcmVkIGJsb2NrcyBhcmUgcmVzdHJpY3RlZCB0b1xuICAgKiA2NEstMSBieXRlcy5cbiAgICovXG59XG5cbmV4cG9ydHMuX3RyX2luaXQgID0gX3RyX2luaXQ7XG5leHBvcnRzLl90cl9zdG9yZWRfYmxvY2sgPSBfdHJfc3RvcmVkX2Jsb2NrO1xuZXhwb3J0cy5fdHJfZmx1c2hfYmxvY2sgID0gX3RyX2ZsdXNoX2Jsb2NrO1xuZXhwb3J0cy5fdHJfdGFsbHkgPSBfdHJfdGFsbHk7XG5leHBvcnRzLl90cl9hbGlnbiA9IF90cl9hbGlnbjtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gKEMpIDE5OTUtMjAxMyBKZWFuLWxvdXAgR2FpbGx5IGFuZCBNYXJrIEFkbGVyXG4vLyAoQykgMjAxNC0yMDE3IFZpdGFseSBQdXpyaW4gYW5kIEFuZHJleSBUdXBpdHNpblxuLy9cbi8vIFRoaXMgc29mdHdhcmUgaXMgcHJvdmlkZWQgJ2FzLWlzJywgd2l0aG91dCBhbnkgZXhwcmVzcyBvciBpbXBsaWVkXG4vLyB3YXJyYW50eS4gSW4gbm8gZXZlbnQgd2lsbCB0aGUgYXV0aG9ycyBiZSBoZWxkIGxpYWJsZSBmb3IgYW55IGRhbWFnZXNcbi8vIGFyaXNpbmcgZnJvbSB0aGUgdXNlIG9mIHRoaXMgc29mdHdhcmUuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIGFueW9uZSB0byB1c2UgdGhpcyBzb2Z0d2FyZSBmb3IgYW55IHB1cnBvc2UsXG4vLyBpbmNsdWRpbmcgY29tbWVyY2lhbCBhcHBsaWNhdGlvbnMsIGFuZCB0byBhbHRlciBpdCBhbmQgcmVkaXN0cmlidXRlIGl0XG4vLyBmcmVlbHksIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyByZXN0cmljdGlvbnM6XG4vL1xuLy8gMS4gVGhlIG9yaWdpbiBvZiB0aGlzIHNvZnR3YXJlIG11c3Qgbm90IGJlIG1pc3JlcHJlc2VudGVkOyB5b3UgbXVzdCBub3Rcbi8vICAgY2xhaW0gdGhhdCB5b3Ugd3JvdGUgdGhlIG9yaWdpbmFsIHNvZnR3YXJlLiBJZiB5b3UgdXNlIHRoaXMgc29mdHdhcmVcbi8vICAgaW4gYSBwcm9kdWN0LCBhbiBhY2tub3dsZWRnbWVudCBpbiB0aGUgcHJvZHVjdCBkb2N1bWVudGF0aW9uIHdvdWxkIGJlXG4vLyAgIGFwcHJlY2lhdGVkIGJ1dCBpcyBub3QgcmVxdWlyZWQuXG4vLyAyLiBBbHRlcmVkIHNvdXJjZSB2ZXJzaW9ucyBtdXN0IGJlIHBsYWlubHkgbWFya2VkIGFzIHN1Y2gsIGFuZCBtdXN0IG5vdCBiZVxuLy8gICBtaXNyZXByZXNlbnRlZCBhcyBiZWluZyB0aGUgb3JpZ2luYWwgc29mdHdhcmUuXG4vLyAzLiBUaGlzIG5vdGljZSBtYXkgbm90IGJlIHJlbW92ZWQgb3IgYWx0ZXJlZCBmcm9tIGFueSBzb3VyY2UgZGlzdHJpYnV0aW9uLlxuXG5mdW5jdGlvbiBaU3RyZWFtKCkge1xuICAvKiBuZXh0IGlucHV0IGJ5dGUgKi9cbiAgdGhpcy5pbnB1dCA9IG51bGw7IC8vIEpTIHNwZWNpZmljLCBiZWNhdXNlIHdlIGhhdmUgbm8gcG9pbnRlcnNcbiAgdGhpcy5uZXh0X2luID0gMDtcbiAgLyogbnVtYmVyIG9mIGJ5dGVzIGF2YWlsYWJsZSBhdCBpbnB1dCAqL1xuICB0aGlzLmF2YWlsX2luID0gMDtcbiAgLyogdG90YWwgbnVtYmVyIG9mIGlucHV0IGJ5dGVzIHJlYWQgc28gZmFyICovXG4gIHRoaXMudG90YWxfaW4gPSAwO1xuICAvKiBuZXh0IG91dHB1dCBieXRlIHNob3VsZCBiZSBwdXQgdGhlcmUgKi9cbiAgdGhpcy5vdXRwdXQgPSBudWxsOyAvLyBKUyBzcGVjaWZpYywgYmVjYXVzZSB3ZSBoYXZlIG5vIHBvaW50ZXJzXG4gIHRoaXMubmV4dF9vdXQgPSAwO1xuICAvKiByZW1haW5pbmcgZnJlZSBzcGFjZSBhdCBvdXRwdXQgKi9cbiAgdGhpcy5hdmFpbF9vdXQgPSAwO1xuICAvKiB0b3RhbCBudW1iZXIgb2YgYnl0ZXMgb3V0cHV0IHNvIGZhciAqL1xuICB0aGlzLnRvdGFsX291dCA9IDA7XG4gIC8qIGxhc3QgZXJyb3IgbWVzc2FnZSwgTlVMTCBpZiBubyBlcnJvciAqL1xuICB0aGlzLm1zZyA9ICcnLypaX05VTEwqLztcbiAgLyogbm90IHZpc2libGUgYnkgYXBwbGljYXRpb25zICovXG4gIHRoaXMuc3RhdGUgPSBudWxsO1xuICAvKiBiZXN0IGd1ZXNzIGFib3V0IHRoZSBkYXRhIHR5cGU6IGJpbmFyeSBvciB0ZXh0ICovXG4gIHRoaXMuZGF0YV90eXBlID0gMi8qWl9VTktOT1dOKi87XG4gIC8qIGFkbGVyMzIgdmFsdWUgb2YgdGhlIHVuY29tcHJlc3NlZCBkYXRhICovXG4gIHRoaXMuYWRsZXIgPSAwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFpTdHJlYW07XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQG1vZHVsZSBBUElcbiAqL1xuLy8gY29weXJpZ2h0IGRlZmluZWQgaW4gZW9zanMvTElDRU5TRS50eHRcbi8qIGVzbGludC1kaXNhYmxlIG1heC1jbGFzc2VzLXBlci1maWxlICovXG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3NwcmVhZCA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWQpIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xuICAgIHJldHVybiBhcjtcbn07XG52YXIgX192YWx1ZXMgPSAodGhpcyAmJiB0aGlzLl9fdmFsdWVzKSB8fCBmdW5jdGlvbihvKSB7XG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkFwaSA9IHZvaWQgMDtcbnZhciBwYWtvXzEgPSByZXF1aXJlKFwicGFrb1wiKTtcbnZhciBzZXIgPSByZXF1aXJlKFwiLi9lb3Nqcy1zZXJpYWxpemVcIik7XG52YXIgYWJpQWJpID0gcmVxdWlyZSgnLi4vc3JjL2FiaS5hYmkuanNvbicpO1xudmFyIHRyYW5zYWN0aW9uQWJpID0gcmVxdWlyZSgnLi4vc3JjL3RyYW5zYWN0aW9uLmFiaS5qc29uJyk7XG52YXIgQXBpID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSBhcmdzXG4gICAgICogKiBgcnBjYDogSXNzdWVzIFJQQyBjYWxsc1xuICAgICAqICogYGF1dGhvcml0eVByb3ZpZGVyYDogR2V0IHB1YmxpYyBrZXlzIG5lZWRlZCB0byBtZWV0IGF1dGhvcml0aWVzIGluIGEgdHJhbnNhY3Rpb25cbiAgICAgKiAqIGBhYmlQcm92aWRlcmA6IFN1cHBsaWVzIEFCSXMgaW4gcmF3IGZvcm0gKGJpbmFyeSlcbiAgICAgKiAqIGBzaWduYXR1cmVQcm92aWRlcmA6IFNpZ25zIHRyYW5zYWN0aW9uc1xuICAgICAqICogYGNoYWluSWRgOiBJZGVudGlmaWVzIGNoYWluXG4gICAgICogKiBgdGV4dEVuY29kZXJgOiBgVGV4dEVuY29kZXJgIGluc3RhbmNlIHRvIHVzZS4gUGFzcyBpbiBgbnVsbGAgaWYgcnVubmluZyBpbiBhIGJyb3dzZXJcbiAgICAgKiAqIGB0ZXh0RGVjb2RlcmA6IGBUZXh0RGVjb2RlcmAgaW5zdGFuY2UgdG8gdXNlLiBQYXNzIGluIGBudWxsYCBpZiBydW5uaW5nIGluIGEgYnJvd3NlclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEFwaShhcmdzKSB7XG4gICAgICAgIC8qKiBIb2xkcyBpbmZvcm1hdGlvbiBuZWVkZWQgdG8gc2VyaWFsaXplIGNvbnRyYWN0IGFjdGlvbnMgKi9cbiAgICAgICAgdGhpcy5jb250cmFjdHMgPSBuZXcgTWFwKCk7XG4gICAgICAgIC8qKiBGZXRjaGVkIGFiaXMgKi9cbiAgICAgICAgdGhpcy5jYWNoZWRBYmlzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLnJwYyA9IGFyZ3MucnBjO1xuICAgICAgICB0aGlzLmF1dGhvcml0eVByb3ZpZGVyID0gYXJncy5hdXRob3JpdHlQcm92aWRlciB8fCBhcmdzLnJwYztcbiAgICAgICAgdGhpcy5hYmlQcm92aWRlciA9IGFyZ3MuYWJpUHJvdmlkZXIgfHwgYXJncy5ycGM7XG4gICAgICAgIHRoaXMuc2lnbmF0dXJlUHJvdmlkZXIgPSBhcmdzLnNpZ25hdHVyZVByb3ZpZGVyO1xuICAgICAgICB0aGlzLmNoYWluSWQgPSBhcmdzLmNoYWluSWQ7XG4gICAgICAgIHRoaXMudGV4dEVuY29kZXIgPSBhcmdzLnRleHRFbmNvZGVyO1xuICAgICAgICB0aGlzLnRleHREZWNvZGVyID0gYXJncy50ZXh0RGVjb2RlcjtcbiAgICAgICAgdGhpcy5hYmlUeXBlcyA9IHNlci5nZXRUeXBlc0Zyb21BYmkoc2VyLmNyZWF0ZUluaXRpYWxUeXBlcygpLCBhYmlBYmkpO1xuICAgICAgICB0aGlzLnRyYW5zYWN0aW9uVHlwZXMgPSBzZXIuZ2V0VHlwZXNGcm9tQWJpKHNlci5jcmVhdGVJbml0aWFsVHlwZXMoKSwgdHJhbnNhY3Rpb25BYmkpO1xuICAgIH1cbiAgICAvKiogRGVjb2RlcyBhbiBhYmkgYXMgVWludDhBcnJheSBpbnRvIGpzb24uICovXG4gICAgQXBpLnByb3RvdHlwZS5yYXdBYmlUb0pzb24gPSBmdW5jdGlvbiAocmF3QWJpKSB7XG4gICAgICAgIHZhciBidWZmZXIgPSBuZXcgc2VyLlNlcmlhbEJ1ZmZlcih7XG4gICAgICAgICAgICB0ZXh0RW5jb2RlcjogdGhpcy50ZXh0RW5jb2RlcixcbiAgICAgICAgICAgIHRleHREZWNvZGVyOiB0aGlzLnRleHREZWNvZGVyLFxuICAgICAgICAgICAgYXJyYXk6IHJhd0FiaSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghc2VyLnN1cHBvcnRlZEFiaVZlcnNpb24oYnVmZmVyLmdldFN0cmluZygpKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBhYmkgdmVyc2lvbicpO1xuICAgICAgICB9XG4gICAgICAgIGJ1ZmZlci5yZXN0YXJ0UmVhZCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5hYmlUeXBlcy5nZXQoJ2FiaV9kZWYnKS5kZXNlcmlhbGl6ZShidWZmZXIpO1xuICAgIH07XG4gICAgLyoqIEVuY29kZXMgYSBqc29uIGFiaSBhcyBVaW50OEFycmF5LiAqL1xuICAgIEFwaS5wcm90b3R5cGUuanNvblRvUmF3QWJpID0gZnVuY3Rpb24gKGpzb25BYmkpIHtcbiAgICAgICAgdmFyIGJ1ZmZlciA9IG5ldyBzZXIuU2VyaWFsQnVmZmVyKHtcbiAgICAgICAgICAgIHRleHRFbmNvZGVyOiB0aGlzLnRleHRFbmNvZGVyLFxuICAgICAgICAgICAgdGV4dERlY29kZXI6IHRoaXMudGV4dERlY29kZXIsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmFiaVR5cGVzLmdldCgnYWJpX2RlZicpLnNlcmlhbGl6ZShidWZmZXIsIGpzb25BYmkpO1xuICAgICAgICBpZiAoIXNlci5zdXBwb3J0ZWRBYmlWZXJzaW9uKGJ1ZmZlci5nZXRTdHJpbmcoKSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgYWJpIHZlcnNpb24nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmZmVyLmFzVWludDhBcnJheSgpO1xuICAgIH07XG4gICAgLyoqIEdldCBhYmkgaW4gYm90aCBiaW5hcnkgYW5kIHN0cnVjdHVyZWQgZm9ybXMuIEZldGNoIHdoZW4gbmVlZGVkLiAqL1xuICAgIEFwaS5wcm90b3R5cGUuZ2V0Q2FjaGVkQWJpID0gZnVuY3Rpb24gKGFjY291bnROYW1lLCByZWxvYWQpIHtcbiAgICAgICAgaWYgKHJlbG9hZCA9PT0gdm9pZCAwKSB7IHJlbG9hZCA9IGZhbHNlOyB9XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjYWNoZWRBYmksIHJhd0FiaSwgYWJpLCBlXzE7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlbG9hZCAmJiB0aGlzLmNhY2hlZEFiaXMuZ2V0KGFjY291bnROYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLmNhY2hlZEFiaXMuZ2V0KGFjY291bnROYW1lKV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMSwgMywgLCA0XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmFiaVByb3ZpZGVyLmdldFJhd0FiaShhY2NvdW50TmFtZSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICByYXdBYmkgPSAoX2Euc2VudCgpKS5hYmk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhYmkgPSB0aGlzLnJhd0FiaVRvSnNvbihyYXdBYmkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGVkQWJpID0geyByYXdBYmk6IHJhd0FiaSwgYWJpOiBhYmkgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBlXzEgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlXzEubWVzc2FnZSA9IFwiZmV0Y2hpbmcgYWJpIGZvciBcIiArIGFjY291bnROYW1lICsgXCI6IFwiICsgZV8xLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlXzE7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY2FjaGVkQWJpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBhYmkgZm9yIFwiICsgYWNjb3VudE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZWRBYmlzLnNldChhY2NvdW50TmFtZSwgY2FjaGVkQWJpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBjYWNoZWRBYmldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEFwaS5wcm90b3R5cGUuc2V0Q2FjaGVkQWJpID0gZnVuY3Rpb24gKGFjY291bnROYW1lLCBfYWJpKSB7XG4gICAgICAgIHZhciBjYWNoZWRBYmk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgcmF3QWJpID0gdGhpcy5qc29uVG9SYXdBYmkoX2FiaSk7XG4gICAgICAgICAgICB2YXIgYWJpID0gdGhpcy5yYXdBYmlUb0pzb24ocmF3QWJpKTtcbiAgICAgICAgICAgIGNhY2hlZEFiaSA9IHsgcmF3QWJpOiByYXdBYmksIGFiaTogYWJpIH07XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGUubWVzc2FnZSA9IFwiZmV0Y2hpbmcgYWJpIGZvciBcIiArIGFjY291bnROYW1lICsgXCI6IFwiICsgZS5tZXNzYWdlO1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNhY2hlZEFiaSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBhYmkgZm9yIFwiICsgYWNjb3VudE5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2FjaGVkQWJpcy5zZXQoYWNjb3VudE5hbWUsIGNhY2hlZEFiaSk7XG4gICAgfTtcbiAgICAvKiogR2V0IGFiaSBpbiBzdHJ1Y3R1cmVkIGZvcm0uIEZldGNoIHdoZW4gbmVlZGVkLiAqL1xuICAgIEFwaS5wcm90b3R5cGUuZ2V0QWJpID0gZnVuY3Rpb24gKGFjY291bnROYW1lLCByZWxvYWQpIHtcbiAgICAgICAgaWYgKHJlbG9hZCA9PT0gdm9pZCAwKSB7IHJlbG9hZCA9IGZhbHNlOyB9XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5nZXRDYWNoZWRBYmkoYWNjb3VudE5hbWUsIHJlbG9hZCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCAoX2Euc2VudCgpKS5hYmldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKiBHZXQgYWJpcyBuZWVkZWQgYnkgYSB0cmFuc2FjdGlvbiAqL1xuICAgIEFwaS5wcm90b3R5cGUuZ2V0VHJhbnNhY3Rpb25BYmlzID0gZnVuY3Rpb24gKHRyYW5zYWN0aW9uLCByZWxvYWQpIHtcbiAgICAgICAgaWYgKHJlbG9hZCA9PT0gdm9pZCAwKSB7IHJlbG9hZCA9IGZhbHNlOyB9XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhY3Rpb25zLCBhY2NvdW50cywgdW5pcXVlQWNjb3VudHMsIGFjdGlvblByb21pc2VzO1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb25zID0gKHRyYW5zYWN0aW9uLmNvbnRleHRfZnJlZV9hY3Rpb25zIHx8IFtdKS5jb25jYXQodHJhbnNhY3Rpb24uYWN0aW9ucyk7XG4gICAgICAgICAgICAgICAgYWNjb3VudHMgPSBhY3Rpb25zLm1hcChmdW5jdGlvbiAoYWN0aW9uKSB7IHJldHVybiBhY3Rpb24uYWNjb3VudDsgfSk7XG4gICAgICAgICAgICAgICAgdW5pcXVlQWNjb3VudHMgPSBuZXcgU2V0KGFjY291bnRzKTtcbiAgICAgICAgICAgICAgICBhY3Rpb25Qcm9taXNlcyA9IF9fc3ByZWFkKHVuaXF1ZUFjY291bnRzKS5tYXAoZnVuY3Rpb24gKGFjY291bnQpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY291bnROYW1lOiBhY2NvdW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZ2V0Q2FjaGVkQWJpKGFjY291bnQsIHJlbG9hZCldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIChfYS5hYmkgPSAoX2Iuc2VudCgpKS5yYXdBYmksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTsgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIFByb21pc2UuYWxsKGFjdGlvblByb21pc2VzKV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKiogR2V0IGRhdGEgbmVlZGVkIHRvIHNlcmlhbGl6ZSBhY3Rpb25zIGluIGEgY29udHJhY3QgKi9cbiAgICBBcGkucHJvdG90eXBlLmdldENvbnRyYWN0ID0gZnVuY3Rpb24gKGFjY291bnROYW1lLCByZWxvYWQpIHtcbiAgICAgICAgaWYgKHJlbG9hZCA9PT0gdm9pZCAwKSB7IHJlbG9hZCA9IGZhbHNlOyB9XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhYmksIHR5cGVzLCBhY3Rpb25zLCBfYSwgX2IsIF9jLCBuYW1lXzEsIHR5cGUsIHJlc3VsdDtcbiAgICAgICAgICAgIHZhciBlXzIsIF9kO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfZSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2UubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZWxvYWQgJiYgdGhpcy5jb250cmFjdHMuZ2V0KGFjY291bnROYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLmNvbnRyYWN0cy5nZXQoYWNjb3VudE5hbWUpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZ2V0QWJpKGFjY291bnROYW1lLCByZWxvYWQpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgYWJpID0gX2Uuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZXMgPSBzZXIuZ2V0VHlwZXNGcm9tQWJpKHNlci5jcmVhdGVJbml0aWFsVHlwZXMoKSwgYWJpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnMgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoX2EgPSBfX3ZhbHVlcyhhYmkuYWN0aW9ucyksIF9iID0gX2EubmV4dCgpOyAhX2IuZG9uZTsgX2IgPSBfYS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MgPSBfYi52YWx1ZSwgbmFtZV8xID0gX2MubmFtZSwgdHlwZSA9IF9jLnR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnMuc2V0KG5hbWVfMSwgc2VyLmdldFR5cGUodHlwZXMsIHR5cGUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZV8yXzEpIHsgZV8yID0geyBlcnJvcjogZV8yXzEgfTsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9iICYmICFfYi5kb25lICYmIChfZCA9IF9hLnJldHVybikpIF9kLmNhbGwoX2EpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMikgdGhyb3cgZV8yLmVycm9yOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB7IHR5cGVzOiB0eXBlcywgYWN0aW9uczogYWN0aW9ucyB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250cmFjdHMuc2V0KGFjY291bnROYW1lLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHJlc3VsdF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqIENvbnZlcnQgYHZhbHVlYCB0byBiaW5hcnkgZm9ybS4gYHR5cGVgIG11c3QgYmUgYSBidWlsdC1pbiBhYmkgdHlwZSBvciBpbiBgdHJhbnNhY3Rpb24uYWJpLmpzb25gLiAqL1xuICAgIEFwaS5wcm90b3R5cGUuc2VyaWFsaXplID0gZnVuY3Rpb24gKGJ1ZmZlciwgdHlwZSwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy50cmFuc2FjdGlvblR5cGVzLmdldCh0eXBlKS5zZXJpYWxpemUoYnVmZmVyLCB2YWx1ZSk7XG4gICAgfTtcbiAgICAvKiogQ29udmVydCBkYXRhIGluIGBidWZmZXJgIHRvIHN0cnVjdHVyZWQgZm9ybS4gYHR5cGVgIG11c3QgYmUgYSBidWlsdC1pbiBhYmkgdHlwZSBvciBpbiBgdHJhbnNhY3Rpb24uYWJpLmpzb25gLiAqL1xuICAgIEFwaS5wcm90b3R5cGUuZGVzZXJpYWxpemUgPSBmdW5jdGlvbiAoYnVmZmVyLCB0eXBlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zYWN0aW9uVHlwZXMuZ2V0KHR5cGUpLmRlc2VyaWFsaXplKGJ1ZmZlcik7XG4gICAgfTtcbiAgICAvKiogQ29udmVydCBhIHRyYW5zYWN0aW9uIHRvIGJpbmFyeSAqL1xuICAgIEFwaS5wcm90b3R5cGUuc2VyaWFsaXplVHJhbnNhY3Rpb24gPSBmdW5jdGlvbiAodHJhbnNhY3Rpb24pIHtcbiAgICAgICAgdmFyIGJ1ZmZlciA9IG5ldyBzZXIuU2VyaWFsQnVmZmVyKHsgdGV4dEVuY29kZXI6IHRoaXMudGV4dEVuY29kZXIsIHRleHREZWNvZGVyOiB0aGlzLnRleHREZWNvZGVyIH0pO1xuICAgICAgICB0aGlzLnNlcmlhbGl6ZShidWZmZXIsICd0cmFuc2FjdGlvbicsIF9fYXNzaWduKHsgbWF4X25ldF91c2FnZV93b3JkczogMCwgbWF4X2NwdV91c2FnZV9tczogMCwgZGVsYXlfc2VjOiAwLCBjb250ZXh0X2ZyZWVfYWN0aW9uczogW10sIGFjdGlvbnM6IFtdLCB0cmFuc2FjdGlvbl9leHRlbnNpb25zOiBbXSB9LCB0cmFuc2FjdGlvbikpO1xuICAgICAgICByZXR1cm4gYnVmZmVyLmFzVWludDhBcnJheSgpO1xuICAgIH07XG4gICAgLyoqIFNlcmlhbGl6ZSBjb250ZXh0LWZyZWUgZGF0YSAqL1xuICAgIEFwaS5wcm90b3R5cGUuc2VyaWFsaXplQ29udGV4dEZyZWVEYXRhID0gZnVuY3Rpb24gKGNvbnRleHRGcmVlRGF0YSkge1xuICAgICAgICB2YXIgZV8zLCBfYTtcbiAgICAgICAgaWYgKCFjb250ZXh0RnJlZURhdGEgfHwgIWNvbnRleHRGcmVlRGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBidWZmZXIgPSBuZXcgc2VyLlNlcmlhbEJ1ZmZlcih7IHRleHRFbmNvZGVyOiB0aGlzLnRleHRFbmNvZGVyLCB0ZXh0RGVjb2RlcjogdGhpcy50ZXh0RGVjb2RlciB9KTtcbiAgICAgICAgYnVmZmVyLnB1c2hWYXJ1aW50MzIoY29udGV4dEZyZWVEYXRhLmxlbmd0aCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBjb250ZXh0RnJlZURhdGFfMSA9IF9fdmFsdWVzKGNvbnRleHRGcmVlRGF0YSksIGNvbnRleHRGcmVlRGF0YV8xXzEgPSBjb250ZXh0RnJlZURhdGFfMS5uZXh0KCk7ICFjb250ZXh0RnJlZURhdGFfMV8xLmRvbmU7IGNvbnRleHRGcmVlRGF0YV8xXzEgPSBjb250ZXh0RnJlZURhdGFfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IGNvbnRleHRGcmVlRGF0YV8xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgYnVmZmVyLnB1c2hCeXRlcyhkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV8zXzEpIHsgZV8zID0geyBlcnJvcjogZV8zXzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHRGcmVlRGF0YV8xXzEgJiYgIWNvbnRleHRGcmVlRGF0YV8xXzEuZG9uZSAmJiAoX2EgPSBjb250ZXh0RnJlZURhdGFfMS5yZXR1cm4pKSBfYS5jYWxsKGNvbnRleHRGcmVlRGF0YV8xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8zKSB0aHJvdyBlXzMuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmZmVyLmFzVWludDhBcnJheSgpO1xuICAgIH07XG4gICAgLyoqIENvbnZlcnQgYSB0cmFuc2FjdGlvbiBmcm9tIGJpbmFyeS4gTGVhdmVzIGFjdGlvbnMgaW4gaGV4LiAqL1xuICAgIEFwaS5wcm90b3R5cGUuZGVzZXJpYWxpemVUcmFuc2FjdGlvbiA9IGZ1bmN0aW9uICh0cmFuc2FjdGlvbikge1xuICAgICAgICB2YXIgYnVmZmVyID0gbmV3IHNlci5TZXJpYWxCdWZmZXIoeyB0ZXh0RW5jb2RlcjogdGhpcy50ZXh0RW5jb2RlciwgdGV4dERlY29kZXI6IHRoaXMudGV4dERlY29kZXIgfSk7XG4gICAgICAgIGJ1ZmZlci5wdXNoQXJyYXkodHJhbnNhY3Rpb24pO1xuICAgICAgICByZXR1cm4gdGhpcy5kZXNlcmlhbGl6ZShidWZmZXIsICd0cmFuc2FjdGlvbicpO1xuICAgIH07XG4gICAgLyoqIENvbnZlcnQgYWN0aW9ucyB0byBoZXggKi9cbiAgICBBcGkucHJvdG90eXBlLnNlcmlhbGl6ZUFjdGlvbnMgPSBmdW5jdGlvbiAoYWN0aW9ucykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCBQcm9taXNlLmFsbChhY3Rpb25zLm1hcChmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWNjb3VudCA9IF9hLmFjY291bnQsIG5hbWUgPSBfYS5uYW1lLCBhdXRob3JpemF0aW9uID0gX2EuYXV0aG9yaXphdGlvbiwgZGF0YSA9IF9hLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRyYWN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmdldENvbnRyYWN0KGFjY291bnQpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyYWN0ID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgc2VyLnNlcmlhbGl6ZUFjdGlvbihjb250cmFjdCwgYWNjb3VudCwgbmFtZSwgYXV0aG9yaXphdGlvbiwgZGF0YSwgdGhpcy50ZXh0RW5jb2RlciwgdGhpcy50ZXh0RGVjb2RlcildO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9hLnNlbnQoKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqIENvbnZlcnQgYWN0aW9ucyBmcm9tIGhleCAqL1xuICAgIEFwaS5wcm90b3R5cGUuZGVzZXJpYWxpemVBY3Rpb25zID0gZnVuY3Rpb24gKGFjdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgUHJvbWlzZS5hbGwoYWN0aW9ucy5tYXAoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjY291bnQgPSBfYS5hY2NvdW50LCBuYW1lID0gX2EubmFtZSwgYXV0aG9yaXphdGlvbiA9IF9hLmF1dGhvcml6YXRpb24sIGRhdGEgPSBfYS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb250cmFjdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5nZXRDb250cmFjdChhY2NvdW50KV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cmFjdCA9IF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHNlci5kZXNlcmlhbGl6ZUFjdGlvbihjb250cmFjdCwgYWNjb3VudCwgbmFtZSwgYXV0aG9yaXphdGlvbiwgZGF0YSwgdGhpcy50ZXh0RW5jb2RlciwgdGhpcy50ZXh0RGVjb2RlcildO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9hLnNlbnQoKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQXBpLnByb3RvdHlwZS5zZXJpYWxpemVBYmlUeXBlID0gZnVuY3Rpb24gKGFjY291bnQsIHR5cGVOYW1lLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjb250cmFjdDtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5nZXRDb250cmFjdChhY2NvdW50KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyYWN0ID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHNlci5zZXJpYWxpemVBYmlUeXBlKGNvbnRyYWN0LCBhY2NvdW50LCB0eXBlTmFtZSwgZGF0YSwgdGhpcy50ZXh0RW5jb2RlciwgdGhpcy50ZXh0RGVjb2RlcildO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEFwaS5wcm90b3R5cGUuZGVzZXJpYWxpemVBYmlUeXBlID0gZnVuY3Rpb24gKGFjY291bnQsIHR5cGVOYW1lLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjb250cmFjdDtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5nZXRDb250cmFjdChhY2NvdW50KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyYWN0ID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHNlci5kZXNlcmlhbGl6ZUFiaVR5cGUoY29udHJhY3QsIGFjY291bnQsIHR5cGVOYW1lLCBkYXRhLCB0aGlzLnRleHRFbmNvZGVyLCB0aGlzLnRleHREZWNvZGVyKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqIENvbnZlcnQgYSB0cmFuc2FjdGlvbiBmcm9tIGJpbmFyeS4gQWxzbyBkZXNlcmlhbGl6ZXMgYWN0aW9ucy4gKi9cbiAgICBBcGkucHJvdG90eXBlLmRlc2VyaWFsaXplVHJhbnNhY3Rpb25XaXRoQWN0aW9ucyA9IGZ1bmN0aW9uICh0cmFuc2FjdGlvbikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZGVzZXJpYWxpemVkVHJhbnNhY3Rpb24sIGRlc2VyaWFsaXplZENGQWN0aW9ucywgZGVzZXJpYWxpemVkQWN0aW9ucztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdHJhbnNhY3Rpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb24gPSBzZXIuaGV4VG9VaW50OEFycmF5KHRyYW5zYWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2VyaWFsaXplZFRyYW5zYWN0aW9uID0gdGhpcy5kZXNlcmlhbGl6ZVRyYW5zYWN0aW9uKHRyYW5zYWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZGVzZXJpYWxpemVBY3Rpb25zKGRlc2VyaWFsaXplZFRyYW5zYWN0aW9uLmNvbnRleHRfZnJlZV9hY3Rpb25zKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2VyaWFsaXplZENGQWN0aW9ucyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZGVzZXJpYWxpemVBY3Rpb25zKGRlc2VyaWFsaXplZFRyYW5zYWN0aW9uLmFjdGlvbnMpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzZXJpYWxpemVkQWN0aW9ucyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZGVzZXJpYWxpemVkVHJhbnNhY3Rpb24pLCB7IGNvbnRleHRfZnJlZV9hY3Rpb25zOiBkZXNlcmlhbGl6ZWRDRkFjdGlvbnMsIGFjdGlvbnM6IGRlc2VyaWFsaXplZEFjdGlvbnMgfSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKiBEZWZsYXRlIGEgc2VyaWFsaXplZCBvYmplY3QgKi9cbiAgICBBcGkucHJvdG90eXBlLmRlZmxhdGVTZXJpYWxpemVkQXJyYXkgPSBmdW5jdGlvbiAoc2VyaWFsaXplZEFycmF5KSB7XG4gICAgICAgIHJldHVybiBwYWtvXzEuZGVmbGF0ZShzZXJpYWxpemVkQXJyYXksIHsgbGV2ZWw6IDkgfSk7XG4gICAgfTtcbiAgICAvKiogSW5mbGF0ZSBhIGNvbXByZXNzZWQgc2VyaWFsaXplZCBvYmplY3QgKi9cbiAgICBBcGkucHJvdG90eXBlLmluZmxhdGVTZXJpYWxpemVkQXJyYXkgPSBmdW5jdGlvbiAoY29tcHJlc3NlZFNlcmlhbGl6ZWRBcnJheSkge1xuICAgICAgICByZXR1cm4gcGFrb18xLmluZmxhdGUoY29tcHJlc3NlZFNlcmlhbGl6ZWRBcnJheSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW5kIG9wdGlvbmFsbHkgYnJvYWRjYXN0IGEgdHJhbnNhY3Rpb24uXG4gICAgICpcbiAgICAgKiBOYW1lZCBQYXJhbWV0ZXJzOlxuICAgICAqIGBicm9hZGNhc3RgOiBicm9hZGNhc3QgdGhpcyB0cmFuc2FjdGlvbj9cbiAgICAgKiBgc2lnbmA6IHNpZ24gdGhpcyB0cmFuc2FjdGlvbj9cbiAgICAgKiBgY29tcHJlc3Npb25gOiBjb21wcmVzcyB0aGlzIHRyYW5zYWN0aW9uP1xuICAgICAqXG4gICAgICogSWYgYm90aCBgYmxvY2tzQmVoaW5kYCBhbmQgYGV4cGlyZVNlY29uZHNgIGFyZSBwcmVzZW50LFxuICAgICAqIHRoZW4gZmV0Y2ggdGhlIGJsb2NrIHdoaWNoIGlzIGBibG9ja3NCZWhpbmRgIGJlaGluZCBoZWFkIGJsb2NrLFxuICAgICAqIHVzZSBpdCBhcyBhIHJlZmVyZW5jZSBmb3IgVEFQb1MsIGFuZCBleHBpcmUgdGhlIHRyYW5zYWN0aW9uIGBleHBpcmVTZWNvbmRzYCBhZnRlciB0aGF0IGJsb2NrJ3MgdGltZS5cbiAgICAgKlxuICAgICAqIElmIGJvdGggYHVzZUxhc3RJcnJldmVyc2libGVgIGFuZCBgZXhwaXJlU2Vjb25kc2AgYXJlIHByZXNlbnQsXG4gICAgICogdGhlbiBmZXRjaCB0aGUgbGFzdCBpcnJldmVyc2libGUgYmxvY2ssIHVzZSBpdCBhcyBhIHJlZmVyZW5jZSBmb3IgVEFQb1MsXG4gICAgICogYW5kIGV4cGlyZSB0aGUgdHJhbnNhY3Rpb24gYGV4cGlyZVNlY29uZHNgIGFmdGVyIHRoYXQgYmxvY2sncyB0aW1lLlxuICAgICAqXG4gICAgICogQHJldHVybnMgbm9kZSByZXNwb25zZSBpZiBgYnJvYWRjYXN0YCwgYHtzaWduYXR1cmVzLCBzZXJpYWxpemVkVHJhbnNhY3Rpb259YCBpZiBgIWJyb2FkY2FzdGBcbiAgICAgKi9cbiAgICBBcGkucHJvdG90eXBlLnRyYW5zYWN0ID0gZnVuY3Rpb24gKHRyYW5zYWN0aW9uLCBfYSkge1xuICAgICAgICB2YXIgX2IgPSBfYSA9PT0gdm9pZCAwID8ge30gOiBfYSwgX2MgPSBfYi5icm9hZGNhc3QsIGJyb2FkY2FzdCA9IF9jID09PSB2b2lkIDAgPyB0cnVlIDogX2MsIF9kID0gX2Iuc2lnbiwgc2lnbiA9IF9kID09PSB2b2lkIDAgPyB0cnVlIDogX2QsIGNvbXByZXNzaW9uID0gX2IuY29tcHJlc3Npb24sIGJsb2Nrc0JlaGluZCA9IF9iLmJsb2Nrc0JlaGluZCwgdXNlTGFzdElycmV2ZXJzaWJsZSA9IF9iLnVzZUxhc3RJcnJldmVyc2libGUsIGV4cGlyZVNlY29uZHMgPSBfYi5leHBpcmVTZWNvbmRzO1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaW5mbywgYWJpcywgX2UsIF9mLCBzZXJpYWxpemVkVHJhbnNhY3Rpb24sIHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGEsIHB1c2hUcmFuc2FjdGlvbkFyZ3MsIGF2YWlsYWJsZUtleXMsIHJlcXVpcmVkS2V5cztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2cpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9nLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYmxvY2tzQmVoaW5kID09PSAnbnVtYmVyJyAmJiB1c2VMYXN0SXJyZXZlcnNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVc2UgZWl0aGVyIGJsb2Nrc0JlaGluZCBvciB1c2VMYXN0SXJyZXZlcnNpYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISF0aGlzLmNoYWluSWQpIHJldHVybiBbMyAvKmJyZWFrKi8sIDJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5ycGMuZ2V0X2luZm8oKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm8gPSBfZy5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYWluSWQgPSBpbmZvLmNoYWluX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2cubGFiZWwgPSAyO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISgodHlwZW9mIGJsb2Nrc0JlaGluZCA9PT0gJ251bWJlcicgfHwgdXNlTGFzdElycmV2ZXJzaWJsZSkgJiYgZXhwaXJlU2Vjb25kcykpIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5nZW5lcmF0ZVRhcG9zKGluZm8sIHRyYW5zYWN0aW9uLCBibG9ja3NCZWhpbmQsIHVzZUxhc3RJcnJldmVyc2libGUsIGV4cGlyZVNlY29uZHMpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb24gPSBfZy5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfZy5sYWJlbCA9IDQ7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5oYXNSZXF1aXJlZFRhcG9zRmllbGRzKHRyYW5zYWN0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUmVxdWlyZWQgY29uZmlndXJhdGlvbiBvciBUQVBPUyBmaWVsZHMgYXJlIG5vdCBwcmVzZW50Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmdldFRyYW5zYWN0aW9uQWJpcyh0cmFuc2FjdGlvbildO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICBhYmlzID0gX2cuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2UgPSBbX19hc3NpZ24oe30sIHRyYW5zYWN0aW9uKV07XG4gICAgICAgICAgICAgICAgICAgICAgICBfZiA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zZXJpYWxpemVBY3Rpb25zKHRyYW5zYWN0aW9uLmNvbnRleHRfZnJlZV9hY3Rpb25zIHx8IFtdKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9mLmNvbnRleHRfZnJlZV9hY3Rpb25zID0gX2cuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zZXJpYWxpemVBY3Rpb25zKHRyYW5zYWN0aW9uLmFjdGlvbnMpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb24gPSBfX2Fzc2lnbi5hcHBseSh2b2lkIDAsIF9lLmNvbmNhdChbKF9mLmFjdGlvbnMgPSBfZy5zZW50KCksIF9mKV0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcmlhbGl6ZWRUcmFuc2FjdGlvbiA9IHRoaXMuc2VyaWFsaXplVHJhbnNhY3Rpb24odHJhbnNhY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWFsaXplZENvbnRleHRGcmVlRGF0YSA9IHRoaXMuc2VyaWFsaXplQ29udGV4dEZyZWVEYXRhKHRyYW5zYWN0aW9uLmNvbnRleHRfZnJlZV9kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hUcmFuc2FjdGlvbkFyZ3MgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWFsaXplZFRyYW5zYWN0aW9uOiBzZXJpYWxpemVkVHJhbnNhY3Rpb24sIHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGE6IHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmF0dXJlczogW11cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNpZ24pIHJldHVybiBbMyAvKmJyZWFrKi8sIDExXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuc2lnbmF0dXJlUHJvdmlkZXIuZ2V0QXZhaWxhYmxlS2V5cygpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgICAgICAgICAgYXZhaWxhYmxlS2V5cyA9IF9nLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuYXV0aG9yaXR5UHJvdmlkZXIuZ2V0UmVxdWlyZWRLZXlzKHsgdHJhbnNhY3Rpb246IHRyYW5zYWN0aW9uLCBhdmFpbGFibGVLZXlzOiBhdmFpbGFibGVLZXlzIH0pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRLZXlzID0gX2cuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zaWduYXR1cmVQcm92aWRlci5zaWduKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhaW5JZDogdGhpcy5jaGFpbklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZEtleXM6IHJlcXVpcmVkS2V5cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWFsaXplZFRyYW5zYWN0aW9uOiBzZXJpYWxpemVkVHJhbnNhY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGE6IHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFiaXM6IGFiaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFRyYW5zYWN0aW9uQXJncyA9IF9nLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9nLmxhYmVsID0gMTE7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTE6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnJvYWRjYXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXByZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLnB1c2hDb21wcmVzc2VkU2lnbmVkVHJhbnNhY3Rpb24ocHVzaFRyYW5zYWN0aW9uQXJncyldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5wdXNoU2lnbmVkVHJhbnNhY3Rpb24ocHVzaFRyYW5zYWN0aW9uQXJncyldO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHB1c2hUcmFuc2FjdGlvbkFyZ3NdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKiBCcm9hZGNhc3QgYSBzaWduZWQgdHJhbnNhY3Rpb24gKi9cbiAgICBBcGkucHJvdG90eXBlLnB1c2hTaWduZWRUcmFuc2FjdGlvbiA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgc2lnbmF0dXJlcyA9IF9hLnNpZ25hdHVyZXMsIHNlcmlhbGl6ZWRUcmFuc2FjdGlvbiA9IF9hLnNlcmlhbGl6ZWRUcmFuc2FjdGlvbiwgc2VyaWFsaXplZENvbnRleHRGcmVlRGF0YSA9IF9hLnNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGE7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5ycGMucHVzaF90cmFuc2FjdGlvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduYXR1cmVzOiBzaWduYXR1cmVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWFsaXplZFRyYW5zYWN0aW9uOiBzZXJpYWxpemVkVHJhbnNhY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJpYWxpemVkQ29udGV4dEZyZWVEYXRhOiBzZXJpYWxpemVkQ29udGV4dEZyZWVEYXRhXG4gICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEFwaS5wcm90b3R5cGUucHVzaENvbXByZXNzZWRTaWduZWRUcmFuc2FjdGlvbiA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgc2lnbmF0dXJlcyA9IF9hLnNpZ25hdHVyZXMsIHNlcmlhbGl6ZWRUcmFuc2FjdGlvbiA9IF9hLnNlcmlhbGl6ZWRUcmFuc2FjdGlvbiwgc2VyaWFsaXplZENvbnRleHRGcmVlRGF0YSA9IF9hLnNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGE7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjb21wcmVzc2VkU2VyaWFsaXplZFRyYW5zYWN0aW9uLCBjb21wcmVzc2VkU2VyaWFsaXplZENvbnRleHRGcmVlRGF0YTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICBjb21wcmVzc2VkU2VyaWFsaXplZFRyYW5zYWN0aW9uID0gdGhpcy5kZWZsYXRlU2VyaWFsaXplZEFycmF5KHNlcmlhbGl6ZWRUcmFuc2FjdGlvbik7XG4gICAgICAgICAgICAgICAgY29tcHJlc3NlZFNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGEgPSB0aGlzLmRlZmxhdGVTZXJpYWxpemVkQXJyYXkoc2VyaWFsaXplZENvbnRleHRGcmVlRGF0YSB8fCBuZXcgVWludDhBcnJheSgwKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMucnBjLnB1c2hfdHJhbnNhY3Rpb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmF0dXJlczogc2lnbmF0dXJlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXByZXNzaW9uOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWFsaXplZFRyYW5zYWN0aW9uOiBjb21wcmVzc2VkU2VyaWFsaXplZFRyYW5zYWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWFsaXplZENvbnRleHRGcmVlRGF0YTogY29tcHJlc3NlZFNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGFcbiAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQXBpLnByb3RvdHlwZS5nZW5lcmF0ZVRhcG9zID0gZnVuY3Rpb24gKGluZm8sIHRyYW5zYWN0aW9uLCBibG9ja3NCZWhpbmQsIHVzZUxhc3RJcnJldmVyc2libGUsIGV4cGlyZVNlY29uZHMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHRhcG9zQmxvY2tOdW1iZXIsIHJlZkJsb2NrLCBfYTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIWluZm8pIHJldHVybiBbMyAvKmJyZWFrKi8sIDJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5ycGMuZ2V0X2luZm8oKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm8gPSBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDI7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcG9zQmxvY2tOdW1iZXIgPSB1c2VMYXN0SXJyZXZlcnNpYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBpbmZvLmxhc3RfaXJyZXZlcnNpYmxlX2Jsb2NrX251bSA6IGluZm8uaGVhZF9ibG9ja19udW0gLSBibG9ja3NCZWhpbmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISh0YXBvc0Jsb2NrTnVtYmVyIDw9IGluZm8ubGFzdF9pcnJldmVyc2libGVfYmxvY2tfbnVtKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJwYy5nZXRfYmxvY2sodGFwb3NCbG9ja051bWJlcildO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYSA9IF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDZdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMudHJ5R2V0QmxvY2tIZWFkZXJTdGF0ZSh0YXBvc0Jsb2NrTnVtYmVyKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSA2O1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgICAgICByZWZCbG9jayA9IF9hO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9fYXNzaWduKF9fYXNzaWduKHt9LCBzZXIudHJhbnNhY3Rpb25IZWFkZXIocmVmQmxvY2ssIGV4cGlyZVNlY29uZHMpKSwgdHJhbnNhY3Rpb24pXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvLyBldmVudHVhbGx5IGJyZWFrIG91dCBpbnRvIFRyYW5zYWN0aW9uVmFsaWRhdG9yIGNsYXNzXG4gICAgQXBpLnByb3RvdHlwZS5oYXNSZXF1aXJlZFRhcG9zRmllbGRzID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBleHBpcmF0aW9uID0gX2EuZXhwaXJhdGlvbiwgcmVmX2Jsb2NrX251bSA9IF9hLnJlZl9ibG9ja19udW0sIHJlZl9ibG9ja19wcmVmaXggPSBfYS5yZWZfYmxvY2tfcHJlZml4O1xuICAgICAgICByZXR1cm4gISEoZXhwaXJhdGlvbiAmJiB0eXBlb2YgKHJlZl9ibG9ja19udW0pID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgKHJlZl9ibG9ja19wcmVmaXgpID09PSAnbnVtYmVyJyk7XG4gICAgfTtcbiAgICBBcGkucHJvdG90eXBlLnRyeUdldEJsb2NrSGVhZGVyU3RhdGUgPSBmdW5jdGlvbiAodGFwb3NCbG9ja051bWJlcikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZXJyb3JfMTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMCwgMiwgLCA0XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJwYy5nZXRfYmxvY2tfaGVhZGVyX3N0YXRlKHRhcG9zQmxvY2tOdW1iZXIpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Euc2VudCgpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JfMSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucnBjLmdldF9ibG9jayh0YXBvc0Jsb2NrTnVtYmVyKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9hLnNlbnQoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBBcGk7XG59KCkpOyAvLyBBcGlcbmV4cG9ydHMuQXBpID0gQXBpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICAgIGlmICghbSkgcmV0dXJuIG87XG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gICAgdHJ5IHtcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiBhcjtcbn07XG52YXIgX19zcHJlYWQgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fdmFsdWVzID0gKHRoaXMgJiYgdGhpcy5fX3ZhbHVlcykgfHwgZnVuY3Rpb24obykge1xuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zaWduYXR1cmVUb1N0cmluZyA9IGV4cG9ydHMuc3RyaW5nVG9TaWduYXR1cmUgPSBleHBvcnRzLnByaXZhdGVLZXlUb1N0cmluZyA9IGV4cG9ydHMucHJpdmF0ZUtleVRvTGVnYWN5U3RyaW5nID0gZXhwb3J0cy5zdHJpbmdUb1ByaXZhdGVLZXkgPSBleHBvcnRzLmNvbnZlcnRMZWdhY3lQdWJsaWNLZXlzID0gZXhwb3J0cy5jb252ZXJ0TGVnYWN5UHVibGljS2V5ID0gZXhwb3J0cy5wdWJsaWNLZXlUb1N0cmluZyA9IGV4cG9ydHMucHVibGljS2V5VG9MZWdhY3lTdHJpbmcgPSBleHBvcnRzLnN0cmluZ1RvUHVibGljS2V5ID0gZXhwb3J0cy5zaWduYXR1cmVEYXRhU2l6ZSA9IGV4cG9ydHMucHJpdmF0ZUtleURhdGFTaXplID0gZXhwb3J0cy5wdWJsaWNLZXlEYXRhU2l6ZSA9IGV4cG9ydHMuS2V5VHlwZSA9IGV4cG9ydHMuYmFzZTY0VG9CaW5hcnkgPSBleHBvcnRzLmJpbmFyeVRvQmFzZTU4ID0gZXhwb3J0cy5iYXNlNThUb0JpbmFyeSA9IGV4cG9ydHMuc2lnbmVkQmluYXJ5VG9EZWNpbWFsID0gZXhwb3J0cy5iaW5hcnlUb0RlY2ltYWwgPSBleHBvcnRzLnNpZ25lZERlY2ltYWxUb0JpbmFyeSA9IGV4cG9ydHMuZGVjaW1hbFRvQmluYXJ5ID0gZXhwb3J0cy5uZWdhdGUgPSBleHBvcnRzLmlzTmVnYXRpdmUgPSB2b2lkIDA7XG4vKipcbiAqIEBtb2R1bGUgTnVtZXJpY1xuICovXG52YXIgaGFzaF9qc18xID0gcmVxdWlyZShcImhhc2guanNcIik7XG4vLyBjb3B5cmlnaHQgZGVmaW5lZCBpbiBlb3Nqcy9MSUNFTlNFLnR4dFxudmFyIHJpcGVtZDE2MCA9IHJlcXVpcmUoJy4vcmlwZW1kJykuUklQRU1EMTYwLmhhc2g7XG52YXIgYmFzZTU4Q2hhcnMgPSAnMTIzNDU2Nzg5QUJDREVGR0hKS0xNTlBRUlNUVVZXWFlaYWJjZGVmZ2hpamttbm9wcXJzdHV2d3h5eic7XG52YXIgYmFzZTY0Q2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7XG52YXIgY3JlYXRlX2Jhc2U1OF9tYXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGJhc2U1OE0gPSBBcnJheSgyNTYpLmZpbGwoLTEpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmFzZTU4Q2hhcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgYmFzZTU4TVtiYXNlNThDaGFycy5jaGFyQ29kZUF0KGkpXSA9IGk7XG4gICAgfVxuICAgIHJldHVybiBiYXNlNThNO1xufTtcbnZhciBiYXNlNThNYXAgPSBjcmVhdGVfYmFzZTU4X21hcCgpO1xudmFyIGNyZWF0ZV9iYXNlNjRfbWFwID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBiYXNlNjRNID0gQXJyYXkoMjU2KS5maWxsKC0xKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJhc2U2NENoYXJzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGJhc2U2NE1bYmFzZTY0Q2hhcnMuY2hhckNvZGVBdChpKV0gPSBpO1xuICAgIH1cbiAgICBiYXNlNjRNWyc9Jy5jaGFyQ29kZUF0KDApXSA9IDA7XG4gICAgcmV0dXJuIGJhc2U2NE07XG59O1xudmFyIGJhc2U2NE1hcCA9IGNyZWF0ZV9iYXNlNjRfbWFwKCk7XG4vKiogSXMgYGJpZ251bWAgYSBuZWdhdGl2ZSBudW1iZXI/ICovXG5leHBvcnRzLmlzTmVnYXRpdmUgPSBmdW5jdGlvbiAoYmlnbnVtKSB7XG4gICAgcmV0dXJuIChiaWdudW1bYmlnbnVtLmxlbmd0aCAtIDFdICYgMHg4MCkgIT09IDA7XG59O1xuLyoqIE5lZ2F0ZSBgYmlnbnVtYCAqL1xuZXhwb3J0cy5uZWdhdGUgPSBmdW5jdGlvbiAoYmlnbnVtKSB7XG4gICAgdmFyIGNhcnJ5ID0gMTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJpZ251bS5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgeCA9ICh+YmlnbnVtW2ldICYgMHhmZikgKyBjYXJyeTtcbiAgICAgICAgYmlnbnVtW2ldID0geDtcbiAgICAgICAgY2FycnkgPSB4ID4+IDg7XG4gICAgfVxufTtcbi8qKlxuICogQ29udmVydCBhbiB1bnNpZ25lZCBkZWNpbWFsIG51bWJlciBpbiBgc2AgdG8gYSBiaWdudW1cbiAqXG4gKiBAcGFyYW0gc2l6ZSBiaWdudW0gc2l6ZSAoYnl0ZXMpXG4gKi9cbmV4cG9ydHMuZGVjaW1hbFRvQmluYXJ5ID0gZnVuY3Rpb24gKHNpemUsIHMpIHtcbiAgICB2YXIgcmVzdWx0ID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBzcmNEaWdpdCA9IHMuY2hhckNvZGVBdChpKTtcbiAgICAgICAgaWYgKHNyY0RpZ2l0IDwgJzAnLmNoYXJDb2RlQXQoMCkgfHwgc3JjRGlnaXQgPiAnOScuY2hhckNvZGVBdCgwKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIG51bWJlcicpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjYXJyeSA9IHNyY0RpZ2l0IC0gJzAnLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2l6ZTsgKytqKSB7XG4gICAgICAgICAgICB2YXIgeCA9IHJlc3VsdFtqXSAqIDEwICsgY2Fycnk7XG4gICAgICAgICAgICByZXN1bHRbal0gPSB4O1xuICAgICAgICAgICAgY2FycnkgPSB4ID4+IDg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhcnJ5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ251bWJlciBpcyBvdXQgb2YgcmFuZ2UnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbi8qKlxuICogQ29udmVydCBhIHNpZ25lZCBkZWNpbWFsIG51bWJlciBpbiBgc2AgdG8gYSBiaWdudW1cbiAqXG4gKiBAcGFyYW0gc2l6ZSBiaWdudW0gc2l6ZSAoYnl0ZXMpXG4gKi9cbmV4cG9ydHMuc2lnbmVkRGVjaW1hbFRvQmluYXJ5ID0gZnVuY3Rpb24gKHNpemUsIHMpIHtcbiAgICB2YXIgbmVnYXRpdmUgPSBzWzBdID09PSAnLSc7XG4gICAgaWYgKG5lZ2F0aXZlKSB7XG4gICAgICAgIHMgPSBzLnN1YnN0cigxKTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IGV4cG9ydHMuZGVjaW1hbFRvQmluYXJ5KHNpemUsIHMpO1xuICAgIGlmIChuZWdhdGl2ZSkge1xuICAgICAgICBleHBvcnRzLm5lZ2F0ZShyZXN1bHQpO1xuICAgICAgICBpZiAoIWV4cG9ydHMuaXNOZWdhdGl2ZShyZXN1bHQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ251bWJlciBpcyBvdXQgb2YgcmFuZ2UnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChleHBvcnRzLmlzTmVnYXRpdmUocmVzdWx0KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ251bWJlciBpcyBvdXQgb2YgcmFuZ2UnKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG4vKipcbiAqIENvbnZlcnQgYGJpZ251bWAgdG8gYW4gdW5zaWduZWQgZGVjaW1hbCBudW1iZXJcbiAqXG4gKiBAcGFyYW0gbWluRGlnaXRzIDAtcGFkIHJlc3VsdCB0byB0aGlzIG1hbnkgZGlnaXRzXG4gKi9cbmV4cG9ydHMuYmluYXJ5VG9EZWNpbWFsID0gZnVuY3Rpb24gKGJpZ251bSwgbWluRGlnaXRzKSB7XG4gICAgaWYgKG1pbkRpZ2l0cyA9PT0gdm9pZCAwKSB7IG1pbkRpZ2l0cyA9IDE7IH1cbiAgICB2YXIgcmVzdWx0ID0gQXJyYXkobWluRGlnaXRzKS5maWxsKCcwJy5jaGFyQ29kZUF0KDApKTtcbiAgICBmb3IgKHZhciBpID0gYmlnbnVtLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBjYXJyeSA9IGJpZ251bVtpXTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCByZXN1bHQubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgIHZhciB4ID0gKChyZXN1bHRbal0gLSAnMCcuY2hhckNvZGVBdCgwKSkgPDwgOCkgKyBjYXJyeTtcbiAgICAgICAgICAgIHJlc3VsdFtqXSA9ICcwJy5jaGFyQ29kZUF0KDApICsgeCAlIDEwO1xuICAgICAgICAgICAgY2FycnkgPSAoeCAvIDEwKSB8IDA7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKGNhcnJ5KSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCgnMCcuY2hhckNvZGVBdCgwKSArIGNhcnJ5ICUgMTApO1xuICAgICAgICAgICAgY2FycnkgPSAoY2FycnkgLyAxMCkgfCAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5yZXZlcnNlKCk7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBfX3NwcmVhZChyZXN1bHQpKTtcbn07XG4vKipcbiAqIENvbnZlcnQgYGJpZ251bWAgdG8gYSBzaWduZWQgZGVjaW1hbCBudW1iZXJcbiAqXG4gKiBAcGFyYW0gbWluRGlnaXRzIDAtcGFkIHJlc3VsdCB0byB0aGlzIG1hbnkgZGlnaXRzXG4gKi9cbmV4cG9ydHMuc2lnbmVkQmluYXJ5VG9EZWNpbWFsID0gZnVuY3Rpb24gKGJpZ251bSwgbWluRGlnaXRzKSB7XG4gICAgaWYgKG1pbkRpZ2l0cyA9PT0gdm9pZCAwKSB7IG1pbkRpZ2l0cyA9IDE7IH1cbiAgICBpZiAoZXhwb3J0cy5pc05lZ2F0aXZlKGJpZ251bSkpIHtcbiAgICAgICAgdmFyIHggPSBiaWdudW0uc2xpY2UoKTtcbiAgICAgICAgZXhwb3J0cy5uZWdhdGUoeCk7XG4gICAgICAgIHJldHVybiAnLScgKyBleHBvcnRzLmJpbmFyeVRvRGVjaW1hbCh4LCBtaW5EaWdpdHMpO1xuICAgIH1cbiAgICByZXR1cm4gZXhwb3J0cy5iaW5hcnlUb0RlY2ltYWwoYmlnbnVtLCBtaW5EaWdpdHMpO1xufTtcbnZhciBiYXNlNThUb0JpbmFyeVZhclNpemUgPSBmdW5jdGlvbiAocykge1xuICAgIHZhciBlXzEsIF9hO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGNhcnJ5ID0gYmFzZTU4TWFwW3MuY2hhckNvZGVBdChpKV07XG4gICAgICAgIGlmIChjYXJyeSA8IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBiYXNlLTU4IHZhbHVlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCByZXN1bHQubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgIHZhciB4ID0gcmVzdWx0W2pdICogNTggKyBjYXJyeTtcbiAgICAgICAgICAgIHJlc3VsdFtqXSA9IHggJiAweGZmO1xuICAgICAgICAgICAgY2FycnkgPSB4ID4+IDg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhcnJ5KSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChjYXJyeSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgc18xID0gX192YWx1ZXMocyksIHNfMV8xID0gc18xLm5leHQoKTsgIXNfMV8xLmRvbmU7IHNfMV8xID0gc18xLm5leHQoKSkge1xuICAgICAgICAgICAgdmFyIGNoID0gc18xXzEudmFsdWU7XG4gICAgICAgICAgICBpZiAoY2ggPT09ICcxJykge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChzXzFfMSAmJiAhc18xXzEuZG9uZSAmJiAoX2EgPSBzXzEucmV0dXJuKSkgX2EuY2FsbChzXzEpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cbiAgICB9XG4gICAgcmVzdWx0LnJldmVyc2UoKTtcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkocmVzdWx0KTtcbn07XG4vKipcbiAqIENvbnZlcnQgYW4gdW5zaWduZWQgYmFzZS01OCBudW1iZXIgaW4gYHNgIHRvIGEgYmlnbnVtXG4gKlxuICogQHBhcmFtIHNpemUgYmlnbnVtIHNpemUgKGJ5dGVzKVxuICovXG5leHBvcnRzLmJhc2U1OFRvQmluYXJ5ID0gZnVuY3Rpb24gKHNpemUsIHMpIHtcbiAgICBpZiAoIXNpemUpIHtcbiAgICAgICAgcmV0dXJuIGJhc2U1OFRvQmluYXJ5VmFyU2l6ZShzKTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KHNpemUpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgY2FycnkgPSBiYXNlNThNYXBbcy5jaGFyQ29kZUF0KGkpXTtcbiAgICAgICAgaWYgKGNhcnJ5IDwgMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGJhc2UtNTggdmFsdWUnKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNpemU7ICsraikge1xuICAgICAgICAgICAgdmFyIHggPSByZXN1bHRbal0gKiA1OCArIGNhcnJ5O1xuICAgICAgICAgICAgcmVzdWx0W2pdID0geDtcbiAgICAgICAgICAgIGNhcnJ5ID0geCA+PiA4O1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYXJyeSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdiYXNlLTU4IHZhbHVlIGlzIG91dCBvZiByYW5nZScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5yZXZlcnNlKCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG4vKipcbiAqIENvbnZlcnQgYGJpZ251bWAgdG8gYSBiYXNlLTU4IG51bWJlclxuICpcbiAqIEBwYXJhbSBtaW5EaWdpdHMgMC1wYWQgcmVzdWx0IHRvIHRoaXMgbWFueSBkaWdpdHNcbiAqL1xuZXhwb3J0cy5iaW5hcnlUb0Jhc2U1OCA9IGZ1bmN0aW9uIChiaWdudW0sIG1pbkRpZ2l0cykge1xuICAgIHZhciBlXzIsIF9hLCBlXzMsIF9iO1xuICAgIGlmIChtaW5EaWdpdHMgPT09IHZvaWQgMCkgeyBtaW5EaWdpdHMgPSAxOyB9XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIGJpZ251bV8xID0gX192YWx1ZXMoYmlnbnVtKSwgYmlnbnVtXzFfMSA9IGJpZ251bV8xLm5leHQoKTsgIWJpZ251bV8xXzEuZG9uZTsgYmlnbnVtXzFfMSA9IGJpZ251bV8xLm5leHQoKSkge1xuICAgICAgICAgICAgdmFyIGJ5dGUgPSBiaWdudW1fMV8xLnZhbHVlO1xuICAgICAgICAgICAgdmFyIGNhcnJ5ID0gYnl0ZTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcmVzdWx0Lmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICAgICAgdmFyIHggPSAoYmFzZTU4TWFwW3Jlc3VsdFtqXV0gPDwgOCkgKyBjYXJyeTtcbiAgICAgICAgICAgICAgICByZXN1bHRbal0gPSBiYXNlNThDaGFycy5jaGFyQ29kZUF0KHggJSA1OCk7XG4gICAgICAgICAgICAgICAgY2FycnkgPSAoeCAvIDU4KSB8IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoY2FycnkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChiYXNlNThDaGFycy5jaGFyQ29kZUF0KGNhcnJ5ICUgNTgpKTtcbiAgICAgICAgICAgICAgICBjYXJyeSA9IChjYXJyeSAvIDU4KSB8IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVfMl8xKSB7IGVfMiA9IHsgZXJyb3I6IGVfMl8xIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChiaWdudW1fMV8xICYmICFiaWdudW1fMV8xLmRvbmUgJiYgKF9hID0gYmlnbnVtXzEucmV0dXJuKSkgX2EuY2FsbChiaWdudW1fMSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlXzIpIHRocm93IGVfMi5lcnJvcjsgfVxuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBiaWdudW1fMiA9IF9fdmFsdWVzKGJpZ251bSksIGJpZ251bV8yXzEgPSBiaWdudW1fMi5uZXh0KCk7ICFiaWdudW1fMl8xLmRvbmU7IGJpZ251bV8yXzEgPSBiaWdudW1fMi5uZXh0KCkpIHtcbiAgICAgICAgICAgIHZhciBieXRlID0gYmlnbnVtXzJfMS52YWx1ZTtcbiAgICAgICAgICAgIGlmIChieXRlKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCgnMScuY2hhckNvZGVBdCgwKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVfM18xKSB7IGVfMyA9IHsgZXJyb3I6IGVfM18xIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChiaWdudW1fMl8xICYmICFiaWdudW1fMl8xLmRvbmUgJiYgKF9iID0gYmlnbnVtXzIucmV0dXJuKSkgX2IuY2FsbChiaWdudW1fMik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlXzMpIHRocm93IGVfMy5lcnJvcjsgfVxuICAgIH1cbiAgICByZXN1bHQucmV2ZXJzZSgpO1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgX19zcHJlYWQocmVzdWx0KSk7XG59O1xuLyoqIENvbnZlcnQgYW4gdW5zaWduZWQgYmFzZS02NCBudW1iZXIgaW4gYHNgIHRvIGEgYmlnbnVtICovXG5leHBvcnRzLmJhc2U2NFRvQmluYXJ5ID0gZnVuY3Rpb24gKHMpIHtcbiAgICB2YXIgbGVuID0gcy5sZW5ndGg7XG4gICAgaWYgKChsZW4gJiAzKSA9PT0gMSAmJiBzW2xlbiAtIDFdID09PSAnPScpIHtcbiAgICAgICAgbGVuIC09IDE7XG4gICAgfSAvLyBmYyBhcHBlbmRzIGFuIGV4dHJhICc9J1xuICAgIGlmICgobGVuICYgMykgIT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdiYXNlLTY0IHZhbHVlIGlzIG5vdCBwYWRkZWQgY29ycmVjdGx5Jyk7XG4gICAgfVxuICAgIHZhciBncm91cHMgPSBsZW4gPj4gMjtcbiAgICB2YXIgYnl0ZXMgPSBncm91cHMgKiAzO1xuICAgIGlmIChsZW4gPiAwICYmIHNbbGVuIC0gMV0gPT09ICc9Jykge1xuICAgICAgICBpZiAoc1tsZW4gLSAyXSA9PT0gJz0nKSB7XG4gICAgICAgICAgICBieXRlcyAtPSAyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYnl0ZXMgLT0gMTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgcmVzdWx0ID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZXMpO1xuICAgIGZvciAodmFyIGdyb3VwID0gMDsgZ3JvdXAgPCBncm91cHM7ICsrZ3JvdXApIHtcbiAgICAgICAgdmFyIGRpZ2l0MCA9IGJhc2U2NE1hcFtzLmNoYXJDb2RlQXQoZ3JvdXAgKiA0ICsgMCldO1xuICAgICAgICB2YXIgZGlnaXQxID0gYmFzZTY0TWFwW3MuY2hhckNvZGVBdChncm91cCAqIDQgKyAxKV07XG4gICAgICAgIHZhciBkaWdpdDIgPSBiYXNlNjRNYXBbcy5jaGFyQ29kZUF0KGdyb3VwICogNCArIDIpXTtcbiAgICAgICAgdmFyIGRpZ2l0MyA9IGJhc2U2NE1hcFtzLmNoYXJDb2RlQXQoZ3JvdXAgKiA0ICsgMyldO1xuICAgICAgICByZXN1bHRbZ3JvdXAgKiAzICsgMF0gPSAoZGlnaXQwIDw8IDIpIHwgKGRpZ2l0MSA+PiA0KTtcbiAgICAgICAgaWYgKGdyb3VwICogMyArIDEgPCBieXRlcykge1xuICAgICAgICAgICAgcmVzdWx0W2dyb3VwICogMyArIDFdID0gKChkaWdpdDEgJiAxNSkgPDwgNCkgfCAoZGlnaXQyID4+IDIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChncm91cCAqIDMgKyAyIDwgYnl0ZXMpIHtcbiAgICAgICAgICAgIHJlc3VsdFtncm91cCAqIDMgKyAyXSA9ICgoZGlnaXQyICYgMykgPDwgNikgfCBkaWdpdDM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG4vKiogS2V5IHR5cGVzIHRoaXMgbGlicmFyeSBzdXBwb3J0cyAqL1xudmFyIEtleVR5cGU7XG4oZnVuY3Rpb24gKEtleVR5cGUpIHtcbiAgICBLZXlUeXBlW0tleVR5cGVbXCJrMVwiXSA9IDBdID0gXCJrMVwiO1xuICAgIEtleVR5cGVbS2V5VHlwZVtcInIxXCJdID0gMV0gPSBcInIxXCI7XG4gICAgS2V5VHlwZVtLZXlUeXBlW1wid2FcIl0gPSAyXSA9IFwid2FcIjtcbn0pKEtleVR5cGUgPSBleHBvcnRzLktleVR5cGUgfHwgKGV4cG9ydHMuS2V5VHlwZSA9IHt9KSk7XG4vKiogUHVibGljIGtleSBkYXRhIHNpemUsIGV4Y2x1ZGluZyB0eXBlIGZpZWxkICovXG5leHBvcnRzLnB1YmxpY0tleURhdGFTaXplID0gMzM7XG4vKiogUHJpdmF0ZSBrZXkgZGF0YSBzaXplLCBleGNsdWRpbmcgdHlwZSBmaWVsZCAqL1xuZXhwb3J0cy5wcml2YXRlS2V5RGF0YVNpemUgPSAzMjtcbi8qKiBTaWduYXR1cmUgZGF0YSBzaXplLCBleGNsdWRpbmcgdHlwZSBmaWVsZCAqL1xuZXhwb3J0cy5zaWduYXR1cmVEYXRhU2l6ZSA9IDY1O1xudmFyIGRpZ2VzdFN1ZmZpeFJpcGVtZDE2MCA9IGZ1bmN0aW9uIChkYXRhLCBzdWZmaXgpIHtcbiAgICB2YXIgZCA9IG5ldyBVaW50OEFycmF5KGRhdGEubGVuZ3RoICsgc3VmZml4Lmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGRbaV0gPSBkYXRhW2ldO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN1ZmZpeC5sZW5ndGg7ICsraSkge1xuICAgICAgICBkW2RhdGEubGVuZ3RoICsgaV0gPSBzdWZmaXguY2hhckNvZGVBdChpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJpcGVtZDE2MChkKTtcbn07XG52YXIgc3RyaW5nVG9LZXkgPSBmdW5jdGlvbiAocywgdHlwZSwgc2l6ZSwgc3VmZml4KSB7XG4gICAgdmFyIHdob2xlID0gZXhwb3J0cy5iYXNlNThUb0JpbmFyeShzaXplID8gc2l6ZSArIDQgOiAwLCBzKTtcbiAgICB2YXIgcmVzdWx0ID0geyB0eXBlOiB0eXBlLCBkYXRhOiBuZXcgVWludDhBcnJheSh3aG9sZS5idWZmZXIsIDAsIHdob2xlLmxlbmd0aCAtIDQpIH07XG4gICAgdmFyIGRpZ2VzdCA9IG5ldyBVaW50OEFycmF5KGRpZ2VzdFN1ZmZpeFJpcGVtZDE2MChyZXN1bHQuZGF0YSwgc3VmZml4KSk7XG4gICAgaWYgKGRpZ2VzdFswXSAhPT0gd2hvbGVbd2hvbGUubGVuZ3RoIC0gNF0gfHwgZGlnZXN0WzFdICE9PSB3aG9sZVt3aG9sZS5sZW5ndGggLSAzXVxuICAgICAgICB8fCBkaWdlc3RbMl0gIT09IHdob2xlW3dob2xlLmxlbmd0aCAtIDJdIHx8IGRpZ2VzdFszXSAhPT0gd2hvbGVbd2hvbGUubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjaGVja3N1bSBkb2VzblxcJ3QgbWF0Y2gnKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIga2V5VG9TdHJpbmcgPSBmdW5jdGlvbiAoa2V5LCBzdWZmaXgsIHByZWZpeCkge1xuICAgIHZhciBkaWdlc3QgPSBuZXcgVWludDhBcnJheShkaWdlc3RTdWZmaXhSaXBlbWQxNjAoa2V5LmRhdGEsIHN1ZmZpeCkpO1xuICAgIHZhciB3aG9sZSA9IG5ldyBVaW50OEFycmF5KGtleS5kYXRhLmxlbmd0aCArIDQpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5LmRhdGEubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgd2hvbGVbaV0gPSBrZXkuZGF0YVtpXTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyArK2kpIHtcbiAgICAgICAgd2hvbGVbaSArIGtleS5kYXRhLmxlbmd0aF0gPSBkaWdlc3RbaV07XG4gICAgfVxuICAgIHJldHVybiBwcmVmaXggKyBleHBvcnRzLmJpbmFyeVRvQmFzZTU4KHdob2xlKTtcbn07XG4vKiogQ29udmVydCBrZXkgaW4gYHNgIHRvIGJpbmFyeSBmb3JtICovXG5leHBvcnRzLnN0cmluZ1RvUHVibGljS2V5ID0gZnVuY3Rpb24gKHMpIHtcbiAgICBpZiAodHlwZW9mIHMgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZXhwZWN0ZWQgc3RyaW5nIGNvbnRhaW5pbmcgcHVibGljIGtleScpO1xuICAgIH1cbiAgICBpZiAocy5zdWJzdHIoMCwgMykgPT09ICdFT1MnKSB7XG4gICAgICAgIHZhciB3aG9sZSA9IGV4cG9ydHMuYmFzZTU4VG9CaW5hcnkoZXhwb3J0cy5wdWJsaWNLZXlEYXRhU2l6ZSArIDQsIHMuc3Vic3RyKDMpKTtcbiAgICAgICAgdmFyIGtleSA9IHsgdHlwZTogS2V5VHlwZS5rMSwgZGF0YTogbmV3IFVpbnQ4QXJyYXkoZXhwb3J0cy5wdWJsaWNLZXlEYXRhU2l6ZSkgfTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBvcnRzLnB1YmxpY0tleURhdGFTaXplOyArK2kpIHtcbiAgICAgICAgICAgIGtleS5kYXRhW2ldID0gd2hvbGVbaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRpZ2VzdCA9IG5ldyBVaW50OEFycmF5KHJpcGVtZDE2MChrZXkuZGF0YSkpO1xuICAgICAgICBpZiAoZGlnZXN0WzBdICE9PSB3aG9sZVtleHBvcnRzLnB1YmxpY0tleURhdGFTaXplXSB8fCBkaWdlc3RbMV0gIT09IHdob2xlWzM0XVxuICAgICAgICAgICAgfHwgZGlnZXN0WzJdICE9PSB3aG9sZVszNV0gfHwgZGlnZXN0WzNdICE9PSB3aG9sZVszNl0pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY2hlY2tzdW0gZG9lc25cXCd0IG1hdGNoJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG4gICAgZWxzZSBpZiAocy5zdWJzdHIoMCwgNykgPT09ICdQVUJfSzFfJykge1xuICAgICAgICByZXR1cm4gc3RyaW5nVG9LZXkocy5zdWJzdHIoNyksIEtleVR5cGUuazEsIGV4cG9ydHMucHVibGljS2V5RGF0YVNpemUsICdLMScpO1xuICAgIH1cbiAgICBlbHNlIGlmIChzLnN1YnN0cigwLCA3KSA9PT0gJ1BVQl9SMV8nKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmdUb0tleShzLnN1YnN0cig3KSwgS2V5VHlwZS5yMSwgZXhwb3J0cy5wdWJsaWNLZXlEYXRhU2l6ZSwgJ1IxJyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHMuc3Vic3RyKDAsIDcpID09PSAnUFVCX1dBXycpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZ1RvS2V5KHMuc3Vic3RyKDcpLCBLZXlUeXBlLndhLCAwLCAnV0EnKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHB1YmxpYyBrZXkgZm9ybWF0Jyk7XG4gICAgfVxufTtcbi8qKiBDb252ZXJ0IHB1YmxpYyBga2V5YCB0byBsZWdhY3kgc3RyaW5nIChiYXNlLTU4KSBmb3JtICovXG5leHBvcnRzLnB1YmxpY0tleVRvTGVnYWN5U3RyaW5nID0gZnVuY3Rpb24gKGtleSkge1xuICAgIGlmIChrZXkudHlwZSA9PT0gS2V5VHlwZS5rMSAmJiBrZXkuZGF0YS5sZW5ndGggPT09IGV4cG9ydHMucHVibGljS2V5RGF0YVNpemUpIHtcbiAgICAgICAgcmV0dXJuIGtleVRvU3RyaW5nKGtleSwgJycsICdFT1MnKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoa2V5LnR5cGUgPT09IEtleVR5cGUucjEgfHwga2V5LnR5cGUgPT09IEtleVR5cGUud2EpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdLZXkgZm9ybWF0IG5vdCBzdXBwb3J0ZWQgaW4gbGVnYWN5IGNvbnZlcnNpb24nKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHB1YmxpYyBrZXkgZm9ybWF0Jyk7XG4gICAgfVxufTtcbi8qKiBDb252ZXJ0IGBrZXlgIHRvIHN0cmluZyAoYmFzZS01OCkgZm9ybSAqL1xuZXhwb3J0cy5wdWJsaWNLZXlUb1N0cmluZyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoa2V5LnR5cGUgPT09IEtleVR5cGUuazEgJiYga2V5LmRhdGEubGVuZ3RoID09PSBleHBvcnRzLnB1YmxpY0tleURhdGFTaXplKSB7XG4gICAgICAgIHJldHVybiBrZXlUb1N0cmluZyhrZXksICdLMScsICdQVUJfSzFfJyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGtleS50eXBlID09PSBLZXlUeXBlLnIxICYmIGtleS5kYXRhLmxlbmd0aCA9PT0gZXhwb3J0cy5wdWJsaWNLZXlEYXRhU2l6ZSkge1xuICAgICAgICByZXR1cm4ga2V5VG9TdHJpbmcoa2V5LCAnUjEnLCAnUFVCX1IxXycpO1xuICAgIH1cbiAgICBlbHNlIGlmIChrZXkudHlwZSA9PT0gS2V5VHlwZS53YSkge1xuICAgICAgICByZXR1cm4ga2V5VG9TdHJpbmcoa2V5LCAnV0EnLCAnUFVCX1dBXycpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnJlY29nbml6ZWQgcHVibGljIGtleSBmb3JtYXQnKTtcbiAgICB9XG59O1xuLyoqIElmIGEga2V5IGlzIGluIHRoZSBsZWdhY3kgZm9ybWF0IChgRU9TYCBwcmVmaXgpLCB0aGVuIGNvbnZlcnQgaXQgdG8gdGhlIG5ldyBmb3JtYXQgKGBQVUJfSzFfYCkuXG4gKiBMZWF2ZXMgb3RoZXIgZm9ybWF0cyB1bnRvdWNoZWRcbiAqL1xuZXhwb3J0cy5jb252ZXJ0TGVnYWN5UHVibGljS2V5ID0gZnVuY3Rpb24gKHMpIHtcbiAgICBpZiAocy5zdWJzdHIoMCwgMykgPT09ICdFT1MnKSB7XG4gICAgICAgIHJldHVybiBleHBvcnRzLnB1YmxpY0tleVRvU3RyaW5nKGV4cG9ydHMuc3RyaW5nVG9QdWJsaWNLZXkocykpO1xuICAgIH1cbiAgICByZXR1cm4gcztcbn07XG4vKiogSWYgYSBrZXkgaXMgaW4gdGhlIGxlZ2FjeSBmb3JtYXQgKGBFT1NgIHByZWZpeCksIHRoZW4gY29udmVydCBpdCB0byB0aGUgbmV3IGZvcm1hdCAoYFBVQl9LMV9gKS5cbiAqIExlYXZlcyBvdGhlciBmb3JtYXRzIHVudG91Y2hlZFxuICovXG5leHBvcnRzLmNvbnZlcnRMZWdhY3lQdWJsaWNLZXlzID0gZnVuY3Rpb24gKGtleXMpIHtcbiAgICByZXR1cm4ga2V5cy5tYXAoZXhwb3J0cy5jb252ZXJ0TGVnYWN5UHVibGljS2V5KTtcbn07XG4vKiogQ29udmVydCBrZXkgaW4gYHNgIHRvIGJpbmFyeSBmb3JtICovXG5leHBvcnRzLnN0cmluZ1RvUHJpdmF0ZUtleSA9IGZ1bmN0aW9uIChzKSB7XG4gICAgaWYgKHR5cGVvZiBzICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2V4cGVjdGVkIHN0cmluZyBjb250YWluaW5nIHByaXZhdGUga2V5Jyk7XG4gICAgfVxuICAgIGlmIChzLnN1YnN0cigwLCA3KSA9PT0gJ1BWVF9SMV8nKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmdUb0tleShzLnN1YnN0cig3KSwgS2V5VHlwZS5yMSwgZXhwb3J0cy5wcml2YXRlS2V5RGF0YVNpemUsICdSMScpO1xuICAgIH1cbiAgICBlbHNlIGlmIChzLnN1YnN0cigwLCA3KSA9PT0gJ1BWVF9LMV8nKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmdUb0tleShzLnN1YnN0cig3KSwgS2V5VHlwZS5rMSwgZXhwb3J0cy5wcml2YXRlS2V5RGF0YVNpemUsICdLMScpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gdG9kbzogVmVyaWZ5IGNoZWNrc3VtOiBzaGEyNTYoc2hhMjU2KGtleS5kYXRhKSkuXG4gICAgICAgIC8vICAgICAgIE5vdCBjcml0aWNhbCBzaW5jZSBhIGJhZCBrZXkgd2lsbCBmYWlsIHRvIHByb2R1Y2UgYVxuICAgICAgICAvLyAgICAgICB2YWxpZCBzaWduYXR1cmUgYW55d2F5LlxuICAgICAgICB2YXIgd2hvbGUgPSBleHBvcnRzLmJhc2U1OFRvQmluYXJ5KGV4cG9ydHMucHJpdmF0ZUtleURhdGFTaXplICsgNSwgcyk7XG4gICAgICAgIHZhciBrZXkgPSB7IHR5cGU6IEtleVR5cGUuazEsIGRhdGE6IG5ldyBVaW50OEFycmF5KGV4cG9ydHMucHJpdmF0ZUtleURhdGFTaXplKSB9O1xuICAgICAgICBpZiAod2hvbGVbMF0gIT09IDB4ODApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHByaXZhdGUga2V5IHR5cGUnKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4cG9ydHMucHJpdmF0ZUtleURhdGFTaXplOyArK2kpIHtcbiAgICAgICAgICAgIGtleS5kYXRhW2ldID0gd2hvbGVbaSArIDFdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBrZXk7XG4gICAgfVxufTtcbi8qKiBDb252ZXJ0IHByaXZhdGUgYGtleWAgdG8gbGVnYWN5IHN0cmluZyAoYmFzZS01OCkgZm9ybSAqL1xuZXhwb3J0cy5wcml2YXRlS2V5VG9MZWdhY3lTdHJpbmcgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKGtleS50eXBlID09PSBLZXlUeXBlLmsxICYmIGtleS5kYXRhLmxlbmd0aCA9PT0gZXhwb3J0cy5wcml2YXRlS2V5RGF0YVNpemUpIHtcbiAgICAgICAgdmFyIHdob2xlXzEgPSBbXTtcbiAgICAgICAgd2hvbGVfMS5wdXNoKDEyOCk7XG4gICAgICAgIGtleS5kYXRhLmZvckVhY2goZnVuY3Rpb24gKGJ5dGUpIHsgcmV0dXJuIHdob2xlXzEucHVzaChieXRlKTsgfSk7XG4gICAgICAgIHZhciBkaWdlc3QgPSBuZXcgVWludDhBcnJheShoYXNoX2pzXzEuc2hhMjU2KCkudXBkYXRlKGhhc2hfanNfMS5zaGEyNTYoKS51cGRhdGUod2hvbGVfMSkuZGlnZXN0KCkpLmRpZ2VzdCgpKTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KGV4cG9ydHMucHJpdmF0ZUtleURhdGFTaXplICsgNSk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd2hvbGVfMS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0W2ldID0gd2hvbGVfMVtpXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0W2kgKyB3aG9sZV8xLmxlbmd0aF0gPSBkaWdlc3RbaV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV4cG9ydHMuYmluYXJ5VG9CYXNlNTgocmVzdWx0KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoa2V5LnR5cGUgPT09IEtleVR5cGUucjEgfHwga2V5LnR5cGUgPT09IEtleVR5cGUud2EpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdLZXkgZm9ybWF0IG5vdCBzdXBwb3J0ZWQgaW4gbGVnYWN5IGNvbnZlcnNpb24nKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHB1YmxpYyBrZXkgZm9ybWF0Jyk7XG4gICAgfVxufTtcbi8qKiBDb252ZXJ0IGBrZXlgIHRvIHN0cmluZyAoYmFzZS01OCkgZm9ybSAqL1xuZXhwb3J0cy5wcml2YXRlS2V5VG9TdHJpbmcgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKGtleS50eXBlID09PSBLZXlUeXBlLnIxKSB7XG4gICAgICAgIHJldHVybiBrZXlUb1N0cmluZyhrZXksICdSMScsICdQVlRfUjFfJyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGtleS50eXBlID09PSBLZXlUeXBlLmsxKSB7XG4gICAgICAgIHJldHVybiBrZXlUb1N0cmluZyhrZXksICdLMScsICdQVlRfSzFfJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VucmVjb2duaXplZCBwcml2YXRlIGtleSBmb3JtYXQnKTtcbiAgICB9XG59O1xuLyoqIENvbnZlcnQga2V5IGluIGBzYCB0byBiaW5hcnkgZm9ybSAqL1xuZXhwb3J0cy5zdHJpbmdUb1NpZ25hdHVyZSA9IGZ1bmN0aW9uIChzKSB7XG4gICAgaWYgKHR5cGVvZiBzICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2V4cGVjdGVkIHN0cmluZyBjb250YWluaW5nIHNpZ25hdHVyZScpO1xuICAgIH1cbiAgICBpZiAocy5zdWJzdHIoMCwgNykgPT09ICdTSUdfSzFfJykge1xuICAgICAgICByZXR1cm4gc3RyaW5nVG9LZXkocy5zdWJzdHIoNyksIEtleVR5cGUuazEsIGV4cG9ydHMuc2lnbmF0dXJlRGF0YVNpemUsICdLMScpO1xuICAgIH1cbiAgICBlbHNlIGlmIChzLnN1YnN0cigwLCA3KSA9PT0gJ1NJR19SMV8nKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmdUb0tleShzLnN1YnN0cig3KSwgS2V5VHlwZS5yMSwgZXhwb3J0cy5zaWduYXR1cmVEYXRhU2l6ZSwgJ1IxJyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHMuc3Vic3RyKDAsIDcpID09PSAnU0lHX1dBXycpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZ1RvS2V5KHMuc3Vic3RyKDcpLCBLZXlUeXBlLndhLCAwLCAnV0EnKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHNpZ25hdHVyZSBmb3JtYXQnKTtcbiAgICB9XG59O1xuLyoqIENvbnZlcnQgYHNpZ25hdHVyZWAgdG8gc3RyaW5nIChiYXNlLTU4KSBmb3JtICovXG5leHBvcnRzLnNpZ25hdHVyZVRvU3RyaW5nID0gZnVuY3Rpb24gKHNpZ25hdHVyZSkge1xuICAgIGlmIChzaWduYXR1cmUudHlwZSA9PT0gS2V5VHlwZS5rMSkge1xuICAgICAgICByZXR1cm4ga2V5VG9TdHJpbmcoc2lnbmF0dXJlLCAnSzEnLCAnU0lHX0sxXycpO1xuICAgIH1cbiAgICBlbHNlIGlmIChzaWduYXR1cmUudHlwZSA9PT0gS2V5VHlwZS5yMSkge1xuICAgICAgICByZXR1cm4ga2V5VG9TdHJpbmcoc2lnbmF0dXJlLCAnUjEnLCAnU0lHX1IxXycpO1xuICAgIH1cbiAgICBlbHNlIGlmIChzaWduYXR1cmUudHlwZSA9PT0gS2V5VHlwZS53YSkge1xuICAgICAgICByZXR1cm4ga2V5VG9TdHJpbmcoc2lnbmF0dXJlLCAnV0EnLCAnU0lHX1dBXycpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnJlY29nbml6ZWQgc2lnbmF0dXJlIGZvcm1hdCcpO1xuICAgIH1cbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQG1vZHVsZSBTZXJpYWxpemVcbiAqL1xuLy8gY29weXJpZ2h0IGRlZmluZWQgaW4gZW9zanMvTElDRU5TRS50eHRcbi8qIGVzbGludC1kaXNhYmxlIG1heC1jbGFzc2VzLXBlci1maWxlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBqc2RvYy9jaGVjay1pbmRlbnRhdGlvbiAqL1xudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3NwcmVhZCA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWQpIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xuICAgIHJldHVybiBhcjtcbn07XG52YXIgX192YWx1ZXMgPSAodGhpcyAmJiB0aGlzLl9fdmFsdWVzKSB8fCBmdW5jdGlvbihvKSB7XG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlc2VyaWFsaXplQWN0aW9uID0gZXhwb3J0cy5kZXNlcmlhbGl6ZUFiaVR5cGUgPSBleHBvcnRzLnNlcmlhbGl6ZUFiaVR5cGUgPSBleHBvcnRzLmRlc2VyaWFsaXplQWN0aW9uRGF0YSA9IGV4cG9ydHMuc2VyaWFsaXplQWN0aW9uID0gZXhwb3J0cy5zZXJpYWxpemVBY3Rpb25EYXRhID0gZXhwb3J0cy50cmFuc2FjdGlvbkhlYWRlciA9IGV4cG9ydHMuZ2V0VHlwZXNGcm9tQWJpID0gZXhwb3J0cy5nZXRUeXBlID0gZXhwb3J0cy5jcmVhdGVJbml0aWFsVHlwZXMgPSBleHBvcnRzLmhleFRvVWludDhBcnJheSA9IGV4cG9ydHMuYXJyYXlUb0hleCA9IGV4cG9ydHMuc3ltYm9sVG9TdHJpbmcgPSBleHBvcnRzLnN0cmluZ1RvU3ltYm9sID0gZXhwb3J0cy5ibG9ja1RpbWVzdGFtcFRvRGF0ZSA9IGV4cG9ydHMuZGF0ZVRvQmxvY2tUaW1lc3RhbXAgPSBleHBvcnRzLnRpbWVQb2ludFNlY1RvRGF0ZSA9IGV4cG9ydHMuZGF0ZVRvVGltZVBvaW50U2VjID0gZXhwb3J0cy50aW1lUG9pbnRUb0RhdGUgPSBleHBvcnRzLmRhdGVUb1RpbWVQb2ludCA9IGV4cG9ydHMuc3VwcG9ydGVkQWJpVmVyc2lvbiA9IGV4cG9ydHMuU2VyaWFsQnVmZmVyID0gZXhwb3J0cy5TZXJpYWxpemVyU3RhdGUgPSB2b2lkIDA7XG52YXIgbnVtZXJpYyA9IHJlcXVpcmUoXCIuL2Vvc2pzLW51bWVyaWNcIik7XG4vKiogU3RhdGUgZm9yIHNlcmlhbGl6ZSgpIGFuZCBkZXNlcmlhbGl6ZSgpICovXG52YXIgU2VyaWFsaXplclN0YXRlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNlcmlhbGl6ZXJTdGF0ZShvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIC8qKiBIYXZlIGFueSBiaW5hcnkgZXh0ZW5zaW9ucyBiZWVuIHNraXBwZWQ/ICovXG4gICAgICAgIHRoaXMuc2tpcHBlZEJpbmFyeUV4dGVuc2lvbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cbiAgICByZXR1cm4gU2VyaWFsaXplclN0YXRlO1xufSgpKTtcbmV4cG9ydHMuU2VyaWFsaXplclN0YXRlID0gU2VyaWFsaXplclN0YXRlO1xuLyoqIFNlcmlhbGl6ZSBhbmQgZGVzZXJpYWxpemUgZGF0YSAqL1xudmFyIFNlcmlhbEJ1ZmZlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gX19uYW1lZFBhcmFtZXRlcnNcbiAgICAgKiBgYXJyYXlgOiBgbnVsbGAgaWYgc2VyaWFsaXppbmcsIG9yIGJpbmFyeSBkYXRhIHRvIGRlc2VyaWFsaXplXG4gICAgICogYHRleHRFbmNvZGVyYDogYFRleHRFbmNvZGVyYCBpbnN0YW5jZSB0byB1c2UuIFBhc3MgaW4gYG51bGxgIGlmIHJ1bm5pbmcgaW4gYSBicm93c2VyXG4gICAgICogYHRleHREZWNvZGVyYDogYFRleHREZWNpZGVyYCBpbnN0YW5jZSB0byB1c2UuIFBhc3MgaW4gYG51bGxgIGlmIHJ1bm5pbmcgaW4gYSBicm93c2VyXG4gICAgICovXG4gICAgZnVuY3Rpb24gU2VyaWFsQnVmZmVyKF9hKSB7XG4gICAgICAgIHZhciBfYiA9IF9hID09PSB2b2lkIDAgPyB7fSA6IF9hLCB0ZXh0RW5jb2RlciA9IF9iLnRleHRFbmNvZGVyLCB0ZXh0RGVjb2RlciA9IF9iLnRleHREZWNvZGVyLCBhcnJheSA9IF9iLmFycmF5O1xuICAgICAgICAvKiogQ3VycmVudCBwb3NpdGlvbiB3aGlsZSByZWFkaW5nIChkZXNlcmlhbGl6aW5nKSAqL1xuICAgICAgICB0aGlzLnJlYWRQb3MgPSAwO1xuICAgICAgICB0aGlzLmFycmF5ID0gYXJyYXkgfHwgbmV3IFVpbnQ4QXJyYXkoMTAyNCk7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuICAgICAgICB0aGlzLnRleHRFbmNvZGVyID0gdGV4dEVuY29kZXIgfHwgbmV3IFRleHRFbmNvZGVyKCk7XG4gICAgICAgIHRoaXMudGV4dERlY29kZXIgPSB0ZXh0RGVjb2RlciB8fCBuZXcgVGV4dERlY29kZXIoJ3V0Zi04JywgeyBmYXRhbDogdHJ1ZSB9KTtcbiAgICB9XG4gICAgLyoqIFJlc2l6ZSBgYXJyYXlgIGlmIG5lZWRlZCB0byBoYXZlIGF0IGxlYXN0IGBzaXplYCBieXRlcyBmcmVlICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5yZXNlcnZlID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoICsgc2l6ZSA8PSB0aGlzLmFycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsID0gdGhpcy5hcnJheS5sZW5ndGg7XG4gICAgICAgIHdoaWxlICh0aGlzLmxlbmd0aCArIHNpemUgPiBsKSB7XG4gICAgICAgICAgICBsID0gTWF0aC5jZWlsKGwgKiAxLjUpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuZXdBcnJheSA9IG5ldyBVaW50OEFycmF5KGwpO1xuICAgICAgICBuZXdBcnJheS5zZXQodGhpcy5hcnJheSk7XG4gICAgICAgIHRoaXMuYXJyYXkgPSBuZXdBcnJheTtcbiAgICB9O1xuICAgIC8qKiBJcyB0aGVyZSBkYXRhIGF2YWlsYWJsZSB0byByZWFkPyAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUuaGF2ZVJlYWREYXRhID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkUG9zIDwgdGhpcy5sZW5ndGg7XG4gICAgfTtcbiAgICAvKiogUmVzdGFydCByZWFkaW5nIGZyb20gdGhlIGJlZ2lubmluZyAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUucmVzdGFydFJlYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucmVhZFBvcyA9IDA7XG4gICAgfTtcbiAgICAvKiogUmV0dXJuIGRhdGEgd2l0aCBleGNlc3Mgc3RvcmFnZSB0cmltbWVkIGF3YXkgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLmFzVWludDhBcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHRoaXMuYXJyYXkuYnVmZmVyLCB0aGlzLmFycmF5LmJ5dGVPZmZzZXQsIHRoaXMubGVuZ3RoKTtcbiAgICB9O1xuICAgIC8qKiBBcHBlbmQgYnl0ZXMgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLnB1c2hBcnJheSA9IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHRoaXMucmVzZXJ2ZSh2Lmxlbmd0aCk7XG4gICAgICAgIHRoaXMuYXJyYXkuc2V0KHYsIHRoaXMubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5sZW5ndGggKz0gdi5sZW5ndGg7XG4gICAgfTtcbiAgICAvKiogQXBwZW5kIGJ5dGVzICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdiA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdltfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHVzaEFycmF5KHYpO1xuICAgIH07XG4gICAgLyoqIEdldCBhIHNpbmdsZSBieXRlICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlYWRQb3MgPCB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXJyYXlbdGhpcy5yZWFkUG9zKytdO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUmVhZCBwYXN0IGVuZCBvZiBidWZmZXInKTtcbiAgICB9O1xuICAgIC8qKiBBcHBlbmQgYnl0ZXMgaW4gYHZgLiBUaHJvd3MgaWYgYGxlbmAgZG9lc24ndCBtYXRjaCBgdi5sZW5ndGhgICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5wdXNoVWludDhBcnJheUNoZWNrZWQgPSBmdW5jdGlvbiAodiwgbGVuKSB7XG4gICAgICAgIGlmICh2Lmxlbmd0aCAhPT0gbGVuKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JpbmFyeSBkYXRhIGhhcyBpbmNvcnJlY3Qgc2l6ZScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHVzaEFycmF5KHYpO1xuICAgIH07XG4gICAgLyoqIEdldCBgbGVuYCBieXRlcyAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUuZ2V0VWludDhBcnJheSA9IGZ1bmN0aW9uIChsZW4pIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZFBvcyArIGxlbiA+IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlYWQgcGFzdCBlbmQgb2YgYnVmZmVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KHRoaXMuYXJyYXkuYnVmZmVyLCB0aGlzLmFycmF5LmJ5dGVPZmZzZXQgKyB0aGlzLnJlYWRQb3MsIGxlbik7XG4gICAgICAgIHRoaXMucmVhZFBvcyArPSBsZW47XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICAvKiogU2tpcCBgbGVuYCBieXRlcyAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUuc2tpcCA9IGZ1bmN0aW9uIChsZW4pIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZFBvcyArIGxlbiA+IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlYWQgcGFzdCBlbmQgb2YgYnVmZmVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWFkUG9zICs9IGxlbjtcbiAgICB9O1xuICAgIC8qKiBBcHBlbmQgYSBgdWludDE2YCAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUucHVzaFVpbnQxNiA9IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHRoaXMucHVzaCgodiA+PiAwKSAmIDB4ZmYsICh2ID4+IDgpICYgMHhmZik7XG4gICAgfTtcbiAgICAvKiogR2V0IGEgYHVpbnQxNmAgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLmdldFVpbnQxNiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHYgPSAwO1xuICAgICAgICB2IHw9IHRoaXMuZ2V0KCkgPDwgMDtcbiAgICAgICAgdiB8PSB0aGlzLmdldCgpIDw8IDg7XG4gICAgICAgIHJldHVybiB2O1xuICAgIH07XG4gICAgLyoqIEFwcGVuZCBhIGB1aW50MzJgICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5wdXNoVWludDMyID0gZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgdGhpcy5wdXNoKCh2ID4+IDApICYgMHhmZiwgKHYgPj4gOCkgJiAweGZmLCAodiA+PiAxNikgJiAweGZmLCAodiA+PiAyNCkgJiAweGZmKTtcbiAgICB9O1xuICAgIC8qKiBHZXQgYSBgdWludDMyYCAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUuZ2V0VWludDMyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdiA9IDA7XG4gICAgICAgIHYgfD0gdGhpcy5nZXQoKSA8PCAwO1xuICAgICAgICB2IHw9IHRoaXMuZ2V0KCkgPDwgODtcbiAgICAgICAgdiB8PSB0aGlzLmdldCgpIDw8IDE2O1xuICAgICAgICB2IHw9IHRoaXMuZ2V0KCkgPDwgMjQ7XG4gICAgICAgIHJldHVybiB2ID4+PiAwO1xuICAgIH07XG4gICAgLyoqIEFwcGVuZCBhIGB1aW50NjRgLiAqQ2F1dGlvbio6IGBudW1iZXJgIG9ubHkgaGFzIDUzIGJpdHMgb2YgcHJlY2lzaW9uICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5wdXNoTnVtYmVyQXNVaW50NjQgPSBmdW5jdGlvbiAodikge1xuICAgICAgICB0aGlzLnB1c2hVaW50MzIodiA+Pj4gMCk7XG4gICAgICAgIHRoaXMucHVzaFVpbnQzMihNYXRoLmZsb29yKHYgLyA0Mjk0OTY3Mjk2KSA+Pj4gMCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgYSBgdWludDY0YCBhcyBhIGBudW1iZXJgLiAqQ2F1dGlvbio6IGBudW1iZXJgIG9ubHkgaGFzIDUzIGJpdHMgb2YgcHJlY2lzaW9uOyBzb21lIHZhbHVlcyB3aWxsIGNoYW5nZS5cbiAgICAgKiBgbnVtZXJpYy5iaW5hcnlUb0RlY2ltYWwoc2VyaWFsQnVmZmVyLmdldFVpbnQ4QXJyYXkoOCkpYCByZWNvbW1lbmRlZCBpbnN0ZWFkXG4gICAgICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5nZXRVaW50NjRBc051bWJlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGxvdyA9IHRoaXMuZ2V0VWludDMyKCk7XG4gICAgICAgIHZhciBoaWdoID0gdGhpcy5nZXRVaW50MzIoKTtcbiAgICAgICAgcmV0dXJuIChoaWdoID4+PiAwKSAqIDQyOTQ5NjcyOTYgKyAobG93ID4+PiAwKTtcbiAgICB9O1xuICAgIC8qKiBBcHBlbmQgYSBgdmFydWludDMyYCAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUucHVzaFZhcnVpbnQzMiA9IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICBpZiAodiA+Pj4gNykge1xuICAgICAgICAgICAgICAgIHRoaXMucHVzaCgweDgwIHwgKHYgJiAweDdmKSk7XG4gICAgICAgICAgICAgICAgdiA9IHYgPj4+IDc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnB1c2godik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKiBHZXQgYSBgdmFydWludDMyYCAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUuZ2V0VmFydWludDMyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdiA9IDA7XG4gICAgICAgIHZhciBiaXQgPSAwO1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgdmFyIGIgPSB0aGlzLmdldCgpO1xuICAgICAgICAgICAgdiB8PSAoYiAmIDB4N2YpIDw8IGJpdDtcbiAgICAgICAgICAgIGJpdCArPSA3O1xuICAgICAgICAgICAgaWYgKCEoYiAmIDB4ODApKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHYgPj4+IDA7XG4gICAgfTtcbiAgICAvKiogQXBwZW5kIGEgYHZhcmludDMyYCAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUucHVzaFZhcmludDMyID0gZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgdGhpcy5wdXNoVmFydWludDMyKCh2IDw8IDEpIF4gKHYgPj4gMzEpKTtcbiAgICB9O1xuICAgIC8qKiBHZXQgYSBgdmFyaW50MzJgICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5nZXRWYXJpbnQzMiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHYgPSB0aGlzLmdldFZhcnVpbnQzMigpO1xuICAgICAgICBpZiAodiAmIDEpIHtcbiAgICAgICAgICAgIHJldHVybiAoKH52KSA+PiAxKSB8IDIxNDc0ODM2NDg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdiA+Pj4gMTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqIEFwcGVuZCBhIGBmbG9hdDMyYCAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUucHVzaEZsb2F0MzIgPSBmdW5jdGlvbiAodikge1xuICAgICAgICB0aGlzLnB1c2hBcnJheShuZXcgVWludDhBcnJheSgobmV3IEZsb2F0MzJBcnJheShbdl0pKS5idWZmZXIpKTtcbiAgICB9O1xuICAgIC8qKiBHZXQgYSBgZmxvYXQzMmAgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLmdldEZsb2F0MzIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgRmxvYXQzMkFycmF5KHRoaXMuZ2V0VWludDhBcnJheSg0KS5zbGljZSgpLmJ1ZmZlcilbMF07XG4gICAgfTtcbiAgICAvKiogQXBwZW5kIGEgYGZsb2F0NjRgICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5wdXNoRmxvYXQ2NCA9IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHRoaXMucHVzaEFycmF5KG5ldyBVaW50OEFycmF5KChuZXcgRmxvYXQ2NEFycmF5KFt2XSkpLmJ1ZmZlcikpO1xuICAgIH07XG4gICAgLyoqIEdldCBhIGBmbG9hdDY0YCAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUuZ2V0RmxvYXQ2NCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBGbG9hdDY0QXJyYXkodGhpcy5nZXRVaW50OEFycmF5KDgpLnNsaWNlKCkuYnVmZmVyKVswXTtcbiAgICB9O1xuICAgIC8qKiBBcHBlbmQgYSBgbmFtZWAgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLnB1c2hOYW1lID0gZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBzdHJpbmcgY29udGFpbmluZyBuYW1lJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cCgvXlsuMS01YS16XXswLDEyfVsuMS01YS1qXT8kLyk7XG4gICAgICAgIGlmICghcmVnZXgudGVzdChzKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOYW1lIHNob3VsZCBiZSBsZXNzIHRoYW4gMTMgY2hhcmFjdGVycywgb3IgbGVzcyB0aGFuIDE0IGlmIGxhc3QgY2hhcmFjdGVyIGlzIGJldHdlZW4gMS01IG9yIGEtaiwgYW5kIG9ubHkgY29udGFpbiB0aGUgZm9sbG93aW5nIHN5bWJvbHMgLjEyMzQ1YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXonKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICB9XG4gICAgICAgIHZhciBjaGFyVG9TeW1ib2wgPSBmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgaWYgKGMgPj0gJ2EnLmNoYXJDb2RlQXQoMCkgJiYgYyA8PSAneicuY2hhckNvZGVBdCgwKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoYyAtICdhJy5jaGFyQ29kZUF0KDApKSArIDY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYyA+PSAnMScuY2hhckNvZGVBdCgwKSAmJiBjIDw9ICc1Jy5jaGFyQ29kZUF0KDApKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChjIC0gJzEnLmNoYXJDb2RlQXQoMCkpICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgYSA9IG5ldyBVaW50OEFycmF5KDgpO1xuICAgICAgICB2YXIgYml0ID0gNjM7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdmFyIGMgPSBjaGFyVG9TeW1ib2wocy5jaGFyQ29kZUF0KGkpKTtcbiAgICAgICAgICAgIGlmIChiaXQgPCA1KSB7XG4gICAgICAgICAgICAgICAgYyA9IGMgPDwgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAodmFyIGogPSA0OyBqID49IDA7IC0taikge1xuICAgICAgICAgICAgICAgIGlmIChiaXQgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICBhW01hdGguZmxvb3IoYml0IC8gOCldIHw9ICgoYyA+PiBqKSAmIDEpIDw8IChiaXQgJSA4KTtcbiAgICAgICAgICAgICAgICAgICAgLS1iaXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucHVzaEFycmF5KGEpO1xuICAgIH07XG4gICAgLyoqIEdldCBhIGBuYW1lYCAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUuZ2V0TmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGEgPSB0aGlzLmdldFVpbnQ4QXJyYXkoOCk7XG4gICAgICAgIHZhciByZXN1bHQgPSAnJztcbiAgICAgICAgZm9yICh2YXIgYml0ID0gNjM7IGJpdCA+PSAwOykge1xuICAgICAgICAgICAgdmFyIGMgPSAwO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA1OyArK2kpIHtcbiAgICAgICAgICAgICAgICBpZiAoYml0ID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYyA9IChjIDw8IDEpIHwgKChhW01hdGguZmxvb3IoYml0IC8gOCldID4+IChiaXQgJSA4KSkgJiAxKTtcbiAgICAgICAgICAgICAgICAgICAgLS1iaXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGMgPj0gNikge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGMgKyAnYScuY2hhckNvZGVBdCgwKSAtIDYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYyA+PSAxKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYyArICcxJy5jaGFyQ29kZUF0KDApIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gJy4nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChyZXN1bHQuZW5kc1dpdGgoJy4nKSkge1xuICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnN1YnN0cigwLCByZXN1bHQubGVuZ3RoIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIC8qKiBBcHBlbmQgbGVuZ3RoLXByZWZpeGVkIGJpbmFyeSBkYXRhICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5wdXNoQnl0ZXMgPSBmdW5jdGlvbiAodikge1xuICAgICAgICB0aGlzLnB1c2hWYXJ1aW50MzIodi5sZW5ndGgpO1xuICAgICAgICB0aGlzLnB1c2hBcnJheSh2KTtcbiAgICB9O1xuICAgIC8qKiBHZXQgbGVuZ3RoLXByZWZpeGVkIGJpbmFyeSBkYXRhICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5nZXRCeXRlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VWludDhBcnJheSh0aGlzLmdldFZhcnVpbnQzMigpKTtcbiAgICB9O1xuICAgIC8qKiBBcHBlbmQgYSBzdHJpbmcgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLnB1c2hTdHJpbmcgPSBmdW5jdGlvbiAodikge1xuICAgICAgICB0aGlzLnB1c2hCeXRlcyh0aGlzLnRleHRFbmNvZGVyLmVuY29kZSh2KSk7XG4gICAgfTtcbiAgICAvKiogR2V0IGEgc3RyaW5nICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5nZXRTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRleHREZWNvZGVyLmRlY29kZSh0aGlzLmdldEJ5dGVzKCkpO1xuICAgIH07XG4gICAgLyoqIEFwcGVuZCBhIGBzeW1ib2xfY29kZWAuIFVubGlrZSBgc3ltYm9sYCwgYHN5bWJvbF9jb2RlYCBkb2Vzbid0IGluY2x1ZGUgYSBwcmVjaXNpb24uICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5wdXNoU3ltYm9sQ29kZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgc3RyaW5nIGNvbnRhaW5pbmcgc3ltYm9sX2NvZGUnKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYSA9IFtdO1xuICAgICAgICBhLnB1c2guYXBwbHkoYSwgX19zcHJlYWQodGhpcy50ZXh0RW5jb2Rlci5lbmNvZGUobmFtZSkpKTtcbiAgICAgICAgd2hpbGUgKGEubGVuZ3RoIDwgOCkge1xuICAgICAgICAgICAgYS5wdXNoKDApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHVzaEFycmF5KGEuc2xpY2UoMCwgOCkpO1xuICAgIH07XG4gICAgLyoqIEdldCBhIGBzeW1ib2xfY29kZWAuIFVubGlrZSBgc3ltYm9sYCwgYHN5bWJvbF9jb2RlYCBkb2Vzbid0IGluY2x1ZGUgYSBwcmVjaXNpb24uICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5nZXRTeW1ib2xDb2RlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYSA9IHRoaXMuZ2V0VWludDhBcnJheSg4KTtcbiAgICAgICAgdmFyIGxlbjtcbiAgICAgICAgZm9yIChsZW4gPSAwOyBsZW4gPCBhLmxlbmd0aDsgKytsZW4pIHtcbiAgICAgICAgICAgIGlmICghYVtsZW5dKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLnRleHREZWNvZGVyLmRlY29kZShuZXcgVWludDhBcnJheShhLmJ1ZmZlciwgYS5ieXRlT2Zmc2V0LCBsZW4pKTtcbiAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgfTtcbiAgICAvKiogQXBwZW5kIGEgYHN5bWJvbGAgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLnB1c2hTeW1ib2wgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdmFyIG5hbWUgPSBfYS5uYW1lLCBwcmVjaXNpb24gPSBfYS5wcmVjaXNpb247XG4gICAgICAgIGlmICghL15bQS1aXXsxLDd9JC8udGVzdChuYW1lKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBzeW1ib2wgdG8gYmUgQS1aIGFuZCBiZXR3ZWVuIG9uZSBhbmQgc2V2ZW4gY2hhcmFjdGVycycpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhID0gW3ByZWNpc2lvbiAmIDB4ZmZdO1xuICAgICAgICBhLnB1c2guYXBwbHkoYSwgX19zcHJlYWQodGhpcy50ZXh0RW5jb2Rlci5lbmNvZGUobmFtZSkpKTtcbiAgICAgICAgd2hpbGUgKGEubGVuZ3RoIDwgOCkge1xuICAgICAgICAgICAgYS5wdXNoKDApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHVzaEFycmF5KGEuc2xpY2UoMCwgOCkpO1xuICAgIH07XG4gICAgLyoqIEdldCBhIGBzeW1ib2xgICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5nZXRTeW1ib2wgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwcmVjaXNpb24gPSB0aGlzLmdldCgpO1xuICAgICAgICB2YXIgYSA9IHRoaXMuZ2V0VWludDhBcnJheSg3KTtcbiAgICAgICAgdmFyIGxlbjtcbiAgICAgICAgZm9yIChsZW4gPSAwOyBsZW4gPCBhLmxlbmd0aDsgKytsZW4pIHtcbiAgICAgICAgICAgIGlmICghYVtsZW5dKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLnRleHREZWNvZGVyLmRlY29kZShuZXcgVWludDhBcnJheShhLmJ1ZmZlciwgYS5ieXRlT2Zmc2V0LCBsZW4pKTtcbiAgICAgICAgcmV0dXJuIHsgbmFtZTogbmFtZSwgcHJlY2lzaW9uOiBwcmVjaXNpb24gfTtcbiAgICB9O1xuICAgIC8qKiBBcHBlbmQgYW4gYXNzZXQgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLnB1c2hBc3NldCA9IGZ1bmN0aW9uIChzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcyAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgc3RyaW5nIGNvbnRhaW5pbmcgYXNzZXQnKTtcbiAgICAgICAgfVxuICAgICAgICBzID0gcy50cmltKCk7XG4gICAgICAgIHZhciBwb3MgPSAwO1xuICAgICAgICB2YXIgYW1vdW50ID0gJyc7XG4gICAgICAgIHZhciBwcmVjaXNpb24gPSAwO1xuICAgICAgICBpZiAoc1twb3NdID09PSAnLScpIHtcbiAgICAgICAgICAgIGFtb3VudCArPSAnLSc7XG4gICAgICAgICAgICArK3BvcztcbiAgICAgICAgfVxuICAgICAgICB2YXIgZm91bmREaWdpdCA9IGZhbHNlO1xuICAgICAgICB3aGlsZSAocG9zIDwgcy5sZW5ndGggJiYgcy5jaGFyQ29kZUF0KHBvcykgPj0gJzAnLmNoYXJDb2RlQXQoMCkgJiYgcy5jaGFyQ29kZUF0KHBvcykgPD0gJzknLmNoYXJDb2RlQXQoMCkpIHtcbiAgICAgICAgICAgIGZvdW5kRGlnaXQgPSB0cnVlO1xuICAgICAgICAgICAgYW1vdW50ICs9IHNbcG9zXTtcbiAgICAgICAgICAgICsrcG9zO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZm91bmREaWdpdCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBc3NldCBtdXN0IGJlZ2luIHdpdGggYSBudW1iZXInKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc1twb3NdID09PSAnLicpIHtcbiAgICAgICAgICAgICsrcG9zO1xuICAgICAgICAgICAgd2hpbGUgKHBvcyA8IHMubGVuZ3RoICYmIHMuY2hhckNvZGVBdChwb3MpID49ICcwJy5jaGFyQ29kZUF0KDApICYmIHMuY2hhckNvZGVBdChwb3MpIDw9ICc5Jy5jaGFyQ29kZUF0KDApKSB7XG4gICAgICAgICAgICAgICAgYW1vdW50ICs9IHNbcG9zXTtcbiAgICAgICAgICAgICAgICArK3ByZWNpc2lvbjtcbiAgICAgICAgICAgICAgICArK3BvcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgbmFtZSA9IHMuc3Vic3RyKHBvcykudHJpbSgpO1xuICAgICAgICB0aGlzLnB1c2hBcnJheShudW1lcmljLnNpZ25lZERlY2ltYWxUb0JpbmFyeSg4LCBhbW91bnQpKTtcbiAgICAgICAgdGhpcy5wdXNoU3ltYm9sKHsgbmFtZTogbmFtZSwgcHJlY2lzaW9uOiBwcmVjaXNpb24gfSk7XG4gICAgfTtcbiAgICAvKiogR2V0IGFuIGFzc2V0ICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5nZXRBc3NldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFtb3VudCA9IHRoaXMuZ2V0VWludDhBcnJheSg4KTtcbiAgICAgICAgdmFyIF9hID0gdGhpcy5nZXRTeW1ib2woKSwgbmFtZSA9IF9hLm5hbWUsIHByZWNpc2lvbiA9IF9hLnByZWNpc2lvbjtcbiAgICAgICAgdmFyIHMgPSBudW1lcmljLnNpZ25lZEJpbmFyeVRvRGVjaW1hbChhbW91bnQsIHByZWNpc2lvbiArIDEpO1xuICAgICAgICBpZiAocHJlY2lzaW9uKSB7XG4gICAgICAgICAgICBzID0gcy5zdWJzdHIoMCwgcy5sZW5ndGggLSBwcmVjaXNpb24pICsgJy4nICsgcy5zdWJzdHIocy5sZW5ndGggLSBwcmVjaXNpb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzICsgJyAnICsgbmFtZTtcbiAgICB9O1xuICAgIC8qKiBBcHBlbmQgYSBwdWJsaWMga2V5ICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5wdXNoUHVibGljS2V5ID0gZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgdmFyIGtleSA9IG51bWVyaWMuc3RyaW5nVG9QdWJsaWNLZXkocyk7XG4gICAgICAgIHRoaXMucHVzaChrZXkudHlwZSk7XG4gICAgICAgIHRoaXMucHVzaEFycmF5KGtleS5kYXRhKTtcbiAgICB9O1xuICAgIC8qKiBHZXQgYSBwdWJsaWMga2V5ICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5nZXRQdWJsaWNLZXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0eXBlID0gdGhpcy5nZXQoKTtcbiAgICAgICAgdmFyIGRhdGE7XG4gICAgICAgIGlmICh0eXBlID09PSBudW1lcmljLktleVR5cGUud2EpIHtcbiAgICAgICAgICAgIHZhciBiZWdpbiA9IHRoaXMucmVhZFBvcztcbiAgICAgICAgICAgIHRoaXMuc2tpcCgzNCk7XG4gICAgICAgICAgICB0aGlzLnNraXAodGhpcy5nZXRWYXJ1aW50MzIoKSk7XG4gICAgICAgICAgICBkYXRhID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5hcnJheS5idWZmZXIsIHRoaXMuYXJyYXkuYnl0ZU9mZnNldCArIGJlZ2luLCB0aGlzLnJlYWRQb3MgLSBiZWdpbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkYXRhID0gdGhpcy5nZXRVaW50OEFycmF5KG51bWVyaWMucHVibGljS2V5RGF0YVNpemUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudW1lcmljLnB1YmxpY0tleVRvU3RyaW5nKHsgdHlwZTogdHlwZSwgZGF0YTogZGF0YSB9KTtcbiAgICB9O1xuICAgIC8qKiBBcHBlbmQgYSBwcml2YXRlIGtleSAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUucHVzaFByaXZhdGVLZXkgPSBmdW5jdGlvbiAocykge1xuICAgICAgICB2YXIga2V5ID0gbnVtZXJpYy5zdHJpbmdUb1ByaXZhdGVLZXkocyk7XG4gICAgICAgIHRoaXMucHVzaChrZXkudHlwZSk7XG4gICAgICAgIHRoaXMucHVzaEFycmF5KGtleS5kYXRhKTtcbiAgICB9O1xuICAgIC8qKiBHZXQgYSBwcml2YXRlIGtleSAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUuZ2V0UHJpdmF0ZUtleSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHR5cGUgPSB0aGlzLmdldCgpO1xuICAgICAgICB2YXIgZGF0YSA9IHRoaXMuZ2V0VWludDhBcnJheShudW1lcmljLnByaXZhdGVLZXlEYXRhU2l6ZSk7XG4gICAgICAgIHJldHVybiBudW1lcmljLnByaXZhdGVLZXlUb1N0cmluZyh7IHR5cGU6IHR5cGUsIGRhdGE6IGRhdGEgfSk7XG4gICAgfTtcbiAgICAvKiogQXBwZW5kIGEgc2lnbmF0dXJlICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5wdXNoU2lnbmF0dXJlID0gZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgdmFyIGtleSA9IG51bWVyaWMuc3RyaW5nVG9TaWduYXR1cmUocyk7XG4gICAgICAgIHRoaXMucHVzaChrZXkudHlwZSk7XG4gICAgICAgIHRoaXMucHVzaEFycmF5KGtleS5kYXRhKTtcbiAgICB9O1xuICAgIC8qKiBHZXQgYSBzaWduYXR1cmUgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLmdldFNpZ25hdHVyZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHR5cGUgPSB0aGlzLmdldCgpO1xuICAgICAgICB2YXIgZGF0YTtcbiAgICAgICAgaWYgKHR5cGUgPT09IG51bWVyaWMuS2V5VHlwZS53YSkge1xuICAgICAgICAgICAgdmFyIGJlZ2luID0gdGhpcy5yZWFkUG9zO1xuICAgICAgICAgICAgdGhpcy5za2lwKDY1KTtcbiAgICAgICAgICAgIHRoaXMuc2tpcCh0aGlzLmdldFZhcnVpbnQzMigpKTtcbiAgICAgICAgICAgIHRoaXMuc2tpcCh0aGlzLmdldFZhcnVpbnQzMigpKTtcbiAgICAgICAgICAgIGRhdGEgPSBuZXcgVWludDhBcnJheSh0aGlzLmFycmF5LmJ1ZmZlciwgdGhpcy5hcnJheS5ieXRlT2Zmc2V0ICsgYmVnaW4sIHRoaXMucmVhZFBvcyAtIGJlZ2luKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmdldFVpbnQ4QXJyYXkobnVtZXJpYy5zaWduYXR1cmVEYXRhU2l6ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bWVyaWMuc2lnbmF0dXJlVG9TdHJpbmcoeyB0eXBlOiB0eXBlLCBkYXRhOiBkYXRhIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIFNlcmlhbEJ1ZmZlcjtcbn0oKSk7IC8vIFNlcmlhbEJ1ZmZlclxuZXhwb3J0cy5TZXJpYWxCdWZmZXIgPSBTZXJpYWxCdWZmZXI7XG4vKiogSXMgdGhpcyBhIHN1cHBvcnRlZCBBQkkgdmVyc2lvbj8gKi9cbmV4cG9ydHMuc3VwcG9ydGVkQWJpVmVyc2lvbiA9IGZ1bmN0aW9uICh2ZXJzaW9uKSB7XG4gICAgcmV0dXJuIHZlcnNpb24uc3RhcnRzV2l0aCgnZW9zaW86OmFiaS8xLicpO1xufTtcbnZhciBjaGVja0RhdGVQYXJzZSA9IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgdmFyIHJlc3VsdCA9IERhdGUucGFyc2UoZGF0ZSk7XG4gICAgaWYgKE51bWJlci5pc05hTihyZXN1bHQpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB0aW1lIGZvcm1hdCcpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbi8qKiBDb252ZXJ0IGRhdGUgaW4gSVNPIGZvcm1hdCB0byBgdGltZV9wb2ludGAgKG1pbGlzZWNvbmRzIHNpbmNlIGVwb2NoKSAqL1xuZXhwb3J0cy5kYXRlVG9UaW1lUG9pbnQgPSBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKGNoZWNrRGF0ZVBhcnNlKGRhdGUgKyAnWicpICogMTAwMCk7XG59O1xuLyoqIENvbnZlcnQgYHRpbWVfcG9pbnRgIChtaWxpc2Vjb25kcyBzaW5jZSBlcG9jaCkgdG8gZGF0ZSBpbiBJU08gZm9ybWF0ICovXG5leHBvcnRzLnRpbWVQb2ludFRvRGF0ZSA9IGZ1bmN0aW9uICh1cykge1xuICAgIHZhciBzID0gKG5ldyBEYXRlKHVzIC8gMTAwMCkpLnRvSVNPU3RyaW5nKCk7XG4gICAgcmV0dXJuIHMuc3Vic3RyKDAsIHMubGVuZ3RoIC0gMSk7XG59O1xuLyoqIENvbnZlcnQgZGF0ZSBpbiBJU08gZm9ybWF0IHRvIGB0aW1lX3BvaW50X3NlY2AgKHNlY29uZHMgc2luY2UgZXBvY2gpICovXG5leHBvcnRzLmRhdGVUb1RpbWVQb2ludFNlYyA9IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQoY2hlY2tEYXRlUGFyc2UoZGF0ZSArICdaJykgLyAxMDAwKTtcbn07XG4vKiogQ29udmVydCBgdGltZV9wb2ludF9zZWNgIChzZWNvbmRzIHNpbmNlIGVwb2NoKSB0byB0byBkYXRlIGluIElTTyBmb3JtYXQgKi9cbmV4cG9ydHMudGltZVBvaW50U2VjVG9EYXRlID0gZnVuY3Rpb24gKHNlYykge1xuICAgIHZhciBzID0gKG5ldyBEYXRlKHNlYyAqIDEwMDApKS50b0lTT1N0cmluZygpO1xuICAgIHJldHVybiBzLnN1YnN0cigwLCBzLmxlbmd0aCAtIDEpO1xufTtcbi8qKiBDb252ZXJ0IGRhdGUgaW4gSVNPIGZvcm1hdCB0byBgYmxvY2tfdGltZXN0YW1wX3R5cGVgIChoYWxmLXNlY29uZHMgc2luY2UgYSBkaWZmZXJlbnQgZXBvY2gpICovXG5leHBvcnRzLmRhdGVUb0Jsb2NrVGltZXN0YW1wID0gZnVuY3Rpb24gKGRhdGUpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCgoY2hlY2tEYXRlUGFyc2UoZGF0ZSArICdaJykgLSA5NDY2ODQ4MDAwMDApIC8gNTAwKTtcbn07XG4vKiogQ29udmVydCBgYmxvY2tfdGltZXN0YW1wX3R5cGVgIChoYWxmLXNlY29uZHMgc2luY2UgYSBkaWZmZXJlbnQgZXBvY2gpIHRvIHRvIGRhdGUgaW4gSVNPIGZvcm1hdCAqL1xuZXhwb3J0cy5ibG9ja1RpbWVzdGFtcFRvRGF0ZSA9IGZ1bmN0aW9uIChzbG90KSB7XG4gICAgdmFyIHMgPSAobmV3IERhdGUoc2xvdCAqIDUwMCArIDk0NjY4NDgwMDAwMCkpLnRvSVNPU3RyaW5nKCk7XG4gICAgcmV0dXJuIHMuc3Vic3RyKDAsIHMubGVuZ3RoIC0gMSk7XG59O1xuLyoqIENvbnZlcnQgYHN0cmluZ2AgdG8gYFN5bWJvbGAuIGZvcm1hdDogYHByZWNpc2lvbixOQU1FYC4gKi9cbmV4cG9ydHMuc3RyaW5nVG9TeW1ib2wgPSBmdW5jdGlvbiAocykge1xuICAgIGlmICh0eXBlb2YgcyAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBzdHJpbmcgY29udGFpbmluZyBzeW1ib2wnKTtcbiAgICB9XG4gICAgdmFyIG0gPSBzLm1hdGNoKC9eKFswLTldKyksKFtBLVpdKykkLyk7XG4gICAgaWYgKCFtKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzeW1ib2wnKTtcbiAgICB9XG4gICAgcmV0dXJuIHsgbmFtZTogbVsyXSwgcHJlY2lzaW9uOiArbVsxXSB9O1xufTtcbi8qKiBDb252ZXJ0IGBTeW1ib2xgIHRvIGBzdHJpbmdgLiBmb3JtYXQ6IGBwcmVjaXNpb24sTkFNRWAuICovXG5leHBvcnRzLnN5bWJvbFRvU3RyaW5nID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgdmFyIG5hbWUgPSBfYS5uYW1lLCBwcmVjaXNpb24gPSBfYS5wcmVjaXNpb247XG4gICAgcmV0dXJuIHByZWNpc2lvbiArICcsJyArIG5hbWU7XG59O1xuLyoqIENvbnZlcnQgYmluYXJ5IGRhdGEgdG8gaGV4ICovXG5leHBvcnRzLmFycmF5VG9IZXggPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHZhciBlXzEsIF9hO1xuICAgIHZhciByZXN1bHQgPSAnJztcbiAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBkYXRhXzEgPSBfX3ZhbHVlcyhkYXRhKSwgZGF0YV8xXzEgPSBkYXRhXzEubmV4dCgpOyAhZGF0YV8xXzEuZG9uZTsgZGF0YV8xXzEgPSBkYXRhXzEubmV4dCgpKSB7XG4gICAgICAgICAgICB2YXIgeCA9IGRhdGFfMV8xLnZhbHVlO1xuICAgICAgICAgICAgcmVzdWx0ICs9ICgnMDAnICsgeC50b1N0cmluZygxNikpLnNsaWNlKC0yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKGRhdGFfMV8xICYmICFkYXRhXzFfMS5kb25lICYmIChfYSA9IGRhdGFfMS5yZXR1cm4pKSBfYS5jYWxsKGRhdGFfMSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0LnRvVXBwZXJDYXNlKCk7XG59O1xuLyoqIENvbnZlcnQgaGV4IHRvIGJpbmFyeSBkYXRhICovXG5leHBvcnRzLmhleFRvVWludDhBcnJheSA9IGZ1bmN0aW9uIChoZXgpIHtcbiAgICBpZiAodHlwZW9mIGhleCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBzdHJpbmcgY29udGFpbmluZyBoZXggZGlnaXRzJyk7XG4gICAgfVxuICAgIGlmIChoZXgubGVuZ3RoICUgMikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ09kZCBudW1iZXIgb2YgaGV4IGRpZ2l0cycpO1xuICAgIH1cbiAgICB2YXIgbCA9IGhleC5sZW5ndGggLyAyO1xuICAgIHZhciByZXN1bHQgPSBuZXcgVWludDhBcnJheShsKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGw7ICsraSkge1xuICAgICAgICB2YXIgeCA9IHBhcnNlSW50KGhleC5zdWJzdHIoaSAqIDIsIDIpLCAxNik7XG4gICAgICAgIGlmIChOdW1iZXIuaXNOYU4oeCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgaGV4IHN0cmluZycpO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdFtpXSA9IHg7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuZnVuY3Rpb24gc2VyaWFsaXplVW5rbm93bihidWZmZXIsIGRhdGEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0RvblxcJ3Qga25vdyBob3cgdG8gc2VyaWFsaXplICcgKyB0aGlzLm5hbWUpO1xufVxuZnVuY3Rpb24gZGVzZXJpYWxpemVVbmtub3duKGJ1ZmZlcikge1xuICAgIHRocm93IG5ldyBFcnJvcignRG9uXFwndCBrbm93IGhvdyB0byBkZXNlcmlhbGl6ZSAnICsgdGhpcy5uYW1lKTtcbn1cbmZ1bmN0aW9uIHNlcmlhbGl6ZVN0cnVjdChidWZmZXIsIGRhdGEsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpIHtcbiAgICB2YXIgZV8yLCBfYTtcbiAgICBpZiAoc3RhdGUgPT09IHZvaWQgMCkgeyBzdGF0ZSA9IG5ldyBTZXJpYWxpemVyU3RhdGUoKTsgfVxuICAgIGlmIChhbGxvd0V4dGVuc2lvbnMgPT09IHZvaWQgMCkgeyBhbGxvd0V4dGVuc2lvbnMgPSB0cnVlOyB9XG4gICAgaWYgKHR5cGVvZiBkYXRhICE9PSAnb2JqZWN0Jykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2V4cGVjdGVkIG9iamVjdCBjb250YWluaW5nIGRhdGE6ICcgKyBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmJhc2UpIHtcbiAgICAgICAgdGhpcy5iYXNlLnNlcmlhbGl6ZShidWZmZXIsIGRhdGEsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfYiA9IF9fdmFsdWVzKHRoaXMuZmllbGRzKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgdmFyIGZpZWxkID0gX2MudmFsdWU7XG4gICAgICAgICAgICBpZiAoZmllbGQubmFtZSBpbiBkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlLnNraXBwZWRCaW5hcnlFeHRlbnNpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmV4cGVjdGVkICcgKyB0aGlzLm5hbWUgKyAnLicgKyBmaWVsZC5uYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmllbGQudHlwZS5zZXJpYWxpemUoYnVmZmVyLCBkYXRhW2ZpZWxkLm5hbWVdLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zICYmIGZpZWxkID09PSB0aGlzLmZpZWxkc1t0aGlzLmZpZWxkcy5sZW5ndGggLSAxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoYWxsb3dFeHRlbnNpb25zICYmIGZpZWxkLnR5cGUuZXh0ZW5zaW9uT2YpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuc2tpcHBlZEJpbmFyeUV4dGVuc2lvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgJyArIHRoaXMubmFtZSArICcuJyArIGZpZWxkLm5hbWUgKyAnICh0eXBlPScgKyBmaWVsZC50eXBlLm5hbWUgKyAnKScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZV8yXzEpIHsgZV8yID0geyBlcnJvcjogZV8yXzEgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKF9jICYmICFfYy5kb25lICYmIChfYSA9IF9iLnJldHVybikpIF9hLmNhbGwoX2IpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZV8yKSB0aHJvdyBlXzIuZXJyb3I7IH1cbiAgICB9XG59XG5mdW5jdGlvbiBkZXNlcmlhbGl6ZVN0cnVjdChidWZmZXIsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpIHtcbiAgICB2YXIgZV8zLCBfYTtcbiAgICBpZiAoc3RhdGUgPT09IHZvaWQgMCkgeyBzdGF0ZSA9IG5ldyBTZXJpYWxpemVyU3RhdGUoKTsgfVxuICAgIGlmIChhbGxvd0V4dGVuc2lvbnMgPT09IHZvaWQgMCkgeyBhbGxvd0V4dGVuc2lvbnMgPSB0cnVlOyB9XG4gICAgdmFyIHJlc3VsdDtcbiAgICBpZiAodGhpcy5iYXNlKSB7XG4gICAgICAgIHJlc3VsdCA9IHRoaXMuYmFzZS5kZXNlcmlhbGl6ZShidWZmZXIsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0ge307XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9iID0gX192YWx1ZXModGhpcy5maWVsZHMpLCBfYyA9IF9iLm5leHQoKTsgIV9jLmRvbmU7IF9jID0gX2IubmV4dCgpKSB7XG4gICAgICAgICAgICB2YXIgZmllbGQgPSBfYy52YWx1ZTtcbiAgICAgICAgICAgIGlmIChhbGxvd0V4dGVuc2lvbnMgJiYgZmllbGQudHlwZS5leHRlbnNpb25PZiAmJiAhYnVmZmVyLmhhdmVSZWFkRGF0YSgpKSB7XG4gICAgICAgICAgICAgICAgc3RhdGUuc2tpcHBlZEJpbmFyeUV4dGVuc2lvbiA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHRbZmllbGQubmFtZV0gPSBmaWVsZC50eXBlLmRlc2VyaWFsaXplKGJ1ZmZlciwgc3RhdGUsIGFsbG93RXh0ZW5zaW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVfM18xKSB7IGVfMyA9IHsgZXJyb3I6IGVfM18xIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChfYyAmJiAhX2MuZG9uZSAmJiAoX2EgPSBfYi5yZXR1cm4pKSBfYS5jYWxsKF9iKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMykgdGhyb3cgZV8zLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBzZXJpYWxpemVWYXJpYW50KGJ1ZmZlciwgZGF0YSwgc3RhdGUsIGFsbG93RXh0ZW5zaW9ucykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShkYXRhKSB8fCBkYXRhLmxlbmd0aCAhPT0gMiB8fCB0eXBlb2YgZGF0YVswXSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdleHBlY3RlZCB2YXJpYW50OiBbXCJ0eXBlXCIsIHZhbHVlXScpO1xuICAgIH1cbiAgICB2YXIgaSA9IHRoaXMuZmllbGRzLmZpbmRJbmRleChmdW5jdGlvbiAoZmllbGQpIHsgcmV0dXJuIGZpZWxkLm5hbWUgPT09IGRhdGFbMF07IH0pO1xuICAgIGlmIChpIDwgMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0eXBlIFxcXCJcIiArIGRhdGFbMF0gKyBcIlxcXCIgaXMgbm90IHZhbGlkIGZvciB2YXJpYW50XCIpO1xuICAgIH1cbiAgICBidWZmZXIucHVzaFZhcnVpbnQzMihpKTtcbiAgICB0aGlzLmZpZWxkc1tpXS50eXBlLnNlcmlhbGl6ZShidWZmZXIsIGRhdGFbMV0sIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpO1xufVxuZnVuY3Rpb24gZGVzZXJpYWxpemVWYXJpYW50KGJ1ZmZlciwgc3RhdGUsIGFsbG93RXh0ZW5zaW9ucykge1xuICAgIHZhciBpID0gYnVmZmVyLmdldFZhcnVpbnQzMigpO1xuICAgIGlmIChpID49IHRoaXMuZmllbGRzLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0eXBlIGluZGV4IFwiICsgaSArIFwiIGlzIG5vdCB2YWxpZCBmb3IgdmFyaWFudFwiKTtcbiAgICB9XG4gICAgdmFyIGZpZWxkID0gdGhpcy5maWVsZHNbaV07XG4gICAgcmV0dXJuIFtmaWVsZC5uYW1lLCBmaWVsZC50eXBlLmRlc2VyaWFsaXplKGJ1ZmZlciwgc3RhdGUsIGFsbG93RXh0ZW5zaW9ucyldO1xufVxuZnVuY3Rpb24gc2VyaWFsaXplQXJyYXkoYnVmZmVyLCBkYXRhLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKSB7XG4gICAgdmFyIGVfNCwgX2E7XG4gICAgYnVmZmVyLnB1c2hWYXJ1aW50MzIoZGF0YS5sZW5ndGgpO1xuICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIGRhdGFfMiA9IF9fdmFsdWVzKGRhdGEpLCBkYXRhXzJfMSA9IGRhdGFfMi5uZXh0KCk7ICFkYXRhXzJfMS5kb25lOyBkYXRhXzJfMSA9IGRhdGFfMi5uZXh0KCkpIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0gZGF0YV8yXzEudmFsdWU7XG4gICAgICAgICAgICB0aGlzLmFycmF5T2Yuc2VyaWFsaXplKGJ1ZmZlciwgaXRlbSwgc3RhdGUsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZV80XzEpIHsgZV80ID0geyBlcnJvcjogZV80XzEgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKGRhdGFfMl8xICYmICFkYXRhXzJfMS5kb25lICYmIChfYSA9IGRhdGFfMi5yZXR1cm4pKSBfYS5jYWxsKGRhdGFfMik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlXzQpIHRocm93IGVfNC5lcnJvcjsgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGRlc2VyaWFsaXplQXJyYXkoYnVmZmVyLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKSB7XG4gICAgdmFyIGxlbiA9IGJ1ZmZlci5nZXRWYXJ1aW50MzIoKTtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgICByZXN1bHQucHVzaCh0aGlzLmFycmF5T2YuZGVzZXJpYWxpemUoYnVmZmVyLCBzdGF0ZSwgZmFsc2UpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIHNlcmlhbGl6ZU9wdGlvbmFsKGJ1ZmZlciwgZGF0YSwgc3RhdGUsIGFsbG93RXh0ZW5zaW9ucykge1xuICAgIGlmIChkYXRhID09PSBudWxsIHx8IGRhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBidWZmZXIucHVzaCgwKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGJ1ZmZlci5wdXNoKDEpO1xuICAgICAgICB0aGlzLm9wdGlvbmFsT2Yuc2VyaWFsaXplKGJ1ZmZlciwgZGF0YSwgc3RhdGUsIGFsbG93RXh0ZW5zaW9ucyk7XG4gICAgfVxufVxuZnVuY3Rpb24gZGVzZXJpYWxpemVPcHRpb25hbChidWZmZXIsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpIHtcbiAgICBpZiAoYnVmZmVyLmdldCgpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbmFsT2YuZGVzZXJpYWxpemUoYnVmZmVyLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNlcmlhbGl6ZUV4dGVuc2lvbihidWZmZXIsIGRhdGEsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpIHtcbiAgICB0aGlzLmV4dGVuc2lvbk9mLnNlcmlhbGl6ZShidWZmZXIsIGRhdGEsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpO1xufVxuZnVuY3Rpb24gZGVzZXJpYWxpemVFeHRlbnNpb24oYnVmZmVyLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuZXh0ZW5zaW9uT2YuZGVzZXJpYWxpemUoYnVmZmVyLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKTtcbn1cbnZhciBjcmVhdGVUeXBlID0gZnVuY3Rpb24gKGF0dHJzKSB7XG4gICAgcmV0dXJuIF9fYXNzaWduKHsgbmFtZTogJzxtaXNzaW5nIG5hbWU+JywgYWxpYXNPZk5hbWU6ICcnLCBhcnJheU9mOiBudWxsLCBvcHRpb25hbE9mOiBudWxsLCBleHRlbnNpb25PZjogbnVsbCwgYmFzZU5hbWU6ICcnLCBiYXNlOiBudWxsLCBmaWVsZHM6IFtdLCBzZXJpYWxpemU6IHNlcmlhbGl6ZVVua25vd24sIGRlc2VyaWFsaXplOiBkZXNlcmlhbGl6ZVVua25vd24gfSwgYXR0cnMpO1xufTtcbnZhciBjaGVja1JhbmdlID0gZnVuY3Rpb24gKG9yaWcsIGNvbnZlcnRlZCkge1xuICAgIGlmIChOdW1iZXIuaXNOYU4oK29yaWcpIHx8IE51bWJlci5pc05hTigrY29udmVydGVkKSB8fCAodHlwZW9mIG9yaWcgIT09ICdudW1iZXInICYmIHR5cGVvZiBvcmlnICE9PSAnc3RyaW5nJykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBudW1iZXInKTtcbiAgICB9XG4gICAgaWYgKCtvcmlnICE9PSArY29udmVydGVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTnVtYmVyIGlzIG91dCBvZiByYW5nZScpO1xuICAgIH1cbiAgICByZXR1cm4gK29yaWc7XG59O1xuLyoqIENyZWF0ZSB0aGUgc2V0IG9mIHR5cGVzIGJ1aWx0LWluIHRvIHRoZSBhYmkgZm9ybWF0ICovXG5leHBvcnRzLmNyZWF0ZUluaXRpYWxUeXBlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzdWx0ID0gbmV3IE1hcChPYmplY3QuZW50cmllcyh7XG4gICAgICAgIGJvb2w6IGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ2Jvb2wnLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEodHlwZW9mIGRhdGEgPT09ICdib29sZWFuJyB8fCB0eXBlb2YgZGF0YSA9PT0gJ251bWJlcicgJiYgKGRhdGEgPT09IDEgfHwgZGF0YSA9PT0gMCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgYm9vbGVhbiBvciBudW1iZXIgZXF1YWwgdG8gMSBvciAwJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1ZmZlci5wdXNoKGRhdGEgPyAxIDogMCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuICEhYnVmZmVyLmdldCgpOyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgdWludDg6IGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ3VpbnQ4JyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaChjaGVja1JhbmdlKGRhdGEsIGRhdGEgJiAweGZmKSk7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldCgpOyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgaW50ODogY3JlYXRlVHlwZSh7XG4gICAgICAgICAgICBuYW1lOiAnaW50OCcsXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHsgYnVmZmVyLnB1c2goY2hlY2tSYW5nZShkYXRhLCBkYXRhIDw8IDI0ID4+IDI0KSk7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldCgpIDw8IDI0ID4+IDI0OyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgdWludDE2OiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICd1aW50MTYnLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoVWludDE2KGNoZWNrUmFuZ2UoZGF0YSwgZGF0YSAmIDB4ZmZmZikpOyB9LFxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXRVaW50MTYoKTsgfSxcbiAgICAgICAgfSksXG4gICAgICAgIGludDE2OiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICdpbnQxNicsXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHsgYnVmZmVyLnB1c2hVaW50MTYoY2hlY2tSYW5nZShkYXRhLCBkYXRhIDw8IDE2ID4+IDE2KSk7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldFVpbnQxNigpIDw8IDE2ID4+IDE2OyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgdWludDMyOiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICd1aW50MzInLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoVWludDMyKGNoZWNrUmFuZ2UoZGF0YSwgZGF0YSA+Pj4gMCkpOyB9LFxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXRVaW50MzIoKTsgfSxcbiAgICAgICAgfSksXG4gICAgICAgIHVpbnQ2NDogY3JlYXRlVHlwZSh7XG4gICAgICAgICAgICBuYW1lOiAndWludDY0JyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkge1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5wdXNoQXJyYXkobnVtZXJpYy5kZWNpbWFsVG9CaW5hcnkoOCwgJycgKyBkYXRhKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIG51bWVyaWMuYmluYXJ5VG9EZWNpbWFsKGJ1ZmZlci5nZXRVaW50OEFycmF5KDgpKTsgfSxcbiAgICAgICAgfSksXG4gICAgICAgIGludDY0OiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICdpbnQ2NCcsXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBidWZmZXIucHVzaEFycmF5KG51bWVyaWMuc2lnbmVkRGVjaW1hbFRvQmluYXJ5KDgsICcnICsgZGF0YSkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBudW1lcmljLnNpZ25lZEJpbmFyeVRvRGVjaW1hbChidWZmZXIuZ2V0VWludDhBcnJheSg4KSk7IH0sXG4gICAgICAgIH0pLFxuICAgICAgICBpbnQzMjogY3JlYXRlVHlwZSh7XG4gICAgICAgICAgICBuYW1lOiAnaW50MzInLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoVWludDMyKGNoZWNrUmFuZ2UoZGF0YSwgZGF0YSB8IDApKTsgfSxcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0VWludDMyKCkgfCAwOyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgdmFydWludDMyOiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICd2YXJ1aW50MzInLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoVmFydWludDMyKGNoZWNrUmFuZ2UoZGF0YSwgZGF0YSA+Pj4gMCkpOyB9LFxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXRWYXJ1aW50MzIoKTsgfSxcbiAgICAgICAgfSksXG4gICAgICAgIHZhcmludDMyOiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICd2YXJpbnQzMicsXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHsgYnVmZmVyLnB1c2hWYXJpbnQzMihjaGVja1JhbmdlKGRhdGEsIGRhdGEgfCAwKSk7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldFZhcmludDMyKCk7IH0sXG4gICAgICAgIH0pLFxuICAgICAgICB1aW50MTI4OiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICd1aW50MTI4JyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaEFycmF5KG51bWVyaWMuZGVjaW1hbFRvQmluYXJ5KDE2LCAnJyArIGRhdGEpKTsgfSxcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBudW1lcmljLmJpbmFyeVRvRGVjaW1hbChidWZmZXIuZ2V0VWludDhBcnJheSgxNikpOyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgaW50MTI4OiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICdpbnQxMjgnLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgYnVmZmVyLnB1c2hBcnJheShudW1lcmljLnNpZ25lZERlY2ltYWxUb0JpbmFyeSgxNiwgJycgKyBkYXRhKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIG51bWVyaWMuc2lnbmVkQmluYXJ5VG9EZWNpbWFsKGJ1ZmZlci5nZXRVaW50OEFycmF5KDE2KSk7IH0sXG4gICAgICAgIH0pLFxuICAgICAgICBmbG9hdDMyOiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICdmbG9hdDMyJyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaEZsb2F0MzIoZGF0YSk7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldEZsb2F0MzIoKTsgfSxcbiAgICAgICAgfSksXG4gICAgICAgIGZsb2F0NjQ6IGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ2Zsb2F0NjQnLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoRmxvYXQ2NChkYXRhKTsgfSxcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0RmxvYXQ2NCgpOyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgZmxvYXQxMjg6IGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ2Zsb2F0MTI4JyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaFVpbnQ4QXJyYXlDaGVja2VkKGV4cG9ydHMuaGV4VG9VaW50OEFycmF5KGRhdGEpLCAxNik7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gZXhwb3J0cy5hcnJheVRvSGV4KGJ1ZmZlci5nZXRVaW50OEFycmF5KDE2KSk7IH0sXG4gICAgICAgIH0pLFxuICAgICAgICBieXRlczogY3JlYXRlVHlwZSh7XG4gICAgICAgICAgICBuYW1lOiAnYnl0ZXMnLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBVaW50OEFycmF5IHx8IEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyLnB1c2hCeXRlcyhkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlci5wdXNoQnl0ZXMoZXhwb3J0cy5oZXhUb1VpbnQ4QXJyYXkoZGF0YSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUgJiYgc3RhdGUub3B0aW9ucy5ieXRlc0FzVWludDhBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYnVmZmVyLmdldEJ5dGVzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXhwb3J0cy5hcnJheVRvSGV4KGJ1ZmZlci5nZXRCeXRlcygpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgICAgc3RyaW5nOiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoU3RyaW5nKGRhdGEpOyB9LFxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXRTdHJpbmcoKTsgfSxcbiAgICAgICAgfSksXG4gICAgICAgIG5hbWU6IGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ25hbWUnLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoTmFtZShkYXRhKTsgfSxcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0TmFtZSgpOyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgdGltZV9wb2ludDogY3JlYXRlVHlwZSh7XG4gICAgICAgICAgICBuYW1lOiAndGltZV9wb2ludCcsXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHsgYnVmZmVyLnB1c2hOdW1iZXJBc1VpbnQ2NChleHBvcnRzLmRhdGVUb1RpbWVQb2ludChkYXRhKSk7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gZXhwb3J0cy50aW1lUG9pbnRUb0RhdGUoYnVmZmVyLmdldFVpbnQ2NEFzTnVtYmVyKCkpOyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgdGltZV9wb2ludF9zZWM6IGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ3RpbWVfcG9pbnRfc2VjJyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaFVpbnQzMihleHBvcnRzLmRhdGVUb1RpbWVQb2ludFNlYyhkYXRhKSk7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gZXhwb3J0cy50aW1lUG9pbnRTZWNUb0RhdGUoYnVmZmVyLmdldFVpbnQzMigpKTsgfSxcbiAgICAgICAgfSksXG4gICAgICAgIGJsb2NrX3RpbWVzdGFtcF90eXBlOiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICdibG9ja190aW1lc3RhbXBfdHlwZScsXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHsgYnVmZmVyLnB1c2hVaW50MzIoZXhwb3J0cy5kYXRlVG9CbG9ja1RpbWVzdGFtcChkYXRhKSk7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gZXhwb3J0cy5ibG9ja1RpbWVzdGFtcFRvRGF0ZShidWZmZXIuZ2V0VWludDMyKCkpOyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgc3ltYm9sX2NvZGU6IGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ3N5bWJvbF9jb2RlJyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaFN5bWJvbENvZGUoZGF0YSk7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldFN5bWJvbENvZGUoKTsgfSxcbiAgICAgICAgfSksXG4gICAgICAgIHN5bWJvbDogY3JlYXRlVHlwZSh7XG4gICAgICAgICAgICBuYW1lOiAnc3ltYm9sJyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaFN5bWJvbChleHBvcnRzLnN0cmluZ1RvU3ltYm9sKGRhdGEpKTsgfSxcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBleHBvcnRzLnN5bWJvbFRvU3RyaW5nKGJ1ZmZlci5nZXRTeW1ib2woKSk7IH0sXG4gICAgICAgIH0pLFxuICAgICAgICBhc3NldDogY3JlYXRlVHlwZSh7XG4gICAgICAgICAgICBuYW1lOiAnYXNzZXQnLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoQXNzZXQoZGF0YSk7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldEFzc2V0KCk7IH0sXG4gICAgICAgIH0pLFxuICAgICAgICBjaGVja3N1bTE2MDogY3JlYXRlVHlwZSh7XG4gICAgICAgICAgICBuYW1lOiAnY2hlY2tzdW0xNjAnLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoVWludDhBcnJheUNoZWNrZWQoZXhwb3J0cy5oZXhUb1VpbnQ4QXJyYXkoZGF0YSksIDIwKTsgfSxcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBleHBvcnRzLmFycmF5VG9IZXgoYnVmZmVyLmdldFVpbnQ4QXJyYXkoMjApKTsgfSxcbiAgICAgICAgfSksXG4gICAgICAgIGNoZWNrc3VtMjU2OiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICdjaGVja3N1bTI1NicsXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHsgYnVmZmVyLnB1c2hVaW50OEFycmF5Q2hlY2tlZChleHBvcnRzLmhleFRvVWludDhBcnJheShkYXRhKSwgMzIpOyB9LFxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIGV4cG9ydHMuYXJyYXlUb0hleChidWZmZXIuZ2V0VWludDhBcnJheSgzMikpOyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgY2hlY2tzdW01MTI6IGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ2NoZWNrc3VtNTEyJyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaFVpbnQ4QXJyYXlDaGVja2VkKGV4cG9ydHMuaGV4VG9VaW50OEFycmF5KGRhdGEpLCA2NCk7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gZXhwb3J0cy5hcnJheVRvSGV4KGJ1ZmZlci5nZXRVaW50OEFycmF5KDY0KSk7IH0sXG4gICAgICAgIH0pLFxuICAgICAgICBwdWJsaWNfa2V5OiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICdwdWJsaWNfa2V5JyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaFB1YmxpY0tleShkYXRhKTsgfSxcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0UHVibGljS2V5KCk7IH0sXG4gICAgICAgIH0pLFxuICAgICAgICBwcml2YXRlX2tleTogY3JlYXRlVHlwZSh7XG4gICAgICAgICAgICBuYW1lOiAncHJpdmF0ZV9rZXknLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoUHJpdmF0ZUtleShkYXRhKTsgfSxcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0UHJpdmF0ZUtleSgpOyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgc2lnbmF0dXJlOiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICdzaWduYXR1cmUnLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoU2lnbmF0dXJlKGRhdGEpOyB9LFxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXRTaWduYXR1cmUoKTsgfSxcbiAgICAgICAgfSksXG4gICAgfSkpO1xuICAgIHJlc3VsdC5zZXQoJ2V4dGVuZGVkX2Fzc2V0JywgY3JlYXRlVHlwZSh7XG4gICAgICAgIG5hbWU6ICdleHRlbmRlZF9hc3NldCcsXG4gICAgICAgIGJhc2VOYW1lOiAnJyxcbiAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7IG5hbWU6ICdxdWFudGl0eScsIHR5cGVOYW1lOiAnYXNzZXQnLCB0eXBlOiByZXN1bHQuZ2V0KCdhc3NldCcpIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdjb250cmFjdCcsIHR5cGVOYW1lOiAnbmFtZScsIHR5cGU6IHJlc3VsdC5nZXQoJ25hbWUnKSB9LFxuICAgICAgICBdLFxuICAgICAgICBzZXJpYWxpemU6IHNlcmlhbGl6ZVN0cnVjdCxcbiAgICAgICAgZGVzZXJpYWxpemU6IGRlc2VyaWFsaXplU3RydWN0LFxuICAgIH0pKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTsgLy8gY3JlYXRlSW5pdGlhbFR5cGVzKClcbi8qKiBHZXQgdHlwZSBmcm9tIGB0eXBlc2AgKi9cbmV4cG9ydHMuZ2V0VHlwZSA9IGZ1bmN0aW9uICh0eXBlcywgbmFtZSkge1xuICAgIHZhciB0eXBlID0gdHlwZXMuZ2V0KG5hbWUpO1xuICAgIGlmICh0eXBlICYmIHR5cGUuYWxpYXNPZk5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMuZ2V0VHlwZSh0eXBlcywgdHlwZS5hbGlhc09mTmFtZSk7XG4gICAgfVxuICAgIGlmICh0eXBlKSB7XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cbiAgICBpZiAobmFtZS5lbmRzV2l0aCgnW10nKSkge1xuICAgICAgICByZXR1cm4gY3JlYXRlVHlwZSh7XG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgYXJyYXlPZjogZXhwb3J0cy5nZXRUeXBlKHR5cGVzLCBuYW1lLnN1YnN0cigwLCBuYW1lLmxlbmd0aCAtIDIpKSxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplQXJyYXksXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZGVzZXJpYWxpemVBcnJheSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChuYW1lLmVuZHNXaXRoKCc/JykpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIG9wdGlvbmFsT2Y6IGV4cG9ydHMuZ2V0VHlwZSh0eXBlcywgbmFtZS5zdWJzdHIoMCwgbmFtZS5sZW5ndGggLSAxKSksXG4gICAgICAgICAgICBzZXJpYWxpemU6IHNlcmlhbGl6ZU9wdGlvbmFsLFxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGRlc2VyaWFsaXplT3B0aW9uYWwsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAobmFtZS5lbmRzV2l0aCgnJCcpKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICBleHRlbnNpb25PZjogZXhwb3J0cy5nZXRUeXBlKHR5cGVzLCBuYW1lLnN1YnN0cigwLCBuYW1lLmxlbmd0aCAtIDEpKSxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplRXh0ZW5zaW9uLFxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGRlc2VyaWFsaXplRXh0ZW5zaW9uLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIHR5cGU6ICcgKyBuYW1lKTtcbn07XG4vKipcbiAqIEdldCB0eXBlcyBmcm9tIGFiaVxuICpcbiAqIEBwYXJhbSBpbml0aWFsVHlwZXMgU2V0IG9mIHR5cGVzIHRvIGJ1aWxkIG9uLlxuICogSW4gbW9zdCBjYXNlcywgaXQncyBiZXN0IHRvIGZpbGwgdGhpcyBmcm9tIGEgZnJlc2ggY2FsbCB0byBgZ2V0VHlwZXNGcm9tQWJpKClgLlxuICovXG5leHBvcnRzLmdldFR5cGVzRnJvbUFiaSA9IGZ1bmN0aW9uIChpbml0aWFsVHlwZXMsIGFiaSkge1xuICAgIHZhciBlXzUsIF9hLCBlXzYsIF9iLCBlXzcsIF9jLCBlXzgsIF9kLCBlXzksIF9lO1xuICAgIHZhciB0eXBlcyA9IG5ldyBNYXAoaW5pdGlhbFR5cGVzKTtcbiAgICBpZiAoYWJpLnR5cGVzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfZiA9IF9fdmFsdWVzKGFiaS50eXBlcyksIF9nID0gX2YubmV4dCgpOyAhX2cuZG9uZTsgX2cgPSBfZi5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2ggPSBfZy52YWx1ZSwgbmV3X3R5cGVfbmFtZSA9IF9oLm5ld190eXBlX25hbWUsIHR5cGUgPSBfaC50eXBlO1xuICAgICAgICAgICAgICAgIHR5cGVzLnNldChuZXdfdHlwZV9uYW1lLCBjcmVhdGVUeXBlKHsgbmFtZTogbmV3X3R5cGVfbmFtZSwgYWxpYXNPZk5hbWU6IHR5cGUgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzVfMSkgeyBlXzUgPSB7IGVycm9yOiBlXzVfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoX2cgJiYgIV9nLmRvbmUgJiYgKF9hID0gX2YucmV0dXJuKSkgX2EuY2FsbChfZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfNSkgdGhyb3cgZV81LmVycm9yOyB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGFiaS5zdHJ1Y3RzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaiA9IF9fdmFsdWVzKGFiaS5zdHJ1Y3RzKSwgX2sgPSBfai5uZXh0KCk7ICFfay5kb25lOyBfayA9IF9qLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBfbCA9IF9rLnZhbHVlLCBuYW1lXzEgPSBfbC5uYW1lLCBiYXNlID0gX2wuYmFzZSwgZmllbGRzID0gX2wuZmllbGRzO1xuICAgICAgICAgICAgICAgIHR5cGVzLnNldChuYW1lXzEsIGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lXzEsXG4gICAgICAgICAgICAgICAgICAgIGJhc2VOYW1lOiBiYXNlLFxuICAgICAgICAgICAgICAgICAgICBmaWVsZHM6IGZpZWxkcy5tYXAoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbiA9IF9hLm5hbWUsIHR5cGUgPSBfYS50eXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh7IG5hbWU6IG4sIHR5cGVOYW1lOiB0eXBlLCB0eXBlOiBudWxsIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgc2VyaWFsaXplOiBzZXJpYWxpemVTdHJ1Y3QsXG4gICAgICAgICAgICAgICAgICAgIGRlc2VyaWFsaXplOiBkZXNlcmlhbGl6ZVN0cnVjdCxcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfNl8xKSB7IGVfNiA9IHsgZXJyb3I6IGVfNl8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChfayAmJiAhX2suZG9uZSAmJiAoX2IgPSBfai5yZXR1cm4pKSBfYi5jYWxsKF9qKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV82KSB0aHJvdyBlXzYuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoYWJpLnZhcmlhbnRzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfbSA9IF9fdmFsdWVzKGFiaS52YXJpYW50cyksIF9vID0gX20ubmV4dCgpOyAhX28uZG9uZTsgX28gPSBfbS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3AgPSBfby52YWx1ZSwgbmFtZV8yID0gX3AubmFtZSwgdCA9IF9wLnR5cGVzO1xuICAgICAgICAgICAgICAgIHR5cGVzLnNldChuYW1lXzIsIGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lXzIsXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkczogdC5tYXAoZnVuY3Rpb24gKHMpIHsgcmV0dXJuICh7IG5hbWU6IHMsIHR5cGVOYW1lOiBzLCB0eXBlOiBudWxsIH0pOyB9KSxcbiAgICAgICAgICAgICAgICAgICAgc2VyaWFsaXplOiBzZXJpYWxpemVWYXJpYW50LFxuICAgICAgICAgICAgICAgICAgICBkZXNlcmlhbGl6ZTogZGVzZXJpYWxpemVWYXJpYW50LFxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV83XzEpIHsgZV83ID0geyBlcnJvcjogZV83XzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKF9vICYmICFfby5kb25lICYmIChfYyA9IF9tLnJldHVybikpIF9jLmNhbGwoX20pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzcpIHRocm93IGVfNy5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIHR5cGVzXzEgPSBfX3ZhbHVlcyh0eXBlcyksIHR5cGVzXzFfMSA9IHR5cGVzXzEubmV4dCgpOyAhdHlwZXNfMV8xLmRvbmU7IHR5cGVzXzFfMSA9IHR5cGVzXzEubmV4dCgpKSB7XG4gICAgICAgICAgICB2YXIgX3EgPSBfX3JlYWQodHlwZXNfMV8xLnZhbHVlLCAyKSwgbmFtZV8zID0gX3FbMF0sIHR5cGUgPSBfcVsxXTtcbiAgICAgICAgICAgIGlmICh0eXBlLmJhc2VOYW1lKSB7XG4gICAgICAgICAgICAgICAgdHlwZS5iYXNlID0gZXhwb3J0cy5nZXRUeXBlKHR5cGVzLCB0eXBlLmJhc2VOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX3IgPSAoZV85ID0gdm9pZCAwLCBfX3ZhbHVlcyh0eXBlLmZpZWxkcykpLCBfcyA9IF9yLm5leHQoKTsgIV9zLmRvbmU7IF9zID0gX3IubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWVsZCA9IF9zLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBmaWVsZC50eXBlID0gZXhwb3J0cy5nZXRUeXBlKHR5cGVzLCBmaWVsZC50eXBlTmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVfOV8xKSB7IGVfOSA9IHsgZXJyb3I6IGVfOV8xIH07IH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfcyAmJiAhX3MuZG9uZSAmJiAoX2UgPSBfci5yZXR1cm4pKSBfZS5jYWxsKF9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzkpIHRocm93IGVfOS5lcnJvcjsgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlXzhfMSkgeyBlXzggPSB7IGVycm9yOiBlXzhfMSB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAodHlwZXNfMV8xICYmICF0eXBlc18xXzEuZG9uZSAmJiAoX2QgPSB0eXBlc18xLnJldHVybikpIF9kLmNhbGwodHlwZXNfMSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlXzgpIHRocm93IGVfOC5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gdHlwZXM7XG59OyAvLyBnZXRUeXBlc0Zyb21BYmlcbnZhciByZXZlcnNlSGV4ID0gZnVuY3Rpb24gKGgpIHtcbiAgICByZXR1cm4gaC5zdWJzdHIoNiwgMikgKyBoLnN1YnN0cig0LCAyKSArIGguc3Vic3RyKDIsIDIpICsgaC5zdWJzdHIoMCwgMik7XG59O1xuLyoqIFRBUG9TOiBSZXR1cm4gdHJhbnNhY3Rpb24gZmllbGRzIHdoaWNoIHJlZmVyZW5jZSBgcmVmQmxvY2tgIGFuZCBleHBpcmUgYGV4cGlyZVNlY29uZHNgIGFmdGVyIGB0aW1lc3RhbXBgICovXG5leHBvcnRzLnRyYW5zYWN0aW9uSGVhZGVyID0gZnVuY3Rpb24gKHJlZkJsb2NrLCBleHBpcmVTZWNvbmRzKSB7XG4gICAgdmFyIHRpbWVzdGFtcCA9IHJlZkJsb2NrLmhlYWRlciA/IHJlZkJsb2NrLmhlYWRlci50aW1lc3RhbXAgOiByZWZCbG9jay50aW1lc3RhbXA7XG4gICAgdmFyIHByZWZpeCA9IHBhcnNlSW50KHJldmVyc2VIZXgocmVmQmxvY2suaWQuc3Vic3RyKDE2LCA4KSksIDE2KTtcbiAgICByZXR1cm4ge1xuICAgICAgICBleHBpcmF0aW9uOiBleHBvcnRzLnRpbWVQb2ludFNlY1RvRGF0ZShleHBvcnRzLmRhdGVUb1RpbWVQb2ludFNlYyh0aW1lc3RhbXApICsgZXhwaXJlU2Vjb25kcyksXG4gICAgICAgIHJlZl9ibG9ja19udW06IHJlZkJsb2NrLmJsb2NrX251bSAmIDB4ZmZmZixcbiAgICAgICAgcmVmX2Jsb2NrX3ByZWZpeDogcHJlZml4LFxuICAgIH07XG59O1xuLyoqIENvbnZlcnQgYWN0aW9uIGRhdGEgdG8gc2VyaWFsaXplZCBmb3JtIChoZXgpICovXG5leHBvcnRzLnNlcmlhbGl6ZUFjdGlvbkRhdGEgPSBmdW5jdGlvbiAoY29udHJhY3QsIGFjY291bnQsIG5hbWUsIGRhdGEsIHRleHRFbmNvZGVyLCB0ZXh0RGVjb2Rlcikge1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PSAnc3RyaW5nJyAmJiBkYXRhLnN1YnN0cigwLCAyKSA9PSAnMHgnKSB7XG4gICAgICAgIHZhciByZXQgPSBkYXRhLnN1YnN0cigyKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIGFjdGlvbiA9IGNvbnRyYWN0LmFjdGlvbnMuZ2V0KG5hbWUpO1xuICAgICAgICBpZiAoIWFjdGlvbikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBhY3Rpb24gXCIgKyBuYW1lICsgXCIgaW4gY29udHJhY3QgXCIgKyBhY2NvdW50KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYnVmZmVyID0gbmV3IFNlcmlhbEJ1ZmZlcih7IHRleHRFbmNvZGVyOiB0ZXh0RW5jb2RlciwgdGV4dERlY29kZXI6IHRleHREZWNvZGVyIH0pO1xuICAgICAgICBhY3Rpb24uc2VyaWFsaXplKGJ1ZmZlciwgZGF0YSk7XG4gICAgICAgIHJldHVybiBleHBvcnRzLmFycmF5VG9IZXgoYnVmZmVyLmFzVWludDhBcnJheSgpKTtcbiAgICB9XG59O1xuLyoqIFJldHVybiBhY3Rpb24gaW4gc2VyaWFsaXplZCBmb3JtICovXG5leHBvcnRzLnNlcmlhbGl6ZUFjdGlvbiA9IGZ1bmN0aW9uIChjb250cmFjdCwgYWNjb3VudCwgbmFtZSwgYXV0aG9yaXphdGlvbiwgZGF0YSwgdGV4dEVuY29kZXIsIHRleHREZWNvZGVyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWNjb3VudDogYWNjb3VudCxcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgYXV0aG9yaXphdGlvbjogYXV0aG9yaXphdGlvbixcbiAgICAgICAgZGF0YTogZXhwb3J0cy5zZXJpYWxpemVBY3Rpb25EYXRhKGNvbnRyYWN0LCBhY2NvdW50LCBuYW1lLCBkYXRhLCB0ZXh0RW5jb2RlciwgdGV4dERlY29kZXIpLFxuICAgIH07XG59O1xuLyoqIERlc2VyaWFsaXplIGFjdGlvbiBkYXRhLiBJZiBgZGF0YWAgaXMgYSBgc3RyaW5nYCwgdGhlbiBpdCdzIGFzc3VtZWQgdG8gYmUgaW4gaGV4LiAqL1xuZXhwb3J0cy5kZXNlcmlhbGl6ZUFjdGlvbkRhdGEgPSBmdW5jdGlvbiAoY29udHJhY3QsIGFjY291bnQsIG5hbWUsIGRhdGEsIHRleHRFbmNvZGVyLCB0ZXh0RGVjb2Rlcikge1xuICAgIHZhciBhY3Rpb24gPSBjb250cmFjdC5hY3Rpb25zLmdldChuYW1lKTtcbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGRhdGEgPSBleHBvcnRzLmhleFRvVWludDhBcnJheShkYXRhKTtcbiAgICB9XG4gICAgaWYgKCFhY3Rpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBhY3Rpb24gXCIgKyBuYW1lICsgXCIgaW4gY29udHJhY3QgXCIgKyBhY2NvdW50KTtcbiAgICB9XG4gICAgdmFyIGJ1ZmZlciA9IG5ldyBTZXJpYWxCdWZmZXIoeyB0ZXh0RGVjb2RlcjogdGV4dERlY29kZXIsIHRleHRFbmNvZGVyOiB0ZXh0RW5jb2RlciB9KTtcbiAgICBidWZmZXIucHVzaEFycmF5KGRhdGEpO1xuICAgIHJldHVybiBhY3Rpb24uZGVzZXJpYWxpemUoYnVmZmVyKTtcbn07XG5leHBvcnRzLnNlcmlhbGl6ZUFiaVR5cGUgPSBmdW5jdGlvbiAoY29udHJhY3QsIGFjY291bnQsIG5hbWUsIGRhdGEsIHRleHRFbmNvZGVyLCB0ZXh0RGVjb2Rlcikge1xuICAgIHZhciB0eXBlTmFtZSA9IGNvbnRyYWN0LnR5cGVzLmdldChuYW1lKTtcbiAgICBpZiAoIXR5cGVOYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gYWN0aW9uIFwiICsgbmFtZSArIFwiIGluIGNvbnRyYWN0IFwiICsgYWNjb3VudCk7XG4gICAgfVxuICAgIHZhciBidWZmZXIgPSBuZXcgU2VyaWFsQnVmZmVyKHsgdGV4dEVuY29kZXI6IHRleHRFbmNvZGVyLCB0ZXh0RGVjb2RlcjogdGV4dERlY29kZXIgfSk7XG4gICAgdHlwZU5hbWUuc2VyaWFsaXplKGJ1ZmZlciwgZGF0YSk7XG4gICAgcmV0dXJuIGV4cG9ydHMuYXJyYXlUb0hleChidWZmZXIuYXNVaW50OEFycmF5KCkpO1xufTtcbmV4cG9ydHMuZGVzZXJpYWxpemVBYmlUeXBlID0gZnVuY3Rpb24gKGNvbnRyYWN0LCBhY2NvdW50LCBuYW1lLCBkYXRhLCB0ZXh0RW5jb2RlciwgdGV4dERlY29kZXIpIHtcbiAgICB2YXIgYWJpVHlwZSA9IGNvbnRyYWN0LnR5cGVzLmdldChuYW1lKTtcbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGRhdGEgPSBleHBvcnRzLmhleFRvVWludDhBcnJheShkYXRhKTtcbiAgICB9XG4gICAgaWYgKCFhYmlUeXBlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gYWJpIHR5cGUgXCIgKyBuYW1lICsgXCIgaW4gY29udHJhY3QgXCIgKyBhY2NvdW50KTtcbiAgICB9XG4gICAgdmFyIGJ1ZmZlciA9IG5ldyBTZXJpYWxCdWZmZXIoeyB0ZXh0RGVjb2RlcjogdGV4dERlY29kZXIsIHRleHRFbmNvZGVyOiB0ZXh0RW5jb2RlciB9KTtcbiAgICBidWZmZXIucHVzaEFycmF5KGRhdGEpO1xuICAgIHJldHVybiBhYmlUeXBlLmRlc2VyaWFsaXplKGJ1ZmZlcik7XG59O1xuLyoqIERlc2VyaWFsaXplIGFjdGlvbi4gSWYgYGRhdGFgIGlzIGEgYHN0cmluZ2AsIHRoZW4gaXQncyBhc3N1bWVkIHRvIGJlIGluIGhleC4gKi9cbmV4cG9ydHMuZGVzZXJpYWxpemVBY3Rpb24gPSBmdW5jdGlvbiAoY29udHJhY3QsIGFjY291bnQsIG5hbWUsIGF1dGhvcml6YXRpb24sIGRhdGEsIHRleHRFbmNvZGVyLCB0ZXh0RGVjb2Rlcikge1xuICAgIHJldHVybiB7XG4gICAgICAgIGFjY291bnQ6IGFjY291bnQsXG4gICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgIGF1dGhvcml6YXRpb246IGF1dGhvcml6YXRpb24sXG4gICAgICAgIGRhdGE6IGV4cG9ydHMuZGVzZXJpYWxpemVBY3Rpb25EYXRhKGNvbnRyYWN0LCBhY2NvdW50LCBuYW1lLCBkYXRhLCB0ZXh0RW5jb2RlciwgdGV4dERlY29kZXIpLFxuICAgIH07XG59O1xuIiwiLy8gaHR0cHM6Ly9naXN0LmdpdGh1YnVzZXJjb250ZW50LmNvbS93bHpsYTAwMC9iYWM4M2RmNmQzYzUxOTE2YzRkZDBiYzk0N2U0Njk0Ny9yYXcvN2VlMzQ2MmIwOTVhYjIyNTgwZGRhZjE5MWY0NGE1OTBkYTZmZTMzYi9SSVBFTUQtMTYwLmpzXG5cbi8qXG5cdFJJUEVNRC0xNjAuanNcblxuXHRcdGRldmVsb3BlZFxuXHRcdFx0YnkgSy4gKGh0dHBzOi8vZ2l0aHViLmNvbS93bHpsYTAwMClcblx0XHRcdG9uIERlY2VtYmVyIDI3LTI5LCAyMDE3LFxuXG5cdFx0bGljZW5zZWQgdW5kZXJcblxuXG5cdFx0dGhlIE1JVCBsaWNlbnNlXG5cblx0XHRDb3B5cmlnaHQgKGMpIDIwMTcgSy5cblxuXHRcdCBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuXHRcdG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG5cdFx0ZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0XG5cdFx0cmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsXG5cdFx0Y29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXG5cdFx0c2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGVcblx0XHRTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZ1xuXHRcdGNvbmRpdGlvbnM6XG5cblx0XHQgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcblx0XHRpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuXHRcdCBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELFxuXHRcdEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFU1xuXHRcdE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EXG5cdFx0Tk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFRcblx0XHRIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSxcblx0XHRXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkdcblx0XHRGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SXG5cdFx0T1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBSSVBFTUQxNjBcbntcbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICAvLyBodHRwczovL3dlYmNhY2hlLmdvb2dsZXVzZXJjb250ZW50LmNvbS9zZWFyY2g/cT1jYWNoZTpDbkxPZ29sVEhZRUo6aHR0cHM6Ly93d3cuY29zaWMuZXNhdC5rdWxldXZlbi5iZS9wdWJsaWNhdGlvbnMvYXJ0aWNsZS0zMTcucGRmXG4gICAgICAgIC8vIGh0dHA6Ly9zaG9kaGdhbmdhLmluZmxpYm5ldC5hYy5pbi9iaXRzdHJlYW0vMTA2MDMvMjI5NzgvMTMvMTNfYXBwZW5kaXgucGRmXG4gICAgfVxuXG4gICAgc3RhdGljIGdldF9uX3BhZF9ieXRlcyhtZXNzYWdlX3NpemUgLyogaW4gYnl0ZXMsIDEgYnl0ZSBpcyA4IGJpdHMuICovKVxuICAgIHtcbiAgICAgICAgLy8gIE9idGFpbiB0aGUgbnVtYmVyIG9mIGJ5dGVzIG5lZWRlZCB0byBwYWQgdGhlIG1lc3NhZ2UuXG4gICAgICAgIC8vIEl0IGRvZXMgbm90IGNvbnRhaW4gdGhlIHNpemUgb2YgdGhlIG1lc3NhZ2Ugc2l6ZSBpbmZvcm1hdGlvbi5cbiAgICAgICAgLypcblx0XHRcdGh0dHBzOi8vd2ViY2FjaGUuZ29vZ2xldXNlcmNvbnRlbnQuY29tL3NlYXJjaD9xPWNhY2hlOkNuTE9nb2xUSFlFSjpodHRwczovL3d3dy5jb3NpYy5lc2F0Lmt1bGV1dmVuLmJlL3B1YmxpY2F0aW9ucy9hcnRpY2xlLTMxNy5wZGZcblxuXHRcdFx0VGhlIENyeXB0b2dyYXBoaWMgSGFzaCBGdW5jdGlvbiBSSVBFTUQtMTYwXG5cblx0XHRcdHdyaXR0ZW4gYnlcblx0XHRcdFx0QmFydCBQcmVuZWVsLFxuXHRcdFx0XHRIYW5zIERvYmJlcnRpbixcblx0XHRcdFx0QW50b29uIEJvc3NlbGFlcnNcblx0XHRcdGluXG5cdFx0XHRcdDE5OTcuXG5cblx0XHRcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0XHRcdMKnNSAgICAgRGVzY3JpcHRpb24gb2YgUklQRU1ELTE2MFxuXG5cdFx0XHQuLi4uLi5cblxuXHRcdFx0IEluIG9yZGVyIHRvIGd1YXJhbnRlZSB0aGF0IHRoZSB0b3RhbCBpbnB1dCBzaXplIGlzIGFcblx0XHRcdG11bHRpcGxlIG9mIDUxMiBiaXRzLCB0aGUgaW5wdXQgaXMgcGFkZGVkIGluIHRoZSBzYW1lXG5cdFx0XHR3YXkgYXMgZm9yIGFsbCB0aGUgbWVtYmVycyBvZiB0aGUgTUQ0LWZhbWlseTogb25lXG5cdFx0XHRhcHBlbmRzIGEgc2luZ2xlIDEgZm9sbG93ZWQgYnkgYSBzdHJpbmcgb2YgMHMgKHRoZVxuXHRcdFx0bnVtYmVyIG9mIDBzIGxpZXMgYmV0d2VlbiAwIGFuZCA1MTEpOyB0aGUgbGFzdCA2NCBiaXRzXG5cdFx0XHRvZiB0aGUgZXh0ZW5kZWQgaW5wdXQgY29udGFpbiB0aGUgYmluYXJ5IHJlcHJlc2VudGF0aW9uXG5cdFx0XHRvZiB0aGUgaW5wdXQgc2l6ZSBpbiBiaXRzLCBsZWFzdCBzaWduaWZpY2FudCBieXRlIGZpcnN0LlxuXHRcdCovXG4gICAgICAgIC8qXG5cdFx0XHRodHRwczovL3Rvb2xzLmlldGYub3JnL3JmYy9yZmMxMTg2LnR4dFxuXG5cdFx0XHRSRkMgMTE4NjogTUQ0IE1lc3NhZ2UgRGlnZXN0IEFsZ29yaXRobS5cblxuXHRcdFx0d3JpdHRlbiBieVxuXHRcdFx0XHRSb25hbGQgTGlubiBSaXZlc3Rcblx0XHRcdGluXG5cdFx0XHRcdE9jdG9iZXIgMTk5MC5cblxuXHRcdFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdFx0wqczICAgICBNRDQgQWxnb3JpdGhtIERlc2NyaXB0aW9uXG5cblx0XHRcdC4uLi4uLlxuXG5cdFx0XHRTdGVwIDEuIEFwcGVuZCBwYWRkaW5nIGJpdHNcblxuXHRcdFx0IFRoZSBtZXNzYWdlIGlzIFwicGFkZGVkXCIgKGV4dGVuZGVkKSBzbyB0aGF0IGl0cyBsZW5ndGhcblx0XHRcdChpbiBiaXRzKSBpcyBjb25ncnVlbnQgdG8gNDQ4LCBtb2R1bG8gNTEyLiBUaGF0IGlzLCB0aGVcblx0XHRcdG1lc3NhZ2UgaXMgZXh0ZW5kZWQgc28gdGhhdCBpdCBpcyBqdXN0IDY0IGJpdHMgc2h5IG9mXG5cdFx0XHRiZWluZyBhIG11bHRpcGxlIG9mIDUxMiBiaXRzIGxvbmcuIFBhZGRpbmcgaXMgYWx3YXlzXG5cdFx0XHRwZXJmb3JtZWQsIGV2ZW4gaWYgdGhlIGxlbmd0aCBvZiB0aGUgbWVzc2FnZSBpcyBhbHJlYWR5XG5cdFx0XHRjb25ncnVlbnQgdG8gNDQ4LCBtb2R1bG8gNTEyIChpbiB3aGljaCBjYXNlIDUxMiBiaXRzIG9mXG5cdFx0XHRwYWRkaW5nIGFyZSBhZGRlZCkuXG5cblx0XHRcdCBQYWRkaW5nIGlzIHBlcmZvcm1lZCBhcyBmb2xsb3dzOiBhIHNpbmdsZSBcIjFcIiBiaXQgaXNcblx0XHRcdGFwcGVuZGVkIHRvIHRoZSBtZXNzYWdlLCBhbmQgdGhlbiBlbm91Z2ggemVybyBiaXRzIGFyZVxuXHRcdFx0YXBwZW5kZWQgc28gdGhhdCB0aGUgbGVuZ3RoIGluIGJpdHMgb2YgdGhlIHBhZGRlZFxuXHRcdFx0bWVzc2FnZSBiZWNvbWVzIGNvbmdydWVudCB0byA0NDgsIG1vZHVsbyA1MTIuXG5cblx0XHRcdFN0ZXAgMi4gQXBwZW5kIGxlbmd0aFxuXG5cdFx0XHQgQSA2NC1iaXQgcmVwcmVzZW50YXRpb24gb2YgYiAodGhlIGxlbmd0aCBvZiB0aGUgbWVzc2FnZVxuXHRcdFx0YmVmb3JlIHRoZSBwYWRkaW5nIGJpdHMgd2VyZSBhZGRlZCkgaXMgYXBwZW5kZWQgdG8gdGhlXG5cdFx0XHRyZXN1bHQgb2YgdGhlIHByZXZpb3VzIHN0ZXAuIEluIHRoZSB1bmxpa2VseSBldmVudCB0aGF0XG5cdFx0XHRiIGlzIGdyZWF0ZXIgdGhhbiAyXjY0LCB0aGVuIG9ubHkgdGhlIGxvdy1vcmRlciA2NCBiaXRzXG5cdFx0XHRvZiBiIGFyZSB1c2VkLiAoVGhlc2UgYml0cyBhcmUgYXBwZW5kZWQgYXMgdHdvIDMyLWJpdFxuXHRcdFx0d29yZHMgYW5kIGFwcGVuZGVkIGxvdy1vcmRlciB3b3JkIGZpcnN0IGluIGFjY29yZGFuY2Vcblx0XHRcdHdpdGggdGhlIHByZXZpb3VzIGNvbnZlbnRpb25zLilcblxuXHRcdFx0IEF0IHRoaXMgcG9pbnQgdGhlIHJlc3VsdGluZyBtZXNzYWdlIChhZnRlciBwYWRkaW5nIHdpdGhcblx0XHRcdGJpdHMgYW5kIHdpdGggYikgaGFzIGEgbGVuZ3RoIHRoYXQgaXMgYW4gZXhhY3QgbXVsdGlwbGVcblx0XHRcdG9mIDUxMiBiaXRzLiBFcXVpdmFsZW50bHksIHRoaXMgbWVzc2FnZSBoYXMgYSBsZW5ndGhcblx0XHRcdHRoYXQgaXMgYW4gZXhhY3QgbXVsdGlwbGUgb2YgMTYgKDMyLWJpdCkgd29yZHMuIExldFxuXHRcdFx0TVswIC4uLiBOLTFdIGRlbm90ZSB0aGUgd29yZHMgb2YgdGhlIHJlc3VsdGluZyBtZXNzYWdlLFxuXHRcdFx0d2hlcmUgTiBpcyBhIG11bHRpcGxlIG9mIDE2LlxuXHRcdCovXG4gICAgICAgIC8vIGh0dHBzOi8vY3J5cHRvLnN0YWNrZXhjaGFuZ2UuY29tL2EvMzI0MDcvNTQ1NjhcbiAgICAgICAgLypcblx0XHRcdEV4YW1wbGUgY2FzZSAgIyAxXG5cdFx0XHRcdFswIGJpdDogbWVzc2FnZS5dXG5cdFx0XHRcdFsxIGJpdDogMS5dXG5cdFx0XHRcdFs0NDcgYml0czogMC5dXG5cdFx0XHRcdFs2NCBiaXRzOiBtZXNzYWdlIHNpemUgaW5mb3JtYXRpb24uXVxuXG5cdFx0XHRFeGFtcGxlIGNhc2UgICMgMlxuXHRcdFx0XHRbNTEyLWJpdHM6IG1lc3NhZ2VdXG5cdFx0XHRcdFsxIGJpdDogMS5dXG5cdFx0XHRcdFs0NDcgYml0czogMC5dXG5cdFx0XHRcdFs2NCBiaXRzOiBtZXNzYWdlIHNpemUgaW5mb3JtYXRpb24uXVxuXG5cdFx0XHRFeGFtcGxlIGNhc2UgICMgM1xuXHRcdFx0XHRbKDUxMiAtIDY0ID0gNDQ4KSBiaXRzOiBtZXNzYWdlLl1cblx0XHRcdFx0WzEgYml0OiAxLl1cblx0XHRcdFx0WzUxMSBiaXRzOiAwLl1cblx0XHRcdFx0WzY0IGJpdHM6IG1lc3NhZ2Ugc2l6ZSBpbmZvcm1hdGlvbi5dXG5cblx0XHRcdEV4YW1wbGUgY2FzZSAgIyA0XG5cdFx0XHRcdFsoNTEyIC0gNjUgPSA0NDcpIGJpdHM6IG1lc3NhZ2UuXVxuXHRcdFx0XHRbMSBiaXQ6IDEuXVxuXHRcdFx0XHRbMCBiaXQ6IDAuXVxuXHRcdFx0XHRbNjQgYml0czogbWVzc2FnZSBzaXplIGluZm9ybWF0aW9uLl1cblx0XHQqL1xuICAgICAgICAvLyBUaGUgbnVtYmVyIG9mIHBhZGRpbmcgemVybyBiaXRzOlxuICAgICAgICAvLyAgICAgIDUxMSAtIFt7KG1lc3NhZ2Ugc2l6ZSBpbiBiaXRzKSArIDY0fSAobW9kIDUxMildXG4gICAgICAgIHJldHVybiA2NCAtICgobWVzc2FnZV9zaXplICsgOCkgJiAwYjAwMTExMTExIC8qIDYzICovKTtcbiAgICB9XG4gICAgc3RhdGljIHBhZChtZXNzYWdlIC8qIEFuIEFycmF5QnVmZmVyLiAqLylcbiAgICB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2Vfc2l6ZSA9IG1lc3NhZ2UuYnl0ZUxlbmd0aDtcbiAgICAgICAgY29uc3Qgbl9wYWQgPSBSSVBFTUQxNjAuZ2V0X25fcGFkX2J5dGVzKG1lc3NhZ2Vfc2l6ZSk7XG5cbiAgICAgICAgLy8gIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAgaXMgKCgyICoqIDUzKSAtIDEpIGFuZFxuICAgICAgICAvLyBiaXR3aXNlIG9wZXJhdGlvbiBpbiBKYXZhc2NyaXB0IGlzIGRvbmUgb24gMzItYml0cyBvcGVyYW5kcy5cbiAgICAgICAgY29uc3QgZGl2bW9kID0gKGRpdmlkZW5kLCBkaXZpc29yKSA9PiBbXG4gICAgICAgICAgICBNYXRoLmZsb29yKGRpdmlkZW5kIC8gZGl2aXNvciksXG4gICAgICAgICAgICBkaXZpZGVuZCAlIGRpdmlzb3JcbiAgICAgICAgXTtcbiAgICAgICAgLypcblRvIHNoaWZ0XG5cbiAgIDAwMDAwMDAwIDAwMD8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdCBvXG4gICAwMDAwMDAwMCA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/PzAwMFxuXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5NZXRob2QgIzFcblxuICAgIDAwMDAwMDAwIDAwMD8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ICA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/P1xuICAgWzAwMDAwMDAwIDAwMEFBQUFBIEFBQUFBQUFBIEFBQUFBQUFBXSAoPEE+IGNhcHR1cmVkKVxuICAgWzAwMDAwMDAwIEFBQUFBQUFBIEFBQUFBQUFBIEFBQUFBMDAwXSAoPEE+IHNoaWZ0ZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgKDxCPiBjYXB0dXJlZCkgW0JCQkJCQkJCIEJCQkJCQkJCIEJCQkJCQkJCIEJCQkJCQkJCXVxuICAgICAgICAgICAgICAgICAgICAgKDxCPiBzaGlmdGVkKSBbQkJCXVtCQkJCQkJCQiBCQkJCQkJCQiBCQkJCQkJCQiBCQkJCQjAwMF1cbiAgIFswMDAwMDAwMCBBQUFBQUFBQSBBQUFBQUFBQSBBQUFBQUJCQl0gKDxBPiAmIDxCXzI+IG1lcmdlZClcbiAgIFswMDAwMDAwMCBBQUFBQUFBQSBBQUFBQUFBQSBBQUFBQUJCQl1bQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkIwMDBdXG4gICAgMDAwMDAwMDAgPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/MDAwXG5cblx0XHRjb25zdCB1aW50MzJfbWF4X3BsdXNfMSA9IDB4MTAwMDAwMDAwOyAvLyAoMiAqKiAzMilcblx0XHRjb25zdCBbXG5cdFx0XHRtc2dfYnl0ZV9zaXplX21vc3QsIC8vIFZhbHVlIHJhbmdlIFswLCAoMiAqKiAyMSkgLSAxXS5cblx0XHRcdG1zZ19ieXRlX3NpemVfbGVhc3QgLy8gVmFsdWUgcmFuZ2UgWzAsICgyICoqIDMyKSAtIDFdLlxuXHRcdF0gPSBkaXZtb2QobWVzc2FnZV9zaXplLCB1aW50MzJfbWF4X3BsdXNfMSk7XG5cdFx0Y29uc3QgW1xuXHRcdFx0Y2FycnksIC8vIFZhbHVlIHJhbmdlIFswLCA3XS5cblx0XHRcdG1zZ19iaXRfc2l6ZV9sZWFzdCAvLyBWYWx1ZSByYW5nZSBbMCwgKDIgKiogMzIpIC0gOF0uXG5cdFx0XSA9IGRpdm1vZChtZXNzYWdlX2J5dGVfc2l6ZV9sZWFzdCAqIDgsIHVpbnQzMl9tYXhfcGx1c18xKTtcblx0XHRjb25zdCBtZXNzYWdlX2JpdF9zaXplX21vc3QgPSBtZXNzYWdlX2J5dGVfc2l6ZV9tb3N0ICogOFxuXHRcdFx0KyBjYXJyeTsgLy8gVmFsdWUgcmFuZ2UgWzAsICgyICoqIDI0KSAtIDFdLlxuXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5NZXRob2QgIzJcbiAgICAwMDAwMDAwMCAwMDA/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyAgPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz9cbiAgICAgIFswMDAwMCAwMDBBQUFBQSBBQUFBQUFBQSBBQUFBQUFBQSAgQUFBXSAoPEE+IGNhcHR1cmVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICg8Qj4gY2FwdHVyZWQpIFswMDBCQkJCQiBCQkJCQkJCQiBCQkJCQkJCQiBCQkJCQkJCQl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKDxCPiBzaGlmdGVkKSBbQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkIwMDBdXG4gICBbMDAwMDAwMDAgQUFBQUFBQUEgQUFBQUFBQUEgQUFBQUFBQUFdW0JCQkJCQkJCIEJCQkJCQkJCIEJCQkJCQkJCIEJCQkJCMDAwXVxuICAgIDAwMDAwMDAwID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ICA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/PzAwMFxuXG5cdFx0Ki9cbiAgICAgICAgY29uc3QgW1xuICAgICAgICAgICAgbXNnX2JpdF9zaXplX21vc3QsXG4gICAgICAgICAgICBtc2dfYml0X3NpemVfbGVhc3RcbiAgICAgICAgXSA9IGRpdm1vZChtZXNzYWdlX3NpemUsIDUzNjg3MDkxMiAvKiAoMiAqKiAyOSkgKi8pXG4gICAgICAgICAgICAubWFwKCh4LCBpbmRleCkgPT4gKGluZGV4ID8gKHggKiA4KSA6IHgpKTtcblxuICAgICAgICAvLyBgQXJyYXlCdWZmZXIudHJhbnNmZXIoKWAgaXMgbm90IHN1cHBvcnRlZC5cbiAgICAgICAgY29uc3QgcGFkZGVkID0gbmV3IFVpbnQ4QXJyYXkobWVzc2FnZV9zaXplICsgbl9wYWQgKyA4KTtcbiAgICAgICAgcGFkZGVkLnNldChuZXcgVWludDhBcnJheShtZXNzYWdlKSwgMCk7XG4gICAgICAgIGNvbnN0IGRhdGFfdmlldyA9IG5ldyBEYXRhVmlldyhwYWRkZWQuYnVmZmVyKTtcbiAgICAgICAgZGF0YV92aWV3LnNldFVpbnQ4KG1lc3NhZ2Vfc2l6ZSwgMGIxMDAwMDAwMCk7XG4gICAgICAgIGRhdGFfdmlldy5zZXRVaW50MzIoXG4gICAgICAgICAgICBtZXNzYWdlX3NpemUgKyBuX3BhZCxcbiAgICAgICAgICAgIG1zZ19iaXRfc2l6ZV9sZWFzdCxcbiAgICAgICAgICAgIHRydWUgLy8gTGl0dGxlLWVuZGlhblxuICAgICAgICApO1xuICAgICAgICBkYXRhX3ZpZXcuc2V0VWludDMyKFxuICAgICAgICAgICAgbWVzc2FnZV9zaXplICsgbl9wYWQgKyA0LFxuICAgICAgICAgICAgbXNnX2JpdF9zaXplX21vc3QsXG4gICAgICAgICAgICB0cnVlIC8vIExpdHRsZS1lbmRpYW5cbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gcGFkZGVkLmJ1ZmZlcjtcbiAgICB9XG5cbiAgICBzdGF0aWMgZihqLCB4LCB5LCB6KVxuICAgIHtcbiAgICAgICAgaWYoMCA8PSBqICYmIGogPD0gMTUpXG4gICAgICAgIHsgLy8gRXhjbHVzaXZlLU9SXG4gICAgICAgICAgICByZXR1cm4geCBeIHkgXiB6O1xuICAgICAgICB9XG4gICAgICAgIGlmKDE2IDw9IGogJiYgaiA8PSAzMSlcbiAgICAgICAgeyAvLyBNdWx0aXBsZXhpbmcgKG11eGluZylcbiAgICAgICAgICAgIHJldHVybiAoeCAmIHkpIHwgKH54ICYgeik7XG4gICAgICAgIH1cbiAgICAgICAgaWYoMzIgPD0gaiAmJiBqIDw9IDQ3KVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gKHggfCB+eSkgXiB6O1xuICAgICAgICB9XG4gICAgICAgIGlmKDQ4IDw9IGogJiYgaiA8PSA2MylcbiAgICAgICAgeyAvLyBNdWx0aXBsZXhpbmcgKG11eGluZylcbiAgICAgICAgICAgIHJldHVybiAoeCAmIHopIHwgKHkgJiB+eik7XG4gICAgICAgIH1cbiAgICAgICAgaWYoNjQgPD0gaiAmJiBqIDw9IDc5KVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4geCBeICh5IHwgfnopO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBLKGopXG4gICAge1xuICAgICAgICBpZigwIDw9IGogJiYgaiA8PSAxNSlcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIDB4MDAwMDAwMDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYoMTYgPD0gaiAmJiBqIDw9IDMxKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBNYXRoLmZsb29yKCgyICoqIDMwKSAqIE1hdGguU1FSVDIpXG4gICAgICAgICAgICByZXR1cm4gMHg1QTgyNzk5OTtcbiAgICAgICAgfVxuICAgICAgICBpZigzMiA8PSBqICYmIGogPD0gNDcpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIE1hdGguZmxvb3IoKDIgKiogMzApICogTWF0aC5zcXJ0KDMpKVxuICAgICAgICAgICAgcmV0dXJuIDB4NkVEOUVCQTE7XG4gICAgICAgIH1cbiAgICAgICAgaWYoNDggPD0gaiAmJiBqIDw9IDYzKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBNYXRoLmZsb29yKCgyICoqIDMwKSAqIE1hdGguc3FydCg1KSlcbiAgICAgICAgICAgIHJldHVybiAweDhGMUJCQ0RDO1xuICAgICAgICB9XG4gICAgICAgIGlmKDY0IDw9IGogJiYgaiA8PSA3OSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gTWF0aC5mbG9vcigoMiAqKiAzMCkgKiBNYXRoLnNxcnQoNykpXG4gICAgICAgICAgICByZXR1cm4gMHhBOTUzRkQ0RTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgS1AoaikgLy8gSydcbiAgICB7XG4gICAgICAgIGlmKDAgPD0gaiAmJiBqIDw9IDE1KVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBNYXRoLmZsb29yKCgyICoqIDMwKSAqIE1hdGguY2JydCgyKSlcbiAgICAgICAgICAgIHJldHVybiAweDUwQTI4QkU2O1xuICAgICAgICB9XG4gICAgICAgIGlmKDE2IDw9IGogJiYgaiA8PSAzMSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gTWF0aC5mbG9vcigoMiAqKiAzMCkgKiBNYXRoLmNicnQoMykpXG4gICAgICAgICAgICByZXR1cm4gMHg1QzRERDEyNDtcbiAgICAgICAgfVxuICAgICAgICBpZigzMiA8PSBqICYmIGogPD0gNDcpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIE1hdGguZmxvb3IoKDIgKiogMzApICogTWF0aC5jYnJ0KDUpKVxuICAgICAgICAgICAgcmV0dXJuIDB4NkQ3MDNFRjM7XG4gICAgICAgIH1cbiAgICAgICAgaWYoNDggPD0gaiAmJiBqIDw9IDYzKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBNYXRoLmZsb29yKCgyICoqIDMwKSAqIE1hdGguY2JydCg3KSlcbiAgICAgICAgICAgIHJldHVybiAweDdBNkQ3NkU5O1xuICAgICAgICB9XG4gICAgICAgIGlmKDY0IDw9IGogJiYgaiA8PSA3OSlcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIDB4MDAwMDAwMDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGFkZF9tb2R1bG8zMigvKiAuLi4uLi4gKi8pXG4gICAge1xuICAgICAgICAvLyAxLiAgTW9kdWxvIGFkZGl0aW9uIChhZGRpdGlvbiBtb2R1bG8pIGlzIGFzc29jaWF0aXZlLlxuICAgICAgICAvLyAgICBodHRwczovL3Byb29md2lraS5vcmcvd2lraS9Nb2R1bG9fQWRkaXRpb25faXNfQXNzb2NpYXRpdmVcbiBcdFx0Ly8gMi4gIEJpdHdpc2Ugb3BlcmF0aW9uIGluIEphdmFzY3JpcHRcbiAgICAgICAgLy8gICAgaXMgZG9uZSBvbiAzMi1iaXRzIG9wZXJhbmRzXG4gICAgICAgIC8vICAgIGFuZCByZXN1bHRzIGluIGEgMzItYml0cyB2YWx1ZS5cbiAgICAgICAgcmV0dXJuIEFycmF5XG4gICAgICAgICAgICAuZnJvbShhcmd1bWVudHMpXG4gICAgICAgICAgICAucmVkdWNlKChhLCBiKSA9PiAoYSArIGIpLCAwKSB8IDA7XG4gICAgfVxuICAgIHN0YXRpYyByb2wzMih2YWx1ZSwgY291bnQpXG4gICAgeyAvLyBDeWNsaWMgbGVmdCBzaGlmdCAocm90YXRlKSBvbiAzMi1iaXRzIHZhbHVlLlxuICAgICAgICByZXR1cm4gKHZhbHVlIDw8IGNvdW50KSB8ICh2YWx1ZSA+Pj4gKDMyIC0gY291bnQpKTtcbiAgICB9XG4gICAgc3RhdGljIGhhc2gobWVzc2FnZSAvKiBBbiBBcnJheUJ1ZmZlci4gKi8pXG4gICAge1xuICAgICAgICAvLyAvLy8vLy8vLyAgICAgICBQYWRkaW5nICAgICAgIC8vLy8vLy8vLy9cblxuICAgICAgICAvLyBUaGUgcGFkZGVkIG1lc3NhZ2UuXG4gICAgICAgIGNvbnN0IHBhZGRlZCA9IFJJUEVNRDE2MC5wYWQobWVzc2FnZSk7XG5cbiAgICAgICAgLy8gLy8vLy8vLy8gICAgIENvbXByZXNzaW9uICAgICAvLy8vLy8vLy8vXG5cbiAgICAgICAgLy8gTWVzc2FnZSB3b3JkIHNlbGVjdG9ycy5cbiAgICAgICAgY29uc3QgciA9IFtcbiAgICAgICAgICAgIDAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUsXG4gICAgICAgICAgICA3LCA0LCAxMywgMSwgMTAsIDYsIDE1LCAzLCAxMiwgMCwgOSwgNSwgMiwgMTQsIDExLCA4LFxuICAgICAgICAgICAgMywgMTAsIDE0LCA0LCA5LCAxNSwgOCwgMSwgMiwgNywgMCwgNiwgMTMsIDExLCA1LCAxMixcbiAgICAgICAgICAgIDEsIDksIDExLCAxMCwgMCwgOCwgMTIsIDQsIDEzLCAzLCA3LCAxNSwgMTQsIDUsIDYsIDIsXG4gICAgICAgICAgICA0LCAwLCA1LCA5LCA3LCAxMiwgMiwgMTAsIDE0LCAxLCAzLCA4LCAxMSwgNiwgMTUsIDEzXG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IHJQID0gWyAvLyByJ1xuICAgICAgICAgICAgNSwgMTQsIDcsIDAsIDksIDIsIDExLCA0LCAxMywgNiwgMTUsIDgsIDEsIDEwLCAzLCAxMixcbiAgICAgICAgICAgIDYsIDExLCAzLCA3LCAwLCAxMywgNSwgMTAsIDE0LCAxNSwgOCwgMTIsIDQsIDksIDEsIDIsXG4gICAgICAgICAgICAxNSwgNSwgMSwgMywgNywgMTQsIDYsIDksIDExLCA4LCAxMiwgMiwgMTAsIDAsIDQsIDEzLFxuICAgICAgICAgICAgOCwgNiwgNCwgMSwgMywgMTEsIDE1LCAwLCA1LCAxMiwgMiwgMTMsIDksIDcsIDEwLCAxNCxcbiAgICAgICAgICAgIDEyLCAxNSwgMTAsIDQsIDEsIDUsIDgsIDcsIDYsIDIsIDEzLCAxNCwgMCwgMywgOSwgMTFcbiAgICAgICAgXTtcblxuICAgICAgICAvLyBBbW91bnRzIGZvciAncm90YXRlIGxlZnQnIG9wZXJhdGlvbi5cbiAgICAgICAgY29uc3QgcyA9IFtcbiAgICAgICAgICAgIDExLCAxNCwgMTUsIDEyLCA1LCA4LCA3LCA5LCAxMSwgMTMsIDE0LCAxNSwgNiwgNywgOSwgOCxcbiAgICAgICAgICAgIDcsIDYsIDgsIDEzLCAxMSwgOSwgNywgMTUsIDcsIDEyLCAxNSwgOSwgMTEsIDcsIDEzLCAxMixcbiAgICAgICAgICAgIDExLCAxMywgNiwgNywgMTQsIDksIDEzLCAxNSwgMTQsIDgsIDEzLCA2LCA1LCAxMiwgNywgNSxcbiAgICAgICAgICAgIDExLCAxMiwgMTQsIDE1LCAxNCwgMTUsIDksIDgsIDksIDE0LCA1LCA2LCA4LCA2LCA1LCAxMixcbiAgICAgICAgICAgIDksIDE1LCA1LCAxMSwgNiwgOCwgMTMsIDEyLCA1LCAxMiwgMTMsIDE0LCAxMSwgOCwgNSwgNlxuICAgICAgICBdO1xuICAgICAgICBjb25zdCBzUCA9IFsgLy8gcydcbiAgICAgICAgICAgIDgsIDksIDksIDExLCAxMywgMTUsIDE1LCA1LCA3LCA3LCA4LCAxMSwgMTQsIDE0LCAxMiwgNixcbiAgICAgICAgICAgIDksIDEzLCAxNSwgNywgMTIsIDgsIDksIDExLCA3LCA3LCAxMiwgNywgNiwgMTUsIDEzLCAxMSxcbiAgICAgICAgICAgIDksIDcsIDE1LCAxMSwgOCwgNiwgNiwgMTQsIDEyLCAxMywgNSwgMTQsIDEzLCAxMywgNywgNSxcbiAgICAgICAgICAgIDE1LCA1LCA4LCAxMSwgMTQsIDE0LCA2LCAxNCwgNiwgOSwgMTIsIDksIDEyLCA1LCAxNSwgOCxcbiAgICAgICAgICAgIDgsIDUsIDEyLCA5LCAxMiwgNSwgMTQsIDYsIDgsIDEzLCA2LCA1LCAxNSwgMTMsIDExLCAxMVxuICAgICAgICBdO1xuXG4gICAgICAgIC8vIFRoZSBzaXplLCBpbiBieXRlcywgb2YgYSB3b3JkLlxuICAgICAgICBjb25zdCB3b3JkX3NpemUgPSA0O1xuXG4gICAgICAgIC8vIFRoZSBzaXplLCBpbiBieXRlcywgb2YgYSAxNi13b3JkcyBibG9jay5cbiAgICAgICAgY29uc3QgYmxvY2tfc2l6ZSA9IDY0O1xuXG4gICAgICAgIC8vIFRoZSBudW1iZXIgb2YgdGhlIDE2LXdvcmRzIGJsb2Nrcy5cbiAgICAgICAgY29uc3QgdCA9IHBhZGRlZC5ieXRlTGVuZ3RoIC8gYmxvY2tfc2l6ZTtcblxuICAgICAgICAvLyAgVGhlIG1lc3NhZ2UgYWZ0ZXIgcGFkZGluZyBjb25zaXN0cyBvZiB0IDE2LXdvcmQgYmxvY2tzIHRoYXRcbiAgICAgICAgLy8gYXJlIGRlbm90ZWQgd2l0aCBYX2lbal0sIHdpdGggMOKJpGniiaQodCDiiJIgMSkgYW5kIDDiiaRq4omkMTUuXG4gICAgICAgIGNvbnN0IFggPSAobmV3IEFycmF5KHQpKVxuICAgICAgICAgICAgLmZpbGwodW5kZWZpbmVkKVxuICAgICAgICAgICAgLm1hcCgoXywgaSkgPT4gaiA9PiAoXG4gICAgICAgICAgICAgICAgbmV3IERhdGFWaWV3KFxuICAgICAgICAgICAgICAgICAgICBwYWRkZWQsIGkgKiBibG9ja19zaXplLCBibG9ja19zaXplXG4gICAgICAgICAgICAgICAgKS5nZXRVaW50MzIoXG4gICAgICAgICAgICAgICAgICAgIGogKiB3b3JkX3NpemUsXG4gICAgICAgICAgICAgICAgICAgIHRydWUgLy8gTGl0dGxlLWVuZGlhblxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkpO1xuXG4gICAgICAgIC8vICBUaGUgcmVzdWx0IG9mIFJJUEVNRC0xNjAgaXMgY29udGFpbmVkIGluIGZpdmUgMzItYml0IHdvcmRzLFxuICAgICAgICAvLyB3aGljaCBmb3JtIHRoZSBpbnRlcm5hbCBzdGF0ZSBvZiB0aGUgYWxnb3JpdGhtLiBUaGUgZmluYWxcbiAgICAgICAgLy8gY29udGVudCBvZiB0aGVzZSBmaXZlIDMyLWJpdCB3b3JkcyBpcyBjb252ZXJ0ZWQgdG8gYSAxNjAtYml0XG4gICAgICAgIC8vIHN0cmluZywgYWdhaW4gdXNpbmcgdGhlIGxpdHRsZS1lbmRpYW4gY29udmVudGlvbi5cbiAgICAgICAgY29uc3QgaCA9IFtcbiAgICAgICAgICAgIDB4Njc0NTIzMDEsIC8vIGhfMFxuICAgICAgICAgICAgMHhFRkNEQUI4OSwgLy8gaF8xXG4gICAgICAgICAgICAweDk4QkFEQ0ZFLCAvLyBoXzJcbiAgICAgICAgICAgIDB4MTAzMjU0NzYsIC8vIGhfM1xuICAgICAgICAgICAgMHhDM0QyRTFGMCAgLy8gaF80XG4gICAgICAgIF07XG5cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHQ7ICsraSlcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IEEgPSBoWzBdOyBsZXQgQiA9IGhbMV07IGxldCBDID0gaFsyXTsgbGV0IEQgPSBoWzNdOyBsZXQgRSA9IGhbNF07XG4gICAgICAgICAgICBsZXQgQVAgPSBBOyBsZXQgQlAgPSBCOyBsZXQgQ1AgPSBDOyBsZXQgRFAgPSBEOyBsZXQgRVAgPSBFO1xuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IDgwOyArK2opXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gTGVmdCByb3VuZHNcbiAgICAgICAgICAgICAgICBsZXQgVCA9IFJJUEVNRDE2MC5hZGRfbW9kdWxvMzIoIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2hhZG93XG4gICAgICAgICAgICAgICAgICAgIFJJUEVNRDE2MC5yb2wzMihcbiAgICAgICAgICAgICAgICAgICAgICAgIFJJUEVNRDE2MC5hZGRfbW9kdWxvMzIoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSSVBFTUQxNjAuZihqLCBCLCBDLCBEKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBYW2ldKHJbal0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJJUEVNRDE2MC5LKGopXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgc1tqXVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBFXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBBID0gRTtcbiAgICAgICAgICAgICAgICBFID0gRDtcbiAgICAgICAgICAgICAgICBEID0gUklQRU1EMTYwLnJvbDMyKEMsIDEwKTtcbiAgICAgICAgICAgICAgICBDID0gQjtcbiAgICAgICAgICAgICAgICBCID0gVDtcblxuICAgICAgICAgICAgICAgIC8vIFJpZ2h0IHJvdW5kc1xuICAgICAgICAgICAgICAgIFQgPSBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKFxuICAgICAgICAgICAgICAgICAgICBSSVBFTUQxNjAucm9sMzIoXG4gICAgICAgICAgICAgICAgICAgICAgICBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFQLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJJUEVNRDE2MC5mKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA3OSAtIGosXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJQLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDUCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRFBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFhbaV0oclBbal0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJJUEVNRDE2MC5LUChqKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNQW2pdXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIEVQXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBBUCA9IEVQO1xuICAgICAgICAgICAgICAgIEVQID0gRFA7XG4gICAgICAgICAgICAgICAgRFAgPSBSSVBFTUQxNjAucm9sMzIoQ1AsIDEwKTtcbiAgICAgICAgICAgICAgICBDUCA9IEJQO1xuICAgICAgICAgICAgICAgIEJQID0gVDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IFQgPSBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKGhbMV0sIEMsIERQKTtcbiAgICAgICAgICAgIGhbMV0gPSBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKGhbMl0sIEQsIEVQKTtcbiAgICAgICAgICAgIGhbMl0gPSBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKGhbM10sIEUsIEFQKTtcbiAgICAgICAgICAgIGhbM10gPSBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKGhbNF0sIEEsIEJQKTtcbiAgICAgICAgICAgIGhbNF0gPSBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKGhbMF0sIEIsIENQKTtcbiAgICAgICAgICAgIGhbMF0gPSBUO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gIFRoZSBmaW5hbCBvdXRwdXQgc3RyaW5nIHRoZW4gY29uc2lzdHMgb2YgdGhlIGNvbmNhdGVuYXRhdGlvblxuICAgICAgICAvLyBvZiBoXzAsIGhfMSwgaF8yLCBoXzMsIGFuZCBoXzQgYWZ0ZXIgY29udmVydGluZyBlYWNoIGhfaSB0byBhXG4gICAgICAgIC8vIDQtYnl0ZSBzdHJpbmcgdXNpbmcgdGhlIGxpdHRsZS1lbmRpYW4gY29udmVudGlvbi5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5QnVmZmVyKDIwKTtcbiAgICAgICAgY29uc3QgZGF0YV92aWV3ID0gbmV3IERhdGFWaWV3KHJlc3VsdCk7XG4gICAgICAgIGguZm9yRWFjaCgoaF9pLCBpKSA9PiBkYXRhX3ZpZXcuc2V0VWludDMyKGkgKiA0LCBoX2ksIHRydWUpKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIFJJUEVNRDE2MFxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=