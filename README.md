# Paper Cost

This project is specifically designed with a **MOBILE**-first approach, with the app, carton factory owners or workers can calculate price of their paper that utilized in factory.

## Features and Functionalities

- [x] Email/Password based authentication system
- [x] Dynamic paper layer adding (Maximum 10 paper)
- [x] Price history saved in Supabase (Maximum 20 for free)
- [x] History trash for later recovery (Auto delete after a week)
- [x] Empty field validation
- [x] Auto focus next field on press 'Enter'
- [ ] Calculate the price on press 'Enter' from last input field

## Tech Stack

```bash
-> React
-> React Router
-> React hook form
-> JavaScript
-> TypeScript
-> Zod
-> Tailwind
-> Supabase
-> Playwright
```

## Demo Credentials

Can be tested in live app

```js
test@gmail.com
```

```js
11111111
```

## Development

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
