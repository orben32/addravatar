import { observeUpdates, disconnect } from "./avatarUpdates";

function createExtension() {
  window.chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action == 'add_avatars') {
      observeUpdates();
    } else if (msg.action == 'hide_avatars') {
      disconnect();
    }
  });

  window.addEventListener('load', () => {
    window.chrome.storage.sync.get((items) => {
      if (items.showAvatars !== false) {
        observeUpdates();
      }
    });
  });
}

createExtension();