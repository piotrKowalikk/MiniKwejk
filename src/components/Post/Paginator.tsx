import * as React from "react";

interface IPaginatorProps {
    onPageChange: any;
    numberOfPosts: number;
    numberOfPostsPerPage: number;
}

const createButtons = (leftButtons, currentPage, rightButtons, eventHandler): any[] => {
    let buttons: any[] = [];
    for (let i: number = leftButtons; i > 0; i--) {
        buttons.push(
            <button type="button"
                key={currentPage - i}
                onClick={() => eventHandler(currentPage - i)}
                style={{ marginLeft: 2 }}
                className="btn btn-dark"
                data-loading-text=" ... ">
                {currentPage - i}
            </button>
        );
    }
    buttons.push(
        <button type="button"
            key={currentPage}
            onClick={() => eventHandler(currentPage)}
            style={{ marginLeft: 2 }}
            className="btn btn-dark"
            disabled={true}
            data-loading-text=" ... ">
            {currentPage}
        </button>
    );
    for (let i: number = 1; i <= rightButtons; i++) {
        buttons.push(
            <button type="button"
                key={currentPage + i}
                onClick={() => eventHandler(currentPage + i)}
                style={{ marginLeft: 2 }}
                className="btn btn-dark"
                data-loading-text=" ... ">
                {currentPage + i}
            </button>
        );
    }
    return buttons;
};

export const Paginator: React.FC<IPaginatorProps> = (props: IPaginatorProps) => {
    const numberOfButtons: number = 5;
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [numberOfLeftButtons, setNumberOfLeftButtons] = React.useState<number>(0);
    const [numberOfRightButtons, setNumberOfRightButtons] = React.useState<number>(numberOfButtons - 1);
    let numberOfPages = Math.floor(props.numberOfPosts / props.numberOfPostsPerPage);
    const onClickButton = (pageNumber) => {
        let newLeftButtons: number = 2;
        let newRightButtons: number = 2;
        switch (pageNumber) {
            case 1:
                newLeftButtons = 0;
                newRightButtons = 4;
                break;
            case 2:
                newLeftButtons = 1;
                newRightButtons = 3;
                break;
            case numberOfPages - 1:
                newLeftButtons = 3;
                newRightButtons = 1;
                break;
            case numberOfPages:
                newLeftButtons = 4;
                newRightButtons = 0;
                break;
            default:
                break;
        }
        props.onPageChange(pageNumber);
        setNumberOfLeftButtons(newLeftButtons);
        setNumberOfRightButtons(newRightButtons);
        setCurrentPage(pageNumber);
        setButtons(createButtons(newLeftButtons, pageNumber, newRightButtons, onClickButton))
    };
    const [buttons, setButtons] = React.useState<any>(createButtons(0, 1, 4, onClickButton));


    return (
        <div className="row" style={{ marginLeft: 0, marginRight: 0, marginTop: 5, width: "100%", textAlign: "center", display: "block" }}>
            {currentPage > 3 &&
                "... "

            }
            {
                buttons.map(
                    x => {
                        return x;
                    }
                )
            }
            {numberOfPages - currentPage > 3 &&
                " ..."

            }
        </div>
    );
}