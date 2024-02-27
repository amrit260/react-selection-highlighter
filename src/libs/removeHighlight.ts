import { SelectionType } from '../types'

export const removeHighlightFromDom = (selection: SelectionType) => {
  const element = document.getElementById(selection.id)

  const popover = document.getElementById(`pop-${selection.id}`)
  if (!element) return
  element.className = ''
  element.setAttribute('style', '')
  // const newSpan = document.createElement('span')
  // while (element.firstChild) {
  //   newSpan.appendChild(element.firstChild)
  // }

  // element.parentElement?.replaceChildren(element, newSpan)

  if (popover) {
    element.removeChild(popover)
  }
}
