function findContainerByText(text: string, root: Element) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null)
  let node
  while ((node = walker.nextNode())) {
    if (node.nodeValue?.trim().includes(text.trim())) {
      return node
    }
  }
  return null
}
//@ts-ignore
function getNextNode(node: Node | null): Node | null {
  if (!node) {
    return null
  }

  if (node.firstChild) return node.firstChild
  while (node) {
    if (node.nextSibling) return node.nextSibling
    node = node.parentNode
  }
}

function getNodeCount(range: Range) {
  let count = 1
  let node: Node | null = range.startContainer
  while (node && node !== range.endContainer) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      node = getNextNode(node)
      continue
    }
    count++
    node = getNextNode(node)
  }
  return count
}

export const getRangeStartEndContainerText = (range: Range) => {
  if (range.startContainer === range.endContainer) {
    return { startContainerText: range.toString(), endContainerText: range.toString() }
  }

  const startContainerText = range.startContainer.textContent?.substring(
    range.startOffset,
    range.startContainer.textContent.length,
  )

  const endContainerText = range.endContainer.textContent?.substring(0, range.endOffset)

  return { startContainerText, endContainerText }
}

export function getOriginalRange(range: Range, root: Element) {
  let firstOffset = 0,
    secondOffset = 0
  const firstContainer = findContainerByText(range.startContainer.textContent!, root)
  const lastContainter = findContainerByText(range.endContainer.textContent!, root)
  const rangeNodeCount = getNodeCount(range)

  if (rangeNodeCount === 1) {
    const rangeFirstContainerText = range.startContainer.textContent?.substring(range.startOffset, range.endOffset)
    firstOffset = firstContainer?.textContent?.indexOf(rangeFirstContainerText!) || 0
    secondOffset = firstOffset + rangeFirstContainerText!.length
  } else {
    const rangeFirstContainerText = range.startContainer.textContent?.substring(
      range.startOffset,
      range.startContainer.textContent.length,
    )
    firstOffset = firstContainer?.textContent?.indexOf(rangeFirstContainerText!) || 0

    const rangeLastContainerText = range.endContainer.textContent?.substring(0, range.endOffset)

    secondOffset = rangeLastContainerText?.length || 0
  }

  if (!firstContainer || !lastContainter) {
    return null
  }

  const newRange = document.createRange()
  newRange.setStart(firstContainer, firstOffset)
  newRange.setEnd(lastContainter, secondOffset)

  return newRange
}
