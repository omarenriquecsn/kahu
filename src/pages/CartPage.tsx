import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/format';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';

export function CartPage() {
  const { cart, isLoading, updateCartItem, removeFromCart, clearCart } = useCart();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 mb-8">
            Agrega algunos productos para comenzar tu compra
          </p>
          <Link
            to="/products"
            className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Ver Productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Carrito de Compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex gap-4">
                <img
                  src={item.product.image_url}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {item.product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {item.product.brand} - {item.product.weight}
                  </p>
                  <p className="text-orange-600 font-semibold">
                    {formatPrice(item.price)}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => updateCartItem({ itemId: item.id, quantity: item.quantity - 1 })}
                      disabled={item.quantity <= 1}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateCartItem({ itemId: item.id, quantity: item.quantity + 1 })}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-4">
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Vaciar Carrito
            </button>
            <Link
              to="/products"
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              Continuar Comprando
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Resumen del Pedido
          </h3>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{formatPrice(cart.total_amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Envío</span>
              <span className="font-medium text-green-600">Gratis</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-semibold text-orange-600">
                  {formatPrice(cart.total_amount)}
                </span>
              </div>
            </div>
          </div>

          <Link
            to="/checkout"
            className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium text-center block"
          >
            Proceder al Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}