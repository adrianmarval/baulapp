'use server';

import {connectDb} from '@/libs/mongodb';
import User from '@/models/user';
import {userSchema} from '@/validations/userSchema';
import {z} from 'zod';

export async function registerUser(user: z.infer<typeof userSchema>) {
  // Validar los datos del usuario
  const validationResult = userSchema.safeParse(user);

  if (!validationResult.success) {
    return {success: false, message: 'Invalid user data', errors: validationResult.error.errors};
  }

  const {firstName, lastName, email, password} = validationResult.data;

  try {
    await connectDb();

    const existingUser = await User.findOne({email});

    if (existingUser) {
      return {success: false, message: 'Email already registered'};
    }

    const newUser = new User({firstName, lastName, email, password});
    await newUser.save();

    return {success: true, message: 'Registration successful!'};
  } catch (error) {
    console.error('Error during registration:', error);
    return {success: false, message: 'An error occurred during registration'};
  }
}
