import { model, models, Schema } from "mongoose";

const users = models.users || model("users",
    new Schema({
        id: { type: String, required: true },
        email: { type: String, required: true },
        username: { type: String, required: true },
        name: { type: String, required: false },
        description: { type: String, required: false },
        avatar: { type: String, required: false },
        links: { type: Array, required: false, default: [] },
        posts: { type: Object, required: false, default: {} },
        settings: { type: Object, required: false, default: { theme: "dark" } },
        logs: { type: Array, required: false },
        created: { type: Date, required: true, default: new Date() }
    })
);

export default users;