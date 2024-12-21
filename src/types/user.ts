import { PostType } from "./posts"

type UserType = {
    id: string
    email: string
    username: string
    name: string
    description: string
    avatar: string
    links: string[]
    posts: PostType[]
    settings: {
        theme: string
    }
    logs: object[]
    created: Date
}

export default UserType;