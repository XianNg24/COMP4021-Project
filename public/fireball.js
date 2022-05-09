// This function defines the Fireball module.
// - `ctx` - A canvas context for drawing
// - `x` - The initial x position of the fireball
// - `y` - The initial y position of the fireball
const Fireball = function (ctx, x, y, gameArea) {
  const maxAge = 200;

  const speed = 1000;

  let alive = false;

  let direction = "left";

  const sequences = {
    left: {
      x: 286,
      y: 0,
      width: 32,
      height: 17,
      count: 5,
      flip: 1,
      timing: 100,
      loop: true,
    },
    right: {
      x: 2,
      y: 0,
      width: 32,
      height: 17,
      count: 5,
      flip: 0,
      timing: 100,
      loop: true,
    },
    idle: {
      x: 0,
      y: 18,
      width: 1,
      height: 1,
      count: 1,
      flip: 0,
      timing: 100,
      loop: false,
    },
  };

  // This is the sprite object of the fireball created from the Sprite module.
  const sprite = Sprite(ctx, x, y);

  // The sprite object is configured for the fireball sprite here.
  sprite
    .setSequence(sequences.idle)
    .setScale(2)
    .setShadowScale({ x: 0, y: 0 })
    .useSheet("./assets/range_atk.png");

  // This is the birth time of the fireball for finding its age.
  let birthTime = performance.now();

  // This function gets the age (in millisecond) of the fireball.
  // - `now` - The current timestamp
  const getAge = function (now) {
    return now - birthTime;
  };

  const attack = function (x, y, dir) {
    if (!alive) {
      direction = dir;
      sprite.setSequence(sequences[dir]);
      sprite.setXY(x, y);
      alive = true;
      birthTime = performance.now();
    }
  };

  const update = function (time) {
    if (alive) {
      let { x, y } = sprite.getXY();
      if (time - birthTime > maxAge) {
        sprite.setSequence(sequences.idle);
        alive = false;
      } else {
        switch (direction) {
          case "left":
            x -= speed / 60;
            break;
          case "right":
            x += speed / 60;
            break;
        }
        if (gameArea.isPointInBox(x, y)) sprite.setXY(x, y);
      }
    }
    sprite.update(time);
  };

  // The methods are returned as an object here.
  return {
    getXY: sprite.getXY,
    setXY: sprite.setXY,
    attack: attack,
    getAge: getAge,
    getBoundingBox: sprite.getBoundingBox,
    update: update,
    draw: sprite.draw,
  };
};
