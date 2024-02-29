import { useContext } from 'react'
import { SelectionsContext } from '../providers/SelectionProvider'
import { SelectionType } from '../types'
// import { deserializeRange } from '../libs/serialize'
import { removeHighlightFromDom, updateDom } from '../libs/dom'

export const useSelections = () => {
  const selectionContext = useContext(SelectionsContext)
  if (!selectionContext) {
    throw new Error('useSelection hook must be used inside selectionProvider')
  }
  const { selections, setSelections } = selectionContext

  // const setS:React.Dispatch<React.SetStateAction<SelectionType[]>> = ((arg:(prev:SelectionType[])=>void|SelectionType[])=>{

  //   if(arg.length){
  //     const newArgArr = (arg as unknown as SelectionType[]).forEach(item=>{

  //     })
  //     const nsfa = arg.forEach
  //   }

  // })

  // const constructSelections = async (data: SelectionType) => {
  //   // if(data.length){
  //   const range = await deserializeRange(data.meta)
  //   return { ...data, range }
  //   // }
  // }

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
    // const withRange = await constructSelections(updatedSelection)

    setSelections((prev) => {
      const index = prev.findIndex((item) => item.id === id)

      if (index !== -1) {
        updateDom(updatedSelection)
        prev.splice(index, 1)
      }
      return [...prev, updatedSelection]
    })
  }
  const removeSelection = (selection: SelectionType) => {
    setSelections((prev) => {
      const index = prev.findIndex((item) => item.id === selection.id)

      if (index !== -1) {
        removeHighlightFromDom(selection)
        prev.splice(index, 1)
      }
      return [...prev]
    })
  }

  return { selections, setSelections, addSelection, updateSelection, removeSelection }
}
