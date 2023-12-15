import { useState } from "react";
import dummyImage from "/src/assets/upload.png";

const apiEnv = import.meta.env.VITE_BACKEND_API;

export const ImageForm = () => {
    const [uploadImage, setUploadImage] = useState(null);

    const createPost = async (imageData) => {
        console.log("Image Data:", imageData); // Debugging

        try {
            const response = await fetch(`${apiEnv}/imageupload`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem("accessToken"),
                },
                body: JSON.stringify({ imageData }),
            });

            const result = await response.json();
            console.log("Server response:", result); // Check the response from the server
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (uploadImage) {
            await createPost(uploadImage.imageData);
            console.log("Submitted Image Data:", uploadImage.imageData);
        }
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const base64 = await convertToBase64(file);
            setUploadImage({ imageData: base64 });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="file-upload" className="custom-file-upload">
                    <img src={uploadImage ? uploadImage.imageData : dummyImage} alt="Upload" />
                </label>
                <input
                    type="file"
                    name="imageData"
                    id="file-upload"
                    accept=".jpeg, .png, .jpg"
                    onChange={handleFileUpload}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};
