import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div style={{display:"flex",justifyContent:"center",margin:"10px 0px 30px 0px"}}>
      <center>
      <Link to={"/Login"}>Login/</Link>
      <Link to={"/Signup"}>SignUp/</Link>
      <Link to={"/JobPost"}>JobPost</Link>
      </center>
    </div>
  )
}

export default Navbar