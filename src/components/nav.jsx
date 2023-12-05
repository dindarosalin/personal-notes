import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as Icon from 'react-bootstrap-icons'
import ThemeSwitch from '../components/theme-switch'

export default function Navbar({ logout, name }) {
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <>
            <nav className='navbar navbar-expand-lg bg-primary'>
                <div className='container-fluid'>
                    <a className='navbar-brand' href='/'>Personal Notes</a>
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                            <li className='nav-item'>
                                <Link className='nav-link active' to='/' onClick={() => navigate('/')}>Home</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link active' to='/archived' onClick={() => navigate('/archived')}>Archived</Link>
                            </li>
                        </ul>
                        <button className='btn me-4 mb-2' onClick={handleLogout}><Icon.BoxArrowRight /> {name}</button>
                        <ThemeSwitch />
                    </div>
                </div>
            </nav>
        </>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
}
