interface Item {
  label: string
  onClick: () => void
  activeColor?: string
}

export interface SettingsMenuProps {
  items: Array<Item>
}
