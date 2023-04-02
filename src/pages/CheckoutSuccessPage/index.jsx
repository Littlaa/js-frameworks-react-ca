import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styles from "./checkoutSuccess.module.css";

export default function CheckoutSuccessPage() {
  return (
    <div className={styles.container}>
      <Helmet>
        <title>Ecom Shop | Success</title>
      </Helmet>
      <div className={styles.text}>
        <h1>Success!</h1>
        <p>
          Hope you will get satisfied with your new stuff!
        </p>
        <div>
          <Link to="/">Go shop some more maybe?</Link>
        </div>
      </div>
    </div>
  );
}