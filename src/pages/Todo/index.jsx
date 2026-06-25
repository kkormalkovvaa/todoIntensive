import { useEffect, useState } from "react"
import InputTask from "../../components/InputTask"
import TodoList from "../../components/TodoList"
import SelectTodo from "../../components/SelectTodo"
import localStorageHelpers from "../../helpers/localStorageHelpers"
import { createTask, deleteTask, fetchTodos, toggleTask } from "../../api/todoAPI"
const Todo = () => {
    const [tasks, setTasks] = useState([])
    const [filter, setFilter] = useState('all')
    const [task, setTask] = useState({title: '', description: ''})

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

    // const fetchSelect = async(filterType = filter) => {
    //     try {
    //         let url = `${import.meta.env.VITE_URL}/todos?page=1&limit=10`
    //         if(filterType == 'completed') {
    //             url += '&completed=true' // https://todo-redev.onrender.com/api/todos?completed=true&page=1&limit=10
    //         } else if (filterType == 'active') {
    //             url += '&completed=false'
    //         }

    //         console.log('url ', url)

    //         const responseSelect = await fetch(url, 
    //             {
    //                 method: 'GET',
    //                 headers: {
    //                     Authorization: `Bearer ${localStorageHelpers.get()}`
    //                 }
    //             }
    //         )

    //         const data = await responseSelect.json()
    //         console.log(data)
    //         setTasks(data.data || [])
    //     } catch(error) {}
    // }


    /*загрузка задач*/
    const loadTodos = async(filterType = filter) => {
        const data = await fetchTodos(filterType)
        setTasks(data)
    }

    useEffect(() => {
        loadTodos(filter)
    },[filter])

    /*удаление задачи*/
    const handleDeleteTask = async(taskId) => {
        try {
            await deleteTask(taskId)
            setTasks(prev=> prev.filter(task => task.id !== taskId)) 
        } catch(error) {
            console.log(error)
        }
    }

    // const deleteTask = async (taskId) => {
    //     try {
    //         const deleteResponse = await fetch(`${import.meta.env.VITE_URL}/todos/${taskId}`,
    //             {
    //                 method: 'DELETE',
    //                 headers: {
    //                     Authorization: `Bearer ${localStorageHelpers.get()}`
    //                 }
    //             }
    //         )
    //         if(deleteResponse.ok) {
    //             setTasks(tasks => tasks.filter(task => task.id !== taskId))
    //         }
    //     } catch (error) {
    //         console.log('ошибка: ',error)
    //     }
    // }

    /** изменение статуса*/
    const handleToggleTask = async(taskId, isCompleted) => {
        try {
            const updateStatus = await toggleTask(taskId)
            setTasks(tasks.map(task => task.id === taskId ? {...task, completed: !isCompleted} : task))
        } catch(error) {
            console.log(error)
        }
    }

    // const toggleTask = async (taskId, isCompleted) => {
    //     try {
    //         const toggleResponse = await fetch(`${import.meta.env.VITE_URL}/todos/${taskId}/toggle`,
    //             {
    //                 method: 'PATCH',
    //                 headers: {
    //                     Authorization: `Bearer ${localStorageHelpers.get()}`
    //                 }
    //             }
    //         )
    //         if(toggleResponse.ok) {
    //             setTasks(tasks.map(task => {
    //                     if(task.id === taskId){
    //                         return {...task, completed: !isCompleted}
    //                     }
    //                     return task
    //                 })
    //             )
    //         }
    //     } catch(error) {}
    // }
    

    /*изменение фильтра*/
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter)
    }

    /*добавление задачи */
    const handleCreateTask = async(taskData) => {
        try {
            const newTask = await createTask(taskData)
            setTasks(tasks => [data, ...tasks])
        } catch(error) {
            console.log(error)
        }
        setTasks({title: '', description: ''})
    }

    return ( 
        <div>
            <InputTask setTasks={setTasks} onAddTask={handleCreateTask} />
            <SelectTodo onFilterChange={handleFilterChange} currentFilter={filter}/>
            <TodoList tasks={tasks} setTasks={setTasks} onDeleteTask={handleDeleteTask} onToggleTask={handleToggleTask} />
        </div>
    )
}

export default Todo
