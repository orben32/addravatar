import { createAvatarSource } from "./avatarSourceFactory";
import { getText } from "./textGetters";

const createPixelValue = (value: number) => `${value}px`;

const avatarWidth = 25;
const zIndex = 9999;

function getBoundingClientRect(node: Node): DOMRect {
    if (node.nodeType === 3) {
        const range = document.createRange();
        range.selectNode(node);
        return range.getBoundingClientRect();
    } else {
        return (node as Element).getBoundingClientRect();
    }
}

export function updateAvatar(avatar: HTMLImageElement, addressNode: Node): void {
    avatar.src = createAvatarSource(getText(addressNode));
    avatar.style.position = 'absolute';
    const clientRect = getBoundingClientRect(addressNode);
    avatar.style.left = createPixelValue(clientRect.left + clientRect.width + 4);
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    avatar.style.top = createPixelValue(clientRect.top - 3 + scrollTop);
    avatar.style.width = createPixelValue(avatarWidth);
    avatar.style.zIndex = String(zIndex);
}

export function createAvatarElement(addressNode: Node): HTMLImageElement {
    const img = document.createElement('img');
    updateAvatar(img, addressNode);
    img.classList.add('addravatar-avatar');

    img.addEventListener('mouseenter', e => {
        (e.target as HTMLElement).style.width = createPixelValue(avatarWidth * 2);
        (e.target as HTMLElement).style.zIndex = String(zIndex + 1);
    });

    img.addEventListener('mouseleave', e => {
        (e.target as HTMLElement).style.width = createPixelValue(avatarWidth);
        (e.target as HTMLElement).style.zIndex = String(zIndex);
    });

    return img;
}

export function addAvatarElement(addressNode: Node): HTMLImageElement {
    const avatarElement = createAvatarElement(addressNode);
    document.body.appendChild(avatarElement);
    return avatarElement;
}