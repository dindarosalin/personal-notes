import React, { useState } from 'react'
import Navbar from '../components/nav'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/footer'
import PropTypes from 'prop-types'

export default function AddNote() {
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [archived, setArchived] = useState(false)

    const handleSubmit = () => {
        const existingNoteData = sessionStorage.getItem('notes');
        const noteData = existingNoteData ? JSON.parse(existingNoteData) : [];
        const newData = {
            id: title + new Date(),
            title: title,
            body: body,
            archived: archived,
            createdAt: new Date(),
        };
        noteData.push(newData);

        try {
            sessionStorage.setItem('notes', JSON.stringify(noteData));
            alert('Catatan berhasil ditambahkan');
            navigate('/');
        } catch {
            alert('Catatan gagal ditambahkan');
        }
    }

    return (
        <>
            <Navbar active_tab={1}/>
            <div className='container mb-3'>
                <form onSubmit={handleSubmit} >
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">Judul</label>
                        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Judul Notes"
                            value={title}
                            onChange={(e) => {
                                if (title.length < 50) {
                                    setTitle(e.target.value)
                                }
                            }}
                        />
                        <small className={`text-sm ${title.length < 30 ? 'text-green-500' : 'text-red-500'}`}>{50 - title.length} Karakter Tersisa</small>
                    </div>
                    <div className="input-group mb-3">
                        <textarea className="form-control" placeholder='Masukkan Catatan' aria-label="Isi Catatan" onChange={(e) => setBody(e.target.value)}></textarea>
                    </div>
                    <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault" value={archived}
                            onChange={(e) => {
                                setArchived(e.target.checked)
                                console.log(archived)
                            }}>
                            Tambahkan ke Arsip
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary text-white">Primary</button>
                </form>
                <Footer></Footer>
            </div>
        </>
    )
}