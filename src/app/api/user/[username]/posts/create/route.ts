import connectMongoDB from "@/database/connect";
import users from "@/database/models/users";
import isValidDate from "@/lib/date";
import { auth } from "@/providers/auth";
import { PostType } from "@/types/posts";

export async function POST(req: Request, { params }: { params: Promise<{ username: string }> }) {
    await connectMongoDB();

    const username = (await params).username;
    const session = await auth();
    const sessionUser = session?.user;
    if (!session || !sessionUser || !sessionUser.email) return Response.json({ error: "Authentication required." }, { status: 401 });

    //date format: DD-MM-YYYY
    const { date, title, description, images, bgImage, url } = await req.json();

    if (date && isValidDate(date) !== true) return Response.json({ error: "Invalid Date. Only today's or yesterday's date is allowed." }, { status: 400 });
    if (!title && !description && !url && !images && !bgImage) return Response.json({ error: "One of title, description, url, images or bgImage is required." }, { status: 200 });
    if (title && typeof title !== "string") return Response.json({ error: "Title must be a valid string." }, { status: 400 });
    if (title && title.length > 50) return Response.json({ error: "Title can only be max. 50 characters in length." }, { status: 400 });
    if (title && typeof description !== "string") return Response.json({ error: "Description must be a valid string." }, { status: 400 });
    if (title && description.length > 2000) return Response.json({ error: "Description can only be max. 2000 characters in length." }, { status: 400 });
    if (url && typeof url !== "string") return Response.json({ error: "Invalid URL was provided." }, { status: 400 });
    if (bgImage && typeof bgImage !== "string") return Response.json({ error: "Invalid BG Image URL was provided." }, { status: 400 });
    if (images) {
        if (Array.isArray(images) !== true) return Response.json({ error: "Invalid images array." }, { status: 400 });
        for (let i = 0; i < images?.length; i++) {
            const image = images[i];
            if (!image?.url) images.splice(i, 1);
            if (image?.caption && typeof image?.caption !== "string") images.splice(i, 1);
        }
    }

    const user = await users.findOne({ email: sessionUser?.email });
    if (!user || user?.username !== username) return Response.json({ error: "Unauthorized Access." }, { status: 401 });

    const posts: PostType = user.posts;
    const dateExists = Object.keys(posts).find((d) => d === date);

    if (dateExists) {
        const justify = posts[date].justify ?? "start";
        const items = posts[date].items ?? [];

        const updatedPosts: PostType = {
            ...posts,
            [date]: {
                justify,
                items: [
                    {
                        position: items.length,
                        title,
                        description,
                        images,
                        bgImage,
                        url
                    },
                    ...items
                ]
            }
        }

        user.posts = updatedPosts;
        user.save();

        return Response.json({ success: "Post added." }, { status: 201 });
    } else {
        const updatedPosts: PostType = {
            ...posts,
            [date]: {
                justify: "start",
                items: [
                    {
                        position: 1,
                        title,
                        description,
                        images,
                        bgImage,
                        url
                    }
                ]
            }
        }

        user.posts = updatedPosts;
        user.save();

        return Response.json({ success: "Post created." }, { status: 201 });
    }

}