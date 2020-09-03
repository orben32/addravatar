import { createAvatarSource } from "./avatarSourceFactory";

const createPixelValue = (value: number) => `${value}px`;

const avatarWidth = 25;
const zIndex = 9999;

export function createAvatarElement(addressElement: HTMLElement): Element {
    const img = document.createElement('img');
    img.src = createAvatarSource((addressElement as HTMLInputElement).value || addressElement.textContent);
    img.style.position = 'absolute';
    const clientRect = addressElement.getBoundingClientRect();
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

export function addAvatarElement(addressElement: HTMLElement): Element {
    const avatarElement = createAvatarElement(addressElement);
    document.body.appendChild(avatarElement);
    return avatarElement;
}