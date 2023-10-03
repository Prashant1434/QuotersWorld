import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import NavBar from "./Nanbar";

function MyQuotes() {
    // debugger;
    var [myquote, setMyquote] = useState([]);
    useEffect(() => { getMyQuotes(); }, []);
    var [message, setMessage] = useState("");
    var [isVIsible, setVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setVisible(false);
        }, 5000);
        setTimeout(() => {
            setMessage("");
        }, 5000)
    }, [message, isVIsible]);

    var history = useHistory();
    var user_id = sessionStorage.getItem("user_id");
    const getMyQuotes = () => {
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = () => {
            debugger;
            if (helper.readyState == 4 && helper.status == 200) {
                var data = JSON.parse(helper.responseText);
                setMyquote(data);
            }
        }
        helper.open("GET", "http://127.0.0.1:9999/user/showquote/" + user_id);
        helper.send();
    }
    const SignOut = () => {
        sessionStorage.removeItem("IsLoggedIn");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("user_id");
        history.push("/");
    }

    const DeleteMyQuote = (quote_id) => {
        debugger;
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = () => {
            debugger;
            if (helper.readyState == 4 && helper.status == 200) {
                var data = JSON.parse(helper.responseText);
                if (data.affectedRows != undefined && data.affectedRows > 0) {
                    setMessage("Delete Successfull !!! ");
                    setVisible(true);
                    getMyQuotes();
                }
            }
        }
        helper.open("DELETE", "http://127.0.0.1:9999/quotes/" + quote_id);
        helper.send();
    }

    const GoToAddQuote = () => {
        history.push("/addQuote");
    }

    const GoToEdit = (text, author, id) => {
        history.push("/editquote/" + text + "/" + author + "/" + id);
    }

    return (<>
       <NavBar/>
        <div className="container text-center">
            <h4>MyQuotes</h4>
        </div>
        <br></br>
        <div className="container text-center"><button type="button" className="btn btn-primary" onClick={GoToAddQuote}>Add Quote</button></div>
        
        <br></br>
        <div className="container">

            <div className="table-responsive">
                <table className="table table-hover table-bordered">

                    <tbody>

                        {
                            myquote.map((quote) => {
                                return <tr>
                                    <td><div>
                                        {""}{quote.text}
                                    </div>
                                        <div>
                                            {"  "}{"@"}{quote.author}
                                        </div></td>

                                    <td><button type="button" className="btn btn-warning" onClick={() => { GoToEdit(quote.text, quote.author, quote.id) }}>Edit</button></td>
                                    <td> <button type="button" className="btn btn-danger" onClick={() => { DeleteMyQuote(quote.id) }}>Delete</button></td>
                                </tr>

                            })
                        }

                    </tbody>
                </table>
            </div>
            <div className='alert alert-danger' style={{ opacity: isVIsible ? 1 : 0 }}>
                {message}
            </div>
        </div>

    </>);
}

export default MyQuotes;