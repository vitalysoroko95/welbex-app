import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTable } from '../../store/mainSlice';
import TableComponent from '../TableComponent/TableComponent';
import Filters from '../Filters/Filters';
import Paginator from '../Paginator/Paginator';
import Spinner from 'react-bootstrap/Spinner'

import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.main.loading)
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const { value, column, condition } = useSelector((state) => state.main)


  useEffect(() => {
    dispatch(fetchTable());
    setData(table)
  }, [])

  useEffect(() => {
    if (value && column && condition) {
      filterData(condition, value, column)
    } else {
      setData(table)
    }
  }, [value, column, condition])

  const table = useSelector((state) => state.main.table);

  useEffect(() => {
    if (table.length > 1) {
      setData(table)
    }
  }, [table])

  const filterData = (condition, value, column) => {
    const copyArray = [...data];
    if (condition === 'equals') {
      const filtered = copyArray.filter((item) =>
        // eslint-disable-next-line
        item[column] == value.trim()
      )
      setData(filtered)
    }
    if (condition === 'more') {
      const filtered = copyArray.filter((item) =>
        item[column] > value.trim()
      )
      setData(filtered)
    }
    if (condition === 'less') {
      const filtered = copyArray.filter((item) =>
        item[column] < value.trim()
      )
      setData(filtered)
    }
    if (condition === 'contain') {
      const filtered = copyArray.filter((item) =>
        item[column].toString().toLowerCase().includes(value.trim())
      )
      setData(filtered)
    }

  }

  const lastItemIdex = currentPage * itemsPerPage;
  const firstitemIndex = lastItemIdex - itemsPerPage;
  const currentItems = data.slice(firstitemIndex, lastItemIdex)
  const paginate = pageNumber => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="container">
      {!isLoading ?
        <div>
          <Filters />
          {data.length ? <TableComponent data={currentItems} /> : "Ничего не найдено. Попробуйте изменить фильтры."}
          <Paginator paginate={paginate} currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={data.length} />
        </div> : <div className="preloader"><Spinner animation="border" variant="info" size="lg" /></div>}
    </div>
  );

}

export default App;
