import Navbar from "@/components/navbar";

async function UserProfile({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const userData = await fetch(process.env.NEXT_APP_URL + "/api/user/" + id).then((r) => r.json());
    const user = userData.user;

    // console.log(user, user?.isAuthor)

    if (!user) return (<div></div>)

    return (
        <>
            <Navbar user={user} />

            <main></main>
        </>
    )
}

export default UserProfile;