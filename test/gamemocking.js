import 'jest-canvas-mock';
import Phaser from 'phaser';
import { BootScene } from '../public/src/scenes/bootScene';
import { WorldScene } from '../public/src/scenes/worldScene';
import { BattleScene } from '../public/src/scenes/battleScene';
import { FinalBattleScene } from '../public/src/scenes/finalBattle';
import { FinUIScene } from '../public/src/scenes/finUiscene';
import { UIScene } from '../public/src/scenes/UIScene';
import { GameEndScene } from '../public/src/scenes/gameendscene';

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