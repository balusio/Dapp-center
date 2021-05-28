import React, { useEffect } from 'react';
import { Button } from 'decentraland-ui';
import FullPageContainer from 'components/FullPageContainer';
/**
 * Homepage container, uses the DataHook to recieve always data.
 */
const HomeContainer = (): JSX.Element => {
  
  const startApp = () => {
    if(window.ethereum) {
      
    }
  }
  return (
    <>
      <FullPageContainer>
        <div className="button-login">
          <h1>
            HELLO WORLD
          </h1>
          <Button primary onClick={startApp}>Login</Button>
        </div>
      </FullPageContainer>

    </>
  );
};

export default HomeContainer;
