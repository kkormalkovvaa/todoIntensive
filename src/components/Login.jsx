import { useState } from "react"
import { useNavigate } from "react-router"

const Login = () => {
    const [user, setUser] = useState({email: '', password: ''})
    const navigate = useNavigate()

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const loginFetch = async () => {
        try {
            const response = await fetch('https://todo-redev.onrender.com/api/auth/login',
                {
                    method: 'POST',
                    headers: {
                        accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                }
            )
            const data = await response.json()
            localStorage.setItem('token', data.access_token)
            console.log(data.access_token)
        }catch (error) {}
        setUser({email: '', password: ''})
        navigate('/todo')
    }


    return (
        <div className="login-block">
            <h1>Войти в аккаунт</h1>
            <input className="login-input" placeholder="Введите email" value={user.email} name="email" onChange={handleChange} />
            <input className="login-input" placeholder="Введите password" value={user.password} name="password" onChange={handleChange} />
            <button className="login-btn" onClick={loginFetch}>Войти</button>
        </div>
    )
}

export default Login