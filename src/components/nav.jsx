import React from "react"
import { useNavigate } from 'react-router-dom'

export default function navbar({ active_tab }) {
    const navigate = useNavigate()
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <a className="navbar-brand" href="">Personal Notes</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className={`py-3 ${active_tab == 1 ? '' : ''} `} onClick={() => navigate('/')}>
                        Home
                        </li>
                        <li className={`py-3 px-5 ${active_tab == 2 ? '' : ''} `} onClick={() => navigate('/archived')}>
                           Archived
                        </li>
                    </ul>
                    
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-primary text-white" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}