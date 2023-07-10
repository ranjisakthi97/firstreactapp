import React from 'react';
import { useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";

const Content = () => {
    //day 1
    // function handleNameChange() {
    //     const names = ['Earn', 'Grow', 'Give'];
    //     const int = Math.floor(Math.random() * 3);
    //     setName(names[int]);
    // }

    // const [name, setName] = useState('Grow');
    // const [count, setCount] = useState(99);
   

    // function incrementFunc() {
    //     setCount(prevCount => prevCount + 1)
    // }

    // function decrementFunc() {
    //     setCount(prevCount => prevCount - 1)
    // }

    // return (
    //     <main>
    //         <p>Let's {name} Money</p>
    //         <button onClick={handleNameChange}>Subscribe</button>
    //         <button onClick={decrementFunc}>-</button>
    //         <span>{count}</span>
    //         <button onClick={incrementFunc}>+</button>
    //     </main>

    // )


    const [items, setItems] = useState(
    [
          {
            id: 1,
            checked: true,
            item: "Prac1 Coding"
          },
          {
            id: 21,
            checked: false,
            item: "Play video"
          },
          {
            id: 33,
            checked: false,
            item: "Read React"
          },
    ])

    const handleCheck = (id) => {
      const listItems = items.map((item) => item.id === id ?
      {...item, checked: !item.checked} : item)
      setItems(listItems)
      localStorage.setItem("todo_list", JSON.stringify(listItems));
    }

    const handleDelete = (id) => {
      const listItems = items.filter((item) => item.id !==id )
      setItems(listItems)
      localStorage.setItem("todo_list", JSON.stringify(listItems));
    }

    return(
      <main>
        {(items.length) ? (
        <ul>
          {
            items.map((item) => (
               <li className='item' key={item.id}>
                 <input
                   type= "checkbox"
                   onChange={() => handleCheck(item.id)}
                   checked= {item.checked}
                   />
                   <label style={(item.checked) ?
                   {textDecoration: 'line-through'} : null}
                   onDoubleClick={() => handleCheck(item.id)}>{item.item}</label>
                   <FaTrashAlt
                     onClick={() => handleDelete(item.id)}
                     role="button"
                     tabIndex= "0"
                   />
               </li>
            ))
          }
        </ul>
        ) :
         <p style = {{ marginTop:'2rem'}}>Your list is empty</p>
        }
      </main>
    )
}

export default Content