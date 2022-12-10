import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import thoughts from "reducers/thoughts";
import { API_URL, HAPPY_API_URL } from "utils/utils";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components"
import { Fromapp } from "../happythoughts/FromApp";

// const THOUGHTS_URL = "https://project-happy-thoughts-api-lsdubteuzq-lz.a.run.app/";
// export const HAPPY_API_URL = (slug) => `${THOUGHTS_URL}/${slug}`;

const Logoutbutton = styled.button `
    color: white;
    margin-top: 15%
`

const Welcometext = styled.p `
    color: white;
    margin-top: 15%
`

const Main = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector((store) => store.user.accessToken);
    const username = useSelector((store) => store.user.username); // show username when logged in
    const navigate = useNavigate();
  

//log out - back to loginpage    
const home = () => {
    navigate ("/");
}
    
    useEffect( () => {
        if (!accessToken) {
            navigate("/login");
        }
    }, []);
    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken
            }
        }
        fetch(HAPPY_API_URL("thoughts"), options)
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    dispatch(thoughts.actions.setItems(data.response));
                    dispatch(thoughts.actions.setError(null));
                } else {
                    dispatch(thoughts.actions.setItems([]));
                    dispatch(thoughts.actions.setError(data.response));
                }
            })
    }, []);

    return (
        <>
            <Link to="/login"> GO TO LOGIN</Link>
            <Welcometext>
            Welcome {username} You are logged in! This is main component </Welcometext>
            <div>
                <Logoutbutton onClick={() => home()}>Log out</Logoutbutton>
            </div>
            <Fromapp/>
        </>
    )
}

export default Main;


// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import thoughts from "reducers/thoughts";
// import { API_URL } from "utils/utils";
// import { useNavigate, Link } from "react-router-dom";
// //import Logout from 'components/Logout';


// const Main = () => {
//     const thoughtItems = useSelector((store) => store.thoughts.items);
//     const dispatch = useDispatch();
//     const accessToken = useSelector((store) => store.user.accessToken);
//     const navigate = useNavigate();

//     useEffect( () => {
//         if (!accessToken) {
//             navigate("/login");
//         }
//     }, []);
//     useEffect(() => {

//         const options = {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": accessToken
//             }
//         }
//         fetch(API_URL("thoughts"), options)
//             .then(res => res.json())
//             .then(data => {
//                 if(data.success) {
//                     dispatch(thoughts.actions.setItems(data.response));
//                     dispatch(thoughts.actions.setError(null));
//                 } else {
//                     dispatch(thoughts.actions.setItems([]));
//                     dispatch(thoughts.actions.setError(data.response));
//                 }
//             })
//     }, []);

//     return (
//         <>
        
//             <Link to="/login"> GO TO LOGIN</Link>
//             <h2>You are logged in! This is the main component</h2>
//             {thoughtItems.map((item) => {
//                 return <p key={item._id}>{item.message}</p>
//             })}
            
//         </>
//     )
// }

// export default Main;