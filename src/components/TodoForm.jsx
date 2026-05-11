import { useEffect, useState } from 'react';

const initialForm = {
  title: '',
  description: '',
  status: 'pending',
};

function TodoForm({
  initialValue,
  onCancel,
  onSubmit,
  showStatus = false,
  submitLabel = 'Simpan Todo',
}) {
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
      nextErrors.title = 'Judul perlu diisi.';
    }

    if (!form.description.trim()) {
      nextErrors.description = 'Catatan perlu diisi.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await onSubmit(form);

    if (result === false) {
      return;
    }

    setForm(initialForm);
    setErrors({});
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="title">Judul Todo</label>
        <input
          id="title"
          name="title"
          onChange={handleChange}
          placeholder="Misal: Belajar React"
          type="text"
          value={form.title}
        />
        {errors.title && <span className="field-error">{errors.title}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="description">Catatan</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          placeholder="Tulis catatan singkat"
          rows="4"
          value={form.description}
        />
        {errors.description && <span className="field-error">{errors.description}</span>}
      </div>

      {showStatus && (
        <div className="form-field">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" onChange={handleChange} value={form.status}>
            <option value="pending">Belum selesai</option>
            <option value="done">Selesai</option>
          </select>
        </div>
      )}

      <div className="form-actions">
        <button className="primary-button" type="submit">
          {submitLabel}
        </button>
        {onCancel && (
          <button className="secondary-button" onClick={onCancel} type="button">
            Batal
          </button>
        )}
      </div>
    </form>
  );
}

export default TodoForm;
