import { z } from 'zod';
require('dotenv').config();

const inProd = process.env.PROD === 'true' ? true : false;

const SignupFormSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'Name must be at least 2 character long.' })
      .trim(),
    email: z
      .string()
      .email({ message: 'Please enter a valid email (example@domain.com)' })
      .trim(),
    password: inProd
      ? z
          .string()
          .min(8, { message: 'Must be at least 8 characters long' })
          .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
          .regex(/[0-9]/, { message: 'Contain at least one number.' })
          .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
          })
          .trim()
      : z
          .string()
          .min(4, { message: 'Must be at least 4 characters long' })
          .trim(),
    passwordConf: inProd
      ? z
          .string()
          .min(8, { message: 'Must be at least 8 characters long' })
          .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
          .regex(/[0-9]/, { message: 'Contain at least one number.' })
          .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
          })
          .trim()
      : z
          .string()
          .min(4, { message: 'Must be at least 4 characters long' })
          .trim(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConf) {
      ctx.addIssue({
        message: 'Passwords do not match',
        path: ['password'],
      });
    }

    if (data.password !== data.passwordConf) {
      ctx.addIssue({
        message: 'Passwords do not match',
        path: ['passwordConf'],
      });
    }
  });

const LoginFormSchema = z.object({
  username: z.string().trim().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().trim(),
});

export { SignupFormSchema, LoginFormSchema };
