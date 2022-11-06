import { component$, Slot } from "@builder.io/qwik";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Socials from "~/components/socials/socials";

export default component$(() => {
  return (
    <>
      <div class="green-layer" />
      <div class="blue-layer" />
      <Header />
      <Socials />
      <div></div>
      <main>
        <Slot />
      </main>
      <Footer />
    </>
  );
});
