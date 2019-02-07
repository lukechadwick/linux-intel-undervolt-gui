import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import App from './App';
import './app.global.css';

render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./App.js', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./App.js').default;
    render(
      <AppContainer>
        <NextRoot />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
