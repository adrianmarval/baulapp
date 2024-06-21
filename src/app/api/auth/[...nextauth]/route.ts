import {loginUser} from '@/actions/user/login-user';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {label: 'Email', type: 'text', placeholder: 'jsmith@gmail.com'},
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const response = await loginUser(credentials.email, credentials.password);

          return response.user;
        } catch (error) {
          console.error('Error in authorization:', error);
          return null;
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
