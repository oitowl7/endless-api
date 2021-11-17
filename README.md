# SingleStone Endless Node.js API

This project is a node.js API used to serve the fictional [Endless website](https://github.com/oitowl7/endless-hooks-practice). The Github Pages site for this front end React project can be found [here](https://oitowl7.github.io/endless-hooks-practice/). It's current functionality involves only "how to steps" and the versioning belonging to each step with the ability to get, get all, post, update, update version, and delete for each step. It is connected to a Google Cloud MYSQL server. Much of the security on this site has been removed to make the functionality simpler (shortcuts & hacks). Due to the API being hosted on a Heroku page, there will occasionally be 1 long loading cycle while Heroku redeploys the site from hibernation

## Installation and Usage:
* Clone the existing repository
* Run `npm install`
* Run `npm start` once everything installs to run locally. You will need a .env file in your base directory that I will provide if you request it in order to connect to the existing database. I have not created any migrations or seeders to run this app in a local environment however with a little can-do, you can likely reverse engineer the 2 tables from the `docs.html` documentation should you desperately need that information.
* You will not be able to deploy changes directly to Heroku as that uses my personal Heroku login information.

Please see the `docs.html` file for API documentation. This documentation was created using Swagger yml's and a Python script and contains routes, methods, parameters, request body structures, and all different response types. 