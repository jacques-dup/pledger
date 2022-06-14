# Commonground PLedger

This is a very simple pledger app that was built in haste over a few evenings, in order to enable CommonGround to get users to make pledges of food to bring to an event.

## Infrastructure

This is a MERN stack.

  - Express server for API interactions in `/server`
  - Database in MongoDB Atlas (see Mongo configuration below)
  - Client done with create-react-app in `/client`

  Express handles serving the `/client/build` on the primary domain if the app is running in production. It is currently configured to run on Heroku.

## Setup

  - Create a `.env` file, using the `example_env` as a base.
  - In the root do `npm install`
  - In `/client` do `npm install`
  - Serve client locally from root with `npm run client`
  - Serve server from root with `npm run dev`
  - To build the client for production do `npm run build:client` from root.

For production, you only need to start the server with `npm run start`. With the envionment varialbe set for production, it will automatically serve the client build on the server's root domain.

## Mongo
 - You need to create a MongoDB Atlas account and create a database for your app. 
 - Use the Mongo dashboard to generate the `MONGO_URI` and add it to the .env file.
## Quirky hacks

We got a SUPERADMIN_KEY variable, that you need to do some or the API calls successfully, like elevating a user to admin privilages or updating a pledge item directly using the API. What can I say... it was late and I used a postman runner to add many items from an Excel doc.