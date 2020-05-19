import * as React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { Post } from "../../Models/Post";
import { Link } from "react-router-dom";
import { innerGreyColor } from "../../colors";


export interface IPostProps {
    post: Post;
}

export const PostView: React.FC<IPostProps> = (props: IPostProps) => {
    const padding: number = 70;
    const styleCard: React.CSSProperties = {
        borderStyle: "groove",
        marginTop: 5,
        "maxWidth": "60vw",
        backgroundColor: innerGreyColor,
        marginRight:0
    };
    const styleAuthorBar: React.CSSProperties = {
        paddingLeft: padding,
        paddingRight: padding,
        backgroundColor: "black",
        color: "white",
        paddingTop: 10,
        paddingBottom: 10,
        margin: 0
    };
    const styleTitleBar: React.CSSProperties = {
        paddingLeft: padding,
        paddingRight: padding,
        color: "white",
        fontSize: "1.4rem"
    };
    const styleImageBar: React.CSSProperties = {
        textAlign: "center",
    };
    const ratingBar: React.CSSProperties = {
        paddingLeft: padding,
        paddingRight: padding,
        textAlign: "center",
        paddingBottom: 5,
    };
    const imgStyle: React.CSSProperties = {
        width: "100%",
        height: "auto",
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: padding,
        paddingRight: padding,

    };
    const onImageClick = () => {

    };
    return (
        <div style={styleCard}>
            <div className="row" style={styleAuthorBar}>
                <div className="col-md-8" style={{ paddingLeft: 0, paddingRight: 0 }}><img src="https://i1.kwejk.pl/k/users/thumbs/default.png" width="20" style={{ borderRadius: "50%" }} />{" " + props.post.author}</div>
    <div className="col-md-4" style={{ textAlign: "right", paddingLeft: 0, paddingRight: 0 }}>{props.post.date}</div>
            </div>
            <div style={styleTitleBar}>{props.post.title}</div>
            <div style={styleImageBar}>
                <Link className='btn shadow-none' style={{ color: 'white' }} to={"/postDetails/" + props.post.id} >
                    <img style={imgStyle} src={props.post.imageURL} />
                </Link>
            </div>
            <div style={ratingBar}>
                <button type="button"
                    id="testBtn"
                    className="btn btn-success glyphicon glyphicon-thumbs-up"
                    data-loading-text=" ... ">
                    <FontAwesomeIcon icon={faThumbsUp} /> {props.post.numberOfLikes}
                </button>
            </div>
        </div >);
}