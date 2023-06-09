import { Helmet } from "react-helmet";
import { useState } from "react";
import Button from "../../components/Button";
import styles from "./contact.module.css";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [formErrors, setFormErrors] = useState({
    fullName: "",
    subject: "",
    email: "",
    body: "",
  });

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (event.target.name === "full-name") {
      setFullName(value);
    }
    if (event.target.name === "subject") {
      setSubject(value);
    }
    if (event.target.name === "email") {
      setEmail(value);
    }
    if (event.target.name === "body") {
      setBody(value);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const customerForm = { fullName, subject, email, body };

    const formValidate = {
      fullName:
        fullName.length < 3
          ? "Full name is required to be at least 3 characters"
          : "",
      subject:
        subject.length < 3
          ? "Subject title is required to be at least 3 characters"
          : "",
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? "Enter a valid email"
        : "",
      body:
        body.length < 3
          ? "Description is required to be at least 3 characters"
          : "",
    };

    if (Object.values(formValidate).some((error) => error !== "")) {
      setFormErrors(formValidate);
    } else {
      alert(
        "Thank you for contacting us."
      );

      console.log(customerForm);
      setFullName("");
      setSubject("");
      setEmail("");
      setBody("");
      setFormErrors({
        fullName: "",
        subject: "",
        email: "",
        body: "",
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Ecom Shop | Contact</title>
      </Helmet>
      <h1 className={styles.title}>What are you wondering about?</h1>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <label htmlFor="full-name">Full name</label>
        <input
          className={styles.inputSize}
          id="full-name"
          name="full-name"
          value={fullName}
          placeholder="Enter your name"
          onChange={handleInputChange}
        />

        {formErrors.fullName && (
          <div className={styles.errorMessage}>{formErrors.fullName}</div>
        )}

        <label htmlFor="subject">Subject title</label>
        <input
          className={styles.inputSize}
          id="subject"
          name="subject"
          value={subject}
          placeholder="Enter a subject title"
          onChange={handleInputChange}
        />

        {formErrors.subject && (
          <div className={styles.errorMessage}>{formErrors.subject}</div>
        )}

        <label htmlFor="email">Email</label>
        <input
          className={styles.inputSize}
          id="email"
          name="email"
          value={email}
          placeholder="Enter email"
          onChange={handleInputChange}
        />

        {formErrors.email && (
          <div className={styles.errorMessage}>{formErrors.email}</div>
        )}

        <label htmlFor="body">Description</label>
        <textarea
          className={styles.inputSize}
          id="body"
          name="body"
          value={body}
          placeholder="Ask us and we shall answer"
          onChange={handleInputChange}
        />

        {formErrors.body && (
          <div className={styles.errorMessage}>{formErrors.body}</div>
        )}

        <Button name={"Submit"} />
      </form>
    </div>
  );
}