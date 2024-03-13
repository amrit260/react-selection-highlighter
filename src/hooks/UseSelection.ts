import { useContext } from 'react'
import { SelectionsContext } from '../providers/SelectionProvider'
import { SelectionType } from '../types'

export const useSelections = () => {
  const selectionContext = useContext(SelectionsContext)
  if (!selectionContext) {
    throw new Error('useSelection hook must be used inside selectionProvider')
  }
  const { selections, setSelections } = selectionContext

  const addSelection = async (selection: SelectionType) => {
    setSelections((prev) => {
      const index = prev.findIndex((item) => item.id === selection.id)
      if (index === -1) {
        return [...prev, selection]
      }

      return prev
    })
  }
  const updateSelection = async (id: string, updatedSelection: SelectionType) => {
    setSelections((prev) => {
      const index = prev.findIndex((item) => item.id === id)

      if (index !== -1) {
        prev.splice(index, 1)
      }
      return [...prev, updatedSelection]
    })
  }
  const removeSelection = (selection: SelectionType) => {
    setSelections((prev) => {
      const index = prev.findIndex((item) => item.id === selection.id)

      if (index !== -1) {
        prev = prev.filter((item) => item.id !== selection.id)
      }
      return [...prev]
    })
  }

  return { selections, setSelections, addSelection, updateSelection, removeSelection }
}
