import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart, Eye, Clock, Leaf, Award, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart, Product } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useGlobalToast } from '@/contexts/ToastContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();
  const { toast } = useToast();
  const { showToast } = useGlobalToast();
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', product });
    showToast(product, 1);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? 'Removed from Wishlist' : 'Added to Wishlist',
      description: isLiked ? `${product.name} removed from your wishlist.` : `${product.name} added to your wishlist.`,
    });
  };

  const rating = 4.8;
  const reviewCount = Math.floor(Math.random() * 200) + 50;

  return (
    <Card className="group product-card overflow-hidden border-0 bg-white/90">
      <div className="relative overflow-hidden">
        <div className="relative bg-gradient-to-br from-muted to-white">
          <img
            src={product.image}
            alt={product.name}
            className={`h-60 w-full object-cover transition-all duration-700 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200/80 animate-pulse">
              <div className="h-16 w-16 rounded-full bg-gray-300" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>

        <div className="absolute left-3 top-3 flex gap-2">
          {product.inStock ? (
            <Badge className="border-0 bg-emerald-600/95 text-white shadow-lg backdrop-blur">
              <Leaf className="mr-1 h-3 w-3" /> In stock
            </Badge>
          ) : (
            <Badge className="border-0 bg-red-500/95 text-white shadow-lg backdrop-blur">Out of stock</Badge>
          )}
          <Badge className="border-0 bg-primary/95 text-white shadow-lg backdrop-blur">-15%</Badge>
        </div>

        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 translate-y-2 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Button variant="ghost" size="icon" onClick={handleLike} className={`bg-white/90 shadow-lg backdrop-blur ${isLiked ? 'text-red-500' : 'text-gray-700'}`}>
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
          <Button asChild variant="ghost" size="icon" className="bg-white/90 text-gray-700 shadow-lg backdrop-blur">
            <Link to={`/product/${product.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="mb-3 flex items-center justify-between">
          <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary">
            {product.category}
          </Badge>
          <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <Award className="h-3.5 w-3.5 text-yellow-500" /> Premium
          </div>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

        <div className="mb-4 flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className="text-sm font-medium text-foreground">{rating}</span>
          <span className="text-xs text-muted-foreground">({reviewCount} reviews)</span>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-primary">₹{product.price}</p>
            <p className="text-xs text-muted-foreground line-through">₹{Math.floor(product.price * 1.15)}</p>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-muted/80 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {product.weight}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          Shelf life: {product.shelfLife}
        </div>
      </CardContent>

      <CardFooter className="flex gap-3 p-6 pt-0">
        <Button asChild variant="outline" className="flex-1 border-2 hover:border-primary/50 hover:bg-primary/5">
          <Link to={`/product/${product.id}`}>
            <Eye className="mr-2 h-4 w-4" /> Quick view
          </Link>
        </Button>
        <Button onClick={handleAddToCart} disabled={!product.inStock} className="flex-1 bg-gradient-primary text-white shadow-lg hover:shadow-glow">
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;