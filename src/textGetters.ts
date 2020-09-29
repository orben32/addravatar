function getRawText(node: Node): string {
    return (node as HTMLInputElement).value || node.textContent;
}

export function getText(node: Node): string {
    const rawText = getRawText(node);
    return rawText && String(rawText).trim().replace('.', '');
}