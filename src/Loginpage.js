import React from 'react'
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'

const Loginpage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div>
            <form>
                <div className="form_control">
                    <label>Email</label>
                    <input type="text" value={username} onChange={(e)=> {setUsername(e.target.value)}} placeholder="username"/>
                </div>
                <div className="form_control">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e)=> {setUsername(e.target.value)}} placeholder="password"/>
                </div>
                <input type="submit" value="Log in" className="button_control"/>
            </form>
        </div>
    )
}

export default Loginpage

