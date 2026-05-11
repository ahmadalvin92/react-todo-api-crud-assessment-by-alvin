import { useCallback, useEffect, useState } from 'react';
import {
  createTodo as createTodoRequest,
  deleteTodo as deleteTodoRequest,
  fetchTodos,
  updateTodo as updateTodoRequest,
} from '../services/todoApi';

function mapApiTodo(todo) {
  return {
    id: todo.id,
    title: todo.judul,
    description: todo.catatan,
    status: todo.status === 'selesai' ? 'done' : 'pending',
    createdDate: todo.tanggal_dibuat,
    updatedDate: todo.tanggal_diubah,
  };
}

export function useApiTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const loadTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const data = await fetchTodos();
      setTodos(data.map(mapApiTodo));
    } catch {
      setError('Data database belum bisa dibuka. Coba muat ulang.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  async function createApiTodo(payload) {
    try {
      setActionLoading(true);
      setError('');
      setMessage('');

      const createdTodo = await createTodoRequest(payload);
      const newTodo = mapApiTodo(createdTodo);

      setTodos((currentTodos) => [newTodo, ...currentTodos]);
      setMessage('Todo sudah ditambahkan ke database.');
      return true;
    } catch {
      setError('Todo belum bisa ditambahkan ke database. Coba lagi.');
      return false;
    } finally {
      setActionLoading(false);
    }
  }

  async function updateApiTodo(todoId, payload) {
    try {
      setActionLoading(true);
      setError('');
      setMessage('');

      const updatedTodo = await updateTodoRequest(todoId, payload);

      setTodos((currentTodos) =>
        currentTodos.map((todo) =>
          todo.id === todoId
            ? {
                ...todo,
                ...mapApiTodo(updatedTodo),
              }
            : todo,
        ),
      );
      setMessage('Todo di database sudah diperbarui.');
      return true;
    } catch {
      setError('Todo belum bisa diperbarui. Coba lagi.');
      return false;
    } finally {
      setActionLoading(false);
    }
  }

  async function deleteApiTodo(todoId) {
    try {
      setActionLoading(true);
      setError('');
      setMessage('');

      await deleteTodoRequest(todoId);
      setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== todoId));
      setMessage('Todo sudah dihapus dari database.');
      return true;
    } catch {
      setError('Todo belum bisa dihapus. Coba lagi.');
      return false;
    } finally {
      setActionLoading(false);
    }
  }

  return {
    todos,
    loading,
    actionLoading,
    error,
    message,
    createApiTodo,
    updateApiTodo,
    deleteApiTodo,
    reloadTodos: loadTodos,
  };
}
