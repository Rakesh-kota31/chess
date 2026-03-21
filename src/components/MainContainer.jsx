import {useState, useRef, useEffect} from "react";
import SecondaryContainer from "./SecondaryContainer.jsx";

const MainContainer = () => {
    const [matchStatus, setMatchStatus] = useState("not-started");
    const [winnerColor, setWinnerColor] = useState(null);

    const modalRef = useRef(null);

    const openModal = () => {
        modalRef.current.showModal();
    }

    const closeModal = () => {
        modalRef.current.close();
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

    useEffect(() => {
        if (matchStatus === "complete") {
            openModal();
        }
    }, [matchStatus]);

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
                matchStatus === "complete" &&
                <dialog ref={modalRef} id="my_modal_3" className="modal">
                    <div className="modal-box">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
                        <h3>{winnerColor} won</h3>
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <p className="py-4">Press ESC key or click on ✕ button to close</p>
                    </div>
                </dialog>
            }
        </div>
    )
}
export default MainContainer
