import React, { useState } from 'react';
import '../../style/pageStyle/halloffame/Pagination.scss';

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4; // Adjust based on your requirements

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="pagination">
      <button 
        className="arrow" 
        onClick={() => handlePageChange(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        ←
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const pageNum = index + 1;
        return (
          <button
            key={pageNum}
            className={`page-number ${currentPage === pageNum ? 'active' : ''}`}
            onClick={() => handlePageChange(pageNum)}
          >
            {pageNum}
          </button>
        );
      })}

      <button 
        className="arrow" 
        onClick={() => handlePageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
      >
        →
      </button>
    </div>
  );
};

export default Pagination;
