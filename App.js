import React, { useState } from 'react';

function App() {
  const [rate, setRate] = useState(1200);
  const [contest, setContest] = useState('');

  const handleSliderChange = (event) => {
    setRate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const contestType = rate < 1200 ? 'ABC' : 'ARC';
    setContest(`RATE: ${rate}\nCONTEST: ${contestType}`);
  };

  return (
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
        <button type="submit">Submit</button>
      </form>

      <p id="output">{contest}</p>
    </div>
  );
}

export default App;
