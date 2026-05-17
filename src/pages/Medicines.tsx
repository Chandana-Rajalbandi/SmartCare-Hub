import React, { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import { Medicine } from '../types';
import { fetchMedicines } from '../services/medicineService';

const categories = [
  'All Categories',
  'Pain Relief',
  'Cold & Flu',
  'Digestive Health',
  'Allergy',
  'First Aid',
  'Vitamins',
  'Skincare'
];

const Medicines: React.FC = () => {
  const { addToCart, cart, updateCartItemQuantity } = useAppContext();
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  useEffect(() => {
    const loadMedicines = async () => {
      try {
        const data = await fetchMedicines();
        setMedicines(data);
        setFilteredMedicines(data);
      } catch (error) {
        console.error('Error loading medicines:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMedicines();
  }, []);

  useEffect(() => {
    let results = medicines;
    
    // Filter by category
    if (selectedCategory !== 'All Categories') {
      results = results.filter(medicine => medicine.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      results = results.filter(medicine => 
        medicine.name.toLowerCase().includes(query) || 
        medicine.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredMedicines(results);
  }, [medicines, searchQuery, selectedCategory]);

  const getCartQuantity = (medicineId: string) => {
    const item = cart.find(item => item.medicine.id === medicineId);
    return item ? item.quantity : 0;
  };

  const handleQuantityChange = (medicine: Medicine, delta: number) => {
    const currentQuantity = getCartQuantity(medicine.id);
    const newQuantity = currentQuantity + delta;
    
    if (newQuantity === 0) {
      updateCartItemQuantity(medicine.id, 0); // This will remove it from cart
    } else if (currentQuantity === 0 && delta > 0) {
      addToCart(medicine, delta);
    } else {
      updateCartItemQuantity(medicine.id, newQuantity);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Medicines</h1>
      
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
          <div className="md:flex-1 flex items-center relative">
            <Search className="absolute left-3 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search for medicines..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="md:ml-4 flex items-center">
            <Filter className="h-5 w-5 text-gray-500 mr-2" />
            <select 
              className="border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Medicines Grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredMedicines.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No medicines found matching your criteria.</p>
          <button 
            className="mt-4 text-blue-600 hover:text-blue-800"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Categories');
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMedicines.map(medicine => (
            <MedicineCard 
              key={medicine.id} 
              medicine={medicine} 
              quantity={getCartQuantity(medicine.id)}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface MedicineCardProps {
  medicine: Medicine;
  quantity: number;
  onQuantityChange: (medicine: Medicine, delta: number) => void;
}

const MedicineCard: React.FC<MedicineCardProps> = ({ medicine, quantity, onQuantityChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 border border-gray-100">
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        <img 
          src={medicine.image || "https://images.pexels.com/photos/139398/pexels-photo-139398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} 
          alt={medicine.name}
          className="max-h-full max-w-full object-contain p-4"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-800 mb-1">{medicine.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{medicine.dosage}</p>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3 h-10">
          {medicine.description}
        </p>
        
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <span className="font-semibold text-gray-800">
            ${medicine.price.toFixed(2)}
          </span>
          
          {quantity === 0 ? (
            <button
              onClick={() => onQuantityChange(medicine, 1)}
              className="bg-blue-600 text-white rounded-lg py-1 px-3 text-sm font-medium hover:bg-blue-700 transition-colors flex items-center"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add
            </button>
          ) : (
            <div className="flex items-center">
              <button
                onClick={() => onQuantityChange(medicine, -1)}
                className="bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors"
              >
                <Minus className="h-4 w-4 text-gray-700" />
              </button>
              <span className="mx-2 font-medium text-sm w-6 text-center">
                {quantity}
              </span>
              <button
                onClick={() => onQuantityChange(medicine, 1)}
                className="bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors"
              >
                <Plus className="h-4 w-4 text-gray-700" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Medicines;