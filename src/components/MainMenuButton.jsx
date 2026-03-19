export default function MainMenuButton({ image, alt, text, onClick }) {
    const buttonContainerStyle = {
        width: '350px',
        height: '650px',
        margin: '0 15px',
        cursor: 'pointer',
        borderRadius: '20px',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        border: '1px solid #ddd',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
    }

    const imageContainerStyle = {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: '#f0f0f0'
    }

    const imageStyle = {
        maxWidth: '100%',
        maxHeight: '100%',
        width: 'auto',
        height: 'auto',
        objectFit: 'contain',
        display: 'block'
    }

    const textStyle = {
        padding: '20px 0',
        fontSize: '1.5rem',
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        backgroundColor: '#f8f8f8',
        borderTop: '1px solid #eee',
        letterSpacing: '1px',
        width: '100%'
    }

    return (
        <div
            style={buttonContainerStyle}
            onClick={onClick}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)'
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'
            }}
        >
            <div style={imageContainerStyle}>
                <img
                    src={image}
                    alt={alt}
                    style={imageStyle}
                    onError={(e) => {
                        e.target.src = `https://via.placeholder.com/350x250?text=${alt}`
                    }}
                />
            </div>
            <div style={textStyle}>
                {text}
            </div>
        </div>
    )
}