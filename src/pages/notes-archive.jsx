import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Footer from '../components/footer'
import { deleteNote, getArchivedNotes, unarchiveNote, getActiveNotes, getNote } from '../utils/api'
import * as Icon from 'react-bootstrap-icons'

export default function Archived() {
  const navigate = useNavigate()
  const [archivedNotes, setArchivedNotes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const archivedNotesResponse = await getArchivedNotes()
        if (!archivedNotesResponse.error) {
          const archivedNotesData = archivedNotesResponse.data
          setArchivedNotes(archivedNotesData)
        } else {
          alert('Gagal mengambil catatan diarsipkan')
        }
      } catch (error) {
        alert('Gagal mengambil catatan diarsipkan')
      }
    }

    fetchData()
  }, [])

  const handleSearch = () => {
    const results = archivedNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.body.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)
  }

  const handleUnarchive = async (id) => {
    try {
      await unarchiveNote(id)
      alert('Catatan berhasil ditampilkan')
      const updatedNotesResponse = await getActiveNotes()
      if (!updatedNotesResponse.error) {
        const updatedNotes = updatedNotesResponse.data
        setArchivedNotes(updatedNotes.filter((note) => note.archived))
      }
    } catch {
      alert('Catatan gagal ditampilkan')
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteNote(id)
      alert('Catatan berhasil dihapus')
      const updatedNotesResponse = await getActiveNotes()
      if (!updatedNotesResponse.error) {
        const updatedNotes = updatedNotesResponse.data
        setArchivedNotes(updatedNotes.filter((note) => note.archived))
      }
    } catch {
      alert('Catatan gagal dihapus')
    }
  }

  const handleDetail = (id) => {
    const note = getNote(id)
    if (note) {
      navigate(`${BASE_URL}/notes/${id}`)
    } else {
      alert('Catatan tidak ditemukan')
    }
  }

  return (
    <>
      <main className="container">
        <div className="items-center mt-4">
          <div className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Cari Catatan"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-highlight" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div className="row">
            {searchResults.length > 0 ? (
              searchResults.map((data, i) => (
                <div className="col-sm-4 mb-3 mb-sm-0 mt-3" key={i}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{data?.title}</h5>
                      <p className="card-subtitle mb-2 text-body-secondary">{data?.createdAt}</p>
                      <p className="card-text">{data?.body}</p>
                      <Link className="card-link link-highlight" onClick={() => handleDelete(data?.id)}><Icon.Trash2Fill /></Link>
                      <Link className="card-link link-highlight"  onClick={() => handleUnarchive(data?.id)}><Icon.Folder2Open /></Link>
                      <Link to={`/notes/${data.id}`} className="card-link link-highlight"><Icon.EnvelopeHeartFill /></Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="mt-3">Tidak ada pencarian</p>
            )}
          </div>
        </div>
        <div className="items-center mb-4">
          <div>
            <h1 className="text-center">Archived Note</h1>
          </div>
          <div className="row">
            {archivedNotes.length ? (
              archivedNotes.map((data, i) => (
                <div className="col-sm-4 mb-3 mt-3 mb-sm-0" key={i}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{data?.title}</h5>
                      <p className="card-subtitle text-body-secondary">{data.createdAt}</p>
                      <p className="card-text ">{data?.body}</p>
                      <Link className="card-link link-highlight" onClick={() => handleDelete(data?.id)}><Icon.Trash2Fill /></Link>
                      <Link className="card-link link-highlight" onClick={() => handleUnarchive(data?.id)}><Icon.Folder2Open /></Link>
                      <Link to={`/notes/${data.id}`} className="card-link link-highlight"><Icon.EnvelopeHeartFill /></Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="text-center">Tidak ada catatan diarsipkan</h1>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
