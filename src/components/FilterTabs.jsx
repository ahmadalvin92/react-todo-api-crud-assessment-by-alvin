const filterOptions = [
  { label: 'Semua', value: 'all' },
  { label: 'Selesai', value: 'done' },
  { label: 'Belum selesai', value: 'pending' },
];

function FilterTabs({ activeFilter, onChange }) {
  return (
    <div className="filter-tabs" role="tablist" aria-label="Filter status todo">
      {filterOptions.map((option) => (
        <button
          aria-selected={activeFilter === option.value}
          className={activeFilter === option.value ? 'filter-tab active' : 'filter-tab'}
          key={option.value}
          onClick={() => onChange(option.value)}
          role="tab"
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default FilterTabs;
