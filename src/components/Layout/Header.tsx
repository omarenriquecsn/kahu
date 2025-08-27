import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, Menu } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import SearchBar from "../UI/SearchBar";
export function Header() {
  const { cart } = useCart();

  const cartItemsCount =
    cart?.items?.reduce(
      (total: number, item: any) => total + item.quantity,
      0
    ) || 0;

  const [searchOpen, setSearchOpen] = useState(false);

  const handleOpenSearch = () => {
    // Lógica para abrir la barra de búsqueda
    setSearchOpen(!searchOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      {/* Main header */}
      <div className="container bg-gray-100 mx-auto px-4 py-6">
        <div className="flex items-center justify-between relative">
          {/* Logo */}
          <Link
            to="/"
            className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-3"
          >
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

          {/* Actions */}
          <div className="flex items-center space-x-4 ml-auto">
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
        <div className="container bg-gradient-to-r from-orange-500 to-orange-600 text-white mx-auto px-6 flex justify-between items-center">
          <div className="flex space-x-8 overflow-x-auto py-3">
            <Link
              to="/perros"
              className="whitespace-nowrap text-sm font-medium text-white-700 hover:text-orange-600 transition-colors"
            >
              Perros
            </Link>
            <Link
              to="/gatos"
              className="whitespace-nowrap text-sm font-medium text-white-700 hover:text-orange-600 transition-colors"
            >
              Gatos
            </Link>
          </div>
          {searchOpen && <SearchBar />}

          <div className="flex space-x-2 overflow-x-auto py-3">
            {/* Home */}
            <Link
              to="/"
              className="p-2 text-gray-600 hover:text-orange-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-house-icon lucide-house text-white hover:text-orange-600"
              >
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
            </Link>
            <button
              onClick={handleOpenSearch} // tu función que abre la barra buscadora
              className="p-2  hover:text-orange-600 transition-colors text-white"
            >
              <Search className="h-6 w-6" /> {/* ícono de búsqueda */}
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 hover:text-orange-600 transition-colors text-white"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
