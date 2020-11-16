import Phaser from 'phaser';
import { PlayerCharacter } from './playerCharacter';
import { Enemy } from './enemy';
import { User } from './user';

class FinalBattleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'FinalBattleScene' });
  }

  create() {
    // set the background of the main scene green
    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');

    this.startBattle();
    // on wake event we call startBattle too
    this.sys.events.on('wake', this.startBattle, this);

    const userData = JSON.parse(localStorage.getItem('user'));
    this.userplayer = new User(userData.name, userData.score);
  }

  startBattle() {
    // player character - warrior
    const warrior = new PlayerCharacter(this, 250, 50, 'player', 73, 'Warrior', 100, 20);
    this.add.existing(warrior);

    // player character - mage
    const mage = new PlayerCharacter(this, 250, 100, 'player', 21, 'Mage', 80, 8);
    this.add.existing(mage);

    const bigboss = new Enemy(this, 50, 50, 'boss', null, 'BigBoss', 100, 15);
    this.add.existing(bigboss);

    // array with heroes
    this.heroes = [warrior, mage];
    // array with enemies
    this.enemies = [bigboss];
    // array with both parties, who will attack
    this.units = this.heroes.concat(this.enemies);

    this.index = -1; // currently active unit

    this.scene.run('FinUIScene');
  }

  nextTurn() {
    const aftermath = this.checkEndBattle();
    if (aftermath === 'victory') {
      this.exitGame();
      return;
    }
    if (aftermath === 'gameover') {
      this.scene.switch('GameEndScene');
      return;
    }

    do {
      this.index += 1;
      // if there are no more units, we start again from the first one
      if (this.index >= this.units.length) {
        this.index = 0;
      }
    } while (!this.units[this.index].living);

    if (this.units[this.index]) {
      // if its player hero
      if (this.units[this.index] instanceof PlayerCharacter) {
        this.events.emit('PlayerSelect', this.index);
      } else { // else if its enemy unit
        // pick random hero
        const r = Math.floor(Math.random() * this.heroes.length);
        // call the enemy"s attack function
        this.units[this.index].attack(this.heroes[r]);
        // add timer for the next turn, so will have smooth gameplay
        this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
      }
    }
  }

  checkEndBattle() {
    let victory = true;
    // if all enemies are dead we have victory
    for (let i = 0; i < this.enemies.length; i += 1) {
      if (this.enemies[i].living) victory = false;
    }
    let gameOver = true;
    // if all heroes are dead we have game over
    for (let i = 0; i < this.heroes.length; i += 1) {
      if (this.heroes[i].living) gameOver = false;
    }
    if (victory === true) {
      this.userplayer.incrementScore(20);
      return 'victory';
    }
    if (gameOver) {
      return 'gameOver';
    }
    return 'continue';
  }

  endBattle() {
    // clear state, remove sprites
    this.heroes.length = 0;
    this.enemies.length = 0;
    for (let i = 0; i < this.units.length; i += 1) {
      // link item
      this.units[i].destroy();
    }
    this.units.length = 0;
    // sleep the UI
    this.scene.sleep('FinUIScene');
    // return to WorldScene and sleep current BattleScene
    this.scene.switch('WorldScene');
  }

  // when the player have selected the enemy to be attacked
  receivePlayerSelection(action, target) {
    if (action === 'attack') {
      this.units[this.index].attack(this.enemies[target]);
    }
    // next turn in 3 seconds
    this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
  }

  exitBattle() {
    this.scene.sleep('FinUIScene');
    this.scene.switch('WorldScene');
  }

  exitGame() {
    this.scene.sleep('UIScene');
    this.scene.switch('GameEndScene');
  }

  wake() {
    this.scene.run('FinUIScene');
    this.time.addEvent({ delay: 2000, callback: this.exitBattle, callbackScope: this });
  }
}

export { FinalBattleScene };