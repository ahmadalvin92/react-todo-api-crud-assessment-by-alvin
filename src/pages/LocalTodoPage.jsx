import { useMemo, useState } from 'react';
import FilterTabs from '../components/FilterTabs';
import SearchInput from '../components/SearchInput';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import { useDebounce } from '../hooks/useDebounce';
import { useLocalTodos } from '../hooks/useLocalTodos';

function LocalTodoPage() {
  const { todos, addTodo, updateTodo, toggleTodoStatus, deleteTodo } = useLocalTodos();
  const [editingTodo, setEditingTodo] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const debouncedKeyword = useDebounce(searchKeyword);
  const totalDone = todos.filter((todo) => todo.status === 'done').length;
  const totalPending = todos.length - totalDone;

  const filteredTodos = useMemo(() => {
    const keyword = debouncedKeyword.trim().toLowerCase();

    return todos.filter((todo) => {
      const matchKeyword = todo.title.toLowerCase().includes(keyword);
      const matchStatus = activeFilter === 'all' || todo.status === activeFilter;

      return matchKeyword && matchStatus;
    });
  }, [activeFilter, debouncedKeyword, todos]);

  function handleSubmitTodo(payload) {
    if (editingTodo) {
      updateTodo(editingTodo.id, payload);
      setEditingTodo(null);
      return;
    }

    addTodo(payload);
  }

  function handleDeleteTodo(todoId) {
    const isConfirmed = window.confirm('Yakin mau hapus todo ini?');

    if (isConfirmed) {
      deleteTodo(todoId);
      setEditingTodo((currentTodo) => (currentTodo?.id === todoId ? null : currentTodo));
    }
  }

  return (
    <div className="page-section">
      <div>
        <p className="section-label">Disimpan Lokal</p>
        <h2>Todo Lokal</h2>
        <p className="muted-text">
          Todo yang dibuat di halaman ini tetap tersimpan setelah halaman dimuat ulang.
        </p>
      </div>

      <div className="summary-grid">
        <article className="summary-card accent-blue">
          <span>Total</span>
          <strong>{todos.length}</strong>
        </article>
        <article className="summary-card accent-green">
          <span>Selesai</span>
          <strong>{totalDone}</strong>
        </article>
        <article className="summary-card accent-gold">
          <span>Belum selesai</span>
          <strong>{totalPending}</strong>
        </article>
      </div>

      <div className="todo-layout">
        <TodoForm
          initialValue={editingTodo}
          onCancel={editingTodo ? () => setEditingTodo(null) : undefined}
          onSubmit={handleSubmitTodo}
          showStatus={Boolean(editingTodo)}
          submitLabel={editingTodo ? 'Simpan' : 'Tambah Todo'}
        />

        <section className="todo-list-section" aria-label="Daftar todo lokal">
          <div className="section-heading">
            <h3>Daftar Todo</h3>
            <span>
              {filteredTodos.length} dari {todos.length} data
            </span>
          </div>

          <div className="todo-toolbar">
            <SearchInput
              onChange={setSearchKeyword}
              placeholder="Cari judul todo"
              value={searchKeyword}
            />
            <FilterTabs activeFilter={activeFilter} onChange={setActiveFilter} />
          </div>

          <TodoList
            emptyMessage="Belum ada todo yang cocok."
            onDelete={handleDeleteTodo}
            onEdit={setEditingTodo}
            onToggleStatus={toggleTodoStatus}
            todos={filteredTodos}
          />
        </section>
      </div>
    </div>
  );
}

export default LocalTodoPage;
