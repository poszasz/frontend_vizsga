export default function OfferCard({ offer, onDelete }) {
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
                    Your offer
                </h5>
                <p style={{ margin: '4px 0', color: '#666', fontSize: '0.9rem' }}>
                    <strong>Card:</strong> {offer.manufacturer} {offer.name}
                </p>
                <p style={{ margin: '4px 0', color: '#666', fontSize: '0.9rem' }}>
                    <strong>HP:</strong> {offer.horsepower} HP
                </p>
                <p style={{ margin: '4px 0', color: '#666', fontSize: '0.8rem' }}>
                    Created: {new Date(offer.created_at).toLocaleDateString()}
                </p>
            </div>
            <div style={{ padding: '0 12px 12px 12px' }}>
                <button
                    style={{
                        width: '100%',
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
                    onClick={() => onDelete(offer)}
                >
                    DELETE OFFER
                </button>
            </div>
        </div>
    )
}