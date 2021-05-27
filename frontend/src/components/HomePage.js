import React from 'react'
import { Link } from 'react-router-dom'

import { ButtonContainer, Button } from './styled-components/homepage-style'

const HomePage = () => {
    return (
        <div>
            <h1>Welcome</h1>
            <p>Would you like to know our super secret?</p>
            <ButtonContainer>
                <Link to="/login">
                    <Button>
                        Yes!
                    </Button>
                </Link>
            </ButtonContainer>
        </div>
    )
}

export default HomePage