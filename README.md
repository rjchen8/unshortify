# Unshortify
Unshortify is a URL "unshortener". It takes a URL that has been put through a URL shortener, and returns the original link.
A preview of the site is also shown. Two APIs are used - one for the "unshortening" (unshorten.me), and the other for the site preview (LinkPreview).


## Tech 
Frontend: React/TypeScript

Backend: Node/Express + MongoDB

Authentication: Session based, using express-session

## Next Steps
- Dockerization
- Deployment (?)

<img width="1190" alt="image" src="https://github.com/rjchen8/unshortify/assets/122511498/c858366b-30ee-424a-ac7e-8de47148429a">

## Setup

Clone the repo, and in the `server` directory, create a file `.env`. Populate the file with the following variables.

`CONNECTION_STRING=<your mongoDB connection string>`

`PORT=5000`

`UNSHORTEN_TOKEN=<an API key from https://unshorten.me/api>`

`PREVIEW_TOKEN=<an API key from https://www.linkpreview.net/>`

`AUTH_SECRET=<anything you want>`

Afterwards, cd into the root directory and run `docker compose up`. The app can now be accessed from `localhost:5173`.
