import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import Axios from "axios";
import {
  citiesState,
  weatherState,
  loadingState,
  currentCityState,
} from "./state/state";
import { useRecoilState } from "recoil";
import Today from "./components/Today";
import Forecast from "./components/Forecast";
import Highlights from "./components/Highlights";

function App() {
  const [loading, setLoading] = useRecoilState(loadingState);
  const [cities, setCities] = useRecoilState(citiesState);
  const [weather, setWeather] = useRecoilState(weatherState);
  const [currentCity, setCurrentCity] = useRecoilState(currentCityState);
  const BASE_URL =
    "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/";

  useEffect(() => {
    (async () => {
      if ("geolocation" in navigator) {
        await navigator.geolocation.getCurrentPosition(async (pos) => {
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
        });
      }
    })();
  }, [setCities, setCurrentCity]);

  useEffect(() => {
    if (currentCity) {
      (async () => {
        setLoading(true);
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
  }, [currentCity, setWeather]);

  return (
    <div className="main">
      <aside>
        <Today />
      </aside>
      <div className="right">
        <Forecast />
        <Highlights />
      </div>
    </div>
  );
}

export default App;
