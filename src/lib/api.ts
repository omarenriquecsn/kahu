import { ApiResponse, PaginatedResponse, Product, Category, Order, ProductFilters } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || 'Something went wrong');
    }

    return response.json();
  }

  // Products
  async getProducts(filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.append(key, value.toString());
        }
      });
    }
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<PaginatedResponse<Product>>(`/products${query}`);
  }

  async getProduct(id: string): Promise<ApiResponse<Product>> {
    return this.request<ApiResponse<Product>>(`/products/${id}`);
  }

  // Categories
  async getCategories(): Promise<ApiResponse<Category[]>> {
    return this.request<ApiResponse<Category[]>>('/categories');
  }

  // Cart
  async getCart(): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>('/cart');
  }

  async addToCart(productId: string, quantity: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId, quantity }),
    });
  }

  async updateCartItem(itemId: string, quantity: number): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/cart/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  }

  async removeFromCart(itemId: string): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>(`/cart/items/${itemId}`, {
      method: 'DELETE',
    });
  }

  async clearCart(): Promise<ApiResponse<any>> {
    return this.request<ApiResponse<any>>('/cart/clear', {
      method: 'DELETE',
    });
  }

  // Orders
  async createOrder(orderData: any): Promise<ApiResponse<Order>> {
    return this.request<ApiResponse<Order>>('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrders(): Promise<ApiResponse<Order[]>> {
    return this.request<ApiResponse<Order[]>>('/orders');
  }

  async getOrder(id: string): Promise<ApiResponse<Order>> {
    return this.request<ApiResponse<Order>>(`/orders/${id}`);
  }
}

export const apiClient = new ApiClient();