import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CategoriaList({ selectedCategory, onSelectCategory }) {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/categorias/`)
      .then(r => setCats(r.data))
      .catch(console.error);
  }, []);

  return (
    <ul className="space-y-2">
      {/* "Todas" para resetear filtro */}
      <li
        className={`cursor-pointer ${
          selectedCategory === null ? 'font-bold text-indigo-600' : ''
        }`}
        onClick={() => onSelectCategory(null)}
      >
        Todas
      </li>

      {cats.map(c => (
        <li
          key={c.id}
          className={`cursor-pointer hover:text-indigo-600 ${
            selectedCategory === c.id ? 'font-bold text-indigo-600' : ''
          }`}
          onClick={() => onSelectCategory(c.id)}
        >
          {c.nombre}
        </li>
      ))}
    </ul>
  );
}
