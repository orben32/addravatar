import throttle from "lodash/throttle";
import some from "lodash/some";
import every from "lodash/every";
import { updateAvatars } from "./avatarStore";

const isAvatar = (element: HTMLElement) =>
  element.className === "addravatar-avatar";

const hasAllAvatars = (nodeList: NodeList) =>
  every(Array.from(nodeList), (node) => isAvatar(node as HTMLElement));

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

export function observeUpdates(): void {
  const updateThrottled = throttle(updateAvatars, 50);

  updateAvatars();

  const observer = new MutationObserver((mutations) => {
    if (some(mutations, (mutation) => !isSelfMutation(mutation))) {
      updateThrottled();
    }
  });

  observer.observe(document.querySelector("body"), {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
  });
  document.body.addEventListener("change", () => {
    updateThrottled();
  });
  document.body.addEventListener("keyup", () => {
    updateThrottled();
  });
}
