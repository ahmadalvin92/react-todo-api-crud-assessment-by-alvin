import { useEffect, useState } from 'react';
import ApiTodoPage from './pages/ApiTodoPage';
import LocalTodoPage from './pages/LocalTodoPage';
import { getStorageData, setStorageData } from './utils/localStorage';
import './styles.css';

const THEME_KEY = 'tema-aplikasi-todo';

const pages = {
  local: {
    label: 'Todo Lokal',
    component: <LocalTodoPage />,
  },
  api: {
    label: 'Todo Database',
    component: <ApiTodoPage />,
  },
};

function App() {
  const [activePage, setActivePage] = useState('local');
  const [isDarkMode, setIsDarkMode] = useState(() => getStorageData(THEME_KEY, false));

  useEffect(() => {
    setStorageData(THEME_KEY, isDarkMode);
  }, [isDarkMode]);

  return (
    <main className={isDarkMode ? 'app-shell theme-dark' : 'app-shell'}>
      <section className="app-header">
        <div className="brand-block">
          <div className="brand-mark" aria-hidden="true">
            AA
          </div>
          <div>
            <p className="eyebrow">PT. ATRIA ARTHA PERSADA</p>
            <h1>Aplikasi Todo</h1>
            <p className="header-description">
              Technical test Fullstack WEB, Mobile, API untuk Ahmad Alvin Griffin.
            </p>
          </div>
        </div>

        <div className="header-actions">
          <button className="theme-button" onClick={() => setIsDarkMode((value) => !value)} type="button">
            {isDarkMode ? 'Mode terang' : 'Mode gelap'}
          </button>

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
        </div>
      </section>

      <section className="hero-panel">
        <div>
          <p className="hero-kicker">ReactJS Todo CRUD Assessment</p>
          <h2>CRUD lokal dan database dalam satu dashboard.</h2>
          <p>
            Dibuat dengan struktur folder rapi, komponen reusable, custom hook, service Axios,
            validasi form, loading state, error handling, pencarian, filter, dan pagination.
          </p>
        </div>

        <div className="hero-grid" aria-label="Ringkasan fitur">
          <span>React + Vite</span>
          <span>MySQL</span>
          <span>LocalStorage</span>
          <span>Responsive UI</span>
        </div>
      </section>

      <section className="content-panel">{pages[activePage].component}</section>
    </main>
  );
}

export default App;
