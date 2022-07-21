import React from 'react'

import Pagination from 'react-bootstrap/Pagination';



const Paginator = ({ itemsPerPage, totalItems, paginate, currentPage }) => {

  let active = currentPage;
  let items = [];
  for (let number = 1; number <= Math.ceil(totalItems / itemsPerPage); number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={() => paginate(number)}>
        {number}
      </Pagination.Item>,
    );
  }


  return (
    <>
      <Pagination>{items}</Pagination>
    </>
  )
}

export default Paginator