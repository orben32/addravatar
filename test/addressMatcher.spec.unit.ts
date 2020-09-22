import { matchesBitcoinAddress } from "../src/addressMatcher";

describe('addressMatcher', () => {
    describe('matchesBitcoinAddress', () => {
        describe('when a valid address', () => {
            const VALID_ADDRESSES = ['1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2', '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy', '3Gy4rReQQSw1bz3fqZVq2wTdUfHR4PSJPX', 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq', 'bc1qwqdg6squsna38e46795at95yu9atm8azzmyvckulcc7kytlcckxswvvzej']
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
