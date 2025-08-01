import React from 'react';
import { Link } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { TrendingUp } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <TrendingUp size={24} style={{ marginRight: '8px', display: 'inline' }} />
            StrategyGPT
          </Link>
          
          <div className="navbar-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/onboarding" className="nav-link">Get Started</Link>
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;