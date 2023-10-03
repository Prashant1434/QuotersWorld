import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "./Nanbar";

function AddQuote() {
    const history = useHistory();
    var id = sessionStorage.getItem("user_id");
    var [record, setRecord] = useState({ author: "", text: "" });

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
    
    const SignOut = () => {
        sessionStorage.removeItem("IsLoggedIn");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("user_id");
        history.push("/");
    }

    const Add = () => {
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = () => {
            debugger;
            if (helper.readyState == 4 && helper.status == 200) {
                var receivedData = JSON.parse(helper.responseText);
                // setAllQuotes(receivedData);
                if (receivedData.affectedRows != undefined && receivedData.affectedRows > 0) {
                    setMessage("Add Successfull !!! ");
                    setVisible(true);
                    history.push("/myquote");
                }
            }
        };
        helper.open("POST", "http://127.0.0.1:9999/quotes/"+id);
        helper.setRequestHeader("Content-Type","application/json");
        helper.send(JSON.stringify(record));
    }

    const onTextChange = (args) => {
        var copyOfRecord = { ...record };
        copyOfRecord[args.target.name] = args.target.value;
        setRecord(copyOfRecord);
    }

    return (<>
        <NavBar/>
        <br></br>
        <div class="container" style={{ width: 800 }}>
            <form>
                <legend>Add Quote</legend>

                <div className="form-group">
                    <label for="">Author</label>
                    <input type="text" className="form-control" id="" placeholder="Enter Author" onChange={onTextChange} name="author" />
                </div><br></br>
                <div className="form-group">
                    <label for="">Quote</label>
                    <textarea className="form-control" id="" placeholder="Enter Quote" onChange={onTextChange} name="text" />
                </div>
                <br></br>
                <button type="button" className="btn btn-primary" onClick={Add}>Add</button>
            </form>
        </div>
        <div className='alert alert-danger' style={{ opacity: isVIsible ? 1 : 0 }}>
                {message}
            </div>


    </>);
}

export default AddQuote;