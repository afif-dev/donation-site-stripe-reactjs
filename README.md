# Donation Site - Stripe + ReactJS

This is donation site build with ReactJS via [Create React App](https://create-react-app.dev/) as client side + [Stripe](https://stripe.com/) as payment gateway and [ExpressJS (https://expressjs.com/) as server side.

**Extra features included:**
- Light / Dark mode toggle.
- Installed Tailwind CSS.
- Stripe endpoint for webhook, received and set expires to checkout session.
- Payment logs for Stripe webhook endpoint. (payment_log.txt)
- Save payment session & logs in [Cloud Firestore](https://cloud.google.com/firestore).
- Use markdown as page content (ex: Credits & Terms of Service page).

## Screenshot
![](/donation-site-stripe-reactjs-ss.jpg)

## Tech Stack
- [Node.js](https://nodejs.org/) - Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [Create React App](https://create-react-app.dev/) - Create React App is an officially supported way to create single-page React applications. It offers a modern build setup with no configuration.
- [TailwindCSS](https://expressjs.com/) - Rapidly build modern websites without ever leaving your HTML.
- [Cloud Firestore](https://cloud.google.com/firestore) - Cloud Firestore is flexible, scalable NoSQL cloud database to store and sync data for client- and server-side development.
- [Heroku](https://www.heroku.com/) - Heroku is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.
- [Stripe](https://stripe.com/) - Stripe is a suite of APIs powering online payment processing and commerce solutions for internet businesses of all sizes. Accept payments and scale faster.

## NPM package
- dotenv
- express
- firebase-admin
- formidable
- helmet
- stripe
- tailwindcss
- animate.css
- sass
- react-markdown

## Setup for Local Development
1. Setup nodejs - https://nodejs.org/
2. Install the package for server side
```
npm install
```
3. Configure .env file. Replace .env_example to .env and update the settings. 
4. Start server

```
npm start
```
5. Go to client side directory

```
cd ./client/
```
5. Install the package for client side

```
npm install
```
6. Start client side
```
npm start
```

## Build & Deploy
1. go to main directory
```
cd ./
```
2. Build application
```
npm run build
```
3. Start and serve site
```
npm start
```
