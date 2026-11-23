const NVIDIA_ORIGIN = "https://integrate.api.nvidia.com";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization, Content-Type, Accept",
    "Access-Control-Max-Age": "86400"
  };
}

export default {
  async fetch(request) {
    const cors = corsHeaders();
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });

    const incoming = new URL(request.url);
    if (!["/v1/chat/completions", "/v1/models"].includes(incoming.pathname))
      return new Response("Route not allowed", { status: 404, headers: cors });
    if (!["GET", "POST"].includes(request.method))
      return new Response("Method not allowed", { status: 405, headers: cors });

    const authorization = request.headers.get("Authorization") || "";
    if (!authorization.startsWith("Bearer "))
      return new Response("Missing Bearer API key", { status: 401, headers: cors });

    const headers = new Headers({ Authorization: authorization, Accept: "application/json" });
    const contentType = request.headers.get("Content-Type");
    if (contentType) headers.set("Content-Type", contentType);

    try {
      const upstream = await fetch(NVIDIA_ORIGIN + incoming.pathname + incoming.search, {
        method: request.method, headers,
        body: request.method === "POST" ? request.body : undefined
      });
      const responseHeaders = new Headers(upstream.headers);
      for (const [key, value] of Object.entries(cors)) responseHeaders.set(key, value);
      responseHeaders.delete("content-length");
      responseHeaders.delete("content-encoding");
      return new Response(upstream.body, { status: upstream.status, statusText: upstream.statusText, headers: responseHeaders });
    } catch (error) {
      return new Response("NVIDIA proxy error: " + error.message, {
        status: 502, headers: { ...cors, "Content-Type": "text/plain; charset=utf-8" }
      });
    }
  }
};