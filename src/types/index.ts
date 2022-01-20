// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnonymousCallback = (...args: any[]) => void

export type SidebarSectionObject = {
  name: string
  icon: any
  color?: string
  children?: (
    | { name: string }
    | { name: string; color: string }
    | { name: string; path: string }
    | { name: string; svg: string }
    | { name: string; icon: any }
  )[]
}
