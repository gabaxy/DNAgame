class StartScreen extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScreen' });
    }

    create() {
        this.add.image(400, 300, 'background');
        this.add.text(400, 150, 'DNA Matching Game', { fontSize: '48px', fill: '#ffffff' }).setOrigin(0.5);
        const startButton = this.add.text(400, 300, 'Start Game', { fontSize: '32px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('DNA_Game');
        });
    }
}
