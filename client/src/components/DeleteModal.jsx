import { useState } from "react";

import "./DeleteModal.css";

function DeleteModal({
  user,
  deleteUser,
  closeModal,
}) {
  const [deleting, setDeleting] =
    useState(false);

  const confirmDelete = async () => {
    setDeleting(true);

    const result =
      await deleteUser(user.id);

    setDeleting(false);

    if (result.success) {
      closeModal();
    }
  };

  return (
    <div
      className="delete-overlay"
      onMouseDown={closeModal}
    >

      <div
        className="delete-modal"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >

        <div className="delete-icon">
          !
        </div>

        <h2>Delete User?</h2>

        <p>
          Are you sure you want to delete{" "}
          <strong>{user.name}</strong>?
        </p>

        <span className="delete-warning">
          This will permanently remove the
          record from MongoDB.
        </span>

        <div className="delete-modal-actions">

          <button
            className="delete-cancel-button"
            onClick={closeModal}
            disabled={deleting}
          >
            Cancel
          </button>

          <button
            className="delete-confirm-button"
            onClick={confirmDelete}
            disabled={deleting}
          >
            {deleting
              ? "Deleting..."
              : "Yes, Delete"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default DeleteModal;