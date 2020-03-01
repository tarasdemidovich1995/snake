export default class Game {
    isGameOver = false;
    score = 0;
    playfield = this.createPlayfield();
    snake = this.createSnake();

    get level() {
        return Math.floor(this.score / 100);
    }

    createPlayfield() {
        let arr = [];
        for (let y = 0; y < 12; y++) {
            arr[y] = [];
            for (let x = 0; x < 12; x++) {
                arr[y][x] = 0;
            }
        }
        return arr;
    }

    clearPlayfield() {
        this.playfield = this.createPlayfield();
    }

    createSnake() {
        const directions = ['top', 'left', 'right', 'bottom'];
        const length = 3;
        const headCoordX = Math.floor(this.playfield.length / 2);
        const headCoordY = Math.floor(this.playfield.length / 2);
        const directionNum = Math.floor(Math.random() * 4);
        const direction = directions[directionNum];
        let snake = {
            direction: direction,
            coords: [],
        };
        switch (direction) {
            case 'top':
                for (let i = 0; i < length; i++) {
                    snake.coords.push([headCoordY + i, headCoordX]);
                }
                break;
            case 'left':
                for (let i = 0; i < length; i++) {
                    snake.coords.push([headCoordY, headCoordX + i]);
                }
                break;
            case 'right':
                for (let i = 0; i < length; i++) {
                    snake.coords.push([headCoordY, headCoordX - i]);
                }
                break;
            case 'bottom':
                for (let i = 0; i < length; i++) {
                    snake.coords.push([headCoordY - i, headCoordX]);
                }
                break;
        }
        return snake;
    }

    setSnakePosition() {
        const coords = this.snake.coords;
        for (let i = 0; i < coords.length; i++) {
            let y = coords[i][0]
            let x = coords[i][1];
            this.playfield[y][x] = 1;
        }
    }

    setFoodPosition() {
        const length = this.playfield.length;
        let y;
        let x;
        do {
            x = Math.floor(Math.random() * length);
            y = Math.floor(Math.random() * length);
        } while (this.playfield[y][x] != 0);
        this.playfield[y][x] = 2;
    }

    changeSnakePosition(y, x, isFood) {
        this.snake.coords.unshift([y, x]);
        this.playfield[y][x] = 1;
        if (!isFood) {
            const coords = this.snake.coords;
            const tailY = coords[coords.length - 1][0];
            const tailX = coords[coords.length - 1][1];
            if (!(y == tailY && x == tailX)) {
                this.playfield[tailY][tailX] = 0;
            }
            this.snake.coords.pop();
        }
    }

    makeStep() {
        if (this.isGameOver) return;
        let direction = this.snake.direction;
        let coords = this.snake.coords;
        let y = coords[0][0];
        let x = coords[0][1];
        switch (direction) {
            case 'top':
                y--;
                break;
            case 'left':
                x--;
                break;
            case 'right':
                x++;
                break;
            case 'bottom':
                y++;
                break;
        }
        if (this.hasCollision(y, x)) {
            this.isGameOver = true;
            return;
        }
        this.changeSnakePosition(y, x, this.hasFood(y, x));
    }

    moveLeft() {
        if (this.snake.direction == 'right') return;
        this.snake.direction = 'left';
    }

    moveRight() {
        if (this.snake.direction == 'left') return;
        this.snake.direction = 'right';
    }

    moveTop() {
        if (this.snake.direction == 'bottom') return;
        this.snake.direction = 'top';
    }

    moveBottom() {
        if (this.snake.direction == 'top') return;
        this.snake.direction = 'bottom';
    }

    hasCollision(y, x) {
        if (isNaN(this.playfield[y][x])) return true;
        const coords = this.snake.coords;
        const tailY = coords[coords.length - 1][0];
        const tailX = coords[coords.length - 1][1];
        if (y == tailY && x == tailX) return false;
        else if (this.playfield[y][x] == 1) return true;
        else return false;
    }

    hasFood(y, x) {
        if (this.playfield[y][x] == 2) {
            this.score += 20;
            this.setFoodPosition();
            return true;
        }
        return false
    }
}