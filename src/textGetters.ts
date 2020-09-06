function getRawText(node: Node): string {
    if (node.nodeType === 3) {
        return node.textContent;
    } else {
        return (node as HTMLInputElement).value;
    }
}

export function getText(node: Node): string {
    return getRawText(node)?.trim();
}