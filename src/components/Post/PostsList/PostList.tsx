import * as React from "react";
import { PostContainer } from "../PostContainer";
import { Post } from "../../../Models/Post";

interface IPostContainerProps {
    posts: Post[];
}

export const PostList: React.FC<IPostContainerProps> = (props: IPostContainerProps) => {


    return (
        <div style={{paddingBottom:50}}>
            {props.posts.map(element => {
                return <PostContainer key={element.id} post={element} />;
            })
            }
        </div>);
}