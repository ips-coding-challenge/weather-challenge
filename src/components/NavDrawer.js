import React, { useState } from "react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  citiesState,
  showDrawerState,
  currentCityState,
  searchLocation,
  loadingState,
} from "../state/state";
import Axios from "axios";

const NavDrawer = ({ search }) => {
  const cities = useRecoilValue(citiesState);
  const [show, setShow] = useRecoilState(showDrawerState);
  const [currentCity, setCurrentCity] = useRecoilState(currentCityState);
  const setLoading = useSetRecoilState(loadingState);
  const [location, setLocation] = useState("");
  const BASE_URL =
    "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/";

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  const launchSearch = (e) => {
    if (e.key === "Enter") {
      setLocation("");
      setLoading(true);
      search(location);
      setShow(false);
      // try {
      //   const response = await Axios.get(
      //     `${BASE_URL}/search/?query=${location}`
      //   );
      //   console.log(`Response data`, response.data);
      //   setCurrentCity(response.data[0]);
      //   setLocation("");
      //   setShow(false);
      // } catch (e) {
      //   throw e;
      // }
    }
  };

  return (
    <div className="nav-drawer">
      <div className="close" onClick={() => setShow(false)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          width="18px"
          height="18px"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </div>
      <div className="form-group">
        <div className="input-group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            width="18px"
            height="18px"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input
            type="text"
            placeholder="search location"
            onChange={handleChange}
            onKeyDown={launchSearch}
          />
        </div>
        <button className="btn btn-blue">Search</button>
      </div>

      {cities && cities.length > 0 && (
        <ul>
          {cities.map((city) => (
            <li key={city.woeid}>{city.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NavDrawer;
