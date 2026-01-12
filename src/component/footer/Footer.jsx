import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    // <footer className="bg-secondary text-base-100">
      <footer className="bg-base-300 text-base-100 border-t border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* ---------- Brand ---------- */}
        <div>
          <h2 className="text-2xl text-white font-bold mb-4">AssetVerse</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            AssetVerse helps organizations manage, track, and assign company
            assets efficiently with full transparency and control.
          </p>
        </div>

        {/* ---------- Quick Links ---------- */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300 ">
            <li><a href="/" className="hover:text-primary ">Home</a></li>
            <li><a href="/login" className="hover:text-primary ">Login</a></li>
            <li><a href="/register-employee" className="hover:text-primary ">Join as Employee</a></li>
            <li><a href="/register-hr" className="hover:text-primary">Join as HR</a></li>
          </ul>
        </div>

        {/* ---------- Contact ---------- */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@assetverse.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +880 1234 567890
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Dhaka, Bangladesh
            </li>
          </ul>
        </div>

        {/* ---------- Social ---------- */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
          <div className="flex text-white gap-4">
            <a
              href="#"
              className="p-2 rounded-full bg-gray-600 hover:bg-primary transition"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-600 hover:bg-primary transition"
            >
              <Github size={18} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-600 hover:bg-primary transition"
            >
              <Twitter size={18} />
            </a>
          </div>
        </div>

      </div>

      {/* ---------- Bottom Bar ---------- */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400 px-4">
        © {new Date().getFullYear()} AssetVerse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
