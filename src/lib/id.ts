export default function createID(): string {
    const timestamp = `${Date.now()}`;
    const additional = `${Math.floor(Math.random() * 10000)}`;

    return `${timestamp}${additional}`;
}