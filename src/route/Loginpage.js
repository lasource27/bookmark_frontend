import React, {useContext} from 'react'
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const Loginpage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {user} = useContext(AuthContext)
    const {loginUser} = useContext(AuthContext)
    return (
        <div className="login_page">
            <div className="login_image"></div>
            <div className="login_content">
                <div className="login_content_container">
                    <div className="login_content_bg"></div>
                    <form className="login_form" onSubmit={loginUser}>
                        <h1>Login Page</h1>
                        <div className="form_control login">
                            
                            <div className="login_icon">
                            <FontAwesomeIcon icon="user" />
                            </div>
                            <input type="text" name="email" value={email} onChange={(e)=> {setEmail(e.target.value)}} placeholder="email"/>
                        </div>
                        <div className="form_control">
                            <label>Password</label>
                            <input type="password" name="password" value={password} onChange={(e)=> {setPassword(e.target.value)}} placeholder="password"/>
                        </div>
                        <input type="submit" value="Log in" className="login_button"/>
                        <Link to="/register" style={{ textDecoration: 'none', backgroundColor: "#00264d", color: "white", width: "200px", height: "30px", borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "600" }}>Register</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Loginpage

