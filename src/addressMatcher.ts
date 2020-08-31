export function matchesBitcoinAddress(str: string): boolean {
    return str && !!str.match(/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/);
}