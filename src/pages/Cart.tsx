import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';

const Cart: React.FC = () => {
  const { cart, updateCartItemQuantity, removeFromCart, clearCart } = useAppContext();
  const navigate = useNavigate();
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.medicine.price * item.quantity), 0);
  const deliveryFee = subtotal > 50 ? 0 : 5;
  const total = subtotal + deliveryFee;
  
  const handleCheckout = () => {
    if (cart.length === 0) return;
    navigate('/checkout');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        to="/medicines" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Continue Shopping
      </Link>
      
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>
      
      {cart.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="h-16 w-16 text-gray-300" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any medicines to your cart yet.</p>
          <Link
            to="/medicines"
            className="bg-blue-600 text-white hover:bg-blue-700 transition-colors px-6 py-3 rounded-lg font-medium inline-block"
          >
            Browse Medicines
          </Link>
        </div>
      ) : (
        <div className="lg:flex lg:space-x-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Cart Items ({totalItems})
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                  >
                    Remove All
                  </button>
                </div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {cart.map((item) => (
                  <div key={item.medicine.id} className="p-6">
                    <div className="sm:flex sm:justify-between sm:items-center">
                      <div className="sm:flex sm:items-center sm:space-x-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mb-4 sm:mb-0">
                          <img 
                            src={item.medicine.image || "https://images.pexels.com/photos/139398/pexels-photo-139398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} 
                            alt={item.medicine.name}
                            className="max-h-16 max-w-16 object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{item.medicine.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">{item.medicine.dosage}</p>
                          <p className="text-sm text-gray-500 mt-1">${item.medicine.price.toFixed(2)} each</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 sm:mt-0">
                        <div className="flex items-center">
                          <button
                            onClick={() => updateCartItemQuantity(item.medicine.id, item.quantity - 1)}
                            className="bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors"
                          >
                            <Minus className="h-5 w-5 text-gray-700" />
                          </button>
                          <span className="mx-3 font-medium w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartItemQuantity(item.medicine.id, item.quantity + 1)}
                            className="bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors"
                          >
                            <Plus className="h-5 w-5 text-gray-700" />
                          </button>
                        </div>
                        
                        <div className="ml-6 sm:ml-10 flex items-center space-x-4">
                          <span className="font-semibold text-gray-800">
                            ${(item.medicine.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.medicine.id)}
                            className="text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">
                    {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                {deliveryFee > 0 && (
                  <div className="text-sm text-gray-500">
                    Add ${(50 - subtotal).toFixed(2)} more for free delivery
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-800">Total</span>
                  <span className="font-semibold text-gray-800">${total.toFixed(2)}</span>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center transition-colors ${
                  cart.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;