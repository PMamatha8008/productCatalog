import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';


const CustomPagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageItems = [];
  const [editedData, setEditedData] = useState({});
  for (let number = 1; number <= totalPages; number++) {
    pageItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => onPageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Pagination>
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />
      {pageItems}
      <Pagination.Next
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </Pagination>
  );
};

export default CustomPagination;