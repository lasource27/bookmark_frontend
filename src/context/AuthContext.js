import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";


const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    const [user, setUser] =  useState(null)
    const [authTokens, setAuthTokens] = useState(null)

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
            console.log(jwt_decode(data.access));
            setUser(jwt_decode(data.access).username)
        } else {
            alert("Page error")
        }
    }

    let contextData = {
        loginUser: loginUser,
        user: user,
    }
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}