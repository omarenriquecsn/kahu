import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List } from 'lucide-react';
import { apiClient } from '../lib/api';
import { ProductCard } from '../components/Product/ProductCard';
import { ProductFilters } from '../components/Product/ProductFilters';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';

export function ProductsPage() {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filters = {
    category_id: searchParams.get('category_id') || undefined,
    brand: searchParams.get('brand') || undefined,
    age_group: searchParams.get('age_group') || undefined,
    search: searchParams.get('search') || undefined,
  };

  const { data: productsData, isLoading, error } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => apiClient.getProducts(filters),
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-600">Error al cargar los productos</p>
        </div>
      </div>
    );
  }

  const products = productsData?.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Productos
          </h1>
          <p className="text-gray-600">
            {products.length} productos encontrados
          </p>
        </div>

        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          {/* View mode toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${
                viewMode === 'grid'
                  ? 'bg-white shadow-sm text-orange-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${
                viewMode === 'list'
                  ? 'bg-white shadow-sm text-orange-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>

          {/* Filters toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Filter className="h-5 w-5" />
            <span>Filtros</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <ProductFilters />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No se encontraron productos con los filtros seleccionados
              </p>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}