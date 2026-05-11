function formatDate(dateValue) {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateValue));
}

function TodoItem({ onDelete, onEdit, onToggleStatus, todo }) {
  const isDone = todo.status === 'done';

  return (
    <article className="todo-item">
      <div className="todo-content">
        <div className="todo-title-row">
          <h3>{todo.title}</h3>
          <span className={isDone ? 'status-badge done' : 'status-badge pending'}>
            {isDone ? 'Selesai' : 'Belum selesai'}
          </span>
        </div>
        <p>{todo.description}</p>
        <small>Dibuat {formatDate(todo.createdDate)}</small>
      </div>

      <div className="todo-actions">
        <button className="secondary-button compact" onClick={() => onEdit(todo)} type="button">
          Edit
        </button>
        <button
          className="secondary-button compact"
          onClick={() => onToggleStatus(todo.id)}
          type="button"
        >
          {isDone ? 'Belum selesai' : 'Tandai selesai'}
        </button>
        <button className="danger-button compact" onClick={() => onDelete(todo.id)} type="button">
          Hapus
        </button>
      </div>
    </article>
  );
}

export default TodoItem;
