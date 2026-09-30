/**
 * Server-only configuration for talking to the Mycleaners billing API.
 *
 * `LEADS_API_KEY` must never be exposed to the browser. It is read here, in a
 * server module, with no `NEXT_PUBLIC_` prefix, so Next.js keeps it out of the
 * client bundle. The whole reason the website proxies leads through its own API
 * routes rather than calling Railway directly is this value.
 */

const DEFAULT_TIMEOUT_MS = 10_000

export class LeadsApiError extends Error {
  readonly status: number
  readonly code: string

  constructor(status: number, code: string, message: string) {
    super(message)
    this.name = 'LeadsApiError'
    this.status = status
    this.code = code
  }
}

function getConfig() {
  const baseUrl = process.env.LEADS_API_URL?.replace(/\/$/, "")
  const apiKey = process.env.LEADS_API_KEY

  return { baseUrl, apiKey }
}

/** True when the proxy is configured and can actually forward a request. */
export function isLeadsApiConfigured(): boolean {
  const { baseUrl, apiKey } = getConfig()
  return Boolean(baseUrl && apiKey)
}

/**
 * Forward a request to the billing API with the scoped API key attached.
 *
 * Maps upstream failures onto a small, stable set of statuses so the route
 * handler can decide what the customer sees without leaking upstream detail.
 */
export async function callLeadsApi<T>(
  path: string,
  init: { method: "GET" | "POST"; body?: unknown; query?: Record<string, string | undefined> }
): Promise<T> {
  const { baseUrl, apiKey } = getConfig()

  if (!baseUrl || !apiKey) {
    throw new LeadsApiError(
      503,
      "API_NOT_CONFIGURED",
      "Lead service is not configured"
    )
  }

  const url = new URL(`${baseUrl}/api/v1${path}`)
  for (const [key, value] of Object.entries(init.query ?? {})) {
    if (value) url.searchParams.set(key, value)
  }

  let response: Response
  try {
    response = await fetch(url, {
      method: init.method,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: init.body === undefined ? undefined : JSON.stringify(init.body),
      signal: AbortSignal.timeout(DEFAULT_TIMEOUT_MS),
      cache: "no-store",
    })
  } catch (error) {
    // A timeout or connection refusal. Log the cause, tell the caller nothing
    // useful: the customer just needs to know to try again.
    console.error("[leads-api] request failed", {
      path,
      error: error instanceof Error ? error.message : error,
    })
    throw new LeadsApiError(
      502,
      "UPSTREAM_UNAVAILABLE",
      "Lead service is temporarily unavailable"
    )
  }

  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    const code = payload?.error?.code ?? "UPSTREAM_ERROR"
    const message = payload?.error?.message ?? "Lead service rejected the request"

    // Surface upstream business errors (a deactivated store, a validation
    // failure) to the caller so the form can react, but keep 5xx opaque.
    if (response.status >= 500) {
      console.error("[leads-api] upstream error", { path, status: response.status, code })
      throw new LeadsApiError(502, "UPSTREAM_UNAVAILABLE", "Lead service is temporarily unavailable")
    }

    throw new LeadsApiError(response.status, code, message)
  }

  return payload?.data as T
}
