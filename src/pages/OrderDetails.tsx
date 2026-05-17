import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Package, MapPin, CreditCard, CalendarDays } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';

const OrderDetails: React.FC = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders } = useAppContext();

  const order = orders.find((entry) => entry.id === orderId);

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <button onClick={() => navigate('/orders')} className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Orders
        </button>
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Order not found</h1>
          <p className="text-gray-600 mb-6">This order may have been removed or not saved yet.</p>
          <Link to="/orders" className="bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block">
            View Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link to="/orders" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Orders
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 md:flex md:items-center md:justify-between">
          <div>
            <p className="text-blue-100 text-sm mb-1">Order details</p>
            <h1 className="text-2xl font-bold">Order #{order.id.slice(-8)}</h1>
          </div>
          <div className="mt-4 md:mt-0 inline-flex items-center px-3 py-1 rounded-full bg-white/15 text-sm font-medium">
            <Package className="h-4 w-4 mr-2" />
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Items in this order</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={`${order.id}-${item.medicine.id}`} className="border border-gray-100 rounded-xl p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-20 h-20 rounded-xl bg-gray-50 overflow-hidden border border-gray-100 flex-shrink-0">
                      <img src={item.medicine.image} alt={item.medicine.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-800">{item.medicine.name}</h3>
                      <p className="text-sm text-gray-500">{item.medicine.dosage}</p>
                      <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">${(item.medicine.price * item.quantity).toFixed(2)}</p>
                    <p className="text-sm text-gray-500">${item.medicine.price.toFixed(2)} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order summary</h2>
            <div className="bg-gray-50 rounded-2xl p-5 space-y-4 border border-gray-100">
              <div className="flex items-start gap-3">
                <CalendarDays className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Placed on</p>
                  <p className="font-medium text-gray-800">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Delivery address</p>
                  <p className="font-medium text-gray-800">{order.deliveryAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CreditCard className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Payment method</p>
                  <p className="font-medium text-gray-800">{order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit / Debit Card'}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-gray-600 mb-2">
                  <span>Items</span>
                  <span>{order.items.length}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-gray-800">
                  <span>Total</span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
