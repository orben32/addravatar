import { findAddressNodes } from "./nodeQueries";
import { addAvatarElement, updateAvatar } from "./avatarElementFactory";
import { getStyle } from "./globalStyleDefinition";

let avatars: Element[] = [];
let injectedStyle: HTMLStyleElement | null = null;
const avatarToAddressNode: WeakMap<Element, Node> = new WeakMap();
const addressNodeToAvatar: WeakMap<Node, Element> = new WeakMap();

export function removeAvatars(): void {
  if (avatars) {
    for (const element of avatars) {
      element.parentElement.removeChild(element);
      const addressNode = avatarToAddressNode.get(element);
      if (addressNode) {
        addressNodeToAvatar.delete(addressNode);
      }
      avatarToAddressNode.delete(element);
    }
    avatars = null;
  }

  if (injectedStyle) {
    injectedStyle.parentElement.removeChild(injectedStyle);
    injectedStyle = null;
  }
}

const injectGlobalStyle = () => {
  injectedStyle = document.createElement("style");
  injectedStyle.innerHTML = getStyle();
  const ref = document.querySelector("script");
  ref.parentNode.insertBefore(injectedStyle, ref);
};

function updateCurrentAvatars(addressNodes: Node[]) {
  const avatarsToRemove: Element[] = [];
  for (const avatar of avatars) {
    const avatarTargetNode = avatarToAddressNode.get(avatar);
    if (avatarTargetNode) {
      if (addressNodes.includes(avatarTargetNode)) {
        updateAvatar(avatar, avatarTargetNode);
      } else {
        addressNodeToAvatar.delete(avatarTargetNode);
        avatarsToRemove.push(avatar);
      }
    }
  }
  for (const avatarToRemove of avatarsToRemove) {
    avatarToRemove.parentElement.removeChild(avatarToRemove);
    avatarToAddressNode.delete(avatarToRemove);
    avatars = avatars.filter((item) => item !== avatarToRemove);
  }
}

function createNewAvatars(addressNodes: Node[]) {
  for (const addressNode of addressNodes) {
    if (!addressNodeToAvatar.has(addressNode)) {
      const avatar = addAvatarElement(addressNode);
      if (avatars) {
        avatars.push(avatar);
      } else {
        avatars = [avatar];
      }
      avatarToAddressNode.set(avatar, addressNode);
      addressNodeToAvatar.set(addressNode, avatar);
    }
  }
}

export function updateAvatars(): void {
  if (!injectedStyle) {
    injectGlobalStyle();
  }
  const nodes = findAddressNodes(document.body);
  if (avatars) {
    updateCurrentAvatars(nodes);
  }
  createNewAvatars(nodes);
}
