import * as React from "react";
import { IPostProps, PostView } from "./Post";
import { Post } from "../../Models/Post";

interface IPostContainerProps {
    post: Post;
}
//logic functions go here

export const PostContainer: React.FC<IPostContainerProps> = (props: IPostContainerProps) => {
    return (
        <PostView
            post={props.post}
        />
    );
};