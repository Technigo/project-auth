export const AdCard = ({ ad }) => {

    return (
        <div className="ad-card" style={{ border: '1px solid #ddd', padding: '10px', margin: '10px' }}>
          <img src={ad.image} alt={`${ad.brand} ${ad.model}`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
          <h3>{ad.brand} - {ad.model}</h3>
          <p>Posted by: {ad.user.username || 'Unknown'}</p>
        </div>
      );
    };
    