export const addHighlight = (range: Range, element: HTMLElement) => {
  if (!isHighlightable(range)) {
    return
  }

  const exists = document.getElementById(element.id)

  if (exists) {
    exists.className = element.className
    return
  }

  element.appendChild(range.extractContents())
  range.insertNode(element)
  window.getSelection()?.removeAllRanges()
}

export const isHighlightable = (range: Range) => {
  const contents = range.cloneContents()
  const hasp: boolean[] = []
  contents.childNodes.forEach((item) => {
    if (item.nodeName === 'P') {
      hasp.push(true)
    } else {
      hasp.push(false)
    }
  })
  return !hasp.includes(true)
}

import { defaultSelectionWrapperClassName } from '../constants/constants'
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
export const updateDom = (selection: SelectionType) => {
  const element = document.getElementById(selection.id)

  if (!element) return
  element.className = selection.className || defaultSelectionWrapperClassName
  element.setAttribute('style', '')
}
