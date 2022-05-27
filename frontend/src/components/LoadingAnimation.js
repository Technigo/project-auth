import React from "react"
import Lottie from "react-lottie"
import animationData from '../lotties/square-loading-icon-lottie-animation.json'
import styled from 'styled-components/macro'


const LoadingAnimation = () => {

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
}

    return (
        <>
        <LoaderContainer>
        <Lottie options={defaultOptions} width={200} height={200}/>
        </LoaderContainer>
        </>
    )
}

export default LoadingAnimation

const LoaderContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
`

