import { t, Link } from "@packages/i18n";
import { DoorIcon } from "@packages/icons/src/DoorIcon";

export const LoginButton = () => (
  <Link href="/auth/signin" className="btn btn-primary btn-sm gap-2">
    <DoorIcon /> {t('common.auth.signin')}
  </Link>
)
