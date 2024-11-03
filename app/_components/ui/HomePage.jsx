'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

export default function HomePage() {
  return (
    <div className='flex h-full flex-col items-center justify-center p-4'>
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <motion.header variants={itemVariants}>
          <h1 className='mb-8 text-center text-4xl font-bold text-blue-800 md:text-6xl'>
            Welcome to ChatApp
          </h1>
        </motion.header>
        <motion.div
          variants={itemVariants}
          className='w-full max-w-sm rounded-3xl bg-white p-6 shadow-lg'
        >
          <div className='flex items-center space-x-4'>
            <div className='rounded-full bg-blue-500 p-3'>
              <MessageCircle className='h-6 w-6 text-white' />
            </div>
            <div>
              <p className='text-lg font-semibold text-gray-800'>
                Start chatting now!
              </p>
              <p className='text-sm text-gray-600'>
                Connect with friends and family
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
