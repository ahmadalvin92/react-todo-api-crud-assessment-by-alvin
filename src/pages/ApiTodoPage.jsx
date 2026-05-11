import { useEffect, useMemo, useState } from 'react';
import ApiTodoTable from '../components/ApiTodoTable';
import FilterTabs from '../components/FilterTabs';
import PaginationControls from '../components/PaginationControls';
import SearchInput from '../components/SearchInput';
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
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const filteredTodos = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    return todos.filter((todo) => {
      const matchKeyword = todo.title.toLowerCase().includes(keyword);
      const matchStatus = activeFilter === 'all' || todo.status === activeFilter;

      return matchKeyword && matchStatus;
    });
  }, [activeFilter, searchKeyword, todos]);

  const totalPages = Math.max(1, Math.ceil(filteredTodos.length / limit));
  const paginatedTodos = useMemo(() => {
    const startIndex = (currentPage - 1) * limit;
    return filteredTodos.slice(startIndex, startIndex + limit);
  }, [currentPage, filteredTodos, limit]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, limit, searchKeyword]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

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
    const isConfirmed = window.confirm('Yakin mau hapus todo dari database?');

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
          <p className="section-label">Tersimpan di MySQL</p>
          <h2>Todo Database</h2>
          <p className="muted-text">
            Data pada bagian ini tersimpan di database MySQL dan bisa dilihat lewat phpMyAdmin.
          </p>
        </div>

        <button className="secondary-button" disabled={loading} onClick={reloadTodos} type="button">
          {loading ? 'Lagi dimuat...' : 'Muat ulang'}
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
          submitLabel={editingTodo ? 'Simpan' : 'Tambah Todo'}
        />

        <section className="todo-list-section" aria-label="Daftar todo database">
          {actionLoading && <div className="inline-loading">Sebentar, lagi diproses...</div>}
          {loading ? (
            <div className="loading-state">Lagi ambil data todo...</div>
          ) : (
            <>
              <div className="section-heading">
                <h3>Data Todo</h3>
                <span>
                  {filteredTodos.length} dari {todos.length} data
                </span>
              </div>

              <div className="todo-toolbar">
                <SearchInput
                  label="Cari todo"
                  onChange={setSearchKeyword}
                  placeholder="Cari judul todo"
                  value={searchKeyword}
                />
                <FilterTabs activeFilter={activeFilter} onChange={setActiveFilter} />
              </div>

              <ApiTodoTable
                emptyMessage="Belum ada todo yang cocok."
                onDelete={handleDeleteTodo}
                onEdit={setEditingTodo}
                onToggleStatus={handleToggleStatus}
                todos={paginatedTodos}
              />

              <PaginationControls
                currentPage={currentPage}
                limit={limit}
                onLimitChange={setLimit}
                onNext={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
                onPrevious={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                totalPages={totalPages}
              />
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default ApiTodoPage;
