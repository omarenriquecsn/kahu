import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ShoppingCart, Heart, Star, Truck, Shield } from 'lucide-react';
import { apiClient } from '../lib/api';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/format';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart, isAddingToCart } = useCart();

  const { data: productData, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => apiClient.getProduct(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !productData?.data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-600">Error al cargar el producto</p>
        </div>
      </div>
    );
  }

  const product = productData.data;

  const handleAddToCart = () => {
    addToCart({ productId: product.id, quantity: 1 });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-orange-600 font-medium mb-2">{product.brand}</p>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
                <span className="ml-2 text-gray-600">(4.8)</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">{product.weight}</span>
            </div>
          </div>

          <div className="border-t border-b border-gray-200 py-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl font-bold text-orange-600">
                {formatPrice(product.price)}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.stock_quantity > 0
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.stock_quantity > 0 ? 'En Stock' : 'Agotado'}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart || product.stock_quantity === 0}
              className="w-full flex items-center justify-center space-x-2 bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mb-4"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>
                {product.stock_quantity === 0 ? 'Agotado' : 'Agregar al Carrito'}
              </span>
            </button>

            <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              <Heart className="h-5 w-5" />
              <span>Agregar a Favoritos</span>
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Descripción</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <Truck className="h-6 w-6 text-orange-600" />
              <div>
                <p className="font-medium">Envío Gratis</p>
                <p className="text-sm text-gray-600">En compras +$50.000</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <Shield className="h-6 w-6 text-orange-600" />
              <div>
                <p className="font-medium">Garantía</p>
                <p className="text-sm text-gray-600">Producto garantizado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}