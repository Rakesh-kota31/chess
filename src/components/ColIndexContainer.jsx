import React from 'react'

const ColIndexContainer = (props) => {
    const {board} = props;
    return (
        <div className={"col-indexes-container"}>
            {
                board.map((row, index) => (
                    <div className={"col-indexes"} key={index}>{String.fromCharCode(97 + index)}</div>
                ))
            }
        </div>
    )
}
export default ColIndexContainer
