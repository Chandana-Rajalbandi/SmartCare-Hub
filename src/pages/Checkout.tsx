import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, Clock, AlertCircle } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import { Order } from '../types';

const Checkout: React.FC = () => {
  const { cart, user, addOrder, clearCart } = useAppContext();
  const navigate = useNavigate();

  const [deliveryAddress, setDeliveryAddress] = useState(user?.address || '');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '4242 4242 4242 4242',
    cardName: user?.name || '',
    expiryDate: '12/28',
    cvv: '123',
  });
  const [formErrors, setFormErrors] = useState<{
    address?: string;
    card?: string;
  }>({});

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.medicine.price * item.quantity, 0), [cart]);
  const deliveryFee = subtotal > 50 ? 0 : 5;
  const total = subtotal + deliveryFee;

  const validateForm = () => {
    const errors: { address?: string; card?: string } = {};

    if (!deliveryAddress.trim()) {
      errors.address = 'Delivery address is required';
    }

    if (paymentMethod === 'card') {
      const isCardFilled =
        cardDetails.cardNumber.trim().length >= 16 &&
        cardDetails.cardName.trim().length > 1 &&
        cardDetails.expiryDate.trim().length === 5 &&
        cardDetails.cvv.trim().length >= 3;

      if (!isCardFilled) {
        errors.card = 'Complete all card details before placing the order.';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    window.setTimeout(() => {
      const order: Order = {
        id: `ORD-${Date.now()}`,
        userId: user?.id || 'guest',
        items: [...cart],
        totalAmount: total,
        status: 'confirmed',
        deliveryAddress,
        paymentMethod,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      addOrder(order);
      clearCart();
      setIsProcessing(false);
      navigate(`/orders/${order.id}`);
    }, 1500);
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

      <div className="lg:flex lg:space-x-8">
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-800">Delivery Address</h2>
              </div>

              <div className="mb-4">
                <label htmlFor="deliveryAddress" className="block text-gray-700 font-medium mb-2">
                  Address
                </label>
                <textarea
                  id="deliveryAddress"
                  className={`w-full p-3 border ${formErrors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  placeholder="Enter your full delivery address"
                  rows={3}
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                ></textarea>
                {formErrors.address && <p className="text-red-600 text-sm mt-1">{formErrors.address}</p>}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg flex items-start">
                <Clock className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-blue-800">Estimated Delivery Time</span>
                  <p className="text-blue-700 text-sm mt-1">
                    Your order will be delivered within 30-60 minutes after payment confirmation.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center mb-4">
                <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-800">Payment Method</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                    />
                    <span className="ml-2 text-gray-700">Credit/Debit Card</span>
                  </label>
                </div>

                {paymentMethod === 'card' && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="cardNumber" className="block text-gray-700 font-medium mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          className={`w-full p-3 border ${formErrors.card ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          value={cardDetails.cardNumber}
                          onChange={(e) => setCardDetails((prev) => ({ ...prev, cardNumber: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label htmlFor="cardName" className="block text-gray-700 font-medium mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="John Doe"
                          value={cardDetails.cardName}
                          onChange={(e) => setCardDetails((prev) => ({ ...prev, cardName: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label htmlFor="expiryDate" className="block text-gray-700 font-medium mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="MM/YY"
                          maxLength={5}
                          value={cardDetails.expiryDate}
                          onChange={(e) => setCardDetails((prev) => ({ ...prev, expiryDate: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-gray-700 font-medium mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="123"
                          maxLength={4}
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails((prev) => ({ ...prev, cvv: e.target.value }))}
                        />
                      </div>
                    </div>
                    {formErrors.card && <p className="text-red-600 text-sm mt-3">{formErrors.card}</p>}
                  </div>
                )}

                <div>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                    />
                    <span className="ml-2 text-gray-700">Cash on Delivery</span>
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-colors ${
                isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </span>
              ) : (
                'Complete Order'
              )}
            </button>
          </form>
        </div>

        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.medicine.id} className="flex justify-between">
                  <div>
                    <span className="text-gray-700">{item.medicine.name}</span>
                    <span className="text-gray-500 ml-1">x{item.quantity}</span>
                  </div>
                  <span className="font-medium">${(item.medicine.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">{deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between text-lg">
                <span className="font-semibold text-gray-800">Total</span>
                <span className="font-semibold text-gray-800">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600">
                  By completing your order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
