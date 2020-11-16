import 'jest-canvas-mock';
import Phaser from 'phaser';
import { BootScene } from '../public/src/bootScene';
import { WorldScene } from '../public/src/worldScene';
import { BattleScene } from '../public/src/battleScene';
import { FinalBattleScene } from '../public/src/finalbattle';
import { FinUIScene } from '../public/src/fin-uiscene';
import { UIScene } from '../public/src/UIScene';
import { GameEndScene } from '../public/src/gameendscene';

const startGame = (() => {
  const mockConfig = {
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
        debug: true,
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

  const game = () => new Phaser.Game(mockConfig);
  return { game };
})();

export { startGame };