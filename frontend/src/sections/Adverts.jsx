import { useEffect } from "react";
import { userStore } from "../stores/userStore";
import { advertStore } from "../stores/advertStore";
import AdvertCard from "../components/AdvertCard";

const Adverts = () => {
  const { adverts, fetchAdverts } = advertStore();
  const { accessToken } = userStore();

  console.log(accessToken);
  
  useEffect(() => {
    fetchAdverts();
  }, [fetchAdverts, adverts, accessToken]);

  return (
    <>
        <h1>Your adverts</h1>
        {adverts.length === 0 ? (
          <>
            <p>You don&apos;t have any advert...</p>
          </>
        ) : (
          adverts.map((advert, index) => (
            <div key={index}>
              <AdvertCard advert={advert} />
            </div>
          ))  
        )} 
    </>
  );
};

export default Adverts;
