import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, ShoppingBag, Check, Truck, Clock } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';

const statusIcons = {
  pending: <Clock className="h-5 w-5 text-yellow-500" />,
  confirmed: <Check className="h-5 w-5 text-green-500" />,
  shipped: <Truck className="h-5 w-5 text-blue-500" />,
  delivered: <Package className="h-5 w-5 text-green-600" />,
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  confirmed: 'bg-green-100 text-green-800 border-green-200',
  shipped: 'bg-blue-100 text-blue-800 border-blue-200',
  delivered: 'bg-green-100 text-green-800 border-green-200',
};

const Orders: React.FC = () => {
  const { orders } = useAppContext();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="h-16 w-16 text-gray-300" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No orders yet</h2>
          <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
          <Link
            to="/medicines"
            className="bg-blue-600 text-white hover:bg-blue-700 transition-colors px-6 py-3 rounded-lg font-medium inline-block"
          >
            Browse Medicines
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-100">
            {orders.map((order) => (
              <div key={order.id} className="p-6">
                <div className="md:flex md:justify-between md:items-center">
                  <div>
                    <div className="flex items-center mb-2">
                      <h3 className="font-medium text-gray-800 mr-3">Order #{order.id.slice(-8)}</h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[order.status]}`}
                      >
                        {statusIcons[order.status]}
                        <span className="ml-1">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Placed on {formatDate(order.createdAt)}</p>
                  </div>

                  <div className="flex items-center justify-between md:justify-end">
                    <div className="md:mr-6">
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="font-semibold text-gray-800">${order.totalAmount.toFixed(2)}</p>
                    </div>
                    <Link
                      to={`/orders/${order.id}`}
                      className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                    >
                      Details
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {order.items.slice(0, 4).map((item) => (
                    <div key={`${order.id}-${item.medicine.id}`} className="flex items-center">
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center mr-3 flex-shrink-0 overflow-hidden">
                        <img src={item.medicine.image} alt={item.medicine.name} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.medicine.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  {order.items.length > 4 && (
                    <div className="flex items-center text-gray-500 text-sm">+{order.items.length - 4} more items</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
