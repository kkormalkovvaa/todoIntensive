import { useState } from "react"
import localStorageHelpers from "../../helpers/localStorageHelpers"

const InputTask = ({setTasks}) => {
    const [task, setTask] = useState({title: '', description: ''})

    const handleChange = (e) => {
        setTask((task) => ({...task, [e.target.name]: e.target.value}))
    }

    const createTask = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/todos`, 
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${localStorageHelpers.get()}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(task)
                }

            )
            const data = await response.json()
            console.log(data)
            setTasks(tasks => [data, ...tasks])
        } catch (error) {}

        setTask({title: '', description: ''})
    }

    return (
        <div className="addTask-block">
            <h1>Добавьте задачу</h1>
            <input placeholder="Введите заголовок задачи" className="addTask-input" name="title" value={task.title} onChange={handleChange}/>
            <input placeholder="Введите описание задачи" className="addTask-input" name="description" value={task.description} onChange={handleChange} />
            <button className="addTask-btn" onClick={createTask}>Отправить</button>
        </div>
    )
}

export default InputTask