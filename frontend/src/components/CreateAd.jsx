import { useState } from "react";
import { adStore } from "../stores/adStore";
import dummyImage from "../assets/upload.png";

export const CreateAd = () => {
    const initialAdState = {
        brand: "",
        image: "",
        size: "",
        model: "",
    };
    const [ad, setAd] = useState(initialAdState);
    const [showForm, setShowForm] = useState(true);

    const { createAd } = adStore();

    const adInput = (e) => {
        const { name, value } = e.target;
        setAd((prevAd) => ({
            ...prevAd,
            [name]: value,
        }));
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const base64 = await convertToBase64(file);
            setAd({ image: base64 });
        }
    };

    const createAdLocal = async (e) => {
        e.preventDefault();
        try {
            await createAd(ad); // Pass the ad state directly
            setAd(initialAdState); // Reset the form fields
            setShowForm(false); // Hide the form
        } catch (error) {
            console.error("Error in creating ad:", error);
        }
    };

    const handleShowForm = () => {
        setShowForm(true); // Show the form
    };


    return (
        <div>
            {showForm ? (
                <form onSubmit={createAdLocal}>
                    <label htmlFor="file-upload" className="custom-file-upload">
                        <img
                            src={ad ? ad.image : dummyImage}
                            alt="Upload"
                            style={{ width: '200px', height: 'auto' }} // Set the width and let the height adjust automatically
                        />
                    </label>
                    <input
                        type="file"
                        name="image"
                        id="file-upload"
                        accept=".jpeg, .png, .jpg"
                        onChange={handleFileUpload}
                    />
                    <input
                        type="text"
                        name="brand"
                        placeholder="Brand"
                        value={ad.brand}
                        onChange={adInput}
                    />
                    <input
                        type="text"
                        name="model"
                        placeholder="Model"
                        value={ad.model}
                        onChange={adInput}
                    />
                    <button type="submit">Create Ad</button>


                </form>
            ) : (
                <button onClick={handleShowForm}>Create Another Ad</button>
            )}
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