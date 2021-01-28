import React, { useState, useRef } from 'react';

const App = () => {
  const [moneyWastedSoFar, setMoney] = useState(0)
  const [isWasting, setIsWasting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const increment = useRef(null)

  const usdPerHour = 25

  const handleStart = () => {
    setIsWasting(true)
    setIsPaused(true)
    increment.current = setInterval(() => {
      setMoney((moneyWastedSoFar) => moneyWastedSoFar + usdPerHour / 60)
    }, 1000)
  }

  const handlePause = () => {
    clearInterval(increment.current)
    setIsPaused(false)
  }

  const formatCurrency = () => {
    return `$ ${moneyWastedSoFar.toFixed(2)}`
  }

  return (
    <div className="app">
      <div className='money-wasted'>
        <p>
          As a develper, earning {usdPerHour} bucks per hour
          I want to know how much my meetings cost my employer:
        </p>
        <p>{formatCurrency()}</p>
        <div className='buttons'>
          {
            !isWasting && !isPaused ?
              <button onClick={handleStart}>Start</button>
              : (
                isPaused ? <button onClick={handlePause}>Pause</button> :
                  <button onClick={handleStart}>Resume</button>
              )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
