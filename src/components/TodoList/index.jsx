import { useEffect, useState } from "react"

const TodoList = ({tasks, setTasks, onDeleteTask, onToggleTask}) => {

    return ( 
        <div className="todo-list-block">
            <h1>Ваши задачи</h1>
            <ul className="todo-items-list">{tasks && tasks.map((task)=> (
                <li className={`todo-item ${task.completed ? 'completed' : ''}`} key={task.id}>
                    <input type="checkbox" className="todo-checkbox" checked={task.completed || false} onChange={() => onToggleTask(task.id, task.completed)} />
                    <p className="todo-title">{task.title}</p>
                    <span>{task.description}</span>
                    <button className="delete-task-btn" onClick={() => onDeleteTask(task.id)}>Удалить</button>
                </li>))}
            </ul>
        </div>
    )
}

export default TodoList
