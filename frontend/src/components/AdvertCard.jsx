
const AdvertCard = ({ advert }) => {
  return (
    <div className="advert-card">
        <p>Product: {advert.product}</p>
        <p>Amount: {advert.amount}</p>
        <p>Unit: {advert.unit}</p>
        <p>Address: {advert.address}</p>
        <p>Pick-up time: {advert.pickUpTime}</p>
        <p>Advertiser: {advert.advertiser}</p>
    </div>
  );
};

export default AdvertCard;
