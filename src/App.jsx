import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Studentform from './Componenets/Studentform'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Showstudentlist from './Componenets/Showstudentlist'
import Header from './Componenets/Header'
import Updateform from './Componenets/Updateform'
import Signup from './Componenets/Signup'
import Signin from './Componenets/Signin'
import { Provider } from 'react-redux'
import { store } from './Redux/Store'

function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>

            <Route path="/" element={<Studentform />} />
            <Route path="/studentlist" element={<Showstudentlist />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />

            <Route path='/updateform/:id' element={<Updateform />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
