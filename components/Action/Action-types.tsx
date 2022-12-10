export interface ActionProps<T> {
  action: () => Promise<T>
  children: React.ReactElement
}

export type ActionComponent<T = any> = React.FC<ActionProps<T>>
