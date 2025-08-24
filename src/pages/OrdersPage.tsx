import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { apiClient } from '../lib/api';
import { formatPrice, formatDateTime } from '../utils/format';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';

export function OrdersPage() {
  const { user } = useAuth();

  const { data: ordersData, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => apiClient.getOrders(),
    enabled: !!user,
  });

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600">Debes iniciar sesión para ver tus pedidos</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner />
      </div>
    );
  }

  const orders = ordersData?.data || [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'confirmed':
      case 'processing':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'shipped':
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: 'Pendiente',
      confirmed: 'Confirmado',
      processing: 'Procesando',
      shipped: 'Enviado',
      delivered: 'Entregado',
      cancelled: 'Cancelado',
    };
    return statusMap[status] || status;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Mis Pedidos</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            No tienes pedidos aún
          </h2>
          <p className="text-gray-600">
            Cuando realices tu primera compra, aparecerá aquí
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Pedido #{order.id.slice(-8)}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {formatDateTime(order.created_at)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(order.status)}
                  <span className="font-medium text-gray-800">
                    {getStatusText(order.status)}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.product.name}</p>
                      <p className="text-gray-600 text-xs">
                        {item.product.brand} - Cantidad: {item.quantity}
                      </p>
                    </div>
                    <span className="font-medium text-sm">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <p>Dirección: {order.shipping_address}</p>
                  <p>Teléfono: {order.phone}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-orange-600">
                    Total: {formatPrice(order.total_amount)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}