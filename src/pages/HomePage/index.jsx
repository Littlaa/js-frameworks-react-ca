import { Helmet } from "react-helmet";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiStarSmileFill } from "react-icons/ri";
import Button from "../../components/Button/";
import styles from "./home.module.css";

// URL

const productUrl = "https://api.noroff.dev/api/v1/online-shop";

// Home Page function

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [upsError, setUpsError] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();
  const handleOnClickProduct = (id) => {
    navigate("product/" + id);
  };

  useEffect(() => {
    async function getProducts() {
      try {
        setUpsError(false);
        setLoader(true);

        const response = await fetch(productUrl);
        const json = await response.json();

        setProducts(json);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        setUpsError(true);
      }
    }

    getProducts();
  }, []);

  if (loader) {
    return <div className={styles.loader}></div>;
  }

  if (upsError) {
    return (
      <div className={styles.errorMessage}>
        Ops! There is a problem...Hang tight while we figure it out!
      </div>
    );
  }

  // HomePage content

  return (
    <div>
      <Helmet>
        <title>Ecom Shop | Home</title>
      </Helmet>
      <div className={styles.title}>
        <h1>Shop til you drop!</h1>
      </div>
      <div className={styles.searchPlacement}>
        <form>
          <input
            id="search"
            type="search"
            placeholder="Search... "
            className={styles.searchSize}
            onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
          ></input>
        </form>
      </div>
      <div className={styles.cardContainer}>
        {products
          .filter((product) =>
            product.title.toLowerCase().includes(searchValue)
          )
          .map((product) => (
            <div key={product.id} className={styles.card}>
              
              <div className={styles.cardContent}>
                <div>
                  {product.price === product.discountedPrice ? (
                    ""
                  ) : (
                    <>
                      <div className={styles.percentage}>
                        {Math.round(
                          ((product.price - product.discountedPrice) /
                            product.price) *
                            100
                        )}{" "}
                        % Off
                      </div>
                    </>
                  )}
                </div>
                <img
                  className={styles.productImage}
                  src={product.imageUrl}
                  alt={product.title}
                />
                <div>
                <h2 className={styles.cardHeader}>{product.title}</h2>
                  {product.price === product.discountedPrice ? (
                    `$ ${product.price}`
                  ) : (
                    <>
                      <span className={styles.discount}>
                        ${product.discountedPrice}{" "}
                      </span>
                      <span className={styles.beforeDiscount}>
                        ${product.price}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div>
                <Button
                  name={"View More"}
                  onClick={() => handleOnClickProduct(product.id)}
                />
              </div>
              <p className={styles.cardFooter}>
                <RiStarSmileFill />
                <RiStarSmileFill />
                <RiStarSmileFill />
                <RiStarSmileFill />
                <RiStarSmileFill /> ({product.rating})
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}