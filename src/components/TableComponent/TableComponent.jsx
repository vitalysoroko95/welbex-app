import React from 'react'

import { Table } from 'react-bootstrap';
import TableItem from '../TableItem/TableItem'


const TableComponent = ({ data }) => {
  return (
    <Table striped responsive bordered hover size="md" variant="dark">
      <thead>
        <tr>
          <th width={'10%'}>Дата</th>
          <th>Название</th>
          <th width={'10%'}>Количество</th>
          <th width={'10%'}>Расстояние</th>
        </tr>
      </thead>
      <tbody>
        {data.length && data.map((item, index) => (<TableItem {...item} key={index} />)
        )}
      </tbody>
    </Table>
  )
}

export default TableComponent