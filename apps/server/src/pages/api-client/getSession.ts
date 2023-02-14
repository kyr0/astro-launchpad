/** session data of a logged-in user */
export interface Session {
  user: {
    name: string // 'Aron Homberg'
    email: string // 'info@aron-homberg.de'
    image: string // 'https://avatars.githubusercontent.com/u/454817?v=4'
  }
  expires: string // '2023-03-03T00:35:44.043Z'
}

/** returns the current auth session if available */
export const getSession = async () => {
  const maybeSession: Session = await (await fetch('/api/auth/session')).json()

  if (!maybeSession.user && !maybeSession.expires) {
    return null
  }
  return maybeSession
}
