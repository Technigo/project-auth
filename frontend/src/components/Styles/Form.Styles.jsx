import styled from 'styled-components/macro'

export const FormSection = styled.section`
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    height: 100vh;
    width: 100vw;
    animation: flip-in-ver-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    @keyframes flip-in-ver-left {
        0% {
            transform: rotateY(80deg);
            opacity: 0;
        }
        100% {
            transform: rotateY(0);
            opacity: 1;
        }
    }
 
    .bubbles {
        position:absolute;
        width:100%;
        height: 100%;
        z-index: 0;
        overflow:hidden;
        top:0;
        left:0;
    }
    .bubble {
        position: absolute;
        bottom:-100px;
        width:40px;
        height: 40px;
        background:#f1f1f1;
        border-radius:50%;
        opacity:0.5;
        animation: rise 10s infinite ease-in;
    }
    .bubble:nth-child(1){
        width:40px;
        height:40px;
        left:10%;
        animation-duration:8s;
    }
    .bubble:nth-child(2){
        width:20px;
        height:20px;
        left:20%;
        animation-duration:5s;
        animation-delay:0.2s;
    }
    .bubble:nth-child(3){
        width:50px;
        height:50px;
        left:35%;
        animation-duration:7s;
        animation-delay:2s;
    }
    .bubble:nth-child(4){
        width:80px;
        height:80px;
        left:50%;
        animation-duration:11s;
        animation-delay:0s;
    }
    .bubble:nth-child(5){
        width:35px;
        height:35px;
        left:55%;
        animation-duration:6s;
        animation-delay:1s;
    }
    .bubble:nth-child(6){
        width:45px;
        height:45px;
        left:65%;
        animation-duration:8s;
        animation-delay:3s;
    }
    .bubble:nth-child(7){
        width:90px;
        height:90px;
        left:70%;
        animation-duration:12s;
        animation-delay:2s;
    }
    .bubble:nth-child(8){
        width:25px;
        height:25px;
        left:80%;
        animation-duration:6s;
        animation-delay:2s;
    }
    .bubble:nth-child(9){
        width:15px;
        height:15px;
        left:70%;
        animation-duration:5s;
        animation-delay:1s;
    }
    .bubble:nth-child(10){
        width:90px;
        height:90px;
        left:25%;
        animation-duration:10s;
        animation-delay:4s;
     }
        @keyframes rise{
        0%{
            bottom:-100px;
            transform:translateX(0);
        }
        50%{
            transform:translate(100px);
        }
        100%{
            bottom:1080px;
            transform:translateX(-200px);
        }
    }
`

export const FormContainer = styled.div`
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
    border-radius: 10px;
    border: none;
    animation: shadow-drop-2-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    @keyframes shadow-drop-2-center {
        0% {
            transform: translateZ(0);
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
        }
        100% {
            transform: translateZ(50px);
            box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
        }
}
`

export const FormHeader = styled.div`
    margin-top: 5vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    z-index: 1;

    a {
        text-decoration: underline;
        color: black;
        font-weight: 600;
    }

    h1 {
        font-family: 'League Spartan', sans-serif;
        font-size: 2.5rem;
        margin: 0;
        padding: 10px;
        letter-spacing: -0.1rem;
    }

    h3 {
        font-family: 'League Spartan', sans-serif;
        font-size: 1.1rem;
        font-weight: 400;
    }

`

export const FormWrapper= styled.form`
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
    justify-content: center;
    align-items: center;

    p {
        color: red;
        font-size: 1rem;
    }


    label {
        display: flex;
        align-self: baseline;
        font-size: 0.8rem;
        text-transform: uppercase;
        color: #7a7979eb;
    }

`

export const FormInput = styled.input`
   font-size: 1rem;
   border-radius: 10px;
   padding: 10px;
   margin-bottom: 10px;
   border: none;
   background: #d4cecead;

   &::placeholder {
    font-weight: light;
    font-family: 'Poppins', sans-serif;
    opacity: .5;
    color: #5f5f5feb;
}
`

export const Buttons = styled.button`
   font-family: 'Poppins', sans-serif;
   font-size: 0.8rem;
   font-weight: bold;
   border-radius: 8px;
   padding: 10px;
   width: 100%;
   margin-top: 15px;
   background: #FFC090;
   border: none;
   cursor: pointer;

   &:hover {
    transform: scale(1.02)
   }

`