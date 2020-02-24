import React, {useState} from 'react' ;

export const SignUpResult = props => {
    const [message, setMessage] = useState('')

    return (
        <div>
           {props.status}
        </div>
    )
}

