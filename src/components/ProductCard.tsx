import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart, Eye, Clock, Leaf, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart, Product } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', product });
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from Wishlist" : "Added to Wishlist",
      description: isLiked 
        ? `${product.name} removed from your wishlist.`
        : `${product.name} added to your wishlist.`,
    });
  };

  const rating = 4.8;
  const reviewCount = Math.floor(Math.random() * 200) + 50;

  return (
    <Card className="group product-card overflow-hidden border-0 bg-white shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-3">
      <div className="relative overflow-hidden">
        {/* Product Image */}
        <div className="relative bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-56 object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            </div>
          )}
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          {product.inStock ? (
            <Badge className="bg-green-500/90 text-white border-0 shadow-lg backdrop-blur">
              <Leaf className="h-3 w-3 mr-1" />
              In Stock
            </Badge>
          ) : (
            <Badge className="bg-red-500/90 text-white border-0 shadow-lg backdrop-blur">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Discount Badge */}
        <div className="absolute top-3 right-3">
          <Badge className="bg-primary/90 text-white border-0 shadow-lg backdrop-blur">
            -15%
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLike}
            className={`bg-white/90 backdrop-blur hover:bg-white shadow-lg transition-all duration-300 ${
              isLiked ? 'text-red-500' : 'text-gray-600'
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
          <Link to={`/product/${product.id}`}>
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/90 backdrop-blur hover:bg-white shadow-lg text-gray-600"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <CardContent className="p-6">
        {/* Category */}
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="text-xs border-primary/20 text-primary bg-primary/5">
            {product.category}
          </Badge>
          <div className="flex items-center space-x-1">
            <Award className="h-3 w-3 text-yellow-500" />
            <span className="text-xs text-muted-foreground font-medium">Premium</span>
          </div>
        </div>

        {/* Product Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2 leading-tight">
            {product.name}
          </h3>
        </Link>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-3 w-3 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-sm font-medium text-foreground">{rating}</span>
          <span className="text-xs text-muted-foreground">({reviewCount} reviews)</span>
        </div>
        
        {/* Price and Weight */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary">₹{product.price}</span>
            <span className="text-xs text-muted-foreground line-through">₹{Math.floor(product.price * 1.15)}</span>
          </div>
          <div className="flex items-center space-x-1 bg-muted/50 rounded-full px-3 py-1">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium">{product.weight}</span>
          </div>
        </div>

        {/* Shelf Life */}
        <div className="flex items-center space-x-2 mb-4 text-xs text-muted-foreground">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Shelf life: {product.shelfLife}</span>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex space-x-3">
        <Link to={`/product/${product.id}`} className="flex-1">
          <Button 
            variant="outline" 
            className="w-full border-2 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
          >
            <Eye className="h-4 w-4 mr-2" />
            Quick View
          </Button>
        </Link>
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="flex-1 bg-gradient-primary hover:opacity-90 text-white border-0 shadow-lg hover:shadow-glow transition-all duration-300 disabled:opacity-50"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;