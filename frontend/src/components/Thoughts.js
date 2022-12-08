import React, { useEffect, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import thoughtSlice from 'reducers/thoughtSlice';
import { useNavigate } from 'react-router-dom';
import { API_URL, LIKE_URL } from 'utils/utils';
import userSlice from 'reducers/userSlice';
/* import LogOut from './Logout'; */


const Thoughts = () => {
	
	/* const values = useSelector((state) => state.thoughts); */
	const accessToken = useSelector((state) => state.user.accessToken);
	const username = useSelector((state) => state.user.username);

	const [mode, setMode ] = useState("thoughts")
	const [thoughts, setThoughts] = useState([]);
	const [newThought, setNewThought] = useState("")
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch();
	const navigate = useNavigate();

/* 	const options = {
		method: 'GET',
		header: {
			Authorization: accessToken,
		},
	};  */

	useEffect(() => {
		if (!accessToken) {
			navigate('/');
		}
	}, [accessToken]);

	//get the thoughts posts in display, fire at new posts added
	/*  useEffect(() => {
		try {
			fetch(API_URL('thoughtSlice'), options)
				.then((res) => res.json())
				.then((data) => dispatch(thoughtSlice.actions.addThoughts(data)));
		} catch (err) {
			console.log(error);
		}
	}, [thoughts]);

	//in the thought page to be able to post
	const onThoughtsSubmit = (e) => {
		e.preventDefault();

		const options = {
			method: 'POST',
			header: {
				'Content-Type': 'application/json',
			},
			body: json.stringify({
				username: username,
				message: thoughts,
				accessToken: accessToken,
			}),
		};

		try {
			fetch(API_URL('thoughts'), options);
		} catch (err) {
			console.log(err);
		}
	}; 
 */
	const getThoughts = () => {
        const options ={
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken,
            }
        }
        fetch(API_URL(mode), options)
        .then(res => res.json())
        .then(data => setThoughts(data))
        .catch((error) => console.error(error))
    }

    useEffect(() => {
        getThoughts()
    }, [])

    const onSendThought = (event) => {
        event.preventDefault();  
          const options = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken,
            },
              body: JSON.stringify({ message: newThought })
          };
      
          fetch(API_URL(mode), options)
          .then(res => res.json())
          .then(data => {
              if(data.success) {
                  batch(() => {
                      dispatch(thoughtSlice.actions.addThoughts(data.response.value))
                      
                  })
      
              } else {
                  batch(() => {
                      dispatch(thoughtSlice.actions.addThoughts(null))
                     
                  })
                 
              }
             
          })
  
      }

	 /* Add likes to messages  */

	 const handleOnlikeChange = (LikeID) => {
		const option = {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
			"Authorization": accessToken,
		  }
		}
		fetch(LIKE_URL(mode)(LikeID), option)
		  .then((Response) => Response.json())
		  .then(console.log('yey it works.'))
		  .catch((error) => console.error(error))
		  .finally(() => getThoughts())
	  }

	/* LOG OUT BUTTON- CANT MAKE IT WORK WITH THE SLICER.. */
	const logout = () => {
        batch(() => {
          dispatch(userSlice.actions.addUsername(null));
          dispatch(userSlice.actions.addAccessToken(null));
        });
      };

	return (
		<>
		<button className="logout" onClick={logout}>Logout</button>

			<p>What's making you happy right now?</p>
			<form
				onSubmit={onSendThought}>
				<input
					type="text"
					value={newThought}
					onChange={(e) => setNewThought(e.target.value)}
				/>
				<button>Post</button>
			</form>
			<>
				{thoughts.map((item) => {
					return (
						<div key={item._id}>
							<p>{item.message}</p>
							<p>{item.createdAt}</p>
							<button
                  				type="button"
                 				 className="btn-heart"
                  				onClick={() => {handleOnlikeChange(item._id)}}
                  				style={{
                    			background: item.hearts >= 1 ? '#F6C6E9' : '#f2f2f2'
                  				}}>
								<span aria-label="heart emoji" className="heart-emoji"> ❤️
                  				</span>
								</button>
							<p>{item.hearts}</p>
						</div>
					);
				})}
				{/* <LogOut /> */}
			</>
		</>
	);
};

export default Thoughts;
