import React from 'react'

const Footer = ({length}) => {
 const year = new Date();
  return (
    <footer> {length} three list { length === 1 ? "item" : "items"}&nbsp;
      Copyright  &copy; {year.getFullYear()}
    </footer>
  )
}

export default Footer