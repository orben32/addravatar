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