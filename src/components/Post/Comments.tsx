import * as React from "react";
import { PostComment } from "../../Models/Comment";
import { CognitoState } from 'react-cognito';
import { connect } from "react-redux";
import { innerGreyColor } from "../../colors";
interface ICommentsProps {
    comments: PostComment[];
    state: string;
    username: string;
    postId: string;
    onNewComment: any;
    store: any
}

const Comments: React.FC<ICommentsProps> = (props: ICommentsProps) => {
    const [newCommentText, setNewCommentText] = React.useState<string>("");
    let commentStyle: React.CSSProperties = {
        backgroundColor: innerGreyColor,
        color: "white"
    };

    const submitComment = async (event) => {
        let response = await fetch("https://vppporgbhg.execute-api.us-east-1.amazonaws.com/Prod/CreateComment",
            {
                method: "POST",
                mode:"no-cors",
                headers: {
                    "Authorization": props.store.cognito.user.signInUserSession.idToken.jwtToken
                },
                body: JSON.stringify({
                    "PostId": props.postId,
                    "Author": props.username,
                    "Content": newCommentText
                })
            });
        setNewCommentText("");
        props.onNewComment();

    };

    return (
        <div style={{ borderStyle: "groove" }}>
            {props.comments.length > 0 &&
                props.comments.map((element: PostComment) => {
                    return (
                        <div key={element.date.getTime()}>
                            <div className="row" style={{ backgroundColor: "black", padding: 3, color: "white", margin: 0 }}>
                                <div className="col-md-8" style={{ paddingLeft: 0, paddingRight: 0 }}><img src="https://i1.kwejk.pl/k/users/thumbs/default.png" width="20" style={{ borderRadius: "50%" }} />{" " + element.author}</div>
                                <div className="col-md-4" style={{ textAlign: "right", paddingLeft: 0, paddingRight: 0 }}>{element.date.toDateString()}</div>
                            </div>
                            <div className="row" style={{ backgroundColor: innerGreyColor, padding: 3, color: "white", margin: 0 }}>
                                <div style={{ paddingLeft: 25 }}>{element.content}</div>
                            </div>
                        </div>);
                })
            }
            {props.state == CognitoState.LOGGED_IN &&
                <div className="form-inline row" style={{ backgroundColor: innerGreyColor, padding: 3, color: "white", margin: 0 }}>
                    <input className="form-control col-md-10" style={{ width: "100%", paddingRight: 5 }} onChange={(e) => setNewCommentText(e.target.value)} value={newCommentText} placeholder="Text of your comment" />
                    <button className="btn btn-success col-md-2" style={{ float: "right", paddingLeft: 5 }} onClick={submitComment} disabled={newCommentText == ""} type="submit"  >Add comment</button>
                </div>
            }
        </div>
    );
}

const mapStateToProps = (store) => {
    return {
        store,
        state: store.cognito.state,
        username: store.cognito?.user?.username
    }
}

export default connect(mapStateToProps, null)(Comments)