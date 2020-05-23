import * as React from "react";
import { PostContainer } from "../PostContainer";
import { Post } from "../../../Models/Post";
import { PostList } from "./PostList";
import { Paginator } from "./Paginator";
import { getThemeProps } from "@material-ui/styles";

interface IFetchPostsData {
    numberOfPages: number;
    posts: Post[];
}

const fetchPosts = async (pageNumber = 1): Promise<IFetchPostsData> => {
    let response = await fetch("https://vppporgbhg.execute-api.us-east-1.amazonaws.com/Prod/PostsList/" + pageNumber);
    let responseToJson = await response.json();

    if (response.status != 200)
        throw new Error('Not authorized');
    let tmpPosts: Post[] = [];
    for (let postData of responseToJson.Posts) {
        let newPost: Post = new Post();
        newPost.parseData(postData);
        tmpPosts.push(newPost);
    }
    let result: IFetchPostsData = {
        numberOfPages: responseToJson.PagesCount,
        posts: tmpPosts.sort((a: Post, b: Post) => { return -1 * ((a.date as any) - (b.date as any)); })
    };
    return result;
}


export const PostListContainer: React.SFC = () => {
    const [posts, setPosts] = React.useState<Post[]>([]);
    const [numberOfPostsOnPage, setNumberOfPostsOnPage] = React.useState<number>(10);
    const [numberOfPages, setNumberOfPosts] = React.useState<number>(0);
    const [pageNumber, setPageNumber] = React.useState<number>(1);
    const [loading, setLoading] = React.useState<boolean>(true);

    const pageNumberChange = async (pageNumber: number) => {
        setLoading(true);
        let data: IFetchPostsData = await fetchPosts(pageNumber);
        setPosts(data.posts);
        setNumberOfPosts(data.numberOfPages);
        setPageNumber(pageNumber);
    };

    React.useEffect(() => {
        if (posts.length > 0)
            return;
        (async function anyName() {
            await pageNumberChange(1)
        })();
    });

    return (
        <div className="row">
            <div className="col-md-3"></div>
            {numberOfPages > 0 &&
                <div className="col-md-6">
                    <Paginator
                        onPageChange={pageNumberChange}
                        numberOfPostsPerPage={numberOfPostsOnPage}
                        numberOfPages={numberOfPages}
                        pageNumber={pageNumber}
                        />
                    <PostList posts={posts} />
                    <Paginator 
                        onPageChange={pageNumberChange}
                        numberOfPostsPerPage={numberOfPostsOnPage}
                        numberOfPages={numberOfPages}
                        pageNumber={pageNumber}
                        />
                </div>
            }
            <div className="col-md-3"></div>
        </div>
    );
}