import React, {useState} from 'react' ;



export const SignInForm = () => {

  const [errorMessage, setErrorMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

 const onLoggedIn = (event) => {
  console.log('login successfull')
  window.location.href='/secrets'
 }

   const handleSignInForm = (event) => {
        event.preventDefault()
        console.log("Log In")
        fetch('http://localhost:8080/sessions', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: { 'Content-Type': 'application/json' }
          })
          .then(res => {
            if (!res.ok) {
              throw new Error('Your e-mail and/or password was incorrect')
            }
            return res.json()
          })
          .then(({ accessToken }) => {
            window.localStorage.setItem('accessToken', accessToken)
            
           onLoggedIn()
          })
          .catch(err => {
            setErrorMessage(err.message)
            alert(err.message);
          })
    }

return (
    <div>
        <form onSubmit={handleSignInForm}>
           
            <div className='mainContainer'>
            <h1>log in</h1>
            <label>
            <input className='formField' type="email" placeholder="email" value={email}
            onChange={(event) => setEmail(event.target.value)}  required />
            </label>
            <label>
            <input className='formField' required type="password" placeholder="enter password" value={password} onChange={(event) => setPassword(event.target.value)}/>
            </label>
            <div className='btn-Container'>
          <button  type='submit' className='btn' >Login</button>
        </div>
            </div>
        
        </form>
    </div>
)
}
