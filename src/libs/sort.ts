import { SelectionType, XpathType } from '../types'

function extractNumbers(str: string) {
  // Remove h1, h2, h3, h4, h5, h6 from the string
  const cleanedStr = str.replace(/h\d/g, '')

  // Match and extract numbers
  const regex = /\d+/g
  const matches = cleanedStr.match(regex)
  // adding weight to initial paths for better sorting
  if (matches) {
    if (matches.length < 2) {
      matches[0] = matches[0].concat('11')
    }
    return +matches.join('')
  } else {
    return 0
  }
}

export const sortByPositionAndOffset = (slections: SelectionType[]) => {
  // alert('working')
  return slections.sort((a, b) => {
    const path1 = JSON.parse(a.meta) as XpathType
    const path2 = JSON.parse(b.meta) as XpathType

    const path1Weight = extractNumbers(path1.start) * 10000 + path1.startOffset
    const path2Weight = extractNumbers(path2.start) * 10000 + path2.startOffset
    return path2Weight - path1Weight
  })
}
