import React, { useEffect, useState } from "react";
import { batch, useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "utils/utils";

import orderSlice from "reducers/orderSlice";
import userSlice from "reducers/userSlice";


const Order = () => {
    const accessToken = useSelector((state) => state.user.accessToken);
  /*   const orderFlavor = useSelector((state) => state.order); */

    const [order, setOrder] = useState([])
    const [mode, setMode] = useState("order")
    const [scoop, setScoop] = useState("")
    const [flavor, setFlavor] = useState("")

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!accessToken) {
            navigate("/");
        }
    },[accessToken]);

    const getOrders = () => {
        const options ={
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken,
            }
        }
        fetch(API_URL(mode), options)
        .then(res => res.json())
        .then(data => setOrder(data))
        .catch((error) => console.error(error))
    }

    useEffect(() => {
        getOrders()
    }, [])

    const onSendOrder = (event) => {
        event.preventDefault();  
          const options = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken,
            },
              body: JSON.stringify({flavor: flavor, scoop: scoop})
          };
      
          fetch(API_URL(mode), options)
          .then(res => res.json())
          .then(data => {
              if(data.success) {
                  batch(() => {
                      dispatch(orderSlice.actions.addFlavor(data.response.flavor))
                      dispatch(orderSlice.actions.addScoop(data.response.scoop))
                  })
      
              } else {
                  batch(() => {
                      dispatch(orderSlice.actions.addFlavor(null))
                      dispatch(orderSlice.actions.addScoop(null))
                  })
                 
              }
             
          })
  
      }

    const logout = () => {
        batch(() => {
          dispatch(userSlice.actions.addUsername(null));
          dispatch(userSlice.actions.addAccessToken(null));
        });
      };
    
    return(
        <div>
            {order.map((item) => {
                return(
                    <div key={item._id}>
                        <p> {item.flavor}</p>
                        <p>{item.scoop}</p>
                        <p>{item.createdAt}</p>
                    </div>
                )
            })}
           
            <form onSubmit={onSendOrder}>
                <label htmlFor="Flavor">Flavor</label>
                <input
                type="text"
                id="flavor"
                value={flavor}
                onChange={(e) => setFlavor(e.target.value)}/>

            <label htmlFor="Flavor">Scoop</label>
                <input
                type="text"
                id="scoop"
                value={scoop}
                onChange={(e) => setScoop(e.target.value)}/>  

<button className="submit" type="submit">submit</button>
            </form>
            <button className="logout" onClick={logout}>Logout</button>
        </div>
    )
}

export default Order
