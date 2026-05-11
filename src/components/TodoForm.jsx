import { useEffect, useState } from 'react';

const initialForm = {
  title: '',
  description: '',
};

function TodoForm({ initialValue, onSubmit, submitLabel = 'Simpan Todo' }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(initialValue ?? initialForm);
    setErrors({});
  }, [initialValue]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  function validateForm() {
    const nextErrors = {};

    if (!form.title.trim()) {
      nextErrors.title = 'Judul wajib diisi.';
    }

    if (!form.description.trim()) {
      nextErrors.description = 'Deskripsi wajib diisi.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(form);
    setForm(initialForm);
    setErrors({});
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="title">Judul</label>
        <input
          id="title"
          name="title"
          onChange={handleChange}
          placeholder="Contoh: Belajar React"
          type="text"
          value={form.title}
        />
        {errors.title && <span className="field-error">{errors.title}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="description">Deskripsi</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          placeholder="Tulis detail todo"
          rows="4"
          value={form.description}
        />
        {errors.description && <span className="field-error">{errors.description}</span>}
      </div>

      <button className="primary-button" type="submit">
        {submitLabel}
      </button>
    </form>
  );
}

export default TodoForm;
