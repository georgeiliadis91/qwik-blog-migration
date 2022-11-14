import { component$, useStore, useStylesScoped$, $ } from "@builder.io/qwik";
import styles from "./contactForm.css?inline";
import { recaptchaKey, apiUrl } from "~/constants";

interface IState {
  name: string;
  email: string;
  message: string;
}

export default component$(() => {
  const initState = {
    name: "",
    email: "",
    message: "",
  };

  useStylesScoped$(styles);
  const state = useStore<IState>(initState);

  const updateField = $((ev: InputEvent) => {
    const target = ev.target as HTMLInputElement;
    state[target.name as keyof IState] = target.value;
  });

  const submitForm = $(async (e: Event) => {
    e.preventDefault();

    fetch(apiUrl + "/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    })
      .then(() => {
        alert("Thanks for contacting me!");
        state.name = "";
        state.email = "";
        state.message = "";
      })
      .catch(() => {
        alert("Message not sent!");
      });
  });

  return (
    <section class="contact-form-section">
      <h2>Contact Me</h2>
      <form
        id="contact-form"
        onSubmit$={submitForm}
        action="https://admin.georgeiliadis.com/message"
        preventdefault:submit
      >
        <label class="name" for="name">
          Name
          <input
            id="name"
            type="text"
            name="name"
            required
            value={state.name}
            onInput$={updateField}
          />
        </label>
        <label class="email" for="email">
          Email
          <input
            id="email"
            type="email"
            name="email"
            required
            value={state.email}
            onInput$={updateField}
          />
        </label>

        <label class="text-area" for="message">
          Message
          <textarea
            id="message"
            name="message"
            required
            minLength={24}
            rows={7}
            value={state.message}
            onInput$={updateField}
          />
        </label>
        <div class="g-recaptcha" data-sitekey={recaptchaKey}></div>
        <input id="submit" type="submit" value="Submit" />
      </form>
      <script src="https://www.google.com/recaptcha/api.js"></script>
    </section>
  );
});
