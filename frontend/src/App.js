import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = product => {
    setCartItems(prev => [...prev, product]);
    // por ahora solo un alert, luego podemos mostrar un mini carrrito
    alert(`Añadido al carrito: ${product.nombre}`);
  };

  return (
    <Router>

        <Header
            onSearch={setSearchTerm}
            cartItems={cartItems}
            cartCount={cartItems.length}
        />

      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                onAddToCart={handleAddToCart}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
