import md5 = require('md5');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Identicon = require('identicon.js');

export function createAvatarSource(address: string): string {
    const hash = md5(address);
    const imgData = new Identicon(hash, {size: 50, format: 'svg'}).toString();
    return `data:image/svg+xml;base64,${imgData}`;
}