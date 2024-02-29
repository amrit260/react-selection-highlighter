import React from 'react'
import ReactDOM from 'react-dom/client'
import HTMLReactParser from 'html-react-parser/lib/index'
import { deserializeRange, serializeRange } from '../../libs/serialize'
import { MouseEventHandler, useCallback, useEffect, useMemo } from 'react'
import { generateId } from '../../libs/uid'
import { getPopoverElement, getSpanElement } from '../../libs/wrapperElements'
import DefaultPopover from '../DeafultPopover'
import { useSelections } from '../../hooks/UseSelection'
import { SelectionType, WrapperChildrenType } from '../../types'
import { defaultClassName, defaultMinSelectionLength } from '../../constants/constants'
import { addHighlight, isHighlightable } from '../../libs/dom'

interface BaseHighlighterProps {
  htmlString: string
  minSelectionLength?: number
  maxSelectionLength?: number
  rootClassName?: string
  // selections?: SelectionType[]
  selectionWrapperClassName?: string
  PopoverClassName?: string
  PopoverChildren?: WrapperChildrenType
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
  rootClassName,
  PopoverChildren,
  PopoverClassName,
  selectionWrapperClassName,
  onClick,
  // selections,
}) => {
  const { selections, addSelection, removeSelection, updateSelection } = useSelections()
  const content = useMemo(() => HTMLReactParser(htmlString), [htmlString])
  const getWrapper = useCallback(
    (selection: SelectionType) => {
      const span = getSpanElement({ className: selectionWrapperClassName })
      if (!disablePopover) {
        const popover = getPopoverElement({ className: PopoverClassName })
        span.addEventListener('mouseover', () => {
          popover.style.visibility = 'visible'
          popover.style.opacity = '1'
        })
        span.addEventListener('mouseout', () => {
          popover.style.visibility = 'hidden'
          popover.style.opacity = '0'
        })
        popover.id = `pop-${selection.id}`
        span.appendChild(popover)
        const root = ReactDOM.createRoot(popover)
        if (PopoverChildren) {
          root.render(
            <PopoverChildren
              selection={selection}
              removeSelection={removeSelection}
              updateSelection={updateSelection}
            />,
          
          )
        } else {
          root.render(
            <DefaultPopover
              removeSelection={removeSelection}
              selection={selection}
              updateSelection={updateSelection}
            />,
          )
        }
      }

      if (onClickHighlight) {
        span.onclick = (e) => onClickHighlight(selection, e)
      }
      span.className = selection.className || defaultClassName
      span.id = selection.id

      return span
    },
    [
      selectionWrapperClassName,
      PopoverClassName,
      disablePopover,
      onClickHighlight,
      PopoverChildren,
      removeSelection,
      updateSelection,
    ],
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
    }
    addSelection(newSelection)
  }

  useEffect(() => {
    if (selections && selections.length) {
      selections.forEach(async (item) => {
        const range = await deserializeRange(item.meta)
        if (range) {
          addHighlight(range, getWrapper(item))
        }
      })
    }
  }, [selections, getWrapper])

  return (
    <div onClick={onClick} onMouseUp={handleMouseUp} className={rootClassName}>
      {content}
    </div>
  )
}
