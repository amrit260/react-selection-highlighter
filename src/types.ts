export type SelectionType = {
  meta: string
  text: string
  id: string
  backgroundColor: string
  [Key: string]: any
}
export type WrapperChildrenType = React.FC<{
  selection: SelectionType
  removeSelection: (slection: SelectionType) => void
  updateSelection: (id: string, updatedSelection: SelectionType) => void
}>
