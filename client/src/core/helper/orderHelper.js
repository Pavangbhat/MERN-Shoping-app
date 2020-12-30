import { API } from "../../backend";

export const createOrder = (userId, token, order) => {
  return fetch(`${API}/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ order: order }),
  }).then((response) => response.json());
};
