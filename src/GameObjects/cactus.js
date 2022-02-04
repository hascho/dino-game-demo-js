import {
  getCustomPropertyAsFloat,
  incrementCustomProperty,
  setCustomProperty
} from "./utils";

const CACTUS_ASSET_PATH = "assets/img/cactus.png";
const SPEED = 0.05;
const CACTUS_INTERVAL_MIN = 500;
const CACTUS_INTERVAL_MAX = 2000;
const CACTUS_LEFT_PROPERTY = "--left";

const worldElement = document.querySelector("[data-world]");

let nextCactusTime;

export function setupCactus() {
  nextCactusTime = CACTUS_INTERVAL_MIN;
  document.querySelectorAll("[data-cactus]").forEach((cactus) => {
    cactus.remove();
  });
}

export function updateCactus(delta, speedScale) {
  const increment = delta * speedScale * SPEED * -1;
  document.querySelectorAll("[data-cactus]").forEach((cactus) => {
    incrementCustomProperty(cactus, CACTUS_LEFT_PROPERTY, increment);

    if (getCustomPropertyAsFloat(cactus, CACTUS_LEFT_PROPERTY) <= -100) {
      cactus.remove();
    }
  });

  if (nextCactusTime <= 0) {
    createCactus();
    nextCactusTime =
      randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) /
      speedScale;
  }
  nextCactusTime -= delta;
}

export function getCactusRects() {
  return [...document.querySelectorAll("[data-cactus]")].map((cactus) =>
    cactus.getBoundingClientRect()
  );
}

function createCactus() {
  const cactus = document.createElement("img");
  cactus.dataset.cactus = true;
  cactus.src = CACTUS_ASSET_PATH;
  cactus.classList.add("cactus");
  setCustomProperty(cactus, CACTUS_LEFT_PROPERTY, 100);
  worldElement.append(cactus);
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
