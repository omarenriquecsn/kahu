import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Heart } from 'lucide-react';

export function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Alimenta a tu mejor amigo con 
                <span className="text-orange-200"> calidad premium</span>
              </h1>
              <p className="text-xl mb-8 text-orange-100">
                Descubre nuestra selección de alimentos para perros de todas las edades. 
                Nutrición balanceada para una vida saludable y feliz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors inline-flex items-center justify-center"
                >
                  Ver Productos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/offers"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors inline-flex items-center justify-center"
                >
                  Ofertas Especiales
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Perro feliz comiendo"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold text-gray-800">4.9/5</span>
                  <span className="text-gray-600">+1000 reseñas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Envío Gratis</h3>
              <p className="text-gray-600">En compras superiores a $50.000 COP</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Calidad Garantizada</h3>
              <p className="text-gray-600">Productos premium de marcas reconocidas</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Amor por las Mascotas</h3>
              <p className="text-gray-600">Cuidamos la salud y felicidad de tu perro</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Encuentra el alimento perfecto
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tenemos opciones especializadas para cada etapa de la vida de tu mascota
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/products?age_group=puppy" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src="https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Cachorro"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Cachorros</h3>
                  <p className="text-gray-600 mb-4">
                    Nutrición especial para el crecimiento saludable
                  </p>
                  <span className="text-orange-600 font-medium group-hover:underline">
                    Ver productos →
                  </span>
                </div>
              </div>
            </Link>

            <Link to="/products?age_group=adult" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src="https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Perro adulto"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Adultos</h3>
                  <p className="text-gray-600 mb-4">
                    Alimentación balanceada para perros activos
                  </p>
                  <span className="text-orange-600 font-medium group-hover:underline">
                    Ver productos →
                  </span>
                </div>
              </div>
            </Link>

            <Link to="/products?age_group=senior" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src="https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Perro senior"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Senior</h3>
                  <p className="text-gray-600 mb-4">
                    Cuidado especial para perros mayores
                  </p>
                  <span className="text-orange-600 font-medium group-hover:underline">
                    Ver productos →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Necesitas ayuda para elegir?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Nuestros expertos te ayudan a encontrar el alimento perfecto para tu mascota
          </p>
          <Link
            to="/contact"
            className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors inline-flex items-center"
          >
            Contactar Experto
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}