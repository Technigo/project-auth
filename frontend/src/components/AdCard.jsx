export const AdCard = ({ ad }) => {

    console.log(ad);
    return (
        <div className="advert-card">
            <img
                src={ad.image}
                alt={`${ad.brand} ${ad.model}`}
                className="ad-image" 
                style={{ width: '200px', height: 'auto' }} // Set the width and let the height adjust automatically
            />
            <p>Brand: {ad.brand}</p>
            <p>Model: {ad.model}</p>
        </div>
    );
};

