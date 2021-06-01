import React from "react";
import ReactDOM from "react-dom";
import App from "containers/App/App";
import { BrowserRouter as Router } from "react-router-dom";
import "decentraland-ui/lib/styles.css";
import "decentraland-ui/lib/dark-theme.css";
import { Provider } from "react-redux";
import createStore from "core/store/store";

// eslint-disable-next-line no-console
console.log(
  "%c BALU WAS HERE",
  "color: #FFFFFF; font-style: bold; background-color: #000000;padding: 20px"
);

const Root = (): JSX.Element => {
  const store = createStore();
  return (
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById("app"));
