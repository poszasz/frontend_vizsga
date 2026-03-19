import { useNavigate } from "react-router-dom"
import logo from '../assets/carcardsLogo.png'
import NotificationBell from "./NotificationBell"

export default function Navbar({ title, user, onLogout, showBackButton = false }) {
    const navigation = useNavigate()

    return (
        <nav className="navbar" style={{
            height: '70px',
            minHeight: '70px',
            backgroundColor: '#d1d1d1',
            position: 'relative',
            zIndex: 1000
        }}>
            <div className="container-fluid d-flex align-items-center justify-content-between px-4" style={{ height: '100%' }}>
                {/* Bal oldali logo */}
                <button
                    onClick={() => navigation('/main')}
                    style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <img src={logo} alt="Car Cards Logo" style={{ height: '50px', width: 'auto' }} />
                </button>

                {/* Középen a cím */}
                <span style={{
                    fontSize: '2rem',
                    fontWeight: '500',
                    color: '#000000',
                    lineHeight: '1',
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)'
                }}>
                    {title}
                </span>

                {/* Jobb oldali ikonok */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <NotificationBell />
                    
                    {user && (
                        <span style={{ color: '#000000', fontSize: '1rem', fontWeight: '500' }}>
                            {user.username}
                        </span>
                    )}

                    {showBackButton ? (
                        <button
                            onClick={() => navigation(-1)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#000000',
                                fontSize: '2rem',
                                cursor: 'pointer',
                                width: '50px',
                                height: '50px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                            ←
                        </button>
                    ) : (
                        <button
                            onClick={onLogout}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#000000',
                                fontSize: '1.8rem',
                                cursor: 'pointer',
                                width: '50px',
                                height: '50px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                            ↪
                        </button>
                    )}
                </div>
            </div>
        </nav>
    )
}