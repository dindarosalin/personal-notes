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
                <main className="flex gap-5">
                    <div className='w-full mb-5'>
                        <div className="flex justify-between items-center mb-4">
                            <h1 className='font-semibold text-2xl'>Semua Catatan</h1>
                            <button className='btn btn-primary text-white' onClick={() => navigate('/add-note')}>Tambah Catatan</button>
                        </div>
                        {/* Content Start */}
                        {
                            content ? (
                                content?.map((data, i) => (
                                    <div className="card" key={i}>
                                        <div className="card-body">
                                            <h5 className='card-title'>{data?.title}</h5>
                                            <p className='card-text'>
                                                {data?.body}
                                            </p>
                                            <div className="w-full flex justify-between mt-4">
                                                <small className='font-extralight text-gray-500'>
                                                    {data?.createdAt}
                                                </small>
                                                <div className="icons flex gap-3">
                                                <button className="btn btn-danger text-white" type="submit" onClick={() => deleteContent(data?.id)}>
                                                    Hapus</button>
                                                    <button className="btn btn-info text-white" type="submit" onClick={() => archiveContent(data?.id)}>
                                                    Arsip</button>
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
            <Footer></Footer>
        </>
    )
}