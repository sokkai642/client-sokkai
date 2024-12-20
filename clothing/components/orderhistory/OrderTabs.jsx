import { useEffect, useState } from "react";

const OrderTabs = ({ activeTab, onTabChange, cartdata }) => {
  const [tabs, setTabs] = useState([
    { id: 'all', label: 'All Orders', count: 0 },
    { id: 'pending', label: 'Processing', count: 0 },
    { id: 'cancelled', label: 'Cancelled', count: 0 },
    { id: 'delivered', label: 'Delivered', count: 0 },
  ]);

  useEffect(() => {
    // Initialize counts to 0
    const updatedTabs = tabs.map(tab => ({
      ...tab,
      count: 0,
    }));

    // Loop through cartdata and update the tab counts based on the status
    cartdata.forEach(order => {
      // Increment the specific tab based on the order status
      const tabIndex = updatedTabs.findIndex(tab => tab.id === order.status);
      if (tabIndex !== -1) {
        updatedTabs[tabIndex].count += 1;
      }
    });

    // Calculate the total count for 'all' orders
    const totalCount = updatedTabs.reduce((sum, tab) => sum + tab.count, 0);
    const allTabIndex = updatedTabs.findIndex(tab => tab.id === 'all');
    if (allTabIndex !== -1) {
      updatedTabs[allTabIndex].count = totalCount;
    }

    // Update the state with the new counts
    setTabs(updatedTabs);
  }, [cartdata]); // Recalculate when cartdata changes

  return (
    <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
      <div className="flex overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 min-w-[120px] px-6 py-4 text-sm font-medium relative transition-all
              ${activeTab === tab.id
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span className="block">{tab.label}</span>
            <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1
              ${activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
              {tab.count}
            </span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrderTabs;
