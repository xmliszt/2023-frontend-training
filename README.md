# 2023 Frontend Training - Report

- [2023 Frontend Training - Report](#2023-frontend-training---report)
  - [Presentation Project - Taboo.AI](#presentation-project---tabooai)
  - [Tech Used](#tech-used)
  - [CI / CD](#ci--cd)
  - [Best Practices](#best-practices)
    - [1. NextJS SSR For Better Performance](#1-nextjs-ssr-for-better-performance)
    - [2. Beta NextJS App Directory for clear and intuitive project structure](#2-beta-nextjs-app-directory-for-clear-and-intuitive-project-structure)
    - [3. Use of `useState` and `useEffect` hooks](#3-use-of-usestate-and-useeffect-hooks)
    - [4. Use of TypeScript](#4-use-of-typescript)
    - [5. Use of Tailwind CSS for styling](#5-use-of-tailwind-css-for-styling)

## Presentation Project - Taboo.AI

A web app where you play the game of "Taboo" with an AI. **Guess Words** will be given to you, and your job is to ask a question to the AI such that AI will answer you with the **Guess Words** mentioned.

For example, if the **Guess Word** is "China", you can ask "Which country does the Great Wall locate in?". However, you cannot ask "Which country does the Great Wall of **China** locate in?" since it already contains the word "China" in your question.

> Please find the project source code at https://github.com/xmliszt/taboo.ai

> Link to the publicly hosted web app: https://taboo-ai.vercel.app/

## Tech Used

- Frontend / Backend (SSR): NextJS
- Third-Party Service: OpenAI API https://openai.com/api/
- CSS Framework: Tailwind CSS
- Linter: eslint, stylelint
- Code Formatter: prettier
- Unit Test: Jest
- E2E Test: Playwright
- CI/CD workflow: Github Actions
- Git Hooks: Husky

## CI / CD

There are two workflows set up for this project. One for **preview** and the other for **production**. The differences between the two are as follow:

- **Preview**:
  - Only run for other branches except `main`
  - Build the project and push to **Vercel** preview channel with temporarily accessible preview URL link generated
- **Production**:
  - Only run for `main`
  - Build the project into production and push to **Vercel** production environment.

The details of the general workflow are as follow:

1. Checkout repository
2. Install NodeJS
3. Install Dependencies
4. Install Playwright supported browsers
5. Install Vercel CLI
6. Pull Vercel Environment Information
7. Lint the Code using esLint and styleLint
8. Format the Code using Prettier
9. Run Jest unit tests
10. Run Playwright headless end-to-end tests
11. Upload Playwright reports to Github and keep for 30 days
12. Build the project and upload to Vercel
13. Deploy the project in Vercel

## Best Practices

### 1. NextJS SSR For Better Performance

By using NextJS 13 to build this project, some pages in the app were able to use Server Side Rendering (SSR) to achieve better performance and faster load on client side. As you can see from the below screenshots, the Contentful Paint is within 1 second, meaning the user waits no more than 1 second for the page to be visible to the user.

- Vercel Desktop Analytics

![Desktop Analytics](./docs/Desktop%20Analysis.png)

- Vercel Mobile Analytics

![Mobile Lighthouse](./docs/Mobile%20Analysis.png)

### 2. Beta NextJS App Directory for clear and intuitive project structure

By experimenting on the NextJS Beta version (app directory), the project is created with very clear and structured organization. **File structure as routes** is a convenient and new concept which makes the file structure have more meaningful sense. I am able to separate components clearly from `page.tsx` which represents each page in that particular route. The `layout.tsx` then defines how each pages and components are placed in the main HTML, which itself persists and does not re-render, making Hot Reloading (Only re-render the changed components) possible.

![File Structure](./docs/file%20structure.png)

### 3. Use of `useState` and `useEffect` hooks

There are a lot of state binding in this web game. Therefore `useState` is used to handle those state changes. `useEffect` is also used to fire some events or data fetching / updating whenever a particular condition / state altered, making the site reactive.

### 4. Use of TypeScript

TypeScript is used to code out this project. I can define interfaces for important data models in the game such as `level` and `score`, abstracting out certain behaviours, separating the service and presentation layers, to make sure certain data fields are compulsory to present, avoiding making potential bugs in having `undefined` values.

### 5. Use of Tailwind CSS for styling

Tailwind CSS is used as the CSS framework in this application. By using Tailwind CSS, defining classes and animations become so much easier and it minimizes the needs for me to write long-winded CSS files. With the `@apply` feature, I was able to define generic styles for particular elements, without writing a single line of standard CSS code.

```css
.unicorn-color {
  @apply animate-unicorn-flow;
}

b {
  @apply font-bold text-yellow dark:text-neon-yellow;
}

button:not(#back, #theme, #submit, #share, #reset),
a#start {
  @apply transition-all drop-shadow-lg border-2 lg:border-8 border-white bg-white dark:bg-neon-gray text-black hover:text-white hover:bg-black hover:border-gray rounded-tl-[2rem] rounded-br-[2rem] hover:dark:text-neon-black hover:dark:bg-neon-green hover:dark:border-neon-green dark:text-neon-white dark:border-neon-green hover:rounded-[2rem];
}

button,
a {
  @apply disabled:cursor-not-allowed disabled:opacity-50;
}

input {
  @apply text-white bg-black dark:text-neon-white dark:bg-neon-black dark:border-neon-green border-2 border-white outline-none focus:outline-none focus:border-4 lg:focus:border-8 h-8 ease-in-out transition-all text-base lg:text-2xl lg:h-16 px-8 lg:px-10 rounded-tl-2xl rounded-br-2xl;
}

h1 {
  @apply text-base lg:text-5xl;
}
```

Moreover, Tailwind CSS also makes implementation of light/dark mode switch so much easier in the project. All I have to do is to define another set of styling for **dark** mode, and in the css class, I can customize each element's dark theme by adding `dark:{styles}` in their classes. In the main HTML, I created a button to switch light/dark mode, when press, it simply toggle the `dark` class in the main `<html>`, then all the children elements will implement the 'dark' mode accordingly.
