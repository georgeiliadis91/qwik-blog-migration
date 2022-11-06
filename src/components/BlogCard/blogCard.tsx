import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./blogCard.css?inline";
import { apiUrl } from "~/constants";

interface IProps {
  title: string;
  blog_url: string;
  img_href: string;
  img_alt: string;
}

export default component$(({ blog_url, title, img_href, img_alt }: IProps) => {
  useStylesScoped$(styles);

  return (
    <div class="blog-card-item">
      <a href={"/blogs/" + blog_url}>
        <span>{title}</span>
        <img src={apiUrl + img_href} alt={img_alt} />
      </a>
    </div>
  );
});
