import { useState } from "react";
import { adStore } from "../stores/adStore";

export const CreateAd = () => {
    const [ad, setAd] = useState({
        brand: "",
        imageUrl: "",
        size: "",
        model: "",
        price: 0,
    });

    const { createAd } = adStore();

    const adInput = (e) => {
        const { name, value } = e.target;
        setAd((prevAd) => ({
            ...prevAd,
            [name]: value,
        }));
    };

    const addAdLocal = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        const { brand, size, model, price } = ad;

        if (!brand || !size || !model || !price) {
            alert("Please fill in all the fields");
            return;
        }

        try {
            await createAd(ad); // Add the ad to the server
            setAd({  // Clear the input fields after adding the ad
                brand: "",
                imageUrl: "",
                size: "",
                model: "",
                price: 0,
            });
        } catch (error) {
            console.error("Couldn't create the ad:", error);
            alert("Something went wrong");
        }
    };

    return (
        <div>
            <form onSubmit={addAdLocal}>
                <input
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    value={ad.brand}
                    onChange={adInput}
                />
                {/* <input
                    type="text" 
                    name="imageUrl"
                    placeholder="Image URL"
                    value={ad.imageUrl}
                    onChange={adInput}
                />*/}
                <input
                    type="text"
                    name="size"
                    placeholder="Size"
                    value={ad.size}
                    onChange={adInput}
                />
                <input
                    type="text"
                    name="model"
                    placeholder="Model"
                    value={ad.model}
                    onChange={adInput}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={ad.price}
                    onChange={adInput}
                />
                <button type="submit">Create Ad</button>
            </form>
        </div>
    );
};
