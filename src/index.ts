import { observeUpdates, disconnect, onUpdate } from "./avatarUpdates";
import { setPlacement } from "./optionsStore";

function createExtension() {
  window.chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action == 'add_avatars') {
      observeUpdates();
    } else if (msg.action == 'hide_avatars') {
      disconnect();
    } else if (msg.action === 'refresh') {
      window.chrome.storage.sync.get((items) => {
        setPlacement(items.placement);
        if (items.showAvatars !== false) {
          onUpdate();
        }
      });   
    }
  });

  window.addEventListener('load', () => {
    window.chrome.storage.sync.get((items) => {
      setPlacement(items.placement);
      if (items.showAvatars !== false) {
        observeUpdates();
      }
    });
  });
}

createExtension();