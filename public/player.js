// This function defines the Player module.
// - `ctx` - A canvas context for drawing
// - `x` - The initial x position of the player
// - `y` - The initial y position of the player
// - `gameArea` - The bounding box of the game area
const Player = function (ctx, x, y, gameArea, color, name) {
  // This is the sprite sequences of the player facing different directions.
  // It contains the idling sprite sequences `idleLeft`, `idleUp`, `idleRight` and `idleDown`,
  // and the moving sprite sequences `moveLeft`, `moveUp`, `moveRight` and `moveDown`.
  const sequences = {
    /* Idling sprite sequences for facing different directions */
    idleLeft: {
      x: 840,
      y: 0,
      width: 56,
      height: 44,
      flip: 1,
      count: 6,
      timing: 100,
      loop: true,
    },
    idleRight: {
      x: 0,
      y: 0,
      width: 56,
      height: 44,
      flip: 0,
      count: 6,
      timing: 100,
      loop: true,
    },

    /* Moving sprite sequences for facing different directions */
    moveLeft: {
      x: 840,
      y: 112,
      width: 56,
      height: 44,
      flip: 1,
      count: 8,
      timing: 100,
      loop: true,
    },
    moveRight: {
      x: 0,
      y: 112,
      width: 56,
      height: 44,
      flip: 0,
      count: 8,
      timing: 100,
      loop: true,
    },

    /* Attack */
    attackLeft: {
      x: 840,
      y: 56,
      width: 56,
      height: 44,
      flip: 1,
      count: 8,
      timing: 100,
      loop: true,
    },
    attackRight: {
      x: 0,
      y: 56,
      width: 56,
      height: 44,
      flip: 0,
      count: 8,
      timing: 100,
      loop: true,
    },
    deadLeft: {
      x: 840,
      y: 392,
      width: 56,
      height: 44,
      flip: 1,
      count: 4,
      timing: 100,
      loop: false,
    },
    deadRight: {
      x: 0,
      y: 392,
      width: 56,
      height: 44,
      flip: 0,
      count: 4,
      timing: 100,
      loop: false,
    },
  };

  // This is the sprite object of the player created from the Sprite module.
  const sprite = Sprite(ctx, x, y);
  //   const fireball = Fireball(ctx, x, y, gameArea);

  // The sprite object is configured for the player sprite here.
  sprite
    .setSequence(sequences.idleLeft)
    .setScale(2)
    .setShadowScale({ x: 0.5, y: 0.1 })
    .setName({ name: name, x: 0.25, y: 0.2 })
    .useSheet(`./assets/long_char_${color}_1.png`);

  // This is the moving direction, which can be a number from 0 to 4:
  // - `0` - not moving
  // - `1` - moving to the left
  // - `2` - moving up
  // - `3` - moving to the right
  // - `4` - moving down
  let direction = 0;

  // This records the action of player and will be sent to other player.
  // - ["idleLeft", "idleRight", "moveLeft", "moveRight", "attackLeft", "attackRight"]
  let status = "idleLeft";

  // This record the direction of character, which can be either 0 or 1:
  // - `0` - face to left
  // - `1` - face to right
  let face = 0;

  // This is the moving speed (pixels per second) of the player
  let speed = 150;

  // This determine whether it is attacking
  let isAttack = false;

  // This depend on sword
  let fireballAttack = false;

  // This determine whether it is alive
  let alive = true;

  // This give a status to the player that no enemies can hurt
  let muteki = false;

  // This record the deadtime
  let deadTimeStamp;

  // This record the muteki time
  let mutekiTimeStamp;

  // This constant give how long will it last for dead and muteki status
  const deadTime = 2000;
  const mutekiTime = 2000;

  // Cheating mode
  let goldfinger = false;
  // This is the damage of players attack
  let dmg = 1; 

  // This is the Hp of player
  let hp = 3;

  const getDmg = function () {
    return dmg;
  }

  // This function sets the hp of slime and kills it
  const setHp = function (dmg) {
    hp = hp - dmg;
  }

  // This function gets the hp of slime
  const getHp = function () {
    return hp;
  }

  const fireball = function () {
    const dir = face ? "right" : "left";
    return { fireballAttack, dir };
  };

  // This function sets the player's moving direction.
  // - `dir` - the moving direction (1: Left, 2: Up, 3: Right, 4: Down)
  const move = function (dir) {
    if (dir >= 1 && dir <= 4 && dir != direction && !isAttack && alive) {
      // let direct = dir
      // if (direct == 2 || direct == 4) direct = direction
      switch (dir) {
        case 1:
          face = 0;
          break;
        case 3:
          face = 1;
          break;
      }
      switch (face) {
        case 0:
          sprite.setSequence(sequences.moveLeft);
          status = 2;
          break;
        case 1:
          sprite.setSequence(sequences.moveRight);
          status = 3;
          break;
      }
      direction = dir;
    }
  };

  // This function stops the player from moving.
  // - `dir` - the moving direction when the player is stopped (1: Left, 2: Up, 3: Right, 4: Down)
  const stop = function (dir) {
    if (direction == dir && alive) {
      if (!isAttack)
        switch (face) {
          case 0:
            sprite.setSequence(sequences.idleLeft);
            status = "idleLeft";
            break;
          case 1:
            sprite.setSequence(sequences.idleRight);
            status = "idleRight";
            break;
        }
      direction = 0;
    }
  };

  const attack = function () {
    switch (face) {
      case 0:
        sprite.setSequence(sequences.attackLeft);
        status = "attackLeft";
        break;
      case 1:
        sprite.setSequence(sequences.attackRight);
        status = "attackRight";
        break;
    }
  };

  const dead = function () {
    switch (face) {
      case 0:
        sprite.setSequence(sequences.deadLeft);
        status = "deadLeft";
        break;
      case 1:
        sprite.setSequence(sequences.deadRight);
        status = "deadRight";
        break;
    }
    console.log('dead');
  };

  const stopAttack = function () {
    switch (face) {
      case 0:
        sprite.setSequence(sequences.idleLeft);
        status = "idleLeft";
        break;
      case 1:
        sprite.setSequence(sequences.idleRight);
        status = "idleRight";
        break;
    }
    const previous_dir = direction;
    direction = 0;
    move(previous_dir);
  };

  // This function speeds up the player.
  const speedUp = function () {
    speed = 250;
    muteki = true;
    alive = true;
    goldfinger = true;
  };

  // This function slows down the player.
  const slowDown = function () {
    speed = 150;
    muteki = false;
    goldfinger = false;
  };

  const attackStart = function () {
    if (isAttack == false && alive) attack();
    isAttack = true;
  };

  const attackStop = function () {
    isAttack = false;
    if (alive) stopAttack(face);
  };

  const deadAct = function (time) {
    if (alive && !muteki) {
      alive = false;
      deadTimeStamp = time;
      dead();
    }
  };

  const resurrection = function (time) {
    alive = true;
    muteki = true;
    mutekiTimeStamp = time;
    stopAttack(face);
    direction = face;
    stop(face);
  };

  const communicate = function () {
    const loc = sprite.getXY();
    const jsonData = JSON.stringify({
      player: "player1",
      x: loc.x,
      y: loc.y,
      status: status,
    });
    fetch("/player", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonData,
    });
  };

  // This function updates the player depending on his movement.
  // - `time` - The timestamp when this function is called
  const update = function (time) {
    /* Update the player if the player is moving */
    let { x, y } = sprite.getXY();
    if (alive) {
      if (muteki && time - mutekiTimeStamp > mutekiTime && !goldfinger) {
        muteki = false;
        console.log('no muteki now')
      }
      if (isAttack) {
        const index = sprite.getIndex();
        fireballAttack = index > 3;
      } else {
        fireballAttack = false;
        if (direction != 0) {
          fireballAttack = false;
          /* Move the player */
          switch (direction) {
            case 1:
              x -= speed / 60;
              break;
            case 2:
              y -= speed / 60;
              break;
            case 3:
              x += speed / 60;
              break;
            case 4:
              y += speed / 60;
              break;
          }

          /* Set the new position if it is within the game area */
          if (gameArea.isPointInBox(x, y)) sprite.setXY(x, y);
        }
      }
    }
    else {
      if (time - deadTimeStamp > deadTime) {
        resurrection(time);
        console.log("resurrection")
      }
    }

    /* Update the sprite object */
    sprite.update(time);
    // fireball.update(time);
    // console.log(status);
    communicate();
  };

  // The methods are returned as an object here.
  return {
    move: move,
    stop: stop,
    speedUp: speedUp,
    slowDown: slowDown,
    attackStart: attackStart,
    attackStop: attackStop,
    deadAct: deadAct,
    resurrection: resurrection,
    fireball: fireball,
    setHp: setHp,
    getHp: getHp,
    getBoundingBox: sprite.getBoundingBox,
    getXY: sprite.getXY,
    getDmg: getDmg,
    draw: sprite.draw,
    update: update,
  };
};
