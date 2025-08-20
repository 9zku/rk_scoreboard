import Config from '@common/config';
import lib from '@overextended/ox_lib/client';
import { triggerServerCallback } from '@overextended/ox_lib/client';
import Locale from '@common/locale';

let currentPlayers: any[] = [];

RegisterCommand(Config.command || 'score', async () => {
  await updatePlayerList();
  lib.showMenu('scoreboard');
}, false);

RegisterKeyMapping(Config.command || 'score', 'Open Scoreboard', 'keyboard', Config.keybind || 'U');
  
lib.registerMenu({
  id: 'scoreboard',
  title: Locale('scoreboard.title'),
  position: 'top-right',
  options: []
}, (selected: number, scrollIndex: number) => {
  const playerIndex = selected - 1;
  if (currentPlayers[playerIndex]) {
    showPlayerIdentifiers(currentPlayers[playerIndex].id);
  }
});

lib.registerMenu({
  id: 'playerIdentifiers',
  title: Locale('scoreboard.player_info'),
  position: 'top-right',
  options: []
}, (selected: number, scrollIndex: number, args: any) => {
  if (selected >= 4) {
    let identifierValue = '';
    
    if (selected === 4) {
      identifierValue = args.steam;
    } else if (selected === 5) {
      identifierValue = args.fivem;
    } else if (selected === 6) {
      identifierValue = args.discord;
    }
    
    if (identifierValue && identifierValue !== 'N/A') {
      lib.setClipboard(identifierValue);
      let copiedMessage = '';
      if (selected === 4) {
        copiedMessage = Locale('scoreboard.steam_copied');
      } else if (selected === 5) {
        copiedMessage = Locale('scoreboard.fivem_copied');
      } else if (selected === 6) {
        copiedMessage = Locale('scoreboard.discord_copied');
      }
      
      lib.notify({
        title: Locale('scoreboard.copied'),
        description: copiedMessage,
        type: 'success',
        duration: 2000
      });
    } else {
      let notAvailableMessage = '';
      if (selected === 4) {
        notAvailableMessage = Locale('scoreboard.steam_not_available');
      } else if (selected === 5) {
        notAvailableMessage = Locale('scoreboard.fivem_not_available');
      } else if (selected === 6) {
        notAvailableMessage = Locale('scoreboard.discord_not_available');
      }
      
      lib.notify({
        title: Locale('scoreboard.no_data'),
        description: notAvailableMessage,
        type: 'error',
        duration: 2000
      });
    }
  }
});

const updatePlayerList = async () => {
  const players = await triggerServerCallback('scoreboard:getPlayers', null);
  if (players && Array.isArray(players)) {
    currentPlayers = players;
    const playerMenuOptions = players.map((player: any) => ({
      label: `[${player.id}] ${player.name}`,
      icon: 'user',
      description: `${Locale('scoreboard.server_id')}: ${player.id}`
    }));
    
    lib.setMenuOptions('scoreboard', playerMenuOptions);
  }
};

const showPlayerIdentifiers = async (playerId: number) => {
  const playerData = await triggerServerCallback('scoreboard:getPlayerIdentifiers', null, playerId) as any;
  
  if (playerData) {
    const identifierOptions = [
      {
        label: `${Locale('scoreboard.server_id')}: ${playerData.serverId}`,
        icon: 'id-card',
        description: Locale('scoreboard.server_id')
      },
      {
        label: `${Locale('scoreboard.username')}: ${playerData.name}`,
        icon: 'user',
        description: Locale('scoreboard.username')
      },
      {
        label: Locale('scoreboard.identifiers_below'),
        icon: 'hand-point-down',
        description: Locale('scoreboard.identifiers_below')
      },
      {
        label: `${Locale('scoreboard.steam_hex')}: ${playerData.steam}`,
        icon: 'circle-info',
        description: Locale('scoreboard.steam_hex'),
        args: { steam: playerData.steam }
      },
      {
        label: `${Locale('scoreboard.fivem')}: ${playerData.fivem}`,
        icon: 'circle-info',
        description: Locale('scoreboard.fivem'),
        args: { fivem: playerData.fivem }
      },
      {
        label: `${Locale('scoreboard.discord')}: ${playerData.discord}`,
        icon: 'circle-info',
        description: Locale('scoreboard.discord'),
        args: { discord: playerData.discord }
      }
    ];
    
    lib.setMenuOptions('playerIdentifiers', identifierOptions);
    lib.showMenu('playerIdentifiers');
  }
};

