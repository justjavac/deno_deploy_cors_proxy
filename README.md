# Deno Deploy CORS Proxy

https://cors.deno.dev

## Usage

Before:

```js
const response = await fetch("https://xxxx.com/api");
// Uncaught TypeError: Failed to fetch
// Access to fetch at 'https://xxxx.com/api' from origin 'http://localhost'
// has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is
// present on the requested resource.
// If an opaque response serves your needs, set the request's mode to 'no-cors'
// to fetch the resource with CORS disabled.
```

After:

```js
const response = await fetch("https://cors.deno.dev/https://xxxx.com/api");
const json = await response.json();
```
