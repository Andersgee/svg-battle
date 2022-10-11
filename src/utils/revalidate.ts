/**
 * give the next visit to `path` latest props.
 *
 * ```raw
 * details:
 * Not calling this is fine but then path would require 2 visits for latest props.
 * The first visit would get cached props and trigger revalidation.
 * The second visit would get updated props.
 * ```
 *  */
export async function revalidate(path: string) {
  return fetch("/api/revalidate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path }),
  });
}
