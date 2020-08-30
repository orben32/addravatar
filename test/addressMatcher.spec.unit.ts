import { matchesBitcoinAddress } from "../src/addressMatcher";

describe('addressMatcher', () => {
    describe('matchesBitcoinAddress', () => {
        describe('when a valid address', () => {
            const VALID_ADDRESSES = ['1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2', '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy']
            it('should return true', () => {
                for (const address of VALID_ADDRESSES) {
                    expect(matchesBitcoinAddress(address)).toBe(true);               
                }
           }); 
        });

        describe('when NOT a valid address', () => {
            const INVALID_ADDRESSES = ['random', 'zJ98t1WpEZ73CNmQviecrnyiWrnqRhWNLy']

            it('should return false', () => {
                for (const notAnAddress of INVALID_ADDRESSES) {
                    expect(matchesBitcoinAddress(notAnAddress)).toBe(false);               
                }
           }); 
        });
    });
});