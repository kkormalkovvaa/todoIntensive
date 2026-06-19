const SelectTodo = ({onFilterChange, currentFilter='all'}) => {
    return(
        <div>
            <select className="filter-select" value={currentFilter} onChange={(e) => onFilterChange(e.target.value)}>
                <option value='all'>Все задачи</option>
                <option value='completed'>Выполнено</option>
                <option value='active'>Не выполнено</option>
            </select>
        </div>
    )
}

export default SelectTodo