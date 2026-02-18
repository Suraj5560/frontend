import React from 'react'
import { Route,  Routes } from 'react-router-dom'
import CreateFeed from './Components/CreateFeed'
import './App.css'
import Feed from './Components/Feed'

const App = () => {
  return (
    <div>
      
      <Routes>
          <Route path='/create-post' element = { <CreateFeed/> } />
          <Route path='/feed' element = { <Feed/> } />
      </Routes>
    
    </div>
  )
}

export default App
