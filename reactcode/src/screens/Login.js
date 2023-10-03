import { Link, useHistory } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
function Login() {
    var [users, setUsers] = useState([]);
    var [record, setRecord] = useState({ email: "", password: "" });
    var [message, setMessage] = useState("");
    var [isVIsible, setVisible] = useState(false);
    var history = useHistory();

    const onTextChange = (args) => {
        debugger;
        var copyOfRecord = { ...record };
        copyOfRecord[args.target.name] = args.target.value;
        setRecord(copyOfRecord);
    }
    useEffect(() => { selectUsers(); }, []);
    useEffect(() => {
        setTimeout(() => {
            setVisible(false);
        }, 5000);
        setTimeout(() => {
            setMessage("");
        }, 5000)
    }, [message, isVIsible]);

    const selectUsers = () => {
        debugger;
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = () => {
            debugger;
            if (helper.readyState == 4 && helper.status == 200) {
                var data = JSON.parse(helper.responseText);
                console.log(data);
                setUsers(data);
            }
        }
        helper.open("GET", "http://127.0.0.1:9999/user");
        helper.send();
    };

    const GoTOHome = () => {
        debugger;
        users.map((user) => {
            debugger;
            if (user.email == record.email && user.password == record.password) {
                sessionStorage.setItem("name", user.first_name);
                sessionStorage.setItem("user_id",user.id);
                sessionStorage.setItem("IsLoggedIn", "true");
                history.push("/home")
            }
            else {
                setMessage("Invalid Credentials !!! ");
                setVisible(true);
            }
        });


    }

    return (<>

        <section className="vh-100" style={{ backgroundColor: '#eee' }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ borderRadius: 25 }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign In</p>

                                        <form className="mx-1 mx-md-4">

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="text" id="form3Example3c" className="form-control" onChange={onTextChange} name='email' />
                                                    <label className="form-label" for="form3Example3c">Your Email</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="password" id="form3Example4c" className="form-control" onChange={onTextChange} name='password' />
                                                    <label className="form-label" for="form3Example4c">Password</label>
                                                </div>
                                            </div>


                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="button" className="btn btn-primary btn-lg" onClick={GoTOHome}>Sign In</button>
                                            </div>
                                            <div className='alert alert-danger' style={{ opacity: isVIsible ? 1 : 0 }}>
                                                {message}
                                            </div>
                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                Dont Have Account ?
                                                <Link to={`/register`} activeClassName="current">register here</Link>
                                            </div>
                                        </form>

                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                            className="img-fluid" alt="Sample image" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>);
}

export default Login;