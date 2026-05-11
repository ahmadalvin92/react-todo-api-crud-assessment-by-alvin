function PaginationControls({ currentPage, limit, onLimitChange, onNext, onPrevious, totalPages }) {
  return (
    <div className="pagination-controls">
      <div className="limit-control">
        <label htmlFor="pageLimit">Data per halaman</label>
        <select id="pageLimit" onChange={(event) => onLimitChange(Number(event.target.value))} value={limit}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>

      <div className="page-buttons">
        <button
          className="secondary-button compact"
          disabled={currentPage === 1}
          onClick={onPrevious}
          type="button"
        >
          Sebelumnya
        </button>
        <span>
          Halaman {currentPage} dari {totalPages}
        </span>
        <button
          className="secondary-button compact"
          disabled={currentPage === totalPages}
          onClick={onNext}
          type="button"
        >
          Berikutnya
        </button>
      </div>
    </div>
  );
}

export default PaginationControls;
