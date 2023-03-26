import { useEffect, useState } from "react";

export function PuzzleContainer() {
    const [ lowerBound, setLowerBound ] = useState(1);
    const [ puzzles, setPuzzles ] = useState([]);
    const [ numPuzzleEntries, setNumPuzzleEntries ] = useState(0);

    async function getPuzzles(lowerBound, abortController){

        const response = await fetch(`https://localhost:7051/GetPuzzles?lowerBound=${lowerBound}`, 
                                      abortController.signal);
                                      
        return await response.json();
    }

    async function getNumPuzzleEntries(abortController) {
        const response = await fetch('https://localhost:7051/GetPuzzleTotal', abortController.signal);

        return await response.json();
    }

    useEffect(() => {
        const abortController =  new AbortController();
        getPuzzles(lowerBound, abortController).then(setPuzzles);      
        return () => {
            abortController.abort();
        };
    }, [lowerBound]);

    useEffect(() => {
        const abortController = new AbortController();
        getNumPuzzleEntries(abortController).then(setNumPuzzleEntries);

        return () => {
            abortController.abort();
        }
    }, [])

    return (
        <div>
            {puzzles.map(({ puzzleId, puzzle }) => 
                <div key={puzzleId}>
                    <span>{puzzleId}</span>
                    <br></br>
                    <span>{puzzle}</span>
                </div>
            )}

            <button className="LeftButton" 
                    onClick={e => {
                        if (lowerBound > 1) {
                            setLowerBound(prev => prev - 10);
                        }
                    }}>&#8592;</button>
            <button className="RightButton"
                    onClick={e => {
                        if (lowerBound < numPuzzleEntries - 10) {
                            setLowerBound(prev => prev + 10);
                        }
                    }}>&#8594;</button>
        </div>
    );
}