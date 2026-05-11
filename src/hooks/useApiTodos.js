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
    title: todo.todo,
    description: `Todo dari DummyJSON untuk user #${todo.userId}.`,
    status: todo.completed ? 'done' : 'pending',
    createdDate: new Date().toISOString(),
    userId: todo.userId,
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

      const data = await fetchTodos({ limit: 10, skip: 0 });
      setTodos(data.todos.map(mapApiTodo));
    } catch {
      setError('Gagal memuat todo dari API.');
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
      const newTodo = {
        id: createdTodo.id,
        title: createdTodo.todo,
        description: payload.description,
        status: createdTodo.completed ? 'done' : 'pending',
        createdDate: new Date().toISOString(),
        userId: createdTodo.userId,
      };

      setTodos((currentTodos) => [newTodo, ...currentTodos]);
      setMessage('Todo API berhasil ditambahkan.');
      return true;
    } catch {
      setError('Gagal menambahkan todo API.');
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
                title: updatedTodo.todo,
                description: payload.description,
                status: updatedTodo.completed ? 'done' : 'pending',
              }
            : todo,
        ),
      );
      setMessage('Todo API berhasil diperbarui.');
      return true;
    } catch {
      setError('Gagal memperbarui todo API.');
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
      setMessage('Todo API berhasil dihapus.');
      return true;
    } catch {
      setError('Gagal menghapus todo API.');
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
