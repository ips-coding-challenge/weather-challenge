import { atom, selector } from "recoil";

export const unitState = atom({
  key: "unitState",
  default: "f",
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
