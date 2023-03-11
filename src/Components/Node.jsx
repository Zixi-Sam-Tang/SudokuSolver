import { useState } from "react"
import '../styles/Node.css'

export function Node({row, col, onChange, val}) {
    
    const [prevVal, setPrevVal] = useState(0);

    const change = e => {
        onChange(row, col, e.target.value, prevVal);
        setPrevVal(Number(e.target.value));
    }

    const getClass = () => {
        let temp = 'NodeInput ';
        if(row % 3 == 0) {
            temp = temp + 'BoldTop ';
        }
        if(row == 8) {
            temp = temp + 'BoldBottom ';
        }
        if(col % 3 == 0) {
            temp = temp + 'BoldLeft ';
        }
        if(col == 8) {
            temp = temp + 'BoldRight ';
        }

        return temp;
    }

    return (
        <div className="Node">
            <input className={getClass()} 
                   onChange={change}
                   inputMode="numeric" type="text"
                   maxLength="1" autoComplete="off"
                   value={val === 0 ? "" : val.toString()}></input>
        </div>
    );

};