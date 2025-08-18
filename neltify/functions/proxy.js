import fetch from "node-fetch";

export async function handler(event, context) {
  const apiUrl = `http://198.186.130.147:2239${event.path}`;
  const method = event.httpMethod;
  const headers = event.headers;
  const body = event.body;

  try {
    const response = await fetch(apiUrl, {
      method,
      headers: { ...headers, host: undefined },
      body: method !== "GET" && method !== "HEAD" ? body : undefined,
    });

    const data = await response.text(); // of response.json() als JSON
    return {
      statusCode: response.status,
      body: data,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
