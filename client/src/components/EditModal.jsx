import { useState } from "react";

import "./EditModal.css";

function EditModal({
  user,
  updateUser,
  closeModal,
}) {
  const [formData, setFormData] = useState({
    ...user,
  });

  const [updating, setUpdating] =
    useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setUpdating(true);

    const result =
      await updateUser(formData);

    setUpdating(false);

    if (result.success) {
      closeModal();
    }
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={closeModal}
    >

      <div
        className="edit-modal"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >

        <div className="modal-heading">

          <div>
            <span>UPDATE RECORD</span>

            <h2>Edit User</h2>
          </div>

          <button
            className="modal-close"
            onClick={closeModal}
          >
            ×
          </button>

        </div>

        <form
          className="edit-form"
          onSubmit={handleSubmit}
        >

          <div className="edit-input-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-input-group">
            <label>Phone Number</label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              maxLength="10"
              required
            />
          </div>

          <div className="edit-input-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-modal-actions">

            <button
              type="button"
              className="cancel-modal-button"
              onClick={closeModal}
              disabled={updating}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="update-modal-button"
              disabled={updating}
            >
              {updating
                ? "Updating..."
                : "Update User"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default EditModal;