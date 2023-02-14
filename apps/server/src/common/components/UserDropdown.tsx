import { AuthState, signOut } from '@packages/auth'
import { DoorIcon } from '@packages/icons/src/DoorIcon'
import styles from './UserDropdown.module.scss'

export interface UserDropdownProps {
  authState: AuthState
}

export const UserDropdown = ({ authState }: UserDropdownProps) => (
  <>
    <div class="dropdown">
      <button
        class={`btn btn-outline-light dropdown-toggle ${styles.dropdownButton}`}
        type="button"
        id="userMenu"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {authState.user && authState.user.image && (
          <img
            src={authState.user && authState.user.image}
            class={`rounded-full w-32 shadow-lg ${styles.userAvatar}`}
          />
        )}
      </button>
      <ul
        class={`dropdown-menu dropdown-menu-dark  ${styles.dropdownMenu}`}
        aria-labelledby="userMenu"
      >
        <li>
          <a
            href="#"
            class={`${styles.dropdownButton} ${styles.dropdownItem}`}
            onClick={() => signOut()}
            aria-label="Sign out"
          >
            <DoorIcon />
          </a>
        </li>
      </ul>
    </div>
  </>
)
