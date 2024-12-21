import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import connectMongoDB from "@/database/connect";
import users from "@/database/models/users";
import emailToUsername from "@/lib/email-username";
import createID from "@/lib/id";

const nextAuthOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user }) {
            if (!user || !user.email || typeof user.email !== "string") {
                // console.error("Invalid user data:", user);
                return false;
            }

            try {
                await connectMongoDB();

                const existingUser = await users.findOne({ email: user.email });
                // console.log("Existing user:", existingUser);

                if (!existingUser) {
                    let username = emailToUsername(user.email);
                    let usernameExists = await users.findOne({ username });
                    let randomNumber = Math.floor(Math.random() * 1000);

                    while (usernameExists) {
                        username = `${emailToUsername(user.email)}${randomNumber}`;
                        usernameExists = await users.findOne({ username });
                        randomNumber = Math.floor(Math.random() * 1000);
                    }

                    const id = createID();
                    const userData = {
                        id,
                        email: user.email,
                        username,
                        name: user.name ?? emailToUsername(user.email),
                        avatar: user.image ?? "default",
                        posts: [],
                        settings: { theme: "dark" },
                        logs: [{
                            title: "Account Created",
                            description: `on ${new Date().toLocaleDateString()}.`,
                            created: new Date(),
                        }],
                        created: new Date(),
                    };

                    user.id = id;
                    await users.create(userData);
                    // console.log("Created new user:", userData);

                    return true;
                } else {
                    existingUser.logs.push({
                        title: "New Login",
                        created: new Date(),
                    });

                    user.id = existingUser.id;
                    await existingUser.save();
                    // console.log("Existing user logged in:", existingUser);

                    return true;
                }
            } catch (e) {
                console.error("Error during sign-in:", e);
                return false;
            }
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    }
};

export default nextAuthOptions;