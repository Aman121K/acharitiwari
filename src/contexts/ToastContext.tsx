import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Product } from './CartContext';
import { Link } from 'react-router-dom';

interface ToastData {
  product: Product;
  quantity: number;
}

interface ToastContextType {
  showToast: (product: Product, quantity?: number) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useGlobalToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useGlobalToast must be used within ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toastData, setToastData] = useState<ToastData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showToast = (product: Product, quantity: number = 1) => {
    setToastData({ product, quantity });
    setIsVisible(true);
  };

  const hideToast = () => {
    setIsVisible(false);
    setTimeout(() => setToastData(null), 300); // Wait for animation to complete
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Global Toast - Fixed to viewport */}
      {toastData && (
        <GlobalAddToCartToast
          isVisible={isVisible}
          onClose={hideToast}
          product={toastData.product}
          quantity={toastData.quantity}
        />
      )}
    </ToastContext.Provider>
  );
};

// Global Toast Component
import { CheckCircle, ShoppingCart, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useEffect } from 'react';

interface GlobalAddToCartToastProps {
  isVisible: boolean;
  onClose: () => void;
  product: Product;
  quantity: number;
}

const GlobalAddToCartToast: React.FC<GlobalAddToCartToastProps> = ({ 
  isVisible, 
  onClose, 
  product, 
  quantity 
}) => {
  // Auto close after 4 seconds
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] animate-in slide-in-from-right duration-300">
      <div className="relative w-80 max-w-sm border border-[#c9b896] bg-[#fff8ed] p-4 shadow-[0_18px_50px_-24px_rgba(37,55,30,.55)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close cart confirmation"
          className="absolute right-1 top-1 z-10 flex h-11 w-11 items-center justify-center text-[#665746] transition hover:bg-[#eee4d3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b58a3c]"
        >
          <X className="h-3 w-3 text-gray-600" />
        </button>

        {/* Success Header */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex h-8 w-8 items-center justify-center bg-[#173d23]">
            <CheckCircle className="h-5 w-5 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#173d23]">Added to cart</h4>
            <p className="text-xs text-gray-500">Item successfully added</p>
          </div>
        </div>

        {/* Product Details */}
        <Link to="/cart" onClick={onClose} className="flex space-x-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={`View ${product.name}, ${product.weight}, in cart`}>
          {/* Product Image */}
          <div className="flex-shrink-0">
            <div className="h-14 w-14 overflow-hidden rounded-md bg-[#f4eee3] p-1">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIHZpZXdCb3g9IjAgMCA1NiA1NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNi45MTY3IDI4SDM5LjA4MzMiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHA+PC9wYXRoPgo8L3N2Zz4K';
                }}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <h5 className="font-medium text-gray-900 text-sm leading-tight mb-1 line-clamp-2">
              {product.name}
            </h5>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-sm font-semibold text-primary">₹{product.price}</span>
              {quantity > 1 && (
                <Badge variant="secondary" className="text-xs px-1 py-0">
                  Qty: {quantity}
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200 px-1 py-0">
                ✓ In Stock
              </Badge>
              <span className="text-xs text-gray-500">{product.variantLabel||product.weight}{product.variantSize&&product.variantSize!==(product.variantLabel||product.weight)?` · ${product.variantSize}`:''}</span>
            </div>
          </div>
        </Link>

        {/* Quick Action */}
        <div className="mt-3 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {quantity > 1 ? `Total: ₹${product.price * quantity}` : 'Added to your cart'}
            </span>
            <Link to="/cart" onClick={onClose} className="flex min-h-11 items-center text-xs font-bold text-primary underline underline-offset-4">
              <ShoppingCart className="h-3 w-3 mr-1" />
              <span>View Cart</span>
            </Link>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className="bg-green-500 h-1 rounded-full animate-progress" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};
