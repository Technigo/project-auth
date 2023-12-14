import { useEffect } from "react";
import { userStore } from "../stores/userStore";
import { adStore } from "../stores/adStore";
import { CreateAd } from "./CreateAdvert";
import { AdCard } from "./AdvertCard";


export const AdList = () => {
    // Access the functions from the 'adStore'.
    const { ads, fetchAds, handleEdit, deleteAdById } = adStore();
    const { accessToken } = userStore();

    console.log(accessToken);

    useEffect(() => {
        // Fetch advertisements when the component mounts
        fetchAds();
    }, []); // Dependency array to avoid unnecessary re-fetching


    return (
        <>

            <h1>Your ads</h1>
            <div className="ad-wrapper">
                {ads.length === 0 ? (
                    <>
                        <p>You don&apos;t have any ads...</p>
                        <CreateAd />
                    </>
                ) : (
                    ads.map((ad) => (
                        <div key={ad._id}
                            onClick={() => handleEdit(ad._id)}
                        >
                            <AdCard ad={ad} />
                            <button onClick={() => deleteAdById(ad._id)}>Delete</button>
                        </div>
                    ))
                )}
            </div>

        </>
    )
};
