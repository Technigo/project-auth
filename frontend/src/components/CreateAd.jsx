import { useState } from 'react';
import { adStore } from "../stores/adStore";

export const CreateAd = () => {
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [image, setImage] = useState(null);

    const { createAd } = adStore();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!brand || !model || !image) {
            alert("All fields are required");
            return;
        }

        await createAd({ brand, model }, image);

        // Reset form fields after submission
        setBrand('');
        setModel('');
        setImage(null);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Brand:</label>
                <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
            </div>
            <div>
                <label>Model:</label>
                <input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
            </div>
            <div>
                <label>Image:</label>
                <input
                    type="file"
                    onChange={(e) => {
                        setImage(e.target.files[0]);
                        console.log(e.target.files[0]); // Log the file object here
                    }}
                />            </div>
            <button type="submit">Post</button>
        </form>
    );
};


