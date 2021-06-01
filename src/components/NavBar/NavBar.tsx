import React from "react";
import { Navbar } from "decentraland-ui";
import { useSelector } from "react-redux";
import { RootState } from "core/store/store";

/**
 * The NavBar is isolated to avoid re render the whole app once the Token is setted
 */
const NavBarComponent = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.user);

  const extraProps = {
    isConnected: user.connected,
    mana: user.token?.balance ? user.token.balance : 0,
    addres: user.address,
    onClickAccount: () => console.log("Clicked on account menu"),
  };

  return (
    <>
      <Navbar className="--no-height" {...extraProps} />
    </>
  );
};

export default NavBarComponent;
