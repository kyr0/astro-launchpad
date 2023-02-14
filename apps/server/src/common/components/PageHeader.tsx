import { AuthState, getAuthState, anonymousUserAuthState } from '@packages/auth'
import { useState } from 'preact/hooks'
import { useEffect } from '@packages/reactive'
import { LoginButton } from './LoginButton'
import { LanguageChooser } from './LanguageChooser'
import { LaunchpadBrand } from './LaunchpadBrand'
import { Link } from '@packages/i18n'
import { UserDropdown } from './UserDropdown'

/**
 * 
 * 
    <header>
      <nav class="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
        <div class="px-6 w-full flex flex-wrap items-center justify-between">
          <div class="flex items-center">
            <LaunchpadBrand isAdmin={authState.isAdmin} />
          </div>

          <div class="navbar-collapse collapse grow items-center" id="navbarSupportedContentY">
            <ul class="navbar-nav mr-auto lg:flex lg:flex-row">
              <li class="nav-item">
                <a
                  class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                  href="#!"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                  href="#!"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  Features
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                  href="#!"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  Pricing
                </a>
              </li>
              <li class="nav-item mb-2 lg:mb-0">
                <a
                  class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                  href="#!"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  About
                </a>
              </li>

              <LanguageChooser />

              {authState.isLoggedIn && <UserDropdown authState={authState} />}

              {!authState.isLoggedIn && <LoginButton />}
            </ul>
          </div>
        </div>
      </nav>
    </header>
 */

export const PageHeader = () => {
  const [authState, setAuthState] = useState<AuthState>(anonymousUserAuthState)

  useEffect(async () => {
    setAuthState(await getAuthState())
  })

  return (
    <nav
      id="navScroll"
      class="navbar navbar-dark bg-black fixed-top "
      style="width:100vw"
      tab-index="0"
    >
      <div class="container">
        <div class="d-flex">
          <LaunchpadBrand isAdmin={authState.isAdmin} />
          <LanguageChooser />
        </div>

        <div class="mx-e-auto d-flex">
          {!authState.isLoggedIn && <LoginButton />}
          {authState.isLoggedIn && <UserDropdown authState={authState} />}
        </div>
      </div>
    </nav>
  )
}
