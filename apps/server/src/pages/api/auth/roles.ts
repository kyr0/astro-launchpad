import { authOpts, getRoles, Role } from '@packages/auth'
import { APIRoute } from 'astro'
import { getSession } from 'auth-astro'

export interface ApiResponse {
  roles: Array<Role>
}

/** returns the roles list for a logged-in user */
export const get: APIRoute = async ({ request }) => {
  const session = await getSession(request, authOpts)
  return {
    status: session ? 200 : 403,
    body: session ? JSON.stringify({
      roles: await getRoles(session)
    }) : JSON.stringify({
      roles: []
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }
}

