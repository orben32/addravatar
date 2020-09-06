import { matchesBitcoinAddress } from "./addressMatcher";
import { getText } from "./textGetters";

function findAdressNodesRecursive(node: Node, addressNodes: Node[]): void {
    if (matchesBitcoinAddress(getText(node))) {
        addressNodes.push(node);
    } else {
        for (const childNode of Array.from(node.childNodes)) {
            findAdressNodesRecursive(childNode, addressNodes);
        }
    }
}

export function findAddressNodes(root: Element): Element[] {
    const nodes: Element[] = [];
    findAdressNodesRecursive(root, nodes);

    return nodes;
}