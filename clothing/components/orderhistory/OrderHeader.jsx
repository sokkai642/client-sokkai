import { ShoppingBag } from 'lucide-react';

const OrderHeader = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-8 px-4 -mx-4 mb-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-3">
          <ShoppingBag className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">My Orders</h1>
            <p className="text-blue-100 text-sm">View and track your orders</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHeader;