
import { useState } from "react";
import { adStore } from "../stores/adStore";


export const CreateAd = () => {
    // Initialize state variable 'ad' using 'useState' to store the task input.
    const [ad, setAd] = useState({
        brand: "",
        imageUrl: "",
        size: "",
        model: "",
        price: 0,
    });
    // Access the 'addAdToServer' and 'deleteAllAds' functions from the 'adStore'.
    const { addAdToServer, deleteAllAds } = adStore();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAd({
            ...ad,
            [name]: value,
        });
    };

    // Function to add a new task both locally and to the server.
    const addAdLocal = async () => {
        const { brand, size, model, price } = ad;
        if (brand.trim() !== "" && size.trim() !== "" && model.trim() !== "" && price > 0) {
            await addAdToServer(ad);
            setAd({
                brand: "",
                imageUrl: "",
                size: "",
                model: "",
                price: 0,
            });
        }
    };

    return (
        <>
            <div>
                <form>
                    <input
                        type="text"
                        name="brand"
                        placeholder="Brand"
                        value={ad.brand}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="imageUrl"
                        placeholder="Image URL"
                        value={ad.imageUrl}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="size"
                        placeholder="Size"
                        value={ad.size}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="model"
                        placeholder="Model"
                        value={ad.model}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={ad.price}
                        onChange={handleInputChange}
                    />
                </form>
                <button onClick={addAdLocal}>Create Ad</button>
                <button onClick={deleteAllAds}>Delete All Ads</button>
            </div>
        </>
    );
};
