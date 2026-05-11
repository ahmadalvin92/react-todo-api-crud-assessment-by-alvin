import ApiTodoTable from '../components/ApiTodoTable';
import { useApiTodos } from '../hooks/useApiTodos';

function ApiTodoPage() {
  const { todos, loading, error, reloadTodos } = useApiTodos();

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
      {loading ? <div className="loading-state">Memuat data todo...</div> : <ApiTodoTable todos={todos} />}
    </div>
  );
}

export default ApiTodoPage;
