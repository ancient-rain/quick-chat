import { FirebaseFlatSnapshot } from "./firebase-flat-snapshot";

export class Post extends FirebaseFlatSnapshot {
    public authorKey: string;
    public postBody: string;

    constructor(obj?: any) {
        super(obj);
        this.authorKey = obj && obj.authorKey || "";
        this.postBody = obj && obj.postBody || "";
    }
}
