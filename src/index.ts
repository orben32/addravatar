import { addAvatars, removeAvatars } from "./avatarStore";
import { observeUpdates } from "./avatarUpdates";

function createExtension() {
  window.chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action == 'add_avatars') {
      addAvatars();
    } else if (msg.action == 'hide_avatars') {
      removeAvatars();  
    }
  });

  window.addEventListener('load', () => {
    observeUpdates();    
  });
}

createExtension();