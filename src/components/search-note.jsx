import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function searchNote() {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResult, setSearchResult] = useState([])

    const handleSearch = (e) => {
        e.preventDefault();
        // Redirect to search page with the search term
        navigate(`/search/${searchTerm}`);
    };

    return (
        <form className="d-flex" onSubmit={handleSearch}>
            <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-primary text-white" type="submit">Search</button>
        </form>
    );
}
