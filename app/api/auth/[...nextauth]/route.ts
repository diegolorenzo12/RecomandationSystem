import NextAuth, { JWT, Session, User } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { getSession } from "next-auth/react";

const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
            httpOptions: {
                agent: new (require('https').Agent)({ rejectUnauthorized: false })
            }
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
            username: { label: "Username", type: "text" },
            password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    console.log('credentials', credentials);

                    const formData = new FormData();
                    formData.append('username', credentials?.username ?? '');
                    formData.append('password', credentials?.password ?? '');

                    const response = await axios.post('http://localhost:5107/api/Users/login', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });

                    const user = response.data;

                    if (response.status === 200 && user) {
                        // Include idUser in the user object
                        return { ...user, id: user.idUser, userTags: user.userTags };
                    }

                    // If no error and we have user data, return it
                    if (response.status === 200 && user) {
                        return user;
                    }
                    // Return null if user data could not be retrieved
                    return null;
                } catch (error) {
                    console.error('Login error:', error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account?.provider === 'github') {
                try {
                    const response = await axios.post('http://localhost:5107/api/Users/githubLogin', {
                        githubId: profile?.id?.toString(),
                        email: profile?.email,
                        name: profile?.name
                    });

                    const dbUser = response.data;

                    if (response.status === 200 && dbUser) {
                        user.id = dbUser.idUser;
                        user.userTags = dbUser.userTags;
                        return true;
                    } else {
                        return false;
                    }
                } catch (error) {
                    console.error('GitHub login error:', error);
                    return false;
                }
            }

            return true;
        },
        async jwt({ token, user, account, profile }) {
            if (user) {
              token.id = user.id;
              token.userTags = user.userTags;
              token.hasUserTags = user.userTags && user.userTags.length > 0;
            }
            return token;
        },
        async session({ session, token, user }) {
            if (token) {
              session.user.id = token.id as string;
              session.user.userTags = token.userTags as string[];
              session.user.hasUserTags = token.hasUserTags as boolean;
            }
            return session;
          },
          async redirect({ url, baseUrl }) {
            const session = await getSession();
            if (session?.user.hasUserTags) {
              return `${baseUrl}/recomendations`;
            }
            return `${baseUrl}/survey`;
        }
    },
    pages: {
        signIn: '/login', // Customize the sign-in page URL
    }
})

export { handler as GET, handler as POST }