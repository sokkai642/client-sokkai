import { Package, Truck, CheckCircle, Clock, ArrowRight, MapPin, Calendar, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';
import { jsPDF } from "jspdf"; // If using npm, import jsPDF
const statusConfig = {
  'delivered': { 
    icon: CheckCircle, 
    color: 'text-green-600',
    bgColor: 'bg-green-600',
    lightBg: 'bg-green-50',
    label: 'Delivered'
  },
  'pending': { 
    icon: Truck, 
    color: 'text-blue-600',
    bgColor: 'bg-blue-600',
    lightBg: 'bg-blue-50',
    label: 'In Transit'
  },
  'dispatched': { 
    icon: Clock, 
    color: 'text-green-600',
    bgColor: 'bg-green-600',
    lightBg: 'bg-green-50',
    label: 'Processing'
  },
  'cancelled': { 
    icon: Package, 
    color: 'text-red-600',
    bgColor: 'bg-red-600',
    lightBg: 'bg-red-50',
    label: 'Cancelled'
  }
};

const OrderCard = ({ order, userId }) => {
  const [currentOrder, setCurrentOrder] = useState(order);
  const [showModal, setShowModal] = useState(false); 
  const [productToCancel, setProductToCancel] = useState(null); 
  const config = statusConfig[currentOrder.status] || {}; 
  const StatusIcon = config.icon || "pending";
  const router = useRouter();

  useEffect(() => {
    console.log(currentOrder);
    console.log("😎😎😎😎", config);
    console.log(currentOrder.products[0].productId);
  }, [currentOrder]);

  if (!StatusIcon) {
    return <div>Error: Invalid status</div>;
  }

  const handleProducts = async (id) => {
    router.push(`/frontend/productdetails/${id}`);
  };

  const handleCancelProduct = async (productId, orderid) => {
    console.log("Canceling Product:", productId);

    try {
      const response = await axios.post(`/api/cancelorder`, { productId, userId, orderid });

      if (response.status === 200) {
        console.log("Product cancelled");

        setCurrentOrder(prevOrder => {
          const updatedProducts = prevOrder.products.map(product =>
            product.productId.toString() === productId.toString()
              ? { ...product, status: 'cancelled' }
              : product
          );
          return {
            ...prevOrder,
            products: updatedProducts
          };
        });
        window.location.reload();

      }
    } catch (error) {
      console.error('Error canceling product:', error);
    }
  };
  const handleDownloadInvoice = () => {
    // Check if invoice URL exists
    if (currentOrder.invoice) {
        const pdf = new jsPDF();
        
        // Create an image element
        const img = new Image();
        img.src = currentOrder.invoice;
        
        img.onload = () => {
            // Add the image to the PDF (x, y, width, height)
            pdf.addImage(img, 'PNG', 10, 10, 180, 160); // Adjust position and size as needed
            pdf.save(`invoice-${currentOrder._id}.pdf`); // Save the PDF with the order ID as file name
            console.log("Downloading invoice as PDF for order:", currentOrder._id);
        };
    } else {
        console.log("No invoice available for order:", currentOrder._id);
    }
};



  const openModal = (productId) => {
    setProductToCancel(productId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setProductToCancel(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header Section */}
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 sm:p-4 border-b border-gray-200">
        {/* Icon Section */}
        <div className="flex flex-col sm:flex-row sm:ml-10 sm:pl-16">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg sm:text-xl font-semibold text-gray-900">Order #{currentOrder.id}</span>
              <span className={`px-4 py-2 text-xs rounded-full ${config.lightBg || 'bg-gray-200'} ${config.color || 'text-gray-600'}`}>
                {currentOrder.status || 'Unknown Status'}
              </span>
            </div>
            <div className="flex items-center text-xs text-gray-500 mt-2">
              <StatusIcon className={`w-8 h-8 ${config.color || 'text-gray-500'} mr-2`} />
              <span>{currentOrder.date}</span>
            </div>
          </div>
        </div>

        <div className="text-right sm:text-left mt-2 sm:mt-0 flex items-center space-x-4">
          {/* Download Invoice Button */}
          <button
            onClick={handleDownloadInvoice}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 focus:outline-none"
          >
            <ArrowRight className="w-4 h-4" />
            <span className="text-sm font-medium">Download Invoice</span>
          </button>
          
          {/* Total Items */}
          <p className="text-xs text-gray-500">{currentOrder.products.length} item(s)</p>
        </div>
      </div>

      {/* Products Section */}
      <div className="space-y-4 sm:space-y-6">
        {currentOrder.products.map((item) => {
          const { name, images, price, _id } = item.productId;
          const totalPrice = item.totalPrice;

          const isCancelButtonEnabled = item.status === 'pending';

          return (
            <div 
              key={_id} 
              className="flex flex-wrap sm:flex-nowrap items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-all cursor-pointer border-b border-gray-200"
              onClick={() => handleProducts(_id)}>
              
              <div className="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20">
                <img 
                  src={images?.[0]?.url || '/default-image.jpg'}
                  alt={name || 'Product Image'} 
                  className="w-full h-full object-cover rounded-lg border-2 border-gray-200 shadow-md"
                />
                <div className="absolute -top-4 -right-2 text-xs text-gray-600 mt-4 ml-3">
                  <span className="font-semibold">Qty:</span> {item.quantity}
                </div>
              </div>

              <div className="flex-grow min-w-0">
                <h4 className="font-medium text-gray-900 text-lg truncate">{name || 'Unnamed Product'}</h4>
                <div className="mt-2 flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-800">RS: {totalPrice}</span>

                  {/* Rate Product Button */}
                  {currentOrder.status === 'delivered' && (
                    <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                      <Star className="w-4 h-4 mr-1" />
                      Rate Product
                    </button>
                  )}
                </div>

                <div className="flex justify-end mt-4">
                  {item.status === 'pending' ? (
                    <button
                      onClick={(e) => { e.stopPropagation(); openModal(_id); }} // Open modal for cancel confirmation
                      className="px-6 py-3 bg-red-600 text-black text-sm font-medium rounded-full shadow-md focus:outline-none"
                    >
                      Cancel Item
                    </button>
                  ) : (
                    <button
                      disabled
                      className="px-6 py-3 bg-gray-300 text-black text-sm font-medium rounded-full shadow-md cursor-not-allowed opacity-50"
                    >
                      Cancel Item
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delivery Information Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 border-t border-gray-100 rounded-b-xl">
        <div className="flex items-start text-sm text-gray-600 w-full sm:w-auto space-x-2">
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="break-words overflow-hidden">
            {currentOrder.address 
              ? `${currentOrder.address.name}, ${currentOrder.address.address}, ${currentOrder.address.location}` 
              : 'No address provided'}
          </span>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-80 sm:w-96">
            <h3 className="text-lg font-semibold text-gray-800">Are you sure you want to cancel this item?</h3>
            <div className="mt-4 flex justify-between space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleCancelProduct(productToCancel, currentOrder._id);
                  closeModal();
                }}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg w-full sm:w-auto"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
