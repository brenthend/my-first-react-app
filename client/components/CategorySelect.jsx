import React, { useEffect, useState } from 'react';
import { getCategories } from '@api';

function CategorySelect({ selected, onChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data);
      } catch (err) {
        console.error('Error loading categories:', err);
      }
    };

    fetch();
  }, []);

  return (
    <select value={selected} onChange={(e) => onChange(e.target.value)}>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.name}>
          {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
        </option>
      ))}
    </select>
  );
}

export default CategorySelect;