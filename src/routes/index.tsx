import { component$, Resource, useStylesScoped$ } from "@builder.io/qwik";
import { useEndpoint } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
import { apiUrl } from "~/constants";
import Showdown from "showdown";
import styles from "./index.css";

interface ITech {
  id: number;
  name: string;
  primary: boolean;
}

interface IHome {
  id: number;
  name: string;
  portofolio: string;
  photo: any;
  cv: any;
}

interface IPageInfo {
  homeData: IHome;
  techData: ITech[];
}
export const onGet: RequestHandler<IPageInfo> = async () => {
  // Tech data
  const homeRes = await fetch(apiUrl + "/home");
  const homeData = await homeRes.json();

  //Tech data
  const techRes = await fetch(apiUrl + "/technologies?_sort=id:ASC");
  const techData = await techRes.json();

  return { homeData, techData };
};

export default component$(() => {
  const url = "https://admin.georgeiliadis.com";
  useStylesScoped$(styles);
  const data = useEndpoint<typeof onGet>();
  const converter = new Showdown.Converter();

  return (
    <Resource
      value={data}
      onRejected={() => <div>Error</div>}
      onResolved={(data) => {
        const { homeData, techData } = data;
        // Not sure if this is the best approach check latter, i do not like this conversion
        // sillyness and the loading lazy attributes but it works for now
        const portofolioText = converter
          .makeHtml(homeData.portofolio)
          .replace(/<img/g, '<img loading="lazy"');
        return (
          <div>
            <div class="profile-header">
              <div class="image-block">
                <img
                  loading="lazy"
                  class="profile-image"
                  src={url + homeData.photo.formats.thumbnail.url}
                  alt={homeData.name}
                  width="160"
                  height="160"
                />
                <h2 class="profile-name">{homeData.name}</h2>
              </div>

              <div
                class="portofolio-section"
                dangerouslySetInnerHTML={portofolioText}
              />
            </div>
            <div class="tech-stack-container">
              <h2>Primary</h2>
              <div class="tech-area">
                {techData.map((tech) => {
                  if (tech.primary) {
                    return (
                      <span class="tech-item" key={tech.id}>
                        {tech.name}
                      </span>
                    );
                  }
                })}
              </div>

              <h2>Secondary</h2>
              <div class="tech-area">
                {techData.map((tech) => {
                  if (!tech.primary) {
                    return (
                      <span class="tech-item" key={tech.id}>
                        {tech.name}
                      </span>
                    );
                  }
                })}
              </div>
            </div>
            <div class="cv-download">
              <p>You can download my CV here</p>
              <a class="cv-link" href={url + homeData.cv.url} target="_blank">
                Download
              </a>
            </div>
          </div>
        );
      }}
    />
  );
});

export const head: DocumentHead = {
  title: "George Iliadis",
};
