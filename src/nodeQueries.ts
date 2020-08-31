import { matchesBitcoinAddress } from "./addressMatcher";

function filterAncestorsByNode(node: Element, nodes: Element[]) {
    if (node) {
        const index = nodes.indexOf(node);
        if(index !== -1) {
            nodes.splice(index, 1);
        }
        filterAncestorsByNode(node.parentElement, nodes);
    }
}

function filterAncestors(nodes: Element[]) {
    const originalNodes = [...nodes];
    for (const node of originalNodes) {
        filterAncestorsByNode(node.parentElement, nodes);
    }
    return nodes;
}

function doesNodeMatch(node: Element) {
    return matchesBitcoinAddress(node.textContent) || matchesBitcoinAddress((node as HTMLInputElement).value);
}

export function findAddressNodes(root: Element): Element[] {
    const allChildren = Array.from(root.querySelectorAll('*'));
    const allNodes = [root, ...allChildren];
    const matchingNodes = allNodes.filter(node => doesNodeMatch(node));
    return filterAncestors(matchingNodes);
}