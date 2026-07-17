import React, { createContext, useContext, useEffect, useReducer, ReactNode } from 'react';
import { apiRequest } from '@/lib/api';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  categoryId?: string;
  categorySlug?: string;
  weight: string;
  ingredients: string[];
  shelfLife: string;
  inStock: boolean;
  slug?: string;
  images?: string[];
  subCategory?: string;
  subCategoryId?: string;
  subCategorySlug?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  sku?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; product: Product }
  | { type: 'REMOVE_FROM_CART'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.product.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        
        return {
          ...state,
          items: updatedItems,
          total: state.total + action.product.price,
          itemCount: state.itemCount + 1,
        };
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.product, quantity: 1 }],
        total: state.total + action.product.price,
        itemCount: state.itemCount + 1,
      };
    }
    
    case 'REMOVE_FROM_CART': {
      const itemToRemove = state.items.find(item => item.id === action.productId);
      if (!itemToRemove) return state;
      
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.productId),
        total: state.total - (itemToRemove.price * itemToRemove.quantity),
        itemCount: state.itemCount - itemToRemove.quantity,
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const item = state.items.find(item => item.id === action.productId);
      if (!item) return state;
      
      const quantityDiff = action.quantity - item.quantity;
      
      if (action.quantity === 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.productId),
          total: state.total - (item.price * item.quantity),
          itemCount: state.itemCount - item.quantity,
        };
      }
      
      const updatedItems = state.items.map(item =>
        item.id === action.productId
          ? { ...item, quantity: action.quantity }
          : item
      );
      
      return {
        ...state,
        items: updatedItems,
        total: state.total + (item.price * quantityDiff),
        itemCount: state.itemCount + quantityDiff,
      };
    }
    
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
        itemCount: 0,
      };
      
    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

export const getCartSessionId = () => {
  const existing = window.localStorage.getItem('achari-cart-session');
  if (existing) return existing;
  const sessionId = typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
  window.localStorage.setItem('achari-cart-session', sessionId);
  return sessionId;
};

const getInitialState = (): CartState => {
  if (typeof window === 'undefined') return initialState;
  try {
    const saved = window.localStorage.getItem('achari-cart');
    return saved ? JSON.parse(saved) : initialState;
  } catch {
    return initialState;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, undefined, getInitialState);

  useEffect(() => {
    window.localStorage.setItem('achari-cart', JSON.stringify(state));
    const timer = window.setTimeout(() => {
      void apiRequest('/cart', {
        method: 'PUT',
        body: JSON.stringify({
          sessionId: getCartSessionId(),
          items: state.items.map(item => ({ productId: item.id, name: item.name, price: item.price, quantity: item.quantity, image: item.image, sku: item.sku })),
        }),
      }).catch(() => undefined);
    }, 600);
    return () => window.clearTimeout(timer);
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
