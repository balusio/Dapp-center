import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeContainer from 'containers/HomeContainer/HomeContainer';
import {Navbar} from 'decentraland-ui';

/**
 * the App component is the base for routing definition and general providers,
 * please declare routes here that point to components inside the Containers folder
 * @see https://reactrouter.com/web/guides/quick-start 
 * for details
 */
const App = (): JSX.Element => {
  return (
    <>
      <Navbar className="--no-height" />
      <div className="ui container page-container">
        <Switch>
          <Route path="/" component={HomeContainer} />
        </Switch>
      </div>

    </>
  );
};

export default App;
