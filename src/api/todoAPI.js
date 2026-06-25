const getToken = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

// загрузка задач
export const fetchTodos = async (filterType = "all") => {
  try {
    let url = `${import.meta.env.VITE_URL}/todos?page=1&limit=10`;
    if (filterType == "completed") {
      url += "&completed=true"; // https://todo-redev.onrender.com/api/todos?completed=true&page=1&limit=10
    } else if (filterType == "active") {
      url += "&completed=false";
    }

    const response = await fetch(url, {
      method: "GET",
      headers: getToken(),
    });

    if (!response.ok) {
      throw new Error("Ошибка загрузки");
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.log(error);
  }
};

// удаление задачи
export const deleteTask = async (taskId) => {
  const response = await fetch(`${import.meta.env.VITE_URL}/todos/${taskId}`, {
    method: "DELETE",
    headers: getToken(),
  });
  if (!response.ok) {
    throw new Error("Ошибка удаления");
  }
  return true;
};

// изменение статуса задачи
export const toggleTask = async (taskId) => {
  const response = await fetch(
    `${import.meta.env.VITE_URL}/todos/${taskId}/toggle`,
    {
      method: "PATCH",
      headers: getToken(),
    },
  );

  if (!response.ok) {
    throw new Error("Ошибка изменения статуса");
  }

  const data = await response.json();
  return data.data;
};

export const createTask = async (task) => {
  const response = await fetch(`${import.meta.env.VITE_URL}/todos`, {
    method: "POST",
    headers: {
      ...getToken(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Ошибка изменения статуса");
  }

  const data = await response.json();
  return data.data;
};
