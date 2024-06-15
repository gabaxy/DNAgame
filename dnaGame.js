class DNA_Game extends Phaser.Scene {
    constructor() {
        super({ key: 'DNA_Game' });
        this.baseY = 535; // apacios linija
        this.columns = 8; // sekos ilgis
        this.columnWidth = 800 / this.columns;
        this.centerColumn = Math.floor(this.columns / 2);
        this.bonds = [];
        this.matchedNucleotides = [];
    }

    create() {
        this.add.image(400, 300, 'background');
        this.score = 0;
        this.droppedNucleotides = 0;
        this.baseNucleotides = [];
        this.createBaseSequence();
        this.generateBond();
        this.scoreText = this.add.text(10, 20, 'Score: 0', { fontSize: '52px', fill: '#000' });
        this.generateComplementarySequence();
        this.spawnFallingNucleotide();
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.fallingNucleotide && this.fallingNucleotide.y < this.baseY - this.fallingNucleotide.height * 2) {
            this.fallingNucleotide.y += 1.7; // greitis
        } else if (this.fallingNucleotide) {
            this.handleLanding();
        }
        this.handleInput();
    }

    createBaseSequence() {
        this.baseSequence = this.generateRandomSequence(this.columns);
        this.baseNucleotides = this.baseSequence.map((nuc, index) => {
            const x = index * this.columnWidth + this.columnWidth / 2;
            const sprite = this.add.sprite(x, this.baseY, nuc).setData('type', nuc);
            this.baseNucleotides.push(sprite);
            return sprite;
        });
    }

    generateBond() {
        this.baseNucleotides.forEach((nuc, index) => {
            const x = index * this.columnWidth + this.columnWidth / 2;
            const bond = this.add.text(x, this.baseY - 50, '|', { fontSize: '60px', fill: '#fff' }).setOrigin(0.5);
            this.bonds.push(bond);
        });
    }

    generateComplementarySequence() {
        this.complementarySequence = this.baseSequence.map(nuc => this.getComplementaryNucleotide(nuc));
        this.remainingNucleotides = [...this.complementarySequence];
        Phaser.Utils.Array.Shuffle(this.remainingNucleotides);
    }

    spawnFallingNucleotide() {
        if (this.droppedNucleotides >= this.columns) {
            this.scene.start('GameOver', {
                score: this.score,
                baseNucleotides: this.baseNucleotides.map(nuc => ({ texture: nuc.texture.key, x: nuc.x })),
                bonds: this.bonds.map(bond => ({ x: bond.x, y: bond.y, text: bond.text })),
                matchedNucleotides: this.matchedNucleotides.map(nuc => ({ texture: nuc.texture.key, x: nuc.x, y: nuc.y }))
            });
            return;
        }

        const nucleotideType = this.remainingNucleotides.pop();
        const x = this.centerColumn * this.columnWidth + this.columnWidth / 2;
        this.fallingNucleotide = this.add.sprite(x, 10, nucleotideType);
        this.fallingNucleotide.setData('targetColumn', this.centerColumn);
        this.droppedNucleotides++;
    }

    handleInput() {
        if (this.fallingNucleotide) {
            if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
                this.moveNucleotide(-1);
            } else if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
                this.moveNucleotide(1);
            }
        }
    }

    moveNucleotide(direction) {
        const currentColumn = this.fallingNucleotide.getData('targetColumn');
        const newColumn = currentColumn + direction;
        if (newColumn >= 0 && newColumn < this.columns) {
            const newX = newColumn * this.columnWidth + this.columnWidth / 2;
            this.fallingNucleotide.x = newX;
            this.fallingNucleotide.setData('targetColumn', newColumn);
        }
    }

    handleLanding() {
        const column = this.fallingNucleotide.getData('targetColumn');
        const baseType = this.baseNucleotides[column].getData('type');
        const fallingType = this.fallingNucleotide.texture.key;
        if (fallingType === this.getComplementaryNucleotide(baseType)) {
            this.score++;
            this.fallingNucleotide.setTint(0x00ff00);
            this.matchedNucleotides.push(this.fallingNucleotide);
        } else {
            this.fallingNucleotide.setTint(0xff0000);
            this.matchedNucleotides.push(this.fallingNucleotide);
        }
        this.scoreText.setText('Score: ' + this.score);
        this.fallingNucleotide.y = this.baseY - this.fallingNucleotide.height * 2;
        this.fallingNucleotide = null;
        this.spawnFallingNucleotide();
    }

    generateRandomSequence(length) {
        const nucleotides = ['A', 'T', 'G', 'C'];
        return Array.from({ length }, () => nucleotides[Math.floor(Math.random() * nucleotides.length)]);
    }

    getComplementaryNucleotide(nuc) {
        const pairs = { 'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C' };
        return pairs[nuc];
    }
}
