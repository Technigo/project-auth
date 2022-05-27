import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import garden from "../assets/garden.jpg"
// import { batch } from "react-redux"
// import { API_URL } from "utils/utils";
// import thoughts from "reducers/thoughts";
// import user from "../reducers/user";


const Main = () => {
    const accessToken = useSelector((store) => store.user.accessToken)
    // const thoughtItems = useSelector((store) => store.thoughts.items) 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Function for logout
    //   const logout = () => {
    //     batch(() => {
    //       dispatch(user.actions.setUsername(null));
    //       dispatch(user.actions.setAccessToken(null));

    //       localStorage.removeItem("user");
    //     });
    //   };

    const logOutButton = () => {
        window.location.reload()
    }

    useEffect(() => {
        if (!accessToken) {
            navigate("/login");
        }
    }, [accessToken]);

    // useEffect(()=> {

    //     const options = {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": accessToken
    //         }        
    //     }

    //     fetch(API_URL("thoughts"), options)
    //     .then(res => res.json())
    //     .then(data => {
    //         if (data.success) {
    //             dispatch(thoughts.actions.setItems(data.response))
    //             dispatch(thoughts.actions.setError(null))
    //         } else {
    //             dispatch(thoughts.actions.setError(data.response))
    //             dispatch(thoughts.actions.setItems([]))
    //         }
    //     })
    // }, [])

    return (
        <>
            <container>
                {/* <Link to="/login"> LINK TO /login</Link> */}
                <h1>Your secret garden</h1>
                {/* {thoughtItems.map((item) => {
            return <div key = {item._id}>{item.message}</div>
        })} */}
                {/* <button onClick={logout}>Logout</button> */}
                <div>
                    <img src={garden} alt="garden" />
                </div>
                <div className="button-container">
                    <button className="logout-button" type="button"
                        onClick={logOutButton}>Log out</button>
                </div>
            </container>
        </>
    )
}
export default Main;