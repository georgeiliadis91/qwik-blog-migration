import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./footer.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <footer>
      <span>Copyright 2022</span>
      <div>icons here</div>
    </footer>
  );
});
