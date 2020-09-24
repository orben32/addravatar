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
  const config = {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
  };

  const updateThrottled = throttle(updateAvatars, 50);
  const bodyList = document.querySelector("body");
  const observer = new MutationObserver((mutations) => {
    if (some(mutations, (mutation) => !isSelfMutation(mutation))) {
      updateThrottled();
    }
  });

  observer.observe(bodyList, config);
  document.body.addEventListener("change", () => {
    updateThrottled();
  });
  document.body.addEventListener("keyup", () => {
    updateThrottled();
  });
}
