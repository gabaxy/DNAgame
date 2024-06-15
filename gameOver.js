class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' });
    }

    init(data) {
        this.finalScore = data.score;
        this.baseNucleotides = data.baseNucleotides;
        this.bonds = data.bonds;
        this.matchedNucleotides = data.matchedNucleotides;
    }

    create() {
        const background = this.add.graphics();
        background.fillStyle(0x3497BB, 0.73);
        background.fillRect(0, 0, 800, 600);

        this.add.text(400, 300, 'Game Over! Final Score: ' + this.finalScore, { fontSize: '40px', fill: '#ffffff' }).setOrigin(0.5);
        const restartButton = this.add.text(400, 400, 'Restart', { fontSize: '32px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();
        restartButton.on('pointerdown', () => {
            this.scene.start('DNA_Game');
        });

        this.baseNucleotides.forEach((nuc, index) => {
            const sprite = this.add.sprite(nuc.x, 555, nuc.texture);
            this.tweens.add({
                targets: sprite,
                y: 200,
                duration: 1000,
                ease: 'Power2'
            });
        });
        this.bonds.forEach((bond, index) => {
            const bondText = this.add.text(bond.x, bond.y, bond.text, { fontSize: '60px', fill: '#fff' }).setOrigin(0.5);
            this.tweens.add({
                targets: bondText,
                y: 150,
                duration: 1000,
                ease: 'Power2'
            });
        });
        this.matchedNucleotides.forEach((nuc, index) => {
            const sprite = this.add.sprite(nuc.x, nuc.y, nuc.texture);
            this.tweens.add({
                targets: sprite,
                y: 100,
                duration: 1000,
                ease: 'Power2'
            });
        });
    }
}
