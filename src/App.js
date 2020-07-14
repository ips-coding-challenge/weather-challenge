import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import Axios from "axios";
import {
  citiesState,
  weatherState,
  loadingState,
  currentCityState,
  unitState,
  showDrawerState,
} from "./state/state";
import { useRecoilState, useRecoilValue } from "recoil";
import Today from "./components/Today";
import Forecast from "./components/Forecast";
import Highlights from "./components/Highlights";
import NavDrawer from "./components/NavDrawer";

function App() {
  const [loading, setLoading] = useRecoilState(loadingState);
  const [cities, setCities] = useRecoilState(citiesState);
  const [weather, setWeather] = useRecoilState(weatherState);
  const [currentCity, setCurrentCity] = useRecoilState(currentCityState);
  const [unit, setUnit] = useRecoilState(unitState);
  const [geolocation, setGeolocation] = useState(false);
  const [showDrawer, setShowDrawer] = useRecoilState(showDrawerState);
  const BASE_URL =
    "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/";
  // const BASE_URL = "http://localhost:1337/location/";

  useEffect(() => {
    (async () => {
      if ("geolocation" in navigator) {
        console.log(`Geolocation called`);
        await navigator.geolocation.getCurrentPosition(
          async (pos) => {
            setGeolocation(true);
            console.log(`Called`);
            const latitude = pos.coords.latitude;
            const longitude = pos.coords.longitude;
            try {
              const res = await Axios.get(
                `${BASE_URL}search?lattlong=${latitude},${longitude}`
              );
              setCities(res.data);
              setCurrentCity(res.data[0]);
              console.log(`Res`, res.data[0]);
            } catch (e) {
              console.log(`Error`, e);
            }
          },
          (e) => {
            if (e.code === e.PERMISSION_DENIED) {
              setShowDrawer(true);
              setGeolocation(false);

              console.log(`Permission denied`);
            }
          }
        );
      }
    })();
  }, [geolocation]);

  useEffect(() => {
    if (currentCity) {
      setLoading(true);
      window.scrollTo({
        top: 0,
      });
      (async () => {
        try {
          const response = await Axios.get(`${BASE_URL}${currentCity.woeid}`);
          console.log(`Response`, response);
          setWeather(response.data.consolidated_weather);
          setLoading(false);
        } catch (e) {
          console.log(`Error `, e);
          setLoading(false);
        }
      })();
    }
  }, [currentCity]);

  const handleUnitClick = (value) => {
    setUnit(value);
  };

  const searchLocation = async (location) => {
    // if (e.key === "Enter") {
    try {
      const response = await Axios.get(`${BASE_URL}search/?query=${location}`);
      // console.log(`Response data`, response.data);
      setCurrentCity(response.data[0]);
      // setLocation("");
      // setShow(false);
    } catch (e) {
      throw e;
    }
    // }
  };

  return (
    <div className="main">
      <aside>
        {showDrawer && <NavDrawer search={searchLocation} />}
        {/* {!geolocation && showDrawer && <NavDrawer search={searchLocation} />} */}
        <Today setGeolocation={setGeolocation} />
      </aside>
      <div className="right">
        {loading && <span className="today__loading">Loading...</span>}
        {!loading && currentCity && (
          <div className="container">
            <div className="unit-toggle">
              <button
                className={`btn-unit ${unit === "c" ? "active" : null}`}
                onClick={() => handleUnitClick("c")}
              >
                °C
              </button>
              <button
                className={`btn-unit ${unit === "f" ? "active" : null}`}
                onClick={() => handleUnitClick("f")}
              >
                °F
              </button>
            </div>
            <Forecast />
            <Highlights />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
