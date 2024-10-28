import { gameTrackElement, keys } from "../variables";
import { Obstacle } from "./obstacle";
import { Player } from "./player";


export class Game {
    players: Player[];
    obstacles: Obstacle[];
    finishLine: number;
    gameInterval: number | undefined;
    keyBindings: Map<string, Player>;

    keysPressed: { [key: string]: boolean } = {};

    constructor(players: Player[]) {
        this.players = players;
        this.obstacles = [];

        const trackElement = gameTrackElement.querySelector('.game-track__container .game-track__player-track') as HTMLElement;
        this.finishLine = trackElement.getBoundingClientRect().width - 50;

        this.keyBindings = new Map();

        // Asignamos teclas a cada jugador
        players.forEach((player, index) => {
            const key = keys[index];
            if (key) {
                this.keyBindings.set(key, player);
                player.key = key;
            }
        });
    }

    start() {
        this.gameInterval = setInterval(() => this.gameLoop(), 100);

        window.addEventListener('keydown', (event) => {
            this.keysPressed[event.key.toLowerCase()] = true;
        });

        window.addEventListener('keyup', (event) => {
            this.keysPressed[event.key.toLowerCase()] = false;
        });
    }

    handleKeyPress(event: KeyboardEvent) {
        const player = this.keyBindings.get(event.key.toLowerCase());
        if (player && !player.crashed) {
            player.move(); // Mueve al jugador asignado a la tecla
            this.updatePlayerPosition(player);
        }
    }

    gameLoop() {
        this.keyBindings.forEach((player, key) => {
            if (this.keysPressed[key] && !player.crashed) {
                player.move();
                this.updatePlayerPosition(player);
                if (player.position >= this.finishLine) {
                    this.endGame();
                }
            }
        });

    }

    private updatePlayerPosition(player: Player) {
        const playerScoreElement = document.getElementById(`player-score-${player.nickname}`) as HTMLElement;
        const playerElement = document.getElementById(`player-${player.nickname}`) as HTMLElement;
        if (playerElement) {
            playerScoreElement.innerHTML = `Score: ${player.score}`
            playerElement.style.left = `${player.position}px`;
        }
    }

    private endGame(): void {

        clearInterval(this.gameInterval);

        const sortedPlayers = this.players
            .filter(player => !player.crashed)
            .sort((a, b) => b.position - a.position);

        if (sortedPlayers.length === 0) {
            alert("No hay ganadores, todos los jugadores chocaron.");
            location.reload();
            return;
        }

        if (sortedPlayers.length === 2) {
            alert(`El ganador es ${sortedPlayers[0].nickname}`);
            location.reload();
            return;
        }


        const resultsMessage = sortedPlayers.slice(0, 3)
            .map((player, index) => `${index + 1}. ${player.nickname} con puntaje de ${player.score}`)
            .join('\n');

        alert(`Resultados:\n${resultsMessage}`);
        location.reload();
    }
}