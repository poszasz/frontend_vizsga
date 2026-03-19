import { useState } from "react"

export default function NotificationBell() {
    const [showNotifications, setShowNotifications] = useState(false)
    
    const notifications = [
        { id: 1, message: "New card available in market!", time: "2 min ago", read: false },
        { id: 2, message: "Your offer was accepted", time: "1 hour ago", read: false },
        { id: 3, message: "Daily bonus available", time: "3 hours ago", read: true },
        { id: 4, message: "New pack available!", time: "5 hours ago", read: true }
    ]

    const unreadCount = notifications.filter(n => !n.read).length

    return (
        <div style={{ position: 'relative' }}>
            <button
                onClick={() => setShowNotifications(!showNotifications)}
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
                    borderRadius: '50%',
                    position: 'relative'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
                🔔
                {unreadCount > 0 && (
                    <span style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        backgroundColor: 'red',
                        color: 'white',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                    }}>
                        {unreadCount}
                    </span>
                )}
            </button>

            {showNotifications && (
                <div style={{
                    position: 'absolute',
                    top: '60px',
                    right: '0',
                    width: '300px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    zIndex: 1001
                }}>
                    <div style={{ padding: '15px', borderBottom: '1px solid #ddd', backgroundColor: '#f5f5f5' }}>
                        <h4 style={{ margin: 0, color: '#333', fontSize: '1.1rem' }}>Notifications</h4>
                    </div>
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {notifications.map(notif => (
                            <div key={notif.id} style={{
                                padding: '12px 15px',
                                borderBottom: '1px solid #eee',
                                backgroundColor: notif.read ? '#ffffff' : '#f0f7ff'
                            }}>
                                <div style={{ color: '#333', fontSize: '0.95rem' }}>{notif.message}</div>
                                <div style={{ color: '#666', fontSize: '0.8rem' }}>{notif.time}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}