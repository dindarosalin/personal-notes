import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/regist-input';
import { register } from '../utils/api';
 
function registPage() {
  const navigate = useNavigate();

  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate('/');
    }
  }
 
  return (
    <section className='register-page container'>
      <h2 className='text-center mt-4'>Daftar Dulu</h2>
      <RegisterInput register={onRegisterHandler} />
      <p className='text-center'>Udah Punya Akun? <Link to="/">Masuk</Link></p>
    </section>
  )
}
 
export default registPage;