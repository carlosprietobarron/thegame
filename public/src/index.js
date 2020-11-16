import Phaser from 'phaser';
import { BootScene } from './bootScene';
import { WorldScene } from './worldScene';
import { BattleScene } from './battleScene';
import { FinalBattleScene } from './finalbattle';
import { FinUIScene } from './fin-uiscene';
import { UIScene } from './UIScene';
import { GameEndScene } from './gameendscene';

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
