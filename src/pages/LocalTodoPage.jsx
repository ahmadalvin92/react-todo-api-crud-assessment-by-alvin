import { useMemo, useState } from 'react';
import FilterTabs from '../components/FilterTabs';
import SearchInput from '../components/SearchInput';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import { useLocalTodos } from '../hooks/useLocalTodos';

function LocalTodoPage() {
  const { todos, addTodo, updateTodo, toggleTodoStatus, deleteTodo } = useLocalTodos();
  const [editingTodo, setEditingTodo] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredTodos = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    return todos.filter((todo) => {
      const matchKeyword = todo.title.toLowerCase().includes(keyword);
      const matchStatus = activeFilter === 'all' || todo.status === activeFilter;

      return matchKeyword && matchStatus;
    });
  }, [activeFilter, searchKeyword, todos]);

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
        <p className="section-label">Disimpan di Browser</p>
        <h2>Todo Lokal</h2>
        <p className="muted-text">
          Todo yang kamu buat di sini tetap ada setelah halaman direfresh.
        </p>
      </div>

      <div className="todo-layout">
        <TodoForm
          initialValue={editingTodo}
          onCancel={editingTodo ? () => setEditingTodo(null) : undefined}
          onSubmit={handleSubmitTodo}
          showStatus={Boolean(editingTodo)}
          submitLabel={editingTodo ? 'Simpan Editan' : 'Tambah Todo'}
        />

        <section className="todo-list-section" aria-label="Daftar todo lokal">
          <div className="section-heading">
            <h3>Todo Kamu</h3>
            <span>
              {filteredTodos.length} dari {todos.length} item
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
