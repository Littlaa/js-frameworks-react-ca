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
  const [error, setError] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();
  const handleOnClickProduct = (id) => {
    navigate("product/" + id);
  };

  useEffect(() => {
    async function getProducts() {
      try {
        setError(false);
        setLoader(true);

        const response = await fetch(productUrl);
        const json = await response.json();

        setProducts(json);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        setError(true);
      }
    }

    getProducts();
  }, []);

  if (loader) {
    return <div className={styles.loader}></div>;
  }

  if (error) {
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
        <h1>Shop till you drop!</h1>
      </div>
      <div className={styles.search}>
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
               
                <img
                  className={styles.productImage}
                  src={product.imageUrl}
                  alt={product.title}
                />
                <div>
                <h2>{product.title}</h2>
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