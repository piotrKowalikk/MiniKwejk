import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Post } from "../../Models/Post";
import { PostView } from "./Post";
import { PostComment } from "../../Models/Comment";
import { Comments } from "./Comments";

interface IPostDetailsContainerProps extends RouteComponentProps {

}
interface IFetchPostData {
    post: Post;
    comments: PostComment[];
}

const fetchPosts = async (id: string): Promise<IFetchPostData> => {
    let response = await fetch("  http://localhost:3004/posts/" + id);
    let responseToJson: Post[] = await response.json();

    if (response.status != 200)
        throw new Error('Not authorized');
    let post: Post = new Post();
    post.parseData(responseToJson);
    let comments: PostComment[] = [];
    let fromResponseComments: any[] = (responseToJson as any).comments;
    for (let i = 0; i < fromResponseComments.length; i++) {
        let newComment: PostComment = new PostComment();
        newComment.parseData(fromResponseComments[i]);
        comments.push(newComment);
    }

    return { post: post, comments: comments };
}


export const PostDetailsContainer: React.FC<IPostDetailsContainerProps> = (props: IPostDetailsContainerProps) => {
    let id: string = (props.match.params as any).id;
    const [loading, setLoading] = React.useState<boolean>(true);
    const [post, setPost] = React.useState<Post>(null);
    const [comments, setComments] = React.useState<PostComment[]>([]);
    React.useEffect(() => {
        if (post != null)
            return;
        (async function anyName() {
            let result: IFetchPostData = await fetchPosts(id);
            setPost(result.post);
            setComments(result.comments);
            setLoading(false);
        })();
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
                            comments={comments}
                        />
                    </div>
                }
            </div>
            <div className="col-md-3"></div>
        </div>
    );
}