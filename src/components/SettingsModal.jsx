import { useState } from "react";
import Modal from "./Modal";
import TextBox from "./TextBox";

export default function SettingsModal({ isOpen, onClose, user, onUpdate, onDelete }) {
    const [activeTab, setActiveTab] = useState("profile");
    const [username, setUsername] = useState(user?.username || "");
    const [email, setEmail] = useState(user?.email || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const textBoxStyle = {
        input: {
            backgroundColor: '#1a1a1a',
            color: 'white',
            border: '1px solid #444',
            borderRadius: '30px',
            padding: '12px 20px',
            fontSize: '1rem',
            width: '100%',
            transition: 'all 0.3s ease'
        },
        placeholder: { color: '#aaa' }
    };

    const handleUpdateUsername = async () => {
        if (!username.trim()) {
            setError("Username cannot be empty");
            return;
        }
        setLoading(true);
        setError("");
        setSuccess("");
        
        try {
            const res = await onUpdate({ type: "username", newUsername: username });
            if (res.result) {
                setSuccess("Username updated successfully!");
                setTimeout(() => setSuccess(""), 3000);
            } else {
                setError(res.message || "Failed to update username");
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateEmail = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            return;
        }
        setLoading(true);
        setError("");
        setSuccess("");
        
        try {
            const res = await onUpdate({ type: "email", newEmail: email });
            if (res.result) {
                setSuccess("Email updated successfully!");
                setTimeout(() => setSuccess(""), 3000);
            } else {
                setError(res.message || "Failed to update email");
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async () => {
        if (!currentPassword || !newPassword) {
            setError("Please fill in all password fields");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("New passwords do not match");
            return;
        }
        
        setLoading(true);
        setError("");
        setSuccess("");
        
        try {
            const res = await onUpdate({ 
                type: "password", 
                nowPassword: currentPassword, 
                newPassword: newPassword 
            });
            if (res.result) {
                setSuccess("Password updated successfully!");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setTimeout(() => setSuccess(""), 3000);
            } else {
                setError(res.message || "Failed to update password");
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone! All your cards, listings, offers and packs will be permanently deleted.")) {
            setLoading(true);
            setError("");
            
            try {
                const res = await onDelete();
                if (res.result) {
                    alert("Account deleted successfully");
                    onClose();
                } else {
                    setError(res.message || "Failed to delete account");
                }
            } catch (err) {
                setError("Something went wrong");
            } finally {
                setLoading(false);
            }
        }
    };

    const tabStyle = (tab) => ({
        padding: '10px 20px',
        backgroundColor: activeTab === tab ? '#000000' : '#f0f0f0',
        color: activeTab === tab ? 'white' : '#333',
        border: 'none',
        borderRadius: '25px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: '500',
        transition: 'all 0.2s ease'
    });

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Account Settings">
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', justifyContent: 'center' }}>
                <button style={tabStyle("profile")} onClick={() => { setActiveTab("profile"); setError(""); setSuccess(""); }}>
                    Profile
                </button>
                <button style={tabStyle("password")} onClick={() => { setActiveTab("password"); setError(""); setSuccess(""); }}>
                    Password
                </button>
                <button style={tabStyle("danger")} onClick={() => { setActiveTab("danger"); setError(""); setSuccess(""); }}>
                    Danger Zone
                </button>
            </div>

            {/* Profile Tab */}
            {activeTab === "profile" && (
                <div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', color: '#333', marginBottom: '8px', fontWeight: '500' }}>
                            Username
                        </label>
                        <TextBox
                            type="text"
                            placeholder="Username"
                            value={username}
                            setValue={setUsername}
                            inputStyle={textBoxStyle.input}
                            placeholderStyle={textBoxStyle.placeholder}
                        />
                        <button
                            onClick={handleUpdateUsername}
                            disabled={loading}
                            style={{
                                marginTop: '10px',
                                padding: '8px 20px',
                                backgroundColor: '#000000',
                                color: 'white',
                                border: 'none',
                                borderRadius: '25px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.7 : 1
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#333333'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#000000'}
                        >
                            {loading ? "Updating..." : "Update Username"}
                        </button>
                    </div>

                    <div>
                        <label style={{ display: 'block', color: '#333', marginBottom: '8px', fontWeight: '500' }}>
                            Email
                        </label>
                        <TextBox
                            type="email"
                            placeholder="Email"
                            value={email}
                            setValue={setEmail}
                            inputStyle={textBoxStyle.input}
                            placeholderStyle={textBoxStyle.placeholder}
                        />
                        <button
                            onClick={handleUpdateEmail}
                            disabled={loading}
                            style={{
                                marginTop: '10px',
                                padding: '8px 20px',
                                backgroundColor: '#000000',
                                color: 'white',
                                border: 'none',
                                borderRadius: '25px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.7 : 1
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#333333'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#000000'}
                        >
                            {loading ? "Updating..." : "Update Email"}
                        </button>
                    </div>
                </div>
            )}

            {/* Password Tab */}
            {activeTab === "password" && (
                <div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', color: '#333', marginBottom: '8px', fontWeight: '500' }}>
                            Current Password
                        </label>
                        <TextBox
                            type="password"
                            placeholder="Current password"
                            value={currentPassword}
                            setValue={setCurrentPassword}
                            inputStyle={textBoxStyle.input}
                            placeholderStyle={textBoxStyle.placeholder}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', color: '#333', marginBottom: '8px', fontWeight: '500' }}>
                            New Password
                        </label>
                        <TextBox
                            type="password"
                            placeholder="New password"
                            value={newPassword}
                            setValue={setNewPassword}
                            inputStyle={textBoxStyle.input}
                            placeholderStyle={textBoxStyle.placeholder}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', color: '#333', marginBottom: '8px', fontWeight: '500' }}>
                            Confirm New Password
                        </label>
                        <TextBox
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            setValue={setConfirmPassword}
                            inputStyle={textBoxStyle.input}
                            placeholderStyle={textBoxStyle.placeholder}
                        />
                    </div>
                    <button
                        onClick={handleUpdatePassword}
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#000000',
                            color: 'white',
                            border: 'none',
                            borderRadius: '25px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#333333'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#000000'}
                    >
                        {loading ? "Updating..." : "Update Password"}
                    </button>
                </div>
            )}

            {/* Danger Zone Tab */}
            {activeTab === "danger" && (
                <div style={{ textAlign: 'center' }}>
                    <p style={{ color: '#666', marginBottom: '20px' }}>
                        Once you delete your account, there is no going back. All your data will be permanently lost.
                    </p>
                    <button
                        onClick={handleDeleteAccount}
                        disabled={loading}
                        style={{
                            padding: '12px 30px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '25px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontSize: '1rem',
                            fontWeight: '500',
                            opacity: loading ? 0.7 : 1
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#c82333'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#dc3545'}
                    >
                        {loading ? "Deleting..." : "Delete My Account"}
                    </button>
                </div>
            )}

            {/* Messages */}
            {error && (
                <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '8px', textAlign: 'center' }}>
                    {error}
                </div>
            )}
            {success && (
                <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e8f5e9', color: '#2e7d32', borderRadius: '8px', textAlign: 'center' }}>
                    {success}
                </div>
            )}
        </Modal>
    );
}