import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/notes-list';
import AddNote from './pages/add-note';
import NoteDetail from './pages/note-detail';
import Archived from './pages/notes-archive';
import RegistPage from './pages/regist-page';
import LoginPage from './pages/login-page';
import AuthHandler from './components/auth-handler';
import Navbar from './components/nav';
import { ThemeProvider } from './hooks/use-theme-context';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
    };
  }

  render() {
    const { authedUser } = this.state;

    return (
      <BrowserRouter>
        <ThemeProvider>
          <AuthHandler>
            {({ authedUser, onLoginSuccess, onLogout, initializing }) => (
              <>
                <Navbar logout={onLogout} name={authedUser ? authedUser.name : ''} />
                <Routes>
                  {authedUser ? (
                    <>
                      <Route path='/' element={<Home />}/>
                      <Route path='/add-note' element={<AddNote />}/>
                      <Route path='/notes/:id' element={<NoteDetail />}/>
                      <Route path='/archived' element={<Archived />}/>
                      <Route path='/login' element={<Navigate to='/' />}/>
                      <Route path='/register' element={<Navigate to='/' />}
                      />
                    </>
                  ) : (
                    <>
                      <Route
                        path='/'
                        element={
                          <LoginPage
                            authedUser={authedUser}
                            onLoginSuccess={onLoginSuccess}
                            onLogout={onLogout}
                            initializing={initializing}
                          />
                        }
                      />
                      <Route path='/register' element={<RegistPage />}/>
                      <Route path='/login' element={<Navigate to='/' />}/>
                    </>
                  )}
                </Routes>
              </>
            )}
          </AuthHandler>
        </ThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
