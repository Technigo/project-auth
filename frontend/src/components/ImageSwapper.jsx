import { useState, useEffect } from "react";
import styled from "styled-components";

const ImageWrapper = styled.div`
    .image-wrapper img {
    max-width: 400px;
    height: auto;
    }
`;

export const ImageSwapper = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const images = [
        "/photos/sneaker-1.jpg",
        "/photos/sneaker-2.jpg",
        "/photos/sneaker-3.jpg",
        "/photos/sneaker-4.jpg",
        "/photos/sneaker-5.jpg"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <>
            <ImageWrapper>
                <h1>Ready to share your sneakers?</h1>
                <div className="image-wrapper">
                    <img src={images[currentImage]} alt={`Image ${currentImage + 1}`} />
                </div>
            </ImageWrapper>
        </>
    );
};


