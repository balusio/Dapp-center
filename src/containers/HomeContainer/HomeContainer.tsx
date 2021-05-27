import React, { useEffect } from 'react';
import { Button } from 'decentraland-ui';
/**
 * Homepage container, uses the DataHook to recieve always data.
 */
const HomeContainer = (): JSX.Element => {

  return (
    <>
      <h1>
        HELLO WORLD
      </h1>
      <Button primary>Hello</Button>
    </>
  );
};

export default HomeContainer;
