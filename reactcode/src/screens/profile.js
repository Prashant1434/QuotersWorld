import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import NavBar from "./Nanbar";
import axios from "axios";

function Profile() {

    var [record, setRecord] = useState({ first_name: "", last_name: "", mobile: "" });
    var [message, setMessage] = useState("");
    var [isVIsible, setVisible] = useState(false);
    var user_id = sessionStorage.getItem("user_id");

    const [user, setUser] = useState({
        email: "",
        first_name: "",
        id: 0,
        last_name: "",
        mobile: "",
        password: ""
    })
    var history = useHistory();
    useEffect(() => { getUser() }, []);

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
    // const getUser = () => {
    //     var helper = new XMLHttpRequest();
    //     helper.onreadystatechange = () => {
    //         debugger;
    //         if (helper.readyState == 4 && helper.status == 200) {
    //             var data = JSON.parse(helper.responseText)
    //             setUser(data)
    //             // console.log(user)
    //         }
    //     }
    //     helper.open("GET", "http://127.0.0.1:9999/user/getUser/" + user_id);
    //     helper.send();
    // }

    const getUser = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:9999/user/getUser/${user_id}`);
          const data = response.data;
          setUser(data);
          console.log(user);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
          
    useEffect(() => {
        console.log("Updated User Data:", user); // Debugging line
    }, [user]);

    const updateUser = () => {
        debugger;
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = () => {
            debugger;
            if (helper.readyState == 4 && helper.status == 200) {
                var data = JSON.parse(helper.responseText);
                if (data.affectedRows != undefined && data.affectedRows > 0) {
                    setRecord({ first_name: "", last_name: "", mobile: "" });
                    setMessage("Update Successfull !!!! ");
                    setVisible(true);
                }
            }
        }
        helper.open("PUT", "http://127.0.0.1:9999/user/update/" + user_id);
        helper.setRequestHeader("Content-Type", "application/json");
        helper.send(JSON.stringify(record));
    }

    return (
        <>
            <NavBar />
            <br></br>
            <br></br>
            <div class="container" style={{ width: 800 }}>
                <form className="mx-1 mx-md-4">

                    <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                            <label className="form-label" for="form3Example1c">First Name</label>
                            <input type="text" id="form3Example1c" className="form-control" placeholder="Enter First Name Here" onChange={onTextChange} name="first_name" value = {user.first_name} />
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                            <label className="form-label" for="form3Example1c">Last Name</label>
                            <input type="text" id="form3Example1c" className="form-control" placeholder="Enter Last Name Here" onChange={onTextChange} name="last_name" value={user.last_name} />
                        </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                            <label className="form-label" for="form3Example3c">Mobile No</label>
                            <input type="text" id="form3Example3c" className="form-control" placeholder="Enter Mobile No Here" onChange={onTextChange} name="mobile" value={user.mobile} />
                        </div>
                    </div>

                    <div className='alert alert-danger' style={{ opacity: isVIsible ? 1 : 0 }}>
                        {message}
                    </div>
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="button" className="btn btn-primary btn-lg" onClick={updateUser}>Update</button>
                    </div>

                </form>
            </div>

        </>
    );

}

export default Profile;