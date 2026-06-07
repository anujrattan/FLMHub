export interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pickupArea: string;
  pickupFrom: "office" | "home";
  message: string;
}

/** Payload shape expected by the Supabase `submit-lead` edge function. */
export interface LeadApiPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string | null;
  service_need: string;
  whatsapp_same: boolean;
  additional_data: {
    pickup_area: string;
    pickup_from: string;
  };
}

export function buildLeadPayload(form: LeadFormData): LeadApiPayload {
  return {
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    message: form.message.trim() || null,
    service_need: "Schedule Pickup",
    whatsapp_same: true,
    additional_data: {
      pickup_area: form.pickupArea,
      pickup_from: form.pickupFrom,
    },
  };
}

export async function submitLead(form: LeadFormData): Promise<void> {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildLeadPayload(form)),
  });

  let body: { success?: boolean; error?: string } = {};
  try {
    body = (await response.json()) as { success?: boolean; error?: string };
  } catch {
    // Non-JSON error response
  }

  if (!response.ok || body.success === false) {
    throw new Error(
      body.error ?? "Unable to submit your request. Please try again."
    );
  }
}
