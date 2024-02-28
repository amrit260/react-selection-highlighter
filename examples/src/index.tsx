import React from 'react'
import ReactDOM from 'react-dom/client'
// import { text } from './text'
import {Highlighter, SelectionProvider} from 'react-selection-highlighter'
import { text } from './text'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <div>
      <SelectionProvider>
     <Highlighter htmlString={text}/>
     </SelectionProvider>
    </div>
  </React.StrictMode>,
)