import React from 'react';
import "./loader.css"
function App() {
  return (
    // <div className="flex justify-center items-center min-h-screen">
    //   <div className="animate-spin rounded-full h-32 w-32 border-4 border-t-4 border-blue-500"></div>
    // </div>
    <div className="loader-container">
    <div className="spinner">
      <div className="spinner-inner"></div>
    </div>
  </div>
  );
}

export default App;
