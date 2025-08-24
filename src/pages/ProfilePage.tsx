import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { User, Mail, Phone, MapPin } from 'lucide-react';

export function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600">Debes iniciar sesión para ver tu perfil</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Mi Perfil</h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-gray-400" />
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre Completo
              </label>
              <p className="text-gray-800">{user.full_name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-gray-400" />
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="text-gray-800">{user.email}</p>
            </div>
          </div>

          {user.phone && (
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Teléfono
                </label>
                <p className="text-gray-800">{user.phone}</p>
              </div>
            </div>
          )}

          {user.address && (
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Dirección
                </label>
                <p className="text-gray-800">{user.address}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}