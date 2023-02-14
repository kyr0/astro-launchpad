import { twMerge } from 'tailwind-merge'

const oneToMany = (classes: Array<Array<string> | string>) =>
  Array.isArray(classes) ? classes : [classes]

const merge = (baseClassString: string, classes?: Array<Array<string> | string>) =>
  twMerge([baseClassString, ...(classes ? oneToMany(classes) : [])])

const makeStyleFn =
  (baseClassString: string) =>
  (...classes: Array<Array<string> | string>) =>
    merge(baseClassString, classes)

// example for merging tailwind classes into one
export const btn = {
  /** default styles button with small-rounded corners */
  default: makeStyleFn(
    'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
  ),
}
