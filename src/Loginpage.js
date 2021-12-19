import React, {useContext} from 'react'
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import AuthContext from './context/AuthContext'

const Loginpage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const {user} = useContext(AuthContext)
    const {loginUser} = useContext(AuthContext)
    return (
        <div>
            <form onSubmit={loginUser}>
                <div className="form_control">
                    <label>Email</label>
                    <input type="text" name="email" value={username} onChange={(e)=> {setUsername(e.target.value)}} placeholder="username"/>
                </div>
                <div className="form_control">
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={(e)=> {setPassword(e.target.value)}} placeholder="password"/>
                </div>
                <input type="submit" value="Log in" className="button_control"/>
            </form>
        </div>
    )
}

export default Loginpage

