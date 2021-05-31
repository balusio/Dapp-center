import React, { useEffect } from 'react';
import { Button, Center } from 'decentraland-ui';
import { useSelector } from 'react-redux';
import { RootState } from 'core/store/store';
import { useDispatch } from 'react-redux';
import { connectUser } from 'core/store/slices/user/UserSlice';
import { Link } from 'react-router-dom';
const HomeContainer = (): JSX.Element => {
  const user = useSelector( (state: RootState) => state.user)
  const dispatch = useDispatch();

  const startApp = () => {
    if(typeof window.ethereum !== 'undefined') {
      dispatch(connectUser());
    }
  }
  
  return (
    <>
      <div className="button-login">
        <Center>
          {
            !user.connected ? (
              <Button primary onClick={startApp}>Connect</Button>
            ) : (
              <>
                <h1>Welcome to Decentraland swipe tokens</h1>
                <Button primary>
                  <Link to="swipeTokens">
                    Swipe Tokens
                  </Link>
                </Button>
              </>
            )
          }
        </Center>

      </div>
    </>
  );
};

export default HomeContainer;
