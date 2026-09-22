import { useState } from "react";
import { Link, useNavigate } from "react-router";

import "./UserForm.css";

function UserForm({ addUser }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const [submitting, setSubmitting] =
    useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name =
        "Please enter your name.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        "Please enter your phone number.";
    } else if (
      !/^[0-9]{10}$/.test(formData.phone)
    ) {
      newErrors.phone =
        "Enter a valid 10-digit phone number.";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        "Please enter your email.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Enter a valid email address.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    const result = await addUser(formData);

    setSubmitting(false);

    if (result.success) {
      navigate("/users");
    }
  };

  return (
    <section className="form-page">
      <div className="form-page-container">

        <div className="form-info">
          <div className="form-badge">
            CREATE USER
          </div>

          <h1>
            Add a new user to your
            <span> directory.</span>
          </h1>

          <p>
            Enter the user's basic information.
            Once submitted, the record will be
            stored in MongoDB Atlas.
          </p>

          <div className="process-list">

            <div className="process-item">
              <span>01</span>

              <div>
                <strong>
                  Enter Information
                </strong>

                <p>
                  Add name, phone number and
                  email.
                </p>
              </div>
            </div>

            <div className="process-item">
              <span>02</span>

              <div>
                <strong>
                  Submit User
                </strong>

                <p>
                  Send the information to the
                  Express API.
                </p>
              </div>
            </div>

            <div className="process-item">
              <span>03</span>

              <div>
                <strong>
                  Save in MongoDB
                </strong>

                <p>
                  Keep the record permanently in
                  your database.
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="user-form-card">

          <div className="form-card-heading">
            <span className="form-icon">
              +
            </span>

            <div>
              <h2>Add User</h2>
              <p>
                Fill in the information below.
              </p>
            </div>
          </div>

          <form
            className="user-form"
            onSubmit={handleSubmit}
          >

            <div className="input-group">
              <label htmlFor="name">
                Full Name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
              />

              {errors.name && (
                <span className="input-error">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="phone">
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="Enter 10-digit number"
                value={formData.phone}
                onChange={handleChange}
                maxLength="10"
              />

              {errors.phone && (
                <span className="input-error">
                  {errors.phone}
                </span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
              />

              {errors.email && (
                <span className="input-error">
                  {errors.email}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={submitting}
            >
              {submitting
                ? "Saving..."
                : "Add User"}

              {!submitting && <span>→</span>}
            </button>

          </form>

          <div className="form-footer">
            <span>
              Already added users?
            </span>

            <Link to="/users">
              View User List
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default UserForm;