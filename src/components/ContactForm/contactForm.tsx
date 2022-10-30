import { component$, useStore, useStylesScoped$, $ } from "@builder.io/qwik";
import styles from "./contactForm.css?inline";

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
  const apiUrl = "https://admin.georgeiliadis.com";

  useStylesScoped$(styles);
  const state = useStore<IState>(initState);

  const updateField = $((ev: InputEvent) => {
    const target = ev.target as HTMLInputElement;
    state[target.name as keyof IState] = target.value;
  });
  // 6Lft-PwUAAAAAPsEnuYvS81mMwMkoEyJBz99WjKI
  const onSubmit = $(async (e: Event) => {
    e.preventDefault();
    //post to api
    fetch(apiUrl + "/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    })
      .then(() => {
        alert("Thanks for contacting me!");
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
        // onSubmit$={submitForm}
        action="https://admin.georgeiliadis.com/message"
        preventdefault:submit
      >
        <label class="row1-name" for="name">
          Name
          <input
            id="name"
            type="text"
            name="name"
            required
            onInput$={updateField}
          />
        </label>
        <label class="row1-email" for="email">
          Email
          <input
            id="email"
            type="email"
            name="email"
            required
            onInput$={updateField}
          />
        </label>

        <label class="row2-text-area" for="message">
          Message
          <textarea
            id="message"
            name="message"
            required
            minLength={24}
            rows={7}
            onInput$={updateField}
          />
        </label>

        <input
          class="g-recaptcha"
          data-sitekey="6Lft-PwUAAAAAPsEnuYvS81mMwMkoEyJBz99WjKI"
          data-callback="onSubmit"
          data-action="submit"
          id="submit"
          type="submit"
          value="Submit"
        />
      </form>
    </section>
  );
});
