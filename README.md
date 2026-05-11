# React Todo API CRUD Assessment

Aplikasi Todo CRUD berbasis ReactJS + Vite untuk technical test frontend. Aplikasi ini memiliki dua mode utama: Todo Lokal dengan LocalStorage dan Todo API dengan integrasi DummyJSON.

## Fitur Aplikasi

- Todo Lokal dengan fitur tambah, tampil, edit, ubah status, hapus, search, dan filter.
- Todo Lokal tersimpan di LocalStorage sehingga data tidak hilang setelah refresh.
- Todo API dengan fitur fetch data, create, update, delete, search, filter, dan pagination.
- Loading state, error handling, serta pesan sukses/error sederhana.
- Component reusable untuk form, list, item, search, filter, tabel, dan pagination.
- Layout responsif sederhana untuk desktop dan mobile.
- UI menggunakan Bahasa Indonesia.

## Teknologi yang Digunakan

- ReactJS
- Vite
- JavaScript
- Axios
- LocalStorage
- CSS biasa
- DummyJSON Todos API

## Struktur Folder

```text
src/
  components/
    ApiTodoTable.jsx
    FilterTabs.jsx
    PaginationControls.jsx
    SearchInput.jsx
    TodoForm.jsx
    TodoItem.jsx
    TodoList.jsx
  hooks/
    useApiTodos.js
    useLocalTodos.js
  pages/
    ApiTodoPage.jsx
    LocalTodoPage.jsx
  services/
    todoApi.js
  utils/
    localStorage.js
  App.jsx
  main.jsx
  styles.css
```

## Cara Install

```bash
npm install
```

## Cara Menjalankan Project

```bash
npm run dev
```

Setelah server aktif, buka URL yang muncul di terminal, biasanya:

```text
http://localhost:5173
```

## Cara Build

```bash
npm run build
```

## Penjelasan Singkat Architecture

Project dipisahkan berdasarkan tanggung jawab agar kode mudah dibaca dan dirawat.

- `components` berisi UI reusable seperti form, daftar todo, tabel, search, filter, dan pagination.
- `pages` berisi halaman utama untuk Todo Lokal dan Todo API.
- `hooks` berisi logic state dan operasi todo agar component tetap fokus pada tampilan.
- `services` berisi request API menggunakan Axios.
- `utils` berisi helper umum, termasuk LocalStorage.

Todo Lokal memakai `useLocalTodos` untuk mengatur CRUD dan persist data. Todo API memakai `useApiTodos` untuk mengambil data dari API, menjalankan CRUD, dan menjaga state UI tetap berubah setelah response berhasil.

## API yang Digunakan

Aplikasi menggunakan DummyJSON Todos API:

```text
https://dummyjson.com/todos
```

Endpoint yang dipakai:

- `GET /todos` untuk mengambil data todo.
- `POST /todos/add` untuk membuat todo baru.
- `PUT /todos/:id` untuk memperbarui todo.
- `DELETE /todos/:id` untuk menghapus todo.

Karena DummyJSON adalah API dummy, perubahan create, update, dan delete tidak tersimpan permanen di server. Setelah response berhasil, aplikasi memperbarui state lokal agar UI tetap menampilkan hasil perubahan.

## Daftar Commit dan Fitur

- `chore: setup initial react todo project structure` - setup Vite, struktur folder, layout, dan navigasi.
- `feat: add local todo create and read feature` - form tambah todo lokal, list todo, dan LocalStorage.
- `feat: add local todo update and delete feature` - edit, ubah status, dan hapus todo lokal.
- `feat: add local todo search and filter feature` - search dan filter todo lokal.
- `feat: add todo api service layer` - service API dengan Axios.
- `feat: fetch todo api data with loading and error handling` - fetch todo API, loading, error, dan reload.
- `feat: implement todo api crud feature` - create, update, delete todo API.
- `feat: add api todo search filter and pagination` - search, filter, dan pagination todo API.
- `style: improve responsive todo app interface` - polish UI dan responsif.
- `docs: add project documentation` - dokumentasi project.

## Screenshot

Screenshot aplikasi dapat ditambahkan pada bagian ini.

```text
docs/screenshots/local-todo.png
docs/screenshots/api-todo.png
```
