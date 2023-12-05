import React, { useState } from 'react'
import PropTypes from 'prop-types'

const RegisterInput = ({ register }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const { name, email, password, confirmPassword } = formData

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('Password and confirm password do not match')
      return
    }

    register({
      name,
      email,
      password,
    })
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className='register-input'>
        <div className='mb-3'>
          <label htmlFor='exampleInputEmail1' className='form-label'>Email address</label>
          <input type='text'
            placeholder='Nama'
            name='name'
            value={name}
            onChange={handleChange}
            required
            className='form-control' />
        </div>
        <div className='mb-3'>

          <input
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={handleChange}
            required
            className='form-control'
          />
        </div>
        <div className='mb-3'>
          <input
            type='password'
            placeholder='Password'
            autoComplete='current-password'
            name='password'
            value={password}
            onChange={handleChange}
            required
            className='form-control'
          />
        </div>
        <div className='mb-3'>
          <input
            type='password'
            placeholder='Confirm Password'
            autoComplete='current-password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={handleChange}
            required
            className='form-control'
          />
        </div>
        <button type='submit' className='btn btn-primary'>Daftar</button>
      </form>
    </div>

  )
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
}

export default RegisterInput
