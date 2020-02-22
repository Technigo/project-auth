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
          })
    }

return (
    <div>
        <form onSubmit={handleSignInForm}>
          
            <h2>Log In</h2>
            <label>
                <p>E-mail:</p>
                <input type="email" value={email}
            onChange={(event) => setEmail(event.target.value)}  required />
            </label>
            <label>
                <p>Password:</p>
                <input required type="password" placeholder="Enter Password" value={password} onChange={(event) => setPassword(event.target.value)}/>
            </label>
            <div className='btn-Container'>
          <button  type='submit' className='btn' >Login</button>
        </div>
        </form>
    </div>
)
}
