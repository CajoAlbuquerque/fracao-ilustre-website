import type { Context } from "@netlify/edge-functions";

export default async function handler(req: Request, context: Context) {
  const user = Deno.env.get("BASIC_AUTH_USER") ?? "";
  const pass = Deno.env.get("BASIC_AUTH_PASS") ?? "";

  // If no credentials are configured, skip auth (e.g. production environment)
  if (!user) {
    return context.next();
  }

  const authHeader = req.headers.get("Authorization");
  if (authHeader) {
    const [scheme, encoded] = authHeader.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = atob(encoded);
      const colonIndex = decoded.indexOf(":");
      if (colonIndex !== -1) {
        const u = decoded.slice(0, colonIndex);
        const p = decoded.slice(colonIndex + 1);
        if (u === user && p === pass) {
          return context.next();
        }
      }
    }
  }

  return new Response("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Staging", charset="UTF-8"',
    },
  });
}
