import { ComponentChild } from 'preact'

export interface SuspenseBoundaryProps {
  children: ComponentChild
}

export const SuspenseBoundary = (props: SuspenseBoundaryProps) => {
  return <>{props.children}</>
}
