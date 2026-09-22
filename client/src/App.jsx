import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

import "./App.css";

const API_URL = import.meta.env.DEV
  ? "http://localhost:5000/api/users"
  : "/api/users";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Convert MongoDB _id into id
  const normalizeUser = (user) => ({
    ...user,
    id: user._id,
  });

  // ==============================
  // READ USERS
  // ==============================

  const loadUsers = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to fetch users"
        );
      }

      const formattedUsers =
        result.data.map(normalizeUser);

      setUsers(formattedUsers);
    } catch (error) {
      console.error("Load Users Error:", error);

      alert("Unable to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // ==============================
  // CREATE USER
  // ==============================

  const addUser = async (userData) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to create user"
        );
      }

      const newUser = normalizeUser(result.data);

      setUsers((previousUsers) => [
        newUser,
        ...previousUsers,
      ]);

      return {
        success: true,
      };
    } catch (error) {
      console.error("Create User Error:", error);

      alert(error.message);

      return {
        success: false,
      };
    }
  };

  // ==============================
  // UPDATE USER
  // ==============================

  const updateUser = async (updatedUser) => {
    try {
      const response = await fetch(
        `${API_URL}/${updatedUser.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: updatedUser.name,
            phone: updatedUser.phone,
            email: updatedUser.email,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to update user"
        );
      }

      const savedUser = normalizeUser(result.data);

      setUsers((previousUsers) =>
        previousUsers.map((user) =>
          user.id === savedUser.id
            ? savedUser
            : user
        )
      );

      return {
        success: true,
      };
    } catch (error) {
      console.error("Update User Error:", error);

      alert(error.message);

      return {
        success: false,
      };
    }
  };

  // ==============================
  // DELETE USER
  // ==============================

  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to delete user"
        );
      }

      setUsers((previousUsers) =>
        previousUsers.filter(
          (user) => user.id !== id
        )
      );

      return {
        success: true,
      };
    } catch (error) {
      console.error("Delete User Error:", error);

      alert(error.message);

      return {
        success: false,
      };
    }
  };

  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={
              <UserForm addUser={addUser} />
            }
          />

          <Route
            path="/users"
            element={
              <UserList
                users={users}
                loading={loading}
                updateUser={updateUser}
                deleteUser={deleteUser}
              />
            }
          />

          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;