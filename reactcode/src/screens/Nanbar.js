import { Link, useHistory } from "react-router-dom";

function NavBar() {
    const history = useHistory();
    const username = sessionStorage.getItem("name");
    const SignOut = () => {
        sessionStorage.removeItem("IsLoggedIn");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("user_id");
        history.push("/");
    }
    return (<>

        <nav>
            <div style={{ paddingLeft: "20px", display:"flex" ,flexWrap:"nowrap" , backgroundColor:"black" }}>

                <div>
                    <Link to={`/home`} activeClassName="current">
                        <button className="btn btn-primary"> Home</button>
                    </Link>{"  "}
                </div>
                <div>
                    <Link to={`/myquote`} activeClassName="current">
                        <button className="btn btn-info"> MyQuotes</button>
                    </Link>{"  "} {"  "}
                </div>
                <div>
                    <Link to={`/profile`} activeClassName="current">
                        <button className="btn btn-warning"> Profile</button>
                    </Link>
                </div>
                <div style={{position:"absolute", left:"50%" , top:"3px" , fontSize:"30px"  }}>
                    <p style={{ color: "Highlight" }}> Welcome {username}</p>
                </div>
                <div style={{position:"absolute", right:"30px"}}>
                    <button type="button" className="btn btn-danger" onClick={SignOut}>Logout</button>
                </div>


            </div>
        </nav>
    </>);
}

export default NavBar;