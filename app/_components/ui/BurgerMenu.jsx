'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function BurgerMenu({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative flex items-center' ref={menuRef}>
      <button
        onClick={toggleMenu}
        className='rounded-lg p-2 text-zinc-700 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 dark:text-white dark:focus-visible:ring-zinc-300 md:hover:hover:text-indigo-500'
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
      </button>
      {isOpen && (
        <div className='absolute -right-[16px] top-[52px] z-10 h-[calc(100svh-64px)] w-[calc(100svw/2)] bg-white shadow-lg dark:bg-zinc-950'>
          {React.Children.map(children, (child, index) =>
            React.cloneElement(child, {
              className: `block px-4 py-2 text-sm text-zinc-700 hover:bg-green-500 text-center hover:bg-zinc-200 dark:text-white dark:hover:bg-zinc-700`,
            }),
          )}
        </div>
      )}
    </div>
  );
}
