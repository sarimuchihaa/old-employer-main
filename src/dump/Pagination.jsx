import React from "react";
import styles from "../style/dumpStyle/Pagination.module.scss";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrow}
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
            className={`${styles["page-number"]} ${
              currentPage === pageNum ? styles.active : ""
            }`}
            onClick={() => handlePageChange(pageNum)}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        className={styles.arrow}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        →
      </button>
    </div>
  );
};

export default Pagination;
