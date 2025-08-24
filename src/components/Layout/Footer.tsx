import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/public/logo kahu.jpg" 
                alt="Kahu Logo" 
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-bold text-orange-400">Kahu</h3>
                <p className="text-sm text-gray-400">Distribuidora Canina</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Tu tienda de confianza para la alimentación de tu mejor amigo. 
              Productos de calidad premium para perros de todas las edades.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/brands" className="text-gray-400 hover:text-white transition-colors">
                  Marcas
                </Link>
              </li>
              <li>
                <Link to="/offers" className="text-gray-400 hover:text-white transition-colors">
                  Ofertas
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  Nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Atención al Cliente</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">
                  Envíos
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-white transition-colors">
                  Devoluciones
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-400" />
                <span className="text-gray-400">+57 300 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-400" />
                <span className="text-gray-400">info@kahu.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-orange-400" />
                <span className="text-gray-400">Bogotá, Colombia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Kahu Distribuidora Canina. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}