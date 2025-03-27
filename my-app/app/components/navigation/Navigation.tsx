'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Navigation.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/pages/postList', label: 'Posts' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navContainer">
        <Link href="/" className="logo">Posts Test</Link>

        <button 
          className="menuToggle" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        <ul className={`navLinks ${isMenuOpen ? "active" : ''}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link 
                href={link.href} 
                className={`navLink ${pathname === link.href ? 'active-link' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;