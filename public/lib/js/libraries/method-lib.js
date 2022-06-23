"use strict";

export function addEvent(item, eventFunction) {
  item.addEventListener('click', (event) => {
    event.preventDefault();
    eventFunction();
  });
}