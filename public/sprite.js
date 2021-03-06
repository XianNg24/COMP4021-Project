// This function defines a Sprite module.
// - `ctx` - A canvas context for drawing
// - `x` - The initial x position of the sprite
// - `y` - The initial y position of the sprite
const Sprite = function (ctx, x, y) {
  // This is the image object for the sprite sheet.
  const sheet = new Image();

  // This is an object containing the sprite sequence information used by the sprite containing:
  // - `x` - The starting x position of the sprite sequence in the sprite sheet
  // - `y` - The starting y position of the sprite sequence in the sprite sheet
  // - `width` - The width of each sprite image
  // - `height` - The height of each sprite image
  // - `count` - The total number of sprite images in the sequence
  // - `timing` - The timing for each sprite image
  // - `loop` - `true` if the sprite sequence is looped
  let sequence = {
    x: 0,
    y: 0,
    width: 20,
    height: 20,
    flip: 0,
    count: 1,
    timing: 0,
    loop: false,
  };

  // This is the index indicating the current sprite image used in the sprite sequence.
  let index = 0;

  // This is the scaling factor for drawing the sprite.
  let scale = 1;

  // This is the scaling factor to determine the size of the shadow, relative to the scaled sprite image size.
  // - `x` - The x scaling factor
  // - `y` - The y scaling factor
  let shadowScale = { x: 1, y: 0.25 };

  // This is the updated time of the current sprite image.
  // It is used to determine the timing to switch to the next sprite image.
  let lastUpdate = 0;

  // This is to determine if it is player
  let isPlayer = false;

  // This give a player name
  let player = { name: "player", x: 0.2, y: 0 };

  // This is to check if animation is done
  let animationDone = false;

  // This function uses a new sprite sheet in the image object.
  // - `spriteSheet` - The source of the sprite sheet (URL)
  const useSheet = function (spriteSheet) {
    sheet.src = spriteSheet;
    return this;
  };

  // This function returns the readiness of the sprite sheet image.
  const isReady = function () {
    return sheet.complete && sheet.naturalHeight != 0;
  };

  // This function gets the current sprite position.
  const getXY = function () {
    return { x, y };
  };

  // This function sets the sprite position.
  // - `xvalue` - The new x position
  // - `yvalue` - The new y position
  const setXY = function (xvalue, yvalue) {
    [x, y] = [xvalue, yvalue];
    return this;
  };

  // Getter and setter function for animationDone
  const getAnimationDone = function () {
    return animationDone;
  };

  const setAnimationDone = function (state) {
    animationDone = state;
  }

  // This function sets the sprite sequence.
  // - `newSequence` - The new sprite sequence to be used by the sprite
  const setSequence = function (newSequence) {
    sequence = newSequence;
    index = 0;
    lastUpdate = 0;
    return this;
  };

  // This function sets the scaling factor of the sprite.
  // - `value` - The new scaling factor
  const setScale = function (value) {
    scale = value;
    return this;
  };

  // This function sets the scaling factor of the sprite shadow.
  // - `value` - The new scaling factor as an object
  //   - `value.x` - The x scaling factor
  //   - `value.y` - The y scaling factor
  const setShadowScale = function (value) {
    shadowScale = value;
    return this;
  };

  // This function sets the player name
  //   -  `value.name` - The name of player
  //   -  `value.x` - The x scaling factor for display
  //   -  `value.y` - The y scaling factor for display
  const setName = function (value) {
    isPlayer = true;
    player = value;

    return this;
  };

  // This function gets the current sprite sequence.
  const getSequence = function () {
    return sequence;
  };

  // This function gets the display size of the sprite.
  const getDisplaySize = function () {
    /* Find the scaled width and height of the sprite */
    const scaledWidth = sequence.width * scale;
    const scaledHeight = sequence.height * scale;
    return { width: scaledWidth, height: scaledHeight };
  };

  // This function gets the bounding box of the sprite.
  const getBoundingBox = function (padding_h = 0, padding_v = 0) {
    /* Get the display size of the sprite */
    const size = getDisplaySize();

    /* Find the box coordinates */
    const top = y - size.height / 2 - padding_v;
    const left = x - size.width / 2 - padding_h;
    const bottom = y + size.height / 2 + padding_v;
    const right = x + size.width / 2 + padding_h;

    if(!animationDone && !sequence.loop)
      return BoundingBox(ctx, -200, -200, -201, -201);
    else
      return BoundingBox(ctx, top, left, bottom, right);
  };

  // This function draws shadow underneath the sprite.
  const drawShadow = function () {
    /* Save the settings */
    ctx.save();

    /* Get the display size of the sprite */
    const size = getDisplaySize();

    /* Find the scaled width and height of the shadow */
    const shadowWidth = size.width * shadowScale.x;
    const shadowHeight = size.height * shadowScale.y;

    /* Draw a semi-transparent oval */
    ctx.fillStyle = "black";
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.ellipse(
      x,
      y + size.height / 2,
      shadowWidth / 2,
      shadowHeight / 2,
      0,
      0,
      2 * Math.PI
    );
    ctx.fill();

    /* Restore saved settings */
    ctx.restore();
  };

  // This function draws name above the sprite.
  const drawName = function () {
    /* Save the settings */
    ctx.save();

    /* Get the display size of the sprite */
    const size = getDisplaySize();

    /* Find the scaled width and height of the name */
    const shadowWidth = size.width;
    const shadowHeight = size.height;

    /* Draw a semi-transparent oval */
    ctx.strokeStyle = "yellow";
    ctx.globalAlpha = 0.6;
    ctx.font = "20px Arial";
    context.fillStyle = "#FFFFFF";
    ctx.fillText(
      player.name,
      x - size.width / 2 + size.width * player.x,
      y - size.height / 2 + size.height * player.y
    );

    /* Restore saved settings */
    ctx.restore();
  };

  // This function draws the sprite.
  const drawSprite = function () {
    /* Save the settings */
    ctx.save();

    /* Get the display size of the sprite */
    const size = getDisplaySize();

    /* TODO */
    /* Replace the following code to draw the sprite correctly */
    // ctx.fillStyle = "red";
    // ctx.globalAlpha = 0.6;
    // ctx.fillRect(parseInt(x - size.width / 2), parseInt(y - size.height / 2),
    //              size.width, size.height);
    // console.log(sequence)
    // sheet.onload = function() {
    //     requestAnimationFrame(doFrame);
    // }
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
      sheet,
      sequence.x + (-1) ** sequence.flip * index * sequence.width,
      sequence.y,
      sequence.width,
      sequence.height,
      parseInt(x - size.width / 2),
      parseInt(y - size.height / 2),
      size.width,
      size.height
    );

    /* Restore saved settings */
    ctx.restore();
  };

  // This function draws the shadow and the sprite.
  const draw = function () {
    if (isReady()) {
      if (isPlayer) drawName();
      drawShadow();
      drawSprite();
    }
    return this;
  };

  // This function updates the sprite by moving to the next sprite
  // at appropriate time.
  // - `time` - The timestamp when this function is called
  const update = function (time) {
    if (lastUpdate == 0) lastUpdate = time;

    /* TODO */
    /* Move to the next sprite when the timing is right */

    const size = getDisplaySize();

    if (time - lastUpdate >= sequence.timing) {
      animationDone = false;
      lastUpdate = time;
      index++;
      if (index >= sequence.count) {
        index = 0;
        if(!sequence.loop)
          animationDone = true;
      }
    }

    return this;
  };

  const getIndex = function () {
    return index;
  };

  // The methods are returned as an object here.
  return {
    useSheet: useSheet,
    getXY: getXY,
    setXY: setXY,
    setSequence: setSequence,
    setScale: setScale,
    setShadowScale: setShadowScale,
    setName: setName,
    getDisplaySize: getDisplaySize,
    getBoundingBox: getBoundingBox,
    getAnimationDone: getAnimationDone,
    setAnimationDone: setAnimationDone,
    getSequence: getSequence,
    getIndex: getIndex,
    isReady: isReady,
    draw: draw,
    update: update,
  };
};
