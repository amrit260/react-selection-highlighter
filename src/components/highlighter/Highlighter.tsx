import React, { useRef, MouseEventHandler, useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { deserializeRange, serializeRange } from '../../libs/serialize'
import { generateId } from '../../libs/uid'
import { getPopoverElement, getSpanElement } from '../../libs/wrapperElements'
import DefaultPopover from '../DeafultPopover'
import { useSelections } from '../../hooks/UseSelection'
import { SelectionType, PopoverChildrentype } from '../../types'
import { defaultMinSelectionLength, defaultSelectionWrapperClassName } from '../../constants/constants'
import { addHighlight, isHighlightable } from '../../libs/dom'
import { getOriginalRange, getRangeStartEndContainerText } from '../../libs/createRange'
import { sortByPositionAndOffset } from '../../libs/sort'

type BaseHighlighterProps = {
  htmlString: string
  minSelectionLength?: number
  maxSelectionLength?: number
  className?: string
  selectionWrapperClassName?: string
  PopoverClassName?: string
  PopoverChildren?: PopoverChildrentype
  disablePopover?: boolean

  onClickHighlight?: (selection: SelectionType, event: MouseEvent) => void
  onClick?: MouseEventHandler<HTMLDivElement>
  onSelection?: (selection: SelectionType) => void
}

export const Highlighter: React.FC<BaseHighlighterProps> = ({
  htmlString,
  onClickHighlight,
  disablePopover,
  maxSelectionLength,
  minSelectionLength,
  className,
  PopoverChildren,
  PopoverClassName,
  selectionWrapperClassName,
  onSelection,
  onClick,
  // selections,
}) => {
  const { selections, addSelection, removeSelection, updateSelection } = useSelections()
  const rootRef = useRef<HTMLDivElement | null>(null)
  const tempRef = useRef<HTMLDivElement | null>(null)
  const div = document.createElement('div')
  tempRef.current = div
  tempRef.current.innerHTML = htmlString

  const getWrapper = useCallback(
    (selection: SelectionType) => {
      const span = getSpanElement({ className: selection.className || defaultSelectionWrapperClassName })
      if (!disablePopover) {
        const popover = getPopoverElement({ className: PopoverClassName })
        if (!PopoverClassName) {
          span.onmouseover = () => {
            popover.style.visibility = 'visible'
            popover.style.opacity = '1'
          }
          span.onmouseout = () => {
            popover.style.visibility = 'hidden'
            popover.style.opacity = '0'
          }
        }
        popover.id = `pop-${selection.id}`
        span.appendChild(popover)
      }

      if (onClickHighlight) {
        span.onclick = (e) => onClickHighlight(selection, e)
      }
      span.id = selection.id

      return span
    },
    [PopoverClassName, disablePopover, onClickHighlight],
  )

  const handleMouseUp: MouseEventHandler<HTMLDivElement> = () => {
    // e.stopPropagation()
    const selection = window.getSelection()

    if (!selection) return
    if (!minSelectionLength) {
      minSelectionLength = defaultMinSelectionLength
    }
    if (minSelectionLength && selection.toString().length < minSelectionLength) return
    if (maxSelectionLength && selection.toString().length > maxSelectionLength) return
    const range = selection.getRangeAt(0)
    if (!isHighlightable(range)) return
    const expRange = getOriginalRange(range, tempRef.current!)
    if (!expRange) return
    const { startContainerText, endContainerText } = getRangeStartEndContainerText(range)
    const newSelection: SelectionType = {
      meta: serializeRange(expRange, tempRef.current!),
      text: range.toString(),
      id: `selection-${generateId()}`,
      className: selectionWrapperClassName || defaultSelectionWrapperClassName,
      startContainerText,
      endContainerText,
    }

    addSelection(newSelection)
    onSelection && onSelection(newSelection)
  }

  useEffect(() => {
    const sortedSelections = sortByPositionAndOffset(selections)
    if (!rootRef.current) return
    rootRef.current.innerHTML = ''
    rootRef.current.innerHTML = htmlString

    if (sortedSelections && sortedSelections.length) {
      for (let i = 0; i < sortedSelections.length; i++) {
        const item = sortedSelections[i] as SelectionType
        const range = deserializeRange(item.meta, rootRef.current!)
        if (range) {
          addHighlight(range, getWrapper(item))
        }
        const popoverRoot = document.getElementById(`pop-${item.id}`)
        if (!popoverRoot) return
        const root = ReactDOM.createRoot(popoverRoot)

        if (PopoverChildren) {
          root.render(
            <PopoverChildren selection={item} removeSelection={removeSelection} updateSelection={updateSelection} />,
          )
        } else {
          root.render(
            <DefaultPopover removeSelection={removeSelection} selection={item} updateSelection={updateSelection} />,
          )
        }
      }
    }
  }, [selections, getWrapper, PopoverChildren, htmlString, removeSelection, updateSelection])
  return <div ref={rootRef} id={'highlighter-root'} onClick={onClick} onMouseUp={handleMouseUp} className={className} />
}
