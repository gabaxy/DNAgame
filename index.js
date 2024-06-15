var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: [Preloader, StartScreen, DNA_Game, GameOver]
};

var game = new Phaser.Game(config);
