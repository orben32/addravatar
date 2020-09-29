import { matchesBitcoinAddress } from "./addressMatcher";
import { getText } from "./textGetters";

function findAdressNodesRecursive(node: Node, addressNodes: Node[]): void {
    if (matchesBitcoinAddress(getText(node))) {
        addressNodes.push(node);
        const index = addressNodes.indexOf(node.parentNode);
        if (index >= 0) {
            addressNodes.splice(index, 1);
        }
    }
    for (const childNode of Array.from(node.childNodes)) {
        findAdressNodesRecursive(childNode, addressNodes);
    }
}

export function findAddressNodes(root: Element): Node[] {
    const nodes: Element[] = [];
    findAdressNodesRecursive(root, nodes);

    return nodes;
}