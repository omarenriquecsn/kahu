// User Types
export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthUser {
  user: User | null;
  session: any;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: string;
  brand: string;
  weight: string; // e.g., "15kg", "3kg"
  age_group: 'puppy' | 'adult' | 'senior' | 'all';
  stock_quantity: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  is_active: boolean;
}

// Cart Types
export interface CartItem {
  id: string;
  product_id: string;
  product: Product;
  quantity: number;
  price: number; // Price at the time of adding to cart
}

export interface Cart {
  id: string;
  user_id: string;
  items: CartItem[];
  total_amount: number;
  created_at: string;
  updated_at: string;
}

// Order Types
export interface Order {
  id: string;
  user_id: string;
  user: User;
  items: OrderItem[];
  total_amount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address: string;
  phone: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product: Product;
  quantity: number;
  price: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
}

export interface CheckoutForm {
  shipping_address: string;
  phone: string;
  notes?: string;
}

// Filter Types
export interface ProductFilters {
  category_id?: string;
  brand?: string;
  age_group?: string;
  min_price?: number;
  max_price?: number;
  search?: string;
}