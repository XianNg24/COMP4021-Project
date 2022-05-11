// This function defines the slime module.
// - `ctx` - A canvas context for drawing
// - `x` - The initial x position of the slime
// - `y` - The initial y position of the slime
// - `color` - The colour of the slime
const Slime = function (ctx, x, y) {
    let hp = 1;
    let phase = 0;
    const loc = [
        [{ x: 0, y: 80 }, { x: 820, y: 80 }, { x: 200, y: 450 }],
        [{ x: 820, y: 200 }, { x: 0, y: 150 }, { x: 500, y: 450 }],
        [{ x: 0, y: 300 }, { x: 820, y: 100 }, { x: 700, y: 450 }],
        [{ x: 820, y: 267 }, { x: 0, y: 60 }, { x: 180, y: 450 }],
        [{ x: 0, y: 188 }, { x: 820, y: 288 }, { x: 169, y: 450 }],
        [{ x: 820, y: 400 }, { x: 0, y: 333 }, { x: 727, y: 450 }],
        [{ x: 0, y: 450 }, { x: 820, y: 323 }, { x: 622, y: 450 }],
        [{ x: 820, y: 222 }, { x: 0, y: 133 }, { x: 666, y: 121 }],
        [{ x: 820, y: 211 }, { x: 0, y: 222 }, { x: 80, y: 450 }],
        [{ x: 0, y: 450 }, { x: 820, y: 400 }, { x: 555, y: 60 }],
    ];

    // This is the sprite sequences of the slime.
    const sequences = {
        idle: { x: 0, y: 0, width: 15, height: 14, flip: 0, count: 7, timing: 200, loop: true },
        dead: { x: 0, y: 16, width: 15, height: 15, flip: 0, count: 7, timing: 200, loop: false },
    };

    // This is the sprite object of the slime created from the Sprite module.
    const sprite = Sprite(ctx, x, y);

    // The sprite object is configured for the slime sprite here.
    sprite.setSequence(sequences['idle'])
        .setScale(2)
        .setShadowScale({ x: 0.75, y: 0.2 })
        .useSheet("./assets/slime.png");

    // This is the birth time of the slime for finding its age.
    let birthTime = performance.now();

    // This function gets the age (in millisecond) of the slime.
    // - `now` - The current timestamp
    const getAge = function (now) {
        return now - birthTime;
    };

    // This function sets the hp of slime according to the players damage
    const hit = function (dmg) {
        hp = hp - dmg;
    }

    // This function gets the hp of slime
    const getHp = function () {
        return hp;
    }

    // This function randomizes the slime position.
    // - `area` - The area that the slime should be located in.
    const randomize = function (index) {
        /* Randomize the position */
        if (phase >= 3)
            phase = 0;
        sprite.setXY(loc[index][phase].x, loc[index][phase].y);
        hp = 1;
        phase++;
    };

    // This function moves the slime to the coordinate. 
    // coord is the player coordinate
    const move = function (playerXY, playerBoundingBox) {
        const slimeBoundingBox = sprite.getBoundingBox();
        const speed = 0.1;

        if (!slimeBoundingBox.intersect(playerBoundingBox)) {
            let slimeXY = sprite.getXY();
            if (slimeXY.x >= playerXY.x)
                slimeXY.x = slimeXY.x - speed;
            else if ((slimeXY.x < playerXY.x))
                slimeXY.x = slimeXY.x + speed;

            if (slimeXY.y >= playerXY.y)
                slimeXY.y = slimeXY.y - speed;
            else if ((slimeXY.y < playerXY.y))
                slimeXY.y = slimeXY.y + speed;

            sprite.setXY(slimeXY.x, slimeXY.y);
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
