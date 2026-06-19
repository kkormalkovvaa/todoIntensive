import { useState } from "react"
import { useNavigate } from "react-router"
import localStorageHelpers from "../../helpers/localStorageHelpers"
import loginFetch from "../../api/loginFetch"


const Login = () => {
    const [user, setUser] = useState({email: '', password: ''})
    const navigate = useNavigate()

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }
    const handleClick = () => {
        navigate('/register')
    }

    // const loginFetch = async () => {
    //     try {
    //         const response = await fetch(`${import.meta.env.VITE_URL}/auth/login`,
    //             {
    //                 method: 'POST',
    //                 headers: {
    //                     accept: 'application/json',
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify(user)
    //             }
    //         )
    //         const data = await response.json()
    //         localStorageHelpers.set(data.access_token)
    //         console.log(data.access_token)
    //     }catch (error) {}
    //     setUser({email: '', password: ''})
    //     navigate('/todo')
    // }

    const handleLogin = async() => {
        
    }



    return (
        <div className="login-block">
            <h1>Войти в аккаунт</h1>
            <input className="login-input" placeholder="Введите email" value={user.email} name="email" onChange={handleChange} />
            <input className="login-input" placeholder="Введите password" value={user.password} name="password" onChange={handleChange} />
            <button className="login-btn" onClick={loginFetch}>Войти</button>
            <div className="to-register">
                <p>Если ты еще не зарегистрирован, можешь это сделать</p>
                <button className="to-register-btn" onClick={handleClick}>Зарегистрироваться</button>
            </div>
        </div>
    )
}

export default Login