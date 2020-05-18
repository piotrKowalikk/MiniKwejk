import * as React from "react";


export const CreatePost: React.SFC = () => {
    const styleCard: React.CSSProperties = {
        borderStyle: "groove",
        marginTop: 5,
        "maxWidth": "45vw",
        backgroundColor: "#26292d",
        minHeight: "20vh",
        color: "white",
        paddingLeft: "100px",
        paddingTop: 30,
        paddingBottom: 30,
        paddingRight: 100
    };
    let fileInput = React.useRef();
    const [title, setTitle] = React.useState<string>("");
    const [fileName, setFileName] = React.useState<string>("");

    return (
        <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6" style={styleCard}>
                <div>
                    <label style={{fontSize:20}} >Create post </label>
                </div>
                <div className="custom-file input-group">
                    <input required type="file" accept="image/*" onChange={() => {
                        if (fileInput.current && (fileInput.current as any).files && (fileInput.current as any).files.length > 0) {
                            setFileName((fileInput.current as any).files[0].name);
                        }
                    }} className="custom-file-input" id="customFile" ref={fileInput} />
                    <label className="custom-file-label" htmlFor="customFile">
                        Choose image
                        </label>
                    <label>
                        {fileName}
                    </label>
                </div>
                <div className="mb-2 mt-2">
                    <input type="text" className="form-control" placeholder="Your title" required onChange={(event => { console.log(title); setTitle(event.target.value) })} />
                </div>
                <button className="btn btn-primary">Upload!</button>
            </div>
            <div className="col-md-3"></div>
        </div>);
}