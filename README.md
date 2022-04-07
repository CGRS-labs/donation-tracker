# Donation Tracker
Donation tracker is a donation and chapter management system for charities.

## Requirements
1. A Node.js development environment.
2. Access to a Postgres database
## Development Enviroment Setup
1. Clone this repository
2. Run `npm install`
3. Create a Postgres database and initialize the database using `schema.sql`
4. Copy `template.env` and create a `.env` file in the project root. 
    1. Specify the `PORT` for the express server, 
    2. Mapbox access tokens can be created by signing up for a [Mapbox](https://www.mapbox.com/) account
    3. Create a secret key
    4. Add your Postgres connections string as `PG_URI`
5. Start the app with the express server and Postgres database `npm run dev` or with the json-server `npm run json-dev`
## License
[MIT](https://choosealicense.com/licenses/mit/)
