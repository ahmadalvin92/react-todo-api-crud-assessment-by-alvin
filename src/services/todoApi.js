import axios from 'axios';

const todoApiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
});

// Semua request todo API dikumpulkan di sini agar component tetap fokus ke UI.
export async function fetchTodos({ limit = 10, skip = 0 } = {}) {
  const response = await todoApiClient.get('/todos', {
    params: { limit, skip },
  });

  return response.data;
}

export async function createTodo(payload) {
  const response = await todoApiClient.post('/todos/add', {
    todo: payload.title,
    completed: payload.status === 'done',
    userId: 1,
  });

  return response.data;
}

export async function updateTodo(todoId, payload) {
  const response = await todoApiClient.put(`/todos/${todoId}`, {
    todo: payload.title,
    completed: payload.status === 'done',
  });

  return response.data;
}

export async function deleteTodo(todoId) {
  const response = await todoApiClient.delete(`/todos/${todoId}`);

  return response.data;
}
