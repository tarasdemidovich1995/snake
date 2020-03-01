export default class View {
    colors = {
        '1': 'black',
        '2': 'red',
    }

    constructor(elem, width, height, rows, cols) {
        this.elem = elem;
        this.width = width;
        this.height = height;
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext('2d');

        this.playfieldBorderWidth = 10;
        this.playfieldX = this.playfieldBorderWidth;
        this.playfieldY = this.playfieldBorderWidth;
        this.playfieldWidth = this.width;
        this.playfieldHeight = this.height;
        this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBorderWidth * 2;
        this.playfieldInnerHeight = this.playfieldHeight - this.playfieldBorderWidth * 2;

        this.blockWidth = this.playfieldInnerWidth / rows;
        this.blockHeight = this.playfieldInnerHeight / cols;

        this.elem.append(this.canvas);
    }

    renderPlayfield(playfield) {
        this.context.clearRect(0, 0, this.playfieldWidth, this.playfieldHeight);
        this.context.lineWidth = this.playfieldBorderWidth;
        this.context.strokeStyle = 'grey';
        this.context.strokeRect(0, 0, this.playfieldWidth, this.playfieldHeight);
        for (let y = 0; y < playfield.length; y++) {
            const line = playfield[y];
            for (let x = 0; x < playfield.length; x++) {
                const block = line[x];
                if (block) {
                    this.context.fillStyle = this.colors[block];
                    this.context.lineWidth = 2;
                    this.context.strokeStyle = 'white';
                    this.context.fillRect(
                        this.playfieldX + x * this.blockWidth,
                        this.playfieldY + y * this.blockHeight,
                        this.blockWidth,
                        this.blockHeight
                    );
                    this.context.strokeRect(
                        this.playfieldX + x * this.blockWidth,
                        this.playfieldY + y * this.blockHeight,
                        this.blockWidth,
                        this.blockHeight
                    )
                }
            }
        }
    }
}