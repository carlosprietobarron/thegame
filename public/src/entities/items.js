class ItemFind extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame, name, value) {
    super(scene, x, y, texture, frame);
    this.name = name;
    this.value = value;
  }
}

export { ItemFind };
