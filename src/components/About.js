import React from "react";
import img1 from '../assets/pieces/wq.jpg';
export default function About() {
    var imageName = require('../assets/pieces/wq.jpg')

    return (
        <>
            <img src={ require('../assets/pieces/wq.jpg')  } alt="Sdvsd" />
            <img src={imageName} />
            <img src={img1} />

        </>);
}
