import md5 = require('md5');
import { createAvatarSource } from "../src/avatarSourceFactory";

describe('avatarSourceFactory', () => {
    describe('createAvatarSource', () => {
        const ADDRESS = '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy';
        it('should create source', () => {
            expect(createAvatarSource(ADDRESS)).toBe(`https://www.gravatar.com/avatar/${md5(ADDRESS)}?d=identicon`);
        });
    });
});
