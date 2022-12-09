import React from "react";
import styled from "styled-components";
import  Svg from "../images/donut.svg"
import  Svg2 from "../images/curl.svg"
import  Svg3 from "../images/scrunch.svg"
import  Svg4 from "../images/splash.svg"

const Shapes = ({ size, top, left, zIndex }) => {
    return (
        <>
            <Shape 
                size="150px"
                top="20%"
                left="32%"
                zIndex="1"
            />

            <Shape 
                size="400px"
                top="70%"
                left="-10%"
                zIndex="-1"
            />

            <Shape 
                size="200px"
                top="62%"
                left="55%"
                zIndex="-1"
            />
            
            <Shape 
                size="100px"
                top="78%"
                left="70%"
                zIndex="-1"
            />

            <Shape 
                size="150px"
                top="12%"
                left="68%"
                zIndex="-1"
            />

            <Shape 
                size="80px"
                top="30%"
                left="45%"
                zIndex="-1"
            />

            <BlurShape 
                top="70%"
                left="80%"
            />

            <BlurShape 
                top="-30%"
                left="-20%"
            />    

            <Img 
                src={Svg} 
                alt="Donut" 
                top="-50%"
                left="50%"/>
            
            <Img 
                src={Svg2} 
                alt="curl" 
                top="20%"
                left="0%"/>

            <Img 
                src={Svg3} 
                alt="scrunch ball" 
                top="40%"
                left="50%"/>
            
            <Img 
                src={Svg4} 
                alt="splash" 
                top="0%"
                left="0%"
                zindex="1"/>

        </>
    )
}

export default Shapes;

export const Shape = styled.div`
    width: ${props => props.size}; 
    height: ${props => props.size};
    top: ${props => props.top};
    left: ${props => props.left};
    z-index: ${props => props.zIndex};
    border-radius: 50%;
    background: radial-gradient(96% 96% at 23% 14%, #B800E6 0%, #090014 100%);
    position: absolute;
`

export const BlurShape = styled.div`
    top: ${props => props.top};
    left: ${props => props.left};
    width: 600px; 
    height: 600px;
    z-index: -1;
    filter: blur(200px);
    border-radius: 50%;
    background: radial-gradient(96% 96% at 23% 14%, #B800E6 0%, #090014 100%);
    position: absolute;
`

export const Img = styled.img`
position: absolute;
top: ${props => props.top};
left: ${props => props.left};
width: ${props => props.size}; 
height: ${props => props.size};
z-index: -2 ${props => props.zindex};;` 
