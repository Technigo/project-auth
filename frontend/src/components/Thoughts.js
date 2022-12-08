import React, { useEffect, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import thoughtSlice from 'reducers/thoughtSlice';
import { useNavigate } from 'react-router-dom';
import { API_URL, LIKE_URL } from 'utils/utils';
import userSlice from 'reducers/userSlice';
/* import LogOut from './Logout'; */
import styled from 'styled-components';
import { formatDistance } from 'date-fns';


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
/* 
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
 */
	/* LOG OUT BUTTON- CANT MAKE IT WORK WITH THE SLICER.. */
	const logout = () => {
        batch(() => {
          dispatch(userSlice.actions.addUsername(null));
          dispatch(userSlice.actions.addAccessToken(null));
        });
      };

	return (
		<Wrapper>
		<LogoutBtn className="logout" onClick={logout}>Logout</LogoutBtn>

			<p>What's making you happy right now?</p>
			<form
				onSubmit={onSendThought}>
				<InputText
					type="text"
					value={newThought}
					onChange={(e) => setNewThought(e.target.value)}
				/>
				<BtnSend>Post</BtnSend>
			</form>
			<ThoughtContainer>
				{thoughts.map((item) => {
					return (
						<ThoughtCard key={item._id}>
							<p>{item.message}</p>
							<p>{formatDistance(new Date(item.createdAt), Date.now(), { addSuffix: true })}</p>
							{/* <button
                  				type="button"
                 				 className="btn-heart"
                  				onClick={() => {handleOnlikeChange(item._id)}}
                  				style={{
                    			background: item.hearts >= 1 ? '#F6C6E9' : '#f2f2f2'
                  				}}>
								<span aria-label="heart emoji" className="heart-emoji"> ❤️
                  				</span>
								</button> */}
							<p>{item.hearts}</p>
						</ThoughtCard>
					);
				})}
				{/* <LogOut /> */}
				</ThoughtContainer>
		</Wrapper>
	);
};

const Wrapper = styled.div`
display: grid; 

justify-content: center; 
/* height: 100vh; 
width: 100vw;  */
justify-content: center; 

`

const InputText = styled.input`
 width: 90%;
  height: 50%; 
  margin: auto;  
  display: block;
`

const BtnSend = styled.button`
margin-top: -30px; 
  margin-bottom: 50px;
  margin-left: 30px; 
  display: block;
  padding: 10px;
  width: 200px; 
  border-radius: 20px;
  border:none; 
  color: black; 
  background-color:#FCAFE7 ;`

  const ThoughtCard = styled.div`
   border: solid black 1px;
   margin-top: 30px; 
   margin-bottom: 30px;
   padding-bottom: 30px;
   width: 250px;
   height: 180px;
   display: grid;
   grid-column: 1fr 1fr 1fr;
   box-shadow: 5px 10px;
   gap: 50px; 
   background-color: rgba(229, 229, 229, 0.4);
  `

  const ThoughtContainer= styled.div`
  display: flex; 
  flex-wrap: wrap; 
  justify-content: center;
  gap: 10px;  
  `

  const LogoutBtn = styled.button`
  color: #fff;
  background-color: transparent; 
  border: none; 
  text-shadow:
      0 0 7px #fff,
      0 0 10px #fff,
      0 0 21px #fff,
      0 0 42px #5271ff,
      0 0 82px #5271ff,
      0 0 92px #5271ff,
      0 0 102px #5271ff,
      0 0 151px #5271ff;
  text-align: center;
  font-weight: 400;
  font-size: 1.7rem;
    animation: pulsate 0.11s ease-in-out infinite alternate;  
	&:hover{
	font-weight: bold; 
	font-size: 2.5rem; 
  }
	
	@keyframes pulsate {
    
	100% {
  
		text-shadow:
		0 0 4px #fff,
		0 0 11px #fff,
		0 0 19px #fff,
		0 0 40px #5271ff,
		0 0 80px #5271ff,
		0 0 90px #5271ff,
		0 0 100px #5271ff,
		0 0 150px #5271ff;
	
	}
	
	0% {
  
	  text-shadow:
	  0 0 4px #fff,
	  0 0 10px #fff,
	  0 0 18px #fff,
	  0 0 38px #5271ff,
	  0 0 73px #5271ff,
	  0 0 80px #5271ff,
	  0 0 94px #5271ff,
	  0 0 140px #5271ff;
  
  }
 
}`


export default Thoughts;
