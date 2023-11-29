import React, { useEffect, useState } from 'react'
import Navbar from '../components/nav'
import Footer from '../components/footer'
import { useNavigate } from 'react-router-dom'

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
        sessionStorage.setItem('catatanku', JSON.stringify(newContent))
        alert('Berhasil di Hapus')
    }
    const archiveContent = (id) => {
        const updatedContent = JSON.parse(sessionStorage?.getItem('catatanku'))?.map((data) => {
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
        sessionStorage.setItem('catatanku', JSON.stringify(updatedContent));

        alert('Berhasil dimasukkan ke Archived!');
    }

    useEffect(() => {
        setContent(JSON.parse(sessionStorage.getItem('catatanku'))?.filter((data) => {
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
                        <div className="flex justify-between items-center mb-4">             
                            <h1 className=''>Semua Catatan</h1>
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
                                                    <h6 class="card-subtitle mb-2 text-body-secondary">{data?.createdAt}</h6>
                                                    <p className="card-text">
                                                        {data?.body}
                                                    </p>
                                                    <a href="#" className="card-link" onClick={() => deleteContent(data?.id)}>Hapus</a>
                                                    <a href="#" className="card-link" onClick={() => archiveContent(data?.id)}>Arsip</a>
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