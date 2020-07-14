import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { weatherState, loadingState, currentCityState } from "../state/state";
import { formatDate, getImage } from "../utils/helper";
import NavDrawer from "./NavDrawer";

const Today = () => {
  const weather = useRecoilValue(weatherState);
  const loading = useRecoilValue(loadingState);
  const currentCity = useRecoilValue(currentCityState);
  const [showDrawer, setShowDrawer] = useState(false);

  const todayWeather = weather && weather[0] ? weather[0] : null;

  return (
    <div className="sidebar">
      {!loading && showDrawer && <NavDrawer show={showDrawer} />}
      <div className="today">
        {loading && <span className="today__loading">Loading...</span>}

        {weather && weather[0] && (
          <>
            <button
              onClick={() => setShowDrawer(!showDrawer)}
              class="btn btn-default btn-search"
            >
              Search for places
            </button>
            <img
              className="today__img"
              src={getImage(todayWeather.weather_state_name)}
              alt="Weather"
            />

            <div className="today__temp">
              {Math.round(todayWeather.the_temp)}
              <span className="unit">°C</span>
            </div>

            <h3 className="today__state">{todayWeather.weather_state_name}</h3>

            <div className="today__date">
              Today &middot; {formatDate(todayWeather.applicable_date)}
            </div>

            <div className="today__location">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C8.13 2 5 5.13 5 9C5 13.17 9.42 18.92 11.24 21.11C11.64 21.59 12.37 21.59 12.77 21.11C14.58 18.92 19 13.17 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                  fill="#88869D"
                />
              </svg>

              {currentCity && <span>{currentCity.title}</span>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Today;
