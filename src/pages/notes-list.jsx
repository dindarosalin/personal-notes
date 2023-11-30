import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/nav'
import Footer from '../components/footer'
import { getAllNotes, archiveNote, deleteNote, getArchivedNotes, unarchiveNote, getNote } from '../utils/local-data'

export default function Home() {
    const [notes, setNotes] = useState([])
    const [archivedNotes, setArchivedNotes] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const allNotes = getAllNotes()
        setNotes(allNotes.filter(note => !note.archived))
        const archived = getArchivedNotes()
        setArchivedNotes(archived)
    }, [])
    
    const handleDelete = (id) => {
        try {
            deleteNote(id)
            alert('Catatan berhasil dihapus')
            const updatedNotes = getAllNotes()
            setNotes(updatedNotes.filter(note => !note.archived))
            setArchivedNotes(updatedNotes.filter(note => note.archived))
        } catch {
            alert('Catatan gagal dihapus')
        }
    }

    const handleArchive = (id) => {
        try {
            archiveNote(id)
            alert('Catatan berhasil diarsipkan')
            const updatedNotes = getAllNotes()
            setNotes(updatedNotes.filter(note => !note.archived))
            setArchivedNotes(updatedNotes.filter(note => note.archived))
        } catch {
            alert('Catatan gagal diarsipkan')
        }
    }

    const handleUnarchive = (id) => {
        try {
            unarchiveNote(id)
            alert('Catatan berhasil ditampikan')
            const updatedNotes = getAllNotes()
            setNotes(updatedNotes.filter(note => !note.archived))
            setArchivedNotes(updatedNotes.filter(note => note.archived))
        } catch {
            alert('Catatan gagal ditampilkan')
        }
    }

    const handleDetail = (id) => {
        const note = getNote(id)
        if (note) {
            navigate(`/note-detail/${id}`)
        } else {
            alert('Catatan tidak ditemukan')
        }
    }

    return (
        <>
            <Navbar active_tab={1} />
            <main className='container'>
                <div className="items-center mb-4">
                    <div className="items-ceter mb-4">
                        <h1 className='text-center'>Semua Catatan</h1>
                        <button className='btn btn-primary text-white' onClick={() => navigate('/add-note')}>Tambah Catatan</button>
                    </div>
                    {
                        notes ? (
                            notes?.map((data, i) => (
                                <div className="row" key={i}>
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">{data?.title}</h5>
                                                <p className="card-subtitle mb-2 text-body-secondary">{data?.createdAt}</p>
                                                <p className="card-text">
                                                    {data?.body}
                                                </p>
                                                <a href="#" className="card-link" onClick={() => handleDelete(data?.id)}>Hapus</a>
                                                <a href="#" className="card-link" onClick={() => handleArchive(data?.id)}>Arsip</a>
                                                <a href="#" className="card-link" onClick={() => handleDetail(data?.id)}>Detail</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h1 className='text-center'>Tidak ada catatan</h1>
                        )
                    }
                </div>
                <main className="flex gap-5">
                    <div className="items-center mb-4">
                        <div>
                            <h1 className='text-center'>Archived Note</h1>
                        </div>
                        {
                            archivedNotes.length ? (
                                archivedNotes.map((data, i) => (
                                    <div className="row" key={i}>
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">{data?.title}</h5>
                                                    <p className='card-subtitle text-body-secondary'>{data.createdAt}</p>
                                                    <p className="card-text">
                                                        {data?.body}
                                                    </p>
                                                    <a href="#" className="card-link" onClick={() => handleDelete(data?.id)}>Hapus</a>
                                                    <a href="#" className="card-link" onClick={() => handleUnarchive(data?.id)}>Tampilkan</a>
                                                    <a href="#" className="card-link" onClick={() => handleDetail(data?.id)}>Detail</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <h1 className='text-center'>Tidak ada catatan diarsipkan</h1>
                            )
                        }
                    </div>
                </main>
            </main>
            <Footer />
        </>
    )
}