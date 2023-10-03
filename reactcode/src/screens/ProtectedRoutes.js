import { useHistory , Route} from "react-router-dom";
import Login from "./Login";

function ProtectedRoute(props) {
    
    var isLoggedIn = sessionStorage.getItem("IsLoggedIn");
    
    var name = sessionStorage.getItem("name");
    
    const history = useHistory();

    if (isLoggedIn != null && isLoggedIn == 'true') {
        return <Route path={props.path} exact component={props.component} />
    }

    else {
        return <Login></Login>
    }
}

export default ProtectedRoute;