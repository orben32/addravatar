import md5 = require('md5');

const GRAVATAR_SOURCE = 'https://www.gravatar.com/avatar/';
const IDENTICON_SUFFIX = '?d=identicon';

export function createAvatarSource(address: string): string {
    const hash = md5(address);
    return `${GRAVATAR_SOURCE}${hash}${IDENTICON_SUFFIX}`;
}