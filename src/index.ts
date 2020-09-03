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
    const elements = findAddressNodes(document.body);
    avatars = elements.map(e => addAvatarElement(e as HTMLElement));
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