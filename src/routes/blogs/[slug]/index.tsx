import { Resource, component$, useStylesScoped$ } from "@builder.io/qwik";
import { useEndpoint } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
const apiUrl = "https://admin.georgeiliadis.com";
import Showdown from "showdown";
import styles from "./index.css";

export const onGet: RequestHandler<any> = async ({ params }) => {
  const res = await fetch(apiUrl + "/blogs?slug=" + params.slug);
  const data = await res.json();
  return data;
};

export default component$(() => {
  useStylesScoped$(styles);
  const blogPost = useEndpoint<typeof onGet>();
  const converter = new Showdown.Converter();

  return (
    <Resource
      value={blogPost}
      onRejected={() => <div>Error</div>}
      onResolved={(blogPost) => {
        // Not sure if this is the best approach check latter, i do not like this conversion
        // sillyness but it works for now
        const blogPostHtml = converter.makeHtml(blogPost[0].body);
        return (
          <div class="blog-container">
            <h2 class="blog-title">{blogPost[0].title}</h2>
            <img
              class="blog-banner-img"
              src={
                "https://admin.georgeiliadis.com" +
                blogPost[0].banner.formats.large.url
              }
              alt={blogPost[0].title + "img"}
            />
            <div dangerouslySetInnerHTML={blogPostHtml} />
          </div>
        );
      }}
    />
  );
});
