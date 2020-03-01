export default class Controller {
    set speed(time) {
        this._speed = time;
    }
    get speed() {
        return this._speed <= 0 ? 50 : this._speed;
    }

    set stepTime(time) {
        this._stepTime = time;
    }
    get stepTime() {
        return this._stepTime - Date.now() + this.speed;
    }

    constructor(game, view) {
        this.game = game;
        this.view = view;

        this._speed = null;
        this._stepTime = null;

        this.interval = null;
        this.isColldown = null;

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    play() {
        this.game.setSnakePosition();
        this.game.setFoodPosition();
        this.startTimer();
    }

    stop() {

    }

    pause() {

    }

    update() {
        this.game.makeStep();
        this.view.renderPlayfield(this.game.playfield);
    }

    setCooldown() {
        this.isColldown = true;
        setTimeout(() => this.isColldown = false, this.stepTime)
    }

    startTimer() {
        this.speed = 500 - this.game.level * 50;
        if (!this.interval) {
            this.interval = setInterval(() => {
                this.stepTime = Date.now();
                this.update();
            }, this.speed);
        }
    }

    stopTimer() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    handleKeyDown() {
        switch (event.keyCode) {
            case 37:
                if (!this.isColldown) {
                    this.game.moveLeft();
                    this.setCooldown();
                }
                break;
            case 38:
                if (!this.isColldown) {
                    this.game.moveTop();
                    this.setCooldown();
                }
                break;
            case 39:
                if (!this.isColldown) {
                    this.game.moveRight();
                    this.setCooldown();
                }
                break;
            case 40:
                if (!this.isColldown) {
                    this.game.moveBottom();
                    this.setCooldown();
                }
                break;
        }
    }
}