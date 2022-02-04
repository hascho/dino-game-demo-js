export function getCustomPropertyAsFloat(elem, prop) {
  return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0;
}

export function setCustomProperty(elem, prop, value) {
  elem.style.setProperty(prop, value);
}

export function incrementCustomProperty(elem, prop, increment) {
  const incremented = getCustomPropertyAsFloat(elem, prop) + increment;
  setCustomProperty(elem, prop, incremented);
}
