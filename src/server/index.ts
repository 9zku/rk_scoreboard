import { onClientCallback } from '@overextended/ox_lib/server';

onClientCallback('scoreboard:getPlayers', () => {
  const players: string[] = [];
  for (let i = 0; i < GetNumPlayerIndices(); i++) {
    players.push(GetPlayerFromIndex(i));
  }
  
  const playerList = players.map((playerId: string) => {
    const playerName = GetPlayerName(playerId);
    return {
      id: parseInt(playerId),
      name: playerName
    };
  });
  
  return playerList;
});

onClientCallback('scoreboard:getPlayerIdentifiers', (playerId: number) => {
  const identifiers = getPlayerIdentifiers(playerId.toString());
  const playerName = GetPlayerName(playerId.toString());
  
  const identifierMap: { [key: string]: string } = {};
  identifiers.forEach((identifier: string) => {
    if (identifier.startsWith('steam:')) {
      identifierMap.steam = identifier.replace('steam:', '');
    } else if (identifier.startsWith('fivem:')) {
      identifierMap.fivem = identifier.replace('fivem:', '');
    } else if (identifier.startsWith('discord:')) {
      identifierMap.discord = identifier.replace('discord:', '');
    }
  });
  
  return {
    name: playerName,
    serverId: playerId,
    steam: identifierMap.steam || 'N/A',
    fivem: identifierMap.fivem || 'N/A',
    discord: identifierMap.discord || 'N/A'
  };
});
