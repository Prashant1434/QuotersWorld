import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login";
import { Link } from "react-router-dom";
import Register from "./register";
import Home from "./home";
import ProtectedRoute from "./ProtectedRoutes";
import MyQuotes from "./myquotes";
import Profile from "./profile";
import AddQuote from "./addQuote";
import EditQuote from "./editQuote";
import MyFavQuotes from "./myfavquotes";

function Controller() {
    return (<BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/register" exact component={Register}/>
            <ProtectedRoute path="/myquote" exact component={MyQuotes}/>
            <ProtectedRoute path="/profile" exact component={Profile}/>
            <ProtectedRoute path="/addQuote" exact component={AddQuote}/>
            <ProtectedRoute path="/fav_quotes/:user_id/:id" exact component={MyFavQuotes}/>
            <ProtectedRoute path="/editQuote/:text/:author/:id" exact component={EditQuote}/>
            <ProtectedRoute path="/home" exact component={Home}/>
        </Switch>
    </BrowserRouter>);
}

export default Controller;
