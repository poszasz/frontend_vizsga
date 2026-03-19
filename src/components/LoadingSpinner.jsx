export default function LoadingSpinner() {
    return (
        <div className="vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#f5f5f5' }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}