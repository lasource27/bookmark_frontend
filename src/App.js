import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route} from "react-router-dom"

import Homepage from "./Homepage"
import Loginpage from "./Loginpage"


const App = () => {

 
    return (
      <Router>
        <Route component={Homepage} path="/" exact/>
        <Route component={Loginpage} path="/login" exact/>
      </Router>
  )
}



export default App

