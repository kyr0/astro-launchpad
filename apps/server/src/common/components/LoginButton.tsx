import { t, Link } from '@packages/i18n'
import { DoorIcon } from '@packages/icons/src/DoorIcon'

export const LoginButton = () => (
  <Link href="/auth/signin" aria-label="Sign in" className="btn btn-outline-light">
    <DoorIcon /> <small>{t('common.auth.signin')}</small>
  </Link>
)
