import { findAddressNodes } from "../src/nodeQueries";

describe('nodeQueries', () => {
    describe('findAddressNodes', () => {
        it('should return empty array when no valid address content exists', () => {
            expect(findAddressNodes(document.createElement('div'))).toEqual([]);
        });

        it('should return div when given a div with valid address', () => {
            const parentDiv = document.createElement('div');
            parentDiv.id = "shouldBeFilteredOut";
            parentDiv.innerHTML = `<div id="myAddressDiv">3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy</div>`;

            const divIds = findAddressNodes(parentDiv.children[0]).map(node => node.id);
            expect(divIds).toEqual(['myAddressDiv']);
        });

        it('should return input when given a input with valid address value', () => {
            const parentDiv = document.createElement('div');
            parentDiv.id = "shouldBeFilteredOut";
            parentDiv.innerHTML = `<input id="myAddressInput" value="3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy">`;

            const ids = findAddressNodes(parentDiv.children[0]).map(node => node.id);
            expect(ids).toEqual(['myAddressInput']);
        });


        it('should filter out ancestors of valid elements', () => {
            const parentDiv = document.createElement('div');
            parentDiv.id = "shouldBeFilteredOut";
            parentDiv.innerHTML = `<div id="myAddressDiv">3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy</div><div id="shouldBeFilteredOut2"><div id="myAddressDiv2">3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy</div></div>`;

            const divIds = findAddressNodes(parentDiv).map(node => node.id);
            expect(divIds).toEqual(['myAddressDiv', 'myAddressDiv2']);
        });
    });
});
