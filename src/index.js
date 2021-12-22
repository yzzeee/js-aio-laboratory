import './style/main.css';
import './sample/react.js';

function component() {
  const element = document.createElement('div');

  element.classList.add('star_ico');

  return element;
}

document.body.appendChild(component());
