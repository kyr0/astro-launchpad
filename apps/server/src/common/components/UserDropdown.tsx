import { AuthState, signOut } from "@packages/auth"
import { t } from "@packages/i18n"
import { DoorIcon } from "@packages/icons"

export interface UserDropdownProps {
  authState: AuthState
}

export const UserDropdown = ({ authState }: UserDropdownProps) => {

  return (
    <div class="dropdown dropdown-end mr-4">
      {authState.user && authState.user.image && (
        <label tabIndex={0} class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src={authState.user && authState.user.image} />
          </div>
        </label>
      )}
      <ul
        tabIndex={0}
        class="p-2 shadow menu menu-compact dropdown-content bg-secondary rounded-box w-48"
      >
        <li>
          <a onClick={() => signOut()}>
            <DoorIcon />
            {t(`common.auth.logout`)}
          </a>
        </li>
      </ul>
    </div>
  )
}
