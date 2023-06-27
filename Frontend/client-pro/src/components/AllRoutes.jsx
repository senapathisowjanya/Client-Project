import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import JobPost from '../pages/JobPost'

function AllRoutes() {
  return (
    <div>
        <Routes>
            <Route path='/Login' element={<Login/>}/>
            <Route path='/Signup' element={<Signup />} />
            <Route path='/JobPost' element={<JobPost />} />
        </Routes>
    </div>
  )
}

export default AllRoutes