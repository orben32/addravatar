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

type TextValueGetter = (node: Element) => string;

function getTextValueGetters(): TextValueGetter[] {
    return [
        (node: Element) => node.textContent,
        (node: Element) => (node as HTMLInputElement).value,
    ];
}

function doesNodeMatch(node: Element) {
    const getters = getTextValueGetters();
    return getters.some(valueGetter => {
        const textValue = valueGetter(node);
        return matchesBitcoinAddress(textValue?.trim());
    });
}

export function findAddressNodes(root: Element): Element[] {
    const allChildren = Array.from(root.querySelectorAll('*'));
    const allNodes = [root, ...allChildren];
    const matchingNodes = allNodes.filter(node => doesNodeMatch(node));
    return filterAncestors(matchingNodes);
}