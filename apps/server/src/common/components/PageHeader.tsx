import { AuthState, getAuthState, anonymousUserAuthState } from '@packages/auth'
import { useState } from 'preact/hooks'
import { useEffect } from '@packages/reactive'
import { LoginButton } from './LoginButton'
import { LanguageChooser } from './LanguageChooser'
import { LaunchpadBrand } from './LaunchpadBrand'
import { UserDropdown } from './UserDropdown'

export const PageHeader = () => {

  const [authState, setAuthState] = useState<AuthState>(anonymousUserAuthState)

  useEffect(async () => {
    setAuthState(await getAuthState())
  })

  return (
    <header>
        <nav class="navbar bg-base-100 animate-in fade-in duration-300 shadow-lg drop-shadow-xl">
          
          <div class="flex-1">
            <LaunchpadBrand isAdmin={authState.isAdmin} />
          </div>

          <div class="flex-none gap-2">

            <LanguageChooser />

            {authState.isLoggedIn && (
              <UserDropdown authState={authState} />
            )}

            {!authState.isLoggedIn && (
              <LoginButton />
            )}
          </div>
        </nav>
    </header>
  )
}
