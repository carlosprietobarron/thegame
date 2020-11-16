import Phaser from 'phaser';
import { User } from './user';
import { domUtils } from './domUtils';

class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // load the resources here
    // load bg image
    this.load.image('bg', './assets/theQuestCover.png');

    // load items images
    this.load.spritesheet('item', './assets/items.png', { frameWidth: 16, frameHeight: 16 });
   
    // map tiles
    this.load.image('tiles', './assets/map/roguelikeSheet.png');

    // map in json format
    this.load.tilemapTiledJSON('map', './assets/map/finalmap.json');

    // our two characters
    this.load.spritesheet('player', './assets/charsprites.png', { frameWidth: 16, frameHeight: 16 });
    // this.load.spritesheet('player', './assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 })

    // load enemies
    this.load.image('dragonblue', './assets/dragonblue.png');
    this.load.image('dragonorrange', './assets/dragonorrange.png');
     // load final boss
     this.load.spritesheet('boss', './assets/bigboss.png', { frameWidth: 64, frameHeight: 64 });
    // load background initial scene
    this.load.image('backg', './assets/theQuestCover.png');
    // startbtn
    this.load.image('startbtn', './assets/start-btn.png');
    this.load.image('startbtn-hover', './assets/start-btn-hover.png');

    this.load.audio('startMusic', './assets/game1.mp3');
    // loadingBar
    const loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff, // white
      },
    });

    this.load.on('progress', (percentage) => {
      loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percentage, 50);
    });
  }

  create() {
    // this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "logo");

    this.add.image(0, 0, 'bg').setOrigin(0);

    // let playbutton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.50,"startbtn");
    // this.scene.start("WorldScene");

    this.playbutton = this.add.sprite(
      this.game.renderer.width / 2,
      this.game.renderer.height * 0.50,
      'startbtn',
    );

    // this.sound.play("startMusic");

    this.playbutton.setInteractive();

    this.playbutton.on('pointerover', () => {
      this.playbutton.setTexture('startbtn-hover');
    }, this);

    this.playbutton.on('pointerdown', () => {
      this.playbutton.setTexture('startbtn-hover');
    }, this);

    this.playbutton.on('pointerout', () => {
      this.playbutton.setTexture('startbtn');
    }, this);

    this.playbutton.on('pointerup', () => {
      this.playbutton.setTexture('startbtn');
      if (localStorage.getItem('user').length > 0) {
        this.sound.stopAll();
        this.scene.start('WorldScene');
      } else {
        alert('fill in username');
      }
    }, this);
    this.playbutton.setVisible(false);
    this.playbutton.setActive(false);
    this.saveUser();

    // this.scene.start("WorldScene");
  }

  saveUser() { // eslint-disable-line class-methods-use-this
    const scoreform = domUtils.element('game-end');
    scoreform.style.display = 'none';
    const userName = domUtils.element('nameInput');
    const save = domUtils.element('startbtn');
    localStorage.clear();
    save.onclick = () => {
      if (userName.value !== '') {
        const user = new User(userName.value);
        localStorage.setItem('user', JSON.stringify(user));
        domUtils.dismissComponent('user-form');
        this.sound.stopAll();
        this.scene.start('WorldScene');
      } else {
        alert('fill in username'); // eslint-disable-line no-alert
      }
    };
  }
}

export { BootScene };