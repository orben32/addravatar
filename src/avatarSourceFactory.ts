import md5 from 'md5';
import Identicon from 'identicon.js';

export function createAvatarSource(address: string): string {
    const hash = md5(address);
    const imgData = new Identicon(hash, {size: 50, format: 'svg'}).toString();
    return `data:image/svg+xml;base64,${imgData}`;
}