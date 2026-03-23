import {useState} from "react";
import SecondaryContainer from "./SecondaryContainer.jsx";

const MainContainer = () => {
    const [matchStatus, setMatchStatus] = useState("not-started");
    const [winnerColor, setWinnerColor] = useState(null);

    const closeModal = () => {
        setWinnerColor(null);
        resetMatch()
    }

    const resetMatch = () => {
        setMatchStatus("not-started");
    }

    const completeMatch = (color) => {
        setWinnerColor(color);
        setMatchStatus("complete");
    }

    const startMatch = () => {
        setMatchStatus("in-progress");
    }


    return (
        <div className="board">
            <div className={"title"}>Welcome to Chess World</div>
            <div className={"flex"}>
                {
                    matchStatus === "not-started" ?
                        <button
                            className={"start-button"}
                            onClick={startMatch}
                        >
                                Start Match
                        </button>
                        :
                        <button
                            className={"reset-button"}
                            onClick={resetMatch}
                        >
                            Reset board
                        </button>
                }
            </div>
            {
                matchStatus === "in-progress" &&
                    <SecondaryContainer
                        matchStatus={matchStatus}
                        completeMatch={completeMatch}
                    />
            }
            {
                matchStatus === "complete" && (
                    <div className="modal-overlay">
                        <div className="modal-box">
                            <button className="close-btn" onClick={closeModal}>✕</button>
                            <h1>{winnerColor} won</h1>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
export default MainContainer
