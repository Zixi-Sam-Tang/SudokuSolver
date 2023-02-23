import React, { useState } from "react";
import { Node } from './Node'
import '../styles/board.css'

export function Board() {
    const [nodes, setNodes] = useState(initBoard);
    const [rows, setRows] = useState(Array(9).fill(0));
    const [cols, setCols] = useState(Array(9).fill(0));
    const [boxes, setBoxes] = useState(Array(9).fill(0));

    function getBox(row, col) {
        return Math.floor(row / 3) * 3 + Math.floor(col / 3);
    };

    function checkSafe(row, col, num) {
        return !((rows[row] >> num) & 1)
            && !((cols[col] >> num) & 1)
            && !((boxes[getBox(row, col)] >> num) & 1);
    };

    function initBoard() {
        const grid = [];
        for (let i = 0; i < 9; i++) {
            grid.push([]);
            for (let j = 0; j < 9; j++) {
                grid[i].push(0);
            }
        }
        return grid;
    };

    function solve(row, col) {
    
        if (row === 8 && col === 9) {
            return true;
        } 
        else if (col === 9) {
            col = 0;
            row++;
        }

        if (nodes[row][col] !== 0) {
            return solve(row, col + 1);
        }
    
        for (let tryVal = 1; tryVal <= 9; tryVal++) {
            if (checkSafe(row, col, tryVal)) {
                nodes[row][col] = tryVal;
                rows[row] |= 1 << tryVal;
                cols[col] |= 1 << tryVal;
                boxes[getBox(row, col)] |= 1 << tryVal;
    
                if (solve(row, col + 1)) {
                    setNodes([...nodes]);
                    return true;
                }
    
                rows[row] &= ~(1 << tryVal);
                cols[col] &= ~(1 << tryVal);
                boxes[getBox(row, col)] &= ~(1 << tryVal);
                setNodes([...nodes]);
                setRows([...rows]);
                setCols([...cols]);
                setBoxes([...boxes]);
            }
            nodes[row][col] = 0;
        }
    
        return false;
    
    };

    function solveClick() {
        if (!solve(0, 0)) {
            alert("No solutions found");
        }
    }

    function handleChange(row, col, val, prevVal) {
        if (!Number.isNaN(Number(val)) && Number(val) !== 0) {
            nodes[row][col] = Number(val);
            rows[row] |= 1 << Number(val);
            cols[col] |= 1 << Number(val);
            boxes[getBox(row, col)] |= 1 << Number(val);
        }
        else if (Number(val) === 0) {
            nodes[row][col] = 0;
            rows[row] &= ~(1 << prevVal);
            cols[col] &= ~(1 << prevVal);
            boxes[getBox(row, col)] &= ~(1 << prevVal);
        }
        else {
            alert("Invalid input detected at row: " + row + ", column: " + col);
        }
        setRows([...rows]);
        setCols([...cols]);
        setBoxes([...boxes]);
        setNodes([...nodes]);
        console.table(nodes);
        console.log(rows);
        console.log(cols);
        console.log(boxes);
    };

    function reset() {
        setNodes(initBoard);
        setRows(Array(9).fill(0));
        setCols(Array(9).fill(0));
        setBoxes(Array(9).fill(0));
    }

    console.table(nodes);

    return(
        <div className="Board">
            <div className="label">Sudoku Solver</div>
            <div className="grid">
                {
                    nodes.map((row, i) => 
                        row.map((node, j) => 
                            <Node onChange={handleChange} key={i.toString() + j.toString()} row={i} col={j} val={nodes[i][j]}></Node>
                        )
                    )
                }
            </div>
            <button className="solveBtn" onClick={solveClick}>Solve</button>
            <button className="resetBtn" onClick={reset}>Reset</button>
        </div>
    );
}