import React from 'react';
import { Link } from 'react-router-dom';
import LoginInput from '../components/login-input';
import { login } from '../utils/api';

function LoginPage({ onLoginSuccess }) {
  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      onLoginSuccess(data);
    }
  }

  return (
    <section className='login-page'>
      <h2>Silakan masuk untuk melanjutkan ...</h2>
      <LoginInput login={onLogin} />
      <p>Belum punya akun? <Link to="/register">Daftar di sini.</Link></p>
    </section>
  );
}

export default LoginPage;