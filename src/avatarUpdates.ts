import debounce from "lodash/debounce";
import { removeAvatars, updateAvatars } from "./avatarStore";

const isAvatar = (element: HTMLElement) =>
  element.className === "addravatar-avatar";

const hasAllAvatars = (nodeList: NodeList) =>
  Array.from(nodeList).every((node) => isAvatar(node as HTMLElement));

const isSelfMutation = (mutation: MutationRecord) => {
  if (isAvatar(mutation.target as HTMLElement)) {
    return true;
  }
  if (mutation.type !== "childList") {
    return false;
  }
  return (
    hasAllAvatars(mutation.addedNodes) && hasAllAvatars(mutation.removedNodes)
  );
};

const updateDebounced = debounce(updateAvatars, 500);
let observer: MutationObserver;

export function observeUpdates(): void {
  updateAvatars();

  observer = new MutationObserver((mutations) => {
    if (mutations.some((mutation) => !isSelfMutation(mutation))) {
      updateDebounced();
    }
  });

  observer.observe(document.querySelector("body"), {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
  });
  document.body.addEventListener("change", onUpdate);
  document.body.addEventListener("keyup", onUpdate);
}

export function onUpdate(): void {
  updateDebounced();
}

export function disconnect(): void {
  removeAvatars();
  if (observer) {
    observer.disconnect();
  }

  document.body.removeEventListener("change", onUpdate);
  document.body.removeEventListener("keyup", onUpdate);
}
