import React from "react";
import BlockWind from "./BlockWind";
import BlockHumidity from "./BlockHumidity";
import { useRecoilValue } from "recoil";
import { weatherState } from "../state/state";
import BlockVisibility from "./BlockVisibility";
import BlockAir from "./BlockAir";

const Highlight = () => {
  const weather = useRecoilValue(weatherState);
  console.log(`Weather in high`, weather);
  return (
    <div className="highlights">
      <h3>Today Highlights</h3>
      {weather && weather[0] && (
        <div className="blocks-container">
          <BlockWind weather={weather[0]} />
          <BlockHumidity weather={weather[0]} />
          <BlockVisibility weather={weather[0]} />
          <BlockAir weather={weather[0]} />
        </div>
      )}
    </div>
  );
};
export default Highlight;
