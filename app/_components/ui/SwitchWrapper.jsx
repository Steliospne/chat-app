'use client';
import { useState, useEffect } from 'react';
import { Switch } from '../shadcn/switch';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/app/_components/shadcn/button';

const SwitchWrapper = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <>
      <Switch
        checked={darkMode}
        onCheckedChange={() => setDarkMode(!darkMode)}
        className='mr-2'
      />
      <Button
        variant='ghost'
        size='icon'
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? (
          <Sun className='h-[1.2rem] w-[1.2rem] invert' />
        ) : (
          <Moon className='h-[1.2rem] w-[1.2rem]' />
        )}
        <span className='sr-only'>Toggle theme</span>
      </Button>
    </>
  );
};

export { SwitchWrapper };
