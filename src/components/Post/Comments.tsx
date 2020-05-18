import * as React from "react";
import { PostComment } from "../../Models/Comment";

interface ICommentsProps {
    comments: PostComment[];
}

export const Comments: React.FC<ICommentsProps> = (props: ICommentsProps) => {
    let commentStyle: React.CSSProperties = {
        backgroundColor: "#26292d",
        color: "white"
    };
    return (
        <div style={{ borderStyle: "groove" }}>
            {props.comments.length > 0 &&
                props.comments.map((element: PostComment) => {
                    return (
                        <div>
                            <div className="row" style={{ backgroundColor: "black", padding: 3, color: "white", margin: 0 }}>
                                <div className="col-md-8" style={{ paddingLeft: 0, paddingRight: 0 }}><img src="https://i1.kwejk.pl/k/users/thumbs/default.png" width="20" style={{ borderRadius: "50%" }} />{" " + element.author}</div>
                                <div className="col-md-4" style={{ textAlign: "right", paddingLeft: 0, paddingRight: 0 }}>{element.date}</div>
                            </div>
                            <div className="row" style={{ backgroundColor: "#26292d", padding: 3, color: "white", margin: 0 }}>
                                <div style={{ paddingLeft: 25 }}>{element.content}</div>
                            </div>
                        </div>);
                })
            }
            <div className="form-inline row" style={{ backgroundColor: "#26292d", padding: 3, color: "white", margin: 0 }}>
                <input className="form-control col-md-10" style={{width:"100%", paddingRight:5}} placeholder="Text of your comment"/>
                <input className="btn btn-success col-md-2" style={{float:"right", paddingLeft:5}} value="Add comment"/>
            </div>
        </div>
    );
}