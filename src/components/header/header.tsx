import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./header.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header>
      <nav>
        <a href="/">Home</a>
        <a href="/blogs">Blog</a>
        <a href="/contact">Contact</a>
      </nav>
    </header>
  );
});
