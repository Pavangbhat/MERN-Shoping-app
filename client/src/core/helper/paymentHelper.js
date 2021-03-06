import { API } from "../../backend";

export const getMeToken = (userId, token) => {
  return fetch(`${API}/payment/gettoken/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
};

export const processPayment = (
  userId,
  token,
  nonceFromTheClient,
  amountFromTheClient,
  shippingInfo
) => {
  return fetch(`${API}/payment/barintree/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      amount: amountFromTheClient,
      nonceFromTheClient,
      shippingInfo,
    }),
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
};
