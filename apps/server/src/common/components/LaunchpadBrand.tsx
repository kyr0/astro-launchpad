import { Link } from '@packages/i18n'
import { AstroIcon } from '@packages/icons'

export interface LaunchpadBrandProps {
  isAdmin: boolean
}

export const LaunchpadBrand = ({ isAdmin }: LaunchpadBrandProps) => (
  <ul class="menu menu-horizontal px-1">
    <li>
      <Link href={isAdmin ? '/admin' : '/'} class="normal-case text-xl">
        <AstroIcon />
        {isAdmin && <>Admin</>}
      </Link>
    </li>
  </ul>
)
