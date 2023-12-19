import { useEffect, useState } from "react";
import { adStore } from "../stores/adStore";
import { AdCard } from "../components/AdCard";

export const AdsList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { ads, getAllAds } = adStore();
  
    useEffect(() => {
      const fetchAds = async () => {
        setIsLoading(true); // Set loading to true before fetching
        await getAllAds();
        setIsLoading(false); // Set loading to false after fetching
      };
  
      fetchAds();
    }, [getAllAds]);
  
    if (isLoading) {
      return <p>Loading ads...</p>; // Or a spinner/loading component
    }
  
    return (
      <div>
        {ads.map(ad => (
          <AdCard key={ad._id} ad={ad} />
        ))}
      </div>
    );
  };