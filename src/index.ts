import { addAvatars, removeAvatars } from "./avatarStore";

function createExtension() {
  window.chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action == 'add_avatars') {
      addAvatars();
    } else if (msg.action == 'hide_avatars') {
      removeAvatars();  
    }
  });

  let oldHref = document.location.href;
  window.addEventListener('load', () => {
    const bodyList = document.querySelector("body")
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
  });
}

createExtension();