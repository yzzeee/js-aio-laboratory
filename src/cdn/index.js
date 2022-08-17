function component() {
    const element = document.createElement('div');
    element.innerHTML =  _.join(' ', ['Hello', 'fxts']);
    return element;
}

document.body.appendChild(component());