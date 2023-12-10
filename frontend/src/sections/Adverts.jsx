import { useCallback, useEffect } from "react";
import { userStore } from "../stores/userStore";
import { advertStore } from "../stores/advertStore";
import AdvertCard from "../components/AdvertCard";

const Adverts = () => {
  const { adverts, fetchAdverts } = advertStore();
  const { accessToken } = userStore();
  
  // Problem with useEffect(): "React Hook useEffect has a missing dependency: 'fetchAdverts'. Either include it or remove the dependency array.eslintreact-hooks/exhaustive-deps".
  // fetchAdverts is a function provided by the advertStore, and it's unlikely to change between renders. If it is included in the dependency array, it might trigger unnecessary re-renders. To address this, the useCallback hook is used to memorize the fetchAdverts function, making it stable across renders.
  
  const memorizedFetchAdverts = useCallback(() => {
    fetchAdverts();
  }, [fetchAdverts]);

  useEffect(() => {
    memorizedFetchAdverts();
  }, [memorizedFetchAdverts, accessToken]);
  
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
