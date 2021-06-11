import React, { useState } from "react";
import { Dialog } from "./Dialog";
import { useExcalidrawContainer } from "./App";

export const DeleteDialog = ({
  message,
  onClose,
  onConfirm,
}: {
  message: string;
  onClose?: () => void;
  onConfirm?: () => void;
}) => {
  const [modalIsShown, setModalIsShown] = useState(!!message);
  const excalidrawContainer = useExcalidrawContainer();

  const handleClose = React.useCallback(() => {
    setModalIsShown(false);

    if (onClose) {
      onClose();
    }
    // TODO: Fix the A11y issues so this is never needed since we should always focus on last active element
    excalidrawContainer?.focus();
  }, [onClose, excalidrawContainer]);

  const confirmDelete = React.useCallback(() => {
    setModalIsShown(false);

    if (onConfirm) {
      onConfirm();
    }
    // TODO: Fix the A11y issues so this is never needed since we should always focus on last active element
    excalidrawContainer?.focus();
  }, [onConfirm, excalidrawContainer]);

  return (
    <>
      {modalIsShown && (
        <Dialog small onCloseRequest={handleClose} title="Delete">
          <div style={{ whiteSpace: "pre-wrap" }}>{message}</div>
          <button className="confirm-button" onClick={confirmDelete}>
            Yes
          </button>
          <button className="cancel-button" onClick={handleClose}>
            Cancel
          </button>
        </Dialog>
      )}
    </>
  );
};
