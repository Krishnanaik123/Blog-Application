import './Pagination.css'

function Pagination({
  currentPage,
  totalPages,
  setCurrentPage
}) {

  const pages = [...Array(totalPages).keys()].map(
    (num) => num + 1
  )

  return (

    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Prev
      </button>

      {
        pages.map((page) => (

          <button
            key={page}
            className={
              currentPage === page ? 'active' : ''
            }
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>

        ))
      }

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>

    </div>
  )
}

export default Pagination