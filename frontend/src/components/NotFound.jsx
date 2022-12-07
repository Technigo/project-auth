import React from "react";
import { Player } from '@lottiefiles/react-lottie-player'

export const NotFound = () => {
    return (
        <Player
          src="https://assets5.lottiefiles.com/packages/lf20_ghfpce1h.json"
          style={{ width: '200px', height: '200px', margin: "50px", background: "black", borderRadius: "8px"}}
          loop
          autoplay
          speed={1} /> 
    )
}