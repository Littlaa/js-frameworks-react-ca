import { create } from "zustand";

const useCartStore = create((set) => ({
  cart: [],

  // addProduct is used to add product to cart or change the quantity in cart.

  addProduct: (product) =>
    set((state) => {
      const cartAmount = state.cart.findIndex(
        (addedProduct) => addedProduct.id === product.id
      );

      let newCart;
      if (cartAmount !== -1) {
        newCart = state.cart.map((addedProduct, amount) =>
          amount === cartAmount
            ? {
                ...addedProduct,
                totalItems: addedProduct.totalItems + 1,
                discountedPrice: Number.parseFloat(
                  ((addedProduct.totalItems + 1) *
                    addedProduct.discountedPrice) /
                    addedProduct.totalItems
                ).toFixed(2),
              }
            : addedProduct
        );
      } else {
        newCart = [...state.cart, { ...product, totalItems: 1 }];
      }
      return { cart: newCart };
    }),

  // newQtyAdd increase the quantity when clicking "+" button

  newQtyAdd: (id) =>
    set((state) => {
      const newCart = state.cart.map((addedProduct) =>
        addedProduct.id === id
          ? {
              ...addedProduct,
              totalItems: addedProduct.totalItems + 1,
              discountedPrice: Number.parseFloat(
                ((addedProduct.totalItems + 1) * addedProduct.discountedPrice) /
                  addedProduct.totalItems
              ).toFixed(2),
            }
          : addedProduct
      );
      return { cart: newCart };
    }),

  // removeQty decrease the quantity when clicking "-" button, and remove product when quantity reaches 0

  removeQty: (id) =>
    set((state) => {
      const newCart = state.cart.map((addedProduct) =>
        addedProduct.id === id && addedProduct.totalItems > 0
          ? {
              ...addedProduct,
              totalItems: addedProduct.totalItems - 1,
              discountedPrice: Number.parseFloat(
                ((addedProduct.totalItems - 1) * addedProduct.discountedPrice) /
                  addedProduct.totalItems
              ).toFixed(2),
            }
          : addedProduct
      );
      const removeProductQty = newCart.filter(
        (addedProduct) => addedProduct.totalItems > 0
      );
      return { cart: removeProductQty };
    }),

  // removeProduct remove the product when clicking "X" button

  removeProduct: (id) =>
    set((state) => {
      const newCart = state.cart.filter(
        (addedProduct) => addedProduct.id !== id
      );
      return { cart: newCart };
    }),

  // removeCart reset the cart when clicking "clear" button and "checkout" button

  removeCart: () => set({ cart: [] }),
}));

function useCart() {
  const cart = useCartStore((state) => state.cart);
  const removeCart = useCartStore((state) => state.removeCart);
  const addProduct = useCartStore((state) => state.addProduct);
  const newQtyAdd = useCartStore((state) => state.newQtyAdd);
  const removeQty = useCartStore((state) => state.removeQty);
  const removeProduct = useCartStore((state) => state.removeProduct);

  function addToCart(product) {
    addProduct(product);
  }

  function clearCart() {
    removeCart();
  }

  function add(id) {
    newQtyAdd(id);
  }

  function remove(id) {
    removeQty(id);
  }

  function clearAll(id) {
    removeProduct(id);
  }

  return {
    cart,
    addToCart,
    clearCart,
    add,
    remove,
    clearAll,
  };
}

export { useCart };