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
        rounded-xl
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
        h-full
        flex
        flex-col
      "
    >
      {/* Image section (fixed height) */}
      <figure className="h-48 p-4">
        <div
          className="
            w-full
            h-full
            flex
            items-center
            justify-center
            bg-base-200
            rounded-lg
            overflow-hidden
            transition-all
            duration-300
          "
        >
          <img
            src={asset.productImage}
            alt={asset.productName}
            className="
              max-h-full
              max-w-full
              rounded-lg
              object-contain
              transition-transform
              duration-300
              group-hover:scale-105
            "
          />
        </div>
      </figure>

      {/* Content */}
      <div className="card-body px-5 pt-0 pb-5 text-center flex flex-col flex-grow">
        {/* Title (fixed height via line clamp) */}
        <h2 className="mt-3 font-semibold text-secondary text-lg leading-snug line-clamp-2 min-h-[3rem]">
          {asset.productName}
        </h2>

        {/* Badges */}
        <div className="flex justify-center gap-2 mt-3">
          <span
            className={`badge badge-outline ${
              asset.productType === "Returnable"
                ? "badge-info"
                : "badge-warning"
            }`}
          >
            {asset.productType}
          </span>

          <span className="badge badge-success">
            Available: {asset.availableQuantity}
          </span>
        </div>

        {/* Button pinned to bottom */}
        <div className="mt-auto pt-5">
          <button
            onClick={onRequest}
            className="
              btn
              btn-primary
              btn-sm
              w-full
              flex
              items-center
              justify-center
              gap-2
              transition-all
              duration-300
              hover:scale-[1.03]
              hover:shadow-md
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
