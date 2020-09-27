import { createAvatarSource } from "./avatarSourceFactory";
import { getText } from "./textGetters";

const createPixelValue = (value: number) => `${value}px`;

const AVATAR_SIZE = 25;
const AVATAR_ZINDEX = 9999;

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

function setPosition(avatar: HTMLElement, addressNode: Node, nodeBB?: DOMRect) {
    const clientRect = nodeBB || getBoundingClientRect(addressNode);
    avatar.style.left = createPixelValue(clientRect.left + clientRect.width + 8);
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    avatar.style.width = createPixelValue(AVATAR_SIZE);
    avatar.style.height = createPixelValue(AVATAR_SIZE);
    avatar.style.top = createPixelValue(clientRect.top + scrollTop + ((clientRect.height - AVATAR_SIZE) / 2));
}

export function updateAvatar(avatar: Element, addressNode: Node, nodeBB?: DOMRect): void {
    if (avatar.nodeName.toLowerCase() !== 'img') {
        throw new Error('Element is not an Image');
    }
    const imageElement = avatar as HTMLImageElement;
    imageElement.src = createAvatarSource(getText(addressNode));
    setPosition(imageElement, addressNode, nodeBB);
    imageElement.style.zIndex = String(AVATAR_ZINDEX);
}

export function createAvatarElement(addressNode: Node): Element {
    const nodeBB = getBoundingClientRect(addressNode);
    if (nodeBB.height == 0 || nodeBB.width == 0) {
        return null;
    }
    const img = document.createElement('img');
    img.style.position = 'absolute';
    updateAvatar(img, addressNode, nodeBB);
    img.classList.add('addravatar-avatar');

    img.addEventListener('mouseenter', e => {
        (e.target as HTMLElement).style.width = createPixelValue(AVATAR_SIZE * 2);
        (e.target as HTMLElement).style.height = createPixelValue(AVATAR_SIZE * 2);
        (e.target as HTMLElement).style.zIndex = String(AVATAR_ZINDEX + 1);
    });

    img.addEventListener('mouseleave', e => {
        (e.target as HTMLElement).style.width = createPixelValue(AVATAR_SIZE);
        (e.target as HTMLElement).style.height = createPixelValue(AVATAR_SIZE);
        (e.target as HTMLElement).style.zIndex = String(AVATAR_ZINDEX);
    });

    return img;
}
