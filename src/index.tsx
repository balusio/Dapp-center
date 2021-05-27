import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App/App';
import { BrowserRouter as Router } from 'react-router-dom';
import 'decentraland-ui/lib/styles.css'
import 'decentraland-ui/lib/dark-theme.css'
// eslint-disable-next-line no-console
console.log('%c BALU WAS HERE', 'color: #FFFFFF; font-style: bold; background-color: #000000;padding: 20px');

const Root = (): JSX.Element => (
  <Router>
    <App />
  </Router>
);

ReactDOM.render(<Root />, document.getElementById('app'));
