interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
}

const LEAD_CLIENT_ID = "flm_hub";
const LEAD_SOURCE = "flm-hub-schedule-pickup";

type PagesFunction<E = unknown> = (context: {
  request: Request;
  env: E;
}) => Response | Promise<Response>;

const JSON_HEADERS = { "Content-Type": "application/json" };

type LeadBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string | null;
  service_need?: string;
  whatsapp_same?: boolean;
  additional_data?: Record<string, unknown>;
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (!(request.headers.get("content-type") ?? "").includes("application/json")) {
    return new Response(
      JSON.stringify({ success: false, error: "Expected JSON body" }),
      { status: 400, headers: JSON_HEADERS }
    );
  }

  let body: LeadBody;
  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid JSON body" }),
      { status: 400, headers: JSON_HEADERS }
    );
  }

  const supabaseUrl = env.SUPABASE_URL?.replace(/\/$/, "");
  const anonKey = env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    console.error("Missing required Cloudflare environment variables");
    return new Response(
      JSON.stringify({ success: false, error: "Server configuration error" }),
      { status: 500, headers: JSON_HEADERS }
    );
  }

  const payload = {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phone: body.phone,
    message: body.message ?? null,
    service_need: body.service_need ?? "Schedule Pickup",
    whatsapp_same: body.whatsapp_same ?? true,
    source: LEAD_SOURCE,
    client_id: LEAD_CLIENT_ID,
    additional_data: body.additional_data ?? {},
  };

  try {
    const edgeResponse = await fetch(
      `${supabaseUrl}/functions/v1/submit-lead`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${anonKey}`,
          apikey: anonKey,
        },
        body: JSON.stringify(payload),
      }
    );

    return new Response(await edgeResponse.text(), {
      status: edgeResponse.status,
      headers: JSON_HEADERS,
    });
  } catch (error) {
    console.error("Failed to reach Supabase edge function:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to submit lead" }),
      { status: 502, headers: JSON_HEADERS }
    );
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: { Allow: "POST, OPTIONS" },
  });
};
