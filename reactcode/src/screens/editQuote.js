import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

function EditQuote() {
    debugger;
    var { text } = useParams();
    var { author } = useParams();
    var { id } = useParams();
    var [record, setRecord] = useState({ text: text, author: author });

    var [message, setMessage] = useState("");
    var [isVIsible, setVisible] = useState(false);

    const history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            setVisible(false);
        }, 5000);
        setTimeout(() => {
            setMessage("");
        }, 5000)
    }, [message, isVIsible]);

    const onTextChange = (args) => {
        var copyOfRecord = { ...record };
        copyOfRecord[args.target.name] = args.target.value;
        setRecord(copyOfRecord);
    }

    const EditQuote = () => {
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = () => {
            debugger;
            if (helper.readyState == 4 && helper.status == 200) {
                var data = JSON.parse(helper.responseText);
                if (data.affectedRows != undefined && data.affectedRows > 0) {
                    // setRecord({text : text , author : author});
                    setMessage("Update Successfull !!!! ");
                    setVisible(true);
                    history.push("/myquote");

                }
            }
        }
        helper.open("PUT", "http://127.0.0.1:9999/quotes/" + id);
        helper.setRequestHeader("Content-Type", "application/json");
        helper.send(JSON.stringify(record));
    }

    return (<>

        <br></br>
        <div class="container" style={{ backgroundColor: "Highlight", width: 700 }}>
            <form >
                <legend className="text-center"> Edit Quote</legend>

                <div class="form-group">
                    <label>Author</label>
                    <input type="text" class="form-control" placeholder="Author" onChange={onTextChange} name="author" value={record.author} />
                </div>
                <br></br>
                <div class="form-group">
                    <label>Quote</label>
                    <textarea class="form-control" placeholder="Enter Quote Here" onChange={onTextChange} name="text" value={record.text} />
                </div>

                <br></br>

                <button type="button" class="btn btn-primary" onClick={EditQuote} >Edit</button>
            </form>
            <div className='alert alert-danger' style={{ opacity: isVIsible ? 1 : 0 }}>
                {message}
            </div>
        </div>

    </>);
}

export default EditQuote;