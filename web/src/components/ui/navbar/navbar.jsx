import { Link } from "react-router-dom";
import { useAuthContext } from "../../../contexts/auth-context";
import SearchBar from "../search-bar/search-bar";
import * as AirCastleAPI from "../../../services/aircastle-service";

function NavBar() {
  const { user, logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      await AirCastleAPI.logout(); 
      logout(); 
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link to="/">
                <img className="h-8 w-auto" src="/aircastle.svg" alt="Aircastle Logo" />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex">
                <SearchBar />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/profile" className="text-blue-600 dark:text-sky-400">Profile</Link>
                <button 
                  onClick={handleLogout} 
                  className="text-white  px-3 py-2 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

