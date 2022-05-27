import React from "react";
import { useSelector } from "react-redux";
import { Container, StyledForm, MainData } from "./Style";

const Loading = () => {
    const loading = useSelector((state) => state.ui.loading)
    
    return(
        <>
        <Container>
            <StyledForm>
                {loading && (

                    <MainData>
                        Signing in...
                    </MainData>
                )}
            </StyledForm> 
        </Container>   
        </>         
        )
}

export default Loading