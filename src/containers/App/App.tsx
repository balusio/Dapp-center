import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeContainer from 'containers/HomeContainer/HomeContainer';
/**
 * the App component is the base for routing definition and general providers,
 * please declare routes here that point to components inside the Containers folder
 * @see https://reactrouter.com/web/guides/quick-start 
 * for details
 */
const App = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route path="/" component={HomeContainer} />
      </Switch>
    </>
  );
};

export default App;
