'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react'; // Import icons from lucide-react

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex justify-between items-center py-4 px-10 bg-white shadow-md relative">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-bold"
      >
        <Link href={'/'}>DriveSense</Link>
      </motion.div>

      {/* Desktop Menu */}
      <motion.nav
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="hidden md:flex space-x-6"
      >
        <Link href="/">Home</Link>
        <Link href="/about-us">About Us</Link>
        <Link href="/features">Features</Link>
        <Link href="/how-it-works">How it works</Link>
        <Link href="/pricing">Pricing</Link>
      </motion.nav>

      {/* Mobile Hamburger Button */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="md:hidden"
      >
        <Button onClick={toggleMenu}>
          {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </Button>
      </motion.div>

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20">
          <div className="absolute top-0 right-0 w-3/4 sm:w-1/2 h-full bg-white shadow-lg z-30">
            <div className="p-6 flex justify-end">
              <Button onClick={toggleMenu}>
                <X className="w-6 h-6 text-white" />
              </Button>
            </div>
            <nav className="space-y-4 text-center text-lg">
              <Link href="/" className="block py-2">Home</Link>
              <Link href="/about-us" className="block py-2">About Us</Link>
              <Link href="/features" className="block py-2">Features</Link>
              <Link href="/how-it-works" className="block py-2">How it works</Link>
              <Link href="/pricing" className="block py-2">Pricing</Link>
            </nav>
          </div>
        </div>
      )}

      {/* Get Started Button (always visible) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <Button>
          <Link href={'/dashboard/home'}>Get Started</Link>
        </Button>
      </motion.div>
    </header>
  );
}
