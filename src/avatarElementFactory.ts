import { createAvatarSource } from "./avatarSourceFactory";
import { getText } from "./textGetters";

const createPixelValue = (value: number) => `${value}px`;

const avatarSize = 25;
const zIndex = 9999;

function getBoundingClientRect(node: Node): DOMRect {
    if (node.nodeType === 3) {
        const range = document.createRange();
        range.selectNode(node);
        const rect =  range.getBoundingClientRect();
        rect.width = Math.min(rect.width, node.parentElement.getBoundingClientRect().width);
        return rect;
    } else {
        return (node as Element).getBoundingClientRect();
    }
}

export function updateAvatar(avatar: Element, addressNode: Node): void {
    if (avatar.nodeName.toLowerCase() !== 'img') {
        throw new Error('Element is not an Image');
    }
    const imageElement = avatar as HTMLImageElement;
    imageElement.src = createAvatarSource(getText(addressNode));
    imageElement.style.position = 'absolute';
    const clientRect = getBoundingClientRect(addressNode);
    imageElement.style.left = createPixelValue(clientRect.left + clientRect.width + 8);
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    imageElement.style.width = createPixelValue(avatarSize);
    imageElement.style.height = createPixelValue(avatarSize);
    imageElement.style.top = createPixelValue(clientRect.top + scrollTop + ((clientRect.height - avatarSize) / 2));
    imageElement.style.zIndex = String(zIndex);
}

export function createAvatarElement(addressNode: Node): Element {
    const img = document.createElement('img');
    updateAvatar(img, addressNode);
    img.classList.add('addravatar-avatar');

    img.addEventListener('mouseenter', e => {
        (e.target as HTMLElement).style.width = createPixelValue(avatarSize * 2);
        (e.target as HTMLElement).style.height = createPixelValue(avatarSize * 2);
        (e.target as HTMLElement).style.zIndex = String(zIndex + 1);
    });

    img.addEventListener('mouseleave', e => {
        (e.target as HTMLElement).style.width = createPixelValue(avatarSize);
        (e.target as HTMLElement).style.height = createPixelValue(avatarSize);
        (e.target as HTMLElement).style.zIndex = String(zIndex);
    });

    return img;
}

export function addAvatarElement(addressNode: Node): Element {
    const avatarElement = createAvatarElement(addressNode);
    document.body.appendChild(avatarElement);
    return avatarElement;
}