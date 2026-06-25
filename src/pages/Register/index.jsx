import { useState } from "react"
import { useNavigate } from "react-router"
import localStorageHelpers from "../../helpers/localStorageHelpers"
import { registerUser } from "../../api/registerUser"

const Register = () => {
    const [user, setUser] = useState({email: '', password: '', name: ''})
    const [isRegister, setIsRegister] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }
    const handleLoginClick = () => {
        navigate('/login')
    }

    const handleRegister = async() => {
        try {
            const data = await registerUser(user)
            localStorageHelpers.set(data.access_token)
            setUser({email: '', password: '', name: ''})
            navigate('/todo')
        } catch(error) {
            console.log(error)
        }
    }

    // const func = async () => {
    //     try {
    //             const response = await fetch(`${import.meta.env.VITE_URL}/auth/register`, {
    //                 method: 'POST',
    //                 headers:
    //                 {
    //                     accept: 'application/json',
    //                     "Content-Type": 'application/json'
    //                 },
    //             body:JSON.stringify(user)
    //         })
    //         const userInfo = await response.json()
    //         localStorageHelpers.set(userInfo.access_token)
    //         console.log(userInfo.access_token)
    //         setIsRegister(prev => !prev)
    //     }catch (error) {}

    // }

    return (
        <div className="register-block"> 
            <div>
                <h1>Регистрация</h1>
                <input placeholder="Введите email" className="register-input" value={user.email} name="email" onChange={handleChange} />
                <input placeholder="Введите пароль" className="register-input" value={user.password} name="password" onChange={handleChange} />
                <input placeholder="Введите имя" className="register-input" value={user.name} name="name" onChange={handleChange} />
                <button className="register-btn" onClick={handleRegister}>Зарегистрироваться</button>
            </div>
            <div className="to-login">
                <p>Если у тебя уже есть аккаунт вводи пароль и смотри свои задачи</p>
                <button onClick={handleLoginClick} className="to-login-btn">Войти в аккаунт</button>
            </div>
        </div>
    )
}

export default Register