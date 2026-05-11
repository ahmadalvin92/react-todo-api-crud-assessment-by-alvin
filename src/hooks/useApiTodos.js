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
    description: `Todo dari DummyJSON, punya user #${todo.userId}.`,
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

      const data = await fetchTodos({ limit: 30, skip: 0 });
      setTodos(data.todos.map(mapApiTodo));
    } catch {
      setError('Data API lagi gagal dimuat. Coba muat ulang ya.');
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
      setMessage('Todo API sudah ditambahkan.');
      return true;
    } catch {
      setError('Todo API belum bisa ditambahkan. Coba lagi ya.');
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
      setMessage('Todo API sudah diperbarui.');
      return true;
    } catch {
      setError('Todo API belum bisa diperbarui. Coba lagi ya.');
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
      setMessage('Todo API sudah dihapus.');
      return true;
    } catch {
      setError('Todo API belum bisa dihapus. Coba lagi ya.');
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
