import {ButtonSize} from '@nanoui/core'

type ButtonContollerItem = {
  size: ButtonSize
  label: string
}

export const BUTTON_CONTROLLER_ITEMS: ButtonContollerItem[] = [
  {size: 'sm', label: 'Small'},
  {size: 'md', label: 'Medium'},
  {size: 'lg', label: 'Large'}
]
