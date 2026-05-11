import TodoItem from './TodoItem';

function TodoList({
  emptyMessage = 'Belum ada todo.',
  onDelete,
  onEdit,
  onToggleStatus,
  todos,
}) {
  if (todos.length === 0) {
    return <div className="empty-state">{emptyMessage}</div>;
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggleStatus={onToggleStatus}
          todo={todo}
        />
      ))}
    </div>
  );
}

export default TodoList;
