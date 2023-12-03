import React from "react"
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';

export default function navbar({ logout, name }) {
    const navigate = useNavigate()

    const handleLogout = () => {
        logout();
        navigate('/login');
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
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
                    </div>
                    <div>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </nav>
        </>
    )
}

Navigation.propTypes = {
    logout: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
};