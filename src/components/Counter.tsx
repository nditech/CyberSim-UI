import React, { useState, useEffect, useMemo } from "react";

import { CounterProps } from "../types/CounterProps";

const Counter: React.FunctionComponent<CounterProps> = ({ name }) => {
  const [fontSize, setFontSize] = useState<number>(10);

  const canDivideByThree = useMemo<boolean>(() => fontSize % 3 === 0, [
    fontSize,
  ]);

  useEffect(() => {
    if (canDivideByThree) {
      console.log(`New font size can be divided by three.`);
    }
  }, [canDivideByThree]);

  return (
    <>
      <button onClick={() => setFontSize(fontSize + 1)}>Increase</button>
      <button onClick={() => setFontSize(fontSize - 1)} disabled={fontSize < 2}>
        Decrease
      </button>
      <p
        style={{ fontSize: `${fontSize}px` }}
      >{`Hello, ${name} ${fontSize}`}</p>
    </>
  );
};

export default Counter;
