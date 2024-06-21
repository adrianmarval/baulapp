'use server';

import {connectDb} from '@/libs/mongodb';
import User from '@/models/user';
import bcrypt from 'bcrypt';

export const loginUser = async (email: string, password: string) => {
  try {
    if (!email || !password) {
      throw new Error('Missing email or password');
    }

    await connectDb();

    const user = await User.findOne({email});

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    // Exclude password field from the returned user object for security.
    const {password: _, ...userWithoutPassword} = user.toObject();

    return {
      success: true,
      message: 'Login successful!',
      user: userWithoutPassword, // Return the user object without password
    };
  } catch (error) {
    console.error('Error during login:', error);
    return {success: false, message: 'An error occurred during login'};
  }
};
