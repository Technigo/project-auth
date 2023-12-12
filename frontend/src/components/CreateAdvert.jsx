import { useState } from "react";
import { advertStore } from "../stores/advertStore";

export const CreateAdvert = () => {
    // For simplicity, test first with adverts containing only one input field. If it works, add more fields
    const [advert, setAdvert] = useState({product: ""});
    const [product, setProduct] = useState("");
    const { addAdvertToServer } = advertStore();

    // Create a simple advert with only product to see if it works
    const handleProductInput = (e) => {
        setProduct(e.target.value);
    };

    const addAdvertLocal = async () => {
        if (product.trim() !== "") {
            setAdvert({product: product});
            await addAdvertToServer(advert);
            // alert("Advert published successfully");
            setProduct(""); //Clear the input field after the advert is added
        }
    };

    return (
        <div className="create-advert">
            <h1>Create A New Advert</h1>
            <div className="option">
                <label htmlFor="product">Product</label>
                <input 
                    type="text" 
                    name="product"
                    className="advert-info"
                    placeholder="enter product" 
                    onChange={handleProductInput} 
                    value={product} 
                />
            </div>
            
            <button className="button publish" onClick={addAdvertLocal}>Publish Advert</button>
        </div>
    )
}
