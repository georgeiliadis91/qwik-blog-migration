import { component$, useStylesScoped$ } from "@builder.io/qwik";
import ContactForm from "~/components/ContactForm/contactForm";
import styles from "./index.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <section class="contact-form-container">
      <ContactForm />
    </section>
  );
});
