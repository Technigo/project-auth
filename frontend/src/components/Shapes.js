import React from "react";
import styled from "styled-components";
import  Svg from "../images/donut.svg"
import  Svg2 from "../images/curl.svg"

const Shapes = ({ size, top, left, zIndex }) => {
    return (
        <>
            <Shape 
                size="150px"
                top="22%"
                left="31%"
                zIndex="1"
            />

            <Shape 
                size="400px"
                top="70%"
                left="-10%"
                zIndex="-3"
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
                top="10%"
                left="73%"
                zIndex="-2"
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
                top="30%"
                left="-10%"
            />

            <Mobile 
                src={Svg2} 
                alt="curl" 
                top="-10"
                left="-30%"
            />
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
    background: radial-gradient(96% 96% at 23% 14%, #E6D9F2 0%, #E7447B 100%);
    position: absolute;
    @media (max-width:720px){
        visibility: hidden;
}

`
//radial-gradient(96% 96% at 23% 14%, #DDBBF4 0%, #C04E98 100%); PINK 

export const BlurShape = styled.div`
    top: ${props => props.top};
    left: ${props => props.left};
    width: 600px; 
    height: 600px;
    z-index: -1;
    filter: blur(200px);
    border-radius: 50%;
    background: radial-gradient(96% 96% at 23% 14%, white 0%, white 100%);
    position: absolute;
    @media (max-width:720px){
        visibility: hidden;
    }
`

export const Img = styled.img`
position: absolute;
top: ${props => props.top};
left: ${props => props.left};
width: ${props => props.size}; 
height: ${props => props.size};
z-index: -2 ${props => props.zindex};
    @media (max-width:720px){
        visibility: hidden;
}` 
export const Mobile = styled.img`
position: absolute;
top: ${props => props.top};
left: ${props => props.left};
z-index: -2 ${props => props.zindex};
@media (min-width:720px){
        visibility: hidden;
}
` 