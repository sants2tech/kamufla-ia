const ALLOWED_ORIGIN = "https://sants2tech.github.io";
const NVIDIA_ORIGIN = "https://integrate.api.nvidia.com";

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin"
  };
}

export default {
  async fetch(request) {
    const origin = request.headers.get("Origin") || "";
    if (origin !== ALLOWED_ORIGIN) {
      return new Response("Origin not allowed", { status: 403 });
    }

    const cors = corsHeaders(origin);
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    const incoming = new URL(request.url);
    if (!["/v1/chat/completions", "/v1/models"].includes(incoming.pathname)) {
      return new Response("Route not allowed", { status: 404, headers: cors });
    }
    if (!["GET", "POST"].includes(request.method)) {
      return new Response("Method not allowed", { status: 405, headers: cors });
    }
    if (!request.headers.get("Authorization")?.startsWith("Bearer ")) {
      return new Response("Missing Bearer API key", { status: 401, headers: cors });
    }

    const upstreamUrl = NVIDIA_ORIGIN + incoming.pathname + incoming.search;
    const headers = new Headers();
    headers.set("Authorization", request.headers.get("Authorization"));
    if (request.headers.get("Content-Type")) {
      headers.set("Content-Type", request.headers.get("Content-Type"));
    }
    headers.set("Accept", request.headers.get("Accept") || "application/json");

    try {
      const upstream = await fetch(upstreamUrl, {
        method: request.method,
        headers,
        body: request.method === "POST" ? request.body : undefined
      });
      const responseHeaders = new Headers(upstream.headers);
      for (const [key, value] of Object.entries(cors)) responseHeaders.set(key, value);
      responseHeaders.delete("content-length");
      responseHeaders.delete("content-encoding");
      return new Response(upstream.body, {
        status: upstream.status,
        statusText: upstream.statusText,
        headers: responseHeaders
      });
    } catch (error) {
      return new Response("NVIDIA proxy error: " + error.message, {
        status: 502,
        headers: { ...cors, "Content-Type": "text/plain; charset=utf-8" }
      });
    }
  }
};
