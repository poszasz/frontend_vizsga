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
        <div className="notification-bell-container">
            <button
                className="notification-bell-btn"
                onClick={() => setShowNotifications(!showNotifications)}
            >
                🔔
                {unreadCount > 0 && (
                    <span className="notification-badge">
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                )}
            </button>

            {showNotifications && (
                <>
                    {/* Overlay mobile view */}
                    <div 
                        className="d-block d-md-none notification-overlay"
                        onClick={() => setShowNotifications(false)}
                    />
                    
                    <div className="notification-dropdown">
                        <div className="notification-header">
                            <h4 className="notification-title">Notifications</h4>
                            {unreadCount > 0 && (
                                <button
                                    className="notification-mark-all-btn"
                                    onClick={handleMarkAllAsRead}
                                >
                                    Mark all as read
                                </button>
                            )}
                        </div>
                        
                        <div className="notification-list">
                            {loading ? (
                                <div className="notification-loading">
                                    Loading...
                                </div>
                            ) : notifications.length > 0 ? (
                                notifications.map(notif => (
                                    <div
                                        key={notif.id}
                                        className={`notification-item ${
                                            notif.is_read ? 'notification-item-read' : 'notification-item-unread'
                                        }`}
                                        onClick={() => handleMarkAsRead(notif.id)}
                                    >
                                        <div className="notification-content">
                                            <span className="notification-icon">
                                                {getIcon(notif.type)}
                                            </span>
                                            <div className="notification-text-container">
                                                <div className="notification-item-title">
                                                    {notif.title}
                                                </div>
                                                <div className="notification-message">
                                                    {notif.message}
                                                </div>
                                                <div className="notification-timestamp">
                                                    {new Date(notif.created_at).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="notification-empty">
                                    No notifications
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}