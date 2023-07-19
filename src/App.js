import Header from './Header';
import Conent from './Content';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';

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

  const addItem = async(item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = {
      id,
      checked: false,
      item
    }
    const listItems = [...items, addNewItem];
    setItems(listItems);

    const postObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addNewItem)
    }

    const result = await apiRequest(API_URL, postObj);
    if(result) {
      setFetchError(result);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem)
    setNewItem('')
  }

  const handleCheck = async(id) => {
    const listItems = items.map((item) => item.id === id ?
      { ...item, checked: !item.checked } : item)
    setItems(listItems)

    const myItem = listItems.filter(item => 
      item.id === id)

    const updateObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({checked: myItem[0].checked})
    }
    const requestUrl = `${API_URL}/${id}`
    const result = await apiRequest(requestUrl, updateObj);
    if(result) {
      setFetchError(result);
    }
  }

  const handleDelete = async(id) => {
    const listItems = items.filter((item) => item.id !== id)
    setItems(listItems)
  
    const deleteObj = {
      method: 'DELETE',
    }
    const requestUrl = `${API_URL}/${id}`
    const result = await apiRequest(requestUrl, deleteObj);
    if(result) {
      setFetchError(result);
    }
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
