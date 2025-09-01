// Import blog images
import spiceMarketHero from '@/assets/spice-market-hero.jpg';
import redChiliAachar from '@/assets/red-chili-aachar.jpg';
import mixedAacharCollection from '@/assets/mixed-aachar-collection.jpg';
import limePickle from '@/assets/lime-pickle.jpg';
import mangoAachar from '@/assets/mango-aachar.jpg';
import garlicPickle from '@/assets/garlic-pickle.jpg';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  likes: number;
  tags: string[];
  isLiked?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Ancient Art of Pickle Making: A Journey Through Indian Traditions',
    excerpt: 'Discover the rich history and traditional methods of making authentic Indian pickles that have been passed down through generations.',
    content: `
      <h2>The Heritage of Indian Pickle Making</h2>
      <p>Indian pickle making, or "aachar banane ki kala," is an ancient culinary art that dates back thousands of years. This traditional practice has been the backbone of Indian households, ensuring that the bounty of seasonal fruits and vegetables could be preserved and enjoyed throughout the year.</p>
      
      <h3>Origins and Historical Significance</h3>
      <p>The art of pickling in India can be traced back to the Vedic period, where references to preserved foods appear in ancient texts. During the Mughal era, royal kitchens elevated pickle making to new heights, introducing exotic spices and innovative techniques that are still used today.</p>
      
      <h3>Traditional Methods and Techniques</h3>
      <p>Traditional Indian pickle making relies on four fundamental elements:</p>
      <ul>
        <li><strong>Salt:</strong> Acts as a natural preservative and draws out moisture</li>
        <li><strong>Oil:</strong> Creates an anaerobic environment preventing spoilage</li>
        <li><strong>Spices:</strong> Add flavor and possess antimicrobial properties</li>
        <li><strong>Acid:</strong> Usually from citrus or fermentation, prevents bacterial growth</li>
      </ul>
      
      <h3>Regional Variations</h3>
      <p>Every region in India has its unique approach to pickle making:</p>
      <ul>
        <li><strong>North India:</strong> Heavy use of mustard oil and fenugreek</li>
        <li><strong>South India:</strong> Coconut oil base with curry leaves and tamarind</li>
        <li><strong>West India:</strong> Jaggery-based sweet pickles</li>
        <li><strong>East India:</strong> Fish pickles and unique fermentation techniques</li>
      </ul>
      
      <h3>The Science Behind the Art</h3>
      <p>Modern food science has validated what our ancestors knew intuitively. The combination of salt, acid, and oil creates an environment hostile to harmful bacteria while promoting beneficial fermentation. The spices used not only enhance flavor but also provide additional antimicrobial protection.</p>
      
      <h3>Preserving Tradition in Modern Times</h3>
      <p>At AachariTiwari, we honor these ancient traditions while adapting to modern food safety standards. Our manufacturing process maintains the authenticity of traditional recipes while ensuring consistent quality and safety for our customers.</p>
      
      <p>Every jar of our aachar represents centuries of culinary wisdom, passed down through generations of expert pickle makers. When you taste our products, you're not just enjoying a condiment – you're experiencing a piece of India's rich cultural heritage.</p>
    `,
    author: 'Priya Sharma',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Traditional Recipes',
    image: spiceMarketHero,
    likes: 245,
    tags: ['tradition', 'history', 'pickle making', 'indian cuisine', 'heritage']
  },
  {
    id: '2',
    title: 'Health Benefits of Fermented Foods: Why Pickles Are Good for You',
    excerpt: 'Learn about the amazing health benefits of fermented foods and how traditional Indian pickles can boost your gut health.',
    content: `
      <h2>The Probiotic Power of Pickles</h2>
      <p>Fermented foods like traditional Indian pickles are nutritional powerhouses that have been supporting human health for millennia. Recent scientific research has validated what traditional wisdom has long known – fermented foods are essential for optimal health.</p>
      
      <h3>Understanding Fermentation</h3>
      <p>Fermentation is a natural process where beneficial bacteria convert sugars and starches into lactic acid. This process not only preserves food but also creates beneficial compounds that support our health in numerous ways.</p>
      
      <h3>Gut Health Benefits</h3>
      <p>The human gut contains trillions of microorganisms that play crucial roles in:</p>
      <ul>
        <li><strong>Digestion:</strong> Breaking down complex nutrients</li>
        <li><strong>Immunity:</strong> 70% of immune system is in the gut</li>
        <li><strong>Mental Health:</strong> Gut-brain axis affects mood and cognition</li>
        <li><strong>Nutrient Synthesis:</strong> Production of vitamins B and K</li>
      </ul>
      
      <h3>Nutritional Advantages of Pickled Vegetables</h3>
      <p>Traditional Indian pickles offer several nutritional benefits:</p>
      <ul>
        <li><strong>Enhanced Bioavailability:</strong> Fermentation makes nutrients more easily absorbed</li>
        <li><strong>Increased Vitamin Content:</strong> Fermentation can increase levels of certain B vitamins</li>
        <li><strong>Preserved Nutrients:</strong> Pickling preserves vitamins that might be lost in cooking</li>
        <li><strong>Antioxidant Properties:</strong> Many pickle spices are rich in antioxidants</li>
      </ul>
      
      <h3>Specific Health Benefits</h3>
      <h4>Digestive Health</h4>
      <p>Fermented pickles contain beneficial bacteria that support digestive health by promoting regular bowel movements and reducing digestive discomfort.</p>
      
      <h4>Immune System Support</h4>
      <p>The probiotics in fermented pickles help maintain a healthy balance of gut bacteria, which is crucial for a strong immune system.</p>
      
      <h4>Heart Health</h4>
      <p>Some studies suggest that fermented foods may help lower cholesterol levels and support cardiovascular health.</p>
      
      <h3>Incorporating Pickles into a Healthy Diet</h3>
      <p>While pickles offer health benefits, moderation is key due to their salt content. Here are some tips:</p>
      <ul>
        <li>Enjoy small portions as condiments rather than main dishes</li>
        <li>Balance with plenty of fresh fruits and vegetables</li>
        <li>Choose traditionally fermented varieties over quick pickles</li>
        <li>Look for pickles made with minimal additives</li>
      </ul>
      
      <h3>The AachariTiwari Difference</h3>
      <p>Our traditional fermentation process ensures that our pickles retain maximum probiotic benefits while delivering authentic flavors. We use time-tested methods that promote beneficial bacterial growth while maintaining food safety standards.</p>
    `,
    author: 'Dr. Amit Gupta',
    date: '2024-01-12',
    readTime: '7 min read',
    category: 'Health & Nutrition',
    image: garlicPickle,
    likes: 189,
    tags: ['health', 'probiotics', 'nutrition', 'fermentation', 'gut health']
  },
  {
    id: '3',
    title: '10 Creative Ways to Use Aachar in Modern Cooking',
    excerpt: 'Explore innovative ways to incorporate traditional pickles into contemporary dishes and fusion cuisine.',
    content: `
      <h2>Transforming Traditional Flavors</h2>
      <p>Traditional Indian pickles (aachar) are versatile ingredients that can elevate modern dishes with their complex flavors. Here are creative ways to incorporate these flavor bombs into contemporary cooking.</p>
      
      <h3>1. Aachar-Spiced Pasta</h3>
      <p>Transform your regular pasta by tossing it with olive oil infused with mango pickle masala. The tangy, spicy flavors create an Indo-Italian fusion that's absolutely delicious.</p>
      
      <h3>2. Pickle-Marinated Grilled Proteins</h3>
      <p>Use lime pickle or mixed vegetable pickle as a marinade for chicken, fish, or paneer. The acidic content tenderizes the protein while infusing incredible flavor.</p>
      
      <h3>3. Aachar Flatbread Toppings</h3>
      <p>Spread cream cheese on naan or pita bread and top with chopped pickles, fresh herbs, and a drizzle of honey for a gourmet appetizer.</p>
      
      <h3>4. Pickle-Infused Salad Dressings</h3>
      <p>Blend pickle juice with yogurt, mint, and a touch of honey to create unique salad dressings that add punch to ordinary greens.</p>
      
      <h3>5. Aachar Fried Rice</h3>
      <p>Add finely chopped pickles to fried rice during the last few minutes of cooking. The pickles add both flavor and texture to this fusion dish.</p>
      
      <h3>6. Pickle-Stuffed Parathas</h3>
      <p>Create innovative stuffed parathas by mixing mashed potatoes with chopped pickles and fresh herbs for a tangy twist on the classic.</p>
      
      <h3>7. Aachar Cocktail Garnish</h3>
      <p>Use pickle juice in cocktails or garnish drinks with pickle spears for a savory twist that pairs wonderfully with gin or vodka-based drinks.</p>
      
      <h3>8. Pickle-Crusted Fish</h3>
      <p>Coat fish fillets with a mixture of breadcrumbs and finely ground pickle spices for a flavorful crust that bakes to golden perfection.</p>
      
      <h3>9. Aachar Sandwich Spreads</h3>
      <p>Mix cream cheese or butter with finely chopped pickles to create gourmet sandwich spreads that transform ordinary sandwiches.</p>
      
      <h3>10. Pickle-Infused Soups</h3>
      <p>Add a spoonful of pickle to lentil soups or broths near the end of cooking for an instant flavor boost and probiotic benefits.</p>
      
      <h3>Tips for Cooking with Aachar</h3>
      <ul>
        <li>Start with small amounts – pickle flavors are concentrated</li>
        <li>Add pickles towards the end of cooking to preserve their texture</li>
        <li>Balance the saltiness by reducing other salt in the recipe</li>
        <li>Experiment with different pickle varieties for unique flavor profiles</li>
        <li>Store opened pickles properly to maintain freshness</li>
      </ul>
      
      <h3>Fusion Cooking Philosophy</h3>
      <p>The key to successful fusion cooking with aachar is respecting both the traditional flavors and the modern techniques. At AachariTiwari, we encourage culinary creativity while honoring the authentic taste that makes our pickles special.</p>
    `,
    author: 'Chef Rakesh Kumar',
    date: '2024-01-10',
    readTime: '6 min read',
    category: 'Cooking Tips',
    image: mixedAacharCollection,
    likes: 156,
    tags: ['cooking', 'fusion', 'recipes', 'creative', 'modern']
  },
  {
    id: '4',
    title: 'Seasonal Pickles: Making the Most of Fresh Produce',
    excerpt: 'A guide to creating delicious seasonal pickles using fresh, locally sourced ingredients throughout the year.',
    content: `
      <h2>Embracing Seasonal Abundance</h2>
      <p>Seasonal pickle making is an art that connects us with nature's rhythm. By using fresh, seasonal produce, we create pickles that capture the essence of each season while supporting local farmers and sustainable practices.</p>
      
      <h3>Spring Delights (March - May)</h3>
      <h4>Featured Ingredients:</h4>
      <ul>
        <li><strong>Raw Mangoes:</strong> The star of spring pickle season</li>
        <li><strong>Fresh Ginger:</strong> Young, tender rhizomes with delicate flavor</li>
        <li><strong>Green Chilies:</strong> Fresh, crisp, and moderately spicy</li>
        <li><strong>Tender Bamboo Shoots:</strong> Regional delicacy in eastern India</li>
      </ul>
      
      <h4>Popular Spring Pickles:</h4>
      <p><strong>Kairi Ka Aachar (Raw Mango Pickle):</strong> The quintessential spring pickle made with tender raw mangoes, mustard seeds, and aromatic spices.</p>
      
      <h3>Summer Harvest (June - August)</h3>
      <h4>Featured Ingredients:</h4>
      <ul>
        <li><strong>Limes:</strong> Peak season for the most aromatic varieties</li>
        <li><strong>Green Tomatoes:</strong> Firm and tangy, perfect for pickling</li>
        <li><strong>Garlic Scapes:</strong> Mild garlic flavor with tender texture</li>
        <li><strong>Fresh Turmeric:</strong> Earthy and vibrant when fresh</li>
      </ul>
      
      <h4>Summer Specialties:</h4>
      <p><strong>Nimbu Ka Aachar (Lime Pickle):</strong> Made with sun-dried limes that develop complex flavors through careful fermentation.</p>
      
      <h3>Monsoon Magic (July - September)</h3>
      <h4>Featured Ingredients:</h4>
      <ul>
        <li><strong>Fresh Chilies:</strong> Various regional varieties at their peak</li>
        <li><strong>Gourds:</strong> Bottle gourd and bitter gourd for unique pickles</li>
        <li><strong>Lotus Stems:</strong> Crunchy and nutritious aquatic vegetable</li>
        <li><strong>Wood Apple:</strong> Seasonal fruit with distinctive flavor</li>
      </ul>
      
      <h3>Winter Wonders (October - February)</h3>
      <h4>Featured Ingredients:</h4>
      <ul>
        <li><strong>Radishes:</strong> Crisp white radishes perfect for quick pickles</li>
        <li><strong>Turnips:</strong> Mild flavor that absorbs spices beautifully</li>
        <li><strong>Carrots:</strong> Sweet and crunchy, ideal for mixed pickles</li>
        <li><strong>Cauliflower:</strong> Firm florets that hold their shape</li>
      </ul>
      
      <h3>Benefits of Seasonal Pickling</h3>
      <h4>Nutritional Advantages:</h4>
      <ul>
        <li>Peak nutrient content in seasonal produce</li>
        <li>Natural variety in diet throughout the year</li>
        <li>Better flavor development from fresh ingredients</li>
        <li>Lower cost due to seasonal abundance</li>
      </ul>
      
      <h4>Environmental Benefits:</h4>
      <ul>
        <li>Reduced carbon footprint from local sourcing</li>
        <li>Support for local farming communities</li>
        <li>Preservation of regional varieties</li>
        <li>Sustainable food practices</li>
      </ul>
      
      <h3>Traditional Seasonal Wisdom</h3>
      <p>Our ancestors understood that different seasons require different types of pickles:</p>
      <ul>
        <li><strong>Spring:</strong> Cooling pickles to balance rising temperatures</li>
        <li><strong>Summer:</strong> Hydrating ingredients to combat heat</li>
        <li><strong>Monsoon:</strong> Warming spices to counter humidity</li>
        <li><strong>Winter:</strong> Hearty vegetables to provide sustenance</li>
      </ul>
      
      <h3>AachariTiwari's Seasonal Approach</h3>
      <p>We work closely with local farmers to source the finest seasonal produce. Our pickle calendar ensures that each product is made when its primary ingredients are at their absolute best, resulting in superior flavor and nutritional value.</p>
      
      <p>By choosing seasonal pickles, you're not just enjoying better taste – you're participating in a sustainable food system that honors traditional wisdom while supporting local communities.</p>
    `,
    author: 'Meera Patel',
    date: '2024-01-08',
    readTime: '5 min read',
    category: 'Seasonal Cooking',
    image: limePickle,
    likes: 203,
    tags: ['seasonal', 'fresh produce', 'sustainability', 'local', 'traditional']
  },
  {
    id: '5',
    title: 'The Science Behind Pickling: Understanding Fermentation',
    excerpt: 'Dive deep into the scientific processes that make pickling possible and how to achieve perfect results every time.',
    content: `
      <h2>The Microbiology of Pickle Making</h2>
      <p>Pickling is a fascinating intersection of art and science. Understanding the scientific principles behind fermentation can help us appreciate why traditional methods work so well and how to optimize them for consistent results.</p>
      
      <h3>Types of Pickling Processes</h3>
      <h4>1. Lactic Acid Fermentation</h4>
      <p>This is the most common process in traditional Indian pickles. Beneficial bacteria (primarily Lactobacillus species) convert sugars into lactic acid, creating the characteristic tangy flavor while preserving the food.</p>
      
      <h4>2. Acetic Acid Pickling</h4>
      <p>Uses vinegar or other acidic solutions to create an environment that prevents harmful bacterial growth while preserving food.</p>
      
      <h4>3. Salt-Cured Pickling</h4>
      <p>High salt concentrations draw out moisture and create an environment hostile to harmful bacteria while allowing beneficial microorganisms to thrive.</p>
      
      <h3>The Role of Key Ingredients</h3>
      <h4>Salt (Sodium Chloride)</h4>
      <ul>
        <li><strong>Osmotic Pressure:</strong> Draws out moisture from vegetables</li>
        <li><strong>Selective Pressure:</strong> Inhibits harmful bacteria while allowing beneficial ones</li>
        <li><strong>Flavor Enhancement:</strong> Concentrates natural flavors</li>
        <li><strong>Texture Preservation:</strong> Maintains crispness in vegetables</li>
      </ul>
      
      <h4>pH and Acidity</h4>
      <p>The ideal pH for pickles is below 4.6, which creates an environment where pathogenic bacteria cannot survive. This is achieved through:</p>
      <ul>
        <li>Natural fermentation producing lactic acid</li>
        <li>Addition of acidic ingredients like citrus juice</li>
        <li>Vinegar in quick-pickle methods</li>
      </ul>
      
      <h4>Oil as a Preservative</h4>
      <p>Oil serves multiple functions in Indian pickles:</p>
      <ul>
        <li><strong>Anaerobic Environment:</strong> Excludes oxygen, preventing oxidation</li>
        <li><strong>Flavor Carrier:</strong> Dissolves and distributes fat-soluble compounds</li>
        <li><strong>Moisture Barrier:</strong> Prevents contamination</li>
        <li><strong>Spice Integration:</strong> Allows spices to infuse throughout</li>
      </ul>
      
      <h3>Spices: More Than Just Flavor</h3>
      <p>Traditional pickle spices have antimicrobial properties:</p>
      <ul>
        <li><strong>Turmeric:</strong> Contains curcumin with antibacterial properties</li>
        <li><strong>Mustard Seeds:</strong> Release compounds that inhibit harmful bacteria</li>
        <li><strong>Fenugreek:</strong> Contains compounds that support beneficial fermentation</li>
        <li><strong>Asafoetida:</strong> Powerful antimicrobial agent</li>
        <li><strong>Red Chilies:</strong> Capsaicin has preservative qualities</li>
      </ul>
      
      <h3>The Fermentation Timeline</h3>
      <h4>Days 1-3: Initial Phase</h4>
      <ul>
        <li>Salt begins drawing out moisture</li>
        <li>pH starts to drop</li>
        <li>Initial bacterial colonization</li>
      </ul>
      
      <h4>Days 4-7: Active Fermentation</h4>
      <ul>
        <li>Lactic acid bacteria multiply rapidly</li>
        <li>pH drops significantly</li>
        <li>Characteristic sour taste develops</li>
      </ul>
      
      <h4>Weeks 2-4: Maturation</h4>
      <ul>
        <li>Flavor compounds develop complexity</li>
        <li>Texture reaches optimal state</li>
        <li>Microbial community stabilizes</li>
      </ul>
      
      <h3>Factors Affecting Fermentation</h3>
      <h4>Temperature</h4>
      <p>Optimal fermentation occurs at 68-78°F (20-25°C). Higher temperatures speed fermentation but may affect flavor development.</p>
      
      <h4>Salt Concentration</h4>
      <p>Typically 2-3% salt by weight creates optimal conditions for beneficial bacteria while inhibiting harmful ones.</p>
      
      <h4>Oxygen Exposure</h4>
      <p>Initial exposure helps establish beneficial bacteria, but prolonged exposure can lead to unwanted oxidation.</p>
      
      <h3>Quality Control Through Science</h3>
      <p>At AachariTiwari, we use scientific principles to ensure consistent quality:</p>
      <ul>
        <li>pH monitoring throughout fermentation</li>
        <li>Temperature-controlled fermentation chambers</li>
        <li>Microbial testing for safety and quality</li>
        <li>Standardized salt and oil ratios</li>
        <li>Regular quality assessments</li>
      </ul>
      
      <h3>Troubleshooting Common Issues</h3>
      <h4>Soft or Mushy Pickles</h4>
      <ul>
        <li>Insufficient salt concentration</li>
        <li>Over-fermentation</li>
        <li>Poor quality raw materials</li>
      </ul>
      
      <h4>Off Flavors</h4>
      <ul>
        <li>Contamination by harmful bacteria</li>
        <li>Improper pH levels</li>
        <li>Temperature fluctuations</li>
      </ul>
      
      <p>Understanding these scientific principles helps us appreciate why traditional pickle-making methods have stood the test of time while enabling us to optimize them for modern production.</p>
    `,
    author: 'Dr. Anjali Singh',
    date: '2024-01-05',
    readTime: '10 min read',
    category: 'Food Science',
    image: mangoAachar,
    likes: 178,
    tags: ['science', 'fermentation', 'microbiology', 'food safety', 'technical']
  },
  {
    id: '6',
    title: 'Regional Pickle Varieties: A Tour Across India',
    excerpt: 'Explore the diverse world of Indian pickles, from Gujarati sweet pickles to Bengali fish pickles.',
    content: `
      <h2>India's Pickle Diversity</h2>
      <p>India's vast geographic and cultural diversity is beautifully reflected in its pickle traditions. Each region has developed unique pickle varieties that reflect local ingredients, climate conditions, and cultural preferences.</p>
      
      <h3>Northern India: Bold and Robust</h3>
      <h4>Punjab & Haryana</h4>
      <p><strong>Signature Style:</strong> Heavy use of mustard oil and mustard seeds</p>
      <ul>
        <li><strong>Aam Ka Aachar:</strong> Raw mango pickle with fennel and nigella seeds</li>
        <li><strong>Gobi Aachar:</strong> Cauliflower pickle with warming spices</li>
        <li><strong>Shalgam Aachar:</strong> Turnip pickle perfect for winter</li>
      </ul>
      
      <h4>Rajasthan</h4>
      <p><strong>Signature Style:</strong> Desert adaptation with oil-heavy preservation</p>
      <ul>
        <li><strong>Ker Sangri:</strong> Wild berry and bean pickle, a desert delicacy</li>
        <li><strong>Lehsun Aachar:</strong> Garlic pickle with intense flavors</li>
        <li><strong>Gunda Aachar:</strong> Wild berry pickle unique to the region</li>
      </ul>
      
      <h3>Western India: Sweet and Tangy</h3>
      <h4>Gujarat</h4>
      <p><strong>Signature Style:</strong> Perfect balance of sweet, sour, and spicy</p>
      <ul>
        <li><strong>Methia Keri:</strong> Sweet and spicy raw mango pickle</li>
        <li><strong>Limboo Aachar:</strong> Lemon pickle with jaggery</li>
        <li><strong>Ravo Aachar:</strong> Mixed vegetable pickle with semolina coating</li>
      </ul>
      
      <h4>Maharashtra</h4>
      <p><strong>Signature Style:</strong> Peanut oil base with complex spice blends</p>
      <ul>
        <li><strong>Hirva Mircha Aachar:</strong> Green chili pickle</li>
        <li><strong>Lonche:</strong> Spicy pickle varieties using local vegetables</li>
        <li><strong>Karavanda Aachar:</strong> Karonda fruit pickle</li>
      </ul>
      
      <h3>Southern India: Coconut and Curry Leaves</h3>
      <h4>Tamil Nadu</h4>
      <p><strong>Signature Style:</strong> Coconut oil, curry leaves, and tamarind</p>
      <ul>
        <li><strong>Maavadu:</strong> Baby mango pickle</li>
        <li><strong>Narthangai Oorugai:</strong> Citron pickle</li>
        <li><strong>Vellarikkai Oorugai:</strong> Cucumber pickle</li>
      </ul>
      
      <h4>Kerala</h4>
      <p><strong>Signature Style:</strong> Coconut oil and unique local ingredients</p>
      <ul>
        <li><strong>Manga Achar:</strong> Mango pickle with coconut oil</li>
        <li><strong>Nellikka Achar:</strong> Gooseberry pickle</li>
        <li><strong>Kadumanga:</strong> Baby mango pickle with bird's eye chili</li>
      </ul>
      
      <h4>Andhra Pradesh & Telangana</h4>
      <p><strong>Signature Style:</strong> Fiery hot with generous use of red chilies</p>
      <ul>
        <li><strong>Avakaya:</strong> Mango pickle with mustard and red chili powder</li>
        <li><strong>Gongura Pickle:</strong> Sorrel leaves pickle</li>
        <li><strong>Tomato Pickle:</strong> Spicy tomato pickle</li>
      </ul>
      
      <h4>Karnataka</h4>
      <p><strong>Signature Style:</strong> Balanced flavors with local herbs</p>
      <ul>
        <li><strong>Happala Midi:</strong> Jackfruit pickle</li>
        <li><strong>Menaskai:</strong> Mixed vegetable pickle</li>
        <li><strong>Nimbekai Uppinakai:</strong> Lemon pickle</li>
      </ul>
      
      <h3>Eastern India: Fish and Fermentation</h3>
      <h4>West Bengal</h4>
      <p><strong>Signature Style:</strong> Mustard oil, panch phoron, and fermentation</p>
      <ul>
        <li><strong>Aam Kasundi:</strong> Raw mango mustard pickle</li>
        <li><strong>Shutki Aachar:</strong> Dried fish pickle</li>
        <li><strong>Kamranga Aachar:</strong> Star fruit pickle</li>
      </ul>
      
      <h4>Odisha</h4>
      <p><strong>Signature Style:</strong> Simple ingredients with complex flavors</p>
      <ul>
        <li><strong>Tentuli Khatta:</strong> Tamarind pickle</li>
        <li><strong>Aamba Khatta:</strong> Mango pickle</li>
        <li><strong>Soriso Aachar:</strong> Mustard seed pickle</li>
      </ul>
      
      <h3>Northeastern India: Unique Ingredients</h3>
      <h4>Assam</h4>
      <p><strong>Signature Style:</strong> Fermented ingredients and bamboo</p>
      <ul>
        <li><strong>Khar:</strong> Alkaline pickle with unique flavors</li>
        <li><strong>Bambooshoot Pickle:</strong> Fermented bamboo shoots</li>
        <li><strong>Bhut Jolokia Pickle:</strong> Ghost pepper pickle</li>
      </ul>
      
      <h3>Central India: Tribal Influences</h3>
      <h4>Madhya Pradesh</h4>
      <p><strong>Signature Style:</strong> Wild ingredients and tribal techniques</p>
      <ul>
        <li><strong>Tendu Aachar:</strong> Wild fruit pickle</li>
        <li><strong>Mahua Pickle:</strong> Made from mahua flowers</li>
        <li><strong>Char Magaz Aachar:</strong> Four-seed pickle</li>
      </ul>
      
      <h3>Factors Influencing Regional Varieties</h3>
      <h4>Climate Adaptations</h4>
      <ul>
        <li><strong>Hot Climates:</strong> More oil and salt for preservation</li>
        <li><strong>Humid Regions:</strong> Drying techniques and specific spices</li>
        <li><strong>Cold Areas:</strong> Warming spices and root vegetables</li>
      </ul>
      
      <h4>Local Ingredients</h4>
      <ul>
        <li><strong>Coastal Areas:</strong> Coconut oil and seafood pickles</li>
        <li><strong>Desert Regions:</strong> Wild berries and drought-resistant vegetables</li>
        <li><strong>Hill Stations:</strong> Wild herbs and mountain vegetables</li>
      </ul>
      
      <h3>Preserving Regional Traditions</h3>
      <p>At AachariTiwari, we celebrate this incredible diversity by:</p>
      <ul>
        <li>Sourcing recipes from traditional families across regions</li>
        <li>Using region-specific ingredients and techniques</li>
        <li>Maintaining authenticity while ensuring food safety</li>
        <li>Educating customers about regional pickle traditions</li>
      </ul>
      
      <p>Each regional variety tells a story of adaptation, creativity, and cultural identity. By preserving these traditions, we keep alive the rich tapestry of Indian culinary heritage.</p>
    `,
    author: 'Ravi Krishnan',
    date: '2024-01-03',
    readTime: '9 min read',
    category: 'Regional Cuisine',
    image: redChiliAachar,
    likes: 267,
    tags: ['regional', 'diversity', 'culture', 'traditional', 'indian cuisine']
  }
];

export const categories = Array.from(new Set(blogPosts.map(post => post.category)));

export const getAllTags = () => {
  const allTags = blogPosts.flatMap(post => post.tags);
  return Array.from(new Set(allTags));
};