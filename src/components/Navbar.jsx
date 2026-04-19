import { useNavigate } from "react-router-dom"
import logo from '../assets/carcardsLogo.png'
import NotificationBell from "./NotificationBell"
import { useState } from "react"
import SettingsModal from "./SettingsModal"
import { updateUsername, updateEmail, updatePassword, deleteAccount } from "../api"

export default function Navbar({ title, user, onLogout, showBackButton = false }) {
    const navigation = useNavigate()
    const [showSettings, setShowSettings] = useState(false)

    const handleUpdate = async (data) => {
        if (data.type === "username") {
            return await updateUsername(data.newUsername);
        } else if (data.type === "email") {
            return await updateEmail(data.newEmail);
        } else if (data.type === "password") {
            return await updatePassword(data.nowPassword, data.newPassword);
        }
        return { result: false, message: "Unknown action" };
    };

    const handleDelete = async () => {
        const res = await deleteAccount();
        if (res.result) {
            localStorage.removeItem('user');
            navigation('/');
        }
        return res;
    };

    return (
        <>
            <nav className="navbar" style={{
                height: '70px',
                minHeight: '70px',
                backgroundColor: '#d1d1d1',
                position: 'relative',
                zIndex: 1000
            }}>
                <div className="container-fluid d-flex align-items-center justify-content-between px-4" style={{ height: '100%' }}>
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

                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <NotificationBell />

                        {/* Kattintható felhasználónév */}
                        {user && (
                            <button
                                onClick={() => setShowSettings(true)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#000000',
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    padding: '8px 12px',
                                    borderRadius: '20px',
                                    transition: 'background-color 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                                {user.username} ⚙️
                            </button>
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

            <SettingsModal
                isOpen={showSettings}
                onClose={() => setShowSettings(false)}
                user={user}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
        </>
    );
}