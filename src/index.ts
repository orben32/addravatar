import { findAddressNodes } from "./nodeQueries";
import { createAvatarSource } from "./avatarSourceFactory";
import { createAvatarElement, addAvatarElement } from "./avatarElementFactory";

function component() {
    const element = document.createElement('div');

    element.innerHTML = 'hello3';
  
    return element;
}

function removeAvatars(elements: Element[]) {
  for (const element of elements) {
    element.parentElement.removeChild(element);
  }
}
  
document.body.appendChild(component());

console.log('hello');

let avatars: Element[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).findAddressElements = () => findAddressNodes(document.body);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).createAvatarSource = createAvatarSource;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).createAvatarElement = createAvatarElement;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).addAvatarElement = addAvatarElement;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).addAvatars = function() {
  if (avatars) {
    removeAvatars(avatars);
  }
  const elements = findAddressNodes(document.body);
  avatars = elements.map(e => addAvatarElement(e as HTMLElement));
};