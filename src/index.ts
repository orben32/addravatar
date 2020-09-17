import { findAddressNodes } from "./nodeQueries";
import { addAvatarElement } from "./avatarElementFactory";

function createExtension() {
  let avatars: Element[];

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

  window.chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action == 'add_avatars') {
      addAvatars();
    } else if (msg.action == 'hide_avatars') {
      removeAvatars();  
    }
  });
}

createExtension();