import { createAvatarSource } from "./avatarSourceFactory";

const createPixelValue = (value: number) => `${value}px`;

export function createAvatarElement(addressElement: HTMLElement): Element {
    const img = document.createElement('img');
    img.src = createAvatarSource((addressElement as HTMLInputElement).value || addressElement.textContent);
    img.style.position = 'absolute';
    const clientRect = addressElement.getBoundingClientRect();
    img.style.left = createPixelValue(clientRect.left + clientRect.width + 4);
    img.style.top = createPixelValue(clientRect.top - 3);
    img.style.width = createPixelValue(25);

    return img;
}

export function addAvatarElement(addressElement: HTMLElement): Element {
    const avatarElement = createAvatarElement(addressElement);
    addressElement.parentElement.appendChild(avatarElement);
    return avatarElement;
}