// This function defines the Player module.
// - `ctx` - A canvas context for drawing
// - `x` - The initial x position of the player
// - `y` - The initial y position of the player
// - `gameArea` - The bounding box of the game area
const Player = function(ctx, x, y, gameArea, color, name) {

    // This is the sprite sequences of the player facing different directions.
    // It contains the idling sprite sequences `idleLeft`, `idleUp`, `idleRight` and `idleDown`,
    // and the moving sprite sequences `moveLeft`, `moveUp`, `moveRight` and `moveDown`.
    const sequences = {
        /* Idling sprite sequences for facing different directions */
        idleLeft:  { x: 840, y: 0, width: 56, height: 44, flip: 1, count: 6, timing: 100, loop: true },
        idleRight: { x: 0, y: 0, width: 56, height: 44, flip: 0, count: 6, timing: 100, loop: true },

        /* Moving sprite sequences for facing different directions */
        moveLeft:  { x: 840, y: 112, width: 56, height: 44, flip: 1, count: 8, timing: 100, loop: true },
        moveRight: { x: 0, y: 112, width: 56, height: 44, flip: 0, count: 8, timing: 100, loop: true }
    };

    // This is the sprite object of the player created from the Sprite module.
    const sprite = Sprite(ctx, x, y);

    // The sprite object is configured for the player sprite here.
    sprite.setSequence(sequences.idleLeft)
          .setScale(2)
          .setShadowScale({ x: 0.5, y: 0.10 })
          .setName({ name: name, x: 0.25, y: 0.2 })
          .useSheet(`long_char_${color}_1.png`);

    // This is the moving direction, which can be a number from 0 to 4:
    // - `0` - not moving
    // - `1` - moving to the left
    // - `2` - moving up
    // - `3` - moving to the right
    // - `4` - moving down
    let direction = 0;

    // This record the direction of character, which can be either 0 or 1:
    // - `0` - face to left
    // - `1` - face to right
    let face = 0;

    // This is the moving speed (pixels per second) of the player
    let speed = 150;

    // This function sets the player's moving direction.
    // - `dir` - the moving direction (1: Left, 2: Up, 3: Right, 4: Down)
    const move = function(dir) {
        if (dir >= 1 && dir <= 4 && dir != direction) {
            // let direct = dir
            // if (direct == 2 || direct == 4) direct = direction
            switch (dir) {
                case 1: face = 0; break;
                case 3: face = 1; break;
            }
            switch (face) {
                case 0: sprite.setSequence(sequences.moveLeft); break;
                case 1: sprite.setSequence(sequences.moveRight); break;
            }
            direction = dir;
        }
    };

    // This function stops the player from moving.
    // - `dir` - the moving direction when the player is stopped (1: Left, 2: Up, 3: Right, 4: Down)
    const stop = function(dir) {
        if (direction == dir) {
            switch (face) {
                case 0: sprite.setSequence(sequences.idleLeft); break;
                case 1: sprite.setSequence(sequences.idleRight); break;
            }
            direction = 0;
        }
    };

    // This function speeds up the player.
    const speedUp = function() {
        speed = 250;
    };

    // This function slows down the player.
    const slowDown = function() {
        speed = 150;
    };

    // This function updates the player depending on his movement.
    // - `time` - The timestamp when this function is called
    const update = function(time) {
        /* Update the player if the player is moving */
        if (direction != 0) {
            let { x, y } = sprite.getXY();

            /* Move the player */
            switch (direction) {
                case 1: x -= speed / 60; break;
                case 2: y -= speed / 60; break;
                case 3: x += speed / 60; break;
                case 4: y += speed / 60; break;
            }

            /* Set the new position if it is within the game area */
            if (gameArea.isPointInBox(x, y))
                sprite.setXY(x, y);
        }

        /* Update the sprite object */
        sprite.update(time);
    };

    // The methods are returned as an object here.
    return {
        move: move,
        stop: stop,
        speedUp: speedUp,
        slowDown: slowDown,
        getBoundingBox: sprite.getBoundingBox,
        draw: sprite.draw,
        update: update
    };
};
