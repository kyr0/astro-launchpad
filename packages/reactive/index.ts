import { signal } from '@preact/signals'
import { useEffect as useEffectOriginal } from 'preact/hooks';

/** creates a global signal of arbitrary type, keys shall not collide */
export const globalSignal = <T>(key: string, initialValue?: T): ReturnType<typeof signal<T>> => {
  const keyPrefix = `@@globalSignal$_${key}`
  if (globalThis[keyPrefix]) return globalThis[keyPrefix]
  return (globalThis[keyPrefix] = signal<T>(initialValue))
}

/** intuitive useEffect that can handle async callbacks and defaults to [] in case of no dependencies */
export const useEffect = (fn: () => void | Promise<void>, deps?: Array<unknown>) => {
  useEffectOriginal(() => {
    fn()
  }, deps || [])
}
