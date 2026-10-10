# Frontend Mentor - Newsletter sign-up form with success message solution

This is a solution to the [Newsletter sign-up form with success message challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/newsletter-signup-form-with-success-message-3FC1AZbNrv). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [AI Collaboration](#ai-collaboration)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Add their email and submit the form
- See a success message with their email after successfully submitting the form
- See form validation messages if:
  - The field is left empty
  - The email address is not formatted correctly
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

My solution uses a single layout that adapts across three Tailwind breakpoints and swaps the hero illustration via `<picture>`. Email validation runs on submit (regex-based), with a dedicated error state that resets as soon as the user starts correcting the field, while a native `<dialog>` shows a success message with the email they actually typed.

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [https://github.com/antoru/newsletter-sign-up-with-success-message-main-claude](https://github.com/antoru/newsletter-sign-up-with-success-message-main-claude)
- Live Site URL: [https://antoru.github.io/newsletter-sign-up-with-success-message-main-claude/](https://antoru.github.io/newsletter-sign-up-with-success-message-main-claude/)

## My process

### Built with

- Semantic HTML5 markup (native `<dialog>` for the success message, `<picture>` for responsive illustrations)
- [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/cli`, with custom design tokens (`@theme`) based on the challenge's style guide
  - `src/input.css` is the source file; `assets/css/style.css` is the compiled, minified output linked from `index.html` (built with `npm run build:css`) — only `src/input.css` should be edited by hand
- Mobile-first workflow, `md`/`lg` breakpoints
- Vanilla JavaScript (email validation, `data-error`/`aria-invalid` state handling, dialog open/close)
- Prettier + `prettier-plugin-tailwindcss` for formatting

### What I learned

- Tailwind v4 theme namespaces (`--color-*` vs `--background-image-*` vs `--shadow-*`) and why a gradient inside `--color-*` doesn't work
- Native `<dialog>`: default centering, `::backdrop`, why Preflight breaks the native `margin: auto`
- Why a single `aria-invalid:` variant couldn't drive both styling and accessibility at once, and how splitting it into a dedicated `data-error` attribute (style only) plus an honestly-tracked `aria-invalid` (accessibility only) solved it
- The relative-path bug between `src/` and the compiled output that Tailwind CLI doesn't rewrite

### AI Collaboration

I used **Claude Code** as a mentor throughout this project, not to write the code for me. Some concrete examples:

- An upfront architectural discussion on CSS approach (LESS + the 7-1 pattern vs. plain CSS vs. Tailwind) before choosing Tailwind, weighing it against the project's actual size
- Targeted explanations of Tailwind syntax (arbitrary values, custom breakpoints, theme token namespaces) while I wrote the HTML myself
- Guided debugging (e.g. why a `<dialog>` wasn't centering, why fonts were returning 404s) with the reasoning behind the cause explained, not just the fix
- Dedicated accessibility, performance, and SEO reviews after the structure was done, with fixes I applied myself once the "why" was explained

### Continued development

I plan to keep building challenges and personal projects, both to grow my portfolio and to become a better developer. My next goal is to start building with a modern framework — React or Next.js — and to start using TypeScript. Only after that will I move toward the backend, aiming to understand and build a full-stack project end to end.

## Author

- GitHub - [antoru](https://github.com/antoru)
- Linkedin - [https://www.linkedin.com/in/antoru/](https://www.linkedin.com/in/antoru/)
- Frontend Mentor - [https://www.frontendmentor.io/profile/antoru](https://www.frontendmentor.io/profile/antoru)
