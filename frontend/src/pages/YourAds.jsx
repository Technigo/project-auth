import { useEffect, useState } from "react";
import { adStore } from "../stores/adStore";
import { AdsList } from "../components/AdsList"
import { CreateAd } from "../components/CreateAd";
import { BackButton } from "../components/reusableComponents/BackButton";
import { Heading } from "../components/reusableComponents/Heading";

export const YourAds = () => {
    const { ads } = adStore();
    const [hasAds, setHasAds] = useState(false);

    useEffect(() => {
        setHasAds(ads.length > 0);
    }, [ads]);

    return (
        <>
            <BackButton redirectTo="/home" />
            {hasAds && (
                <>
                    <Heading className="share-sneakers" level={2} text="Here are your active posts" aria-label="Active posts" />
                    <AdsList showUserAdsOnly={true} />
                </>
            )}
            <Heading className="share-sneakers" level={2} text="Create a post" aria-label="Create posts" />
            <CreateAd />
        </>
    );
};
