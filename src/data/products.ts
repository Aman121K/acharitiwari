import { Product } from '@/contexts/CartContext';
import redChiliAachar from '@/assets/red-chili-aachar.jpg';
import mixedAacharCollection from '@/assets/mixed-aachar-collection.jpg';
import limePickle from '@/assets/lime-pickle.jpg';
import mangoAachar from '@/assets/mango-aachar.jpg';
import garlicPickle from '@/assets/garlic-pickle.jpg';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Red Chili Aachar',
    price: 299,
    image: redChiliAachar,
    description: 'Authentic Rajasthani red chili pickle made with premium red chilies, mustard oil, and traditional spices. A fiery and flavorful addition to any meal.',
    category: 'Chili Pickles',
    weight: '500g',
    ingredients: ['Red Chilies', 'Mustard Oil', 'Salt', 'Fenugreek Seeds', 'Asafoetida', 'Turmeric'],
    shelfLife: '12 months',
    inStock: true,
  },
  {
    id: '2',
    name: 'Traditional Mango Aachar',
    price: 349,
    image: mangoAachar,
    description: 'Classic raw mango pickle prepared with aromatic spices and mustard oil. Sweet, tangy, and spicy flavors in perfect harmony.',
    category: 'Fruit Pickles',
    weight: '400g',
    ingredients: ['Raw Mango', 'Mustard Oil', 'Red Chili Powder', 'Salt', 'Fennel Seeds', 'Nigella Seeds'],
    shelfLife: '10 months',
    inStock: true,
  },
  {
    id: '3',
    name: 'Fresh Lime Pickle',
    price: 249,
    image: limePickle,
    description: 'Zesty lime pickle bursting with citrus flavors and aromatic spices. Perfect accompaniment for rice and dal.',
    category: 'Citrus Pickles',
    weight: '300g',
    ingredients: ['Fresh Lime', 'Salt', 'Green Chilies', 'Curry Leaves', 'Mustard Seeds', 'Oil'],
    shelfLife: '8 months',
    inStock: true,
  },
  {
    id: '4',
    name: 'Garlic Pickle Delight',
    price: 279,
    image: garlicPickle,
    description: 'Rich and aromatic garlic pickle with a perfect blend of spices. Known for its health benefits and incredible taste.',
    category: 'Vegetable Pickles',
    weight: '350g',
    ingredients: ['Fresh Garlic', 'Mustard Oil', 'Red Chili Powder', 'Salt', 'Carom Seeds', 'Black Mustard Seeds'],
    shelfLife: '15 months',
    inStock: true,
  },
  {
    id: '5',
    name: 'Mixed Vegetable Aachar',
    price: 399,
    image: mixedAacharCollection,
    description: 'A delightful combination of seasonal vegetables pickled to perfection. Contains carrots, turnips, cauliflower, and green chilies.',
    category: 'Mixed Pickles',
    weight: '600g',
    ingredients: ['Mixed Vegetables', 'Mustard Oil', 'Spice Mix', 'Salt', 'Vinegar', 'Turmeric'],
    shelfLife: '12 months',
    inStock: false,
  },
  {
    id: '6',
    name: 'Spicy Ginger Pickle',
    price: 269,
    image: redChiliAachar, // Reusing for now
    description: 'Fresh ginger pickle with a kick of spices. Great for digestion and adds a zing to your meals.',
    category: 'Root Pickles',
    weight: '250g',
    ingredients: ['Fresh Ginger', 'Lemon Juice', 'Salt', 'Red Chili Powder', 'Mustard Oil', 'Fenugreek Powder'],
    shelfLife: '6 months',
    inStock: true,
  },
];

export const featuredProducts = products.slice(0, 4);
export const categories = Array.from(new Set(products.map(p => p.category)));

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};