import React from 'react'

const RowIndexContainer = (props) => {
    const {board} = props;

    return (
        <div className={"row-index-container"}>
            {
                board.map((row, index) => (
                    <div className={"row-indexes"} key={index}>{board.length - index}</div>
                ))
            }
        </div>
    )
}
export default RowIndexContainer
