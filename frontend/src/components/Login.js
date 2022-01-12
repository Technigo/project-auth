import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { API_URL } from 'utils/constants'

export const Login = () => {

const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [mode, setMode] = useState('signup')

const 
const dispatch = useDispatch();
const onFormSubmit = (event) =>{

event.preventDefault();

const options = {
method:'POST',
headers:{

'Content-Type':'application/json'

},
body:JSON.stringfy({}),

}

fetch(API_URL('mode'), options)
.then(res => res.json())
.then(data =>{
  
  if(data.success){
    dispatch(username.actions.setUsername(data.response.username))

  }
  else{
    
    dispatch(username.actions.setUsername(null))
    dispatch(username.actions.errors())

  }

})



}


  return (
    <div>
      <input type='radio' checked={mode === 'signup'} onChange={() => setMode('signup')} />
      <input type='radio' checked={mode === 'signin'} onChange={() => setMode('signin')} />
      <h1>LOGIN</h1>
      <form onSubmit={onFormSubmit}>
<input type="text" value={username}
onChange={e => setUsername(e.target.value)}> </input>
<input type="password" value={password}
onChange={e => setPassword(e.target.value)}> </input>


      </form>

    </div>
  )
}
