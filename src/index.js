import './style/main.css';

function component() {
  const element = document.createElement('div');

  element.classList.add('star_ico');

  return element;
}

document.body.appendChild(component());
