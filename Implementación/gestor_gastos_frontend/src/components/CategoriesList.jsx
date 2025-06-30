import { useState } from 'react';
import categories from '../data/categories';

export default function CategoriesList() {
  const [categoryList, setCategoryList] = useState([...categories]);
  const [newCategory, setNewCategory] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim() && !categoryList.includes(newCategory.trim())) {
      setCategoryList([...categoryList, newCategory.trim()]);
      setNewCategory('');
      setShowForm(false);
    }
  };

  const handleDeleteCategory = (categoryToDelete) => {
    if (confirm(`¿Eliminar la categoría "${categoryToDelete}"?`)) {
      setCategoryList(categoryList.filter(cat => cat !== categoryToDelete));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-green-500 to-teal-600 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Categorías</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors"
        >
          + Agregar
        </button>
      </div>

      {showForm && (
        <div className="p-6 bg-green-50 border-b">
          <form onSubmit={handleAddCategory} className="flex gap-3">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Nombre de la nueva categoría"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              autoFocus
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Agregar
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
          </form>
        </div>
      )}

      <div className="p-6">
        {categoryList.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-4">📁</div>
            <p>No hay categorías disponibles</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {categoryList.map(cat => (
              <div key={cat} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📁</span>
                  <span className="font-medium">{cat}</span>
                </div>
                {!categories.includes(cat) && (
                  <button
                    onClick={() => handleDeleteCategory(cat)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Eliminar categoría"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
