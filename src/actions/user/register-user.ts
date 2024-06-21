'use server';

import {connectDb} from '@/libs/mongodb';
import User from '@/models/user';
import bcrypt from 'bcrypt';

export async function registerUser(email: string, password: string) {
  try {
    if (!email || !password) {
      return {success: false, message: 'Missing email or password'};
    }
    await connectDb();

    const existingUser = await User.findOne({email});

    if (existingUser) {
      return {success: false, message: 'Email already registered'};
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({email, password: hashedPassword});
    await user.save();

    return {success: true, message: 'Registration successful!'};
  } catch (error) {
    console.error('Error during registration:', error);
    return {success: false, message: 'An error occurred during registration'};
  }
}
