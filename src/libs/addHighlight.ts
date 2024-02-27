export const addHighlight = (range: Range, element: HTMLElement) => {
  if (!isHighlightable(range)) {
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
