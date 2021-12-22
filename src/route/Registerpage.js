import React, {useContext} from 'react'
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'



const Registerpage = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [registerSuccess, setRegisterSuccess] = useState('')
    const [registerFeedback, setRegisterFeedback] = useState([])

    const {user} = useContext(AuthContext)

    const registerUser = async(e) => {
        e.preventDefault()
        const response = await fetch('http://127.0.0.1:8000/backend/register/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body:JSON.stringify({'username':e.target.username.value, 'email':e.target.email.value, 'password':e.target.password.value})
        })
        const data = await response.json()
        if (response.status === 201) {
            setRegisterSuccess(true)
            setRegisterFeedback([data.email])
        } else {
            setRegisterSuccess(false)
            setRegisterFeedback([data.email, data.username])
            console.log(registerFeedback)
        }
        
        console.log("data:",data, response.status)
    }


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
                {registerSuccess ? 
                    <p>
                        Your user registration was successful.
                        Please go to {registerFeedback} and verify your email.
                    </p>
                    :
                    registerFeedback.map(x => <p>{x}</p>)
                }
            </form>
        </div>
    )
}

export default Registerpage
