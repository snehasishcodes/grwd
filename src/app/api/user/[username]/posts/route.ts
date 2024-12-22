import connectMongoDB from "@/database/connect";
import users from "@/database/models/users";
import { auth } from "@/providers/auth";

export async function GET(req: Request, { params }: { params: Promise<{ username: string }> }) {
    await connectMongoDB();

    const username = (await params).username;
    const session = await auth();

    const user = await users.findOne({ username });

    if (user && user.username === username) {
        const posts = user.posts;

        return Response.json({
            success: true,
            user: {
                id: user.id,
                isAuthor: user.email === session?.user?.email
            },
            posts,
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