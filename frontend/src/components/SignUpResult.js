import React, {useState} from 'react' ;


export const SignUpResult = props => {
    const [message, setMessage] = useState('')

   /*if (props.status === 'ok'){
        setMessage('Yes! you are now signed in!')      
           
    }else if (props.status === ''){
       setMessage('')
    }else {
        setMessage('oh nooo something went wrong')
    }*/
        
    

    return (
        <div>
           {props.status}
       
        </div>
    )
}

