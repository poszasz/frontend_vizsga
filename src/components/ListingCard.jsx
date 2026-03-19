export default function ListingCard({ listing, user, onMakeOffer, onDelete }) {
    const getImageUrl = (item) => {
        return item.image_url || `https://via.placeholder.com/300x120?text=${item.manufacturer}+${item.name}`;
    }

    return (
        <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '15px',
            overflow: 'hidden',
            border: '1px solid #ddd',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)'
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'
                e.currentTarget.style.borderColor = '#000000'
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)'
                e.currentTarget.style.borderColor = '#ddd'
            }}>
            <img
                src={getImageUrl(listing)}
                alt={`${listing.manufacturer} ${listing.name}`}
                style={{
                    width: '100%',
                    height: '120px',
                    objectFit: 'cover',
                    borderBottom: '1px solid #eee'
                }}
                onError={(e) => {
                    e.target.src = `https://via.placeholder.com/300x120?text=${listing.manufacturer}+${listing.name}`
                }}
            />

            <div style={{ padding: '12px', flex: 1 }}>
                <h5 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '1rem', fontWeight: '600' }}>
                    {listing.manufacturer} {listing.name}
                </h5>
                <p style={{ margin: '4px 0', color: '#666', fontSize: '0.9rem' }}>
                    <strong>Seller:</strong> {listing.seller_username}
                </p>
                <p style={{ margin: '4px 0', color: '#333', fontSize: '1rem', fontWeight: '600' }}>
                    {listing.horsepower} HP
                </p>
                <p style={{ margin: '4px 0', color: '#666', fontSize: '0.85rem' }}>
                    0-100: {listing.acceleration}s
                </p>
            </div>

            {listing.seller_id !== user?.id && (
                <div style={{ padding: '0 12px 12px 12px' }}>
                    <button
                        style={{
                            width: '100%',
                            padding: '8px',
                            backgroundColor: '#000000',
                            color: 'white',
                            border: 'none',
                            borderRadius: '25px',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#333333'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#000000'}
                        onClick={() => onMakeOffer(listing)}
                    >
                        MAKE OFFER
                    </button>
                </div>
            )}

            {listing.seller_id === user?.id && (
                <div style={{ padding: '0 12px 12px 12px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <p style={{
                            color: '#666',
                            textAlign: 'center',
                            margin: 0,
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            flex: 1,
                            alignSelf: 'center'
                        }}>
                            YOUR LISTING
                        </p>
                        <button
                            style={{
                                padding: '6px 12px',
                                backgroundColor: '#dc3545',
                                color: 'white',
                                border: 'none',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                fontWeight: '500',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#c82333'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#dc3545'}
                            onClick={() => onDelete(listing)}
                        >
                            DELETE
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}