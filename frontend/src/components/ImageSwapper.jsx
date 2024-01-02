import { useState, useEffect } from "react";
import styled from "styled-components";

const ImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; // Center vertically
    text-align: center; // Center the text elements, like h1
    width: 100%; // Take full width of the container

    h1 {
        margin-top: 30px;
    }

    .image-wrapper {
        width: 100%; // Take full width for the image container
        display: flex;
        justify-content: center; // Center the image horizontally within the container
    }

    img {
        max-width: 90%;
        height: auto;
        margin: auto; // Center the image within the .image-wrapper
    }

    @media (min-width: 768px) {
        h1 {
            margin-top: 80px;
            margin-bottom: 40px;
        }

        img {
            max-width: 80%; // Limit the size on larger screens
        }
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


