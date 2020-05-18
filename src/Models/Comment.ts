
export class PostComment {
    author: string;
    date: string;
    content: string;

    parseData(data) {
        this.author = data.author;
        this.date = data.date;
        this.content = data.content;
    }
}