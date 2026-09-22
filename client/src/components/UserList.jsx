import { useState } from "react";
import { Link } from "react-router";

import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

import "./UserList.css";

function UserList({
  users,
  loading,
  updateUser,
  deleteUser,
}) {
  const [editingUser, setEditingUser] =
    useState(null);

  const [deletingUser, setDeletingUser] =
    useState(null);

  if (loading) {
    return (
      <section className="users-page">
        <div className="users-container">
          <div className="empty-state">
            <h2>Loading Users...</h2>

            <p>
              Fetching records from MongoDB Atlas.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="users-page">
      <div className="users-container">

        <div className="users-heading">
          <div>
            <span>USER DIRECTORY</span>

            <h1>Registered Users</h1>

            <p>
              View and manage user records stored
              in MongoDB Atlas.
            </p>
          </div>

          <Link
            to="/login"
            className="add-user-button"
          >
            <span>+</span>
            Add User
          </Link>
        </div>

        <div className="users-summary">
          <div>
            <span>Total Users</span>
            <strong>{users.length}</strong>
          </div>

          <div className="summary-message">
            <span className="summary-dot"></span>

            Connected to MongoDB Atlas
          </div>
        </div>

        {users.length === 0 ? (
          <div className="empty-state">

            <div className="empty-icon">
              +
            </div>

            <h2>No users yet</h2>

            <p>
              Your MongoDB user directory is
              currently empty.
            </p>

            <Link
              to="/login"
              className="empty-button"
            >
              Add First User
            </Link>

          </div>
        ) : (
          <div className="users-table-wrapper">

            <table className="users-table">

              <thead>
                <tr>
                  <th>User</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {users.map((user) => (
                  <tr key={user.id}>

                    <td data-label="User">
                      <div className="user-profile">

                        <div className="user-avatar">
                          {user.name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>
                            {user.name}
                          </strong>

                          <span>
                            ID:{" "}
                            {String(user.id).slice(
                              -6
                            )}
                          </span>
                        </div>

                      </div>
                    </td>

                    <td data-label="Phone">
                      {user.phone}
                    </td>

                    <td data-label="Email">
                      {user.email}
                    </td>

                    <td data-label="Actions">

                      <div className="table-actions">

                        <button
                          className="edit-button"
                          onClick={() =>
                            setEditingUser(user)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete-button"
                          onClick={() =>
                            setDeletingUser(user)
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </td>
                  </tr>
                ))}

              </tbody>
            </table>

          </div>
        )}

      </div>

      {editingUser && (
        <EditModal
          user={editingUser}
          updateUser={updateUser}
          closeModal={() =>
            setEditingUser(null)
          }
        />
      )}

      {deletingUser && (
        <DeleteModal
          user={deletingUser}
          deleteUser={deleteUser}
          closeModal={() =>
            setDeletingUser(null)
          }
        />
      )}

    </section>
  );
}

export default UserList;