import React from 'react'
import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { SelectionType } from '../types'

export const selectionsContext = createContext<{
  selections: SelectionType[]
  setSelections: Dispatch<SetStateAction<SelectionType[]>>
} | null>(null)

type SelectionProviderType = {
  // selections:SelectionType[],
  children: React.ReactNode
}

export const SelectionProvider = ({ children }: SelectionProviderType) => {
  const [selections, setSelections] = useState<SelectionType[]>([])
  const value = { selections, setSelections }
  return <selectionsContext.Provider value={value}>{children}</selectionsContext.Provider>
}
