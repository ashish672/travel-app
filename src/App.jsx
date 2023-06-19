import { useState } from 'react'
import './App.css'

function App() {
  const [description, setDescription] = useState("");
  const [count , setCount] = useState(1);
  const [sortOrder, setSortOrder] = useState('');

  const [list, setList] = useState([
    { 
      id: Date.now(),
      count : 121,
      description : 'Socks',
      isPacked : false
    },
    {
      id: Date.now() + 1,
      count : 92,
      description : 'Shoes',
      isPacked : false
    },
    {
      id: Date.now() + 2,
      count : 3,
      description : 'Brushes',
      isPacked : false
    },
    {
      id: Date.now() + 3,
      count : 2,
      description : 'Passports',
      isPacked : false
    },
  ]); 

  const submitHandler = (e) => {
    e.preventDefault();
    if(description) {
        setList([...list, {
          id : Date.now(),
          count,
          description ,
          isPacked : false
        }])
        setCount(1);
        setDescription("");
    }
  }

  const setListToChecked = (id) => {
    const newList = list.map(l => {
      if(l.id === +id) {
         l.isPacked = !l.isPacked;
         return l;
        }
        return l;
    })
    setList(newList);
  }

  const removeItem = (id) => setList(list.filter(l => l.id !== +id));
  

  const packedItems = list.filter(l => l.isPacked);

  const sortByOrder = (list, sortBy) => {
    if(sortBy) {
      return list.sort((item1, item2) => {
        if((item1[sortBy] > item2[sortBy])  ) { 
          return 1;
        } else {
          return -1;
        } 
    })
  }
    return list;
  }

  const clearList = () => setList([])

  const sortedList = sortByOrder(list,sortOrder)

  return (
    <>
      <h1>Travel App</h1>
      <h3>What do you need for this trip?</h3>
      <form onSubmit = {submitHandler}>
      <select name="" id="" onChange={(e) => setCount(e.target.value)} value = {count}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>

      <input type="text" placeholder='Item' value = {description} onChange={(e) => setDescription(e.target.value)} />

      <button>Add</button>

      </form>

      {sortedList.length > 0 ?  sortedList.map(l => <div key = {l.id}> 
        <input type="checkbox" name="" id="" onChange={() => setListToChecked(l.id)} />
        <span>{l.count}</span>
        {'    '}
        {
          l.isPacked ? <span style = {{textDecoration : 'line-through'}}>{l.description}</span> : <span>{l.description}</span>
        }
        <button onClick = { () => removeItem(l.id)}>X</button>
      </div>) : <h1>No Items found</h1>}

        <footer>

        {
          <h3>You have {list.length} items on your list, and you already packed {packedItems.length} items ({(packedItems.length / list.length) * 100} %)</h3>
        }

        </footer>

        <div className="sort">
          <select name="Sort" id="" value = {sortOrder} onChange = {(e) => setSortOrder(e.target.value)}>
            <option value="">Sort By-</option>
            <option value="description">Sort By Description</option>
            <option value="count">Sort By Count</option>
          </select>
          <button onClick = {clearList}>Clear List</button>
        </div>

    </>
  )
}

export default App
