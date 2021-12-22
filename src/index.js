import './style/main.css';
import './sample/react.js';
import './sample/redux.js';
import './sample/react-redux.js';

function component() {
  const element = document.createElement('div');

  element.classList.add('star_ico');

  return element;
}

document.body.appendChild(component());
