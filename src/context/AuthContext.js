import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";


const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [user, setUser] =  useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    const history = useHistory()
    const [loading, setLoading] = useState(true)

    const loginUser = async(e) => {
        e.preventDefault()
        const response = await fetch('http://127.0.0.1:8000/backend/token/',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })

        const data = await response.json()
        console.log("data:",data)
        console.log("response:",response)
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            // @@@console.log("localstorage",localStorage.getItem('authTokens'))
            // console.log("localstorage+decode",jwt_decode(localStorage.getItem('authTokens')))
            history.push('/')
        } else {
            alert("Incorrect username or password!")
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history.push('/')
    }

    const updateToken = async() => {
        const response = await fetch('http://127.0.0.1:8000/backend/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body:JSON.stringify({'refresh':authTokens.refresh})
        })

        const data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }

    }

    let contextData = {
        loginUser: loginUser,
        user: user,
        authTokens: authTokens,
    }


    useEffect(() => {
        console.log('effect called')
        let access_token_interval = 1000 * 60 * 4
        let interval = setInterval(() => {
            console.log('interval called')
            if(authTokens){
                updateToken()
            }
        }, access_token_interval);
        return () => {
            console.log('cleanup called')
            clearInterval(interval);
        }
    },[authTokens,])
    
    
    
    return (
        <AuthContext.Provider value={contextData}>
            {children}
            {/* {loading ? null : children} */}
        </AuthContext.Provider>
    )
}