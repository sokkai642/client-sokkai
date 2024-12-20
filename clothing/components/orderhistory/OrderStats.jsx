import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const OrderStats = ({ orders }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const stats = {
    total: orders.length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    pending: orders.filter(o => o.status === 'processing' || o.status === 'in-transit').length
  };

  return (
    <div className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
      >
        <span className="text-sm font-medium text-gray-600">Order Statistics</span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>
      
      {isExpanded && (
        <div className="grid grid-cols-3 divide-x border-t">
          {[
            { label: 'Total Orders', value: stats.total, color: 'text-purple-600' },
            { label: 'Delivered', value: stats.delivered, color: 'text-green-600' },
            { label: 'In Progress', value: stats.pending, color: 'text-yellow-600' }
          ].map((stat, index) => (
            <div key={index} className="p-4 text-center">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderStats;