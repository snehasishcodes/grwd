import connectMongoDB from "@/database/connect";
import { getServerSession } from "next-auth";
import nextAuthOptions from "../../../auth/options";
import users from "@/database/models/users";

export async function GET(req: Request, { params }: { params: Promise<{ username: string }> }) {
    await connectMongoDB();
    const session = await getServerSession(nextAuthOptions);
    const username = (await params).username;

    const user = await users.findOne({ username });

    if (user && user.username === username) {
        const posts = user.posts;

        return Response.json({
            success: true,
            posts,
            isAuthor: user.email === session?.user?.email,
            code: 200
        });
    } else {
        return Response.json({
            success: false,
            message: "User not found.",
            code: 404
        });
    }

}