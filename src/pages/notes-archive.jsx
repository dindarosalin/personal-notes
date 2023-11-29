import React, { useEffect, useState } from 'react'
import Navbar from '../components/nav'
import Footer from '../components/footer'

export default function Archived() {
    const [content, setContent] = useState([])

    const deleteContent = (id) => {
        const newContent = JSON.parse(sessionStorage?.getItem('catatanku'))?.filter((data) => {
            if (data?.id !== id) {
                return data
            }
        })
        setContent(newContent?.filter((data) => {
            if (data.archived) {
                return data
            }
        }))
        sessionStorage.setItem('catatanku', JSON.stringify(newContent))
        alert('Berhasil di Hapus')
    }
    const unarchiveContent = (id) => {
        const updatedContent = JSON.parse(sessionStorage?.getItem('catatanku'))?.map((data) => {
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
        sessionStorage.setItem('catatanku', JSON.stringify(updatedContent));

        alert('Berhasil di Aktifkan Kembali!');
    }

    useEffect(() => {
        setContent(JSON.parse(sessionStorage.getItem('catatanku'))?.filter((data) => {
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
                    <div className='w-full mb-5'>
                        <div className="flex justify-between items-center mb-4">
                            <h1 className='font-semibold text-2xl'>Archived Note</h1>

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
                    </div>
                </main>
            </div>
            <Footer></Footer>
        </div>
        </>
    )
}