import { containerBodyElement, gameZoneSection, inputPlayerElement, menuSection, PLAYERS, startGameButton } from "../variables";
import { addPlayer, setupGameTrack } from "./menu";


inputPlayerElement.addEventListener('keypress', (event: KeyboardEvent) => {

    if (event.key !== 'Enter') return;

    const input = (event.target as HTMLInputElement)?.value || null;
    if (!input || !input.trim()) return;

    addPlayer(input.trim().toUpperCase());
    inputPlayerElement.value = '';
});


startGameButton.addEventListener('click', () => {
    if (PLAYERS.length < 2) {
        alert('Se requieren al menos 2 jugadores para iniciar el juego.');
        return;
    }


    (containerBodyElement as HTMLElement).style.maxWidth = 'none';

    menuSection.style.display = 'none';
    gameZoneSection.classList.add('game-zone--active');

    setupGameTrack();

});


