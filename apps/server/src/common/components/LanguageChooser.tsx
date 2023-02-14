import { getCurrentLocale, getLocales, switchLanguage, t } from '@packages/i18n'
import styles from './LanguageChooser.module.scss'

export const LanguageChooser = () => {
  return (
    <div class="dropdown">
      <button
        class={`btn btn-outline-light dropdown-toggle ${styles.dropdownButton}`}
        type="button"
        aria-label={'Switch language'}
        id="languageChooserMenu"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          class={styles.languageIcon}
          alt={getCurrentLocale()}
          src={`/common/assets/flags/4x3/${getCurrentLocale()}.svg`}
        />
      </button>
      <ul
        class={`dropdown-menu dropdown-menu-dark ${styles.dropdownMenu}`}
        aria-labelledby="languageChooserMenu"
      >
        {getLocales()
          .filter((locale) => locale !== getCurrentLocale())
          .map((locale) => (
            <li>
              <a
                href="#"
                class={`${styles.dropdownButton} ${styles.dropdownItem} ${
                  locale !== getCurrentLocale() ? '' : 'active'
                }`}
                onClick={() => switchLanguage(locale)}
              >
                <img
                  alt={locale}
                  class={styles.languageIcon}
                  src={`/common/assets/flags/4x3/${locale}.svg`}
                />
              </a>
            </li>
          ))}
      </ul>
    </div>
  )
}
