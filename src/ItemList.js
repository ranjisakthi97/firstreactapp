import React from 'react'
import LineItem from './LineItem';

const ItemList = ({ items, handleCheck, handleDelete }) => {
  return (
    <ul>
    {
      items.map((item) => (
         <LineItem
         item={item}
         key={item.id} //we need to send key to identify or error will be thrown
         handleCheck={handleCheck}
         handleDelete={handleDelete} />
      ))
    }
  </ul>
  )
}

export default ItemList