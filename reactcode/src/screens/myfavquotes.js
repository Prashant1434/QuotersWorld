import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "./Nanbar";

function MyFavQuotes() {
    var [myFavQuotes, setMyFavQuote] = useState([]);
    var { id } = useParams();
    var { user_id } = useParams();
    useEffect(() => { getMyFavQuotes(); }, [])
    const getMyFavQuotes = () => {
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = () => {
            debugger;
            if (helper.readyState == 4 && helper.status == 200) {
                var data = JSON.parse(helper.responseText);
                setMyFavQuote(data);
            }
        }
        helper.open("GET", "http://127.0.0.1:9999/fav/" + user_id + "/" + id);
        helper.send();
    }

    const history = useHistory();
    const SignOut = () => {
        sessionStorage.removeItem("IsLoggedIn");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("user_id");
        history.push("/");
    }

    return (<>
        <NavBar />
        <div class="container" style={{ padding: '2%' }}>
            <h5>
                Favourite Quotes
            </h5>
            <div class="table-responsive">
                <table class="table table-hover table-bordered" style={{ textAlign: "center" }}>
                    <thead style={{ backgroundColor: "bisque" }}>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Quote</th>
                        <th>Author</th>
                    </thead>
                    <tbody>
                        {
                            myFavQuotes.map((quote) => {
                                return <tr>
                                    <td>{quote.first_name}</td>
                                    <td>{quote.last_name}</td>
                                    <td>{quote.text}</td>
                                    <td>{quote.author}</td>
                                </tr>
                            })

                        }
                    </tbody>
                </table>
            </div>

        </div>

    </>);
}

export default MyFavQuotes;

// 43 supply ghoda camp road shahi baug near by FCI