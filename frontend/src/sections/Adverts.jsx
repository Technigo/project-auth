import { useEffect } from "react";
import { userStore } from "../stores/userStore";
import { advertStore } from "../stores/advertStore";
import AdvertCard from "../components/AdvertCard";
import { CreateAdvert } from "../components/CreateAdvert";

const Adverts = () => {
  const { adverts, fetchAdverts } = advertStore();
  const { accessToken } = userStore();

  console.log(accessToken);
  
  useEffect(() => {
    fetchAdverts();
  }, [fetchAdverts, adverts, accessToken]);

  return (
    <div className="adverts-section">
      <h1>Your adverts</h1>
      <div className="adverts-wrapper">
        {adverts.length === 0 ? (
          <div className="no-advert">
            <p>You don&apos;t have any advert...</p>
            <CreateAdvert />
          </div>
        ) : (
          adverts.map((advert, index) => (
            <div key={index}>
              <AdvertCard advert={advert} />
            </div>
          )) 
        )}
      </div> 
    </div>
  );
};

export default Adverts;
