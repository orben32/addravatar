import { findAddressNodes } from "./nodeQueries";
import { addAvatarElement } from "./avatarElementFactory";
import { getStyle } from './globalStyleDefinition';

let avatars: Element[];
let injectedStyle: HTMLStyleElement | null = null;

export function removeAvatars(): void {
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

export function addAvatars(): void {
    removeAvatars();
    injectGlobalStyle();

    const nodes = findAddressNodes(document.body);
    avatars = nodes.map(node => addAvatarElement(node));
}