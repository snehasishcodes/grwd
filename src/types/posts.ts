export type PostType = {
    [key: string]: {
        justify: "start" | "between" | "evenly" | "around" | "end"
        items: PostItemType[]
    }
}

export type PostItemType = {
    position: number
    title: string
    description: string
    images: PostItemImageType[]
    bgImage: string | undefined
}

export type PostItemImageType = {
    url: string
    caption: string
}