/* eslint-disable @typescript-eslint/no-explicit-any */
import { findAddressNodes } from "./nodeQueries";
import { createAvatarSource } from "./avatarSourceFactory";
import { createAvatarElement, addAvatarElement } from "./avatarElementFactory";

function removeAvatars(elements: Element[]) {
  for (const element of elements) {
    element.parentElement.removeChild(element);
  }
}

console.log('hello');

let avatars: Element[];

(window as any).findAddressElements = () => findAddressNodes(document.body);

(window as any).createAvatarSource = createAvatarSource;

(window as any).createAvatarElement = createAvatarElement;

(window as any).addAvatarElement = addAvatarElement;

(window as any).addAvatars = function() {
  if (avatars) {
    removeAvatars(avatars);
  }
  const elements = findAddressNodes(document.body);
  avatars = elements.map(e => addAvatarElement(e as HTMLElement));
};

(window as any).addAvatars();