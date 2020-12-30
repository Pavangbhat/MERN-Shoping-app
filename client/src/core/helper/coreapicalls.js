import { API } from "../../backend";

export const getAllProducts = () => {
  return fetch(`${API}/products`)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
