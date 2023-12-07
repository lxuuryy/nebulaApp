import React from 'react'
import Main from './components/Main'
import Register from './components/Register'
import Login from './components/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Post from './components/Post'
import People from './components/People'
import Explore from './components/Explore'
import Sidebar from './components/Sidebar'


export default function App (){

 


  return(
  <div>
    <BrowserRouter>
   
      <Routes>
        <Route path='/' element={  <Main /> } />
          <Route path='/posts' element={<Post />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/people' element={<People />} />
          
        <Route path='/login' element={ <Login /> } />
        <Route path='/register'  element={<Register />} />
        
      </Routes>
    </BrowserRouter>
    </div>
  )
}
