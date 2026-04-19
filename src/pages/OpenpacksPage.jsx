import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from "react-router-dom"
import { openPack, getMyPacks, checkAuth, logout } from "../api"
import Navbar from "../components/Navbar"
import LoadingSpinner from "../components/LoadingSpinner"
import '../index.css'

export default function OpenpacksPage() {
    const navigation = useNavigate()
    const [packs, setPacks] = useState(0)
    const [opening, setOpening] = useState(false)
    const [lastCard, setLastCard] = useState(null)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const verifyAuth = async () => {
            const { authenticated, user } = await checkAuth()
            if (!authenticated) {
                navigation('/login')
                return
            }
            setUser(user)
            await loadPacks()
            setLoading(false)
        }
        verifyAuth()
    }, [navigation])

    const loadPacks = async () => {
        const res = await getMyPacks()
        if (res.result) setPacks(res.packs)
    }

    const handleOpenPack = async () => {
        if (packs <= 0) {
            alert("You don't have any packs to open!")
            return
        }

        setOpening(true)
        const res = await openPack()
        setOpening(false)

        if (res.result) {
            setLastCard(res.card)
            setPacks(prev => prev - 1)
            alert(`You got: ${res.card.manufacturer} ${res.card.card_name}!`)
        } else {
            alert(res.message || "Failed to open pack")
        }
    }

    const handleLogout = async () => {
        await logout()
        navigation('/')
    }

    if (loading) return <LoadingSpinner />

    return (
        <div className="vh-100 d-flex flex-column">
            <Navbar title="Open Packs" user={user} onLogout={handleLogout} />

            <div className="flex-grow-1 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#f5f5f5' }}>
                <div className="text-center">
                    <h2 style={{ fontSize: '2rem', fontWeight: '300', color: '#333', marginBottom: '20px' }}>
                        You have {packs} pack{packs !== 1 ? 's' : ''}
                    </h2>

                    <button
                        style={{
                            width: '300px',
                            padding: '20px 0',
                            fontSize: '1.5rem',
                            borderRadius: '30px',
                            border: 'none',
                            backgroundColor: '#3498db',
                            color: 'white',
                            cursor: packs > 0 ? 'pointer' : 'not-allowed',
                            opacity: packs > 0 ? 1 : 0.5,
                            marginBottom: '30px',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            if (packs > 0 && !opening) {
                                e.target.style.backgroundColor = '#2980b9'
                                e.target.style.transform = 'scale(1.02)'
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (packs > 0 && !opening) {
                                e.target.style.backgroundColor = '#3498db'
                                e.target.style.transform = 'scale(1)'
                            }
                        }}
                        onClick={handleOpenPack}
                        disabled={opening || packs === 0}
                    >
                        {opening ? 'OPENING...' : '🎁 OPEN PACK'}
                    </button>

                    {opening && (
                        <div className="mt-4">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Opening...</span>
                            </div>
                        </div>
                    )}

                    {lastCard && !opening && (
                        <div className="mt-5">
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '300', color: '#333', marginBottom: '15px' }}>
                                Last Card:
                            </h3>
                            <div style={{
                                backgroundColor: '#ffffff',
                                color: '#333',
                                borderRadius: '16px',
                                padding: '20px',
                                border: '2px solid #3498db',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                maxWidth: '300px',
                                margin: '0 auto'
                            }}>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px', color: '#333' }}>
                                    {lastCard.manufacturer} {lastCard.card_name}
                                </h4>
                                <p style={{ margin: '5px 0', color: '#666' }}>
                                    <strong style={{ color: '#333' }}>HP:</strong> {lastCard.horsepower} hp
                                </p>
                                <p style={{ margin: '5px 0', color: '#666' }}>
                                    <strong style={{ color: '#333' }}>0-100:</strong> {lastCard.acceleration}s
                                </p>
                                <p style={{ margin: '5px 0', color: '#666' }}>
                                    <strong style={{ color: '#333' }}>Fuel:</strong> {lastCard.fuel}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}