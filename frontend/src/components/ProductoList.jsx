import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductoList({
  searchTerm = '',
  selectedCategory = null,
  onAddToCart
}) {
  const [productos, setProductos] = useState([]);

useEffect(() => {
  const API = process.env.REACT_APP_API_BASE_URL;
  axios
    .get(`${API}/api/productos/`)
    .then(res => setProductos(res.data))
    .catch(console.error);
}, []);

  // Filtrar por texto y por categoría
  const filtrados = productos
    .filter(p =>
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(p =>
      selectedCategory ? p.categoria === selectedCategory : true
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filtrados.map(p => (
        <div key={p.id} className="bg-white rounded-lg shadow overflow-hidden">
          <img
            src={p.imagen}
            alt={p.nombre}
            className="w-full h-48 object-cover"
            onError={e => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/300';
            }}
          />
          <div className="p-4">
            <h3 className="font-medium text-lg mb-1">{p.nombre}</h3>
            <p className="text-indigo-600 font-bold mb-4">${p.precio}</p>
            <button
              onClick={() => onAddToCart(p)}
              className="w-full py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              Agregar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
