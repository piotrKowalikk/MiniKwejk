import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Post } from "../../Models/Post";
import { PostView } from "./Post";
import { PostComment } from "../../Models/Comment";
import Comments from "./Comments";

interface IPostDetailsContainerProps extends RouteComponentProps {

}
interface IFetchPostData {
    post: Post;
    comments: PostComment[];
}

const fetchPosts = async (id: string): Promise<IFetchPostData> => {
    let response = await fetch("https://vppporgbhg.execute-api.us-east-1.amazonaws.com/Prod/PostDetails/" + id);
    let responseToJson = await response.json();

    if (response.status != 200)
        throw new Error('Not authorized');
    let post: Post = new Post();
    post.parseData(responseToJson);
    let comments: PostComment[] = [];
    let fromResponseComments: any[] = (responseToJson as any).Comments;
    for (let i = 0; i < fromResponseComments.length; i++) {
        let newComment: PostComment = new PostComment();
        newComment.parseData(fromResponseComments[i]);
        comments.push(newComment);
    }

    return { post: post, comments: comments.sort((a: PostComment, b: PostComment) => { return (a.date as any) - (b.date as any); }) };
}


export const PostDetailsContainer: React.FC<IPostDetailsContainerProps> = (props: IPostDetailsContainerProps) => {
    let id: string = (props.match.params as any).id;
    const [loading, setLoading] = React.useState<boolean>(true);
    const [post, setPost] = React.useState<Post>(null);
    const [comments, setComments] = React.useState<PostComment[]>([]);
    const anyName = async () => {
        let result: IFetchPostData = await fetchPosts(id);
        setPost(result.post);
        setComments(result.comments);
        setLoading(false);
    };
    React.useEffect(() => {
        if (post != null)
            return;
        anyName();
    });

    return (
        <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
                {loading &&
                    <span>Loading...</span>
                }
                {!loading &&
                    <div>
                        <PostView post={post} />
                        <Comments
                            onNewComment={anyName}
                            postId={id}
                            comments={comments}
                        />
                    </div>
                }
            </div>
            <div className="col-md-3"></div>
        </div>
    );
}