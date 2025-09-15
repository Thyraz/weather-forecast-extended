function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise */ var $24c52f343453d62d$var$extendStatics = function(d, b) {
    $24c52f343453d62d$var$extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return $24c52f343453d62d$var$extendStatics(d, b);
};
function $24c52f343453d62d$export$a8ba968b8961cb8a(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    $24c52f343453d62d$var$extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var $24c52f343453d62d$export$18ce0697a983be9b = function() {
    $24c52f343453d62d$export$18ce0697a983be9b = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return $24c52f343453d62d$export$18ce0697a983be9b.apply(this, arguments);
};
function $24c52f343453d62d$export$3c9a16f847548506(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") {
        for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function $24c52f343453d62d$export$29e00dfd3077644b(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function $24c52f343453d62d$export$d5ad3fd78186038f(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
function $24c52f343453d62d$export$3a84e1ae4e97e9b0(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) {
        if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
        return f;
    }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for(var i = decorators.length - 1; i >= 0; i--){
        var context = {};
        for(var p in contextIn)context[p] = p === "access" ? {} : contextIn[p];
        for(var p in contextIn.access)context.access[p] = contextIn.access[p];
        context.addInitializer = function(f) {
            if (done) throw new TypeError("Cannot add initializers after decoration has completed");
            extraInitializers.push(accept(f || null));
        };
        var result = (0, decorators[i])(kind === "accessor" ? {
            get: descriptor.get,
            set: descriptor.set
        } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        } else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
}
function $24c52f343453d62d$export$d831c04e792af3d(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for(var i = 0; i < initializers.length; i++)value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    return useValue ? value : void 0;
}
function $24c52f343453d62d$export$6a2a36740a146cb8(x) {
    return typeof x === "symbol" ? x : "".concat(x);
}
function $24c52f343453d62d$export$d1a06452d3489bc7(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", {
        configurable: true,
        value: prefix ? "".concat(prefix, " ", name) : name
    });
}
function $24c52f343453d62d$export$f1db080c865becb9(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function $24c52f343453d62d$export$1050f835b63b671e(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function $24c52f343453d62d$export$67ebef60e6f28a6(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var $24c52f343453d62d$export$45d3717a4c69092e = Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
        enumerable: true,
        get: function() {
            return m[k];
        }
    };
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
};
function $24c52f343453d62d$export$f33643c0debef087(m, o) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) $24c52f343453d62d$export$45d3717a4c69092e(o, m, p);
}
function $24c52f343453d62d$export$19a8beecd37a4c45(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function $24c52f343453d62d$export$8d051b38c9118094(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
function $24c52f343453d62d$export$afc72e2116322959() {
    for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat($24c52f343453d62d$export$8d051b38c9118094(arguments[i]));
    return ar;
}
function $24c52f343453d62d$export$6388937ca91ccae8() {
    for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
    for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
    return r;
}
function $24c52f343453d62d$export$1216008129fb82ed(to, from, pack) {
    if (pack || arguments.length === 2) {
        for(var i = 0, l = from.length, ar; i < l; i++)if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}
function $24c52f343453d62d$export$10c90e4f7922046c(v) {
    return this instanceof $24c52f343453d62d$export$10c90e4f7922046c ? (this.v = v, this) : new $24c52f343453d62d$export$10c90e4f7922046c(v);
}
function $24c52f343453d62d$export$e427f37a30a4de9b(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
    function verb(n) {
        if (g[n]) i[n] = function(v) {
            return new Promise(function(a, b) {
                q.push([
                    n,
                    v,
                    a,
                    b
                ]) > 1 || resume(n, v);
            });
        };
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof $24c52f343453d62d$export$10c90e4f7922046c ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}
function $24c52f343453d62d$export$bbd80228419bb833(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
        return this;
    }, i;
    function verb(n, f) {
        i[n] = o[n] ? function(v) {
            return (p = !p) ? {
                value: $24c52f343453d62d$export$10c90e4f7922046c(o[n](v)),
                done: false
            } : f ? f(v) : v;
        } : f;
    }
}
function $24c52f343453d62d$export$e3b29a3d6162315f(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof $24c52f343453d62d$export$19a8beecd37a4c45 === "function" ? $24c52f343453d62d$export$19a8beecd37a4c45(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
}
function $24c52f343453d62d$export$4fb47efe1390b86f(cooked, raw) {
    if (Object.defineProperty) Object.defineProperty(cooked, "raw", {
        value: raw
    });
    else cooked.raw = raw;
    return cooked;
}
var $24c52f343453d62d$var$__setModuleDefault = Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
};
function $24c52f343453d62d$export$c21735bcef00d192(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) $24c52f343453d62d$export$45d3717a4c69092e(result, mod, k);
    }
    $24c52f343453d62d$var$__setModuleDefault(result, mod);
    return result;
}
function $24c52f343453d62d$export$da59b14a69baef04(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
}
function $24c52f343453d62d$export$d5dcaf168c640c35(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function $24c52f343453d62d$export$d40a35129aaff81f(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function $24c52f343453d62d$export$81fdc39f203e4e04(state, receiver) {
    if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}
var $24c52f343453d62d$export$2e2bcd8739ae039 = {
    __extends: $24c52f343453d62d$export$a8ba968b8961cb8a,
    __assign: $24c52f343453d62d$export$18ce0697a983be9b,
    __rest: $24c52f343453d62d$export$3c9a16f847548506,
    __decorate: $24c52f343453d62d$export$29e00dfd3077644b,
    __param: $24c52f343453d62d$export$d5ad3fd78186038f,
    __metadata: $24c52f343453d62d$export$f1db080c865becb9,
    __awaiter: $24c52f343453d62d$export$1050f835b63b671e,
    __generator: $24c52f343453d62d$export$67ebef60e6f28a6,
    __createBinding: $24c52f343453d62d$export$45d3717a4c69092e,
    __exportStar: $24c52f343453d62d$export$f33643c0debef087,
    __values: $24c52f343453d62d$export$19a8beecd37a4c45,
    __read: $24c52f343453d62d$export$8d051b38c9118094,
    __spread: $24c52f343453d62d$export$afc72e2116322959,
    __spreadArrays: $24c52f343453d62d$export$6388937ca91ccae8,
    __spreadArray: $24c52f343453d62d$export$1216008129fb82ed,
    __await: $24c52f343453d62d$export$10c90e4f7922046c,
    __asyncGenerator: $24c52f343453d62d$export$e427f37a30a4de9b,
    __asyncDelegator: $24c52f343453d62d$export$bbd80228419bb833,
    __asyncValues: $24c52f343453d62d$export$e3b29a3d6162315f,
    __makeTemplateObject: $24c52f343453d62d$export$4fb47efe1390b86f,
    __importStar: $24c52f343453d62d$export$c21735bcef00d192,
    __importDefault: $24c52f343453d62d$export$da59b14a69baef04,
    __classPrivateFieldGet: $24c52f343453d62d$export$d5dcaf168c640c35,
    __classPrivateFieldSet: $24c52f343453d62d$export$d40a35129aaff81f,
    __classPrivateFieldIn: $24c52f343453d62d$export$81fdc39f203e4e04
};


/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $def2de46b9306e8a$var$t = window, $def2de46b9306e8a$export$b4d10f6001c083c2 = $def2de46b9306e8a$var$t.ShadowRoot && (void 0 === $def2de46b9306e8a$var$t.ShadyCSS || $def2de46b9306e8a$var$t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, $def2de46b9306e8a$var$s = Symbol(), $def2de46b9306e8a$var$n = new WeakMap;
class $def2de46b9306e8a$export$505d1e8739bad805 {
    constructor(t, e, n){
        if (this._$cssResult$ = !0, n !== $def2de46b9306e8a$var$s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = t, this.t = e;
    }
    get styleSheet() {
        let t = this.o;
        const s = this.t;
        if ($def2de46b9306e8a$export$b4d10f6001c083c2 && void 0 === t) {
            const e = void 0 !== s && 1 === s.length;
            e && (t = $def2de46b9306e8a$var$n.get(s)), void 0 === t && ((this.o = t = new CSSStyleSheet).replaceSync(this.cssText), e && $def2de46b9306e8a$var$n.set(s, t));
        }
        return t;
    }
    toString() {
        return this.cssText;
    }
}
const $def2de46b9306e8a$export$8d80f9cac07cdb3 = (t)=>new $def2de46b9306e8a$export$505d1e8739bad805("string" == typeof t ? t : t + "", void 0, $def2de46b9306e8a$var$s), $def2de46b9306e8a$export$dbf350e5966cf602 = (t, ...e)=>{
    const n = 1 === t.length ? t[0] : e.reduce((e, s, n)=>e + ((t)=>{
            if (!0 === t._$cssResult$) return t.cssText;
            if ("number" == typeof t) return t;
            throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
        })(s) + t[n + 1], t[0]);
    return new $def2de46b9306e8a$export$505d1e8739bad805(n, t, $def2de46b9306e8a$var$s);
}, $def2de46b9306e8a$export$2ca4a66ec4cecb90 = (s, n)=>{
    $def2de46b9306e8a$export$b4d10f6001c083c2 ? s.adoptedStyleSheets = n.map((t)=>t instanceof CSSStyleSheet ? t : t.styleSheet) : n.forEach((e)=>{
        const n = document.createElement("style"), o = $def2de46b9306e8a$var$t.litNonce;
        void 0 !== o && n.setAttribute("nonce", o), n.textContent = e.cssText, s.appendChild(n);
    });
}, $def2de46b9306e8a$export$ee69dfd951e24778 = $def2de46b9306e8a$export$b4d10f6001c083c2 ? (t)=>t : (t)=>t instanceof CSSStyleSheet ? ((t)=>{
        let e = "";
        for (const s of t.cssRules)e += s.cssText;
        return $def2de46b9306e8a$export$8d80f9cac07cdb3(e);
    })(t) : t;


/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var $19fe8e3abedf4df0$var$s;
const $19fe8e3abedf4df0$var$e = window, $19fe8e3abedf4df0$var$r = $19fe8e3abedf4df0$var$e.trustedTypes, $19fe8e3abedf4df0$var$h = $19fe8e3abedf4df0$var$r ? $19fe8e3abedf4df0$var$r.emptyScript : "", $19fe8e3abedf4df0$var$o = $19fe8e3abedf4df0$var$e.reactiveElementPolyfillSupport, $19fe8e3abedf4df0$export$7312b35fbf521afb = {
    toAttribute (t, i) {
        switch(i){
            case Boolean:
                t = t ? $19fe8e3abedf4df0$var$h : null;
                break;
            case Object:
            case Array:
                t = null == t ? t : JSON.stringify(t);
        }
        return t;
    },
    fromAttribute (t, i) {
        let s = t;
        switch(i){
            case Boolean:
                s = null !== t;
                break;
            case Number:
                s = null === t ? null : Number(t);
                break;
            case Object:
            case Array:
                try {
                    s = JSON.parse(t);
                } catch (t) {
                    s = null;
                }
        }
        return s;
    }
}, $19fe8e3abedf4df0$export$53a6892c50694894 = (t, i)=>i !== t && (i == i || t == t), $19fe8e3abedf4df0$var$l = {
    attribute: !0,
    type: String,
    converter: $19fe8e3abedf4df0$export$7312b35fbf521afb,
    reflect: !1,
    hasChanged: $19fe8e3abedf4df0$export$53a6892c50694894
}, $19fe8e3abedf4df0$var$d = "finalized";
class $19fe8e3abedf4df0$export$c7c07a37856565d extends HTMLElement {
    constructor(){
        super(), this._$Ei = new Map, this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
    }
    static addInitializer(t) {
        var i;
        this.finalize(), (null !== (i = this.h) && void 0 !== i ? i : this.h = []).push(t);
    }
    static get observedAttributes() {
        this.finalize();
        const t = [];
        return this.elementProperties.forEach((i, s)=>{
            const e = this._$Ep(s, i);
            void 0 !== e && (this._$Ev.set(e, s), t.push(e));
        }), t;
    }
    static createProperty(t, i = $19fe8e3abedf4df0$var$l) {
        if (i.state && (i.attribute = !1), this.finalize(), this.elementProperties.set(t, i), !i.noAccessor && !this.prototype.hasOwnProperty(t)) {
            const s = "symbol" == typeof t ? Symbol() : "__" + t, e = this.getPropertyDescriptor(t, s, i);
            void 0 !== e && Object.defineProperty(this.prototype, t, e);
        }
    }
    static getPropertyDescriptor(t, i, s) {
        return {
            get () {
                return this[i];
            },
            set (e) {
                const r = this[t];
                this[i] = e, this.requestUpdate(t, r, s);
            },
            configurable: !0,
            enumerable: !0
        };
    }
    static getPropertyOptions(t) {
        return this.elementProperties.get(t) || $19fe8e3abedf4df0$var$l;
    }
    static finalize() {
        if (this.hasOwnProperty($19fe8e3abedf4df0$var$d)) return !1;
        this[$19fe8e3abedf4df0$var$d] = !0;
        const t = Object.getPrototypeOf(this);
        if (t.finalize(), void 0 !== t.h && (this.h = [
            ...t.h
        ]), this.elementProperties = new Map(t.elementProperties), this._$Ev = new Map, this.hasOwnProperty("properties")) {
            const t = this.properties, i = [
                ...Object.getOwnPropertyNames(t),
                ...Object.getOwnPropertySymbols(t)
            ];
            for (const s of i)this.createProperty(s, t[s]);
        }
        return this.elementStyles = this.finalizeStyles(this.styles), !0;
    }
    static finalizeStyles(i) {
        const s = [];
        if (Array.isArray(i)) {
            const e = new Set(i.flat(1 / 0).reverse());
            for (const i of e)s.unshift((0, $def2de46b9306e8a$export$ee69dfd951e24778)(i));
        } else void 0 !== i && s.push((0, $def2de46b9306e8a$export$ee69dfd951e24778)(i));
        return s;
    }
    static _$Ep(t, i) {
        const s = i.attribute;
        return !1 === s ? void 0 : "string" == typeof s ? s : "string" == typeof t ? t.toLowerCase() : void 0;
    }
    u() {
        var t;
        this._$E_ = new Promise((t)=>this.enableUpdating = t), this._$AL = new Map, this._$Eg(), this.requestUpdate(), null === (t = this.constructor.h) || void 0 === t || t.forEach((t)=>t(this));
    }
    addController(t) {
        var i, s;
        (null !== (i = this._$ES) && void 0 !== i ? i : this._$ES = []).push(t), void 0 !== this.renderRoot && this.isConnected && (null === (s = t.hostConnected) || void 0 === s || s.call(t));
    }
    removeController(t) {
        var i;
        null === (i = this._$ES) || void 0 === i || i.splice(this._$ES.indexOf(t) >>> 0, 1);
    }
    _$Eg() {
        this.constructor.elementProperties.forEach((t, i)=>{
            this.hasOwnProperty(i) && (this._$Ei.set(i, this[i]), delete this[i]);
        });
    }
    createRenderRoot() {
        var t;
        const s = null !== (t = this.shadowRoot) && void 0 !== t ? t : this.attachShadow(this.constructor.shadowRootOptions);
        return (0, $def2de46b9306e8a$export$2ca4a66ec4cecb90)(s, this.constructor.elementStyles), s;
    }
    connectedCallback() {
        var t;
        void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), null === (t = this._$ES) || void 0 === t || t.forEach((t)=>{
            var i;
            return null === (i = t.hostConnected) || void 0 === i ? void 0 : i.call(t);
        });
    }
    enableUpdating(t) {}
    disconnectedCallback() {
        var t;
        null === (t = this._$ES) || void 0 === t || t.forEach((t)=>{
            var i;
            return null === (i = t.hostDisconnected) || void 0 === i ? void 0 : i.call(t);
        });
    }
    attributeChangedCallback(t, i, s) {
        this._$AK(t, s);
    }
    _$EO(t, i, s = $19fe8e3abedf4df0$var$l) {
        var e;
        const r = this.constructor._$Ep(t, s);
        if (void 0 !== r && !0 === s.reflect) {
            const h = (void 0 !== (null === (e = s.converter) || void 0 === e ? void 0 : e.toAttribute) ? s.converter : $19fe8e3abedf4df0$export$7312b35fbf521afb).toAttribute(i, s.type);
            this._$El = t, null == h ? this.removeAttribute(r) : this.setAttribute(r, h), this._$El = null;
        }
    }
    _$AK(t, i) {
        var s;
        const e = this.constructor, r = e._$Ev.get(t);
        if (void 0 !== r && this._$El !== r) {
            const t = e.getPropertyOptions(r), h = "function" == typeof t.converter ? {
                fromAttribute: t.converter
            } : void 0 !== (null === (s = t.converter) || void 0 === s ? void 0 : s.fromAttribute) ? t.converter : $19fe8e3abedf4df0$export$7312b35fbf521afb;
            this._$El = r, this[r] = h.fromAttribute(i, t.type), this._$El = null;
        }
    }
    requestUpdate(t, i, s) {
        let e = !0;
        void 0 !== t && (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || $19fe8e3abedf4df0$export$53a6892c50694894)(this[t], i) ? (this._$AL.has(t) || this._$AL.set(t, i), !0 === s.reflect && this._$El !== t && (void 0 === this._$EC && (this._$EC = new Map), this._$EC.set(t, s))) : e = !1), !this.isUpdatePending && e && (this._$E_ = this._$Ej());
    }
    async _$Ej() {
        this.isUpdatePending = !0;
        try {
            await this._$E_;
        } catch (t) {
            Promise.reject(t);
        }
        const t = this.scheduleUpdate();
        return null != t && await t, !this.isUpdatePending;
    }
    scheduleUpdate() {
        return this.performUpdate();
    }
    performUpdate() {
        var t;
        if (!this.isUpdatePending) return;
        this.hasUpdated, this._$Ei && (this._$Ei.forEach((t, i)=>this[i] = t), this._$Ei = void 0);
        let i = !1;
        const s = this._$AL;
        try {
            i = this.shouldUpdate(s), i ? (this.willUpdate(s), null === (t = this._$ES) || void 0 === t || t.forEach((t)=>{
                var i;
                return null === (i = t.hostUpdate) || void 0 === i ? void 0 : i.call(t);
            }), this.update(s)) : this._$Ek();
        } catch (t) {
            throw i = !1, this._$Ek(), t;
        }
        i && this._$AE(s);
    }
    willUpdate(t) {}
    _$AE(t) {
        var i;
        null === (i = this._$ES) || void 0 === i || i.forEach((t)=>{
            var i;
            return null === (i = t.hostUpdated) || void 0 === i ? void 0 : i.call(t);
        }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
    }
    _$Ek() {
        this._$AL = new Map, this.isUpdatePending = !1;
    }
    get updateComplete() {
        return this.getUpdateComplete();
    }
    getUpdateComplete() {
        return this._$E_;
    }
    shouldUpdate(t) {
        return !0;
    }
    update(t) {
        void 0 !== this._$EC && (this._$EC.forEach((t, i)=>this._$EO(i, this[i], t)), this._$EC = void 0), this._$Ek();
    }
    updated(t) {}
    firstUpdated(t) {}
}
$19fe8e3abedf4df0$export$c7c07a37856565d[$19fe8e3abedf4df0$var$d] = !0, $19fe8e3abedf4df0$export$c7c07a37856565d.elementProperties = new Map, $19fe8e3abedf4df0$export$c7c07a37856565d.elementStyles = [], $19fe8e3abedf4df0$export$c7c07a37856565d.shadowRootOptions = {
    mode: "open"
}, null == $19fe8e3abedf4df0$var$o || $19fe8e3abedf4df0$var$o({
    ReactiveElement: $19fe8e3abedf4df0$export$c7c07a37856565d
}), (null !== ($19fe8e3abedf4df0$var$s = $19fe8e3abedf4df0$var$e.reactiveElementVersions) && void 0 !== $19fe8e3abedf4df0$var$s ? $19fe8e3abedf4df0$var$s : $19fe8e3abedf4df0$var$e.reactiveElementVersions = []).push("1.6.2");


/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var $f58f44579a4747ac$var$t;
const $f58f44579a4747ac$var$i = window, $f58f44579a4747ac$var$s = $f58f44579a4747ac$var$i.trustedTypes, $f58f44579a4747ac$var$e = $f58f44579a4747ac$var$s ? $f58f44579a4747ac$var$s.createPolicy("lit-html", {
    createHTML: (t)=>t
}) : void 0, $f58f44579a4747ac$var$o = "$lit$", $f58f44579a4747ac$var$n = `lit$${(Math.random() + "").slice(9)}$`, $f58f44579a4747ac$var$l = "?" + $f58f44579a4747ac$var$n, $f58f44579a4747ac$var$h = `<${$f58f44579a4747ac$var$l}>`, $f58f44579a4747ac$var$r = document, $f58f44579a4747ac$var$d = ()=>$f58f44579a4747ac$var$r.createComment(""), $f58f44579a4747ac$var$u = (t)=>null === t || "object" != typeof t && "function" != typeof t, $f58f44579a4747ac$var$c = Array.isArray, $f58f44579a4747ac$var$v = (t)=>$f58f44579a4747ac$var$c(t) || "function" == typeof (null == t ? void 0 : t[Symbol.iterator]), $f58f44579a4747ac$var$a = "[ 	\n\f\r]", $f58f44579a4747ac$var$f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, $f58f44579a4747ac$var$_ = /-->/g, $f58f44579a4747ac$var$m = />/g, $f58f44579a4747ac$var$p = RegExp(`>|${$f58f44579a4747ac$var$a}(?:([^\\s"'>=/]+)(${$f58f44579a4747ac$var$a}*=${$f58f44579a4747ac$var$a}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), $f58f44579a4747ac$var$g = /'/g, $f58f44579a4747ac$var$$ = /"/g, $f58f44579a4747ac$var$y = /^(?:script|style|textarea|title)$/i, $f58f44579a4747ac$var$w = (t)=>(i, ...s)=>({
            _$litType$: t,
            strings: i,
            values: s
        }), $f58f44579a4747ac$export$c0bb0b647f701bb5 = $f58f44579a4747ac$var$w(1), $f58f44579a4747ac$export$7ed1367e7fa1ad68 = $f58f44579a4747ac$var$w(2), $f58f44579a4747ac$export$9c068ae9cc5db4e8 = Symbol.for("lit-noChange"), $f58f44579a4747ac$export$45b790e32b2810ee = Symbol.for("lit-nothing"), $f58f44579a4747ac$var$E = new WeakMap, $f58f44579a4747ac$var$C = $f58f44579a4747ac$var$r.createTreeWalker($f58f44579a4747ac$var$r, 129, null, !1), $f58f44579a4747ac$var$P = (t, i)=>{
    const s = t.length - 1, l = [];
    let r, d = 2 === i ? "<svg>" : "", u = $f58f44579a4747ac$var$f;
    for(let i = 0; i < s; i++){
        const s = t[i];
        let e, c, v = -1, a = 0;
        for(; a < s.length && (u.lastIndex = a, c = u.exec(s), null !== c);)a = u.lastIndex, u === $f58f44579a4747ac$var$f ? "!--" === c[1] ? u = $f58f44579a4747ac$var$_ : void 0 !== c[1] ? u = $f58f44579a4747ac$var$m : void 0 !== c[2] ? ($f58f44579a4747ac$var$y.test(c[2]) && (r = RegExp("</" + c[2], "g")), u = $f58f44579a4747ac$var$p) : void 0 !== c[3] && (u = $f58f44579a4747ac$var$p) : u === $f58f44579a4747ac$var$p ? ">" === c[0] ? (u = null != r ? r : $f58f44579a4747ac$var$f, v = -1) : void 0 === c[1] ? v = -2 : (v = u.lastIndex - c[2].length, e = c[1], u = void 0 === c[3] ? $f58f44579a4747ac$var$p : '"' === c[3] ? $f58f44579a4747ac$var$$ : $f58f44579a4747ac$var$g) : u === $f58f44579a4747ac$var$$ || u === $f58f44579a4747ac$var$g ? u = $f58f44579a4747ac$var$p : u === $f58f44579a4747ac$var$_ || u === $f58f44579a4747ac$var$m ? u = $f58f44579a4747ac$var$f : (u = $f58f44579a4747ac$var$p, r = void 0);
        const w = u === $f58f44579a4747ac$var$p && t[i + 1].startsWith("/>") ? " " : "";
        d += u === $f58f44579a4747ac$var$f ? s + $f58f44579a4747ac$var$h : v >= 0 ? (l.push(e), s.slice(0, v) + $f58f44579a4747ac$var$o + s.slice(v) + $f58f44579a4747ac$var$n + w) : s + $f58f44579a4747ac$var$n + (-2 === v ? (l.push(void 0), i) : w);
    }
    const c = d + (t[s] || "<?>") + (2 === i ? "</svg>" : "");
    if (!Array.isArray(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return [
        void 0 !== $f58f44579a4747ac$var$e ? $f58f44579a4747ac$var$e.createHTML(c) : c,
        l
    ];
};
class $f58f44579a4747ac$var$V {
    constructor({ strings: t , _$litType$: i  }, e){
        let h;
        this.parts = [];
        let r = 0, u = 0;
        const c = t.length - 1, v = this.parts, [a, f] = $f58f44579a4747ac$var$P(t, i);
        if (this.el = $f58f44579a4747ac$var$V.createElement(a, e), $f58f44579a4747ac$var$C.currentNode = this.el.content, 2 === i) {
            const t = this.el.content, i = t.firstChild;
            i.remove(), t.append(...i.childNodes);
        }
        for(; null !== (h = $f58f44579a4747ac$var$C.nextNode()) && v.length < c;){
            if (1 === h.nodeType) {
                if (h.hasAttributes()) {
                    const t = [];
                    for (const i of h.getAttributeNames())if (i.endsWith($f58f44579a4747ac$var$o) || i.startsWith($f58f44579a4747ac$var$n)) {
                        const s = f[u++];
                        if (t.push(i), void 0 !== s) {
                            const t = h.getAttribute(s.toLowerCase() + $f58f44579a4747ac$var$o).split($f58f44579a4747ac$var$n), i = /([.?@])?(.*)/.exec(s);
                            v.push({
                                type: 1,
                                index: r,
                                name: i[2],
                                strings: t,
                                ctor: "." === i[1] ? $f58f44579a4747ac$var$k : "?" === i[1] ? $f58f44579a4747ac$var$I : "@" === i[1] ? $f58f44579a4747ac$var$L : $f58f44579a4747ac$var$R
                            });
                        } else v.push({
                            type: 6,
                            index: r
                        });
                    }
                    for (const i of t)h.removeAttribute(i);
                }
                if ($f58f44579a4747ac$var$y.test(h.tagName)) {
                    const t = h.textContent.split($f58f44579a4747ac$var$n), i = t.length - 1;
                    if (i > 0) {
                        h.textContent = $f58f44579a4747ac$var$s ? $f58f44579a4747ac$var$s.emptyScript : "";
                        for(let s = 0; s < i; s++)h.append(t[s], $f58f44579a4747ac$var$d()), $f58f44579a4747ac$var$C.nextNode(), v.push({
                            type: 2,
                            index: ++r
                        });
                        h.append(t[i], $f58f44579a4747ac$var$d());
                    }
                }
            } else if (8 === h.nodeType) {
                if (h.data === $f58f44579a4747ac$var$l) v.push({
                    type: 2,
                    index: r
                });
                else {
                    let t = -1;
                    for(; -1 !== (t = h.data.indexOf($f58f44579a4747ac$var$n, t + 1));)v.push({
                        type: 7,
                        index: r
                    }), t += $f58f44579a4747ac$var$n.length - 1;
                }
            }
            r++;
        }
    }
    static createElement(t, i) {
        const s = $f58f44579a4747ac$var$r.createElement("template");
        return s.innerHTML = t, s;
    }
}
function $f58f44579a4747ac$var$N(t, i, s = t, e) {
    var o, n, l, h;
    if (i === $f58f44579a4747ac$export$9c068ae9cc5db4e8) return i;
    let r = void 0 !== e ? null === (o = s._$Co) || void 0 === o ? void 0 : o[e] : s._$Cl;
    const d = $f58f44579a4747ac$var$u(i) ? void 0 : i._$litDirective$;
    return (null == r ? void 0 : r.constructor) !== d && (null === (n = null == r ? void 0 : r._$AO) || void 0 === n || n.call(r, !1), void 0 === d ? r = void 0 : (r = new d(t), r._$AT(t, s, e)), void 0 !== e ? (null !== (l = (h = s)._$Co) && void 0 !== l ? l : h._$Co = [])[e] = r : s._$Cl = r), void 0 !== r && (i = $f58f44579a4747ac$var$N(t, r._$AS(t, i.values), r, e)), i;
}
class $f58f44579a4747ac$var$S {
    constructor(t, i){
        this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
    }
    get parentNode() {
        return this._$AM.parentNode;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    u(t) {
        var i;
        const { el: { content: s  } , parts: e  } = this._$AD, o = (null !== (i = null == t ? void 0 : t.creationScope) && void 0 !== i ? i : $f58f44579a4747ac$var$r).importNode(s, !0);
        $f58f44579a4747ac$var$C.currentNode = o;
        let n = $f58f44579a4747ac$var$C.nextNode(), l = 0, h = 0, d = e[0];
        for(; void 0 !== d;){
            if (l === d.index) {
                let i;
                2 === d.type ? i = new $f58f44579a4747ac$var$M(n, n.nextSibling, this, t) : 1 === d.type ? i = new d.ctor(n, d.name, d.strings, this, t) : 6 === d.type && (i = new $f58f44579a4747ac$var$z(n, this, t)), this._$AV.push(i), d = e[++h];
            }
            l !== (null == d ? void 0 : d.index) && (n = $f58f44579a4747ac$var$C.nextNode(), l++);
        }
        return $f58f44579a4747ac$var$C.currentNode = $f58f44579a4747ac$var$r, o;
    }
    v(t) {
        let i = 0;
        for (const s of this._$AV)void 0 !== s && (void 0 !== s.strings ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
    }
}
class $f58f44579a4747ac$var$M {
    constructor(t, i, s, e){
        var o;
        this.type = 2, this._$AH = $f58f44579a4747ac$export$45b790e32b2810ee, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this._$Cp = null === (o = null == e ? void 0 : e.isConnected) || void 0 === o || o;
    }
    get _$AU() {
        var t, i;
        return null !== (i = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) && void 0 !== i ? i : this._$Cp;
    }
    get parentNode() {
        let t = this._$AA.parentNode;
        const i = this._$AM;
        return void 0 !== i && 11 === (null == t ? void 0 : t.nodeType) && (t = i.parentNode), t;
    }
    get startNode() {
        return this._$AA;
    }
    get endNode() {
        return this._$AB;
    }
    _$AI(t, i = this) {
        t = $f58f44579a4747ac$var$N(this, t, i), $f58f44579a4747ac$var$u(t) ? t === $f58f44579a4747ac$export$45b790e32b2810ee || null == t || "" === t ? (this._$AH !== $f58f44579a4747ac$export$45b790e32b2810ee && this._$AR(), this._$AH = $f58f44579a4747ac$export$45b790e32b2810ee) : t !== this._$AH && t !== $f58f44579a4747ac$export$9c068ae9cc5db4e8 && this._(t) : void 0 !== t._$litType$ ? this.g(t) : void 0 !== t.nodeType ? this.$(t) : $f58f44579a4747ac$var$v(t) ? this.T(t) : this._(t);
    }
    k(t) {
        return this._$AA.parentNode.insertBefore(t, this._$AB);
    }
    $(t) {
        this._$AH !== t && (this._$AR(), this._$AH = this.k(t));
    }
    _(t) {
        this._$AH !== $f58f44579a4747ac$export$45b790e32b2810ee && $f58f44579a4747ac$var$u(this._$AH) ? this._$AA.nextSibling.data = t : this.$($f58f44579a4747ac$var$r.createTextNode(t)), this._$AH = t;
    }
    g(t) {
        var i;
        const { values: s , _$litType$: e  } = t, o = "number" == typeof e ? this._$AC(t) : (void 0 === e.el && (e.el = $f58f44579a4747ac$var$V.createElement(e.h, this.options)), e);
        if ((null === (i = this._$AH) || void 0 === i ? void 0 : i._$AD) === o) this._$AH.v(s);
        else {
            const t = new $f58f44579a4747ac$var$S(o, this), i = t.u(this.options);
            t.v(s), this.$(i), this._$AH = t;
        }
    }
    _$AC(t) {
        let i = $f58f44579a4747ac$var$E.get(t.strings);
        return void 0 === i && $f58f44579a4747ac$var$E.set(t.strings, i = new $f58f44579a4747ac$var$V(t)), i;
    }
    T(t) {
        $f58f44579a4747ac$var$c(this._$AH) || (this._$AH = [], this._$AR());
        const i = this._$AH;
        let s, e = 0;
        for (const o of t)e === i.length ? i.push(s = new $f58f44579a4747ac$var$M(this.k($f58f44579a4747ac$var$d()), this.k($f58f44579a4747ac$var$d()), this, this.options)) : s = i[e], s._$AI(o), e++;
        e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e);
    }
    _$AR(t = this._$AA.nextSibling, i) {
        var s;
        for(null === (s = this._$AP) || void 0 === s || s.call(this, !1, !0, i); t && t !== this._$AB;){
            const i = t.nextSibling;
            t.remove(), t = i;
        }
    }
    setConnected(t) {
        var i;
        void 0 === this._$AM && (this._$Cp = t, null === (i = this._$AP) || void 0 === i || i.call(this, t));
    }
}
class $f58f44579a4747ac$var$R {
    constructor(t, i, s, e, o){
        this.type = 1, this._$AH = $f58f44579a4747ac$export$45b790e32b2810ee, this._$AN = void 0, this.element = t, this.name = i, this._$AM = e, this.options = o, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this._$AH = Array(s.length - 1).fill(new String), this.strings = s) : this._$AH = $f58f44579a4747ac$export$45b790e32b2810ee;
    }
    get tagName() {
        return this.element.tagName;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    _$AI(t, i = this, s, e) {
        const o = this.strings;
        let n = !1;
        if (void 0 === o) t = $f58f44579a4747ac$var$N(this, t, i, 0), n = !$f58f44579a4747ac$var$u(t) || t !== this._$AH && t !== $f58f44579a4747ac$export$9c068ae9cc5db4e8, n && (this._$AH = t);
        else {
            const e = t;
            let l, h;
            for(t = o[0], l = 0; l < o.length - 1; l++)h = $f58f44579a4747ac$var$N(this, e[s + l], i, l), h === $f58f44579a4747ac$export$9c068ae9cc5db4e8 && (h = this._$AH[l]), n || (n = !$f58f44579a4747ac$var$u(h) || h !== this._$AH[l]), h === $f58f44579a4747ac$export$45b790e32b2810ee ? t = $f58f44579a4747ac$export$45b790e32b2810ee : t !== $f58f44579a4747ac$export$45b790e32b2810ee && (t += (null != h ? h : "") + o[l + 1]), this._$AH[l] = h;
        }
        n && !e && this.j(t);
    }
    j(t) {
        t === $f58f44579a4747ac$export$45b790e32b2810ee ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t ? t : "");
    }
}
class $f58f44579a4747ac$var$k extends $f58f44579a4747ac$var$R {
    constructor(){
        super(...arguments), this.type = 3;
    }
    j(t) {
        this.element[this.name] = t === $f58f44579a4747ac$export$45b790e32b2810ee ? void 0 : t;
    }
}
const $f58f44579a4747ac$var$H = $f58f44579a4747ac$var$s ? $f58f44579a4747ac$var$s.emptyScript : "";
class $f58f44579a4747ac$var$I extends $f58f44579a4747ac$var$R {
    constructor(){
        super(...arguments), this.type = 4;
    }
    j(t) {
        t && t !== $f58f44579a4747ac$export$45b790e32b2810ee ? this.element.setAttribute(this.name, $f58f44579a4747ac$var$H) : this.element.removeAttribute(this.name);
    }
}
class $f58f44579a4747ac$var$L extends $f58f44579a4747ac$var$R {
    constructor(t, i, s, e, o){
        super(t, i, s, e, o), this.type = 5;
    }
    _$AI(t, i = this) {
        var s;
        if ((t = null !== (s = $f58f44579a4747ac$var$N(this, t, i, 0)) && void 0 !== s ? s : $f58f44579a4747ac$export$45b790e32b2810ee) === $f58f44579a4747ac$export$9c068ae9cc5db4e8) return;
        const e = this._$AH, o = t === $f58f44579a4747ac$export$45b790e32b2810ee && e !== $f58f44579a4747ac$export$45b790e32b2810ee || t.capture !== e.capture || t.once !== e.once || t.passive !== e.passive, n = t !== $f58f44579a4747ac$export$45b790e32b2810ee && (e === $f58f44579a4747ac$export$45b790e32b2810ee || o);
        o && this.element.removeEventListener(this.name, this, e), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
    }
    handleEvent(t) {
        var i, s;
        "function" == typeof this._$AH ? this._$AH.call(null !== (s = null === (i = this.options) || void 0 === i ? void 0 : i.host) && void 0 !== s ? s : this.element, t) : this._$AH.handleEvent(t);
    }
}
class $f58f44579a4747ac$var$z {
    constructor(t, i, s){
        this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    _$AI(t) {
        $f58f44579a4747ac$var$N(this, t);
    }
}
const $f58f44579a4747ac$export$8613d1ca9052b22e = {
    O: $f58f44579a4747ac$var$o,
    P: $f58f44579a4747ac$var$n,
    A: $f58f44579a4747ac$var$l,
    C: 1,
    M: $f58f44579a4747ac$var$P,
    L: $f58f44579a4747ac$var$S,
    D: $f58f44579a4747ac$var$v,
    R: $f58f44579a4747ac$var$N,
    I: $f58f44579a4747ac$var$M,
    V: $f58f44579a4747ac$var$R,
    H: $f58f44579a4747ac$var$I,
    N: $f58f44579a4747ac$var$L,
    U: $f58f44579a4747ac$var$k,
    F: $f58f44579a4747ac$var$z
}, $f58f44579a4747ac$var$j = $f58f44579a4747ac$var$i.litHtmlPolyfillSupport;
null == $f58f44579a4747ac$var$j || $f58f44579a4747ac$var$j($f58f44579a4747ac$var$V, $f58f44579a4747ac$var$M), (null !== ($f58f44579a4747ac$var$t = $f58f44579a4747ac$var$i.litHtmlVersions) && void 0 !== $f58f44579a4747ac$var$t ? $f58f44579a4747ac$var$t : $f58f44579a4747ac$var$i.litHtmlVersions = []).push("2.7.4");
const $f58f44579a4747ac$export$b3890eb0ae9dca99 = (t, i, s)=>{
    var e, o;
    const n = null !== (e = null == s ? void 0 : s.renderBefore) && void 0 !== e ? e : i;
    let l = n._$litPart$;
    if (void 0 === l) {
        const t = null !== (o = null == s ? void 0 : s.renderBefore) && void 0 !== o ? o : null;
        n._$litPart$ = l = new $f58f44579a4747ac$var$M(i.insertBefore($f58f44579a4747ac$var$d(), t), t, void 0, null != s ? s : {});
    }
    return l._$AI(t), l;
};




/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var $ab210b2da7b39b9d$var$l, $ab210b2da7b39b9d$var$o;
const $ab210b2da7b39b9d$export$8bf27daf9e8907c9 = (0, $19fe8e3abedf4df0$export$c7c07a37856565d);
class $ab210b2da7b39b9d$export$3f2f9f5909897157 extends (0, $19fe8e3abedf4df0$export$c7c07a37856565d) {
    constructor(){
        super(...arguments), this.renderOptions = {
            host: this
        }, this._$Do = void 0;
    }
    createRenderRoot() {
        var t, e;
        const i = super.createRenderRoot();
        return null !== (t = (e = this.renderOptions).renderBefore) && void 0 !== t || (e.renderBefore = i.firstChild), i;
    }
    update(t) {
        const i = this.render();
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = (0, $f58f44579a4747ac$export$b3890eb0ae9dca99)(i, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
        var t;
        super.connectedCallback(), null === (t = this._$Do) || void 0 === t || t.setConnected(!0);
    }
    disconnectedCallback() {
        var t;
        super.disconnectedCallback(), null === (t = this._$Do) || void 0 === t || t.setConnected(!1);
    }
    render() {
        return 0, $f58f44579a4747ac$export$9c068ae9cc5db4e8;
    }
}
$ab210b2da7b39b9d$export$3f2f9f5909897157.finalized = !0, $ab210b2da7b39b9d$export$3f2f9f5909897157._$litElement$ = !0, null === ($ab210b2da7b39b9d$var$l = globalThis.litElementHydrateSupport) || void 0 === $ab210b2da7b39b9d$var$l || $ab210b2da7b39b9d$var$l.call(globalThis, {
    LitElement: $ab210b2da7b39b9d$export$3f2f9f5909897157
});
const $ab210b2da7b39b9d$var$n = globalThis.litElementPolyfillSupport;
null == $ab210b2da7b39b9d$var$n || $ab210b2da7b39b9d$var$n({
    LitElement: $ab210b2da7b39b9d$export$3f2f9f5909897157
});
const $ab210b2da7b39b9d$export$f5c524615a7708d6 = {
    _$AK: (t, e, i)=>{
        t._$AK(e, i);
    },
    _$AL: (t)=>t._$AL
};
(null !== ($ab210b2da7b39b9d$var$o = globalThis.litElementVersions) && void 0 !== $ab210b2da7b39b9d$var$o ? $ab210b2da7b39b9d$var$o : globalThis.litElementVersions = []).push("3.3.2");


/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $a00bca1a101a9088$export$6acf61af03e62db = !1;




/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $14742f68afc766d6$export$da64fc29f17f9d0e = (e)=>(n)=>"function" == typeof n ? ((e, n)=>(customElements.define(e, n), n))(e, n) : ((e, n)=>{
            const { kind: t , elements: s  } = n;
            return {
                kind: t,
                elements: s,
                finisher (n) {
                    customElements.define(e, n);
                }
            };
        })(e, n);


/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $9cd908ed2625c047$var$i = (i, e)=>"method" === e.kind && e.descriptor && !("value" in e.descriptor) ? {
        ...e,
        finisher (n) {
            n.createProperty(e.key, i);
        }
    } : {
        kind: "field",
        key: Symbol(),
        placement: "own",
        descriptor: {},
        originalKey: e.key,
        initializer () {
            "function" == typeof e.initializer && (this[e.key] = e.initializer.call(this));
        },
        finisher (n) {
            n.createProperty(e.key, i);
        }
    }, $9cd908ed2625c047$var$e = (i, e, n)=>{
    e.constructor.createProperty(n, i);
};
function $9cd908ed2625c047$export$d541bacb2bda4494(n) {
    return (t, o)=>void 0 !== o ? $9cd908ed2625c047$var$e(n, t, o) : $9cd908ed2625c047$var$i(n, t);
}



/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $04c21ea1ce1f6057$export$ca000e230c0caa3e(t) {
    return (0, $9cd908ed2625c047$export$d541bacb2bda4494)({
        ...t,
        state: !0
    });
}


/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $25e9c5a8f7ecfc69$export$29fd0ed4087278b5 = (e, t, o)=>{
    Object.defineProperty(t, o, e);
}, $25e9c5a8f7ecfc69$export$18eb0154d0069a01 = (e, t)=>({
        kind: "method",
        placement: "prototype",
        key: t.key,
        descriptor: e
    }), $25e9c5a8f7ecfc69$export$757d561a932dc1cb = ({ finisher: e , descriptor: t  })=>(o, n)=>{
        var r;
        if (void 0 === n) {
            const n = null !== (r = o.originalKey) && void 0 !== r ? r : o.key, i = null != t ? {
                kind: "method",
                placement: "prototype",
                key: n,
                descriptor: t(o.key)
            } : {
                ...o,
                key: n
            };
            return null != e && (i.finisher = function(t) {
                e(t, n);
            }), i;
        }
        {
            const r = o.constructor;
            void 0 !== t && Object.defineProperty(o, n, t(n)), null == e || e(r, n);
        }
    };


/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $b4269277b3c48b0c$export$b2b799818fbabcf3(e) {
    return (0, $25e9c5a8f7ecfc69$export$757d561a932dc1cb)({
        finisher: (r, t)=>{
            Object.assign(r.prototype[t], e);
        }
    });
}



/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $02a1f3a787c54a30$export$2fa187e846a241c4(i, n) {
    return (0, $25e9c5a8f7ecfc69$export$757d561a932dc1cb)({
        descriptor: (o)=>{
            const t = {
                get () {
                    var o, n;
                    return null !== (n = null === (o = this.renderRoot) || void 0 === o ? void 0 : o.querySelector(i)) && void 0 !== n ? n : null;
                },
                enumerable: !0,
                configurable: !0
            };
            if (n) {
                const n = "symbol" == typeof o ? Symbol() : "__" + o;
                t.get = function() {
                    var o, t;
                    return void 0 === this[n] && (this[n] = null !== (t = null === (o = this.renderRoot) || void 0 === o ? void 0 : o.querySelector(i)) && void 0 !== t ? t : null), this[n];
                };
            }
            return t;
        }
    });
}



/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $ed34c589b230c255$export$dcd0d083aa86c355(e) {
    return (0, $25e9c5a8f7ecfc69$export$757d561a932dc1cb)({
        descriptor: (r)=>({
                get () {
                    var r, o;
                    return null !== (o = null === (r = this.renderRoot) || void 0 === r ? void 0 : r.querySelectorAll(e)) && void 0 !== o ? o : [];
                },
                enumerable: !0,
                configurable: !0
            })
    });
}



/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $ea50f1870b80cbec$export$163dfc35cc43f240(e) {
    return (0, $25e9c5a8f7ecfc69$export$757d561a932dc1cb)({
        descriptor: (r)=>({
                async get () {
                    var r;
                    return await this.updateComplete, null === (r = this.renderRoot) || void 0 === r ? void 0 : r.querySelector(e);
                },
                enumerable: !0,
                configurable: !0
            })
    });
}



/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var $563fcf7ce7e6c5aa$var$n;
const $563fcf7ce7e6c5aa$var$e = null != (null === ($563fcf7ce7e6c5aa$var$n = window.HTMLSlotElement) || void 0 === $563fcf7ce7e6c5aa$var$n ? void 0 : $563fcf7ce7e6c5aa$var$n.prototype.assignedElements) ? (o, n)=>o.assignedElements(n) : (o, n)=>o.assignedNodes(n).filter((o)=>o.nodeType === Node.ELEMENT_NODE);
function $563fcf7ce7e6c5aa$export$4682af2d9ee91415(n) {
    const { slot: l , selector: t  } = null != n ? n : {};
    return (0, $25e9c5a8f7ecfc69$export$757d561a932dc1cb)({
        descriptor: (o)=>({
                get () {
                    var o;
                    const r = "slot" + (l ? `[name=${l}]` : ":not([name])"), i = null === (o = this.renderRoot) || void 0 === o ? void 0 : o.querySelector(r), s = null != i ? $563fcf7ce7e6c5aa$var$e(i, n) : [];
                    return t ? s.filter((o)=>o.matches(t)) : s;
                },
                enumerable: !0,
                configurable: !0
            })
    });
}




/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $728f1385dd7bf557$export$1bdbe53f9df1b8(o, n, r) {
    let l, s = o;
    return "object" == typeof o ? (s = o.slot, l = o) : l = {
        flatten: n
    }, r ? (0, $563fcf7ce7e6c5aa$export$4682af2d9ee91415)({
        slot: s,
        flatten: n,
        selector: r
    }) : (0, $25e9c5a8f7ecfc69$export$757d561a932dc1cb)({
        descriptor: (e)=>({
                get () {
                    var e, t;
                    const o = "slot" + (s ? `[name=${s}]` : ":not([name])"), n = null === (e = this.renderRoot) || void 0 === e ? void 0 : e.querySelector(o);
                    return null !== (t = null == n ? void 0 : n.assignedNodes(l)) && void 0 !== t ? t : [];
                },
                enumerable: !0,
                configurable: !0
            })
    });
}




// Code adapted from frontend/src/data/weather.ts to make it useable in custom cards


/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $107bb7d062dde330$export$9ba3b3f20a85bfa = {
    ATTRIBUTE: 1,
    CHILD: 2,
    PROPERTY: 3,
    BOOLEAN_ATTRIBUTE: 4,
    EVENT: 5,
    ELEMENT: 6
}, $107bb7d062dde330$export$99b43ad1ed32e735 = (t)=>(...e)=>({
            _$litDirective$: t,
            values: e
        });
class $107bb7d062dde330$export$befdefbdce210f91 {
    constructor(t){}
    get _$AU() {
        return this._$AM._$AU;
    }
    _$AT(t, e, i) {
        this._$Ct = t, this._$AM = e, this._$Ci = i;
    }
    _$AS(t, e) {
        return this.update(t, e);
    }
    update(t, e) {
        return this.render(...e);
    }
}


/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $19f464fcda7d2482$var$i = "important", $19f464fcda7d2482$var$n = " !" + $19f464fcda7d2482$var$i, $19f464fcda7d2482$export$1e5b4ce2fa884e6a = (0, $107bb7d062dde330$export$99b43ad1ed32e735)(class extends (0, $107bb7d062dde330$export$befdefbdce210f91) {
    constructor(t){
        var e;
        if (super(t), t.type !== (0, $107bb7d062dde330$export$9ba3b3f20a85bfa).ATTRIBUTE || "style" !== t.name || (null === (e = t.strings) || void 0 === e ? void 0 : e.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
    }
    render(t) {
        return Object.keys(t).reduce((e, r)=>{
            const s = t[r];
            return null == s ? e : e + `${r = r.includes("-") ? r : r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s};`;
        }, "");
    }
    update(e, [r]) {
        const { style: s  } = e.element;
        if (void 0 === this.ut) {
            this.ut = new Set;
            for(const t in r)this.ut.add(t);
            return this.render(r);
        }
        this.ut.forEach((t)=>{
            null == r[t] && (this.ut.delete(t), t.includes("-") ? s.removeProperty(t) : s[t] = "");
        });
        for(const t in r){
            const e = r[t];
            if (null != e) {
                this.ut.add(t);
                const r = "string" == typeof e && e.endsWith($19f464fcda7d2482$var$n);
                t.includes("-") || r ? s.setProperty(t, r ? e.slice(0, -11) : e, r ? $19f464fcda7d2482$var$i : "") : s[t] = e;
            }
        }
        return 0, $f58f44579a4747ac$export$9c068ae9cc5db4e8;
    }
});




var $a670ed82a1e76f75$export$8b3032c22c6f26e6;
(function(WeatherEntityFeature) {
    WeatherEntityFeature[WeatherEntityFeature["FORECAST_DAILY"] = 1] = "FORECAST_DAILY";
    WeatherEntityFeature[WeatherEntityFeature["FORECAST_HOURLY"] = 2] = "FORECAST_HOURLY";
    WeatherEntityFeature[WeatherEntityFeature["FORECAST_TWICE_DAILY"] = 4] = "FORECAST_TWICE_DAILY";
})($a670ed82a1e76f75$export$8b3032c22c6f26e6 || ($a670ed82a1e76f75$export$8b3032c22c6f26e6 = {}));
const $a670ed82a1e76f75$export$8f7ca90fe05ed3ab = new Set([
    "clear-night",
    "cloudy",
    "fog",
    "lightning",
    "lightning-rainy",
    "partlycloudy",
    "pouring",
    "rainy",
    "hail",
    "snowy",
    "snowy-rainy",
    "sunny",
    "windy",
    "windy-variant"
]);
const $a670ed82a1e76f75$var$cloudyStates = new Set([
    "partlycloudy",
    "cloudy",
    "fog",
    "windy",
    "windy-variant",
    "hail",
    "rainy",
    "snowy",
    "snowy-rainy",
    "pouring",
    "lightning",
    "lightning-rainy"
]);
const $a670ed82a1e76f75$var$rainStates = new Set([
    "hail",
    "rainy",
    "pouring"
]);
const $a670ed82a1e76f75$var$windyStates = new Set([
    "windy",
    "windy-variant"
]);
const $a670ed82a1e76f75$var$snowyStates = new Set([
    "snowy",
    "snowy-rainy"
]);
const $a670ed82a1e76f75$var$lightningStates = new Set([
    "lightning",
    "lightning-rainy"
]);
const $a670ed82a1e76f75$var$cardinalDirections = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
    "N"
];
const $a670ed82a1e76f75$var$getWindBearingText = (degree)=>{
    const degreenum = typeof degree === "number" ? degree : parseInt(degree, 10);
    if (isFinite(degreenum)) // eslint-disable-next-line no-bitwise
    return $a670ed82a1e76f75$var$cardinalDirections[((degreenum + 11.25) / 22.5 | 0) % 16];
    return typeof degree === "number" ? degree.toString() : degree;
};
const $a670ed82a1e76f75$var$getWindBearing = (bearing)=>{
    if (bearing != null) return $a670ed82a1e76f75$var$getWindBearingText(bearing);
    return "";
};
const $a670ed82a1e76f75$export$101ce0bde894953 = (hass, stateObj, speed, bearing)=>{
    const speedText = speed !== undefined && speed !== null ? hass.formatEntityAttributeValue(stateObj, "wind_speed", speed) : "-";
    if (bearing !== undefined && bearing !== null) {
        const cardinalDirection = $a670ed82a1e76f75$var$getWindBearing(bearing);
        return `${speedText} (${hass.localize(`ui.card.weather.cardinal_direction.${cardinalDirection.toLowerCase()}`) || cardinalDirection})`;
    }
    return speedText;
};
const $a670ed82a1e76f75$export$a94cf610ac0519b4 = (config, stateObj, measure)=>{
    const lengthUnit = config.unit_system.length || "";
    switch(measure){
        case "visibility":
            return stateObj.attributes.visibility_unit || lengthUnit;
        case "precipitation":
            return stateObj.attributes.precipitation_unit || (lengthUnit === "km" ? "mm" : "in");
        case "pressure":
            return stateObj.attributes.pressure_unit || (lengthUnit === "km" ? "hPa" : "inHg");
        case "apparent_temperature":
        case "dew_point":
        case "temperature":
        case "templow":
            return stateObj.attributes.temperature_unit || config.unit_system.temperature;
        case "wind_speed":
            return stateObj.attributes.wind_speed_unit || `${lengthUnit}/h`;
        case "cloud_coverage":
        case "humidity":
        case "precipitation_probability":
            return "%";
        default:
            return config.unit_system[measure] || "";
    }
};
const $a670ed82a1e76f75$export$baa3fcb6fee6ce3a = (hass, stateObj, forecast)=>{
    const extrema = $a670ed82a1e76f75$var$getWeatherExtrema(hass, stateObj, forecast);
    if (extrema) return extrema;
    let value;
    let attribute;
    if (forecast?.length && forecast[0].precipitation !== undefined && forecast[0].precipitation !== null) {
        value = forecast[0].precipitation;
        attribute = "precipitation";
    } else if ("humidity" in stateObj.attributes) {
        value = stateObj.attributes.humidity;
        attribute = "humidity";
    } else return undefined;
    // Disabled so we don't need to import mdi icons
    //const weatherAttrIcon = weatherAttrIcons[attribute];
    var weatherAttrIcon;
    // replaced with default Math.round(), so we don't need HAs own round
    //const roundedValue = round(value, 1);
    const roundedValue = Math.round(value * 10.0) / 10.0;
    return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
    ${weatherAttrIcon ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
          <ha-svg-icon class="attr-icon" .path=${weatherAttrIcon}></ha-svg-icon>
        ` : hass.localize(`ui.card.weather.attributes.${attribute}`)}
    ${hass.formatEntityAttributeValue(stateObj, attribute, roundedValue)}
  `;
};
const $a670ed82a1e76f75$var$getWeatherExtrema = (hass, stateObj, forecast)=>{
    if (!forecast?.length) return undefined;
    let tempLow;
    let tempHigh;
    const today = new Date().getDate();
    for (const fc of forecast){
        if (new Date(fc.datetime).getDate() !== today) break;
        if (!tempHigh || fc.temperature > tempHigh) tempHigh = fc.temperature;
        if (!tempLow || fc.templow && fc.templow < tempLow) tempLow = fc.templow;
        if (!fc.templow && (!tempLow || fc.temperature < tempLow)) tempLow = fc.temperature;
    }
    if (!tempLow && !tempHigh) return undefined;
    return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
    ${tempHigh ? hass.formatEntityAttributeValue(stateObj, "temperature", tempHigh) : ""}
    ${tempLow && tempHigh ? " / " : ""}
    ${tempLow ? hass.formatEntityAttributeValue(stateObj, "temperature", tempLow) : ""}
  `;
};
// Moved to the custom cards CSS file
//
// export const weatherSVGStyles = css`
//   .rain {
//     fill: var(--weather-icon-rain-color, #30b3ff);
//   }
//   .sun {
//     fill: var(--weather-icon-sun-color, #fdd93c);
//   }
//   .moon {
//     fill: var(--weather-icon-moon-color, #fcf497);
//   }
//   .cloud-back {
//     fill: var(--weather-icon-cloud-back-color, #d4d4d4);
//   }
//   .cloud-front {
//     fill: var(--weather-icon-cloud-front-color, #f9f9f9);
//   }
//   .snow {
//     fill: var(--weather-icon-snow-color, #f9f9f9);
//     stroke: var(--weather-icon-snow-stroke-color, #d4d4d4);
//     stroke-width: 1;
//     paint-order: stroke;
//   }
// `;
const $a670ed82a1e76f75$var$getWeatherStateSVG = (state, nightTime)=>(0, $f58f44579a4747ac$export$7ed1367e7fa1ad68)`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 17 17"
  >
  ${state === "sunny" ? (0, $f58f44579a4747ac$export$7ed1367e7fa1ad68)`
          <path
            class="sun"
            d="m 14.39303,8.4033507 c 0,3.3114723 -2.684145,5.9956173 -5.9956169,5.9956173 -3.3114716,0 -5.9956168,-2.684145 -5.9956168,-5.9956173 0,-3.311471 2.6841452,-5.995617 5.9956168,-5.995617 3.3114719,0 5.9956169,2.684146 5.9956169,5.995617"
          />
        ` : ""}
  ${state === "clear-night" ? (0, $f58f44579a4747ac$export$7ed1367e7fa1ad68)`
          <path
            class="moon"
            d="m 13.502891,11.382935 c -1.011285,1.859223 -2.976664,3.121381 -5.2405751,3.121381 -3.289929,0 -5.953329,-2.663833 -5.953329,-5.9537625 0,-2.263911 1.261724,-4.228856 3.120948,-5.240575 -0.452782,0.842738 -0.712753,1.806363 -0.712753,2.832381 0,3.289928 2.663833,5.9533275 5.9533291,5.9533275 1.026017,0 1.989641,-0.259969 2.83238,-0.712752"
          />
        ` : ""}
  ${state === "partlycloudy" && nightTime ? (0, $f58f44579a4747ac$export$7ed1367e7fa1ad68)`
          <path
            class="moon"
            d="m14.981 4.2112c0 1.9244-1.56 3.4844-3.484 3.4844-1.9244 0-3.4844-1.56-3.4844-3.4844s1.56-3.484 3.4844-3.484c1.924 0 3.484 1.5596 3.484 3.484"
          />
        ` : state === "partlycloudy" ? (0, $f58f44579a4747ac$export$7ed1367e7fa1ad68)`
          <path
            class="sun"
            d="m14.981 4.2112c0 1.9244-1.56 3.4844-3.484 3.4844-1.9244 0-3.4844-1.56-3.4844-3.4844s1.56-3.484 3.4844-3.484c1.924 0 3.484 1.5596 3.484 3.484"
          />
        ` : ""}
  ${$a670ed82a1e76f75$var$cloudyStates.has(state) ? (0, $f58f44579a4747ac$export$7ed1367e7fa1ad68)`
          <path
            class="cloud-back"
            d="m3.8863 5.035c-0.54892 0.16898-1.04 0.46637-1.4372 0.8636-0.63077 0.63041-1.0206 1.4933-1.0206 2.455 0 1.9251 1.5589 3.4682 3.4837 3.4682h6.9688c1.9251 0 3.484-1.5981 3.484-3.5232 0-1.9251-1.5589-3.5232-3.484-3.5232h-1.0834c-0.25294-1.6916-1.6986-2.9083-3.4463-2.9083-1.7995 0-3.2805 1.4153-3.465 3.1679"
          />
          <path
            class="cloud-front"
            d="m4.1996 7.6995c-0.33902 0.10407-0.64276 0.28787-0.88794 0.5334-0.39017 0.38982-0.63147 0.92322-0.63147 1.5176 0 1.1896 0.96414 2.1431 2.1537 2.1431h4.3071c1.1896 0 2.153-0.98742 2.153-2.1777 0-1.1896-0.96344-2.1777-2.153-2.1777h-0.66992c-0.15593-1.0449-1.0499-1.7974-2.1297-1.7974-1.112 0-2.0274 0.87524-2.1417 1.9586"
          />
        ` : ""}
  ${$a670ed82a1e76f75$var$rainStates.has(state) ? (0, $f58f44579a4747ac$export$7ed1367e7fa1ad68)`
          <path
            class="rain"
            d="m5.2852 14.734c-0.22401 0.24765-0.57115 0.2988-0.77505 0.11395-0.20391-0.1845-0.18732-0.53481 0.036689-0.78281 0.14817-0.16298 0.59126-0.32914 0.87559-0.42369 0.12453-0.04092 0.22684 0.05186 0.19791 0.17956-0.065617 0.2921-0.18732 0.74965-0.33514 0.91299"
          />
          <path
            class="rain"
            d="m11.257 14.163c-0.22437 0.24765-0.57115 0.2988-0.77505 0.11395-0.2039-0.1845-0.18768-0.53481 0.03669-0.78281 0.14817-0.16298 0.59126-0.32914 0.8756-0.42369 0.12453-0.04092 0.22684 0.05186 0.19791 0.17956-0.06562 0.2921-0.18732 0.74965-0.33514 0.91299"
          />
          <path
            class="rain"
            d="m8.432 15.878c-0.15452 0.17039-0.3937 0.20567-0.53446 0.07867-0.14041-0.12735-0.12876-0.36865 0.025753-0.53975 0.10195-0.11218 0.40711-0.22684 0.60325-0.29175 0.085725-0.02858 0.15628 0.03563 0.13652 0.12382-0.045508 0.20108-0.12912 0.51647-0.23107 0.629"
          />
          <path
            class="rain"
            d="m7.9991 14.118c-0.19226 0.21237-0.49001 0.25612-0.66499 0.09737-0.17462-0.15804-0.16051-0.45861 0.03175-0.67098 0.12665-0.14005 0.50729-0.28293 0.75071-0.36336 0.10689-0.03563 0.19473 0.0441 0.17004 0.15346-0.056092 0.25082-0.16051 0.64347-0.28751 0.78352"
          />
        ` : ""}
  ${state === "pouring" ? (0, $f58f44579a4747ac$export$7ed1367e7fa1ad68)`
          <path
            class="rain"
            d="m10.648 16.448c-0.19226 0.21449-0.49001 0.25894-0.66499 0.09878-0.17498-0.16016-0.16087-0.4639 0.03175-0.67874 0.12665-0.14146 0.50694-0.2854 0.75071-0.36724 0.10689-0.03563 0.19473 0.0448 0.17004 0.15558-0.05645 0.25365-0.16051 0.65017-0.28751 0.79163"
          />
          <path
            class="rain"
            d="m5.9383 16.658c-0.22437 0.25012-0.5715 0.30162-0.77505 0.11501-0.20391-0.18627-0.18768-0.54046 0.036689-0.79093 0.14817-0.1651 0.59126-0.33267 0.87559-0.42827 0.12418-0.04127 0.22648 0.05221 0.19791 0.18168-0.065617 0.29528-0.18732 0.75741-0.33514 0.92251"
          />
        ` : ""}
  ${$a670ed82a1e76f75$var$windyStates.has(state) ? (0, $f58f44579a4747ac$export$7ed1367e7fa1ad68)`
          <path
            class="cloud-back"
            d="m 13.59616,15.30968 c 0,0 -0.09137,-0.0071 -0.250472,-0.0187 -0.158045,-0.01235 -0.381353,-0.02893 -0.64382,-0.05715 -0.262466,-0.02716 -0.564444,-0.06385 -0.877358,-0.124531 -0.156986,-0.03034 -0.315383,-0.06844 -0.473781,-0.111478 -0.157691,-0.04551 -0.313266,-0.09842 -0.463902,-0.161219 l -0.267406,-0.0949 c -0.09984,-0.02646 -0.205669,-0.04904 -0.305153,-0.06738 -0.193322,-0.02716 -0.3838218,-0.03316 -0.5640912,-0.02011 -0.3626556,0.02611 -0.6847417,0.119239 -0.94615,0.226483 -0.2617611,0.108656 -0.4642556,0.230364 -0.600075,0.324203 -0.1358195,0.09419 -0.2049639,0.160514 -0.2049639,0.160514 0,0 0.089958,-0.01623 0.24765,-0.04445 0.1559278,-0.02575 0.3764139,-0.06174 0.6367639,-0.08714 0.2596444,-0.02646 0.5591527,-0.0441 0.8678333,-0.02328 0.076905,0.0035 0.1538111,0.01658 0.2321278,0.02293 0.077611,0.01058 0.1534581,0.02893 0.2314221,0.04022 0.07267,0.01834 0.1397,0.03986 0.213078,0.05644 l 0.238125,0.08925 c 0.09207,0.03281 0.183444,0.07055 0.275872,0.09878 0.09243,0.0261 0.185208,0.05327 0.277636,0.07161 0.184856,0.0388 0.367947,0.06174 0.543983,0.0702 0.353131,0.01905 0.678745,-0.01341 0.951442,-0.06456 0.27305,-0.05292 0.494595,-0.123119 0.646642,-0.181681 0.152047,-0.05785 0.234597,-0.104069 0.234597,-0.104069"
          />
          <path
            class="cloud-back"
            d="m 4.7519154,13.905801 c 0,0 0.091369,-0.0032 0.2511778,-0.0092 0.1580444,-0.0064 0.3820583,-0.01446 0.6455833,-0.03281 0.2631722,-0.01729 0.5662083,-0.04269 0.8812389,-0.09137 0.1576916,-0.02434 0.3175,-0.05609 0.4776611,-0.09384 0.1591027,-0.03951 0.3167944,-0.08643 0.4699,-0.14358 l 0.2702277,-0.08467 c 0.1008945,-0.02222 0.2074334,-0.04127 0.3072695,-0.05574 0.1943805,-0.01976 0.3848805,-0.0187 0.5651499,0.0014 0.3608917,0.03951 0.67945,0.144639 0.936625,0.261761 0.2575278,0.118534 0.4554364,0.247297 0.5873754,0.346781 0.132291,0.09913 0.198966,0.168275 0.198966,0.168275 0,0 -0.08925,-0.01976 -0.245886,-0.05397 C 9.9423347,14.087088 9.7232597,14.042988 9.4639681,14.00736 9.2057347,13.97173 8.9072848,13.94245 8.5978986,13.95162 c -0.077258,7.06e-4 -0.1541638,0.01058 -0.2328333,0.01411 -0.077964,0.0078 -0.1545166,0.02328 -0.2331861,0.03175 -0.073025,0.01588 -0.1404055,0.03422 -0.2141361,0.04798 l -0.2420055,0.08008 c -0.093486,0.02963 -0.1859139,0.06421 -0.2794,0.0889 C 7.3028516,14.23666 7.2093653,14.2603 7.116232,14.27512 6.9303181,14.30722 6.7465209,14.3231 6.5697792,14.32486 6.2166487,14.33046 5.8924459,14.28605 5.6218654,14.224318 5.3505793,14.161565 5.1318571,14.082895 4.9822793,14.01869 4.8327015,13.95519 4.7519154,13.905801 4.7519154,13.905801"
          />
        ` : ""}
  ${$a670ed82a1e76f75$var$snowyStates.has(state) ? (0, $f58f44579a4747ac$export$7ed1367e7fa1ad68)`
          <path
            class="snow"
            d="m 8.4319893,15.348341 c 0,0.257881 -0.209197,0.467079 -0.467078,0.467079 -0.258586,0 -0.46743,-0.209198 -0.46743,-0.467079 0,-0.258233 0.208844,-0.467431 0.46743,-0.467431 0.257881,0 0.467078,0.209198 0.467078,0.467431"
          />
          <path
            class="snow"
            d="m 11.263878,14.358553 c 0,0.364067 -0.295275,0.659694 -0.659695,0.659694 -0.364419,0 -0.6596937,-0.295627 -0.6596937,-0.659694 0,-0.364419 0.2952747,-0.659694 0.6596937,-0.659694 0.36442,0 0.659695,0.295275 0.659695,0.659694"
          />
          <path
            class="snow"
            d="m 5.3252173,13.69847 c 0,0.364419 -0.295275,0.660047 -0.659695,0.660047 -0.364067,0 -0.659694,-0.295628 -0.659694,-0.660047 0,-0.364067 0.295627,-0.659694 0.659694,-0.659694 0.36442,0 0.659695,0.295627 0.659695,0.659694"
          />
        ` : ""}
  ${$a670ed82a1e76f75$var$lightningStates.has(state) ? (0, $f58f44579a4747ac$export$7ed1367e7fa1ad68)`
          <path
            class="sun"
            d="m 9.9252695,10.935875 -1.6483986,2.341014 1.1170184,0.05929 -1.2169864,2.02141 3.0450261,-2.616159 H 9.8864918 L 10.97937,11.294651 10.700323,10.79794 h -0.508706 l -0.2663475,0.137936"
          />
        ` : ""}
  </svg>`;
const $a670ed82a1e76f75$export$e0801f527146069 = (state, element, nightTime)=>{
    const userDefinedIcon = getComputedStyle(element).getPropertyValue(`--weather-icon-${state}`);
    if (userDefinedIcon) return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
      <div
        style="background-size: cover;${(0, $19f464fcda7d2482$export$1e5b4ce2fa884e6a)({
        "background-image": userDefinedIcon
    })}"
      ></div>
    `;
    if ($a670ed82a1e76f75$export$8f7ca90fe05ed3ab.has(state)) return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`${$a670ed82a1e76f75$var$getWeatherStateSVG(state, nightTime)}`;
    // Disabled so we don't need to import mdi icons
    // if (state in weatherIcons) {
    //   return html`
    //     <ha-svg-icon
    //       class="weather-icon"
    //       .path=${weatherIcons[state]}
    //     ></ha-svg-icon>
    //   `;
    // }
    return undefined;
};
const $a670ed82a1e76f75$var$EIGHT_HOURS = 28800000;
const $a670ed82a1e76f75$var$DAY_IN_MILLISECONDS = 86400000;
const $a670ed82a1e76f75$var$isForecastHourly = (forecast)=>{
    if (forecast && forecast?.length && forecast?.length > 2) {
        const date1 = new Date(forecast[1].datetime);
        const date2 = new Date(forecast[2].datetime);
        const timeDiff = date2.getTime() - date1.getTime();
        return timeDiff < $a670ed82a1e76f75$var$EIGHT_HOURS;
    }
    return undefined;
};
const $a670ed82a1e76f75$var$isForecastTwiceDaily = (forecast)=>{
    if (forecast && forecast?.length && forecast?.length > 2) {
        const date1 = new Date(forecast[1].datetime);
        const date2 = new Date(forecast[2].datetime);
        const timeDiff = date2.getTime() - date1.getTime();
        return timeDiff < $a670ed82a1e76f75$var$DAY_IN_MILLISECONDS;
    }
    return undefined;
};
const $a670ed82a1e76f75$export$911459c231e7e591 = (hass)=>hass.callWS({
        type: "weather/convertible_units"
    });
const $a670ed82a1e76f75$var$getLegacyForecast = (weather_attributes)=>{
    if (weather_attributes?.forecast && weather_attributes.forecast.length > 2) {
        if ($a670ed82a1e76f75$var$isForecastHourly(weather_attributes.forecast)) return {
            forecast: weather_attributes.forecast,
            type: "hourly"
        };
        if ($a670ed82a1e76f75$var$isForecastTwiceDaily(weather_attributes.forecast)) return {
            forecast: weather_attributes.forecast,
            type: "twice_daily"
        };
        return {
            forecast: weather_attributes.forecast,
            type: "daily"
        };
    }
    return undefined;
};
const $a670ed82a1e76f75$export$c1e906046b5de973 = (weather_attributes, forecast_event, forecast_type)=>{
    if (forecast_type === undefined) {
        if (forecast_event?.type !== undefined && forecast_event?.forecast && forecast_event?.forecast?.length > 2) return {
            forecast: forecast_event.forecast,
            type: forecast_event?.type
        };
        return $a670ed82a1e76f75$var$getLegacyForecast(weather_attributes);
    }
    if (forecast_type === "legacy") return $a670ed82a1e76f75$var$getLegacyForecast(weather_attributes);
    if (forecast_type === forecast_event?.type && forecast_event?.forecast && forecast_event?.forecast?.length > 2) return {
        forecast: forecast_event.forecast,
        type: forecast_type
    };
    return undefined;
};
const $a670ed82a1e76f75$export$ace10bd47409a000 = (hass, entity_id, forecast_type, callback)=>hass.connection.subscribeMessage(callback, {
        type: "weather/subscribe_forecast",
        forecast_type: forecast_type,
        entity_id: entity_id
    });
const $a670ed82a1e76f75$export$327ac2cf77ab3c0a = (stateObj)=>{
    const supported = [];
    if ($a670ed82a1e76f75$export$6cfda7fa5f551db7(stateObj, 1)) supported.push("daily");
    if ($a670ed82a1e76f75$export$6cfda7fa5f551db7(stateObj, 4)) supported.push("twice_daily");
    if ($a670ed82a1e76f75$export$6cfda7fa5f551db7(stateObj, 2)) supported.push("hourly");
    return supported;
};
const $a670ed82a1e76f75$export$8da9d7ed1832915 = (stateObj)=>{
    if ($a670ed82a1e76f75$export$6cfda7fa5f551db7(stateObj, 1)) return "daily";
    if ($a670ed82a1e76f75$export$6cfda7fa5f551db7(stateObj, 4)) return "twice_daily";
    if ($a670ed82a1e76f75$export$6cfda7fa5f551db7(stateObj, 2)) return "hourly";
    return undefined;
};
const $a670ed82a1e76f75$export$6cfda7fa5f551db7 = (stateObj, feature)=>$a670ed82a1e76f75$export$49fb620566936d3e(stateObj.attributes, feature);
const $a670ed82a1e76f75$export$49fb620566936d3e = (attributes, feature)=>// eslint-disable-next-line no-bitwise
    (attributes.supported_features & feature) !== 0;



var $1b50081e774bdf57$exports = {};
<<<<<<< HEAD
$1b50081e774bdf57$exports = "ha-card {\n  height: 100%;\n  box-sizing: border-box;\n  flex-direction: column;\n  justify-content: space-evenly;\n  display: flex;\n}\n\n.forecast-header {\n  width: 100%;\n  height: 150px;\n  border-top-left-radius: var(--ha-card-border-radius, 12px);\n  border-top-right-radius: var(--ha-card-border-radius, 12px);\n  background-image: url(\"pouring.8b4e549f.jpg\");\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\n.forecast {\n  scroll-snap-type: x mandatory;\n  justify-content: space-around;\n  gap: var(--dynamic-gap, 20px);\n  padding: 0 16px;\n  scroll-padding-left: 16px;\n  scroll-padding-right: 16px;\n  display: flex;\n  overflow-x: auto;\n  overflow-y: hidden;\n}\n\n.forecast.daily {\n  --min-gap: 30px;\n  --icon-size: 40px;\n  --icon-container-width: 40px;\n  --icon-container-height: auto;\n}\n\n.forecast.hourly {\n  --min-gap: 10px;\n  --icon-size: 20px;\n  --icon-container-width: 30px;\n  --icon-container-height: 70px;\n  --translate-content-height: 50px;\n  --min-temp: -20;\n  --max-temp: 50;\n}\n\n.forecast::-webkit-scrollbar {\n  height: 0;\n}\n\n.forecast-item {\n  scroll-snap-align: start;\n  text-align: center;\n}\n\n.forecast .new-day {\n  background-color: #7a7a7a1a;\n  border-radius: 5px;\n  margin-left: 2px;\n  margin-right: 2px;\n  font-weight: bold;\n}\n\n.forecast .day-of-month {\n  opacity: .3;\n  margin-top: -4px;\n  font-size: 13px;\n}\n\n.forecast .ampm, .forecast .ampm-hidden {\n  min-height: 5px;\n  opacity: .3;\n  margin-top: -4px;\n  font-size: 11px;\n}\n\n.forecast .ampm-hidden {\n  opacity: 0 !important;\n}\n\n.forecast .temp {\n  font-size: var(--ha-font-size-l);\n  font-weight: bolder;\n}\n\n.forecast .templow {\n  opacity: .5;\n  font-weight: bolder;\n}\n\n.forecast .precipitation, .forecast .precipitationprobability {\n  opacity: .3;\n  color: var(--state-climate-cool-color);\n}\n\n.forecast .precipitation.active, .forecast .precipitationprobability.active {\n  opacity: 1;\n}\n\n.forecast.daily .precipitationprobability {\n  display: none;\n}\n\n.forecast-item .translate-container {\n  width: var(--icon-container-width);\n  height: var(--icon-container-height);\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  display: flex;\n}\n\n.forecast-item .icon-container {\n  --item-temp: 0;\n  --max-translation: calc((var(--icon-container-height)  - var(--translate-content-height)) / 2);\n  --percentual-translation: calc((var(--item-temp)  - var(--min-temp)) / (var(--max-temp)  - var(--min-temp)));\n  transform: translateY(calc(var(--max-translation)  - (var(--percentual-translation) * 2 * var(--max-translation))));\n}\n\n.forecast-image-icon {\n  justify-content: center;\n  display: flex;\n}\n\n.forecast-image-icon > * {\n  width: var(--icon-size);\n  height: var(--icon-size);\n}\n\n.rain {\n  fill: var(--weather-icon-rain-color, #30b3ff);\n}\n\n.sun {\n  fill: var(--weather-icon-sun-color, #fdd93c);\n}\n\n.moon {\n  fill: var(--weather-icon-moon-color, #fcf497);\n}\n\n.cloud-back {\n  fill: var(--weather-icon-cloud-back-color, #d4d4d4);\n}\n\n.cloud-front {\n  fill: var(--weather-icon-cloud-front-color, #f9f9f9);\n}\n\n.snow {\n  fill: var(--weather-icon-snow-color, #f9f9f9);\n  stroke: var(--weather-icon-snow-stroke-color, #d4d4d4);\n  stroke-width: 1px;\n  paint-order: stroke;\n}\n\n";
=======
$1b50081e774bdf57$exports = "ha-card {\n  height: 100%;\n  min-height: -moz-fit-content;\n  min-height: fit-content;\n  flex-direction: column;\n  padding-bottom: 8px;\n  display: flex;\n  overflow: hidden;\n}\n\n.weather {\n  width: 100%;\n  height: calc(2.5 * var(--row-height));\n  border-top-left-radius: var(--ha-card-border-radius, 12px);\n  border-top-right-radius: var(--ha-card-border-radius, 12px);\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n  flex-shrink: 0;\n}\n\n.weather .condition {\n  width: -moz-fit-content;\n  width: fit-content;\n  background-color: #0000004d;\n  border-radius: 100px;\n  margin-top: 10px;\n  margin-left: auto;\n  margin-right: 15px;\n  padding: 4px 15px;\n  font-size: 15px;\n  line-height: normal;\n}\n\n.weather .temp {\n  width: -moz-fit-content;\n  width: fit-content;\n  background-color: #0000004d;\n  border-radius: 100px;\n  margin-top: 15px;\n  margin-left: auto;\n  margin-right: 15px;\n  padding: 2px 17px;\n  font-size: 30px;\n  font-weight: bolder;\n  line-height: normal;\n}\n\n.forecast-container {\n  width: 100%;\n  flex-direction: column;\n  flex: auto;\n  gap: 4px;\n  display: flex;\n}\n\n.divider {\n  height: 4px;\n  background-color: var(--primary-background-color);\n}\n\n.forecast-container .divider {\n  border-radius: 2px;\n  margin: 0 16px;\n}\n\n.forecast-daily-container, .forecast-hourly-container {\n  -webkit-overflow-scrolling: touch;\n  touch-action: pan-x;\n  overscroll-behavior-x: contain;\n  flex-direction: column;\n  flex: auto;\n  justify-content: flex-start;\n  margin-top: 2px;\n  display: flex;\n  position: relative;\n  overflow: hidden;\n}\n\n@supports (-webkit-touch-callout: none) {\n  .forecast-daily-container {\n    padding-bottom: 6px;\n    overflow: visible;\n  }\n}\n\n.fade-left, .fade-right {\n  width: 16px;\n  pointer-events: none;\n  z-index: 2;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n}\n\n.fade-left {\n  background: linear-gradient(to right, var(--card-background-color) 0%, var(--card-background-color) 2px, transparent 100%);\n  left: 0;\n}\n\n.fade-right {\n  background: linear-gradient(to left, var(--card-background-color) 0%, var(--card-background-color) 2px, transparent 100%);\n  right: 0;\n}\n\n.forecast {\n  height: auto;\n  scroll-snap-type: x mandatory;\n  justify-content: space-around;\n  align-items: stretch;\n  gap: var(--dynamic-gap, 20px);\n  flex: auto;\n  padding: 8px 16px 10px;\n  scroll-padding-left: 16px;\n  scroll-padding-right: 16px;\n  display: flex;\n  overflow-x: auto;\n  overflow-y: visible;\n}\n\n@supports (-webkit-touch-callout: none) {\n  .forecast {\n    padding-bottom: 12px;\n  }\n}\n\n.forecast wfe-daily-list, .forecast wfe-hourly-list {\n  display: contents;\n}\n\n@supports (-webkit-touch-callout: none) {\n  .forecast {\n    scroll-snap-type: none;\n    -webkit-overflow-scrolling: touch;\n  }\n}\n\n.forecast.daily {\n  --min-gap: 30px;\n  --icon-size: 40px;\n  --icon-container-width: 40px;\n  --temp-bar-width: 8px;\n  --temp-bar-min: -20;\n  --temp-bar-max: 50;\n}\n\n.forecast.hourly {\n  --min-gap: 16px;\n  --icon-size: 25px;\n  --icon-container-width: 25px;\n  --translate-content-height: 50px;\n  --translate-container-height: 50px;\n  --min-temp: -20;\n  --max-temp: 50;\n}\n\n.forecast::-webkit-scrollbar {\n  height: 0;\n  width: 0;\n  display: none;\n}\n\n.forecast-item {\n  scroll-snap-align: start;\n  text-align: center;\n  height: 100%;\n  flex-direction: column;\n  display: flex;\n}\n\n.forecast .new-day {\n  background-color: #7a7a7a1a;\n  border-radius: 5px;\n  margin-left: 2px;\n  margin-right: 2px;\n  font-weight: bold;\n}\n\n.forecast .day-of-month {\n  opacity: .3;\n  margin-top: -4px;\n  font-size: 13px;\n}\n\n.forecast.daily .day-of-month {\n  margin-top: 0;\n}\n\n.forecast .ampm, .forecast .ampm-hidden {\n  min-height: 5px;\n  opacity: .3;\n  margin-top: -4px;\n  font-size: 11px;\n}\n\n.forecast .ampm-hidden {\n  opacity: 0 !important;\n}\n\n.forecast .temp {\n  font-size: var(--ha-font-size-l);\n  font-weight: bolder;\n}\n\n.forecast .templow {\n  opacity: .5;\n  font-weight: bolder;\n}\n\n.forecast .precipitation, .forecast .precipitationprobability {\n  opacity: .3;\n  color: var(--state-climate-cool-color);\n  min-height: 1.15em;\n  margin-bottom: 2px;\n}\n\n.forecast .precipitation.active, .forecast .precipitationprobability.active {\n  opacity: 1;\n}\n\n.forecast.daily .forecast-item {\n  grid-template-rows: max-content max-content minmax(80px, 1fr) max-content;\n  align-content: start;\n  row-gap: 4px;\n  display: grid;\n}\n\n.forecast.daily .forecast-item > .date, .forecast.daily .forecast-item > .day-of-month, .forecast.daily .forecast-item > .precipitation, .forecast.daily .forecast-item > .precipitationprobability {\n  min-height: auto;\n}\n\n.forecast.daily .forecast-item > .date {\n  grid-row: 1;\n}\n\n.forecast.daily .forecast-item > .day-of-month {\n  grid-row: 2;\n}\n\n.forecast.daily .forecast-item > .translate-container {\n  grid-row: 3;\n}\n\n.forecast.daily .forecast-item > .precipitation, .forecast.daily .forecast-item > .precipitationprobability {\n  grid-row: 4;\n}\n\n.forecast.daily .precipitationprobability {\n  display: none;\n}\n\n.forecast-item .translate-container {\n  width: var(--icon-container-width);\n  height: 100%;\n  flex-direction: column;\n  flex: auto;\n  justify-content: flex-start;\n  align-items: center;\n  display: flex;\n}\n\n.forecast.daily .forecast-item > .translate-container {\n  min-height: 80px;\n}\n\n.forecast.hourly .forecast-item .translate-container {\n  min-height: 80px;\n  justify-content: center;\n}\n\n.forecast-item .icon-container {\n  flex-direction: column;\n  display: flex;\n}\n\n.forecast.hourly .forecast-item .icon-container {\n  --item-temp: 0;\n  --max-translation: calc((var(--translate-container-height)  - var(--translate-content-height)) / 2);\n  --percentual-translation: calc((var(--item-temp)  - var(--min-temp)) / (var(--max-temp)  - var(--min-temp)));\n  transform: translateY(calc(var(--max-translation)  - (var(--percentual-translation) * 2 * var(--max-translation))));\n}\n\n.forecast.daily .forecast-item .icon-container {\n  flex: none;\n}\n\n.forecast.daily .temperature-bar {\n  flex: auto;\n}\n\n.forecast-image-icon {\n  justify-content: center;\n  display: flex;\n}\n\n.forecast-image-icon > * {\n  width: var(--icon-size);\n  height: var(--icon-size);\n}\n\n.forecast.daily .temperature-bar {\n  min-height: 40px;\n  width: var(--temp-bar-width);\n  background-color: #ffffff1a;\n  border-radius: 4px;\n  flex: 1;\n  margin: 8px auto;\n  position: relative;\n}\n\n.forecast.daily .temperature-bar-inner {\n  width: 100%;\n  background-color: #fffc;\n  border-radius: 4px;\n  position: absolute;\n}\n\n.rain {\n  fill: var(--weather-icon-rain-color, #30b3ff);\n}\n\n.sun {\n  fill: var(--weather-icon-sun-color, #fdd93c);\n}\n\n.moon {\n  fill: var(--weather-icon-moon-color, #fcf497);\n}\n\n.cloud-back {\n  fill: var(--weather-icon-cloud-back-color, #d4d4d4);\n}\n\n.cloud-front {\n  fill: var(--weather-icon-cloud-front-color, #f9f9f9);\n}\n\n.snow {\n  fill: var(--weather-icon-snow-color, #f9f9f9);\n  stroke: var(--weather-icon-snow-stroke-color, #d4d4d4);\n  stroke-width: 1px;\n  paint-order: stroke;\n}\n\n";
>>>>>>> dev


const $b377d607dfc671f6$export$9dd6ff9ea0189349 = (0, $def2de46b9306e8a$export$dbf350e5966cf602)`
  ${(0, $def2de46b9306e8a$export$8d80f9cac07cdb3)((0, (/*@__PURE__*/$parcel$interopDefault($1b50081e774bdf57$exports))))}
`;


var $1e69f76b05a816eb$exports = {};
$1e69f76b05a816eb$exports = new URL("sunny.301a5a2f.jpg", import.meta.url).toString();


var $1dfaab2e4e5ecad6$exports = {};
$1dfaab2e4e5ecad6$exports = new URL("pouring.4a0d35b1.jpg", import.meta.url).toString();


var $b6117c6cfcd5d9bd$exports = {};
$b6117c6cfcd5d9bd$exports = new URL("partly-cloudy.be4a5eb1.jpg", import.meta.url).toString();


var $b109536a5a876912$exports = {};
$b109536a5a876912$exports = new URL("fog.2846236b.jpg", import.meta.url).toString();


var $9f87ed3faa3b9e08$exports = {};
$9f87ed3faa3b9e08$exports = new URL("hail.78bf0bf9.jpg", import.meta.url).toString();


var $a72aedec7f87ee16$exports = {};
$a72aedec7f87ee16$exports = new URL("lightning-rainy.a39732b3.jpg", import.meta.url).toString();


var $95746abd7ffe8eef$exports = {};
$95746abd7ffe8eef$exports = new URL("lightning.dd08d9a9.jpg", import.meta.url).toString();


var $299ff7583b1b6519$exports = {};
$299ff7583b1b6519$exports = new URL("rainy.110f5e84.jpg", import.meta.url).toString();


var $2cc4706dea59c3c7$exports = {};
$2cc4706dea59c3c7$exports = new URL("snowy-rainy.e7cec085.jpg", import.meta.url).toString();


var $114809334059eb6d$exports = {};
$114809334059eb6d$exports = new URL("snowy.3d2d1d5d.jpg", import.meta.url).toString();


var $126f314ae001decd$exports = {};
$126f314ae001decd$exports = new URL("windy-variant.9bbb3048.jpg", import.meta.url).toString();


var $31e27610007c5cf3$exports = {};
$31e27610007c5cf3$exports = new URL("windy.7fde666b.jpg", import.meta.url).toString();


const $04b2058bf019e2da$export$d0bd520bd5ddb657 = {
    pouring: (0, (/*@__PURE__*/$parcel$interopDefault($1dfaab2e4e5ecad6$exports))),
    sunny: (0, (/*@__PURE__*/$parcel$interopDefault($1e69f76b05a816eb$exports))),
    partlycloudy: (0, (/*@__PURE__*/$parcel$interopDefault($b6117c6cfcd5d9bd$exports))),
    fog: (0, (/*@__PURE__*/$parcel$interopDefault($b109536a5a876912$exports))),
    hail: (0, (/*@__PURE__*/$parcel$interopDefault($9f87ed3faa3b9e08$exports))),
    lightningrainy: (0, (/*@__PURE__*/$parcel$interopDefault($a72aedec7f87ee16$exports))),
    lightning: (0, (/*@__PURE__*/$parcel$interopDefault($95746abd7ffe8eef$exports))),
    rainy: (0, (/*@__PURE__*/$parcel$interopDefault($299ff7583b1b6519$exports))),
    snowyrainy: (0, (/*@__PURE__*/$parcel$interopDefault($2cc4706dea59c3c7$exports))),
    snowy: (0, (/*@__PURE__*/$parcel$interopDefault($114809334059eb6d$exports))),
    windyvariant: (0, (/*@__PURE__*/$parcel$interopDefault($126f314ae001decd$exports))),
    windy: (0, (/*@__PURE__*/$parcel$interopDefault($31e27610007c5cf3$exports)))
};





// Collection of functions from HA frontend
var $c106d6426411ff6f$var$safeIsNaN = Number.isNaN || function ponyfill(value) {
    return typeof value === "number" && value !== value;
};
function $c106d6426411ff6f$var$isEqual(first, second) {
    if (first === second) return true;
    if ($c106d6426411ff6f$var$safeIsNaN(first) && $c106d6426411ff6f$var$safeIsNaN(second)) return true;
    return false;
}
function $c106d6426411ff6f$var$areInputsEqual(newInputs, lastInputs) {
    if (newInputs.length !== lastInputs.length) return false;
    for(var i = 0; i < newInputs.length; i++){
        if (!$c106d6426411ff6f$var$isEqual(newInputs[i], lastInputs[i])) return false;
    }
    return true;
}
function $c106d6426411ff6f$export$2e2bcd8739ae039(resultFn, isEqual) {
    if (isEqual === void 0) isEqual = $c106d6426411ff6f$var$areInputsEqual;
    var cache = null;
    function memoized() {
        var newArgs = [];
        for(var _i = 0; _i < arguments.length; _i++)newArgs[_i] = arguments[_i];
        if (cache && cache.lastThis === this && isEqual(newArgs, cache.lastArgs)) return cache.lastResult;
        var lastResult = resultFn.apply(this, newArgs);
        cache = {
            lastResult: lastResult,
            lastArgs: newArgs,
            lastThis: this
        };
        return lastResult;
    }
    memoized.clear = function clear() {
        cache = null;
    };
    return memoized;
}


const $2e3b0c24d7649e32$export$e86782e02be44113 = (dateObj, locale, config)=>$2e3b0c24d7649e32$var$formatDateWeekdayShortMem(locale, config.time_zone).format(dateObj);
const $2e3b0c24d7649e32$var$formatDateWeekdayShortMem = (0, $c106d6426411ff6f$export$2e2bcd8739ae039)((locale, serverTimeZone)=>new Intl.DateTimeFormat(locale.language, {
        weekday: "short",
        timeZone: locale.time_zone === "server" ? serverTimeZone : undefined
    }));
const $2e3b0c24d7649e32$export$3203edd9e5edd663 = (dateObj, locale, config)=>$2e3b0c24d7649e32$var$formatTimeMem(locale, config.time_zone).format(dateObj);
const $2e3b0c24d7649e32$var$formatTimeMem = (0, $c106d6426411ff6f$export$2e2bcd8739ae039)((locale, serverTimeZone)=>new Intl.DateTimeFormat(locale.language, {
        hour: "numeric",
        minute: "numeric",
        hourCycle: $2e3b0c24d7649e32$export$98b044737b007ca6(locale) ? "h12" : "h23",
        timeZone: locale.time_zone === "server" ? serverTimeZone : undefined
    }));
var $2e3b0c24d7649e32$export$7fd1ce15b01d50ca;
(function(TimeFormat) {
    TimeFormat["language"] = "language";
    TimeFormat["system"] = "system";
    TimeFormat["am_pm"] = "12";
    TimeFormat["twenty_four"] = "24";
})($2e3b0c24d7649e32$export$7fd1ce15b01d50ca || ($2e3b0c24d7649e32$export$7fd1ce15b01d50ca = {}));
const $2e3b0c24d7649e32$export$98b044737b007ca6 = (0, $c106d6426411ff6f$export$2e2bcd8739ae039)((locale)=>{
    if (locale.time_format === $2e3b0c24d7649e32$export$7fd1ce15b01d50ca.language || locale.time_format === $2e3b0c24d7649e32$export$7fd1ce15b01d50ca.system) {
        const testLanguage = locale.time_format === $2e3b0c24d7649e32$export$7fd1ce15b01d50ca.language ? locale.language : undefined;
        const test = new Date("January 1, 2023 22:00:00").toLocaleString(testLanguage);
        return test.includes("10");
    }
    return locale.time_format === $2e3b0c24d7649e32$export$7fd1ce15b01d50ca.am_pm;
});
const $2e3b0c24d7649e32$export$9ba7591c5b128371 = (dateObj, locale, config)=>$2e3b0c24d7649e32$var$formatDateDayTwoDigitMem(locale, config.time_zone).format(dateObj);
const $2e3b0c24d7649e32$var$formatDateDayTwoDigitMem = (0, $c106d6426411ff6f$export$2e2bcd8739ae039)((locale, serverTimeZone)=>new Intl.DateTimeFormat(locale.language, {
        day: "2-digit",
        timeZone: locale.time_zone === "server" ? serverTimeZone : undefined
    }));
const $2e3b0c24d7649e32$export$86a5557e1d677e29 = (dateObj, locale, config)=>{
    const parts = $2e3b0c24d7649e32$var$formatHourMem(locale, config.time_zone).formatToParts(dateObj);
    return parts.find((part)=>part.type === "hour").value;
};
const $2e3b0c24d7649e32$export$f57482e5e4ce715a = (dateObj, locale, config)=>{
    const parts = $2e3b0c24d7649e32$var$formatHourMem(locale, config.time_zone).formatToParts(dateObj);
    return parts.find((part)=>part.type === "dayPeriod")?.value;
};
const $2e3b0c24d7649e32$var$formatHourMem = (0, $c106d6426411ff6f$export$2e2bcd8739ae039)((locale, serverTimeZone)=>new Intl.DateTimeFormat(locale.language, {
        hour: "2-digit",
        //minute: "2-digit",
        hourCycle: $2e3b0c24d7649e32$export$98b044737b007ca6(locale) ? "h12" : "h23",
        timeZone: locale.time_zone === "server" ? serverTimeZone : undefined
    }));
const $2e3b0c24d7649e32$export$824eefb57336d873 = (dateObj, config)=>{
    const formatter = new Intl.DateTimeFormat("de-DE", {
        hour: "2-digit",
        timeZone: config.time_zone,
        hour12: false
    });
    const parts = formatter.formatToParts(dateObj);
    const hourPart = parts.find((part)=>part.type === "hour");
    return hourPart.value === "00";
};



let $e0faea6f638c1177$export$dc909bdc6ed8e8f6 = class WFEDailyList extends (0, $ab210b2da7b39b9d$export$3f2f9f5909897157) {
    createRenderRoot() {
        // Render in light DOM so parent CSS applies
        return this;
    }
    render() {
        if (!this.forecast?.length) return 0, $f58f44579a4747ac$export$45b790e32b2810ee;
        return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
      ${this.forecast.map((item)=>this._renderDailyItem(item))}
    `;
    }
    _hasValidValue(item) {
        return typeof item !== "undefined" && item !== null;
    }
    _renderDailyItem(item) {
        if (!this._hasValidValue(item.temperature) || !this._hasValidValue(item.condition)) return 0, $f58f44579a4747ac$export$45b790e32b2810ee;
        const date = new Date(item.datetime);
        const newDay = (0, $2e3b0c24d7649e32$export$824eefb57336d873)(date, this.hass.config);
        return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
      <div class="forecast-item">
        <div class="date">${(0, $2e3b0c24d7649e32$export$e86782e02be44113)(date, this.hass.locale, this.hass.config)}</div>
        ${!newDay ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<div class="day-of-month">${(0, $2e3b0c24d7649e32$export$9ba7591c5b128371)(date, this.hass.locale, this.hass.config)}</div>` : ""}
        <div class="translate-container">
          <div class="icon-container">
            <div class="forecast-image-icon">
              ${(0, $a670ed82a1e76f75$export$e0801f527146069)(item.condition, this, !(item.is_daytime || item.is_daytime === undefined))}
            </div>
            <div class="temp">${Math.round(item.temperature)}°</div>
          </div>
          ${this._renderTemperatureBar(item)}
          <div class="templow">${this._hasValidValue(item.templow) ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`${Math.round(item.templow)}°` : "—"}</div>
        </div>
        ${this._renderPrecipitationInfo(item)}
      </div>
    `;
    }
    _renderTemperatureBar(item) {
        if (!this._hasValidValue(item.templow)) return 0, $f58f44579a4747ac$export$45b790e32b2810ee;
        // Styling prozentual relativ zu globalem Min/Max
        return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
      <div class="temperature-bar">
        <div class="temperature-bar-inner" style=${this._getTemperatureBarStyle(item.temperature, item.templow)}></div>
      </div>
    `;
    }
    _renderPrecipitationInfo(item) {
        const hasPrecipitation = this._hasValidValue(item.precipitation);
        const hasPrecipitationProbability = this._hasValidValue(item.precipitation_probability);
        return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
      <div class="precipitation ${(item.precipitation ?? 0) > 0.3 ? "active" : ""}">
        ${hasPrecipitation ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`${item.precipitation.toFixed(1)}` : "—"}
      </div>
      <div class="precipitationprobability ${(item.precipitation_probability ?? 0) > 30 ? "active" : ""}">
        ${hasPrecipitationProbability ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`${item.precipitation_probability}%` : "—"}
      </div>
    `;
    }
    _getTemperatureBarStyle(maxTemp, minTemp) {
        if (this.min === undefined || this.max === undefined) return "";
        const total = this.max - this.min;
        if (!total) return "";
        const top = (this.max - maxTemp) / total * 100;
        const bottom = (this.max - minTemp) / total * 100;
        const height = bottom - top;
        return `top: ${top}%; height: ${height}%;`;
    }
    constructor(...args){
        super(...args);
        this.forecast = [];
    }
};
(0, $24c52f343453d62d$export$29e00dfd3077644b)([
    (0, $9cd908ed2625c047$export$d541bacb2bda4494)({
        attribute: false
    })
], $e0faea6f638c1177$export$dc909bdc6ed8e8f6.prototype, "hass", void 0);
(0, $24c52f343453d62d$export$29e00dfd3077644b)([
    (0, $9cd908ed2625c047$export$d541bacb2bda4494)({
        attribute: false
    })
], $e0faea6f638c1177$export$dc909bdc6ed8e8f6.prototype, "forecast", void 0);
(0, $24c52f343453d62d$export$29e00dfd3077644b)([
    (0, $9cd908ed2625c047$export$d541bacb2bda4494)({
        attribute: false
    })
], $e0faea6f638c1177$export$dc909bdc6ed8e8f6.prototype, "min", void 0);
(0, $24c52f343453d62d$export$29e00dfd3077644b)([
    (0, $9cd908ed2625c047$export$d541bacb2bda4494)({
        attribute: false
    })
], $e0faea6f638c1177$export$dc909bdc6ed8e8f6.prototype, "max", void 0);
$e0faea6f638c1177$export$dc909bdc6ed8e8f6 = (0, $24c52f343453d62d$export$29e00dfd3077644b)([
    (0, $14742f68afc766d6$export$da64fc29f17f9d0e)("wfe-daily-list")
], $e0faea6f638c1177$export$dc909bdc6ed8e8f6);







let $93e18bf828c9bae2$export$c4d9e0638219e78c = class WFEHourlyList extends (0, $ab210b2da7b39b9d$export$3f2f9f5909897157) {
    createRenderRoot() {
        // Render in light DOM so parent CSS applies
        return this;
    }
    connectedCallback() {
        super.connectedCallback();
        this._setupResizeObserver();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
            this._resizeObserver = undefined;
        }
    }
    updated() {
        // Recalculate after DOM updates (including when forecast changes)
        this.updateComplete.then(()=>this._recalculateTranslationHeights());
    }
    render() {
        if (!this.forecast?.length) return 0, $f58f44579a4747ac$export$45b790e32b2810ee;
        return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`${this.forecast.map((item)=>this._renderHourlyItem(item))}`;
    }
    _setupResizeObserver() {
        if (this._resizeObserver) return;
        const forecastEl = this.closest(".forecast.hourly");
        if (!forecastEl) return;
        this._resizeObserver = new ResizeObserver(()=>{
            this._recalculateTranslationHeights();
        });
        this._resizeObserver.observe(forecastEl);
    }
    _recalculateTranslationHeights() {
        const forecastEl = this.closest(".forecast.hourly") ?? this;
        // Query first item as reference for heights
        const translateContainer = this.querySelector(".translate-container");
        const iconContainer = this.querySelector(".icon-container");
        if (!translateContainer || !iconContainer || !forecastEl) return;
        const containerHeight = translateContainer.offsetHeight;
        const contentHeight = iconContainer.offsetHeight;
        forecastEl.style.setProperty("--translate-container-height", `${containerHeight}px`);
        forecastEl.style.setProperty("--translate-content-height", `${contentHeight}px`);
    }
    _hasValidValue(item) {
        return typeof item !== "undefined" && item !== null;
    }
    _renderHourlyItem(item) {
        if (!this._hasValidValue(item.temperature) || !this._hasValidValue(item.condition)) return 0, $f58f44579a4747ac$export$45b790e32b2810ee;
        const date = new Date(item.datetime);
        const newDay = (0, $2e3b0c24d7649e32$export$824eefb57336d873)(date, this.hass.config);
        return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
      <div class="forecast-item">
        <div class="date ${newDay ? "new-day" : ""}">
          ${newDay ? (0, $2e3b0c24d7649e32$export$e86782e02be44113)(date, this.hass.locale, this.hass.config) : (0, $2e3b0c24d7649e32$export$86a5557e1d677e29)(date, this.hass.locale, this.hass.config)}
        </div>
        ${(0, $2e3b0c24d7649e32$export$98b044737b007ca6)(this.hass.locale) ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<div class="${newDay ? "ampm-hidden" : "ampm"}">${(0, $2e3b0c24d7649e32$export$f57482e5e4ce715a)(date, this.hass.locale, this.hass.config)}</div>` : ""}
        <div class="translate-container">
          <div class="icon-container" style=${`--item-temp: ${item.temperature}`}>
            <div class="forecast-image-icon">
              ${(0, $a670ed82a1e76f75$export$e0801f527146069)(item.condition, this, !(item.is_daytime || item.is_daytime === undefined))}
            </div>
            <div class="temp">${Math.round(item.temperature)}°</div>
          </div>
          <div class="templow"></div>
        </div>
        ${this._renderPrecipitationInfo(item)}
      </div>
    `;
    }
    _renderPrecipitationInfo(item) {
        const hasPrecipitation = this._hasValidValue(item.precipitation);
        const hasPrecipitationProbability = this._hasValidValue(item.precipitation_probability);
        return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
      <div class="precipitation ${(item.precipitation ?? 0) > 0.3 ? "active" : ""}">
        ${hasPrecipitation ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`${item.precipitation.toFixed(1)}` : "—"}
      </div>
      <div class="precipitationprobability ${(item.precipitation_probability ?? 0) > 30 ? "active" : ""}">
        ${hasPrecipitationProbability ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`${item.precipitation_probability}%` : "—"}
      </div>
    `;
    }
    constructor(...args){
        super(...args);
        this.forecast = [];
    }
};
(0, $24c52f343453d62d$export$29e00dfd3077644b)([
    (0, $9cd908ed2625c047$export$d541bacb2bda4494)({
        attribute: false
    })
], $93e18bf828c9bae2$export$c4d9e0638219e78c.prototype, "hass", void 0);
(0, $24c52f343453d62d$export$29e00dfd3077644b)([
    (0, $9cd908ed2625c047$export$d541bacb2bda4494)({
        attribute: false
    })
], $93e18bf828c9bae2$export$c4d9e0638219e78c.prototype, "forecast", void 0);
$93e18bf828c9bae2$export$c4d9e0638219e78c = (0, $24c52f343453d62d$export$29e00dfd3077644b)([
    (0, $14742f68afc766d6$export$da64fc29f17f9d0e)("wfe-hourly-list")
], $93e18bf828c9bae2$export$c4d9e0638219e78c);


class $e6159c9afb48cae5$export$53427b5d95bebd88 extends (0, $ab210b2da7b39b9d$export$3f2f9f5909897157) {
    // Called by HA
    setConfig(config) {
        this._config = config;
        this._entity = config.entity;
        // call set hass() to immediately adjust to a changed entity
        // while editing the entity in the card editor
        if (this._hass) this.hass = this._hass;
    }
    set hass(hass) {
        this._hass = hass;
        this._state = hass.states[this._entity];
        if (this._state) {
            this._status = this._state.state;
            const fn = this._state.attributes.friendly_name;
            this._name = fn ? fn : this._entity;
        }
    }
    getGridOptions() {
        const minRows = 1;
<<<<<<< HEAD
        var rows = 0;
        rows += this._config.daily_forecast !== false ? 3 : 0;
        rows += this._config.hourly_forecast !== false ? 3 : 0;
=======
        var rows = 2.5;
        rows += this._config.daily_forecast !== false ? 2.5 : 0;
        rows += this._config.hourly_forecast !== false ? 3.0 : 0;
        rows = Math.floor(rows);
>>>>>>> dev
        return {
            columns: 12,
            rows: rows,
            min_columns: 6,
            min_rows: minRows
        };
    }
    static #_ = (()=>{
        // Load styles using LitElement
        this.styles = (0, $b377d607dfc671f6$export$9dd6ff9ea0189349);
    })();
    // Forecast subscriptions
    _needForecastSubscription() {
        return this._config.daily_forecast || this._config.hourly_forecast;
    }
    _unsubscribeForecastEvents() {
        Object.values(this._subscriptions).forEach((sub)=>{
            sub?.then((unsub)=>unsub());
        });
        this._subscriptions = {
            hourly: undefined,
            daily: undefined
        };
    }
    async _subscribeForecast(type) {
        if (this._subscriptions[type]) return;
        this._subscriptions[type] = (0, $a670ed82a1e76f75$export$ace10bd47409a000)(this._hass, this._entity, type, (event)=>{
            if (type === "hourly") this._forecastHourlyEvent = event;
            if (type === "daily") this._forecastDailyEvent = event;
<<<<<<< HEAD
=======
            this._calculateMinMaxTemps();
        // Hourly translation dimensions recalculation happens inside wfe-hourly-list
>>>>>>> dev
        }).catch((e)=>{
            this._subscriptions[type] = undefined;
            throw e;
        });
    }
    async _subscribeForecastEvents() {
        this._unsubscribeForecastEvents();
        const shouldSubscribe = this.isConnected && this._hass && this._config && this._needForecastSubscription() && this._hass.config.components.includes("weather") && this._state;
        if (!shouldSubscribe) return;
        [
            "hourly",
            "daily"
        ].forEach((type)=>{
            const configKey = `${type}_forecast`;
            if (this._config[configKey]) this._subscribeForecast(type);
        });
    }
    // Lit callbacks
    connectedCallback() {
        super.connectedCallback();
        if (this.hasUpdated && this._config && this._hass) this._subscribeForecastEvents();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._unsubscribeForecastEvents();
        if (this._resizeObserver) this._resizeObserver.disconnect();
    }
    updated(changedProps) {
        super.updated(changedProps);
        if (!this._config || !this._hass) return;
        if (changedProps.has("_config") || !this._subscriptions.hourly && !this._subscriptions.daily) this._subscribeForecastEvents();
        if (!this._resizeObserver) {
            const card = this.shadowRoot.querySelector("ha-card");
            const daily = this.shadowRoot.querySelector(".forecast.daily");
<<<<<<< HEAD
            const hourly = this.shadowRoot.querySelector(".forecast.daily");
            if (!card || !daily && !hourly) return;
            this._resizeObserver = new ResizeObserver(()=>this._updateGap());
            this._resizeObserver.observe(card);
            // Call once for the initial size
            this._updateGap();
            // Set translation content height for hourly forecast
            this._setTranslationContentHeight();
            console.log("FORECAST");
            console.log(this._forecastDailyEvent.forecast);
            console.log("State");
            console.log(this._state);
=======
            const hourly = this.shadowRoot.querySelector(".forecast.hourly");
            if (!card || !daily && !hourly) return;
            this._resizeObserver = new ResizeObserver(()=>{
                this._updateGap();
            });
            this._resizeObserver.observe(card);
            // Call once for the initial size
            this._updateGap();
        // Hourly translation heights are handled inside wfe-hourly-list
>>>>>>> dev
        }
    }
    // Render methods
    render() {
        if (!this._config || !this._hass) return 0, $f58f44579a4747ac$export$45b790e32b2810ee;
        if (!this._state) return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
        <hui-warning>
          ${this._name} not found.
        </hui-warning>
      `;
        // Calculate min/max temperatures for hourly forecast vertical icon translation
        if (this._forecastHourlyEvent?.forecast?.length) {
            const temps = this._forecastHourlyEvent.forecast.map((item)=>item.temperature).filter((temp)=>typeof temp === "number");
            this._hourlyMinTemp = temps.length ? Math.min(...temps) : undefined;
            this._hourlyMaxTemp = temps.length ? Math.max(...temps) : undefined;
        }
        if (this._status === "unavailable") return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
        <ha-card class="unavailable">
          <p>${this._name} is unavailable.</p>
        </ha-card>
      `;
        const showDaily = this._config.daily_forecast && this._forecastDailyEvent?.forecast?.length;
        const showHourly = this._config.hourly_forecast && this._forecastHourlyEvent?.forecast?.length;
        return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
<<<<<<< HEAD
      <ha-card header="${this._header}">
        <div class="forecast-header"></div>
        ${showDaily ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
            <div class="forecast daily">
              ${this._forecastDailyEvent.forecast.map((item)=>this.renderForecastItem(item, "daily"))}
            </div>
          ` : ""}
        ${showHourly ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
            <div class="forecast hourly" style="--min-temp: ${this._hourlyMinTemp}; --max-temp: ${this._hourlyMaxTemp};">
              ${this._forecastHourlyEvent.forecast.map((item)=>this.renderForecastItem(item, "hourly"))}
            </div>
=======
      <ha-card>
        <div class="weather" style="background-image: url(${this._getWeatherBgImage(this._state.state)})">
          <div class="temp">${this._hass.formatEntityAttributeValue(this._state, "temperature") || this._state.state}</div>
          <div class="condition">${this._hass.formatEntityState(this._state) || this._state.state}</div>
        </div>
        ${showDaily || showHourly ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
            <div class="divider"></div>
>>>>>>> dev
          ` : ""}
        <div class="forecast-container">
          <div class="forecast-daily-container">
            <div class="fade-left"></div>
            <div class="fade-right"></div>
            ${showDaily ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
                <div class="forecast daily">
                  <wfe-daily-list
                    .hass=${this._hass}
                    .forecast=${this._forecastDailyEvent.forecast}
                    .min=${this._dailyMinTemp}
                    .max=${this._dailyMaxTemp}
                  ></wfe-daily-list>
                </div>
              ` : ""}
          </div>
        <div class="divider"></div>
          <div class="forecast-hourly-container">
            <div class="fade-left"></div>
            <div class="fade-right"></div>
            ${showHourly ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
                <div class="forecast hourly"
                  style=${this._hourlyMinTemp !== undefined && this._hourlyMaxTemp !== undefined ? `--min-temp: ${this._hourlyMinTemp}; --max-temp: ${this._hourlyMaxTemp};` : (0, $f58f44579a4747ac$export$45b790e32b2810ee)}>
                  <wfe-hourly-list
                    .hass=${this._hass}
                    .forecast=${this._forecastHourlyEvent.forecast}
                  ></wfe-hourly-list>
                </div>
              ` : ""}
          </div>
        </div>
      </ha-card>
    `;
    }
    renderForecastItem(item, type) {
        if (!this._hasValidValue(item.temperature) || !this._hasValidValue(item.condition)) return 0, $f58f44579a4747ac$export$45b790e32b2810ee;
        const date = new Date(item.datetime);
        const newDay = (0, $2e3b0c24d7649e32$export$824eefb57336d873)(date, this._hass);
        const hourly = type === "hourly";
        const shouldShow = {
            dayOfMonth: !hourly,
            amPm: hourly && (0, $2e3b0c24d7649e32$export$98b044737b007ca6)(this._hass.locale),
            tempLow: this._hasValidValue(item.templow) && !hourly,
            precipitation: this._hasValidValue(item.precipitation),
            precipitationProbability: this._hasValidValue(item.precipitation_probability)
        };
        return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
    <div class="forecast-item">
      <div class=${hourly && newDay ? "new-day" : ""}>
        ${hourly ? newDay ? (0, $2e3b0c24d7649e32$export$e86782e02be44113)(date, this._hass.locale, this._hass.config) : (0, $2e3b0c24d7649e32$export$86a5557e1d677e29)(date, this._hass.locale, this._hass.config) : (0, $2e3b0c24d7649e32$export$e86782e02be44113)(date, this._hass.locale, this._hass.config)}
      </div>
      <div class="day-of-month">
        ${shouldShow.dayOfMonth ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`${(0, $2e3b0c24d7649e32$export$9ba7591c5b128371)(date, this._hass.locale, this._hass.config)}` : ""}
      </div>
      <div class="${newDay ? "ampm-hidden" : "ampm"}">
        ${shouldShow.amPm ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`${(0, $2e3b0c24d7649e32$export$f57482e5e4ce715a)(date, this._hass.locale, this._hass.config)}` : ""}
      </div>
      <div class="translate-container">
        <div class="icon-container" style=${hourly ? `--item-temp: ${item.temperature}` : ""}>
            ${item.condition ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
              <div class="forecast-image-icon">
              ${(0, $a670ed82a1e76f75$export$e0801f527146069)(item.condition, this, !(item.is_daytime || item.is_daytime === undefined))}
              </div>
              ` : ""}
          <div class="temp">
            ${Math.round(item.temperature)}°
          </div>
          <div class="templow">
            ${shouldShow.tempLow ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`${Math.round(item.templow)}°` : hourly ? "" : "—"}
          </div>
        </div>
      </div>
      <div class="precipitation ${item.precipitation > 0.3 ? "active" : ""}">
        ${shouldShow.precipitation ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`${item.precipitation.toFixed(1)}` : "—"}
      </div>
      <div class="precipitationprobability ${item.precipitation_probability > 30 ? "active" : ""}">
        ${shouldShow.precipitationProbability ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`${item.precipitation_probability}%` : "—"}
      </div>
    </div>
    `;
    }
    // Private methods
    _calculateMinMaxTemps() {
        if (this._forecastHourlyEvent?.forecast?.length) {
            const temps = this._forecastHourlyEvent.forecast.map((item)=>item.temperature).filter((temp)=>typeof temp === "number");
            this._hourlyMinTemp = temps.length ? Math.min(...temps) : undefined;
            this._hourlyMaxTemp = temps.length ? Math.max(...temps) : undefined;
        }
        if (this._forecastDailyEvent?.forecast?.length) {
            const dailyTemps = this._forecastDailyEvent.forecast.flatMap((item)=>[
                    item.temperature,
                    item.templow
                ].filter((temp)=>typeof temp === "number"));
            this._dailyMinTemp = dailyTemps.length ? Math.min(...dailyTemps) : undefined;
            this._dailyMaxTemp = dailyTemps.length ? Math.max(...dailyTemps) : undefined;
        }
    }
    _getWeatherBgImage(state) {
        // this._state.state is a string like "snowy-rainy"
        // The WeatherImages object keys are like "snowyrainy"
        // So we need to remove the hyphens from the state string
        const imageKey = state.replace(/-/g, "");
        return (0, $04b2058bf019e2da$export$d0bd520bd5ddb657)[imageKey] ?? (0, $04b2058bf019e2da$export$d0bd520bd5ddb657).partlycloudy; // Fallback
    }
    _updateGap() {
        const container = this.shadowRoot.querySelector("ha-card");
        const daily = this.shadowRoot.querySelector(".forecast.daily");
        const hourly = this.shadowRoot.querySelector(".forecast.hourly");
        if (!container || !daily && !hourly) return;
        const containerWidth = container.clientWidth;
        if (containerWidth === this._oldContainerWidth) return;
        [
            daily,
            hourly
        ].forEach((elem)=>{
            if (elem) {
                const itemWidth = parseInt(getComputedStyle(elem).getPropertyValue("--icon-container-width"));
                const minGap = parseInt(getComputedStyle(elem).getPropertyValue("--min-gap"));
                const padding = 16;
                const maxItems = Math.floor((containerWidth + minGap - 2 * padding) / (itemWidth + minGap));
                if (maxItems < 2) return; // Avoid divide by zero
                const totalItemWidth = maxItems * itemWidth;
                const gap = Math.round((containerWidth - 2 * padding - totalItemWidth) / (maxItems - 1));
                elem.style.setProperty("--dynamic-gap", `${gap}px`);
            }
        });
        this._oldContainerWidth = containerWidth;
    }
<<<<<<< HEAD
    // Queries the height of the temperature text element and saves it as a CSS variable
    // So it can be used for the CSS calculation of the vertical icon translation in the hourly forecast
    // (based on the temperature)
    _setTranslationContentHeight() {
        const hourly = this.shadowRoot.querySelector(".forecast.hourly");
        if (!hourly) return;
        const container = hourly.querySelector(".icon-container");
        if (!container) return;
        const contentHeight = container.offsetHeight;
        hourly.style.setProperty("--translate-content-height", `${contentHeight}px`);
    }
=======
>>>>>>> dev
    constructor(...args){
        super(...args);
        // private property
        this._subscriptions = {
            hourly: undefined,
            daily: undefined
        };
    }
}
(0, $24c52f343453d62d$export$29e00dfd3077644b)([
    (0, $04c21ea1ce1f6057$export$ca000e230c0caa3e)()
], $e6159c9afb48cae5$export$53427b5d95bebd88.prototype, "_config", void 0);
(0, $24c52f343453d62d$export$29e00dfd3077644b)([
    (0, $04c21ea1ce1f6057$export$ca000e230c0caa3e)()
], $e6159c9afb48cae5$export$53427b5d95bebd88.prototype, "_entity", void 0);
(0, $24c52f343453d62d$export$29e00dfd3077644b)([
    (0, $04c21ea1ce1f6057$export$ca000e230c0caa3e)()
], $e6159c9afb48cae5$export$53427b5d95bebd88.prototype, "_name", void 0);
(0, $24c52f343453d62d$export$29e00dfd3077644b)([
    (0, $04c21ea1ce1f6057$export$ca000e230c0caa3e)()
], $e6159c9afb48cae5$export$53427b5d95bebd88.prototype, "_state", void 0);
(0, $24c52f343453d62d$export$29e00dfd3077644b)([
    (0, $04c21ea1ce1f6057$export$ca000e230c0caa3e)()
], $e6159c9afb48cae5$export$53427b5d95bebd88.prototype, "_status", void 0);
(0, $24c52f343453d62d$export$29e00dfd3077644b)([
    (0, $04c21ea1ce1f6057$export$ca000e230c0caa3e)()
], $e6159c9afb48cae5$export$53427b5d95bebd88.prototype, "_forecastDailyEvent", void 0);
(0, $24c52f343453d62d$export$29e00dfd3077644b)([
    (0, $04c21ea1ce1f6057$export$ca000e230c0caa3e)()
], $e6159c9afb48cae5$export$53427b5d95bebd88.prototype, "_forecastHourlyEvent", void 0);


customElements.define("weather-forecast-extended-card", (0, $e6159c9afb48cae5$export$53427b5d95bebd88));
window.customCards = window.customCards || [];
window.customCards.push({
    type: "weather-forecast-extended-card",
    name: "Weather Forecast Extended",
    description: "Weather forecast similar to the default HA card, but with some additional information"
});


//# sourceMappingURL=weatherforecastextended.js.map
