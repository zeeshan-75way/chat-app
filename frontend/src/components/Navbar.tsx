import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <div className="text-xl font-bold text-gray-800">MyApp</div>
        <div className="flex space-x-4">
          <Link
            to="/login"
            className={`text-gray-700 hover:text-blue-500 transition-colors duration-200 ${
              location.pathname === "/login"
                ? "font-semibold border-b-2 border-blue-500"
                : ""
            }`}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className={`text-gray-700 hover:text-blue-500 transition-colors duration-200 ${
              location.pathname === "/signup"
                ? "font-semibold border-b-2 border-blue-500"
                : ""
            }`}
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
