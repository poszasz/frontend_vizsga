import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from "react-router-dom"
import logo from '../assets/carcardsLogo.png'
import marketImage from '../assets/market-image.png'
import mycardsImage from '../assets/mycards-image.png'
import openpacksImage from '../assets/openpacks-image.png'
import { checkAuth, logout } from "../api"
import Navbar from "../components/Navbar"
import LoadingSpinner from "../components/LoadingSpinner"
import MainMenuButton from "../components/MainMenuButton"

export default function MainPage() {
    const navigation = useNavigate()
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
            setLoading(false)
        }
        verifyAuth()
    }, [navigation])

    const handleLogout = async () => {
        await logout()
        navigation('/')
    }

    if (loading) return <LoadingSpinner />

    return (
        <div className="vh-100 d-flex flex-column">
            <Navbar title="Car Cards" user={user} onLogout={handleLogout} />

            <div className="flex-grow-1 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#f5f5f5' }}>
                <div className="text-center">
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
                        <MainMenuButton 
                            image={marketImage}
                            alt="Market"
                            text="MARKET"
                            onClick={() => navigation('/market')}
                        />
                        <MainMenuButton 
                            image={openpacksImage}
                            alt="Open Packs"
                            text="OPEN PACKS"
                            onClick={() => navigation('/openpacks')}
                        />
                        <MainMenuButton 
                            image={mycardsImage}
                            alt="My Cards"
                            text="MY CARDS"
                            onClick={() => navigation('/mycards')}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}