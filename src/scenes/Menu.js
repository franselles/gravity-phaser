import Phaser from 'phaser';

import Game from './Game';

export default class Menu extends Phaser.Scene {
  constructor() {
    super('Menu');
  }

  preload() {
    this.load.image('background', 'assets/background.jpg');
    this.load.image('mercury', 'assets/mercury.png');
    this.load.image('venus', 'assets/venus.png');
    this.load.image('earth', 'assets/earth.png');
    this.load.image('mars', 'assets/mars.png');
    this.load.image('jupiter', 'assets/jupiter.png');
    this.load.image('saturn', 'assets/saturn.png');
    this.load.image('uranus', 'assets/uranus.png');
    this.load.image('neptune', 'assets/neptune.png');
    this.load.image('pluto', 'assets/pluto.png');
    this.load.image('right', 'assets/right.png');
    this.load.image('left', 'assets/left.png');

    this.load.spritesheet('character', 'assets/character.png', {
      frameWidth: 96,
      frameHeight: 128,
    });

    this.scene.add('Game', Game);
  }

  create() {
    this.gameWidth = this.sys.game.canvas.width;

    this.add.image(0, 0, 'background').setOrigin(0);

    this.add
      .text(this.gameWidth / 2, 100, 'GRAVITY', {
        fontSize: '60px',
        stroke: '#000',
        strokeThickness: 6,
      })
      .setOrigin(0.5, 0);

    this.add
      .text(this.gameWidth / 2, 180, "What it's like on ...", {
        fontSize: '20px',
        stroke: '#000',
        strokeThickness: 3,
      })
      .setOrigin(0.5, 0);

    const text1 =
      'The english classroom\nproject by\nMaria Sellés Lloret\nand\nBlanca Martí Felgueroso';

    this.add
      .text(this.gameWidth / 2, 350, text1, {
        fontSize: '22px',
        stroke: '#000',
        strokeThickness: 3,
      })
      .setOrigin(0.5, 0);

    this.add
      .text(this.gameWidth / 2, 600, 'Made by FRaN. 2022', {
        fontSize: '15px',
        stroke: '#000',
        strokeThickness: 1,
      })
      .setOrigin(0.5, 0);

    this.input.once(
      'pointerdown',
      function () {
        this.scene.start('Game');
      },
      this
    );
  }

  update() {}
}
