
export class PostComment {
    author: string;
    date: Date;
    content: string;

    parseData(data) {
        this.author = data.Author;
        this.date = new Date(Date.parse(data.Date));
        this.content = data.Content;
    }
}