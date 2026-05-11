function ApiTodoTable({ todos }) {
  if (todos.length === 0) {
    return <div className="empty-state">Data todo API belum tersedia.</div>;
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApiTodoTable;
