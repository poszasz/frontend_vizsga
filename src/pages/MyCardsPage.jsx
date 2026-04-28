import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from "react-router-dom"
import { getMyCards, checkAuth, logout } from "../api"
import Navbar from "../components/Navbar"
import LoadingSpinner from "../components/LoadingSpinner"
import Card from "../components/Card"
import Modal from "../components/Modal"
import '../index.css'

export default function MyCardsPage() {
    const navigation = useNavigate()
    const [cards, setCards] = useState([])
    const [groupedCards, setGroupedCards] = useState([])
    const [totalCards, setTotalCards] = useState(0)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [selectedCard, setSelectedCard] = useState(null)
    const [showCardModal, setShowCardModal] = useState(false)

    useEffect(() => {
        const verifyAuth = async () => {
            const { authenticated, user } = await checkAuth()
            if (!authenticated) {
                navigation('/login')
                return
            }
            setUser(user)
            await loadCards()
            setLoading(false)
        }
        verifyAuth()
    }, [navigation])

    const loadCards = async () => {
        const res = await getMyCards()
        if (res.result) {
            setCards(res.cards)
            
            const grouped = {}
            let total = 0
            
            res.cards.forEach(card => {
                const key = `${card.manufacturer}_${card.name}_${card.card_id || card.id}`
                if (grouped[key]) {
                    grouped[key].count += 1
                } else {
                    grouped[key] = {
                        ...card,
                        count: 1,
                        card_id: card.card_id || card.id,
                        first_acquired: card.acquired_at
                    }
                }
                total++
            })
            
            setTotalCards(total)
            setGroupedCards(Object.values(grouped))
        }
        setLoading(false)
    }

    const handleLogout = async () => {
        await logout()
        navigation('/')
    }

    

    // Reszponzív kártyarács
    const cardContainerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        padding: '20px'
    }

    const detailItemStyle = {
        marginBottom: '12px',
        padding: '8px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
    }

    const detailLabelStyle = {
        color: '#666',
        fontSize: '0.9rem',
        display: 'block',
        marginBottom: '4px'
    }

    const detailValueStyle = {
        color: '#333',
        fontSize: '1.1rem',
        fontWeight: '500',
        display: 'block'
    }

    if (loading) return <LoadingSpinner />

    return (
        <div className="vh-100 d-flex flex-column">
            <Navbar title="My Cards" user={user} onLogout={handleLogout} />

            <div className="flex-grow-1" style={{ overflowY: 'auto', backgroundColor: '#f5f5f5' }}>
                <div className="p-4">
                    <h3 style={{ fontSize: 'clamp(1.2rem, 5vw, 1.5rem)', fontWeight: '300', color: '#333', marginBottom: '20px' }}>
                        You have {totalCards} car{totalCards !== 1 ? 's' : ''} in your collection
                        <span style={{ fontSize: 'clamp(0.8rem, 3vw, 1rem)', color: '#666', marginLeft: '10px' }}>
                            ({groupedCards.length} different models)
                        </span>
                    </h3>
                    
                    <div style={cardContainerStyle}>
                        {groupedCards.map((card, index) => (
                            <Card 
                                key={index}
                                card={card}
                                onClick={() => {
                                    setSelectedCard(card)
                                    setShowCardModal(true)
                                }}
                                showCount={true}
                                count={card.count}
                            />
                        ))}
                    </div>
                    
                    {groupedCards.length === 0 && (
                        <div className="text-center mt-5">
                            <h4 style={{ fontSize: 'clamp(1.5rem, 6vw, 2rem)', fontWeight: '300', color: '#333' }}>No cards in your collection yet</h4>
                            <p style={{ color: '#666' }}>Open packs or trade with other players to get cards!</p>
                        </div>
                    )}
                </div>
            </div>

            <Modal 
                isOpen={showCardModal} 
                onClose={() => {
                    setShowCardModal(false)
                    setSelectedCard(null)
                }}
                title={`${selectedCard?.manufacturer} ${selectedCard?.name}`}
            >
                {selectedCard && (
                    <>

                        {selectedCard.count > 1 && (
                            <h3 style={{ textAlign: 'center', color: '#666', marginBottom: '20px', fontSize: 'clamp(1rem, 4vw, 1.3rem)' }}>
                                (x{selectedCard.count})
                            </h3>
                        )}

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                            <div>
                                <div style={detailItemStyle}>
                                    <span style={detailLabelStyle}>Manufacturer:</span>
                                    <span style={detailValueStyle}>{selectedCard.manufacturer}</span>
                                </div>
                                <div style={detailItemStyle}>
                                    <span style={detailLabelStyle}>Model:</span>
                                    <span style={detailValueStyle}>{selectedCard.name}</span>
                                </div>
                                <div style={detailItemStyle}>
                                    <span style={detailLabelStyle}>Fuel:</span>
                                    <span style={detailValueStyle}>{selectedCard.fuel}</span>
                                </div>
                                <div style={detailItemStyle}>
                                    <span style={detailLabelStyle}>Gearbox:</span>
                                    <span style={detailValueStyle}>{selectedCard.gearbox}</span>
                                </div>
                                <div style={detailItemStyle}>
                                    <span style={detailLabelStyle}>Engine:</span>
                                    <span style={detailValueStyle}>{selectedCard.engine}</span>
                                </div>
                                <div style={detailItemStyle}>
                                    <span style={detailLabelStyle}>Horsepower:</span>
                                    <span style={detailValueStyle}>{selectedCard.horsepower} hp</span>
                                </div>
                            </div>
                            <div>
                                <div style={detailItemStyle}>
                                    <span style={detailLabelStyle}>Torque:</span>
                                    <span style={detailValueStyle}>{selectedCard.torque} Nm</span>
                                </div>
                                <div style={detailItemStyle}>
                                    <span style={detailLabelStyle}>Weight:</span>
                                    <span style={detailValueStyle}>{selectedCard.weight} kg</span>
                                </div>
                                <div style={detailItemStyle}>
                                    <span style={detailLabelStyle}>Length:</span>
                                    <span style={detailValueStyle}>{selectedCard.length} cm</span>
                                </div>
                                <div style={detailItemStyle}>
                                    <span style={detailLabelStyle}>Top Speed:</span>
                                    <span style={detailValueStyle}>{selectedCard.top_speed} km/h</span>
                                </div>
                                <div style={detailItemStyle}>
                                    <span style={detailLabelStyle}>0-100 km/h:</span>
                                    <span style={detailValueStyle}>{selectedCard.acceleration} s</span>
                                </div>
                                <div style={detailItemStyle}>
                                    <span style={detailLabelStyle}>First Acquired:</span>
                                    <span style={detailValueStyle}>{new Date(selectedCard.first_acquired || selectedCard.acquired_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Modal>
        </div>
    )
}