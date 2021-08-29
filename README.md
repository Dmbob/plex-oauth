![testing](https://github.com/Dmbob/plex-oauth/workflows/testing/badge.svg)

## Overview
This library is used to work with Plex OAuth to get an auth token used for making requests to a Plex server's API

As a note, these auth tokens should **not** be public. If you are making an app using a Plex auth token, it is recommended to not use the auth token on a frontend. If you need to authenticate a frontend system, then you should use the Plex auth token on the backend to make requests to the Plex server and use a different type of authentication for the frontend that will work with the Plex auth token on the backend.

## Installation
You can install this package through npm
```
npm install plex-oauth
```

## Usage
There are only 2 main functions to use in the `PlexOauth` class (`requestHostedLoginURL` & `checkForAuthToken`). These will both return promises. If either of these functions throw an error, it needs to be explicitly caught with a `try/catch` or using `.catch(err)` on the promise itself.

Please look at the following example of how to get the Plex hosted login UI URL and how to query for the auth token:
```typescript
import { PlexOauth, IPlexClientDetails } from "plex-oauth"

let clientInformation: IPlexClientDetails = {
    clientIdentifier: "<PROVIDE_UNIQUE_VALUE>", // This is a unique identifier used to identify your app with Plex.
    product: "<NAME_OF_YOUR_APP>",              // Name of your application
    device: "<NAME_OF_YOUR_DEVICE>",            // The type of device your application is running on
    version: "1",                               // Version of your application
    forwardUrl: "https://localhost:3000",       // Url to forward back to after signing in.
    platform: "Web",                            // Optional - Platform your application runs on - Defaults to 'Web'
}

let plexOauth = new PlexOauth(clientInformation);

// Get hosted UI URL and Pin Id
plexOauth.requestHostedLoginURL().then(data => {
    let [hostedUILink, pinId] = data;

    console.log(hostedUILink); // UI URL used to log into Plex

    /*
    * You can now navigate the user's browser to the 'hostedUILink'. This will include the forward URL
    * for your application, so when they have finished signing into Plex, they will be redirected back
    * to the specified URL. From there, you just need to perform a query to check for the auth token.
    * (See Below)
    */

   // Check for the auth token, once returning to the application
   plexOauth.checkForAuthToken(pinId).then(authToken => {
       console.log(authToken); // Returns the auth token if set, otherwise returns null

       // An auth token will only be null if the user never signs into the hosted UI, or you stop checking for a new one before they can log in
   }).catch(err => {
       throw err;
   });

}).catch(err => {
    throw err;
});
```
