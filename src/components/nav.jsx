import React from "react"
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';
import * as Icon from 'react-bootstrap-icons';
import ThemeSwitch from '../components/theme-switch';  // Pastikan Anda mengimpor ThemeSwitch
import { useThemeContext } from "../hooks/use-theme-context";

export default function Navbar({ logout, name }) {  // Ganti "navbar" menjadi "Navbar" (penulisan PascalCase)
    const navigate = useNavigate()
    const { darkMode } = useThemeContext();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-primary">
                <div className='container-fluid'>
                    <a className="navbar-brand" href="">Personal Notes</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className='nav-item'>
                                <a className="nav-link active" aria-current="page" href='' onClick={() => navigate('/')}>Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href='' onClick={() => navigate('/archived')}>Archived</a>
                            </li>
                        </ul>
                        <button className="btn me-4 mb-2" onClick={handleLogout}><Icon.BoxArrowRight /></button>
                        <ThemeSwitch />
                    </div>
                </div>
            </nav>
        </>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
};
