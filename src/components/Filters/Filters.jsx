import React, { useState } from 'react'

import { useDispatch } from 'react-redux';
import { resetFilterData, setFilterData } from '../../store/mainSlice';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Filters = () => {
  const [column, setColumn] = useState('');
  const [condition, setCondition] = useState('');
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch();


  const handleSubmit = (e) => {
    setError('')
    e.preventDefault();
    if (!/[0-9]/.test(value) && column === 'name') {
      dispatch(setFilterData({ value, condition, column }))
    }

    if (/[0-9]/.test(value) && column === 'name') {
      setError('Поле ввода должно содержать только символы')
    }
    if (/[0-9]/.test(value) && column === 'count' || /[0-9]/.test(value) && column === 'distance') {
      dispatch(setFilterData({ value, condition, column }))
    }
    if (!/[0-9]/.test(value) && column === 'count' || !/[0-9]/.test(value) && column === 'distance') {
      setError('Поле ввода должно содержать только цифры')
    }
  }

  const resetFilters = (e) => {
    e.preventDefault();
    setColumn('')
    setCondition('')
    setValue('')
    setError('')
    dispatch(resetFilterData())
  }

  return (
    <div className="filters-container"> {error && <p className='error'>{error}</p>}
      <Form className='form-container'>
        <select className="form-select" aria-label="Default select example" value={column} onChange={(e) => { setColumn(e.currentTarget.value) }}>
          <option value="" disabled >Выберите колонку</option>
          <option value="name">Имя</option>
          <option value="count">Количество</option>
          <option value="distance">Расстояние</option>
        </select>
        <select className="form-select" aria-label="Default select example" value={condition} onChange={(e) => { setCondition(e.currentTarget.value) }}>
          <option value="" disabled >Выберите условие</option>
          <option value="equals">Равно</option>
          <option value="contain">Содержит</option>
          <option value="more">Больше</option>
          <option value="less">Меньше</option>
        </select>
        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Введите значение" value={value} onChange={(e) => { setValue(e.currentTarget.value) }} />
        <Button variant="info" disabled={!value || !column || !condition} type="submit" onClick={handleSubmit} >
          Фильтр
        </Button>
        <Button variant="info" type="button" onClick={resetFilters} >
          Сбросить
        </Button>
      </Form >
    </div>
  )
}

export default Filters