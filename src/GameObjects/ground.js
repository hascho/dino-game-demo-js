import {
  getCustomPropertyAsFloat,
  incrementCustomProperty,
  setCustomProperty
} from "./utils.js";

const SPEED = 0.05;
const GROUND_LEFT_PROPERTY = "--left";
const groundElements = document.querySelectorAll("[data-ground]");

export function setupGround() {
  if (groundElements.length) {
    setCustomProperty(groundElements[0], GROUND_LEFT_PROPERTY, 0);
    setCustomProperty(groundElements[1], GROUND_LEFT_PROPERTY, 300);
  }
}

export function updateGround(delta, speedScale) {
  const increment = delta * speedScale * SPEED * -1;
  groundElements.forEach((ground) => {
    incrementCustomProperty(ground, GROUND_LEFT_PROPERTY, increment);

    if (getCustomPropertyAsFloat(ground, GROUND_LEFT_PROPERTY) <= -300) {
      incrementCustomProperty(ground, GROUND_LEFT_PROPERTY, 600);
    }
  });
  return delta;
}
