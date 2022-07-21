import React from 'react'

const TableItem = (props) => {
  return (
    <tr>
      <td>{props.date.substring(0, 10)}</td>
      <td>{props.name}</td>
      <td>{props.count}</td>
      <td>{props.distance}</td>
    </tr>
  )
}

export default TableItem