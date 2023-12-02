import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/nav'
import Footer from '../components/footer'
import { getAllNotes, archiveNote, deleteNote, getArchivedNotes, unarchiveNote, getNote } from '../utils/local-data'

export default function Home() {
    const navigate = useNavigate()
    const [notes, setNotes] = useState([])
    const [archivedNotes, setArchivedNotes] = useState([])
    const [searchTerm, setSearchTerm] = useState([])
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        const allNotes = getAllNotes();
        const filteredNotes = allNotes.filter((note) => !note.archived);
        setNotes(filteredNotes);

        const archived = getArchivedNotes();
        setArchivedNotes(archived);
    }, [])

    const handleSearch = () => {
        const results = notes.filter(note =>
            note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.body.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
        console.log(results);
    };

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
            <Navbar />
            <main className='container'>
                <div className="items-center mt-4">
                    <div className='d-flex' role='search'>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Cari Catatan"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} />
                        <button className="btn btn-primary text-white" onClick={handleSearch}>Search</button>
                    </div>
                    <div className="row" >
                        {
                            searchResults.length > 0 ? (
                                searchResults.map((data, i) => (
                                    <div className="col-sm-4 mb-3 mb-sm-0 mt-3" key={i}>
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">{data?.title}</h5>
                                                <p className="card-subtitle mb-2 text-body-secondary">{data?.createdAt}</p>
                                                <p className="card-text">{data?.body}</p>
                                                <a href="#" className="card-link" onClick={() => handleDelete(data?.id)}></a>
                                                <a href="#" className="card-link" onClick={() => handleArchive(data?.id)}>Arsip</a>
                                                <a href="#" className="card-link" onClick={() => handleDetail(data?.id)}>Detail</a>
                                            </div>
                                        </div>
                                    </div>

                                ))
                            ) : (
                                <p className='mt-3'>Tidak ada hasil pencarian</p>
                            )
                        }
                    </div>
                </div>
                <div className="items-center mb-4">
                    <div className="items-center mt-4">
                        <h1 className='text-center'>Semua Catatan</h1>
                        <button className='btn btn-primary text-white' onClick={() => navigate('/add-note')}>Tambah Catatan</button>
                    </div>
                    <div className='row'>
                        {notes ? (
                            notes?.map((data, i) => (
                                <div className="col-sm-4 mb-3 mt-4 mb-sm-0" key={i}>
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
                            ))
                        ) : (
                            <h1 className='text-center'>Tidak ada catatan</h1>
                        )
                        }
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="items-center mb-4">
                        <div>
                            <h1 className='text-center'>Archived Note</h1>
                        </div>
                        <div className="row" >
                            {
                                archivedNotes.length ? (
                                    archivedNotes.map((data, i) => (

                                        <div className="col-sm-4 mb-3 mt-3 mb-sm-0" key={i}>
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

                                    ))
                                ) : (
                                    <h1 className='text-center'>Tidak ada catatan diarsipkan</h1>
                                )
                            }
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}