import Phaser from 'phaser';
import { BootScene } from './scenes/bootScene';
import { WorldScene } from './scenes/worldScene';
import { BattleScene } from './scenes/battleScene';
import { FinalBattleScene } from './scenes/finalbattle';
import { FinUIScene } from './scenes/finUiscene';
import { UIScene } from './scenes/UIScene';
import { GameEndScene } from './scenes/gameEndScene';

const config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 320,
  height: 240,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  zoom: 2,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [
    BootScene,
    WorldScene,
    BattleScene,
    FinalBattleScene,
    UIScene,
    FinUIScene,
    GameEndScene,
  ],
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars
