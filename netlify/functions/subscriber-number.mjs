import { getDatabase } from "@netlify/database";

export default async function handler(request) {
  if (request.method !== "POST") {
    return Response.json(
      { error: "METHOD_NOT_ALLOWED" },
      { status: 405, headers: { allow: "POST" } }
    );
  }

  try {
    const db = getDatabase();
    // PostgreSQL updates this single row atomically, so concurrent requests
    // cannot receive the same subscriber number.
    const rows = await db.sql`
      UPDATE subscriber_number_counter
      SET last_number = last_number + 1
      WHERE id = 1
      RETURNING last_number
    `;

    if (!rows.length) {
      throw new Error("SUBSCRIBER_COUNTER_NOT_INITIALIZED");
    }

    return Response.json(
      { subscriberNumber: String(rows[0].last_number) },
      {
        status: 200,
        headers: {
          "content-type": "application/json; charset=utf-8",
          "cache-control": "no-store"
        }
      }
    );
  } catch (error) {
    console.error("Subscriber number allocation failed:", error);
    return Response.json(
      { error: "SUBSCRIBER_NUMBER_UNAVAILABLE" },
      { status: 503, headers: { "cache-control": "no-store" } }
    );
  }
}

export const config = { path: "/api/subscriber-number" };
