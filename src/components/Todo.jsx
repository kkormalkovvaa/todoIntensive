import { useEffect, useState } from "react"
import InputTask from "./InputTask"
import TodoList from "./Todo-list"
import SelectTodo from "./SelectTodo"
const Todo = () => {
    const [tasks, setTasks] = useState([])
    const [filter, setFilter] = useState('all')

    // useEffect (()=>{
    //     const fetchTodo = async ()=>{
    //         const response = await fetch("https://todo-redev.onrender.com/api/todos?completed=false&page=1&limit=10", 
    //             {
    //                 method: 'GET',
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.getItem('token')}`
    //                 }
    //             }
    //         )
    //         const data = await response.json()
    //         // console.log(localStorage.getItem('token'))
    //         console.log(data)
    //         setTasks(data.data)
    //     }
    //     fetchTodo()
    // },[])

    const fetchSelect = async(filterType = filter) => {
        try {
            let url = "https://todo-redev.onrender.com/api/todos?page=1&limit=10"
            if(filterType == 'completed') {
                url += '&completed=true' // https://todo-redev.onrender.com/api/todos?completed=true&page=1&limit=10
            } else if (filterType == 'active') {
                url += '&completed=false'
            }

            console.log('url ', url);
            

            const responseSelect = await fetch(url, 
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            const data = await responseSelect.json()
            console.log(data)
            setTasks(data.data || [])
        } catch(error) {}
    }

    useEffect(() => {
        fetchSelect(filter)
    },[filter])

    const deleteTask = async (taskId) => {
        try {
            const deleteResponse = await fetch(`https://todo-redev.onrender.com/api/todos/${taskId}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            if(deleteResponse.ok) {
                setTasks(tasks => tasks.filter(task => task.id !== taskId))
            }
        } catch (error) {
            console.log('ошибка: ',error)
        }
    }

    const toggleTask = async (taskId, isCompleted) => {
        try {
            const toggleResponse = await fetch(`https://todo-redev.onrender.com/api/todos/${taskId}/toggle`,
                {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            if(toggleResponse.ok) {
                setTasks(tasks.map(task => {
                        if(task.id === taskId){
                            return {...task, completed: !isCompleted}
                        }
                        return task
                    })
                )
            }
        } catch(error) {}
    }
    
    return ( 
        <div>
            <InputTask setTasks={setTasks} />
            <SelectTodo onFilterChange={setFilter} currentFilter={filter}/>
            <TodoList tasks={tasks} setTasks={setTasks} onDeleteTask={deleteTask} onToggleTask={toggleTask} />
        </div>
    )
}

export default Todo
