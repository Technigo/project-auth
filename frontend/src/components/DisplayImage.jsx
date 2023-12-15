import { useEffect, useState } from "react";

const apiEnv = import.meta.env.VITE_BACKEND_API;

export const ImageDisplay = () => {
    const [images, setImages] = useState([]);

    const fetchImages = async () => {
        try {
            const response = await fetch(`${apiEnv}/getimage`);
            const result = await response.json();
            setImages(result); // Assuming result is an array of image data
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <div>
            {images.map((img, index) => (
                <img key={index} src={img.imageData} alt={`Fetched ${index}`} />
            ))}
        </div>
    );
};
