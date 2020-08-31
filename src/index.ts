import { findAddressNodes } from "./nodeQueries";

function component() {
    const element = document.createElement('div');

    element.innerHTML = 'hello3';
  
    return element;
  }
  
  document.body.appendChild(component());

  console.log('hello');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).findAddressElements = () => findAddressNodes(document.body);