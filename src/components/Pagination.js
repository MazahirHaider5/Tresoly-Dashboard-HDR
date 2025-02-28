import React from "react";
import { Button } from "reactstrap";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const renderPagination = () => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    let leftPages = [];
    let rightPages = [];

    // Logic to dynamically display pages
    if (currentPage <= 4) {
      leftPages = pageNumbers.slice(0, 4); // Show the first four pages
      rightPages = pageNumbers.slice(4, 8); // Show the next four pages
    } else if (currentPage > totalPages - 4) {
      leftPages = pageNumbers.slice(totalPages - 8, totalPages - 4); // Show the preceding four pages
      rightPages = pageNumbers.slice(totalPages - 4); // Show the last four pages
    } else {
      // Middle pages with dynamic adjustment
      leftPages = pageNumbers.slice(currentPage - 3, currentPage); // Show the previous three pages
      rightPages = pageNumbers.slice(currentPage, currentPage + 3); // Show the next three pages
    }

    const buttonClasses = (page) =>
      `rounded-circle btn-outline-color-pagination-dots ${
        page === currentPage ? "selected-btn-outline-color-pagination-dots" : ""
      }`;

    return (
      <div className="pagination-container">
        <div className="pagination-buttons p-0">
          {leftPages.map((page) => (
            <Button
              className={buttonClasses(page)}
              key={page}
              variant="link"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
        </div>

        {leftPages.length > 0 && rightPages.length > 0 && (
          <span className="pagination-dots">....</span>
        )}

        <div className="pagination-buttons p-0">
          {rightPages.map((page) => (
            <Button
              className={buttonClasses(page)}
              key={page}
              variant="link"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  return <div>{renderPagination()}</div>;
};

export default Pagination;
