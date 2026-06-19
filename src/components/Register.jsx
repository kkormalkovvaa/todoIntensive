import { useState } from "react"

const Register = () => {
    const [user, setUser] = useState({email: '', password: '', name: ''})
    const [isRegister, setIsRegister] = useState(false)

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const func = async () => {
        try {
                const response = await fetch("https://todo-redev.onrender.com/api/auth/register", {
                    method: 'POST',
                    headers:
                    {
                        accept: 'application/json',
                        "Content-Type": 'application/json'
                    },
                body:JSON.stringify(user)
            })
            const userInfo = await response.json()
            localStorage.setItem('token', userInfo.access_token)
            console.log(userInfo.access_token)
            setIsRegister(prev => !prev)
        }catch (error) {}

    }
    return (
        <div className="register-block"> 
            <div>
                <h1>Регистрация</h1>
                <input placeholder="Введите email" className="register-input" value={user.email} name="email" onChange={handleChange} />
                <input placeholder="Введите пароль" className="register-input" value={user.password} name="password" onChange={handleChange} />
                <input placeholder="Введите имя" className="register-input" value={user.name} name="name" onChange={handleChange} />
                <button className="register-btn" onClick={func}>Зарегистрироваться</button>
            </div>
        </div>
    )
}

export default Register