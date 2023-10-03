import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import NavBar from "./Nanbar";



function Home() {
    var user_id = sessionStorage.getItem("user_id");
    var [allQuotes, setAllQuotes] = useState([]);
    var [message, setMessage] = useState("");
    var [isVIsible, setVisible] = useState(false);
    var q_id = sessionStorage.getItem("quote_id");
    var [isQuoteLike, setIsQuoteLike] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setVisible(false);
        }, 5000);
        setTimeout(() => {
            setMessage("");
        }, 5000)
    }, [message, isVIsible]);
    useEffect(() => { getAllQuotes(); }, []);
    var history = useHistory();

    const getAllQuotes = () => {
        debugger;
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = () => {
            debugger;
            if (helper.readyState == 4 && helper.status == 200) {
                var receivedData = JSON.parse(helper.responseText);
                setAllQuotes(receivedData);
            }
        };
        helper.open("GET", "http://127.0.0.1:9999/quotes");
        helper.send();
    }

    

    // const Like = (quote_id, args) => {
    //     debugger;
    //     if (isQuoteLike) {
    //         LikeQuote(quote_id);
    //         if (args.target.value == quote_id) {
    //             setIsQuoteLike(false);
    //         }
    //     }

    //     else {
    //         DeleteQuote(quote_id);
    //         if (args.target.value == quote_id) {
    //             setIsQuoteLike(true);
    //         }
    //     }

    // }

    const DislikeQuote = (quote_id) => {
        debugger;
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = () => {
            debugger;
            if (helper.readyState == 4 && helper.status == 200) {
                var receivedData = JSON.parse(helper.responseText);
                if (receivedData.affectedRows != undefined && receivedData.affectedRows > 0) {
                    setMessage("DisLike Successfull !!!! ");
                    setVisible(true);
                }
            }
        };
        sessionStorage.setItem("quote_id", quote_id);
        helper.open("Delete", "http://127.0.0.1:9999/fav/" + user_id + "/" + quote_id);
        helper.send();

    }

    const LikeQuote = (quote_id) => {
        debugger;
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = () => {
            debugger;
            if (helper.readyState == 4 && helper.status == 200) {
                var receivedData = JSON.parse(helper.responseText);
                if (receivedData.affectedRows != undefined && receivedData.affectedRows > 0) {
                    setMessage("Like Successfull !!!! ");
                    setVisible(true);
                }
            }
        };
        sessionStorage.setItem("quote_id", quote_id);
        helper.open("POST", "http://127.0.0.1:9999/fav/" + user_id + "/" + quote_id);
        helper.send();

    }

    var name = sessionStorage.getItem("name");
    return (
        <>
            <NavBar/>
            <div className=" text-center">
                <hr></hr>
                <h5>
                    Quotes Around The World
                </h5>
                <hr></hr>
            </div>

            <div class="container">
                <div className='alert alert-danger' style={{ opacity: isVIsible ? 1 : 0 }}>
                    {message}
                </div>
                <Link to={`/fav_quotes/` + user_id + "/" + q_id} activeClassName="current">My Favourites Quotes</Link>{"  "}
                <div class="table-responsive">
                    <table class="table table-hover table-bordered">
                        <tbody>
                            {
                                allQuotes.map((quote) => {
                                    return <tr>
                                        <td>
                                            <div>
                                                {""}{quote.text}
                                            </div>
                                            <div>
                                                {"--"}{quote.author}
                                            </div>
                                        </td>
                                        <td>
                                            {/* <input type="button" class="btn btn-success" style={{ backgroundColor:"blue"}} onClick={()=>{LikeQuote(quote.id)}} value="Like"/> */}
                                            
                                            <button type="button" class="btn btn-primary" onClick={()=>{LikeQuote(quote.id)}}>Like</button>
                                            
                                        </td>
                                        <td>
                                            {/* <input type="button" class="btn btn-success" style={{ backgroundColor:"blue"}} onClick={()=>{LikeQuote(quote.id)}} value="Like"/> */}
                                            
                                            <button type="button" class="btn btn-danger" onClick={()=>{DislikeQuote(quote.id)}}>DisLike</button>
                                            
                                        </td>
                                    </tr>
                                })

                            }
                        </tbody>
                    </table>
                </div>

            </div>


        </>
    );
}

export default Home;