import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoginInput from '../components/login-input'
import { login } from '../utils/api'
import PropTypes from 'prop-types'

function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate()

  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password })

    if (!error) {
      onLoginSuccess(data)
      navigate('/')
    }
  }

  return (
    <section className='login-page container mt-4'>
      <h2 className='text-center'>Masuk Dulu</h2>
      <LoginInput login={onLogin} />
      <p className='mt-4 text-center'>Belum punya akun? <Link to='/register'>Daftar di sini.</Link></p>
    </section>
  )
}

export default LoginPage

LoginPage.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired
}