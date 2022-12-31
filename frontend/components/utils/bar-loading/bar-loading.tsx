import React, { useState, useEffect } from "react";

interface BarLoadingType {
  barWidth: number;
}

function BarLoading(props: BarLoadingType) {
  const [isLoading, setLoading] = useState(false);

  let bars = [];

  useEffect(() => {
    const barLoadingElem = document.getElementById("bar-loading");
    let width = barLoadingElem?.clientWidth;
    let numOfBars = 0;
    let count = 0;
    if (width) {
      numOfBars = (width + 10) / (props.barWidth + 10);
    }
    const interval = setInterval(() => {}, 1000);

    return () => clearInterval(interval);
  });

  return (
    <div
      id="bar-loading"
      className="max-w-[800px] w-full lg:w-[600px] xs:w-[300px] h-9"
    ></div>
  );
}
export default BarLoading;
