import { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import TextBox from "../components/TextBox"
import { login } from "../api"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"

export default function LoginPage() {
    const navigation = useNavigate()

    const [emailOrUsername, setEmailOrUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const buttonStyle = {
        width: '500px',
        padding: '17px 0',
        fontSize: '1.3rem',
        borderRadius: '30px',
        border: 'none',
        backgroundColor: '#3498db',
        color: 'white',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        opacity: loading ? 0.7 : 1
    }

    const textBoxStyle = {
        input: {
            backgroundColor: '#1a1a1a',
            color: 'white',
            border: '1px solid #444',
            borderRadius: '30px',
            padding: '15px 25px',
            fontSize: '1.1rem',
            width: '100%',
            transition: 'all 0.3s ease'
        },
        placeholder: { color: '#aaa' }
    }

    return (
        <div className="vh-100 d-flex flex-column">
            <Navbar title="Login" showBackButton={true} />

            <div className="flex-grow-1 d-flex justify-content-center align-items-center p-4">
                <div className="text-center" style={{ maxWidth: '600px', width: '100%' }}>
                    <h2 className="text-white mb-4" style={{ fontSize: '2rem', fontWeight: '300' }}>
                        Welcome Back!
                    </h2>

                    <div className="mb-4">
                        <TextBox
                            type={"text"}
                            placeholder={"Email or Username"}
                            value={emailOrUsername}
                            setValue={setEmailOrUsername}
                            inputStyle={textBoxStyle.input}
                            placeholderStyle={textBoxStyle.placeholder}
                        />
                    </div>

                    <div className="mb-5">
                        <TextBox
                            type={"password"}
                            placeholder={"Password"}
                            value={password}
                            setValue={setPassword}
                            inputStyle={textBoxStyle.input}
                            placeholderStyle={textBoxStyle.placeholder}
                        />
                    </div>

                    <div className="d-flex justify-content-center mb-4">
                        <button
                            style={buttonStyle}
                            onMouseEnter={(e) => {
                                if (!loading) {
                                    e.target.style.backgroundColor = '#2980b9'
                                    e.target.style.transform = 'scale(1.02)'
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!loading) {
                                    e.target.style.backgroundColor = '#3498db'
                                    e.target.style.transform = 'scale(1)'
                                }
                            }}
                            onClick={async () => {
                                if (!emailOrUsername || !password) {
                                    return alert("Please fill in all fields!")
                                }

                                setLoading(true)
                                const res = await login(emailOrUsername, password)

                                if (res.result) {
                                    alert("Successful login!")
                                    navigation('/main')
                                } else {
                                    alert(res.message || "Login failed!")
                                }
                                setLoading(false)
                            }}
                        >
                            {loading ? 'LOGGING IN...' : 'LOGIN'}
                        </button>
                    </div>

                    <div className="text-center">
                        <span style={{ color: '#ccc' }}>Don't have an account? </span>
                        <button
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#5dade2',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                textDecoration: 'underline',
                                padding: 0
                            }}
                            onClick={() => navigation('/registration')}
                        >
                            Sign up here
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}