'use client';
import { useState, useActionState } from 'react';
import { Button } from '@/app/_components/shadcn/button';
import { Input } from '@/app/_components/shadcn/input';
import { Label } from '@/app/_components/shadcn/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/_components/shadcn/card';
import { signup } from '@/app/actions/auth';
import { formErrors } from '@/app/lib/utils';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConf: '',
  });

  const [state, action] = useActionState(signup, undefined);

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
        <CardTitle className='text-center text-2xl font-bold'>
          Sign Up
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Name</Label>
            <Input
              className='rounded-lg'
              id='name'
              name='name'
              type='text'
              placeholder='John Doe'
              value={formData.name}
              onChange={handleChange}
              required
            />
            {state?.errors?.name && formErrors(state.errors.name)}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              name='email'
              type='email'
              placeholder='johndoe@example.com'
              value={formData.email}
              onChange={handleChange}
              required
            />
            {state?.errors?.email && formErrors(state.errors.email)}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              name='password'
              type='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
            {state?.errors?.password && formErrors(state.errors.password)}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='passwordConf'>Repeat Password</Label>
            <Input
              id='passwordConf'
              name='passwordConf'
              type='password'
              value={formData.passwordConf}
              onChange={handleChange}
              required
            />
            {state?.errors?.passwordConf &&
              formErrors(state.errors.passwordConf)}
          </div>
          <Button type='submit' className='w-full'>
            Sign Up
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
