import axios from 'axios';

const todoApiClient = axios.create({
  baseURL: 'http://127.0.0.1:3001/api',
  timeout: 10000,
});

// Semua request database todo dikumpulkan di sini agar component tetap fokus ke UI.
export async function fetchTodos() {
  const response = await todoApiClient.get('/todo');

  return response.data.data;
}

export async function createTodo(payload) {
  const response = await todoApiClient.post('/todo', {
    judul: payload.title,
    catatan: payload.description,
    status: payload.status === 'done' ? 'selesai' : 'belum_selesai',
  });

  return response.data.data;
}

export async function updateTodo(todoId, payload) {
  const response = await todoApiClient.put(`/todo/${todoId}`, {
    judul: payload.title,
    catatan: payload.description,
    status: payload.status === 'done' ? 'selesai' : 'belum_selesai',
  });

  return response.data.data;
}

export async function deleteTodo(todoId) {
  const response = await todoApiClient.delete(`/todo/${todoId}`);

  return response.data;
}
