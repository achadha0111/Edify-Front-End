# UI

[![CircleCI](https://circleci.com/gh/r1fad/super-cool-notebook-app.svg?style=svg)](https://circleci.com/gh/r1fad/super-cool-notebook-app)

The UI is built using the 

[Minimal Free - Client and Admin Dashboard Template](https://mui.com/store/items/minimal-dashboard-free/)

# How to get started

```cd ui && yarn install && yarn start ```

# Guide to template

* `public/` - contains static assets, including the `index.html` file that
the React app binds to.

* `src/` - The source code of the app, this is further divided into:
  * `_mock/` - mock data for various views
  * `components/` - Contains functionally defined, stateless subcomponents.
    * `color-utils/` - Contains colour picker utilities, not explicitly used but could be handy.
  * `hooks/` - Code to handle responsivity.
  * `layouts/`- Top level layout components that remain consistent across various views.
  `LogoOnlyLayout.js` is used for extra pages such as `register`, `login` and `404`.
  * `pages/`- All main view components are stored here - `home`, `login`, `newnote`, `404`, `register`, `review`
  * `sections`:
    * `@dashboard`:
      * `notes/`- Contains components specific to the Dashboard (`home`) view.
      * `review/`- Components for the review page will go here. Currently contains
      redundant elements from template.
    * `auth/`:
      * `login`- Components specific to the login view.
      * `register`- Components specific to the register view.
    * `theme`- Dashboard theme related components. Probably don't need to touch this.
    * `utils`- Time and number formatting utilities.

Routes are defined in `routes.js` and the app entry point is `index.js`.
    
