# Gymondo Assessment - Backend

This is the backend server for the web application.

[URL](http://localhost:4000/api)

### Node Version

The Express server is using node version : **"^12.20.0 || ^14.13.1 || >=16.0.0"** as it is using [pure ESM packages](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

### Swagger

The server serves a Swagger documentation exposed on this [url](http://localhost:4000/api/docs).

### Database

A 9.5MB JSON file was used as a Database, using [LowDB](https://github.com/typicode/lowdb).

[JSON Generator](https://www.json-generator.com/) was used to generate the JSON file. 

The Database contains **1000** documents, each of size **~10KB**.

The JSON file is available in **`/db/db.json`**.

The schema is available in **`/db/schema`**.

### Starting The Project

- Clone this repo.
- Make sure to have the required node version, then run **`npm i`**
- Then run **`npm run dev`** to start the server.

The `.env` file is used to specify the server listening **Port** and the **Database File Location**.