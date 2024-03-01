import React, { useRef } from 'react'
import ReactDOM from 'react-dom/client'
import HTMLReactParser from 'html-react-parser/lib/index'
import { deserializeRange, serializeRange } from '../../libs/serialize'
import { MouseEventHandler, useCallback, useEffect, useMemo } from 'react'
import { generateId } from '../../libs/uid'
import { getPopoverElement, getSpanElement } from '../../libs/wrapperElements'
import DefaultPopover from '../DeafultPopover'
import { useSelections } from '../../hooks/UseSelection'
import { SelectionType, PopoverChildrentype } from '../../types'
import { defaultMinSelectionLength, defaultSelectionWrapperClassName } from '../../constants/constants'
import { addHighlight, isHighlightable } from '../../libs/dom'

interface BaseHighlighterProps {
  htmlString: string
  minSelectionLength?: number
  maxSelectionLength?: number
  className?: string
  // selections?: SelectionType[]
  selectionWrapperClassName?: string
  PopoverClassName?: string
  PopoverChildren?: PopoverChildrentype
  disablePopover?: boolean
  /**
   * The highlight color for the component.
   * @type {string} - The color code. Default is red.
   */
  onClickHighlight?: (selection: SelectionType, event: MouseEvent) => void
  onClick?: MouseEventHandler<HTMLDivElement>
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
  onClick,
  // selections,
}) => {
  const { selections, addSelection, removeSelection, updateSelection } = useSelections()
  const popoverRoots = useRef<Record<string, ReactDOM.Root>>({})
  const content = useMemo(() => HTMLReactParser(htmlString), [htmlString])
  const getWrapper = useCallback(
    (selection: SelectionType) => {
      const span = getSpanElement({ className: selection.className || defaultSelectionWrapperClassName })
      if (!disablePopover) {
        const popover = getPopoverElement({ className: PopoverClassName })
        if (!PopoverClassName) {
          span.addEventListener('mouseover', () => {
            popover.style.visibility = 'visible'
            popover.style.opacity = '1'
          })
          span.addEventListener('mouseout', () => {
            popover.style.visibility = 'hidden'
            popover.style.opacity = '0'
          })
        }
        popover.id = `pop-${selection.id}`
        span.appendChild(popover)
        const root = ReactDOM.createRoot(popover)
        popoverRoots.current[selection.id] = root
      }

      if (onClickHighlight) {
        span.onclick = (e) => onClickHighlight(selection, e)
      }
      span.id = selection.id

      return span
    },
    [PopoverClassName, disablePopover, onClickHighlight],
  )

  const handleMouseUp = () => {
    const selection = window.getSelection()
    if (!selection) return
    if (!minSelectionLength) {
      minSelectionLength = defaultMinSelectionLength
    }
    if (minSelectionLength && selection.toString().length < minSelectionLength) return
    if (maxSelectionLength && selection.toString().length > maxSelectionLength) return
    const range = selection.getRangeAt(0)
    if (!isHighlightable(range)) return
    const newSelection: SelectionType = {
      meta: serializeRange(range),
      text: range.toString(),
      id: `selection-${generateId()}`,
      className: selectionWrapperClassName || defaultSelectionWrapperClassName,
    }
    addSelection(newSelection)
  }

  useEffect(() => {
    const currentRefs = popoverRoots.current
    if (selections && selections.length) {
      selections.forEach(async (item) => {
        const range = await deserializeRange(item.meta)
        if (range) {
          addHighlight(range, getWrapper(item))
        }
        if (PopoverChildren) {
          popoverRoots.current[item.id]?.render(
            <PopoverChildren selection={item} removeSelection={removeSelection} updateSelection={updateSelection} />,
          )
        } else {
          popoverRoots.current[item.id]?.render(
            <DefaultPopover removeSelection={removeSelection} selection={item} updateSelection={updateSelection} />,
          )
        }
      })
    }
    return () => {
      Object.keys(currentRefs).forEach((item) => () => currentRefs[item]?.unmount())
    }
  }, [selections, getWrapper, PopoverChildren, removeSelection, updateSelection])
  return (
    <div onClick={onClick} onMouseUp={handleMouseUp} className={className}>
      {content}
    </div>
  )
}
