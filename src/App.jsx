import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/notes-list'
import AddNote from './pages/add-note'
import NoteDetail from './pages/note-detail'
import Archived from './pages/notes-archive'
import SearchResult from './components/nav'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add-note' element={<AddNote />} />
          <Route path='/note-detail/:id' element={<NoteDetail />} />
          <Route path='/archived' element={<Archived />} />
          <Route path='/search/:searchTerm' element={<SearchResult/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
