// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Profile {
    id?: string;
    email?: string;
    name?: string;
  }

  interface Session {
    user: {
      id: string;
      userTags: string[];
      hasUserTags: boolean;
      email?: string;
      name?: string;
      image? : string;
    }
  }

  interface User {
    id: string;
    userTags: string[];
    image?: string; 
  }

  interface JWT {
    id: string;
    userTags: string[];
    hasUserTags: boolean;
  }
}
