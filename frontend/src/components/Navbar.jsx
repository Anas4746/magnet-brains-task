
import React from 'react'
import Style from "../css/Navbar.module.css"
import { useNavigate } from 'react-router-dom'

function Navbar() {
  let navigate = useNavigate()

  let logoutUser = ()=>{
    localStorage.removeItem('token')
    navigate("/login")
  }
  let naivgateLogin = ()=>{
    navigate("/login")
  }
  let naivgateSignUp = ()=>{
    navigate("/")
  }
  
  return (
    <>
        <div className={Style.main}>
            <div className={Style.container}>
              <div className={Style.user}>
                {localStorage.getItem("token")? <button className={Style.logout} onClick={logoutUser}>Logout</button>
                :
                <>
                <button className={Style.login} onClick={naivgateLogin}>LogIn</button>
                <button className={Style.Signup} onClick={naivgateSignUp}>SignUp</button>
                </>
                }
              </div>
            </div>
        </div>
    </>
  )
}

export default Navbar