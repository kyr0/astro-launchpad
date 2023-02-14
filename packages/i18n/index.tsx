import i18n, { changeLanguage, t as tFn } from 'i18next'
import AstroI18next from '../../apps/server/astro-i18next.config'
import getUserLocale from 'get-user-locale'
import { isBrowser } from 'runtime-info'
import { getStorage } from 'simply-persist'
import { JSX } from 'preact/jsx-runtime';
import { ComponentChildren } from 'preact';

export type Locale = string

export const t = tFn

export const getCurrentLocale = (): Locale => i18n.language as Locale
export const getLocales = (): Array<Locale> => i18n.languages as Array<Locale>

export const detectLocale = () => {
  const localeCandidate = getUserLocale()
  return localeCandidate.split('-')[0] as Locale
}

export const getPathSegments = (path = '') => path.split('/').filter((segment) => segment !== '')

export const removeLocaleFromPathSegments = (pathSegments: Array<string>) => {
  const { locales } = AstroI18next
  for (const locale of locales) {
    if (pathSegments[0] === locale) {
      pathSegments.shift()
      break
    }
  }
  return pathSegments
}

export const unlocalizePath = (path = '/') =>
  removeLocaleFromPathSegments(getPathSegments(path)).join('/')

/** injects the given locale to a path */
export const localizePath = (
  path = '/',
  locale: Locale | null = null,
  base = import.meta.env.BASE_URL
): string => {
  if (!locale) {
    locale = i18n.language as Locale
  }

  let pathSegments = getPathSegments(path)
  const baseSegments = base.split('/').filter((segment) => segment !== '')

  if (JSON.stringify(pathSegments).startsWith(JSON.stringify(baseSegments).replace(/]+$/, ''))) {
    // remove base from path
    pathSegments.splice(0, baseSegments.length)
  }

  path = pathSegments.length === 0 ? '' : pathSegments.join('/')
  base = baseSegments.length === 0 ? '/' : '/' + baseSegments.join('/') + '/'

  const { flatRoutes, showDefaultLocale, defaultLocale, locales } = AstroI18next

  if (!locales.includes(locale)) {
    console.warn(
      `WARNING(astro-i18next): "${locale}" locale is not supported, add it to the locales in your astro config.`
    )
    return `${base}${path}`
  }

  if (pathSegments.length === 0) {
    if (showDefaultLocale) {
      return `${base}${locale}`
    }

    return locale === defaultLocale ? base : `${base}${locale}`
  }

  // check if the path is not already present in flatRoutes
  if (locale === defaultLocale) {
    const translatedPathKey = Object.keys(flatRoutes || {}).find(
      (key) => flatRoutes[key] === '/' + path
    )
    if (typeof translatedPathKey !== 'undefined') {
      pathSegments = translatedPathKey.split('/').filter((segment) => segment !== '')
    }
  }

  // remove locale from pathSegments (if there is any)
  pathSegments = removeLocaleFromPathSegments(pathSegments)

  // prepend the given locale if it's not the base one (unless showDefaultLocale)
  if (showDefaultLocale || locale !== defaultLocale) {
    pathSegments = [locale, ...pathSegments]
  }

  const localizedPath = base + pathSegments.join('/')

  // is path translated?
  if (Object.prototype.hasOwnProperty.call(flatRoutes || {}, localizedPath.replace(/\/$/, ''))) {
    return flatRoutes[localizedPath.replace(/\/$/, '')]
  }

  return localizedPath
}

export const I18nLocalUserPreferenceKey = 'cms_i18n_user_pref'

/** changes the language and persists the users preference */
export const switchLanguage = (locale: Locale) => {
  changeLanguage(locale)

  // memoize in localStorage

  if (isBrowser()) {
    const localStorage = getStorage<Locale>('local')
    localStorage.set(I18nLocalUserPreferenceKey, locale)
    const path = document.location.pathname
    const localizedPath = localizePath(path)
    if (path !== localizedPath) {
      document.location.href = localizedPath
    }
  }
}

if (isBrowser()) {
  requestAnimationFrame(async () => {
    const localStorage = getStorage<Locale>('local')
    const autoDetectedLocale = detectLocale()
    const defaultLocale =
      AstroI18next.locales.indexOf(autoDetectedLocale) > -1
        ? autoDetectedLocale
        : getCurrentLocale()
    const locale = await localStorage.get(I18nLocalUserPreferenceKey, defaultLocale)
    switchLanguage(locale)
  })
}

export interface LinkProps extends JSX.HTMLAttributes<HTMLAnchorElement> {
    children?: ComponentChildren
}

/** creates an anchor <a> tag that auto-localizes to the current language or lang="fr" attribute forced other languages */
export const Link = (props: LinkProps) => {
    const children = props.children
    props.href = localizePath(props.href as string, props.lang ? props.lang as Locale : getCurrentLocale())
    delete props.children
    return  <a {...props}>
        {children}
    </a>
}
