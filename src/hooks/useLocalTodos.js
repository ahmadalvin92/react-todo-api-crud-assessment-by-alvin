import { useEffect, useState } from 'react';
import { getStorageData, setStorageData } from '../utils/localStorage';

const STORAGE_KEY = 'react-todo-local-data';

export function useLocalTodos() {
  const [todos, setTodos] = useState(() => getStorageData(STORAGE_KEY, []));

  useEffect(() => {
    setStorageData(STORAGE_KEY, todos);
  }, [todos]);

  function addTodo(payload) {
    const newTodo = {
      id: crypto.randomUUID(),
      title: payload.title.trim(),
      description: payload.description.trim(),
      status: 'pending',
      createdDate: new Date().toISOString(),
    };

    setTodos((currentTodos) => [newTodo, ...currentTodos]);
  }

  return {
    todos,
    addTodo,
  };
}
