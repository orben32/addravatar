type TextValueGetter = (node: Element) => string;

const getters: TextValueGetter[] = [
    (node: Element) => (node as HTMLInputElement).value,
    (node: Element) => node.textContent,
];

export function getText(element: Element): string {
    for (const getter of getters) {
        const text = getter(element);
        if (text) {
            return text.trim();
        }
    }

    return null;
}