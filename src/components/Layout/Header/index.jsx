import { useCart } from "../../../hooks/useCart";
import { NavLink } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import styles from "./header.module.css";

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/"
            className={(navigation) =>
              navigation.isActive ? styles.active : ""
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={(navigation) =>
              navigation.isActive ? styles.active : ""
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

function CartIcon() {
  const { cart } = useCart();
  return (
    <nav>
      <ul>
        <li className={styles.cartLink}>
          <NavLink
            to="/cart"
            className={styles.cartNav}
          >
            <BsCart3 />
            <span className={styles.cartTotalItems}>
              {cart.reduce((totalQty, cart) => totalQty + cart.totalItems, 0)}
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default function Header() {
  return (
    <header className={styles.fixedHeader}>
      <div className={styles.headerContent}>
        <Nav />
        <CartIcon />
      </div>
    </header>
  );
}