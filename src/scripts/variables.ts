import { Player } from "./game/player";

export const maxPlayers = 5;
export const keys = ['a', 's', 'd', 'f', 'j', 'k', 'l', 'ñ'];
export let PLAYERS: Player[] = [];

// ==> Main
export const containerBodyElement = document.getElementById('main-container');

// ==> Menu
export const menuSection = document.getElementById('menu-section') as HTMLElement;
export const inputPlayerElement = document.getElementById('input-add-player') as HTMLInputElement;
export const startGameButton = document.getElementById('start-game') as HTMLButtonElement;
export const playersListElement = document.getElementById('players-list') as HTMLElement;

// ==> Game Zone
export const gameZoneSection = document.getElementById('game-zone-section') as HTMLElement;
export const gameTrackElement = document.getElementById('game-track') as HTMLElement;