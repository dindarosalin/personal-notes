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
            <div className="container mx-auto">
                <main className="flex gap-5">
                    <Navbar active_tab={2} />
                    <div className='w-full mb-5'>
                        <div className="flex justify-between items-center mb-4">
                            <h1 className='font-semibold text-2xl'>Archived Note</h1>

                        </div>
                        {
                            content ? (
                                content?.map((data, i) => (
                                    <div className="" key={i}>
                                        <h1 className='font-medium text-lg'>{data?.title}</h1>
                                        <p className='font-light text-md mt-3'>
                                            {data?.body}
                                        </p>
                                        <div className="w-full flex justify-between mt-4">
                                            <small className='font-extralight text-gray-500'>
                                                {data?.createdAt}
                                            </small>
                                            <div className="icons flex gap-3">
                                                {/* <GrTrash
                                                    className='hover:text-red-500 hover:cursor-pointer'
                                                    onClick={() => deleteContent(data?.id)}
                                                />
                                                <GrArchive
                                                    className='hover:text-orange-500 hover:cursor-pointer'
                                                    onClick={() => archiveContent(data?.id)}
                                                /> */}
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