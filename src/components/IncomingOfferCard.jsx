export default function IncomingOfferCard({ offer, onAccept, onReject }) {
    return (
        <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '15px',
            overflow: 'hidden',
            border: '1px solid #ddd',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ padding: '15px', flex: 1 }}>
                <h5 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '1rem', fontWeight: '600' }}>
                    Incoming Offer
                </h5>
                <p style={{ margin: '4px 0', color: '#666', fontSize: '0.9rem' }}>
                    <strong>From:</strong> {offer.offerer_username}
                </p>
                <p style={{ margin: '4px 0', color: '#666', fontSize: '0.9rem' }}>
                    <strong>Offers:</strong> {offer.offered_manufacturer} {offer.offered_name}
                </p>
                <p style={{ margin: '4px 0', color: '#666', fontSize: '0.9rem' }}>
                    <strong>For your:</strong> {offer.listing_manufacturer} {offer.listing_name}
                </p>
                <p style={{ margin: '4px 0', color: '#666', fontSize: '0.8rem' }}>
                    <strong>Created:</strong> {new Date(offer.created_at).toLocaleString()}
                </p>
            </div>
            <div style={{ padding: '12px', display: 'flex', gap: '10px' }}>
                <button
                    style={{
                        flex: 1,
                        padding: '8px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '25px',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#218838'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#28a745'}
                    onClick={() => onAccept(offer)}
                >
                    ACCEPT
                </button>
                <button
                    style={{
                        flex: 1,
                        padding: '8px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '25px',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#c82333'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#dc3545'}
                    onClick={() => onReject(offer)}
                >
                    REJECT
                </button>
            </div>
        </div>
    )
}