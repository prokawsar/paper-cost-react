# Paper Cost

This project is specifically designed with a **MOBILE**-first approach, with the user interface optimized for mobile screens to provide an enhanced and professional user experience on mobile devices.

## Features and Functionalities

```bash
-> Email/Password based authentication system
-> Dynamic paper layer adding (Maximum 10 paper)
-> Auto focus next field on press 'Enter'
-> Calculate the price on press 'Enter' from last input field
-> Price history saved in Supabase
-> History trash for later recovery

```

## Tech Stack

```bash
-> React
-> React Router
-> React hook form
-> JavaScript
-> TypeScript
-> Tailwind
-> Supabase
-> Playwright
```

## Test Credentials

Can be tested in live app

```js
// Email
test@gmail.com
```

```js
// Password
111111
```


1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new).

   For using existing created database, secrets for `.env`.

2. Clone this repo command

   ```bash
   git clone https://github.com/prokawsar/paper-cost-react.git
   ```

3. Use `cd` to change into the app's directory and install dependencies

   ```bash
   cd paper-cost-react
   npm i
   ```

4. Rename `.env.local.example` to `.env` and update the following:

   ```
   VITE_APP_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   VITE_APP_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```

5. You can now run the App local development server:

   ```bash
   npm run dev
   ```

   The app should now be running on [localhost:3000](http://localhost:3000/).
