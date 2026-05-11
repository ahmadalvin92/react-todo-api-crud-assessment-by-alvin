function formatDate(dateValue) {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateValue));
}

function TodoItem({ todo }) {
  const isDone = todo.status === 'done';

  return (
    <article className="todo-item">
      <div className="todo-content">
        <div className="todo-title-row">
          <h3>{todo.title}</h3>
          <span className={isDone ? 'status-badge done' : 'status-badge pending'}>
            {isDone ? 'Selesai' : 'Pending'}
          </span>
        </div>
        <p>{todo.description}</p>
        <small>Dibuat: {formatDate(todo.createdDate)}</small>
      </div>
    </article>
  );
}

export default TodoItem;
