import { useContext } from 'react'

import { selectionsContext } from '../providers/SelectionProvider'
import { removeHighlightFromDom } from '../libs/removeHighlight'
import { SelectionType } from '../types'

export const useSelections = () => {
  const selectionContext = useContext(selectionsContext)
  if (!selectionContext) {
    throw new Error('useSelection hook must be used inside selectionProvider')
  }
  const { selections, setSelections } = selectionContext
  const addSelection = (selection: SelectionType) => {
    setSelections((prev) => {
      const index = prev.findIndex((item) => item.id === selection.id)
      if (index === -1) {
        return [...prev, selection]
      }
      return prev
    })
  }
  const updateSelection = (id: string, updatedSelection: SelectionType) => {
    setSelections((prev) => {
      const index = prev.findIndex((item) => item.id === id)

      if (index !== -1) {
        return prev.splice(index, 1)
      }
      return [...prev, updatedSelection]
    })
  }
  const removeSelection = (selection: SelectionType) => {
    setSelections((prev) => {
      const index = prev.findIndex((item) => item.id === selection.id)

      if (index !== -1) {
        removeHighlightFromDom(selection)
        return prev.splice(index, 1)
      }
      return prev
    })
  }

  return { selections, setSelections, addSelection, updateSelection, removeSelection }
}
