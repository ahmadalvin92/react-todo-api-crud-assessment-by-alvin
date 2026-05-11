import { useState } from 'react';
import ApiTodoPage from './pages/ApiTodoPage';
import LocalTodoPage from './pages/LocalTodoPage';
import './styles.css';

const pages = {
  local: {
    label: 'Todo Lokal',
    component: <LocalTodoPage />,
  },
  api: {
    label: 'Todo API',
    component: <ApiTodoPage />,
  },
};

function App() {
  const [activePage, setActivePage] = useState('local');

  return (
    <main className="app-shell">
      <section className="app-header">
        <div>
          <p className="eyebrow">ReactJS Assessment</p>
          <h1>Aplikasi Todo CRUD</h1>
          <p className="header-description">
            Kelola todo lokal dan todo dari API dalam satu aplikasi sederhana.
          </p>
        </div>

        <nav className="page-nav" aria-label="Navigasi utama">
          {Object.entries(pages).map(([key, page]) => (
            <button
              className={activePage === key ? 'nav-button active' : 'nav-button'}
              key={key}
              onClick={() => setActivePage(key)}
              type="button"
            >
              {page.label}
            </button>
          ))}
        </nav>
      </section>

      <section className="content-panel">{pages[activePage].component}</section>
    </main>
  );
}

export default App;
