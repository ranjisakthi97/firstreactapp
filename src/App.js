import Header from './Header';
import Conent from './Content';
import Footer from './Footer';
import { useState } from 'react';
 
function App() {
  const [ items, setItems] = useState(
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
      { ...item, checked: !item.checked } : item)
    setItems(listItems)
    localStorage.setItem("todo_list", JSON.stringify(listItems));
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id)
    setItems(listItems)
    localStorage.setItem("todo_list", JSON.stringify(listItems));
  }
  return (
    <div className='App'>
      <Header title="Ranjitha" />
      <Conent
        items= {items}
        handleCheck = {handleCheck}
        handleDelete = {handleDelete  }
      />
      <Footer 
      length = {items.length} />
    </div>
  );
}

export default App;
