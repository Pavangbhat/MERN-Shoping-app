export const addToCart = (product, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...product,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const cartProducts = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
};

export const removeFromCart = (indexNum, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      cart = cart.filter((product, index) => {
        return index !== indexNum;
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      next();
    }
  }
};

export const emptyCart = (next) => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      localStorage.removeItem("cart");
      let cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      next();
    }
  }
};
