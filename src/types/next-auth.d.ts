// types/next-auth.d.ts or @types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;  // Add the `id` field here
  }

  interface Session {
    user: User;
  }
}
