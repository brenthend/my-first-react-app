// External libraries
import React, { useEffect, useState } from 'react';
import { getGroceries, getHardwareItems } from './api.js';

// Internal components
import ProductItem from './components/ProductItem.jsx';
import CategorySelect from './components/CategorySelect.jsx';

// Styles
import './App.css';

function App() {
  const [category, setCategory] = useState('grocery');
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    if(!category) return;

    const fetchItems = async () => {
      try {
        const res = 
        category === 'grocery' 
        ? await getGroceries() 
        : await getHardwareItems();

        setItemList(res.data);
      } catch (err) {
        console.error('API error:', err);
      }
    };

   fetchItems();
}, [category]);

  return (
    <div className={`page-wrapper ${category}-theme`}>
      <CategorySelect selected={category} onChange={setCategory} />
      <div className="item-list">
        {itemList.map((item) => (
          <div key={item.id} className={`list-item ${category}-style`}>
            <ProductItem name={item.name} extra={item.extra}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
