'use client';

import { useState, useActionState } from 'react';
import { Button } from '@/app/_components/shadcn/button';
import { Input } from '@/app/_components/shadcn/input';
import { Label } from '@/app/_components/shadcn/label';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/_components/shadcn/card';

import { login } from '@/app/actions/auth';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

const LoginForm = () => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [state, action] = useActionState(login, undefined);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Card className='m-auto w-full max-w-md shadow'>
      <CardHeader>
        <CardTitle className='text-center text-2xl font-bold'>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='username'>Username</Label>
            <Input
              className='rounded-lg'
              id='username'
              name='username'
              type='text'
              value={formData.username}
              onChange={handleChange}
              required
            />
            {state?.errors?.name && formErrors(state.errors.name)}
          </div>
          <div className='relative space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              name='password'
              type={visible ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              onClick={() => setVisible(!visible)}
              type='button'
              className='absolute right-[12px] top-[34px] m-0 transition duration-300 ease-in-out md:hover:scale-105'
            >
              {visible ? <EyeOff /> : <Eye />}
            </button>
            {state?.errors?.password && formErrors(state.errors.password)}
          </div>
          <Button type='submit' className='w-full'>
            Login
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Link
          href='/signup'
          className='font-medium transition delay-100 duration-300 ease-in-out hover:scale-105 hover:text-indigo-700 hover:underline'
        >
          Create account
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
