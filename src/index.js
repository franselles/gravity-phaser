import Phaser from 'phaser';
import config from './config';
import Menu from './scenes/Menu';

/* eslint-disable-next-line */
const game = new Phaser.Game(Object.assign(config, { scene: [Menu] }));
