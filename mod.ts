function addCorsIfNeeded(response: Response) {
  const headers = new Headers(response.headers);

  if (!headers.has("access-control-allow-origin")) {
    headers.set("access-control-allow-origin", "*");
  }

  return headers;
}

function isUrl(url: string) {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return false;
  }

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

async function handleRequest(request: Request) {
  const { pathname } = new URL(request.url);
  const url = pathname.substr(1);

  if (isUrl(url)) {
    const corsHeaders = addCorsIfNeeded(new Response());
    if (request.method.toUpperCase() === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const response = await fetch(url, request);
    const headers = addCorsIfNeeded(response);
    return new Response(response.body, { ...response, headers });
  }

  const usage = new URL("README.md", import.meta.url);
  return fetch(usage);
}

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(handleRequest(event.request));
});
