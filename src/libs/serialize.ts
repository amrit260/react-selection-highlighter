//@ts-ignore
import { fromRange, toRange } from 'xpath-range'
import { XpathType } from '../types'

export const serializeRange = (range: Range, root: HTMLElement) => {
  return JSON.stringify(fromRange(range, root) as XpathType)
}

export const deserializeRange = (path: string, root: HTMLElement) => {
  const parsed = JSON.parse(path) as XpathType
  try {
    return toRange(parsed.start, parsed.startOffset, parsed.end, parsed.endOffset, root)
  } catch (error) {
    // console.log(path)
    console.error(error)
  }
}
