import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./socials.css?inline";
import GithubIcon from "../../assets/github.svg";
import LinkedInIcon from "../../assets/linkedin.svg";
import { linkedInLink, githubLink } from "~/constants";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <div class="social-links-container">
      <a href={githubLink}>
        <img loading="lazy" src={GithubIcon} alt="Github" />
      </a>
      <a href={linkedInLink}>
        <img loading="lazy" src={LinkedInIcon} alt="LinkedIn" />
      </a>
    </div>
  );
});
