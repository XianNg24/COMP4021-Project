// This function defines the skeleton module.
// - `ctx` - A canvas context for drawing
// - `x` - The initial x position of the skeleton
// - `y` - The initial y position of the skeleton
// - `color` - The colour of the skeleton
const Skeleton = function (ctx, x, y) {
    let hp = 2;

    // This is the sprite sequences of the skeleton.
    const sequences = {
        idle: { x: 0, y: 0, width: 22, height: 32, flip: 0, count: 13, timing: 200, loop: true },
        right_walk: { x: 0, y: 0, width: 22, height: 32, flip: 0, count: 13, timing: 200, loop: true },
        //right_hit:  { x: 0, y:  0, width: 15, height: 14, flip: 0, count: 7, timing: 200, loop: true },
        right_attack:  { x: 0, y:  67, width: 43, height: 36, flip: 0, count: 18, timing: 100, loop: true },
        left_walk: { x: 0, y: 34, width: 22, height: 32, flip: 0, count: 13, timing: 200, loop: true },
        //left_hit:  { x: 0, y:  0, width: 15, height: 14, flip: 0, count: 7, timing: 200, loop: true },
        left_attack:  { x: 0, y:  104, width: 43, height: 36, flip: 0, count: 18, timing: 100, loop: true },
    };

    // This is the sprite object of the skeleton created from the Sprite module.
    const sprite = Sprite(ctx, x, y);

    // The sprite object is configured for the skeleton sprite here.
    sprite.setSequence(sequences['left_walk'])
        .setScale(2)
        .setShadowScale({ x: 0.75, y: 0.2 })
        .useSheet("./assets/skeleton.png");

    // This is the birth time of the skeleton for finding its age.
    let birthTime = performance.now();

    // This function gets the age (in millisecond) of the skeleton.
    // - `now` - The current timestamp
    const getAge = function (now) {
        return now - birthTime;
    };

    // This function sets the hp of skeleton according to the players damage
    const hit = function (dmg) {
        hp = hp - dmg;
    }

    // This function gets the hp of skeleton
    const getHp = function () {
        return hp;
    }

    // This function randomizes the skeleton position.
    // - `area` - The area that the skeleton should be located in.
    const randomize = function (area, index) {
        /* Randomize the position */
        while (true) {
            const { x, y } = area.randomPoint();
            if (x <= 90 || y <= 165 || x >= 770 || y >= 390) {
                sprite.setXY(x, y);
                break;
            }
        }
        hp = 2;
        communicate(index);
    };

    const communicate = function (index) {
        const loc = sprite.getXY();
        const jsonData = JSON.stringify({
          skeleton: index,
          x: loc.x,
          y: loc.y,
        });
        fetch("/skeleton", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: jsonData,
        });
      };

    // This function moves the skeleton to the coordinate. 
    // coord is the player coordinate
    const move = function (playerXY, playerBoundingBox) {
        const skeletonBoundingBox = sprite.getBoundingBox();
        const curr_seq = sprite.getSequence();
        const speed = 0.2;

        if (!skeletonBoundingBox.intersect(playerBoundingBox)) {
            let skeletonXY = sprite.getXY();

            if (skeletonXY.x >= playerXY.x) {
                if (curr_seq != sequences['left_walk'])
                    sprite.setSequence(sequences['left_walk']);
                skeletonXY.x = skeletonXY.x - speed;
            }
            else if ((skeletonXY.x < playerXY.x)) {
                if (curr_seq != sequences['right_walk'])
                    sprite.setSequence(sequences['right_walk']);
                skeletonXY.x = skeletonXY.x + speed;
            }

            if (skeletonXY.y >= playerXY.y)
                skeletonXY.y = skeletonXY.y - speed;
            else if ((skeletonXY.y < playerXY.y))
                skeletonXY.y = skeletonXY.y + speed;

            sprite.setXY(skeletonXY.x, skeletonXY.y);
        } else {
            if (curr_seq != sequences['right_attack'] || curr_seq != sequences['left_attack']) {
                if (curr_seq === sequences['right_walk'])
                    sprite.setSequence(sequences['right_attack']);
                else if (curr_seq === sequences['left_walk'])
                sprite.setSequence(sequences['left_attack']);
            }
        }
    }

    // The methods are returned as an object here.
    return {
        getXY: sprite.getXY,
        setXY: sprite.setXY,
        hit: hit,
        getHp: getHp,
        getAge: getAge,
        getBoundingBox: sprite.getBoundingBox,
        randomize: randomize,
        move: move,
        draw: sprite.draw,
        update: sprite.update
    };
};
