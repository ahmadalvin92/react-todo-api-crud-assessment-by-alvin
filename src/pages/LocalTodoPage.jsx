import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import { useLocalTodos } from '../hooks/useLocalTodos';

function LocalTodoPage() {
  const { todos, addTodo } = useLocalTodos();

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
        <TodoForm onSubmit={addTodo} submitLabel="Tambah Todo" />

        <section className="todo-list-section" aria-label="Daftar todo lokal">
          <div className="section-heading">
            <h3>Daftar Todo</h3>
            <span>{todos.length} item</span>
          </div>
          <TodoList todos={todos} />
        </section>
      </div>
    </div>
  );
}

export default LocalTodoPage;
