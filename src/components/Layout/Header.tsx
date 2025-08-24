import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, Heart } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';

export function Header() {
  const { user, signOut } = useAuth();
  const { cart } = useCart();

  const cartItemsCount = cart?.items?.reduce((total: number, item: any) => total + item.quantity, 0) || 0;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      {/* Top bar */}
      <div className="bg-orange-500 text-white py-2">
        <div className="container mx-auto px-4 text-center text-sm">
          🐕 Envío gratis en compras superiores a $50.000 COP
        </div>
      </div>

      {/* Main header */}
      <div className="container bg-gray-100 mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/public/logo kahu.jpg" 
              alt="Kahu Logo" 
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-orange-600">Kahu</h1>
              <p className="text-xs text-gray-600">Distribuidora Canina</p>
            </div>
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar alimentos para tu mascota..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <button className="p-2 text-gray-600 hover:text-orange-600 transition-colors">
              <Heart className="h-6 w-6" />
            </button>

            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative p-2 text-gray-600 hover:text-orange-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-orange-600 transition-colors">
                <User className="h-6 w-6" />
                {user && <span className="hidden md:block text-sm">{user.full_name}</span>}
              </button>
              
              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Mi Perfil
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Mis Pedidos
                    </Link>
                    <button
                      onClick={signOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Iniciar Sesión
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Registrarse
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile menu */}
            <button className="md:hidden p-2 text-gray-600">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto py-3">
            <Link to="/products" className="whitespace-nowrap text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">
              Todos los Productos
            </Link>
            <Link to="/products?age_group=puppy" className="whitespace-nowrap text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">
              Cachorros
            </Link>
            <Link to="/products?age_group=adult" className="whitespace-nowrap text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">
              Adultos
            </Link>
            <Link to="/products?age_group=senior" className="whitespace-nowrap text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">
              Senior
            </Link>
            <Link to="/brands" className="whitespace-nowrap text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">
              Marcas
            </Link>
            <Link to="/offers" className="whitespace-nowrap text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">
              Ofertas
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}