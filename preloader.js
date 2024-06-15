class Preloader extends Phaser.Scene {
    constructor() {
        super({ key: 'Preloader' });
    }

    preload() {
        this.load.image('background', 'img/background.png');
        this.load.image('A', 'img/A.png');
        this.load.image('T', 'img/T.png');
        this.load.image('G', 'img/G.png');
        this.load.image('C', 'img/C.png');
    }

    create() {
        this.scene.start('StartScreen');
    }
}
