import {loginUser} from '@/actions/user/login-user';
import {NextAuthOptions, User} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {label: 'Email', type: 'text', placeholder: 'jsmith@gmail.com'},
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials, req): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing email or password');
        }

        try {
          const response = await loginUser(credentials.email, credentials.password);

          if (!response.success) {
            throw new Error(response.message || 'Login failed');
          }

          // Asegúrate de que el objeto devuelto cumpla con el tipo User de NextAuth
          const {id, name, email, image} = response.user!;

          return {
            id,
            name,
            email,
            image,
          };
        } catch (error) {
          console.error('Error during login:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: async ({session, token}) => {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
    jwt: async ({token, user}) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
  },
};
