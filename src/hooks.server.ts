import type { HandleFetch } from '@sveltejs/kit'

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
  const cookies = event.request.headers.get("cookie")

  if (cookies) {
    request.headers.set('cookie', cookies);
  }

  return await fetch(request);
}
