(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // node_modules/.pnpm/fast-printf@1.6.10/node_modules/fast-printf/dist/src/boolean.js
  var require_boolean = __commonJS({
    "node_modules/.pnpm/fast-printf@1.6.10/node_modules/fast-printf/dist/src/boolean.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.boolean = void 0;
      var boolean = /* @__PURE__ */ __name(function(value) {
        switch (Object.prototype.toString.call(value)) {
          case "[object String]":
            return ["true", "t", "yes", "y", "on", "1"].includes(value.trim().toLowerCase());
          case "[object Number]":
            return value.valueOf() === 1;
          case "[object Boolean]":
            return value.valueOf();
          default:
            return false;
        }
      }, "boolean");
      exports2.boolean = boolean;
    }
  });

  // node_modules/.pnpm/fast-printf@1.6.10/node_modules/fast-printf/dist/src/tokenize.js
  var require_tokenize = __commonJS({
    "node_modules/.pnpm/fast-printf@1.6.10/node_modules/fast-printf/dist/src/tokenize.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.tokenize = void 0;
      var TokenRule = /(?:%(?<flag>([+0-]|-\+))?(?<width>\d+)?(?<position>\d+\$)?(?<precision>\.\d+)?(?<conversion>[%BCESb-iosux]))|(\\%)/g;
      var tokenize = /* @__PURE__ */ __name((subject) => {
        let matchResult;
        const tokens = [];
        let argumentIndex = 0;
        let lastIndex = 0;
        let lastToken = null;
        while ((matchResult = TokenRule.exec(subject)) !== null) {
          if (matchResult.index > lastIndex) {
            lastToken = {
              literal: subject.slice(lastIndex, matchResult.index),
              type: "literal"
            };
            tokens.push(lastToken);
          }
          const match = matchResult[0];
          lastIndex = matchResult.index + match.length;
          if (match === "\\%" || match === "%%") {
            if (lastToken && lastToken.type === "literal") {
              lastToken.literal += "%";
            } else {
              lastToken = {
                literal: "%",
                type: "literal"
              };
              tokens.push(lastToken);
            }
          } else if (matchResult.groups) {
            lastToken = {
              conversion: matchResult.groups.conversion,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any -- intentional per @gajus
              flag: matchResult.groups.flag || null,
              placeholder: match,
              position: matchResult.groups.position ? Number.parseInt(matchResult.groups.position, 10) - 1 : argumentIndex++,
              precision: matchResult.groups.precision ? Number.parseInt(matchResult.groups.precision.slice(1), 10) : null,
              type: "placeholder",
              width: matchResult.groups.width ? Number.parseInt(matchResult.groups.width, 10) : null
            };
            tokens.push(lastToken);
          }
        }
        if (lastIndex <= subject.length - 1) {
          if (lastToken && lastToken.type === "literal") {
            lastToken.literal += subject.slice(lastIndex);
          } else {
            tokens.push({
              literal: subject.slice(lastIndex),
              type: "literal"
            });
          }
        }
        return tokens;
      }, "tokenize");
      exports2.tokenize = tokenize;
    }
  });

  // node_modules/.pnpm/fast-printf@1.6.10/node_modules/fast-printf/dist/src/createPrintf.js
  var require_createPrintf = __commonJS({
    "node_modules/.pnpm/fast-printf@1.6.10/node_modules/fast-printf/dist/src/createPrintf.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.createPrintf = void 0;
      var boolean_1 = require_boolean();
      var tokenize_1 = require_tokenize();
      var formatDefaultUnboundExpression = /* @__PURE__ */ __name((_subject, token) => {
        return token.placeholder;
      }, "formatDefaultUnboundExpression");
      var createPrintf = /* @__PURE__ */ __name((configuration) => {
        var _a;
        const padValue = /* @__PURE__ */ __name((value, width, flag) => {
          if (flag === "-") {
            return value.padEnd(width, " ");
          } else if (flag === "-+") {
            return ((Number(value) >= 0 ? "+" : "") + value).padEnd(width, " ");
          } else if (flag === "+") {
            return ((Number(value) >= 0 ? "+" : "") + value).padStart(width, " ");
          } else if (flag === "0") {
            return value.padStart(width, "0");
          } else {
            return value.padStart(width, " ");
          }
        }, "padValue");
        const formatUnboundExpression = (_a = configuration === null || configuration === void 0 ? void 0 : configuration.formatUnboundExpression) !== null && _a !== void 0 ? _a : formatDefaultUnboundExpression;
        const cache2 = {};
        return (subject, ...boundValues) => {
          let tokens = cache2[subject];
          if (!tokens) {
            tokens = cache2[subject] = (0, tokenize_1.tokenize)(subject);
          }
          let result = "";
          for (const token of tokens) {
            if (token.type === "literal") {
              result += token.literal;
            } else {
              let boundValue = boundValues[token.position];
              if (boundValue === void 0) {
                result += formatUnboundExpression(subject, token, boundValues);
              } else if (token.conversion === "b") {
                result += (0, boolean_1.boolean)(boundValue) ? "true" : "false";
              } else if (token.conversion === "B") {
                result += (0, boolean_1.boolean)(boundValue) ? "TRUE" : "FALSE";
              } else if (token.conversion === "c") {
                result += boundValue;
              } else if (token.conversion === "C") {
                result += String(boundValue).toUpperCase();
              } else if (token.conversion === "i" || token.conversion === "d") {
                boundValue = String(Math.trunc(boundValue));
                if (token.width !== null) {
                  boundValue = padValue(boundValue, token.width, token.flag);
                }
                result += boundValue;
              } else if (token.conversion === "e") {
                result += Number(boundValue).toExponential();
              } else if (token.conversion === "E") {
                result += Number(boundValue).toExponential().toUpperCase();
              } else if (token.conversion === "f") {
                if (token.precision !== null) {
                  boundValue = Number(boundValue).toFixed(token.precision);
                }
                if (token.width !== null) {
                  boundValue = padValue(String(boundValue), token.width, token.flag);
                }
                result += boundValue;
              } else if (token.conversion === "o") {
                result += (Number.parseInt(String(boundValue), 10) >>> 0).toString(8);
              } else if (token.conversion === "s") {
                if (token.width !== null) {
                  boundValue = padValue(String(boundValue), token.width, token.flag);
                }
                result += boundValue;
              } else if (token.conversion === "S") {
                if (token.width !== null) {
                  boundValue = padValue(String(boundValue), token.width, token.flag);
                }
                result += String(boundValue).toUpperCase();
              } else if (token.conversion === "u") {
                result += Number.parseInt(String(boundValue), 10) >>> 0;
              } else if (token.conversion === "x") {
                boundValue = (Number.parseInt(String(boundValue), 10) >>> 0).toString(16);
                if (token.width !== null) {
                  boundValue = padValue(String(boundValue), token.width, token.flag);
                }
                result += boundValue;
              } else {
                throw new Error("Unknown format specifier.");
              }
            }
          }
          return result;
        };
      }, "createPrintf");
      exports2.createPrintf = createPrintf;
    }
  });

  // node_modules/.pnpm/fast-printf@1.6.10/node_modules/fast-printf/dist/src/printf.js
  var require_printf = __commonJS({
    "node_modules/.pnpm/fast-printf@1.6.10/node_modules/fast-printf/dist/src/printf.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.printf = exports2.createPrintf = void 0;
      var createPrintf_1 = require_createPrintf();
      Object.defineProperty(exports2, "createPrintf", { enumerable: true, get: /* @__PURE__ */ __name(function() {
        return createPrintf_1.createPrintf;
      }, "get") });
      exports2.printf = (0, createPrintf_1.createPrintf)();
    }
  });

  // src/common/resource.ts
  var IsBrowser = typeof window === "undefined" ? 0 : typeof window.GetParentResourceName !== "undefined" ? 1 : 2;
  var ResourceContext = IsBrowser ? "web" : IsDuplicityVersion() ? "server" : "client";
  var ResourceName = IsBrowser ? IsBrowser === 1 ? window.GetParentResourceName() : "nui-frame-app" : GetCurrentResourceName();

  // src/common/utils.ts
  function LoadFile(path) {
    return LoadResourceFile(ResourceName, path);
  }
  __name(LoadFile, "LoadFile");
  function LoadJsonFile(path) {
    if (!IsBrowser) return JSON.parse(LoadFile(path));
    const resp = fetch(`/${path}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    });
    return resp.then((response) => response.json());
  }
  __name(LoadJsonFile, "LoadJsonFile");

  // src/common/config.ts
  var config = LoadJsonFile("static/config.json");
  var config_default = config;

  // node_modules/.pnpm/@overextended+ox_lib@3.29.0/node_modules/@overextended/ox_lib/client/resource/index.js
  var resource_exports = {};
  __export(resource_exports, {
    Dui: () => Dui,
    Point: () => Point,
    addRadialItem: () => addRadialItem,
    alertDialog: () => alertDialog,
    cancelProgress: () => cancelProgress,
    cancelSkillCheck: () => cancelSkillCheck,
    closeAlertDialog: () => closeAlertDialog,
    closeInputDialog: () => closeInputDialog,
    defaultNotify: () => defaultNotify,
    disableRadial: () => disableRadial,
    eventTimer: () => eventTimer,
    getCurrentRadialId: () => getCurrentRadialId,
    getOpenContextMenu: () => getOpenContextMenu,
    getOpenMenu: () => getOpenMenu,
    getVehicleProperties: () => getVehicleProperties,
    hideContext: () => hideContext,
    hideMenu: () => hideMenu,
    hideRadial: () => hideRadial,
    hideTextUI: () => hideTextUI,
    inputDialog: () => inputDialog,
    isTextUIOpen: () => isTextUIOpen,
    notify: () => notify,
    onServerCallback: () => onServerCallback,
    progressActive: () => progressActive,
    progressBar: () => progressBar,
    progressCircle: () => progressCircle,
    registerContext: () => registerContext,
    registerMenu: () => registerMenu,
    registerRadial: () => registerRadial,
    removeRadialItem: () => removeRadialItem,
    requestAnimDict: () => requestAnimDict,
    requestAnimSet: () => requestAnimSet,
    requestModel: () => requestModel,
    requestNamedPtfxAsset: () => requestNamedPtfxAsset,
    requestScaleformMovie: () => requestScaleformMovie,
    requestStreamedTextureDict: () => requestStreamedTextureDict,
    requestWeaponAsset: () => requestWeaponAsset,
    setClipboard: () => setClipboard,
    setMenuOptions: () => setMenuOptions,
    setVehicleProperties: () => setVehicleProperties,
    showContext: () => showContext,
    showMenu: () => showMenu,
    showTextUI: () => showTextUI,
    skillCheck: () => skillCheck,
    skillCheckActive: () => skillCheckActive,
    triggerServerCallback: () => triggerServerCallback
  });

  // node_modules/.pnpm/@overextended+ox_lib@3.29.0/node_modules/@overextended/ox_lib/client/resource/interface/alert.js
  var alertDialog = /* @__PURE__ */ __name(async (data, timeout) => await exports.ox_lib.alertDialog(data, timeout), "alertDialog");
  var closeAlertDialog = /* @__PURE__ */ __name((reason) => exports.ox_lib.closeAlertDialog(reason), "closeAlertDialog");

  // node_modules/.pnpm/@overextended+ox_lib@3.29.0/node_modules/@overextended/ox_lib/client/resource/interface/clipboard.js
  var setClipboard = /* @__PURE__ */ __name((value) => exports.ox_lib.setClipboard(value), "setClipboard");

  // node_modules/.pnpm/@overextended+ox_lib@3.29.0/node_modules/@overextended/ox_lib/client/resource/interface/context.js
  var registerContext = /* @__PURE__ */ __name((context) => exports.ox_lib.registerContext(context), "registerContext");
  var showContext = /* @__PURE__ */ __name((id) => exports.ox_lib.showContext(id), "showContext");
  var hideContext = /* @__PURE__ */ __name((onExit) => exports.ox_lib.hideContext(onExit), "hideContext");
  var getOpenContextMenu = /* @__PURE__ */ __name(() => exports.ox_lib.getOpenContextMenu(), "getOpenContextMenu");

  // node_modules/.pnpm/@overextended+ox_lib@3.29.0/node_modules/@overextended/ox_lib/client/resource/interface/input.js
  var inputDialog = /* @__PURE__ */ __name(async (heading, rows, options) => await exports.ox_lib.inputDialog(heading, rows, options), "inputDialog");
  var closeInputDialog = /* @__PURE__ */ __name(() => exports.ox_lib.closeInputDialog(), "closeInputDialog");

  // node_modules/.pnpm/@overextended+ox_lib@3.29.0/node_modules/@overextended/ox_lib/client/resource/interface/menu.js
  var registerMenu = /* @__PURE__ */ __name((data, cb) => exports.ox_lib.registerMenu(data, cb), "registerMenu");
  var showMenu = /* @__PURE__ */ __name((id) => exports.ox_lib.showMenu(id), "showMenu");
  var hideMenu = /* @__PURE__ */ __name((onExit) => exports.ox_lib.hideMenu(onExit), "hideMenu");
  var getOpenMenu = /* @__PURE__ */ __name(() => exports.ox_lib.getOpenMenu(), "getOpenMenu");
  var setMenuOptions = /* @__PURE__ */ __name((id, options, index) => exports.ox_lib.setMenuOptions(id, options, index), "setMenuOptions");

  // node_modules/.pnpm/@overextended+ox_lib@3.29.0/node_modules/@overextended/ox_lib/client/resource/interface/notify.js
  var notify = /* @__PURE__ */ __name((data) => exports.ox_lib.notify(data), "notify");
  var defaultNotify = /* @__PURE__ */ __name((data) => exports.ox_lib.defaultNotify(data), "defaultNotify");

  // node_modules/.pnpm/@overextended+ox_lib@3.29.0/node_modules/@overextended/ox_lib/client/resource/interface/progress.js
  var progressBar = /* @__PURE__ */ __name(async (data) => exports.ox_lib.progressBar(data), "progressBar");
  var progressCircle = /* @__PURE__ */ __name(async (data) => exports.ox_lib.progressCircle(data), "progressCircle");
  var progressActive = /* @__PURE__ */ __name(() => exports.ox_lib.progressActive(), "progressActive");
  var cancelProgress = /* @__PURE__ */ __name(() => exports.ox_lib.cancelProgress(), "cancelProgress");

  // node_modules/.pnpm/@overextended+ox_lib@3.29.0/node_modules/@overextended/ox_lib/client/resource/interface/textui.js
  var showTextUI = /* @__PURE__ */ __name((text, options) => exports.ox_lib.showTextUI(text, options), "showTextUI");
  var hideTextUI = /* @__PURE__ */ __name(() => exports.ox_lib.hideTextUI(), "hideTextUI");
  var isTextUIOpen = /* @__PURE__ */ __name(() => exports.ox_lib.isTextUIOpen(), "isTextUIOpen");

  // node_modules/.pnpm/@overextended+ox_lib@3.29.0/node_modules/@overextended/ox_lib/client/resource/interface/skillcheck.js
  var skillCheck = /* @__PURE__ */ __name((difficulty, inputs) => exports.ox_lib.skillCheck(difficulty), "skillCheck");
  var skillCheckActive = /* @__PURE__ */ __name(() => exports.ox_lib.skillCheckActive(), "skillCheckActive");
  var cancelSkillCheck = /* @__PURE__ */ __name(() => exports.ox_lib.cancelSkillCheck(), "cancelSkillCheck");

  // node_modules/.pnpm/@overextended+ox_lib@3.29.0/node_modules/@overextended/ox_lib/client/resource/interface/radial.js
  var addRadialItem = /* @__PURE__ */ __name((items) => exports.ox_lib.addRadialItem(items), "addRadialItem");
  var removeRadialItem = /* @__PURE__ */ __name((item) => exports.ox_lib.removeRadialItem(item), "removeRadialItem");
  var registerRadial = /* @__PURE__ */ __name((radial) => exports.ox_lib.registerRadial(radial), "registerRadial");
  var getCurrentRadialId = /* @__PURE__ */ __name(() => exports.ox_lib.getCurrentRadialId(), "getCurrentRadialId");
  var hideRadial = /* @__PURE__ */ __name(() => exports.ox_lib.hideRadial(), "hideRadial");
  var disableRadial = /* @__PURE__ */ __name((state) => exports.ox_lib.disableRadial(state), "disableRadial");

  // node_modules/.pnpm/@overextended+ox_lib@3.29.0/node_modules/@overextended/ox_lib/client/resource/streaming/index.js
  function streamingRequest(request, hasLoaded, assetType, asset, timeout = 3e4, ...args) {
    if (hasLoaded(asset))
      return asset;
    request(asset, ...args);
    return waitFor(() => {
      if (hasLoaded(asset))
        return asset;
    }, `failed to load ${assetType} '${asset}' - this may be caused by
- too many loaded assets
- oversized, invalid, or corrupted assets`, timeout);
  }
  __name(streamingRequest, "streamingRequest");
  var requestAnimDict = /* @__PURE__ */ __name((animDict, timeout) => {
    if (!DoesAnimDictExist(animDict))
      throw new Error(`attempted to load invalid animDict '${animDict}'`);
    return streamingRequest(RequestAnimDict, HasAnimDictLoaded, "animDict", animDict, timeout);
  }, "requestAnimDict");
  var requestAnimSet = /* @__PURE__ */ __name((animSet, timeout) => streamingRequest(RequestAnimSet, HasAnimSetLoaded, "animSet", animSet, timeout), "requestAnimSet");
  var requestModel = /* @__PURE__ */ __name((model, timeout) => {
    if (typeof model !== "number")
      model = GetHashKey(model);
    if (!IsModelValid(model))
      throw new Error(`attempted to load invalid model '${model}'`);
    return streamingRequest(RequestModel, HasModelLoaded, "model", model, timeout);
  }, "requestModel");
  var requestNamedPtfxAsset = /* @__PURE__ */ __name((ptFxName, timeout) => streamingRequest(RequestNamedPtfxAsset, HasNamedPtfxAssetLoaded, "ptFxName", ptFxName, timeout), "requestNamedPtfxAsset");
  var requestScaleformMovie = /* @__PURE__ */ __name((scaleformName, timeout) => streamingRequest(RequestScaleformMovie, HasScaleformMovieLoaded, "scaleformMovie", scaleformName, timeout), "requestScaleformMovie");
  var requestStreamedTextureDict = /* @__PURE__ */ __name((textureDict, timeout) => streamingRequest(RequestStreamedTextureDict, HasStreamedTextureDictLoaded, "textureDict", textureDict, timeout), "requestStreamedTextureDict");
  var requestWeaponAsset = /* @__PURE__ */ __name((weaponHash, timeout, weaponResourceFlags = 31, extraWeaponComponentFlags = 0) => streamingRequest(RequestWeaponAsset, HasWeaponAssetLoaded, "weaponHash", weaponHash, timeout, weaponResourceFlags, extraWeaponComponentFlags), "requestWeaponAsset");

  // node_modules/.pnpm/@overextended+ox_lib@3.29.0/node_modules/@overextended/ox_lib/client/resource/vehicleProperties/index.js
  var getVehicleProperties = /* @__PURE__ */ __name((vehicle) => exports.ox_lib.getVehicleProperties(vehicle), "getVehicleProperties");
  var setVehicleProperties = /* @__PURE__ */ __name((vehicle, props, fixVehicle) => exports.ox_lib.setVehicleProperties(vehicle, props, fixVehicle), "setVehicleProperties");

  // node_modules/.pnpm/@overextended+ox_lib@3.29.0/node_modules/@overextended/ox_lib/shared/resource/cache/index.js
  var cacheEvents = {};
  var cache = new Proxy({
    resource: GetCurrentResourceName(),
    game: GetGameName()
  }, {
    get(target, key) {
      const result = key ? target[key] : target;
      if (result !== void 0)
        return result;
      cacheEvents[key] = [];
      AddEventHandler(`ox_lib:cache:${key}`, (value) => {
        const oldValue = target[key];
        const events = cacheEvents[key];
        events.forEach((cb) => cb(value, oldValue));
        target[key] = value;
      });
      target[key] = exports.ox_lib.cache(key) || false;
      return target[key];
    }
  });

  // node_modules/.pnpm/@overextended+ox_lib@3.29.0/node_modules/@overextended/ox_lib/shared/resource/locale/index.js
  var import_fast_printf = __toESM(require_printf());
  var dict = {};
  function flattenDict(source, target, prefix) {
    for (const key in source) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      const value = source[key];
      if (typeof value === "object")
        flattenDict(value, target, fullKey);
      else
        target[fullKey] = String(value);
    }
    return target;
  }
  __name(flattenDict, "flattenDict");
  var locale = /* @__PURE__ */ __name((str, ...args) => {
    const lstr = dict[str];
    if (!lstr)
      return str;
    if (lstr) {
      if (typeof lstr !== "string")
        return lstr;
      if (args.length > 0) {
        return (0, import_fast_printf.printf)(lstr, ...args);
      }
      return lstr;
    }
    return str;
  }, "locale");
  function loadLocale(key) {
    const data = LoadResourceFile(cache.resource, `locales/${key}.json`);
    if (!data)
      console.warn(`could not load 'locales/${key}.json'`);
    return JSON.parse(data) || {};
  }
  __name(loadLocale, "loadLocale");
  var initLocale = /* @__PURE__ */ __name((key) => {
    const lang = key || exports.ox_lib.getLocaleKey();
    let locales = loadLocale("en");
    if (lang !== "en")
      Object.assign(locales, loadLocale(lang));
    const flattened = flattenDict(locales, {});
    for (let [k, v] of Object.entries(flattened)) {
      if (typeof v === "string") {
        const regExp = new RegExp(/\$\{([^}]+)\}/g);
        const matches = v.match(regExp);
        if (matches) {
          for (const match of matches) {
            if (!match)
              break;
            const variable = match.substring(2, match.length - 1);
            let locale2 = flattened[variable];
            if (locale2) {
              v = v.replace(match, locale2);
            }
          }
        }
      }
      dict[k] = v;
    }
  }, "initLocale");
  initLocale();

  // node_modules/.pnpm/@overextended+ox_lib@3.29.0/node_modules/@overextended/ox_lib/shared/index.js
  async function waitFor(cb, errMessage, timeout) {
    let value = await cb();
    if (value !== void 0)
      return value;
    if (timeout || timeout == null) {
      if (typeof timeout !== "number")
        timeout = 1e3;
    }
    const start = GetGameTimer();
    let id;
    const p = new Promise((resolve, reject) => {
      id = setTick(async () => {
        const elapsed = timeout && GetGameTimer() - start;
        if (elapsed && elapsed > timeout) {
          return reject(`${errMessage || "failed to resolve callback"} (waited ${elapsed}ms)`);
        }
        value = await cb();
        if (value !== void 0)
          resolve(value);
      });
    }).finally(() => clearTick(id));
    return p;
  }
  __name(waitFor, "waitFor");

  // node_modules/.pnpm/@overextended+ox_lib@3.29.0/node_modules/@overextended/ox_lib/client/resource/cache/index.js
  cache.playerId = PlayerId();
  cache.serverId = GetPlayerServerId(cache.playerId);

  // node_modules/.pnpm/@overextended+ox_lib@3.29.0/node_modules/@overextended/ox_lib/client/resource/callback/index.js
  var pendingCallbacks = {};
  var callbackTimeout = GetConvarInt("ox:callbackTimeout", 3e5);
  onNet(`__ox_cb_${cache.resource}`, (key, ...args) => {
    const resolve = pendingCallbacks[key];
    delete pendingCallbacks[key];
    return resolve && resolve(...args);
  });
  var eventTimers = {};
  function eventTimer(eventName, delay) {
    if (delay && delay > 0) {
      const currentTime = GetGameTimer();
      if ((eventTimers[eventName] || 0) > currentTime)
        return false;
      eventTimers[eventName] = currentTime + delay;
    }
    return true;
  }
  __name(eventTimer, "eventTimer");
  function triggerServerCallback(eventName, delay, ...args) {
    if (!eventTimer(eventName, delay))
      return;
    let key;
    do {
      key = `${eventName}:${Math.floor(Math.random() * (1e5 + 1))}`;
    } while (pendingCallbacks[key]);
    emitNet(`__ox_cb_${eventName}`, cache.resource, key, ...args);
    return new Promise((resolve, reject) => {
      pendingCallbacks[key] = resolve;
      setTimeout(reject, callbackTimeout, `callback event '${key}' timed out`);
    });
  }
  __name(triggerServerCallback, "triggerServerCallback");
  function onServerCallback(eventName, cb) {
    onNet(`__ox_cb_${eventName}`, async (resource, key, ...args) => {
      let response;
      try {
        response = await cb(...args);
      } catch (e) {
        console.error(`an error occurred while handling callback event ${eventName}`);
        console.log(`^3${e.stack}^0`);
      }
      emitNet(`__ox_cb_${resource}`, key, response);
    });
  }
  __name(onServerCallback, "onServerCallback");

  // node_modules/.pnpm/@nativewrappers+client@1.7.33/node_modules/@nativewrappers/client/lib/utils/Vector3.js
  var _Vector3 = class _Vector3 {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
    static create(v1) {
      if (typeof v1 === "number")
        return new _Vector3(v1, v1, v1);
      return new _Vector3(v1.x, v1.y, v1.z);
    }
    /**
     * Creates a vector from an array of numbers
     * @param primitive An array of numbers (usually returned by a native)
     * @example ```ts
     * const entityPos = Vector3.fromArray(GetEntityCoords(entity))
     * ```
     */
    static fromArray(primitive) {
      return new _Vector3(primitive[0], primitive[1], primitive[2]);
    }
    /**
     * Creates an array of vectors from an array number arrays
     * @param primitives A multi-dimensional array of number arrays
     * @example ```ts
     * const [forward, right, up, position] = Vector3.fromArrays(GetEntityMatrix(entity))
     * ```
     */
    static fromArrays(primitives) {
      return primitives.map((prim) => new _Vector3(prim[0], prim[1], prim[2]));
    }
    static clone(v1) {
      return _Vector3.create(v1);
    }
    static add(v1, v2) {
      if (typeof v2 === "number")
        return new _Vector3(v1.x + v2, v1.y + v2, v1.z + v2);
      return new _Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    }
    static addX(vec, x) {
      return new _Vector3(vec.x + x, vec.y, vec.z);
    }
    static addY(vec, y) {
      return new _Vector3(vec.x, vec.y + y, vec.z);
    }
    static addZ(vec, z) {
      return new _Vector3(vec.x, vec.y, vec.z + z);
    }
    static subtract(v1, v2) {
      if (typeof v2 === "number")
        return new _Vector3(v1.x - v2, v1.y - v2, v1.z - v2);
      return new _Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    }
    static multiply(v1, v2) {
      if (typeof v2 === "number")
        return new _Vector3(v1.x * v2, v1.y * v2, v1.z * v2);
      return new _Vector3(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z);
    }
    static divide(v1, v2) {
      if (typeof v2 === "number")
        return new _Vector3(v1.x / v2, v1.y / v2, v1.z / v2);
      return new _Vector3(v1.x / v2.x, v1.y / v2.y, v1.z / v2.z);
    }
    static dotProduct(v1, v2) {
      return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }
    static crossProduct(v1, v2) {
      const x = v1.y * v2.z - v1.z * v2.y;
      const y = v1.z * v2.x - v1.x * v2.z;
      const z = v1.x * v2.y - v1.y * v2.x;
      return new _Vector3(x, y, z);
    }
    static normalize(v) {
      return _Vector3.divide(v, v.Length);
    }
    clone() {
      return new _Vector3(this.x, this.y, this.z);
    }
    /**
     * The product of the Euclidean magnitudes of this and another Vector3.
     *
     * @param v Vector3 to find Euclidean magnitude between.
     * @returns Euclidean magnitude with another vector.
     */
    distanceSquared(v) {
      const w = this.subtract(v);
      return _Vector3.dotProduct(w, w);
    }
    /**
     * The distance between two Vectors.
     *
     * @param v Vector3 to find distance between.
     * @returns Distance between this and another vector.
     */
    distance(v) {
      return Math.sqrt(this.distanceSquared(v));
    }
    get normalize() {
      return _Vector3.normalize(this);
    }
    crossProduct(v) {
      return _Vector3.crossProduct(this, v);
    }
    dotProduct(v) {
      return _Vector3.dotProduct(this, v);
    }
    add(v) {
      return _Vector3.add(this, v);
    }
    addX(x) {
      return _Vector3.addX(this, x);
    }
    addY(y) {
      return _Vector3.addY(this, y);
    }
    addZ(z) {
      return _Vector3.addZ(this, z);
    }
    subtract(v) {
      return _Vector3.subtract(this, v);
    }
    multiply(v) {
      return _Vector3.multiply(this, v);
    }
    divide(v) {
      return _Vector3.divide(this, v);
    }
    toArray() {
      return [this.x, this.y, this.z];
    }
    replace(v) {
      this.x = v.x;
      this.y = v.y;
      this.z = v.z;
    }
    get Length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
  };
  __name(_Vector3, "Vector3");
  var Vector3 = _Vector3;
  Vector3.Zero = new Vector3(0, 0, 0);

  // node_modules/.pnpm/@overextended+ox_lib@3.29.0/node_modules/@overextended/ox_lib/client/resource/points/index.js
  var points = [];
  var nearbyPoints = [];
  var nearbyCount = 0;
  var closestPoint;
  var tick;
  var pointsInterval;
  var _Point = class _Point {
    constructor(point) {
      __publicField(this, "id", 0);
      __publicField(this, "coords");
      __publicField(this, "distance", 0);
      __publicField(this, "onEnter");
      __publicField(this, "onExit");
      __publicField(this, "nearby");
      __publicField(this, "args");
      __publicField(this, "inside", false);
      __publicField(this, "currentDistance");
      __publicField(this, "isClosest", false);
      __publicField(this, "remove", /* @__PURE__ */ __name(() => {
        const coords = Vector3.fromArray(GetEntityCoords(cache.ped, false));
        const distance = coords.distance(this.coords);
        if (distance < this.distance) {
          nearbyCount -= 1;
          nearbyPoints = nearbyPoints.filter((point) => point.id !== this.id);
          if (nearbyCount === 0 && tick) {
            clearTick(tick);
            tick = void 0;
          }
        }
        points = points.filter((point) => point.id !== this.id);
        if (points.length === 0) {
          clearInterval(pointsInterval);
        }
      }, "remove"));
      this.id = points.length + 1;
      this.coords = Vector3.fromArray(point.coords);
      this.distance = point.distance;
      this.onEnter = point.onEnter;
      this.onExit = point.onExit;
      this.nearby = point.nearby;
      this.args = point.args;
      points.push(this);
      if (points.length === 1) {
        startPointsInterval();
      }
    }
  };
  __name(_Point, "Point");
  var Point = _Point;
  var startPointsInterval = /* @__PURE__ */ __name(() => {
    pointsInterval = setInterval(() => {
      if (points.length < 1)
        return;
      if (nearbyCount !== 0) {
        nearbyPoints = [];
        nearbyCount = 0;
      }
      const coords = Vector3.fromArray(GetEntityCoords(cache.ped, false));
      if (closestPoint && coords.distance(closestPoint.coords) > closestPoint.distance) {
        closestPoint = void 0;
      }
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const distance = coords.distance(point.coords);
        if (distance <= point.distance) {
          point.currentDistance = distance;
          if (closestPoint && closestPoint.currentDistance) {
            if (distance < closestPoint.currentDistance) {
              closestPoint.isClosest = false;
              point.isClosest = true;
              closestPoint = point;
            }
          } else if (distance < point.distance) {
            point.isClosest = true;
            closestPoint = point;
          }
          if (point.nearby) {
            nearbyCount++;
            nearbyPoints[nearbyCount - 1] = point;
          }
          if (point.onEnter && !point.inside) {
            point.inside = true;
            point.onEnter();
          }
        } else if (point.currentDistance) {
          if (point.onExit)
            point.onExit();
          point.inside = false;
          point.currentDistance = void 0;
        }
      }
      if (!tick) {
        if (nearbyCount !== 0) {
          tick = setTick(() => {
            for (let i = 0; i < nearbyCount; i++) {
              const point = nearbyPoints[i];
              if (point && point.nearby) {
                point.nearby();
              }
            }
          });
        }
      } else if (nearbyCount === 0) {
        clearTick(tick);
        tick = void 0;
      }
    }, 300);
  }, "startPointsInterval");

  // node_modules/.pnpm/@overextended+ox_lib@3.29.0/node_modules/@overextended/ox_lib/client/resource/dui/index.js
  var duis = {};
  var currentId = 0;
  var _Dui = class _Dui {
    constructor(data) {
      __publicField(this, "id", "");
      __publicField(this, "debug", false);
      __publicField(this, "url", "");
      __publicField(this, "duiObject", 0);
      __publicField(this, "duiHandle", "");
      __publicField(this, "runtimeTxd", 0);
      __publicField(this, "txdObject", 0);
      __publicField(this, "dictName", "");
      __publicField(this, "txtName", "");
      const time = GetGameTimer();
      const id = `${cache.resource}_${time}_${currentId}`;
      currentId++;
      this.id = id;
      this.debug = data.debug || false;
      this.url = data.url;
      this.dictName = `ox_lib_dui_dict_${id}`;
      this.txtName = `ox_lib_dui_txt_${id}`;
      this.duiObject = CreateDui(data.url, data.width, data.height);
      this.duiHandle = GetDuiHandle(this.duiObject);
      this.runtimeTxd = CreateRuntimeTxd(this.dictName);
      this.txdObject = CreateRuntimeTextureFromDuiHandle(this.runtimeTxd, this.txtName, this.duiHandle);
      duis[id] = this;
      if (this.debug)
        console.log(`Dui ${this.id} created`);
    }
    remove() {
      SetDuiUrl(this.duiObject, "about:blank");
      DestroyDui(this.duiObject);
      delete duis[this.id];
      if (this.debug)
        console.log(`Dui ${this.id} removed`);
    }
    setUrl(url) {
      this.url = url;
      SetDuiUrl(this.duiObject, url);
      if (this.debug)
        console.log(`Dui ${this.id} url set to ${url}`);
    }
    sendMessage(data) {
      SendDuiMessage(this.duiObject, JSON.stringify(data));
      if (this.debug)
        console.log(`Dui ${this.id} message sent with data :`, data);
    }
  };
  __name(_Dui, "Dui");
  var Dui = _Dui;
  on("onResourceStop", (resourceName) => {
    if (cache.resource !== resourceName)
      return;
    for (const dui in duis) {
      duis[dui].remove();
    }
  });

  // node_modules/.pnpm/@overextended+ox_lib@3.29.0/node_modules/@overextended/ox_lib/client/index.js
  var client_default = resource_exports;

  // src/common/locale.ts
  function Locale(str, ...args) {
    return locale(str, ...args);
  }
  __name(Locale, "Locale");
  var locale_default = Locale;

  // src/client/index.ts
  var currentPlayers = [];
  RegisterCommand(config_default.command || "score", async () => {
    await updatePlayerList();
    client_default.showMenu("scoreboard");
  }, false);
  RegisterKeyMapping(config_default.command || "score", "Open Scoreboard", "keyboard", config_default.keybind || "U");
  client_default.registerMenu({
    id: "scoreboard",
    title: locale_default("scoreboard.title"),
    position: "top-right",
    options: []
  }, (selected, scrollIndex) => {
    const playerIndex = selected - 1;
    if (currentPlayers[playerIndex]) {
      showPlayerIdentifiers(currentPlayers[playerIndex].id);
    }
  });
  client_default.registerMenu({
    id: "playerIdentifiers",
    title: locale_default("scoreboard.player_info"),
    position: "top-right",
    options: []
  }, (selected, scrollIndex, args) => {
    if (selected >= 4) {
      let identifierValue = "";
      if (selected === 4) {
        identifierValue = args.steam;
      } else if (selected === 5) {
        identifierValue = args.fivem;
      } else if (selected === 6) {
        identifierValue = args.discord;
      }
      if (identifierValue && identifierValue !== "N/A") {
        client_default.setClipboard(identifierValue);
        let copiedMessage = "";
        if (selected === 4) {
          copiedMessage = locale_default("scoreboard.steam_copied");
        } else if (selected === 5) {
          copiedMessage = locale_default("scoreboard.fivem_copied");
        } else if (selected === 6) {
          copiedMessage = locale_default("scoreboard.discord_copied");
        }
        client_default.notify({
          title: locale_default("scoreboard.copied"),
          description: copiedMessage,
          type: "success",
          duration: 2e3
        });
      } else {
        let notAvailableMessage = "";
        if (selected === 4) {
          notAvailableMessage = locale_default("scoreboard.steam_not_available");
        } else if (selected === 5) {
          notAvailableMessage = locale_default("scoreboard.fivem_not_available");
        } else if (selected === 6) {
          notAvailableMessage = locale_default("scoreboard.discord_not_available");
        }
        client_default.notify({
          title: locale_default("scoreboard.no_data"),
          description: notAvailableMessage,
          type: "error",
          duration: 2e3
        });
      }
    }
  });
  var updatePlayerList = /* @__PURE__ */ __name(async () => {
    const players = await triggerServerCallback("scoreboard:getPlayers", null);
    if (players && Array.isArray(players)) {
      currentPlayers = players;
      const playerMenuOptions = players.map((player) => ({
        label: `[${player.id}] ${player.name}`,
        icon: "user",
        description: `${locale_default("scoreboard.server_id")}: ${player.id}`
      }));
      client_default.setMenuOptions("scoreboard", playerMenuOptions);
    }
  }, "updatePlayerList");
  var showPlayerIdentifiers = /* @__PURE__ */ __name(async (playerId) => {
    const playerData = await triggerServerCallback("scoreboard:getPlayerIdentifiers", null, playerId);
    if (playerData) {
      const identifierOptions = [
        {
          label: `${locale_default("scoreboard.server_id")}: ${playerData.serverId}`,
          icon: "id-card",
          description: locale_default("scoreboard.server_id")
        },
        {
          label: `${locale_default("scoreboard.username")}: ${playerData.name}`,
          icon: "user",
          description: locale_default("scoreboard.username")
        },
        {
          label: locale_default("scoreboard.identifiers_below"),
          icon: "hand-point-down",
          description: locale_default("scoreboard.identifiers_below")
        },
        {
          label: `${locale_default("scoreboard.steam_hex")}: ${playerData.steam}`,
          icon: "circle-info",
          description: locale_default("scoreboard.steam_hex"),
          args: { steam: playerData.steam }
        },
        {
          label: `${locale_default("scoreboard.fivem")}: ${playerData.fivem}`,
          icon: "circle-info",
          description: locale_default("scoreboard.fivem"),
          args: { fivem: playerData.fivem }
        },
        {
          label: `${locale_default("scoreboard.discord")}: ${playerData.discord}`,
          icon: "circle-info",
          description: locale_default("scoreboard.discord"),
          args: { discord: playerData.discord }
        }
      ];
      client_default.setMenuOptions("playerIdentifiers", identifierOptions);
      client_default.showMenu("playerIdentifiers");
    }
  }, "showPlayerIdentifiers");
})();
