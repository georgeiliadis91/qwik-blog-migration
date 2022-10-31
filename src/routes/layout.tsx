import { component$, Slot } from "@builder.io/qwik";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";

export default component$(() => {
  return (
    <>
      <div class="green-layer" />
      <div class="blue-layer" />
      <Header />
      <main>
        <Slot />
      </main>
      <Footer />
    </>
  );
});
