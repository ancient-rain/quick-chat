import { FirebaseFlatSnapshot } from './firebase-flat-snapshot';
import { Author } from './author';

export class Post extends FirebaseFlatSnapshot {
    public authorKey: string;
    public postBody: string;

    constructor(obj?: any) {
        super(obj);
        this.authorKey = obj && obj.authorKey || '';
        this.postBody = obj && obj.postBody || '';
    }
}

export class PostWithAuthor extends Post {
    public author: Author;

    constructor(obj?: any) {
        super(obj);
        this.author = obj && obj.author || new Author();
    }
}
