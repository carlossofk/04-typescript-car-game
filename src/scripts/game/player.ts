export class Player {
    nickname: string;
    position: number;
    crashed: boolean;
    score: number;
    key: string;

    constructor(nickname: string) {
        this.nickname = nickname;
        this.position = 0;
        this.crashed = false;
        this.score = 0;
        this.key = '';
    }

    move() {
        this.position += 10;
        this.score += 1;
    }

    collide() {
        this.crashed = true;
    }

    setKey(key: string) {
        this.key = key
    }
}
