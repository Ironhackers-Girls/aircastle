import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../contexts/auth-context";
import SearchBar from "../search-bar/search-bar";
import * as AirCastleAPI from "../../../services/aircastle-service";
import {
  IconLogout,
  IconUserCircle,
  IconBuildingCastle,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";

function NavBar() {
  const { user, logout } = useAuthContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await AirCastleAPI.logout();
      logout();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderUserLinks = () => {
    if (!user) {
      return (
        <Link
          to="/login"
          className="flex items-center px-3 py-2 rounded-full text-[var(--black)] hover:bg-[var(--light-gray)]"
        >
          <IconUserCircle className="mr-2" size={20} />
          Login
        </Link>
      );
    }

    return (
      <>
        {user.role === "guest" && (
          <Link
            to="/bookings"
            className="flex items-center px-3 py-2 rounded-full text-[var(--black)] hover:bg-[var(--light-gray)]"
          >
            <IconBuildingCastle className="mr-2" size={20} />
            My Bookings
          </Link>
        )}
        {user.role === "host" && (
          <div className="flex flex-row">
            <Link
              to="/bookings"
              className="flex items-center px-3 py-2 rounded-full text-[var(--black)] hover:bg-[var(--light-gray)]"
            >
              <IconBuildingCastle className="mr-2" size={20} />
              My Bookings
            </Link>
            <Link
              to="/castles"
              className="flex items-center px-3 py-2 rounded-full text-[var(--black)] hover:bg-[var(--light-gray)]"
            >
              <IconBuildingCastle className="mr-2" size={20} />
              My Castles
            </Link>
          </div>
        )}
        <Link
          to="/profile"
          className="flex items-center px-3 py-2 rounded-full text-[var(--black)] hover:bg-[var(--light-gray)]"
        >
          <img
            src={user.avatar || <IconUserCircle className="mr-2" size={20} />}
            alt="User avatar"
            className="w-6 h-6 rounded-full mr-2 border border-[var(--light-gray)]"
          />
          Profile
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center px-3 py-2 rounded-full text-[var(--black)] hover:bg-[var(--light-gray)] cursor-pointer"
        >
          <IconLogout className="mr-2" size={20} />
          Logout
        </button>
      </>
    );
  };

  return (
    <nav className="sticky rounded-md z-5 top-4 p-2 bg-[var(--white)] border-b border-[var(--light-gray)] shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                className="h-8 w-auto mr-2"
                src="/aircastle.svg"
                alt="Aircastle Logo"
              />
            </Link>
          </div>

          {/* Hamburger */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-[var(--black)] hover:text-[var(--purple)] focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
            </button>
          </div>

          {/* SearchBar */}
          <div className="hidden lg:flex lg:justify-center max-w-2xl ">
            <SearchBar />
          </div>

          {/* Buttons*/}
          <div className="hidden lg:flex lg:items-center lg:space-x-2">
            {renderUserLinks()}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-3 space-y-2" id="mobile-menu">
          <div className="mb-3">
            <SearchBar />
          </div>
          {renderUserLinks()}
        </div>
      )}
    </nav>
  );
}

export default NavBar;
