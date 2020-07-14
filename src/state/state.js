import { atom, selector, selectorFamily } from "recoil";
import Axios from "axios";
const BASE_URL =
  "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/";

export const unitState = atom({
  key: "unitState",
  default: "c",
});

export const loadingState = atom({
  key: "loadingState",
  default: false,
});

export const citiesState = atom({
  key: "citiesState",
  default: [],
});

export const weatherState = atom({
  key: "weatherState",
  default: [],
});

export const currentCityState = atom({
  key: "currentCityState",
  default: null,
});

export const showDrawerState = atom({
  key: "showDrawerState",
  default: false,
});

export const searchLocation = selectorFamily({
  key: "searchLocation",
  get: (location) => async () => {
    console.log(`Called with location ${location}`);
    try {
      const response = await Axios.get(`${BASE_URL}/search/?query=${location}`);
      console.log(`Response data`, response.data);
      return response.data;
    } catch (e) {
      throw e;
    }
  },
});
