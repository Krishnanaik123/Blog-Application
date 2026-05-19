import './Pagination.css'

function Pagination({
  currentPage,
  totalPages,
  setCurrentPage
}) {
  // Show max 5 page buttons
  const maxPagesToShow = 5
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)
  
  // Adjust start if end is at the limit
  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1)
  }

  const pages = []
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        ← Prev
      </button>

      {startPage > 1 && (
        <>
          <button onClick={() => setCurrentPage(1)}>1</button>
          {startPage > 2 && <span className="ellipsis">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          className={currentPage === page ? 'active' : ''}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="ellipsis">...</span>}
          <button onClick={() => setCurrentPage(totalPages)}>
            {totalPages}
          </button>
        </>
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next →
      </button>
    </div>
  )
}

export default Pagination