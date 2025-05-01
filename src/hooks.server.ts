import {  type Handle, type HandleFetch } from '@sveltejs/kit'

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {

  const cookies = event.request.headers.get("cookie")

  if (cookies) {
    request.headers.set('cookie', cookies);
  }

  return await fetch(request);
}

export const handle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname === '/profile') {
    return new Response('Redirect', { status: 301, headers: { Location: '/profile/library' } });
  } else if (event.url.pathname === '/contributor') {
    return new Response('Redirect', { status: 301, headers: { Location: '/contributor/dashboard' } });
  }

  return resolve(event);
}
