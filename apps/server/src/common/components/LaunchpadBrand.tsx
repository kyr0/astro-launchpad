import { Link } from '@packages/i18n'
import { AstroIcon } from '@packages/icons'

export interface LaunchpadBrandProps {
  isAdmin: boolean
}

export const LaunchpadBrand = ({ isAdmin }: LaunchpadBrandProps) => (
  <Link
    href={isAdmin ? '/admin' : '/'}
    class="navbar-brand fs-4 col-12 col-md-auto text-center align-middle position-relative"
    style={{ top: -9 }}
  >
    <AstroIcon />
    <span
      class="badge badge-secondary position-absolute"
      style={{ fontSize: 12, left: -8, bottom: -5 }}
    >
      *** &nbsp;LaunchPad
    </span>
  </Link>
)
