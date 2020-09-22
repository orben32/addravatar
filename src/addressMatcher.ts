import validate from 'bitcoin-address-validation';

export function matchesBitcoinAddress(str: string): boolean {
    return Boolean(validate(str));
}