function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire94c2"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire94c2"] = parcelRequire;
}
parcelRequire.register("39J5i", function(module, exports) {

$parcel$export(module.exports, "__decorate", () => $24c52f343453d62d$export$29e00dfd3077644b);
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

});

parcelRequire.register("j0ZcV", function(module, exports) {
$parcel$export(module.exports, "css", () => (parcelRequire("j8KxL")).css);
$parcel$export(module.exports, "html", () => (parcelRequire("l56HR")).html);
$parcel$export(module.exports, "LitElement", () => (parcelRequire("eGUNk")).LitElement);
$parcel$export(module.exports, "nothing", () => (parcelRequire("l56HR")).nothing);
$parcel$export(module.exports, "svg", () => (parcelRequire("l56HR")).svg);
$parcel$export(module.exports, "unsafeCSS", () => (parcelRequire("j8KxL")).unsafeCSS);
parcelRequire("2emM7");
parcelRequire("l56HR");
parcelRequire("eGUNk");
parcelRequire("dJV7N");

});
parcelRequire.register("2emM7", function(module, exports) {

$parcel$export(module.exports, "ReactiveElement", () => $19fe8e3abedf4df0$export$c7c07a37856565d);
$parcel$export(module.exports, "css", () => (parcelRequire("j8KxL")).css);
$parcel$export(module.exports, "unsafeCSS", () => (parcelRequire("j8KxL")).unsafeCSS);

var $j8KxL = parcelRequire("j8KxL");
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
            for (const i of e)s.unshift((0, $j8KxL.getCompatibleStyle)(i));
        } else void 0 !== i && s.push((0, $j8KxL.getCompatibleStyle)(i));
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
        return (0, $j8KxL.adoptStyles)(s, this.constructor.elementStyles), s;
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

});
parcelRequire.register("j8KxL", function(module, exports) {

$parcel$export(module.exports, "unsafeCSS", () => $def2de46b9306e8a$export$8d80f9cac07cdb3);
$parcel$export(module.exports, "css", () => $def2de46b9306e8a$export$dbf350e5966cf602);
$parcel$export(module.exports, "adoptStyles", () => $def2de46b9306e8a$export$2ca4a66ec4cecb90);
$parcel$export(module.exports, "getCompatibleStyle", () => $def2de46b9306e8a$export$ee69dfd951e24778);
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

});


parcelRequire.register("l56HR", function(module, exports) {

$parcel$export(module.exports, "html", () => $f58f44579a4747ac$export$c0bb0b647f701bb5);
$parcel$export(module.exports, "svg", () => $f58f44579a4747ac$export$7ed1367e7fa1ad68);
$parcel$export(module.exports, "noChange", () => $f58f44579a4747ac$export$9c068ae9cc5db4e8);
$parcel$export(module.exports, "nothing", () => $f58f44579a4747ac$export$45b790e32b2810ee);
$parcel$export(module.exports, "render", () => $f58f44579a4747ac$export$b3890eb0ae9dca99);
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

});

parcelRequire.register("eGUNk", function(module, exports) {
$parcel$export(module.exports, "css", () => (parcelRequire("j8KxL")).css);
$parcel$export(module.exports, "unsafeCSS", () => (parcelRequire("j8KxL")).unsafeCSS);
$parcel$export(module.exports, "ReactiveElement", () => (parcelRequire("2emM7")).ReactiveElement);
$parcel$export(module.exports, "html", () => (parcelRequire("l56HR")).html);
$parcel$export(module.exports, "noChange", () => (parcelRequire("l56HR")).noChange);
$parcel$export(module.exports, "nothing", () => (parcelRequire("l56HR")).nothing);
$parcel$export(module.exports, "render", () => (parcelRequire("l56HR")).render);
$parcel$export(module.exports, "svg", () => (parcelRequire("l56HR")).svg);

$parcel$export(module.exports, "LitElement", () => $ab210b2da7b39b9d$export$3f2f9f5909897157);

var $2emM7 = parcelRequire("2emM7");

var $l56HR = parcelRequire("l56HR");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var $ab210b2da7b39b9d$var$l, $ab210b2da7b39b9d$var$o;
const $ab210b2da7b39b9d$export$8bf27daf9e8907c9 = (0, $2emM7.ReactiveElement);
class $ab210b2da7b39b9d$export$3f2f9f5909897157 extends (0, $2emM7.ReactiveElement) {
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
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = (0, $l56HR.render)(i, this.renderRoot, this.renderOptions);
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
        return 0, $l56HR.noChange;
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

});

parcelRequire.register("dJV7N", function(module, exports) {
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $a00bca1a101a9088$export$6acf61af03e62db = !1;

});


parcelRequire.register("1ZxoT", function(module, exports) {
$parcel$export(module.exports, "customElement", () => (parcelRequire("1KSgR")).customElement);
$parcel$export(module.exports, "property", () => (parcelRequire("dsTCw")).property);
$parcel$export(module.exports, "state", () => (parcelRequire("pklEb")).state);
parcelRequire("1KSgR");
parcelRequire("dsTCw");
parcelRequire("pklEb");
parcelRequire("fsW8U");
parcelRequire("e0PuK");
parcelRequire("kmDQA");
parcelRequire("k7g5J");
parcelRequire("7p6n6");
parcelRequire("9PNfg");

});
parcelRequire.register("1KSgR", function(module, exports) {

$parcel$export(module.exports, "customElement", () => $14742f68afc766d6$export$da64fc29f17f9d0e);
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

});

parcelRequire.register("dsTCw", function(module, exports) {

$parcel$export(module.exports, "property", () => $9cd908ed2625c047$export$d541bacb2bda4494);
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

});

parcelRequire.register("pklEb", function(module, exports) {

$parcel$export(module.exports, "state", () => $04c21ea1ce1f6057$export$ca000e230c0caa3e);

var $dsTCw = parcelRequire("dsTCw");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $04c21ea1ce1f6057$export$ca000e230c0caa3e(t) {
    return (0, $dsTCw.property)({
        ...t,
        state: !0
    });
}

});

parcelRequire.register("fsW8U", function(module, exports) {

var $3fOhc = parcelRequire("3fOhc");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $b4269277b3c48b0c$export$b2b799818fbabcf3(e) {
    return (0, $3fOhc.decorateProperty)({
        finisher: (r, t)=>{
            Object.assign(r.prototype[t], e);
        }
    });
}

});
parcelRequire.register("3fOhc", function(module, exports) {

$parcel$export(module.exports, "decorateProperty", () => $25e9c5a8f7ecfc69$export$757d561a932dc1cb);
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

});


parcelRequire.register("e0PuK", function(module, exports) {

var $3fOhc = parcelRequire("3fOhc");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $02a1f3a787c54a30$export$2fa187e846a241c4(i, n) {
    return (0, $3fOhc.decorateProperty)({
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

});

parcelRequire.register("kmDQA", function(module, exports) {

var $3fOhc = parcelRequire("3fOhc");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $ed34c589b230c255$export$dcd0d083aa86c355(e) {
    return (0, $3fOhc.decorateProperty)({
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

});

parcelRequire.register("k7g5J", function(module, exports) {

var $3fOhc = parcelRequire("3fOhc");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $ea50f1870b80cbec$export$163dfc35cc43f240(e) {
    return (0, $3fOhc.decorateProperty)({
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

});

parcelRequire.register("7p6n6", function(module, exports) {

$parcel$export(module.exports, "queryAssignedElements", () => $563fcf7ce7e6c5aa$export$4682af2d9ee91415);

var $3fOhc = parcelRequire("3fOhc");
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var $563fcf7ce7e6c5aa$var$n;
const $563fcf7ce7e6c5aa$var$e = null != (null === ($563fcf7ce7e6c5aa$var$n = window.HTMLSlotElement) || void 0 === $563fcf7ce7e6c5aa$var$n ? void 0 : $563fcf7ce7e6c5aa$var$n.prototype.assignedElements) ? (o, n)=>o.assignedElements(n) : (o, n)=>o.assignedNodes(n).filter((o)=>o.nodeType === Node.ELEMENT_NODE);
function $563fcf7ce7e6c5aa$export$4682af2d9ee91415(n) {
    const { slot: l , selector: t  } = null != n ? n : {};
    return (0, $3fOhc.decorateProperty)({
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

});

parcelRequire.register("9PNfg", function(module, exports) {

var $3fOhc = parcelRequire("3fOhc");

var $7p6n6 = parcelRequire("7p6n6");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $728f1385dd7bf557$export$1bdbe53f9df1b8(o, n, r) {
    let l, s = o;
    return "object" == typeof o ? (s = o.slot, l = o) : l = {
        flatten: n
    }, r ? (0, $7p6n6.queryAssignedElements)({
        slot: s,
        flatten: n,
        selector: r
    }) : (0, $3fOhc.decorateProperty)({
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

});


parcelRequire.register("iFK5S", function(module, exports) {
module.exports = import("./weather-forecast-extended-editor.3d7dce5b.js").then(()=>parcelRequire("bwZCh"));

});


var $39J5i = parcelRequire("39J5i");
parcelRequire("j0ZcV");
var $l56HR = parcelRequire("l56HR");
var $eGUNk = parcelRequire("eGUNk");

var $l56HR = parcelRequire("l56HR");
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
 */ const $ca7e425cc484d5ff$export$56cc687933817664 = (0, $107bb7d062dde330$export$99b43ad1ed32e735)(class extends (0, $107bb7d062dde330$export$befdefbdce210f91) {
    constructor(t){
        var i;
        if (super(t), t.type !== (0, $107bb7d062dde330$export$9ba3b3f20a85bfa).ATTRIBUTE || "class" !== t.name || (null === (i = t.strings) || void 0 === i ? void 0 : i.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
    }
    render(t) {
        return " " + Object.keys(t).filter((i)=>t[i]).join(" ") + " ";
    }
    update(i, [s]) {
        var r, o;
        if (void 0 === this.it) {
            this.it = new Set, void 0 !== i.strings && (this.nt = new Set(i.strings.join(" ").split(/\s/).filter((t)=>"" !== t)));
            for(const t in s)s[t] && !(null === (r = this.nt) || void 0 === r ? void 0 : r.has(t)) && this.it.add(t);
            return this.render(s);
        }
        const e = i.element.classList;
        this.it.forEach((t)=>{
            t in s || (e.remove(t), this.it.delete(t));
        });
        for(const t in s){
            const i = !!s[t];
            i === this.it.has(t) || (null === (o = this.nt) || void 0 === o ? void 0 : o.has(t)) || (i ? (e.add(t), this.it.add(t)) : (e.remove(t), this.it.delete(t)));
        }
        return 0, $l56HR.noChange;
    }
});





var $l56HR = parcelRequire("l56HR");

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
        return 0, $l56HR.noChange;
    }
});




parcelRequire("1ZxoT");
var $pklEb = parcelRequire("pklEb");
// Code adapted from frontend/src/data/weather.ts to make it useable in custom cards
parcelRequire("j0ZcV");
var $l56HR = parcelRequire("l56HR");

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
    return (0, $l56HR.html)`
    ${weatherAttrIcon ? (0, $l56HR.html)`
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
    return (0, $l56HR.html)`
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
const $a670ed82a1e76f75$var$getWeatherStateSVG = (state, nightTime)=>(0, $l56HR.svg)`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 17 17"
  >
  ${state === "sunny" ? (0, $l56HR.svg)`
          <path
            class="sun"
            d="m 14.39303,8.4033507 c 0,3.3114723 -2.684145,5.9956173 -5.9956169,5.9956173 -3.3114716,0 -5.9956168,-2.684145 -5.9956168,-5.9956173 0,-3.311471 2.6841452,-5.995617 5.9956168,-5.995617 3.3114719,0 5.9956169,2.684146 5.9956169,5.995617"
          />
        ` : ""}
  ${state === "clear-night" ? (0, $l56HR.svg)`
          <path
            class="moon"
            d="m 13.502891,11.382935 c -1.011285,1.859223 -2.976664,3.121381 -5.2405751,3.121381 -3.289929,0 -5.953329,-2.663833 -5.953329,-5.9537625 0,-2.263911 1.261724,-4.228856 3.120948,-5.240575 -0.452782,0.842738 -0.712753,1.806363 -0.712753,2.832381 0,3.289928 2.663833,5.9533275 5.9533291,5.9533275 1.026017,0 1.989641,-0.259969 2.83238,-0.712752"
          />
        ` : ""}
  ${state === "partlycloudy" && nightTime ? (0, $l56HR.svg)`
          <path
            class="moon"
            transform="scale(0.65 0.65) translate(11 -3)"
            d="m 13.502891,11.382935 c -1.011285,1.859223 -2.976664,3.121381 -5.2405751,3.121381 -3.289929,0 -5.953329,-2.663833 -5.953329,-5.9537625 0,-2.263911 1.261724,-4.228856 3.120948,-5.240575 -0.452782,0.842738 -0.712753,1.806363 -0.712753,2.832381 0,3.289928 2.663833,5.9533275 5.9533291,5.9533275 1.026017,0 1.989641,-0.259969 2.83238,-0.712752"
          />
        ` : state === "partlycloudy" ? (0, $l56HR.svg)`
          <path
            class="sun"
            d="m14.981 4.2112c0 1.9244-1.56 3.4844-3.484 3.4844-1.9244 0-3.4844-1.56-3.4844-3.4844s1.56-3.484 3.4844-3.484c1.924 0 3.484 1.5596 3.484 3.484"
          />
        ` : ""}
  ${$a670ed82a1e76f75$var$cloudyStates.has(state) ? state === "partlycloudy" && nightTime ? (0, $l56HR.svg)`
            <g transform="translate(-1 1) scale(1 1)">
              <path
                class="cloud-back"
                d="m3.8863 5.035c-0.54892 0.16898-1.04 0.46637-1.4372 0.8636-0.63077 0.63041-1.0206 1.4933-1.0206 2.455 0 1.9251 1.5589 3.4682 3.4837 3.4682h6.9688c1.9251 0 3.484-1.5981 3.484-3.5232 0-1.9251-1.5589-3.5232-3.484-3.5232h-1.0834c-0.25294-1.6916-1.6986-2.9083-3.4463-2.9083-1.7995 0-3.2805 1.4153-3.465 3.1679"
              />
              <path
                class="cloud-front"
                d="m4.1996 7.6995c-0.33902 0.10407-0.64276 0.28787-0.88794 0.5334-0.39017 0.38982-0.63147 0.92322-0.63147 1.5176 0 1.1896 0.96414 2.1431 2.1537 2.1431h4.3071c1.1896 0 2.153-0.98742 2.153-2.1777 0-1.1896-0.96344-2.1777-2.153-2.1777h-0.66992c-0.15593-1.0449-1.0499-1.7974-2.1297-1.7974-1.112 0-2.0274 0.87524-2.1417 1.9586"
              />
            </g>
          ` : (0, $l56HR.svg)`
            <path
              class="cloud-back"
              d="m3.8863 5.035c-0.54892 0.16898-1.04 0.46637-1.4372 0.8636-0.63077 0.63041-1.0206 1.4933-1.0206 2.455 0 1.9251 1.5589 3.4682 3.4837 3.4682h6.9688c1.9251 0 3.484-1.5981 3.484-3.5232 0-1.9251-1.5589-3.5232-3.484-3.5232h-1.0834c-0.25294-1.6916-1.6986-2.9083-3.4463-2.9083-1.7995 0-3.2805 1.4153-3.465 3.1679"
            />
            <path
              class="cloud-front"
              d="m4.1996 7.6995c-0.33902 0.10407-0.64276 0.28787-0.88794 0.5334-0.39017 0.38982-0.63147 0.92322-0.63147 1.5176 0 1.1896 0.96414 2.1431 2.1537 2.1431h4.3071c1.1896 0 2.153-0.98742 2.153-2.1777 0-1.1896-0.96344-2.1777-2.153-2.1777h-0.66992c-0.15593-1.0449-1.0499-1.7974-2.1297-1.7974-1.112 0-2.0274 0.87524-2.1417 1.9586"
            />
          ` : ""}
  ${$a670ed82a1e76f75$var$rainStates.has(state) ? (0, $l56HR.svg)`
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
  ${state === "pouring" ? (0, $l56HR.svg)`
          <path
            class="rain"
            d="m10.648 16.448c-0.19226 0.21449-0.49001 0.25894-0.66499 0.09878-0.17498-0.16016-0.16087-0.4639 0.03175-0.67874 0.12665-0.14146 0.50694-0.2854 0.75071-0.36724 0.10689-0.03563 0.19473 0.0448 0.17004 0.15558-0.05645 0.25365-0.16051 0.65017-0.28751 0.79163"
          />
          <path
            class="rain"
            d="m5.9383 16.658c-0.22437 0.25012-0.5715 0.30162-0.77505 0.11501-0.20391-0.18627-0.18768-0.54046 0.036689-0.79093 0.14817-0.1651 0.59126-0.33267 0.87559-0.42827 0.12418-0.04127 0.22648 0.05221 0.19791 0.18168-0.065617 0.29528-0.18732 0.75741-0.33514 0.92251"
          />
        ` : ""}
  ${$a670ed82a1e76f75$var$windyStates.has(state) ? (0, $l56HR.svg)`
          <path
            class="cloud-back"
            d="m 13.59616,15.30968 c 0,0 -0.09137,-0.0071 -0.250472,-0.0187 -0.158045,-0.01235 -0.381353,-0.02893 -0.64382,-0.05715 -0.262466,-0.02716 -0.564444,-0.06385 -0.877358,-0.124531 -0.156986,-0.03034 -0.315383,-0.06844 -0.473781,-0.111478 -0.157691,-0.04551 -0.313266,-0.09842 -0.463902,-0.161219 l -0.267406,-0.0949 c -0.09984,-0.02646 -0.205669,-0.04904 -0.305153,-0.06738 -0.193322,-0.02716 -0.3838218,-0.03316 -0.5640912,-0.02011 -0.3626556,0.02611 -0.6847417,0.119239 -0.94615,0.226483 -0.2617611,0.108656 -0.4642556,0.230364 -0.600075,0.324203 -0.1358195,0.09419 -0.2049639,0.160514 -0.2049639,0.160514 0,0 0.089958,-0.01623 0.24765,-0.04445 0.1559278,-0.02575 0.3764139,-0.06174 0.6367639,-0.08714 0.2596444,-0.02646 0.5591527,-0.0441 0.8678333,-0.02328 0.076905,0.0035 0.1538111,0.01658 0.2321278,0.02293 0.077611,0.01058 0.1534581,0.02893 0.2314221,0.04022 0.07267,0.01834 0.1397,0.03986 0.213078,0.05644 l 0.238125,0.08925 c 0.09207,0.03281 0.183444,0.07055 0.275872,0.09878 0.09243,0.0261 0.185208,0.05327 0.277636,0.07161 0.184856,0.0388 0.367947,0.06174 0.543983,0.0702 0.353131,0.01905 0.678745,-0.01341 0.951442,-0.06456 0.27305,-0.05292 0.494595,-0.123119 0.646642,-0.181681 0.152047,-0.05785 0.234597,-0.104069 0.234597,-0.104069"
          />
          <path
            class="cloud-back"
            d="m 4.7519154,13.905801 c 0,0 0.091369,-0.0032 0.2511778,-0.0092 0.1580444,-0.0064 0.3820583,-0.01446 0.6455833,-0.03281 0.2631722,-0.01729 0.5662083,-0.04269 0.8812389,-0.09137 0.1576916,-0.02434 0.3175,-0.05609 0.4776611,-0.09384 0.1591027,-0.03951 0.3167944,-0.08643 0.4699,-0.14358 l 0.2702277,-0.08467 c 0.1008945,-0.02222 0.2074334,-0.04127 0.3072695,-0.05574 0.1943805,-0.01976 0.3848805,-0.0187 0.5651499,0.0014 0.3608917,0.03951 0.67945,0.144639 0.936625,0.261761 0.2575278,0.118534 0.4554364,0.247297 0.5873754,0.346781 0.132291,0.09913 0.198966,0.168275 0.198966,0.168275 0,0 -0.08925,-0.01976 -0.245886,-0.05397 C 9.9423347,14.087088 9.7232597,14.042988 9.4639681,14.00736 9.2057347,13.97173 8.9072848,13.94245 8.5978986,13.95162 c -0.077258,7.06e-4 -0.1541638,0.01058 -0.2328333,0.01411 -0.077964,0.0078 -0.1545166,0.02328 -0.2331861,0.03175 -0.073025,0.01588 -0.1404055,0.03422 -0.2141361,0.04798 l -0.2420055,0.08008 c -0.093486,0.02963 -0.1859139,0.06421 -0.2794,0.0889 C 7.3028516,14.23666 7.2093653,14.2603 7.116232,14.27512 6.9303181,14.30722 6.7465209,14.3231 6.5697792,14.32486 6.2166487,14.33046 5.8924459,14.28605 5.6218654,14.224318 5.3505793,14.161565 5.1318571,14.082895 4.9822793,14.01869 4.8327015,13.95519 4.7519154,13.905801 4.7519154,13.905801"
          />
        ` : ""}
  ${$a670ed82a1e76f75$var$snowyStates.has(state) ? (0, $l56HR.svg)`
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
  ${$a670ed82a1e76f75$var$lightningStates.has(state) ? (0, $l56HR.svg)`
          <path
            class="sun"
            d="m 9.9252695,10.935875 -1.6483986,2.341014 1.1170184,0.05929 -1.2169864,2.02141 3.0450261,-2.616159 H 9.8864918 L 10.97937,11.294651 10.700323,10.79794 h -0.508706 l -0.2663475,0.137936"
          />
        ` : ""}
  </svg>`;
const $a670ed82a1e76f75$export$e0801f527146069 = (state, element, nightTime, iconMap)=>{
    const isPartlyCloudyNight = state === "partlycloudy" && nightTime;
    const mapKey = isPartlyCloudyNight ? "partlycloudy-night" : state;
    const mappedIcon = iconMap?.[mapKey];
    const normalizedIcon = typeof mappedIcon === "string" ? mappedIcon.trim() : "";
    if (normalizedIcon) return (0, $l56HR.html)`<ha-icon icon=${normalizedIcon}></ha-icon>`;
    const userDefinedIcon = getComputedStyle(element).getPropertyValue(`--weather-icon-${state}`);
    if (userDefinedIcon) return (0, $l56HR.html)`
      <div
        style="background-size: cover;${(0, $19f464fcda7d2482$export$1e5b4ce2fa884e6a)({
        "background-image": userDefinedIcon
    })}"
      ></div>
    `;
    if ($a670ed82a1e76f75$export$8f7ca90fe05ed3ab.has(state)) return (0, $l56HR.html)`${$a670ed82a1e76f75$var$getWeatherStateSVG(state, nightTime)}`;
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


var $8944235bd8be49ac$exports = {};

$parcel$export($8944235bd8be49ac$exports, "selectUnit", () => $8944235bd8be49ac$export$b8f7189986dd5395);
var $8944235bd8be49ac$var$__assign = undefined && undefined.__assign || function() {
    $8944235bd8be49ac$var$__assign = Object.assign || function(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return $8944235bd8be49ac$var$__assign.apply(this, arguments);
};
var $8944235bd8be49ac$var$MS_PER_SECOND = 1e3;
var $8944235bd8be49ac$var$SECS_PER_MIN = 60;
var $8944235bd8be49ac$var$SECS_PER_HOUR = $8944235bd8be49ac$var$SECS_PER_MIN * 60;
var $8944235bd8be49ac$var$SECS_PER_DAY = $8944235bd8be49ac$var$SECS_PER_HOUR * 24;
var $8944235bd8be49ac$var$SECS_PER_WEEK = $8944235bd8be49ac$var$SECS_PER_DAY * 7;
function $8944235bd8be49ac$export$b8f7189986dd5395(from, to, thresholds) {
    if (to === void 0) to = Date.now();
    if (thresholds === void 0) thresholds = {};
    var resolvedThresholds = $8944235bd8be49ac$var$__assign($8944235bd8be49ac$var$__assign({}, $8944235bd8be49ac$export$f4fd60e41371f80d), thresholds || {});
    var secs = (+from - +to) / $8944235bd8be49ac$var$MS_PER_SECOND;
    if (Math.abs(secs) < resolvedThresholds.second) return {
        value: Math.round(secs),
        unit: "second"
    };
    var mins = secs / $8944235bd8be49ac$var$SECS_PER_MIN;
    if (Math.abs(mins) < resolvedThresholds.minute) return {
        value: Math.round(mins),
        unit: "minute"
    };
    var hours = secs / $8944235bd8be49ac$var$SECS_PER_HOUR;
    if (Math.abs(hours) < resolvedThresholds.hour) return {
        value: Math.round(hours),
        unit: "hour"
    };
    var days = secs / $8944235bd8be49ac$var$SECS_PER_DAY;
    if (Math.abs(days) < resolvedThresholds.day) return {
        value: Math.round(days),
        unit: "day"
    };
    var fromDate = new Date(from);
    var toDate = new Date(to);
    var years = fromDate.getFullYear() - toDate.getFullYear();
    if (Math.round(Math.abs(years)) > 0) return {
        value: Math.round(years),
        unit: "year"
    };
    var months = years * 12 + fromDate.getMonth() - toDate.getMonth();
    if (Math.round(Math.abs(months)) > 0) return {
        value: Math.round(months),
        unit: "month"
    };
    var weeks = secs / $8944235bd8be49ac$var$SECS_PER_WEEK;
    return {
        value: Math.round(weeks),
        unit: "week"
    };
}
var $8944235bd8be49ac$export$f4fd60e41371f80d = {
    second: 45,
    minute: 45,
    hour: 22,
    day: 5
};


var $ee1328194d522913$export$27bce688931fdfcc, $ee1328194d522913$export$7fd1ce15b01d50ca, $ee1328194d522913$export$1a0dc7c974e8444d = function(e, t) {
    return $ee1328194d522913$var$i(t).format(e);
}, $ee1328194d522913$var$i = function(e) {
    return new Intl.DateTimeFormat(e.language, {
        weekday: "long",
        month: "long",
        day: "numeric"
    });
}, $ee1328194d522913$export$3ae94a2503e890a1 = function(e, t) {
    return $ee1328194d522913$var$o(t).format(e);
}, $ee1328194d522913$var$o = function(e) {
    return new Intl.DateTimeFormat(e.language, {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}, $ee1328194d522913$export$fbb9ef859002af37 = function(e, t) {
    return $ee1328194d522913$var$c(t).format(e);
}, $ee1328194d522913$var$c = function(e) {
    return new Intl.DateTimeFormat(e.language, {
        year: "numeric",
        month: "numeric",
        day: "numeric"
    });
}, $ee1328194d522913$export$7813392c1f00426f = function(e, t) {
    return $ee1328194d522913$var$s(t).format(e);
}, $ee1328194d522913$var$s = function(e) {
    return new Intl.DateTimeFormat(e.language, {
        day: "numeric",
        month: "short"
    });
}, $ee1328194d522913$export$295e1e57d6713bf4 = function(e, t) {
    return $ee1328194d522913$var$d(t).format(e);
}, $ee1328194d522913$var$d = function(e) {
    return new Intl.DateTimeFormat(e.language, {
        month: "long",
        year: "numeric"
    });
}, $ee1328194d522913$export$cbc7ca92d37b9650 = function(e, t) {
    return $ee1328194d522913$var$g(t).format(e);
}, $ee1328194d522913$var$g = function(e) {
    return new Intl.DateTimeFormat(e.language, {
        month: "long"
    });
}, $ee1328194d522913$export$5a252a405018366 = function(e, t) {
    return $ee1328194d522913$var$h(t).format(e);
}, $ee1328194d522913$var$h = function(e) {
    return new Intl.DateTimeFormat(e.language, {
        year: "numeric"
    });
};
!function(e) {
    e.language = "language", e.system = "system", e.comma_decimal = "comma_decimal", e.decimal_comma = "decimal_comma", e.space_comma = "space_comma", e.none = "none";
}($ee1328194d522913$export$27bce688931fdfcc || ($ee1328194d522913$export$27bce688931fdfcc = {})), function(e) {
    e.language = "language", e.system = "system", e.am_pm = "12", e.twenty_four = "24";
}($ee1328194d522913$export$7fd1ce15b01d50ca || ($ee1328194d522913$export$7fd1ce15b01d50ca = {}));
var $ee1328194d522913$var$b = function(e) {
    if (e.time_format === $ee1328194d522913$export$7fd1ce15b01d50ca.language || e.time_format === $ee1328194d522913$export$7fd1ce15b01d50ca.system) {
        var t = e.time_format === $ee1328194d522913$export$7fd1ce15b01d50ca.language ? e.language : void 0, n = (new Date).toLocaleString(t);
        return n.includes("AM") || n.includes("PM");
    }
    return e.time_format === $ee1328194d522913$export$7fd1ce15b01d50ca.am_pm;
}, $ee1328194d522913$export$8b492ed8828f789c = function(e, t) {
    return $ee1328194d522913$var$_(t).format(e);
}, $ee1328194d522913$var$_ = function(e) {
    return new Intl.DateTimeFormat(e.language, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: $ee1328194d522913$var$b(e) ? "numeric" : "2-digit",
        minute: "2-digit",
        hour12: $ee1328194d522913$var$b(e)
    });
}, $ee1328194d522913$export$c2c7ff0067c06a13 = function(e, t) {
    return $ee1328194d522913$var$w(t).format(e);
}, $ee1328194d522913$var$w = function(e) {
    return new Intl.DateTimeFormat(e.language, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: $ee1328194d522913$var$b(e) ? "numeric" : "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: $ee1328194d522913$var$b(e)
    });
}, $ee1328194d522913$export$c8a72f22956ccab0 = function(e, t) {
    return $ee1328194d522913$var$x(t).format(e);
}, $ee1328194d522913$var$x = function(e) {
    return new Intl.DateTimeFormat(e.language, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: $ee1328194d522913$var$b(e)
    });
}, $ee1328194d522913$export$3203edd9e5edd663 = function(e, t) {
    return $ee1328194d522913$var$S(t).format(e);
}, $ee1328194d522913$var$S = function(e) {
    return new Intl.DateTimeFormat(e.language, {
        hour: "numeric",
        minute: "2-digit",
        hour12: $ee1328194d522913$var$b(e)
    });
}, $ee1328194d522913$export$ec86e83f20e68cd8 = function(e, t) {
    return $ee1328194d522913$var$T(t).format(e);
}, $ee1328194d522913$var$T = function(e) {
    return new Intl.DateTimeFormat(e.language, {
        hour: $ee1328194d522913$var$b(e) ? "numeric" : "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: $ee1328194d522913$var$b(e)
    });
}, $ee1328194d522913$export$ad627f6ad084f5a2 = function(e, t) {
    return $ee1328194d522913$var$N(t).format(e);
}, $ee1328194d522913$var$N = function(e) {
    return new Intl.DateTimeFormat(e.language, {
        hour: $ee1328194d522913$var$b(e) ? "numeric" : "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: $ee1328194d522913$var$b(e)
    });
}, $ee1328194d522913$export$caddcc104251c1d7 = function(t, r, n, i) {
    void 0 === i && (i = !0);
    var a = (0, $8944235bd8be49ac$exports.selectUnit)(t, n);
    return i ? (function(e) {
        return new Intl.RelativeTimeFormat(e.language, {
            numeric: "auto"
        });
    })(r).format(a.value, a.unit) : Intl.NumberFormat(r.language, {
        style: "unit",
        unit: a.unit,
        unitDisplay: "long"
    }).format(Math.abs(a.value));
};
function $ee1328194d522913$export$50fe296bd2427aef(e) {
    var t, r = 3600 * (t = e.attributes.remaining.split(":").map(Number))[0] + 60 * t[1] + t[2];
    if ("active" === e.state) {
        var n = (new Date).getTime(), i = new Date(e.last_changed).getTime();
        r = Math.max(r - (n - i) / 1e3, 0);
    }
    return r;
}
function $ee1328194d522913$var$O() {
    return ($ee1328194d522913$var$O = Object.assign || function(e) {
        for(var t = 1; t < arguments.length; t++){
            var r = arguments[t];
            for(var n in r)Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
    }).apply(this, arguments);
}
var $ee1328194d522913$export$2a5af2efac2f8dc = function(e, t, r, n) {
    void 0 === n && (n = !1), e._themes || (e._themes = {});
    var i = t.default_theme;
    ("default" === r || r && t.themes[r]) && (i = r);
    var a = $ee1328194d522913$var$O({}, e._themes);
    if ("default" !== i) {
        var o = t.themes[i];
        Object.keys(o).forEach(function(t) {
            var r = "--" + t;
            e._themes[r] = "", a[r] = o[t];
        });
    }
    if (e.updateStyles ? e.updateStyles(a) : window.ShadyCSS && window.ShadyCSS.styleSubtree(e, a), n) {
        var u = document.querySelector("meta[name=theme-color]");
        if (u) {
            u.hasAttribute("default-content") || u.setAttribute("default-content", u.getAttribute("content"));
            var c = a["--primary-color"] || u.getAttribute("default-content");
            u.setAttribute("content", c);
        }
    }
}, $ee1328194d522913$export$67835a66b9f6da52 = function(e) {
    return "function" == typeof e.getCardSize ? e.getCardSize() : 4;
};
function $ee1328194d522913$export$2044bdc9670769ab(e) {
    return e.substr(0, e.indexOf("."));
}
function $ee1328194d522913$export$4c7757901b2ff860(e) {
    return e.substr(e.indexOf(".") + 1);
}
function $ee1328194d522913$export$5cacf63e4bbfecae(e) {
    var t, r = (null == e || null == (t = e.locale) ? void 0 : t.language) || "en";
    return e.translationMetadata.translations[r] && e.translationMetadata.translations[r].isRTL || !1;
}
function $ee1328194d522913$export$703829fe2802931b(e) {
    return $ee1328194d522913$export$5cacf63e4bbfecae(e) ? "rtl" : "ltr";
}
function $ee1328194d522913$export$5b7b50e8043fabe(e) {
    return $ee1328194d522913$export$2044bdc9670769ab(e.entity_id);
}
var $ee1328194d522913$export$88bfc1035e667f37 = function(e) {
    return !!e.attributes.unit_of_measurement || !!e.attributes.state_class;
}, $ee1328194d522913$export$5e25e39d6a8c0c11 = function(e) {
    switch(e.number_format){
        case $ee1328194d522913$export$27bce688931fdfcc.comma_decimal:
            return [
                "en-US",
                "en"
            ];
        case $ee1328194d522913$export$27bce688931fdfcc.decimal_comma:
            return [
                "de",
                "es",
                "it"
            ];
        case $ee1328194d522913$export$27bce688931fdfcc.space_comma:
            return [
                "fr",
                "sv",
                "cs"
            ];
        case $ee1328194d522913$export$27bce688931fdfcc.system:
            return;
        default:
            return e.language;
    }
}, $ee1328194d522913$export$2077e0241d6afd3c = function(e, t) {
    return void 0 === t && (t = 2), Math.round(e * Math.pow(10, t)) / Math.pow(10, t);
}, $ee1328194d522913$export$f5dd818bff069720 = function(e, r, n) {
    var i = r ? $ee1328194d522913$export$5e25e39d6a8c0c11(r) : void 0;
    if (Number.isNaN = Number.isNaN || function e(t) {
        return "number" == typeof t && e(t);
    }, (null == r ? void 0 : r.number_format) !== $ee1328194d522913$export$27bce688931fdfcc.none && !Number.isNaN(Number(e)) && Intl) try {
        return new Intl.NumberFormat(i, $ee1328194d522913$var$V(e, n)).format(Number(e));
    } catch (t) {
        return console.error(t), new Intl.NumberFormat(void 0, $ee1328194d522913$var$V(e, n)).format(Number(e));
    }
    return "string" == typeof e ? e : $ee1328194d522913$export$2077e0241d6afd3c(e, null == n ? void 0 : n.maximumFractionDigits).toString() + ("currency" === (null == n ? void 0 : n.style) ? " " + n.currency : "");
}, $ee1328194d522913$var$V = function(e, t) {
    var r = $ee1328194d522913$var$O({
        maximumFractionDigits: 2
    }, t);
    if ("string" != typeof e) return r;
    if (!t || !t.minimumFractionDigits && !t.maximumFractionDigits) {
        var n = e.indexOf(".") > -1 ? e.split(".")[1].length : 0;
        r.minimumFractionDigits = n, r.maximumFractionDigits = n;
    }
    return r;
}, $ee1328194d522913$export$278f9ea9192cff94 = function(e, t, r, n) {
    var i = void 0 !== n ? n : t.state;
    if ("unknown" === i || "unavailable" === i) return e("state.default." + i);
    if ($ee1328194d522913$export$88bfc1035e667f37(t)) {
        if ("monetary" === t.attributes.device_class) try {
            return $ee1328194d522913$export$f5dd818bff069720(i, r, {
                style: "currency",
                currency: t.attributes.unit_of_measurement
            });
        } catch (e) {}
        return $ee1328194d522913$export$f5dd818bff069720(i, r) + (t.attributes.unit_of_measurement ? " " + t.attributes.unit_of_measurement : "");
    }
    var o = $ee1328194d522913$export$5b7b50e8043fabe(t);
    if ("input_datetime" === o) {
        var u;
        if (void 0 === n) return t.attributes.has_date && t.attributes.has_time ? (u = new Date(t.attributes.year, t.attributes.month - 1, t.attributes.day, t.attributes.hour, t.attributes.minute), $ee1328194d522913$export$8b492ed8828f789c(u, r)) : t.attributes.has_date ? (u = new Date(t.attributes.year, t.attributes.month - 1, t.attributes.day), $ee1328194d522913$export$3ae94a2503e890a1(u, r)) : t.attributes.has_time ? ((u = new Date).setHours(t.attributes.hour, t.attributes.minute), $ee1328194d522913$export$3203edd9e5edd663(u, r)) : t.state;
        try {
            var c = n.split(" ");
            if (2 === c.length) return $ee1328194d522913$export$8b492ed8828f789c(new Date(c.join("T")), r);
            if (1 === c.length) {
                if (n.includes("-")) return $ee1328194d522913$export$3ae94a2503e890a1(new Date(n + "T00:00"), r);
                if (n.includes(":")) {
                    var m = new Date;
                    return $ee1328194d522913$export$3203edd9e5edd663(new Date(m.toISOString().split("T")[0] + "T" + n), r);
                }
            }
            return n;
        } catch (e) {
            return n;
        }
    }
    return "humidifier" === o && "on" === i && t.attributes.humidity ? t.attributes.humidity + " %" : "counter" === o || "number" === o || "input_number" === o ? $ee1328194d522913$export$f5dd818bff069720(i, r) : t.attributes.device_class && e("component." + o + ".state." + t.attributes.device_class + "." + i) || e("component." + o + ".state._." + i) || i;
}, $ee1328194d522913$export$25978a5d5a562f09 = "mdi:bookmark", $ee1328194d522913$export$f78a3169a0f9f31b = "lovelace", $ee1328194d522913$export$6df9924792233bc = [
    "climate",
    "cover",
    "configurator",
    "input_select",
    "input_number",
    "input_text",
    "lock",
    "media_player",
    "scene",
    "script",
    "timer",
    "vacuum",
    "water_heater",
    "weblink"
], $ee1328194d522913$export$b9a2b37e93bb73f2 = [
    "alarm_control_panel",
    "automation",
    "camera",
    "climate",
    "configurator",
    "cover",
    "fan",
    "group",
    "history_graph",
    "input_datetime",
    "light",
    "lock",
    "media_player",
    "script",
    "sun",
    "updater",
    "vacuum",
    "water_heater",
    "weather"
], $ee1328194d522913$export$ca927753507128f6 = [
    "input_number",
    "input_select",
    "input_text",
    "scene",
    "weblink"
], $ee1328194d522913$export$60e836dfbaf943c5 = [
    "camera",
    "configurator",
    "history_graph",
    "scene"
], $ee1328194d522913$export$23bace2b7923e5d1 = [
    "closed",
    "locked",
    "off"
], $ee1328194d522913$export$1b64f44bed0feb66 = new Set([
    "fan",
    "input_boolean",
    "light",
    "switch",
    "group",
    "automation"
]), $ee1328194d522913$export$3ed39d80c7b24b62 = "\xb0C", $ee1328194d522913$export$5c7f540eb0eef6a6 = "\xb0F", $ee1328194d522913$export$2c7beb20637e0bd1 = "group.default_view", $ee1328194d522913$export$43835e9acf248a15 = function(e, t, r, n) {
    n = n || {}, r = null == r ? {} : r;
    var i = new Event(t, {
        bubbles: void 0 === n.bubbles || n.bubbles,
        cancelable: Boolean(n.cancelable),
        composed: void 0 === n.composed || n.composed
    });
    return i.detail = r, e.dispatchEvent(i), i;
}, $ee1328194d522913$var$ie = new Set([
    "call-service",
    "divider",
    "section",
    "weblink",
    "cast",
    "select"
]), $ee1328194d522913$var$ae = {
    alert: "toggle",
    automation: "toggle",
    climate: "climate",
    cover: "cover",
    fan: "toggle",
    group: "group",
    input_boolean: "toggle",
    input_number: "input-number",
    input_select: "input-select",
    input_text: "input-text",
    light: "toggle",
    lock: "lock",
    media_player: "media-player",
    remote: "toggle",
    scene: "scene",
    script: "script",
    sensor: "sensor",
    timer: "timer",
    switch: "toggle",
    vacuum: "toggle",
    water_heater: "climate",
    input_datetime: "input-datetime"
}, $ee1328194d522913$export$5ad555b55cd85e0c = function(e, t) {
    void 0 === t && (t = !1);
    var r = function(e, t) {
        return n("hui-error-card", {
            type: "error",
            error: e,
            config: t
        });
    }, n = function(e, t) {
        var n = window.document.createElement(e);
        try {
            if (!n.setConfig) return;
            n.setConfig(t);
        } catch (n) {
            return console.error(e, n), r(n.message, t);
        }
        return n;
    };
    if (!e || "object" != typeof e || !t && !e.type) return r("No type defined", e);
    var i = e.type;
    if (i && i.startsWith("custom:")) i = i.substr(7);
    else if (t) {
        if ($ee1328194d522913$var$ie.has(i)) i = "hui-" + i + "-row";
        else {
            if (!e.entity) return r("Invalid config given.", e);
            var a = e.entity.split(".", 1)[0];
            i = "hui-" + ($ee1328194d522913$var$ae[a] || "text") + "-entity-row";
        }
    } else i = "hui-" + i + "-card";
    if (customElements.get(i)) return n(i, e);
    var o = r("Custom element doesn't exist: " + e.type + ".", e);
    o.style.display = "None";
    var u = setTimeout(function() {
        o.style.display = "";
    }, 2e3);
    return customElements.whenDefined(e.type).then(function() {
        clearTimeout(u), $ee1328194d522913$export$43835e9acf248a15(o, "ll-rebuild", {}, o);
    }), o;
}, $ee1328194d522913$export$61fc7d43ac8f84b0 = function(e, t, r) {
    var n;
    return void 0 === r && (r = !1), function() {
        var i = [].slice.call(arguments), a = this, o = function() {
            n = null, r || e.apply(a, i);
        }, u = r && !n;
        clearTimeout(n), n = setTimeout(o, t), u && e.apply(a, i);
    };
}, $ee1328194d522913$export$a76407ec79ca4ea3 = {
    alert: "mdi:alert",
    automation: "mdi:playlist-play",
    calendar: "mdi:calendar",
    camera: "mdi:video",
    climate: "mdi:thermostat",
    configurator: "mdi:settings",
    conversation: "mdi:text-to-speech",
    device_tracker: "mdi:account",
    fan: "mdi:fan",
    group: "mdi:google-circles-communities",
    history_graph: "mdi:chart-line",
    homeassistant: "mdi:home-assistant",
    homekit: "mdi:home-automation",
    image_processing: "mdi:image-filter-frames",
    input_boolean: "mdi:drawing",
    input_datetime: "mdi:calendar-clock",
    input_number: "mdi:ray-vertex",
    input_select: "mdi:format-list-bulleted",
    input_text: "mdi:textbox",
    light: "mdi:lightbulb",
    mailbox: "mdi:mailbox",
    notify: "mdi:comment-alert",
    person: "mdi:account",
    plant: "mdi:flower",
    proximity: "mdi:apple-safari",
    remote: "mdi:remote",
    scene: "mdi:google-pages",
    script: "mdi:file-document",
    sensor: "mdi:eye",
    simple_alarm: "mdi:bell",
    sun: "mdi:white-balance-sunny",
    switch: "mdi:flash",
    timer: "mdi:timer",
    updater: "mdi:cloud-upload",
    vacuum: "mdi:robot-vacuum",
    water_heater: "mdi:thermometer",
    weblink: "mdi:open-in-new"
};
function $ee1328194d522913$export$13fcd5035aa1446(e, t) {
    if (e in $ee1328194d522913$export$a76407ec79ca4ea3) return $ee1328194d522913$export$a76407ec79ca4ea3[e];
    switch(e){
        case "alarm_control_panel":
            switch(t){
                case "armed_home":
                    return "mdi:bell-plus";
                case "armed_night":
                    return "mdi:bell-sleep";
                case "disarmed":
                    return "mdi:bell-outline";
                case "triggered":
                    return "mdi:bell-ring";
                default:
                    return "mdi:bell";
            }
        case "binary_sensor":
            return t && "off" === t ? "mdi:radiobox-blank" : "mdi:checkbox-marked-circle";
        case "cover":
            return "closed" === t ? "mdi:window-closed" : "mdi:window-open";
        case "lock":
            return t && "unlocked" === t ? "mdi:lock-open" : "mdi:lock";
        case "media_player":
            return t && "off" !== t && "idle" !== t ? "mdi:cast-connected" : "mdi:cast";
        case "zwave":
            switch(t){
                case "dead":
                    return "mdi:emoticon-dead";
                case "sleeping":
                    return "mdi:sleep";
                case "initializing":
                    return "mdi:timer-sand";
                default:
                    return "mdi:z-wave";
            }
        default:
            return console.warn("Unable to find icon for domain " + e + " (" + t + ")"), "mdi:bookmark";
    }
}
var $ee1328194d522913$export$e2b36fa5c60547b2 = function(e, t) {
    var r = t.value || t, n = t.attribute ? e.attributes[t.attribute] : e.state;
    switch(t.operator || "=="){
        case "==":
            return n === r;
        case "<=":
            return n <= r;
        case "<":
            return n < r;
        case ">=":
            return n >= r;
        case ">":
            return n > r;
        case "!=":
            return n !== r;
        case "regex":
            return n.match(r);
        default:
            return !1;
    }
}, $ee1328194d522913$export$8bcf112cf396c716 = function(e) {
    $ee1328194d522913$export$43835e9acf248a15(window, "haptic", e);
}, $ee1328194d522913$export$ff7962acd6052c28 = function(e, t, r) {
    void 0 === r && (r = !1), r ? history.replaceState(null, "", t) : history.pushState(null, "", t), $ee1328194d522913$export$43835e9acf248a15(window, "location-changed", {
        replace: r
    });
}, $ee1328194d522913$export$3303cc16da6bc061 = function(e, t, r) {
    void 0 === r && (r = !0);
    var n, i = $ee1328194d522913$export$2044bdc9670769ab(t), a = "group" === i ? "homeassistant" : i;
    switch(i){
        case "lock":
            n = r ? "unlock" : "lock";
            break;
        case "cover":
            n = r ? "open_cover" : "close_cover";
            break;
        default:
            n = r ? "turn_on" : "turn_off";
    }
    return e.callService(a, n, {
        entity_id: t
    });
}, $ee1328194d522913$export$4f6896672dcf12b1 = function(e, t) {
    var r = $ee1328194d522913$export$23bace2b7923e5d1.includes(e.states[t].state);
    return $ee1328194d522913$export$3303cc16da6bc061(e, t, r);
}, $ee1328194d522913$export$fe63bc0ae3396800 = function(e, t, r, n) {
    if (n || (n = {
        action: "more-info"
    }), !n.confirmation || n.confirmation.exemptions && n.confirmation.exemptions.some(function(e) {
        return e.user === t.user.id;
    }) || ($ee1328194d522913$export$8bcf112cf396c716("warning"), confirm(n.confirmation.text || "Are you sure you want to " + n.action + "?"))) switch(n.action){
        case "more-info":
            (r.entity || r.camera_image) && $ee1328194d522913$export$43835e9acf248a15(e, "hass-more-info", {
                entityId: r.entity ? r.entity : r.camera_image
            });
            break;
        case "navigate":
            n.navigation_path && $ee1328194d522913$export$ff7962acd6052c28(0, n.navigation_path);
            break;
        case "url":
            n.url_path && window.open(n.url_path);
            break;
        case "toggle":
            r.entity && ($ee1328194d522913$export$4f6896672dcf12b1(t, r.entity), $ee1328194d522913$export$8bcf112cf396c716("success"));
            break;
        case "call-service":
            if (!n.service) return void $ee1328194d522913$export$8bcf112cf396c716("failure");
            var i = n.service.split(".", 2);
            t.callService(i[0], i[1], n.service_data, n.target), $ee1328194d522913$export$8bcf112cf396c716("success");
            break;
        case "fire-dom-event":
            $ee1328194d522913$export$43835e9acf248a15(e, "ll-custom", n);
    }
}, $ee1328194d522913$export$6c6c3f4b7541eaf1 = function(e, t, r, n) {
    var i;
    "double_tap" === n && r.double_tap_action ? i = r.double_tap_action : "hold" === n && r.hold_action ? i = r.hold_action : "tap" === n && r.tap_action && (i = r.tap_action), $ee1328194d522913$export$fe63bc0ae3396800(e, t, r, i);
}, $ee1328194d522913$export$b981489921ee18cd = function(e, t, r, n, i) {
    var a;
    if (i && r.double_tap_action ? a = r.double_tap_action : n && r.hold_action ? a = r.hold_action : !n && r.tap_action && (a = r.tap_action), a || (a = {
        action: "more-info"
    }), !a.confirmation || a.confirmation.exemptions && a.confirmation.exemptions.some(function(e) {
        return e.user === t.user.id;
    }) || confirm(a.confirmation.text || "Are you sure you want to " + a.action + "?")) switch(a.action){
        case "more-info":
            (a.entity || r.entity || r.camera_image) && ($ee1328194d522913$export$43835e9acf248a15(e, "hass-more-info", {
                entityId: a.entity ? a.entity : r.entity ? r.entity : r.camera_image
            }), a.haptic && $ee1328194d522913$export$8bcf112cf396c716(a.haptic));
            break;
        case "navigate":
            a.navigation_path && ($ee1328194d522913$export$ff7962acd6052c28(0, a.navigation_path), a.haptic && $ee1328194d522913$export$8bcf112cf396c716(a.haptic));
            break;
        case "url":
            a.url_path && window.open(a.url_path), a.haptic && $ee1328194d522913$export$8bcf112cf396c716(a.haptic);
            break;
        case "toggle":
            r.entity && ($ee1328194d522913$export$4f6896672dcf12b1(t, r.entity), a.haptic && $ee1328194d522913$export$8bcf112cf396c716(a.haptic));
            break;
        case "call-service":
            if (!a.service) return;
            var o = a.service.split(".", 2), u = o[0], c = o[1], m = $ee1328194d522913$var$O({}, a.service_data);
            "entity" === m.entity_id && (m.entity_id = r.entity), t.callService(u, c, m, a.target), a.haptic && $ee1328194d522913$export$8bcf112cf396c716(a.haptic);
            break;
        case "fire-dom-event":
            $ee1328194d522913$export$43835e9acf248a15(e, "ll-custom", a), a.haptic && $ee1328194d522913$export$8bcf112cf396c716(a.haptic);
    }
};
function $ee1328194d522913$export$e217e69099d082f5(e) {
    return void 0 !== e && "none" !== e.action;
}
function $ee1328194d522913$export$695b4dbcc1028091(e, t, r) {
    if (t.has("config") || r) return !0;
    if (e.config.entity) {
        var n = t.get("hass");
        return !n || n.states[e.config.entity] !== e.hass.states[e.config.entity];
    }
    return !1;
}
function $ee1328194d522913$export$72d503079d05a3cf(e) {
    return void 0 !== e && "none" !== e.action;
}
var $ee1328194d522913$export$8d080c28108db9dd = function(e, t, r) {
    void 0 === r && (r = !0);
    var n = {};
    t.forEach(function(t) {
        if ($ee1328194d522913$export$23bace2b7923e5d1.includes(e.states[t].state) === r) {
            var i = $ee1328194d522913$export$2044bdc9670769ab(t), a = [
                "cover",
                "lock"
            ].includes(i) ? i : "homeassistant";
            a in n || (n[a] = []), n[a].push(t);
        }
    }), Object.keys(n).forEach(function(t) {
        var i;
        switch(t){
            case "lock":
                i = r ? "unlock" : "lock";
                break;
            case "cover":
                i = r ? "open_cover" : "close_cover";
                break;
            default:
                i = r ? "turn_on" : "turn_off";
        }
        e.callService(t, i, {
            entity_id: n[t]
        });
    });
}, $ee1328194d522913$export$b5e56594b0d6a61e = function() {
    var e = document.querySelector("home-assistant");
    if (e = (e = (e = (e = (e = (e = (e = (e = e && e.shadowRoot) && e.querySelector("home-assistant-main")) && e.shadowRoot) && e.querySelector("app-drawer-layout partial-panel-resolver")) && e.shadowRoot || e) && e.querySelector("ha-panel-lovelace")) && e.shadowRoot) && e.querySelector("hui-root")) {
        var t = e.lovelace;
        return t.current_view = e.___curView, t;
    }
    return null;
}, $ee1328194d522913$var$xe = {
    humidity: "mdi:water-percent",
    illuminance: "mdi:brightness-5",
    temperature: "mdi:thermometer",
    pressure: "mdi:gauge",
    power: "mdi:flash",
    signal_strength: "mdi:wifi"
}, $ee1328194d522913$var$De = {
    binary_sensor: function(e, t) {
        var r = "off" === e;
        switch(null == t ? void 0 : t.attributes.device_class){
            case "battery":
                return r ? "mdi:battery" : "mdi:battery-outline";
            case "battery_charging":
                return r ? "mdi:battery" : "mdi:battery-charging";
            case "cold":
                return r ? "mdi:thermometer" : "mdi:snowflake";
            case "connectivity":
                return r ? "mdi:server-network-off" : "mdi:server-network";
            case "door":
                return r ? "mdi:door-closed" : "mdi:door-open";
            case "garage_door":
                return r ? "mdi:garage" : "mdi:garage-open";
            case "power":
                return r ? "mdi:power-plug-off" : "mdi:power-plug";
            case "gas":
            case "problem":
            case "safety":
            case "tamper":
                return r ? "mdi:check-circle" : "mdi:alert-circle";
            case "smoke":
                return r ? "mdi:check-circle" : "mdi:smoke";
            case "heat":
                return r ? "mdi:thermometer" : "mdi:fire";
            case "light":
                return r ? "mdi:brightness-5" : "mdi:brightness-7";
            case "lock":
                return r ? "mdi:lock" : "mdi:lock-open";
            case "moisture":
                return r ? "mdi:water-off" : "mdi:water";
            case "motion":
                return r ? "mdi:walk" : "mdi:run";
            case "occupancy":
                return r ? "mdi:home-outline" : "mdi:home";
            case "opening":
                return r ? "mdi:square" : "mdi:square-outline";
            case "plug":
                return r ? "mdi:power-plug-off" : "mdi:power-plug";
            case "presence":
                return r ? "mdi:home-outline" : "mdi:home";
            case "running":
                return r ? "mdi:stop" : "mdi:play";
            case "sound":
                return r ? "mdi:music-note-off" : "mdi:music-note";
            case "update":
                return r ? "mdi:package" : "mdi:package-up";
            case "vibration":
                return r ? "mdi:crop-portrait" : "mdi:vibrate";
            case "window":
                return r ? "mdi:window-closed" : "mdi:window-open";
            default:
                return r ? "mdi:radiobox-blank" : "mdi:checkbox-marked-circle";
        }
    },
    cover: function(e) {
        var t = "closed" !== e.state;
        switch(e.attributes.device_class){
            case "garage":
                return t ? "mdi:garage-open" : "mdi:garage";
            case "door":
                return t ? "mdi:door-open" : "mdi:door-closed";
            case "shutter":
                return t ? "mdi:window-shutter-open" : "mdi:window-shutter";
            case "blind":
                return t ? "mdi:blinds-open" : "mdi:blinds";
            case "window":
                return t ? "mdi:window-open" : "mdi:window-closed";
            default:
                return $ee1328194d522913$export$13fcd5035aa1446("cover", e.state);
        }
    },
    sensor: function(e) {
        var t = e.attributes.device_class;
        if (t && t in $ee1328194d522913$var$xe) return $ee1328194d522913$var$xe[t];
        if ("battery" === t) {
            var r = Number(e.state);
            if (isNaN(r)) return "mdi:battery-unknown";
            var n = 10 * Math.round(r / 10);
            return n >= 100 ? "mdi:battery" : n <= 0 ? "mdi:battery-alert" : "hass:battery-" + n;
        }
        var i = e.attributes.unit_of_measurement;
        return "\xb0C" === i || "\xb0F" === i ? "mdi:thermometer" : $ee1328194d522913$export$13fcd5035aa1446("sensor");
    },
    input_datetime: function(e) {
        return e.attributes.has_date ? e.attributes.has_time ? $ee1328194d522913$export$13fcd5035aa1446("input_datetime") : "mdi:calendar" : "mdi:clock";
    }
}, $ee1328194d522913$export$d138d1363acbec1f = function(e) {
    if (!e) return "mdi:bookmark";
    if (e.attributes.icon) return e.attributes.icon;
    var t = $ee1328194d522913$export$2044bdc9670769ab(e.entity_id);
    return t in $ee1328194d522913$var$De ? $ee1328194d522913$var$De[t](e) : $ee1328194d522913$export$13fcd5035aa1446(t, e.state);
};


parcelRequire("j0ZcV");
var $j8KxL = parcelRequire("j8KxL");
var $1b50081e774bdf57$exports = {};
$1b50081e774bdf57$exports = "ha-card {\n  flex-direction: column;\n  height: 100%;\n  display: flex;\n  overflow: hidden;\n}\n\n.weather {\n  width: 100%;\n  min-height: var(--wfe-header-height, calc(2.3 * var(--row-height, 56px)));\n  border-top-left-radius: var(--ha-card-border-radius, 12px);\n  border-top-right-radius: var(--ha-card-border-radius, 12px);\n  color: #fff;\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n  flex-direction: column;\n  flex-shrink: 0;\n  display: flex;\n}\n\n.weather.header-only {\n  border-bottom-left-radius: var(--ha-card-border-radius, 12px);\n  border-bottom-right-radius: var(--ha-card-border-radius, 12px);\n  flex: auto;\n  height: 100%;\n}\n\n.weather .header-content {\n  padding-block: var(--wfe-header-padding-block, 16px);\n  padding-inline: var(--wfe-header-padding-inline, 16px);\n  gap: var(--wfe-header-content-gap, 12px);\n  box-sizing: border-box;\n  flex-direction: column;\n  flex: auto;\n  width: 100%;\n  min-width: 0;\n  display: flex;\n}\n\n.weather .header-layout {\n  flex-direction: row;\n  flex: none;\n  justify-content: flex-start;\n  align-items: stretch;\n  gap: 0;\n  width: 100%;\n  min-width: 0;\n  display: flex;\n}\n\n.weather .header-main {\n  padding-left: var(--wfe-header-columns-gap, 16px);\n  justify-content: space-between;\n  align-items: flex-end;\n  gap: var(--wfe-header-main-gap, 10px);\n  flex-direction: column;\n  flex: 0 auto;\n  align-self: stretch;\n  min-width: 0;\n  min-height: 0;\n  margin-left: auto;\n  display: flex;\n}\n\n.weather .header-attributes {\n  justify-content: space-between;\n  gap: var(--wfe-header-attribute-gap, 8px);\n  flex-direction: column;\n  flex: 1 1 0;\n  align-self: stretch;\n  min-width: 0;\n  min-height: 0;\n  display: flex;\n}\n\n.weather .attribute-chip {\n  font-size: var(--ha-font-size-m);\n  line-height: calc(6px + var(--ha-font-size-m));\n  color: inherit;\n  background-color: #00000059;\n  border-radius: 25px;\n  align-self: flex-start;\n  align-items: center;\n  min-width: 0;\n  max-width: 100%;\n  padding: 4px 12px;\n  display: inline-flex;\n  overflow: hidden;\n}\n\n.weather .attribute-chip .chip-icon, .weather .template-chip .chip-icon {\n  --mdc-icon-size: 20px;\n  color: inherit;\n  margin-right: 6px;\n}\n\n.weather .attribute-chip.has-action, .weather .template-chip.has-action {\n  cursor: pointer;\n}\n\n.weather .attribute-chip.has-action:focus-visible, .weather .template-chip.has-action:focus-visible {\n  outline-offset: 2px;\n  outline: 2px solid #ffffffe6;\n}\n\n.weather .attribute-chip.missing {\n  opacity: .8;\n  font-style: italic;\n}\n\n.weather .condition {\n  font-size: var(--ha-font-size-xl);\n  line-height: calc(10px + var(--ha-font-size-xl));\n  background-color: #0000004d;\n  border-radius: 100px;\n  justify-content: center;\n  align-items: center;\n  min-width: 0;\n  max-width: 100%;\n  padding: 4px 15px;\n  display: inline-flex;\n  overflow: hidden;\n}\n\n.weather .temp.has-action, .weather .condition.has-action {\n  cursor: pointer;\n}\n\n.weather .temp.has-action:focus-visible, .weather .condition.has-action:focus-visible {\n  outline-offset: 2px;\n  outline: 2px solid #ffffffe6;\n}\n\n.weather .temp {\n  font-size: var(--ha-font-size-5xl);\n  line-height: calc(10px + var(--ha-font-size-5xl));\n  background-color: #0000004d;\n  border-radius: 100px;\n  justify-content: center;\n  align-items: center;\n  min-width: 0;\n  max-width: 100%;\n  padding: 2px 17px;\n  font-weight: bolder;\n  display: inline-flex;\n  overflow: hidden;\n}\n\n.weather .header-pill-text {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  flex: 0 auto;\n  min-width: 0;\n  overflow: hidden;\n}\n\n.weather .header-pager {\n  flex-direction: column;\n  flex: auto;\n  min-height: 0;\n  display: flex;\n  position: relative;\n}\n\n.weather.nowcast-pager .header-content {\n  gap: 0;\n  min-height: 0;\n  padding: 0;\n}\n\n.weather.nowcast-pager .header-pager {\n  min-height: 0;\n  overflow: hidden;\n}\n\n.weather.nowcast-pager .header-pages {\n  min-height: 0;\n}\n\n.weather.nowcast-pager .header-layout {\n  flex: auto;\n  min-height: 0;\n}\n\n.weather.nowcast-pager .header-page-nowcast, .weather.nowcast-pager .nowcast-panel, .weather.nowcast-pager wfe-nowcast {\n  min-height: 0;\n}\n\n.weather.nowcast-pager .nowcast-panel {\n  overflow: hidden;\n}\n\n.weather .header-pages {\n  will-change: transform;\n  touch-action: pan-y;\n  flex-direction: row;\n  flex: auto;\n  width: 100%;\n  min-height: 0;\n  transition: transform .35s;\n  display: flex;\n}\n\n.weather .header-page {\n  flex-direction: column;\n  flex: 0 0 100%;\n  gap: 12px;\n  min-width: 0;\n  min-height: 0;\n  display: flex;\n}\n\n.weather.nowcast-pager .header-page {\n  padding-inline: var(--wfe-header-padding-inline, 16px);\n  padding-top: var(--wfe-header-padding-block, 16px);\n  box-sizing: border-box;\n  padding-bottom: 0;\n}\n\n.weather .nowcast-panel {\n  background: #0000004d;\n  border-radius: 16px;\n  flex-direction: column;\n  flex: auto;\n  min-height: 0;\n  padding: 12px 12px 6px;\n  display: flex;\n}\n\n.weather wfe-nowcast {\n  flex-direction: column;\n  flex: auto;\n  gap: 0;\n  width: 100%;\n  min-width: 0;\n  height: 100%;\n  min-height: 0;\n  display: flex;\n  overflow: hidden;\n}\n\n.weather .nowcast-bars {\n  align-items: stretch;\n  gap: var(--wfe-nowcast-gap, 5px);\n  flex: auto;\n  min-height: 24px;\n  display: flex;\n}\n\n.weather.nowcast-pager .nowcast-bars {\n  min-height: 16px;\n}\n\n.weather .nowcast-bar {\n  background: #ffffff06;\n  border-radius: 999px;\n  flex: 1 1 0;\n  align-self: stretch;\n  align-items: flex-end;\n  height: auto;\n  min-height: 6px;\n  display: flex;\n  overflow: hidden;\n}\n\n.weather .nowcast-bar-fill {\n  background: var(--wfe-nowcast-fill-color, #4aafff);\n  border-radius: inherit;\n  width: 100%;\n  height: 0%;\n  transition: height .35s;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .weather .nowcast-bar-fill, .weather .nowcast-labels {\n    transition: none;\n  }\n}\n\n.weather .nowcast-labels {\n  font-size: var(--ha-font-size-s);\n  color: #fff;\n  will-change: transform;\n  justify-content: space-between;\n  transition: transform .35s;\n  display: flex;\n}\n\n.weather .pager-dots {\n  justify-content: center;\n  gap: 6px;\n  padding-top: 6px;\n  display: flex;\n}\n\n.weather.nowcast-pager .pager-dots {\n  padding-inline: var(--wfe-header-padding-inline, 16px);\n  padding-top: 2px;\n  padding-bottom: 4px;\n}\n\n.weather .pager-dot {\n  cursor: pointer;\n  background: #ffffff73;\n  border: none;\n  border-radius: 50%;\n  width: 6px;\n  height: 6px;\n  padding: 0;\n}\n\n.weather .pager-dot.active {\n  background: #ffffffe6;\n}\n\n.weather .pager-dot:focus-visible {\n  outline-offset: 2px;\n  outline: 2px solid #ffffffe6;\n}\n\n.forecast-container {\n  flex: auto;\n  width: 100%;\n  padding-top: 4px;\n  padding-bottom: 20px;\n  display: flex;\n}\n\n.forecast-container.orientation-vertical {\n  flex-direction: column;\n  gap: 4px;\n}\n\n.forecast-container.orientation-horizontal {\n  flex-direction: row;\n  align-items: stretch;\n  gap: 0;\n}\n\n.divider {\n  background-color: var(--primary-background-color);\n}\n\n.card-divider {\n  height: 4px;\n}\n\n.forecast-divider {\n  border-radius: 2px;\n}\n\n.forecast-container.orientation-vertical > .forecast-divider {\n  height: 4px;\n  margin: 14px 16px 4px;\n}\n\n.forecast-container.orientation-horizontal > .forecast-divider {\n  flex: 0 0 4px;\n  align-self: stretch;\n  width: 4px;\n  margin: 16px 0 0;\n}\n\n.forecast-container.orientation-horizontal > .forecast-daily-container, .forecast-container.orientation-horizontal > .forecast-hourly-container {\n  flex: 1;\n}\n\n.forecast-daily-container, .forecast-hourly-container {\n  touch-action: pan-x;\n  overscroll-behavior-x: contain;\n  flex-direction: column;\n  flex: auto;\n  justify-content: flex-start;\n  display: flex;\n  position: relative;\n  overflow: hidden;\n}\n\n.fade-left, .fade-right {\n  pointer-events: none;\n  z-index: 2;\n  width: 16px;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n}\n\n.fade-left {\n  background: linear-gradient(to right, var(--card-background-color) 0%, var(--card-background-color) 2px, transparent 100%);\n  left: 0;\n}\n\n.fade-right {\n  background: linear-gradient(to left, var(--card-background-color) 0%, var(--card-background-color) 2px, transparent 100%);\n  right: 0;\n}\n\n.forecast {\n  --forecast-inline-padding: 16px;\n  scroll-snap-type: x mandatory;\n  height: auto;\n  scroll-padding-left: var(--forecast-inline-padding);\n  scroll-padding-right: var(--forecast-inline-padding);\n  justify-content: space-around;\n  align-items: stretch;\n  gap: var(--dynamic-gap, 20px);\n  padding: 8px var(--forecast-inline-padding) 0px;\n  flex: auto;\n  display: flex;\n  overflow: auto clip;\n}\n\n@supports (-webkit-touch-callout: none) {\n  .forecast {\n    padding-bottom: 12px;\n  }\n}\n\n.forecast wfe-daily-list, .forecast wfe-hourly-list {\n  display: contents;\n}\n\n.forecast.daily {\n  --min-gap: 30px;\n  --icon-size: 40px;\n  --icon-container-width: 40px;\n  --temp-bar-width: 8px;\n  --temp-bar-min: -20;\n  --temp-bar-max: 50;\n  cursor: grab;\n  -webkit-user-select: none;\n  user-select: none;\n}\n\n.forecast.daily .temperature-bar {\n  width: var(--temp-bar-width);\n  border-radius: 4px;\n  height: 32px;\n  margin: 0 auto 4px;\n  position: relative;\n  overflow: hidden;\n}\n\n.forecast.daily .temperature-bar:before {\n  content: \"\";\n  background-color: var(--primary-text-color, #fff);\n  opacity: .1;\n  pointer-events: none;\n  position: absolute;\n  inset: 0;\n}\n\n.forecast.daily .temperature-bar-inner {\n  background-color: var(--primary-text-color, #fff);\n  opacity: .5;\n  border-radius: 4px;\n  width: 100%;\n  position: absolute;\n}\n\n.forecast.hourly {\n  --min-gap: 16px;\n  --icon-size: 25px;\n  --icon-container-width: 25px;\n  --day-marker-width: 40px;\n  --translate-content-height: 50px;\n  --translate-container-height: 50px;\n  --min-temp: -20;\n  --max-temp: 50;\n  cursor: grab;\n  -webkit-user-select: none;\n  user-select: none;\n}\n\n.forecast.hourly.dragging, .forecast.hourly.momentum, .forecast.daily.dragging, .forecast.daily.momentum {\n  scroll-snap-type: none;\n}\n\n.forecast.hourly.grabbing, .forecast.daily.grabbing {\n  cursor: grabbing;\n}\n\n.forecast::-webkit-scrollbar {\n  height: 0;\n}\n\n.forecast::-webkit-scrollbar-thumb {\n  background: none;\n}\n\n.forecast::-webkit-scrollbar-track {\n  background: none;\n}\n\n.forecast::-webkit-scrollbar-corner {\n  background: none;\n}\n\n.forecast {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n\n.forecast::-webkit-scrollbar {\n  display: none;\n}\n\n.forecast-item {\n  scroll-snap-align: start;\n  text-align: center;\n  flex-direction: column;\n  height: 100%;\n  display: flex;\n}\n\n.forecast.hourly .forecast-item {\n  width: var(--icon-container-width);\n  align-items: center;\n  overflow: visible;\n}\n\n.forecast.hourly .day-marker {\n  --day-marker-translate-x: calc((var(--dynamic-gap, 20px)  + var(--icon-container-width)  - var(--day-marker-width)) / 2);\n  left: calc((((var(--day-marker-width)  - var(--icon-container-width)) / 2) * -1)  - var(--day-marker-translate-x));\n  transform: translateX(var(--day-marker-translate-x));\n  color: #fff;\n  background-color: var(--state-climate-cool-color);\n  pointer-events: none;\n  white-space: nowrap;\n  z-index: 3;\n  scroll-snap-align: none;\n  width: var(--day-marker-width);\n  margin-right: calc(var(--day-marker-width) * -1 - var(--dynamic-gap) / 2);\n  margin-right: calc(round(up, var(--day-marker-width) * -1 - var(--dynamic-gap) / 2, 1px));\n  margin-left: calc(var(--dynamic-gap) * -1 / 2);\n  border-radius: 999px;\n  flex: none;\n  justify-content: center;\n  align-self: start;\n  align-items: center;\n  font-weight: 600;\n  display: inline-flex;\n  position: sticky;\n}\n\n.forecast .day-of-month {\n  opacity: .3;\n  margin-top: -4px;\n  font-size: 13px;\n}\n\n.forecast .date.sunrise {\n  color: var(--orange-color, #ff9800);\n  font-weight: 500;\n}\n\n.forecast .date.sunset {\n  color: var(--purple-color, #926bc7);\n  font-weight: 500;\n}\n\n.forecast.hourly .date {\n  width: var(--icon-container-width);\n  text-align: center;\n  white-space: nowrap;\n  justify-content: center;\n  align-items: center;\n  margin: 0 auto;\n  display: flex;\n}\n\n.forecast .ampm {\n  opacity: .3;\n  font-size: 11px;\n}\n\n.forecast .temp {\n  font-size: var(--ha-font-size-l);\n  font-weight: bolder;\n}\n\n.forecast .templow {\n  opacity: .5;\n  font-weight: bolder;\n}\n\n.forecast .precipitation, .forecast .precipitationprobability {\n  opacity: .3;\n  color: var(--state-climate-cool-color);\n  min-height: 20px;\n}\n\n.forecast .hourly-extra {\n  opacity: .6;\n  color: var(--primary-text-color);\n  white-space: nowrap;\n  min-height: 20px;\n  font-size: 13px;\n  font-weight: 500;\n}\n\n.forecast .hourly-extra.dimmed {\n  opacity: .3;\n}\n\n.forecast .precipitation {\n  --precipitation-fill: 0%;\n  --wfe-precipitation-indicator-color: var(--state-climate-cool-color);\n  --wfe-precipitation-indicator-opacity: .2;\n  --wfe-precipitation-indicator-padding-inline: 8px;\n  --wfe-precipitation-indicator-padding-block: 0px;\n  --wfe-precipitation-indicator-offset-top: 0px;\n  --wfe-precipitation-indicator-offset-bottom: 0px;\n  padding-inline: var(--wfe-precipitation-indicator-padding-inline);\n  padding-block: var(--wfe-precipitation-indicator-padding-block);\n  border-radius: var(--wfe-precipitation-indicator-radius, 4px);\n  z-index: 0;\n  display: inline-block;\n  position: relative;\n  overflow: hidden;\n}\n\n.forecast .precipitation:before {\n  content: \"\";\n  inset-inline: 0;\n  top: calc(100% - var(--precipitation-fill, 0%)  - var(--wfe-precipitation-indicator-offset-top, 0px));\n  bottom: calc(0px - var(--wfe-precipitation-indicator-offset-bottom, 0px));\n  background-color: var(--wfe-precipitation-indicator-color, var(--state-climate-cool-color));\n  opacity: var(--wfe-precipitation-indicator-opacity, .2);\n  border-radius: inherit;\n  pointer-events: none;\n  z-index: -1;\n  transition: top .15s ease-in-out, background-color .15s ease-in-out;\n  position: absolute;\n}\n\n.forecast .precipitation.overflow {\n  --wfe-precipitation-indicator-color: var(--red-color, #f44336);\n  color: var(--red-color, #f44336);\n}\n\n.forecast.daily .forecast-item > .precipitation {\n  line-height: 18px;\n}\n\n.forecast .precipitation.active, .forecast .precipitationprobability.active {\n  opacity: 1;\n}\n\n.forecast .daily-extra {\n  opacity: .6;\n  color: var(--primary-text-color);\n  white-space: nowrap;\n  min-height: 20px;\n  font-size: 13px;\n  font-weight: 500;\n}\n\n.forecast .daily-extra.dimmed {\n  opacity: .3;\n}\n\n.forecast.daily .daily-extra.precipitationprobability {\n  color: var(--state-climate-cool-color);\n  opacity: .3;\n  display: block !important;\n}\n\n.forecast .daily-extra.precipitationprobability.active {\n  opacity: 1;\n}\n\n.forecast.daily .forecast-item {\n  grid-template-rows: max-content max-content minmax(80px, 1fr) max-content max-content;\n  align-content: start;\n  display: grid;\n}\n\n.forecast.daily .forecast-item > .date, .forecast.daily .forecast-item > .day-of-month, .forecast.daily .forecast-item > .precipitation, .forecast.daily .forecast-item > .precipitationprobability, .forecast.daily .forecast-item > .daily-extra {\n  min-height: auto;\n}\n\n.forecast.daily .forecast-item > .date {\n  grid-row: 1;\n}\n\n.forecast.daily .forecast-item > .day-of-month {\n  grid-row: 2;\n}\n\n.forecast.daily .forecast-item > .translate-container {\n  grid-row: 3;\n}\n\n.forecast.daily .forecast-item > .precipitation, .forecast.daily .forecast-item > .precipitationprobability {\n  grid-row: 4;\n}\n\n.forecast.daily .forecast-item > .daily-extra {\n  text-align: center;\n  width: var(--icon-size);\n  grid-row: 5;\n  justify-self: center;\n}\n\n.forecast.daily .precipitationprobability {\n  display: none;\n}\n\n.forecast-item .translate-container {\n  width: var(--icon-container-width);\n  flex-direction: column;\n  flex: auto;\n  justify-content: flex-start;\n  align-items: center;\n  height: 100%;\n  display: flex;\n}\n\n.forecast.daily .forecast-item > .translate-container {\n  min-height: 80px;\n}\n\n.forecast.hourly .forecast-item .translate-container {\n  justify-content: center;\n}\n\n.forecast-item .icon-container {\n  flex-direction: column;\n  display: flex;\n}\n\n.forecast.hourly .forecast-item .icon-container {\n  --item-temp: 0;\n  --max-translation: calc((var(--translate-container-height)  - var(--translate-content-height)) / 2);\n  --percentual-translation: calc((var(--item-temp)  - var(--min-temp)) / (var(--max-temp)  - var(--min-temp)));\n  transform: translateY(calc(var(--max-translation)  - (var(--percentual-translation) * 2 * var(--max-translation))));\n}\n\n.forecast.hourly .forecast-item.no-ampm > .translate-container {\n  margin-top: 4px;\n}\n\n.forecast.daily .forecast-item .icon-container {\n  flex: none;\n}\n\n.forecast.daily .temperature-bar {\n  flex: auto;\n}\n\n.forecast-image-icon {\n  justify-content: center;\n  display: flex;\n}\n\n.forecast-image-icon > * {\n  width: var(--icon-size);\n  height: var(--icon-size);\n}\n\n.forecast-image-icon ha-icon {\n  --mdc-icon-size: var(--icon-size);\n}\n\n.rain {\n  fill: var(--weather-icon-rain-color, #30b3ff);\n}\n\n.sun {\n  fill: var(--weather-icon-sun-color, #fdd93c);\n}\n\n.moon {\n  fill: var(--weather-icon-moon-color, #fcf497);\n}\n\n.cloud-back {\n  fill: var(--weather-icon-cloud-back-color, #d4d4d4);\n}\n\n.cloud-front {\n  fill: var(--weather-icon-cloud-front-color, #f9f9f9);\n}\n\n.snow {\n  fill: var(--weather-icon-snow-color, #f9f9f9);\n  stroke: var(--weather-icon-snow-stroke-color, #d4d4d4);\n  stroke-width: 1px;\n  paint-order: stroke;\n}\n\n";


const $b377d607dfc671f6$export$9dd6ff9ea0189349 = (0, $j8KxL.css)`
  ${(0, $j8KxL.unsafeCSS)((0, (/*@__PURE__*/$parcel$interopDefault($1b50081e774bdf57$exports))))}
`;


var $1e69f76b05a816eb$exports = {};
$1e69f76b05a816eb$exports = new URL("sunny.5ac2086f.jpg", import.meta.url).toString();


var $6f4eee4b7ab1d2c4$exports = {};
$6f4eee4b7ab1d2c4$exports = new URL("clear-night.059d725f.jpg", import.meta.url).toString();


var $1dfaab2e4e5ecad6$exports = {};
$1dfaab2e4e5ecad6$exports = new URL("pouring.5a333e69.jpg", import.meta.url).toString();


var $74c55a13473312a4$exports = {};
$74c55a13473312a4$exports = new URL("pouring-night.e2dddca9.jpg", import.meta.url).toString();


var $b6117c6cfcd5d9bd$exports = {};
$b6117c6cfcd5d9bd$exports = new URL("partly-cloudy.89da2a52.jpg", import.meta.url).toString();


var $a9a1bc2c22cf59f3$exports = {};
$a9a1bc2c22cf59f3$exports = new URL("partly-cloudy-night.1b74815d.jpg", import.meta.url).toString();


var $b109536a5a876912$exports = {};
$b109536a5a876912$exports = new URL("fog.23e90e7d.jpg", import.meta.url).toString();


var $a3b323e168a50f51$exports = {};
$a3b323e168a50f51$exports = new URL("fog-night.6cfe565c.jpg", import.meta.url).toString();


var $9f87ed3faa3b9e08$exports = {};
$9f87ed3faa3b9e08$exports = new URL("hail.c8969e30.jpg", import.meta.url).toString();


var $869fdc2814f026c6$exports = {};
$869fdc2814f026c6$exports = new URL("hail-night.2f55972b.jpg", import.meta.url).toString();


var $a72aedec7f87ee16$exports = {};
$a72aedec7f87ee16$exports = new URL("lightning-rainy.207e6de4.jpg", import.meta.url).toString();


var $9f6c8c4db02a9586$exports = {};
$9f6c8c4db02a9586$exports = new URL("lightning-rainy-night.7bb6ca13.jpg", import.meta.url).toString();


var $95746abd7ffe8eef$exports = {};
$95746abd7ffe8eef$exports = new URL("lightning.36584782.jpg", import.meta.url).toString();


var $fee7f30ca42b4f5a$exports = {};
$fee7f30ca42b4f5a$exports = new URL("lightning-night.220aa10f.jpg", import.meta.url).toString();


var $299ff7583b1b6519$exports = {};
$299ff7583b1b6519$exports = new URL("rainy.5a087102.jpg", import.meta.url).toString();


var $4110dd39f4d2e7e2$exports = {};
$4110dd39f4d2e7e2$exports = new URL("rainy-night.68ef5d1e.jpg", import.meta.url).toString();


var $2cc4706dea59c3c7$exports = {};
$2cc4706dea59c3c7$exports = new URL("snowy-rainy.9901343f.jpg", import.meta.url).toString();


var $e8f2fc5f40842f73$exports = {};
$e8f2fc5f40842f73$exports = new URL("snowy-rainy-night.3afa6ed4.jpg", import.meta.url).toString();


var $114809334059eb6d$exports = {};
$114809334059eb6d$exports = new URL("snowy.82eee996.jpg", import.meta.url).toString();


var $f788577b12612ac3$exports = {};
$f788577b12612ac3$exports = new URL("snowy-night.cee013c0.jpg", import.meta.url).toString();


var $126f314ae001decd$exports = {};
$126f314ae001decd$exports = new URL("windy-variant.6ac24345.jpg", import.meta.url).toString();


var $2efcd540ca9cfbb1$exports = {};
$2efcd540ca9cfbb1$exports = new URL("windy-variant-night.efb03746.jpg", import.meta.url).toString();


var $31e27610007c5cf3$exports = {};
$31e27610007c5cf3$exports = new URL("windy.638cf534.jpg", import.meta.url).toString();


var $c41890a932496ec8$exports = {};
$c41890a932496ec8$exports = new URL("windy-night.c9f868f2.jpg", import.meta.url).toString();


const $04b2058bf019e2da$export$d0bd520bd5ddb657 = {
    pouring: {
        day: (0, (/*@__PURE__*/$parcel$interopDefault($1dfaab2e4e5ecad6$exports))),
        night: (0, (/*@__PURE__*/$parcel$interopDefault($74c55a13473312a4$exports)))
    },
    sunny: {
        day: (0, (/*@__PURE__*/$parcel$interopDefault($1e69f76b05a816eb$exports))),
        night: (0, (/*@__PURE__*/$parcel$interopDefault($6f4eee4b7ab1d2c4$exports)))
    },
    clearnight: {
        day: (0, (/*@__PURE__*/$parcel$interopDefault($1e69f76b05a816eb$exports))),
        night: (0, (/*@__PURE__*/$parcel$interopDefault($6f4eee4b7ab1d2c4$exports)))
    },
    partlycloudy: {
        day: (0, (/*@__PURE__*/$parcel$interopDefault($b6117c6cfcd5d9bd$exports))),
        night: (0, (/*@__PURE__*/$parcel$interopDefault($a9a1bc2c22cf59f3$exports)))
    },
    fog: {
        day: (0, (/*@__PURE__*/$parcel$interopDefault($b109536a5a876912$exports))),
        night: (0, (/*@__PURE__*/$parcel$interopDefault($a3b323e168a50f51$exports)))
    },
    hail: {
        day: (0, (/*@__PURE__*/$parcel$interopDefault($9f87ed3faa3b9e08$exports))),
        night: (0, (/*@__PURE__*/$parcel$interopDefault($869fdc2814f026c6$exports)))
    },
    lightningrainy: {
        day: (0, (/*@__PURE__*/$parcel$interopDefault($a72aedec7f87ee16$exports))),
        night: (0, (/*@__PURE__*/$parcel$interopDefault($9f6c8c4db02a9586$exports)))
    },
    lightning: {
        day: (0, (/*@__PURE__*/$parcel$interopDefault($95746abd7ffe8eef$exports))),
        night: (0, (/*@__PURE__*/$parcel$interopDefault($fee7f30ca42b4f5a$exports)))
    },
    rainy: {
        day: (0, (/*@__PURE__*/$parcel$interopDefault($299ff7583b1b6519$exports))),
        night: (0, (/*@__PURE__*/$parcel$interopDefault($4110dd39f4d2e7e2$exports)))
    },
    snowyrainy: {
        day: (0, (/*@__PURE__*/$parcel$interopDefault($2cc4706dea59c3c7$exports))),
        night: (0, (/*@__PURE__*/$parcel$interopDefault($e8f2fc5f40842f73$exports)))
    },
    snowy: {
        day: (0, (/*@__PURE__*/$parcel$interopDefault($114809334059eb6d$exports))),
        night: (0, (/*@__PURE__*/$parcel$interopDefault($f788577b12612ac3$exports)))
    },
    windyvariant: {
        day: (0, (/*@__PURE__*/$parcel$interopDefault($126f314ae001decd$exports))),
        night: (0, (/*@__PURE__*/$parcel$interopDefault($2efcd540ca9cfbb1$exports)))
    },
    windy: {
        day: (0, (/*@__PURE__*/$parcel$interopDefault($31e27610007c5cf3$exports))),
        night: (0, (/*@__PURE__*/$parcel$interopDefault($c41890a932496ec8$exports)))
    }
};
const $04b2058bf019e2da$export$80688e1fcf715020 = $04b2058bf019e2da$export$d0bd520bd5ddb657.partlycloudy;



var $39J5i = parcelRequire("39J5i");
parcelRequire("j0ZcV");
var $l56HR = parcelRequire("l56HR");
var $eGUNk = parcelRequire("eGUNk");

parcelRequire("1ZxoT");
var $dsTCw = parcelRequire("dsTCw");
var $1KSgR = parcelRequire("1KSgR");
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
const $2e3b0c24d7649e32$export$af90a3ef075406ce = (dateObj, locale, config)=>{
    const parts = $2e3b0c24d7649e32$var$formatTimeMem(locale, config.time_zone).formatToParts(dateObj);
    const hour = parts.find((part)=>part.type === "hour")?.value ?? "";
    const minute = parts.find((part)=>part.type === "minute")?.value ?? "";
    return `${hour}:${minute}`;
};
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



const $e0faea6f638c1177$var$PRECIPITATION_DISPLAY_THRESHOLD = 0.3;
const $e0faea6f638c1177$var$DAILY_PRECIPITATION_MIN_SCALE = 4;
const $e0faea6f638c1177$var$DAILY_PRECIPITATION_MAX_SCALE = 20;
let $e0faea6f638c1177$export$dc909bdc6ed8e8f6 = class WFEDailyList extends (0, $eGUNk.LitElement) {
    createRenderRoot() {
        // Render in light DOM so parent CSS applies
        return this;
    }
    render() {
        if (!this.forecast?.length) return 0, $l56HR.nothing;
        const precipitationScale = this._computePrecipitationScale($e0faea6f638c1177$var$DAILY_PRECIPITATION_MIN_SCALE, $e0faea6f638c1177$var$DAILY_PRECIPITATION_MAX_SCALE);
        return (0, $l56HR.html)`
      ${this.forecast.map((item)=>this._renderDailyItem(item, precipitationScale))}
    `;
    }
    _hasValidValue(item) {
        return typeof item !== "undefined" && item !== null;
    }
    _renderDailyItem(item, precipitationScale) {
        if (!this._hasValidValue(item.temperature) || !this._hasValidValue(item.condition)) return 0, $l56HR.nothing;
        const date = new Date(item.datetime);
        const newDay = (0, $2e3b0c24d7649e32$export$824eefb57336d873)(date, this.hass.config);
        return (0, $l56HR.html)`
      <div class="forecast-item" @click=${()=>this._handleSelect(item)}>
        <div class="date">${(0, $2e3b0c24d7649e32$export$e86782e02be44113)(date, this.hass.locale, this.hass.config)}</div>
        ${!newDay ? (0, $l56HR.html)`<div class="day-of-month">${(0, $2e3b0c24d7649e32$export$9ba7591c5b128371)(date, this.hass.locale, this.hass.config)}</div>` : ""}
        <div class="translate-container">
          <div class="icon-container">
            <div class="forecast-image-icon">
              ${(0, $a670ed82a1e76f75$export$e0801f527146069)(item.condition, this, false, this.iconMap)}
            </div>
            <div class="temp">${Math.round(item.temperature)}°</div>
          </div>
          ${this._renderTemperatureBar(item)}
          <div class="templow">${this._hasValidValue(item.templow) ? (0, $l56HR.html)`${Math.round(item.templow)}°` : "—"}</div>
        </div>
        ${this._renderPrecipitationInfo(item, precipitationScale)}
        ${this._renderExtraAttribute(item)}
      </div>
    `;
    }
    _handleSelect(item) {
        if (!item?.datetime) return;
        this.dispatchEvent(new CustomEvent("wfe-daily-selected", {
            detail: {
                datetime: item.datetime
            },
            bubbles: true,
            composed: true
        }));
    }
    _renderTemperatureBar(item) {
        if (!this._hasValidValue(item.templow)) return 0, $l56HR.nothing;
        // Styling prozentual relativ zu globalem Min/Max
        return (0, $l56HR.html)`
      <div class="temperature-bar">
        <div class="temperature-bar-inner" style=${this._getTemperatureBarStyle(item.temperature, item.templow)}></div>
      </div>
    `;
    }
    _renderPrecipitationInfo(item, precipitationScale) {
        const hasPrecipitation = this._hasValidValue(item.precipitation);
        const hasPrecipitationProbability = this._hasValidValue(item.precipitation_probability);
        if (!hasPrecipitation && !hasPrecipitationProbability) return 0, $l56HR.nothing;
        const precipitationValue = hasPrecipitation ? item.precipitation : undefined;
        const precipitationClasses = [
            "precipitation"
        ];
        if ((precipitationValue ?? 0) > $e0faea6f638c1177$var$PRECIPITATION_DISPLAY_THRESHOLD) precipitationClasses.push("active");
        let precipitationStyle = (0, $l56HR.nothing);
        let overflow = false;
        if (precipitationScale !== undefined && precipitationValue !== undefined && precipitationValue >= $e0faea6f638c1177$var$PRECIPITATION_DISPLAY_THRESHOLD) {
            const normalized = precipitationScale > 0 ? Math.min(precipitationValue / precipitationScale, 1) : 0;
            const percent = `${(normalized * 100).toFixed(2)}%`;
            precipitationStyle = `--precipitation-fill: ${percent};`;
            overflow = precipitationValue > precipitationScale;
        }
        if (overflow) precipitationClasses.push("overflow");
        return (0, $l56HR.html)`
      ${hasPrecipitation ? (0, $l56HR.html)`<div class="${precipitationClasses.join(" ")}" style=${precipitationStyle}>
            ${item.precipitation.toFixed(1)}
          </div>` : (0, $l56HR.nothing)}
      ${hasPrecipitationProbability ? (0, $l56HR.html)`<div class="precipitationprobability ${(item.precipitation_probability ?? 0) > 30 ? "active" : ""}">
            ${item.precipitation_probability}%
          </div>` : (0, $l56HR.nothing)}
    `;
    }
    _renderExtraAttribute(item) {
        const key = this.extraAttribute?.trim();
        if (!key) return 0, $l56HR.nothing;
        const rawValue = item?.[key];
        if (rawValue === undefined || rawValue === null) return 0, $l56HR.nothing;
        let display;
        if (key === "precipitation_probability") {
            const valueNum = typeof rawValue === "number" ? rawValue : Number(rawValue);
            if (!Number.isFinite(valueNum)) return 0, $l56HR.nothing;
            const dimBelow = this._normalizeDimBelow(this.extraAttributeDimBelow);
            const isDimmed = dimBelow !== undefined && valueNum < dimBelow;
            const classes = [
                "daily-extra",
                "precipitationprobability"
            ];
            if (valueNum > 30) classes.push("active");
            if (isDimmed) classes.push("dimmed");
            const color = this.extraAttributeColor?.trim();
            const style = color ? (0, $19f464fcda7d2482$export$1e5b4ce2fa884e6a)({
                color: color,
                display: "block",
                opacity: isDimmed ? "0.3" : "1"
            }) : "display: block;";
            return (0, $l56HR.html)`<div class=${classes.join(" ")} style=${style}>${valueNum}%</div>`;
        }
        if (typeof rawValue === "number") display = rawValue.toLocaleString(this.hass?.locale?.language, {
            maximumFractionDigits: 1
        });
        else if (typeof rawValue === "string") {
            const trimmed = rawValue.trim();
            if (!trimmed.length) return 0, $l56HR.nothing;
            display = trimmed;
        } else try {
            display = JSON.stringify(rawValue);
        } catch (_err) {
            return 0, $l56HR.nothing;
        }
        const unitRaw = typeof this.extraAttributeUnit === "string" ? this.extraAttributeUnit : "";
        const unit = unitRaw.trim().length ? unitRaw : "";
        const dimBelow = this._normalizeDimBelow(this.extraAttributeDimBelow);
        const numericValue = this._parseNumericValue(rawValue);
        const isDimmed = dimBelow !== undefined && numericValue !== undefined && numericValue < dimBelow;
        const classes = [
            "daily-extra"
        ];
        if (isDimmed) classes.push("dimmed");
        const color = this.extraAttributeColor?.trim();
        const style = color ? (0, $19f464fcda7d2482$export$1e5b4ce2fa884e6a)({
            color: color,
            opacity: isDimmed ? "0.3" : "1"
        }) : (0, $l56HR.nothing);
        return (0, $l56HR.html)`<div class=${classes.join(" ")} style=${style}>${display}${unit}</div>`;
    }
    _normalizeDimBelow(value) {
        return typeof value === "number" && Number.isFinite(value) ? value : undefined;
    }
    _parseNumericValue(rawValue) {
        const numericValue = typeof rawValue === "number" ? rawValue : Number(rawValue);
        return Number.isFinite(numericValue) ? numericValue : undefined;
    }
    _computePrecipitationScale(minScale, maxScale) {
        if (!this.forecast?.length) return undefined;
        const values = this.forecast.map((item)=>typeof item?.precipitation === "number" ? item.precipitation : undefined).filter((value)=>typeof value === "number");
        if (!values.length) return undefined;
        const highestValue = Math.max(...values);
        const unconstrained = Math.max(minScale, highestValue);
        return Math.min(unconstrained, maxScale);
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
(0, $39J5i.__decorate)([
    (0, $dsTCw.property)({
        attribute: false
    })
], $e0faea6f638c1177$export$dc909bdc6ed8e8f6.prototype, "hass", void 0);
(0, $39J5i.__decorate)([
    (0, $dsTCw.property)({
        attribute: false
    })
], $e0faea6f638c1177$export$dc909bdc6ed8e8f6.prototype, "forecast", void 0);
(0, $39J5i.__decorate)([
    (0, $dsTCw.property)({
        attribute: false
    })
], $e0faea6f638c1177$export$dc909bdc6ed8e8f6.prototype, "min", void 0);
(0, $39J5i.__decorate)([
    (0, $dsTCw.property)({
        attribute: false
    })
], $e0faea6f638c1177$export$dc909bdc6ed8e8f6.prototype, "max", void 0);
(0, $39J5i.__decorate)([
    (0, $dsTCw.property)({
        attribute: false
    })
], $e0faea6f638c1177$export$dc909bdc6ed8e8f6.prototype, "extraAttribute", void 0);
(0, $39J5i.__decorate)([
    (0, $dsTCw.property)({
        attribute: false
    })
], $e0faea6f638c1177$export$dc909bdc6ed8e8f6.prototype, "extraAttributeUnit", void 0);
(0, $39J5i.__decorate)([
    (0, $dsTCw.property)({
        attribute: false
    })
], $e0faea6f638c1177$export$dc909bdc6ed8e8f6.prototype, "extraAttributeColor", void 0);
(0, $39J5i.__decorate)([
    (0, $dsTCw.property)({
        attribute: false
    })
], $e0faea6f638c1177$export$dc909bdc6ed8e8f6.prototype, "extraAttributeDimBelow", void 0);
(0, $39J5i.__decorate)([
    (0, $dsTCw.property)({
        attribute: false
    })
], $e0faea6f638c1177$export$dc909bdc6ed8e8f6.prototype, "iconMap", void 0);
$e0faea6f638c1177$export$dc909bdc6ed8e8f6 = (0, $39J5i.__decorate)([
    (0, $1KSgR.customElement)("wfe-daily-list")
], $e0faea6f638c1177$export$dc909bdc6ed8e8f6);



var $39J5i = parcelRequire("39J5i");
parcelRequire("j0ZcV");
var $l56HR = parcelRequire("l56HR");
var $eGUNk = parcelRequire("eGUNk");

parcelRequire("1ZxoT");
var $dsTCw = parcelRequire("dsTCw");
var $1KSgR = parcelRequire("1KSgR");
var $6f99bd4ef956c48f$exports = {};
/*
 (c) 2011-2015, Vladimir Agafonkin
 SunCalc is a JavaScript library for calculating sun/moon position and light phases.
 https://github.com/mourner/suncalc
*/ (function() {
    "use strict";
    // shortcuts for easier to read formulas
    var PI = Math.PI, sin = Math.sin, cos = Math.cos, tan = Math.tan, asin = Math.asin, atan = Math.atan2, acos = Math.acos, rad = PI / 180;
    // sun calculations are based on http://aa.quae.nl/en/reken/zonpositie.html formulas
    // date/time constants and conversions
    var dayMs = 86400000, J1970 = 2440588, J2000 = 2451545;
    function toJulian(date) {
        return date.valueOf() / dayMs - 0.5 + J1970;
    }
    function fromJulian(j) {
        return new Date((j + 0.5 - J1970) * dayMs);
    }
    function toDays(date) {
        return toJulian(date) - J2000;
    }
    // general calculations for position
    var e = rad * 23.4397; // obliquity of the Earth
    function rightAscension(l, b) {
        return atan(sin(l) * cos(e) - tan(b) * sin(e), cos(l));
    }
    function declination(l, b) {
        return asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l));
    }
    function azimuth(H, phi, dec) {
        return atan(sin(H), cos(H) * sin(phi) - tan(dec) * cos(phi));
    }
    function altitude(H, phi, dec) {
        return asin(sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(H));
    }
    function siderealTime(d, lw) {
        return rad * (280.16 + 360.9856235 * d) - lw;
    }
    function astroRefraction(h) {
        if (h < 0) h = 0; // if h = -0.08901179 a div/0 would occur.
        // formula 16.4 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
        // 1.02 / tan(h + 10.26 / (h + 5.10)) h in degrees, result in arc minutes -> converted to rad:
        return 0.0002967 / Math.tan(h + 0.00312536 / (h + 0.08901179));
    }
    // general sun calculations
    function solarMeanAnomaly(d) {
        return rad * (357.5291 + 0.98560028 * d);
    }
    function eclipticLongitude(M) {
        var C = rad * (1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M)), P = rad * 102.9372; // perihelion of the Earth
        return M + C + P + PI;
    }
    function sunCoords(d) {
        var M = solarMeanAnomaly(d), L = eclipticLongitude(M);
        return {
            dec: declination(L, 0),
            ra: rightAscension(L, 0)
        };
    }
    var SunCalc = {};
    // calculates sun position for a given date and latitude/longitude
    SunCalc.getPosition = function(date, lat, lng) {
        var lw = rad * -lng, phi = rad * lat, d = toDays(date), c = sunCoords(d), H = siderealTime(d, lw) - c.ra;
        return {
            azimuth: azimuth(H, phi, c.dec),
            altitude: altitude(H, phi, c.dec)
        };
    };
    // sun times configuration (angle, morning name, evening name)
    var times = SunCalc.times = [
        [
            -0.833,
            "sunrise",
            "sunset"
        ],
        [
            -0.3,
            "sunriseEnd",
            "sunsetStart"
        ],
        [
            -6,
            "dawn",
            "dusk"
        ],
        [
            -12,
            "nauticalDawn",
            "nauticalDusk"
        ],
        [
            -18,
            "nightEnd",
            "night"
        ],
        [
            6,
            "goldenHourEnd",
            "goldenHour"
        ]
    ];
    // adds a custom time to the times config
    SunCalc.addTime = function(angle, riseName, setName) {
        times.push([
            angle,
            riseName,
            setName
        ]);
    };
    // calculations for sun times
    var J0 = 0.0009;
    function julianCycle(d, lw) {
        return Math.round(d - J0 - lw / (2 * PI));
    }
    function approxTransit(Ht, lw, n) {
        return J0 + (Ht + lw) / (2 * PI) + n;
    }
    function solarTransitJ(ds, M, L) {
        return J2000 + ds + 0.0053 * sin(M) - 0.0069 * sin(2 * L);
    }
    function hourAngle(h, phi, d) {
        return acos((sin(h) - sin(phi) * sin(d)) / (cos(phi) * cos(d)));
    }
    function observerAngle(height) {
        return -2.076 * Math.sqrt(height) / 60;
    }
    // returns set time for the given sun altitude
    function getSetJ(h, lw, phi, dec, n, M, L) {
        var w = hourAngle(h, phi, dec), a = approxTransit(w, lw, n);
        return solarTransitJ(a, M, L);
    }
    // calculates sun times for a given date, latitude/longitude, and, optionally,
    // the observer height (in meters) relative to the horizon
    SunCalc.getTimes = function(date, lat, lng, height) {
        height = height || 0;
        var lw = rad * -lng, phi = rad * lat, dh = observerAngle(height), d = toDays(date), n = julianCycle(d, lw), ds = approxTransit(0, lw, n), M = solarMeanAnomaly(ds), L = eclipticLongitude(M), dec = declination(L, 0), Jnoon = solarTransitJ(ds, M, L), i, len, time, h0, Jset, Jrise;
        var result = {
            solarNoon: fromJulian(Jnoon),
            nadir: fromJulian(Jnoon - 0.5)
        };
        for(i = 0, len = times.length; i < len; i += 1){
            time = times[i];
            h0 = (time[0] + dh) * rad;
            Jset = getSetJ(h0, lw, phi, dec, n, M, L);
            Jrise = Jnoon - (Jset - Jnoon);
            result[time[1]] = fromJulian(Jrise);
            result[time[2]] = fromJulian(Jset);
        }
        return result;
    };
    // moon calculations, based on http://aa.quae.nl/en/reken/hemelpositie.html formulas
    function moonCoords(d) {
        var L = rad * (218.316 + 13.176396 * d), M = rad * (134.963 + 13.064993 * d), F = rad * (93.272 + 13.229350 * d), l = L + rad * 6.289 * sin(M), b = rad * 5.128 * sin(F), dt = 385001 - 20905 * cos(M); // distance to the moon in km
        return {
            ra: rightAscension(l, b),
            dec: declination(l, b),
            dist: dt
        };
    }
    SunCalc.getMoonPosition = function(date, lat, lng) {
        var lw = rad * -lng, phi = rad * lat, d = toDays(date), c = moonCoords(d), H = siderealTime(d, lw) - c.ra, h = altitude(H, phi, c.dec), // formula 14.1 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
        pa = atan(sin(H), tan(phi) * cos(c.dec) - sin(c.dec) * cos(H));
        h = h + astroRefraction(h); // altitude correction for refraction
        return {
            azimuth: azimuth(H, phi, c.dec),
            altitude: h,
            distance: c.dist,
            parallacticAngle: pa
        };
    };
    // calculations for illumination parameters of the moon,
    // based on http://idlastro.gsfc.nasa.gov/ftp/pro/astro/mphase.pro formulas and
    // Chapter 48 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
    SunCalc.getMoonIllumination = function(date) {
        var d = toDays(date || new Date()), s = sunCoords(d), m = moonCoords(d), sdist = 149598000, phi = acos(sin(s.dec) * sin(m.dec) + cos(s.dec) * cos(m.dec) * cos(s.ra - m.ra)), inc = atan(sdist * sin(phi), m.dist - sdist * cos(phi)), angle = atan(cos(s.dec) * sin(s.ra - m.ra), sin(s.dec) * cos(m.dec) - cos(s.dec) * sin(m.dec) * cos(s.ra - m.ra));
        return {
            fraction: (1 + cos(inc)) / 2,
            phase: 0.5 + 0.5 * inc * (angle < 0 ? -1 : 1) / Math.PI,
            angle: angle
        };
    };
    function hoursLater(date, h) {
        return new Date(date.valueOf() + h * dayMs / 24);
    }
    // calculations for moon rise/set times are based on http://www.stargazing.net/kepler/moonrise.html article
    SunCalc.getMoonTimes = function(date, lat, lng, inUTC) {
        var t = new Date(date);
        if (inUTC) t.setUTCHours(0, 0, 0, 0);
        else t.setHours(0, 0, 0, 0);
        var hc = 0.133 * rad, h0 = SunCalc.getMoonPosition(t, lat, lng).altitude - hc, h1, h2, rise, set, a, b, xe, ye, d, roots, x1, x2, dx;
        // go in 2-hour chunks, each time seeing if a 3-point quadratic curve crosses zero (which means rise or set)
        for(var i = 1; i <= 24; i += 2){
            h1 = SunCalc.getMoonPosition(hoursLater(t, i), lat, lng).altitude - hc;
            h2 = SunCalc.getMoonPosition(hoursLater(t, i + 1), lat, lng).altitude - hc;
            a = (h0 + h2) / 2 - h1;
            b = (h2 - h0) / 2;
            xe = -b / (2 * a);
            ye = (a * xe + b) * xe + h1;
            d = b * b - 4 * a * h1;
            roots = 0;
            if (d >= 0) {
                dx = Math.sqrt(d) / (Math.abs(a) * 2);
                x1 = xe - dx;
                x2 = xe + dx;
                if (Math.abs(x1) <= 1) roots++;
                if (Math.abs(x2) <= 1) roots++;
                if (x1 < -1) x1 = x2;
            }
            if (roots === 1) {
                if (h0 < 0) rise = i + x1;
                else set = i + x1;
            } else if (roots === 2) {
                rise = i + (ye < 0 ? x2 : x1);
                set = i + (ye < 0 ? x1 : x2);
            }
            if (rise && set) break;
            h0 = h2;
        }
        var result = {};
        if (rise) result.rise = hoursLater(t, rise);
        if (set) result.set = hoursLater(t, set);
        if (!rise && !set) result[ye > 0 ? "alwaysUp" : "alwaysDown"] = true;
        return result;
    };
    $6f99bd4ef956c48f$exports = SunCalc;
})();




const $93e18bf828c9bae2$var$PRECIPITATION_DISPLAY_THRESHOLD = 0.3;
const $93e18bf828c9bae2$var$HOURLY_PRECIPITATION_MIN_SCALE = 1;
const $93e18bf828c9bae2$var$HOURLY_PRECIPITATION_MAX_SCALE = 5;
let $93e18bf828c9bae2$export$c4d9e0638219e78c = class WFEHourlyList extends (0, $eGUNk.LitElement) {
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
    willUpdate(changedProps) {
        if (changedProps.has("forecast") || changedProps.has("sunCoordinates") || changedProps.has("showSunTimes")) this._calculateSunTimes();
    }
    render() {
        if (!this.forecast?.length) return 0, $l56HR.nothing;
        const parts = [];
        let currentDay;
        const precipitationScale = this._computePrecipitationScale($93e18bf828c9bae2$var$HOURLY_PRECIPITATION_MIN_SCALE, $93e18bf828c9bae2$var$HOURLY_PRECIPITATION_MAX_SCALE);
        this.forecast.forEach((item, index)=>{
            if (!item?.datetime) return;
            const date = new Date(item.datetime);
            if (!Number.isFinite(date.getTime())) return;
            const dayKey = this._formatDayKey(date);
            if (dayKey !== currentDay) {
                currentDay = dayKey;
                parts.push(this._renderDayMarker(date));
            }
            const hourlyItem = this._renderHourlyItem(item, index, precipitationScale);
            if (hourlyItem !== (0, $l56HR.nothing)) parts.push(hourlyItem);
        });
        return (0, $l56HR.html)`${parts}`;
    }
    _renderDayMarker(date) {
        const label = (0, $2e3b0c24d7649e32$export$e86782e02be44113)(date, this.hass?.locale, this.hass?.config);
        return (0, $l56HR.html)`<div class="day-marker">${label}</div>`;
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
    _renderHourlyItem(item, index, precipitationScale) {
        if (!this._hasValidValue(item.temperature) || !this._hasValidValue(item.condition)) return 0, $l56HR.nothing;
        const date = new Date(item.datetime);
        const sunEvent = this._getSunEventForHour(date, index);
        const eventDate = sunEvent ? new Date(sunEvent.timestamp) : undefined;
        const dateClasses = [
            "date"
        ];
        if (sunEvent) dateClasses.push(sunEvent.type);
        const dateLabel = sunEvent ? (0, $2e3b0c24d7649e32$export$af90a3ef075406ce)(eventDate, this.hass.locale, this.hass.config) : (0, $2e3b0c24d7649e32$export$86a5557e1d677e29)(date, this.hass.locale, this.hass.config);
        const showAmPm = (0, $2e3b0c24d7649e32$export$98b044737b007ca6)(this.hass.locale);
        const amPmDate = eventDate ?? date;
        const amPmLabel = showAmPm ? (0, $2e3b0c24d7649e32$export$f57482e5e4ce715a)(amPmDate, this.hass.locale, this.hass.config) : undefined;
        return (0, $l56HR.html)`
      <div class="forecast-item ${showAmPm ? "" : "no-ampm"}">
        <div class="${dateClasses.join(" ")}">${dateLabel}</div>
        ${showAmPm ? (0, $l56HR.html)`<div class="ampm">${amPmLabel ?? ""}</div>` : ""}
        <div class="translate-container">
          <div class="icon-container" style=${`--item-temp: ${item.temperature}`}>
            <div class="forecast-image-icon">
              ${(0, $a670ed82a1e76f75$export$e0801f527146069)(item.condition, this, this._shouldUseNightIcon(item, date), this.iconMap)}
            </div>
            <div class="temp">${Math.round(item.temperature)}°</div>
          </div>
          <div class="templow"></div>
        </div>
        ${this._renderPrecipitationInfo(item, precipitationScale)}
        ${this._renderExtraAttribute(item)}
      </div>
    `;
    }
    _renderPrecipitationInfo(item, precipitationScale) {
        const hasPrecipitation = this._hasValidValue(item.precipitation);
        const hasPrecipitationProbability = this._hasValidValue(item.precipitation_probability);
        if (!hasPrecipitation && !hasPrecipitationProbability) return 0, $l56HR.nothing;
        const precipitationValue = hasPrecipitation ? item.precipitation : undefined;
        const precipitationClasses = [
            "precipitation"
        ];
        if ((precipitationValue ?? 0) > $93e18bf828c9bae2$var$PRECIPITATION_DISPLAY_THRESHOLD) precipitationClasses.push("active");
        let overflow = false;
        let precipitationStyle = (0, $l56HR.nothing);
        if (precipitationScale !== undefined && precipitationValue !== undefined && precipitationValue >= $93e18bf828c9bae2$var$PRECIPITATION_DISPLAY_THRESHOLD) {
            const normalized = precipitationScale > 0 ? Math.min(precipitationValue / precipitationScale, 1) : 0;
            const percent = `${(normalized * 100).toFixed(2)}%`;
            precipitationStyle = `--precipitation-fill: ${percent};`;
            overflow = precipitationValue > precipitationScale;
        }
        if (overflow) precipitationClasses.push("overflow");
        return (0, $l56HR.html)`
      ${hasPrecipitation ? (0, $l56HR.html)`<div class="${precipitationClasses.join(" ")}" style=${precipitationStyle}>
            ${item.precipitation.toFixed(1)}
          </div>` : (0, $l56HR.nothing)}
      ${hasPrecipitationProbability ? (0, $l56HR.html)`<div class="precipitationprobability ${(item.precipitation_probability ?? 0) > 30 ? "active" : ""}">
            ${item.precipitation_probability >= 0 ? item.precipitation_probability + "%" : ""}
          </div>` : (0, $l56HR.nothing)}
    `;
    }
    _renderExtraAttribute(item) {
        const key = this.extraAttribute?.trim();
        if (!key) return 0, $l56HR.nothing;
        const rawValue = item?.[key];
        if (rawValue === undefined || rawValue === null) return 0, $l56HR.nothing;
        let display;
        if (typeof rawValue === "number") display = rawValue.toLocaleString(this.hass?.locale?.language, {
            maximumFractionDigits: 1
        });
        else if (typeof rawValue === "string") {
            const trimmed = rawValue.trim();
            if (!trimmed.length) return 0, $l56HR.nothing;
            display = trimmed;
        } else try {
            display = JSON.stringify(rawValue);
        } catch (_err) {
            return 0, $l56HR.nothing;
        }
        const unitRaw = typeof this.extraAttributeUnit === "string" ? this.extraAttributeUnit : "";
        const unit = unitRaw.trim().length ? unitRaw : "";
        const dimBelow = this._normalizeDimBelow(this.extraAttributeDimBelow);
        const numericValue = this._parseNumericValue(rawValue);
        const isDimmed = dimBelow !== undefined && numericValue !== undefined && numericValue < dimBelow;
        const classes = [
            "hourly-extra"
        ];
        if (isDimmed) classes.push("dimmed");
        const color = this.extraAttributeColor?.trim();
        const style = color ? (0, $19f464fcda7d2482$export$1e5b4ce2fa884e6a)({
            color: color,
            opacity: isDimmed ? "0.3" : "1"
        }) : (0, $l56HR.nothing);
        return (0, $l56HR.html)`<div class=${classes.join(" ")} style=${style}>${display}${unit}</div>`;
    }
    _normalizeDimBelow(value) {
        return typeof value === "number" && Number.isFinite(value) ? value : undefined;
    }
    _parseNumericValue(rawValue) {
        const numericValue = typeof rawValue === "number" ? rawValue : Number(rawValue);
        return Number.isFinite(numericValue) ? numericValue : undefined;
    }
    _computePrecipitationScale(minScale, maxScale) {
        if (!this.forecast?.length) return undefined;
        const values = this.forecast.map((item)=>typeof item?.precipitation === "number" ? item.precipitation : undefined).filter((value)=>typeof value === "number");
        if (!values.length) return undefined;
        const highestValue = Math.max(...values);
        const unconstrained = Math.max(minScale, highestValue);
        return Math.min(unconstrained, maxScale);
    }
    _calculateSunTimes() {
        if (!this.sunCoordinates || !this.forecast?.length) {
            this._sunTimesByDay = {};
            return;
        }
        const { latitude: latitude , longitude: longitude  } = this.sunCoordinates;
        if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
            this._sunTimesByDay = {};
            return;
        }
        const sunTimes = {};
        for (const item of this.forecast){
            if (!item?.datetime) continue;
            const date = new Date(item.datetime);
            if (!Number.isFinite(date.getTime())) continue;
            const key = this._formatDayKey(date);
            if (sunTimes[key]) continue;
            const baseDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            let times = (0, (/*@__PURE__*/$parcel$interopDefault($6f99bd4ef956c48f$exports))).getTimes(baseDate, latitude, longitude);
            let sunrise = this._toTimestamp(times.sunrise);
            let sunset = this._toTimestamp(times.sunset);
            // Keep rendered day aligned with the calendar day of the forecast even if
            // user and forecast locations sit in very different time zones.
            const dayShift = this._determineDayShift(key, sunrise, sunset);
            if (dayShift !== 0) {
                const shiftedDate = new Date(baseDate);
                shiftedDate.setDate(shiftedDate.getDate() + dayShift);
                times = (0, (/*@__PURE__*/$parcel$interopDefault($6f99bd4ef956c48f$exports))).getTimes(shiftedDate, latitude, longitude);
                sunrise = this._toTimestamp(times.sunrise);
                sunset = this._toTimestamp(times.sunset);
            }
            sunTimes[key] = {};
            if (sunrise !== undefined) sunTimes[key].sunrise = sunrise;
            if (sunset !== undefined) sunTimes[key].sunset = sunset;
        }
        this._sunTimesByDay = sunTimes;
    }
    _shouldUseNightIcon(item, date) {
        if (item.is_daytime === false) return true;
        if (item.is_daytime === true) return false;
        const derived = this._isNightFromSunTimes(date);
        return derived ?? false;
    }
    _isNightFromSunTimes(date) {
        const times = this._sunTimesByDay?.[this._formatDayKey(date)];
        if (!times || times.sunrise === undefined || times.sunset === undefined) return undefined;
        const timestamp = date.getTime();
        if (!Number.isFinite(timestamp)) return undefined;
        if (times.sunrise <= times.sunset) return timestamp < times.sunrise || timestamp >= times.sunset;
        return !(timestamp >= times.sunrise && timestamp < times.sunset);
    }
    _getSunEventForHour(date, index) {
        if (!this.showSunTimes || !this._sunTimesByDay) return undefined;
        const key = this._formatDayKey(date);
        const times = this._sunTimesByDay[key];
        if (!times) return undefined;
        const start = date.getTime();
        if (!Number.isFinite(start)) return undefined;
        const end = this._getIntervalEnd(index, start);
        if (times.sunrise !== undefined && times.sunrise >= start && times.sunrise < end) return {
            type: "sunrise",
            timestamp: times.sunrise
        };
        if (times.sunset !== undefined && times.sunset >= start && times.sunset < end) return {
            type: "sunset",
            timestamp: times.sunset
        };
        return undefined;
    }
    _getIntervalEnd(index, start) {
        const next = this.forecast?.[index + 1];
        if (next?.datetime) {
            const nextDate = new Date(next.datetime);
            const nextTime = nextDate.getTime();
            if (Number.isFinite(nextTime) && nextTime > start) return nextTime;
        }
        // Fallback to one hour window if we can't determine the next step
        return start + 3600000;
    }
    _formatDayKey(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }
    _toTimestamp(value) {
        if (!value) return undefined;
        const time = value.getTime();
        return Number.isFinite(time) ? time : undefined;
    }
    _determineDayShift(targetKey, sunrise, sunset) {
        // Returns +1/-1 when sunrise/sunset fall on the previous/next day once
        // rendered in the user's local time zone. That happens when the forecast
        // location is many hours away from the viewer.
        const evaluate = (timestamp)=>{
            if (timestamp === undefined) return 0;
            const eventKey = this._formatDayKey(new Date(timestamp));
            if (eventKey === targetKey) return 0;
            return eventKey < targetKey ? 1 : -1;
        };
        const sunriseShift = evaluate(sunrise);
        if (sunriseShift !== 0) return sunriseShift;
        return evaluate(sunset);
    }
    constructor(...args){
        super(...args);
        this.forecast = [];
        this.showSunTimes = false;
        this._sunTimesByDay = {};
    }
};
(0, $39J5i.__decorate)([
    (0, $dsTCw.property)({
        attribute: false
    })
], $93e18bf828c9bae2$export$c4d9e0638219e78c.prototype, "hass", void 0);
(0, $39J5i.__decorate)([
    (0, $dsTCw.property)({
        attribute: false
    })
], $93e18bf828c9bae2$export$c4d9e0638219e78c.prototype, "forecast", void 0);
(0, $39J5i.__decorate)([
    (0, $dsTCw.property)({
        attribute: false
    })
], $93e18bf828c9bae2$export$c4d9e0638219e78c.prototype, "showSunTimes", void 0);
(0, $39J5i.__decorate)([
    (0, $dsTCw.property)({
        attribute: false
    })
], $93e18bf828c9bae2$export$c4d9e0638219e78c.prototype, "sunCoordinates", void 0);
(0, $39J5i.__decorate)([
    (0, $dsTCw.property)({
        attribute: false
    })
], $93e18bf828c9bae2$export$c4d9e0638219e78c.prototype, "extraAttribute", void 0);
(0, $39J5i.__decorate)([
    (0, $dsTCw.property)({
        attribute: false
    })
], $93e18bf828c9bae2$export$c4d9e0638219e78c.prototype, "extraAttributeUnit", void 0);
(0, $39J5i.__decorate)([
    (0, $dsTCw.property)({
        attribute: false
    })
], $93e18bf828c9bae2$export$c4d9e0638219e78c.prototype, "extraAttributeColor", void 0);
(0, $39J5i.__decorate)([
    (0, $dsTCw.property)({
        attribute: false
    })
], $93e18bf828c9bae2$export$c4d9e0638219e78c.prototype, "extraAttributeDimBelow", void 0);
(0, $39J5i.__decorate)([
    (0, $dsTCw.property)({
        attribute: false
    })
], $93e18bf828c9bae2$export$c4d9e0638219e78c.prototype, "iconMap", void 0);
$93e18bf828c9bae2$export$c4d9e0638219e78c = (0, $39J5i.__decorate)([
    (0, $1KSgR.customElement)("wfe-hourly-list")
], $93e18bf828c9bae2$export$c4d9e0638219e78c);



var $39J5i = parcelRequire("39J5i");
parcelRequire("j0ZcV");
var $l56HR = parcelRequire("l56HR");
var $eGUNk = parcelRequire("eGUNk");


parcelRequire("1ZxoT");
var $dsTCw = parcelRequire("dsTCw");
var $pklEb = parcelRequire("pklEb");
var $1KSgR = parcelRequire("1KSgR");
const $4ccfc45860c73208$var$NOWCAST_MINUTES = 60;
const $4ccfc45860c73208$var$NOWCAST_MIN_BAR_WIDTH_PX = 5;
const $4ccfc45860c73208$var$NOWCAST_MAX_BAR_WIDTH_PX = 7;
const $4ccfc45860c73208$var$NOWCAST_BASE_GAP_PX = 5;
const $4ccfc45860c73208$var$NOWCAST_PRECIPITATION_MIN_SCALE = 1;
const $4ccfc45860c73208$var$NOWCAST_LABEL_HYSTERESIS_MINUTES = 2;
let $4ccfc45860c73208$export$b13ff882ae67cf8e = class WFENowcast extends (0, $eGUNk.LitElement) {
    createRenderRoot() {
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
    render() {
        const series = this._buildMinuteSeries();
        const bars = this._reduceSeries(series, this._barStride);
        const maxValue = bars.reduce((max, value)=>Math.max(max, value), 0);
        const scale = Math.max($4ccfc45860c73208$var$NOWCAST_PRECIPITATION_MIN_SCALE, maxValue);
        const labelOffset = this._computeLabelOffset(this._containerWidth || this.clientWidth);
        const labels = this._barStride > 1 ? [
            "Now",
            "20m",
            "40m",
            "60m"
        ] : [
            "Now",
            "10m",
            "20m",
            "30m",
            "40m",
            "50m",
            "60m"
        ];
        return (0, $l56HR.html)`
      <div
        class=${(0, $ca7e425cc484d5ff$export$56cc687933817664)({
            "nowcast-bars": true
        })}
        style=${(0, $19f464fcda7d2482$export$1e5b4ce2fa884e6a)({
            "--wfe-nowcast-gap": `${this._barGap}px`
        })}
      >
        ${bars.map((value)=>{
            const ratio = Math.min(1, value / scale);
            return (0, $l56HR.html)`
            <div class="nowcast-bar">
              <div class="nowcast-bar-fill" style=${(0, $19f464fcda7d2482$export$1e5b4ce2fa884e6a)({
                height: `${Math.round(ratio * 100)}%`
            })}></div>
            </div>
          `;
        })}
      </div>
      <div class="nowcast-labels" style=${(0, $19f464fcda7d2482$export$1e5b4ce2fa884e6a)({
            transform: `translateX(${labelOffset}px)`
        })}>
        ${labels.map((label)=>(0, $l56HR.html)`<span>${label}</span>`)}
      </div>
    `;
    }
    _setupResizeObserver() {
        if (this._resizeObserver) return;
        this._resizeObserver = new ResizeObserver((entries)=>{
            const width = entries[0]?.contentRect?.width ?? this.clientWidth;
            if (Number.isFinite(width) && width > 0 && width !== this._containerWidth) this._containerWidth = width;
            this._updateResolution(width);
        });
        this._resizeObserver.observe(this);
    }
    _updateResolution(width) {
        if (!Number.isFinite(width) || width <= 0) return;
        const { stride: stride , gap: gap  } = this._resolveLayout(width);
        if (stride !== this._barStride) this._barStride = stride;
        if (gap !== this._barGap) this._barGap = gap;
    }
    _computeLabelOffset(width) {
        if (!this.forecast?.length || !Number.isFinite(width) || width <= 0) return 0;
        const timestamps = this.forecast.map((item)=>new Date(item.datetime).getTime()).filter((timestamp)=>Number.isFinite(timestamp)).sort((a, b)=>a - b);
        if (!timestamps.length) return 0;
        const firstTimestamp = timestamps[0];
        const diffMinutes = Math.round((Date.now() - firstTimestamp) / 60000);
        if (Math.abs(diffMinutes) <= $4ccfc45860c73208$var$NOWCAST_LABEL_HYSTERESIS_MINUTES) return 0;
        const pixelsPerMinute = width / $4ccfc45860c73208$var$NOWCAST_MINUTES;
        return diffMinutes * pixelsPerMinute;
    }
    _buildMinuteSeries() {
        const normalized = (Array.isArray(this.forecast) ? this.forecast : []).map((item)=>{
            const timestamp = new Date(item.datetime).getTime();
            return {
                timestamp: timestamp,
                value: Number.isFinite(item.precipitation) ? Math.max(0, item.precipitation) : 0
            };
        }).filter((item)=>Number.isFinite(item.timestamp)).sort((a, b)=>a.timestamp - b.timestamp);
        const values = normalized.map((item)=>item.value);
        const series = values.slice(0, $4ccfc45860c73208$var$NOWCAST_MINUTES);
        while(series.length < $4ccfc45860c73208$var$NOWCAST_MINUTES)series.push(0);
        return series;
    }
    _reduceSeries(series, stride) {
        if (stride <= 1) return series;
        const grouped = [];
        for(let index = 0; index < series.length; index += stride){
            const chunk = series.slice(index, index + stride);
            grouped.push(chunk.reduce((max, value)=>Math.max(max, value), 0));
        }
        return grouped;
    }
    _resolveLayout(width) {
        let stride = 1;
        let gap = $4ccfc45860c73208$var$NOWCAST_BASE_GAP_PX;
        while(stride < $4ccfc45860c73208$var$NOWCAST_MINUTES){
            const barWidth = this._computeBarWidth(width, stride, gap);
            if (barWidth >= $4ccfc45860c73208$var$NOWCAST_MIN_BAR_WIDTH_PX) break;
            stride += 1;
        }
        const barCount = Math.ceil($4ccfc45860c73208$var$NOWCAST_MINUTES / stride);
        if (barCount > 1) {
            const maxGap = (width - barCount * $4ccfc45860c73208$var$NOWCAST_MAX_BAR_WIDTH_PX) / (barCount - 1);
            if (maxGap > gap) gap = maxGap;
        }
        return {
            stride: stride,
            gap: Math.max(0, gap)
        };
    }
    _computeBarWidth(width, stride, gap) {
        const barCount = Math.ceil($4ccfc45860c73208$var$NOWCAST_MINUTES / stride);
        if (barCount <= 0) return 0;
        if (barCount === 1) return width;
        return (width - gap * (barCount - 1)) / barCount;
    }
    constructor(...args){
        super(...args);
        this.forecast = [];
        this._barStride = 1;
        this._barGap = $4ccfc45860c73208$var$NOWCAST_BASE_GAP_PX;
        this._containerWidth = 0;
    }
};
(0, $39J5i.__decorate)([
    (0, $dsTCw.property)({
        attribute: false
    })
], $4ccfc45860c73208$export$b13ff882ae67cf8e.prototype, "forecast", void 0);
(0, $39J5i.__decorate)([
    (0, $pklEb.state)()
], $4ccfc45860c73208$export$b13ff882ae67cf8e.prototype, "_barStride", void 0);
(0, $39J5i.__decorate)([
    (0, $pklEb.state)()
], $4ccfc45860c73208$export$b13ff882ae67cf8e.prototype, "_barGap", void 0);
(0, $39J5i.__decorate)([
    (0, $pklEb.state)()
], $4ccfc45860c73208$export$b13ff882ae67cf8e.prototype, "_containerWidth", void 0);
$4ccfc45860c73208$export$b13ff882ae67cf8e = (0, $39J5i.__decorate)([
    (0, $1KSgR.customElement)("wfe-nowcast")
], $4ccfc45860c73208$export$b13ff882ae67cf8e);


const $aefd8b71d9c18f54$var$DEFAULT_OPTIONS = {
    threshold: 0.005,
    maxVelocity: 5,
    deceleration: 0.00375,
    snapSelector: ".forecast-item"
};
const $aefd8b71d9c18f54$var$stateMap = new WeakMap();
const $aefd8b71d9c18f54$var$DRAG_ACTIVATION_THRESHOLD = 4;
const $aefd8b71d9c18f54$var$createDragState = ()=>({
        active: false,
        pointerId: null,
        startX: 0,
        scrollLeft: 0,
        lastTime: 0,
        lastScrollLeft: 0,
        velocity: 0,
        hasMoved: false,
        captured: false
    });
const $aefd8b71d9c18f54$export$81657173a9670ea5 = (container, customOptions = {})=>{
    const existing = $aefd8b71d9c18f54$var$stateMap.get(container);
    if (existing) return existing.cleanup;
    const options = {
        ...$aefd8b71d9c18f54$var$DEFAULT_OPTIONS,
        ...customOptions
    };
    const state = {
        drag: $aefd8b71d9c18f54$var$createDragState(),
        options: options,
        momentumFrame: undefined,
        cleanup: ()=>{
            stopMomentum();
            container.removeEventListener("pointerdown", onPointerDown);
            container.removeEventListener("pointermove", onPointerMove);
            container.removeEventListener("pointerup", onPointerEnd);
            container.removeEventListener("pointercancel", onPointerEnd);
            $aefd8b71d9c18f54$var$stateMap.delete(container);
        }
    };
    const cancelMomentumFrame = ()=>{
        if (state.momentumFrame !== undefined) {
            cancelAnimationFrame(state.momentumFrame);
            state.momentumFrame = undefined;
        }
    };
    const stopMomentum = ()=>{
        cancelMomentumFrame();
        container.classList.remove("momentum");
        container.classList.remove("dragging");
    };
    const alignToNearestItem = ()=>{
        cancelMomentumFrame();
        const items = Array.from(container.querySelectorAll(options.snapSelector));
        if (!items.length) {
            stopMomentum();
            return;
        }
        const style = getComputedStyle(container);
        const paddingLeft = parseFloat(style.paddingLeft || "0");
        const containerRect = container.getBoundingClientRect();
        const alignStart = containerRect.left + paddingLeft;
        let closest = null;
        let minDistance = Number.POSITIVE_INFINITY;
        for (const item of items){
            const rect = item.getBoundingClientRect();
            const distance = Math.abs(rect.left - alignStart);
            if (distance < minDistance) {
                minDistance = distance;
                closest = item;
            }
        }
        if (!closest) {
            stopMomentum();
            return;
        }
        const maxScroll = container.scrollWidth - container.clientWidth;
        const target = container.scrollLeft + (closest.getBoundingClientRect().left - alignStart);
        const clampedTarget = Math.max(0, Math.min(target, maxScroll));
        if (Math.abs(container.scrollLeft - clampedTarget) <= 0.5) {
            container.scrollLeft = clampedTarget;
            stopMomentum();
            return;
        }
        container.classList.add("momentum");
        container.classList.remove("dragging");
        const settle = ()=>{
            if (!container.isConnected) {
                stopMomentum();
                return;
            }
            const diff = Math.abs(container.scrollLeft - clampedTarget);
            if (diff <= 0.5) {
                container.scrollLeft = clampedTarget;
                stopMomentum();
                return;
            }
            state.momentumFrame = requestAnimationFrame(settle);
        };
        container.scrollTo({
            left: clampedTarget,
            behavior: "smooth"
        });
        state.momentumFrame = requestAnimationFrame(settle);
    };
    const startMomentum = (initialVelocity)=>{
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (maxScroll <= 0) {
            stopMomentum();
            return;
        }
        stopMomentum();
        let velocity = initialVelocity;
        if (Math.abs(velocity) > options.maxVelocity) velocity = Math.sign(velocity) * options.maxVelocity;
        let lastTimestamp = null;
        container.classList.remove("dragging");
        container.classList.add("momentum");
        const step = (timestamp)=>{
            if (!container.isConnected) {
                stopMomentum();
                return;
            }
            if (lastTimestamp === null) {
                lastTimestamp = timestamp;
                state.momentumFrame = requestAnimationFrame(step);
                return;
            }
            const dt = timestamp - lastTimestamp;
            lastTimestamp = timestamp;
            container.scrollLeft += velocity * dt;
            const maxScrollable = container.scrollWidth - container.clientWidth;
            if (container.scrollLeft <= 0 || container.scrollLeft >= maxScrollable) {
                container.scrollLeft = Math.max(0, Math.min(container.scrollLeft, maxScrollable));
                alignToNearestItem();
                return;
            }
            const deceleration = options.deceleration;
            const deltaV = deceleration * dt;
            if (Math.abs(velocity) <= deltaV) {
                alignToNearestItem();
                return;
            }
            velocity -= Math.sign(velocity) * deltaV;
            state.momentumFrame = requestAnimationFrame(step);
        };
        state.momentumFrame = requestAnimationFrame(step);
    };
    const resetDragState = ()=>{
        state.drag = $aefd8b71d9c18f54$var$createDragState();
    };
    const onPointerDown = (ev)=>{
        if (!container.isConnected) {
            stopMomentum();
            return;
        }
        stopMomentum();
        if (ev.button !== undefined && ev.button !== 0) return;
        if (ev.pointerType !== "mouse" && ev.pointerType !== "pen") return;
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (maxScroll <= 0) return;
        state.drag = {
            active: true,
            pointerId: ev.pointerId,
            startX: ev.clientX,
            scrollLeft: container.scrollLeft,
            lastTime: ev.timeStamp,
            lastScrollLeft: container.scrollLeft,
            velocity: 0,
            hasMoved: false,
            captured: false
        };
        container.classList.add("grabbing");
    };
    const onPointerMove = (ev)=>{
        if (!state.drag.active || ev.pointerId !== state.drag.pointerId) return;
        const deltaX = ev.clientX - state.drag.startX;
        if (!state.drag.hasMoved && Math.abs(deltaX) > $aefd8b71d9c18f54$var$DRAG_ACTIVATION_THRESHOLD) {
            state.drag.hasMoved = true;
            state.drag.lastTime = ev.timeStamp;
            state.drag.lastScrollLeft = container.scrollLeft;
            container.classList.add("dragging");
            try {
                container.setPointerCapture(ev.pointerId);
                state.drag.captured = true;
            } catch (err) {
                state.drag.captured = false;
            }
        }
        if (!state.drag.hasMoved) return;
        container.scrollLeft = state.drag.scrollLeft - deltaX;
        const dt = ev.timeStamp - state.drag.lastTime;
        if (dt > 0) {
            const velocity = (container.scrollLeft - state.drag.lastScrollLeft) / dt;
            state.drag.velocity = velocity;
        }
        state.drag.lastTime = ev.timeStamp;
        state.drag.lastScrollLeft = container.scrollLeft;
        ev.preventDefault();
    };
    const onPointerEnd = (ev)=>{
        if (ev.pointerId !== state.drag.pointerId) return;
        const { velocity: velocity , captured: captured , pointerId: pointerId , hasMoved: hasMoved  } = state.drag;
        resetDragState();
        try {
            if (captured && pointerId !== null && container.hasPointerCapture?.(pointerId)) container.releasePointerCapture(pointerId);
        } catch (err) {
        /* Ignore release errors */ }
        container.classList.remove("grabbing");
        if (!hasMoved) {
            container.classList.remove("dragging");
            return;
        }
        if (Math.abs(velocity) > options.threshold) startMomentum(velocity);
        else {
            container.classList.remove("dragging");
            alignToNearestItem();
        }
    };
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove, {
        passive: false
    });
    container.addEventListener("pointerup", onPointerEnd);
    container.addEventListener("pointercancel", onPointerEnd);
    state.cleanup = ()=>{
        stopMomentum();
        container.removeEventListener("pointerdown", onPointerDown);
        container.removeEventListener("pointermove", onPointerMove);
        container.removeEventListener("pointerup", onPointerEnd);
        container.removeEventListener("pointercancel", onPointerEnd);
        $aefd8b71d9c18f54$var$stateMap.delete(container);
    };
    $aefd8b71d9c18f54$var$stateMap.set(container, state);
    return state.cleanup;
};
const $aefd8b71d9c18f54$export$3bc24c4fed096b83 = (container)=>{
    const state = $aefd8b71d9c18f54$var$stateMap.get(container);
    if (state) state.cleanup();
};



const $e6159c9afb48cae5$var$MISSING_ATTRIBUTE_TEXT = "missing";
const $e6159c9afb48cae5$var$SOLAR_FORECAST_ATTRIBUTE = "solar_forecast";
const $e6159c9afb48cae5$var$NOWCAST_SERVICE_NAME = "get_minute_forecast";
const $e6159c9afb48cae5$var$isAttributeHeaderChip = (chip)=>chip.type === "attribute";
const $e6159c9afb48cae5$var$isTemplateHeaderChip = (chip)=>chip.type === "template";

class $e6159c9afb48cae5$export$53427b5d95bebd88 extends (0, $eGUNk.LitElement) {
    // Called by HA
    setConfig(config) {
        const previousNowcastEntity = this._config?.nowcast_entity;
        const previousNowcastLayout = this._config?.nowcast_layout;
        const normalizedHeaderChips = this._normalizeHeaderChips(config);
        const normalizedHeaderAttributes = normalizedHeaderChips.filter($e6159c9afb48cae5$var$isAttributeHeaderChip).map((chip)=>chip.attribute).filter((attribute)=>typeof attribute === "string" && attribute.trim().length > 0);
        const normalizedDailyMinGap = this._normalizeMinGapValue(config.daily_min_gap);
        const normalizedHourlyMinGap = this._normalizeMinGapValue(config.hourly_min_gap);
        const normalizedHourlyDimBelow = this._normalizeOptionalNumber(config.hourly_extra_attribute_dim_below);
        const normalizedDailyDimBelow = this._normalizeOptionalNumber(config.daily_extra_attribute_dim_below);
        const normalizedHourlyColor = this._normalizeOptionalText(config.hourly_extra_attribute_color);
        const normalizedDailyColor = this._normalizeOptionalText(config.daily_extra_attribute_color);
        const normalizedIconMap = this._normalizeIconMap(config.icon_map);
        const normalizedMasonryRows = this._normalizeMasonryRows(config.masonry_rows);
        const defaults = {
            type: "custom:weather-forecast-extended-card",
            ...config,
            nowcast_entity: config.nowcast_entity,
            nowcast_layout: config.nowcast_layout ?? "pager",
            nowcast_always_show: config.nowcast_always_show ?? false,
            show_header: config.show_header ?? true,
            hourly_forecast: config.hourly_forecast ?? true,
            daily_forecast: config.daily_forecast ?? true,
            orientation: config.orientation ?? "vertical",
            show_sun_times: config.show_sun_times ?? false,
            sun_use_home_coordinates: config.sun_use_home_coordinates ?? true,
            use_night_header_backgrounds: config.use_night_header_backgrounds ?? true,
            header_chips: normalizedHeaderChips,
            header_attributes: normalizedHeaderAttributes,
            icon_map: normalizedIconMap,
            daily_min_gap: normalizedDailyMinGap,
            hourly_min_gap: normalizedHourlyMinGap,
            hourly_extra_attribute: config.hourly_extra_attribute,
            hourly_extra_attribute_unit: config.hourly_extra_attribute_unit,
            hourly_extra_attribute_color: normalizedHourlyColor,
            hourly_extra_attribute_dim_below: normalizedHourlyDimBelow,
            daily_extra_attribute: config.daily_extra_attribute,
            daily_extra_attribute_unit: config.daily_extra_attribute_unit,
            daily_extra_attribute_color: normalizedDailyColor,
            daily_extra_attribute_dim_below: normalizedDailyDimBelow,
            solar_forecast_entries: Array.isArray(config.solar_forecast_entries) ? config.solar_forecast_entries : undefined,
            masonry_rows: normalizedMasonryRows
        };
        this._config = defaults;
        if (previousNowcastEntity !== defaults.nowcast_entity) this._resetNowcastState();
        if (previousNowcastLayout !== defaults.nowcast_layout) this._headerPageIndex = 0;
        this._entity = defaults.entity;
        // call set hass() to immediately adjust to a changed entity
        // while editing the entity in the card editor
        if (this._hass) this.hass = this._hass;
        this._refreshTemplateSubscriptions();
        this._setupNowcastRefreshTimer();
    }
    set hass(hass) {
        this._hass = hass;
        this._state = hass.states[this._entity];
        if (this._state) {
            this._status = this._state.state;
            const fn = this._state.attributes.friendly_name;
            this._name = fn ? fn : this._entity;
        }
        const headerTemperatureEntity = this._config?.header_temperature_entity;
        this._headerTemperatureState = headerTemperatureEntity ? hass.states[headerTemperatureEntity] : undefined;
        this._refreshTemplateSubscriptions();
        this._handleNowcastHassUpdate();
        this._setupNowcastRefreshTimer();
    }
    _normalizeHeaderChips(config) {
        const limit = 3;
        const normalized = [];
        if (Array.isArray(config.header_chips)) for (const chip of config.header_chips){
            if (normalized.length >= limit || !chip || typeof chip !== "object") continue;
            if (chip.type === "attribute") {
                const attr = typeof chip.attribute === "string" ? chip.attribute.trim() : "";
                const tap_action = chip.tap_action;
                const icon = typeof chip.icon === "string" ? chip.icon.trim() : undefined;
                normalized.push({
                    type: "attribute",
                    attribute: attr,
                    tap_action: tap_action,
                    icon: icon
                });
                continue;
            }
            if (chip.type === "template") {
                const template = typeof chip.template === "string" ? chip.template.trim() : "";
                const tap_action = chip.tap_action;
                const icon = typeof chip.icon === "string" ? chip.icon.trim() : undefined;
                normalized.push({
                    type: "template",
                    template: template,
                    tap_action: tap_action,
                    icon: icon
                });
            }
        }
        if (normalized.length) return normalized.slice(0, limit);
        const attributeEntries = Array.isArray(config.header_attributes) ? config.header_attributes.filter((attr, index)=>index < limit && typeof attr === "string").map((attr)=>attr.trim()).filter((attr)=>attr.length > 0) : [];
        return attributeEntries.map((attribute)=>({
                type: "attribute",
                attribute: attribute
            }));
    }
    _normalizeMinGapValue(value) {
        if (value === null || typeof value === "undefined") return undefined;
        const numericValue = typeof value === "number" ? value : Number(value);
        if (!Number.isFinite(numericValue)) return undefined;
        const clamped = Math.max(10, numericValue);
        return Math.round(clamped);
    }
    _normalizeOptionalNumber(value) {
        if (value === null || typeof value === "undefined") return undefined;
        const numericValue = typeof value === "number" ? value : Number(value);
        return Number.isFinite(numericValue) ? numericValue : undefined;
    }
    _normalizeOptionalText(value) {
        if (value === null || typeof value === "undefined") return undefined;
        const trimmed = String(value).trim();
        return trimmed.length ? trimmed : undefined;
    }
    _normalizeMasonryRows(value) {
        if (value === null || typeof value === "undefined") return undefined;
        const numericValue = typeof value === "number" ? value : Number(value);
        if (!Number.isFinite(numericValue)) return undefined;
        if (numericValue <= 0) return undefined;
        return Math.max(1, Math.round(numericValue));
    }
    _normalizeIconMap(iconMap) {
        if (!iconMap || typeof iconMap !== "object") return undefined;
        const normalized = {};
        Object.entries(iconMap).forEach(([key, value])=>{
            if (typeof value !== "string") return;
            const trimmed = value.trim();
            if (trimmed.length) normalized[key] = trimmed;
        });
        return Object.keys(normalized).length ? normalized : undefined;
    }
    _shouldApplyMasonryHeight() {
        if (!this._config?.masonry_rows) return false;
        if (!this.isConnected) return true;
        const rowHeight = getComputedStyle(this).getPropertyValue("--row-height").trim();
        if (rowHeight) return false;
        return !Boolean(this.closest("hui-sections-view") || this.closest("hui-section-view") || this.closest("hui-section"));
    }
    _getHeaderChips() {
        if (!this._config) return [];
        if (Array.isArray(this._config.header_chips) && this._config.header_chips.length) return this._config.header_chips.slice(0, 3);
        const attributeEntries = this._config.header_attributes ?? [];
        return attributeEntries.slice(0, 3).map((attribute)=>({
                type: "attribute",
                attribute: attribute
            }));
    }
    _refreshTemplateSubscriptions() {
        if (!this.isConnected || !this._config || !this._hass?.connection) {
            this._teardownTemplateSubscriptions({
                clearValues: !this.isConnected
            });
            return;
        }
        const chips = this._getHeaderChips();
        const previousValues = this._templateChipValues;
        this._teardownTemplateSubscriptions();
        const nextSubscriptions = [];
        const nextValues = {};
        chips.forEach((chip, index)=>{
            if (chip.type !== "template") {
                this._clearTemplateChipValue(index);
                nextSubscriptions[index] = undefined;
                return;
            }
            const template = chip.template.trim();
            if (!template) {
                this._clearTemplateChipValue(index);
                nextSubscriptions[index] = undefined;
                return;
            }
            if (previousValues[index]) nextValues[index] = previousValues[index];
            const unsubscribePromise = this._subscribeTemplate(index, template);
            nextSubscriptions[index] = unsubscribePromise;
        });
        this._templateSubscriptions = nextSubscriptions;
        this._templateChipValues = {
            ...nextValues
        };
    }
    _subscribeTemplate(index, template) {
        const connection = this._hass?.connection;
        if (!connection) {
            this._setTemplateChipValue(index, $e6159c9afb48cae5$var$MISSING_ATTRIBUTE_TEXT, true);
            return undefined;
        }
        return connection.subscribeMessage((message)=>this._handleTemplateResult(index, template, message), {
            type: "render_template",
            template: template,
            strict: true,
            report_errors: true
        }).catch((error)=>{
            // eslint-disable-next-line no-console
            console.error("weather-forecast-extended: template subscription failed", error);
            this._setTemplateChipValue(index, $e6159c9afb48cae5$var$MISSING_ATTRIBUTE_TEXT, true);
            return undefined;
        });
    }
    _teardownTemplateSubscriptions({ clearValues: clearValues = false  } = {}) {
        this._templateSubscriptions.forEach((subscription)=>{
            subscription?.then((unsub)=>{
                if (typeof unsub === "function") unsub();
            }).catch(()=>undefined);
        });
        this._templateSubscriptions = [];
        if (clearValues && Object.keys(this._templateChipValues).length) this._templateChipValues = {};
    }
    _handleTemplateResult(index, template, message) {
        if (message?.error) {
            this._setTemplateChipValue(index, $e6159c9afb48cae5$var$MISSING_ATTRIBUTE_TEXT, true);
            return;
        }
        const raw = message?.result;
        if (raw === null || raw === undefined) {
            this._setTemplateChipValue(index, $e6159c9afb48cae5$var$MISSING_ATTRIBUTE_TEXT, true);
            return;
        }
        if (typeof raw === "string") {
            const trimmed = raw.trim();
            if (trimmed.length === 0) {
                this._setTemplateChipValue(index, $e6159c9afb48cae5$var$MISSING_ATTRIBUTE_TEXT, true);
                return;
            }
            this._setTemplateChipValue(index, raw, false);
            return;
        }
        if (typeof raw === "number" || typeof raw === "boolean") {
            this._setTemplateChipValue(index, String(raw), false);
            return;
        }
        try {
            this._setTemplateChipValue(index, JSON.stringify(raw), false);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("weather-forecast-extended: failed to stringify template result", template, error);
            this._setTemplateChipValue(index, $e6159c9afb48cae5$var$MISSING_ATTRIBUTE_TEXT, true);
        }
    }
    _setTemplateChipValue(index, display, missing) {
        const previous = this._templateChipValues[index];
        if (previous && previous.display === display && previous.missing === missing) return;
        this._templateChipValues = {
            ...this._templateChipValues,
            [index]: {
                display: display,
                missing: missing
            }
        };
    }
    _clearTemplateChipValue(index) {
        if (!(index in this._templateChipValues)) return;
        const { [index]: _removed , ...rest } = this._templateChipValues;
        this._templateChipValues = rest;
    }
    getCardSize() {
        if (this._config?.masonry_rows !== undefined) return Math.max(1, Math.ceil(this._config.masonry_rows));
        const gridRows = this.getGridOptions()?.rows ?? 3;
        const sectionRowHeightPx = 56;
        const estimatedHeight = gridRows * sectionRowHeightPx;
        return Math.max(1, Math.ceil(estimatedHeight / 50));
    }
    getGridOptions() {
        if (!this._config) return {
            columns: 12,
            rows: 3,
            min_columns: 6,
            min_rows: 3
        };
        const orientation = this._config.orientation ?? "vertical";
        const showHeader = this._config.show_header !== false;
        const showDaily = this._config.daily_forecast !== false;
        const showHourly = this._config.hourly_forecast !== false;
        const hasInlineNowcast = Boolean(showHeader && this._config.nowcast_entity && (this._config.nowcast_layout ?? "pager") === "inline");
        let rows = 3;
        if (orientation === "horizontal") {
            if (!showDaily && !showHourly) rows = showHeader ? 3 : 3;
            else if (showDaily && showHourly) rows = showHeader ? 6 : 5;
            else rows = showHeader ? 5 : 4;
        } else {
            let computed = 0;
            if (showHeader) computed += 2;
            if (showDaily) computed += 3;
            if (showHourly) computed += 2;
            if (showDaily && showHourly) computed += 1;
            if (!showHeader && showDaily && showHourly) computed += 1;
            if (showHeader && (showDaily || showHourly) && !(showDaily && showHourly)) computed += 1;
            if (showHeader && showDaily && showHourly) computed += 1;
            if (!showHeader && showHourly) computed = Math.max(computed, 3);
            if (!showHeader && showDaily) computed = Math.max(computed, 4);
            if (!showHeader && !showDaily && !showHourly) computed = 2;
            rows = Math.max(computed, 2);
        }
        if (hasInlineNowcast) rows += 1;
        const minRows = rows;
        return {
            columns: 12,
            rows: rows,
            min_columns: orientation === "horizontal" ? 12 : 6,
            min_rows: minRows
        };
    }
    static #_ = (()=>{
        // Load styles using LitElement
        this.styles = (0, $b377d607dfc671f6$export$9dd6ff9ea0189349);
    })();
    static async getConfigElement() {
        await (parcelRequire("iFK5S"));
        return document.createElement("weather-forecast-extended-editor");
    }
    static getStubConfig(hass) {
        const weatherEntity = Object.keys(hass?.states ?? {}).find((entityId)=>entityId.startsWith("weather."));
        return {
            type: "custom:weather-forecast-extended-card",
            entity: weatherEntity ?? "weather.home",
            header_attributes: [],
            show_header: true,
            hourly_forecast: true,
            daily_forecast: true,
            orientation: "vertical",
            use_night_header_backgrounds: true
        };
    }
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
            this._calculateMinMaxTemps();
        // Hourly translation dimensions recalculation happens inside wfe-hourly-list
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
        this._refreshTemplateSubscriptions();
        if (this.hasUpdated && this._config && this._hass) this._subscribeForecastEvents();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._teardownTemplateSubscriptions({
            clearValues: true
        });
        this._unsubscribeForecastEvents();
        this._clearNowcastRefreshTimer();
        if (this._resizeObserver) this._resizeObserver.disconnect();
        Object.values(this._momentumCleanup).forEach((cleanup)=>cleanup?.());
        this._momentumCleanup = {};
        this._momentumElement = {};
    }
    updated(changedProps) {
        super.updated(changedProps);
        const forecastHourlyChanged = changedProps.has("_forecastHourlyEvent");
        const forecastDailyChanged = changedProps.has("_forecastDailyEvent");
        if (forecastHourlyChanged || forecastDailyChanged) this._calculateMinMaxTemps();
        if (!this._config || !this._hass) return;
        if (changedProps.has("_config") || !this._subscriptions.hourly && !this._subscriptions.daily) this._subscribeForecastEvents();
        if (changedProps.has("_config") || forecastHourlyChanged || forecastDailyChanged) this._refreshSolarForecastData();
        if (changedProps.has("_config")) this._refreshNowcastData();
        const card = this.shadowRoot.querySelector("ha-card");
        const daily = this.shadowRoot.querySelector(".forecast.daily");
        const hourly = this.shadowRoot.querySelector(".forecast.hourly");
        if (daily) this._initDragScroll("daily", daily);
        else this._teardownDragScroll("daily");
        if (hourly) this._initDragScroll("hourly", hourly);
        else this._teardownDragScroll("hourly");
        if (!this._resizeObserver) {
            if (!card || !daily && !hourly) return;
            this._resizeObserver = new ResizeObserver(()=>{
                this._updateGap();
            });
            this._resizeObserver.observe(card);
            // Call once for the initial size
            this._updateGap();
        // Hourly translation heights are handled inside wfe-hourly-list
        }
    }
    // Render methods
    render() {
        if (!this._config || !this._hass) return 0, $l56HR.nothing;
        if (!this._state) return (0, $l56HR.html)`
        <hui-warning>
          ${this._name} not found.
        </hui-warning>
      `;
        if (this._status === "unavailable") return (0, $l56HR.html)`
        <ha-card class="unavailable">
          <p>${this._name} is unavailable.</p>
        </ha-card>
      `;
        const dailyEnabled = this._config.daily_forecast !== false;
        const hourlyEnabled = this._config.hourly_forecast !== false;
        const showHeader = this._config.show_header !== false;
        const showForecasts = dailyEnabled || hourlyEnabled;
        const showForecastDivider = dailyEnabled && hourlyEnabled;
        const dailyForecastRaw = this._forecastDailyEvent?.forecast ?? [];
        const hourlyForecastRaw = this._forecastHourlyEvent?.forecast ?? [];
        const dailyForecast = this._applySolarForecastToForecast(dailyForecastRaw, "daily");
        const hourlyForecast = this._applySolarForecastToForecast(hourlyForecastRaw, "hourly");
        const sunCoordinates = this._getLocationCoordinates();
        const showSunTimes = Boolean(this._config.show_sun_times && sunCoordinates && hourlyEnabled);
        const orientation = this._config.orientation ?? "vertical";
        const temperatureTapAction = this._config.header_tap_action_temperature;
        const conditionTapAction = this._config.header_tap_action_condition;
        const temperatureActionEntity = this._config.header_temperature_entity || this._entity;
        const hasTemperatureTapAction = (0, $ee1328194d522913$export$e217e69099d082f5)(temperatureTapAction);
        const hasConditionTapAction = (0, $ee1328194d522913$export$e217e69099d082f5)(conditionTapAction);
        const headerTemperature = this._computeHeaderTemperature();
        const headerCondition = this._hass?.formatEntityState?.(this._state) || this._state.state;
        const containerClassMap = {
            "forecast-container": true,
            "orientation-horizontal": orientation === "horizontal",
            "orientation-vertical": orientation !== "horizontal"
        };
        const headerOnly = showHeader && !showForecasts;
        const nowcastEnabled = this._isNowcastEnabled();
        const nowcastLayout = this._config.nowcast_layout ?? "pager";
        const showNowcastPager = nowcastEnabled && nowcastLayout === "pager";
        const showInlineNowcast = nowcastEnabled && nowcastLayout === "inline" && (this._config.nowcast_always_show || this._nowcastHasRain || headerOnly);
        const headerClassMap = {
            weather: true,
            "header-only": headerOnly,
            "nowcast-inline": showInlineNowcast,
            "nowcast-pager": showNowcastPager
        };
        const hasContent = showHeader || dailyEnabled || hourlyEnabled;
        const dailyStyle = (()=>{
            const styles = {};
            if (this._dailyGap !== undefined) styles["--dynamic-gap"] = `${this._dailyGap}px`;
            if (this._config?.daily_min_gap !== undefined) styles["--min-gap"] = `${this._config.daily_min_gap}px`;
            return Object.keys(styles).length ? (0, $19f464fcda7d2482$export$1e5b4ce2fa884e6a)(styles) : (0, $l56HR.nothing);
        })();
        const hourlyStyle = (()=>{
            const styles = {};
            if (this._hourlyGap !== undefined) styles["--dynamic-gap"] = `${this._hourlyGap}px`;
            if (this._hourlyMinTemp !== undefined && this._hourlyMaxTemp !== undefined) {
                styles["--min-temp"] = `${this._hourlyMinTemp}`;
                styles["--max-temp"] = `${this._hourlyMaxTemp}`;
            }
            if (this._config?.hourly_min_gap !== undefined) styles["--min-gap"] = `${this._config.hourly_min_gap}px`;
            return Object.keys(styles).length ? (0, $19f464fcda7d2482$export$1e5b4ce2fa884e6a)(styles) : (0, $l56HR.nothing);
        })();
        const cardStyle = (()=>{
            if (!this._shouldApplyMasonryHeight()) return 0, $l56HR.nothing;
            const rowCount = this._config?.masonry_rows ?? 0;
            if (!Number.isFinite(rowCount) || rowCount <= 0) return 0, $l56HR.nothing;
            return (0, $19f464fcda7d2482$export$1e5b4ce2fa884e6a)({
                "min-height": `${rowCount * 50}px`
            });
        })();
        if (!hasContent) {
            const cardLabel = this._name || this._entity;
            return (0, $l56HR.html)`
        <hui-warning>
          ${cardLabel} has no sections enabled.
        </hui-warning>
      `;
        }
        const headerChips = this._computeHeaderChipDisplays();
        const useSnowNowcastFill = this._shouldUseSnowNowcastFill();
        const headerStyles = {
            "background-image": `url(${this._getWeatherBgImage(this._state.state)})`
        };
        if (showInlineNowcast && !headerOnly) headerStyles["--wfe-header-height"] = "calc(4 * var(--row-height, 56px))";
        const headerChipsTemplate = headerChips.length ? headerChips.map((chip)=>{
            const hasChipAction = (0, $ee1328194d522913$export$e217e69099d082f5)(chip.action);
            const chipClassMap = {
                "attribute-chip": true,
                missing: chip.missing,
                "template-chip": chip.type === "template",
                "has-action": hasChipAction
            };
            const chipTitle = chip.tooltip || `${chip.label}: ${chip.display}`;
            return (0, $l56HR.html)`
          <div
            class=${(0, $ca7e425cc484d5ff$export$56cc687933817664)(chipClassMap)}
            title=${chipTitle}
            role=${hasChipAction ? "button" : (0, $l56HR.nothing)}
            tabindex=${hasChipAction ? 0 : (0, $l56HR.nothing)}
            @click=${hasChipAction ? ()=>this._handleHeaderChipTap(chip.action) : undefined}
            @keydown=${hasChipAction ? (ev)=>this._handleHeaderChipKeydown(ev, chip.action) : undefined}
          >
            ${chip.icon ? (0, $l56HR.html)`<ha-icon class="chip-icon" .icon=${chip.icon}></ha-icon>` : (0, $l56HR.nothing)}
            <span class="header-pill-text">${chip.display}</span>
          </div>
        `;
        }) : (0, $l56HR.nothing);
        const pagerDotsTemplate = showNowcastPager ? (0, $l56HR.html)`
        <div class="pager-dots">
          ${[
            0,
            1
        ].map((index)=>(0, $l56HR.html)`
            <button
              class=${(0, $ca7e425cc484d5ff$export$56cc687933817664)({
                "pager-dot": true,
                active: index === this._headerPageIndex
            })}
              type="button"
              aria-label=${`Header page ${index + 1}`}
              @click=${()=>this._setHeaderPage(index)}
            ></button>
          `)}
        </div>
      ` : (0, $l56HR.nothing);
        const headerAttributesTemplate = headerChips.length ? (0, $l56HR.html)`
        <div class="header-attributes">
          ${headerChipsTemplate}
        </div>
      ` : (0, $l56HR.nothing);
        const headerMainTemplate = (0, $l56HR.html)`
      <div class="header-main">
        <div
          class=${(0, $ca7e425cc484d5ff$export$56cc687933817664)({
            temp: true,
            "has-action": hasTemperatureTapAction
        })}
          role=${hasTemperatureTapAction ? "button" : (0, $l56HR.nothing)}
          tabindex=${hasTemperatureTapAction ? 0 : (0, $l56HR.nothing)}
          @click=${hasTemperatureTapAction ? ()=>this._handleHeaderTap(temperatureTapAction, temperatureActionEntity) : undefined}
          @keydown=${hasTemperatureTapAction ? (ev)=>this._handleHeaderKeydown(ev, temperatureTapAction, temperatureActionEntity) : undefined}
        >
          <span class="header-pill-text">${headerTemperature}</span>
        </div>
        <div
          class=${(0, $ca7e425cc484d5ff$export$56cc687933817664)({
            condition: true,
            "has-action": hasConditionTapAction
        })}
          role=${hasConditionTapAction ? "button" : (0, $l56HR.nothing)}
          tabindex=${hasConditionTapAction ? 0 : (0, $l56HR.nothing)}
          @click=${hasConditionTapAction ? ()=>this._handleHeaderTap(conditionTapAction) : undefined}
          @keydown=${hasConditionTapAction ? (ev)=>this._handleHeaderKeydown(ev, conditionTapAction) : undefined}
        >
          <span class="header-pill-text">
            ${headerCondition}
          </span>
        </div>
      </div>
    `;
        const headerLayoutTemplate = (0, $l56HR.html)`
      <div class="header-layout">
        ${headerAttributesTemplate}
        ${headerMainTemplate}
      </div>
    `;
        const nowcastPanelTemplate = (0, $l56HR.html)`
      <div
        class="nowcast-panel"
        style=${useSnowNowcastFill ? (0, $19f464fcda7d2482$export$1e5b4ce2fa884e6a)({
            "--wfe-nowcast-fill-color": "rgba(255, 255, 255, 0.9)"
        }) : (0, $l56HR.nothing)}
      >
        <wfe-nowcast .forecast=${this._nowcastForecast}></wfe-nowcast>
      </div>
    `;
        return (0, $l56HR.html)`
      <ha-card style=${cardStyle}>
        ${showHeader ? (0, $l56HR.html)`
            <div
              class=${(0, $ca7e425cc484d5ff$export$56cc687933817664)(headerClassMap)}
              style=${(0, $19f464fcda7d2482$export$1e5b4ce2fa884e6a)(headerStyles)}
            >
              <div class="header-content">
                ${showNowcastPager ? (0, $l56HR.html)`
                    <div class="header-pager">
                      <div
                        class="header-pages"
                        style=${(0, $19f464fcda7d2482$export$1e5b4ce2fa884e6a)({
            transform: `translateX(-${this._headerPageIndex * 100}%)`
        })}
                        @pointerdown=${this._handleHeaderPagerPointerDown}
                        @pointerup=${this._handleHeaderPagerPointerUp}
                        @pointercancel=${this._handleHeaderPagerPointerCancel}
                      >
                        <div class="header-page header-page-primary">
                          ${headerLayoutTemplate}
                        </div>
                        <div class="header-page header-page-nowcast">
                          ${nowcastPanelTemplate}
                        </div>
                      </div>
                      ${pagerDotsTemplate}
                    </div>
                  ` : (0, $l56HR.html)`
                    ${headerLayoutTemplate}
                    ${showInlineNowcast ? nowcastPanelTemplate : (0, $l56HR.nothing)}
                  `}
              </div>
            </div>
          ` : (0, $l56HR.nothing)}
        ${showHeader && showForecasts ? (0, $l56HR.html)`<div class="divider card-divider"></div>` : (0, $l56HR.nothing)}
        ${showForecasts ? (0, $l56HR.html)`
            <div class=${(0, $ca7e425cc484d5ff$export$56cc687933817664)(containerClassMap)}>
              ${dailyEnabled ? (0, $l56HR.html)`
                  <div class="forecast-daily-container">
                    <div class="fade-left"></div>
                    <div class="fade-right"></div>
                    <div class="forecast daily" style=${dailyStyle}>
                      <wfe-daily-list
                        .hass=${this._hass}
                        .forecast=${dailyForecast}
                        .min=${this._dailyMinTemp}
                        .max=${this._dailyMaxTemp}
                        .extraAttribute=${this._config.daily_extra_attribute}
                        .extraAttributeUnit=${this._config.daily_extra_attribute_unit}
                        .extraAttributeColor=${this._config.daily_extra_attribute_color}
                        .extraAttributeDimBelow=${this._config.daily_extra_attribute_dim_below}
                        .iconMap=${this._config.icon_map}
                        @wfe-daily-selected=${this._handleDailySelected}
                      ></wfe-daily-list>
                    </div>
                  </div>
                ` : (0, $l56HR.nothing)}
              ${showForecastDivider ? (0, $l56HR.html)`<div class="divider forecast-divider"></div>` : (0, $l56HR.nothing)}
              ${hourlyEnabled ? (0, $l56HR.html)`
                  <div class="forecast-hourly-container">
                    <div class="fade-left"></div>
                    <div class="fade-right"></div>
                    <div
                      class="forecast hourly"
                      style=${hourlyStyle}
                    >
                      <wfe-hourly-list
                        .hass=${this._hass}
                        .forecast=${hourlyForecast}
                        .showSunTimes=${showSunTimes}
                        .sunCoordinates=${sunCoordinates}
                        .extraAttribute=${this._config.hourly_extra_attribute}
                        .extraAttributeUnit=${this._config.hourly_extra_attribute_unit}
                        .extraAttributeColor=${this._config.hourly_extra_attribute_color}
                        .extraAttributeDimBelow=${this._config.hourly_extra_attribute_dim_below}
                        .iconMap=${this._config.icon_map}
                      ></wfe-hourly-list>
                    </div>
                  </div>
                ` : (0, $l56HR.nothing)}
            </div>
          ` : (0, $l56HR.nothing)}
      </ha-card>
    `;
    }
    // Private methods
    // Header temperature from configured sensor or weather entity attribute
    _computeHeaderTemperature() {
        if (!this._hass || !this._state) return "";
        const sensorState = this._headerTemperatureState;
        if (sensorState && !this._isStateUnavailable(sensorState.state)) {
            const formattedSensor = this._hass?.formatEntityState?.(sensorState);
            if (formattedSensor && typeof formattedSensor === "string") return formattedSensor;
            return sensorState.state;
        }
        const formattedWeather = this._hass?.formatEntityAttributeValue?.(this._state, "temperature");
        if (formattedWeather && typeof formattedWeather === "string") return formattedWeather;
        return this._state.state || "";
    }
    _isStateUnavailable(state) {
        if (!state) return true;
        const normalized = state.toLowerCase();
        return normalized === "unavailable" || normalized === "unknown";
    }
    // Header chips (attribute / template)
    _computeHeaderChipDisplays() {
        if (!this._config) return [];
        const chips = this._getHeaderChips();
        if (!chips.length) return [];
        const displays = [];
        chips.forEach((chip, index)=>{
            const action = (0, $ee1328194d522913$export$e217e69099d082f5)(chip.tap_action) ? chip.tap_action : undefined;
            const icon = typeof chip.icon === "string" ? chip.icon.trim() : undefined;
            if (chip.type === "template") {
                const templateString = chip.template?.trim() ?? "";
                if (!templateString) return;
                const templateValue = this._templateChipValues[index];
                const display = templateValue?.display ?? $e6159c9afb48cae5$var$MISSING_ATTRIBUTE_TEXT;
                const missing = templateValue?.missing ?? true;
                const tooltip = `Template: ${templateString}`;
                displays.push({
                    label: "Template",
                    display: display,
                    missing: missing,
                    tooltip: tooltip,
                    type: chip.type,
                    action: action,
                    icon: icon
                });
                return;
            }
            const attribute = chip.attribute?.trim() ?? "";
            if (!attribute) return;
            const formatted = this._formatHeaderAttribute(attribute);
            const label = attribute;
            const tooltip = `${attribute}: ${formatted.display}`;
            displays.push({
                label: label,
                display: formatted.display,
                missing: formatted.missing,
                tooltip: tooltip,
                type: chip.type,
                action: action,
                icon: icon
            });
        });
        return displays;
    }
    // Format a single header attribute
    _formatHeaderAttribute(attribute) {
        if (!this._state || !this._hass) return {
            attribute: attribute,
            display: $e6159c9afb48cae5$var$MISSING_ATTRIBUTE_TEXT,
            missing: true
        };
        // Check if attribute exists on the entity
        const hasAttribute = Object.prototype.hasOwnProperty.call(this._state.attributes, attribute);
        if (!hasAttribute) return {
            attribute: attribute,
            display: $e6159c9afb48cae5$var$MISSING_ATTRIBUTE_TEXT,
            missing: true
        };
        const rawValue = this._state.attributes[attribute];
        if (rawValue === undefined || rawValue === null) return {
            attribute: attribute,
            display: $e6159c9afb48cae5$var$MISSING_ATTRIBUTE_TEXT,
            missing: true
        };
        // Try to format the attribute value using Home Assistant's built-in formatter
        const formattedValue = this._hass?.formatEntityAttributeValue?.(this._state, attribute);
        const resolvedValue = formattedValue !== undefined && formattedValue !== null && formattedValue !== "" ? formattedValue : rawValue;
        if (resolvedValue === undefined || resolvedValue === null) return {
            attribute: attribute,
            display: $e6159c9afb48cae5$var$MISSING_ATTRIBUTE_TEXT,
            missing: true
        };
        if (typeof resolvedValue === "string") {
            if (resolvedValue.trim().length === 0) return {
                attribute: attribute,
                display: $e6159c9afb48cae5$var$MISSING_ATTRIBUTE_TEXT,
                missing: true
            };
            return {
                attribute: attribute,
                display: resolvedValue,
                missing: false
            };
        }
        if (typeof resolvedValue === "number" || typeof resolvedValue === "boolean") return {
            attribute: attribute,
            display: String(resolvedValue),
            missing: false
        };
        return {
            attribute: attribute,
            display: JSON.stringify(resolvedValue),
            missing: false
        };
    }
    _calculateMinMaxTemps() {
        let hourlyMin;
        let hourlyMax;
        let dailyMin;
        let dailyMax;
        if (this._forecastHourlyEvent?.forecast?.length) {
            const temps = this._forecastHourlyEvent.forecast.map((item)=>item.temperature).filter((temp)=>typeof temp === "number");
            hourlyMin = temps.length ? Math.min(...temps) : undefined;
            hourlyMax = temps.length ? Math.max(...temps) : undefined;
        }
        if (this._forecastDailyEvent?.forecast?.length) {
            const dailyTemps = this._forecastDailyEvent.forecast.flatMap((item)=>[
                    item.temperature,
                    item.templow
                ].filter((temp)=>typeof temp === "number"));
            dailyMin = dailyTemps.length ? Math.min(...dailyTemps) : undefined;
            dailyMax = dailyTemps.length ? Math.max(...dailyTemps) : undefined;
        }
        this._hourlyMinTemp = hourlyMin;
        this._hourlyMaxTemp = hourlyMax;
        this._dailyMinTemp = dailyMin;
        this._dailyMaxTemp = dailyMax;
    }
    _needsSolarForecast() {
        if (!this._config) return false;
        return this._config.hourly_extra_attribute === $e6159c9afb48cae5$var$SOLAR_FORECAST_ATTRIBUTE || this._config.daily_extra_attribute === $e6159c9afb48cae5$var$SOLAR_FORECAST_ATTRIBUTE;
    }
    _refreshSolarForecastData() {
        if (!this._needsSolarForecast()) {
            if (Object.keys(this._solarForecastByHour).length || Object.keys(this._solarForecastByDay).length) {
                this._solarForecastByHour = {};
                this._solarForecastByDay = {};
            }
            return;
        }
        if (!this._hass?.callWS) return;
        const requestId = ++this._solarForecastRequestId;
        this._loadSolarForecastData(requestId);
    }
    async _loadSolarForecastData(requestId) {
        try {
            const prefs = await this._hass.callWS({
                type: "energy/get_prefs"
            });
            if (requestId !== this._solarForecastRequestId) return;
            const availableEntries = this._extractSolarForecastEntries(prefs);
            const selectedEntries = this._selectSolarForecastEntries(availableEntries);
            if (!selectedEntries.length) {
                this._solarForecastByHour = {};
                this._solarForecastByDay = {};
                return;
            }
            const forecasts = await this._hass.callWS({
                type: "energy/solar_forecast"
            });
            if (requestId !== this._solarForecastRequestId) return;
            const { hourly: hourly , daily: daily  } = this._buildSolarForecastMaps(forecasts, selectedEntries);
            this._solarForecastByHour = hourly;
            this._solarForecastByDay = daily;
        } catch (_err) {
            this._solarForecastByHour = {};
            this._solarForecastByDay = {};
        }
    }
    _extractSolarForecastEntries(prefs) {
        const energySources = prefs?.energy_sources ?? [];
        const entries = new Set();
        energySources.forEach((source)=>{
            if (source?.type !== "solar") return;
            const configured = source.config_entry_solar_forecast;
            if (!Array.isArray(configured)) return;
            configured.forEach((entryId)=>{
                if (typeof entryId === "string" && entryId.trim().length) entries.add(entryId);
            });
        });
        return Array.from(entries);
    }
    _selectSolarForecastEntries(availableEntries) {
        if (!this._config) return [];
        if (this._config.solar_forecast_entries) {
            if (!this._config.solar_forecast_entries.length) return [];
            const selected = new Set(this._config.solar_forecast_entries);
            return availableEntries.filter((entryId)=>selected.has(entryId));
        }
        return availableEntries;
    }
    _buildSolarForecastMaps(forecasts, selectedEntries) {
        const hourly = {};
        const daily = {};
        selectedEntries.forEach((entryId)=>{
            const data = forecasts?.[entryId];
            const whHours = data?.wh_hours ?? {};
            Object.entries(whHours).forEach(([timestamp, rawValue])=>{
                const valueWh = typeof rawValue === "number" ? rawValue : Number(rawValue);
                if (!Number.isFinite(valueWh)) return;
                const date = new Date(timestamp);
                if (!Number.isFinite(date.getTime())) return;
                const valueKwh = valueWh / 1000;
                const hourKey = this._formatSolarHourKey(date);
                const dayKey = this._formatSolarDayKey(date);
                hourly[hourKey] = (hourly[hourKey] ?? 0) + valueKwh;
                daily[dayKey] = (daily[dayKey] ?? 0) + valueKwh;
            });
        });
        return {
            hourly: hourly,
            daily: daily
        };
    }
    _applySolarForecastToForecast(forecast, type) {
        const source = type === "hourly" ? this._solarForecastByHour : this._solarForecastByDay;
        if (!forecast?.length || !Object.keys(source).length) return forecast;
        return forecast.map((item)=>{
            if (!item?.datetime) return item;
            const date = new Date(item.datetime);
            if (!Number.isFinite(date.getTime())) return item;
            const key = type === "hourly" ? this._formatSolarHourKey(date) : this._formatSolarDayKey(date);
            const value = source[key];
            if (value === undefined) return item;
            return {
                ...item,
                solar_forecast: value
            };
        });
    }
    _resetNowcastState() {
        this._nowcastRequestId += 1;
        this._nowcastEntityId = undefined;
        this._nowcastServiceDomain = undefined;
        this._nowcastLastUpdated = undefined;
        this._nowcastForecast = [];
        this._nowcastHasRain = false;
        this._headerPageIndex = 0;
        this._clearNowcastRefreshTimer();
    }
    _clearNowcastForecast() {
        if (this._nowcastForecast.length || this._nowcastHasRain) {
            this._nowcastForecast = [];
            this._nowcastHasRain = false;
        }
    }
    _refreshNowcastData() {
        if (!this._isNowcastEnabled() || !this._hass?.callWS) {
            this._clearNowcastForecast();
            return;
        }
        const entityId = this._config?.nowcast_entity;
        if (!entityId) {
            this._clearNowcastForecast();
            return;
        }
        const requestId = ++this._nowcastRequestId;
        this._loadNowcastData(requestId, entityId);
    }
    async _loadNowcastData(requestId, entityId) {
        try {
            const serviceDomain = await this._resolveNowcastServiceDomain(entityId, requestId);
            if (!serviceDomain || requestId !== this._nowcastRequestId) {
                this._clearNowcastForecast();
                return;
            }
            const response = await this._hass.callWS({
                type: "call_service",
                domain: serviceDomain,
                service: $e6159c9afb48cae5$var$NOWCAST_SERVICE_NAME,
                target: {
                    entity_id: entityId
                },
                return_response: true
            });
            if (requestId !== this._nowcastRequestId) return;
            const forecast = this._extractNowcastForecast(response, entityId);
            this._setNowcastForecast(forecast);
        } catch (_err) {
            this._clearNowcastForecast();
        }
    }
    async _resolveNowcastServiceDomain(entityId, requestId) {
        if (this._nowcastEntityId === entityId && this._nowcastServiceDomain) return this._nowcastServiceDomain;
        try {
            const entry = await this._hass.callWS({
                type: "config/entity_registry/get",
                entity_id: entityId
            });
            if (requestId !== this._nowcastRequestId) return undefined;
            const platform = entry?.platform;
            this._nowcastEntityId = entityId;
            this._nowcastServiceDomain = typeof platform === "string" && platform.trim().length ? platform : undefined;
            return this._nowcastServiceDomain;
        } catch (_err) {
            this._nowcastEntityId = entityId;
            this._nowcastServiceDomain = undefined;
            return undefined;
        }
    }
    _extractNowcastForecast(response, entityId) {
        const items = [];
        const entries = response?.response?.[entityId]?.forecast;
        if (!Array.isArray(entries)) return items;
        entries.forEach((entry)=>{
            const datetime = typeof entry?.datetime === "string" ? entry.datetime : undefined;
            if (!datetime) return;
            const timestamp = new Date(datetime).getTime();
            if (!Number.isFinite(timestamp)) return;
            const rawValue = entry?.precipitation;
            const precipitation = typeof rawValue === "number" ? rawValue : Number(rawValue);
            if (!Number.isFinite(precipitation)) return;
            items.push({
                datetime: datetime,
                precipitation: Math.max(0, precipitation)
            });
        });
        return items.sort((a, b)=>new Date(a.datetime).getTime() - new Date(b.datetime).getTime());
    }
    _setNowcastForecast(forecast) {
        const hasRain = forecast.some((item)=>item.precipitation > 0);
        const hadRain = this._nowcastHasRain;
        this._nowcastForecast = forecast;
        this._nowcastHasRain = hasRain;
        if (!hadRain && hasRain && this._headerPageIndex === 0 && this._isNowcastPagerEnabled()) this._headerPageIndex = 1;
    }
    _handleNowcastHassUpdate() {
        if (!this._isNowcastEnabled() || !this._hass) return;
        const entityId = this._config?.nowcast_entity;
        if (!entityId) return;
        const state = this._hass.states[entityId];
        if (!state) {
            this._clearNowcastForecast();
            return;
        }
        const lastUpdated = state.last_updated ?? state.last_changed;
        if (!lastUpdated || lastUpdated === this._nowcastLastUpdated) return;
        this._nowcastLastUpdated = lastUpdated;
        this._refreshNowcastData();
    }
    _isNowcastEnabled() {
        return Boolean(this._config?.nowcast_entity);
    }
    _isNowcastPagerEnabled() {
        return this._isNowcastEnabled() && (this._config?.nowcast_layout ?? "pager") === "pager";
    }
    _setupNowcastRefreshTimer() {
        if (!this._isNowcastEnabled() || !this._hass) {
            this._clearNowcastRefreshTimer();
            return;
        }
        this._clearNowcastRefreshTimer();
        const now = Date.now();
        const nextMinuteDelay = 60000 - now % 60000;
        this._nowcastRefreshTimeout = window.setTimeout(()=>{
            this._refreshNowcastData();
            this._nowcastRefreshInterval = window.setInterval(()=>{
                this._refreshNowcastData();
            }, 60000);
        }, nextMinuteDelay);
    }
    _clearNowcastRefreshTimer() {
        if (this._nowcastRefreshTimeout !== undefined) {
            window.clearTimeout(this._nowcastRefreshTimeout);
            this._nowcastRefreshTimeout = undefined;
        }
        if (this._nowcastRefreshInterval !== undefined) {
            window.clearInterval(this._nowcastRefreshInterval);
            this._nowcastRefreshInterval = undefined;
        }
    }
    _formatSolarHourKey(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hour = String(date.getHours()).padStart(2, "0");
        return `${year}-${month}-${day}T${hour}`;
    }
    _formatSolarDayKey(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }
    _getLocationCoordinates() {
        if (!this._config) {
            this._sunCoordinateCacheKey = undefined;
            this._sunCoordinateCache = undefined;
            return undefined;
        }
        const useHome = this._config.sun_use_home_coordinates ?? true;
        const latitude = useHome ? this._parseCoordinate(this._hass?.config?.latitude, -90, 90) : this._parseCoordinate(this._config.sun_latitude, -90, 90);
        const longitude = useHome ? this._parseCoordinate(this._hass?.config?.longitude, -180, 180) : this._parseCoordinate(this._config.sun_longitude, -180, 180);
        if (latitude === undefined || longitude === undefined) {
            this._sunCoordinateCacheKey = undefined;
            this._sunCoordinateCache = undefined;
            return undefined;
        }
        const key = `${latitude},${longitude}`;
        if (this._sunCoordinateCacheKey === key && this._sunCoordinateCache) return this._sunCoordinateCache;
        const coords = {
            latitude: latitude,
            longitude: longitude
        };
        this._sunCoordinateCacheKey = key;
        this._sunCoordinateCache = coords;
        return coords;
    }
    _parseCoordinate(value, min, max) {
        if (value === undefined || value === null) return undefined;
        const numericValue = typeof value === "number" ? value : parseFloat(value);
        if (!Number.isFinite(numericValue)) return undefined;
        if (numericValue < min || numericValue > max) return undefined;
        return numericValue;
    }
    _getWeatherBgImage(state) {
        const variants = (0, $04b2058bf019e2da$export$d0bd520bd5ddb657)[state.replace(/-/g, "")];
        const useNightBackgrounds = this._config?.use_night_header_backgrounds !== false;
        const isDaytime = useNightBackgrounds ? this._isDaytimeNow() : true;
        const fallback = useNightBackgrounds && !isDaytime ? (0, $04b2058bf019e2da$export$80688e1fcf715020).night : (0, $04b2058bf019e2da$export$80688e1fcf715020).day;
        if (!variants) return fallback;
        if (!useNightBackgrounds) return variants.day;
        return isDaytime ? variants.day : variants.night;
    }
    _shouldUseSnowNowcastFill() {
        const condition = this._state?.state;
        return condition === "snowy" || condition === "snowy-rainy";
    }
    _isDaytimeNow() {
        const attributeValue = this._state?.attributes?.is_daytime;
        if (typeof attributeValue === "boolean") return attributeValue;
        const coordinates = this._getLocationCoordinates();
        if (!coordinates) return true;
        const now = new Date();
        const times = (0, (/*@__PURE__*/$parcel$interopDefault($6f99bd4ef956c48f$exports))).getTimes(now, coordinates.latitude, coordinates.longitude);
        const sunrise = times.sunrise?.getTime();
        const sunset = times.sunset?.getTime();
        if (typeof sunrise !== "number" || Number.isNaN(sunrise) || typeof sunset !== "number" || Number.isNaN(sunset)) return true;
        const nowTime = now.getTime();
        if (sunrise <= sunset) return nowTime >= sunrise && nowTime < sunset;
        return nowTime >= sunrise || nowTime < sunset;
    }
    _updateGap() {
        const container = this.shadowRoot.querySelector("ha-card");
        const daily = this.shadowRoot.querySelector(".forecast.daily");
        const hourly = this.shadowRoot.querySelector(".forecast.hourly");
        if (!container || !daily && !hourly) return;
        const containerWidth = container.clientWidth;
        if (containerWidth === this._oldContainerWidth) return;
        const computeGap = (elem)=>{
            if (!elem) return undefined;
            const styles = getComputedStyle(elem);
            const itemWidth = parseInt(styles.getPropertyValue("--icon-container-width"));
            const minGap = parseInt(styles.getPropertyValue("--min-gap"));
            if (Number.isNaN(itemWidth) || Number.isNaN(minGap)) return undefined;
            const padding = 16;
            const maxItems = Math.floor((containerWidth + minGap - 2 * padding) / (itemWidth + minGap));
            if (maxItems < 2) return undefined;
            const totalItemWidth = maxItems * itemWidth;
            return Math.round((containerWidth - 2 * padding - totalItemWidth) / (maxItems - 1));
        };
        const dailyGap = computeGap(daily);
        if (dailyGap !== undefined && dailyGap !== this._dailyGap) this._dailyGap = dailyGap;
        else if (dailyGap === undefined && this._dailyGap !== undefined) this._dailyGap = undefined;
        const hourlyGap = computeGap(hourly);
        if (hourlyGap !== undefined && hourlyGap !== this._hourlyGap) this._hourlyGap = hourlyGap;
        else if (hourlyGap === undefined && this._hourlyGap !== undefined) this._hourlyGap = undefined;
        this._oldContainerWidth = containerWidth;
    }
    _teardownDragScroll(type) {
        if (this._momentumCleanup[type]) {
            this._momentumCleanup[type]();
            delete this._momentumCleanup[type];
            delete this._momentumElement[type];
        }
    }
    _initDragScroll(type, container) {
        if (this._momentumElement[type] === container) return;
        this._teardownDragScroll(type);
        this._momentumElement[type] = container;
        this._momentumCleanup[type] = (0, $aefd8b71d9c18f54$export$81657173a9670ea5)(container, {
            snapSelector: ".forecast-item"
        });
    }
    _handleDailySelected(ev) {
        const datetime = ev.detail?.datetime;
        if (!datetime || !this._forecastHourlyEvent?.forecast?.length) return;
        const targetDate = new Date(datetime);
        const targetDay = targetDate.getDate();
        const targetMonth = targetDate.getMonth();
        const targetYear = targetDate.getFullYear();
        const hourlyForecast = this._forecastHourlyEvent.forecast;
        const targetIndex = hourlyForecast.findIndex((entry)=>{
            const entryDate = new Date(entry.datetime);
            return entryDate.getDate() === targetDay && entryDate.getMonth() === targetMonth && entryDate.getFullYear() === targetYear;
        });
        const hourlyContainer = this.shadowRoot?.querySelector(".forecast.hourly");
        if (!hourlyContainer) return;
        if (targetIndex <= 0) {
            hourlyContainer.scrollTo({
                left: 0,
                behavior: "smooth"
            });
            return;
        }
        const hourlyItems = Array.from(hourlyContainer.querySelectorAll(".forecast-item"));
        const targetItem = hourlyItems[targetIndex];
        if (!targetItem) return;
        const containerRect = hourlyContainer.getBoundingClientRect();
        const itemRect = targetItem.getBoundingClientRect();
        const offset = itemRect.left - containerRect.left + hourlyContainer.scrollLeft - 16; // account for padding
        hourlyContainer.scrollTo({
            left: Math.max(0, offset),
            behavior: "smooth"
        });
    }
    _setHeaderPage(index) {
        const clamped = index <= 0 ? 0 : 1;
        if (clamped === this._headerPageIndex) return;
        this._headerPageIndex = clamped;
    }
    _handleHeaderPagerPointerDown(event) {
        if (!this._isNowcastPagerEnabled()) return;
        this._headerSwipePointerId = event.pointerId;
        this._headerSwipeStartX = event.clientX;
        const target = event.currentTarget;
        if (target?.setPointerCapture) target.setPointerCapture(event.pointerId);
    }
    _handleHeaderPagerPointerUp(event) {
        if (event.pointerId !== this._headerSwipePointerId) return;
        const startX = this._headerSwipeStartX;
        const deltaX = startX !== undefined ? event.clientX - startX : 0;
        const threshold = 32;
        if (Math.abs(deltaX) >= threshold) this._setHeaderPage(deltaX < 0 ? 1 : 0);
        const target = event.currentTarget;
        if (target?.releasePointerCapture) target.releasePointerCapture(event.pointerId);
        this._headerSwipePointerId = undefined;
        this._headerSwipeStartX = undefined;
    }
    _handleHeaderPagerPointerCancel(event) {
        if (event.pointerId !== this._headerSwipePointerId) return;
        const target = event.currentTarget;
        if (target?.releasePointerCapture) target.releasePointerCapture(event.pointerId);
        this._headerSwipePointerId = undefined;
        this._headerSwipeStartX = undefined;
    }
    _handleHeaderTap(actionConfig, entity) {
        this._executeTapAction(actionConfig, entity);
    }
    _handleHeaderKeydown(event, actionConfig, entity) {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        this._handleHeaderTap(actionConfig, entity);
    }
    _handleHeaderChipTap(actionConfig) {
        this._executeTapAction(actionConfig);
    }
    _handleHeaderChipKeydown(event, actionConfig) {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        this._handleHeaderChipTap(actionConfig);
    }
    _executeTapAction(actionConfig, entityOverride) {
        if (!this._hass || !this._config || !actionConfig || !(0, $ee1328194d522913$export$e217e69099d082f5)(actionConfig)) return;
        const actionType = actionConfig.action;
        const performAction = actionConfig.perform_action;
        if (actionType === "perform-action" && performAction) {
            const [domain, service] = performAction.split(".", 2);
            if (domain && service) {
                const data = actionConfig.data ?? actionConfig.service_data;
                const target = actionConfig.target;
                this._hass.callService(domain, service, data, target);
                return;
            }
        }
        (0, $ee1328194d522913$export$6c6c3f4b7541eaf1)(this, this._hass, {
            entity: entityOverride || this._entity,
            tap_action: actionConfig
        }, "tap");
    }
    constructor(...args){
        super(...args);
        this._templateChipValues = {};
        this._solarForecastByHour = {};
        this._solarForecastByDay = {};
        this._nowcastForecast = [];
        this._nowcastHasRain = false;
        this._headerPageIndex = 0;
        // private property
        this._subscriptions = {
            hourly: undefined,
            daily: undefined
        };
        this._templateSubscriptions = [];
        this._momentumCleanup = {};
        this._momentumElement = {};
        this._solarForecastRequestId = 0;
        this._nowcastRequestId = 0;
    }
}
(0, $39J5i.__decorate)([
    (0, $pklEb.state)()
], $e6159c9afb48cae5$export$53427b5d95bebd88.prototype, "_config", void 0);
(0, $39J5i.__decorate)([
    (0, $pklEb.state)()
], $e6159c9afb48cae5$export$53427b5d95bebd88.prototype, "_header", void 0);
(0, $39J5i.__decorate)([
    (0, $pklEb.state)()
], $e6159c9afb48cae5$export$53427b5d95bebd88.prototype, "_entity", void 0);
(0, $39J5i.__decorate)([
    (0, $pklEb.state)()
], $e6159c9afb48cae5$export$53427b5d95bebd88.prototype, "_name", void 0);
(0, $39J5i.__decorate)([
    (0, $pklEb.state)()
], $e6159c9afb48cae5$export$53427b5d95bebd88.prototype, "_state", void 0);
(0, $39J5i.__decorate)([
    (0, $pklEb.state)()
], $e6159c9afb48cae5$export$53427b5d95bebd88.prototype, "_status", void 0);
(0, $39J5i.__decorate)([
    (0, $pklEb.state)()
], $e6159c9afb48cae5$export$53427b5d95bebd88.prototype, "_headerTemperatureState", void 0);
(0, $39J5i.__decorate)([
    (0, $pklEb.state)()
], $e6159c9afb48cae5$export$53427b5d95bebd88.prototype, "_forecastDailyEvent", void 0);
(0, $39J5i.__decorate)([
    (0, $pklEb.state)()
], $e6159c9afb48cae5$export$53427b5d95bebd88.prototype, "_forecastHourlyEvent", void 0);
(0, $39J5i.__decorate)([
    (0, $pklEb.state)()
], $e6159c9afb48cae5$export$53427b5d95bebd88.prototype, "_dailyGap", void 0);
(0, $39J5i.__decorate)([
    (0, $pklEb.state)()
], $e6159c9afb48cae5$export$53427b5d95bebd88.prototype, "_hourlyGap", void 0);
(0, $39J5i.__decorate)([
    (0, $pklEb.state)()
], $e6159c9afb48cae5$export$53427b5d95bebd88.prototype, "_templateChipValues", void 0);
(0, $39J5i.__decorate)([
    (0, $pklEb.state)()
], $e6159c9afb48cae5$export$53427b5d95bebd88.prototype, "_solarForecastByHour", void 0);
(0, $39J5i.__decorate)([
    (0, $pklEb.state)()
], $e6159c9afb48cae5$export$53427b5d95bebd88.prototype, "_solarForecastByDay", void 0);
(0, $39J5i.__decorate)([
    (0, $pklEb.state)()
], $e6159c9afb48cae5$export$53427b5d95bebd88.prototype, "_nowcastForecast", void 0);
(0, $39J5i.__decorate)([
    (0, $pklEb.state)()
], $e6159c9afb48cae5$export$53427b5d95bebd88.prototype, "_nowcastHasRain", void 0);
(0, $39J5i.__decorate)([
    (0, $pklEb.state)()
], $e6159c9afb48cae5$export$53427b5d95bebd88.prototype, "_headerPageIndex", void 0);


customElements.define("weather-forecast-extended-card", (0, $e6159c9afb48cae5$export$53427b5d95bebd88));
window.customCards = window.customCards || [];
window.customCards.push({
    type: "weather-forecast-extended-card",
    name: "Weather Forecast Extended",
    description: "Weather forecast similar to the default HA card, but with some additional information"
});


//# sourceMappingURL=weatherforecastextended.js.map
