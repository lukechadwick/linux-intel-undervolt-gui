import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import App from './App';
import './app.global.css';

render(<App />, document.getElementById('root'));

// render(
//   <AppContainer>
//     <Root store={store} history={history} />
//   </AppContainer>,
//   document.getElementById('root')
// );

// if (module.hot) {
//   module.hot.accept('./containers/Root', () => {
//     // eslint-disable-next-line global-require
//     const NextRoot = require('./containers/Root').default;
//     render(
//       <AppContainer>
//         <NextRoot store={store} history={history} />
//       </AppContainer>,
//       document.getElementById('root')
//     );
//   });
// }
