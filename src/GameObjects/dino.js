import {
  getCustomPropertyAsFloat,
  incrementCustomProperty,
  setCustomProperty
} from "./utils";

const DINO_STATIONARY_ASSET_PATH = "assets/img/dino-stationary.png";
const DINO_LOSE_ASSET_PATH = "assets/img/dino-lose.png";
const DINO_BOTTOM_PROPERTY = "--bottom";
const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;
const DINO_FRAME_COUNT = 2;
const FRAME_TIME = 100;

const dinoElement = document.querySelector("[data-dino]");

let isJumping = false;
let dinoFrame = 0;
let currentFrameTime = 0;
let yVelocity = 0;

export function setupDino() {
  console.log("setupDino");
  isJumping = false;
  dinoFrame = 0;
  currentFrameTime = 0;
  yVelocity = 0;
  setCustomProperty(dinoElement, DINO_BOTTOM_PROPERTY, 0);
  document.removeEventListener("keydown", onJump);
  document.addEventListener("keydown", onJump);
}

export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale);
  handleJump(delta, speedScale);
}

export function getDinoRect() {
  return dinoElement.getBoundingClientRect();
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    dinoElement.src = DINO_STATIONARY_ASSET_PATH;
    return;
  }

  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
    dinoElement.src = `assets/img/dino-run-${dinoFrame}.png`;
    currentFrameTime -= FRAME_TIME;
  }
  currentFrameTime += delta * speedScale;
}

export function setDinoLose() {
  dinoElement.src = DINO_LOSE_ASSET_PATH;
}

function handleJump(delta) {
  if (!isJumping) {
    return;
  }

  const increment = yVelocity * delta;
  incrementCustomProperty(dinoElement, DINO_BOTTOM_PROPERTY, increment);

  if (getCustomPropertyAsFloat(dinoElement, DINO_BOTTOM_PROPERTY) <= 0) {
    setCustomProperty(dinoElement, DINO_BOTTOM_PROPERTY, 0);
    isJumping = false;
  }

  yVelocity -= GRAVITY * delta;
}

function onJump(e) {
  if (e.code !== "Space" || isJumping) {
    return;
  }

  yVelocity = JUMP_SPEED;
  isJumping = true;
}
