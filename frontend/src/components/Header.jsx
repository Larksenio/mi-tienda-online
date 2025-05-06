import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

export default function Header({ onSearch, cartItems = [], cartCount }) {
  const [term, setTerm] = useState('');

  // Calcula subtotal cada vez que cambien los items
  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, p) => sum + parseFloat(p.precio), 0);
  }, [cartItems]);

  const handleSubmit = e => {
    e.preventDefault();
    onSearch(term.trim());
  };

  return (
    <header className="bg-gray-800 text-white shadow mb-6">
      <div className="max-w-7xl mx-auto flex items-center p-4 gap-6">
        {/* Logo */}
        <Link to="/">
          <img src="/logo192.png" alt="Logo" className="h-24 w-auto" />
        </Link>

        {/* Buscador */}
        <form onSubmit={handleSubmit} className="flex flex-1">
          <input
            type="text"
            value={term}
            onChange={e => setTerm(e.target.value)}
            placeholder="🔍 Buscar productos..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l bg-white text-gray-900 placeholder-gray-500 focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 bg-indigo-500 text-white rounded-r hover:bg-indigo-600"
          >
            Buscar
          </button>
        </form>

        {/* Mini-carrito */}
        <div className="relative group">
          <button className="flex items-center gap-1">
            🛒 <span className="font-bold">{cartCount}</span>
          </button>

          {/* Dropdown */}
          <div
            className="
              absolute right-0 mt-2 w-80 bg-white text-gray-900 rounded shadow-lg
              opacity-0 invisible group-hover:opacity-100 group-hover:visible
              transition-all duration-200 z-10
            "
          >
            {cartItems.length === 0 ? (
              <div className="p-4">Tu carrito está vacío</div>
            ) : (
              <>
                <ul className="max-h-64 overflow-y-auto">
                  {cartItems.map((p, i) => (
                    <li key={i} className="flex items-center p-3 border-b last:border-b-0">
                      <img
                        src={p.imagen}
                        alt={p.nombre}
                        className="w-12 h-12 object-cover rounded mr-3"
                        onError={e => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/50';
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-medium">{p.nombre}</p>
                        <p className="text-sm text-gray-600">${p.precio}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="p-4 border-t">
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}