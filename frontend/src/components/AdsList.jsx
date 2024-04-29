import { useEffect, useState } from "react";
import { adStore } from "../stores/adStore";
import { AdCard } from "../components/AdCard";
import { Button } from "./reusableComponents/Button";

export const AdsList = ({ showUserAdsOnly = false }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { ads, getAllAds, fetchAds, deleteAllAds, deleteAdById } = adStore();

  useEffect(() => {
    const fetchAdsData = async () => {
      setIsLoading(true);
      if (showUserAdsOnly) {
        await fetchAds(); // Fetch user-specific ads
      } else {
        await getAllAds(); // Fetch all ads
      }
      setIsLoading(false);
    };

    fetchAdsData();
  }, [getAllAds, fetchAds, showUserAdsOnly]);

  return (
    <div>
      {showUserAdsOnly && (
        <Button
          label="Delete All My Ads"
          onClick={deleteAllAds}
          ariaLabel="Delete All Ads"
        />
      )}
      {ads.map(ad => (
        <div key={ad._id}>
          <AdCard ad={ad} />
          {showUserAdsOnly && (
            <Button
              label="Delete This Ad"
              onClick={() => deleteAdById(ad._id)}
              ariaLabel={`Delete Ad ${ad._id}`}
            />
          )}
        </div>
      ))}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};
