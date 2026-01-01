# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Netlify contact form

The contact form in `src/components/Contact.jsx` is configured for **Netlify Forms**.

Netlify needs these in the rendered HTML:

- `<form name="contact" method="POST" data-netlify="true">`
- `<input type="hidden" name="form-name" value="contact" />`
- (optional) spam protection: `data-netlify-honeypot="bot-field"`

### Verify after deploy

1. Deploy the site to Netlify.
2. Submit the form on the deployed site once.
3. Netlify Dashboard → Site → **Forms** should show a `contact` form + submission.

Note: Netlify detects forms from the **production build output**, so it won’t appear until you deploy.
