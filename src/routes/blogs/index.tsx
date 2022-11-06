import { Resource, component$, useStylesScoped$ } from "@builder.io/qwik";
import { useEndpoint } from "@builder.io/qwik-city";
import BlogCard from "~/components/blogCard/blogCard";
import type { RequestHandler } from "@builder.io/qwik-city";
import { apiUrl } from "~/constants";
import styles from "./index.css?inline";

export const onGet: RequestHandler<any> = async () => {
  const res = await fetch(apiUrl + "/blogs?_sort=created_at:DESC");
  const data = await res.json();
  return data;
};

export default component$(() => {
  useStylesScoped$(styles);
  const blogs = useEndpoint<typeof onGet>();

  return (
    <section class="blog-section">
      <Resource
        value={blogs}
        onPending={() => <div>Loading...</div>}
        onRejected={() => <div>Error</div>}
        onResolved={(blogs: any) =>
          blogs.map((blog: any) => {
            return (
              <BlogCard
                title={blog.title}
                img_href={blog.banner.formats.thumbnail.url}
                img_alt={blog.title}
                blog_url={blog.slug}
              />
            );
          })
        }
      />
    </section>
  );
});
