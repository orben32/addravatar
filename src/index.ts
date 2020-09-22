import { findAddressNodes } from "./nodeQueries";
import { addAvatarElement } from "./avatarElementFactory";
import { getStyle } from './globalStyleDefinition';

function createExtension() {
  let avatars: Element[];
  let injectedStyle: HTMLStyleElement | null = null;

  function removeAvatars() {
    if (avatars) {
      for (const element of avatars) {
        element.parentElement.removeChild(element);
      }
      avatars = null;
    }

    if (injectedStyle) {
      injectedStyle.parentElement.removeChild(injectedStyle);
      injectedStyle = null;
    }
  }  

  const injectGlobalStyle = () => {
    injectedStyle = document.createElement('style');
    injectedStyle.innerHTML = getStyle();
    const ref = document.querySelector('script');
    ref.parentNode.insertBefore(injectedStyle, ref);
  }

  const addAvatars = function() {
    removeAvatars();
    injectGlobalStyle();
    
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