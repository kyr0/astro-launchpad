import { AstroAuth, getSession as getSessionOnServer, type AstroAuthConfig } from 'auth-astro'
import GitHub from '@auth/core/providers/github'
import { signOut as signOutOriginal, signIn as signInOriginal } from 'auth-astro/client'
import { isServer } from 'runtime-info'
import { getStorage } from 'simply-persist'

/** roles implemented in the ACL */
export enum Role {
  ADMIN = 'admin',
  USER = 'user',
  ANONYMOUS = 'anonymous',
}

/** supported social auth providers */
export type AuthProviders = 'github'

// https://next-auth.js.org/providers/github
// https://docs.github.com/de/developers/apps/building-oauth-apps/authorizing-oauth-apps
export const authOpts: AstroAuthConfig = {
  providers: [
    // https://github.com/settings/apps/new
    //@ts-expect-error issue https://github.com/nextauthjs/next-auth/issues/6174
    GitHub({
      clientId: import.meta.env.GITHUB_CLIENT_ID,
      clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    }),
  ],
}

/** session type of next auth */
export type Session = Awaited<Promise<PromiseLike<ReturnType<typeof getSessionOnServer>>>>

/** user type */
export type User = Session['user']

/** an anonymous user record */
export const AnonymousUser: User = {
  email: 'anonymous@anonymous.anonymous',
  image: '#',
  name: 'anonymous',
}

export const anonymousUserAuthState: AuthState = {
  isAdmin: false,
  isLoggedIn: false,
  user: AnonymousUser,
  roles: [Role.ANONYMOUS],
}

export const AuthMemoizeSessionKey = '@astroadmin_session'

/** returns the current auth session if available (isomorphic) */
export const getSession = async (astroRequest?: Request) => {
  let session: Session

  if (isServer() && !astroRequest) return null
  if (isServer() && astroRequest) {
    session = await getSessionOnServer(astroRequest, authOpts)
  } else {
    // memoized session on client-side
    const localStorage = getStorage('local')
    const authResult = validateAuthState(await localStorage.get(AuthMemoizeSessionKey, null))
    const sessionExpired =
      authResult &&
      authResult.expires &&
      authResult.expires instanceof Date &&
      authResult.expires &&
      Date.now() >= authResult.expires.getTime()
    const noSessionMemoized = !authResult || !authResult.expires

    if (sessionExpired || noSessionMemoized) {
      session = await (await fetch('/api/auth/session')).json()
      localStorage.set(AuthMemoizeSessionKey, session)
    } else {
      session = {
        expires: authResult.expires.toString(),
        user: authResult.user,
      }
    }
  }

  if (!session || !session.user) {
    return null
  }
  return session
}

/** signs a user out */
export const signOut = async () => {
  if (isServer()) {
    throw new Error('signOut() is not supported on server-side')
  } else {
    // erase memoization
    const localStorage = getStorage('local')
    localStorage.del(AuthMemoizeSessionKey)
    return await signOutOriginal()
  }
}

/** signs up/signs a user in */
export const signIn = async (provider: AuthProviders) => {
  if (isServer()) {
    throw new Error('signIn() is not supported on server-side')
  } else {
    return await signInOriginal(provider)
  }
}

/** returns the roles of a logged-in user (isomorphic) */
export const getRoles = async (session: Session): Promise<Array<Role>> => {
  let roles = [Role.ANONYMOUS, Role.USER]
  if (isServer()) {
    const adminUsers = JSON.parse(import.meta.env.ADMIN_USER_EMAILS)
    if (adminUsers.indexOf(session.user.email) > -1) {
      roles.push(Role.ADMIN)
    }
  } else {
    roles = (await (await fetch('/api/auth/roles')).json()).roles
  }
  return roles
}

/** auth result object (return type of calling checkAuth()) */
export interface AuthState {
  isLoggedIn: boolean
  isAdmin: boolean
  expires?: Date
  user?: Session['user']
  roles: Array<Role>
}

/** validates a partial or even non-existing authResult object (isomorphic) */
export const validateAuthState = (authState?: Partial<AuthState>): AuthState => {
  if (!authState) authState = {}

  if (!authState.isLoggedIn) {
    authState.isLoggedIn = false
  }

  if (!authState.roles) {
    authState.roles = [Role.ANONYMOUS]
  }

  if (authState.roles.indexOf(Role.ADMIN) > -1) {
    authState.isAdmin = true
  } else {
    authState.isAdmin = false
  }

  if (authState.expires && typeof authState.expires === 'string') {
    authState.expires = new Date(authState.expires)
  }

  return authState as AuthState
}

/** checks if a session exists and produces an AuthResult having roles (isomorphic) */
export const getAuthState = async (astroRequest?: Request): Promise<AuthState> => {
  const session = await getSession(astroRequest)

  if (session && session.user && session.user.email) {
    return validateAuthState({
      isLoggedIn: true,
      roles: await getRoles(session),
      user: session.user,
      expires: new Date(session.expires),
    })
  }
  return validateAuthState()
}

/** returns the endpoint definitions for next auth / OAuth callbacks (server-side only) */
export const getEndpoints = () => AstroAuth(authOpts)
