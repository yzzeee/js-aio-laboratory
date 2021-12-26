import './style/main.css';
import './sample/react.js';
import './sample/redux.js';
import './sample/react-redux.js';

function component() {
  const element = document.createElement('div');

  element.classList.add('star_ico');

  return element;
}

const star = component();
document.body.appendChild(star);

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept();
  module.hot.dispose(function () {
    document.body.removeChild(star);
  });
}
