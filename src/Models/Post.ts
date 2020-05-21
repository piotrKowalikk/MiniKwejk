

export class Post {
    id: string;
    imageURL: string;
    title: string;
    date: Date;
    author: string;
    numberOfLikes: number;

    parseData(data: any) {
        this.id = data.Id;
        this.imageURL = data.ImageURL;
        this.title = data.Title;
        this.date = data.Date;
        this.author = data.Author;
        this.numberOfLikes = data.NumberOfLikes;
    }
}