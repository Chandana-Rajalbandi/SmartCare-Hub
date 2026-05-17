import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Heart } from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';

const Header: React.FC = () => {
  const { cart } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-500 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold text-white">MediCare</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" active={location.pathname === '/'}>
              Home
            </NavLink>
            <NavLink to="/diagnosis" active={location.pathname === '/diagnosis'}>
              Check Symptoms
            </NavLink>
            <NavLink to="/medicines" active={location.pathname === '/medicines'}>
              Medicines
            </NavLink>
            <NavLink to="/orders" active={location.pathname.startsWith('/orders')}>
              My Orders
            </NavLink>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="text-white hover:text-blue-100 relative">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link to="/profile" className="text-white hover:text-blue-100">
              <User className="h-6 w-6" />
            </Link>
          </div>

          <button className="md:hidden text-white focus:outline-none" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-3">
              <MobileNavLink to="/" onClick={toggleMenu}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/diagnosis" onClick={toggleMenu}>
                Check Symptoms
              </MobileNavLink>
              <MobileNavLink to="/medicines" onClick={toggleMenu}>
                Medicines
              </MobileNavLink>
              <MobileNavLink to="/orders" onClick={toggleMenu}>
                My Orders
              </MobileNavLink>
              <MobileNavLink to="/cart" onClick={toggleMenu}>
                Cart ({totalItems})
              </MobileNavLink>
              <MobileNavLink to="/profile" onClick={toggleMenu}>
                Profile
              </MobileNavLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, children }) => {
  return (
    <Link
      to={to}
      className={`text-sm font-medium transition-colors duration-200 relative ${
        active
          ? 'text-white after:absolute after:bottom-[-0.5rem] after:left-0 after:w-full after:h-0.5 after:bg-white'
          : 'text-blue-100 hover:text-white'
      }`}
    >
      {children}
    </Link>
  );
};

interface MobileNavLinkProps {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, onClick, children }) => {
  return (
    <Link to={to} className="text-blue-100 hover:text-white text-lg font-medium py-2" onClick={onClick}>
      {children}
    </Link>
  );
};

export default Header;
