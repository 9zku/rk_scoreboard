var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

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

// node_modules/.pnpm/@overextended+ox_lib@3.29.0/node_modules/@overextended/ox_lib/server/resource/callback/index.js
var pendingCallbacks = {};
var callbackTimeout = GetConvarInt("ox:callbackTimeout", 3e5);
onNet(`__ox_cb_${cache.resource}`, (key, ...args) => {
  const resolve = pendingCallbacks[key];
  delete pendingCallbacks[key];
  return resolve && resolve(...args);
});
function onClientCallback(eventName, cb) {
  onNet(`__ox_cb_${eventName}`, async (resource, key, ...args) => {
    const src = source;
    let response;
    try {
      response = await cb(src, ...args);
    } catch (e) {
      console.error(`an error occurred while handling callback event ${eventName}`);
      console.log(`^3${e.stack}^0`);
    }
    emitNet(`__ox_cb_${resource}`, src, key, response);
  });
}
__name(onClientCallback, "onClientCallback");

// src/server/index.ts
onClientCallback("scoreboard:getPlayers", () => {
  const players = [];
  for (let i = 0; i < GetNumPlayerIndices(); i++) {
    players.push(GetPlayerFromIndex(i));
  }
  const playerList = players.map((playerId) => {
    const playerName = GetPlayerName(playerId);
    return {
      id: parseInt(playerId),
      name: playerName
    };
  });
  return playerList;
});
onClientCallback("scoreboard:getPlayerIdentifiers", (playerId) => {
  const identifiers = getPlayerIdentifiers(playerId.toString());
  const playerName = GetPlayerName(playerId.toString());
  const identifierMap = {};
  identifiers.forEach((identifier) => {
    if (identifier.startsWith("steam:")) {
      identifierMap.steam = identifier.replace("steam:", "");
    } else if (identifier.startsWith("fivem:")) {
      identifierMap.fivem = identifier.replace("fivem:", "");
    } else if (identifier.startsWith("discord:")) {
      identifierMap.discord = identifier.replace("discord:", "");
    }
  });
  return {
    name: playerName,
    serverId: playerId,
    steam: identifierMap.steam || "N/A",
    fivem: identifierMap.fivem || "N/A",
    discord: identifierMap.discord || "N/A"
  };
});
