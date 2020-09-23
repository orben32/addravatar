import { removeAvatars } from "./avatarStore";

export function observeUpdates(): void {
    let oldHref = document.location.href;
    const bodyList = document.querySelector('body');
    const observer = new MutationObserver(() => {
      if (oldHref != document.location.href) {
        oldHref = document.location.href;
        removeAvatars();
      }
    });

    const config = {
      childList: true,
      subtree: true
    };

    observer.observe(bodyList, config);
}