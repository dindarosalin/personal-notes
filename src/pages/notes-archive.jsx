import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/footer'
import { getArchivedNotes } from '../utils/local-data'

export default function Archived() {
    const navigate = useNavigate()
    const [notes, setNotes] = useState([])

    useEffect(() => {
        const allNotes = getArchivedNotes()
        setNotes(allNotes)
    }, []);

    return (
        <>
            <div>
                <div className="container">
                    <main className="flex gap-5">
                        <div className="items-center mb-4">
                            <div>
                                <h1 className='text-center'>Archived Note</h1>
                            </div>
                            {
                                notes ? (
                                    notes?.map((data, i) => (
                                        <div className="row" key={i}>
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">{data?.title}</h5>
                                                        <p className='card-subtitle text-body-secondary'>{data.createdAt}</p>
                                                        <p className="card-text">
                                                            {data?.body}
                                                        </p>
                                                        <a href="#" className="card-link" onClick={() => deleteContent(data?.id)}>Hapus</a>
                                                        <a href="#" className="card-link" onClick={() => unarchiveContent(data?.id)}>Tampilkan</a>
                                                        <a href="#" className="card-link" onClick={() => navigate(`/note-detail/${data?.id}`)}>Detail</a>
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
                    </main>
                </div>
                <Footer />
            </div>
        </>
    )
}