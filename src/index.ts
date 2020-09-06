import { findAddressNodes } from "./nodeQueries";
import { addAvatarElement } from "./avatarElementFactory";

function createExtension() {
  let avatars: Element[];
  let showAvatars = false;

  function removeAvatars() {
    if (avatars) {
      for (const element of avatars) {
        element.parentElement.removeChild(element);
      }
    }
    avatars = null;
  }  

  const addAvatars = function() {
    if (avatars) {
      removeAvatars();
    }
    const nodes = findAddressNodes(document.body);
    avatars = nodes.map(node => addAvatarElement(node));
  };

  window.chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action == 'add_avatars') {
      showAvatars = !showAvatars;
      if (showAvatars) {
        addAvatars();
      } else {
        removeAvatars();
      }
    }
    sendResponse({ok: true});
  });
}

createExtension();