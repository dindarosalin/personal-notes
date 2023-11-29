import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/nav'
import Footer from '../components/footer'

export default function Archived() {
    const navigate = useNavigate()
    const [content, setContent] = useState([])

    const deleteContent = (id) => {
        const newContent = JSON.parse(sessionStorage?.getItem('notes'))?.filter((data) => {
            if (data?.id !== id) {
                return data
            }
        })
        setContent(newContent?.filter((data) => {
            if (data.archived) {
                return data
            }
        }))
        sessionStorage.setItem('notes', JSON.stringify(newContent))
        alert('Catatan berhasil dihapus')
    }
    const unarchiveContent = (id) => {
        const updatedContent = JSON.parse(sessionStorage?.getItem('notes'))?.map((data) => {
            if (data.id === id) {
                return { ...data, archived: false };
            }
            return data;
        });
        setContent(updatedContent?.filter((data) => {
            if (data.archived) {
                return data
            }
        }));
        sessionStorage.setItem('notes', JSON.stringify(updatedContent));

        alert('Catatan berhasil ditampilkan');
    }

    useEffect(() => {
        setContent(JSON.parse(sessionStorage.getItem('notes'))?.filter((data) => {
            if (data.archived) {
                return data
            }
        }))
    }, [])

    return (
        <>
            <div>
                <Navbar active_tab={2} />
                <div className="container">
                    <main className="flex gap-5">
                        <div className="items-center mb-4">
                            <div>
                                <h1 className='text-center'>Archived Note</h1>
                            </div>
                            {
                                content ? (
                                    content?.map((data, i) => (
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