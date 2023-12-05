import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Footer from '../components/footer'
import { getNote } from '../utils/api'

export default function DetailNote() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [note, setNote] = useState(null)

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await getNote(id)
        if (!response.error) {
          setNote(response.data)
        } else {
          navigate('/not-found')
        }
      } catch (error) {
        console.error('Error fetching note:', error)
        navigate('/not-found')
      }
    }

    fetchNote()
  }, [id, navigate])

  return (
    <>
      <div className="container">
        <div className="items-center mb-4">
          <h1 className="text-center">Detail Catatan</h1>
        </div>
        {note ? (
          <div className="items-center mb-4">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title">{note.title}</h1>
                <p className="card-subtitle text-body-secondary">{note.createdAt}</p>
                <p className="card-text">{note.body}</p>
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
