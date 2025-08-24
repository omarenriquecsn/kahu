import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../lib/api';
import toast from 'react-hot-toast';

export function useCart() {
  const queryClient = useQueryClient();

  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: () => apiClient.getCart(),
  });

  const addToCartMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      apiClient.addToCart(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Producto agregado al carrito');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Error al agregar al carrito');
    },
  });

  const updateCartItemMutation = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      apiClient.updateCartItem(itemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Error al actualizar carrito');
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: (itemId: string) => apiClient.removeFromCart(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Producto eliminado del carrito');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Error al eliminar del carrito');
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: () => apiClient.clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Carrito vaciado');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Error al vaciar carrito');
    },
  });

  return {
    cart: cart?.data,
    isLoading,
    addToCart: addToCartMutation.mutate,
    updateCartItem: updateCartItemMutation.mutate,
    removeFromCart: removeFromCartMutation.mutate,
    clearCart: clearCartMutation.mutate,
    isAddingToCart: addToCartMutation.isPending,
  };
}