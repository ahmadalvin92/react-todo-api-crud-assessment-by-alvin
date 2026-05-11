function ApiTodoTable({
  emptyMessage = 'Data todo API belum tersedia.',
  onDelete,
  onEdit,
  onToggleStatus,
  todos,
}) {
  if (todos.length === 0) {
    return <div className="empty-state">{emptyMessage}</div>;
  }

  return (
    <div className="table-wrapper">
      <table className="todo-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Todo</th>
            <th>User</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>#{todo.id}</td>
              <td>{todo.title}</td>
              <td>User {todo.userId}</td>
              <td>
                <span className={todo.status === 'done' ? 'status-badge done' : 'status-badge pending'}>
                  {todo.status === 'done' ? 'Selesai' : 'Pending'}
                </span>
              </td>
              <td>
                <div className="table-actions">
                  <button className="secondary-button compact" onClick={() => onEdit(todo)} type="button">
                    Edit
                  </button>
                  <button
                    className="secondary-button compact"
                    onClick={() => onToggleStatus(todo)}
                    type="button"
                  >
                    {todo.status === 'done' ? 'Pending' : 'Selesai'}
                  </button>
                  <button
                    className="danger-button compact"
                    onClick={() => onDelete(todo.id)}
                    type="button"
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApiTodoTable;
