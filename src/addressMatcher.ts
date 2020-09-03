export function matchesBitcoinAddress(str: string): boolean {
    return str && !!str.match(/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/);
}