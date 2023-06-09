import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import Button from "../../components/Button";
import styles from "./checkout.module.css";

// Function getting information from useCart hook containing "if" statement showing either "products if added to cart" or the statement "No items in the cart yet."

export default function CheckoutPage() {
  const { cart, clearCart, add, remove, clearAll } = useCart();

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Ecom Shop | Cart</title>
      </Helmet>
      <h1 className={styles.title}>Cart</h1>
      <div>
        {cart.length > 0 ? (
          <>
            <div>
              {cart.map((id) => {
                const product = cart.find(
                  (addedProducts) => addedProducts === id
                );
                return (
                  <div className={styles.card}>
                    <div className={styles.removeProductBtn}>
                      <div onClick={() => clearAll(product.id)}>X</div>
                    </div>
                    <div className={styles.justifyCartItems}>
                      <img
                        className={styles.productImage}
                        src={product.imageUrl}
                        alt={product.title}
                      />
                      <div>
                        <h2>{product.title}</h2>
                        <p>$ {product.discountedPrice}</p>
                      </div>
                      <div className={styles.qtyCounter}>
                        <Button name={"-"} onClick={() => remove(product.id)} />
                        <p className={styles.qtyNumber}>{product.totalItems}</p>
                        <Button name={"+"} onClick={() => add(product.id)} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <span className={styles.cartBottomCenter}>
             
              <div className={styles.priceDisplay}>
                <p>
                  Cart Total: ${" "}
                  {cart
                    .reduce(
                      (totalSum, cart) =>
                        totalSum +
                        (cart.discountedPrice / cart.totalItems) *
                          cart.totalItems,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
              <div>
                <Button name={"Clear Cart"} onClick={clearCart} />
                <Link to="/checkoutSuccess">
                  {""}
                  <Button name={"Check Out"} onClick={clearCart} />
                </Link>
              </div>
            </span>
          </>
        ) : (
          <div className={styles.emptyCart}>
            <p>Go and put something in your cart!</p>
            <Link to="/">Go Shop</Link>
          </div>
        )}
      </div>
    </div>
  );
}