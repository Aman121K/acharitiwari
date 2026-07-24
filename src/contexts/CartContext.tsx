import React, { createContext, useContext, useEffect, useReducer, ReactNode } from 'react';
import { apiRequest } from '@/lib/api';
import { customerVariantLabel, customerVariantSize, type ProductVariant } from '@/lib/productVariants';

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
  variants?: ProductVariant[];
  variantSku?: string;
  variantLabel?: string;
  variantSize?: string;
  inventory?: number;
}

export interface CartItem extends Product {
  quantity: number;
  lineId: string;
  variantSku?: string;
  variantLabel: string;
  variantSize?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; product: Product }
  | { type: 'REMOVE_FROM_CART'; lineId: string }
  | { type: 'UPDATE_QUANTITY'; lineId: string; quantity: number }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const lineId = createLineId(action.product.id, action.product.sku);
      const existingItem = state.items.find(item => item.lineId === lineId);
      
      if (existingItem) {
        if(existingItem.quantity>=Math.max(0,existingItem.inventory??25))return state;
        const updatedItems = state.items.map(item =>
          item.lineId === lineId
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
        items: [...state.items, { ...action.product, lineId, variantSku:action.product.variantSku||action.product.sku, variantLabel:action.product.variantLabel||action.product.weight||'Standard pack', variantSize:action.product.variantSize, quantity: 1 } as CartItem],
        total: state.total + action.product.price,
        itemCount: state.itemCount + 1,
      };
    }
    
    case 'REMOVE_FROM_CART': {
      const itemToRemove = state.items.find(item => item.lineId === action.lineId);
      if (!itemToRemove) return state;
      
      return {
        ...state,
        items: state.items.filter(item => item.lineId !== action.lineId),
        total: state.total - (itemToRemove.price * itemToRemove.quantity),
        itemCount: state.itemCount - itemToRemove.quantity,
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const item = state.items.find(item => item.lineId === action.lineId);
      if (!item) return state;
      
      const cappedQuantity=Math.min(action.quantity,Math.max(1,item.inventory??25));
      const cappedDiff=cappedQuantity-item.quantity;
      
      if (action.quantity === 0) {
        return {
          ...state,
          items: state.items.filter(item => item.lineId !== action.lineId),
          total: state.total - (item.price * item.quantity),
          itemCount: state.itemCount - item.quantity,
        };
      }
      
      const updatedItems = state.items.map(item =>
        item.lineId === action.lineId
          ? { ...item, quantity: cappedQuantity }
          : item
      );
      
      return {
        ...state,
        items: updatedItems,
        total: state.total + (item.price * cappedDiff),
        itemCount: state.itemCount + cappedDiff,
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

export const createLineId = (productId:string, sku?:string) => `${productId}::${sku?.trim() || 'legacy'}`;

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
    if (!saved) return initialState;
    const parsed=JSON.parse(saved) as Partial<CartState>;
    const items=(Array.isArray(parsed.items)?parsed.items:[]).filter((item):item is CartItem=>Boolean(item&&item.id)).map(item=>({...item,lineId:item.lineId||createLineId(item.id,item.variantSku||item.sku),variantSku:item.variantSku||item.sku,variantLabel:customerVariantLabel({label:item.variantLabel,size:item.variantSize||item.weight}),variantSize:customerVariantSize({size:item.variantSize||item.weight}),quantity:Math.max(1,Number(item.quantity)||1),price:Math.max(0,Number(item.price)||0)}));
    return {items,total:items.reduce((sum,item)=>sum+item.price*item.quantity,0),itemCount:items.reduce((sum,item)=>sum+item.quantity,0)};
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
          items: state.items.map(item => ({ productId: item.id, name: item.name, price: item.price, quantity: item.quantity, image: item.image, sku:item.variantSku||item.sku, variantLabel:item.variantLabel, variantSize:item.variantSize })),
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
