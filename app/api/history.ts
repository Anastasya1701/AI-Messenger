export async function POST(req) {
  const { user_id } = await req.json();

  const response = await fetch("https://n8n-webhook.com/get-history", {
    method: "POST",
    body: JSON.stringify({ user_id }),
  });

  const history = await response.json();
  return Response.json(history);
}
