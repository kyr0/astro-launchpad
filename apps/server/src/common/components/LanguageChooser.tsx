import { getCurrentLocale, getLocales, switchLanguage, t } from "@packages/i18n"

export const LanguageChooser = () => {

  return (
    <div class="dropdown dropdown-end">
      <label tabIndex={0} class="btn btn-ghost gap-2">
        <img class={'w-5'} src={`/common/assets/flags/4x3/${getCurrentLocale()}.svg`} />
        <span class="hidden sm:inline-flex">{t(`common.i18n.${getCurrentLocale()}`)}</span>
      </label>
      <ul
        tabIndex={0}
        class="p-2 shadow menu menu-compact bg-base-100 bg-secondary rounded-box w-36 rounded-box dropdown-content"
      >
        {getLocales()
          .filter((locale) => locale !== getCurrentLocale())
          .map((locale) => (
            <li>
              <a onClick={() => switchLanguage(locale)}>
                <img class={'w-5'} src={`/common/assets/flags/4x3/${locale}.svg`} />
                {t(`common.i18n.${locale}`)}
              </a>
            </li>
          ))}
      </ul>
    </div>
  )
}
