import { useState, useEffect, useContext, useHistory } from "react"
import { Redirect } from "react-router-dom"


const Loginsuccess = () => {

    const [redirect, setRedirect] = useState(false)
  
    useEffect (() => {
        console.log("1")
        let myTimeout = setTimeout(() => setRedirect(true), 1000*4);
        console.log("2")
        return () => {
            clearTimeout(myTimeout);
        }
    }, [redirect])


    return (
        <div>
            <h1>Verification success, redirecting to login page..</h1>
            {redirect ? <Redirect to="/login" /> : ''}
        </div>
    )
}

export default Loginsuccess
