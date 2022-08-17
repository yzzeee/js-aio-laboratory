import { join } from '@fxts/core';

function component() {
    const element = document.createElement('div');
    element.innerHTML =  join(' ', ['Hello', 'fxts']);
    return element;
}

document.body.appendChild(component());