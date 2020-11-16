import Phaser from 'phaser';
import { ItemFind } from './items';
import { Enemy } from './enemy';
import { User } from './user';

class WorldScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WorldScene' });
  }

  create() {
    // get user data
    const userData = JSON.parse(localStorage.getItem('user'));
    this.userplayer = new User(userData.name, userData.score);

    // set the map

    const map = this.make.tilemap({ key: 'map' });
    const tiles = map.addTilesetImage('roguelikeSheet', 'tiles');

    map.createStaticLayer('Grass', tiles, 0, 0);
    const obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
    obstacles.setCollisionByExclusion([-1]);
    // Create score text
    this.scoreLabel = this.add.text(0,0, 'Score: 0');
    // insert player
    this.player = this.physics.add.sprite(50, 100, 'player', 48);
    // player boundaries
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);
    // set movements control with keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // set cammera follow player
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { frames: [73, 72, 73, 74] }),
      frameRate: 10,
      repeat: -1,
    });

    // animation with key 'right'
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { frames: [73, 72, 73, 74] }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { frames: [81, 80, 81, 83] }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { frames: [49, 48, 49, 50] }),
      frameRate: 10,
      repeat: -1,
    });

    this.physics.add.collider(this.player, obstacles);

    // spawn enemies and obstacles
    this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
    for (let i = 0; i < 30; i += 1) {
      const x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      const y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
      // parameters are x, y, width, height
      this.spawns.create(x, y, 20, 20);
    }
    this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);

    this.sys.events.on('wake', this.wake, this);
    // seed items

    this.items = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
    // item1
    let x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    let y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
    this.item1 = this.physics.add.sprite(x, y, 'item', 4);
    this.hammer = new ItemFind(this, x, y, 'item', 4, 'thor hammer', 5);
    this.hammer.setVisible(true);
    this.physics.add.overlap(this.player, this.item1, this.onFindItem, false, this);
    // item2
    x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
    this.item2 = this.physics.add.sprite(x, y, 'item', 11);
    this.ring_power = new ItemFind(this, x, y, 'item', 11, 'ring of power', 7);
    this.ring_power.setVisible(true);
    this.physics.add.overlap(this.player, this.item2, this.onFindItem, false, this);

    // item3
    x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
    this.item3 = this.physics.add.sprite(x, y, 'item', 12);
    this.ring_hero = new ItemFind(this, x, y, 'item', 12, 'ring of hero', 7);
    this.ring_hero.setVisible(true);
    this.physics.add.overlap(this.player, this.item3, this.onFindItem, false, this);
    // item4
    x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
    this.item4 = this.physics.add.sprite(x, y, 'item', 17);
    this.key_tres = new ItemFind(this, x, y, 'item', 17, 'treasure key', 10);
    this.key_tres.setVisible(true);
    this.physics.add.overlap(this.player, this.item4, this.onFindItem, false, this);

    this.physics.add.overlap(this.player, this.items, this.onFindItem, false, this);

    // last enemy
    x = 580;
    y = 200;
    this.bigBoss = new Enemy(this, x, y, 'boss', null, 'BigBoss', 80, 10);
    this.boss = this.physics.add.sprite(x, y, 'boss');
    // this.add.existing(this.boss);
    this.physics.add.overlap(this.player, this.boss, this.onMeetBigBoss, false, this);
  } // create end

  wake() {
    this.cursors.left.reset();
    this.cursors.right.reset();
    this.cursors.up.reset();
    this.cursors.down.reset();
    this.updateScore();
  }

  update() {
    this.player.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-80);
      this.player.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(80);
      this.player.flipX = false;
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-80);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(80);
    }

    // animate movement
    if (this.cursors.left.isDown) {
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.anims.play('right', true);
    } else if (this.cursors.up.isDown) {
      this.player.anims.play('up', true);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play('down', true);
    } else {
      this.player.anims.stop();
    }

    this.scoreLabel.x = this.cameras.main.scrollX;
    this.scoreLabel.y = this.cameras.main.scrollY;
  }// update end

  onMeetEnemy(player, zone) {
    // we move the zone to some other location
    zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

    // start battle
    // shake the world
    this.cameras.main.shake(300);
    this.cameras.main.flash(1000);
    // this.cameras.main.fade(1000);
    this.scene.switch('BattleScene');
  }

  onMeetBigBoss(player, zone) {
    // we move the zone to some other location
    zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

    // start battle
    // shake the world
    this.cameras.main.shake(300);
    this.cameras.main.flash(1000);
    // this.cameras.main.fade(1000);
    this.scene.switch('FinalBattleScene');
  }

  onFindItem(player, zone) {
    // we move the zone to some other location
    const idx = zone.frame.name;
    zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
    let found;
    switch (idx) {
      case 4:
        found = this.hammer;
        break;
      case 11:
        found = this.ring_power;
        break;
      case 12:
        found = this.ring_hero;
        break;
      case 17:
        found = this.key_tres;
        break;
      default:
        break;
    }
    const userData = JSON.parse(localStorage.getItem('user'));
    this.userplayer.name = userData.name;
    this.userplayer.score = userData.score;
    this.userplayer.incrementScore(found.value);
    this.updateScore();
    // start battle
    // shake the world
    this.cameras.main.shake(300);
    this.cameras.main.flash(1000);
    // this.cameras.main.fade(1000);
    // this.scene.switch('BattleScene');
  }

  updateScore() {
    const userData = JSON.parse(localStorage.getItem('user'));
    this.userplayer = new User(userData.name, userData.score);
    const scoreText = `Score: ${userData.score}`;
    this.scoreLabel.text = scoreText;
  }
}

export { WorldScene };