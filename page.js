"use client";

import { useState } from 'react';

export default function Home() {
    const [z, setZ] = useState(1000);
    const [x, setX] = useState(500);
    const [output, setOutput] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const y = z - x;
        const ANS = x * y;
        setOutput(`TOTAL: ${z}\nX,Y: ${x},${y}\nX*Y: ${ANS}`);
    };

    return (
        <div>
            <h1>abc026a</h1>
            <p>合計値Zを選んでください。0からZの範囲でXを選んでください。X*Yを出力します。</p>
            <form onSubmit={handleFormSubmit}>
                <div className="slider-container">
                    <label htmlFor="z">Select Z value:</label>
                    <input type="range" id="z" min="0" max="1000" value={z} onChange={(e) => setZ(parseInt(e.target.value))} />
                    <span>{z}</span>
                </div>
                <div className="slider-container">
                    <label htmlFor="x">Select X value:</label>
                    <input type="range" id="x" min="0" max={z} value={x} onChange={(e) => setX(parseInt(e.target.value))} />
                    <span>{x}</span>
                </div>
                <input type="submit" value="Submit" />
            </form>
            <p id="output">{output}</p>
        </div>
    );
}