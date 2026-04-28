import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from "react-router-dom"
import { checkAuth, logout } from "../api"
import Navbar from "../components/Navbar"
import LoadingSpinner from "../components/LoadingSpinner"
import MainMenuButton from "../components/MainMenuButton"
import marketImage from '../assets/market-image.png'
import mycardsImage from '../assets/mycards-image.png'
import openpacksImage from '../assets/openpacks-image.png'
import '../index.css'

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
                <div className="container px-3 px-md-4">
                    <div className="row justify-content-center g-3 g-md-4">
                        
                        {/* Market gomb */}
                        <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center">
                            <MainMenuButton
                                image={marketImage}
                                alt="Market"
                                text="MARKET"
                                onClick={() => navigation('/market')}
                            />
                        </div>

                        {/* Open Packs gomb */}
                        <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center">
                            <MainMenuButton
                                image={openpacksImage}
                                alt="Open Packs"
                                text="OPEN PACKS"
                                onClick={() => navigation('/openpacks')}
                            />
                        </div>

                        {/* My Cards gomb */}
                        <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center">
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
        </div>
    )
}