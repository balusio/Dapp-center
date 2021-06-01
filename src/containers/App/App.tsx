import React from "react";
import { Switch, Route } from "react-router-dom";
import HomeContainer from "containers/HomeContainer/HomeContainer";
import SwipeTokensContainer from "containers/SwipeTokensContainer/SwipeTokensContainer";
import Navbar from "components/NavBar/NavBar";
import ErrorComponent from "components/ErrorComponent/ErrorComponent";

/**
 * the App component is the base for routing definition and general providers,
 * please declare routes here that point to components inside the Containers folder
 * @see https://reactrouter.com/web/guides/quick-start
 * for details
 */
const App = (): JSX.Element => (
  <>
    <Navbar />
    <div className="ui container page-container">
      <Switch>
        <Route path="/swipetokens" component={SwipeTokensContainer} />
        <Route path="/" component={HomeContainer} />
      </Switch>
      <ErrorComponent />
    </div>
  </>
);

export default App;
