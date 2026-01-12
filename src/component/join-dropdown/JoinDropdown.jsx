import { Link } from "react-router";
import { UserPlus, ChevronDown, UserCheck, User } from "lucide-react";
import { useState } from "react";

const JoinDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Main Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 font-semibold rounded-lg
                   hover:text-primary cursor-pointer transition-colors"
      >
        <UserPlus className="w-5 h-5" />
        Register
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 mt-2 px-1 rounded-lg shadow-2xl
                     bg-gray-800 border border-base-300 z-50"
        >
          <Link
            to="/employee-registration"
            className="flex items-center mx-1.5 rounded-lg gap-2 my-3
                       bg-base-300 px-4 py-3 hover:scale-103 transition"
            onClick={() => setOpen(false)}
          >
            <User className="w-5 h-5" />
            Join as Employee
          </Link>

          <Link
            to="/hr-registration"
            className="flex whitespace-nowrap items-center mx-1.5 rounded-lg gap-2 my-3
                       bg-base-300 px-4 py-3 hover:scale-103 transition"
            onClick={() => setOpen(false)}
          >
            <UserCheck className="w-5 h-5" />
            Join as HR Manager
          </Link>
        </div>
      )}
    </div>
  );
};

export default JoinDropdown;
