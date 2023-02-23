import { useState } from "react"
import '../styles/Node.css'

export function Node({row, col, onChange, val}) {
    
    const [prevVal, setPrevVal] = useState(0);

    const change = e => {
        onChange(row, col, e.target.value, prevVal);
        setPrevVal(Number(e.target.value));
    }

    return (
        <div className="Node">
            <input className="NodeInput" onChange={change}
                   inputMode="numeric" type="text"
                   maxLength="1" autoComplete="off"
                   value={val === 0 ? "" : val.toString()}></input>
        </div>
    );

};