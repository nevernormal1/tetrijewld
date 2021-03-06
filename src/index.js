import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import {
  handleKeydown,
  handleKeyup,
  handleGameTick,
} from './features/game/gameSlice';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

const onKeydown = (event) => {
  event.preventDefault();
  store.dispatch(handleKeydown(event.code));
}

document.addEventListener('keydown', onKeydown);

const onKeyup = (event) => {
  event.preventDefault();
  store.dispatch(handleKeyup(event.code));
}

document.addEventListener('keyup', onKeyup);

// Start event loop
window.setInterval(() => {
  store.dispatch(handleGameTick());
}, 30);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
