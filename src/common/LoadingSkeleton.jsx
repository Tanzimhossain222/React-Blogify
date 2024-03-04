// LoadingSkeleton.js
import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col space-y-4 container">
      <div className="w-full h-8 bg-gray-600 rounded animate-pulse"></div>
      <div className="w-full h-8 bg-gray-600 rounded animate-pulse"></div>
      <div className="w-full h-8 bg-gray-600 rounded animate-pulse"></div>
      <div className="w-full h-8 bg-gray-600 rounded animate-pulse"></div>
    </div>
  );
};

export default LoadingSkeleton;
