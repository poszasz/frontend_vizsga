// components/MainLayout.jsx
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from "./Navbar"

export default function MainLayout({ title, user, onLogout, children }) {
    return (
        <div className="vh-100 d-flex flex-column">
            <Navbar title={title} user={user} onLogout={onLogout} />
            <div className="flex-grow-1 d-flex justify-content-center align-items-center"
                style={{ backgroundColor: '#f5f5f5' }}>
                <div className="container px-3 px-md-4">
                    <div className="row justify-content-center g-3 g-md-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}