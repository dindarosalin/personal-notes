import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/footer'
import { addNote } from '../utils/api'

export default function AddNote() {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [archived, setArchived] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        addNote({ title, body })
        try {
            alert('Catatan berhasil ditambahkan')
            navigate('/');
        } catch {
            alert('Catatan gagal ditambahkan')
        }
    }

    return (
        <>
            <div className='container mb-3'>
                <form onSubmit={handleSubmit} >
                    <div className='mb-3'>
                        <label htmlFor='formGroupExampleInput' className='form-label'>Judul</label>
                        <input 
                            type='text' 
                            className='form-control' 
                            id='formGroupExampleInput' 
                            placeholder='Judul Notes'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <small className={`text-sm ${title.length < 30 ? 'text-green-500' : 'text-red-500'}`}>
                            {50 - title.length} Karakter Tersisa
                        </small>
                    </div>
                    <div className='input-group mb-3'>
                        <textarea 
                            className='form-control' 
                            placeholder='Masukkan Catatan' 
                            aria-label='Isi Catatan' 
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        ></textarea>
                    </div>
                    <button type='submit' className='btn btn-primary text-white'>Primary</button>
                </form>
            </div>
            <Footer/>
        </>
    )
}
