//@ts-nocheck
import rangy from 'rangy'

import 'rangy/lib/rangy-core.js'
import 'rangy/lib/rangy-serializer'

export const serializeRange = (range: Range) => {
  return rangy.serializeRange(range, true) as string
}
export const deserializeRange = async (range: string) => {
  try {
    const parsed = (await rangy.deserializeRange(range)) as Range
    return parsed
  } catch (e) {
    // TODO handle parsing error
    if (process.env !== 'production') {
      console.log(e.message)
    }
  }

  return
}
