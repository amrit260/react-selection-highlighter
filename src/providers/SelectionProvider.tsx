import React from 'react'
import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { SelectionType } from '../types'

export const SelectionsContext = createContext<{
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
  return <SelectionsContext.Provider value={value}>{children}</SelectionsContext.Provider>
}
