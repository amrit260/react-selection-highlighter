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
  // if (contents.childNodes.length > 0 && contents.childNodes.length % 2 === 0) {
  //   console.log(contents)
  //   return false
  // }
  contents.childNodes.forEach((item) => {
    if (item.nodeName === 'P') {
      hasp.push(true)
    } else {
      hasp.push(false)
    }
  })
  return !hasp.includes(true)
}
