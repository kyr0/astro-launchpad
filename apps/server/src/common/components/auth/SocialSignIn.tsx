import { signIn, getAuthState, AuthState, anonymousUserAuthState } from '@packages/auth'
import { t } from '@packages/i18n'
import { GithubIcon } from '@packages/icons'
import { useRef, useState } from 'preact/hooks'
import { useEffect } from '@packages/reactive'

export const SocialSignIn = () => {
  const [authState, setAuthState] = useState<AuthState>(anonymousUserAuthState)
  const githubLoginButton = useRef<HTMLButtonElement>()

  useEffect(async () => {
    setAuthState(await getAuthState())
  })

  const onLoginGithubClick = async () => {
    githubLoginButton.current.setAttribute('disabled', 'true')
    await signIn('github')
  }

  return (
    <>
      {!authState.isLoggedIn && (
        <div>
          <button
            ref={githubLoginButton}
            type="button"
            class="btn btn-white btn-xl mb-4"
            onClick={onLoginGithubClick}
          >
            <GithubIcon /> GitHub
          </button>
        </div>
      )}

      {authState.isLoggedIn && (
        <p style="color: #999">
          {t('common.auth.already_logged_in')}, {authState.user.name.split(' ')[0]}.
        </p>
      )}
    </>
  )
}
