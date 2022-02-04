import { setupGround, updateGround } from "./GameObjects/ground.js";
import {
  setupDino,
  updateDino,
  getDinoRect,
  setDinoLose
} from "./GameObjects/dino.js";
import {
  setupCactus,
  updateCactus,
  getCactusRects
} from "./GameObjects/cactus.js";

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.00001;

const worldElement = document.querySelector("[data-world]");
const scoreElement = document.querySelector("[data-score]");
const startPromptElement = document.querySelector("[data-start-prompt]");

setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);
document.addEventListener("keydown", handleStart, { once: true });

let prevTime = null;
let speedScale = 1;
let score = 0;

function update(time) {
  if (prevTime === null) {
    prevTime = time;
    window.requestAnimationFrame(update);
    return;
  }

  const delta = time - prevTime;
  updateGround(delta, speedScale);
  updateDino(delta, speedScale);
  updateCactus(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);

  if (checkLose()) {
    return handleLose();
  }

  prevTime = time;
  window.requestAnimationFrame(update);
}

function checkLose() {
  const dinoRect = getDinoRect();
  return getCactusRects().some((cactusRect) =>
    isCollision(dinoRect, cactusRect)
  );
}

function isCollision(rectA, rectB) {
  return (
    rectA.left < rectB.right &&
    rectA.top < rectB.bottom &&
    rectA.right > rectB.left &&
    rectA.bottom > rectB.top
  );
}

function updateScore(delta) {
  score += delta + 0.01;
  scoreElement.textContent = Math.floor(score);
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE;
}

function handleStart() {
  prevTime = null;
  speedScale = 1;
  score = 0;
  setupGround();
  setupDino();
  setupCactus();
  startPromptElement.classList.add("hide");
  window.requestAnimationFrame(update);
}

function handleLose() {
  setDinoLose();
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true });
    startPromptElement.classList.remove("hide");
  }, 100);
}

function setPixelToWorldScale() {
  let worldToPixelScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
  }

  worldElement.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
  worldElement.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}
