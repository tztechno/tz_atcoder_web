import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
    const [rate, setRate] = useState(1200);
    const [output, setOutput] = useState('');

    const handleSliderChange = (event) => {
        setRate(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const contest = rate < 1200 ? 'ABC' : 'ARC';
        setOutput(`RATE: ${rate}\nCONTEST: ${contest}`);
    };

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>abc077b</title>
            </Head>
            <div>
                <h1>abc053a</h1>
                <p>
                    すめけくんは現在のレートが1200未満ならばAtCoderBeginnerContest(ABC)に、
                    そうでなければAtCoderRegularContest(ARC)に参加することにしました。
                    すめけくんの現在のレートxが与えられます。
                    すめけくんが参加するコンテストがABCならばABCと、そうでなければARCと出力してください。
                </p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="rate">Select your rate:</label>
                    <input
                        type="range"
                        id="rate"
                        min="0"
                        max="5000"
                        value={rate}
                        onChange={handleSliderChange}
                    />
                    <span>{rate}</span> {/* Span to display selected value */}
                    <br />
                    <input type="submit" value="Submit" />
                </form>
                <p>{output}</p>
            </div>
        </>
    );
}
