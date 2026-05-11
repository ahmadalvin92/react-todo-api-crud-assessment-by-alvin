function SearchInput({ label = 'Cari Todo', onChange, placeholder, value }) {
  return (
    <div className="form-field search-field">
      <label htmlFor="searchTodo">{label}</label>
      <input
        id="searchTodo"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type="search"
        value={value}
      />
    </div>
  );
}

export default SearchInput;
