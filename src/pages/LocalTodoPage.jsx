import { useState } from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import { useLocalTodos } from '../hooks/useLocalTodos';

function LocalTodoPage() {
  const { todos, addTodo, updateTodo, toggleTodoStatus, deleteTodo } = useLocalTodos();
  const [editingTodo, setEditingTodo] = useState(null);

  function handleSubmitTodo(payload) {
    if (editingTodo) {
      updateTodo(editingTodo.id, payload);
      setEditingTodo(null);
      return;
    }

    addTodo(payload);
  }

  function handleDeleteTodo(todoId) {
    const isConfirmed = window.confirm('Hapus todo ini?');

    if (isConfirmed) {
      deleteTodo(todoId);
      setEditingTodo((currentTodo) => (currentTodo?.id === todoId ? null : currentTodo));
    }
  }

  return (
    <div className="page-section">
      <div>
        <p className="section-label">Penyimpanan Browser</p>
        <h2>Todo Lokal</h2>
        <p className="muted-text">
          Tambahkan todo yang tersimpan di LocalStorage dan tetap tersedia setelah halaman
          dimuat ulang.
        </p>
      </div>

      <div className="todo-layout">
        <TodoForm
          initialValue={editingTodo}
          onCancel={editingTodo ? () => setEditingTodo(null) : undefined}
          onSubmit={handleSubmitTodo}
          showStatus={Boolean(editingTodo)}
          submitLabel={editingTodo ? 'Simpan Perubahan' : 'Tambah Todo'}
        />

        <section className="todo-list-section" aria-label="Daftar todo lokal">
          <div className="section-heading">
            <h3>Daftar Todo</h3>
            <span>{todos.length} item</span>
          </div>
          <TodoList
            onDelete={handleDeleteTodo}
            onEdit={setEditingTodo}
            onToggleStatus={toggleTodoStatus}
            todos={todos}
          />
        </section>
      </div>
    </div>
  );
}

export default LocalTodoPage;
