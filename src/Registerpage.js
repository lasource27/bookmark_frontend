import React, {useContext} from 'react'
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import AuthContext from './context/AuthContext'



const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {user} = useContext(AuthContext)
    const {registerUser} = useContext(AuthContext)
    return (
        <div>
            <h1>Register Page</h1>
            <form onSubmit={registerUser}>
                <div className="form_control">
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={(e)=> {setUsername(e.target.value)}} placeholder="username"/>
                </div>
                <div className="form_control">
                    <label>Email</label>
                    <input type="text" name="email" value={email} onChange={(e)=> {setEmail(e.target.value)}} placeholder="email"/>
                </div>
                <div className="form_control">
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={(e)=> {setPassword(e.target.value)}} placeholder="password"/>
                </div>
                <input type="submit" value="Register" className="button_control"/>
            </form>
        </div>
    )
}

export default Register
