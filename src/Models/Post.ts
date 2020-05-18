

export class Post {
    id: string;
    imageURL: string;
    title: string;
    date: Date;
    author: string;
    numberOfLikes: number;

    parseData(data: any) {
        this.id = data.id;
        this.imageURL = data.imageURL;
        this.title = data.title;
        this.date = data.date;
        this.author = data.author;
        this.numberOfLikes = data.numberOfLikes;
    }
}