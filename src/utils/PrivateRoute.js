import {Route, Redirect} from 'react-router-dom'
import { useContext } from 'react/cjs/react.development';
import AuthContext from '../context/AuthContext';


const PrivateRoute = ({children, ...rest}) => {
    const {user} = useContext(AuthContext)
    // console.log("privateroute", user, rest, children)
    return (
        <Route {...rest}>{!user ? <Redirect to="/login"/> : children}</Route>
    )
}
export default PrivateRoute;