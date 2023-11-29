import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/nav';
import Footer from '../components/footer';

export default function DetailNote() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setNote] = useState(null);

    useEffect(() => {
        const selectedContent = JSON.parse(sessionStorage.getItem('notes'))?.find(data => data.id === id);
        if (selectedContent) {
            setNote(selectedContent);
        } else {
            navigate('/not-found');
        }
    }, [id, navigate]);

    return (
        <>
            <Navbar />
            <div className='container'>
            {data ? (
                <div>
                <div className="card">
                    <div className='card-body'>
                    <h1 className='card-title'>{data.title}</h1>
                    <p className='card-subtitle text-body-secondary'>{data.createdAt}</p>
                    <p className='card-text'>{data.body}</p>
                </div>
                    </div>

                </div>
            ) : (
                <h1>Catatan tidak ditemukan</h1>
            )}
            </div>
            <Footer />
        </>
    )
}
