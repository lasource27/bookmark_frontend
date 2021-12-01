import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route} from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

import Homepage from "./Homepage"
import Loginpage from "./Loginpage"
import PrivateRoute from "./utils/PrivateRoute"



const App = () => {

 
    return (
      <Router>
        <AuthProvider>
          <PrivateRoute component={Homepage} path="/" exact/>
          <Route component={Loginpage} path="/login" exact/>
        </AuthProvider>
      </Router>
  )
}



export default App

