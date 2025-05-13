import type { LayoutServerLoad } from './$types';
import { userSchema } from "$lib/model"
import { loadFlash } from "sveltekit-flash-message/server"
import setCookie from "set-cookie-parser";

export const load: LayoutServerLoad = loadFlash(async (event) => {
  const res = await event.fetch("http://localhost:8080/api/v1/auth/me", {
    credentials: 'include',
  })

  const cookies = res.headers.get('set-cookie');
  if (cookies) {
    const c = setCookie(cookies, {
      map: true,
      decodeValues: true,
    })
    const u = c["user-session"]
    event.cookies.set(u.name, u.value, {
      path: u.path ?? "/",
      sameSite: "lax",
      domain: u.domain,
      httpOnly: u.httpOnly,
      maxAge: u.maxAge,
      expires: u.expires,
      encode: v => v,
    })
  }

  const userRes = await res.json();

  const parsedUser = userSchema.safeParse(userRes.data);

  if (!parsedUser.success) {
    return {
      user: null
    };
  }

  return {
    user: parsedUser.data,
  };
})
