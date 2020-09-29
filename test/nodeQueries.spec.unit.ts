import { findAddressNodes } from "../src/nodeQueries";

function createElement(html: string): Element {
    const parentDiv = document.createElement('div');
    parentDiv.innerHTML = html;
    return parentDiv.children[0];
}

describe('nodeQueries', () => {
    describe('findAddressNodes', () => {
        it('should return empty array when no valid address content exists', () => {
            expect(findAddressNodes(document.createElement('div'))).toEqual([]);
        });

        it('should return text node when given a div with valid address', () => {
            const div = createElement('<div>3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy</div>');

            const addressNodes = findAddressNodes(div);
            expect(addressNodes).toEqual([div.childNodes[0]]);
            expect(addressNodes[0]).toBe(div.childNodes[0]);
        });

        it('should return div when given a div with valid address and white spaces', () => {
            const div = createElement('<div>   3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy     </div>');

            const addressNodes = findAddressNodes(div);
            expect(addressNodes).toEqual([div.childNodes[0]]);
            expect(addressNodes[0]).toBe(div.childNodes[0]);
        });

        it('should return div when given a div with valid address and period sign', () => {
            const div = createElement('<div>3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy.</div>');

            const addressNodes = findAddressNodes(div);
            expect(addressNodes).toEqual([div.childNodes[0]]);
            expect(addressNodes[0]).toBe(div.childNodes[0]);
        });

        it('should not return ancestors with matching text', () => {
            const div = createElement('<div>3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy</div><div><div>3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy</div></div>').parentElement;

            const addressNodes = findAddressNodes(div);
            expect(addressNodes).toEqual([div.children[0].childNodes[0], div.children[1].children[0].childNodes[0]]);
            expect(addressNodes[0]).toBe(div.children[0].childNodes[0]);
            expect(addressNodes[1]).toBe(div.children[1].children[0].childNodes[0]);
        });

        it('should return node at maximum depth with address textContent', () => {
            const div = createElement('<div><span>3J98t1WpEZ73CNmQviecrnyiWrnqRh</span><span>WNLy</span></div>').parentElement;

            const addressNodes = findAddressNodes(div);
            expect(addressNodes).toEqual([div.children[0]]);
            expect(addressNodes[0]).toBe(div.children[0]);
        });
    });
});
