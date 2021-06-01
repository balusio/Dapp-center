import React, { useEffect, useState } from "react";
import { Modal, Button } from "decentraland-ui";
import { useSelector } from "react-redux";
import { RootState } from "core/store/store";

/**
 * The NavBar is isolated to avoid re render the whole app once the Token is setted
 */
const ErrorComponent = (): JSX.Element => {
  const userError = useSelector((state: RootState) => state.user.error);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (userError && userError.message) {
      setOpenModal(true);
    }
  }, [userError]);

  const restartApp = () => {
    window.location.reload();
  };

  return (
    <>
      <Modal size="small" open={openModal}>
        <Modal.Header>Oops!</Modal.Header>
        <Modal.Content>
          Something&apos;s wrong
          <p>{userError?.message}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={restartApp}>
            Retry
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default ErrorComponent;
