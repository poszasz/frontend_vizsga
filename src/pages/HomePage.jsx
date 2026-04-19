import { useNavigate } from "react-router-dom"
import kep from '../assets/carcardsLogo.png'
import '../index.css'

export default function HomePage() {
    const navigation = useNavigate()

    const buttonStyle = {
        width: '100%',
        padding: '17px 0',
        fontSize: '1.3rem',
        marginBottom: '30px',
        borderRadius: '30px',
        border: 'none',
        backgroundColor: 'black',
        color: 'white',
        cursor: 'pointer'
    }

    return (
        <div className="d-flex vh-100 flex-column justify-content-center align-content-around">
            <div className="text-center" style={{ marginBottom: '40px' }}>
                <img className="responsive-container" src={kep} alt="Car Cards Logo" style={{ maxWidth: '800px' }} />
            </div>
            <div className="text-center">
                <button className="responsive-container" style={buttonStyle} onClick={() => navigation('/login')}>Login</button>
            </div>
            <div className="text-center" style={{ marginBottom: '20px' }}>
                <button className="responsive-container" style={buttonStyle} onClick={() => navigation('/registration')}>Registration</button>
            </div>
        </div>
    )
}