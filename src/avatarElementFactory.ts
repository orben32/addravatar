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

export function createAvatarElement(addressNode: Node): Element {
    const img = document.createElement('img');
    img.src = createAvatarSource(getText(addressNode));
    img.style.position = 'absolute';
    const clientRect = getBoundingClientRect(addressNode);
    img.style.left = createPixelValue(clientRect.left + clientRect.width + 4);
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    img.style.top = createPixelValue(clientRect.top - 3 + scrollTop);
    img.style.width = createPixelValue(avatarWidth);
    img.style.zIndex = String(zIndex);

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

export function addAvatarElement(addressNode: Node): Element {
    const avatarElement = createAvatarElement(addressNode);
    document.body.appendChild(avatarElement);
    return avatarElement;
}