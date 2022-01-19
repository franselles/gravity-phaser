import Phaser from 'phaser';

export default class Game extends Phaser.Scene {
  constructor() {
    super('Game');
    this.planets = [
      { name: 'MERCURY', gravity: 200, gravNumber: '3.7' },
      { name: 'VENUS', gravity: 600, gravNumber: '8.8' },
      { name: 'EARTH', gravity: 600, gravNumber: '9.8' },
      { name: 'MARS', gravity: 200, gravNumber: '3.7' },
      { name: 'JUPITER', gravity: 4000, gravNumber: '24.7' },
      { name: 'SATURN', gravity: 1500, gravNumber: '10.4' },
      { name: 'URANUS', gravity: 600, gravNumber: '8.8' },
      { name: 'NEPTUNE', gravity: 2000, gravNumber: '11.1' },
      { name: 'PLUTO', gravity: 10, gravNumber: '0.6' },
    ];
  }

  preload() {}

  planetAdd(planetName) {
    return this.physics.add.staticSprite(this.gameWidth / 2, 550, planetName);
  }

  createPlanet(planet) {
    this.character.setGravity(0, planet.gravity);
    this.character.y = 50;
    this.character.setScale(1, 1);
    this.character.setFrame(1);
    if (this.planet) this.planet.destroy();
    this.planet = this.planetAdd(planet.name.toLowerCase());
    this.createCollision();
    this.jumped = true;
    this.textPlanet.setText(planet.name);
    this.textGravity.setText('Gravity: ' + planet.gravNumber);
  }

  createCollision() {
    this.physics.add.collider(this.character, this.planet, () => {
      this.jumped = false;
      this.character.setFrame(0);
      if (this.indexPlanet == 4) {
        this.character.setScale(1, 0.3);
      }
    });
  }

  create() {
    this.gameWidth = this.sys.game.canvas.width;

    this.indexPlanet = 0;
    let currentPlanet = this.planets[this.indexPlanet];
    this.jump = false;
    this.jumped = true;

    const bg = this.add.image(0, 0, 'background').setOrigin(0).setInteractive();

    bg.on('pointerdown', () => {
      if (this.jumped) return;
      this.jump = true;
    });

    const right = this.add
      .sprite(this.gameWidth - 60, 220, 'right')
      .setInteractive();

    right.on('pointerdown', () => {
      if (this.indexPlanet == this.planets.length - 1) return;
      this.indexPlanet++;
      currentPlanet = this.planets[this.indexPlanet];
      this.createPlanet(currentPlanet);
    });

    const left = this.add.sprite(60, 220, 'left').setInteractive();

    left.on('pointerdown', () => {
      if (this.indexPlanet == 0) return;
      this.indexPlanet--;
      currentPlanet = this.planets[this.indexPlanet];
      this.createPlanet(currentPlanet);
    });

    this.character = this.physics.add
      .image(this.gameWidth / 2, 50, 'character', 0)
      .setFrame(1)
      .setDepth(2);

    this.textPlanet = this.add
      .text(this.gameWidth / 2, 20, currentPlanet.name, {
        fontSize: '60px',
        stroke: '#f00',
        strokeThickness: 6,
      })
      .setOrigin(0.5, 0);

    this.textGravity = this.add
      .text(this.gameWidth / 2, 100, 'Gravity: ' + currentPlanet.gravNumber, {
        fontSize: '30px',
        stroke: '#fff',
        color: '#ff0',
        strokeThickness: 2,
      })
      .setOrigin(0.5, 0);

    this.add
      .text(this.gameWidth / 2, 200, 'JUMP', {
        fontSize: '40px',
        stroke: '#fff',
        strokeThickness: 3,
        color: '#000',
      })
      .setOrigin(0.5, 0);

    this.createPlanet(currentPlanet);

    this.character.setGravity(0, currentPlanet.gravity);

    this.createCollision();
  }

  update() {
    this.physics.world.collide(this.character, this.planet);

    if (this.jump && !this.jumped) {
      this.character.setVelocityY(-300);
      this.character.setFrame(1);
      this.jump = false;
      this.jumped = true;
    }
  }
}
