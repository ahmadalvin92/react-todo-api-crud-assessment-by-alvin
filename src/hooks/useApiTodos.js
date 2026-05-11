import { useCallback, useEffect, useState } from 'react';
import { fetchTodos } from '../services/todoApi';

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
  const [error, setError] = useState('');

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

  return {
    todos,
    loading,
    error,
    reloadTodos: loadTodos,
  };
}
