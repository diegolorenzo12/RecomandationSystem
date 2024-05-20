import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

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

                    const response = await axios.post('http://localhost:19537/api/Users/login', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });

                    const user = response.data;

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
        async redirect({ url, baseUrl }) {
           
            if (url === '/api/auth/signout' || url === '/user') {
                return `${baseUrl}/user`; // Custom redirect URL after signout
              }
            return `${baseUrl}/recomendations`;
        },
        async signIn({ user, account, profile, email, credentials }) {
            // Return true to indicate successful sign in
            return true;
        }
    },
    pages: {
        signIn: '/login', // Customize the sign-in page URL
    }
})

export { handler as GET, handler as POST }