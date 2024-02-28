import { WrapperChildrenType } from '../types'

const DefaultPopover: WrapperChildrenType = ({ selection, removeSelection, updateSelection }) => {
  const handleDelete = () => {
    removeSelection(selection)
  }

  const changeColor = (colorClassName: string) => {
    updateSelection(selection.id, { ...selection, className: `relative select-none ${colorClassName}` })
  }

  return (
    <div
      style={{
        padding: '1rem',
        boxShadow: '5px  5px  10px  0px rgba(0,  0,  0,  0.2)',
        backgroundColor: 'white',
        borderRadius: '6px',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
      }}
      className='popover'
    >
      <p style={{ fontSize: '12px' }}>{selection.text.length} characters selected</p>
      <div style={{ display: 'flex', minWidth: '150px', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
        <div
          onClick={() => changeColor('bg-red')}
          style={{ backgroundColor: 'red', cursor: 'pointer', height: '25px', width: '25px', borderRadius: '50%' }}
        >
          {' '}
        </div>
        <div
          onClick={() => changeColor('bg-yellow')}
          style={{ backgroundColor: '#F5DD61', cursor: 'pointer', height: '25px', width: '25px', borderRadius: '50%' }}
        >
          {' '}
        </div>
        <div
          onClick={() => changeColor('bg-blue')}
          style={{ backgroundColor: '#59D5E0', cursor: 'pointer', height: '25px', width: '25px', borderRadius: '50%' }}
        >
          {' '}
        </div>
        <div onClick={handleDelete} style={{ color: 'red', cursor: 'pointer', fontSize: 24, fontWeight: 'bold' }}>
          {' '}
          &#x1F5D1;
        </div>
      </div>
    </div>
  )
}

export default DefaultPopover
