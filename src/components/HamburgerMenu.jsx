import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HamburgerMenu({ user, onLogout, onOpenSettings }) {
    const [isOpen, setIsOpen] = useState(false);
    const navigation = useNavigate();

    const menuItems = [
        { label: "Main", path: "/main", icon: "🏠" },
        { label: "Market", path: "/market", icon: "🏪" },
        { label: "My Cards", path: "/mycards", icon: "🃏" },
        { label: "Open Packs", path: "/openpacks", icon: "🎁" },
    ];

    const handleNavigation = (path) => {
        setIsOpen(false);
        navigation(path);
    };

    const handleSettings = () => {
        setIsOpen(false);
        if (onOpenSettings) onOpenSettings();
    };

    const handleLogout = () => {
        setIsOpen(false);
        onLogout();
    };

    return (
        <>
            {/* Hamburger gomb */}
            <button
                className="hamburger-btn"
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.8rem',
                    cursor: 'pointer',
                    color: '#000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
                ☰
            </button>

            {/* Háttér overlay */}
            {isOpen && (
                <div
                    className="menu-overlay"
                    onClick={() => setIsOpen(false)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 999,
                        transition: 'all 0.3s ease'
                    }}
                />
            )}

            {/* Hamburger menü tartalom */}
            <div
                className={`hamburger-menu ${isOpen ? 'open' : ''}`}
                style={{
                    position: 'fixed',
                    top: 0,
                    right: isOpen ? '0' : '-280px',
                    width: '280px',
                    height: '100%',
                    backgroundColor: '#ffffff',
                    boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
                    zIndex: 1000,
                    transition: 'right 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px 0'
                }}
            >
                {/* Fejléc a menüben */}
                <div style={{
                    padding: '0 20px 20px 20px',
                    borderBottom: '1px solid #eee',
                    marginBottom: '20px'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>
                            Menu
                        </span>
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                color: '#666'
                            }}
                        >
                            ✕
                        </button>
                    </div>
                    {user && (
                        <div style={{ marginTop: '15px' }}>
                            <div style={{
                                backgroundColor: '#f0f0f0',
                                borderRadius: '10px',
                                padding: '10px'
                            }}>
                                <div style={{ fontSize: '0.8rem', color: '#666' }}>Logged in as</div>
                                <div style={{ fontWeight: 'bold', color: '#333' }}>{user.username}</div>
                                <div style={{ fontSize: '0.75rem', color: '#999' }}>{user.email}</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Menüpontok */}
                <div style={{ flex: 1 }}>
                    {menuItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => handleNavigation(item.path)}
                            style={{
                                width: '100%',
                                padding: '15px 20px',
                                background: 'none',
                                border: 'none',
                                textAlign: 'left',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                color: '#333',
                                transition: 'background-color 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                            <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>

                {/* Settings gomb */}
                <div style={{ padding: '0 20px 15px 20px' }}>
                    <button
                        onClick={handleSettings}
                        style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: 'transparent',
                            color: '#333',
                            border: '1px solid #ddd',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#f5f5f5';
                            e.target.style.borderColor = '#333';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.borderColor = '#ddd';
                        }}
                    >
                        <span style={{ fontSize: '1.2rem' }}>⚙️</span>
                        <span>Settings</span>
                    </button>
                </div>

                {/* Kijelentkezés gomb */}
                <div style={{ padding: '0 20px 20px 20px', marginTop: 'auto' }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: '500',
                            transition: 'background-color 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#c82333'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#dc3545'}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
}