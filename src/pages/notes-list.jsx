import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/nav'
import Footer from '../components/footer'

export default function Home() {
    const navigate = useNavigate()
    const [content, setContent] = useState([])

    const deleteContent = (id) => {
        const newContent = content.filter((data) => {
            if (data?.id !== id) {
                return data
            }
        })
        setContent(newContent)
        sessionStorage.setItem('notes', JSON.stringify(newContent))
        alert('Berhasil di Hapus')
    }
    const archiveContent = (id) => {
        const updatedContent = JSON.parse(sessionStorage?.getItem('notes'))?.map((data) => {
            if (data.id === id) {
                return { ...data, archived: true };
            }
            return data;
        });
        setContent(updatedContent?.filter((data) => {
            if (data.archived) {
            } else {
                return data
            }
        }));
        sessionStorage.setItem('notes', JSON.stringify(updatedContent));

        alert('Berhasil dimasukkan ke Archived!');
    }

    useEffect(() => {
        setContent(JSON.parse(sessionStorage.getItem('notes'))?.filter((data) => {
            if (data.archived) {
            } else {
                return data
            }
        }))
    }, [])

    return (
        <>
            <Navbar />
            <div className="container">
                <main className="">
                        <div className="items-center mb-4">             
                            <h1 className='text-center'>Semua Catatan</h1>
                            <button className='btn btn-primary text-white' onClick={() => navigate('/add-note')}>Tambah Catatan</button>
                        </div>
                        {
                            content ? (
                                content?.map((data, i) => (
                                    <div className="row" key={i}>
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">{data?.title}</h5>
                                                    <p className="card-subtitle mb-2 text-body-secondary">{data?.createdAt}</p>
                                                    <p className="card-text">
                                                        {data?.body}
                                                    </p>
                                                    <a href="#" className="card-link" onClick={() => deleteContent(data?.id)}>Hapus</a>
                                                    <a href="#" className="card-link" onClick={() => archiveContent(data?.id)}>Arsip</a>
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
                </main>
            </div>
            <Footer></Footer>
        </>
    )
}