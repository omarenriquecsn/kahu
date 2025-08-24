import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/format';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const { addToCart, isAddingToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ productId: product.id, quantity: 1 });
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
        <div className="flex gap-6">
          <Link to={`/products/${product.id}`} className="flex-shrink-0">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-32 h-32 object-cover rounded-lg"
            />
          </Link>
          
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <Link to={`/products/${product.id}`}>
                <h3 className="text-xl font-semibold text-gray-800 hover:text-orange-600 transition-colors">
                  {product.name}
                </h3>
              </Link>
              <button className="text-gray-400 hover:text-red-500 transition-colors">
                <Heart className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-2">{product.brand}</p>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">
              {product.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-orange-600">
                  {formatPrice(product.price)}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  {product.weight}
                </span>
              </div>
              
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart || product.stock_quantity === 0}
                className="flex items-center space-x-2 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>
                  {product.stock_quantity === 0 ? 'Agotado' : 'Agregar'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
      <div className="relative">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md text-gray-400 hover:text-red-500 transition-colors">
          <Heart className="h-5 w-5" />
        </button>
        {product.stock_quantity === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Agotado
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-1 hover:text-orange-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-orange-600">
            {formatPrice(product.price)}
          </span>
          <span className="text-sm text-gray-500">{product.weight}</span>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart || product.stock_quantity === 0}
          className="w-full flex items-center justify-center space-x-2 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>
            {product.stock_quantity === 0 ? 'Agotado' : 'Agregar al Carrito'}
          </span>
        </button>
      </div>
    </div>
  );
}