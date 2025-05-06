import React from 'react';
import CategoriaList from '../components/CategoriaList';
import ProductoList from '../components/ProductoList';

export default function Home({ searchTerm }) {
  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto p-6 gap-6">
      <aside className="w-full lg:w-1/4 bg-white p-4 rounded shadow">
        <h2 className="font-semibold text-xl mb-4">Categorías</h2>
        <CategoriaList sidebar />
      </aside>

      <main className="w-full lg:w-3/4">
        <h1 className="text-3xl font-bold mb-6">Productos</h1>
        {/* Aquí recibe el término y filtra */}
        <ProductoList searchTerm={searchTerm} />
      </main>
    </div>
  );
}