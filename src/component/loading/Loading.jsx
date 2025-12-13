import React from "react";

const Loading = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      
      {/* Spinner */}
      <span className="loading w-17 loading-spinner loading-lg text-primary"></span>

      {/* Text */}
      <p className="text-neutral text-xl tracking-wide">
        Loading, please wait...
      </p>

    </div>
  );
};

export default Loading;
