import React, { useState } from 'react';
import PropTypes from 'prop-types';

const RegisterInput = ({ register }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Password and confirm password do not match');
      return;
    }

    register({
      name,
      email,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="register-input">
      <input
        type="text"
        placeholder="Nama"
        name="name"
        value={name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        name="password"
        value={password}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        autoComplete="current-password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={handleChange}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
