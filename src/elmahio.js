/*!
 * elmah.io Javascript Logger - version 3.0.0-beta2
 * (c) 2018 elmah.io, Apache 2.0 License, https://elmah.io
 */


/*
 * stackframe
 * https://github.com/stacktracejs/stackframe
 */
 !function(t,e){"use strict";"function"==typeof define&&define.amd?define("stackframe",[],e):"object"==typeof exports?module.exports=e():t.StackFrame=e()}(this,function(){"use strict";function n(t){return!isNaN(parseFloat(t))&&isFinite(t)}function r(t){return t.charAt(0).toUpperCase()+t.substring(1)}function t(t){return function(){return this[t]}}var e=["isConstructor","isEval","isNative","isToplevel"],i=["columnNumber","lineNumber"],o=["fileName","functionName","source"],s=e.concat(i,o,["args"]);function c(t){if(t instanceof Object)for(var e=0;e<s.length;e++)t.hasOwnProperty(s[e])&&void 0!==t[s[e]]&&this["set"+r(s[e])](t[s[e]])}c.prototype={getArgs:function(){return this.args},setArgs:function(t){if("[object Array]"!==Object.prototype.toString.call(t))throw new TypeError("Args must be an Array");this.args=t},getEvalOrigin:function(){return this.evalOrigin},setEvalOrigin:function(t){if(t instanceof c)this.evalOrigin=t;else{if(!(t instanceof Object))throw new TypeError("Eval Origin must be an Object or StackFrame");this.evalOrigin=new c(t)}},toString:function(){return(this.getFunctionName()||"{anonymous}")+("("+(this.getArgs()||[]).join(",")+")")+(this.getFileName()?"@"+this.getFileName():"")+(n(this.getLineNumber())?":"+this.getLineNumber():"")+(n(this.getColumnNumber())?":"+this.getColumnNumber():"")}},c.fromString=function(t){var e=t.indexOf("("),n=t.lastIndexOf(")"),r=t.substring(0,e),i=t.substring(e+1,n).split(","),o=t.substring(n+1);if(0===o.indexOf("@"))var s=/@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(o,""),u=s[1],a=s[2],f=s[3];return new c({functionName:r,args:i||void 0,fileName:u,lineNumber:a||void 0,columnNumber:f||void 0})};for(var u=0;u<e.length;u++)c.prototype["get"+r(e[u])]=t(e[u]),c.prototype["set"+r(e[u])]=function(e){return function(t){this[e]=Boolean(t)}}(e[u]);for(var a=0;a<i.length;a++)c.prototype["get"+r(i[a])]=t(i[a]),c.prototype["set"+r(i[a])]=function(e){return function(t){if(!n(t))throw new TypeError(e+" must be a Number");this[e]=Number(t)}}(i[a]);for(var f=0;f<o.length;f++)c.prototype["get"+r(o[f])]=t(o[f]),c.prototype["set"+r(o[f])]=function(e){return function(t){this[e]=String(t)}}(o[f]);return c});

/*
 * error-stack-parser.js
 * https://github.com/stacktracejs/error-stack-parser
 */
!function (e, t) { "use strict"; "function" == typeof define && define.amd ? define("stackframe", [], t) : "object" == typeof exports ? module.exports = t() : e.StackFrame = t() }(this, function () { "use strict"; function e(e) { return !isNaN(parseFloat(e)) && isFinite(e) } function t(e) { return e.charAt(0).toUpperCase() + e.substring(1) } function r(e) { return function () { return this[e] } } function n(e) { if (e instanceof Object) for (var r = 0; r < c.length; r++)e.hasOwnProperty(c[r]) && void 0 !== e[c[r]] && this["set" + t(c[r])](e[c[r]]) } var i = ["isConstructor", "isEval", "isNative", "isToplevel"], a = ["columnNumber", "lineNumber"], o = ["fileName", "functionName", "source"], s = ["args"], c = i.concat(a, o, s); n.prototype = { getArgs: function () { return this.args }, setArgs: function (e) { if ("[object Array]" !== Object.prototype.toString.call(e)) throw new TypeError("Args must be an Array"); this.args = e }, getEvalOrigin: function () { return this.evalOrigin }, setEvalOrigin: function (e) { if (e instanceof n) this.evalOrigin = e; else { if (!(e instanceof Object)) throw new TypeError("Eval Origin must be an Object or StackFrame"); this.evalOrigin = new n(e) } }, toString: function () { var t = this.getFunctionName() || "{anonymous}", r = "(" + (this.getArgs() || []).join(",") + ")", n = this.getFileName() ? "@" + this.getFileName() : "", i = e(this.getLineNumber()) ? ":" + this.getLineNumber() : "", a = e(this.getColumnNumber()) ? ":" + this.getColumnNumber() : ""; return t + r + n + i + a } }; for (var u = 0; u < i.length; u++)n.prototype["get" + t(i[u])] = r(i[u]), n.prototype["set" + t(i[u])] = function (e) { return function (t) { this[e] = Boolean(t) } }(i[u]); for (var f = 0; f < a.length; f++)n.prototype["get" + t(a[f])] = r(a[f]), n.prototype["set" + t(a[f])] = function (t) { return function (r) { if (!e(r)) throw new TypeError(t + " must be a Number"); this[t] = Number(r) } }(a[f]); for (var p = 0; p < o.length; p++)n.prototype["get" + t(o[p])] = r(o[p]), n.prototype["set" + t(o[p])] = function (e) { return function (t) { this[e] = String(t) } }(o[p]); return n }), function (e, t) { "use strict"; "function" == typeof define && define.amd ? define("error-stack-parser", ["stackframe"], t) : "object" == typeof exports ? module.exports = t(require("stackframe")) : e.ErrorStackParser = t(e.StackFrame) }(this, function (e) { "use strict"; var t = /(^|@)\S+\:\d+/, r = /^\s*at .*(\S+\:\d+|\(native\))/m, n = /^(eval@)?(\[native code\])?$/; return { parse: function (e) { if ("undefined" != typeof e.stacktrace || "undefined" != typeof e["opera#sourceloc"]) return this.parseOpera(e); if (e.stack && e.stack.match(r)) return this.parseV8OrIE(e); if (e.stack) return this.parseFFOrSafari(e); throw new Error("Cannot parse given Error object") }, extractLocation: function (e) { if (e.indexOf(":") === -1) return [e]; var t = /(.+?)(?:\:(\d+))?(?:\:(\d+))?$/, r = t.exec(e.replace(/[\(\)]/g, "")); return [r[1], r[2] || void 0, r[3] || void 0] }, parseV8OrIE: function (t) { var n = t.stack.split("\n").filter(function (e) { return !!e.match(r) }, this); return n.map(function (t) { t.indexOf("(eval ") > -1 && (t = t.replace(/eval code/g, "eval").replace(/(\(eval at [^\()]*)|(\)\,.*$)/g, "")); var r = t.replace(/^\s+/, "").replace(/\(eval code/g, "(").split(/\s+/).slice(1), n = this.extractLocation(r.pop()), i = r.join(" ") || void 0, a = ["eval", "<anonymous>"].indexOf(n[0]) > -1 ? void 0 : n[0]; return new e({ functionName: i, fileName: a, lineNumber: n[1], columnNumber: n[2], source: t }) }, this) }, parseFFOrSafari: function (t) { var r = t.stack.split("\n").filter(function (e) { return !e.match(n) }, this); return r.map(function (t) { if (t.indexOf(" > eval") > -1 && (t = t.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g, ":$1")), t.indexOf("@") === -1 && t.indexOf(":") === -1) return new e({ functionName: t }); var r = /((.*".+"[^@]*)?[^@]*)(?:@)/, n = t.match(r), i = n && n[1] ? n[1] : void 0, a = this.extractLocation(t.replace(r, "")); return new e({ functionName: i, fileName: a[0], lineNumber: a[1], columnNumber: a[2], source: t }) }, this) }, parseOpera: function (e) { return !e.stacktrace || e.message.indexOf("\n") > -1 && e.message.split("\n").length > e.stacktrace.split("\n").length ? this.parseOpera9(e) : e.stack ? this.parseOpera11(e) : this.parseOpera10(e) }, parseOpera9: function (t) { for (var r = /Line (\d+).*script (?:in )?(\S+)/i, n = t.message.split("\n"), i = [], a = 2, o = n.length; a < o; a += 2) { var s = r.exec(n[a]); s && i.push(new e({ fileName: s[2], lineNumber: s[1], source: n[a] })) } return i }, parseOpera10: function (t) { for (var r = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i, n = t.stacktrace.split("\n"), i = [], a = 0, o = n.length; a < o; a += 2) { var s = r.exec(n[a]); s && i.push(new e({ functionName: s[3] || void 0, fileName: s[2], lineNumber: s[1], source: n[a] })) } return i }, parseOpera11: function (r) { var n = r.stack.split("\n").filter(function (e) { return !!e.match(t) && !e.match(/^Error created at/) }, this); return n.map(function (t) { var r, n = t.split("@"), i = this.extractLocation(n.pop()), a = n.shift() || "", o = a.replace(/<anonymous function(: (\w+))?>/, "$2").replace(/\([^\)]*\)/g, "") || void 0; a.match(/\(([^\)]*)\)/) && (r = a.replace(/^[^\(]+\(([^\)]*)\)$/, "$1")); var s = void 0 === r || "[arguments not available]" === r ? void 0 : r.split(","); return new e({ functionName: o, args: s, fileName: i[0], lineNumber: i[1], columnNumber: i[2], source: t }) }, this) } } });

/*
 * stacktrace-gps.js
 * https://github.com/stacktracejs/stacktrace-gps
 */
!function (e, n) { "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : e.ES6Promise = n() }(this, function () { "use strict"; function e(e) { return "function" == typeof e || "object" == typeof e && null !== e } function n(e) { return "function" == typeof e } function t(e) { W = e } function r(e) { Z = e } function o() { return function () { return process.nextTick(c) } } function i() { return function () { J(c) } } function s() { var e = 0, n = new K(c), t = document.createTextNode(""); return n.observe(t, { characterData: !0 }), function () { t.data = e = ++e % 2 } } function u() { var e = new MessageChannel; return e.port1.onmessage = c, function () { return e.port2.postMessage(0) } } function a() { var e = setTimeout; return function () { return e(c, 1) } } function c() { for (var e = 0; e < z; e += 2) { var n = X[e], t = X[e + 1]; n(t), X[e] = void 0, X[e + 1] = void 0 } z = 0 } function l() { try { var e = require, n = e("vertx"); return J = n.runOnLoop || n.runOnContext, i() } catch (t) { return a() } } function f(e, n) { var t = arguments, r = this, o = new this.constructor(h); void 0 === o[ne] && j(o); var i = r._state; return i ? !function () { var e = t[i - 1]; Z(function () { return N(i, o, e, r._result) }) }() : E(r, o, e, n), o } function p(e) { var n = this; if (e && "object" == typeof e && e.constructor === n) return e; var t = new n(h); return b(t, e), t } function h() { } function g() { return new TypeError("You cannot resolve a promise with itself") } function m() { return new TypeError("A promises callback cannot return that same promise.") } function d(e) { try { return e.then } catch (n) { return ie.error = n, ie } } function _(e, n, t, r) { try { e.call(n, t, r) } catch (o) { return o } } function v(e, n, t) { Z(function (e) { var r = !1, o = _(t, n, function (t) { r || (r = !0, n !== t ? b(e, t) : A(e, t)) }, function (n) { r || (r = !0, O(e, n)) }, "Settle: " + (e._label || " unknown promise")); !r && o && (r = !0, O(e, o)) }, e) } function y(e, n) { n._state === re ? A(e, n._result) : n._state === oe ? O(e, n._result) : E(n, void 0, function (n) { return b(e, n) }, function (n) { return O(e, n) }) } function w(e, t, r) { t.constructor === e.constructor && r === f && t.constructor.resolve === p ? y(e, t) : r === ie ? O(e, ie.error) : void 0 === r ? A(e, t) : n(r) ? v(e, t, r) : A(e, t) } function b(n, t) { n === t ? O(n, g()) : e(t) ? w(n, t, d(t)) : A(n, t) } function C(e) { e._onerror && e._onerror(e._result), L(e) } function A(e, n) { e._state === te && (e._result = n, e._state = re, 0 !== e._subscribers.length && Z(L, e)) } function O(e, n) { e._state === te && (e._state = oe, e._result = n, Z(C, e)) } function E(e, n, t, r) { var o = e._subscribers, i = o.length; e._onerror = null, o[i] = n, o[i + re] = t, o[i + oe] = r, 0 === i && e._state && Z(L, e) } function L(e) { var n = e._subscribers, t = e._state; if (0 !== n.length) { for (var r = void 0, o = void 0, i = e._result, s = 0; s < n.length; s += 3)r = n[s], o = n[s + t], r ? N(t, r, o, i) : o(i); e._subscribers.length = 0 } } function M() { this.error = null } function S(e, n) { try { return e(n) } catch (t) { return se.error = t, se } } function N(e, t, r, o) { var i = n(r), s = void 0, u = void 0, a = void 0, c = void 0; if (i) { if (s = S(r, o), s === se ? (c = !0, u = s.error, s = null) : a = !0, t === s) return void O(t, m()) } else s = o, a = !0; t._state !== te || (i && a ? b(t, s) : c ? O(t, u) : e === re ? A(t, s) : e === oe && O(t, s)) } function P(e, n) { try { n(function (n) { b(e, n) }, function (n) { O(e, n) }) } catch (t) { O(e, t) } } function R() { return ue++ } function j(e) { e[ne] = ue++ , e._state = void 0, e._result = void 0, e._subscribers = [] } function T(e, n) { this._instanceConstructor = e, this.promise = new e(h), this.promise[ne] || j(this.promise), I(n) ? (this._input = n, this.length = n.length, this._remaining = n.length, this._result = new Array(this.length), 0 === this.length ? A(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && A(this.promise, this._result))) : O(this.promise, x()) } function x() { return new Error("Array Methods must be provided an Array") } function F(e) { return new T(this, e).promise } function G(e) { var n = this; return new n(I(e) ? function (t, r) { for (var o = e.length, i = 0; i < o; i++)n.resolve(e[i]).then(t, r) } : function (e, n) { return n(new TypeError("You must pass an array to race.")) }) } function B(e) { var n = this, t = new n(h); return O(t, e), t } function D() { throw new TypeError("You must pass a resolver function as the first argument to the promise constructor") } function U() { throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.") } function k(e) { this[ne] = R(), this._result = this._state = void 0, this._subscribers = [], h !== e && ("function" != typeof e && D(), this instanceof k ? P(this, e) : U()) } function $() { var e = void 0; if ("undefined" != typeof global) e = global; else if ("undefined" != typeof self) e = self; else try { e = Function("return this")() } catch (n) { throw new Error("polyfill failed because global object is unavailable in this environment") } var t = e.Promise; if (t) { var r = null; try { r = Object.prototype.toString.call(t.resolve()) } catch (n) { } if ("[object Promise]" === r && !t.cast) return } e.Promise = k } var q = void 0; q = Array.isArray ? Array.isArray : function (e) { return "[object Array]" === Object.prototype.toString.call(e) }; var I = q, z = 0, J = void 0, W = void 0, Z = function (e, n) { X[z] = e, X[z + 1] = n, z += 2, 2 === z && (W ? W(c) : ee()) }, Y = "undefined" != typeof window ? window : void 0, H = Y || {}, K = H.MutationObserver || H.WebKitMutationObserver, Q = "undefined" == typeof self && "undefined" != typeof process && "[object process]" === {}.toString.call(process), V = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel, X = new Array(1e3), ee = void 0; ee = Q ? o() : K ? s() : V ? u() : void 0 === Y && "function" == typeof require ? l() : a(); var ne = Math.random().toString(36).substring(16), te = void 0, re = 1, oe = 2, ie = new M, se = new M, ue = 0; return T.prototype._enumerate = function () { for (var e = this.length, n = this._input, t = 0; this._state === te && t < e; t++)this._eachEntry(n[t], t) }, T.prototype._eachEntry = function (e, n) { var t = this._instanceConstructor, r = t.resolve; if (r === p) { var o = d(e); if (o === f && e._state !== te) this._settledAt(e._state, n, e._result); else if ("function" != typeof o) this._remaining-- , this._result[n] = e; else if (t === k) { var i = new t(h); w(i, e, o), this._willSettleAt(i, n) } else this._willSettleAt(new t(function (n) { return n(e) }), n) } else this._willSettleAt(r(e), n) }, T.prototype._settledAt = function (e, n, t) { var r = this.promise; r._state === te && (this._remaining-- , e === oe ? O(r, t) : this._result[n] = t), 0 === this._remaining && A(r, this._result) }, T.prototype._willSettleAt = function (e, n) { var t = this; E(e, void 0, function (e) { return t._settledAt(re, n, e) }, function (e) { return t._settledAt(oe, n, e) }) }, k.all = F, k.race = G, k.resolve = p, k.reject = B, k._setScheduler = t, k._setAsap = r, k._asap = Z, k.prototype = { constructor: k, then: f, "catch": function (e) { return this.then(null, e) } }, $(), k.polyfill = $, k.Promise = k, k }), function () { "undefined" == typeof Promise && ES6Promise.polyfill() }(), function (e, n) { "use strict"; "function" == typeof define && define.amd ? define("stackframe", [], n) : "object" == typeof exports ? module.exports = n() : e.StackFrame = n() }(this, function () { "use strict"; function e(e) { return !isNaN(parseFloat(e)) && isFinite(e) } function n(e) { return e.charAt(0).toUpperCase() + e.substring(1) } function t(e) { return function () { return this[e] } } function r(e) { if (e instanceof Object) for (var t = 0; t < a.length; t++)e.hasOwnProperty(a[t]) && void 0 !== e[a[t]] && this["set" + n(a[t])](e[a[t]]) } var o = ["isConstructor", "isEval", "isNative", "isToplevel"], i = ["columnNumber", "lineNumber"], s = ["fileName", "functionName", "source"], u = ["args"], a = o.concat(i, s, u); r.prototype = { getArgs: function () { return this.args }, setArgs: function (e) { if ("[object Array]" !== Object.prototype.toString.call(e)) throw new TypeError("Args must be an Array"); this.args = e }, getEvalOrigin: function () { return this.evalOrigin }, setEvalOrigin: function (e) { if (e instanceof r) this.evalOrigin = e; else { if (!(e instanceof Object)) throw new TypeError("Eval Origin must be an Object or StackFrame"); this.evalOrigin = new r(e) } }, toString: function () { var n = this.getFunctionName() || "{anonymous}", t = "(" + (this.getArgs() || []).join(",") + ")", r = this.getFileName() ? "@" + this.getFileName() : "", o = e(this.getLineNumber()) ? ":" + this.getLineNumber() : "", i = e(this.getColumnNumber()) ? ":" + this.getColumnNumber() : ""; return n + t + r + o + i } }; for (var c = 0; c < o.length; c++)r.prototype["get" + n(o[c])] = t(o[c]), r.prototype["set" + n(o[c])] = function (e) { return function (n) { this[e] = Boolean(n) } }(o[c]); for (var l = 0; l < i.length; l++)r.prototype["get" + n(i[l])] = t(i[l]), r.prototype["set" + n(i[l])] = function (n) { return function (t) { if (!e(t)) throw new TypeError(n + " must be a Number"); this[n] = Number(t) } }(i[l]); for (var f = 0; f < s.length; f++)r.prototype["get" + n(s[f])] = t(s[f]), r.prototype["set" + n(s[f])] = function (e) { return function (n) { this[e] = String(n) } }(s[f]); return r }); var SourceMap = function (e) { function n(r) { if (t[r]) return t[r].exports; var o = t[r] = { exports: {}, id: r, loaded: !1 }; return e[r].call(o.exports, o, o.exports, n), o.loaded = !0, o.exports } var t = {}; return n.m = e, n.c = t, n.p = "", n(0) }([function (e, n, t) { function r(e) { var n = e; return "string" == typeof e && (n = JSON.parse(e.replace(/^\)\]\}'/, ""))), null != n.sections ? new s(n) : new o(n) } function o(e) { var n = e; "string" == typeof e && (n = JSON.parse(e.replace(/^\)\]\}'/, ""))); var t = u.getArg(n, "version"), r = u.getArg(n, "sources"), o = u.getArg(n, "names", []), i = u.getArg(n, "sourceRoot", null), s = u.getArg(n, "sourcesContent", null), a = u.getArg(n, "mappings"), l = u.getArg(n, "file", null); if (t != this._version) throw new Error("Unsupported version: " + t); r = r.map(String).map(u.normalize).map(function (e) { return i && u.isAbsolute(i) && u.isAbsolute(e) ? u.relative(i, e) : e }), this._names = c.fromArray(o.map(String), !0), this._sources = c.fromArray(r, !0), this.sourceRoot = i, this.sourcesContent = s, this._mappings = a, this.file = l } function i() { this.generatedLine = 0, this.generatedColumn = 0, this.source = null, this.originalLine = null, this.originalColumn = null, this.name = null } function s(e) { var n = e; "string" == typeof e && (n = JSON.parse(e.replace(/^\)\]\}'/, ""))); var t = u.getArg(n, "version"), o = u.getArg(n, "sections"); if (t != this._version) throw new Error("Unsupported version: " + t); this._sources = new c, this._names = new c; var i = { line: -1, column: 0 }; this._sections = o.map(function (e) { if (e.url) throw new Error("Support for url field in sections not implemented."); var n = u.getArg(e, "offset"), t = u.getArg(n, "line"), o = u.getArg(n, "column"); if (t < i.line || t === i.line && o < i.column) throw new Error("Section offsets must be ordered and non-overlapping."); return i = n, { generatedOffset: { generatedLine: t + 1, generatedColumn: o + 1 }, consumer: new r(u.getArg(e, "map")) } }) } var u = t(1), a = t(2), c = t(3).ArraySet, l = t(4), f = t(6).quickSort; r.fromSourceMap = function (e) { return o.fromSourceMap(e) }, r.prototype._version = 3, r.prototype.__generatedMappings = null, Object.defineProperty(r.prototype, "_generatedMappings", { get: function () { return this.__generatedMappings || this._parseMappings(this._mappings, this.sourceRoot), this.__generatedMappings } }), r.prototype.__originalMappings = null, Object.defineProperty(r.prototype, "_originalMappings", { get: function () { return this.__originalMappings || this._parseMappings(this._mappings, this.sourceRoot), this.__originalMappings } }), r.prototype._charIsMappingSeparator = function (e, n) { var t = e.charAt(n); return ";" === t || "," === t }, r.prototype._parseMappings = function (e, n) { throw new Error("Subclasses must implement _parseMappings") }, r.GENERATED_ORDER = 1, r.ORIGINAL_ORDER = 2, r.GREATEST_LOWER_BOUND = 1, r.LEAST_UPPER_BOUND = 2, r.prototype.eachMapping = function (e, n, t) { var o, i = n || null, s = t || r.GENERATED_ORDER; switch (s) { case r.GENERATED_ORDER: o = this._generatedMappings; break; case r.ORIGINAL_ORDER: o = this._originalMappings; break; default: throw new Error("Unknown order of iteration.") }var a = this.sourceRoot; o.map(function (e) { var n = null === e.source ? null : this._sources.at(e.source); return null != n && null != a && (n = u.join(a, n)), { source: n, generatedLine: e.generatedLine, generatedColumn: e.generatedColumn, originalLine: e.originalLine, originalColumn: e.originalColumn, name: null === e.name ? null : this._names.at(e.name) } }, this).forEach(e, i) }, r.prototype.allGeneratedPositionsFor = function (e) { var n = u.getArg(e, "line"), t = { source: u.getArg(e, "source"), originalLine: n, originalColumn: u.getArg(e, "column", 0) }; if (null != this.sourceRoot && (t.source = u.relative(this.sourceRoot, t.source)), !this._sources.has(t.source)) return []; t.source = this._sources.indexOf(t.source); var r = [], o = this._findMapping(t, this._originalMappings, "originalLine", "originalColumn", u.compareByOriginalPositions, a.LEAST_UPPER_BOUND); if (o >= 0) { var i = this._originalMappings[o]; if (void 0 === e.column) for (var s = i.originalLine; i && i.originalLine === s;)r.push({ line: u.getArg(i, "generatedLine", null), column: u.getArg(i, "generatedColumn", null), lastColumn: u.getArg(i, "lastGeneratedColumn", null) }), i = this._originalMappings[++o]; else for (var c = i.originalColumn; i && i.originalLine === n && i.originalColumn == c;)r.push({ line: u.getArg(i, "generatedLine", null), column: u.getArg(i, "generatedColumn", null), lastColumn: u.getArg(i, "lastGeneratedColumn", null) }), i = this._originalMappings[++o] } return r }, n.SourceMapConsumer = r, o.prototype = Object.create(r.prototype), o.prototype.consumer = r, o.fromSourceMap = function (e) { var n = Object.create(o.prototype), t = n._names = c.fromArray(e._names.toArray(), !0), r = n._sources = c.fromArray(e._sources.toArray(), !0); n.sourceRoot = e._sourceRoot, n.sourcesContent = e._generateSourcesContent(n._sources.toArray(), n.sourceRoot), n.file = e._file; for (var s = e._mappings.toArray().slice(), a = n.__generatedMappings = [], l = n.__originalMappings = [], p = 0, h = s.length; p < h; p++) { var g = s[p], m = new i; m.generatedLine = g.generatedLine, m.generatedColumn = g.generatedColumn, g.source && (m.source = r.indexOf(g.source), m.originalLine = g.originalLine, m.originalColumn = g.originalColumn, g.name && (m.name = t.indexOf(g.name)), l.push(m)), a.push(m) } return f(n.__originalMappings, u.compareByOriginalPositions), n }, o.prototype._version = 3, Object.defineProperty(o.prototype, "sources", { get: function () { return this._sources.toArray().map(function (e) { return null != this.sourceRoot ? u.join(this.sourceRoot, e) : e }, this) } }), o.prototype._parseMappings = function (e, n) { for (var t, r, o, s, a, c = 1, p = 0, h = 0, g = 0, m = 0, d = 0, _ = e.length, v = 0, y = {}, w = {}, b = [], C = []; v < _;)if (";" === e.charAt(v)) c++ , v++ , p = 0; else if ("," === e.charAt(v)) v++; else { for (t = new i, t.generatedLine = c, s = v; s < _ && !this._charIsMappingSeparator(e, s); s++); if (r = e.slice(v, s), o = y[r]) v += r.length; else { for (o = []; v < s;)l.decode(e, v, w), a = w.value, v = w.rest, o.push(a); if (2 === o.length) throw new Error("Found a source, but no line and column"); if (3 === o.length) throw new Error("Found a source and line, but no column"); y[r] = o } t.generatedColumn = p + o[0], p = t.generatedColumn, o.length > 1 && (t.source = m + o[1], m += o[1], t.originalLine = h + o[2], h = t.originalLine, t.originalLine += 1, t.originalColumn = g + o[3], g = t.originalColumn, o.length > 4 && (t.name = d + o[4], d += o[4])), C.push(t), "number" == typeof t.originalLine && b.push(t) } f(C, u.compareByGeneratedPositionsDeflated), this.__generatedMappings = C, f(b, u.compareByOriginalPositions), this.__originalMappings = b }, o.prototype._findMapping = function (e, n, t, r, o, i) { if (e[t] <= 0) throw new TypeError("Line must be greater than or equal to 1, got " + e[t]); if (e[r] < 0) throw new TypeError("Column must be greater than or equal to 0, got " + e[r]); return a.search(e, n, o, i) }, o.prototype.computeColumnSpans = function () { for (var e = 0; e < this._generatedMappings.length; ++e) { var n = this._generatedMappings[e]; if (e + 1 < this._generatedMappings.length) { var t = this._generatedMappings[e + 1]; if (n.generatedLine === t.generatedLine) { n.lastGeneratedColumn = t.generatedColumn - 1; continue } } n.lastGeneratedColumn = 1 / 0 } }, o.prototype.originalPositionFor = function (e) { var n = { generatedLine: u.getArg(e, "line"), generatedColumn: u.getArg(e, "column") }, t = this._findMapping(n, this._generatedMappings, "generatedLine", "generatedColumn", u.compareByGeneratedPositionsDeflated, u.getArg(e, "bias", r.GREATEST_LOWER_BOUND)); if (t >= 0) { var o = this._generatedMappings[t]; if (o.generatedLine === n.generatedLine) { var i = u.getArg(o, "source", null); null !== i && (i = this._sources.at(i), null != this.sourceRoot && (i = u.join(this.sourceRoot, i))); var s = u.getArg(o, "name", null); return null !== s && (s = this._names.at(s)), { source: i, line: u.getArg(o, "originalLine", null), column: u.getArg(o, "originalColumn", null), name: s } } } return { source: null, line: null, column: null, name: null } }, o.prototype.hasContentsOfAllSources = function () { return !!this.sourcesContent && (this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function (e) { return null == e })) }, o.prototype.sourceContentFor = function (e, n) { if (!this.sourcesContent) return null; if (null != this.sourceRoot && (e = u.relative(this.sourceRoot, e)), this._sources.has(e)) return this.sourcesContent[this._sources.indexOf(e)]; var t; if (null != this.sourceRoot && (t = u.urlParse(this.sourceRoot))) { var r = e.replace(/^file:\/\//, ""); if ("file" == t.scheme && this._sources.has(r)) return this.sourcesContent[this._sources.indexOf(r)]; if ((!t.path || "/" == t.path) && this._sources.has("/" + e)) return this.sourcesContent[this._sources.indexOf("/" + e)] } if (n) return null; throw new Error('"' + e + '" is not in the SourceMap.') }, o.prototype.generatedPositionFor = function (e) { var n = u.getArg(e, "source"); if (null != this.sourceRoot && (n = u.relative(this.sourceRoot, n)), !this._sources.has(n)) return { line: null, column: null, lastColumn: null }; n = this._sources.indexOf(n); var t = { source: n, originalLine: u.getArg(e, "line"), originalColumn: u.getArg(e, "column") }, o = this._findMapping(t, this._originalMappings, "originalLine", "originalColumn", u.compareByOriginalPositions, u.getArg(e, "bias", r.GREATEST_LOWER_BOUND)); if (o >= 0) { var i = this._originalMappings[o]; if (i.source === t.source) return { line: u.getArg(i, "generatedLine", null), column: u.getArg(i, "generatedColumn", null), lastColumn: u.getArg(i, "lastGeneratedColumn", null) } } return { line: null, column: null, lastColumn: null } }, n.BasicSourceMapConsumer = o, s.prototype = Object.create(r.prototype), s.prototype.constructor = r, s.prototype._version = 3, Object.defineProperty(s.prototype, "sources", { get: function () { for (var e = [], n = 0; n < this._sections.length; n++)for (var t = 0; t < this._sections[n].consumer.sources.length; t++)e.push(this._sections[n].consumer.sources[t]); return e } }), s.prototype.originalPositionFor = function (e) { var n = { generatedLine: u.getArg(e, "line"), generatedColumn: u.getArg(e, "column") }, t = a.search(n, this._sections, function (e, n) { var t = e.generatedLine - n.generatedOffset.generatedLine; return t ? t : e.generatedColumn - n.generatedOffset.generatedColumn }), r = this._sections[t]; return r ? r.consumer.originalPositionFor({ line: n.generatedLine - (r.generatedOffset.generatedLine - 1), column: n.generatedColumn - (r.generatedOffset.generatedLine === n.generatedLine ? r.generatedOffset.generatedColumn - 1 : 0), bias: e.bias }) : { source: null, line: null, column: null, name: null } }, s.prototype.hasContentsOfAllSources = function () { return this._sections.every(function (e) { return e.consumer.hasContentsOfAllSources() }) }, s.prototype.sourceContentFor = function (e, n) { for (var t = 0; t < this._sections.length; t++) { var r = this._sections[t], o = r.consumer.sourceContentFor(e, !0); if (o) return o } if (n) return null; throw new Error('"' + e + '" is not in the SourceMap.') }, s.prototype.generatedPositionFor = function (e) { for (var n = 0; n < this._sections.length; n++) { var t = this._sections[n]; if (t.consumer.sources.indexOf(u.getArg(e, "source")) !== -1) { var r = t.consumer.generatedPositionFor(e); if (r) { var o = { line: r.line + (t.generatedOffset.generatedLine - 1), column: r.column + (t.generatedOffset.generatedLine === r.line ? t.generatedOffset.generatedColumn - 1 : 0) }; return o } } } return { line: null, column: null } }, s.prototype._parseMappings = function (e, n) { this.__generatedMappings = [], this.__originalMappings = []; for (var t = 0; t < this._sections.length; t++)for (var r = this._sections[t], o = r.consumer._generatedMappings, i = 0; i < o.length; i++) { var s = o[i], a = r.consumer._sources.at(s.source); null !== r.consumer.sourceRoot && (a = u.join(r.consumer.sourceRoot, a)), this._sources.add(a), a = this._sources.indexOf(a); var c = r.consumer._names.at(s.name); this._names.add(c), c = this._names.indexOf(c); var l = { source: a, generatedLine: s.generatedLine + (r.generatedOffset.generatedLine - 1), generatedColumn: s.generatedColumn + (r.generatedOffset.generatedLine === s.generatedLine ? r.generatedOffset.generatedColumn - 1 : 0), originalLine: s.originalLine, originalColumn: s.originalColumn, name: c }; this.__generatedMappings.push(l), "number" == typeof l.originalLine && this.__originalMappings.push(l) } f(this.__generatedMappings, u.compareByGeneratedPositionsDeflated), f(this.__originalMappings, u.compareByOriginalPositions) }, n.IndexedSourceMapConsumer = s }, function (e, n) { function t(e, n, t) { if (n in e) return e[n]; if (3 === arguments.length) return t; throw new Error('"' + n + '" is a required argument.') } function r(e) { var n = e.match(d); return n ? { scheme: n[1], auth: n[2], host: n[3], port: n[4], path: n[5] } : null } function o(e) { var n = ""; return e.scheme && (n += e.scheme + ":"), n += "//", e.auth && (n += e.auth + "@"), e.host && (n += e.host), e.port && (n += ":" + e.port), e.path && (n += e.path), n } function i(e) { var t = e, i = r(e); if (i) { if (!i.path) return e; t = i.path } for (var s, u = n.isAbsolute(t), a = t.split(/\/+/), c = 0, l = a.length - 1; l >= 0; l--)s = a[l], "." === s ? a.splice(l, 1) : ".." === s ? c++ : c > 0 && ("" === s ? (a.splice(l + 1, c), c = 0) : (a.splice(l, 2), c--)); return t = a.join("/"), "" === t && (t = u ? "/" : "."), i ? (i.path = t, o(i)) : t } function s(e, n) { "" === e && (e = "."), "" === n && (n = "."); var t = r(n), s = r(e); if (s && (e = s.path || "/"), t && !t.scheme) return s && (t.scheme = s.scheme), o(t); if (t || n.match(_)) return n; if (s && !s.host && !s.path) return s.host = n, o(s); var u = "/" === n.charAt(0) ? n : i(e.replace(/\/+$/, "") + "/" + n); return s ? (s.path = u, o(s)) : u } function u(e, n) { "" === e && (e = "."), e = e.replace(/\/$/, ""); for (var t = 0; 0 !== n.indexOf(e + "/");) { var r = e.lastIndexOf("/"); if (r < 0) return n; if (e = e.slice(0, r), e.match(/^([^\/]+:\/)?\/*$/)) return n; ++t } return Array(t + 1).join("../") + n.substr(e.length + 1) } function a(e) { return e } function c(e) { return f(e) ? "$" + e : e } function l(e) { return f(e) ? e.slice(1) : e } function f(e) { if (!e) return !1; var n = e.length; if (n < 9) return !1; if (95 !== e.charCodeAt(n - 1) || 95 !== e.charCodeAt(n - 2) || 111 !== e.charCodeAt(n - 3) || 116 !== e.charCodeAt(n - 4) || 111 !== e.charCodeAt(n - 5) || 114 !== e.charCodeAt(n - 6) || 112 !== e.charCodeAt(n - 7) || 95 !== e.charCodeAt(n - 8) || 95 !== e.charCodeAt(n - 9)) return !1; for (var t = n - 10; t >= 0; t--)if (36 !== e.charCodeAt(t)) return !1; return !0 } function p(e, n, t) { var r = e.source - n.source; return 0 !== r ? r : (r = e.originalLine - n.originalLine, 0 !== r ? r : (r = e.originalColumn - n.originalColumn, 0 !== r || t ? r : (r = e.generatedColumn - n.generatedColumn, 0 !== r ? r : (r = e.generatedLine - n.generatedLine, 0 !== r ? r : e.name - n.name)))) } function h(e, n, t) { var r = e.generatedLine - n.generatedLine; return 0 !== r ? r : (r = e.generatedColumn - n.generatedColumn, 0 !== r || t ? r : (r = e.source - n.source, 0 !== r ? r : (r = e.originalLine - n.originalLine, 0 !== r ? r : (r = e.originalColumn - n.originalColumn, 0 !== r ? r : e.name - n.name)))) } function g(e, n) { return e === n ? 0 : e > n ? 1 : -1 } function m(e, n) { var t = e.generatedLine - n.generatedLine; return 0 !== t ? t : (t = e.generatedColumn - n.generatedColumn, 0 !== t ? t : (t = g(e.source, n.source), 0 !== t ? t : (t = e.originalLine - n.originalLine, 0 !== t ? t : (t = e.originalColumn - n.originalColumn, 0 !== t ? t : g(e.name, n.name))))) } n.getArg = t; var d = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/, _ = /^data:.+\,.+$/; n.urlParse = r, n.urlGenerate = o, n.normalize = i, n.join = s, n.isAbsolute = function (e) { return "/" === e.charAt(0) || !!e.match(d) }, n.relative = u; var v = function () { var e = Object.create(null); return !("__proto__" in e) }(); n.toSetString = v ? a : c, n.fromSetString = v ? a : l, n.compareByOriginalPositions = p, n.compareByGeneratedPositionsDeflated = h, n.compareByGeneratedPositionsInflated = m }, function (e, n) { function t(e, r, o, i, s, u) { var a = Math.floor((r - e) / 2) + e, c = s(o, i[a], !0); return 0 === c ? a : c > 0 ? r - a > 1 ? t(a, r, o, i, s, u) : u == n.LEAST_UPPER_BOUND ? r < i.length ? r : -1 : a : a - e > 1 ? t(e, a, o, i, s, u) : u == n.LEAST_UPPER_BOUND ? a : e < 0 ? -1 : e } n.GREATEST_LOWER_BOUND = 1, n.LEAST_UPPER_BOUND = 2, n.search = function (e, r, o, i) { if (0 === r.length) return -1; var s = t(-1, r.length, e, r, o, i || n.GREATEST_LOWER_BOUND); if (s < 0) return -1; for (; s - 1 >= 0 && 0 === o(r[s], r[s - 1], !0);)--s; return s } }, function (e, n, t) { function r() { this._array = [], this._set = Object.create(null) } var o = t(1), i = Object.prototype.hasOwnProperty; r.fromArray = function (e, n) { for (var t = new r, o = 0, i = e.length; o < i; o++)t.add(e[o], n); return t }, r.prototype.size = function () { return Object.getOwnPropertyNames(this._set).length }, r.prototype.add = function (e, n) { var t = o.toSetString(e), r = i.call(this._set, t), s = this._array.length; r && !n || this._array.push(e), r || (this._set[t] = s) }, r.prototype.has = function (e) { var n = o.toSetString(e); return i.call(this._set, n) }, r.prototype.indexOf = function (e) { var n = o.toSetString(e); if (i.call(this._set, n)) return this._set[n]; throw new Error('"' + e + '" is not in the set.') }, r.prototype.at = function (e) { if (e >= 0 && e < this._array.length) return this._array[e]; throw new Error("No element indexed by " + e) }, r.prototype.toArray = function () { return this._array.slice() }, n.ArraySet = r }, function (e, n, t) { function r(e) { return e < 0 ? (-e << 1) + 1 : (e << 1) + 0 } function o(e) { var n = 1 === (1 & e), t = e >> 1; return n ? -t : t } var i = t(5), s = 5, u = 1 << s, a = u - 1, c = u; n.encode = function (e) { var n, t = "", o = r(e); do n = o & a, o >>>= s, o > 0 && (n |= c), t += i.encode(n); while (o > 0); return t }, n.decode = function (e, n, t) { var r, u, l = e.length, f = 0, p = 0; do { if (n >= l) throw new Error("Expected more digits in base 64 VLQ value."); if (u = i.decode(e.charCodeAt(n++)), u === -1) throw new Error("Invalid base64 digit: " + e.charAt(n - 1)); r = !!(u & c), u &= a, f += u << p, p += s } while (r); t.value = o(f), t.rest = n } }, function (e, n) { var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""); n.encode = function (e) { if (0 <= e && e < t.length) return t[e]; throw new TypeError("Must be between 0 and 63: " + e) }, n.decode = function (e) { var n = 65, t = 90, r = 97, o = 122, i = 48, s = 57, u = 43, a = 47, c = 26, l = 52; return n <= e && e <= t ? e - n : r <= e && e <= o ? e - r + c : i <= e && e <= s ? e - i + l : e == u ? 62 : e == a ? 63 : -1 } }, function (e, n) { function t(e, n, t) { var r = e[n]; e[n] = e[t], e[t] = r } function r(e, n) { return Math.round(e + Math.random() * (n - e)) } function o(e, n, i, s) { if (i < s) { var u = r(i, s), a = i - 1; t(e, u, s); for (var c = e[s], l = i; l < s; l++)n(e[l], c) <= 0 && (a += 1, t(e, a, l)); t(e, a + 1, l); var f = a + 1; o(e, n, i, f - 1), o(e, n, f + 1, s) } } n.quickSort = function (e, n) { o(e, n, 0, e.length - 1) } }]); !function (e, n) { "use strict"; "function" == typeof define && define.amd ? define("stacktrace-gps", ["source-map", "stackframe"], n) : "object" == typeof exports ? module.exports = n(require("source-map/lib/source-map-consumer"), require("stackframe")) : e.StackTraceGPS = n(e.SourceMap || e.sourceMap, e.StackFrame) }(this, function (e, n) { "use strict"; function t(e) { return new Promise(function (n, t) { var r = new XMLHttpRequest; r.open("get", e), r.onerror = t, r.onreadystatechange = function () { 4 === r.readyState && (r.status >= 200 && r.status < 300 || "file://" === e.substr(0, 7) && r.responseText ? n(r.responseText) : t(new Error("HTTP status: " + r.status + " retrieving " + e))) }, r.send() }) } function r(e) { if ("undefined" != typeof window && window.atob) return window.atob(e); throw new Error("You must supply a polyfill for window.atob in this environment") } function o(e) { if ("undefined" != typeof JSON && JSON.parse) return JSON.parse(e); throw new Error("You must supply a polyfill for JSON.parse in this environment") } function i(e, n) { for (var t = [/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/, /function\s+([^('"`]*?)\s*\(([^)]*)\)/, /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/, /\b(?!(?:if|for|switch|while|with|catch)\b)(?:(?:static)\s+)?(\S+)\s*\(.*?\)\s*\{/, /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*\(.*?\)\s*=>/], r = e.split("\n"), o = "", i = Math.min(n, 20), s = 0; s < i; ++s) { var u = r[n - s - 1], a = u.indexOf("//"); if (a >= 0 && (u = u.substr(0, a)), u) { o = u + o; for (var c = t.length, l = 0; l < c; l++) { var f = t[l].exec(o); if (f && f[1]) return f[1] } } } } function s() { if ("function" != typeof Object.defineProperty || "function" != typeof Object.create) throw new Error("Unable to consume source maps in older browsers") } function u(e) { if ("object" != typeof e) throw new TypeError("Given StackFrame is not an object"); if ("string" != typeof e.fileName) throw new TypeError("Given file name is not a String"); if ("number" != typeof e.lineNumber || e.lineNumber % 1 !== 0 || e.lineNumber < 1) throw new TypeError("Given line number must be a positive integer"); if ("number" != typeof e.columnNumber || e.columnNumber % 1 !== 0 || e.columnNumber < 0) throw new TypeError("Given column number must be a non-negative integer"); return !0 } function a(e) { for (var n, t, r = /\/\/[#@] ?sourceMappingURL=([^\s'"]+)\s*$/gm; t = r.exec(e);)n = t[1]; if (n) return n; throw new Error("sourceMappingURL not found") } function c(e, t, r) { return new Promise(function (o, i) { var s = t.originalPositionFor({ line: e.lineNumber, column: e.columnNumber }); if (s.source) { var u = t.sourceContentFor(s.source); u && (r[s.source] = u), o(new n({ functionName: s.name || e.functionName, args: e.args, fileName: s.source, lineNumber: s.line, columnNumber: s.column })) } else i(new Error("Could not get original source for given stackframe and source map")) }) } return function l(f) { return this instanceof l ? (f = f || {}, this.sourceCache = f.sourceCache || {}, this.sourceMapConsumerCache = f.sourceMapConsumerCache || {}, this.ajax = f.ajax || t, this._atob = f.atob || r, this._get = function (e) { return new Promise(function (n, t) { var r = "data:" === e.substr(0, 5); if (this.sourceCache[e]) n(this.sourceCache[e]); else if (f.offline && !r) t(new Error("Cannot make network requests in offline mode")); else if (r) { var o = /^data:application\/json;([\w=:"-]+;)*base64,/, i = e.match(o); if (i) { var s = i[0].length, u = e.substr(s), a = this._atob(u); this.sourceCache[e] = a, n(a) } else t(new Error("The encoding of the inline sourcemap is not supported")) } else { var c = this.ajax(e, { method: "get" }); this.sourceCache[e] = c, c.then(n, t) } }.bind(this)) }, this._getSourceMapConsumer = function (n, t) { return new Promise(function (r, i) { if (this.sourceMapConsumerCache[n]) r(this.sourceMapConsumerCache[n]); else { var s = new Promise(function (r, i) { return this._get(n).then(function (n) { "string" == typeof n && (n = o(n.replace(/^\)\]\}'/, ""))), "undefined" == typeof n.sourceRoot && (n.sourceRoot = t), r(new e.SourceMapConsumer(n)) }, i) }.bind(this)); this.sourceMapConsumerCache[n] = s, r(s) } }.bind(this)) }, this.pinpoint = function (e) { return new Promise(function (n, t) { this.getMappedLocation(e).then(function (e) { function t() { n(e) } this.findFunctionName(e).then(n, t)["catch"](t) }.bind(this), t) }.bind(this)) }, this.findFunctionName = function (e) { return new Promise(function (t, r) { u(e), this._get(e.fileName).then(function (r) { var o = e.lineNumber, s = e.columnNumber, u = i(r, o, s); t(u ? new n({ functionName: u, args: e.args, fileName: e.fileName, lineNumber: o, columnNumber: s }) : e) }, r)["catch"](r) }.bind(this)) }, void (this.getMappedLocation = function (e) { return new Promise(function (n, t) { s(), u(e); var r = this.sourceCache, o = e.fileName; this._get(o).then(function (t) { var i = a(t), s = "data:" === i.substr(0, 5), u = o.substring(0, o.lastIndexOf("/") + 1); return "/" === i[0] || s || /^https?:\/\/|^\/\//i.test(i) || (i = u + i), this._getSourceMapConsumer(i, u).then(function (t) { return c(e, t, r).then(n)["catch"](function () { n(e) }) }) }.bind(this), t)["catch"](t) }.bind(this)) })) : new l(f) } });


(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return factory(root);
        });
    } else if (typeof exports === 'object') {
        module.exports = factory(root);
    } else {
        root.Elmahio = factory(root);
    }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, function (window) {

    'use strict';

    //
    // Shared Variables
    //

    var scriptFile = document.getElementsByTagName('script');
    var scriptIndex = scriptFile.length - 1;
    var myScript = scriptFile[scriptIndex];
    var queryString = myScript.src.replace(/^[^\?]+\??/, '');
    var params = parseQuery(queryString);
    var paramsLength = objectLength(params);

    var debugSettings = {
        label: ' elmah.io debugger : On ',
        labelCSS: 'background: #06a89c; color: #ffffff; display: inline-block; font-size: 14px;',
        successCSS: 'background: #d4edda; color: #155724; display: inline-block; font-size: 13px;',
        errorCSS: 'background: #f8d7da; color: #721c24; display: inline-block; font-size: 13px;',
        warningCSS: 'background: #fff3cd; color: #856404; display: inline-block; font-size: 13px;',
        lightCSS: 'background: #e2e3e5; color: #383d41; display: inline-block; font-size: 13px;'
    };

    var defaults = {
        apiKey: null,
        logId: null,
        debug: false,
        application: null,
        filter: null
    };

    //
    // Shared Methods
    //

    var extend = function () {

        // Variables
        var extended = {};
        var deep = false;
        var i = 0;

        // Check if a deep merge
        if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
            deep = arguments[0];
            i++;
        }

        // Merge the object into the extended object
        var merge = function (obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    // If property is an object, merge properties
                    if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                        extended[prop] = extend(extended[prop], obj[prop]);
                    } else {
                        extended[prop] = obj[prop];
                    }
                }
            }
        };

        // Loop through each object and conduct a merge
        for (; i < arguments.length; i++) {
            var obj = arguments[i];
            merge(obj);
        }

        return extended;

    };

    //
    // Helpers
    //

    function parseQuery(query) {
        var Params = new Object();
        if (!query) return Params; // return empty object
        var Pairs = query.split(/[;&]/);
        for (var i = 0; i < Pairs.length; i++) {
            var KeyVal = Pairs[i].split('=');
            if (!KeyVal || KeyVal.length !== 2) continue;
            var key = unescape(KeyVal[0]);
            var val = unescape(KeyVal[1]);
            val = val.replace(/\+/g, ' ');
            Params[key] = val;
        }
        return Params;
    }

    function objectLength(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    function getSearchParameters() {
        var prmstr = window.location.search.substr(1);
        return prmstr !== null && prmstr !== "" ? transformToAssocArray(prmstr) : {};
    }

    function transformToAssocArray(prmstr) {
        var params = [];
        var prmarr = prmstr.split("&");
        for (var i = 0; i < prmarr.length; i++) {
            var tmparr = prmarr[i].split("=");
            params.push({
                'key': tmparr[0],
                'value': tmparr[1]
            });
        }
        return params;
    }

    function merge_objects(obj1, obj2) {
        var obj3 = {};
        for (var attrname1 in obj1) {
            obj3[attrname1] = obj1[attrname1];
        }
        for (var attrname2 in obj2) {
            obj3[attrname2] = obj2[attrname2];
        }

        return obj3;
    }

    //
    // Constructor
    // Can be named anything you want
    //

    var Constructor = function (options) {

        //
        // Unique Variables
        //

        var publicAPIs = {};
        var settings;

        function getPayload() {
            var payload = {
                "url": document.location.pathname || '/',
                "application": settings.application
            };

            var payload_data = [];

            if (navigator.language) payload_data.push({ "key": "User-Language", "value": navigator.language });
            if (document.documentMode) payload_data.push({ "key": "Document-Mode", "value": document.documentMode });
            if (window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth) payload_data.push({ "key": "Browser-Width", "value": window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth });
            if (window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight) payload_data.push({ "key": "Browser-Height", "value": window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight });
            if ((screen.msOrientation || (screen.orientation || screen.mozOrientation || {}).type) !== undefined) payload_data.push({ "key": "Screen-Orientation", "value": ((screen.msOrientation || (screen.orientation || screen.mozOrientation || {}).type).split("-"))[0] });
            if (screen.width) payload_data.push({ "key": "Screen-Width", "value": screen.width });
            if (screen.height) payload_data.push({ "key": "Screen-Height", "value": screen.height });
            if (screen.colorDepth) payload_data.push({ "key": "Color-Depth", "value": screen.colorDepth });
            payload_data.push({ "key": "X-ELMAHIO-SEARCH-isClientside", "value": "true" });

            payload.data = payload_data;

            var payload_serverVariables = [];
            if (navigator.userAgent) payload_serverVariables.push({ "key": "User-Agent", "value": navigator.userAgent });
            if (document.referrer) payload_serverVariables.push({ "key": "Referer", "value": document.referrer });
            if (document.location.protocol === "https:") payload_serverVariables.push({ "key": "HTTPS", "value": 'on' });
            if (document.location.hostname) payload_serverVariables.push({ "key": "Host", "value": document.location.hostname });

            payload.serverVariables = payload_serverVariables;

            return payload;
        }

        function confirmResponse(status, response) {
            if (settings.debug) {
                if (status === 'error') {
                    console.log('%c \u2BC8 Error log: ' + '%c \u2715 Not created ', debugSettings.lightCSS, debugSettings.errorCSS);
                } else if (status === 'success') {
                    console.log('%c \u2BC8 Error log: ' + '%c \u2714 ' + response + ' at ' + new Date().toLocaleString() + ' ', debugSettings.lightCSS, debugSettings.successCSS);
                } else {
                    console.log('%c \u2BC8 Error log: ' + '%c \u2715 Not created. Title should not be undefined, null or empty ! ', debugSettings.lightCSS, debugSettings.errorCSS);
                }
            }
        }

        function stackGPS(error, xhr, jsonData) {
        	var errorStack = error.toString().split("\n")[0];
        	var gps = new StackTraceGPS();
                var promise = new Promise(function(resolve) {
                var stackframes = ErrorStackParser.parse(error);
                resolve(Promise.all(stackframes.map(function(sf) {
                    return new Promise(function(resolve) {
                        function resolveOriginal() {
                            resolve(sf);
                        }
                        gps.pinpoint(sf).then(resolve, resolveOriginal)['catch'](resolveOriginal);
                    });
                })));
            });

            promise.then(function(newFrames){
            	newFrames.forEach(function(stackFrame, i){
			if(stackFrame.functionName) {
            			var fn = stackFrame.functionName + ' ';
            		} else {
            			var fn = '';
            		}
            		var stackString = '    at ' + fn + '(' + stackFrame.fileName + ':' + stackFrame.lineNumber + ':' + stackFrame.columnNumber + ')';
            		newFrames[i] = stackString;
            	});
            	newFrames.unshift(errorStack);
            	jsonData.detail = newFrames.join("\n");
            	xhr.send(JSON.stringify(jsonData));
            });

        }

        // Private methods

        var sendPayload = function (apiKey, logId, callback, errorLog) {
            var api_key = apiKey,
                log_id = logId,
                error = errorLog,
                send = 1,
                queryParams = getSearchParameters(),
                stack = error.error ? ErrorStackParser.parse(error.error) : '';

            if ((api_key !== null && log_id !== null) || (paramsLength === 2)) {

                // Priority for parameters
                if (params.hasOwnProperty('apiKey') && params.hasOwnProperty('logId')) {
                    api_key = params['apiKey'];
                    log_id = params['logId'];
                }

                // get new XHR object
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "https://api.elmah.io/v3/messages/" + log_id + "?api_key=" + api_key, true);

                xhr.setRequestHeader('Content-type', 'application/json');

                xhr.onload = function (e) {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 201) {
                            callback('success', xhr.statusText);
                        }
                    }
                };

                xhr.onerror = function (e) {
                    callback('error', xhr.statusText);

                    // on error event
                    publicAPIs.emit('error', xhr.status, xhr.statusText);
                }

                var jsonData = {
                    "detail": error.error ? error.error.stack : null,
                    "title": error.message || 'Unspecified error',
                    "source": stack && stack.length > 0 ? stack[0].fileName : null,
                    "severity": "Error",
                    "type": error.error ? error.error.name : null,
                    "queryString": JSON.parse(JSON.stringify(queryParams))
                };

                // Add payload to jsonData
                jsonData = merge_objects(jsonData, getPayload());

                // filter callback
                if (settings.filter !== null) {
                    if (settings.filter(jsonData)) {
                        send = 0;
                    }
                }

                if (send === 1) {
                    // on message event
                    publicAPIs.emit('message', jsonData);

                    if (error.error && typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1) {
                    	// send message trying to pinpoint stackframes
                    	stackGPS(error.error, xhr, jsonData);
	                } else {
	                	// send message
                    	xhr.send(JSON.stringify(jsonData));
	                }
                }

            } else {
                return console.log('Login api error');
            }
        };

        var sendManualPayload = function (apiKey, logId, callback, logType, messageLog, errorLog) {
            var api_key = apiKey,
                log_id = logId,
                type = logType,
                error = errorLog,
                message = messageLog,
                send = 1,
                queryParams = getSearchParameters();

            if ((api_key !== null && log_id !== null) || (paramsLength === 2)) {

                // Priority for parameters
                if (params.hasOwnProperty('apiKey') && params.hasOwnProperty('logId')) {
                    api_key = params['apiKey'];
                    log_id = params['logId'];
                }

                // get new XHR object
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "https://api.elmah.io/v3/messages/" + log_id + "?api_key=" + api_key, true);
                xhr.setRequestHeader('Content-type', 'application/json');

                xhr.onload = function (e) {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 201) {
                            callback('success', xhr.statusText);
                        }
                    }
                };

                xhr.onerror = function (e) {
                    callback('error', xhr.statusText);

                    // on error event
                    publicAPIs.emit('error', xhr.status, xhr.statusText);
                }

                if (type !== "Log") {

                    var stack = error ? ErrorStackParser.parse(error) : null;

                    var jsonData = {
                        "title": message,
                        "source": stack && stack.length > 0 ? stack[0].fileName : null,
                        "detail": error ? error.stack : null,
                        "severity": type,
                        "type": error ? error.name : null,
                        "queryString": JSON.parse(JSON.stringify(queryParams))
                    };

                    // Add payload to jsonData
                    jsonData = merge_objects(jsonData, getPayload());

                } else {

                    jsonData = error;

                }

                // filter callback
                if (settings.filter !== null) {
                    if (settings.filter(jsonData)) {
                        send = 0;
                    }
                }

                if (send === 1) {
                    if (jsonData.title) {

                        // on message event
                        publicAPIs.emit('message', jsonData);

                        if (error && typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1) {
	    					// send message trying to pinpoint stackframes
                    		stackGPS(error, xhr, jsonData);
		                } else {
		                	// send message
	                    	xhr.send(JSON.stringify(jsonData));
		                }

                    } else {
                        callback('missing-title', xhr.statusText);
                    }
                }

            } else {
                return console.log('Login api error');
            }
        };

        // Some public methods

        publicAPIs.error = function (msg) {
            sendManualPayload(settings.apiKey, settings.logId, confirmResponse, 'Error', msg);
        };
        publicAPIs.error = function (msg, error) {
            sendManualPayload(settings.apiKey, settings.logId, confirmResponse, 'Error', msg, error);
        };

        publicAPIs.verbose = function (msg) {
            sendManualPayload(settings.apiKey, settings.logId, confirmResponse, 'Verbose', msg);
        };
        publicAPIs.verbose = function (msg, error) {
            sendManualPayload(settings.apiKey, settings.logId, confirmResponse, 'Verbose', msg, error);
        };

        publicAPIs.debug = function (msg) {
            sendManualPayload(settings.apiKey, settings.logId, confirmResponse, 'Debug', msg);
        };
        publicAPIs.debug = function (msg, error) {
            sendManualPayload(settings.apiKey, settings.logId, confirmResponse, 'Debug', msg, error);
        };

        publicAPIs.information = function (msg) {
            sendManualPayload(settings.apiKey, settings.logId, confirmResponse, 'Information', msg);
        };
        publicAPIs.information = function (msg, error) {
            sendManualPayload(settings.apiKey, settings.logId, confirmResponse, 'Information', msg, error);
        };

        publicAPIs.warning = function (msg) {
            sendManualPayload(settings.apiKey, settings.logId, confirmResponse, 'Warning', msg);
        };
        publicAPIs.warning = function (msg, error) {
            sendManualPayload(settings.apiKey, settings.logId, confirmResponse, 'Warning', msg, error);
        };

        publicAPIs.fatal = function (msg) {
            sendManualPayload(settings.apiKey, settings.logId, confirmResponse, 'Fatal', msg);
        };
        publicAPIs.fatal = function (msg, error) {
            sendManualPayload(settings.apiKey, settings.logId, confirmResponse, 'Fatal', msg, error);
        };

        publicAPIs.log = function (obj) {
            sendManualPayload(settings.apiKey, settings.logId, confirmResponse, 'Log', null, obj);
        };

        publicAPIs.on = function (name, callback, ctx) {
            var e = this.e || (this.e = {});

            (e[name] || (e[name] = [])).push({
                fn: callback,
                ctx: ctx
            });

            return this;
        };

        publicAPIs.emit = function (name) {
            var data = [].slice.call(arguments, 1);
            var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
            var i = 0;
            var len = evtArr.length;

            for (i; i < len; i++) {
                evtArr[i].fn.apply(evtArr[i].ctx, data);
            }

            return this;
        };

        publicAPIs.init = function (options) {

            // Merge options into defaults
            settings = extend(defaults, options || {});

            // Code goes here...
            window.onerror = function (message, source, lineno, colno, error) {

                var errorLog = {
                    'message': message,
                    'source': source,
                    'lineno': lineno,
                    'colno': colno,
                    'error': error
                }

                sendPayload(settings.apiKey, settings.logId, confirmResponse, errorLog);

                return false;
            }

        };

        // Initialize the plugin
        publicAPIs.init(options);

        if (settings.debug) {
            console.log('%c' + debugSettings.label, debugSettings.labelCSS);
        }

        // Return the public APIs
        return publicAPIs;

    };


    //
    // Return the constructor
    //

    if (paramsLength && params.hasOwnProperty('apiKey') && params.hasOwnProperty('logId')) {
        // Immediately-Invoked Function Expression (IIFE)
        return new Constructor;
    } else {
        // UMD Constructor
        return Constructor;
    }

});
