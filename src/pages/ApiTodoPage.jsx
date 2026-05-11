import { useState } from 'react';
import ApiTodoTable from '../components/ApiTodoTable';
import TodoForm from '../components/TodoForm';
import { useApiTodos } from '../hooks/useApiTodos';

function ApiTodoPage() {
  const {
    todos,
    loading,
    actionLoading,
    error,
    message,
    createApiTodo,
    updateApiTodo,
    deleteApiTodo,
    reloadTodos,
  } = useApiTodos();
  const [editingTodo, setEditingTodo] = useState(null);

  async function handleSubmitTodo(payload) {
    if (editingTodo) {
      const isSuccess = await updateApiTodo(editingTodo.id, payload);

      if (isSuccess) {
        setEditingTodo(null);
      }

      return;
    }

    await createApiTodo(payload);
  }

  async function handleDeleteTodo(todoId) {
    const isConfirmed = window.confirm('Hapus todo API ini?');

    if (isConfirmed) {
      const isSuccess = await deleteApiTodo(todoId);

      if (isSuccess) {
        setEditingTodo((currentTodo) => (currentTodo?.id === todoId ? null : currentTodo));
      }
    }
  }

  function handleToggleStatus(todo) {
    updateApiTodo(todo.id, {
      ...todo,
      status: todo.status === 'done' ? 'pending' : 'done',
    });
  }

  return (
    <div className="page-section">
      <div className="page-title-row">
        <div>
          <p className="section-label">Integrasi REST API</p>
          <h2>Todo API</h2>
          <p className="muted-text">
            Data todo diambil dari DummyJSON dengan loading state dan error handling.
          </p>
        </div>

        <button className="secondary-button" disabled={loading} onClick={reloadTodos} type="button">
          {loading ? 'Memuat...' : 'Reload Data'}
        </button>
      </div>

      {error && <div className="alert error-alert">{error}</div>}
      {message && <div className="alert success-alert">{message}</div>}

      <div className="todo-layout">
        <TodoForm
          initialValue={editingTodo}
          onCancel={editingTodo ? () => setEditingTodo(null) : undefined}
          onSubmit={handleSubmitTodo}
          showStatus
          submitLabel={editingTodo ? 'Simpan Todo API' : 'Tambah Todo API'}
        />

        <section className="todo-list-section" aria-label="Daftar todo API">
          {actionLoading && <div className="inline-loading">Memproses perubahan...</div>}
          {loading ? (
            <div className="loading-state">Memuat data todo...</div>
          ) : (
            <ApiTodoTable
              onDelete={handleDeleteTodo}
              onEdit={setEditingTodo}
              onToggleStatus={handleToggleStatus}
              todos={todos}
            />
          )}
        </section>
      </div>
    </div>
  );
}

export default ApiTodoPage;
