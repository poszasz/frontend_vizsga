import { useState, useEffect } from "react";
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead } from "../api";

export default function NotificationBell() {
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadNotifications = async () => {
        setLoading(true);
        const res = await getNotifications();
        if (res.result) {
            setNotifications(res.notifications);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadNotifications();
        // Frissítsd 30 másodpercenként
        const interval = setInterval(loadNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    const unreadCount = notifications.filter(n => !n.is_read).length;

    const handleMarkAsRead = async (id) => {
        const res = await markNotificationAsRead(id);
        if (res.result) {
            setNotifications(prev =>
                prev.map(n => n.id === id ? { ...n, is_read: true } : n)
            );
        }
    };

    const handleMarkAllAsRead = async () => {
        const res = await markAllNotificationsAsRead();
        if (res.result) {
            setNotifications(prev =>
                prev.map(n => ({ ...n, is_read: true }))
            );
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'incoming_offer': return '📨';
            case 'offer_accepted': return '✅';
            case 'offer_rejected': return '❌';
            default: return '🔔';
        }
    };

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
                    width: '350px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    zIndex: 1001,
                    maxHeight: '500px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{
                        padding: '15px',
                        borderBottom: '1px solid #ddd',
                        backgroundColor: '#f5f5f5',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <h4 style={{ margin: 0, color: '#333', fontSize: '1.1rem' }}>Notifications</h4>
                        {unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllAsRead}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#3498db',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem'
                                }}
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>
                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {loading ? (
                            <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                                Loading...
                            </div>
                        ) : notifications.length > 0 ? (
                            notifications.map(notif => (
                                <div
                                    key={notif.id}
                                    style={{
                                        padding: '12px 15px',
                                        borderBottom: '1px solid #eee',
                                        backgroundColor: notif.is_read ? '#ffffff' : '#f0f7ff',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.2s ease'
                                    }}
                                    onClick={() => handleMarkAsRead(notif.id)}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#e8e8e8'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = notif.is_read ? '#ffffff' : '#f0f7ff'}
                                >
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                        <span style={{ fontSize: '1.2rem' }}>{getIcon(notif.type)}</span>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ color: '#333', fontSize: '0.95rem', fontWeight: 'bold' }}>
                                                {notif.title}
                                            </div>
                                            <div style={{ color: '#666', fontSize: '0.85rem', marginTop: '4px' }}>
                                                {notif.message}
                                            </div>
                                            <div style={{ color: '#999', fontSize: '0.7rem', marginTop: '4px' }}>
                                                {new Date(notif.created_at).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                                No notifications
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}