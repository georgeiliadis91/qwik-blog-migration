import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./blogCard.css?inline";

interface IProps {
  title: string;
  blog_url: string;
  img_href: string;
  img_alt: string;
}

export default component$(({ blog_url, title, img_href, img_alt }: IProps) => {
  // TODO: remove this, it is garbage
  const apiUrl = "https://admin.georgeiliadis.com";
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
