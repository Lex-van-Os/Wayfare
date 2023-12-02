# Wayfare Server

## Installation

### Prerequisites

- Node.js installed

### Getting Started

1. Install the required project packages:

   ```bash
   npm install
   ```

2. Run the server:

   ```bash
   npm start
   ```

## Project Architecture

### Layout

The server project consists of three main layers: routes, controllers, and services.

**Routes**

The routing layer defines URIs for actions related to the MongoDB application collections. Routes are defined within the `app.ts` file, while further collection-specific actions are defined inside the collection-specific route layers (found under the `routes` folder).

**Controllers**

Through the defined collection routes, collection-specific controller methods are called. Controller methods perform the necessary CRUD-related functionality through the services and then perform further application logic for data processing.

**Services**

The service layer handles communication with the MongoDB database. Using the defined database configuration (done in `server.ts`), the necessary collection CRUD actions are performed.

### Collections

Upon making use of the application, collections are automatically defined and created before performing CRUD operations on the defined collections

### Modules

This project makes use of ESM modules

### Error handling

This project makes use of custom error handling for development. Through the Morgan and the http-errors packages, a custom middleware is defined that is wrapped around the Controller and Service methods. Through definitions in app.ts, middleware is defined and configurable.

## Used Packages / Dependencies

- TypeScript
- Nodemon
- ESlint
- Envalid
- MongoDB with Node.js driver
- Morgan
- http-errors
- bcrypt

## Usage

The server is used and tested using the client. However, if you prefer to directly use the server functionality, you can make use of the defined routes inside the project server files. Alternatively, you may also use Postman for testing the project routes.
