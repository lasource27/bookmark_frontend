import React, {useContext} from 'react'
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import AuthContext from './context/AuthContext'

const Loginpage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    let {user} = useContext(AuthContext)
    let {loginUser} = useContext(AuthContext)
    return (
        <div>
            <p>hello, {user}</p>   
            <form onSubmit={loginUser}>
                <div className="form_control">
                    <label>Email</label>
                    <input type="text" name="username" value={username} onChange={(e)=> {setUsername(e.target.value)}} placeholder="username"/>
                </div>
                <div className="form_control">
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={(e)=> {setPassword(e.target.value)}} placeholder="password"/>
                </div>
                <input type="submit" value="Log in" className="button_control"/>
                <Link to="/" style={{ textDecoration: 'none'}} className="button_control">Home</Link>
            </form>
        </div>
    )
}

export default Loginpage

