import 'regenerator-runtime';
import { startGame } from './gamemocking';
import { TestScheduler } from '../node_modules/jest';
// const { game } = require('./gamemocking');

describe('Game start creates a new game', () => {
  test('Returns an object', () => {
    const newGame = startGame.game();
    expect(typeof newGame).toBe('object');
  });
});