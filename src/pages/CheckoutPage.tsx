import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { CreditCard, MapPin, Phone } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { apiClient } from '../lib/api';
import { formatPrice } from '../utils/format';
import toast from 'react-hot-toast';

const checkoutSchema = z.object({
  shipping_address: z.string().min(10, 'La dirección debe tener al menos 10 caracteres'),
  phone: z.string().min(10, 'El teléfono debe tener al menos 10 dígitos'),
  notes: z.string().optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, clearCart } = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  const createOrderMutation = useMutation({
    mutationFn: (orderData: CheckoutForm) => apiClient.createOrder(orderData),
    onSuccess: (response) => {
      clearCart();
      toast.success('¡Pedido realizado exitosamente!');
      navigate(`/orders/${response.data.id}`);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Error al procesar el pedido');
    },
  });

  const onSubmit = (data: CheckoutForm) => {
    createOrderMutation.mutate(data);
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  if (!cart || cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Shipping Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Información de Envío
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dirección de Envío *
                  </label>
                  <textarea
                    {...register('shipping_address')}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Ingresa tu dirección completa..."
                  />
                  {errors.shipping_address && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.shipping_address.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono de Contacto *
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Ej: 3001234567"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notas Adicionales
                  </label>
                  <textarea
                    {...register('notes')}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Instrucciones especiales para la entrega..."
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Método de Pago
              </h3>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-orange-800 font-medium mb-2">
                  Pago Contra Entrega
                </p>
                <p className="text-orange-700 text-sm">
                  Pagarás en efectivo al momento de recibir tu pedido.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={createOrderMutation.isPending}
              className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {createOrderMutation.isPending ? 'Procesando...' : 'Confirmar Pedido'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Resumen del Pedido
          </h3>
          
          <div className="space-y-4 mb-6">
            {cart.items.map((item) => (
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

          <div className="space-y-3 border-t pt-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{formatPrice(cart.total_amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Envío</span>
              <span className="font-medium text-green-600">Gratis</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-orange-600">{formatPrice(cart.total_amount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}