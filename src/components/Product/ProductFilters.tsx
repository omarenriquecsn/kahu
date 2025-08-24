import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { apiClient } from '../../lib/api';

export function ProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => apiClient.getCategories(),
  });

  const categories = categoriesData?.data || [];

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const activeFiltersCount = Array.from(searchParams.entries()).length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Filtros</h3>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-1 text-sm text-orange-600 hover:text-orange-700"
          >
            <X className="h-4 w-4" />
            <span>Limpiar</span>
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Categories */}
        <div>
          <h4 className="font-medium text-gray-800 mb-3">Categorías</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category.id}
                  checked={searchParams.get('category_id') === category.id}
                  onChange={(e) => updateFilter('category_id', e.target.value)}
                  className="text-orange-600 focus:ring-orange-500"
                />
                <span className="ml-2 text-sm text-gray-700">{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Age Group */}
        <div>
          <h4 className="font-medium text-gray-800 mb-3">Edad</h4>
          <div className="space-y-2">
            {[
              { value: 'puppy', label: 'Cachorro' },
              { value: 'adult', label: 'Adulto' },
              { value: 'senior', label: 'Senior' },
              { value: 'all', label: 'Todas las edades' },
            ].map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="age_group"
                  value={option.value}
                  checked={searchParams.get('age_group') === option.value}
                  onChange={(e) => updateFilter('age_group', e.target.value)}
                  className="text-orange-600 focus:ring-orange-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Brand */}
        <div>
          <h4 className="font-medium text-gray-800 mb-3">Marca</h4>
          <div className="space-y-2">
            {[
              'Royal Canin',
              'Hill\'s',
              'Purina Pro Plan',
              'Eukanuba',
              'Pedigree',
              'Dog Chow',
            ].map((brand) => (
              <label key={brand} className="flex items-center">
                <input
                  type="radio"
                  name="brand"
                  value={brand}
                  checked={searchParams.get('brand') === brand}
                  onChange={(e) => updateFilter('brand', e.target.value)}
                  className="text-orange-600 focus:ring-orange-500"
                />
                <span className="ml-2 text-sm text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="font-medium text-gray-800 mb-3">Rango de Precio</h4>
          <div className="space-y-2">
            {[
              { min: 0, max: 50000, label: 'Menos de $50.000' },
              { min: 50000, max: 100000, label: '$50.000 - $100.000' },
              { min: 100000, max: 200000, label: '$100.000 - $200.000' },
              { min: 200000, max: null, label: 'Más de $200.000' },
            ].map((range, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="radio"
                  name="price_range"
                  value={`${range.min}-${range.max || ''}`}
                  onChange={() => {
                    updateFilter('min_price', range.min.toString());
                    if (range.max) {
                      updateFilter('max_price', range.max.toString());
                    } else {
                      updateFilter('max_price', '');
                    }
                  }}
                  className="text-orange-600 focus:ring-orange-500"
                />
                <span className="ml-2 text-sm text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}