import { useNavigate } from "react-router-dom";
import logo from '../assets/carcardsLogo.png';
import NotificationBell from "./NotificationBell";
import { useState, useEffect } from "react";
import SettingsModal from "./SettingsModal";
import HamburgerMenu from "./HamburgerMenu";
import { updateUsername, updateEmail, updatePassword, deleteAccount } from "../api";

export default function Navbar({ title, user, onLogout, showBackButton = false, showHamburgerMenu = true }) {
    const navigation = useNavigate();
    const [showSettings, setShowSettings] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    const handleOpenSettings = () => {
        setShowSettings(true);
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

                    {/* Középen a cím - mindig középen desktopon */}
                    <span style={{
                        fontSize: '2rem',
                        fontWeight: '500',
                        color: '#000000',
                        lineHeight: '1',
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: isMobile ? 'none' : 'block'
                    }}>
                        {title}
                    </span>

                    {/* Jobb oldali ikonok */}
                    {
                        showHamburgerMenu && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <NotificationBell />

                                {/* Desktop: kattintható felhasználónév és gombok */}
                                {!isMobile && (
                                    <>
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
                                    </>
                                )}

                                {/* Mobil: hamburger menü */}
                                {isMobile && (
                                    <HamburgerMenu
                                        user={user}
                                        onLogout={onLogout}
                                        onOpenSettings={handleOpenSettings}
                                    />
                                )}
                            </div>
                        )
                    }

                </div>
            </nav>

            {/* Mobil: cím a navbar alatt */}
            {isMobile && (
                <div style={{
                    backgroundColor: '#d1d1d1',
                    textAlign: 'center',
                    padding: '10px 0',
                    borderTop: '1px solid rgba(0,0,0,0.1)'
                }}>
                    <span style={{
                        fontSize: '1.5rem',
                        fontWeight: '500',
                        color: '#000000'
                    }}>
                        {title}
                    </span>
                </div>
            )}

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