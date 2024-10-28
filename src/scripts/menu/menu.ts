import { Game } from "../game/game";
import { Player } from "../game/player";
import { gameTrackElement, keys, maxPlayers, PLAYERS, playersListElement } from "../variables";




// Función para remover jugadores
export function removePlayer(index: number) {
    PLAYERS.splice(index, 1);
    updatePlayersList();
}

// Función para mostrar jugadores en espera
export function updatePlayersList() {
    playersListElement.innerHTML = '';

    PLAYERS.forEach((player, index) => {
        const playerElement = document.createElement('li');
        playerElement.classList.add('menu__player-item')

        const playerLabel = document.createElement('span');
        playerLabel.classList.add('menu__player-label')
        playerLabel.innerHTML = `Jugador ${index + 1}: ${player.nickname}: <span>Para avanzar preciona la tacla: ${keys[index].toUpperCase()}</span>`;

        // Crear botón de eliminar jugador
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'menu__btn-remove--player';
        removeButton.addEventListener('click', () => {
            removePlayer(index);
        });

        playerElement.appendChild(playerLabel);
        playerElement.appendChild(removeButton);
        playersListElement.appendChild(playerElement);
    });
}

// Función para manejar el ingreso de jugadores
export function addPlayer(nickname: string) {

    if (PLAYERS.length < maxPlayers && !PLAYERS.some((p) => p.nickname === nickname)) {
        const player = new Player(nickname);
        PLAYERS.push(player);
        updatePlayersList();
    } else {
        alert('Máximo de jugadores alcanzado o nombre ya en uso.');
    }
}


export function setupGameTrack() {
    gameTrackElement.innerHTML = ''; // Limpiamos la pista de carrera

    PLAYERS.forEach((player, index) => {

        const trackContainer = document.createElement('div');
        trackContainer.classList.add('game-track__container')




        const playerInfo = document.createElement('p');
        playerInfo.classList.add('game-track__player-info')
        const infoPlayer = `Player ${index + 1}: <span>${player.nickname}</span> - jugar con: ${keys[index].toUpperCase()} - <span id="player-score-${player.nickname}">Score: ${player.score}</span>`
        playerInfo.innerHTML = infoPlayer;

        const playerTrack = document.createElement('div');
        playerTrack.classList.add('game-track__player-track');

        // Creamos un elemento para representar al jugador
        const playerElement = document.createElement('div');
        playerElement.classList.add('game-track__player');
        playerElement.id = `player-${player.nickname}`;
        playerElement.innerHTML = `<img class="game-track__player-icon img-cls" src="/public/car-icon.svg" alt="Car icon"/>`;

        playerTrack.appendChild(playerElement);

        trackContainer.appendChild(playerInfo);
        trackContainer.appendChild(playerTrack);

        gameTrackElement.appendChild(trackContainer);
    });

    const game = new Game(PLAYERS);
    game.start();
}


