function component() {
    const element = document.createElement('div');

    element.innerHTML = 'hello3';
  
    return element;
  }
  
  document.body.appendChild(component());

  console.log('hello');