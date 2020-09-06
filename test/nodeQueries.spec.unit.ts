import { findAddressNodes } from "../src/nodeQueries";

describe('nodeQueries', () => {
    describe('findAddressNodes', () => {
        it('should return empty array when no valid address content exists', () => {
            expect(findAddressNodes(document.createElement('div'))).toEqual([]);
        });

        it('should return text node when given a div with valid address', () => {
            const parentDiv = document.createElement('div');
            parentDiv.id = "shouldBeFilteredOut";
            parentDiv.innerHTML = `<div id="myAddressDiv">3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy</div>`;

            const addressNodes = findAddressNodes(parentDiv.children[0]);
            expect(addressNodes).toEqual([parentDiv.children[0].childNodes[0]]);
        });

        it('should return div when given a div with valid address and white spaces', () => {
            const parentDiv = document.createElement('div');
            parentDiv.id = "shouldBeFilteredOut";
            parentDiv.innerHTML = `<div id="myAddressDiv">   3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy     </div>`;

            const addressNodes = findAddressNodes(parentDiv.children[0]);
            expect(addressNodes).toEqual([parentDiv.children[0].childNodes[0]]);
        });

        it('should return input when given a input with valid address value', () => {
            const parentDiv = document.createElement('div');
            parentDiv.id = "shouldBeFilteredOut";
            parentDiv.innerHTML = `<input id="myAddressInput" value="3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy">`;

            const addressNodes = findAddressNodes(parentDiv.children[0]);
            expect(addressNodes).toEqual([parentDiv.children[0]]);
        });


        it('should filter out ancestors of valid elements', () => {
            const parentDiv = document.createElement('div');
            parentDiv.id = "shouldBeFilteredOut";
            parentDiv.innerHTML = `<div id="myAddressDiv">3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy</div><div id="shouldBeFilteredOut2"><div id="myAddressDiv2">3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy</div></div>`;

            const addressNodes = findAddressNodes(parentDiv);
            expect(addressNodes).toEqual([parentDiv.children[0].childNodes[0], parentDiv.children[1].children[0].childNodes[0]]);
        });
    });
});
