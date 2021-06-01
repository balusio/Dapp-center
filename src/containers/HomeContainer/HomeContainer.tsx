import React from "react";
import { Button, Center } from "decentraland-ui";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "core/store/store";
import { Link } from "react-router-dom";
import { connectUser, setError } from "core/store/slices/user/UserSlice";

const HomeContainer = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const startApp = () => {
    if (typeof window.ethereum !== "undefined") {
      dispatch(connectUser());
    } else {
      dispatch(
        setError({
          error: new Error("Metamask is not connected"),
        })
      );
    }
  };

  return (
    <>
      <div className="button-login">
        <Center>
          {!user.connected ? (
            <Button primary onClick={startApp}>
              Connect
            </Button>
          ) : (
            <>
              <h1>Welcome to swipe tokens center</h1>
              <Link to="swipeTokens" className="ui primary button">
                Swipe Tokens
              </Link>
            </>
          )}
        </Center>
      </div>
    </>
  );
};

export default HomeContainer;
