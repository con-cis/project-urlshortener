# URL Shortener Project

Welcome to the URL Shortener Project! This project aims to provide a simple and efficient URL shortening service.

## Table of Contents

- [URL Shortener Project](#url-shortener-project)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Configuration](#configuration)
  - [Architecture](#architecture)
  - [Error Handling](#error-handling)
  - [DNS Probing](#dns-probing)
  - [Setting Up MongoDB](#setting-up-mongodb)
  - [Contributing](#contributing)
  - [License](#license)
  - [Disclaimer](#disclaimer)

## Introduction

The URL Shortener Project is designed to create shortened URLs that redirect to the original long URLs. It's built using Node.js, Express, and MongoDB.

## Features

- Generate short URLs from long URLs
- Redirect short URLs to the original long URLs

## Prerequisites

Before getting started, make sure you have the following software installed:

- Node.js (Version 14 or higher)
- MongoDB (Version 4 or higher) [Only required for local or self-hosted MongoDB instances]

## Installation

To install and set up the project, follow these steps:

1. Clone this repository: `git clone https://github.com/con-cis/url-shortener.git`
2. Navigate to the project directory: `cd url-shortener`
3. Install dependencies: `npm install`

## Usage

To use the URL shortener service, follow these steps:

1. Start the server: `npm start`
2. Open your web browser and go to: `http://localhost:3000`
3. Enter a long URL and click "Shorten" to generate a short URL.
4. Access the short URL in your browser to be redirected to the original long URL.

## Configuration

You can configure the URL shortener service by modifying the `.env` file in the root directory. Copy the `.env.example` file to `.env` and adjust the values as needed.

## Architecture

The URL Shortener Project follows a simple but effective architecture pattern. It uses the Express framework to handle HTTP requests, and MongoDB with Mongoose for data storage. The application structure includes controllers for URL shortening and redirection, and models to interact with the database.

## Error Handling

The project employs comprehensive error handling. Invalid URLs are detected through DNS probing, preventing the generation of short URLs for non-existent URLs. Express-validator is used to ensure URL validity before processing.

## DNS Probing

DNS probing is used to verify the existence of the domain in a given URL. This helps prevent the creation of short URLs for URLs that won't resolve, enhancing the reliability of the service.

## Setting Up MongoDB

For the trigger functionality, you'll need to use a MongoDB Cloud cluster, as triggers are not supported with local or self-hosted MongoDB instances. If you prefer using local or self-hosted MongoDB, refer to the [MongoDB Change Streams documentation](https://www.mongodb.com/docs/manual/changeStreams/) for more information.

---
**NOTE**

Set "Event Ordering" in the trigger details to true to prevent race conditions from the code challenge automated requests testing

---

The trigger event code for auto-incrementing counters can be found in the [blog entry](https://www.mongodb.com/basics/mongodb-auto-increment).

## Contributing

Contributions are welcome! If you'd like to contribute to the project, follow these steps:

1. Fork this repository.
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Disclaimer

This project/app/tool is based on the freeCodeCamp community and platform, which is open source and available under the BSD-3 license. While this project utilizes freeCodeCamp's resources, it's important to note the following:

- This project is not officially endorsed by freeCodeCamp.
- The creators of this project do not represent freeCodeCamp itself.
- While most non-sensitive freeCodeCamp data is publicly available and can be used in accordance with the terms of the BSD-3 license, it's crucial to respect the privacy and terms of use of the freeCodeCamp community and platform.
- Any modifications, use of data, or interactions with the freeCodeCamp platform should be in compliance with the freeCodeCamp's terms of use and any relevant policies.

By using this project/app/tool, you acknowledge that it is not an official product of freeCodeCamp, and any support or issues related to this project should be directed to the project's maintainers, rather than the freeCodeCamp organization.

For more information about freeCodeCamp's terms of use and licensing, please refer to the [freeCodeCamp License](https://github.com/freeCodeCamp/freeCodeCamp/blob/main/LICENSE.md).