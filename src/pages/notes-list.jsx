import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Footer from '../components/footer'
import {
  getActiveNotes,
  archiveNote,
  deleteNote,
  getNote,
} from '../utils/api'
import * as Icon from 'react-bootstrap-icons'

export default function Home() {
  const navigate = useNavigate()
  const [notes, setNotes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allNotesResponse = await getActiveNotes()
        if (!allNotesResponse.error) {
          const allNotes = allNotesResponse.data
          setNotes(allNotes)
        } else {
          alert('Gagal mengambil catatan')
        }
      } catch (error) {
        alert('Gagal mengambil catatan')
      }
    }
    fetchData()
  }, [])

  const handleSearch = () => {
    const results = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.body.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)
    console.log(results)
  }

  const handleDelete = async (id) => {
    try {
      await deleteNote(id)
      alert('Catatan berhasil dihapus')
      const updatedNotesResponse = await getActiveNotes()
      if (!updatedNotesResponse.error) {
        const updatedNotes = updatedNotesResponse.data
        setNotes(updatedNotes.filter((note) => !note.archived))
      }
    } catch {
      alert('Catatan gagal dihapus')
    }
  }

  const handleArchive = async (id) => {
    try {
      await archiveNote(id)
      alert('Catatan berhasil diarsipkan')
      const updatedNotesResponse = await getActiveNotes()
      if (!updatedNotesResponse.error) {
        const updatedNotes = updatedNotesResponse.data
        setNotes(updatedNotes.filter((note) => !note.archived))
      }
    } catch {
      alert('Catatan gagal diarsipkan')
    }
  }

  return (
    <>
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
            <button className="btn btn-highlight" onClick={handleSearch}>
              Search
            </button>
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
                        <Link className="card-link link-highlight" onClick={() => handleDelete(data?.id)}><Icon.Trash2Fill /></Link>
                        <Link className="card-link link-highlight" onClick={() => handleArchive(data?.id)}><Icon.ArchiveFill /></Link>
                        <Link to={`/notes/${data.id}`} className="card-link link-highlight"><Icon.EnvelopeHeartFill /></Link>
                      </div>
                    </div>
                  </div>

                ))
              ) : (
                <p className='mt-3'>Tidak ada pencarian</p>
              )
            }
          </div>
        </div>
        <div className="items-center mb-4">
          <div className="d-flex justify-content-between align-items-center">
          <h1 className=''>Catatan Aktif</h1>
          <Link className="btn btn-highlight" to="/add-note" onClick={() => navigate('/add-note')}>+ Add Note</Link>
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
                      <Link className="card-link link-highlight" onClick={() => handleDelete(data?.id)}><Icon.Trash2Fill /></Link>
                      <Link className="card-link link-highlight" onClick={() => handleArchive(data?.id)}><Icon.ArchiveFill /></Link>
                      <Link to={`/notes/${data.id}`} className="card-link link-highlight"><Icon.EnvelopeHeartFill /></Link>
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
      </main>
      <Footer />
    </>
  )
}