# 2023 Frontend Training - Report

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

### 1.

### 2.

### 3.

### 4.

### 5.
