import Navbar from "@/components/navbar";
import Timeline from "./timeline";

async function UserProfile({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;

    const userData = await fetch(process.env.NEXT_APP_URL + "/api/user/" + id).then((r) => r.json());
    const postsData = await fetch(process.env.NEXT_APP_URL + "/api/user/" + id + "/posts").then((r) => r.json());

    const user = userData.user;
    const posts = postsData.posts;

    console.log(posts)

    if (!user) return (<div></div>);

    return (
        <main className="max-h-screen min-h-screen h-screen w-full overflow-y-hidden flex flex-col justify-between items-center gap-4">
            <Navbar user={user} />
            <Timeline />
        </main>
    );
}

export default UserProfile;