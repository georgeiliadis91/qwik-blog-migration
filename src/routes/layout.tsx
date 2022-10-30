import { component$, Slot } from "@builder.io/qwik";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import ContactForm from "~/components/ContactForm/contactForm";

export default component$(() => {
  return (
    <>
      <Header />
      <main>
        <Slot />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
});
