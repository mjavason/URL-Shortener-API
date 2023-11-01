# URL Shortener API

## Description

The URL Shortener API is a versatile tool for converting lengthy URLs into concise, shareable links. Users can easily create custom short links, set link expiration, and gain insights into link usage. This API simplifies the process of generating and managing shortened URLs for various use cases, including social media, marketing campaigns, and more.

The live version of the API is hosted at [URL Shortener Live Version](https://url-shortener-i9kc.onrender.com).

## Installation

To get started, install the project dependencies using npm:

```bash
$ npm install
```

Create an `.env` file in the project root directory with the following contents and replace placeholders with your specific configurations:

```env
PORT=xxxx
MONGO_DB_NAME=xxxx
MONGO_DB_URL=xxxx
```

## Running the App

You can run the application in different modes:

- Development Mode:

```bash
$ npm run start:dev
```

- Production Mode:

```bash
$ npm run start:prod
```

## Documentation

For detailed documentation on how to use the URL Shortener API and its endpoints, you can access the Swagger documentation at:

[Swagger Documentation](https://url-shortener-i9kc.onrender.com/docs)

The Swagger documentation provides information on available endpoints, request parameters, and response structures, making it easier to interact with the API.

## Features

- **Shorten URLs:** Quickly create shortened URLs from long ones.
- **Custom Short Codes:** Personalize short links to match your branding or messaging.
- **URL Expiration:** Set expiration dates for short links, ensuring they're only valid for a specified duration.
- **Link Analytics:** Track the number of clicks on your shortened links and gain insights into link engagement.

## Contributing

Contributions to the URL Shortener API are welcome! If you'd like to contribute:

1. Fork the project on GitHub.

2. Create a new branch for your changes.

3. Make your improvements or additions.

4. Thoroughly test your changes.

5. Create a pull request with a clear description of your changes.

Please be cautious with the handling of user data and URLs to ensure privacy and security.