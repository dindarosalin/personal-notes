import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/nav'
import Footer from '../components/footer'
import { getNote } from '../utils/local-data'

export default function DetailNote() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [note, setNote] = useState(null)

    useEffect(() => {
        const selectedNote = getNote(id)
        if (selectedNote) {
            setNote(selectedNote)
        } else {
            navigate('/not-found')
        }
    }, [id, navigate])

    return (
        <>
            <Navbar active_tab={1} />
            <div className='container'>
                <div className="items-ceter mb-4">
                    <h1 className='text-center'>Detail Catatan</h1>
                </div>
                {note ? (
                    <div className='items-center mb-4'>
                        <div className="card">
                            <div className='card-body'>
                                <h1 className='card-title'>{note.title}</h1>
                                <p className='card-subtitle text-body-secondary'>{note.createdAt}</p>
                                <p className='card-text'>{note.body}</p>
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
