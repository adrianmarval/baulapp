'use server';

import {connectDb} from '@/libs/mongodb';
import User from '@/models/user';
import crypto from 'crypto';

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

    const [salt, storedHash] = user.password.split(':');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    const passwordMatch = storedHash === hash;

    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    const {_id, firstName, lastName, email: userEmail, image} = user.toObject();

    return {
      success: true,
      message: 'Login successful!',
      user: {
        id: _id.toString(),
        name: `${firstName} ${lastName}`,
        email: userEmail,
        image,
      },
    };
  } catch (error) {
    console.error('Error during login:', error);
    return {success: false, message: 'An error occurred during login'};
  }
};
