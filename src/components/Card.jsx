export default function Card({ card, onClick, showCount = false, count = 1 }) {
    const carImages = import.meta.glob('../assets/*.{jpg,jpeg,png,jfif,webp}', { eager: true })

    const getImageUrl = (card) => {
        const key = `../assets/${card.image_url}`
        return carImages[key]?.default
            || `https://via.placeholder.com/300x150?text=${card.manufacturer}+${card.name}`;
    }

    const cardStyle = {
        backgroundColor: '#ffffff',
        borderRadius: '15px',
        overflow: 'hidden',
        border: '1px solid #ddd',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    }

    return (
        <div
            style={cardStyle}
            onClick={onClick}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)'
                e.currentTarget.style.borderColor = '#000000'
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)'
                e.currentTarget.style.borderColor = '#ddd'
            }}
        >
            <img
                src={getImageUrl(card)}
                alt={`${card.manufacturer} ${card.name}`}
                style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderBottom: '1px solid #eee'
                }}
                onError={(e) => {
                    e.target.src = `https://via.placeholder.com/300x150?text=${card.manufacturer}+${card.name}`
                }}
            />

            <div style={{ padding: '15px', color: '#333', flex: 1 }}>
                <div style={{
                    fontSize: 'clamp(1rem, 4vw, 1.2rem)',
                    fontWeight: 'bold',
                    marginBottom: '5px',
                    color: '#333',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '5px'
                }}>
                    {card.manufacturer} {card.name}
                    {showCount && count > 1 && (
                        <span style={{
                            backgroundColor: '#000000',
                            color: 'white',
                            borderRadius: '20px',
                            padding: '3px 10px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold'
                        }}>
                            x{count}
                        </span>
                    )}
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px',
                    fontSize: 'clamp(0.75rem, 3vw, 0.9rem)',
                    marginTop: '10px'
                }}>
                    <div>
                        <span style={{ color: '#666', fontSize: '0.7rem', display: 'block' }}>HP</span>
                        <span style={{ color: '#333', fontWeight: '500' }}>{card.horsepower || 'N/A'} hp</span>
                    </div>
                    <div>
                        <span style={{ color: '#666', fontSize: '0.7rem', display: 'block' }}>0-100</span>
                        <span style={{ color: '#333', fontWeight: '500' }}>{card.acceleration || 'N/A'}s</span>
                    </div>
                    <div>
                        <span style={{ color: '#666', fontSize: '0.7rem', display: 'block' }}>Fuel</span>
                        <span style={{ color: '#333', fontWeight: '500' }}>{card.fuel || 'N/A'}</span>
                    </div>
                    <div>
                        <span style={{ color: '#666', fontSize: '0.7rem', display: 'block' }}>Gearbox</span>
                        <span style={{ color: '#333', fontWeight: '500' }}>{card.gearbox || 'N/A'}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}