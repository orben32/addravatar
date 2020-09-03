import { createAvatarSource } from "./avatarSourceFactory";

const createPixelValue = (value: number) => `${value}px`;

export function createAvatarElement(addressElement: HTMLElement): Element {
    const img = document.createElement('img');
    img.src = createAvatarSource((addressElement as HTMLInputElement).value || addressElement.textContent);
    img.style.position = 'absolute';
    const clientRect = addressElement.getBoundingClientRect();
    img.style.left = createPixelValue(clientRect.left + clientRect.width + 4);
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    img.style.top = createPixelValue(clientRect.top - 3 + scrollTop);
    img.style.width = createPixelValue(25);
    img.style.zIndex = '9999';

    img.addEventListener('mouseenter', e => {
        (e.target as HTMLElement).style.width = createPixelValue(50);
    });

    img.addEventListener('mouseleave', e => {
        (e.target as HTMLElement).style.width = createPixelValue(25);
    });

    return img;
}

export function addAvatarElement(addressElement: HTMLElement): Element {
    const avatarElement = createAvatarElement(addressElement);
    document.body.appendChild(avatarElement);
    return avatarElement;
}