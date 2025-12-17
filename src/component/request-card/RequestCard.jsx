import React from "react";
import { PackagePlus } from "lucide-react";

const RequestCard = ({ asset, onRequest }) => {
  return (
    <div
      className="
        group
        card
        bg-base-100
        border border-base-200
        rounded-2xl
        shadow-md
        hover:shadow-xl
        hover:scale-[1.02]
        transition-all
        duration-300
        h-full
        flex
        flex-col
      "
    >

      <figure className="h-52 p-4 bg-base-200 rounded-t-2xl overflow-hidden flex items-center justify-center">
        <img
          src={asset.productImage}
          alt={asset.productName}
          className="
            max-h-full
            max-w-full
            object-contain
            rounded-xl
            transition-transform
            duration-300
            group-hover:scale-105
          "
        />
      </figure>

 
      <div className="card-body px-5 py-4 flex flex-col flex-grow text-center">
       
        <h2 className="font-semibold text-secondary text-lg leading-snug line-clamp-2 min-h-[3rem]">
          {asset.productName}
        </h2>


        <p className="text-sm text-neutral mt-1">{asset.companyName}</p>

  
        <div className="flex justify-center gap-2 mt-3 flex-wrap">
          <span
            className={`badge badge-outline ${
              asset.productType === "Returnable" ? "badge-info" : "badge-warning"
            }`}
          >
            {asset.productType}
          </span>

          <span className="badge badge-success">Available: {asset.availableQuantity}</span>
        </div>

     
        <div className="mt-auto pt-5">
          <button
            onClick={onRequest}
            className="
              btn btn-primary
              btn-sm
              w-full
              flex items-center justify-center gap-2
              rounded-xl
              shadow-sm
              hover:shadow-md
              hover:scale-[1.03]
              transition-all duration-300
            "
          >
            <PackagePlus size={16} />
            Request Asset
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
