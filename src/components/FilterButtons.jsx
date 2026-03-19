export default function FilterButtons({ filterType, setFilterType, counts }) {
    const buttonStyle = (type) => ({
        padding: '8px 20px',
        borderRadius: '30px',
        border: 'none',
        backgroundColor: filterType === type ? '#000000' : 'transparent',
        color: filterType === type ? 'white' : '#666',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
    })

    return (
        <div style={{
            display: 'flex',
            gap: '10px',
            backgroundColor: '#ffffff',
            padding: '8px',
            borderRadius: '50px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            border: '1px solid #ddd'
        }}>
            <button
                style={buttonStyle('all')}
                onClick={() => setFilterType('all')}
                onMouseEnter={(e) => {
                    if (filterType !== 'all') {
                        e.target.style.backgroundColor = '#333333'
                        e.target.style.color = 'white'
                    }
                }}
                onMouseLeave={(e) => {
                    if (filterType !== 'all') {
                        e.target.style.backgroundColor = 'transparent'
                        e.target.style.color = '#666'
                    }
                }}
            >
                All Listings ({counts.all})
            </button>
            <button
                style={buttonStyle('mine')}
                onClick={() => setFilterType('mine')}
                onMouseEnter={(e) => {
                    if (filterType !== 'mine') {
                        e.target.style.backgroundColor = '#333333'
                        e.target.style.color = 'white'
                    }
                }}
                onMouseLeave={(e) => {
                    if (filterType !== 'mine') {
                        e.target.style.backgroundColor = 'transparent'
                        e.target.style.color = '#666'
                    }
                }}
            >
                My Listings ({counts.mine})
            </button>
            <button
                style={buttonStyle('others')}
                onClick={() => setFilterType('others')}
                onMouseEnter={(e) => {
                    if (filterType !== 'others') {
                        e.target.style.backgroundColor = '#333333'
                        e.target.style.color = 'white'
                    }
                }}
                onMouseLeave={(e) => {
                    if (filterType !== 'others') {
                        e.target.style.backgroundColor = 'transparent'
                        e.target.style.color = '#666'
                    }
                }}
            >
                Others ({counts.others})
            </button>
        </div>
    )
}