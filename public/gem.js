// This function defines the Gem module.
// - `ctx` - A canvas context for drawing
// - `x` - The initial x position of the gem
// - `y` - The initial y position of the gem
// - `color` - The colour of the gem
const Gem = function(ctx, x, y, color) {
    const loc = [
        {x: 595, y: 385},
        {x: 159, y: 350},
        {x: 70, y: 110},
        {x: 382, y: 90},
    ]

    let phase = 0;

    // This is the sprite sequences of the gem of four colours
    // `green`, `red`, `yellow` and `purple`.
    const sequences = {
        green:  { x: 192, y:  0, width: 16, height: 16, flip: 0, count: 4, timing: 200, loop: true },
        red:    { x: 192, y: 16, width: 16, height: 16, flip: 0, count: 4, timing: 200, loop: true },
        yellow: { x: 192, y: 32, width: 16, height: 16, flip: 0, count: 4, timing: 200, loop: true },
        purple: { x: 192, y: 48, width: 16, height: 16, flip: 0, count: 4, timing: 200, loop: true }
    };

    // This is the sprite object of the gem created from the Sprite module.
    const sprite = Sprite(ctx, x, y);

    // The sprite object is configured for the gem sprite here.
    sprite.setSequence(sequences[color])
          .setScale(2)
          .setShadowScale({ x: 0.75, y: 0.2 })
          .useSheet("./assets/object_sprites.png");

    // This is the birth time of the gem for finding its age.
    let birthTime = performance.now();

    // This function sets the color of the gem.
    // - `color` - The colour of the gem which can be
    // `"green"`, `"red"`, `"yellow"` or `"purple"`
    const setColor = function(color) {
        sprite.setSequence(sequences[color]);
        birthTime = performance.now();
    };

    // This function gets the age (in millisecond) of the gem.
    // - `now` - The current timestamp
    const getAge = function(now) {
        return now - birthTime;
    };

    // This function randomizes the gem colour and position.
    // - `area` - The area that the gem should be located in.
    const randomize = function() {
        if (phase >= 4)
            phase = 0;

        /* Randomize the color */
        const colors = ["green", "red", "yellow", "purple"];
        setColor(colors[phase]);

        /* Randomize the position */
        sprite.setXY(loc[phase].x, loc[phase].y);
        ++phase;
    };

    // The methods are returned as an object here.
    return {
        getXY: sprite.getXY,
        setXY: sprite.setXY,
        setColor: setColor,
        getAge: getAge,
        getBoundingBox: sprite.getBoundingBox,
        randomize: randomize,
        draw: sprite.draw,
        update: sprite.update
    };
};
