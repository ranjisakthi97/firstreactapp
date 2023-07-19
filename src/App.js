import Header from './Header';
import Conent from './Content';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import AddItem from './AddItem';
import SearchItem from './SearchItem';

function App() {
  const API_URL = 'http://localhost:3500/items'
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { //directly async we can't call here
    const fetchItems = async() => {
      try {
        const response = await fetch(API_URL);
        if(!response.ok) throw Error("Data not received");
          
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch(err) {
        console.log(err)
         setFetchError(err.message);
      } finally {
          setIsLoading(false);
      }
    }
    setTimeout(() => {
      (async() => await fetchItems())() 
    }, 2000)
    // async should be called 
    //inside the async only (async )() to trigger the func
  }, [])

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = {
      id,
      checked: false,
      item
    }
    const listItems = [...items, addNewItem];
    setItems(listItems);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem)
    setNewItem('')
  }

  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ?
      { ...item, checked: !item.checked } : item)
    setItems(listItems)
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id)
    setItems(listItems)
  }
  return (
    <div className='App'>
      <Header title="Ranjitha" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit} />
      <SearchItem
        search={search}
        setSearch={setSearch} />
      <main>
        {isLoading && <p>{'Loading Items...'}</p>}
        {fetchError && <p>{`Error: ${fetchError}`}</p>}
        { !isLoading && !fetchError && <Conent
          items={items.filter((item) => (item.item).toLowerCase()
            .includes(search.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />}
      </main>
      <Footer
        length={items.length} />
    </div>
  );
}

export default App;
