import { format } from "date-fns";

export const convertCToF = (value) => {
  console.log(`Value`, value);
  return (parseInt(value) * 9) / 5 + 32;
};

export const formatDate = (date) => {
  return format(new Date(date), "eeeeee, d LLL");
};

export const getImage = (weatherState) => {
  const imageName = weatherState.replace(" ", "");

  const finalPath = `/img/${imageName}.png`;

  return finalPath;
};
