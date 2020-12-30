import { API } from "../../backend";

//* Category

//? CreateCategory

export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: category }),
  }).then((response) => response.json());
};

// ? UpdateCategory

export const updateACategory = (categoryId, userId, token, name) => {
  return fetch(`${API}/category/update/${categoryId}/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  }).then((response) => {
    return response.json();
  });
};

// ? DeleteCategory
export const deleteCategory = (categoryId, userId, token) => {
  return fetch(`${API}/category/delete/${categoryId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.json();
  });
};

// ? getAllCategory
export const getAllCategory = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  }).then((response) => {
    return response.json();
  });
};

// ? getACategory
export const getACategory = (categoryId) => {
  return fetch(`${API}/category/${categoryId}`).then((res) => {
    return res.json();
  });
};

// *Product

// ? CreateProduct

export const addProduct = (userId, product, token) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => response.json())
    .catch(console.log("error in creatingProduct"));
};

// ? updateproduct
export const updateProduct = (userId, productId, token, product) => {
  return fetch(`${API}/product/update/${userId}/${productId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => response.json())
    .catch(console.log("error in UpdatingProduct"));
};

// ? deleteProduct
export const deleteProduct = (userId, token, productId) => {
  return fetch(`${API}/product/deleteProduct/${userId}/${productId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => "error in deleting Product");
};

// ? getAllProducts
export const getAllProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  }).then((response) => {
    return response.json();
  });
};

// ? getProduct

export const getProduct = (productId) => {
  return fetch(`${API}/product/getProduct/${productId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  }).then((response) => {
    return response.json();
  });
};

// * Orders

// ? getAllorders

export const getAllorders = (userId, token) => {
  return fetch(`${API}/order/getAllOrder/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.json();
  });
};

// ? Update OrderStatus

export const UpdateStatusOfOrder = (orderId, userId, token, status) => {
  return fetch(`${API}/order/${orderId}/status/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: status, orderId: orderId }),
  }).then((response) => {
    return response.json();
  });
};
